import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import type {
  DeepLinkDispatchResult,
  DeepLinkRegistrationContext,
  PlatformCapabilities,
  PlatformCapabilityOptions,
  StartupRegistrationResult,
} from '../platform-capability-types';
import {
  inspectLinuxSandboxSupport,
  resolveDefaultLinuxShell,
  resolveLinuxExecutablePaths,
  runLinuxPtyLifecycleProbe,
} from './runtime-support';
import {
  CODEX_LINUX_DESKTOP_ID,
  CODEX_PROTOCOL_MIME_TYPE,
  CODEX_PROTOCOL_SCHEME,
  createLinuxProtocolRegistrationPlan,
  renderLinuxAutostartDesktopEntry,
  renderLinuxProtocolDesktopEntry,
} from './protocol-registration';

const DEFAULT_APP_NAME = 'Codex Desktop';
const DEFAULT_EXECUTABLE_PATH = '/opt/codex/Codex Desktop';

function getLinuxConfigHome(xdgConfigHome?: string): string {
  if (xdgConfigHome && xdgConfigHome.length > 0) {
    return xdgConfigHome;
  }

  if (process.env.XDG_CONFIG_HOME && process.env.XDG_CONFIG_HOME.length > 0) {
    return process.env.XDG_CONFIG_HOME;
  }

  return path.join(os.homedir(), '.config');
}

function getLinuxDataHome(xdgDataHome?: string): string {
  if (xdgDataHome && xdgDataHome.length > 0) {
    return xdgDataHome;
  }

  if (process.env.XDG_DATA_HOME && process.env.XDG_DATA_HOME.length > 0) {
    return process.env.XDG_DATA_HOME;
  }

  return path.join(os.homedir(), '.local', 'share');
}

function toDesktopEntryName(appName: string): string {
  const normalized = appName.trim().replace(/\s+/g, ' ');
  return `${normalized || DEFAULT_APP_NAME}.desktop`;
}

function extractCodexDeepLink(argv: string[]): string | null {
  for (let index = argv.length - 1; index >= 0; index -= 1) {
    const value = argv[index];

    if (
      typeof value === 'string' &&
      value.startsWith(`${CODEX_PROTOCOL_SCHEME}://`)
    ) {
      return value;
    }
  }

  return null;
}

function parseCodexDeepLinkPath(urlValue: string): string | null {
  try {
    const parsed = new URL(urlValue);
    if (parsed.protocol !== `${CODEX_PROTOCOL_SCHEME}:`) {
      return null;
    }

    const hostSegment = parsed.hostname ? `/${parsed.hostname}` : '';
    const pathnameSegment = parsed.pathname === '/' ? '' : parsed.pathname;
    const combinedPath = `${hostSegment}${pathnameSegment}` || '/';

    return combinedPath.startsWith('/') ? combinedPath : `/${combinedPath}`;
  } catch {
    return null;
  }
}

function dispatchCodexDeepLink(
  argv: string[],
  routedToExistingWindow = false,
): DeepLinkDispatchResult {
  const url = extractCodexDeepLink(argv);
  const parsedPath = url ? parseCodexDeepLinkPath(url) : null;

  return {
    accepted: Boolean(url && parsedPath),
    routedToExistingWindow: Boolean(url && parsedPath && routedToExistingWindow),
    url,
    parsedPath,
  };
}

function registerCodexProtocolClient(
  context: DeepLinkRegistrationContext,
): boolean {
  if (context.defaultApp && context.argv.length >= 2) {
    return context.app.setAsDefaultProtocolClient(
      CODEX_PROTOCOL_SCHEME,
      context.execPath,
      [path.resolve(context.argv[1])],
    );
  }

  return context.app.setAsDefaultProtocolClient(CODEX_PROTOCOL_SCHEME);
}

