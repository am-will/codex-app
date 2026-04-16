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

    expect(mainSource).toContain(
      'async function zt(t,n,r){let i=(await n.getWorktreeRepository(t,r))?.root;',
    );
    expect(mainSource).toContain('branchName:(await e.St(i,r))?.branch??`HEAD`');
    expect(mainSource).toContain('{type:`branch`,branchName:`HEAD`}');
    expect(mainSource).toContain('E=t.executionEnvironment===`worktree`&&!g&&(await a.getWorktreeRepository(_,c))?.root!=null');
    expect(mainSource).toContain('let n=await zt(_,a,c),r=await e.bt({gitManager:a,workspaceRoot:_,startingState:n,localEnvironmentConfigPath:t.localEnvironmentConfigPath,appServerClient:c});');
  });
});
