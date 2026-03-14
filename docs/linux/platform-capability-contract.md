# Linux Platform Capability Contract

## Purpose

This document is the canonical contract for reconstructing the packaged Codex Electron bundle in `codex-3-12/` into the Linux `desktop/` workspace. It converts the shipped `win32` and `darwin` branches in the recovered main-process bundle into one explicit Linux decision surface so downstream implementation work can remove scattered `process.platform` checks.

## Provenance

Primary evidence came from:

- `codex-3-12/app/resources/app.asar`
- `desktop/recovered/app-asar-extracted/.vite/build/bootstrap.js`
- `desktop/recovered/app-asar-extracted/.vite/build/main-CfPlqsSZ.js`
- `desktop/recovered/app-asar-extracted/package.json`
- `codex-3-12/app/resources/`
- `desktop/recovered/app-asar-extracted/webview/assets/*`

Observed extracted behaviors that drive this contract:

- packaged entrypoint is `.vite/build/bootstrap.js`
- bundled helpers include both `codex` and `rg` plus Windows-only `codex.exe`, `rg.exe`, `codex-command-runner.exe`, and `codex-windows-sandbox-setup.exe`
- the main bundle contains explicit `win32`, `darwin`, and limited `linux` branches for:
  - executable lookup
  - WSL routing
  - PTY shell selection
  - deeplink registration
  - single-instance handling
  - updater behavior
  - hotkey-window behavior
  - quit behavior
  - notification support
  - file/folder opening
- the extracted package does not show Electron `safeStorage`, `keytar`, `libsecret`, `setLoginItemSettings`, or `getLoginItemSettings` usage in the shipped main bundle
- the settings schema still exposes Windows-specific `runCodexInWindowsSubsystemForLinux` and cross-platform `openOnStartup` / `hotkeyWindowHotkey`

## Canonical Capability Surface

Linux implementation must route all platform-sensitive behavior through one main-process contract with these fields:

```ts
type DesktopPlatformCapabilities = {
  platform: "linux" | "darwin" | "win32";
  displayServer: "wayland" | "x11" | "unknown";
  executableLookup: Capability;
  runtimeSandbox: Capability;
  pty: Capability;
  startupRegistration: Capability;
  updater: Capability;
  deeplink: Capability;
  notifications: Capability;
  openFolder: Capability;
  openExternal: Capability;
  hotkeyWindow: Capability;
  tray: Capability;
  credentialStore: Capability;
};
```

Each capability implementation must be selected once at startup and then consumed everywhere else through this contract.

## Capability Decisions

