import fs from 'node:fs';
import childProcess from 'node:child_process';
import os from 'node:os';
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
  const localAppAsarPath = path.resolve(
    desktopRoot,
    '..',
    'codex-dmg',
    'Codex.app',
    'Contents',
    'Resources',
    'app.asar',
  );
  const newDmgPath = path.resolve(desktopRoot, '..', 'Codex.dmg');
  const localRefreshArgs = fs.existsSync(localAppAsarPath)
    ? ['--app-asar', localAppAsarPath]
    : fs.existsSync(newDmgPath)
      ? ['--dmg', newDmgPath]
      : null;
  const testWithLocalSource = localRefreshArgs ? test : test.skip;

  testWithLocalSource(
    'canonical refresh script patches the new local source bundle into a temp recovered bundle',
    () => {
      const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'codex-refresh-test-'));
      const outputRoot = path.join(tempRoot, 'app-asar-extracted');

      const result = childProcess.spawnSync(
        process.execPath,
        [
          'scripts/refresh-recovered-from-dmg.mjs',
          ...localRefreshArgs!,
          '--output',
          outputRoot,
        ],
        {
          cwd: desktopRoot,
          encoding: 'utf8',
          maxBuffer: 20 * 1024 * 1024,
          timeout: 180_000,
        },
      );

      expect(result.status).toBe(0);
      expect(result.stderr).toBe('');

      const summary = JSON.parse(result.stdout) as {
        outputRoot: string;
        sourceType: 'dmg' | 'app-asar';
        version: string;
        buildNumber: string | null;
        electronVersion: string | null;
        dmgSha256: string | null;
        appAsarSha256: string | null;
        patchSummary: Record<string, { results: Array<{ label: string; patched: boolean; skipped: boolean }> }>;
      };
      const mainBundle = fs.readFileSync(
        path.join(
          outputRoot,
          '.vite',
          'build',
          fs.readdirSync(path.join(outputRoot, '.vite', 'build')).find((entry) =>
            /^main-.+\.js$/.test(entry),
          ) ?? '',
        ),
        'utf8',
      );
      const outputAssetsRoot = path.join(outputRoot, 'webview', 'assets');
      const rendererEntry = fs.readFileSync(
        path.join(
          outputAssetsRoot,
          fs
            .readdirSync(outputAssetsRoot)
            .find((entry) => entry.startsWith('index-') && entry.endsWith('.js')) ?? '',
        ),
        'utf8',
      );
      const modelSettingsBundle = fs.readFileSync(
        path.join(
          outputRoot,
          'webview',
          'assets',
          fs.readdirSync(outputAssetsRoot).find((entry) =>
            entry.startsWith('use-model-settings-') && entry.endsWith('.js'),
          ) ?? '',
        ),
        'utf8',
      );
      const pluginsPageBundle = fs.readFileSync(
        path.join(
          outputAssetsRoot,
          fs.readdirSync(outputAssetsRoot).find((entry) =>
            entry.startsWith('plugins-page-') && entry.endsWith('.js'),
          ) ?? '',
        ),
        'utf8',
      );
      const pluginsCardsBundle = fs.readFileSync(
        path.join(
          outputAssetsRoot,
          fs.readdirSync(outputAssetsRoot).find((entry) =>
            entry.startsWith('plugins-cards-grid-') && entry.endsWith('.js'),
          ) ?? '',
        ),
        'utf8',
      );

      expect(summary.outputRoot).toBe(outputRoot);
      expect(summary.version).toBe('26.422.21637');
      expect(summary.buildNumber).toBe('2056');
      expect(summary.electronVersion).toBe('41.2.0');
      expect(summary.appAsarSha256).toMatch(/^[a-f0-9]{64}$/);
      if (summary.sourceType === 'dmg') {
        expect(summary.dmgSha256).toMatch(/^[a-f0-9]{64}$/);
      } else {
        expect(summary.dmgSha256).toBeNull();
      }
      expect(mainBundle).toContain('openUrlWithLinuxBrowserSession');
      expect(mainBundle).toContain('require(`../../scripts/linux-browser-launch.js`)');
      expect(mainBundle).not.toContain('require(`../../../../scripts/linux-browser-launch.js`)');
      expect(mainBundle).toContain(
        '(n===`win32`||n===`linux`)?{titleBarStyle:`hidden`,titleBarOverlay:ow()}',
      );
      expect(mainBundle).toContain(
        'process.platform===`linux`?{color:`#2b2f36`,symbolColor:`#ffffff`',
      );
      expect(mainBundle).toContain(
        'if(process.platform!==`win32`&&process.platform!==`linux`||t!==`primary`)return;',
      );
      expect(mainBundle).toContain(
        '(process.platform===`win32`||process.platform===`linux`)?{autoHideMenuBar:!0}:{}',
      );
      expect(mainBundle).toContain(
        '(process.platform===`win32`||process.platform===`linux`)&&k.removeMenu()',
      );
      expect(mainBundle).toContain('function linuxResolveEditorTarget(');
      expect(mainBundle).toMatch(
        /\.filter\(t=>\{try\{return!!t&&[a-z]\.existsSync\(t\)\}catch\{return!1\}\}\)/,
      );
      expect(rendererEntry).toContain('useExternalBrowser:!0');
      expect(summary.patchSummary.modelSettings.results).toEqual([]);
      expect(pluginsPageBundle).toContain(
        's.dispatchMessage(`open-in-browser`,{url:o,useExternalBrowser:!0}),i&&k(!1)',
      );
      expect(pluginsPageBundle).toContain(
        'function ls(e){let t=e?.trim();t&&s.dispatchMessage(`open-in-browser`,{url:t,useExternalBrowser:!0})}',
      );
      expect(pluginsPageBundle).toContain(
        'function Ss(e){s.dispatchMessage(`open-in-browser`,{url:e,useExternalBrowser:!0})}',
      );
      expect(pluginsPageBundle).toContain(
        's.dispatchMessage(`open-in-browser`,{url:e,useExternalBrowser:!0}),o(!1)',
      );
      expect(pluginsPageBundle).toContain(
        'case`browser-fallback`:k(!1),n?.installUrl?.trim()&&s.dispatchMessage(`open-in-browser`,{url:n.installUrl.trim(),useExternalBrowser:!0});return;',
      );
      expect(pluginsPageBundle).toContain(
        'return(e===`windows`||e===`linux`)&&window.electronBridge?.showApplicationMenu!=null',
      );
      expect(pluginsCardsBundle).toContain(
        'openInBrowser:e=>{i.dispatchMessage(`open-in-browser`,{url:e,useExternalBrowser:!0})}',
      );
      expect(pluginsCardsBundle).toContain(
        'i.dispatchMessage(`open-in-browser`,{url:o,useExternalBrowser:!0});return',
      );
      expect(pluginsCardsBundle).toContain(
        'case`browser-fallback`:x({appId:e.appId,status:`pending`}),e.installUrl&&i.dispatchMessage(`open-in-browser`,{url:e.installUrl,useExternalBrowser:!0});return;',
      );
      expect(pluginsCardsBundle).toContain('/aip/connectors/links/oauth/callback');
      expect(summary.patchSummary.authWebview.pluginsPage.results).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            label: 'apps page app connect requests native external browser',
          }),
          expect.objectContaining({
            label: 'apps page openInBrowser callback requests native external browser',
          }),
          expect.objectContaining({
            label: 'apps page install url requests native external browser',
          }),
          expect.objectContaining({
            label: 'apps page resolved url requests native external browser',
          }),
          expect.objectContaining({
            label: 'apps page browser fallback opens install url',
          }),
        ]),
      );
      expect(summary.patchSummary.authWebview.pluginsCards.results).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            label: 'plugin install app connect requests native external browser',
          }),
          expect.objectContaining({
            label: 'plugin install direct install url requests native external browser',
          }),
          expect.objectContaining({
            label: 'plugin install browser fallback opens install url',
          }),
        ]),
      );
      expect(summary.patchSummary.mainProcess.results).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ label: 'git origins existing-path filter' }),
          expect.objectContaining({ label: 'linux auth browser session handoff' }),
          expect.objectContaining({ label: 'linux opaque primary window background' }),
          expect.objectContaining({
            label: 'linux title bar overlay uses high contrast controls',
          }),
          expect.objectContaining({
            label: 'linux title bar overlay refreshes on theme changes',
          }),
          expect.objectContaining({ label: 'linux primary window uses custom title bar' }),
          expect.objectContaining({ label: 'linux open-in target registry' }),
        ]),
      );
    },
    180_000,
  );

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

  test('recovered bootstrap only requires sibling build chunks that are vendored in git', () => {
    const bootstrapSource = readRecoveredBuildFile('bootstrap.js');
    const requiredSiblings = [
      ...bootstrapSource.matchAll(/require\((?:'|")\.\/([^'"]+)(?:'|")\)/g),
      ...bootstrapSource.matchAll(/require\(`\.\/([^`]+)`\)/g),
    ]
      .map((match) => match[1])
      .filter((entry) => entry.endsWith('.js'));

    expect(requiredSiblings.length).toBeGreaterThan(0);

    for (const sibling of new Set(requiredSiblings)) {
      expect(fs.existsSync(path.join(recoveredBuildRoot, sibling))).toBe(true);
    }
  });

  test('assembly script normalizes Linux native modules into the packaged runtime', () => {
    const assembleScript = readDesktopFile('scripts/assemble-codex-runtime.mjs');

    expect(assembleScript).toContain('resolveLinuxNativeModuleSourceRoot');
    expect(assembleScript).toContain('normalizeNativeModules(extractedAppRoot)');
    expect(assembleScript).toContain(
      "path.join(extractedAppRoot, 'node_modules', relativePath)",
    );
    expect(assembleScript).toContain("'better-sqlite3'");
    expect(assembleScript).toContain("'better_sqlite3.node'");
    expect(assembleScript).toContain("'node-pty'");
    expect(assembleScript).toContain("'pty.node'");
    expect(assembleScript).toContain("'node-pty.node'");
    expect(assembleScript).toContain(
      'Could not locate rebuilt Linux native modules under any candidate root',
    );
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
    expect(packageJson.version).toBe('26.422.21641');
    expect(packageJson.codexBuildNumber).toBe('2056');
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

  test('tracked refresh manifest records the source metadata for the current recovered bundle', () => {
    const manifest = JSON.parse(readDesktopFile('recovered/refresh-manifest.json')) as {
      sourceType?: 'dmg' | 'app-asar' | null;
      dmgPath?: string | null;
      dmgSha256?: string | null;
      appAsarPath?: string | null;
      appAsarSha256?: string | null;
      version?: string | null;
      buildNumber?: string | null;
      electronVersion?: string | null;
      patchSummary?: {
        authWebview?: {
          pluginsPage?: { results: Array<{ label: string }> };
          pluginsCards?: { results: Array<{ label: string }> };
        };
      };
    };

    expect(manifest.sourceType).toBe('app-asar');
    expect(manifest.appAsarPath).toContain('/codex-dmg/Codex.app/Contents/Resources/app.asar');
    expect(manifest.appAsarSha256).toMatch(/^[a-f0-9]{64}$/);
    expect(manifest.dmgPath).toBeNull();
    expect(manifest.dmgSha256).toBeNull();
    expect(manifest.version).toBe('26.422.21637');
    expect(manifest.buildNumber).toBe('2056');
    expect(manifest.electronVersion).toBe('41.2.0');
    expect(manifest.patchSummary?.authWebview?.pluginsPage?.results).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          label: 'apps page app connect requests native external browser',
        }),
        expect.objectContaining({
          label: 'apps page openInBrowser callback requests native external browser',
        }),
        expect.objectContaining({
          label: 'apps page install url requests native external browser',
        }),
        expect.objectContaining({
          label: 'apps page resolved url requests native external browser',
        }),
        expect.objectContaining({
          label: 'apps page browser fallback opens install url',
        }),
      ]),
    );
    expect(manifest.patchSummary?.authWebview?.pluginsCards?.results).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          label: 'plugin install app connect requests native external browser',
        }),
        expect.objectContaining({
          label: 'plugin install direct install url requests native external browser',
        }),
        expect.objectContaining({
          label: 'plugin install browser fallback opens install url',
        }),
      ]),
    );
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

    expect(rendererEntry).toContain('toggleBrowserPanel');
    expect(rendererEntry).toContain('electron-desktop-features-changed');
    expect(rendererEntry).toContain('browserPane:a');
    expect(rendererEntry).toContain('browserAgent:o.enabled');
    expect(rendererEntry).toContain(
      'v=(e.patchBatches==null||e.patchBatches.length===1)&&e.unifiedDiff.length>0&&r!=null?[{cwd:r,diff:e.unifiedDiff}]:e.patchBatches?.flatMap(',
    );
  });

  test('plugins page enables the custom title menu on Linux', () => {
    const pluginsPage = readRecoveredAsset('plugins-page-');

    expect(pluginsPage).toContain(
      'return(e===`windows`||e===`linux`)&&window.electronBridge?.showApplicationMenu!=null',
    );
    expect(pluginsPage).toContain('window.electronBridge?.showApplicationMenu');
    expect(pluginsPage).toContain('windowsMenuBar.file');
  });

  test('model settings patch hooks remain available even when the latest upstream bundle skips them', () => {
    const modelSettingsSource = readRecoveredAsset('use-model-settings-');
    const assembleScript = readDesktopFile('scripts/assemble-codex-runtime.mjs');
    const manifest = JSON.parse(
      fs.readFileSync(path.join(desktopRoot, 'recovered', 'refresh-manifest.json'), 'utf8'),
    ) as {
      patchSummary: {
        modelSettings: {
          results: unknown[];
        };
      };
    };

    expect(modelSettingsSource).toContain('set-default-model-config-for-host');
    expect(assembleScript).toContain('model settings saved-config cwd fallback');
    expect(assembleScript).toContain('model settings direct user config write');
    expect(manifest.patchSummary.modelSettings.results).toEqual([]);
  });

  test('forge packaging includes the recovered bundle path', () => {
    const forgeConfig = readDesktopFile('forge.config.ts');

    expect(forgeConfig).toContain('/recovered');
    expect(forgeConfig).toContain('/recovered/app-asar-extracted/node_modules');
    expect(forgeConfig).toContain('/node_modules/node-pty/prebuilds');
    expect(forgeConfig).toContain("icon: linuxPackagerIcon");
    expect(forgeConfig).toContain("icon: linuxAppImageIconSet");
    expect(forgeConfig).toContain("CODEX_LINUX_HELPER_ARCH ?? 'linux-x64'");
    expect(forgeConfig).toContain("'linux-arm64'");
    expect(forgeConfig).toContain("path.join(linuxHelperResourceRoot, 'codex')");
    expect(forgeConfig).toContain("path.join(linuxHelperResourceRoot, 'rg')");
    expect(forgeConfig).toContain('new AutoUnpackNativesPlugin');
    expect(forgeConfig).toContain('new MakerDeb');
    expect(forgeConfig).toContain('new MakerRpm');
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

    expect(mainSource).toContain('useExternalBrowser===!0');
    expect(mainSource).toContain('openUrlWithLinuxBrowserSession');
    expect(mainSource).toContain('function linuxResolveEditorTarget(');
    expect(mainSource).toContain('id:`cursor`,platforms:{linux:{label:`Cursor`');
    expect(mainSource).toContain('id:`fileManager`,platforms:{linux:{label:`File Manager`');
    expect(mainSource).toMatch(
      /linuxFileManagerDetect\(\)\{return [A-Za-z$_]+\(`xdg-open`\)\?\?linuxResolveAbsoluteCommand\(`\/usr\/bin\/xdg-open`\)\}/,
    );
    expect(linuxTargetMatches.length).toBeGreaterThan(5);
    expect(mainSource).toMatch(
      /[a-z]=\([a-z]&&[a-z]\.length>0\?[a-z]:[a-z]\.filter\(e=>e!==`~`\)\.map\(t=>e\.[A-Za-z$_]+\([a-z]\)\)\)\.filter\(t=>\{try\{return!!t&&[a-z]\.existsSync\(t\)\}catch\{return!1\}\}\)/,
    );
    expect(mainSource).toContain('windowHostId:this.hostConfig.id}});');
  });

  test('git worker exposes the refreshed repo-watch and host-path contract', () => {
    const workerSource = readRecoveredBuildFile('worker.js');

    expect(workerSource).toContain('`stable-metadata`');
    expect(workerSource).toContain('watchForGitInit');
    expect(workerSource).toContain('`codex-home`');
    expect(workerSource).toContain('`platform-family`');
    expect(workerSource).toContain('`fs-watch`');
    expect(workerSource).toContain('`worker-exit`');

    const assembleScript = readDesktopFile('scripts/assemble-codex-runtime.mjs');
    expect(assembleScript).toContain('git worker normalize absolute patch headers');
    expect(assembleScript).toContain('git worker normalize diff before apply');
    expect(assembleScript).toContain('git worker normalize diff for temp index');
    expect(assembleScript).toContain('git worker force-add ignored diff paths in temp index');
    expect(assembleScript).toContain('git worker force-add ignored snapshot paths');
    expect(assembleScript).toContain('git worker force-add ignored existing apply-patch paths');
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
    expect(packageJson.scripts?.['make:linux:arm64:deb']).toBe(
      'npm run rebuild:natives && CODEX_LINUX_HELPER_ARCH=linux-arm64 electron-forge make --platform linux --arch arm64 --targets @electron-forge/maker-deb',
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
