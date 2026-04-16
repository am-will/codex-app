import crypto from 'node:crypto';
import childProcess from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import asar from '@electron/asar';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const desktopRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(desktopRoot, '..');
const gitLfsPointerPrefix = 'version https://git-lfs.github.com/spec/v1';

const codexResourcesRoot = path.join(repoRoot, 'codex', 'app', 'resources');
const recoveredExtractedAppRoot = path.join(
  desktopRoot,
  'recovered',
  'app-asar-extracted',
);
const linuxHelperResourcesRoot = path.join(desktopRoot, 'resources', 'bin', 'linux-x64');
const defaultAssembleOutputRoot = path.join(desktopRoot, 'tmp', 'codex-runtime');
const currentLinuxNodeModulesRoot = path.join(desktopRoot, 'node_modules');
const currentLinuxUnpackedNodeModulesRoot = path.join(
  desktopRoot,
  'out',
  'Codex-linux-x64',
  'resources',
  'app.asar.unpacked',
  'node_modules',
);
const linuxBrowserLauncherSourcePath = path.join(
  desktopRoot,
  'scripts',
  'linux-browser-launch.js',
);
const preloadPatchPattern =
  /sendMessageFromView:async t=>\{(.*?),await e\.ipcRenderer\.invoke\(([\w$]+),t\)\}/;
const preloadPatchReplacement =
  'sendMessageFromView:async t=>{$1;try{await e.ipcRenderer.invoke($2,t)}catch(n){if(String(n?.message??n).includes(`No handler registered`)){setTimeout(()=>{e.ipcRenderer.invoke($2,t).catch(()=>{})},250);return}throw n}}';
const preloadPatchMarker = ';try{await e.ipcRenderer.invoke(';
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
const mainGitOriginsPatchAlternatives = [
  {
    target:
      'let i=(r!=null&&r!==this.hostConfig.id?this.getAppServerClientForHostIdOrThrow(r):this.appServerClient).hostConfig,a=e.Rn(i),o=C(t??[],a).map(t=>e.Ar(t)),s=y((0,n.homedir)(),a),c=B(this.globalState),l=z(this.globalState),u=c.length>0?c:l??[],d=o&&o.length>0?o:u.filter(e=>e!==`~`).map(t=>e.Ar(t)),{origins:f}=await this.requestGitWorker({method:`git-origins`,params:{dirs:d,hostConfig:i,windowHostId:this.hostConfig.id}});',
    replacement:
      'let i=(r!=null&&r!==this.hostConfig.id?this.getAppServerClientForHostIdOrThrow(r):this.appServerClient).hostConfig,a=e.Rn(i),o=C(t??[],a).map(t=>e.Ar(t)),s=y((0,n.homedir)(),a),c=B(this.globalState),l=z(this.globalState),u=c.length>0?c:l??[],d=(o&&o.length>0?o:u.filter(e=>e!==`~`).map(t=>e.Ar(t))).filter(t=>{try{return!!t&&a.existsSync(t)}catch{return!1}}),{origins:f}=await this.requestGitWorker({method:`git-origins`,params:{dirs:d,hostConfig:i,windowHostId:this.hostConfig.id}});',
  },
  {
    target:
      'let i=(r!=null&&r!==this.hostConfig.id?this.getAppServerClientForHostIdOrThrow(r):this.appServerClient).hostConfig,a=e.lr(i),o=C(t??[],a).map(t=>e.Qr(t)),s=y((0,n.homedir)(),a),c=B(this.globalState),l=z(this.globalState),u=c.length>0?c:l??[],d=o&&o.length>0?o:u.filter(e=>e!==`~`).map(t=>e.Qr(t)),{origins:f}=await this.requestGitWorker({method:`git-origins`,params:{dirs:d,hostConfig:i,windowHostId:this.hostConfig.id}});',
    replacement:
      'let i=(r!=null&&r!==this.hostConfig.id?this.getAppServerClientForHostIdOrThrow(r):this.appServerClient).hostConfig,a=e.lr(i),o=C(t??[],a).map(t=>e.Qr(t)),s=y((0,n.homedir)(),a),c=B(this.globalState),l=z(this.globalState),u=c.length>0?c:l??[],d=(o&&o.length>0?o:u.filter(e=>e!==`~`).map(t=>e.Qr(t))).filter(t=>{try{return!!t&&a.existsSync(t)}catch{return!1}}),{origins:f}=await this.requestGitWorker({method:`git-origins`,params:{dirs:d,hostConfig:i,windowHostId:this.hostConfig.id}});',
  },
];
const mainGitOriginsPatchMarker =
  '.filter(t=>{try{return!!t&&a.existsSync(t)}catch{return!1}}),{origins:f}';
