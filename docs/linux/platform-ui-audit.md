# Platform UI Audit

## Scope

- Workspace: `/home/willr/Applications/codex-app/desktop`
- Recovered bundle: `/home/willr/Applications/codex-app/desktop/recovered/app-asar-extracted`
- Validation date: 2026-03-12

## What is now wired

- The app entrypoint now boots the recovered compiled Codex Electron bundle from `recovered/app-asar-extracted/.vite/build/bootstrap.js`.
- The recovered preload bridge is shipped intact from `recovered/app-asar-extracted/.vite/build/preload.js`.
- The recovered renderer is shipped intact from `recovered/app-asar-extracted/webview/index.html` and hashed `webview/assets/*` chunks.
- The recovered skills payload is shipped from `recovered/app-asar-extracted/skills`.
- Native Linux runtime deps are resolved from the top-level app `node_modules`, and Forge explicitly excludes the recovered nested `node_modules` tree so Windows upstream payloads do not leak into Linux packages.

## Verified runtime behavior

- `npm run test:linux` passes with the recovered bundle tests enabled.
- `npm run package` succeeds after Electron 40 native rebuilds.
- `npm run make` succeeds and emits `desktop/out/make/deb/x64/codex-desktop_26.309.31024_amd64.deb`.
- The packaged Linux app boots under Xvfb from `desktop/out/Codex-linux-x64/Codex`.
- CDP target enumeration during packaged boot reports:
  - title: `Codex`
  - url: `app://-/index.html?hostId=local&startupComplete=false`
- During packaged boot, the recovered app-server transport connects successfully to the bundled Linux helper at `resources/codex`.

## Reverse-engineered bridge/runtime findings now exercised on Linux

- The recovered preload exposes `window.codexWindowType = "electron"`.
- The recovered preload exposes `window.electronBridge` with the compiled IPC surface required by the renderer.
- The recovered main bundle registers the `app://` asset scheme and serves the recovered renderer from the bundled `webview` payload.
- The recovered main bundle initializes the local app-server transport and Linux helper process successfully in packaged execution.

## Remaining parity work

- Manual visual QA is still required for Linux-specific settings labels, startup wording, updater wording, and any Windows-only affordances that may still be visible in the recovered renderer.
- The Linux updater/distribution path is still separate work under T9.
- Full packaged parity sweeps on Ubuntu 22.04 and 24.04 remain open under T11/T11b.
