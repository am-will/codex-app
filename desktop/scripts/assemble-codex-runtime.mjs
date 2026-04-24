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
  '(()=>{try{process.stderr?.writable&&console.error($2?.stack??$2)}catch{}})(),$1.captureException($2,{tags:{phase:`bootstrap-import-main`}}),await $3($2)';
const bootstrapPatchMarker = '(()=>{try{process.stderr?.writable&&console.error(';
const bootstrapLinuxGitWrapperAlternatives = [
  {
    target:
      'require(`node:crypto`);let r=require(`node:child_process`);var i=`desktop.intelLaunchWarning.message`,',
    replacement:
      'require(`node:crypto`);let r=require(`node:child_process`);if(process.platform===`linux`&&typeof process.resourcesPath==`string`){let e=process.env.PATH??``,t=process.resourcesPath;e.split(`:`).includes(t)||(process.env.PATH=e?`${t}:${e}`:t)}var i=`desktop.intelLaunchWarning.message`,',
  },
  {
    target:
      'require(`node:crypto`);let i=require(`node:child_process`);var a=`desktop.intelLaunchWarning.message`,',
    replacement:
      'require(`node:crypto`);let i=require(`node:child_process`);if(process.platform===`linux`&&typeof process.resourcesPath==`string`){let e=process.env.PATH??``,t=process.resourcesPath;e.split(`:`).includes(t)||(process.env.PATH=e?`${t}:${e}`:t)}var a=`desktop.intelLaunchWarning.message`,',
  },
];
const bootstrapLinuxGitWrapperMarker =
  'process.platform===`linux`&&typeof process.resourcesPath==`string`';
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
const workerApplyPatchNormalizeHeadersTarget =
  'function QX(e){let t=new Set,n=/^diff --git a\\/(.*?) b\\/(.*)$/gm,r;for(;(r=n.exec(e))!=null;){let[e,n,i]=r;n&&n!==`/dev/null`&&t.add(n),i&&i!==`/dev/null`&&t.add(i)}return Array.from(t)}async function $X(';
const workerApplyPatchNormalizeHeadersReplacement =
  'function QX(e){let t=new Set,n=/^diff --git a\\/(.*?) b\\/(.*)$/gm,r;for(;(r=n.exec(e))!=null;){let[e,n,i]=r;n&&n!==`/dev/null`&&t.add(n),i&&i!==`/dev/null`&&t.add(i)}return Array.from(t)}function normalizeApplyPatchDiffPaths(e,t){let n=e=>{let n=KX(t,t,e);if(n!==e)return n;if(!e.startsWith(`/`)){let n=`/${e}`,r=KX(t,t,n);if(r!==n)return r}return GX(e)},r=e=>{if(e===`/dev/null`)return e;let t=e.startsWith(`a/`)?`a/`:e.startsWith(`b/`)?`b/`:``;return`${t}${n(t?e.slice(2):e)}`};return e.replace(/^diff --git a\\/(.*?) b\\/(.*?)$/gm,(e,t,n)=>`diff --git ${r(`a/${t}`)} ${r(`b/${n}`)}`).replace(/^(---) (?!\\/dev\\/null$)(.+)$/gm,(e,t,n)=>`${t} ${r(n)}`).replace(/^(\\+\\+\\+) (?!\\/dev\\/null$)(.+)$/gm,(e,t,n)=>`${t} ${r(n)}`)}async function $X(';
const workerApplyPatchNormalizeBeforeWriteTarget =
  'let g=h?.root;if(!g)return{status:`error`,appliedPaths:[],skippedPaths:[],conflictedPaths:[],errorCode:`not-git-repo`};if(o?.aborted)return{status:`error`,appliedPaths:[],skippedPaths:[],conflictedPaths:[]};let _=await nZ({appServerClient:n,signal:o}),v=(await n.platformPath()).join(_,`patch.diff`);await rZ(v,l,{appServerClient:n,signal:o}),r&&i&&(v=i(v));';
const workerApplyPatchNormalizeBeforeWriteReplacement =
  'let g=h?.root;if(!g)return{status:`error`,appliedPaths:[],skippedPaths:[],conflictedPaths:[],errorCode:`not-git-repo`};let P=normalizeApplyPatchDiffPaths(l,g);if(o?.aborted)return{status:`error`,appliedPaths:[],skippedPaths:[],conflictedPaths:[]};let _=await nZ({appServerClient:n,signal:o}),v=(await n.platformPath()).join(_,`patch.diff`);await rZ(v,P,{appServerClient:n,signal:o}),r&&i&&(v=i(v));';
const workerApplyPatchNormalizeIndexTarget =
  'e={...c,GIT_INDEX_FILE:s},await eZ(g,l,n,{preferWslPaths:r,convertWslPathToWindowsPath:a,env:{...c,GIT_INDEX_FILE:s},signal:o})';
const workerApplyPatchNormalizeIndexReplacement =
  'e={...c,GIT_INDEX_FILE:s},await eZ(g,P,n,{preferWslPaths:r,convertWslPathToWindowsPath:a,env:{...c,GIT_INDEX_FILE:s},signal:o})';
const workerApplyPatchForceIgnoredAddTarget =
  'return o.length===0?{success:!0,command:`git add`,stdout:``,stderr:``}:$(e,[`add`,`--`,...o],n,{env:i,signal:r})}async function o$(';
const workerApplyPatchForceIgnoredAddReplacement =
  'return o.length===0?{success:!0,command:`git add`,stdout:``,stderr:``}:$(e,[`add`,`-f`,`--`,...o],n,{env:i,signal:r})}async function o$(';
const workerSnapshotForceIgnoredAddTarget =
  'for(let n of kQ(s.paths))if(!(await $(e,[`add`,`--`,...n],i,{env:t,signal:r})).success)return $(e,[`add`,`-A`,...o],i,{env:t,signal:r});return u}async function OQ(';
const workerSnapshotForceIgnoredAddReplacement =
  'for(let n of kQ(s.paths))if(!(await $(e,[`add`,`-f`,`--`,...n],i,{env:t,signal:r})).success)return $(e,[`add`,`-A`,...o],i,{env:t,signal:r});return u}async function OQ(';
const workerApplyPatchStageExistingPathsTarget =
  'if(await Promise.all(s.map(async t=>{let a=KX(e,e,t),s=u.join(e,a);r&&i&&(s=i(s)),await aZ(s,{appServerClient:n,signal:o})&&c.push(a)})),c.length!==0){if(o?.aborted)throw Error(`Apply patch canceled`);await $(e,[`add`,`--`,...c],n,{env:a,signal:o})}}async function tZ(';
const workerApplyPatchStageExistingPathsReplacement =
  'if(await Promise.all(s.map(async t=>{let a=KX(e,e,t),s=u.join(e,a);r&&i&&(s=i(s)),await aZ(s,{appServerClient:n,signal:o})&&c.push(a)})),c.length!==0){if(o?.aborted)throw Error(`Apply patch canceled`);await $(e,[`add`,`-f`,`--`,...c],n,{env:a,signal:o})}}async function tZ(';
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
  {
    target:
      'let i=(r!=null&&r!==this.hostConfig.id?this.getAppServerClientForHostIdOrThrow(r):this.appServerClient).hostConfig,a=e.wr(i),o=C(t??[],a).map(t=>e.mi(t)),s=y((0,n.homedir)(),a),c=e.o(this.globalState),l=e.r(this.globalState),u=c.length>0?c:l??[],d=o&&o.length>0?o:u.filter(e=>e!==`~`).map(t=>e.mi(t)),{origins:f}=await this.requestGitWorker({method:`git-origins`,params:{dirs:d,hostConfig:i,windowHostId:this.hostConfig.id}});',
    replacement:
      'let i=(r!=null&&r!==this.hostConfig.id?this.getAppServerClientForHostIdOrThrow(r):this.appServerClient).hostConfig,a=e.wr(i),o=C(t??[],a).map(t=>e.mi(t)),s=y((0,n.homedir)(),a),c=e.o(this.globalState),l=e.r(this.globalState),u=c.length>0?c:l??[],d=(o&&o.length>0?o:u.filter(e=>e!==`~`).map(t=>e.mi(t))).filter(t=>{try{return!!t&&a.existsSync(t)}catch{return!1}}),{origins:f}=await this.requestGitWorker({method:`git-origins`,params:{dirs:d,hostConfig:i,windowHostId:this.hostConfig.id}});',
  },
  {
    target:
      'let a=this.getRequestAppServerClient(i).hostConfig,o=t.wr(a),s=P(n??[],o).map(t=>e.kt(t)),c=A((0,r.homedir)(),o),l=t.o(this.globalState),u=t.r(this.globalState),d=l.length>0?l:u??[],f=s&&s.length>0?s:d.filter(e=>e!==`~`).map(t=>e.kt(t)),{origins:p}=await this.requestGitWorker({method:`git-origins`,params:{dirs:f,hostConfig:a,windowHostId:this.hostConfig.id}});',
    replacement:
      'let a=this.getRequestAppServerClient(i).hostConfig,o=t.wr(a),s=P(n??[],o).map(t=>e.kt(t)),c=A((0,r.homedir)(),o),l=t.o(this.globalState),u=t.r(this.globalState),d=l.length>0?l:u??[],f=(s&&s.length>0?s:d.filter(e=>e!==`~`).map(t=>e.kt(t))).filter(t=>{try{return!!t&&o.existsSync(t)}catch{return!1}}),{origins:p}=await this.requestGitWorker({method:`git-origins`,params:{dirs:f,hostConfig:a,windowHostId:this.hostConfig.id}});',
  },
];
const mainGitOriginsPatchMarker =
  '.filter(t=>{try{return!!t&&a.existsSync(t)}catch{return!1}}),{origins:f}';