const mainOpenInBrowserPatchAlternatives = [
  {
    target:
      'case`open-in-browser`:{let{url:e}=r;if(r.useExternalBrowser===!0){if(typeof e==`string`&&jr(e))try{await t.shell.openExternal(e)}catch(e){Y().error(`Open-in-browser failed`,{safe:{},sensitive:{error:e}})}else Y().warning(`Open-in-browser received invalid url`);break}if(typeof e==`string`&&Pu(e))try{if(Ar({browserPaneEnabled:te().browserPane,link:{type:`url`,url:e}})){n.send(W,{open:!0,type:`toggle-browser-panel`,url:e});break}await t.shell.openExternal(e)}catch(e){Y().error(`Open-in-browser failed`,{safe:{},sensitive:{error:e}})}else Y().warning(`Open-in-browser received invalid url`);break}',
    replacement:
      'case`open-in-browser`:{let{url:e}=r;if(r.useExternalBrowser===!0){if(typeof e==`string`&&jr(e))try{if(process.platform===`linux`){let r=require(`../../../../scripts/linux-browser-launch.js`),i=await r.openUrlWithLinuxBrowserSession(e);if(!i.launched){i.error&&Y().warning(`Linux browser session launch failed; falling back to shell.openExternal`,{safe:{code:i.code??null},sensitive:{error:i.error}}),await t.shell.openExternal(e)}}else await t.shell.openExternal(e)}catch(e){Y().error(`Open-in-browser failed`,{safe:{},sensitive:{error:e}})}else Y().warning(`Open-in-browser received invalid url`);break}if(typeof e==`string`&&Pu(e))try{if(Ar({browserPaneEnabled:te().browserPane,link:{type:`url`,url:e}})){n.send(W,{open:!0,type:`toggle-browser-panel`,url:e});break}await t.shell.openExternal(e)}catch(e){Y().error(`Open-in-browser failed`,{safe:{},sensitive:{error:e}})}else Y().warning(`Open-in-browser received invalid url`);break}',
  },
  {
    target:
      'case`open-in-browser`:{let{url:e}=r;if(r.useExternalBrowser===!0){if(typeof e==`string`&&_i(e))try{await t.shell.openExternal(e)}catch(e){Y().error(`Open-in-browser failed`,{safe:{},sensitive:{error:e}})}else Y().warning(`Open-in-browser received invalid url`);break}if(typeof e==`string`&&Rp(e))try{if(gi({browserPaneEnabled:P().browserPane,link:{type:`url`,url:e}})){n.send(W,{open:!0,type:`toggle-browser-panel`,url:e});break}await t.shell.openExternal(e)}catch(e){Y().error(`Open-in-browser failed`,{safe:{},sensitive:{error:e}})}else Y().warning(`Open-in-browser received invalid url`);break}',
    replacement:
      'case`open-in-browser`:{let{url:e}=r;if(r.useExternalBrowser===!0){if(typeof e==`string`&&_i(e))try{if(process.platform===`linux`){let r=require(`../../../../scripts/linux-browser-launch.js`),i=await r.openUrlWithLinuxBrowserSession(e);if(!i.launched){i.error&&Y().warning(`Linux browser session launch failed; falling back to shell.openExternal`,{safe:{code:i.code??null},sensitive:{error:i.error}}),await t.shell.openExternal(e)}}else await t.shell.openExternal(e)}catch(e){Y().error(`Open-in-browser failed`,{safe:{},sensitive:{error:e}})}else Y().warning(`Open-in-browser received invalid url`);break}if(typeof e==`string`&&Rp(e))try{if(gi({browserPaneEnabled:P().browserPane,link:{type:`url`,url:e}})){n.send(W,{open:!0,type:`toggle-browser-panel`,url:e});break}await t.shell.openExternal(e)}catch(e){Y().error(`Open-in-browser failed`,{safe:{},sensitive:{error:e}})}else Y().warning(`Open-in-browser received invalid url`);break}',
  },
];
const mainOpenInBrowserPatchMarker = 'openUrlWithLinuxBrowserSession';
const mainLinuxOpaqueWindowPatchAlternatives = [
  {
    target:
      'function Zh({platform:e,appearance:t,opaqueWindowsEnabled:n,prefersDarkColors:r}){return e===`win32`&&!Yh(t)?n?{backgroundColor:r?jh:Mh,backgroundMaterial:`none`}:{backgroundColor:Ah,backgroundMaterial:`mica`}:{backgroundColor:Ah,backgroundMaterial:null}}',
    replacement:
      'function Zh({platform:e,appearance:t,opaqueWindowsEnabled:n,prefersDarkColors:r}){if(e===`win32`&&!Yh(t))return n?{backgroundColor:r?jh:Mh,backgroundMaterial:`none`}:{backgroundColor:Ah,backgroundMaterial:`mica`};if(e===`linux`&&!Yh(t))return{backgroundColor:r?jh:Mh,backgroundMaterial:null};return{backgroundColor:Ah,backgroundMaterial:null}}',
  },
  {
    target:
      'function _y({platform:e,appearance:t,opaqueWindowsEnabled:n,prefersDarkColors:r}){return e===`win32`&&!my(t)?n?{backgroundColor:r?Xv:Zv,backgroundMaterial:`none`}:{backgroundColor:Yv,backgroundMaterial:`mica`}:{backgroundColor:Yv,backgroundMaterial:null}}',
    replacement:
      'function _y({platform:e,appearance:t,opaqueWindowsEnabled:n,prefersDarkColors:r}){if(e===`win32`&&!my(t))return n?{backgroundColor:r?Xv:Zv,backgroundMaterial:`none`}:{backgroundColor:Yv,backgroundMaterial:`mica`};if(e===`linux`&&!my(t))return{backgroundColor:r?Xv:Zv,backgroundMaterial:null};return{backgroundColor:Yv,backgroundMaterial:null}}',
  },
];
const mainLinuxOpaqueWindowPatchMarker = 'backgroundMaterial:`mica`};if(e===`linux`&&';
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
const webviewChatGptLoginPatchAlternatives = [
  {
    target:
      'let{authUrl:r,completion:i}=await b.loginWithChatGpt(t);r&&E.dispatchMessage(`open-in-browser`,{url:r});let a=await i;',
    replacement:
      'let{authUrl:r,completion:i}=await b.loginWithChatGpt(t);r&&E.dispatchMessage(`open-in-browser`,{url:r,useExternalBrowser:!0});let a=await i;',
  },
  {
    target:
      'let{authUrl:r,completion:i}=await ci(`login-with-chatgpt`,{abortController:e});r&&E.dispatchMessage(`open-in-browser`,{url:r});let a=await i;',
    replacement:
      'let{authUrl:r,completion:i}=await ci(`login-with-chatgpt`,{abortController:e});r&&E.dispatchMessage(`open-in-browser`,{url:r,useExternalBrowser:!0});let a=await i;',
  },
  {
    target:
      'a(t=>t?.abortController===e?{...t,verificationUrl:r,userCode:i}:t),E.dispatchMessage(`open-in-browser`,{url:r});let s=await o;',
    replacement:
      'a(t=>t?.abortController===e?{...t,verificationUrl:r,userCode:i}:t),E.dispatchMessage(`open-in-browser`,{url:r,useExternalBrowser:!0});let s=await o;',
  },
];
const webviewChatGptLoginPatchMarker = 'useExternalBrowser:!0';
const remoteChatGptLoginPatchAlternatives = [
  {
    target:
      'let{authUrl:n,completion:a}=await c.loginWithChatGpt(t);i.dispatchMessage(`open-in-browser`,{url:n});let o=await a;',
    replacement:
      'let{authUrl:n,completion:a}=await c.loginWithChatGpt(t);i.dispatchMessage(`open-in-browser`,{url:n,useExternalBrowser:!0});let o=await a;',
  },
  {
    target:
      'let{authUrl:n,completion:r}=await S(`login-with-chatgpt-for-host`,{abortController:t,hostId:e});i.dispatchMessage(`open-in-browser`,{url:n});let o=await r;',
    replacement:
      'let{authUrl:n,completion:r}=await S(`login-with-chatgpt-for-host`,{abortController:t,hostId:e});i.dispatchMessage(`open-in-browser`,{url:n,useExternalBrowser:!0});let o=await r;',
  },
];
const remoteChatGptLoginPatchMarker = 'useExternalBrowser:!0';
const modelSettingsSavedConfigPatchTarget =
  'queryFn:async()=>{try{return await zt(r,e)}catch{return null}},queryKey:[...Ss,t,e],staleTime:W.FIVE_MINUTES';
