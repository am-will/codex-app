const e=require(`./src-BZqs_tzA.js`),t=require(`./src-BlTl_Ip2.js`),n=require(`./crash-reporter-env-CEsDRDdf.js`),r=require(`./file-based-logger-BM8MCYTN.js`),i=require(`./sqlite-WcOhlxIC.js`);let a=require(`electron`),o=require(`node:path`);o=e.o(o);let s=require(`node:util`);require(`node:crypto`);let c=require(`node:fs`);c=e.o(c);let l=require(`node:child_process`),u=require(`node:timers/promises`);if(process.platform===`linux`&&typeof process.resourcesPath===`string`){let e=process.env.PATH??``,t=process.resourcesPath;e.split(`:`).includes(t)||(process.env.PATH=e?`${t}:${e}`:t)}var d=`desktop.intelLaunchWarning.message`,f=`{appName} is running the Intel build on an Apple Silicon Mac`,p=`desktop.intelLaunchWarning.detail`,m=`This build works through Rosetta, but the Apple Silicon build launches faster and performs better. Quit now to install the Apple Silicon build, or continue with the Intel build`,h=`desktop.intelLaunchWarning.quit`,g=`Quit`,_=`desktop.intelLaunchWarning.continue`,v=`Continue Anyway`;function y(e,t=x){return!e.isPackaged||e.platform!==`darwin`||e.arch!==`x64`?!1:t()}async function b({appName:e,environment:t,readProcessTranslated:r=x,loadNativeIntl:i=S,showMessageBox:o=e=>a.dialog.showMessageBox(e)}){if(!y(t,r))return!0;try{let t=await i();return(await o({type:`warning`,buttons:[t.formatMessage({messageId:h,defaultMessage:g}),t.formatMessage({messageId:_,defaultMessage:v})],defaultId:0,cancelId:0,noLink:!0,message:t.formatMessage({messageId:d,defaultMessage:f,values:{appName:e}}),detail:t.formatMessage({messageId:p,defaultMessage:m})})).response===1}catch(e){return n.r().warning(`Failed to show Intel-on-Apple-Silicon launch warning`,{safe:{errorName:e instanceof Error?e.name:null}}),!0}}function x(){try{return(0,l.execFileSync)(`sysctl`,[`-in`,`sysctl.proc_translated`],{encoding:`utf8`,env:n.t(process.env),stdio:[`ignore`,`pipe`,`ignore`]}).trim()===`1`}catch{return!1}}async function S(){try{return i.H()}catch{try{return await i.B.load(``)}catch{return i.B.createDefault()}}}function C({buildFlavor:e,env:t}){let n=t.CODEX_ELECTRON_CHROMIUM_SWITCHES?.trim();if(e!==r.a.Dev||!n)return[];let i;try{i=JSON.parse(n)}catch{throw Error(`CODEX_ELECTRON_CHROMIUM_SWITCHES must be valid JSON`)}if(typeof i!=`object`||!i||Array.isArray(i))throw Error(`CODEX_ELECTRON_CHROMIUM_SWITCHES must be a JSON object`);return Object.entries(i).map(([e,t])=>{if(e.length===0)throw Error(`CODEX_ELECTRON_CHROMIUM_SWITCHES contains an empty switch name`);if(t!=null&&typeof t!=`string`)throw Error(`CODEX_ELECTRON_CHROMIUM_SWITCHES value for ${e} must be a string or null`);return t==null?{name:e}:{name:e,value:t}})}function ee({appDataPath:e,buildFlavor:n,env:r}){let i=r.CODEX_ELECTRON_USER_DATA_PATH?.trim();if(i)return(0,o.resolve)(i);let a=(0,o.join)(e,t.Na(n)),s=r.CODEX_ELECTRON_AGENT_RUN_ID?.trim()||null;return n===`agent`&&s!=null?(0,o.join)(a,`agent`,s):a}var w=`pending-source-dmg-cleanup.json`,T=25,te=250,E=(0,s.promisify)(l.execFile),ne=t.xl({images:t.pl(t.xl({"image-path":t.wl().optional(),"system-entities":t.pl(t.xl({"mount-point":t.wl().optional()}).passthrough()).optional()}).passthrough()).optional()}).passthrough(),re=t.xl({sourceDmgPath:t.wl()}).passthrough();async function ie({clearPendingSourceDmgPath:e=B,copyAppBundleToApplicationsFolder:t=k,detachSourceDmg:r=W,getCurrentAppBundlePath:o=i.s,getPendingSourceDmgPath:s=R,getSourceDmgPath:l=H,isApplicationsFolderWritable:u=O,isPackaged:d=a.app.isPackaged,openInstalledAppBundle:f=A,platform:p=process.platform,quitCurrentApp:m=()=>a.app.quit(),setPendingSourceDmgPath:h=z,showInstallerWindow:g=j,sourceDmgExists:_=c.existsSync,trashItem:v=e=>a.shell.trashItem(e),isInApplicationsFolder:y=()=>ae({getCurrentAppBundlePath:o}),moveAppBundleToApplicationsFolder:b=D}={}){if(p!==`darwin`||!d)return!1;if(y())return await P({clearPendingSourceDmgPath:e,detachSourceDmg:r,getPendingSourceDmgPath:s,sourceDmgExists:_,trashItem:v}),!1;let x=F(l);if(x==null)return!1;let S=await g();I({setPendingSourceDmgPath:h,sourceDmgPath:x});try{switch(b(S.allowClose)){case`moved`:return!0;case`canceled`:return e(),await S.setStatus(`failed`),!0;case`unavailable`:break}if(!u())return e(),await S.setStatus(`failed`),!0;let n=await t(o());return n==null?(e(),await S.setStatus(`failed`),!0):(await S.setStatus(`opening`),await f(n)?(m(),!0):(await S.setStatus(`openFailed`),!0))}catch(t){return e(),n.r().warning(`Failed to install app in Applications folder`,{safe:{errorType:t instanceof Error?t.name:typeof t}}),await S.setStatus(`failed`),!0}}function ae({getCurrentAppBundlePath:e}){try{if(`isInApplicationsFolder`in a.app)return a.app.isInApplicationsFolder()}catch(e){n.r().warning(`Failed to check app Applications folder status`,{safe:{errorType:e instanceof Error?e.name:typeof e}})}try{return J(e(),`/Applications`)}catch{return!1}}function D(e){if(!(`moveToApplicationsFolder`in a.app))return`unavailable`;a.app.releaseSingleInstanceLock(),e();try{let e=a.app.moveToApplicationsFolder();return e||a.app.requestSingleInstanceLock(),e?`moved`:`canceled`}catch(e){throw a.app.requestSingleInstanceLock(),e}}function O(){try{return c.accessSync(`/Applications`,c.constants.W_OK),!0}catch{return!1}}async function k(e){if(!J(process.execPath,e))return null;let t=o.join(`/Applications`,o.basename(e)),r=o.join(`/Applications`,`.${o.basename(e)}.codex-installing-${process.pid}`);try{return c.rmSync(r,{force:!0,recursive:!0}),await E(`ditto`,[e,r]),c.existsSync(t)&&await a.shell.trashItem(t),c.renameSync(r,t),t}catch(e){return N(r),n.r().warning(`Failed to copy app bundle to Applications folder`,{safe:{errorType:e instanceof Error?e.name:typeof e}}),null}}async function A(e){try{return a.app.releaseSingleInstanceLock(),await E(`open`,[`-n`,e]),!0}catch(e){return n.r().warning(`Failed to launch installed app bundle`,{safe:{errorType:e instanceof Error?e.name:typeof e}}),!1}}async function j(){let e=!1,t=new a.BrowserWindow({width:420,height:176,resizable:!1,maximizable:!1,fullscreenable:!1,closable:!1,show:!1,title:`Installing ${a.app.getName()}`,webPreferences:{contextIsolation:!0,nodeIntegration:!1,sandbox:!0,spellcheck:!1,devTools:!1}}),n=()=>{e=!0,t.setClosable(!0)};return t.setMenuBarVisibility(!1),t.on(`close`,t=>{e||t.preventDefault()}),t.on(`closed`,()=>{e&&a.app.quit()}),t.webContents.setWindowOpenHandler(()=>({action:`deny`})),t.webContents.on(`will-navigate`,e=>{e.preventDefault()}),await t.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(K(a.app.getName()))}`),t.isDestroyed()||(M(t),t.show(),t.focus()),{allowClose:n,setStatus:async e=>{t.isDestroyed()||(n(),await t.webContents.executeJavaScript(`window.setInstallerStatus(${JSON.stringify(e)})`))}}}function M(e){let t=a.screen.getCursorScreenPoint(),{workArea:n}=a.screen.getDisplayNearestPoint(t),{width:r,height:i}=e.getBounds(),o=n.x+Math.max(0,n.width-r),s=n.y+Math.max(0,n.height-i),c=Math.min(o,Math.max(n.x,Math.round(t.x-r/2))),l=Math.min(s,Math.max(n.y,Math.round(t.y-i/2)));e.setPosition(c,l,!1)}function N(e){try{c.rmSync(e,{force:!0,recursive:!0})}catch(e){n.r().warning(`Failed to remove staging app bundle`,{safe:{errorType:e instanceof Error?e.name:typeof e}})}}async function P({clearPendingSourceDmgPath:e,detachSourceDmg:t,getPendingSourceDmgPath:n,sourceDmgExists:r,trashItem:i}){let a=n();a!=null&&await L({detachSourceDmg:t,sourceDmgExists:r,sourceDmgPath:a,trashItem:i})&&e()}function F(e){try{return e()}catch(e){return n.r().warning(`Failed to find app source DMG`,{safe:{errorType:e instanceof Error?e.name:typeof e}}),null}}function I({setPendingSourceDmgPath:e,sourceDmgPath:t}){try{e(t)}catch(e){n.r().warning(`Failed to remember app source DMG for cleanup`,{safe:{errorType:e instanceof Error?e.name:typeof e}})}}async function L({detachSourceDmg:e,sourceDmgExists:t,sourceDmgPath:r,trashItem:i}){if(!t(r))return!0;let a=!1;for(let t=1;t<=T;t+=1){try{if(e(r)){a=!0;break}}catch{}t<T&&await(0,u.setTimeout)(te)}if(!a)return n.r().warning(`Failed to detach app source DMG after retries`),!1;try{return await i(r),!0}catch(e){return n.r().warning(`Failed to move app source DMG to Trash`,{safe:{errorType:e instanceof Error?e.name:typeof e}}),!1}}function R(){let e=V();if(!c.existsSync(e))return null;try{return re.parse(JSON.parse(c.readFileSync(e,`utf8`))).sourceDmgPath}catch(e){return n.r().warning(`Failed to read pending app source DMG cleanup`,{safe:{errorType:e instanceof Error?e.name:typeof e}}),null}}function z(e){let t=V();c.mkdirSync(o.dirname(t),{recursive:!0}),c.writeFileSync(t,`${JSON.stringify({sourceDmgPath:e})}\n`,`utf8`)}function B(){c.rmSync(V(),{force:!0})}function V(){return o.join(a.app.getPath(`userData`),w)}function H(){let e=i.s();return e.startsWith(`/Volumes/`)?oe(e,U()):null}function oe(e,t){let n=null,r=``;for(let i of t)if(o.extname(i.imagePath).toLowerCase()===`.dmg`)for(let t of i.mountPoints)J(e,t)&&t.length>r.length&&(n=i,r=t);return n?.imagePath??null}function U(){let e=(0,l.execFileSync)(`plutil`,[`-convert`,`json`,`-o`,`-`,`-`],{encoding:`utf8`,input:(0,l.execFileSync)(`hdiutil`,[`info`,`-plist`])});return(ne.parse(JSON.parse(e)).images??[]).flatMap(e=>{if(e[`image-path`]==null)return[];let t=(e[`system-entities`]??[]).flatMap(e=>e[`mount-point`]==null?[]:[e[`mount-point`]]);return t.length===0?[]:[{imagePath:e[`image-path`],mountPoints:t}]})}function W(e){for(let t of U())if(o.resolve(t.imagePath)===o.resolve(e)){for(let e of t.mountPoints)if(!G(e))return!1}return!0}function G(e){try{return(0,l.execFileSync)(`hdiutil`,[`detach`,e]),!0}catch{return!1}}function K(e){let t=q(e);return`<!doctype html>
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
</html>`}function q(e){return e.replaceAll(`&`,`&amp;`).replaceAll(`<`,`&lt;`).replaceAll(`>`,`&gt;`)}function J(e,t){let n=o.relative(t,e);return n===``||!!n&&!n.startsWith(`..`)&&!o.isAbsolute(n)}var se=1e4;function ce(e){if(process.platform!==`darwin`||!a.app.isPackaged||e!==t.Vc.ChatGPT)return!1;let n=le(),r=o.default.join(process.resourcesPath,`native`,`launch-services-helper`);if(n==null||!(0,c.existsSync)(r)||!Y(r,[`needs-renamed-dock-tile-repair`,n]))return!1;try{return a.app.setActivationPolicy(`accessory`),Y(r,[`repair-renamed-dock-tile`,n])}finally{a.app.setActivationPolicy(`regular`)}}function Y(e,t){try{return(0,l.execFileSync)(e,t,{encoding:`utf8`,timeout:se}).trim()===`true`}catch{return!1}}function le(){let e=o.default.dirname(o.default.dirname(process.execPath)),t=o.default.dirname(e);return t.endsWith(`.app`)?t:null}function X(){a.app.on(`window-all-closed`,()=>{(process.platform===`darwin`&&!a.app.isPackaged||process.platform!==`darwin`&&process.platform!==`win32`)&&a.app.quit()})}var ue={"install-update":`Install Update`,"check-for-updates":`Check for Updates`,quit:`Quit`};async function de(e){let{sparkleManager:t}=i.u(),n=t.getIsUpdateReady()?[`install-update`,`quit`]:t.hasUpdater()?[`check-for-updates`,`quit`]:[`quit`];switch(n[(await a.dialog.showMessageBox({type:`error`,buttons:n.map(e=>ue[e]),defaultId:0,cancelId:n.length-1,message:`${a.app.getName()} failed to start.`,detail:e instanceof Error?e.message:`The main desktop app failed during startup.`,noLink:!0})).response]??`quit`){case`install-update`:await t.installUpdatesIfAvailable();return;case`check-for-updates`:await t.checkForUpdates();return;case`quit`:a.app.quit();return}}var fe=process.platform===`darwin`,Z=r.a.resolve(),Q=i.U();process.platform===`linux`&&(process.env.ELECTRON_OZONE_PLATFORM_HINT=`x11`,a.app.commandLine.appendSwitch(`ozone-platform`,`x11`));for(let e of C({buildFlavor:Z,env:process.env}))a.app.commandLine.appendSwitch(e.name,e.value);i.a(),X(),a.app.setName(t.Na(Z,Q)),a.app.setPath(`userData`,ee({appDataPath:a.app.getPath(`appData`),buildFlavor:Z,env:process.env})),process.platform===`win32`&&a.app.setAppUserModelId(r.r(Z));var $=i.l({isMacOS:fe,isPackaged:a.app.isPackaged});if(!(!$||a.app.requestSingleInstanceLock()))n.r().info(`Exiting second desktop instance`,{safe:{packaged:a.app.isPackaged,platform:process.platform}}),a.app.exit(0);else{ce(Q)&&n.r().info(`Repaired renamed Dock tile`,{safe:{platform:process.platform,version:a.app.getVersion()}});let e=i.u(Z);$&&a.app.on(`second-instance`,(t,n)=>{e.queueSecondInstanceArgs(n)}),a.app.whenReady().then(async()=>{let{desktopSentry:t,sparkleManager:r}=e;if(!await b({appName:a.app.getName(),environment:{arch:process.arch,isPackaged:a.app.isPackaged,platform:process.platform}})){a.app.quit();return}if(!await ie()&&await i.r()){await r.initialize();try{let{runMainAppStartup:e}=await Promise.resolve().then(()=>require(`./main-BHxSB3aK.js`));await e()}catch(e){for(let e of a.BrowserWindow.getAllWindows())e.isDestroyed()||e.destroy();n.r().error(`Desktop bootstrap failed to start the main app`,{safe:{phase:`bootstrap-import-main`}}),(()=>{try{process.stderr?.writable&&console.error(e?.stack??e)}catch{}})(),t.captureException(e,{tags:{phase:`bootstrap-import-main`}}),await de(e)}}})}
//# sourceMappingURL=bootstrap-DIX4vlqR.js.map