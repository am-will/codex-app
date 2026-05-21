import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, test } from '@jest/globals';

const desktopRoot = path.resolve(__dirname, '..', '..');
const recoveredBuildRoot = path.join(
  desktopRoot,
  'recovered',
  'app-asar-extracted',
  '.vite',
  'build',
);

function readRecoveredMainBundle(): string {
  const mainBundlePath = fs
    .readdirSync(recoveredBuildRoot)
    .find((entry) => /^main-.*\.js$/.test(entry));

  if (!mainBundlePath) {
    throw new Error(`Missing recovered hashed main bundle in ${recoveredBuildRoot}`);
  }

  return fs.readFileSync(path.join(recoveredBuildRoot, mainBundlePath), 'utf8');
}

describe('Automation run archive regression gate (RED)', () => {
  test('worktree automations derive starting state from the active branch and fall back to HEAD', () => {
    const mainSource = readRecoveredMainBundle();

    expect(mainSource).toMatch(
      /async function [A-Za-z_$][\w$]*\(e,n,r\)\{let i=\(await n\.getWorktreeRepository\(e,r\)\)\?\.root;/,
    );
    expect(mainSource).toMatch(
      /branchName:\(await t\.[A-Za-z_$][\w$]*\(i,r\)\)\?\.branch\?\?`HEAD`/,
    );
    expect(mainSource).toContain('{type:`branch`,branchName:`HEAD`}');
    expect(mainSource).toMatch(
      /[A-Za-z_$][\w$]*=n\.executionEnvironment===`worktree`&&![A-Za-z_$][\w$]*&&\(await o\.getWorktreeRepository\([A-Za-z_$][\w$]*,[A-Za-z_$][\w$]*\)\)\?\.root!=null/,
    );
    expect(mainSource).toMatch(
      /let e=await [A-Za-z_$][\w$]*\([A-Za-z_$][\w$]*,o,[A-Za-z_$][\w$]*\),r=await t\.[A-Za-z_$][\w$]*\(\{gitManager:o,workspaceRoot:[A-Za-z_$][\w$]*,startingState:e,localEnvironmentConfigPath:n\.localEnvironmentConfigPath,appServerClient:[A-Za-z_$][\w$]*\}\);/,
    );
  });
});
