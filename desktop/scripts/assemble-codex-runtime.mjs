import crypto from 'node:crypto';
import childProcess from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const desktopRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(desktopRoot, '..');
const gitLfsPointerPrefix = 'version https://git-lfs.github.com/spec/v1';

const codexResourcesRoot = path.join(repoRoot, 'codex', 'app', 'resources');
const defaultAssembleOutputRoot = path.join(desktopRoot, 'tmp', 'codex-runtime');
const currentLinuxUnpackedNodeModulesRoot = path.join(
  desktopRoot,
  'out',
  'Codex-linux-x64',
  'resources',
  'app.asar.unpacked',
  'node_modules',
);
const preloadPatchPattern = /sendMessageFromView:async t=>\{await e\.ipcRenderer\.invoke\(([\w$]+),t\)\}/;
const preloadPatchReplacement =
  'sendMessageFromView:async t=>{try{await e.ipcRenderer.invoke($1,t)}catch(n){if(String(n?.message??n).includes(`No handler registered`)){setTimeout(()=>{e.ipcRenderer.invoke($1,t).catch(()=>{})},250);return}throw n}}';
const preloadPatchMarker = 'No handler registered';
const bootstrapPatchPattern =
  /([\w$]+)\.captureException\(([\w$]+),\{tags:\{phase:`bootstrap-import-main`\}\}\),await ([\w$]+)\(\2\)/;
const bootstrapPatchReplacement =
  'console.error($2?.stack??$2),$1.captureException($2,{tags:{phase:`bootstrap-import-main`}}),await $3($2)';
const bootstrapPatchMarker = 'console.error(';
const workerHandleRequestPatchTarget =
  'let a;try{switch(e.method){case`stable-metadata`:a=await this.handleResolveStableMetadata(e.params,{appServerClient:r});break;';
const workerHandleRequestPatchReplacement =
  'let a;try{e.method!==`stable-metadata`&&this.shouldWatchForMethod(e.method)&&await this.ensureWatchingForRequest(e.params,r);switch(e.method){case`stable-metadata`:a=await this.handleResolveStableMetadata(e.params,{appServerClient:r});break;';
const workerHandleResolvePatchTarget =
  'async handleResolveStableMetadata(e,{appServerClient:t}){let n=await this.gitManager.getStableMetadata(e.cwd,t);if(!n)return HL(`Not a git repository`);let r={commonDir:n.commonDir,root:n.root};return await this.ensureWatching(r,t),Y(r)}';
const workerHandleResolvePatchReplacement =
  'async handleResolveStableMetadata(e,{appServerClient:t}){let n=await this.gitManager.getStableMetadata(e.cwd,t);if(!n)return HL(`Not a git repository`);let r={commonDir:n.commonDir,root:n.root};return Y(r)}';
const workerWatchMethodsPatchTarget =
  'return a.success?Y({worktreeGitRoot:a.worktreeGitRoot,worktreeWorkspaceRoot:a.worktreeWorkspaceRoot}):HL(a.error.message)}getWatchKey(e,t){';
const workerWatchMethodsPatchReplacement =
  'return a.success?Y({worktreeGitRoot:a.worktreeGitRoot,worktreeWorkspaceRoot:a.worktreeWorkspaceRoot}):HL(a.error.message)}shouldWatchForMethod(e){switch(e){case`current-branch`:case`upstream-branch`:case`branch-ahead-count`:case`default-branch`:case`base-branch`:case`recent-branches`:case`branch-changes`:case`status-summary`:case`staged-and-unstaged-changes`:case`untracked-changes`:case`synced-branch`:case`synced-branch-state`:case`tracked-uncommitted-changes`:case`submodule-paths`:case`index-info`:return!0;default:return!1}}async ensureWatchingForRequest(e,t){let n=typeof e.cwd==`string`?await this.gitManager.getStableMetadata(e.cwd,t):typeof e.root==`string`?await this.gitManager.getStableMetadata(e.root,t):null;if(!n)return;await this.ensureWatching({commonDir:n.commonDir,root:n.root},t)}getWatchKey(e,t){';