const mainOpenInBrowserPatchAlternatives = [
  {
    target:
      'case`open-in-browser`:{let{url:e}=r;if(r.useExternalBrowser===!0){if(typeof e==`string`&&jr(e))try{await t.shell.openExternal(e)}catch(e){Y().error(`Open-in-browser failed`,{safe:{},sensitive:{error:e}})}else Y().warning(`Open-in-browser received invalid url`);break}if(typeof e==`string`&&Pu(e))try{if(Ar({browserPaneEnabled:te().browserPane,link:{type:`url`,url:e}})){n.send(W,{open:!0,type:`toggle-browser-panel`,url:e});break}await t.shell.openExternal(e)}catch(e){Y().error(`Open-in-browser failed`,{safe:{},sensitive:{error:e}})}else Y().warning(`Open-in-browser received invalid url`);break}',
    replacement:
      'case`open-in-browser`:{let{url:e}=r;if(r.useExternalBrowser===!0){if(typeof e==`string`&&jr(e))try{if(process.platform===`linux`){let r=require(`../../scripts/linux-browser-launch.js`),i=await r.openUrlWithLinuxBrowserSession(e);if(!i.launched){i.error&&Y().warning(`Linux browser session launch failed; falling back to shell.openExternal`,{safe:{code:i.code??null},sensitive:{error:i.error}}),await t.shell.openExternal(e)}}else await t.shell.openExternal(e)}catch(e){Y().error(`Open-in-browser failed`,{safe:{},sensitive:{error:e}})}else Y().warning(`Open-in-browser received invalid url`);break}if(typeof e==`string`&&Pu(e))try{if(Ar({browserPaneEnabled:te().browserPane,link:{type:`url`,url:e}})){n.send(W,{open:!0,type:`toggle-browser-panel`,url:e});break}await t.shell.openExternal(e)}catch(e){Y().error(`Open-in-browser failed`,{safe:{},sensitive:{error:e}})}else Y().warning(`Open-in-browser received invalid url`);break}',
  },
  {
    target:
      'case`open-in-browser`:{let{url:e}=r;if(r.useExternalBrowser===!0){if(typeof e==`string`&&_i(e))try{await t.shell.openExternal(e)}catch(e){Y().error(`Open-in-browser failed`,{safe:{},sensitive:{error:e}})}else Y().warning(`Open-in-browser received invalid url`);break}if(typeof e==`string`&&Rp(e))try{if(gi({browserPaneEnabled:P().browserPane,link:{type:`url`,url:e}})){n.send(W,{open:!0,type:`toggle-browser-panel`,url:e});break}await t.shell.openExternal(e)}catch(e){Y().error(`Open-in-browser failed`,{safe:{},sensitive:{error:e}})}else Y().warning(`Open-in-browser received invalid url`);break}',
    replacement:
      'case`open-in-browser`:{let{url:e}=r;if(r.useExternalBrowser===!0){if(typeof e==`string`&&_i(e))try{if(process.platform===`linux`){let r=require(`../../scripts/linux-browser-launch.js`),i=await r.openUrlWithLinuxBrowserSession(e);if(!i.launched){i.error&&Y().warning(`Linux browser session launch failed; falling back to shell.openExternal`,{safe:{code:i.code??null},sensitive:{error:i.error}}),await t.shell.openExternal(e)}}else await t.shell.openExternal(e)}catch(e){Y().error(`Open-in-browser failed`,{safe:{},sensitive:{error:e}})}else Y().warning(`Open-in-browser received invalid url`);break}if(typeof e==`string`&&Rp(e))try{if(gi({browserPaneEnabled:P().browserPane,link:{type:`url`,url:e}})){n.send(W,{open:!0,type:`toggle-browser-panel`,url:e});break}await t.shell.openExternal(e)}catch(e){Y().error(`Open-in-browser failed`,{safe:{},sensitive:{error:e}})}else Y().warning(`Open-in-browser received invalid url`);break}',
  },
  {
    target:
      'case`open-in-browser`:{let{url:e}=r;if(r.useExternalBrowser===!0){if(typeof e==`string`&&li(e))try{await t.shell.openExternal(e)}catch(e){J().error(`Open-in-browser failed`,{safe:{},sensitive:{error:e}})}else J().warning(`Open-in-browser received invalid url`);break}if(typeof e==`string`&&im(e))try{if(ci({browserPaneEnabled:P().browserPane,link:{type:`url`,url:e}})){n.send(V,{open:!0,type:`toggle-browser-panel`,url:e});break}await t.shell.openExternal(e)}catch(e){J().error(`Open-in-browser failed`,{safe:{},sensitive:{error:e}})}else J().warning(`Open-in-browser received invalid url`);break}',
    replacement:
      'case`open-in-browser`:{let{url:e}=r;if(r.useExternalBrowser===!0){if(typeof e==`string`&&li(e))try{if(process.platform===`linux`){let r=require(`../../scripts/linux-browser-launch.js`),i=await r.openUrlWithLinuxBrowserSession(e);if(!i.launched){i.error&&J().warning(`Linux browser session launch failed; falling back to shell.openExternal`,{safe:{code:i.code??null},sensitive:{error:i.error}}),await t.shell.openExternal(e)}}else await t.shell.openExternal(e)}catch(e){J().error(`Open-in-browser failed`,{safe:{},sensitive:{error:e}})}else J().warning(`Open-in-browser received invalid url`);break}if(typeof e==`string`&&im(e))try{if(ci({browserPaneEnabled:P().browserPane,link:{type:`url`,url:e}})){n.send(V,{open:!0,type:`toggle-browser-panel`,url:e});break}await t.shell.openExternal(e)}catch(e){J().error(`Open-in-browser failed`,{safe:{},sensitive:{error:e}})}else J().warning(`Open-in-browser received invalid url`);break}',
  },
  {
    target:
      'case`open-in-browser`:{let{url:e}=i;if(i.useExternalBrowser===!0){if(typeof e==`string`&&Do(e))try{await n.shell.openExternal(e)}catch(e){J().error(`Open-in-browser failed`,{safe:{},sensitive:{error:e}})}else J().warning(`Open-in-browser received invalid url`);break}if(typeof e==`string`&&K_(e))try{if(Eo({browserPaneEnabled:le().browserPane,link:{type:`url`,url:e}})){r.send(U,{open:!0,type:`toggle-browser-panel`,url:e});break}await n.shell.openExternal(e)}catch(e){J().error(`Open-in-browser failed`,{safe:{},sensitive:{error:e}})}else J().warning(`Open-in-browser received invalid url`);break}',
    replacement:
      'case`open-in-browser`:{let{url:e}=i;if(i.useExternalBrowser===!0){if(typeof e==`string`&&Do(e))try{if(process.platform===`linux`){let i=require(`../../scripts/linux-browser-launch.js`),a=await i.openUrlWithLinuxBrowserSession(e);if(!a.launched){a.error&&J().warning(`Linux browser session launch failed; falling back to shell.openExternal`,{safe:{code:a.code??null},sensitive:{error:a.error}}),await n.shell.openExternal(e)}}else await n.shell.openExternal(e)}catch(e){J().error(`Open-in-browser failed`,{safe:{},sensitive:{error:e}})}else J().warning(`Open-in-browser received invalid url`);break}if(typeof e==`string`&&K_(e))try{if(Eo({browserPaneEnabled:le().browserPane,link:{type:`url`,url:e}})){r.send(U,{open:!0,type:`toggle-browser-panel`,url:e});break}await n.shell.openExternal(e)}catch(e){J().error(`Open-in-browser failed`,{safe:{},sensitive:{error:e}})}else J().warning(`Open-in-browser received invalid url`);break}',
  },
  {
    target:
      'case`open-in-browser`:{let{url:e}=i;if(i.useExternalBrowser===!0){if(typeof e==`string`&&Oo(e))try{await n.shell.openExternal(e)}catch(e){J().error(`Open-in-browser failed`,{safe:{},sensitive:{error:e}})}else J().warning(`Open-in-browser received invalid url`);break}if(typeof e==`string`&&J_(e))try{if(Do({browserPaneEnabled:le().browserPane,link:{type:`url`,url:e}})){r.send(H,{open:!0,type:`toggle-browser-panel`,url:e});break}await n.shell.openExternal(e)}catch(e){J().error(`Open-in-browser failed`,{safe:{},sensitive:{error:e}})}else J().warning(`Open-in-browser received invalid url`);break}',
    replacement:
      'case`open-in-browser`:{let{url:e}=i;if(i.useExternalBrowser===!0){if(typeof e==`string`&&Oo(e))try{if(process.platform===`linux`){let i=require(`../../scripts/linux-browser-launch.js`),a=await i.openUrlWithLinuxBrowserSession(e);if(!a.launched){a.error&&J().warning(`Linux browser session launch failed; falling back to shell.openExternal`,{safe:{code:a.code??null},sensitive:{error:a.error}}),await n.shell.openExternal(e)}}else await n.shell.openExternal(e)}catch(e){J().error(`Open-in-browser failed`,{safe:{},sensitive:{error:e}})}else J().warning(`Open-in-browser received invalid url`);break}if(typeof e==`string`&&J_(e))try{if(Do({browserPaneEnabled:le().browserPane,link:{type:`url`,url:e}})){r.send(H,{open:!0,type:`toggle-browser-panel`,url:e});break}await n.shell.openExternal(e)}catch(e){J().error(`Open-in-browser failed`,{safe:{},sensitive:{error:e}})}else J().warning(`Open-in-browser received invalid url`);break}',
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
  {
    target:
      'function Wy({platform:e,appearance:t,opaqueWindowsEnabled:n,prefersDarkColors:r}){return e===`win32`&&!Vy(t)?n?{backgroundColor:r?Cy:wy,backgroundMaterial:`none`}:{backgroundColor:Sy,backgroundMaterial:`mica`}:{backgroundColor:Sy,backgroundMaterial:null}}',
    replacement:
      'function Wy({platform:e,appearance:t,opaqueWindowsEnabled:n,prefersDarkColors:r}){if(e===`win32`&&!Vy(t))return n?{backgroundColor:r?Cy:wy,backgroundMaterial:`none`}:{backgroundColor:Sy,backgroundMaterial:`mica`};if(e===`linux`&&!Vy(t))return{backgroundColor:r?Cy:wy,backgroundMaterial:null};return{backgroundColor:Sy,backgroundMaterial:null}}',
  },
  {
    target:
      'function _w({platform:e,appearance:t,opaqueWindowsEnabled:n,prefersDarkColors:r}){return e===`win32`&&!mw(t)?n?{backgroundColor:r?YC:XC,backgroundMaterial:`none`}:{backgroundColor:JC,backgroundMaterial:`mica`}:{backgroundColor:JC,backgroundMaterial:null}}',
    replacement:
      'function _w({platform:e,appearance:t,opaqueWindowsEnabled:n,prefersDarkColors:r}){if(e===`win32`&&!mw(t))return n?{backgroundColor:r?YC:XC,backgroundMaterial:`none`}:{backgroundColor:JC,backgroundMaterial:`mica`};if(e===`linux`&&!mw(t))return{backgroundColor:r?YC:XC,backgroundMaterial:null};return{backgroundColor:JC,backgroundMaterial:null}}',
  },
  {
    target:
      'function yw({platform:e,appearance:t,opaqueWindowsEnabled:n,prefersDarkColors:r}){return e===`win32`&&!gw(t)?n?{backgroundColor:r?ZC:QC,backgroundMaterial:`none`}:{backgroundColor:XC,backgroundMaterial:`mica`}:{backgroundColor:XC,backgroundMaterial:null}}',
    replacement:
      'function yw({platform:e,appearance:t,opaqueWindowsEnabled:n,prefersDarkColors:r}){if(e===`win32`&&!gw(t))return n?{backgroundColor:r?ZC:QC,backgroundMaterial:`none`}:{backgroundColor:XC,backgroundMaterial:`mica`};if(e===`linux`&&!gw(t))return{backgroundColor:r?ZC:QC,backgroundMaterial:null};return{backgroundColor:XC,backgroundMaterial:null}}',
  },
];
const mainLinuxOpaqueWindowPatchMarker = 'backgroundMaterial:`mica`};if(e===`linux`&&';
const mainLinuxTitleBarOverlayColorPatchAlternatives = [
  {
    target:
      'function ow(){return{color:XC,symbolColor:n.nativeTheme.shouldUseDarkColors?aw:iw,height:rw}}',
    replacement:
      'function ow(){return process.platform===`linux`?{color:`#2b2f36`,symbolColor:`#ffffff`,height:rw}:{color:XC,symbolColor:n.nativeTheme.shouldUseDarkColors?aw:iw,height:rw}}',
  },
];
const mainLinuxTitleBarOverlayColorPatchMarker =
  'process.platform===`linux`?{color:`#2b2f36`,symbolColor:`#ffffff`,height:rw}';
const mainLinuxTitleBarOverlayUpdatePatchAlternatives = [
  {
    target:
      'installWindowsTitleBarOverlaySync(e,t){if(process.platform!==`win32`||t!==`primary`)return;',
    replacement:
      'installWindowsTitleBarOverlaySync(e,t){if(process.platform!==`win32`&&process.platform!==`linux`||t!==`primary`)return;',
  },
];
const mainLinuxTitleBarOverlayUpdatePatchMarker =
  'if(process.platform!==`win32`&&process.platform!==`linux`||t!==`primary`)return;';
const mainLinuxPrimaryTitleBarPatchAlternatives = [
  {
    target: 'n===`win32`?{titleBarStyle:`hidden`,titleBarOverlay:ow()}:{titleBarStyle:`default`}',
    replacement:
      '(n===`win32`||n===`linux`)?{titleBarStyle:`hidden`,titleBarOverlay:ow()}:{titleBarStyle:`default`}',
  },
];
const mainLinuxPrimaryTitleBarPatchMarker =
  '(n===`win32`||n===`linux`)?{titleBarStyle:`hidden`,titleBarOverlay:ow()}';
const mainLinuxNativeMenuPatchAlternatives = [
  {
    target: 'process.platform===`win32`?{autoHideMenuBar:!0}:{}',
    replacement: '(process.platform===`win32`||process.platform===`linux`)?{autoHideMenuBar:!0}:{}',
  },
  {
    target: 'process.platform===`win32`&&k.removeMenu()',
    replacement: '(process.platform===`win32`||process.platform===`linux`)&&k.removeMenu()',
  },
  {
    target: 'process.platform===`win32`&&t.removeMenu()',
    replacement: '(process.platform===`win32`||process.platform===`linux`)&&t.removeMenu()',
  },
];
const mainLinuxNativeMenuPatchMarker =
  '(process.platform===`win32`||process.platform===`linux`)?{autoHideMenuBar:!0}:{}';
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
  {
    target:
      'let{authUrl:r,completion:i}=await pi(`login-with-chatgpt`,{abortController:e});r&&E.dispatchMessage(`open-in-browser`,{url:r});let a=await i;',
    replacement:
      'let{authUrl:r,completion:i}=await pi(`login-with-chatgpt`,{abortController:e});r&&E.dispatchMessage(`open-in-browser`,{url:r,useExternalBrowser:!0});let a=await i;',
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
  {
    target:
      'let{authUrl:n,completion:r}=await x(`login-with-chatgpt-for-host`,{abortController:t,hostId:e});i.dispatchMessage(`open-in-browser`,{url:n});let o=await r;',
    replacement:
      'let{authUrl:n,completion:r}=await x(`login-with-chatgpt-for-host`,{abortController:t,hostId:e});i.dispatchMessage(`open-in-browser`,{url:n,useExternalBrowser:!0});let o=await r;',
  },
];
const remoteChatGptLoginPatchMarker = 'useExternalBrowser:!0';
const pluginsPageAppConnectPatchAlternatives = [
  {
    target: 'function qo(e){s.dispatchMessage(`open-in-browser`,{url:e})}',
    replacement:
      'function qo(e){s.dispatchMessage(`open-in-browser`,{url:e,useExternalBrowser:!0})}',
  },
  {
    target: 'function Xo(e){s.dispatchMessage(`open-in-browser`,{url:e})}',
    replacement:
      'function Xo(e){s.dispatchMessage(`open-in-browser`,{url:e,useExternalBrowser:!0})}',
  },
  {
    target: 'function ls(e){let t=e?.trim();t&&s.dispatchMessage(`open-in-browser`,{url:t})}',
    replacement:
      'function ls(e){let t=e?.trim();t&&s.dispatchMessage(`open-in-browser`,{url:t,useExternalBrowser:!0})}',
  },
];
const pluginsPageOpenInBrowserCallbackPatchAlternatives = [
  {
    target: 'function Ss(e){s.dispatchMessage(`open-in-browser`,{url:e})}',
    replacement:
      'function Ss(e){s.dispatchMessage(`open-in-browser`,{url:e,useExternalBrowser:!0})}',
  },
];
const pluginsPageInstallUrlPatchAlternatives = [
  {
    target: 's.dispatchMessage(`open-in-browser`,{url:o}),i&&k(!1)',
    replacement:
      's.dispatchMessage(`open-in-browser`,{url:o,useExternalBrowser:!0}),i&&k(!1)',
  },
];
const pluginsPageResolvedUrlPatchAlternatives = [
  {
    target: 's.dispatchMessage(`open-in-browser`,{url:e}),o(!1)',
    replacement:
      's.dispatchMessage(`open-in-browser`,{url:e,useExternalBrowser:!0}),o(!1)',
  },
];
const pluginsPageBrowserFallbackPatchAlternatives = [
  {
    target: 'case`browser-fallback`:k(!1);return;',
    replacement:
      'case`browser-fallback`:k(!1),n?.installUrl?.trim()&&s.dispatchMessage(`open-in-browser`,{url:n.installUrl.trim(),useExternalBrowser:!0});return;',
  },
];
const pluginsPageLinuxWindowsMenuPatchAlternatives = [
  {
    target:
      'function _a(){let{platform:e}=Ut();return e===`windows`&&window.electronBridge?.showApplicationMenu!=null}',
    replacement:
      'function _a(){let{platform:e}=Ut();return(e===`windows`||e===`linux`)&&window.electronBridge?.showApplicationMenu!=null}',
  },
];
const pluginsPageLinuxWindowsMenuPatchMarker =
  'return(e===`windows`||e===`linux`)&&window.electronBridge?.showApplicationMenu!=null';
const pluginCardsAppConnectPatchAlternatives = [
  {
    target: 'openInBrowser:e=>{i.dispatchMessage(`open-in-browser`,{url:e})}',
    replacement:
      'openInBrowser:e=>{i.dispatchMessage(`open-in-browser`,{url:e,useExternalBrowser:!0})}',
  },
];
const pluginCardsInstallUrlOpenPatchAlternatives = [
  {
    target: 'if(!m&&o){i.dispatchMessage(`open-in-browser`,{url:o});return}',
    replacement:
      'if(!m&&o){i.dispatchMessage(`open-in-browser`,{url:o,useExternalBrowser:!0});return}',
  },
  {
    target: 'if(!f&&o){i.dispatchMessage(`open-in-browser`,{url:o});return}',
    replacement:
      'if(!f&&o){i.dispatchMessage(`open-in-browser`,{url:o,useExternalBrowser:!0});return}',
  },
];
const pluginCardsBrowserFallbackPatchAlternatives = [
  {
    target: 'case`browser-fallback`:x({appId:e.appId,status:`pending`});return;',
    replacement:
      'case`browser-fallback`:x({appId:e.appId,status:`pending`}),e.installUrl&&i.dispatchMessage(`open-in-browser`,{url:e.installUrl,useExternalBrowser:!0});return;',
  },
];
const rendererBrowserPaneAvailabilityPatches = [
  {
    target: 'function lY(e){let t=(0,Q.c)(19),n=He(Cm),r=ea(),i=Bf(),a=Ae(As),o=`thread-${e.threadType}`,s;',
    replacement:
      'function lY(e){let t=(0,Q.c)(19),n=He(Cm),r=ea(),i=!0,a=Ae(As),o=`thread-${e.threadType}`,s;',
  },
  {
    target: 'function dY(e){let t=(0,Q.c)(16),{showReviewTab:n}=e,r=He(Cm),i=Bf(),a=Ae(no),o=Ae(To.activeTab$),s=Ae(Oc),c;',
    replacement:
      'function dY(e){let t=(0,Q.c)(16),{showReviewTab:n}=e,r=He(Cm),i=!0,a=Ae(no),o=Ae(To.activeTab$),s=Ae(Oc),c;',
  },
  {
    target: 'let N=M,P=Bf(),F=Ae(As),I=Ae(Vc),L;',
    replacement: 'let N=M,P=!0,F=Ae(As),I=Ae(Vc),L;',
  },
  {
    target: 'function vhe(){let e=(0,Q.c)(4),t=He(Cm),n=Bf(),r,i;return',
    replacement: 'function vhe(){let e=(0,Q.c)(4),t=He(Cm),n=!0,r,i;return',
  },
  {
    target: 'function Bhe(e){let t=(0,Q.c)(84),{close:n,inputRef:r,search:i,setOpen:a,setSearch:o}=e,s=He(j),c=ea(),l=Og(),u=ln(sM),d=Ae(SY),f=rf(vm),p=Bf(),m=rf(mr),h=rf(oi),g=rf(Xn),_;',
    replacement:
      'function Bhe(e){let t=(0,Q.c)(84),{close:n,inputRef:r,search:i,setOpen:a,setSearch:o}=e,s=He(j),c=ea(),l=Og(),u=ln(sM),d=Ae(SY),f=rf(vm),p=!0,m=rf(mr),h=rf(oi),g=rf(Xn),_;',
  },
  {
    target: 'function __e(){let e=He(j),t=ea(),n=me(),r=vf(),i=Bf(),a=Og(),o=cN(),[,s]=se(`diff_comments`),[c]=se(`remote_connections`),[l]=se(`remote_control_connections`),',
    replacement:
      'function __e(){let e=He(j),t=ea(),n=me(),r=vf(),i=!0,a=Og(),o=cN(),[,s]=se(`diff_comments`),[c]=se(`remote_connections`),[l]=se(`remote_control_connections`),',
  },
  {
    target: 'function q9(){let e=(0,Q.c)(17),t=rf(vm),n;e[0]===Symbol.for(`react.memo_cache_sentinel`)?(n=`2425897452`,e[0]=n):n=e[0];let r=rf(n),i;e[1]===Symbol.for(`react.memo_cache_sentinel`)?(i=`3903742690`,e[1]=i):i=e[1];let a=rf(i),o=Bf(),s;',
    replacement:
      'function q9(){let e=(0,Q.c)(17),t=rf(vm),n;e[0]===Symbol.for(`react.memo_cache_sentinel`)?(n=`2425897452`,e[0]=n):n=e[0];let r=rf(n),i;e[1]===Symbol.for(`react.memo_cache_sentinel`)?(i=`3903742690`,e[1]=i):i=e[1];let a=rf(i),o=!0,s;',
  },
];
const rendererBrowserPaneAvailabilityNewBundlePatches = [
  {
    target:
      'let z=i_(),B=Ot(VS),V=Ot($y),U=Sm(),W=Vv(),G=_g(),K=Bf(),ee=hf(`2251025435`),te=ee&&!W,',
    replacement:
      'let z=i_(),B=Ot(VS),V=Ot($y),U=Sm(),W=Vv(),G=_g(),K=!0,ee=hf(`2251025435`),te=ee&&!W,',
  },
  {
    target:
      'f=N_(),p=c?f:f.filter(II),m=je(k),h=Vv(),g=Bf(),_=hf(`2251025435`),v=n!==void 0,y=_&&!h,',
    replacement:
      'f=N_(),p=c?f:f.filter(II),m=je(k),h=Vv(),g=!0,_=hf(`2251025435`),v=n!==void 0,y=_&&!h,',
  },
  {
    target:
      'function Eme(){let e=(0,Q.c)(2);if(!Bf()){let t;return',
    replacement:
      'function Eme(){let e=(0,Q.c)(2);if(!1){let t;return',
  },
  {
    target:
      'function oge(e){let t=(0,Q.c)(24),n=e===void 0?null:e,r=Fs(),i=wf(),{isLoading:a,platform:o}=gp(),s=Vv(),c=Bf(),',
    replacement:
      'function oge(e){let t=(0,Q.c)(24),n=e===void 0?null:e,r=Fs(),i=wf(),{isLoading:a,platform:o}=gp(),s=Vv(),c=!0,',
  },
  {
    target:
      'function ibe(){let e=je(k),t=pa(),n=Vv(),r=Bf(),{remoteConnections:i,selectedRemoteHostId:a}=Ho(),',
    replacement:
      'function ibe(){let e=je(k),t=pa(),n=Vv(),r=!0,{remoteConnections:i,selectedRemoteHostId:a}=Ho(),',
  },
];
const rendererUndoUnifiedDiffPreferencePatchTarget =
  'v=e.patchBatches?.flatMap(e=>{let t=e.cwd??r,n=d?.origins.find(e=>e.dir===t)?.root??null,i=xi(e.changes,t,n);return t==null||i.length===0?[]:[{cwd:t,diff:i}]})??(e.unifiedDiff.length>0&&r!=null?[{cwd:r,diff:e.unifiedDiff}]:[])';
const rendererUndoUnifiedDiffPreferencePatchReplacement =
  'v=(e.patchBatches==null||e.patchBatches.length===1)&&e.unifiedDiff.length>0&&r!=null?[{cwd:r,diff:e.unifiedDiff}]:e.patchBatches?.flatMap(e=>{let t=e.cwd??r,n=d?.origins.find(e=>e.dir===t)?.root??null,i=xi(e.changes,t,n);return t==null||i.length===0?[]:[{cwd:t,diff:i}]})??[]';
const rendererUndoUnifiedDiffPreferencePatchAlternatives = [
  {
    target: rendererUndoUnifiedDiffPreferencePatchTarget,
    replacement: rendererUndoUnifiedDiffPreferencePatchReplacement,
  },
  {
    target:
      'v=e.patchBatches?.flatMap(e=>{let t=e.cwd??r,n=d?.origins.find(e=>e.dir===t)?.root??null,i=Yn(e.changes,t,n);return t==null||i.length===0?[]:[{cwd:t,diff:i}]})??(e.unifiedDiff.length>0&&r!=null?[{cwd:r,diff:e.unifiedDiff}]:[])',
    replacement:
      'v=(e.patchBatches==null||e.patchBatches.length===1)&&e.unifiedDiff.length>0&&r!=null?[{cwd:r,diff:e.unifiedDiff}]:e.patchBatches?.flatMap(e=>{let t=e.cwd??r,n=d?.origins.find(e=>e.dir===t)?.root??null,i=Yn(e.changes,t,n);return t==null||i.length===0?[]:[{cwd:t,diff:i}]})??[]',
  },
  {
    target:
      'v=e.patchBatches?.flatMap(e=>{let t=e.cwd??r,n=d?.origins.find(e=>e.dir===t)?.root??null,i=xn(e.changes,t,n);return t==null||i.length===0?[]:[{cwd:t,diff:i}]})??(e.unifiedDiff.length>0&&r!=null?[{cwd:r,diff:e.unifiedDiff}]:[])',
    replacement:
      'v=(e.patchBatches==null||e.patchBatches.length===1)&&e.unifiedDiff.length>0&&r!=null?[{cwd:r,diff:e.unifiedDiff}]:e.patchBatches?.flatMap(e=>{let t=e.cwd??r,n=d?.origins.find(e=>e.dir===t)?.root??null,i=xn(e.changes,t,n);return t==null||i.length===0?[]:[{cwd:t,diff:i}]})??[]',
  },
  {
    target:
      'v=e.patchBatches?.flatMap(e=>{let t=e.cwd??r,n=d?.origins.find(e=>e.dir===t)?.root??null,i=Cn(e.changes,t,n);return t==null||i.length===0?[]:[{cwd:t,diff:i}]})??(e.unifiedDiff.length>0&&r!=null?[{cwd:r,diff:e.unifiedDiff}]:[])',
    replacement:
      'v=(e.patchBatches==null||e.patchBatches.length===1)&&e.unifiedDiff.length>0&&r!=null?[{cwd:r,diff:e.unifiedDiff}]:e.patchBatches?.flatMap(e=>{let t=e.cwd??r,n=d?.origins.find(e=>e.dir===t)?.root??null,i=Cn(e.changes,t,n);return t==null||i.length===0?[]:[{cwd:t,diff:i}]})??[]',
  },
];
const modelSettingsSavedConfigPatchTarget =
  'queryFn:async()=>{try{return await zt(r,e)}catch{return null}},queryKey:[...Ss,t,e],staleTime:W.FIVE_MINUTES';
const modelSettingsSavedConfigPatchReplacement =
  'queryFn:async()=>{try{return await zt(r,e)}catch{try{return await zt(r,null)}catch{return null}}},queryKey:[...Ss,t,e],staleTime:W.FIVE_MINUTES';
const modelSettingsSavedConfigPatchAlternatives = [
  {
    target: modelSettingsSavedConfigPatchTarget,
    replacement: modelSettingsSavedConfigPatchReplacement,
  },
  {
    target:
      'queryFn:async()=>{try{return await Ye(r,e)}catch{return null}},queryKey:[...xs,t,e],staleTime:W.FIVE_MINUTES',
    replacement:
      'queryFn:async()=>{try{return await Ye(r,e)}catch{try{return await Ye(r,null)}catch{return null}}},queryKey:[...xs,t,e],staleTime:W.FIVE_MINUTES',
  },
];
const modelSettingsSavedConfigPatchMarker =
  'r,null)}catch{return null}}},queryKey:';
const modelSettingsPersistPatchTarget =
  'await on(`set-default-model-config-for-host`,{hostId:a,model:e,reasoningEffort:t,profile:d.profile}),await E()';
const modelSettingsPersistPatchReplacement =
  'let E=QCe(T),M=Y9(a).configPath,D;t[18]!==S||t[19]!==d.profile||t[20]!==a||t[21]!==c||t[22]!==o||t[23]!==b||t[24]!==E||t[25]!==r?(D=async(e,t)=>{try{if(await S(e,t),b){zn(r,`copilot-default-model`,e);return}if(h.info(`Setting default model and reasoning effort`,{safe:{newModel:e,newEffort:t,profile:d.profile}}),!o)return;let n=M,r=d.profile?`profiles.${d.profile}.`:`` ,i=[{keyPath:`${r}model`,value:e,mergeStrategy:`upsert`},{keyPath:`${r}model_reasoning_effort`,value:t,mergeStrategy:`upsert`}];await on(`batch-write-config-value`,{hostId:a,edits:i,filePath:n??null,expectedVersion:null}),await E()}catch(e){let t=e;h.error(`Failed to update model and reasoning effort`,{safe:{},sensitive:{error:t}});let n=r.get(bo),i=$Ce(c,t);Q9(t)?n.danger(i,{id:`composer.modelSettings.updateError`,description:(0,K.createElement)(`div`,{className:`mt-4`},(0,K.createElement)(RCe))}):n.danger(i,{id:`composer.modelSettings.updateError`})}},t[18]=S,t[19]=d.profile,t[20]=a,t[21]=c,t[22]=o,t[23]=b,t[24]=E,t[25]=r,t[26]=D):D=t[26]';
const modelSettingsPersistPatchMarker =
  'M=Y9(a).configPath,D;';
const modelSettingsPersistPatchedTarget =
  'let E=QCe(T),D;t[18]!==S||t[19]!==d.profile||t[20]!==a||t[21]!==c||t[22]!==o||t[23]!==b||t[24]!==E||t[25]!==r?(D=async(e,t)=>{try{if(await S(e,t),b){zn(r,`copilot-default-model`,e);return}if(h.info(`Setting default model and reasoning effort`,{safe:{newModel:e,newEffort:t,profile:d.profile}}),!o)return;let n=Y9(a).configPath,r=d.profile?`profiles.${d.profile}.`:`` ,i=[{keyPath:`${r}model`,value:e,mergeStrategy:`upsert`},{keyPath:`${r}model_reasoning_effort`,value:t,mergeStrategy:`upsert`}];await on(`batch-write-config-value`,{hostId:a,edits:i,filePath:n??null,expectedVersion:null}),await E()}catch(e){let t=e;h.error(`Failed to update model and reasoning effort`,{safe:{},sensitive:{error:t}});let n=r.get(bo),i=$Ce(c,t);Q9(t)?n.danger(i,{id:`composer.modelSettings.updateError`,description:(0,K.createElement)(`div`,{className:`mt-4`},(0,K.createElement)(RCe))}):n.danger(i,{id:`composer.modelSettings.updateError`})}},t[18]=S,t[19]=d.profile,t[20]=a,t[21]=c,t[22]=o,t[23]=b,t[24]=E,t[25]=r,t[26]=D):D=t[26]';
const modelSettingsPersistNewBundleTarget =
  'let E=jwe(T),D;t[18]!==S||t[19]!==d.profile||t[20]!==a||t[21]!==c||t[22]!==o||t[23]!==b||t[24]!==E||t[25]!==r?(D=async(e,t)=>{try{if(await S(e,t),b){Un(r,`copilot-default-model`,e);return}if(h.info(`Setting default model and reasoning effort`,{safe:{newModel:e,newEffort:t,profile:d.profile}}),!o)return;await en(`set-default-model-config-for-host`,{hostId:a,model:e,reasoningEffort:t,profile:d.profile}),await E()}catch(e){let t=e;h.error(`Failed to update model and reasoning effort`,{safe:{},sensitive:{error:t}});let n=r.get(Eo),i=Mwe(c,t);Q9(t)?n.danger(i,{id:`composer.modelSettings.updateError`,description:(0,K.createElement)(`div`,{className:`mt-4`},(0,K.createElement)(_we))}):n.danger(i,{id:`composer.modelSettings.updateError`})}},t[18]=S,t[19]=d.profile,t[20]=a,t[21]=c,t[22]=o,t[23]=b,t[24]=E,t[25]=r,t[26]=D):D=t[26]';
const modelSettingsPersistNewBundleReplacement =
  'let E=jwe(T),M=Y9(a).configPath,D;t[18]!==S||t[19]!==d.profile||t[20]!==a||t[21]!==c||t[22]!==o||t[23]!==b||t[24]!==E||t[25]!==r?(D=async(e,t)=>{try{if(await S(e,t),b){Un(r,`copilot-default-model`,e);return}if(h.info(`Setting default model and reasoning effort`,{safe:{newModel:e,newEffort:t,profile:d.profile}}),!o)return;let n=M,r=d.profile?`profiles.${d.profile}.`:`` ,i=[{keyPath:`${r}model`,value:e,mergeStrategy:`upsert`},{keyPath:`${r}model_reasoning_effort`,value:t,mergeStrategy:`upsert`}];await en(`batch-write-config-value`,{hostId:a,edits:i,filePath:n??null,expectedVersion:null}),await E()}catch(e){let t=e;h.error(`Failed to update model and reasoning effort`,{safe:{},sensitive:{error:t}});let n=r.get(Eo),i=Mwe(c,t);Q9(t)?n.danger(i,{id:`composer.modelSettings.updateError`,description:(0,K.createElement)(`div`,{className:`mt-4`},(0,K.createElement)(_we))}):n.danger(i,{id:`composer.modelSettings.updateError`})}},t[18]=S,t[19]=d.profile,t[20]=a,t[21]=c,t[22]=o,t[23]=b,t[24]=E,t[25]=r,t[26]=D):D=t[26]';
const mainLinuxOpenTargetsPatchTarget =
  'async function jc(e,t,n){let r=Zs(t,n),i=Ac(e)??kc();if(i){if(await ho(`open`,[`-a`,i,t]),!n)return;let e=G(`zed`);if(e)try{await ho(e,r)}catch{}return}await ho(e,r)}var Mc=[uc,fc,cc,ms,Go,Qs,Ec,hc,Uo,Es,tc,vs,qo,Cs,fs,_c,Os,Ss,mc,xc,Ps,Fs,Is,Ls,Rs,zs,Bs,Vs,ic],Nc=e.mr(`open-in-targets`);';
const mainLinuxOpenTargetsPatchReplacement =
  'async function jc(e,t,n){let r=Zs(t,n),i=Ac(e)??kc();if(i){if(await ho(`open`,[`-a`,i,t]),!n)return;let e=G(`zed`);if(e)try{await ho(e,r)}catch{}return}await ho(e,r)}function linuxResolveAbsoluteCommand(e){let t=K(e);return t&&(0,a.existsSync)(t)?t:null}function linuxDesktopEntrySearchRoots(){let e=(0,n.homedir)();return[(0,r.join)(e,`.local`,`share`,`applications`),`/usr/share/applications`]}function linuxOpenTargetSearchRoots(){let e=(0,n.homedir)();return[(0,r.join)(e,`Applications`),(0,r.join)(e,`Downloads`),`/opt`]}function linuxResolveDesktopExec(e){let t=ss(e);if(!t)return null;let n=t.args[0];if(!n)return null;return linuxResolveAbsoluteCommand(n)??(()=>{let e=G(n);return e?K(e):null})()}function linuxFindDesktopEntryExec(e){let t=e.map(e=>e.toLowerCase());for(let e of linuxDesktopEntrySearchRoots()){let n;try{n=(0,a.readdirSync)(e)}catch{continue}for(let i of n){let o=i.toLowerCase();if(!o.endsWith(`.desktop`)||!t.some(e=>o.includes(e)))continue;let s=(0,r.join)(e,i),c=null;try{c=(0,a.readFileSync)(s,`utf8`)}catch{continue}let l=c.match(/^Exec=(.+)$/m)?.[1]?.trim();if(!l)continue;let u=linuxResolveDesktopExec(l.replace(/%.?/g,``).trim());if(u)return u}}return null}function linuxFindAppImage(e){let t=e.map(e=>e.toLowerCase());for(let e of linuxOpenTargetSearchRoots()){let n;try{n=(0,a.readdirSync)(e,{withFileTypes:!0})}catch{continue}for(let i of n){if(!i.isFile())continue;let n=i.name.toLowerCase();if(!n.endsWith(`.appimage`)||!t.some(e=>n.includes(e)))continue;let o=linuxResolveAbsoluteCommand((0,r.join)(e,i.name));if(o)return o}}return null}function linuxResolveEditorTarget(e,t=[],n=[]){for(let t of e){let e=G(t);if(e){let t=K(e);if(t)return t}}for(let e of t){let t=linuxResolveAbsoluteCommand(e);if(t)return t}let i=n.length>0?linuxFindDesktopEntryExec(n):null;return i??(n.length>0?linuxFindAppImage(n):null)}function linuxFileManagerDetect(){return G(`xdg-open`)??linuxResolveAbsoluteCommand(`/usr/bin/xdg-open`)}var linuxVscode={id:`vscode`,platforms:{linux:{label:`VS Code`,icon:`apps/vscode.png`,kind:`editor`,detect:()=>linuxResolveEditorTarget([`code`],[`/usr/bin/code`,`/snap/bin/code`],[`visual studio code`,`code`]),args:Ho,supportsSsh:!0}}},linuxVscodeInsiders={id:`vscodeInsiders`,platforms:{linux:{label:`VS Code Insiders`,icon:`apps/vscode-insiders.png`,kind:`editor`,detect:()=>linuxResolveEditorTarget([`code-insiders`],[`/usr/bin/code-insiders`,`/snap/bin/code-insiders`],[`insiders`,`code-insiders`]),args:Ho,supportsSsh:!0}}},linuxCursor={id:`cursor`,platforms:{linux:{label:`Cursor`,icon:`apps/cursor.png`,kind:`editor`,detect:()=>linuxResolveEditorTarget([`cursor`],[`/usr/bin/cursor`,`/opt/Cursor/cursor`,`/opt/cursor/cursor`],[`cursor`]),args:Ho,supportsSsh:!0}}},linuxWindsurf={id:`windsurf`,platforms:{linux:{label:`Windsurf`,icon:`apps/windsurf.png`,kind:`editor`,detect:()=>linuxResolveEditorTarget([`windsurf`],[`/usr/bin/windsurf`,`/opt/Windsurf/windsurf`,`/opt/windsurf/windsurf`],[`windsurf`]),args:Ho,supportsSsh:!0}}},linuxZed={id:`zed`,platforms:{linux:{label:`Zed`,icon:`apps/zed.png`,kind:`editor`,detect:()=>linuxResolveEditorTarget([`zed`],[`/usr/bin/zed`,`/opt/zed/zed`,`/opt/Zed/zed`],[`zed`]),args:Zs}}},linuxFileManager={id:`fileManager`,platforms:{linux:{label:`File Manager`,icon:`apps/file-explorer.png`,kind:`fileManager`,detect:linuxFileManagerDetect,args:e=>[e],open:async({path:e})=>bs(e)}}};var Mc=[uc,linuxVscode,fc,linuxVscodeInsiders,cc,ms,linuxCursor,Go,Qs,Ec,linuxZed,hc,linuxWindsurf,Uo,Es,tc,vs,linuxFileManager,qo,Cs,fs,_c,Os,Ss,mc,xc,Ps,Fs,Is,Ls,Rs,zs,Bs,Vs,ic],Nc=e.mr(`open-in-targets`);';
const mainLinuxOpenTargetsPatchAlternatives = [
  {
    target: mainLinuxOpenTargetsPatchTarget,
    replacement: mainLinuxOpenTargetsPatchReplacement,
  },
  {
    target:
      'async function Ic(e,t,n){let r=nc(t,n),i=Fc(e)??Pc();if(i){if(await bo(`open`,[`-a`,i,t]),!n)return;let e=H(`zed`);if(e)try{await bo(e,r)}catch{}return}await bo(e,r)}var Lc=[hc,_c,pc,ys,Xo,rc,jc,bc,Jo,js,oc,Cs,Qo,Os,_s,Sc,Ns,Ds,yc,Ec,zs,Bs,Vs,Hs,Us,Ws,Gs,Ks,lc],Rc=e.kr(`open-in-targets`);',
    replacement:
      'async function Ic(e,t,n){let r=nc(t,n),i=Fc(e)??Pc();if(i){if(await bo(`open`,[`-a`,i,t]),!n)return;let e=H(`zed`);if(e)try{await bo(e,r)}catch{}return}await bo(e,r)}function linuxResolveAbsoluteCommand(e){let t=U(e);return t&&(0,a.existsSync)(t)?t:null}function linuxDesktopEntrySearchRoots(){let e=(0,n.homedir)();return[(0,r.join)(e,`.local`,`share`,`applications`),`/usr/share/applications`]}function linuxOpenTargetSearchRoots(){let e=(0,n.homedir)();return[(0,r.join)(e,`Applications`),(0,r.join)(e,`Downloads`),`/opt`]}function linuxResolveDesktopExec(e){let t=fs(e);if(!t)return null;let n=t.args[0];if(!n)return null;return linuxResolveAbsoluteCommand(n)??(()=>{let e=H(n);return e?U(e):null})()}function linuxFindDesktopEntryExec(e){let t=e.map(e=>e.toLowerCase());for(let e of linuxDesktopEntrySearchRoots()){let n;try{n=(0,a.readdirSync)(e)}catch{continue}for(let i of n){let o=i.toLowerCase();if(!o.endsWith(`.desktop`)||!t.some(e=>o.includes(e)))continue;let s=(0,r.join)(e,i),c=null;try{c=(0,a.readFileSync)(s,`utf8`)}catch{continue}let l=c.match(/^Exec=(.+)$/m)?.[1]?.trim();if(!l)continue;let u=linuxResolveDesktopExec(l.replace(/%.?/g,``).trim());if(u)return u}}return null}function linuxFindAppImage(e){let t=e.map(e=>e.toLowerCase());for(let e of linuxOpenTargetSearchRoots()){let n;try{n=(0,a.readdirSync)(e,{withFileTypes:!0})}catch{continue}for(let i of n){if(!i.isFile())continue;let n=i.name.toLowerCase();if(!n.endsWith(`.appimage`)||!t.some(e=>n.includes(e)))continue;let o=linuxResolveAbsoluteCommand((0,r.join)(e,i.name));if(o)return o}}return null}function linuxResolveEditorTarget(e,t=[],n=[]){for(let t of e){let e=H(t);if(e){let t=U(e);if(t)return t}}for(let e of t){let t=linuxResolveAbsoluteCommand(e);if(t)return t}let i=n.length>0?linuxFindDesktopEntryExec(n):null;return i??(n.length>0?linuxFindAppImage(n):null)}function linuxFileManagerDetect(){return H(`xdg-open`)??linuxResolveAbsoluteCommand(`/usr/bin/xdg-open`)}var linuxVscode={id:`vscode`,platforms:{linux:{label:`VS Code`,icon:`apps/vscode.png`,kind:`editor`,detect:()=>linuxResolveEditorTarget([`code`],[`/usr/bin/code`,`/snap/bin/code`],[`visual studio code`,`code`]),args:bs,supportsSsh:!0}}},linuxVscodeInsiders={id:`vscodeInsiders`,platforms:{linux:{label:`VS Code Insiders`,icon:`apps/vscode-insiders.png`,kind:`editor`,detect:()=>linuxResolveEditorTarget([`code-insiders`],[`/usr/bin/code-insiders`,`/snap/bin/code-insiders`],[`insiders`,`code-insiders`]),args:bs,supportsSsh:!0}}},linuxCursor={id:`cursor`,platforms:{linux:{label:`Cursor`,icon:`apps/cursor.png`,kind:`editor`,detect:()=>linuxResolveEditorTarget([`cursor`],[`/usr/bin/cursor`,`/opt/Cursor/cursor`,`/opt/cursor/cursor`],[`cursor`]),args:bs,supportsSsh:!0}}},linuxWindsurf={id:`windsurf`,platforms:{linux:{label:`Windsurf`,icon:`apps/windsurf.png`,kind:`editor`,detect:()=>linuxResolveEditorTarget([`windsurf`],[`/usr/bin/windsurf`,`/opt/Windsurf/windsurf`,`/opt/windsurf/windsurf`],[`windsurf`]),args:bs,supportsSsh:!0}}},linuxZed={id:`zed`,platforms:{linux:{label:`Zed`,icon:`apps/zed.png`,kind:`editor`,detect:()=>linuxResolveEditorTarget([`zed`],[`/usr/bin/zed`,`/opt/zed/zed`,`/opt/Zed/zed`],[`zed`]),args:nc}}},linuxFileManager={id:`fileManager`,platforms:{linux:{label:`File Manager`,icon:`apps/file-explorer.png`,kind:`fileManager`,detect:linuxFileManagerDetect,args:e=>[e],open:async({path:e})=>cc(e)}}};var Lc=[hc,linuxVscode,_c,linuxVscodeInsiders,pc,ys,linuxCursor,Xo,rc,jc,linuxZed,bc,linuxWindsurf,Jo,js,oc,Cs,linuxFileManager,Qo,Os,_s,Sc,Ns,Ds,yc,Ec,zs,Bs,Vs,Hs,Us,Ws,Gs,Ks,lc],Rc=e.kr(`open-in-targets`);',
  },
  {
    target:
      'var _d={id:`zed`,platforms:{darwin:{label:`Zed`,icon:`apps/zed.png`,kind:`editor`,detect:vd,args:Hu,open:async({command:e,path:t,location:n})=>{await Sd(e,t,n)}},win32:{label:`Zed`,icon:`apps/zed.png`,kind:`editor`,detect:yd,args:Hu}}};function vd(){return W(`zed`)??Gc([`/Applications/Zed.app/Contents/MacOS/zed`,`/Applications/Zed Preview.app/Contents/MacOS/zed`,`/Applications/Zed Nightly.app/Contents/MacOS/zed`])??Kc(`Zed`,`zed`)}function yd(){let e=W(`zed.exe`)??W(`zed`);return e?ml(e):pl([[`Zed`,`Zed.exe`]])}function bd(){return qc(`Zed`)??Gc([`/Applications/Zed.app`,`/Applications/Zed Preview.app`,`/Applications/Zed Nightly.app`])}function xd(e){let t=e.indexOf(`.app/Contents/MacOS/`);return t===-1?null:e.slice(0,t+4)}async function Sd(e,t,n){let r=Hu(t,n),i=xd(e)??bd();if(i){if(await al(`open`,[`-a`,i,t]),!n)return;let e=W(`zed`);if(e)try{await al(e,r)}catch{}return}await al(e,r)}var Cd=[td,rd,$u,au,Il,Uu,_d,od,Pl,_u,Ku,lu,Rl,mu,ru,cd,yu,pu,ad,fd,Tu,Eu,Du,Ou,ku,Au,ju,Mu,Yu],wd=t.Or(`open-in-targets`);',
    replacement:
      'var _d={id:`zed`,platforms:{darwin:{label:`Zed`,icon:`apps/zed.png`,kind:`editor`,detect:vd,args:Hu,open:async({command:e,path:t,location:n})=>{await Sd(e,t,n)}},win32:{label:`Zed`,icon:`apps/zed.png`,kind:`editor`,detect:yd,args:Hu}}};function vd(){return W(`zed`)??Gc([`/Applications/Zed.app/Contents/MacOS/zed`,`/Applications/Zed Preview.app/Contents/MacOS/zed`,`/Applications/Zed Nightly.app/Contents/MacOS/zed`])??Kc(`Zed`,`zed`)}function yd(){let e=W(`zed.exe`)??W(`zed`);return e?ml(e):pl([[`Zed`,`Zed.exe`]])}function bd(){return qc(`Zed`)??Gc([`/Applications/Zed.app`,`/Applications/Zed Preview.app`,`/Applications/Zed Nightly.app`])}function xd(e){let t=e.indexOf(`.app/Contents/MacOS/`);return t===-1?null:e.slice(0,t+4)}async function Sd(e,t,n){let r=Hu(t,n),i=xd(e)??bd();if(i){if(await al(`open`,[`-a`,i,t]),!n)return;let e=W(`zed`);if(e)try{await al(e,r)}catch{}return}await al(e,r)}function linuxResolveAbsoluteCommand(e){let t=ml(e);return t&&(0,o.existsSync)(t)?t:null}function linuxDesktopEntrySearchRoots(){let e=(0,r.homedir)();return[(0,i.join)(e,`.local`,`share`,`applications`),`/usr/share/applications`]}function linuxOpenTargetSearchRoots(){let e=(0,r.homedir)();return[(0,i.join)(e,`Applications`),(0,i.join)(e,`Downloads`),`/opt`]}function linuxResolveDesktopExec(e){let t=Ql(e);if(!t)return null;let n=t.args[0];if(!n)return null;return linuxResolveAbsoluteCommand(n)??(()=>{let e=W(n);return e?ml(e):null})()}function linuxFindDesktopEntryExec(e){let t=e.map(e=>e.toLowerCase());for(let e of linuxDesktopEntrySearchRoots()){let n;try{n=(0,o.readdirSync)(e)}catch{continue}for(let r of n){let a=r.toLowerCase();if(!a.endsWith(`.desktop`)||!t.some(e=>a.includes(e)))continue;let s=(0,i.join)(e,r),c=null;try{c=(0,o.readFileSync)(s,`utf8`)}catch{continue}let l=c.match(/^Exec=(.+)$/m)?.[1]?.trim();if(!l)continue;let u=linuxResolveDesktopExec(l.replace(/%.?/g,``).trim());if(u)return u}}return null}function linuxFindAppImage(e){let t=e.map(e=>e.toLowerCase());for(let e of linuxOpenTargetSearchRoots()){let n;try{n=(0,o.readdirSync)(e,{withFileTypes:!0})}catch{continue}for(let r of n){if(!r.isFile())continue;let n=r.name.toLowerCase();if(!n.endsWith(`.appimage`)||!t.some(e=>n.includes(e)))continue;let a=linuxResolveAbsoluteCommand((0,i.join)(e,r.name));if(a)return a}}return null}function linuxResolveEditorTarget(e,t=[],n=[]){for(let t of e){let e=W(t);if(e){let t=ml(e);if(t)return t}}for(let e of t){let t=linuxResolveAbsoluteCommand(e);if(t)return t}let r=n.length>0?linuxFindDesktopEntryExec(n):null;return r??(n.length>0?linuxFindAppImage(n):null)}function linuxFileManagerDetect(){return W(`xdg-open`)??linuxResolveAbsoluteCommand(`/usr/bin/xdg-open`)}var linuxVscode={id:`vscode`,platforms:{linux:{label:`VS Code`,icon:`apps/vscode.png`,kind:`editor`,detect:()=>linuxResolveEditorTarget([`code`],[`/usr/bin/code`,`/snap/bin/code`],[`visual studio code`,`code`]),args:Nl,supportsSsh:!0}}},linuxVscodeInsiders={id:`vscodeInsiders`,platforms:{linux:{label:`VS Code Insiders`,icon:`apps/vscode-insiders.png`,kind:`editor`,detect:()=>linuxResolveEditorTarget([`code-insiders`],[`/usr/bin/code-insiders`,`/snap/bin/code-insiders`],[`insiders`,`code-insiders`]),args:Nl,supportsSsh:!0}}},linuxCursor={id:`cursor`,platforms:{linux:{label:`Cursor`,icon:`apps/cursor.png`,kind:`editor`,detect:()=>linuxResolveEditorTarget([`cursor`],[`/usr/bin/cursor`,`/opt/Cursor/cursor`,`/opt/cursor/cursor`],[`cursor`]),args:Nl,supportsSsh:!0}}},linuxWindsurf={id:`windsurf`,platforms:{linux:{label:`Windsurf`,icon:`apps/windsurf.png`,kind:`editor`,detect:()=>linuxResolveEditorTarget([`windsurf`],[`/usr/bin/windsurf`,`/opt/Windsurf/windsurf`,`/opt/windsurf/windsurf`],[`windsurf`]),args:Nl,supportsSsh:!0}}},linuxZed={id:`zed`,platforms:{linux:{label:`Zed`,icon:`apps/zed.png`,kind:`editor`,detect:()=>linuxResolveEditorTarget([`zed`],[`/usr/bin/zed`,`/opt/zed/zed`,`/opt/Zed/zed`],[`zed`]),args:Hu}}},linuxFileManager={id:`fileManager`,platforms:{linux:{label:`File Manager`,icon:`apps/file-explorer.png`,kind:`fileManager`,detect:linuxFileManagerDetect,args:e=>[e],open:async({path:e})=>du(e)}}};var Cd=[td,linuxVscode,rd,linuxVscodeInsiders,$u,au,linuxCursor,Il,Uu,_d,linuxZed,od,linuxWindsurf,Pl,_u,Ku,lu,linuxFileManager,Rl,mu,ru,cd,yu,pu,ad,fd,Tu,Eu,Du,Ou,ku,Au,ju,Mu,Yu],wd=t.Or(`open-in-targets`);',
  },
  {
    target:
      'var _d={id:`zed`,platforms:{darwin:{label:`Zed`,icon:`apps/zed.png`,kind:`editor`,detect:vd,args:Hu,open:async({command:e,path:t,location:n})=>{await Sd(e,t,n)}},win32:{label:`Zed`,icon:`apps/zed.png`,kind:`editor`,detect:yd,args:Hu}}};function vd(){return U(`zed`)??Kc([`/Applications/Zed.app/Contents/MacOS/zed`,`/Applications/Zed Preview.app/Contents/MacOS/zed`,`/Applications/Zed Nightly.app/Contents/MacOS/zed`])??qc(`Zed`,`zed`)}function yd(){let e=U(`zed.exe`)??U(`zed`);return e?W(e):ml([[`Zed`,`Zed.exe`]])}function bd(){return Jc(`Zed`)??Kc([`/Applications/Zed.app`,`/Applications/Zed Preview.app`,`/Applications/Zed Nightly.app`])}function xd(e){let t=e.indexOf(`.app/Contents/MacOS/`);return t===-1?null:e.slice(0,t+4)}async function Sd(e,t,n){let r=Hu(t,n),i=xd(e)??bd();if(i){if(await ol(`open`,[`-a`,i,t]),!n)return;let e=U(`zed`);if(e)try{await ol(e,r)}catch{}return}await ol(e,r)}var Cd=[td,rd,$u,au,Il,Uu,_d,od,Pl,_u,Ku,lu,Rl,mu,ru,cd,yu,pu,ad,fd,Tu,Eu,Du,Ou,ku,Au,ju,Mu,Yu],wd=t.Or(`open-in-targets`);',
    replacement:
      'var _d={id:`zed`,platforms:{darwin:{label:`Zed`,icon:`apps/zed.png`,kind:`editor`,detect:vd,args:Hu,open:async({command:e,path:t,location:n})=>{await Sd(e,t,n)}},win32:{label:`Zed`,icon:`apps/zed.png`,kind:`editor`,detect:yd,args:Hu}}};function vd(){return U(`zed`)??Kc([`/Applications/Zed.app/Contents/MacOS/zed`,`/Applications/Zed Preview.app/Contents/MacOS/zed`,`/Applications/Zed Nightly.app/Contents/MacOS/zed`])??qc(`Zed`,`zed`)}function yd(){let e=U(`zed.exe`)??U(`zed`);return e?W(e):ml([[`Zed`,`Zed.exe`]])}function bd(){return Jc(`Zed`)??Kc([`/Applications/Zed.app`,`/Applications/Zed Preview.app`,`/Applications/Zed Nightly.app`])}function xd(e){let t=e.indexOf(`.app/Contents/MacOS/`);return t===-1?null:e.slice(0,t+4)}async function Sd(e,t,n){let r=Hu(t,n),i=xd(e)??bd();if(i){if(await ol(`open`,[`-a`,i,t]),!n)return;let e=U(`zed`);if(e)try{await ol(e,r)}catch{}return}await ol(e,r)}function linuxResolveAbsoluteCommand(e){let t=W(e);return t&&(0,o.existsSync)(t)?t:null}function linuxDesktopEntrySearchRoots(){let e=(0,r.homedir)();return[(0,i.join)(e,`.local`,`share`,`applications`),`/usr/share/applications`]}function linuxOpenTargetSearchRoots(){let e=(0,r.homedir)();return[(0,i.join)(e,`Applications`),(0,i.join)(e,`Downloads`),`/opt`]}function linuxResolveDesktopExec(e){let t=Bd(e);if(!t)return null;let n=t.args[0];if(!n)return null;return linuxResolveAbsoluteCommand(n)??(()=>{let e=U(n);return e?W(e):null})()}function linuxFindDesktopEntryExec(e){let t=e.map(e=>e.toLowerCase());for(let e of linuxDesktopEntrySearchRoots()){let n;try{n=(0,o.readdirSync)(e)}catch{continue}for(let r of n){let a=r.toLowerCase();if(!a.endsWith(`.desktop`)||!t.some(e=>a.includes(e)))continue;let s=(0,i.join)(e,r),c=null;try{c=(0,o.readFileSync)(s,`utf8`)}catch{continue}let l=c.match(/^Exec=(.+)$/m)?.[1]?.trim();if(!l)continue;let u=linuxResolveDesktopExec(l.replace(/%.?/g,``).trim());if(u)return u}}return null}function linuxFindAppImage(e){let t=e.map(e=>e.toLowerCase());for(let e of linuxOpenTargetSearchRoots()){let n;try{n=(0,o.readdirSync)(e,{withFileTypes:!0})}catch{continue}for(let r of n){if(!r.isFile())continue;let n=r.name.toLowerCase();if(!n.endsWith(`.appimage`)||!t.some(e=>n.includes(e)))continue;let a=linuxResolveAbsoluteCommand((0,i.join)(e,r.name));if(a)return a}}return null}function linuxResolveEditorTarget(e,t=[],n=[]){for(let t of e){let e=U(t);if(e){let t=W(e);if(t)return t}}for(let e of t){let t=linuxResolveAbsoluteCommand(e);if(t)return t}let r=n.length>0?linuxFindDesktopEntryExec(n):null;return r??(n.length>0?linuxFindAppImage(n):null)}function linuxFileManagerDetect(){return U(`xdg-open`)??linuxResolveAbsoluteCommand(`/usr/bin/xdg-open`)}var linuxVscode={id:`vscode`,platforms:{linux:{label:`VS Code`,icon:`apps/vscode.png`,kind:`editor`,detect:()=>linuxResolveEditorTarget([`code`],[`/usr/bin/code`,`/snap/bin/code`],[`visual studio code`,`code`]),args:Nl,supportsSsh:!0}}},linuxVscodeInsiders={id:`vscodeInsiders`,platforms:{linux:{label:`VS Code Insiders`,icon:`apps/vscode-insiders.png`,kind:`editor`,detect:()=>linuxResolveEditorTarget([`code-insiders`],[`/usr/bin/code-insiders`,`/snap/bin/code-insiders`],[`insiders`,`code-insiders`]),args:Nl,supportsSsh:!0}}},linuxCursor={id:`cursor`,platforms:{linux:{label:`Cursor`,icon:`apps/cursor.png`,kind:`editor`,detect:()=>linuxResolveEditorTarget([`cursor`],[`/usr/bin/cursor`,`/opt/Cursor/cursor`,`/opt/cursor/cursor`],[`cursor`]),args:Nl,supportsSsh:!0}}},linuxWindsurf={id:`windsurf`,platforms:{linux:{label:`Windsurf`,icon:`apps/windsurf.png`,kind:`editor`,detect:()=>linuxResolveEditorTarget([`windsurf`],[`/usr/bin/windsurf`,`/opt/Windsurf/windsurf`,`/opt/windsurf/windsurf`],[`windsurf`]),args:Nl,supportsSsh:!0}}},linuxZed={id:`zed`,platforms:{linux:{label:`Zed`,icon:`apps/zed.png`,kind:`editor`,detect:()=>linuxResolveEditorTarget([`zed`],[`/usr/bin/zed`,`/opt/zed/zed`,`/opt/Zed/zed`],[`zed`]),args:Hu}}},linuxFileManager={id:`fileManager`,platforms:{linux:{label:`File Manager`,icon:`apps/file-explorer.png`,kind:`fileManager`,detect:linuxFileManagerDetect,args:e=>[e],open:async({path:e})=>du(e)}}};var Cd=[td,linuxVscode,rd,linuxVscodeInsiders,$u,au,linuxCursor,Il,Uu,_d,linuxZed,od,linuxWindsurf,Pl,_u,Ku,lu,linuxFileManager,Rl,mu,ru,cd,yu,pu,ad,fd,Tu,Eu,Du,Ou,ku,Au,ju,Mu,Yu],wd=t.Or(`open-in-targets`);',
  },
];
const mainLinuxOpenTargetsPatchMarker = 'function linuxResolveEditorTarget(';
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

  if (alternatives.some(({ replacement }) => source.includes(replacement))) {
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

export function prepareAssemblyOutputRoot(
  outputRoot,
  { defaultOutputRoot = defaultAssembleOutputRoot } = {},
) {
  if (!fs.existsSync(outputRoot)) {
    return;
  }

  if (path.resolve(outputRoot) === path.resolve(defaultOutputRoot)) {
    fs.rmSync(outputRoot, { recursive: true, force: true });
    return;
  }

  throw new Error(
    `Refusing to overwrite existing assembled runtime root: ${outputRoot}\n` +
    'Use a different --output path.',
  );
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

function selectBrowserPaneAvailabilityPatches(source, sourcePath) {
  const hasPatchShape = (patches) =>
    patches.some(
      (patch) => source.includes(patch.target) || source.includes(patch.replacement),
    );

  if (hasPatchShape(rendererBrowserPaneAvailabilityPatches)) {
    return rendererBrowserPaneAvailabilityPatches;
  }

  if (hasPatchShape(rendererBrowserPaneAvailabilityNewBundlePatches)) {
    return rendererBrowserPaneAvailabilityNewBundlePatches;
  }

  return [];
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
        label: 'bootstrap linux git wrapper path',
        alternatives: bootstrapLinuxGitWrapperAlternatives,
        marker: bootstrapLinuxGitWrapperMarker,
      },
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
      {
        label: 'git worker normalize absolute patch headers',
        target: workerApplyPatchNormalizeHeadersTarget,
        replacement: workerApplyPatchNormalizeHeadersReplacement,
      },
      {
        label: 'git worker normalize diff before apply',
        target: workerApplyPatchNormalizeBeforeWriteTarget,
        replacement: workerApplyPatchNormalizeBeforeWriteReplacement,
      },
      {
        label: 'git worker normalize diff for temp index',
        target: workerApplyPatchNormalizeIndexTarget,
        replacement: workerApplyPatchNormalizeIndexReplacement,
      },
      {
        label: 'git worker force-add ignored diff paths in temp index',
        target: workerApplyPatchForceIgnoredAddTarget,
        replacement: workerApplyPatchForceIgnoredAddReplacement,
      },
      {
        label: 'git worker force-add ignored snapshot paths',
        target: workerSnapshotForceIgnoredAddTarget,
        replacement: workerSnapshotForceIgnoredAddReplacement,
      },
      {
        label: 'git worker force-add ignored existing apply-patch paths',
        target: workerApplyPatchStageExistingPathsTarget,
        replacement: workerApplyPatchStageExistingPathsReplacement,
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
      {
        label: 'linux title bar overlay uses high contrast controls',
        alternatives: mainLinuxTitleBarOverlayColorPatchAlternatives,
        marker: mainLinuxTitleBarOverlayColorPatchMarker,
      },
      {
        label: 'linux title bar overlay refreshes on theme changes',
        alternatives: mainLinuxTitleBarOverlayUpdatePatchAlternatives,
        marker: mainLinuxTitleBarOverlayUpdatePatchMarker,
      },
      {
        label: 'linux primary window uses custom title bar',
        alternatives: mainLinuxPrimaryTitleBarPatchAlternatives,
        marker: mainLinuxPrimaryTitleBarPatchMarker,
      },
      ...mainLinuxNativeMenuPatchAlternatives.map((patch, index) => ({
        label: `linux hides native menu for custom title bar ${index + 1}`,
        target: patch.target,
        replacement: patch.replacement,
      })),
      {
        label: 'linux open-in target registry',
        alternatives: mainLinuxOpenTargetsPatchAlternatives,
        marker: mainLinuxOpenTargetsPatchMarker,
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
  const pluginsPagePath = findExtractedWebviewAsset(extractedAppRoot, 'plugins-page-');
  const pluginsCardsPath = findExtractedWebviewAsset(
    extractedAppRoot,
    'plugins-cards-grid-',
  );
  const loginBundleSource = fs.readFileSync(loginBundlePath, 'utf8');
  const browserPaneAvailabilityPatches = selectBrowserPaneAvailabilityPatches(
    loginBundleSource,
    loginBundlePath,
  );

  return {
    login: summarizePatchResults(
      applyPatchesToFile(loginBundlePath, [
        {
          label: 'chatgpt login requests native external browser',
          alternatives: webviewChatGptLoginPatchAlternatives,
          marker: webviewChatGptLoginPatchMarker,
        },
        ...browserPaneAvailabilityPatches.map((patch, index) => ({
          label: `linux browser pane availability ${index + 1}`,
          target: patch.target,
          replacement: patch.replacement,
        })),
        {
          label: 'single-batch undo prefers unified diff',
          alternatives: rendererUndoUnifiedDiffPreferencePatchAlternatives,
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
    pluginsPage: summarizePatchResults(
      applyPatchesToFile(pluginsPagePath, [
        {
          label: 'apps page app connect requests native external browser',
          alternatives: pluginsPageAppConnectPatchAlternatives,
        },
        {
          label: 'apps page openInBrowser callback requests native external browser',
          alternatives: pluginsPageOpenInBrowserCallbackPatchAlternatives,
        },
        {
          label: 'apps page install url requests native external browser',
          alternatives: pluginsPageInstallUrlPatchAlternatives,
        },
        {
          label: 'apps page resolved url requests native external browser',
          alternatives: pluginsPageResolvedUrlPatchAlternatives,
        },
        {
          label: 'apps page browser fallback opens install url',
          alternatives: pluginsPageBrowserFallbackPatchAlternatives,
        },
        {
          label: 'apps page custom title menu is enabled on linux',
          alternatives: pluginsPageLinuxWindowsMenuPatchAlternatives,
          marker: pluginsPageLinuxWindowsMenuPatchMarker,
        },
      ]),
    ),
    pluginsCards: summarizePatchResults(
      applyPatchesToFile(pluginsCardsPath, [
        {
          label: 'plugin install app connect requests native external browser',
          alternatives: pluginCardsAppConnectPatchAlternatives,
        },
        {
          label: 'plugin install direct install url requests native external browser',
          alternatives: pluginCardsInstallUrlOpenPatchAlternatives,
        },
        {
          label: 'plugin install browser fallback opens install url',
          alternatives: pluginCardsBrowserFallbackPatchAlternatives,
        },
      ]),
    ),
  };
}

function patchCodexModelSettingsBundle(extractedAppRoot) {
  const modelSettingsPath = findExtractedWebviewAsset(extractedAppRoot, 'use-model-settings-');
  const modelSettingsSource = fs.readFileSync(modelSettingsPath, 'utf8');
  const hasModelSettingsSavedConfigShape = [
    ...modelSettingsSavedConfigPatchAlternatives.flatMap(({ target, replacement }) => [
      target,
      replacement,
    ]),
    modelSettingsSavedConfigPatchMarker,
  ].some((snippet) => modelSettingsSource.includes(snippet));
  const hasModelSettingsPersistShape = [
    modelSettingsPersistPatchTarget,
    modelSettingsPersistPatchedTarget,
    modelSettingsPersistNewBundleTarget,
    modelSettingsPersistPatchReplacement,
    modelSettingsPersistNewBundleReplacement,
  ].some((snippet) => modelSettingsSource.includes(snippet));

  return summarizePatchResults(
    applyPatchesToFile(modelSettingsPath, [
      ...(
        hasModelSettingsSavedConfigShape
          ? [
              {
                label: 'model settings saved-config cwd fallback',
                alternatives: modelSettingsSavedConfigPatchAlternatives,
                marker: modelSettingsSavedConfigPatchMarker,
              },
            ]
          : []
      ),
      ...(
        hasModelSettingsPersistShape
          ? [
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
                  {
                    target: modelSettingsPersistNewBundleTarget,
                    replacement: modelSettingsPersistNewBundleReplacement,
                  },
                ],
                marker: modelSettingsPersistPatchMarker,
              },
            ]
          : []
      ),
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
  prepareAssemblyOutputRoot(outputRoot);

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

  const requiredResources = ['codex', 'git', 'rg'];
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
