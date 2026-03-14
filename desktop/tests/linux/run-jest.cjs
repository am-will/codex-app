const { spawnSync } = require('node:child_process');

const forwardedArgs = process.argv.slice(2).filter((arg) => arg !== '--');
const jestBin = require.resolve('jest/bin/jest');

const result = spawnSync(
  process.execPath,
  [jestBin, '--config', './jest.config.cjs', ...forwardedArgs],
  {
    cwd: __dirname + '/../..',
    stdio: 'inherit',
  },
);

if (result.error) {
  throw result.error;
}

process.exit(result.status ?? 1);
