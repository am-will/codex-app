import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, test } from '@jest/globals';

import {
  RECOVERED_CODEX_CLI_PATH,
  RECOVERED_RG_EXECUTABLE_PATH,
  RECOVERED_WEBVIEW_DEV_SERVER_PORT,
  RECOVERED_WEBVIEW_DEV_SERVER_URL,
  RECOVERED_WEBVIEW_ROOT,
} from '../../dev/recovered-webview-dev-server';
import {
  desktopRoot,
  findRecoveredBuildFile,
  readDesktopFile,
  readRecoveredAsset,
  readRecoveredBuildFile,
  readRecoveredRendererEntry,
  readRecoveredWebviewIndex,
  recoveredBuildRoot,
  recoveredRoot,
} from './recovered-bundle.helpers';

describe('Recovered Codex bundle RED contract', () => {
  test('desktop vendors the extracted compiled Codex bundle', () => {
    expect(fs.existsSync(path.join(recoveredBuildRoot, 'bootstrap.js'))).toBe(true);
    expect(fs.existsSync(path.join(recoveredBuildRoot, 'worker.js'))).toBe(true);
    expect(
      fs.readdirSync(recoveredBuildRoot).some((entry) => /^main-.+\.js$/.test(entry)),
    ).toBe(true);
    expect(
      fs.readdirSync(recoveredBuildRoot).some((entry) => /^product-name-.+\.js$/.test(entry)),
    ).toBe(true);
    expect(fs.existsSync(path.join(recoveredBuildRoot, 'preload.js'))).toBe(true);
    expect(fs.existsSync(path.join(recoveredRoot, 'webview', 'index.html'))).toBe(true);
    expect(fs.existsSync(path.join(recoveredRoot, 'skills'))).toBe(true);
  });

  test('desktop package.json boots the recovered bundle with the expected Electron runtime deps', () => {
    const packageJson = JSON.parse(readDesktopFile('package.json')) as {
      main?: string;
      version?: string;
      codexBuildNumber?: string;
      devDependencies?: Record<string, string>;
      dependencies?: Record<string, string>;
      scripts?: Record<string, string>;
    };
    const bootstrapSource = readDesktopFile('recovered/app-asar-extracted/.vite/build/bootstrap.js');

    expect(packageJson.main).toBe('recovered/app-asar-extracted/.vite/build/bootstrap.js');
    expect(packageJson.version).toBe('26.325.21211');
    expect(packageJson.codexBuildNumber).toBe('1255');
    expect(packageJson.devDependencies?.electron).toBe('40.0.0');
    expect(packageJson.devDependencies?.['@electron/rebuild']).toBeDefined();
    expect(packageJson.dependencies?.['better-sqlite3']).toBeDefined();
    expect(packageJson.dependencies?.['node-pty']).toBeDefined();
    expect(packageJson.dependencies?.tslib).toBeDefined();
    expect(packageJson.scripts?.['rebuild:natives']).toContain('electron-rebuild');
    expect(packageJson.scripts?.start).toContain('npm run rebuild:natives');
    expect(packageJson.scripts?.package).toContain('npm run rebuild:natives');
    expect(packageJson.scripts?.make).toContain('npm run rebuild:natives');
    expect(packageJson.scripts?.['make:linux']).toContain('electron-forge make --platform linux');
    expect(bootstrapSource).toContain('Desktop bootstrap failed to start the main app');
    expect(bootstrapSource).toContain('runMainAppStartup');
    expect(bootstrapSource).toContain('console.error(');
  });

  test('webview index resolves the active renderer entry instead of pinning a full-app bundle name', () => {
    const webviewIndex = readRecoveredWebviewIndex();
    const rendererEntry = readRecoveredRendererEntry();

    expect(webviewIndex).toContain('<script type="module" crossorigin src="./assets/index-');
    expect(rendererEntry).toContain('persisted_selection_reconciled');
  });

  test('remote connection selection does not thrash when persisted state is undefined and the resolved selection is null', () => {
    const rendererEntry = readRecoveredRendererEntry();

    expect(rendererEntry).toContain('t==null?i??null:');
    expect(rendererEntry).toContain('t!=null&&i!==s&&(');
    expect(rendererEntry).toContain('persisted_selection_reconciled');
    expect(rendererEntry).toContain('a(s??void 0)');
  });

  test('forge packaging includes the recovered bundle path', () => {
    const forgeConfig = readDesktopFile('forge.config.ts');

    expect(forgeConfig).toContain('/recovered');
    expect(forgeConfig).toContain('/recovered/app-asar-extracted/node_modules');
    expect(forgeConfig).toContain('/node_modules/node-pty/prebuilds');
    expect(forgeConfig).toContain('new AutoUnpackNativesPlugin');
    expect(forgeConfig).toContain('new MakerDeb');
    expect(forgeConfig).toContain("name: '@reforged/maker-appimage'");
  });

  test('dev startup wires a local recovered webview server on the renderer port', () => {
    const forgeConfig = readDesktopFile('forge.config.ts');

    expect(RECOVERED_WEBVIEW_DEV_SERVER_PORT).toBe(5175);
    expect(RECOVERED_WEBVIEW_DEV_SERVER_URL).toBe('http://127.0.0.1:5175/');
    expect(RECOVERED_CODEX_CLI_PATH).toBe(
      path.join(desktopRoot, 'resources', 'bin', 'linux-x64', 'codex'),
    );
    expect(RECOVERED_RG_EXECUTABLE_PATH).toBe(
      path.join(desktopRoot, 'resources', 'bin', 'linux-x64', 'rg'),
    );
    expect(RECOVERED_WEBVIEW_ROOT).toBe(
      path.join(desktopRoot, 'recovered', 'app-asar-extracted', 'webview'),
    );
    expect(fs.existsSync(path.join(RECOVERED_WEBVIEW_ROOT, 'index.html'))).toBe(true);
    expect(fs.existsSync(RECOVERED_CODEX_CLI_PATH)).toBe(true);
    expect(fs.existsSync(RECOVERED_RG_EXECUTABLE_PATH)).toBe(true);
    expect(forgeConfig).toContain('preStart');
    expect(forgeConfig).toContain('applyRecoveredLinuxHelperEnv');
    expect(forgeConfig).toContain('ensureRecoveredWebviewDevServer');
    expect(forgeConfig).toContain('closeRecoveredWebviewDevServer');
  });

  test('resume still routes recovered threads back into the streaming owner flow', () => {
    const appServerHooks = readRecoveredAsset('app-server-manager-hooks-');

    expect(appServerHooks).toContain('resumeState=`needs_resume`');
    expect(appServerHooks).toContain('resumeState=`resuming`');
    expect(appServerHooks).toContain('resumeState=`resumed`');
    expect(appServerHooks).toContain(
      'e.markConversationStreaming(t),e.setConversationStreamRole(t,{role:`owner`})',
    );
    expect(appServerHooks).toContain('markedStreaming:!0');
  });

  test('local follow-up falls back to a new turn when steer hits a stale active-turn error', () => {
    const appServerHooks = readRecoveredAsset('app-server-manager-hooks-');

    expect(appServerHooks).toContain(
      'function dh(e){return e instanceof Error?e.name===sh||e.message.includes(sh):ye(e).includes(sh)}',
    );
    expect(appServerHooks).toContain(
      'if(e.removePendingSteer(t,c.id),dh(r))return await mm(e,t,{input:n.input,attachments:n.attachments??[]});',
    );
    expect(appServerHooks).toContain('await e.sendRequest(`turn/steer`');
    expect(appServerHooks).toContain('await e.sendRequest(`turn/start`');
  });

  test('background events for unknown conversations are ignored without error-log churn', () => {
    const appServerHooks = readRecoveredAsset('app-server-manager-hooks-');

    expect(appServerHooks).toContain('if(!this.conversations.has(a))break;n.method===`hook/started`');
    expect(appServerHooks).toContain('if(!this.conversations.get(a))break;this.markConversationStreaming(a)');
    expect(appServerHooks).toContain('if(!this.conversations.get(r))break;let a=null,o=null,s=null;');
    expect(appServerHooks).toContain(
      'if(!this.conversations.get(a))break;this.updateConversationState(a,t=>{',
    );
    expect(appServerHooks).not.toContain('breakthis.updateConversationState');
    expect(appServerHooks).not.toContain('Received item/started for unknown conversation');
    expect(appServerHooks).not.toContain('Received item/completed for unknown conversation');
    expect(appServerHooks).not.toContain('Received turn/completed for unknown conversation');
  });

  test('git origins skip nonexistent workspace paths before probing repo metadata', () => {
    const mainSource = readRecoveredBuildFile(findRecoveredBuildFile('main-'));

    expect(mainSource).toContain(
      'd=(o&&o.length>0?o:(u??[]).map(t=>e.$n(t))).filter(t=>{try{return!!t&&a.existsSync(t)}catch{return!1}})',
    );
    expect(mainSource).toContain(
      'params:{dirs:d,hostConfig:i,windowHostId:this.hostConfig.id}});',
    );
    expect(mainSource).not.toContain('d=o&&o.length>0?o:(u??[]).map(t=>e.$n(t))');
  });

  test('git repo watchers only start for live git queries, not metadata fanout', () => {
    const workerSource = readRecoveredBuildFile('worker.js');

    expect(workerSource).toContain(
      'e.method!==`stable-metadata`&&this.shouldWatchForMethod(e.method)&&await this.ensureWatchingForRequest(e.params,r);switch(e.method)',
    );
    expect(workerSource).toContain(
      'async handleResolveStableMetadata(e,{appServerClient:t}){let n=await this.gitManager.getStableMetadata(e.cwd,t);if(!n)return HL(`Not a git repository`);let r={commonDir:n.commonDir,root:n.root};return Y(r)}',
    );
    expect(workerSource).toContain(
      'shouldWatchForMethod(e){switch(e){case`current-branch`:case`upstream-branch`:case`branch-ahead-count`:case`default-branch`:case`base-branch`:case`recent-branches`:case`branch-changes`:case`status-summary`:case`staged-and-unstaged-changes`:case`untracked-changes`:case`synced-branch`:case`synced-branch-state`:case`tracked-uncommitted-changes`:case`submodule-paths`:case`index-info`:return!0;default:return!1}}async ensureWatchingForRequest(e,t){let n=typeof e.cwd==`string`?await this.gitManager.getStableMetadata(e.cwd,t):typeof e.root==`string`?await this.gitManager.getStableMetadata(e.root,t):null;if(!n)return;await this.ensureWatching({commonDir:n.commonDir,root:n.root},t)}',
    );
    expect(workerSource).not.toContain('return await this.ensureWatching(r,t),Y(r)');
  });

  test('desktop exposes a dedicated codex staging script that reuses the Linux shell', () => {
    const packageJson = JSON.parse(readDesktopFile('package.json')) as {
      scripts?: Record<string, string>;
    };
    const stagingScript = readDesktopFile('scripts/stage-codex-package.mjs');

    expect(packageJson.scripts?.['stage:codex-package']).toBe(
      'node ./scripts/stage-codex-package.mjs',
    );
    expect(packageJson.scripts?.['build:codex:linux']).toBe(
      'node ./scripts/build-codex-linux-runtime.mjs',
    );
    expect(stagingScript).toContain(
      "import { buildCodexLinuxRuntime } from './build-codex-linux-runtime.mjs';",
    );
    expect(stagingScript).toContain(
      "shellRoot: path.join(desktopRoot, 'out', 'Codex-linux-x64'),",
    );
    expect(stagingScript).toContain(
      "codexShellRoot: path.resolve(desktopRoot, '..', 'codex', 'app'),",
    );
    expect(stagingScript).toContain('buildCodexLinuxRuntime({');
  });
});
