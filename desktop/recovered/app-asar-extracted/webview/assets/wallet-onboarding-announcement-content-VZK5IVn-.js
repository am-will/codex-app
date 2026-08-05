const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./wallet-onboarding-announcement-modal-C-LEzLB-.js","./rolldown-runtime-DAXXjFlN.js","./app-initial-CKNQDTeE.js","./app-initial-CdR-yhj1.css","./wallet-onboarding-announcement-modal-BypdusLM.css"])))=>i.map(i=>d[i]);
import{n as e,o as t}from"./rolldown-runtime-DAXXjFlN.js";import{$_t as n,AK as r,BK as i,BSt as a,CK as o,CSt as s,DK as c,D_t as l,EK as u,FK as d,F_t as f,Ggt as p,Ght as m,Gmt as h,IK as g,Iut as _,KK as v,Kht as y,Lut as b,MK as x,NK as S,OK as C,O_t as w,PK as ee,PSt as te,P_t as T,R_t as E,SSt as D,Syt as O,TCt as k,TSt as A,UK as j,Uyt as M,V_t as ne,WK as N,Wmt as P,Wyt as F,_K as re,_St as I,bK as ie,byt as ae,cht as L,dSt as R,gK as z,hK as B,jK as V,mSt as H,qK as oe,s_t as U,sht as se,vK as ce,wCt as le,wK as ue,xK as de,xSt as fe,xyt as pe,yCt as W,yK as me,zSt as he}from"./app-initial-CKNQDTeE.js";function ge(e,{styleVariables:t={},theme:n=`light`}={}){return`<!doctype html>
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
        const retryTool = ${JSON.stringify(G)};
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
</html>`}var G,_e,ve,K,ye,be,xe=e((()=>{G=`__wallet_onboarding_retry_bootstrap`,_e=`__wallet_onboarding_save_vgs_card`,ve=`__wallet_onboarding_stage`,K={baseUriDomains:[],connectDomains:[`https://js.verygoodvault.com`,`https://js3.verygoodvault.com`,`https://vgs-collect-keeper.apps.verygood.systems`,`https://*.verygoodproxy.com`],frameDomains:[`https://js.verygoodvault.com`,`https://js3.verygoodvault.com`,`https://vgs-collect-keeper.apps.verygood.systems`],includeDefaultDomains:!1,isTrusted:!0,resourceDomains:[`https://js.verygoodvault.com`,`https://js3.verygoodvault.com`,`https://vgs-collect-keeper.apps.verygood.systems`]},ye=`https://js.verygoodvault.com/vgs-collect/3.2.2/vgs-collect.js`,be=15e3}));function Se({active:e,enrollmentAttempt:t,enrollmentView:n,onComplete:i,onPreparationError:s,onPrepared:d,preparing:f,targetElement:p}){let m=ne(),h=he(l),g=a(ee),_=(0,q.useId)(),v=(0,q.useRef)(e),b=(0,q.useRef)(!1),S=(0,q.useRef)(null),C=(0,q.useRef)(new Map),[w,te]=(0,q.useState)(0),[T,E]=(0,q.useState)(null),[D,O]=(0,q.useState)(null),[k,A]=(0,q.useState)(null),[j,M]=(0,q.useState)(!1),N=re({server:n.server,tool:n.tool}),P=ce({connectorId:N,instanceFallbackId:`wallet-onboarding-${_}`,server:n.server}),F=ue({locale:m.locale,originScope:P,widgetDomain:null}),I=o({originScope:P,sourceUrl:F}),L=`wallet-onboarding-${_}`,R=(0,q.useEffectEvent)(async(t,r)=>{if(t===`__wallet_onboarding_stage`){let e=Ee.parse(r);return y.info(`wallet_onboarding_sandbox.stage`,{safe:e}),f&&e.stage===`fields_ready`&&(e.result===`success`?d():s()),{}}if(t===`__wallet_onboarding_retry_bootstrap`){if(!e)throw Error(`Wallet onboarding enrollment is not active`);return De.parse(r),te(e=>e+1),{}}if(t!==`__wallet_onboarding_save_vgs_card`)throw Error(`Wallet onboarding sandbox cannot call this tool`);if(!e)throw Error(`Wallet onboarding enrollment is not active`);let a=we.parse(r),o=J.safeParse(T?.metadata);if(!o.success||a.force_staging_env!==o.data.vgs_collect_bootstrap.force_staging_env)throw Error(`Wallet card environment does not match enrollment`);let c=n.serverTools.find(e=>/(?:^|[._])(?:wallet_)?save_vgs_card$/.test(e.name));if(c==null)throw Error(`Wallet save tool is unavailable`);let l=de({connectorId:N,server:n.server,toolName:c.name,tools:n.serverTools}),p=await B(h,n.hostId,n.server,l.name,a),m=u({isCodexAppsServer:ie(n.server),toolResult:p});return m.isError!==!0&&Te.safeParse(m.structuredContent).success&&(v.current?i():b.current=!0),m}),z=(0,q.useEffectEvent)(()=>{s()}),V=(0,q.useEffectEvent)(()=>{e&&b.current&&(b.current=!1,i())});return(0,q.useLayoutEffect)(()=>{let e=document.createElement(`webview`);return e.className=`h-full w-full overflow-hidden border-0`,e.setAttribute(`partition`,ae(I)),A(e),()=>{e.remove(),e.destroy?.(),A(t=>t===e?null:t)}},[I]),(0,q.useLayoutEffect)(()=>{if(v.current=e,V(),k==null)return;let t=e?p:S.current;t!=null&&k.parentElement!==t&&t.appendChild(k)},[e,k,p]),(0,q.useLayoutEffect)(()=>{if(k==null)return;let e=pe(F,{requireSkybridge:!0});if(e==null){y.warning(`wallet_onboarding_sandbox.invalid_origin`,{safe:{}}),z();return}let t=new AbortController,n,i=performance.now();M(!1);let a=getComputedStyle(document.documentElement).colorScheme===`dark`?`dark`:`light`,o=h.get(ee),s=ge({bootstrapError:m.formatMessage(X.bootstrapError),cardNumber:m.formatMessage(X.cardNumber),cvc:m.formatMessage(X.cvc),cvcPlaceholder:m.formatMessage(X.cvcPlaceholder),error:m.formatMessage(X.error),expiration:m.formatMessage(X.expiration),expirationPlaceholder:m.formatMessage(X.expirationPlaceholder),initializing:m.formatMessage(X.initializing),numberPlaceholder:m.formatMessage(X.numberPlaceholder),privacy:m.formatMessage(X.privacy),retry:m.formatMessage(X.retry),retrySave:m.formatMessage(X.retrySave),saveError:m.formatMessage(X.saveError),submit:m.formatMessage(X.submit),submitting:m.formatMessage(X.submitting),title:m.formatMessage(X.title),validationError:m.formatMessage(X.validationError)},{styleVariables:o,theme:a});return r({hostApiHandlers:{callMcp:()=>Promise.reject(Error(`Wallet onboarding sandbox cannot make MCP requests`)),callTool:(e,t)=>R(e,t),notifyBackgroundColor:()=>{},notifyEnvironmentError:()=>{y.warning(`wallet_onboarding_sandbox.environment_error`,{safe:{}}),z()},notifyIntrinsicHeight:()=>{},notifyIntrinsicWidth:()=>{},notifyNavigation:()=>{},notifySecurityPolicyViolation:()=>{y.warning(`wallet_onboarding_sandbox.csp_violation`,{safe:{}}),z()},openExternal:()=>{},requestDisplayMode:()=>({mode:`inline`}),sendFollowUpMessage:()=>Promise.reject(Error(`Wallet onboarding sandbox cannot send follow-ups`)),sendInstrument:()=>{},updateWidgetState:()=>{}},origin:e,sandboxId:I,signal:t.signal,sourceUrl:F,webview:k}).then(async e=>{if(t.signal.aborted)return;O(e);let r=e.runWidgetCode({csp:K,displayMode:`inline`,features:[],html:s,isFirstParty:!1,isSidebarOpen:!1,isTombstone:!1,maxHeight:620,maxWidth:568,measureWidth:!1,mcpApps:{hostCapabilities:{sandbox:{csp:K}},hostContext:{availableDisplayModes:[`inline`],containerDimensions:{maxHeight:620,maxWidth:568},deviceCapabilities:{hover:!0,touch:!1},displayMode:`inline`,locale:m.locale,platform:`desktop`,safeAreaInsets:{bottom:0,left:0,right:0,top:0},styles:{variables:o},theme:a,timeZone:Intl.DateTimeFormat().resolvedOptions().timeZone,userAgent:`chatgpt`},hostInfo:{name:`chatgpt`}},safeArea:{insets:{bottom:0,left:0,right:0,top:0}},theme:a,toolInput:null,toolOutput:null,toolResponseMetadata:null,userAgent:{capabilities:{hover:!0,touch:!1},device:{os:`unknown`,platform:`native`,type:`desktop`}},viewParams:null,widgetId:L,widgetState:null});n=setTimeout(()=>{t.signal.aborted||(y.warning(`wallet_onboarding_sandbox.init_failed`,{safe:{errorName:`TimeoutError`}}),z(),t.abort())},Y);for await(let e of r){if(t.signal.aborted)return;if(x.safeParse(e).success){clearTimeout(n),M(!0),y.info(`wallet_onboarding_sandbox.initialized`,{safe:{durationMs:Math.max(0,Math.round(performance.now()-i))}});return}}clearTimeout(n),t.signal.aborted||(y.warning(`wallet_onboarding_sandbox.init_failed`,{safe:{errorName:`MissingRunningStatus`}}),z())}).catch(e=>{t.signal.aborted||(y.warning(`wallet_onboarding_sandbox.init_failed`,{safe:{errorName:e instanceof Error?e.name:`UnknownError`}}),z())}),()=>{clearTimeout(n),t.abort(),M(!1),O(null)}},[m,k,I,h,F,L]),(0,q.useEffect)(()=>{if(!f||t===0)return;let e=JSON.stringify([N,n.hostId,n.server,n.tool.name,t,w]);E({attempt:t,metadata:null,retry:w,status:`loading`});let r=C.current.get(e);if(r==null){let t=performance.now();r=B(h,n.hostId,n.server,n.tool.name,{force_staging_env:!1}).then(e=>(y.info(`wallet_onboarding_sandbox.bootstrap`,{safe:{durationMs:Math.max(0,Math.round(performance.now()-t))}}),e)),C.current.set(e,r)}let i=!1,a=setTimeout(()=>{i||(i=!0,y.warning(`wallet_onboarding_sandbox.bootstrap_failed`,{safe:{errorName:`TimeoutError`}}),E({attempt:t,metadata:null,retry:w,status:`error`}),z())},Y);return r.then(e=>{if(i)return;let r=c({toolResult:u({isCodexAppsServer:ie(n.server),toolResult:e})}),a=J.safeParse(r);E({attempt:t,metadata:a.success?a.data:null,retry:w,status:a.success?`ready`:`error`}),a.success||z()}).catch(e=>{i||(y.warning(`wallet_onboarding_sandbox.bootstrap_failed`,{safe:{errorName:e instanceof Error?e.name:`UnknownError`}}),E({attempt:t,metadata:null,retry:w,status:`error`}),z())}).finally(()=>{clearTimeout(a)}),()=>{i=!0,clearTimeout(a)}},[w,N,t,n.hostId,n.server,n.tool.name,f,h]),(0,q.useEffect)(()=>{if(!j||D==null)return;let e=getComputedStyle(document.documentElement).colorScheme===`dark`?`dark`:`light`;Promise.all([D.setTheme({theme:e}),D.notifyMcpAppsHostContext({hostContext:{availableDisplayModes:[`inline`],containerDimensions:{maxHeight:620,maxWidth:568},deviceCapabilities:{hover:!0,touch:!1},displayMode:`inline`,locale:m.locale,platform:`desktop`,safeAreaInsets:{bottom:0,left:0,right:0,top:0},styles:{variables:g},theme:e,timeZone:Intl.DateTimeFormat().resolvedOptions().timeZone,userAgent:`chatgpt`}})]).catch(()=>void 0)},[g,m.locale,j,D]),(0,q.useEffect)(()=>{if(!j||D==null)return;let e=f&&T?.attempt===t?T:null;D.setWidgetData({toolInput:e==null?null:{bootstrap_retry:e.retry,bootstrap_status:e.status,enrollment_attempt:e.attempt,enrollment_requested:!0,style_variables:g},toolOutput:null,toolResponseMetadata:e?.metadata??null,widgetId:L,widgetState:null}).catch(()=>void 0)},[T,t,g,j,f,D,L]),(0,Ce.jsx)(`div`,{ref:S,"aria-hidden":`true`,className:`pointer-events-none fixed h-px w-px overflow-hidden opacity-0`})}var q,Ce,J,we,Te,Ee,De,Y,X,Oe=e((()=>{te(),n(),O(),q=t(k(),1),f(),R(),S(),V(),C(),me(),z(),w(),m(),xe(),Ce=W(),J=s({vgs_collect_bootstrap:s({access_token:A().trim().min(1),environment:H([`sandbox`,`live`]),force_staging_env:I(),vault_id:A().trim().min(1)})}),we=s({force_staging_env:I(),vgs_card_id:A().trim().min(1)}),Te=s({card:s({last4:A()}),ok:fe(!0)}),Ee=s({duration_ms:D().finite().nonnegative(),result:H([`failure`,`success`]),stage:H([`fields_ready`,`save`,`sdk_load`,`submit`])}),De=s({}).strict(),Y=15e3,X=T({bootstrapError:{id:`codexWalletOnboardingEnrollment.bootstrapError`,defaultMessage:`The secure card session is unavailable or expired`,description:`Error shown when Wallet onboarding cannot authorize VGS Collect`},cardNumber:{id:`codexWalletOnboardingEnrollment.cardNumber`,defaultMessage:`Card number`,description:`Label for the Wallet onboarding secure card-number field`},cvc:{id:`codexWalletOnboardingEnrollment.cvc`,defaultMessage:`Security code`,description:`Label for the Wallet onboarding secure card-security-code field`},cvcPlaceholder:{id:`codexWalletOnboardingEnrollment.cvcPlaceholder`,defaultMessage:`3 digits`,description:`Placeholder for the Wallet onboarding secure card-security-code field`},error:{id:`codexWalletOnboardingEnrollment.error`,defaultMessage:`We couldn't add this card`,description:`Generic error shown when Wallet onboarding cannot add a card`},expiration:{id:`codexWalletOnboardingEnrollment.expiration`,defaultMessage:`Expiration date`,description:`Label for the Wallet onboarding secure card-expiration field`},expirationPlaceholder:{id:`codexWalletOnboardingEnrollment.expirationPlaceholder`,defaultMessage:`00/00`,description:`Placeholder for the Wallet onboarding secure card-expiration field`},initializing:{id:`codexWalletOnboardingEnrollment.initializing`,defaultMessage:`Preparing secure card fields…`,description:`Status shown while Wallet onboarding prepares the secure card fields`},numberPlaceholder:{id:`codexWalletOnboardingEnrollment.numberPlaceholder`,defaultMessage:`16 digits`,description:`Length hint shown inside the Wallet onboarding secure card-number field`},privacy:{id:`codexWalletOnboardingEnrollment.privacy`,defaultMessage:`Fully encrypted and never shared with third party apps`,description:`Privacy explanation shown below Wallet onboarding secure card fields`},retry:{id:`codexWalletOnboardingEnrollment.retry`,defaultMessage:`Try again`,description:`Button that retries Wallet onboarding secure-field initialization`},retrySave:{id:`codexWalletOnboardingEnrollment.retrySave`,defaultMessage:`Save to Wallet`,description:`Button that retries saving a secured card to Wallet`},saveError:{id:`codexWalletOnboardingEnrollment.saveError`,defaultMessage:`Your card was secured, but Wallet couldn't save it`,description:`Error shown when Wallet onboarding cannot save an already secured card`},submit:{id:`codexWalletOnboardingEnrollment.submit`,defaultMessage:`Add card`,description:`Button that submits the Wallet onboarding secure card form`},submitting:{id:`codexWalletOnboardingEnrollment.submitting`,defaultMessage:`Adding card…`,description:`Status shown while Wallet onboarding adds the secured card`},title:{id:`codexWalletOnboardingEnrollment.title`,defaultMessage:`Add new card`,description:`Heading for the Wallet onboarding secure card form`},validationError:{id:`codexWalletOnboardingEnrollment.validationError`,defaultMessage:`Check your card details and try again`,description:`Error shown when Wallet onboarding secure fields reject card details`}})}));function ke(e){let t=(0,Z.c)(2),n;return t[0]===e?n=t[1]:(n=(0,$.jsx)(Ae,{...e},e.enrollmentView.hostId),t[0]=e,t[1]=n),n}function Ae(e){let t=(0,Z.c)(20),{dismissAnnouncement:n,enrollmentView:r}=e,[i,a]=(0,Q.useState)(`introduction`),[o,s]=(0,Q.useState)(1),[c,l]=(0,Q.useState)(!1),[u,d]=(0,Q.useState)(`loading`),[f,p]=(0,Q.useState)(null),m;t[0]!==n||t[1]!==c||t[2]!==u||t[3]!==i?(m=i===`introduction`?(0,$.jsx)(Ne,{dismissAnnouncement:n,isSettingUpWallet:c&&u===`loading`,onSetUpWallet:()=>{l(!0),u!==`loading`&&a(`enrollment`)}}):(0,$.jsx)(Me,{completed:i===`success`,dismissAnnouncement:n,preparationFailed:u===`error`,setSandboxTarget:p,onBack:()=>{l(!1),a(`introduction`)},onRetry:()=>{d(`loading`),s(je)}}),t[0]=n,t[1]=c,t[2]=u,t[3]=i,t[4]=m):m=t[4];let h=i===`enrollment`&&u!==`error`,g;t[5]===Symbol.for(`react.memo_cache_sentinel`)?(g=()=>{a(`success`)},t[5]=g):g=t[5];let _,v;t[6]===c?(_=t[7],v=t[8]):(_=()=>{d(`error`),c&&a(`enrollment`)},v=()=>{d(`ready`),c&&a(`enrollment`)},t[6]=c,t[7]=_,t[8]=v);let y=i!==`success`&&u!==`error`,b;t[9]!==o||t[10]!==r||t[11]!==f||t[12]!==h||t[13]!==_||t[14]!==v||t[15]!==y?(b=(0,$.jsx)(Se,{active:h,enrollmentAttempt:o,enrollmentView:r,onComplete:g,onPreparationError:_,onPrepared:v,preparing:y,targetElement:f},o),t[9]=o,t[10]=r,t[11]=f,t[12]=h,t[13]=_,t[14]=v,t[15]=y,t[16]=b):b=t[16];let x;return t[17]!==m||t[18]!==b?(x=(0,$.jsxs)($.Fragment,{children:[m,b]}),t[17]=m,t[18]=b,t[19]=x):x=t[19],x}function je(e){return e+1}function Me(e){let t=(0,Z.c)(22),{completed:n,dismissAnnouncement:r,onBack:a,onRetry:o,preparationFailed:s,setSandboxTarget:c}=e,l=s!==void 0&&s,u=L(),d;t[0]===Symbol.for(`react.memo_cache_sentinel`)?(d={"aria-describedby":void 0},t[0]=d):d=t[0];let f;t[1]===Symbol.for(`react.memo_cache_sentinel`)?(f=(0,$.jsx)(E,{id:`codexWalletOnboardingEnrollmentModal.close`,defaultMessage:`Close`,description:`Accessible label for closing ChatGPT Wallet card enrollment`}),t[1]=f):f=t[1];let p;t[2]===r?p=t[3]:(p=e=>{e||r()},t[2]=r,t[3]=p);let m;t[4]!==n||t[5]!==o||t[6]!==l||t[7]!==c||t[8]!==u?(m=n?(0,$.jsx)(U.div,{animate:{opacity:1,y:0},className:`flex min-h-0 flex-1 items-center justify-center px-6 select-none`,initial:!u&&{opacity:0,y:12},transition:{duration:u?0:.28},children:(0,$.jsx)(i,{className:`items-center text-center`,icon:(0,$.jsx)(U.span,{animate:{rotate:0,scale:1},className:`flex`,initial:!u&&{rotate:-18,scale:0},transition:u?{duration:0}:{damping:18,delay:.12,stiffness:320,type:`spring`},children:(0,$.jsx)(_,{className:`icon-base`})}),iconBackgroundClassName:`bg-token-charts-green/20`,iconClassName:`mx-auto text-token-charts-green`,title:(0,$.jsx)(v,{children:(0,$.jsx)(E,{id:`codexWalletOnboardingEnrollmentModal.successTitle`,defaultMessage:`Your card was successfully saved`,description:`Heading shown after a card is saved during ChatGPT Wallet onboarding`})}),subtitle:(0,$.jsx)(E,{id:`codexWalletOnboardingEnrollmentModal.successDescription`,defaultMessage:`You’re ready to go`,description:`Confirmation shown after a card is saved during ChatGPT Wallet onboarding`})})}):l?(0,$.jsxs)(`div`,{className:`flex min-h-0 flex-1 flex-col items-center justify-center gap-4 px-6 text-center select-none`,children:[(0,$.jsx)(v,{children:(0,$.jsx)(E,{id:`codexWalletOnboardingEnrollmentModal.preparationErrorTitle`,defaultMessage:`Unable to add your card`,description:`Heading shown when Wallet onboarding cannot initialize secure card enrollment`})}),(0,$.jsx)(`p`,{role:`alert`,className:`text-token-text-secondary`,children:(0,$.jsx)(E,{id:`codexWalletOnboardingEnrollmentModal.preparationError`,defaultMessage:`The secure card session is unavailable or expired`,description:`Error shown when Wallet onboarding cannot initialize secure card enrollment`})}),(0,$.jsx)(P,{className:`w-full justify-center`,color:`primary`,size:`large`,onClick:o,children:(0,$.jsx)(E,{id:`codexWalletOnboardingEnrollmentModal.retryPreparation`,defaultMessage:`Try again`,description:`Button that retries secure Wallet card-enrollment initialization`})})]}):(0,$.jsxs)($.Fragment,{children:[(0,$.jsx)(v,{className:`sr-only`,children:(0,$.jsx)(E,{id:`codexWalletOnboardingEnrollmentModal.title`,defaultMessage:`Add a card to ChatGPT Wallet`,description:`Accessible title for ChatGPT Wallet card enrollment`})}),(0,$.jsx)(`div`,{ref:c,className:`relative min-h-0 flex-1 overflow-hidden bg-token-main-surface-primary`})]}),t[4]=n,t[5]=o,t[6]=l,t[7]=c,t[8]=u,t[9]=m):m=t[9];let h=n?`primary`:`ghostTertiary`,g=n?r:a,y;t[10]===n?y=t[11]:(y=n?(0,$.jsx)(E,{id:`codexWalletOnboardingEnrollmentModal.continue`,defaultMessage:`Continue`,description:`Button that closes the ChatGPT Wallet onboarding announcement after a card is saved`}):(0,$.jsx)(E,{id:`codexWalletOnboardingEnrollmentModal.back`,defaultMessage:`Back`,description:`Button that returns from Wallet card enrollment to the Wallet introduction`}),t[10]=n,t[11]=y);let b;t[12]!==h||t[13]!==g||t[14]!==y?(b=(0,$.jsx)(`div`,{className:`shrink-0 bg-token-main-surface-primary px-6 pb-6`,children:(0,$.jsx)(P,{className:`w-full justify-center`,color:h,size:`large`,onClick:g,children:y})}),t[12]=h,t[13]=g,t[14]=y,t[15]=b):b=t[15];let x;t[16]!==m||t[17]!==b?(x=(0,$.jsxs)(`div`,{className:`flex h-full min-h-0 flex-col`,children:[m,b]}),t[16]=m,t[17]=b,t[18]=x):x=t[18];let S;return t[19]!==x||t[20]!==p?(S=(0,$.jsx)(N,{open:!0,contentClassName:`h-[min(504px,calc(100dvh-32px))] w-[min(480px,92vw)] !rounded-[16px] !bg-token-main-surface-primary !ring-0 !backdrop-blur-none`,contentProps:d,dialogCloseClassName:`z-10`,dialogCloseLabel:f,onOpenChange:p,size:`feature`,children:x}),t[19]=x,t[20]=p,t[21]=S):S=t[21],S}var Z,Q,$,Ne;e((()=>{Z=le(),p(),Q=t(k(),1),f(),h(),oe(),j(),d(),se(),b(),Oe(),$=W(),F(),Ne=g(async()=>(await M(async()=>{let{WalletOnboardingAnnouncementModal:e}=await import(`./wallet-onboarding-announcement-modal-C-LEzLB-.js`);return{WalletOnboardingAnnouncementModal:e}},__vite__mapDeps([0,1,2,3,4]),import.meta.url)).WalletOnboardingAnnouncementModal)}))();export{ke as WalletOnboardingAnnouncement};
//# sourceMappingURL=wallet-onboarding-announcement-content-VZK5IVn-.js.map