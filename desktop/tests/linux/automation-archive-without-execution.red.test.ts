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

    expect(mainSource).toContain('async function Et(e,n,r){let i=(await n.getWorktreeRepository(e,r))?.root;');
    expect(mainSource).toContain('branchName:(await t.Rt(i,r))?.branch??`HEAD`');
    expect(mainSource).toContain('{type:`branch`,branchName:`HEAD`}');
    expect(mainSource).toContain(
      'E=n.executionEnvironment===`worktree`&&!_&&(await o.getWorktreeRepository(v,l))?.root!=null',
    );
    expect(mainSource).toContain(
      'let e=await Et(v,o,l),r=await t.It({gitManager:o,workspaceRoot:v,startingState:e,localEnvironmentConfigPath:n.localEnvironmentConfigPath,appServerClient:l});',
    );
  });
});
