const e=require("./src-KMpTO78a.js"),t=require("./src-Cz_uUmVl.js"),n=require("./window-all-closed-9IR0zY5D.js"),r=require("./crash-reporter-env-D80b9sE5.js"),i=require("./file-based-logger-BxPXYlxI.js");let a=require("electron"),o=require("node:path");o=e.o(o);let s=require("node:util");require("node:crypto");let c=require("node:fs");c=e.o(c);let l=require("node:fs/promises"),u=require("node:child_process"),d=require("node:timers/promises");if(process.platform===`linux`&&typeof process.resourcesPath==`string`){let e=process.env.PATH??``,t=process.resourcesPath;e.split(`:`).includes(t)||(process.env.PATH=e?`${t}:${e}`:t)}var f=`desktop.intelLaunchWarning.message`,p=`{appName} is running the Intel build on an Apple Silicon Mac`,m=`desktop.intelLaunchWarning.detail`,h=`This build works through Rosetta, but the Apple Silicon build launches faster and performs better. Quit now to install the Apple Silicon build, or continue with the Intel build`,g=`desktop.intelLaunchWarning.quit`,_=`Quit`,v=`desktop.intelLaunchWarning.continue`,y=`Continue Anyway`;function b(e,t=S){return!e.isPackaged||e.platform!==`darwin`||e.arch!==`x64`?!1:t()}async function x({appName:e,environment:t,readProcessTranslated:n=S,loadNativeIntl:i=C,showMessageBox:o=e=>a.dialog.showMessageBox(e)}){if(!b(t,n))return!0;try{let t=await i();return(await o({type:`warning`,buttons:[t.formatMessage({messageId:g,defaultMessage:_}),t.formatMessage({messageId:v,defaultMessage:y})],defaultId:0,cancelId:0,noLink:!0,message:t.formatMessage({messageId:f,defaultMessage:p,values:{appName:e}}),detail:t.formatMessage({messageId:m,defaultMessage:h})})).response===1}catch(e){return r.r().warning(`Failed to show Intel-on-Apple-Silicon launch warning`,{safe:{errorName:e instanceof Error?e.name:null}}),!0}}function S(){try{return(0,u.execFileSync)(`/usr/sbin/sysctl`,[`-in`,`sysctl.proc_translated`],{encoding:`utf8`,env:r.t(process.env),stdio:[`ignore`,`pipe`,`ignore`]}).trim()===`1`}catch{return!1}}async function C(){try{return n.Nt()}catch{try{return await n.jt.load(``)}catch{return n.jt.createDefault()}}}function w({buildFlavor:e,env:t}){let n=t.CODEX_ELECTRON_CHROMIUM_SWITCHES?.trim();if(e!==i.a.Dev||!n)return[];let r;try{r=JSON.parse(n)}catch{throw Error(`CODEX_ELECTRON_CHROMIUM_SWITCHES must be valid JSON`)}if(typeof r!=`object`||!r||Array.isArray(r))throw Error(`CODEX_ELECTRON_CHROMIUM_SWITCHES must be a JSON object`);return Object.entries(r).map(([e,t])=>{if(e.length===0)throw Error(`CODEX_ELECTRON_CHROMIUM_SWITCHES contains an empty switch name`);if(t!=null&&typeof t!=`string`)throw Error(`CODEX_ELECTRON_CHROMIUM_SWITCHES value for ${e} must be a string or null`);return t==null?{name:e}:{name:e,value:t}})}function ee({appDataPath:e,buildFlavor:n,env:r}){let i=r.CODEX_ELECTRON_USER_DATA_PATH?.trim();if(i)return(0,o.resolve)(i);let a=(0,o.join)(e,t.Ta(n)),s=r.CODEX_ELECTRON_AGENT_RUN_ID?.trim()||null;return n===`agent`&&s!=null?(0,o.join)(a,`agent`,s):a}var T=`ChatGPT.app`,te=`ChatGPT Classic.app`,ne=[`com.openai.chat-sparkle-updater`,`com.openai.chat-sparkle-progress`],re=`2DC432GLL2`;function ie(e,{applicationsDirectory:t=`/Applications`,hasExpectedOpenAISignature:n=oe,stopLegacyUpdater:i=ae}={}){if(o.basename(e)!==T)return{status:`not-needed`};let a=o.join(t,T),s=o.join(t,te);try{let t=c.lstatSync(a,{throwIfNoEntry:!1});if(t==null)return{status:`not-needed`};if(!t.isDirectory()||!n(e,`com.openai.codex`))return{status:`blocked`};if(n(a,`com.openai.codex`))return{status:`not-needed`};if(!n(a,`com.openai.chat`)||c.lstatSync(s,{throwIfNoEntry:!1})!=null||!i()||!n(a,`com.openai.chat`))return{status:`blocked`};c.renameSync(a,s)}catch(e){return r.r().warning(`Failed to relocate legacy ChatGPT app`,{safe:{errorType:e instanceof Error?e.name:typeof e}}),{status:`blocked`}}return{status:`relocated`,restore:()=>{try{if(c.lstatSync(a,{throwIfNoEntry:!1})!=null||c.lstatSync(s,{throwIfNoEntry:!1})==null)return;c.renameSync(s,a)}catch(e){r.r().warning(`Failed to restore legacy ChatGPT app`,{safe:{errorType:e instanceof Error?e.name:typeof e}})}}}}function ae(){if(typeof process.getuid!=`function`)return!1;let e=`gui/${process.getuid()}`,t=(0,u.spawnSync)(`/bin/launchctl`,[`print`,e],{stdio:`ignore`});if(t.error!=null||t.status!==0)return!1;for(let t of ne){let n=`${e}/${t}`,r=(0,u.spawnSync)(`/bin/launchctl`,[`print`,n],{stdio:`ignore`});if(r.error!=null||r.status==null)return!1;if(r.status!==0)continue;let i=(0,u.spawnSync)(`/bin/launchctl`,[`bootout`,n],{stdio:`ignore`});if(i.error!=null||i.status!==0)return!1}return!0}function oe(e,t){try{return(0,u.execFileSync)(`/usr/bin/codesign`,[`--verify`,`--deep`,`--strict`,`-R=identifier "${t}" and anchor apple generic and certificate leaf[subject.OU] = "${re}"`,e],{stdio:`ignore`}),!0}catch{return!1}}var se=`pending-source-dmg-cleanup.json`,E=25,ce=250,D=(0,s.promisify)(u.execFile),le=t.ol({images:t.Qc(t.ol({"image-path":t.ul().optional(),"system-entities":t.Qc(t.ol({"mount-point":t.ul().optional()}).passthrough()).optional()}).passthrough()).optional()}).passthrough(),ue=t.ol({sourceDmgPath:t.ul()}).passthrough();async function de({clearPendingSourceDmgPath:e=V,copyAppBundleToApplicationsFolder:t=A,detachSourceDmg:i=W,getCurrentAppBundlePath:o=n.l,getPendingSourceDmgPath:s=z,getSourceDmgPath:l=pe,isApplicationsFolderWritable:u=k,isPackaged:d=a.app.isPackaged,openInstalledAppBundle:f=j,platform:p=process.platform,quitCurrentApp:m=()=>a.app.quit(),relocateLegacyChatGPTApp:h=ie,setPendingSourceDmgPath:g=B,showInstallerWindow:_=M,sourceDmgExists:v=c.existsSync,trashItem:y=e=>a.shell.trashItem(e),isInApplicationsFolder:b=()=>fe({getCurrentAppBundlePath:o}),moveAppBundleToApplicationsFolder:x=O}={}){if(p!==`darwin`||!d)return!1;if(b())return await F({clearPendingSourceDmgPath:e,detachSourceDmg:i,getPendingSourceDmgPath:s,sourceDmgExists:v,trashItem:y}),!1;let S=I(l);if(S==null)return!1;let C=await _();L({setPendingSourceDmgPath:g,sourceDmgPath:S});let w=null;try{let n=o(),r=h(n);switch(r.status){case`blocked`:return e(),await C.setStatus(`failed`),!0;case`not-needed`:break;case`relocated`:w=r.restore;break}switch(x(C.allowClose)){case`moved`:return w=null,!0;case`canceled`:return e(),await C.setStatus(`failed`),!0;case`unavailable`:break}if(!u())return e(),await C.setStatus(`failed`),!0;let i=await t(n);return i==null?(e(),await C.setStatus(`failed`),!0):(w=null,await C.setStatus(`opening`),await f(i)?(m(),!0):(await C.setStatus(`openFailed`),!0))}catch(t){return e(),r.r().warning(`Failed to install app in Applications folder`,{safe:{errorType:t instanceof Error?t.name:typeof t}}),await C.setStatus(`failed`),!0}finally{w?.()}}function fe({getCurrentAppBundlePath:e}){try{if(`isInApplicationsFolder`in a.app)return a.app.isInApplicationsFolder()}catch(e){r.r().warning(`Failed to check app Applications folder status`,{safe:{errorType:e instanceof Error?e.name:typeof e}})}try{return G(e(),`/Applications`)}catch{return!1}}function O(e){if(!(`moveToApplicationsFolder`in a.app))return`unavailable`;a.app.releaseSingleInstanceLock(),e();try{let e=a.app.moveToApplicationsFolder();return e||a.app.requestSingleInstanceLock(),e?`moved`:`canceled`}catch(e){throw a.app.requestSingleInstanceLock(),e}}function k(){try{return c.accessSync(`/Applications`,c.constants.W_OK),!0}catch{return!1}}async function A(e){if(!G(process.execPath,e))return null;let t=o.join(`/Applications`,o.basename(e)),n=o.join(`/Applications`,`.${o.basename(e)}.codex-installing-${process.pid}`);try{return c.rmSync(n,{force:!0,recursive:!0}),await D(`/usr/bin/ditto`,[e,n]),c.existsSync(t)&&await a.shell.trashItem(t),c.renameSync(n,t),t}catch(e){return P(n),r.r().warning(`Failed to copy app bundle to Applications folder`,{safe:{errorType:e instanceof Error?e.name:typeof e}}),null}}async function j(e){try{return a.app.releaseSingleInstanceLock(),await D(`/usr/bin/open`,[`-n`,e]),!0}catch(e){return r.r().warning(`Failed to launch installed app bundle`,{safe:{errorType:e instanceof Error?e.name:typeof e}}),!1}}async function M(){let e=!1,t=new a.BrowserWindow({width:420,height:176,resizable:!1,maximizable:!1,fullscreenable:!1,closable:!1,show:!1,title:`Installing ${a.app.getName()}`,webPreferences:{contextIsolation:!0,nodeIntegration:!1,sandbox:!0,spellcheck:!1,devTools:!1}}),n=()=>{e=!0,t.setClosable(!0)};return t.setMenuBarVisibility(!1),t.on(`close`,t=>{e||t.preventDefault()}),t.on(`closed`,()=>{e&&a.app.quit()}),t.webContents.setWindowOpenHandler(()=>({action:`deny`})),t.webContents.on(`will-navigate`,e=>{e.preventDefault()}),await t.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(ge(a.app.getName()))}`),t.isDestroyed()||(N(t),t.show(),t.focus()),{allowClose:n,setStatus:async e=>{t.isDestroyed()||(n(),await t.webContents.executeJavaScript(`window.setInstallerStatus(${JSON.stringify(e)})`))}}}function N(e){let t=a.screen.getCursorScreenPoint(),{workArea:n}=a.screen.getDisplayNearestPoint(t),{width:r,height:i}=e.getBounds(),o=n.x+Math.max(0,n.width-r),s=n.y+Math.max(0,n.height-i),c=Math.min(o,Math.max(n.x,Math.round(t.x-r/2))),l=Math.min(s,Math.max(n.y,Math.round(t.y-i/2)));e.setPosition(c,l,!1)}function P(e){try{c.rmSync(e,{force:!0,recursive:!0})}catch(e){r.r().warning(`Failed to remove staging app bundle`,{safe:{errorType:e instanceof Error?e.name:typeof e}})}}async function F({clearPendingSourceDmgPath:e,detachSourceDmg:t,getPendingSourceDmgPath:n,sourceDmgExists:r,trashItem:i}){let a=n();a!=null&&await R({detachSourceDmg:t,sourceDmgExists:r,sourceDmgPath:a,trashItem:i})&&e()}function I(e){try{return e()}catch(e){return r.r().warning(`Failed to find app source DMG`,{safe:{errorType:e instanceof Error?e.name:typeof e}}),null}}function L({setPendingSourceDmgPath:e,sourceDmgPath:t}){try{e(t)}catch(e){r.r().warning(`Failed to remember app source DMG for cleanup`,{safe:{errorType:e instanceof Error?e.name:typeof e}})}}async function R({detachSourceDmg:e,sourceDmgExists:t,sourceDmgPath:n,trashItem:i}){if(!t(n))return!0;let a=!1;for(let t=1;t<=E;t+=1){try{if(e(n)){a=!0;break}}catch{}t<E&&await(0,d.setTimeout)(ce)}if(!a)return r.r().warning(`Failed to detach app source DMG after retries`),!1;try{return await i(n),!0}catch(e){return r.r().warning(`Failed to move app source DMG to Trash`,{safe:{errorType:e instanceof Error?e.name:typeof e}}),!1}}function z(){let e=H();if(!c.existsSync(e))return null;try{return ue.parse(JSON.parse(c.readFileSync(e,`utf8`))).sourceDmgPath}catch(e){return r.r().warning(`Failed to read pending app source DMG cleanup`,{safe:{errorType:e instanceof Error?e.name:typeof e}}),null}}function B(e){let t=H();c.mkdirSync(o.dirname(t),{recursive:!0}),c.writeFileSync(t,`${JSON.stringify({sourceDmgPath:e})}\n`,`utf8`)}function V(){c.rmSync(H(),{force:!0})}function H(){return o.join(a.app.getPath(`userData`),se)}function pe(){let e=n.l();return e.startsWith(`/Volumes/`)?me(e,U()):null}function me(e,t){let n=null,r=``;for(let i of t)if(o.extname(i.imagePath).toLowerCase()===`.dmg`)for(let t of i.mountPoints)G(e,t)&&t.length>r.length&&(n=i,r=t);return n?.imagePath??null}function U(){let e=(0,u.execFileSync)(`/usr/bin/plutil`,[`-convert`,`json`,`-o`,`-`,`-`],{encoding:`utf8`,input:(0,u.execFileSync)(`/usr/bin/hdiutil`,[`info`,`-plist`])});return(le.parse(JSON.parse(e)).images??[]).flatMap(e=>{if(e[`image-path`]==null)return[];let t=(e[`system-entities`]??[]).flatMap(e=>e[`mount-point`]==null?[]:[e[`mount-point`]]);return t.length===0?[]:[{imagePath:e[`image-path`],mountPoints:t}]})}function W(e){for(let t of U())if(o.resolve(t.imagePath)===o.resolve(e)){for(let e of t.mountPoints)if(!he(e))return!1}return!0}function he(e){try{return(0,u.execFileSync)(`/usr/bin/hdiutil`,[`detach`,e]),!0}catch{return!1}}function ge(e){let t=_e(e);return`<!doctype html>
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
</html>`}function _e(e){return e.replaceAll(`&`,`&amp;`).replaceAll(`<`,`&lt;`).replaceAll(`>`,`&gt;`)}function G(e,t){let n=o.relative(t,e);return n===``||!!n&&!n.startsWith(`..`)&&!o.isAbsolute(n)}var ve=1e4;function ye(e){if(process.platform!==`darwin`||!a.app.isPackaged||e!==t.Sc.ChatGPT)return!1;let n=be(),r=o.default.join(process.resourcesPath,`native`,`launch-services-helper`);if(n==null||!(0,c.existsSync)(r)||!K(r,[`needs-renamed-dock-tile-repair`,n]))return!1;try{return a.app.setActivationPolicy(`accessory`),K(r,[`repair-renamed-dock-tile`,n])}finally{a.app.setActivationPolicy(`regular`)}}function K(e,t){try{return(0,u.execFileSync)(e,t,{encoding:`utf8`,timeout:ve}).trim()===`true`}catch{return!1}}function be(){let e=o.default.dirname(o.default.dirname(process.execPath)),t=o.default.dirname(e);return t.endsWith(`.app`)?t:null}var xe=(0,s.promisify)(u.execFile),q=r.a(`legacy-chatgpt-sparkle-updater`),J=`com.openai.chat`,Se=`${J}-sparkle-updater`,Ce=`${J}-sparkle-progress`;async function we(e){if(e.platform!==`darwin`||!e.isPackaged||e.bundleIdentifier!==`com.openai.codex`||e.userId==null)return;let[t,n]=await Promise.all([Y(`updater`,Se,e.userId),Y(`progress`,Ce,e.userId)]),r=`cleared`;try{await(0,l.rm)(o.default.join(e.homeDirectory,`Library`,`Caches`,J,`org.sparkle-project.Sparkle`),{force:!0,recursive:!0})}catch(e){r=`failed`,q().warning(`Failed to clear legacy ChatGPT Sparkle cache`,{safe:{},sensitive:{error:e}})}q().info(`Finished disarming legacy ChatGPT Sparkle updater`,{safe:{cache:r,progressJob:n,updaterJob:t},sensitive:{}})}async function Y(e,t,n){try{return await xe(`/bin/launchctl`,[`bootout`,`gui/${n}/${t}`],{timeout:5e3}),`booted-out`}catch(t){return t instanceof Error&&`code`in t&&t.code===3?`not-found`:(q().warning(`Failed to boot out legacy ChatGPT Sparkle job`,{safe:{job:e},sensitive:{error:t}}),`failed`)}}var Te={"install-update":`Install Update`,"check-for-updates":`Check for Updates`,quit:`Quit`};async function X(e){let{sparkleManager:t}=n.p(),r=t.getIsUpdateReady()?[`install-update`,`quit`]:t.hasUpdater()?[`check-for-updates`,`quit`]:[`quit`];switch(r[(await a.dialog.showMessageBox({type:`error`,buttons:r.map(e=>Te[e]),defaultId:0,cancelId:r.length-1,message:`${a.app.getName()} failed to start.`,detail:e instanceof Error?e.message:`The main desktop app failed during startup.`,noLink:!0})).response]??`quit`){case`install-update`:await t.installUpdatesIfAvailable();break;case`check-for-updates`:await t.checkForUpdates();break;case`quit`:a.app.quit();return}process.platform===`win32`&&await X(e)}var Ee=process.platform===`darwin`,Z=i.a.resolve(),Q=n.Pt();process.platform===`linux`&&(process.env.ELECTRON_OZONE_PLATFORM_HINT=`x11`,a.app.commandLine.appendSwitch(`ozone-platform`,`x11`));for(let e of w({buildFlavor:Z,env:process.env}))a.app.commandLine.appendSwitch(e.name,e.value);if(i.o()){let e=new Set(a.app.commandLine.getSwitchValue(`disable-blink-features`).split(`,`).filter(Boolean));e.add(`ReplacedNormalFlowStackingInlinePaint`),a.app.commandLine.removeSwitch(`disable-blink-features`),a.app.commandLine.appendSwitch(`disable-blink-features`,[...e].join(`,`))}n.s(),n.t(),a.app.setName(t.Ta(Z,Q)),a.app.setPath(`userData`,ee({appDataPath:a.app.getPath(`appData`),buildFlavor:Z,env:process.env})),process.platform===`win32`&&a.app.setAppUserModelId(i.i(Z));var $=n.f({isMacOS:Ee,isPackaged:a.app.isPackaged});if(!(!$||a.app.requestSingleInstanceLock()))r.r().info(`Exiting second desktop instance`,{safe:{packaged:a.app.isPackaged,platform:process.platform}}),a.app.exit(0);else{ye(Q)&&r.r().info(`Repaired renamed Dock tile`,{safe:{platform:process.platform,version:a.app.getVersion()}});let e=n.p(Z);$&&a.app.on(`second-instance`,(t,n)=>{e.queueSecondInstanceArgs(n)}),a.app.whenReady().then(async()=>{let{desktopSentry:t,sparkleManager:o}=e;if(await we({bundleIdentifier:i.i(Z),homeDirectory:a.app.getPath(`home`),isPackaged:a.app.isPackaged,platform:process.platform,userId:process.getuid?.()}).catch(e=>{r.r().warning(`Failed to disarm legacy ChatGPT Sparkle updater`,{safe:{},sensitive:{error:e}})}),!await x({appName:a.app.getName(),environment:{arch:process.arch,isPackaged:a.app.isPackaged,platform:process.platform}})){a.app.quit();return}if(!await de()&&await n.a()){await o.initialize();try{let{runMainAppStartup:e}=await Promise.resolve().then(()=>require("./main-u0CfdGw7.js"));await e()}catch(e){for(let e of a.BrowserWindow.getAllWindows())e.isDestroyed()||e.destroy();await o.startUpdaterAfterStartupFailure(),r.r().error(`Desktop bootstrap failed to start the main app`,{safe:{phase:`bootstrap-import-main`}}),(()=>{try{process.stderr?.writable&&console.error(e?.stack??e)}catch{}})(),t.captureException(e,{tags:{phase:`bootstrap-import-main`}}),await X(e)}}})}
//# sourceMappingURL=bootstrap-9m_IicCE.js.map