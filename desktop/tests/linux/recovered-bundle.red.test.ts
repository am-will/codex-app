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
    expect(
      fs.readdirSync(recoveredBuildRoot).some((entry) => /^bootstrap-.+\.js$/.test(entry)),
    ).toBe(true);
    expect(fs.existsSync(path.join(recoveredBuildRoot, 'worker.js'))).toBe(true);
    expect(
      fs.readdirSync(recoveredBuildRoot).some((entry) => /^main-.+\.js$/.test(entry)),
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
    const hashedBootstrapPath = fs
      .readdirSync(recoveredBuildRoot)
      .find((entry) => /^bootstrap-.+\.js$/.test(entry));

    if (!hashedBootstrapPath) {
      throw new Error(`Missing hashed bootstrap asset in ${recoveredBuildRoot}`);
    }

    const hashedBootstrapSource = readDesktopFile(
      `recovered/app-asar-extracted/.vite/build/${hashedBootstrapPath}`,
    );

    expect(packageJson.main).toBe('recovered/app-asar-extracted/.vite/build/bootstrap.js');
    expect(packageJson.version).toBe('26.311.21342');
    expect(packageJson.codexBuildNumber).toBe('993');
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
    expect(bootstrapSource).toContain('require("./bootstrap-');
    expect(hashedBootstrapSource).toContain('Desktop bootstrap failed to start the main app');
  });

  test('webview index resolves the active renderer entry instead of pinning a full-app bundle name', () => {
    const webviewIndex = readRecoveredWebviewIndex();
    const rendererEntry = readRecoveredRendererEntry();

    expect(webviewIndex).toContain('<script type="module" crossorigin src="./assets/index-');
    expect(rendererEntry).toContain('no active turn to steer');
  });

  test('remote connection selection does not thrash when persisted state is undefined and the resolved selection is null', () => {
    const rendererEntry = readRecoveredRendererEntry();

    expect(rendererEntry).toContain('let p=i??null;');
    expect(rendererEntry).toContain('t!=null&&p!==s&&(');
    expect(rendererEntry).toContain('R.info(`${eae} persisted_selection_reconciled`,{safe:{availableConnectionCount:c.length,selectedConnectionState:u==null?`cleared`:`selected`},sensitive:{persistedSelectedRemoteHostId:i,selectedRemoteHostId:s}})');
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
      'function $d(e){return e instanceof Error?e.name===Yd||e.message.includes(Yd):String(e).includes(Yd)}',
    );
    expect(appServerHooks).toContain('if(e.removePendingSteer(t,c.id),$d(n))return await Td(e,t,{input:n.input,attachments:n.attachments??[]});');
    expect(appServerHooks).toContain('await e.sendRequest(`turn/steer`');
    expect(appServerHooks).toContain('await e.sendRequest(`turn/start`');
  });

  test('background events for unknown conversations are ignored without error-log churn', () => {
    const appServerHooks = readRecoveredAsset('app-server-manager-hooks-');

    expect(appServerHooks).toContain('if(!this.conversations.get(i))break;this.markConversationStreaming(i)');
    expect(appServerHooks).toContain('if(!this.conversations.get(r))break;let i=null;');
    expect(appServerHooks).toContain(
      'if(!this.conversations.get(i))break;this.updateConversationState(i,t=>{',
    );
    expect(appServerHooks).not.toContain('breakthis.updateConversationState');
    expect(appServerHooks).not.toContain('Received item/started for unknown conversation');
    expect(appServerHooks).not.toContain('Received item/completed for unknown conversation');
    expect(appServerHooks).not.toContain('Received turn/completed for unknown conversation');
  });

  test('git origins skip nonexistent workspace paths before probing repo metadata', () => {
    const mainSource = readRecoveredBuildFile(findRecoveredBuildFile('main-'));

    expect(mainSource).toContain(
      'd=(o&&o.length>0?o:u??[]).filter(m=>{try{return!!m&&k.existsSync(m)}catch{return!1}})',
    );
    expect(mainSource).toContain(
      'h=Array.from(new Set([...d,...p])).filter(m=>{try{return!!m&&k.existsSync(m)}catch{return!1}});return{origins:(await Ed(h,this.gitManager,i)).map(',
    );
    expect(mainSource).not.toContain('d=o&&o.length>0?o:u??[]');
    expect(mainSource).not.toContain(
      'h=Array.from(new Set([...d,...p]));return{origins:(await Ed(h,this.gitManager,i)).map(',
    );
  });

  test('git repo watchers only start for live git queries, not metadata fanout', () => {
    const workerSource = readRecoveredBuildFile('worker.js');

    expect(workerSource).toContain(
      't.method!=="stable-metadata"&&this.shouldWatchForMethod(t.method)&&await this.ensureWatchingForRequest(t.params,r);switch(t.method)',
    );
    expect(workerSource).toContain(
      'async handleResolveStableMetadata(t,{hostConfig:n}){const r=await this.gitManager.getStableMetadata(t.cwd,n);if(!r)return bi("Not a git repository");const s={commonDir:r.commonDir,root:r.root};return he(s)}',
    );
    expect(workerSource).toContain(
      'shouldWatchForMethod(t){switch(t){case"current-branch":case"upstream-branch":case"branch-ahead-count":case"default-branch":case"base-branch":case"recent-branches":case"branch-changes":case"status-summary":case"staged-and-unstaged-changes":case"untracked-changes":case"synced-branch":case"synced-branch-state":case"tracked-uncommitted-changes":case"submodule-paths":case"index-info":return!0;default:return!1}}async ensureWatchingForRequest(t,n){const r=typeof t.cwd=="string"?await this.gitManager.getStableMetadata(t.cwd,n):typeof t.root=="string"?await this.gitManager.getStableMetadata(t.root,n):null;if(!r)return;await this.ensureWatching({commonDir:r.commonDir,root:r.root},n)}',
    );
    expect(workerSource).not.toContain('return await this.ensureWatching(s,n),he(s)');
  });

  test('desktop exposes a dedicated 3-12 staging script that reuses the Linux shell', () => {
    const packageJson = JSON.parse(readDesktopFile('package.json')) as {
      scripts?: Record<string, string>;
    };
    const stagingScript = readDesktopFile('scripts/stage-codex-3-12-package.mjs');

    expect(packageJson.scripts?.['stage:3-12-package']).toBe(
      'node ./scripts/stage-codex-3-12-package.mjs',
    );
    expect(packageJson.scripts?.['build:legacy-3-12:linux']).toBe(
      'node ./scripts/build-legacy-3-12-linux.mjs',
    );
    expect(stagingScript).toContain(
      "import { buildLegacyLinuxRuntime } from './build-legacy-3-12-linux.mjs';",
    );
    expect(stagingScript).toContain(
      "shellRoot: path.join(desktopRoot, 'out', 'Codex-linux-x64'),",
    );
    expect(stagingScript).toContain(
      "legacyShellRoot: path.resolve(desktopRoot, '..', 'codex-3-12', 'app'),",
    );
    expect(stagingScript).toContain('buildLegacyLinuxRuntime({');
  });
});
