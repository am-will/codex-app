# Codex Desktop Rollback Snapshot

Captured: 2026-04-23 01:24:33 MDT.

## Snapshot Location

Rollback backup directory:

```text
/home/amwill/.local/state/codex-app-update-backups/20260423-012433-MDT
```

This directory is outside `/home/amwill/Applications/codex-app` and is not tracked by git.

## Backed-Up State

- Active install directory: `/home/amwill/.local/opt/codex-desktop/26.415.20818-undo-fix-v8`
- Current install symlink target: `/home/amwill/.local/opt/codex-desktop/26.415.20818-undo-fix-v8`
- Wrapper executable: `/home/amwill/.local/bin/codex-desktop`
- Desktop launcher: `/home/amwill/.local/share/applications/codex-desktop.desktop`
- Autostart entry: `/home/amwill/.config/autostart/codex-desktop.desktop`
- User mime associations: `/home/amwill/.config/mimeapps.list`
- Codex user-data path: `/home/amwill/.config/Codex`

The full Codex user-data directory was not copied, because it can contain auth/session data and other secrets. The snapshot records only its path and filesystem metadata under `metadata/user-data-path.txt` and `metadata/user-data-stat.txt`.

## Snapshot Contents

```text
/home/amwill/.local/state/codex-app-update-backups/20260423-012433-MDT/active-install/26.415.20818-undo-fix-v8
/home/amwill/.local/state/codex-app-update-backups/20260423-012433-MDT/bin/codex-desktop
/home/amwill/.local/state/codex-app-update-backups/20260423-012433-MDT/config/mimeapps.list
/home/amwill/.local/state/codex-app-update-backups/20260423-012433-MDT/desktop-entries/config-autostart/codex-desktop.desktop
/home/amwill/.local/state/codex-app-update-backups/20260423-012433-MDT/desktop-entries/local-share-applications/codex-desktop.desktop
/home/amwill/.local/state/codex-app-update-backups/20260423-012433-MDT/metadata/current-symlink.txt
/home/amwill/.local/state/codex-app-update-backups/20260423-012433-MDT/metadata/current-target.txt
/home/amwill/.local/state/codex-app-update-backups/20260423-012433-MDT/metadata/file-stats.txt
/home/amwill/.local/state/codex-app-update-backups/20260423-012433-MDT/metadata/user-data-path.txt
/home/amwill/.local/state/codex-app-update-backups/20260423-012433-MDT/metadata/user-data-stat.txt
/home/amwill/.local/state/codex-app-update-backups/20260423-012433-MDT/metadata/xdg-mime-x-scheme-handler-codex.txt
```

## Captured Restore Values

```text
launcher Exec=/home/amwill/.local/bin/codex-desktop
autostart Exec=/home/amwill/.local/bin/codex-desktop
current target=/home/amwill/.local/opt/codex-desktop/26.415.20818-undo-fix-v8
xdg default for x-scheme-handler/codex=<none>
user-data path=/home/amwill/.config/Codex
```

## Restore Commands

Close Codex before restoring live files. These commands restore the previous app path, wrapper, desktop launcher, autostart entry, and user mime associations from the snapshot.

```bash
backup=/home/amwill/.local/state/codex-app-update-backups/20260423-012433-MDT

mkdir -p /home/amwill/.local/opt/codex-desktop
cp -a --reflink=auto "$backup/active-install/26.415.20818-undo-fix-v8" /home/amwill/.local/opt/codex-desktop/
ln -sfn /home/amwill/.local/opt/codex-desktop/26.415.20818-undo-fix-v8 /home/amwill/.local/opt/codex-desktop/current

mkdir -p /home/amwill/.local/bin
cp -a "$backup/bin/codex-desktop" /home/amwill/.local/bin/codex-desktop

mkdir -p /home/amwill/.local/share/applications
cp -a "$backup/desktop-entries/local-share-applications/codex-desktop.desktop" /home/amwill/.local/share/applications/codex-desktop.desktop

mkdir -p /home/amwill/.config/autostart
cp -a "$backup/desktop-entries/config-autostart/codex-desktop.desktop" /home/amwill/.config/autostart/codex-desktop.desktop

mkdir -p /home/amwill/.config
cp -a "$backup/config/mimeapps.list" /home/amwill/.config/mimeapps.list

xdg-mime query default x-scheme-handler/codex
```

The final `xdg-mime` command should print no output, matching the pre-update state. If a failed new install directory must be removed before restore, move it to trash first instead of deleting it directly.

## Validation

Reason not testable: rollback/environment snapshot. This task captures machine-local app, launcher, autostart, protocol, and user-data location state; validation is by exact static/manual checks rather than unit or integration tests.

Static checks run:

```text
active install backup exists
wrapper backup exists
launcher backup exists
autostart backup exists
mimeapps backup exists
xdg bytes: 0
du: 596M
file count: 98
```

```text
backup launcher Exec: /home/amwill/.local/bin/codex-desktop
backup autostart Exec: /home/amwill/.local/bin/codex-desktop
current launcher Exec: /home/amwill/.local/bin/codex-desktop
current autostart Exec: /home/amwill/.local/bin/codex-desktop
backup current target: /home/amwill/.local/opt/codex-desktop/26.415.20818-undo-fix-v8
backup xdg default: <none>
```

```text
wrapper cmp OK
launcher cmp OK
autostart cmp OK
mimeapps cmp OK
```
