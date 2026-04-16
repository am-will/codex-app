import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { buildCodexLinuxRuntime } from './build-codex-linux-runtime.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const desktopRoot = path.resolve(__dirname, '..');
const defaultOutputRoot = path.join(desktopRoot, 'out', 'Codex-linux-x64-codex');

function parseOutputRoot(argv) {
  const outputIndex = argv.findIndex((arg) => arg === '--output');
  if (outputIndex === -1) {
    return defaultOutputRoot;
  }

  const nextValue = argv[outputIndex + 1];
  if (!nextValue) {
    throw new Error('Missing value for --output');
  }

  return path.resolve(process.cwd(), nextValue);
}

async function main() {
  const outputRoot = parseOutputRoot(process.argv.slice(2));
  const summary = await buildCodexLinuxRuntime({
    outputRoot,
    shellRoot: path.join(desktopRoot, 'out', 'Codex-linux-x64'),
    assembledRoot: path.join(desktopRoot, 'tmp', `codex-runtime-stage`),
    codexShellRoot: path.resolve(desktopRoot, '..', 'codex', 'app'),
  });
  process.stdout.write(`${JSON.stringify(summary, null, 2)}\n`);
}

await main();
