# Linux Regression Harness

This folder owns the Linux-first regression gates for the Ubuntu port. It
exists to force deterministic evidence before platform implementation work is
accepted.

Current suite state:
- RED by design: the capability-selection contract fails until a Linux platform
  capability module exists in the source tree.
- Skip-first contracts cover the remaining Linux runtime and integration areas
  without weakening the acceptance bar for later tasks.

Coverage categories:
- capability selection
- executable resolution
- PTY lifecycle
- packaged deeplinks
- startup registration
- updater state
- helper execute-bit checks
- SQLite startup
- sandbox boot failures

Project commands:

```bash
npm test -- --listTests | rg 'linux'
npm run test:linux:red
npm run test:linux
npm run test:linux:ci
```

Expected RED result today:
- `tests/linux/linux-regression.contract.test.ts` fails because no Linux
  capability module exists yet.
- The remaining Linux contracts stay skipped until T5 and T6 activate them with
  implementation-backed assertions.
