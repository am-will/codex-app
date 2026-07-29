const e=require("./src-C7E6KJ89.js"),t=require("./src-BPbHdvxe.js"),n=require("./crash-reporter-env-CdLO-lmi.js"),r=require("./file-based-logger-D_CGHcxM.js"),i=require("./window-all-closed-a9FCmS92.js");let a=require("electron"),o=require("node:path");o=e.o(o);let s=require("node:util");require("node:crypto");let c=require("node:fs");c=e.o(c);let l=require("node:fs/promises"),u=require("node:child_process"),d=require("node:timers/promises");if(process.platform===`linux`&&typeof process.resourcesPath==`string`){let e=process.env.PATH??``,t=process.resourcesPath;e.split(`:`).includes(t)||(process.env.PATH=e?`${t}:${e}`:t)}var f=`desktop.intelLaunchWarning.message`,p=`{appName} is running the Intel build on an Apple Silicon Mac`,m=`desktop.intelLaunchWarning.detail`,h=`This build works through Rosetta, but the Apple Silicon build launches faster and performs better. Quit now to install the Apple Silicon build, or continue with the Intel build`,g=`desktop.intelLaunchWarning.quit`,_=`Quit`,v=`desktop.intelLaunchWarning.continue`,y=`Continue Anyway`;function b(e,t=S){return!e.isPackaged||e.platform!==`darwin`||e.arch!==`x64`?!1:t()}async function x({appName:e,environment:t,readProcessTranslated:r=S,loadNativeIntl:i=C,showMessageBox:o=e=>a.dialog.showMessageBox(e)}){if(!b(t,r))return!0;try{let t=await i();return(await o({type:`warning`,buttons:[t.formatMessage({messageId:g,defaultMessage:_}),t.formatMessage({messageId:v,defaultMessage:y})],defaultId:0,cancelId:0,noLink:!0,message:t.formatMessage({messageId:f,defaultMessage:p,values:{appName:e}}),detail:t.formatMessage({messageId:m,defaultMessage:h})})).response===1}catch(e){return n.r().warning(`Failed to show Intel-on-Apple-Silicon launch warning`,{safe:{errorName:e instanceof Error?e.name:null}}),!0}}function S(){try{return(0,u.execFileSync)(`/usr/sbin/sysctl`,[`-in`,`sysctl.proc_translated`],{encoding:`utf8`,env:n.t(process.env),stdio:[`ignore`,`pipe`,`ignore`]}).trim()===`1`}catch{return!1}}async function C(){try{return i.Ot()}catch{try{return await i.Et.load(``)}catch{return i.Et.createDefault()}}}function w({buildFlavor:e,env:t}){let n=t.CODEX_ELECTRON_CHROMIUM_SWITCHES?.trim();if(e!==r.a.Dev||!n)return[];let i;try{i=JSON.parse(n)}catch{throw Error(`CODEX_ELECTRON_CHROMIUM_SWITCHES must be valid JSON`)}if(typeof i!=`object`||!i||Array.isArray(i))throw Error(`CODEX_ELECTRON_CHROMIUM_SWITCHES must be a JSON object`);return Object.entries(i).map(([e,t])=>{if(e.length===0)throw Error(`CODEX_ELECTRON_CHROMIUM_SWITCHES contains an empty switch name`);if(t!=null&&typeof t!=`string`)throw Error(`CODEX_ELECTRON_CHROMIUM_SWITCHES value for ${e} must be a string or null`);return t==null?{name:e}:{name:e,value:t}})}function ee({appDataPath:e,buildFlavor:n,env:r}){let i=r.CODEX_ELECTRON_USER_DATA_PATH?.trim();if(i)return(0,o.resolve)(i);let a=(0,o.join)(e,t.ro(n)),s=r.CODEX_ELECTRON_AGENT_RUN_ID?.trim()||null;return n===`agent`&&s!=null?(0,o.join)(a,`agent`,s):a}var T=`ChatGPT.app`,te=`ChatGPT Classic.app`,ne=[`com.openai.chat-sparkle-updater`,`com.openai.chat-sparkle-progress`],E=`2DC432GLL2`;function re(e,{applicationsDirectory:t=`/Applications`,hasExpectedOpenAISignature:r=ae,stopLegacyUpdater:i=ie}={}){if(o.basename(e)!==T)return{status:`not-needed`};let a=o.join(t,T),s=o.join(t,te);try{let t=c.lstatSync(a,{throwIfNoEntry:!1});if(t==null)return{status:`not-needed`};if(!t.isDirectory()||!r(e,`com.openai.codex`))return{status:`blocked`};if(r(a,`com.openai.codex`))return{status:`not-needed`};if(!r(a,`com.openai.chat`)||c.lstatSync(s,{throwIfNoEntry:!1})!=null||!i()||!r(a,`com.openai.chat`))return{status:`blocked`};c.renameSync(a,s)}catch(e){return n.r().warning(`Failed to relocate legacy ChatGPT app`,{safe:{errorType:e instanceof Error?e.name:typeof e}}),{status:`blocked`}}return{status:`relocated`,restore:()=>{try{if(c.lstatSync(a,{throwIfNoEntry:!1})!=null||c.lstatSync(s,{throwIfNoEntry:!1})==null)return;c.renameSync(s,a)}catch(e){n.r().warning(`Failed to restore legacy ChatGPT app`,{safe:{errorType:e instanceof Error?e.name:typeof e}})}}}}function ie(){if(typeof process.getuid!=`function`)return!1;let e=`gui/${process.getuid()}`,t=(0,u.spawnSync)(`/bin/launchctl`,[`print`,e],{stdio:`ignore`});if(t.error!=null||t.status!==0)return!1;for(let t of ne){let n=`${e}/${t}`,r=(0,u.spawnSync)(`/bin/launchctl`,[`print`,n],{stdio:`ignore`});if(r.error!=null||r.status==null)return!1;if(r.status!==0)continue;let i=(0,u.spawnSync)(`/bin/launchctl`,[`bootout`,n],{stdio:`ignore`});if(i.error!=null||i.status!==0)return!1}return!0}function ae(e,t){try{return(0,u.execFileSync)(`/usr/bin/codesign`,[`--verify`,`--deep`,`--strict`,`-R=identifier "${t}" and anchor apple generic and certificate leaf[subject.OU] = "${E}"`,e],{stdio:`ignore`}),!0}catch{return!1}}var oe=`pending-source-dmg-cleanup.json`,D=25,se=250,O=(0,s.promisify)(u.execFile),ce=t.mu({images:t.ou(t.mu({"image-path":t._u().optional(),"system-entities":t.ou(t.mu({"mount-point":t._u().optional()}).passthrough()).optional()}).passthrough()).optional()}).passthrough(),le=t.mu({sourceDmgPath:t._u()}).passthrough();async function ue({clearPendingSourceDmgPath:e=U,copyAppBundleToApplicationsFolder:t=M,detachSourceDmg:r=pe,getCurrentAppBundlePath:o=i.l,getPendingSourceDmgPath:s=V,getSourceDmgPath:l=de,isApplicationsFolderWritable:u=j,isPackaged:d=a.app.isPackaged,openInstalledAppBundle:f=N,platform:p=process.platform,quitCurrentApp:m=()=>a.app.quit(),relocateLegacyChatGPTApp:h=re,setPendingSourceDmgPath:g=H,showInstallerWindow:_=P,sourceDmgExists:v=c.existsSync,trashItem:y=e=>a.shell.trashItem(e),isInApplicationsFolder:b=()=>k({getCurrentAppBundlePath:o}),moveAppBundleToApplicationsFolder:x=A}={}){if(p!==`darwin`||!d)return!1;if(b())return await L({clearPendingSourceDmgPath:e,detachSourceDmg:r,getPendingSourceDmgPath:s,sourceDmgExists:v,trashItem:y}),!1;let S=R(l);if(S==null)return!1;let C=await _();z({setPendingSourceDmgPath:g,sourceDmgPath:S});let w=null;try{let n=o(),r=h(n);switch(r.status){case`blocked`:return e(),await C.setStatus(`failed`),!0;case`not-needed`:break;case`relocated`:w=r.restore;break}switch(x(C.allowClose)){case`moved`:return w=null,!0;case`canceled`:return e(),await C.setStatus(`failed`),!0;case`unavailable`:break}if(!u())return e(),await C.setStatus(`failed`),!0;let i=await t(n);return i==null?(e(),await C.setStatus(`failed`),!0):(w=null,await C.setStatus(`opening`),await f(i)?(m(),!0):(await C.setStatus(`openFailed`),!0))}catch(t){return e(),n.r().warning(`Failed to install app in Applications folder`,{safe:{errorType:t instanceof Error?t.name:typeof t}}),await C.setStatus(`failed`),!0}finally{w?.()}}function k({getCurrentAppBundlePath:e}){try{if(`isInApplicationsFolder`in a.app)return a.app.isInApplicationsFolder()}catch(e){n.r().warning(`Failed to check app Applications folder status`,{safe:{errorType:e instanceof Error?e.name:typeof e}})}try{return K(e(),`/Applications`)}catch{return!1}}function A(e){if(!(`moveToApplicationsFolder`in a.app))return`unavailable`;a.app.releaseSingleInstanceLock(),e();try{let e=a.app.moveToApplicationsFolder();return e||a.app.requestSingleInstanceLock(),e?`moved`:`canceled`}catch(e){throw a.app.requestSingleInstanceLock(),e}}function j(){try{return c.accessSync(`/Applications`,c.constants.W_OK),!0}catch{return!1}}async function M(e){if(!K(process.execPath,e))return null;let t=o.join(`/Applications`,o.basename(e)),r=o.join(`/Applications`,`.${o.basename(e)}.codex-installing-${process.pid}`);try{return c.rmSync(r,{force:!0,recursive:!0}),await O(`/usr/bin/ditto`,[e,r]),c.existsSync(t)&&await a.shell.trashItem(t),c.renameSync(r,t),t}catch(e){return I(r),n.r().warning(`Failed to copy app bundle to Applications folder`,{safe:{errorType:e instanceof Error?e.name:typeof e}}),null}}async function N(e){try{return a.app.releaseSingleInstanceLock(),await O(`/usr/bin/open`,[`-n`,e]),!0}catch(e){return n.r().warning(`Failed to launch installed app bundle`,{safe:{errorType:e instanceof Error?e.name:typeof e}}),!1}}async function P(){let e=!1,t=new a.BrowserWindow({width:420,height:176,resizable:!1,maximizable:!1,fullscreenable:!1,closable:!1,show:!1,title:`Installing ${a.app.getName()}`,webPreferences:{contextIsolation:!0,nodeIntegration:!1,sandbox:!0,spellcheck:!1,devTools:!1}}),n=()=>{e=!0,t.setClosable(!0)};return t.setMenuBarVisibility(!1),t.on(`close`,t=>{e||t.preventDefault()}),t.on(`closed`,()=>{e&&a.app.quit()}),t.webContents.setWindowOpenHandler(()=>({action:`deny`})),t.webContents.on(`will-navigate`,e=>{e.preventDefault()}),await t.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(he(a.app.getName()))}`),t.isDestroyed()||(F(t),t.show(),t.focus()),{allowClose:n,setStatus:async e=>{t.isDestroyed()||(n(),await t.webContents.executeJavaScript(`window.setInstallerStatus(${JSON.stringify(e)})`))}}}function F(e){let t=a.screen.getCursorScreenPoint(),{workArea:n}=a.screen.getDisplayNearestPoint(t),{width:r,height:i}=e.getBounds(),o=n.x+Math.max(0,n.width-r),s=n.y+Math.max(0,n.height-i),c=Math.min(o,Math.max(n.x,Math.round(t.x-r/2))),l=Math.min(s,Math.max(n.y,Math.round(t.y-i/2)));e.setPosition(c,l,!1)}function I(e){try{c.rmSync(e,{force:!0,recursive:!0})}catch(e){n.r().warning(`Failed to remove staging app bundle`,{safe:{errorType:e instanceof Error?e.name:typeof e}})}}async function L({clearPendingSourceDmgPath:e,detachSourceDmg:t,getPendingSourceDmgPath:n,sourceDmgExists:r,trashItem:i}){let a=n();a!=null&&await B({detachSourceDmg:t,sourceDmgExists:r,sourceDmgPath:a,trashItem:i})&&e()}function R(e){try{return e()}catch(e){return n.r().warning(`Failed to find app source DMG`,{safe:{errorType:e instanceof Error?e.name:typeof e}}),null}}function z({setPendingSourceDmgPath:e,sourceDmgPath:t}){try{e(t)}catch(e){n.r().warning(`Failed to remember app source DMG for cleanup`,{safe:{errorType:e instanceof Error?e.name:typeof e}})}}async function B({detachSourceDmg:e,sourceDmgExists:t,sourceDmgPath:r,trashItem:i}){if(!t(r))return!0;let a=!1;for(let t=1;t<=D;t+=1){try{if(e(r)){a=!0;break}}catch{}t<D&&await(0,d.setTimeout)(se)}if(!a)return n.r().warning(`Failed to detach app source DMG after retries`),!1;try{return await i(r),!0}catch(e){return n.r().warning(`Failed to move app source DMG to Trash`,{safe:{errorType:e instanceof Error?e.name:typeof e}}),!1}}function V(){let e=W();if(!c.existsSync(e))return null;try{return le.parse(JSON.parse(c.readFileSync(e,`utf8`))).sourceDmgPath}catch(e){return n.r().warning(`Failed to read pending app source DMG cleanup`,{safe:{errorType:e instanceof Error?e.name:typeof e}}),null}}function H(e){let t=W();c.mkdirSync(o.dirname(t),{recursive:!0}),c.writeFileSync(t,`${JSON.stringify({sourceDmgPath:e})}\n`,`utf8`)}function U(){c.rmSync(W(),{force:!0})}function W(){return o.join(a.app.getPath(`userData`),oe)}function de(){let e=i.l();return e.startsWith(`/Volumes/`)?fe(e,G()):null}function fe(e,t){let n=null,r=``;for(let i of t)if(o.extname(i.imagePath).toLowerCase()===`.dmg`)for(let t of i.mountPoints)K(e,t)&&t.length>r.length&&(n=i,r=t);return n?.imagePath??null}function G(){let e=(0,u.execFileSync)(`/usr/bin/plutil`,[`-convert`,`json`,`-o`,`-`,`-`],{encoding:`utf8`,input:(0,u.execFileSync)(`/usr/bin/hdiutil`,[`info`,`-plist`])});return(ce.parse(JSON.parse(e)).images??[]).flatMap(e=>{if(e[`image-path`]==null)return[];let t=(e[`system-entities`]??[]).flatMap(e=>e[`mount-point`]==null?[]:[e[`mount-point`]]);return t.length===0?[]:[{imagePath:e[`image-path`],mountPoints:t}]})}function pe(e){for(let t of G())if(o.resolve(t.imagePath)===o.resolve(e)){for(let e of t.mountPoints)if(!me(e))return!1}return!0}function me(e){try{return(0,u.execFileSync)(`/usr/bin/hdiutil`,[`detach`,e]),!0}catch{return!1}}function he(e){let t=ge(e);return`<!doctype html>
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
</html>`}function ge(e){return e.replaceAll(`&`,`&amp;`).replaceAll(`<`,`&lt;`).replaceAll(`>`,`&gt;`)}function K(e,t){let n=o.relative(t,e);return n===``||!!n&&!n.startsWith(`..`)&&!o.isAbsolute(n)}var _e=1e4;function ve(e){if(process.platform!==`darwin`||!a.app.isPackaged||e!==t.Ml.ChatGPT)return!1;let n=ye(),r=o.default.join(process.resourcesPath,`native`,`launch-services-helper`);if(n==null||!(0,c.existsSync)(r)||!q(r,[`needs-renamed-dock-tile-repair`,n]))return!1;try{return a.app.setActivationPolicy(`accessory`),q(r,[`repair-renamed-dock-tile`,n])}finally{a.app.setActivationPolicy(`regular`)}}function q(e,t){try{return(0,u.execFileSync)(e,t,{encoding:`utf8`,timeout:_e}).trim()===`true`}catch{return!1}}function ye(){let e=o.default.dirname(o.default.dirname(process.execPath)),t=o.default.dirname(e);return t.endsWith(`.app`)?t:null}var be=(0,s.promisify)(u.execFile),J=n.a(`legacy-chatgpt-sparkle-updater`),Y=`com.openai.chat`,xe=`${Y}-sparkle-updater`,Se=`${Y}-sparkle-progress`;async function Ce(e){if(e.platform!==`darwin`||!e.isPackaged||e.bundleIdentifier!==`com.openai.codex`||e.userId==null)return;let[t,n]=await Promise.all([X(`updater`,xe,e.userId),X(`progress`,Se,e.userId)]),r=`cleared`;try{await(0,l.rm)(o.default.join(e.homeDirectory,`Library`,`Caches`,Y,`org.sparkle-project.Sparkle`),{force:!0,recursive:!0})}catch(e){r=`failed`,J().warning(`Failed to clear legacy ChatGPT Sparkle cache`,{safe:{},sensitive:{error:e}})}J().info(`Finished disarming legacy ChatGPT Sparkle updater`,{safe:{cache:r,progressJob:n,updaterJob:t},sensitive:{}})}async function X(e,t,n){try{return await be(`/bin/launchctl`,[`bootout`,`gui/${n}/${t}`],{timeout:5e3}),`booted-out`}catch(t){return t instanceof Error&&`code`in t&&t.code===3?`not-found`:(J().warning(`Failed to boot out legacy ChatGPT Sparkle job`,{safe:{job:e},sensitive:{error:t}}),`failed`)}}var we={"install-update":`Install Update`,"check-for-updates":`Check for Updates`,quit:`Quit`};async function Te(e){let{sparkleManager:t}=i.p(),n=t.getIsUpdateReady()?[`install-update`,`quit`]:t.hasUpdater()?[`check-for-updates`,`quit`]:[`quit`];switch(n[(await a.dialog.showMessageBox({type:`error`,buttons:n.map(e=>we[e]),defaultId:0,cancelId:n.length-1,message:`${a.app.getName()} failed to start.`,detail:e instanceof Error?e.message:`The main desktop app failed during startup.`,noLink:!0})).response]??`quit`){case`install-update`:await t.installUpdatesIfAvailable();return;case`check-for-updates`:await t.checkForUpdates();return;case`quit`:a.app.quit();return}}var Ee=process.platform===`darwin`,Z=r.a.resolve(),Q=i.kt();process.platform===`linux`&&(process.env.ELECTRON_OZONE_PLATFORM_HINT=`x11`,a.app.commandLine.appendSwitch(`ozone-platform`,`x11`));for(let e of w({buildFlavor:Z,env:process.env}))a.app.commandLine.appendSwitch(e.name,e.value);if(r.o()){let e=new Set(a.app.commandLine.getSwitchValue(`disable-blink-features`).split(`,`).filter(Boolean));e.add(`ReplacedNormalFlowStackingInlinePaint`),a.app.commandLine.removeSwitch(`disable-blink-features`),a.app.commandLine.appendSwitch(`disable-blink-features`,[...e].join(`,`))}i.s(),i.t(),a.app.setName(t.ro(Z,Q)),a.app.setPath(`userData`,ee({appDataPath:a.app.getPath(`appData`),buildFlavor:Z,env:process.env})),process.platform===`win32`&&a.app.setAppUserModelId(r.i(Z));var $=i.f({isMacOS:Ee,isPackaged:a.app.isPackaged});if(!(!$||a.app.requestSingleInstanceLock()))n.r().info(`Exiting second desktop instance`,{safe:{packaged:a.app.isPackaged,platform:process.platform}}),a.app.exit(0);else{ve(Q)&&n.r().info(`Repaired renamed Dock tile`,{safe:{platform:process.platform,version:a.app.getVersion()}});let e=i.p(Z);$&&a.app.on(`second-instance`,(t,n)=>{e.queueSecondInstanceArgs(n)}),a.app.whenReady().then(async()=>{let{desktopSentry:t,sparkleManager:o}=e;if(await Ce({bundleIdentifier:r.i(Z),homeDirectory:a.app.getPath(`home`),isPackaged:a.app.isPackaged,platform:process.platform,userId:process.getuid?.()}).catch(e=>{n.r().warning(`Failed to disarm legacy ChatGPT Sparkle updater`,{safe:{},sensitive:{error:e}})}),!await x({appName:a.app.getName(),environment:{arch:process.arch,isPackaged:a.app.isPackaged,platform:process.platform}})){a.app.quit();return}if(!await ue()&&await i.a()){await o.initialize();try{let{runMainAppStartup:e}=await Promise.resolve().then(()=>require("./main-Be_0DBuv.js"));await e()}catch(e){for(let e of a.BrowserWindow.getAllWindows())e.isDestroyed()||e.destroy();n.r().error(`Desktop bootstrap failed to start the main app`,{safe:{phase:`bootstrap-import-main`}}),(()=>{try{process.stderr?.writable&&console.error(e?.stack??e)}catch{}})(),t.captureException(e,{tags:{phase:`bootstrap-import-main`}}),await Te(e)}}})}
//# sourceMappingURL=bootstrap-DHAGqKGr.js.map