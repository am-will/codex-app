import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, test } from '@jest/globals';

const desktopRoot = path.resolve(__dirname, '..', '..');

const capabilityModuleCandidates = [
  'src/main/linux/platform-capabilities.ts',
  'src/main/linux/platform-capabilities/index.ts',
  'src/linux/platform-capabilities.ts',
  'src/platform/linux/platform-capabilities.ts',
];

const platformSelectorCandidates = [
  'src/main/platform-capabilities.ts',
  'src/platform-capabilities.ts',
];

const runtimeModuleCandidates = [
  'src/main/linux/runtime-support.ts',
  'src/main/linux/runtime.ts',
  'src/linux/runtime-support.ts',
];

const protocolModuleCandidates = [
  'src/main/linux/protocol-registration.ts',
  'src/main/linux/protocol-registration/index.ts',
  'src/linux/protocol-registration.ts',
];

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

function requireExistingModule<T>(relativePaths: string[]): T {
  const existingModule = findExistingCandidate(relativePaths);

  if (!existingModule) {
    throw new Error(
      [
        'Missing required module.',
        'Implement one of the supported source paths below before this test can pass:',
        formatCandidates(relativePaths),
      ].join('\n'),
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  return require(path.join(desktopRoot, existingModule)) as T;
}

describe('Linux Ubuntu port regression gates (T4a)', () => {
  test('capability selection: linux platform capability module exists and is ready to own selection logic', () => {
    const selectorModule = requireExistingModule<{
      createPlatformCapabilities: (platform: NodeJS.Platform, options?: {
        appName?: string;
        execPath?: string;
        xdgConfigHome?: string;
      }) => {
        platform: string;
        executableLookup: { codexBinaryName: string; rgBinaryName: string };
        deeplink: { scheme: string };
        startupRegistration: { kind: string };
      };
    }>(platformSelectorCandidates);

    const capabilities = selectorModule.createPlatformCapabilities('linux', {
      appName: 'Codex Desktop',
      execPath: '/opt/codex/Codex Desktop',
      xdgConfigHome: '/tmp/codex-linux-tests',
    });

    expect(capabilities.platform).toBe('linux');
    expect(capabilities.executableLookup.codexBinaryName).toBe('codex');
    expect(capabilities.executableLookup.rgBinaryName).toBe('rg');
    expect(capabilities.deeplink.scheme).toBe('codex');
    expect(capabilities.startupRegistration.kind).toBe('xdg-autostart');
  });

  test(
    'executable resolution: resolves codex and rg helpers without .exe suffix',
    () => {
      const runtimeModule = requireExistingModule<{
        resolveLinuxExecutablePaths: (options?: {
          resourcesDir?: string;
          env?: Record<string, string | undefined>;
        }) => {
          codex: string;
          rg: string;
        };
      }>(runtimeModuleCandidates);
      const linuxPaths = runtimeModule.resolveLinuxExecutablePaths({
        resourcesDir: path.join(desktopRoot, 'resources', 'bin', 'linux-x64'),
        env: {},
      });

      expect(linuxPaths.codex.endsWith('.exe')).toBe(false);
      expect(linuxPaths.rg.endsWith('.exe')).toBe(false);
      expect(linuxPaths.codex).toMatch(/codex$/);
      expect(linuxPaths.rg).toMatch(/rg$/);
      expect(fs.existsSync(linuxPaths.codex)).toBe(true);
      expect(fs.existsSync(linuxPaths.rg)).toBe(true);
    },
  );

  test('PTY lifecycle: create, write, resize, and terminate complete cleanly', async () => {
    const runtimeModule = requireExistingModule<{
      runLinuxPtyLifecycleProbe: (options?: {
        shell?: string;
      }) => Promise<{
        created: boolean;
        wroteInput: boolean;
        resized: boolean;
        terminated: boolean;
        exitCode: number;
      }>;
    }>(runtimeModuleCandidates);
    const result = await runtimeModule.runLinuxPtyLifecycleProbe();

    expect(result.created).toBe(true);
    expect(result.wroteInput).toBe(true);
    expect(result.resized).toBe(true);
    expect(result.terminated).toBe(true);
    expect(result.exitCode).toBe(0);
  });

  test('packaged deeplinks: codex:// URLs route through the Linux single-instance handler', () => {
    const linuxModule = requireExistingModule<{
      createLinuxPlatformCapabilities: (options?: {
        appName?: string;
        execPath?: string;
        xdgConfigHome?: string;
      }) => {
        deeplink: {
          dispatchArgv: (argv: string[], options?: { routedToExistingWindow?: boolean }) => {
            accepted: boolean;
            routedToExistingWindow: boolean;
            url: string | null;
            parsedPath: string | null;
          };
        };
      };
    }>(capabilityModuleCandidates);

    const capabilities = linuxModule.createLinuxPlatformCapabilities();
    const event = capabilities.deeplink.dispatchArgv(
      ['codex-desktop', '--inspect=0', 'codex://thread/123?source=test'],
      { routedToExistingWindow: true },
    );

    expect(event.accepted).toBe(true);
    expect(event.routedToExistingWindow).toBe(true);
    expect(event.url).toBe('codex://thread/123?source=test');
    expect(event.parsedPath).toBe('/thread/123');
  });

  test('plugin OAuth callbacks: cold-start argv and second-instance argv preserve the full codex callback URL', () => {
    const linuxModule = requireExistingModule<{
      createLinuxPlatformCapabilities: (options?: {
        appName?: string;
        execPath?: string;
        xdgConfigHome?: string;
      }) => {
        deeplink: {
          dispatchArgv: (argv: string[], options?: { routedToExistingWindow?: boolean }) => {
            accepted: boolean;
            routedToExistingWindow: boolean;
            url: string | null;
            parsedPath: string | null;
          };
        };
      };
    }>(capabilityModuleCandidates);

    const capabilities = linuxModule.createLinuxPlatformCapabilities();
    const callbackUrl =
      'codex://connector/oauth_callback?code=abc123&state=plugin-login-state';
    const coldStart = capabilities.deeplink.dispatchArgv(['Codex', callbackUrl]);
    const alreadyRunning = capabilities.deeplink.dispatchArgv(
      ['Codex', '--some-electron-flag', callbackUrl],
      { routedToExistingWindow: true },
    );

    expect(coldStart).toEqual(
      expect.objectContaining({
        accepted: true,
        routedToExistingWindow: false,
        url: callbackUrl,
        parsedPath: '/connector/oauth_callback',
      }),
    );
    expect(alreadyRunning).toEqual(
      expect.objectContaining({
        accepted: true,
        routedToExistingWindow: true,
        url: callbackUrl,
        parsedPath: '/connector/oauth_callback',
      }),
    );
  });

  test('plugin OAuth callbacks: malformed callback URLs are rejected before renderer completion', () => {
    const linuxModule = requireExistingModule<{
      createLinuxPlatformCapabilities: (options?: {
        appName?: string;
        execPath?: string;
        xdgConfigHome?: string;
      }) => {
        deeplink: {
          dispatchArgv: (argv: string[], options?: { routedToExistingWindow?: boolean }) => {
            accepted: boolean;
            routedToExistingWindow: boolean;
            url: string | null;
            parsedPath: string | null;
          };
        };
      };
    }>(capabilityModuleCandidates);

    const capabilities = linuxModule.createLinuxPlatformCapabilities();
    const missingState = capabilities.deeplink.dispatchArgv([
      'Codex',
      'codex://connector/oauth_callback?code=abc123',
    ]);
    const wrongScheme = capabilities.deeplink.dispatchArgv([
      'Codex',
      'https://chatgpt.com/connector/oauth_callback?code=abc123&state=plugin-login-state',
    ]);

    expect(missingState).toEqual(
      expect.objectContaining({
        accepted: false,
        routedToExistingWindow: false,
        url: 'codex://connector/oauth_callback?code=abc123',
        parsedPath: '/connector/oauth_callback',
      }),
    );
    expect(wrongScheme).toEqual(
      expect.objectContaining({
        accepted: false,
        routedToExistingWindow: false,
        url: null,
        parsedPath: null,
      }),
    );
  });

  test('protocol registration: packaged Linux desktop entry advertises codex scheme and keeps %u URL delivery', () => {
    const protocolModule = requireExistingModule<{
      CODEX_PROTOCOL_MIME_TYPE: string;
      CODEX_PROTOCOL_URL_ARG: string;
      renderLinuxProtocolDesktopEntry: (options: {
        appName: string;
        execPath: string;
        iconPath: string;
        startupWMClass: string;
      }) => string;
    }>(protocolModuleCandidates);

    const desktopEntry = protocolModule.renderLinuxProtocolDesktopEntry({
      appName: 'Codex',
      execPath: '/home/amwill/.local/bin/codex-desktop',
      iconPath: '/home/amwill/.local/share/icons/hicolor/512x512/apps/codex-desktop.png',
      startupWMClass: 'Codex',
    });

    expect(protocolModule.CODEX_PROTOCOL_MIME_TYPE).toBe('x-scheme-handler/codex');
    expect(protocolModule.CODEX_PROTOCOL_URL_ARG).toBe('%u');
    expect(desktopEntry).toContain('MimeType=x-scheme-handler/codex;');
    expect(desktopEntry).toContain(
      'Exec="/home/amwill/.local/bin/codex-desktop" %u',
    );
    expect(desktopEntry).toContain('StartupWMClass=Codex');
  });

  test('protocol registration: install plan validates, refreshes desktop cache, and sets the xdg-mime default', () => {
    const protocolModule = requireExistingModule<{
      CODEX_LINUX_DESKTOP_ID: string;
      createLinuxProtocolRegistrationPlan: (options: {
        desktopEntryPath: string;
        applicationsDirectory: string;
      }) => {
        desktopId: string;
        mimeType: string;
        commands: Array<{
          command: string;
          args: string[];
          optional: boolean;
        }>;
      };
    }>(protocolModuleCandidates);

    const plan = protocolModule.createLinuxProtocolRegistrationPlan({
      desktopEntryPath:
        '/home/amwill/.local/share/applications/codex-desktop.desktop',
      applicationsDirectory: '/home/amwill/.local/share/applications',
    });

    expect(plan.desktopId).toBe(protocolModule.CODEX_LINUX_DESKTOP_ID);
    expect(plan.mimeType).toBe('x-scheme-handler/codex');
    expect(plan.commands).toEqual([
      {
        command: 'desktop-file-validate',
        args: ['/home/amwill/.local/share/applications/codex-desktop.desktop'],
        optional: true,
      },
      {
        command: 'update-desktop-database',
        args: ['/home/amwill/.local/share/applications'],
        optional: true,
      },
      {
        command: 'xdg-mime',
        args: ['default', 'codex-desktop.desktop', 'x-scheme-handler/codex'],
        optional: false,
      },
    ]);
  });

  test('forge Linux makers use the same codex scheme contract in generated desktop entries', () => {
    const protocolModule = requireExistingModule<{
      CODEX_PROTOCOL_MIME_TYPE: string;
      CODEX_PROTOCOL_URL_ARG: string;
    }>(protocolModuleCandidates);
    const forgeConfig = fs.readFileSync(
      path.join(desktopRoot, 'forge.config.ts'),
      'utf8',
    );
    const debTemplatePath = path.join(
      desktopRoot,
      'assets',
      'linux',
      'codex-deb.desktop.ejs',
    );
    const appImageDesktopPath = path.join(
      desktopRoot,
      'assets',
      'linux',
      'codex-appimage.desktop',
    );
    const debTemplate = fs.readFileSync(debTemplatePath, 'utf8');
    const appImageDesktop = fs.readFileSync(appImageDesktopPath, 'utf8');

    expect(forgeConfig).toContain('CODEX_PROTOCOL_MIME_TYPE');
    expect(forgeConfig).toContain('codex-deb.desktop.ejs');
    expect(forgeConfig).toContain('codex-appimage.desktop');
    expect(debTemplate).toContain('Exec=<%= name %> %u');
    expect(debTemplate).toContain('MimeType=<%= mimeType.join(\';\') %>;');
    expect(appImageDesktop).toContain(`Exec=Codex ${protocolModule.CODEX_PROTOCOL_URL_ARG}`);
    expect(appImageDesktop).toContain(
      `MimeType=${protocolModule.CODEX_PROTOCOL_MIME_TYPE};`,
    );
  });

  test('startup registration: enables and disables autostart through Linux desktop integration', () => {
    const linuxModule = requireExistingModule<{
      createLinuxPlatformCapabilities: (options?: {
        appName?: string;
        execPath?: string;
        xdgConfigHome?: string;
      }) => {
        startupRegistration: {
          desktopEntryPath: string;
          enable: () => { enabled: boolean; desktopEntryManaged: boolean };
          disable: () => { disabled: boolean; desktopEntryManaged: boolean };
          isEnabled: () => boolean;
        };
      };
    }>(capabilityModuleCandidates);

    const xdgConfigHome = path.join(desktopRoot, '.tmp-tests', 'linux-startup');
    fs.rmSync(xdgConfigHome, { recursive: true, force: true });

    const capabilities = linuxModule.createLinuxPlatformCapabilities({
      appName: 'Codex Desktop',
      execPath: '/opt/codex/Codex Desktop',
      xdgConfigHome,
    });

    const enabled = capabilities.startupRegistration.enable();
    const startupDesktopEntry = capabilities.startupRegistration.desktopEntryPath;
    const desktopEntryContents = fs.readFileSync(startupDesktopEntry, 'utf8');
    const disabled = capabilities.startupRegistration.disable();

    expect(enabled.enabled).toBe(true);
    expect(enabled.desktopEntryManaged).toBe(true);
    expect(desktopEntryContents).toContain('Exec="/opt/codex/Codex Desktop" --open-at-login');
    expect(fs.existsSync(startupDesktopEntry)).toBe(false);
    expect(disabled.disabled).toBe(true);
    expect(disabled.desktopEntryManaged).toBe(true);
    expect(capabilities.startupRegistration.isEnabled()).toBe(false);
  });

  test.skip(
    'updater state: Linux provider returns unsupported or available state deterministically',
    () => {
      const updaterState = () => {
        throw new Error('pending implementation');
      };
      const state = updaterState();

      expect(['unsupported', 'idle', 'update-available']).toContain(state.status);
      expect(typeof state.userMessage).toBe('string');
      expect(state.userMessage.length).toBeGreaterThan(0);
    },
  );

  test(
    'helper execute-bit checks: helper binaries return an actionable error when non-executable',
    () => {
      const runtimeModule = requireExistingModule<{
        validateLinuxHelperExecutable: (helperPath: string) => {
          ok: boolean;
          code: string;
          message: string;
        };
      }>(runtimeModuleCandidates);
      const helperPath = path.join(desktopRoot, '.tmp-tests', 'codex-helper');
      fs.mkdirSync(path.dirname(helperPath), { recursive: true });
      fs.writeFileSync(helperPath, '#!/bin/sh\necho helper\n', { mode: 0o644 });
      const result = runtimeModule.validateLinuxHelperExecutable(helperPath);

      expect(result.ok).toBe(false);
      expect(result.code).toBe('HELPER_NOT_EXECUTABLE');
      expect(result.message).toMatch(/execute permission/i);
    },
  );

  test.skip('SQLite startup: Linux startup validates database open and migration status', () => {
    const startSqlite = () => {
      throw new Error('pending implementation');
    };
    const result = startSqlite();

    expect(result.opened).toBe(true);
    expect(result.migrated).toBe(true);
    expect(result.error).toBeUndefined();
  });

  test.skip(
    'sandbox boot failures: user namespace or chrome-sandbox errors are surfaced clearly',
    () => {
      const runtimeModule = requireExistingModule<{
        inspectLinuxSandboxSupport: (options?: {
          helperPath?: string;
          chromeSandboxPath?: string;
          userNamespaceCloneValue?: string;
        }) => {
          ok: boolean;
          code: string;
          message: string;
          recoverable: boolean;
        };
      }>(runtimeModuleCandidates);
      const result = runtimeModule.inspectLinuxSandboxSupport({
        helperPath: path.join(desktopRoot, 'resources', 'bin', 'linux-x64', 'codex'),
        chromeSandboxPath: path.join(desktopRoot, '.tmp-tests', 'missing-chrome-sandbox'),
        userNamespaceCloneValue: '0',
      });

      expect(result.ok).toBe(false);
      expect(result.code).toMatch(/SANDBOX_/);
      expect(result.message).toMatch(/sandbox|user namespace|chrome-sandbox/i);
      expect(result.recoverable).toBe(true);
    },
  );
});