const mainGitOriginsPatchTarget =
  'let i=(n!=null&&n!==this.hostConfig.id?this.getAppServerClientForHostIdOrThrow(n):this.appServerClient).hostConfig,a=e.fn(i),o=ir(t??[],a).map(t=>e.$n(t)),s=z((0,r.homedir)(),a),c=G(this.globalState),l=W(this.globalState),u=c.length>0?c:l??[],d=o&&o.length>0?o:(u??[]).map(t=>e.$n(t)),{origins:f}=await this.requestGitWorker({method:`git-origins`,params:{dirs:d,hostConfig:i,windowHostId:this.hostConfig.id}});';
const mainGitOriginsPatchReplacement =
  'let i=(n!=null&&n!==this.hostConfig.id?this.getAppServerClientForHostIdOrThrow(n):this.appServerClient).hostConfig,a=e.fn(i),o=ir(t??[],a).map(t=>e.$n(t)),s=z((0,r.homedir)(),a),c=G(this.globalState),l=W(this.globalState),u=c.length>0?c:l??[],d=(o&&o.length>0?o:(u??[]).map(t=>e.$n(t))).filter(t=>{try{return!!t&&a.existsSync(t)}catch{return!1}}),{origins:f}=await this.requestGitWorker({method:`git-origins`,params:{dirs:d,hostConfig:i,windowHostId:this.hostConfig.id}});';
const appServerSteerPatchTarget =
  'try{let r=await hh(e,t);e.setPendingSteerTurnId(t,c.id,r);try{return await ph(e,t,n.input,r)}catch(r){let i=mh(r);if(i==null)throw r;return e.updateConversationState(t,e=>{let t=(0,$.default)(e.turns);t?.status===`inProgress`&&(t.turnId=i)}),e.setPendingSteerTurnId(t,c.id,i),await ph(e,t,n.input,i)}}catch(n){throw e.removePendingSteer(t,c.id),i.error(`Error submitting steering turn for conversation`,{safe:{conversationId:t},sensitive:{error:n}}),n}}';
const appServerSteerPatchReplacement =
  'try{let r=await hh(e,t);return e.setPendingSteerTurnId(t,c.id,r),await ph(e,t,n.input,r)}catch(r){if(e.removePendingSteer(t,c.id),dh(r))return await mm(e,t,{input:n.input,attachments:n.attachments??[]});throw i.error(`Error submitting steering turn for conversation`,{safe:{conversationId:t},sensitive:{error:r}}),r}}';
const appServerStaleTurnPatchTarget =
  'function dh(e){return e instanceof Error&&e.name===sh||ye(e).includes(sh)}';
const appServerStaleTurnPatchReplacement =
  'function dh(e){return e instanceof Error?e.name===sh||e.message.includes(sh):ye(e).includes(sh)}';
const appServerHookUnknownConversationPatchTarget =
  'if(!this.conversations.has(a)){i.error(`Received ${n.method} for unknown conversation`,{safe:{conversationId:a}});break}n.method===`hook/started`&&this.markConversationStreaming(a),this.updateTurnState(a,t,e=>{eg(e.items,r)},!0,n.method===`hook/started`?{rebindLatestInProgressPlaceholder:!0}:void 0);break';
const appServerHookUnknownConversationPatchReplacement =
  'if(!this.conversations.has(a))break;n.method===`hook/started`&&this.markConversationStreaming(a),this.updateTurnState(a,t,e=>{eg(e.items,r)},!0,n.method===`hook/started`?{rebindLatestInProgressPlaceholder:!0}:void 0);break';
const appServerItemStartedPatchTarget =
  'if(!this.conversations.get(a)){i.error(`Received item/started for unknown conversation`,{safe:{conversationId:a},sensitive:{}});break}this.markConversationStreaming(a),this.updateConversationState(a,t=>{';
