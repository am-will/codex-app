const e=require(`./src-BZqs_tzA.js`),t=require(`./src-fg9h3MDi.js`),n=require(`./workspace-root-drop-handler-C51cTh1i.js`);let r=require(`electron`),i=require(`node:path`);i=e.o(i);let a=require(`node:util`),o=require(`node:fs`);o=e.o(o),require(`node:crypto`);let s=require(`node:child_process`),c=require(`node:timers/promises`);if(process.platform===`linux`&&typeof process.resourcesPath==`string`){let e=process.env.PATH??``,t=process.resourcesPath;e.split(`:`).includes(t)||(process.env.PATH=e?`${t}:${e}`:t)}var l=`desktop.intelLaunchWarning.message`,u=`{appName} is running the Intel build on an Apple Silicon Mac`,d=`desktop.intelLaunchWarning.detail`,f=`This build works through Rosetta, but the Apple Silicon build launches faster and performs better. Quit now to install the Apple Silicon build, or continue with the Intel build`,p=`desktop.intelLaunchWarning.quit`,m=`Quit`,h=`desktop.intelLaunchWarning.continue`,g=`Continue Anyway`;function _(e,t=y){return!e.isPackaged||e.platform!==`darwin`||e.arch!==`x64`?!1:t()}async function v({appName:e,environment:n,readProcessTranslated:i=y,loadNativeIntl:a=b,showMessageBox:o=e=>r.dialog.showMessageBox(e)}){if(!_(n,i))return!0;try{let t=await a();return(await o({type:`warning`,buttons:[t.formatMessage({messageId:p,defaultMessage:m}),t.formatMessage({messageId:h,defaultMessage:g})],defaultId:0,cancelId:0,noLink:!0,message:t.formatMessage({messageId:l,defaultMessage:u,values:{appName:e}}),detail:t.formatMessage({messageId:d,defaultMessage:f})})).response===1}catch(e){return t.Vr().warning(`Failed to show Intel-on-Apple-Silicon launch warning`,{safe:{errorName:e instanceof Error?e.name:null}}),!0}}function y(){try{return(0,s.execFileSync)(`sysctl`,[`-in`,`sysctl.proc_translated`],{encoding:`utf8`,env:t.zr(process.env),stdio:[`ignore`,`pipe`,`ignore`]}).trim()===`1`}catch{return!1}}async function b(){try{return n.G()}catch{try{return await n.U.load(``)}catch{return n.U.createDefault()}}}function x({appDataPath:e,buildFlavor:n,env:r}){let a=r.CODEX_ELECTRON_USER_DATA_PATH?.trim();if(a)return(0,i.resolve)(a);let o=(0,i.join)(e,t.Qi(n)),s=r.CODEX_ELECTRON_AGENT_RUN_ID?.trim()||null;return n===`agent`&&s!=null?(0,i.join)(o,`agent`,s):o}var S=`pending-source-dmg-cleanup.json`,C=25,w=250,T=(0,a.promisify)(s.execFile),E=t.zs({images:t.Ms(t.zs({"image-path":t.Hs().optional(),"system-entities":t.Ms(t.zs({"mount-point":t.Hs().optional()}).passthrough()).optional()}).passthrough()).optional()}).passthrough(),D=t.zs({sourceDmgPath:t.Hs()}).passthrough();async function O({clearPendingSourceDmgPath:e=B,copyAppBundleToApplicationsFolder:i=k,detachSourceDmg:a=G,getCurrentAppBundlePath:s=n.D,getPendingSourceDmgPath:c=R,getSourceDmgPath:l=H,isApplicationsFolderWritable:u=ne,isPackaged:d=r.app.isPackaged,openInstalledAppBundle:f=A,platform:p=process.platform,quitCurrentApp:m=()=>r.app.quit(),setPendingSourceDmgPath:h=z,showInstallerWindow:g=j,sourceDmgExists:_=o.existsSync,trashItem:v=e=>r.shell.trashItem(e),isInApplicationsFolder:y=()=>ee({getCurrentAppBundlePath:s}),moveAppBundleToApplicationsFolder:b=te}={}){if(p!==`darwin`||!d)return!1;if(y())return await P({clearPendingSourceDmgPath:e,detachSourceDmg:a,getPendingSourceDmgPath:c,sourceDmgExists:_,trashItem:v}),!1;let x=F(l);if(x==null)return!1;let S=await g();I({setPendingSourceDmgPath:h,sourceDmgPath:x});try{switch(b(S.allowClose)){case`moved`:return!0;case`canceled`:return e(),await S.setStatus(`failed`),!0;case`unavailable`:break}if(!u())return e(),await S.setStatus(`failed`),!0;let t=await i(s());return t==null?(e(),await S.setStatus(`failed`),!0):(await S.setStatus(`opening`),await f(t)?(m(),!0):(await S.setStatus(`openFailed`),!0))}catch(n){return e(),t.Vr().warning(`Failed to install app in Applications folder`,{safe:{errorType:n instanceof Error?n.name:typeof n}}),await S.setStatus(`failed`),!0}}function ee({getCurrentAppBundlePath:e}){try{if(`isInApplicationsFolder`in r.app)return r.app.isInApplicationsFolder()}catch(e){t.Vr().warning(`Failed to check app Applications folder status`,{safe:{errorType:e instanceof Error?e.name:typeof e}})}try{return Y(e(),`/Applications`)}catch{return!1}}function te(e){if(!(`moveToApplicationsFolder`in r.app))return`unavailable`;r.app.releaseSingleInstanceLock(),e();try{let e=r.app.moveToApplicationsFolder();return e||r.app.requestSingleInstanceLock(),e?`moved`:`canceled`}catch(e){throw r.app.requestSingleInstanceLock(),e}}function ne(){try{return o.accessSync(`/Applications`,o.constants.W_OK),!0}catch{return!1}}async function k(e){if(!Y(process.execPath,e))return null;let n=i.join(`/Applications`,i.basename(e)),a=i.join(`/Applications`,`.${i.basename(e)}.codex-installing-${process.pid}`);try{return o.rmSync(a,{force:!0,recursive:!0}),await T(`ditto`,[e,a]),o.existsSync(n)&&await r.shell.trashItem(n),o.renameSync(a,n),n}catch(e){return N(a),t.Vr().warning(`Failed to copy app bundle to Applications folder`,{safe:{errorType:e instanceof Error?e.name:typeof e}}),null}}async function A(e){try{return r.app.releaseSingleInstanceLock(),await T(`open`,[`-n`,e]),!0}catch(e){return t.Vr().warning(`Failed to launch installed app bundle`,{safe:{errorType:e instanceof Error?e.name:typeof e}}),!1}}async function j(){let e=!1,t=new r.BrowserWindow({width:420,height:176,resizable:!1,maximizable:!1,fullscreenable:!1,closable:!1,show:!1,title:`Installing ${r.app.getName()}`,webPreferences:{contextIsolation:!0,nodeIntegration:!1,sandbox:!0,spellcheck:!1,devTools:!1}}),n=()=>{e=!0,t.setClosable(!0)};return t.setMenuBarVisibility(!1),t.on(`close`,t=>{e||t.preventDefault()}),t.on(`closed`,()=>{e&&r.app.quit()}),t.webContents.setWindowOpenHandler(()=>({action:`deny`})),t.webContents.on(`will-navigate`,e=>{e.preventDefault()}),await t.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(q(r.app.getName()))}`),t.isDestroyed()||(M(t),t.show(),t.focus()),{allowClose:n,setStatus:async e=>{t.isDestroyed()||(n(),await t.webContents.executeJavaScript(`window.setInstallerStatus(${JSON.stringify(e)})`))}}}function M(e){let t=r.screen.getCursorScreenPoint(),{workArea:n}=r.screen.getDisplayNearestPoint(t),{width:i,height:a}=e.getBounds(),o=n.x+Math.max(0,n.width-i),s=n.y+Math.max(0,n.height-a),c=Math.min(o,Math.max(n.x,Math.round(t.x-i/2))),l=Math.min(s,Math.max(n.y,Math.round(t.y-a/2)));e.setPosition(c,l,!1)}function N(e){try{o.rmSync(e,{force:!0,recursive:!0})}catch(e){t.Vr().warning(`Failed to remove staging app bundle`,{safe:{errorType:e instanceof Error?e.name:typeof e}})}}async function P({clearPendingSourceDmgPath:e,detachSourceDmg:t,getPendingSourceDmgPath:n,sourceDmgExists:r,trashItem:i}){let a=n();a!=null&&await L({detachSourceDmg:t,sourceDmgExists:r,sourceDmgPath:a,trashItem:i})&&e()}function F(e){try{return e()}catch(e){return t.Vr().warning(`Failed to find app source DMG`,{safe:{errorType:e instanceof Error?e.name:typeof e}}),null}}function I({setPendingSourceDmgPath:e,sourceDmgPath:n}){try{e(n)}catch(e){t.Vr().warning(`Failed to remember app source DMG for cleanup`,{safe:{errorType:e instanceof Error?e.name:typeof e}})}}async function L({detachSourceDmg:e,sourceDmgExists:n,sourceDmgPath:r,trashItem:i}){if(!n(r))return!0;let a=!1;for(let t=1;t<=C;t+=1){try{if(e(r)){a=!0;break}}catch{}t<C&&await(0,c.setTimeout)(w)}if(!a)return t.Vr().warning(`Failed to detach app source DMG after retries`),!1;try{return await i(r),!0}catch(e){return t.Vr().warning(`Failed to move app source DMG to Trash`,{safe:{errorType:e instanceof Error?e.name:typeof e}}),!1}}function R(){let e=V();if(!o.existsSync(e))return null;try{return D.parse(JSON.parse(o.readFileSync(e,`utf8`))).sourceDmgPath}catch(e){return t.Vr().warning(`Failed to read pending app source DMG cleanup`,{safe:{errorType:e instanceof Error?e.name:typeof e}}),null}}function z(e){let t=V();o.mkdirSync(i.dirname(t),{recursive:!0}),o.writeFileSync(t,`${JSON.stringify({sourceDmgPath:e})}\n`,`utf8`)}function B(){o.rmSync(V(),{force:!0})}function V(){return i.join(r.app.getPath(`userData`),S)}function H(){let e=n.D();return e.startsWith(`/Volumes/`)?U(e,W()):null}function U(e,t){let n=null,r=``;for(let a of t)if(i.extname(a.imagePath).toLowerCase()===`.dmg`)for(let t of a.mountPoints)Y(e,t)&&t.length>r.length&&(n=a,r=t);return n?.imagePath??null}function W(){let e=(0,s.execFileSync)(`plutil`,[`-convert`,`json`,`-o`,`-`,`-`],{encoding:`utf8`,input:(0,s.execFileSync)(`hdiutil`,[`info`,`-plist`])});return(E.parse(JSON.parse(e)).images??[]).flatMap(e=>{if(e[`image-path`]==null)return[];let t=(e[`system-entities`]??[]).flatMap(e=>e[`mount-point`]==null?[]:[e[`mount-point`]]);return t.length===0?[]:[{imagePath:e[`image-path`],mountPoints:t}]})}function G(e){for(let t of W())if(i.resolve(t.imagePath)===i.resolve(e)){for(let e of t.mountPoints)if(!K(e))return!1}return!0}function K(e){try{return(0,s.execFileSync)(`hdiutil`,[`detach`,e]),!0}catch{return!1}}function q(e){let t=J(e);return`<!doctype html>
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
</html>`}function J(e){return e.replaceAll(`&`,`&amp;`).replaceAll(`<`,`&lt;`).replaceAll(`>`,`&gt;`)}function Y(e,t){let n=i.relative(t,e);return n===``||!!n&&!n.startsWith(`..`)&&!i.isAbsolute(n)}var X={"install-update":`Install Update`,"check-for-updates":`Check for Updates`,quit:`Quit`};async function re(e){let{sparkleManager:t}=n.j(),i=t.getIsUpdateReady()?[`install-update`,`quit`]:t.hasUpdater()?[`check-for-updates`,`quit`]:[`quit`];switch(i[(await r.dialog.showMessageBox({type:`error`,buttons:i.map(e=>X[e]),defaultId:0,cancelId:i.length-1,message:`${r.app.getName()} failed to start.`,detail:e instanceof Error?e.message:`The main desktop app failed during startup.`,noLink:!0})).response]??`quit`){case`install-update`:await t.installUpdatesIfAvailable();return;case`check-for-updates`:await t.checkForUpdates();return;case`quit`:r.app.quit();return}}var Z=process.platform===`darwin`,Q=n.I.resolve(),ie=n.K();n.b(),n.n(Z),r.app.setName(t.Qi(Q,ie)),r.app.setPath(`userData`,x({appDataPath:r.app.getPath(`appData`),buildFlavor:Q,env:process.env})),n.T(),process.platform===`win32`&&r.app.setAppUserModelId(n.A(Q));var $=n.k({isMacOS:Z,isPackaged:r.app.isPackaged});if(!(!$||r.app.requestSingleInstanceLock()))t.Vr().info(`Exiting second desktop instance`,{safe:{packaged:r.app.isPackaged,platform:process.platform}}),r.app.exit(0);else{let e=n.j(Q);$&&r.app.on(`second-instance`,(t,n)=>{e.queueSecondInstanceArgs(n)}),r.app.whenReady().then(async()=>{let{desktopSentry:i,sparkleManager:a}=e;if(!await v({appName:r.app.getName(),environment:{arch:process.arch,isPackaged:r.app.isPackaged,platform:process.platform}})){r.app.quit();return}if(!await O()&&await n.v()){await a.initialize();try{let{runMainAppStartup:e}=await Promise.resolve().then(()=>require(`./main-DFegGFWC.js`));await e()}catch(e){for(let e of r.BrowserWindow.getAllWindows())e.isDestroyed()||e.destroy();t.Vr().error(`Desktop bootstrap failed to start the main app`,{safe:{phase:`bootstrap-import-main`}}),(()=>{try{process.stderr?.writable&&console.error(e?.stack??e)}catch{}})(),i.captureException(e,{tags:{phase:`bootstrap-import-main`}}),await re(e)}}})}
//# sourceMappingURL=bootstrap.js.map