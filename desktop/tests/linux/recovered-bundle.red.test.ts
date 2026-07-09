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
  readRecoveredBootstrapBuildFile,
  readRecoveredBuildFile,
  readRecoveredMainBuildFile,
  readRecoveredRendererEntry,
  readRecoveredWebviewIndex,
  recoveredBuildRoot,
  recoveredRoot,
  getRecoveredRendererEntryFileName,
  findRecoveredAsset,
  readOptionalRecoveredAsset,
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
  const versionedUpstreamAppAsarPath = path.resolve(
    desktopRoot,
    'tmp',
    'upstream-26.707.31123',
    'extracted',
    'ChatGPT.app',
    'Contents',
    'Resources',
    'app.asar',
  );
  const currentUnversionedUpstreamAppAsarPath = path.resolve(
    desktopRoot,
    'tmp',
    'upstream',
    'extracted',
    'Codex.app',
    'Contents',
    'Resources',
    'app.asar',
  );
  const legacyUpstreamAppAsarPath = path.resolve(
    desktopRoot,
    'tmp',
    'codex-upstream',
    'extracted',
    'Codex.app',
    'Contents',
    'Resources',
    'app.asar',
  );
  const newDmgPath = path.resolve(desktopRoot, '..', 'Codex.dmg');
  const currentUpstreamAppAsarPath = fs.existsSync(versionedUpstreamAppAsarPath)
    ? versionedUpstreamAppAsarPath
    : fs.existsSync(currentUnversionedUpstreamAppAsarPath)
      ? currentUnversionedUpstreamAppAsarPath
    : legacyUpstreamAppAsarPath;
  const localRefreshArgs = fs.existsSync(currentUpstreamAppAsarPath)
    ? ['--app-asar', currentUpstreamAppAsarPath]
    : fs.existsSync(newDmgPath)
      ? ['--dmg', newDmgPath]
      : fs.existsSync(localAppAsarPath)
        ? ['--app-asar', localAppAsarPath]
        : null;
  const testWithLocalSource = localRefreshArgs ? test : test.skip;
  const findAssetContaining = (
    assetsRoot: string,
    prefixes: string[],
    needles: string[],
  ): string => {
    const entries = fs.readdirSync(assetsRoot).sort();
    for (const entry of entries) {
      const assetPath = path.join(assetsRoot, entry);
      if (!entry.endsWith('.js') || !fs.statSync(assetPath).isFile()) continue;
      if (!prefixes.some((prefix) => entry.startsWith(prefix))) continue;
      const source = fs.readFileSync(assetPath, 'utf8');
      if (needles.every((needle) => source.includes(needle))) return entry;
    }
    throw new Error(`Could not find asset with ${needles.join(', ')}`);
  };
  const readRecoveredAssetContaining = (prefixes: string[], needles: string[]) =>
    readRecoveredAsset(findAssetContaining(path.join(recoveredRoot, 'webview', 'assets'), prefixes, needles));

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
      const outputPackage = JSON.parse(
        fs.readFileSync(path.join(outputRoot, 'package.json'), 'utf8'),
      ) as { codexAppBrand?: string };
      const usesChatGptBrand = outputPackage.codexAppBrand === 'chatgpt';
      const workspaceRootDropHandlerAsset = fs
        .readdirSync(path.join(outputRoot, '.vite', 'build'))
        .find((entry) => /^workspace-root-drop-handler-.+\.js$/.test(entry));
      const workspaceRootDropHandlerBundle = workspaceRootDropHandlerAsset
        ? fs.readFileSync(
            path.join(outputRoot, '.vite', 'build', workspaceRootDropHandlerAsset),
            'utf8',
          )
        : null;
      const outputAssetsRoot = path.join(outputRoot, 'webview', 'assets');
      const outputWebviewIndex = fs.readFileSync(path.join(outputRoot, 'webview', 'index.html'), 'utf8');
      const rendererEntryFileName = outputWebviewIndex.match(
        /<script type="module" crossorigin src="\.\/assets\/(index-[^"]+\.js)">/,
      )?.[1];
      expect(rendererEntryFileName).toBeDefined();
      const rendererEntry = fs.readFileSync(
        path.join(outputAssetsRoot, rendererEntryFileName ?? ''),
        'utf8',
      );
      const readOutputAsset = (prefix: string) =>
        fs.readFileSync(
          path.join(
            outputAssetsRoot,
            fs.readdirSync(outputAssetsRoot).find((entry) => {
              const assetPath = path.join(outputAssetsRoot, entry);
              return entry.startsWith(prefix) && entry.endsWith('.js') && fs.statSync(assetPath).isFile();
            }) ?? '',
          ),
          'utf8',
        );
      const readOutputAssetContaining = (prefixes: string[], needles: string[]) =>
        fs.readFileSync(
          path.join(outputAssetsRoot, findAssetContaining(outputAssetsRoot, prefixes, needles)),
          'utf8',
        );
      const loginRouteBundle = readOutputAsset('login-route-');
      const composerBundle = readOutputAssetContaining(['app-initial~app-main~', 'composer-'], [
        'threadGoalDraft',
      ]);
      const appShellBundle = readOutputAssetContaining(['app-shell-', 'app-initial~app-main~'], [
        'data-linux-codex-window-controls',
        'linux-application-menu-panel',
      ]);
      const pluginsPageBundle = fs.readFileSync(
        path.join(
          outputAssetsRoot,
          fs.readdirSync(outputAssetsRoot).find((entry) =>
            entry.startsWith('plugins-page-') && entry.endsWith('.js'),
          ) ?? '',
        ),
        'utf8',
      );
      const pluginInstallFlowAsset = fs
        .readdirSync(outputAssetsRoot)
        .find((entry) => entry.startsWith('use-plugin-install-flow-') && entry.endsWith('.js'));
      const pluginInstallFlowBundle =
        pluginInstallFlowAsset == null
          ? null
          : fs.readFileSync(path.join(outputAssetsRoot, pluginInstallFlowAsset), 'utf8');
      const pluginsCardsAsset = fs
        .readdirSync(outputAssetsRoot)
        .find((entry) => entry.startsWith('plugins-cards-grid-') && entry.endsWith('.js'));
      const pluginsCardsBundle =
        pluginsCardsAsset == null
          ? null
          : fs.readFileSync(path.join(outputAssetsRoot, pluginsCardsAsset), 'utf8');
      const pushProtectionBundle = readOutputAssetContaining(
        ['app-initial~app-main~page-'],
        ['github-push-protection-false-positive'],
      );

      expect(summary.outputRoot).toBe(outputRoot);
      expect(summary.version).toBe('26.707.31123');
      expect(summary.buildNumber).toBe('5042');
      expect(summary.electronVersion).toBe('42.1.0');
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
        'n===`win32`||n===`linux`?{titleBarStyle:`hidden`,titleBarOverlay:',
      );
      expect(mainBundle).toContain('codex_desktop:control-window');
      expect(mainBundle).toContain('codex_desktop:get-application-menu-items');
      expect(mainBundle).toContain('click(void 0,n??void 0,n?.webContents)');
      expect(mainBundle).toContain(
        'process.platform!==`win32`&&process.platform!==`linux`||t!==`primary`',
      );
      expect(mainBundle).toContain('focusable:m??!0');
      expect(mainBundle).toContain('e.webContents?.focus?.()');
      expect(mainBundle).toMatch(
        /[A-Za-z_$][\w$]*===`primary`&&![A-Za-z_$][\w$]*\.isDestroyed\(\)&&\([A-Za-z_$][\w$]*\.focus\(\),[A-Za-z_$][\w$]*\.webContents\.focus\(\)\)/,
      );
      expect(mainBundle).toContain("autoHideMenuBar:!0");
      expect(mainBundle).toContain("process.platform!==`darwin`&&");
      expect(mainBundle).toContain(".removeMenu()");
      if (!usesChatGptBrand) {
        expect(mainBundle).toContain('function linuxResolveAbsoluteCommand(');
        expect(mainBundle).toContain('${process.env.HOME}/.local/bin/${e[0]}');
        expect(mainBundle).toContain('linuxCursor={id:`cursor`');
        expect(mainBundle).toContain(
          'linuxZed={id:`zed`,platforms:{linux:{label:`Zed`,icon:`apps/zed.png`,kind:`editor`,detect:()=>linuxResolveEditorTarget([`zed`],[`/usr/bin/zed`,`/opt/zed/zed`,`/opt/Zed/zed`])',
        );
        expect(mainBundle).toContain('linuxFileManager={id:`fileManager`');
      }
      if (usesChatGptBrand) {
        expect(workspaceRootDropHandlerBundle).toBeNull();
      } else {
        expect(workspaceRootDropHandlerBundle).toContain('return null');
      }
      expect(mainBundle).toMatch(
        /\.filter\(e=>\{try\{return!!e&&[A-Za-z_$][\w$]*\.existsSync\(e\)\}catch\{return!1\}\}\)/,
      );
      expect(loginRouteBundle).toContain('openTarget:`external-browser`');
      expect(composerBundle).toContain('threadGoalDraft');
      expect(summary.patchSummary.modelSettings.results).toEqual([]);
      expect(pluginsPageBundle).toContain('plugins');
      expect(pluginInstallFlowBundle ?? pluginsPageBundle).toContain('plugins');
      expect(appShellBundle).toContain('app-shell-shortcut-state-changed');
      expect(appShellBundle).toContain('data-linux-codex-window-controls');
      expect(appShellBundle).toContain('linux-application-menu-panel');
      expect(appShellBundle).toContain('style:{paddingLeft:t*14}');
      expect(pluginsCardsBundle ?? pluginsPageBundle).toContain('plugins');
      expect(summary.patchSummary.authWebview.pluginsPage.results).toEqual([]);
      expect(summary.patchSummary.authWebview.pluginsCards.results).toEqual([]);
      expect(pushProtectionBundle).not.toMatch(/sk\.(?:kind|conversation|key)\b/);
      expect(pushProtectionBundle).not.toMatch(/`pk\.eyJ/);
      expect(pushProtectionBundle).not.toMatch(/import\(`\.\/page-[^`]*sk\.js`\)/);
      expect(summary.patchSummary.pushProtection.results).toEqual([
        expect.objectContaining({
          label: 'avoid Mapbox token false positive in generated page bundle',
          patched: true,
        }),
      ]);
      const expectedMainProcessPatches = [
        'git origins existing-path filter',
        'linux auth browser session handoff',
        'linux opaque primary window background',
        'linux primary window uses custom title bar',
        'linux primary window is explicitly focusable',
        'linux show window focuses web contents',
        'linux ready-to-show focuses web contents',
        'linux window controls ipc handler',
        'linux application menu serialization ipc handler',
        ...(!usesChatGptBrand ? ['linux open-in target registry'] : []),
      ];
      expect(summary.patchSummary.mainProcess.results).toEqual(
        expect.arrayContaining([
          ...expectedMainProcessPatches.map((label) => expect.objectContaining({ label })),
        ]),
      );
      expect(summary.patchSummary.workspaceRootDropHandler.results).toEqual(
        usesChatGptBrand
          ? []
          : [
              expect.objectContaining({
                label: 'linux owl feature binding falls back when unavailable',
              }),
            ],
      );
    },
    180_000,
  );

  test('desktop vendors the extracted compiled Codex bundle', () => {
    expect(
      fs.readdirSync(recoveredBuildRoot).some((entry) => /^bootstrap(?:-.+)?\.js$/.test(entry)),
    ).toBe(true);
    expect(fs.existsSync(path.join(recoveredBuildRoot, 'early-bootstrap.js'))).toBe(true);
    expect(fs.existsSync(path.join(recoveredBuildRoot, 'worker.js'))).toBe(true);
    expect(
      fs.readdirSync(recoveredBuildRoot).some((entry) => /^main-.+\.js$/.test(entry)),
    ).toBe(true);
    expect(fs.existsSync(path.join(recoveredBuildRoot, 'preload.js'))).toBe(true);
    expect(fs.existsSync(path.join(recoveredRoot, 'webview', 'index.html'))).toBe(true);
  });

  test('recovered bootstrap only requires sibling build chunks that are vendored in git', () => {
    const bootstrapSource = readRecoveredBootstrapBuildFile();
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
    const bootstrapSource = readRecoveredBootstrapBuildFile();
    const preloadSource = readDesktopFile('recovered/app-asar-extracted/.vite/build/preload.js');

    expect(packageJson.main).toBe('recovered/app-asar-extracted/.vite/build/early-bootstrap.js');
    expect(packageJson.version).toBe('26.707.31123');
    expect(packageJson.codexBuildNumber).toBe('5042');
    expect(packageJson.devDependencies?.electron).toBe('42.1.0');
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
    expect(bootstrapSource).toContain(
      'process.env.ELECTRON_OZONE_PLATFORM_HINT=`x11`',
    );
    expect(bootstrapSource).toContain(
      'app.commandLine.appendSwitch(`ozone-platform`,`x11`)',
    );
    expect(bootstrapSource).toContain(
      'for(let e of C({buildFlavor:Z,env:process.env}))',
    );
    expect(bootstrapSource).not.toContain(
      'for(let e of S({buildFlavor:Z,env:process.env}))',
    );
    expect(bootstrapSource).not.toContain('app.commandLine.appendSwitch(`ozone-platform`,`wayland`)');
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
    expect(manifest.appAsarPath).toBe('ChatGPT.app/Contents/Resources/app.asar');
    expect(manifest.appAsarSha256).toMatch(/^[a-f0-9]{64}$/);
    expect(manifest.dmgPath).toBeNull();
    expect(manifest.dmgSha256).toBeNull();
    expect(manifest.version).toBe('26.707.31123');
    expect(manifest.buildNumber).toBe('5042');
    expect(manifest.electronVersion).toBe('42.1.0');
    expect(manifest.patchSummary?.authWebview?.pluginsPage?.results).toEqual([]);
    expect(manifest.patchSummary?.authWebview?.pluginsCards?.results).toEqual([]);
  });

  test('webview index resolves the active renderer entry instead of pinning a full-app bundle name', () => {
    const webviewIndex = readRecoveredWebviewIndex();
    const rendererEntryFileName = getRecoveredRendererEntryFileName();
    const rendererEntry = readRecoveredRendererEntry();

    expect(rendererEntryFileName).toMatch(/^index-.+\.js$/);
    expect(webviewIndex).toContain(
      `<script type="module" crossorigin src="./assets/${rendererEntryFileName}">`,
    );
    expect(rendererEntry).toContain('app-main-');
    expect(rendererEntry).toContain('__vite__mapDeps');
  });

  test('renderer entry keeps ChatGPT auth handoff and branch defaults wired through the active bundle', () => {
    const rendererEntry = readRecoveredRendererEntry();
    const loginRoute = readRecoveredAsset('login-route-');

    expect(rendererEntry).toContain('app-main-');
    expect(loginRoute).toContain('openTarget:`external-browser`');
  });

  test('renderer entry keeps the browser pane enabled for Linux desktop flows', () => {
    const rendererEntry = readRecoveredRendererEntry();
    const appMainBundle = readRecoveredAssetContaining(['app-initial~app-main~'], [
      'electron-desktop-features-changed',
      'tool_suggest',
    ]);
    const composerBundle = readRecoveredAssetContaining(['app-initial~app-main~', 'composer-'], [
      'threadGoalDraft',
    ]);

    expect(rendererEntry).toContain('app-main-');
    expect(appMainBundle).toContain('toggleBrowserPanel');
    expect(appMainBundle).toContain('electron-desktop-features-changed');
    expect(appMainBundle).toContain('tool_suggest');
    expect(composerBundle).toContain('threadGoalDraft');
    expect(
      readRecoveredAssetContaining(
        [
          'app-initial~app-main~',
          'hotkey-window-home-page-',
          'local-remote-dropdown-',
          'use-collaboration-mode-',
        ],
        ['reasoning_effort'],
      ),
    ).toContain('reasoning_effort');
  });

  test('ChatGPT renderer and bundled app-server use the matched native protocol', () => {
    const mainSource = readRecoveredMainBuildFile();
    const modelBundle = readRecoveredAssetContaining(['app-initial~app-main~'], ['gpt-5.6-sol']);
    const recoveredPackageJson = JSON.parse(
      readDesktopFile('recovered/app-asar-extracted/package.json'),
    ) as { codexAppBrand?: string };
    const packageJson = JSON.parse(readDesktopFile('package.json')) as {
      codexCliVersion?: string;
    };
    const manifest = JSON.parse(readDesktopFile('recovered/refresh-manifest.json')) as {
      patchSummary: {
        rendererThreadStart: { results: unknown[] };
        rendererRequestClient: { results: unknown[] };
      };
    };
    const assembleScript = readDesktopFile('scripts/assemble-codex-runtime.mjs');

    expect(recoveredPackageJson.codexAppBrand).toBe('chatgpt');
    expect(packageJson.codexCliVersion).toBe('0.144.0-alpha.4');
    expect(modelBundle).toContain('gpt-5.6-sol');
    expect(mainSource).toContain('Native pet composition lifecycle');
    expect(manifest.patchSummary.rendererThreadStart.results).toEqual([]);
    expect(manifest.patchSummary.rendererRequestClient.results).toEqual([]);
    expect(assembleScript).toContain('extractedAppUsesChatGptBrand');
  });

  test('tracked renderer preserves values while avoiding a Mapbox-token false positive', () => {
    const pageBundle = readRecoveredAssetContaining(
      ['app-initial~app-main~page-'],
      ['github-push-protection-false-positive'],
    );
    const publicTokenExpression = pageBundle.match(
      /`p\$\{\/\* github-push-protection-false-positive \*\/`k`\}\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+`/,
    )?.[0];
    const pageAssetExpression = pageBundle.match(
      /`\.\/page-[^`]*\$\{\/\* github-push-protection-false-positive \*\/`sk`\}\.js`/,
    )?.[0];

    expect(pageBundle).not.toMatch(/sk\.(?:kind|conversation|key)\b/);
    expect(pageBundle).not.toMatch(/`pk\.eyJ/);
    expect(pageBundle).not.toMatch(/import\(`\.\/page-[^`]*sk\.js`\)/);
    expect(Function(`return ${publicTokenExpression}`)()).toMatch(/^pk\.eyJ/);
    expect(Function(`return ${pageAssetExpression}`)()).toBe('./page-RBIzsAsk.js');
  });

  test('dictation shortcuts stay configurable instead of using stale Ctrl+M behavior', () => {
    const mainSource = readRecoveredMainBuildFile();
    const appMainBundle = readRecoveredAssetContaining(['app-initial~app-main~'], [
      'electron-desktop-features-changed',
    ]);
    const composerBundle = readRecoveredAssetContaining(['app-initial~app-main~', 'composer-'], [
      'codex-micro-push-to-talk-start',
    ]);
    const dictationSources = [mainSource, appMainBundle, composerBundle].join('\n');

    expect(mainSource).toContain('globalDictationHold');
    expect(mainSource).toContain('globalDictationToggle');
    expect(mainSource).toContain('global-dictation-set-hotkey');
    expect(mainSource).toContain('global-dictation-set-toggle-hotkey');
    expect(mainSource).toContain('set-codex-command-keybinding');
    expect(mainSource).toContain('globalShortcut.register');
    expect(composerBundle).toContain('codex-micro-push-to-talk-start');
    expect(composerBundle).toContain('codex-micro-push-to-talk-stop');
    expect(dictationSources).not.toContain('Ctrl+M');
    expect(dictationSources).not.toContain('Control+M');
    expect(dictationSources).not.toMatch(
      /(?:dictation|Dictation|globalDictation|push-to-talk|micro)[\s\S]{0,240}KeyM/,
    );
  });

  test('plugin page menu patch is skipped when the upstream shell no longer needs it', () => {
    const appShell = readRecoveredAssetContaining(['app-shell-', 'app-initial~app-main~'], [
      'app-shell-shortcut-state-changed',
    ]);
    const manifest = JSON.parse(readDesktopFile('recovered/refresh-manifest.json')) as {
      patchSummary?: {
        authWebview?: {
          pluginsPage?: { results: unknown[] };
          pluginsCards?: { results: unknown[] };
        };
      };
    };

    expect(appShell).toContain('app-shell-shortcut-state-changed');
    expect(manifest.patchSummary?.authWebview?.pluginsPage?.results).toEqual([]);
    expect(manifest.patchSummary?.authWebview?.pluginsCards?.results).toEqual([]);
  });

  test('model settings patch hooks remain available even when the latest upstream bundle skips them', () => {
    const modelSettingsSource =
      readOptionalRecoveredAsset('use-model-settings-') ??
      readRecoveredAssetContaining(
        ['app-initial~app-main~', 'use-collaboration-mode-', 'local-remote-dropdown-'],
        ['model_reasoning_effort', 'config_query_diverged', 'set-default-model-config-for-host'],
      );
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

    expect(modelSettingsSource).toContain('model_reasoning_effort');
    expect(modelSettingsSource).toContain('config_query_diverged');
    expect(modelSettingsSource).toContain('set-default-model-config-for-host');
    expect(assembleScript).toContain('model settings saved-config cwd fallback');
    expect(assembleScript).toContain('model settings direct user config write');
    expect(assembleScript).toContain('model settings config path hook position');
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
    expect(forgeConfig).toContain("path.join(linuxHelperResourceRoot, 'codex-vendor')");
    expect(forgeConfig).toContain("path.join(__dirname, 'resources', 'bin', 'codex-launcher')");
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
      path.join(
        desktopRoot,
        'resources',
        'bin',
        'linux-x64',
        'codex-vendor',
        'bin',
        'codex',
      ),
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

    expect(mainSource).toContain('openUrlWithLinuxBrowserSession');
    expect(mainSource).toMatch(
      /[A-Za-z_$][\w$]*=\([A-Za-z_$][\w$]*&&[A-Za-z_$][\w$]*\.length>0\?[A-Za-z_$][\w$]*:[A-Za-z_$][\w$]*\.filter\(e=>e!==`~`\)\.map\(e=>[A-Za-z_$][\w$]*\.[A-Za-z_$][\w$]*\(e\)\)\)\.filter\(e=>\{try\{return!!e&&[A-Za-z_$][\w$]*\.existsSync\(e\)\}catch\{return!1\}\}\)/,
    );
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
      'npm run hydrate:codex:linux -- --arch arm64 && npm run rebuild:natives && CODEX_LINUX_HELPER_ARCH=linux-arm64 electron-forge make --platform linux --arch arm64 --targets deb',
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
