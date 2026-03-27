# Native Runtime Inventory And Rebuild Strategy

## Scope

This document records the verified Linux-native runtime boundary for the refreshed `desktop/` wrapper after importing the `codex` upstream package.

Canonical upstream source:

- `codex/`

Canonical Linux wrapper/runtime:

- `desktop/`
- `desktop/recovered/app-asar-extracted/`
- `desktop/out/Codex-linux-x64/`

## Verified Upstream Inputs

- Windows package manifest version: `26.325.2171.0`
- Upstream packaged app version: `26.325.21211`
- Upstream build number: `1255`
- Recovered Electron entrypoint: `.vite/build/bootstrap.js`
- Recovered hashed main bundle: `.vite/build/main-I2_kj945.js`
- Bundled Linux helpers in upstream resources:
  - `codex/ -> app/resources/codex`
  - `codex/ -> app/resources/rg`
- Windows-only upstream helpers that remain excluded from Linux packaging:
  - `codex/ -> app/resources/codex.exe`
  - `codex/ -> app/resources/rg.exe`
  - `codex/ -> app/resources/codex-command-runner.exe`
  - `codex/ -> app/resources/codex-windows-sandbox-setup.exe`

## Runtime Boundary

The Linux app now ships with one canonical native/runtime split:

- Electron runtime and recovered JavaScript bundle inside `resources/app.asar`
- rebuilt native Node add-ons under `resources/app.asar.unpacked/node_modules`
- Linux helper binaries as first-class resources:
  - `resources/codex`
  - `resources/rg`

## Current Linux-native Dependencies

| Runtime artifact | Verified source | Linux packaging rule |
|---|---|---|
| Electron runtime | `desktop/package.json` pins `electron: 40.0.0` | Keep Electron 40 as the parity ABI target. |
| `better-sqlite3` | `desktop/package.json` plus `electron-rebuild` output | Rebuild for Electron 40 and ship only the Linux `.node` payload in `app.asar.unpacked`. |
| `node-pty` | `desktop/package.json` plus `electron-rebuild` output | Rebuild for Electron 40 and ship Linux `.node` payload only. Exclude bundled `prebuilds/*` from packaged output. |
| `resources/codex` | `desktop/resources/bin/linux-x64/codex` | Copy as executable Linux helper resource. |
| `resources/rg` | `desktop/resources/bin/linux-x64/rg` | Copy as executable Linux helper resource. |

## Packaging Rules

- `desktop/package.json` boots `recovered/app-asar-extracted/.vite/build/bootstrap.js`.
- `desktop/forge.config.ts` includes the recovered bundle directories:
  - `/recovered/app-asar-extracted/.vite`
  - `/recovered/app-asar-extracted/webview`
  - `/recovered/app-asar-extracted/skills`
  - `/recovered/app-asar-extracted/package.json`
- Forge explicitly excludes:
  - `/recovered/app-asar-extracted/node_modules`
  - `/node_modules/node-pty/prebuilds`
- `@electron-forge/plugin-auto-unpack-natives` remains enabled so rebuilt `.node` files land in `resources/app.asar.unpacked/`.

## Verified Commands

Upstream helper inventory:

```bash
CURRENT_PAYLOAD_ROOT=/home/willr/Applications/codex-app/codex
file \
  "$CURRENT_PAYLOAD_ROOT/app/resources/codex" \
  "$CURRENT_PAYLOAD_ROOT/app/resources/rg" \
  "$CURRENT_PAYLOAD_ROOT/app/resources/codex.exe" \
  "$CURRENT_PAYLOAD_ROOT/app/resources/rg.exe" \
  "$CURRENT_PAYLOAD_ROOT/app/resources/codex-command-runner.exe" \
  "$CURRENT_PAYLOAD_ROOT/app/resources/codex-windows-sandbox-setup.exe"
```

Linux regression suite:

```bash
cd /home/willr/Applications/codex-app/desktop
npm run test:linux
```

Unpacked Linux package:

```bash
cd /home/willr/Applications/codex-app/desktop
npm run package
```

Debian package:

```bash
cd /home/willr/Applications/codex-app/desktop
npm run make
```

Packaged helper verification:

```bash
cd /home/willr/Applications/codex-app/desktop
test -x out/Codex-linux-x64/resources/codex
test -x out/Codex-linux-x64/resources/rg
file out/Codex-linux-x64/resources/codex out/Codex-linux-x64/resources/rg
```

Packaged native-module verification:

```bash
cd /home/willr/Applications/codex-app/desktop
file \
  out/Codex-linux-x64/resources/app.asar.unpacked/node_modules/better-sqlite3/build/Release/better_sqlite3.node \
  out/Codex-linux-x64/resources/app.asar.unpacked/node_modules/node-pty/build/Release/pty.node \
  out/Codex-linux-x64/resources/app.asar.unpacked/node_modules/node-pty/bin/linux-x64-143/node-pty.node
```

Negative packaging gate:

```bash
cd /home/willr/Applications/codex-app/desktop
! find out/Codex-linux-x64/resources -maxdepth 1 -type f | rg 'codex\\.exe|rg\\.exe|codex-command-runner\\.exe|codex-windows-sandbox-setup\\.exe'
! find out/Codex-linux-x64/resources/app.asar.unpacked/node_modules/node-pty -type f | rg 'prebuilds/(win32|darwin)'
```

## Verified Outcome

- `npm run test:linux` passes against the refreshed recovered bundle.
- `npm run package` succeeds.
- `npm run make` succeeds and emits `desktop/out/make/AppImage/x64/Codex-26.325.21211-x64.AppImage` and `desktop/out/make/deb/x64/codex-desktop_26.325.21211_amd64.deb`.
- Packaged `resources/codex` and `resources/rg` are executable Linux ELF binaries.
- Packaged `better_sqlite3.node` and `node-pty` payloads are Linux ELF shared objects.
- Packaged output no longer ships `node-pty` Windows or macOS prebuild baggage.
- The Debian artifact packages `chrome-sandbox` with mode `4755`, while plain unpacked local launches still need preserved permissions or `--no-sandbox`.
