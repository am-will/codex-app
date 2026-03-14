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

function readRecoveredFullAppBundle(): string {
  const fullAppAsset = fs
    .readdirSync(recoveredWebAssetRoot)
    .find((entry) => /^full-app-.*\.js$/.test(entry));

  if (!fullAppAsset) {
    throw new Error(`Missing recovered full-app renderer bundle in ${recoveredWebAssetRoot}`);
  }

  return fs.readFileSync(path.join(recoveredWebAssetRoot, fullAppAsset), 'utf8');
}

describe('Review base branch regression gate (RED)', () => {
  test('default branch resolution still falls back to main or master in the worker bundle', () => {
    const workerSource = readRecoveredWorkerBundle();

    expect(workerSource).toContain('async handleDefaultBranch');
    expect(workerSource).toContain('r=(await JK(e.root,t,n))?.branch??null');
    expect(workerSource).toContain('r||=(await $J(e.root,10,t,n)).find(e=>e===`main`||e===`master`)??null');
    expect(workerSource).toContain('q({branch:r})');
  });

  test('renderer branch defaults still fall back to main and seed branch starting state', () => {
    const rendererSource = readRecoveredFullAppBundle();

    expect(rendererSource).toContain('default_branch??`main`');
    expect(rendererSource).toContain('asyncThreadStartingState:{type:i?`branch`:`working-tree`,branchName:i??`main`}');
    expect(rendererSource).toContain('`default-branch`');
    expect(rendererSource).toContain('`recent-branches`');
  });
});
