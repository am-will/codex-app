# Current Codex Desktop Install Baseline

Captured: 2026-04-23, America/Denver.

## Summary

- Active desktop launcher: `/home/amwill/.local/share/applications/codex-desktop.desktop`
- Active autostart entry: `/home/amwill/.config/autostart/codex-desktop.desktop`
- Launcher executable: `/home/amwill/.local/bin/codex-desktop`
- Wrapper target: `$HOME/.local/opt/codex-desktop/current/Codex`
- Resolved install path: `/home/amwill/.local/opt/codex-desktop/26.415.20818-undo-fix-v8`
- Package metadata from `resources/app.asar`: `openai-codex-electron` / `Codex` / `26.415.20818` / build `1727`
- Electron runtime observed from crashpad annotation: `41.2.0`
- Bundled CLI: `codex-cli 0.121.0`
- User-data directory observed from running process args: `/home/amwill/.config/Codex`
- Protocol handler for `x-scheme-handler/codex`: no default registered

## Git Worktree

Task-start status, captured before T2 edits while T1 was still in progress:

```text
$ git status --short
 M .gitignore
```

After T1 committed and before creating this report, the worktree was clean:

```text
$ git status --short
```

## Desktop Entries

```text
$ fd -a -e desktop 'codex|Codex' /home/amwill/.local/share/applications /home/amwill/.config/autostart /usr/share/applications
/home/amwill/.config/autostart/codex-desktop.desktop
/home/amwill/.local/share/applications/codex-desktop.desktop
```

```text
$ sed -n '/^\(Name\|Exec\|Icon\|Path\|MimeType\|StartupWMClass\|Type\)=/p' /home/amwill/.local/share/applications/codex-desktop.desktop
Type=Application
Name=Codex
Exec=/home/amwill/.local/bin/codex-desktop
Icon=/home/amwill/.local/share/icons/hicolor/512x512/apps/codex-desktop.png
StartupWMClass=Codex
```

```text
$ sed -n '/^\(Name\|Exec\|Icon\|Path\|MimeType\|StartupWMClass\|Type\)=/p' /home/amwill/.config/autostart/codex-desktop.desktop
Type=Application
Name=Codex
Exec=/home/amwill/.local/bin/codex-desktop
Icon=/home/amwill/.local/share/icons/hicolor/512x512/apps/codex-desktop.png
StartupWMClass=Codex
```

Neither desktop entry currently declares `MimeType=x-scheme-handler/codex;`, and neither `Exec=` line accepts `%u`.

## Executable and Install Path

```text
$ ls -la /home/amwill/.local/bin/codex-desktop
-rwxr-xr-x 1 amwill amwill 95 Apr 16 14:27 /home/amwill/.local/bin/codex-desktop

$ sed -n '1,120p' /home/amwill/.local/bin/codex-desktop
#!/usr/bin/env bash
set -euo pipefail
exec "$HOME/.local/opt/codex-desktop/current/Codex" "$@"

$ readlink -f /home/amwill/.local/opt/codex-desktop/current
/home/amwill/.local/opt/codex-desktop/26.415.20818-undo-fix-v8
```

Available local install directories:

```text
/home/amwill/.local/opt/codex-desktop/26.415.20818
/home/amwill/.local/opt/codex-desktop/26.415.20818-browser-panel-fix
/home/amwill/.local/opt/codex-desktop/26.415.20818-packaged
/home/amwill/.local/opt/codex-desktop/26.415.20818-undo-fix-v5
/home/amwill/.local/opt/codex-desktop/26.415.20818-undo-fix-v6
/home/amwill/.local/opt/codex-desktop/26.415.20818-undo-fix-v8
/home/amwill/.local/opt/codex-desktop/current -> /home/amwill/.local/opt/codex-desktop/26.415.20818-undo-fix-v8
```

Runtime resources in the active install:

```text
$ ls -la /home/amwill/.local/opt/codex-desktop/current/resources
-rw-r--r-- 1 amwill amwill   1610742 Apr 17 01:36 THIRD_PARTY_NOTICES.txt
-rw-r--r-- 1 amwill amwill 111696647 Apr 17 01:36 app.asar
drwxr-xr-x 1 amwill amwill        24 Apr 17 01:36 app.asar.unpacked
-rwxr-xr-x 1 amwill amwill 188080456 Apr 17 01:36 codex
-rwxr-xr-x 1 amwill amwill      1858 Apr 17 01:36 git
-rw-r--r-- 1 amwill amwill    265994 Apr 17 01:36 notification.wav
-rwxr-xr-x 1 amwill amwill   5445512 Apr 17 01:36 rg
```

## Version Metadata

```text
$ tmp=$(mktemp -d); cd "$tmp"
$ /home/amwill/Applications/codex-app/desktop/node_modules/.bin/asar extract-file /home/amwill/.local/opt/codex-desktop/current/resources/app.asar package.json
$ jq '{name, productName, version, codexBuildNumber, main}' package.json
{
  "name": "openai-codex-electron",
  "productName": "Codex",
  "version": "26.415.20818",
  "codexBuildNumber": "1727",
  "main": ".vite/build/bootstrap.js"
}
$ rm -rf "$tmp"

$ /home/amwill/.local/opt/codex-desktop/current/resources/codex --version
codex-cli 0.121.0
```

## Protocol Handler State

```text
$ xdg-mime query default x-scheme-handler/codex
```

No output was returned, so no default handler is currently registered for `codex://`.

```text
$ find /home/amwill/.config /home/amwill/.local/share -name mimeapps.list -print | while read -r f; do rg -n 'x-scheme-handler/codex|codex-desktop' "$f"; done
```

No `mimeapps.list` entry for `x-scheme-handler/codex` or `codex-desktop` was found under those user config/share paths.

## Running Codex Processes

Desktop-relevant processes:

```text
1025066 /home/amwill/.local/opt/codex-desktop/current/Codex
1025138 /home/amwill/.local/opt/codex-desktop/26.415.20818-undo-fix-v8/chrome_crashpad_handler --database=/home/amwill/.config/Codex/Crashpad --annotation=_productName=Codex --annotation=_version=26.415.20818 --annotation=plat=Linux --annotation=prod=Electron --annotation=ver=41.2.0
1025165 /proc/self/exe --type=utility --utility-sub-type=network.mojom.NetworkService --user-data-dir=/home/amwill/.config/Codex
1025187 /home/amwill/.local/opt/codex-desktop/26.415.20818-undo-fix-v8/resources/codex app-server --analytics-default-enabled
```

Additional Codex CLI sessions were also running and appear unrelated to the desktop install target:

```text
302735 node /home/amwill/.npm-global/bin/codex
302742 /home/amwill/.npm-global/lib/node_modules/@openai/codex/node_modules/@openai/codex-linux-x64/vendor/x86_64-unknown-linux-musl/codex/codex
308492 node /home/amwill/.npm-global/bin/codex
308499 /home/amwill/.npm-global/lib/node_modules/@openai/codex/node_modules/@openai/codex-linux-x64/vendor/x86_64-unknown-linux-musl/codex/codex
329033 node /home/amwill/.npm-global/bin/codex -m claude-mythos
329040 /home/amwill/.npm-global/lib/node_modules/@openai/codex/node_modules/@openai/codex-linux-x64/vendor/x86_64-unknown-linux-musl/codex/codex -m claude-mythos
```

## Testability

Reason not testable: environment discovery. This task captures the current live install, launcher, protocol, process, and worktree state; there is no deterministic unit/integration behavior to assert. Validation is by manual/static shell checks recorded above.
