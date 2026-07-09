import{n as e,s as t,t as n}from"./rolldown-runtime-Czos8NxU.js";import{d as r,f as i}from"./app-initial~app-main~new-thread-panel-page~onboarding-page~appgen-library-page~hotkey-windo~k98yhiib-eAsVqhCm.js";import{$O as a,AP as o,BS as s,Bj as c,CP as l,Dj as u,Dw as d,EP as f,Ej as p,GE as m,Gd as h,HE as g,Hd as _,Hj as v,Hw as y,Iw as b,JE as x,JT as S,KD as C,KE as w,KT as T,Kj as E,LE as D,Li as O,Lw as k,MP as A,NE as j,OE as M,OP as ee,Ow as N,Q as te,RE as P,SP as ne,Sb as F,Sr as re,TD as ie,Tj as I,Tw as L,UT as R,VE as z,Vd as B,Vj as V,W as ae,Wd as oe,Wj as se,Ww as ce,X as le,Y as ue,ZN as H,_P as U,a as de,aF as fe,br as pe,cP as me,cr as he,dk as ge,eF as _e,ek as ve,fr as ye,gO as be,gw as xe,hP as Se,kj as Ce,lF as we,nD as Te,nF as Ee,ni as De,nt as Oe,oF as W,qE as G,qT as ke,rC as Ae,rP as je,rt as Me,s as Ne,sF as Pe,tD as Fe,tP as Ie,wD as Le,xw as Re,yr as ze,zP as Be,zS as Ve}from"./app-initial~app-main~new-thread-panel-page~appgen-library-page~hotkey-window-thread-page~ho~glxlkd48-Bty5T9_s.js";import{H as He,R as Ue,V as We,z as Ge}from"./app-initial~artifact-tab-content.electron~notebook-preview-panel~app-main~pull-request-rout~d3ch7jh9-BhaxCve2.js";function Ke(e){let t=(0,Je.c)(2),n;return t[0]===e?n=t[1]:(n=e==null?void 0:{hostId:e},t[0]=e,t[1]=n),Ie(he,n)}function qe(e){return Ke(e).data?.codexHome}var Je,Ye=e((()=>{Je=r(),H(),ye()}));function Xe(){let e=(0,Ze.c)(3),t=je(h),n;return e[0]!==t.data||e[1]!==t.isLoading?(n={data:t.data,isLoading:t.isLoading},e[0]=t.data,e[1]=t.isLoading,e[2]=n):n=e[2],n}var Ze,Qe=e((()=>{Ze=r(),H(),oe()}));function $e(){let e=(0,tt.c)(7),{data:t,isLoading:n}=Xe(),r,i;if(e[0]!==t?.platform){let n=B(t?.platform);r=n,i=et(n),e[0]=t?.platform,e[1]=r,e[2]=i}else r=e[1],i=e[2];let a;return e[3]!==n||e[4]!==r||e[5]!==i?(a={platform:r,modifierSymbol:i,isLoading:n},e[3]=n,e[4]=r,e[5]=i,e[6]=a):a=e[6],a}function et(e){return e===`macOS`?`⌘`:`^`}var tt,nt=e((()=>{tt=r(),Qe(),_()}));function rt(e){let t=(0,it.c)(10),{hostId:n,featureName:r,defaultEnabled:i}=e,a=i===void 0?!0:i,{data:o,isLoading:s}=Ie(We,n),c;t[0]===o?c=t[1]:(c=o===void 0?[]:o,t[0]=o,t[1]=c);let l=c,u;if(t[2]!==r||t[3]!==l){let e;t[5]===r?e=t[6]:(e=e=>e.name===r,t[5]=r,t[6]=e),u=l.find(e),t[2]=r,t[3]=l,t[4]=u}else u=t[4];let d=u?.enabled??a,f;return t[7]!==s||t[8]!==d?(f={enabled:d,isLoading:s},t[7]=s,t[8]=d,t[9]=f):f=t[9],f}var it,at=e((()=>{it=r(),H(),He()}));function ot(e){return e===`macOS`||e===`windows`}function st(e){let t=(0,dt.c)(16),{enabled:n,hostId:r}=e,i=n===void 0?!0:n,{isLoading:a,platform:o}=$e(),s=ce(`1506311413`),c;t[0]===r?c=t[1]:(c={featureName:`computer_use`,hostId:r},t[0]=r,t[1]=c);let l=rt(c),u=o===`windows`&&!a,d=i&&u,f;t[2]===d?f=t[3]:(f={enabled:d},t[2]=d,t[3]=f);let p=ct(f),m=l.isLoading||u&&p.isLoading,h=l.enabled&&(!u||p.enabled),g;t[4]!==h||t[5]!==i||t[6]!==m||t[7]!==s||t[8]!==a||t[9]!==o?(g=ut({areRequiredFeaturesEnabled:h,enabled:i,isAnyFeatureLoading:m,isComputerUseGateEnabled:s,isHostCompatiblePlatform:ot(o),isPlatformLoading:a,windowType:`electron`}),t[4]=h,t[5]=i,t[6]=m,t[7]=s,t[8]=a,t[9]=o,t[10]=g):g=t[10];let _=g,v=_===`available`,y=_===`loading`&&m,b=_===`loading`,x;return t[11]!==_||t[12]!==v||t[13]!==y||t[14]!==b?(x={available:v,isFetching:y,isLoading:b,reason:_},t[11]=_,t[12]=v,t[13]=y,t[14]=b,t[15]=x):x=t[15],x}function ct(e){let t=(0,dt.c)(21),{enabled:n}=e,r=(0,ft.useContext)(Oe)?.authMethod===`chatgpt`,i;t[0]===Symbol.for(`react.memo_cache_sentinel`)?(i=[`accounts`,`check`],t[0]=i):i=t[0];let a=n&&r,o;t[1]===a?o=t[2]:(o={queryKey:i,queryFn:lt,staleTime:G.ONE_MINUTE,enabled:a},t[1]=a,t[2]=o);let{data:s,errorUpdatedAt:c,isLoading:l}=W(o),u=s?.account_ordering?.[0],d;t[3]!==s?.accounts||t[4]!==u?(d=s?.accounts?.find(e=>e.id===u),t[3]=s?.accounts,t[4]=u,t[5]=d):d=t[5];let f=d,p=f==null&&(!l||c!==0),m=n&&r&&p,h;t[6]===m?h=t[7]:(h={queryConfig:{enabled:m,staleTime:G.ONE_MINUTE}},t[6]=m,t[7]=h);let{data:_,isLoading:v}=g(`account-info`,h),y=f?.id??(p?_?.accountId:void 0),b=f?.plan_type??(p?_?.plan:void 0),x=r?b:void 0,S;t[8]===x?S=t[9]:(S=Ne(x),t[8]=x,t[9]=S);let C=S,w;t[10]===y?w=t[11]:(w=[`accounts`,`settings`,y],t[10]=y,t[11]=w);let T=n&&y!=null&&C&&r,E;t[12]===y?E=t[13]:(E=async()=>L.safeGet(`/accounts/{account_id}/settings`,{parameters:{path:{account_id:y??``}}}),t[12]=y,t[13]=E);let D;t[14]!==T||t[15]!==E||t[16]!==w?(D={queryKey:w,enabled:T,queryFn:E,staleTime:G.ONE_MINUTE},t[14]=T,t[15]=E,t[16]=w,t[17]=D):D=t[17];let{data:O,isLoading:k}=W(D),A=!r||b!=null&&(!C||(O?.beta_settings?.windows_computer_use??!1)),j=n&&r&&(l&&!p||v||k),M;return t[18]!==A||t[19]!==j?(M={enabled:A,isLoading:j},t[18]=A,t[19]=j,t[20]=M):M=t[20],M}async function lt(){return L.safeGet(`/wham/accounts/check`)}function ut({areRequiredFeaturesEnabled:e,enabled:t,isAnyFeatureLoading:n,isComputerUseGateEnabled:r,isHostCompatiblePlatform:i,isPlatformLoading:a,windowType:o}){return t?o===`electron`?r?a?`loading`:i?n?`loading`:e?`available`:`config-requirement-disabled`:`unsupported-platform`:`statsig-disabled`:`window-type-disabled`:`disabled`}var dt,ft,pt=e((()=>{dt=r(),_e(),ft=t(i(),1),Me(),y(),x(),N(),de(),z(),nt(),at()}));function mt(e){let t=(0,gt.c)(12),{hostId:n,windowType:r}=e,i=r===void 0?`electron`:r,a=ce(`410065390`),o;t[0]===n?o=t[1]:(o={featureName:`browser_use_external`,hostId:n},t[0]=n,t[1]=o);let s=rt(o),c;t[2]!==s.enabled||t[3]!==s.isLoading||t[4]!==a||t[5]!==i?(c=ht({isExternalBrowserUseFeatureEnabled:s.enabled,isExternalBrowserUseFeatureLoading:s.isLoading,isExternalBrowserUseGateEnabled:a,windowType:i}),t[2]=s.enabled,t[3]=s.isLoading,t[4]=a,t[5]=i,t[6]=c):c=t[6];let l=c,u=l===`available`,d=l===`available`,f=l===`loading`,p;return t[7]!==l||t[8]!==u||t[9]!==d||t[10]!==f?(p={allowed:u,available:d,isLoading:f,reason:l},t[7]=l,t[8]=u,t[9]=d,t[10]=f,t[11]=p):p=t[11],p}function ht({isExternalBrowserUseFeatureEnabled:e,isExternalBrowserUseFeatureLoading:t,isExternalBrowserUseGateEnabled:n,windowType:r}){return r===`chrome-extension`?`available`:t?`loading`:n?e?`available`:`config-requirement-disabled`:`statsig-disabled`}var gt,_t=e((()=>{gt=r(),y(),at()}));function vt(e){let t=(0,bt.c)(13),{hostId:n}=e,r=je(Ge),i=ce(`410262010`),a;t[0]===n?a=t[1]:(a={featureName:`browser_use`,hostId:n},t[0]=n,t[1]=a);let o=rt(a),s=j(be.runCodexInWsl),c=o.enabled&&!o.isLoading,l=o.isLoading,u=s===!0,d;t[2]!==i||t[3]!==r||t[4]!==c||t[5]!==l||t[6]!==u?(d=yt({isBrowserAgentGateEnabled:i,isBrowserSidebarEnabled:r,isBrowserUseEnabled:c,isLoading:l,runCodexInWsl:u,windowType:`electron`}),t[2]=i,t[3]=r,t[4]=c,t[5]=l,t[6]=u,t[7]=d):d=t[7];let f=d,p=f===`available`,m=f===`available`,h=f===`loading`,g;return t[8]!==f||t[9]!==p||t[10]!==m||t[11]!==h?(g={allowed:p,available:m,isLoading:h,reason:f},t[8]=f,t[9]=p,t[10]=m,t[11]=h,t[12]=g):g=t[12],g}function yt({isBrowserAgentGateEnabled:e,isBrowserSidebarEnabled:t,isBrowserUseEnabled:n,isLoading:r,runCodexInWsl:i,windowType:a}){return a===`chrome-extension`?`window-type-disabled`:r?`loading`:t?e?n?i?`wsl-disabled`:`available`:`config-requirement-disabled`:`statsig-disabled`:`browser-pane-disabled`}var bt,xt=e((()=>{bt=r(),H(),C(),Ue(),M(),y(),at()}));function St(e){let t=(0,wt.c)(4),{hostId:n}=e,{data:r}=Ie(We,n),i;t[0]===r?i=t[1]:(i=r===void 0?[]:r,t[0]=r,t[1]=i);let a=i,o;return t[2]===a?o=t[3]:(o=a.find(Ct),t[2]=a,t[3]=o),o?.enabled??!0}function Ct(e){return e.name===Tt}var wt,Tt,Et=e((()=>{wt=r(),H(),He(),Tt=`plugins`}));function Dt(){return window.electronBridge?.getBuildFlavor?.()||`prod`}var Ot=e((()=>{})),kt,At=e((()=>{kt=`<svg width="192" height="192" viewBox="0 0 192 192" fill="none" xmlns="http://www.w3.org/2000/svg">
<mask id="google-docs-2026-mask0_37242_8762" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="32" y="8" width="128" height="176">
<path d="M130.334 184L61.6 184C52.6565 184 48.1848 184 44.6375 182.596C39.5029 180.563 35.4374 176.497 33.4045 171.362C32 167.815 32 163.343 32 154.4L32 37.6C32 28.6565 32 24.1848 33.4045 20.6375C35.4374 15.5029 39.5029 11.4374 44.6375 9.40447C48.1848 8 52.6565 8 61.6 8L100 8L154.793 62.7933L154.793 62.7934C156.454 64.4543 157.285 65.2848 157.923 66.2239C158.845 67.5811 159.479 69.1131 159.785 70.725C159.997 71.8404 159.997 73.0264 159.995 75.3985C159.96 124.317 159.938 124.799 159.937 154.366C159.937 163.332 159.937 167.816 158.532 171.363C156.499 176.498 152.434 180.562 147.299 182.596C143.752 184 139.279 184 130.334 184Z" fill="#3186FF"/>
</mask>
<g mask="url(#google-docs-2026-mask0_37242_8762)">
<path d="M159.94 184L31.9999 184L31.9999 8.00001L99.9999 8L159.999 68L159.94 184Z" fill="#3186FF"/>
<g filter="url(#google-docs-2026-filter0_f_37242_8762)">
<path d="M43 192H149V70.2271V20H43V192Z" fill="url(#google-docs-2026-paint0_linear_37242_8762)"/>
</g>
</g>
<path d="M154.995 62.9951C152.489 61.1143 149.375 60 146 60H112.8C105.731 60 100 54.2692 100 47.2002V8L154.995 62.9951Z" fill="#76BBFF"/>
<rect x="64.001" y="114" width="64" height="12" rx="6" fill="white"/>
<rect x="64.001" y="143" width="48" height="12" rx="6" fill="white"/>
<defs>
<filter id="google-docs-2026-filter0_f_37242_8762" x="31" y="8" width="130" height="196" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="6" result="effect1_foregroundBlur_37242_8762"/>
</filter>
<linearGradient id="google-docs-2026-paint0_linear_37242_8762" x1="96" y1="59.2839" x2="54.6124" y2="171.338" gradientUnits="userSpaceOnUse">
<stop offset="0.33" stop-color="#3186FF"/>
<stop offset="1" stop-color="#A9A8FF"/>
</linearGradient>
</defs>
</svg>
`})),jt,Mt=e((()=>{jt=`<svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="none" viewBox="0 0 192 192"><path fill="#009954" d="M8 74.6c0-8.943 0-13.415 1.404-16.962a20 20 0 0 1 11.234-11.233C24.185 45 28.656 45 37.6 45h60.8c8.943 0 13.415 0 16.962 1.404a20 20 0 0 1 11.234 11.234C128 61.185 128 65.656 128 74.6v42.8c0 8.943 0 13.415-1.404 16.962a20 20 0 0 1-11.234 11.234C111.815 147 107.343 147 98.4 147H37.6c-8.943 0-13.415 0-16.963-1.404a20 20 0 0 1-11.233-11.234C8 130.815 8 126.343 8 117.4z"/><mask id="google-sheets-2026-a" width="160" height="128" x="24" y="32" maskUnits="userSpaceOnUse" style="mask-type:alpha"><rect width="160" height="128" x="24" y="32" fill="#0ebc5f" rx="20"/></mask><g mask="url(#google-sheets-2026-a)"><path fill="#0ebc5f" d="M24 32h160v128H24z"/><g filter="url(#google-sheets-2026-b)"><rect width="144" height="102" fill="url(#google-sheets-2026-c)" rx="25.6" transform="matrix(1 0 0 -1 8 147)"/></g></g><path stroke="#fff" stroke-linecap="round" stroke-width="12" d="M80 121h84m-20 19V76"/><defs><linearGradient id="google-sheets-2026-c" x1="122.24" x2="20.76" y1="43.31" y2="43.31" gradientUnits="userSpaceOnUse"><stop stop-color="#0ebc5f"/><stop offset=".95" stop-color="#78c9ff"/></linearGradient><filter id="google-sheets-2026-b" width="168" height="126" x="-4" y="33" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_37435_8174" stdDeviation="6"/></filter></defs></svg>`})),Nt,Pt=e((()=>{Nt=`<svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="none" viewBox="0 0 192 192"><path fill="url(#google-slides-2026-a)" d="M12.591 63.318c-2.493-15.262 7.858-29.655 23.12-32.148l96.724-15.8c15.262-2.492 29.655 7.859 32.148 23.12l14.732 90.189c2.493 15.262-7.858 29.655-23.12 32.148l-96.724 15.8c-15.262 2.493-29.655-7.858-32.148-23.12z"/><path fill="url(#google-slides-2026-b)" d="M12 61.6c0-8.943 0-13.415 1.405-16.962a20 20 0 0 1 11.233-11.233C28.185 32 32.656 32 41.6 32h108.8c8.943 0 13.415 0 16.962 1.404a20 20 0 0 1 11.234 11.234C180 48.185 180 52.657 180 61.6v68.8c0 8.943 0 13.415-1.404 16.962a20 20 0 0 1-11.234 11.234C163.815 160 159.343 160 150.4 160H41.6c-8.943 0-13.415 0-16.963-1.404a20 20 0 0 1-11.232-11.234C12 143.815 12 139.343 12 130.4z"/><mask id="google-slides-2026-e" width="168" height="128" x="12" y="32" maskUnits="userSpaceOnUse" style="mask-type:alpha"><path fill="#fec700" d="M12 61.6c0-8.943 0-13.415 1.405-16.962a20 20 0 0 1 11.233-11.233C28.185 32 32.656 32 41.6 32h108.8c8.943 0 13.415 0 16.962 1.404a20 20 0 0 1 11.234 11.234C180 48.185 180 52.657 180 61.6v68.8c0 8.943 0 13.415-1.404 16.962a20 20 0 0 1-11.234 11.234C163.815 160 159.343 160 150.4 160H41.6c-8.943 0-13.415 0-16.963-1.404a20 20 0 0 1-11.232-11.234C12 143.815 12 139.343 12 130.4z"/></mask><g filter="url(#google-slides-2026-c)" mask="url(#google-slides-2026-e)"><path fill="#ffbe00" d="m33.74 191.516 144.396-21.58L153.304 3.781 8.907 25.361z"/><path fill="url(#google-slides-2026-f)" d="m33.74 191.516 144.396-21.58L153.304 3.781 8.907 25.361z"/></g><path fill="#fff" fill-rule="evenodd" d="M148 58a6 6 0 0 1 6 6v64a6 6 0 0 1-6 6H44l-.309-.008A6 6 0 0 1 38 128V64a6 6 0 0 1 5.691-5.992L44 58zm-98 64h92V70H50z" clip-rule="evenodd"/><defs><linearGradient id="google-slides-2026-a" x1="84.07" x2="157.2" y1="23.27" y2="160.82" gradientUnits="userSpaceOnUse"><stop offset=".2" stop-color="#ffdb0f"/><stop offset=".67" stop-color="#ffbe00"/><stop offset=".91" stop-color="#ffa8e3"/></linearGradient><linearGradient id="google-slides-2026-b" x1="96" x2="96" y1="32" y2="160" gradientUnits="userSpaceOnUse"><stop stop-color="#ffbe00"/><stop offset="1" stop-color="#fec700"/></linearGradient><linearGradient id="google-slides-2026-f" x1="108.52" x2="83.96" y1="168.16" y2="25.27" gradientUnits="userSpaceOnUse"><stop offset=".07" stop-color="#fff549"/><stop offset=".78" stop-color="#ffbe00" stop-opacity="0"/></linearGradient><filter id="google-slides-2026-c" width="193.23" height="211.73" x="-3.09" y="-8.22" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_37552_9023" stdDeviation="6"/></filter></defs></svg>`})),Ft,It=e((()=>{Ft=`<svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="none" viewBox="0 0 192 192"><path fill="url(#gmail-2026-a)" d="M146 44h38v110c0 6.627-5.373 12-12 12h-20a6 6 0 0 1-6-6z"/><path fill="#fc413d" d="M46 44H8v110c0 6.627 5.373 12 12 12h20a6 6 0 0 0 6-6z"/><path fill="url(#gmail-2026-b)" d="M39.226 30.456c-8.033-6.752-20.018-5.714-26.77 2.319-6.752 8.032-5.714 20.017 2.319 26.77l76.078 63.949a8 8 0 0 0 10.295 0l76.078-63.95c8.032-6.752 9.07-18.737 2.318-26.77-6.752-8.032-18.737-9.07-26.769-2.318L96 78.18z"/><defs><linearGradient id="gmail-2026-a" x1="165" x2="165" y1="44" y2="166" gradientUnits="userSpaceOnUse"><stop stop-color="#60d673"/><stop offset=".17" stop-color="#42c868"/><stop offset=".39" stop-color="#0ebc5f"/><stop offset=".62" stop-color="#00a9bb"/><stop offset=".86" stop-color="#3c90ff"/><stop offset="1" stop-color="#3186ff"/></linearGradient><linearGradient id="gmail-2026-b" x1="8" x2="184" y1="46.13" y2="46.13" gradientUnits="userSpaceOnUse"><stop offset=".08" stop-color="#ff63a0"/><stop offset=".3" stop-color="#fc413d"/><stop offset=".5" stop-color="#fc413d"/><stop offset=".65" stop-color="#fc413d"/><stop offset=".72" stop-color="#fc5c30"/><stop offset=".86" stop-color="#feb10c"/><stop offset=".91" stop-color="#fec700"/><stop offset=".96" stop-color="#ffdb0f"/></linearGradient></defs></svg>`})),Lt,Rt=e((()=>{Lt=`<svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" viewBox="0 0 192 192" fill="none"><path fill="#bbe2ff" d="M32 36.8C32 20.894 44.894 8 60.8 8h70.4C147.106 8 160 20.894 160 36.8v30.4c0 15.906-12.894 28.8-28.8 28.8H60.8C44.894 96 32 83.106 32 67.2z"/><path fill="#3c90ff" d="M19.867 49.392C17.818 33.82 29.94 20 45.645 20h100.71c15.706 0 27.827 13.82 25.778 29.392L166 96l6.133 46.608C174.182 158.18 162.061 172 146.355 172H45.645c-15.706 0-27.827-13.82-25.778-29.392L26 96z"/><mask id="google-calendar-2026-a" width="154" height="152" x="19" y="20" maskUnits="userSpaceOnUse" style="mask-type:alpha"><path fill="#3c90ff" d="M19.867 49.392C17.818 33.82 29.94 20 45.645 20h100.71c15.706 0 27.827 13.82 25.778 29.392L166 96l6.133 46.608C174.182 158.18 162.061 172 146.355 172H45.645c-15.706 0-27.827-13.82-25.778-29.392L26 96z"/></mask><g mask="url(#google-calendar-2026-a)"><path fill="url(#google-calendar-2026-b)" d="M0 0h166v76H0z" transform="matrix(1 0 0 -1 13 172)"/></g><mask id="google-calendar-2026-c" width="154" height="152" x="19" y="20" maskUnits="userSpaceOnUse" style="mask-type:alpha"><path fill="#3186ff" d="M19.867 49.392C17.818 33.82 29.94 20 45.645 20h100.71c15.706 0 27.827 13.82 25.778 29.392L166 96l6.133 46.608C174.182 158.18 162.061 172 146.355 172H45.645c-15.706 0-27.827-13.82-25.778-29.392L26 96z"/></mask><g mask="url(#google-calendar-2026-c)"><path fill="url(#google-calendar-2026-d)" d="M32 27.2C32 16.596 40.596 8 51.2 8h89.6c10.604 0 19.2 8.596 19.2 19.2V96H32z" filter="url(#google-calendar-2026-e)"/></g><path fill="#fff" d="M75.353 133.336q-6.282 0-10.777-2.043t-7.61-5.465q-3.065-3.474-4.342-6.793T51.603 115a2.07 2.07 0 0 1 1.021-1.124l5.67-2.247q.714-.357 1.43-.102.714.204 1.685 2.349 1.022 2.145 2.86 4.546a14.3 14.3 0 0 0 4.495 3.728q2.606 1.328 6.435 1.328 6.18 0 9.807-3.575 3.677-3.575 3.677-9.091 0-5.976-3.882-9.194-3.881-3.269-10.266-3.269h-5.362a1.9 1.9 0 0 1-1.328-.51q-.51-.562-.511-1.277v-5.465q0-.767.51-1.277a1.82 1.82 0 0 1 1.329-.562h4.647q5.721 0 9.194-3.116t3.473-8.07q0-4.902-3.116-7.916t-8.58-3.014q-3.065 0-5.312 1.022a11.5 11.5 0 0 0-3.882 2.86 22.7 22.7 0 0 0-2.809 3.78q-1.174 1.941-1.89 2.145-.714.153-1.379-.255l-5.363-2.605q-.664-.358-.868-1.124t1.226-3.575q1.481-2.86 4.494-5.823a21 21 0 0 1 7.049-4.597q4.035-1.635 9.398-1.634 9.96 0 15.782 5.26 5.823 5.21 5.823 13.791 0 5.925-2.86 10.266-2.81 4.34-7.968 6.13v.204q6.231 1.838 9.806 6.741 3.627 4.853 3.626 11.594 0 9.654-6.742 15.834-6.74 6.18-17.57 6.18zm51.25-1.175q-.868 0-1.533-.664a2.25 2.25 0 0 1-.612-1.583V73.118l-11.492 8.274q-.614.46-1.431.307a1.96 1.96 0 0 1-1.225-.766l-3.32-4.7a1.98 1.98 0 0 1-.358-1.43q.153-.816.817-1.276l20.379-14.557q.256-.204.562-.306.307-.153.715-.153h4.291q.868 0 1.379.613.562.56.562 1.43v69.36q0 .92-.664 1.583a2 2 0 0 1-1.533.664z"/><defs><linearGradient id="google-calendar-2026-b" x1="83" x2="83" y1="76" gradientUnits="userSpaceOnUse"><stop stop-color="#4fa0ff"/><stop offset="1" stop-color="#3186ff"/></linearGradient><linearGradient id="google-calendar-2026-d" x1="89.06" x2="89.06" y1="21.75" y2="96.39" gradientUnits="userSpaceOnUse"><stop stop-color="#a9a8ff"/><stop offset=".8" stop-color="#3c90ff"/></linearGradient><filter id="google-calendar-2026-e" width="152" height="112" x="20" y="-4" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_37330_7673" stdDeviation="6"/></filter></defs></svg>`})),zt,Bt=e((()=>{zt=`<svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" viewBox="0 0 192 192" fill="none"><mask id="google-drive-2026-a" width="168" height="154" x="12" y="18" maskUnits="userSpaceOnUse" style="mask-type:alpha"><path fill="#b43333" d="M63.09 37c14.626-25.333 51.193-25.334 65.819 0l45.033 78c14.626 25.334-3.657 57.001-32.91 57.001H50.967c-29.253 0-47.536-31.667-32.91-57.001z"/></mask><g mask="url(#google-drive-2026-a)"><path fill="url(#google-drive-2026-b)" d="M206.905 172.02h-91.888l-19.015-32.934 45.944-79.578z"/><path fill="url(#google-drive-2026-c)" d="M-14.919 172.006 50.04 59.494v.002L31.032 92.422h38.02L115 172.004l-129.918.001z"/><path fill="url(#google-drive-2026-d)" d="M96.007-20.085 141.954 59.5l-19.011 32.928H31.048z"/></g><defs><linearGradient id="google-drive-2026-b" x1="193.6" x2="103.09" y1="165.6" y2="111.21" gradientUnits="userSpaceOnUse"><stop offset=".09" stop-color="#ffe921"/><stop offset="1" stop-color="#fec700"/></linearGradient><linearGradient id="google-drive-2026-c" x1="114.4" x2="15.53" y1="181.61" y2="121.8" gradientUnits="userSpaceOnUse"><stop offset=".15" stop-color="#a9a8ff"/><stop offset=".33" stop-color="#6d97ff"/><stop offset=".48" stop-color="#3186ff"/></linearGradient><linearGradient id="google-drive-2026-d" x1="128.88" x2="28.7" y1="37.88" y2="84.64" gradientUnits="userSpaceOnUse"><stop offset=".55" stop-color="#0ebc5f"/><stop offset=".85" stop-color="#78c9ff"/></linearGradient></defs></svg>`}));function Vt(e){let t=[e.name,e.id,e.interface?.displayName??``].map(Ut);for(let e of t){let t=Wt(e);if(t!=null)return t}return null}function Ht(e){let t=e.trim().replace(/^<svg\b[^>]*>/u,`<svg x="24" y="24" width="144" height="144" viewBox="0 0 192 192">`);return`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" viewBox="0 0 192 192"><rect width="192" height="192" rx="40" fill="#fff"/>${t}</svg>`)}`}function Ut(e){return(e.split(`@`)[0]??``).trim().toLowerCase().split(/[^a-z0-9]+/g).filter(e=>e.length>0).join(`-`)}function Wt(e){let t=e.replace(/^connector-/u,``);return Gt[e]??Gt[t]??Gt[t.replace(/-mcp-server$/u,``)]??null}var Gt,Kt=e((()=>{At(),Mt(),Pt(),It(),Rt(),Bt(),Gt={gmail:Ht(Ft),"google-calendar":Ht(Lt),"google-docs":Ht(kt),"google-drive":Ht(zt),"google-sheets":Ht(jt),"google-slides":Ht(Nt)}}));function qt(e){return e!==`chatgpt`&&e!==`apikey`&&e!==`amazonBedrock`}var Jt=e((()=>{})),Yt,Xt=e((()=>{Yt=`<svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  fill="none"
  viewBox="0 0 24 24"
