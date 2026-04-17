import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, test } from '@jest/globals';

import {
  RECOVERED_CODEX_CLI_PATH,
  RECOVERED_GIT_EXECUTABLE_PATH,
  RECOVERED_RG_EXECUTABLE_PATH,
  RECOVERED_WEBVIEW_DEV_SERVER_PORT,
  RECOVERED_WEBVIEW_DEV_SERVER_URL,
  RECOVERED_WEBVIEW_ROOT,
} from '../../dev/recovered-webview-dev-server';
import {
  desktopRoot,
  readDesktopFile,
  readRecoveredBinary,
  readRecoveredAsset,
  readRecoveredBuildFile,
  readRecoveredMainBuildFile,
  readRecoveredRendererEntry,
  readRecoveredWebviewIndex,
  recoveredBuildRoot,
  recoveredRoot,
  getRecoveredRendererEntryFileName,
  findRecoveredAsset,
} from './recovered-bundle.helpers';

describe('Recovered Codex bundle RED contract', () => {
  test('desktop vendors the extracted compiled Codex bundle', () => {
    expect(fs.existsSync(path.join(recoveredBuildRoot, 'bootstrap.js'))).toBe(true);
    expect(fs.existsSync(path.join(recoveredBuildRoot, 'worker.js'))).toBe(true);
    expect(
      fs.readdirSync(recoveredBuildRoot).some((entry) => /^main-.+\.js$/.test(entry)),
    ).toBe(true);
    expect(fs.existsSync(path.join(recoveredBuildRoot, 'preload.js'))).toBe(true);
    expect(fs.existsSync(path.join(recoveredRoot, 'webview', 'index.html'))).toBe(true);
    expect(fs.existsSync(path.join(recoveredRoot, 'skills'))).toBe(true);
  });

  test('recovered native modules are normalized to Linux ELF binaries', () => {
    const expectedElfMagic = [0x7f, 0x45, 0x4c, 0x46];
    const nativeModulePaths = [
      'node_modules/better-sqlite3/build/Release/better_sqlite3.node',
      'node_modules/node-pty/build/Release/pty.node',
    ];
    const nodePtyBinRoot = path.join(recoveredRoot, 'node_modules', 'node-pty', 'bin');
    const abiDirectories = fs.existsSync(nodePtyBinRoot)
      ? fs.readdirSync(nodePtyBinRoot).filter((entry) => /^linux-x64-\d+$/.test(entry)).sort()
      : [];

    for (const abiDirectory of abiDirectories) {
      nativeModulePaths.push(`node_modules/node-pty/bin/${abiDirectory}/node-pty.node`);
    }

    for (const relativePath of nativeModulePaths) {
      expect(Array.from(readRecoveredBinary(relativePath).subarray(0, 4))).toEqual(
        expectedElfMagic,
      );
    }
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
    const preloadSource = readDesktopFile('recovered/app-asar-extracted/.vite/build/preload.js');

    expect(packageJson.main).toBe('recovered/app-asar-extracted/.vite/build/bootstrap.js');
    expect(packageJson.version).toBe('26.415.20818');
    expect(packageJson.codexBuildNumber).toBe('1727');
    expect(packageJson.devDependencies?.electron).toBe('41.2.0');
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
    expect(bootstrapSource).toContain(
      'process.platform===`linux`&&typeof process.resourcesPath==`string`',
    );
    expect(bootstrapSource).toContain(
      '(()=>{try{process.stderr?.writable&&console.error(',
    );
    expect(preloadSource).toContain(';try{await e.ipcRenderer.invoke(');
    expect(preloadSource).not.toContain(',try{await e.ipcRenderer.invoke(');
  });

  test('webview index resolves the active renderer entry instead of pinning a full-app bundle name', () => {
    const webviewIndex = readRecoveredWebviewIndex();
    const rendererEntryFileName = getRecoveredRendererEntryFileName();
    const rendererEntry = readRecoveredRendererEntry();

    expect(rendererEntryFileName).toMatch(/^index-.+\.js$/);
    expect(webviewIndex).toContain(
      `<script type="module" crossorigin src="./assets/${rendererEntryFileName}">`,
    );
    expect(rendererEntry).toContain('loginWithChatGpt');
    expect(rendererEntry).toContain('open-in-browser');
  });

  test('renderer entry keeps ChatGPT auth handoff and branch defaults wired through the active bundle', () => {
    const rendererEntry = readRecoveredRendererEntry();

    expect(rendererEntry).toContain('loginWithChatGpt');
    expect(rendererEntry).toContain('open-in-browser');
    expect(rendererEntry).toContain('useExternalBrowser:!0');
    expect(rendererEntry).toContain('default_branch??`main`');
    expect(rendererEntry).toContain('`recent-branches`');
    expect(rendererEntry).toContain('asyncThreadStartingState:{type:i?`branch`:`working-tree`,branchName:i??`main`}');
  });

  test('renderer entry keeps the browser pane enabled for Linux desktop flows', () => {
    const rendererEntry = readRecoveredRendererEntry();
    const zeroArgBrowserPaneGateCalls = rendererEntry.match(/\bBf\(\)/g) ?? [];

    expect(rendererEntry).toContain('function vhe(){let e=(0,Q.c)(4),t=He(Cm),n=!0,r,i;return');
    expect(rendererEntry).toContain('toggleBrowserPanel');
    expect(rendererEntry).toContain('p=!0,m=rf(mr)');
    expect(rendererEntry).toContain('function dY(e){let t=(0,Q.c)(16),{showReviewTab:n}=e,r=He(Cm),i=!0,a=Ae(no),o=Ae(To.activeTab$),s=Ae(Oc),c;');
    expect(rendererEntry).toContain('function __e(){let e=He(j),t=ea(),n=me(),r=vf(),i=!0,a=Og(),o=cN(),[,s]=se(`diff_comments`),[c]=se(`remote_connections`),[l]=se(`remote_control_connections`)');
    expect(rendererEntry).toContain(
      'v=(e.patchBatches==null||e.patchBatches.length===1)&&e.unifiedDiff.length>0&&r!=null?[{cwd:r,diff:e.unifiedDiff}]:e.patchBatches?.flatMap(',
    );
    expect(zeroArgBrowserPaneGateCalls).toHaveLength(0);
  });

  test('model settings fall back from broken workspace cwd and write directly to config.toml', () => {
    const modelSettingsSource = readRecoveredAsset('use-model-settings-');
    const assembleScript = readDesktopFile('scripts/assemble-codex-runtime.mjs');

    expect(modelSettingsSource).toContain(
      'queryFn:async()=>{try{return await zt(r,e)}catch{try{return await zt(r,null)}catch{return null}}}',
    );
    expect(modelSettingsSource).toContain('let E=QCe(T),M=Y9(a).configPath,D;');
    expect(modelSettingsSource).toContain('batch-write-config-value');
    expect(modelSettingsSource).toContain('filePath:n??null');
    expect(modelSettingsSource).not.toContain('let n=Y9(a).configPath');
    expect(modelSettingsSource).not.toContain('set-default-model-config-for-host');
    expect(assembleScript).toContain('model settings saved-config cwd fallback');
    expect(assembleScript).toContain('model settings direct user config write');
  });

  test('forge packaging includes the recovered bundle path', () => {
    const forgeConfig = readDesktopFile('forge.config.ts');

    expect(forgeConfig).toContain('/recovered');
    expect(forgeConfig).toContain('/recovered/app-asar-extracted/node_modules');
    expect(forgeConfig).toContain('/node_modules/node-pty/prebuilds');
    expect(forgeConfig).toContain("icon: linuxPackagerIcon");
    expect(forgeConfig).toContain("icon: linuxAppImageIconSet");
    expect(forgeConfig).toContain('new AutoUnpackNativesPlugin');
    expect(forgeConfig).toContain('new MakerDeb');
    expect(forgeConfig).toContain("name: '@reforged/maker-appimage'");
  });

  test('linux branding assets are vendored for package metadata and recovered UI chrome', () => {
    expect(fs.existsSync(path.join(desktopRoot, 'assets', 'icons', 'codex-logo-32.png'))).toBe(true);
    expect(fs.existsSync(path.join(desktopRoot, 'assets', 'icons', 'codex-logo-64.png'))).toBe(true);
    expect(fs.existsSync(path.join(desktopRoot, 'assets', 'icons', 'codex-logo-128.png'))).toBe(true);
    expect(fs.existsSync(path.join(desktopRoot, 'assets', 'icons', 'codex-logo-256.png'))).toBe(true);
    expect(fs.existsSync(path.join(desktopRoot, 'assets', 'icons', 'codex-logo-512.png'))).toBe(true);
    expect(
      fs.existsSync(
        path.join(recoveredRoot, 'webview', 'assets', findRecoveredAsset('app-', '.png')),
      ),
    ).toBe(true);
  });

  test('dev startup wires a local recovered webview server on the renderer port', () => {
    const forgeConfig = readDesktopFile('forge.config.ts');

    expect(RECOVERED_WEBVIEW_DEV_SERVER_PORT).toBe(5175);
    expect(RECOVERED_WEBVIEW_DEV_SERVER_URL).toBe('http://127.0.0.1:5175/');
    expect(RECOVERED_CODEX_CLI_PATH).toBe(
      path.join(desktopRoot, 'resources', 'bin', 'linux-x64', 'codex'),
    );
    expect(RECOVERED_GIT_EXECUTABLE_PATH).toBe(
      path.join(desktopRoot, 'resources', 'bin', 'linux-x64', 'git'),
    );
    expect(RECOVERED_RG_EXECUTABLE_PATH).toBe(
      path.join(desktopRoot, 'resources', 'bin', 'linux-x64', 'rg'),
    );
    expect(RECOVERED_WEBVIEW_ROOT).toBe(
      path.join(desktopRoot, 'recovered', 'app-asar-extracted', 'webview'),
    );
    expect(fs.existsSync(path.join(RECOVERED_WEBVIEW_ROOT, 'index.html'))).toBe(true);
    expect(fs.existsSync(RECOVERED_CODEX_CLI_PATH)).toBe(true);
    expect(fs.existsSync(RECOVERED_GIT_EXECUTABLE_PATH)).toBe(true);
    expect(fs.existsSync(RECOVERED_RG_EXECUTABLE_PATH)).toBe(true);
    expect(forgeConfig).toContain('preStart');
    expect(forgeConfig).toContain('applyRecoveredLinuxHelperEnv');
    expect(forgeConfig).toContain('ensureRecoveredWebviewDevServer');
    expect(forgeConfig).toContain('closeRecoveredWebviewDevServer');
  });

  test('main bundle keeps Linux browser-session auth handoff and skips nonexistent git origin paths', () => {
    const mainSource = readRecoveredMainBuildFile();
    const linuxTargetMatches = mainSource.match(/platforms:\{linux:\{/g) ?? [];

    expect(mainSource).toContain('r.useExternalBrowser===!0');
    expect(mainSource).toContain('openUrlWithLinuxBrowserSession');
    expect(mainSource).toContain('function linuxResolveEditorTarget(');
    expect(mainSource).toContain('id:`cursor`,platforms:{linux:{label:`Cursor`');
    expect(mainSource).toContain('id:`fileManager`,platforms:{linux:{label:`File Manager`');
    expect(mainSource).toContain('linuxFileManagerDetect(){return G(`xdg-open`)');
    expect(linuxTargetMatches.length).toBeGreaterThan(5);
    expect(mainSource).toMatch(
      /d=\(o&&o\.length>0\?o:u\.filter\(e=>e!==`~`\)\.map\(t=>e\.[A-Za-z$_]+\(\w+\)\)\)\.filter\(t=>\{try\{return!!t&&a\.existsSync\(t\)\}catch\{return!1\}\}\)/,
    );
    expect(mainSource).toContain('params:{dirs:d,hostConfig:i,windowHostId:this.hostConfig.id}});');
  });

  test('git worker exposes the refreshed repo-watch and host-path contract', () => {
    const workerSource = readRecoveredBuildFile('worker.js');

    expect(workerSource).toContain('`stable-metadata`');
    expect(workerSource).toContain('watchForGitInit');
    expect(workerSource).toContain('`codex-home`');
    expect(workerSource).toContain('`platform-family`');
    expect(workerSource).toContain('`fs-watch`');
    expect(workerSource).toContain('`worker-exit`');
    expect(workerSource).toContain('function normalizeApplyPatchDiffPaths(');
    expect(workerSource).toContain('let P=normalizeApplyPatchDiffPaths(l,g);');
    expect(workerSource).toContain('await rZ(v,P,{appServerClient:n,signal:o})');
    expect(workerSource).toContain('await eZ(g,P,n,{preferWslPaths:r');
    expect(workerSource).toContain('$(e,[`add`,`-f`,`--`,...o],n,{env:i,signal:r})');
    expect(workerSource).toContain('$(e,[`add`,`-f`,`--`,...n],i,{env:t,signal:r})');
    expect(workerSource).toContain('$(e,[`add`,`-f`,`--`,...c],n,{env:a,signal:o})');
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
