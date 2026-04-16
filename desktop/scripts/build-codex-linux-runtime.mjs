import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { assembleCodexRuntime } from './assemble-codex-runtime.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const desktopRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(desktopRoot, '..');

const currentLinuxPackageRoot = path.join(desktopRoot, 'out', 'Codex-linux-x64');
const defaultAssembledRuntimeRoot = path.join(desktopRoot, 'tmp', 'codex-runtime');
const defaultOutputRoot = path.join(desktopRoot, 'out', 'Codex-linux-x64-codex');
const defaultCodexShellRoot = path.join(repoRoot, 'codex', 'app');

function parseArgValue(argv, name) {
  const index = argv.findIndex((arg) => arg === name);
  if (index === -1) {
    return null;
  }

  const value = argv[index + 1];
  if (!value) {
    throw new Error(`Missing value for ${name}`);
  }

  return value;
}

function parseCli(argv) {
  const outputArg = parseArgValue(argv, '--output');
  const shellRootArg = parseArgValue(argv, '--shell-root');
  const assembledRootArg = parseArgValue(argv, '--assembled-root');
  const codexShellRootArg = parseArgValue(argv, '--codex-shell-root');
  const overlayCodexShellAssets = argv.includes('--overlay-codex-shell-assets');

  return {
    outputRoot: outputArg ? path.resolve(process.cwd(), outputArg) : defaultOutputRoot,
    shellRoot: shellRootArg ? path.resolve(process.cwd(), shellRootArg) : currentLinuxPackageRoot,
    assembledRoot: assembledRootArg
      ? path.resolve(process.cwd(), assembledRootArg)
      : defaultAssembledRuntimeRoot,
    codexShellRoot: codexShellRootArg
      ? path.resolve(process.cwd(), codexShellRootArg)
      : defaultCodexShellRoot,
    overlayCodexShellAssets,
  };
}

function assertExists(targetPath, label) {
  if (!fs.existsSync(targetPath)) {
    throw new Error(`${label} is missing: ${targetPath}`);
  }
}

function copyTree(sourcePath, destinationPath) {
  fs.cpSync(sourcePath, destinationPath, {
    recursive: true,
    preserveTimestamps: true,
  });
}

function copyShellExceptResources({ shellRoot, outputRoot }) {
  fs.mkdirSync(outputRoot, { recursive: true });
  for (const entry of fs.readdirSync(shellRoot)) {
    if (entry === 'resources') {
      continue;
    }

    copyTree(path.join(shellRoot, entry), path.join(outputRoot, entry));
  }
}

function overlayCodexNonExecutableShellAssets({ outputRoot, codexShellRoot }) {
  const codexAssetNames = [
    'resources.pak',
    'chrome_100_percent.pak',
    'chrome_200_percent.pak',
    'snapshot_blob.bin',
    'v8_context_snapshot.bin',
    'icudtl.dat',
    'version',
    'LICENSE',
    'LICENSES.chromium.html',
  ];

  const copied = [];
  for (const fileName of codexAssetNames) {
    const sourcePath = path.join(codexShellRoot, fileName);
    if (!fs.existsSync(sourcePath)) {
      continue;
    }

    const destinationPath = path.join(outputRoot, fileName);
    fs.copyFileSync(sourcePath, destinationPath);
    copied.push(fileName);
  }

  const requiredCodexShellAssets = [
    'resources.pak',
    'chrome_100_percent.pak',
    'v8_context_snapshot.bin',
  ];
  for (const fileName of requiredCodexShellAssets) {
    if (!copied.includes(fileName)) {
      throw new Error(`Missing required codex shell asset "${fileName}" in ${codexShellRoot}`);
    }
  }

  return copied;
}

