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

  test('allows the fast mode service-tier guard to be applied idempotently', () => {
    const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'codex-runtime-patch-'));
    const filePath = path.join(tempRoot, 'use-is-fast-mode-enabled.js');

    fs.writeFileSync(
      filePath,
      'function m(e){return(e.serviceTiers?.length??0)>0||e.additionalSpeedTiers?.includes(u)===!0}\n',
      'utf8',
    );

    const result = runAssemblySnippet(
      `
      const patchResult = runtime.patchFastModeServiceTiersGuard(${JSON.stringify(filePath)});
      process.stdout.write(JSON.stringify(patchResult));
      `,
      tempRoot,
    );

    expect(result.status).toBe(0);
    expect(JSON.parse(result.stdout)).toEqual([
      {
        label: 'fast mode missing service tiers guard',
        patched: false,
        skipped: true,
        reason: 'fast mode missing service tiers guard replacement already present',
      },
    ]);
  });

  test('replaces the unsafe fast mode service-tier access', () => {
    const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'codex-runtime-patch-'));
    const filePath = path.join(tempRoot, 'use-is-fast-mode-enabled.js');

    fs.writeFileSync(
      filePath,
      'function m(e){return e.serviceTiers.length>0||e.additionalSpeedTiers?.includes(u)===!0}\n',
      'utf8',
    );

    const result = runAssemblySnippet(
      `
      import fs from 'node:fs';
      const patchResult = runtime.patchFastModeServiceTiersGuard(${JSON.stringify(filePath)});
      process.stdout.write(JSON.stringify({
        patchResult,
        source: fs.readFileSync(${JSON.stringify(filePath)}, 'utf8'),
      }));
      `,
      tempRoot,
    );

    expect(result.status).toBe(0);
    expect(JSON.parse(result.stdout)).toEqual({
      patchResult: [
        {
          label: 'fast mode missing service tiers guard',
          patched: true,
          skipped: false,
          reason: null,
        },
      ],
      source:
        'function m(e){return(e.serviceTiers?.length??0)>0||e.additionalSpeedTiers?.includes(u)===!0}\n',
    });
  });

  test('fails loudly when the fast mode service-tier patch shape no longer matches', () => {
    const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'codex-runtime-patch-'));
    const filePath = path.join(tempRoot, 'use-is-fast-mode-enabled.js');

    fs.writeFileSync(
      filePath,
      'function m(e){return e.additionalSpeedTiers?.includes(u)===!0}\n',
      'utf8',
    );

    const result = runAssemblySnippet(
      `
      try {
        runtime.patchFastModeServiceTiersGuard(${JSON.stringify(filePath)});
        process.stdout.write('NO_ERROR');
      } catch (error) {
        process.stderr.write(String(error?.message ?? error));
        process.exit(1);
      }
      `,
      tempRoot,
    );

    expect(result.status).toBe(1);
    expect(result.stderr).toContain('fast mode missing service tiers guard patch target not found');
  });

  test('prioritizes replacing unsafe fast mode access when guarded code is also present', () => {
    const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'codex-runtime-patch-'));
    const filePath = path.join(tempRoot, 'use-is-fast-mode-enabled.js');

    fs.writeFileSync(
      filePath,
      [
        'function m(e){return e.serviceTiers.length>0||e.additionalSpeedTiers?.includes(u)===!0}',
        'function n(e){return(e.serviceTiers?.length??0)>0||e.additionalSpeedTiers?.includes(u)===!0}',
        '',
      ].join('\n'),
      'utf8',
    );

    const result = runAssemblySnippet(
      `
      import fs from 'node:fs';
      const patchResult = runtime.patchFastModeServiceTiersGuard(${JSON.stringify(filePath)});
      process.stdout.write(JSON.stringify({
        patchResult,
        source: fs.readFileSync(${JSON.stringify(filePath)}, 'utf8'),
      }));
      `,
      tempRoot,
    );

    expect(result.status).toBe(0);
    expect(JSON.parse(result.stdout)).toEqual({
      patchResult: [
        {
          label: 'fast mode missing service tiers guard',
          patched: true,
          skipped: false,
          reason: null,
        },
      ],
      source: [
        'function m(e){return(e.serviceTiers?.length??0)>0||e.additionalSpeedTiers?.includes(u)===!0}',
        'function n(e){return(e.serviceTiers?.length??0)>0||e.additionalSpeedTiers?.includes(u)===!0}',
        '',
      ].join('\n'),
    });
  });

  test('fast mode service-tier guard preserves eligibility semantics', () => {
    const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'codex-runtime-patch-'));

    const result = runAssemblySnippet(
      `
      const isFastModeEligible = new Function(
        'model',
        'const u = "fast"; const e = model; ' + runtime.fastModeModelServiceTiersPatchReplacement,
      );
      const cases = [
        ['serviceTiers omitted', {}, false],
        ['serviceTiers null', { serviceTiers: null }, false],
        ['serviceTiers empty', { serviceTiers: [] }, false],
        ['serviceTiers populated', { serviceTiers: ['priority'] }, true],
        [
          'additionalSpeedTiers fast',
          { serviceTiers: null, additionalSpeedTiers: ['fast'] },
          true,
        ],
        [
          'additionalSpeedTiers without fast',
          { serviceTiers: null, additionalSpeedTiers: ['standard'] },
          false,
        ],
      ];

      process.stdout.write(JSON.stringify(
        cases.map(([label, model, expected]) => ({
          label,
          expected,
          actual: isFastModeEligible(model),
        })),
      ));
      `,
      tempRoot,
    );

    expect(result.status).toBe(0);
    expect(JSON.parse(result.stdout)).toEqual([
      { label: 'serviceTiers omitted', expected: false, actual: false },
      { label: 'serviceTiers null', expected: false, actual: false },
      { label: 'serviceTiers empty', expected: false, actual: false },
      { label: 'serviceTiers populated', expected: true, actual: true },
      { label: 'additionalSpeedTiers fast', expected: true, actual: true },
      { label: 'additionalSpeedTiers without fast', expected: false, actual: false },
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