| Capability | Extracted evidence | Windows / mac behavior in bundle | Linux contract |
|---|---|---|---|
| executable lookup | recovered main bundle resolves `codex.exe` vs `codex`; `rg.exe` vs `rg`; resources include Linux ELF helpers | Windows prefers `.exe` helpers and WSL-aware path resolution | Linux resolves only ELF `resources/codex` and `resources/rg`, plus explicit env overrides. No `.exe` suffixes, no WSL path rewriting, and packaged helpers must be executable before app launch. |
| sandbox / runtime | settings key `runCodexInWindowsSubsystemForLinux`; `WSL_DISTRO_NAME`; bundled `codex-windows-sandbox-setup.exe` | Windows can prefer WSL and has a Windows-only sandbox setup helper | Linux removes the WSL preference from behavior. Local execution is always native Linux. Windows-only sandbox setup binaries are unsupported. Runtime boot must detect user-namespace / `chrome-sandbox` failures and surface a recoverable Linux-native error path. |
| pty | recovered main bundle dynamically imports `node-pty`; non-win32 shell fallback uses `process.env.SHELL || /bin/bash`; win32 has PowerShell / Command Prompt / Git Bash / WSL options | Windows offers multiple terminal backends including WSL | Linux uses the Unix `node-pty` backend only. Default shell is `$SHELL`, else `/bin/bash`, else `/bin/sh` if `/bin/bash` is absent. Settings must not expose PowerShell, Command Prompt, Git Bash, or WSL on Linux. |
| startup registration | settings include `openOnStartup`; no shipped `setLoginItemSettings` or `getLoginItemSettings` usage found | mac and Windows likely use platform-native registration elsewhere, but not in this extracted bundle | Linux startup registration is XDG autostart only, implemented via a `.desktop` file in `~/.config/autostart`. No login-item APIs, no systemd user service by default, no hidden side channel. |
| updater | main bundle initializes Sparkle only on `darwin` and explicitly disables it on non-darwin | mac uses Sparkle; non-mac menu reports updates unavailable when Sparkle is absent | Linux never uses Sparkle or Electron `autoUpdater` as the shipping path. The Linux updater capability is an app-defined provider that reports state and points users to apt-based or manual package updates. |
| deeplink / protocol | `setAsDefaultProtocolClient("codex")`; mac `open-url`; shared process-argv queue; `second-instance` flushes queued links | mac receives `open-url`; packaged builds register `codex://` | Linux registers `x-scheme-handler/codex` through packaging metadata and consumes deeplinks from process argv in the existing single-instance flow. Deeplink handling must work in packaged `.deb` installs and degrade cleanly in unpackaged dev mode. |
| notifications | notification manager uses `Notification.isSupported()` and packaged `notification.wav`; sound staging is gated to `darwin` in the recovered main bundle | shared Electron notifications with optional sound | Linux uses Electron `Notification` backed by the desktop notification service. Sound is best-effort only and no extra Linux-packaged sound asset is required; lack of sound support is non-fatal. Notification permission state must not block core task execution. |
| open-folder | main bundle uses `shell.showItemInFolder()` for files and `shell.openPath()` for directories; Windows has explicit `explorer.exe` discovery nearby | Windows can lean on Explorer semantics | Linux uses Electron shell APIs only, which map to `xdg-open` / file manager behavior. No Explorer-specific assumptions. Missing paths must walk upward to the nearest existing parent before open-folder is attempted. |
| open-external | menu items call `shell.openExternal()` for docs/changelog/automation links | shared browser handoff | Linux uses `shell.openExternal()` as-is. Browser launch failure must surface an actionable error, not a silent no-op. |
| hotkey window | main bundle registers global shortcuts and builds special hotkey windows; mac adds `panel` window types and workspace visibility tweaks | mac has extra panel semantics; Windows and mac both attempt the global shortcut path | Linux supports the hotkey window only when runtime checks succeed. Global shortcut registration is required before exposing the feature as enabled. No mac panel types are assumed. |
| tray | no `Tray` or app-indicator usage found in the shipped main bundle | no tray evidence in extracted app | Linux tray support is out of scope for parity and should remain disabled until a real tray implementation exists. The capability still exists so UI can hide tray-only affordances consistently. |
| credential store | no shipped `safeStorage`, `keytar`, or other keychain library usage found in main bundle or package dependencies | extracted app appears to avoid an explicit OS keychain abstraction in shipped code | Linux capability must prefer a first-class encrypted store only when Electron secret storage is available through `libsecret` / Secret Service. If unavailable, the app must not silently invent a plaintext Linux-only secret store. It may fall back only to the same cross-platform persisted auth/session path already required for parity, or require re-auth for sensitive local-only secrets. |

## Linux-Specific Policy Decisions

### Wayland vs X11

- The app must launch on both Wayland and X11 sessions.
- `displayServer` must be detected once from session environment, with `XDG_SESSION_TYPE=wayland` treated as Wayland and `x11` treated as X11.
- X11 is the reference behavior for parity-sensitive global shortcut and always-on-top hotkey-window behavior because Electron global shortcut handling is more deterministic there.
- On Wayland:
  - normal windows, deeplinks, notifications, PTY sessions, and local execution remain supported
  - the hotkey window is enabled only if `globalShortcut.register()` succeeds and the compositor allows it
  - if global shortcut registration fails, the app must disable the hotkey capability and keep the command/menu path available
- No Linux build may hard-require XWayland or force a relaunch just to emulate Windows behavior.

### `libsecret` / Secret Service

- Linux secret storage is optional at runtime, not an install-time hard dependency for app launch.
- When `libsecret` / Secret Service is available through Electron credential APIs, the capability reports `available`.
- When unavailable, the capability reports `unavailable` and sensitive secret-at-rest flows must either:
  - reuse the existing cross-platform persisted auth/session mechanism already needed for parity, or
  - require user re-entry for secrets that cannot be stored safely
- Silent plaintext fallback is not allowed for Linux-only code.

### Unsupported Windows-Only APIs

These behaviors are not ported literally and must be replaced or disabled behind the capability contract:

