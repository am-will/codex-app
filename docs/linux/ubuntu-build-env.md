# Ubuntu Build And Packaging Environment

## Scope

This runbook defines the verified Ubuntu build flow for the refreshed `desktop/` wrapper that now vendors the `codex` upstream package.

- Reference input: `codex/`
- Active app workspace: `desktop/`
- Package manager: `npm`
- Version policy: Linux artifact names track embedded app version `26.325.21211`; imported Windows package manifest version remains `26.325.2171.0`; build number is `1255`.
- Primary Linux artifacts:
  - unpacked app: `desktop/out/Codex-linux-x64/`
  - Debian package: `desktop/out/make/deb/x64/codex-desktop_26.325.21211_amd64.deb`
  - AppImage: `desktop/out/make/AppImage/x64/Codex-26.325.21211-x64.AppImage`

## Supported Ubuntu Builders

- Ubuntu 22.04 x64
- Ubuntu 24.04 x64

Use a normal GUI session or `xvfb` for headless launch checks.

## Required System Packages

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
  rpm \
  xvfb
```

## Canonical Commands

Run all app commands from `desktop/`.

Install dependencies:

```bash
cd /home/willr/Applications/codex-app/desktop
npm ci
```

Linux regression suite:

```bash
cd /home/willr/Applications/codex-app/desktop
npm run test:linux
```

Unpacked package build:

```bash
cd /home/willr/Applications/codex-app/desktop
npm run package
```

Expected unpacked output:

- `desktop/out/Codex-linux-x64/`
- executable: `desktop/out/Codex-linux-x64/Codex`

Debian package build:

```bash
cd /home/willr/Applications/codex-app/desktop
npm run make
```

Expected `.deb` output:

- `desktop/out/make/deb/x64/codex-desktop_26.325.21211_amd64.deb`

## Packaging Verification

Helpers:

```bash
cd /home/willr/Applications/codex-app/desktop
test -x out/Codex-linux-x64/resources/codex
test -x out/Codex-linux-x64/resources/rg
file out/Codex-linux-x64/resources/codex out/Codex-linux-x64/resources/rg
```

Native modules:

```bash
cd /home/willr/Applications/codex-app/desktop
file \
  out/Codex-linux-x64/resources/app.asar.unpacked/node_modules/better-sqlite3/build/Release/better_sqlite3.node \
  out/Codex-linux-x64/resources/app.asar.unpacked/node_modules/node-pty/build/Release/pty.node \
  out/Codex-linux-x64/resources/app.asar.unpacked/node_modules/node-pty/bin/linux-x64-143/node-pty.node
```

Negative gate:

```bash
cd /home/willr/Applications/codex-app/desktop
! find out/Codex-linux-x64/resources -maxdepth 1 -type f | rg 'codex\\.exe|rg\\.exe|codex-command-runner\\.exe|codex-windows-sandbox-setup\\.exe'
! find out/Codex-linux-x64/resources/app.asar.unpacked/node_modules/node-pty -type f | rg 'prebuilds/(win32|darwin)'
```

## Runtime Smoke Evidence

The packaged Linux app was validated in this refresh by:

- successful Electron/CDP attachment to the built app window
- packaged plugins, skills, and settings surfaces rendering from the built output
- successful app-server stdio transport spawn using packaged `resources/codex`
- Debian payload inspection confirming `chrome-sandbox` is packaged with mode `4755`

Local caveat for unpacked smoke runs:

- `desktop/out/Codex-linux-x64/Codex` aborts on a plain launch if `chrome-sandbox` is not running with the expected setuid-root permissions.
- For local unpacked verification, either preserve the sandbox permissions or run with `--no-sandbox`.

## Current Status

- `npm run test:linux` passes
- `npm run package` passes
- `npm run make` passes
- unpacked and packaged artifacts use the refreshed embedded app version `26.325.21211`, Windows package manifest `26.325.2171.0`, and build `1255`
