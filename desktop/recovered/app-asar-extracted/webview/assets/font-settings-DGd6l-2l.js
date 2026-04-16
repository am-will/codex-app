import{s as e}from"./chunk-Bj-mKKzh.js";import{t}from"./react-BE0_fAZJ.js";import{o as n,t as r}from"./logger-BJWlfVIC.js";import{A as i,B as a,Gn as o,Gr as s,Hr as c,O as l,St as u,T as d,Un as f,Vr as p,_r as m,ai as h,c as g,gr as _,hr as v,lr as y,tr as b,u as x,wt as S,yt as C}from"./vscode-api-kDc0kKRJ.js";import{Ir as w,K as T,M as E,en as D,fn as O,nn as k,sn as A,tn as j,u as M,un as N,vt as P}from"./app-server-manager-signals-DfI-VLch.js";import{i as F,t as ee}from"./use-is-dark-CLPAyTmK.js";import{t as I}from"./jsx-runtime-ebkFq_df.js";import{n as te}from"./use-window-type-C2XI1mLn.js";import{b as L,f as R,m as ne}from"./config-queries-DYEwzXNm.js";import{i as re,r as ie}from"./statsig-axnzwuK0.js";import{n as ae,t as oe}from"./use-auth-DtIU_BbB.js";import{$ as se,A as ce,C as le,D as ue,E as de,G as fe,J as pe,K as me,M as z,O as he,Q as ge,S as _e,W as B,X as ve,Y as V,Z as ye,_ as be,a as xe,at as Se,ct as Ce,dt as we,et as H,f as Te,ft as Ee,g as De,h as Oe,ht as ke,it as Ae,j as je,lt as Me,mt as Ne,n as Pe,nt as Fe,ot as Ie,pt as Le,q as U,r as Re,rt as ze,s as Be,st as Ve,tt as He,ut as Ue,v as We,w as Ge}from"./use-resolved-theme-variant-B-z-MCIR.js";import{d as Ke}from"./composer-atoms-BnKIUgCZ.js";var qe=`gpt-5.3-codex`,Je=`medium`,Ye=[`minimal`,`low`,`medium`,`high`,`xhigh`],W=n(),Xe=[],Ze={availableModels:new Set(Xe),useHiddenModels:!1,defaultModel:qe};function Qe(){let e=(0,W.c)(3),t;e[0]===Symbol.for(`react.memo_cache_sentinel`)?(t=`107580212`,e[0]=t):t=e[0];let{value:n}=ie(t),r;return e[1]===n?r=e[2]:(r=$e(n),e[1]=n,e[2]=r),r}function $e(e){let t=f(b()).safeParse(e.available_models),n=o().safeParse(e.use_hidden_models),r=b().safeParse(e.default_model);return{availableModels:new Set(t.success?t.data:Xe),useHiddenModels:n.success?n.data:Ze.useHiddenModels,defaultModel:r.success?r.data:Ze.defaultModel}}var et=100,tt=[`models`,`list`];function nt(e,t,n=et){return[...tt,e,t??`no-auth`,n]}function rt(e){let t=(0,W.c)(19),n=e?.hostId??d,r=e?.limit??et,i=m(E),a=ae(n),o=a?.authMethod??null,s=a?.isLoading??!1,c=Qe(),l;t[0]!==o||t[1]!==n||t[2]!==r?(l=nt(n,o,r),t[0]=o,t[1]=n,t[2]=r,t[3]=l):l=t[3];let u;t[4]!==n||t[5]!==s||t[6]!==i?(u=i.includes(n)&&!s,t[4]=n,t[5]=s,t[6]=i,t[7]=u):u=t[7];let f;t[8]!==n||t[9]!==r?(f=()=>P(`list-models-for-host`,{hostId:n,includeHidden:!0,cursor:null,limit:r}),t[8]=n,t[9]=r,t[10]=f):f=t[10];let p;t[11]!==o||t[12]!==c?(p=e=>{let{data:t}=e,n={models:[]},r=null;return t.forEach(e=>{if(c.useHiddenModels?c.availableModels.has(e.model):!e.hidden){let t=o===`copilot`?[e.supportedReasoningEfforts.find(it)??{reasoningEffort:`medium`,description:`medium effort`}]:[...e.supportedReasoningEfforts];n.models.push({...e,supportedReasoningEfforts:t}),r=e.isDefault?e:r}}),r??=n.models.find(e=>e.model===c.defaultModel)??null,{modelsByType:n,defaultModel:r}},t[11]=o,t[12]=c,t[13]=p):p=t[13];let h;return t[14]!==l||t[15]!==u||t[16]!==f||t[17]!==p?(h={queryKey:l,enabled:u,staleTime:g.FIVE_MINUTES,queryFn:f,select:p},t[14]=l,t[15]=u,t[16]=f,t[17]=p,t[18]=h):h=t[18],x(h)}function it(e){return e.reasoningEffort===`medium`}function at(e){return e!==`pending`}function ot(e,t){return(e===`minimal`||e===`low`||e===`medium`||e===`high`||e===`xhigh`)&&t.includes(e)?e:Je}function st(e,t){return t?.models.find(t=>t.model===e)}function ct({userSavedModelString:e,userSavedReasoningEffort:t,listModelsData:n}){let r=e?st(e,n?.modelsByType):n?.defaultModel??st(`gpt-5.3-codex`,n?.modelsByType),i=r?.supportedReasoningEfforts?.map(e=>e.reasoningEffort),a=t&&i&&i.includes(t)?t:r?.defaultReasoningEffort;return{model:r?r.model:e??`gpt-5.3-codex`,reasoningEffort:a??t??n?.defaultModel?.defaultReasoningEffort??`medium`,profile:null,isLoading:!1}}var lt=`fast`;function ut(e){return e?.models.find(e=>G(e)&&!e.hidden)??e?.models.find(e=>G(e))??null}function dt(e,t){let n=st(e,t);return n!=null&&G(n)}function G(e){return e.additionalSpeedTiers?.includes(lt)===!0}function ft(){let e=(0,W.c)(3),{authMethod:t}=oe(),[n]=l(`statsig_default_enable_features`),r;return e[0]!==t||e[1]!==n?.fast_mode?(r=n?.fast_mode===!0&&pt(t),e[0]=t,e[1]=n?.fast_mode,e[2]=r):r=e[2],r}function pt(e){return e===`chatgpt`}function mt(){let e=(0,W.c)(3),t=ft(),{data:n}=rt(),r;return e[0]!==t||e[1]!==n?.modelsByType?(r=t&&(n?.modelsByType.models.some(G)??!1),e[0]=t,e[1]=n?.modelsByType,e[2]=r):r=e[2],r}function ht(e,t){return e?.start===t?.start&&e?.end===t?.end&&e?.side===t?.side&&e?.endSide===t?.endSide}function gt(){return U({tagName:`button`,properties:{"data-utility-button":``,type:`button`},children:[pe({name:`diffs-icon-plus`,properties:{"data-icon":``}})]})}function _t(e,t){return e.lineNumber===t.lineNumber&&e.side===t.side}var vt=class{hoveredLine;pre;gutterUtilityContainer;gutterUtilityButton;gutterUtilitySlot;interactiveLinesAttr=!1;interactiveLineNumbersAttr=!1;hasPointerListeners=!1;hasDocumentPointerListeners=!1;selectedRange=null;renderedSelectionRange;selectionAnchor;queuedSelectionRender;pointerSession={mode:`idle`};constructor(e,t){this.mode=e,this.options=t}setOptions(e){this.options=e}cleanUp(){this.pre?.removeEventListener(`click`,this.handlePointerClick),this.pre?.removeEventListener(`pointerdown`,this.handlePointerDown),this.pre?.removeEventListener(`pointermove`,this.handlePointerMove),this.pre?.removeEventListener(`pointerleave`,this.handlePointerLeave),this.pre?.removeAttribute(`data-interactive-lines`),this.pre?.removeAttribute(`data-interactive-line-numbers`),this.pre=void 0,this.gutterUtilityContainer?.remove(),this.gutterUtilityContainer=void 0,this.gutterUtilityButton=void 0,this.gutterUtilitySlot=void 0,this.clearHoveredLine(),this.detachDocumentPointerListeners(),this.clearPointerSession(),this.queuedSelectionRender!=null&&(cancelAnimationFrame(this.queuedSelectionRender),this.queuedSelectionRender=void 0),this.interactiveLinesAttr=!1,this.interactiveLineNumbersAttr=!1,this.hasPointerListeners=!1}setup(e){this.setSelectionDirty();let{usesCustomGutterUtility:t=!1,enableGutterUtility:n=!1}=this.options;this.pre!==e&&(this.cleanUp(),this.pre=e),n?this.ensureGutterUtilityNode(t):this.gutterUtilityContainer!=null&&(this.gutterUtilityContainer.remove(),this.gutterUtilityContainer=void 0,this.gutterUtilityButton=void 0,this.gutterUtilitySlot=void 0,this.pointerSession.mode===`gutterSelecting`&&(this.clearPointerSession(),this.detachDocumentPointerListeners())),this.syncPointerListeners(e),this.updateInteractiveLineAttributes(),this.renderSelection()}setSelectionDirty(){this.renderedSelectionRange=void 0}isSelectionDirty(){return this.renderedSelectionRange===null}setSelection(e){let t=!(e===this.selectedRange||ht(e??void 0,this.selectedRange??void 0));!this.isSelectionDirty()&&!t||(this.selectedRange=e,this.renderSelection(),t&&this.notifySelectionCommitted())}getSelection(){return this.selectedRange}getHoveredLine=()=>{if(this.hoveredLine!=null){if(this.mode===`diff`&&this.hoveredLine.type===`diff-line`)return{lineNumber:this.hoveredLine.lineNumber,side:this.hoveredLine.annotationSide};if(this.mode===`file`&&this.hoveredLine.type===`line`)return{lineNumber:this.hoveredLine.lineNumber}}};handlePointerClick=e=>{let{onHunkExpand:t,onLineClick:n,onLineNumberClick:r,onMergeConflictActionClick:i}=this.options;t==null&&n==null&&r==null&&i==null||this.options.onGutterUtilityClick!=null&&Et(e.composedPath())||(q(this.options.__debugPointerEvents,`click`,`FileDiff.DEBUG.handlePointerClick:`,e),this.handlePointerEvent({eventType:`click`,event:e}))};handlePointerMove=e=>{let{lineHoverHighlight:t=`disabled`,onLineEnter:n,onLineLeave:r,enableGutterUtility:i=!1}=this.options;t===`disabled`&&!i&&n==null&&r==null||(q(this.options.__debugPointerEvents,`move`,`FileDiff.DEBUG.handlePointerMove:`,e),this.handlePointerEvent({eventType:`move`,event:e}))};handlePointerLeave=e=>{let{__debugPointerEvents:t}=this.options;if(q(t,`move`,`FileDiff.DEBUG.handlePointerLeave: no event`),this.hoveredLine==null){q(t,`move`,`FileDiff.DEBUG.handlePointerLeave: returned early, no .hoveredLine`);return}this.gutterUtilityContainer?.remove(),this.options.onLineLeave?.({...this.hoveredLine,event:e}),this.clearHoveredLine()};handlePointerEvent({eventType:e,event:t}){let{__debugPointerEvents:n}=this.options,r=t.composedPath();q(n,e,`FileDiff.DEBUG.handlePointerEvent:`,{eventType:e,composedPath:r});let i=this.resolvePointerTarget(r);q(n,e,`FileDiff.DEBUG.handlePointerEvent: resolvePointerTarget result:`,i);let{onLineClick:a,onLineNumberClick:o,onLineEnter:s,onLineLeave:c,onHunkExpand:l,onMergeConflictActionClick:u}=this.options;switch(e){case`move`:if(K(i)&&this.hoveredLine?.lineElement===i.lineElement)break;this.hoveredLine!=null&&(this.gutterUtilityContainer?.remove(),c?.({...this.hoveredLine,event:t}),this.clearHoveredLine()),K(i)&&(this.setHoveredLine(this.toEventBaseProps(i)),this.gutterUtilityContainer!=null&&i.numberElement.appendChild(this.gutterUtilityContainer),s?.({...this.hoveredLine,event:t}));break;case`click`:{if(i==null)break;if(St(i)&&u!=null){u(i);break}if(xt(i)&&l!=null){l(i.hunkIndex,t.shiftKey?`both`:i.direction,t.shiftKey?1/0:void 0);break}if(!K(i))break;let e=this.toEventBaseProps(i);o!=null&&i.numberColumn?o({...e,event:t}):a?.({...e,event:t});break}}}syncPointerListeners(e){let{__debugPointerEvents:t,lineHoverHighlight:n=`disabled`,onLineClick:r,onLineNumberClick:i,onLineEnter:a,onLineLeave:o,onHunkExpand:s,onMergeConflictActionClick:c,enableGutterUtility:l=!1,enableLineSelection:u=!1,onGutterUtilityClick:d}=this.options,f=d!=null,p=n!==`disabled`||r!=null||i!=null||s!=null||c!=null||a!=null||o!=null||l||u||f;p&&!this.hasPointerListeners?(e.addEventListener(`click`,this.handlePointerClick),e.addEventListener(`pointerdown`,this.handlePointerDown),e.addEventListener(`pointermove`,this.handlePointerMove),e.addEventListener(`pointerleave`,this.handlePointerLeave),this.hasPointerListeners=!0,q(t,`click`,`FileDiff.DEBUG.attachEventListeners: Attaching click events for:`,(()=>{let e=[];return(t===`both`||t===`click`)&&(r!=null&&e.push(`onLineClick`),i!=null&&e.push(`onLineNumberClick`),s!=null&&e.push(`expandable hunk separators`),c!=null&&e.push(`merge conflict actions`)),e})()),q(t,`move`,`FileDiff.DEBUG.attachEventListeners: Attaching pointer move event`),q(t,`move`,`FileDiff.DEBUG.attachEventListeners: Attaching pointer leave event`)):!p&&this.hasPointerListeners&&(e.removeEventListener(`click`,this.handlePointerClick),e.removeEventListener(`pointerdown`,this.handlePointerDown),e.removeEventListener(`pointermove`,this.handlePointerMove),e.removeEventListener(`pointerleave`,this.handlePointerLeave),this.hasPointerListeners=!1);let m=this.pointerSession.mode===`selecting`||this.pointerSession.mode===`pendingSingleLineUnselect`,h=this.pointerSession.mode===`gutterSelecting`;(!u&&m||!f&&h)&&(this.clearPointerSession(),this.detachDocumentPointerListeners(),this.selectionAnchor=void 0,this.clearPendingSingleLineState())}updateInteractiveLineAttributes(){if(this.pre==null)return;let{onLineClick:e,onLineNumberClick:t,enableLineSelection:n=!1}=this.options,r=e!=null,i=t!=null||n;r&&!this.interactiveLinesAttr?(this.pre.setAttribute(`data-interactive-lines`,``),this.interactiveLinesAttr=!0):!r&&this.interactiveLinesAttr&&(this.pre.removeAttribute(`data-interactive-lines`),this.interactiveLinesAttr=!1),i&&!this.interactiveLineNumbersAttr?(this.pre.setAttribute(`data-interactive-line-numbers`,``),this.interactiveLineNumbersAttr=!0):!i&&this.interactiveLineNumbersAttr&&(this.pre.removeAttribute(`data-interactive-line-numbers`),this.interactiveLineNumbersAttr=!1)}handlePointerDown=e=>{if(e.pointerType===`mouse`&&e.button!==0||this.pre==null||this.pointerSession.mode!==`idle`)return;let t=e.composedPath();Et(t)&&this.options.onGutterUtilityClick!=null?this.startGutterSelectionFromPointerDown(e,t):this.startLineSelectionFromPointerDown(e,t)};startLineSelectionFromPointerDown(e,t){let{enableLineSelection:n=!1}=this.options;if(!n)return;let r=this.getSelectionPointerInfo(t,!0);if(r==null)return;let{pre:i}=this;if(i==null)return;e.preventDefault();let{lineNumber:a,eventSide:o,lineIndex:s}=r;if(e.shiftKey&&this.selectedRange!=null){let t=this.getIndexesFromSelection(this.selectedRange,i.getAttribute(`data-diff-type`)===`split`);if(t==null)return;let n=t.start<=t.end?s>=t.start:s<=t.end;this.selectionAnchor={lineNumber:n?this.selectedRange.start:this.selectedRange.end,side:n?this.selectedRange.side:this.selectedRange.endSide??this.selectedRange.side},this.updateSelection(a,o,!1),this.notifySelectionStart(this.selectedRange),this.pointerSession={mode:`selecting`,pointerId:e.pointerId},this.attachDocumentPointerListeners();return}if(this.selectedRange?.start===a&&this.selectedRange?.end===a){let t={lineNumber:a,side:o};this.selectionAnchor=t,this.pointerSession={mode:`pendingSingleLineUnselect`,pointerId:e.pointerId,anchor:t,pending:t},this.attachDocumentPointerListeners();return}this.selectedRange=null,this.selectionAnchor={lineNumber:a,side:o},this.updateSelection(a,o,!1),this.notifySelectionStart(this.selectedRange),this.pointerSession={mode:`selecting`,pointerId:e.pointerId},this.attachDocumentPointerListeners()}startGutterSelectionFromPointerDown(e,t){let{enableLineSelection:n=!1,onGutterUtilityClick:r}=this.options;if(r==null)return;let i=this.getSelectionPointFromPath(t);i!=null&&(e.preventDefault(),e.stopPropagation(),this.pointerSession={mode:`gutterSelecting`,pointerId:e.pointerId,anchor:i,current:i},n&&(this.selectionAnchor={lineNumber:i.lineNumber,side:i.side},this.updateSelection(i.lineNumber,i.side,!1),this.notifySelectionStart(this.selectedRange)),this.attachDocumentPointerListeners())}handleDocumentPointerMove=e=>{let{enableLineSelection:t=!1}=this.options;switch(this.pointerSession.mode){case`idle`:return;case`gutterSelecting`:{if(e.pointerId!==this.pointerSession.pointerId)return;let n=this.getSelectionPointFromPath(e.composedPath());if(n==null)return;this.pointerSession.current=n,t===!0&&this.updateSelection(n.lineNumber,n.side);return}case`selecting`:{if(e.pointerId!==this.pointerSession.pointerId)return;let t=this.getSelectionPointerInfo(e.composedPath(),!1);if(t==null||this.selectionAnchor==null)return;this.updateSelection(t.lineNumber,t.eventSide);return}case`pendingSingleLineUnselect`:{if(e.pointerId!==this.pointerSession.pointerId)return;let t=this.getSelectionPointerInfo(e.composedPath(),!1);if(t==null||this.selectionAnchor==null)return;let n={lineNumber:t.lineNumber,side:t.eventSide};if(_t(this.pointerSession.pending,n))return;this.updateSelection(t.lineNumber,t.eventSide,!1),this.notifySelectionStart(this.selectedRange),this.notifySelectionChangeDelta(),this.pointerSession={mode:`selecting`,pointerId:e.pointerId};return}}};handleDocumentPointerUp=e=>{let{enableLineSelection:t=!1,onGutterUtilityClick:n}=this.options;switch(this.pointerSession.mode){case`idle`:return;case`gutterSelecting`:{if(e.pointerId!==this.pointerSession.pointerId)return;let r=this.getSelectionPointFromPath(e.composedPath());r!=null&&(this.pointerSession.current=r,t&&this.updateSelection(r.lineNumber,r.side)),n?.(this.buildSelectedLineRange(this.pointerSession.anchor,this.pointerSession.current)),this.selectionAnchor=void 0,t&&(this.notifySelectionEnd(this.selectedRange),this.notifySelectionCommitted()),this.clearPointerSession(),this.detachDocumentPointerListeners();return}case`pendingSingleLineUnselect`:if(e.pointerId!==this.pointerSession.pointerId)return;this.updateSelection(null,void 0,!1),this.selectionAnchor=void 0,this.clearPendingSingleLineState(),this.detachDocumentPointerListeners(),this.notifySelectionEnd(this.selectedRange),this.notifySelectionCommitted();return;case`selecting`:if(e.pointerId!==this.pointerSession.pointerId)return;this.selectionAnchor=void 0,this.detachDocumentPointerListeners(),this.clearPointerSession(),this.notifySelectionEnd(this.selectedRange),this.notifySelectionCommitted()}};handleDocumentPointerCancel=e=>{switch(this.pointerSession.mode){case`idle`:return;case`gutterSelecting`:case`selecting`:case`pendingSingleLineUnselect`:if(`pointerId`in this.pointerSession&&e.pointerId!==this.pointerSession.pointerId)return;this.selectionAnchor=void 0,this.clearPendingSingleLineState(),this.clearPointerSession(),this.detachDocumentPointerListeners()}};clearHoveredLine(){this.hoveredLine!=null&&(this.hoveredLine.lineElement.removeAttribute(`data-hovered`),this.hoveredLine.numberElement.removeAttribute(`data-hovered`),this.hoveredLine=void 0)}setHoveredLine(e){let{lineHoverHighlight:t=`disabled`}=this.options;this.hoveredLine!=null&&this.clearHoveredLine(),this.hoveredLine=e,t!==`disabled`&&((t===`both`||t===`line`)&&this.hoveredLine.lineElement.setAttribute(`data-hovered`,``),(t===`both`||t===`number`)&&this.hoveredLine.numberElement.setAttribute(`data-hovered`,``))}ensureGutterUtilityNode(e){if(this.gutterUtilityContainer??(this.gutterUtilityContainer=document.createElement(`div`),this.gutterUtilityContainer.setAttribute(`data-gutter-utility-slot`,``)),e)this.gutterUtilityButton!=null&&(this.gutterUtilityButton.remove(),this.gutterUtilityButton=void 0),this.gutterUtilitySlot??(this.gutterUtilitySlot=document.createElement(`slot`),this.gutterUtilitySlot.name=`gutter-utility-slot`),this.gutterUtilitySlot.parentNode!==this.gutterUtilityContainer&&this.gutterUtilityContainer.replaceChildren(this.gutterUtilitySlot);else{if(this.gutterUtilitySlot?.remove(),this.gutterUtilitySlot=void 0,this.gutterUtilityButton==null){let e=document.createElement(`div`);e.innerHTML=z(gt());let t=e.firstElementChild;if(!(t instanceof HTMLButtonElement))throw Error(`InteractionManager.ensureGutterUtilityNode: Node element should be a button`);t.remove(),this.gutterUtilityButton=t}this.gutterUtilityButton.parentNode!==this.gutterUtilityContainer&&this.gutterUtilityContainer.replaceChildren(this.gutterUtilityButton)}}attachDocumentPointerListeners(){this.hasDocumentPointerListeners||=(document.addEventListener(`pointermove`,this.handleDocumentPointerMove),document.addEventListener(`pointerup`,this.handleDocumentPointerUp),document.addEventListener(`pointercancel`,this.handleDocumentPointerCancel),!0)}detachDocumentPointerListeners(){this.hasDocumentPointerListeners&&=(document.removeEventListener(`pointermove`,this.handleDocumentPointerMove),document.removeEventListener(`pointerup`,this.handleDocumentPointerUp),document.removeEventListener(`pointercancel`,this.handleDocumentPointerCancel),!1)}clearPointerSession(){this.pointerSession={mode:`idle`}}clearPendingSingleLineState(){this.pointerSession.mode===`pendingSingleLineUnselect`&&(this.pointerSession={mode:`idle`})}getSelectionPointerInfo(e,t){let n=this.resolvePointerTarget(e);if(K(n)&&!(t&&!n.numberColumn)&&n.splitLineIndex!=null)return{lineIndex:n.splitLineIndex,lineNumber:n.lineNumber,eventSide:this.mode===`diff`?n.side:void 0}}getSelectionPointFromPath(e){let t=this.resolvePointerTarget(e);if(K(t))return{lineNumber:t.lineNumber,side:this.mode===`diff`?t.side:void 0}}getLineIndex(e,t){let{getLineIndex:n}=this.options;return n==null?[e-1,e-1]:n(e,t)}updateSelection(e,t,n=!0){let{selectedRange:r}=this,i;if(e==null)i=null;else{let n=this.selectionAnchor?.side??t,r=this.selectionAnchor?.lineNumber??e;i=this.buildSelectionRange(r,e,n,t)}ht(r??void 0,i??void 0)||(this.selectedRange=i,n&&this.notifySelectionChangeDelta(),this.queuedSelectionRender??=requestAnimationFrame(this.renderSelection))}getIndexesFromSelection(e,t){if(this.pre==null)return;let n=this.getLineIndex(e.start,e.side),r=this.getLineIndex(e.end,e.endSide??e.side);return n!=null&&r!=null?{start:t?n[1]:n[0],end:t?r[1]:r[0]}:void 0}renderSelection=()=>{if(this.queuedSelectionRender!=null&&(cancelAnimationFrame(this.queuedSelectionRender),this.queuedSelectionRender=void 0),this.pre==null||this.renderedSelectionRange===this.selectedRange)return;let e=this.pre.querySelectorAll(`[data-selected-line]`);for(let t of e)t.removeAttribute(`data-selected-line`);if(this.renderedSelectionRange=this.selectedRange,this.selectedRange==null)return;let{children:t}=this.pre;if(t.length===0)return;if(t.length>2)throw console.error(t),Error(`InteractionManager.renderSelection: Somehow there are more than 2 code elements...`);let n=this.pre.getAttribute(`data-diff-type`)===`split`,r=this.getIndexesFromSelection(this.selectedRange,n);if(r==null)throw console.error({rowRange:r,selectedRange:this.selectedRange}),Error(`InteractionManager.renderSelection: No valid rowRange`);let i=r.start===r.end,a=Math.min(r.start,r.end),o=Math.max(r.start,r.end);for(let e of t){let[t,r]=e.children,s=r.children.length;if(s!==t.children.length)throw Error(`InteractionManager.renderSelection: gutter and content children dont match, something is wrong`);for(let e=0;e<s;e++){let s=r.children[e],c=t.children[e];if(!(s instanceof HTMLElement)||!(c instanceof HTMLElement))continue;let l=this.parseLineIndex(s,n);if((l??0)>o)break;if(l==null||l<a)continue;let u=i?`single`:l===a?`first`:l===o?`last`:``;s.setAttribute(`data-selected-line`,u),c.setAttribute(`data-selected-line`,u),c.nextSibling instanceof HTMLElement&&s.nextSibling instanceof HTMLElement&&(s.nextSibling.hasAttribute(`data-line-annotation`)||s.nextSibling.hasAttribute(`data-merge-conflict-actions`))&&(i?(u=`last`,s.setAttribute(`data-selected-line`,`first`)):l===a?u=``:l===o&&s.setAttribute(`data-selected-line`,``),s.nextSibling.setAttribute(`data-selected-line`,u),c.nextSibling.setAttribute(`data-selected-line`,u))}}};notifySelectionCommitted(){this.options.onLineSelected?.(this.selectedRange??null)}notifySelectionChangeDelta(){this.options.onLineSelectionChange?.(this.selectedRange??null)}notifySelectionStart(e){this.options.onLineSelectionStart?.(e)}notifySelectionEnd(e){this.options.onLineSelectionEnd?.(e)}toEventBaseProps(e){return this.mode===`file`?{type:`line`,lineElement:e.lineElement,lineNumber:e.lineNumber,numberColumn:e.numberColumn,numberElement:e.numberElement}:{type:`diff-line`,annotationSide:e.side,lineType:e.lineType,lineElement:e.lineElement,numberElement:e.numberElement,lineNumber:e.lineNumber,numberColumn:e.numberColumn}}buildSelectedLineRange(e,t){return this.buildSelectionRange(e.lineNumber,t.lineNumber,e.side,t.side)}buildSelectionRange(e,t,n,r){return{start:e,end:t,...n==null?{}:{side:n},...n!==r&&r!=null?{endSide:r}:{}}}resolvePointerTarget(e){let t=!1,n,r,i,a,o,s,c,l;for(let u of e){if(!(u instanceof HTMLElement))continue;if(l==null&&u.hasAttribute(`data-merge-conflict-action`)){let e=u.getAttribute(`data-merge-conflict-action`)??void 0,t=u.getAttribute(`data-merge-conflict-conflict-index`)??void 0,n=t==null?NaN:Number.parseInt(t,10);Ct(e)&&Number.isFinite(n)&&(l={kind:`merge-conflict-action`,resolution:e,conflictIndex:n})}let e=o==null?u.getAttribute(`data-column-number`)??void 0:void 0;if(e!=null){o=u,c=Number.parseInt(e,10),t=!0,n=Tt(u),a=u.getAttribute(`data-line-index`)??void 0;continue}let d=i==null?u.getAttribute(`data-line`)??void 0:void 0;if(d!=null){i=u,c=Number.parseInt(d,10),n=Tt(u),a=u.getAttribute(`data-line-index`)??void 0;continue}if(s==null&&u.hasAttribute(`data-expand-button`)){s={hunkIndex:void 0,direction:u.hasAttribute(`data-expand-up`)?`up`:u.hasAttribute(`data-expand-down`)?`down`:`both`};continue}let f=s==null?void 0:u.getAttribute(`data-expand-index`)??void 0;if(s!=null&&f!=null){let e=Number.parseInt(f,10);Number.isNaN(e)||(s.hunkIndex=e);continue}if(r==null&&u.hasAttribute(`data-code`)){r=u;break}}if(l!=null)return l;if(s?.hunkIndex!=null)return{type:`line-info`,hunkIndex:s.hunkIndex,direction:s.direction};if(i??=a==null?void 0:wt(r,`[data-line][data-line-index="${a}"]`),o??=a==null?void 0:wt(r,`[data-column-number][data-line-index="${a}"]`),r==null||i==null||o==null||n==null||c==null||Number.isNaN(c))return;let u=this.parseLineIndex(i,this.isSplitDiff());if(this.mode===`file`)return{kind:`line`,lineType:n,lineElement:i,lineNumber:c,numberColumn:t,numberElement:o,side:void 0,splitLineIndex:u};let d=(()=>{switch(n){case`change-deletion`:return`deletions`;case`change-addition`:return`additions`;default:return r.hasAttribute(`data-deletions`)?`deletions`:`additions`}})();return{kind:`line`,lineType:n,lineElement:i,lineNumber:c,numberColumn:t,numberElement:o,side:d,splitLineIndex:u}}isSplitDiff(){return this.pre?.getAttribute(`data-diff-type`)===`split`}parseLineIndex(e,t){let n=(e.getAttribute(`data-line-index`)??``).split(`,`).map(e=>Number.parseInt(e,10)).filter(e=>!Number.isNaN(e));if(t&&n.length===2)return n[1];if(!t)return n[0]}};function yt({enableGutterUtility:e,enableHoverUtility:t,lineHoverHighlight:n,onGutterUtilityClick:r,onLineClick:i,onLineEnter:a,onLineLeave:o,onLineNumberClick:s,renderGutterUtility:c,renderHoverUtility:l,__debugPointerEvents:u,enableLineSelection:d,onLineSelected:f,onLineSelectionStart:p,onLineSelectionChange:m,onLineSelectionEnd:h},g,_,v){return{enableGutterUtility:bt({enableGutterUtility:e,enableHoverUtility:t,renderGutterUtility:c,renderHoverUtility:l,onGutterUtilityClick:r}),usesCustomGutterUtility:c!=null||l!=null,lineHoverHighlight:n,onGutterUtilityClick:r,onHunkExpand:g,onMergeConflictActionClick:v,onLineClick:i,onLineEnter:a,onLineLeave:o,onLineNumberClick:s,__debugPointerEvents:u,enableLineSelection:d,onLineSelected:f,onLineSelectionStart:p,onLineSelectionChange:m,onLineSelectionEnd:h,getLineIndex:_}}function bt({enableGutterUtility:e,enableHoverUtility:t,renderGutterUtility:n,renderHoverUtility:r,onGutterUtilityClick:i}){if(e!==void 0&&t!==void 0)throw Error(`Cannot use both 'enableGutterUtility' and deprecated 'enableHoverUtility'. Use only 'enableGutterUtility'.`);if(n!=null&&r!=null)throw Error(`Cannot use both 'renderGutterUtility' and deprecated 'renderHoverUtility'. Use only 'renderGutterUtility'.`);if(i!=null&&(n!=null||r!=null))throw Error(`Cannot use both 'onGutterUtilityClick' and render utility callbacks ('renderGutterUtility'/'renderHoverUtility'). Use only one gutter utility API.`);return e??t??!1}function K(e){return e!=null&&`kind`in e&&e.kind===`line`}function xt(e){return`type`in e&&e.type===`line-info`}function St(e){return`kind`in e&&e.kind===`merge-conflict-action`}function Ct(e){return e===`current`||e===`incoming`||e===`both`}function wt(e,t){let n=e?.querySelector(t);return n instanceof HTMLElement?n:void 0}function Tt(e){let t=e.getAttribute(`data-line-type`);if(t!=null)switch(t){case`change-deletion`:case`change-addition`:case`context`:case`context-expanded`:return t;default:return}}function Et(e){for(let t of e)if(t instanceof HTMLElement&&t.hasAttribute(`data-utility-button`))return!0;return!1}function q(e=`none`,t,...n){switch(e){case`none`:return;case`both`:break;case`click`:if(t!==`click`)return;break;case`move`:if(t!==`move`)return;break}console.log(...n)}var Dt=class{observedNodes=new Map;queuedUpdates=new Map;cleanUp(){this.resizeObserver?.disconnect(),this.observedNodes.clear(),this.queuedUpdates.clear()}resizeObserver;setup(e,t){this.resizeObserver??=new ResizeObserver(this.handleResizeObserver);let n=e.querySelectorAll(`code`),r=new Map(this.observedNodes);this.observedNodes.clear();for(let e of n){let t=r.get(e);if(t!=null&&t.type!==`code`)throw Error(`ResizeManager.setup: somehow a code node is being used for an annotation, should be impossible`);let n=e.firstElementChild;n instanceof HTMLElement||(n=null),t==null?(t={type:`code`,codeElement:e,numberElement:n,codeWidth:`auto`,numberWidth:0},this.observedNodes.set(e,t),this.resizeObserver.observe(e),n!=null&&(this.observedNodes.set(n,t),this.resizeObserver.observe(n))):(this.observedNodes.set(e,t),r.delete(e),t.numberElement===n?t.numberElement!=null&&(r.delete(t.numberElement),this.observedNodes.set(t.numberElement,t)):(t.numberElement!=null&&this.resizeObserver.unobserve(t.numberElement),n!=null&&(this.resizeObserver.observe(n),r.delete(n),this.observedNodes.set(n,t)),t.numberElement=n))}if(n.length>1&&!t){let t=e.querySelectorAll(`[data-line-annotation*=","]`),n=new Map;for(let e of t){if(!(e instanceof HTMLElement))continue;let{lineAnnotation:t=``}=e.dataset;if(!/^\d+,\d+$/.test(t)){console.error(`DiffFileRenderer.setupResizeObserver: Invalid element or annotation`,{lineAnnotation:t,element:e});continue}let r=n.get(t);r??(r=[],n.set(t,r)),r.push(e)}for(let[e,t]of n){if(t.length!==2){console.error(`DiffFileRenderer.setupResizeObserver: Bad Pair`,e,t);continue}let[n,i]=t,a=n.firstElementChild,o=i.firstElementChild;if(!(n instanceof HTMLElement)||!(i instanceof HTMLElement)||!(a instanceof HTMLElement)||!(o instanceof HTMLElement))continue;let s=r.get(a);if(s!=null){this.observedNodes.set(a,s),this.observedNodes.set(o,s),r.delete(a),r.delete(o);continue}s={type:`annotations`,column1:{container:n,child:a,childHeight:a.getBoundingClientRect().height},column2:{container:i,child:o,childHeight:o.getBoundingClientRect().height},currentHeight:`auto`};let c=Math.max(s.column1.childHeight,s.column2.childHeight);this.applyNewHeight(s,c),this.observedNodes.set(a,s),this.observedNodes.set(o,s),this.resizeObserver.observe(a),this.resizeObserver.observe(o)}}for(let e of r.keys())e.isConnected&&(e.style.removeProperty(`--diffs-column-content-width`),e.style.removeProperty(`--diffs-column-number-width`),e.style.removeProperty(`--diffs-column-width`),e.parentElement instanceof HTMLElement&&e.parentElement.style.removeProperty(`--diffs-annotation-min-height`)),this.resizeObserver.unobserve(e);r.clear()}handleResizeObserver=e=>{for(let t of e){let{target:e,borderBoxSize:n}=t;if(!(e instanceof HTMLElement)){console.error(`FileDiff.handleResizeObserver: Invalid element for ResizeObserver`,t);continue}let r=this.observedNodes.get(e);if(r==null){console.error(`FileDiff.handleResizeObserver: Not a valid observed node`,t);continue}let i=n[0];if(r.type===`annotations`){let t=(()=>{if(e===r.column1.child)return r.column1;if(e===r.column2.child)return r.column2})();if(t==null){console.error(`FileDiff.handleResizeObserver: Couldn't find a column for`,{item:r,target:e});continue}t.childHeight=i.blockSize;let n=Math.max(r.column1.childHeight,r.column2.childHeight);this.applyNewHeight(r,n)}else if(r.type===`code`){let t=[e,i.inlineSize],n=this.queuedUpdates.get(r)??[];n.push(t),this.queuedUpdates.set(r,n)}}this.handleColumnChange()};handleColumnChange=()=>{for(let[e,t]of this.queuedUpdates)for(let[n,r]of t)if(n===e.codeElement){let n=Math.max(Math.floor(r),0);if(n!==e.codeWidth){let t=Math.max(n-e.numberWidth,0);e.codeWidth=n===0?`auto`:n,e.codeElement.style.setProperty(`--diffs-column-content-width`,`${t>0?`${t}px`:`auto`}`),e.codeElement.style.setProperty(`--diffs-column-width`,`${typeof e.codeWidth==`number`?`${e.codeWidth}px`:`auto`}`)}e.numberElement!=null&&typeof e.codeWidth==`number`&&e.numberWidth===0&&t.push([e.numberElement,e.numberElement.getBoundingClientRect().width])}else if(n===e.numberElement){let t=Math.max(Math.ceil(r),0);if(t!==e.numberWidth&&(e.numberWidth=t,e.codeElement.style.setProperty(`--diffs-column-number-width`,`${e.numberWidth===0?`auto`:`${e.numberWidth}px`}`),e.codeWidth!==`auto`)){let t=Math.max(e.codeWidth-e.numberWidth,0);e.codeElement.style.setProperty(`--diffs-column-content-width`,`${t===0?`auto`:`${t}px`}`)}}this.queuedUpdates.clear()};applyNewHeight(e,t){t!==e.currentHeight&&(e.currentHeight=Math.max(t,0),e.column1.container.style.setProperty(`--diffs-annotation-min-height`,`${e.currentHeight}px`),e.column2.container.style.setProperty(`--diffs-annotation-min-height`,`${e.currentHeight}px`))}};function Ot(e){for(let t of Array.isArray(e)?e:[e])if(!je.has(t))return!1;return!0}function kt(e){for(let t of de(e))if(!ce.has(t))return!1;return!0}function At(e,t){return e==null||t==null?e===t:e.startingLine===t.startingLine&&e.totalLines===t.totalLines&&e.bufferBefore===t.bufferBefore&&e.bufferAfter===t.bufferAfter}function jt(e){return U({tagName:`div`,children:[U({tagName:`div`,children:e.annotations?.map(e=>U({tagName:`slot`,properties:{name:e}})),properties:{"data-annotation-content":``}})],properties:{"data-line-annotation":`${e.hunkIndex},${e.lineIndex}`}})}function Mt(e){switch(e){case`file`:return`diffs-icon-file-code`;case`change`:return`diffs-icon-symbol-modified`;case`new`:return`diffs-icon-symbol-added`;case`deleted`:return`diffs-icon-symbol-deleted`;case`rename-pure`:case`rename-changed`:return`diffs-icon-symbol-moved`}}function Nt({fileOrDiff:e,themeStyles:t,themeType:n}){let r=`type`in e?e:void 0,i={"data-diffs-header":``,"data-change-type":r?.type,"data-theme-type":n===`system`?void 0:n,style:t};return U({tagName:`div`,children:[Pt({name:e.name,prevName:`prevName`in e?e.prevName:void 0,iconType:r?.type??`file`}),Ft(r)],properties:i})}function Pt({name:e,prevName:t,iconType:n}){let r=[U({tagName:`slot`,properties:{name:Me}}),pe({name:Mt(n),properties:{"data-change-icon":n}})];return t!=null&&(r.push(U({tagName:`div`,children:[V(t)],properties:{"data-prev-name":``}})),r.push(pe({name:`diffs-icon-arrow-right-short`,properties:{"data-rename-icon":``}}))),r.push(U({tagName:`div`,children:[V(e)],properties:{"data-title":``}})),U({tagName:`div`,children:r,properties:{"data-header-content":``}})}function Ft(e){let t=[];if(e!=null){let n=0,r=0;for(let t of e.hunks)n+=t.additionLines,r+=t.deletionLines;(r>0||n===0)&&t.push(U({tagName:`span`,children:[V(`-${r}`)],properties:{"data-deletions-count":``}})),(n>0||r===0)&&t.push(U({tagName:`span`,children:[V(`+${n}`)],properties:{"data-additions-count":``}}))}return t.push(U({tagName:`slot`,properties:{name:Ce}})),U({tagName:`div`,children:t,properties:{"data-metadata":``}})}function It(e){return U({tagName:`pre`,properties:Lt(e)})}function Lt({diffIndicators:e,disableBackground:t,disableLineNumbers:n,overflow:r,split:i,themeType:a,themeStyles:o,totalLines:s,type:c,customProperties:l}){let u={...l,"data-diff":c===`diff`?``:void 0,"data-file":c===`file`?``:void 0,"data-diff-type":c===`diff`?i?`split`:`single`:void 0,"data-overflow":r,"data-disable-line-numbers":n?``:void 0,"data-background":t?void 0:``,"data-indicators":e===`bars`||e===`classic`?e:void 0,"data-theme-type":a===`system`?void 0:a,style:o,tabIndex:0};return u.style+=`--diffs-min-number-column-width-default:${`${s}`.length}ch;`,u}function Rt(e,{theme:t,preferredHighlighter:n=`shiki-js`}){return{langs:[e??`text`],themes:de(t),preferredHighlighter:n}}function J(e){return`annotation-${`side`in e?`${e.side}-`:``}${e.lineNumber}`}function zt(e,t){return U({tagName:`div`,children:e,properties:{"data-content":``,style:`grid-row: span ${t}`}})}var Bt=`<svg data-icon-sprite aria-hidden="true" width="0" height="0">
  <symbol id="diffs-icon-arrow-right-short" viewBox="0 0 16 16">
    <path d="M8.47 4.22a.75.75 0 0 0 0 1.06l1.97 1.97H3.75a.75.75 0 0 0 0 1.5h6.69l-1.97 1.97a.75.75 0 1 0 1.06 1.06l3.25-3.25a.75.75 0 0 0 0-1.06L9.53 4.22a.75.75 0 0 0-1.06 0"/>
  </symbol>
  <symbol id="diffs-icon-brand-github" viewBox="0 0 16 16">
    <path d="M8 0c4.42 0 8 3.58 8 8a8.01 8.01 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27s-1.36.09-2 .27c-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8"/>
  </symbol>
  <symbol id="diffs-icon-chevron" viewBox="0 0 16 16">
    <path d="M1.47 4.47a.75.75 0 0 1 1.06 0L8 9.94l5.47-5.47a.75.75 0 1 1 1.06 1.06l-6 6a.75.75 0 0 1-1.06 0l-6-6a.75.75 0 0 1 0-1.06"/>
  </symbol>
  <symbol id="diffs-icon-chevrons-narrow" viewBox="0 0 10 16">
    <path d="M4.47 2.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1-1.06 1.06L5 3.81 2.28 6.53a.75.75 0 0 1-1.06-1.06zM1.22 9.47a.75.75 0 0 1 1.06 0L5 12.19l2.72-2.72a.75.75 0 0 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0l-3.25-3.25a.75.75 0 0 1 0-1.06"/>
  </symbol>
  <symbol id="diffs-icon-diff-split" viewBox="0 0 16 16">
    <path d="M14 0H8.5v16H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2m-1.5 6.5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0"/><path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h5.5V0zm.5 7.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1 0-1" opacity=".3"/>
  </symbol>
  <symbol id="diffs-icon-diff-unified" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M16 14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V8.5h16zm-8-4a.5.5 0 0 0-.5.5v1h-1a.5.5 0 0 0 0 1h1v1a.5.5 0 0 0 1 0v-1h1a.5.5 0 0 0 0-1h-1v-1A.5.5 0 0 0 8 10" clip-rule="evenodd"/><path fill-rule="evenodd" d="M14 0a2 2 0 0 1 2 2v5.5H0V2a2 2 0 0 1 2-2zM6.5 3.5a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1z" clip-rule="evenodd" opacity=".4"/>
  </symbol>
  <symbol id="diffs-icon-expand" viewBox="0 0 16 16">
    <path d="M3.47 5.47a.75.75 0 0 1 1.06 0L8 8.94l3.47-3.47a.75.75 0 1 1 1.06 1.06l-4 4a.75.75 0 0 1-1.06 0l-4-4a.75.75 0 0 1 0-1.06"/>
  </symbol>
  <symbol id="diffs-icon-expand-all" viewBox="0 0 16 16">
    <path d="M11.47 9.47a.75.75 0 1 1 1.06 1.06l-4 4a.75.75 0 0 1-1.06 0l-4-4a.75.75 0 1 1 1.06-1.06L8 12.94zM7.526 1.418a.75.75 0 0 1 1.004.052l4 4a.75.75 0 1 1-1.06 1.06L8 3.06 4.53 6.53a.75.75 0 1 1-1.06-1.06l4-4z"/>
  </symbol>
  <symbol id="diffs-icon-file-code" viewBox="0 0 16 16">
    <path d="M10.75 0c.199 0 .39.08.53.22l3.5 3.5c.14.14.22.331.22.53v9A2.75 2.75 0 0 1 12.25 16h-8.5A2.75 2.75 0 0 1 1 13.25V2.75A2.75 2.75 0 0 1 3.75 0zm-7 1.5c-.69 0-1.25.56-1.25 1.25v10.5c0 .69.56 1.25 1.25 1.25h8.5c.69 0 1.25-.56 1.25-1.25V5h-1.25A2.25 2.25 0 0 1 10 2.75V1.5z"/><path d="M7.248 6.19a.75.75 0 0 1 .063 1.058L5.753 9l1.558 1.752a.75.75 0 0 1-1.122.996l-2-2.25a.75.75 0 0 1 0-.996l2-2.25a.75.75 0 0 1 1.06-.063M8.69 7.248a.75.75 0 1 1 1.12-.996l2 2.25a.75.75 0 0 1 0 .996l-2 2.25a.75.75 0 1 1-1.12-.996L10.245 9z"/>
  </symbol>
  <symbol id="diffs-icon-plus" viewBox="0 0 16 16">
    <path d="M8 3a.75.75 0 0 1 .75.75v3.5h3.5a.75.75 0 0 1 0 1.5h-3.5v3.5a.75.75 0 0 1-1.5 0v-3.5h-3.5a.75.75 0 0 1 0-1.5h3.5v-3.5A.75.75 0 0 1 8 3"/>
  </symbol>
  <symbol id="diffs-icon-symbol-added" viewBox="0 0 16 16">
    <path d="M8 4a.75.75 0 0 1 .75.75v2.5h2.5a.75.75 0 0 1 0 1.5h-2.5v2.5a.75.75 0 0 1-1.5 0v-2.5h-2.5a.75.75 0 0 1 0-1.5h2.5v-2.5A.75.75 0 0 1 8 4"/><path d="M1.788 4.296c.196-.88.478-1.381.802-1.706s.826-.606 1.706-.802C5.194 1.588 6.387 1.5 8 1.5s2.806.088 3.704.288c.88.196 1.381.478 1.706.802s.607.826.802 1.706c.2.898.288 2.091.288 3.704s-.088 2.806-.288 3.704c-.195.88-.478 1.381-.802 1.706s-.826.607-1.706.802c-.898.2-2.091.288-3.704.288s-2.806-.088-3.704-.288c-.88-.195-1.381-.478-1.706-.802s-.606-.826-.802-1.706C1.588 10.806 1.5 9.613 1.5 8s.088-2.806.288-3.704M8 0C1.412 0 0 1.412 0 8s1.412 8 8 8 8-1.412 8-8-1.412-8-8-8"/>
  </symbol>
  <symbol id="diffs-icon-symbol-deleted" viewBox="0 0 16 16">
    <path d="M4 8a.75.75 0 0 1 .75-.75h6.5a.75.75 0 0 1 0 1.5h-6.5A.75.75 0 0 1 4 8"/><path d="M1.788 4.296c.196-.88.478-1.381.802-1.706s.826-.606 1.706-.802C5.194 1.588 6.387 1.5 8 1.5s2.806.088 3.704.288c.88.196 1.381.478 1.706.802s.607.826.802 1.706c.2.898.288 2.091.288 3.704s-.088 2.806-.288 3.704c-.195.88-.478 1.381-.802 1.706s-.826.607-1.706.802c-.898.2-2.091.288-3.704.288s-2.806-.088-3.704-.288c-.88-.195-1.381-.478-1.706-.802s-.606-.826-.802-1.706C1.588 10.806 1.5 9.613 1.5 8s.088-2.806.288-3.704M8 0C1.412 0 0 1.412 0 8s1.412 8 8 8 8-1.412 8-8-1.412-8-8-8"/>
  </symbol>
  <symbol id="diffs-icon-symbol-diffstat" viewBox="0 0 16 16">
    <path d="M1.788 4.296c.196-.88.478-1.381.802-1.706s.826-.606 1.706-.802C5.194 1.588 6.387 1.5 8 1.5s2.806.088 3.704.288c.88.196 1.381.478 1.706.802s.607.826.802 1.706c.2.898.288 2.091.288 3.704s-.088 2.806-.288 3.704c-.195.88-.478 1.381-.802 1.706s-.826.607-1.706.802c-.898.2-2.091.288-3.704.288s-2.806-.088-3.704-.288c-.88-.195-1.381-.478-1.706-.802s-.606-.826-.802-1.706C1.588 10.806 1.5 9.613 1.5 8s.088-2.806.288-3.704M8 0C1.412 0 0 1.412 0 8s1.412 8 8 8 8-1.412 8-8-1.412-8-8-8"/><path d="M8.75 4.296a.75.75 0 0 0-1.5 0V6.25h-2a.75.75 0 0 0 0 1.5h2v1.5h1.5v-1.5h2a.75.75 0 0 0 0-1.5h-2zM5.25 10a.75.75 0 0 0 0 1.5h5.5a.75.75 0 0 0 0-1.5z"/>
  </symbol>
  <symbol id="diffs-icon-symbol-ignored" viewBox="0 0 16 16">
    <path d="M1.5 8c0 1.613.088 2.806.288 3.704.196.88.478 1.381.802 1.706s.826.607 1.706.802c.898.2 2.091.288 3.704.288s2.806-.088 3.704-.288c.88-.195 1.381-.478 1.706-.802s.607-.826.802-1.706c.2-.898.288-2.091.288-3.704s-.088-2.806-.288-3.704c-.195-.88-.478-1.381-.802-1.706s-.826-.606-1.706-.802C10.806 1.588 9.613 1.5 8 1.5s-2.806.088-3.704.288c-.88.196-1.381.478-1.706.802s-.606.826-.802 1.706C1.588 5.194 1.5 6.387 1.5 8M0 8c0-6.588 1.412-8 8-8s8 1.412 8 8-1.412 8-8 8-8-1.412-8-8m11.53-2.47a.75.75 0 0 0-1.06-1.06l-6 6a.75.75 0 1 0 1.06 1.06z"/>
  </symbol>
  <symbol id="diffs-icon-symbol-modified" viewBox="0 0 16 16">
    <path d="M1.5 8c0 1.613.088 2.806.288 3.704.196.88.478 1.381.802 1.706s.826.607 1.706.802c.898.2 2.091.288 3.704.288s2.806-.088 3.704-.288c.88-.195 1.381-.478 1.706-.802s.607-.826.802-1.706c.2-.898.288-2.091.288-3.704s-.088-2.806-.288-3.704c-.195-.88-.478-1.381-.802-1.706s-.826-.606-1.706-.802C10.806 1.588 9.613 1.5 8 1.5s-2.806.088-3.704.288c-.88.196-1.381.478-1.706.802s-.606.826-.802 1.706C1.588 5.194 1.5 6.387 1.5 8M0 8c0-6.588 1.412-8 8-8s8 1.412 8 8-1.412 8-8 8-8-1.412-8-8m8 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
  </symbol>
  <symbol id="diffs-icon-symbol-moved" viewBox="0 0 16 16">
    <path d="M1.788 4.296c.196-.88.478-1.381.802-1.706s.826-.606 1.706-.802C5.194 1.588 6.387 1.5 8 1.5s2.806.088 3.704.288c.88.196 1.381.478 1.706.802s.607.826.802 1.706c.2.898.288 2.091.288 3.704s-.088 2.806-.288 3.704c-.195.88-.478 1.381-.802 1.706s-.826.607-1.706.802c-.898.2-2.091.288-3.704.288s-2.806-.088-3.704-.288c-.88-.195-1.381-.478-1.706-.802s-.606-.826-.802-1.706C1.588 10.806 1.5 9.613 1.5 8s.088-2.806.288-3.704M8 0C1.412 0 0 1.412 0 8s1.412 8 8 8 8-1.412 8-8-1.412-8-8-8"/><path d="M8.495 4.695a.75.75 0 0 0-.05 1.06L10.486 8l-2.041 2.246a.75.75 0 0 0 1.11 1.008l2.5-2.75a.75.75 0 0 0 0-1.008l-2.5-2.75a.75.75 0 0 0-1.06-.051m-4 0a.75.75 0 0 0-.05 1.06l2.044 2.248-1.796 1.995a.75.75 0 0 0 1.114 1.004l2.25-2.5a.75.75 0 0 0-.002-1.007l-2.5-2.75a.75.75 0 0 0-1.06-.05"/>
  </symbol>
  <symbol id="diffs-icon-symbol-ref" viewBox="0 0 16 16">
    <path d="M1.5 8c0 1.613.088 2.806.288 3.704.196.88.478 1.381.802 1.706.286.286.71.54 1.41.73V1.86c-.7.19-1.124.444-1.41.73-.324.325-.606.826-.802 1.706C1.588 5.194 1.5 6.387 1.5 8m4 6.397c.697.07 1.522.103 2.5.103 1.613 0 2.806-.088 3.704-.288.88-.195 1.381-.478 1.706-.802s.607-.826.802-1.706c.2-.898.288-2.091.288-3.704s-.088-2.806-.288-3.704c-.195-.88-.478-1.381-.802-1.706s-.826-.606-1.706-.802C10.806 1.588 9.613 1.5 8 1.5c-.978 0-1.803.033-2.5.103zM0 8c0-6.588 1.412-8 8-8s8 1.412 8 8-1.412 8-8 8-8-1.412-8-8m7-2a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1z"/>
  </symbol>
</svg>`;function Vt(e,t){return e==null||t==null?e===t:Ut(e.customProperties,t.customProperties)&&e.type===t.type&&e.diffIndicators===t.diffIndicators&&e.disableBackground===t.disableBackground&&e.disableLineNumbers===t.disableLineNumbers&&e.overflow===t.overflow&&e.split===t.split&&e.themeStyles===t.themeStyles&&e.themeType===t.themeType&&e.totalLines===t.totalLines}var Ht={};function Ut(e=Ht,t=Ht){if(e===t)return!0;let n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(let r of n)if(e[r]!==t[r])return!1;return!0}function Wt(e){let t=document.createElement(`div`);return t.dataset.annotationSlot=``,t.slot=e,t.style.whiteSpace=`normal`,t}function Gt(){let e=document.createElement(`div`);return e.slot=`gutter-utility-slot`,e.style.position=`absolute`,e.style.top=`0`,e.style.bottom=`0`,e.style.textAlign=`center`,e.style.whiteSpace=`normal`,e}function Kt(){let e=document.createElement(`style`);return e.setAttribute(Ne,``),e}var qt=`@layer base, theme, unsafe;

@layer base {
  :host {
    --diffs-bg: #fff;
    --diffs-fg: #000;
    --diffs-font-fallback:
      'SF Mono', Monaco, Consolas, 'Ubuntu Mono', 'Liberation Mono',
      'Courier New', monospace;
    --diffs-header-font-fallback:
      system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue',
      'Noto Sans', 'Liberation Sans', Arial, sans-serif;

    --diffs-mixer: light-dark(black, white);
    --diffs-gap-fallback: 8px;

    --diffs-added-light: #0dbe4e;
    --diffs-added-dark: #5ecc71;
    --diffs-modified-light: #009fff;
    --diffs-modified-dark: #69b1ff;
    --diffs-deleted-light: #ff2e3f;
    --diffs-deleted-dark: #ff6762;

    /*
    // Available CSS Color Overrides
    --diffs-bg-buffer-override
    --diffs-bg-hover-override
    --diffs-bg-context-override
    --diffs-bg-separator-override

    --diffs-fg-number-override
    --diffs-fg-number-addition-override
    --diffs-fg-number-deletion-override
    --diffs-fg-conflict-marker-override

    --diffs-deletion-color-override
    --diffs-addition-color-override
    --diffs-modified-color-override

    --diffs-bg-deletion-override
    --diffs-bg-deletion-number-override
    --diffs-bg-deletion-hover-override
    --diffs-bg-deletion-emphasis-override

    --diffs-bg-addition-override
    --diffs-bg-addition-number-override
    --diffs-bg-addition-hover-override
    --diffs-bg-addition-emphasis-override

    // Line Selection Color Overrides (for enableLineSelection)
    --diffs-selection-color-override
    --diffs-bg-selection-override
    --diffs-bg-selection-number-override
    --diffs-bg-selection-background-override
    --diffs-bg-selection-number-background-override

    // Available CSS Layout Overrides
    --diffs-gap-inline
    --diffs-gap-block
    --diffs-gap-style
    --diffs-tab-size
  */

    color-scheme: light dark;
    display: block;
    font-family: var(
      --diffs-header-font-family,
      var(--diffs-header-font-fallback)
    );
    font-size: var(--diffs-font-size, 13px);
    line-height: var(--diffs-line-height, 20px);
    font-feature-settings: var(--diffs-font-features);
  }

  /* NOTE(mdo): Some semantic HTML elements (e.g. \`pre\`, \`code\`) have default
 * user-agent styles. These must be overridden to use our custom styles. */
  pre,
  code,
  [data-error-wrapper] {
    isolation: isolate;
    margin: 0;
    padding: 0;
    display: block;
    outline: none;
    font-family: var(--diffs-font-family, var(--diffs-font-fallback));
  }

  pre,
  code {
    background-color: var(--diffs-bg);
  }

  code {
    contain: content;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  [data-icon-sprite] {
    display: none;
  }

  /* NOTE(mdo): Headers and separators are within pre/code, so we need to reset
   * their font-family explicitly. */
  [data-diffs-header],
  [data-separator] {
    font-family: var(
      --diffs-header-font-family,
      var(--diffs-header-font-fallback)
    );
  }

  [data-file-info] {
    padding: 10px;
    font-weight: 700;
    color: var(--fg);
    /* NOTE(amadeus): we cannot use 'in oklch' because current versions of cursor
   * and vscode use an older build of chrome that appears to have a bug with
   * color-mix and 'in oklch', so use 'in lab' instead */
    background-color: color-mix(in lab, var(--bg) 98%, var(--fg));
    border-block: 1px solid color-mix(in lab, var(--bg) 95%, var(--fg));
  }

  [data-diffs-header],
  [data-diff],
  [data-file],
  [data-error-wrapper],
  [data-virtualizer-buffer] {
    --diffs-bg: light-dark(var(--diffs-light-bg), var(--diffs-dark-bg));
    /* NOTE(amadeus): we cannot use 'in oklch' because current versions of cursor
   * and vscode use an older build of chrome that appears to have a bug with
   * color-mix and 'in oklch', so use 'in lab' instead */
    --diffs-bg-buffer: var(
      --diffs-bg-buffer-override,
      light-dark(
        color-mix(in lab, var(--diffs-bg) 92%, var(--diffs-mixer)),
        color-mix(in lab, var(--diffs-bg) 92%, var(--diffs-mixer))
      )
    );
    --diffs-bg-hover: var(
      --diffs-bg-hover-override,
      light-dark(
        color-mix(in lab, var(--diffs-bg) 97%, var(--diffs-mixer)),
        color-mix(in lab, var(--diffs-bg) 91%, var(--diffs-mixer))
      )
    );

    --diffs-bg-context: var(
      --diffs-bg-context-override,
      light-dark(
        color-mix(in lab, var(--diffs-bg) 98.5%, var(--diffs-mixer)),
        color-mix(in lab, var(--diffs-bg) 92.5%, var(--diffs-mixer))
      )
    );
    --diffs-bg-context-number: var(
      --diffs-bg-context-number-override,
      light-dark(
        color-mix(in lab, var(--diffs-bg-context) 80%, var(--diffs-bg)),
        color-mix(in lab, var(--diffs-bg-context) 60%, var(--diffs-bg))
      )
    );
    --diffs-bg-conflict-marker: var(
      --diffs-bg-conflict-marker-override,
      light-dark(
        color-mix(
          in lab,
          var(--diffs-bg-context) 88%,
          var(--diffs-modified-base)
        ),
        color-mix(
          in lab,
          var(--diffs-bg-context) 80%,
          var(--diffs-modified-base)
        )
      )
    );
    --diffs-bg-conflict-current: var(
      --diffs-bg-conflict-current-override,
      light-dark(#e5f8ea, #274432)
    );
    --diffs-bg-conflict-base: var(
      --diffs-bg-conflict-base-override,
      light-dark(
        color-mix(
          in lab,
          var(--diffs-bg-context) 90%,
          var(--diffs-modified-base)
        ),
        color-mix(
          in lab,
          var(--diffs-bg-context) 82%,
          var(--diffs-modified-base)
        )
      )
    );
    --diffs-bg-conflict-incoming: var(
      --diffs-bg-conflict-incoming-override,
      light-dark(#e6f1ff, #253b5a)
    );
    --diffs-bg-conflict-marker-number: var(
      --diffs-bg-conflict-marker-number-override,
      light-dark(
        color-mix(in lab, var(--diffs-bg-conflict-marker) 72%, var(--diffs-bg)),
        color-mix(in lab, var(--diffs-bg-conflict-marker) 54%, var(--diffs-bg))
      )
    );
    --diffs-bg-conflict-current-number: var(
      --diffs-bg-conflict-current-number-override,
      light-dark(#d7f1de, #30533d)
    );
    --diffs-bg-conflict-base-number: var(
      --diffs-bg-conflict-base-number-override,
      light-dark(
        color-mix(in lab, var(--diffs-bg-conflict-base) 72%, var(--diffs-bg)),
        color-mix(in lab, var(--diffs-bg-conflict-base) 54%, var(--diffs-bg))
      )
    );
    --diffs-bg-conflict-incoming-number: var(
      --diffs-bg-conflict-incoming-number-override,
      light-dark(#d8e8ff, #2f4b73)
    );
    --conflict-bg-current: var(
      --conflict-bg-current-override,
      var(--diffs-bg-addition)
    );
    --conflict-bg-incoming: var(
      --conflict-bg-incoming-override,
      light-dark(
        color-mix(in lab, var(--diffs-bg) 88%, var(--diffs-modified-base)),
        color-mix(in lab, var(--diffs-bg) 80%, var(--diffs-modified-base))
      )
    );
    --conflict-bg-current-number: var(
      --conflict-bg-current-number-override,
      var(--diffs-bg-addition-number)
    );
    --conflict-bg-incoming-number: var(
      --conflict-bg-incoming-number-override,
      light-dark(
        color-mix(in lab, var(--diffs-bg) 91%, var(--diffs-modified-base)),
        color-mix(in lab, var(--diffs-bg) 85%, var(--diffs-modified-base))
      )
    );
    --conflict-bg-current-header: var(
      --conflict-bg-current-header-override,
      light-dark(
        color-mix(in lab, var(--diffs-bg) 78%, var(--diffs-addition-base)),
        color-mix(in lab, var(--diffs-bg) 68%, var(--diffs-addition-base))
      )
    );
    --conflict-bg-incoming-header: var(
      --conflict-bg-incoming-header-override,
      light-dark(
        color-mix(in lab, var(--diffs-bg) 78%, var(--diffs-modified-base)),
        color-mix(in lab, var(--diffs-bg) 68%, var(--diffs-modified-base))
      )
    );
    --conflict-bg-current-header-number: var(
      --conflict-bg-current-header-number-override,
      light-dark(
        color-mix(in lab, var(--diffs-bg) 72%, var(--diffs-addition-base)),
        color-mix(in lab, var(--diffs-bg) 62%, var(--diffs-addition-base))
      )
    );
    --conflict-bg-incoming-header-number: var(
      --conflict-bg-incoming-header-number-override,
      light-dark(
        color-mix(in lab, var(--diffs-bg) 72%, var(--diffs-modified-base)),
        color-mix(in lab, var(--diffs-bg) 62%, var(--diffs-modified-base))
      )
    );

    --diffs-bg-separator: var(
      --diffs-bg-separator-override,
      light-dark(
        color-mix(in lab, var(--diffs-bg) 96%, var(--diffs-mixer)),
        color-mix(in lab, var(--diffs-bg) 85%, var(--diffs-mixer))
      )
    );

    --diffs-fg: light-dark(var(--diffs-light), var(--diffs-dark));
    --diffs-fg-number: var(
      --diffs-fg-number-override,
      light-dark(
        color-mix(in lab, var(--diffs-fg) 65%, var(--diffs-bg)),
        color-mix(in lab, var(--diffs-fg) 65%, var(--diffs-bg))
      )
    );
    --diffs-fg-conflict-marker: var(
      --diffs-fg-conflict-marker-override,
      var(--diffs-fg-number)
    );

    --diffs-deletion-base: var(
      --diffs-deletion-color-override,
      light-dark(
        var(
          --diffs-light-deletion-color,
          var(--diffs-deletion-color, var(--diffs-deleted-light))
        ),
        var(
          --diffs-dark-deletion-color,
          var(--diffs-deletion-color, var(--diffs-deleted-dark))
        )
      )
    );
    --diffs-addition-base: var(
      --diffs-addition-color-override,
      light-dark(
        var(
          --diffs-light-addition-color,
          var(--diffs-addition-color, var(--diffs-added-light))
        ),
        var(
          --diffs-dark-addition-color,
          var(--diffs-addition-color, var(--diffs-added-dark))
        )
      )
    );
    --diffs-modified-base: var(
      --diffs-modified-color-override,
      light-dark(
        var(
          --diffs-light-modified-color,
          var(--diffs-modified-color, var(--diffs-modified-light))
        ),
        var(
          --diffs-dark-modified-color,
          var(--diffs-modified-color, var(--diffs-modified-dark))
        )
      )
    );

    /* NOTE(amadeus): we cannot use 'in oklch' because current versions of cursor
   * and vscode use an older build of chrome that appears to have a bug with
   * color-mix and 'in oklch', so use 'in lab' instead */
    --diffs-bg-deletion: var(
      --diffs-bg-deletion-override,
      light-dark(
        color-mix(in lab, var(--diffs-bg) 88%, var(--diffs-deletion-base)),
        color-mix(in lab, var(--diffs-bg) 80%, var(--diffs-deletion-base))
      )
    );
    --diffs-bg-deletion-number: var(
      --diffs-bg-deletion-number-override,
      light-dark(
        color-mix(in lab, var(--diffs-bg) 91%, var(--diffs-deletion-base)),
        color-mix(in lab, var(--diffs-bg) 85%, var(--diffs-deletion-base))
      )
    );
    --diffs-bg-deletion-hover: var(
      --diffs-bg-deletion-hover-override,
      light-dark(
        color-mix(in lab, var(--diffs-bg) 80%, var(--diffs-deletion-base)),
        color-mix(in lab, var(--diffs-bg) 75%, var(--diffs-deletion-base))
      )
    );
    --diffs-bg-deletion-emphasis: var(
      --diffs-bg-deletion-emphasis-override,
      light-dark(
        rgb(from var(--diffs-deletion-base) r g b / 0.15),
        rgb(from var(--diffs-deletion-base) r g b / 0.2)
      )
    );

    --diffs-bg-addition: var(
      --diffs-bg-addition-override,
      light-dark(
        color-mix(in lab, var(--diffs-bg) 88%, var(--diffs-addition-base)),
        color-mix(in lab, var(--diffs-bg) 80%, var(--diffs-addition-base))
      )
    );
    --diffs-bg-addition-number: var(
      --diffs-bg-addition-number-override,
      light-dark(
        color-mix(in lab, var(--diffs-bg) 91%, var(--diffs-addition-base)),
        color-mix(in lab, var(--diffs-bg) 85%, var(--diffs-addition-base))
      )
    );
    --diffs-bg-addition-hover: var(
      --diffs-bg-addition-hover-override,
      light-dark(
        color-mix(in lab, var(--diffs-bg) 80%, var(--diffs-addition-base)),
        color-mix(in lab, var(--diffs-bg) 70%, var(--diffs-addition-base))
      )
    );
    --diffs-bg-addition-emphasis: var(
      --diffs-bg-addition-emphasis-override,
      light-dark(
        rgb(from var(--diffs-addition-base) r g b / 0.15),
        rgb(from var(--diffs-addition-base) r g b / 0.2)
      )
    );

    --diffs-selection-base: var(--diffs-modified-base);
    --diffs-selection-number-fg: light-dark(
      color-mix(in lab, var(--diffs-selection-base) 65%, var(--diffs-mixer)),
      color-mix(in lab, var(--diffs-selection-base) 75%, var(--diffs-mixer))
    );
    --diffs-bg-selection: var(
      --diffs-bg-selection-override,
      light-dark(
        color-mix(in lab, var(--diffs-bg) 82%, var(--diffs-selection-base)),
        color-mix(in lab, var(--diffs-bg) 75%, var(--diffs-selection-base))
      )
    );
    --diffs-bg-selection-number: var(
      --diffs-bg-selection-number-override,
      light-dark(
        color-mix(in lab, var(--diffs-bg) 75%, var(--diffs-selection-base)),
        color-mix(in lab, var(--diffs-bg) 60%, var(--diffs-selection-base))
      )
    );

    background-color: var(--diffs-bg);
    color: var(--diffs-fg);
  }

  [data-diff],
  [data-file] {
    /* This feels a bit crazy to me... so I need to think about it a bit more... */
    --diffs-grid-number-column-width: minmax(min-content, max-content);
    --diffs-code-grid: var(--diffs-grid-number-column-width) 1fr;

    &[data-dehydrated] {
      --diffs-code-grid: var(--diffs-grid-number-column-width) minmax(0, 1fr);
    }

    &[data-theme-type='light'],
    & {
      [data-line] span {
        color: light-dark(
          var(--diffs-token-light, var(--diffs-light)),
          var(--diffs-token-dark, var(--diffs-dark))
        );
        font-weight: var(--diffs-token-light-font-weight, inherit);
        font-style: var(--diffs-token-light-font-style, inherit);
        -webkit-text-decoration: var(--diffs-token-light-text-decoration, inherit);
                text-decoration: var(--diffs-token-light-text-decoration, inherit);
      }
    }

    &[data-theme-type='dark'] [data-line] span {
      font-weight: var(--diffs-token-dark-font-weight, inherit);
      font-style: var(--diffs-token-dark-font-style, inherit);
      -webkit-text-decoration: var(--diffs-token-dark-text-decoration, inherit);
              text-decoration: var(--diffs-token-dark-text-decoration, inherit);
    }

    &:hover [data-code]::-webkit-scrollbar-thumb {
      background-color: var(--diffs-bg-context);
    }
  }

  [data-line] span {
    background-color: light-dark(
      var(--diffs-token-light-bg, inherit),
      var(--diffs-token-dark-bg, inherit)
    );
  }

  [data-line],
  [data-gutter-buffer],
  [data-line-annotation],
  [data-no-newline] {
    color: var(--diffs-fg);
    background-color: var(--diffs-line-bg, var(--diffs-bg));
  }

  [data-no-newline] {
    -webkit-user-select: none;
            user-select: none;

    span {
      opacity: 0.6;
    }
  }

  @media (prefers-color-scheme: dark) {
    [data-diffs-header],
    [data-error-wrapper],
    [data-diff],
    [data-file] {
      color-scheme: dark;
    }

    [data-content] [data-line] span {
      font-weight: var(--diffs-token-dark-font-weight, inherit);
      font-style: var(--diffs-token-dark-font-style, inherit);
      -webkit-text-decoration: var(--diffs-token-dark-text-decoration, inherit);
              text-decoration: var(--diffs-token-dark-text-decoration, inherit);
    }
  }

  [data-diffs-header],
  [data-diff],
  [data-file] {
    &[data-theme-type='light'] {
      color-scheme: light;
    }

    &[data-theme-type='dark'] {
      color-scheme: dark;
    }
  }

  [data-diff-type='split'][data-overflow='scroll'] {
    display: grid;
    grid-template-columns: 1fr 1fr;

    [data-additions] {
      border-left: 1px solid var(--diffs-bg);
    }

    [data-deletions] {
      border-right: 1px solid var(--diffs-bg);
    }
  }

  [data-code] {
    display: grid;
    grid-auto-flow: dense;
    grid-template-columns: var(--diffs-code-grid);
    overflow: scroll clip;
    overscroll-behavior-x: none;
    tab-size: var(--diffs-tab-size, 2);
    align-self: flex-start;
    padding-top: var(--diffs-gap-block, var(--diffs-gap-fallback));
    padding-bottom: max(
      0px,
      calc(var(--diffs-gap-block, var(--diffs-gap-fallback)) - 6px)
    );
  }

  [data-container-size] {
    container-type: inline-size;
  }

  [data-code]::-webkit-scrollbar {
    width: 0;
    height: 6px;
  }

  [data-code]::-webkit-scrollbar-track {
    background: transparent;
  }

  [data-code]::-webkit-scrollbar-thumb {
    background-color: transparent;
    border: 1px solid transparent;
    background-clip: content-box;
    border-radius: 3px;
  }

  [data-code]::-webkit-scrollbar-corner {
    background-color: transparent;
  }

  /*
   * If we apply these rules globally it will mean that webkit will opt into the
   * standards compliant version of custom css scrollbars, which we do not want
   * because the custom stuff will look better
  */
  @supports (-moz-appearance: none) {
    [data-code] {
      scrollbar-width: thin;
      scrollbar-color: var(--diffs-bg-context) transparent;
      padding-bottom: var(--diffs-gap-block, var(--diffs-gap-fallback));
    }
  }

  [data-diffs-header] ~ [data-diff],
  [data-diffs-header] ~ [data-file] {
    [data-code],
    &[data-overflow='wrap'] {
      padding-top: 0;
    }
  }

  [data-gutter] {
    display: grid;
    grid-template-rows: subgrid;
    grid-template-columns: subgrid;
    grid-column: 1;
    z-index: 3;
    position: relative;
    background-color: var(--diffs-bg);

    [data-gutter-buffer],
    [data-column-number] {
      border-right: var(--diffs-gap-style, 2px solid var(--diffs-bg));
    }
  }

  [data-content] {
    display: grid;
    grid-template-rows: subgrid;
    grid-template-columns: subgrid;
    grid-column: 2;
    min-width: 0;
  }

  [data-diff-type='split'][data-overflow='wrap'] {
    display: grid;
    grid-auto-flow: dense;
    grid-template-columns: repeat(2, var(--diffs-code-grid));
    padding-block: var(--diffs-gap-block, var(--diffs-gap-fallback));

    [data-deletions] {
      display: contents;

      [data-gutter] {
        grid-column: 1;
      }

      [data-content] {
        grid-column: 2;
        border-right: 1px solid var(--diffs-bg);
      }
    }

    [data-additions] {
      display: contents;

      [data-gutter] {
        grid-column: 3;
        border-left: 1px solid var(--diffs-bg);
      }

      [data-content] {
        grid-column: 4;
      }
    }
  }

  [data-overflow='scroll'] [data-gutter] {
    position: sticky;
    left: 0;
  }

  [data-line-annotation][data-selected-line] {
    background-color: unset;

    &::before {
      content: '';
      /* FIXME(amadeus): This needs to be audited ... */
      position: sticky;
      top: 0;
      left: 0;
      display: block;
      border-right: var(--diffs-gap-style, 1px solid var(--diffs-bg));
      background-color: var(--diffs-bg-selection-number);
    }

    [data-annotation-content] {
      background-color: var(--diffs-bg-selection);
    }
  }

  [data-interactive-lines] [data-line] {
    cursor: pointer;
  }

  [data-content-buffer],
  [data-gutter-buffer] {
    position: relative;
    -webkit-user-select: none;
            user-select: none;
    min-height: 1lh;
  }

  [data-gutter-buffer='annotation'] {
    min-height: 0;
  }

  [data-gutter-buffer='buffer'] {
    background-size: 8px 8px;
    background-position: 0 0;
    background-origin: border-box;
    background-color: var(--diffs-bg);
    /* This is incredibley expensive... */
    background-image: repeating-linear-gradient(
      -45deg,
      transparent,
      transparent calc(3px * 1.414),
      rgb(from var(--diffs-bg-buffer) r g b / 0.8) calc(3px * 1.414),
      rgb(from var(--diffs-bg-buffer) r g b / 0.8) calc(4px * 1.414)
    );
  }

  [data-content-buffer] {
    grid-column: 1;
    /* We multiply by 1.414 (√2) to better approximate the diagonal repeat distance */
    background-size: 8px 8px;
    background-position: 5px 0;
    background-origin: border-box;
    background-color: var(--diffs-bg);
    /* This is incredibley expensive... */
    background-image: repeating-linear-gradient(
      -45deg,
      transparent,
      transparent calc(3px * 1.414),
      var(--diffs-bg-buffer) calc(3px * 1.414),
      var(--diffs-bg-buffer) calc(4px * 1.414)
    );
  }

  [data-separator] {
    box-sizing: content-box;
    background-color: var(--diffs-bg);
  }

  [data-separator='simple'] {
    min-height: 4px;
  }

  [data-separator='line-info'],
  [data-separator='line-info-basic'],
  [data-separator='metadata'],
  [data-separator='simple'] {
    background-color: var(--diffs-bg-separator);
  }

  [data-separator='line-info'],
  [data-separator='line-info-basic'],
  [data-separator='metadata'] {
    height: 32px;
    position: relative;
  }

  [data-separator-wrapper] {
    -webkit-user-select: none;
            user-select: none;
    fill: currentColor;
    position: absolute;
    inset-inline: 0;
    display: flex;
    align-items: center;
    background-color: var(--diffs-bg);
    height: 100%;
  }

  [data-content] [data-separator-wrapper] {
    display: none;
  }

  [data-separator='metadata'] [data-separator-wrapper] {
    inset-inline: 100% auto;
    padding-inline: 1ch;
    height: 100%;
    background-color: var(--diffs-bg-separator);
    color: var(--diffs-fg-number);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    min-width: min-content;
  }

  [data-separator='line-info'] {
    margin-block: var(--diffs-gap-block, var(--diffs-gap-fallback));
  }

  [data-separator='line-info-basic'],
  [data-separator='metadata'] {
    margin-block: 0;
  }

  [data-separator='line-info'][data-separator-first] {
    margin-top: 0;
  }

  [data-separator='line-info'][data-separator-last] {
    margin-bottom: 0;
  }

  [data-expand-index] [data-separator-wrapper] {
    display: grid;
    grid-template-columns: 32px auto;
  }

  [data-expand-index] [data-separator-wrapper][data-separator-multi-button] {
    grid-template-columns: 32px 32px auto;
  }

  [data-expand-button],
  [data-separator-content] {
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    background-color: var(--diffs-bg-separator);
  }

  [data-expand-button] {
    justify-content: center;
    flex-shrink: 0;
    cursor: pointer;
    min-width: 32px;
    align-self: stretch;
    color: var(--diffs-fg-number);
    border-right: 2px solid var(--diffs-bg);

    &:hover {
      color: var(--diffs-fg);
    }
  }

  [data-expand-down] [data-icon] {
    transform: scaleY(-1);
  }

  [data-separator-content] {
    flex: 1 1 auto;
    padding: 0 1ch;
    height: 100%;
    color: var(--diffs-fg-number);

    overflow: hidden;
    justify-content: flex-start;
  }

  [data-separator='line-info'],
  [data-separator='line-info-basic'] {
    [data-separator-content] {
      height: 100%;
      -webkit-user-select: none;
              user-select: none;
      overflow: clip;
    }
  }

  @supports (width: 1cqi) {
    [data-unified] {
      [data-separator='line-info'] [data-separator-wrapper] {
        padding-inline: var(--diffs-gap-inline, var(--diffs-gap-fallback));
        width: 100cqi;

        [data-separator-content] {
          border-radius: 6px;
        }
      }

      [data-separator='line-info'][data-expand-index]
        [data-separator-wrapper]
        [data-separator-content] {
        border-top-left-radius: unset;
        border-bottom-left-radius: unset;
      }
    }

    [data-gutter] {
      [data-separator='line-info'] [data-separator-wrapper] {
        padding-left: var(--diffs-gap-inline, var(--diffs-gap-fallback));
      }

      [data-separator='line-info'] [data-separator-content] {
        border-top-left-radius: 6px;
        border-bottom-left-radius: 6px;
      }

      [data-separator='line-info'][data-expand-index] [data-separator-content] {
        border-top-left-radius: unset;
        border-bottom-left-radius: unset;
      }
    }

    [data-additions] {
      [data-content] [data-separator='line-info'] {
        background-color: var(--diffs-bg);

        [data-separator-wrapper] {
          display: none;
        }
      }

      [data-gutter] [data-separator='line-info'] [data-separator-wrapper] {
        display: block;
        height: 100%;
        background-color: var(--diffs-bg-separator);
        border-top-right-radius: 6px;
        border-bottom-right-radius: 6px;

        [data-separator-content],
        [data-expand-button] {
          display: none;
        }
      }
    }

    [data-overflow='scroll']
      [data-additions]
      [data-gutter]
      [data-separator='line-info']
      [data-separator-wrapper] {
      width: calc(100cqi - var(--diffs-gap-inline, var(--diffs-gap-fallback)));
    }

    [data-overflow='wrap']
      [data-additions]
      [data-content]
      [data-separator='line-info']
      [data-separator-wrapper] {
      background-color: var(--diffs-bg-separator);
      display: block;
      height: 100%;
      margin-right: var(--diffs-gap-inline, var(--diffs-gap-fallback));
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;

      [data-separator-content],
      [data-expand-button] {
        display: none;
      }
    }

    [data-separator='line-info'] [data-separator-wrapper] {
      [data-expand-both],
      [data-expand-down],
      [data-expand-up] {
        border-top-left-radius: 6px;
        border-bottom-left-radius: 6px;
      }
    }

    @media (pointer: fine) {
      [data-separator='line-info'] [data-separator-wrapper] {
        &[data-separator-multi-button] {
          [data-expand-up] {
            border-top-left-radius: 6px;
            border-bottom-left-radius: unset;
          }

          [data-expand-down] {
            border-bottom-left-radius: 6px;
            border-top-left-radius: unset;
          }
        }
      }
    }
  }

  @media (pointer: coarse) {
    [data-separator='line-info-basic']
      [data-separator-wrapper][data-separator-multi-button] {
      grid-template-columns: 34px 34px auto;

      [data-separator-content] {
        grid-column: unset;
        grid-row: unset;
      }
    }

    @supports (width: 1cqi) {
      [data-separator='line-info'] [data-separator-wrapper] {
        [data-expand-both],
        [data-expand-down],
        [data-expand-up] {
          border-top-left-radius: 6px;
          border-bottom-left-radius: 6px;
        }

        &[data-separator-multi-button] {
          [data-expand-up] {
            border-top-left-radius: 6px;
            border-bottom-left-radius: 6px;
          }

          [data-expand-down] {
            border-bottom-left-radius: unset;
            border-top-left-radius: unset;
          }
        }
      }
    }
  }

  @media (pointer: fine) {
    [data-separator-wrapper][data-separator-multi-button] {
      display: grid;
      grid-template-rows: 50% 50%;

      [data-separator-content] {
        grid-column: 2;
        grid-row: 1 / -1;
        min-width: min-content;
      }

      [data-expand-button] {
        grid-column: 1;
      }
    }

    [data-separator='line-info'] [data-separator-wrapper],
    [data-separator='line-info']
      [data-separator-wrapper][data-separator-multi-button] {
      grid-template-columns: 34px auto;
    }

    [data-separator='line-info-basic'][data-expand-index]
      [data-separator-wrapper] {
      grid-template-columns: 100% auto;
    }

    [data-separator='line-info'],
    [data-separator='line-info-basic'] {
      [data-separator-multi-button] {
        [data-expand-up] {
          border-bottom: 1px solid var(--diffs-bg);
          border-right: 2px solid var(--diffs-bg);
        }
        [data-expand-down] {
          border-top: 1px solid var(--diffs-bg);
          border-right: 2px solid var(--diffs-bg);
        }
      }
    }
  }

  [data-additions] [data-gutter] [data-separator-wrapper],
  [data-additions] [data-separator='line-info-basic'] [data-separator-wrapper],
  [data-content] [data-separator-wrapper] {
    display: none;
  }

  [data-line-annotation],
  [data-gutter-buffer='annotation'] {
    --diffs-line-bg: var(--diffs-bg-context);
  }

  [data-merge-conflict-actions],
  [data-gutter-buffer='merge-conflict-action'] {
    --diffs-line-bg: var(--diffs-bg-context);
  }

  [data-has-merge-conflict] [data-line-annotation],
  [data-has-merge-conflict] [data-gutter-buffer='annotation'] {
    --diffs-line-bg: var(--diffs-bg);
  }

  [data-has-merge-conflict] [data-gutter-buffer='merge-conflict-action'] {
    --diffs-line-bg: var(--diffs-bg);
  }

  [data-line-annotation] {
    min-height: var(--diffs-annotation-min-height, 0);
    z-index: 2;
  }

  [data-merge-conflict-actions] {
    z-index: 2;
  }

  [data-separator='custom'] {
    display: grid;
    grid-template-columns: subgrid;
  }

  [data-line],
  [data-column-number],
  [data-no-newline] {
    position: relative;
    padding-inline: 1ch;
  }

  [data-indicators='classic'] [data-line] {
    padding-inline-start: 2ch;
  }

  [data-indicators='classic'] {
    [data-line-type='change-addition'],
    [data-line-type='change-deletion'] {
      &[data-no-newline],
      &[data-line] {
        &::before {
          display: inline-block;
          width: 1ch;
          height: 1lh;
          position: absolute;
          top: 0;
          left: 0;
          -webkit-user-select: none;
                  user-select: none;
        }
      }
    }

    [data-line-type='change-addition'] {
      &[data-line],
      &[data-no-newline] {
        &::before {
          content: '+';
          color: var(--diffs-addition-base);
        }
      }
    }

    [data-line-type='change-deletion'] {
      &[data-line],
      &[data-no-newline] {
        &::before {
          content: '-';
          color: var(--diffs-deletion-base);
        }
      }
    }
  }

  [data-indicators='bars'] {
    [data-line-type='change-deletion'],
    [data-line-type='change-addition'] {
      &[data-column-number] {
        &::before {
          content: '';
          display: block;
          width: 4px;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          -webkit-user-select: none;
                  user-select: none;
          contain: strict;
        }
      }
    }

    [data-line-type='change-deletion'] {
      &[data-column-number] {
        &::before {
          background-image: linear-gradient(
            0deg,
            var(--diffs-bg-deletion) 50%,
            var(--diffs-deletion-base) 50%
          );
          background-repeat: repeat;
          background-size: 2px 2px;
          background-size: calc(1lh / round(1lh / 2px))
            calc(1lh / round(1lh / 2px));
        }
      }
    }

    [data-line-type='change-addition'] {
      &[data-column-number] {
        &::before {
          background-color: var(--diffs-addition-base);
        }
      }
    }
  }

  [data-overflow='wrap'] {
    [data-line],
    [data-annotation-content] {
      white-space: pre-wrap;
      word-break: break-word;
    }
  }

  [data-overflow='scroll'] [data-line] {
    white-space: pre;
    min-height: 1lh;
  }

  [data-column-number] {
    box-sizing: content-box;
    text-align: right;
    -webkit-user-select: none;
            user-select: none;
    background-color: var(--diffs-bg);
    color: var(--diffs-fg-number);
    padding-left: 2ch;
  }

  [data-line-number-content] {
    display: inline-block;
    min-width: var(
      --diffs-min-number-column-width,
      var(--diffs-min-number-column-width-default, 3ch)
    );
  }

  [data-disable-line-numbers] {
    [data-column-number] {
      min-width: 4px;
      padding: 0;
    }

    [data-line-number-content] {
      display: none;
    }

    [data-gutter-utility-slot] {
      right: unset;
      left: 0;
      justify-content: flex-start;
    }

    &[data-indicators='bars'] [data-gutter-utility-slot] {
      /* Using 5px here because theres a 1px separator after the bar */
      left: 5px;
    }
  }

  [data-file][data-disable-line-numbers] {
    [data-gutter-buffer],
    [data-column-number] {
      min-width: 0;
      border-right: 0;
    }
  }

  [data-interactive-line-numbers] [data-column-number] {
    cursor: pointer;
  }

  [data-diff-span] {
    border-radius: 3px;
    -webkit-box-decoration-break: clone;
            box-decoration-break: clone;
  }

  [data-line-type='change-addition'] {
    &[data-column-number] {
      color: var(
        --diffs-fg-number-addition-override,
        var(--diffs-addition-base)
      );
    }

    > [data-diff-span] {
      background-color: var(--diffs-bg-addition-emphasis);
    }
  }

  [data-line-type='change-deletion'] {
    &[data-column-number] {
      color: var(
        --diffs-fg-number-deletion-override,
        var(--diffs-deletion-base)
      );
    }

    [data-diff-span] {
      background-color: var(--diffs-bg-deletion-emphasis);
    }
  }

  [data-background] [data-line-type='change-addition'] {
    --diffs-line-bg: var(--diffs-bg-addition);

    &[data-column-number] {
      background-color: var(--diffs-bg-addition-number);
    }
  }

  [data-background] [data-line-type='change-deletion'] {
    --diffs-line-bg: var(--diffs-bg-deletion);

    &[data-column-number] {
      background-color: var(--diffs-bg-deletion-number);
    }
  }

  [data-merge-conflict^='marker-'][data-line] {
    &[data-line-type='context'],
    &[data-line-type='context-expanded'] {
      color: var(--diffs-fg);

      span {
        color: var(--diffs-fg) !important;
      }
    }
  }

  [data-merge-conflict='marker-start'][data-line] {
    &[data-line-type='context'],
    &[data-line-type='context-expanded'] {
      &::after {
        content: '  (Current Change)';
        color: var(--diffs-fg-conflict-marker);
        opacity: 1;
        font-style: normal;
        font-family: var(
          --diffs-header-font-family,
          var(--diffs-header-font-fallback)
        );
      }
    }
  }

  [data-merge-conflict='marker-end'][data-line] {
    &[data-line-type='context'],
    &[data-line-type='context-expanded'] {
      &::after {
        content: '  (Incoming Change)';
        color: var(--diffs-fg-conflict-marker);
        opacity: 1;
        font-style: normal;
        font-family: var(
          --diffs-header-font-family,
          var(--diffs-header-font-fallback)
        );
      }
    }
  }

  [data-merge-conflict='marker-start'],
  [data-merge-conflict='marker-base'],
  [data-merge-conflict='marker-separator'],
  [data-merge-conflict='marker-end'] {
    &[data-line],
    &[data-no-newline] {
      background-color: var(--diffs-bg-conflict-marker);
    }

    &[data-column-number] {
      background-color: var(--diffs-bg-conflict-marker-number);
      color: var(--diffs-fg-conflict-marker);

      [data-line-number-content] {
        color: var(--diffs-fg-conflict-marker);
      }
    }
  }

  [data-merge-conflict='current'] {
    &[data-line],
    &[data-no-newline] {
      background-color: var(--conflict-bg-current);
    }

    &[data-column-number] {
      background-color: var(--conflict-bg-current-number);
      color: var(--diffs-addition-base);
    }
  }

  [data-merge-conflict='marker-start'] {
    &[data-line],
    &[data-no-newline] {
      background-color: var(--conflict-bg-current-header);
    }

    &[data-column-number] {
      background-color: var(--conflict-bg-current-header-number);
      color: var(--diffs-addition-base);

      [data-line-number-content] {
        color: var(--diffs-addition-base);
      }
    }
  }

  [data-merge-conflict='marker-end'] {
    &[data-line],
    &[data-no-newline] {
      background-color: var(--conflict-bg-incoming-header);
    }

    &[data-column-number] {
      background-color: var(--conflict-bg-incoming-header-number);
      color: var(--diffs-modified-base);

      [data-line-number-content] {
        color: var(--diffs-modified-base);
      }
    }
  }

  [data-merge-conflict='marker-separator'] {
    &[data-line],
    &[data-no-newline] {
      background-color: var(--diffs-bg);
    }

    &[data-column-number] {
      background-color: var(--diffs-bg);
    }
  }

  [data-merge-conflict='base'] {
    &[data-line],
    &[data-no-newline] {
      background-color: var(--diffs-bg-conflict-base);
    }

    &[data-column-number] {
      background-color: var(--diffs-bg-conflict-base-number);
      color: var(--diffs-modified-base);
    }
  }

  [data-merge-conflict='incoming'] {
    &[data-line],
    &[data-no-newline] {
      background-color: var(--conflict-bg-incoming);
    }

    &[data-column-number] {
      background-color: var(--conflict-bg-incoming-number);
      color: var(--diffs-modified-base);
    }
  }

  @media (pointer: fine) {
    [data-column-number],
    [data-line] {
      &[data-hovered] {
        background-color: var(--diffs-bg-hover);
      }
    }

    [data-background] {
      [data-column-number],
      [data-line] {
        &[data-hovered] {
          &[data-line-type='change-deletion'] {
            background-color: var(--diffs-bg-deletion-hover);
          }

          &[data-line-type='change-addition'] {
            background-color: var(--diffs-bg-addition-hover);
          }
        }
      }
    }
  }

  [data-diffs-header] {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: var(--diffs-gap-inline, var(--diffs-gap-fallback));
    min-height: calc(
      1lh + (var(--diffs-gap-block, var(--diffs-gap-fallback)) * 3)
    );
    padding-inline: 16px;
    top: 0;
    z-index: 2;
  }

  [data-header-content] {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: var(--diffs-gap-inline, var(--diffs-gap-fallback));
    min-width: 0;
    white-space: nowrap;
  }

  [data-header-content] [data-prev-name],
  [data-header-content] [data-title] {
    direction: rtl;
    overflow: hidden;
    text-overflow: ellipsis;
    min-width: 0;
    white-space: nowrap;
  }

  [data-prev-name] {
    opacity: 0.7;
  }

  [data-rename-icon] {
    fill: currentColor;
    flex-shrink: 0;
    flex-grow: 0;
  }

  [data-diffs-header] [data-metadata] {
    display: flex;
    align-items: center;
    gap: 1ch;
    white-space: nowrap;
  }

  [data-diffs-header] [data-additions-count] {
    font-family: var(--diffs-font-family, var(--diffs-font-fallback));
    color: var(--diffs-addition-base);
  }

  [data-diffs-header] [data-deletions-count] {
    font-family: var(--diffs-font-family, var(--diffs-font-fallback));
    color: var(--diffs-deletion-base);
  }

  [data-annotation-content] {
    position: relative;
    display: flow-root;
    align-self: flex-start;
    z-index: 2;
    min-width: 0;
    isolation: isolate;
  }

  [data-merge-conflict-actions-content] {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    padding-inline: 0.5rem;
    min-height: 1.75rem;
    font-family: var(
      --diffs-header-font-family,
      var(--diffs-header-font-fallback)
    );
    font-size: 0.75rem;
    line-height: 1.2;
    color: var(--diffs-fg);
  }

  [data-merge-conflict-action] {
    appearance: none;
    border: 0;
    background: transparent;
    color: var(--diffs-fg-number);
    font: inherit;
    font-style: normal;
    cursor: pointer;
    padding: 0;
  }

  [data-merge-conflict-action]:hover {
    color: var(--diffs-fg);
  }

  [data-merge-conflict-action='current']:hover {
    color: var(--diffs-addition-base);
  }

  [data-merge-conflict-action='incoming']:hover {
    color: var(--diffs-modified-base);
  }

  [data-merge-conflict-action-separator] {
    color: var(--diffs-fg-number);
    opacity: 0.6;
    -webkit-user-select: none;
            user-select: none;
  }

  /* Sticky positioning has a composite costs, so we should _only_ pay it if we
   * need to */
  [data-overflow='scroll'] [data-annotation-content] {
    position: sticky;
    width: var(--diffs-column-content-width, auto);
    left: var(--diffs-column-number-width, 0);
  }

  [data-overflow='scroll'] [data-merge-conflict-actions-content] {
    position: sticky;
    width: var(--diffs-column-content-width, auto);
    left: var(--diffs-column-number-width, 0);
  }

  /* Undo some of the stuff that the 'pre' tag does */
  [data-annotation-slot] {
    text-wrap-mode: wrap;
    word-break: normal;
    white-space-collapse: collapse;
  }

  [data-change-icon] {
    fill: currentColor;
    flex-shrink: 0;
  }

  [data-change-icon='change'],
  [data-change-icon='rename-pure'],
  [data-change-icon='rename-changed'] {
    color: var(--diffs-modified-base);
  }

  [data-change-icon='new'] {
    color: var(--diffs-addition-base);
  }

  [data-change-icon='deleted'] {
    color: var(--diffs-deletion-base);
  }

  [data-change-icon='file'] {
    opacity: 0.6;
  }

  /* Line selection highlighting */
  [data-selected-line] {
    &[data-gutter-buffer='annotation'],
    &[data-column-number] {
      color: var(--diffs-selection-number-fg);
      background-color: var(--diffs-bg-selection-number);
    }

    &[data-line] {
      background-color: var(--diffs-bg-selection);
    }
  }

  [data-line-type='change-addition'],
  [data-line-type='change-deletion'] {
    &[data-selected-line] {
      &[data-line],
      &[data-line][data-hovered] {
        background-color: light-dark(
          color-mix(
            in lab,
            var(--diffs-line-bg, var(--diffs-bg)) 82%,
            var(--diffs-selection-base)
          ),
          color-mix(
            in lab,
            var(--diffs-line-bg, var(--diffs-bg)) 75%,
            var(--diffs-selection-base)
          )
        );
      }

      &[data-column-number],
      &[data-column-number][data-hovered] {
        color: var(--diffs-selection-number-fg);
        background-color: light-dark(
          color-mix(
            in lab,
            var(--diffs-line-bg, var(--diffs-bg)) 75%,
            var(--diffs-selection-base)
          ),
          color-mix(
            in lab,
            var(--diffs-line-bg, var(--diffs-bg)) 60%,
            var(--diffs-selection-base)
          )
        );
      }
    }
  }

  [data-gutter-utility-slot] {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: flex-end;
  }

  [data-unmodified-lines] {
    display: block;
    overflow: hidden;
    min-width: 0;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex: 0 1 auto;
  }

  [data-error-wrapper] {
    overflow: auto;
    padding: var(--diffs-gap-block, var(--diffs-gap-fallback))
      var(--diffs-gap-inline, var(--diffs-gap-fallback));
    max-height: 400px;
    scrollbar-width: none;

    [data-error-message] {
      font-weight: bold;
      font-size: 18px;
      color: var(--diffs-deletion-base);
    }

    [data-error-stack] {
      color: var(--diffs-fg-number);
    }
  }

  [data-placeholder] {
    contain: strict;
  }

  [data-utility-button] {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    appearance: none;
    width: 1lh;
    height: 1lh;
    margin-right: calc((1lh - 1ch) * -1);
    padding: 0;
    cursor: pointer;
    font-size: var(--diffs-font-size, 13px);
    line-height: var(--diffs-line-height, 20px);
    border-radius: 4px;
    background-color: var(--diffs-modified-base);
    color: var(--diffs-bg);
    fill: currentColor;
    position: relative;
    z-index: 4;
  }
}
`,Jt=`@layer base, theme, unsafe;`;function Yt(e){return`${Jt}
@layer unsafe {
  ${e}
}`}function Xt({code:e,pre:t,columnType:n,rowSpan:r,containerSize:i=!1}={}){return e??(e=document.createElement(`code`),e.setAttribute(`data-code`,``),n!=null&&e.setAttribute(`data-${n}`,``),t?.appendChild(e)),r==null?e.style.removeProperty(`grid-row`):e.style.setProperty(`grid-row`,`span ${r}`),i?e.setAttribute(`data-container-size`,``):e.removeAttribute(`data-container-size`),e}function Zt(e,t){if(t==null)return;let n=e.shadowRoot??e.attachShadow({mode:`open`});n.innerHTML===``&&(n.innerHTML=t)}function Qt(e,{type:t,diffIndicators:n,disableBackground:r,disableLineNumbers:i,overflow:a,split:o,themeStyles:s,themeType:c,totalLines:l,customProperties:u}){if(u!=null)for(let t in u){let n=u[t];n!=null&&e.setAttribute(t,`${n}`)}switch(t===`diff`?(e.setAttribute(`data-diff`,``),e.removeAttribute(`data-file`)):(e.setAttribute(`data-file`,``),e.removeAttribute(`data-diff`)),c===`system`?e.removeAttribute(`data-theme-type`):e.setAttribute(`data-theme-type`,c),n){case`bars`:case`classic`:e.setAttribute(`data-indicators`,n);break;case`none`:e.removeAttribute(`data-indicators`);break}return i?e.setAttribute(`data-disable-line-numbers`,``):e.removeAttribute(`data-disable-line-numbers`),r?e.removeAttribute(`data-background`):e.setAttribute(`data-background`,``),t===`diff`?e.setAttribute(`data-diff-type`,o?`split`:`single`):e.removeAttribute(`data-diff-type`),e.setAttribute(`data-overflow`,a),e.tabIndex=0,e.style=s,e.style.setProperty(`--diffs-min-number-column-width-default`,`${`${l}`.length}ch`),e}if(typeof HTMLElement<`u`&&customElements.get(`diffs-container`)==null){let e;class t extends HTMLElement{constructor(){if(super(),this.shadowRoot!=null)return;let t=this.attachShadow({mode:`open`});e??(e=new CSSStyleSheet,e.replaceSync(qt)),t.adoptedStyleSheets=[e]}}customElements.define(Fe,t)}var $t=class{isDeletionsScrolling=!1;isAdditionsScrolling=!1;timeoutId=-1;codeDeletions;codeAdditions;enabled=!1;cleanUp(){this.enabled&&=(this.codeDeletions?.removeEventListener(`scroll`,this.handleDeletionsScroll),this.codeAdditions?.removeEventListener(`scroll`,this.handleAdditionsScroll),clearTimeout(this.timeoutId),this.codeDeletions=void 0,this.codeAdditions=void 0,!1)}setup(e,t,n){if(t==null||n==null)for(let r of e.children??[])r instanceof HTMLElement&&(`deletions`in r.dataset?t=r:`additions`in r.dataset&&(n=r));if(n==null||t==null){this.cleanUp();return}this.codeDeletions!==t&&(this.codeDeletions?.removeEventListener(`scroll`,this.handleDeletionsScroll),this.codeDeletions=t,t.addEventListener(`scroll`,this.handleDeletionsScroll,{passive:!0})),this.codeAdditions!==n&&(this.codeAdditions?.removeEventListener(`scroll`,this.handleAdditionsScroll),this.codeAdditions=n,n.addEventListener(`scroll`,this.handleAdditionsScroll,{passive:!0})),this.enabled=!0}handleDeletionsScroll=()=>{this.isAdditionsScrolling||(this.isDeletionsScrolling=!0,clearTimeout(this.timeoutId),this.timeoutId=setTimeout(()=>{this.isDeletionsScrolling=!1},300),this.codeAdditions?.scrollTo({left:this.codeDeletions?.scrollLeft}))};handleAdditionsScroll=()=>{this.isDeletionsScrolling||(this.isAdditionsScrolling=!0,clearTimeout(this.timeoutId),this.timeoutId=setTimeout(()=>{this.isAdditionsScrolling=!1},300),this.codeDeletions?.scrollTo({left:this.codeAdditions?.scrollLeft}))}};function en(e){return U({tagName:`div`,properties:{"data-content-buffer":``,"data-buffer-size":e,style:`grid-row: span ${e};min-height:calc(${e} * 1lh)`}})}function tn(e){return U({tagName:`div`,children:[U({tagName:`span`,children:[V(`No newline at end of file`)]})],properties:{"data-no-newline":``,"data-line-type":e,"data-column-content":``}})}function nn(e){return U({tagName:`div`,children:[pe({name:e===`both`?`diffs-icon-expand-all`:`diffs-icon-expand`,properties:{"data-icon":``}})],properties:{"data-expand-button":``,"data-expand-both":e===`both`?``:void 0,"data-expand-up":e===`up`?``:void 0,"data-expand-down":e===`down`?``:void 0}})}function Y({type:e,content:t,expandIndex:n,chunked:r=!1,slotName:i,isFirstHunk:a,isLastHunk:o}){let s=[];if(e===`metadata`&&t!=null&&s.push(U({tagName:`div`,children:[V(t)],properties:{"data-separator-wrapper":``}})),(e===`line-info`||e===`line-info-basic`)&&t!=null){let e=[];n!=null&&(r?(a||e.push(nn(`up`)),o||e.push(nn(`down`))):e.push(nn(!a&&!o?`both`:a?`down`:`up`))),e.push(U({tagName:`div`,children:[U({tagName:`span`,children:[V(t)],properties:{"data-unmodified-lines":``}})],properties:{"data-separator-content":``}})),s.push(U({tagName:`div`,children:e,properties:{"data-separator-wrapper":``,"data-separator-multi-button":e.length>2?``:void 0}}))}return e===`custom`&&i!=null&&s.push(U({tagName:`slot`,properties:{name:i}})),U({tagName:`div`,children:s,properties:{"data-separator":s.length===0?`simple`:e,"data-expand-index":n,"data-separator-first":a?``:void 0,"data-separator-last":o?``:void 0}})}function rn(e,t){return`hunk-separator-${e}-${t}`}function an(e){let t=e.at(-1);return t==null?0:Math.max(t.additionStart+t.additionCount,t.deletionStart+t.deletionCount)}function on(e){return e.startingLine===0&&e.totalLines===1/0&&e.bufferBefore===0&&e.bufferAfter===0}var sn=-1,cn=class{__id=`diff-hunks-renderer:${++sn}`;highlighter;diff;expandedHunks=new Map;deletionAnnotations={};additionAnnotations={};computedLang=`text`;renderCache;constructor(e={theme:H},t,n){this.options=e,this.onRenderUpdate=t,this.workerManager=n,n?.isWorkingPool()!==!0&&(this.highlighter=kt(e.theme??H)?ue():void 0)}cleanUp(){this.highlighter=void 0,this.diff=void 0,this.renderCache=void 0,this.workerManager?.cleanUpPendingTasks(this),this.workerManager=void 0,this.onRenderUpdate=void 0}recycle(){this.highlighter=void 0,this.diff=void 0,this.renderCache=void 0,this.workerManager?.cleanUpPendingTasks(this)}setOptions(e){this.options=e}mergeOptions(e){this.options={...this.options,...e}}setThemeType(e){this.getOptionsWithDefaults().themeType!==e&&this.mergeOptions({themeType:e})}expandHunk(e,t,n=this.getOptionsWithDefaults().expansionLineCount){let r={...this.expandedHunks.get(e)??{fromStart:0,fromEnd:0}};(t===`up`||t===`both`)&&(r.fromStart+=n),(t===`down`||t===`both`)&&(r.fromEnd+=n),this.renderCache?.highlighted!==!0&&(this.renderCache=void 0),this.expandedHunks.set(e,r)}getExpandedHunk(e){return this.expandedHunks.get(e)??ge}getExpandedHunksMap(){return this.expandedHunks}setLineAnnotations(e){this.additionAnnotations={},this.deletionAnnotations={};for(let t of e){let e=(()=>{switch(t.side){case`deletions`:return this.deletionAnnotations;case`additions`:return this.additionAnnotations}})(),n=e[t.lineNumber]??[];e[t.lineNumber]=n,n.push(t)}}getUnifiedLineDecoration({lineType:e}){return{gutterLineType:e}}getSplitLineDecoration({side:e,type:t}){return t===`change`?{gutterLineType:e===`deletions`?`change-deletion`:`change-addition`}:{gutterLineType:t}}createAnnotationElement(e){return jt(e)}getOptionsWithDefaults(){let{diffIndicators:e=`bars`,diffStyle:t=`split`,disableBackground:n=!1,disableFileHeader:r=!1,disableLineNumbers:i=!1,disableVirtualizationBuffers:a=!1,collapsed:o=!1,expandUnchanged:s=!1,collapsedContextThreshold:c=1,expansionLineCount:l=100,hunkSeparators:u=`line-info`,lineDiffType:d=`word-alt`,maxLineDiffLength:f=1e3,overflow:p=`scroll`,theme:m=H,themeType:h=`system`,tokenizeMaxLineLength:g=1e3,useCSSClasses:_=!1}=this.options;return{diffIndicators:e,diffStyle:t,disableBackground:n,disableFileHeader:r,disableLineNumbers:i,disableVirtualizationBuffers:a,collapsed:o,expandUnchanged:s,collapsedContextThreshold:c,expansionLineCount:l,hunkSeparators:u,lineDiffType:d,maxLineDiffLength:f,overflow:p,theme:this.workerManager?.getDiffRenderOptions().theme??m,themeType:h,tokenizeMaxLineLength:g,useCSSClasses:_}}async initializeHighlighter(){return this.highlighter=await he(Rt(this.computedLang,this.options)),this.highlighter}hydrate(e){if(e==null)return;this.diff=e;let{options:t}=this.getRenderOptions(e),n=this.workerManager?.getDiffResultCache(e);n!=null&&!ln(t,n.options)&&(n=void 0),this.renderCache??={diff:e,highlighted:!0,options:t,result:n?.result,renderRange:void 0},this.workerManager?.isWorkingPool()===!0&&this.renderCache.result==null?this.workerManager.highlightDiffAST(this,this.diff):this.asyncHighlight(e).then(({result:t,options:n})=>{this.onHighlightSuccess(e,t,n)})}getRenderOptions(e){let t=(()=>{if(this.workerManager?.isWorkingPool()===!0)return this.workerManager.getDiffRenderOptions();let{theme:e,tokenizeMaxLineLength:t,lineDiffType:n}=this.getOptionsWithDefaults();return{theme:e,tokenizeMaxLineLength:t,lineDiffType:n}})();this.getOptionsWithDefaults();let{renderCache:n}=this;return n?.result==null||e!==n.diff||!ln(t,n.options)?{options:t,forceRender:!0}:{options:t,forceRender:!1}}renderDiff(e=this.renderCache?.diff,t=se){if(e==null)return;let{expandUnchanged:n=!1,collapsedContextThreshold:r}=this.getOptionsWithDefaults(),i=this.workerManager?.getDiffResultCache(e);i!=null&&this.renderCache==null&&(this.renderCache={diff:e,highlighted:!0,renderRange:void 0,...i});let{options:a,forceRender:o}=this.getRenderOptions(e);if(this.renderCache??={diff:e,highlighted:!1,options:a,result:void 0,renderRange:void 0},this.workerManager?.isWorkingPool()===!0)(this.renderCache.result==null||!this.renderCache.highlighted&&!At(this.renderCache.renderRange,t))&&(this.renderCache.result=this.workerManager.getPlainDiffAST(e,t.startingLine,t.totalLines,on(t)||n?!0:this.expandedHunks,r),this.renderCache.renderRange=t),t.totalLines>0&&(!this.renderCache.highlighted||o)&&this.workerManager.highlightDiffAST(this,e);else{this.computedLang=e.lang??le(e.name);let t=this.highlighter!=null&&kt(a.theme),n=this.highlighter!=null&&Ot(this.computedLang);if(this.highlighter!=null&&t&&(o||!this.renderCache.highlighted&&n||this.renderCache.result==null)){let{result:t,options:r}=this.renderDiffWithHighlighter(e,this.highlighter,!n);this.renderCache={diff:e,options:r,highlighted:n,result:t,renderRange:void 0}}(!t||!n)&&this.asyncHighlight(e).then(({result:t,options:n})=>{this.onHighlightSuccess(e,t,n)})}return this.renderCache.result==null?void 0:this.processDiffResult(this.renderCache.diff,t,this.renderCache.result)}async asyncRender(e,t=se){let{result:n}=await this.asyncHighlight(e);return this.processDiffResult(e,t,n)}createPreElement(e,t,n,r,i){let{diffIndicators:a,disableBackground:o,disableLineNumbers:s,overflow:c,themeType:l}=this.getOptionsWithDefaults();return It({type:`diff`,diffIndicators:a,disableBackground:o,disableLineNumbers:s,overflow:c,themeStyles:n,split:e,themeType:r??l,totalLines:t,customProperties:i})}async asyncHighlight(e){this.computedLang=e.lang??le(e.name);let t=this.highlighter!=null&&kt(this.options.theme??H),n=this.highlighter!=null&&Ot(this.computedLang);return(this.highlighter==null||!t||!n)&&(this.highlighter=await this.initializeHighlighter()),this.renderDiffWithHighlighter(e,this.highlighter)}renderDiffWithHighlighter(e,t,n=!1){let{options:r}=this.getRenderOptions(e),{collapsedContextThreshold:i}=this.getOptionsWithDefaults();return{result:Oe(e,t,r,{forcePlainText:n,expandedHunks:n?!0:void 0,collapsedContextThreshold:i}),options:r}}onHighlightSuccess(e,t,n){if(this.renderCache==null)return;let r=this.renderCache.diff!==e||!this.renderCache.highlighted||!ln(this.renderCache.options,n);this.renderCache={diff:e,options:n,highlighted:!0,result:t,renderRange:void 0},r&&this.onRenderUpdate?.()}onHighlightError(e){console.error(e)}processDiffResult(e,t,{code:n,themeStyles:r,baseThemeType:i}){let{diffStyle:a,disableFileHeader:o,expandUnchanged:s,expansionLineCount:c,collapsedContextThreshold:l,hunkSeparators:u}=this.getOptionsWithDefaults();this.diff=e;let d=a===`unified`,f=[],p=[],m=[],h=[],{additionLines:g,deletionLines:_}=n,v={rowCount:0,hunkSeparators:u,additionsContentAST:f,deletionsContentAST:p,unifiedContentAST:m,unifiedGutterAST:me(),deletionsGutterAST:me(),additionsGutterAST:me(),expansionLineCount:c,hunkData:h,incrementRowCount(e=1){v.rowCount+=e},pushToGutter(e,t){switch(e){case`unified`:v.unifiedGutterAST.children.push(t);break;case`deletions`:v.deletionsGutterAST.children.push(t);break;case`additions`:v.additionsGutterAST.children.push(t);break}}},y=gn(e),b={size:0,side:void 0,increment(){this.size+=1},flush(){if(a!==`unified`){if(this.size<=0||this.side==null){this.side=void 0,this.size=0;return}this.side===`additions`?(v.pushToGutter(`additions`,B(void 0,`buffer`,this.size)),f?.push(en(this.size))):(v.pushToGutter(`deletions`,B(void 0,`buffer`,this.size)),p?.push(en(this.size))),this.size=0,this.side=void 0}}},x=(e,t,n,r,i)=>{v.pushToGutter(e,fe(t,n,r,i))};function S(e){b.flush(),a===`unified`?mn(`unified`,e,v):(mn(`deletions`,e,v),mn(`additions`,e,v))}De({diff:e,diffStyle:a,startingLine:t.startingLine,totalLines:t.totalLines,expandedHunks:s?!0:this.expandedHunks,collapsedContextThreshold:l,callback:({hunkIndex:t,hunk:n,collapsedBefore:r,collapsedAfter:i,additionLine:o,deletionLine:s,type:c})=>{let l=s==null?o.splitLineIndex:s.splitLineIndex,d=o==null?s.unifiedLineIndex:o.unifiedLineIndex;a===`split`&&c!==`change`&&b.flush(),r>0&&S({hunkIndex:t,collapsedLines:r,rangeSize:Math.max(n?.collapsedBefore??0,0),hunkSpecs:n?.hunkSpecs,isFirstHunk:t===0,isLastHunk:!1,isExpandable:!e.isPartial});let f=a===`unified`?d:l,p={type:c,hunkIndex:t,lineIndex:f,unifiedLineIndex:d,splitLineIndex:l,deletionLine:s,additionLine:o};if(a===`unified`){let n=s==null?void 0:_[s.lineIndex],r=o==null?void 0:g[o.lineIndex];if(n==null&&r==null){let t=`DiffHunksRenderer.processDiffResult: deletionLine and additionLine are null, something is wrong`;throw console.error(t,{file:e.name}),Error(t)}let i=c===`change`?o==null?`change-deletion`:`change-addition`:c,a=this.getUnifiedLineDecoration({type:c,lineType:i,additionLineIndex:o?.lineIndex,deletionLineIndex:s?.lineIndex});x(`unified`,a.gutterLineType,o==null?s.lineNumber:o.lineNumber,`${d},${l}`,a.gutterProperties),r==null?n!=null&&(n=hn(n,a.contentProperties)):r=hn(r,a.contentProperties),pn({diffStyle:`unified`,type:c,deletionLine:n,additionLine:r,unifiedSpan:this.getAnnotations(`unified`,s?.lineNumber,o?.lineNumber,t,f),createAnnotationElement:e=>this.createAnnotationElement(e),context:v});let u=this.getUnifiedInlineRowsForLine?.(p);u!=null&&dn(u,v)}else{let n=s==null?void 0:_[s.lineIndex],r=o==null?void 0:g[o.lineIndex],i=this.getSplitLineDecoration({side:`deletions`,type:c,lineIndex:s?.lineIndex}),a=this.getSplitLineDecoration({side:`additions`,type:c,lineIndex:o?.lineIndex});if(n==null&&r==null){let t=`DiffHunksRenderer.processDiffResult: deletionLine and additionLine are null, something is wrong`;throw console.error(t,{file:e.name}),Error(t)}let u=(()=>{if(c===`change`){if(r==null)return`additions`;if(n==null)return`deletions`}})();if(u!=null){if(b.side!=null&&b.side!==u)throw Error(`DiffHunksRenderer.processDiffResult: iterateOverDiff, invalid pending splits`);b.side=u,b.increment()}let d=this.getAnnotations(`split`,s?.lineNumber,o?.lineNumber,t,f);if(d!=null&&b.size>0&&b.flush(),s!=null){let e=hn(n,i.contentProperties);x(`deletions`,i.gutterLineType,s.lineNumber,`${s.unifiedLineIndex},${l}`,i.gutterProperties),e!=null&&(n=e)}if(o!=null){let e=hn(r,a.contentProperties);x(`additions`,a.gutterLineType,o.lineNumber,`${o.unifiedLineIndex},${l}`,a.gutterProperties),e!=null&&(r=e)}pn({diffStyle:`split`,type:c,additionLine:r,deletionLine:n,...d,createAnnotationElement:e=>this.createAnnotationElement(e),context:v});let m=this.getSplitInlineRowsForLine?.(p);m!=null&&fn(m,v,b)}let m=s?.noEOFCR??!1,h=o?.noEOFCR??!1;if(h||m){if(m){let e=c===`context`||c===`context-expanded`?c:`change-deletion`;a===`unified`?(v.unifiedContentAST.push(tn(e)),v.pushToGutter(`unified`,B(e,`metadata`,1))):(v.deletionsContentAST.push(tn(e)),v.pushToGutter(`deletions`,B(e,`metadata`,1)),h||(v.pushToGutter(`additions`,B(void 0,`buffer`,1)),v.additionsContentAST.push(en(1))))}if(h){let e=c===`context`||c===`context-expanded`?c:`change-addition`;a===`unified`?(v.unifiedContentAST.push(tn(e)),v.pushToGutter(`unified`,B(e,`metadata`,1))):(v.additionsContentAST.push(tn(e)),v.pushToGutter(`additions`,B(e,`metadata`,1)),m||(v.pushToGutter(`deletions`,B(void 0,`buffer`,1)),v.deletionsContentAST.push(en(1))))}v.incrementRowCount(1)}i>0&&u!==`simple`&&S({hunkIndex:c===`context-expanded`?t:t+1,collapsedLines:i,rangeSize:y,hunkSpecs:void 0,isFirstHunk:!1,isLastHunk:!0,isExpandable:!e.isPartial}),v.incrementRowCount(1)}}),a===`split`&&b.flush();let C=Math.max(an(e.hunks),e.additionLines.length??0,e.deletionLines.length??0),w=t.bufferBefore>0||t.bufferAfter>0,T=!d&&e.type!==`deleted`,E=!d&&e.type!==`new`,D=v.rowCount>0||w;f=T&&D?f:void 0,p=E&&D?p:void 0,m=d&&D?m:void 0;let O=this.createPreElement(p!=null&&f!=null,C,r,i);return{unifiedGutterAST:d&&D?v.unifiedGutterAST.children:void 0,unifiedContentAST:m,deletionsGutterAST:E&&D?v.deletionsGutterAST.children:void 0,deletionsContentAST:p,additionsGutterAST:T&&D?v.additionsGutterAST.children:void 0,additionsContentAST:f,hunkData:h,preNode:O,themeStyles:r,baseThemeType:i,headerElement:o?void 0:this.renderHeader(this.diff,r,i),totalLines:C,rowCount:v.rowCount,bufferBefore:t.bufferBefore,bufferAfter:t.bufferAfter,css:``}}renderCodeAST(e,t){let n=e===`unified`?t.unifiedGutterAST:e===`deletions`?t.deletionsGutterAST:t.additionsGutterAST,r=e===`unified`?t.unifiedContentAST:e===`deletions`?t.deletionsContentAST:t.additionsContentAST;if(n==null||r==null)return;let i=me(n);return i.properties.style=`grid-row: span ${t.rowCount}`,[i,zt(r,t.rowCount)]}renderFullAST(e,t=[]){let n=this.getOptionsWithDefaults().hunkSeparators===`line-info`,r=this.renderCodeAST(`unified`,e);if(r!=null)return t.push(U({tagName:`code`,children:r,properties:{"data-code":``,"data-container-size":n?``:void 0,"data-unified":``}})),{...e.preNode,children:t};let i=this.renderCodeAST(`deletions`,e);i!=null&&t.push(U({tagName:`code`,children:i,properties:{"data-code":``,"data-container-size":n?``:void 0,"data-deletions":``}}));let a=this.renderCodeAST(`additions`,e);return a!=null&&t.push(U({tagName:`code`,children:a,properties:{"data-code":``,"data-container-size":n?``:void 0,"data-additions":``}})),{...e.preNode,children:t}}renderFullHTML(e,t=[]){return z(this.renderFullAST(e,t))}renderPartialHTML(e,t){return z(t==null?e:U({tagName:`code`,children:e,properties:{"data-code":``,"data-container-size":this.getOptionsWithDefaults().hunkSeparators===`line-info`?``:void 0,[`data-${t}`]:``}}))}getAnnotations(e,t,n,r,i){let a={type:`annotation`,hunkIndex:r,lineIndex:i,annotations:[]};if(t!=null)for(let e of this.deletionAnnotations[t]??[])a.annotations.push(J(e));let o={type:`annotation`,hunkIndex:r,lineIndex:i,annotations:[]};if(n!=null)for(let t of this.additionAnnotations[n]??[])(e===`unified`?a:o).annotations.push(J(t));if(e===`unified`)return a.annotations.length>0?a:void 0;if(!(o.annotations.length===0&&a.annotations.length===0))return{deletionSpan:a,additionSpan:o}}renderHeader(e,t,n){let{themeType:r}=this.getOptionsWithDefaults();return Nt({fileOrDiff:e,themeStyles:t,themeType:n??r})}};function ln(e,t){return Ge(e.theme,t.theme)&&e.tokenizeMaxLineLength===t.tokenizeMaxLineLength&&e.lineDiffType===t.lineDiffType}function un(e){return`${e} unmodified line${e>1?`s`:``}`}function dn(e,t){for(let n of e)t.unifiedContentAST.push(n.content),t.pushToGutter(`unified`,n.gutter),t.incrementRowCount(1)}function fn(e,t,n){for(let{deletion:r,addition:i}of e){if(r==null&&i==null)continue;let e=r!=null&&i!=null?void 0:r==null?`deletions`:`additions`;(e==null||n.side!==e)&&n.flush(),r!=null&&(t.deletionsContentAST.push(r.content),t.pushToGutter(`deletions`,r.gutter)),i!=null&&(t.additionsContentAST.push(i.content),t.pushToGutter(`additions`,i.gutter)),e!=null&&(n.side=e,n.increment()),t.incrementRowCount(1)}}function pn({diffStyle:e,type:t,deletionLine:n,additionLine:r,unifiedSpan:i,deletionSpan:a,additionSpan:o,createAnnotationElement:s,context:c}){let l=!1;if(e===`unified`){if(r==null?n!=null&&c.unifiedContentAST.push(n):c.unifiedContentAST.push(r),i!=null){let e=t===`change`?n==null?`change-addition`:`change-deletion`:t;c.unifiedContentAST.push(s(i)),c.pushToGutter(`unified`,B(e,`annotation`,1)),l=!0}}else if(e===`split`){if(n!=null&&c.deletionsContentAST.push(n),r!=null&&c.additionsContentAST.push(r),a!=null){let e=t===`change`?n==null?`context`:`change-deletion`:t;c.deletionsContentAST.push(s(a)),c.pushToGutter(`deletions`,B(e,`annotation`,1)),l=!0}if(o!=null){let e=t===`change`?r==null?`context`:`change-addition`:t;c.additionsContentAST.push(s(o)),c.pushToGutter(`additions`,B(e,`annotation`,1)),l=!0}}l&&c.incrementRowCount(1)}function mn(e,{hunkIndex:t,collapsedLines:n,rangeSize:r,hunkSpecs:i,isFirstHunk:a,isLastHunk:o,isExpandable:s},c){if(n<=0)return;let l=e===`unified`?c.unifiedContentAST:e===`deletions`?c.deletionsContentAST:c.additionsContentAST;if(c.hunkSeparators===`metadata`){i!=null&&(c.pushToGutter(e,Y({type:`metadata`,content:i,isFirstHunk:a,isLastHunk:o})),l.push(Y({type:`metadata`,content:i,isFirstHunk:a,isLastHunk:o})),e!==`additions`&&c.incrementRowCount(1));return}if(c.hunkSeparators===`simple`){t>0&&(c.pushToGutter(e,Y({type:`simple`,isFirstHunk:a,isLastHunk:!1})),l.push(Y({type:`simple`,isFirstHunk:a,isLastHunk:!1})),e!==`additions`&&c.incrementRowCount(1));return}let u=rn(e,t),d=r>c.expansionLineCount,f=s?t:void 0;c.pushToGutter(e,Y({type:c.hunkSeparators,content:un(n),expandIndex:f,chunked:d,slotName:u,isFirstHunk:a,isLastHunk:o})),l.push(Y({type:c.hunkSeparators,content:un(n),expandIndex:f,chunked:d,slotName:u,isFirstHunk:a,isLastHunk:o})),e!==`additions`&&c.incrementRowCount(1),c.hunkData.push({slotName:u,hunkIndex:t,lines:n,type:e,expandable:s?{up:!a,down:!o,chunked:d}:void 0})}function hn(e,t){return e==null||e.type!==`element`||t==null?e:{...e,properties:{...e.properties,...t}}}function gn(e){let t=e.hunks.at(-1);if(t==null||e.isPartial||e.additionLines.length===0||e.deletionLines.length===0)return 0;let n=e.additionLines.length-(t.additionLineIndex+t.additionCount),r=e.deletionLines.length-(t.deletionLineIndex+t.deletionCount);if(n!==r)throw Error(`DiffHunksRenderer.processDiffResult: trailing context mismatch (additions=${n}, deletions=${r}) for ${e.name}`);return Math.min(n,r)}function _n(e,t){return e.lineNumber===t.lineNumber&&e.side===t.side&&e.metadata===t.metadata}function vn(e,t){return e.slotName===t.slotName&&e.hunkIndex===t.hunkIndex&&e.lines===t.lines&&e.type===t.type&&e.expandable?.chunked===t.expandable?.chunked&&e.expandable?.up===t.expandable?.up&&e.expandable?.down===t.expandable?.down}function yn(e){let t=e[0];if(t!==`+`&&t!==`-`&&t!==` `&&t!==`\\`){console.error(`parseLineType: Invalid firstChar: "${t}", full line: "${e}"`);return}let n=e.substring(1);return{line:n===``?`
`:n,type:t===` `?`context`:t===`\\`?`metadata`:t===`+`?`addition`:`deletion`}}function bn(e,t,n=!1){let r=Ve.test(e),i=e.split(r?Ve:Le),a,o=[];for(let e of i){if(r&&!Ve.test(e)){if(a==null)a=e;else if(n)throw Error(`parsePatchContent: unknown file blob`);else console.error(`parsePatchContent: unknown file blob:`,e);continue}else if(!r&&!Le.test(e)){if(a==null)a=e;else if(n)throw Error(`parsePatchContent: unknown file blob`);else console.error(`parsePatchContent: unknown file blob:`,e);continue}let i=xn(e,{cacheKey:t==null?void 0:`${t}-${o.length}`,isGitDiff:r,throwOnError:n});i!=null&&o.push(i)}return{patchMetadata:a,files:o}}function xn(e,{cacheKey:t,isGitDiff:n=Ve.test(e),oldFile:r,newFile:i,throwOnError:a=!1}={}){let o=0,s=e.split(Ie),c,l=r==null||i==null,u=0,d=0;for(let e of s){let s=e.split(Ee),f=s.shift();if(f==null){if(a)throw Error(`parsePatchContent: invalid hunk`);console.error(`parsePatchContent: invalid hunk`,e);continue}let p=f.match(Ue),m=0,h=0;if(p==null||c==null){if(c!=null){if(a)throw Error(`parsePatchContent: Invalid hunk`);console.error(`parsePatchContent: Invalid hunk`,e);continue}c={name:``,type:`change`,hunks:[],splitLineCount:0,unifiedLineCount:0,isPartial:l,additionLines:!l&&r!=null&&i!=null?i.contents.split(Ee):[],deletionLines:!l&&r!=null&&i!=null?r.contents.split(Ee):[],cacheKey:t},c.additionLines.length===1&&i?.contents===``&&(c.additionLines.length=0),c.deletionLines.length===1&&r?.contents===``&&(c.deletionLines.length=0),s.unshift(f);for(let e of s){let t=e.match(n?Se:Ae);if(e.startsWith(`diff --git`)){let[,,t,,n]=e.trim().match(ve)??[];c.name=n.trim(),t!==n&&(c.prevName=t.trim())}else if(t!=null){let[,e,n]=t;e===`---`&&n!==`/dev/null`?(c.prevName=n.trim(),c.name=n.trim()):e===`+++`&&n!==`/dev/null`&&(c.name=n.trim())}else if(n){if(e.startsWith(`new mode `)&&(c.mode=e.replace(`new mode`,``).trim()),e.startsWith(`old mode `)&&(c.prevMode=e.replace(`old mode`,``).trim()),e.startsWith(`new file mode`)&&(c.type=`new`,c.mode=e.replace(`new file mode`,``).trim()),e.startsWith(`deleted file mode`)&&(c.type=`deleted`,c.mode=e.replace(`deleted file mode`,``).trim()),e.startsWith(`similarity index`)&&(e.startsWith(`similarity index 100%`)?c.type=`rename-pure`:c.type=`rename-changed`),e.startsWith(`index `)){let[,t,n,r]=e.trim().match(we)??[];t!=null&&(c.prevObjectId=t),n!=null&&(c.newObjectId=n),r!=null&&(c.mode=r)}e.startsWith(`rename from `)&&(c.prevName=e.replace(`rename from `,``)),e.startsWith(`rename to `)&&(c.name=e.replace(`rename to `,``).trim())}}continue}let g,_;for(;s.length>0&&(s[s.length-1]===`
`||s[s.length-1]===`\r`||s[s.length-1]===`\r
`||s[s.length-1]===``);)s.pop();let v=parseInt(p[3]),y=parseInt(p[1]);u=l?u:y-1,d=l?d:v-1;let b={collapsedBefore:0,splitLineCount:0,splitLineStart:0,unifiedLineCount:0,unifiedLineStart:0,additionCount:parseInt(p[4]??`1`),additionStart:v,additionLines:m,deletionCount:parseInt(p[2]??`1`),deletionStart:y,deletionLines:h,deletionLineIndex:u,additionLineIndex:d,hunkContent:[],hunkContext:p[5],hunkSpecs:f,noEOFCRAdditions:!1,noEOFCRDeletions:!1};if(isNaN(b.additionCount)||isNaN(b.deletionCount)||isNaN(b.additionStart)||isNaN(b.deletionStart)){if(a)throw Error(`parsePatchContent: invalid hunk metadata`);console.error(`parsePatchContent: invalid hunk metadata`,b);continue}for(let e of s){let t=yn(e);if(t==null){console.error(`processFile: invalid rawLine:`,e);continue}let{type:n,line:r}=t;if(n===`addition`)(g==null||g.type!==`change`)&&(g=Cn(`change`,u,d),b.hunkContent.push(g)),d++,l&&c.additionLines.push(r),g.additions++,m++,_=`addition`;else if(n===`deletion`)(g==null||g.type!==`change`)&&(g=Cn(`change`,u,d),b.hunkContent.push(g)),u++,l&&c.deletionLines.push(r),g.deletions++,h++,_=`deletion`;else if(n===`context`)(g==null||g.type!==`context`)&&(g=Cn(`context`,u,d),b.hunkContent.push(g)),d++,u++,l&&(c.deletionLines.push(r),c.additionLines.push(r)),g.lines++,_=`context`;else if(n===`metadata`&&g!=null){if(g.type===`context`?(b.noEOFCRAdditions=!0,b.noEOFCRDeletions=!0):_===`deletion`?b.noEOFCRDeletions=!0:_===`addition`&&(b.noEOFCRAdditions=!0),l&&(_===`addition`||_===`context`)){let e=c.additionLines.length-1;e>=0&&(c.additionLines[e]=_e(c.additionLines[e]))}if(l&&(_===`deletion`||_===`context`)){let e=c.deletionLines.length-1;e>=0&&(c.deletionLines[e]=_e(c.deletionLines[e]))}}}b.additionLines=m,b.deletionLines=h,b.collapsedBefore=Math.max(b.additionStart-1-o,0),c.hunks.push(b),o=b.additionStart+b.additionCount-1;for(let e of b.hunkContent)e.type===`context`?(b.splitLineCount+=e.lines,b.unifiedLineCount+=e.lines):(b.splitLineCount+=Math.max(e.additions,e.deletions),b.unifiedLineCount+=e.deletions+e.additions);b.splitLineStart=c.splitLineCount+b.collapsedBefore,b.unifiedLineStart=c.unifiedLineCount+b.collapsedBefore,c.splitLineCount+=b.collapsedBefore+b.splitLineCount,c.unifiedLineCount+=b.collapsedBefore+b.unifiedLineCount}if(c!=null){if(c.hunks.length>0&&!l&&c.additionLines.length>0&&c.deletionLines.length>0){let e=c.hunks[c.hunks.length-1],t=e.additionStart+e.additionCount-1,n=c.additionLines.length,r=Math.max(n-t,0);c.splitLineCount+=r,c.unifiedLineCount+=r}return n||(c.prevName!=null&&c.name!==c.prevName?c.hunks.length>0?c.type=`rename-changed`:c.type=`rename-pure`:i!=null&&i.contents===``?c.type=`deleted`:r!=null&&r.contents===``&&(c.type=`new`)),c.type!==`rename-pure`&&c.type!==`rename-changed`&&(c.prevName=void 0),c}}function Sn(e,t,n=!1){let r=[];for(let i of e.split(ye))try{r.push(bn(i,t==null?void 0:`${t}-${r.length}`,n))}catch(e){if(n)throw e;console.error(e)}return r}function Cn(e,t,n){return e===`change`?{type:`change`,additions:0,deletions:0,additionLineIndex:n,deletionLineIndex:t}:{type:`context`,lines:0,additionLineIndex:n,deletionLineIndex:t}}function wn(e,t,n,r=!1){let i=xn(be(e.name,t.name,e.contents,t.contents,e.header,t.header,n),{cacheKey:(()=>{if(e.cacheKey!=null&&t.cacheKey!=null)return`${e.cacheKey}:${t.cacheKey}`})(),oldFile:e,newFile:t,throwOnError:r});if(i==null)throw Error(`parseDiffFrom: FileInvalid diff -- probably need to fix something -- if the files are the same maybe?`);return i}var Tn=-1,En=class{static LoadedCustomComponent=!0;__id=`file-diff:${++Tn}`;fileContainer;spriteSVG;pre;codeUnified;codeDeletions;codeAdditions;bufferBefore;bufferAfter;unsafeCSSStyle;gutterUtilityContent;headerElement;headerPrefix;headerMetadata;separatorCache=new Map;errorWrapper;placeHolder;hunksRenderer;resizeManager;scrollSyncManager;interactionManager;annotationCache=new Map;lineAnnotations=[];deletionFile;additionFile;fileDiff;renderRange;appliedPreAttributes;lastRenderedHeaderHTML;lastRowCount;enabled=!0;constructor(e={theme:H},t,n=!1){this.options=e,this.workerManager=t,this.isContainerManaged=n,this.hunksRenderer=this.createHunksRenderer(e),this.resizeManager=new Dt,this.scrollSyncManager=new $t,this.interactionManager=new vt(`diff`,yt(e,typeof e.hunkSeparators==`function`||(e.hunkSeparators??`line-info`)===`line-info`||e.hunkSeparators===`line-info-basic`?this.handleExpandHunk:void 0,this.getLineIndex)),this.workerManager?.subscribeToThemeChanges(this),this.enabled=!0}handleHighlightRender=()=>{this.rerender()};getHunksRendererOptions(e){return{...e,hunkSeparators:typeof e.hunkSeparators==`function`?`custom`:e.hunkSeparators}}createHunksRenderer(e){return new cn(this.getHunksRendererOptions(e),this.handleHighlightRender,this.workerManager)}getLineIndex=(e,t=`additions`)=>{if(this.fileDiff==null)return;let n=this.fileDiff.hunks.at(-1),r,i;hunkIterator:for(let a of this.fileDiff.hunks){let o=t===`deletions`?a.deletionStart:a.additionStart,s=t===`deletions`?a.deletionCount:a.additionCount,c=a.splitLineStart,l=a.unifiedLineStart;if(e<o){let t=o-e;r=Math.max(l-t,0),i=Math.max(c-t,0);break hunkIterator}if(e>=o+s){if(a===n){let t=e-(o+s);r=l+a.unifiedLineCount+t,i=c+a.splitLineCount+t;break hunkIterator}continue}for(let n of a.hunkContent)if(n.type===`context`)if(e<o+n.lines){let t=e-o;i=c+t,r=l+t;break hunkIterator}else o+=n.lines,c+=n.lines,l+=n.lines;else{let a=t===`deletions`?n.deletions:n.additions;if(e<o+a){let a=e-o;r=l+(t===`additions`?n.deletions:0)+a,i=c+a;break hunkIterator}else o+=a,c+=Math.max(n.deletions,n.additions),l+=n.deletions+n.additions}break hunkIterator}if(!(r==null||i==null))return[r,i]};setOptions(e){e!=null&&(this.options=e,this.hunksRenderer.setOptions(this.getHunksRendererOptions(e)),this.interactionManager.setOptions(yt(e,typeof e.hunkSeparators==`function`||(e.hunkSeparators??`line-info`)===`line-info`||e.hunkSeparators===`line-info-basic`?this.handleExpandHunk:void 0,this.getLineIndex)))}mergeOptions(e){this.options={...this.options,...e}}setThemeType(e){if((this.options.themeType??`system`)!==e&&(this.mergeOptions({themeType:e}),this.hunksRenderer.setThemeType(e),this.headerElement!=null&&(e===`system`?delete this.headerElement.dataset.themeType:this.headerElement.dataset.themeType=e),this.pre!=null))switch(e){case`system`:delete this.pre.dataset.themeType;break;case`light`:case`dark`:this.pre.dataset.themeType=e;break}}getHoveredLine=()=>this.interactionManager.getHoveredLine();setLineAnnotations(e){this.lineAnnotations=e}canPartiallyRender(e,t,n){return!(e||t||n||typeof this.options.hunkSeparators==`function`)}setSelectedLines(e){this.interactionManager.setSelection(e)}cleanUp(e=!1){this.resizeManager.cleanUp(),this.interactionManager.cleanUp(),this.scrollSyncManager.cleanUp(),this.workerManager?.unsubscribeToThemeChanges(this),this.renderRange=void 0,this.isContainerManaged||this.fileContainer?.remove(),this.fileContainer?.shadowRoot!=null&&(this.fileContainer.shadowRoot.innerHTML=``),this.fileContainer=void 0,this.pre!=null&&(this.pre.innerHTML=``,this.pre=void 0),this.codeUnified=void 0,this.codeDeletions=void 0,this.codeAdditions=void 0,this.bufferBefore=void 0,this.bufferAfter=void 0,this.appliedPreAttributes=void 0,this.headerElement=void 0,this.headerPrefix=void 0,this.headerMetadata=void 0,this.lastRenderedHeaderHTML=void 0,this.errorWrapper=void 0,this.spriteSVG=void 0,this.lastRowCount=void 0,e?this.hunksRenderer.recycle():(this.hunksRenderer.cleanUp(),this.workerManager=void 0,this.fileDiff=void 0,this.deletionFile=void 0,this.additionFile=void 0),this.enabled=!1}virtualizedSetup(){this.enabled=!0,this.workerManager?.subscribeToThemeChanges(this)}hydrate(e){let{overflow:t=`scroll`,diffStyle:n=`split`}=this.options,{fileContainer:r,prerenderedHTML:i,preventEmit:a=!1}=e;Zt(r,i);for(let e of r.shadowRoot?.children??[]){if(e instanceof SVGElement){this.spriteSVG=e;continue}if(e instanceof HTMLElement){if(e instanceof HTMLPreElement){this.pre=e;for(let t of e.children)!(t instanceof HTMLElement)||t.tagName.toLowerCase()!==`code`||(`deletions`in t.dataset&&(this.codeDeletions=t),`additions`in t.dataset&&(this.codeAdditions=t),`unified`in t.dataset&&(this.codeUnified=t));continue}if(`diffsHeader`in e.dataset){this.headerElement=e;continue}if(e instanceof HTMLStyleElement&&e.hasAttribute(`data-unsafe-css`)){this.unsafeCSSStyle=e;continue}}}if(this.pre!=null&&this.syncCodeNodesFromPre(this.pre),this.pre==null)this.render({...e,preventEmit:!0});else{let{lineAnnotations:i,oldFile:a,newFile:o,fileDiff:s}=e;this.fileContainer=r,delete this.pre.dataset.dehydrated,this.lineAnnotations=i??this.lineAnnotations,this.additionFile=o,this.deletionFile=a,this.fileDiff=s??(a!=null&&o!=null?wn(a,o):void 0),this.hunksRenderer.hydrate(this.fileDiff),this.renderAnnotations(),this.renderGutterUtility(),this.injectUnsafeCSS(),this.interactionManager.setup(this.pre),this.resizeManager.setup(this.pre,t===`wrap`),t===`scroll`&&n===`split`&&this.scrollSyncManager.setup(this.pre,this.codeDeletions,this.codeAdditions)}a||this.emitPostRender()}rerender(){!this.enabled||this.fileDiff==null&&this.additionFile==null&&this.deletionFile==null||this.render({forceRender:!0,renderRange:this.renderRange})}handleExpandHunk=(e,t,n)=>{this.expandHunk(e,t,n)};expandHunk=(e,t,n)=>{this.hunksRenderer.expandHunk(e,t,n),this.rerender()};render({oldFile:e,newFile:t,fileDiff:n,forceRender:r=!1,preventEmit:i=!1,lineAnnotations:a,fileContainer:o,containerWrapper:s,renderRange:c}){if(!this.enabled)throw Error(`FileDiff.render: attempting to call render after cleaned up`);let{collapsed:l=!1}=this.options,u=l?void 0:c,d=e!=null&&t!=null&&(!We(e,this.deletionFile)||!We(t,this.additionFile)),f=n!=null&&n!==this.fileDiff,p=a!=null&&(a.length>0||this.lineAnnotations.length>0)?a!==this.lineAnnotations:!1;if(!l&&At(u,this.renderRange)&&!r&&!p&&(n!=null&&n===this.fileDiff||n==null&&!d))return!1;let{renderRange:m}=this;if(this.renderRange=u,this.deletionFile=e,this.additionFile=t,n==null?e!=null&&t!=null&&d&&(f=!0,this.fileDiff=wn(e,t)):this.fileDiff=n,a!=null&&this.setLineAnnotations(a),this.fileDiff==null)return!1;this.hunksRenderer.setOptions({...this.options,hunkSeparators:typeof this.options.hunkSeparators==`function`?`custom`:this.options.hunkSeparators}),this.hunksRenderer.setLineAnnotations(this.lineAnnotations);let{diffStyle:h=`split`,disableErrorHandling:g=!1,disableFileHeader:_=!1,overflow:v=`scroll`}=this.options;if(_&&(this.headerElement!=null&&(this.headerElement.remove(),this.headerElement=void 0,this.lastRenderedHeaderHTML=void 0),this.headerPrefix!=null&&(this.headerPrefix.remove(),this.headerPrefix=void 0),this.headerMetadata!=null&&(this.headerMetadata.remove(),this.headerMetadata=void 0)),o=this.getOrCreateFileContainer(o,s),l){this.removeRenderedCode(),this.clearAuxiliaryNodes();try{let e=this.hunksRenderer.renderDiff(this.fileDiff,ze);e?.headerElement!=null&&this.applyHeaderToDOM(e.headerElement,o),this.renderSeparators([]),this.injectUnsafeCSS()}catch(e){if(g)throw e;console.error(e),e instanceof Error&&this.applyErrorToDOM(e,o)}return i||this.emitPostRender(),!0}try{let e=this.getOrCreatePreNode(o);if(!(this.canPartiallyRender(r,p,d||f)&&this.applyPartialRender({previousRenderRange:m,renderRange:u}))){let t=this.hunksRenderer.renderDiff(this.fileDiff,u);if(t==null)return this.workerManager?.isInitialized()===!1&&this.workerManager.initialize().then(()=>this.rerender()),!1;t.headerElement!=null&&this.applyHeaderToDOM(t.headerElement,o),t.additionsContentAST!=null||t.deletionsContentAST!=null||t.unifiedContentAST!=null?this.applyHunksToDOM(e,t):this.pre!=null&&(this.pre.remove(),this.pre=void 0),this.renderSeparators(t.hunkData)}this.applyBuffers(e,u),this.injectUnsafeCSS(),this.renderAnnotations(),this.renderGutterUtility(),this.interactionManager.setup(e),this.resizeManager.setup(e,v===`wrap`),v===`scroll`&&h===`split`?this.scrollSyncManager.setup(e,this.codeDeletions,this.codeAdditions):this.scrollSyncManager.cleanUp()}catch(e){if(g)throw e;console.error(e),e instanceof Error&&this.applyErrorToDOM(e,o)}return i||this.emitPostRender(),!0}emitPostRender(){this.fileContainer!=null&&this.options.onPostRender?.(this.fileContainer,this)}removeRenderedCode(){this.resizeManager.cleanUp(),this.scrollSyncManager.cleanUp(),this.interactionManager.cleanUp(),this.bufferBefore?.remove(),this.bufferBefore=void 0,this.bufferAfter?.remove(),this.bufferAfter=void 0,this.codeUnified?.remove(),this.codeUnified=void 0,this.codeDeletions?.remove(),this.codeDeletions=void 0,this.codeAdditions?.remove(),this.codeAdditions=void 0,this.pre?.remove(),this.pre=void 0,this.appliedPreAttributes=void 0,this.lastRowCount=void 0}clearAuxiliaryNodes(){for(let{element:e}of this.separatorCache.values())e.remove();this.separatorCache.clear();for(let{element:e}of this.annotationCache.values())e.remove();this.annotationCache.clear(),this.gutterUtilityContent?.remove(),this.gutterUtilityContent=void 0}renderPlaceholder(e){if(this.fileContainer==null)return!1;if(this.cleanChildNodes(),this.placeHolder==null){let e=this.fileContainer.shadowRoot??this.fileContainer.attachShadow({mode:`open`});this.placeHolder=document.createElement(`div`),this.placeHolder.dataset.placeholder=``,e.appendChild(this.placeHolder)}return this.placeHolder.style.setProperty(`height`,`${e}px`),!0}cleanChildNodes(){this.resizeManager.cleanUp(),this.scrollSyncManager.cleanUp(),this.interactionManager.cleanUp(),this.bufferAfter?.remove(),this.bufferBefore?.remove(),this.codeAdditions?.remove(),this.codeDeletions?.remove(),this.codeUnified?.remove(),this.errorWrapper?.remove(),this.headerElement?.remove(),this.gutterUtilityContent?.remove(),this.headerPrefix?.remove(),this.headerMetadata?.remove(),this.pre?.remove(),this.spriteSVG?.remove(),this.unsafeCSSStyle?.remove(),this.bufferAfter=void 0,this.bufferBefore=void 0,this.codeAdditions=void 0,this.codeDeletions=void 0,this.codeUnified=void 0,this.errorWrapper=void 0,this.headerElement=void 0,this.gutterUtilityContent=void 0,this.headerPrefix=void 0,this.headerMetadata=void 0,this.pre=void 0,this.spriteSVG=void 0,this.unsafeCSSStyle=void 0,this.lastRenderedHeaderHTML=void 0,this.lastRowCount=void 0}renderSeparators(e){let{hunkSeparators:t}=this.options;if(this.isContainerManaged||this.fileContainer==null||typeof t!=`function`){for(let{element:e}of this.separatorCache.values())e.remove();this.separatorCache.clear();return}let n=new Map(this.separatorCache);for(let r of e){let e=r.slotName,i=this.separatorCache.get(e);if(i==null||!vn(r,i.hunkData)){i?.element.remove();let n=document.createElement(`div`);n.style.display=`contents`,n.slot=r.slotName;let a=t(r,this);a!=null&&n.appendChild(a),this.fileContainer.appendChild(n),i={element:n,hunkData:r},this.separatorCache.set(e,i)}n.delete(e)}for(let[e,{element:t}]of n.entries())this.separatorCache.delete(e),t.remove()}renderAnnotations(){if(this.isContainerManaged||this.fileContainer==null){for(let{element:e}of this.annotationCache.values())e.remove();this.annotationCache.clear();return}let e=new Map(this.annotationCache),{renderAnnotation:t}=this.options;if(t!=null&&this.lineAnnotations.length>0)for(let[n,r]of this.lineAnnotations.entries()){let i=`${n}-${J(r)}`,a=this.annotationCache.get(i);if(a==null||!_n(r,a.annotation)){a?.element.remove();let e=t(r);if(e==null)continue;a={element:Wt(J(r)),annotation:r},a.element.appendChild(e),this.fileContainer.appendChild(a.element),this.annotationCache.set(i,a)}e.delete(i)}for(let[t,{element:n}]of e.entries())this.annotationCache.delete(t),n.remove()}renderGutterUtility(){let e=this.options.renderGutterUtility??this.options.renderHoverUtility;if(this.fileContainer==null||e==null){this.gutterUtilityContent?.remove(),this.gutterUtilityContent=void 0;return}let t=e(this.interactionManager.getHoveredLine);if(t!=null&&this.gutterUtilityContent!=null)return;if(t==null){this.gutterUtilityContent?.remove(),this.gutterUtilityContent=void 0;return}let n=Gt();n.appendChild(t),this.fileContainer.appendChild(n),this.gutterUtilityContent=n}getOrCreateFileContainer(e,t){let n=this.fileContainer;if(this.fileContainer=e??this.fileContainer??document.createElement(`diffs-container`),n!=null&&n!==this.fileContainer&&(this.lastRenderedHeaderHTML=void 0,this.headerElement=void 0),t!=null&&this.fileContainer.parentNode!==t&&t.appendChild(this.fileContainer),this.spriteSVG==null){let e=document.createElement(`div`);e.innerHTML=Bt;let t=e.firstChild;t instanceof SVGElement&&(this.spriteSVG=t,this.fileContainer.shadowRoot?.appendChild(this.spriteSVG))}return this.fileContainer}getFileContainer(){return this.fileContainer}getOrCreatePreNode(e){let t=e.shadowRoot??e.attachShadow({mode:`open`});return this.pre==null?(this.pre=document.createElement(`pre`),this.appliedPreAttributes=void 0,this.codeUnified=void 0,this.codeDeletions=void 0,this.codeAdditions=void 0,t.appendChild(this.pre)):this.pre.parentNode!==t&&(t.appendChild(this.pre),this.appliedPreAttributes=void 0),this.placeHolder?.remove(),this.placeHolder=void 0,this.pre}syncCodeNodesFromPre(e){this.codeUnified=void 0,this.codeDeletions=void 0,this.codeAdditions=void 0;for(let t of Array.from(e.children))t instanceof HTMLElement&&(`unified`in t.dataset?this.codeUnified=t:`deletions`in t.dataset?this.codeDeletions=t:`additions`in t.dataset&&(this.codeAdditions=t))}applyHeaderToDOM(e,t){this.cleanupErrorWrapper(),this.placeHolder?.remove(),this.placeHolder=void 0;let n=z(e);if(n!==this.lastRenderedHeaderHTML){let e=document.createElement(`div`);e.innerHTML=n;let r=e.firstElementChild;if(!(r instanceof HTMLElement))return;this.headerElement==null?t.shadowRoot?.prepend(r):t.shadowRoot?.replaceChild(r,this.headerElement),this.headerElement=r,this.lastRenderedHeaderHTML=n}if(this.isContainerManaged)return;let{renderHeaderPrefix:r,renderHeaderMetadata:i}=this.options;this.headerPrefix!=null&&this.headerPrefix.remove(),this.headerMetadata!=null&&this.headerMetadata.remove();let a=r?.({deletionFile:this.deletionFile,additionFile:this.additionFile,fileDiff:this.fileDiff})??void 0,o=i?.({deletionFile:this.deletionFile,additionFile:this.additionFile,fileDiff:this.fileDiff})??void 0;a!=null&&(this.headerPrefix=document.createElement(`div`),this.headerPrefix.slot=Me,a instanceof Element?this.headerPrefix.appendChild(a):this.headerPrefix.innerText=`${a}`,t.appendChild(this.headerPrefix)),o!=null&&(this.headerMetadata=document.createElement(`div`),this.headerMetadata.slot=Ce,o instanceof Element?this.headerMetadata.appendChild(o):this.headerMetadata.innerText=`${o}`,t.appendChild(this.headerMetadata))}injectUnsafeCSS(){if(this.fileContainer?.shadowRoot==null)return;let{unsafeCSS:e}=this.options;e==null||e===``||(this.unsafeCSSStyle??(this.unsafeCSSStyle=Kt(),this.fileContainer.shadowRoot.appendChild(this.unsafeCSSStyle)),this.unsafeCSSStyle.innerText=Yt(e))}applyHunksToDOM(e,t){let{overflow:n=`scroll`}=this.options,r=(this.options.hunkSeparators??`line-info`)===`line-info`,i=n===`wrap`?t.rowCount:void 0;this.cleanupErrorWrapper(),this.applyPreNodeAttributes(e,t);let a=!1,o=[],s=this.hunksRenderer.renderCodeAST(`unified`,t),c=this.hunksRenderer.renderCodeAST(`deletions`,t),l=this.hunksRenderer.renderCodeAST(`additions`,t);s==null?c!=null||l!=null?(c==null?(this.codeDeletions?.remove(),this.codeDeletions=void 0):(a=this.codeDeletions==null||this.codeUnified!=null,this.codeUnified?.remove(),this.codeUnified=void 0,this.codeDeletions=Xt({code:this.codeDeletions,columnType:`deletions`,rowSpan:i,containerSize:r}),this.codeDeletions.innerHTML=this.hunksRenderer.renderPartialHTML(c),o.push(this.codeDeletions)),l==null?(this.codeAdditions?.remove(),this.codeAdditions=void 0):(a=a||this.codeAdditions==null||this.codeUnified!=null,this.codeUnified?.remove(),this.codeUnified=void 0,this.codeAdditions=Xt({code:this.codeAdditions,columnType:`additions`,rowSpan:i,containerSize:r}),this.codeAdditions.innerHTML=this.hunksRenderer.renderPartialHTML(l),o.push(this.codeAdditions))):(this.codeUnified?.remove(),this.codeUnified=void 0,this.codeDeletions?.remove(),this.codeDeletions=void 0,this.codeAdditions?.remove(),this.codeAdditions=void 0):(a=this.codeUnified==null||this.codeAdditions!=null||this.codeDeletions!=null,this.codeDeletions?.remove(),this.codeDeletions=void 0,this.codeAdditions?.remove(),this.codeAdditions=void 0,this.codeUnified=Xt({code:this.codeUnified,columnType:`unified`,rowSpan:i,containerSize:r}),this.codeUnified.innerHTML=this.hunksRenderer.renderPartialHTML(s),o.push(this.codeUnified)),o.length===0?e.textContent=``:a&&e.replaceChildren(...o),this.lastRowCount=t.rowCount}applyPartialRender({previousRenderRange:e,renderRange:t}){let{pre:n,codeUnified:r,codeAdditions:i,codeDeletions:a,options:{diffStyle:o=`split`}}=this;if(n==null||e==null||t==null||!Number.isFinite(e.totalLines)||!Number.isFinite(t.totalLines)||this.lastRowCount==null)return!1;let s=this.getCodeColumns(o,r,a,i);if(s==null)return!1;let c=e.startingLine,l=t.startingLine,u=c+e.totalLines,d=l+t.totalLines,f=Math.max(c,l),p=Math.min(u,d);if(p<=f)return!1;let m=Math.max(0,f-c),h=Math.max(0,u-p),g=this.trimColumns({columns:s,trimStart:m,trimEnd:h,previousStart:c,overlapStart:f,overlapEnd:p,diffStyle:o});if(g<0)throw Error(`applyPartialRender: failed to trim to overlap`);if(this.lastRowCount<g)throw Error(`applyPartialRender: trimmed beyond DOM row count`);let _=this.lastRowCount-g,v=(e,t)=>{if(!(t<=0||this.fileDiff==null))return this.hunksRenderer.renderDiff(this.fileDiff,{startingLine:e,totalLines:t,bufferBefore:0,bufferAfter:0})},y=v(l,Math.max(f-l,0));if(y==null&&l<f)return!1;let b=v(p,Math.max(d-p,0));if(b==null&&d>p)return!1;let x=(e,t)=>{if(e!=null){if(o===`unified`&&!Array.isArray(s))this.insertPartialHTML(o,s,e,t);else if(o===`split`&&Array.isArray(s))this.insertPartialHTML(o,s,e,t);else throw Error(`FileDiff.applyPartialRender.applyChunk: invalid chunk application`);_+=e.rowCount}};return this.cleanupErrorWrapper(),x(y,`afterbegin`),x(b,`beforeend`),this.lastRowCount!==_&&(this.applyRowSpan(o,s,_),this.lastRowCount=_),!0}insertPartialHTML(e,t,n,r){if(e===`unified`&&!Array.isArray(t)){let e=this.hunksRenderer.renderCodeAST(`unified`,n);this.renderPartialColumn(t,e,r)}else if(e===`split`&&Array.isArray(t)){let e=this.hunksRenderer.renderCodeAST(`deletions`,n),i=this.hunksRenderer.renderCodeAST(`additions`,n);this.renderPartialColumn(t[0],e,r),this.renderPartialColumn(t[1],i,r)}else throw Error(`FileDiff.insertPartialHTML: Invalid argument composition`)}renderPartialColumn(e,t,n){if(e==null||t==null)return;let r=Dn(t[0]),i=Dn(t[1]);if(r==null||i==null)throw Error(`FileDiff.insertPartialHTML: Unexpected AST structure`);let a=i.at(0);n===`beforeend`&&a?.type===`element`&&typeof a.properties[`data-buffer-size`]==`number`&&this.mergeBuffersIfNecessary(a.properties[`data-buffer-size`],e.content.children[e.content.children.length-1],e.gutter.children[e.gutter.children.length-1],r,i,!0);let o=i.at(-1);n===`afterbegin`&&o?.type===`element`&&typeof o.properties[`data-buffer-size`]==`number`&&this.mergeBuffersIfNecessary(o.properties[`data-buffer-size`],e.content.children[0],e.gutter.children[0],r,i,!1),e.gutter.insertAdjacentHTML(n,this.hunksRenderer.renderPartialHTML(r)),e.content.insertAdjacentHTML(n,this.hunksRenderer.renderPartialHTML(i))}mergeBuffersIfNecessary(e,t,n,r,i,a){if(!(t instanceof HTMLElement)||!(n instanceof HTMLElement))return;let o=this.getBufferSize(t.dataset);o!=null&&(a?(r.shift(),i.shift()):(r.pop(),i.pop()),this.updateBufferSize(t,o+e),this.updateBufferSize(n,o+e))}applyRowSpan(e,t,n){let r=e=>{e!=null&&(e.gutter.style.setProperty(`grid-row`,`span ${n}`),e.content.style.setProperty(`grid-row`,`span ${n}`))};if(e===`unified`&&!Array.isArray(t))r(t);else if(e===`split`&&Array.isArray(t))r(t[0]),r(t[1]);else throw Error(`dun fuuuuked up`)}trimColumnRows(e,t,n){let r=0,i=0,a=0,o=!1,s=n>=0;if(e==null)return 0;let c=Array.from(e.content.children),l=Array.from(e.gutter.children);if(c.length!==l.length)throw Error(`FileDiff.trimColumnRows: columns do not match`);for(;a<c.length&&!(t<=0&&!s&&!o);){let e=l[a],u=c[a];if(a++,!(e instanceof HTMLElement)||!(u instanceof HTMLElement))throw console.error({gutterElement:e,contentElement:u}),Error(`FileDiff.trimColumnRows: invalid row elements`);if(o&&(o=!1,e.dataset.gutterBuffer===`annotation`&&`lineAnnotation`in u.dataset||e.dataset.gutterBuffer===`metadata`&&`noNewline`in u.dataset)){e.remove(),u.remove(),i++;continue}if(`lineIndex`in e.dataset&&`lineIndex`in u.dataset){(t>0||s&&r>=n)&&(e.remove(),u.remove(),t>0&&(t--,t===0&&(o=!0)),i++),r++;continue}if(`separator`in e.dataset&&`separator`in u.dataset){(t>0||s&&r>=n)&&(e.remove(),u.remove(),i++);continue}if(e.dataset.gutterBuffer===`annotation`&&`lineAnnotation`in u.dataset){(t>0||s&&r>=n)&&(e.remove(),u.remove(),i++);continue}if(e.dataset.gutterBuffer===`metadata`&&`noNewline`in u.dataset){(t>0||s&&r>=n)&&(e.remove(),u.remove(),i++);continue}if(e.dataset.gutterBuffer===`buffer`&&`contentBuffer`in u.dataset){let a=this.getBufferSize(u.dataset);if(a==null)throw Error(`FileDiff.trimColumnRows: invalid element`);if(t>0){let n=Math.min(t,a),r=a-n;r>0?(this.updateBufferSize(e,r),this.updateBufferSize(u,r),i+=n):(e.remove(),u.remove(),i+=a),t-=n}else if(s){let t=r,o=r+a-1;if(n<=t)e.remove(),u.remove(),i+=a;else if(n<=o){let t=o-n+1,r=a-t;this.updateBufferSize(e,r),this.updateBufferSize(u,r),i+=t}}r+=a;continue}throw console.error({gutterElement:e,contentElement:u}),Error(`FileDiff.trimColumnRows: unknown row elements`)}return i}trimColumns({columns:e,diffStyle:t,overlapEnd:n,overlapStart:r,previousStart:i,trimEnd:a,trimStart:o}){let s=Math.max(0,r-i),c=n-i;if(c<0)throw Error(`FileDiff.trimColumns: overlap ends before previous`);let l=o>0,u=a>0;if(!l&&!u)return 0;let d=l?s:0,f=u?c:-1;if(t===`unified`&&!Array.isArray(e))return this.trimColumnRows(e,d,f);if(t===`split`&&Array.isArray(e)){let t=this.trimColumnRows(e[0],d,f),n=this.trimColumnRows(e[1],d,f);if(e[0]!=null&&e[1]!=null&&t!==n)throw Error(`FileDiff.trimColumns: split columns out of sync`);return e[0]==null?n:t}else throw console.error({diffStyle:t,columns:e}),Error(`FileDiff.trimColumns: Invalid columns for diffType`)}getBufferSize(e){let t=Number.parseInt(e?.bufferSize??``,10);return Number.isNaN(t)?void 0:t}updateBufferSize(e,t){e.dataset.bufferSize=`${t}`,e.style.setProperty(`grid-row`,`span ${t}`),e.style.setProperty(`min-height`,`calc(${t} * 1lh)`)}getCodeColumns(e,t,n,r){function i(e){if(e==null)return;let t=e.children[0],n=e.children[1];if(!(!(t instanceof HTMLElement)||!(n instanceof HTMLElement)||t.dataset.gutter==null||n.dataset.content==null))return{gutter:t,content:n}}if(e===`unified`)return i(t);{let e=i(n),t=i(r);return e!=null||t!=null?[e,t]:void 0}}applyBuffers(e,t){let{disableVirtualizationBuffers:n=!1}=this.options;if(n||t==null){this.bufferBefore!=null&&(this.bufferBefore.remove(),this.bufferBefore=void 0),this.bufferAfter!=null&&(this.bufferAfter.remove(),this.bufferAfter=void 0);return}t.bufferBefore>0?(this.bufferBefore??(this.bufferBefore=document.createElement(`div`),this.bufferBefore.dataset.virtualizerBuffer=`before`,e.before(this.bufferBefore)),this.bufferBefore.style.setProperty(`height`,`${t.bufferBefore}px`),this.bufferBefore.style.setProperty(`contain`,`strict`)):this.bufferBefore!=null&&(this.bufferBefore.remove(),this.bufferBefore=void 0),t.bufferAfter>0?(this.bufferAfter??(this.bufferAfter=document.createElement(`div`),this.bufferAfter.dataset.virtualizerBuffer=`after`,e.after(this.bufferAfter)),this.bufferAfter.style.setProperty(`height`,`${t.bufferAfter}px`),this.bufferAfter.style.setProperty(`contain`,`strict`)):this.bufferAfter!=null&&(this.bufferAfter.remove(),this.bufferAfter=void 0)}applyPreNodeAttributes(e,{themeStyles:t,baseThemeType:n,additionsContentAST:r,deletionsContentAST:i,totalLines:a},o){let{diffIndicators:s=`bars`,disableBackground:c=!1,disableLineNumbers:l=!1,overflow:u=`scroll`,themeType:d=`system`,diffStyle:f=`split`}=this.options,p={type:`diff`,diffIndicators:s,disableBackground:c,disableLineNumbers:l,overflow:u,split:f===`unified`?!1:r!=null&&i!=null,themeStyles:t,themeType:n??d,totalLines:a,customProperties:o};Vt(p,this.appliedPreAttributes)||(Qt(e,p),this.appliedPreAttributes=p)}applyErrorToDOM(e,t){this.cleanupErrorWrapper();let n=this.getOrCreatePreNode(t);n.innerHTML=``,n.remove(),this.pre=void 0,this.appliedPreAttributes=void 0;let r=t.shadowRoot??t.attachShadow({mode:`open`});this.errorWrapper??=document.createElement(`div`),this.errorWrapper.dataset.errorWrapper=``,this.errorWrapper.innerHTML=``,r.appendChild(this.errorWrapper);let i=document.createElement(`div`);i.dataset.errorMessage=``,i.innerText=e.message,this.errorWrapper.appendChild(i);let a=document.createElement(`pre`);a.dataset.errorStack=``,a.innerText=e.stack??`No Error Stack`,this.errorWrapper.appendChild(a)}cleanupErrorWrapper(){this.errorWrapper?.remove(),this.errorWrapper=void 0}};function Dn(e){if(!(e==null||e.type!==`element`))return e.children??[]}var On=new Set,kn=new Set,An=null,jn=!1;function X(e){if(jn){On.add(e);return}kn.add(e),An??=requestAnimationFrame(Mn)}function Mn(e){jn=!0;for(let t of kn)try{t(e)}catch(e){console.error(e)}kn.clear(),On.size>0?(kn=new Set(On),On.clear(),An=requestAnimationFrame(Mn)):An=null,jn=!1}function Nn({side:e,lineNumber:t,conflictIndex:n}){return`merge-conflict-action-${e}-${t}-${n}`}function Pn(e){if(e.incomingLineNumber!=null)return{side:`additions`,lineNumber:e.incomingLineNumber};if(e.currentLineNumber!=null)return{side:`deletions`,lineNumber:e.currentLineNumber}}function Fn(e,t){let n={...He,...t};return n.hunkSeparatorHeight=In(e,t?.hunkSeparatorHeight),n}function In(e,t){if(t!=null)return t;switch(e){case`simple`:return 4;case`metadata`:case`line-info`:case`line-info-basic`:case`custom`:return 32}}var Ln=-1,Rn=class extends En{__id=`little-virtualized-file-diff:${++Ln}`;top;height=0;metrics;heightCache=new Map;isVisible=!1;virtualizer;constructor(e,t,n,r,i=!1){super(e,r,i);let{hunkSeparators:a=`line-info`}=this.options;this.virtualizer=t,this.metrics=Fn(typeof a==`function`?`custom`:a,n)}getLineHeight(e,t=!1){let n=this.heightCache.get(e);if(n!=null)return n;let r=t?2:1;return this.metrics.lineHeight*r}setOptions(e){if(e==null)return;let t=this.options.diffStyle,n=this.options.overflow,r=this.options.collapsed;super.setOptions(e),(t!==this.options.diffStyle||n!==this.options.overflow||r!==this.options.collapsed)&&(this.heightCache.clear(),this.computeApproximateSize(),this.renderRange=void 0),this.virtualizer.instanceChanged(this)}reconcileHeights(){let{overflow:e=`scroll`}=this.options;if(this.fileContainer!=null&&(this.top=this.virtualizer.getOffsetInScrollContainer(this.fileContainer)),this.fileContainer==null||this.fileDiff==null){this.height=0;return}if(e===`scroll`&&this.lineAnnotations.length===0&&!this.virtualizer.config.resizeDebugging)return;let t=this.getDiffStyle(),n=!1,r=t===`split`?[this.codeDeletions,this.codeAdditions]:[this.codeUnified];for(let e of r){if(e==null)continue;let r=e.children[1];if(r instanceof HTMLElement)for(let e of r.children){if(!(e instanceof HTMLElement))continue;let r=e.dataset.lineIndex;if(r==null)continue;let i=Bn(r,t),a=e.getBoundingClientRect().height,o=!1;e.nextElementSibling instanceof HTMLElement&&(`lineAnnotation`in e.nextElementSibling.dataset||`noNewline`in e.nextElementSibling.dataset)&&(`noNewline`in e.nextElementSibling.dataset&&(o=!0),a+=e.nextElementSibling.getBoundingClientRect().height);let s=this.getLineHeight(i,o);a!==s&&(n=!0,a===this.metrics.lineHeight*(o?2:1)?this.heightCache.delete(i):this.heightCache.set(i,a))}}(n||this.virtualizer.config.resizeDebugging)&&this.computeApproximateSize()}onRender=e=>this.fileContainer==null?!1:(e&&(this.top=this.virtualizer.getOffsetInScrollContainer(this.fileContainer)),this.render());cleanUp(){this.fileContainer!=null&&this.virtualizer.disconnect(this.fileContainer),super.cleanUp()}expandHunk=(e,t,n)=>{this.hunksRenderer.expandHunk(e,t,n),this.computeApproximateSize(),this.renderRange=void 0,this.virtualizer.instanceChanged(this)};setVisibility(e){this.fileContainer!=null&&(this.renderRange=void 0,e&&!this.isVisible?(this.top=this.virtualizer.getOffsetInScrollContainer(this.fileContainer),this.isVisible=!0):!e&&this.isVisible&&(this.isVisible=!1,this.rerender()))}computeApproximateSize(){let e=this.height===0;if(this.height=0,this.fileDiff==null)return;let{disableFileHeader:t=!1,expandUnchanged:n=!1,collapsed:r=!1,collapsedContextThreshold:i=1,hunkSeparators:a=`line-info`}=this.options,{diffHeaderHeight:o,fileGap:s,hunkSeparatorHeight:c}=this.metrics,l=this.getDiffStyle(),u=a!==`simple`&&a!==`metadata`&&a!==`line-info-basic`?s:0;if(t?a!==`simple`&&a!==`metadata`&&(this.height+=s):this.height+=o,!r&&(De({diff:this.fileDiff,diffStyle:l,expandedHunks:n?!0:this.hunksRenderer.getExpandedHunksMap(),collapsedContextThreshold:i,callback:({hunkIndex:e,collapsedBefore:t,collapsedAfter:n,deletionLine:r,additionLine:i})=>{let o=i==null?r.splitLineIndex:i.splitLineIndex,s=i==null?r.unifiedLineIndex:i.unifiedLineIndex,d=(i?.noEOFCR??!1)||(r?.noEOFCR??!1);t>0&&(e>0&&(this.height+=u),this.height+=c+u),this.height+=this.getLineHeight(l===`split`?o:s,d),n>0&&a!==`simple`&&(this.height+=u+c)}}),this.fileDiff.hunks.length>0&&(this.height+=s),this.fileContainer!=null&&this.virtualizer.config.resizeDebugging&&!e)){let e=this.fileContainer.getBoundingClientRect();e.height===this.height?console.log(`VirtualizedFileDiff.computeApproximateSize: computed height IS CORRECT`):console.log(`VirtualizedFileDiff.computeApproximateSize: computed height doesnt match`,{name:this.fileDiff.name,elementHeight:e.height,computedHeight:this.height})}}render({fileContainer:e,oldFile:t,newFile:n,fileDiff:r,...i}={}){let a=this.fileContainer==null;if(this.fileDiff??=r??(t!=null&&n!=null?wn(t,n):void 0),e=this.getOrCreateFileContainer(e),this.fileDiff==null)return console.error(`VirtualizedFileDiff.render: attempting to virtually render when we dont have the correct data`),!1;if(a?(this.computeApproximateSize(),this.virtualizer.connect(e,this),this.top??=this.virtualizer.getOffsetInScrollContainer(e),this.isVisible=this.virtualizer.isInstanceVisible(this.top,this.height)):this.top??=this.virtualizer.getOffsetInScrollContainer(e),!this.isVisible)return this.renderPlaceholder(this.height);let o=this.virtualizer.getWindowSpecs(),s=this.computeRenderRangeFromWindow(this.fileDiff,this.top,o);return super.render({fileDiff:this.fileDiff,fileContainer:e,renderRange:s,oldFile:t,newFile:n,...i})}getDiffStyle(){return this.options.diffStyle??`split`}getExpandedRegion(e,t,n){if(n<=0||e)return{fromStart:0,fromEnd:0,collapsedLines:Math.max(n,0),renderAll:!1};let{expandUnchanged:r=!1,collapsedContextThreshold:i=1}=this.options;if(r||n<=i)return{fromStart:n,fromEnd:0,collapsedLines:0,renderAll:!0};let a=this.hunksRenderer.getExpandedHunk(t),o=Math.min(Math.max(a.fromStart,0),n),s=Math.min(Math.max(a.fromEnd,0),n),c=o+s,l=c>=n;return{fromStart:o,fromEnd:s,collapsedLines:Math.max(n-c,0),renderAll:l}}getExpandedLineCount(e,t){let n=0;if(e.isPartial){for(let r of e.hunks)n+=t===`split`?r.splitLineCount:r.unifiedLineCount;return n}for(let[r,i]of e.hunks.entries()){let a=t===`split`?i.splitLineCount:i.unifiedLineCount;n+=a;let o=Math.max(i.collapsedBefore,0),{fromStart:s,fromEnd:c,renderAll:l}=this.getExpandedRegion(e.isPartial,r,o);o>0&&(n+=l?o:s+c)}let r=e.hunks.at(-1);if(r!=null&&zn(e)){let t=e.additionLines.length-(r.additionLineIndex+r.additionCount),i=e.deletionLines.length-(r.deletionLineIndex+r.deletionCount);if(r!=null&&t!==i)throw Error(`VirtualizedFileDiff: trailing context mismatch (additions=${t}, deletions=${i}) for ${e.name}`);let a=Math.min(t,i);if(r!=null&&a>0){let{fromStart:t,renderAll:r}=this.getExpandedRegion(e.isPartial,e.hunks.length,a);n+=r?a:t}}return n}computeRenderRangeFromWindow(e,t,{top:n,bottom:r}){let{disableFileHeader:i=!1,expandUnchanged:a=!1,collapsedContextThreshold:o=1,hunkSeparators:s=`line-info`}=this.options,{diffHeaderHeight:c,fileGap:l,hunkLineCount:u,hunkSeparatorHeight:d,lineHeight:f}=this.metrics,p=this.getDiffStyle(),m=this.height,h=this.getExpandedLineCount(e,p),g=i?l:c;if(t<n-m||t>r)return{startingLine:0,totalLines:0,bufferBefore:0,bufferAfter:m-g-l};if(h<=u||e.hunks.length===0)return{startingLine:0,totalLines:u,bufferBefore:0,bufferAfter:0};let _=Math.ceil(Math.max(r-n,0)/f),v=Math.ceil(_/u)*u+u,y=v/u,b=y,x=[],S=(n+r)/2,C=s===`simple`||s===`metadata`||s===`line-info-basic`?0:l,w=t+g,T=0,E,D,O;if(De({diff:e,diffStyle:p,expandedHunks:a?!0:this.hunksRenderer.getExpandedHunksMap(),collapsedContextThreshold:o,callback:({hunkIndex:e,collapsedBefore:i,collapsedAfter:a,deletionLine:o,additionLine:c})=>{let l=c==null?o.splitLineIndex:c.splitLineIndex,f=c==null?o.unifiedLineIndex:c.unifiedLineIndex,m=(c?.noEOFCR??!1)||(o?.noEOFCR??!1),h=i>0?d+C+(e>0?C:0):0;e===0&&s===`simple`&&(h=0),w+=h;let _=T%u===0;if(_&&(x.push(w-(t+g+h)),O!=null)){if(O<=0)return!0;O--}let v=this.getLineHeight(p===`split`?l:f,m),y=Math.floor(T/u);return w>n-v&&w<r&&(E??=y),D==null&&w+v>S&&(D=y),O==null&&w>=r&&_&&(O=b),T++,w+=v,a>0&&s!==`simple`&&(w+=d+C),!1}}),E==null)return{startingLine:0,totalLines:0,bufferBefore:0,bufferAfter:m-g-l};let k=x.length;D??=E;let A=Math.round(D-y/2),j=Math.max(0,k-y),M=Math.max(0,Math.min(A,j)),N=M*u,P=A<0?v+A*u:v,F=x[M]??0,ee=M+P/u;return{startingLine:N,totalLines:P,bufferBefore:F,bufferAfter:ee<x.length?m-g-x[ee]-l:m-(w-t)-l}}};function zn(e){let t=e.hunks.at(-1);return t==null||e.isPartial||e.additionLines.length===0||e.deletionLines.length===0?!1:t.additionLineIndex+t.additionCount<e.additionLines.length||t.deletionLineIndex+t.deletionCount<e.deletionLines.length}function Bn(e,t){let[n,r]=e.split(`,`).map(Number);return t===`split`?r:n}function Vn(e,t){return e==null||t==null?e===t:e.top===t.top&&e.bottom===t.bottom}function Hn({scrollTop:e,scrollHeight:t,height:n,containerOffset:r=0,fitPerfectly:i,overscrollSize:a}){let o=n+a*2,s=i?n:o;if(t=Math.max(t,s),o>=t||i){let n=Math.max(e-r,0),i=Math.min(e+s,t)-r;return{top:n,bottom:Math.max(i,n)}}let c=e+n/2-o/2,l=c+o;return c<0&&(c=0),l>t&&(l=t),c=Math.floor(Math.max(c-r,0)),{top:c,bottom:Math.ceil(Math.max(Math.min(l,t)-r,c))}}var Un=1e3,Wn=Un*4,Gn=[0,1e-6,.99999,1],Kn={overscrollSize:Un,intersectionObserverMargin:Wn,resizeDebugging:!1},qn=0,Jn=-1,Yn=class e{static __STOP=!1;static __lastScrollPosition=0;__id=`virtualizer-${++Jn}`;config;type=`basic`;intersectionObserver;scrollTop=0;height=0;scrollHeight=0;windowSpecs={top:0,bottom:0};root;contentContainer;resizeObserver;observers=new Map;visibleInstances=new Map;visibleInstancesDirty=!1;instancesChanged=new Set;scrollDirty=!0;heightDirty=!0;scrollHeightDirty=!0;renderedObservers=0;connectQueue=new Map;constructor(e){this.config={...Kn,...e}}setup(t,n){if(this.root==null){this.root=t,this.resizeObserver=new ResizeObserver(this.handleContainerResize),this.intersectionObserver=new IntersectionObserver(this.handleIntersectionChange,{root:this.root,threshold:Gn,rootMargin:`${this.config.intersectionObserverMargin}px 0px ${this.config.intersectionObserverMargin}px 0px`}),t instanceof Document?this.setupWindow():this.setupElement(n),window.__INSTANCE=this,window.__TOGGLE=()=>{e.__STOP?(e.__STOP=!1,(this.getScrollContainerElement()??window).scrollTo({top:e.__lastScrollPosition}),X(this.computeRenderRangeAndEmit)):(e.__lastScrollPosition=this.getScrollTop(),e.__STOP=!0)};for(let[e,t]of this.connectQueue.entries())this.connect(e,t);this.connectQueue.clear(),this.markDOMDirty(),X(this.computeRenderRangeAndEmit)}}instanceChanged(e){this.instancesChanged.add(e),this.markDOMDirty(),X(this.computeRenderRangeAndEmit)}getWindowSpecs(){return this.windowSpecs.top===0&&this.windowSpecs.bottom===0&&(this.windowSpecs=Hn({scrollTop:this.getScrollTop(),height:this.getHeight(),scrollHeight:this.getScrollHeight(),fitPerfectly:!1,overscrollSize:this.config.overscrollSize})),this.windowSpecs}isInstanceVisible(e,t){let n=this.getScrollTop(),r=this.getHeight(),i=this.config.intersectionObserverMargin,a=n-i,o=n+r+i;return!(e<a-t||e>o)}handleContainerResize=e=>{if(this.root==null)return;let t=!1;for(let n of e){let e=n.borderBoxSize[0].blockSize;this.root instanceof Document?e!==this.scrollHeight&&(this.scrollHeightDirty=!0,t=!0,this.config.resizeDebugging&&(console.log(`Virtualizer: content size change`,this.__id,{sizeChange:e-qn,newSize:e}),qn=e)):n.target===this.root?e!==this.height&&(this.heightDirty=!0,t=!0):n.target===this.contentContainer&&(this.scrollHeightDirty=!0,t=!0,this.config.resizeDebugging&&(console.log(`Virtualizer: scroller size change`,this.__id,{sizeChange:e-qn,newSize:e}),qn=e))}t&&X(this.computeRenderRangeAndEmit)};setupWindow(){if(this.root==null||!(this.root instanceof Document))throw Error(`Virtualizer.setupWindow: Invalid setup method`);window.addEventListener(`scroll`,this.handleWindowScroll,{passive:!0}),window.addEventListener(`resize`,this.handleWindowResize,{passive:!0}),this.resizeObserver?.observe(this.root.documentElement)}setupElement(e){if(this.root==null||this.root instanceof Document)throw Error(`Virtualizer.setupElement: Invalid setup method`);this.root.addEventListener(`scroll`,this.handleElementScroll,{passive:!0}),this.resizeObserver?.observe(this.root),e??=this.root.firstElementChild??void 0,e instanceof HTMLElement&&(this.contentContainer=e,this.resizeObserver?.observe(e))}cleanUp(){this.resizeObserver?.disconnect(),this.resizeObserver=void 0,this.intersectionObserver?.disconnect(),this.intersectionObserver=void 0,this.root?.removeEventListener(`scroll`,this.handleElementScroll),window.removeEventListener(`scroll`,this.handleWindowScroll),window.removeEventListener(`resize`,this.handleWindowResize),this.root=void 0,this.contentContainer=void 0,this.observers.clear(),this.visibleInstances.clear(),this.instancesChanged.clear(),this.connectQueue.clear(),this.visibleInstancesDirty=!1,this.windowSpecs={top:0,bottom:0},this.scrollTop=0,this.height=0,this.scrollHeight=0}getOffsetInScrollContainer(e){return this.getScrollTop()+Z(e,this.getScrollContainerElement())}connect(e,t){if(this.observers.has(e))throw Error(`Virtualizer.connect: instance is already connected...`);return this.intersectionObserver==null?this.connectQueue.set(e,t):(this.intersectionObserver.observe(e),this.observers.set(e,t),this.instancesChanged.add(t),this.markDOMDirty(),X(this.computeRenderRangeAndEmit)),()=>this.disconnect(e)}disconnect(e){let t=this.observers.get(e);this.connectQueue.delete(e),t!=null&&(this.intersectionObserver?.unobserve(e),this.observers.delete(e),this.visibleInstances.delete(e)&&(this.visibleInstancesDirty=!0),this.markDOMDirty(),X(this.computeRenderRangeAndEmit))}handleWindowResize=()=>{e.__STOP||window.innerHeight===this.height||(this.heightDirty=!0,X(this.computeRenderRangeAndEmit))};handleWindowScroll=()=>{e.__STOP||this.root==null||!(this.root instanceof Document)||(this.scrollDirty=!0,X(this.computeRenderRangeAndEmit))};handleElementScroll=()=>{e.__STOP||this.root==null||this.root instanceof Document||(this.scrollDirty=!0,X(this.computeRenderRangeAndEmit))};computeRenderRangeAndEmit=()=>{if(e.__STOP)return;let t=this.heightDirty||this.scrollHeightDirty;if(!this.scrollDirty&&!this.scrollHeightDirty&&!this.heightDirty&&this.renderedObservers===this.observers.size&&!this.visibleInstancesDirty&&this.instancesChanged.size===0)return;if(this.instancesChanged.size===0){let e=Hn({scrollTop:this.getScrollTop(),height:this.getHeight(),scrollHeight:this.getScrollHeight(),fitPerfectly:!1,overscrollSize:this.config.overscrollSize});if(Vn(this.windowSpecs,e)&&this.renderedObservers===this.observers.size&&!this.visibleInstancesDirty&&this.instancesChanged.size===0)return;this.windowSpecs=e}this.visibleInstancesDirty=!1,this.renderedObservers=this.observers.size;let n=this.getScrollAnchor(this.height),r=new Set;for(let e of t?this.observers.values():this.visibleInstances.values())e.onRender(t)&&r.add(e);for(let e of this.instancesChanged)r.has(e)||e.onRender(t)&&r.add(e);this.scrollFix(n),this.instancesChanged.size>0&&this.markDOMDirty();for(let e of r)e.reconcileHeights();(this.instancesChanged.size>0||t)&&X(this.computeRenderRangeAndEmit),r.clear(),this.instancesChanged.clear()};scrollFix(e){if(e==null)return;let t=this.getScrollContainerElement(),{lineIndex:n,lineOffset:r,fileElement:i,fileOffset:a,fileTypeOffset:o}=e;if(n!=null&&r!=null){let e=i.shadowRoot?.querySelector(`[data-line][data-line-index="${n}"]`);if(e instanceof HTMLElement){let n=Z(e,t);if(n!==r){let e=n-r;this.applyScrollFix(e)}return}}let s=Z(i,t);if(o===`top`)s!==a&&this.applyScrollFix(s-a);else{let e=s+i.getBoundingClientRect().height;e!==a&&this.applyScrollFix(e-a)}}applyScrollFix(e){this.root==null||this.root instanceof Document?window.scrollTo({top:window.scrollY+e,behavior:`instant`}):this.root.scrollTo({top:this.root.scrollTop+e,behavior:`instant`}),this.markDOMDirty()}getScrollAnchor(e){let t=this.getScrollContainerElement(),n;for(let[r]of this.visibleInstances.entries()){let i=Z(r,t),a=i+r.offsetHeight,o,s;a<=0?(o=a,s=`bottom`):(o=i,s=`top`);let c,l;if(a>0&&i<e)for(let e of r.shadowRoot?.querySelectorAll(`[data-line][data-line-index]`)??[]){if(!(e instanceof HTMLElement))continue;let n=e.dataset.lineIndex;if(n==null)continue;let r=Z(e,t);if(!(r<0)){c=n,l=r;break}}if(n?.lineOffset!=null&&l==null)continue;let u=!1;(n==null||l!=null&&(n.lineOffset==null||l<n.lineOffset)||l==null&&n.lineOffset==null&&(o>=0&&(n.fileOffset<0||o<n.fileOffset)||o<0&&n.fileOffset<0&&o>n.fileOffset))&&(u=!0),u&&(n={fileElement:r,fileTypeOffset:s,fileOffset:o,lineIndex:c,lineOffset:l})}return n}handleIntersectionChange=e=>{this.scrollDirty=!0;for(let{target:t,isIntersecting:n}of e){if(!(t instanceof HTMLElement))throw Error(`Virtualizer.handleIntersectionChange: target not an HTMLElement`);let e=this.observers.get(t);if(e==null)throw Error(`Virtualizer.handleIntersectionChange: no instance for target`);n&&!this.visibleInstances.has(t)?(e.setVisibility(!0),this.visibleInstances.set(t,e),this.visibleInstancesDirty=!0):!n&&this.visibleInstances.has(t)&&(e.setVisibility(!1),this.visibleInstances.delete(t),this.visibleInstancesDirty=!0)}this.visibleInstancesDirty&&X(this.computeRenderRangeAndEmit)};getScrollTop(){if(!this.scrollDirty)return this.scrollTop;this.scrollDirty=!1;let e=this.root==null?0:this.root instanceof Document?window.scrollY:this.root.scrollTop;return e=Math.max(0,Math.min(e,this.getScrollHeight()-this.getHeight())),this.scrollTop=e,e}getScrollHeight(){return this.scrollHeightDirty?(this.scrollHeightDirty=!1,this.scrollHeight=this.root==null?0:this.root instanceof Document?this.root.documentElement.scrollHeight:this.root.scrollHeight,this.scrollHeight):this.scrollHeight}getHeight(){return this.heightDirty?(this.heightDirty=!1,this.height=this.root==null?0:this.root instanceof Document?globalThis.innerHeight:this.root.getBoundingClientRect().height,this.height):this.height}markDOMDirty(){this.scrollDirty=!0,this.scrollHeightDirty=!0,this.heightDirty=!0}getScrollContainerElement(){return this.root==null||this.root instanceof Document?void 0:this.root}};function Z(e,t){let n=e.getBoundingClientRect(),r=t?.getBoundingClientRect().top??0;return n.top-r}function Xn(e,t,n){if(e===t||e==null||t==null)return e===t;let r=new Set(n),i=Object.keys(e),a=new Set(Object.keys(t));for(let n of i)if(a.delete(n),!r.has(n)&&(!(n in t)||e[n]!==t[n]))return!1;for(let e of Array.from(a))if(!r.has(e))return!1;return!0}function Zn(e,t){return Ge(e?.theme??H,t?.theme??H)&&Xn(e,t,[`theme`])}var Qn={position:`absolute`,top:0,bottom:0,textAlign:`center`},$n={display:`contents`};function er(){return null}var Q=I();function tr(e,t){return typeof window>`u`&&t!=null?(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsx)(`template`,{shadowrootmode:`open`,dangerouslySetInnerHTML:{__html:t}}),e]}):(0,Q.jsx)(Q.Fragment,{children:e})}var $=e(t(),1),nr=(0,$.createContext)(void 0);function rr(){return(0,$.useContext)(nr)}function ir(e){let t=(0,$.useRef)(e);return(0,$.useInsertionEffect)(()=>void(t.current=e)),(0,$.useCallback)((...e)=>t.current(...e),[])}function ar({fileDiff:e,actions:t,deletionFile:n,additionFile:r,renderHeaderPrefix:i,renderHeaderMetadata:a,renderAnnotation:o,renderGutterUtility:s,renderHoverUtility:c,renderMergeConflictUtility:l,lineAnnotations:u,getHoveredLine:d,getInstance:f}){let p=s??c,m=i?.({fileDiff:e,deletionFile:n,additionFile:r}),h=a?.({fileDiff:e,deletionFile:n,additionFile:r});return(0,Q.jsxs)(Q.Fragment,{children:[m!=null&&(0,Q.jsx)(`div`,{slot:`header-prefix`,children:m}),h!=null&&(0,Q.jsx)(`div`,{slot:`header-metadata`,children:h}),o!=null&&u?.map((e,t)=>(0,Q.jsx)(`div`,{slot:J(e),children:o(e)},t)),t!=null&&l!=null&&f!=null&&t.map(e=>{let t=or(e);return(0,Q.jsx)(`div`,{slot:t,style:$n,children:l(e,f)},t)}),p!=null&&(0,Q.jsx)(`div`,{slot:`gutter-utility-slot`,style:Qn,children:p(d)})]})}function or(e){let t=Pn(e);return t==null?void 0:Nn({...t,conflictIndex:e.conflictIndex})}var sr=typeof window>`u`?$.useEffect:$.useLayoutEffect;function cr({oldFile:e,newFile:t,fileDiff:n,options:r,lineAnnotations:i,selectedLines:a,prerenderedHTML:o,metrics:s,hasGutterRenderUtility:c}){let l=rr(),u=(0,$.useContext)(Te),d=(0,$.useRef)(null),f=ir(a=>{if(a!=null){if(d.current!=null)throw Error(`useFileDiffInstance: An instance should not already exist when a node is created`);l==null?d.current=new En(lr(r,c),u,!0):d.current=new Rn(lr(r,c),l,s,u,!0),d.current.hydrate({fileDiff:n,oldFile:e,newFile:t,fileContainer:a,lineAnnotations:i,prerenderedHTML:o})}else{if(d.current==null)throw Error(`useFileDiffInstance: A FileDiff instance should exist when unmounting`);d.current.cleanUp(),d.current=null}});return sr(()=>{let{current:o}=d;if(o==null)return;let s=lr(r,c),l=!Zn(o.options,s);o.setOptions(s),o.render({forceRender:l,fileDiff:n,oldFile:e,newFile:t,lineAnnotations:i}),a!==void 0&&o.setSelectedLines(a)}),{ref:f,getHoveredLine:(0,$.useCallback)(()=>d.current?.getHoveredLine(),[])}}function lr(e,t){return t?{...e,renderGutterUtility:er}:e}function ur({fileDiff:e,options:t,metrics:n,lineAnnotations:r,selectedLines:i,className:a,style:o,prerenderedHTML:s,renderAnnotation:c,renderHeaderPrefix:l,renderHeaderMetadata:u,renderGutterUtility:d,renderHoverUtility:f}){let{ref:p,getHoveredLine:m}=cr({fileDiff:e,options:t,metrics:n,lineAnnotations:r,selectedLines:i,prerenderedHTML:s,hasGutterRenderUtility:d!=null||f!=null});return(0,Q.jsx)(Fe,{ref:p,className:a,style:o,children:tr(ar({fileDiff:e,renderHeaderPrefix:l,renderHeaderMetadata:u,renderAnnotation:c,renderGutterUtility:d,lineAnnotations:r,renderHoverUtility:f,getHoveredLine:m}),s)})}var dr=`var(--color-token-main-surface-primary)`,fr=`var(--color-token-diff-surface)`,pr=`
  --codex-diffs-surface: ${dr};
  --codex-diffs-context-surface: color-mix(
  in srgb,
  var(--codex-diffs-surface) 94%,
  var(--color-token-main-surface-primary)
);
  --codex-diffs-separator-surface: color-mix(
  in srgb,
  var(--codex-diffs-surface) 94%,
  var(--color-token-text-link-foreground)
);
  --codex-diffs-hover-surface: color-mix(
  in srgb,
  var(--codex-diffs-surface) 92%,
  var(--color-token-main-surface-primary)
);
  --codex-diffs-header-surface: var(--codex-diffs-surface);
  --codex-diffs-context-number: color-mix(
  in lab,
  var(--codex-diffs-surface) 98.5%,
  var(--diffs-mixer)
);
  --codex-diffs-addition-number: color-mix(
  in srgb,
  var(--codex-diffs-surface) 91%,
  var(--diffs-addition-color-override)
);
  --codex-diffs-deletion-number: color-mix(
  in srgb,
  var(--codex-diffs-surface) 91%,
  var(--diffs-deletion-color-override)
);
  --diffs-bg-context-override: var(--codex-diffs-context-surface);
  --diffs-bg-separator-override: var(--codex-diffs-separator-surface);
  --diffs-bg-hover-override: var(--codex-diffs-hover-surface);
  --diffs-bg-addition-override: color-mix(
  in srgb,
  var(--codex-diffs-surface) 88%,
  var(--diffs-addition-color-override)
);
  --diffs-bg-addition-number-override: var(--codex-diffs-addition-number);
  --diffs-bg-deletion-override: color-mix(
  in srgb,
  var(--codex-diffs-surface) 88%,
  var(--diffs-deletion-color-override)
);
  --diffs-bg-deletion-number-override: var(--codex-diffs-deletion-number);
`;function mr({includeDiffHeader:e,includeSimpleLineSeparators:t,rootSelector:n,surface:r}){return`
  ${e?`[data-diffs-header],
  ${n}`:n} {
    ${pr}
    --diffs-bg: ${r} !important;
    background-color: ${r} !important;
  }

  ${n} [data-utility-button] {
    background-color: var(--color-token-foreground);
    color: var(--color-token-side-bar-background);
    border: none;
    border-radius: 4px;
  }

  ${n} [data-utility-button]:hover {
    background-color: color-mix(
      in srgb,
      var(--color-token-foreground) 88%,
      var(--color-token-side-bar-background)
    );
  }

  ${n} [data-selected-line][data-line-annotation] {
    background-color: var(--diffs-bg);
  }

  mark.codex-thread-find-match {
    background-color: var(--vscode-charts-yellow);
    color: var(--color-token-foreground);
    border-radius: var(--radius-2xs);
    padding: 0;
    margin: 0;
    border: 0;
    font: inherit;
    line-height: inherit;
    letter-spacing: inherit;
    word-spacing: inherit;
    vertical-align: baseline;
  }

  mark.codex-thread-find-active {
    background-color: var(--vscode-charts-orange);
  }
${t?`
  :host(.composer-diff-simple-line) [data-separator]:empty {
    background-color: transparent;
  }

  :host(.composer-diff-simple-line) [data-separator]:empty::after {
    content: "";
    grid-column: 2 / 3;
    align-self: center;
    margin-inline: 1ch;
    border-top: 1px solid color-mix(in srgb, var(--diffs-fg) 18%, transparent);
  }
`:``}`}function hr(e,t){return e?t===`diff`?fr:dr:`var(--color-token-side-bar-background)`}function gr(){let e=(0,W.c)(7),{data:t,isLoading:n}=F(),r,i;if(e[0]!==t){let n=t?.platform==null?vr():yr(t.platform);r=n,i=_r(n),e[0]=t,e[1]=r,e[2]=i}else r=e[1],i=e[2];let a;return e[3]!==n||e[4]!==r||e[5]!==i?(a={platform:r,modifierSymbol:i,isLoading:n},e[3]=n,e[4]=r,e[5]=i,e[6]=a):a=e[6],a}function _r(e){return e===`macOS`?`⌘`:`^`}function vr(){let e=typeof navigator>`u`?``:navigator.platform??``;return e.startsWith(`Mac`)?`macOS`:e.startsWith(`Win`)?`windows`:`linux`}function yr(e){return e===`win32`?`windows`:e===`darwin`?`macOS`:`linux`}var br=`in_app_browser`;function xr(){let e=(0,W.c)(1),t=te(),n;e[0]===Symbol.for(`react.memo_cache_sentinel`)?(n=`4250630194`,e[0]=n):n=e[0];let r=re(n),{data:i}=R(),a=i!=null,o=i?.requirements?.featureRequirements?.[br]===!1;return t===`electron`&&r&&a&&!o}function Sr(){let e=(0,W.c)(4),{data:t}=Ke(),n;e[0]===t?n=e[1]:(n=t===void 0?[]:t,e[0]=t,e[1]=n);let r=n,i;return e[2]===r?i=e[3]:(i=r.some(Cr),e[2]=r,e[3]=i),i}function Cr(e){return e.name===`apps`&&e.enabled}var wr=s(i,{log:()=>{}});function Tr(e){let t=(0,W.c)(9),n=D(),o=j(),s=_(i),c;t[0]===n.serviceTier?c=t[1]:(c=a(n.serviceTier),t[0]=n.serviceTier,t[1]=c);let l=c,u;t[2]!==l||t[3]!==s||t[4]!==o?(u=async(e,t)=>{let n=a(e),i=l??`standard`,c=n??`standard`;try{o(n)}catch(e){let t=e;r.error(`Failed to set default service tier`,{safe:{},sensitive:{error:t}});return}s.get(wr).log({eventName:`codex_service_tier_changed`,metadata:{previous_service_tier:i,service_tier:c,source:t}})},t[2]=l,t[3]=s,t[4]=o,t[5]=u):u=t[5];let d=u,f;return t[6]!==n||t[7]!==d?(f={serviceTierSettings:n,setServiceTier:d},t[6]=n,t[7]=d,t[8]=f):f=t[8],f}var Er=[null,`fast`],Dr=`:is([data-diff], [data-file])`;function Or(e){let t=(0,W.c)(43),n,r,i,a,o,s,c,l,u,d,f,p;t[0]===e?(n=t[1],r=t[2],i=t[3],a=t[4],o=t[5],s=t[6],c=t[7],l=t[8],u=t[9],d=t[10],f=t[11],p=t[12]):({fileDiff:r,className:n,hunkSeparators:d,isLoadingFullContent:f,lineAnnotations:i,metrics:a,onGutterUtilityClick:o,onPostRender:s,renderAnnotation:c,selectedLines:u,overflow:p,...l}=e,t[0]=e,t[1]=n,t[2]=r,t[3]=i,t[4]=a,t[5]=o,t[6]=s,t[7]=c,t[8]=l,t[9]=u,t[10]=d,t[11]=f,t[12]=p);let m=d===void 0?`line-info`:d,h=p===void 0?`scroll`:p,g=(0,$.useRef)(null),_=te(),v=Re(Pe()),b=_===`electron`,x;t[13]===b?x=t[14]:(x={enabled:b},t[13]=b,t[14]=x);let{data:S}=ke(y.APPEARANCE_LIGHT_CODE_THEME_ID,x),C=_===`electron`,w;t[15]===C?w=t[16]:(w={enabled:C},t[15]=C,t[16]=w);let{data:T}=ke(y.APPEARANCE_DARK_CODE_THEME_ID,w),E=ee(),D;t[17]!==v||t[18]!==T||t[19]!==S?(D=v===`light`?Be(S,`light`):Be(T,`dark`),t[17]=v,t[18]=T,t[19]=S,t[20]=D):D=t[20];let O=D,k=xe(void 0),A;t[21]===s?A=t[22]:(A=()=>{if(s==null||g.current==null)return;let e=window.requestAnimationFrame(()=>{g.current!=null&&s(g.current)});return()=>{window.cancelAnimationFrame(e)}},t[21]=s,t[22]=A),(0,$.useEffect)(A);let j=ur,M=_===`extension`&&E!=null?E?`dark`:`light`:v,N=_===`extension`?{dark:Be(k.id,`dark`).name,light:Be(k.id,`light`).name}:O.name,P=o!=null,F;t[23]===Symbol.for(`react.memo_cache_sentinel`)?(F=mr({includeDiffHeader:!0,includeSimpleLineSeparators:!0,rootSelector:Dr,surface:`var(--codex-diffs-surface)`}),t[23]=F):F=t[23];let I;t[24]!==m||t[25]!==o||t[26]!==h||t[27]!==l||t[28]!==M||t[29]!==N||t[30]!==P?(I={overflow:h,hunkSeparators:m,themeType:M,theme:N,disableFileHeader:!0,enableGutterUtility:P,onGutterUtilityClick:o,unsafeCSS:F,...l},t[24]=m,t[25]=o,t[26]=h,t[27]=l,t[28]=M,t[29]=N,t[30]=P,t[31]=I):I=t[31];let L;t[32]!==j||t[33]!==r||t[34]!==i||t[35]!==a||t[36]!==c||t[37]!==u||t[38]!==I?(L=(0,Q.jsx)(j,{fileDiff:r,lineAnnotations:i,metrics:a,renderAnnotation:c,selectedLines:u,options:I}),t[32]=j,t[33]=r,t[34]=i,t[35]=a,t[36]=c,t[37]=u,t[38]=I,t[39]=L):L=t[39];let R;return t[40]!==n||t[41]!==L?(R=(0,Q.jsx)(`div`,{ref:g,className:n,children:L}),t[40]=n,t[41]=L,t[42]=R):R=t[42],R}var kr=`agent-mode-by-host-id`,Ar=k(kr,{}),jr=k(`preferred-non-full-access-agent-mode-by-host-id`,{});function Mr(e,t){N(kr,{...A(kr,{}),[e]:t})}function Nr(e,t){return t[e]??null}var Pr={isSet:!1,value:null},Fr=h(null),Ir=h(!1),Lr=h(Pr),Rr=O(e=>h(null)),zr=O(e=>h(!1)),Br=O(e=>h(Pr)),Vr=c(i,e=>p(i,({get:t})=>t(t(T,e))?.at(-1)?.params??null));function Hr(e){let{conversationId:t,stateScope:n}=e,r=n===void 0?`composer`:n;return!Wr()||r===`global-default`?`global-default`:t??`draft`}function Ur(e){let t=(0,W.c)(8),n=v(Vr,e),r=n?.approvalPolicy??void 0,i=n?.approvalsReviewer??void 0,a=n?.sandboxPolicy??void 0,o;t[0]!==r||t[1]!==i||t[2]!==a?(o=C({approvalPolicy:r,approvalsReviewer:i,sandboxPolicy:a}),t[0]=r,t[1]=i,t[2]=a,t[3]=o):o=t[3];let s=o,c=s!=null,l=s===`read-only`||s===`auto`||s===`guardian-approvals`?s:null,u;return t[4]!==s||t[5]!==c||t[6]!==l?(u={hasLatestTurnSelection:c,latestTurnMode:s,latestTurnPreferredNonFullAccessMode:l},t[4]=s,t[5]=c,t[6]=l,t[7]=u):u=t[7],u}function Wr(){let e=(0,W.c)(1),t;return e[0]===Symbol.for(`react.memo_cache_sentinel`)?(t=`3736891373`,e[0]=t):t=e[0],re(t)}function Gr(){let e=(0,W.c)(1),t;return e[0]===Symbol.for(`react.memo_cache_sentinel`)?(t=`2846336681`,e[0]=t):t=e[0],re(t)}function Kr(e){let t=(0,W.c)(18),{conversationId:n,hostId:r,cwdOverride:i}=e,a=v(M,n),{data:o}=m(L),s=i!==void 0,c=s?i??null:a??o?.roots?.[0]??null,d=s&&c==null,[f]=l(`statsig_default_enable_features`),p=s?`preserve-null`:`fallback-to-workspace`,h=!d,g;t[0]!==r||t[1]!==p||t[2]!==h?(g={hostId:r,cwdMode:p,enabled:h},t[0]=r,t[1]=p,t[2]=h,t[3]=g):g=t[3];let{data:_,isPending:y}=ne(c,g),b;t[4]===r?b=t[5]:(b={hostId:r},t[4]=r,t[5]=b);let{data:x,isPending:C}=R(b),w=x?.requirements??null,T=_?.config??null,E;t[6]!==C||t[7]!==w?(E=C||u(`auto`,w)||u(`guardian-approvals`,w),t[6]=C,t[7]=w,t[8]=E):E=t[8];let D=E,O;t[9]!==f||t[10]!==D||t[11]!==T?(O=D&&S(T??void 0)===void 0&&f===void 0,t[9]=f,t[10]=D,t[11]=T,t[12]=O):O=t[12];let k=d||C||y||O,A=f?.guardian_approval===!0,j;return t[13]!==w||t[14]!==T||t[15]!==k||t[16]!==A?(j={isConfigDataPending:k,isGuardianApprovalEnabledByStatsig:A,requirements:w,resolvedConfig:T},t[13]=w,t[14]=T,t[15]=k,t[16]=A,t[17]=j):j=t[17],j}function qr(e){let t=(0,W.c)(40),{conversationId:n,hostId:r,stateScope:i}=e,a=i===void 0?`composer`:i,o;t[0]!==n||t[1]!==a?(o={conversationId:n,stateScope:a},t[0]=n,t[1]=a,t[2]=o):o=t[2];let s=Hr(o),[c,l]=w(Ar),[u,d]=w(Fr),[f,p]=w(Ir),m;t[3]===n?m=t[4]:(m=n==null?Fr:Rr(n),t[3]=n,t[4]=m);let[h,g]=w(m),_;t[5]===n?_=t[6]:(_=n==null?Ir:zr(n),t[5]=n,t[6]=_);let[v,y]=w(_),{hasLatestTurnSelection:b,latestTurnMode:x}=Ur(n),S=c[r]??`auto`,C;t[7]!==c||t[8]!==r?(C=Object.hasOwn(c,r),t[7]=c,t[8]=r,t[9]=C):C=t[9];let T=C;if(s===`draft`){let e=u??S,n=f||T,r;t[10]!==d||t[11]!==p?(r=e=>{d(e),p(!0)},t[10]=d,t[11]=p,t[12]=r):r=t[12];let i;return t[13]!==p||t[14]!==e||t[15]!==n||t[16]!==r?(i={agentMode:e,hasSetInitialAgentMode:n,setAgentMode:r,setHasSetInitialAgentMode:p},t[13]=p,t[14]=e,t[15]=n,t[16]=r,t[17]=i):i=t[17],i}if(s===`global-default`){let e;t[18]!==c||t[19]!==r||t[20]!==l?(e=e=>{l({...c,[r]:e})},t[18]=c,t[19]=r,t[20]=l,t[21]=e):e=t[21];let n;t[22]!==c||t[23]!==S||t[24]!==r||t[25]!==l?(n=e=>{e&&l({...c,[r]:S})},t[22]=c,t[23]=S,t[24]=r,t[25]=l,t[26]=n):n=t[26];let i;return t[27]!==T||t[28]!==S||t[29]!==e||t[30]!==n?(i={agentMode:S,hasSetInitialAgentMode:T,setAgentMode:e,setHasSetInitialAgentMode:n},t[27]=T,t[28]=S,t[29]=e,t[30]=n,t[31]=i):i=t[31],i}let E=h??x??`auto`,D=v||b,O;t[32]!==y||t[33]!==g?(O=e=>{g(e),y(!0)},t[32]=y,t[33]=g,t[34]=O):O=t[34];let k;return t[35]!==y||t[36]!==E||t[37]!==D||t[38]!==O?(k={agentMode:E,hasSetInitialAgentMode:D,setAgentMode:O,setHasSetInitialAgentMode:y},t[35]=y,t[36]=E,t[37]=D,t[38]=O,t[39]=k):k=t[39],k}function Jr(e){let t=(0,W.c)(29),{conversationId:n,hostId:r,stateScope:i}=e,a=i===void 0?`composer`:i,o;t[0]!==n||t[1]!==a?(o={conversationId:n,stateScope:a},t[0]=n,t[1]=a,t[2]=o):o=t[2];let s=Hr(o),[c,l]=w(jr),[u,d]=w(Lr),f;t[3]===n?f=t[4]:(f=n==null?Lr:Br(n),t[3]=n,t[4]=f);let[p,m]=w(f),{hasLatestTurnSelection:h,latestTurnMode:g,latestTurnPreferredNonFullAccessMode:_}=Ur(n),v;t[5]!==n||t[6]!==r||t[7]!==a?(v={conversationId:n,hostId:r,stateScope:a},t[5]=n,t[6]=r,t[7]=a,t[8]=v):v=t[8];let{agentMode:y}=qr(v),b;t[9]!==r||t[10]!==c?(b=Nr(r,c),t[9]=r,t[10]=c,t[11]=b):b=t[11];let x=b;if(s===`draft`){let e=u.isSet?u.value:x,n;t[12]===d?n=t[13]:(n=e=>{d({isSet:!0,value:e})},t[12]=d,t[13]=n);let r;return t[14]!==e||t[15]!==n?(r={preferredNonFullAccessMode:e,setPreferredNonFullAccessMode:n},t[14]=e,t[15]=n,t[16]=r):r=t[16],r}if(s===`global-default`){let e;t[17]!==r||t[18]!==c||t[19]!==l?(e=e=>{l({...c,[r]:e})},t[17]=r,t[18]=c,t[19]=l,t[20]=e):e=t[20];let n;return t[21]!==x||t[22]!==e?(n={preferredNonFullAccessMode:x,setPreferredNonFullAccessMode:e},t[21]=x,t[22]=e,t[23]=n):n=t[23],n}let S=p.isSet?p.value:h&&y===g?_:null,C;t[24]===m?C=t[25]:(C=e=>{m({isSet:!0,value:e})},t[24]=m,t[25]=C);let T;return t[26]!==S||t[27]!==C?(T={preferredNonFullAccessMode:S,setPreferredNonFullAccessMode:C},t[26]=S,t[27]=C,t[28]=T):T=t[28],T}function Yr(e){e.set(Fr,null),e.set(Lr,Pr),e.set(Ir,!1)}function Xr(e,t,n){e.set(Rr(t),e.get(Fr)??e.get(Ar)[n]??`auto`),e.set(Br(t),{isSet:!0,value:Zr(e,n)}),e.set(zr(t),!0)}function Zr(e,t){let n=e.get(Lr);return n.isSet?n.value:Nr(t,e.get(jr))}var Qr=`ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace`;export{ut as $,Qt as A,J as B,tr as C,Yn as D,Zn as E,Gt as F,At as G,It as H,Wt as I,Dt as J,kt as K,Vt as L,Xt as M,Yt as N,wn as O,Kt as P,ft as Q,Bt as R,rr as S,er as T,Nt as U,Rt as V,jt as W,yt as X,vt as Y,mt as Z,gr as _,Wr as a,at,ir as b,qr as c,Ye as ct,Or as d,dt as et,Er as f,xr as g,Sr as h,Gr as i,ot as it,Zt as j,Sn as k,kr as l,Je as lt,wr as m,Xr as n,st as nt,Kr as o,rt as ot,Tr as p,Ot as q,Yr as r,ct as rt,Jr as s,Qe as st,Qr as t,G as tt,Mr as u,qe as ut,hr as v,Qn as w,nr as x,mr as y,zt as z};
//# sourceMappingURL=font-settings-DGd6l-2l.js.map