- `app.setAppUserModelId(...)`
- `runCodexInWindowsSubsystemForLinux`
- WSL path and shell routing
- `codex-windows-sandbox-setup.exe`
- `.exe` helper assumptions
- Explorer-specific launch behavior

### Unsupported macOS-Only APIs

These behaviors are not Linux targets and must not leak into Linux codepaths:

- Sparkle updater
- mac `open-url` as the primary deeplink delivery path
- `panel` window type and mac traffic-light/title-bar conventions
- mac application discovery logic under `/Applications/*.app`
- mac-only permission prompts such as microphone access branches

## Contract Rules By Area

### Executable Lookup

- Canonical helper names on Linux are `codex` and `rg`.
- Search order is:
  1. explicit environment override
  2. packaged `resources/` helper
  3. unpacked helper if present during development
  4. system `PATH`
- Linux helper resolution must validate execute bits before use.

### Runtime / Sandbox

- Linux local execution must invoke the Linux helper directly.
- The capability must report whether sandbox prerequisites are satisfied.
- Failure modes that must be surfaced explicitly:
  - missing helper executable
  - non-executable helper
  - user namespaces unavailable
  - `chrome-sandbox` unusable
  - shell launch failure

### PTY

- Linux PTY sessions must support create, write, resize, terminate, and exit-status delivery.
- Environment shaping must stay POSIX-native.
- `TERMINFO` overrides used for Windows compatibility must not leak into Linux unless required by the chosen terminal behavior.

### Startup Registration

- Linux startup behavior is owned by packaging plus the main-process capability.
- The settings toggle for `openOnStartup` must map to XDG autostart state only.
- If the desktop environment does not honor autostart entries, the toggle must report failure instead of claiming success.

### Deeplink

- Linux packaged builds must install the `codex://` handler through the desktop entry.
- Incoming deeplinks must route through the existing single-instance queue and focus an existing window when one already exists.
- Bare dev builds may omit protocol registration, but manual argv-based deeplink testing must still work.

### Notifications

- `Notification.isSupported()` is the runtime gate.
- Unsupported or permission-denied environments must degrade to in-app state updates, not task failure.

### Open-Folder / Open-External

- `open-folder` maps to file manager reveal or parent-folder open using Electron shell APIs.
- `open-external` maps to the desktop browser only.
- Both capabilities must return structured success or failure so UI strings stay platform-neutral.

### Hotkey Window / Tray

- Hotkey capability is runtime-probed, not assumed from platform name.
- Tray capability is `unsupported` on Linux until a real tray implementation exists.
- UI must hide tray-only entry points when `tray.unsupported === true`.

### Credential Store

- The contract must expose:
  - `available`
  - `backend` (`libsecret`, `none`, or future explicit backend)
  - `supportsPersistentSecretAtRest`
- Linux implementation must not claim encrypted storage when `libsecret` is unavailable.

## Extracted Branch Inventory And Linux Disposition

| Observed branch | Disposition |
|---|---|
| `process.platform===win32` helper naming, shell selection, WSL routing, AppUserModelId | replace with Linux-native helper and shell capability |
| `process.platform===darwin` Sparkle, panel windows, app discovery, `open-url` | keep in non-Linux implementations only |
| `process.platform!==darwin` quit app on `window-all-closed` | Linux follows non-mac quit behavior |
| `process.platform!==win32` Unix sockets and non-Windows shell defaults | Linux keeps this behavior and makes it explicit in the capability contract |
| `process.platform===linux` log path handling and signal set | keep and fold into the Linux implementation, but do not scatter more direct checks |
| no explicit `Tray`, `safeStorage`, or login-item APIs in bundle | capability remains explicit so Linux behavior is deterministic instead of inferred |

## High-Risk Gaps Closed By This Contract

No release-blocking platform area remains undefined after this contract. The main remaining work is implementation, not decision-making:

- Linux updater path is defined as custom provider, not Electron built-in updater.
- Linux PTY and runtime behavior are defined as native-only, not WSL-compatible.
- Wayland vs X11 behavior is defined, including hotkey fallback.
- `libsecret` behavior is defined, including no-plaintext fallback.
- Windows-only and mac-only APIs are explicitly excluded from Linux parity scope.

## Required Follow-On Consumers

Downstream tasks must use this contract as the only source of truth for:

- settings gating
- main-process platform services
- runtime helper launch
- packaged desktop integration
- updater state exposure
- Linux regression coverage