>
  <path
    fill="#EBEBEB"
    d="M6 21c-.775 0-1.467-.167-2.075-.5A3.66 3.66 0 0 1 2.5 19.075c-.333-.608-.5-1.3-.5-2.075V7c0-.775.167-1.467.5-2.075a3.575 3.575 0 0 1 1.425-1.412C4.533 3.17 5.225 3 6 3h12c.775 0 1.467.17 2.075.513.608.333 1.08.804 1.413 1.412.341.608.512 1.3.512 2.075v10c0 .775-.17 1.467-.512 2.075a3.576 3.576 0 0 1-1.413 1.425c-.608.333-1.3.5-2.075.5H6Z"
  />
  <path
    fill="#2E9EFF"
    d="M18 3c.775 0 1.467.171 2.075.513a3.492 3.492 0 0 1 1.412 1.412C21.83 5.533 22 6.225 22 7v2H2V7c0-.775.167-1.467.5-2.075a3.575 3.575 0 0 1 1.425-1.412C4.533 3.17 5.225 3 6 3h12Z"
  />
  <path
    fill="#77C0FF"
    d="M8.287 6.713c.2.191.438.287.713.287a.953.953 0 0 0 .7-.287c.2-.2.3-.438.3-.713 0-.275-.1-.508-.3-.7A.933.933 0 0 0 9 5c-.275 0-.512.1-.713.3A.953.953 0 0 0 8 6c0 .275.096.513.287.713Zm3 0c.2.191.438.287.713.287a.953.953 0 0 0 .7-.287c.2-.2.3-.438.3-.713 0-.275-.1-.508-.3-.7A.933.933 0 0 0 12 5c-.275 0-.512.1-.713.3A.953.953 0 0 0 11 6c0 .275.096.513.287.713Zm-6 0c.2.191.438.287.713.287a.953.953 0 0 0 .7-.287c.2-.2.3-.438.3-.713 0-.275-.1-.508-.3-.7A.933.933 0 0 0 6 5c-.275 0-.513.1-.713.3A.953.953 0 0 0 5 6c0 .275.096.513.287.713Z"
  />
</svg>
`})),Zt,Qt=e((()=>{Zt=`<svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  fill="none"
  viewBox="0 0 24 24"
>
  <path
    fill="#FFD400"
    d="M10.56 11.133v11.939h-.035a2.318 2.318 0 0 1-1.288-.412l-4.175-2.85a2.555 2.555 0 0 1-.787-.876A2.392 2.392 0 0 1 4 17.81V7.96c0-.374.08-.725.242-1.052l6.318 4.226Z"
  />
  <path
    fill="#F75858"
    d="M19.725 5.447A2.2 2.2 0 0 1 20 6.522v9.862c0 .409-.104.796-.313 1.163-.2.366-.48.658-.837.875l-7 4.3c-.399.243-.828.36-1.29.35V11.121l9.144-5.711.02.037Z"
  />
  <path
    fill="#8166E1"
    d="M20 16.384c0 .409-.104.796-.313 1.163-.2.366-.48.658-.837.875l-7 4.3c-.399.243-.828.36-1.29.35v-5.75l9.144-5.71c.01.01.296-.175.296-.175v4.947Z"
  />
  <path
    fill="#BDAAFF"
    d="M10.56 17.335v5.737h-.035a2.318 2.318 0 0 1-1.288-.412l-4.175-2.85a2.555 2.555 0 0 1-.787-.876A2.392 2.392 0 0 1 4 17.81v-4.84l6.56 4.366Z"
  />
  <path
    fill="#FFA43D"
    d="M4.242 6.907a2.285 2.285 0 0 1 .896-.985L12.1 1.646c.4-.25.834-.37 1.3-.362.467 0 .896.132 1.287.399l4.288 2.925c.312.216.554.484.728.8L10.56 11.12v.012L4.242 6.907Z"
  />
</svg>
`})),$t,en=e((()=>{$t=`<svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  fill="none"
  viewBox="0 0 24 24"
>
  <path
    fill="#DC7157"
    d="M12 20.962c-.311 0-.644-.089-1-.289-2.433-1.355-5.367-1.666-7.8-1.122-1.4.311-2.2-.166-2.2-1.6V6.407c0-.911.433-1.69 1.5-2.067 3.122-1.089 7.211-.444 9.5 1.545 2.289-1.99 6.378-2.634 9.5-1.545 1.067.378 1.5 1.156 1.5 2.067V17.95c0 1.433-.8 1.911-2.2 1.6-2.433-.544-5.367-.233-7.8 1.122-.356.2-.689.29-1 .29Z"
  />
  <path
    fill="#EFEBDC"
    d="M3.381 3.403c2.962-1.043 7.07.074 8.623 2.479v12.876c-2.42-1.543-5.62-1.874-8.934-1.323V3.855c0-.202.121-.385.311-.452Z"
  />
  <path
    fill="#FBF2DF"
    d="M20.626 3.403c-2.962-1.043-7.07.074-8.622 2.479v12.876c2.42-1.543 5.62-1.874 8.934-1.323V3.855a.475.475 0 0 0-.312-.452Z"
  />
</svg>
`})),tn,nn=e((()=>{tn=`<svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  fill="none"
  viewBox="0 0 24 24"
>
  <path
    fill="#7DCC60"
    d="M12 22a9.804 9.804 0 0 1-5.013-1.337 10.084 10.084 0 0 1-3.65-3.65A9.812 9.812 0 0 1 2 12c0-1.808.446-3.48 1.337-5.013a9.987 9.987 0 0 1 3.65-3.637A9.727 9.727 0 0 1 12 2c1.808 0 3.48.45 5.012 1.35a9.891 9.891 0 0 1 3.638 3.637A9.727 9.727 0 0 1 22 12c0 1.808-.45 3.48-1.35 5.012a9.987 9.987 0 0 1-3.637 3.65C15.478 21.555 13.807 22 12 22Z"
  />
  <path
    fill="#fff"
    d="M17 8.462c.167.334.12.68-.137 1.038L12.15 16c-.292.4-.638.617-1.037.65-.4.033-.784-.13-1.15-.487l-2.638-2.55c-.317-.3-.425-.63-.325-.988a.988.988 0 0 1 .687-.7c.359-.117.696-.025 1.013.275l2.213 2.125 4.337-6.013c.258-.358.57-.508.938-.45.375.059.645.259.812.6Z"
  />
