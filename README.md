# codex-app

This repository is the working reconstruction and Linux-port starting point for the Codex desktop app.

## Layout

- `desktop/`: runnable Electron Forge + Vite + TypeScript starter app that will become the canonical source workspace in this repo
- `plan.md`: dependency-aware Ubuntu port plan
- `Codex-extracted-26.306.996.0/`: local-only extracted Windows reference artifact, intentionally excluded from git

## Getting Started

```bash
cd desktop
npm install
npm run start
```

## Linux Builds

Build Linux installers locally:

```bash
cd desktop
npm install
npm run make:linux
```

Expected outputs:
- `desktop/out/make/deb/*/*.deb`
- `desktop/out/make/**/Codex-*.AppImage`

GitHub release artifacts:
- Tag a release like `v26.311.21342` and push the tag.
- The workflow at `.github/workflows/linux-release.yml` builds Linux installers and uploads `.AppImage` + `.deb` as release assets.

## Notes

- The extracted Windows package remains available locally for reference, but it is not tracked in git because it contains large binaries that are not suitable for initial GitHub history.
- The `desktop/` app is the clean starting point for rebuilding the project with proper versioning and Linux support.
- Built installers and packaging outputs are release artifacts and should not be committed to git.
