const childProcess = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

function runAssemblySnippet(snippet, tempRoot) {
  const modulePath = JSON.stringify(
    path.resolve(__dirname, '..', '..', 'scripts', 'assemble-codex-runtime.mjs'),
  );

  return childProcess.spawnSync(
    process.execPath,
    [
      '--input-type=module',
      '--eval',
      `import * as runtime from ${modulePath};\n${snippet}`,
    ],
    {
      cwd: tempRoot,
      encoding: 'utf8',
    },
  );
}

describe('codex runtime assembly guards', () => {
  test('reuses the default generated runtime root but still rejects other existing outputs', () => {
    const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'codex-runtime-output-'));
    const reusableRoot = path.join(tempRoot, 'codex-runtime');
    const explicitRoot = path.join(tempRoot, 'custom-runtime');
    fs.mkdirSync(reusableRoot, { recursive: true });
    fs.writeFileSync(path.join(reusableRoot, 'stale.txt'), 'stale\n', 'utf8');
    fs.mkdirSync(explicitRoot, { recursive: true });

    const result = runAssemblySnippet(
      `
      import fs from 'node:fs';
      import path from 'node:path';
      runtime.prepareAssemblyOutputRoot(${JSON.stringify(reusableRoot)}, {
        defaultOutputRoot: ${JSON.stringify(reusableRoot)},
      });
      let explicitError = null;
      try {
        runtime.prepareAssemblyOutputRoot(${JSON.stringify(explicitRoot)}, {
          defaultOutputRoot: ${JSON.stringify(reusableRoot)},
        });
      } catch (error) {
        explicitError = String(error?.message ?? error);
      }
      process.stdout.write(JSON.stringify({
        reusableRootExists: fs.existsSync(${JSON.stringify(reusableRoot)}),
        explicitError,
      }));
      `,
      tempRoot,
    );

    expect(result.status).toBe(0);
    expect(JSON.parse(result.stdout)).toEqual({
      reusableRootExists: false,
      explicitError: `Refusing to overwrite existing assembled runtime root: ${explicitRoot}\nUse a different --output path.`,
    });
  });

  test('throws when a patch target is missing and the replacement is not already present', () => {
    const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'codex-runtime-patch-'));
    const filePath = path.join(tempRoot, 'bundle.js');

    fs.writeFileSync(filePath, 'const version = 1;\n', 'utf8');

    const result = runAssemblySnippet(
      `
      try {
        runtime.applyPatchesToFile(${JSON.stringify(filePath)}, [{
          label: 'missing patch target',
          target: 'const version = 2;',
          replacement: 'const version = 3;',
        }]);
        process.stdout.write('NO_ERROR');
      } catch (error) {
        process.stderr.write(String(error?.message ?? error));
        process.exit(1);
      }
      `,
      tempRoot,
    );

    expect(result.status).toBe(1);
    expect(result.stderr).toContain('patch target not found');
  });

  test('allows already-applied replacements without failing the assembly step', () => {
    const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'codex-runtime-patch-'));
    const filePath = path.join(tempRoot, 'bundle.js');

    fs.writeFileSync(filePath, 'const version = 3;\n', 'utf8');

    const result = runAssemblySnippet(
      `
      const patchResult = runtime.applyPatchesToFile(${JSON.stringify(filePath)}, [{
        label: 'already patched bundle',
        target: 'const version = 2;',
        replacement: 'const version = 3;',
      }]);
      process.stdout.write(JSON.stringify(patchResult));
      `,
      tempRoot,
    );

    expect(result.status).toBe(0);
    expect(JSON.parse(result.stdout)).toEqual([
      {
        label: 'already patched bundle',
        patched: false,
        skipped: true,
        reason: 'already patched bundle replacement already present',
      },
    ]);
  });

  test('hydrates lfs pointer files before copying required runtime helpers', () => {
    const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'codex-runtime-lfs-'));
    const filePath = path.join(tempRoot, 'codex');

    fs.writeFileSync(
      filePath,
      [
        'version https://git-lfs.github.com/spec/v1',
        'oid sha256:1234',
        'size 99',
        '',
      ].join('\n'),
      'utf8',
    );

    const result = runAssemblySnippet(
      `
      import fs from 'node:fs';
      runtime.ensureHydratedFile(${JSON.stringify(filePath)}, 'Test codex helper', {
        hydrate(targetPath) {
          fs.writeFileSync(targetPath, '#!/bin/sh\\necho codex\\n', 'utf8');
        },
      });
      process.stdout.write(String(runtime.isGitLfsPointerFile(${JSON.stringify(filePath)})));
      `,
      tempRoot,
    );

    expect(result.status).toBe(0);
    expect(result.stdout.trim()).toBe('false');
    expect(fs.readFileSync(filePath, 'utf8')).toContain('echo codex');
  });

  test('fails when an lfs pointer remains unresolved after hydration attempts', () => {
    const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'codex-runtime-lfs-'));
    const filePath = path.join(tempRoot, 'codex');

    fs.writeFileSync(
      filePath,
      [
        'version https://git-lfs.github.com/spec/v1',
        'oid sha256:1234',
        'size 99',
        '',
      ].join('\n'),
      'utf8',
    );

    const result = runAssemblySnippet(
      `
      try {
        runtime.ensureHydratedFile(${JSON.stringify(filePath)}, 'Test codex helper', {
          hydrate() {},
        });
        process.stdout.write('NO_ERROR');
      } catch (error) {
        process.stderr.write(String(error?.message ?? error));
        process.exit(1);
      }
      `,
      tempRoot,
    );

    expect(result.status).toBe(1);
    expect(result.stderr).toContain('still a Git LFS pointer');
  });
});
