# codex-app

This repository is the working reconstruction and Linux-port starting point for the Codex desktop app.

## Layout

- `desktop/`: runnable Electron Forge + Vite + TypeScript starter app that will become the canonical source workspace in this repo
- `Codex-extracted-26.306.996.0/`: local-only extracted Windows reference artifact, intentionally excluded from git

## Getting Started

```bash
cd desktop
npm install
npm run start
```

## To install with Agent

If you want to run this manually from source (instead of using a prebuilt Debian package), use these steps:

1. Clone the repo to your machine: `git clone https://github.com/am-will/codex-app.git`
2. Go into the project folder: `cd codex-app/desktop`
3. Install dependencies: `npm install`
4. Start the app in development mode: `npm run start`
5. If you want Linux install files later, build them with: `npm run make:linux`

GitHub release artifacts:
- Tag a release like `v26.311.21342` and push the tag.
- The workflow at `.github/workflows/linux-release.yml` builds Linux installers and uploads `.AppImage` + `.deb` as release assets.

## Notes

- The extracted Windows package remains available locally for reference, but it is not tracked in git because it contains large binaries that are not suitable for initial GitHub history.
- The `desktop/` app is the clean starting point for rebuilding the project with proper versioning and Linux support.
- Built installers and packaging outputs are release artifacts and should not be committed to git.
