# Ubuntu Parity Matrix

## Scope

This matrix tracks Linux parity against the packaged `codex` upstream bundle that now powers `desktop/`.

## Reference Evidence

- Canonical current upstream payload root: `codex/`
- Recovered runtime bundle: `desktop/recovered/app-asar-extracted/`
- Current Linux wrapper: `desktop/`
- Verified package output: `desktop/out/Codex-linux-x64/`

## Current Baseline

- `desktop/package.json` now boots `recovered/app-asar-extracted/.vite/build/bootstrap.js`
- `desktop` carries embedded app version `26.325.21211`
- `desktop` carries build number `1255`
- imported Windows package manifest version remains `26.325.2171.0`
- Linux regression tests pass against the refreshed recovered bundle
- unpacked and `.deb` packaging both succeed on Linux

## Release-Critical Areas

| Area | Current Linux status | Evidence |
|---|---|---|
| recovered bundle import | complete | `desktop/recovered/app-asar-extracted/` refreshed from the current `codex/` payload |
| Electron bootstrap wiring | complete | `desktop/package.json` main points at `recovered/app-asar-extracted/.vite/build/bootstrap.js` |
| renderer/dev server wiring | complete | `desktop/dev/recovered-webview-dev-server.ts` plus passing Linux tests |
| Linux helper resources | complete | packaged `resources/codex` and `resources/rg` are executable Linux ELF binaries |
| native module rebuilds | complete | packaged `better_sqlite3.node` and `node-pty` payloads are Linux ELF shared objects |
| cross-platform baggage exclusion | complete | packaged output excludes `.exe` helper files and `node-pty` `prebuilds/(win32|darwin)` |
| review/default-branch bundle contract | complete | passing `desktop/tests/linux/review-default-branch.red.test.ts` |
| automation/worktree bundle contract | complete | passing `desktop/tests/linux/automation-archive-without-execution.red.test.ts` |
| packaged runtime smoke | complete | Electron CDP reached the built app, and the plugins, skills, and settings surfaces rendered successfully |
| sandbox packaging | complete | the `.deb` packages `chrome-sandbox` with mode `4755`, even though plain unpacked local launches still need preserved permissions or `--no-sandbox` |

## Remaining Work Outside This Refresh

| Area | Status |
|---|---|
| deeper manual UX sweep across Linux settings and flows | follow-up expansion |
| protocol handler registration on target desktop environments | open follow-up |
| broader distro validation beyond the current Ubuntu packaging flow | open follow-up |
