# Linux Patch Contract

Generated: 2026-04-23, America/Denver.

## Scope

This document is the compatibility contract for the existing Linux patch set before
porting it from the current recovered bundle to the newer `Codex.dmg` payload.

Canonical implementation owners:

- `desktop/scripts/assemble-codex-runtime.mjs`
- `desktop/scripts/linux-browser-launch.js`
- `desktop/src/main/linux/platform-capabilities.ts`
- `desktop/src/main/linux/runtime-support.ts`
- `desktop/tests/linux/*`

Current recovered bundle target:

| Area | Current recovered target |
| --- | --- |
| App version | `26.415.20818` |
| App build | `1727` from installed package metadata; `desktop/recovered/refresh-manifest.json` has `buildNumber: null` |
| Electron | `41.2.0` |
| Main entry | `.vite/build/bootstrap.js` |
| Main process bundle | `.vite/build/main-BnI_RVTn.js` |
| Worker bundle | `.vite/build/worker.js` |
| Preload bundle | `.vite/build/preload.js` |
| Renderer entry | `webview/assets/index-1LJShyXg.js` |
| Remote connections bundle | `webview/assets/remote-connections-settings-CaBYO19U.js` |
| Model settings bundle | `webview/assets/use-model-settings-BXpE6yHZ.js` |
| App-server hooks bundle | `webview/assets/app-server-manager-hooks-BhqlgFjc.js` |

New DMG target from T3:

| Area | New DMG target |
| --- | --- |
| App version | `26.417.41555` |
| App build | `1858` |
| Electron | `41.2.0` |
| Main process bundle | `.vite/build/main-C8I_nqq_.js` |
| Renderer entry | `webview/assets/index-CxBol07n.js` |
| Remote connections bundle | `webview/assets/remote-connections-settings-B_gvkKeE.js` |
| Model settings bundle | `webview/assets/use-model-settings-ldiRRtPt.js` |
| App-server hooks bundle | `webview/assets/app-server-manager-hooks-otoIIVsF.js` |

Known T3 drift: `node desktop/scripts/refresh-recovered-from-dmg.mjs --dmg Codex.dmg --output /tmp/...` currently exits at `git origins existing-path filter patch target not found` in the new `.vite/build/main-C8I_nqq_.js`. T5 must retarget that patch before refreshing `desktop/recovered`.

## Compatibility Matrix

