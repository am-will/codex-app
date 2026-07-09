# Ubuntu Parity Matrix

## Current Baseline

- Recovered payload: ChatGPT/Codex `26.707.31123`, build `5042`
- Electron: `42.1.0`
- Entry point: `.vite/build/early-bootstrap.js`
- App-server helper: `0.144.0-alpha.4`
- Linux regression suite: passing
- Linux package contract: passing

## Release-Critical Areas

| Area | Status | Evidence |
|---|---|---|
| recovered payload | complete | tracked `desktop/recovered/app-asar-extracted` matches version `26.707.31123` |
| bootstrap wiring | complete | package main points to `early-bootstrap.js`; hashed bootstrap discovery is tested |
| ChatGPT brand transition | complete | brand-gated patching skips removed standalone-only chunks |
| GPT-5.6 UI assets | complete | package verifier requires `gpt-5.6-sol`; payload also contains `gpt-5.6-terra` |
| app-server protocol | complete | matched helper `0.144.0-alpha.4` initializes and answers `model/list` |
| helper packaging | complete | launcher plus full `codex-vendor` package are verified executable |
| native modules | complete | Electron 42 Linux `better_sqlite3.node` and `node-pty` builds are packaged |
| Linux window chrome | complete | title-bar controls, application submenus, focus, and X11 launch patches are tested |
| browser handoff | complete | native external-browser session helper remains packaged and covered |
| package outputs | complete locally | x64 packaged output and package contract pass |
| release artifacts | CI validation | x64 AppImage/deb/rpm and arm64 deb are built by the release workflow |

## Follow-Up Coverage

| Area | Status |
|---|---|
| Ubuntu 22.04 release workflow | required CI check |
| Ubuntu arm64 release workflow | required CI check |
| protocol registration across desktop environments | package-level follow-up |
| non-Ubuntu distro sweep | follow-up expansion |
