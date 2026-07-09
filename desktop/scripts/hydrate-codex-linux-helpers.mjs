import childProcess from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const desktopRoot = path.resolve(__dirname, '..');

const requiredVendorPaths = [
  'bin/codex',
  'bin/codex-code-mode-host',
  'codex-package.json',
  'codex-path/rg',
  'codex-resources/bwrap',
  'codex-resources/zsh/bin/zsh',
];

export function parseArch(argv) {
  const index = argv.indexOf('--arch');
  const requested = index === -1 ? process.arch : argv[index + 1];
  if (requested !== 'x64' && requested !== 'arm64') {
    throw new Error(`Unsupported Linux helper architecture: ${requested ?? '(missing)'}`);
  }
  return requested;
}

export function vendorLayoutMatches(vendorRoot, expectedVersion, arch) {
  try {
    const metadata = JSON.parse(
      fs.readFileSync(path.join(vendorRoot, 'codex-package.json'), 'utf8'),
    );
    const expectedTarget = arch === 'arm64' ? 'aarch64-unknown-linux-musl' : 'x86_64-unknown-linux-musl';
    return (
      metadata.version === expectedVersion &&
      metadata.target === expectedTarget &&
      requiredVendorPaths.every((relativePath) => {
        const filePath = path.join(vendorRoot, relativePath);
        if (!fs.statSync(filePath).isFile() || fs.statSync(filePath).size === 0) return false;
        if (relativePath === 'codex-package.json') return true;
        fs.accessSync(filePath, fs.constants.X_OK);
        return true;
      })
    );
  } catch {
    return false;
  }
}

export function findVendorRoot(searchRoot, expectedVersion, arch) {
  const pending = [searchRoot];
  while (pending.length > 0) {
    const current = pending.pop();
    if (!current) continue;
    if (vendorLayoutMatches(current, expectedVersion, arch)) return current;

    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      if (entry.isDirectory()) pending.push(path.join(current, entry.name));
    }
  }
  throw new Error(
    `Installed @openai/codex@${expectedVersion} did not contain the Linux ${arch} vendor layout.`,
  );
}

export function hydrateLinuxCodexHelpers({ arch, force = false } = {}) {
  const resolvedArch = arch ?? process.arch;
  if (resolvedArch !== 'x64' && resolvedArch !== 'arm64') {
    throw new Error(`Unsupported Linux helper architecture: ${resolvedArch}`);
  }

  const packageJson = JSON.parse(fs.readFileSync(path.join(desktopRoot, 'package.json'), 'utf8'));
  const expectedVersion = packageJson.codexCliVersion;
  if (typeof expectedVersion !== 'string' || expectedVersion.length === 0) {
    throw new Error('desktop/package.json must define codexCliVersion.');
  }

  const helperRoot = path.join(desktopRoot, 'resources', 'bin', `linux-${resolvedArch}`);
  const destinationVendorRoot = path.join(helperRoot, 'codex-vendor');
  if (!force && vendorLayoutMatches(destinationVendorRoot, expectedVersion, resolvedArch)) {
    process.stdout.write(
      `[hydrate-codex-linux-helpers] already current: ${expectedVersion} (${resolvedArch})\n`,
    );
    return destinationVendorRoot;
  }

  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'codex-linux-helpers-'));
  const stagedVendorRoot = path.join(helperRoot, `.codex-vendor-${process.pid}`);
  const stagedRgPath = path.join(helperRoot, `.rg-${process.pid}`);
  try {
    childProcess.execFileSync(
      process.platform === 'win32' ? 'npm.cmd' : 'npm',
      [
        'install',
        '--ignore-scripts',
        '--no-audit',
        '--no-fund',
        '--package-lock=false',
        '--prefix',
        tempRoot,
        '--os=linux',
        `--cpu=${resolvedArch}`,
        `@openai/codex@${expectedVersion}`,
      ],
      { stdio: 'inherit' },
    );

    const sourceVendorRoot = findVendorRoot(
      path.join(tempRoot, 'node_modules'),
      expectedVersion,
      resolvedArch,
    );
    fs.mkdirSync(helperRoot, { recursive: true });
    fs.rmSync(stagedVendorRoot, { recursive: true, force: true });
    fs.cpSync(sourceVendorRoot, stagedVendorRoot, {
      recursive: true,
      preserveTimestamps: true,
    });
    fs.copyFileSync(
      path.join(stagedVendorRoot, 'codex-path', 'rg'),
      stagedRgPath,
    );

    for (const relativePath of requiredVendorPaths.filter((entry) => entry !== 'codex-package.json')) {
      fs.chmodSync(path.join(stagedVendorRoot, relativePath), 0o755);
    }
    fs.chmodSync(stagedRgPath, 0o755);
    if (!vendorLayoutMatches(stagedVendorRoot, expectedVersion, resolvedArch)) {
      throw new Error('Staged Codex helper package failed validation.');
    }

    fs.rmSync(destinationVendorRoot, { recursive: true, force: true });
    fs.renameSync(stagedVendorRoot, destinationVendorRoot);
    fs.renameSync(stagedRgPath, path.join(helperRoot, 'rg'));
  } finally {
    fs.rmSync(tempRoot, { recursive: true, force: true });
    fs.rmSync(stagedVendorRoot, { recursive: true, force: true });
    fs.rmSync(stagedRgPath, { force: true });
  }

  process.stdout.write(
    `[hydrate-codex-linux-helpers] installed ${expectedVersion} (${resolvedArch})\n`,
  );
  return destinationVendorRoot;
}

if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  hydrateLinuxCodexHelpers({
    arch: parseArch(process.argv.slice(2)),
    force: process.argv.includes('--force'),
  });
}