const appServerItemStartedPatchReplacement =
  'if(!this.conversations.get(a))break;this.markConversationStreaming(a),this.updateConversationState(a,t=>{';
const appServerItemCompletedPatchTarget =
  'if(!this.conversations.get(a)){i.error(`Received item/completed for unknown conversation`,{safe:{conversationId:a},sensitive:{}});break}this.updateConversationState(a,t=>{';
const appServerItemCompletedPatchReplacement =
  'if(!this.conversations.get(a))break;this.updateConversationState(a,t=>{';
const appServerTurnCompletedPatchTarget =
  'if(!this.conversations.get(r)){i.error(`Received turn/completed for unknown conversation`,{safe:{conversationId:r},sensitive:{}});break}let a=null,o=null,s=null;';
const appServerTurnCompletedPatchReplacement =
  'if(!this.conversations.get(r))break;let a=null,o=null,s=null;';

function buildMissingPatchTargetError(label, sourcePath) {
  return new Error(`${label} patch target not found in ${sourcePath}`);
}

export function applyStringPatch(source, target, replacement, label, sourcePath) {
  if (source.includes(replacement)) {
    return {
      patched: false,
      skipped: true,
      reason: `${label} replacement already present`,
    };
  }

  if (!source.includes(target)) {
    throw buildMissingPatchTargetError(label, sourcePath);
  }

  return {
    patched: true,
    skipped: false,
    source: source.replace(target, replacement),
  };
}

export function applyRegexPatch(source, pattern, replacement, label, sourcePath, marker) {
  if (marker && source.includes(marker)) {
    return {
      patched: false,
      skipped: true,
      reason: `${label} replacement already present`,
    };
  }

  pattern.lastIndex = 0;
  if (!pattern.test(source)) {
    throw buildMissingPatchTargetError(label, sourcePath);
  }

  pattern.lastIndex = 0;
  return {
    patched: true,
    skipped: false,
    source: source.replace(pattern, replacement),
  };
}

function parseOutputRoot(argv) {
  const outputIndex = argv.findIndex((arg) => arg === '--output');
  if (outputIndex === -1) {
    return defaultAssembleOutputRoot;
  }

  const value = argv[outputIndex + 1];
  if (!value) {
    throw new Error('Missing value for --output');
  }

  return path.resolve(process.cwd(), value);
}

function assertExists(targetPath, label) {
  if (!fs.existsSync(targetPath)) {
    throw new Error(`${label} is missing: ${targetPath}`);
  }
}

export function isGitLfsPointerText(source) {
  return source.startsWith(gitLfsPointerPrefix);
}

export function isGitLfsPointerFile(filePath) {
  const fileDescriptor = fs.openSync(filePath, 'r');

  try {
    const buffer = Buffer.alloc(256);
    const bytesRead = fs.readSync(fileDescriptor, buffer, 0, buffer.length, 0);
    return isGitLfsPointerText(buffer.subarray(0, bytesRead).toString('utf8'));
  } finally {
    fs.closeSync(fileDescriptor);
  }
}

function getRepoRelativePath(filePath) {
  const relativePath = path.relative(repoRoot, filePath);
  if (
    relativePath === '' ||
    relativePath.startsWith('..') ||
    path.isAbsolute(relativePath)
  ) {
    return null;
  }

  return relativePath.split(path.sep).join('/');
}

function tryHydrateGitLfsPath(filePath) {
  const repoRelativePath = getRepoRelativePath(filePath);
  if (!repoRelativePath) {
    return;
  }

  const commands = [
    ['lfs', 'checkout', '--', repoRelativePath],
    ['lfs', 'pull', '--include', repoRelativePath, '--exclude', ''],
  ];

  for (const args of commands) {
    if (!isGitLfsPointerFile(filePath)) {
      return;
    }

    try {
      childProcess.execFileSync('git', args, {
        cwd: repoRoot,
        stdio: 'pipe',
      });
    } catch {
      // Keep the original pointer-detection failure as the actionable error below.
    }
  }
}

