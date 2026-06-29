const e=require(`./src-BZqs_tzA.js`),t=require(`./src-C3H9d_bd.js`),n=require(`./file-based-logger-7hbAyAYH.js`),r=require(`./workspace-root-drop-handler-DbDnwAf_.js`);let i=require(`electron`),a=require(`node:path`);a=e.o(a);let o=require(`node:util`);require(`node:crypto`);let s=require(`node:fs`);s=e.o(s);let c=require(`node:child_process`),l=require(`node:timers/promises`);if(process.platform===`linux`&&typeof process.resourcesPath==`string`){let e=process.env.PATH??``,t=process.resourcesPath;e.split(`:`).includes(t)||(process.env.PATH=e?`${t}:${e}`:t)}var u=`desktop.intelLaunchWarning.message`,d=`{appName} is running the Intel build on an Apple Silicon Mac`,f=`desktop.intelLaunchWarning.detail`,p=`This build works through Rosetta, but the Apple Silicon build launches faster and performs better. Quit now to install the Apple Silicon build, or continue with the Intel build`,m=`desktop.intelLaunchWarning.quit`,h=`Quit`,g=`desktop.intelLaunchWarning.continue`,_=`Continue Anyway`;function v(e,t=b){return!e.isPackaged||e.platform!==`darwin`||e.arch!==`x64`?!1:t()}async function y({appName:e,environment:n,readProcessTranslated:r=b,loadNativeIntl:a=x,showMessageBox:o=e=>i.dialog.showMessageBox(e)}){if(!v(n,r))return!0;try{let t=await a();return(await o({type:`warning`,buttons:[t.formatMessage({messageId:m,defaultMessage:h}),t.formatMessage({messageId:g,defaultMessage:_})],defaultId:0,cancelId:0,noLink:!0,message:t.formatMessage({messageId:u,defaultMessage:d,values:{appName:e}}),detail:t.formatMessage({messageId:f,defaultMessage:p})})).response===1}catch(e){return t.ei().warning(`Failed to show Intel-on-Apple-Silicon launch warning`,{safe:{errorName:e instanceof Error?e.name:null}}),!0}}function b(){try{return(0,c.execFileSync)(`sysctl`,[`-in`,`sysctl.proc_translated`],{encoding:`utf8`,env:t.Qr(process.env),stdio:[`ignore`,`pipe`,`ignore`]}).trim()===`1`}catch{return!1}}async function x(){try{return r.et()}catch{try{return await r.Q.load(``)}catch{return r.Q.createDefault()}}}function S({buildFlavor:e,env:t}){let r=t.CODEX_ELECTRON_CHROMIUM_SWITCHES?.trim();if(e!==n.i.Dev||!r)return[];let i;try{i=JSON.parse(r)}catch{throw Error(`CODEX_ELECTRON_CHROMIUM_SWITCHES must be valid JSON`)}if(typeof i!=`object`||!i||Array.isArray(i))throw Error(`CODEX_ELECTRON_CHROMIUM_SWITCHES must be a JSON object`);return Object.entries(i).map(([e,t])=>{if(e.length===0)throw Error(`CODEX_ELECTRON_CHROMIUM_SWITCHES contains an empty switch name`);if(t!=null&&typeof t!=`string`)throw Error(`CODEX_ELECTRON_CHROMIUM_SWITCHES value for ${e} must be a string or null`);return t==null?{name:e}:{name:e,value:t}})}function C({appDataPath:e,buildFlavor:n,env:r}){let i=r.CODEX_ELECTRON_USER_DATA_PATH?.trim();if(i)return(0,a.resolve)(i);let o=(0,a.join)(e,t.Ca(n)),s=r.CODEX_ELECTRON_AGENT_RUN_ID?.trim()||null;return n===`agent`&&s!=null?(0,a.join)(o,`agent`,s):o}var w=`pending-source-dmg-cleanup.json`,T=25,E=250,D=(0,o.promisify)(c.execFile),ee=t.Yc({images:t.Hc(t.Yc({"image-path":t.Qc().optional(),"system-entities":t.Hc(t.Yc({"mount-point":t.Qc().optional()}).passthrough()).optional()}).passthrough()).optional()}).passthrough(),te=t.Yc({sourceDmgPath:t.Qc()}).passthrough();async function ne({clearPendingSourceDmgPath:e=V,copyAppBundleToApplicationsFolder:n=A,detachSourceDmg:a=K,getCurrentAppBundlePath:o=r.S,getPendingSourceDmgPath:c=z,getSourceDmgPath:l=U,isApplicationsFolderWritable:u=k,isPackaged:d=i.app.isPackaged,openInstalledAppBundle:f=j,platform:p=process.platform,quitCurrentApp:m=()=>i.app.quit(),setPendingSourceDmgPath:h=B,showInstallerWindow:g=M,sourceDmgExists:_=s.existsSync,trashItem:v=e=>i.shell.trashItem(e),isInApplicationsFolder:y=()=>re({getCurrentAppBundlePath:o}),moveAppBundleToApplicationsFolder:b=O}={}){if(p!==`darwin`||!d)return!1;if(y())return await F({clearPendingSourceDmgPath:e,detachSourceDmg:a,getPendingSourceDmgPath:c,sourceDmgExists:_,trashItem:v}),!1;let x=I(l);if(x==null)return!1;let S=await g();L({setPendingSourceDmgPath:h,sourceDmgPath:x});try{switch(b(S.allowClose)){case`moved`:return!0;case`canceled`:return e(),await S.setStatus(`failed`),!0;case`unavailable`:break}if(!u())return e(),await S.setStatus(`failed`),!0;let t=await n(o());return t==null?(e(),await S.setStatus(`failed`),!0):(await S.setStatus(`opening`),await f(t)?(m(),!0):(await S.setStatus(`openFailed`),!0))}catch(n){return e(),t.ei().warning(`Failed to install app in Applications folder`,{safe:{errorType:n instanceof Error?n.name:typeof n}}),await S.setStatus(`failed`),!0}}function re({getCurrentAppBundlePath:e}){try{if(`isInApplicationsFolder`in i.app)return i.app.isInApplicationsFolder()}catch(e){t.ei().warning(`Failed to check app Applications folder status`,{safe:{errorType:e instanceof Error?e.name:typeof e}})}try{return X(e(),`/Applications`)}catch{return!1}}function O(e){if(!(`moveToApplicationsFolder`in i.app))return`unavailable`;i.app.releaseSingleInstanceLock(),e();try{let e=i.app.moveToApplicationsFolder();return e||i.app.requestSingleInstanceLock(),e?`moved`:`canceled`}catch(e){throw i.app.requestSingleInstanceLock(),e}}function k(){try{return s.accessSync(`/Applications`,s.constants.W_OK),!0}catch{return!1}}async function A(e){if(!X(process.execPath,e))return null;let n=a.join(`/Applications`,a.basename(e)),r=a.join(`/Applications`,`.${a.basename(e)}.codex-installing-${process.pid}`);try{return s.rmSync(r,{force:!0,recursive:!0}),await D(`ditto`,[e,r]),s.existsSync(n)&&await i.shell.trashItem(n),s.renameSync(r,n),n}catch(e){return P(r),t.ei().warning(`Failed to copy app bundle to Applications folder`,{safe:{errorType:e instanceof Error?e.name:typeof e}}),null}}async function j(e){try{return i.app.releaseSingleInstanceLock(),await D(`open`,[`-n`,e]),!0}catch(e){return t.ei().warning(`Failed to launch installed app bundle`,{safe:{errorType:e instanceof Error?e.name:typeof e}}),!1}}async function M(){let e=!1,t=new i.BrowserWindow({width:420,height:176,resizable:!1,maximizable:!1,fullscreenable:!1,closable:!1,show:!1,title:`Installing ${i.app.getName()}`,webPreferences:{contextIsolation:!0,nodeIntegration:!1,sandbox:!0,spellcheck:!1,devTools:!1}}),n=()=>{e=!0,t.setClosable(!0)};return t.setMenuBarVisibility(!1),t.on(`close`,t=>{e||t.preventDefault()}),t.on(`closed`,()=>{e&&i.app.quit()}),t.webContents.setWindowOpenHandler(()=>({action:`deny`})),t.webContents.on(`will-navigate`,e=>{e.preventDefault()}),await t.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(J(i.app.getName()))}`),t.isDestroyed()||(N(t),t.show(),t.focus()),{allowClose:n,setStatus:async e=>{t.isDestroyed()||(n(),await t.webContents.executeJavaScript(`window.setInstallerStatus(${JSON.stringify(e)})`))}}}function N(e){let t=i.screen.getCursorScreenPoint(),{workArea:n}=i.screen.getDisplayNearestPoint(t),{width:r,height:a}=e.getBounds(),o=n.x+Math.max(0,n.width-r),s=n.y+Math.max(0,n.height-a),c=Math.min(o,Math.max(n.x,Math.round(t.x-r/2))),l=Math.min(s,Math.max(n.y,Math.round(t.y-a/2)));e.setPosition(c,l,!1)}function P(e){try{s.rmSync(e,{force:!0,recursive:!0})}catch(e){t.ei().warning(`Failed to remove staging app bundle`,{safe:{errorType:e instanceof Error?e.name:typeof e}})}}async function F({clearPendingSourceDmgPath:e,detachSourceDmg:t,getPendingSourceDmgPath:n,sourceDmgExists:r,trashItem:i}){let a=n();a!=null&&await R({detachSourceDmg:t,sourceDmgExists:r,sourceDmgPath:a,trashItem:i})&&e()}function I(e){try{return e()}catch(e){return t.ei().warning(`Failed to find app source DMG`,{safe:{errorType:e instanceof Error?e.name:typeof e}}),null}}function L({setPendingSourceDmgPath:e,sourceDmgPath:n}){try{e(n)}catch(e){t.ei().warning(`Failed to remember app source DMG for cleanup`,{safe:{errorType:e instanceof Error?e.name:typeof e}})}}async function R({detachSourceDmg:e,sourceDmgExists:n,sourceDmgPath:r,trashItem:i}){if(!n(r))return!0;let a=!1;for(let t=1;t<=T;t+=1){try{if(e(r)){a=!0;break}}catch{}t<T&&await(0,l.setTimeout)(E)}if(!a)return t.ei().warning(`Failed to detach app source DMG after retries`),!1;try{return await i(r),!0}catch(e){return t.ei().warning(`Failed to move app source DMG to Trash`,{safe:{errorType:e instanceof Error?e.name:typeof e}}),!1}}function z(){let e=H();if(!s.existsSync(e))return null;try{return te.parse(JSON.parse(s.readFileSync(e,`utf8`))).sourceDmgPath}catch(e){return t.ei().warning(`Failed to read pending app source DMG cleanup`,{safe:{errorType:e instanceof Error?e.name:typeof e}}),null}}function B(e){let t=H();s.mkdirSync(a.dirname(t),{recursive:!0}),s.writeFileSync(t,`${JSON.stringify({sourceDmgPath:e})}\n`,`utf8`)}function V(){s.rmSync(H(),{force:!0})}function H(){return a.join(i.app.getPath(`userData`),w)}function U(){let e=r.S();return e.startsWith(`/Volumes/`)?W(e,G()):null}function W(e,t){let n=null,r=``;for(let i of t)if(a.extname(i.imagePath).toLowerCase()===`.dmg`)for(let t of i.mountPoints)X(e,t)&&t.length>r.length&&(n=i,r=t);return n?.imagePath??null}function G(){let e=(0,c.execFileSync)(`plutil`,[`-convert`,`json`,`-o`,`-`,`-`],{encoding:`utf8`,input:(0,c.execFileSync)(`hdiutil`,[`info`,`-plist`])});return(ee.parse(JSON.parse(e)).images??[]).flatMap(e=>{if(e[`image-path`]==null)return[];let t=(e[`system-entities`]??[]).flatMap(e=>e[`mount-point`]==null?[]:[e[`mount-point`]]);return t.length===0?[]:[{imagePath:e[`image-path`],mountPoints:t}]})}function K(e){for(let t of G())if(a.resolve(t.imagePath)===a.resolve(e)){for(let e of t.mountPoints)if(!q(e))return!1}return!0}function q(e){try{return(0,c.execFileSync)(`hdiutil`,[`detach`,e]),!0}catch{return!1}}function J(e){let t=Y(e);return`<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    :root {
      color-scheme: light dark;
      --accent: #0a84ff;
      --background: #f5f5f7;
      --foreground: #1d1d1f;
      --muted: #6e6e73;
      --track: rgba(0, 0, 0, 0.12);
    }

    @media (prefers-color-scheme: dark) {
      :root {
        --background: #1e1e1e;
        --foreground: #f5f5f7;
        --muted: #a1a1a6;
        --track: rgba(255, 255, 255, 0.18);
      }
    }

    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      min-height: 100vh;
      display: flex;
      align-items: center;
      background: var(--background);
      color: var(--foreground);
      font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif;
    }

    main {
      width: 100%;
      padding: 28px 32px;
    }

    h1 {
      margin: 0;
      font-size: 17px;
      font-weight: 600;
      letter-spacing: 0;
    }

    p {
      margin: 8px 0 0;
      color: var(--muted);
      font-size: 13px;
      line-height: 1.45;
    }

    .progress {
      margin-top: 22px;
      height: 4px;
      overflow: hidden;
      border-radius: 999px;
      background: var(--track);
    }

    .progress::before {
      content: "";
      display: block;
      width: 45%;
      height: 100%;
      border-radius: inherit;
      background: var(--accent);
      animation: progress 1.1s linear infinite;
    }

    body[data-status="failed"] .progress {
      display: none;
    }

    @keyframes progress {
      0% {
        transform: translateX(-110%);
      }
      100% {
        transform: translateX(245%);
      }
    }
  </style>
