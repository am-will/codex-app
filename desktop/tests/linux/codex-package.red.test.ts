import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, test } from '@jest/globals';

import { desktopRoot, readDesktopFile } from './recovered-bundle.helpers';

type PackageJson = {
  scripts?: Record<string, string>;
};

function getScriptFilePathsFromCommand(command: string): string[] {
  const scriptPaths = new Set<string>();
  const regex = /node\s+\.\/scripts\/([^\s"']+)/g;
  let match: RegExpExecArray | null = regex.exec(command);

  while (match?.[1]) {
    scriptPaths.add(`scripts/${match[1]}`);
    match = regex.exec(command);
  }

  return Array.from(scriptPaths);
}

describe('Codex package staging RED contract', () => {
  test('desktop package scripts expose canonical codex-package staging commands', () => {
    const packageJson = JSON.parse(readDesktopFile('package.json')) as PackageJson;
    const scripts = packageJson.scripts ?? {};
    const requiredScripts = [
      'assemble:codex-runtime',
      'build:codex:linux',
      'stage:codex-package',
    ];
    const scriptPaths = new Set<string>();

    for (const scriptName of requiredScripts) {
      expect(scripts[scriptName]).toBeDefined();
      const command = scripts[scriptName] as string;
      for (const relativeScriptPath of getScriptFilePathsFromCommand(command)) {
        scriptPaths.add(relativeScriptPath);
      }
    }

    const obsoleteScriptEntries = Object.entries(scripts).filter(
      ([name, command]) => /legacy/i.test(name) || /3-12/.test(name) || /legacy/i.test(command) || /3-12/.test(command),
    );
    expect(obsoleteScriptEntries).toHaveLength(0);

    expect(scriptPaths.size).toBeGreaterThan(0);

    for (const relativeScriptPath of scriptPaths) {
      expect(fs.existsSync(path.join(desktopRoot, relativeScriptPath))).toBe(true);
    }
  });

  test('codex staging scripts target the codex payload and avoid recovered-runtime coupling', () => {
    const packageJson = JSON.parse(readDesktopFile('package.json')) as PackageJson;
    const scripts = packageJson.scripts ?? {};
    const codexScriptCommands = [
      scripts['assemble:codex-runtime'],
      scripts['build:codex:linux'],
      scripts['stage:codex-package'],
    ].filter((command): command is string => typeof command === 'string');
    const scriptRelativePaths = new Set<string>();

    for (const command of codexScriptCommands) {
      for (const scriptPath of getScriptFilePathsFromCommand(command)) {
        scriptRelativePaths.add(scriptPath);
      }
    }

    expect(scriptRelativePaths.size).toBeGreaterThan(0);
    const joinedScriptSources = Array.from(scriptRelativePaths)
      .map((relativePath) => readDesktopFile(relativePath))
      .join('\n');
    expect(joinedScriptSources).toContain("path.join(repoRoot, 'codex', 'app', 'resources')");
    expect(joinedScriptSources).toContain("app.asar");
    expect(joinedScriptSources).toContain("resources");
    expect(joinedScriptSources).not.toContain("recovered/app-asar-extracted");

    for (const relativePath of scriptRelativePaths) {
      const source = readDesktopFile(relativePath);

      expect(source).not.toMatch(/codex-\d-\d+/);
      expect(source).not.toContain("app.asar.bak.");
      expect(source).not.toContain("rm -rf");
    }

    const assembleSource = readDesktopFile('scripts/assemble-codex-runtime.mjs');
    expect(assembleSource).toContain('function applyStringPatch(');
    expect(assembleSource).toContain('patch target not found');
  });

  test('codex staging scripts intentionally handle shell payload files that drift from current Linux shell', () => {
    const packageJson = JSON.parse(readDesktopFile('package.json')) as PackageJson;
    const scripts = packageJson.scripts ?? {};
    const codexScriptCommands = [
      scripts['assemble:codex-runtime'],
      scripts['build:codex:linux'],
      scripts['stage:codex-package'],
    ].filter((command): command is string => typeof command === 'string');
    const scriptRelativePaths = new Set<string>();

    for (const command of codexScriptCommands) {
      for (const scriptPath of getScriptFilePathsFromCommand(command)) {
        scriptRelativePaths.add(scriptPath);
      }
    }

    expect(scriptRelativePaths.size).toBeGreaterThan(0);

    const joinedScriptSources = Array.from(scriptRelativePaths)
      .map((relativePath) => readDesktopFile(relativePath))
      .join('\n');

    expect(joinedScriptSources).toContain('resources.pak');
    expect(joinedScriptSources).toContain('chrome_100_percent.pak');
    expect(joinedScriptSources).toContain('v8_context_snapshot.bin');
    expect(joinedScriptSources).toContain('icudtl.dat');
  });

  test('codex staging scripts preserve Linux native modules via app.asar.unpacked from the shell', () => {
    const packageJson = JSON.parse(readDesktopFile('package.json')) as PackageJson;
    const scripts = packageJson.scripts ?? {};
    const codexScriptCommands = [
      scripts['assemble:codex-runtime'],
      scripts['build:codex:linux'],
      scripts['stage:codex-package'],
    ].filter((command): command is string => typeof command === 'string');
    const scriptRelativePaths = new Set<string>();

    for (const command of codexScriptCommands) {
      for (const scriptPath of getScriptFilePathsFromCommand(command)) {
        scriptRelativePaths.add(scriptPath);
      }
    }

    expect(scriptRelativePaths.size).toBeGreaterThan(0);

    const joinedScriptSources = Array.from(scriptRelativePaths)
      .map((relativePath) => readDesktopFile(relativePath))
      .join('\n');

    expect(joinedScriptSources).toContain('app.asar.unpacked');
    expect(joinedScriptSources).toContain('Linux shell app.asar.unpacked');
  });

  test('codex payload prerequisites are present in repo for deterministic staging', () => {
    expect(fs.existsSync(path.join(desktopRoot, '..', 'codex', 'app', 'resources', 'app.asar'))).toBe(true);
    expect(fs.existsSync(path.join(desktopRoot, '..', 'codex', 'app', 'resources', 'codex'))).toBe(true);
    expect(fs.existsSync(path.join(desktopRoot, '..', 'codex', 'app', 'resources', 'rg'))).toBe(true);
  });

  test('linux release workflow uses committed Linux helpers and writes concrete release note filenames', () => {
    const workflowSource = readDesktopFile('../.github/workflows/linux-release.yml');

    expect(workflowSource).not.toContain('lfs: true');
    expect(workflowSource).toContain('Hydrate Linux codex helpers');
    expect(workflowSource).toContain('@openai/codex@0.124.0');
    expect(workflowSource).toContain('Verify Linux codex helpers');
    expect(workflowSource).toContain('desktop/resources/bin/linux-x64/codex');
    expect(workflowSource).toContain('desktop/resources/bin/linux-x64/rg');
    expect(workflowSource).toContain('desktop/resources/bin/linux-x64/codex --version');
    expect(workflowSource).toContain('desktop/resources/bin/linux-x64/rg --version');
    expect(workflowSource).not.toContain('RELEASE_APPIMAGE_URL=');
    expect(workflowSource).not.toContain('--appimage-extract');
    expect(workflowSource).toContain('CURRENT_APPIMAGE_NAME=');
    expect(workflowSource).toContain('CURRENT_DEB_NAME=');
    expect(workflowSource).toContain('- ${CURRENT_APPIMAGE_NAME}');
    expect(workflowSource).toContain('- ${CURRENT_DEB_NAME}');
    expect(workflowSource).not.toContain('<current-version>');
  });
});