export function ensureHydratedFile(filePath, label, options = {}) {
  assertExists(filePath, label);

  if (!isGitLfsPointerFile(filePath)) {
    return;
  }

  const hydrate = options.hydrate ?? tryHydrateGitLfsPath;
  hydrate(filePath);

  if (!isGitLfsPointerFile(filePath)) {
    return;
  }

  const repoRelativePath = getRepoRelativePath(filePath);
  const lfsHint = repoRelativePath
    ? ` Run "git lfs pull --include=\\"${repoRelativePath}\\"" before packaging.`
    : '';
  throw new Error(`${label} is still a Git LFS pointer: ${filePath}.${lfsHint}`);
}

function copyRequired(sourcePath, destinationPath, label = 'Required codex asset') {
  ensureHydratedFile(sourcePath, label);
  fs.mkdirSync(path.dirname(destinationPath), { recursive: true });
  fs.copyFileSync(sourcePath, destinationPath);
  fs.chmodSync(destinationPath, fs.statSync(sourcePath).mode);
}

function copyOptional(sourcePath, destinationPath) {
  if (!fs.existsSync(sourcePath)) {
    return;
  }

  fs.mkdirSync(path.dirname(destinationPath), { recursive: true });
  fs.copyFileSync(sourcePath, destinationPath);
  fs.chmodSync(destinationPath, fs.statSync(sourcePath).mode);
}

function sha256(filePath) {
  const bytes = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(bytes).digest('hex');
}

function describeManifestResourceEntry(resourcesRoot, entry) {
  const fullPath = path.join(resourcesRoot, entry);
  const stat = fs.lstatSync(fullPath);

  if (stat.isDirectory()) {
    return {
      name: entry,
      type: 'directory',
      sha256: null,
      entryCount: fs.readdirSync(fullPath).length,
    };
  }

  return {
    name: entry,
    type: 'file',
    sha256: sha256(fullPath),
    sizeBytes: stat.size,
  };
}

function runAsar(args) {
  childProcess.execFileSync('npx', ['--yes', 'asar', ...args], {
    cwd: repoRoot,
    stdio: 'pipe',
  });
}

export function applyPatchesToFile(filePath, patches) {
  assertExists(filePath, 'Patched extracted asset');

  let source = fs.readFileSync(filePath, 'utf8');
  const results = [];
  let didPatch = false;

  for (const patch of patches) {
    const patchResult =
      patch.type === 'regex'
        ? applyRegexPatch(
            source,
            patch.pattern,
            patch.replacement,
            patch.label,
            filePath,
            patch.marker,
          )
        : applyStringPatch(source, patch.target, patch.replacement, patch.label, filePath);
    results.push({
      label: patch.label,
      patched: patchResult.patched,
      skipped: patchResult.skipped,
      reason: patchResult.reason ?? null,
    });
    if (patchResult.patched && patchResult.source) {
      source = patchResult.source;
      didPatch = true;
    }
  }

  if (didPatch) {
    fs.writeFileSync(filePath, source, 'utf8');
  }

  return results;
}

function findExtractedWebviewAsset(extractedAppRoot, prefix, extension = '.js') {
  const assetsRoot = path.join(extractedAppRoot, 'webview', 'assets');
  assertExists(assetsRoot, 'Extracted codex webview assets root');

  const matches = fs
    .readdirSync(assetsRoot)
    .filter((entry) => entry.startsWith(prefix) && entry.endsWith(extension))
    .sort();

  if (matches.length === 0) {
    throw new Error(
      `Missing extracted webview asset with prefix "${prefix}" and extension "${extension}" in ${assetsRoot}`,
    );
  }

  return path.join(assetsRoot, matches[0]);
}

function summarizePatchResults(results) {
  return {
    patched: results.some((result) => result.patched),
    results,
  };
}

function patchCodexPreload(extractedAppRoot) {
  const preloadPath = path.join(extractedAppRoot, '.vite', 'build', 'preload.js');
  return summarizePatchResults(
    applyPatchesToFile(preloadPath, [
      {
        type: 'regex',
        pattern: preloadPatchPattern,
        replacement: preloadPatchReplacement,
        marker: preloadPatchMarker,
        label: 'preload ipc retry guard',
      },
    ]),
  );
}

