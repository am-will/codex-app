import fs from 'node:fs';
import path from 'node:path';

export const desktopRoot = path.resolve(__dirname, '..', '..');
export const recoveredRoot = path.join(desktopRoot, 'recovered', 'app-asar-extracted');
export const recoveredBuildRoot = path.join(recoveredRoot, '.vite', 'build');
export const recoveredWebviewRoot = path.join(recoveredRoot, 'webview');
export const recoveredWebviewAssetsRoot = path.join(recoveredWebviewRoot, 'assets');

export function readDesktopFile(relativePath: string): string {
  return fs.readFileSync(path.join(desktopRoot, relativePath), 'utf8');
}

export function readRecoveredBuildFile(fileName: string): string {
  return fs.readFileSync(path.join(recoveredBuildRoot, fileName), 'utf8');
}

export function readRecoveredBinary(relativePath: string): Buffer {
  return fs.readFileSync(path.join(recoveredRoot, relativePath));
}

export function findRecoveredBuildFileMatching(pattern: RegExp): string {
  const matches = fs.readdirSync(recoveredBuildRoot).filter((entry) => pattern.test(entry)).sort();

  if (matches.length === 0) {
    throw new Error(`Missing recovered build file matching ${pattern}.`);
  }

  return matches[0];
}

export function findRecoveredBuildFile(prefix: string): string {
  const matches = fs
    .readdirSync(recoveredBuildRoot)
    .filter((entry) => entry.startsWith(prefix))
    .sort();

  if (matches.length === 0) {
    throw new Error(`Missing recovered build file with prefix "${prefix}".`);
  }

  return matches[0];
}

export function findRecoveredMainBuildFile(): string {
  return findRecoveredBuildFileMatching(/^main-.*\.js$/);
}

export function readRecoveredMainBuildFile(): string {
  return readRecoveredBuildFile(findRecoveredMainBuildFile());
}

export function readRecoveredWebviewIndex(): string {
  return fs.readFileSync(path.join(recoveredWebviewRoot, 'index.html'), 'utf8');
}

export function findRecoveredAssetMatching(pattern: RegExp): string {
  const matches = fs
    .readdirSync(recoveredWebviewAssetsRoot)
    .filter((entry) => pattern.test(entry))
    .sort();

  if (matches.length === 0) {
    throw new Error(`Missing recovered asset matching ${pattern}.`);
  }

  return matches[0];
}

export function findRecoveredAsset(prefix: string, extension = '.js'): string {
  const matches = fs
    .readdirSync(recoveredWebviewAssetsRoot)
    .filter((entry) => entry.startsWith(prefix) && entry.endsWith(extension))
    .sort();

  if (matches.length === 0) {
    throw new Error(`Missing recovered asset with prefix "${prefix}" and extension "${extension}".`);
  }

  return matches[0];
}

export function readRecoveredAsset(prefix: string, extension = '.js'): string {
  return fs.readFileSync(
    path.join(recoveredWebviewAssetsRoot, findRecoveredAsset(prefix, extension)),
    'utf8',
  );
}

export function readRecoveredRendererEntry(): string {
  const indexHtml = readRecoveredWebviewIndex();
  const match = indexHtml.match(/<script type="module" crossorigin src="\.\/*assets\/([^"]+)">/);

  if (!match?.[1]) {
    throw new Error('Could not resolve the recovered renderer entry from webview/index.html.');
  }

  return fs.readFileSync(path.join(recoveredWebviewAssetsRoot, match[1]), 'utf8');
}

export function getRecoveredRendererEntryFileName(): string {
  const indexHtml = readRecoveredWebviewIndex();
  const match = indexHtml.match(/<script type="module" crossorigin src="\.\/*assets\/([^"]+)">/);

  if (!match?.[1]) {
    throw new Error('Could not resolve the recovered renderer entry from webview/index.html.');
  }

  return match[1];
}
