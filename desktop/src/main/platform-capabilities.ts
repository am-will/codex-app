import type {
  PlatformCapabilities,
  PlatformCapabilityOptions,
  SupportedDesktopPlatform,
} from './platform-capability-types';
import { createLinuxPlatformCapabilities } from './linux/platform-capabilities';

function createUnsupportedCapabilities(
  platform: Exclude<SupportedDesktopPlatform, 'linux'>,
): PlatformCapabilities {
  return {
    platform,
    executableLookup: {
      codexBinaryName: platform === 'win32' ? 'codex.exe' : 'codex',
      rgBinaryName: platform === 'win32' ? 'rg.exe' : 'rg',
      resolvePaths: () => ({
        codex: platform === 'win32' ? 'codex.exe' : 'codex',
        rg: platform === 'win32' ? 'rg.exe' : 'rg',
      }),
    },
    runtimeSandbox: {
      inspectSupport: () => ({
        ok: false,
        code: 'SANDBOX_UNSUPPORTED',
        message: `${platform} sandbox inspection is not implemented in this workspace yet.`,
        recoverable: true,
      }),
    },
    pty: {
      resolveShell: () => '',
      probeLifecycle: async () => ({
        created: false,
        wroteInput: false,
        resized: false,
        terminated: false,
        exitCode: -1,
      }),
    },
    deeplink: {
      scheme: 'codex',
      extractFromArgv: () => null,
      dispatchArgv: () => ({
        accepted: false,
        routedToExistingWindow: false,
        url: null,
        parsedPath: null,
      }),
      registerProtocolClient: () => false,
    },
    protocolRegistration: {
      kind: 'unsupported',
      scheme: 'codex',
      mimeType: '',
      desktopId: '',
      desktopEntryPath: '',
      renderDesktopEntry: () => '',
      createInstallPlan: () => ({
        desktopId: '',
        desktopEntryPath: '',
        applicationsDirectory: '',
        mimeType: '',
        commands: [],
      }),
    },
    startupRegistration: {
      kind: 'unsupported',
      desktopEntryPath: '',
      enable: () => ({ desktopEntryManaged: false, enabled: false }),
      disable: () => ({ desktopEntryManaged: false, disabled: false }),
      isEnabled: () => false,
    },
  };
}

export function createPlatformCapabilities(
  platform: NodeJS.Platform,
  options: PlatformCapabilityOptions = {},
): PlatformCapabilities {
  if (platform === 'linux') {
    return createLinuxPlatformCapabilities(options);
  }

  if (platform === 'darwin' || platform === 'win32') {
    return createUnsupportedCapabilities(platform);
  }

  throw new Error(`Unsupported desktop platform: ${platform}`);
}

export type {
  DeepLinkDispatchResult,
  PlatformCapabilities,
  PlatformCapabilityOptions,
  StartupRegistrationResult,
  SupportedDesktopPlatform,
} from './platform-capability-types';
