const e=require(`./src-BZqs_tzA.js`),t=require(`./src-Cqmg_Kj8.js`),n=require(`./src-BRBmN298.js`),r=require(`./workspace-root-drop-handler-Cu6dJiwB.js`);let i=require(`electron`),a=require(`node:path`);a=e.o(a);let o=require(`node:util`),s=require(`node:fs`);s=e.o(s),require(`node:crypto`);let c=require(`node:child_process`);if(process.platform===`linux`&&typeof process.resourcesPath==`string`){let e=process.env.PATH??``,t=process.resourcesPath;e.split(`:`).includes(t)||(process.env.PATH=e?`${t}:${e}`:t)}var l=`desktop.intelLaunchWarning.message`,u=`{appName} is running the Intel build on an Apple Silicon Mac`,d=`desktop.intelLaunchWarning.detail`,f=`This build works through Rosetta, but the Apple Silicon build launches faster and performs better. Quit now to install the Apple Silicon build, or continue with the Intel build`,p=`desktop.intelLaunchWarning.quit`,m=`Quit`,h=`desktop.intelLaunchWarning.continue`,g=`Continue Anyway`;function _(e,t=y){return!e.isPackaged||e.platform!==`darwin`||e.arch!==`x64`?!1:t()}async function v({appName:e,environment:t,readProcessTranslated:r=y,loadNativeIntl:a=b,showMessageBox:o=e=>i.dialog.showMessageBox(e)}){if(!_(t,r))return!0;try{let t=await a();return(await o({type:`warning`,buttons:[t.formatMessage({messageId:p,defaultMessage:m}),t.formatMessage({messageId:h,defaultMessage:g})],defaultId:0,cancelId:0,noLink:!0,message:t.formatMessage({messageId:l,defaultMessage:u,values:{appName:e}}),detail:t.formatMessage({messageId:d,defaultMessage:f})})).response===1}catch(e){return n.Lr().warning(`Failed to show Intel-on-Apple-Silicon launch warning`,{safe:{errorName:e instanceof Error?e.name:null}}),!0}}function y(){try{return(0,c.execFileSync)(`sysctl`,[`-in`,`sysctl.proc_translated`],{encoding:`utf8`,env:n.Fr(process.env),stdio:[`ignore`,`pipe`,`ignore`]}).trim()===`1`}catch{return!1}}async function b(){try{return r.B()}catch{try{return await r.R.load(``)}catch{return r.R.createDefault()}}}function x({appDataPath:e,buildFlavor:n,env:r}){let i=r.CODEX_ELECTRON_USER_DATA_PATH?.trim();if(i)return(0,a.resolve)(i);let o=(0,a.join)(e,t.ft(n)),s=r.CODEX_ELECTRON_AGENT_RUN_ID?.trim()||null;return n===`agent`&&s!=null?(0,a.join)(o,`agent`,s):o}var S=`pending-source-dmg-cleanup.json`,C=(0,o.promisify)(c.execFile),w=t.Oi({images:t.bi(t.Oi({"image-path":t.ji().optional(),"system-entities":t.bi(t.Oi({"mount-point":t.ji().optional()}).passthrough()).optional()}).passthrough()).optional()}).passthrough(),T=t.Oi({sourceDmgPath:t.ji()}).passthrough();async function E({clearPendingSourceDmgPath:e=z,copyAppBundleToApplicationsFolder:t=te,detachSourceDmg:a=W,getCurrentAppBundlePath:o=r.w,getPendingSourceDmgPath:c=L,getSourceDmgPath:l=V,isApplicationsFolderWritable:u=ee,isPackaged:d=i.app.isPackaged,openInstalledAppBundle:f=k,platform:p=process.platform,quitCurrentApp:m=()=>i.app.quit(),setPendingSourceDmgPath:h=R,showInstallerWindow:g=A,sourceDmgExists:_=s.existsSync,trashItem:v=e=>i.shell.trashItem(e),isInApplicationsFolder:y=()=>D({getCurrentAppBundlePath:o}),moveAppBundleToApplicationsFolder:b=O}={}){if(p!==`darwin`||!d)return!1;if(y())return await N({clearPendingSourceDmgPath:e,detachSourceDmg:a,getPendingSourceDmgPath:c,sourceDmgExists:_,trashItem:v}),!1;let x=P(l);if(x==null)return!1;let S=await g();F({setPendingSourceDmgPath:h,sourceDmgPath:x});try{switch(b(S.allowClose)){case`moved`:return!0;case`canceled`:return e(),await S.setStatus(`failed`),!0;case`unavailable`:break}if(!u())return e(),await S.setStatus(`failed`),!0;let n=await t(o());return n==null?(e(),await S.setStatus(`failed`),!0):(await S.setStatus(`opening`),await f(n)?(m(),!0):(await S.setStatus(`openFailed`),!0))}catch(t){return e(),n.Lr().warning(`Failed to install app in Applications folder`,{safe:{errorType:t instanceof Error?t.name:typeof t}}),await S.setStatus(`failed`),!0}}function D({getCurrentAppBundlePath:e}){try{if(`isInApplicationsFolder`in i.app)return i.app.isInApplicationsFolder()}catch(e){n.Lr().warning(`Failed to check app Applications folder status`,{safe:{errorType:e instanceof Error?e.name:typeof e}})}try{return J(e(),`/Applications`)}catch{return!1}}function O(e){if(!(`moveToApplicationsFolder`in i.app))return`unavailable`;i.app.releaseSingleInstanceLock(),e();try{let e=i.app.moveToApplicationsFolder();return e||i.app.requestSingleInstanceLock(),e?`moved`:`canceled`}catch(e){throw i.app.requestSingleInstanceLock(),e}}function ee(){try{return s.accessSync(`/Applications`,s.constants.W_OK),!0}catch{return!1}}async function te(e){if(!J(process.execPath,e))return null;let t=a.join(`/Applications`,a.basename(e)),r=a.join(`/Applications`,`.${a.basename(e)}.codex-installing-${process.pid}`);try{return s.rmSync(r,{force:!0,recursive:!0}),await C(`ditto`,[e,r]),s.existsSync(t)&&await i.shell.trashItem(t),s.renameSync(r,t),t}catch(e){return M(r),n.Lr().warning(`Failed to copy app bundle to Applications folder`,{safe:{errorType:e instanceof Error?e.name:typeof e}}),null}}async function k(e){try{return i.app.releaseSingleInstanceLock(),await C(`open`,[`-n`,e]),!0}catch(e){return n.Lr().warning(`Failed to launch installed app bundle`,{safe:{errorType:e instanceof Error?e.name:typeof e}}),!1}}async function A(){let e=!1,t=new i.BrowserWindow({width:420,height:176,resizable:!1,maximizable:!1,fullscreenable:!1,closable:!1,show:!1,title:`Installing ${i.app.getName()}`,webPreferences:{contextIsolation:!0,nodeIntegration:!1,sandbox:!0,spellcheck:!1,devTools:!1}}),n=()=>{e=!0,t.setClosable(!0)};return t.setMenuBarVisibility(!1),t.on(`close`,t=>{e||t.preventDefault()}),t.on(`closed`,()=>{e&&i.app.quit()}),t.webContents.setWindowOpenHandler(()=>({action:`deny`})),t.webContents.on(`will-navigate`,e=>{e.preventDefault()}),await t.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(K(i.app.getName()))}`),t.isDestroyed()||(j(t),t.show(),t.focus()),{allowClose:n,setStatus:async e=>{t.isDestroyed()||(n(),await t.webContents.executeJavaScript(`window.setInstallerStatus(${JSON.stringify(e)})`))}}}function j(e){let t=i.screen.getCursorScreenPoint(),{workArea:n}=i.screen.getDisplayNearestPoint(t),{width:r,height:a}=e.getBounds(),o=n.x+Math.max(0,n.width-r),s=n.y+Math.max(0,n.height-a),c=Math.min(o,Math.max(n.x,Math.round(t.x-r/2))),l=Math.min(s,Math.max(n.y,Math.round(t.y-a/2)));e.setPosition(c,l,!1)}function M(e){try{s.rmSync(e,{force:!0,recursive:!0})}catch(e){n.Lr().warning(`Failed to remove staging app bundle`,{safe:{errorType:e instanceof Error?e.name:typeof e}})}}async function N({clearPendingSourceDmgPath:e,detachSourceDmg:t,getPendingSourceDmgPath:n,sourceDmgExists:r,trashItem:i}){let a=n();a!=null&&await I({detachSourceDmg:t,sourceDmgExists:r,sourceDmgPath:a,trashItem:i})&&e()}function P(e){try{return e()}catch(e){return n.Lr().warning(`Failed to find app source DMG`,{safe:{errorType:e instanceof Error?e.name:typeof e}}),null}}function F({setPendingSourceDmgPath:e,sourceDmgPath:t}){try{e(t)}catch(e){n.Lr().warning(`Failed to remember app source DMG for cleanup`,{safe:{errorType:e instanceof Error?e.name:typeof e}})}}async function I({detachSourceDmg:e,sourceDmgExists:t,sourceDmgPath:r,trashItem:i}){if(!t(r))return!0;try{if(!e(r))return!1}catch(e){return n.Lr().warning(`Failed to detach app source DMG`,{safe:{errorType:e instanceof Error?e.name:typeof e}}),!1}try{return await i(r),!0}catch(e){return n.Lr().warning(`Failed to move app source DMG to Trash`,{safe:{errorType:e instanceof Error?e.name:typeof e}}),!1}}function L(){let e=B();if(!s.existsSync(e))return null;try{return T.parse(JSON.parse(s.readFileSync(e,`utf8`))).sourceDmgPath}catch(e){return n.Lr().warning(`Failed to read pending app source DMG cleanup`,{safe:{errorType:e instanceof Error?e.name:typeof e}}),null}}function R(e){let t=B();s.mkdirSync(a.dirname(t),{recursive:!0}),s.writeFileSync(t,`${JSON.stringify({sourceDmgPath:e})}\n`,`utf8`)}function z(){s.rmSync(B(),{force:!0})}function B(){return a.join(i.app.getPath(`userData`),S)}function V(){let e=r.w();return e.startsWith(`/Volumes/`)?H(e,U()):null}function H(e,t){let n=null,r=``;for(let i of t)if(a.extname(i.imagePath).toLowerCase()===`.dmg`)for(let t of i.mountPoints)J(e,t)&&t.length>r.length&&(n=i,r=t);return n?.imagePath??null}function U(){let e=(0,c.execFileSync)(`plutil`,[`-convert`,`json`,`-o`,`-`,`-`],{encoding:`utf8`,input:(0,c.execFileSync)(`hdiutil`,[`info`,`-plist`])});return(w.parse(JSON.parse(e)).images??[]).flatMap(e=>{if(e[`image-path`]==null)return[];let t=(e[`system-entities`]??[]).flatMap(e=>e[`mount-point`]==null?[]:[e[`mount-point`]]);return t.length===0?[]:[{imagePath:e[`image-path`],mountPoints:t}]})}function W(e){for(let t of U())if(a.resolve(t.imagePath)===a.resolve(e)){for(let e of t.mountPoints)if(!G(e))return!1}return!0}function G(e){try{return(0,c.execFileSync)(`hdiutil`,[`detach`,e]),!0}catch{try{return(0,c.execFileSync)(`hdiutil`,[`detach`,`-force`,e]),!0}catch(e){return n.Lr().warning(`Failed to detach app source DMG`,{safe:{errorType:e instanceof Error?e.name:typeof e}}),!1}}}function K(e){let t=q(e);return`<!doctype html>
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
</html>`}function q(e){return e.replaceAll(`&`,`&amp;`).replaceAll(`<`,`&lt;`).replaceAll(`>`,`&gt;`)}function J(e,t){let n=a.relative(t,e);return n===``||!!n&&!n.startsWith(`..`)&&!a.isAbsolute(n)}var Y={"install-update":`Install Update`,"check-for-updates":`Check for Updates`,quit:`Quit`};async function X(e){let{sparkleManager:t}=r.O(),n=t.getIsUpdateReady()?[`install-update`,`quit`]:t.hasUpdater()?[`check-for-updates`,`quit`]:[`quit`];switch(n[(await i.dialog.showMessageBox({type:`error`,buttons:n.map(e=>Y[e]),defaultId:0,cancelId:n.length-1,message:`${i.app.getName()} failed to start.`,detail:e instanceof Error?e.message:`The main desktop app failed during startup.`,noLink:!0})).response]??`quit`){case`install-update`:await t.installUpdatesIfAvailable();return;case`check-for-updates`:await t.checkForUpdates();return;case`quit`:i.app.quit();return}}var Z=process.platform===`darwin`,Q=r.M.resolve();r.v(),r.n(Z),i.app.setName(t.ft(Q)),i.app.setPath(`userData`,x({appDataPath:i.app.getPath(`appData`),buildFlavor:Q,env:process.env})),r.C(),process.platform===`win32`&&i.app.setAppUserModelId(r.D(Q));var $=r.E({isMacOS:Z,isPackaged:i.app.isPackaged});if(!(!$||i.app.requestSingleInstanceLock()))n.Lr().info(`Exiting second desktop instance`,{safe:{packaged:i.app.isPackaged,platform:process.platform}}),i.app.exit(0);else{let e=r.O(Q);$&&i.app.on(`second-instance`,(t,n)=>{e.queueSecondInstanceArgs(n)}),i.app.whenReady().then(async()=>{let{desktopSentry:t,sparkleManager:a}=e;if(!await v({appName:i.app.getName(),environment:{arch:process.arch,isPackaged:i.app.isPackaged,platform:process.platform}})){i.app.quit();return}if(!await E()&&await r.g()){await a.initialize();try{let{runMainAppStartup:e}=await Promise.resolve().then(()=>require(`./main-BJ6Uf5yA.js`));await e()}catch(e){for(let e of i.BrowserWindow.getAllWindows())e.isDestroyed()||e.destroy();n.Lr().error(`Desktop bootstrap failed to start the main app`,{safe:{phase:`bootstrap-import-main`}}),(()=>{try{process.stderr?.writable&&console.error(e?.stack??e)}catch{}})(),t.captureException(e,{tags:{phase:`bootstrap-import-main`}}),await X(e)}}})}
//# sourceMappingURL=bootstrap.js.map