</svg>
`})),rn,an=e((()=>{rn=`<svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  fill="none"
  viewBox="0 0 24 24"
>
  <path
    fill="#BEBEBE"
    d="M7 21c-.725 0-1.396-.18-2.013-.538a4.03 4.03 0 0 1-1.45-1.45A3.936 3.936 0 0 1 3 17V7c0-.725.18-1.392.538-2a4 4 0 0 1 1.45-1.462A3.936 3.936 0 0 1 7 3h10c.725 0 1.392.18 2 .538A3.971 3.971 0 0 1 20.462 5 3.87 3.87 0 0 1 21 7v10c0 .725-.18 1.396-.538 2.012A4 4 0 0 1 19 20.462 3.87 3.87 0 0 1 17 21H7Z"
  />
  <path
    fill="#9B9B9B"
    d="M8.294 18.402A7.183 7.183 0 0 0 12 19.4c1.34 0 2.575-.333 3.707-.998a7.466 7.466 0 0 0 2.695-2.696A7.184 7.184 0 0 0 19.4 12c0-1.34-.333-2.575-.998-3.707a7.466 7.466 0 0 0-2.696-2.695A7.184 7.184 0 0 0 12 4.6a7.18 7.18 0 0 0-3.706.998 7.466 7.466 0 0 0-2.696 2.696A7.184 7.184 0 0 0 4.6 12c0 1.34.333 2.575.998 3.707a7.466 7.466 0 0 0 2.696 2.695Z"
  />
  <path
    fill="#F4F4F4"
    d="M14.902 7.977a.916.916 0 0 1 1.121 1.121l-1.308 4.76c-.066.227-.169.41-.308.549-.14.14-.322.242-.55.308l-4.759 1.308a.916.916 0 0 1-1.121-1.121l1.308-4.76c.066-.227.169-.41.308-.549.14-.14.322-.242.55-.308l4.759-1.308Z"
  />
  <path
    fill="#F75858"
    d="m9.593 9.593 4.814 4.814c-.14.14-.322.242-.55.308l-4.759 1.308a.915.915 0 0 1-1.121-1.121l1.308-4.76c.066-.227.168-.41.308-.549Z"
  />
  <path
    fill="#EBEBEB"
    d="M6.907 12a.72.72 0 0 0-.72-.72H4.492a.72.72 0 0 0 0 1.44h1.697a.72.72 0 0 0 .719-.72Zm13.323 0a.72.72 0 0 0-.72-.72h-1.696a.72.72 0 0 0 0 1.44h1.697a.72.72 0 0 0 .719-.72ZM12 17.093a.72.72 0 0 0-.72.72v1.697a.72.72 0 0 0 1.44 0v-1.697a.72.72 0 0 0-.72-.72ZM12 3.77a.72.72 0 0 0-.72.72v1.697a.72.72 0 0 0 1.44 0V4.49a.72.72 0 0 0-.72-.72Z"
  />
</svg>
`})),on,sn=e((()=>{on=`<svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  fill="none"
  viewBox="0 0 24 24"
>
  <path
    fill="#EBEBEB"
    d="M18 3c.775 0 1.467.171 2.075.513a3.493 3.493 0 0 1 1.412 1.412C21.83 5.533 22 6.225 22 7v10c0 .775-.171 1.467-.513 2.075a3.575 3.575 0 0 1-1.412 1.425c-.608.333-1.3.5-2.075.5H6c-.775 0-1.467-.167-2.075-.5A3.66 3.66 0 0 1 2.5 19.075c-.333-.608-.5-1.3-.5-2.075V7c0-.775.167-1.467.5-2.075a3.575 3.575 0 0 1 1.425-1.412C4.533 3.17 5.225 3 6 3h12Z"
  />
  <rect width="8" height="5" x="5" y="6" fill="#B7B7B7" rx="1" />
  <rect width="4" height="5" x="15" y="6" fill="#B7B7B7" rx="1" />
  <rect width="14" height="5" x="5.014" y="13.081" fill="#B7B7B7" rx="1" />
</svg>
`})),cn,ln=e((()=>{cn=`<svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  fill="none"
  viewBox="0 0 24 24"
>
  <path
    fill="#EBEBEB"
    d="M13 2.594c.267 0 .538.074.813.224.274.15.583.393.924.726l4.95 4.9c.542.541.813 1.091.813 1.65v7.45c0 .725-.179 1.396-.537 2.013a4.001 4.001 0 0 1-1.463 1.449 3.87 3.87 0 0 1-2 .538h-9c-.725 0-1.396-.18-2.013-.538a4.031 4.031 0 0 1-1.45-1.45 3.937 3.937 0 0 1-.537-2.012V6.594c0-.725.179-1.392.537-2a4.002 4.002 0 0 1 1.45-1.463A3.936 3.936 0 0 1 7.5 2.594H13Z"
  />
  <path
    fill="#F5F5F5"
    d="M13 2.594c.267 0 .537.075.813.225.274.15.583.391.925.725l4.95 4.9c.541.541.812 1.091.812 1.65h-4.787c-.834 0-1.496-.242-1.988-.725C13.242 8.877 13 8.215 13 7.38V2.594Z"
  />
</svg>
`})),un,dn=e((()=>{un=`<svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  fill="none"
  viewBox="0 0 24 24"
>
  <path
    fill="#DFDFDF"
    d="M13 2.594c.267 0 .538.074.813.224.274.15.583.393.924.726l4.95 4.9c.542.541.813 1.091.813 1.65v7.45c0 .725-.179 1.396-.537 2.013a4.001 4.001 0 0 1-1.463 1.449 3.87 3.87 0 0 1-2 .538h-9c-.725 0-1.396-.18-2.013-.538a4.031 4.031 0 0 1-1.45-1.45 3.937 3.937 0 0 1-.537-2.012V6.594c0-.725.179-1.392.537-2a4.002 4.002 0 0 1 1.45-1.463A3.936 3.936 0 0 1 7.5 2.594H13Z"
  />
  <path
    fill="#00C2A2"
    d="M9.818 8.606c-.25.142-.525.213-.825.213-.3 0-.58-.071-.838-.213-.25-.15-.45-.35-.6-.6a1.714 1.714 0 0 1-.212-.837c0-.3.07-.575.213-.825.15-.259.35-.459.6-.6a1.64 1.64 0 0 1 .837-.225c.3 0 .575.075.825.225.258.141.458.341.6.6.15.25.225.525.225.825 0 .3-.075.579-.225.837a1.6 1.6 0 0 1-.6.6Zm1.787 3.325c-.091.092-.22.138-.387.138h-4.45c-.167 0-.296-.046-.388-.138-.091-.091-.12-.22-.087-.387.075-.425.242-.804.5-1.138a2.729 2.729 0 0 1 2.2-1.088 2.729 2.729 0 0 1 2.2 1.088c.258.334.425.713.5 1.138.033.166.004.296-.088.387Z"
  />
  <path
    fill="#FDFDFD"
    d="M13 2.594c.267 0 .537.075.813.225.274.15.583.391.925.725l4.95 4.9c.541.541.812 1.091.812 1.65h-4.787c-.834 0-1.496-.242-1.988-.725C13.242 8.877 13 8.215 13 7.38V2.594Z"
  />
  <path
    fill="#9B9B9B"
    d="M17 14.005a.72.72 0 0 1 0 1.44H7a.72.72 0 0 1 0-1.44h10Zm-3.28 3.715A.72.72 0 0 0 13 17H7a.72.72 0 0 0 0 1.44h6a.72.72 0 0 0 .72-.72Z"
  />
</svg>
`})),fn,pn=e((()=>{fn=`<svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  fill="none"
  viewBox="0 0 24 24"
>
  <path
    fill="#2E9EFF"
    d="M22 9v4H2V7c0-2.35 1.65-4 4-4h2.637c2.988 0 2.75 2 4.613 2H18c2.35 0 4 1.65 4 4Z"
  />
  <path
    fill="#68C4FF"
    d="M18 21c2.35 0 4-1.65 4-4v-5a3 3 0 0 0-3-3H5a3 3 0 0 0-3 3v5c0 2.35 1.65 4 4 4h12Z"
  />
</svg>
`})),mn,hn=e((()=>{mn=`<svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  fill="none"
  viewBox="0 0 24 24"
>
  <circle cx="12" cy="12" r="9" fill="#CDF3FF" />
  <path
    fill="#41CEF9"
    fill-rule="evenodd"
    d="M12 2c5.522 0 10 4.478 10 10s-4.478 10-10 10S2 17.522 2 12 6.478 2 12 2ZM9.172 13c.146 4.477 1.284 7 2.828 7 1.544 0 2.682-2.523 2.828-7H9.172Zm-5.108 0a7.994 7.994 0 0 0 4.313 6.134C7.686 17.622 7.261 15.549 7.174 13h-3.11Zm12.762 0c-.087 2.55-.512 4.622-1.204 6.134A7.994 7.994 0 0 0 19.936 13h-3.11Zm-8.45-8.135A7.995 7.995 0 0 0 4.065 11h3.11c.087-2.55.511-4.623 1.203-6.135ZM12.001 4c-1.544 0-2.682 2.523-2.828 7h5.656C14.682 6.523 13.544 4 12 4Zm3.622.865C16.314 6.377 16.74 8.45 16.826 11h3.11a7.995 7.995 0 0 0-4.314-6.135Z"
    clip-rule="evenodd"
  />
</svg>
`})),gn,_n=e((()=>{gn=`<svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  fill="none"
  viewBox="0 0 24 24"
>
  <path
    fill="#3C5CD8"
    d="M13 10.5h4.5c.708 0 1.325.142 1.85.425.533.283.942.692 1.225 1.225.283.525.425 1.142.425 1.85v2h-2v-2c0-.467-.134-.833-.4-1.1-.267-.266-.633-.4-1.1-.4H13V16h-2v-3.5H6.5c-.458 0-.825.134-1.1.4-.266.267-.4.633-.4 1.1v2H3v-2c0-.708.142-1.325.425-1.85a2.916 2.916 0 0 1 1.213-1.225c.533-.283 1.154-.425 1.862-.425H11V8h2v2.5Z"
  />
  <path
    fill="#6582F1"
    d="M9.012 2.513C8.671 2.854 8.5 3.35 8.5 4v2.5c0 .65.17 1.146.512 1.487.342.342.838.513 1.488.513h3c.65 0 1.146-.17 1.488-.513.341-.341.512-.837.512-1.487V4c0-.65-.17-1.146-.512-1.487C14.646 2.17 14.15 2 13.5 2h-3c-.65 0-1.146.17-1.488.513Zm.011 13.499c-.341.342-.512.838-.512 1.488V20c0 .65.17 1.146.512 1.488.342.341.838.512 1.488.512h3c.65 0 1.146-.17 1.487-.512.342-.342.513-.838.513-1.488v-2.5c0-.65-.171-1.146-.513-1.488-.341-.341-.837-.512-1.487-.512h-3c-.65 0-1.146.17-1.488.512Zm8 0c-.341.342-.512.838-.512 1.488V20c0 .65.17 1.146.512 1.488.342.341.838.512 1.488.512h3c.65 0 1.146-.17 1.487-.512.342-.342.513-.838.513-1.488v-2.5c0-.65-.171-1.146-.513-1.488-.341-.341-.837-.512-1.487-.512h-3c-.65 0-1.146.17-1.488.512Zm-16 0c-.341.342-.512.838-.512 1.488V20c0 .65.17 1.146.512 1.488.342.341.838.512 1.488.512h3c.65 0 1.146-.17 1.487-.512.342-.342.513-.838.513-1.488v-2.5c0-.65-.171-1.146-.513-1.488-.341-.341-.837-.512-1.487-.512h-3c-.65 0-1.146.17-1.488.512Z"
  />
</svg>
`})),vn,yn=e((()=>{vn=`<svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  fill="none"
  viewBox="0 0 24 24"
>
  <path
    fill="#FFD500"
    d="M12 1.62c4.566 0 7.777 3.256 7.777 7.556 0 4.166-3.244 5.722-3.244 7.955v.7l-.003.174H7.47a6.237 6.237 0 0 1-.004-.174v-.7c0-2.233-3.244-3.789-3.244-7.955 0-4.3 3.21-7.556 7.778-7.556Z"
  />
  <path
    fill="#BDBBBB"
    d="M16.53 18.005c-.048 2.655-1.781 4.317-4.53 4.317-2.75 0-4.483-1.662-4.532-4.317h9.063Z"
  />
  <path
    fill="#FFEFA0"
    d="M10.299 17.51h1v-7.19c0-1.098-.911-2.008-2.033-2.008-1.112 0-2.023.91-2.023 2.008 0 1.11.911 2.03 2.023 2.03h5.468c1.112 0 2.023-.92 2.023-2.03a2.026 2.026 0 0 0-2.023-2.008c-1.122 0-2.033.91-2.033 2.008v7.19h1v-7.19c0-.565.467-1.031 1.033-1.031a1.03 1.03 0 0 1 1.034 1.031c0 .577-.456 1.032-1.034 1.032H9.266a1.024 1.024 0 0 1-1.034-1.032 1.03 1.03 0 0 1 1.034-1.03c.566 0 1.033.466 1.033 1.031v7.19Z"
  />
  <path
    fill="#D9D9D9"
    d="M16.533 17.13v.701A6.254 6.254 0 0 1 16.425 19h-8.85a5.54 5.54 0 0 1-.108-1.169v-.7c0-.039-.004-.077-.006-.115h9.078c-.002.038-.006.076-.006.115Z"
  />
</svg>
`})),bn,xn=e((()=>{bn=`<svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  fill="none"
  viewBox="0 0 24 24"
>
  <path
    fill="#43D0FB"
    d="M10.84 19.23c-4.63 0-8.39-3.76-8.39-8.39 0-4.63 3.76-8.39 8.39-8.39 4.63 0 8.39 3.76 8.39 8.39 0 4.63-3.76 8.39-8.39 8.39Zm10.3 1.92c-.4.39-1.03.4-1.42 0l-3.99-4 1.41-1.41 4 3.99c.4.39.39 1.02 0 1.42Z"
  />
  <path
    fill="#CDF3FF"
    d="M17.23 10.84c0 3.53-2.86 6.39-6.39 6.39s-6.39-2.86-6.39-6.39 2.86-6.39 6.39-6.39 6.39 2.86 6.39 6.39Z"
  />
  <path
    fill="#1BA5CF"
    d="m21.35 19.58-3.77-3.77c-.5.67-1.09 1.27-1.77 1.77l3.77 3.77c.49.49 1.28.49 1.77 0s.49-1.28 0-1.77Z"
  />
</svg>
`})),Sn,Cn=e((()=>{Sn=`<svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  fill="none"
  viewBox="0 0 24 24"
>
  <path
    fill="#fff"
    d="M9.012 17.15c.917.533 1.913.8 2.988.8a5.771 5.771 0 0 0 2.975-.8 5.978 5.978 0 0 0 2.162-2.162c.534-.917.8-1.913.8-2.988a5.771 5.771 0 0 0-.8-2.975 5.978 5.978 0 0 0-2.162-2.163 5.77 5.77 0 0 0-2.975-.8c-1.075 0-2.07.267-2.988.8A5.978 5.978 0 0 0 6.85 9.025 5.77 5.77 0 0 0 6.05 12c0 1.075.267 2.07.8 2.988a5.978 5.978 0 0 0 2.162 2.162Z"
  />
  <path fill="#fff" d="M13 21V3h-2v18h2Z" />
  <path fill="#fff" d="M21 16.887 3 9.25V7.075l18 7.65v2.162Z" />
  <path
    fill="#FFC93C"
    d="M21 16.888V17c0 .775-.171 1.467-.513 2.075a3.576 3.576 0 0 1-1.412 1.425c-.608.333-1.3.5-2.075.5h-4v-3.135a5.714 5.714 0 0 0 1.975-.715 5.965 5.965 0 0 0 2.032-1.957L21 16.888Z"
  />
  <path
    fill="#FF8BC9"
    d="m3 9.25 3.212 1.362A5.979 5.979 0 0 0 6.05 12c0 1.075.266 2.07.8 2.987a5.981 5.981 0 0 0 2.163 2.163c.625.364 1.288.6 1.987.716V21H7c-.775 0-1.467-.167-2.075-.5A3.66 3.66 0 0 1 3.5 19.075c-.333-.608-.5-1.3-.5-2.075V9.25Z"
  />
  <path
    fill="#7DCC60"
    d="M11 6.146c-.7.115-1.362.352-1.987.716a5.966 5.966 0 0 0-2.008 1.915L3 7.075V7c0-.775.167-1.467.5-2.075a3.575 3.575 0 0 1 1.425-1.412C5.533 3.17 6.225 3 7 3h4v3.146ZM17 3c.775 0 1.467.171 2.075.513a3.493 3.493 0 0 1 1.412 1.412C20.83 5.533 21 6.225 21 7v7.725l-3.218-1.368c.101-.437.155-.89.155-1.357a5.77 5.77 0 0 0-.8-2.975 5.981 5.981 0 0 0-2.162-2.163A5.716 5.716 0 0 0 13 6.146V3h4Z"
  />
  <path
    fill="#2E9EFF"
    d="M10.012 15.425A3.92 3.92 0 0 0 12 15.95a3.85 3.85 0 0 0 1.975-.525 3.993 3.993 0 0 0 1.425-1.438c.358-.608.537-1.27.537-1.987a3.78 3.78 0 0 0-.537-1.975A3.895 3.895 0 0 0 13.975 8.6 3.78 3.78 0 0 0 12 8.063a3.85 3.85 0 0 0-1.988.537 3.99 3.99 0 0 0-1.437 1.425A3.85 3.85 0 0 0 8.05 12c0 .717.175 1.38.525 1.988a4.09 4.09 0 0 0 1.438 1.437Z"
  />
