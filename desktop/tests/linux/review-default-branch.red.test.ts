import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, test } from '@jest/globals';
const desktopRoot = path.resolve(__dirname, '..', '..');
const recoveredWorkerPath = path.join(
  desktopRoot,
  'recovered',
  'app-asar-extracted',
  '.vite',
  'build',
  'worker.js',
);
const recoveredWebAssetRoot = path.join(
  desktopRoot,
  'recovered',
  'app-asar-extracted',
  'webview',
  'assets',
);

function readRecoveredWorkerBundle(): string {
  if (!fs.existsSync(recoveredWorkerPath)) {
    throw new Error(`Missing recovered worker bundle: ${recoveredWorkerPath}`);
  }

  return fs.readFileSync(recoveredWorkerPath, 'utf8');
}

function readRecoveredWebAssetContaining(prefixes: string[], needles: string[]): string {
  const entries = fs.readdirSync(recoveredWebAssetRoot).sort();

  for (const entry of entries) {
    const assetPath = path.join(recoveredWebAssetRoot, entry);
    if (!entry.endsWith('.js') || !fs.statSync(assetPath).isFile()) continue;
    if (!prefixes.some((prefix) => entry.startsWith(prefix))) continue;

    const source = fs.readFileSync(assetPath, 'utf8');
    if (needles.every((needle) => source.includes(needle))) return source;
  }

  throw new Error(`Missing recovered web asset containing ${needles.join(', ')}`);
}

describe('Review base branch regression gate (RED)', () => {
  test('default branch resolution still falls back to main or master in the worker bundle', () => {
    const workerSource = readRecoveredWorkerBundle();

    expect(workerSource).toContain('async handleDefaultBranch');
    expect(workerSource).toContain('getWorktreeRepositoryForRoot(e.root,t)');
    expect(workerSource).toContain('?.branch??null;return');
    expect(workerSource).toMatch(
      /\.find\([A-Za-z_$][\w$]*=>[A-Za-z_$][\w$]*===`main`\|\|[A-Za-z_$][\w$]*===`master`\)\?\?null,[A-Za-z_$][\w$]*\(\{branch:[A-Za-z_$][\w$]*\}\)/,
    );
  });

  test('renderer branch defaults still fall back to main and seed branch starting state', () => {
    const rendererSource = readRecoveredWebAssetContaining(['app-initial~app-main~'], [
      'asyncThreadStartingState',
      'use-git-recent-branches-',
    ]);
    const branchSwitcherSource = readRecoveredWebAssetContaining(
      ['composer-footer-branch-switcher-', 'app-initial~app-main~'],
      ['default_branch??`main`'],
    );

    expect(rendererSource).toContain('default_branch');
    expect(branchSwitcherSource).toContain('default_branch??`main`');
    expect(rendererSource).toContain('asyncThreadStartingState');
    expect(rendererSource).toContain('`working-tree`');
    expect(rendererSource).toContain('use-git-recent-branches-');
  });
});