const modelSettingsSavedConfigPatchReplacement =
  'queryFn:async()=>{try{return await zt(r,e)}catch{try{return await zt(r,null)}catch{return null}}},queryKey:[...Ss,t,e],staleTime:W.FIVE_MINUTES';
const modelSettingsPersistPatchTarget =
  'await on(`set-default-model-config-for-host`,{hostId:a,model:e,reasoningEffort:t,profile:d.profile}),await E()';
const modelSettingsPersistPatchReplacement =
  'let E=QCe(T),M=Y9(a).configPath,D;t[18]!==S||t[19]!==d.profile||t[20]!==a||t[21]!==c||t[22]!==o||t[23]!==b||t[24]!==E||t[25]!==r?(D=async(e,t)=>{try{if(await S(e,t),b){zn(r,`copilot-default-model`,e);return}if(h.info(`Setting default model and reasoning effort`,{safe:{newModel:e,newEffort:t,profile:d.profile}}),!o)return;let n=M,r=d.profile?`profiles.${d.profile}.`:`` ,i=[{keyPath:`${r}model`,value:e,mergeStrategy:`upsert`},{keyPath:`${r}model_reasoning_effort`,value:t,mergeStrategy:`upsert`}];await on(`batch-write-config-value`,{hostId:a,edits:i,filePath:n??null,expectedVersion:null}),await E()}catch(e){let t=e;h.error(`Failed to update model and reasoning effort`,{safe:{},sensitive:{error:t}});let n=r.get(bo),i=$Ce(c,t);Q9(t)?n.danger(i,{id:`composer.modelSettings.updateError`,description:(0,K.createElement)(`div`,{className:`mt-4`},(0,K.createElement)(RCe))}):n.danger(i,{id:`composer.modelSettings.updateError`})}},t[18]=S,t[19]=d.profile,t[20]=a,t[21]=c,t[22]=o,t[23]=b,t[24]=E,t[25]=r,t[26]=D):D=t[26]';
