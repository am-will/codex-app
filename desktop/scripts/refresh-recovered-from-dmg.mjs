import crypto from 'node:crypto';
import childProcess from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import asar from '@electron/asar';

import {
  normalizeNativeModules,
  patchExtractedCodexApp,
} from './assemble-codex-runtime.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const desktopRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(desktopRoot, '..');
const defaultRecoveredRoot = path.join(desktopRoot, 'recovered', 'app-asar-extracted');

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
  const defaultDmgPath = fs.existsSync(path.join(repoRoot, 'Codex_new.dmg'))
    ? path.join(repoRoot, 'Codex_new.dmg')
    : path.join(repoRoot, 'Codex.dmg');
  const dmgPath = parseArgValue(argv, '--dmg') ?? defaultDmgPath;
  const appAsarPath = parseArgValue(argv, '--app-asar');
  const outputRoot = parseArgValue(argv, '--output') ?? defaultRecoveredRoot;
  const keepTemp = argv.includes('--keep-temp');

  return {
    dmgPath: appAsarPath ? null : path.resolve(process.cwd(), dmgPath),
    appAsarPath: appAsarPath ? path.resolve(process.cwd(), appAsarPath) : null,
    outputRoot: path.resolve(process.cwd(), outputRoot),
    keepTemp,
  };
}

function sha256(filePath) {
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

async function extractDmgToTemp(dmgPath, tempRoot) {
  childProcess.execFileSync('7z', ['x', '-y', dmgPath, `-o${tempRoot}`], {
    cwd: repoRoot,
    stdio: 'pipe',
  });
}

function assertExists(targetPath, label) {
  if (!fs.existsSync(targetPath)) {
    throw new Error(`${label} is missing: ${targetPath}`);
  }
}

function findAppResourcesRoot(extractRoot) {
  const matches = [];

  function walk(currentPath) {
    for (const entry of fs.readdirSync(currentPath, { withFileTypes: true })) {
      const entryPath = path.join(currentPath, entry.name);
      if (entry.isDirectory()) {
        walk(entryPath);
        continue;
      }

      if (
        entry.name === 'app.asar' &&
        currentPath.endsWith(path.join('Contents', 'Resources'))
      ) {
        matches.push(currentPath);
      }
    }
  }

  walk(extractRoot);

  if (matches.length === 0) {
    throw new Error(`Could not locate Contents/Resources/app.asar under ${extractRoot}`);
  }

  return matches.sort((left, right) => left.localeCompare(right))[0];
}

function syncExactDirectory(sourceRoot, destinationRoot) {
  fs.rmSync(destinationRoot, { recursive: true, force: true });
  fs.mkdirSync(path.dirname(destinationRoot), { recursive: true });
  fs.cpSync(sourceRoot, destinationRoot, {
    recursive: true,
    preserveTimestamps: true,
  });
}

async function main() {
  const { dmgPath, appAsarPath, outputRoot, keepTemp } = parseCli(process.argv.slice(2));
  if (!dmgPath && !appAsarPath) {
    throw new Error('Expected either --dmg or --app-asar');
  }
  if (dmgPath) {
    assertExists(dmgPath, 'Codex DMG');
  }
  if (appAsarPath) {
    assertExists(appAsarPath, 'Codex app.asar');
  }

  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'codex-dmg-refresh-'));

  try {
    let resolvedAppAsarPath = appAsarPath;
    if (!resolvedAppAsarPath) {
      await extractDmgToTemp(dmgPath, tempRoot);
      const appResourcesRoot = findAppResourcesRoot(tempRoot);
      resolvedAppAsarPath = path.join(appResourcesRoot, 'app.asar');
    }

    const extractedAppRoot = path.join(tempRoot, 'app.asar.extracted');
    asar.extractAll(resolvedAppAsarPath, extractedAppRoot);

    const upstreamPackage = JSON.parse(
      fs.readFileSync(path.join(extractedAppRoot, 'package.json'), 'utf8'),
    );
    const patchSummary = patchExtractedCodexApp(extractedAppRoot);
    const nativeModuleSummary = normalizeNativeModules(extractedAppRoot);

    syncExactDirectory(extractedAppRoot, outputRoot);

    const summary = {
      dmgPath,
      dmgSha256: dmgPath ? sha256(dmgPath) : null,
      appAsarPath: resolvedAppAsarPath,
      outputRoot,
      version: upstreamPackage.version,
      buildNumber: upstreamPackage.buildNumber ?? upstreamPackage.codexBuildNumber ?? null,
      electronVersion: upstreamPackage.devDependencies?.electron ?? null,
      main: upstreamPackage.main ?? null,
      patchSummary,
      nativeModuleSummary,
      tempRoot: keepTemp ? tempRoot : null,
    };

    const manifestPath = path.join(path.dirname(outputRoot), 'refresh-manifest.json');
    fs.writeFileSync(manifestPath, `${JSON.stringify(summary, null, 2)}\n`, 'utf8');
    process.stdout.write(`${JSON.stringify({ ...summary, manifestPath }, null, 2)}\n`);

    if (!keepTemp) {
      fs.rmSync(tempRoot, { recursive: true, force: true });
    }
  } catch (error) {
    if (!keepTemp) {
      fs.rmSync(tempRoot, { recursive: true, force: true });
    }

    throw error;
  }
}

await main();
