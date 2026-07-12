import childProcess from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import asar from '@electron/asar';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const desktopRoot = path.resolve(__dirname, '..');

const requiredAppAsarMarkers = [
  {
    label: 'dynamic tool inputSchema normalization',
    marker: 'inputSchema:e.inputSchema??e.input_schema??{type:`object`,properties:{},additionalProperties:!1}',
  },
  {
    label: 'renderer thread/start sendRequest normalization',
    marker: 'e===`thread/start`&&(t=t.dynamicTools==null?t',
  },
  {
    label: 'renderer prewarm thread/start normalization',
    marker:
      'async prewarmThreadStart(e,t){if(this.dispatchMessage==null)throw Error(`AppServerRequestClient is missing a message dispatcher`);e=e.dynamicTools==null?e',
  },
  {
    label: 'renderer thread start host normalization',
    marker:
      'e.sendRequest(`thread/start`,{...n,threadSource:n.threadSource===void 0?`user`:n.threadSource}',
  },
  {
    label: 'bundled app-server feature allowlist',
    markerPattern:
      /[A-Za-z_$][\w$]*=\[(?:`memories`,`tool_suggest`|`apps_mcp_path_override`,`auth_elicitation`,`memories`,`tool_suggest`)\]/,
  },
];

const forbiddenAppAsarMarkers = [
  {
    label: 'unsupported bundled app-server feature sync',
    markerPattern:
      /[A-Za-z_$][\w$]*=\[`apps_mcp_path_override`,`auth_elicitation`,`memories`,`tool_suggest`,`goals`\]/,
  },
];

function sourceHasMarker(source, marker) {
  if (marker.markerPattern) {
    return marker.markerPattern.test(source);
  }

  return source.includes(marker.marker);
}

function parseArgValue(argv, name) {
  const index = argv.findIndex((arg) => arg === name);
  if (index === -1) {
    return null;
  }

  const value = argv[index + 1];
  if (!value) {
    throw new Error(`Missing value for ${name}`);
  }

  return value;
}

function readDesktopPackageJson() {
  return JSON.parse(fs.readFileSync(path.join(desktopRoot, 'package.json'), 'utf8'));
}

function assertFile(filePath, label) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`${label} is missing: ${filePath}`);
  }
}

function assertBundledCliVersion({ packageRoot, expectedCliVersion }) {
  const codexPath = path.join(packageRoot, 'resources', 'codex');
  assertFile(codexPath, 'Bundled codex helper');

  const actualVersion = childProcess
    .execFileSync(codexPath, ['--version'], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    })
    .trim();
  const expectedVersion = `codex-cli ${expectedCliVersion}`;

  if (actualVersion !== expectedVersion) {
    throw new Error(`Expected bundled codex helper "${expectedVersion}", found "${actualVersion}".`);
  }
}

function readAsarJavaScriptSources(appAsarPath) {
  return asar
    .listPackage(appAsarPath)
    .filter((entry) => entry.endsWith('.js'))
    .map((entry) => {
      const asarEntry = entry.startsWith('/') ? entry.slice(1) : entry;
      return asar.extractFile(appAsarPath, asarEntry).toString('utf8');
    });
}

function assertAppAsarMarkers(packageRoot) {
  const appAsarPath = path.join(packageRoot, 'resources', 'app.asar');
  assertFile(appAsarPath, 'Packaged app.asar');

  const appAsarSource = readAsarJavaScriptSources(appAsarPath).join('\n');

  for (const marker of requiredAppAsarMarkers) {
    if (!sourceHasMarker(appAsarSource, marker)) {
      const { label } = marker;
      throw new Error(`Packaged app.asar is missing ${label} marker.`);
    }
  }

  for (const marker of forbiddenAppAsarMarkers) {
    if (sourceHasMarker(appAsarSource, marker)) {
      const { label } = marker;
      throw new Error(`Packaged app.asar still contains ${label} marker.`);
    }
  }
}

export function verifyLinuxPackageContract({ packageRoot, expectedCliVersion }) {
  assertFile(packageRoot, 'Linux package root');
  assertBundledCliVersion({ packageRoot, expectedCliVersion });
  assertAppAsarMarkers(packageRoot);
}

function main() {
  const packageRootArg = parseArgValue(process.argv, '--package-root');
  if (!packageRootArg) {
    throw new Error('Usage: node ./scripts/verify-linux-package-contract.mjs --package-root <path>');
  }

  const packageJson = readDesktopPackageJson();
  const expectedCliVersion =
    parseArgValue(process.argv, '--expected-cli-version') ?? packageJson.codexCliVersion;
  if (!expectedCliVersion) {
    throw new Error('Missing expected codex CLI version.');
  }

  const packageRoot = path.resolve(process.cwd(), packageRootArg);
  verifyLinuxPackageContract({ packageRoot, expectedCliVersion });
  process.stdout.write(
    `Verified Linux package contract for ${packageRoot} with codex-cli ${expectedCliVersion}.\n`,
  );
}

if (process.argv[1] === __filename) {
  main();
}