const modelSettingsPersistPatchMarker =
  'let E=QCe(T),M=Y9(a).configPath,D;';
const modelSettingsPersistPatchedTarget =
  'let E=QCe(T),D;t[18]!==S||t[19]!==d.profile||t[20]!==a||t[21]!==c||t[22]!==o||t[23]!==b||t[24]!==E||t[25]!==r?(D=async(e,t)=>{try{if(await S(e,t),b){zn(r,`copilot-default-model`,e);return}if(h.info(`Setting default model and reasoning effort`,{safe:{newModel:e,newEffort:t,profile:d.profile}}),!o)return;let n=Y9(a).configPath,r=d.profile?`profiles.${d.profile}.`:`` ,i=[{keyPath:`${r}model`,value:e,mergeStrategy:`upsert`},{keyPath:`${r}model_reasoning_effort`,value:t,mergeStrategy:`upsert`}];await on(`batch-write-config-value`,{hostId:a,edits:i,filePath:n??null,expectedVersion:null}),await E()}catch(e){let t=e;h.error(`Failed to update model and reasoning effort`,{safe:{},sensitive:{error:t}});let n=r.get(bo),i=$Ce(c,t);Q9(t)?n.danger(i,{id:`composer.modelSettings.updateError`,description:(0,K.createElement)(`div`,{className:`mt-4`},(0,K.createElement)(RCe))}):n.danger(i,{id:`composer.modelSettings.updateError`})}},t[18]=S,t[19]=d.profile,t[20]=a,t[21]=c,t[22]=o,t[23]=b,t[24]=E,t[25]=r,t[26]=D):D=t[26]';