</svg>
`})),wn,Tn=e((()=>{wn=`<svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  fill="none"
  viewBox="0 0 24 24"
>
  <path
    fill="#EBEBEB"
    fill-rule="evenodd"
    d="M7.759 3h8.482c.805 0 1.47 0 2.01.044.563.046 1.08.145 1.565.392a4 4 0 0 1 1.748 1.748c.247.485.346 1.002.392 1.564C22 7.29 22 7.954 22 8.758v6.483c0 .805 0 1.47-.044 2.01-.046.563-.145 1.08-.392 1.565a4 4 0 0 1-1.748 1.748c-.485.247-1.002.346-1.564.392-.541.044-1.206.044-2.01.044H7.758c-.805 0-1.47 0-2.01-.044-.563-.046-1.08-.145-1.565-.392a4 4 0 0 1-1.748-1.748c-.247-.485-.346-1.002-.392-1.564C2 16.71 2 16.046 2 15.242V8.758c0-.805 0-1.47.044-2.01.046-.563.145-1.08.392-1.565a4 4 0 0 1 1.748-1.748c.485-.247 1.002-.346 1.564-.392C6.29 3 6.954 3 7.758 3Z"
    clip-rule="evenodd"
  />
  <path
    fill="#B7B7B7"
    d="M13.5 8a1 1 0 0 1 1-1H17a1 1 0 1 1 0 2h-2.5a1 1 0 0 1-1-1Zm0 4a1 1 0 0 1 1-1H17a1 1 0 1 1 0 2h-2.5a1 1 0 0 1-1-1Zm-7.502 4a1 1 0 0 1 1-1h10a1 1 0 1 1 0 2h-10a1 1 0 0 1-1-1Z"
  />
  <path
    fill="#9B9B9B"
    d="M6 8a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V8Z"
  />
</svg>
`})),En,Dn=e((()=>{En=`<svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  fill="none"
  viewBox="0 0 24 24"
>
  <path
    fill="#9B9B9B"
    d="M12 22.033c-3.933 0-7.033-3.1-7.033-7.033V8.944c0-.555.444-1 1-1 .555 0 1 .445 1 1v6.045c0 2.822 2.21 5.044 5.033 5.044 2.822 0 5.033-2.21 5.033-5.033V6.989a2.997 2.997 0 0 0-3.022-3.022 2.997 2.997 0 0 0-3.022 3.022v7.989A1 1 0 0 0 12 15.988a1 1 0 0 0 1.011-1.01V8.944c0-.555.445-1 1-1 .556 0 1 .445 1 1v6.034A2.979 2.979 0 0 1 12 17.988a2.979 2.979 0 0 1-3.011-3.01v-7.99c0-2.81 2.211-5.021 5.022-5.021 2.811 0 5.022 2.21 5.022 5.022V15c0 3.933-3.1 7.033-7.033 7.033Z"
  />
</svg>
`})),On,kn=e((()=>{On=`<svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  fill="none"
  viewBox="0 0 24 24"
>
  <path
    fill="#FEBD08"
    d="M19.58 4.39c-1.53-1.52-3.9-1.5-5.4 0l-8.91 8.94c-1.01 1.01-1.42 1.59-1.67 2.93l-.53 3.3c-.18.91.44 1.53 1.37 1.37l3.31-.54c1.32-.21 1.9-.63 2.91-1.64l8.92-8.92c1.52-1.52 1.54-3.89 0-5.42v-.02Z"
  />
  <path
    fill="#FF928C"
    d="M19.58 9.82c1.52-1.52 1.54-3.89 0-5.42-1.53-1.52-3.9-1.5-5.4 0l-.41.41 5.41 5.41.4-.4Z"
  />
  <path
    fill="#D9D9D9"
    d="m13.77 4.813-1.415 1.414 5.41 5.41 1.414-1.415-5.41-5.409Z"
  />
  <path
    fill="#fff"
    d="m12.36 6.23-7.09 7.11c-1.01 1.01-1.42 1.59-1.67 2.93l-.53 3.3c-.09.45.02.83.26 1.08L15.05 8.93l-2.69-2.7Z"
    opacity=".5"
  />
  <path
    fill="#FFDDBC"
    d="M4.6 14.05c-.54.64-.81 1.22-1 2.21l-.09.55 3.67 3.67.57-.09c.99-.16 1.56-.43 2.2-.98L4.6 14.05Z"
  />
  <path
    fill="#4D4D4D"
    d="m3.51 16.81-.44 2.75c-.18.91.44 1.53 1.37 1.37l2.74-.45-3.67-3.67Z"
  />
</svg>
`})),An,jn=e((()=>{An=`<svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  fill="none"
  viewBox="0 0 24 24"
>
  <path
    fill="#2E9EFF"
    d="M12.725 20.288c-.367.716-.842 1.166-1.425 1.35-.583.191-1.15.12-1.7-.213-.55-.325-.954-.846-1.213-1.563L3.787 6.95c-.175-.492-.216-.958-.124-1.4.091-.45.291-.83.6-1.137a2.187 2.187 0 0 1 1.137-.6c.45-.092.92-.05 1.412.125l12.913 4.6c.717.258 1.237.662 1.563 1.212.333.542.404 1.104.212 1.688-.183.583-.633 1.058-1.35 1.425l-4.925 2.512-2.5 4.913Z"
  />
</svg>
`})),Mn,Nn=e((()=>{Mn=`<svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  fill="none"
  viewBox="0 0 24 24"
>
  <path
    fill="#FFD400"
    d="M12 12v9H7a3.87 3.87 0 0 1-2-.537 4.003 4.003 0 0 1-1.463-1.45A3.936 3.936 0 0 1 3 17v-5h9Z"
  />
  <path
    fill="#FFA43D"
    d="M12 12H9.605a2.167 2.167 0 1 1-4.232 0H3V7c0-.725.179-1.392.537-2a4.002 4.002 0 0 1 1.45-1.463A3.936 3.936 0 0 1 7 3h5v9Z"
  />
  <path
    fill="#F75858"
    d="M12 12V9.605a2.167 2.167 0 1 1 0-4.232V3h5a3.87 3.87 0 0 1 2 .537 4.002 4.002 0 0 1 1.463 1.45c.359.617.538 1.288.538 2.013v5h-9Z"
  />
  <path
    fill="#FF8082"
    d="M12 12h2.395a2.167 2.167 0 1 1 4.232 0H21v5a3.87 3.87 0 0 1-.537 2 4.002 4.002 0 0 1-1.45 1.463A3.937 3.937 0 0 1 17 21h-5v-9Z"
  />
  <circle
    cx="12.464"
    cy="16.5"
    r="2.167"
    fill="#FFC93C"
    transform="rotate(-90 12.464 16.5)"
  />
</svg>
`})),Pn,Fn=e((()=>{Pn=`<svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  fill="none"
  viewBox="0 0 24 24"
>
  <circle cx="12" cy="12" r="10" fill="#36DEC3" fill-opacity=".25" />
  <circle cx="12" cy="12" r="6" fill="#36DEC3" fill-opacity=".25" />
  <path
    fill="#36DEC3"
    d="M12 22a9.804 9.804 0 0 1-5.013-1.337 10.084 10.084 0 0 1-3.65-3.65A9.812 9.812 0 0 1 2 12c0-1.808.446-3.48 1.337-5.013a9.987 9.987 0 0 1 3.65-3.637A9.727 9.727 0 0 1 12 2c.275 0 .508.1.7.3.2.192.3.425.3.7a.97.97 0 0 1-.3.712A.953.953 0 0 1 12 4c-1.45 0-2.787.358-4.013 1.075a8.001 8.001 0 0 0-2.912 2.912A7.805 7.805 0 0 0 4 12a7.8 7.8 0 0 0 1.075 4.012 8.001 8.001 0 0 0 2.912 2.913A7.804 7.804 0 0 0 12 20a7.8 7.8 0 0 0 4.012-1.075 8.002 8.002 0 0 0 2.913-2.913A7.804 7.804 0 0 0 20 12a7.79 7.79 0 0 0-.45-2.637 7.74 7.74 0 0 0-1.262-2.3c-.292-.375-.367-.738-.226-1.088.15-.35.405-.563.763-.637.367-.084.68.033.938.35a9.746 9.746 0 0 1 1.65 2.925A9.817 9.817 0 0 1 22 12c0 1.808-.45 3.48-1.35 5.012a9.987 9.987 0 0 1-3.637 3.65C15.478 21.555 13.807 22 12 22Z"
  />
  <path
    fill="#2EC9B0"
    d="M8.988 17.2c.916.533 1.92.8 3.012.8a5.884 5.884 0 0 0 3.012-.8 6.015 6.015 0 0 0 2.175-2.188c.542-.916.813-1.92.813-3.012a5.8 5.8 0 0 0-.288-1.825 5.68 5.68 0 0 0-.8-1.625c-.2-.283-.487-.404-.862-.363a.971.971 0 0 0-.8.55c-.167.317-.113.705.162 1.163.392.642.588 1.342.588 2.1 0 .733-.18 1.404-.537 2.012a4.03 4.03 0 0 1-1.45 1.45A3.893 3.893 0 0 1 12 16c-.733 0-1.404-.18-2.012-.537a4.03 4.03 0 0 1-1.45-1.45A3.892 3.892 0 0 1 8 12c0-.733.18-1.404.537-2.012a4.03 4.03 0 0 1 1.45-1.45A3.892 3.892 0 0 1 12 8a.953.953 0 0 0 .7-.287c.2-.2.3-.438.3-.713 0-.275-.1-.508-.3-.7A.933.933 0 0 0 12 6c-1.092 0-2.096.27-3.012.813A6.016 6.016 0 0 0 6.8 8.988C6.267 9.904 6 10.908 6 12s.267 2.096.8 3.012A6.115 6.115 0 0 0 8.988 17.2Z"
  />
  <path
    fill="#00B194"
    d="M12 .925c.275 0 .508.1.7.3.2.191.3.425.3.7v8.35l.112.069c.255.167.46.386.613.656.183.3.275.633.275 1s-.092.704-.275 1.013c-.175.3-.417.541-.725.724-.3.175-.633.263-1 .263s-.704-.088-1.013-.263a2.155 2.155 0 0 1-.724-.724A2.017 2.017 0 0 1 10 12c0-.367.088-.7.263-1a2.02 2.02 0 0 1 .724-.725l.013-.007V1.925a.95.95 0 0 1 .287-.7c.2-.2.438-.3.713-.3Z"
  />
</svg>
`})),In,Ln=e((()=>{In=`<svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  fill="none"
  viewBox="0 0 24 24"
>
  <path
    fill="#4D6FE6"
    d="M12 2.75c.248 0 .492.059.712.172l6 3.077A1.6 1.6 0 0 1 19.6 7.42v4.067c0 4.328-2.861 8.043-6.9 9.287a2.362 2.362 0 0 1-1.4 0c-4.039-1.244-6.9-4.959-6.9-9.287V7.42c0-.6.338-1.148.888-1.42l6-3.077A1.55 1.55 0 0 1 12 2.75Z"
  />
  <path
    fill="#86A0F2"
    d="M12 5.154 7.4 7.512v3.975c0 3.084 1.862 5.812 4.6 7.05V5.154Z"
  />
</svg>
`})),Rn,zn=e((()=>{Rn=`<svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  fill="none"
  viewBox="0 0 24 24"
>
  <path
    fill="#5856D6"
    d="M9 21c-1.217 0-2.28-.242-3.188-.725a5.14 5.14 0 0 1-2.087-2.087C3.242 17.279 3 16.216 3 15V9c0-1.217.242-2.275.725-3.175a5.04 5.04 0 0 1 2.087-2.088C6.721 3.246 7.784 3 9 3h6c1.217 0 2.275.246 3.175.737a4.946 4.946 0 0 1 2.087 2.088c.492.9.738 1.958.738 3.175v6c0 1.217-.246 2.28-.738 3.188a5.04 5.04 0 0 1-2.087 2.087c-.9.483-1.958.725-3.175.725H9Z"
  />
  <path
    fill="#FFC93C"
    d="M9.337 16.1a.84.84 0 0 0 .513-.038l2.15-.875 2.137.876a.806.806 0 0 0 .5.037.697.697 0 0 0 .388-.275.808.808 0 0 0 .125-.487l-.175-2.3 1.5-1.776a.686.686 0 0 0 .188-.462.692.692 0 0 0-.138-.463.705.705 0 0 0-.425-.262l-2.25-.55-1.225-1.963a.768.768 0 0 0-.387-.325.666.666 0 0 0-.476 0 .777.777 0 0 0-.375.325L10.15 9.525l-2.25.55a.704.704 0 0 0-.425.263.75.75 0 0 0-.15.462c.008.167.075.32.2.462l1.5 1.763-.188 2.313a.807.807 0 0 0 .125.487.696.696 0 0 0 .375.275Z"
  />
</svg>
`})),Bn,Vn=e((()=>{Bn=`<svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  fill="none"
  viewBox="0 0 24 24"
>
  <path
    fill="#FFA43D"
    d="M6.775 20.725a2.053 2.053 0 0 1-1.275.25 1.725 1.725 0 0 1-1.075-.55c-.283-.308-.425-.7-.425-1.175V7c0-.775.167-1.467.5-2.075a3.575 3.575 0 0 1 1.425-1.412C6.533 3.17 7.225 3 8 3h8c.775 0 1.467.17 2.075.513.608.333 1.08.804 1.413 1.412.341.608.512 1.3.512 2.075v12.25c0 .442-.142.82-.425 1.137-.275.309-.63.5-1.063.575-.433.076-.862-.004-1.287-.237L12 17.837l-5.225 2.888Z"
  />
  <path
    fill="#FBF4EB"
    d="M14.5 14.75a.78.78 0 0 1-.475-.025L12 13.887l-2.038.838a.78.78 0 0 1-.475.025.721.721 0 0 1-.362-.262.757.757 0 0 1-.113-.45l.175-2.2-1.412-1.663a.71.71 0 0 1-.188-.438.7.7 0 0 1 .138-.425.72.72 0 0 1 .4-.25l2.125-.524 1.175-1.85a.672.672 0 0 1 .35-.3.6.6 0 0 1 .45 0c.15.05.275.15.375.3l1.138 1.85 2.137.524a.66.66 0 0 1 .387.25c.1.126.146.267.138.426a.65.65 0 0 1-.175.437l-1.413 1.675.163 2.188a.71.71 0 0 1-.125.45.657.657 0 0 1-.35.262Z"
  />
</svg>
`})),Hn,Un=e((()=>{Hn=`<svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  fill="none"
  viewBox="0 0 24 24"
>
  <path
    fill="#EBEBEB"
    d="M13 2.594c.267 0 .538.074.813.224.274.15.583.393.924.726l4.95 4.9c.542.541.813 1.091.813 1.65v7.45c0 .725-.179 1.396-.537 2.013a4.001 4.001 0 0 1-1.463 1.449 3.87 3.87 0 0 1-2 .538h-9c-.725 0-1.396-.18-2.013-.538a4.031 4.031 0 0 1-1.45-1.45 3.937 3.937 0 0 1-.537-2.012V6.594c0-.725.179-1.392.537-2a4.002 4.002 0 0 1 1.45-1.463A3.936 3.936 0 0 1 7.5 2.594H13Z"
  />
  <path
    fill="#9B9B9B"
    d="M14.696 16.734c.374 0 .677.323.677.72 0 .398-.303.72-.677.72H7.304c-.374 0-.677-.322-.677-.72 0-.397.303-.72.677-.72h7.392Zm2-3.004c.374 0 .677.323.677.72 0 .398-.303.72-.677.72H7.304c-.374 0-.677-.322-.677-.72 0-.397.303-.72.677-.72h9.392Z"
  />
  <path
    fill="#F5F5F5"
    d="M13 2.594c.267 0 .537.075.813.225.274.15.583.391.925.725l4.95 4.9c.541.541.812 1.091.812 1.65h-4.787c-.834 0-1.496-.242-1.988-.725C13.242 8.877 13 8.215 13 7.38V2.594Z"
  />
</svg>
`})),Wn,Gn=e((()=>{Wn=`<svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  fill="none"
  viewBox="0 0 24 24"
>
  <path
    fill="#FFDE83"
    d="M17.287 3.008c.66.036 1.256.2 1.788.492A3.66 3.66 0 0 1 20.5 4.925c.25.456.406.96.469 1.51A4.73 4.73 0 0 1 21 7v7.942h-4.993V21H7c-.775 0-1.467-.167-2.075-.5A3.66 3.66 0 0 1 3.5 19.075c-.333-.608-.5-1.3-.5-2.075V7c0-.775.167-1.467.5-2.075a3.575 3.575 0 0 1 1.425-1.412C5.533 3.17 6.225 3 7 3h10l.287.008Z"
  />
  <path
    fill="#EEC35F"
    d="M15.104 15a1 1 0 1 1 0 2H7.015a1 1 0 1 1 0-2h8.089Zm-3.089-4a1 1 0 1 1 0 2h-5a1 1 0 1 1 0-2h5Zm4.907-4a1 1 0 1 1 0 2H7.015a1 1 0 1 1 0-2h9.907Z"
  />
  <path
    fill="#2E9EFF"
    d="M14.9 22.012a1.58 1.58 0 0 1-.725-.887l-2.825-7.912c-.1-.3-.125-.588-.075-.863.058-.275.183-.508.375-.7.192-.192.425-.313.7-.363.275-.058.563-.033.863.075l7.912 2.825c.4.142.696.388.887.738.192.342.234.696.125 1.063-.1.358-.354.641-.762.85l-3.025 1.524-1.513 3.013c-.208.408-.495.663-.862.762a1.358 1.358 0 0 1-1.075-.125Z"
  />
