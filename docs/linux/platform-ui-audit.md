# Platform UI Audit

## Scope

- Workspace: `/home/willr/Applications/codex-app/desktop`
- Recovered bundle: `/home/willr/Applications/codex-app/desktop/recovered/app-asar-extracted`
- Validation date: 2026-03-27

## What is now wired

- The app entrypoint now boots the recovered compiled Codex Electron bundle from `recovered/app-asar-extracted/.vite/build/bootstrap.js`.
- The recovered preload bridge is shipped intact from `recovered/app-asar-extracted/.vite/build/preload.js`.
- The recovered renderer is shipped intact from `recovered/app-asar-extracted/webview/index.html` and hashed `webview/assets/*` chunks.
- The recovered skills payload is shipped from `recovered/app-asar-extracted/skills`.
- Native Linux runtime deps are resolved from the top-level app `node_modules`, and Forge explicitly excludes the recovered nested `node_modules` tree so Windows upstream payloads do not leak into Linux packages.

## Verified runtime behavior

- `npm run test:linux` passes with the recovered bundle tests enabled.
- `npm run package` succeeds after Electron 40 native rebuilds.
- `npm run make` succeeds and emits `desktop/out/make/deb/x64/codex-desktop_26.325.21211_amd64.deb` and `desktop/out/make/AppImage/x64/Codex-26.325.21211-x64.AppImage`.
- The packaged Linux app was inspected over CDP from the built output.
- CDP target enumeration during packaged runtime reports:
  - title: `Codex`
  - url: `app://-/index.html?hostId=local`
- During packaged runtime, the recovered app-server transport connects successfully to the bundled Linux helper at `resources/codex`.
- The packaged plugins, skills, and settings surfaces render from the refreshed app bundle.
- Plain unpacked local launches still require preserved `chrome-sandbox` setuid permissions or `--no-sandbox` for smoke validation.

## Reverse-engineered bridge/runtime findings now exercised on Linux

- The recovered preload exposes `window.codexWindowType = "electron"`.
- The recovered preload exposes `window.electronBridge` with the compiled IPC surface required by the renderer.
- The recovered main bundle registers the `app://` asset scheme and serves the recovered renderer from the bundled `webview` payload.
- The recovered main bundle initializes the local app-server transport and Linux helper process successfully in packaged execution.

## Remaining parity work

- Wider manual UX coverage for updater wording and remote-connection flows still benefits from a dedicated follow-up pass with a configured remote target.
- Full packaged parity sweeps on Ubuntu 22.04 and 24.04 remain useful follow-up validation beyond this refresh.