const startupBackgroundPatchTarget = '--startup-background: transparent;';
const startupBackgroundPatchReplacement = '--startup-background: #121212;';
const startupLogoFadePatchTarget =
  'opacity: 0;\n        animation: startup-codex-logo-fade-in 180ms ease-out 60ms forwards;';
const startupLogoFadePatchReplacement =
  'opacity: 1;\n        animation: none;';
const startupLogoShimmerPatchTarget =
  'animation: startup-codex-logo-shimmer 2200ms cubic-bezier(0.4, 0, 0.2, 1)\n          infinite;';
const startupLogoShimmerPatchReplacement = 'animation: none;';
const startupLightThemeMarker = '@media (prefers-color-scheme: light)';
const startupLightThemePatchTarget =
  '      :root {\n        --startup-background: #121212;\n        --startup-logo-base: #adadad;\n        --startup-logo-shimmer-soft: rgb(255 255 255 / 0.02);\n        --startup-logo-shimmer-peak: rgb(255 255 255 / 0.46);\n        --startup-logo-shimmer-tail: rgb(255 255 255 / 0.06);\n      }\n';
const startupLightThemePatchReplacement =
  '      :root {\n        --startup-background: #121212;\n        --startup-logo-base: #adadad;\n        --startup-logo-shimmer-soft: rgb(255 255 255 / 0.02);\n        --startup-logo-shimmer-peak: rgb(255 255 255 / 0.46);\n        --startup-logo-shimmer-tail: rgb(255 255 255 / 0.06);\n      }\n\n      @media (prefers-color-scheme: light) {\n        :root {\n          --startup-background: #f5f5f5;\n          --startup-logo-base: #666;\n          --startup-logo-shimmer-soft: rgb(0 0 0 / 0.02);\n          --startup-logo-shimmer-peak: rgb(0 0 0 / 0.14);\n          --startup-logo-shimmer-tail: rgb(0 0 0 / 0.04);\n        }\n      }\n';
const startupKeyframesPatchTarget =
  '\n      @keyframes startup-codex-logo-fade-in {\n        0% {\n          opacity: 0;\n        }\n\n        100% {\n          opacity: 1;\n        }\n      }\n\n      @keyframes startup-codex-logo-shimmer {\n        0% {\n          background-position: 140% 0;\n        }\n\n        100% {\n          background-position: -120% 0;\n        }\n      }\n';
const startupKeyframesPatchReplacement = '\n';

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

export function applyAlternativeStringPatch(
  source,
  alternatives,
  label,
  sourcePath,
  marker,
) {
  if (marker && source.includes(marker)) {
    return {
      patched: false,
      skipped: true,
      reason: `${label} replacement already present`,
    };
  }

  const match = alternatives.find(({ target }) => source.includes(target));
  if (!match) {
    throw buildMissingPatchTargetError(label, sourcePath);
  }

  return {
    patched: true,
    skipped: false,
    source: source.replace(match.target, match.replacement),
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

function listLinuxNodePtyPrebuilds(sourceNodeModulesRoot) {
  const nodePtyBinRoot = path.join(sourceNodeModulesRoot, 'node-pty', 'bin');
  if (!fs.existsSync(nodePtyBinRoot)) {
    return [];
  }

  return fs
    .readdirSync(nodePtyBinRoot)
    .filter((entry) =>
      /^linux-x64-\d+$/.test(entry) &&
      fs.existsSync(path.join(nodePtyBinRoot, entry, 'node-pty.node')),
    )
    .sort();
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
        : patch.alternatives
          ? applyAlternativeStringPatch(
              source,
              patch.alternatives,
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
        alternatives: mainGitOriginsPatchAlternatives,
        marker: mainGitOriginsPatchMarker,
      },
      {
        label: 'linux auth browser session handoff',
        alternatives: mainOpenInBrowserPatchAlternatives,
        marker: mainOpenInBrowserPatchMarker,
      },
      {
        label: 'linux opaque primary window background',
        alternatives: mainLinuxOpaqueWindowPatchAlternatives,
        marker: mainLinuxOpaqueWindowPatchMarker,
      },
    ]),
  );
}