function patchCodexBootstrap(extractedAppRoot) {
  const bootstrapPath = path.join(extractedAppRoot, '.vite', 'build', 'bootstrap.js');
  return summarizePatchResults(
    applyPatchesToFile(bootstrapPath, [
      {
        type: 'regex',
        pattern: bootstrapPatchPattern,
        replacement: bootstrapPatchReplacement,
        marker: bootstrapPatchMarker,
        label: 'bootstrap startup stack logging',
      },
    ]),
  );
}

function patchCodexGitWorker(extractedAppRoot) {
  const workerPath = path.join(extractedAppRoot, '.vite', 'build', 'worker.js');
  return summarizePatchResults(
    applyPatchesToFile(workerPath, [
      {
        label: 'git worker watch gating',
        target: workerHandleRequestPatchTarget,
        replacement: workerHandleRequestPatchReplacement,
      },
      {
        label: 'stable metadata watch bypass',
        target: workerHandleResolvePatchTarget,
        replacement: workerHandleResolvePatchReplacement,
      },
      {
        label: 'git worker watch helpers',
        target: workerWatchMethodsPatchTarget,
        replacement: workerWatchMethodsPatchReplacement,
      },
    ]),
  );
}

function patchCodexMainProcessBundle(extractedAppRoot) {
  const buildRoot = path.join(extractedAppRoot, '.vite', 'build');
  const matches = fs
    .readdirSync(buildRoot)
    .filter((entry) => entry.startsWith('main-') && entry.endsWith('.js'))
    .sort();

  if (matches.length === 0) {
    throw new Error(`Missing extracted codex main process bundle in ${buildRoot}`);
  }

  const mainPath = path.join(buildRoot, matches[0]);

  return summarizePatchResults(
    applyPatchesToFile(mainPath, [
      {
        label: 'git origins existing-path filter',
        target: mainGitOriginsPatchTarget,
        replacement: mainGitOriginsPatchReplacement,
      },
    ]),
  );
}

function patchCodexAppServerHooks(extractedAppRoot) {
  const appServerHooksPath = findExtractedWebviewAsset(extractedAppRoot, 'app-server-manager-hooks-');
  return summarizePatchResults(
    applyPatchesToFile(appServerHooksPath, [
      {
        label: 'stale steer fallback start turn',
        target: appServerSteerPatchTarget,
        replacement: appServerSteerPatchReplacement,
      },
      {
        label: 'stale steer error detector',
        target: appServerStaleTurnPatchTarget,
        replacement: appServerStaleTurnPatchReplacement,
      },
      {
        label: 'unknown hook event guard',
        target: appServerHookUnknownConversationPatchTarget,
        replacement: appServerHookUnknownConversationPatchReplacement,
      },
      {
        label: 'unknown item started guard',
        target: appServerItemStartedPatchTarget,
        replacement: appServerItemStartedPatchReplacement,
      },
      {
        label: 'unknown item completed guard',
        target: appServerItemCompletedPatchTarget,
        replacement: appServerItemCompletedPatchReplacement,
      },
      {
        label: 'unknown turn completed guard',
        target: appServerTurnCompletedPatchTarget,
        replacement: appServerTurnCompletedPatchReplacement,
      },
    ]),
  );
}

export function patchExtractedCodexApp(extractedAppRoot) {
  return {
    preload: patchCodexPreload(extractedAppRoot),
    bootstrap: patchCodexBootstrap(extractedAppRoot),
    mainProcess: patchCodexMainProcessBundle(extractedAppRoot),
    gitWorker: patchCodexGitWorker(extractedAppRoot),
    appServerHooks: patchCodexAppServerHooks(extractedAppRoot),
  };
}

