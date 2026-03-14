import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, test } from '@jest/globals';

const desktopRoot = path.resolve(__dirname, '..', '..');

const selectorModuleCandidates = [
  'src/main/platform-capabilities.ts',
  'src/platform-capabilities.ts',
];

const linuxModuleCandidates = [
  'src/main/linux/platform-capabilities.ts',
  'src/main/linux/platform-capabilities/index.ts',
  'src/linux/platform-capabilities.ts',
  'src/platform/linux/platform-capabilities.ts',
];

type UnknownRecord = Record<string, unknown>;

function findExistingCandidate(relativePaths: string[]): string | null {
  for (const relativePath of relativePaths) {
    if (fs.existsSync(path.join(desktopRoot, relativePath))) {
      return relativePath;
    }
  }

  return null;
}

function formatCandidates(relativePaths: string[]): string {
  return relativePaths.map((relativePath) => `- ${relativePath}`).join('\n');
}

function loadModule(relativePaths: string[]): { modulePath: string; moduleExports: UnknownRecord } {
  const modulePath = findExistingCandidate(relativePaths);

  if (!modulePath) {
    throw new Error(
      [
        'Missing T5 capability module.',
        'Implement one of the supported source paths below:',
        formatCandidates(relativePaths),
      ].join('\n'),
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const loaded = require(path.join(desktopRoot, modulePath)) as UnknownRecord;
  return { modulePath, moduleExports: loaded };
}

describe('T5 RED contract: Linux platform abstraction', () => {
  test('platform capability selection resolves through one abstraction surface', () => {
    const { moduleExports } = loadModule(selectorModuleCandidates);
    const selectCapabilities = moduleExports.createPlatformCapabilities as
      | ((platform: NodeJS.Platform) => UnknownRecord)
      | undefined;

    if (typeof selectCapabilities !== 'function') {
      throw new Error('Expected createPlatformCapabilities(platform) export.');
    }

    const capabilities = selectCapabilities('linux');

    expect(Object.keys(capabilities)).toEqual(
      expect.arrayContaining([
      'platform',
      'executableLookup',
      'startupRegistration',
      'deeplink',
      ]),
    );
    expect(capabilities.platform).toBe('linux');
  });

  test('Linux deeplink routing accepts codex URLs and routes to an existing window in single-instance mode', () => {
    const { moduleExports } = loadModule(linuxModuleCandidates);
    const createLinuxPlatformCapabilities = moduleExports
      .createLinuxPlatformCapabilities as (() => UnknownRecord) | undefined;

    if (typeof createLinuxPlatformCapabilities !== 'function') {
      throw new Error('Expected createLinuxPlatformCapabilities() export.');
    }

    const capabilities = createLinuxPlatformCapabilities();
    const deeplink = capabilities.deeplink as UnknownRecord | undefined;

    if (!deeplink || typeof deeplink !== 'object') {
      throw new Error('Missing `deeplink` capability object in Linux capabilities.');
    }

    const dispatchArgv = deeplink.dispatchArgv as
      | ((argv: string[], options: UnknownRecord) => UnknownRecord)
      | undefined;

    if (typeof dispatchArgv !== 'function') {
      throw new Error('Expected deeplink.dispatchArgv(argv, options) method.');
    }

    const accepted = dispatchArgv(['codex-desktop', 'codex://thread/123'], {
      routedToExistingWindow: true,
    });
    const rejected = dispatchArgv(['codex-desktop', 'https://example.com/not-codex'], {
      routedToExistingWindow: true,
    });

    expect(accepted).toEqual(
      expect.objectContaining({
        accepted: true,
        parsedPath: '/thread/123',
        routedToExistingWindow: true,
      }),
    );

    expect(rejected).toEqual(
      expect.objectContaining({
        accepted: false,
      }),
    );
  });

  test('Linux startup registration supports enable and disable transitions through startupRegistration capability', () => {
    const { moduleExports } = loadModule(linuxModuleCandidates);
    const createLinuxPlatformCapabilities = moduleExports.createLinuxPlatformCapabilities as
      | ((options: UnknownRecord) => UnknownRecord)
      | undefined;

    if (typeof createLinuxPlatformCapabilities !== 'function') {
      throw new Error('Expected createLinuxPlatformCapabilities(options) export.');
    }

    const xdgConfigHome = path.join(desktopRoot, '.tmp-tests', 't5-startup');
    fs.rmSync(xdgConfigHome, { recursive: true, force: true });

    const capabilities = createLinuxPlatformCapabilities({
      appName: 'Codex Desktop',
      execPath: '/opt/codex/Codex Desktop',
      xdgConfigHome,
    });
    const startupRegistration = capabilities.startupRegistration as UnknownRecord | undefined;

    if (!startupRegistration || typeof startupRegistration !== 'object') {
      throw new Error('Missing `startupRegistration` capability object in Linux capabilities.');
    }

    const enable = startupRegistration.enable;
    const disable = startupRegistration.disable;

    if (typeof enable !== 'function' || typeof disable !== 'function') {
      throw new Error(
        'Linux startup registration must expose both `enable()` and `disable()` methods on `startupRegistration`.',
      );
    }

    const enabledResult = (enable as () => UnknownRecord)();
    const disabledResult = (disable as () => UnknownRecord)();

    expect(enabledResult).toEqual(
      expect.objectContaining({
        enabled: true,
        desktopEntryManaged: true,
      }),
    );

    expect(disabledResult).toEqual(
      expect.objectContaining({
        disabled: true,
        desktopEntryManaged: true,
      }),
    );

    expect(
      fs.existsSync(path.join(xdgConfigHome, 'autostart', 'Codex Desktop.desktop')),
    ).toBe(false);
  });
});