| Patch / contract name | Owner file / function | Current marker or target | Expected behavior | Old bundle target / file | Test coverage | Porting notes for new DMG |
| --- | --- | --- | --- | --- | --- | --- |
| Startup stack logging | `assemble-codex-runtime.mjs` / `patchCodexBootstrap` | Marker `(()=>{try{process.stderr?.writable&&console.error(` | Print the startup import error stack to stderr before Sentry capture and failure dialog handling. | `.vite/build/bootstrap.js` | `desktop/tests/linux/recovered-bundle.red.test.ts`; `desktop/tests/linux/t8-recovered-bundle.red.test.ts` | `bootstrap.js` is still shared in the new DMG. Keep regex fail-fast and verify the `bootstrap-import-main` catch shape before applying. |
| Linux PATH injection for bundled helpers | `assemble-codex-runtime.mjs` / `patchCodexBootstrap` | Marker `process.platform===\`linux\`&&typeof process.resourcesPath==\`string\`` | Prepend `process.resourcesPath` to `PATH` on Linux so bundled `git`, `codex`, and `rg` are discoverable by child processes. | `.vite/build/bootstrap.js` | `desktop/tests/linux/recovered-bundle.red.test.ts` | Current recovered bundle contains the marker, but the older `refresh-manifest.json` does not list this patch. Treat the assembly script as canonical. |
| Preload IPC retry guard | `assemble-codex-runtime.mjs` / `patchCodexPreload` | Marker `;try{await e.ipcRenderer.invoke(` | Retry `sendMessageFromView` once after a short delay when the renderer races an IPC invoke before the main handler is registered. Rethrow all other errors. | `.vite/build/preload.js` | `desktop/tests/linux/recovered-bundle.red.test.ts`; `desktop/tests/linux/t8-recovered-bundle.red.test.ts` | `preload.js` is still shared in the new DMG. Keep the marker to avoid double wrapping. |
| Git worker watch gating | `assemble-codex-runtime.mjs` / `patchCodexGitWorker` | Targets `workerHandleRequestPatchTarget`, `workerHandleResolvePatchTarget`, `workerWatchMethodsPatchTarget` | Only start file watching for git-worker methods that need watch state, and do not attach stable metadata resolution itself to watcher setup. | `.vite/build/worker.js` | `desktop/tests/linux/recovered-bundle.red.test.ts` | `worker.js` is still shared in the new DMG, but minified method names may drift. Keep these as one git-watch contract so partial porting fails fast. |
| Apply-patch absolute-path normalization | `assemble-codex-runtime.mjs` / `patchCodexGitWorker` | Marker `function normalizeApplyPatchDiffPaths(` | Normalize diff headers and temp-index apply inputs back to repo-relative paths, including absolute Linux paths produced by host/file-service flows. | `.vite/build/worker.js` | `desktop/tests/linux/recovered-bundle.red.test.ts` | Preserve all three normalized uses: headers, before writing `patch.diff`, and temp index apply. |
| Ignored-path apply-patch force-add | `assemble-codex-runtime.mjs` / `patchCodexGitWorker` | Targets `git add --` replacements with `git add -f --` | Ensure ignored files touched by apply-patch or snapshot flows can still be staged into the temporary index and final existing-path stage. | `.vite/build/worker.js` | `desktop/tests/linux/recovered-bundle.red.test.ts` | Keep together with path normalization. A port that normalizes paths but drops `-f` regresses ignored-file undo/apply behavior. |
| Git origins existing-path filter | `assemble-codex-runtime.mjs` / `patchCodexMainProcessBundle` | Marker `.filter(t=>{try{return!!t&&a.existsSync(t)}catch{return!1}}),{origins:f}` | Filter candidate workspace roots to existing paths before requesting `git-origins`, avoiding failures when persisted roots no longer exist. | `.vite/build/main-BnI_RVTn.js` | `desktop/tests/linux/recovered-bundle.red.test.ts` | This is the known T3 drift. Existing alternatives do not match `main-C8I_nqq_.js`; T5 must add a new narrow alternative and keep the marker. |
| Linux auth browser-session handoff | `assemble-codex-runtime.mjs` / `patchCodexMainProcessBundle`; `desktop/scripts/linux-browser-launch.js` | Marker `openUrlWithLinuxBrowserSession` | When `open-in-browser` requests `useExternalBrowser: true` on Linux, open the auth URL in the newest running Chrome-like browser root process and preserve its profile flags; fall back to `shell.openExternal` on failure. | `.vite/build/main-BnI_RVTn.js`; staged `scripts/linux-browser-launch.js` | `desktop/tests/linux/browser-session-launch.test.js`; `desktop/tests/linux/recovered-bundle.red.test.ts` | New plugin login work may expand this path. Do not remove the native browser-session helper while implementing deep-link callback handling. |
| ChatGPT login requests native external browser | `assemble-codex-runtime.mjs` / `patchCodexAuthWebviewBundles` | Marker `useExternalBrowser:!0` | Mark ChatGPT login and device-code verification browser opens as native external-browser requests instead of in-app/browser-pane opens. | `webview/assets/index-1LJShyXg.js` | `desktop/tests/linux/browser-session-launch.test.js`; `desktop/tests/linux/recovered-bundle.red.test.ts` | New renderer entry is `index-CxBol07n.js`. Re-resolve by prefix instead of pinning the old hash. |
| Remote ChatGPT login requests native external browser | `assemble-codex-runtime.mjs` / `patchCodexAuthWebviewBundles` | Marker `useExternalBrowser:!0` | Apply the same external-browser handoff to remote-host ChatGPT login. | `webview/assets/remote-connections-settings-CaBYO19U.js` | `desktop/tests/linux/browser-session-launch.test.js` | New target is `remote-connections-settings-B_gvkKeE.js`. Keep separate coverage so local and remote login paths cannot mask each other. |
| Browser pane enablement | `assemble-codex-runtime.mjs` / `patchCodexAuthWebviewBundles` (`rendererBrowserPaneAvailabilityPatches`) | Targets replace `Bf()`-style browser-pane gate values with `!0` in seven renderer sites | Keep the in-app browser pane available in Linux desktop flows that otherwise see the feature gate as disabled. | `webview/assets/index-1LJShyXg.js` | `desktop/tests/linux/recovered-bundle.red.test.ts` | Hash and minified symbols are likely to drift in `index-CxBol07n.js`; port by behavior and keep all seven call-site equivalents accounted for. |
| Single-batch undo prefers unified diff | `assemble-codex-runtime.mjs` / `patchCodexAuthWebviewBundles` | Target `rendererUndoUnifiedDiffPreferencePatchTarget` | Prefer `unifiedDiff` for single-batch undo/apply flows so Linux local application uses the full patch instead of lossy batch reconstruction. | `webview/assets/index-1LJShyXg.js` | `desktop/tests/linux/recovered-bundle.red.test.ts` | Not listed in the older `refresh-manifest.json`; treat the assembly script and recovered test as canonical. |
| Linux opaque primary window background | `assemble-codex-runtime.mjs` / `patchCodexMainProcessBundle` | Marker `backgroundMaterial:\`mica\`};if(e===\`linux\`&&` | Use a solid Linux main-window background instead of transparent/default material to avoid startup and compositor transparency artifacts. | `.vite/build/main-BnI_RVTn.js` | `desktop/tests/linux/window-background.test.js`; `desktop/tests/linux/recovered-bundle.red.test.ts` | New main bundle is `main-C8I_nqq_.js`; current alternatives cover two minified shapes and may need a third. |
| Startup shell opaque background | `assemble-codex-runtime.mjs` / `patchCodexStartupShell` | Target `--startup-background: transparent;` | Make the startup shell use a solid dark background before renderer boot. | `webview/index.html` | `desktop/tests/linux/window-background.test.js` | `webview/index.html` exists in the new DMG. Verify theme variables before replacing to avoid clobbering upstream light-mode changes. |
| Startup shell light theme colors | `assemble-codex-runtime.mjs` / `patchCodexStartupShell` | Marker `@media (prefers-color-scheme: light)` | Add light-mode startup variables so the solid startup background stays coherent with the desktop theme. | `webview/index.html` | `desktop/tests/linux/window-background.test.js` | Marker may already exist upstream. If present with equivalent values, record as intentionally skipped. |
| Startup shell no logo fade | `assemble-codex-runtime.mjs` / `patchCodexStartupShell` | Target `opacity: 0;` plus fade animation | Show the startup logo immediately instead of fading from transparent. | `webview/index.html` | `desktop/tests/linux/window-background.test.js` | Keep separate from shimmer removal; fade and shimmer are independent artifacts. |
| Startup shell no shimmer animation / remove keyframes | `assemble-codex-runtime.mjs` / `patchCodexStartupShell` | Target `startup-codex-logo-shimmer` animation and keyframes | Disable base-logo shimmer animation while keeping reduced-motion CSS valid. | `webview/index.html` | `desktop/tests/linux/window-background.test.js` | Current manifest records these as already-present skips. Preserve idempotent skip behavior. |
| Model settings saved-config cwd fallback | `assemble-codex-runtime.mjs` / `patchCodexModelSettingsBundle` | Target `queryFn:async()=>{try{return await zt(r,e)}catch{return null}}` | If workspace-cwd config lookup fails, retry the saved config lookup with `null` cwd so user defaults still load. | `webview/assets/use-model-settings-BXpE6yHZ.js` | `desktop/tests/linux/recovered-bundle.red.test.ts` | New target is `use-model-settings-ldiRRtPt.js`. This patch is not represented in the older `refresh-manifest.json`; keep the report/test as the current contract. |
| Model settings direct user config write | `assemble-codex-runtime.mjs` / `patchCodexModelSettingsBundle` | Marker `let E=QCe(T),M=Y9(a).configPath,D;` | Persist model and reasoning effort directly through `batch-write-config-value` against the user config path instead of relying only on host default-model RPC. | `webview/assets/use-model-settings-BXpE6yHZ.js` | `desktop/tests/linux/recovered-bundle.red.test.ts` | The patch has two old-target alternatives. Add a new alternative if `use-model-settings-ldiRRtPt.js` moves config-path lookup again. |
| Linux open-in target registry | `assemble-codex-runtime.mjs` / `patchCodexMainProcessBundle` | Marker `function linuxResolveEditorTarget(` | Add Linux editor/file-manager targets for VS Code, VS Code Insiders, Cursor, Windsurf, Zed, and `xdg-open`, with detection through PATH, absolute paths, desktop entries, and AppImages. | `.vite/build/main-BnI_RVTn.js` | `desktop/tests/linux/recovered-bundle.red.test.ts` | Not represented in the older `refresh-manifest.json`. New `main-C8I_nqq_.js` must receive an equivalent first-class Linux target registry or tests should fail. |
| Linux browser session helper packaging | `assemble-codex-runtime.mjs` / `stageLinuxBrowserLauncher`; `desktop/scripts/linux-browser-launch.js` | Patch label `linux browser session helper` | Copy the browser session helper into the extracted app under `scripts/linux-browser-launch.js` so patched main-process code can require it after packaging. | Extracted app `scripts/linux-browser-launch.js` | `desktop/tests/linux/browser-session-launch.test.js`; `desktop/tests/linux/recovered-bundle.red.test.ts` | Keep as a staged runtime file. Do not inline this helper into the minified main bundle. |
| Linux native module normalization | `assemble-codex-runtime.mjs` / `resolveLinuxNativeModuleSourceRoot`, `normalizeNativeModules` | Function names and copied paths for `better-sqlite3` and `node-pty` | Copy Linux rebuilt `.node` files from the local Electron 41 rebuild output into the extracted app before creating `app.asar`, replacing Mach-O modules from the DMG. | `node_modules/better-sqlite3/...`; `node_modules/node-pty/...`; package `app.asar.unpacked` | `desktop/tests/linux/recovered-bundle.red.test.ts`; `desktop/tests/linux/codex-package.red.test.ts` | Required for new DMG because T3 confirmed DMG native modules are Mach-O arm64. Rebuild/normalize against Electron `41.2.0`. |
| Linux helper resources packaging | `assemble-codex-runtime.mjs` / `assembleCodexRuntime`, `copyRequired`, `ensureHydratedFile`; `runtime-support.ts` | `requiredResources = ['codex', 'git', 'rg']`; `linuxHelperResourcesRoot` | Ship executable Linux helper binaries as top-level package resources and fail if a helper is missing, non-executable, or still a Git LFS pointer. | `desktop/resources/bin/linux-x64/{codex,git,rg}` -> `resources/{codex,git,rg}` | `desktop/tests/linux/recovered-bundle.red.test.ts`; `desktop/tests/linux/codex-runtime-assembly.test.js`; `desktop/tests/linux/linux-regression.contract.test.ts` | New DMG resources `codex`, `rg`, `node`, and native helpers are Mach-O and must not replace these Linux ELF helpers. |
| Linux platform capability support | `platform-capabilities.ts`; `runtime-support.ts` | `createLinuxPlatformCapabilities`; `resolveLinuxExecutablePaths`; `dispatchArgv`; `startupRegistration` | Provide Linux-native helper resolution, sandbox inspection, PTY lifecycle probing, argv-based `codex://` dispatch, and XDG autostart entry management. | Source-level Linux support, not minified old bundle patch | `desktop/tests/linux/linux-regression.contract.test.ts`; `desktop/tests/linux/t5-platform-abstraction.red.test.ts` | T6 owns protocol registration expansion. Current startup entry renders autostart only and does not yet cover launcher `MimeType` / `%u` install registration. |

