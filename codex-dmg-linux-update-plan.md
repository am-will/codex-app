# Plan: Codex DMG Linux Update and Plugin Auth Return Fix

**Generated**: 2026-04-23

## Overview

Update the existing Linux Codex desktop build from the newer local `Codex.dmg` while preserving the current Linux porting fixes. The current recovered app is `26.415.20818` / build `1727`; the new DMG contains `26.417.41555` / build `1858` and still uses Electron `41.2.0`, `better-sqlite3@^12.8.0`, and `node-pty@^1.1.0`.

The existing refresh path is close but not currently compatible with the new minified bundle: `node desktop/scripts/refresh-recovered-from-dmg.mjs --dmg Codex.dmg --output /tmp/...` fails on `git origins existing-path filter patch target not found` in the new `main-C8I_nqq_.js`. The plan therefore treats this as a controlled port of the canonical Linux patches, not a blind overwrite.

The plugin login hang should be fixed as a first-class Linux deep-link and browser handoff issue. Electron passes registered protocol URLs back through process arguments / second-instance handling, and Linux desktop integration needs an installed `.desktop` entry advertising `MimeType=x-scheme-handler/codex`. The plan validates the complete browser -> `codex://` -> running Codex app path instead of only checking that the login URL opens.

## Documentation Consulted

- Electron app API: `app.setAsDefaultProtocolClient`, `second-instance`, and protocol URL argument behavior.
- Electron protocol API: custom protocol schemes and registration timing/privileges.
- Freedesktop Desktop Entry Specification: `Exec` and `MimeType` based application association.
- Electron Forge makers docs: Linux package makers and platform-specific distributable configuration.

## Prerequisites

- `7z` can read the local `Codex.dmg`.
- `desktop/node_modules` exists and can rebuild Linux native modules.
- Current Linux helper binaries exist at `desktop/resources/bin/linux-x64/{codex,git,rg}`.
- Current packaged shell exists or can be produced at `desktop/out/Codex-linux-x64`.
- User approval is required before any `git push`; this plan does not include a push.
- User should confirm the final live install target before replacement if discovery finds more than one active launcher or installed Codex binary.

## Dependency Graph

```text
T1 ── T3 ─┬─ T4 ─┬─ T5 ─┐
T2 ── T2b ┘      ├─ T6 ─┼─ T8 ─ T9 ─ T10 ─ T11 ─ T12 ─ T13
                 └─ T7 ─┘                         │
T2b ───────────────────────────────────────────────┘
```

## Tasks

### T1: Ignore Local DMG Artifact

- **depends_on**: []
- **location**: `/home/amwill/Applications/codex-app/.gitignore`
- **description**: Add `Codex.dmg` as an ignored local reference artifact so the newer DMG cannot accidentally enter git history.
- **validation**: `git check-ignore -v Codex.dmg` reports the root `.gitignore` rule, and `git status --short` no longer lists `?? Codex.dmg`.
- **status**: Completed
- **reason_not_testable**: Static gitignore/config change; no runtime behavior needs unit or integration testing.
- **static_check**:
  - `git check-ignore -v Codex.dmg` -> `.gitignore:2:Codex.dmg	Codex.dmg`
  - `git status --short` -> no `?? Codex.dmg`; only `.gitignore` was modified at validation time.
- **log**: 2026-04-23: Added root `.gitignore` coverage for the local `Codex.dmg` reference artifact and verified it is ignored.
- **files edited/created**: `.gitignore`, `codex-dmg-linux-update-plan.md`

### T2: Baseline Current Install and Runtime State

- **depends_on**: []
- **location**: `/home/amwill/Applications/codex-app`, `~/.local/share/applications`, `~/.config/autostart`, active Codex launcher target
- **description**: Identify the actual installed app, active `.desktop` launcher, autostart entry, executable path, current package version, user-data path, protocol handler state, and any running Codex process before changing anything. Also record `git status --short` so unrelated local edits are not swept into the implementation.
- **validation**: Record exact paths and versions; `xdg-mime query default x-scheme-handler/codex`, launcher `Exec=`, running process command line, and dirty-worktree status are captured.
- **status**: Not Completed
- **log**:
- **files edited/created**:

