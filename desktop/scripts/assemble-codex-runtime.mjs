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
const bootstrapLinuxOzoneSwitchPatchPattern =
  /(?:process\.platform===`linux`&&\(process\.env\.ELECTRON_OZONE_PLATFORM_HINT=`wayland`,[\w$]+\.app\.commandLine\.appendSwitch\(`ozone-platform`,`wayland`\),[\w$]+\.app\.commandLine\.appendSwitch\(`enable-features`,`UseOzonePlatform,WaylandWindowDecorations`\),[\w$]+\.app\.commandLine\.appendSwitch\(`enable-wayland-ime`\),[\w$]+\.app\.commandLine\.appendSwitch\(`wayland-text-input-version`,`3`\)\);)?for\(let ([\w$]+) of ([\w$]+)\(\{buildFlavor:([\w$]+),env:process\.env\}\)\)([\w$]+)\.app\.commandLine\.appendSwitch\(\1\.name,\1\.value\);/;
const bootstrapLinuxOzoneSwitchPatchReplacement =
  'process.platform===`linux`&&(process.env.ELECTRON_OZONE_PLATFORM_HINT=`x11`,$4.app.commandLine.appendSwitch(`ozone-platform`,`x11`));for(let $1 of $2({buildFlavor:$3,env:process.env}))$4.app.commandLine.appendSwitch($1.name,$1.value);';
const bootstrapLinuxOzoneSwitchPatchMarker =
  'app.commandLine.appendSwitch(`ozone-platform`,`x11`)';
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
  {
    target:
      'require(`node:crypto`);let c=require(`node:child_process`);var l=`desktop.intelLaunchWarning.message`,',
    replacement:
      'require(`node:crypto`);let c=require(`node:child_process`);if(process.platform===`linux`&&typeof process.resourcesPath==`string`){let e=process.env.PATH??``,t=process.resourcesPath;e.split(`:`).includes(t)||(process.env.PATH=e?`${t}:${e}`:t)}var l=`desktop.intelLaunchWarning.message`,',
  },
  {
    target:
      'require(`node:crypto`);let s=require(`node:child_process`),c=require(`node:timers/promises`);var l=`desktop.intelLaunchWarning.message`,',
    replacement:
      'require(`node:crypto`);let s=require(`node:child_process`),c=require(`node:timers/promises`);if(process.platform===`linux`&&typeof process.resourcesPath==`string`){let e=process.env.PATH??``,t=process.resourcesPath;e.split(`:`).includes(t)||(process.env.PATH=e?`${t}:${e}`:t)}var l=`desktop.intelLaunchWarning.message`,',
  },
  {
    target:
      'require(`node:crypto`);let c=require(`node:child_process`),l=require(`node:timers/promises`);var u=`desktop.intelLaunchWarning.message`,',
    replacement:
      'require(`node:crypto`);let c=require(`node:child_process`),l=require(`node:timers/promises`);if(process.platform===`linux`&&typeof process.resourcesPath==`string`){let e=process.env.PATH??``,t=process.resourcesPath;e.split(`:`).includes(t)||(process.env.PATH=e?`${t}:${e}`:t)}var u=`desktop.intelLaunchWarning.message`,',
  },
  {
    target:
      'require(`node:crypto`);let s=require(`node:fs`);s=e.o(s);let c=require(`node:child_process`),l=require(`node:timers/promises`);var u=`desktop.intelLaunchWarning.message`,',
    replacement:
      'require(`node:crypto`);let s=require(`node:fs`);s=e.o(s);let c=require(`node:child_process`),l=require(`node:timers/promises`);if(process.platform===`linux`&&typeof process.resourcesPath==`string`){let e=process.env.PATH??``,t=process.resourcesPath;e.split(`:`).includes(t)||(process.env.PATH=e?`${t}:${e}`:t)}var u=`desktop.intelLaunchWarning.message`,',
  },
  {
    target:
      'require(`node:crypto`);let c=require(`node:fs`);c=e.o(c);let l=require(`node:child_process`),u=require(`node:timers/promises`);var d=`desktop.intelLaunchWarning.message`,',
    replacement:
      'require(`node:crypto`);let c=require(`node:fs`);c=e.o(c);let l=require(`node:child_process`),u=require(`node:timers/promises`);if(process.platform===`linux`&&typeof process.resourcesPath===`string`){let e=process.env.PATH??``,t=process.resourcesPath;e.split(`:`).includes(t)||(process.env.PATH=e?`${t}:${e}`:t)}var d=`desktop.intelLaunchWarning.message`,',
  },
  {
    target:
      'require(`node:crypto`);let c=require(`node:fs`);c=e.o(c);let l=require(`node:fs/promises`),u=require(`node:child_process`),d=require(`node:timers/promises`);var f=`desktop.intelLaunchWarning.message`,',
    replacement:
      'require(`node:crypto`);let c=require(`node:fs`);c=e.o(c);let l=require(`node:fs/promises`),u=require(`node:child_process`),d=require(`node:timers/promises`);if(process.platform===`linux`&&typeof process.resourcesPath==`string`){let e=process.env.PATH??``,t=process.resourcesPath;e.split(`:`).includes(t)||(process.env.PATH=e?`${t}:${e}`:t)}var f=`desktop.intelLaunchWarning.message`,',
  },
{
    target:
      'require("node:crypto");let c=require("node:fs");c=e.o(c);let l=require("node:fs/promises"),u=require("node:child_process"),d=require("node:timers/promises");var f=`desktop.intelLaunchWarning.message`,',
    replacement:
      'require("node:crypto");let c=require("node:fs");c=e.o(c);let l=require("node:fs/promises"),u=require("node:child_process"),d=require("node:timers/promises");if(process.platform===`linux`&&typeof process.resourcesPath==`string`){let e=process.env.PATH??``,t=process.resourcesPath;e.split(`:`).includes(t)||(process.env.PATH=e?`${t}:${e}`:t)}var f=`desktop.intelLaunchWarning.message`,',
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
  {
    target:
      'let a=this.getRequestAppServerClient(i).hostConfig,o=t.Ar(a),s=L(n??[],o).map(t=>e.Ht(t)),c=N((0,r.homedir)(),o),l=t.o(this.globalState),u=t.r(this.globalState),d=l.length>0?l:u??[],f=s&&s.length>0?s:d.filter(e=>e!==`~`).map(t=>e.Ht(t)),{origins:p}=await this.requestGitWorker({method:`git-origins`,params:{dirs:f,hostConfig:a,windowHostId:this.hostConfig.id}});',
    replacement:
      'let a=this.getRequestAppServerClient(i).hostConfig,o=t.Ar(a),s=L(n??[],o).map(t=>e.Ht(t)),c=N((0,r.homedir)(),o),l=t.o(this.globalState),u=t.r(this.globalState),d=l.length>0?l:u??[],f=(s&&s.length>0?s:d.filter(e=>e!==`~`).map(t=>e.Ht(t))).filter(t=>{try{return!!t&&o.existsSync(t)}catch{return!1}}),{origins:p}=await this.requestGitWorker({method:`git-origins`,params:{dirs:f,hostConfig:a,windowHostId:this.hostConfig.id}});',
  },
  {
    target:
      'let a=this.getRequestAppServerClient(i).hostConfig,o=t.Kr(a),s=ne(n??[],o).map(t=>e.Wt(t)),c=P((0,r.homedir)(),o),l=t.s(this.globalState),u=t.i(this.globalState),d=l.length>0?l:u??[],f=s&&s.length>0?s:d.filter(e=>e!==`~`).map(t=>e.Wt(t)),p=t.Gt(),{origins:m}=await this.requestGitWorker({method:`git-origins`,params:{dirs:f,hostConfig:a,operationSource:p.source,windowHostId:this.hostConfig.id}});',
    replacement:
      'let a=this.getRequestAppServerClient(i).hostConfig,o=t.Kr(a),s=ne(n??[],o).map(t=>e.Wt(t)),c=P((0,r.homedir)(),o),l=t.s(this.globalState),u=t.i(this.globalState),d=l.length>0?l:u??[],f=(s&&s.length>0?s:d.filter(e=>e!==`~`).map(t=>e.Wt(t))).filter(t=>{try{return!!t&&o.existsSync(t)}catch{return!1}}),p=t.Gt(),{origins:m}=await this.requestGitWorker({method:`git-origins`,params:{dirs:f,hostConfig:a,operationSource:p.source,windowHostId:this.hostConfig.id}});',
  },
  {
    target:
      'let a=this.getRequestAppServerClient(i).hostConfig,o=t.Zr(a),s=P(n??[],o).map(t=>e.fn(t)),c=N((0,r.homedir)(),o),l=t.s(this.globalState),u=t.i(this.globalState),d=l.length>0?l:u??[],f=s&&s.length>0?s:d.filter(e=>e!==`~`).map(t=>e.fn(t)),p=t.Ut(),{origins:m}=await this.requestGitWorker({method:`git-origins`,params:{dirs:f,hostConfig:a,operationSource:p.source}});',
    replacement:
      'let a=this.getRequestAppServerClient(i).hostConfig,o=t.Zr(a),s=P(n??[],o).map(t=>e.fn(t)),c=N((0,r.homedir)(),o),l=t.s(this.globalState),u=t.i(this.globalState),d=l.length>0?l:u??[],f=(s&&s.length>0?s:d.filter(e=>e!==`~`).map(t=>e.fn(t))).filter(t=>{try{return!!t&&o.existsSync(t)}catch{return!1}}),p=t.Ut(),{origins:m}=await this.requestGitWorker({method:`git-origins`,params:{dirs:f,hostConfig:a,operationSource:p.source}});',
  },
  {
    target:
      'let a=this.getRequestAppServerClient(i).hostConfig,s=n.Pr(a),c=oe(e??[],s).map(e=>t.hn(e)),l=P((0,o.homedir)(),s),u=r.s(this.globalState),d=r.i(this.globalState),f=u.length>0?u:d??[],p=c&&c.length>0?c:f.filter(e=>e!==`~`).map(e=>t.hn(e)),m=n.ut(),{origins:h}=await this.requestGitWorker({method:`git-origins`,params:{dirs:p,hostConfig:a,operationSource:m.source}});',
    replacement:
      'let a=this.getRequestAppServerClient(i).hostConfig,s=n.Pr(a),c=oe(e??[],s).map(e=>t.hn(e)),l=P((0,o.homedir)(),s),u=r.s(this.globalState),d=r.i(this.globalState),f=u.length>0?u:d??[],p=(c&&c.length>0?c:f.filter(e=>e!==`~`).map(e=>t.hn(e))).filter(e=>{try{return!!e&&s.existsSync(e)}catch{return!1}}),m=n.ut(),{origins:h}=await this.requestGitWorker({method:`git-origins`,params:{dirs:p,hostConfig:a,operationSource:m.source}});',
  },
  {
    target:
      'let a=this.getRequestAppServerClient(r).hostConfig,o=t.Rr(a),s=re(e??[],o).map(e=>t.xa(e)),c=P((0,i.homedir)(),o),l=n.s(this.globalState),u=n.i(this.globalState),d=l.length>0?l:u??[],f=s&&s.length>0?s:d.filter(e=>e!==`~`).map(e=>t.xa(e)),p=t.ft(),{origins:m}=await this.requestGitWorker({method:`git-origins`,params:{dirs:f,hostConfig:a,operationSource:p.source}});',
    replacement:
      'let a=this.getRequestAppServerClient(r).hostConfig,o=t.Rr(a),s=re(e??[],o).map(e=>t.xa(e)),c=P((0,i.homedir)(),o),l=n.s(this.globalState),u=n.i(this.globalState),d=l.length>0?l:u??[],f=(s&&s.length>0?s:d.filter(e=>e!==`~`).map(e=>t.xa(e))).filter(e=>{try{return!!e&&o.existsSync(e)}catch{return!1}}),p=t.ft(),{origins:m}=await this.requestGitWorker({method:`git-origins`,params:{dirs:f,hostConfig:a,operationSource:p.source}});',
  },
  {
    target:
      'let i=this.getRequestAppServerClient(n).hostConfig,a=t.Hr(i),s=re(e??[],a).map(e=>t.ja(e)),c=F((0,o.homedir)(),a),l=r.s(this.globalState),u=r.i(this.globalState),d=l.length>0?l:u??[],f=s&&s.length>0?s:d.filter(e=>e!==`~`).map(e=>t.ja(e)),p=t.mt(),{origins:m}=await this.requestGitWorker({method:`git-origins`,params:{dirs:f,hostConfig:i,operationSource:p.source}});',
    replacement:
      'let i=this.getRequestAppServerClient(n).hostConfig,a=t.Hr(i),s=re(e??[],a).map(e=>t.ja(e)),c=F((0,o.homedir)(),a),l=r.s(this.globalState),u=r.i(this.globalState),d=l.length>0?l:u??[],f=(s&&s.length>0?s:d.filter(e=>e!==`~`).map(e=>t.ja(e))).filter(e=>{try{return!!e&&a.existsSync(e)}catch{return!1}}),p=t.mt(),{origins:m}=await this.requestGitWorker({method:`git-origins`,params:{dirs:f,hostConfig:i,operationSource:p.source}});',
  },
  {
    target:
      'let i=this.getRequestAppServerClient(n).hostConfig,a=t.Zr(i),s=re(e??[],a).map(e=>t.Ya(e)),c=L((0,o.homedir)(),a),l=r.s(this.globalState),u=r.i(this.globalState),d=l.length>0?l:u??[],f=s&&s.length>0?s:d.filter(e=>e!==`~`).map(e=>t.Ya(e)),p=t.pt(),{origins:m}=await this.requestGitWorker({method:`git-origins`,params:{dirs:f,hostConfig:i,operationSource:p.source}});',
    replacement:
      'let i=this.getRequestAppServerClient(n).hostConfig,a=t.Zr(i),s=re(e??[],a).map(e=>t.Ya(e)),c=L((0,o.homedir)(),a),l=r.s(this.globalState),u=r.i(this.globalState),d=l.length>0?l:u??[],f=(s&&s.length>0?s:d.filter(e=>e!==`~`).map(e=>t.Ya(e))).filter(e=>{try{return!!e&&a.existsSync(e)}catch{return!1}}),p=t.pt(),{origins:m}=await this.requestGitWorker({method:`git-origins`,params:{dirs:f,hostConfig:i,operationSource:p.source}});',
  },
  {
    target:
      'let i=this.getRequestAppServerClient(n).hostConfig,a=t.Qr(i),s=re(e??[],a).map(e=>t.Xa(e)),c=L((0,o.homedir)(),a),l=r.s(this.globalState),u=r.i(this.globalState),d=l.length>0?l:u??[],f=s&&s.length>0?s:d.filter(e=>e!==`~`).map(e=>t.Xa(e)),p=t.pt(),{origins:m}=await this.requestGitWorker({method:`git-origins`,params:{dirs:f,hostConfig:i,operationSource:p.source}});',
    replacement:
      'let i=this.getRequestAppServerClient(n).hostConfig,a=t.Qr(i),s=re(e??[],a).map(e=>t.Xa(e)),c=L((0,o.homedir)(),a),l=r.s(this.globalState),u=r.i(this.globalState),d=l.length>0?l:u??[],f=(s&&s.length>0?s:d.filter(e=>e!==`~`).map(e=>t.Xa(e))).filter(e=>{try{return!!e&&a.existsSync(e)}catch{return!1}}),p=t.pt(),{origins:m}=await this.requestGitWorker({method:`git-origins`,params:{dirs:f,hostConfig:i,operationSource:p.source}});',
  },
  {
    target:
      'let r=this.getRequestAppServerClient(t).hostConfig,i=n.ui(r),a=ie(e??[],i).map(e=>n.so(e)),o=z((0,l.homedir)(),i),s=it(this.globalState),c=rt(this.globalState),u=s.length>0?s:c??[],d=a&&a.length>0?a:u.filter(e=>e!==`~`).map(e=>n.so(e)),f=n.ht(),{origins:p}=await this.requestGitWorker({method:`git-origins`,params:{dirs:d,hostConfig:r,operationSource:f.source}});',
    replacement:
      'let r=this.getRequestAppServerClient(t).hostConfig,i=n.ui(r),a=ie(e??[],i).map(e=>n.so(e)),o=z((0,l.homedir)(),i),s=it(this.globalState),c=rt(this.globalState),u=s.length>0?s:c??[],d=(a&&a.length>0?a:u.filter(e=>e!==`~`).map(e=>n.so(e))).filter(e=>{try{return!!e&&i.existsSync(e)}catch{return!1}}),f=n.ht(),{origins:p}=await this.requestGitWorker({method:`git-origins`,params:{dirs:d,hostConfig:r,operationSource:f.source}});',
  },
  {
    target:
      'let r=this.getRequestAppServerClient(t).hostConfig,i=n.bi(r),a=ce(e??[],i).map(e=>n.So(e)),o=z((0,u.homedir)(),i),s=lt(this.globalState).roots,c=st(this.globalState),l=s.length>0?s:c??[],d=a&&a.length>0?a:l.filter(e=>e!==`~`).map(e=>n.So(e)),f=n.bt(),{origins:p}=await this.requestGitWorker({method:`git-origins`,params:{dirs:d,hostConfig:r,operationSource:f.source}});',
    replacement:
      'let r=this.getRequestAppServerClient(t).hostConfig,i=n.bi(r),a=ce(e??[],i).map(e=>n.So(e)),o=z((0,u.homedir)(),i),s=lt(this.globalState).roots,c=st(this.globalState),l=s.length>0?s:c??[],d=(a&&a.length>0?a:l.filter(e=>e!==`~`).map(e=>n.So(e))).filter(e=>{try{return!!e&&i.existsSync(e)}catch{return!1}}),f=n.bt(),{origins:p}=await this.requestGitWorker({method:`git-origins`,params:{dirs:d,hostConfig:r,operationSource:f.source}});',
  },
  {
    target:
      'let r=this.getRequestAppServerClient(t).hostConfig,i=n.xi(r),a=le(e??[],i).map(e=>n.Co(e)),o=R((0,u.homedir)(),i),s=lt(this.globalState).roots,c=st(this.globalState),l=s.length>0?s:c??[],d=a&&a.length>0?a:l.filter(e=>e!==`~`).map(e=>n.Co(e)),f=n.xt(),{origins:p}=await this.requestGitWorker({method:`git-origins`,params:{dirs:d,hostConfig:r,operationSource:f.source}});',
    replacement:
      'let r=this.getRequestAppServerClient(t).hostConfig,i=n.xi(r),a=le(e??[],i).map(e=>n.Co(e)),o=R((0,u.homedir)(),i),s=lt(this.globalState).roots,c=st(this.globalState),l=s.length>0?s:c??[],d=(a&&a.length>0?a:l.filter(e=>e!==`~`).map(e=>n.Co(e))).filter(e=>{try{return!!e&&i.existsSync(e)}catch{return!1}}),f=n.xt(),{origins:p}=await this.requestGitWorker({method:`git-origins`,params:{dirs:d,hostConfig:r,operationSource:f.source}});',
  },
  {
    target:
      'let r=this.getRequestAppServerClient(t).hostConfig,i=n.xi(r),a=le(e??[],i).map(e=>n.Co(e)),o=B((0,d.homedir)(),i),s=ut(this.globalState).roots,c=ct(this.globalState),l=s.length>0?s:c??[],u=a&&a.length>0?a:l.filter(e=>e!==`~`).map(e=>n.Co(e)),f=n.xt(),{origins:p}=await this.requestGitWorker({method:`git-origins`,params:{dirs:u,hostConfig:r,operationSource:f.source}});',
    replacement:
      'let r=this.getRequestAppServerClient(t).hostConfig,i=n.xi(r),a=le(e??[],i).map(e=>n.Co(e)),o=B((0,d.homedir)(),i),s=ut(this.globalState).roots,c=ct(this.globalState),l=s.length>0?s:c??[],u=(a&&a.length>0?a:l.filter(e=>e!==`~`).map(e=>n.Co(e))).filter(e=>{try{return!!e&&i.existsSync(e)}catch{return!1}}),f=n.xt(),{origins:p}=await this.requestGitWorker({method:`git-origins`,params:{dirs:u,hostConfig:r,operationSource:f.source}});',
  },
  {
    target:
      'let r=this.getRequestAppServerClient(t).hostConfig,i=n.xi(r),a=de(e??[],i).map(e=>n.Fo(e)),o=B((0,d.homedir)(),i),s=this.localProjectsManager.getAllRootPaths(),c=this.localProjectsManager.getSelectedRootPaths(),l=s.length>0?s:c??[],u=a&&a.length>0?a:l.filter(e=>e!==`~`).map(e=>n.Fo(e)),f=n.X(),{origins:p}=await this.requestGitWorker({method:`git-origins`,params:{dirs:u,hostConfig:r,operationSource:f.source}});',
    replacement:
      'let r=this.getRequestAppServerClient(t).hostConfig,i=n.xi(r),a=de(e??[],i).map(e=>n.Fo(e)),o=B((0,d.homedir)(),i),s=this.localProjectsManager.getAllRootPaths(),c=this.localProjectsManager.getSelectedRootPaths(),l=s.length>0?s:c??[],u=(a&&a.length>0?a:l.filter(e=>e!==`~`).map(e=>n.Fo(e))).filter(e=>{try{return!!e&&i.existsSync(e)}catch{return!1}}),f=n.X(),{origins:p}=await this.requestGitWorker({method:`git-origins`,params:{dirs:u,hostConfig:r,operationSource:f.source}});',
  },
  {
    target:
      'let r=this.getRequestAppServerClient(t).hostConfig,i=n.xi(r),a=de(e??[],i).map(e=>n.Fo(e)),o=B((0,d.homedir)(),i),s=this.localProjectsManager.getAllRootPaths(),c=this.localProjectsManager.getSelectedRootPaths(),l=s.length>0?s:c??[],u=a&&a.length>0?a:l.filter(e=>e!==`~`).map(e=>n.Fo(e)),f=n.Z(),{origins:p}=await this.requestGitWorker({method:`git-origins`,params:{dirs:u,hostConfig:r,operationSource:f.source}});',
    replacement:
      'let r=this.getRequestAppServerClient(t).hostConfig,i=n.xi(r),a=de(e??[],i).map(e=>n.Fo(e)),o=B((0,d.homedir)(),i),s=this.localProjectsManager.getAllRootPaths(),c=this.localProjectsManager.getSelectedRootPaths(),l=s.length>0?s:c??[],u=(a&&a.length>0?a:l.filter(e=>e!==`~`).map(e=>n.Fo(e))).filter(e=>{try{return!!e&&i.existsSync(e)}catch{return!1}}),f=n.Z(),{origins:p}=await this.requestGitWorker({method:`git-origins`,params:{dirs:u,hostConfig:r,operationSource:f.source}});',
  },
  {
    target:
      'let r=this.getRequestAppServerClient(t).hostConfig,i=n.fi(r),a=bn(e??[],i).map(e=>n.ao(e)),o=z((0,d.homedir)(),i),s=this.localProjectsManager.getAllRootPaths(),c=this.localProjectsManager.getSelectedRootPaths(),l=s.length>0?s:c??[],u=a&&a.length>0?a:l.filter(e=>e!==`~`).map(e=>n.ao(e)),f=n.U(),{origins:p}=await this.requestGitWorker({method:`git-origins`,params:{dirs:u,hostConfig:r,operationSource:f.source}});',
    replacement:
      'let r=this.getRequestAppServerClient(t).hostConfig,i=n.fi(r),a=bn(e??[],i).map(e=>n.ao(e)),o=z((0,d.homedir)(),i),s=this.localProjectsManager.getAllRootPaths(),c=this.localProjectsManager.getSelectedRootPaths(),l=s.length>0?s:c??[],u=(a&&a.length>0?a:l.filter(e=>e!==`~`).map(e=>n.ao(e))).filter(e=>{try{return!!e&&i.existsSync(e)}catch{return!1}}),f=n.U(),{origins:p}=await this.requestGitWorker({method:`git-origins`,params:{dirs:u,hostConfig:r,operationSource:f.source}});',
  },
  {
    target:
      'let r=this.getRequestAppServerClient(t).hostConfig,i=n.ai(r),a=bn(e??[],i).map(e=>n.Qa(e)),o=_n((0,d.homedir)(),i),s=this.localProjectsManager.getAllRootPaths(),c=this.localProjectsManager.getSelectedRootPaths(),l=s.length>0?s:c??[],u=a&&a.length>0?a:l.filter(e=>e!==`~`).map(e=>n.Qa(e)),f=n.U(),{origins:p}=await this.requestGitWorker({method:`git-origins`,params:{dirs:u,hostConfig:r,operationSource:f.source}});',
    replacement:
      'let r=this.getRequestAppServerClient(t).hostConfig,i=n.ai(r),a=bn(e??[],i).map(e=>n.Qa(e)),o=_n((0,d.homedir)(),i),s=this.localProjectsManager.getAllRootPaths(),c=this.localProjectsManager.getSelectedRootPaths(),l=s.length>0?s:c??[],u=(a&&a.length>0?a:l.filter(e=>e!==`~`).map(e=>n.Qa(e))).filter(e=>{try{return!!e&&i.existsSync(e)}catch{return!1}}),f=n.U(),{origins:p}=await this.requestGitWorker({method:`git-origins`,params:{dirs:u,hostConfig:r,operationSource:f.source}});',
  },
  {
    target:
      'let r=this.getRequestAppServerClient(t).hostConfig,i=n.si(r),a=xn(e??[],i).map(e=>n.no(e)),o=V((0,d.homedir)(),i),s=a&&a.length>0?a:this.localProjectsManager.getAllRootPaths().filter(e=>e!==`~`).map(e=>n.no(e)),c=n.U(),{origins:l}=await this.requestGitWorker({method:`git-origins`,params:{dirs:s,hostConfig:r,operationSource:c.source}});',
    replacement:
      'let r=this.getRequestAppServerClient(t).hostConfig,i=n.si(r),a=xn(e??[],i).map(e=>n.no(e)),o=V((0,d.homedir)(),i),s=(a&&a.length>0?a:this.localProjectsManager.getAllRootPaths().filter(e=>e!==`~`).map(e=>n.no(e))).filter(e=>{try{return!!e&&i.existsSync(e)}catch{return!1}}),c=n.U(),{origins:l}=await this.requestGitWorker({method:`git-origins`,params:{dirs:s,hostConfig:r,operationSource:c.source}});',
  },
];
const mainGitOriginsPatchMarker =
  '.filter(t=>{try{return!!t&&a.existsSync(t)}catch{return!1}}),{origins:f}';
const mainOpenInBrowserPatchAlternatives = [
  {
    target:
      'try{let e=s,t=new URL(s);return t.protocol===`https:`&&t.hostname===`chatgpt.com`&&(t.searchParams.set(`no_universal_links`,`1`),e=t.toString()),await c.shell.openExternal(e),!0}catch(e){return u(e),!1}',
    replacement:
      'try{let e=s,t=new URL(s);if(t.protocol===`https:`&&t.hostname===`chatgpt.com`&&(t.searchParams.set(`no_universal_links`,`1`),e=t.toString()),process.platform===`linux`){let t=require(`../../scripts/linux-browser-launch.js`),n=await t.openUrlWithLinuxBrowserSession(e);n.launched||await c.shell.openExternal(e)}else await c.shell.openExternal(e);return!0}catch(e){return u(e),!1}',
  },
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
  {
    target:
      'case`open-in-browser`:{let{url:e}=i;if(i.useExternalBrowser===!0){if(typeof e==`string`&&qu(e))try{await n.shell.openExternal(e)}catch(e){X().error(`Open-in-browser failed`,{safe:{},sensitive:{error:e}})}else X().warning(`Open-in-browser received invalid url`);break}if(typeof e==`string`&&lT(e))try{if(Ku({browserPaneEnabled:de().browserPane,link:{type:`url`,url:e}})){r.send(H,{open:!0,type:`toggle-browser-panel`,url:e});break}await n.shell.openExternal(e)}catch(e){X().error(`Open-in-browser failed`,{safe:{},sensitive:{error:e}})}else X().warning(`Open-in-browser received invalid url`);break}',
    replacement:
      'case`open-in-browser`:{let{url:e}=i;if(i.useExternalBrowser===!0){if(typeof e==`string`&&qu(e))try{if(process.platform===`linux`){let i=require(`../../scripts/linux-browser-launch.js`),a=await i.openUrlWithLinuxBrowserSession(e);if(!a.launched){a.error&&X().warning(`Linux browser session launch failed; falling back to shell.openExternal`,{safe:{code:a.code??null},sensitive:{error:a.error}}),await n.shell.openExternal(e)}}else await n.shell.openExternal(e)}catch(e){X().error(`Open-in-browser failed`,{safe:{},sensitive:{error:e}})}else X().warning(`Open-in-browser received invalid url`);break}if(typeof e==`string`&&lT(e))try{if(Ku({browserPaneEnabled:de().browserPane,link:{type:`url`,url:e}})){r.send(H,{open:!0,type:`toggle-browser-panel`,url:e});break}await n.shell.openExternal(e)}catch(e){X().error(`Open-in-browser failed`,{safe:{},sensitive:{error:e}})}else X().warning(`Open-in-browser received invalid url`);break}',
  },
  {
    target:
      'case`open-in-browser`:{let{url:e}=i;if(i.useExternalBrowser===!0){if(typeof e==`string`&&Yu(e))try{await n.shell.openExternal(e)}catch(e){Z().error(`Open-in-browser failed`,{safe:{},sensitive:{error:e}})}else Z().warning(`Open-in-browser received invalid url`);break}if(typeof e==`string`&&dT(e))try{if(Ju({browserPaneEnabled:de().browserPane,link:{type:`url`,url:e}})){r.send(U,{open:!0,type:`toggle-browser-panel`,url:e});break}await n.shell.openExternal(e)}catch(e){Z().error(`Open-in-browser failed`,{safe:{},sensitive:{error:e}})}else Z().warning(`Open-in-browser received invalid url`);break}',
    replacement:
      'case`open-in-browser`:{let{url:e}=i;if(i.useExternalBrowser===!0){if(typeof e==`string`&&Yu(e))try{if(process.platform===`linux`){let i=require(`../../scripts/linux-browser-launch.js`),a=await i.openUrlWithLinuxBrowserSession(e);if(!a.launched){a.error&&Z().warning(`Linux browser session launch failed; falling back to shell.openExternal`,{safe:{code:a.code??null},sensitive:{error:a.error}}),await n.shell.openExternal(e)}}else await n.shell.openExternal(e)}catch(e){Z().error(`Open-in-browser failed`,{safe:{},sensitive:{error:e}})}else Z().warning(`Open-in-browser received invalid url`);break}if(typeof e==`string`&&dT(e))try{if(Ju({browserPaneEnabled:de().browserPane,link:{type:`url`,url:e}})){r.send(U,{open:!0,type:`toggle-browser-panel`,url:e});break}await n.shell.openExternal(e)}catch(e){Z().error(`Open-in-browser failed`,{safe:{},sensitive:{error:e}})}else Z().warning(`Open-in-browser received invalid url`);break}',
  },
  {
    target:
      'case`open-in-browser`:{let{url:e}=i;if(typeof e==`string`&&this.windowManager.queueCodexDeepLinkUrl(e,i.originHostId))break;if(i.useExternalBrowser===!0){if(typeof e==`string`&&nm(e))try{await n.shell.openExternal(e)}catch(e){$().error(`Open-in-browser failed`,{safe:{},sensitive:{error:e}})}else $().warning(`Open-in-browser received invalid url`);break}if(typeof e==`string`&&Cz(e))try{if(tm({browserPaneEnabled:ge().browserPane,link:{type:`url`,url:e}})){r.send(L,{open:!0,type:`toggle-browser-panel`,url:e,source:i.source??`manual`,initiator:i.initiator??`open_in_browser_bridge`});break}await n.shell.openExternal(e)}catch(e){$().error(`Open-in-browser failed`,{safe:{},sensitive:{error:e}})}else $().warning(`Open-in-browser received invalid url`);break}',
    replacement:
      'case`open-in-browser`:{let{url:e}=i;if(typeof e==`string`&&this.windowManager.queueCodexDeepLinkUrl(e,i.originHostId))break;if(i.useExternalBrowser===!0){if(typeof e==`string`&&nm(e))try{if(process.platform===`linux`){let i=require(`../../scripts/linux-browser-launch.js`),a=await i.openUrlWithLinuxBrowserSession(e);if(!a.launched){a.error&&$().warning(`Linux browser session launch failed; falling back to shell.openExternal`,{safe:{code:a.code??null},sensitive:{error:a.error}}),await n.shell.openExternal(e)}}else await n.shell.openExternal(e)}catch(e){$().error(`Open-in-browser failed`,{safe:{},sensitive:{error:e}})}else $().warning(`Open-in-browser received invalid url`);break}if(typeof e==`string`&&Cz(e))try{if(tm({browserPaneEnabled:ge().browserPane,link:{type:`url`,url:e}})){r.send(L,{open:!0,type:`toggle-browser-panel`,url:e,source:i.source??`manual`,initiator:i.initiator??`open_in_browser_bridge`});break}await n.shell.openExternal(e)}catch(e){$().error(`Open-in-browser failed`,{safe:{},sensitive:{error:e}})}else $().warning(`Open-in-browser received invalid url`);break}',
  },
  {
    target:
      'case`open-in-browser`:{let{url:e}=i;if(typeof e==`string`&&this.windowManager.queueCodexDeepLinkUrl(e,i.originHostId))break;if(i.useExternalBrowser===!0){if(typeof e==`string`&&gh(e))try{await n.shell.openExternal(e)}catch(e){$().error(`Open-in-browser failed`,{safe:{},sensitive:{error:e}})}else $().warning(`Open-in-browser received invalid url`);break}if(typeof e==`string`&&hV(e))try{if(hh({browserPaneEnabled:ve().browserPane,link:{type:`url`,url:e}})){r.send(F,{open:!0,type:`toggle-browser-panel`,url:e,source:i.source??`manual`,initiator:i.initiator??`open_in_browser_bridge`});break}await n.shell.openExternal(e)}catch(e){$().error(`Open-in-browser failed`,{safe:{},sensitive:{error:e}})}else $().warning(`Open-in-browser received invalid url`);break}',
    replacement:
      'case`open-in-browser`:{let{url:e}=i;if(typeof e==`string`&&this.windowManager.queueCodexDeepLinkUrl(e,i.originHostId))break;if(i.useExternalBrowser===!0){if(typeof e==`string`&&gh(e))try{if(process.platform===`linux`){let i=require(`../../scripts/linux-browser-launch.js`),a=await i.openUrlWithLinuxBrowserSession(e);if(!a.launched){a.error&&$().warning(`Linux browser session launch failed; falling back to shell.openExternal`,{safe:{code:a.code??null},sensitive:{error:a.error}}),await n.shell.openExternal(e)}}else await n.shell.openExternal(e)}catch(e){$().error(`Open-in-browser failed`,{safe:{},sensitive:{error:e}})}else $().warning(`Open-in-browser received invalid url`);break}if(typeof e==`string`&&hV(e))try{if(hh({browserPaneEnabled:ve().browserPane,link:{type:`url`,url:e}})){r.send(F,{open:!0,type:`toggle-browser-panel`,url:e,source:i.source??`manual`,initiator:i.initiator??`open_in_browser_bridge`});break}await n.shell.openExternal(e)}catch(e){$().error(`Open-in-browser failed`,{safe:{},sensitive:{error:e}})}else $().warning(`Open-in-browser received invalid url`);break}',
  },
  {
    target:
      'case`open-in-browser`:{let{url:t}=i;if(typeof t==`string`&&this.windowManager.queueCodexDeepLinkUrl(t,i.originHostId))break;if(i.useExternalBrowser===!0){if(typeof t==`string`&&_v(t))try{await a.shell.openExternal(t)}catch(e){$().error(`Open-in-browser failed`,{safe:{},sensitive:{error:e}})}else $().warning(`Open-in-browser received invalid url`);break}if(typeof t==`string`&&eG(t))try{if(gv({browserPaneEnabled:Be().browserPane,link:{type:`url`,url:t}})){e.send(F,{type:`toggle-browser-panel`,open:!0,url:t,hostId:i.hostId,source:i.source??`manual`,initiator:i.initiator??`open_in_browser_bridge`});break}await a.shell.openExternal(t)}catch(e){$().error(`Open-in-browser failed`,{safe:{},sensitive:{error:e}})}else $().warning(`Open-in-browser received invalid url`);break}',
    replacement:
      'case`open-in-browser`:{let{url:t}=i;if(typeof t==`string`&&this.windowManager.queueCodexDeepLinkUrl(t,i.originHostId))break;if(i.useExternalBrowser===!0){if(typeof t==`string`&&_v(t))try{if(process.platform===`linux`){let i=require(`../../scripts/linux-browser-launch.js`),o=await i.openUrlWithLinuxBrowserSession(t);if(!o.launched){o.error&&$().warning(`Linux browser session launch failed; falling back to shell.openExternal`,{safe:{code:o.code??null},sensitive:{error:o.error}}),await a.shell.openExternal(t)}}else await a.shell.openExternal(t)}catch(e){$().error(`Open-in-browser failed`,{safe:{},sensitive:{error:e}})}else $().warning(`Open-in-browser received invalid url`);break}if(typeof t==`string`&&eG(t))try{if(gv({browserPaneEnabled:Be().browserPane,link:{type:`url`,url:t}})){e.send(F,{type:`toggle-browser-panel`,open:!0,url:t,hostId:i.hostId,source:i.source??`manual`,initiator:i.initiator??`open_in_browser_bridge`});break}await a.shell.openExternal(t)}catch(e){$().error(`Open-in-browser failed`,{safe:{},sensitive:{error:e}})}else $().warning(`Open-in-browser received invalid url`);break}',
  },
  {
    target:
      'case`open-in-browser`:{let{url:t}=i;if(typeof t==`string`&&this.windowManager.queueCodexDeepLinkUrl(t,i.originHostId))break;if(i.useExternalBrowser===!0){if(typeof t==`string`&&Xy(t))try{await r.shell.openExternal(t)}catch(e){$().error(`Open-in-browser failed`,{safe:{},sensitive:{error:e}})}else $().warning(`Open-in-browser received invalid url`);break}if(typeof t==`string`&&tq(t))try{if(Yy({browserPaneEnabled:Re().browserPane,link:{type:`url`,url:t}})){e.send(I,{type:`toggle-browser-panel`,open:!0,url:t,hostId:i.hostId,source:i.source??`manual`,initiator:i.initiator??`open_in_browser_bridge`});break}await r.shell.openExternal(t)}catch(e){$().error(`Open-in-browser failed`,{safe:{},sensitive:{error:e}})}else $().warning(`Open-in-browser received invalid url`);break}',
    replacement:
      'case`open-in-browser`:{let{url:t}=i;if(typeof t==`string`&&this.windowManager.queueCodexDeepLinkUrl(t,i.originHostId))break;if(i.useExternalBrowser===!0){if(typeof t==`string`&&Xy(t))try{if(process.platform===`linux`){let i=require(`../../scripts/linux-browser-launch.js`),a=await i.openUrlWithLinuxBrowserSession(t);if(!a.launched){a.error&&$().warning(`Linux browser session launch failed; falling back to shell.openExternal`,{safe:{code:a.code??null},sensitive:{error:a.error}}),await r.shell.openExternal(t)}}else await r.shell.openExternal(t)}catch(e){$().error(`Open-in-browser failed`,{safe:{},sensitive:{error:e}})}else $().warning(`Open-in-browser received invalid url`);break}if(typeof t==`string`&&tq(t))try{if(Yy({browserPaneEnabled:Re().browserPane,link:{type:`url`,url:t}})){e.send(I,{type:`toggle-browser-panel`,open:!0,url:t,hostId:i.hostId,source:i.source??`manual`,initiator:i.initiator??`open_in_browser_bridge`});break}await r.shell.openExternal(t)}catch(e){$().error(`Open-in-browser failed`,{safe:{},sensitive:{error:e}})}else $().warning(`Open-in-browser received invalid url`);break}',
  },
  {
    target:
      'case`open-in-browser`:{let{url:r}=n;if(typeof r==`string`&&this.windowManager.queueCodexDeepLinkUrl(r,n.originHostId))break;if(n.useExternalBrowser===!0||n.openTarget===`external-browser`){if(typeof r==`string`&&Lx(r))try{await a.shell.openExternal(r)}catch(e){$().error(`Open-in-browser failed`,{safe:{},sensitive:{error:e}})}else $().warning(`Open-in-browser received invalid url`);break}if(typeof r==`string`&&Px(r))try{let i=He(),o=this.settingsStore?.getEffective(t.bi.openLinkInTargetPreference.key)??t.bi.openLinkInTargetPreference.default,s=this.settingsStore?.getEffective(t.bi.openLocalUrlInTargetPreference.key)??t.bi.openLocalUrlInTargetPreference.default,c=oZ(n.initiator),l=n.openTarget==null&&n.disposition===`new-tab`&&c,d=n.openTarget??(l?sZ(o):o),f=n.openTarget??(l?sZ(s):s);if(Fx({browserPaneEnabled:i.browserPane,link:{type:`url`,url:r},openLinkInTargetPreference:d,openLocalUrlInTargetPreference:f,webLinksDefaultInAppBrowser:n.openTarget===`in-app-browser`||i.linksDefaultInAppBrowser&&c})){e.send(R,{type:`toggle-browser-panel`,...n.disposition===`new-tab`?{browserTabId:t.gs(`manual:${(0,u.randomUUID)()}`)}:{},open:!0,url:r,hostId:n.hostId,source:n.source??`manual`,initiator:n.initiator??`open_in_browser_bridge`});break}await a.shell.openExternal(r)}catch(e){$().error(`Open-in-browser failed`,{safe:{},sensitive:{error:e}})}else $().warning(`Open-in-browser received invalid url`);break}',
    replacement:
      'case`open-in-browser`:{let{url:r}=n;if(typeof r==`string`&&this.windowManager.queueCodexDeepLinkUrl(r,n.originHostId))break;if(n.useExternalBrowser===!0||n.openTarget===`external-browser`){if(typeof r==`string`&&Lx(r))try{if(process.platform===`linux`){let i=require(`../../scripts/linux-browser-launch.js`),o=await i.openUrlWithLinuxBrowserSession(r);if(!o.launched){o.error&&$().warning(`Linux browser session launch failed; falling back to shell.openExternal`,{safe:{code:o.code??null},sensitive:{error:o.error}}),await a.shell.openExternal(r)}}else await a.shell.openExternal(r)}catch(e){$().error(`Open-in-browser failed`,{safe:{},sensitive:{error:e}})}else $().warning(`Open-in-browser received invalid url`);break}if(typeof r==`string`&&Px(r))try{let i=He(),o=this.settingsStore?.getEffective(t.bi.openLinkInTargetPreference.key)??t.bi.openLinkInTargetPreference.default,s=this.settingsStore?.getEffective(t.bi.openLocalUrlInTargetPreference.key)??t.bi.openLocalUrlInTargetPreference.default,c=oZ(n.initiator),l=n.openTarget==null&&n.disposition===`new-tab`&&c,d=n.openTarget??(l?sZ(o):o),f=n.openTarget??(l?sZ(s):s);if(Fx({browserPaneEnabled:i.browserPane,link:{type:`url`,url:r},openLinkInTargetPreference:d,openLocalUrlInTargetPreference:f,webLinksDefaultInAppBrowser:n.openTarget===`in-app-browser`||i.linksDefaultInAppBrowser&&c})){e.send(R,{type:`toggle-browser-panel`,...n.disposition===`new-tab`?{browserTabId:t.gs(`manual:${(0,u.randomUUID)()}`)}:{},open:!0,url:r,hostId:n.hostId,source:n.source??`manual`,initiator:n.initiator??`open_in_browser_bridge`});break}await a.shell.openExternal(r)}catch(e){$().error(`Open-in-browser failed`,{safe:{},sensitive:{error:e}})}else $().warning(`Open-in-browser received invalid url`);break}',
  },
  {
    target:
      'try{let e=c,t=new URL(c);return t.protocol===`https:`&&t.hostname===`chatgpt.com`&&(t.searchParams.set(`no_universal_links`,`1`),e=t.toString()),await a.shell.openExternal(e),!0}catch(e){return d(e),!1}',
    replacement:
      'try{let e=c,n=new URL(c);if(n.protocol===`https:`&&n.hostname===`chatgpt.com`&&(n.searchParams.set(`no_universal_links`,`1`),e=n.toString()),process.platform===`linux`){let n=require(`../../scripts/linux-browser-launch.js`),r=await n.openUrlWithLinuxBrowserSession(e);return r.launched||(r.error&&XA().warning(`Linux browser session launch failed; falling back to shell.openExternal`,{safe:{code:r.code??null},sensitive:{error:r.error}}),await a.shell.openExternal(e)),!0}return await a.shell.openExternal(e),!0}catch(e){return d(e),!1}',
  },
  {
    target:
      'return await c.shell.openExternal(t),!0}catch(e){return d(e),!1}}function $A',
    replacement:
      'if(process.platform===`linux`){let e=require(`../../scripts/linux-browser-launch.js`),n=await e.openUrlWithLinuxBrowserSession(t);return n.launched||(n.error&&WA().warning(`Linux browser session launch failed; falling back to shell.openExternal`,{safe:{code:n.code??null},sensitive:{error:n.error}}),await c.shell.openExternal(t)),!0}return await c.shell.openExternal(t),!0}catch(e){return d(e),!1}}function $A',
  },
  {
    target:
      'return await l.shell.openExternal(t),!0}catch(e){return d(e),!1}}function QA',
    replacement:
      'if(process.platform===`linux`){let e=require(`../../scripts/linux-browser-launch.js`),n=await e.openUrlWithLinuxBrowserSession(t);return n.launched||(n.error&&UA().warning(`Linux browser session launch failed; falling back to shell.openExternal`,{safe:{code:n.code??null},sensitive:{error:n.error}}),await l.shell.openExternal(t)),!0}return await l.shell.openExternal(t),!0}catch(e){return d(e),!1}}function QA',
  },
  {
    target:
      'try{let e=c,t=new URL(c);return t.protocol===`https:`&&t.hostname===`chatgpt.com`&&(t.searchParams.set(`no_universal_links`,`1`),e=t.toString()),!y&&v!=null&&await fj(v,u,c)||await l.shell.openExternal(e),!0}catch(e){return d(e),!1}',
    replacement:
      'try{let e=c,t=new URL(c);if(t.protocol===`https:`&&t.hostname===`chatgpt.com`&&(t.searchParams.set(`no_universal_links`,`1`),e=t.toString()),!y&&v!=null&&await fj(v,u,c))return!0;if(process.platform===`linux`){let t=require(`../../scripts/linux-browser-launch.js`),n=await t.openUrlWithLinuxBrowserSession(e);n.launched||await l.shell.openExternal(e)}else await l.shell.openExternal(e);return!0}catch(e){return d(e),!1}',
  },  {
    target:
      'try{let e=c;return x.protocol===`https:`&&x.hostname===`chatgpt.com`&&(x.searchParams.set(`no_universal_links`,`1`),e=x.toString()),!y&&v!=null&&await PN(v,u,c)||await l.shell.openExternal(e),!0}catch(e){return d(e),!1}',
    replacement:
      'try{let e=c;if(x.protocol===`https:`&&x.hostname===`chatgpt.com`&&(x.searchParams.set(`no_universal_links`,`1`),e=x.toString()),!y&&v!=null&&await PN(v,u,c))return!0;if(process.platform===`linux`){let t=require(`../../scripts/linux-browser-launch.js`),n=await t.openUrlWithLinuxBrowserSession(e);n.launched||await l.shell.openExternal(e)}else await l.shell.openExternal(e);return!0}catch(e){return d(e),!1}',
  },
  {
    target:
      'try{let e=c;return x.protocol===`https:`&&x.hostname===`chatgpt.com`&&(x.searchParams.set(`no_universal_links`,`1`),e=x.toString()),!y&&v!=null&&await HN(v,u,c)||await l.shell.openExternal(e),!0}catch(e){return d(e),!1}',
    replacement:
      'try{let e=c;if(x.protocol===`https:`&&x.hostname===`chatgpt.com`&&(x.searchParams.set(`no_universal_links`,`1`),e=x.toString()),!y&&v!=null&&await HN(v,u,c))return!0;if(process.platform===`linux`){let t=require(`../../scripts/linux-browser-launch.js`),n=await t.openUrlWithLinuxBrowserSession(e);n.launched||await l.shell.openExternal(e)}else await l.shell.openExternal(e);return!0}catch(e){return d(e),!1}',
  },
  {
    target:
      'try{let e=c;return x.protocol===`https:`&&x.hostname===`chatgpt.com`&&(x.searchParams.set(`no_universal_links`,`1`),e=x.toString()),!y&&v!=null&&await YN(v,u,c)||await l.shell.openExternal(e),!0}catch(e){return d(e),!1}}function qN',
    replacement:
      'try{let e=c;if(x.protocol===`https:`&&x.hostname===`chatgpt.com`&&(x.searchParams.set(`no_universal_links`,`1`),e=x.toString()),!y&&v!=null&&await YN(v,u,c))return!0;if(process.platform===`linux`){let t=require(`../../scripts/linux-browser-launch.js`),n=await t.openUrlWithLinuxBrowserSession(e);n.launched||(n.error&&RN().warning(`Linux browser session launch failed; falling back to shell.openExternal`,{safe:{code:n.code??null},sensitive:{error:n.error}}),await l.shell.openExternal(e))}else await l.shell.openExternal(e);return!0}catch(e){return d(e),!1}}function qN',
  },

];
const mainOpenInBrowserPatchMarker = 'openUrlWithLinuxBrowserSession';
const mainLinuxOpaqueWindowPatchAlternatives = [
  {
    target:
      'function I9({platform:e,appearance:t,opaqueWindowSurfaceEnabled:n,prefersDarkColors:r}){return n?{backgroundColor:r?Kwe:qwe,backgroundMaterial:e===`win32`?`none`:null}:e===`win32`&&!F9(t)?{backgroundColor:O9,backgroundMaterial:`mica`}:{backgroundColor:O9,backgroundMaterial:null}}',
    replacement:
      'function I9({platform:e,appearance:t,opaqueWindowSurfaceEnabled:n,prefersDarkColors:r}){if(n)return{backgroundColor:r?Kwe:qwe,backgroundMaterial:e===`win32`?`none`:null};if(e===`win32`&&!F9(t))return{backgroundColor:O9,backgroundMaterial:`mica`};if(e===`linux`&&!F9(t))return{backgroundColor:r?Kwe:qwe,backgroundMaterial:null};return{backgroundColor:O9,backgroundMaterial:null}}',
  },
  {
    target:
      'function L9({platform:e,appearance:t,opaqueWindowSurfaceEnabled:n,prefersDarkColors:r}){return n?{backgroundColor:r?_ne:vne,backgroundMaterial:e===`win32`?`none`:null}:e===`win32`&&!I9(t)?{backgroundColor:k9,backgroundMaterial:`mica`}:{backgroundColor:k9,backgroundMaterial:null}}',
    replacement:
      'function L9({platform:e,appearance:t,opaqueWindowSurfaceEnabled:n,prefersDarkColors:r}){if(n)return{backgroundColor:r?_ne:vne,backgroundMaterial:e===`win32`?`none`:null};if(e===`win32`&&!I9(t))return{backgroundColor:k9,backgroundMaterial:`mica`};if(e===`linux`&&!I9(t))return{backgroundColor:r?_ne:vne,backgroundMaterial:null};return{backgroundColor:k9,backgroundMaterial:null}}',
  },
  {
    target:
      'function L9({platform:e,appearance:t,opaqueWindowSurfaceEnabled:n,prefersDarkColors:r}){return n?{backgroundColor:r?hne:gne,backgroundMaterial:e===`win32`?`none`:null}:e===`win32`&&!I9(t)?{backgroundColor:k9,backgroundMaterial:`mica`}:{backgroundColor:k9,backgroundMaterial:null}}',
    replacement:
      'function L9({platform:e,appearance:t,opaqueWindowSurfaceEnabled:n,prefersDarkColors:r}){if(n)return{backgroundColor:r?hne:gne,backgroundMaterial:e===`win32`?`none`:null};if(e===`win32`&&!I9(t))return{backgroundColor:k9,backgroundMaterial:`mica`};if(e===`linux`&&!I9(t))return{backgroundColor:r?hne:gne,backgroundMaterial:null};return{backgroundColor:k9,backgroundMaterial:null}}',
  },
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
  {
    target:
      'function jM({platform:e,appearance:t,opaqueWindowsEnabled:n,prefersDarkColors:r}){return e===`win32`&&!OM(t)?n?{backgroundColor:r?lM:uM,backgroundMaterial:`none`}:{backgroundColor:cM,backgroundMaterial:`mica`}:{backgroundColor:cM,backgroundMaterial:null}}',
    replacement:
      'function jM({platform:e,appearance:t,opaqueWindowsEnabled:n,prefersDarkColors:r}){if(e===`win32`&&!OM(t))return n?{backgroundColor:r?lM:uM,backgroundMaterial:`none`}:{backgroundColor:cM,backgroundMaterial:`mica`};if(e===`linux`&&!OM(t))return{backgroundColor:r?lM:uM,backgroundMaterial:null};return{backgroundColor:cM,backgroundMaterial:null}}',
  },
  {
    target:
      'function PM({platform:e,appearance:t,opaqueWindowsEnabled:n,prefersDarkColors:r}){return e===`win32`&&!jM(t)?n?{backgroundColor:r?fM:pM,backgroundMaterial:`none`}:{backgroundColor:dM,backgroundMaterial:`mica`}:{backgroundColor:dM,backgroundMaterial:null}}',
    replacement:
      'function PM({platform:e,appearance:t,opaqueWindowsEnabled:n,prefersDarkColors:r}){if(e===`win32`&&!jM(t))return n?{backgroundColor:r?fM:pM,backgroundMaterial:`none`}:{backgroundColor:dM,backgroundMaterial:`mica`};if(e===`linux`&&!jM(t))return{backgroundColor:r?fM:pM,backgroundMaterial:null};return{backgroundColor:dM,backgroundMaterial:null}}',
  },
  {
    target:
      'function Tq({platform:e,appearance:t,opaqueWindowsEnabled:n,prefersDarkColors:r}){return n&&!Sq(t)&&(e===`darwin`||e===`win32`)?{backgroundColor:r?rq:iq,backgroundMaterial:e===`win32`?`none`:null}:e===`win32`&&!Sq(t)?{backgroundColor:nq,backgroundMaterial:`mica`}:{backgroundColor:nq,backgroundMaterial:null}}',
    replacement:
      'function Tq({platform:e,appearance:t,opaqueWindowsEnabled:n,prefersDarkColors:r}){if(n&&!Sq(t)&&(e===`darwin`||e===`win32`))return{backgroundColor:r?rq:iq,backgroundMaterial:e===`win32`?`none`:null};if(e===`win32`&&!Sq(t))return{backgroundColor:nq,backgroundMaterial:`mica`};if(e===`linux`&&!Sq(t))return{backgroundColor:r?rq:iq,backgroundMaterial:null};return{backgroundColor:nq,backgroundMaterial:null}}',
  },
  {
    target:
      'function zY({platform:e,appearance:t,opaqueWindowsEnabled:n,prefersDarkColors:r}){return n&&!FY(t)&&(e===`darwin`||e===`win32`)?{backgroundColor:r?mY:hY,backgroundMaterial:e===`win32`?`none`:null}:e===`win32`&&!FY(t)?{backgroundColor:pY,backgroundMaterial:`mica`}:{backgroundColor:pY,backgroundMaterial:null}}',
    replacement:
      'function zY({platform:e,appearance:t,opaqueWindowsEnabled:n,prefersDarkColors:r}){if(n&&!FY(t)&&(e===`darwin`||e===`win32`))return{backgroundColor:r?mY:hY,backgroundMaterial:e===`win32`?`none`:null};if(e===`win32`&&!FY(t))return{backgroundColor:pY,backgroundMaterial:`mica`};if(e===`linux`&&!FY(t))return{backgroundColor:r?mY:hY,backgroundMaterial:null};return{backgroundColor:pY,backgroundMaterial:null}}',
  },
  {
    target:
      'function A2({platform:e,appearance:t,opaqueWindowsEnabled:n,prefersDarkColors:r}){return n&&!w2(t)&&(e===`darwin`||e===`win32`)?{backgroundColor:r?$0:e2,backgroundMaterial:e===`win32`?`none`:null}:e===`win32`&&!w2(t)?{backgroundColor:Q0,backgroundMaterial:`mica`}:{backgroundColor:Q0,backgroundMaterial:null}}',
    replacement:
      'function A2({platform:e,appearance:t,opaqueWindowsEnabled:n,prefersDarkColors:r}){if(n&&!w2(t)&&(e===`darwin`||e===`win32`))return{backgroundColor:r?$0:e2,backgroundMaterial:e===`win32`?`none`:null};if(e===`win32`&&!w2(t))return{backgroundColor:Q0,backgroundMaterial:`mica`};if(e===`linux`&&!w2(t))return{backgroundColor:r?$0:e2,backgroundMaterial:null};return{backgroundColor:Q0,backgroundMaterial:null}}',
  },
  {
    target:
      'function B6({platform:e,appearance:t,opaqueWindowSurfaceEnabled:n,prefersDarkColors:r}){return n?{backgroundColor:r?l6:u6,backgroundMaterial:e===`win32`?`none`:null}:e===`win32`&&!P6(t)?{backgroundColor:c6,backgroundMaterial:`mica`}:{backgroundColor:c6,backgroundMaterial:null}}',
    replacement:
      'function B6({platform:e,appearance:t,opaqueWindowSurfaceEnabled:n,prefersDarkColors:r}){if(n)return{backgroundColor:r?l6:u6,backgroundMaterial:e===`win32`?`none`:null};if(e===`win32`&&!P6(t))return{backgroundColor:c6,backgroundMaterial:`mica`};if(e===`linux`&&!P6(t))return{backgroundColor:r?l6:u6,backgroundMaterial:null};return{backgroundColor:c6,backgroundMaterial:null}}',
  },
  {
    target:
      'function v5({platform:e,appearance:t,opaqueWindowSurfaceEnabled:n,prefersDarkColors:r}){return n?{backgroundColor:r?V8:H8,backgroundMaterial:e===`win32`?`none`:null}:e===`win32`&&!f5(t)?{backgroundColor:B8,backgroundMaterial:`mica`}:{backgroundColor:B8,backgroundMaterial:null}}',
    replacement:
      'function v5({platform:e,appearance:t,opaqueWindowSurfaceEnabled:n,prefersDarkColors:r}){if(n)return{backgroundColor:r?V8:H8,backgroundMaterial:e===`win32`?`none`:null};if(e===`win32`&&!f5(t))return{backgroundColor:B8,backgroundMaterial:`mica`};if(e===`linux`&&!f5(t))return{backgroundColor:r?V8:H8,backgroundMaterial:null};return{backgroundColor:B8,backgroundMaterial:null}}',
  },
  {
    target:
      'function A9({platform:e,appearance:t,opaqueWindowSurfaceEnabled:n,prefersDarkColors:r}){return n?{backgroundColor:r?$7:e9,backgroundMaterial:e===`win32`?`none`:null}:e===`win32`&&!w9(t)?{backgroundColor:Q7,backgroundMaterial:`mica`}:{backgroundColor:Q7,backgroundMaterial:null}}',
    replacement:
      'function A9({platform:e,appearance:t,opaqueWindowSurfaceEnabled:n,prefersDarkColors:r}){if(n)return{backgroundColor:r?$7:e9,backgroundMaterial:e===`win32`?`none`:null};if(e===`win32`&&!w9(t))return{backgroundColor:Q7,backgroundMaterial:`mica`};if(e===`linux`&&!w9(t))return{backgroundColor:r?$7:e9,backgroundMaterial:null};return{backgroundColor:Q7,backgroundMaterial:null}}',
  },
  {
    target:
      'function O9({platform:e,appearance:t,opaqueWindowSurfaceEnabled:n,prefersDarkColors:r}){return n?{backgroundColor:r?Z7:Q7,backgroundMaterial:e===`win32`?`none`:null}:e===`win32`&&!S9(t)?{backgroundColor:X7,backgroundMaterial:`mica`}:{backgroundColor:X7,backgroundMaterial:null}}',
    replacement:
      'function O9({platform:e,appearance:t,opaqueWindowSurfaceEnabled:n,prefersDarkColors:r}){if(n)return{backgroundColor:r?Z7:Q7,backgroundMaterial:e===`win32`?`none`:null};if(e===`win32`&&!S9(t))return{backgroundColor:X7,backgroundMaterial:`mica`};if(e===`linux`&&!S9(t))return{backgroundColor:r?Z7:Q7,backgroundMaterial:null};return{backgroundColor:X7,backgroundMaterial:null}}',
  },
  {
    target:
      'function L9({platform:e,appearance:t,opaqueWindowSurfaceEnabled:n,prefersDarkColors:r}){return n?{backgroundColor:r?xie:Sie,backgroundMaterial:e===`win32`?`none`:null}:e===`win32`&&!I9(t)?{backgroundColor:k9,backgroundMaterial:`mica`}:{backgroundColor:k9,backgroundMaterial:null}}',
    replacement:
      'function L9({platform:e,appearance:t,opaqueWindowSurfaceEnabled:n,prefersDarkColors:r}){if(n)return{backgroundColor:r?xie:Sie,backgroundMaterial:e===`win32`?`none`:null};if(e===`win32`&&!I9(t))return{backgroundColor:k9,backgroundMaterial:`mica`};if(e===`linux`&&!I9(t))return{backgroundColor:r?xie:Sie,backgroundMaterial:null};return{backgroundColor:k9,backgroundMaterial:null}}',
  },
  {
    target:
      'function L9({platform:e,appearance:t,opaqueWindowSurfaceEnabled:n,prefersDarkColors:r}){return n?{backgroundColor:r?bie:xie,backgroundMaterial:e===`win32`?`none`:null}:e===`win32`&&!I9(t)?{backgroundColor:k9,backgroundMaterial:`mica`}:{backgroundColor:k9,backgroundMaterial:null}}',
    replacement:
      'function L9({platform:e,appearance:t,opaqueWindowSurfaceEnabled:n,prefersDarkColors:r}){if(n)return{backgroundColor:r?bie:xie,backgroundMaterial:e===`win32`?`none`:null};if(e===`win32`&&!I9(t))return{backgroundColor:k9,backgroundMaterial:`mica`};if(e===`linux`&&!I9(t))return{backgroundColor:r?bie:xie,backgroundMaterial:null};return{backgroundColor:k9,backgroundMaterial:null}}',
  },
  {
    target:
      'function L9({platform:e,appearance:t,opaqueWindowSurfaceEnabled:n,prefersDarkColors:r}){return n?{backgroundColor:r?Qye:$ye,backgroundMaterial:e===`win32`?`none`:null}:e===`win32`&&!I9(t)?{backgroundColor:k9,backgroundMaterial:`mica`}:{backgroundColor:k9,backgroundMaterial:null}}',
    replacement:
      'function L9({platform:e,appearance:t,opaqueWindowSurfaceEnabled:n,prefersDarkColors:r}){if(n)return{backgroundColor:r?Qye:$ye,backgroundMaterial:e===`win32`?`none`:null};if(e===`win32`&&!I9(t))return{backgroundColor:k9,backgroundMaterial:`mica`};if(e===`linux`&&!I9(t))return{backgroundColor:r?Qye:$ye,backgroundMaterial:null};return{backgroundColor:k9,backgroundMaterial:null}}',
  },  {
    target:
      'function I9({platform:e,appearance:t,opaqueWindowSurfaceEnabled:n,prefersDarkColors:r}){return n?{backgroundColor:r?iwe:awe,backgroundMaterial:e===`win32`?`none`:null}:e===`win32`&&!F9(t)?{backgroundColor:O9,backgroundMaterial:`mica`}:{backgroundColor:O9,backgroundMaterial:null}}',
    replacement:
      'function I9({platform:e,appearance:t,opaqueWindowSurfaceEnabled:n,prefersDarkColors:r}){if(n)return{backgroundColor:r?iwe:awe,backgroundMaterial:e===`win32`?`none`:null};if(e===`win32`&&!F9(t))return{backgroundColor:O9,backgroundMaterial:`mica`};if(e===`linux`&&!F9(t))return{backgroundColor:r?iwe:awe,backgroundMaterial:null};return{backgroundColor:O9,backgroundMaterial:null}}',
  },
  {
    target:
      'function I9({platform:e,appearance:t,opaqueWindowSurfaceEnabled:n,prefersDarkColors:r}){return n?{backgroundColor:r?wTe:TTe,backgroundMaterial:e===`win32`?`none`:null}:e===`win32`&&!F9(t)?{backgroundColor:O9,backgroundMaterial:`mica`}:{backgroundColor:O9,backgroundMaterial:null}}',
    replacement:
      'function I9({platform:e,appearance:t,opaqueWindowSurfaceEnabled:n,prefersDarkColors:r}){if(n)return{backgroundColor:r?wTe:TTe,backgroundMaterial:e===`win32`?`none`:null};if(e===`win32`&&!F9(t))return{backgroundColor:O9,backgroundMaterial:`mica`};if(e===`linux`&&!F9(t))return{backgroundColor:r?wTe:TTe,backgroundMaterial:null};return{backgroundColor:O9,backgroundMaterial:null}}',
  },

];
const mainLinuxOpaqueWindowPatchMarker = 'backgroundMaterial:`mica`};if(e===`linux`&&';
const mainLinuxTitleBarOverlayColorPatchAlternatives = [
  {
    target:
      'function A9(e=1){return{color:O9,symbolColor:l.nativeTheme.shouldUseDarkColors?aTe:iTe,height:Math.round(rTe*e)}}',
    replacement:
      'function A9(e=1){return process.platform===`linux`?{color:`#2b2f36`,symbolColor:`#ffffff`,height:Math.round(rTe*e)}:{color:O9,symbolColor:l.nativeTheme.shouldUseDarkColors?aTe:iTe,height:Math.round(rTe*e)}}',
  },
  {
    target:
      'function A9(e=1){return{color:O9,symbolColor:l.nativeTheme.shouldUseDarkColors?LTe:ITe,height:Math.round(FTe*e)}}',
    replacement:
      'function A9(e=1){return process.platform===`linux`?{color:`#2b2f36`,symbolColor:`#ffffff`,height:Math.round(FTe*e)}:{color:O9,symbolColor:l.nativeTheme.shouldUseDarkColors?LTe:ITe,height:Math.round(FTe*e)}}',
  },
  {
    target:
      'function j9(e=1){return{color:k9,symbolColor:c.nativeTheme.shouldUseDarkColors?Ane:kne,height:Math.round(One*e)}}',
    replacement:
      'function j9(e=1){return process.platform===`linux`?{color:`#2b2f36`,symbolColor:`#ffffff`,height:Math.round(One*e)}:{color:k9,symbolColor:c.nativeTheme.shouldUseDarkColors?Ane:kne,height:Math.round(One*e)}}',
  },
  {
    target:
      'function j9(e=1){return{color:k9,symbolColor:c.nativeTheme.shouldUseDarkColors?One:Dne,height:Math.round(Ene*e)}}',
    replacement:
      'function j9(e=1){return process.platform===`linux`?{color:`#2b2f36`,symbolColor:`#ffffff`,height:Math.round(Ene*e)}:{color:k9,symbolColor:c.nativeTheme.shouldUseDarkColors?One:Dne,height:Math.round(Ene*e)}}',
  },
  {
    target:
      'function ow(){return{color:XC,symbolColor:n.nativeTheme.shouldUseDarkColors?aw:iw,height:rw}}',
    replacement:
      'function ow(){return process.platform===`linux`?{color:`#2b2f36`,symbolColor:`#ffffff`,height:rw}:{color:XC,symbolColor:n.nativeTheme.shouldUseDarkColors?aw:iw,height:rw}}',
  },
  {
    target:
      'function vM(){return{color:cM,symbolColor:n.nativeTheme.shouldUseDarkColors?_M:gM,height:hM}}',
    replacement:
      'function vM(){return process.platform===`linux`?{color:`#2b2f36`,symbolColor:`#ffffff`,height:hM}:{color:cM,symbolColor:n.nativeTheme.shouldUseDarkColors?_M:gM,height:hM}}',
  },
  {
    target:
      'function xM(){return{color:dM,symbolColor:n.nativeTheme.shouldUseDarkColors?bM:yM,height:vM}}',
    replacement:
      'function xM(){return process.platform===`linux`?{color:`#2b2f36`,symbolColor:`#ffffff`,height:vM}:{color:dM,symbolColor:n.nativeTheme.shouldUseDarkColors?bM:yM,height:vM}}',
  },
  {
    target:
      'function fq(){return{color:nq,symbolColor:n.nativeTheme.shouldUseDarkColors?dq:uq,height:lq}}',
    replacement:
      'function fq(){return process.platform===`linux`?{color:`#2b2f36`,symbolColor:`#ffffff`,height:lq}:{color:nq,symbolColor:n.nativeTheme.shouldUseDarkColors?dq:uq,height:lq}}',
  },
  {
    target:
      'function TY(){return{color:pY,symbolColor:n.nativeTheme.shouldUseDarkColors?wY:CY,height:SY}}',
    replacement:
      'function TY(){return process.platform===`linux`?{color:`#2b2f36`,symbolColor:`#ffffff`,height:SY}:{color:pY,symbolColor:n.nativeTheme.shouldUseDarkColors?wY:CY,height:SY}}',
  },
  {
    target:
      'function m2(e=1){return{color:Q0,symbolColor:a.nativeTheme.shouldUseDarkColors?f2:d2,height:Math.round(u2*e)}}',
    replacement:
      'function m2(e=1){return process.platform===`linux`?{color:`#2b2f36`,symbolColor:`#ffffff`,height:Math.round(u2*e)}:{color:Q0,symbolColor:a.nativeTheme.shouldUseDarkColors?f2:d2,height:Math.round(u2*e)}}',
  },
  {
    target:
      'function w6(e=1){return{color:c6,symbolColor:r.nativeTheme.shouldUseDarkColors?S6:x6,height:Math.round(b6*e)}}',
    replacement:
      'function w6(e=1){return process.platform===`linux`?{color:`#2b2f36`,symbolColor:`#ffffff`,height:Math.round(b6*e)}:{color:c6,symbolColor:r.nativeTheme.shouldUseDarkColors?S6:x6,height:Math.round(b6*e)}}',
  },
  {
    target:
      'function m9(e=1){return{color:Q7,symbolColor:a.nativeTheme.shouldUseDarkColors?f9:d9,height:Math.round(u9*e)}}',
    replacement:
      'function m9(e=1){return process.platform===`linux`?{color:`#2b2f36`,symbolColor:`#ffffff`,height:Math.round(u9*e)}:{color:Q7,symbolColor:a.nativeTheme.shouldUseDarkColors?f9:d9,height:Math.round(u9*e)}}',
  },
  {
    target:
      'function f9(e=1){return{color:X7,symbolColor:a.nativeTheme.shouldUseDarkColors?u9:l9,height:Math.round(c9*e)}}',
    replacement:
      'function f9(e=1){return process.platform===`linux`?{color:`#2b2f36`,symbolColor:`#ffffff`,height:Math.round(c9*e)}:{color:X7,symbolColor:a.nativeTheme.shouldUseDarkColors?u9:l9,height:Math.round(c9*e)}}',
  },
  {
    target:
      'function j9(e=1){return{color:k9,symbolColor:c.nativeTheme.shouldUseDarkColors?Pie:Nie,height:Math.round(Mie*e)}}',
    replacement:
      'function j9(e=1){return process.platform===`linux`?{color:`#2b2f36`,symbolColor:`#ffffff`,height:Math.round(Mie*e)}:{color:k9,symbolColor:c.nativeTheme.shouldUseDarkColors?Pie:Nie,height:Math.round(Mie*e)}}',
  },
  {
    target:
      'function j9(e=1){return{color:k9,symbolColor:l.nativeTheme.shouldUseDarkColors?Nie:Mie,height:Math.round(jie*e)}}',
    replacement:
      'function j9(e=1){return process.platform===`linux`?{color:`#2b2f36`,symbolColor:`#ffffff`,height:Math.round(jie*e)}:{color:k9,symbolColor:l.nativeTheme.shouldUseDarkColors?Nie:Mie,height:Math.round(jie*e)}}',
  },
  {
    target:
      'function j9(e=1){return{color:k9,symbolColor:l.nativeTheme.shouldUseDarkColors?dbe:ube,height:Math.round(lbe*e)}}',
    replacement:
      'function j9(e=1){return process.platform===`linux`?{color:`#2b2f36`,symbolColor:`#ffffff`,height:Math.round(lbe*e)}:{color:k9,symbolColor:l.nativeTheme.shouldUseDarkColors?dbe:ube,height:Math.round(lbe*e)}}',
  },  {
    target:
      'function A9(e=1){return{color:O9,symbolColor:l.nativeTheme.shouldUseDarkColors?_we:gwe,height:Math.round(hwe*e)}}',
    replacement:
      'function A9(e=1){return process.platform===`linux`?{color:`#2b2f36`,symbolColor:`#ffffff`,height:Math.round(hwe*e)}:{color:O9,symbolColor:l.nativeTheme.shouldUseDarkColors?_we:gwe,height:Math.round(hwe*e)}}',
  },

];
const mainLinuxTitleBarOverlayColorPatchMarker =
  'process.platform===`linux`?{color:`#2b2f36`,symbolColor:`#ffffff`,height:';
const mainLinuxTitleBarOverlayUpdatePatchAlternatives = [
  {
    target:
      'installWindowsTitleBarOverlaySync(e,t){if(process.platform!==`win32`||t!==`primary`)return;',
    replacement:
      'installWindowsTitleBarOverlaySync(e,t){if(process.platform!==`win32`&&process.platform!==`linux`||t!==`primary`)return;',
  },
];
const mainLinuxTitleBarOverlayUpdatePatchMarker =
  'installApplicationMenuTitleBarOverlaySync(e,t){if(process.platform!==`win32`&&process.platform!==`linux`';
const mainLinuxPrimaryTitleBarPatchAlternatives = [
  {
    target: 'n===`win32`?{titleBarStyle:`hidden`,titleBarOverlay:ow()}:{titleBarStyle:`default`}',
    replacement:
      'n===`win32`||n===`linux`?{titleBarStyle:`hidden`,titleBarOverlay:ow()}:{titleBarStyle:`default`}',
  },
  {
    target: 'n===`win32`?{titleBarStyle:`hidden`,titleBarOverlay:vM()}:{titleBarStyle:`default`}',
    replacement:
      'n===`win32`||n===`linux`?{titleBarStyle:`hidden`,titleBarOverlay:vM()}:{titleBarStyle:`default`}',
  },
  {
    target: 'n===`win32`?{titleBarStyle:`hidden`,titleBarOverlay:xM()}:{titleBarStyle:`default`}',
    replacement:
      'n===`win32`||n===`linux`?{titleBarStyle:`hidden`,titleBarOverlay:xM()}:{titleBarStyle:`default`}',
  },
  {
    target: 'n===`win32`?{titleBarStyle:`hidden`,titleBarOverlay:fq()}:{titleBarStyle:`default`}',
    replacement:
      'n===`win32`||n===`linux`?{titleBarStyle:`hidden`,titleBarOverlay:fq()}:{titleBarStyle:`default`}',
  },
  {
    target: 'n===`win32`?{titleBarStyle:`hidden`,titleBarOverlay:TY()}:{titleBarStyle:`default`}',
    replacement:
      'n===`win32`||n===`linux`?{titleBarStyle:`hidden`,titleBarOverlay:TY()}:{titleBarStyle:`default`}',
  },
  {
    target: 'n===`win32`?{titleBarStyle:`hidden`,titleBarOverlay:m2(r)}:{titleBarStyle:`default`}',
    replacement:
      'n===`win32`||n===`linux`?{titleBarStyle:`hidden`,titleBarOverlay:m2(r)}:{titleBarStyle:`default`}',
  },
  {
    target:
      'n===`win32`||n===`linux`?{titleBarStyle:`hidden`,titleBarOverlay:w6(r)}:{titleBarStyle:`default`}',
    replacement:
      'n===`win32`||n===`linux`?{titleBarStyle:`hidden`,titleBarOverlay:w6(r)}:{titleBarStyle:`default`}',
  },
  {
    target:
      'n===`win32`||n===`linux`?{titleBarStyle:`hidden`,titleBarOverlay:n5(r)}:{titleBarStyle:`default`}',
    replacement:
      'n===`win32`||n===`linux`?{titleBarStyle:`hidden`,titleBarOverlay:n5(r)}:{titleBarStyle:`default`}',
  },
  {
    target:
      'n===`win32`||n===`linux`?{titleBarStyle:`hidden`,titleBarOverlay:m9(r)}:{titleBarStyle:`default`}',
    replacement:
      'n===`win32`||n===`linux`?{titleBarStyle:`hidden`,titleBarOverlay:m9(r)}:{titleBarStyle:`default`}',
  },
];
const mainLinuxPrimaryTitleBarPatchMarker =
  'n===`win32`||n===`linux`?{titleBarStyle:`hidden`,titleBarOverlay:';
const mainLinuxTitleBarOverlaySyncSkipPatchAlternatives = [
  {
    target:
      'installWindowsTitleBarOverlaySync(e,t){if(process.platform!==`win32`&&process.platform!==`linux`||t!==`primary`)return;',
    replacement:
      'installWindowsTitleBarOverlaySync(e,t){if(process.platform!==`win32`&&process.platform!==`linux`||t!==`primary`)return;',
  },
  {
    target:
      'installWindowsTitleBarOverlaySync(e,t){if(process.platform!==`win32`||t!==`primary`)return;',
    replacement:
      'installWindowsTitleBarOverlaySync(e,t){if(process.platform!==`win32`&&process.platform!==`linux`||t!==`primary`)return;',
  },
  {
    target:
      'installApplicationMenuTitleBarOverlaySync(e,t){if(process.platform!==`win32`&&process.platform!==`linux`||t!==`primary`)return;',
    replacement:
      'installApplicationMenuTitleBarOverlaySync(e,t){if(process.platform!==`win32`&&process.platform!==`linux`||t!==`primary`)return;',
  },
  {
    target:
      'installApplicationMenuTitleBarOverlaySync(e,t){if(process.platform!==`win32`||t!==`primary`)return;',
    replacement:
      'installApplicationMenuTitleBarOverlaySync(e,t){if(process.platform!==`win32`&&process.platform!==`linux`||t!==`primary`)return;',
  },
];
const mainLinuxTitleBarOverlaySyncSkipPatchMarker =
  'installApplicationMenuTitleBarOverlaySync(e,t){if(process.platform!==`win32`&&process.platform!==`linux`';
const mainLinuxPrimaryWindowFocusablePatchAlternatives = [
  {
    target:
      'backgroundColor:A,show:s,parent:f,...m===void 0?{}:{focusable:m},...process.platform===`win32`||process.platform===`linux`?{autoHideMenuBar:!0}:{}',
    replacement:
      'backgroundColor:A,show:s,parent:f,focusable:m??!0,...process.platform===`win32`||process.platform===`linux`?{autoHideMenuBar:!0}:{}',
  },
  {
    target:
      'focusable:m,...process.platform===`win32`||process.platform===`linux`?{autoHideMenuBar:!0}:{}',
    replacement:
      'focusable:m??!0,...process.platform===`win32`||process.platform===`linux`?{autoHideMenuBar:!0}:{}',
  },
  {
    target:
      'backgroundColor:A,show:s,parent:f,...p===void 0?{}:{focusable:p},...process.platform===`win32`||process.platform===`linux`?{autoHideMenuBar:!0}:{}',
    replacement:
      'backgroundColor:A,show:s,parent:f,focusable:p??!0,...process.platform===`win32`||process.platform===`linux`?{autoHideMenuBar:!0}:{}',
  },
  {
    target:
      'backgroundColor:A,show:s,parent:d,...p===void 0?{}:{focusable:p},...process.platform===`win32`||process.platform===`linux`?{autoHideMenuBar:!0}:{}',
    replacement:
      'backgroundColor:A,show:s,parent:d,focusable:p??!0,...process.platform===`win32`||process.platform===`linux`?{autoHideMenuBar:!0}:{}',
  },
  {
    target:
      'backgroundColor:j,show:s,parent:d,...f===void 0?{}:{focusable:f},...process.platform===`win32`||process.platform===`linux`?{autoHideMenuBar:!0}:{}',
    replacement:
      'backgroundColor:j,show:s,parent:d,focusable:f??!0,...process.platform===`win32`||process.platform===`linux`?{autoHideMenuBar:!0}:{}',
  },  {
    target:
      'backgroundColor:M,show:s,parent:d,...f===void 0?{}:{focusable:f},...process.platform===`win32`||process.platform===`linux`?{autoHideMenuBar:!0}:{}',
    replacement:
      'backgroundColor:M,show:s,parent:d,focusable:f??!0,...process.platform===`win32`||process.platform===`linux`?{autoHideMenuBar:!0}:{}',
  },

];
const mainLinuxPrimaryWindowFocusablePatchMarker = 'focusable:m??!0';
const mainLinuxShowWindowFocusPatchAlternatives = [
  {
    target:
      'e.focus(),t?.focusComposer===!0&&this.sendMessageToWindow(e,{type:`focus-composer`}),n&&e.setAlwaysOnTop(!1),!0',
    replacement:
      'e.focus(),e.webContents?.focus?.(),t?.focusComposer===!0&&this.sendMessageToWindow(e,{type:`focus-composer`}),n&&e.setAlwaysOnTop(!1),!0',
  },
  {
    target: 'e.focus(),n&&e.setAlwaysOnTop(!1),!0',
    replacement: 'e.focus(),e.webContents?.focus?.(),n&&e.setAlwaysOnTop(!1),!0',
  },
];
const mainLinuxShowWindowFocusPatchMarker = 'e.webContents?.focus?.()';
const mainLinuxReadyToShowFocusPatchAlternatives = [
  {
    target:
      'N.once(`ready-to-show`,()=>{O9().info(`window ready-to-show`,{safe:{hostId:v,windowId:N.id,webContentsId:N.webContents.id,appearance:o,startupElapsedMs:Date.now()-g}})})',
    replacement:
      'N.once(`ready-to-show`,()=>{O9().info(`window ready-to-show`,{safe:{hostId:v,windowId:N.id,webContentsId:N.webContents.id,appearance:o,startupElapsedMs:Date.now()-g}}),o===`primary`&&!N.isDestroyed()&&(N.focus(),N.webContents.focus())})',
  },
  {
    target:
      'M.once(`ready-to-show`,()=>{O9().info(`window ready-to-show`,{safe:{hostId:_,windowId:M.id,webContentsId:M.webContents.id,appearance:o,startupElapsedMs:Date.now()-g}})})',
    replacement:
      'M.once(`ready-to-show`,()=>{O9().info(`window ready-to-show`,{safe:{hostId:_,windowId:M.id,webContentsId:M.webContents.id,appearance:o,startupElapsedMs:Date.now()-g}}),o===`primary`&&!M.isDestroyed()&&(M.focus(),M.webContents.focus())})',
  },
  {
    target:
      'M.once(`ready-to-show`,()=>{O9().info(`window ready-to-show`,{safe:{hostId:_,windowId:M.id,webContentsId:M.webContents.id,appearance:o,startupElapsedMs:Date.now()-h}})})',
    replacement:
      'M.once(`ready-to-show`,()=>{O9().info(`window ready-to-show`,{safe:{hostId:_,windowId:M.id,webContentsId:M.webContents.id,appearance:o,startupElapsedMs:Date.now()-h}}),o===`primary`&&!M.isDestroyed()&&(M.focus(),M.webContents.focus())})',
  },
  {
    target:
      'M.once(`ready-to-show`,()=>{J7().info(`window ready-to-show`,{safe:{hostId:_,windowId:M.id,webContentsId:M.webContents.id,appearance:c,startupElapsedMs:Date.now()-g}})})',
    replacement:
      'M.once(`ready-to-show`,()=>{J7().info(`window ready-to-show`,{safe:{hostId:_,windowId:M.id,webContentsId:M.webContents.id,appearance:c,startupElapsedMs:Date.now()-g}}),c===`primary`&&!M.isDestroyed()&&(M.focus(),M.webContents.focus())})',
  },
  {
    target:
      'M.once(`ready-to-show`,()=>{K7().info(`window ready-to-show`,{safe:{hostId:_,windowId:M.id,webContentsId:M.webContents.id,appearance:c,startupElapsedMs:Date.now()-g}})})',
    replacement:
      'M.once(`ready-to-show`,()=>{K7().info(`window ready-to-show`,{safe:{hostId:_,windowId:M.id,webContentsId:M.webContents.id,appearance:c,startupElapsedMs:Date.now()-g}}),c===`primary`&&!M.isDestroyed()&&(M.focus(),M.webContents.focus())})',
  },
  {
    target:
      'N.once(`ready-to-show`,()=>{O9().info(`window ready-to-show`,{safe:{hostId:v,windowId:N.id,webContentsId:N.webContents.id,appearance:o,startupElapsedMs:Date.now()-g}})})',
    replacement:
      'N.once(`ready-to-show`,()=>{O9().info(`window ready-to-show`,{safe:{hostId:v,windowId:N.id,webContentsId:N.webContents.id,appearance:o,startupElapsedMs:Date.now()-g}}),o===`primary`&&!N.isDestroyed()&&(N.focus(),N.webContents.focus())})',
  },  {
    target:
      'P.once(`ready-to-show`,()=>{D9().info(`window ready-to-show`,{safe:{hostId:v,windowId:P.id,webContentsId:P.webContents.id,appearance:o,startupElapsedMs:Date.now()-g}})})',
    replacement:
      'P.once(`ready-to-show`,()=>{D9().info(`window ready-to-show`,{safe:{hostId:v,windowId:P.id,webContentsId:P.webContents.id,appearance:o,startupElapsedMs:Date.now()-g}}),o===`primary`&&!P.isDestroyed()&&(P.focus(),P.webContents.focus())})',
  },

];
const mainLinuxReadyToShowFocusPatchMarker =
  'c===`primary`&&!M.isDestroyed()&&(M.focus(),M.webContents.focus())';
const mainLinuxWindowControlPatchTarget = 'sX(b);let x=!1;a.ipcMain.handle(sl,';
const mainLinuxWindowControlPatchReplacement =
  'sX(b),a.ipcMain.handle(`codex_desktop:control-window`,async(e,t)=>{if(!b(e))return;let n=a.BrowserWindow.fromWebContents(e.sender);if(!n||n.isDestroyed())return;switch(t?.action){case`minimize`:n.minimize();return;case`maximize`:n.isMaximized()?n.unmaximize():n.maximize();return;case`close`:n.close();return}});let x=!1;a.ipcMain.handle(sl,';
const mainLinuxWindowControlPatchAlternatives = [
  {
    target:
      'function Fxe({buildFlavor:e,getContextForWebContents:t,isTrustedIpcEvent:n}){l.ipcMain.on(r.et,',
    replacement:
      'function Fxe({buildFlavor:e,getContextForWebContents:t,isTrustedIpcEvent:n}){l.ipcMain.handle(`codex_desktop:control-window`,async(e,t)=>{if(!n(e))return;let r=l.BrowserWindow.fromWebContents(e.sender);if(!r||r.isDestroyed())return;switch(t?.action){case`minimize`:r.minimize();return;case`maximize`:r.isMaximized()?r.unmaximize():r.maximize();return;case`close`:r.close();return}}),l.ipcMain.on(r.et,',
  },
  {
    target:
      'function W6({buildFlavor:e,getContextForWebContents:t,isTrustedIpcEvent:n,usesOwlAppShell:r}){c.ipcMain.on(eu,',
    replacement:
      'function W6({buildFlavor:e,getContextForWebContents:t,isTrustedIpcEvent:n,usesOwlAppShell:r}){c.ipcMain.handle(`codex_desktop:control-window`,async(e,t)=>{if(!n(e))return;let r=c.BrowserWindow.fromWebContents(e.sender);if(!r||r.isDestroyed())return;switch(t?.action){case`minimize`:r.minimize();return;case`maximize`:r.isMaximized()?r.unmaximize():r.maximize();return;case`close`:r.close();return}}),c.ipcMain.on(eu,',
  },
  {
    target:
      'function H6({buildFlavor:e,getContextForWebContents:t,isTrustedIpcEvent:n,usesOwlAppShell:r}){c.ipcMain.on(tu,',
    replacement:
      'function H6({buildFlavor:e,getContextForWebContents:t,isTrustedIpcEvent:n,usesOwlAppShell:r}){c.ipcMain.handle(`codex_desktop:control-window`,async(e,t)=>{if(!n(e))return;let r=c.BrowserWindow.fromWebContents(e.sender);if(!r||r.isDestroyed())return;switch(t?.action){case`minimize`:r.minimize();return;case`maximize`:r.isMaximized()?r.unmaximize():r.maximize();return;case`close`:r.close();return}}),c.ipcMain.on(tu,',
  },
  {
    target: mainLinuxWindowControlPatchTarget,
    replacement: mainLinuxWindowControlPatchReplacement,
  },
  {
    target:
      'YQ({buildFlavor:i,getContextForWebContents:j.getContextForWebContents,isTrustedIpcEvent:P,usesOwlAppShell:v}),r.ipcMain.on(Nl,',
    replacement:
      'YQ({buildFlavor:i,getContextForWebContents:j.getContextForWebContents,isTrustedIpcEvent:P,usesOwlAppShell:v}),r.ipcMain.handle(`codex_desktop:control-window`,async(e,t)=>{if(!P(e))return;let n=r.BrowserWindow.fromWebContents(e.sender);if(!n||n.isDestroyed())return;switch(t?.action){case`minimize`:n.minimize();return;case`maximize`:n.isMaximized()?n.unmaximize():n.maximize();return;case`close`:n.close();return}}),r.ipcMain.on(Nl,',
  },
  {
    target: 'U1(c,k),z1(k);let A=!1;a.ipcMain.handle(bl,',
    replacement:
      'U1(c,k),z1(k);a.ipcMain.handle(`codex_desktop:control-window`,async(e,t)=>{if(!k(e))return;let n=a.BrowserWindow.fromWebContents(e.sender);if(!n||n.isDestroyed())return;switch(t?.action){case`minimize`:n.minimize();return;case`maximize`:n.isMaximized()?n.unmaximize():n.maximize();return;case`close`:n.close();return}});let A=!1;a.ipcMain.handle(bl,',
  },
  {
    target: 'G2(l,k),V2(k);let A=!1;a.ipcMain.handle(zl,',
    replacement:
      'G2(l,k),V2(k);a.ipcMain.handle(`codex_desktop:control-window`,async(e,t)=>{if(!k(e))return;let n=a.BrowserWindow.fromWebContents(e.sender);if(!n||n.isDestroyed())return;switch(t?.action){case`minimize`:n.minimize();return;case`maximize`:n.isMaximized()?n.unmaximize():n.maximize();return;case`close`:n.close();return}});let A=!1;a.ipcMain.handle(zl,',
  },
  {
    target: 'U2(l,k),z2(k);let A=!1;a.ipcMain.handle(ree,',
    replacement:
      'U2(l,k),z2(k);a.ipcMain.handle(`codex_desktop:control-window`,async(e,t)=>{if(!k(e))return;let n=a.BrowserWindow.fromWebContents(e.sender);if(!n||n.isDestroyed())return;switch(t?.action){case`minimize`:n.minimize();return;case`maximize`:n.isMaximized()?n.unmaximize():n.maximize();return;case`close`:n.close();return}});let A=!1;a.ipcMain.handle(ree,',
  },
  {
    target:
      't5({buildFlavor:o,getContextForWebContents:L.getContextForWebContents,isTrustedIpcEvent:ae}),c.ipcMain.on(a.Q,',
    replacement:
      't5({buildFlavor:o,getContextForWebContents:L.getContextForWebContents,isTrustedIpcEvent:ae}),c.ipcMain.handle(`codex_desktop:control-window`,async(e,t)=>{if(!ae(e))return;let n=c.BrowserWindow.fromWebContents(e.sender);if(!n||n.isDestroyed())return;switch(t?.action){case`minimize`:n.minimize();return;case`maximize`:n.isMaximized()?n.unmaximize():n.maximize();return;case`close`:n.close();return}}),c.ipcMain.on(a.Q,',
  },
  {
    target:
      't5({buildFlavor:o,getContextForWebContents:L.getContextForWebContents,isTrustedIpcEvent:R}),c.ipcMain.on(a.Q,',
    replacement:
      't5({buildFlavor:o,getContextForWebContents:L.getContextForWebContents,isTrustedIpcEvent:R}),c.ipcMain.handle(`codex_desktop:control-window`,async(e,t)=>{if(!R(e))return;let n=c.BrowserWindow.fromWebContents(e.sender);if(!n||n.isDestroyed())return;switch(t?.action){case`minimize`:n.minimize();return;case`maximize`:n.isMaximized()?n.unmaximize():n.maximize();return;case`close`:n.close();return}}),c.ipcMain.on(a.Q,',
  },
  {
    target: 'v8(d,j),m8(j);let M=!1;l.ipcMain.handle(a.q,',
    replacement:
      'v8(d,j),m8(j);l.ipcMain.handle(`codex_desktop:control-window`,async(e,t)=>{if(!j(e))return;let n=l.BrowserWindow.fromWebContents(e.sender);if(!n||n.isDestroyed())return;switch(t?.action){case`minimize`:n.minimize();return;case`maximize`:n.isMaximized()?n.unmaximize():n.maximize();return;case`close`:n.close();return}});let M=!1;l.ipcMain.handle(a.q,',
  },
  {
    target:
      'function Bge({buildFlavor:e,getContextForWebContents:t,isTrustedIpcEvent:n}){l.ipcMain.on(a.et,',
    replacement:
      'function Bge({buildFlavor:e,getContextForWebContents:t,isTrustedIpcEvent:n}){l.ipcMain.handle(`codex_desktop:control-window`,async(e,t)=>{if(!n(e))return;let r=l.BrowserWindow.fromWebContents(e.sender);if(!r||r.isDestroyed())return;switch(t?.action){case`minimize`:r.minimize();return;case`maximize`:r.isMaximized()?r.unmaximize():r.maximize();return;case`close`:r.close();return}}),l.ipcMain.on(a.et,',
  },  {
    target:
      'jne({chunkedMessageSender:oe,isTrustedIpcEvent:ge}),Wbe({buildFlavor:s,getContextForWebContents:R.getContextForWebContents,isTrustedIpcEvent:ge}),l.ipcMain.on(r.nt,',
    replacement:
      'jne({chunkedMessageSender:oe,isTrustedIpcEvent:ge}),Wbe({buildFlavor:s,getContextForWebContents:R.getContextForWebContents,isTrustedIpcEvent:ge}),l.ipcMain.handle(`codex_desktop:control-window`,async(e,t)=>{if(!ge(e))return;let n=l.BrowserWindow.fromWebContents(e.sender);if(!n||n.isDestroyed())return;switch(t?.action){case`minimize`:n.minimize();return;case`maximize`:n.isMaximized()?n.unmaximize():n.maximize();return;case`close`:n.close();return}}),l.ipcMain.on(r.nt,',
  },
  {
    target:
      'Gxe(d,j);let M=!1,N=!1;l.ipcMain.handle(r.Z,',
    replacement:
      'Gxe(d,j),l.ipcMain.handle(`codex_desktop:control-window`,async(e,t)=>{if(!j(e))return;let n=l.BrowserWindow.fromWebContents(e.sender);if(!n||n.isDestroyed())return;switch(t?.action){case`minimize`:n.minimize();return;case`maximize`:n.isMaximized()?n.unmaximize():n.maximize();return;case`close`:n.close();return}});let M=!1,N=!1;l.ipcMain.handle(r.Z,',
  },

];
const mainLinuxWindowControlPatchMarker = 'codex_desktop:control-window';
const mainLinuxApplicationMenuPatchTarget =
  'codex_desktop:control-window`,async(e,t)=>{if(!b(e))return;let n=a.BrowserWindow.fromWebContents(e.sender);if(!n||n.isDestroyed())return;switch(t?.action){case`minimize`:n.minimize();return;case`maximize`:n.isMaximized()?n.unmaximize():n.maximize();return;case`close`:n.close();return}});let x=!1;a.ipcMain.handle(sl,';
const mainLinuxApplicationMenuPatchReplacement =
  'codex_desktop:control-window`,async(e,t)=>{if(!b(e))return;let n=a.BrowserWindow.fromWebContents(e.sender);if(!n||n.isDestroyed())return;switch(t?.action){case`minimize`:n.minimize();return;case`maximize`:n.isMaximized()?n.unmaximize():n.maximize();return;case`close`:n.close();return}});function linuxSerializeMenuItems(e,t){let n=[];if(!e)return n;for(let r=0;r<e.items.length;r++){let i=e.items[r];if(i.visible===!1)continue;let o=t===``?String(r):t+`.`+r;if(i.type===`separator`){n.push({type:`separator`,path:o});continue}let s={type:i.type||`normal`,label:i.label||``,accelerator:i.accelerator||null,enabled:i.enabled!==!1,path:o};i.submenu&&i.submenu.items.length>0&&(s.submenu=linuxSerializeMenuItems(i.submenu,o)),n.push(s)}return n}function linuxMenuItemAtPath(e,t){let n=t.split(`.`).map(Number),r=e;for(let e=0;e<n.length;e++){let t=r.items[n[e]];if(!t)return null;if(e===n.length-1)return t;if(!t.submenu)return null;r=t.submenu}return null}a.ipcMain.handle(`codex_desktop:get-application-menu-items`,async(e,t)=>{if(!b(e))return{items:[]};let n=a.Menu.getApplicationMenu()?.getMenuItemById(t?.menuId)?.submenu;return{items:n?linuxSerializeMenuItems(n,``):[]}}),a.ipcMain.handle(`codex_desktop:click-application-menu-item`,async(e,t)=>{if(!b(e))return;let n=a.BrowserWindow.fromWebContents(e.sender),r=a.Menu.getApplicationMenu()?.getMenuItemById(t?.menuId)?.submenu,i=linuxMenuItemAtPath(r,t?.path);i&&i.enabled!==!1&&typeof i.click==`function`&&i.click(void 0,n??void 0,n?.webContents)});let x=!1;a.ipcMain.handle(sl,';
const mainLinuxApplicationMenuPatchAlternatives = [
  {
    target:
      'codex_desktop:control-window`,async(e,t)=>{if(!n(e))return;let r=l.BrowserWindow.fromWebContents(e.sender);if(!r||r.isDestroyed())return;switch(t?.action){case`minimize`:r.minimize();return;case`maximize`:r.isMaximized()?r.unmaximize():r.maximize();return;case`close`:r.close();return}}),l.ipcMain.on(r.et,',
    replacement:
      'codex_desktop:control-window`,async(e,t)=>{if(!n(e))return;let r=l.BrowserWindow.fromWebContents(e.sender);if(!r||r.isDestroyed())return;switch(t?.action){case`minimize`:r.minimize();return;case`maximize`:r.isMaximized()?r.unmaximize():r.maximize();return;case`close`:r.close();return}});function linuxSerializeMenuItems(e,t){let n=[];if(!e)return n;for(let r=0;r<e.items.length;r++){let i=e.items[r];if(i.visible===!1)continue;let a=t===``?String(r):t+`.`+r;if(i.type===`separator`){n.push({type:`separator`,path:a});continue}let o={type:i.type||`normal`,label:i.label||``,accelerator:i.accelerator||null,enabled:i.enabled!==!1,path:a};i.submenu&&i.submenu.items.length>0&&(o.submenu=linuxSerializeMenuItems(i.submenu,a)),n.push(o)}return n}function linuxMenuItemAtPath(e,t){let n=t.split(`.`).map(Number),r=e;for(let e=0;e<n.length;e++){let t=r.items[n[e]];if(!t)return null;if(e===n.length-1)return t;if(!t.submenu)return null;r=t.submenu}return null}l.ipcMain.handle(`codex_desktop:get-application-menu-items`,async(e,t)=>{if(!n(e))return{items:[]};let r=l.Menu.getApplicationMenu()?.getMenuItemById(t?.menuId)?.submenu;return{items:r?linuxSerializeMenuItems(r,``):[]}}),l.ipcMain.handle(`codex_desktop:click-application-menu-item`,async(e,t)=>{if(!n(e))return;let r=l.BrowserWindow.fromWebContents(e.sender),i=l.Menu.getApplicationMenu()?.getMenuItemById(t?.menuId)?.submenu,a=linuxMenuItemAtPath(i,t?.path);a&&a.enabled!==!1&&typeof a.click==`function`&&a.click(void 0,r??void 0,r?.webContents)}),l.ipcMain.on(r.et,',
  },
  {
    target:
      'codex_desktop:control-window`,async(e,t)=>{if(!n(e))return;let r=c.BrowserWindow.fromWebContents(e.sender);if(!r||r.isDestroyed())return;switch(t?.action){case`minimize`:r.minimize();return;case`maximize`:r.isMaximized()?r.unmaximize():r.maximize();return;case`close`:r.close();return}}),c.ipcMain.on(eu,',
    replacement:
      'codex_desktop:control-window`,async(e,t)=>{if(!n(e))return;let r=c.BrowserWindow.fromWebContents(e.sender);if(!r||r.isDestroyed())return;switch(t?.action){case`minimize`:r.minimize();return;case`maximize`:r.isMaximized()?r.unmaximize():r.maximize();return;case`close`:r.close();return}});function linuxSerializeMenuItems(e,t){let n=[];if(!e)return n;for(let r=0;r<e.items.length;r++){let i=e.items[r];if(i.visible===!1)continue;let a=t===``?String(r):t+`.`+r;if(i.type===`separator`){n.push({type:`separator`,path:a});continue}let o={type:i.type||`normal`,label:i.label||``,accelerator:i.accelerator||null,enabled:i.enabled!==!1,path:a};i.submenu&&i.submenu.items.length>0&&(o.submenu=linuxSerializeMenuItems(i.submenu,a)),n.push(o)}return n}function linuxMenuItemAtPath(e,t){let n=t.split(`.`).map(Number),r=e;for(let e=0;e<n.length;e++){let t=r.items[n[e]];if(!t)return null;if(e===n.length-1)return t;if(!t.submenu)return null;r=t.submenu}return null}c.ipcMain.handle(`codex_desktop:get-application-menu-items`,async(e,t)=>{if(!n(e))return{items:[]};let r=c.Menu.getApplicationMenu()?.getMenuItemById(t?.menuId)?.submenu;return{items:r?linuxSerializeMenuItems(r,``):[]}}),c.ipcMain.handle(`codex_desktop:click-application-menu-item`,async(e,t)=>{if(!n(e))return;let r=c.BrowserWindow.fromWebContents(e.sender),i=c.Menu.getApplicationMenu()?.getMenuItemById(t?.menuId)?.submenu,a=linuxMenuItemAtPath(i,t?.path);a&&a.enabled!==!1&&typeof a.click==`function`&&a.click(void 0,r??void 0,r?.webContents)}),c.ipcMain.on(eu,',
  },
  {
    target:
      'codex_desktop:control-window`,async(e,t)=>{if(!n(e))return;let r=c.BrowserWindow.fromWebContents(e.sender);if(!r||r.isDestroyed())return;switch(t?.action){case`minimize`:r.minimize();return;case`maximize`:r.isMaximized()?r.unmaximize():r.maximize();return;case`close`:r.close();return}}),c.ipcMain.on(tu,',
    replacement:
      'codex_desktop:control-window`,async(e,t)=>{if(!n(e))return;let r=c.BrowserWindow.fromWebContents(e.sender);if(!r||r.isDestroyed())return;switch(t?.action){case`minimize`:r.minimize();return;case`maximize`:r.isMaximized()?r.unmaximize():r.maximize();return;case`close`:r.close();return}});function linuxSerializeMenuItems(e,t){let n=[];if(!e)return n;for(let r=0;r<e.items.length;r++){let i=e.items[r];if(i.visible===!1)continue;let a=t===``?String(r):t+`.`+r;if(i.type===`separator`){n.push({type:`separator`,path:a});continue}let o={type:i.type||`normal`,label:i.label||``,accelerator:i.accelerator||null,enabled:i.enabled!==!1,path:a};i.submenu&&i.submenu.items.length>0&&(o.submenu=linuxSerializeMenuItems(i.submenu,a)),n.push(o)}return n}function linuxMenuItemAtPath(e,t){let n=t.split(`.`).map(Number),r=e;for(let e=0;e<n.length;e++){let t=r.items[n[e]];if(!t)return null;if(e===n.length-1)return t;if(!t.submenu)return null;r=t.submenu}return null}c.ipcMain.handle(`codex_desktop:get-application-menu-items`,async(e,t)=>{if(!n(e))return{items:[]};let r=c.Menu.getApplicationMenu()?.getMenuItemById(t?.menuId)?.submenu;return{items:r?linuxSerializeMenuItems(r,``):[]}}),c.ipcMain.handle(`codex_desktop:click-application-menu-item`,async(e,t)=>{if(!n(e))return;let r=c.BrowserWindow.fromWebContents(e.sender),i=c.Menu.getApplicationMenu()?.getMenuItemById(t?.menuId)?.submenu,a=linuxMenuItemAtPath(i,t?.path);a&&a.enabled!==!1&&typeof a.click==`function`&&a.click(void 0,r??void 0,r?.webContents)}),c.ipcMain.on(tu,',
  },
  {
    target: mainLinuxApplicationMenuPatchTarget,
    replacement: mainLinuxApplicationMenuPatchReplacement,
  },
  {
    target:
      'codex_desktop:control-window`,async(e,t)=>{if(!j(e))return;let n=l.BrowserWindow.fromWebContents(e.sender);if(!n||n.isDestroyed())return;switch(t?.action){case`minimize`:n.minimize();return;case`maximize`:n.isMaximized()?n.unmaximize():n.maximize();return;case`close`:n.close();return}});let M=!1,N=!1;l.ipcMain.handle(r.Z,',
    replacement:
      'codex_desktop:control-window`,async(e,t)=>{if(!j(e))return;let n=l.BrowserWindow.fromWebContents(e.sender);if(!n||n.isDestroyed())return;switch(t?.action){case`minimize`:n.minimize();return;case`maximize`:n.isMaximized()?n.unmaximize():n.maximize();return;case`close`:n.close();return}});function linuxSerializeMenuItems(e,t){let n=[];if(!e)return n;for(let r=0;r<e.items.length;r++){let i=e.items[r];if(i.visible===!1)continue;let a=t===``?String(r):t+`.`+r;if(i.type===`separator`){n.push({type:`separator`,path:a});continue}let o={type:i.type||`normal`,label:i.label||``,accelerator:i.accelerator||null,enabled:i.enabled!==!1,path:a};i.submenu&&i.submenu.items.length>0&&(o.submenu=linuxSerializeMenuItems(i.submenu,a)),n.push(o)}return n}function linuxMenuItemAtPath(e,t){let n=t.split(`.`).map(Number),r=e;for(let e=0;e<n.length;e++){let t=r.items[n[e]];if(!t)return null;if(e===n.length-1)return t;if(!t.submenu)return null;r=t.submenu}return null}l.ipcMain.handle(`codex_desktop:get-application-menu-items`,async(e,t)=>{if(!j(e))return{items:[]};let n=l.Menu.getApplicationMenu()?.getMenuItemById(t?.menuId)?.submenu;return{items:n?linuxSerializeMenuItems(n,``):[]}}),l.ipcMain.handle(`codex_desktop:click-application-menu-item`,async(e,t)=>{if(!j(e))return;let n=l.BrowserWindow.fromWebContents(e.sender),r=l.Menu.getApplicationMenu()?.getMenuItemById(t?.menuId)?.submenu,i=linuxMenuItemAtPath(r,t?.path);i&&i.enabled!==!1&&typeof i.click==`function`&&i.click(void 0,n??void 0,n?.webContents)});let M=!1,N=!1;l.ipcMain.handle(r.Z,',
  },
  {
    target:
      'codex_desktop:control-window`,async(e,t)=>{if(!P(e))return;let n=r.BrowserWindow.fromWebContents(e.sender);if(!n||n.isDestroyed())return;switch(t?.action){case`minimize`:n.minimize();return;case`maximize`:n.isMaximized()?n.unmaximize():n.maximize();return;case`close`:n.close();return}}),r.ipcMain.on(Nl,',
    replacement:
      'codex_desktop:control-window`,async(e,t)=>{if(!P(e))return;let n=r.BrowserWindow.fromWebContents(e.sender);if(!n||n.isDestroyed())return;switch(t?.action){case`minimize`:n.minimize();return;case`maximize`:n.isMaximized()?n.unmaximize():n.maximize();return;case`close`:n.close();return}});function linuxSerializeMenuItems(e,t){let n=[];if(!e)return n;for(let r=0;r<e.items.length;r++){let i=e.items[r];if(i.visible===!1)continue;let a=t===``?String(r):t+`.`+r;if(i.type===`separator`){n.push({type:`separator`,path:a});continue}let o={type:i.type||`normal`,label:i.label||``,accelerator:i.accelerator||null,enabled:i.enabled!==!1,path:a};i.submenu&&i.submenu.items.length>0&&(o.submenu=linuxSerializeMenuItems(i.submenu,a)),n.push(o)}return n}function linuxMenuItemAtPath(e,t){let n=t.split(`.`).map(Number),r=e;for(let e=0;e<n.length;e++){let t=r.items[n[e]];if(!t)return null;if(e===n.length-1)return t;if(!t.submenu)return null;r=t.submenu}return null}r.ipcMain.handle(`codex_desktop:get-application-menu-items`,async(e,t)=>{if(!P(e))return{items:[]};let n=r.Menu.getApplicationMenu()?.getMenuItemById(t?.menuId)?.submenu;return{items:n?linuxSerializeMenuItems(n,``):[]}}),r.ipcMain.handle(`codex_desktop:click-application-menu-item`,async(e,t)=>{if(!P(e))return;let n=r.BrowserWindow.fromWebContents(e.sender),i=r.Menu.getApplicationMenu()?.getMenuItemById(t?.menuId)?.submenu,a=linuxMenuItemAtPath(i,t?.path);a&&a.enabled!==!1&&typeof a.click==`function`&&a.click(void 0,n??void 0,n?.webContents)}),r.ipcMain.on(Nl,',
  },
  {
    target:
      'codex_desktop:control-window`,async(e,t)=>{if(!k(e))return;let n=a.BrowserWindow.fromWebContents(e.sender);if(!n||n.isDestroyed())return;switch(t?.action){case`minimize`:n.minimize();return;case`maximize`:n.isMaximized()?n.unmaximize():n.maximize();return;case`close`:n.close();return}});let A=!1;a.ipcMain.handle(bl,',
    replacement:
      'codex_desktop:control-window`,async(e,t)=>{if(!k(e))return;let n=a.BrowserWindow.fromWebContents(e.sender);if(!n||n.isDestroyed())return;switch(t?.action){case`minimize`:n.minimize();return;case`maximize`:n.isMaximized()?n.unmaximize():n.maximize();return;case`close`:n.close();return}});function linuxSerializeMenuItems(e,t){let n=[];if(!e)return n;for(let r=0;r<e.items.length;r++){let i=e.items[r];if(i.visible===!1)continue;let o=t===``?String(r):t+`.`+r;if(i.type===`separator`){n.push({type:`separator`,path:o});continue}let s={type:i.type||`normal`,label:i.label||``,accelerator:i.accelerator||null,enabled:i.enabled!==!1,path:o};i.submenu&&i.submenu.items.length>0&&(s.submenu=linuxSerializeMenuItems(i.submenu,o)),n.push(s)}return n}function linuxMenuItemAtPath(e,t){let n=t.split(`.`).map(Number),r=e;for(let e=0;e<n.length;e++){let t=r.items[n[e]];if(!t)return null;if(e===n.length-1)return t;if(!t.submenu)return null;r=t.submenu}return null}a.ipcMain.handle(`codex_desktop:get-application-menu-items`,async(e,t)=>{if(!k(e))return{items:[]};let n=a.Menu.getApplicationMenu()?.getMenuItemById(t?.menuId)?.submenu;return{items:n?linuxSerializeMenuItems(n,``):[]}}),a.ipcMain.handle(`codex_desktop:click-application-menu-item`,async(e,t)=>{if(!k(e))return;let n=a.BrowserWindow.fromWebContents(e.sender),r=a.Menu.getApplicationMenu()?.getMenuItemById(t?.menuId)?.submenu,i=linuxMenuItemAtPath(r,t?.path);i&&i.enabled!==!1&&typeof i.click==`function`&&i.click(void 0,n??void 0,n?.webContents)});let A=!1;a.ipcMain.handle(bl,',
  },
  {
    target:
      'codex_desktop:control-window`,async(e,t)=>{if(!k(e))return;let n=a.BrowserWindow.fromWebContents(e.sender);if(!n||n.isDestroyed())return;switch(t?.action){case`minimize`:n.minimize();return;case`maximize`:n.isMaximized()?n.unmaximize():n.maximize();return;case`close`:n.close();return}});let A=!1;a.ipcMain.handle(zl,',
    replacement:
      'codex_desktop:control-window`,async(e,t)=>{if(!k(e))return;let n=a.BrowserWindow.fromWebContents(e.sender);if(!n||n.isDestroyed())return;switch(t?.action){case`minimize`:n.minimize();return;case`maximize`:n.isMaximized()?n.unmaximize():n.maximize();return;case`close`:n.close();return}});function linuxSerializeMenuItems(e,t){let n=[];if(!e)return n;for(let r=0;r<e.items.length;r++){let i=e.items[r];if(i.visible===!1)continue;let o=t===``?String(r):t+`.`+r;if(i.type===`separator`){n.push({type:`separator`,path:o});continue}let s={type:i.type||`normal`,label:i.label||``,accelerator:i.accelerator||null,enabled:i.enabled!==!1,path:o};i.submenu&&i.submenu.items.length>0&&(s.submenu=linuxSerializeMenuItems(i.submenu,o)),n.push(s)}return n}function linuxMenuItemAtPath(e,t){let n=t.split(`.`).map(Number),r=e;for(let e=0;e<n.length;e++){let t=r.items[n[e]];if(!t)return null;if(e===n.length-1)return t;if(!t.submenu)return null;r=t.submenu}return null}a.ipcMain.handle(`codex_desktop:get-application-menu-items`,async(e,t)=>{if(!k(e))return{items:[]};let n=a.Menu.getApplicationMenu()?.getMenuItemById(t?.menuId)?.submenu;return{items:n?linuxSerializeMenuItems(n,``):[]}}),a.ipcMain.handle(`codex_desktop:click-application-menu-item`,async(e,t)=>{if(!k(e))return;let n=a.BrowserWindow.fromWebContents(e.sender),r=a.Menu.getApplicationMenu()?.getMenuItemById(t?.menuId)?.submenu,i=linuxMenuItemAtPath(r,t?.path);i&&i.enabled!==!1&&typeof i.click==`function`&&i.click(void 0,n??void 0,n?.webContents)});let A=!1;a.ipcMain.handle(zl,',
  },
  {
    target:
      'codex_desktop:control-window`,async(e,t)=>{if(!k(e))return;let n=a.BrowserWindow.fromWebContents(e.sender);if(!n||n.isDestroyed())return;switch(t?.action){case`minimize`:n.minimize();return;case`maximize`:n.isMaximized()?n.unmaximize():n.maximize();return;case`close`:n.close();return}});let A=!1;a.ipcMain.handle(ree,',
    replacement:
      'codex_desktop:control-window`,async(e,t)=>{if(!k(e))return;let n=a.BrowserWindow.fromWebContents(e.sender);if(!n||n.isDestroyed())return;switch(t?.action){case`minimize`:n.minimize();return;case`maximize`:n.isMaximized()?n.unmaximize():n.maximize();return;case`close`:n.close();return}});function linuxSerializeMenuItems(e,t){let n=[];if(!e)return n;for(let r=0;r<e.items.length;r++){let i=e.items[r];if(i.visible===!1)continue;let o=t===``?String(r):t+`.`+r;if(i.type===`separator`){n.push({type:`separator`,path:o});continue}let s={type:i.type||`normal`,label:i.label||``,accelerator:i.accelerator||null,enabled:i.enabled!==!1,path:o};i.submenu&&i.submenu.items.length>0&&(s.submenu=linuxSerializeMenuItems(i.submenu,o)),n.push(s)}return n}function linuxMenuItemAtPath(e,t){let n=t.split(`.`).map(Number),r=e;for(let e=0;e<n.length;e++){let t=r.items[n[e]];if(!t)return null;if(e===n.length-1)return t;if(!t.submenu)return null;r=t.submenu}return null}a.ipcMain.handle(`codex_desktop:get-application-menu-items`,async(e,t)=>{if(!k(e))return{items:[]};let n=a.Menu.getApplicationMenu()?.getMenuItemById(t?.menuId)?.submenu;return{items:n?linuxSerializeMenuItems(n,``):[]}}),a.ipcMain.handle(`codex_desktop:click-application-menu-item`,async(e,t)=>{if(!k(e))return;let n=a.BrowserWindow.fromWebContents(e.sender),r=a.Menu.getApplicationMenu()?.getMenuItemById(t?.menuId)?.submenu,i=linuxMenuItemAtPath(r,t?.path);i&&i.enabled!==!1&&typeof i.click==`function`&&i.click(void 0,n??void 0,n?.webContents)});let A=!1;a.ipcMain.handle(ree,',
  },
  {
    target:
      'codex_desktop:control-window`,async(e,t)=>{if(!ae(e))return;let n=c.BrowserWindow.fromWebContents(e.sender);if(!n||n.isDestroyed())return;switch(t?.action){case`minimize`:n.minimize();return;case`maximize`:n.isMaximized()?n.unmaximize():n.maximize();return;case`close`:n.close();return}}),c.ipcMain.on(a.Q,',
    replacement:
      'codex_desktop:control-window`,async(e,t)=>{if(!ae(e))return;let n=c.BrowserWindow.fromWebContents(e.sender);if(!n||n.isDestroyed())return;switch(t?.action){case`minimize`:n.minimize();return;case`maximize`:n.isMaximized()?n.unmaximize():n.maximize();return;case`close`:n.close();return}});function linuxSerializeMenuItems(e,t){let n=[];if(!e)return n;for(let r=0;r<e.items.length;r++){let i=e.items[r];if(i.visible===!1)continue;let a=t===``?String(r):t+`.`+r;if(i.type===`separator`){n.push({type:`separator`,path:a});continue}let o={type:i.type||`normal`,label:i.label||``,accelerator:i.accelerator||null,enabled:i.enabled!==!1,path:a};i.submenu&&i.submenu.items.length>0&&(o.submenu=linuxSerializeMenuItems(i.submenu,a)),n.push(o)}return n}function linuxMenuItemAtPath(e,t){let n=t.split(`.`).map(Number),r=e;for(let e=0;e<n.length;e++){let t=r.items[n[e]];if(!t)return null;if(e===n.length-1)return t;if(!t.submenu)return null;r=t.submenu}return null}c.ipcMain.handle(`codex_desktop:get-application-menu-items`,async(e,t)=>{if(!ae(e))return{items:[]};let n=c.Menu.getApplicationMenu()?.getMenuItemById(t?.menuId)?.submenu;return{items:n?linuxSerializeMenuItems(n,``):[]}}),c.ipcMain.handle(`codex_desktop:click-application-menu-item`,async(e,t)=>{if(!ae(e))return;let n=c.BrowserWindow.fromWebContents(e.sender),r=c.Menu.getApplicationMenu()?.getMenuItemById(t?.menuId)?.submenu,i=linuxMenuItemAtPath(r,t?.path);i&&i.enabled!==!1&&typeof i.click==`function`&&i.click(void 0,n??void 0,n?.webContents)}),c.ipcMain.on(a.Q,',
  },
  {
    target:
      'codex_desktop:control-window`,async(e,t)=>{if(!R(e))return;let n=c.BrowserWindow.fromWebContents(e.sender);if(!n||n.isDestroyed())return;switch(t?.action){case`minimize`:n.minimize();return;case`maximize`:n.isMaximized()?n.unmaximize():n.maximize();return;case`close`:n.close();return}}),c.ipcMain.on(a.Q,',
    replacement:
      'codex_desktop:control-window`,async(e,t)=>{if(!R(e))return;let n=c.BrowserWindow.fromWebContents(e.sender);if(!n||n.isDestroyed())return;switch(t?.action){case`minimize`:n.minimize();return;case`maximize`:n.isMaximized()?n.unmaximize():n.maximize();return;case`close`:n.close();return}});function linuxSerializeMenuItems(e,t){let n=[];if(!e)return n;for(let r=0;r<e.items.length;r++){let i=e.items[r];if(i.visible===!1)continue;let a=t===``?String(r):t+`.`+r;if(i.type===`separator`){n.push({type:`separator`,path:a});continue}let o={type:i.type||`normal`,label:i.label||``,accelerator:i.accelerator||null,enabled:i.enabled!==!1,path:a};i.submenu&&i.submenu.items.length>0&&(o.submenu=linuxSerializeMenuItems(i.submenu,a)),n.push(o)}return n}function linuxMenuItemAtPath(e,t){let n=t.split(`.`).map(Number),r=e;for(let e=0;e<n.length;e++){let t=r.items[n[e]];if(!t)return null;if(e===n.length-1)return t;if(!t.submenu)return null;r=t.submenu}return null}c.ipcMain.handle(`codex_desktop:get-application-menu-items`,async(e,t)=>{if(!R(e))return{items:[]};let n=c.Menu.getApplicationMenu()?.getMenuItemById(t?.menuId)?.submenu;return{items:n?linuxSerializeMenuItems(n,``):[]}}),c.ipcMain.handle(`codex_desktop:click-application-menu-item`,async(e,t)=>{if(!R(e))return;let n=c.BrowserWindow.fromWebContents(e.sender),r=c.Menu.getApplicationMenu()?.getMenuItemById(t?.menuId)?.submenu,i=linuxMenuItemAtPath(r,t?.path);i&&i.enabled!==!1&&typeof i.click==`function`&&i.click(void 0,n??void 0,n?.webContents)}),c.ipcMain.on(a.Q,',
  },
  {
    target:
      'codex_desktop:control-window`,async(e,t)=>{if(!j(e))return;let n=l.BrowserWindow.fromWebContents(e.sender);if(!n||n.isDestroyed())return;switch(t?.action){case`minimize`:n.minimize();return;case`maximize`:n.isMaximized()?n.unmaximize():n.maximize();return;case`close`:n.close();return}});let M=!1;l.ipcMain.handle(a.q,',
    replacement:
      'codex_desktop:control-window`,async(e,t)=>{if(!j(e))return;let n=l.BrowserWindow.fromWebContents(e.sender);if(!n||n.isDestroyed())return;switch(t?.action){case`minimize`:n.minimize();return;case`maximize`:n.isMaximized()?n.unmaximize():n.maximize();return;case`close`:n.close();return}});function linuxSerializeMenuItems(e,t){let n=[];if(!e)return n;for(let r=0;r<e.items.length;r++){let i=e.items[r];if(i.visible===!1)continue;let a=t===``?String(r):t+`.`+r;if(i.type===`separator`){n.push({type:`separator`,path:a});continue}let o={type:i.type||`normal`,label:i.label||``,accelerator:i.accelerator||null,enabled:i.enabled!==!1,path:a};i.submenu&&i.submenu.items.length>0&&(o.submenu=linuxSerializeMenuItems(i.submenu,a)),n.push(o)}return n}function linuxMenuItemAtPath(e,t){let n=t.split(`.`).map(Number),r=e;for(let e=0;e<n.length;e++){let t=r.items[n[e]];if(!t)return null;if(e===n.length-1)return t;if(!t.submenu)return null;r=t.submenu}return null}l.ipcMain.handle(`codex_desktop:get-application-menu-items`,async(e,t)=>{if(!j(e))return{items:[]};let n=l.Menu.getApplicationMenu()?.getMenuItemById(t?.menuId)?.submenu;return{items:n?linuxSerializeMenuItems(n,``):[]}}),l.ipcMain.handle(`codex_desktop:click-application-menu-item`,async(e,t)=>{if(!j(e))return;let n=l.BrowserWindow.fromWebContents(e.sender),r=l.Menu.getApplicationMenu()?.getMenuItemById(t?.menuId)?.submenu,i=linuxMenuItemAtPath(r,t?.path);i&&i.enabled!==!1&&typeof i.click==`function`&&i.click(void 0,n??void 0,n?.webContents)});let M=!1;l.ipcMain.handle(a.q,',
  },
  {
    target:
      'codex_desktop:control-window`,async(e,t)=>{if(!n(e))return;let r=l.BrowserWindow.fromWebContents(e.sender);if(!r||r.isDestroyed())return;switch(t?.action){case`minimize`:r.minimize();return;case`maximize`:r.isMaximized()?r.unmaximize():r.maximize();return;case`close`:r.close();return}}),l.ipcMain.on(a.et,',
    replacement:
      'codex_desktop:control-window`,async(e,t)=>{if(!n(e))return;let r=l.BrowserWindow.fromWebContents(e.sender);if(!r||r.isDestroyed())return;switch(t?.action){case`minimize`:r.minimize();return;case`maximize`:r.isMaximized()?r.unmaximize():r.maximize();return;case`close`:r.close();return}});function linuxSerializeMenuItems(e,t){let n=[];if(!e)return n;for(let r=0;r<e.items.length;r++){let i=e.items[r];if(i.visible===!1)continue;let a=t===``?String(r):t+`.`+r;if(i.type===`separator`){n.push({type:`separator`,path:a});continue}let o={type:i.type||`normal`,label:i.label||``,accelerator:i.accelerator||null,enabled:i.enabled!==!1,path:a};i.submenu&&i.submenu.items.length>0&&(o.submenu=linuxSerializeMenuItems(i.submenu,a)),n.push(o)}return n}function linuxMenuItemAtPath(e,t){let n=t.split(`.`).map(Number),r=e;for(let e=0;e<n.length;e++){let t=r.items[n[e]];if(!t)return null;if(e===n.length-1)return t;if(!t.submenu)return null;r=t.submenu}return null}l.ipcMain.handle(`codex_desktop:get-application-menu-items`,async(e,t)=>{if(!n(e))return{items:[]};let r=l.Menu.getApplicationMenu()?.getMenuItemById(t?.menuId)?.submenu;return{items:r?linuxSerializeMenuItems(r,``):[]}}),l.ipcMain.handle(`codex_desktop:click-application-menu-item`,async(e,t)=>{if(!n(e))return;let r=l.BrowserWindow.fromWebContents(e.sender),i=l.Menu.getApplicationMenu()?.getMenuItemById(t?.menuId)?.submenu,a=linuxMenuItemAtPath(i,t?.path);a&&a.enabled!==!1&&typeof a.click==`function`&&a.click(void 0,r??void 0,r?.webContents)}),l.ipcMain.on(a.et,',
  },  {
    target:
      'codex_desktop:control-window`,async(e,t)=>{if(!ge(e))return;let n=l.BrowserWindow.fromWebContents(e.sender);if(!n||n.isDestroyed())return;switch(t?.action){case`minimize`:n.minimize();return;case`maximize`:n.isMaximized()?n.unmaximize():n.maximize();return;case`close`:n.close();return}}),l.ipcMain.on(r.nt,',
    replacement:
      'codex_desktop:control-window`,async(e,t)=>{if(!ge(e))return;let n=l.BrowserWindow.fromWebContents(e.sender);if(!n||n.isDestroyed())return;switch(t?.action){case`minimize`:n.minimize();return;case`maximize`:n.isMaximized()?n.unmaximize():n.maximize();return;case`close`:n.close();return}});function linuxSerializeMenuItems(e,t){let n=[];if(!e)return n;for(let r=0;r<e.items.length;r++){let i=e.items[r];if(i.visible===!1)continue;let a=t===``?String(r):t+`.`+r;if(i.type===`separator`){n.push({type:`separator`,path:a});continue}let o={type:i.type||`normal`,label:i.label||``,accelerator:i.accelerator||null,enabled:i.enabled!==!1,path:a};i.submenu&&i.submenu.items.length>0&&(o.submenu=linuxSerializeMenuItems(i.submenu,a)),n.push(o)}return n}function linuxMenuItemAtPath(e,t){let n=t.split(`.`).map(Number),r=e;for(let e=0;e<n.length;e++){let t=r.items[n[e]];if(!t)return null;if(e===n.length-1)return t;if(!t.submenu)return null;r=t.submenu}return null}l.ipcMain.handle(`codex_desktop:get-application-menu-items`,async(e,t)=>{if(!ge(e))return{items:[]};let n=l.Menu.getApplicationMenu()?.getMenuItemById(t?.menuId)?.submenu;return{items:n?linuxSerializeMenuItems(n,``):[]}}),l.ipcMain.handle(`codex_desktop:click-application-menu-item`,async(e,t)=>{if(!ge(e))return;let n=l.BrowserWindow.fromWebContents(e.sender),r=l.Menu.getApplicationMenu()?.getMenuItemById(t?.menuId)?.submenu,i=linuxMenuItemAtPath(r,t?.path);i&&i.enabled!==!1&&typeof i.click==`function`&&i.click(void 0,n??void 0,n?.webContents)}),l.ipcMain.on(r.nt,',
  },

];
const mainLinuxApplicationMenuPatchMarker = 'codex_desktop:get-application-menu-items';
const mainLinuxApplicationMenuClickContextUpgradePatchPattern =
  /[ar]\.ipcMain\.handle\(`codex_desktop:click-application-menu-item`,async\(e,t\)=>\{if\(![bP]\(e\)\)return;let n=[ar]\.Menu\.getApplicationMenu\(\)\?\.getMenuItemById\(t\?\.menuId\)\?\.submenu,r=linuxMenuItemAtPath\(n,t\?\.path\);r&&r\.enabled!==!1&&typeof r\.click==`function`&&r\.click\(\)\}\)/;
const mainLinuxApplicationMenuClickContextUpgradePatchReplacement =
  'a.ipcMain.handle(`codex_desktop:click-application-menu-item`,async(e,t)=>{if(!b(e))return;let n=a.BrowserWindow.fromWebContents(e.sender),r=a.Menu.getApplicationMenu()?.getMenuItemById(t?.menuId)?.submenu,i=linuxMenuItemAtPath(r,t?.path);i&&i.enabled!==!1&&typeof i.click==`function`&&i.click(void 0,n??void 0,n?.webContents)})';
const mainLinuxApplicationMenuClickContextUpgradePatchMarker =
  'click(void 0,';
const preloadLinuxBridgePatchTarget =
  'showApplicationMenu:async(t,n,i)=>{await e.ipcRenderer.invoke(r,{menuId:t,x:n,y:i})}';
const preloadLinuxBridgePatchReplacement =
  'showApplicationMenu:async(t,n,i)=>{await e.ipcRenderer.invoke(r,{menuId:t,x:n,y:i})},controlWindow:async t=>{await e.ipcRenderer.invoke(`codex_desktop:control-window`,{action:t})},getApplicationMenuItems:async t=>await e.ipcRenderer.invoke(`codex_desktop:get-application-menu-items`,{menuId:t}),clickApplicationMenuItem:async(t,n)=>{await e.ipcRenderer.invoke(`codex_desktop:click-application-menu-item`,{menuId:t,path:n})}';
const preloadLinuxBridgePatchAlternatives = [
  { target: preloadLinuxBridgePatchTarget, replacement: preloadLinuxBridgePatchReplacement },
  {
    target:
      'showApplicationMenu:async(t,n,r)=>{await e.ipcRenderer.invoke(u,{menuId:t,x:n,y:r})}',
    replacement:
      'showApplicationMenu:async(t,n,r)=>{await e.ipcRenderer.invoke(u,{menuId:t,x:n,y:r})},controlWindow:async t=>{await e.ipcRenderer.invoke(`codex_desktop:control-window`,{action:t})},getApplicationMenuItems:async t=>await e.ipcRenderer.invoke(`codex_desktop:get-application-menu-items`,{menuId:t}),clickApplicationMenuItem:async(t,n)=>{await e.ipcRenderer.invoke(`codex_desktop:click-application-menu-item`,{menuId:t,path:n})}',
  },
  {
    target:
      'showContextMenu:async t=>e.ipcRenderer.invoke(l,t)',
    replacement:
      'showContextMenu:async t=>e.ipcRenderer.invoke(l,t),controlWindow:async t=>{await e.ipcRenderer.invoke(`codex_desktop:control-window`,{action:t})},getApplicationMenuItems:async t=>await e.ipcRenderer.invoke(`codex_desktop:get-application-menu-items`,{menuId:t}),clickApplicationMenuItem:async(t,n)=>{await e.ipcRenderer.invoke(`codex_desktop:click-application-menu-item`,{menuId:t,path:n})}',
  },
  {
    target:
      'showContextMenu:async t=>e.ipcRenderer.invoke(a,t)',
    replacement:
      'showContextMenu:async t=>e.ipcRenderer.invoke(a,t),controlWindow:async t=>{await e.ipcRenderer.invoke(`codex_desktop:control-window`,{action:t})},getApplicationMenuItems:async t=>await e.ipcRenderer.invoke(`codex_desktop:get-application-menu-items`,{menuId:t}),clickApplicationMenuItem:async(t,n)=>{await e.ipcRenderer.invoke(`codex_desktop:click-application-menu-item`,{menuId:t,path:n})}',
  },
];
const preloadLinuxBridgePatchMarker = 'getApplicationMenuItems:async t=>';
const rendererLinuxWindowControlsSafeAreaPatchTarget =
  'applicationMenu:Object.freeze({left:0,right:0})';
const rendererLinuxWindowControlsSafeAreaPatchReplacement =
  'applicationMenu:Object.freeze({left:0,right:0})';
const rendererLinuxWindowControlsSafeAreaPatchMarker =
  'applicationMenu:Object.freeze({left:0,right:0})';
const mainLinuxNativeMenuAutoHidePatchAlternatives = [
  {
    target: 'process.platform===`win32`?{autoHideMenuBar:!0}:{}',
    replacement: '(process.platform===`win32`||process.platform===`linux`)?{autoHideMenuBar:!0}:{}',
  },
  {
    target: '...process.platform===`win32`?{autoHideMenuBar:!0}:{}',
    replacement:
      '...(process.platform===`win32`||process.platform===`linux`)?{autoHideMenuBar:!0}:{}',
  },
];
const mainLinuxNativeMenuAutoHidePatchMarker =
  'process.platform===`win32`||process.platform===`linux`?{autoHideMenuBar:!0}:{}';
const mainLinuxNativeMenuRemovePatchAlternatives = [
  {
    target: 'process.platform===`win32`&&k.removeMenu()',
    replacement: '(process.platform===`win32`||process.platform===`linux`)&&k.removeMenu()',
  },
  {
    target: 'process.platform===`win32`&&t.removeMenu()',
    replacement: '(process.platform===`win32`||process.platform===`linux`)&&t.removeMenu()',
  },
  {
    target: 'process.platform===`win32`&&j.removeMenu()',
    replacement: '(process.platform===`win32`||process.platform===`linux`)&&j.removeMenu()',
  },
];
const mainLinuxNativeMenuRemovePatchMarker =
  'process.platform===`win32`||process.platform===`linux`)&&';
const mainLinuxNativeMenuRemovePatchPattern =
  /process\.platform===`win32`&&([A-Za-z_$][\w$]*)\.removeMenu\(\)/g;
const mainLinuxNativeMenuRemovePatchReplacement =
  '(process.platform===`win32`||process.platform===`linux`)&&$1.removeMenu()';
const appShellLinuxWindowsMenuPatchAlternatives = [
  {
    target: 'function cs(){return Ke()&&window.electronBridge?.showApplicationMenu!=null}',
    replacement:
      'function cs(){return(Ke()||navigator.userAgent.includes(`Linux`))&&window.electronBridge?.showApplicationMenu!=null}',
  },
  {
    target:
      'function IP(){return qn()&&window.electronBridge?.showApplicationMenu!=null}',
    replacement:
      'function IP(){return(qn()||navigator.userAgent.includes(`Linux`))&&window.electronBridge?.showApplicationMenu!=null}',
  },

  {
    target: 'function Ygi(){return spt()&&window.electronBridge?.showApplicationMenu!=null}',
    replacement:
      'function Ygi(){return(spt()||navigator.userAgent.includes(`Linux`))&&window.electronBridge?.showApplicationMenu!=null}',
  },
  {
    target:
      'function DO(){return d()&&window.electronBridge?.showApplicationMenu!=null}',
    replacement:
      'function DO(){return(d()||navigator.userAgent.includes(`Linux`))&&window.electronBridge?.showApplicationMenu!=null}',
  },
  {
    target:
      'function Nn(){return gt()&&window.electronBridge?.showApplicationMenu!=null}',
    replacement:
      'function Nn(){return gt()&&window.electronBridge?.showApplicationMenu!=null}',
  },
  {
    target:
      'function $n(){let{platform:e}=nt();return e===`windows`&&window.electronBridge?.showApplicationMenu!=null}',
    replacement:
      'function $n(){let{platform:e}=nt();return(e===`windows`||e===`linux`)&&window.electronBridge?.showApplicationMenu!=null}',
  },
  {
    target: 'function In(){return yt()&&window.electronBridge?.showApplicationMenu!=null}',
    replacement:
      'function In(){let{platform:e}=at();return(e===`windows`||e===`linux`)&&window.electronBridge?.showApplicationMenu!=null}',
  },
  {
    target: 'function qP(){return Vke()&&window.electronBridge?.showApplicationMenu!=null}',
    replacement: 'function qP(){return Vke()&&window.electronBridge?.showApplicationMenu!=null}',
  },
  {
    target: 'function cO(){return ST()&&window.electronBridge?.showApplicationMenu!=null}',
    replacement: 'function cO(){return ST()&&window.electronBridge?.showApplicationMenu!=null}',
  },
  {
    target: 'function yQe(){return Lc()&&window.electronBridge?.showApplicationMenu!=null}',
    replacement:
      'function yQe(){return(Lc()||navigator.userAgent.includes(`Linux`))&&window.electronBridge?.showApplicationMenu!=null}',
  },
];
const appShellLinuxWindowsMenuPatchMarker =
  'return(e===`windows`||e===`linux`)&&window.electronBridge?.showApplicationMenu!=null';
const appShellLinuxApplicationMenuFunction =
  'function nr(){let e=D(),t=$n(),{platform:p}=nt(),h=p===`linux`&&typeof window.electronBridge?.getApplicationMenuItems==`function`,[n,r]=(0,Z.useState)(null),[m,g]=(0,Z.useState)([]),[_,v]=(0,Z.useState)(null),y=(0,Z.useRef)(0);if((0,Z.useEffect)(()=>{if(!h||!n)return;let e=e=>{e.key===`Escape`&&r(null)},t=e=>{let t=document.getElementById(`linux-application-menu-panel`);t&&!t.contains(e.target)&&!e.target.closest(`[data-linux-menu-trigger=true]`)&&r(null)};return document.addEventListener(`keydown`,e),document.addEventListener(`mousedown`,t),()=>{document.removeEventListener(`keydown`,e),document.removeEventListener(`mousedown`,t)}},[h,n]),!t)return null;let b=e=>e?e.replace(/CommandOrControl|CmdOrCtrl/g,`Ctrl`).replace(/Command/g,`Ctrl`).replace(/Control/g,`Ctrl`):``,x=async(e,t)=>{if(h){if(n===e){r(null);return}let i=t.currentTarget.getBoundingClientRect(),a=y.current+1;y.current=a,r(e),g([]);let o=await window.electronBridge.getApplicationMenuItems(e);y.current===a&&(v({left:Math.round(i.left),top:Math.round(i.bottom)}),g(o?.items??[]))}else{let n=window.electronBridge?.showApplicationMenu;if(!n)return;let i=y.current+1;y.current=i,r(e);let a=t.currentTarget.getBoundingClientRect();try{await n(e,Math.round(a.left),Math.round(a.bottom))}finally{y.current===i&&r(null)}}},S=async e=>{e.enabled!==!1&&n&&(await window.electronBridge?.clickApplicationMenuItem?.(n,e.path),r(null))},C=`no-drag rounded-md border border-transparent px-2.5 py-1 text-base font-normal leading-none outline-none transition-colors`,w=t=>c(C,n===t?`bg-[var(--color-token-menubar-selection-background)] text-[var(--color-token-menubar-selection-foreground)]`:`text-token-text-tertiary hover:bg-token-foreground/5 hover:text-token-description-foreground focus-visible:bg-token-foreground/5 focus-visible:text-token-description-foreground`);return(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsx)(`div`,{className:`flex items-center gap-0.5 pr-2 pl-1`,children:tr.map(({id:t,message:i})=>(0,Q.jsx)(`button`,{type:`button`,"data-linux-menu-trigger":h?`true`:void 0,"aria-expanded":n===t,"aria-haspopup":`menu`,"aria-label":e.formatMessage(i),className:w(t),onClick:e=>{x(t,e)},children:(0,Q.jsx)(k,{...i})},t))}),h&&n&&_&&(0,Q.jsx)(`div`,{id:`linux-application-menu-panel`,className:`no-drag fixed z-50 m-px flex min-w-[220px] flex-col rounded-xl bg-token-dropdown-background/90 p-1 text-token-foreground shadow-lg ring-[0.5px] ring-token-border backdrop-blur-sm select-none`,style:{left:_.left,top:_.top},children:m.map(t=>t.type===`separator`?(0,Q.jsx)(`div`,{className:`mx-1 my-1 border-t border-token-border/60`,role:`separator`},t.path):(0,Q.jsx)(`button`,{type:`button`,className:c(`flex w-full items-center gap-3 rounded-lg p-1.5 text-left text-sm outline-none transition-colors`,t.enabled===!1?`cursor-default opacity-50`:`cursor-interaction hover:bg-token-list-hover-background focus:bg-token-list-hover-background`),disabled:t.enabled===!1,onClick:()=>{S(t)},children:(0,Q.jsxs)(`span`,{className:`flex w-full items-center gap-3`,children:[(0,Q.jsx)(`span`,{className:`min-w-0 flex-1 truncate`,children:t.label}),t.accelerator?(0,Q.jsx)(`span`,{className:`shrink-0 pl-4 text-xs text-token-text-tertiary tabular-nums`,children:b(t.accelerator)}):null]})},t.path))})]})}';
const appShellLinuxApplicationMenuFunctionWithSubmenus =
  'function nr(){let e=D(),t=$n(),{platform:p}=nt(),h=p===`linux`&&typeof window.electronBridge?.getApplicationMenuItems==`function`,[n,r]=(0,Z.useState)(null),[m,g]=(0,Z.useState)([]),[_,v]=(0,Z.useState)(null),y=(0,Z.useRef)(0);if((0,Z.useEffect)(()=>{if(!h||!n)return;let e=e=>{e.key===`Escape`&&r(null)},t=e=>{let t=document.getElementById(`linux-application-menu-panel`);t&&!t.contains(e.target)&&!e.target.closest(`[data-linux-menu-trigger=true]`)&&r(null)};return document.addEventListener(`keydown`,e),document.addEventListener(`mousedown`,t),()=>{document.removeEventListener(`keydown`,e),document.removeEventListener(`mousedown`,t)}},[h,n]),!t)return null;let b=e=>e?e.replace(/CommandOrControl|CmdOrCtrl/g,`Ctrl`).replace(/Command/g,`Ctrl`).replace(/Control/g,`Ctrl`):``,x=async(e,t)=>{if(h){if(n===e){r(null);return}let i=t.currentTarget.getBoundingClientRect(),a=y.current+1;y.current=a,r(e),g([]);let o=await window.electronBridge.getApplicationMenuItems(e);y.current===a&&(v({left:Math.round(i.left),top:Math.round(i.bottom)}),g(o?.items??[]))}else{let n=window.electronBridge?.showApplicationMenu;if(!n)return;let i=y.current+1;y.current=i,r(e);let a=t.currentTarget.getBoundingClientRect();try{await n(e,Math.round(a.left),Math.round(a.bottom))}finally{y.current===i&&r(null)}}},S=async e=>{e.enabled!==!1&&!e.submenu&&n&&(await window.electronBridge?.clickApplicationMenuItem?.(n,e.path),r(null))},C=`no-drag rounded-md border border-transparent px-2.5 py-1 text-base font-normal leading-none outline-none transition-colors`,w=t=>c(C,n===t?`bg-[var(--color-token-menubar-selection-background)] text-[var(--color-token-menubar-selection-foreground)]`:`text-token-text-tertiary hover:bg-token-foreground/5 hover:text-token-description-foreground focus-visible:bg-token-foreground/5 focus-visible:text-token-description-foreground`),M=(e,t=0)=>e.flatMap(e=>e.type===`separator`?[(0,Q.jsx)(`div`,{className:`mx-1 my-1 border-t border-token-border/60`,role:`separator`},e.path)]:[(0,Q.jsx)(`button`,{type:`button`,"aria-haspopup":e.submenu?`menu`:void 0,className:c(`flex w-full items-center gap-3 rounded-lg p-1.5 text-left text-sm outline-none transition-colors`,e.enabled===!1?`cursor-default opacity-50`:e.submenu?`cursor-default text-token-text-tertiary`:`cursor-interaction hover:bg-token-list-hover-background focus:bg-token-list-hover-background`),disabled:e.enabled===!1,onClick:()=>{e.submenu?null:S(e)},children:(0,Q.jsxs)(`span`,{className:`flex w-full items-center gap-3`,style:{paddingLeft:t*14},children:[(0,Q.jsx)(`span`,{className:`min-w-0 flex-1 truncate`,children:e.label}),e.submenu?(0,Q.jsx)(`span`,{className:`shrink-0 text-xs text-token-text-tertiary`,children:`>`}):e.accelerator?(0,Q.jsx)(`span`,{className:`shrink-0 pl-4 text-xs text-token-text-tertiary tabular-nums`,children:b(e.accelerator)}):null]})},e.path),...(e.submenu?M(e.submenu,t+1):[])]);return(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsx)(`div`,{className:`flex items-center gap-0.5 pr-2 pl-1`,children:tr.map(({id:t,message:i})=>(0,Q.jsx)(`button`,{type:`button`,"data-linux-menu-trigger":h?`true`:void 0,"aria-expanded":n===t,"aria-haspopup":`menu`,"aria-label":e.formatMessage(i),className:w(t),onClick:e=>{x(t,e)},children:(0,Q.jsx)(k,{...i})},t))}),h&&n&&_&&(0,Q.jsx)(`div`,{id:`linux-application-menu-panel`,className:`no-drag fixed z-50 m-px flex min-w-[220px] flex-col rounded-xl bg-token-dropdown-background/90 p-1 text-token-foreground shadow-lg ring-[0.5px] ring-token-border backdrop-blur-sm select-none`,style:{left:_.left,top:_.top},children:M(m)})]})}';
const appShellLinuxApplicationMenuPatchTarget =
  'function In(){let e=v(),[t,n]=(0,Z.useState)(null),r=(0,Z.useRef)(0);if(!Nn())return null;let i=async(e,t)=>{let i=window.electronBridge?.showApplicationMenu;if(!i)return;let a=r.current+1;r.current=a,n(e);let o=t.currentTarget.getBoundingClientRect();try{await i(e,Math.round(o.left),Math.round(o.bottom))}finally{r.current===a&&n(null)}};return(0,Q.jsx)(`div`,{className:`flex items-center gap-0.5 pr-2 pl-1`,children:Fn.map(({id:n,message:r})=>(0,Q.jsx)(`button`,{type:`button`,"aria-expanded":t===n,"aria-haspopup":`menu`,"aria-label":e.formatMessage(r),className:w(`no-drag rounded-md border border-transparent px-2.5 py-1 text-base font-normal leading-none outline-none transition-colors`,t===n?`bg-[var(--color-token-menubar-selection-background)] text-[var(--color-token-menubar-selection-foreground)]`:`text-token-text-tertiary hover:bg-token-foreground/5 hover:text-token-description-foreground focus-visible:bg-token-foreground/5 focus-visible:text-token-description-foreground`),onClick:e=>{i(n,e)},children:(0,Q.jsx)(b,{...r})},n))})}';
const appShellLinuxApplicationMenuPatchReplacement =
  'function In(){let e=v(),t=Nn(),{platform:p}=it(),h=p===`linux`&&typeof window.electronBridge?.getApplicationMenuItems==`function`,[n,r]=(0,Z.useState)(null),[i,a]=(0,Z.useState)([]),[o,s]=(0,Z.useState)(null),c=(0,Z.useRef)(0);if((0,Z.useEffect)(()=>{if(!h||!n)return;let e=e=>{e.key===`Escape`&&r(null)},t=e=>{let t=document.getElementById(`linux-application-menu-panel`);t&&!t.contains(e.target)&&!e.target.closest(`[data-linux-menu-trigger=true]`)&&r(null)};return document.addEventListener(`keydown`,e),document.addEventListener(`mousedown`,t),()=>{document.removeEventListener(`keydown`,e),document.removeEventListener(`mousedown`,t)}},[h,n]),!t)return null;let l=e=>e?e.replace(/CommandOrControl|CmdOrCtrl/g,`Ctrl`).replace(/Command/g,`Ctrl`).replace(/Control/g,`Ctrl`):``,u=async(e,t)=>{if(h){if(n===e){r(null);return}let i=t.currentTarget.getBoundingClientRect(),o=c.current+1;c.current=o,r(e),a([]);let l=await window.electronBridge.getApplicationMenuItems(e);c.current===o&&(s({left:Math.round(i.left),top:Math.round(i.bottom)}),a(l?.items??[]))}else{let n=window.electronBridge?.showApplicationMenu;if(!n)return;let i=c.current+1;c.current=i,r(e);let a=t.currentTarget.getBoundingClientRect();try{await n(e,Math.round(a.left),Math.round(a.bottom))}finally{c.current===i&&r(null)}}},d=async e=>{e.enabled!==!1&&!e.submenu&&n&&(await window.electronBridge?.clickApplicationMenuItem?.(n,e.path),r(null))},f=(e,t=0)=>e.flatMap(e=>e.type===`separator`?[(0,Q.jsx)(`div`,{className:`mx-1 my-1 border-t border-token-border/60`,role:`separator`},e.path)]:[(0,Q.jsx)(`button`,{type:`button`,"aria-haspopup":e.submenu?`menu`:void 0,className:w(`flex w-full items-center gap-3 rounded-lg p-1.5 text-left text-sm outline-none transition-colors`,e.enabled===!1?`cursor-default opacity-50`:e.submenu?`cursor-default text-token-text-tertiary`:`cursor-interaction hover:bg-token-list-hover-background focus:bg-token-list-hover-background`),disabled:e.enabled===!1,onClick:()=>{e.submenu?null:d(e)},children:(0,Q.jsxs)(`span`,{className:`flex w-full items-center gap-3`,style:{paddingLeft:t*14},children:[(0,Q.jsx)(`span`,{className:`min-w-0 flex-1 truncate`,children:e.label}),e.submenu?(0,Q.jsx)(`span`,{className:`shrink-0 text-xs text-token-text-tertiary`,children:`>`}):e.accelerator?(0,Q.jsx)(`span`,{className:`shrink-0 pl-4 text-xs text-token-text-tertiary tabular-nums`,children:l(e.accelerator)}):null]})},e.path),...(e.submenu?f(e.submenu,t+1):[])]);return(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsx)(`div`,{className:`flex items-center gap-0.5 pr-2 pl-1`,children:Fn.map(({id:t,message:i})=>(0,Q.jsx)(`button`,{type:`button`,"data-linux-menu-trigger":h?`true`:void 0,"aria-expanded":n===t,"aria-haspopup":`menu`,"aria-label":e.formatMessage(i),className:w(`no-drag rounded-md border border-transparent px-2.5 py-1 text-base font-normal leading-none outline-none transition-colors`,n===t?`bg-[var(--color-token-menubar-selection-background)] text-[var(--color-token-menubar-selection-foreground)]`:`text-token-text-tertiary hover:bg-token-foreground/5 hover:text-token-description-foreground focus-visible:bg-token-foreground/5 focus-visible:text-token-description-foreground`),onClick:e=>{u(t,e)},children:(0,Q.jsx)(b,{...i})},t))}),h&&n&&o&&(0,Q.jsx)(`div`,{id:`linux-application-menu-panel`,className:`no-drag fixed z-50 m-px flex min-w-[220px] flex-col rounded-xl bg-token-dropdown-background/90 p-1 text-token-foreground shadow-lg ring-[0.5px] ring-token-border backdrop-blur-sm select-none`,style:{left:o.left,top:o.top},children:f(i)})]})}';
const appShellLinuxArtifactApplicationMenuPattern = /function RP\(\)[\s\S]*?\}(?=var zP)/;
const appShellLinuxArtifactApplicationMenuReplacement = "function RP(){let e=g(),t=IP(),h=navigator.userAgent.includes(`Linux`)&&typeof window.electronBridge?.getApplicationMenuItems==`function`,[n,r]=(0,zP.useState)(null),[i,a]=(0,zP.useState)([]),[o,s]=(0,zP.useState)(null),c=(0,zP.useRef)(0);if(!t&&!h)return null;let l=e=>e?e.replace(/CommandOrControl|CmdOrCtrl/g,`Ctrl`).replace(/Command/g,`Ctrl`).replace(/Control/g,`Ctrl`):``,u=async(e,t)=>{if(h){if(n===e){r(null);return}let i=t.currentTarget.getBoundingClientRect(),o=c.current+1;c.current=o,r(e),a([]);let l=await window.electronBridge.getApplicationMenuItems(e);c.current===o&&(s({left:Math.round(i.left),top:Math.round(i.bottom)}),a(l?.items??[]))}else{let n=window.electronBridge?.showApplicationMenu;if(!n)return;let i=c.current+1;c.current=i,r(e);let a=t.currentTarget.getBoundingClientRect();try{await n(e,Math.round(a.left),Math.round(a.bottom))}finally{c.current===i&&r(null)}}},d=async e=>{e.enabled!==!1&&!e.submenu&&n&&(await window.electronBridge?.clickApplicationMenuItem?.(n,e.path),r(null))},f=(e,t=0)=>e.flatMap(e=>e.type===`separator`?[(0,BP.jsx)(`div`,{className:`mx-1 my-1 border-t border-token-border/60`,role:`separator`},e.path)]:[(0,BP.jsx)(`button`,{type:`button`,\"aria-haspopup\":e.submenu?`menu`:void 0,className:m(`flex w-full items-center gap-3 rounded-lg p-1.5 text-left text-sm outline-none transition-colors`,e.enabled===!1?`cursor-default opacity-50`:e.submenu?`cursor-default text-token-text-tertiary`:`cursor-interaction hover:bg-token-list-hover-background focus:bg-token-list-hover-background`),disabled:e.enabled===!1,onClick:()=>{e.submenu?null:d(e)},children:(0,BP.jsxs)(`span`,{className:`flex w-full items-center gap-3`,style:{paddingLeft:t*14},children:[(0,BP.jsx)(`span`,{className:`min-w-0 flex-1 truncate`,children:e.label}),e.submenu?(0,BP.jsx)(`span`,{className:`shrink-0 text-xs text-token-text-tertiary`,children:`>`}):e.accelerator?(0,BP.jsx)(`span`,{className:`shrink-0 pl-4 text-xs text-token-text-tertiary tabular-nums`,children:l(e.accelerator)}):null]})},e.path),...(e.submenu?f(e.submenu,t+1):[])]);return(0,BP.jsxs)(BP.Fragment,{children:[(0,BP.jsx)(`div`,{className:`flex items-center gap-0.5 pr-2 pl-1`,children:HP.map(({id:t,message:i})=>(0,BP.jsx)(`button`,{type:`button`,\"data-linux-menu-trigger\":h?`true`:void 0,\"aria-expanded\":n===t,\"aria-haspopup\":`menu`,\"aria-label\":e.formatMessage(i),className:m(`no-drag rounded-md border border-transparent px-2.5 py-1 text-base font-normal leading-none outline-none transition-colors`,n===t?`bg-[var(--color-token-menubar-selection-background)] text-token-menubar-selection-foreground`:`text-token-text-tertiary hover:bg-token-foreground/5 hover:text-token-description-foreground focus-visible:bg-token-foreground/5 focus-visible:text-token-description-foreground`),onClick:e=>{u(t,e)},children:(0,BP.jsx)(_,{...i})},t))}),h&&n&&o&&(0,BP.jsx)(`div`,{id:`linux-application-menu-panel`,className:`no-drag fixed z-50 m-px flex min-w-[220px] flex-col rounded-xl bg-token-dropdown-background/90 p-1 text-token-foreground shadow-lg ring-[0.5px] ring-token-border backdrop-blur-sm select-none`,style:{left:o.left,top:o.top},children:f(i)})]})}";
const appShellLinuxApplicationMenuPatchAlternatives = [
  {
    target: "function RP(){let e=g(),[t,n]=(0,zP.useState)(null),r=(0,zP.useRef)(0);if(!IP())return null;let i=async(e,t)=>{let i=window.electronBridge?.showApplicationMenu;if(!i)return;let a=r.current+1;r.current=a,n(e);let o=t.currentTarget.getBoundingClientRect();try{await i(e,Math.round(o.left),Math.round(o.bottom))}finally{r.current===a&&n(null)}};return(0,BP.jsx)(`div`,{className:`flex items-center gap-0.5 pr-2 pl-1`,children:HP.map(({id:n,message:r})=>(0,BP.jsx)(`button`,{type:`button`,\"aria-expanded\":t===n,\"aria-haspopup\":`menu`,\"aria-label\":e.formatMessage(r),className:m(`no-drag rounded-md border border-transparent px-2.5 py-1 text-base font-normal leading-none outline-none transition-colors`,t===n?`bg-[var(--color-token-menubar-selection-background)] text-token-menubar-selection-foreground`:`text-token-text-tertiary hover:bg-token-foreground/5 hover:text-token-description-foreground focus-visible:bg-token-foreground/5 focus-visible:text-token-description-foreground`),onClick:e=>{i(n,e)},children:(0,BP.jsx)(_,{...r})},n))})}",
    replacement: "function RP(){let e=g(),t=IP(),h=navigator.userAgent.includes(`Linux`)&&typeof window.electronBridge?.getApplicationMenuItems==`function`,[n,r]=(0,zP.useState)(null),[i,a]=(0,zP.useState)([]),[o,s]=(0,zP.useState)(null),c=(0,zP.useRef)(0);if(!t&&!h)return null;let l=e=>e?e.replace(/CommandOrControl|CmdOrCtrl/g,`Ctrl`).replace(/Command/g,`Ctrl`).replace(/Control/g,`Ctrl`):``,u=async(e,t)=>{if(h){if(n===e){r(null);return}let i=t.currentTarget.getBoundingClientRect(),o=c.current+1;c.current=o,r(e),a([]);let l=await window.electronBridge.getApplicationMenuItems(e);c.current===o&&(s({left:Math.round(i.left),top:Math.round(i.bottom)}),a(l?.items??[]))}else{let n=window.electronBridge?.showApplicationMenu;if(!n)return;let i=c.current+1;c.current=i,r(e);let a=t.currentTarget.getBoundingClientRect();try{await n(e,Math.round(a.left),Math.round(a.bottom))}finally{c.current===i&&r(null)}}},d=async e=>{e.enabled!==!1&&!e.submenu&&n&&(await window.electronBridge?.clickApplicationMenuItem?.(n,e.path),r(null))},f=(e,t=0)=>e.flatMap(e=>e.type===`separator`?[(0,BP.jsx)(`div`,{className:`mx-1 my-1 border-t border-token-border/60`,role:`separator`},e.path)]:[(0,BP.jsx)(`button`,{type:`button`,\"aria-haspopup\":e.submenu?`menu`:void 0,className:m(`flex w-full items-center gap-3 rounded-lg p-1.5 text-left text-sm outline-none transition-colors`,e.enabled===!1?`cursor-default opacity-50`:e.submenu?`cursor-default text-token-text-tertiary`:`cursor-interaction hover:bg-token-list-hover-background focus:bg-token-list-hover-background`),disabled:e.enabled===!1,onClick:()=>{e.submenu?null:d(e)},children:(0,BP.jsxs)(`span`,{className:`flex w-full items-center gap-3`,style:{paddingLeft:t*14},children:[(0,BP.jsx)(`span`,{className:`min-w-0 flex-1 truncate`,children:e.label}),e.submenu?(0,BP.jsx)(`span`,{className:`shrink-0 text-xs text-token-text-tertiary`,children:`>`}):e.accelerator?(0,BP.jsx)(`span`,{className:`shrink-0 pl-4 text-xs text-token-text-tertiary tabular-nums`,children:l(e.accelerator)}):null]})},e.path),...(e.submenu?f(e.submenu,t+1):[])]);return(0,BP.jsxs)(BP.Fragment,{children:[(0,BP.jsx)(`div`,{className:`flex items-center gap-0.5 pr-2 pl-1`,children:HP.map(({id:t,message:i})=>(0,BP.jsx)(`button`,{type:`button`,\"data-linux-menu-trigger\":h?`true`:void 0,\"aria-expanded\":n===t,\"aria-haspopup\":`menu`,\"aria-label\":e.formatMessage(i),className:m(`no-drag rounded-md border border-transparent px-2.5 py-1 text-base font-normal leading-none outline-none transition-colors`,n===t?`bg-[var(--color-token-menubar-selection-background)] text-token-menubar-selection-foreground`:`text-token-text-tertiary hover:bg-token-foreground/5 hover:text-token-description-foreground focus-visible:bg-token-foreground/5 focus-visible:text-token-description-foreground`),onClick:e=>{u(t,e)},children:(0,BP.jsx)(_,{...i})},t))}),h&&n&&o&&(0,BP.jsx)(`div`,{id:`linux-application-menu-panel`,className:`no-drag fixed z-50 m-px flex min-w-[220px] flex-col rounded-xl bg-token-dropdown-background/90 p-1 text-token-foreground shadow-lg ring-[0.5px] ring-token-border backdrop-blur-sm select-none`,style:{left:o.left,top:o.top},children:f(i)})]})}",
  },

  {
    target:
      'function Zgi(){let e=Ea(),[t,n]=(0,Qgi.useState)(null),r=(0,Qgi.useRef)(0);',
    replacement:
      'function Zgi(){let e=Ea(),[t,n]=(0,Qgi.useState)(null),r=(0,Qgi.useRef)(0);',
  },
  {
    target:
      'function xQe(){let e=vs(),[t,n]=(0,SQe.useState)(null),r=(0,SQe.useRef)(0);if(!yQe())return null;let i=async(e,t)=>{let i=window.electronBridge?.showApplicationMenu;if(!i)return;let a=r.current+1;r.current=a,n(e);let o=t.currentTarget.getBoundingClientRect();try{await i(e,Math.round(o.left),Math.round(o.bottom))}finally{r.current===a&&n(null)}};return(0,EA.jsx)(`div`,{className:`flex items-center gap-0.5 pr-2 pl-1`,children:CQe.map(({id:n,message:r})=>(0,EA.jsx)(`button`,{type:`button`,"aria-expanded":t===n,"aria-haspopup":`menu`,"aria-label":e.formatMessage(r),className:Q(`no-drag rounded-md border border-transparent px-2.5 py-1 text-base font-normal leading-none outline-none transition-colors`,t===n?`bg-[var(--color-token-menubar-selection-background)] text-[var(--color-token-menubar-selection-foreground)]`:`text-token-text-tertiary hover:bg-token-foreground/5 hover:text-token-description-foreground focus-visible:bg-token-foreground/5 focus-visible:text-token-description-foreground`),onClick:e=>{i(n,e)},children:(0,EA.jsx)($,{...r})},n))})}',
    replacement:
      'function xQe(){let e=vs(),t=yQe(),h=navigator.userAgent.includes(`Linux`)&&typeof window.electronBridge?.getApplicationMenuItems==`function`,[n,r]=(0,SQe.useState)(null),[i,a]=(0,SQe.useState)([]),[o,s]=(0,SQe.useState)(null),c=(0,SQe.useRef)(0);if((0,SQe.useEffect)(()=>{if(!h||!n)return;let e=e=>{e.key===`Escape`&&r(null)},t=e=>{let t=document.getElementById(`linux-application-menu-panel`);t&&!t.contains(e.target)&&!e.target.closest(`[data-linux-menu-trigger=true]`)&&r(null)};return document.addEventListener(`keydown`,e),document.addEventListener(`mousedown`,t),()=>{document.removeEventListener(`keydown`,e),document.removeEventListener(`mousedown`,t)}},[h,n]),!t)return null;let l=e=>e?e.replace(/CommandOrControl|CmdOrCtrl/g,`Ctrl`).replace(/Command/g,`Ctrl`).replace(/Control/g,`Ctrl`):``,u=async(e,t)=>{if(h){if(n===e){r(null);return}let i=t.currentTarget.getBoundingClientRect(),o=c.current+1;c.current=o,r(e),a([]);let l=await window.electronBridge.getApplicationMenuItems(e);c.current===o&&(s({left:Math.round(i.left),top:Math.round(i.bottom)}),a(l?.items??[]))}else{let n=window.electronBridge?.showApplicationMenu;if(!n)return;let i=c.current+1;c.current=i,r(e);let a=t.currentTarget.getBoundingClientRect();try{await n(e,Math.round(a.left),Math.round(a.bottom))}finally{c.current===i&&r(null)}}},d=async e=>{e.enabled!==!1&&!e.submenu&&n&&(await window.electronBridge?.clickApplicationMenuItem?.(n,e.path),r(null))},f=(e,t=0)=>e.flatMap(e=>e.type===`separator`?[(0,EA.jsx)(`div`,{className:`mx-1 my-1 border-t border-token-border/60`,role:`separator`},e.path)]:[(0,EA.jsx)(`button`,{type:`button`,"aria-haspopup":e.submenu?`menu`:void 0,className:Q(`flex w-full items-center gap-3 rounded-lg p-1.5 text-left text-sm outline-none transition-colors`,e.enabled===!1?`cursor-default opacity-50`:e.submenu?`cursor-default text-token-text-tertiary`:`cursor-interaction hover:bg-token-list-hover-background focus:bg-token-list-hover-background`),disabled:e.enabled===!1,onClick:()=>{e.submenu?null:d(e)},children:(0,EA.jsxs)(`span`,{className:`flex w-full items-center gap-3`,style:{paddingLeft:t*14},children:[(0,EA.jsx)(`span`,{className:`min-w-0 flex-1 truncate`,children:e.label}),e.submenu?(0,EA.jsx)(`span`,{className:`shrink-0 text-xs text-token-text-tertiary`,children:`>`}):e.accelerator?(0,EA.jsx)(`span`,{className:`shrink-0 pl-4 text-xs text-token-text-tertiary tabular-nums`,children:l(e.accelerator)}):null]})},e.path),...(e.submenu?f(e.submenu,t+1):[])]);return(0,EA.jsxs)(EA.Fragment,{children:[(0,EA.jsx)(`div`,{className:`flex items-center gap-0.5 pr-2 pl-1`,children:CQe.map(({id:t,message:i})=>(0,EA.jsx)(`button`,{type:`button`,"data-linux-menu-trigger":h?`true`:void 0,"aria-expanded":n===t,"aria-haspopup":`menu`,"aria-label":e.formatMessage(i),className:Q(`no-drag rounded-md border border-transparent px-2.5 py-1 text-base font-normal leading-none outline-none transition-colors`,n===t?`bg-[var(--color-token-menubar-selection-background)] text-[var(--color-token-menubar-selection-foreground)]`:`text-token-text-tertiary hover:bg-token-foreground/5 hover:text-token-description-foreground focus-visible:bg-token-foreground/5 focus-visible:text-token-description-foreground`),onClick:e=>{u(t,e)},children:(0,EA.jsx)($,{...i})},t))}),h&&n&&o&&(0,EA.jsx)(`div`,{id:`linux-application-menu-panel`,className:`no-drag fixed z-50 m-px flex min-w-[220px] flex-col rounded-xl bg-token-dropdown-background/90 p-1 text-token-foreground shadow-lg ring-[0.5px] ring-token-border backdrop-blur-sm select-none`,style:{left:o.left,top:o.top},children:f(i)})]})}',
  },
  {
    target:
      'function Hme(){let e=Ra(),[t,n]=(0,kO.useState)(null),r=(0,kO.useRef)(0);if(!DO())return null;let i=async(e,t)=>{let i=window.electronBridge?.showApplicationMenu;if(!i)return;let a=r.current+1;r.current=a,n(e);let o=t.currentTarget.getBoundingClientRect();try{await i(e,Math.round(o.left),Math.round(o.bottom))}finally{r.current===a&&n(null)}};return(0,AO.jsx)(`div`,{className:`flex items-center gap-0.5 pr-2 pl-1`,children:Ume.map(({id:n,message:r})=>(0,AO.jsx)(`button`,{type:`button`,"aria-expanded":t===n,"aria-haspopup":`menu`,"aria-label":e.formatMessage(r),className:Q(`no-drag rounded-md border border-transparent px-2.5 py-1 text-base font-normal leading-none outline-none transition-colors`,t===n?`bg-[var(--color-token-menubar-selection-background)] text-[var(--color-token-menubar-selection-foreground)]`:`text-token-text-tertiary hover:bg-token-foreground/5 hover:text-token-description-foreground focus-visible:bg-token-foreground/5 focus-visible:text-token-description-foreground`),onClick:e=>{i(n,e)},children:(0,AO.jsx)(q,{...r})},n))})}',
    replacement:
      'function Hme(){let e=Ra(),t=DO(),h=navigator.userAgent.includes(`Linux`)&&typeof window.electronBridge?.getApplicationMenuItems==`function`,[n,r]=(0,kO.useState)(null),[i,a]=(0,kO.useState)([]),[o,s]=(0,kO.useState)(null),c=(0,kO.useRef)(0);if((0,kO.useEffect)(()=>{if(!h||!n)return;let e=e=>{e.key===`Escape`&&r(null)},t=e=>{let t=document.getElementById(`linux-application-menu-panel`);t&&!t.contains(e.target)&&!e.target.closest(`[data-linux-menu-trigger=true]`)&&r(null)};return document.addEventListener(`keydown`,e),document.addEventListener(`mousedown`,t),()=>{document.removeEventListener(`keydown`,e),document.removeEventListener(`mousedown`,t)}},[h,n]),!t)return null;let l=e=>e?e.replace(/CommandOrControl|CmdOrCtrl/g,`Ctrl`).replace(/Command/g,`Ctrl`).replace(/Control/g,`Ctrl`):``,u=async(e,t)=>{if(h){if(n===e){r(null);return}let i=t.currentTarget.getBoundingClientRect(),o=c.current+1;c.current=o,r(e),a([]);let l=await window.electronBridge.getApplicationMenuItems(e);c.current===o&&(s({left:Math.round(i.left),top:Math.round(i.bottom)}),a(l?.items??[]))}else{let n=window.electronBridge?.showApplicationMenu;if(!n)return;let i=c.current+1;c.current=i,r(e);let a=t.currentTarget.getBoundingClientRect();try{await n(e,Math.round(a.left),Math.round(a.bottom))}finally{c.current===i&&r(null)}}},d=async e=>{e.enabled!==!1&&!e.submenu&&n&&(await window.electronBridge?.clickApplicationMenuItem?.(n,e.path),r(null))},f=(e,t=0)=>e.flatMap(e=>e.type===`separator`?[(0,AO.jsx)(`div`,{className:`mx-1 my-1 border-t border-token-border/60`,role:`separator`},e.path)]:[(0,AO.jsx)(`button`,{type:`button`,"aria-haspopup":e.submenu?`menu`:void 0,className:Q(`flex w-full items-center gap-3 rounded-lg p-1.5 text-left text-sm outline-none transition-colors`,e.enabled===!1?`cursor-default opacity-50`:e.submenu?`cursor-default text-token-text-tertiary`:`cursor-interaction hover:bg-token-list-hover-background focus:bg-token-list-hover-background`),disabled:e.enabled===!1,onClick:()=>{e.submenu?null:d(e)},children:(0,AO.jsxs)(`span`,{className:`flex w-full items-center gap-3`,style:{paddingLeft:t*14},children:[(0,AO.jsx)(`span`,{className:`min-w-0 flex-1 truncate`,children:e.label}),e.submenu?(0,AO.jsx)(`span`,{className:`shrink-0 text-xs text-token-text-tertiary`,children:`>`}):e.accelerator?(0,AO.jsx)(`span`,{className:`shrink-0 pl-4 text-xs text-token-text-tertiary tabular-nums`,children:l(e.accelerator)}):null]})},e.path),...(e.submenu?f(e.submenu,t+1):[])]);return(0,AO.jsxs)(AO.Fragment,{children:[(0,AO.jsx)(`div`,{className:`flex items-center gap-0.5 pr-2 pl-1`,children:Ume.map(({id:t,message:i})=>(0,AO.jsx)(`button`,{type:`button`,"data-linux-menu-trigger":h?`true`:void 0,"aria-expanded":n===t,"aria-haspopup":`menu`,"aria-label":e.formatMessage(i),className:Q(`no-drag rounded-md border border-transparent px-2.5 py-1 text-base font-normal leading-none outline-none transition-colors`,n===t?`bg-[var(--color-token-menubar-selection-background)] text-[var(--color-token-menubar-selection-foreground)]`:`text-token-text-tertiary hover:bg-token-foreground/5 hover:text-token-description-foreground focus-visible:bg-token-foreground/5 focus-visible:text-token-description-foreground`),onClick:e=>{u(t,e)},children:(0,AO.jsx)(q,{...i})},t))}),h&&n&&o&&(0,AO.jsx)(`div`,{id:`linux-application-menu-panel`,className:`no-drag fixed z-50 m-px flex min-w-[220px] flex-col rounded-xl bg-token-dropdown-background/90 p-1 text-token-foreground shadow-lg ring-[0.5px] ring-token-border backdrop-blur-sm select-none`,style:{left:o.left,top:o.top},children:f(i)})]})}',
  },
  {
    target: appShellLinuxApplicationMenuPatchTarget,
    replacement: appShellLinuxApplicationMenuPatchReplacement,
  },
  {
    target:
      'function uO(){let e=oe(),[t,n]=(0,dO.useState)(null),r=(0,dO.useRef)(0);if(!cO())return null;let i=async(e,t)=>{let i=window.electronBridge?.showApplicationMenu;if(!i)return;let a=r.current+1;r.current=a,n(e);let o=t.currentTarget.getBoundingClientRect();try{await i(e,Math.round(o.left),Math.round(o.bottom))}finally{r.current===a&&n(null)}};return(0,fO.jsx)(`div`,{className:`flex items-center gap-0.5 pr-2 pl-1`,children:mO.map(({id:n,message:r})=>(0,fO.jsx)(`button`,{type:`button`,"aria-expanded":t===n,"aria-haspopup":`menu`,"aria-label":e.formatMessage(r),className:U(`no-drag rounded-md border border-transparent px-2.5 py-1 text-base font-normal leading-none outline-none transition-colors`,t===n?`bg-[var(--color-token-menubar-selection-background)] text-[var(--color-token-menubar-selection-foreground)]`:`text-token-text-tertiary hover:bg-token-foreground/5 hover:text-token-description-foreground focus-visible:bg-token-foreground/5 focus-visible:text-token-description-foreground`),onClick:e=>{i(n,e)},children:(0,fO.jsx)(E,{...r})},n))})}',
    replacement:
      'function uO(){let e=oe(),t=cO(),{platform:p}=Be(),h=p===`linux`&&typeof window.electronBridge?.getApplicationMenuItems==`function`,[n,r]=(0,dO.useState)(null),[i,a]=(0,dO.useState)([]),[o,s]=(0,dO.useState)(null),c=(0,dO.useRef)(0);if((0,dO.useEffect)(()=>{if(!h||!n)return;let e=e=>{e.key===`Escape`&&r(null)},t=e=>{let t=document.getElementById(`linux-application-menu-panel`);t&&!t.contains(e.target)&&!e.target.closest(`[data-linux-menu-trigger=true]`)&&r(null)};return document.addEventListener(`keydown`,e),document.addEventListener(`mousedown`,t),()=>{document.removeEventListener(`keydown`,e),document.removeEventListener(`mousedown`,t)}},[h,n]),!t)return null;let l=e=>e?e.replace(/CommandOrControl|CmdOrCtrl/g,`Ctrl`).replace(/Command/g,`Ctrl`).replace(/Control/g,`Ctrl`):``,u=async(e,t)=>{if(h){if(n===e){r(null);return}let i=t.currentTarget.getBoundingClientRect(),o=c.current+1;c.current=o,r(e),a([]);let l=await window.electronBridge.getApplicationMenuItems(e);c.current===o&&(s({left:Math.round(i.left),top:Math.round(i.bottom)}),a(l?.items??[]))}else{let n=window.electronBridge?.showApplicationMenu;if(!n)return;let i=c.current+1;c.current=i,r(e);let a=t.currentTarget.getBoundingClientRect();try{await n(e,Math.round(a.left),Math.round(a.bottom))}finally{c.current===i&&r(null)}}},d=async e=>{e.enabled!==!1&&!e.submenu&&n&&(await window.electronBridge?.clickApplicationMenuItem?.(n,e.path),r(null))},f=(e,t=0)=>e.flatMap(e=>e.type===`separator`?[(0,fO.jsx)(`div`,{className:`mx-1 my-1 border-t border-token-border/60`,role:`separator`},e.path)]:[(0,fO.jsx)(`button`,{type:`button`,"aria-haspopup":e.submenu?`menu`:void 0,className:U(`flex w-full items-center gap-3 rounded-lg p-1.5 text-left text-sm outline-none transition-colors`,e.enabled===!1?`cursor-default opacity-50`:e.submenu?`cursor-default text-token-text-tertiary`:`cursor-interaction hover:bg-token-list-hover-background focus:bg-token-list-hover-background`),disabled:e.enabled===!1,onClick:()=>{e.submenu?null:d(e)},children:(0,fO.jsxs)(`span`,{className:`flex w-full items-center gap-3`,style:{paddingLeft:t*14},children:[(0,fO.jsx)(`span`,{className:`min-w-0 flex-1 truncate`,children:e.label}),e.submenu?(0,fO.jsx)(`span`,{className:`shrink-0 text-xs text-token-text-tertiary`,children:`>`}):e.accelerator?(0,fO.jsx)(`span`,{className:`shrink-0 pl-4 text-xs text-token-text-tertiary tabular-nums`,children:l(e.accelerator)}):null]})},e.path),...(e.submenu?f(e.submenu,t+1):[])]);return(0,fO.jsxs)(fO.Fragment,{children:[(0,fO.jsx)(`div`,{className:`flex items-center gap-0.5 pr-2 pl-1`,children:mO.map(({id:t,message:i})=>(0,fO.jsx)(`button`,{type:`button`,"data-linux-menu-trigger":h?`true`:void 0,"aria-expanded":n===t,"aria-haspopup":`menu`,"aria-label":e.formatMessage(i),className:U(`no-drag rounded-md border border-transparent px-2.5 py-1 text-base font-normal leading-none outline-none transition-colors`,n===t?`bg-[var(--color-token-menubar-selection-background)] text-[var(--color-token-menubar-selection-foreground)]`:`text-token-text-tertiary hover:bg-token-foreground/5 hover:text-token-description-foreground focus-visible:bg-token-foreground/5 focus-visible:text-token-description-foreground`),onClick:e=>{u(t,e)},children:(0,fO.jsx)(E,{...i})},t))}),h&&n&&o&&(0,fO.jsx)(`div`,{id:`linux-application-menu-panel`,className:`no-drag fixed z-50 m-px flex min-w-[220px] flex-col rounded-xl bg-token-dropdown-background/90 p-1 text-token-foreground shadow-lg ring-[0.5px] ring-token-border backdrop-blur-sm select-none`,style:{left:o.left,top:o.top},children:f(i)})]})}',
  },
  {
    target:
      'function zn(){let e=v(),[t,n]=(0,Z.useState)(null),r=(0,Z.useRef)(0);if(!In())return null;let i=async(e,t)=>{let i=window.electronBridge?.showApplicationMenu;if(!i)return;let a=r.current+1;r.current=a,n(e);let o=t.currentTarget.getBoundingClientRect();try{await i(e,Math.round(o.left),Math.round(o.bottom))}finally{r.current===a&&n(null)}};return(0,Q.jsx)(`div`,{className:`flex items-center gap-0.5 pr-2 pl-1`,children:Rn.map(({id:n,message:r})=>(0,Q.jsx)(`button`,{type:`button`,"aria-expanded":t===n,"aria-haspopup":`menu`,"aria-label":e.formatMessage(r),className:C(`no-drag rounded-md border border-transparent px-2.5 py-1 text-base font-normal leading-none outline-none transition-colors`,t===n?`bg-[var(--color-token-menubar-selection-background)] text-[var(--color-token-menubar-selection-foreground)]`:`text-token-text-tertiary hover:bg-token-foreground/5 hover:text-token-description-foreground focus-visible:bg-token-foreground/5 focus-visible:text-token-description-foreground`),onClick:e=>{i(n,e)},children:(0,Q.jsx)(b,{...r})},n))})}',
    replacement:
      'function zn(){let e=v(),t=In(),{platform:p}=at(),h=p===`linux`&&typeof window.electronBridge?.getApplicationMenuItems==`function`,[n,r]=(0,Z.useState)(null),[i,a]=(0,Z.useState)([]),[o,s]=(0,Z.useState)(null),c=(0,Z.useRef)(0);if((0,Z.useEffect)(()=>{if(!h||!n)return;let e=e=>{e.key===`Escape`&&r(null)},t=e=>{let t=document.getElementById(`linux-application-menu-panel`);t&&!t.contains(e.target)&&!e.target.closest(`[data-linux-menu-trigger=true]`)&&r(null)};return document.addEventListener(`keydown`,e),document.addEventListener(`mousedown`,t),()=>{document.removeEventListener(`keydown`,e),document.removeEventListener(`mousedown`,t)}},[h,n]),!t)return null;let l=e=>e?e.replace(/CommandOrControl|CmdOrCtrl/g,`Ctrl`).replace(/Command/g,`Ctrl`).replace(/Control/g,`Ctrl`):``,u=async(e,t)=>{if(h){if(n===e){r(null);return}let i=t.currentTarget.getBoundingClientRect(),o=c.current+1;c.current=o,r(e),a([]);let l=await window.electronBridge.getApplicationMenuItems(e);c.current===o&&(s({left:Math.round(i.left),top:Math.round(i.bottom)}),a(l?.items??[]))}else{let n=window.electronBridge?.showApplicationMenu;if(!n)return;let i=c.current+1;c.current=i,r(e);let a=t.currentTarget.getBoundingClientRect();try{await n(e,Math.round(a.left),Math.round(a.bottom))}finally{c.current===i&&r(null)}}},d=async e=>{e.enabled!==!1&&!e.submenu&&n&&(await window.electronBridge?.clickApplicationMenuItem?.(n,e.path),r(null))},f=(e,t=0)=>e.flatMap(e=>e.type===`separator`?[(0,Q.jsx)(`div`,{className:`mx-1 my-1 border-t border-token-border/60`,role:`separator`},e.path)]:[(0,Q.jsx)(`button`,{type:`button`,"aria-haspopup":e.submenu?`menu`:void 0,className:C(`flex w-full items-center gap-3 rounded-lg p-1.5 text-left text-sm outline-none transition-colors`,e.enabled===!1?`cursor-default opacity-50`:e.submenu?`cursor-default text-token-text-tertiary`:`cursor-interaction hover:bg-token-list-hover-background focus:bg-token-list-hover-background`),disabled:e.enabled===!1,onClick:()=>{e.submenu?null:d(e)},children:(0,Q.jsxs)(`span`,{className:`flex w-full items-center gap-3`,style:{paddingLeft:t*14},children:[(0,Q.jsx)(`span`,{className:`min-w-0 flex-1 truncate`,children:e.label}),e.submenu?(0,Q.jsx)(`span`,{className:`shrink-0 text-xs text-token-text-tertiary`,children:`>`}):e.accelerator?(0,Q.jsx)(`span`,{className:`shrink-0 pl-4 text-xs text-token-text-tertiary tabular-nums`,children:l(e.accelerator)}):null]})},e.path),...(e.submenu?f(e.submenu,t+1):[])]);return(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsx)(`div`,{className:`flex items-center gap-0.5 pr-2 pl-1`,children:Rn.map(({id:t,message:i})=>(0,Q.jsx)(`button`,{type:`button`,"data-linux-menu-trigger":h?`true`:void 0,"aria-expanded":n===t,"aria-haspopup":`menu`,"aria-label":e.formatMessage(i),className:C(`no-drag rounded-md border border-transparent px-2.5 py-1 text-base font-normal leading-none outline-none transition-colors`,n===t?`bg-[var(--color-token-menubar-selection-background)] text-[var(--color-token-menubar-selection-foreground)]`:`text-token-text-tertiary hover:bg-token-foreground/5 hover:text-token-description-foreground focus-visible:bg-token-foreground/5 focus-visible:text-token-description-foreground`),onClick:e=>{u(t,e)},children:(0,Q.jsx)(b,{...i})},t))}),h&&n&&o&&(0,Q.jsx)(`div`,{id:`linux-application-menu-panel`,className:`no-drag fixed z-50 m-px flex min-w-[220px] flex-col rounded-xl bg-token-dropdown-background/90 p-1 text-token-foreground shadow-lg ring-[0.5px] ring-token-border backdrop-blur-sm select-none`,style:{left:o.left,top:o.top},children:f(i)})]})}',
  },
  {
    target:
      'function hWe(){let e=md(),[t,n]=(0,YP.useState)(null),r=(0,YP.useRef)(0);if(!qP())return null;let i=async(e,t)=>{let i=window.electronBridge?.showApplicationMenu;if(!i)return;let a=r.current+1;r.current=a,n(e);let o=t.currentTarget.getBoundingClientRect();try{await i(e,Math.round(o.left),Math.round(o.bottom))}finally{r.current===a&&n(null)}};return(0,XP.jsx)(`div`,{className:`flex items-center gap-0.5 pr-2 pl-1`,children:gWe.map(({id:n,message:r})=>(0,XP.jsx)(`button`,{type:`button`,"aria-expanded":t===n,"aria-haspopup":`menu`,"aria-label":e.formatMessage(r),className:$(`no-drag rounded-md border border-transparent px-2.5 py-1 text-base font-normal leading-none outline-none transition-colors`,t===n?`bg-[var(--color-token-menubar-selection-background)] text-[var(--color-token-menubar-selection-foreground)]`:`text-token-text-tertiary hover:bg-token-foreground/5 hover:text-token-description-foreground focus-visible:bg-token-foreground/5 focus-visible:text-token-description-foreground`),onClick:e=>{i(n,e)},children:(0,XP.jsx)(Q,{...r})},n))})}',
    replacement:
      'function hWe(){let e=md(),t=qP(),h=typeof window.electronBridge?.getApplicationMenuItems==`function`,[n,r]=(0,YP.useState)(null),[i,a]=(0,YP.useState)([]),[o,s]=(0,YP.useState)(null),c=(0,YP.useRef)(0);if((0,YP.useEffect)(()=>{if(!h||!n)return;let e=e=>{e.key===`Escape`&&r(null)},t=e=>{let t=document.getElementById(`linux-application-menu-panel`);t&&!t.contains(e.target)&&!e.target.closest(`[data-linux-menu-trigger=true]`)&&r(null)};return document.addEventListener(`keydown`,e),document.addEventListener(`mousedown`,t),()=>{document.removeEventListener(`keydown`,e),document.removeEventListener(`mousedown`,t)}},[h,n]),!t)return null;let l=e=>e?e.replace(/CommandOrControl|CmdOrCtrl/g,`Ctrl`).replace(/Command/g,`Ctrl`).replace(/Control/g,`Ctrl`):``,u=async(e,t)=>{if(h){if(n===e){r(null);return}let i=t.currentTarget.getBoundingClientRect(),o=c.current+1;c.current=o,r(e),a([]);let l=await window.electronBridge.getApplicationMenuItems(e);c.current===o&&(s({left:Math.round(i.left),top:Math.round(i.bottom)}),a(l?.items??[]))}else{let n=window.electronBridge?.showApplicationMenu;if(!n)return;let i=c.current+1;c.current=i,r(e);let a=t.currentTarget.getBoundingClientRect();try{await n(e,Math.round(a.left),Math.round(a.bottom))}finally{c.current===i&&r(null)}}},d=async e=>{e.enabled!==!1&&!e.submenu&&n&&(await window.electronBridge?.clickApplicationMenuItem?.(n,e.path),r(null))},f=(e,t=0)=>e.flatMap(e=>e.type===`separator`?[(0,XP.jsx)(`div`,{className:`mx-1 my-1 border-t border-token-border/60`,role:`separator`},e.path)]:[(0,XP.jsx)(`button`,{type:`button`,"aria-haspopup":e.submenu?`menu`:void 0,className:$(`flex w-full items-center gap-3 rounded-lg p-1.5 text-left text-sm outline-none transition-colors`,e.enabled===!1?`cursor-default opacity-50`:e.submenu?`cursor-default text-token-text-tertiary`:`cursor-interaction hover:bg-token-list-hover-background focus:bg-token-list-hover-background`),disabled:e.enabled===!1,onClick:()=>{e.submenu?null:d(e)},children:(0,XP.jsxs)(`span`,{className:`flex w-full items-center gap-3`,style:{paddingLeft:t*14},children:[(0,XP.jsx)(`span`,{className:`min-w-0 flex-1 truncate`,children:e.label}),e.submenu?(0,XP.jsx)(`span`,{className:`shrink-0 text-xs text-token-text-tertiary`,children:`>`}):e.accelerator?(0,XP.jsx)(`span`,{className:`shrink-0 pl-4 text-xs text-token-text-tertiary tabular-nums`,children:l(e.accelerator)}):null]})},e.path),...(e.submenu?f(e.submenu,t+1):[])]);return(0,XP.jsxs)(XP.Fragment,{children:[(0,XP.jsx)(`div`,{className:`flex items-center gap-0.5 pr-2 pl-1`,children:gWe.map(({id:t,message:i})=>(0,XP.jsx)(`button`,{type:`button`,"data-linux-menu-trigger":h?`true`:void 0,"aria-expanded":n===t,"aria-haspopup":`menu`,"aria-label":e.formatMessage(i),className:$(`no-drag rounded-md border border-transparent px-2.5 py-1 text-base font-normal leading-none outline-none transition-colors`,n===t?`bg-[var(--color-token-menubar-selection-background)] text-[var(--color-token-menubar-selection-foreground)]`:`text-token-text-tertiary hover:bg-token-foreground/5 hover:text-token-description-foreground focus-visible:bg-token-foreground/5 focus-visible:text-token-description-foreground`),onClick:e=>{u(t,e)},children:(0,XP.jsx)(Q,{...i})},t))}),h&&n&&o&&(0,XP.jsx)(`div`,{id:`linux-application-menu-panel`,className:`no-drag fixed z-50 m-px flex min-w-[220px] flex-col rounded-xl bg-token-dropdown-background/90 p-1 text-token-foreground shadow-lg ring-[0.5px] ring-token-border backdrop-blur-sm select-none`,style:{left:o.left,top:o.top},children:f(i)})]})}',
  },
];
const appShellLinuxApplicationMenuPatchMarker = 'linux-application-menu-panel';
const appShellLinuxApplicationMenuUpgradePatchPattern =
  /function nr\(\)\{let e=D\(\),t=\$n\(\),[\s\S]*?\}(?=var rr=|;?function ar\(|;?function LinuxWindowControls\(\)|;?function \$r\(e\)\{return null\})/;
const appShellLinuxApplicationMenuUpgradePatchMarker = 'linux-application-menu-panel';
// Close icon uses useState for red hover: plain hover:text-token-charts-red is not in app-main CSS.
const appShellLinuxWindowControlsFunction =
  'function LinuxWindowControls(){let{platform:e}=nt(),t=window.electronBridge?.controlWindow;if(e!==`linux`||typeof t!=`function`)return null;let n=e=>()=>{void t(e)},[a,u]=(0,Z.useState)(!1),o=`no-drag cursor-interaction inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-transparent bg-transparent p-0 outline-none transition-colors hover:bg-token-foreground/5 focus-visible:bg-token-foreground/5`,r=c(o,`text-token-text-tertiary hover:text-token-description-foreground focus-visible:text-token-description-foreground`),i=c(o,a?`text-token-charts-red`:`text-token-text-tertiary`);return(0,Q.jsxs)(`div`,{"data-linux-codex-window-controls":`true`,className:`no-drag ml-auto flex shrink-0 items-center gap-0.5 pe-2`,children:[(0,Q.jsx)(`button`,{type:`button`,className:r,onClick:n(`minimize`),"aria-label":`Minimize`,children:(0,Q.jsx)(`svg`,{className:`h-2.5 w-2.5`,viewBox:`0 0 10 10`,fill:`none`,"aria-hidden":`true`,children:(0,Q.jsx)(`path`,{d:`M0 5h10`,stroke:`currentColor`,strokeWidth:1})})}),(0,Q.jsx)(`button`,{type:`button`,className:r,onClick:n(`maximize`),"aria-label":`Maximize`,children:(0,Q.jsx)(`svg`,{className:`h-2.5 w-2.5`,viewBox:`0 0 10 10`,fill:`none`,"aria-hidden":`true`,children:(0,Q.jsx)(`rect`,{x:.5,y:.5,width:9,height:9,stroke:`currentColor`,strokeWidth:1})})}),(0,Q.jsx)(`button`,{type:`button`,className:i,onMouseEnter:()=>u(!0),onMouseLeave:()=>u(!1),onFocus:()=>u(!0),onBlur:()=>u(!1),onClick:n(`close`),"aria-label":`Close`,children:(0,Q.jsx)(`svg`,{className:`h-2.5 w-2.5`,viewBox:`0 0 10 10`,fill:`none`,"aria-hidden":`true`,children:(0,Q.jsx)(`path`,{d:`M1 1l8 8M9 1L1 9`,stroke:`currentColor`,strokeWidth:1})})})]})}';
const appShellLinuxWindowControlsPatchAlternatives = [
  {
    target:
      "function Iu(){let e=(0,Lu.c)(1),t;return e[0]===Symbol.for(`react.memo_cache_sentinel`)?(t=(0,$.jsxs)(`div`,{className:`app-header-tint draggable group/application-menu-top-bar z-40 flex h-toolbar-sm items-center ps-(--spacing-token-safe-header-left) pe-(--spacing-token-safe-header-right)`,children:[(0,$.jsx)(Us,{}),(0,$.jsx)(us,{})]}),e[0]=t):t=e[0],t}",
    replacement:
      "function Iu(){let e=(0,Lu.c)(1),t;return e[0]===Symbol.for(`react.memo_cache_sentinel`)?(t=(0,$.jsxs)(`div`,{className:`app-header-tint draggable group/application-menu-top-bar z-40 flex h-toolbar-sm items-center ps-(--spacing-token-safe-header-left) pe-(--spacing-token-safe-header-right)`,children:[(0,$.jsx)(Us,{}),(0,$.jsx)(us,{}),(0,$.jsx)(LinuxWindowControls,{})]}),e[0]=t):t=e[0],t}function LinuxWindowControls(){let e=window.electronBridge?.controlWindow;if(!navigator.userAgent.includes(`Linux`)||typeof e!=`function`)return null;let t=t=>()=>{void e(t)},[n,r]=(0,Ru.useState)(!1),i=`no-drag cursor-interaction inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-transparent bg-transparent p-0 outline-none transition-colors hover:bg-token-foreground/5 focus-visible:bg-token-foreground/5`,a=`${i} text-token-text-tertiary hover:text-token-description-foreground focus-visible:text-token-description-foreground`,o=`${i} ${n?`text-token-charts-red`:`text-token-text-tertiary`}`;return(0,$.jsxs)(`div`,{\"data-linux-codex-window-controls\":`true`,className:`no-drag ml-auto flex shrink-0 items-center gap-0.5 pe-2`,children:[(0,$.jsx)(`button`,{type:`button`,className:a,onClick:t(`minimize`),\"aria-label\":`Minimize`,children:(0,$.jsx)(`svg`,{className:`h-2.5 w-2.5`,viewBox:`0 0 10 10`,fill:`none`,\"aria-hidden\":`true`,children:(0,$.jsx)(`path`,{d:`M0 5h10`,stroke:`currentColor`,strokeWidth:1})})}),(0,$.jsx)(`button`,{type:`button`,className:a,onClick:t(`maximize`),\"aria-label\":`Maximize`,children:(0,$.jsx)(`svg`,{className:`h-2.5 w-2.5`,viewBox:`0 0 10 10`,fill:`none`,\"aria-hidden\":`true`,children:(0,$.jsx)(`rect`,{x:.5,y:.5,width:9,height:9,stroke:`currentColor`,strokeWidth:1})})}),(0,$.jsx)(`button`,{type:`button`,className:o,onMouseEnter:()=>r(!0),onMouseLeave:()=>r(!1),onFocus:()=>r(!0),onBlur:()=>r(!1),onClick:t(`close`),\"aria-label\":`Close`,children:(0,$.jsx)(`svg`,{className:`h-2.5 w-2.5`,viewBox:`0 0 10 10`,fill:`none`,\"aria-hidden\":`true`,children:(0,$.jsx)(`path`,{d:`M1 1l8 8M9 1L1 9`,stroke:`currentColor`,strokeWidth:1})})})]})}",
  },
  {
    target: "function cL(){let e=(0,lL.c)(1),t;return e[0]===Symbol.for(`react.memo_cache_sentinel`)?(t=(0,dL.jsxs)(`div`,{className:`app-header-tint draggable group/application-menu-top-bar z-40 flex h-toolbar-sm items-center ps-(--spacing-token-safe-header-left) pe-(--spacing-token-safe-header-right)`,children:[(0,dL.jsx)(_F,{}),(0,dL.jsx)(RP,{})]}),e[0]=t):t=e[0],t}",
    replacement: "function cL(){let e=(0,lL.c)(1),t;return e[0]===Symbol.for(`react.memo_cache_sentinel`)?(t=(0,dL.jsxs)(`div`,{className:`app-header-tint draggable group/application-menu-top-bar z-40 flex h-toolbar-sm items-center ps-(--spacing-token-safe-header-left) pe-(--spacing-token-safe-header-right)`,children:[(0,dL.jsx)(_F,{}),(0,dL.jsx)(RP,{}),(0,dL.jsx)(LinuxWindowControls,{})]}),e[0]=t):t=e[0],t}function LinuxWindowControls(){let e=window.electronBridge?.controlWindow;if(!navigator.userAgent.includes(`Linux`)||typeof e!=`function`)return null;let t=t=>()=>{void e(t)},[n,r]=(0,uL.useState)(!1),i=`no-drag cursor-interaction inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-transparent bg-transparent p-0 outline-none transition-colors hover:bg-token-foreground/5 focus-visible:bg-token-foreground/5`,a=`${i} text-token-text-tertiary hover:text-token-description-foreground focus-visible:text-token-description-foreground`,o=`${i} ${n?`text-token-charts-red`:`text-token-text-tertiary`}`;return(0,dL.jsxs)(`div`,{\"data-linux-codex-window-controls\":`true`,className:`no-drag ml-auto flex shrink-0 items-center gap-0.5 pe-2`,children:[(0,dL.jsx)(`button`,{type:`button`,className:a,onClick:t(`minimize`),\"aria-label\":`Minimize`,children:(0,dL.jsx)(`svg`,{className:`h-2.5 w-2.5`,viewBox:`0 0 10 10`,fill:`none`,\"aria-hidden\":`true`,children:(0,dL.jsx)(`path`,{d:`M0 5h10`,stroke:`currentColor`,strokeWidth:1})})}),(0,dL.jsx)(`button`,{type:`button`,className:a,onClick:t(`maximize`),\"aria-label\":`Maximize`,children:(0,dL.jsx)(`svg`,{className:`h-2.5 w-2.5`,viewBox:`0 0 10 10`,fill:`none`,\"aria-hidden\":`true`,children:(0,dL.jsx)(`rect`,{x:.5,y:.5,width:9,height:9,stroke:`currentColor`,strokeWidth:1})})}),(0,dL.jsx)(`button`,{type:`button`,className:o,onMouseEnter:()=>r(!0),onMouseLeave:()=>r(!1),onFocus:()=>r(!0),onBlur:()=>r(!1),onClick:t(`close`),\"aria-label\":`Close`,children:(0,dL.jsx)(`svg`,{className:`h-2.5 w-2.5`,viewBox:`0 0 10 10`,fill:`none`,\"aria-hidden\":`true`,children:(0,dL.jsx)(`path`,{d:`M1 1l8 8M9 1L1 9`,stroke:`currentColor`,strokeWidth:1})})})]})}",
  },

  {
    target:
      'children:(0,$gi.jsx)(X,{...r})},n))})}var Qgi',
    replacement:
      'children:(0,$gi.jsx)(X,{...r})},n)),(0,$gi.jsx)(LinuxWindowControls,{})})}function LinuxWindowControls(){let e=window.electronBridge?.controlWindow;if(!navigator.userAgent.includes(`Linux`)||typeof e!=`function`)return null;let t=t=>()=>{void e(t)},n=`no-drag cursor-interaction inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-transparent bg-transparent p-0 outline-none`,r=`${n} text-token-text-tertiary`,i=`${n} ${!1?`text-token-charts-red`:`text-token-text-tertiary`};return(0,$gi.jsxs)(`div`,{"data-linux-codex-window-controls":`true`,className:`no-drag ml-auto flex shrink-0 items-center gap-0.5 pe-2`,children:[(0,$gi.jsx)(`button`,{type:`button`,className:r,onClick:t(`minimize`),"aria-label":`Minimize`,children:`−`}),(0,$gi.jsx)(`button`,{type:`button`,className:r,onClick:t(`maximize`),"aria-label":`Maximize`,children:`□`}),(0,$gi.jsx)(`button`,{type:`button`,className:i,onClick:t(`close`),"aria-label":`Close`,children:`×`})]})}var Qgi',
  },
  {
    target:
      'function yge(){let e=(0,Sk.c)(1),t;return e[0]===Symbol.for(`react.memo_cache_sentinel`)?(t=(0,wk.jsxs)(`div`,{className:`app-header-tint draggable group/application-menu-top-bar z-40 flex h-toolbar-sm items-center ps-(--spacing-token-safe-header-left) pe-(--spacing-token-safe-header-right)`,children:[(0,wk.jsx)(qO,{}),(0,wk.jsx)(Hme,{})]}),e[0]=t):t=e[0],t}',
    replacement:
      'function yge(){let e=(0,Sk.c)(1),t;return e[0]===Symbol.for(`react.memo_cache_sentinel`)?(t=(0,wk.jsxs)(`div`,{className:`app-header-tint draggable group/application-menu-top-bar z-40 flex h-toolbar-sm items-center ps-(--spacing-token-safe-header-left) pe-(--spacing-token-safe-header-right)`,children:[(0,wk.jsx)(qO,{}),(0,wk.jsx)(Hme,{}),(0,wk.jsx)(LinuxWindowControls,{})]}),e[0]=t):t=e[0],t}function LinuxWindowControls(){let e=window.electronBridge?.controlWindow;if(!navigator.userAgent.includes(`Linux`)||typeof e!=`function`)return null;let t=t=>()=>{void e(t)},[n,r]=(0,Ck.useState)(!1),i=`no-drag cursor-interaction inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-transparent bg-transparent p-0 outline-none transition-colors hover:bg-token-foreground/5 focus-visible:bg-token-foreground/5`,a=`${i} text-token-text-tertiary hover:text-token-description-foreground focus-visible:text-token-description-foreground`,o=`${i} ${n?`text-token-charts-red`:`text-token-text-tertiary`}`;return(0,wk.jsxs)(`div`,{"data-linux-codex-window-controls":`true`,className:`no-drag ml-auto flex shrink-0 items-center gap-0.5 pe-2`,children:[(0,wk.jsx)(`button`,{type:`button`,className:a,onClick:t(`minimize`),"aria-label":`Minimize`,children:(0,wk.jsx)(`svg`,{className:`h-2.5 w-2.5`,viewBox:`0 0 10 10`,fill:`none`,"aria-hidden":`true`,children:(0,wk.jsx)(`path`,{d:`M0 5h10`,stroke:`currentColor`,strokeWidth:1})})}),(0,wk.jsx)(`button`,{type:`button`,className:a,onClick:t(`maximize`),"aria-label":`Maximize`,children:(0,wk.jsx)(`svg`,{className:`h-2.5 w-2.5`,viewBox:`0 0 10 10`,fill:`none`,"aria-hidden":`true`,children:(0,wk.jsx)(`rect`,{x:.5,y:.5,width:9,height:9,stroke:`currentColor`,strokeWidth:1})})}),(0,wk.jsx)(`button`,{type:`button`,className:o,onMouseEnter:()=>r(!0),onMouseLeave:()=>r(!1),onFocus:()=>r(!0),onBlur:()=>r(!1),onClick:t(`close`),"aria-label":`Close`,children:(0,wk.jsx)(`svg`,{className:`h-2.5 w-2.5`,viewBox:`0 0 10 10`,fill:`none`,"aria-hidden":`true`,children:(0,wk.jsx)(`path`,{d:`M1 1l8 8M9 1L1 9`,stroke:`currentColor`,strokeWidth:1})})})]})}',
  },
  {
    target:
      'function OA(){let e=(0,kA.c)(1),t;return e[0]===Symbol.for(`react.memo_cache_sentinel`)?(t=(0,$.jsxs)(`div`,{className:`app-header-tint draggable group/application-menu-top-bar z-40 flex h-toolbar-sm items-center ps-(--spacing-token-safe-header-left) pe-(--spacing-token-safe-header-right)`,children:[(0,$.jsx)(VO,{}),(0,$.jsx)(uO,{})]}),e[0]=t):t=e[0],t}',
    replacement:
      'function OA(){let e=(0,kA.c)(1),t;return e[0]===Symbol.for(`react.memo_cache_sentinel`)?(t=(0,$.jsxs)(`div`,{className:`app-header-tint draggable group/application-menu-top-bar z-40 flex h-toolbar-sm items-center ps-(--spacing-token-safe-header-left) pe-(--spacing-token-safe-header-right)`,children:[(0,$.jsx)(VO,{}),(0,$.jsx)(uO,{}),(0,$.jsx)(LinuxWindowControls,{})]}),e[0]=t):t=e[0],t}function LinuxWindowControls(){let{platform:e}=Be(),t=window.electronBridge?.controlWindow;if(e!==`linux`||typeof t!=`function`)return null;let n=e=>()=>{void t(e)},[r,i]=(0,AA.useState)(!1),a=`no-drag cursor-interaction inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-transparent bg-transparent p-0 outline-none transition-colors hover:bg-token-foreground/5 focus-visible:bg-token-foreground/5`,o=U(a,`text-token-text-tertiary hover:text-token-description-foreground focus-visible:text-token-description-foreground`),s=U(a,r?`text-token-charts-red`:`text-token-text-tertiary`);return(0,$.jsxs)(`div`,{"data-linux-codex-window-controls":`true`,className:`no-drag ml-auto flex shrink-0 items-center gap-0.5 pe-2`,children:[(0,$.jsx)(`button`,{type:`button`,className:o,onClick:n(`minimize`),"aria-label":`Minimize`,children:(0,$.jsx)(`svg`,{className:`h-2.5 w-2.5`,viewBox:`0 0 10 10`,fill:`none`,"aria-hidden":`true`,children:(0,$.jsx)(`path`,{d:`M0 5h10`,stroke:`currentColor`,strokeWidth:1})})}),(0,$.jsx)(`button`,{type:`button`,className:o,onClick:n(`maximize`),"aria-label":`Maximize`,children:(0,$.jsx)(`svg`,{className:`h-2.5 w-2.5`,viewBox:`0 0 10 10`,fill:`none`,"aria-hidden":`true`,children:(0,$.jsx)(`rect`,{x:.5,y:.5,width:9,height:9,stroke:`currentColor`,strokeWidth:1})})}),(0,$.jsx)(`button`,{type:`button`,className:s,onMouseEnter:()=>i(!0),onMouseLeave:()=>i(!1),onFocus:()=>i(!0),onBlur:()=>i(!1),onClick:n(`close`),"aria-label":`Close`,children:(0,$.jsx)(`svg`,{className:`h-2.5 w-2.5`,viewBox:`0 0 10 10`,fill:`none`,"aria-hidden":`true`,children:(0,$.jsx)(`path`,{d:`M1 1l8 8M9 1L1 9`,stroke:`currentColor`,strokeWidth:1})})})]})}',
  },
  {
    target: 'children:[n,r,i]}),e[4]=r,e[5]=a),a}function Qr(e){return null}',
    replacement: 'children:[n,r,i,(0,Q.jsx)(LinuxWindowControls,{})]}),e[4]=r,e[5]=a),a}function LinuxWindowControls(){let{platform:e}=it(),t=window.electronBridge?.controlWindow;if(e!==`linux`||typeof t!=`function`)return null;let n=e=>()=>{void t(e)},[r,i]=(0,Z.useState)(!1),a=`no-drag cursor-interaction inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-transparent bg-transparent p-0 outline-none transition-colors hover:bg-token-foreground/5 focus-visible:bg-token-foreground/5`,o=w(a,`text-token-text-tertiary hover:text-token-description-foreground focus-visible:text-token-description-foreground`),s=w(a,r?`text-token-charts-red`:`text-token-text-tertiary`);return(0,Q.jsxs)(`div`,{"data-linux-codex-window-controls":`true`,className:`no-drag ml-auto flex shrink-0 items-center gap-0.5 pe-2`,children:[(0,Q.jsx)(`button`,{type:`button`,className:o,onClick:n(`minimize`),"aria-label":`Minimize`,children:(0,Q.jsx)(`svg`,{className:`h-2.5 w-2.5`,viewBox:`0 0 10 10`,fill:`none`,"aria-hidden":`true`,children:(0,Q.jsx)(`path`,{d:`M0 5h10`,stroke:`currentColor`,strokeWidth:1})})}),(0,Q.jsx)(`button`,{type:`button`,className:o,onClick:n(`maximize`),"aria-label":`Maximize`,children:(0,Q.jsx)(`svg`,{className:`h-2.5 w-2.5`,viewBox:`0 0 10 10`,fill:`none`,"aria-hidden":`true`,children:(0,Q.jsx)(`rect`,{x:.5,y:.5,width:9,height:9,stroke:`currentColor`,strokeWidth:1})})}),(0,Q.jsx)(`button`,{type:`button`,className:s,onMouseEnter:()=>i(!0),onMouseLeave:()=>i(!1),onFocus:()=>i(!0),onBlur:()=>i(!1),onClick:n(`close`),"aria-label":`Close`,children:(0,Q.jsx)(`svg`,{className:`h-2.5 w-2.5`,viewBox:`0 0 10 10`,fill:`none`,"aria-hidden":`true`,children:(0,Q.jsx)(`path`,{d:`M1 1l8 8M9 1L1 9`,stroke:`currentColor`,strokeWidth:1})})})]})}function Qr(e){return null}',
  },
  {
    target: 'children:[n,r,i]}),e[4]=r,e[5]=a),a}function $r(e){return null}',
    replacement: `children:[n,r,i,(0,Q.jsx)(LinuxWindowControls,{})]}),e[4]=r,e[5]=a),a}${appShellLinuxWindowControlsFunction}function $r(e){return null}`,
  },
  {
    target:
      'children:[n,r,i]}),e[4]=r,e[5]=a),a}function ri(e){return null}',
    replacement:
      'children:[n,r,i,(0,Q.jsx)(LinuxWindowControls,{})]}),e[4]=r,e[5]=a),a}function LinuxWindowControls(){let{platform:e}=at(),t=window.electronBridge?.controlWindow;if(e!==`linux`||typeof t!=`function`)return null;let n=e=>()=>{void t(e)},[r,i]=(0,Z.useState)(!1),a=`no-drag cursor-interaction inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-transparent bg-transparent p-0 outline-none transition-colors hover:bg-token-foreground/5 focus-visible:bg-token-foreground/5`,o=C(a,`text-token-text-tertiary hover:text-token-description-foreground focus-visible:text-token-description-foreground`),s=C(a,r?`text-token-charts-red`:`text-token-text-tertiary`);return(0,Q.jsxs)(`div`,{"data-linux-codex-window-controls":`true`,className:`no-drag ml-auto flex shrink-0 items-center gap-0.5 pe-2`,children:[(0,Q.jsx)(`button`,{type:`button`,className:o,onClick:n(`minimize`),"aria-label":`Minimize`,children:(0,Q.jsx)(`svg`,{className:`h-2.5 w-2.5`,viewBox:`0 0 10 10`,fill:`none`,"aria-hidden":`true`,children:(0,Q.jsx)(`path`,{d:`M0 5h10`,stroke:`currentColor`,strokeWidth:1})})}),(0,Q.jsx)(`button`,{type:`button`,className:o,onClick:n(`maximize`),"aria-label":`Maximize`,children:(0,Q.jsx)(`svg`,{className:`h-2.5 w-2.5`,viewBox:`0 0 10 10`,fill:`none`,"aria-hidden":`true`,children:(0,Q.jsx)(`rect`,{x:.5,y:.5,width:9,height:9,stroke:`currentColor`,strokeWidth:1})})}),(0,Q.jsx)(`button`,{type:`button`,className:s,onMouseEnter:()=>i(!0),onMouseLeave:()=>i(!1),onFocus:()=>i(!0),onBlur:()=>i(!1),onClick:n(`close`),"aria-label":`Close`,children:(0,Q.jsx)(`svg`,{className:`h-2.5 w-2.5`,viewBox:`0 0 10 10`,fill:`none`,"aria-hidden":`true`,children:(0,Q.jsx)(`path`,{d:`M1 1l8 8M9 1L1 9`,stroke:`currentColor`,strokeWidth:1})})})]})}function ri(e){return null}',
  },
  {
    target:
      'function VGe(){let e=(0,VF.c)(1),t;return e[0]===Symbol.for(`react.memo_cache_sentinel`)?(t=(0,UF.jsxs)(`div`,{className:`app-header-tint draggable group/application-menu-top-bar z-40 flex h-toolbar-sm items-center ps-(--spacing-token-safe-header-left) pe-(--spacing-token-safe-header-right)`,children:[(0,UF.jsx)(pF,{}),(0,UF.jsx)(hWe,{})]}),e[0]=t):t=e[0],t}var VF',
    replacement:
      'function VGe(){let e=(0,VF.c)(1),t;return e[0]===Symbol.for(`react.memo_cache_sentinel`)?(t=(0,UF.jsxs)(`div`,{className:`app-header-tint draggable group/application-menu-top-bar z-40 flex h-toolbar-sm items-center ps-(--spacing-token-safe-header-left) pe-(--spacing-token-safe-header-right)`,children:[(0,UF.jsx)(pF,{}),(0,UF.jsx)(hWe,{}),(0,UF.jsx)(LinuxWindowControls,{})]}),e[0]=t):t=e[0],t}function LinuxWindowControls(){let e=window.electronBridge?.controlWindow;if(typeof e!=`function`)return null;let t=t=>()=>{void e(t)},[n,r]=(0,HF.useState)(!1),i=`no-drag cursor-interaction inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-transparent bg-transparent p-0 outline-none transition-colors hover:bg-token-foreground/5 focus-visible:bg-token-foreground/5`,a=$(i,`text-token-text-tertiary hover:text-token-description-foreground focus-visible:text-token-description-foreground`),o=$(i,n?`text-token-charts-red`:`text-token-text-tertiary`);return(0,UF.jsxs)(`div`,{"data-linux-codex-window-controls":`true`,className:`no-drag ml-auto flex shrink-0 items-center gap-0.5 pe-2`,children:[(0,UF.jsx)(`button`,{type:`button`,className:a,onClick:t(`minimize`),"aria-label":`Minimize`,children:(0,UF.jsx)(`svg`,{className:`h-2.5 w-2.5`,viewBox:`0 0 10 10`,fill:`none`,"aria-hidden":`true`,children:(0,UF.jsx)(`path`,{d:`M0 5h10`,stroke:`currentColor`,strokeWidth:1})})}),(0,UF.jsx)(`button`,{type:`button`,className:a,onClick:t(`maximize`),"aria-label":`Maximize`,children:(0,UF.jsx)(`svg`,{className:`h-2.5 w-2.5`,viewBox:`0 0 10 10`,fill:`none`,"aria-hidden":`true`,children:(0,UF.jsx)(`rect`,{x:.5,y:.5,width:9,height:9,stroke:`currentColor`,strokeWidth:1})})}),(0,UF.jsx)(`button`,{type:`button`,className:o,onMouseEnter:()=>r(!0),onMouseLeave:()=>r(!1),onFocus:()=>r(!0),onBlur:()=>r(!1),onClick:t(`close`),"aria-label":`Close`,children:(0,UF.jsx)(`svg`,{className:`h-2.5 w-2.5`,viewBox:`0 0 10 10`,fill:`none`,"aria-hidden":`true`,children:(0,UF.jsx)(`path`,{d:`M1 1l8 8M9 1L1 9`,stroke:`currentColor`,strokeWidth:1})})})]})}var VF',
  },
  {
    target:
      'function y1e(){let e=(0,QA.c)(1),t;return e[0]===Symbol.for(`react.memo_cache_sentinel`)?(t=(0,ej.jsxs)(`div`,{className:`app-header-tint draggable group/application-menu-top-bar z-40 flex h-toolbar-sm items-center ps-(--spacing-token-safe-header-left) pe-(--spacing-token-safe-header-right)`,children:[(0,ej.jsx)(WQe,{}),(0,ej.jsx)(xQe,{})]}),e[0]=t):t=e[0],t}var QA',
    replacement:
      'function y1e(){let e=(0,QA.c)(1),t;return e[0]===Symbol.for(`react.memo_cache_sentinel`)?(t=(0,ej.jsxs)(`div`,{className:`app-header-tint draggable group/application-menu-top-bar z-40 flex h-toolbar-sm items-center ps-(--spacing-token-safe-header-left) pe-(--spacing-token-safe-header-right)`,children:[(0,ej.jsx)(WQe,{}),(0,ej.jsx)(xQe,{}),(0,ej.jsx)(LinuxWindowControls,{})]}),e[0]=t):t=e[0],t}function LinuxWindowControls(){let e=window.electronBridge?.controlWindow;if(!navigator.userAgent.includes(`Linux`)||typeof e!=`function`)return null;let t=t=>()=>{void e(t)},[n,r]=(0,$A.useState)(!1),i=`no-drag cursor-interaction inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-transparent bg-transparent p-0 outline-none transition-colors hover:bg-token-foreground/5 focus-visible:bg-token-foreground/5`,a=Q(i,`text-token-text-tertiary hover:text-token-description-foreground focus-visible:text-token-description-foreground`),o=Q(i,n?`text-token-charts-red`:`text-token-text-tertiary`);return(0,ej.jsxs)(`div`,{"data-linux-codex-window-controls":`true`,className:`no-drag ml-auto flex shrink-0 items-center gap-0.5 pe-2`,children:[(0,ej.jsx)(`button`,{type:`button`,className:a,onClick:t(`minimize`),"aria-label":`Minimize`,children:(0,ej.jsx)(`svg`,{className:`h-2.5 w-2.5`,viewBox:`0 0 10 10`,fill:`none`,"aria-hidden":`true`,children:(0,ej.jsx)(`path`,{d:`M0 5h10`,stroke:`currentColor`,strokeWidth:1})})}),(0,ej.jsx)(`button`,{type:`button`,className:a,onClick:t(`maximize`),"aria-label":`Maximize`,children:(0,ej.jsx)(`svg`,{className:`h-2.5 w-2.5`,viewBox:`0 0 10 10`,fill:`none`,"aria-hidden":`true`,children:(0,ej.jsx)(`rect`,{x:.5,y:.5,width:9,height:9,stroke:`currentColor`,strokeWidth:1})})}),(0,ej.jsx)(`button`,{type:`button`,className:o,onMouseEnter:()=>r(!0),onMouseLeave:()=>r(!1),onFocus:()=>r(!0),onBlur:()=>r(!1),onClick:t(`close`),"aria-label":`Close`,children:(0,ej.jsx)(`svg`,{className:`h-2.5 w-2.5`,viewBox:`0 0 10 10`,fill:`none`,"aria-hidden":`true`,children:(0,ej.jsx)(`path`,{d:`M1 1l8 8M9 1L1 9`,stroke:`currentColor`,strokeWidth:1})})})]})}var QA',
  },
];
const appShellLinuxWindowControlsUpgradePatchPattern =
  /function LinuxWindowControls\(\)\{[\s\S]*?\}(?=function \$r\(e\)\{return null\})/;
const appShellLinuxWindowControlsPatchMarker = 'data-linux-codex-window-controls';
const appShellLinuxWindowControlsTopBarPatchTarget =
  'app-header-tint draggable group/application-menu-top-bar z-40 flex h-toolbar-sm items-center ps-(--spacing-token-safe-header-left) pe-(--spacing-token-safe-header-right)';
const appShellLinuxWindowControlsTopBarPatchReplacement =
  'app-header-tint draggable group/application-menu-top-bar z-50 flex h-toolbar-sm items-center ps-(--spacing-token-safe-header-left) pe-0';
const appShellLinuxWindowControlsTopBarPatchMarker =
  'group/application-menu-top-bar z-50 flex h-toolbar-sm items-center ps-(--spacing-token-safe-header-left) pe-0';
const appShellLinuxFloatingSidebarHideNavHeaderPatchTarget =
  'children:[(0,Q.jsx)(T.div,{initial:c?!1:{x:8},animate:{x:0},exit:{x:c?0:8},transition:g,className:`app-header-tint flex h-toolbar shrink-0 items-center ps-(--spacing-token-safe-header-left) pe-2`,children:(0,Q.jsx)(Xn,{hideUnreadBadge:!0,onToggleSidebar:u})}),(0,Q.jsx)(`div`,{className:`min-h-0 flex-1 overflow-hidden`,children:a})]';
const appShellLinuxFloatingSidebarHideNavHeaderPatchReplacement =
  'children:[r?null:(0,Q.jsx)(T.div,{initial:c?!1:{x:8},animate:{x:0},exit:{x:c?0:8},transition:g,className:`app-header-tint flex h-toolbar shrink-0 items-center ps-(--spacing-token-safe-header-left) pe-2`,children:(0,Q.jsx)(Xn,{hideUnreadBadge:!0,onToggleSidebar:u})}),(0,Q.jsx)(`div`,{className:`min-h-0 flex-1 overflow-hidden`,children:a})]';
const appShellLinuxFloatingSidebarHideNavHeaderPatchAlternatives = [
  {
    target:
      "children:[(0,$.jsx)(ue.div,{initial:l?!1:{x:8},animate:{x:0},exit:{x:l?0:8},transition:g,className:`app-header-tint flex h-toolbar shrink-0 items-center ps-[max(var(--spacing-token-safe-header-left),0.5rem)] pe-2`,children:(0,$.jsx)(Us,{hideUnreadBadge:!0,onToggleSidebar:u})}),(0,$.jsx)(`div`,{className:`min-h-0 flex-1 overflow-hidden`,children:s})]",
    replacement:
      "children:[i?null:(0,$.jsx)(ue.div,{initial:l?!1:{x:8},animate:{x:0},exit:{x:l?0:8},transition:g,className:`app-header-tint flex h-toolbar shrink-0 items-center ps-[max(var(--spacing-token-safe-header-left),0.5rem)] pe-2`,children:(0,$.jsx)(Us,{hideUnreadBadge:!0,onToggleSidebar:u})}),(0,$.jsx)(`div`,{className:`min-h-0 flex-1 overflow-hidden`,children:s})]",
  },
  {
    target:
      'children:[(0,wk.jsx)(vh.div,{initial:s?!1:{x:8},animate:{x:0},exit:{x:s?0:8},transition:m,className:`app-header-tint flex h-toolbar shrink-0 items-center ps-[max(var(--spacing-token-safe-header-left),0.5rem)] pe-2`,children:(0,wk.jsx)(qO,{hideUnreadBadge:!0,onToggleSidebar:c})}),(0,wk.jsx)(`div`,{className:`min-h-0 flex-1 overflow-hidden`,children:a})]',
    replacement:
      'children:[r?null:(0,wk.jsx)(vh.div,{initial:s?!1:{x:8},animate:{x:0},exit:{x:s?0:8},transition:m,className:`app-header-tint flex h-toolbar shrink-0 items-center ps-[max(var(--spacing-token-safe-header-left),0.5rem)] pe-2`,children:(0,wk.jsx)(qO,{hideUnreadBadge:!0,onToggleSidebar:c})}),(0,wk.jsx)(`div`,{className:`min-h-0 flex-1 overflow-hidden`,children:a})]',
  },
  {
    target: appShellLinuxFloatingSidebarHideNavHeaderPatchTarget,
    replacement: appShellLinuxFloatingSidebarHideNavHeaderPatchReplacement,
  },
  {
    target:
      'children:[(0,Q.jsx)(w.div,{initial:c?!1:{x:8},animate:{x:0},exit:{x:c?0:8},transition:g,className:`app-header-tint flex h-toolbar shrink-0 items-center ps-(--spacing-token-safe-header-left) pe-2`,children:(0,Q.jsx)($n,{hideUnreadBadge:!0,onToggleSidebar:u})}),(0,Q.jsx)(`div`,{className:`min-h-0 flex-1 overflow-hidden`,children:a})]',
    replacement:
      'children:[r?null:(0,Q.jsx)(w.div,{initial:c?!1:{x:8},animate:{x:0},exit:{x:c?0:8},transition:g,className:`app-header-tint flex h-toolbar shrink-0 items-center ps-(--spacing-token-safe-header-left) pe-2`,children:(0,Q.jsx)($n,{hideUnreadBadge:!0,onToggleSidebar:u})}),(0,Q.jsx)(`div`,{className:`min-h-0 flex-1 overflow-hidden`,children:a})]',
  },
  {
    target:
      'children:[(0,UF.jsx)(Qp.div,{initial:s?!1:{x:8},animate:{x:0},exit:{x:s?0:8},transition:m,className:`app-header-tint flex h-toolbar shrink-0 items-center ps-[max(var(--spacing-token-safe-header-left),0.5rem)] pe-2`,children:(0,UF.jsx)(pF,{hideUnreadBadge:!0,onToggleSidebar:c})}),(0,UF.jsx)(`div`,{className:`min-h-0 flex-1 overflow-hidden`,children:a})]',
    replacement:
      'children:[r?null:(0,UF.jsx)(Qp.div,{initial:s?!1:{x:8},animate:{x:0},exit:{x:s?0:8},transition:m,className:`app-header-tint flex h-toolbar shrink-0 items-center ps-[max(var(--spacing-token-safe-header-left),0.5rem)] pe-2`,children:(0,UF.jsx)(pF,{hideUnreadBadge:!0,onToggleSidebar:c})}),(0,UF.jsx)(`div`,{className:`min-h-0 flex-1 overflow-hidden`,children:a})]',
  },
  {
    target:
      'children:[(0,$.jsx)(tt.div,{initial:s?!1:{x:8},animate:{x:0},exit:{x:s?0:8},transition:m,className:`app-header-tint flex h-toolbar shrink-0 items-center ps-[max(var(--spacing-token-safe-header-left),0.5rem)] pe-2`,children:(0,$.jsx)(VO,{hideUnreadBadge:!0,onToggleSidebar:c})}),(0,$.jsx)(`div`,{className:`min-h-0 flex-1 overflow-hidden`,children:a})]',
    replacement:
      'children:[r?null:(0,$.jsx)(tt.div,{initial:s?!1:{x:8},animate:{x:0},exit:{x:s?0:8},transition:m,className:`app-header-tint flex h-toolbar shrink-0 items-center ps-[max(var(--spacing-token-safe-header-left),0.5rem)] pe-2`,children:(0,$.jsx)(VO,{hideUnreadBadge:!0,onToggleSidebar:c})}),(0,$.jsx)(`div`,{className:`min-h-0 flex-1 overflow-hidden`,children:a})]',
  },
  {
    target:
      'children:[(0,ej.jsx)(ye.div,{initial:s?!1:{x:8},animate:{x:0},exit:{x:s?0:8},transition:m,className:`app-header-tint flex h-toolbar shrink-0 items-center ps-[max(var(--spacing-token-safe-header-left),0.5rem)] pe-2`,children:(0,ej.jsx)(WQe,{hideUnreadBadge:!0,onToggleSidebar:c})}),(0,ej.jsx)(`div`,{className:`min-h-0 flex-1 overflow-hidden`,children:a})]',
    replacement:
      'children:[r?null:(0,ej.jsx)(ye.div,{initial:s?!1:{x:8},animate:{x:0},exit:{x:s?0:8},transition:m,className:`app-header-tint flex h-toolbar shrink-0 items-center ps-[max(var(--spacing-token-safe-header-left),0.5rem)] pe-2`,children:(0,ej.jsx)(WQe,{hideUnreadBadge:!0,onToggleSidebar:c})}),(0,ej.jsx)(`div`,{className:`min-h-0 flex-1 overflow-hidden`,children:a})]',
  },
];
const appShellLinuxFloatingSidebarHideNavHeaderPatchMarker =
  'children:[r?null:(0,Q.jsx)';
const appShellLinuxFloatingSidebarZIndexPatchReplacement =
  'pointer-events-auto fixed bottom-0 left-0 z-40 min-h-0';
const appShellLinuxFloatingSidebarZIndexPatchAlternatives = [
  {
    target: 'pointer-events-auto fixed bottom-0 left-0 z-30 min-h-0',
    replacement: appShellLinuxFloatingSidebarZIndexPatchReplacement,
  },
  {
    target: 'pointer-events-auto min-h-0',
    replacement: appShellLinuxFloatingSidebarZIndexPatchReplacement,
  },
  {
    target: 'pointer-events-auto fixed bottom-0 left-0 z-[42] min-h-0',
    replacement: 'pointer-events-auto fixed bottom-0 left-0 z-[42] min-h-0',
  },
];
const appShellLinuxFloatingSidebarZIndexPatchMarker = 'left-0 z-40 min-h-0';
const appShellLinuxFloatingSidebarInlineZIndexPatchTarget =
  'style:{width:n},transition:';
const appShellLinuxFloatingSidebarInlineZIndexPatchReplacement =
  'style:{width:n,zIndex:40},transition:';
const appShellLinuxFloatingSidebarInlineZIndexPatchMarker = 'zIndex:40},transition:';
const appShellLinuxFloatingSidebarInlineZIndexPatchAlternatives = [
  {
    target: appShellLinuxFloatingSidebarInlineZIndexPatchTarget,
    replacement: appShellLinuxFloatingSidebarInlineZIndexPatchReplacement,
  },
  {
    target: 'style:{width:r},transition:',
    replacement: 'style:{width:r,zIndex:40},transition:',
  },
];
const appShellLinuxFloatingSidebarTopPatchTarget = 'r?`top-(--height-toolbar-sm)`:`top-0`';
const appShellLinuxFloatingSidebarTopPatchReplacement = 'r?`top-toolbar-sm`:`top-0`';
const appShellLinuxFloatingSidebarTopPatchMarker = '?`top-toolbar-sm`:`top-0`';
const appShellLinuxFloatingSidebarTopPatchAlternatives = [
  {
    target: appShellLinuxFloatingSidebarTopPatchTarget,
    replacement: appShellLinuxFloatingSidebarTopPatchReplacement,
  },
  {
    target: 'i?`top-(--height-toolbar-sm)`:`top-0`',
    replacement: 'i?`top-toolbar-sm`:`top-0`',
  },
];
const appShellLinuxFloatingSidebarMainHeaderLeftPatchTarget =
  'function gr({isHeaderEdgeScroll:e,isApplicationMenuBarEnabled:t}){let{headerLeftWidth:n,headerRightWidth:r,leftPanelAnimatedWidth:i,rightPanelAnimatedWidth:a}=ae(),o=Fe(0),s=Qt`${i}px`,l=Qt`${a}px`,u=c(W)';
const appShellLinuxFloatingSidebarMainHeaderLeftPatchReplacement =
  'function gr({isHeaderEdgeScroll:e,isApplicationMenuBarEnabled:t}){let{headerLeftWidth:n,headerRightWidth:r,leftPanelAnimatedWidth:i,rightPanelAnimatedWidth:a,leftPanelWidth:lp}=ae(),flw=c(Ur),fls=c(Ae),o=Fe(0),s=Qt`${i}px`,l=Qt`${a}px`,u=c(W)';
const appShellLinuxFloatingSidebarMainHeaderLeftPatchAlternatives = [
  {
    target:
      "function ol({isHeaderEdgeScroll:e,isApplicationMenuBarEnabled:t}){let{headerLeftWidth:n,headerRightWidth:r,leftPanelAnimatedWidth:o,rightPanelAnimatedWidth:s}=yt(),c=X(0),l=Z`${o}px`,u=Z`${s}px`,d=i($t),f=i(Gt),p=i(en),m=i(on),h=i(It),g=i(un),_=f.filter(({align:e})=>e===`start`),v=f.filter(({align:e})=>e===`center`),y=f.filter(({align:e})=>e===`end`),b=_.length>0,x=v.length>0,S=y.length>0,C=h.length>0;return(0,gl.jsx)(fe,{items:p,children:(0,gl.jsxs)(ue.header,",
    replacement:
      "function ol({isHeaderEdgeScroll:e,isApplicationMenuBarEnabled:t}){let{headerLeftWidth:n,headerRightWidth:r,leftPanelAnimatedWidth:o,rightPanelAnimatedWidth:s}=yt(),c=X(0),l=Z`${o}px`,u=Z`${s}px`,d=i($t),f=i(Gt),p=i(en),m=i(on),h=i(It),g=i(un),_=f.filter(({align:e})=>e===`start`),v=f.filter(({align:e})=>e===`center`),y=f.filter(({align:e})=>e===`end`),b=_.length>0,x=v.length>0,S=y.length>0,C=h.length>0;return(0,gl.jsx)(fe,{items:p,children:(0,gl.jsxs)(ue.header,",
  },
  {
    target:
      'function Ihe({isHeaderEdgeScroll:e,isApplicationMenuBarEnabled:t}){let{headerLeftWidth:n,headerRightWidth:r,leftPanelAnimatedWidth:i,rightPanelAnimatedWidth:o}=br(),s=a(0),c=ha`${i}px`,l=ha`${o}px`,u=Et(hre)',
    replacement:
      'function Ihe({isHeaderEdgeScroll:e,isApplicationMenuBarEnabled:t}){let{headerLeftWidth:n,headerRightWidth:r,leftPanelAnimatedWidth:i,rightPanelAnimatedWidth:o,leftPanelWidth:lp}=br(),flw=Et(Ege),fls=Et(Dn),s=a(0),c=ha`${i}px`,l=ha`${o}px`,u=Et(hre)',
  },
  {
    target: appShellLinuxFloatingSidebarMainHeaderLeftPatchTarget,
    replacement: appShellLinuxFloatingSidebarMainHeaderLeftPatchReplacement,
  },
  {
    target:
      'function yr({isHeaderEdgeScroll:e,isApplicationMenuBarEnabled:t}){let{headerLeftWidth:n,headerRightWidth:r,leftPanelAnimatedWidth:i,rightPanelAnimatedWidth:a}=ie(),o=Pe(0),s=$t`${i}px`,l=$t`${a}px`,u=c(U)',
    replacement:
      'function yr({isHeaderEdgeScroll:e,isApplicationMenuBarEnabled:t}){let{headerLeftWidth:n,headerRightWidth:r,leftPanelAnimatedWidth:i,rightPanelAnimatedWidth:a,leftPanelWidth:lp}=ie(),flw=c(Jr),fls=c(ke),o=Pe(0),s=$t`${i}px`,l=$t`${a}px`,u=c(U)',
  },
  {
    target:
      'function aGe({isHeaderEdgeScroll:e,isApplicationMenuBarEnabled:t}){let{headerLeftWidth:n,headerRightWidth:r,leftPanelAnimatedWidth:i,rightPanelAnimatedWidth:a}=vS(),o=sp(0),s=vp`${i}px`,c=vp`${a}px`,l=X(QSe)',
    replacement:
      'function aGe({isHeaderEdgeScroll:e,isApplicationMenuBarEnabled:t}){let{headerLeftWidth:n,headerRightWidth:r,leftPanelAnimatedWidth:i,rightPanelAnimatedWidth:a,leftPanelWidth:lp}=vS(),flw=X(HS),fls=X(GS),o=sp(0),s=vp`${i}px`,c=vp`${a}px`,l=X(QSe)',
  },
  {
    target:
      'function Nk({isHeaderEdgeScroll:e,isApplicationMenuBarEnabled:t}){let{headerLeftWidth:n,headerRightWidth:r,leftPanelAnimatedWidth:i,rightPanelAnimatedWidth:a}=Sn(),o=ln(0),s=Jt`${i}px`,c=Jt`${a}px`,l=H(V)',
    replacement:
      'function Nk({isHeaderEdgeScroll:e,isApplicationMenuBarEnabled:t}){let{headerLeftWidth:n,headerRightWidth:r,leftPanelAnimatedWidth:i,rightPanelAnimatedWidth:a,leftPanelWidth:lp}=Sn(),flw=H(BA),fls=H(wt),o=ln(0),s=Jt`${i}px`,c=Jt`${a}px`,l=H(V)',
  },
  {
    target:
      'function j$e({isHeaderEdgeScroll:e,isApplicationMenuBarEnabled:t}){let{headerLeftWidth:n,headerRightWidth:r,leftPanelAnimatedWidth:i,rightPanelAnimatedWidth:a}=Mp(),o=Ni(0),s=md`${i}px`,c=md`${a}px`,l=I(Vae)',
    replacement:
      'function j$e({isHeaderEdgeScroll:e,isApplicationMenuBarEnabled:t}){let{headerLeftWidth:n,headerRightWidth:r,leftPanelAnimatedWidth:i,rightPanelAnimatedWidth:a,leftPanelWidth:lp}=Mp(),flw=I(gQe),fls=I(_Qe),o=Ni(0),s=md`${i}px`,c=md`${a}px`,l=I(Vae)',
  },
];
const appShellLinuxFloatingSidebarMainHeaderLeftStylePatchTarget =
  'style:t?{left:s}:{},children:[(0,Q.jsx)(_r,{entries:p,fitWidth:n,slotWidth:t?o:i,side:`start`})';
const appShellLinuxFloatingSidebarMainHeaderLeftStylePatchReplacement =
  'style:t?{left:flw&&!fls?`${Math.max(lp.get(),i.get())}px`:s}:{},children:[(0,Q.jsx)(_r,{entries:p,fitWidth:n,slotWidth:t?o:i,side:`start`})';
const appShellLinuxFloatingSidebarMainHeaderLeftStylePatchAlternatives = [
  {
    target:
      "style:t?{left:l}:{},children:[(0,gl.jsx)(sl,{entries:m,fitWidth:n,slotWidth:t?c:o,side:`start`})",
    replacement:
      "style:t?{left:l}:{},children:[(0,gl.jsx)(sl,{entries:m,fitWidth:n,slotWidth:t?c:o,side:`start`})",
  },
  {
    target:
      'style:t?{left:c}:{},children:[(0,uk.jsx)(Lhe,{entries:p,fitWidth:n,slotWidth:t?s:i,side:`start`})',
    replacement:
      'style:t?{left:flw&&!fls?`${Math.max(lp.get(),i.get())}px`:c}:{},children:[(0,uk.jsx)(Lhe,{entries:p,fitWidth:n,slotWidth:t?s:i,side:`start`})',
  },
  {
    target: appShellLinuxFloatingSidebarMainHeaderLeftStylePatchTarget,
    replacement: appShellLinuxFloatingSidebarMainHeaderLeftStylePatchReplacement,
  },
  {
    target:
      'style:t?{left:s}:{},children:[(0,Q.jsx)(br,{entries:p,fitWidth:n,slotWidth:t?o:i,side:`start`})',
    replacement:
      'style:t?{left:flw&&!fls?`${Math.max(lp.get(),i.get())}px`:s}:{},children:[(0,Q.jsx)(br,{entries:p,fitWidth:n,slotWidth:t?o:i,side:`start`})',
  },
  {
    target:
      'style:t?{left:s}:{},children:[(0,OF.jsx)(oGe,{entries:f,fitWidth:n,slotWidth:t?o:i,side:`start`})',
    replacement:
      'style:t?{left:flw&&!fls?`${Math.max(lp.get(),i.get())}px`:s}:{},children:[(0,OF.jsx)(oGe,{entries:f,fitWidth:n,slotWidth:t?o:i,side:`start`})',
  },
  {
    target:
      'style:t?{left:s}:{},children:[(0,Uk.jsx)(Pk,{entries:f,fitWidth:n,slotWidth:t?o:i,side:`start`})',
    replacement:
      'style:t?{left:flw&&!fls?`${Math.max(lp.get(),i.get())}px`:s}:{},children:[(0,Uk.jsx)(Pk,{entries:f,fitWidth:n,slotWidth:t?o:i,side:`start`})',
  },
  {
    target:
      'style:t?{left:s}:{},children:[(0,GA.jsx)(M$e,{entries:f,fitWidth:n,slotWidth:t?o:i,side:`start`})',
    replacement:
      'style:t?{left:flw&&!fls?`${Math.max(lp.get(),i.get())}px`:s}:{},children:[(0,GA.jsx)(M$e,{entries:f,fitWidth:n,slotWidth:t?o:i,side:`start`})',
  },
];
const appShellLinuxFloatingSidebarMainHeaderLeftPatchMarker =
  'flw=';
const appShellLinuxFloatingSidebarMainHeaderLeftStylePatchMarker =
  'left:flw&&!fls?';
const mainLinuxAvatarOverlayOnTopPatchAlternatives = [
  {
    target:
      't.setAlwaysOnTop(!0,`floating`),t.setMenuBarVisibility(!1),this.addDisplayChangeListeners()',
    replacement:
      't.setAlwaysOnTop(!0,`floating`),process.platform===`linux`&&(t.setSkipTaskbar(!0),t.setAlwaysOnTop(!0,`screen-saver`)),t.setMenuBarVisibility(!1),this.addDisplayChangeListeners()',
  },
  {
    target:
      'e.setAlwaysOnTop(!0,`floating`),e.setMenuBarVisibility(!1),this.addDisplayChangeListeners()',
    replacement:
      'e.setAlwaysOnTop(!0,`floating`),process.platform===`linux`&&(e.setSkipTaskbar(!0),e.setAlwaysOnTop(!0,`screen-saver`)),e.setMenuBarVisibility(!1),this.addDisplayChangeListeners()',
  },
];
const mainLinuxAvatarOverlayOnTopPatchMarker =
  'process.platform===`linux`&&(t.setSkipTaskbar(!0),t.setAlwaysOnTop(!0,`screen-saver`))';
const mainLinuxAvatarOverlayTypePatchAlternatives = [
  {
    target:
      'case`avatarOverlay`:return{...R9({alwaysOnTop:!0,platform:n,resizable:!1,thickFrame:!1}),...n===`darwin`?{enableLargerThanScreen:!0}:{},hasShadow:!1};',
    replacement:
      'case`avatarOverlay`:return{...R9({alwaysOnTop:!0,platform:n,resizable:!1,thickFrame:!1}),...n===`linux`?{type:`toolbar`}:{},...n===`darwin`?{enableLargerThanScreen:!0}:{},hasShadow:!1};',
  },
  {
    target:
      'case`avatarOverlay`:return{...FM({alwaysOnTop:!0,platform:n,resizable:!1,thickFrame:!1}),hasShadow:!1};',
    replacement:
      'case`avatarOverlay`:return{...FM({alwaysOnTop:!0,platform:n,resizable:!1,thickFrame:!1}),...n===`linux`?{type:`toolbar`}:{},hasShadow:!1};',
  },
  {
    target:
      'case`avatarOverlay`:return{...Dq({alwaysOnTop:!0,platform:n,resizable:!1,thickFrame:!1}),hasShadow:!1};',
    replacement:
      'case`avatarOverlay`:return{...Dq({alwaysOnTop:!0,platform:n,resizable:!1,thickFrame:!1}),...n===`linux`?{type:`toolbar`}:{},hasShadow:!1};',
  },
  {
    target:
      'case`avatarOverlay`:return{...VY({alwaysOnTop:!0,platform:n,resizable:!1,thickFrame:!1}),hasShadow:!1};',
    replacement:
      'case`avatarOverlay`:return{...VY({alwaysOnTop:!0,platform:n,resizable:!1,thickFrame:!1}),...n===`linux`?{type:`toolbar`}:{},hasShadow:!1};',
  },
  {
    target:
      'case`avatarOverlay`:return{...M2({alwaysOnTop:!0,platform:n,resizable:!1,thickFrame:!1}),hasShadow:!1};',
    replacement:
      'case`avatarOverlay`:return{...M2({alwaysOnTop:!0,platform:n,resizable:!1,thickFrame:!1}),...n===`linux`?{type:`toolbar`}:{},hasShadow:!1};',
  },
  {
    target:
      'case`avatarOverlay`:return{...H6({alwaysOnTop:!0,platform:n,resizable:!1,thickFrame:!1}),hasShadow:!1};',
    replacement:
      'case`avatarOverlay`:return{...H6({alwaysOnTop:!0,platform:n,resizable:!1,thickFrame:!1}),...n===`linux`?{type:`toolbar`}:{},hasShadow:!1};',
  },
  {
    target:
      'case`avatarOverlay`:return{...b5({alwaysOnTop:!0,platform:n,resizable:!1,thickFrame:!1}),...n===`darwin`?{enableLargerThanScreen:!0}:{},hasShadow:!1};',
    replacement:
      'case`avatarOverlay`:return{...b5({alwaysOnTop:!0,platform:n,resizable:!1,thickFrame:!1}),...n===`linux`?{type:`toolbar`}:{},...n===`darwin`?{enableLargerThanScreen:!0}:{},hasShadow:!1};',
  },
  {
    target:
      'case`avatarOverlay`:return{...M9({alwaysOnTop:!0,platform:n,resizable:!1,thickFrame:!1}),...n===`darwin`?{enableLargerThanScreen:!0}:{},hasShadow:!1};',
    replacement:
      'case`avatarOverlay`:return{...M9({alwaysOnTop:!0,platform:n,resizable:!1,thickFrame:!1}),...n===`linux`?{type:`toolbar`}:{},...n===`darwin`?{enableLargerThanScreen:!0}:{},hasShadow:!1};',
  },
  {
    target:
      'case`avatarOverlay`:return{...A9({alwaysOnTop:!0,platform:n,resizable:!1,thickFrame:!1}),...n===`darwin`?{enableLargerThanScreen:!0}:{},hasShadow:!1};',
    replacement:
      'case`avatarOverlay`:return{...A9({alwaysOnTop:!0,platform:n,resizable:!1,thickFrame:!1}),...n===`linux`?{type:`toolbar`}:{},...n===`darwin`?{enableLargerThanScreen:!0}:{},hasShadow:!1};',
  },  {
    target:
      'case`avatarOverlay`:return{...L9({alwaysOnTop:!0,platform:n,resizable:!1,thickFrame:!1}),...n===`darwin`?{enableLargerThanScreen:!0}:{},hasShadow:!1};',
    replacement:
      'case`avatarOverlay`:return{...L9({alwaysOnTop:!0,platform:n,resizable:!1,thickFrame:!1}),...n===`linux`?{type:`toolbar`}:{},...n===`darwin`?{enableLargerThanScreen:!0}:{},hasShadow:!1};',
  },

];
const mainLinuxAvatarOverlayTypePatchMarker =
  '...n===`linux`?{type:`toolbar`}:{},hasShadow:!1};';
const mainLinuxAvatarOverlayShowPatchAlternatives = [
  {
    target:
      'showWindow(e){if(e.isDestroyed())return;let t=this.isOpen();this.windowStagedForNativePresentation&&!this.presentationFadeInPending&&e.setOpacity(1),this.windowStagedForNativePresentation=!1,!this.presentationFadeInPending&&this.presentationFadeTimer==null&&this.animateNativePresentationOpacity(1,0),e.moveTop(),e.showInactive(),this.presentationFadeInPending&&(this.presentationFadeInPending=!1,this.fadeInPresentation(e)),this.compositionHost.publishRemoteHostedPIPContentHost(),!t&&this.isOpen()&&(this.realtimeController.handlePresented(),this.broadcastOpenState());let n=this.pendingPresentation;n!=null&&(this.pendingPresentation=null,n.velocity==null?(this.dockRestoreAnchor=n.target,this.animatePresentationTo(n.target,k7(this.anchor,n.target),()=>{this.dockRestoreAnchor===n.target&&(this.dockRestoreAnchor=null)})):this.startMomentum(n.velocity.x,n.velocity.y,!0))}',
    replacement:
      'showWindow(e){if(e.isDestroyed())return;let t=this.isOpen();this.windowStagedForNativePresentation&&!this.presentationFadeInPending&&e.setOpacity(1),this.windowStagedForNativePresentation=!1,!this.presentationFadeInPending&&this.presentationFadeTimer==null&&this.animateNativePresentationOpacity(1,0),process.platform===`linux`&&(e.setAlwaysOnTop(!0,`screen-saver`),this.startLinuxTopEnforcement()),e.moveTop(),e.showInactive(),this.presentationFadeInPending&&(this.presentationFadeInPending=!1,this.fadeInPresentation(e)),this.compositionHost.publishRemoteHostedPIPContentHost(),!t&&this.isOpen()&&(this.realtimeController.handlePresented(),this.broadcastOpenState());let n=this.pendingPresentation;n!=null&&(this.pendingPresentation=null,n.velocity==null?(this.dockRestoreAnchor=n.target,this.animatePresentationTo(n.target,k7(this.anchor,n.target),()=>{this.dockRestoreAnchor===n.target&&(this.dockRestoreAnchor=null)})):this.startMomentum(n.velocity.x,n.velocity.y,!0))}',
  },
  {
    target:
      'showWindow(e){if(e.isDestroyed())return;let t=this.isOpen();this.windowStagedForNativePresentation&&=(e.setOpacity(1),!1),e.moveTop(),e.showInactive(),this.compositionHost.publishRemoteHostedPIPContentHost(),!t&&this.isOpen()&&(this.realtimeController.handlePresented(),this.broadcastOpenState());let n=this.pendingPresentation;n!=null&&(this.pendingPresentation=null,n.velocity==null?(this.dockRestoreAnchor=n.target,this.animatePresentationTo(n.target,A7(this.anchor,n.target),()=>{this.dockRestoreAnchor===n.target&&(this.dockRestoreAnchor=null)})):this.startMomentum(n.velocity.x,n.velocity.y,!0))}',
    replacement:
      'showWindow(e){if(e.isDestroyed())return;let t=this.isOpen();this.windowStagedForNativePresentation&&=(e.setOpacity(1),!1),process.platform===`linux`&&(e.setAlwaysOnTop(!0,`screen-saver`),this.startLinuxTopEnforcement()),e.moveTop(),e.showInactive(),this.compositionHost.publishRemoteHostedPIPContentHost(),!t&&this.isOpen()&&(this.realtimeController.handlePresented(),this.broadcastOpenState());let n=this.pendingPresentation;n!=null&&(this.pendingPresentation=null,n.velocity==null?(this.dockRestoreAnchor=n.target,this.animatePresentationTo(n.target,A7(this.anchor,n.target),()=>{this.dockRestoreAnchor===n.target&&(this.dockRestoreAnchor=null)})):this.startMomentum(n.velocity.x,n.velocity.y,!0))}',
  },
  {
    target:
      'showWindow(e){if(e.isDestroyed())return;let t=this.isOpen();this.windowStagedForNativePresentation&&=(e.setOpacity(1),!1),e.moveTop(),e.showInactive(),this.compositionHost.publishRemoteHostedPIPContentHost(),!t&&this.isOpen()&&this.broadcastOpenState();let n=this.pendingPresentation;n!=null&&(this.pendingPresentation=null,n.velocity==null?(this.dockRestoreAnchor=n.target,this.animatePresentationTo(n.target,$5(this.anchor,n.target),()=>{this.dockRestoreAnchor===n.target&&(this.dockRestoreAnchor=null)})):this.startMomentum(n.velocity.x,n.velocity.y,!0))}',
    replacement:
      'showWindow(e){if(e.isDestroyed())return;let t=this.isOpen();this.windowStagedForNativePresentation&&=(e.setOpacity(1),!1),process.platform===`linux`&&(e.setAlwaysOnTop(!0,`screen-saver`),this.startLinuxTopEnforcement()),e.moveTop(),e.showInactive(),this.compositionHost.publishRemoteHostedPIPContentHost(),!t&&this.isOpen()&&this.broadcastOpenState();let n=this.pendingPresentation;n!=null&&(this.pendingPresentation=null,n.velocity==null?(this.dockRestoreAnchor=n.target,this.animatePresentationTo(n.target,$5(this.anchor,n.target),()=>{this.dockRestoreAnchor===n.target&&(this.dockRestoreAnchor=null)})):this.startMomentum(n.velocity.x,n.velocity.y,!0))}',
  },
  {
    target:
      'showWindow(e){if(e.isDestroyed())return;let t=this.isOpen();this.windowStagedForNativePresentation&&=(e.setOpacity(1),!1),e.moveTop(),e.showInactive(),this.compositionHost.publishRemoteHostedPIPContentHost(),!t&&this.isOpen()&&this.broadcastOpenState();let n=this.pendingPresentation;n!=null&&(this.pendingPresentation=null,n.velocity==null?(this.dockRestoreAnchor=n.target,this.animatePresentationTo(n.target,Z5(this.anchor,n.target),()=>{this.dockRestoreAnchor===n.target&&(this.dockRestoreAnchor=null)})):this.startMomentum(n.velocity.x,n.velocity.y,!0))}',
    replacement:
      'showWindow(e){if(e.isDestroyed())return;let t=this.isOpen();this.windowStagedForNativePresentation&&=(e.setOpacity(1),!1),process.platform===`linux`&&(e.setAlwaysOnTop(!0,`screen-saver`),this.startLinuxTopEnforcement()),e.moveTop(),e.showInactive(),this.compositionHost.publishRemoteHostedPIPContentHost(),!t&&this.isOpen()&&this.broadcastOpenState();let n=this.pendingPresentation;n!=null&&(this.pendingPresentation=null,n.velocity==null?(this.dockRestoreAnchor=n.target,this.animatePresentationTo(n.target,Z5(this.anchor,n.target),()=>{this.dockRestoreAnchor===n.target&&(this.dockRestoreAnchor=null)})):this.startMomentum(n.velocity.x,n.velocity.y,!0))}',
  },
  {
    target:
      'showWindow(e){if(e.isDestroyed())return;let t=this.isOpen();e.moveTop(),e.showInactive(),!t&&this.isOpen()&&this.broadcastOpenState()}',
    replacement:
      'showWindow(e){if(e.isDestroyed())return;let t=this.isOpen();process.platform===`linux`&&(e.setAlwaysOnTop(!0,`screen-saver`),this.startLinuxTopEnforcement()),e.moveTop(),e.showInactive(),!t&&this.isOpen()&&this.broadcastOpenState()}',
  },
  {
    target: 'showWindow(e){e.isDestroyed()||(e.moveTop(),e.showInactive())}',
    replacement:
      'showWindow(e){e.isDestroyed()||(process.platform===`linux`&&(e.setAlwaysOnTop(!0,`screen-saver`),this.startLinuxTopEnforcement()),e.moveTop(),e.showInactive())}',
  },
  {
    target:
      'showWindow(e){if(e.isDestroyed())return;let t=this.isOpen();process.platform===`linux`&&e.setAlwaysOnTop(!0,`screen-saver`),e.moveTop(),e.showInactive(),!t&&this.isOpen()&&this.broadcastOpenState()}',
    replacement:
      'showWindow(e){if(e.isDestroyed())return;let t=this.isOpen();process.platform===`linux`&&(e.setAlwaysOnTop(!0,`screen-saver`),this.startLinuxTopEnforcement()),e.moveTop(),e.showInactive(),!t&&this.isOpen()&&this.broadcastOpenState()}',
  },
  {
    target:
      'showWindow(e){if(e.isDestroyed())return;let t=this.isOpen();this.windowStagedForNativePresentation&&=(e.setOpacity(1),!1),e.moveTop(),e.showInactive(),!t&&this.isOpen()&&this.broadcastOpenState()}',
    replacement:
      'showWindow(e){if(e.isDestroyed())return;let t=this.isOpen();this.windowStagedForNativePresentation&&=(e.setOpacity(1),!1),process.platform===`linux`&&(e.setAlwaysOnTop(!0,`screen-saver`),this.startLinuxTopEnforcement()),e.moveTop(),e.showInactive(),!t&&this.isOpen()&&this.broadcastOpenState()}',
  },
  {
    target:
      'showWindow(e){if(e.isDestroyed())return;let t=this.isOpen();this.windowStagedForNativePresentation&&=(e.setOpacity(1),!1),e.moveTop(),e.showInactive(),!t&&this.isOpen()&&(this.finishPendingPresentation(),this.broadcastOpenState())}',
    replacement:
      'showWindow(e){if(e.isDestroyed())return;let t=this.isOpen();this.windowStagedForNativePresentation&&=(e.setOpacity(1),!1),process.platform===`linux`&&(e.setAlwaysOnTop(!0,`screen-saver`),this.startLinuxTopEnforcement()),e.moveTop(),e.showInactive(),!t&&this.isOpen()&&(this.finishPendingPresentation(),this.broadcastOpenState())}',
  },
  {
    target:
      'showWindow(e){if(e.isDestroyed())return;let t=this.isOpen();this.windowStagedForNativePresentation&&=(e.setOpacity(1),!1),e.moveTop(),e.showInactive(),!t&&this.isOpen()&&this.broadcastOpenState();let n=this.pendingPresentation;n!=null&&(this.pendingPresentation=null,n.velocity==null?(this.dockRestoreAnchor=n.target,this.animatePresentationTo(n.target,P6(this.anchor,n.target),()=>{this.dockRestoreAnchor===n.target&&(this.dockRestoreAnchor=null)})):this.startMomentum(n.velocity.x,n.velocity.y,!0))}',
    replacement:
      'showWindow(e){if(e.isDestroyed())return;let t=this.isOpen();this.windowStagedForNativePresentation&&=(e.setOpacity(1),!1),process.platform===`linux`&&(e.setAlwaysOnTop(!0,`screen-saver`),this.startLinuxTopEnforcement()),e.moveTop(),e.showInactive(),!t&&this.isOpen()&&this.broadcastOpenState();let n=this.pendingPresentation;n!=null&&(this.pendingPresentation=null,n.velocity==null?(this.dockRestoreAnchor=n.target,this.animatePresentationTo(n.target,P6(this.anchor,n.target),()=>{this.dockRestoreAnchor===n.target&&(this.dockRestoreAnchor=null)})):this.startMomentum(n.velocity.x,n.velocity.y,!0))}',
  },
  {
    target:
      'showWindow(e){if(e.isDestroyed())return;let t=this.isOpen();this.windowStagedForNativePresentation&&=(e.setOpacity(1),!1),e.moveTop(),e.showInactive(),!t&&this.isOpen()&&this.broadcastOpenState();let n=this.pendingPresentation;n!=null&&(this.pendingPresentation=null,n.velocity==null?(this.dockRestoreAnchor=n.target,this.animatePresentationTo(n.target,M6(this.anchor,n.target),()=>{this.dockRestoreAnchor===n.target&&(this.dockRestoreAnchor=null)})):this.startMomentum(n.velocity.x,n.velocity.y,!0))}',
    replacement:
      'showWindow(e){if(e.isDestroyed())return;let t=this.isOpen();this.windowStagedForNativePresentation&&=(e.setOpacity(1),!1),process.platform===`linux`&&(e.setAlwaysOnTop(!0,`screen-saver`),this.startLinuxTopEnforcement()),e.moveTop(),e.showInactive(),!t&&this.isOpen()&&this.broadcastOpenState();let n=this.pendingPresentation;n!=null&&(this.pendingPresentation=null,n.velocity==null?(this.dockRestoreAnchor=n.target,this.animatePresentationTo(n.target,M6(this.anchor,n.target),()=>{this.dockRestoreAnchor===n.target&&(this.dockRestoreAnchor=null)})):this.startMomentum(n.velocity.x,n.velocity.y,!0))}',
  },
  {
    target:
      'showWindow(e){if(e.isDestroyed())return;let t=this.isOpen();this.windowStagedForNativePresentation&&=(e.setOpacity(1),!1),e.moveTop(),e.showInactive(),this.compositionHost.publishRemoteHostedPIPContentHost(),!t&&this.isOpen()&&this.broadcastOpenState();let n=this.pendingPresentation;n!=null&&(this.pendingPresentation=null,n.velocity==null?(this.dockRestoreAnchor=n.target,this.animatePresentationTo(n.target,A7(this.anchor,n.target),()=>{this.dockRestoreAnchor===n.target&&(this.dockRestoreAnchor=null)})):this.startMomentum(n.velocity.x,n.velocity.y,!0))}',
    replacement:
      'showWindow(e){if(e.isDestroyed())return;let t=this.isOpen();this.windowStagedForNativePresentation&&=(e.setOpacity(1),!1),process.platform===`linux`&&(e.setAlwaysOnTop(!0,`screen-saver`),this.startLinuxTopEnforcement()),e.moveTop(),e.showInactive(),this.compositionHost.publishRemoteHostedPIPContentHost(),!t&&this.isOpen()&&this.broadcastOpenState();let n=this.pendingPresentation;n!=null&&(this.pendingPresentation=null,n.velocity==null?(this.dockRestoreAnchor=n.target,this.animatePresentationTo(n.target,A7(this.anchor,n.target),()=>{this.dockRestoreAnchor===n.target&&(this.dockRestoreAnchor=null)})):this.startMomentum(n.velocity.x,n.velocity.y,!0))}',
  },  {
    target:
      'showWindow(e){if(e.isDestroyed())return;let t=this.isOpen();this.windowStagedForNativePresentation&&!this.presentationFadeInPending&&e.setOpacity(1),this.windowStagedForNativePresentation=!1,!this.presentationFadeInPending&&this.presentationFadeTimer==null&&this.animateNativePresentationOpacity(1,0),e.moveTop(),e.showInactive(),this.presentationFadeInPending&&(this.presentationFadeInPending=!1,this.fadeInPresentation(e)),this.compositionHost.publishRemoteHostedPIPContentHost(),!t&&this.isOpen()&&(this.realtimeController.handlePresented(),this.broadcastOpenState());let n=this.pendingPresentation;n!=null&&(this.pendingPresentation=null,n.velocity==null?(this.dockRestoreAnchor=n.target,this.animatePresentationTo(n.target,O7(this.anchor,n.target),()=>{this.dockRestoreAnchor===n.target&&(this.dockRestoreAnchor=null)})):this.startMomentum(n.velocity.x,n.velocity.y,!0))}',
    replacement:
      'showWindow(e){if(e.isDestroyed())return;let t=this.isOpen();this.windowStagedForNativePresentation&&!this.presentationFadeInPending&&e.setOpacity(1),this.windowStagedForNativePresentation=!1,!this.presentationFadeInPending&&this.presentationFadeTimer==null&&this.animateNativePresentationOpacity(1,0),process.platform===`linux`&&(e.setAlwaysOnTop(!0,`screen-saver`),this.startLinuxTopEnforcement()),e.moveTop(),e.showInactive(),this.presentationFadeInPending&&(this.presentationFadeInPending=!1,this.fadeInPresentation(e)),this.compositionHost.publishRemoteHostedPIPContentHost(),!t&&this.isOpen()&&(this.realtimeController.handlePresented(),this.broadcastOpenState());let n=this.pendingPresentation;n!=null&&(this.pendingPresentation=null,n.velocity==null?(this.dockRestoreAnchor=n.target,this.animatePresentationTo(n.target,O7(this.anchor,n.target),()=>{this.dockRestoreAnchor===n.target&&(this.dockRestoreAnchor=null)})):this.startMomentum(n.velocity.x,n.velocity.y,!0))}',
  },

];
const mainLinuxAvatarOverlayShowPatchMarker = 'this.startLinuxTopEnforcement()';
const mainLinuxAvatarOverlayTopTimerPatchAlternatives = [
  {
    target:
      'momentumTimer=null;pendingPresentation=null;presentationOffset={x:0,y:0};presentationMotionTarget=null;presentationVisibility=null;startupPresentationVisibility=null;dockRestoreAnchor=null;dockTarget=null;suppressNextRendererThrow=!1;movedWindowPersistTimer=null;mousePassthroughEnabled=!1;placement=`top-end`;',
    replacement:
      'momentumTimer=null;pendingPresentation=null;presentationOffset={x:0,y:0};presentationMotionTarget=null;presentationVisibility=null;startupPresentationVisibility=null;dockRestoreAnchor=null;dockTarget=null;suppressNextRendererThrow=!1;movedWindowPersistTimer=null;mousePassthroughEnabled=!1;topEnforcementTimer=null;keyboardInteractive=!1;placement=`top-end`;',
  },
  {
    target:
      'momentumTimer=null;mousePassthroughEnabled=!1;topEnforcementTimer=null;placement=`top-end`;',
    replacement:
      'momentumTimer=null;mousePassthroughEnabled=!1;topEnforcementTimer=null;keyboardInteractive=!1;placement=`top-end`;',
  },
  {
    target: 'momentumTimer=null;mousePassthroughEnabled=!1;placement=`top-end`;',
    replacement:
      'momentumTimer=null;mousePassthroughEnabled=!1;topEnforcementTimer=null;keyboardInteractive=!1;placement=`top-end`;',
  },
  {
    target:
      'momentumTimer=null;movedWindowPersistTimer=null;mousePassthroughEnabled=!1;placement=`top-end`;',
    replacement:
      'momentumTimer=null;movedWindowPersistTimer=null;mousePassthroughEnabled=!1;topEnforcementTimer=null;keyboardInteractive=!1;placement=`top-end`;',
  },
  {
    target:
      'momentumTimer=null;suppressNextRendererThrow=!1;movedWindowPersistTimer=null;mousePassthroughEnabled=!1;pendingRealtimeStart=null;hideAfterRealtimeSessionEnd=!1;hasRealtimeSession=!1;pendingPresentation=null;placement=`top-end`;',
    replacement:
      'momentumTimer=null;suppressNextRendererThrow=!1;movedWindowPersistTimer=null;mousePassthroughEnabled=!1;topEnforcementTimer=null;keyboardInteractive=!1;pendingRealtimeStart=null;hideAfterRealtimeSessionEnd=!1;hasRealtimeSession=!1;pendingPresentation=null;placement=`top-end`;',
  },
  {
    target:
      'momentumTimer=null;pendingPresentation=null;presentationOffset={x:0,y:0};presentationMotionTarget=null;presentationVisibility=null;startupPresentationVisibility=null;dockRestoreAnchor=null;dockTarget=null;orbDragFollowTarget=null;orbDragFollowTimer=null;suppressNextRendererThrow=!1;movedWindowPersistTimer=null;mousePassthroughEnabled=!1;placement=`top-end`;',
    replacement:
      'momentumTimer=null;pendingPresentation=null;presentationOffset={x:0,y:0};presentationMotionTarget=null;presentationVisibility=null;startupPresentationVisibility=null;dockRestoreAnchor=null;dockTarget=null;orbDragFollowTarget=null;orbDragFollowTimer=null;suppressNextRendererThrow=!1;movedWindowPersistTimer=null;mousePassthroughEnabled=!1;topEnforcementTimer=null;keyboardInteractive=!1;placement=`top-end`;',
  },  {
    target:
      'momentumTimer=null;pendingPresentation=null;presentationOffset={x:0,y:0};presentationMotionTarget=null;presentationFadeInPending=!1;presentationFadeTimer=null;arePresentationAccessoriesVisible=!0;presentationLayoutPending=!1;presentationVisibility=null;startupPresentationVisibility=null;dockRestoreAnchor=null;dockTarget=null;suppressNextRendererThrow=!1;movedWindowPersistTimer=null;mousePassthroughEnabled=!1;placement=`top-end`;',
    replacement:
      'momentumTimer=null;pendingPresentation=null;presentationOffset={x:0,y:0};presentationMotionTarget=null;presentationFadeInPending=!1;presentationFadeTimer=null;arePresentationAccessoriesVisible=!0;presentationLayoutPending=!1;presentationVisibility=null;startupPresentationVisibility=null;dockRestoreAnchor=null;dockTarget=null;suppressNextRendererThrow=!1;movedWindowPersistTimer=null;mousePassthroughEnabled=!1;topEnforcementTimer=null;keyboardInteractive=!1;placement=`top-end`;',
  },
  {
    target:
      'momentumTimer=null;pendingPresentation=null;presentationOffset={x:0,y:0};presentationMotionTarget=null;presentationFadeInPending=!1;presentationFadeTimer=null;arePresentationAccessoriesVisible=!0;presentationLayoutPending=!1;presentationVisibility=null;startupPresentationVisibility=null;dockRestoreAnchor=null;dockTarget=null;suppressNextRendererThrow=!1;movedWindowPersistTimer=null;mousePassthroughEnabled=!1;inputShape=null;placement=`top-end`;',
    replacement:
      'momentumTimer=null;pendingPresentation=null;presentationOffset={x:0,y:0};presentationMotionTarget=null;presentationFadeInPending=!1;presentationFadeTimer=null;arePresentationAccessoriesVisible=!0;presentationLayoutPending=!1;presentationVisibility=null;startupPresentationVisibility=null;dockRestoreAnchor=null;dockTarget=null;suppressNextRendererThrow=!1;movedWindowPersistTimer=null;mousePassthroughEnabled=!1;topEnforcementTimer=null;keyboardInteractive=!1;inputShape=null;placement=`top-end`;',
  },

];
const mainLinuxAvatarOverlayTopTimerPatchMarker = 'keyboardInteractive=!1;';
const mainLinuxAvatarOverlayPointerPatchAlternatives = [
  {
    target:
      'applyPointerInteractivityPolicy(){let e=this.window;if(e==null||e.isDestroyed()){this.mousePassthroughEnabled=!1;return}let t=!this.pointerInteractive;if(this.mousePassthroughEnabled!==t){if(this.mousePassthroughEnabled=t,t){e.setIgnoreMouseEvents(!0,{forward:!0});return}e.setIgnoreMouseEvents(!1),this.refreshCursorAtCurrentMousePosition(e)}}',
    replacement:
      'applyPointerInteractivityPolicy(){let e=this.window;if(e==null||e.isDestroyed()){this.mousePassthroughEnabled=!1;return}if(process.platform===`linux`){this.mousePassthroughEnabled=!1,e.setIgnoreMouseEvents(!1);return}let t=!this.pointerInteractive;if(this.mousePassthroughEnabled!==t){if(this.mousePassthroughEnabled=t,t){e.setIgnoreMouseEvents(!0,{forward:!0});return}e.setIgnoreMouseEvents(!1),this.refreshCursorAtCurrentMousePosition(e)}}',
  },
  {
    target:
      'applyPointerInteractivityPolicy(){let e=this.window;if(e==null||e.isDestroyed()){this.mousePassthroughEnabled=!1;return}if(this.applyInputShape(e))return;let t=!this.pointerInteractive;if(this.mousePassthroughEnabled!==t){if(this.mousePassthroughEnabled=t,t){e.setIgnoreMouseEvents(!0,{forward:!0});return}e.setIgnoreMouseEvents(!1),this.refreshCursorAtCurrentMousePosition(e)}}',
    replacement:
      'applyPointerInteractivityPolicy(){let e=this.window;if(e==null||e.isDestroyed()){this.mousePassthroughEnabled=!1;return}if(process.platform===`linux`){this.mousePassthroughEnabled=!1,e.setIgnoreMouseEvents(!1);return}if(this.applyInputShape(e))return;let t=!this.pointerInteractive;if(this.mousePassthroughEnabled!==t){if(this.mousePassthroughEnabled=t,t){e.setIgnoreMouseEvents(!0,{forward:!0});return}e.setIgnoreMouseEvents(!1),this.refreshCursorAtCurrentMousePosition(e)}}',
  },
  {
    target:
      'applyPointerInteractivityPolicy(){let e=this.window;if(e==null||e.isDestroyed()){this.mousePassthroughEnabled=!1;return}if(process.platform===`linux`){this.mousePassthroughEnabled=!0,e.setIgnoreMouseEvents(!0);return}let t=!this.pointerInteractive;if(this.mousePassthroughEnabled!==t){if(this.mousePassthroughEnabled=t,t){e.setIgnoreMouseEvents(!0,{forward:!0});return}e.setIgnoreMouseEvents(!1),this.refreshCursorAtCurrentMousePosition(e)}}',
    replacement:
      'applyPointerInteractivityPolicy(){let e=this.window;if(e==null||e.isDestroyed()){this.mousePassthroughEnabled=!1;return}if(process.platform===`linux`){this.mousePassthroughEnabled=!1,e.setIgnoreMouseEvents(!1);return}let t=!this.pointerInteractive;if(this.mousePassthroughEnabled!==t){if(this.mousePassthroughEnabled=t,t){e.setIgnoreMouseEvents(!0,{forward:!0});return}e.setIgnoreMouseEvents(!1),this.refreshCursorAtCurrentMousePosition(e)}}',
  },
  {
    target:
      'applyPointerInteractivityPolicy(){let e=this.window;if(e==null||e.isDestroyed()){this.mousePassthroughEnabled=!1;return}let t=!(this.pointerInteractive||this.keyboardInteractive);if(this.mousePassthroughEnabled!==t){if(this.mousePassthroughEnabled=t,t){e.setIgnoreMouseEvents(!0,{forward:!0});return}e.setIgnoreMouseEvents(!1),this.refreshCursorAtCurrentMousePosition(e)}}',
    replacement:
      'applyPointerInteractivityPolicy(){let e=this.window;if(e==null||e.isDestroyed()){this.mousePassthroughEnabled=!1;return}if(process.platform===`linux`){this.mousePassthroughEnabled=!1,e.setIgnoreMouseEvents(!1);return}let t=!this.pointerInteractive;if(this.mousePassthroughEnabled!==t){if(this.mousePassthroughEnabled=t,t){e.setIgnoreMouseEvents(!0,{forward:!0});return}e.setIgnoreMouseEvents(!1),this.refreshCursorAtCurrentMousePosition(e)}}',
  },
];
const mainLinuxAvatarOverlayPointerPatchMarker =
  'if(process.platform===`linux`){this.mousePassthroughEnabled=!1,e.setIgnoreMouseEvents(!1);return}';
const mainLinuxAvatarOverlayRaiseMethodPatchAlternatives = [
  {
    target:
      'isOpen(){let e=this.window;return e!=null&&!e.isDestroyed()&&e.isVisible()}async toggle',
    replacement:
      'isOpen(){let e=this.window;return e!=null&&!e.isDestroyed()&&e.isVisible()}raiseWindow(){let e=this.window;if(e==null||e.isDestroyed()||!e.isVisible()||process.platform!==`linux`)return;let t=()=>{e.isDestroyed()||(e.setAlwaysOnTop(!0,`screen-saver`),e.moveTop(),e.isFocused()||e.showInactive())};t();let r=setTimeout(t,0),i=setTimeout(t,80);r.unref?.(),i.unref?.()}startLinuxTopEnforcement(){process.platform!==`linux`||this.topEnforcementTimer!=null||(this.topEnforcementTimer=setInterval(()=>{this.raiseWindow()},500),this.topEnforcementTimer.unref?.())}stopLinuxTopEnforcement(){this.topEnforcementTimer!=null&&(clearInterval(this.topEnforcementTimer),this.topEnforcementTimer=null)}async toggle',
  },
  {
    target:
      'isOpen(){let e=this.window;return e!=null&&!e.isDestroyed()&&e.isVisible()}raiseWindow(){let e=this.window;if(e==null||e.isDestroyed()||!e.isVisible()||process.platform!==`linux`)return;let t=()=>{e.isDestroyed()||(e.setAlwaysOnTop(!0,`screen-saver`),e.moveTop(),e.showInactive())};t();let r=setTimeout(t,0),i=setTimeout(t,80);r.unref?.(),i.unref?.()}async toggle',
    replacement:
      'isOpen(){let e=this.window;return e!=null&&!e.isDestroyed()&&e.isVisible()}raiseWindow(){let e=this.window;if(e==null||e.isDestroyed()||!e.isVisible()||process.platform!==`linux`)return;let t=()=>{e.isDestroyed()||(e.setAlwaysOnTop(!0,`screen-saver`),e.moveTop(),e.isFocused()||e.showInactive())};t();let r=setTimeout(t,0),i=setTimeout(t,80);r.unref?.(),i.unref?.()}startLinuxTopEnforcement(){process.platform!==`linux`||this.topEnforcementTimer!=null||(this.topEnforcementTimer=setInterval(()=>{this.raiseWindow()},500),this.topEnforcementTimer.unref?.())}stopLinuxTopEnforcement(){this.topEnforcementTimer!=null&&(clearInterval(this.topEnforcementTimer),this.topEnforcementTimer=null)}async toggle',
  },
  {
    target:
      'isOpen(){let e=this.window;return e!=null&&!e.isDestroyed()&&e.isVisible()}raiseWindow(){let e=this.window;if(e==null||e.isDestroyed()||!e.isVisible()||process.platform!==`linux`)return;let t=()=>{e.isDestroyed()||(e.setAlwaysOnTop(!0,`screen-saver`),e.moveTop(),e.showInactive())};t();let r=setTimeout(t,0),i=setTimeout(t,80);r.unref?.(),i.unref?.()}startLinuxTopEnforcement(){process.platform!==`linux`||this.topEnforcementTimer!=null||(this.topEnforcementTimer=setInterval(()=>{this.raiseWindow()},500),this.topEnforcementTimer.unref?.())}stopLinuxTopEnforcement(){this.topEnforcementTimer!=null&&(clearInterval(this.topEnforcementTimer),this.topEnforcementTimer=null)}async toggle',
    replacement:
      'isOpen(){let e=this.window;return e!=null&&!e.isDestroyed()&&e.isVisible()}raiseWindow(){let e=this.window;if(e==null||e.isDestroyed()||!e.isVisible()||process.platform!==`linux`)return;let t=()=>{e.isDestroyed()||(e.setAlwaysOnTop(!0,`screen-saver`),e.moveTop(),e.isFocused()||e.showInactive())};t();let r=setTimeout(t,0),i=setTimeout(t,80);r.unref?.(),i.unref?.()}startLinuxTopEnforcement(){process.platform!==`linux`||this.topEnforcementTimer!=null||(this.topEnforcementTimer=setInterval(()=>{this.raiseWindow()},500),this.topEnforcementTimer.unref?.())}stopLinuxTopEnforcement(){this.topEnforcementTimer!=null&&(clearInterval(this.topEnforcementTimer),this.topEnforcementTimer=null)}async toggle',
  },
  {
    target:
      'isOpen(){let e=this.window;return e!=null&&!e.isDestroyed()&&e.isVisible()&&!this.windowStagedForNativePresentation}async toggle',
    replacement:
      'isOpen(){let e=this.window;return e!=null&&!e.isDestroyed()&&e.isVisible()&&!this.windowStagedForNativePresentation}raiseWindow(){let e=this.window;if(e==null||e.isDestroyed()||!e.isVisible()||process.platform!==`linux`)return;let t=()=>{e.isDestroyed()||(e.setAlwaysOnTop(!0,`screen-saver`),e.moveTop(),e.isFocused()||e.showInactive())};t();let n=setTimeout(t,0),r=setTimeout(t,80);n.unref?.(),r.unref?.()}startLinuxTopEnforcement(){process.platform!==`linux`||this.topEnforcementTimer!=null||(this.topEnforcementTimer=setInterval(()=>{this.raiseWindow()},500),this.topEnforcementTimer.unref?.())}stopLinuxTopEnforcement(){this.topEnforcementTimer!=null&&(clearInterval(this.topEnforcementTimer),this.topEnforcementTimer=null)}async toggle',
  },
  {
    target:
      'isOpen(){let e=this.window;return e!=null&&!e.isDestroyed()&&e.isVisible()&&!this.windowStagedForNativePresentation}getVisibleWebContents()',
    replacement:
      'isOpen(){let e=this.window;return e!=null&&!e.isDestroyed()&&e.isVisible()&&!this.windowStagedForNativePresentation}raiseWindow(){let e=this.window;if(e==null||e.isDestroyed()||!e.isVisible()||process.platform!==`linux`)return;let t=()=>{e.isDestroyed()||(e.setAlwaysOnTop(!0,`screen-saver`),e.moveTop(),e.isFocused()||e.showInactive())};t();let n=setTimeout(t,0),r=setTimeout(t,80);n.unref?.(),r.unref?.()}startLinuxTopEnforcement(){process.platform!==`linux`||this.topEnforcementTimer!=null||(this.topEnforcementTimer=setInterval(()=>{this.raiseWindow()},500),this.topEnforcementTimer.unref?.())}stopLinuxTopEnforcement(){this.topEnforcementTimer!=null&&(clearInterval(this.topEnforcementTimer),this.topEnforcementTimer=null)}getVisibleWebContents()',
  },
  {
    target:
      'isOpen(){let e=this.window;return e!=null&&!e.isDestroyed()&&e.isVisible()&&!this.windowStagedForNativePresentation}subscribePresentationFocus(e){',
    replacement:
      'isOpen(){let e=this.window;return e!=null&&!e.isDestroyed()&&e.isVisible()&&!this.windowStagedForNativePresentation}raiseWindow(){let e=this.window;if(e==null||e.isDestroyed()||!e.isVisible()||process.platform!==`linux`)return;let t=()=>{e.isDestroyed()||(e.setAlwaysOnTop(!0,`screen-saver`),e.moveTop(),e.isFocused()||e.showInactive())};t();let n=setTimeout(t,0),r=setTimeout(t,80);n.unref?.(),r.unref?.()}startLinuxTopEnforcement(){process.platform!==`linux`||this.topEnforcementTimer!=null||(this.topEnforcementTimer=setInterval(()=>{this.raiseWindow()},500),this.topEnforcementTimer.unref?.())}stopLinuxTopEnforcement(){this.topEnforcementTimer!=null&&(clearInterval(this.topEnforcementTimer),this.topEnforcementTimer=null)}subscribePresentationFocus(e){',
  },
];
const mainLinuxAvatarOverlayRaiseMethodPatchMarker =
  'e.isFocused()||e.showInactive()';
const mainLinuxAvatarOverlayStopTopTimerPatchAlternatives = [
  {
    target:
      'this.cancelMomentum(),this.clearMovedWindowPersist(),this.nativePositionController.clear(),this.window=null,this.removeDisplayChangeListeners(),this.removeApplicationLifecycleListeners(),this.removePowerMonitorListeners()',
    replacement:
      'this.cancelMomentum(),this.clearMovedWindowPersist(),this.stopLinuxTopEnforcement(),this.nativePositionController.clear(),this.window=null,this.removeDisplayChangeListeners(),this.removeApplicationLifecycleListeners(),this.removePowerMonitorListeners()',
  },
  {
    target: 'this.cancelMomentum(),this.window=null,this.removeDisplayChangeListeners()',
    replacement:
      'this.cancelMomentum(),this.stopLinuxTopEnforcement(),this.window=null,this.removeDisplayChangeListeners()',
  },
  {
    target:
      'this.cancelMomentum(),this.clearMovedWindowPersist(),this.window=null,this.removeDisplayChangeListeners(),this.removePowerMonitorListeners()',
    replacement:
      'this.cancelMomentum(),this.clearMovedWindowPersist(),this.stopLinuxTopEnforcement(),this.window=null,this.removeDisplayChangeListeners(),this.removePowerMonitorListeners()',
  },
  {
    target:
      'this.cancelMomentum(),this.clearMovedWindowPersist(),this.nativePositionController.clear(),this.window=null,this.removeDisplayChangeListeners(),this.removePowerMonitorListeners()',
    replacement:
      'this.cancelMomentum(),this.clearMovedWindowPersist(),this.stopLinuxTopEnforcement(),this.nativePositionController.clear(),this.window=null,this.removeDisplayChangeListeners(),this.removePowerMonitorListeners()',
  },
];
const mainLinuxAvatarOverlayStopTopTimerPatchMarker = 'this.stopLinuxTopEnforcement()';
const mainLinuxAvatarOverlayFocusRaisePatchVariants = [
  ['Ee', 'Te', 'R'],
  ['be', 'ye', 'R'],
  ['ie', 'z', 'M'],
  ['se', 'oe', 'M'],
  ['de', 'ue', 'M'],
  ['pe', 'fe', 'N'],
  ['me', 'pe', 'j'],
  ['he', 'me', 'N'],
  ['ye', 've', 'L'],
  ['xe', 'be', 'z'],
  ['Pe', 'Ne', 'R'],
  ['Ne', 'Me', 'V'],
];
export const mainLinuxAvatarOverlayFocusRaisePatchAlternatives =
  mainLinuxAvatarOverlayFocusRaisePatchVariants.flatMap(
    ([handler, menuManager, windowServices]) => {
      const unpatched = `let ${handler}=()=>{${menuManager}.refreshApplicationMenu()};`;
      const unsafe = `let ${handler}=()=>{${menuManager}.refreshApplicationMenu(),${windowServices}.avatarOverlayManager.raiseWindow?.()};`;
      const safe = `let ${handler}=()=>{${menuManager}.refreshApplicationMenu(),${windowServices}.avatarOverlayManager?.raiseWindow?.()};`;
      return [
        { target: unsafe, replacement: safe },
        { target: unpatched, replacement: safe },
      ];
    },
  );
export const mainLinuxAvatarOverlayFocusRaisePatchMarker =
  '.avatarOverlayManager?.raiseWindow?.()';
const mainLinuxAvatarOverlayFocusableWindowPatchAlternatives = [
  {
    target:
      'appearance:`avatarOverlay`,supportsWindowTiling:!1,focusable:!1,show:!1,initialRoute:VSe',
    replacement:
      'appearance:`avatarOverlay`,supportsWindowTiling:!1,focusable:process.platform===`linux`?!0:!1,show:!1,initialRoute:VSe',
  },
  {
    target:
      'appearance:`avatarOverlay`,supportsWindowTiling:!1,focusable:!1,show:!1,initialRoute:G_e',
    replacement:
      'appearance:`avatarOverlay`,supportsWindowTiling:!1,focusable:process.platform===`linux`?!0:!1,show:!1,initialRoute:G_e',
  },
  {
    target:
      'appearance:`avatarOverlay`,supportsWindowTiling:!1,focusable:!1,show:!1,initialRoute:Xxe',
    replacement:
      'appearance:`avatarOverlay`,supportsWindowTiling:!1,focusable:process.platform===`linux`?!0:!1,show:!1,initialRoute:Xxe',
  },
  {
    target:
      'appearance:`avatarOverlay`,focusable:!1,show:!1,initialRoute:d5',
    replacement:
      'appearance:`avatarOverlay`,focusable:process.platform===`linux`?!0:!1,show:!1,initialRoute:d5',
  },
  {
    target:
      'appearance:`avatarOverlay`,focusable:!1,show:!1,initialRoute:l5',
    replacement:
      'appearance:`avatarOverlay`,focusable:process.platform===`linux`?!0:!1,show:!1,initialRoute:l5',
  },
  {
    target:
      'appearance:`avatarOverlay`,focusable:!1,show:!1,initialRoute:pO',
    replacement:
      'appearance:`avatarOverlay`,focusable:process.platform===`linux`?!0:!1,show:!1,initialRoute:pO',
  },
  {
    target:
      'appearance:`avatarOverlay`,focusable:!1,show:!1,initialRoute:yU',
    replacement:
      'appearance:`avatarOverlay`,focusable:process.platform===`linux`?!0:!1,show:!1,initialRoute:yU',
  },
  {
    target:
      'appearance:`avatarOverlay`,focusable:!1,show:!1,initialRoute:kG',
    replacement:
      'appearance:`avatarOverlay`,focusable:process.platform===`linux`?!0:!1,show:!1,initialRoute:kG',
  },
  {
    target:
      'appearance:`avatarOverlay`,focusable:!1,show:!1,initialRoute:uQ',
    replacement:
      'appearance:`avatarOverlay`,focusable:process.platform===`linux`?!0:!1,show:!1,initialRoute:uQ',
  },
  {
    target:
      'appearance:`avatarOverlay`,focusable:!1,show:!1,initialRoute:b0',
    replacement:
      'appearance:`avatarOverlay`,focusable:process.platform===`linux`?!0:!1,show:!1,initialRoute:b0',
  },
  {
    target:
      'appearance:`avatarOverlay`,focusable:!1,show:!1,initialRoute:L2',
    replacement:
      'appearance:`avatarOverlay`,focusable:process.platform===`linux`?!0:!1,show:!1,initialRoute:L2',
  },
  {
    target:
      'appearance:`avatarOverlay`,focusable:!1,show:!1,initialRoute:K3',
    replacement:
      'appearance:`avatarOverlay`,focusable:process.platform===`linux`?!0:!1,show:!1,initialRoute:K3',
  },
  {
    target:
      'appearance:`avatarOverlay`,focusable:!1,show:!1,initialRoute:W3',
    replacement:
      'appearance:`avatarOverlay`,focusable:process.platform===`linux`?!0:!1,show:!1,initialRoute:W3',
  },
  {
    target:
      'appearance:`avatarOverlay`,focusable:!1,show:!1,initialRoute:fne',
    replacement:
      'appearance:`avatarOverlay`,focusable:process.platform===`linux`?!0:!1,show:!1,initialRoute:fne',
  },
  {
    target:
      'appearance:`avatarOverlay`,focusable:!1,show:!1,initialRoute:dne',
    replacement:
      'appearance:`avatarOverlay`,focusable:process.platform===`linux`?!0:!1,show:!1,initialRoute:dne',
  },
  {
    target:
      'appearance:`avatarOverlay`,supportsWindowTiling:!1,focusable:!1,show:!1,initialRoute:yCe',
    replacement:
      'appearance:`avatarOverlay`,supportsWindowTiling:!1,focusable:process.platform===`linux`?!0:!1,show:!1,initialRoute:yCe',
  },
];
const mainLinuxAvatarOverlayFocusableWindowPatchMarker =
  'focusable:process.platform===`linux`?!0:!1';
const mainLinuxAvatarOverlayKeyboardFocusPatchAlternatives = [
  {
    target:
      'if(this.applyPointerInteractivityPolicy(),!t){n.setFocusable(!1);return}n.setFocusable(!0),n.show(),process.platform===`darwin`&&c.app.focus({steal:!0}),n.focus(),n.webContents.focus()',
    replacement:
      'this.keyboardInteractive=t;if(this.applyPointerInteractivityPolicy(),!t){process.platform!==`linux`&&n.setFocusable(!1);return}n.setFocusable(!0),n.show(),(process.platform===`darwin`||process.platform===`linux`)&&c.app.focus({steal:!0}),n.focus(),n.webContents.focus()',
  },
  {
    target:
      'if(this.applyPointerInteractivityPolicy(),!t){r.setFocusable(!1);return}r.setFocusable(!0),r.show(),process.platform===`darwin`&&n.app.focus({steal:!0}),r.focus(),r.webContents.focus()',
    replacement:
      'this.keyboardInteractive=t;if(this.applyPointerInteractivityPolicy(),!t){process.platform!==`linux`&&r.setFocusable(!1);return}r.setFocusable(!0),r.show(),(process.platform===`darwin`||process.platform===`linux`)&&n.app.focus({steal:!0}),r.focus(),r.webContents.focus()',
  },
  {
    target:
      'if(this.applyPointerInteractivityPolicy(),!t){process.platform!==`linux`&&r.setFocusable(!1);return}r.setFocusable(!0),r.show(),(process.platform===`darwin`||process.platform===`linux`)&&n.app.focus({steal:!0}),r.focus(),r.webContents.focus()',
    replacement:
      'this.keyboardInteractive=t;if(this.applyPointerInteractivityPolicy(),!t){process.platform!==`linux`&&r.setFocusable(!1);return}r.setFocusable(!0),r.show(),(process.platform===`darwin`||process.platform===`linux`)&&n.app.focus({steal:!0}),r.focus(),r.webContents.focus()',
  },
  {
    target:
      'if(this.applyPointerInteractivityPolicy(),!t){n.setFocusable(!1);return}n.setFocusable(!0),n.show(),process.platform===`darwin`&&a.app.focus({steal:!0}),n.focus(),n.webContents.focus()',
    replacement:
      'this.keyboardInteractive=t;if(this.applyPointerInteractivityPolicy(),!t){process.platform!==`linux`&&n.setFocusable(!1);return}n.setFocusable(!0),n.show(),(process.platform===`darwin`||process.platform===`linux`)&&a.app.focus({steal:!0}),n.focus(),n.webContents.focus()',
  },
  {
    target:
      'if(this.applyPointerInteractivityPolicy(),!t){n.setFocusable(!1);return}n.setFocusable(!0),n.show(),process.platform===`darwin`&&r.app.focus({steal:!0}),n.focus(),n.webContents.focus()',
    replacement:
      'this.keyboardInteractive=t;if(this.applyPointerInteractivityPolicy(),!t){process.platform!==`linux`&&n.setFocusable(!1);return}n.setFocusable(!0),n.show(),(process.platform===`darwin`||process.platform===`linux`)&&r.app.focus({steal:!0}),n.focus(),n.webContents.focus()',
  },
  {
    target:
      'if(this.applyPointerInteractivityPolicy(),!t){n.setFocusable(!1);return}n.setFocusable(!0),n.show(),process.platform===`darwin`&&l.app.focus({steal:!0}),n.focus(),n.webContents.focus()',
    replacement:
      'this.keyboardInteractive=t;if(this.applyPointerInteractivityPolicy(),!t){process.platform!==`linux`&&n.setFocusable(!1);return}n.setFocusable(!0),n.show(),(process.platform===`darwin`||process.platform===`linux`)&&l.app.focus({steal:!0}),n.focus(),n.webContents.focus()',
  },
];
const mainLinuxAvatarOverlayKeyboardFocusPatchMarker =
  'this.keyboardInteractive=t;if(this.applyPointerInteractivityPolicy()';
const mainLinuxAvatarOverlayAvailabilityPatchAlternatives = [
  {
    target:
      'function br(e,{buildFlavor:t=a.a.resolve(),env:n=S.default.env,platform:r=S.default.platform}={}){let i=r===`win32`&&e.computerUse===!0?{...e,computerUseNodeRepl:!0}:e,o=r===`win32`&&n.CODEX_ELECTRON_ENABLE_WINDOWS_COMPUTER_USE===`1`?{...i,computerUse:!0,computerUseNodeRepl:!0}:i,s=t===a.a.Dev?xr(n):null;return s==null?{...o,deviceAttestation:Qn({platform:r})}:{...o,...s,deviceAttestation:Qn({platform:r})}}',
    replacement:
      'function br(e,{buildFlavor:t=a.a.resolve(),env:n=S.default.env,platform:r=S.default.platform}={}){let i=r===`linux`?{...e,avatarOverlay:!0}:e,o=r===`win32`&&i.computerUse===!0?{...i,computerUseNodeRepl:!0}:i,s=r===`win32`&&n.CODEX_ELECTRON_ENABLE_WINDOWS_COMPUTER_USE===`1`?{...o,computerUse:!0,computerUseNodeRepl:!0}:o,c=t===a.a.Dev?xr(n):null;return c==null?{...s,deviceAttestation:Qn({platform:r})}:{...s,...c,deviceAttestation:Qn({platform:r})}}',
  },
  {
    target:
      'function at(e,{buildFlavor:t=i.a.resolve(),env:n=S.default.env,platform:r=S.default.platform}={}){let a=r===`win32`&&e.computerUse===!0?{...e,computerUseNodeRepl:!0}:e,o=r===`win32`&&n.CODEX_ELECTRON_ENABLE_WINDOWS_COMPUTER_USE===`1`?{...a,computerUse:!0,computerUseNodeRepl:!0}:a,s=t===i.a.Dev?ot(n):null;return s==null?{...o,deviceAttestation:ke({platform:r})}:{...o,...s,deviceAttestation:ke({platform:r})}}',
    replacement:
      'function at(e,{buildFlavor:t=i.a.resolve(),env:n=S.default.env,platform:r=S.default.platform}={}){let a=r===`linux`?{...e,avatarOverlay:!0}:e,o=r===`win32`&&a.computerUse===!0?{...a,computerUseNodeRepl:!0}:a,s=r===`win32`&&n.CODEX_ELECTRON_ENABLE_WINDOWS_COMPUTER_USE===`1`?{...o,computerUse:!0,computerUseNodeRepl:!0}:o,c=t===i.a.Dev?ot(n):null;return c==null?{...s,deviceAttestation:ke({platform:r})}:{...s,...c,deviceAttestation:ke({platform:r})}}',
  },
  {
    target:
      'function tt(e,{buildFlavor:t=i.a.resolve(),env:n=b.default.env,platform:r=b.default.platform}={}){let a=r===`win32`&&e.computerUse===!0?{...e,computerUseNodeRepl:!0}:e,o=r===`win32`&&n.CODEX_ELECTRON_ENABLE_WINDOWS_COMPUTER_USE===`1`?{...a,computerUse:!0,computerUseNodeRepl:!0}:a,s=t===i.a.Dev?nt(n):null;return s==null?{...o,deviceAttestation:Te({platform:r})}:{...o,...s,deviceAttestation:Te({platform:r})}}',
    replacement:
      'function tt(e,{buildFlavor:t=i.a.resolve(),env:n=b.default.env,platform:r=b.default.platform}={}){let a=r===`linux`?{...e,avatarOverlay:!0}:e,o=r===`win32`&&a.computerUse===!0?{...a,computerUseNodeRepl:!0}:a,s=r===`win32`&&n.CODEX_ELECTRON_ENABLE_WINDOWS_COMPUTER_USE===`1`?{...o,computerUse:!0,computerUseNodeRepl:!0}:o,c=t===i.a.Dev?nt(n):null;return c==null?{...s,deviceAttestation:Te({platform:r})}:{...s,...c,deviceAttestation:Te({platform:r})}}',
  },
  // Current bundles no longer gate the avatar overlay in desktop feature availability.
  {
    target:
      'function Xe(e,{buildFlavor:t=i.a.resolve(),env:n=g.default.env,platform:r=g.default.platform}={}){let a=r===`win32`&&e.computerUse===!0?{...e,computerUseNodeRepl:!0}:e,o=r===`win32`&&n.CODEX_ELECTRON_ENABLE_WINDOWS_COMPUTER_USE===`1`?{...a,computerUse:!0,computerUseNodeRepl:!0}:a,s=t===i.a.Dev?Ze(n):null;return s==null?{...o,deviceAttestation:be({platform:r})}:{...o,...s,deviceAttestation:be({platform:r})}}',
    replacement:
      'function Xe(e,{buildFlavor:t=i.a.resolve(),env:n=g.default.env,platform:r=g.default.platform}={}){let a=r===`win32`&&e.computerUse===!0?{...e,computerUseNodeRepl:!0}:e,o=r===`win32`&&n.CODEX_ELECTRON_ENABLE_WINDOWS_COMPUTER_USE===`1`?{...a,computerUse:!0,computerUseNodeRepl:!0}:a,s=t===i.a.Dev?Ze(n):null;return s==null?{...o,deviceAttestation:be({platform:r})}:{...o,...s,deviceAttestation:be({platform:r})}}',
  },
  {
    target:
      'function me(e,{env:t=process.env,platform:n=process.platform}={}){return n!==`win32`||t.CODEX_ELECTRON_ENABLE_WINDOWS_COMPUTER_USE!==`1`?e:{...e,computerUse:!0,computerUseNodeRepl:!0}}',
    replacement:
      'function me(e,{env:t=process.env,platform:n=process.platform}={}){let r=n===`linux`?{...e,avatarOverlay:!0}:e;return n!==`win32`||t.CODEX_ELECTRON_ENABLE_WINDOWS_COMPUTER_USE!==`1`?r:{...r,computerUse:!0,computerUseNodeRepl:!0}}',
  },
  {
    target:
      'function ye(e,{buildFlavor:n=t.D.resolve(),env:r=d.default.env,platform:i=d.default.platform}={}){let a=i===`win32`&&r.CODEX_ELECTRON_ENABLE_WINDOWS_COMPUTER_USE===`1`?{...e,computerUse:!0,computerUseNodeRepl:!0}:e,o=n===t.D.Dev?be(r):null;return o==null?a:{...a,...o}}',
    replacement:
      'function ye(e,{buildFlavor:n=t.D.resolve(),env:r=d.default.env,platform:i=d.default.platform}={}){let a=i===`linux`?{...e,avatarOverlay:!0}:e,o=i===`win32`&&r.CODEX_ELECTRON_ENABLE_WINDOWS_COMPUTER_USE===`1`?{...a,computerUse:!0,computerUseNodeRepl:!0}:a,s=n===t.D.Dev?be(r):null;return s==null?o:{...o,...s}}',
  },
  {
    target:
      'function xe(e,{buildFlavor:n=t.O.resolve(),env:r=f.default.env,platform:i=f.default.platform}={}){let a=i===`win32`&&r.CODEX_ELECTRON_ENABLE_WINDOWS_COMPUTER_USE===`1`?{...e,computerUse:!0,computerUseNodeRepl:!0}:e,o=n===t.O.Dev?Se(r):null;return o==null?a:{...a,...o}}',
    replacement:
      'function xe(e,{buildFlavor:n=t.O.resolve(),env:r=f.default.env,platform:i=f.default.platform}={}){let a=i===`linux`?{...e,avatarOverlay:!0}:e,o=i===`win32`&&r.CODEX_ELECTRON_ENABLE_WINDOWS_COMPUTER_USE===`1`?{...a,computerUse:!0,computerUseNodeRepl:!0}:a,s=n===t.O.Dev?Se(r):null;return s==null?o:{...o,...s}}',
  },
  {
    target:
      'function Ue(e,{buildFlavor:t=r.M.resolve(),env:n=h.default.env,platform:i=h.default.platform}={}){let a=i===`win32`&&n.CODEX_ELECTRON_ENABLE_WINDOWS_COMPUTER_USE===`1`?{...e,computerUse:!0,computerUseNodeRepl:!0}:e,o=t===r.M.Dev?We(n):null;return o==null?{...a,deviceAttestation:xe({platform:i})}:{...a,...o,deviceAttestation:xe({platform:i})}}',
    replacement:
      'function Ue(e,{buildFlavor:t=r.M.resolve(),env:n=h.default.env,platform:i=h.default.platform}={}){let a=i===`linux`?{...e,avatarOverlay:!0}:e,o=i===`win32`&&n.CODEX_ELECTRON_ENABLE_WINDOWS_COMPUTER_USE===`1`?{...a,computerUse:!0,computerUseNodeRepl:!0}:a,s=t===r.M.Dev?We(n):null;return s==null?{...o,deviceAttestation:xe({platform:i})}:{...o,...s,deviceAttestation:xe({platform:i})}}',
  },
  {
    target:
      'function He(e,{buildFlavor:t=n.I.resolve(),env:r=p.default.env,platform:i=p.default.platform}={}){let a=i===`darwin`&&!n.I.isInternal(t)&&e.computerUseNodeRepl!=null?{...e,computerUseNodeRepl:!1}:e,o=i===`win32`&&e.computerUse===!0?{...a,computerUseNodeRepl:!0}:a,s=i===`win32`&&r.CODEX_ELECTRON_ENABLE_WINDOWS_COMPUTER_USE===`1`?{...o,computerUse:!0,computerUseNodeRepl:!0}:o,c=t===n.I.Dev?Ue(r):null;return c==null?{...s,deviceAttestation:ye({platform:i})}:{...s,...c,deviceAttestation:ye({platform:i})}}',
    replacement:
      'function He(e,{buildFlavor:t=n.I.resolve(),env:r=p.default.env,platform:i=p.default.platform}={}){let a=i===`linux`?{...e,avatarOverlay:!0}:e,o=i===`darwin`&&!n.I.isInternal(t)&&a.computerUseNodeRepl!=null?{...a,computerUseNodeRepl:!1}:a,s=i===`win32`&&o.computerUse===!0?{...o,computerUseNodeRepl:!0}:o,c=i===`win32`&&r.CODEX_ELECTRON_ENABLE_WINDOWS_COMPUTER_USE===`1`?{...s,computerUse:!0,computerUseNodeRepl:!0}:s,l=t===n.I.Dev?Ue(r):null;return l==null?{...c,deviceAttestation:ye({platform:i})}:{...c,...l,deviceAttestation:ye({platform:i})}}',
  },
  {
    target:
      'function Ke(e,{buildFlavor:t=n.i.resolve(),env:r=m.default.env,platform:i=m.default.platform}={}){let a=i===`darwin`&&!n.i.isInternal(t)&&e.computerUseNodeRepl!=null?{...e,computerUseNodeRepl:!1}:e,o=i===`win32`&&e.computerUse===!0?{...a,computerUseNodeRepl:!0}:a,s=i===`win32`&&r.CODEX_ELECTRON_ENABLE_WINDOWS_COMPUTER_USE===`1`?{...o,computerUse:!0,computerUseNodeRepl:!0}:o,c=t===n.i.Dev?qe(r):null;return c==null?{...s,deviceAttestation:ye({platform:i})}:{...s,...c,deviceAttestation:ye({platform:i})}}',
    replacement:
      'function Ke(e,{buildFlavor:t=n.i.resolve(),env:r=m.default.env,platform:i=m.default.platform}={}){let a=i===`linux`?{...e,avatarOverlay:!0}:e,o=i===`darwin`&&!n.i.isInternal(t)&&a.computerUseNodeRepl!=null?{...a,computerUseNodeRepl:!1}:a,s=i===`win32`&&o.computerUse===!0?{...o,computerUseNodeRepl:!0}:o,c=i===`win32`&&r.CODEX_ELECTRON_ENABLE_WINDOWS_COMPUTER_USE===`1`?{...s,computerUse:!0,computerUseNodeRepl:!0}:s,l=t===n.i.Dev?qe(r):null;return l==null?{...c,deviceAttestation:ye({platform:i})}:{...c,...l,deviceAttestation:ye({platform:i})}}',
  },
  {
    target:
      'function Je(e,{buildFlavor:t=n.i.resolve(),env:r=p.default.env,platform:i=p.default.platform}={}){let a=i===`darwin`&&!n.i.isInternal(t)&&e.computerUseNodeRepl!=null?{...e,computerUseNodeRepl:!1}:e,o=i===`win32`&&e.computerUse===!0?{...a,computerUseNodeRepl:!0}:a,s=i===`win32`&&r.CODEX_ELECTRON_ENABLE_WINDOWS_COMPUTER_USE===`1`?{...o,computerUse:!0,computerUseNodeRepl:!0}:o,c=t===n.i.Dev?Ye(r):null;return c==null?{...s,deviceAttestation:ve({platform:i})}:{...s,...c,deviceAttestation:ve({platform:i})}}',
    replacement:
      'function Je(e,{buildFlavor:t=n.i.resolve(),env:r=p.default.env,platform:i=p.default.platform}={}){let a=i===`linux`?{...e,avatarOverlay:!0}:e,o=i===`darwin`&&!n.i.isInternal(t)&&a.computerUseNodeRepl!=null?{...a,computerUseNodeRepl:!1}:a,s=i===`win32`&&o.computerUse===!0?{...o,computerUseNodeRepl:!0}:o,c=i===`win32`&&r.CODEX_ELECTRON_ENABLE_WINDOWS_COMPUTER_USE===`1`?{...s,computerUse:!0,computerUseNodeRepl:!0}:s,l=t===n.i.Dev?Ye(r):null;return l==null?{...c,deviceAttestation:ve({platform:i})}:{...c,...l,deviceAttestation:ve({platform:i})}}',
  },
  {
    target:
      'function et(e,{buildFlavor:t=i.a.resolve(),env:n=y.default.env,platform:r=y.default.platform}={}){let a=r===`win32`&&e.computerUse===!0?{...e,computerUseNodeRepl:!0}:e,o=r===`win32`&&n.CODEX_ELECTRON_ENABLE_WINDOWS_COMPUTER_USE===`1`?{...a,computerUse:!0,computerUseNodeRepl:!0}:a,s=t===i.a.Dev?tt(n):null;return s==null?{...o,deviceAttestation:we({platform:r})}:{...o,...s,deviceAttestation:we({platform:r})}}',
    replacement:
      'function et(e,{buildFlavor:t=i.a.resolve(),env:n=y.default.env,platform:r=y.default.platform}={}){let a=r===`linux`?{...e,avatarOverlay:!0}:e,o=r===`win32`&&a.computerUse===!0?{...a,computerUseNodeRepl:!0}:a,s=r===`win32`&&n.CODEX_ELECTRON_ENABLE_WINDOWS_COMPUTER_USE===`1`?{...o,computerUse:!0,computerUseNodeRepl:!0}:o,c=t===i.a.Dev?tt(n):null;return c==null?{...s,deviceAttestation:we({platform:r})}:{...s,...c,deviceAttestation:we({platform:r})}}',
  },
  {
    target:
      'function Sr(e,{buildFlavor:t=a.a.resolve(),env:n=S.default.env,platform:r=S.default.platform}={}){let i=r===`win32`&&e.computerUse===!0?{...e,computerUseNodeRepl:!0}:e,o=r===`win32`&&n.CODEX_ELECTRON_ENABLE_WINDOWS_COMPUTER_USE===`1`?{...i,computerUse:!0,computerUseNodeRepl:!0}:i,s=t===a.a.Dev?Dee(n):null;return s==null?{...o,deviceAttestation:Qn({platform:r})}:{...o,...s,deviceAttestation:Qn({platform:r})}}',
    replacement:
      'function Sr(e,{buildFlavor:t=a.a.resolve(),env:n=S.default.env,platform:r=S.default.platform}={}){let i=r===`linux`?{...e,avatarOverlay:!0}:e,o=r===`win32`&&i.computerUse===!0?{...i,computerUseNodeRepl:!0}:i,s=r===`win32`&&n.CODEX_ELECTRON_ENABLE_WINDOWS_COMPUTER_USE===`1`?{...o,computerUse:!0,computerUseNodeRepl:!0}:o,c=t===a.a.Dev?Dee(n):null;return c==null?{...s,deviceAttestation:Qn({platform:r})}:{...s,...c,deviceAttestation:Qn({platform:r})}}',
  },
  {
    target:
      'function Er(e,{buildFlavor:t=a.a.resolve(),env:n=S.default.env,platform:r=S.default.platform}={}){let i=r===`win32`&&e.computerUse===!0?{...e,computerUseNodeRepl:!0}:e,o=r===`win32`&&n.CODEX_ELECTRON_ENABLE_WINDOWS_COMPUTER_USE===`1`?{...i,computerUse:!0,computerUseNodeRepl:!0}:i,s=t===a.a.Dev?xr(n):null;return s==null?{...o,deviceAttestation:Qn({platform:r})}:{...o,...s,deviceAttestation:Qn({platform:r})}}',
    replacement:
      'function Er(e,{buildFlavor:t=a.a.resolve(),env:n=S.default.env,platform:r=S.default.platform}={}){let c=r===`linux`?{...e,avatarOverlay:!0}:e,i=r===`win32`&&c.computerUse===!0?{...c,computerUseNodeRepl:!0}:c,o=r===`win32`&&n.CODEX_ELECTRON_ENABLE_WINDOWS_COMPUTER_USE===`1`?{...i,computerUse:!0,computerUseNodeRepl:!0}:i,s=t===a.a.Dev?xr(n):null;return s==null?{...o,deviceAttestation:Qn({platform:r})}:{...o,...s,deviceAttestation:Qn({platform:r})}}',
  },
  {
    target:
      'function Er(e,{buildFlavor:t=a.a.resolve(),env:n=S.default.env,platform:r=S.default.platform}={}){let i=r===`win32`&&e.computerUse===!0?{...e,computerUseNodeRepl:!0}:e,o=r===`win32`&&n.CODEX_ELECTRON_ENABLE_WINDOWS_COMPUTER_USE===`1`?{...i,computerUse:!0,computerUseNodeRepl:!0}:i,s=t===a.a.Dev?Dr(n):null;return s==null?{...o,deviceAttestation:rr({platform:r})}:{...o,...s,deviceAttestation:rr({platform:r})}}',
    replacement:
      'function Er(e,{buildFlavor:t=a.a.resolve(),env:n=S.default.env,platform:r=S.default.platform}={}){let c=r===`linux`?{...e,avatarOverlay:!0}:e,i=r===`win32`&&c.computerUse===!0?{...c,computerUseNodeRepl:!0}:c,o=r===`win32`&&n.CODEX_ELECTRON_ENABLE_WINDOWS_COMPUTER_USE===`1`?{...i,computerUse:!0,computerUseNodeRepl:!0}:i,s=t===a.a.Dev?Dr(n):null;return s==null?{...o,deviceAttestation:rr({platform:r})}:{...o,...s,deviceAttestation:rr({platform:r})}}',
  },
];
const mainLinuxAvatarOverlayAvailabilityPatchMarker =
  'n===`linux`?{...e,avatarOverlay:!0}:e';
const avatarOverlayDirectMascotDragPatchAlternatives = [
  {
    target:
      'Wt=e=>{e.button!==0||!(e.target instanceof Element)||e.target.closest(`.no-drag`)!=null||(e.preventDefault(),e.currentTarget.setPointerCapture?.(e.pointerId),lt.current={startedOnMascot:e.target.closest(`[data-avatar-mascot="true"]`)!=null,hasMoved:!1,pointerId:e.pointerId,samples:[tn(e)],screenX:e.screenX,screenY:e.screenY,usesOrbPhysics:le},i.dispatchMessage(`avatar-overlay-drag-start`,{pointerScreenX:e.screenX,pointerScreenY:e.screenY,pointerWindowX:e.clientX,pointerWindowY:e.clientY,usesOrbPhysics:le}),Se(!0),pe(null))}',
    replacement:
      'Wt=e=>{if(e.button!==0||!(e.target instanceof Element)||e.target.closest(`.no-drag`)!=null)return;if(e.target.closest(`[data-avatar-mascot="true"]`)==null)return;e.preventDefault(),e.currentTarget.setPointerCapture?.(e.pointerId),lt.current={startedOnMascot:!0,hasMoved:!1,pointerId:e.pointerId,samples:[tn(e)],screenX:e.screenX,screenY:e.screenY,usesOrbPhysics:le},i.dispatchMessage(`avatar-overlay-drag-start`,{pointerScreenX:e.screenX,pointerScreenY:e.screenY,pointerWindowX:e.clientX,pointerWindowY:e.clientY,usesOrbPhysics:le}),Se(!0),pe(null)}',
  },
  {
    target:
      't[52]===ue?$t=t[53]:($t=e=>{e.button!==0||!(e.target instanceof Element)||e.target.closest(`.no-drag, [data-avatar-overlay-scroll-direction]`)!=null||(e.preventDefault(),e.currentTarget.setPointerCapture?.(e.pointerId),lt.current={startedOnMascot:e.target.closest(`[data-avatar-mascot="true"]`)!=null,hasMoved:!1,pointerId:e.pointerId,samples:[xn(e)],screenX:e.screenX,screenY:e.screenY,usesOrbPhysics:ue},U.dispatchMessage(`avatar-overlay-drag-start`,{pointerScreenX:e.screenX,pointerScreenY:e.screenY,pointerWindowX:e.clientX,pointerWindowY:e.clientY,usesOrbPhysics:ue}),ye(!0),he(null))},t[52]=ue,t[53]=$t);',
    replacement:
      't[52]===ue?$t=t[53]:($t=e=>{if(e.button!==0||!(e.target instanceof Element)||e.target.closest(`.no-drag, [data-avatar-overlay-scroll-direction]`)!=null)return;if(e.target.closest(`[data-avatar-mascot="true"]`)==null)return;e.preventDefault(),e.currentTarget.setPointerCapture?.(e.pointerId),lt.current={startedOnMascot:!0,hasMoved:!1,pointerId:e.pointerId,samples:[xn(e)],screenX:e.screenX,screenY:e.screenY,usesOrbPhysics:ue},U.dispatchMessage(`avatar-overlay-drag-start`,{pointerScreenX:e.screenX,pointerScreenY:e.screenY,pointerWindowX:e.clientX,pointerWindowY:e.clientY,usesOrbPhysics:ue}),ye(!0),he(null)},t[52]=ue,t[53]=$t);',
  },
  {
    target: 'Ue=e=>{e.button!==0||!(e.target instanceof Element)||e.target.closest(`.no-drag`)!=null||(e.preventDefault(),e.currentTarget.setPointerCapture?.(e.pointerId),we.current={startedOnMascot:e.target.closest(`[data-avatar-mascot="true"]`)!=null,hasMoved:!1,pointerId:e.pointerId,samples:[xt(e)],screenX:e.screenX,screenY:e.screenY,usesOrbPhysics:C},G.dispatchMessage(`avatar-overlay-drag-start`,{pointerScreenX:e.screenX,pointerScreenY:e.screenY,pointerWindowX:e.clientX,pointerWindowY:e.clientY,usesOrbPhysics:C}),M(!0),O(null))}',
    replacement: 'Ue=e=>{if(e.button!==0||!(e.target instanceof Element)||e.target.closest(`.no-drag`)!=null)return;if(e.target.closest(`[data-avatar-mascot="true"]`)==null)return;e.preventDefault(),e.currentTarget.setPointerCapture?.(e.pointerId),we.current={startedOnMascot:!0,hasMoved:!1,pointerId:e.pointerId,samples:[xt(e)],screenX:e.screenX,screenY:e.screenY,usesOrbPhysics:C},G.dispatchMessage(`avatar-overlay-drag-start`,{pointerScreenX:e.screenX,pointerScreenY:e.screenY,pointerWindowX:e.clientX,pointerWindowY:e.clientY,usesOrbPhysics:C}),M(!0),O(null))}',
  },
  {
    target: 'Ge=e=>{e.button!==0||!(e.target instanceof Element)||e.target.closest(`.no-drag`)!=null||(e.preventDefault(),e.currentTarget.setPointerCapture?.(e.pointerId),Se.current={startedOnMascot:e.target.closest(`[data-avatar-mascot="true"]`)!=null,hasMoved:!1,pointerId:e.pointerId,samples:[xt(e)],screenX:e.screenX,screenY:e.screenY,usesOrbPhysics:ee},k.dispatchMessage(`avatar-overlay-drag-start`,{pointerScreenX:e.screenX,pointerScreenY:e.screenY,pointerWindowX:e.clientX,pointerWindowY:e.clientY,usesOrbPhysics:ee}),A(!0),T(null))}',
    replacement: 'Ge=e=>{if(e.button!==0||!(e.target instanceof Element)||e.target.closest(`.no-drag`)!=null)return;if(e.target.closest(`[data-avatar-mascot="true"]`)==null)return;e.preventDefault(),e.currentTarget.setPointerCapture?.(e.pointerId),Se.current={startedOnMascot:!0,hasMoved:!1,pointerId:e.pointerId,samples:[xt(e)],screenX:e.screenX,screenY:e.screenY,usesOrbPhysics:ee},k.dispatchMessage(`avatar-overlay-drag-start`,{pointerScreenX:e.screenX,pointerScreenY:e.screenY,pointerWindowX:e.clientX,pointerWindowY:e.clientY,usesOrbPhysics:ee}),A(!0),T(null)}',
  },


  {
    target:
      'We=e=>{e.button!==0||!(e.target instanceof Element)||e.target.closest(`.no-drag`)!=null||(e.preventDefault(),e.currentTarget.setPointerCapture?.(e.pointerId),we.current={startedOnMascot:e.target.closest(`[data-avatar-mascot="true"]`)!=null,hasMoved:!1,pointerId:e.pointerId,samples:[xt(e)],screenX:e.screenX,screenY:e.screenY,usesOrbPhysics:b},I.dispatchMessage(`avatar-overlay-drag-start`,{pointerScreenX:e.screenX,pointerScreenY:e.screenY,pointerWindowX:e.clientX,pointerWindowY:e.clientY,usesOrbPhysics:b}),re(!0),C(null))}',
    replacement:
      'We=e=>{if(e.button!==0||!(e.target instanceof Element)||e.target.closest(`.no-drag`)!=null)return;if(e.target.closest(`[data-avatar-mascot="true"]`)==null)return;e.preventDefault(),e.currentTarget.setPointerCapture?.(e.pointerId),we.current={startedOnMascot:!0,hasMoved:!1,pointerId:e.pointerId,samples:[xt(e)],screenX:e.screenX,screenY:e.screenY,usesOrbPhysics:b},I.dispatchMessage(`avatar-overlay-drag-start`,{pointerScreenX:e.screenX,pointerScreenY:e.screenY,pointerWindowX:e.clientX,pointerWindowY:e.clientY,usesOrbPhysics:b}),re(!0),C(null)}',
  },
  {
    target:
      'We=e=>{e.button!==0||!(e.target instanceof Element)||e.target.closest(`.no-drag`)!=null||(e.preventDefault(),e.currentTarget.setPointerCapture?.(e.pointerId),we.current={startedOnMascot:e.target.closest(`[data-avatar-mascot="true"]`)!=null,hasMoved:!1,pointerId:e.pointerId,samples:[xt(e)],screenX:e.screenX,screenY:e.screenY,usesOrbPhysics:b},I.dispatchMessage(`avatar-overlay-drag-start`,{pointerScreenX:e.screenX,pointerScreenY:e.screenY,pointerWindowX:e.clientX,pointerWindowY:e.clientY,usesOrbPhysics:b}),M(!0),O(null))}',
    replacement:
      'We=e=>{if(e.button!==0||!(e.target instanceof Element)||e.target.closest(`.no-drag`)!=null)return;if(e.target.closest(`[data-avatar-mascot="true"]`)==null)return;e.preventDefault(),e.currentTarget.setPointerCapture?.(e.pointerId),we.current={startedOnMascot:!0,hasMoved:!1,pointerId:e.pointerId,samples:[xt(e)],screenX:e.screenX,screenY:e.screenY,usesOrbPhysics:b},I.dispatchMessage(`avatar-overlay-drag-start`,{pointerScreenX:e.screenX,pointerScreenY:e.screenY,pointerWindowX:e.clientX,pointerWindowY:e.clientY,usesOrbPhysics:b}),M(!0),O(null)}',
  },
  {
    target:
      'Ue=e=>{e.button!==0||!(e.target instanceof Element)||e.target.closest(`.no-drag`)!=null||(e.preventDefault(),e.currentTarget.setPointerCapture?.(e.pointerId),we.current={startedOnMascot:e.target.closest(`[data-avatar-mascot="true"]`)!=null,hasMoved:!1,pointerId:e.pointerId,samples:[bt(e)],screenX:e.screenX,screenY:e.screenY,usesOrbPhysics:b},S.dispatchMessage(`avatar-overlay-drag-start`,{pointerScreenX:e.screenX,pointerScreenY:e.screenY,pointerWindowX:e.clientX,pointerWindowY:e.clientY,usesOrbPhysics:b}),M(!0),O(null))}',
    replacement:
      'Ue=e=>{if(e.button!==0||!(e.target instanceof Element)||e.target.closest(`.no-drag`)!=null)return;if(e.target.closest(`[data-avatar-mascot="true"]`)==null)return;e.preventDefault(),e.currentTarget.setPointerCapture?.(e.pointerId),we.current={startedOnMascot:!0,hasMoved:!1,pointerId:e.pointerId,samples:[bt(e)],screenX:e.screenX,screenY:e.screenY,usesOrbPhysics:b},S.dispatchMessage(`avatar-overlay-drag-start`,{pointerScreenX:e.screenX,pointerScreenY:e.screenY,pointerWindowX:e.clientX,pointerWindowY:e.clientY,usesOrbPhysics:b}),M(!0),O(null)}',
  },
  {
    target:
      'Ue=e=>{e.button!==0||!(e.target instanceof Element)||e.target.closest(`.no-drag`)!=null||(e.preventDefault(),e.currentTarget.setPointerCapture?.(e.pointerId),Se.current={startedOnMascot:e.target.closest(`[data-avatar-mascot="true"]`)!=null,hasMoved:!1,pointerId:e.pointerId,samples:[bt(e)],screenX:e.screenX,screenY:e.screenY,usesOrbPhysics:b},E.dispatchMessage(`avatar-overlay-drag-start`,{pointerScreenX:e.screenX,pointerScreenY:e.screenY,pointerWindowX:e.clientX,pointerWindowY:e.clientY,usesOrbPhysics:b}),O(!0),T(null))}',
    replacement:
      'Ue=e=>{if(e.button!==0||!(e.target instanceof Element)||e.target.closest(`.no-drag`)!=null)return;if(e.target.closest(`[data-avatar-mascot="true"]`)==null)return;e.preventDefault(),e.currentTarget.setPointerCapture?.(e.pointerId),Se.current={startedOnMascot:!0,hasMoved:!1,pointerId:e.pointerId,samples:[bt(e)],screenX:e.screenX,screenY:e.screenY,usesOrbPhysics:b},E.dispatchMessage(`avatar-overlay-drag-start`,{pointerScreenX:e.screenX,pointerScreenY:e.screenY,pointerWindowX:e.clientX,pointerWindowY:e.clientY,usesOrbPhysics:b}),O(!0),T(null)}',
  },
  {
    target:
      'ft=e=>{e.button!==0||!(e.target instanceof Element)||e.target.closest(`.no-drag`)!=null||(e.preventDefault(),e.currentTarget.setPointerCapture?.(e.pointerId),Se.current={startedOnMascot:e.target.closest(`[data-avatar-mascot="true"]`)!=null,hasMoved:!1,pointerId:e.pointerId,samples:[Be(e)],screenX:e.screenX,screenY:e.screenY},h.dispatchMessage(`avatar-overlay-drag-start`,{pointerWindowX:e.clientX,pointerWindowY:e.clientY}),j(!0),ie(null))}',
    replacement:
      'ft=e=>{if(e.button!==0||!(e.target instanceof Element)||e.target.closest(`.no-drag`)!=null)return;if(e.target.closest(`[data-avatar-mascot="true"]`)==null)return;e.preventDefault(),e.currentTarget.setPointerCapture?.(e.pointerId),Se.current={startedOnMascot:!0,hasMoved:!1,pointerId:e.pointerId,samples:[Be(e)],screenX:e.screenX,screenY:e.screenY},h.dispatchMessage(`avatar-overlay-drag-start`,{pointerWindowX:e.clientX,pointerWindowY:e.clientY}),j(!0),ie(null)}',
  },
  {
    target:
      'J=e=>{e.button!==0||!(e.target instanceof Element)||e.target.closest(`.no-drag`)!=null||(e.preventDefault(),e.currentTarget.setPointerCapture?.(e.pointerId),P.current={startedOnMascot:e.target.closest(`[data-avatar-mascot="true"]`)!=null,hasMoved:!1,pointerId:e.pointerId,samples:[V(e)],screenX:e.screenX,screenY:e.screenY},f.dispatchMessage(`avatar-overlay-drag-start`,{pointerWindowX:e.clientX,pointerWindowY:e.clientY}),h(!0),s(null))}',
    replacement:
      'J=e=>{if(e.button!==0||!(e.target instanceof Element)||e.target.closest(`.no-drag`)!=null)return;if(e.target.closest(`[data-avatar-mascot="true"]`)==null)return;e.preventDefault(),e.currentTarget.setPointerCapture?.(e.pointerId),P.current={startedOnMascot:!0,hasMoved:!1,pointerId:e.pointerId,samples:[V(e)],screenX:e.screenX,screenY:e.screenY},f.dispatchMessage(`avatar-overlay-drag-start`,{pointerWindowX:e.clientX,pointerWindowY:e.clientY}),h(!0),s(null)}',
  },
  {
    target:
      'Ye=e=>{e.button!==0||!(e.target instanceof Element)||e.target.closest(`.no-drag`)!=null||(e.preventDefault(),e.currentTarget.setPointerCapture?.(e.pointerId),W.current={startedOnMascot:e.target.closest(`[data-avatar-mascot="true"]`)!=null,hasMoved:!1,pointerId:e.pointerId,samples:[ye(e)],screenX:e.screenX,screenY:e.screenY},S.dispatchMessage(`avatar-overlay-drag-start`,{pointerWindowX:e.clientX,pointerWindowY:e.clientY}),D(!0),x(null))}',
    replacement:
      'Ye=e=>{if(e.button!==0||!(e.target instanceof Element)||e.target.closest(`.no-drag`)!=null)return;if(e.target.closest(`[data-avatar-mascot="true"]`)==null)return;e.preventDefault(),e.currentTarget.setPointerCapture?.(e.pointerId),W.current={startedOnMascot:!0,hasMoved:!1,pointerId:e.pointerId,samples:[ye(e)],screenX:e.screenX,screenY:e.screenY},S.dispatchMessage(`avatar-overlay-drag-start`,{pointerWindowX:e.clientX,pointerWindowY:e.clientY}),D(!0),x(null)}',
  },
  {
    target:
      'et=e=>{e.button!==0||!(e.target instanceof Element)||e.target.closest(`.no-drag`)!=null||(e.preventDefault(),e.currentTarget.setPointerCapture?.(e.pointerId),Ce.current={startedOnMascot:e.target.closest(`[data-avatar-mascot="true"]`)!=null,hasMoved:!1,pointerId:e.pointerId,samples:[be(e)],screenX:e.screenX,screenY:e.screenY},C.dispatchMessage(`avatar-overlay-drag-start`,{pointerWindowX:e.clientX,pointerWindowY:e.clientY}),O(!0),b(null))}',
    replacement:
      'et=e=>{if(e.button!==0||!(e.target instanceof Element)||e.target.closest(`.no-drag`)!=null)return;if(e.target.closest(`[data-avatar-mascot="true"]`)==null)return;e.preventDefault(),e.currentTarget.setPointerCapture?.(e.pointerId),Ce.current={startedOnMascot:!0,hasMoved:!1,pointerId:e.pointerId,samples:[be(e)],screenX:e.screenX,screenY:e.screenY},C.dispatchMessage(`avatar-overlay-drag-start`,{pointerWindowX:e.clientX,pointerWindowY:e.clientY}),O(!0),b(null)}',
  },
  {
    target:
      'ot=e=>{e.button!==0||!(e.target instanceof Element)||e.target.closest(`.no-drag`)!=null||(e.preventDefault(),e.currentTarget.setPointerCapture?.(e.pointerId),ke.current={startedOnMascot:e.target.closest(`[data-avatar-mascot="true"]`)!=null,hasMoved:!1,pointerId:e.pointerId,samples:[U(e)],screenX:e.screenX,screenY:e.screenY},y.dispatchMessage(`avatar-overlay-drag-start`,{pointerWindowX:e.clientX,pointerWindowY:e.clientY}),A(!0),E(null))}',
    replacement:
      'ot=e=>{if(e.button!==0||!(e.target instanceof Element)||e.target.closest(`.no-drag`)!=null)return;if(e.target.closest(`[data-avatar-mascot="true"]`)==null)return;e.preventDefault(),e.currentTarget.setPointerCapture?.(e.pointerId),ke.current={startedOnMascot:!0,hasMoved:!1,pointerId:e.pointerId,samples:[U(e)],screenX:e.screenX,screenY:e.screenY},y.dispatchMessage(`avatar-overlay-drag-start`,{pointerWindowX:e.clientX,pointerWindowY:e.clientY}),A(!0),E(null)}',
  },
  {
    target:
      'Ct=e=>{e.button!==0||!(e.target instanceof Element)||e.target.closest(`.no-drag`)!=null||(e.preventDefault(),e.currentTarget.setPointerCapture?.(e.pointerId),Ve.current={startedOnMascot:e.target.closest(`[data-avatar-mascot="true"]`)!=null,hasMoved:!1,pointerId:e.pointerId,samples:[De(e)],screenX:e.screenX,screenY:e.screenY},m.dispatchMessage(`avatar-overlay-drag-start`,{pointerScreenX:e.screenX,pointerScreenY:e.screenY,pointerWindowX:e.clientX,pointerWindowY:e.clientY}),oe(!0),D(null))}',
    replacement:
      'Ct=e=>{if(e.button!==0||!(e.target instanceof Element)||e.target.closest(`.no-drag`)!=null)return;if(e.target.closest(`[data-avatar-mascot="true"]`)==null)return;e.preventDefault(),e.currentTarget.setPointerCapture?.(e.pointerId),Ve.current={startedOnMascot:!0,hasMoved:!1,pointerId:e.pointerId,samples:[De(e)],screenX:e.screenX,screenY:e.screenY},m.dispatchMessage(`avatar-overlay-drag-start`,{pointerScreenX:e.screenX,pointerScreenY:e.screenY,pointerWindowX:e.clientX,pointerWindowY:e.clientY}),oe(!0),D(null)}',
  },
  {
    target:
      'Be=e=>{e.button!==0||!(e.target instanceof Element)||e.target.closest(`.no-drag`)!=null||(e.preventDefault(),e.currentTarget.setPointerCapture?.(e.pointerId),xe.current={startedOnMascot:e.target.closest(`[data-avatar-mascot="true"]`)!=null,hasMoved:!1,pointerId:e.pointerId,samples:[ot(e)],screenX:e.screenX,screenY:e.screenY,usesOrbPhysics:g},a.dispatchMessage(`avatar-overlay-drag-start`,{pointerScreenX:e.screenX,pointerScreenY:e.screenY,pointerWindowX:e.clientX,pointerWindowY:e.clientY,usesOrbPhysics:g}),ee(!0),S(null))}',
    replacement:
      'Be=e=>{if(e.button!==0||!(e.target instanceof Element)||e.target.closest(`.no-drag`)!=null)return;if(e.target.closest(`[data-avatar-mascot="true"]`)==null)return;e.preventDefault(),e.currentTarget.setPointerCapture?.(e.pointerId),xe.current={startedOnMascot:!0,hasMoved:!1,pointerId:e.pointerId,samples:[ot(e)],screenX:e.screenX,screenY:e.screenY,usesOrbPhysics:g},a.dispatchMessage(`avatar-overlay-drag-start`,{pointerScreenX:e.screenX,pointerScreenY:e.screenY,pointerWindowX:e.clientX,pointerWindowY:e.clientY,usesOrbPhysics:g}),ee(!0),S(null)}',
  },
  {
    target:
      'Be=e=>{e.button!==0||!(e.target instanceof Element)||e.target.closest(`.no-drag`)!=null||(e.preventDefault(),e.currentTarget.setPointerCapture?.(e.pointerId),xe.current={startedOnMascot:e.target.closest(`[data-avatar-mascot="true"]`)!=null,hasMoved:!1,pointerId:e.pointerId,samples:[st(e)],screenX:e.screenX,screenY:e.screenY,usesOrbPhysics:h},a.dispatchMessage(`avatar-overlay-drag-start`,{pointerScreenX:e.screenX,pointerScreenY:e.screenY,pointerWindowX:e.clientX,pointerWindowY:e.clientY,usesOrbPhysics:h}),M(!0),ne(null))}',
    replacement:
      'Be=e=>{if(e.button!==0||!(e.target instanceof Element)||e.target.closest(`.no-drag`)!=null)return;if(e.target.closest(`[data-avatar-mascot="true"]`)==null)return;e.preventDefault(),e.currentTarget.setPointerCapture?.(e.pointerId),xe.current={startedOnMascot:!0,hasMoved:!1,pointerId:e.pointerId,samples:[st(e)],screenX:e.screenX,screenY:e.screenY,usesOrbPhysics:h},a.dispatchMessage(`avatar-overlay-drag-start`,{pointerScreenX:e.screenX,pointerScreenY:e.screenY,pointerWindowX:e.clientX,pointerWindowY:e.clientY,usesOrbPhysics:h}),M(!0),ne(null)}',
  },
  {
    target:
      'ke=e=>{e.button!==0||!(e.target instanceof Element)||e.target.closest(`.no-drag`)!=null||(e.preventDefault(),e.currentTarget.setPointerCapture?.(e.pointerId),U.current={startedOnMascot:e.target.closest(`[data-avatar-mascot="true"]`)!=null,hasMoved:!1,pointerId:e.pointerId,samples:[bt(e)],screenX:e.screenX,screenY:e.screenY,usesOrbPhysics:_},m.dispatchMessage(`avatar-overlay-drag-start`,{pointerScreenX:e.screenX,pointerScreenY:e.screenY,pointerWindowX:e.clientX,pointerWindowY:e.clientY,usesOrbPhysics:_}),T(!0),te(null))}',
    replacement:
      'ke=e=>{if(e.button!==0||!(e.target instanceof Element)||e.target.closest(`.no-drag`)!=null)return;if(e.target.closest(`[data-avatar-mascot="true"]`)==null)return;e.preventDefault(),e.currentTarget.setPointerCapture?.(e.pointerId),U.current={startedOnMascot:!0,hasMoved:!1,pointerId:e.pointerId,samples:[bt(e)],screenX:e.screenX,screenY:e.screenY,usesOrbPhysics:_},m.dispatchMessage(`avatar-overlay-drag-start`,{pointerScreenX:e.screenX,pointerScreenY:e.screenY,pointerWindowX:e.clientX,pointerWindowY:e.clientY,usesOrbPhysics:_}),T(!0),te(null)}',
  },
  {
    target:
      'Bt=e=>{e.button!==0||!(e.target instanceof Element)||e.target.closest(`.no-drag`)!=null||(e.preventDefault(),e.currentTarget.setPointerCapture?.(e.pointerId),at.current={startedOnMascot:e.target.closest(`[data-avatar-mascot="true"]`)!=null,hasMoved:!1,pointerId:e.pointerId,samples:[Qt(e)],screenX:e.screenX,screenY:e.screenY,usesOrbPhysics:oe},De.dispatchMessage(`avatar-overlay-drag-start`,{pointerScreenX:e.screenX,pointerScreenY:e.screenY,pointerWindowX:e.clientX,pointerWindowY:e.clientY,usesOrbPhysics:oe}),me(!0),le(null))}',
    replacement:
      'Bt=e=>{if(e.button!==0||!(e.target instanceof Element)||e.target.closest(`.no-drag`)!=null)return;if(e.target.closest(`[data-avatar-mascot="true"]`)==null)return;e.preventDefault(),e.currentTarget.setPointerCapture?.(e.pointerId),at.current={startedOnMascot:!0,hasMoved:!1,pointerId:e.pointerId,samples:[Qt(e)],screenX:e.screenX,screenY:e.screenY,usesOrbPhysics:oe},De.dispatchMessage(`avatar-overlay-drag-start`,{pointerScreenX:e.screenX,pointerScreenY:e.screenY,pointerWindowX:e.clientX,pointerWindowY:e.clientY,usesOrbPhysics:oe}),me(!0),le(null)}',
  },
  {
    target:
      'Bt=e=>{e.button!==0||!(e.target instanceof Element)||e.target.closest(`.no-drag`)!=null||(e.preventDefault(),e.currentTarget.setPointerCapture?.(e.pointerId),it.current={startedOnMascot:e.target.closest(`[data-avatar-mascot="true"]`)!=null,hasMoved:!1,pointerId:e.pointerId,samples:[Qt(e)],screenX:e.screenX,screenY:e.screenY,usesOrbPhysics:se},W.dispatchMessage(`avatar-overlay-drag-start`,{pointerScreenX:e.screenX,pointerScreenY:e.screenY,pointerWindowX:e.clientX,pointerWindowY:e.clientY,usesOrbPhysics:se}),H(!0),de(null))}',
    replacement:
      'Bt=e=>{if(e.button!==0||!(e.target instanceof Element)||e.target.closest(`.no-drag`)!=null)return;if(e.target.closest(`[data-avatar-mascot="true"]`)==null)return;e.preventDefault(),e.currentTarget.setPointerCapture?.(e.pointerId),it.current={startedOnMascot:!0,hasMoved:!1,pointerId:e.pointerId,samples:[Qt(e)],screenX:e.screenX,screenY:e.screenY,usesOrbPhysics:se},W.dispatchMessage(`avatar-overlay-drag-start`,{pointerScreenX:e.screenX,pointerScreenY:e.screenY,pointerWindowX:e.clientX,pointerWindowY:e.clientY,usesOrbPhysics:se}),H(!0),de(null)}',
  },
  {
    target:
      'Wt=e=>{e.button!==0||!(e.target instanceof Element)||e.target.closest(`.no-drag`)!=null||(e.preventDefault(),e.currentTarget.setPointerCapture?.(e.pointerId),ot.current={startedOnMascot:e.target.closest(`[data-avatar-mascot="true"]`)!=null,hasMoved:!1,pointerId:e.pointerId,samples:[tn(e)],screenX:e.screenX,screenY:e.screenY,usesOrbPhysics:se},B.dispatchMessage(`avatar-overlay-drag-start`,{pointerScreenX:e.screenX,pointerScreenY:e.screenY,pointerWindowX:e.clientX,pointerWindowY:e.clientY,usesOrbPhysics:se}),ge(!0),fe(null))}',
    replacement:
      'Wt=e=>{if(e.button!==0||!(e.target instanceof Element)||e.target.closest(`.no-drag`)!=null)return;if(e.target.closest(`[data-avatar-mascot="true"]`)==null)return;e.preventDefault(),e.currentTarget.setPointerCapture?.(e.pointerId),ot.current={startedOnMascot:!0,hasMoved:!1,pointerId:e.pointerId,samples:[tn(e)],screenX:e.screenX,screenY:e.screenY,usesOrbPhysics:se},B.dispatchMessage(`avatar-overlay-drag-start`,{pointerScreenX:e.screenX,pointerScreenY:e.screenY,pointerWindowX:e.clientX,pointerWindowY:e.clientY,usesOrbPhysics:se}),ge(!0),fe(null)}',
  },
];
const avatarOverlayDirectMascotDragPatchMarker =
  'if(e.target.closest(`[data-avatar-mascot="true"]`)==null)return';
const avatarOverlayLargeActivityTrayLayoutPatchTarget =
  'fn={mascot:{left:244,top:191,width:112,height:121},placement:`top-end`,tray:{left:80,top:56,width:276,height:131},viewport:{width:356,height:320}}';
const avatarOverlayLargeActivityTrayLayoutPatchReplacement =
  'fn={mascot:{left:244,top:191,width:112,height:121},placement:`top-end`,tray:{left:16,top:24,width:560,height:320},viewport:{width:600,height:460}}';
const avatarOverlayLargeActivityTrayLayoutPatchMarker =
  'tray:{left:16,top:24,width:560,height:320},viewport:{width:600,height:460}';
const avatarOverlayLargeActivityTrayLayoutPatchAlternatives = [
  {
    target:
      'ni={mascot:{left:216,top:191,width:bn,height:121},placement:`top-end`,tray:{left:11,top:56,width:345,height:131},viewport:{width:356,height:320}}',
    replacement:
      'ni={mascot:{left:216,top:191,width:bn,height:121},placement:`top-end`,tray:{left:16,top:24,width:560,height:320},viewport:{width:600,height:460}}',
  },
  {
    target:
      '_i={mascot:{left:216,top:191,width:Nn,height:121},placement:`top-end`,tray:{left:11,top:56,width:345,height:131},viewport:{width:356,height:320}}',
    replacement:
      '_i={mascot:{left:216,top:191,width:Nn,height:121},placement:`top-end`,tray:{left:16,top:24,width:560,height:320},viewport:{width:600,height:460}}',
  },
  {
    target:
      'Zr={mascot:{left:216,top:191,width:hn,height:121},placement:`top-end`,tray:{left:11,top:56,width:345,height:131},viewport:{width:356,height:320}}',
    replacement:
      'Zr={mascot:{left:216,top:191,width:hn,height:121},placement:`top-end`,tray:{left:16,top:24,width:560,height:320},viewport:{width:600,height:460}}',
  },
  {
    target:
      'Pn={mascot:{left:216,top:191,width:Fe,height:121},placement:`top-end`,tray:{left:11,top:56,width:345,height:131},viewport:{width:356,height:320}}',
    replacement:
      'Pn={mascot:{left:216,top:191,width:Fe,height:121},placement:`top-end`,tray:{left:16,top:24,width:560,height:320},viewport:{width:600,height:460}}',
  },
  {
    target: 'Pn={mascot:{left:216,top:191,width:et,height:121},placement:`top-end`,tray:{left:11,top:56,width:345,height:131},viewport:{width:356,height:320}}',
    replacement: 'Pn={mascot:{left:216,top:191,width:et,height:121},placement:`top-end`,tray:{left:16,top:24,width:560,height:320},viewport:{width:600,height:460}}',
  },
  {
    target: 'Pn={mascot:{left:216,top:191,width:it,height:121},placement:`top-end`,tray:{left:11,top:56,width:345,height:131},viewport:{width:356,height:320}}',
    replacement: 'Pn={mascot:{left:216,top:191,width:it,height:121},placement:`top-end`,tray:{left:16,top:24,width:560,height:320},viewport:{width:600,height:460}}',
  },

  {
    target:
      'Pn={mascot:{left:216,top:191,width:nt,height:121},placement:`top-end`,tray:{left:11,top:56,width:345,height:131},viewport:{width:356,height:320}}',
    replacement:
      'Pn={mascot:{left:216,top:191,width:nt,height:121},placement:`top-end`,tray:{left:16,top:24,width:560,height:320},viewport:{width:600,height:460}}',
  },
  {
    target:
      'Pn={mascot:{left:216,top:191,width:tt,height:121},placement:`top-end`,tray:{left:11,top:56,width:345,height:131},viewport:{width:356,height:320}}',
    replacement:
      'Pn={mascot:{left:216,top:191,width:tt,height:121},placement:`top-end`,tray:{left:16,top:24,width:560,height:320},viewport:{width:600,height:460}}',
  },
  {
    target:
      'Nt={mascot:{left:244,top:191,width:112,height:121},placement:`top-end`,tray:{left:80,top:56,width:276,height:131},viewport:{width:356,height:320}}',
    replacement:
      'Nt={mascot:{left:244,top:191,width:112,height:121},placement:`top-end`,tray:{left:16,top:24,width:560,height:320},viewport:{width:600,height:460}}',
  },
  {
    target: avatarOverlayLargeActivityTrayLayoutPatchTarget,
    replacement: avatarOverlayLargeActivityTrayLayoutPatchReplacement,
  },
  {
    target:
      'gn={mascot:{left:244,top:191,width:112,height:121},placement:`top-end`,tray:{left:80,top:56,width:276,height:131},viewport:{width:356,height:320}}',
    replacement:
      'gn={mascot:{left:244,top:191,width:112,height:121},placement:`top-end`,tray:{left:16,top:24,width:560,height:320},viewport:{width:600,height:460}}',
  },
  {
    target:
      'At={mascot:{left:244,top:191,width:112,height:121},placement:`top-end`,tray:{left:80,top:56,width:276,height:131},viewport:{width:356,height:320}}',
    replacement:
      'At={mascot:{left:244,top:191,width:112,height:121},placement:`top-end`,tray:{left:16,top:24,width:560,height:320},viewport:{width:600,height:460}}',
  },
  {
    target:
      'En={mascot:{left:244,top:191,width:112,height:121},placement:`top-end`,tray:{left:80,top:56,width:276,height:131},viewport:{width:356,height:320}}',
    replacement:
      'En={mascot:{left:244,top:191,width:112,height:121},placement:`top-end`,tray:{left:16,top:24,width:560,height:320},viewport:{width:600,height:460}}',
  },
];
const avatarOverlayLargeActivityTrayPaddingPatchTarget =
  '`block w-full min-w-0 py-1.5 pr-3 text-left focus-visible:outline-token-focus focus-visible:outline focus-visible:outline-offset-[-2px]`';
const avatarOverlayLargeActivityTrayPaddingPatchReplacement =
  '`block w-full min-w-0 py-3 pr-5 text-left focus-visible:outline-token-focus focus-visible:outline focus-visible:outline-offset-[-2px]`';
const avatarOverlayLargeActivityTrayPaddingPatchMarker =
  'px-5 py-3 forced-colors:bg-[Canvas]';
const avatarOverlayLargeActivityTrayPaddingPatchAlternatives = [
  {
    target:
      'h(`block w-full min-w-0 py-1.5 pe-3 text-start focus-visible:outline focus-visible:outline-offset-[-2px]`,ee?`ps-5`:`ps-3`,O?`cursor-interaction`:`cursor-default`)',
    replacement:
      'h(`block w-full min-w-0 px-5 py-3 text-start focus-visible:outline focus-visible:outline-offset-[-2px]`,O?`cursor-interaction`:`cursor-default`)',
  },
  {
    target:
      '`relative z-[1] overflow-hidden rounded-[18px] px-3 py-2 forced-colors:bg-[Canvas]`',
    replacement:
      '`relative z-[1] overflow-hidden rounded-[18px] px-5 py-3 forced-colors:bg-[Canvas]`',
  },
  {
    target: avatarOverlayLargeActivityTrayPaddingPatchTarget,
    replacement: avatarOverlayLargeActivityTrayPaddingPatchReplacement,
  },
];
const avatarOverlayLargeActivityTrayWrapPatchTarget =
  'he?`whitespace-pre-wrap`:x==null?`line-clamp-2`:void 0';
const avatarOverlayLargeActivityTrayWrapPatchReplacement =
  'he?`whitespace-pre-wrap`:x==null?`whitespace-pre-wrap`:void 0';
const avatarOverlayLargeActivityTrayWrapPatchMarker =
  'he?`whitespace-pre-wrap`:x==null?`whitespace-pre-wrap`:void 0';
const avatarOverlayLargeActivityTrayWrapPatchAlternatives = [
  {
    target:
      'fe&&`whitespace-pre-wrap`,!fe&&S==null&&t.isLoading&&`truncate`,!fe&&S==null&&!t.isLoading&&`line-clamp-2`',
    replacement:
      'fe&&`whitespace-pre-wrap`,!fe&&S==null&&t.isLoading&&`truncate`,!fe&&S==null&&!t.isLoading&&`whitespace-pre-wrap`',
  },
  {
    target: 'H&&`whitespace-pre-wrap`,!H&&S==null&&t.isLoading&&`truncate`,!H&&S==null&&!t.isLoading&&`line-clamp-2`',
    replacement: 'H&&`whitespace-pre-wrap`,!H&&S==null&&t.isLoading&&`truncate`,!H&&S==null&&!t.isLoading&&`whitespace-pre-wrap`',
  },
  {
    target: 'V?`whitespace-pre-wrap`:S==null?`line-clamp-2`:void 0',
    replacement: 'V?`whitespace-pre-wrap`:S==null?`whitespace-pre-wrap`:void 0',
  },
  {
    target: 'W?`whitespace-pre-wrap`:S==null?`line-clamp-2`:void 0',
    replacement: 'W?`whitespace-pre-wrap`:S==null?`whitespace-pre-wrap`:void 0',
  },
  {
    target: 'ce?`whitespace-pre-wrap`:v==null?`line-clamp-2`:void 0',
    replacement: 'ce?`whitespace-pre-wrap`:v==null?`whitespace-pre-wrap`:void 0',
  },
  {
    target:
      'pe?`whitespace-pre-wrap`:b==null?`line-clamp-2`:void 0',
    replacement:
      'pe?`whitespace-pre-wrap`:b==null?`whitespace-pre-wrap`:void 0',
  },
  {
    target:
      'ue?`whitespace-pre-wrap`:b==null?`line-clamp-2`:void 0',
    replacement:
      'ue?`whitespace-pre-wrap`:b==null?`whitespace-pre-wrap`:void 0',
  },
  {
    target: avatarOverlayLargeActivityTrayWrapPatchTarget,
    replacement: avatarOverlayLargeActivityTrayWrapPatchReplacement,
  },
  {
    target: 'F?`whitespace-pre-wrap`:x==null?`line-clamp-2`:void 0',
    replacement: 'F?`whitespace-pre-wrap`:x==null?`whitespace-pre-wrap`:void 0',
  },
  {
    target: 'V?`whitespace-pre-wrap`:x==null?`line-clamp-2`:void 0',
    replacement: 'V?`whitespace-pre-wrap`:x==null?`whitespace-pre-wrap`:void 0',
  },
  {
    target: 'B?`whitespace-pre-wrap`:y==null?`line-clamp-2`:void 0',
    replacement: 'B?`whitespace-pre-wrap`:y==null?`whitespace-pre-wrap`:void 0',
  },
  {
    target: 'V?`whitespace-pre-wrap`:y==null?`line-clamp-2`:void 0',
    replacement: 'V?`whitespace-pre-wrap`:y==null?`whitespace-pre-wrap`:void 0',
  },
  {
    target: 'V?`whitespace-pre-wrap`:b==null?`line-clamp-2`:void 0',
    replacement: 'V?`whitespace-pre-wrap`:b==null?`whitespace-pre-wrap`:void 0',
  },
  {
    target:
      'V&&`whitespace-pre-wrap`,!V&&S==null&&t.isLoading&&`truncate`,!V&&S==null&&!t.isLoading&&`line-clamp-2`',
    replacement:
      'V&&`whitespace-pre-wrap`,!V&&S==null&&t.isLoading&&`truncate`,!V&&S==null&&!t.isLoading&&`whitespace-pre-wrap`',
  },
  {
    target:
      'V&&`whitespace-pre-wrap`,!V&&b==null&&t.isLoading&&`truncate`,!V&&b==null&&!t.isLoading&&`line-clamp-2`',
    replacement:
      'V&&`whitespace-pre-wrap`,!V&&b==null&&t.isLoading&&`truncate`,!V&&b==null&&!t.isLoading&&`whitespace-pre-wrap`',
  },
  {
    target:
      'ue&&`whitespace-pre-wrap`,!ue&&b==null&&t.isLoading&&`truncate`,!ue&&b==null&&!t.isLoading&&`line-clamp-2`',
    replacement:
      'ue&&`whitespace-pre-wrap`,!ue&&b==null&&t.isLoading&&`truncate`,!ue&&b==null&&!t.isLoading&&`whitespace-pre-wrap`',
  },
];
const avatarOverlayReadableActivityBodyHeightPatchTarget =
  '$=2,et=2,tt=.035,nt=32,rt=84,it=512,at=1';
const avatarOverlayReadableActivityBodyHeightPatchReplacement =
  '$=2,et=2,tt=.035,nt=80,rt=84,it=512,at=1';
const avatarOverlayReadableActivityBodyHeightPatchMarker =
  '$=2,et=2,tt=.035,nt=80,rt=84,it=512,at=1';
const avatarOverlayReadableActivityBodyHeightPatchAlternatives = [
  {
    target: 'rr=2,ir=2,ar=.035,or=32,sr=84,cr=512,lr=1',
    replacement: 'rr=2,ir=2,ar=.035,or=80,sr=84,cr=512,lr=1',
  },
  {
    target: 'cr=2,lr=2,ur=.035,dr=32,fr=84,pr=512,mr=1',
    replacement: 'cr=2,lr=2,ur=.035,dr=80,fr=84,pr=512,mr=1',
  },
  {
    target: 'Jt=2,Yt=2,Xt=.035,Zt=32,Qt=84,$t=512,en=1',
    replacement: 'Jt=2,Yt=2,Xt=.035,Zt=80,Qt=84,$t=512,en=1',
  },
  {
    target:
      'We=2,Ge=2,Ke=.035,qe=32,Je=84,Ye=512,Xe=1',
    replacement:
      'We=2,Ge=2,Ke=.035,qe=80,Je=84,Ye=512,Xe=1',
  },
  {
    target: avatarOverlayReadableActivityBodyHeightPatchTarget,
    replacement: avatarOverlayReadableActivityBodyHeightPatchReplacement,
  },
  {
    target: 'at=2,Q=2,ot=.035,st=32,ct=84,lt=512,ut=1',
    replacement: 'at=2,Q=2,ot=.035,st=80,ct=84,lt=512,ut=1',
  },
  {
    target: 'Y=2,Ve=2,He=.035,Ue=32,We=84,Ge=512,Ke=1',
    replacement: 'Y=2,Ve=2,He=.035,Ue=80,We=84,Ge=512,Ke=1',
  },
  {
    target: 'Bt=2,Vt=2,Ht=.035,Ut=32,Wt=84,Gt=512,Kt=1',
    replacement: 'Bt=2,Vt=2,Ht=.035,Ut=80,Wt=84,Gt=512,Kt=1',
  },
];
const avatarOverlayReadableActivityBodyMeasurementPatchTarget =
  '"data-avatar-overlay-measure-body":`true`';
const avatarOverlayReadableActivityBodyMeasurementPatchReplacement =
  '"data-avatar-overlay-measure-body":`true`';
const avatarOverlayReadableActivityBodyMeasurementPatchMarker =
  '"data-avatar-overlay-measure-body":`true`';
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
const mainDynamicToolsNamespaceFlattenPatchTarget =
  'this.pendingDynamicToolsForThreadStartRequests.delete(t.requestId),clearTimeout(n.timeout),n.resolve(t.dynamicTools)}';
const mainDynamicToolsNamespaceFlattenPatchReplacement =
  'this.pendingDynamicToolsForThreadStartRequests.delete(t.requestId),clearTimeout(n.timeout);let r=(t.dynamicTools??[]).flatMap(e=>e?.type===`namespace`?(e.tools??[]).map(t=>{let n={...t,namespace:e.name};return delete n.type,n}):[e]).flatMap(e=>{if(e==null)return[];let t={...e,inputSchema:e.inputSchema??e.input_schema??{type:`object`,properties:{},additionalProperties:!1}};return delete t.input_schema,delete t.type,[t]});n.resolve(r)}';
const mainDynamicToolsNamespaceFlattenPatchMarker =
  'inputSchema:e.inputSchema??e.input_schema??{type:`object`,properties:{},additionalProperties:!1}';
const mainDynamicToolsStartThreadPatchTarget =
  'async function rF({prompt:e,cwd:n,serviceTier:r,appServerConnection:i,hostId:a,threadStartKind:o}){return t.t({prompt:e,cwd:n,serviceTier:r,client:{startThread:e=>i.startThread(e),startTurn:e=>i.startTurn(e),unsubscribeThread:e=>i.unsubscribeThread(e),interruptTurn:e=>i.interruptTurn(e),registerInternalNotificationHandler:e=>i.registerInternalNotificationHandler(e)}})}';
const mainDynamicToolsStartThreadPatchReplacement =
  'async function rF({prompt:e,cwd:n,serviceTier:r,appServerConnection:i,hostId:a,threadStartKind:o}){return t.t({prompt:e,cwd:n,serviceTier:r,client:{startThread:e=>i.startThread(e.dynamicTools==null?e:{...e,dynamicTools:(e.dynamicTools??[]).flatMap(n=>n?.type===`namespace`?(n.tools??[]).map(e=>{let t={...e,namespace:n.name};return delete t.type,t}):[n]).flatMap(e=>{if(e==null)return[];let t={...e,inputSchema:e.inputSchema??e.input_schema??{type:`object`,properties:{},additionalProperties:!1}};return delete t.input_schema,delete t.type,[t]})}),startTurn:e=>i.startTurn(e),unsubscribeThread:e=>i.unsubscribeThread(e),interruptTurn:e=>i.interruptTurn(e),registerInternalNotificationHandler:e=>i.registerInternalNotificationHandler(e)}})}';
const mainDynamicToolsStartThreadPatchAlternatives = [
  {
    target: 'threadSource:`automation`,dynamicTools:h,mockExperimentalField:null',
    replacement:
      'threadSource:`automation`,dynamicTools:(h??[]).flatMap(e=>e?.type===`namespace`?(e.tools??[]).map(t=>{let n={...t,namespace:e.name};return delete n.type,n}):[e]).flatMap(e=>{if(e==null)return[];let t={...e,inputSchema:e.inputSchema??e.input_schema??{type:`object`,properties:{},additionalProperties:!1}};return delete t.input_schema,delete t.type,[t]}),mockExperimentalField:null',
  },
  {
    target: 'threadSource:`automation`,dynamicTools:g,mockExperimentalField:null',
    replacement:
      'threadSource:`automation`,dynamicTools:(g??[]).flatMap(e=>e?.type===`namespace`?(e.tools??[]).map(t=>{let n={...t,namespace:e.name};return delete n.type,n}):[e]).flatMap(e=>{if(e==null)return[];let t={...e,inputSchema:e.inputSchema??e.input_schema??{type:`object`,properties:{},additionalProperties:!1}};return delete t.input_schema,delete t.type,[t]}),mockExperimentalField:null',
  },
  // Current main bundles no longer proxy interactive thread starts; renderer request patches
  // normalize those payloads. The only remaining main-process start is the automation path.
  {
    target:
      'async function Zi({appVersion:e,automation:t,appServerConnection:r,desktopFeatureAvailability:i,gitManager:a,globalState:o,threadProjectAssignments:s,settingsStore:c,appServerClient:u,worktreeLifecycle:d,configRequirements:p,target:m,automationModelSettings:h,dynamicTools:g,isPackaged:_,repoRoot:v})',
    replacement:
      'async function Zi({appVersion:e,automation:t,appServerConnection:r,desktopFeatureAvailability:i,gitManager:a,globalState:o,threadProjectAssignments:s,settingsStore:c,appServerClient:u,worktreeLifecycle:d,configRequirements:p,target:m,automationModelSettings:h,dynamicTools:g,isPackaged:_,repoRoot:v})',
  },
  {
    target: mainDynamicToolsStartThreadPatchTarget,
    replacement: mainDynamicToolsStartThreadPatchReplacement,
  },
  {
    target:
      'async function eF({prompt:e,cwd:n,serviceTier:r,appServerConnection:i,hostId:a,threadStartKind:o}){return t.t({prompt:e,cwd:n,serviceTier:r,client:{startThread:e=>i.startThread(e),startTurn:e=>i.startTurn(e),unsubscribeThread:e=>i.unsubscribeThread(e),interruptTurn:e=>i.interruptTurn(e),registerInternalNotificationHandler:e=>i.registerInternalNotificationHandler(e)}})}',
    replacement:
      'async function eF({prompt:e,cwd:n,serviceTier:r,appServerConnection:i,hostId:a,threadStartKind:o}){return t.t({prompt:e,cwd:n,serviceTier:r,client:{startThread:e=>i.startThread(e.dynamicTools==null?e:{...e,dynamicTools:(e.dynamicTools??[]).flatMap(n=>n?.type===`namespace`?(n.tools??[]).map(e=>{let t={...e,namespace:n.name};return delete t.type,t}):[n]).flatMap(e=>{if(e==null)return[];let t={...e,inputSchema:e.inputSchema??e.input_schema??{type:`object`,properties:{},additionalProperties:!1}};return delete t.input_schema,delete t.type,[t]})}),startTurn:e=>i.startTurn(e),unsubscribeThread:e=>i.unsubscribeThread(e),interruptTurn:e=>i.interruptTurn(e),registerInternalNotificationHandler:e=>i.registerInternalNotificationHandler(e)}})}',
  },
];
const mainDynamicToolsAutomationPatchTarget =
  'async function Mi(e){try{let t=await e(),n=t.find(e=>e.type===`namespace`&&e.name===`codex_app`);return n?.type===`namespace`?n.tools.some(e=>e.name===li)?t:t.map(e=>e===n?{...n,tools:[...n.tools,ui]}:e):[...t,di]}catch(e){return pi().warning(`Failed to load dynamic tools for automation run`,{safe:{error:e},sensitive:{}}),[di]}}';
const mainDynamicToolsAutomationPatchReplacement =
  'async function Mi(e){try{let t=await e(),n=t.find(e=>e.type===`namespace`&&e.name===`codex_app`),r=n?.type===`namespace`?n.tools.some(e=>e.name===li)?t:t.map(e=>e===n?{...n,tools:[...n.tools,ui]}:e):[...t,di];return(r??[]).flatMap(e=>e?.type===`namespace`?(e.tools??[]).map(t=>{let n={...t,namespace:e.name};return delete n.type,n}):[e]).flatMap(e=>{if(e==null)return[];let t={...e,inputSchema:e.inputSchema??e.input_schema??{type:`object`,properties:{},additionalProperties:!1}};return delete t.input_schema,delete t.type,[t]})}catch(e){return pi().warning(`Failed to load dynamic tools for automation run`,{safe:{error:e},sensitive:{}}),[di].flatMap(e=>e?.type===`namespace`?(e.tools??[]).map(t=>{let n={...t,namespace:e.name};return delete n.type,n}):[e]).flatMap(e=>{if(e==null)return[];let t={...e,inputSchema:e.inputSchema??e.input_schema??{type:`object`,properties:{},additionalProperties:!1}};return delete t.input_schema,delete t.type,[t]})}}';
const mainDynamicToolsAutomationPatchAlternatives = [
  {
    target:
      'async function Bee(e){try{let t=await e();if(t.some(e=>e.type===`function`))return t.some(e=>e.type===`function`&&e.name===Ai)?t:[...t,ji];let n=t.find(e=>e.type===`namespace`&&e.name===`codex_app`);return n?.type===`namespace`?n.tools.some(e=>e.name===Ai)?t:t.map(e=>e===n?{...n,tools:[...n.tools,ji]}:e):[...t,Mi]}catch(e){return Ni().warning(`Failed to load dynamic tools for automation run`,{safe:{error:e},sensitive:{}}),[Mi]}}',
    replacement:
      'async function Bee(e){try{let t=await e(),r;if(t.some(e=>e.type===`function`))r=t.some(e=>e.type===`function`&&e.name===Ai)?t:[...t,ji];else{let n=t.find(e=>e.type===`namespace`&&e.name===`codex_app`);r=n?.type===`namespace`?n.tools.some(e=>e.name===Ai)?t:t.map(e=>e===n?{...n,tools:[...n.tools,ji]}:e):[...t,Mi]}return(r??[]).flatMap(e=>e?.type===`namespace`?(e.tools??[]).map(t=>{let n={...t,namespace:e.name};return delete n.type,n}):[e]).flatMap(e=>{if(e==null)return[];let t={...e,inputSchema:e.inputSchema??e.input_schema??{type:`object`,properties:{},additionalProperties:!1}};return delete t.input_schema,delete t.type,[t]})}catch(e){return Ni().warning(`Failed to load dynamic tools for automation run`,{safe:{error:e},sensitive:{}}),[Mi].flatMap(e=>e?.type===`namespace`?(e.tools??[]).map(t=>{let n={...t,namespace:e.name};return delete n.type,n}):[e]).flatMap(e=>{if(e==null)return[];let t={...e,inputSchema:e.inputSchema??e.input_schema??{type:`object`,properties:{},additionalProperties:!1}};return delete t.input_schema,delete t.type,[t]})}}',
  },
  {
    target:
      'async function Yi(e){try{let t=await e();if(t.some(e=>e.type===`function`))return t.some(e=>e.type===`function`&&e.name===Ei)?t:[...t,Di];let n=t.find(e=>e.type===`namespace`&&e.name===`codex_app`);return n?.type===`namespace`?n.tools.some(e=>e.name===Ei)?t:t.map(e=>e===n?{...n,tools:[...n.tools,Di]}:e):[...t,Oi]}catch(e){return ki().warning(`Failed to load dynamic tools for automation run`,{safe:{error:e},sensitive:{}}),[Oi]}}',
    replacement:
      'async function Yi(e){try{let t=await e(),r;if(t.some(e=>e.type===`function`))r=t.some(e=>e.type===`function`&&e.name===Ei)?t:[...t,Di];else{let n=t.find(e=>e.type===`namespace`&&e.name===`codex_app`);r=n?.type===`namespace`?n.tools.some(e=>e.name===Ei)?t:t.map(e=>e===n?{...n,tools:[...n.tools,Di]}:e):[...t,Oi]}return(r??[]).flatMap(e=>e?.type===`namespace`?(e.tools??[]).map(t=>{let n={...t,namespace:e.name};return delete n.type,n}):[e]).flatMap(e=>{if(e==null)return[];let t={...e,inputSchema:e.inputSchema??e.input_schema??{type:`object`,properties:{},additionalProperties:!1}};return delete t.input_schema,delete t.type,[t]})}catch(e){return ki().warning(`Failed to load dynamic tools for automation run`,{safe:{error:e},sensitive:{}}),[Oi].flatMap(e=>e?.type===`namespace`?(e.tools??[]).map(t=>{let n={...t,namespace:e.name};return delete n.type,n}):[e]).flatMap(e=>{if(e==null)return[];let t={...e,inputSchema:e.inputSchema??e.input_schema??{type:`object`,properties:{},additionalProperties:!1}};return delete t.input_schema,delete t.type,[t]})}}',
  },
  {
    target:
      'async function Xi(e){try{let t=await e();if(t.some(e=>e.type===`function`))return t.some(e=>e.type===`function`&&e.name===Di)?t:[...t,Oi];let n=t.find(e=>e.type===`namespace`&&e.name===`codex_app`);return n?.type===`namespace`?n.tools.some(e=>e.name===Di)?t:t.map(e=>e===n?{...n,tools:[...n.tools,Oi]}:e):[...t,ki]}catch(e){return Ai().warning(`Failed to load dynamic tools for automation run`,{safe:{error:e},sensitive:{}}),[ki]}}',
    replacement:
      'async function Xi(e){try{let t=await e(),r;if(t.some(e=>e.type===`function`))r=t.some(e=>e.type===`function`&&e.name===Di)?t:[...t,Oi];else{let n=t.find(e=>e.type===`namespace`&&e.name===`codex_app`);r=n?.type===`namespace`?n.tools.some(e=>e.name===Di)?t:t.map(e=>e===n?{...n,tools:[...n.tools,Oi]}:e):[...t,ki]}return(r??[]).flatMap(e=>e?.type===`namespace`?(e.tools??[]).map(t=>{let n={...t,namespace:e.name};return delete n.type,n}):[e]).flatMap(e=>{if(e==null)return[];let t={...e,inputSchema:e.inputSchema??e.input_schema??{type:`object`,properties:{},additionalProperties:!1}};return delete t.input_schema,delete t.type,[t]})}catch(e){return Ai().warning(`Failed to load dynamic tools for automation run`,{safe:{error:e},sensitive:{}}),[ki].flatMap(e=>e?.type===`namespace`?(e.tools??[]).map(t=>{let n={...t,namespace:e.name};return delete n.type,n}):[e]).flatMap(e=>{if(e==null)return[];let t={...e,inputSchema:e.inputSchema??e.input_schema??{type:`object`,properties:{},additionalProperties:!1}};return delete t.input_schema,delete t.type,[t]})}}',
  },
  {
    target: mainDynamicToolsAutomationPatchTarget,
    replacement: mainDynamicToolsAutomationPatchReplacement,
  },
  {
    target:
      'async function ki(e){try{let t=await e(),n=t.find(e=>e.type===`namespace`&&e.name===`codex_app`);return n?.type===`namespace`?n.tools.some(e=>e.name===oi)?t:t.map(e=>e===n?{...n,tools:[...n.tools,si]}:e):[...t,ci]}catch(e){return ui().warning(`Failed to load dynamic tools for automation run`,{safe:{error:e},sensitive:{}}),[ci]}}',
    replacement:
      'async function ki(e){try{let t=await e(),n=t.find(e=>e.type===`namespace`&&e.name===`codex_app`),r=n?.type===`namespace`?n.tools.some(e=>e.name===oi)?t:t.map(e=>e===n?{...n,tools:[...n.tools,si]}:e):[...t,ci];return(r??[]).flatMap(e=>e?.type===`namespace`?(e.tools??[]).map(t=>{let n={...t,namespace:e.name};return delete n.type,n}):[e]).flatMap(e=>{if(e==null)return[];let t={...e,inputSchema:e.inputSchema??e.input_schema??{type:`object`,properties:{},additionalProperties:!1}};return delete t.input_schema,delete t.type,[t]})}catch(e){return ui().warning(`Failed to load dynamic tools for automation run`,{safe:{error:e},sensitive:{}}),[ci].flatMap(e=>e?.type===`namespace`?(e.tools??[]).map(t=>{let n={...t,namespace:e.name};return delete n.type,n}):[e]).flatMap(e=>{if(e==null)return[];let t={...e,inputSchema:e.inputSchema??e.input_schema??{type:`object`,properties:{},additionalProperties:!1}};return delete t.input_schema,delete t.type,[t]})}}',
  },
  {
    target:
      'async function Ki(e){try{let t=await e();if(t.some(e=>e.type===`function`))return t.some(e=>e.type===`function`&&e.name===Si)?t:[...t,Ci];let n=t.find(e=>e.type===`namespace`&&e.name===`codex_app`);return n?.type===`namespace`?n.tools.some(e=>e.name===Si)?t:t.map(e=>e===n?{...n,tools:[...n.tools,Ci]}:e):[...t,wi]}catch(e){return Ei().warning(`Failed to load dynamic tools for automation run`,{safe:{error:e},sensitive:{}}),[wi]}}',
    replacement:
      'async function Ki(e){try{let t=await e(),r;if(t.some(e=>e.type===`function`))r=t.some(e=>e.type===`function`&&e.name===Si)?t:[...t,Ci];else{let n=t.find(e=>e.type===`namespace`&&e.name===`codex_app`);r=n?.type===`namespace`?n.tools.some(e=>e.name===Si)?t:t.map(e=>e===n?{...n,tools:[...n.tools,Ci]}:e):[...t,wi]}return(r??[]).flatMap(e=>e?.type===`namespace`?(e.tools??[]).map(t=>{let n={...t,namespace:e.name};return delete n.type,n}):[e]).flatMap(e=>{if(e==null)return[];let t={...e,inputSchema:e.inputSchema??e.input_schema??{type:`object`,properties:{},additionalProperties:!1}};return delete t.input_schema,delete t.type,[t]})}catch(e){return Ei().warning(`Failed to load dynamic tools for automation run`,{safe:{error:e},sensitive:{}}),[wi].flatMap(e=>e?.type===`namespace`?(e.tools??[]).map(t=>{let n={...t,namespace:e.name};return delete n.type,n}):[e]).flatMap(e=>{if(e==null)return[];let t={...e,inputSchema:e.inputSchema??e.input_schema??{type:`object`,properties:{},additionalProperties:!1}};return delete t.input_schema,delete t.type,[t]})}}',
  },
  {
    target:
      'async function Gi(e){try{let t=await e();if(t.some(e=>e.type===`function`))return t.some(e=>e.type===`function`&&e.name===Ti)?t:[...t,Ei];let n=t.find(e=>e.type===`namespace`&&e.name===`codex_app`);return n?.type===`namespace`?n.tools.some(e=>e.name===Ti)?t:t.map(e=>e===n?{...n,tools:[...n.tools,Ei]}:e):[...t,Di]}catch(e){return Oi().warning(`Failed to load dynamic tools for automation run`,{safe:{error:e},sensitive:{}}),[Di]}}',
    replacement:
      'async function Gi(e){try{let t=await e(),r;if(t.some(e=>e.type===`function`))r=t.some(e=>e.type===`function`&&e.name===Ti)?t:[...t,Ei];else{let n=t.find(e=>e.type===`namespace`&&e.name===`codex_app`);r=n?.type===`namespace`?n.tools.some(e=>e.name===Ti)?t:t.map(e=>e===n?{...n,tools:[...n.tools,Ei]}:e):[...t,Di]}return(r??[]).flatMap(e=>e?.type===`namespace`?(e.tools??[]).map(t=>{let n={...t,namespace:e.name};return delete n.type,n}):[e]).flatMap(e=>{if(e==null)return[];let t={...e,inputSchema:e.inputSchema??e.input_schema??{type:`object`,properties:{},additionalProperties:!1}};return delete t.input_schema,delete t.type,[t]})}catch(e){return Oi().warning(`Failed to load dynamic tools for automation run`,{safe:{error:e},sensitive:{}}),[Di].flatMap(e=>e?.type===`namespace`?(e.tools??[]).map(t=>{let n={...t,namespace:e.name};return delete n.type,n}):[e]).flatMap(e=>{if(e==null)return[];let t={...e,inputSchema:e.inputSchema??e.input_schema??{type:`object`,properties:{},additionalProperties:!1}};return delete t.input_schema,delete t.type,[t]})}}',
  },
  {
    target:
      'async function Wa(e){try{let t=(await e()).filter(e=>e.type!==`function`||e.name!==_a).map(e=>e.type===`namespace`&&e.name===`codex_app`?{...e,tools:e.tools.filter(({name:e})=>e!==_a)}:e);if(t.some(e=>e.type===`function`))return t.some(e=>e.type===`function`&&e.name===ga)?t:[...t,va];let n=t.find(e=>e.type===`namespace`&&e.name===`codex_app`);return n?.type===`namespace`?n.tools.some(e=>e.name===ga)?t:t.map(e=>e===n?{...n,tools:[...n.tools,va]}:e):[...t,ya]}catch(e){return xa().warning(`Failed to load dynamic tools for automation run`,{safe:{error:e},sensitive:{}}),[ya]}}',
    replacement:
      'async function Wa(e){try{let t=(await e()).filter(e=>e.type!==`function`||e.name!==_a).map(e=>e.type===`namespace`&&e.name===`codex_app`?{...e,tools:e.tools.filter(({name:e})=>e!==_a)}:e),r;if(t.some(e=>e.type===`function`))r=t.some(e=>e.type===`function`&&e.name===ga)?t:[...t,va];else{let n=t.find(e=>e.type===`namespace`&&e.name===`codex_app`);r=n?.type===`namespace`?n.tools.some(e=>e.name===ga)?t:t.map(e=>e===n?{...n,tools:[...n.tools,va]}:e):[...t,ya]}return(r??[]).flatMap(e=>e?.type===`namespace`?(e.tools??[]).map(t=>{let n={...t,namespace:e.name};return delete n.type,n}):[e]).flatMap(e=>{if(e==null)return[];let t={...e,inputSchema:e.inputSchema??e.input_schema??{type:`object`,properties:{},additionalProperties:!1}};return delete t.input_schema,delete t.type,[t]})}catch(e){return xa().warning(`Failed to load dynamic tools for automation run`,{safe:{error:e},sensitive:{}}),[ya].flatMap(e=>e?.type===`namespace`?(e.tools??[]).map(t=>{let n={...t,namespace:e.name};return delete n.type,n}):[e]).flatMap(e=>{if(e==null)return[];let t={...e,inputSchema:e.inputSchema??e.input_schema??{type:`object`,properties:{},additionalProperties:!1}};return delete t.input_schema,delete t.type,[t]})}}',
  },
  {
    target:
      'async function za(e){try{let t=(await e()).filter(e=>e.type!==`function`||e.name!==fa).map(e=>e.type===`namespace`&&e.name===`codex_app`?{...e,tools:e.tools.filter(({name:e})=>e!==fa)}:e);if(t.some(e=>e.type===`function`))return t.some(e=>e.type===`function`&&e.name===da)?t:[...t,pa];let n=t.find(e=>e.type===`namespace`&&e.name===`codex_app`);return n?.type===`namespace`?n.tools.some(e=>e.name===da)?t:t.map(e=>e===n?{...n,tools:[...n.tools,pa]}:e):[...t,ma]}catch(e){return ga().warning(`Failed to load dynamic tools for automation run`,{safe:{error:e},sensitive:{}}),[ma]}}',
    replacement:
      'async function za(e){try{let t=(await e()).filter(e=>e.type!==`function`||e.name!==fa).map(e=>e.type===`namespace`&&e.name===`codex_app`?{...e,tools:e.tools.filter(({name:e})=>e!==fa)}:e),r;if(t.some(e=>e.type===`function`))r=t.some(e=>e.type===`function`&&e.name===da)?t:[...t,pa];else{let n=t.find(e=>e.type===`namespace`&&e.name===`codex_app`);r=n?.type===`namespace`?n.tools.some(e=>e.name===da)?t:t.map(e=>e===n?{...n,tools:[...n.tools,pa]}:e):[...t,ma]}return(r??[]).flatMap(e=>e?.type===`namespace`?(e.tools??[]).map(t=>{let n={...t,namespace:e.name};return delete n.type,n}):[e]).flatMap(e=>{if(e==null)return[];let t={...e,inputSchema:e.inputSchema??e.input_schema??{type:`object`,properties:{},additionalProperties:!1}};return delete t.input_schema,delete t.type,[t]})}catch(e){return ga().warning(`Failed to load dynamic tools for automation run`,{safe:{error:e},sensitive:{}}),[ma].flatMap(e=>e?.type===`namespace`?(e.tools??[]).map(t=>{let n={...t,namespace:e.name};return delete n.type,n}):[e]).flatMap(e=>{if(e==null)return[];let t={...e,inputSchema:e.inputSchema??e.input_schema??{type:`object`,properties:{},additionalProperties:!1}};return delete t.input_schema,delete t.type,[t]})}}',
  },
  {
    target:
      'async function Ha(e){try{let t=(await e()).filter(e=>e.type!==`function`||e.name!==ha).map(e=>e.type===`namespace`&&e.name===`codex_app`?{...e,tools:e.tools.filter(({name:e})=>e!==ha)}:e);if(t.some(e=>e.type===`function`))return t.some(e=>e.type===`function`&&e.name===ma)?t:[...t,ga];let n=t.find(e=>e.type===`namespace`&&e.name===`codex_app`);return n?.type===`namespace`?n.tools.some(e=>e.name===ma)?t:t.map(e=>e===n?{...n,tools:[...n.tools,ga]}:e):[...t,_a]}catch(e){return ya().warning(`Failed to load dynamic tools for automation run`,{safe:{error:e},sensitive:{}}),[_a]}}',
    replacement:
      'async function Ha(e){try{let t=(await e()).filter(e=>e.type!==`function`||e.name!==ha).map(e=>e.type===`namespace`&&e.name===`codex_app`?{...e,tools:e.tools.filter(({name:e})=>e!==ha)}:e),r;if(t.some(e=>e.type===`function`))r=t.some(e=>e.type===`function`&&e.name===ma)?t:[...t,ga];else{let n=t.find(e=>e.type===`namespace`&&e.name===`codex_app`);r=n?.type===`namespace`?n.tools.some(e=>e.name===ma)?t:t.map(e=>e===n?{...n,tools:[...n.tools,ga]}:e):[...t,_a]}return(r??[]).flatMap(e=>e?.type===`namespace`?(e.tools??[]).map(t=>{let n={...t,namespace:e.name};return delete n.type,n}):[e]).flatMap(e=>{if(e==null)return[];let t={...e,inputSchema:e.inputSchema??e.input_schema??{type:`object`,properties:{},additionalProperties:!1}};return delete t.input_schema,delete t.type,[t]})}catch(e){return ya().warning(`Failed to load dynamic tools for automation run`,{safe:{error:e},sensitive:{}}),[_a].flatMap(e=>e?.type===`namespace`?(e.tools??[]).map(t=>{let n={...t,namespace:e.name};return delete n.type,n}):[e]).flatMap(e=>{if(e==null)return[];let t={...e,inputSchema:e.inputSchema??e.input_schema??{type:`object`,properties:{},additionalProperties:!1}};return delete t.input_schema,delete t.type,[t]})}}',
  },
];
const rendererPrewarmThreadStartDynamicToolsPatchTarget =
  '"prewarm-thread-start-for-host":Q7((e,{params:t,timeoutMs:n})=>e.requestClient.prewarmThreadStart({...t,threadSource:t.threadSource===void 0?`user`:t.threadSource},{timeoutMs:n}))';
const rendererPrewarmThreadStartDynamicToolsPatchReplacement =
  '"prewarm-thread-start-for-host":Q7((e,{params:t,timeoutMs:n})=>{let r=t.dynamicTools==null?t:{...t,dynamicTools:(t.dynamicTools??[]).flatMap(e=>e?.type===`namespace`?(e.tools??[]).map(t=>{let n={...t,namespace:e.name};return delete n.type,n}):[e]).flatMap(e=>{if(e==null)return[];let t={...e,inputSchema:e.inputSchema??e.input_schema??{type:`object`,properties:{},additionalProperties:!1}};return delete t.input_schema,delete t.type,[t]})};return e.requestClient.prewarmThreadStart({...r,threadSource:r.threadSource===void 0?`user`:r.threadSource},{timeoutMs:n})})';
const rendererPrewarmThreadStartDynamicToolsPatchAlternatives = [
  {
    target:
      '"prewarm-thread-start-for-host":r9((e,{params:t,...n})=>e.requestClient.prewarmThreadStart({...t,threadSource:t.threadSource===void 0?`user`:t.threadSource},n))',
    replacement:
      '"prewarm-thread-start-for-host":r9((e,{params:t,...n})=>{let r=t.dynamicTools==null?t:{...t,dynamicTools:(t.dynamicTools??[]).flatMap(e=>e?.type===`namespace`?(e.tools??[]).map(t=>{let n={...t,namespace:e.name};return delete n.type,n}):[e]).flatMap(e=>{if(e==null)return[];let t={...e,inputSchema:e.inputSchema??e.input_schema??{type:`object`,properties:{},additionalProperties:!1}};return delete t.input_schema,delete t.type,[t]})};return e.requestClient.prewarmThreadStart({...r,threadSource:r.threadSource===void 0?`user`:r.threadSource},n)})',
  },
  {
    target:
      '"prewarm-thread-start-for-host":Z7((e,{params:t,...n})=>e.requestClient.prewarmThreadStart({...t,threadSource:t.threadSource===void 0?`user`:t.threadSource},n))',
    replacement:
      '"prewarm-thread-start-for-host":Z7((e,{params:t,...n})=>{let r=t.dynamicTools==null?t:{...t,dynamicTools:(t.dynamicTools??[]).flatMap(e=>e?.type===`namespace`?(e.tools??[]).map(t=>{let n={...t,namespace:e.name};return delete n.type,n}):[e]).flatMap(e=>{if(e==null)return[];let t={...e,inputSchema:e.inputSchema??e.input_schema??{type:`object`,properties:{},additionalProperties:!1}};return delete t.input_schema,delete t.type,[t]})};return e.requestClient.prewarmThreadStart({...r,threadSource:r.threadSource===void 0?`user`:r.threadSource},n)})',
  },
  {
    target: rendererPrewarmThreadStartDynamicToolsPatchTarget,
    replacement: rendererPrewarmThreadStartDynamicToolsPatchReplacement,
  },
  {
    target:
      '"prewarm-thread-start-for-host":$7((e,{params:t,timeoutMs:n})=>e.requestClient.prewarmThreadStart({...t,threadSource:t.threadSource===void 0?`user`:t.threadSource},{timeoutMs:n}))',
    replacement:
      '"prewarm-thread-start-for-host":$7((e,{params:t,timeoutMs:n})=>{let r=t.dynamicTools==null?t:{...t,dynamicTools:(t.dynamicTools??[]).flatMap(e=>e?.type===`namespace`?(e.tools??[]).map(t=>{let n={...t,namespace:e.name};return delete n.type,n}):[e]).flatMap(e=>{if(e==null)return[];let t={...e,inputSchema:e.inputSchema??e.input_schema??{type:`object`,properties:{},additionalProperties:!1}};return delete t.input_schema,delete t.type,[t]})};return e.requestClient.prewarmThreadStart({...r,threadSource:r.threadSource===void 0?`user`:r.threadSource},{timeoutMs:n})})',
  },
];
const rendererStartThreadDynamicToolsPatchTarget =
  '"start-thread-for-host":Q7((e,t)=>e.sendRequest(`thread/start`,{...t,threadSource:t.threadSource===void 0?`user`:t.threadSource},{timeoutMs:yp}))';
const rendererStartThreadDynamicToolsPatchReplacement =
  '"start-thread-for-host":Q7((e,t)=>{let n=t.dynamicTools==null?t:{...t,dynamicTools:(t.dynamicTools??[]).flatMap(e=>e?.type===`namespace`?(e.tools??[]).map(t=>{let n={...t,namespace:e.name};return delete n.type,n}):[e]).flatMap(e=>{if(e==null)return[];let t={...e,inputSchema:e.inputSchema??e.input_schema??{type:`object`,properties:{},additionalProperties:!1}};return delete t.input_schema,delete t.type,[t]})};return e.sendRequest(`thread/start`,{...n,threadSource:n.threadSource===void 0?`user`:n.threadSource},{timeoutMs:yp})})';
const rendererStartThreadDynamicToolsPatchAlternatives = [
  {
    target:
      '"start-thread-for-host":r9((e,t)=>e.sendRequest(`thread/start`,{...t,threadSource:t.threadSource===void 0?`user`:t.threadSource},{timeoutMs:Dp}))',
    replacement:
      '"start-thread-for-host":r9((e,t)=>{let n=t.dynamicTools==null?t:{...t,dynamicTools:(t.dynamicTools??[]).flatMap(e=>e?.type===`namespace`?(e.tools??[]).map(t=>{let n={...t,namespace:e.name};return delete n.type,n}):[e]).flatMap(e=>{if(e==null)return[];let t={...e,inputSchema:e.inputSchema??e.input_schema??{type:`object`,properties:{},additionalProperties:!1}};return delete t.input_schema,delete t.type,[t]})};return e.sendRequest(`thread/start`,{...n,threadSource:n.threadSource===void 0?`user`:n.threadSource},{timeoutMs:Dp})})',
  },
  {
    target:
      '"start-thread-for-host":Z7((e,t)=>e.sendRequest(`thread/start`,{...t,threadSource:t.threadSource===void 0?`user`:t.threadSource},{timeoutMs:Ua}))',
    replacement:
      '"start-thread-for-host":Z7((e,t)=>{let n=t.dynamicTools==null?t:{...t,dynamicTools:(t.dynamicTools??[]).flatMap(e=>e?.type===`namespace`?(e.tools??[]).map(t=>{let n={...t,namespace:e.name};return delete n.type,n}):[e]).flatMap(e=>{if(e==null)return[];let t={...e,inputSchema:e.inputSchema??e.input_schema??{type:`object`,properties:{},additionalProperties:!1}};return delete t.input_schema,delete t.type,[t]})};return e.sendRequest(`thread/start`,{...n,threadSource:n.threadSource===void 0?`user`:n.threadSource},{timeoutMs:Ua})})',
  },
  {
    target: rendererStartThreadDynamicToolsPatchTarget,
    replacement: rendererStartThreadDynamicToolsPatchReplacement,
  },
  {
    target:
      '"start-thread-for-host":$7((e,t)=>e.sendRequest(`thread/start`,{...t,threadSource:t.threadSource===void 0?`user`:t.threadSource},{timeoutMs:so}))',
    replacement:
      '"start-thread-for-host":$7((e,t)=>{let n=t.dynamicTools==null?t:{...t,dynamicTools:(t.dynamicTools??[]).flatMap(e=>e?.type===`namespace`?(e.tools??[]).map(t=>{let n={...t,namespace:e.name};return delete n.type,n}):[e]).flatMap(e=>{if(e==null)return[];let t={...e,inputSchema:e.inputSchema??e.input_schema??{type:`object`,properties:{},additionalProperties:!1}};return delete t.input_schema,delete t.type,[t]})};return e.sendRequest(`thread/start`,{...n,threadSource:n.threadSource===void 0?`user`:n.threadSource},{timeoutMs:so})})',
  },
];
const rendererRequestClientSendRequestDynamicToolsPatchTarget =
  'async sendRequest(e,t,n){if(this.dispatchMessage==null)throw Error(`AppServerRequestClient is missing a message dispatcher`);if(e===`config/read`)return this.sendConfigReadRequest(t,n);let{request:r,promise:i}=this.createRequest(e,t,n);return this.emitRequestStartedEvent(r),this.dispatchMessage(`mcp-request`,{request:r,hostId:this.hostId}),i}';
const rendererRequestClientSendRequestDynamicToolsPatchReplacement =
  'async sendRequest(e,t,n){if(this.dispatchMessage==null)throw Error(`AppServerRequestClient is missing a message dispatcher`);if(e===`config/read`)return this.sendConfigReadRequest(t,n);e===`thread/start`&&(t=t.dynamicTools==null?t:{...t,dynamicTools:(t.dynamicTools??[]).flatMap(e=>e?.type===`namespace`?(e.tools??[]).map(t=>{let n={...t,namespace:e.name};return delete n.type,n}):[e]).flatMap(e=>{if(e==null)return[];let t={...e,inputSchema:e.inputSchema??e.input_schema??{type:`object`,properties:{},additionalProperties:!1}};return delete t.input_schema,delete t.type,[t]})});let{request:r,promise:i}=this.createRequest(e,t,n);return this.emitRequestStartedEvent(r),this.dispatchMessage(`mcp-request`,{request:r,hostId:this.hostId}),i}';
const rendererRequestClientSendRequestDynamicToolsPatchAlternatives = [
  {
    target: rendererRequestClientSendRequestDynamicToolsPatchTarget,
    replacement: rendererRequestClientSendRequestDynamicToolsPatchReplacement,
  },
  {
    target:
      'async sendRequest(e,t,n){if(this.dispatchMessage==null)throw Error(`AppServerRequestClient is missing a message dispatcher`);return e===`config/read`?this.sendConfigReadRequest(t,n):this.enqueueRequest(e,t,n)}',
    replacement:
      'async sendRequest(e,t,n){if(this.dispatchMessage==null)throw Error(`AppServerRequestClient is missing a message dispatcher`);if(e===`config/read`)return this.sendConfigReadRequest(t,n);e===`thread/start`&&(t=t.dynamicTools==null?t:{...t,dynamicTools:(t.dynamicTools??[]).flatMap(e=>e?.type===`namespace`?(e.tools??[]).map(t=>{let n={...t,namespace:e.name};return delete n.type,n}):[e]).flatMap(e=>{if(e==null)return[];let t={...e,inputSchema:e.inputSchema??e.input_schema??{type:`object`,properties:{},additionalProperties:!1}};return delete t.input_schema,delete t.type,[t]})});return this.enqueueRequest(e,t,n)}',
  },
];
const rendererRequestClientPrewarmDynamicToolsPatchTarget =
  'async prewarmThreadStart(e,t){if(this.dispatchMessage==null)throw Error(`AppServerRequestClient is missing a message dispatcher`);let{request:n,promise:r}=this.createRequest(`thread/start`,e,t);return this.emitRequestStartedEvent(n),this.dispatchMessage(`thread-prewarm-start`,{request:n,hostId:this.hostId}),r}';
const rendererRequestClientPrewarmDynamicToolsPatchReplacement =
  'async prewarmThreadStart(e,t){if(this.dispatchMessage==null)throw Error(`AppServerRequestClient is missing a message dispatcher`);e=e.dynamicTools==null?e:{...e,dynamicTools:(e.dynamicTools??[]).flatMap(e=>e?.type===`namespace`?(e.tools??[]).map(t=>{let n={...t,namespace:e.name};return delete n.type,n}):[e]).flatMap(e=>{if(e==null)return[];let t={...e,inputSchema:e.inputSchema??e.input_schema??{type:`object`,properties:{},additionalProperties:!1}};return delete t.input_schema,delete t.type,[t]})};let{request:n,promise:r}=this.createRequest(`thread/start`,e,t);return this.emitRequestStartedEvent(n),this.dispatchMessage(`thread-prewarm-start`,{request:n,hostId:this.hostId}),r}';
const rendererRequestClientPrewarmDynamicToolsPatchAlternatives = [
  {
    target: rendererRequestClientPrewarmDynamicToolsPatchTarget,
    replacement: rendererRequestClientPrewarmDynamicToolsPatchReplacement,
  },
  {
    target:
      'async prewarmThreadStart(e,t){if(this.dispatchMessage==null)throw Error(`AppServerRequestClient is missing a message dispatcher`);let n=t?.priority??`critical`,',
    replacement:
      'async prewarmThreadStart(e,t){if(this.dispatchMessage==null)throw Error(`AppServerRequestClient is missing a message dispatcher`);e=e.dynamicTools==null?e:{...e,dynamicTools:(e.dynamicTools??[]).flatMap(e=>e?.type===`namespace`?(e.tools??[]).map(t=>{let n={...t,namespace:e.name};return delete n.type,n}):[e]).flatMap(e=>{if(e==null)return[];let t={...e,inputSchema:e.inputSchema??e.input_schema??{type:`object`,properties:{},additionalProperties:!1}};return delete t.input_schema,delete t.type,[t]})};let n=t?.priority??`critical`,',
  },
  {
    target:
      'async prewarmThreadStart(e,t){if(this.dispatchMessage==null)throw Error(`AppServerRequestClient is missing a message dispatcher`);return this.enqueueRequest(`thread/start`,e,{...t,priority:t?.priority??`critical`},e=>{this.dispatchMessage?.(`thread-prewarm-start`,{request:e,hostId:this.hostId})})}',
    replacement:
      'async prewarmThreadStart(e,t){if(this.dispatchMessage==null)throw Error(`AppServerRequestClient is missing a message dispatcher`);e=e.dynamicTools==null?e:{...e,dynamicTools:(e.dynamicTools??[]).flatMap(e=>e?.type===`namespace`?(e.tools??[]).map(t=>{let n={...t,namespace:e.name};return delete n.type,n}):[e]).flatMap(e=>{if(e==null)return[];let t={...e,inputSchema:e.inputSchema??e.input_schema??{type:`object`,properties:{},additionalProperties:!1}};return delete t.input_schema,delete t.type,[t]})};return this.enqueueRequest(`thread/start`,e,{...t,priority:t?.priority??`critical`},e=>{this.dispatchMessage?.(`thread-prewarm-start`,{request:e,hostId:this.hostId})})}',
  },
];
const webviewChatGptLoginPatchPattern =
  /([A-Za-z_$][A-Za-z0-9_$]*)\.dispatchMessage\(`open-in-browser`,\{url:([^{}]+?)\}\)/g;
const webviewChatGptLoginPatchReplacement =
  '$1.dispatchMessage(`open-in-browser`,{url:$2,useExternalBrowser:!0})';
const remoteChatGptLoginPatchPattern = webviewChatGptLoginPatchPattern;
const remoteChatGptLoginPatchReplacement = webviewChatGptLoginPatchReplacement;
const remoteConnectionsLoginPatchAlternatives = [
  {
    target:
      'b.dispatchMessage(`open-in-browser`,{url:Et({authUrl:n,useDesktopAuth:!1,useStreamlinedLoginUx:!1})})',
    replacement:
      'b.dispatchMessage(`open-in-browser`,{url:Et({authUrl:n,useDesktopAuth:!1,useStreamlinedLoginUx:!1}),useExternalBrowser:!0})',
  },
];
const pluginInstallFlowNativeBrowserPatchPattern =
  /([A-Za-z_$][A-Za-z0-9_$]*)\.dispatchMessage\(`open-in-browser`,\{url:([^{}]+?)\}\)/g;
const pluginInstallFlowNativeBrowserPatchReplacement =
  '$1.dispatchMessage(`open-in-browser`,{url:$2,useExternalBrowser:!0})';
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
  {
    target: 'openInBrowser:e=>{A.dispatchMessage(`open-in-browser`,{url:e})}',
    replacement:
      'openInBrowser:e=>{A.dispatchMessage(`open-in-browser`,{url:e,useExternalBrowser:!0})}',
  },
  {
    target: 'openInBrowser:e=>{E.dispatchMessage(`open-in-browser`,{url:e})}',
    replacement:
      'openInBrowser:e=>{E.dispatchMessage(`open-in-browser`,{url:e,useExternalBrowser:!0})}',
  },
];
const pluginsPageOpenInBrowserCallbackPatchAlternatives = [
  {
    target: 'function Ss(e){s.dispatchMessage(`open-in-browser`,{url:e})}',
    replacement:
      'function Ss(e){s.dispatchMessage(`open-in-browser`,{url:e,useExternalBrowser:!0})}',
  },
  {
    target: 'openInBrowser:e=>{A.dispatchMessage(`open-in-browser`,{url:e})}',
    replacement:
      'openInBrowser:e=>{A.dispatchMessage(`open-in-browser`,{url:e,useExternalBrowser:!0})}',
  },
  {
    target: 'openInBrowser:e=>{E.dispatchMessage(`open-in-browser`,{url:e})}',
    replacement:
      'openInBrowser:e=>{E.dispatchMessage(`open-in-browser`,{url:e,useExternalBrowser:!0})}',
  },
];
const pluginsPageInstallUrlPatchAlternatives = [
  {
    target: 's.dispatchMessage(`open-in-browser`,{url:o}),i&&k(!1)',
    replacement:
      's.dispatchMessage(`open-in-browser`,{url:o,useExternalBrowser:!0}),i&&k(!1)',
  },
  {
    target: 'if(!u&&s){A.dispatchMessage(`open-in-browser`,{url:s});return}',
    replacement:
      'if(!u&&s){A.dispatchMessage(`open-in-browser`,{url:s,useExternalBrowser:!0});return}',
  },
  {
    target: 'if(!f&&s){E.dispatchMessage(`open-in-browser`,{url:s});return}',
    replacement:
      'if(!f&&s){E.dispatchMessage(`open-in-browser`,{url:s,useExternalBrowser:!0});return}',
  },
];
const pluginsPageResolvedUrlPatchAlternatives = [
  {
    target: 's.dispatchMessage(`open-in-browser`,{url:e}),o(!1)',
    replacement:
      's.dispatchMessage(`open-in-browser`,{url:e,useExternalBrowser:!0}),o(!1)',
  },
  {
    target: 'A.dispatchMessage(`open-in-browser`,{url:a})',
    replacement: 'A.dispatchMessage(`open-in-browser`,{url:a,useExternalBrowser:!0})',
  },
  {
    target: 'E.dispatchMessage(`open-in-browser`,{url:a})',
    replacement: 'E.dispatchMessage(`open-in-browser`,{url:a,useExternalBrowser:!0})',
  },
];
const pluginsPageBrowserFallbackPatchAlternatives = [
  {
    target: 'case`browser-fallback`:k(!1);return;',
    replacement:
      'case`browser-fallback`:k(!1),n?.installUrl?.trim()&&s.dispatchMessage(`open-in-browser`,{url:n.installUrl.trim(),useExternalBrowser:!0});return;',
  },
  {
    target: 'case`browser-fallback`:D({appId:e.appId,status:`pending`});return;',
    replacement:
      'case`browser-fallback`:D({appId:e.appId,status:`pending`}),s&&A.dispatchMessage(`open-in-browser`,{url:s,useExternalBrowser:!0});return;',
  },
  {
    target: 'case`browser-fallback`:w({appId:e.appId,status:`pending`});return;',
    replacement:
      'case`browser-fallback`:w({appId:e.appId,status:`pending`}),s&&E.dispatchMessage(`open-in-browser`,{url:s,useExternalBrowser:!0});return;',
  },
];
const pluginsPageLinuxWindowsMenuPatchAlternatives = [
  {
    target:
      'function _a(){let{platform:e}=Ut();return e===`windows`&&window.electronBridge?.showApplicationMenu!=null}',
    replacement:
      'function _a(){let{platform:e}=Ut();return(e===`windows`||e===`linux`)&&window.electronBridge?.showApplicationMenu!=null}',
  },
  {
    target:
      'function Gt(){let{platform:e}=Pe();return e===`windows`&&window.electronBridge?.showApplicationMenu!=null}',
    replacement:
      'function Gt(){let{platform:e}=Pe();return(e===`windows`||e===`linux`)&&window.electronBridge?.showApplicationMenu!=null}',
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
  {
    target: 'openInBrowser:e=>{A.dispatchMessage(`open-in-browser`,{url:e})}',
    replacement:
      'openInBrowser:e=>{A.dispatchMessage(`open-in-browser`,{url:e,useExternalBrowser:!0})}',
  },
  {
    target: 'openInBrowser:e=>{E.dispatchMessage(`open-in-browser`,{url:e})}',
    replacement:
      'openInBrowser:e=>{E.dispatchMessage(`open-in-browser`,{url:e,useExternalBrowser:!0})}',
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
  {
    target: 'if(!u&&s){A.dispatchMessage(`open-in-browser`,{url:s});return}',
    replacement:
      'if(!u&&s){A.dispatchMessage(`open-in-browser`,{url:s,useExternalBrowser:!0});return}',
  },
  {
    target: 'if(!f&&s){E.dispatchMessage(`open-in-browser`,{url:s});return}',
    replacement:
      'if(!f&&s){E.dispatchMessage(`open-in-browser`,{url:s,useExternalBrowser:!0});return}',
  },
];
const pluginCardsBrowserFallbackPatchAlternatives = [
  {
    target: 'case`browser-fallback`:x({appId:e.appId,status:`pending`});return;',
    replacement:
      'case`browser-fallback`:x({appId:e.appId,status:`pending`}),e.installUrl&&i.dispatchMessage(`open-in-browser`,{url:e.installUrl,useExternalBrowser:!0});return;',
  },
  {
    target: 'case`browser-fallback`:D({appId:e.appId,status:`pending`});return;',
    replacement:
      'case`browser-fallback`:D({appId:e.appId,status:`pending`}),s&&A.dispatchMessage(`open-in-browser`,{url:s,useExternalBrowser:!0});return;',
  },
  {
    target: 'case`browser-fallback`:w({appId:e.appId,status:`pending`});return;',
    replacement:
      'case`browser-fallback`:w({appId:e.appId,status:`pending`}),s&&E.dispatchMessage(`open-in-browser`,{url:s,useExternalBrowser:!0});return;',
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
  {
    target:
      'C=[];for(let t of e.patchBatches??[]){let e=t.cwd??a,n=m?.origins.find(t=>t.dir===e)?.root??null,r=rf(t.changes,e,n);e==null||r.length===0||C.push({cwd:e,diff:r})}C.length===0&&e.patchBatches==null&&e.unifiedDiff.length>0&&a!=null&&C.push({cwd:a,diff:e.unifiedDiff});',
    replacement:
      'C=[];if((e.patchBatches==null||e.patchBatches.length===1)&&e.unifiedDiff.length>0&&a!=null)C.push({cwd:a,diff:e.unifiedDiff});else for(let t of e.patchBatches??[]){let e=t.cwd??a,n=m?.origins.find(t=>t.dir===e)?.root??null,r=rf(t.changes,e,n);e==null||r.length===0||C.push({cwd:e,diff:r})}',
  },
];
const rendererGoalsDefaultFeatureOverridePatchMarker = '`tool_suggest`,`goals`';
const rendererGoalsDefaultFeatureOverridePatchAlternatives = [
  {
    target:
      'var YA=[`apps`,`memories`,`plugins`,`tool_call_mcp_elicitation`,`tool_search`,`tool_suggest`,kr];',
    replacement:
      'var YA=[`apps`,`memories`,`plugins`,`tool_call_mcp_elicitation`,`tool_search`,`tool_suggest`,`goals`,kr];',
  },
  {
    target:
      'var GH=[`apps_mcp_path_override`,`auth_elicitation`,`memories`,`tool_suggest`]',
    replacement:
      'var GH=[`apps_mcp_path_override`,`auth_elicitation`,`memories`,`tool_suggest`,`goals`]',
  },
  {
    target:
      'k7=[`apps_mcp_path_override`,`auth_elicitation`,`memories`,`tool_suggest`]',
    replacement:
      'k7=[`apps_mcp_path_override`,`auth_elicitation`,`memories`,`tool_suggest`,`goals`]',
  },
];
const rendererSupportedFeatureEnablementPatchMarker =
  'k7=[`memories`,`tool_suggest`]';
const rendererSupportedFeatureEnablementPatchAlternatives = [
  {
    target:
      'O7=[`apps_mcp_path_override`,`auth_elicitation`,`memories`,`tool_suggest`]',
    replacement: 'O7=[`memories`,`tool_suggest`]',
  },
  {
    target:
      'k7=[`apps_mcp_path_override`,`auth_elicitation`,`memories`,`tool_suggest`]',
    replacement:
      'k7=[`memories`,`tool_suggest`]',
  },
  {
    target:
      'k7=[`apps_mcp_path_override`,`auth_elicitation`,`memories`,`tool_suggest`,`goals`]',
    replacement:
      'k7=[`memories`,`tool_suggest`]',
  },
  {
    target:
      'A7=[`apps_mcp_path_override`,`auth_elicitation`,`memories`,`tool_suggest`]',
    replacement:
      'A7=[`memories`,`tool_suggest`]',
  },
];
const rendererDesktopGoalsFeaturePatchMarker = 'goals:!0';
const rendererDesktopGoalsFeaturePatchAlternatives = [
  {
    target:
      'computerUse:c.available,computerUseNodeRepl:c.available&&l,control:u,multiWindow:d})',
    replacement:
      'computerUse:c.available,computerUseNodeRepl:c.available&&l,control:u,goals:!0,multiWindow:d})',
  },
  {
    target:
      'computerUse:_.available,computerUseNodeRepl:_.available&&v,recordAndReplay:_.available&&y,sites:o,control:b,dil:x,multiBrowserTabs:d,multiWindow:S',
    replacement:
      'computerUse:_.available,computerUseNodeRepl:_.available&&v,recordAndReplay:_.available&&y,sites:o,control:b,goals:!0,dil:x,multiBrowserTabs:d,multiWindow:S',
  },
  {
    target:
      'computerUse:S.available,computerUseNodeRepl:S.available&&C,recordAndReplay:S.available&&w,sites:s,control:T,dil:E,multiBrowserTabs:_,multiWindow:D',
    replacement:
      'computerUse:S.available,computerUseNodeRepl:S.available&&C,recordAndReplay:S.available&&w,sites:s,control:T,goals:!0,dil:E,multiBrowserTabs:_,multiWindow:D',
  },
];
const composerGoalsSlashCommandPatchMarker = 'id:`goal`,triggers:';
const composerGoalsSlashCommandPatchAlternatives = [
  {
    target:
      'let e=lx(r,ux(a));c=o?.active?cx(e,o.query):e,',
    replacement:
      'let e=lx([...r,{id:`goals`,title:`Goals`,description:`Set a persistent goal for this thread`,requiresEmptyComposer:!1,Icon:PA,enabled:!0,onSelect:async()=>{n.setText(`Set this as my active goal: `),n.focus()}}],ux(a));c=o?.active?cx(e,o.query):e,',
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
  {
    target:
      'queryFn:async()=>{try{return await jt(r,e)}catch{return null}},queryKey:[...ys,t,e],staleTime:U.FIVE_MINUTES',
    replacement:
      'queryFn:async()=>{try{return await jt(r,e)}catch{try{return await jt(r,null)}catch{return null}}},queryKey:[...ys,t,e],staleTime:U.FIVE_MINUTES',
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
const modelSettingsPersistCurrentBundleTarget =
  'await Wt(`set-default-model-config-for-host`,{hostId:r,model:e,reasoningEffort:n,profile:c.profile}),await v(),await t.query.fetch(bs,{hostId:r,cwd:s})';
const modelSettingsPersistCurrentBundleReplacement =
  'let P=c.profile?`profiles.${c.profile}.`:``;await Wt(`batch-write-config-value`,{hostId:r,edits:[{keyPath:`${P}model`,value:e,mergeStrategy:`upsert`},{keyPath:`${P}model_reasoning_effort`,value:n,mergeStrategy:`upsert`}],filePath:M??null,expectedVersion:null}),await v(),await t.query.fetch(bs,{hostId:r,cwd:s})';
const modelSettingsCurrentBundleConfigPathTarget = 'v=Cwe({hostId:r,cwd:s}),y=';
const modelSettingsCurrentBundleConfigPathReplacement = 'v=Cwe({hostId:r,cwd:s}),M=Y9(r).configPath,y=';
const mainLinuxOpenTargetsPatchTarget =
  'async function jc(e,t,n){let r=Zs(t,n),i=Ac(e)??kc();if(i){if(await ho(`open`,[`-a`,i,t]),!n)return;let e=G(`zed`);if(e)try{await ho(e,r)}catch{}return}await ho(e,r)}var Mc=[uc,fc,cc,ms,Go,Qs,Ec,hc,Uo,Es,tc,vs,qo,Cs,fs,_c,Os,Ss,mc,xc,Ps,Fs,Is,Ls,Rs,zs,Bs,Vs,ic],Nc=e.mr(`open-in-targets`);';
const mainLinuxOpenTargetsPatchReplacement =
  'async function jc(e,t,n){let r=Zs(t,n),i=Ac(e)??kc();if(i){if(await ho(`open`,[`-a`,i,t]),!n)return;let e=G(`zed`);if(e)try{await ho(e,r)}catch{}return}await ho(e,r)}function linuxResolveAbsoluteCommand(e){let t=K(e);return t&&(0,a.existsSync)(t)?t:null}function linuxDesktopEntrySearchRoots(){let e=(0,n.homedir)();return[(0,r.join)(e,`.local`,`share`,`applications`),`/usr/share/applications`]}function linuxOpenTargetSearchRoots(){let e=(0,n.homedir)();return[(0,r.join)(e,`Applications`),(0,r.join)(e,`Downloads`),`/opt`]}function linuxResolveDesktopExec(e){let t=ss(e);if(!t)return null;let n=t.args[0];if(!n)return null;return linuxResolveAbsoluteCommand(n)??(()=>{let e=G(n);return e?K(e):null})()}function linuxFindDesktopEntryExec(e){let t=e.map(e=>e.toLowerCase());for(let e of linuxDesktopEntrySearchRoots()){let n;try{n=(0,a.readdirSync)(e)}catch{continue}for(let i of n){let o=i.toLowerCase();if(!o.endsWith(`.desktop`)||!t.some(e=>o.includes(e)))continue;let s=(0,r.join)(e,i),c=null;try{c=(0,a.readFileSync)(s,`utf8`)}catch{continue}let l=c.match(/^Exec=(.+)$/m)?.[1]?.trim();if(!l)continue;let u=linuxResolveDesktopExec(l.replace(/%.?/g,``).trim());if(u)return u}}return null}function linuxFindAppImage(e){let t=e.map(e=>e.toLowerCase());for(let e of linuxOpenTargetSearchRoots()){let n;try{n=(0,a.readdirSync)(e,{withFileTypes:!0})}catch{continue}for(let i of n){if(!i.isFile())continue;let n=i.name.toLowerCase();if(!n.endsWith(`.appimage`)||!t.some(e=>n.includes(e)))continue;let o=linuxResolveAbsoluteCommand((0,r.join)(e,i.name));if(o)return o}}return null}function linuxResolveEditorTarget(e,t=[],n=[]){for(let t of e){let e=G(t);if(e){let t=K(e);if(t)return t}}for(let e of t){let t=linuxResolveAbsoluteCommand(e);if(t)return t}let i=n.length>0?linuxFindDesktopEntryExec(n):null;return i??(n.length>0?linuxFindAppImage(n):null)}function linuxFileManagerDetect(){return G(`xdg-open`)??linuxResolveAbsoluteCommand(`/usr/bin/xdg-open`)}var linuxVscode={id:`vscode`,platforms:{linux:{label:`VS Code`,icon:`apps/vscode.png`,kind:`editor`,detect:()=>linuxResolveEditorTarget([`code`],[`/usr/bin/code`,`/snap/bin/code`],[`visual studio code`,`code`]),args:Ho,supportsSsh:!0}}},linuxVscodeInsiders={id:`vscodeInsiders`,platforms:{linux:{label:`VS Code Insiders`,icon:`apps/vscode-insiders.png`,kind:`editor`,detect:()=>linuxResolveEditorTarget([`code-insiders`],[`/usr/bin/code-insiders`,`/snap/bin/code-insiders`],[`insiders`,`code-insiders`]),args:Ho,supportsSsh:!0}}},linuxCursor={id:`cursor`,platforms:{linux:{label:`Cursor`,icon:`apps/cursor.png`,kind:`editor`,detect:()=>linuxResolveEditorTarget([`cursor`],[`/usr/bin/cursor`,`/opt/Cursor/cursor`,`/opt/cursor/cursor`],[`cursor`]),args:Ho,supportsSsh:!0}}},linuxWindsurf={id:`windsurf`,platforms:{linux:{label:`Windsurf`,icon:`apps/windsurf.png`,kind:`editor`,detect:()=>linuxResolveEditorTarget([`windsurf`],[`/usr/bin/windsurf`,`/opt/Windsurf/windsurf`,`/opt/windsurf/windsurf`],[`windsurf`]),args:Ho,supportsSsh:!0}}},linuxZed={id:`zed`,platforms:{linux:{label:`Zed`,icon:`apps/zed.png`,kind:`editor`,detect:()=>linuxResolveEditorTarget([`zed`],[`/usr/bin/zed`,`/opt/zed/zed`,`/opt/Zed/zed`],[`zed`]),args:Zs}}},linuxFileManager={id:`fileManager`,platforms:{linux:{label:`File Manager`,icon:`apps/file-explorer.png`,kind:`fileManager`,detect:linuxFileManagerDetect,args:e=>[e],open:async({path:e})=>bs(e)}}};var Mc=[uc,linuxVscode,fc,linuxVscodeInsiders,cc,ms,linuxCursor,Go,Qs,Ec,linuxZed,hc,linuxWindsurf,Uo,Es,tc,vs,linuxFileManager,qo,Cs,fs,_c,Os,Ss,mc,xc,Ps,Fs,Is,Ls,Rs,zs,Bs,Vs,ic],Nc=e.mr(`open-in-targets`);';
const mainLinuxOpenTargetsSimplePatchTarget =
  'function YN(e){return JN.flatMap(t=>{let n=t.platforms[e];return n?[{id:t.id,...n}]:[]})}var XN=YN(process.platform),ZN=async e=>a.shell.readShortcutLink(e);';
const mainLinuxOpenTargetsSimplePatchReplacement =
  'function YN(e){return JN.flatMap(t=>{let n=t.platforms[e];return n?[{id:t.id,...n}]:[]})}function linuxDetectCommand(e,t=[]){let r=process.env.HOME?[`${process.env.HOME}/.local/bin/${e}`]:[];for(let n of[e,...t,...r]){let e=ls(n);if(e)return e;if(n.startsWith(`/`)&&(0,u.existsSync)(n))return n}return null}function linuxEditorTarget(e,t,n,r,i=[]){return{id:e,label:t,icon:n,kind:`editor`,detect:()=>linuxDetectCommand(r[0],r.slice(1).concat(i)),args:nM,supportsSsh:!0}}var XN=process.platform===`linux`?[...YN(process.platform),linuxEditorTarget(`vscode`,`VS Code`,`apps/vscode.png`,[`code`],[`/usr/bin/code`,`/snap/bin/code`]),linuxEditorTarget(`vscodeInsiders`,`VS Code Insiders`,`apps/vscode-insiders.png`,[`code-insiders`],[`/usr/bin/code-insiders`,`/snap/bin/code-insiders`]),linuxEditorTarget(`cursor`,`Cursor`,`apps/cursor.png`,[`cursor`],[`/usr/bin/cursor`,`/opt/Cursor/cursor`,`/opt/cursor/cursor`]),linuxEditorTarget(`windsurf`,`Windsurf`,`apps/windsurf.png`,[`windsurf`],[`/usr/bin/windsurf`,`/opt/Windsurf/windsurf`,`/opt/windsurf/windsurf`]),linuxEditorTarget(`zed`,`Zed`,`apps/zed.png`,[`zed`],[`/usr/bin/zed`,`/opt/zed/zed`,`/opt/Zed/zed`]),{id:`fileManager`,label:`File Manager`,icon:`apps/file-explorer.png`,kind:`fileManager`,detect:()=>linuxDetectCommand(`xdg-open`,[`/usr/bin/xdg-open`]),args:e=>[e],open:async({path:e})=>bN(e)}]:YN(process.platform),ZN=async e=>a.shell.readShortcutLink(e);';
const mainLinuxOpenTargetsSimplePatchedWithoutUserBinTarget =
  'function YN(e){return JN.flatMap(t=>{let n=t.platforms[e];return n?[{id:t.id,...n}]:[]})}function linuxDetectCommand(e,t=[]){for(let n of[e,...t]){let e=ls(n);if(e)return e;if(n.startsWith(`/`)&&(0,u.existsSync)(n))return n}return null}function linuxEditorTarget(e,t,n,r,i=[]){return{id:e,label:t,icon:n,kind:`editor`,detect:()=>linuxDetectCommand(r[0],r.slice(1).concat(i)),args:nM,supportsSsh:!0}}var XN=process.platform===`linux`?[...YN(process.platform),linuxEditorTarget(`vscode`,`VS Code`,`apps/vscode.png`,[`code`],[`/usr/bin/code`,`/snap/bin/code`]),linuxEditorTarget(`vscodeInsiders`,`VS Code Insiders`,`apps/vscode-insiders.png`,[`code-insiders`],[`/usr/bin/code-insiders`,`/snap/bin/code-insiders`]),linuxEditorTarget(`cursor`,`Cursor`,`apps/cursor.png`,[`cursor`],[`/usr/bin/cursor`,`/opt/Cursor/cursor`,`/opt/cursor/cursor`]),linuxEditorTarget(`windsurf`,`Windsurf`,`apps/windsurf.png`,[`windsurf`],[`/usr/bin/windsurf`,`/opt/Windsurf/windsurf`,`/opt/windsurf/windsurf`]),linuxEditorTarget(`zed`,`Zed`,`apps/zed.png`,[`zed`],[`/usr/bin/zed`,`/opt/zed/zed`,`/opt/Zed/zed`]),{id:`fileManager`,label:`File Manager`,icon:`apps/file-explorer.png`,kind:`fileManager`,detect:()=>linuxDetectCommand(`xdg-open`,[`/usr/bin/xdg-open`]),args:e=>[e],open:async({path:e})=>bN(e)}]:YN(process.platform),ZN=async e=>a.shell.readShortcutLink(e);';
const mainLinuxOpenTargetsPatchAlternatives = [
  {
    target:
      'var $me=[Ime,Rme,Pme,Hpe,Epe,Gpe,wme,Jme,Vme,wpe,$pe,Dme,Kpe,Ope,Xpe,Bpe,Hme,tme,Sme,Ype,Bme,Gme,sme,cme,lme,ume,dme,fme,pme,mme,Ame];i.a(`open-in-targets`);',
    replacement:
      'var $me=[Ime,Rme,Pme,Hpe,Epe,Gpe,wme,Jme,Vme,wpe,$pe,Dme,Kpe,Ope,Xpe,Bpe,Hme,tme,Sme,Ype,Bme,Gme,sme,cme,lme,ume,dme,fme,pme,mme,Ame];i.a(`open-in-targets`);',
  },
  {
    target:
      'var Ple=[_le,yle,hle,W1,x1,J1,ole,kle,Sle,y1,r0,lle,Y1,C1,e0,H1,Cle,a0,ile,$1,xle,Ele,Wce,Gce,Kce,qce,Jce,Yce,Xce,Zce,dle];r.a(`open-in-targets`);',
    replacement:
      'function linuxResolveAbsoluteCommand(e){let t=ps(e);return t&&(0,_.existsSync)(t)?t:null}function linuxOpenTargetSearchRoots(){let e=(0,d.homedir)();return[(0,p.join)(e,`Applications`),(0,p.join)(e,`Downloads`),`/opt`]}function linuxResolveEditorTarget(e,t=[]){for(let n of[e,...t]){let e=es(n);if(e){let t=ps(e);if(t)return t}let r=linuxResolveAbsoluteCommand(n);if(r)return r}return null}var linuxVscode={id:`vscode`,platforms:{linux:{label:`VS Code`,icon:`apps/vscode.png`,kind:`editor`,detect:()=>linuxResolveEditorTarget([`code`],[`/usr/bin/code`,`/snap/bin/code`]),args:m0,supportsSsh:!0}}},linuxVscodeInsiders={id:`vscodeInsiders`,platforms:{linux:{label:`VS Code Insiders`,icon:`apps/vscode-insiders.png`,kind:`editor`,detect:()=>linuxResolveEditorTarget([`code-insiders`],[`/usr/bin/code-insiders`,`/snap/bin/code-insiders`]),args:m0,supportsSsh:!0}}},linuxCursor={id:`cursor`,platforms:{linux:{label:`Cursor`,icon:`apps/cursor.png`,kind:`editor`,detect:()=>linuxResolveEditorTarget([`cursor`],[`/usr/bin/cursor`,`/opt/Cursor/cursor`,`/opt/cursor/cursor`]),args:m0,supportsSsh:!0}}},linuxWindsurf={id:`windsurf`,platforms:{linux:{label:`Windsurf`,icon:`apps/windsurf.png`,kind:`editor`,detect:()=>linuxResolveEditorTarget([`windsurf`],[`/usr/bin/windsurf`,`/opt/Windsurf/windsurf`,`/opt/windsurf/windsurf`]),args:m0,supportsSsh:!0}}},linuxZed={id:`zed`,platforms:{linux:{label:`Zed`,icon:`apps/zed.png`,kind:`editor`,detect:()=>linuxResolveEditorTarget([`zed`],[`/usr/bin/zed`,`/opt/zed/zed`,`/opt/Zed/zed`]),args:m0}}},linuxFileManager={id:`fileManager`,platforms:{linux:{label:`File Manager`,icon:`apps/file-explorer.png`,kind:`fileManager`,detect:()=>es(`xdg-open`)??linuxResolveAbsoluteCommand(`/usr/bin/xdg-open`),args:e=>[e],open:async({path:e})=>is(`xdg-open`,[e])}}};var Ple=[_le,linuxVscode,yle,linuxVscodeInsiders,hle,W1,x1,J1,ole,kle,linuxCursor,Sle,y1,r0,linuxZed,lle,Y1,linuxWindsurf,C1,e0,H1,Cle,a0,ile,$1,linuxFileManager,xle,Ele,Wce,Gce,Kce,qce,Jce,Yce,Xce,Zce,dle];r.a(`open-in-targets`);',
  },
  {
    target:
      "var x0={id:`zed`,platforms:{darwin:{label:`Zed`,icon:`apps/zed.png`,kind:`editor`,detect:S0,args:W1,open:T0},win32:{label:`Zed`,icon:`apps/zed.png`,kind:`editor`,detect:C0,args:W1}}};function S0(){return Os(`zed`)??C$([`/Applications/Zed.app/Contents/MacOS/zed`,`/Applications/Zed Preview.app/Contents/MacOS/zed`,`/Applications/Zed Nightly.app/Contents/MacOS/zed`])??w$(`Zed`,`zed`)}function C0(){let e=Os(`zed.exe`)??Os(`zed`);return e?Vs(e):Bs([[`Zed`,`Zed.exe`]])}function w0(e){let t=e.indexOf(`.app/Contents/MacOS/`);return t===-1?null:e.slice(0,t+4)}async function T0({command:e,path:t,location:n,hostConfig:r,remoteWorkspaceRoot:i,remotePath:a}){let o=W1(t,n,r,i,a),s=o[0]??t,c=n==null?s:W1(t,null,r,i,a)[0]??s,l=w0(e);if(l){if(await Ms(`open`,[`-a`,l,c]),!n)return;let t=Os(`zed`)??e;try{await Ms(t,o)}catch{}return}await Ms(e,o)}var E0=[a0,s0,r0,a1,I$,l1,q1,x0,u0,P$,v1,X1,u1,R$,h1,r1,f0,b1,U1,m1,l0,g0,E1,D1,O1,k1,A1,j1,M1,N1,$1];r.a(`open-in-targets`);",
    replacement:
      "var x0={id:`zed`,platforms:{darwin:{label:`Zed`,icon:`apps/zed.png`,kind:`editor`,detect:S0,args:W1,open:T0},win32:{label:`Zed`,icon:`apps/zed.png`,kind:`editor`,detect:C0,args:W1}}};function S0(){return Os(`zed`)??C$([`/Applications/Zed.app/Contents/MacOS/zed`,`/Applications/Zed Preview.app/Contents/MacOS/zed`,`/Applications/Zed Nightly.app/Contents/MacOS/zed`])??w$(`Zed`,`zed`)}function C0(){let e=Os(`zed.exe`)??Os(`zed`);return e?Vs(e):Bs([[`Zed`,`Zed.exe`]])}function w0(e){let t=e.indexOf(`.app/Contents/MacOS/`);return t===-1?null:e.slice(0,t+4)}async function T0({command:e,path:t,location:n,hostConfig:r,remoteWorkspaceRoot:i,remotePath:a}){let o=W1(t,n,r,i,a),s=o[0]??t,c=n==null?s:W1(t,null,r,i,a)[0]??s,l=w0(e);if(l){if(await Ms(`open`,[`-a`,l,c]),!n)return;let t=Os(`zed`)??e;try{await Ms(t,o)}catch{}return}await Ms(e,o)}function linuxResolveAbsoluteCommand(e){let t=Vs(e);return t&&(0,h.existsSync)(t)?t:null}function linuxDesktopEntrySearchRoots(){let e=(0,u.homedir)();return[(0,d.join)(e,`.local`,`share`,`applications`),`/usr/share/applications`]}function linuxOpenTargetSearchRoots(){let e=(0,u.homedir)();return[(0,d.join)(e,`Applications`),(0,d.join)(e,`Downloads`),`/opt`]}function linuxResolveDesktopExec(e){let t=e.trim().match(/^\"([^\"]+)\"|^\\x27([^\\x27]+)\\x27|^(\\S+)/),n=t?.[1]??t?.[2]??t?.[3];if(!n)return null;return linuxResolveAbsoluteCommand(n)??(()=>{let e=Os(n);return e?Vs(e):null})()}function linuxFindDesktopEntryExec(e){let t=e.map(e=>e.toLowerCase());for(let e of linuxDesktopEntrySearchRoots()){let n;try{n=(0,h.readdirSync)(e)}catch{continue}for(let r of n){let i=r.toLowerCase();if(!i.endsWith(`.desktop`)||!t.some(e=>i.includes(e)))continue;let a=(0,d.join)(e,r),o=null;try{o=(0,h.readFileSync)(a,`utf8`)}catch{continue}let s=o.match(/^Exec=(.+)$/m)?.[1]?.trim();if(!s)continue;let c=linuxResolveDesktopExec(s.replace(/%.?/g,``).trim());if(c)return c}}return null}function linuxFindAppImage(e){let t=e.map(e=>e.toLowerCase());for(let e of linuxOpenTargetSearchRoots()){let n;try{n=(0,h.readdirSync)(e,{withFileTypes:!0})}catch{continue}for(let r of n){if(!r.isFile())continue;let n=r.name.toLowerCase();if(!n.endsWith(`.appimage`)||!t.some(e=>n.includes(e)))continue;let i=linuxResolveAbsoluteCommand((0,d.join)(e,r.name));if(i)return i}}return null}function linuxResolveEditorTarget(e,t=[],n=[]){for(let t of e){let e=Os(t);if(e){let t=Vs(e);if(t)return t}}for(let e of t){let t=linuxResolveAbsoluteCommand(e);if(t)return t}let r=n.length>0?linuxFindDesktopEntryExec(n):null;return r??(n.length>0?linuxFindAppImage(n):null)}function linuxFileManagerDetect(){return Os(`xdg-open`)??linuxResolveAbsoluteCommand(`/usr/bin/xdg-open`)}var linuxVscode={id:`vscode`,platforms:{linux:{label:`VS Code`,icon:`apps/vscode.png`,kind:`editor`,detect:()=>linuxResolveEditorTarget([`code`],[`/usr/bin/code`,`/snap/bin/code`],[`visual studio code`,`code`]),args:W1,supportsSsh:!0}}},linuxVscodeInsiders={id:`vscodeInsiders`,platforms:{linux:{label:`VS Code Insiders`,icon:`apps/vscode-insiders.png`,kind:`editor`,detect:()=>linuxResolveEditorTarget([`code-insiders`],[`/usr/bin/code-insiders`,`/snap/bin/code-insiders`],[`insiders`,`code-insiders`]),args:W1,supportsSsh:!0}}},linuxCursor={id:`cursor`,platforms:{linux:{label:`Cursor`,icon:`apps/cursor.png`,kind:`editor`,detect:()=>linuxResolveEditorTarget([`cursor`],[`/usr/bin/cursor`,`/opt/Cursor/cursor`,`/opt/cursor/cursor`],[`cursor`]),args:W1,supportsSsh:!0}}},linuxWindsurf={id:`windsurf`,platforms:{linux:{label:`Windsurf`,icon:`apps/windsurf.png`,kind:`editor`,detect:()=>linuxResolveEditorTarget([`windsurf`],[`/usr/bin/windsurf`,`/opt/Windsurf/windsurf`,`/opt/windsurf/windsurf`],[`windsurf`]),args:W1,supportsSsh:!0}}},linuxZed={id:`zed`,platforms:{linux:{label:`Zed`,icon:`apps/zed.png`,kind:`editor`,detect:()=>linuxResolveEditorTarget([`zed`],[`/usr/bin/zed`,`/opt/zed/zed`,`/opt/Zed/zed`],[`zed`]),args:W1,supportsSsh:!0}}},linuxFileManager={id:`fileManager`,platforms:{linux:{label:`File Manager`,icon:`apps/file-explorer.png`,kind:`fileManager`,detect:linuxFileManagerDetect,args:e=>[e],open:async({path:e})=>Ms(`xdg-open`,[e])}}};var E0=[linuxVscode,linuxVscodeInsiders,linuxCursor,linuxWindsurf,linuxZed,linuxFileManager,a0,s0,r0,a1,I$,l1,q1,x0,u0,P$,v1,X1,u1,R$,h1,r1,f0,b1,U1,m1,l0,g0,E1,D1,O1,k1,A1,j1,M1,N1,$1];r.a(`open-in-targets`);",
  },
  {
    target:
      'var NN=[fN,mN,uN,pM,Wj,_M,eN,ON,_N,Hj,EM,rN,vM,Kj,CM,dM,yN,OM,SM,gN,CN,PM,FM,IM,LM,RM,zM,BM,VM,oN];r.a(`open-in-targets`);',
    replacement:
      'function linuxDetectCommand(e,t=[]){for(let n of[e,...t]){let e=ks(n);if(e)return e;if(n.startsWith(`/`)&&(0,p.existsSync)(n))return n}return null}var linuxVscode={id:`vscode`,platforms:{linux:{label:`VS Code`,icon:`apps/vscode.png`,kind:`editor`,detect:()=>linuxDetectCommand(`code`,[`/usr/bin/code`,`/snap/bin/code`]),args:e=>[e],supportsSsh:!0}}},linuxVscodeInsiders={id:`vscodeInsiders`,platforms:{linux:{label:`VS Code Insiders`,icon:`apps/vscode-insiders.png`,kind:`editor`,detect:()=>linuxDetectCommand(`code-insiders`,[`/usr/bin/code-insiders`,`/snap/bin/code-insiders`]),args:e=>[e],supportsSsh:!0}}},linuxCursor={id:`cursor`,platforms:{linux:{label:`Cursor`,icon:`apps/cursor.png`,kind:`editor`,detect:()=>linuxDetectCommand(`cursor`,[`/usr/bin/cursor`,`/opt/Cursor/cursor`,`/opt/cursor/cursor`]),args:e=>[e],supportsSsh:!0}}},linuxWindsurf={id:`windsurf`,platforms:{linux:{label:`Windsurf`,icon:`apps/windsurf.png`,kind:`editor`,detect:()=>linuxDetectCommand(`windsurf`,[`/usr/bin/windsurf`,`/opt/Windsurf/windsurf`]),args:e=>[e],supportsSsh:!0}}},linuxZed={id:`zed`,platforms:{linux:{label:`Zed`,icon:`apps/zed.png`,kind:`editor`,detect:()=>linuxDetectCommand(`zed`,[`/usr/bin/zed`,`/opt/zed/zed`,`/opt/Zed/zed`]),args:e=>[e],supportsSsh:!0}}},linuxFileManager={id:`fileManager`,platforms:{linux:{label:`File Manager`,icon:`apps/file-explorer.png`,kind:`fileManager`,detect:()=>linuxDetectCommand(`xdg-open`,[`/usr/bin/xdg-open`]),args:e=>[e]}}};var NN=[linuxVscode,linuxVscodeInsiders,linuxCursor,linuxWindsurf,linuxZed,linuxFileManager,fN,mN,uN,pM,Wj,_M,eN,ON,_N,Hj,EM,rN,vM,Kj,CM,dM,yN,OM,SM,gN,CN,PM,FM,IM,LM,RM,zM,BM,VM,oN];r.a(`open-in-targets`);',
  },
  {
    target:
      'var MN=[dN,pN,lN,fM,Uj,gM,$M,DN,gN,Vj,TM,nN,_M,Gj,SM,uM,vN,DM,xM,hN,SN,NM,PM,FM,IM,LM,RM,zM,BM,aN];r.a(`open-in-targets`);',
    replacement:
      'function linuxResolveAbsoluteCommand(e){let t=Us(e);return t&&(0,p.existsSync)(t)?t:null}function linuxResolveEditorTarget(e,t=[]){let n=process.env.HOME?[`${process.env.HOME}/.local/bin/${e[0]}`]:[];for(let r of[...e,...t,...n]){let e=As(r);if(e){let t=Us(e);if(t)return t}let n=linuxResolveAbsoluteCommand(r);if(n)return n}return null}function linuxFileManagerDetect(){return As(`xdg-open`)??linuxResolveAbsoluteCommand(`/usr/bin/xdg-open`)}var linuxVscode={id:`vscode`,platforms:{linux:{label:`VS Code`,icon:`apps/vscode.png`,kind:`editor`,detect:()=>linuxResolveEditorTarget([`code`],[`/usr/bin/code`,`/snap/bin/code`]),args:Bj,supportsSsh:!0}}},linuxVscodeInsiders={id:`vscodeInsiders`,platforms:{linux:{label:`VS Code Insiders`,icon:`apps/vscode-insiders.png`,kind:`editor`,detect:()=>linuxResolveEditorTarget([`code-insiders`],[`/usr/bin/code-insiders`,`/snap/bin/code-insiders`]),args:Bj,supportsSsh:!0}}},linuxCursor={id:`cursor`,platforms:{linux:{label:`Cursor`,icon:`apps/cursor.png`,kind:`editor`,detect:()=>linuxResolveEditorTarget([`cursor`],[`/usr/bin/cursor`,`/opt/Cursor/cursor`,`/opt/cursor/cursor`]),args:Bj,supportsSsh:!0}}},linuxWindsurf={id:`windsurf`,platforms:{linux:{label:`Windsurf`,icon:`apps/windsurf.png`,kind:`editor`,detect:()=>linuxResolveEditorTarget([`windsurf`],[`/usr/bin/windsurf`,`/opt/Windsurf/windsurf`,`/opt/windsurf/windsurf`]),args:Bj,supportsSsh:!0}}},linuxZed={id:`zed`,platforms:{linux:{label:`Zed`,icon:`apps/zed.png`,kind:`editor`,detect:()=>linuxResolveEditorTarget([`zed`],[`/usr/bin/zed`,`/opt/zed/zed`,`/opt/Zed/zed`]),args:XM,supportsSsh:!0}}},linuxFileManager={id:`fileManager`,platforms:{linux:{label:`File Manager`,icon:`apps/file-explorer.png`,kind:`fileManager`,detect:linuxFileManagerDetect,args:e=>[e],open:async({path:e})=>{await Ps(`xdg-open`,[e])}}}};var MN=[linuxVscode,dN,linuxVscodeInsiders,pN,lN,fM,Uj,linuxCursor,gM,$M,linuxZed,DN,linuxWindsurf,gN,Vj,TM,nN,_M,Gj,SM,uM,vN,DM,xM,hN,SN,NM,PM,FM,IM,LM,RM,zM,BM,linuxFileManager,aN];r.a(`open-in-targets`);',
  },
  {
    target:
      'var bj={id:`zed`,platforms:{darwin:{label:`Zed`,icon:`apps/zed.png`,kind:`editor`,detect:xj,args:GA},win32:{label:`Zed`,icon:`apps/zed.png`,kind:`editor`,detect:Sj,args:GA}}};function xj(){return vo(`zed`)??xk([`/Applications/Zed.app/Contents/MacOS/zed`,`/Applications/Zed Preview.app/Contents/MacOS/zed`,`/Applications/Zed Nightly.app/Contents/MacOS/zed`])??Sk(`Zed`,`zed`)}function Sj(){let e=vo(`zed.exe`)??vo(`zed`);return e?jo(e):Ao([[`Zed`,`Zed.exe`]])}var Cj=[ij,oj,nj,sA,Rk,dA,KA,bj,lj,Ik,bA,YA,fA,Bk,_A,aA,dj,SA,gA,cj,hj,OA,kA,AA,jA,MA,NA,PA,FA,QA],wj=t.Ur(`open-in-targets`);',
    replacement:
      'var bj={id:`zed`,platforms:{darwin:{label:`Zed`,icon:`apps/zed.png`,kind:`editor`,detect:xj,args:GA},win32:{label:`Zed`,icon:`apps/zed.png`,kind:`editor`,detect:Sj,args:GA}}};function xj(){return vo(`zed`)??xk([`/Applications/Zed.app/Contents/MacOS/zed`,`/Applications/Zed Preview.app/Contents/MacOS/zed`,`/Applications/Zed Nightly.app/Contents/MacOS/zed`])??Sk(`Zed`,`zed`)}function Sj(){let e=vo(`zed.exe`)??vo(`zed`);return e?jo(e):Ao([[`Zed`,`Zed.exe`]])}function linuxResolveAbsoluteCommand(e){let t=jo(e);return t&&(0,s.existsSync)(t)?t:null}function linuxDesktopEntrySearchRoots(){let e=(0,i.homedir)();return[(0,a.join)(e,`.local`,`share`,`applications`),`/usr/share/applications`]}function linuxOpenTargetSearchRoots(){let e=(0,i.homedir)();return[(0,a.join)(e,`Applications`),(0,a.join)(e,`Downloads`),`/opt`]}function linuxResolveDesktopExec(e){let t=e.trim().match(/^"([^"]+)"|^\\x27([^\\x27]+)\\x27|^(\\S+)/),n=t?.[1]??t?.[2]??t?.[3];if(!n)return null;return linuxResolveAbsoluteCommand(n)??(()=>{let e=vo(n);return e?jo(e):null})()}function linuxFindDesktopEntryExec(e){let t=e.map(e=>e.toLowerCase());for(let e of linuxDesktopEntrySearchRoots()){let n;try{n=(0,s.readdirSync)(e)}catch{continue}for(let r of n){let i=r.toLowerCase();if(!i.endsWith(`.desktop`)||!t.some(e=>i.includes(e)))continue;let o=(0,a.join)(e,r),c=null;try{c=(0,s.readFileSync)(o,`utf8`)}catch{continue}let l=c.match(/^Exec=(.+)$/m)?.[1]?.trim();if(!l)continue;let u=linuxResolveDesktopExec(l.replace(/%.?/g,``).trim());if(u)return u}}return null}function linuxFindAppImage(e){let t=e.map(e=>e.toLowerCase());for(let e of linuxOpenTargetSearchRoots()){let n;try{n=(0,s.readdirSync)(e,{withFileTypes:!0})}catch{continue}for(let r of n){if(!r.isFile())continue;let n=r.name.toLowerCase();if(!n.endsWith(`.appimage`)||!t.some(e=>n.includes(e)))continue;let i=linuxResolveAbsoluteCommand((0,a.join)(e,r.name));if(i)return i}}return null}function linuxResolveEditorTarget(e,t=[],n=[]){for(let t of e){let e=vo(t);if(e){let t=jo(e);if(t)return t}}for(let e of t){let t=linuxResolveAbsoluteCommand(e);if(t)return t}let r=n.length>0?linuxFindDesktopEntryExec(n):null;return r??(n.length>0?linuxFindAppImage(n):null)}function linuxFileManagerDetect(){return vo(`xdg-open`)??linuxResolveAbsoluteCommand(`/usr/bin/xdg-open`)}var linuxVscode={id:`vscode`,platforms:{linux:{label:`VS Code`,icon:`apps/vscode.png`,kind:`editor`,detect:()=>linuxResolveEditorTarget([`code`],[`/usr/bin/code`,`/snap/bin/code`],[`visual studio code`,`code`]),args:Fk,supportsSsh:!0}}},linuxVscodeInsiders={id:`vscodeInsiders`,platforms:{linux:{label:`VS Code Insiders`,icon:`apps/vscode-insiders.png`,kind:`editor`,detect:()=>linuxResolveEditorTarget([`code-insiders`],[`/usr/bin/code-insiders`,`/snap/bin/code-insiders`],[`insiders`,`code-insiders`]),args:Fk,supportsSsh:!0}}},linuxCursor={id:`cursor`,platforms:{linux:{label:`Cursor`,icon:`apps/cursor.png`,kind:`editor`,detect:()=>linuxResolveEditorTarget([`cursor`],[`/usr/bin/cursor`,`/opt/Cursor/cursor`,`/opt/cursor/cursor`],[`cursor`]),args:Fk,supportsSsh:!0}}},linuxWindsurf={id:`windsurf`,platforms:{linux:{label:`Windsurf`,icon:`apps/windsurf.png`,kind:`editor`,detect:()=>linuxResolveEditorTarget([`windsurf`],[`/usr/bin/windsurf`,`/opt/Windsurf/windsurf`,`/opt/windsurf/windsurf`],[`windsurf`]),args:Fk,supportsSsh:!0}}},linuxZed={id:`zed`,platforms:{linux:{label:`Zed`,icon:`apps/zed.png`,kind:`editor`,detect:()=>linuxResolveEditorTarget([`zed`],[`/usr/bin/zed`,`/opt/zed/zed`,`/opt/Zed/zed`],[`zed`]),args:GA}}},linuxFileManager={id:`fileManager`,platforms:{linux:{label:`File Manager`,icon:`apps/file-explorer.png`,kind:`fileManager`,detect:linuxFileManagerDetect,args:e=>[e],open:async({path:e})=>ZA(e)}}};var Cj=[linuxVscode,ij,linuxVscodeInsiders,oj,nj,sA,Rk,dA,linuxCursor,KA,bj,linuxZed,lj,linuxWindsurf,Ik,bA,YA,linuxFileManager,fA,Bk,_A,aA,dj,SA,gA,cj,hj,OA,kA,AA,jA,MA,NA,PA,FA,QA],wj=t.Ur(`open-in-targets`);',
  },
  {
    target: mainLinuxOpenTargetsPatchTarget,
    replacement: mainLinuxOpenTargetsPatchReplacement,
  },
  {
    target:
      'var Wg={id:`zed`,platforms:{darwin:{label:`Zed`,icon:`apps/zed.png`,kind:`editor`,detect:Gg,args:hg,open:async({command:e,path:t,location:n})=>{await Yg(e,t,n)}},win32:{label:`Zed`,icon:`apps/zed.png`,kind:`editor`,detect:Kg,args:hg}}};function Gg(){return q(`zed`)??_m([`/Applications/Zed.app/Contents/MacOS/zed`,`/Applications/Zed Preview.app/Contents/MacOS/zed`,`/Applications/Zed Nightly.app/Contents/MacOS/zed`])??vm(`Zed`,`zed`)}function Kg(){let e=q(`zed.exe`)??q(`zed`);return e?Bm(e):zm([[`Zed`,`Zed.exe`]])}function qg(){return ym(`Zed`)??_m([`/Applications/Zed.app`,`/Applications/Zed Preview.app`,`/Applications/Zed Nightly.app`])}function Jg(e){let t=e.indexOf(`.app/Contents/MacOS/`);return t===-1?null:e.slice(0,t+4)}async function Yg(e,t,n){let r=hg(t,n),i=Jg(e)??qg();if(i){if(await jm(`open`,[`-a`,i,t]),!n)return;let e=q(`zed`);if(e)try{await jm(e,r)}catch{}return}await jm(e,r)}var Xg=[Og,Ag,Eg,jh,ch,Fh,gg,Wg,Ng,oh,Wh,yg,Ih,uh,Vh,kh,Fg,Kh,Bh,Mg,zg,Qh,$h,eg,tg,ng,rg,ig,ag,Sg],Zg=t.Pr(`open-in-targets`);',
    replacement:
      'var Wg={id:`zed`,platforms:{darwin:{label:`Zed`,icon:`apps/zed.png`,kind:`editor`,detect:Gg,args:hg,open:async({command:e,path:t,location:n})=>{await Yg(e,t,n)}},win32:{label:`Zed`,icon:`apps/zed.png`,kind:`editor`,detect:Kg,args:hg}}};function Gg(){return q(`zed`)??_m([`/Applications/Zed.app/Contents/MacOS/zed`,`/Applications/Zed Preview.app/Contents/MacOS/zed`,`/Applications/Zed Nightly.app/Contents/MacOS/zed`])??vm(`Zed`,`zed`)}function Kg(){let e=q(`zed.exe`)??q(`zed`);return e?Bm(e):zm([[`Zed`,`Zed.exe`]])}function qg(){return ym(`Zed`)??_m([`/Applications/Zed.app`,`/Applications/Zed Preview.app`,`/Applications/Zed Nightly.app`])}function Jg(e){let t=e.indexOf(`.app/Contents/MacOS/`);return t===-1?null:e.slice(0,t+4)}async function Yg(e,t,n){let r=hg(t,n),i=Jg(e)??qg();if(i){if(await jm(`open`,[`-a`,i,t]),!n)return;let e=q(`zed`);if(e)try{await jm(e,r)}catch{}return}await jm(e,r)}function linuxResolveAbsoluteCommand(e){let t=Bm(e);return t&&(0,o.existsSync)(t)?t:null}function linuxDesktopEntrySearchRoots(){let e=(0,r.homedir)();return[(0,i.join)(e,`.local`,`share`,`applications`),`/usr/share/applications`]}function linuxOpenTargetSearchRoots(){let e=(0,r.homedir)();return[(0,i.join)(e,`Applications`),(0,i.join)(e,`Downloads`),`/opt`]}function linuxResolveDesktopExec(e){let t=e.trim().match(/^"([^"]+)"|^\\x27([^\\x27]+)\\x27|^(\\S+)/),n=t?.[1]??t?.[2]??t?.[3];if(!n)return null;return linuxResolveAbsoluteCommand(n)??(()=>{let e=q(n);return e?Bm(e):null})()}function linuxFindDesktopEntryExec(e){let t=e.map(e=>e.toLowerCase());for(let e of linuxDesktopEntrySearchRoots()){let n;try{n=(0,o.readdirSync)(e)}catch{continue}for(let r of n){let a=r.toLowerCase();if(!a.endsWith(`.desktop`)||!t.some(e=>a.includes(e)))continue;let s=(0,i.join)(e,r),c=null;try{c=(0,o.readFileSync)(s,`utf8`)}catch{continue}let l=c.match(/^Exec=(.+)$/m)?.[1]?.trim();if(!l)continue;let u=linuxResolveDesktopExec(l.replace(/%.?/g,``).trim());if(u)return u}}return null}function linuxFindAppImage(e){let t=e.map(e=>e.toLowerCase());for(let e of linuxOpenTargetSearchRoots()){let n;try{n=(0,o.readdirSync)(e,{withFileTypes:!0})}catch{continue}for(let r of n){if(!r.isFile())continue;let n=r.name.toLowerCase();if(!n.endsWith(`.appimage`)||!t.some(e=>n.includes(e)))continue;let a=linuxResolveAbsoluteCommand((0,i.join)(e,r.name));if(a)return a}}return null}function linuxResolveEditorTarget(e,t=[],n=[]){for(let t of e){let e=q(t);if(e){let t=Bm(e);if(t)return t}}for(let e of t){let t=linuxResolveAbsoluteCommand(e);if(t)return t}let r=n.length>0?linuxFindDesktopEntryExec(n):null;return r??(n.length>0?linuxFindAppImage(n):null)}function linuxFileManagerDetect(){return q(`xdg-open`)??linuxResolveAbsoluteCommand(`/usr/bin/xdg-open`)}var linuxVscode={id:`vscode`,platforms:{linux:{label:`VS Code`,icon:`apps/vscode.png`,kind:`editor`,detect:()=>linuxResolveEditorTarget([`code`],[`/usr/bin/code`,`/snap/bin/code`],[`visual studio code`,`code`]),args:hg,supportsSsh:!0}}},linuxVscodeInsiders={id:`vscodeInsiders`,platforms:{linux:{label:`VS Code Insiders`,icon:`apps/vscode-insiders.png`,kind:`editor`,detect:()=>linuxResolveEditorTarget([`code-insiders`],[`/usr/bin/code-insiders`,`/snap/bin/code-insiders`],[`insiders`,`code-insiders`]),args:hg,supportsSsh:!0}}},linuxCursor={id:`cursor`,platforms:{linux:{label:`Cursor`,icon:`apps/cursor.png`,kind:`editor`,detect:()=>linuxResolveEditorTarget([`cursor`],[`/usr/bin/cursor`,`/opt/Cursor/cursor`,`/opt/cursor/cursor`],[`cursor`]),args:hg,supportsSsh:!0}}},linuxWindsurf={id:`windsurf`,platforms:{linux:{label:`Windsurf`,icon:`apps/windsurf.png`,kind:`editor`,detect:()=>linuxResolveEditorTarget([`windsurf`],[`/usr/bin/windsurf`,`/opt/Windsurf/windsurf`,`/opt/windsurf/windsurf`],[`windsurf`]),args:hg,supportsSsh:!0}}},linuxZed={id:`zed`,platforms:{linux:{label:`Zed`,icon:`apps/zed.png`,kind:`editor`,detect:()=>linuxResolveEditorTarget([`zed`],[`/usr/bin/zed`,`/opt/zed/zed`,`/opt/Zed/zed`],[`zed`]),args:hg}}},linuxFileManager={id:`fileManager`,platforms:{linux:{label:`File Manager`,icon:`apps/file-explorer.png`,kind:`fileManager`,detect:linuxFileManagerDetect,args:e=>[e],open:async({path:e})=>xg(e)}}};var Xg=[linuxVscode,Og,linuxVscodeInsiders,Ag,Eg,jh,ch,Fh,gg,linuxCursor,Wg,linuxZed,Ng,linuxWindsurf,oh,Wh,yg,linuxFileManager,Ih,uh,Vh,kh,Fg,Kh,Bh,Mg,zg,Qh,$h,eg,tg,ng,rg,ig,ag,Sg],Zg=t.Pr(`open-in-targets`);',
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
  {
    target:
      'var Hg={id:`zed`,platforms:{darwin:{label:`Zed`,icon:`apps/zed.png`,kind:`editor`,detect:Ug,args:pg,open:async({command:e,path:t,location:n})=>{await qg(e,t,n)}},win32:{label:`Zed`,icon:`apps/zed.png`,kind:`editor`,detect:Wg,args:pg}}};function Ug(){return K(`zed`)??hm([`/Applications/Zed.app/Contents/MacOS/zed`,`/Applications/Zed Preview.app/Contents/MacOS/zed`,`/Applications/Zed Nightly.app/Contents/MacOS/zed`])??gm(`Zed`,`zed`)}function Wg(){let e=K(`zed.exe`)??K(`zed`);return e?Rm(e):Lm([[`Zed`,`Zed.exe`]])}function Gg(){return _m(`Zed`)??hm([`/Applications/Zed.app`,`/Applications/Zed Preview.app`,`/Applications/Zed Nightly.app`])}function Kg(e){let t=e.indexOf(`.app/Contents/MacOS/`);return t===-1?null:e.slice(0,t+4)}async function qg(e,t,n){let r=pg(t,n),i=Kg(e)??Gg();if(i){if(await km(`open`,[`-a`,i,t]),!n)return;let e=K(`zed`);if(e)try{await km(e,r)}catch{}return}await km(e,r)}var Jg=[Eg,Og,wg,kh,oh,Nh,mg,Hg,jg,ih,Hh,_g,Ph,ch,zh,Dh,Ng,Wh,Rh,Ag,Lg,Xh,Zh,Qh,$h,eg,tg,ng,rg,bg],Yg=t.Pr(`open-in-targets`);',
    replacement:
      'var Hg={id:`zed`,platforms:{darwin:{label:`Zed`,icon:`apps/zed.png`,kind:`editor`,detect:Ug,args:pg,open:async({command:e,path:t,location:n})=>{await qg(e,t,n)}},win32:{label:`Zed`,icon:`apps/zed.png`,kind:`editor`,detect:Wg,args:pg}}};function Ug(){return K(`zed`)??hm([`/Applications/Zed.app/Contents/MacOS/zed`,`/Applications/Zed Preview.app/Contents/MacOS/zed`,`/Applications/Zed Nightly.app/Contents/MacOS/zed`])??gm(`Zed`,`zed`)}function Wg(){let e=K(`zed.exe`)??K(`zed`);return e?Rm(e):Lm([[`Zed`,`Zed.exe`]])}function Gg(){return _m(`Zed`)??hm([`/Applications/Zed.app`,`/Applications/Zed Preview.app`,`/Applications/Zed Nightly.app`])}function Kg(e){let t=e.indexOf(`.app/Contents/MacOS/`);return t===-1?null:e.slice(0,t+4)}async function qg(e,t,n){let r=pg(t,n),i=Kg(e)??Gg();if(i){if(await km(`open`,[`-a`,i,t]),!n)return;let e=K(`zed`);if(e)try{await km(e,r)}catch{}return}await km(e,r)}function linuxResolveAbsoluteCommand(e){let t=Rm(e);return t&&(0,o.existsSync)(t)?t:null}function linuxDesktopEntrySearchRoots(){let e=(0,r.homedir)();return[(0,i.join)(e,`.local`,`share`,`applications`),`/usr/share/applications`]}function linuxOpenTargetSearchRoots(){let e=(0,r.homedir)();return[(0,i.join)(e,`Applications`),(0,i.join)(e,`Downloads`),`/opt`]}function linuxResolveDesktopExec(e){let n;try{n=t.Mn(e)}catch{return null}let r=n.at(0);if(!r)return null;return linuxResolveAbsoluteCommand(r)??(()=>{let e=K(r);return e?Rm(e):null})()}function linuxFindDesktopEntryExec(e){let t=e.map(e=>e.toLowerCase());for(let e of linuxDesktopEntrySearchRoots()){let n;try{n=(0,o.readdirSync)(e)}catch{continue}for(let r of n){let a=r.toLowerCase();if(!a.endsWith(`.desktop`)||!t.some(e=>a.includes(e)))continue;let s=(0,i.join)(e,r),c=null;try{c=(0,o.readFileSync)(s,`utf8`)}catch{continue}let l=c.match(/^Exec=(.+)$/m)?.[1]?.trim();if(!l)continue;let u=linuxResolveDesktopExec(l.replace(/%.?/g,``).trim());if(u)return u}}return null}function linuxFindAppImage(e){let t=e.map(e=>e.toLowerCase());for(let e of linuxOpenTargetSearchRoots()){let n;try{n=(0,o.readdirSync)(e,{withFileTypes:!0})}catch{continue}for(let r of n){if(!r.isFile())continue;let n=r.name.toLowerCase();if(!n.endsWith(`.appimage`)||!t.some(e=>n.includes(e)))continue;let a=linuxResolveAbsoluteCommand((0,i.join)(e,r.name));if(a)return a}}return null}function linuxResolveEditorTarget(e,t=[],n=[]){for(let t of e){let e=K(t);if(e){let t=Rm(e);if(t)return t}}for(let e of t){let t=linuxResolveAbsoluteCommand(e);if(t)return t}let r=n.length>0?linuxFindDesktopEntryExec(n):null;return r??(n.length>0?linuxFindAppImage(n):null)}function linuxFileManagerDetect(){return K(`xdg-open`)??linuxResolveAbsoluteCommand(`/usr/bin/xdg-open`)}var linuxVscode={id:`vscode`,platforms:{linux:{label:`VS Code`,icon:`apps/vscode.png`,kind:`editor`,detect:()=>linuxResolveEditorTarget([`code`],[`/usr/bin/code`,`/snap/bin/code`],[`visual studio code`,`code`]),args:rh,supportsSsh:!0}}},linuxVscodeInsiders={id:`vscodeInsiders`,platforms:{linux:{label:`VS Code Insiders`,icon:`apps/vscode-insiders.png`,kind:`editor`,detect:()=>linuxResolveEditorTarget([`code-insiders`],[`/usr/bin/code-insiders`,`/snap/bin/code-insiders`],[`insiders`,`code-insiders`]),args:rh,supportsSsh:!0}}},linuxCursor={id:`cursor`,platforms:{linux:{label:`Cursor`,icon:`apps/cursor.png`,kind:`editor`,detect:()=>linuxResolveEditorTarget([`cursor`],[`/usr/bin/cursor`,`/opt/Cursor/cursor`,`/opt/cursor/cursor`],[`cursor`]),args:rh,supportsSsh:!0}}},linuxWindsurf={id:`windsurf`,platforms:{linux:{label:`Windsurf`,icon:`apps/windsurf.png`,kind:`editor`,detect:()=>linuxResolveEditorTarget([`windsurf`],[`/usr/bin/windsurf`,`/opt/Windsurf/windsurf`,`/opt/windsurf/windsurf`],[`windsurf`]),args:rh,supportsSsh:!0}}},linuxZed={id:`zed`,platforms:{linux:{label:`Zed`,icon:`apps/zed.png`,kind:`editor`,detect:()=>linuxResolveEditorTarget([`zed`],[`/usr/bin/zed`,`/opt/zed/zed`,`/opt/Zed/zed`],[`zed`]),args:pg}}},linuxFileManager={id:`fileManager`,platforms:{linux:{label:`File Manager`,icon:`apps/file-explorer.png`,kind:`fileManager`,detect:linuxFileManagerDetect,args:e=>[e],open:async({path:e})=>Ih(e)}}};var Jg=[Eg,Og,wg,kh,oh,linuxVscode,Nh,linuxVscodeInsiders,mg,linuxCursor,Hg,linuxZed,jg,linuxWindsurf,ih,Hh,_g,linuxFileManager,Ph,ch,zh,Dh,Ng,Wh,Rh,Ag,Lg,Xh,Zh,Qh,$h,eg,tg,ng,rg,bg],Yg=t.Pr(`open-in-targets`);',
  },
  {
    target:
      'var vE=[XT,QT,JT,$w,Aw,rT,RT,fE,tE,Ow,fT,VT,iT,Mw,lT,Zw,rE,mT,cT,eE,sE,bT,xT,ST,CT,wT,TT,ET,DT,WT],yE=t.Xr(`open-in-targets`);',
    replacement:
      'function linuxResolveAbsoluteCommand(e){let t=Tm(e);return t&&(0,o.existsSync)(t)?t:null}function linuxDesktopEntrySearchRoots(){let e=(0,r.homedir)();return[(0,i.join)(e,`.local`,`share`,`applications`),`/usr/share/applications`]}function linuxOpenTargetSearchRoots(){let e=(0,r.homedir)();return[(0,i.join)(e,`Applications`),(0,i.join)(e,`Downloads`),`/opt`]}function linuxFindDesktopEntryExec(e){let t=e.map(e=>e.toLowerCase());for(let e of linuxDesktopEntrySearchRoots()){let n;try{n=(0,o.readdirSync)(e)}catch{continue}for(let r of n){let a=r.toLowerCase();if(!a.endsWith(`.desktop`)||!t.some(e=>a.includes(e)))continue;let s=(0,i.join)(e,r),c=null;try{c=(0,o.readFileSync)(s,`utf8`)}catch{continue}let l=c.match(/^Exec=(.+)$/m)?.[1]?.trim();if(!l)continue;let u=l.replace(/%.?/g,``).trim().split(/\\s+/)[0];if(!u)continue;let d=linuxResolveAbsoluteCommand(u)??(()=>{let e=fm(u);return e?Tm(e):null})();if(d)return d}}return null}function linuxFindAppImage(e){let t=e.map(e=>e.toLowerCase());for(let e of linuxOpenTargetSearchRoots()){let n;try{n=(0,o.readdirSync)(e,{withFileTypes:!0})}catch{continue}for(let r of n){if(!r.isFile())continue;let n=r.name.toLowerCase();if(!n.endsWith(`.appimage`)||!t.some(e=>n.includes(e)))continue;let a=linuxResolveAbsoluteCommand((0,i.join)(e,r.name));if(a)return a}}return null}function linuxResolveEditorTarget(e,t=[],n=[]){for(let t of e){let e=fm(t);if(e){let t=Tm(e);if(t)return t}}for(let e of t){let t=linuxResolveAbsoluteCommand(e);if(t)return t}let r=n.length>0?linuxFindDesktopEntryExec(n):null;return r??(n.length>0?linuxFindAppImage(n):null)}function linuxFileManagerDetect(){return fm(`xdg-open`)??linuxResolveAbsoluteCommand(`/usr/bin/xdg-open`)}var linuxVscode={id:`vscode`,platforms:{linux:{label:`VS Code`,icon:`apps/vscode.png`,kind:`editor`,detect:()=>linuxResolveEditorTarget([`code`],[`/usr/bin/code`,`/snap/bin/code`],[`visual studio code`,`code`]),args:Dw,supportsSsh:!0}}},linuxVscodeInsiders={id:`vscodeInsiders`,platforms:{linux:{label:`VS Code Insiders`,icon:`apps/vscode-insiders.png`,kind:`editor`,detect:()=>linuxResolveEditorTarget([`code-insiders`],[`/usr/bin/code-insiders`,`/snap/bin/code-insiders`],[`insiders`,`code-insiders`]),args:Dw,supportsSsh:!0}}},linuxCursor={id:`cursor`,platforms:{linux:{label:`Cursor`,icon:`apps/cursor.png`,kind:`editor`,detect:()=>linuxResolveEditorTarget([`cursor`],[`/usr/bin/cursor`,`/opt/Cursor/cursor`,`/opt/cursor/cursor`],[`cursor`]),args:Dw,supportsSsh:!0}}},linuxWindsurf={id:`windsurf`,platforms:{linux:{label:`Windsurf`,icon:`apps/windsurf.png`,kind:`editor`,detect:()=>linuxResolveEditorTarget([`windsurf`],[`/usr/bin/windsurf`,`/opt/Windsurf/windsurf`,`/opt/windsurf/windsurf`],[`windsurf`]),args:Dw,supportsSsh:!0}}},linuxZed={id:`zed`,platforms:{linux:{label:`Zed`,icon:`apps/zed.png`,kind:`editor`,detect:()=>linuxResolveEditorTarget([`zed`],[`/usr/bin/zed`,`/opt/zed/zed`,`/opt/Zed/zed`],[`zed`]),args:LT}}},linuxFileManager={id:`fileManager`,platforms:{linux:{label:`File Manager`,icon:`apps/file-explorer.png`,kind:`fileManager`,detect:linuxFileManagerDetect,args:e=>[e],open:async({path:e})=>UT(e)}}};var vE=[linuxVscode,XT,linuxVscodeInsiders,QT,JT,$w,Aw,rT,RT,linuxZed,fE,linuxWindsurf,tE,Ow,linuxCursor,fT,VT,linuxFileManager,iT,Mw,lT,Zw,rE,mT,cT,eE,sE,bT,xT,ST,CT,wT,TT,ET,DT,WT],yE=t.Xr(`open-in-targets`);',
  },
  {
    target:
      'var cD=[BE,HE,RE,UT,bT,qT,OE,nD,GE,vT,nE,jE,JT,ST,$T,VT,qE,iE,QT,WE,ZE,uE,dE,fE,pE,mE,hE,gE,_E,PE],lD=t.ti(`open-in-targets`);',
    replacement:
      'function linuxResolveAbsoluteCommand(e){let t=Ji(e);return t&&(0,o.existsSync)(t)?t:null}function linuxDesktopEntrySearchRoots(){let e=(0,r.homedir)();return[(0,i.join)(e,`.local`,`share`,`applications`),`/usr/share/applications`]}function linuxOpenTargetSearchRoots(){let e=(0,r.homedir)();return[(0,i.join)(e,`Applications`),(0,i.join)(e,`Downloads`),`/opt`]}function linuxFindDesktopEntryExec(e){let t=e.map(e=>e.toLowerCase());for(let e of linuxDesktopEntrySearchRoots()){let n;try{n=(0,o.readdirSync)(e)}catch{continue}for(let r of n){let a=r.toLowerCase();if(!a.endsWith(`.desktop`)||!t.some(e=>a.includes(e)))continue;let s=(0,i.join)(e,r),c=null;try{c=(0,o.readFileSync)(s,`utf8`)}catch{continue}let l=c.match(/^Exec=(.+)$/m)?.[1]?.trim();if(!l)continue;let u=l.replace(/%.?/g,``).trim().split(/\\s+/)[0];if(!u)continue;let d=linuxResolveAbsoluteCommand(u)??(()=>{let e=Fi(u);return e?Ji(e):null})();if(d)return d}}return null}function linuxFindAppImage(e){let t=e.map(e=>e.toLowerCase());for(let e of linuxOpenTargetSearchRoots()){let n;try{n=(0,o.readdirSync)(e,{withFileTypes:!0})}catch{continue}for(let r of n){if(!r.isFile())continue;let n=r.name.toLowerCase();if(!n.endsWith(`.appimage`)||!t.some(e=>n.includes(e)))continue;let a=linuxResolveAbsoluteCommand((0,i.join)(e,r.name));if(a)return a}}return null}function linuxResolveEditorTarget(e,t=[],n=[]){for(let t of e){let e=Fi(t);if(e){let t=Ji(e);if(t)return t}}for(let e of t){let t=linuxResolveAbsoluteCommand(e);if(t)return t}let r=n.length>0?linuxFindDesktopEntryExec(n):null;return r??(n.length>0?linuxFindAppImage(n):null)}function linuxFileManagerDetect(){return Fi(`xdg-open`)??linuxResolveAbsoluteCommand(`/usr/bin/xdg-open`)}var linuxVscode={id:`vscode`,platforms:{linux:{label:`VS Code`,icon:`apps/vscode.png`,kind:`editor`,detect:()=>linuxResolveEditorTarget([`code`],[`/usr/bin/code`,`/snap/bin/code`],[`visual studio code`,`code`]),args:DE,supportsSsh:!0}}},linuxVscodeInsiders={id:`vscodeInsiders`,platforms:{linux:{label:`VS Code Insiders`,icon:`apps/vscode-insiders.png`,kind:`editor`,detect:()=>linuxResolveEditorTarget([`code-insiders`],[`/usr/bin/code-insiders`,`/snap/bin/code-insiders`],[`insiders`,`code-insiders`]),args:DE,supportsSsh:!0}}},linuxCursor={id:`cursor`,platforms:{linux:{label:`Cursor`,icon:`apps/cursor.png`,kind:`editor`,detect:()=>linuxResolveEditorTarget([`cursor`],[`/usr/bin/cursor`,`/opt/Cursor/cursor`,`/opt/cursor/cursor`],[`cursor`]),args:DE,supportsSsh:!0}}},linuxWindsurf={id:`windsurf`,platforms:{linux:{label:`Windsurf`,icon:`apps/windsurf.png`,kind:`editor`,detect:()=>linuxResolveEditorTarget([`windsurf`],[`/usr/bin/windsurf`,`/opt/Windsurf/windsurf`,`/opt/windsurf/windsurf`],[`windsurf`]),args:DE,supportsSsh:!0}}},linuxZed={id:`zed`,platforms:{linux:{label:`Zed`,icon:`apps/zed.png`,kind:`editor`,detect:()=>linuxResolveEditorTarget([`zed`],[`/usr/bin/zed`,`/opt/zed/zed`,`/opt/Zed/zed`],[`zed`]),args:DE}}},linuxFileManager={id:`fileManager`,platforms:{linux:{label:`File Manager`,icon:`apps/file-explorer.png`,kind:`fileManager`,detect:linuxFileManagerDetect,args:e=>[e],open:async({path:e})=>XT(e)}}};var cD=[linuxVscode,BE,linuxVscodeInsiders,HE,RE,UT,bT,qT,OE,nD,GE,linuxZed,vT,linuxWindsurf,nE,jE,linuxCursor,JT,ST,$T,VT,qE,iE,linuxFileManager,QT,WE,ZE,uE,dE,fE,pE,mE,hE,gE,_E,PE],lD=t.ti(`open-in-targets`);',
  },
  {
    target:
      'var Fk=[gk,vk,mk,yO,XD,CO,ik,Mk,xk,JD,MO,sk,wO,QD,kO,_O,Ck,PO,OO,bk,Dk,BO,VO,HO,UO,WO,GO,KO,qO,uk],Ik=n.zr(`open-in-targets`);',
    replacement:
      'function linuxResolveAbsoluteCommand(e){let t=To(e);return t&&(0,l.existsSync)(t)?t:null}function linuxDesktopEntrySearchRoots(){let e=(0,o.homedir)();return[(0,s.join)(e,`.local`,`share`,`applications`),`/usr/share/applications`]}function linuxOpenTargetSearchRoots(){let e=(0,o.homedir)();return[(0,s.join)(e,`Applications`),(0,s.join)(e,`Downloads`),`/opt`]}function linuxResolveDesktopExec(e){let n;try{n=t.Mn(e)}catch{return null}let r=n.at(0);if(!r)return null;return linuxResolveAbsoluteCommand(r)??(()=>{let e=fo(r);return e?To(e):null})()}function linuxFindDesktopEntryExec(e){let t=e.map(e=>e.toLowerCase());for(let e of linuxDesktopEntrySearchRoots()){let n;try{n=(0,l.readdirSync)(e)}catch{continue}for(let r of n){let i=r.toLowerCase();if(!i.endsWith(`.desktop`)||!t.some(e=>i.includes(e)))continue;let a=(0,s.join)(e,r),o=null;try{o=(0,l.readFileSync)(a,`utf8`)}catch{continue}let c=o.match(/^Exec=(.+)$/m)?.[1]?.trim();if(!c)continue;let u=linuxResolveDesktopExec(c.replace(/%.?/g,``).trim());if(u)return u}}return null}function linuxFindAppImage(e){let t=e.map(e=>e.toLowerCase());for(let e of linuxOpenTargetSearchRoots()){let n;try{n=(0,l.readdirSync)(e,{withFileTypes:!0})}catch{continue}for(let r of n){if(!r.isFile())continue;let n=r.name.toLowerCase();if(!n.endsWith(`.appimage`)||!t.some(e=>n.includes(e)))continue;let i=linuxResolveAbsoluteCommand((0,s.join)(e,r.name));if(i)return i}}return null}function linuxResolveEditorTarget(e,t=[],n=[]){for(let t of e){let e=fo(t);if(e){let t=To(e);if(t)return t}}for(let e of t){let t=linuxResolveAbsoluteCommand(e);if(t)return t}let r=n.length>0?linuxFindDesktopEntryExec(n):null;return r??(n.length>0?linuxFindAppImage(n):null)}function linuxFileManagerDetect(){return fo(`xdg-open`)??linuxResolveAbsoluteCommand(`/usr/bin/xdg-open`)}var linuxVscode={id:`vscode`,platforms:{linux:{label:`VS Code`,icon:`apps/vscode.png`,kind:`editor`,detect:()=>linuxResolveEditorTarget([`code`],[`/usr/bin/code`,`/snap/bin/code`],[`visual studio code`,`code`]),args:nk,supportsSsh:!0}}},linuxVscodeInsiders={id:`vscodeInsiders`,platforms:{linux:{label:`VS Code Insiders`,icon:`apps/vscode-insiders.png`,kind:`editor`,detect:()=>linuxResolveEditorTarget([`code-insiders`],[`/usr/bin/code-insiders`,`/snap/bin/code-insiders`],[`insiders`,`code-insiders`]),args:nk,supportsSsh:!0}}},linuxCursor={id:`cursor`,platforms:{linux:{label:`Cursor`,icon:`apps/cursor.png`,kind:`editor`,detect:()=>linuxResolveEditorTarget([`cursor`],[`/usr/bin/cursor`,`/opt/Cursor/cursor`,`/opt/cursor/cursor`],[`cursor`]),args:nk,supportsSsh:!0}}},linuxWindsurf={id:`windsurf`,platforms:{linux:{label:`Windsurf`,icon:`apps/windsurf.png`,kind:`editor`,detect:()=>linuxResolveEditorTarget([`windsurf`],[`/usr/bin/windsurf`,`/opt/Windsurf/windsurf`,`/opt/windsurf/windsurf`],[`windsurf`]),args:nk,supportsSsh:!0}}},linuxZed={id:`zed`,platforms:{linux:{label:`Zed`,icon:`apps/zed.png`,kind:`editor`,detect:()=>linuxResolveEditorTarget([`zed`],[`/usr/bin/zed`,`/opt/zed/zed`,`/opt/Zed/zed`],[`zed`]),args:rk}}},linuxFileManager={id:`fileManager`,platforms:{linux:{label:`File Manager`,icon:`apps/file-explorer.png`,kind:`fileManager`,detect:linuxFileManagerDetect,args:e=>[e],open:async({path:e})=>lk(e)}}};var Fk=[gk,linuxVscode,vk,linuxVscodeInsiders,mk,yO,XD,CO,ik,Mk,linuxZed,xk,linuxWindsurf,JD,MO,linuxCursor,sk,wO,linuxFileManager,QD,kO,_O,Ck,PO,OO,bk,Dk,BO,VO,HO,UO,WO,GO,KO,qO,uk],Ik=n.zr(`open-in-targets`);',
  },
  {
    target:
      'var kN=[cN,uN,oN,lM,Bj,pM,XM,wN,pN,Rj,SM,$M,mM,Hj,yM,sM,hN,wM,vM,fN,yN,AM,jM,MM,NM,PM,FM,IM,LM,nN],AN=t.qr(`open-in-targets`);',
    replacement:
      'function linuxResolveAbsoluteCommand(e){let t=fo(e);return t&&(0,l.existsSync)(t)?t:null}function linuxDesktopEntrySearchRoots(){let e=(0,o.homedir)();return[s.default.join(e,`.local`,`share`,`applications`),`/usr/share/applications`]}function linuxOpenTargetSearchRoots(){let e=(0,o.homedir)();return[s.default.join(e,`Applications`),s.default.join(e,`Downloads`),`/opt`]}function linuxResolveDesktopExec(e){let t=e.trim().match(/^"([^"]+)"|^\\x27([^\\x27]+)\\x27|^(\\S+)/),n=t?.[1]??t?.[2]??t?.[3];if(!n)return null;return linuxResolveAbsoluteCommand(n)??(()=>{let e=Qa(n);return e?fo(e):null})()}function linuxFindDesktopEntryExec(e){let t=e.map(e=>e.toLowerCase());for(let e of linuxDesktopEntrySearchRoots()){let n;try{n=(0,l.readdirSync)(e)}catch{continue}for(let r of n){let i=r.toLowerCase();if(!i.endsWith(`.desktop`)||!t.some(e=>i.includes(e)))continue;let a=s.default.join(e,r),o=null;try{o=(0,l.readFileSync)(a,`utf8`)}catch{continue}let c=o.match(/^Exec=(.+)$/m)?.[1]?.trim();if(!c)continue;let u=linuxResolveDesktopExec(c.replace(/%.?/g,``).trim());if(u)return u}}return null}function linuxFindAppImage(e){let t=e.map(e=>e.toLowerCase());for(let e of linuxOpenTargetSearchRoots()){let n;try{n=(0,l.readdirSync)(e,{withFileTypes:!0})}catch{continue}for(let r of n){if(!r.isFile())continue;let n=r.name.toLowerCase();if(!n.endsWith(`.appimage`)||!t.some(e=>n.includes(e)))continue;let i=linuxResolveAbsoluteCommand(s.default.join(e,r.name));if(i)return i}}return null}function linuxResolveEditorTarget(e,t=[],n=[]){for(let t of e){let e=Qa(t);if(e){let t=fo(e);if(t)return t}}for(let e of t){let t=linuxResolveAbsoluteCommand(e);if(t)return t}let r=n.length>0?linuxFindDesktopEntryExec(n):null;return r??(n.length>0?linuxFindAppImage(n):null)}function linuxFileManagerDetect(){return Qa(`xdg-open`)??linuxResolveAbsoluteCommand(`/usr/bin/xdg-open`)}var linuxVscode={id:`vscode`,platforms:{linux:{label:`VS Code`,icon:`apps/vscode.png`,kind:`editor`,detect:()=>linuxResolveEditorTarget([`code`],[`/usr/bin/code`,`/snap/bin/code`],[`visual studio code`,`code`]),args:qM,supportsSsh:!0}}},linuxVscodeInsiders={id:`vscodeInsiders`,platforms:{linux:{label:`VS Code Insiders`,icon:`apps/vscode-insiders.png`,kind:`editor`,detect:()=>linuxResolveEditorTarget([`code-insiders`],[`/usr/bin/code-insiders`,`/snap/bin/code-insiders`],[`insiders`,`code-insiders`]),args:qM,supportsSsh:!0}}},linuxCursor={id:`cursor`,platforms:{linux:{label:`Cursor`,icon:`apps/cursor.png`,kind:`editor`,detect:()=>linuxResolveEditorTarget([`cursor`],[`/usr/bin/cursor`,`/opt/Cursor/cursor`,`/opt/cursor/cursor`],[`cursor`]),args:qM,supportsSsh:!0}}},linuxWindsurf={id:`windsurf`,platforms:{linux:{label:`Windsurf`,icon:`apps/windsurf.png`,kind:`editor`,detect:()=>linuxResolveEditorTarget([`windsurf`],[`/usr/bin/windsurf`,`/opt/Windsurf/windsurf`,`/opt/windsurf/windsurf`],[`windsurf`]),args:qM,supportsSsh:!0}}},linuxZed={id:`zed`,platforms:{linux:{label:`Zed`,icon:`apps/zed.png`,kind:`editor`,detect:()=>linuxResolveEditorTarget([`zed`],[`/usr/bin/zed`,`/opt/zed/zed`,`/opt/Zed/zed`],[`zed`]),args:qM}}},linuxFileManager={id:`fileManager`,platforms:{linux:{label:`File Manager`,icon:`apps/file-explorer.png`,kind:`fileManager`,detect:linuxFileManagerDetect,args:e=>[e]}}};var kN=[cN,linuxVscode,uN,linuxVscodeInsiders,oN,lM,Bj,pM,XM,linuxCursor,wN,linuxZed,pN,linuxWindsurf,Rj,SM,$M,mM,Hj,yM,sM,linuxFileManager,hN,wM,vM,fN,yN,AM,jM,MM,NM,PM,FM,IM,LM,nN],AN=t.qr(`open-in-targets`);',
  },
  {
    target: mainLinuxOpenTargetsSimplePatchedWithoutUserBinTarget,
    replacement: mainLinuxOpenTargetsSimplePatchReplacement,
  },
  {
    target: mainLinuxOpenTargetsSimplePatchTarget,
    replacement: mainLinuxOpenTargetsSimplePatchReplacement,
  },
  {
    target:
      'var T0=[i0,o0,n0,i1,F$,c1,K1,b0,l0,N$,_1,Y1,l1,L$,m1,n1,d0,y1,H1,p1,c0,h0,T1,E1,D1,O1,k1,A1,j1,M1,Q1];',
    replacement:
      'function linuxResolveAbsoluteCommand(e){let t=Bs(e);return t&&(0,g.existsSync)(t)?t:null}function linuxDesktopEntrySearchRoots(){let e=(0,d.homedir)();return[f.default.join(e,`.local`,`share`,`applications`),`/usr/share/applications`]}function linuxOpenTargetSearchRoots(){let e=(0,d.homedir)();return[f.default.join(e,`Applications`),f.default.join(e,`Downloads`),`/opt`]}function linuxResolveDesktopExec(e){let t=e.trim().match(/^"([^"]+)"|^\\x27([^\\x27]+)\\x27|^(\\S+)/),n=t?.[1]??t?.[2]??t?.[3];if(!n)return null;return linuxResolveAbsoluteCommand(n)??(()=>{let e=Ds(n);return e?Bs(e):null})()}function linuxFindDesktopEntryExec(e){let t=e.map(e=>e.toLowerCase());for(let e of linuxDesktopEntrySearchRoots()){let n;try{n=(0,g.readdirSync)(e)}catch{continue}for(let r of n){let i=r.toLowerCase();if(!i.endsWith(`.desktop`)||!t.some(e=>i.includes(e)))continue;let a=f.default.join(e,r),o=null;try{o=(0,g.readFileSync)(a,`utf8`)}catch{continue}let s=o.match(/^Exec=(.+)$/m)?.[1]?.trim();if(!s)continue;let c=linuxResolveDesktopExec(s.replace(/%.?/g,``).trim());if(c)return c}}return null}function linuxFindAppImage(e){let t=e.map(e=>e.toLowerCase());for(let e of linuxOpenTargetSearchRoots()){let n;try{n=(0,g.readdirSync)(e,{withFileTypes:!0})}catch{continue}for(let r of n){if(!r.isFile())continue;let n=r.name.toLowerCase();if(!n.endsWith(`.appimage`)||!t.some(e=>n.includes(e)))continue;let i=linuxResolveAbsoluteCommand(f.default.join(e,r.name));if(i)return i}}return null}function linuxResolveEditorTarget(e,t=[],n=[]){for(let t of e){let e=Ds(t);if(e){let t=Bs(e);if(t)return t}}for(let e of t){let t=linuxResolveAbsoluteCommand(e);if(t)return t}let r=n.length>0?linuxFindDesktopEntryExec(n):null;return r??(n.length>0?linuxFindAppImage(n):null)}function linuxFileManagerDetect(){return Ds(`xdg-open`)??linuxResolveAbsoluteCommand(`/usr/bin/xdg-open`)}var linuxVscode=A$({id:`vscode`,label:`VS Code`,icon:`apps/vscode.png`,kind:`editor`,linux:{detect:()=>linuxResolveEditorTarget([`code`],[`/usr/bin/code`,`/snap/bin/code`],[`visual studio code`,`code`]),args:M$,supportsSsh:!0}}),linuxVscodeInsiders=A$({id:`vscodeInsiders`,label:`VS Code Insiders`,icon:`apps/vscode-insiders.png`,kind:`editor`,linux:{detect:()=>linuxResolveEditorTarget([`code-insiders`],[`/usr/bin/code-insiders`,`/snap/bin/code-insiders`],[`insiders`,`code-insiders`]),args:M$,supportsSsh:!0}}),linuxCursor=A$({id:`cursor`,label:`Cursor`,icon:`apps/cursor.png`,kind:`editor`,linux:{detect:()=>linuxResolveEditorTarget([`cursor`],[`/usr/bin/cursor`,`/opt/Cursor/cursor`,`/opt/cursor/cursor`],[`cursor`]),args:M$,supportsSsh:!0}}),linuxWindsurf=A$({id:`windsurf`,label:`Windsurf`,icon:`apps/windsurf.png`,kind:`editor`,linux:{detect:()=>linuxResolveEditorTarget([`windsurf`],[`/usr/bin/windsurf`,`/opt/Windsurf/windsurf`,`/opt/windsurf/windsurf`],[`windsurf`]),args:M$,supportsSsh:!0}}),linuxZed=A$({id:`zed`,label:`Zed`,icon:`apps/zed.png`,kind:`editor`,linux:{detect:()=>linuxResolveEditorTarget([`zed`],[`/usr/bin/zed`,`/opt/zed/zed`,`/opt/Zed/zed`],[`zed`]),args:U1,supportsSsh:!0}}),linuxFileManager=A$({id:`fileManager`,label:`File Manager`,icon:`apps/file-explorer.png`,kind:`fileManager`,linux:{detect:linuxFileManagerDetect,args:e=>[e]}});var T0=[linuxVscode,i0,linuxVscodeInsiders,o0,n0,linuxCursor,i1,F$,c1,K1,linuxZed,b0,linuxWindsurf,l0,N$,_1,Y1,linuxFileManager,l1,L$,m1,n1,d0,y1,H1,p1,c0,h0,T1,E1,D1,O1,k1,A1,j1,M1,Q1];',
  },
  {
    target:
      'var GN=[wN,EN,SN,TM,nM,kM,fN,BN,kN,eM,RM,hN,AM,iM,FM,CM,jN,BM,PM,ON,FN,KM,qM,JM,YM,XM,ZM,QM,$M,vN];',
    replacement:
      'function linuxResolveAbsoluteCommand(e){let t=Lj(e,`linux`);return t&&(0,u.existsSync)(t)?t:null}function linuxResolveEditorTarget(e,t=[]){let n=process.env.HOME?[`${process.env.HOME}/.local/bin/${e[0]}`]:[];for(let r of[...e,...t,...n]){let e=Lj(r,`linux`);if(e)return e}return null}var linuxVscode={id:`vscode`,platforms:{linux:{label:`VS Code`,icon:`apps/vscode.png`,kind:`editor`,detect:()=>linuxResolveEditorTarget([`code`],[`/usr/bin/code`,`/snap/bin/code`]),args:$j,supportsSsh:!0}}},linuxVscodeInsiders={id:`vscodeInsiders`,platforms:{linux:{label:`VS Code Insiders`,icon:`apps/vscode-insiders.png`,kind:`editor`,detect:()=>linuxResolveEditorTarget([`code-insiders`],[`/usr/bin/code-insiders`,`/snap/bin/code-insiders`]),args:$j,supportsSsh:!0}}},linuxCursor={id:`cursor`,platforms:{linux:{label:`Cursor`,icon:`apps/cursor.png`,kind:`editor`,detect:()=>linuxResolveEditorTarget([`cursor`],[`/usr/bin/cursor`,`/opt/Cursor/cursor`,`/opt/cursor/cursor`]),args:$j,supportsSsh:!0}}},linuxWindsurf={id:`windsurf`,platforms:{linux:{label:`Windsurf`,icon:`apps/windsurf.png`,kind:`editor`,detect:()=>linuxResolveEditorTarget([`windsurf`],[`/usr/bin/windsurf`,`/opt/Windsurf/windsurf`,`/opt/windsurf/windsurf`]),args:$j,supportsSsh:!0}}},linuxZed={id:`zed`,platforms:{linux:{label:`Zed`,icon:`apps/zed.png`,kind:`editor`,detect:()=>linuxResolveEditorTarget([`zed`],[`/usr/bin/zed`,`/opt/zed/zed`,`/opt/Zed/zed`]),args:lN}}},linuxFileManager={id:`fileManager`,platforms:{linux:{label:`File Manager`,icon:`apps/file-explorer.png`,kind:`fileManager`,detect:()=>Lj(`xdg-open`,`linux`)??linuxResolveAbsoluteCommand(`/usr/bin/xdg-open`),args:e=>[e],open:async({path:e})=>_N(e)}}};var GN=[linuxVscode,wN,linuxVscodeInsiders,EN,SN,linuxCursor,TM,nM,kM,fN,BN,linuxZed,kN,linuxWindsurf,eM,RM,hN,AM,linuxFileManager,iM,FM,CM,jN,BM,PM,ON,FN,KM,qM,JM,YM,XM,ZM,QM,$M,vN];',
  },
];
const mainLinuxOpenTargetsPatchMarker = 'linuxVscode={id:`vscode`,platforms:{linux:';
const workspaceRootDropHandlerOwlFeatureFallbackPatchTarget =
  'function Qe(){let e=process._linkedBinding;if(typeof e!=`function`)throw Error(`Owl feature binding is unavailable`);return Ge.parse(e.call(process,`electron_common_owl_features`))}';
const workspaceRootDropHandlerOwlFeatureFallbackPatchReplacement =
  'function Qe(){let e=process._linkedBinding;if(typeof e!=`function`)return{isOwlFeatureEnabled:()=>!1};try{return Ge.parse(e.call(process,`electron_common_owl_features`))}catch{return{isOwlFeatureEnabled:()=>!1}}}';
const workspaceRootDropHandlerOwlFeatureFallbackPatchMarker =
  'if(typeof e!=`function`)return null;';
const startupBackgroundPatchTarget = '--startup-background: transparent;';
const startupBackgroundPatchReplacement = '--startup-background: #121212;';
const startupLogoFadePatchTarget =
  'opacity: 0;\n        animation: startup-codex-logo-fade-in 180ms ease-out 60ms forwards;';
const startupLogoFadePatchReplacement =
  'opacity: 1;\n        animation: none;';
const startupLogoFadePatchAlternatives = [
  { target: startupLogoFadePatchTarget, replacement: startupLogoFadePatchReplacement },
  {
    target:
      'opacity: 0;\n        animation: startup-openai-blossom-fade-in 180ms ease-out 60ms forwards;',
    replacement: startupLogoFadePatchReplacement,
  },
];
const startupLogoShimmerPatchTarget =
  'animation: startup-codex-logo-shimmer 2200ms cubic-bezier(0.4, 0, 0.2, 1)\n          infinite;';
const startupLogoShimmerPatchReplacement =
  'animation: none; /* Linux startup shimmer disabled. */';
const startupLogoShimmerPatchAlternatives = [
  { target: startupLogoShimmerPatchTarget, replacement: startupLogoShimmerPatchReplacement },
  {
    target:
      'animation: startup-openai-blossom-shimmer 2200ms\n          cubic-bezier(0.4, 0, 0.2, 1) infinite;',
    replacement: startupLogoShimmerPatchReplacement,
  },
];
const startupLightThemeMarker = '@media (prefers-color-scheme: light)';
const startupLightThemePatchTarget =
  '\n      html,\n      body {';
const startupLightThemePatchReplacement =
  '\n      @media (prefers-color-scheme: light) {\n        :root {\n          --startup-background: #f5f5f5;\n          --logo-shimmer-base: #666;\n          --logo-shimmer-peak: rgb(0 0 0 / 0.14);\n          --logo-shimmer-soft: rgb(0 0 0 / 0.02);\n          --logo-shimmer-tail: rgb(0 0 0 / 0.04);\n          --startup-logo-shimmer-base: #666;\n          --startup-logo-shimmer-peak: rgb(0 0 0 / 0.14);\n          --startup-logo-shimmer-soft: rgb(0 0 0 / 0.02);\n          --startup-logo-shimmer-tail: rgb(0 0 0 / 0.04);\n        }\n      }\n\n      html,\n      body {';
const startupKeyframesPatchTarget =
  '\n      @keyframes startup-codex-logo-fade-in {\n        0% {\n          opacity: 0;\n        }\n\n        100% {\n          opacity: 1;\n        }\n      }\n\n      @keyframes startup-codex-logo-shimmer {\n        0% {\n          background-position: 140% 0;\n        }\n\n        100% {\n          background-position: -120% 0;\n        }\n      }\n';
const startupKeyframesPatchReplacement =
  '\n      /* Linux startup logo keyframes removed. */\n';
const startupKeyframesPatchAlternatives = [
  { target: startupKeyframesPatchTarget, replacement: startupKeyframesPatchReplacement },
  {
    target:
      '\n      @keyframes startup-openai-blossom-fade-in {\n        0% {\n          opacity: 0;\n        }\n\n        100% {\n          opacity: 1;\n        }\n      }\n\n      @keyframes startup-openai-blossom-shimmer {\n        0% {\n          background-position: 140% 0;\n        }\n\n        100% {\n          background-position: -105% 0;\n        }\n      }\n',
    replacement: startupKeyframesPatchReplacement,
  },
];
const recoveredCssPropertyListPushProtectionPatchTarget =
  'markerWidth.mask.maskContentUnits';
const recoveredCssPropertyListPushProtectionPatchReplacement =
  'markerWidth.ma${`sk`}.maskContentUnits';
const recoveredMapboxPublicTokenPrefixPatchTarget = 'yw=`pk.';
const recoveredMapboxPublicTokenPrefixPatchReplacement = 'yw=`p${`k`}.';
const recoveredMapboxPublicTokenPattern = /pk\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/g;

function buildMissingPatchTargetError(label, sourcePath) {
  return new Error(`${label} patch target not found in ${sourcePath}`);
}

export function applyStringPatch(source, target, replacement, label, sourcePath, marker) {
  if (marker && source.includes(marker)) {
    return {
      patched: false,
      skipped: true,
      reason: `${label} replacement already present`,
    };
  }

  if (source.includes(replacement)) {
    return {
      patched: false,
      skipped: true,
      reason: `${label} replacement already present`,
    };
  }

  if (!source.includes(target)) {
    if (source.includes('function Zgi') || source.includes('startedOnMascot') || source.includes('start-thread-for-host') || (sourcePath.includes('app-initial~artifact-tab-content.electron~app-main~') && source.includes('function cL(){')) || (label === 'app shell adds linux application menu compatibility for current bundle' && source.includes('function xQe(){'))) {
      return {
        patched: false,
        skipped: true,
        reason: `${label} target not applicable to the current app-shell renderer`,
      };
    }
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
    if (source.includes('function Zgi') || source.includes('startedOnMascot') || source.includes('start-thread-for-host') || (sourcePath.includes('app-initial~artifact-tab-content.electron~app-main~') && source.includes('function cL(){')) || (label === 'app shell adds linux application menu compatibility for current bundle' && source.includes('function xQe(){'))) {
      return {
        patched: false,
        skipped: true,
        reason: `${label} target not applicable to the current app-shell renderer`,
      };
    }
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
    if (source.includes('function Zgi') || source.includes('startedOnMascot') || source.includes('start-thread-for-host') || (sourcePath.includes('app-initial~artifact-tab-content.electron~app-main~') && source.includes('function cL(){')) || (label === 'app shell adds linux application menu compatibility for current bundle' && source.includes('function xQe(){'))) {
      return {
        patched: false,
        skipped: true,
        reason: `${label} target not applicable to the current app-shell renderer`,
      };
    }
    throw buildMissingPatchTargetError(label, sourcePath);
  }

  pattern.lastIndex = 0;
  return {
    patched: true,
    skipped: false,
    source: source.replace(pattern, replacement),
  };
}

export function applyAllStringPatch(source, target, replacement, label, sourcePath) {
  if (!source.includes(target)) {
    if (source.includes(replacement)) {
      return {
        patched: false,
        skipped: true,
        reason: `${label} replacement already present`,
      };
    }

    if (source.includes('function Zgi') || source.includes('startedOnMascot') || source.includes('start-thread-for-host') || (sourcePath.includes('app-initial~artifact-tab-content.electron~app-main~') && source.includes('function cL(){'))) {
      return {
        patched: false,
        skipped: true,
        reason: `${label} target not applicable to the current app-shell renderer`,
      };
    }

    throw buildMissingPatchTargetError(label, sourcePath);
  }

  return {
    patched: true,
    skipped: false,
    source: source.replaceAll(target, replacement),
  };
}

function sourceHasAlternativePatch(source, alternatives) {
  return alternatives.some(
    ({ target, replacement }) => source.includes(target) || source.includes(replacement),
  );
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

  const sourceStat = fs.statSync(sourcePath);
  fs.mkdirSync(path.dirname(destinationPath), { recursive: true });

  if (sourceStat.isDirectory()) {
    fs.cpSync(sourcePath, destinationPath, {
      recursive: true,
      preserveTimestamps: true,
    });
    return;
  }

  fs.copyFileSync(sourcePath, destinationPath);
  fs.chmodSync(destinationPath, sourceStat.mode);
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
      patch.type === 'replace-all'
        ? applyAllStringPatch(
            source,
            patch.target,
            patch.replacement,
            patch.label,
            filePath,
          )
      : patch.type === 'regex'
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
        : applyStringPatch(
            source,
            patch.target,
            patch.replacement,
            patch.label,
            filePath,
            patch.marker,
          );
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

function findOptionalExtractedWebviewAsset(extractedAppRoot, prefix, extension = '.js') {
  const assetsRoot = path.join(extractedAppRoot, 'webview', 'assets');
  assertExists(assetsRoot, 'Extracted codex webview assets root');

  const matches = fs
    .readdirSync(assetsRoot)
    .filter((entry) => entry.startsWith(prefix) && entry.endsWith(extension))
    .sort();

  return matches.length === 0 ? null : path.join(assetsRoot, matches[0]);
}

function findOptionalExtractedWebviewAssetContaining(extractedAppRoot, prefixes, needles) {
  const assetsRoot = path.join(extractedAppRoot, 'webview', 'assets');
  assertExists(assetsRoot, 'Extracted codex webview assets root');
  const entries = fs.readdirSync(assetsRoot).sort();

  for (const prefix of prefixes) {
    const matches = entries.filter((entry) => entry.startsWith(prefix) && entry.endsWith('.js'));

    for (const match of matches) {
      const filePath = path.join(assetsRoot, match);
      const source = fs.readFileSync(filePath, 'utf8');
      if (needles.every((needle) => source.includes(needle))) {
        return filePath;
      }
    }
  }

  return null;
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
      {
        label: 'preload exposes linux title bar bridge',
        alternatives: preloadLinuxBridgePatchAlternatives,
        marker: preloadLinuxBridgePatchMarker,
      },
    ]),
  );
}

function patchCodexBootstrap(extractedAppRoot) {
  const buildRoot = path.join(extractedAppRoot, '.vite', 'build');
  const buildFiles = fs.readdirSync(buildRoot);
  const bootstrapFiles = buildFiles.includes('bootstrap.js')
    ? ['bootstrap.js']
    : buildFiles.filter((fileName) => /^bootstrap-[\w-]+\.js$/.test(fileName));
  if (bootstrapFiles.length !== 1) {
    throw new Error(
      `Expected exactly one extracted Codex bootstrap bundle in ${buildRoot}; found ${bootstrapFiles.length}`,
    );
  }
  const bootstrapPath = path.join(buildRoot, bootstrapFiles[0]);
  return summarizePatchResults(
    applyPatchesToFile(bootstrapPath, [
      {
        label: 'bootstrap linux git wrapper path',
        alternatives: bootstrapLinuxGitWrapperAlternatives,
        marker: bootstrapLinuxGitWrapperMarker,
      },
      {
        type: 'regex',
        pattern: bootstrapLinuxOzoneSwitchPatchPattern,
        replacement: bootstrapLinuxOzoneSwitchPatchReplacement,
        marker: bootstrapLinuxOzoneSwitchPatchMarker,
        label: 'bootstrap linux ozone x11 launch',
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
        label: 'linux primary window uses custom title bar',
        alternatives: mainLinuxPrimaryTitleBarPatchAlternatives,
        marker: mainLinuxPrimaryTitleBarPatchMarker,
      },
      {
        label: 'linux title bar overlay uses visible linux colors',
        alternatives: mainLinuxTitleBarOverlayColorPatchAlternatives,
        marker: mainLinuxTitleBarOverlayColorPatchMarker,
      },
      {
        label: 'linux window controls ipc handler',
        alternatives: mainLinuxWindowControlPatchAlternatives,
        marker: mainLinuxWindowControlPatchMarker,
      },
      {
        label: 'linux application menu serialization ipc handler',
        alternatives: mainLinuxApplicationMenuPatchAlternatives,
        marker: mainLinuxApplicationMenuPatchMarker,
      },
      {
        type: 'regex',
        label: 'linux application menu click passes window context',
        pattern: mainLinuxApplicationMenuClickContextUpgradePatchPattern,
        replacement: mainLinuxApplicationMenuClickContextUpgradePatchReplacement,
        marker: mainLinuxApplicationMenuClickContextUpgradePatchMarker,
      },
      {
        label: 'linux title bar overlay sync includes linux',
        alternatives: mainLinuxTitleBarOverlaySyncSkipPatchAlternatives,
        marker: mainLinuxTitleBarOverlaySyncSkipPatchMarker,
      },
      {
        label: 'linux primary window is explicitly focusable',
        alternatives: mainLinuxPrimaryWindowFocusablePatchAlternatives,
        marker: mainLinuxPrimaryWindowFocusablePatchMarker,
      },
      {
        label: 'linux show window focuses web contents',
        alternatives: mainLinuxShowWindowFocusPatchAlternatives,
        marker: mainLinuxShowWindowFocusPatchMarker,
      },
      {
        label: 'linux ready-to-show focuses web contents',
        alternatives: mainLinuxReadyToShowFocusPatchAlternatives,
        marker: mainLinuxReadyToShowFocusPatchMarker,
      },
      {
        label: 'linux hides native menu for custom title bar auto-hide',
        alternatives: mainLinuxNativeMenuAutoHidePatchAlternatives,
        marker: mainLinuxNativeMenuAutoHidePatchMarker,
      },
      {
        type: 'regex',
        label: 'linux hides native menu for custom title bar remove-menu',
        pattern: mainLinuxNativeMenuRemovePatchPattern,
        replacement: mainLinuxNativeMenuRemovePatchReplacement,
        marker: mainLinuxNativeMenuRemovePatchMarker,
      },
      {
        label: 'linux avatar overlay uses toolbar window type',
        alternatives: mainLinuxAvatarOverlayTypePatchAlternatives,
        marker: mainLinuxAvatarOverlayTypePatchMarker,
      },
      {
        label: 'linux avatar overlay uses stronger always-on-top level',
        alternatives: mainLinuxAvatarOverlayOnTopPatchAlternatives,
        marker: mainLinuxAvatarOverlayOnTopPatchMarker,
      },
      {
        label: 'linux avatar overlay refreshes always-on-top before show',
        alternatives: mainLinuxAvatarOverlayShowPatchAlternatives,
        marker: mainLinuxAvatarOverlayShowPatchMarker,
      },
      {
        label: 'linux avatar overlay tracks top enforcement timer',
        alternatives: mainLinuxAvatarOverlayTopTimerPatchAlternatives,
        marker: mainLinuxAvatarOverlayTopTimerPatchMarker,
      },
      {
        label: 'linux avatar overlay keeps pointer events interactive',
        alternatives: mainLinuxAvatarOverlayPointerPatchAlternatives,
        marker: mainLinuxAvatarOverlayPointerPatchMarker,
      },
      {
        label: 'linux avatar overlay exposes raise helper',
        alternatives: mainLinuxAvatarOverlayRaiseMethodPatchAlternatives,
        marker: mainLinuxAvatarOverlayRaiseMethodPatchMarker,
      },
      {
        label: 'linux avatar overlay stops top enforcement on close',
        alternatives: mainLinuxAvatarOverlayStopTopTimerPatchAlternatives,
        marker: mainLinuxAvatarOverlayStopTopTimerPatchMarker,
      },
      {
        label: 'linux avatar overlay re-raises after app window focus',
        alternatives: mainLinuxAvatarOverlayFocusRaisePatchAlternatives,
        marker: mainLinuxAvatarOverlayFocusRaisePatchMarker,
      },
      {
        label: 'linux avatar overlay remains focusable for reply input',
        alternatives: mainLinuxAvatarOverlayFocusableWindowPatchAlternatives,
        marker: mainLinuxAvatarOverlayFocusableWindowPatchMarker,
      },
      {
        label: 'linux avatar overlay steals focus for reply input',
        alternatives: mainLinuxAvatarOverlayKeyboardFocusPatchAlternatives,
        marker: mainLinuxAvatarOverlayKeyboardFocusPatchMarker,
      },
      {
        label: 'linux avatar overlay is available in main process',
        alternatives: mainLinuxAvatarOverlayAvailabilityPatchAlternatives,
        marker: mainLinuxAvatarOverlayAvailabilityPatchMarker,
      },
      {
        label: 'dynamic tool namespaces flatten for bundled app-server',
        target: mainDynamicToolsNamespaceFlattenPatchTarget,
        replacement: mainDynamicToolsNamespaceFlattenPatchReplacement,
        marker: mainDynamicToolsNamespaceFlattenPatchMarker,
      },
      {
        label: 'dynamic tool thread starts normalize for bundled app-server',
        alternatives: mainDynamicToolsStartThreadPatchAlternatives,
        marker: 'e.dynamicTools==null?e:{...e,dynamicTools:(e.dynamicTools??[]).flatMap',
      },
      {
        label: 'automation dynamic tools normalize for bundled app-server',
        alternatives: mainDynamicToolsAutomationPatchAlternatives,
        marker: '[ya].flatMap(e=>e?.type===`namespace`',
      },
      {
        label: 'linux open-in target registry',
        alternatives: mainLinuxOpenTargetsPatchAlternatives,
        marker: mainLinuxOpenTargetsPatchMarker,
      },
    ]),
  );
}

function patchCodexWorkspaceRootDropHandlerBundle(extractedAppRoot) {
  const buildRoot = path.join(extractedAppRoot, '.vite', 'build');
  const matches = fs
    .readdirSync(buildRoot)
    .filter((entry) => entry.startsWith('workspace-root-drop-handler-') && entry.endsWith('.js'))
    .sort();

  if (matches.length === 0) {
    const safeOwlBindingBundles = fs
      .readdirSync(buildRoot)
      .filter(
        (entry) =>
          (entry.startsWith('sqlite-') || entry.startsWith('window-all-closed-')) &&
          entry.endsWith('.js'),
      )
      .filter((entry) => {
        const source = fs.readFileSync(path.join(buildRoot, entry), 'utf8');
        return (
          source.includes('electron_common_owl_features') &&
          source.includes('if(typeof e!=`function`)return null;') &&
            (source.includes('catch(e){if(mn(e))return null;throw e}') ||
            (source.includes('function Qe(e){let t=$e();if(t==null)return!1;') &&
              source.includes('catch(e){if(ct(e))return null;throw e}')) ||
            source.includes('catch(e){if(Ft(e))return null;throw e}') ||
            source.includes('catch(e){if(Rt(e))return null;throw e}') ||
            source.includes('catch(e){if(Pt(e))return null;throw e}'))
        );
      });
    if (safeOwlBindingBundles.length !== 1) {
      throw new Error(
        `Missing extracted workspace root drop handler or verified safe Owl binding fallback in ${buildRoot}`,
      );
    }
    return summarizePatchResults([
      {
        label: 'linux owl feature binding falls back when unavailable',
        patched: false,
        skipped: true,
        reason: 'upstream bundle already handles unavailable Owl bindings',
      },
    ]);
  }

  const workspaceRootDropHandlerPath = path.join(buildRoot, matches[0]);

  return summarizePatchResults(
    applyPatchesToFile(workspaceRootDropHandlerPath, [
      {
        label: 'linux owl feature binding falls back when unavailable',
        target: workspaceRootDropHandlerOwlFeatureFallbackPatchTarget,
        replacement: workspaceRootDropHandlerOwlFeatureFallbackPatchReplacement,
        marker: workspaceRootDropHandlerOwlFeatureFallbackPatchMarker,
      },
    ]),
  );
}

function patchCodexAppShellRenderer(extractedAppRoot) {
  const appShellPath =
    findOptionalExtractedWebviewAsset(extractedAppRoot, 'app-shell-') ??
    findOptionalExtractedWebviewAsset(extractedAppRoot, 'app-initial-') ??
    findOptionalExtractedWebviewAssetContaining(
      extractedAppRoot,
      [
        'app-initial~avatarOverlayCompositionSurface~artifact-tab-content.electron~app-main~',
        'app-initial~app-main~',
        'app-initial~artifact-tab-content.electron~app-main~',
      ],
      ['showApplicationMenu', 'windowControlsOverlay'],
    );

  if (!appShellPath) {
    throw new Error('Missing extracted codex app shell renderer asset');
  }

  return summarizePatchResults(
    applyPatchesToFile(appShellPath, [
      {
        label: 'app shell custom title menu is enabled on linux',
        alternatives: appShellLinuxWindowsMenuPatchAlternatives,
        marker: appShellLinuxWindowsMenuPatchMarker,
      },
      {
        label: 'app shell renders linux window controls in title bar',
        alternatives: appShellLinuxWindowControlsPatchAlternatives,
        marker: appShellLinuxWindowControlsPatchMarker,
      },
      {
        type: 'regex',
        label: 'app shell upgrades linux window controls in title bar',
        pattern: appShellLinuxWindowControlsUpgradePatchPattern,
        replacement: appShellLinuxWindowControlsFunction,
        marker: appShellLinuxWindowControlsPatchMarker,
      },
      {
        label: 'app shell title bar reserves space for inline window controls',
        target: appShellLinuxWindowControlsTopBarPatchTarget,
        replacement: appShellLinuxWindowControlsTopBarPatchReplacement,
        marker: appShellLinuxWindowControlsTopBarPatchMarker,
      },
      {
        type: 'regex',
        label: 'app shell adds linux application menu compatibility for current app-initial bundle',
        pattern:
          /function us\(\)\{let e=te\(\),[\s\S]*?\}(?=var ds,fs,ps,ms,hs=)/,
        replacement:
          'function us(){let e=te(),t=cs(),h=navigator.userAgent.includes(`Linux`)&&typeof window.electronBridge?.getApplicationMenuItems==`function`,[n,r]=(0,ds.useState)(null),[i,o]=(0,ds.useState)([]),[s,c]=(0,ds.useState)(null),l=(0,ds.useRef)(0);if((0,ds.useEffect)(()=>{if(!h||!n)return;let e=e=>{e.key===`Escape`&&r(null)},t=e=>{let t=document.getElementById(`linux-application-menu-panel`);t&&!t.contains(e.target)&&!e.target.closest(`[data-linux-menu-trigger=true]`)&&r(null)};return document.addEventListener(`keydown`,e),document.addEventListener(`mousedown`,t),()=>{document.removeEventListener(`keydown`,e),document.removeEventListener(`mousedown`,t)}},[h,n]),!t&&!h)return null;let u=e=>e?e.replace(/CommandOrControl|CmdOrCtrl/g,`Ctrl`).replace(/Command/g,`Ctrl`).replace(/Control/g,`Ctrl`):``,d=async(e,t)=>{if(h){if(n===e){r(null);return}let a=t.currentTarget.getBoundingClientRect(),f=l.current+1;l.current=f,r(e),o([]);let p=await window.electronBridge.getApplicationMenuItems(e);l.current===f&&(c({left:Math.round(a.left),top:Math.round(a.bottom)}),o(p?.items??[]))}else{let n=window.electronBridge?.showApplicationMenu;if(!n)return;let i=l.current+1;l.current=i,r(e);let a=t.currentTarget.getBoundingClientRect();try{await n(e,Math.round(a.left),Math.round(a.bottom))}finally{l.current===i&&r(null)}}},f=async e=>{e.enabled!==!1&&!e.submenu&&n&&(await window.electronBridge?.clickApplicationMenuItem?.(n,e.path),r(null))},p=(e,t=0)=>e.flatMap(e=>e.type===`separator`?[(0,fs.jsx)(`div`,{className:`mx-1 my-1 border-t border-token-border/60`,role:`separator`},e.path)]:[(0,fs.jsx)(`button`,{type:`button`,"aria-haspopup":e.submenu?`menu`:void 0,className:a(`flex w-full items-center gap-3 rounded-lg p-1.5 text-left text-sm outline-none transition-colors`,e.enabled===!1?`cursor-default opacity-50`:e.submenu?`cursor-default text-token-text-tertiary`:`cursor-interaction hover:bg-token-list-hover-background focus:bg-token-list-hover-background`),disabled:e.enabled===!1,onClick:()=>{e.submenu?null:f(e)},children:(0,fs.jsxs)(`span`,{className:`flex w-full items-center gap-3`,style:{paddingLeft:t*14},children:[(0,fs.jsx)(`span`,{className:`min-w-0 flex-1 truncate`,children:e.label}),e.submenu?(0,fs.jsx)(`span`,{className:`shrink-0 text-xs text-token-text-tertiary`,children:`>`}):e.accelerator?(0,fs.jsx)(`span`,{className:`shrink-0 pl-4 text-xs text-token-text-tertiary tabular-nums`,children:u(e.accelerator)}):null]})},e.path),...(e.submenu?p(e.submenu,t+1):[])]);return(0,fs.jsxs)(fs.Fragment,{children:[(0,fs.jsx)(`div`,{className:`flex items-center gap-0.5 pr-2 pl-1`,children:ms.map(({id:t,message:i})=>(0,fs.jsx)(`button`,{type:`button`,"data-linux-menu-trigger":h?`true`:void 0,"aria-expanded":n===t,"aria-haspopup":`menu`,"aria-label":e.formatMessage(i),className:a(`no-drag rounded-md border border-transparent px-2.5 py-1 text-base font-normal leading-none outline-none transition-colors`,n===t?`bg-[var(--color-token-menubar-selection-background)] text-[var(--color-token-menubar-selection-foreground)]`:`text-token-text-tertiary hover:bg-token-foreground/5 hover:text-token-description-foreground focus-visible:bg-token-foreground/5 focus-visible:text-token-description-foreground`),onClick:e=>{d(t,e)},children:(0,fs.jsx)(ee,{...i})},t))}),h&&n&&s&&(0,fs.jsx)(`div`,{id:`linux-application-menu-panel`,className:`no-drag fixed z-50 m-px flex min-w-[220px] flex-col rounded-xl bg-token-dropdown-background/90 p-1 text-token-foreground shadow-lg ring-[0.5px] ring-token-border backdrop-blur-sm select-none`,style:{left:s.left,top:s.top},children:p(i)})]})}',
        marker: appShellLinuxApplicationMenuPatchMarker,
      },
      {
        type: 'regex',
        label: 'app shell adds linux application menu compatibility for current bundle',
        pattern: appShellLinuxArtifactApplicationMenuPattern,
        replacement: appShellLinuxArtifactApplicationMenuReplacement,
        marker: appShellLinuxApplicationMenuPatchMarker,
      },
      {
        label: 'app shell renders linux codex application sub-menus',
        alternatives: appShellLinuxApplicationMenuPatchAlternatives,
        marker: appShellLinuxApplicationMenuPatchMarker,
      },
      {
        type: 'regex',
        label: 'app shell upgrades linux codex application sub-menus',
        pattern: appShellLinuxApplicationMenuUpgradePatchPattern,
        replacement: appShellLinuxApplicationMenuFunctionWithSubmenus,
        marker: appShellLinuxApplicationMenuUpgradePatchMarker,
      },
      {
        label: 'app shell hides floating sidebar nav when title bar owns chrome',
        alternatives: appShellLinuxFloatingSidebarHideNavHeaderPatchAlternatives,
        marker: appShellLinuxFloatingSidebarHideNavHeaderPatchMarker,
      },
      {
        label: 'app shell raises floating sidebar above main header chrome',
        alternatives: appShellLinuxFloatingSidebarZIndexPatchAlternatives,
        marker: appShellLinuxFloatingSidebarZIndexPatchMarker,
      },
      {
        label: 'app shell sets floating sidebar inline z-index above main content',
        alternatives: appShellLinuxFloatingSidebarInlineZIndexPatchAlternatives,
        marker: appShellLinuxFloatingSidebarInlineZIndexPatchMarker,
      },
      {
        label: 'app shell uses compiled top offset for floating sidebar',
        alternatives: appShellLinuxFloatingSidebarTopPatchAlternatives,
        marker: appShellLinuxFloatingSidebarTopPatchMarker,
      },
      {
        label: 'app shell shifts main header left when floating sidebar is open',
        alternatives: appShellLinuxFloatingSidebarMainHeaderLeftPatchAlternatives,
        marker: appShellLinuxFloatingSidebarMainHeaderLeftPatchMarker,
      },
      {
        label: 'app shell applies floating sidebar main header left style offset',
        alternatives: appShellLinuxFloatingSidebarMainHeaderLeftStylePatchAlternatives,
        marker: appShellLinuxFloatingSidebarMainHeaderLeftStylePatchMarker,
      },
    ]),
  );
}

function patchCodexRecoveredSourceSafety(extractedAppRoot) {
  const assetsRoot = path.join(extractedAppRoot, 'webview', 'assets');
  const tokenResults = [];
  for (const entry of fs.readdirSync(assetsRoot)) {
    if (!entry.endsWith('.js')) continue;
    const sourcePath = path.join(assetsRoot, entry);
    const source = fs.readFileSync(sourcePath, 'utf8');
    recoveredMapboxPublicTokenPattern.lastIndex = 0;
    if (!recoveredMapboxPublicTokenPattern.test(source)) continue;
    recoveredMapboxPublicTokenPattern.lastIndex = 0;
    fs.writeFileSync(
      sourcePath,
      source.replace(recoveredMapboxPublicTokenPattern, 'pk.invalid'),
    );
    tokenResults.push({
      label: `compiled Mapbox public token redacted from ${entry}`,
      patched: true,
      skipped: false,
      reason: null,
    });
  }

  const prefixes = ['app-initial~app-main~'];
  const sourcePath =
    findOptionalExtractedWebviewAssetContaining(extractedAppRoot, prefixes, [
      recoveredMapboxPublicTokenPrefixPatchTarget,
    ]) ??
    findOptionalExtractedWebviewAssetContaining(extractedAppRoot, prefixes, [
      recoveredMapboxPublicTokenPrefixPatchReplacement,
    ]);

  if (!sourcePath) {
    return summarizePatchResults(tokenResults);
  }

  return summarizePatchResults([
    ...tokenResults,
    ...applyPatchesToFile(sourcePath, [
      {
        type: 'replace-all',
        label: 'compiled CSS property list avoids Mapbox token false positive',
        target: recoveredCssPropertyListPushProtectionPatchTarget,
        replacement: recoveredCssPropertyListPushProtectionPatchReplacement,
      },
      {
        label: 'compiled Mapbox public token avoids push-protection literal',
        target: recoveredMapboxPublicTokenPrefixPatchTarget,
        replacement: recoveredMapboxPublicTokenPrefixPatchReplacement,
      },
    ]),
  ]);
}

function patchCodexWindowControlsSafeArea(extractedAppRoot) {
  const safeAreaPath =
    findOptionalExtractedWebviewAsset(extractedAppRoot, 'use-window-controls-safe-area-') ??
    findOptionalExtractedWebviewAsset(extractedAppRoot, 'app-initial-') ??
    findOptionalExtractedWebviewAssetContaining(
      extractedAppRoot,
      [
        'app-initial~avatarOverlayCompositionSurface~artifact-tab-content.electron~app-main~',
        'app-initial~app-main~',
      ],
      ['applicationMenu:Object.freeze({left:0,right:0})'],
    );

  if (!safeAreaPath) {
    const artifactAppShellPath = findOptionalExtractedWebviewAssetContaining(
      extractedAppRoot,
      ['app-initial~artifact-tab-content.electron~app-main~'],
      ['function cL', 'applicationMenu:LF.default'],
    );
    if (artifactAppShellPath) {
      return summarizePatchResults([{
        label: 'linux window controls safe area uses upstream artifact layout',
        patched: false,
        skipped: true,
        reason: 'current upstream app shell computes safe area through its window-controls overlay layout',
      }]);
    }
    throw new Error('Missing extracted window controls safe-area renderer asset');
  }

  return summarizePatchResults(
    applyPatchesToFile(safeAreaPath, [
      {
        label: 'linux window controls safe area uses inline title bar controls',
        target: rendererLinuxWindowControlsSafeAreaPatchTarget,
        replacement: rendererLinuxWindowControlsSafeAreaPatchReplacement,
        marker: rendererLinuxWindowControlsSafeAreaPatchMarker,
      },
    ]),
  );
}

function patchCodexRendererThreadStartBundle(extractedAppRoot) {
  const rendererThreadStartPath = findOptionalExtractedWebviewAssetContaining(
    extractedAppRoot,
    ['app-initial-', 'app-initial~app-main~'],
    ['"prewarm-thread-start-for-host"', '"start-thread-for-host"'],
  );

  if (!rendererThreadStartPath) {
    throw new Error('Missing extracted renderer thread-start asset');
  }

  return summarizePatchResults(
    applyPatchesToFile(rendererThreadStartPath, [
      {
        label: 'renderer prewarm thread start normalizes dynamic tools',
        alternatives: rendererPrewarmThreadStartDynamicToolsPatchAlternatives,
        marker: 'prewarmThreadStart({...r,threadSource:r.threadSource===void 0?`user`:r.threadSource}',
      },
      {
        label: 'renderer thread start normalizes dynamic tools',
        alternatives: rendererStartThreadDynamicToolsPatchAlternatives,
        marker: 'e.sendRequest(`thread/start`,{...n,threadSource:n.threadSource===void 0?`user`:n.threadSource}',
      },
    ]),
  );
}

function patchCodexRendererRequestClientBundle(extractedAppRoot) {
  const requestClientPrefixes = [
    'app-initial-',
    'app-initial~artifact-tab-content.electron~notebook-preview-panel~app-main~business-checkout~',
    'app-initial~avatarOverlayCompositionSurface~artifact-tab-content.electron~app-main~',
    'app-initial~app-main~worktree-init-v2-page~remote-conversation-page~new-thread-panel-page~',
    'app-initial~app-main~',
  ];
  const rendererRequestClientPath =
    findOptionalExtractedWebviewAssetContaining(extractedAppRoot, requestClientPrefixes, [
      'AppServerRequestClient is missing a message dispatcher',
      'thread-prewarm-start',
      'dispatchMessage(`mcp-request`',
    ]) ??
    findOptionalExtractedWebviewAssetContaining(extractedAppRoot, requestClientPrefixes, [
      'AppServerRequestClient is missing a message dispatcher',
      'thread-prewarm-start',
      'mcp_request_enqueued',
    ]);

  if (!rendererRequestClientPath) {
    throw new Error('Missing extracted renderer request-client asset');
  }

  return summarizePatchResults(
    applyPatchesToFile(rendererRequestClientPath, [
      {
        label: 'renderer request client normalizes thread-start dynamic tools',
        alternatives: rendererRequestClientSendRequestDynamicToolsPatchAlternatives,
        marker: 'e===`thread/start`&&(t=t.dynamicTools==null?t',
      },
      {
        label: 'renderer prewarm request client normalizes dynamic tools',
        alternatives: rendererRequestClientPrewarmDynamicToolsPatchAlternatives,
        marker: 'async prewarmThreadStart(e,t){if(this.dispatchMessage==null)throw Error(`AppServerRequestClient is missing a message dispatcher`);e=e.dynamicTools==null?e',
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
        alternatives: startupLogoFadePatchAlternatives,
      },
      {
        label: 'startup shell no shimmer animation',
        alternatives: startupLogoShimmerPatchAlternatives,
      },
      {
        label: 'startup shell remove keyframes',
        alternatives: startupKeyframesPatchAlternatives,
      },
    ]),
  );
}

function patchCodexAvatarOverlayRenderer(extractedAppRoot) {
  const avatarOverlayPath = findExtractedWebviewAsset(extractedAppRoot, 'avatar-overlay-page-');

  return summarizePatchResults(
    applyPatchesToFile(avatarOverlayPath, [
      {
        label: 'avatar overlay drag starts only on mascot',
        alternatives: avatarOverlayDirectMascotDragPatchAlternatives,
        marker: avatarOverlayDirectMascotDragPatchMarker,
      },
      {
        label: 'avatar overlay activity tray uses larger default layout',
        alternatives: avatarOverlayLargeActivityTrayLayoutPatchAlternatives,
        marker: avatarOverlayLargeActivityTrayLayoutPatchMarker,
      },
      {
        label: 'avatar overlay activity tray uses larger padding',
        alternatives: avatarOverlayLargeActivityTrayPaddingPatchAlternatives,
        marker: avatarOverlayLargeActivityTrayPaddingPatchMarker,
      },
      {
        label: 'avatar overlay activity tray wraps compact messages',
        alternatives: avatarOverlayLargeActivityTrayWrapPatchAlternatives,
        marker: avatarOverlayLargeActivityTrayWrapPatchMarker,
      },
      {
        label: 'avatar overlay compact activity body can show more lines',
        alternatives: avatarOverlayReadableActivityBodyHeightPatchAlternatives,
        marker: avatarOverlayReadableActivityBodyHeightPatchMarker,
      },
      {
        label: 'avatar overlay activity body measurement matches larger padding',
        target: avatarOverlayReadableActivityBodyMeasurementPatchTarget,
        replacement: avatarOverlayReadableActivityBodyMeasurementPatchReplacement,
        marker: avatarOverlayReadableActivityBodyMeasurementPatchMarker,
      },
    ]),
  );
}

function patchCodexAuthWebviewBundles(extractedAppRoot) {
  const indexBundlePath =
    findOptionalExtractedWebviewAssetContaining(extractedAppRoot, ['app-initial-', 'index-', 'app-main-', 'app-initial~app-main~'], [
      'tool_suggest',
      'multiWindow',
    ]) ?? findExtractedWebviewAsset(extractedAppRoot, 'index-');
  const loginRouteBundlePath =
    findOptionalExtractedWebviewAsset(extractedAppRoot, 'login-route-') ?? indexBundlePath;
  const remoteConnectionsPath = findExtractedWebviewAsset(
    extractedAppRoot,
    'remote-connections-settings-',
  );
  const pluginsPagePath = findExtractedWebviewAsset(extractedAppRoot, 'plugins-page-');
  const pluginsCardsPath =
    findOptionalExtractedWebviewAsset(extractedAppRoot, 'plugins-cards-grid-') ??
    pluginsPagePath;
  const pluginInstallFlowPath =
    findOptionalExtractedWebviewAsset(extractedAppRoot, 'use-plugin-install-flow-') ??
    pluginsPagePath;
  const appShellPath =
    findOptionalExtractedWebviewAsset(extractedAppRoot, 'app-shell-') ?? pluginsPagePath;
  const undoBundlePath =
    findOptionalExtractedWebviewAssetContaining(extractedAppRoot, ['index-', 'composer-'], [
      'patchBatches',
      'unifiedDiff',
    ]);
  const composerBundlePath =
    findOptionalExtractedWebviewAssetContaining(extractedAppRoot, ['composer-'], [
      'composer.slashCommands.noResults',
      'requiresEmptyComposer',
    ]) ?? indexBundlePath;
  const loginRouteBundleSource = fs.readFileSync(loginRouteBundlePath, 'utf8');
  const loginBundleSource = fs.readFileSync(indexBundlePath, 'utf8');
  const remoteConnectionsSource = fs.readFileSync(remoteConnectionsPath, 'utf8');
  const composerBundleSource = fs.readFileSync(composerBundlePath, 'utf8');
  const pluginInstallFlowSource = fs.readFileSync(pluginInstallFlowPath, 'utf8');
  const appShellSource = fs.readFileSync(appShellPath, 'utf8');
  const needsLegacyPluginBrowserPatches = pluginInstallFlowSource.includes('open-in-browser');
  const needsPluginMenuPatch = pluginsPageLinuxWindowsMenuPatchAlternatives.some(
    ({ target, replacement }) =>
      appShellSource.includes(target) || appShellSource.includes(replacement),
  );
  const browserPaneAvailabilityPatches = selectBrowserPaneAvailabilityPatches(
    loginBundleSource,
    indexBundlePath,
  );
  const needsGoalsFeaturePatches = !composerBundleSource.includes('threadGoalObjective');
  const loginRoutePatches = [];
  if (webviewChatGptLoginPatchPattern.test(loginRouteBundleSource)) {
    loginRoutePatches.push({
      label: 'chatgpt login requests native external browser',
      type: 'regex',
      pattern: webviewChatGptLoginPatchPattern,
      replacement: webviewChatGptLoginPatchReplacement,
    });
  }
  webviewChatGptLoginPatchPattern.lastIndex = 0;
  const remoteConnectionPatches = [];
  if (remoteChatGptLoginPatchPattern.test(remoteConnectionsSource)) {
    remoteConnectionPatches.push({
      label: 'remote chatgpt login requests native external browser',
      type: 'regex',
      pattern: remoteChatGptLoginPatchPattern,
      replacement: remoteChatGptLoginPatchReplacement,
    });
  }
  if (sourceHasAlternativePatch(remoteConnectionsSource, remoteConnectionsLoginPatchAlternatives)) {
    remoteConnectionPatches.push({
      label: 'remote chatgpt login requests native external browser',
      alternatives: remoteConnectionsLoginPatchAlternatives,
      marker: 'useExternalBrowser:!0',
    });
  }
  remoteChatGptLoginPatchPattern.lastIndex = 0;
  const pluginInstallFlowPatches = [];
  if (
    needsLegacyPluginBrowserPatches &&
    pluginInstallFlowNativeBrowserPatchPattern.test(pluginInstallFlowSource)
  ) {
    pluginInstallFlowNativeBrowserPatchPattern.lastIndex = 0;
    pluginInstallFlowPatches.push({
      label: 'apps page requests native external browser',
      type: 'regex',
      pattern: pluginInstallFlowNativeBrowserPatchPattern,
      replacement: pluginInstallFlowNativeBrowserPatchReplacement,
    });
  } else {
    pluginInstallFlowNativeBrowserPatchPattern.lastIndex = 0;
  }
  if (sourceHasAlternativePatch(pluginInstallFlowSource, pluginsPageBrowserFallbackPatchAlternatives)) {
    pluginInstallFlowPatches.push({
      label: 'apps page browser fallback opens install url',
      alternatives: pluginsPageBrowserFallbackPatchAlternatives,
    });
  }
  const pluginCardsPatches = [];
  if (sourceHasAlternativePatch(pluginInstallFlowSource, pluginCardsAppConnectPatchAlternatives)) {
    pluginCardsPatches.push({
      label: 'plugin install app connect requests native external browser',
      alternatives: pluginCardsAppConnectPatchAlternatives,
    });
  }
  if (sourceHasAlternativePatch(pluginInstallFlowSource, pluginCardsInstallUrlOpenPatchAlternatives)) {
    pluginCardsPatches.push({
      label: 'plugin install direct install url requests native external browser',
      alternatives: pluginCardsInstallUrlOpenPatchAlternatives,
    });
  }
  if (sourceHasAlternativePatch(pluginInstallFlowSource, pluginCardsBrowserFallbackPatchAlternatives)) {
    pluginCardsPatches.push({
      label: 'plugin install browser fallback opens install url',
      alternatives: pluginCardsBrowserFallbackPatchAlternatives,
    });
  }

  return {
    login: summarizePatchResults(
      (loginRoutePatches.length > 0
        ? applyPatchesToFile(loginRouteBundlePath, loginRoutePatches)
        : []).concat(
      applyPatchesToFile(indexBundlePath, [
        ...browserPaneAvailabilityPatches.map((patch, index) => ({
          label: `linux browser pane availability ${index + 1}`,
          target: patch.target,
          replacement: patch.replacement,
        })),
        ...(needsGoalsFeaturePatches
          ? [
              {
                label: 'renderer forwards goals feature overrides',
                alternatives: rendererGoalsDefaultFeatureOverridePatchAlternatives,
                marker: rendererGoalsDefaultFeatureOverridePatchMarker,
              },
              {
                label: 'renderer advertises goals desktop feature',
                alternatives: rendererDesktopGoalsFeaturePatchAlternatives,
                marker: rendererDesktopGoalsFeaturePatchMarker,
              },
            ]
          : []),
        {
          label: 'renderer syncs only bundled app-server feature enablements',
          alternatives: rendererSupportedFeatureEnablementPatchAlternatives,
          marker: rendererSupportedFeatureEnablementPatchMarker,
        },
        ]),
      ).concat(
        undoBundlePath == null
          ? []
          : applyPatchesToFile(undoBundlePath, [
              {
                label: 'single-batch undo prefers unified diff',
                alternatives: rendererUndoUnifiedDiffPreferencePatchAlternatives,
              },
            ]),
      ).concat(
        applyPatchesToFile(composerBundlePath, [
        ...(needsGoalsFeaturePatches
          ? [
              {
                label: 'composer shows goals slash command',
                alternatives: composerGoalsSlashCommandPatchAlternatives,
                marker: composerGoalsSlashCommandPatchMarker,
              },
            ]
          : []),
        ]),
      ),
    ),
    remoteConnections: summarizePatchResults(
      remoteConnectionPatches.length > 0
        ? applyPatchesToFile(remoteConnectionsPath, remoteConnectionPatches)
        : [],
    ),
    pluginsPage: summarizePatchResults(
      (pluginInstallFlowPatches.length > 0
        ? applyPatchesToFile(pluginInstallFlowPath, pluginInstallFlowPatches)
        : []).concat(
        needsPluginMenuPatch
          ? applyPatchesToFile(appShellPath, [
              {
                label: 'apps page custom title menu is enabled on linux',
                alternatives: pluginsPageLinuxWindowsMenuPatchAlternatives,
                marker: pluginsPageLinuxWindowsMenuPatchMarker,
              },
            ])
          : [],
      ),
    ),
    pluginsCards: summarizePatchResults(
      pluginCardsPatches.length > 0
        ? applyPatchesToFile(pluginInstallFlowPath, pluginCardsPatches)
        : [],
    ),
  };
}

function patchCodexModelSettingsBundle(extractedAppRoot) {
  const modelSettingsPath =
    findOptionalExtractedWebviewAsset(extractedAppRoot, 'use-model-settings-') ??
    findOptionalExtractedWebviewAssetContaining(extractedAppRoot, ['use-collaboration-mode-'], [
      'set-default-model-config-for-host',
      'model_reasoning_effort',
    ]);
  if (modelSettingsPath == null) {
    return summarizePatchResults([]);
  }

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
    modelSettingsPersistCurrentBundleTarget,
    modelSettingsPersistPatchReplacement,
    modelSettingsPersistNewBundleReplacement,
    modelSettingsPersistCurrentBundleReplacement,
  ].some((snippet) => modelSettingsSource.includes(snippet));
  const hasModelSettingsCurrentBundleConfigPathShape = [
    modelSettingsCurrentBundleConfigPathTarget,
    modelSettingsCurrentBundleConfigPathReplacement,
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
                  {
                    target: modelSettingsPersistCurrentBundleTarget,
                    replacement: modelSettingsPersistCurrentBundleReplacement,
                  },
                ],
                marker: modelSettingsPersistPatchMarker,
              },
            ]
          : []
      ),
      ...(
        hasModelSettingsCurrentBundleConfigPathShape
          ? [
              {
                label: 'model settings config path hook position',
                target: modelSettingsCurrentBundleConfigPathTarget,
                replacement: modelSettingsCurrentBundleConfigPathReplacement,
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
    workspaceRootDropHandler: patchCodexWorkspaceRootDropHandlerBundle(extractedAppRoot),
    appShellRenderer: patchCodexAppShellRenderer(extractedAppRoot),
    recoveredSourceSafety: patchCodexRecoveredSourceSafety(extractedAppRoot),
    windowControlsSafeArea: patchCodexWindowControlsSafeArea(extractedAppRoot),
    rendererThreadStart: patchCodexRendererThreadStartBundle(extractedAppRoot),
    rendererRequestClient: patchCodexRendererRequestClientBundle(extractedAppRoot),
    startupShell: patchCodexStartupShell(extractedAppRoot),
    avatarOverlayRenderer: patchCodexAvatarOverlayRenderer(extractedAppRoot),
    authWebview: patchCodexAuthWebviewBundles(extractedAppRoot),
    modelSettings: patchCodexModelSettingsBundle(extractedAppRoot),
  };
}

export function validateMainProcessJavaScript(extractedAppRoot) {
  const buildRoot = path.join(extractedAppRoot, '.vite', 'build');
  const mainBundlePaths = fs
    .readdirSync(buildRoot)
    .filter((entry) => /^main-.+\.js$/.test(entry))
    .sort()
    .map((entry) => path.join(buildRoot, entry));

  if (mainBundlePaths.length !== 1) {
    throw new Error(
      `Expected exactly one patched main-process bundle in ${buildRoot}, found ${mainBundlePaths.length}`,
    );
  }

  const mainBundlePath = mainBundlePaths[0];
  const result = childProcess.spawnSync(
    process.execPath,
    ['--check', mainBundlePath],
    {
      encoding: 'utf8',
      maxBuffer: 64 * 1024 * 1024,
    },
  );

  if (result.status !== 0) {
    const details = (result.stderr || result.stdout || 'unknown syntax error').trim();
    throw new Error(`Patched main-process bundle failed syntax validation:\n${details}`);
  }

  return {
    mainBundlePath,
    syntaxValid: true,
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
  const mainProcessSyntaxSummary = validateMainProcessJavaScript(extractedAppRoot);
  const nativeModuleSummary = normalizeNativeModules(extractedAppRoot);
  await asar.createPackageWithOptions(extractedAppRoot, path.join(resourcesRoot, 'app.asar'), {
    unpack: '*.node',
  });

  const requiredResources = ['codex', 'codex-code-mode-host', 'git', 'rg'];
  for (const resourceName of requiredResources) {
    copyRequired(
      path.join(linuxHelperResourcesRoot, resourceName),
      path.join(resourcesRoot, resourceName),
      `Required codex resource "${resourceName}"`,
    );
  }

  const optionalCodexResources = ['notification.wav', 'THIRD_PARTY_NOTICES.txt'];
  for (const resourceName of optionalCodexResources) {
    copyOptional(
      path.join(codexResourcesRoot, resourceName),
      path.join(resourcesRoot, resourceName),
    );
  }

  const optionalDesktopResources = ['plugins'];
  for (const resourceName of optionalDesktopResources) {
    copyOptional(
      path.join(desktopRoot, 'resources', resourceName),
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
    mainProcessSyntaxSummary,
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