## Dormant Patch Definitions

`assemble-codex-runtime.mjs` defines `patchCodexAppServerHooks`, but
`patchExtractedCodexApp` does not call it. These labels are therefore not part of
the active recovered runtime patch contract today:

| Dormant label | Owner | Target file | Current coverage / porting rule |
| --- | --- | --- | --- |
| `stale steer fallback start turn` | `patchCodexAppServerHooks` | `webview/assets/app-server-manager-hooks-BhqlgFjc.js` | No active coverage. Do not port unless the patch is intentionally activated and tests are added. |
| `stale steer error detector` | `patchCodexAppServerHooks` | `webview/assets/app-server-manager-hooks-BhqlgFjc.js` | No active coverage. Do not port unless the patch is intentionally activated and tests are added. |
| `unknown hook event guard` | `patchCodexAppServerHooks` | `webview/assets/app-server-manager-hooks-BhqlgFjc.js` | No active coverage. Do not port unless the patch is intentionally activated and tests are added. |
| `unknown item started guard` | `patchCodexAppServerHooks` | `webview/assets/app-server-manager-hooks-BhqlgFjc.js` | No active coverage. Do not port unless the patch is intentionally activated and tests are added. |
| `unknown item completed guard` | `patchCodexAppServerHooks` | `webview/assets/app-server-manager-hooks-BhqlgFjc.js` | No active coverage. Do not port unless the patch is intentionally activated and tests are added. |
| `unknown turn completed guard` | `patchCodexAppServerHooks` | `webview/assets/app-server-manager-hooks-BhqlgFjc.js` | No active coverage. Do not port unless the patch is intentionally activated and tests are added. |