function normalizeNativeModules(extractedAppRoot) {
  const nativeMappings = [
    {
      from: path.join(
        currentLinuxUnpackedNodeModulesRoot,
        'better-sqlite3',
        'build',
        'Release',
        'better_sqlite3.node',
      ),
      to: path.join(
        extractedAppRoot,
        'node_modules',
        'better-sqlite3',
        'build',
        'Release',
        'better_sqlite3.node',
      ),
    },
    {
      from: path.join(
        currentLinuxUnpackedNodeModulesRoot,
        'node-pty',
        'build',
        'Release',
        'pty.node',
      ),
      to: path.join(
        extractedAppRoot,
        'node_modules',
        'node-pty',
        'build',
        'Release',
        'pty.node',
      ),
    },
    {
      from: path.join(
        currentLinuxUnpackedNodeModulesRoot,
        'node-pty',
        'build',
        'Release',
        'obj.target',
        'pty.node',
      ),
      to: path.join(
        extractedAppRoot,
        'node_modules',
        'node-pty',
        'build',
        'Release',
        'obj.target',
        'pty.node',
      ),
    },
    {
      from: path.join(
        currentLinuxUnpackedNodeModulesRoot,
        'node-pty',
        'bin',
        'linux-x64-143',
        'node-pty.node',
      ),
      to: path.join(
        extractedAppRoot,
        'node_modules',
        'node-pty',
        'bin',
        'linux-x64-143',
        'node-pty.node',
      ),
    },
  ];

  for (const mapping of nativeMappings) {
    assertExists(mapping.from, `Current Linux native module`);
    fs.mkdirSync(path.dirname(mapping.to), { recursive: true });
    fs.copyFileSync(mapping.from, mapping.to);
  }
}

export function assembleCodexRuntime({ outputRoot }) {
  assertExists(codexResourcesRoot, 'Codex resources root');
  assertExists(currentLinuxUnpackedNodeModulesRoot, 'Current Linux unpacked node_modules root');

  if (fs.existsSync(outputRoot)) {
    throw new Error(
      `Refusing to overwrite existing assembled runtime root: ${outputRoot}\n` +
      'Use a different --output path.',
    );
  }

  const resourcesRoot = path.join(outputRoot, 'resources');
  fs.mkdirSync(resourcesRoot, { recursive: true });

  const extractedAppRoot = path.join(outputRoot, 'app.asar.extracted');
  runAsar(['extract', path.join(codexResourcesRoot, 'app.asar'), extractedAppRoot]);
  const patchSummary = patchExtractedCodexApp(extractedAppRoot);
  normalizeNativeModules(extractedAppRoot);
  runAsar([
    'pack',
    extractedAppRoot,
    path.join(resourcesRoot, 'app.asar'),
    '--unpack',
    '*.node',
  ]);

  const requiredResources = ['codex', 'rg'];
  for (const resourceName of requiredResources) {
    copyRequired(
      path.join(codexResourcesRoot, resourceName),
      path.join(resourcesRoot, resourceName),
      `Required codex resource "${resourceName}"`,
    );
  }

  const optionalResources = ['notification.wav', 'THIRD_PARTY_NOTICES.txt'];
  for (const resourceName of optionalResources) {
    copyOptional(
      path.join(codexResourcesRoot, resourceName),
      path.join(resourcesRoot, resourceName),
    );
  }

  const copiedFiles = fs
    .readdirSync(resourcesRoot)
    .sort()
    .map((entry) => describeManifestResourceEntry(resourcesRoot, entry));

  const manifest = {
    assembledFrom: codexResourcesRoot,
    outputRoot,
    resourcesRoot,
    patchSummary,
    copiedFiles,
  };

  const manifestPath = path.join(outputRoot, 'manifest.json');
  fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');

  return {
    ...manifest,
    manifestPath,
  };
}

function main() {
  const outputRoot = parseOutputRoot(process.argv.slice(2));
  const summary = assembleCodexRuntime({ outputRoot });
  process.stdout.write(`${JSON.stringify(summary, null, 2)}\n`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  main();
}
