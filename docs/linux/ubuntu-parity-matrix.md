# Ubuntu Parity Matrix

## Scope

This matrix tracks Linux parity against the packaged `codex-3-12` upstream bundle that now powers `desktop/`.

## Reference Evidence

- Upstream package source: `codex-3-12/app/resources/`
- Recovered runtime bundle: `desktop/recovered/app-asar-extracted/`
- Current Linux wrapper: `desktop/`
- Verified package output: `desktop/out/Codex-linux-x64/`

## Current Baseline

- `desktop/package.json` now boots `recovered/app-asar-extracted/.vite/build/bootstrap.js`
- `desktop` carries upstream version `26.309.31024`
- `desktop` carries build number `962`
- Linux regression tests pass against the refreshed recovered bundle
- unpacked and `.deb` packaging both succeed on Linux

## Release-Critical Areas

| Area | Current Linux status | Evidence |
|---|---|---|
| recovered bundle import | complete | `desktop/recovered/app-asar-extracted/` refreshed from `codex-3-12/app/resources/app.asar` |
| Electron bootstrap wiring | complete | `desktop/package.json` main points at `recovered/app-asar-extracted/.vite/build/bootstrap.js` |
| renderer/dev server wiring | complete | `desktop/dev/recovered-webview-dev-server.ts` plus passing Linux tests |
| Linux helper resources | complete | packaged `resources/codex` and `resources/rg` are executable Linux ELF binaries |
| native module rebuilds | complete | packaged `better_sqlite3.node` and `node-pty` payloads are Linux ELF shared objects |
| cross-platform baggage exclusion | complete | packaged output excludes `.exe` helper files and `node-pty` `prebuilds/(win32|darwin)` |
| review/default-branch bundle contract | complete | passing `desktop/tests/linux/review-default-branch.red.test.ts` |
| automation/worktree bundle contract | complete | passing `desktop/tests/linux/automation-archive-without-execution.red.test.ts` |
| packaged startup | complete | packaged startup logs show window load and app-server handshake success |

## Remaining Work Outside This Refresh

| Area | Status |
|---|---|
| deeper manual UX sweep across Linux settings and flows | open |
| protocol handler registration on target desktop environments | open follow-up |
| broader distro validation beyond the current Ubuntu packaging flow | open follow-up |
