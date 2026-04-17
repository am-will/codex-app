import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import * as pty from 'node-pty';

type ExecutableResolutionOptions = {
  resourcesDir?: string;
  env?: Record<string, string | undefined>;
};

type SandboxInspectionOptions = {
  helperPath?: string;
  chromeSandboxPath?: string;
  userNamespaceCloneValue?: string;
};

type HelperValidationResult = {
  ok: boolean;
  code: string;
  message: string;
};

type SandboxInspectionResult = HelperValidationResult & {
  recoverable: boolean;
};

type PtyLifecycleProbeResult = {
  created: boolean;
  wroteInput: boolean;
  resized: boolean;
  terminated: boolean;
  exitCode: number;
};

const DEFAULT_RESOURCES_DIR = path.resolve(
  __dirname,
  '..',
  '..',
  'resources',
  'bin',
  'linux-x64',
);

function isExecutableFile(filePath: string): boolean {
  try {
    fs.accessSync(filePath, fs.constants.X_OK);
    return true;
  } catch {
    return false;
  }
}

function findOnPath(
  binaryName: string,
  env: Record<string, string | undefined>,
): string | null {
  const pathValue = env.PATH ?? process.env.PATH ?? '';

  for (const directory of pathValue.split(path.delimiter).filter(Boolean)) {
    const candidate = path.join(directory, binaryName);
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }

  return null;
}

function resolvePreferredPath(
  binaryName: string,
  overrideEnvVar: string,
  options: ExecutableResolutionOptions,
): string {
  const env = options.env ?? process.env;
  const overridePath = env[overrideEnvVar];

  if (overridePath && overridePath.length > 0) {
    return overridePath;
  }

  const bundledPath = path.join(
    options.resourcesDir ?? DEFAULT_RESOURCES_DIR,
    binaryName,
  );
  if (fs.existsSync(bundledPath)) {
    return bundledPath;
  }

  const pathMatch = findOnPath(binaryName, env);
  if (pathMatch) {
    return pathMatch;
  }

  return bundledPath;
}

export function resolveLinuxExecutablePaths(
  options: ExecutableResolutionOptions = {},
): { codex: string; rg: string } {
  return {
    codex: resolvePreferredPath('codex', 'CODEX_CLI_PATH', options),
    rg: resolvePreferredPath('rg', 'RG_EXECUTABLE_PATH', options),
  };
}

export function resolveDefaultLinuxShell(
  env: Record<string, string | undefined> = process.env,
): string {
  if (env.SHELL && env.SHELL.length > 0) {
    return env.SHELL;
  }

  if (fs.existsSync('/bin/bash')) {
    return '/bin/bash';
  }

  return '/bin/sh';
}

function resolveProbeLinuxShell(): string {
  if (fs.existsSync('/bin/bash')) {
    return '/bin/bash';
  }

  return '/bin/sh';
}

export function validateLinuxHelperExecutable(
  helperPath: string,
): HelperValidationResult {
  if (!fs.existsSync(helperPath)) {
    return {
      ok: false,
      code: 'HELPER_MISSING',
      message: `Linux helper is missing: ${helperPath}`,
    };
  }

  if (!isExecutableFile(helperPath)) {
    return {
      ok: false,
      code: 'HELPER_NOT_EXECUTABLE',
      message: `Linux helper at ${helperPath} is missing execute permission.`,
    };
  }

  return {
    ok: true,
    code: 'HELPER_OK',
    message: `Linux helper is executable: ${helperPath}`,
  };
}

export function inspectLinuxSandboxSupport(
  options: SandboxInspectionOptions = {},
): SandboxInspectionResult {
  const helperPath =
    options.helperPath ?? resolveLinuxExecutablePaths().codex;
  const helperValidation = validateLinuxHelperExecutable(helperPath);

  if (!helperValidation.ok) {
    return {
      ok: false,
      code: `SANDBOX_${helperValidation.code}`,
      message: `Linux sandbox cannot start because the helper is invalid: ${helperValidation.message}`,
      recoverable: true,
    };
  }

  const userNamespaceCloneValue =
    options.userNamespaceCloneValue ??
    (fs.existsSync('/proc/sys/kernel/unprivileged_userns_clone')
      ? fs.readFileSync('/proc/sys/kernel/unprivileged_userns_clone', 'utf8')
      : undefined);

  if (userNamespaceCloneValue?.trim() === '0') {
    return {
      ok: false,
      code: 'SANDBOX_USER_NAMESPACE_DISABLED',
      message:
        'Linux sandbox is unavailable because unprivileged user namespace support is disabled.',
      recoverable: true,
    };
  }

  if (options.chromeSandboxPath) {
    if (!fs.existsSync(options.chromeSandboxPath)) {
      return {
        ok: false,
        code: 'SANDBOX_CHROME_SANDBOX_MISSING',
        message:
          'Linux sandbox is unavailable because chrome-sandbox is missing.',
        recoverable: true,
      };
    }

    if (!isExecutableFile(options.chromeSandboxPath)) {
      return {
        ok: false,
        code: 'SANDBOX_CHROME_SANDBOX_NOT_EXECUTABLE',
        message:
          'Linux sandbox is unavailable because chrome-sandbox is not executable.',
        recoverable: true,
      };
    }
  }

  return {
    ok: true,
    code: 'SANDBOX_OK',
    message: 'Linux sandbox support is available.',
    recoverable: false,
  };
}

export function runLinuxPtyLifecycleProbe(options: {
  shell?: string;
} = {}): Promise<PtyLifecycleProbeResult> {
  const shell = options.shell ?? resolveProbeLinuxShell();

  return new Promise((resolve, reject) => {
    const result: PtyLifecycleProbeResult = {
      created: true,
      wroteInput: false,
      resized: false,
      terminated: false,
      exitCode: -1,
    };

    const terminal = pty.spawn(
      shell,
      [
        '-lc',
        'printf READY; read line; printf " %s" "$line"; exit 0',
      ],
      {
        cols: 80,
        rows: 24,
        cwd: process.env.HOME ?? os.homedir(),
        env: process.env,
        name: 'xterm-color',
      },
    );

    let output = '';
    const timeout = setTimeout(() => {
      terminal.kill();
      reject(new Error(`Timed out waiting for PTY lifecycle probe. Output: ${output}`));
    }, 5000);

    const cleanup = (): void => {
      clearTimeout(timeout);
    };

    terminal.onData((chunk) => {
      output += chunk;

      if (output.includes('READY') && !result.wroteInput) {
        terminal.resize(100, 40);
        result.resized = true;
        terminal.write('PING\r');
        result.wroteInput = true;
      }
    });

    terminal.onExit(({ exitCode }) => {
      cleanup();
      result.terminated = true;
      result.exitCode = exitCode;

      if (!output.includes('PING')) {
        reject(
          new Error(`PTY lifecycle probe exited before echoing probe input. Output: ${output}`),
        );
        return;
      }

      resolve(result);
    });
  });
}
