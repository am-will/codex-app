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
      /async function [A-Za-z_$][\w$]*\([A-Za-z_$][\w$]*,[A-Za-z_$][\w$]*,[A-Za-z_$][\w$]*\)\{let [A-Za-z_$][\w$]*=await [A-Za-z_$][\w$]*\.getWorktreeRepository\([A-Za-z_$][\w$]*,[^;]+?\);return [A-Za-z_$][\w$]*\?/,
    );
    expect(mainSource).toMatch(
      /branchName:\(await [A-Za-z_$][\w$]*\.[A-Za-z_$][\w$]*\([A-Za-z_$][\w$]*\)\)\?\.branch\?\?`HEAD`/,
    );
    expect(mainSource).toContain('{type:`branch`,branchName:`HEAD`}');
    expect(mainSource).toMatch(
      /[A-Za-z_$][\w$]*=[A-Za-z_$][\w$]*\.executionEnvironment===`worktree`&&![A-Za-z_$][\w$]*&&\(await [A-Za-z_$][\w$]*\.getWorktreeRepository\([A-Za-z_$][\w$]*,[A-Za-z_$][\w$]*\)\)\?\.root!=null/,
    );
    expect(mainSource).toMatch(
      /let [A-Za-z_$][\w$]*=await [A-Za-z_$][\w$]*\([A-Za-z_$][\w$]*,[A-Za-z_$][\w$]*,[A-Za-z_$][\w$]*\),[A-Za-z_$][\w$]*=await [A-Za-z_$][\w$]*\.[A-Za-z_$][\w$]*\(\{gitManager:[A-Za-z_$][\w$]*,workspaceRoot:[A-Za-z_$][\w$]*,startingState:[A-Za-z_$][\w$]*,localEnvironmentConfigPath:[A-Za-z_$][\w$]*\.localEnvironmentConfigPath,host:[A-Za-z_$][\w$]*\}\);/,
    );
  });
});
