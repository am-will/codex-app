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

    expect(mainSource).toMatch(/async function [A-Za-z_$][\w$]*\(e,t,r\)\{/);
    expect(mainSource).toContain('let i=await t.getWorktreeRepository(e,r);');
    expect(mainSource).toContain('branchName:(await n.');
    expect(mainSource).toContain('?.branch??`HEAD`');
    expect(mainSource).toContain('{type:`branch`,branchName:`HEAD`}');
    expect(mainSource).toMatch(
      /[A-Za-z_$][\w$]*=e\.executionEnvironment===`worktree`&&![A-Za-z_$][\w$]*&&\(await [A-Za-z_$][\w$]*\.getWorktreeRepository\([A-Za-z_$][\w$]*,[A-Za-z_$][\w$]*\)\)\?\.root!=null/,
    );
    expect(mainSource).toMatch(
      /let [A-Za-z_$][\w$]*=await [A-Za-z_$][\w$]*\([A-Za-z_$][\w$]*,[A-Za-z_$][\w$]*,[A-Za-z_$][\w$]*\),[A-Za-z_$][\w$]*=await n\.[A-Za-z_$][\w$]*\(\{gitManager:[A-Za-z_$][\w$]*,workspaceRoot:[A-Za-z_$][\w$]*,startingState:[A-Za-z_$][\w$]*,localEnvironmentConfigPath:e\.localEnvironmentConfigPath,appServerClient:[A-Za-z_$][\w$]*\}\);/,
    );
  });
});
