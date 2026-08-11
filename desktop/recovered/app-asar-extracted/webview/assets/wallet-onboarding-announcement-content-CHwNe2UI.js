const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./wallet-onboarding-announcement-modal-DoqFRp7d.js","./rolldown-runtime-DAXXjFlN.js","./app-initial-Bd3Z1bES.js","./app-initial-AYgnwUwc.css","./wallet-onboarding-announcement-modal-BypdusLM.css"])))=>i.map(i=>d[i]);
import{n as e,o as t}from"./rolldown-runtime-DAXXjFlN.js";import{AJ as n,CJ as r,Ckt as i,EJ as a,FJ as o,LJ as s,LSt as c,Lbt as l,Mht as u,NOt as d,Nbt as f,Nht as p,OOt as m,OTt as h,PJ as g,POt as _,Pbt as v,RJ as y,Rbt as b,SJ as x,Skt as S,Sxt as C,TJ as w,_Ct as T,_J as E,aJ as ee,aTt as D,bJ as te,cJ as O,dCt as k,gJ as ne,gOt as A,gkt as j,hOt as M,iCt as N,iJ as re,iOt as P,iTt as ie,jCt as F,kTt as I,mCt as L,mJ as ae,mOt as R,nJ as z,pJ as oe,rCt as se,rJ as B,rTt as ce,sJ as V,sOt as H,uCt as le,uJ as ue,uOt as U,vJ as de,wJ as W,xJ as fe,xSt as pe,xxt as me,yOt as G}from"./app-initial-Bd3Z1bES.js";function he(e,{styleVariables:t={},theme:n=`light`}={}){return`<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <style>
      html, body { min-height: 100%; margin: 0; background: var(--color-background-primary, #fff); }
      body { color: var(--color-text-primary, #171717); font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif); }
      * { box-sizing: border-box; }
      form { display: flex; flex-direction: column; width: 100%; min-height: 100vh; padding: 28px 24px 8px; }
      .enrollment-content { display: flex; flex: 1; flex-direction: column; justify-content: center; }
      h1 { margin: 0 0 28px; color: var(--color-text-primary, #171717); font-size: 20px; font-weight: var(--font-weight-semibold, 600); line-height: 25px; letter-spacing: -0.45px; text-align: center; }
      .fields { overflow: hidden; border: 1px solid var(--color-border-primary, #d8d8d8); border-radius: 13px; background: var(--color-background-secondary, #fff); }
      label { display: grid; min-width: 0; padding: 7px 16px 6px; color: var(--color-text-primary, #171717); font-size: 13px; line-height: 17px; }
      label:focus-within { outline: none; box-shadow: inset 0 0 0 2px var(--color-ring-primary, #6b6b6b); }
      .row { display: grid; grid-template-columns: 1fr 1fr; border-top: 1px solid var(--color-border-secondary, #d8d8d8); }
      .row label + label { border-left: 1px solid var(--color-border-secondary, #d8d8d8); }
      .field { position: relative; height: 24px; overflow: hidden; }
      .hosted { position: absolute; inset: 0; opacity: 0; }
      .field::before { position: absolute; top: 7px; left: 0; width: 42%; height: 10px; border-radius: 999px; background: var(--color-background-disabled, #dedede); content: ""; opacity: 0.8; }
      [data-fields-ready="true"] .hosted { opacity: 1; }
      [data-fields-ready="true"] .field::before { content: none; }
      .privacy { margin: 24px 0 0; color: var(--color-text-tertiary, #8f8f8f); font-size: 12px; line-height: 16px; text-align: center; }
      .actions { display: flex; flex-shrink: 0; flex-direction: column; }
      .status { min-height: 16px; margin: 16px 0 0; color: var(--color-text-secondary, #666); font-size: 14px; line-height: 16px; text-align: center; }
      .error { display: none; margin-top: 16px; padding: 12px; border: 1px solid var(--color-border-danger, #efc4c4); border-radius: 12px; background: var(--color-background-danger, #fff5f5); color: var(--color-text-danger, #a12020); font-size: 14px; line-height: 20px; text-align: center; }
      .error[data-visible="true"] { display: block; }
      button { width: 100%; min-height: 44px; margin-top: 16px; border: 0; border-radius: 999px; background: var(--color-background-inverse, #171717); color: var(--color-text-inverse, #fff); font: inherit; font-size: 15px; font-weight: var(--font-weight-medium, 500); cursor: var(--cursor-interaction); }
      button:disabled { background: var(--color-background-disabled, #dedede); color: var(--color-text-disabled, #8a8a8a); cursor: not-allowed; }
      .retry { display: none; }
      .retry[data-visible="true"] { display: block; }
      [hidden] { display: none !important; }
      html[data-theme="dark"], html[data-theme="dark"] body { background: var(--color-background-primary, #171717); }
      html[data-theme="dark"] body, html[data-theme="dark"] h1, html[data-theme="dark"] label { color: var(--color-text-primary, #f5f5f5); }
      html[data-theme="dark"] .fields { border-color: var(--color-border-primary, #555); background: var(--color-background-secondary, #242424); }
      html[data-theme="dark"] .row, html[data-theme="dark"] .row label + label { border-color: var(--color-border-secondary, #555); }
      html[data-theme="dark"] .privacy { color: var(--color-text-tertiary, #a3a3a3); }
      html[data-theme="dark"] .status { color: var(--color-text-secondary, #c7c7c7); }
      html[data-theme="dark"] label:focus-within { box-shadow: inset 0 0 0 2px var(--color-ring-primary, #b8b8b8); }
      html[data-theme="dark"] button { background: var(--color-background-inverse, #f5f5f5); color: var(--color-text-inverse, #171717); }
      html[data-theme="dark"] button:disabled { background: var(--color-background-disabled, #484848); color: var(--color-text-disabled, #999); }
      html[data-theme="dark"] .error { border-color: var(--color-border-danger, #744343); background: var(--color-background-danger, #342424); color: var(--color-text-danger, #f3b6b6); }
      @media (max-width: 420px) { form { padding: 22px 18px 8px; } label { padding-right: 14px; padding-left: 14px; } }
    </style>
  </head>
  <body>
    <form id="form" data-fields-ready="false">
      <div class="enrollment-content">
        <h1 id="title"></h1>
        <div class="fields" id="fields" aria-busy="true">
          <label><span id="card-number-label"></span><span class="field"><span class="hosted" id="vgs-card-number"></span></span></label>
          <div class="row">
            <label><span id="expiration-label"></span><span class="field"><span class="hosted" id="vgs-card-expiration"></span></span></label>
            <label><span id="cvc-label"></span><span class="field"><span class="hosted" id="vgs-card-cvc"></span></span></label>
          </div>
        </div>
        <p class="privacy" id="privacy"></p>
      </div>
      <div class="actions">
        <p class="status" id="status" role="status"></p>
        <div class="error" id="error" role="alert"></div>
        <button id="submit" type="submit" disabled></button>
        <button class="retry" id="retry" type="button"></button>
      </div>
    </form>
    <script>
      (() => {
        const messages = ${JSON.stringify(e).replaceAll(`<`,`\\u003c`)};
        const initialStyleVariables = ${JSON.stringify(t).replaceAll(`<`,`\\u003c`)};
        const initialTheme = ${JSON.stringify(n)};
        const sdkUrl = ${JSON.stringify(ye)};
        const fieldInitializationTimeoutMs = ${JSON.stringify(be)};
        const retryTool = ${JSON.stringify(ge)};
        const saveTool = ${JSON.stringify(_e)};
        const stageTool = ${JSON.stringify(ve)};
        const formRoot = document.getElementById("form");
        const fieldsRoot = document.getElementById("fields");
        const status = document.getElementById("status");
        const error = document.getElementById("error");
        const submit = document.getElementById("submit");
        const retry = document.getElementById("retry");
        let sdkPromise = null;
        let sdkError = false;
        let activeAttempt = null;
        let form = null;
        let fields = [];
        let fieldValidity = [false, false, false];
        let vaultedCard = null;

        const applyHostStyles = () => {
          const root = document.documentElement;
          const theme = globalThis.openai?.theme === "dark" || globalThis.openai?.theme === "light"
            ? globalThis.openai.theme
            : initialTheme;
          root.dataset.theme = theme;
          root.style.colorScheme = theme;
          const styleVariables = globalThis.openai?.toolInput?.style_variables ?? initialStyleVariables;
          for (const [name, value] of Object.entries(styleVariables)) {
            if (typeof value === "string") root.style.setProperty(name, value);
          }
        };

        applyHostStyles();

        document.getElementById("title").textContent = messages.title;
        document.getElementById("card-number-label").textContent = messages.cardNumber;
        document.getElementById("expiration-label").textContent = messages.expiration;
        document.getElementById("cvc-label").textContent = messages.cvc;
        document.getElementById("privacy").textContent = messages.privacy;
        submit.textContent = messages.submit;

        const reportStage = (stage, startedAt, result) => {
          const api = globalThis.openai;
          if (!api || typeof api.callTool !== "function") return;
          void api.callTool(stageTool, {
            duration_ms: Math.max(0, Math.round(performance.now() - startedAt)),
            result,
            stage,
          }).catch(() => undefined);
        };

        const showError = (message, retryLabel) => {
          fieldsRoot.setAttribute("aria-busy", "false");
          status.textContent = "";
          error.textContent = message;
          error.dataset.visible = "true";
          submit.hidden = true;
          retry.textContent = retryLabel;
          retry.dataset.visible = "true";
        };

        const showLoading = () => {
          formRoot.hidden = false;
          formRoot.dataset.fieldsReady = "false";
          fieldsRoot.setAttribute("aria-busy", "true");
          status.textContent = messages.initializing;
          error.textContent = "";
          error.dataset.visible = "false";
          submit.hidden = false;
          submit.disabled = true;
          submit.textContent = messages.submit;
          retry.dataset.visible = "false";
        };

        const resetForm = () => {
          form = null;
          fields = [];
          fieldValidity = [false, false, false];
          vaultedCard = null;
          for (const id of ["vgs-card-number", "vgs-card-expiration", "vgs-card-cvc"]) {
            document.getElementById(id).replaceChildren();
          }
          showLoading();
        };

        const getStyle = (name, fallback) => {
          const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
          return value || fallback;
        };

        const getFieldBackground = () => {
          const background = getComputedStyle(fieldsRoot).backgroundColor;
          if (background.startsWith("rgb(")) return background;

          const canvas = document.createElement("canvas");
          canvas.width = 1;
          canvas.height = 1;
          const context = canvas.getContext("2d");
          if (!context) return background;

          for (const element of [document.documentElement, document.body, fieldsRoot]) {
            context.fillStyle = getComputedStyle(element).backgroundColor;
            context.fillRect(0, 0, 1, 1);
          }
          const [red, green, blue] = context.getImageData(0, 0, 1, 1).data;
          return "rgb(" + red + ", " + green + ", " + blue + ")";
        };

        const getFieldCss = () => {
          const isDark = document.documentElement.dataset.theme === "dark";
          return {
            "&::placeholder": { color: getStyle("--color-text-tertiary", isDark ? "#a3a3a3" : "#8b8b8b") },
            "background-color": getFieldBackground(),
            border: "0",
            "box-sizing": "border-box",
            color: getStyle("--color-text-primary", isDark ? "#f5f5f5" : "#171717"),
            "font-family": getStyle("--font-sans", "-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"),
            "font-size": "16px",
            height: "24px",
            "line-height": "24px",
            padding: "0",
            width: "100%",
          };
        };

        const loadSdk = () => {
          if (globalThis.VGSCollect && typeof globalThis.VGSCollect.create === "function") {
            return Promise.resolve(globalThis.VGSCollect);
          }
          if (sdkPromise) return sdkPromise;
          const startedAt = performance.now();
          sdkPromise = new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.async = true;
            script.src = sdkUrl;
            script.onload = () => {
              if (globalThis.VGSCollect && typeof globalThis.VGSCollect.create === "function") {
                sdkError = false;
                reportStage("sdk_load", startedAt, "success");
                resolve(globalThis.VGSCollect);
              } else {
                reject(new Error("VGS Collect did not initialize"));
              }
            };
            script.onerror = () => reject(new Error("VGS Collect failed to load"));
            document.head.appendChild(script);
          }).catch((loadError) => {
            sdkError = true;
            sdkPromise = null;
            reportStage("sdk_load", startedAt, "failure");
            throw loadError;
          });
          return sdkPromise;
        };

        const parseBootstrap = () => {
          const bootstrap = globalThis.openai?.toolResponseMetadata?.vgs_collect_bootstrap;
          if (!bootstrap || typeof bootstrap !== "object") return null;
          if (typeof bootstrap.vault_id !== "string" || !bootstrap.vault_id.trim()) return null;
          if (typeof bootstrap.access_token !== "string" || !bootstrap.access_token.trim()) return null;
          if (bootstrap.environment !== "sandbox" && bootstrap.environment !== "live") return null;
          if (typeof bootstrap.force_staging_env !== "boolean") return null;
          return bootstrap;
        };

        const saveCard = async () => {
          if (!vaultedCard) return;
          const startedAt = performance.now();
          submit.disabled = true;
          submit.textContent = messages.submitting;
          try {
            const response = await globalThis.openai.callTool(saveTool, {
              force_staging_env: vaultedCard.forceStagingEnv,
              vgs_card_id: vaultedCard.id,
            });
            const structuredContent = response?.structuredContent ?? response?.structured_content;
            const card = structuredContent?.card;
            if (response?.isError === true || structuredContent?.ok !== true || !card || typeof card.last4 !== "string") {
              throw new Error("Wallet did not confirm the saved card");
            }
            vaultedCard = null;
            reportStage("save", startedAt, "success");
          } catch {
            reportStage("save", startedAt, "failure");
            showError(messages.saveError, messages.retrySave);
          }
        };

        const initializeFields = async (attempt, bootstrap) => {
          const startedAt = performance.now();
          resetForm();
          let initializationTimeout;
          let timedOut = false;
          try {
            await Promise.race([
              (async () => {
                const collect = await loadSdk();
                if (activeAttempt !== attempt || timedOut) return;
                form = collect.create(bootstrap.vault_id, bootstrap.environment, () => undefined);
                form.on?.("enterPress", () => {
                  if (!submit.disabled) formRoot.requestSubmit(submit);
                });
                const css = getFieldCss();
                fields = [
                  form.cardNumberField("#vgs-card-number", { css, placeholder: messages.numberPlaceholder }),
                  form.cardExpirationDateField("#vgs-card-expiration", { css, placeholder: messages.expirationPlaceholder }),
                  form.cardCVCField("#vgs-card-cvc", { css, placeholder: messages.cvcPlaceholder }),
                ];
                fields.forEach((field, index) => {
                  field.on("update", (state) => {
                    fieldValidity[index] = state?.isValid === true;
                    submit.disabled = fieldValidity.some((valid) => !valid);
                  });
                });
                await Promise.all(fields.map((field) => field.promise ?? Promise.resolve()));
                if (activeAttempt !== attempt || timedOut) return;
                if (fields.some((field) => field.loadingState !== "loaded")) {
                  throw new Error("A VGS field did not finish loading");
                }
                formRoot.dataset.fieldsReady = "true";
                fieldsRoot.setAttribute("aria-busy", "false");
                status.textContent = "";
                reportStage("fields_ready", startedAt, "success");
              })(),
              new Promise((_, reject) => {
                initializationTimeout = setTimeout(() => {
                  timedOut = true;
                  reject(new Error("VGS fields did not finish loading in time"));
                }, fieldInitializationTimeoutMs);
              }),
            ]);
          } catch {
            if (activeAttempt !== attempt) return;
            reportStage("fields_ready", startedAt, "failure");
            showError(sdkError ? messages.error : messages.bootstrapError, messages.retry);
          } finally {
            clearTimeout(initializationTimeout);
          }
        };

        const syncGlobals = () => {
          applyHostStyles();
          const css = getFieldCss();
          for (const field of fields) {
            field.update?.({ css });
          }
          const input = globalThis.openai?.toolInput;
          if (!input || input.enrollment_requested !== true) {
            if (activeAttempt !== null) {
              activeAttempt = null;
              resetForm();
            }
            return;
          }
          const attempt = String(input.enrollment_attempt) + ":" + String(input.bootstrap_retry);
          if (input.bootstrap_status === "error") {
            activeAttempt = attempt;
            showError(messages.bootstrapError, messages.retry);
            return;
          }
          if (input.bootstrap_status !== "ready") {
            showLoading();
            return;
          }
          if (activeAttempt === attempt) return;
          const bootstrap = parseBootstrap();
          if (!bootstrap) {
            activeAttempt = attempt;
            showError(messages.bootstrapError, messages.retry);
            return;
          }
          activeAttempt = attempt;
          void initializeFields(attempt, bootstrap);
        };

        formRoot.addEventListener("submit", (event) => {
          event.preventDefault();
          const bootstrap = parseBootstrap();
          if (!form || !bootstrap || fieldValidity.some((valid) => !valid)) return;
          const startedAt = performance.now();
          submit.disabled = true;
          submit.textContent = messages.submitting;
          error.dataset.visible = "false";
          try {
            form.createCard(
              { auth: bootstrap.access_token, data: { cardholder: {} } },
              (statusCode, payload) => {
                if (statusCode === 401 || statusCode === 403) {
                  reportStage("submit", startedAt, "failure");
                  showError(messages.bootstrapError, messages.retry);
                  return;
                }
                const card = payload?.data;
                if (statusCode < 200 || statusCode >= 300 || !card || typeof card.id !== "string" || !card.id.trim()) {
                  reportStage("submit", startedAt, "failure");
                  showError(messages.error, messages.retry);
                  return;
                }
                vaultedCard = { forceStagingEnv: bootstrap.force_staging_env, id: card.id };
                reportStage("submit", startedAt, "success");
                void saveCard();
              },
              () => {
                reportStage("submit", startedAt, "failure");
                error.textContent = messages.validationError;
                error.dataset.visible = "true";
                submit.disabled = fieldValidity.some((valid) => !valid);
                submit.textContent = messages.submit;
              },
            );
          } catch {
            reportStage("submit", startedAt, "failure");
            showError(messages.error, messages.retry);
          }
        });

        retry.addEventListener("click", () => {
          if (vaultedCard) {
            error.dataset.visible = "false";
            retry.dataset.visible = "false";
            submit.hidden = false;
            void saveCard();
            return;
          }
          showLoading();
          void globalThis.openai.callTool(retryTool, {}).catch(() => {
            showError(messages.bootstrapError, messages.retry);
          });
        });

        globalThis.addEventListener("openai:set_globals", syncGlobals);
        void loadSdk().catch(() => undefined);
        syncGlobals();
      })();
    <\/script>
  </body>
</html>`}var ge,_e,ve,K,ye,be,xe=e((()=>{ge=`__wallet_onboarding_retry_bootstrap`,_e=`__wallet_onboarding_save_vgs_card`,ve=`__wallet_onboarding_stage`,K={baseUriDomains:[],connectDomains:[`https://js.verygoodvault.com`,`https://js3.verygoodvault.com`,`https://vgs-collect-keeper.apps.verygood.systems`,`https://*.verygoodproxy.com`],frameDomains:[`https://js.verygoodvault.com`,`https://js3.verygoodvault.com`,`https://vgs-collect-keeper.apps.verygood.systems`],includeDefaultDomains:!1,isTrusted:!0,resourceDomains:[`https://js.verygoodvault.com`,`https://js3.verygoodvault.com`,`https://vgs-collect-keeper.apps.verygood.systems`]},ye=`https://js.verygoodvault.com/vgs-collect/3.2.2/vgs-collect.js`,be=15e3}));function Se({active:e,enrollmentAttempt:t,enrollmentView:n,onComplete:r,onPreparationError:i,onPrepared:a,preparing:o,targetElement:s}){let c=T(),l=d(se),u=_(W),f=(0,q.useId)(),p=(0,q.useRef)(e),m=(0,q.useRef)(!1),h=(0,q.useRef)(null),g=(0,q.useRef)(new Map),[v,y]=(0,q.useState)(0),[b,S]=(0,q.useState)(null),[w,D]=(0,q.useState)(null),[k,A]=(0,q.useState)(null),[j,M]=(0,q.useState)(!1),N=re({server:n.server,tool:n.tool}),P=ee({connectorId:N,instanceFallbackId:`wallet-onboarding-${f}`,server:n.server}),F=ae({locale:c.locale,originScope:P,widgetDomain:null}),I=oe({originScope:P,sourceUrl:F}),L=`wallet-onboarding-${f}`,R=(0,q.useEffectEvent)(async(t,s)=>{if(t===`__wallet_onboarding_stage`){let e=Ee.parse(s);return C.info(`wallet_onboarding_sandbox.stage`,{safe:e}),o&&e.stage===`fields_ready`&&(e.result===`success`?a():i()),{}}if(t===`__wallet_onboarding_retry_bootstrap`){if(!e)throw Error(`Wallet onboarding enrollment is not active`);return De.parse(s),y(e=>e+1),{}}if(t!==`__wallet_onboarding_save_vgs_card`)throw Error(`Wallet onboarding sandbox cannot call this tool`);if(!e)throw Error(`Wallet onboarding enrollment is not active`);let c=we.parse(s),u=J.safeParse(b?.metadata);if(!u.success||c.force_staging_env!==u.data.vgs_collect_bootstrap.force_staging_env)throw Error(`Wallet card environment does not match enrollment`);let d=n.serverTools.find(e=>/(?:^|[._])(?:wallet_)?save_vgs_card$/.test(e.name));if(d==null)throw Error(`Wallet save tool is unavailable`);let f=ue({connectorId:N,server:n.server,toolName:d.name,tools:n.serverTools}),h=await z(l,n.hostId,n.server,f.name,c),g=ne({isCodexAppsServer:O(n.server),toolResult:h});return g.isError!==!0&&Te.safeParse(g.structuredContent).success&&(p.current?r():m.current=!0),g}),B=(0,q.useEffectEvent)(()=>{i()}),V=(0,q.useEffectEvent)(()=>{e&&m.current&&(m.current=!1,r())});return(0,q.useLayoutEffect)(()=>{let e=document.createElement(`webview`);return e.className=`h-full w-full overflow-hidden border-0`,e.setAttribute(`partition`,ce(I)),A(e),()=>{e.remove(),e.destroy?.(),A(t=>t===e?null:t)}},[I]),(0,q.useLayoutEffect)(()=>{if(p.current=e,V(),k==null)return;let t=e?s:h.current;t!=null&&k.parentElement!==t&&t.appendChild(k)},[e,k,s]),(0,q.useLayoutEffect)(()=>{if(k==null)return;let e=ie(F,{requireSkybridge:!0});if(e==null){C.warning(`wallet_onboarding_sandbox.invalid_origin`,{safe:{}}),B();return}let t=new AbortController,n,r=performance.now();M(!1);let i=getComputedStyle(document.documentElement).colorScheme===`dark`?`dark`:`light`,a=l.get(W),o=he({bootstrapError:c.formatMessage(X.bootstrapError),cardNumber:c.formatMessage(X.cardNumber),cvc:c.formatMessage(X.cvc),cvcPlaceholder:c.formatMessage(X.cvcPlaceholder),error:c.formatMessage(X.error),expiration:c.formatMessage(X.expiration),expirationPlaceholder:c.formatMessage(X.expirationPlaceholder),initializing:c.formatMessage(X.initializing),numberPlaceholder:c.formatMessage(X.numberPlaceholder),privacy:c.formatMessage(X.privacy),retry:c.formatMessage(X.retry),retrySave:c.formatMessage(X.retrySave),saveError:c.formatMessage(X.saveError),submit:c.formatMessage(X.submit),submitting:c.formatMessage(X.submitting),title:c.formatMessage(X.title),validationError:c.formatMessage(X.validationError)},{styleVariables:a,theme:i});return te({hostApiHandlers:{callMcp:()=>Promise.reject(Error(`Wallet onboarding sandbox cannot make MCP requests`)),callTool:(e,t)=>R(e,t),notifyBackgroundColor:()=>{},notifyEnvironmentError:()=>{C.warning(`wallet_onboarding_sandbox.environment_error`,{safe:{}}),B()},notifyIntrinsicHeight:()=>{},notifyIntrinsicWidth:()=>{},notifyNavigation:()=>{},notifySecurityPolicyViolation:()=>{C.warning(`wallet_onboarding_sandbox.csp_violation`,{safe:{}}),B()},openExternal:()=>{},requestDisplayMode:()=>({mode:`inline`}),sendFollowUpMessage:()=>Promise.reject(Error(`Wallet onboarding sandbox cannot send follow-ups`)),sendInstrument:()=>{},updateWidgetState:()=>{}},origin:e,sandboxId:I,signal:t.signal,sourceUrl:F,webview:k}).then(async e=>{if(t.signal.aborted)return;D(e);let s=e.runWidgetCode({csp:K,displayMode:`inline`,features:[],html:o,isFirstParty:!1,isSidebarOpen:!1,isTombstone:!1,maxHeight:620,maxWidth:568,measureWidth:!1,mcpApps:{hostCapabilities:{sandbox:{csp:K}},hostContext:{availableDisplayModes:[`inline`],containerDimensions:{maxHeight:620,maxWidth:568},deviceCapabilities:{hover:!0,touch:!1},displayMode:`inline`,locale:c.locale,platform:`desktop`,safeAreaInsets:{bottom:0,left:0,right:0,top:0},styles:{variables:a},theme:i,timeZone:Intl.DateTimeFormat().resolvedOptions().timeZone,userAgent:`chatgpt`},hostInfo:{name:`chatgpt`}},safeArea:{insets:{bottom:0,left:0,right:0,top:0}},theme:i,toolInput:null,toolOutput:null,toolResponseMetadata:null,userAgent:{capabilities:{hover:!0,touch:!1},device:{os:`unknown`,platform:`native`,type:`desktop`}},viewParams:null,widgetId:L,widgetState:null});n=setTimeout(()=>{t.signal.aborted||(C.warning(`wallet_onboarding_sandbox.init_failed`,{safe:{errorName:`TimeoutError`}}),B(),t.abort())},Y);for await(let e of s){if(t.signal.aborted)return;if(x.safeParse(e).success){clearTimeout(n),M(!0),C.info(`wallet_onboarding_sandbox.initialized`,{safe:{durationMs:Math.max(0,Math.round(performance.now()-r))}});return}}clearTimeout(n),t.signal.aborted||(C.warning(`wallet_onboarding_sandbox.init_failed`,{safe:{errorName:`MissingRunningStatus`}}),B())}).catch(e=>{t.signal.aborted||(C.warning(`wallet_onboarding_sandbox.init_failed`,{safe:{errorName:e instanceof Error?e.name:`UnknownError`}}),B())}),()=>{clearTimeout(n),t.abort(),M(!1),D(null)}},[c,k,I,l,F,L]),(0,q.useEffect)(()=>{if(!o||t===0)return;let e=JSON.stringify([N,n.hostId,n.server,n.tool.name,t,v]);S({attempt:t,metadata:null,retry:v,status:`loading`});let r=g.current.get(e);if(r==null){let t=performance.now();r=z(l,n.hostId,n.server,n.tool.name,{force_staging_env:!1}).then(e=>(C.info(`wallet_onboarding_sandbox.bootstrap`,{safe:{durationMs:Math.max(0,Math.round(performance.now()-t))}}),e)),g.current.set(e,r)}let i=!1,a=setTimeout(()=>{i||(i=!0,C.warning(`wallet_onboarding_sandbox.bootstrap_failed`,{safe:{errorName:`TimeoutError`}}),S({attempt:t,metadata:null,retry:v,status:`error`}),B())},Y);return r.then(e=>{if(i)return;let r=E({toolResult:ne({isCodexAppsServer:O(n.server),toolResult:e})}),a=J.safeParse(r);S({attempt:t,metadata:a.success?a.data:null,retry:v,status:a.success?`ready`:`error`}),a.success||B()}).catch(e=>{i||(C.warning(`wallet_onboarding_sandbox.bootstrap_failed`,{safe:{errorName:e instanceof Error?e.name:`UnknownError`}}),S({attempt:t,metadata:null,retry:v,status:`error`}),B())}).finally(()=>{clearTimeout(a)}),()=>{i=!0,clearTimeout(a)}},[v,N,t,n.hostId,n.server,n.tool.name,o,l]),(0,q.useEffect)(()=>{if(!j||w==null)return;let e=getComputedStyle(document.documentElement).colorScheme===`dark`?`dark`:`light`;Promise.all([w.setTheme({theme:e}),w.notifyMcpAppsHostContext({hostContext:{availableDisplayModes:[`inline`],containerDimensions:{maxHeight:620,maxWidth:568},deviceCapabilities:{hover:!0,touch:!1},displayMode:`inline`,locale:c.locale,platform:`desktop`,safeAreaInsets:{bottom:0,left:0,right:0,top:0},styles:{variables:u},theme:e,timeZone:Intl.DateTimeFormat().resolvedOptions().timeZone,userAgent:`chatgpt`}})]).catch(()=>void 0)},[u,c.locale,j,w]),(0,q.useEffect)(()=>{if(!j||w==null)return;let e=o&&b?.attempt===t?b:null;w.setWidgetData({toolInput:e==null?null:{bootstrap_retry:e.retry,bootstrap_status:e.status,enrollment_attempt:e.attempt,enrollment_requested:!0,style_variables:u},toolOutput:null,toolResponseMetadata:e?.metadata??null,widgetId:L,widgetState:null}).catch(()=>void 0)},[b,t,u,j,o,w,L]),(0,Ce.jsx)(`div`,{ref:h,"aria-hidden":`true`,className:`pointer-events-none fixed h-px w-px overflow-hidden opacity-0`})}var q,Ce,J,we,Te,Ee,De,Y,X,Oe=e((()=>{m(),F(),D(),q=t(i(),1),k(),P(),r(),fe(),de(),V(),B(),N(),me(),xe(),Ce=j(),J=A({vgs_collect_bootstrap:A({access_token:G().trim().min(1),environment:H([`sandbox`,`live`]),force_staging_env:U(),vault_id:G().trim().min(1)})}),we=A({force_staging_env:U(),vgs_card_id:G().trim().min(1)}),Te=A({card:A({last4:G()}),ok:R(!0)}),Ee=A({duration_ms:M().finite().nonnegative(),result:H([`failure`,`success`]),stage:H([`fields_ready`,`save`,`sdk_load`,`submit`])}),De=A({}).strict(),Y=15e3,X=le({bootstrapError:{id:`codexWalletOnboardingEnrollment.bootstrapError`,defaultMessage:`The secure card session is unavailable or expired`,description:`Error shown when Wallet onboarding cannot authorize VGS Collect`},cardNumber:{id:`codexWalletOnboardingEnrollment.cardNumber`,defaultMessage:`Card number`,description:`Label for the Wallet onboarding secure card-number field`},cvc:{id:`codexWalletOnboardingEnrollment.cvc`,defaultMessage:`Security code`,description:`Label for the Wallet onboarding secure card-security-code field`},cvcPlaceholder:{id:`codexWalletOnboardingEnrollment.cvcPlaceholder`,defaultMessage:`3 digits`,description:`Placeholder for the Wallet onboarding secure card-security-code field`},error:{id:`codexWalletOnboardingEnrollment.error`,defaultMessage:`We couldn't add this card`,description:`Generic error shown when Wallet onboarding cannot add a card`},expiration:{id:`codexWalletOnboardingEnrollment.expiration`,defaultMessage:`Expiration date`,description:`Label for the Wallet onboarding secure card-expiration field`},expirationPlaceholder:{id:`codexWalletOnboardingEnrollment.expirationPlaceholder`,defaultMessage:`00/00`,description:`Placeholder for the Wallet onboarding secure card-expiration field`},initializing:{id:`codexWalletOnboardingEnrollment.initializing`,defaultMessage:`Preparing secure card fields…`,description:`Status shown while Wallet onboarding prepares the secure card fields`},numberPlaceholder:{id:`codexWalletOnboardingEnrollment.numberPlaceholder`,defaultMessage:`16 digits`,description:`Length hint shown inside the Wallet onboarding secure card-number field`},privacy:{id:`codexWalletOnboardingEnrollment.privacy`,defaultMessage:`Fully encrypted and never shared with third party apps`,description:`Privacy explanation shown below Wallet onboarding secure card fields`},retry:{id:`codexWalletOnboardingEnrollment.retry`,defaultMessage:`Try again`,description:`Button that retries Wallet onboarding secure-field initialization`},retrySave:{id:`codexWalletOnboardingEnrollment.retrySave`,defaultMessage:`Save to Wallet`,description:`Button that retries saving a secured card to Wallet`},saveError:{id:`codexWalletOnboardingEnrollment.saveError`,defaultMessage:`Your card was secured, but Wallet couldn't save it`,description:`Error shown when Wallet onboarding cannot save an already secured card`},submit:{id:`codexWalletOnboardingEnrollment.submit`,defaultMessage:`Add card`,description:`Button that submits the Wallet onboarding secure card form`},submitting:{id:`codexWalletOnboardingEnrollment.submitting`,defaultMessage:`Adding card…`,description:`Status shown while Wallet onboarding adds the secured card`},title:{id:`codexWalletOnboardingEnrollment.title`,defaultMessage:`Add new card`,description:`Heading for the Wallet onboarding secure card form`},validationError:{id:`codexWalletOnboardingEnrollment.validationError`,defaultMessage:`Check your card details and try again`,description:`Error shown when Wallet onboarding secure fields reject card details`}})}));function ke(e){let t=(0,Z.c)(2),n;return t[0]===e?n=t[1]:(n=(0,$.jsx)(Ae,{...e},e.enrollmentView.hostId),t[0]=e,t[1]=n),n}function Ae(e){let t=(0,Z.c)(20),{dismissAnnouncement:n,enrollmentView:r}=e,[i,a]=(0,Q.useState)(`introduction`),[o,s]=(0,Q.useState)(1),[c,l]=(0,Q.useState)(!1),[u,d]=(0,Q.useState)(`loading`),[f,p]=(0,Q.useState)(null),m;t[0]!==n||t[1]!==c||t[2]!==u||t[3]!==i?(m=i===`introduction`?(0,$.jsx)(Ne,{dismissAnnouncement:n,isSettingUpWallet:c&&u===`loading`,onSetUpWallet:()=>{l(!0),u!==`loading`&&a(`enrollment`)}}):(0,$.jsx)(Me,{completed:i===`success`,dismissAnnouncement:n,preparationFailed:u===`error`,setSandboxTarget:p,onBack:()=>{l(!1),a(`introduction`)},onRetry:()=>{d(`loading`),s(je)}}),t[0]=n,t[1]=c,t[2]=u,t[3]=i,t[4]=m):m=t[4];let h=i===`enrollment`&&u!==`error`,g;t[5]===Symbol.for(`react.memo_cache_sentinel`)?(g=()=>{a(`success`)},t[5]=g):g=t[5];let _,v;t[6]===c?(_=t[7],v=t[8]):(_=()=>{d(`error`),c&&a(`enrollment`)},v=()=>{d(`ready`),c&&a(`enrollment`)},t[6]=c,t[7]=_,t[8]=v);let y=i!==`success`&&u!==`error`,b;t[9]!==o||t[10]!==r||t[11]!==f||t[12]!==h||t[13]!==_||t[14]!==v||t[15]!==y?(b=(0,$.jsx)(Se,{active:h,enrollmentAttempt:o,enrollmentView:r,onComplete:g,onPreparationError:_,onPrepared:v,preparing:y,targetElement:f},o),t[9]=o,t[10]=r,t[11]=f,t[12]=h,t[13]=_,t[14]=v,t[15]=y,t[16]=b):b=t[16];let x;return t[17]!==m||t[18]!==b?(x=(0,$.jsxs)($.Fragment,{children:[m,b]}),t[17]=m,t[18]=b,t[19]=x):x=t[19],x}function je(e){return e+1}function Me(e){let t=(0,Z.c)(22),{completed:r,dismissAnnouncement:i,onBack:a,onRetry:l,preparationFailed:d,setSandboxTarget:p}=e,m=d!==void 0&&d,h=b(),g;t[0]===Symbol.for(`react.memo_cache_sentinel`)?(g={"aria-describedby":void 0},t[0]=g):g=t[0];let _;t[1]===Symbol.for(`react.memo_cache_sentinel`)?(_=(0,$.jsx)(L,{id:`codexWalletOnboardingEnrollmentModal.close`,defaultMessage:`Close`,description:`Accessible label for closing ChatGPT Wallet card enrollment`}),t[1]=_):_=t[1];let v;t[2]===i?v=t[3]:(v=e=>{e||i()},t[2]=i,t[3]=v);let y;t[4]!==r||t[5]!==l||t[6]!==m||t[7]!==p||t[8]!==h?(y=r?(0,$.jsx)(c.div,{animate:{opacity:1,y:0},className:`flex min-h-0 flex-1 items-center justify-center px-6 select-none`,initial:!h&&{opacity:0,y:12},transition:{duration:h?0:.28},children:(0,$.jsx)(n,{className:`items-center text-center`,icon:(0,$.jsx)(c.span,{animate:{rotate:0,scale:1},className:`flex`,initial:!h&&{rotate:-18,scale:0},transition:h?{duration:0}:{damping:18,delay:.12,stiffness:320,type:`spring`},children:(0,$.jsx)(u,{className:`icon-base`})}),iconBackgroundClassName:`bg-token-charts-green/20`,iconClassName:`mx-auto text-token-charts-green`,title:(0,$.jsx)(s,{children:(0,$.jsx)(L,{id:`codexWalletOnboardingEnrollmentModal.successTitle`,defaultMessage:`Your card was successfully saved`,description:`Heading shown after a card is saved during ChatGPT Wallet onboarding`})}),subtitle:(0,$.jsx)(L,{id:`codexWalletOnboardingEnrollmentModal.successDescription`,defaultMessage:`You’re ready to go`,description:`Confirmation shown after a card is saved during ChatGPT Wallet onboarding`})})}):m?(0,$.jsxs)(`div`,{className:`flex min-h-0 flex-1 flex-col items-center justify-center gap-4 px-6 text-center select-none`,children:[(0,$.jsx)(s,{children:(0,$.jsx)(L,{id:`codexWalletOnboardingEnrollmentModal.preparationErrorTitle`,defaultMessage:`Unable to add your card`,description:`Heading shown when Wallet onboarding cannot initialize secure card enrollment`})}),(0,$.jsx)(`p`,{role:`alert`,className:`text-token-text-secondary`,children:(0,$.jsx)(L,{id:`codexWalletOnboardingEnrollmentModal.preparationError`,defaultMessage:`The secure card session is unavailable or expired`,description:`Error shown when Wallet onboarding cannot initialize secure card enrollment`})}),(0,$.jsx)(f,{className:`w-full justify-center`,color:`primary`,size:`large`,onClick:l,children:(0,$.jsx)(L,{id:`codexWalletOnboardingEnrollmentModal.retryPreparation`,defaultMessage:`Try again`,description:`Button that retries secure Wallet card-enrollment initialization`})})]}):(0,$.jsxs)($.Fragment,{children:[(0,$.jsx)(s,{className:`sr-only`,children:(0,$.jsx)(L,{id:`codexWalletOnboardingEnrollmentModal.title`,defaultMessage:`Add a card to ChatGPT Wallet`,description:`Accessible title for ChatGPT Wallet card enrollment`})}),(0,$.jsx)(`div`,{ref:p,className:`relative min-h-0 flex-1 overflow-hidden bg-token-main-surface-primary`})]}),t[4]=r,t[5]=l,t[6]=m,t[7]=p,t[8]=h,t[9]=y):y=t[9];let x=r?`primary`:`ghostTertiary`,S=r?i:a,C;t[10]===r?C=t[11]:(C=r?(0,$.jsx)(L,{id:`codexWalletOnboardingEnrollmentModal.continue`,defaultMessage:`Continue`,description:`Button that closes the ChatGPT Wallet onboarding announcement after a card is saved`}):(0,$.jsx)(L,{id:`codexWalletOnboardingEnrollmentModal.back`,defaultMessage:`Back`,description:`Button that returns from Wallet card enrollment to the Wallet introduction`}),t[10]=r,t[11]=C);let w;t[12]!==x||t[13]!==S||t[14]!==C?(w=(0,$.jsx)(`div`,{className:`shrink-0 bg-token-main-surface-primary px-6 pb-6`,children:(0,$.jsx)(f,{className:`w-full justify-center`,color:x,size:`large`,onClick:S,children:C})}),t[12]=x,t[13]=S,t[14]=C,t[15]=w):w=t[15];let T;t[16]!==y||t[17]!==w?(T=(0,$.jsxs)(`div`,{className:`flex h-full min-h-0 flex-col`,children:[y,w]}),t[16]=y,t[17]=w,t[18]=T):T=t[18];let E;return t[19]!==T||t[20]!==v?(E=(0,$.jsx)(o,{open:!0,contentClassName:`h-[min(504px,calc(100dvh-32px))] w-[min(480px,92vw)] !rounded-[16px] !bg-token-main-surface-primary !ring-0 !backdrop-blur-none`,contentProps:g,dialogCloseClassName:`z-10`,dialogCloseLabel:_,onOpenChange:v,size:`feature`,children:T}),t[19]=T,t[20]=v,t[21]=E):E=t[21],E}var Z,Q,$,Ne;e((()=>{Z=S(),pe(),Q=t(i(),1),k(),v(),y(),g(),w(),l(),p(),Oe(),$=j(),I(),Ne=a(async()=>(await h(async()=>{let{WalletOnboardingAnnouncementModal:e}=await import(`./wallet-onboarding-announcement-modal-DoqFRp7d.js`);return{WalletOnboardingAnnouncementModal:e}},__vite__mapDeps([0,1,2,3,4]),import.meta.url)).WalletOnboardingAnnouncementModal)}))();export{ke as WalletOnboardingAnnouncement};
//# sourceMappingURL=wallet-onboarding-announcement-content-CHwNe2UI.js.map