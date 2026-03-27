import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, test } from '@jest/globals';

const desktopRoot = path.resolve(__dirname, '..', '..');
const recoveredRoot = path.join(desktopRoot, 'recovered', 'app-asar-extracted');
const recoveredBuildRoot = path.join(recoveredRoot, '.vite', 'build');

function readTextFile(relativePath: string): string {
  const fullPath = path.join(desktopRoot, relativePath);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Missing required file: ${relativePath}`);
  }

  return fs.readFileSync(fullPath, 'utf8');
}

function requireRecoveredBuildAsset(pattern: RegExp): string {
  const assetName = fs.readdirSync(recoveredBuildRoot).find((entry) => pattern.test(entry));

  if (!assetName) {
    throw new Error(`Missing recovered build asset matching ${pattern}`);
  }

  return path.join(recoveredBuildRoot, assetName);
}

describe('T8 RED contract: recovered compiled bundle integration', () => {
  test('recovered compiled bundle assets exist in desktop canonical location', () => {
    const requiredRecoveredPaths = [
      '.vite/build/bootstrap.js',
      '.vite/build/preload.js',
      '.vite/build/worker.js',
      'webview/index.html',
      'webview/assets',
      'skills',
    ];

    for (const relativePath of requiredRecoveredPaths) {
      const resolved = path.join(recoveredRoot, relativePath);
      expect(fs.existsSync(resolved)).toBe(true);
    }

    expect(fs.existsSync(requireRecoveredBuildAsset(/^main-.*\.js$/))).toBe(true);
    expect(fs.existsSync(requireRecoveredBuildAsset(/^product-name-.*\.js$/))).toBe(true);
  });

  test('desktop entrypoint is wired to recovered bootstrap and preload runtime', () => {
    const packageJson = JSON.parse(readTextFile('package.json')) as {
      main?: string;
    };
    const recoveredBootstrapSource = fs.readFileSync(
      path.join(recoveredBuildRoot, 'bootstrap.js'),
      'utf8',
    );
    const recoveredPreloadSource = fs.readFileSync(
      path.join(recoveredBuildRoot, 'preload.js'),
      'utf8',
    );

    expect(packageJson.main).toBe('recovered/app-asar-extracted/.vite/build/bootstrap.js');
    expect(recoveredBootstrapSource).toContain('Desktop bootstrap failed to start the main app');
    expect(recoveredBootstrapSource).toContain('app.whenReady().then');
    expect(recoveredBootstrapSource).toContain('console.error(');
    expect(recoveredPreloadSource).toContain('codex_desktop:message-from-view');
    expect(recoveredPreloadSource).toContain('codex_desktop:get-sentry-init-options');
  });

  test('forge packaging contract allows recovered runtime assets into packaged output', () => {
    const forgeConfig = readTextFile('forge.config.ts');

    expect(forgeConfig).toContain('/recovered');
    expect(forgeConfig).toContain('/recovered/app-asar-extracted/webview');
    expect(forgeConfig).toContain('/recovered/app-asar-extracted/skills');
    expect(forgeConfig).toContain('/recovered/app-asar-extracted/.vite');
    expect(forgeConfig).toContain('/recovered/app-asar-extracted/package.json');
    expect(forgeConfig).toContain('/recovered/app-asar-extracted/node_modules');
    expect(forgeConfig).toContain('/node_modules/node-pty/prebuilds');
    expect(forgeConfig).toContain('/resources');
    expect(forgeConfig).toContain('new AutoUnpackNativesPlugin');
    expect(forgeConfig).toContain("bin: 'Codex'");
  });
});