## Coverage Map

| Test file | Contract areas covered |
| --- | --- |
| `desktop/tests/linux/recovered-bundle.red.test.ts` | recovered bundle presence, native module normalization, Electron/package metadata, bootstrap PATH and stack logging, preload IPC retry, ChatGPT external browser marker, browser pane enablement, undo unified diff preference, model-settings persistence, Linux helper resources, main-process browser handoff, git origins filter, open-target registry, git worker watch and apply-patch fixes |
| `desktop/tests/linux/browser-session-launch.test.js` | external browser handoff markers and `linux-browser-launch.js` process/session behavior |
| `desktop/tests/linux/window-background.test.js` | opaque Linux main-window background and startup shell opacity/background behavior |
| `desktop/tests/linux/codex-runtime-assembly.test.js` | patch fail-fast behavior, idempotent already-applied patches, Git LFS hydration guards for required helper resources |
| `desktop/tests/linux/codex-package.red.test.ts` | canonical staging scripts, helper restoration, native module packaging boundary, AppImage/deb release packaging expectations |
| `desktop/tests/linux/linux-regression.contract.test.ts` | Linux capability selection, helper path resolution, PTY lifecycle probe, argv deep-link dispatch, XDG autostart management, helper execute-bit errors |
| `desktop/tests/linux/t5-platform-abstraction.red.test.ts` | platform abstraction surface, Linux deep-link dispatch acceptance/rejection, startup registration enable/disable |
| `desktop/tests/linux/t8-recovered-bundle.red.test.ts` | recovered compiled bundle location, bootstrap/preload runtime wiring, Forge packaging inclusion contract |