function createProtocolRegistration(
  appName: string,
  execPath: string,
  options: PlatformCapabilityOptions,
): PlatformCapabilities['protocolRegistration'] {
  const desktopId = options.desktopId ?? CODEX_LINUX_DESKTOP_ID;
  const applicationsDirectory = path.join(
    getLinuxDataHome(options.xdgDataHome),
    'applications',
  );
  const desktopEntryPath = path.join(applicationsDirectory, desktopId);

  return {
    kind: 'xdg-mime',
    scheme: CODEX_PROTOCOL_SCHEME,
    mimeType: CODEX_PROTOCOL_MIME_TYPE,
    desktopId,
    desktopEntryPath,
    renderDesktopEntry: () =>
      `${renderLinuxProtocolDesktopEntry({
        appName,
        execPath,
        iconPath: options.iconPath,
        startupWMClass: options.startupWMClass,
      })}\n`,
    createInstallPlan: () =>
      createLinuxProtocolRegistrationPlan({
        desktopEntryPath,
        applicationsDirectory,
        desktopId,
      }),
  };
}

function createStartupRegistration(
  appName: string,
  execPath: string,
  xdgConfigHome?: string,
): PlatformCapabilities['startupRegistration'] {
  const configHome = getLinuxConfigHome(xdgConfigHome);
  const autostartDirectory = path.join(configHome, 'autostart');
  const desktopEntryPath = path.join(
    autostartDirectory,
    toDesktopEntryName(appName),
  );

  const ensureAutostartDirectory = (): void => {
    fs.mkdirSync(autostartDirectory, { recursive: true });
  };

  const isEnabled = (): boolean => fs.existsSync(desktopEntryPath);

  const enable = (): StartupRegistrationResult => {
    ensureAutostartDirectory();
    fs.writeFileSync(
      desktopEntryPath,
      `${renderLinuxAutostartDesktopEntry({ appName, execPath })}\n`,
      'utf8',
    );

    return {
      desktopEntryManaged: true,
      enabled: isEnabled(),
    };
  };

  const disable = (): StartupRegistrationResult => {
    if (fs.existsSync(desktopEntryPath)) {
      fs.unlinkSync(desktopEntryPath);
    }

    return {
      desktopEntryManaged: true,
      disabled: !isEnabled(),
    };
  };

  return {
    kind: 'xdg-autostart',
    desktopEntryPath,
    enable,
    disable,
    isEnabled,
  };
}

export function createLinuxPlatformCapabilities(
  options: PlatformCapabilityOptions = {},
): PlatformCapabilities {
  const appName = options.appName ?? DEFAULT_APP_NAME;
  const execPath = options.execPath ?? DEFAULT_EXECUTABLE_PATH;

  return {
    platform: 'linux',
    executableLookup: {
      codexBinaryName: 'codex',
      rgBinaryName: 'rg',
      resolvePaths: () =>
        resolveLinuxExecutablePaths({
          resourcesDir: path.resolve(
            __dirname,
            '..',
            '..',
            '..',
            'resources',
            'bin',
            'linux-x64',
          ),
        }),
    },
    runtimeSandbox: {
      inspectSupport: () =>
        inspectLinuxSandboxSupport({
          helperPath: resolveLinuxExecutablePaths({
            resourcesDir: path.resolve(
              __dirname,
              '..',
              '..',
              '..',
              'resources',
              'bin',
              'linux-x64',
            ),
          }).codex,
        }),
    },
    pty: {
      resolveShell: resolveDefaultLinuxShell,
      probeLifecycle: runLinuxPtyLifecycleProbe,
    },
    deeplink: {
      scheme: CODEX_PROTOCOL_SCHEME,
      extractFromArgv: extractCodexDeepLink,
      dispatchArgv: (argv, dispatchOptions) =>
        dispatchCodexDeepLink(argv, dispatchOptions?.routedToExistingWindow),
      registerProtocolClient: registerCodexProtocolClient,
    },
    protocolRegistration: createProtocolRegistration(appName, execPath, options),
    startupRegistration: createStartupRegistration(
      appName,
      execPath,
      options.xdgConfigHome,
    ),
  };
}