### T2b: Snapshot Rollback State

- **depends_on**: [T2]
- **location**: active Codex install path, `~/.local/share/applications`, `~/.config/autostart`, `~/.config/mimeapps.list`, Codex user-data directory
- **description**: Create a rollback snapshot of the current live app path, launcher entries, autostart entries, protocol association, and user-data location before any live replacement. Avoid copying secrets into repo paths; keep snapshots in a local temp/backup location outside git.
- **validation**: Backup paths exist; restore commands are documented; current `xdg-mime` association and launcher `Exec=` values can be restored exactly.
- **status**: Not Completed
- **log**:
- **files edited/created**:

### T3: Extract and Diff New DMG Payload

- **depends_on**: [T1]
- **location**: `Codex.dmg`, `/tmp/codex-dmg-refresh-*`, `desktop/recovered/refresh-manifest.json`
- **description**: Compute the DMG SHA before extraction, then extract the new DMG to an isolated temp directory. Capture `Info.plist`, `package.json`, `app.asar`, build asset names, native resources, and a structured diff against the current recovered bundle.
- **validation**: DMG SHA is recorded; new payload metadata confirms `26.417.41555` / build `1858`; diff output lists changed `.vite/build` files and webview assets; no repo files are modified by extraction.
- **status**: Not Completed
- **log**:
- **files edited/created**:

### T4: Inventory Existing Linux Patch Contract

- **depends_on**: [T2, T3]
- **location**: `desktop/scripts/assemble-codex-runtime.mjs`, `desktop/scripts/linux-browser-launch.js`, `desktop/src/main/linux/*`, `desktop/tests/linux/*`
- **description**: Convert the existing patch set into a named compatibility matrix: startup stack logging, preload IPC retry, Linux PATH injection, git-watch fixes, ignored-path apply-patch fixes, external browser handoff, browser pane enablement, startup opacity, model-settings persistence, native module normalization, editor/open-target detection, and Linux helper packaging.
- **validation**: Every current patch marker has an owner, expected behavior, old bundle target, and test coverage entry before any patch is ported.
- **status**: Not Completed
- **log**:
- **files edited/created**:

### T5: Port Refresh Script to New Minified Bundle

- **depends_on**: [T3, T4]
- **location**: `desktop/scripts/assemble-codex-runtime.mjs`, `desktop/scripts/refresh-recovered-from-dmg.mjs`, `desktop/tests/linux/recovered-bundle.red.test.ts`, `desktop/tests/linux/browser-session-launch.test.js`
- **description**: Update the canonical patch implementation for the new `main-C8I_nqq_.js` and refreshed webview asset names. Replace brittle one-off string assumptions where possible with narrow reusable matchers that fail fast with patch labels and bundle file paths.
- **validation**: `node desktop/scripts/refresh-recovered-from-dmg.mjs --dmg Codex.dmg --output /tmp/<fresh-output>` completes and emits a patch summary where all required Linux patches are either applied or intentionally skipped because upstream already contains equivalent behavior.
- **status**: Not Completed
- **log**:
- **files edited/created**:

### T6: Design First-Class Linux Protocol Registration

- **depends_on**: [T2, T3, T4]
- **location**: `desktop/src/main/linux/platform-capabilities.ts`, `desktop/forge.config.ts`, `desktop/tests/linux/linux-regression.contract.test.ts`, launcher `.desktop` generation path
- **description**: Make `codex://` registration explicit and testable on Linux. Ensure packaged desktop entries include `MimeType=x-scheme-handler/codex;` and an `Exec` form with `%u` that preserves the callback URL argument. Include the install-time/cache-refresh path: `desktop-file-validate` where available, `update-desktop-database` or equivalent, and `xdg-mime default <desktop-id> x-scheme-handler/codex`. Do not rely only on macOS `Info.plist` or Windows-oriented `setAsDefaultProtocolClient` behavior.
- **validation**: Unit tests assert generated Linux desktop entries contain `MimeType=x-scheme-handler/codex;`, `Exec` accepts `%u`, `dispatchArgv` parses callback URLs routed through `second-instance`, and validation covers both cold-start and already-running callback delivery.
- **status**: Not Completed
- **log**:
- **files edited/created**:

### T7: Trace Plugin Login Callback Flow

- **depends_on**: [T3]
- **location**: new extracted webview/main assets, `desktop/recovered/app-asar-extracted`, login/plugin UI bundle, app-server request handlers
- **description**: Locate the exact plugin connection flow behind the "connecting plugin" screen, identify the callback URL shape, state token validation, and renderer/main process event that should complete authentication after the browser allow button. Treat this as a decision gate: if the real plugin callback is not `codex://`, T8 must target the discovered mechanism instead of assuming a deep-link-only fix.
- **validation**: A written flow map identifies the browser URL opened, expected callback mechanism, receiving process path, state validation point, and final renderer/app-server event that clears the loading state.
- **status**: Not Completed
- **log**:
- **files edited/created**:

### T8: Implement Plugin Auth Return Fix in Canonical Path

- **depends_on**: [T5, T6, T7]
- **location**: `desktop/scripts/assemble-codex-runtime.mjs`, `desktop/src/main/linux/platform-capabilities.ts`, any canonical test/support modules discovered in T7
- **description**: Apply the minimum durable fix so plugin OAuth callbacks return to the running Linux app. Prefer a first-class deep-link registration/dispatch path over adding an ad-hoc shim. Preserve external-browser session handoff for auth URLs, but route `codex://` return URLs through the main process into the existing plugin completion handler.
- **validation**: A synthetic `codex://...` callback delivered through `dispatchArgv`/`second-instance` reaches the plugin completion path in tests; invalid schemes or malformed callbacks are rejected.
- **status**: Not Completed
- **log**:
- **files edited/created**:

### T9: Refresh Recovered Bundle and Package Metadata

- **depends_on**: [T8]
- **location**: `desktop/recovered/app-asar-extracted`, `desktop/recovered/refresh-manifest.json`, `desktop/package.json`, `desktop/package-lock.json`
- **description**: Run the fixed refresh against `Codex.dmg` only after all canonical patch changes, including the plugin callback handling from T8, are in place. Update the recovered bundle and manifest, then update desktop package version/build metadata to `26.417.41555` / `1858` without pulling macOS-only package scripts into the Linux wrapper.
- **validation**: Manifest records the new DMG SHA, version, build, Electron version, and patch summary; desktop package metadata matches the new app while retaining Linux scripts; generated recovered bundle contains the auth/deep-link patch markers.
- **status**: Not Completed
- **log**:
- **files edited/created**:

### T10: Rebuild Linux Native Runtime

- **depends_on**: [T8, T9]
- **location**: `desktop/node_modules`, `desktop/resources/bin/linux-x64`, `desktop/tmp/codex-runtime-*`
- **description**: Rebuild `better-sqlite3` and `node-pty` for Linux/Electron `41.2.0`, normalize native modules into the recovered app, and verify helper binaries keep execute bits.
- **validation**: From `/home/amwill/Applications/codex-app/desktop`, `npm run rebuild:natives` and `npm run assemble:codex-runtime` pass; `file` reports ELF x86-64 for native `.node` files; `ldd` resolves expected libraries; helper binaries run smoke commands; no Mach-O/Darwin `.node` files are left in Linux packaged runtime paths.
- **status**: Not Completed
- **log**:
- **files edited/created**:

### T11: Build and Run Staged Linux Canary

- **depends_on**: [T10]
- **location**: `desktop/out/Codex-linux-x64-*`, `desktop/scripts/build-codex-linux-runtime.mjs`, `desktop/scripts/stage-codex-package.mjs`, current live install target from T2
- **description**: Build a new Linux package output without overwriting old outputs, stage it beside the current install, and run it as a canary with a temporary user-data directory so preflight cannot mutate the user's real auth/session state.
- **validation**: New output has `Codex`, `resources/app.asar`, Linux `codex`, `git`, `rg`, `app.asar.unpacked`, and no `.bak` or stale resource artifacts. Canary launch reaches a usable window or clear startup log success using temporary user data.
- **status**: Not Completed
- **log**:
- **files edited/created**:

### T12: Live Install and Protocol Registration

- **depends_on**: [T11, T2b]
- **location**: installed Codex path, `~/.local/share/applications/*.desktop`, `~/.config/autostart/*.desktop`, browser, Codex logs
- **description**: Replace the active installed app only after staged canary passes and the live install target from T2 is confirmed. Update launcher and autostart entries, refresh desktop database where available, and register `x-scheme-handler/codex` to the updated desktop entry. If launch or registration fails, restore from T2b.
- **validation**: Active launcher and autostart `Exec=` point to the new binary; `xdg-mime query default x-scheme-handler/codex` returns the updated desktop entry; `xdg-open 'codex://...'` reaches the new binary in both closed-app and already-running cases.
- **status**: Not Completed
- **log**:
- **files edited/created**:

### T13: Post-Install End-to-End Verification and Rollback Check

- **depends_on**: [T12]
- **location**: installed Codex path, Codex user-data/log paths, browser, plugin authorization flow
- **description**: Verify launch, login, plugin connection callback, protocol handler, model/settings persistence, terminal/PTY, git/apply-patch flows, browser pane/open-in-browser flows, and autostart launcher parity against the live install. Confirm rollback remains possible until the new app passes.
- **validation**: From `/home/amwill/Applications/codex-app/desktop`, `npm run test:linux` and `npm run test:linux:codex-package` pass; GUI launch works; direct `xdg-open 'codex://...'` tests pass; a real plugin authorization flow completes and the "connecting plugin" screen resolves after browser Allow. If any critical post-install check fails, restore the previous app/desktop/protocol state from T2b.
- **status**: Not Completed
- **log**:
- **files edited/created**:

## Parallel Execution Groups

| Wave | Tasks | Can Start When |
|------|-------|----------------|
| 1 | T1, T2 | Immediately |
| 2 | T2b, T3 | T2 for T2b, T1 for T3 |
| 3 | T4, T6, T7 | T2/T3 for T4 and T6, T3 for T7 |
| 4 | T5 | T3 and T4 complete |
| 5 | T8 | T5, T6, and T7 complete |
| 6 | T9 | T8 complete |
| 7 | T10 | T8 and T9 complete |
| 8 | T11 | T10 complete |
| 9 | T12 | T11 and T2b complete |
| 10 | T13 | T12 complete |

## Testing Strategy

- Run existing Linux contract tests before and after patch porting to catch regressions, from `/home/amwill/Applications/codex-app/desktop`.
- Add focused regression tests for new DMG patch markers before refreshing the checked-in recovered bundle.
- Add protocol handler tests that cover generated desktop entry contents, `%u` `Exec` handling, `xdg-mime` registration, and `codex://` argv parsing.
- Use real callback smoke tests with `xdg-open 'codex://...'` for both closed-app and already-running app states before attempting plugin auth.
- Run the actual plugin connection flow after install, not only unit tests, because the reported failure is browser-to-app IPC/deep-link integration.
- Keep rollback artifacts until all post-install checks pass.

## Risks and Mitigations

- **Minified bundle drift**: Existing patch strings are brittle and already fail on the new DMG. Mitigate by adding alternative matchers and failing fast per patch label.
- **Overwriting working Linux tweaks**: Do not sync the new DMG directly over `desktop/recovered`; refresh into `/tmp` first, then port/validate patches before replacing.
- **Protocol handler looks registered but points to old binary**: Always verify `xdg-mime query default x-scheme-handler/codex`, desktop entry contents, and active `Exec=` target after install.
- **Plugin auth callback may use a different URL shape than ChatGPT login**: Trace the actual plugin flow before implementing, then test the exact callback shape.
- **Native module ABI mismatch**: Rebuild native modules against Electron `41.2.0` and check Linux `.node` paths before packaging.
- **Multiple installed Codex copies**: Discover the current live launcher and autostart entries first; only replace the path the user actually runs.
- **Live replacement failure**: Snapshot the active app, desktop files, autostart files, protocol association, and user-data path before replacement, then restore if launch or plugin auth fails.
