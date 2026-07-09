# Ubuntu Build And Packaging Environment

## Baseline

- App version: `26.707.31123`
- Build number: `5042`
- Electron: `42.1.0`
- Node.js: `22`
- Package manager: `npm`

Release CI builds x64 AppImage, deb, and rpm artifacts plus an arm64 deb.

## Required Packages

```bash
sudo apt-get update
sudo apt-get install -y \
  build-essential \
  dpkg \
  fakeroot \
  git \
  make \
  pkg-config \
  python3 \
  rpm
```

## Canonical Commands

```bash
cd desktop
npm ci
npm run hydrate:codex:linux
npm run test:linux
npm run package
npm run make:linux -- --skip-package
```

`package`, `make`, and `make:linux` call the hydrator themselves. The explicit command
is useful when checking the helper package before a build.

## Package Verification

```bash
cd desktop
node scripts/verify-linux-package-contract.mjs \
  --package-root out/Codex-linux-x64

test -x out/Codex-linux-x64/resources/codex
test -x out/Codex-linux-x64/resources/codex-vendor/bin/codex
test -x out/Codex-linux-x64/resources/codex-vendor/bin/codex-code-mode-host
test -x out/Codex-linux-x64/resources/codex-vendor/codex-resources/bwrap
test -x out/Codex-linux-x64/resources/codex-vendor/codex-resources/zsh/bin/zsh
```

## Smoke Launch

An unpacked Forge output may require `--no-sandbox` because its `chrome-sandbox` does
not have package-installed setuid ownership:

```bash
./out/Codex-linux-x64/Codex --no-sandbox
```

Installed deb/rpm packages should use their packaged sandbox permissions.