## Static Validation

Reason not testable: this task is documentation/contract inventory only. It does
not change runtime implementation, recovered assets, package behavior, or tests.
Validation is by static inspection of patch labels, markers, old/new bundle
targets, and documentation diff hygiene.

Static checks used for this inventory:

```bash
rg -n "label:|Marker|patchCodex|stageLinuxBrowserLauncher|normalizeNativeModules|copyRequired\\(|requiredResources|linuxHelperResourcesRoot|resolveLinuxNativeModuleSourceRoot" desktop/scripts/assemble-codex-runtime.mjs
find desktop/recovered/app-asar-extracted/.vite/build -maxdepth 1 -type f -printf '%f\n' | sort
find desktop/recovered/app-asar-extracted/webview/assets -maxdepth 1 -type f -printf '%f\n' | rg '^(index-|remote-connections-settings-|use-model-settings-|app-server-manager-hooks-)' | sort
find /tmp/codex-dmg-refresh-7xio6x/app-asar-extracted/.vite/build -maxdepth 1 -type f -printf '%f\n' | sort
find /tmp/codex-dmg-refresh-7xio6x/app-asar-extracted/webview/assets -maxdepth 1 -type f -printf '%f\n' | rg '^(index-|remote-connections-settings-|use-model-settings-|app-server-manager-hooks-)' | sort
rg -n "Linux browser|native external browser|preload|startup stack|git worker|browser pane|model settings|opaque|startup shell|normalize Linux native|codex helper|open-in target|existing-path|force-add ignored|unified diff|PATH|codexBuildNumber" desktop/tests/linux
git diff --check
```
