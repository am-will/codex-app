# codex-app

Codex desktop app packaging and release repository.

This repo tracks the Linux packaging pipeline for Codex and publishes installable release artifacts.

## Layout

- `desktop/`: Electron Forge workspace used to build Linux release packages
- `codex-3-12/`: legacy 3-12 payload used for legacy package variants

GitHub release artifacts:
- Install from GitHub Releases using packaged artifacts (`.AppImage` / `.deb`).
- Release tags like `v26.311.21342` trigger `.github/workflows/linux-release.yml`.
- The workflow publishes both current and `legacy-3-12` Linux installer variants.

## Notes

- Built installers and packaging outputs are release artifacts and should not be committed to git.
