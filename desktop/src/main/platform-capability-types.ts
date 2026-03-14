import type { App } from 'electron';

export type SupportedDesktopPlatform = 'linux' | 'darwin' | 'win32';

export type DeepLinkDispatchResult = {
  accepted: boolean;
  routedToExistingWindow: boolean;
  url: string | null;
  parsedPath: string | null;
};

export type DeepLinkRegistrationContext = {
  app: Pick<App, 'setAsDefaultProtocolClient'>;
  argv: string[];
  defaultApp: boolean | undefined;
  execPath: string;
};

export type StartupRegistrationResult = {
  desktopEntryManaged: boolean;
  enabled?: boolean;
  disabled?: boolean;
};

export type PlatformCapabilityOptions = {
  appName?: string;
  execPath?: string;
  xdgConfigHome?: string;
};

export type PlatformCapabilities = {
  platform: SupportedDesktopPlatform;
  executableLookup: {
    codexBinaryName: string;
    rgBinaryName: string;
    resolvePaths(): { codex: string; rg: string };
  };
  runtimeSandbox: {
    inspectSupport(): {
      ok: boolean;
      code: string;
      message: string;
      recoverable: boolean;
    };
  };
  pty: {
    resolveShell(env?: Record<string, string | undefined>): string;
    probeLifecycle(options?: { shell?: string }): Promise<{
      created: boolean;
      wroteInput: boolean;
      resized: boolean;
      terminated: boolean;
      exitCode: number;
    }>;
  };
  deeplink: {
    scheme: string;
    extractFromArgv(argv: string[]): string | null;
    dispatchArgv(
      argv: string[],
      options?: { routedToExistingWindow?: boolean },
    ): DeepLinkDispatchResult;
    registerProtocolClient(context: DeepLinkRegistrationContext): boolean;
  };
  startupRegistration: {
    kind: 'unsupported' | 'xdg-autostart';
    desktopEntryPath: string;
    enable(): StartupRegistrationResult;
    disable(): StartupRegistrationResult;
    isEnabled(): boolean;
  };
};