function patchCodexStartupShell(extractedAppRoot) {
  const startupShellPath = path.join(extractedAppRoot, 'webview', 'index.html');

  return summarizePatchResults(
    applyPatchesToFile(startupShellPath, [
      {
        label: 'startup shell opaque background',
        target: startupBackgroundPatchTarget,
        replacement: startupBackgroundPatchReplacement,
      },
      {
        label: 'startup shell light theme colors',
        target: startupLightThemePatchTarget,
        replacement: startupLightThemePatchReplacement,
      },
      {
        label: 'startup shell no logo fade',
        target: startupLogoFadePatchTarget,
        replacement: startupLogoFadePatchReplacement,
      },
      {
        label: 'startup shell no shimmer animation',
        target: startupLogoShimmerPatchTarget,
        replacement: startupLogoShimmerPatchReplacement,
      },
      {
        label: 'startup shell remove keyframes',
        target: startupKeyframesPatchTarget,
        replacement: startupKeyframesPatchReplacement,
      },
    ]),
  );
}

function patchCodexAuthWebviewBundles(extractedAppRoot) {
  const loginBundlePath = findExtractedWebviewAsset(extractedAppRoot, 'index-');
  const remoteConnectionsPath = findExtractedWebviewAsset(
    extractedAppRoot,
    'remote-connections-settings-',
  );

  return {
    login: summarizePatchResults(
      applyPatchesToFile(loginBundlePath, [
        {
          label: 'chatgpt login requests native external browser',
          alternatives: webviewChatGptLoginPatchAlternatives,
          marker: webviewChatGptLoginPatchMarker,
        },
      ]),
    ),
    remoteConnections: summarizePatchResults(
      applyPatchesToFile(remoteConnectionsPath, [
        {
          label: 'remote chatgpt login requests native external browser',
          alternatives: remoteChatGptLoginPatchAlternatives,
          marker: remoteChatGptLoginPatchMarker,
        },
      ]),
    ),
  };
}

