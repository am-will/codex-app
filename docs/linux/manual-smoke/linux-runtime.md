# Linux Runtime Manual Smoke

## Scope

This note captures the manual Linux runtime checks performed for `T6` in the
Ubuntu reconstruction workspace.

## Commands Run

From `/home/willr/Applications/codex-app/desktop`:

```bash
npm run test:linux
./resources/bin/linux-x64/rg --version | head -n 1
timeout 10s ./resources/bin/linux-x64/codex --help | head -n 5
```

## Observed Results

- `npm run test:linux`
  - Passed with Linux executable-resolution, PTY lifecycle, helper execute-bit,
    deeplink, and startup-registration coverage green.
- `./resources/bin/linux-x64/rg --version | head -n 1`
  - Returned `ripgrep 15.1.0 (rev af60c2de9d)`.
- `timeout 10s ./resources/bin/linux-x64/codex --help | head -n 5`
  - Returned the expected Codex CLI help banner and usage text.

## Notes

- The helper binaries are staged from the extracted Windows package's Linux ELF
  payload and normalized to `0755` in the reconstruction workspace.
- PTY validation currently runs through the Node test harness using `node-pty`
  on Ubuntu, which is sufficient for runtime-layer verification before the
  packaging task finalizes bundled resource placement.