</svg>
`}));function Kn(e){let t=0;for(let n=0;n<e.length;n+=1)t=(t*31+e.charCodeAt(n))%qn.length;return qn[t]??``}var qn,Jn=e((()=>{Xt(),Qt(),en(),nn(),an(),sn(),ln(),dn(),pn(),hn(),_n(),yn(),xn(),Cn(),Tn(),Dn(),kn(),jn(),Nn(),Fn(),Ln(),zn(),Vn(),Un(),Gn(),qn=[Yt,Zt,$t,tn,rn,on,cn,un,fn,mn,gn,vn,Sn,bn,wn,En,On,An,Mn,Pn,In,Rn,Bn,Hn,Wn].map(e=>`data:image/svg+xml,${encodeURIComponent(e)}`)}));async function K(e,t,n){let r=Yn(e);if(r==null)return null;try{let e={path:r,hostId:t},i=await n.fetchQuery({queryFn:({signal:t})=>D(`read-file-binary`,{params:e,signal:t}),queryKey:P(`read-file-binary`,e),retry:!1,gcTime:1/0,staleTime:G.INFINITE});return i.contentsBase64?`data:${Xn(r)};base64,${i.contentsBase64}`:null}catch(e){return Te.warning(`Failed to inline local image`,{safe:{},sensitive:{error:e,resolvedImagePath:r}}),null}}function Yn(e){if(e==null)return null;let t=e.trim();if(t.length===0)return null;let n=t.toLowerCase();if(n.startsWith(`data:`)||n.startsWith(`http:`)||n.startsWith(`https:`)||n.startsWith(`file:`)||n.startsWith(`vscode-resource:`)||n.startsWith(`vscode-webview:`)||n.startsWith(`vscode-file:`))return null;let r=se(t);return c(r)?r:null}function Xn(e){return Qn[Zn.default.extname(e).toLowerCase()]??`application/octet-stream`}var Zn,Qn,$n=e((()=>{Zn=t(E(),1),C(),Fe(),x(),z(),Qn={".svg":`image/svg+xml`,".png":`image/png`,".jpg":`image/jpeg`,".jpeg":`image/jpeg`,".webp":`image/webp`,".gif":`image/gif`,".avif":`image/avif`}}));function er(e){return{...Br(e.summary),description:e.summary.interface?.shortDescription??e.description??null,displayName:e.summary.interface?.displayName??null,marketplaceDisplayName:null,marketplaceName:e.marketplaceName,plugin:e.summary,keywords:e.summary.keywords,...cr({marketplaceName:e.marketplaceName,marketplacePath:e.marketplacePath})}}function tr({marketplacePath:e,remoteMarketplaceName:t}){if(e!=null&&t!=null)throw Error(`plugin marketplace request requires one marketplace source`);if(e!=null)return{marketplacePath:e};if(t!=null)return{remoteMarketplaceName:t};throw Error(`plugin marketplace request requires a marketplace source`)}function q(e){return e.marketplacePath??`remote:${e.remoteMarketplaceName}`}function nr(e){let t=e.plugin.remotePluginId??e.plugin.shareContext?.remotePluginId;return`${q(e)}:${e.plugin.id}:${t??``}`}function rr(e){return e.filter(e=>{let t=kr(e).toLowerCase();return!$r.some(e=>t===e||t.startsWith(`${e}-`))})}function ir(e){return e.marketplacePath==null?or(e.plugin):e.plugin.name}function ar(e){return e.marketplacePath==null?or(e.plugin):e.plugin.id}function or(e){if(e.remotePluginId==null)throw Error(`remote plugin ${e.id} is missing remotePluginId`);return e.remotePluginId}function sr(e){return{...tr(e),pluginName:ir(e)}}function cr({marketplaceName:e,marketplacePath:t}){return t==null?{marketplacePath:null,remoteMarketplaceName:e}:{marketplacePath:t,remoteMarketplaceName:null}}function lr(e,t,n){let r=(0,Vr.c)(61),i;r[0]===e?i=r[1]:(i={hostId:e},r[0]=e,r[1]=i);let a=St(i)&&(n?.enabled??!0),o=n?.additionalMarketplaceKinds??Kr,s=n?.installSuggestionPluginNames??null,c=ce(`4218407052`),l=te(e)?.authMethod??null,u;r[2]===l?u=r[3]:(u=qt(l),r[2]=l,r[3]=u);let d=u,f=n?.includeRemoteCatalog??!0,p=!c,m;r[4]!==o||r[5]!==f||r[6]!==p?(m=hr({additionalMarketplaceKinds:o,includeRemoteCatalog:f,includeVerticalCatalog:p}),r[4]=o,r[5]=f,r[6]=p,r[7]=m):m=r[7];let h=m,g=re(),_=je(ze),v=qe(e),y=je(O),b;r[8]!==e||r[9]!==y?(b=y.includes(e),r[8]=e,r[9]=y,r[10]=b):b=r[10];let x=b,S=a&&x,C;r[11]!==e||r[12]!==S?(C={enabled:S,hostId:e},r[11]=e,r[12]=S,r[13]=C):C=r[13];let w=st(C),T;r[14]===e?T=r[15]:(T={hostId:e},r[14]=e,r[15]=T);let E=vt(T),D;r[16]===e?D=r[17]:(D={hostId:e},r[16]=e,r[17]=D);let k=mt(D),A=t===void 0,j=_.data?.roots,M;r[18]!==v||r[19]!==e||r[20]!==t||r[21]!==j?(M=Ir({codexHome:v,hostId:e,rootsOverrideCwd:t,workspaceRoots:j}),r[18]=v,r[19]=e,r[20]=t,r[21]=j,r[22]=M):M=r[22];let ee=M,N=a&&x&&(t!==void 0||_.isFetched),P;r[23]===Symbol.for(`react.memo_cache_sentinel`)?(P=Dt(),r[23]=P):P=r[23];let ne=P,F;r[24]!==e||r[25]!==s||r[26]!==c||r[27]!==h||r[28]!==ee||r[29]!==d?(F={buildFlavor:ne,hostId:e,installSuggestionPluginNames:s,isOpenAICuratedRemoteMarketplaceEnabled:c,marketplaceKinds:h,roots:ee,shouldHideOpenAICuratedMarketplaces:d},r[24]=e,r[25]=s,r[26]=c,r[27]=h,r[28]=ee,r[29]=d,r[30]=F):F=r[30];let ie;r[31]===N?ie=r[32]:(ie={enabled:N},r[31]=N,r[32]=ie);let I=Ie(ti,F,ie);if(!a||!x){let e;return r[33]===Symbol.for(`react.memo_cache_sentinel`)?(e={availablePlugins:Y,featuredPluginIds:Wr,installedPlugins:Y,marketplaceLoadErrors:Gr,marketplaces:Jr,errorMessage:null,isLoading:!1,isFetching:!1,refetch:dr,forceReload:ur},r[33]=e):e=r[33],e}let L,R,z,B;r[34]!==w.available||r[35]!==k.available||r[36]!==E.available||r[37]!==I.data?.featuredPluginIds||r[38]!==I.data?.plugins?(L={isComputerUseAvailable:w.available,isExternalBrowserUseAvailable:k.available,isInAppBrowserUseAvailable:E.available},R=I.data?.plugins??Y,z=xr({plugins:R,...L}),B=br({featuredPluginIds:I.data?.featuredPluginIds??Wr,...L}),r[34]=w.available,r[35]=k.available,r[36]=E.available,r[37]=I.data?.featuredPluginIds,r[38]=I.data?.plugins,r[39]=L,r[40]=R,r[41]=z,r[42]=B):(L=r[39],R=r[40],z=r[41],B=r[42]);let V;r[43]===R?V=r[44]:(V=Sr(R),r[43]=R,r[44]=V);let ae=I.data?.marketplaceLoadErrors??Gr,oe=I.data?.marketplaces??Jr,se=I.error?String(I.error.message):null,le=A&&_.isLoading||I.isLoading||E.isLoading||k.isLoading||w.isLoading,ue=A&&_.isFetching||I.isFetching||w.isFetching,H;r[45]!==L||r[46]!==I?(H=async()=>{let e=(await I.refetch()).data?.plugins??Y;return{availablePlugins:xr({plugins:e,...L}),installedPlugins:Sr(e)}},r[45]=L,r[46]=I,r[47]=H):H=r[47];let U;r[48]===g?U=r[49]:(U=()=>g(J),r[48]=g,r[49]=U);let de;return r[50]!==z||r[51]!==B||r[52]!==V||r[53]!==ae||r[54]!==oe||r[55]!==se||r[56]!==le||r[57]!==ue||r[58]!==H||r[59]!==U?(de={availablePlugins:z,featuredPluginIds:B,installedPlugins:V,marketplaceLoadErrors:ae,marketplaces:oe,errorMessage:se,isLoading:le,isFetching:ue,refetch:H,forceReload:U},r[50]=z,r[51]=B,r[52]=V,r[53]=ae,r[54]=oe,r[55]=se,r[56]=le,r[57]=ue,r[58]=H,r[59]=U,r[60]=de):de=r[60],de}async function ur(){}async function dr(){return{availablePlugins:Y,installedPlugins:Y}}function fr(e){let t=(0,Vr.c)(7),{enabled:n,hostId:r,marketplaceKind:i}=e,a=n===void 0?!0:n,o;t[0]===r?o=t[1]:(o={hostId:r},t[0]=r,t[1]=o);let s=St(o),c;t[2]!==r||t[3]!==i?(c={hostId:r,marketplaceKind:i},t[2]=r,t[3]=i,t[4]=c):c=t[4];let l=a&&s,u;return t[5]===l?u=t[6]:(u={enabled:l},t[5]=l,t[6]=u),Ie(ni,c,u)}function pr(e,t,n=Kr,r=null,i=!1,a=!1){return r==null?gr(e,t,hr({additionalMarketplaceKinds:n,includeRemoteCatalog:!0,includeVerticalCatalog:!i}),i,a):mr([...J,e,t,`installed`,r,`curated-marketplace`,_r(i)],a)}function mr(e,t){return t?[...e,Hr]:e}function hr({additionalMarketplaceKinds:e,includeRemoteCatalog:t,includeVerticalCatalog:n}){return t&&!n&&e.length===0?null:n?[`local`,`vertical`,...e]:[`local`,...e]}function gr(e,t,n,r,i){let a=_r(r);return mr(n==null?[...J,e,t,`curated-marketplace`,a]:[...J,e,t,`marketplace-kinds`,n,`curated-marketplace`,a],i)}function _r(e){return e?ve:a}function vr({isOpenAICuratedRemoteMarketplaceEnabled:e,shouldHideOpenAICuratedMarketplaces:t}){return t?Xr:e?Yr:qr}function yr(e,t){return t.length===0?e:e.filter(e=>!t.includes(e.name))}function br({featuredPluginIds:e,...t}){return e.filter(e=>Tr(e,t))}function xr({plugins:e,...t}){return e.filter(e=>Tr(e.plugin.id,t))}function Sr(e){return e.filter(e=>e.plugin.installed)}function Cr({enabled:e,hostId:t,installed:n,pluginId:r,queryClient:i}){i.setQueriesData({queryKey:[...J,t]},t=>{if(t==null)return t;let i=wr({enabled:e,installed:n,pluginId:r,plugins:t.plugins});return i===t.plugins?void 0:{...t,plugins:i}}),i.setQueriesData({queryKey:[...J,`marketplace-kind`,t]},t=>{if(t==null)return;let i=wr({enabled:e,installed:n,pluginId:r,plugins:t});return i===t?void 0:i}),i.setQueriesData({queryKey:[...J,`detail`,t]},t=>{if(!(t==null||t.summary.id!==r||t.summary.installed===n&&t.summary.enabled===e))return{...t,summary:{...t.summary,enabled:e,installed:n}}})}function wr({enabled:e,installed:t,pluginId:n,plugins:r}){return r.some(r=>r.plugin.id===n&&(r.plugin.installed!==t||r.plugin.enabled!==e))?r.map(r=>r.plugin.id===n?{...r,plugin:{...r.plugin,enabled:e,installed:t}}:r):r}function Tr(e,{isComputerUseAvailable:t,isExternalBrowserUseAvailable:n,isInAppBrowserUseAvailable:r}){return!(!r&&Er(e)||!n&&Dr(e)||!t&&Or(e))}function Er(e){let t=kr(e);return t===`browser`||t===`browser-use`}function Dr(e){let t=kr(e);return t===`chrome`||t===`chrome-dev`||t===`chrome-internal`}function Or(e){return kr(e)===Zr}function kr(e){return e.split(`@`)[0]}function Ar({buildFlavor:e,featuredPluginIds:t}){let n=p(e);return t.filter(e=>{let t=ge(e);return t==null?!0:!u(t)||t===n})}function jr({buildFlavor:e,plugins:t}){let n=p(e);return t.filter(e=>!u(e.marketplaceName)||e.marketplaceName===n)}function Mr(e){return e.trim().toLowerCase().replace(/[^a-z0-9]+/g,`-`).replace(/^-+|-+$/g,``)}function Nr(e){return ei.has(Mr(e))}function Pr(e){let t=new Map;for(let n of e){let e=`${n.name}\u0000${n.path??``}`;if(t.has(e))continue;let r=Nr(n.name);t.set(e,{displayName:n.interface?.displayName??null,isBuiltIn:r,name:n.name,path:n.path,pluginCount:n.plugins.length})}return Array.from(t.values()).sort((e,t)=>{let n=e.displayName?.trim()||e.name,r=t.displayName?.trim()||t.name;return n.localeCompare(r)})}async function Fr({hostId:e,plugins:t,queryClient:n}){let r=[...t];async function i(a){let o=t[a];if(o==null)return;let[s,c,l]=await Promise.all([K(o.composerIconPath,e,n),K(o.logoPath,e,n),K(o.logoDarkPath,e,n)]);(s!=null||c!=null||l!=null)&&(r[a]={...o,composerIconPath:s??o.composerIconPath,logoDarkPath:l??o.logoDarkPath,logoPath:c??o.logoPath,plugin:o.plugin.interface?{...o.plugin,interface:{...o.plugin.interface,composerIcon:s??o.plugin.interface.composerIcon,logo:c??o.plugin.interface.logo,...l==null?{}:{logoDark:l}}}:o.plugin}),await i(a+Ur)}return await Promise.all(Array.from({length:Math.min(Ur,t.length)},(e,t)=>i(t))),r}function Ir({codexHome:e,hostId:t,rootsOverrideCwd:n,workspaceRoots:r}){let i=t===`local`&&e!=null?T(e,Qr):null;return Lr([...typeof n==`string`?[n]:n??r??[],...i==null?[]:[i]],e)}function Lr(e,t){return Array.from(new Set(e.map(e=>e.trim()).filter(e=>c(e)&&Rr(e,t))))}function Rr(e,t){return t==null?!0:V(t)||v(t)?V(e)||v(e):e.startsWith(`/`)&&!e.startsWith(`//`)}function zr(e,t=Y){let n=new Map,r=new Set;for(let t of e)for(let e of t.plugins){e.installed||r.add(e.id);let i={...Br(e),description:e.interface?.shortDescription??null,displayName:e.interface?.displayName??null,marketplaceDisplayName:t.interface?.displayName??null,marketplaceName:t.name,plugin:e,keywords:e.keywords,...cr({marketplaceName:t.name,marketplacePath:t.path})},a=n.get(e.id);if(a==null){n.set(e.id,i);continue}let o=a;(a.plugin.installed&&!e.installed||a.plugin.installed===e.installed&&a.plugin.interface==null&&e.interface!=null)&&(o=i),a.plugin.installed&&!e.installed&&n.delete(e.id);let s=null;if(a.plugin.installed?s=a.plugin:e.installed&&(s=e),s==null){n.set(e.id,o);continue}n.set(e.id,{...o,plugin:{...o.plugin,enabled:s.enabled,installed:!0,installPolicy:s.installPolicy,localVersion:s.localVersion,remotePluginId:o.plugin.remotePluginId??s.remotePluginId}})}let i=new Map(t.map(e=>[e.plugin.id,e])),a=!1,o=Array.from(n.values()).map(e=>{let t=i.get(e.plugin.id);return!e.plugin.installed||t==null||r.has(e.plugin.id)?e:(a||=e.marketplaceName!==t.marketplaceName||e.marketplacePath!==t.marketplacePath,{...t,plugin:{...e.plugin,id:t.plugin.id,interface:t.plugin.interface??e.plugin.interface,keywords:t.plugin.keywords??e.plugin.keywords,name:t.plugin.name,remotePluginId:t.plugin.remotePluginId??e.plugin.remotePluginId,shareContext:t.plugin.shareContext??e.plugin.shareContext,source:t.plugin.source}})});if(!a)return o;let s=new Map(o.map(e=>[e.plugin.id,e]));return[...t.flatMap(e=>{let t=s.get(e.plugin.id);return s.delete(e.plugin.id),t==null?[]:[t]}),...s.values()]}function Br(e,t){let n=e.interface,r=n?.composerIcon??n?.composerIconUrl,i=n?.logo??n?.logoUrl,a=n?.logoDark??n?.logoUrlDark,o=Vt(e),s=i!=null||a!=null,c=r??(s?null:o),l=s?i??a??null:o??t?.logoUrl??t?.logoUrlDark??null,u=s?a??null:o??t?.logoUrlDark??t?.logoUrl??null;if(c!=null||l!=null)return{composerIconPath:c,logoDarkPath:u,logoPath:l};let d=Kn(e.id);return{composerIconPath:d,logoDarkPath:d,logoPath:d}}var Vr,J,Hr,Ur,Wr,Gr,Kr,qr,Jr,Y,Yr,Xr,Zr,Qr,$r,ei,ti,ni,ri=e((()=>{Vr=r(),H(),C(),De(),Ve(),ue(),Ye(),pt(),_t(),xt(),Et(),pe(),ie(),ye(),F(),y(),Ot(),R(),x(),Kt(),Jt(),Jn(),$n(),J=[`plugins`],Hr=`openai-curated-marketplaces-hidden`,Ur=4,Wr=[],Gr=[],Kr=[],qr=[],Jr=[],Y=[],Yr=[a],Xr=[a,ve],Zr=`computer-use`,Qr=`.tmp/marketplaces/openai-internal-testing`,$r=[`datadog`,`statsig`],ei=new Set([`codex-official`,I,a,ve,`openai-primary-runtime`].map(Mr)),ti=Be(Le,({buildFlavor:e,hostId:t,installSuggestionPluginNames:n,isOpenAICuratedRemoteMarketplaceEnabled:r,marketplaceKinds:i,roots:a,shouldHideOpenAICuratedMarketplaces:o},{queryClient:c})=>{let l=vr({isOpenAICuratedRemoteMarketplaceEnabled:r,shouldHideOpenAICuratedMarketplaces:o}),u=n==null?gr(t,a,i,r,o):pr(t,a,Kr,n,r,o);return{queryKey:u,queryFn:async()=>{if(n!=null){let e=await s(`send-cli-request-for-host`,{hostId:t,method:`plugin/installed`,params:{...a.length>0?{cwds:a}:{},installSuggestionPluginNames:n}}),r=yr(e.marketplaces,l),i=zr(r,c.getQueryData(u)?.plugins);return{featuredPluginIds:Wr,marketplaceLoadErrors:e.marketplaceLoadErrors,marketplaces:Pr(r),plugins:await Fr({hostId:t,plugins:i,queryClient:c})}}let r=await s(`list-plugins`,i==null?{hostId:t,...a.length>0?{cwds:a}:{}}:{hostId:t,...a.length>0?{cwds:a}:{},marketplaceKinds:i}),o=yr(r.marketplaces,l),d=zr(o,c.getQueryData(u)?.plugins),f=e==null?d:jr({buildFlavor:e,plugins:d}),p=rr(r.featuredPluginIds).filter(e=>!l.some(t=>e.endsWith(`@${t}`)));return{featuredPluginIds:e==null?p:Ar({buildFlavor:e,featuredPluginIds:p}),marketplaceLoadErrors:r.marketplaceLoadErrors,marketplaces:Pr(o),plugins:await Fr({hostId:t,plugins:f,queryClient:c})}},staleTime:G.SIX_HOURS,gcTime:1/0}}),ni=Be(Le,({hostId:e,marketplaceKind:t},{queryClient:n})=>{let r=[...J,`marketplace-kind`,e,t];return{queryKey:r,queryFn:async()=>zr((await s(`list-plugins`,{hostId:e,marketplaceKinds:[t]})).marketplaces,n.getQueryData(r)),staleTime:G.SIX_HOURS}})}));function ii(e,{includeActions:t=!1,includeLogo:n=!1}={}){return{queryKey:[...wi,e,t,n],staleTime:G.FIVE_MINUTES,queryFn:async()=>L.safeGet(`/aip/connectors/{connector_id}`,{parameters:{path:{connector_id:e},query:{include_logo:n,include_actions:t}},additionalHeaders:{[Si]:X}})}}function ai(e){let t=e.installUrl?.trim();if(!t)return null;let n=new URL(t);return n.hash=bi(e.id),n.toString()}async function oi({app:e,callbackMode:t=`native`,connector:n,openInBrowser:r,queryClient:i}){let a=n;if(a==null)try{a=await i.fetchQuery(ii(e.id))}catch(t){return Te.error(`Failed to resolve app connect flow`,{safe:{appId:e.id},sensitive:{error:t}}),xi({app:e,openInBrowser:r})?{kind:`browser-fallback`}:{kind:`failed`}}if(a==null)return{kind:`failed`};let o=mi(a);if(pi(a)||o===`UNSUPPORTED`)return xi({app:e,openInBrowser:r})?{kind:`browser-fallback`}:{kind:`failed`};try{if(o===`NONE`)return await L.safePost(`/aip/connectors/links/noauth`,{requestBody:{connector_id:a.id,name:a.name,action_names:[]},additionalHeaders:{[Si]:X}}),{kind:`connected-directly`};let n=t===`browser`?gi(e):await hi(),i=(await L.safePost(`/aip/connectors/links/oauth`,{requestBody:{connector_id:a.id,name:a.name,action_names:null,callback_url:n,post_auth_url:_i(e)},additionalHeaders:{[Si]:X}})).redirect_url?.trim();if(!i)throw Error(`OAuth redirect URL missing in connector response.`);return r(i),{kind:`oauth-started`,redirectUrl:i}}catch(t){return Te.error(`Failed to connect app {}`,{safe:{templateArgs:[e.id]},sensitive:{error:t}}),xi({app:e,openInBrowser:r})?{kind:`browser-fallback`}:{kind:`failed`}}}async function si({app:e,authReason:t,fallbackUrl:n,linkId:r,openInBrowser:i,queryClient:a,requestedScopes:o}){if(t===`missing_link`)return oi({app:e,openInBrowser:i,queryClient:a});let s=r?.trim();if(s)try{let t=(await L.safePost(`/aip/connectors/links/oauth/reauth`,{requestBody:{callback_url:await hi(),link_id:s,post_auth_url:_i(e),requested_scopes:o},additionalHeaders:{[Si]:X}})).redirect_url?.trim();if(!t)throw Error(`OAuth redirect URL missing in connector response.`);return i(t),{kind:`oauth-started`,redirectUrl:t}}catch(t){Te.error(`Failed to reauthenticate app {}`,{safe:{templateArgs:[e.id]},sensitive:{error:t}})}let c=n.trim();return c?(i(c),{kind:`browser-fallback`}):{kind:`failed`}}function ci({intl:e}){return e.formatMessage({id:`settings.mcp.appConnectModal.oauthStartedElectron`,defaultMessage:`Finish connecting in your browser.`,description:`Toast shown after starting OAuth from MCP settings app connect modal`})}function li({appName:e,intl:t}){return t.formatMessage({id:`settings.mcp.appConnectModal.connected`,defaultMessage:`{appName} is now connected.`,description:`Toast shown when a no-auth app is connected directly from MCP settings`},{appName:e})}function ui(e){return e.formatMessage({id:`settings.mcp.appConnectModal.connectFailed`,defaultMessage:`Failed to connect app.`,description:`Toast shown when starting an app connection fails`})}function di(e){return e.formatMessage({id:`settings.mcp.appConnectModal.installUrlMissing`,defaultMessage:`This app does not provide a browser setup URL right now.`,description:`Toast shown when app connect fallback is attempted but no install URL is available`})}function fi(e){if(typeof e!=`object`||!e)return!1;let t=e,n=t.properties;if(n&&typeof n==`object`)return Object.keys(n).length>0;let r=t.required;return!!(Array.isArray(r)&&r.length>0)}function pi(e){return fi(e.link_params_schema)}function mi(e){return e.supported_auth.some(e=>e.type===`OAUTH`)?`OAUTH`:e.supported_auth.some(e=>e.type===`NONE`)?`NONE`:`UNSUPPORTED`}async function hi(){let{callbackUrl:e}=await D(`app-connect-oauth-callback-url`);return e}function gi(e){return yi(e)+`/connector_platform_oauth_redirect`}function _i(e){let t=ai(e);if(t!=null)return t;let n=new URL(`/gpts/editor`,yi(e));return n.hash=bi(e.id),n.toString()}function vi(e){let t=e.installUrl?.trim();if(!t)return null;let n=new URL(t);return n.hash=bi(e.id,{addConnectorLink:!0}),n.toString()}function yi(e){let t=e.installUrl?.trim();return t?new URL(t).origin:`https://chatgpt.com`}function bi(e,{addConnectorLink:t=!1}={}){let n=new URLSearchParams([[`connector`,e]]);return t&&n.set(`add-connector-link`,`true`),n.set(`product-sku`,X),n.set(`referrer`,Ci),`settings/Connectors?${n.toString()}`}function xi({app:e,openInBrowser:t}){let n=vi(e);return n==null?!1:(t(n),!0)}var Si,X,Ci,wi,Ti=e((()=>{Fe(),x(),N(),z(),Si=`OAI-Product-Sku`,X=`CODEX`,Ci=`codex`,wi=[`mcp-settings`,`app-connect`]})),Ei=n(((e,t)=>{function n(e,t,n,r){var i=-1,a=e==null?0:e.length;for(r&&a&&(n=e[++i]);++i<a;)n=t(n,e[i],i,e);return n}t.exports=n})),Di=n(((e,t)=>{function n(e){return function(t){return e?.[t]}}t.exports=n})),Oi=n(((e,t)=>{t.exports=Di()({À:`A`,Á:`A`,Â:`A`,Ã:`A`,Ä:`A`,Å:`A`,à:`a`,á:`a`,â:`a`,ã:`a`,ä:`a`,å:`a`,Ç:`C`,ç:`c`,Ð:`D`,ð:`d`,È:`E`,É:`E`,Ê:`E`,Ë:`E`,è:`e`,é:`e`,ê:`e`,ë:`e`,Ì:`I`,Í:`I`,Î:`I`,Ï:`I`,ì:`i`,í:`i`,î:`i`,ï:`i`,Ñ:`N`,ñ:`n`,Ò:`O`,Ó:`O`,Ô:`O`,Õ:`O`,Ö:`O`,Ø:`O`,ò:`o`,ó:`o`,ô:`o`,õ:`o`,ö:`o`,ø:`o`,Ù:`U`,Ú:`U`,Û:`U`,Ü:`U`,ù:`u`,ú:`u`,û:`u`,ü:`u`,Ý:`Y`,ý:`y`,ÿ:`y`,Æ:`Ae`,æ:`ae`,Þ:`Th`,þ:`th`,ß:`ss`,Ā:`A`,Ă:`A`,Ą:`A`,ā:`a`,ă:`a`,ą:`a`,Ć:`C`,Ĉ:`C`,Ċ:`C`,Č:`C`,ć:`c`,ĉ:`c`,ċ:`c`,č:`c`,Ď:`D`,Đ:`D`,ď:`d`,đ:`d`,Ē:`E`,Ĕ:`E`,Ė:`E`,Ę:`E`,Ě:`E`,ē:`e`,ĕ:`e`,ė:`e`,ę:`e`,ě:`e`,Ĝ:`G`,Ğ:`G`,Ġ:`G`,Ģ:`G`,ĝ:`g`,ğ:`g`,ġ:`g`,ģ:`g`,Ĥ:`H`,Ħ:`H`,ĥ:`h`,ħ:`h`,Ĩ:`I`,Ī:`I`,Ĭ:`I`,Į:`I`,İ:`I`,ĩ:`i`,ī:`i`,ĭ:`i`,į:`i`,ı:`i`,Ĵ:`J`,ĵ:`j`,Ķ:`K`,ķ:`k`,ĸ:`k`,Ĺ:`L`,Ļ:`L`,Ľ:`L`,Ŀ:`L`,Ł:`L`,ĺ:`l`,ļ:`l`,ľ:`l`,ŀ:`l`,ł:`l`,Ń:`N`,Ņ:`N`,Ň:`N`,Ŋ:`N`,ń:`n`,ņ:`n`,ň:`n`,ŋ:`n`,Ō:`O`,Ŏ:`O`,Ő:`O`,ō:`o`,ŏ:`o`,ő:`o`,Ŕ:`R`,Ŗ:`R`,Ř:`R`,ŕ:`r`,ŗ:`r`,ř:`r`,Ś:`S`,Ŝ:`S`,Ş:`S`,Š:`S`,ś:`s`,ŝ:`s`,ş:`s`,š:`s`,Ţ:`T`,Ť:`T`,Ŧ:`T`,ţ:`t`,ť:`t`,ŧ:`t`,Ũ:`U`,Ū:`U`,Ŭ:`U`,Ů:`U`,Ű:`U`,Ų:`U`,ũ:`u`,ū:`u`,ŭ:`u`,ů:`u`,ű:`u`,ų:`u`,Ŵ:`W`,ŵ:`w`,Ŷ:`Y`,ŷ:`y`,Ÿ:`Y`,Ź:`Z`,Ż:`Z`,Ž:`Z`,ź:`z`,ż:`z`,ž:`z`,Ĳ:`IJ`,ĳ:`ij`,Œ:`Oe`,œ:`oe`,ŉ:`'n`,ſ:`s`})})),ki=n(((e,t)=>{var n=Oi(),r=Re(),i=/[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,a=RegExp(`[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]`,`g`);function o(e){return e=r(e),e&&e.replace(i,n).replace(a,``)}t.exports=o})),Ai=n(((e,t)=>{var n=/[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;function r(e){return e.match(n)||[]}t.exports=r})),ji=n(((e,t)=>{var n=/[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;function r(e){return n.test(e)}t.exports=r})),Mi=n(((e,t)=>{var n=`\\ud800-\\udfff`,r=`\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff`,i=`\\u2700-\\u27bf`,a=`a-z\\xdf-\\xf6\\xf8-\\xff`,o=`\\xac\\xb1\\xd7\\xf7`,s=`\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf`,c=`\\u2000-\\u206f`,l=` \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000`,u=`A-Z\\xc0-\\xd6\\xd8-\\xde`,d=`\\ufe0e\\ufe0f`,f=o+s+c+l,p=`['’]`,m=`[`+f+`]`,h=`[`+r+`]`,g=`\\d+`,_=`[`+i+`]`,v=`[`+a+`]`,y=`[^`+n+f+g+i+a+u+`]`,b=`(?:`+h+`|\\ud83c[\\udffb-\\udfff])`,x=`[^`+n+`]`,S=`(?:\\ud83c[\\udde6-\\uddff]){2}`,C=`[\\ud800-\\udbff][\\udc00-\\udfff]`,w=`[`+u+`]`,T=`\\u200d`,E=`(?:`+v+`|`+y+`)`,D=`(?:`+w+`|`+y+`)`,O=`(?:`+p+`(?:d|ll|m|re|s|t|ve))?`,k=`(?:`+p+`(?:D|LL|M|RE|S|T|VE))?`,A=b+`?`,j=`[`+d+`]?`,M=`(?:`+T+`(?:`+[x,S,C].join(`|`)+`)`+j+A+`)*`,ee=`\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])`,N=`\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])`,te=j+A+M,P=`(?:`+[_,S,C].join(`|`)+`)`+te,ne=RegExp([w+`?`+v+`+`+O+`(?=`+[m,w,`$`].join(`|`)+`)`,D+`+`+k+`(?=`+[m,w+E,`$`].join(`|`)+`)`,w+`?`+E+`+`+O,w+`+`+k,N,ee,g,P].join(`|`),`g`);function F(e){return e.match(ne)||[]}t.exports=F})),Ni=n(((e,t)=>{var n=Ai(),r=ji(),i=Re(),a=Mi();function o(e,t,o){return e=i(e),t=o?void 0:t,t===void 0?r(e)?a(e):n(e):e.match(t)||[]}t.exports=o})),Pi=n(((e,t)=>{var n=Ei(),r=ki(),i=Ni(),a=RegExp(`['’]`,`g`);function o(e){return function(t){return n(i(r(t).replace(a,``)),e,``)}}t.exports=o})),Fi=n(((e,t)=>{function n(e,t,n){var r=-1,i=e.length;t<0&&(t=-t>i?0:i+t),n=n>i?i:n,n<0&&(n+=i),i=t>n?0:n-t>>>0,t>>>=0;for(var a=Array(i);++r<i;)a[r]=e[r+t];return a}t.exports=n})),Ii=n(((e,t)=>{var n=Fi();function r(e,t,r){var i=e.length;return r=r===void 0?i:r,!t&&r>=i?e:n(e,t,r)}t.exports=r})),Li=n(((e,t)=>{var n=RegExp(`[\\u200d\\ud800-\\udfff\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff\\ufe0e\\ufe0f]`);function r(e){return n.test(e)}t.exports=r})),Ri=n(((e,t)=>{function n(e){return e.split(``)}t.exports=n})),zi=n(((e,t)=>{var n=`\\ud800-\\udfff`,r=`\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff`,i=`\\ufe0e\\ufe0f`,a=`[`+n+`]`,o=`[`+r+`]`,s=`\\ud83c[\\udffb-\\udfff]`,c=`(?:`+o+`|`+s+`)`,l=`[^`+n+`]`,u=`(?:\\ud83c[\\udde6-\\uddff]){2}`,d=`[\\ud800-\\udbff][\\udc00-\\udfff]`,f=`\\u200d`,p=c+`?`,m=`[`+i+`]?`,h=`(?:`+f+`(?:`+[l,u,d].join(`|`)+`)`+m+p+`)*`,g=m+p+h,_=`(?:`+[l+o+`?`,o,u,d,a].join(`|`)+`)`,v=RegExp(s+`(?=`+s+`)|`+_+g,`g`);function y(e){return e.match(v)||[]}t.exports=y})),Bi=n(((e,t)=>{var n=Ri(),r=Li(),i=zi();function a(e){return r(e)?i(e):n(e)}t.exports=a})),Vi=n(((e,t)=>{var n=Ii(),r=Li(),i=Bi(),a=Re();function o(e){return function(t){t=a(t);var o=r(t)?i(t):void 0,s=o?o[0]:t.charAt(0),c=o?n(o,1).join(``):t.slice(1);return s[e]()+c}}t.exports=o})),Hi=n(((e,t)=>{t.exports=Vi()(`toUpperCase`)})),Ui=n(((e,t)=>{var n=Pi(),r=Hi();t.exports=n(function(e,t,n){return e+(n?` `:``)+r(t)})})),Wi=n(((e,t)=>{var n=Ae();function r(e){return e&&e.length?n(e):[]}t.exports=r}));function Gi({actions:e}){return e.filter(e=>e.is_enabled!==!1||e.disabled_reason===`disabled_by_admin`).map(e=>({accessBadges:Ki(e),description:e.description,disabledReason:e.disabled_reason??null,name:e.name,visibility:Ji(e.visibility)})).sort((e,t)=>e.name.localeCompare(t.name))}function Ki(e){return(0,Xi.default)([e.is_read_only===!0?`READ`:qi(e.visibility),e.is_open_world===!0?`OPEN WORLD`:null,e.is_destructive===!0?`DESTRUCTIVE`:null]).flatMap(e=>e==null?[]:[e])}function qi(e){let t=Ji(e);return t==null?`WRITE`:`${t} WRITE`}function Ji(e){let t=e?.trim();return t==null||t.length===0?null:(0,Yi.default)(t.replace(/[:/_.-]+/g,` `)).toUpperCase()}var Yi,Xi,Zi=e((()=>{Yi=t(Ui(),1),Xi=t(Wi(),1)}));function Qi(e){let t=e?.trim();if(t==null||t.length===0||!t.startsWith(ta))return null;let n=t.slice(13),r=((n.split(/[?#]/u)[0]??``).split(`/`)[0]??``).trim();if(r.length===0)return null;let i=n.split(`?`)[1]?.split(`#`)[0]??``;return{connectorId:r,theme:new URLSearchParams(i).get(`theme`)?.toLowerCase()===ra?ra:na}}function $i({connectorId:e,theme:t}){return`${e}:${t}`}async function ea({connectorId:e,theme:t}){let n=await m.getInstance().get(`/aip/connectors/${encodeURIComponent(e)}/logo?theme=${t}`,d());return n.body.contentType.toLowerCase().startsWith(`text/plain`)?b(n.body.base64).trim():`data:${n.body.contentType};base64,${n.body.base64}`}var ta,na,ra,ia=e((()=>{k(),N(),w(),ta=`connectors://`,na=`light`,ra=`dark`}));function aa(e){let t=(0,sa.c)(4),{hostId:n}=e,{data:r}=Ie(We,n),i;t[0]===r?i=t[1]:(i=r===void 0?[]:r,t[0]=r,t[1]=i);let a=i,o;return t[2]===a?o=t[3]:(o=a.some(oa),t[2]=a,t[3]=o),o}function oa(e){return e.name===`apps`&&e.enabled}var sa,ca=e((()=>{sa=r(),H(),He()}));function la(e){return fe({queryKey:wa(e),queryFn:async()=>Ca({forceRefetch:!1,hostId:e}),notifyOnChangeProps:[`data`,`dataUpdatedAt`,`error`,`fetchStatus`,`status`],retry:!1,staleTime:G.FIVE_MINUTES})}async function ua({hostId:e,queryClient:t}){let n=await Ca({forceRefetch:!0,hostId:e});return t.setQueryData(wa(e),n),n}function da(e){let t=(0,Z.c)(23),n;t[0]===e?n=t[1]:(n=e===void 0?{}:e,t[0]=e,t[1]=n);let{enabled:r,hostId:i}=n,a=r===void 0?!0:r,o=i??`local`,s=le(),c;t[2]===o?c=t[3]:(c={hostId:o},t[2]=o,t[3]=c);let l=aa(c),u=we(),d=!s.isLoading&&s.userId!=null,f;t[4]===o?f=t[5]:(f=la(o),t[4]=o,t[5]=f);let p=a&&l&&d,m;t[6]!==f||t[7]!==p?(m={...f,enabled:p,staleTime:G.FIVE_MINUTES},t[6]=f,t[7]=p,t[8]=m):m=t[8];let h=W(m),g;t[9]!==o||t[10]!==u?(g={retry:!1,onMutate:async()=>{await u.cancelQueries({queryKey:wa(o)})},mutationFn:async()=>ua({hostId:o,queryClient:u})},t[9]=o,t[10]=u,t[11]=g):g=t[11];let _=Ee(g),v=_.error!=null&&_.submittedAt>h.dataUpdatedAt?_.error:null,y;t[12]!==l||t[13]!==h?(y=l?h.data:[],t[12]=l,t[13]=h,t[14]=y):y=t[14];let b;t[15]===_?b=t[16]:(b=async()=>_.mutateAsync(),t[15]=_,t[16]=b);let x=v??h.error??null,S;return t[17]!==_.isPending||t[18]!==h||t[19]!==x||t[20]!==y||t[21]!==b?(S={...h,data:y,hardRefetchAppsList:b,isHardRefetchingAppsList:_.isPending,loadError:x},t[17]=_.isPending,t[18]=h,t[19]=x,t[20]=y,t[21]=b,t[22]=S):S=t[22],S}function fa(e){let t=(0,Z.c)(14),{apps:n,enabled:r}=e,i=r===void 0?!0:r,a=we(),o=i?n:void 0,s;t[0]===o?s=t[1]:(s=o==null?void 0:Ea(o),t[0]=o,t[1]=s);let c=s,l;t[2]===c?l=t[3]:(l=[...Ia,...(c??[]).map(pa)],t[2]=c,t[3]=l);let u=l,d;t[4]!==c||t[5]!==a?(d=async()=>{if(c==null)throw Error(`connector logo requests are required`);return Da({queryClient:a,requests:c})},t[4]=c,t[5]=a,t[6]=d):d=t[6];let f=c!=null&&c.length>0,p;t[7]!==u||t[8]!==d||t[9]!==f?(p={queryKey:u,queryFn:d,enabled:f,staleTime:G.INFINITE},t[7]=u,t[8]=d,t[9]=f,t[10]=p):p=t[10];let m=W(p),h;bb0:{if(o==null){h=void 0;break bb0}let e;t[11]!==o||t[12]!==m.data?(e=Oa({apps:o,connectorLogoSrcByCacheKey:m.data}),t[11]=o,t[12]=m.data,t[13]=e):e=t[13],h=e}return h}function pa(e){return $i(e)}function ma(e){let t=(0,Z.c)(2),n;t[0]===e?n=t[1]:(n=Ta(e),t[0]=e,t[1]=n);let{data:r}=W(n);return r??void 0}function ha(e){let t=(0,Z.c)(8),n;t[0]===e?n=t[1]:(n=e===void 0?{}:e,t[0]=e,t[1]=n);let{hostId:r}=n,i;t[2]===r?i=t[3]:(i={hostId:r},t[2]=r,t[3]=i);let{data:a}=da(i),o;t[4]===a?o=t[5]:(o=a===void 0?[]:a,t[4]=a,t[5]=o);let s=o,c;return t[6]===s?c=t[7]:(c=xa(s),t[6]=s,t[7]=c),c}function ga(e){let t=(0,Z.c)(4),n;t[0]===e?n=t[1]:(n=e===void 0?{}:e,t[0]=e,t[1]=n);let{hostId:r}=n,i;t[2]===r?i=t[3]:(i={hostId:r},t[2]=r,t[3]=i);let a=ha(i);return fa({apps:a})??a}function _a(e){let t=(0,Z.c)(5),n=e??``,r;t[0]===n?r=t[1]:(r=ii(n,{includeActions:!0}),t[0]=n,t[1]=r);let i=e!=null,a;return t[2]!==r||t[3]!==i?(a={...r,enabled:i,staleTime:G.FIVE_MINUTES,select:va},t[2]=r,t[3]=i,t[4]=a):a=t[4],W(a)}function va(e){let{actions:t}=e;return Gi({actions:t})}function ya(e){let t=(0,Z.c)(7),n;t[0]===e?n=t[1]:(n=e.map(ba),t[0]=e,t[1]=n);let r;t[2]===n?r=t[3]:(r={queries:n},t[2]=n,t[3]=r);let i=Pe(r),a;return t[4]!==e||t[5]!==i?(a=new Map,i.forEach((t,n)=>{let r=t.data?.owner_profile?.email?.trim();r==null||r.length===0||a.set(e[n],r)}),t[4]=e,t[5]=i,t[6]=a):a=t[6],a}function ba(e){return{queryKey:[...Pa,e],queryFn:async()=>(await L.safeGet(`/aip/connectors/{connector_id}/link`,{parameters:{path:{connector_id:e}}})).link,retry:!1,staleTime:G.FIVE_MINUTES}}function xa(e){return e.filter(e=>e.isAccessible&&e.isEnabled)}async function Sa({forceRefetch:e,hostId:t}){try{let n=async r=>{let i=await s(`list-apps`,{hostId:t,cursor:r,limit:Ma,forceRefetch:e});return i.nextCursor==null?i.data:[...i.data,...await n(i.nextCursor)]};return Oa({apps:await n(null)})}catch(e){throw Te.error(`Failed to load apps list`,{safe:{error:String(e)},sensitive:{}}),e instanceof Error?e:Error(String(e))}}async function Ca({forceRefetch:e,hostId:t}){try{return await Sa({forceRefetch:e,hostId:t})}catch{return Sa({forceRefetch:e,hostId:t})}}function wa(e){return[...La,e]}function Ta(e){return{queryKey:[...Fa,$i(e)],queryFn:async()=>{try{return await ea(e)}catch{return null}},retry:!1,staleTime:G.INFINITE}}function Ea(e){let t=new Map;return e.forEach(e=>{let{logoUrl:n,logoUrlDark:r}=ka(e),i=Qi(n);i!=null&&t.set($i(i),i);let a=Qi(r);a!=null&&t.set($i(a),a)}),Array.from(t.values())}async function Da({queryClient:e,requests:t}){let n=new Map,r=0;return await Promise.all(Array.from({length:Math.min(t.length,Na)},async()=>{for(;;){let i=t[r];if(r+=1,i==null)return;let a=await e.fetchQuery(Ta(i));a!=null&&n.set($i(i),a)}})),n}function Oa({apps:e,connectorLogoSrcByCacheKey:t}){let n=!1,r=e.map(e=>{let r=ka(e),i=Aa({logoUrl:r.logoUrl,installUrl:e.installUrl,connectorLogoSrcByCacheKey:t}),a=Aa({logoUrl:r.logoUrlDark,installUrl:e.installUrl,connectorLogoSrcByCacheKey:t});return i===e.logoUrl&&a===e.logoUrlDark?e:(n=!0,{...e,logoUrl:i,logoUrlDark:a})});return n?r:e}function ka(e){let t=e.iconAssets?.[`256_square`],n=e.iconDarkAssets?.[`256_square`];if(t==null&&n==null)return{logoUrl:e.logoUrl,logoUrlDark:e.logoUrlDark};let r=t??e.logoUrl??n??e.logoUrlDark;return{logoUrl:r,logoUrlDark:n??e.logoUrlDark??t??r}}function Aa({logoUrl:e,installUrl:t,connectorLogoSrcByCacheKey:n}){let r=e?.trim();if(r==null||r.length===0)return null;let i=ja({logoUrl:r,installUrl:t});if(n==null)return i;let a=Qi(i);return a==null?i:n.get($i(a))??i}function ja({logoUrl:e,installUrl:t}){if(!e.startsWith(`/`))return e;let n=t?.trim();if(n==null||n.length===0)return e;try{return new URL(e,n).toString()}catch{return e}}var Z,Ma,Na,Pa,Fa,Ia,La,Ra,za=e((()=>{Z=r(),_e(),H(),Ve(),Ti(),Zi(),ia(),ue(),ca(),ie(),F(),Fe(),x(),N(),Ma=1e3,Na=8,Pa=[`apps`,`link`],Fa=[`connector-logo-src`],Ia=[`connector-logos`],La=[`apps`,`list`],Ra=Be(Le,e=>la(e))})),Ba=n(((e,t)=>{var n=f();t.exports=function(){try{var e=n(Object,`defineProperty`);return e({},``,{}),e}catch{}}()}));function Va(e){let t=(0,Ka.c)(31),{hostId:n,marketplacePath:r,pluginName:i,remoteMarketplaceName:a,enabled:o}=e,c=o===void 0?!0:o,l=n??`local`,u;t[0]===l?u=t[1]:(u={hostId:l},t[0]=l,t[1]=u);let d=St(u),f=we(),p;t[2]===i?p=t[3]:(p=i!=null&&Or(i),t[2]=i,t[3]=p);let m=p,h;t[4]!==l||t[5]!==m?(h={enabled:m,hostId:l},t[4]=l,t[5]=m,t[6]=h):h=t[6];let g=st(h),_=(r!=null||a!=null)&&i!=null,v=d&&c&&_&&m&&g.isLoading,y=d&&c&&_&&(!m||g.available),b;t[7]!==l||t[8]!==r||t[9]!==i||t[10]!==a?(b=Ua({hostId:l,marketplacePath:r,pluginName:i,remoteMarketplaceName:a}),t[7]=l,t[8]=r,t[9]=i,t[10]=a,t[11]=b):b=t[11];let x;t[12]!==l||t[13]!==r||t[14]!==i||t[15]!==f||t[16]!==a?(x=async()=>{if(i==null)throw Error(`plugin detail query requires pluginName`);let{plugin:e}=await s(`read-plugin`,{hostId:l,...tr({marketplacePath:r,remoteMarketplaceName:a}),pluginName:i}),t=e.summary.interface,n=K(t?.logo,l,f),o=K(t?.logoDark,l,f),c=K(t?.composerIcon,l,f),u=Promise.all(e.skills.map(async e=>{if(e.interface==null)return null;let[t,n]=await Promise.all([K(e.interface.iconSmall,l,f),K(e.interface.iconLarge,l,f)]);return{iconSmallDataUrl:t,iconLargeDataUrl:n}})),[d,p,m,h]=await Promise.all([c,n,o,u]);return Ga(e,{composerIconDataUrl:d,logoDataUrl:p,logoDarkDataUrl:m,skillImageDataUrls:h})},t[12]=l,t[13]=r,t[14]=i,t[15]=f,t[16]=a,t[17]=x):x=t[17];let S;t[18]!==y||t[19]!==b||t[20]!==x?(S={queryKey:b,queryFn:x,enabled:y,staleTime:G.FIVE_MINUTES},t[18]=y,t[19]=b,t[20]=x,t[21]=S):S=t[21];let C=W(S);if(!y){let e;return t[22]===v?e=t[23]:(e={errorMessage:null,isLoading:v,plugin:null,refetch:Ha},t[22]=v,t[23]=e),e}let w=C.error?String(C.error.message):null,T=C.data??null,E;t[24]===C?E=t[25]:(E=async()=>{await C.refetch()},t[24]=C,t[25]=E);let D;return t[26]!==C.isLoading||t[27]!==E||t[28]!==w||t[29]!==T?(D={errorMessage:w,isLoading:C.isLoading,plugin:T,refetch:E},t[26]=C.isLoading,t[27]=E,t[28]=w,t[29]=T,t[30]=D):D=t[30],D}async function Ha(){}function Ua({hostId:e,marketplacePath:t,pluginName:n,remoteMarketplaceName:r}){return[...qa,e,t??``,r??``,n??``]}function Wa(e){return qa.every((t,n)=>e[n]===t)}function Ga(e,{logoDataUrl:t,logoDarkDataUrl:n,composerIconDataUrl:r,skillImageDataUrls:i}){let a=e.summary.interface,o=e.skills.map((e,t)=>{let n=i[t]??null;return e.interface==null||n==null?e:{...e,interface:{...e.interface,...n.iconSmallDataUrl==null?{}:{iconSmall:n.iconSmallDataUrl},...n.iconLargeDataUrl==null?{}:{iconLarge:n.iconLargeDataUrl}}}}),s=a!=null&&(r!=null||t!=null||n!=null);return{...e,summary:s?{...e.summary,interface:{...a,...r==null?{}:{composerIcon:r},...t==null?{}:{logo:t},...n==null?{}:{logoDark:n}}}:e.summary,skills:o}}var Ka,qa,Ja=e((()=>{Ka=r(),_e(),Ve(),pt(),Et(),$n(),ri(),F(),x(),qa=[`plugins`,`detail`]})),Ya=n(((e,t)=>{var n=o(),r=U(),i=ne(),a=n?n.isConcatSpreadable:void 0;function s(e){return i(e)||r(e)||!!(a&&e&&e[a])}t.exports=s})),Xa=n(((e,t)=>{var n=l(),r=Ya();function i(e,t,a,o,s){var c=-1,l=e.length;for(a||=r,s||=[];++c<l;){var u=e[c];t>0&&a(u)?t>1?i(u,t-1,a,o,s):n(s,u):o||(s[s.length]=u)}return s}t.exports=i})),Za=n(((e,t)=>{function n(e,t,n){switch(n.length){case 0:return e.call(t);case 1:return e.call(t,n[0]);case 2:return e.call(t,n[0],n[1]);case 3:return e.call(t,n[0],n[1],n[2])}return e.apply(t,n)}t.exports=n})),Qa=n(((e,t)=>{var n=Za(),r=Math.max;function i(e,t,i){return t=r(t===void 0?e.length-1:t,0),function(){for(var a=arguments,o=-1,s=r(a.length-t,0),c=Array(s);++o<s;)c[o]=a[t+o];o=-1;for(var l=Array(t+1);++o<t;)l[o]=a[o];return l[t]=i(c),n(e,this,l)}}t.exports=i})),$a=n(((e,t)=>{function n(e){return function(){return e}}t.exports=n})),eo=n(((e,t)=>{var n=$a(),r=Ba(),i=xe();t.exports=r?function(e,t){return r(e,`toString`,{configurable:!0,enumerable:!1,value:n(t),writable:!0})}:i})),to=n(((e,t)=>{var n=800,r=16,i=Date.now;function a(e){var t=0,a=0;return function(){var o=i(),s=r-(o-a);if(a=o,s>0){if(++t>=n)return arguments[0]}else t=0;return e.apply(void 0,arguments)}}t.exports=a})),no=n(((e,t)=>{var n=eo();t.exports=to()(n)})),ro=n(((e,t)=>{var n=xe(),r=Qa(),i=no();function a(e,t){return i(r(e,t,n),e+``)}t.exports=a})),io=n(((e,t)=>{var n=A(),r=me(),i=Se(),a=ee();function o(e,t,o){if(!a(o))return!1;var s=typeof t;return(s==`number`?r(o)&&i(t,o.length):s==`string`&&t in o)?n(o[t],e):!1}t.exports=o})),ao=n(((e,t)=>{var n=Xa(),r=ae(),i=ro(),a=io();t.exports=i(function(e,t){if(e==null)return[];var i=t.length;return i>1&&a(e,t[0],t[1])?t=[]:i>2&&a(t[0],t[1],t[2])&&(t=[t[0]]),r(e,n(t,1),[])})}));function oo(e){return e===ho}function Q(e){return oo(e?.availability)}function so(e){let t=(0,po.c)(14),{hostId:n,pluginApps:r,pluginSummary:i,marketplacePath:a,pluginName:o,remoteMarketplaceName:s}=e,c=r==null&&(a!=null||s!=null)&&o!=null,l=a??null,u=o??null,d=s??null,f;t[0]!==n||t[1]!==c||t[2]!==l||t[3]!==u||t[4]!==d?(f={hostId:n,marketplacePath:l,pluginName:u,remoteMarketplaceName:d,enabled:c},t[0]=n,t[1]=c,t[2]=l,t[3]=u,t[4]=d,t[5]=f):f=t[5];let{isLoading:p,plugin:m}=Va(f),h=r??m?.apps??[],g=i??m?.summary,_=g?.source.type===`remote`,v=Array.from(new Set(h.map(fo).filter(uo))),y=v.length>0,b;t[6]!==n||t[7]!==y?(b={enabled:y,hostId:n},t[6]=n,t[7]=y,t[8]=b):b=t[8];let{data:x,isLoading:S,loadError:C}=da(b),w=x===void 0?[]:x,T=Pe({queries:v.map(lo)}),E;t[9]!==T||t[10]!==S||t[11]!==p||t[12]!==c?(E=c&&p||S||T.some(co),t[9]=T,t[10]=S,t[11]=p,t[12]=c,t[13]=E):E=t[13];let D=E,O=!0,k=0,A={};for(let[e,t]of v.entries()){let n=T[e],r=!S&&C==null&&!w.some(e=>e.id===t),i=null;n?.data?.status===mo?i=`disabled-by-admin`:(r||n!=null&&!n.isPending&&n.error==null&&n.data==null)&&(i=`connector-unavailable`),A[t]=i,i!=null&&(k+=1),i!==`disabled-by-admin`&&(O=!1)}let j=null;return _&&Q(g)?j=`disabled-by-admin`:!_&&v.length>0&&k===v.length&&(j=O?`disabled-by-admin`:`connector-unavailable`),{blockedReasonsByConnectorId:A,isConnectorAvailabilityLoading:D,isLoading:!_&&D,blockedReason:j}}function co(e){return e.isPending}function lo(e){return ii(e)}function uo(e){return e.length>0}function fo(e){return e.id}var po,mo,ho,go=e((()=>{po=r(),_e(),Ti(),za(),Ja(),mo=`DISABLED_BY_ADMIN`,ho=`DISABLED_BY_ADMIN`}));function _o({directoryApps:e,pluginApps:t}){let n=new Map(e.map(e=>[e.id,e]));return t.map(e=>{let t=n.get(e.id);if(t==null||t.name===t.id)return null;let r=e.category?.trim()||yo(t);if(!r)return t;let i=t.branding??{category:null,developer:null,website:null,privacyPolicy:null,termsOfService:null,isDiscoverableApp:!1};return{...t,branding:{...i,category:r}}}).filter(e=>e!=null)}function vo({directoryApps:e,appTemplates:t}){if(!Array.isArray(t))return[];let n=new Map(e.map(e=>[e.id,e]));return t.map(e=>{let t=(e.canonicalConnectorId==null?void 0:n.get(e.canonicalConnectorId))??n.get(e.templateId);return t==null?e:{...e,category:e.category?.trim()||yo(t),description:e.description||t.description,logoUrl:e.logoUrl||t.logoUrl,logoUrlDark:e.logoUrlDark||t.logoUrlDark}})}function yo(e){return e.branding?.category?.trim()||e.appMetadata?.categories?.find(e=>e.trim())?.trim()||null}function bo(e,t,n){return!xo(e,t)||n.type!==`local`?null:n.path}function xo(e,t){return e==null||t==null?!1:ke(t)===ke(T(S(e),Eo))}function So({installedSkills:e,pluginName:t,pluginSkills:n}){let r=Co(e),i=[],a=[];for(let e of n){let n=wo(t,e,r);if(n!=null){i.push({installedSkill:n,pluginSkill:e});continue}a.push(e)}return{installedSkills:i,unavailableSkills:a}}function Co(e){let t=new Map,n=new Map,r=new Map;for(let{skill:i}of e){r.set(i.path,i),n.set(i.name,i);let e=To(i.name),a=t.get(e);if(a==null){t.set(e,[i]);continue}a.push(i)}return{byComparableKey:t,byName:n,byPath:r}}function wo(e,t,n){let r=t.path?n.byPath.get(t.path):void 0;if(r!=null)return r;let i=e.trim(),a=t.name;if(!t.path&&!a.includes(`:`)){if(!i)return null;a=`${i}:${a}`}let o=n.byName.get(a);if(o!=null)return o;let s=n.byComparableKey.get(To(a));return s?.length===1?s[0]:null}function To(e){return(e??``).trim().toLowerCase().split(`:`).map(e=>e.replace(/[\s_-]+/g,``)).join(`:`)}var Eo,Do=e((()=>{R(),Eo=`.agents/plugins/marketplace.json`}));function $(e){return e.trim().toLowerCase()}function Oo(e){return $(e).replace(/[_-]+/g,` `)}function ko(e){return Nr(e)?`Built by OpenAI`:e}function Ao(e){switch(Oo(e)){case`codex official`:case`openai curated`:case`openai curated remote`:return!0;default:return!1}}function jo(e){return e.some(e=>Ao(e.marketplaceName)||e.marketplaceDisplayName!=null&&Ao(e.marketplaceDisplayName))}function Mo(e){return Nr(e.marketplaceName)||e.marketplaceDisplayName!=null&&Nr(e.marketplaceDisplayName)}function No(e,t){if(e.length===0)return!0;let n=Po(e);return Po(t.join(` `)).includes(n)}function Po(e){return e.toLowerCase().replace(/[^a-z0-9]+/g,` `).trim()}function Fo(e){return[e.plugin.name,e.displayName??``,...e.keywords??[]]}function Io(e){let t=e.plugin.remotePluginId??e.plugin.shareContext?.remotePluginId;return t==null?`plugin:${q(e)}:${e.plugin.id}`:`remote:${t}`}function Lo(e){let t=new Set,n=[];for(let r of e){let e=q(r),i=r.marketplaceDisplayName?.trim()||r.marketplaceName;i.trim().length!==0&&(t.has(e)||(t.add(e),n.push({label:ko(i),subLabelSource:r.marketplacePath==null?r.remoteMarketplaceName:Ro(r.marketplacePath),value:e})))}let r=new Map,i=new Map;for(let e of n){let t=i.get(e.label);if(t==null){i.set(e.label,[e]);continue}t.push(e)}for(let e of i.values()){if(e.length<=1)continue;let t=zo(e.map(e=>e.subLabelSource));for(let[n,i]of e.entries())r.set(i.value,t[n])}return n.sort((e,t)=>{let n=Vo(e.label)-Vo(t.label);return n===0?e.label.localeCompare(t.label)||(r.get(e.value)??``).localeCompare(r.get(t.value)??``):n}).map(e=>({label:e.label,subLabel:r.get(e.value)??null,value:e.value}))}function Ro(e){let t=S(e).replace(/\/+$/,``);return t.endsWith(as)?t.slice(0,-33):t.endsWith(os)?t.slice(0,-17):t}function zo(e){let t=e.map(e=>S(e).replace(/\/+$/,``).split(`/`).filter(Boolean)),n=Math.max(1,...t.map(e=>e.length));for(let e=1;e<=n;e++){let n=t.map(t=>Bo(t,e));if(new Set(n).size===n.length)return n}return e.map(e=>S(e))}function Bo(e,t){let n=e.slice(-t).join(`/`);return n.length===0?``:t===1?n:e.length>t?`.../${n}`:n}function Vo(e){switch(Oo(e)){case`built by openai`:return 0;case`chatgpt official`:return 1;default:return 2}}function Ho({dedupeSearchResults:e=!1,plugins:t,marketplaceFilterValue:n=null,query:r}){let i=t.filter(e=>No(r,Fo(e))?n==null?!0:q(e)===n&&(e.marketplaceDisplayName?.trim()||e.marketplaceName).trim().length>0:!1);if(!e)return ts(i);let a=new Map;for(let e of i){let t=Io(e),n=a.get(t);(n==null||!n.plugin.installed&&e.plugin.installed)&&a.set(t,e)}return ts(Array.from(a.values()))}function Uo({plugins:e,query:t}){let n=Po(t);if(n.length===0)return Ho({dedupeSearchResults:!0,plugins:e,query:t});let r=new Map;for(let[t,i]of e.entries()){let e=Go(i,n),a=Io(i),o=r.get(a);if(o==null){r.set(a,{catalogIndex:t,matchRank:e,plugin:i});continue}o.matchRank=Math.min(o.matchRank,e),!o.plugin.plugin.installed&&i.plugin.installed&&(o.plugin=i)}return(0,rs.default)(Array.from(r.values()).filter(({matchRank:e})=>e<ss),[({matchRank:e})=>e,({plugin:e})=>Q(e.plugin),({catalogIndex:e})=>e]).map(({plugin:e})=>e)}function Wo({query:e,sections:t}){let n=new Map;for(let{plugins:e,section:r}of t)for(let t of e){let e=Io(t);n.has(e)||n.set(e,r.id)}let r=new Map;for(let i of Uo({plugins:t.flatMap(({plugins:e})=>e),query:e})){let e=n.get(Io(i));if(e==null)continue;let t=r.get(e)??[];t.push(i),r.set(e,t)}return t.flatMap(e=>{let t=r.get(e.section.id)??[];return t.length===0?[]:[{...e,plugins:t}]})}function Go(e,t){let n=Po(e.displayName??``),r=Po(e.plugin.name),i=[n,r],a=(e.keywords??[]).map(Po),o=[n===t,r===t,i.some(e=>e.startsWith(t)),i.some(e=>e.includes(t)),a.includes(t),a.some(e=>e.includes(t))||No(t,Fo(e))].findIndex(e=>e);return o===-1?ss:o}function Ko(e){return e.filter(e=>{let t=ge(e.plugin.id);return e.plugin.name!==`browser`||t==null||!u(t)})}function qo(e){return e.find(e=>e.plugin.name===`record-and-replay`&&u(e.marketplaceName))??null}function Jo({availablePlugins:e,createdByMeRemotePlugins:t,homeDirectory:n,pluginShares:r,storefrontPlugins:i}){let a=e.find(e=>xo(n,e.marketplacePath)),o=a==null?null:q(a),s=i.filter(e=>o!=null&&q(e)===o),c=Yo(t,r,s);return{marketplaceFilterValue:o,plugins:[...s,...c]}}function Yo(e,t,n){let r=new Set([...n.flatMap(e=>{let t=e.plugin.shareContext?.remotePluginId;return t==null?[]:[t]}),...t?.flatMap(({localPluginPath:e,plugin:t})=>{if(e==null)return[];if(t.remotePluginId==null)throw Error(`remote plugin share ${t.id} is missing remotePluginId`);return[t.remotePluginId]})??[]]),i=[];for(let t of e??[]){let e=t.plugin.remotePluginId;if(e==null)throw Error(`created by me remote plugin ${t.plugin.id} is missing remotePluginId`);r.has(e)||(r.add(e),i.push(t))}if(t==null)return i;for(let{plugin:e}of t){let t=e.remotePluginId;if(t==null)throw Error(`remote plugin share ${e.id} is missing remotePluginId`);if(r.has(t))continue;let n=ge(e.id);if(n==null)throw Error(`remote plugin share ${e.id} is missing marketplace name`);r.add(t),i.push({...Br(e),description:e.interface?.shortDescription??null,displayName:e.interface?.displayName??null,marketplaceDisplayName:null,marketplaceName:n,marketplacePath:null,plugin:e,keywords:e.keywords,remoteMarketplaceName:n})}return i}function Xo(e){return e.filter(e=>e.plugin.installed&&e.plugin.enabled&&!Q(e.plugin))}function Zo({installedPlugins:e,sharedWithYouPlugins:t,workspacePlugins:n}){let r=new Map(e.map(e=>[e.plugin.id,e]));for(let e of[...t,...n])!e.plugin.installed||r.has(e.plugin.id)||r.set(e.plugin.id,e);return Array.from(r.values())}function Qo(e,t){let n=new Map(e.map(e=>[e.plugin.id,e])),r=[];for(let e of t){let t=n.get(e);t!=null&&r.push(t)}return r}function $o({categoryOrder:e=[],categorySections:t=[],collapsedCategoryIds:n=[],plugins:r,connectedPlugins:i=r,featuredPluginIds:a}){let o=es(i.filter(e=>e.plugin.installed)),s=a==null?[]:Qo(r,(0,is.default)([...cs,...a])),c=new Set(n.map($)),l=new Map;for(let e of t){let t=$(e.id);if(t===`featured`)continue;let n=l.get(t)??new Set;for(let t of e.pluginIds)n.add(t);l.set(t,n)}let u=new Map;for(let e of r){let t=e.plugin.interface?.category??`Other`,n=c.has($(t))?`Other`:t,r=u.get(n);if(r==null){u.set(n,[e]);continue}r.push(e)}let d=new Map(e.map((e,t)=>[$(e),t])),f=Array.from(u.entries()).sort(([t],[n])=>{let r=d.get($(t))??e.length,i=d.get($(n))??e.length;return r===i?t.localeCompare(n):r-i}).map(([e,t])=>{let n=l.get($(e));return{section:{id:`plugins-${$(e).replaceAll(` `,`-`)}`,title:e},plugins:ts(t,n),visibleItemLimit:n==null?void 0:t.filter(e=>ns(e,n)).length||void 0}});return[...o.length>0?[{section:{id:`plugins-connected`,title:null},plugins:o}]:[],...s.length>0?[{section:{id:`plugins-featured`,title:`Featured`},plugins:s}]:[],...f]}function es(e){return e.sort((e,t)=>{let n=Q(e.plugin);return n===Q(t.plugin)?n||e.plugin.installed===t.plugin.installed?0:e.plugin.installed?1:-1:n?1:-1})}function ts(e,t){return e.sort((e,n)=>{let r=ns(e,t);if(r!==ns(n,t))return r?-1:1;let i=Q(e.plugin);return i===Q(n.plugin)?0:i?1:-1})}function ns(e,t){return t?.has(e.plugin.id)===!0||e.plugin.remotePluginId!=null&&t?.has(e.plugin.remotePluginId)===!0}var rs,is,as,os,ss,cs,ls=e((()=>{rs=t(ao(),1),is=t(Wi(),1),C(),Do(),ri(),R(),go(),as=`/.agents/plugins/marketplace.json`,os=`/marketplace.json`,ss=6,cs=[`computer-use@${I}`,`${Ce}@${I}`,`chrome@${I}`,`chrome-internal@${I}`,`spreadsheets@openai-primary-runtime`,`presentations@openai-primary-runtime`]}));export{Ui as $,Xe as $t,Ja as A,Cr as At,za as B,Et as Bt,ao as C,or as Ct,Qa as D,Or as Dt,no as E,Nr as Et,wa as F,K as Ft,ma as G,mt as Gt,_a as H,xt as Ht,la as I,Jt as It,ca as J,at as Jt,ha as K,pt as Kt,Oa as L,qt as Lt,Va as M,fr as Mt,Ba as N,Yn as Nt,Xa as O,Dr as Ot,Ra as P,$n as Pt,Wi as Q,Qe as Qt,xa as R,Dt as Rt,so as S,ar as St,ro as T,Fr as Tt,da as U,vt as Ut,ya as V,St as Vt,fa as W,_t as Wt,Qi as X,nt as Xt,aa as Y,rt as Yt,ia as Z,$e as Zt,bo as _,q as _t,qo as a,li as at,go as b,ir as bt,Ho as c,Ti as ct,$o as d,J as dt,Ye as en,Hi as et,Ko as f,er as ft,So as g,hr as gt,_o as h,Br as ht,Mo as i,ci as it,Wa as j,lr as jt,Ua as k,Er as kt,Zo as l,oi as lt,vo as m,vr as mt,jo as n,Ke as nn,Pi as nt,Jo as o,di as ot,Wo as p,zr as pt,ga as q,st as qt,ls as r,ui as rt,Xo as s,ai as st,ko as t,qe as tn,Fi as tt,Lo as u,si as ut,Do as v,nr as vt,io as w,ri as wt,Q as x,Ir as xt,xo as y,sr as yt,ua as z,Ot as zt};
//# sourceMappingURL=app-initial~app-main~plugin-detail-page~new-thread-panel-page~appgen-library-page~hotkey-wi~hniebsu0-lmfQ_Zys.js.map