function patchCodexModelSettingsBundle(extractedAppRoot) {
  const modelSettingsPath = findExtractedWebviewAsset(extractedAppRoot, 'use-model-settings-');

  return summarizePatchResults(
    applyPatchesToFile(modelSettingsPath, [
      {
        label: 'model settings saved-config cwd fallback',
        target: modelSettingsSavedConfigPatchTarget,
        replacement: modelSettingsSavedConfigPatchReplacement,
      },
      {
        label: 'model settings direct user config write',
        alternatives: [
          {
            target: modelSettingsPersistPatchTarget,
            replacement: modelSettingsPersistPatchReplacement,
          },
          {
            target: modelSettingsPersistPatchedTarget,
            replacement: modelSettingsPersistPatchReplacement,
          },
        ],
        marker: modelSettingsPersistPatchMarker,
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

function stageLinuxBrowserLauncher(extractedAppRoot) {
  const destinationPath = path.join(extractedAppRoot, 'scripts', 'linux-browser-launch.js');
  copyRequired(
    linuxBrowserLauncherSourcePath,
    destinationPath,
    'Linux browser session helper',
  );

  return {
    patched: true,
    results: [
      {
        label: 'linux browser session helper',
        patched: true,
        skipped: false,
        reason: null,
      },
    ],
  };
}

export function patchExtractedCodexApp(extractedAppRoot) {
  return {
    linuxBrowserLauncher: stageLinuxBrowserLauncher(extractedAppRoot),
    preload: patchCodexPreload(extractedAppRoot),
    bootstrap: patchCodexBootstrap(extractedAppRoot),
    mainProcess: patchCodexMainProcessBundle(extractedAppRoot),
    startupShell: patchCodexStartupShell(extractedAppRoot),
    authWebview: patchCodexAuthWebviewBundles(extractedAppRoot),
    modelSettings: patchCodexModelSettingsBundle(extractedAppRoot),
  };
}

export function resolveLinuxNativeModuleSourceRoot(preferredRoots = []) {
  const candidateRoots = [
    ...preferredRoots,
    currentLinuxNodeModulesRoot,
    currentLinuxUnpackedNodeModulesRoot,
  ]
    .filter(Boolean)
    .map((entry) => path.resolve(entry));

  for (const candidateRoot of candidateRoots) {
    const betterSqlitePath = path.join(
      candidateRoot,
      'better-sqlite3',
      'build',
      'Release',
      'better_sqlite3.node',
    );
    const nodePtyPath = path.join(candidateRoot, 'node-pty', 'build', 'Release', 'pty.node');
    if (fs.existsSync(betterSqlitePath) && fs.existsSync(nodePtyPath)) {
      return candidateRoot;
    }
  }

  throw new Error(
    `Could not locate rebuilt Linux native modules under any candidate root: ${candidateRoots.join(', ')}`,
  );
}

export function normalizeNativeModules(extractedAppRoot, options = {}) {
  const sourceNodeModulesRoot = resolveLinuxNativeModuleSourceRoot(
    options.preferredSourceRoots ??
      (options.sourceNodeModulesRoot ? [options.sourceNodeModulesRoot] : []),
  );
  const relativeFiles = [
    {
      relativePath: path.join(
        'better-sqlite3',
        'build',
        'Release',
        'better_sqlite3.node',
      ),
      required: true,
    },
    {
      relativePath: path.join('node-pty', 'build', 'Release', 'pty.node'),
      required: true,
    },
    {
      relativePath: path.join('node-pty', 'build', 'Release', 'obj.target', 'pty.node'),
      required: false,
    },
    ...listLinuxNodePtyPrebuilds(sourceNodeModulesRoot).map((abiDirectory) => ({
      relativePath: path.join('node-pty', 'bin', abiDirectory, 'node-pty.node'),
      required: true,
    })),
  ];
  const copiedFiles = [];

  for (const { relativePath, required } of relativeFiles) {
    const fromPath = path.join(sourceNodeModulesRoot, relativePath);
    if (!fs.existsSync(fromPath)) {
      if (required) {
        throw new Error(`Required Linux native module is missing: ${fromPath}`);
      }
      continue;
    }

    const destinationPath = path.join(extractedAppRoot, 'node_modules', relativePath);
    fs.mkdirSync(path.dirname(destinationPath), { recursive: true });
    fs.copyFileSync(fromPath, destinationPath);
    fs.chmodSync(destinationPath, fs.statSync(fromPath).mode);
    copiedFiles.push(relativePath.split(path.sep).join('/'));
  }

  return {
    sourceNodeModulesRoot,
    copiedFiles,
  };
}

export async function assembleCodexRuntime({ outputRoot }) {
  assertExists(recoveredExtractedAppRoot, 'Recovered extracted app root');
  assertExists(codexResourcesRoot, 'Codex resources root');
  assertExists(linuxHelperResourcesRoot, 'Linux helper resources root');

  if (fs.existsSync(outputRoot)) {
    throw new Error(
      `Refusing to overwrite existing assembled runtime root: ${outputRoot}\n` +
      'Use a different --output path.',
    );
  }

  const resourcesRoot = path.join(outputRoot, 'resources');
  fs.mkdirSync(resourcesRoot, { recursive: true });

  const extractedAppRoot = path.join(outputRoot, 'app.asar.extracted');
  fs.cpSync(recoveredExtractedAppRoot, extractedAppRoot, {
    recursive: true,
    preserveTimestamps: true,
  });
  const patchSummary = patchExtractedCodexApp(extractedAppRoot);
  const nativeModuleSummary = normalizeNativeModules(extractedAppRoot);
  await asar.createPackageWithOptions(extractedAppRoot, path.join(resourcesRoot, 'app.asar'), {
    unpack: '*.node',
  });

  const requiredResources = ['codex', 'rg'];
  for (const resourceName of requiredResources) {
    copyRequired(
      path.join(linuxHelperResourcesRoot, resourceName),
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
    assembledFrom: recoveredExtractedAppRoot,
    outputRoot,
    resourcesRoot,
    patchSummary,
    nativeModuleSummary,
    copiedFiles,
  };

  const manifestPath = path.join(outputRoot, 'manifest.json');
  fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');

  return {
    ...manifest,
    manifestPath,
  };
}

async function main() {
  const outputRoot = parseOutputRoot(process.argv.slice(2));
  const summary = await assembleCodexRuntime({ outputRoot });
  process.stdout.write(`${JSON.stringify(summary, null, 2)}\n`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  await main();
}