function copyRuntimeResources({ shellRoot, assembledRoot, outputRoot }) {
  const outputResourcesRoot = path.join(outputRoot, 'resources');
  const assembledResourcesRoot = path.join(assembledRoot, 'resources');
  const shellResourcesRoot = path.join(shellRoot, 'resources');
  const outputUnpackedPath = path.join(outputResourcesRoot, 'app.asar.unpacked');

  fs.mkdirSync(outputResourcesRoot, { recursive: true });

  const requiredCodex = ['app.asar', 'codex', 'rg'];
  for (const resourceName of requiredCodex) {
    const sourcePath = path.join(assembledResourcesRoot, resourceName);
    assertExists(sourcePath, `Assembled codex resource "${resourceName}"`);
    const outputPath = path.join(outputResourcesRoot, resourceName);
    fs.copyFileSync(sourcePath, outputPath);

    const shellPath = path.join(shellResourcesRoot, resourceName);
    if (fs.existsSync(shellPath) && resourceName !== 'app.asar') {
      fs.chmodSync(outputPath, fs.statSync(shellPath).mode);
    }
  }

  const optionalCodex = ['notification.wav', 'THIRD_PARTY_NOTICES.txt'];
  for (const resourceName of optionalCodex) {
    const sourcePath = path.join(assembledResourcesRoot, resourceName);
    if (!fs.existsSync(sourcePath)) {
      continue;
    }

    fs.copyFileSync(sourcePath, path.join(outputResourcesRoot, resourceName));
  }

  const assembledUnpackedPath = path.join(assembledResourcesRoot, 'app.asar.unpacked');
  assertExists(assembledUnpackedPath, 'Assembled codex app.asar.unpacked');

  const shellUnpackedPath = path.join(shellResourcesRoot, 'app.asar.unpacked');
  const copiedUnpackedSources = [];
  if (fs.existsSync(shellUnpackedPath)) {
    // Preserve Linux shell app.asar.unpacked before overlaying rebuilt runtime content.
    copyTree(shellUnpackedPath, outputUnpackedPath);
    copiedUnpackedSources.push(shellUnpackedPath);
  }
  copyTree(assembledUnpackedPath, outputUnpackedPath);
  copiedUnpackedSources.push(assembledUnpackedPath);

  return {
    copiedUnpackedSources,
  };
}

function ensureNoResourceBackups(outputRoot) {
  const resourcesRoot = path.join(outputRoot, 'resources');
  const unexpected = fs
    .readdirSync(resourcesRoot)
    .filter((entry) => entry.includes('.bak') || entry.endsWith('.old'));

  if (unexpected.length > 0) {
    throw new Error(
      `Unexpected backup artifacts in output resources: ${unexpected.join(', ')}`,
    );
  }
}

function ensureExecutable(outputRoot) {
  const codexBinaryPath = path.join(outputRoot, 'Codex');
  assertExists(codexBinaryPath, 'Codex output binary');
}

export async function buildCodexLinuxRuntime({
  outputRoot,
  shellRoot,
  assembledRoot,
  codexShellRoot,
  overlayCodexShellAssets = false,
}) {
  assertExists(shellRoot, 'Current Linux package root');
  assertExists(path.join(shellRoot, 'Codex'), 'Current Linux package binary');
  assertExists(codexShellRoot, 'Codex shell root');

  if (fs.existsSync(outputRoot)) {
    throw new Error(
      `Refusing to overwrite existing output root: ${outputRoot}\n` +
      'Use a different --output path.',
    );
  }

  let assembledSummary = null;
  if (!fs.existsSync(assembledRoot)) {
    assembledSummary = await assembleCodexRuntime({ outputRoot: assembledRoot });
  } else {
    assertExists(path.join(assembledRoot, 'resources', 'app.asar'), 'Assembled codex app.asar');
    assertExists(path.join(assembledRoot, 'resources', 'codex'), 'Assembled codex helper');
    assertExists(path.join(assembledRoot, 'resources', 'rg'), 'Assembled ripgrep helper');
  }

  copyShellExceptResources({ shellRoot, outputRoot });
  const copiedCodexShellAssets = overlayCodexShellAssets
    ? overlayCodexNonExecutableShellAssets({
        outputRoot,
        codexShellRoot,
      })
    : [];
  const runtimeResourceSummary = copyRuntimeResources({ shellRoot, assembledRoot, outputRoot });
  ensureNoResourceBackups(outputRoot);
  ensureExecutable(outputRoot);

  return {
    shellRoot,
    assembledRoot,
    codexShellRoot,
    outputRoot,
    codexBinary: path.join(outputRoot, 'Codex'),
    resourcesRoot: path.join(outputRoot, 'resources'),
    runtimeResourceSummary,
    overlayCodexShellAssets,
    copiedCodexShellAssets,
    assembledSummary,
  };
}

async function main() {
  const parsed = parseCli(process.argv.slice(2));
  const summary = await buildCodexLinuxRuntime(parsed);
  process.stdout.write(`${JSON.stringify(summary, null, 2)}\n`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  await main();
}