</head>
<body data-status="installing">
  <main>
    <h1 id="title">Installing ${t}</h1>
    <p id="detail">Moving ${t} to Applications…</p>
    <div class="progress" role="progressbar" aria-label="Installation progress"></div>
  </main>
  <script>
    const appName = ${JSON.stringify(e)};
    const statuses = {
      failed: {
        title: "Couldn't install " + appName,
        detail: "Close this window and double-click " + appName + " again to retry, or drag it to Applications if the move keeps failing"
      },
      openFailed: {
        title: appName + " is installed",
        detail: "Open " + appName + " from the Applications folder to finish setup"
      },
      opening: {
        title: "Opening " + appName,
        detail: "Launching " + appName + " from Applications…"
      }
    };

    window.setInstallerStatus = (status) => {
      const nextStatus = statuses[status] ?? statuses.failed;
      document.body.dataset.status = status;
      document.getElementById("title").textContent = nextStatus.title;
      document.getElementById("detail").textContent = nextStatus.detail;
    };
  <\/script>
</body>
</html>`}function Y(e){return e.replaceAll(`&`,`&amp;`).replaceAll(`<`,`&lt;`).replaceAll(`>`,`&gt;`)}function X(e,t){let n=a.relative(t,e);return n===``||!!n&&!n.startsWith(`..`)&&!a.isAbsolute(n)}function ie(){i.app.on(`window-all-closed`,()=>{(process.platform===`darwin`&&!i.app.isPackaged||process.platform!==`darwin`&&process.platform!==`win32`)&&i.app.quit()})}var ae={"install-update":`Install Update`,"check-for-updates":`Check for Updates`,quit:`Quit`};async function oe(e){let{sparkleManager:t}=r.T(),n=t.getIsUpdateReady()?[`install-update`,`quit`]:t.hasUpdater()?[`check-for-updates`,`quit`]:[`quit`];switch(n[(await i.dialog.showMessageBox({type:`error`,buttons:n.map(e=>ae[e]),defaultId:0,cancelId:n.length-1,message:`${i.app.getName()} failed to start.`,detail:e instanceof Error?e.message:`The main desktop app failed during startup.`,noLink:!0})).response]??`quit`){case`install-update`:await t.installUpdatesIfAvailable();return;case`check-for-updates`:await t.checkForUpdates();return;case`quit`:i.app.quit();return}}var Z=process.platform===`darwin`,Q=n.i.resolve(),se=r.tt();process.platform===`linux`&&(process.env.ELECTRON_OZONE_PLATFORM_HINT=`wayland`,i.app.commandLine.appendSwitch(`ozone-platform`,`wayland`),i.app.commandLine.appendSwitch(`enable-features`,`UseOzonePlatform,WaylandWindowDecorations`),i.app.commandLine.appendSwitch(`enable-wayland-ime`),i.app.commandLine.appendSwitch(`wayland-text-input-version`,`3`));for(let e of S({buildFlavor:Q,env:process.env}))i.app.commandLine.appendSwitch(e.name,e.value);r.b(),r.n(Z),ie(),i.app.setName(t.Ca(Q,se)),i.app.setPath(`userData`,C({appDataPath:i.app.getPath(`appData`),buildFlavor:Q,env:process.env})),process.platform===`win32`&&i.app.setAppUserModelId(n.r(Q));var $=r.w({isMacOS:Z,isPackaged:i.app.isPackaged});if(!(!$||i.app.requestSingleInstanceLock()))t.ei().info(`Exiting second desktop instance`,{safe:{packaged:i.app.isPackaged,platform:process.platform}}),i.app.exit(0);else{let e=r.T(Q);$&&i.app.on(`second-instance`,(t,n)=>{e.queueSecondInstanceArgs(n)}),i.app.whenReady().then(async()=>{let{desktopSentry:n,sparkleManager:a}=e;if(!await y({appName:i.app.getName(),environment:{arch:process.arch,isPackaged:i.app.isPackaged,platform:process.platform}})){i.app.quit();return}if(!await ne()&&await r.v()){await a.initialize();try{let{runMainAppStartup:e}=await Promise.resolve().then(()=>require(`./main-r5HnecX_.js`));await e()}catch(e){for(let e of i.BrowserWindow.getAllWindows())e.isDestroyed()||e.destroy();t.ei().error(`Desktop bootstrap failed to start the main app`,{safe:{phase:`bootstrap-import-main`}}),(()=>{try{process.stderr?.writable&&console.error(e?.stack??e)}catch{}})(),n.captureException(e,{tags:{phase:`bootstrap-import-main`}}),await oe(e)}}})}
//# sourceMappingURL=bootstrap.js.map