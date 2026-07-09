# Platform UI Audit

## Scope

- Payload: ChatGPT/Codex `26.707.31123`, build `5042`
- Electron: `42.1.0`
- Validation date: 2026-07-09

## Current Wiring

- `desktop/package.json` starts the recovered `.vite/build/early-bootstrap.js` entry.
- The hashed bootstrap, main-process, preload, worker, and renderer chunks are tracked
  under `desktop/recovered/app-asar-extracted`.
- Linux title-bar controls and application submenus are injected into the current
  ChatGPT app-shell bundle.
- Linux browser-session handoff, git-origin filtering, focus restoration, startup
  background, and X11 launch behavior remain applied through the assembler.
- Removed standalone-only chunks are handled by app-brand gates instead of forcing old
  patches into the ChatGPT payload.

## Verified Runtime Behavior

- The Linux regression suite and package contract pass.
- The packaged app opens a ready-to-show primary window.
- The app-server transport starts from `resources/codex` and reports
  `0.144.0-alpha.4`.
- `model/list` succeeds, and the recovered renderer includes `gpt-5.6-sol` and
  `gpt-5.6-terra`.
- The renderer mounts the app routes, browser-use native pipe startup succeeds, and
  Linux window controls render from the patched app shell.

## Expected Non-Blocking Warnings

- An unpacked smoke build may fail to register `codex://` until installed through a
  desktop package.
- Node REPL browser support remains unavailable until the selected primary runtime is
  installed; native browser use still initializes independently.
- A locally cached remote-control environment can log a disconnected host until the
  renderer refreshes that state.

## Remaining Validation

- Release CI should build x64 AppImage, deb, and rpm artifacts plus the arm64 deb.
- Broader distro coverage remains useful beyond the Ubuntu release builders.
