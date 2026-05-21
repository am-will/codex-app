import{s as e}from"./chunk-Bj-mKKzh.js";import{Ki as t}from"./app-server-manager-signals-Csopz8aM.js";import{n,t as r}from"./jsx-runtime-CiQ1k8xo.js";import{H as i,L as a,W as o,_ as s,l as c,m as l,u,xt as d,z as f}from"./setting-storage-EK1Te68s.js";import{t as p}from"./button-bq66r8jD.js";import{t as m}from"./x-DMqExXY8.js";import{t as h}from"./use-platform-ByMJlQVq.js";import{n as g,r as _}from"./use-resolved-theme-variant-G14Wtv28.js";import{t as v}from"./use-stable-callback-D_6XYV-7.js";import{t as y}from"./context-menu-TJfRSX1h.js";import{t as b}from"./search-CEAmgNrg.js";import{t as x}from"./copy-to-clipboard-DUkEoARe.js";import{n as S,r as C}from"./open-target-selection-Cijq0StV.js";import{a as ee,i as te,n as ne,t as w}from"./iconResolver-BZbgWuPi.js";import{n as re,t as T}from"./use-target-apps-DgO11eKw.js";var E=`file-tree-container`,D=`data-file-tree-style`,O=`data-file-tree-unsafe-css`,k=`data-file-tree-scrollbar-measure`,A=`data-file-tree-scrollbar-gutter-measured`,ie=`--trees-scrollbar-gutter-measured`,ae=`header`,oe=`context-menu`,se=`context-menu-trigger`,ce=5,le=1<<ce,ue=le*4;function j(){return{childIdByNameId:new Map,childIds:[],childPositionById:new Map,childVisibleChunkSums:null,totalChildSubtreeNodeCount:0,totalChildVisibleSubtreeCount:0}}function de(){return{childIdByNameId:null,childIds:[],childPositionById:null,childVisibleChunkSums:null,totalChildSubtreeNodeCount:0,totalChildVisibleSubtreeCount:0}}function M(e,t){if(t.childIdByNameId!=null)return t.childIdByNameId;let n=new Map;for(let r of t.childIds){let t=e[r];t!=null&&n.set(t.nameId,r)}return t.childIdByNameId=n,n}function fe(e){if(e.childPositionById!=null)return e.childPositionById;let t=new Map;for(let n=0;n<e.childIds.length;n++){let r=e.childIds[n];r!=null&&t.set(r,n)}return e.childPositionById=t,t}function N(e,t){e.childPositionById!=null&&e.childPositionById.set(t,e.childIds.length),e.childIds.push(t)}function pe(e,t){if(e.childPositionById!=null)for(let n=t;n<e.childIds.length;n++){let t=e.childIds[n];t!=null&&e.childPositionById.set(t,n)}}function me(e,t){let n=0,r=0;for(let i of t.childIds){let t=e[i];t!=null&&(n+=t.subtreeNodeCount,r+=t.visibleSubtreeCount)}t.totalChildSubtreeNodeCount=n,t.totalChildVisibleSubtreeCount=r,ve(e,t)}function he(e,t,n,r){if(e.totalChildSubtreeNodeCount+=n,e.totalChildVisibleSubtreeCount+=r,e.childVisibleChunkSums==null||r===0)return;let i=fe(e).get(t);if(i===void 0)return;let a=i>>ce;e.childVisibleChunkSums[a]+=r}function ge(e,t,n){let r=t.childVisibleChunkSums;if(r!=null){let i=n,a=0;for(let o of r){if(i<o){let r=ye(e,t,a,i);return{...r,childVisibleIndex:n-r.localVisibleIndex}}i-=o,a+=le}throw Error(`Visible child index ${String(n)} is out of range`)}let i=n;for(let r=0;r<t.childIds.length;r++){let a=t.childIds[r];if(a==null)continue;let o=e[a];if(o!=null){if(i<o.visibleSubtreeCount)return{childIndex:r,childVisibleIndex:n-i,localVisibleIndex:i};i-=o.visibleSubtreeCount}}throw Error(`Visible child index ${String(n)} is out of range`)}function _e(e,t,n){let r=0,i=t.childVisibleChunkSums,a=0;if(i!=null){let e=n>>ce;for(let t=0;t<e;t+=1)r+=i[t]??0;a=e<<ce}for(let i=a;i<n;i+=1){let n=t.childIds[i];if(n==null)continue;let a=e[n];a!=null&&(r+=a.visibleSubtreeCount)}return r}function ve(e,t){if(t.childIds.length<ue){t.childVisibleChunkSums=null;return}let n=Math.ceil(t.childIds.length/le),r=new Int32Array(n);for(let n=0;n<t.childIds.length;n++){let i=t.childIds[n];if(i==null)continue;let a=e[i];a!=null&&(r[n>>ce]+=a.visibleSubtreeCount)}t.childVisibleChunkSums=r}function ye(e,t,n,r){let i=Math.min(t.childIds.length,n+le),a=r;for(let r=n;r<i;r++){let n=t.childIds[r];if(n==null)continue;let i=e[n];if(i!=null){if(a<i.visibleSubtreeCount)return{childIndex:r,localVisibleIndex:a};a-=i.visibleSubtreeCount}}throw Error(`Visible child index ${String(r)} is out of range`)}var be=7,xe=3,Se=1<<xe,Ce=4;function P(e,t,n=0){return e<<Ce|n<<xe|t}function F(e){return e.depthAndFlags>>>Ce}function we(e){return(e.depthAndFlags&Se)>>xe}function I(e){return(e.depthAndFlags&Se)!==0}function Te(e){return e.depthAndFlags&be}function L(e,t){return(Te(e)&t)!==0}function Ee(e,t){e.depthAndFlags|=t}function De(e,t){e.depthAndFlags=P(t,Te(e),we(e))}var Oe=Symbol(`benchmarkInstrumentation`);function ke(e,t){return t==null||Object.defineProperty(e,Oe,{configurable:!0,enumerable:!1,value:t,writable:!1}),e}function Ae(e){return e==null?null:e[Oe]??null}function R(e,t,n){return e==null?n():e.measurePhase(t,n)}function je(e,t,n){!Number.isFinite(n)||e==null||e.setCounter(t,n)}function Me(e){return e>=48&&e<=57}function Ne(e){let t=[],n=0,r=0;for(;r<e.length;){for(;r<e.length&&!Me(e.charCodeAt(r));)r+=1;if(r>=e.length)break;r>n&&t.push(e.slice(n,r));let i=0;for(;r<e.length&&Me(e.charCodeAt(r));)i=i*10+(e.charCodeAt(r)-48),r+=1;t.push(i),n=r}return(n<e.length||t.length===0)&&t.push(e.slice(n)),t}function Pe(e){let t=e.toLowerCase();return{lowerValue:t,tokens:Ne(t)}}function z(e,t){let n=Math.min(e.length,t.length);for(let r=0;r<n;r++){let n=e[r],i=t[r];if(n===i)continue;if(typeof n==`number`&&typeof i==`number`)return n<i?-1:1;let a=String(n),o=String(i);if(a!==o)return a<o?-1:1}return e.length===t.length?0:e.length<t.length?-1:1}function Fe(e,t){if(e.tokens.length===1&&t.tokens.length===1&&typeof e.tokens[0]==`string`&&typeof t.tokens[0]==`string`)return e.lowerValue===t.lowerValue?0:e.lowerValue<t.lowerValue?-1:1;let n=z(e.tokens,t.tokens);return n===0?e.lowerValue===t.lowerValue?0:e.lowerValue<t.lowerValue?-1:1:n}function Ie(e,t,n){let r=Fe(n(e),n(t));return r===0?e===t?0:e<t?-1:1:r}function Le(e,t){return Ie(e,t,Pe)}function Re(e,t){return t===e.segments.length-1?e.isDirectory?1:0:1}function ze(e,t){let n=Math.min(e.segments.length,t.segments.length);for(let r=0;r<n;r++){let n=e.segments[r],i=t.segments[r];if(n===i)continue;let a=Re(e,r);return a===Re(t,r)?Le(n,i):a===1?-1:1}return e.segments.length===t.segments.length?e.isDirectory===t.isDirectory?0:e.isDirectory?-1:1:e.segments.length<t.segments.length?-1:1}function Be(e,t){return ze(e,t)}function Ve(e,t,n){let r=e=>{let t=n.get(e);if(t!=null)return t;let r=Pe(e);return n.set(e,r),r},i=Math.min(e.segments.length,t.segments.length);for(let n=0;n<i;n++){let i=e.segments[n],a=t.segments[n];if(i===a)continue;let o=Re(e,n);return o===Re(t,n)?Ie(i,a,r):o===1?-1:1}return e.segments.length===t.segments.length?e.isDirectory===t.isDirectory?0:e.isDirectory?-1:1:e.segments.length<t.segments.length?-1:1}function He(e,t){let n=e.sortKeyById[t];if(n!==void 0)return n;let r=e.valueById[t],i=Pe(r);return e.sortKeyById[t]=i,i}function Ue(e={}){return{flattenEmptyDirectories:e.flattenEmptyDirectories!==!1,sort:e.sort??`default`}}function We(e){let t=e.length>0&&e.charCodeAt(e.length-1)===47,n=t?e.length-1:e.length,r=[],i=0;for(let t=0;t<n;t++)e.charCodeAt(t)===47&&(r.push(e.slice(i,t)),i=t+1);return r.push(e.slice(i,n)),{hasTrailingSlash:t,segments:r}}function Ge(e){let{hasTrailingSlash:t,segments:n}=We(e);return{basename:n[n.length-1]??``,isDirectory:t,path:e,segments:n}}function Ke(e){if(e.length===0)return{requiresDirectory:!1,segments:[]};let{hasTrailingSlash:t,segments:n}=We(e);return{requiresDirectory:t,segments:n}}var qe=``;function Je(){let e=new Map;return e.set(qe,0),{idByValue:e,valueById:[qe],sortKeyById:[Pe(qe)]}}function Ye(e,t){let n=e.idByValue.get(t);if(n!==void 0)return n;let r=e.valueById.length;return e.idByValue.set(t,r),e.valueById.push(t),r}function B(e,t){let n=e.valueById[t];if(n===void 0)throw Error(`Unknown segment ID: ${String(t)}`);return n}var V=Symbol(`pathStorePreparedInputKind`);function Xe(e,t){return e[V]=t,e}function Ze(e){return{basename:e.basename,depth:e.segments.length,isDirectory:e.isDirectory,path:e.path,segments:e.segments}}function Qe(e,t,n){return n===`default`?Be(e,t):n(Ze(e),Ze(t))}function $e(){return{depthAndFlags:P(0,3,1),nameId:0,parentId:0,subtreeNodeCount:1,visibleSubtreeCount:1}}function et(e,t){let n=Math.min(e.length,t.length);for(let r=0;r<n;r++)if(e[r]!==t[r])return r;return n}function tt(e){return e.isDirectory?e.segments.length:e.segments.length-1}function nt(e){return Array.isArray(e)&&e.every(e=>typeof e==`object`&&!!e&&typeof e.path==`string`&&Array.isArray(e.segments)&&typeof e.basename==`string`&&typeof e.isDirectory==`boolean`)}function rt(e){return Array.isArray(e)&&e.every(e=>typeof e==`string`)}function H(e,t={}){return lt(e,t).map(e=>e.path)}function it(e,t={}){let n=lt(e,t);return Xe({paths:n.map(e=>e.path),preparedPaths:n},`prepared`)}function at(e){let t=e.length,n=!1;for(let r=0;r<t;r+=1){let t=e[r];if(t.length>0&&t.charCodeAt(t.length-1)===47){n=!0;break}}return Xe({paths:e,presortedPaths:e,presortedPathsContainDirectories:n},`presorted`)}function ot(e){let t=e,n=t.preparedPaths;if(t[V]===`prepared`&&n!=null)return n;if(!nt(n))throw Error(`preparedInput must come from PathStore.prepareInput()`);return n}function st(e){let t=e;return t[V]===`presorted`&&t.presortedPaths!=null||rt(t.presortedPaths)?t.presortedPaths:null}function ct(e){let t=e;return typeof t.presortedPathsContainDirectories==`boolean`?t.presortedPathsContainDirectories:null}function lt(e,t={}){let n=Ue(t),r=Ae(t);je(r,`workload.inputFiles`,e.length);let i=R(r,`store.preparePathEntries.parse`,()=>e.map(e=>Ge(e)));return R(r,`store.preparePathEntries.sort`,()=>i.sort((e,t)=>Qe(e,t,n.sort))),i}var ut=class{directories=new Map;directoryStack=[0];presortedDirectoryNodeIds=[];initialExpandedPathSet;createdDirectoriesAllExpanded=!1;createdDirectoryCount=0;lastPreparedPath=null;nodes=[$e()];options;instrumentation;segmentSortKeyCache=new Map;segmentTable=Je();hasDeferredDirectoryIndexes=!1;constructor(e={}){this.instrumentation=Ae(e),this.options=Ue(e);let t=e.initialExpandedPaths??null;if(t==null||t.length===0)this.initialExpandedPathSet=null;else{let e=new Set,n=t.length;for(let r=0;r<n;r+=1){let n=t[r],i=n.length;e.add(i>0&&n.charCodeAt(i-1)===47?n.slice(0,i-1):n)}this.initialExpandedPathSet=e,this.createdDirectoriesAllExpanded=!0}this.directories.set(0,j())}appendPaths(e){return R(this.instrumentation,`store.builder.appendPaths.parse`,()=>this.appendPreparedPaths(e.map(e=>Ge(e))))}appendPreparedPaths(e,t=!0){return this.createdDirectoriesAllExpanded=!1,R(this.instrumentation,`store.builder.appendPreparedPaths`,()=>{for(let n of e)this.appendPreparedPath(n,t)}),this}appendPresortedPaths(e,t=null){return R(this.instrumentation,`store.builder.appendPresortedPaths`,()=>{if(t===!1){this.appendPresortedFilePaths(e);return}this.createdDirectoriesAllExpanded=!1;let n=null,r=0,i=this.nodes,a=this.segmentTable,o=a.idByValue,s=a.valueById,c=this.directoryStack,l=0,u=``,d=0;for(let t of e){if(n===t)throw Error(`Duplicate path: "${t}"`);let e=t.length>0&&t.charCodeAt(t.length-1)===47,a=e?t.length-1:t.length,f=0,p=0;if(n!=null)if(u.length>0&&t.length>u.length&&t.startsWith(u))f=d,p=u.length;else{let r=Math.min(a,n.length),i=!0;for(let e=0;e<r;e++){let r=t.charCodeAt(e);if(r!==n.charCodeAt(e)){i=!1;break}r===47&&(f++,p=e+1)}i&&e&&r===a&&n.length>a&&n.charCodeAt(a)===47&&(f++,p=a+1)}l=f,r=f;let m=p,h=t.indexOf(`/`,m);for(;h>=0&&h<a;){let e=c[l];if(e===void 0)throw Error(`Directory stack underflow while building the path store`);r++;let n=t.slice(m,h),a=o.get(n);a===void 0&&(a=s.length,o.set(n,a),s.push(n));let u=i.length;i.push({depthAndFlags:P(r,0,1),nameId:a,parentId:e,subtreeNodeCount:1,visibleSubtreeCount:1}),this.recordCreatedDirectoryPath(t.slice(0,h)),l++,c[l]=u,m=h+1,h=t.indexOf(`/`,m)}if(e){if(m<a){let e=c[l];if(e===void 0)throw Error(`Unable to resolve directory parent for "${t}"`);r++;let n=t.slice(m,a),u=o.get(n);u===void 0&&(u=s.length,o.set(n,u),s.push(n));let d=i.length;i.push({depthAndFlags:P(r,0,1),nameId:u,parentId:e,subtreeNodeCount:1,visibleSubtreeCount:1}),l++,c[l]=d}let e=c[l];if(e===void 0)throw Error(`Unable to resolve directory node for "${t}"`);this.promoteDirectoryToExplicit(e,t)}else{let e=c[l];if(e===void 0)throw Error(`Unable to resolve file parent for "${t}"`);let n=t.slice(m),a=o.get(n);a===void 0&&(a=s.length,o.set(n,a),s.push(n)),i.push({depthAndFlags:P(r+1,0),nameId:a,parentId:e,subtreeNodeCount:1,visibleSubtreeCount:1})}m!==u.length&&(u=t.substring(0,m),d=r),n=t}c.length=l+1,n!=null&&(this.lastPreparedPath=Ge(n)),this.hasDeferredDirectoryIndexes=!0}),this}appendPresortedFilePaths(e){let t=null,n=0,r=this.nodes,i=this.segmentTable,a=i.idByValue,o=i.valueById,s=this.directoryStack,c=0,l=``,u=0;for(let i of e){if(t===i)throw Error(`Duplicate path: "${i}"`);let e=i.length,d=0,f=0;if(t!=null)if(l.length>0&&i.length>l.length&&i.startsWith(l))d=u,f=l.length;else{let n=Math.min(e,t.length);for(let e=0;e<n;e++){let n=i.charCodeAt(e);if(n!==t.charCodeAt(e))break;n===47&&(d++,f=e+1)}}c=d,n=d;let p=f,m=i.indexOf(`/`,p);for(;m>=0;){let e=s[c];if(e===void 0)throw Error(`Directory stack underflow while building the path store`);n++;let t=i.slice(p,m),l=a.get(t);l===void 0&&(l=o.length,a.set(t,l),o.push(t));let u=r.length;r.push({depthAndFlags:P(n,0,1),nameId:l,parentId:e,subtreeNodeCount:1,visibleSubtreeCount:1}),this.recordCreatedDirectoryPath(i.slice(0,m)),this.presortedDirectoryNodeIds.push(u),c++,s[c]=u,p=m+1,m=i.indexOf(`/`,p)}let h=s[c];if(h===void 0)throw Error(`Unable to resolve file parent for "${i}"`);let g=i.slice(p),_=a.get(g);_===void 0&&(_=o.length,a.set(g,_),o.push(g)),r.push({depthAndFlags:P(n+1,0),nameId:_,parentId:h,subtreeNodeCount:1,visibleSubtreeCount:1}),p!==l.length&&(l=i.substring(0,p),u=n),t=i}s.length=c+1,t!=null&&(this.lastPreparedPath=Ge(t)),this.hasDeferredDirectoryIndexes=!0}finish(e={}){let t=e.skipSubtreeCountPass===!0;return this.hasDeferredDirectoryIndexes?(R(this.instrumentation,`store.builder.buildDirectoryIndexes`,()=>this.buildPresortedFinish(t)),this.hasDeferredDirectoryIndexes=!1):t||R(this.instrumentation,`store.builder.computeSubtreeCounts`,()=>this.computeSubtreeCounts(0)),{directories:this.directories,nodes:this.nodes,options:this.options,rootId:0,segmentTable:this.segmentTable,presortedDirectoryNodeIds:this.presortedDirectoryNodeIds.length>0?this.presortedDirectoryNodeIds:null}}didMatchAllInitialExpandedPaths(){return this.createdDirectoriesAllExpanded&&this.initialExpandedPathSet!=null&&this.createdDirectoryCount===this.initialExpandedPathSet.size}appendPreparedPath(e,t){if(this.hasDeferredDirectoryIndexes&&=(this.buildDirectoryIndexes(),!1),this.lastPreparedPath!=null){if(e.path===this.lastPreparedPath.path)throw Error(`Duplicate path: "${e.path}"`);if(t&&(this.options.sort===`default`?Ve(this.lastPreparedPath,e,this.segmentSortKeyCache):Qe(this.lastPreparedPath,e,this.options.sort))>0)throw Error(`Builder input must be sorted before appendPaths(): "${e.path}"`)}let n=this.lastPreparedPath,r=tt(e),i=n==null?0:tt(n),a=n==null?0:et(n.segments,e.segments),o=Math.min(a,r,i);this.directoryStack.length=o+1;for(let n=o;n<r;n++){let r=this.directoryStack[this.directoryStack.length-1];if(r===void 0)throw Error(`Directory stack underflow while building the path store`);let i=t?this.getOrCreateDirectoryChild(r,e.segments[n]):this.createDirectoryChild(r,e.segments[n]);this.directoryStack.push(i)}if(e.isDirectory){let t=this.directoryStack[this.directoryStack.length-1];if(t===void 0)throw Error(`Unable to resolve directory node for "${e.path}"`);this.promoteDirectoryToExplicit(t,e.path),this.lastPreparedPath=e;return}let s=this.directoryStack[this.directoryStack.length-1];if(s===void 0)throw Error(`Unable to resolve file parent for "${e.path}"`);t?this.createFileChild(s,e.basename,e.path):this.createFileChildUnchecked(s,e.basename),this.lastPreparedPath=e}recordCreatedDirectoryPath(e){!this.createdDirectoriesAllExpanded||this.initialExpandedPathSet==null||(this.createdDirectoryCount+=1,this.initialExpandedPathSet.has(e)||(this.createdDirectoriesAllExpanded=!1))}createFileChild(e,t,n){let r=Ye(this.segmentTable,t),i=this.getDirectoryIndex(e),a=i.childIdByNameId;if(a!=null&&a.get(r)!==void 0)throw Error(`Path collides with an existing entry: "${n}"`);let o=this.nodes[e];if(o===void 0)throw Error(`Unknown parent node ID: ${String(e)}`);let s=this.nodes.length;return this.nodes.push({depthAndFlags:P(F(o)+1,0),nameId:r,parentId:e,subtreeNodeCount:1,visibleSubtreeCount:1}),a?.set(r,s),N(i,s),s}createFileChildUnchecked(e,t){let n=Ye(this.segmentTable,t),r=this.getDirectoryIndex(e),i=this.nodes[e];if(i===void 0)throw Error(`Unknown parent node ID: ${String(e)}`);let a=this.nodes.length;return this.nodes.push({depthAndFlags:P(F(i)+1,0),nameId:n,parentId:e,subtreeNodeCount:1,visibleSubtreeCount:1}),r.childIdByNameId!=null&&r.childIdByNameId.set(n,a),N(r,a),a}getOrCreateDirectoryChild(e,t){let n=Ye(this.segmentTable,t),r=this.getDirectoryIndex(e);if(r.childIdByNameId!=null){let e=r.childIdByNameId.get(n);if(e!==void 0){let n=this.nodes[e];if(n!=null&&!I(n))throw Error(`Path collides with an existing file while creating directory "${t}"`);return e}}let i=this.nodes[e];if(i===void 0)throw Error(`Unknown parent node ID: ${String(e)}`);let a=this.nodes.length;return this.nodes.push({depthAndFlags:P(F(i)+1,0,1),nameId:n,parentId:e,subtreeNodeCount:1,visibleSubtreeCount:1}),r.childIdByNameId!=null&&r.childIdByNameId.set(n,a),N(r,a),this.directories.set(a,j()),a}createDirectoryChild(e,t){let n=Ye(this.segmentTable,t),r=this.getDirectoryIndex(e),i=this.nodes[e];if(i===void 0)throw Error(`Unknown parent node ID: ${String(e)}`);let a=this.nodes.length;return this.nodes.push({depthAndFlags:P(F(i)+1,0,1),nameId:n,parentId:e,subtreeNodeCount:1,visibleSubtreeCount:1}),r.childIdByNameId!=null&&r.childIdByNameId.set(n,a),N(r,a),this.directories.set(a,j()),a}promoteDirectoryToExplicit(e,t){let n=this.nodes[e];if(n===void 0)throw Error(`Unknown directory node ID: ${String(e)}`);if(!I(n))throw Error(`Path is not a directory: "${t}"`);if(L(n,1))throw Error(`Duplicate path: "${t}"`);Ee(n,1)}getDirectoryIndex(e){let t=this.directories.get(e);if(t!==void 0)return t;throw Error(`Unknown directory child index for node ${String(e)}`)}buildPresortedFinish(e){let t=this.nodes,n=this.directories;n.set(0,de());let r=-1,i=null;for(let e=1;e<t.length;e++){let a=t[e];if(a==null)continue;if(I(a)){let t=de();n.set(e,t),r=e,i=t}let o;a.parentId===r?o=i:(o=n.get(a.parentId),r=a.parentId,i=o??null),o?.childIds.push(e)}if(!e)for(let e=t.length-1;e>=1;e--){let n=t[e];if(n==null)continue;let r=t[n.parentId];r!=null&&(r.subtreeNodeCount+=n.subtreeNodeCount,r.visibleSubtreeCount+=n.visibleSubtreeCount)}}buildDirectoryIndexes(){let e=this.nodes;for(let t=1;t<e.length;t++){let n=e[t];if(n==null)continue;I(n)&&this.directories.set(t,j());let r=this.directories.get(n.parentId);r!=null&&(r.childIdByNameId!=null&&r.childIdByNameId.set(n.nameId,t),N(r,t))}}computeSubtreeCounts(e){let t=this.nodes[e];if(t===void 0)throw Error(`Unknown node ID: ${String(e)}`);if(!I(t))return t.subtreeNodeCount=1,t.visibleSubtreeCount=1,1;let n=this.getDirectoryIndex(e),r=1;for(let e of n.childIds)r+=this.computeSubtreeCounts(e);return me(this.nodes,n),t.subtreeNodeCount=r,t.visibleSubtreeCount=r,r}};function dt(e,t=`closed`,n=null){let r=pt(t);return{activeNodeCount:e.nodes.length-1,collapsedDirectoryIds:new Set,collapseNewDirectoriesByDefault:!1,defaultExpansion:r,directoriesOpenByDefault:r===`open`,hasCollapsedDirectoryOverrides:!1,directoryLoadInfoById:new Map,expandedDirectoryIds:new Set,instrumentation:n,listeners:new Map,pathCacheByNodeId:new Map([[e.rootId,{path:``,version:0}]]),pathCacheVersion:0,snapshot:e,transactionStack:[]}}function ft(){return{affectedAncestorIds:new Set,affectedNodeIds:new Set,events:[]}}function pt(e){if(typeof e!=`number`)return e;if(!Number.isInteger(e)||e<0)throw Error(`initialExpansion must be "open", "closed", or a non-negative integer depth. Received: ${String(e)}`);return e}function mt(e,t){return L(t,2)||e.defaultExpansion===`open`?!0:e.defaultExpansion===`closed`?!1:F(t)<=e.defaultExpansion}function U(e,t,n=e.snapshot.nodes[t]){return n==null||!I(n)?!1:e.directoriesOpenByDefault&&!e.hasCollapsedDirectoryOverrides?!0:e.collapsedDirectoryIds.has(t)?!1:e.expandedDirectoryIds.has(t)?!0:mt(e,n)}function ht(e,t,n,r=e.snapshot.nodes[t]){if(r==null||!I(r))return;let i=mt(e,r);if(n){if(i){e.collapsedDirectoryIds.delete(t),e.hasCollapsedDirectoryOverrides=e.collapsedDirectoryIds.size>0;return}e.expandedDirectoryIds.add(t);return}if(i){e.collapsedDirectoryIds.add(t),e.hasCollapsedDirectoryOverrides=!0;return}e.expandedDirectoryIds.delete(t)}function gt(e,t){let n=e.directoryLoadInfoById.get(t);if(n!=null)return n;let r={activeAttemptId:null,errorMessage:null,nextAttemptId:1,state:`loaded`};return e.directoryLoadInfoById.set(t,r),r}function _t(e,t){return e.directoryLoadInfoById.get(t)?.state??`loaded`}function vt(e,t){let n=gt(e,t);if(n.state===`loading`&&n.activeAttemptId!=null)return{attemptId:n.activeAttemptId,nodeId:t,reused:!0};let r=n.nextAttemptId;return n.activeAttemptId=r,n.errorMessage=null,n.nextAttemptId+=1,n.state=`loading`,{attemptId:r,nodeId:t,reused:!1}}function yt(e,t){let n=gt(e,t);n.activeAttemptId=null,n.errorMessage=null,n.state=`unloaded`}function bt(e,t,n){let r=e.directoryLoadInfoById.get(t);return r==null||r.activeAttemptId!==n?!1:(r.activeAttemptId=null,r.errorMessage=null,r.state=`loaded`,!0)}function xt(e,t,n){return e.directoryLoadInfoById.get(t)?.activeAttemptId===n}function St(e,t,n,r){let i=e.directoryLoadInfoById.get(t);return i==null||i.activeAttemptId!==n?!1:(i.activeAttemptId=null,i.errorMessage=r??null,i.state=`error`,!0)}function Ct(e,t){e.directoryLoadInfoById.delete(t)}function wt(e,t,n){let r=n,i=e.listeners.get(t);return i==null?e.listeners.set(t,new Set([r])):i.add(r),()=>{let n=e.listeners.get(t);n!=null&&(n.delete(r),n.size===0&&e.listeners.delete(t))}}function Tt(e){return{affectedAncestorIds:e.affectedAncestorIds??[],affectedNodeIds:e.affectedNodeIds??[],canonicalChanged:!0,operation:`add`,path:e.path,projectionChanged:e.projectionChanged,visibleCountDelta:null}}function Et(e){return{affectedAncestorIds:e.affectedAncestorIds??[],affectedNodeIds:e.affectedNodeIds??[],canonicalChanged:!0,operation:`remove`,path:e.path,projectionChanged:e.projectionChanged,recursive:e.recursive,visibleCountDelta:null}}function Dt(e){return{affectedAncestorIds:e.affectedAncestorIds??[],affectedNodeIds:e.affectedNodeIds??[],canonicalChanged:!0,from:e.from,operation:`move`,projectionChanged:e.projectionChanged,to:e.to,visibleCountDelta:null}}function Ot(e){return{affectedAncestorIds:e.affectedAncestorIds??[],affectedNodeIds:e.affectedNodeIds??[],canonicalChanged:!1,operation:`expand`,path:e.path,projectionChanged:!0,visibleCountDelta:null}}function kt(e){return{affectedAncestorIds:e.affectedAncestorIds??[],affectedNodeIds:e.affectedNodeIds??[],canonicalChanged:!1,operation:`collapse`,path:e.path,projectionChanged:!0,visibleCountDelta:null}}function At(e){return{affectedAncestorIds:e.affectedAncestorIds??[],affectedNodeIds:e.affectedNodeIds??[],canonicalChanged:!1,operation:`mark-directory-unloaded`,path:e.path,projectionChanged:e.projectionChanged,visibleCountDelta:null}}function jt(e){return{affectedAncestorIds:e.affectedAncestorIds??[],affectedNodeIds:e.affectedNodeIds??[],attemptId:e.attemptId,canonicalChanged:!1,operation:`begin-child-load`,path:e.path,projectionChanged:e.projectionChanged,reused:e.reused,visibleCountDelta:null}}function Mt(e){return{affectedAncestorIds:e.affectedAncestorIds??[],affectedNodeIds:e.affectedNodeIds??[],attemptId:e.attemptId,canonicalChanged:e.childEvents.some(e=>e.canonicalChanged),childEvents:e.childEvents,operation:`apply-child-patch`,path:e.path,projectionChanged:e.projectionChanged,visibleCountDelta:null}}function Nt(e){return{affectedAncestorIds:e.affectedAncestorIds??[],affectedNodeIds:e.affectedNodeIds??[],attemptId:e.attemptId,canonicalChanged:!1,operation:`complete-child-load`,path:e.path,projectionChanged:e.projectionChanged,stale:e.stale,visibleCountDelta:null}}function Pt(e){return{affectedAncestorIds:e.affectedAncestorIds??[],affectedNodeIds:e.affectedNodeIds??[],attemptId:e.attemptId,canonicalChanged:!1,errorMessage:e.errorMessage,operation:`fail-child-load`,path:e.path,projectionChanged:e.projectionChanged,stale:e.stale,visibleCountDelta:null}}function Ft(e){return{activeNodeCountAfter:e.activeNodeCountAfter,activeNodeCountBefore:e.activeNodeCountBefore,affectedAncestorIds:e.affectedAncestorIds??[],affectedNodeIds:e.affectedNodeIds??[],cachedPathEntryCountAfter:e.cachedPathEntryCountAfter,cachedPathEntryCountBefore:e.cachedPathEntryCountBefore,canonicalChanged:!1,idsPreserved:e.idsPreserved,loadInfoEntryCountAfter:e.loadInfoEntryCountAfter,loadInfoEntryCountBefore:e.loadInfoEntryCountBefore,mode:e.mode,operation:`cleanup`,projectionChanged:e.projectionChanged,reclaimedCachedPathEntryCount:e.reclaimedCachedPathEntryCount,reclaimedLoadInfoEntryCount:e.reclaimedLoadInfoEntryCount,reclaimedNodeSlotCount:e.reclaimedNodeSlotCount,reclaimedSegmentCount:e.reclaimedSegmentCount,segmentCountAfter:e.segmentCountAfter,segmentCountBefore:e.segmentCountBefore,totalNodeSlotCountAfter:e.totalNodeSlotCountAfter,totalNodeSlotCountBefore:e.totalNodeSlotCountBefore,visibleCountDelta:null}}function It(e,t,n){return{...n,visibleCountDelta:qt(e)-t}}function Lt(e,t){let n=qt(e),r=ft();e.transactionStack.push(r);try{t()}catch(t){throw Bt(e,r,!1),t}Bt(e,r,!0,qt(e)-n)}function Rt(e,t){let n=e.instrumentation;if(n==null){zt(e,t);return}R(n,`store.events.record`,()=>zt(e,t))}function zt(e,t){let n=e.transactionStack[e.transactionStack.length-1]??null;if(n==null){Gt(e,t);return}n.events.push(t),Wt(n,t)}function Bt(e,t,n,r=null){if(e.transactionStack.pop()!==t)throw Error(`Transaction stack underflow`);if(!n)return;let i=e.transactionStack[e.transactionStack.length-1]??null;if(i!=null){let n=e.instrumentation;n==null?Ut(i,t):R(n,`store.events.batch.merge`,()=>Ut(i,t));return}let a=Vt(t,r),o=e.instrumentation;if(o==null){Gt(e,a);return}R(o,`store.events.batch.commit`,()=>Gt(e,a))}function Vt(e,t){return{affectedAncestorIds:[...e.affectedAncestorIds],affectedNodeIds:[...e.affectedNodeIds],canonicalChanged:e.events.some(e=>e.canonicalChanged),events:[...e.events],operation:`batch`,projectionChanged:e.events.some(e=>e.projectionChanged),visibleCountDelta:t}}function Ht(e,t){for(let n of t.affectedAncestorIds)e.affectedAncestorIds.add(n);for(let n of t.affectedNodeIds)e.affectedNodeIds.add(n)}function Ut(e,t){for(let n of t.events)e.events.push(n);Ht(e,t)}function Wt(e,t){for(let n of t.affectedNodeIds)e.affectedNodeIds.add(n);for(let n of t.affectedAncestorIds)e.affectedAncestorIds.add(n)}function Gt(e,t){let n=e.instrumentation;if(n==null){Kt(e,t);return}R(n,`store.events.emit`,()=>Kt(e,t))}function Kt(e,t){e.listeners.get(t.operation)?.forEach(e=>e(t)),e.listeners.get(`*`)?.forEach(e=>e(t))}function qt(e){return e.snapshot.nodes[e.snapshot.rootId]?.visibleSubtreeCount??0}function Jt(e,t){if(e.snapshot.options.flattenEmptyDirectories!==!0)return null;let n=e.snapshot.nodes[t];if(n==null||!I(n)||L(n,2))return null;let r=e.snapshot.directories.get(t);if(r==null||r.childIds.length!==1)return null;let i=r.childIds[0];if(i==null)return null;let a=e.snapshot.nodes[i];return a==null||!I(a)?null:i}function Yt(e,t){let n=t;for(;;){let t=Jt(e,n);if(t==null)return n;n=t}}function Xt(e,t){let n=[t],r=t;for(;;){let t=Jt(e,r);if(t==null)return n;n.push(t),r=t}}function Zt(e,t){let n=t==null?e.snapshot.rootId:sn(e,t);return n==null?[]:ln(e,n)}function Qt(e,t){let n=Ge(t),r=n.isDirectory?n.segments:n.segments.slice(0,-1),i=wn(e,Cn(e,r)),{createdNodeIds:a,directoryId:o}=un(e,r),s=new Set(a),c=o;if(n.isDirectory){let n=K(e,o);if(L(n,1))throw Error(`Path already exists: "${t}"`);Ee(n,1),e.pathCacheByNodeId.set(o,{path:t,version:e.pathCacheVersion}),s.add(o)}else c=fn(e,o,n.basename),s.add(c);rn(e,o);let l=wn(e,o);return Tt({affectedAncestorIds:on(e,c),affectedNodeIds:[...s],path:t,projectionChanged:Tn(i,l)})}function $t(e,t,n){let r=sn(e,t);if(r==null)throw Error(`Path does not exist: "${t}"`);let i=K(e,r);if(L(i,2))throw Error(`The root node cannot be removed`);if(I(i)&&G(e,r).childIds.length>0&&n.recursive!==!0)throw Error(`Cannot remove a non-empty directory without recursive: "${t}"`);let a=i.parentId,o=wn(e,a),s=xn(e,r);hn(e,a,r,i.nameId),Sn(e,a),rn(e,a);let c=wn(e,a);return Et({affectedAncestorIds:on(e,a),affectedNodeIds:s,path:t,projectionChanged:Tn(o,c),recursive:n.recursive===!0})}function en(e,t,n,r){let i=sn(e,t);if(i==null)throw Error(`Source path does not exist: "${t}"`);let a=K(e,i);if(L(a,2))throw Error(`The root node cannot be moved`);let o=r.collision??`error`,s=yn(e,i,n),c=wn(e,a.parentId),l=wn(e,s.parentId),u=B(e.snapshot.segmentTable,a.nameId),d=Ye(e.snapshot.segmentTable,s.basename);if(s.parentId===a.parentId&&u===s.basename)return null;if(I(a)&&kn(e,i,s.parentId))throw Error(`Cannot move a directory into one of its descendants`);let f=M(e.snapshot.nodes,G(e,s.parentId)).get(d),p=s.existingNodeId??f??null;if(p!=null&&p!==i&&bn(e,p,o,we(a))===`skip`)return null;let m=a.parentId;hn(e,m,i,a.nameId),a.parentId=s.parentId,a.nameId=d,e.pathCacheByNodeId.delete(i),On(e,i),mn(e,s.parentId,i),Sn(e,m),e.pathCacheVersion++,rn(e,m),s.parentId!==m&&rn(e,s.parentId);let h=wn(e,m),g=wn(e,s.parentId);return Dt({affectedAncestorIds:[...new Set([...on(e,m),...on(e,s.parentId)])],affectedNodeIds:[i],from:t,projectionChanged:En([c,l],[h,g]),to:W(e,i)})}function tn(e,t){let n=e.pathCacheByNodeId.get(t);return n!=null&&n.version===e.pathCacheVersion?n.path:null}function nn(e,t,n){return e.pathCacheByNodeId.set(t,{path:n,version:e.pathCacheVersion}),n}function W(e,t){let n=K(e,t),r=tn(e,t);if(r!=null)return r;if(L(n,2))return nn(e,t,``);let i=W(e,n.parentId),a=B(e.snapshot.segmentTable,n.nameId),o=i.length===0?a:`${i}${a}`;return nn(e,t,I(n)?`${o}/`:o)}function rn(e,t){let n=e.instrumentation;if(n==null){jn(e,t);return}R(n,`store.recomputeCountsUpwardFrom`,()=>jn(e,t))}function an(e,t){let n=[[t,0]],{nodes:r,directories:i}=e.snapshot;for(;n.length>0;){let t=n[n.length-1],a=t[0],o=r[a];if(o==null||!I(o)){An(e,a,o,!0),n.pop();continue}let s=i.get(a);if(s==null||t[1]>=s.childIds.length){An(e,a,o,!0),n.pop();continue}let c=s.childIds[t[1]++];n.push([c,0])}}function on(e,t){let n=[],r=t;for(;r!=null;){let t=K(e,r);if(n.push(r),r===e.snapshot.rootId)break;r=t.parentId}return n}function sn(e,t){if(t.length===0)return e.snapshot.rootId;let n=Ke(t);return cn(e,n.segments,n.requiresDirectory)}function cn(e,t,n){let r=e.snapshot.rootId;for(let n of t){let t=e.snapshot.segmentTable.idByValue.get(n);if(t===void 0)return null;let i=G(e,r),a=M(e.snapshot.nodes,i).get(t);if(a===void 0)return null;r=a}let i=K(e,r);return n&&!I(i)?null:r}function G(e,t){let n=e.snapshot.directories.get(t);if(n===void 0)throw Error(`Unknown directory child index for node ${String(t)}`);return n}function K(e,t){let n=e.snapshot.nodes[t];if(n===void 0||L(n,4))throw Error(`Unknown node ID: ${String(t)}`);return n}function ln(e,t){let n=e.snapshot.nodes[t];if(n===void 0||L(n,4))return[];if(!I(n))return[W(e,t)];if(G(e,t).childIds.length===0)return L(n,1)&&!L(n,2)?[W(e,t)]:[];let r=[],i=[{childIndex:0,nodeId:t}];for(;i.length>0;){let t=i[i.length-1];if(t==null)break;let n=e.snapshot.nodes[t.nodeId];if(n===void 0||L(n,4)){i.pop();continue}if(!I(n)){r.push(W(e,t.nodeId)),i.pop();continue}let a=G(e,t.nodeId);if(a.childIds.length===0){L(n,1)&&!L(n,2)&&r.push(W(e,t.nodeId)),i.pop();continue}let o=a.childIds[t.childIndex];if(o==null){i.pop();continue}t.childIndex++,i.push({childIndex:0,nodeId:o})}return r}function un(e,t){let n=[],r=e.snapshot.rootId;for(let i of t){let t=Ye(e.snapshot.segmentTable,i),a=G(e,r),o=M(e.snapshot.nodes,a).get(t);if(o!==void 0){if(!I(K(e,o)))throw Error(`Cannot create a directory that collides with an existing file: "${i}"`);r=o;continue}r=dn(e,r,t),n.push(r)}return{createdNodeIds:n,directoryId:r}}function dn(e,t,n){let r=K(e,t),i=e.snapshot.nodes.length;return e.snapshot.nodes.push({depthAndFlags:P(F(r)+1,0,1),nameId:n,parentId:t,subtreeNodeCount:1,visibleSubtreeCount:1}),e.snapshot.directories.set(i,j()),mn(e,t,i),e.collapseNewDirectoriesByDefault&&(e.collapsedDirectoryIds.add(i),e.hasCollapsedDirectoryOverrides=!0),e.activeNodeCount++,i}function fn(e,t,n){let r=Ye(e.snapshot.segmentTable,n),i=G(e,t);if(M(e.snapshot.nodes,i).has(r))throw Error(`Path already exists: "${Nn(e,t,n)}"`);let a=K(e,t),o=e.snapshot.nodes.length;return e.snapshot.nodes.push({depthAndFlags:P(F(a)+1,0),nameId:r,parentId:t,subtreeNodeCount:1,visibleSubtreeCount:1}),mn(e,t,o),e.activeNodeCount++,o}function pn(e,t,n){let r=0,i=t.childIds.length;for(;r<i;){let a=r+i>>>1,o=t.childIds[a];if(o==null){i=a;continue}gn(e,n,o)<0?i=a:r=a+1}return r}function mn(e,t,n){let r=G(e,t),i=K(e,n);M(e.snapshot.nodes,r).set(i.nameId,n),he(r,n,i.subtreeNodeCount,i.visibleSubtreeCount);let a=pn(e,r,n);r.childIds.splice(a,0,n),pe(r,a),ve(e.snapshot.nodes,r)}function hn(e,t,n,r){let i=G(e,t),a=fe(i),o=a.get(n)??-1;M(e.snapshot.nodes,i).delete(r),a.delete(n);let s=e.snapshot.nodes[n];s!=null&&he(i,n,-s.subtreeNodeCount,-s.visibleSubtreeCount),o>=0&&(i.childIds.splice(o,1),pe(i,o),ve(e.snapshot.nodes,i))}function gn(e,t,n){let r=e.snapshot.options.sort;return r===`default`?_n(e,t,n):r(vn(e,t),vn(e,n))}function _n(e,t,n){let r=K(e,t),i=K(e,n),a=I(r);if(a!==I(i))return a?-1:1;let o=Fe(He(e.snapshot.segmentTable,r.nameId),He(e.snapshot.segmentTable,i.nameId));if(o!==0)return o;let s=B(e.snapshot.segmentTable,r.nameId),c=B(e.snapshot.segmentTable,i.nameId);return s===c?t<n?-1:1:s<c?-1:1}function vn(e,t){let n=K(e,t),r=W(e,t),i=I(n),a=i?r.slice(0,-1):r;return{basename:B(e.snapshot.segmentTable,n.nameId),depth:F(n),isDirectory:i,path:r,segments:a.length===0?[]:a.split(`/`)}}function yn(e,t,n){let r=K(e,t),i=sn(e,n);if(i!=null){let t=K(e,i);if(I(t))return{basename:B(e.snapshot.segmentTable,r.nameId),existingNodeId:null,parentId:i};let a=Ke(n).segments;return{basename:a[a.length-1]??``,existingNodeId:i,parentId:t.parentId}}let a=Ke(n),o=a.segments[a.segments.length-1]??``,s=a.segments.slice(0,-1),c=s.length===0?e.snapshot.rootId:cn(e,s,!0);if(c==null)throw Error(`Destination parent does not exist: "${n}"`);return{basename:o,existingNodeId:null,parentId:c}}function bn(e,t,n,r){if(n===`skip`)return`skip`;if(n===`error`)throw Error(`Destination already exists: "${W(e,t)}"`);let i=K(e,t);if(we(i)!==r)throw Error(`replace collision requires the same source and destination kinds`);if(I(i)&&G(e,t).childIds.length>0)throw Error(`replace collision does not support non-empty directories`);let a=i.parentId,o=i.nameId;return xn(e,t),hn(e,a,t,o),Sn(e,a),rn(e,a),`handled`}function xn(e,t){let n=[],r=[{nodeId:t,visitedChildren:!1}];for(;r.length>0;){let t=r.pop();if(t==null)break;let i=K(e,t.nodeId);if(t.visitedChildren||!I(i)){I(i)&&e.snapshot.directories.delete(t.nodeId),Ee(i,4),e.pathCacheByNodeId.delete(t.nodeId),e.collapsedDirectoryIds.delete(t.nodeId)&&(e.hasCollapsedDirectoryOverrides=e.collapsedDirectoryIds.size>0),e.expandedDirectoryIds.delete(t.nodeId),Ct(e,t.nodeId),e.activeNodeCount--,n.push(t.nodeId);continue}r.push({nodeId:t.nodeId,visitedChildren:!0});let a=G(e,t.nodeId);for(let e=a.childIds.length-1;e>=0;e--){let t=a.childIds[e];t!=null&&r.push({nodeId:t,visitedChildren:!1})}}return n}function Sn(e,t){let n=t;for(;n!=null;){let t=K(e,n);if(!I(t)||L(t,2)||G(e,n).childIds.length>0)return;Ee(t,1),n=t.parentId===n?null:t.parentId}}function Cn(e,t){let n=e.snapshot.rootId;for(let r of t){let t=e.snapshot.segmentTable.idByValue.get(r);if(t==null)break;let i=M(e.snapshot.nodes,G(e,n)).get(t);if(i==null||!I(K(e,i)))break;n=i}return n}function wn(e,t){let n=Dn(e,t);if(n==null)return null;let r=Yt(e,n),i=K(e,r),a=n===r?null:Xt(e,n).map(t=>W(e,t));return JSON.stringify({flattenedSegmentPaths:a,hasChildren:G(e,r).childIds.length>0,path:W(e,r),terminalKind:we(i)})}function Tn(e,t){return En([e],[t])}function En(e,t){for(let n=0;n<e.length;n+=1){let r=e[n],i=t[n];if(r==null||i==null||r!==i)return!0}return!1}function Dn(e,t){let n=t;for(;n!=null;){let t=K(e,n);if(!I(t)||L(t,2))return null;if(!U(e,n,t))return n;n=t.parentId}return null}function On(e,t){let n=K(e,t);if(De(n,(t===e.snapshot.rootId?-1:F(K(e,n.parentId)))+1),!I(n))return;let r=G(e,t);for(let t of r.childIds)On(e,t)}function kn(e,t,n){let r=n;for(;r!=null;){if(r===t)return!0;let n=K(e,r);if(r===e.snapshot.rootId)return!1;r=n.parentId}return!1}function An(e,t,n=K(e,t),r=!1){let i=e.instrumentation;if(i==null){Mn(e,t,n,r);return}R(i,`store.recomputeNodeCounts`,()=>Mn(e,t,n,r))}function jn(e,t){let n=t;for(;n!=null;){let t=K(e,n),r=t.subtreeNodeCount,i=t.visibleSubtreeCount;if(An(e,n,t),n===e.snapshot.rootId)return;let a=t.subtreeNodeCount-r,o=t.visibleSubtreeCount-i,s=t.parentId;(a!==0||o!==0)&&he(G(e,s),n,a,o),n=s}}function Mn(e,t,n,r){if(!I(n)){n.subtreeNodeCount=1,n.visibleSubtreeCount=1;return}let i=G(e,t);if(r){let t=e.instrumentation;t==null?me(e.snapshot.nodes,i):R(t,`store.recomputeNodeCounts.rebuildChildAggregates`,()=>me(e.snapshot.nodes,i))}let a=1+i.totalChildSubtreeNodeCount,o=i.totalChildVisibleSubtreeCount;if(n.subtreeNodeCount=a,L(n,2)){n.visibleSubtreeCount=o;return}n.visibleSubtreeCount=Jt(e,t)==null?U(e,t,n)?1+o:1:o}function Nn(e,t,n){let r=W(e,t);return r.length===0?n:`${r}${n}`}function Pn(e){return e!=null&&!L(e,4)}function Fn(e,t){let n=e.snapshot.nodes[t];return!Pn(n)||!I(n)||L(n,2)?null:n}function In(e){let t=0;for(let[n,r]of e.pathCacheByNodeId)r.version===e.pathCacheVersion&&Pn(e.snapshot.nodes[n])&&(t+=1);return t}function Ln(e){return Math.max(0,e.valueById.length-1)}function Rn(e){return{activeNodeCount:e.activeNodeCount,cachedPathEntryCount:In(e),loadInfoEntryCount:e.directoryLoadInfoById.size,segmentCount:Ln(e.snapshot.segmentTable),totalNodeSlotCount:Math.max(0,e.snapshot.nodes.length-1)}}function zn(e,t,n,r){return{activeNodeCountAfter:r.activeNodeCount,activeNodeCountBefore:n.activeNodeCount,cachedPathEntryCountAfter:r.cachedPathEntryCount,cachedPathEntryCountBefore:n.cachedPathEntryCount,idsPreserved:t,loadInfoEntryCountAfter:r.loadInfoEntryCount,loadInfoEntryCountBefore:n.loadInfoEntryCount,mode:e,reclaimedCachedPathEntryCount:n.cachedPathEntryCount-r.cachedPathEntryCount,reclaimedLoadInfoEntryCount:n.loadInfoEntryCount-r.loadInfoEntryCount,reclaimedNodeSlotCount:n.totalNodeSlotCount-r.totalNodeSlotCount,reclaimedSegmentCount:n.segmentCount-r.segmentCount,segmentCountAfter:r.segmentCount,segmentCountBefore:n.segmentCount,totalNodeSlotCountAfter:r.totalNodeSlotCount,totalNodeSlotCountBefore:n.totalNodeSlotCount}}function Bn(e){let t=[],n=[];for(let n of e.collapsedDirectoryIds)Fn(e,n)!=null&&t.push(W(e,n));for(let t of e.expandedDirectoryIds)Fn(e,t)!=null&&n.push(W(e,t));return{collapsedPaths:t,expandedPaths:n}}function Vn(e){let t=[];for(let[n,r]of e.directoryLoadInfoById)Fn(e,n)==null||_t(e,n)===`loaded`||t.push({info:{activeAttemptId:null,errorMessage:r.errorMessage,nextAttemptId:r.nextAttemptId,state:r.state},path:W(e,n)});return t}function Hn(e,t){e.collapsedDirectoryIds.clear(),e.hasCollapsedDirectoryOverrides=!1,e.expandedDirectoryIds.clear();for(let n of t.expandedPaths){let t=sn(e,n);t!=null&&ht(e,t,!0,K(e,t))}for(let n of t.collapsedPaths){let t=sn(e,n);t!=null&&ht(e,t,!1,K(e,t))}}function Un(e,t){e.directoryLoadInfoById.clear();for(let n of t){let t=sn(e,n.path);t!=null&&Fn(e,t)!=null&&e.directoryLoadInfoById.set(t,{activeAttemptId:null,errorMessage:n.info.errorMessage,nextAttemptId:n.info.nextAttemptId,state:n.info.state})}}function Wn(e){e.pathCacheVersion+=1,e.pathCacheByNodeId.clear(),e.pathCacheByNodeId.set(e.snapshot.rootId,{path:``,version:e.pathCacheVersion})}function Gn(e){let t=e.snapshot.segmentTable,n=Je();for(let r of e.snapshot.nodes)if(Pn(r)){if(L(r,2)){r.nameId=0;continue}r.nameId=Ye(n,B(t,r.nameId))}e.snapshot.segmentTable=n}function Kn(e){for(let[t,n]of e.snapshot.directories){let r=e.snapshot.nodes[t];if(!Pn(r)||!I(r)){e.snapshot.directories.delete(t);continue}let i=n.childIds.filter(n=>{let r=e.snapshot.nodes[n];return Pn(r)&&r.parentId===t});n.childIds=i,n.childIdByNameId=new Map(i.map(t=>[K(e,t).nameId,t])),n.childPositionById=new Map(i.map((e,t)=>[e,t])),me(e.snapshot.nodes,n)}}function qn(e){let t=e.snapshot.nodes.length-1;for(;t>e.snapshot.rootId;){let n=e.snapshot.nodes[t];if(Pn(n))break;--t}e.snapshot.nodes.length=t+1}function Jn(e){let t=Bn(e),n=Vn(e);R(e.instrumentation,`store.cleanup.stable.clearPathCaches`,()=>Wn(e)),R(e.instrumentation,`store.cleanup.stable.rebuildSegmentTable`,()=>Gn(e)),R(e.instrumentation,`store.cleanup.stable.rebuildDirectoryIndexes`,()=>Kn(e)),R(e.instrumentation,`store.cleanup.stable.trimTrailingRemovedNodeSlots`,()=>qn(e)),R(e.instrumentation,`store.cleanup.stable.restoreExpansionOverrides`,()=>Hn(e,t)),R(e.instrumentation,`store.cleanup.stable.restoreDirectoryLoadInfos`,()=>Un(e,n)),R(e.instrumentation,`store.cleanup.stable.recomputeCounts`,()=>an(e,e.snapshot.rootId))}function Yn(e){let t=Bn(e),n=Vn(e),r=R(e.instrumentation,`store.cleanup.aggressive.listPaths`,()=>Zt(e)),i=ke({...e.snapshot.options},e.instrumentation),a=R(e.instrumentation,`store.cleanup.aggressive.rebuildSnapshot`,()=>{let e=new ut(i);return e.appendPaths(r),e.finish()});e.snapshot=a,e.activeNodeCount=a.nodes.length-1,e.pathCacheByNodeId=new Map([[a.rootId,{path:``,version:0}]]),e.pathCacheVersion=0,R(e.instrumentation,`store.cleanup.aggressive.restoreExpansionOverrides`,()=>Hn(e,t)),R(e.instrumentation,`store.cleanup.aggressive.restoreDirectoryLoadInfos`,()=>Un(e,n)),R(e.instrumentation,`store.cleanup.aggressive.recomputeCounts`,()=>an(e,e.snapshot.rootId))}function Xn(e){for(let t of e.directoryLoadInfoById.values())if(t.state===`loading`&&t.activeAttemptId!=null)return!0;return!1}function Zn(e,t){let n=Rn(e);t===`stable`?R(e.instrumentation,`store.cleanup.stable`,()=>Jn(e)):R(e.instrumentation,`store.cleanup.aggressive`,()=>Yn(e));let r=Rn(e);return zn(t,t===`stable`,n,r)}var Qn=64;function $n(e,t){let n=t+2;if(n<=e.length)return e;let r=e.length;for(;r<n;)r*=2;let i=new Int32Array(r);return i.fill(-1),i.set(e),i}function er(e){return K(e,e.snapshot.rootId).visibleSubtreeCount}function tr(e,t,n,r){let i=K(e,t.terminalNodeId),a=Math.max(1,i.visibleSubtreeCount);return Math.min(r-1,n+a-1)}function nr(e,t,n,r){return{ancestorPaths:r,index:t.index,posInSet:t.posInSet,row:xr(e,t.cursor),setSize:t.setSize,subtreeEndIndex:tr(e,t.cursor,t.index,n)}}function rr(e,t,n,r,i,a){let o=G(e,t),{childIndex:s,childVisibleIndex:c,localVisibleIndex:l}=ge(e.snapshot.nodes,o,n),u=o.childIds[s];if(u==null)throw Error(`Visible index ${String(n)} is out of range`);return ir(e,u,l,r+c,i+1,s,o.childIds.length,a)}function ir(e,t,n,r,i,a,o,s){if(!I(K(e,t))){if(n===0)return{ancestors:s,cursor:{headNodeId:t,terminalNodeId:t,visibleDepth:i},index:r,posInSet:a,setSize:o};throw Error(`Visible index ${String(n)} is out of range for file`)}let c=hr(e,t,i);if(n===0)return{ancestors:s,cursor:c,index:r,posInSet:a,setSize:o};let l=K(e,c.terminalNodeId);if(!I(l)||!U(e,c.terminalNodeId,l))throw Error(`Visible index ${String(n)} is out of range for collapsed directory`);return rr(e,c.terminalNodeId,n-1,r+1,c.visibleDepth,[...s,{cursor:c,index:r,posInSet:a,setSize:o}])}function ar(e,t){let n=er(e);if(t<0||t>=n)return null;let r=rr(e,e.snapshot.rootId,t,0,-1,[]),i=r.ancestors.map(t=>W(e,t.cursor.terminalNodeId)),a=null;return{ancestorPaths:i,get ancestorRows(){if(a!=null)return a;let t=[],i=[];for(let a of r.ancestors){let r=nr(e,a,n,[...i]);t.push(r),i.push(r.row.path)}return a=t,a},index:r.index,posInSet:r.posInSet,row:xr(e,r.cursor),setSize:r.setSize,subtreeEndIndex:tr(e,r.cursor,r.index,n)}}function or(e,t,n){let r=e.instrumentation,i=er(e);if(i<=0||n<t)return[];let a=Math.max(0,Math.min(t,i-1)),o=Math.max(a,Math.min(n,i-1));if(r==null){if(a===0)return br(e,o+1);let t=[],n=fr(e,a);for(let r=a;r<=o&&n!=null;r++){let r=xr(e,n);t.push(r),n=_r(e,n)}return t}let s=[],c=0,l=0,u=R(r,`store.getVisibleSlice.selectFirstRow`,()=>fr(e,a));for(let t=a;t<=o&&u!=null;t++){let t=R(r,`store.getVisibleSlice.materializeRow`,()=>xr(e,u));s.push(t),t.isFlattened&&(c++,l+=t.flattenedSegments?.length??0),u=R(r,`store.getVisibleSlice.advanceCursor`,()=>_r(e,u))}return je(r,`workload.visibleRowsRead`,s.length),je(r,`workload.flattenedRowsRead`,c),je(r,`workload.flattenedSegmentsRead`,l),s}function sr(e,t=er(e)){let n=e.instrumentation;return n==null?yr(e,t):R(n,`store.getVisibleTreeProjection`,()=>yr(e,t))}function cr(e){return vr(sr(e))}function lr(e,t){let n=sn(e,t);if(n==null||n===e.snapshot.rootId||I(K(e,n))&&Yt(e,n)!==n)return null;let r=0,i=n,{nodes:a,rootId:o}=e.snapshot;for(;i!==o;){let t=K(e,i).parentId,n=G(e,t),s=fe(n).get(i);if(s==null)throw Error(`Child ${String(i)} was not found in its parent index`);if(r+=_e(a,n,s),t!==o){let n=K(e,t),a=Jt(e,t);if(!U(e,t,n)&&a!==i)return null;Yt(e,t)===t&&(r+=1)}i=t}return r}function ur(e,t){let n=sn(e,t);if(n==null)throw Error(`Path does not exist: "${t}"`);let r=K(e,n);if(!I(r))throw Error(`Path is not a directory: "${t}"`);return U(e,n,r)?null:(ht(e,n,!0,r),rn(e,n),Ot({affectedAncestorIds:on(e,n),affectedNodeIds:[n],path:t,projectionChanged:!0}))}function dr(e,t){let n=sn(e,t);if(n==null)throw Error(`Path does not exist: "${t}"`);let r=K(e,n);if(!I(r))throw Error(`Path is not a directory: "${t}"`);return U(e,n,r)?(ht(e,n,!1,r),rn(e,n),kt({affectedAncestorIds:on(e,n),affectedNodeIds:[n],path:t,projectionChanged:!0})):null}function fr(e,t){return t<0||t>=er(e)?null:pr(e,e.snapshot.rootId,t,-1)}function pr(e,t,n,r){let i=G(e,t),a=e.instrumentation,{childIndex:o,localVisibleIndex:s}=a==null?ge(e.snapshot.nodes,i,n):R(a,`store.getVisibleSlice.selectChildIndex`,()=>ge(e.snapshot.nodes,i,n)),c=i.childIds[o];if(c!=null)return mr(e,c,s,r+1);throw Error(`Visible index ${String(n)} is out of range`)}function mr(e,t,n,r){if(!I(K(e,t))){if(n===0)return{headNodeId:t,terminalNodeId:t,visibleDepth:r};throw Error(`Visible index ${String(n)} is out of range for file`)}let i=hr(e,t,r);if(n===0)return i;let a=K(e,i.terminalNodeId);if(!I(a)||!U(e,i.terminalNodeId,a))throw Error(`Visible index ${String(n)} is out of range for collapsed directory`);return pr(e,i.terminalNodeId,n-1,i.visibleDepth)}function hr(e,t,n){return I(K(e,t))?e.instrumentation==null?{headNodeId:t,terminalNodeId:Yt(e,t),visibleDepth:n}:{headNodeId:t,terminalNodeId:R(e.instrumentation,`store.getVisibleSlice.flatten.resolveTerminalDirectory`,()=>Yt(e,t)),visibleDepth:n}:{headNodeId:t,terminalNodeId:t,visibleDepth:n}}function gr(e,t){let n=K(e,t);if(!I(n))return!0;let r=n.parentId;return r===e.snapshot.rootId?!0:Jt(e,r)!==t}function _r(e,t){let n=K(e,t.terminalNodeId);if(I(n)){let r=G(e,t.terminalNodeId);if(U(e,t.terminalNodeId,n)&&r.childIds.length>0){let n=r.childIds[0];return n==null?null:mr(e,n,0,t.visibleDepth+1)}}let r=t.terminalNodeId,i=t.visibleDepth;for(;;){let t=K(e,r);if(r===e.snapshot.rootId)return null;let n=t.parentId,a=G(e,n),o=fe(a).get(r)??-1;if(o<0)throw Error(`Child ${String(r)} was not found in its parent index`);let s=a.childIds[o+1]??null;if(s!=null)return mr(e,s,0,i);gr(e,r)&&i--,r=n}}function vr(e){let t=e.paths.length,n=Array(t);for(let r=0;r<t;r+=1){let t=e.getParentIndex(r);n[r]={index:r,parentPath:t>=0?e.paths[t]??null:null,path:e.paths[r]??``,posInSet:e.posInSetByIndex[r]??0,setSize:e.setSizeByIndex[r]??0}}return{getParentIndex:e.getParentIndex,rows:n,get visibleIndexByPath(){return e.visibleIndexByPath}}}function yr(e,t){let n=Array(t),r=new Int32Array(t),i=new Int32Array(t),a=new Int32Array(t),o=new Int32Array(Qn);o.fill(-1);let s=0,{nodes:c,directories:l,segmentTable:u}=e.snapshot,d=[[l.get(e.snapshot.rootId),0,-1,``]],f=e.snapshot.options.flattenEmptyDirectories,p=e.pathCacheByNodeId,m=e.pathCacheVersion,h=u.valueById;for(;d.length>0&&s<t;){let t=d[d.length-1],u=t[0];if(t[1]>=u.childIds.length){d.pop();continue}let g=t[1],_=u.childIds[t[1]++],v=c[_],y=t[2]+1,b=t[3];o=$n(o,y);let x,S=_;if(I(v))S=f?Yt(e,_):_,x=S===_?`${b}${h[v.nameId]}/`:W(e,S);else{let e=p.get(_);x=e!=null&&e.version===m?e.path:`${b}${h[v.nameId]}`}r[s]=o[y],n[s]=x,i[s]=g,a[s]=u.childIds.length,o[y+1]=s,s+=1;let C=c[S];C!=null&&I(C)&&U(e,S,C)&&d.push([l.get(S),0,y,x])}s<t&&(n.length=s);let g=r.subarray(0,s),_=i.subarray(0,s),v=a.subarray(0,s),y=null;return{getParentIndex(e){return e<0||e>=s?-1:g[e]??-1},paths:n,posInSetByIndex:_,setSizeByIndex:v,get visibleIndexByPath(){if(y==null){y=new Map;for(let e=0;e<s;e+=1)y.set(n[e]??``,e)}return y}}}function br(e,t){let n=Array(t),r=0,{nodes:i,directories:a,segmentTable:o}=e.snapshot,s=[[a.get(e.snapshot.rootId),0,-1]],c=o.valueById,l=e.snapshot.options.flattenEmptyDirectories,u=e.pathCacheByNodeId,d=e.pathCacheVersion;for(;s.length>0&&r<t;){let t=s[s.length-1],o=t[0];if(t[1]>=o.childIds.length){s.pop();continue}let f=o.childIds[t[1]++],p=i[f],m=t[2]+1;if(!I(p)){let t=u.get(f);n[r++]={depth:m,flattenedSegments:void 0,hasChildren:!1,id:f,isExpanded:!1,isFlattened:!1,isLoading:!1,kind:`file`,loadState:void 0,name:c[p.nameId],path:t!=null&&t.version===d?t.path:W(e,f)};continue}let h=l?Yt(e,f):f,g={headNodeId:f,terminalNodeId:h,visibleDepth:m};n[r++]=xr(e,g);let _=i[h];_!=null&&I(_)&&U(e,h,_)&&s.push([a.get(h),0,m])}return r<t&&(n.length=r),n}function xr(e,t){let n=K(e,t.terminalNodeId),r=I(n)?Sr(e,t):null,i=W(e,t.terminalNodeId),a=B(e.snapshot.segmentTable,n.nameId),o=I(n)&&G(e,t.terminalNodeId).childIds.length>0,s=t.headNodeId!==t.terminalNodeId,c=e.instrumentation,l=s?c==null?Xt(e,t.headNodeId).map(n=>{let r=K(e,n);return{isTerminal:n===t.terminalNodeId,name:B(e.snapshot.segmentTable,r.nameId),nodeId:n,path:W(e,n)}}):R(c,`store.getVisibleSlice.flatten.collectSegments`,()=>Xt(e,t.headNodeId).map(n=>{let r=K(e,n);return{isTerminal:n===t.terminalNodeId,name:B(e.snapshot.segmentTable,r.nameId),nodeId:n,path:W(e,n)}})):void 0;return{depth:t.visibleDepth,flattenedSegments:l,hasChildren:o,id:t.terminalNodeId,isExpanded:I(n)&&U(e,t.terminalNodeId,n),isFlattened:s,isLoading:r===`loading`,kind:I(n)?`directory`:`file`,loadState:r==null||r===`loaded`?void 0:r,name:a,path:i}}function Sr(e,t){if(t.headNodeId===t.terminalNodeId)return _t(e,t.terminalNodeId);let n=Xt(e,t.headNodeId),r=!1,i=!1;for(let t of n){let n=_t(e,t);if(n===`loading`)return`loading`;if(n===`error`){i=!0;continue}n===`unloaded`&&(r=!0)}return i?`error`:r?`unloaded`:`loaded`}function Cr(e){let{directories:t,nodes:n,options:r,rootId:i,presortedDirectoryNodeIds:a}=e.snapshot,o=r.flattenEmptyDirectories===!0,s=e=>{let r=n[e];if(r==null||!I(r))return;let i=t.get(e);if(i==null)throw Error(`Unknown directory child index for node ${String(e)}`);let a=i.childIds,s=a.length,c=0,l=0;for(let e=0;e<s;e++){let t=a[e];if(t==null)continue;let r=n[t];c+=r.subtreeNodeCount,l+=r.visibleSubtreeCount}i.totalChildSubtreeNodeCount=c,i.totalChildVisibleSubtreeCount=l,s>=128&&ve(n,i),r.subtreeNodeCount=1+c;let u;if(o&&s===1){let e=n[a[0]];u=e!=null&&I(e)?l:1+l}else u=1+l;r.visibleSubtreeCount=u};if(a!=null)for(let e=a.length-1;e>=0;e--)s(a[e]);else for(let e=n.length-1;e>=1;e--)s(e);let c=n[i],l=t.get(i);if(c==null||l==null)return;let u=l.childIds,d=0,f=0;for(let e=0;e<u.length;e++){let t=u[e];if(t==null)continue;let r=n[t];d+=r.subtreeNodeCount,f+=r.visibleSubtreeCount}l.totalChildSubtreeNodeCount=d,l.totalChildVisibleSubtreeCount=f,ve(n,l),c.subtreeNodeCount=1+d,c.visibleSubtreeCount=f}function wr(e){return e.initialExpansion===`open`&&(e.initialExpandedPaths==null||e.initialExpandedPaths.length===0)}var Tr=class e{#e;constructor(e={}){let t=Ae(e),n=R(t,`store.builder.create`,()=>new ut(e));if(e.preparedInput!=null){let t=st(e.preparedInput);t==null?n.appendPreparedPaths(ot(e.preparedInput),!1):n.appendPresortedPaths(t,ct(e.preparedInput))}else{let r=e.paths??[];e.presorted===!0?n.appendPaths(r):n.appendPreparedPaths(R(t,`store.preparePathEntries`,()=>lt(r,e)))}let r=R(t,`store.builder.finish`,()=>n.finish({skipSubtreeCountPass:!0})),i=R(t,`store.state.detectAllDirectoriesExpanded`,()=>(e.initialExpansion??`closed`)===`closed`&&n.didMatchAllInitialExpandedPaths());this.#e=R(t,`store.state.create`,()=>dt(r,i?`open`:e.initialExpansion??`closed`,t)),i&&(this.#e.collapseNewDirectoriesByDefault=!0);let a=i?this.#e.snapshot.directories.size-1:R(t,`store.state.initializeExpandedPaths`,()=>this.initializeExpandedPaths(e.initialExpandedPaths));i||wr(e)||(e.initialExpansion??`closed`)===`closed`&&a===this.#e.snapshot.directories.size-1||(e.initialExpandedPaths?.length??0)>0&&R(t,`store.state.checkAllDirectoriesExpanded`,()=>this.hasAllDirectoriesExpanded())?R(t,`store.state.initializeOpenVisibleCounts`,()=>Cr(this.#e)):R(t,`store.state.recomputeCounts`,()=>an(this.#e,this.#e.snapshot.rootId))}static preparePaths(e,t={}){return H(e,t)}static prepareInput(e,t={}){return it(e,t)}static preparePresortedInput(e){return at(e)}list(e){return R(this.#e.instrumentation,`store.list`,()=>Zt(this.#e,e))}add(e){R(this.#e.instrumentation,`store.add`,()=>{let t=er(this.#e);Rt(this.#e,It(this.#e,t,Qt(this.#e,e)))})}remove(e,t={}){R(this.#e.instrumentation,`store.remove`,()=>{let n=er(this.#e);Rt(this.#e,It(this.#e,n,$t(this.#e,e,t)))})}move(e,t,n={}){R(this.#e.instrumentation,`store.move`,()=>{let r=er(this.#e),i=en(this.#e,e,t,n);i!=null&&Rt(this.#e,It(this.#e,r,i))})}batch(e){Lt(this.#e,()=>{if(typeof e==`function`){e(this);return}for(let t of e)switch(t.type){case`add`:this.add(t.path);break;case`remove`:this.remove(t.path,{recursive:t.recursive});break;case`move`:this.move(t.from,t.to,{collision:t.collision});break}})}getVisibleCount(){return R(this.#e.instrumentation,`store.getVisibleCount`,()=>er(this.#e))}getVisibleSlice(e,t){return R(this.#e.instrumentation,`store.getVisibleSlice`,()=>or(this.#e,e,t))}getVisibleRowContext(e){return R(this.#e.instrumentation,`store.getVisibleRowContext`,()=>ar(this.#e,e))}getVisibleTreeProjection(){return cr(this.#e)}getVisibleTreeProjectionData(e){return sr(this.#e,e)}getVisibleIndex(e){return R(this.#e.instrumentation,`store.getVisibleIndex`,()=>lr(this.#e,e))}getPathInfo(e){return R(this.#e.instrumentation,`store.getPathInfo`,()=>{let t=sn(this.#e,e);if(t==null)return null;let n=K(this.#e,t);return{depth:F(n),kind:I(n)?`directory`:`file`,path:W(this.#e,t)}})}isExpanded(e){return R(this.#e.instrumentation,`store.isExpanded`,()=>{let t=this.requireDirectoryNodeId(e),n=K(this.#e,t);return U(this.#e,t,n)})}expand(e){R(this.#e.instrumentation,`store.expand`,()=>{let t=er(this.#e),n=ur(this.#e,e);n!=null&&Rt(this.#e,It(this.#e,t,n))})}collapse(e){R(this.#e.instrumentation,`store.collapse`,()=>{let t=er(this.#e),n=dr(this.#e,e);n!=null&&Rt(this.#e,It(this.#e,t,n))})}on(e,t){return wt(this.#e,e,t)}getDirectoryLoadState(e){let t=this.requireDirectoryNodeId(e);return _t(this.#e,t)}markDirectoryUnloaded(e){R(this.#e.instrumentation,`store.markDirectoryUnloaded`,()=>{let t=this.requireDirectoryNodeId(e);if(G(this.#e,t).childIds.length>0)throw Error(`Cannot mark a directory with known children as unloaded: "${e}"`);let n=er(this.#e);yt(this.#e,t),Rt(this.#e,It(this.#e,n,At({affectedAncestorIds:on(this.#e,t),affectedNodeIds:[t],path:e,projectionChanged:this.isDirectoryProjectionVisible(t)})))})}beginChildLoad(e){return R(this.#e.instrumentation,`store.beginChildLoad`,()=>{let t=this.requireDirectoryNodeId(e),n=er(this.#e),r=vt(this.#e,t);return Rt(this.#e,It(this.#e,n,jt({affectedAncestorIds:on(this.#e,t),affectedNodeIds:[t],attemptId:r.attemptId,path:e,projectionChanged:this.isDirectoryProjectionVisible(t),reused:r.reused}))),r})}applyChildPatch(e,t){return R(this.#e.instrumentation,`store.applyChildPatch`,()=>{let n=this.resolveActiveDirectoryNodeId(e.nodeId);if(n==null||_t(this.#e,n)!==`loading`||!xt(this.#e,n,e.attemptId))return!1;let r=W(this.#e,n);this.validateChildPatch(r,t);let i=er(this.#e),a=[];for(let e of t.operations){Er(r,e);let t=er(this.#e);switch(e.type){case`add`:a.push(It(this.#e,t,Qt(this.#e,e.path)));break;case`remove`:a.push(It(this.#e,t,$t(this.#e,e.path,{recursive:e.recursive})));break;case`move`:{let n=en(this.#e,e.from,e.to,{collision:e.collision});n!=null&&a.push(It(this.#e,t,n));break}}}let o=a.some(e=>e.projectionChanged)||this.isDirectoryProjectionVisible(n);return Rt(this.#e,It(this.#e,i,Mt({affectedAncestorIds:on(this.#e,n),affectedNodeIds:[n],attemptId:e.attemptId,childEvents:a,path:W(this.#e,n),projectionChanged:o}))),!0})}completeChildLoad(e){return R(this.#e.instrumentation,`store.completeChildLoad`,()=>{let t=this.resolveActiveDirectoryNodeId(e.nodeId);if(t==null)return!1;let n=er(this.#e),r=bt(this.#e,t,e.attemptId);return Rt(this.#e,It(this.#e,n,Nt({affectedAncestorIds:on(this.#e,t),affectedNodeIds:[t],attemptId:e.attemptId,path:W(this.#e,t),projectionChanged:this.isDirectoryProjectionVisible(t),stale:!r}))),r})}failChildLoad(e,t){return R(this.#e.instrumentation,`store.failChildLoad`,()=>{let n=this.resolveActiveDirectoryNodeId(e.nodeId);if(n==null)return!1;let r=er(this.#e),i=St(this.#e,n,e.attemptId,t);return Rt(this.#e,It(this.#e,r,Pt({affectedAncestorIds:on(this.#e,n),affectedNodeIds:[n],attemptId:e.attemptId,errorMessage:t,path:W(this.#e,n),projectionChanged:this.isDirectoryProjectionVisible(n),stale:!i}))),i})}cleanup(e={}){return R(this.#e.instrumentation,`store.cleanup`,()=>{if(this.#e.transactionStack.length>0)throw Error(`Cleanup cannot run during an open batch or transaction.`);if(Xn(this.#e))throw Error(`Cleanup cannot run while directory loads are active.`);let t=er(this.#e),n=Zn(this.#e,e.mode??`stable`);return Rt(this.#e,It(this.#e,t,Ft({...n,affectedAncestorIds:[],affectedNodeIds:[],projectionChanged:n.idsPreserved===!1}))),n})}getNodeCount(){return this.#e.activeNodeCount}initializeExpandedPaths(e){if(e==null||e.length===0)return 0;let t=0,n=[],r=[],i=0,a=null,o=this.#e.snapshot.segmentTable,s=o.valueById,c=this.#e.snapshot.nodes,l=new Map;for(let u of e){a!=null&&u<a&&(a=null,i=0,n.length=0,r.length=0);let e=u.length>0&&u.charCodeAt(u.length-1)===47?u.length-1:u.length;if(e===0){a=u,i=e,n.length=0,r.length=0;continue}let d=0,f=0;if(a!=null){let t=Math.min(e,i),n=!0;for(let e=0;e<t;e+=1){let t=u.charCodeAt(e);if(t!==a.charCodeAt(e)){n=!1;break}t===47&&(d+=1,f=e+1)}n&&(t===i&&e>t&&u.charCodeAt(t)===47?(d+=1,f=t+1):t===e&&i>t&&a.charCodeAt(t)===47&&(d+=1,f=e+1)),d=Math.min(d,r.length)}let p=d===0?this.#e.snapshot.rootId:r[d-1]??this.#e.snapshot.rootId,m=d,h=!0,g=f;for(;g<=e;){let t=u.indexOf(`/`,g),i=t===-1||t>e?e:t,a=u.slice(g,i),f=G(this.#e,p).childIds,_=m===d?n[m]??0:0,v=_,y,b=l.get(a)??Pe(a);l.set(a,b);let x=(e,t)=>{for(v=e;v<t;v+=1){let e=f[v],t=c[e],n=s[t.nameId];if(n===a)return y=e,!0;let r=Fe(He(o,t.nameId),b);if(r>0||r===0&&n>a)return!1}return!1};if(!x(_,f.length)&&_>0&&x(0,_),y===void 0){h=!1;break}if(!I(K(this.#e,y))){h=!1;break}if(n[m]=v,r[m]=y,p=y,m+=1,i===e)break;g=i+1}if(a=u,i=e,n.length=m,r.length=m,!h){a=null,i=0,n.length=0,r.length=0;continue}for(let e=d;e<m;e+=1){let n=r[e];if(n==null)continue;let i=K(this.#e,n);U(this.#e,n,i)||(ht(this.#e,n,!0,i),t+=1)}}return t}hasAllDirectoriesExpanded(){for(let e of this.#e.snapshot.directories.keys()){if(e===this.#e.snapshot.rootId)continue;let t=K(this.#e,e);if(!U(this.#e,e,t))return!1}return!0}requireDirectoryNodeId(e){let t=sn(this.#e,e);if(t==null)throw Error(`Path does not exist: "${e}"`);if(!I(K(this.#e,t)))throw Error(`Path is not a directory: "${e}"`);return t}resolveActiveDirectoryNodeId(e){try{if(!I(K(this.#e,e)))throw Error(`Node is not a directory: ${String(e)}`);return e}catch{return null}}isDirectoryProjectionVisible(e){let t=e;for(;t!==this.#e.snapshot.rootId;){let e=K(this.#e,t).parentId;if(e!==this.#e.snapshot.rootId){let n=K(this.#e,e),r=Jt(this.#e,e);if(!U(this.#e,e,n)&&r!==t)return!1}t=e}return!0}validateChildPatch(t,n){new e({paths:this.list(t),presorted:!0,sort:this.#e.snapshot.options.sort}).batch(n.operations)}};function Er(e,t){switch(t.type){case`add`:case`remove`:if(!t.path.startsWith(e)||t.path===e)throw Error(`Child patch operation must stay within ${e}: "${t.path}"`);break;case`move`:if(!t.from.startsWith(e)||!t.to.startsWith(e)||t.from===e||t.to===e)throw Error(`Child patch move must stay within ${e}: "${t.from}" -> "${t.to}"`);break}}var Dr={compact:{itemHeight:24,factor:.8},default:{itemHeight:30,factor:1},relaxed:{itemHeight:36,factor:1.2}};function Or(e,t){if(typeof e==`number`)return{itemHeight:t??Dr.default.itemHeight,factor:e};let n=Dr[e??`default`];return{itemHeight:t??n.itemHeight,factor:n.factor}}var kr=Dr.default.itemHeight,Ar=`@layer base, theme, unsafe;

@layer base {
  :host {
    /*
      CSS variables use a fallback stack to ensure user and theme colors slot
      in with ease. User colors take precedence over theme colors, which take
      precedence over defaults.

      Fallback order:

      1. --trees-*-override (explicit)
      2. --trees-theme-* (e.g. Shiki/VS Code tokens)
      3. defaults

      Theme variable names mirror Shiki/VS Code theme file JSON tokens.

      // Available CSS Color Overrides
      --trees-fg-override
      --trees-fg-muted-override
      --trees-bg-override
      --trees-bg-muted-override
      --trees-accent-override
      --trees-border-color-override

      --trees-focus-ring-color-override
      --trees-focus-ring-width-override
      --trees-focus-ring-offset-override

      --trees-search-fg-override
      --trees-search-font-weight-override
      --trees-search-bg-override

      --trees-selected-fg-override
      --trees-selected-bg-override
      --trees-selected-focused-border-color-override

      // Git Status Color Overrides
      --trees-status-added-override
      --trees-status-ignored-override
      --trees-status-modified-override
      --trees-status-renamed-override
      --trees-status-untracked-override
      --trees-status-deleted-override
      --trees-git-added-color-override
      --trees-git-ignored-color-override
      --trees-git-modified-color-override
      --trees-git-renamed-color-override
      --trees-git-untracked-color-override
      --trees-git-deleted-color-override

      // Built-in File Icon Color Overrides
      --trees-file-icon-color
      --trees-file-icon-color-astro
      --trees-file-icon-color-babel
      --trees-file-icon-color-bash
      --trees-file-icon-color-biome
      --trees-file-icon-color-bootstrap
      --trees-file-icon-color-browserslist
      --trees-file-icon-color-bun
      --trees-file-icon-color-claude
      --trees-file-icon-color-css
      --trees-file-icon-color-database
      --trees-file-icon-color-default
      --trees-file-icon-color-docker
      --trees-file-icon-color-eslint
      --trees-file-icon-color-git
      --trees-file-icon-color-go
      --trees-file-icon-color-graphql
      --trees-file-icon-color-html
      --trees-file-icon-color-image
      --trees-file-icon-color-javascript
      --trees-file-icon-color-json
      --trees-file-icon-color-markdown
      --trees-file-icon-color-mcp
      --trees-file-icon-color-npm
      --trees-file-icon-color-oxc
      --trees-file-icon-color-postcss
      --trees-file-icon-color-prettier
      --trees-file-icon-color-python
      --trees-file-icon-color-react
      --trees-file-icon-color-ruby
      --trees-file-icon-color-rust
      --trees-file-icon-color-sass
      --trees-file-icon-color-svg
      --trees-file-icon-color-svelte
      --trees-file-icon-color-svgo
      --trees-file-icon-color-swift
      --trees-file-icon-color-table
      --trees-file-icon-color-text
      --trees-file-icon-color-tailwind
      --trees-file-icon-color-terraform
      --trees-file-icon-color-typescript
      --trees-file-icon-color-vite
      --trees-file-icon-color-vscode
      --trees-file-icon-color-vue
      --trees-file-icon-color-wasm
      --trees-file-icon-color-webpack
      --trees-file-icon-color-yml
      --trees-file-icon-color-zig
      --trees-file-icon-color-zip

      // Density
      //
      // A unitless scale factor for padding, gaps, and indentation. Usually
      // set via \`density\` on useFileTree. Individual overrides take precedence.
      //
      //   Compact: 0.8
      //   Default: 1
      //   Relaxed: 1.2
      //
      --trees-density-override

      // Available CSS Layout Overrides
      --trees-gap-override
      --trees-border-radius-override
      --trees-font-family-override
      --trees-font-size-override
      --trees-font-weight-regular-override
      --trees-font-weight-semibold-override
      --trees-level-gap-override
      --trees-item-padding-x-override
      --trees-item-margin-x-override
      --trees-item-row-gap-override
      --trees-icon-width-override
      --trees-icon-nudge-override
      --trees-scrollbar-gutter-override
      --trees-padding-inline-override
    */

    --trees-fg: var(
      --trees-fg-override,
      var(--trees-theme-sidebar-fg, light-dark(#6c6c71, #adadb1))
    );
    --trees-fg-muted: var(
      --trees-fg-muted-override,
      var(--trees-theme-sidebar-header-fg, light-dark(#84848a, #84848a))
    );
    --trees-bg: var(
      --trees-bg-override,
      var(--trees-theme-sidebar-bg, light-dark(#f8f8f8, #141415))
    );
    --trees-bg-muted: var(
      --trees-bg-muted-override,
      var(--trees-theme-list-hover-bg, light-dark(#dfebff59, #19283c59))
    );
    --trees-accent: var(--trees-accent-override, #009fff);
    --trees-input-bg: var(
      --trees-input-bg-override,
      light-dark(#f8f8f8, #070707)
    );

    --trees-added-light: #16a994;
    --trees-added-dark: #00cab1;
    --trees-ignored-light: #adadb1;
    --trees-ignored-dark: #4a4a4e;
    --trees-modified-light: #1ca1c7;
    --trees-modified-dark: #08c0ef;
    --trees-renamed-light: #d5a910;
    --trees-renamed-dark: #ffd452;
    --trees-untracked-light: #16a994;
    --trees-untracked-dark: #00cab1;
    --trees-deleted-light: #ff2e3f;
    --trees-deleted-dark: #ff6762;

    --trees-border-color: var(
      --trees-border-color-override,
      var(--trees-theme-sidebar-border, light-dark(#eeeeef, #070707))
    );
    --trees-indent-guide-bg: var(
      --trees-indent-guide-bg-override,
      color-mix(in lab, var(--trees-fg-muted) 25%, transparent)
    );
    --trees-density: var(--trees-density-override, 1);
    --trees-border-radius: var(
      --trees-border-radius-override,
      calc(6px * var(--trees-density))
    );

    --trees-font-family: var(--trees-font-family-override, system-ui);
    --trees-font-size: var(--trees-font-size-override, 13px);
    --trees-font-weight-regular: var(--trees-font-weight-regular-override, 400);
    --trees-font-weight-semibold: var(
      --trees-font-weight-semibold-override,
      600
    );

    --trees-focus-ring-color: var(
      --trees-focus-ring-color-override,
      var(--trees-theme-focus-ring, var(--trees-accent))
    );
    --trees-focus-ring-width: var(--trees-focus-ring-width-override, 1px);
    --trees-focus-ring-offset: var(--trees-focus-ring-offset-override, -1px);

    --trees-search-fg: var(
      --trees-search-fg-override,
      var(--trees-theme-input-fg, var(--trees-fg))
    );
    --trees-search-font-weight: var(--trees-search-font-weight-override, 600);
    --trees-search-bg: var(
      --trees-search-bg-override,
      var(--trees-theme-input-bg, var(--trees-input-bg))
    );

    --trees-scrollbar-thumb: var(
      --trees-scrollbar-thumb-override,
      var(
        --trees-theme-scrollbar-thumb,
        color-mix(in lab, var(--trees-fg) 25%, var(--trees-bg))
      )
    );

    --trees-selected-fg: var(
      --trees-selected-fg-override,
      var(--trees-theme-list-active-selection-fg, var(--trees-fg))
    );
    --trees-selected-bg: var(
      --trees-selected-bg-override,
      var(
        --trees-theme-list-active-selection-bg,
        light-dark(
          color-mix(in lab, var(--trees-accent) 12%, var(--trees-bg)),
          color-mix(in lab, var(--trees-accent) 15%, var(--trees-bg))
        )
      )
    );
    --trees-selected-focused-border-color: var(
      --trees-selected-focused-border-color-override,
      var(--trees-theme-focus-ring, var(--trees-accent))
    );

    /* Git status (e.g. from Shiki theme gitDecoration.*) */
    --trees-status-added: var(
      --trees-status-added-override,
      var(
        --trees-theme-git-added-fg,
        light-dark(var(--trees-added-light), var(--trees-added-dark))
      )
    );
    --trees-status-ignored: var(
      --trees-status-ignored-override,
      var(
        --trees-theme-git-ignored-fg,
        light-dark(var(--trees-ignored-light), var(--trees-ignored-dark))
      )
    );
    --trees-status-modified: var(
      --trees-status-modified-override,
      var(
        --trees-theme-git-modified-fg,
        light-dark(var(--trees-modified-light), var(--trees-modified-dark))
      )
    );
    --trees-status-renamed: var(
      --trees-status-renamed-override,
      var(
        --trees-theme-git-renamed-fg,
        light-dark(var(--trees-renamed-light), var(--trees-renamed-dark))
      )
    );
    --trees-status-untracked: var(
      --trees-status-untracked-override,
      var(
        --trees-theme-git-untracked-fg,
        light-dark(var(--trees-untracked-light), var(--trees-untracked-dark))
      )
    );
    --trees-status-deleted: var(
      --trees-status-deleted-override,
      var(
        --trees-theme-git-deleted-fg,
        light-dark(var(--trees-deleted-light), var(--trees-deleted-dark))
      )
    );
    --trees-git-modified-color: var(
      --trees-git-modified-color-override,
      var(--trees-status-modified)
    );
    --trees-git-added-color: var(
      --trees-git-added-color-override,
      var(--trees-status-added)
    );
    --trees-git-ignored-color: var(
      --trees-git-ignored-color-override,
      var(--trees-status-ignored)
    );
    --trees-git-deleted-color: var(
      --trees-git-deleted-color-override,
      var(--trees-status-deleted)
    );
    --trees-git-renamed-color: var(
      --trees-git-renamed-color-override,
      var(--trees-status-renamed)
    );
    --trees-git-untracked-color: var(
      --trees-git-untracked-color-override,
      var(--trees-status-untracked)
    );

    --trees-icon-gray: light-dark(#84848a, #adadb1);
    --trees-icon-red: light-dark(#d52c36, #ff6762);
    --trees-icon-vermilion: light-dark(#ff8c5b, #d5512f);
    --trees-icon-orange: light-dark(#d47628, #ffa359);
    --trees-icon-yellow: light-dark(#d5a910, #ffd452);
    --trees-icon-green: light-dark(#199f43, #5ecc71);
    --trees-icon-teal: light-dark(#17a5af, #64d1db);
    --trees-icon-cyan: light-dark(#1ca1c7, #68cdf2);
    --trees-icon-blue: light-dark(#1a85d4, #69b1ff);
    --trees-icon-indigo: light-dark(#693acf, #9d6afb);
    --trees-icon-purple: light-dark(#a631be, #d568ea);
    --trees-icon-pink: light-dark(#d32a61, #ff678d);
    --trees-icon-mauve: light-dark(#594c5b, #79697b);

    --trees-file-icon-color-default: var(
      --trees-file-icon-color,
      var(--trees-icon-gray)
    );
    --trees-file-icon-color-astro: var(
      --trees-file-icon-color,
      var(--trees-icon-purple)
    );
    --trees-file-icon-color-babel: var(
      --trees-file-icon-color,
      var(--trees-icon-yellow)
    );
    --trees-file-icon-color-bash: var(
      --trees-file-icon-color,
      var(--trees-icon-green)
    );
    --trees-file-icon-color-biome: var(
      --trees-file-icon-color,
      var(--trees-icon-blue)
    );
    --trees-file-icon-color-bootstrap: var(
      --trees-file-icon-color,
      var(--trees-icon-indigo)
    );
    --trees-file-icon-color-browserslist: var(
      --trees-file-icon-color,
      var(--trees-icon-yellow)
    );
    --trees-file-icon-color-bun: var(
      --trees-file-icon-color,
      var(--trees-icon-mauve)
    );
    --trees-file-icon-color-claude: var(
      --trees-file-icon-color,
      var(--trees-icon-orange)
    );
    --trees-file-icon-color-css: var(
      --trees-file-icon-color,
      var(--trees-icon-indigo)
    );
    --trees-file-icon-color-database: var(
      --trees-file-icon-color,
      var(--trees-icon-purple)
    );
    --trees-file-icon-color-docker: var(
      --trees-file-icon-color,
      var(--trees-icon-blue)
    );
    --trees-file-icon-color-eslint: var(
      --trees-file-icon-color,
      var(--trees-icon-indigo)
    );
    --trees-file-icon-color-git: var(
      --trees-file-icon-vermilion,
      var(--trees-icon-vermilion)
    );
    --trees-file-icon-color-go: var(
      --trees-file-icon-color,
      var(--trees-icon-cyan)
    );
    --trees-file-icon-color-graphql: var(
      --trees-file-icon-color,
      var(--trees-icon-pink)
    );
    --trees-file-icon-color-html: var(
      --trees-file-icon-color,
      var(--trees-icon-orange)
    );
    --trees-file-icon-color-image: var(
      --trees-file-icon-color,
      var(--trees-icon-pink)
    );
    --trees-file-icon-color-javascript: var(
      --trees-file-icon-color,
      var(--trees-icon-yellow)
    );
    --trees-file-icon-color-json: var(
      --trees-file-icon-color,
      var(--trees-icon-orange)
    );
    --trees-file-icon-color-markdown: var(
      --trees-file-icon-color,
      var(--trees-icon-green)
    );
    --trees-file-icon-color-mcp: var(
      --trees-file-icon-color,
      var(--trees-icon-teal)
    );
    --trees-file-icon-color-npm: var(
      --trees-file-icon-color,
      var(--trees-icon-red)
    );
    --trees-file-icon-color-oxc: var(
      --trees-file-icon-cyan,
      var(--trees-icon-cyan)
    );
    --trees-file-icon-color-postcss: var(
      --trees-file-icon-color,
      var(--trees-icon-red)
    );
    --trees-file-icon-color-prettier: var(
      --trees-file-icon-color,
      var(--trees-icon-teal)
    );
    --trees-file-icon-color-python: var(
      --trees-file-icon-color,
      var(--trees-icon-blue)
    );
    --trees-file-icon-color-react: var(
      --trees-file-icon-color,
      var(--trees-icon-cyan)
    );
    --trees-file-icon-color-ruby: var(
      --trees-file-icon-color,
      var(--trees-icon-red)
    );
    --trees-file-icon-color-rust: var(
      --trees-file-icon-color,
      var(--trees-icon-orange)
    );
    --trees-file-icon-color-sass: var(
      --trees-file-icon-color,
      var(--trees-icon-pink)
    );
    --trees-file-icon-color-svg: var(
      --trees-file-icon-color,
      var(--trees-icon-orange)
    );
    --trees-file-icon-color-svelte: var(
      --trees-file-icon-color,
      var(--trees-icon-red)
    );
    --trees-file-icon-color-svgo: var(
      --trees-file-icon-color,
      var(--trees-icon-green)
    );
    --trees-file-icon-color-swift: var(
      --trees-file-icon-color,
      var(--trees-icon-orange)
    );
    --trees-file-icon-color-table: var(
      --trees-file-icon-color,
      var(--trees-icon-teal)
    );
    --trees-file-icon-color-text: var(
      --trees-file-icon-color,
      var(--trees-icon-gray)
    );
    --trees-file-icon-color-tailwind: var(
      --trees-file-icon-color,
      var(--trees-icon-cyan)
    );
    --trees-file-icon-color-terraform: var(
      --trees-file-icon-color,
      var(--trees-icon-indigo)
    );
    --trees-file-icon-color-typescript: var(
      --trees-file-icon-color,
      var(--trees-icon-blue)
    );
    --trees-file-icon-color-vite: var(
      --trees-file-icon-color,
      var(--trees-icon-purple)
    );
    --trees-file-icon-color-vscode: var(
      --trees-file-icon-color,
      var(--trees-icon-blue)
    );
    --trees-file-icon-color-vue: var(
      --trees-file-icon-color,
      var(--trees-icon-green)
    );
    --trees-file-icon-color-wasm: var(
      --trees-file-icon-color,
      var(--trees-icon-indigo)
    );
    --trees-file-icon-color-webpack: var(
      --trees-file-icon-color,
      var(--trees-icon-blue)
    );
    --trees-file-icon-color-yml: var(
      --trees-file-icon-color,
      var(--trees-icon-red)
    );
    --trees-file-icon-color-zig: var(
      --trees-file-icon-color,
      var(--trees-icon-orange)
    );
    --trees-file-icon-color-zip: var(
      --trees-file-icon-color,
      var(--trees-icon-orange)
    );

    --trees-level-gap: var(
      --trees-level-gap-override,
      calc(8px * var(--trees-density))
    );
    --trees-item-padding-x: var(
      --trees-item-padding-x-override,
      calc(8px * var(--trees-density))
    );
    --trees-item-margin-x: var(
      --trees-item-margin-x-override,
      calc(2px * var(--trees-density))
    );
    --trees-item-row-gap: var(
      --trees-item-row-gap-override,
      calc(6px * var(--trees-density))
    );
    --trees-icon-width: var(--trees-icon-width-override, 16px);
    --trees-icon-nudge: var(
      --trees-icon-nudge-override,
      calc(1px * var(--trees-density))
    );
    --trees-row-height: var(--trees-item-height, 30px);
    --trees-git-lane-width: var(--trees-git-lane-width-override, 12px);
    --trees-action-lane-width: var(
      --trees-action-lane-width-override,
      calc(var(--trees-icon-width) + 2px)
    );
    /* Keep the floating trigger aligned with the row's action lane. Going in
       from the root's right edge: the scroll container reserves
       \`--trees-padding-inline\` of effective inset on each side (its asymmetric
       padding formula cancels the scrollbar gutter on the right), the row
       sits inside that inset, and its trailing \`--trees-item-padding-x\` is the
       action lane itself. The trigger's own focus-ring margin then trims one
       pixel back so the button's visible right edge lines up with the lane. */
    --trees-context-menu-trigger-inline-offset: calc(
      var(--trees-padding-inline) + var(--trees-item-padding-x) -
        var(--trees-focus-ring-width)
    );

    --trees-scrollbar-gutter: var(--trees-scrollbar-gutter-override, 6px);
    --trees-padding-inline: var(--trees-padding-inline-override, 16px);

    color-scheme: light dark;
    display: flex;
    flex-direction: column;
    font-size: var(--trees-font-size);
    color: var(--trees-fg);
    background-color: var(--trees-bg);
    --truncate-marker-background-color: var(--trees-bg);
    font-family: var(--trees-font-family);
    font-weight: var(--trees-font-weight-regular);
  }

  :host([data-file-tree-virtualized='true']) {
    height: 100%;
    overflow: hidden;
  }

  [data-file-tree-virtualized-wrapper='true'] {
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  [data-file-tree-virtualized-root='true'] {
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  [data-file-tree-virtualized-scroll='true'],
  [data-file-tree-scrollbar-measure='true'] {
    overflow-y: auto;
    scrollbar-gutter: stable;

    &::-webkit-scrollbar {
      width: var(--trees-scrollbar-gutter);
      height: var(--trees-scrollbar-gutter);
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background-color: transparent;
      border: 1px solid transparent;
      background-clip: content-box;
      border-radius: calc(var(--trees-scrollbar-gutter) / 2);
    }

    &::-webkit-scrollbar-corner {
      background-color: transparent;
    }

    &:hover::-webkit-scrollbar-thumb {
      background-color: var(--trees-scrollbar-thumb);
    }
  }

  /* These are styles for a temporarily generated element to measure the size
   * of the scrollbar.  It's intended to be somewhat similar in scrollbar style
   * scope to the scrollable tree so \`--trees-scrollbar-gutter-measured\` is an
   * accurate reflection of the size the scrollbar gutter takes up. */
  [data-file-tree-scrollbar-measure='true'] {
    position: absolute;
    top: 0;
    left: 0;
    visibility: hidden;
    pointer-events: none;
    width: 100px;
    height: 100px;
  }

  @supports (-moz-appearance: none) {
    [data-file-tree-virtualized-scroll='true'],
    [data-file-tree-scrollbar-measure='true'] {
      scrollbar-width: thin;
      scrollbar-color: var(--trees-scrollbar-thumb) transparent;
    }
  }

  [data-file-tree-virtualized-scroll='true'] {
    position: relative;
    overflow-y: auto;
    flex: 1 1 0;
    min-height: 0;
    padding-inline: max(
        calc(var(--trees-padding-inline) - var(--trees-item-margin-x)),
        0px
      )
      /* NOTE(amadeus): We can assume that all Webkit based browser gutters
       * will align to the value of '--trees-scrollbar-gutter', however if not, then
       * \`--trees-scrollbar-gutter-measured\` should correct it. Mostly we are
       * hoping to avoid SSR alignment jumps if possible. In non-SSR'd environments
       * \`--trees-scrollbar-gutter-measured\` should always be immediately available.
       */
      max(
        calc(
          var(--trees-padding-inline) - var(--trees-item-margin-x) -
            var(
              --trees-scrollbar-gutter-measured,
              var(--trees-scrollbar-gutter)
            )
        ),
        0px
      );
  }

  @supports (-moz-appearance: none) {
    [data-file-tree-virtualized-scroll='true'] {
      padding-inline: max(
          calc(var(--trees-padding-inline) - var(--trees-item-margin-x)),
          0px
        )
        /* NOTE(amadeus): However on Firefox it can vary a little bit, but most
         * likely the majority of cases will default to a 0px width scrollbar lets
         * inherit that first to avoid SSR jumps. In non-SSR'd environments
         * \`--trees-scrollbar-gutter-measured\` should always be immediately available.
         */
        max(
          calc(
            var(--trees-padding-inline) - var(--trees-item-margin-x) -
              var(--trees-scrollbar-gutter-measured, 0px)
          ),
          0px
        );
    }
  }

  [data-file-tree-sticky-overlay='true'] {
    position: sticky;
    top: 0;
    height: 0;
    z-index: 4;
    overflow: visible;
    pointer-events: none;
  }

  /* The overlay DOM is kept populated even at scrollTop=0 so the browser has
   * the rendered rows on hand the moment scrolling begins — otherwise the
   * compositor paints a scrolled frame before React can mount the overlay,
   * and the topmost sticky folder jumps up by a couple of pixels before it
   * "snaps" into its pinned position. We hide it via CSS whenever the scroll
   * is at the top and no scroll is in progress, so the preview doesn't leak
   * through at rest. \`data-overlay-reveal\` is stamped on the root only when
   * the user initiates a scroll while already at the top — exactly the case
   * where we need the pre-mounted overlay to be visible through the first
   * compositor frame. It is deliberately distinct from the general
   * \`data-is-scrolling\` flag so a scroll that ends at the top (e.g. ArrowUp
   * navigation) re-hides the overlay the instant the scroll lands, rather
   * than waiting for the hover-suppression timer to elapse. */
  [data-file-tree-virtualized-root='true'][data-scroll-at-top='true']:not(
      [data-overlay-reveal]
    )
    [data-file-tree-sticky-overlay='true'] {
    visibility: hidden;
  }

  [data-file-tree-sticky-overlay-content='true'] {
    background-color: var(--trees-bg);
    position: relative;
    pointer-events: none;
  }

  [data-file-tree-virtualized-list='true'] {
    background-color: var(--trees-bg);
    position: relative;
    min-height: 100%;
    width: 100%;
    overflow-anchor: none;

    &[data-is-scrolling] {
      pointer-events: none;
    }
  }

  [data-file-tree-virtualized-sticky-offset='true'] {
    contain: layout size;
  }

  [data-file-tree-virtualized-sticky='true'] {
    position: sticky;
    top: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    isolation: isolate;
    /* Promote to its own compositor layer so text inside the window is
     * rasterized once and GPU-translated during scroll. Without this, the
     * browser re-paints the window (and its text) at every scroll frame,
     * which produces visible 1px shake / character tearing. */
    will-change: transform;
  }

  [data-file-tree-search-container] {
    display: flex;
    padding: 0;
    padding-inline: var(--trees-padding-inline);
    margin-bottom: var(--trees-item-row-gap);
  }

  [data-file-tree-search-input] {
    --trees-focus-ring-width: 2px;
    font-family: var(--trees-font-family);
    font-size: var(--trees-font-size);
    flex: 1;
    height: var(--trees-row-height);
    /* 1px breathing room so the focus-visible outline isn't clipped when the
     * input sits flush against the top of the scroll container. */
    margin-block: 1px;
    padding-inline: var(--trees-item-padding-x);
    line-height: var(--trees-row-height);
    color: var(--trees-search-fg);
    background-color: var(--trees-search-bg);
    border: 1px solid var(--trees-border-color);
    border-radius: var(--trees-border-radius);
    outline: none;

    &::placeholder {
      color: color-mix(
        in lab,
        var(--trees-search-fg) 65%,
        var(--trees-search-bg)
      );
    }

    &:focus-visible,
    &[data-file-tree-search-input-fake-focus='true'] {
      outline: var(--trees-focus-ring-width) solid var(--trees-focus-ring-color);
      outline-offset: var(--trees-focus-ring-offset);
    }
  }

  /* The wrapper for the tree items */
  [role='tree'] {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: var(--trees-gap-override, 0);
  }

  /* LIST ITEM */
  [data-type='item'] {
    color: inherit;
    font-family: var(--trees-font-family);
    font-size: var(--trees-font-size);
    text-align: start;
    outline: none;
    background-color: var(--trees-bg);
    border: none;
    position: relative;

    padding: 0 var(--trees-item-padding-x);
    margin: 0 var(--trees-item-margin-x);
    cursor: pointer;
    -webkit-user-select: none;
            user-select: none;
    -webkit-touch-callout: none;
    touch-action: manipulation;
    display: flex;
    flex: 0 0 var(--trees-row-height);
    align-items: center;
    height: var(--trees-row-height);
    line-height: var(--trees-row-height);
    gap: var(--trees-item-row-gap);
    border-radius: var(--trees-border-radius);

    &:hover,
    &[data-item-context-hover='true'] {
      background-color: var(--trees-bg-muted);
      --truncate-marker-background-color: var(--trees-bg-muted);
    }

    &[data-item-focused='true'],
    &:focus-visible {
      z-index: 2;

      &::before {
        position: absolute;
        inset: 0;
        content: '';
        display: block;
        border-radius: var(--trees-border-radius);
        outline: var(--trees-focus-ring-width) solid
          var(--trees-focus-ring-color);
        outline-offset: var(--trees-focus-ring-offset);
        pointer-events: none;
      }

      &[data-item-selected='true']::before {
        outline-color: var(--trees-selected-focused-border-color);
      }
    }

    &[data-item-selected='true'] {
      color: var(--trees-selected-fg);
      background-color: var(--trees-selected-bg);
      --truncate-marker-background-color: var(--trees-selected-bg);
      z-index: 3;

      [data-item-section='icon'] {
        color: var(--trees-selected-fg);
      }
    }

    &[data-item-search-match='true'] {
      font-weight: var(--trees-search-font-weight);
    }
  }

  [data-type='item'][data-file-tree-sticky-row='true'] {
    pointer-events: auto;
  }

  [data-item-selected='true']:has(+ [data-item-selected='true']) {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  [data-item-selected='true'] + [data-item-selected='true'] {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }

  /* Flattened Directory Parts */
  [data-item-flattened-subitems] {
    display: inline-flex;
    align-items: center;
    gap: 2px;
  }
  [data-item-flattened-subitem]:hover,
  [data-item-flattened-subitem-drag-target='true'] {
    text-decoration: underline;
  }

  /* Icon for each item */
  [data-item-section='icon'] {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--trees-fg-muted);
    fill: currentColor;
    width: var(--trees-icon-width);
  }

  :where([data-item-section='icon'] > [data-icon-token]) {
    color: var(--trees-fg-muted);
  }

  [data-file-tree-colored-icons='true'] {
    [data-icon-token='astro'] {
      color: var(--trees-file-icon-color-astro);
    }
    [data-icon-token='babel'] {
      color: var(--trees-file-icon-color-babel);
    }
    [data-icon-token='bash'] {
      color: var(--trees-file-icon-color-bash);
    }
    [data-icon-token='biome'] {
      color: var(--trees-file-icon-color-biome);
    }
    [data-icon-token='bootstrap'] {
      color: var(--trees-file-icon-color-bootstrap);
    }
    [data-icon-token='browserslist'] {
      color: var(--trees-file-icon-color-browserslist);
    }
    [data-icon-token='bun'] {
      color: var(--trees-file-icon-color-bun);
    }
    [data-icon-token='claude'] {
      color: var(--trees-file-icon-color-claude);
    }
    [data-icon-token='css'] {
      color: var(--trees-file-icon-color-css);
    }
    [data-icon-token='database'] {
      color: var(--trees-file-icon-color-database);
    }
    [data-icon-token='default'] {
      color: var(--trees-file-icon-color-default);
    }
    [data-icon-token='docker'] {
      color: var(--trees-file-icon-color-docker);
    }
    [data-icon-token='eslint'] {
      color: var(--trees-file-icon-color-eslint);
    }
    [data-icon-token='git'] {
      color: var(--trees-file-icon-color-git);
    }
    [data-icon-token='go'] {
      color: var(--trees-file-icon-color-go);
    }
    [data-icon-token='graphql'] {
      color: var(--trees-file-icon-color-graphql);
    }
    [data-icon-token='html'] {
      color: var(--trees-file-icon-color-html);
    }
    [data-icon-token='image'] {
      color: var(--trees-file-icon-color-image);
    }
    [data-icon-token='javascript'] {
      color: var(--trees-file-icon-color-javascript);
    }
    [data-icon-token='json'] {
      color: var(--trees-file-icon-color-json);
    }
    [data-icon-token='markdown'] {
      color: var(--trees-file-icon-color-markdown);
    }
    [data-icon-token='mcp'] {
      color: var(--trees-file-icon-color-mcp);
    }
    [data-icon-token='npm'] {
      color: var(--trees-file-icon-color-npm);
    }
    [data-icon-token='oxc'] {
      color: var(--trees-file-icon-color-oxc);
    }
    [data-icon-token='postcss'] {
      color: var(--trees-file-icon-color-postcss);
    }
    [data-icon-token='prettier'] {
      color: var(--trees-file-icon-color-prettier);
    }
    [data-icon-token='python'] {
      color: var(--trees-file-icon-color-python);
    }
    [data-icon-token='react'] {
      color: var(--trees-file-icon-color-react);
    }
    [data-icon-token='ruby'] {
      color: var(--trees-file-icon-color-ruby);
    }
    [data-icon-token='rust'] {
      color: var(--trees-file-icon-color-rust);
    }
    [data-icon-token='sass'] {
      color: var(--trees-file-icon-color-sass);
    }
    [data-icon-token='svg'] {
      color: var(--trees-file-icon-color-svg);
    }
    [data-icon-token='svelte'] {
      color: var(--trees-file-icon-color-svelte);
    }
    [data-icon-token='svgo'] {
      color: var(--trees-file-icon-color-svgo);
    }
    [data-icon-token='swift'] {
      color: var(--trees-file-icon-color-swift);
    }
    [data-icon-token='table'] {
      color: var(--trees-file-icon-color-table);
    }
    [data-icon-token='text'] {
      color: var(--trees-file-icon-color-text);
    }
    [data-icon-token='tailwind'] {
      color: var(--trees-file-icon-color-tailwind);
    }
    [data-icon-token='terraform'] {
      color: var(--trees-file-icon-color-terraform);
    }
    [data-icon-token='typescript'] {
      color: var(--trees-file-icon-color-typescript);
    }
    [data-icon-token='vite'] {
      color: var(--trees-file-icon-color-vite);
    }
    [data-icon-token='vscode'] {
      color: var(--trees-file-icon-color-vscode);
    }
    [data-icon-token='vue'] {
      color: var(--trees-file-icon-color-vue);
    }
    [data-icon-token='wasm'] {
      color: var(--trees-file-icon-color-wasm);
    }
    [data-icon-token='webpack'] {
      color: var(--trees-file-icon-color-webpack);
    }
    [data-icon-token='yml'] {
      color: var(--trees-file-icon-color-yml);
    }
    [data-icon-token='zig'] {
      color: var(--trees-file-icon-color-zig);
    }
    [data-icon-token='zip'] {
      color: var(--trees-file-icon-color-zip);
    }
  }

  /* Chevron rotation and visual alignment */
  /* Chevron pointing down */
  [data-icon-name='file-tree-icon-chevron'] {
    &[data-align-capitals='false'] {
      transform: translate(0, var(--trees-icon-nudge));
    }
    &[data-align-capitals='true'] {
      transform: translate(0, 0);
    }
  }

  [data-item-section='content'] {
    flex: 0 1 auto;
    text-align: start;
    min-width: 0;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    /* Breaks middle truncate component to also set this */
    /* white-space: nowrap; */
  }

  [data-item-section='decoration'] {
    flex: 1 1 0;
    min-width: 0;
    display: flex;
    justify-content: flex-end;
    text-align: end;
    overflow: hidden;
    color: var(--trees-fg-muted);
  }

  [data-item-section='decoration'] > span {
    min-width: 0;
    max-width: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: flex-end;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  [data-item-section='git'],
  [data-item-section='action'] {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  [data-item-section='git'] {
    width: var(--trees-git-lane-width);
  }

  [data-item-section='action'] {
    width: var(--trees-action-lane-width);
    color: var(--trees-fg-muted);
    fill: currentColor;
    pointer-events: none;
  }

  [data-item-section='git'] > span,
  [data-item-section='action'] > span {
    width: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  [data-item-action-affordance='decorative'] {
    opacity: 0.85;
  }

  [data-item-rename-input] {
    appearance: none;
    width: 100%;
    min-width: 0;
    height: calc(var(--trees-row-height) - 4px);
    font-family: inherit;
    font-size: inherit;
    /* line-height: calc(var(--trees-row-height) - 8px); */
    color: inherit;
    background-color: transparent;
    border: 0;
    padding-inline: 6px;
    outline: none;
    box-sizing: border-box;
  }

  [data-item-section='content']:has([data-item-rename-input])
    ~ [data-item-section='action'],
  [data-item-section='content']:has([data-item-rename-input])
    ~ [data-item-section='decoration'] {
    display: none;
  }

  /* Chevron pointing right */
  [aria-expanded='false'][data-item-type='folder']
    > [data-item-section='icon']
    > [data-icon-name='file-tree-icon-chevron'] {
    &[data-align-capitals='true'] {
      transform: rotate(-90deg)
        translate(
          calc(var(--trees-icon-nudge) / 2),
          calc(var(--trees-icon-nudge) / 2)
        );
    }
    &[data-align-capitals='false'] {
      transform: rotate(-90deg)
        translate(
          calc(var(--trees-icon-nudge) / 2 * -1),
          calc(var(--trees-icon-nudge) / 2)
        );
    }
  }

  /* LIST IDENTATION */
  /* Spacing container */
  [data-item-section='spacing'] {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: var(--trees-row-height);
    padding-left: calc(calc(var(--trees-icon-width) / 2) - 0.5px);

    &:empty {
      padding-left: 0;
    }
  }

  /* Spacing per level */
  [data-item-section='spacing-item'] {
    transform: translateX(-0.25px);
    display: inline-block;
    border-left: 1px solid var(--trees-indent-guide-bg);
    height: 100%;
    margin-right: calc(var(--trees-level-gap) - 1px);
    opacity: 0;
    transition: opacity 150ms ease;

    & + & {
      margin-left: calc(
        var(--trees-item-row-gap) + calc(var(--trees-icon-width) / 2) - 0.5px
      );
    }
  }

  :host(:hover) [data-item-section='spacing-item'] {
    opacity: 0.75;
  }

  /* Git status indicator */

  /* This is a folder that contains a git change */
  [data-item-contains-git-change='true'] > [data-item-section='git'] {
    color: var(--trees-git-modified-color);
    opacity: 0.5;
    fill: currentColor;
  }

  /* These are files that have a git change */
  [data-item-git-status] {
    &
      > :where([data-item-section='icon'])
      > :where(:not([data-icon-name='file-tree-icon-chevron'])) {
      color: var(--trees-item-git-status-color);
    }
    & > [data-item-section='content'] {
      color: var(--trees-item-git-status-color);
    }
    & > [data-item-section='git'] {
      color: var(--trees-item-git-status-color);
      font-weight: var(--trees-font-weight-semibold);
    }
  }

  [data-item-git-status='added'] {
    --trees-item-git-status-color: var(--trees-git-added-color);
  }

  [data-item-git-status='deleted'] {
    --trees-item-git-status-color: var(--trees-git-deleted-color);
  }

  [data-item-git-status='ignored'] {
    --trees-item-git-status-color: var(--trees-git-ignored-color);

    & > [data-item-section='icon'] {
      opacity: 0.5;
    }
  }

  [data-item-section='git'] [data-icon-name='file-tree-icon-dot'] {
    /* this is a nudge to align the dot with the likely lowercase text. it's slightly
    generalizable, but other fonts are gonna need other nudges i assume */
    transform: translateY(calc(0.65ex - 50%));
  }

  [data-item-git-status='modified'] {
    --trees-item-git-status-color: var(--trees-git-modified-color);
  }

  [data-item-git-status='renamed'] {
    --trees-item-git-status-color: var(--trees-git-renamed-color);
  }

  [data-item-git-status='untracked'] {
    --trees-item-git-status-color: var(--trees-git-untracked-color);
  }

  /* Drag and drop */
  [data-item-drag-target='true'] {
    background-color: var(--trees-selected-bg);
  }

  [data-item-dragging='true'] {
    opacity: 0.5;
  }

  /* Lock icon for locked paths (sibling of content) */
  [data-item-section='lock'] {
    flex: 0 0 auto;
    margin-left: auto;
    display: flex;
    align-items: center;
    color: var(--trees-fg-muted);
  }
  [data-item-section='lock'] svg {
    display: block;
  }

  [data-type='header-slot'] {
    display: block;
    flex: 0 0 auto;
  }

  [data-type='context-menu-wash'] {
    position: absolute;
    inset: 0;
    z-index: 3;
    background-color: transparent;
    touch-action: none;
  }

  [data-type='context-menu-anchor'] {
    position: absolute;
    top: 0;
    right: var(--trees-context-menu-trigger-inline-offset);
    z-index: 4;
    display: none;
    align-items: center;

    &[data-visible='true'] {
      display: flex;
    }
  }

  /* Hide the floating trigger while the scroll container is actively moving.
   * The anchor is positioned against the root, not the scroll content, so its
   * \`top\` follows the row via a React state update — one frame behind the
   * compositor. That delay is visible as the trigger hovering over the wrong
   * row during the first frame of a scroll. The \`data-is-scrolling\` flag on
   * the root is flipped synchronously on \`wheel\`/\`touchmove\`/\`keydown\` before
   * the compositor commits the next paint, so this selector hides the anchor
   * in the same frame the scroll begins. */
  [data-file-tree-virtualized-root='true'][data-is-scrolling]
    [data-type='context-menu-anchor'] {
    display: none;
  }

  [data-type='context-menu-anchor'] > slot[name='context-menu'] {
    display: block;
    width: 0;
    min-width: 0;
    flex: 0 0 0;
    overflow: visible;
  }

  /* Single floating context menu trigger */
  [data-type='context-menu-trigger'] {
    all: unset;
    align-items: center;
    justify-content: center;
    width: var(--trees-action-lane-width);
    color: var(--trees-fg-muted);
    fill: currentColor;
    cursor: pointer;
    font-family: var(--trees-font-family);
    font-size: var(--trees-font-size);
    border-top-right-radius: var(--trees-border-radius);
    border-bottom-right-radius: var(--trees-border-radius);
    margin: var(--trees-focus-ring-width);
    height: calc(var(--trees-row-height) - var(--trees-focus-ring-width) * 2);
    border-width: 0;
    transition: color 120ms ease;

    display: flex;
  }

  [data-type='context-menu-trigger']:hover,
  [data-type='context-menu-trigger'][aria-expanded='true'] {
    color: var(--trees-fg);
  }

  /** @pierre/truncate css here, manually copy pasted for now */
  [data-truncate-container] {
    /* CUSTOM TO TREES, TO SUPPORT THE OUTLINE */
    margin-top: -1px;
    margin-bottom: -1px;

    /* Width of the fade from default marker to text */
    --truncate-internal-marker-fade-width: var(
      --truncate-marker-fade-width,
      2px
    );
    /* Width of the solid color between the fade from the default marker to the text */
    --truncate-internal-marker-gap: var(--truncate-marker-gap, 0px);
    /* Opacity of the marker 'color' property, not of the element itself */
    --truncate-internal-marker-opacity: var(--truncate-marker-opacity, 50%);
    /* Opacity of the marker 'color' property specifically for the middle truncate, not opacity of the element itself */
    --truncate-internal-middle-marker-opacity: var(
      --truncate-middle-marker-opacity,
      80%
    );
    /* Background color of the default marker */
    --truncate-internal-marker-background-color: var(
      --truncate-marker-background-color,
      light-dark(white, black)
    );
    /* Duration of the fade out animation for the marker */
    --truncate-internal-marker-fade-out-duration: var(
      --truncate-marker-fade-out-duration,
      0ms
    );
    /* Duration of the fade in animation for the marker */
    --truncate-internal-marker-fade-in-duration: var(
      --truncate-marker-fade-in-duration,
      100ms
    );

    /* FADE Variant specifics */
    --truncate-internal-fade-marker-color: var(
      --truncate-fade-marker-color,
      #000
    );
    --truncate-internal-fade-marker-width: var(
      --truncate-fade-marker-width,
      0.2lh
    );

    /*
    In some special cases people might be adding spacing in other ways
    that would benefit from being able to override this, however the container
    query below can't use this and would need to be redeclared with the overridden
    value. It's a bad time, but better than nothing.
    */
    --truncate-internal-single-line-height: 1lh;

    height: var(--truncate-internal-single-line-height);
    min-width: 0;
    overflow: hidden;
  }

  [data-truncate-marker] {
    display: flex;
    position: absolute;
    height: var(--truncate-internal-single-line-height);
    z-index: 2;
    color: color-mix(
      in srgb,
      currentColor var(--truncate-internal-marker-opacity),
      transparent
    );

    /* Core trick for hiding the marker until overflow occurs */
    opacity: 0;
    transition: opacity var(--truncate-internal-marker-fade-out-duration)
      ease-in-out;
  }

  @container measure (height > 1lh) {
    [data-truncate-marker] {
      opacity: 1;
      transition: opacity var(--truncate-internal-marker-fade-in-duration)
        ease-in-out;
    }
  }

  [data-truncate-grid] {
    display: grid;
    position: relative;
  }

  [data-truncate-content='visible'] {
    white-space: nowrap;
  }

  [data-truncate-content='overflow'] {
    opacity: 0;
    pointer-events: none;
    -webkit-user-select: none;
            user-select: none;
    word-break: break-all;
    margin-top: calc(-1 * var(--truncate-internal-single-line-height));
  }

  [data-truncate-marker-cell] {
    container: measure / size;
    overflow: visible;
    -webkit-user-select: none;
            user-select: none;
    pointer-events: none;
  }

  [data-truncate-container='truncate'] {
    & [data-truncate-grid] {
      grid-template-columns: minmax(0, max-content) 0;
    }
    & [data-truncate-marker] {
      right: 0;
    }
    & [data-truncate-fade] {
      margin-right: calc(-2 * var(--truncate-internal-fade-marker-width));
    }
  }

  [data-truncate-container='fruncate'] {
    & [data-truncate-grid] {
      grid-template-columns: 0 minmax(0, max-content) auto;
    }
    & [data-truncate-content] {
      direction: rtl;
    }
    & [data-truncate-content] > span {
      unicode-bidi: plaintext;
    }
    & [data-truncate-fade] {
      margin-left: calc(-2 * var(--truncate-internal-fade-marker-width));
    }
  }

  [data-truncate-variant='default'] {
    & [data-truncate-marker] {
      background-color: var(--truncate-internal-marker-background-color);
    }
    & [data-truncate-marker]::after,
    & [data-truncate-marker]::before {
      content: '';
      position: absolute;
      width: calc(
        var(--truncate-internal-marker-fade-width) +
          var(--truncate-internal-marker-gap)
      );
      height: var(--truncate-internal-single-line-height);
      background: linear-gradient(
        var(--truncate-internal-fade-dir),
        var(--truncate-internal-marker-background-color) 0%,
        var(--truncate-internal-marker-background-color)
          var(--truncate-internal-marker-gap),
        transparent 100%
      );
    }
    & [data-truncate-marker]::after {
      --truncate-internal-fade-dir: to right;
      right: calc(
        -1 *
          (
            var(--truncate-internal-marker-fade-width) +
              var(--truncate-internal-marker-gap)
          )
      );
    }
    & [data-truncate-marker]::before {
      --truncate-internal-fade-dir: to left;
      left: calc(
        -1 *
          (
            var(--truncate-internal-marker-fade-width) +
              var(--truncate-internal-marker-gap)
          )
      );
    }
  }

  [data-truncate-variant='fade'] {
    & [data-truncate-marker] {
      background: transparent;
    }
  }

  [data-truncate-fade] {
    box-shadow:
      0 0 calc(var(--truncate-internal-fade-marker-width) / 2)
        var(--truncate-internal-fade-marker-color),
      0 0 var(--truncate-internal-fade-marker-width)
        var(--truncate-internal-fade-marker-color);
    width: calc(var(--truncate-internal-fade-marker-width) * 2);
    height: calc(
      var(--truncate-internal-single-line-height) -
        (var(--truncate-internal-fade-marker-width) * 2)
    );
    margin: var(--truncate-internal-fade-marker-width) 0;
  }

  [data-truncate-group-container='middle'] {
    & [data-truncate-container] {
      --truncate-marker-opacity: var(--truncate-internal-middle-marker-opacity);
    }

    display: flex;
    min-width: 0;

    & > div {
      min-width: 0;
    }

    & > div[data-truncate-segment-priority='1'] {
      flex: 0 1 max-content;
    }
    & > div[data-truncate-segment-priority='2'] {
      flex: 0 999999 max-content;
    }
  }
}
`,jr=`@layer base, unsafe;`;function Mr(e){return`${jr}
@layer base {
  ${e}
}`}function Nr(e){return`${jr}
@layer unsafe {
  ${e}
}`}var Pr=new WeakMap;function Fr(e){let t=Pr.get(e);if(t!=null)return t;let n=document.createElement(`div`);n.setAttribute(k,`true`);let r=document.createElement(`div`);r.style.position=`relative`,r.style.height=`200%`,n.appendChild(r),e.appendChild(n);let i=Math.max(n.offsetWidth-n.clientWidth,0);return n.remove(),Pr.set(e,i),i}function Ir(e,t){if(!e.isConnected)return;let n=Fr(t);if(n==null)return;let r=t.querySelector(`style[${A}]`),i=r instanceof HTMLStyleElement?r:document.createElement(`style`);r instanceof HTMLStyleElement||(i.setAttribute(A,``),t.appendChild(i)),i.textContent=`:host { ${ie}: ${n}px; }`}var Lr;function Rr(e){if(typeof CSSStyleSheet<`u`&&typeof CSSStyleSheet.prototype.replaceSync==`function`&&`adoptedStyleSheets`in e){Lr??(Lr=new CSSStyleSheet,Lr.replaceSync(Mr(Ar)));let t=!1;try{e.adoptedStyleSheets=[Lr],t=!0}catch{}if(t){e.querySelector(`style[${D}]`)?.remove();return}}if(e.querySelector(`style[data-file-tree-style]`)==null){let t=document.createElement(`style`);t.setAttribute(D,``),t.textContent=Mr(Ar),e.prepend(t)}}function zr(e,t){Br(e,t),Rr(t),Ir(e,t)}function Br(e,t){let n=e.querySelector(`template[shadowrootmode="open"], template[data-file-tree-shadowrootmode="open"]`);n instanceof HTMLTemplateElement&&(t.childNodes.length>0||(t.appendChild(n.content.cloneNode(!0)),n.hasAttribute(`shadowrootmode`)&&n.remove()))}if(typeof HTMLElement<`u`&&customElements.get(`file-tree-container`)==null){class e extends HTMLElement{constructor(){super()}connectedCallback(){let e=this.shadowRoot??this.attachShadow({mode:`open`});zr(this,e)}}if(customElements.define(E,e),typeof document<`u`)for(let e of Array.from(document.querySelectorAll(E)))e instanceof HTMLElement&&zr(e,e.shadowRoot??e.attachShadow({mode:`open`}))}var Vr=e=>e.startsWith(`f::`)?e.slice(3):e;function Hr(e){let t=e.lastIndexOf(`/`);return t<0?{parentPath:``,baseName:e}:{parentPath:e.slice(0,t),baseName:e.slice(t+1)}}function Ur(e,t){return e===``?t:`${e}/${t}`}function Wr({files:e,path:t,isFolder:n,nextBasename:r}){let i=Vr(t),a=r.trim();if(a.length===0)return{error:`Name cannot be empty.`};if(a.includes(`/`))return{error:`Name cannot include "/".`};let{parentPath:o,baseName:s}=Hr(i);if(a===s)return{nextFiles:e,sourcePath:i,destinationPath:i,isFolder:n};let c=Ur(o,a),l=Array(e.length),u=new Set;if(!n){let t=`${c}/`,r=!1;for(let n=0;n<e.length;n++){let a=e[n];if(a!==i&&a.startsWith(t))return{error:`"${c}" already exists.`};let o=a===i?c:a;if(u.has(o))return{error:`"${c}" already exists.`};u.add(o),l[n]=o,a===i&&(r=!0)}return r?{nextFiles:l,sourcePath:i,destinationPath:c,isFolder:n}:{error:`Could not find the selected file to rename.`}}let d=`${i}/`,f=`${c}/`,p=0;for(let t=0;t<e.length;t++){let n=e[t],r=n===i||n.startsWith(d);if(!r&&(n===c||n.startsWith(f)))return{error:`"${c}" already exists.`};let a=r?`${c}${n.slice(i.length)}`:n;if(u.has(a))return{error:`"${c}" already exists.`};u.add(a),l[t]=a,r&&p++}return p===0?{error:`Could not find the selected folder to rename.`}:{nextFiles:l,sourcePath:i,destinationPath:c,isFolder:n}}function Gr(e){return e.endsWith(`/`)}function Kr(e){let t=e.endsWith(`/`)?e.slice(0,-1):e,n=t.lastIndexOf(`/`),r=n<0?t:t.slice(n+1);return e.endsWith(`/`)?`${r}/`:r}function qr(e){let t=[],n=new Set;for(let r of e)n.has(r)||(n.add(r),t.push(r));let r=new Set;for(let e of t.toSorted((e,t)=>e.length===t.length?e.localeCompare(t):e.length-t.length)){let t=(e.endsWith(`/`)?e.slice(0,-1):e).split(`/`),n=!1;for(let e=0;e<t.length-1;e+=1){let i=`${t.slice(0,e+1).join(`/`)}/`;if(r.has(i)){n=!0;break}}n||r.add(e)}return t.filter(e=>r.has(e))}function Jr(e,t){return t.includes(e)?qr(t):[e]}function Yr(e,t){return e===t?!0:e==null||t==null?!1:e.kind===t.kind&&e.directoryPath===t.directoryPath&&e.flattenedSegmentPath===t.flattenedSegmentPath&&e.hoveredPath===t.hoveredPath}function Xr(e,t){return{draggedPaths:e,target:t}}function Zr(e,t){if(t.kind!==`directory`||t.directoryPath==null)return!1;for(let n of e)if(Gr(n)&&(t.directoryPath===n||t.directoryPath.startsWith(n)))return!0;return!1}function Qr(e,t){return t.kind===`root`||t.directoryPath==null?Kr(e):t.directoryPath}function $r(e,t){let n=e.map(e=>{let n=Qr(e,t);return n===e?null:{from:e,to:n,type:`move`}}).filter(e=>e!=null);return n.length===0?null:{operations:n,result:{draggedPaths:e,operation:n.length===1?`move`:`batch`,target:t}}}var ei=Symbol(`FILE_TREE_RENAME_VIEW`);function ti(e){return e.operation===`add`||e.operation===`remove`||e.operation===`move`||e.operation===`batch`}var ni=512,ri=512;function ii(e,t){if(e.size!==t.length)return!1;for(let n of t)if(!e.has(n))return!1;return!0}function ai(e){let t=e.endsWith(`/`)?e.slice(0,-1):e;if(t.length===0)return[];let n=t.split(`/`);return n.slice(0,-1).map((e,t)=>`${n.slice(0,t+1).join(`/`)}/`)}function oi(e){return ai(e).at(-1)??null}function si(e,t){return t==null?e:e.startsWith(t)?e.slice(t.length):e}var ci=e=>{let t=e.trim();return t.length===0?``:(t.includes(`\\`)?t.replaceAll(`\\`,`/`):t).toLowerCase()},li=e=>e.toLowerCase();function ui(e){return e.endsWith(`/`)}function di(e){let t=e.endsWith(`/`)?e.slice(0,-1):e,n=t.lastIndexOf(`/`);return n<0?t:t.slice(n+1)}function fi(e){return e.endsWith(`/`)?e.slice(0,-1):e}function pi(e,t){return t&&!e.endsWith(`/`)?`${e}/`:e}function mi(e,t,n){if(e===t)return n;let r=t.endsWith(`/`)?t:`${t}/`;return e.startsWith(r)?`${n.endsWith(`/`)?n:`${n}/`}${e.slice(r.length)}`:e}function hi(e,t){if(e===t)return!0;let n=t.endsWith(`/`)?t:`${t}/`;return e.startsWith(n)}function gi(e,t,n=!1){if(e==null)return null;switch(t.operation){case`add`:case`expand`:case`collapse`:case`mark-directory-unloaded`:case`begin-child-load`:case`apply-child-patch`:case`complete-child-load`:case`fail-child-load`:case`cleanup`:return e;case`remove`:return hi(e,t.path)?n?e:null:e;case`move`:return mi(e,t.from,t.to);case`batch`:{let r=e;for(let e of t.events)if(r=gi(r,e,n),r==null)return null;return r}}}function _i(e){return{canonicalChanged:e.canonicalChanged,projectionChanged:e.projectionChanged,visibleCountDelta:e.visibleCountDelta}}function vi(e,t){if(e===t)return!0;if(e.length!==t.length)return!1;for(let n=0;n<e.length;n+=1)if(e[n]!==t[n])return!1;return!0}function yi(e,t,n){let{paths:r,preparedInput:i}=e;if(i==null){if(r==null)throw Error(`FileTree requires paths or preparedInput`);return{paths:r,preparedInput:void 0}}let a=i.paths;if(r==null)return{paths:a,preparedInput:i};if(!vi(Tr.preparePaths(r,n==null?{}:{sort:n}),a))throw Error(`FileTree ${t} received paths and preparedInput for different path lists`);return{paths:a,preparedInput:i}}function bi(e){switch(e.operation){case`add`:return{..._i(e),operation:`add`,path:e.path};case`remove`:return{..._i(e),operation:`remove`,path:e.path,recursive:e.recursive};case`move`:return{..._i(e),from:e.from,operation:`move`,to:e.to}}}function xi(e){return{..._i(e),events:e.events.filter(e=>e.operation===`add`||e.operation===`remove`||e.operation===`move`).map(e=>bi(e)),operation:`batch`}}function Si(e){switch(e.operation){case`add`:case`remove`:case`move`:return bi(e);case`batch`:return xi(e);default:return null}}function Ci(e,t,n){if(e===0)return-1;if(n!=null){let e=t(n);if(e!=null)return e;let r=ai(n);for(let e=r.length-1;e>=0;--e){let n=r[e];if(n==null)continue;let i=t(n);if(i!=null)return i}}return 0}function wi(e,t,n){if(e.paths.length===0)return{focusedIndex:-1,getParentIndex:e.getParentIndex,paths:e.paths,posInSetByIndex:e.posInSetByIndex,setSizeByIndex:e.setSizeByIndex};if(t==null)return{focusedIndex:0,getParentIndex:e.getParentIndex,paths:e.paths,posInSetByIndex:e.posInSetByIndex,setSizeByIndex:e.setSizeByIndex};let r=n??(t=>e.visibleIndexByPath.get(t)??null);return{focusedIndex:Ci(e.paths.length,r,t),getParentIndex:e.getParentIndex,paths:e.paths,posInSetByIndex:e.posInSetByIndex,setSizeByIndex:e.setSizeByIndex}}var Ti=class{#e;#t=new Set;#n=new Map;#r=null;#i=null;#a=new Map;#o=new Map;#s=-1;#c=null;#l=!1;#u=e=>-1;#d=new Map;#f=null;#p=null;#m=null;#h=null;#g=null;#_;#v;#y;#b=[];#x=new Int32Array;#S=new Int32Array;#C=void 0;#w=!1;#T=null;#E=``;#D=!1;#O=new Set;#k=[];#A;#j=null;#M=null;#N=null;#P=null;#F=null;#I=null;#L=null;#R=new Set;#z=0;#B;#V=0;#H=!1;#U=0;#W;constructor(e){let{dragAndDrop:t,fileTreeSearchMode:n,initialSearchQuery:r,initialSelectedPaths:i,renaming:a,onSearchChange:o,paths:s,preparedInput:c,...l}=e,u=yi({paths:s,preparedInput:c},`constructor`,l.sort);this.#e=l,t!=null&&t!==!1&&(this.#r=t===!0?{}:t),this.#w=a!=null&&a!==!1,a!=null&&a!==!1&&a!==!0&&(this.#C=a.canRename,this.#v=a.onError,this.#_=a.onRename),this.#y=o,this.#A=n??`hide-non-matches`,this.#B=this.#se(u.paths,u.preparedInput);let d=i?.map(e=>this.#Ae(e)).filter(e=>e!=null)??[],f=d.at(-1)??null;d.length>0&&(this.#R=new Set(d),this.#L=f,this.#z=1),this.#Oe(f,!1),r!=null&&this.#Se(r,!1),this.#W=this.#Fe()}destroy(){this.#W?.(),this.#W=null,this.#n.clear(),this.#t.clear(),this.#d.clear(),this.#i=null,this.#pe()}focusFirstItem(){this.#ve().length>0&&this.#Me(0)}focusLastItem(){this.#U<=0||(this.#Ne(),this.#Me(this.#U-1))}focusNextItem(){this.#De(1)}focusParentItem(){if(this.#c==null)return;let e=oi(this.#c);if(e==null)return;let t=this.#Y(e);t>=0&&this.#Me(t)}focusPath(e){let t=this.#B.getPathInfo(e)?.path??null;if(t==null)return;this.#Ne();let n=this.#Y(t);n>=0&&this.#Me(n)}focusNearestPath(e){let t=this.resolveNearestVisiblePath(e);if(t==null)return null;let n=this.#Y(t);return n>=0?(this.#Me(n),this.#ve()[n]??t):null}focusPreviousItem(){this.#De(-1)}getFocusedIndex(){return this.#s}getFocusedItem(){return this.#c==null?null:this.#X(this.#c)}getFocusedPath(){return this.#c}resolveNearestVisiblePath(e){let t=this.#ve();if(this.#U===0)return null;if(e==null)return this.#c??t[0]??null;let n=this.#B.getPathInfo(e)?.path??e,r=this.#Y(n);return r>=0?t[r]??n:this.#J(n)??this.#c??t[0]??null}getSelectedPaths(){return[...this.#R]}getSelectionVersion(){return this.#z}getVisibleCount(){return this.#U}getVisibleRows(e,t){if(t<e||this.#U===0)return[];let n=Math.max(0,e),r=Math.min(this.#U-1,t);if(r<n)return[];let i=r-n+1;if(this.#F==null&&!this.#l&&r>=this.#b.length&&i<=ri){let e=[];for(let t=n;t<=r;t+=1){let n=this.#B.getVisibleRowContext(t);if(n==null)break;e.push(this.#Q(n))}return e}if(!this.#l&&r>=this.#b.length&&this.#Ne(),this.#F!=null){let e=Array.from({length:r-n+1},(e,t)=>this.#ye(n+t)),t=new Map,i=e[0]??-1,a=i;for(let n=1;n<=e.length;n+=1){let r=e[n];if(r!=null&&r===a+1){a=r;continue}if(i>=0&&this.#B.getVisibleSlice(i,a).forEach((e,n)=>{t.set(i+n,e)}),r==null){i=-1,a=-1;continue}i=r,a=r}return Array.from({length:r-n+1},(e,r)=>{let i=n+r,a=this.#ye(i),o=t.get(a),s=this.#b[a];if(o==null||s==null)throw Error(`Missing projection row for filtered visible index ${String(i)}`);return this.#Z(o,i,a,{ancestorPaths:this.#te(a),path:s})})}return this.#B.getVisibleSlice(n,r).map((e,t)=>{let r=n+t,i=this.#b[r];if(i==null)throw Error(`Missing projection path for visible index ${String(r)}`);return this.#Z(e,r,r,{ancestorPaths:this.#te(r),path:i})})}getStickyRowCandidates(e,t){if(this.#F!=null)return null;if(this.#U===0||e<=0||t<=0)return[];let n=[];for(let r=0;r<this.#U;r+=1){let i=e+r*t,a=Math.min(this.#U-1,Math.floor(i/t)),o=this.#$(a,r)??(a>0?this.#$(a-1,r):void 0);if(o==null)break;n.push({row:this.#Q(o),subtreeEndIndex:o.subtreeEndIndex})}return n}getItem(e){let t=this.#B.getPathInfo(e);return t==null?null:this.#X(t.path,t)}selectAllVisiblePaths(){this.#Ne();let e=[...this.#ve()];this.#re(e,this.#c??this.#L)}selectOnlyPath(e){let t=this.#Ae(e);t!=null&&this.#re([t],t)}selectPath(e){let t=this.#Ae(e);t==null||this.#R.has(t)||this.#re([...this.#R,t])}deselectPath(e){let t=this.#Ae(e);t==null||!this.#R.has(t)||this.#re([...this.#R].filter(e=>e!==t))}toggleFocusedSelection(){this.#c!=null&&this.togglePathSelectionFromInput(this.#c)}togglePathSelection(e){let t=this.#Ae(e);if(t!=null){if(this.#R.has(t)){this.deselectPath(t);return}this.selectPath(t)}}togglePathSelectionFromInput(e){let t=this.#Ae(e);if(t!=null){if(this.#R.has(t)){this.#re([...this.#R].filter(e=>e!==t),t);return}this.#re([...this.#R,t],t)}}selectPathRange(e,t){let n=this.#Ae(e);if(n==null)return;this.#Ne();let r=this.#L,i=r==null?-1:this.#be(r),a=this.#be(n);if(i===-1||a===-1){let e=t?[...this.#R,n]:[n];this.#re(e,n);return}let[o,s]=i<=a?[i,a]:[a,i],c=this.#ve().slice(o,s+1),l=t?[...this.#R,...c]:c;this.#re(l,r)}extendSelectionFromFocused(e){if(this.#c==null)return;let t=this.#s;if(t===-1)return;let n=Math.min(this.#U-1,Math.max(0,t+e));if(n===t)return;!this.#l&&n>=this.#b.length&&this.#Ne();let r=this.#ve(),i=r[t]??null,a=r[n]??null;if(i==null||a==null)return;let o=new Set(this.#R);o.has(i)&&o.has(a)?o.delete(i):o.add(a),this.#re([...o],this.#L??i,!1),this.#Me(n)}getDragAndDropConfig(){return this.#r}isDragAndDropEnabled(){return this.#r!=null}getDragSession(){return this.#i==null?null:{draggedPaths:[...this.#i.draggedPaths],primaryPath:this.#i.primaryPath,target:this.#i.target==null?null:{...this.#i.target}}}startDrag(e){if(this.#r==null)return!1;let t=this.#Ae(e);if(t==null||this.#M!=null&&this.#M.length>0)return!1;let n=this.getSelectedPaths(),r=Jr(t,n);return this.#r.canDrag?.(r)===!1?!1:(n.includes(t)||this.#re([t],t,!1),this.#je(t),this.#i={draggedPaths:r,primaryPath:t,target:null},this.#we(),!0)}setDragTarget(e){let t=this.#i;if(t==null)return;let n=e;if(n!=null){let e=Xr(t.draggedPaths,n);(Zr(t.draggedPaths,n)||this.#r?.canDrop?.(e)===!1)&&(n=null)}Yr(t.target,n)||(this.#i={...t,target:n},this.#we())}cancelDrag(){this.#i!=null&&(this.#i=null,this.#we())}completeDrag(){let e=this.#i;if(e==null)return!1;this.#i=null;let t=e.target==null?null:{...e.target};if(t==null)return this.#we(),!1;let n=Xr(e.draggedPaths,t);if(Zr(e.draggedPaths,t)||this.#r?.canDrop?.(n)===!1)return this.#we(),!1;let r=$r(e.draggedPaths,t);if(r==null)return this.#we(),!1;try{if(r.operations.length===1){let e=r.operations[0];if(e==null||e.type!==`move`)throw Error(`Expected a single move operation for one-item drops`);this.#B.move(e.from,e.to,{collision:e.collision})}else this.#oe(r.operations),this.#B.batch(r.operations)}catch(e){return this.#we(),this.#r?.onDropError?.(e instanceof Error?e.message:String(e),n),!1}return this.#r?.onDropComplete?.(r.result),!0}subscribe(e){return this.#t.add(e),e(),()=>{this.#t.delete(e)}}add(e){this.#B.add(e)}remove(e,t={}){this.#B.remove(e,t)}move(e,t,n={}){this.#B.move(e,t,n)}batch(e){this.#B.batch(e)}onMutation(e,t){let n=e,r=t,i=this.#n.get(n);return i??(i=new Set,this.#n.set(n,i)),i.add(r),()=>{let e=this.#n.get(n);e?.delete(r),e?.size===0&&this.#n.delete(n)}}setSearch(e){this.#Se(e,!0)}openSearch(e=``){this.#Se(e,!0)}closeSearch(){this.#Se(null,!0)}isSearchOpen(){return this.#M!==null}getSearchValue(){return this.#M??``}getSearchMatchingPaths(){return this.#k}focusNextSearchMatch(){this.#xe(1)}focusPreviousSearchMatch(){this.#xe(-1)}startRenaming(e=this.#c??``,t={}){if(!this.#w)return!1;let n=this.#B.getPathInfo(e);if(n==null)return!1;let r=n.path,i=ui(r),a=fi(r);if(this.#C?.({isFolder:i,path:a})===!1)return!1;for(let e of ai(r))this.#B.isExpanded(e)||this.#B.expand(e);return this.#re([r],r,!1),this.#M!=null&&(this.#Se(null,!1),this.#y?.(this.#M)),this.#je(r),this.#T=r,this.#E=di(r),this.#D=t.removeIfCanceled??!1,this.#we(),!0}[ei](){return{cancel:()=>{this.#G()},commit:()=>{this.#K()},getPath:()=>this.#T,getValue:()=>this.#E,isActive:()=>this.#T!=null,setValue:e=>{this.#q(e)}}}#G(){if(this.#T==null)return;let e=this.#T,t=this.#D;if(this.#T=null,this.#E=``,this.#D=!1,t){this.remove(e,ui(e)?{recursive:!0}:void 0);return}this.#je(e),this.#we()}#K(){let e=this.#T;if(e==null)return;if(this.#D&&this.#E.trim().length===0){this.#T=null,this.#E=``,this.#D=!1,this.remove(e,ui(e)?{recursive:!0}:void 0);return}let t=ui(e),n=Wr({files:this.#B.list(),isFolder:t,nextBasename:this.#E,path:fi(e)});if(this.#T=null,this.#E=``,this.#D=!1,`error`in n){this.#je(e),this.#v?.(n.error),this.#we();return}if(n.sourcePath===n.destinationPath){this.#je(e),this.#we();return}this.#_?.({destinationPath:n.destinationPath,isFolder:n.isFolder,sourcePath:n.sourcePath}),this.move(pi(n.sourcePath,t),pi(n.destinationPath,t))}#q(e){this.#T==null||this.#E===e||(this.#E=e,this.#we())}resetPaths(e,t={}){let n=this.#B.list().length,r=this.#U,i=yi({paths:e,preparedInput:t.preparedInput},`resetPaths`,this.#e.sort),a=this.#se(i.paths,i.preparedInput,t.initialExpandedPaths),o=this.#c,s=this.#T,c=this.getSelectedPaths(),l=this.#L;this.#W?.(),this.#B=a,this.#d.clear(),this.#pe();let u=c.map(e=>a.getPathInfo(e)?.path??null).filter(e=>e!=null),d=!ii(this.#R,u);this.#R=new Set(u),d&&(this.#z+=1),this.#L=l==null?null:a.getPathInfo(l)?.path??null,this.#T=s==null?null:a.getPathInfo(s)?.path??null,this.#T??(this.#E=``,this.#D=!1),this.#Oe(o,o!=null||u.length>0||this.#L!=null),this.#W=this.#Fe(),this.#we(),this.#Te({canonicalChanged:!0,operation:`reset`,pathCountAfter:i.paths.length,pathCountBefore:n,projectionChanged:!0,usedPreparedInput:t.preparedInput!=null,visibleCountDelta:this.#U-r})}#J(e){this.#Ne();let t=oi(e),n=si(e,t),r=null,i=null;for(let e of this.#ve()){if(oi(e)!==t)continue;let a=si(e,t);if(a<n){r=e;continue}if(a>n){i=e;break}}return r??i}#Y(e){let t=this.#be(e);if(t!==-1)return t;let n=ai(e);for(let e=n.length-1;e>=0;--e){let t=n[e];if(t==null)continue;let r=this.#be(t);if(r!==-1)return r}return this.#ve().length>0?0:-1}#X(e,t){let n=this.#d.get(e);if(n!=null)return n;let r=t??this.#B.getPathInfo(e);if(r==null)return null;let i=r.kind===`directory`?this.#ie(r.path):this.#ae(r.path);return this.#d.set(r.path,i),i}#Z(e,t,n,r){return{ancestorPaths:r.ancestorPaths,depth:e.depth,flattenedSegments:e.flattenedSegments?.map(e=>({isTerminal:e.isTerminal,name:e.name,path:e.path})),hasChildren:e.hasChildren,index:t,isExpanded:e.isExpanded,isFlattened:e.isFlattened,isFocused:r.path===this.#c,isSelected:this.#R.has(r.path),kind:e.kind,level:e.depth,name:e.name,path:r.path,posInSet:r.posInSet??this.#x[n]??0,setSize:r.setSize??this.#S[n]??0}}#Q(e){return this.#Z(e.row,e.index,e.index,{ancestorPaths:e.ancestorPaths,path:e.row.path,posInSet:e.posInSet,setSize:e.setSize})}#$(e,t){let n=this.#B.getVisibleRowContext(e);return n==null?void 0:n.ancestorRows[t]??(t===n.ancestorRows.length&&n.row.kind===`directory`&&n.row.isExpanded?n:void 0)}#ee(e){let t=this.#a.get(e);if(t!=null)return t;let n=this.#u(e),r=n<0?[]:[...this.#ee(n),n];return this.#a.set(e,r),r}#te(e){let t=this.#o.get(e);if(t!=null)return t;let n=this.#ee(e).map(e=>this.#b[e]??``).filter(e=>e!==``);return this.#o.set(e,n),n}#ne(e){this.#B.collapse(e)}#re(e,t=this.#L,n=!0){let r=[...new Set(e)],i=!ii(this.#R,r),a=this.#L!==t;!i&&!a||(this.#R=new Set(r),this.#L=t,i&&(this.#z+=1),n&&this.#we())}#ie(e){return{collapse:()=>{this.#ne(e)},deselect:()=>{this.deselectPath(e)},expand:()=>{this.#Ee(e)},focus:()=>{this.focusPath(e)},getPath:()=>e,isDirectory:()=>!0,isExpanded:()=>this.#B.isExpanded(e),isFocused:()=>this.#c===e,isSelected:()=>this.#R.has(e),select:()=>{this.selectPath(e)},toggleSelect:()=>{this.togglePathSelection(e)},toggle:()=>{this.#Ie(e)}}}#ae(e){return{deselect:()=>{this.deselectPath(e)},focus:()=>{this.focusPath(e)},getPath:()=>e,isDirectory:()=>!1,isFocused:()=>this.#c===e,isSelected:()=>this.#R.has(e),select:()=>{this.selectPath(e)},toggleSelect:()=>{this.togglePathSelection(e)}}}#oe(e){let t=this.#B.list();this.#se(t).batch(e)}#se(e,t,n){return new Tr({...this.#e,paths:e,preparedInput:t??void 0,...n===void 0?{}:{initialExpandedPaths:n}})}#ce(){return this.#h??=this.#B.list(),this.#h}#le(){if(this.#m!=null)return this.#m;let e=new Set;for(let t of this.#ce()){e.add(t);for(let n of ai(t))e.add(n)}return this.#m=[...e].sort(),this.#m}#ue(){return this.#g??=this.#ce().map(li),this.#g}#de(){return this.#f??=this.#le().filter(e=>e.endsWith(`/`)),this.#f}#fe(){return this.#p??=this.#de().map(li),this.#p}#pe(){this.#f=null,this.#p=null,this.#m=null,this.#h=null,this.#g=null}#me(){return this.#de().filter(e=>this.#B.isExpanded(e))}#he(e){let t=new Set(this.#j??[]);if(e)for(let e of this.#R)for(let n of ai(e))t.add(n);this.#ge(t)}#ge(e){this.#H=!0;try{for(let t of this.#de()){let n=e.has(t),r=this.#B.isExpanded(t);n&&!r?this.#B.expand(t):!n&&r&&this.#B.collapse(t)}}finally{this.#H=!1}}#_e(){let e=this.#b;if(this.#k=e.filter(e=>this.#O.has(e)),this.#M==null||this.#M.length===0||this.#A!==`hide-non-matches`||this.#O.size===0){this.#F=null,this.#I=null,this.#P=null,this.#U=this.#V;return}let t=[],n=[],r=new Map;for(let[i,a]of e.entries())this.#N?.has(a)===!0&&(r.set(a,n.length),t.push(i),n.push(a));this.#F=t,this.#I=n,this.#P=r,this.#U=n.length}#ve(){return this.#I??this.#b}#ye(e){return this.#F?.[e]??e}#be(e){return this.#P?.get(e)??this.#B.getVisibleIndex(e)??-1}#xe(e){let t=this.#k;if(t.length===0)return;let n=this.#c,r=n==null?-1:t.indexOf(n),i=t[r<0?e>0?0:t.length-1:Math.min(t.length-1,Math.max(0,r+e))];i!=null&&this.focusPath(i)}#Se(e,t){let n=e==null?null:ci(e),r=this.#M;if(r!==n){if(r==null&&n!=null&&(this.#j=this.#me()),this.#M=n,n==null)this.#he(!0),this.#j=null,this.#O.clear(),this.#N=null,this.#Oe(this.#c,!0);else if(n.length===0)this.#he(!1),this.#O.clear(),this.#N=null,this.#Oe(this.#c,!0);else{let e=this.#Ce();this.#Oe(e,!0)}t&&(this.#y?.(this.#M),this.#we())}}#Ce(){if(this.#M==null||this.#M.length===0)return this.#O.clear(),this.#c;let e=this.#M,t=this.#ce(),n=this.#ue(),r=[],i=new Set,a=null;for(let o=0;o<t.length;o+=1){if(!n[o].includes(e))continue;let s=t[o];r.push(s),i.add(s),a??=s}let o=this.#de(),s=this.#fe();for(let t=0;t<o.length;t+=1){if(!s[t].includes(e))continue;let n=o[t];i.has(n)||(r.push(n),i.add(n),a??=n)}this.#O=i;let c=this.#A===`hide-non-matches`&&r.length>0?new Set:null;this.#N=c;let l=this.#A===`expand-matches`?new Set(this.#j??[]):new Set;for(let e of r){c?.add(e),e.endsWith(`/`)&&l.add(e);for(let t of ai(e))l.add(t),c?.add(t)}return this.#ge(l),a??this.#c}#we(){for(let e of this.#t)e()}#Te(e){this.#n.get(e.operation)?.forEach(t=>{t(e)}),this.#n.get(`*`)?.forEach(t=>{t(e)})}#Ee(e){for(let t of ai(e))this.#B.isExpanded(t)||this.#B.expand(t);this.#B.isExpanded(e)||this.#B.expand(e)}#De(e){let t=this.#U;if(t===0)return;let n=this.#s===-1?0:this.#s,r=Math.min(t-1,Math.max(0,n+e));(r!==n||this.#s===-1)&&(!this.#l&&this.#F==null&&r>=this.#b.length&&this.#Ne(),this.#Me(r))}#Oe(e,t=!0){let n=this.#B.getVisibleCount();this.#V=n;let r=wi(this.#B.getVisibleTreeProjectionData(t?void 0:Math.min(n,ni)),e,t?e=>this.#B.getVisibleIndex(e):void 0);this.#a.clear(),this.#o.clear(),this.#l=r.paths.length>=n,this.#u=r.getParentIndex,this.#b=r.paths,this.#x=r.posInSetByIndex,this.#S=r.setSizeByIndex,this.#_e(),this.#s=e==null?this.#ve().length>0?0:-1:this.#Y(e),this.#c=this.#s<0?null:this.#ke(this.#s)}#ke(e){return this.#ve()[e]??(this.#F==null?this.#B.getVisibleRowContext(e)?.row.path??null:null)}#Ae(e){return this.#B.getPathInfo(e)?.path??null}#je(e){if(e==null)return;let t=this.#Y(e);t>=0&&this.#Me(t,!1)}#Me(e,t=!0){let n=this.#ke(e);n!=null&&(this.#s===e&&this.#c===n||(this.#s=e,this.#c=n,t&&this.#we()))}#Ne(){this.#l||this.#Oe(this.#c,!0)}#Pe(e){let t=gi(this.#T,e);t==null&&this.#T!=null&&(this.#E=``),this.#T=t;let n=gi(this.#c,e,!0),r=[...this.#R].map(t=>gi(t,e)).filter(e=>e!=null).map(e=>this.#B.getPathInfo(e)?.path??null).filter(e=>e!=null),i=gi(this.#L,e),a=i==null?null:this.#B.getPathInfo(i)?.path??null,o=[...new Set(r)];return ii(this.#R,o)||(this.#R=new Set(o),this.#z+=1),this.#L=a,n}#Fe(){return this.#B.on(`*`,e=>{if(this.#H)return;e.canonicalChanged&&(this.#d.clear(),this.#pe()),this.#i!=null&&ti(e)&&(this.#i=null);let t=ti(e)?this.#Pe(e):this.#c,n=this.#M!=null&&this.#M.length>0?this.#Ce():this.#M===``?this.#c:t,r=this.#M!=null||e.operation!==`expand`&&e.operation!==`collapse`;this.#Oe(n,r),this.#we();let i=Si(e);i!=null&&this.#Te(i)})}#Ie(e){if(this.#B.isExpanded(e)){this.#ne(e);return}this.#Ee(e)}},Ei=e=>{if(e==null||e.length===0)return`0`;let t=`${e.length}`;for(let n of e)t+=`\0${n.path}\0${n.status}`;return t};function Di(e){let t=e.endsWith(`/`),n=``,r=-1;for(let t=0;t<=e.length;t+=1){if(!(e[t]===`/`||t===e.length)){r===-1&&(r=t);continue}r!==-1&&(n!==``&&(n+=`/`),n+=e.slice(r,t),r=-1)}return n===``?null:{isDirectory:t,path:n}}function Oi(e){let t=e.endsWith(`/`)?e.slice(0,-1):e;if(t.length===0)return[];let n=t.split(`/`);return n.slice(0,-1).map((e,t)=>`${n.slice(0,t+1).join(`/`)}/`)}function ki(e,t){return t?`${e}/`:e}function Ai(e,t=null){let n=Ei(e==null?void 0:[...e]);if(n===`0`)return null;if(t?.signature===n)return t;let r=new Map,i=new Set,a=new Set;for(let t of e??[]){let e=Di(t.path);if(e==null)continue;let n=ki(e.path,e.isDirectory);r.set(n,t.status),t.status===`ignored`&&e.isDirectory?a.add(n):e.isDirectory&&a.delete(n);for(let t of Oi(e.path))i.add(t)}return{directoriesWithChanges:i,ignoredDirectoryPaths:a,signature:n,statusByPath:r}}var q,ji,Mi,Ni,Pi,Fi,Ii,Li,Ri,zi,Bi={},Vi=[],Hi=Array.isArray,Ui=Vi.slice,Wi=Object.assign;function Gi(e){e&&e.parentNode&&e.remove()}function Ki(e,t,n){var r,i,a,o={};for(a in t)a==`key`?r=t[a]:a==`ref`&&typeof e!=`function`?i=t[a]:o[a]=t[a];return arguments.length>2&&(o.children=arguments.length>3?Ui.call(arguments,2):n),qi(e,o,r,i,null)}function qi(e,t,n,r,i){var a={type:e,props:t,key:n,ref:r,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:i??++ji,__i:-1,__u:0};return i==null&&q.vnode!=null&&q.vnode(a),a}function Ji(e){return e.children}function Yi(e,t){this.props=e,this.context=t,this.__g=0}function Xi(e,t){if(t==null)return e.__?Xi(e.__,e.__i+1):null;for(var n;t<e.__k.length;t++)if((n=e.__k[t])!=null&&n.__e!=null)return n.__e;return typeof e.type==`function`?Xi(e):null}function Zi(e){var t,n;if((e=e.__)!=null&&e.__c!=null){for(e.__e=null,t=0;t<e.__k.length;t++)if((n=e.__k[t])!=null&&n.__e!=null){e.__e=n.__e;break}return Zi(e)}}function Qi(e){(8&e.__g||!(e.__g|=8)||!Mi.push(e)||Pi++)&&Ni==q.debounceRendering||((Ni=q.debounceRendering)||queueMicrotask)($i)}function $i(){for(var e,t,n,r,i,a,o,s,c=1;Mi.length;)Mi.length>c&&Mi.sort(Fi),e=Mi.shift(),c=Mi.length,8&e.__g&&(n=void 0,i=(r=(t=e).__v).__e,a=[],o=[],(s=t.__P)&&((n=Wi({},r)).__v=r.__v+1,q.vnode&&q.vnode(n),sa(s,n,r,t.__n,s.namespaceURI,32&r.__u?[i]:null,a,i??Xi(r),!!(32&r.__u),o,s.ownerDocument),n.__v=r.__v,n.__.__k[n.__i]=n,la(a,n,o),n.__e!=i&&Zi(n)));Pi=0}function ea(e,t,n,r,i,a,o,s,c,l,u,d){var f,p,m,h,g,_,v,y=r&&r.__k||Vi,b=t.length;for(c=ta(n,t,y,c,b),f=0;f<b;f++)(m=n.__k[f])!=null&&(p=m.__i==-1?Bi:y[m.__i]||Bi,m.__i=f,_=sa(e,m,p,i,a,o,s,c,l,u,d),h=m.__e,m.ref&&p.ref!=m.ref&&(p.ref&&fa(p.ref,null,m),u.push(m.ref,m.__c||h,m)),g==null&&h!=null&&(g=h),(v=!!(4&m.__u))||p.__k===m.__k?c=na(m,c,e,v):typeof m.type==`function`&&_!==void 0?c=_:h&&(c=h.nextSibling),m.__u&=-7);return n.__e=g,c}function ta(e,t,n,r,i){var a,o,s,c,l,u=n.length,d=u,f=0;for(e.__k=Array(i),a=0;a<i;a++)(o=t[a])!=null&&typeof o!=`boolean`&&typeof o!=`function`?(c=a+f,(o=e.__k[a]=typeof o==`string`||typeof o==`number`||typeof o==`bigint`||o.constructor==String?qi(null,o,null,null,null):Hi(o)?qi(Ji,{children:o},null,null,null):o.constructor==null&&o.__b>0?qi(o.type,o.props,o.key,o.ref?o.ref:null,o.__v):o).__=e,o.__b=e.__b+1,s=null,(l=o.__i=ra(o,n,c,d))!=-1&&(d--,(s=n[l])&&(s.__u|=2)),s==null||s.__v==null?(l==-1&&(i>u?f--:i<u&&f++),typeof o.type!=`function`&&(o.__u|=4)):l!=c&&(l==c-1?f--:l==c+1?f++:(l>c?f--:f++,o.__u|=4))):e.__k[a]=null;if(d)for(a=0;a<u;a++)(s=n[a])!=null&&!(2&s.__u)&&(s.__e==r&&(r=Xi(s)),pa(s,s));return r}function na(e,t,n,r){var i,a;if(typeof e.type==`function`){for(i=e.__k,a=0;i&&a<i.length;a++)i[a]&&(i[a].__=e,t=na(i[a],t,n,r));return t}e.__e!=t&&(r&&(t&&e.type&&!t.parentNode&&(t=Xi(e)),n.insertBefore(e.__e,t||null)),t=e.__e);do t&&=t.nextSibling;while(t!=null&&t.nodeType==8);return t}function ra(e,t,n,r){var i,a,o,s=e.key,c=e.type,l=t[n],u=l!=null&&(2&l.__u)==0;if(l===null&&e.key==null||u&&s==l.key&&c==l.type)return n;if(r>(u?1:0)){for(i=n-1,a=n+1;i>=0||a<t.length;)if((l=t[o=i>=0?i--:a++])!=null&&!(2&l.__u)&&s==l.key&&c==l.type)return o}return-1}function ia(e,t,n){t[0]==`-`?e.setProperty(t,n??``):e[t]=n??``}function aa(e,t,n,r,i){var a;n:if(t==`style`)if(typeof n==`string`)e.style.cssText=n;else{if(typeof r==`string`&&(e.style.cssText=r=``),r)for(t in r)n&&t in n||ia(e.style,t,``);if(n)for(t in n)r&&n[t]==r[t]||ia(e.style,t,n[t])}else if(t[0]==`o`&&t[1]==`n`)a=t!=(t=t.replace(Ii,`$1`)),(t=t.slice(2))[0].toLowerCase()!=t[0]&&(t=t.toLowerCase()),e.__l||={},e.__l[t+a]=n,n?r?n.l=r.l:(n.l=Li,e.addEventListener(t,a?zi:Ri,a)):e.removeEventListener(t,a?zi:Ri,a);else{if(i==`http://www.w3.org/2000/svg`)t=t.replace(/xlink(H|:h)/,`h`).replace(/sName$/,`s`);else if(t!=`width`&&t!=`height`&&t!=`href`&&t!=`list`&&t!=`form`&&t!=`tabIndex`&&t!=`download`&&t!=`rowSpan`&&t!=`colSpan`&&t!=`role`&&t!=`popover`&&t in e)try{e[t]=n??``;break n}catch{}typeof n==`function`||(n==null||!1===n&&t[4]!=`-`?e.removeAttribute(t):e.setAttribute(t,t==`popover`&&n==1?``:n))}}function oa(e){return function(t){if(this.__l){var n=this.__l[t.type+e];if(t.u==null)t.u=Li++;else if(t.u<n.l)return;return n(q.event?q.event(t):t)}}}function sa(e,t,n,r,i,a,o,s,c,l,u){var d,f,p,m,h,g,_,v,y,b,x,S,C,ee,te,ne,w,re,T,E,D,O=t.type;if(t.constructor!=null)return null;128&n.__u&&(c=!!(32&n.__u),n.__c.__z&&(s=t.__e=n.__e=(a=n.__c.__z)[0],n.__c.__z=null)),(d=q.__b)&&d(t);n:if(typeof O==`function`)try{if(v=t.props,y=`prototype`in O&&O.prototype.render,b=(d=O.contextType)&&r[d.__c],x=d?b?b.props.value:d.__:r,n.__c?2&(f=t.__c=n.__c).__g&&(f.__g|=1,_=!0):(y?t.__c=f=new O(v,x):(t.__c=f=new Yi(v,x),f.constructor=O,f.render=ma),b&&b.sub(f),f.props=v,f.state||={},f.context=x,f.__n=r,p=!0,f.__g|=8,f.__h=[],f._sb=[]),y&&f.__s==null&&(f.__s=f.state),y&&O.getDerivedStateFromProps!=null&&(f.__s==f.state&&(f.__s=Wi({},f.__s)),Wi(f.__s,O.getDerivedStateFromProps(v,f.__s))),m=f.props,h=f.state,f.__v=t,p)y&&O.getDerivedStateFromProps==null&&f.componentWillMount!=null&&f.componentWillMount(),y&&f.componentDidMount!=null&&f.__h.push(f.componentDidMount);else{if(y&&O.getDerivedStateFromProps==null&&v!==m&&f.componentWillReceiveProps!=null&&f.componentWillReceiveProps(v,x),!(4&f.__g)&&f.shouldComponentUpdate!=null&&!1===f.shouldComponentUpdate(v,f.__s,x)||t.__v==n.__v){for(t.__v!=n.__v&&(f.props=v,f.state=f.__s,f.__g&=-9),t.__e=n.__e,t.__k=n.__k,t.__k.some(function(e){e&&(e.__=t)}),S=0;S<f._sb.length;S++)f.__h.push(f._sb[S]);f._sb=[],f.__h.length&&o.push(f);break n}f.componentWillUpdate!=null&&f.componentWillUpdate(v,f.__s,x),y&&f.componentDidUpdate!=null&&f.__h.push(function(){f.componentDidUpdate(m,h,g)})}if(f.context=x,f.props=v,f.__P=e,f.__g&=-5,C=q.__r,ee=0,y){for(f.state=f.__s,f.__g&=-9,C&&C(t),d=f.render(f.props,f.state,f.context),te=0;te<f._sb.length;te++)f.__h.push(f._sb[te]);f._sb=[]}else do f.__g&=-9,C&&C(t),d=f.render(f.props,f.state,f.context),f.state=f.__s;while(8&f.__g&&++ee<25);f.state=f.__s,f.getChildContext!=null&&(r=Wi({},r,f.getChildContext())),y&&!p&&f.getSnapshotBeforeUpdate!=null&&(g=f.getSnapshotBeforeUpdate(m,h)),ne=d,d!=null&&d.type===Ji&&d.key==null&&(ne=ua(d.props.children)),s=ea(e,Hi(ne)?ne:[ne],t,n,r,i,a,o,s,c,l,u),t.__u&=-161,f.__h.length&&o.push(f),_&&(f.__g&=-4)}catch(e){if(t.__v=null,c||a!=null)if(e.then){for(w=0,re=!1,t.__u|=c?160:128,t.__c.__z=[],T=0;T<a.length;T++)(E=a[T])==null||re||(E.nodeType==8&&E.data==`$s`?(w>0&&t.__c.__z.push(E),w++,a[T]=null):E.nodeType==8&&E.data==`/$s`?(--w>0&&t.__c.__z.push(E),re=w===0,s=a[T],a[T]=null):w>0&&(t.__c.__z.push(E),a[T]=null));if(!re){for(;s&&s.nodeType==8&&s.nextSibling;)s=s.nextSibling;a[a.indexOf(s)]=null,t.__c.__z=[s]}t.__e=s}else{for(D=a.length;D--;)Gi(a[D]);ca(t)}else t.__e=n.__e,t.__k=n.__k,e.then||ca(t);q.__e(e,t,n)}else s=t.__e=da(n.__e,t,n,r,i,a,o,c,l,u);return(d=q.diffed)&&d(t),128&t.__u?void 0:s}function ca(e){e&&e.__c&&(e.__c.__g|=4),e&&e.__k&&e.__k.forEach(ca)}function la(e,t,n){for(var r=0;r<n.length;r++)fa(n[r],n[++r],n[++r]);q.__c&&q.__c(t,e),e.some(function(t){try{e=t.__h,t.__h=[],e.some(function(e){e.call(t)})}catch(e){q.__e(e,t.__v)}})}function ua(e){return typeof e!=`object`||!e||e.__b&&e.__b>0?e:Hi(e)?e.map(ua):Wi({},e)}function da(e,t,n,r,i,a,o,s,c,l){var u,d,f,p,m,h,g,_,v=n.props,y=t.props,b=t.type;if(b==`svg`?i=`http://www.w3.org/2000/svg`:b==`math`?i=`http://www.w3.org/1998/Math/MathML`:i||=`http://www.w3.org/1999/xhtml`,a!=null){for(u=0;u<a.length;u++)if((m=a[u])&&`setAttribute`in m==!!b&&(b?m.localName==b:m.nodeType==3)){e=m,a[u]=null;break}}if(e==null){if(b==null)return l.createTextNode(y);e=l.createElementNS(i,b,y.is&&y),s&&=(q.__m&&q.__m(t,a),!1),a=null}if(b==null)v===y||s&&e.data==y||(e.data=y);else{if(a&&=Ui.call(e.childNodes),v=n.props||Bi,!s&&a!=null)for(v={},u=0;u<e.attributes.length;u++)v[(m=e.attributes[u]).name]=m.value;for(u in v)if(m=v[u],u!=`children`){if(u==`dangerouslySetInnerHTML`)f=m;else if(!(u in y)){if(u==`value`&&`defaultValue`in y||u==`checked`&&`defaultChecked`in y)continue;aa(e,u,null,m,i)}}for(u in _=1&n.__u,y)m=y[u],u==`children`?p=m:u==`dangerouslySetInnerHTML`?d=m:u==`value`?h=m:u==`checked`?g=m:s&&typeof m!=`function`||v[u]===m&&!_||aa(e,u,m,v[u],i);if(d)s||f&&(d.__html==f.__html||d.__html==e.innerHTML)||(e.innerHTML=d.__html),t.__k=[];else if(f&&(e.innerHTML=``),ea(b==`template`?e.content:e,Hi(p)?p:[p],t,n,r,b==`foreignObject`?`http://www.w3.org/1999/xhtml`:i,a,o,a?a[0]:n.__k&&Xi(n,0),s,c,l),a!=null)for(u=a.length;u--;)Gi(a[u]);s||(u=`value`,b==`progress`&&h==null?e.removeAttribute(`value`):h==null||h===e[u]&&(b!==`progress`||h)||aa(e,u,h,v[u],i),u=`checked`,g!=null&&g!=e[u]&&aa(e,u,g,v[u],i))}return e}function fa(e,t,n){try{if(typeof e==`function`){var r=typeof e.__u==`function`;r&&e.__u(),r&&t==null||(e.__u=e(t))}else e.current=t}catch(e){q.__e(e,n)}}function pa(e,t,n){var r,i;if(q.unmount&&q.unmount(e),(r=e.ref)&&(r.current&&r.current!=e.__e||fa(r,null,t)),(r=e.__c)!=null){if(r.componentWillUnmount)try{r.componentWillUnmount()}catch(e){q.__e(e,t)}r.__P=null}if(r=e.__k)for(i=0;i<r.length;i++)r[i]&&pa(r[i],t,n||typeof e.type!=`function`);n||Gi(e.__e),e.__e&&e.__e.__l&&(e.__e.__l=null),e.__e=e.__c=e.__=null}function ma(e,t,n){return this.constructor(e,n)}function ha(e,t){var n,r,i,a;t==document&&(t=document.documentElement),q.__&&q.__(e,t),r=(n=!!(e&&32&e.__u))?null:t.__k,e=t.__k=Ki(Ji,null,[e]),i=[],a=[],sa(t,e,r||Bi,Bi,t.namespaceURI,r?null:t.firstChild?Ui.call(t.childNodes):null,i,r?r.__e:t.firstChild,n,a,t.ownerDocument),la(i,e,a)}function ga(e,t){e.__u|=32,ha(e,t)}q={__e:function(e,t,n,r){for(var i,a,o;t=t.__;)if((i=t.__c)&&!(1&i.__g)){i.__g|=4;try{if((a=i.constructor)&&a.getDerivedStateFromError!=null&&(i.setState(a.getDerivedStateFromError(e)),o=8&i.__g),i.componentDidCatch!=null&&(i.componentDidCatch(e,r||{}),o=8&i.__g),o)return void(i.__g|=2)}catch(t){e=t}}throw Pi=0,e}},ji=0,Yi.prototype.setState=function(e,t){var n=this.__s!=null&&this.__s!=this.state?this.__s:this.__s=Wi({},this.state);typeof e==`function`&&(e=e(Wi({},n),this.props)),e&&Wi(n,e),e!=null&&this.__v&&(t&&this._sb.push(t),Qi(this))},Yi.prototype.forceUpdate=function(e){this.__v&&(this.__g|=4,e&&this.__h.push(e),Qi(this))},Yi.prototype.render=Ji,Mi=[],Pi=0,Fi=function(e,t){return e.__v.__b-t.__v.__b},Ii=/(PointerCapture)$|Capture$/i,Li=0,Ri=oa(!1),zi=oa(!0);var _a=0;Array.isArray;function J(e,t,n,r,i,a){t||={};var o,s,c=t;if(`ref`in c&&typeof e!=`function`)for(s in c={},t)s==`ref`?o=t[s]:c[s]=t[s];var l={type:e,props:c,key:n,ref:o,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:--_a,__i:-1,__u:0,__source:i,__self:a};return q.vnode&&q.vnode(l),l}var va=16,ya=16,ba={};function xa({name:e,remappedFrom:t,token:n,width:r,height:i,viewBox:a,label:o,alignCapitals:s=!1}){"use no memo";let c=`#${e.replace(/^#/,``)}`,{width:l,height:u,viewBox:d}=ba[e]??{width:va,height:ya},f=r??l,p=i??u,m=a??d??`0 0 ${l} ${u}`,h=o==null?{"aria-hidden":!0}:{"aria-label":o,role:`img`};return J(`svg`,{"data-icon-name":t??e,"data-icon-token":n,"data-align-capitals":s,...h,viewBox:m,width:f,height:p,children:J(`use`,{href:c})})}var Sa=e=>{if(e.length<2)return[e,``];let t=Math.ceil(e.length/2);return[e.slice(0,t),e.slice(t)]},Ca=e=>{if(e.length<4)return[e,``];let t=e.lastIndexOf(`.`)+1,n=e.length-t>10,r=t>=1&&!n?t:Math.ceil(e.length/2);return[e.slice(0,r),e.slice(r)]},wa=e=>{if(e.length<4)return[e,``];let t=e.lastIndexOf(`/`)+1,n=e.length-t>25,r=t>=1&&!n?t:Math.ceil(e.length/2);return[e.slice(0,r),e.slice(r)]},Ta=(e,{splitIndex:t}={})=>{if(typeof t!=`number`){let t=Math.ceil(e.length/2);return[e.slice(0,t),e.slice(t)]}return[e.slice(0,t),e.slice(t)]},Ea=(e,{splitOffset:t}={})=>{if(typeof t!=`number`||t<=0||t>=e.length){let t=Math.ceil(e.length/2);return[e.slice(0,t),e.slice(t)]}let n=e.length-t;return[e.slice(0,n),e.slice(n)]},Da=(e,{splitOffset:t}={})=>{if(typeof t!=`number`||t<=0||t>=e.length){let t=Math.ceil(e.length/2);return[e.slice(0,t),e.slice(t)]}let n=t;return[e.slice(0,n),e.slice(n)]};function Oa({children:e,marker:t,variant:n=`default`}){"use no memo";let r=n===`fade`;return J(`div`,{"aria-hidden":!0,"data-truncate-marker-cell":!0,children:J(`div`,{"data-truncate-marker":!0,children:typeof t==`function`?t({children:e}):r?J(`span`,{"data-truncate-fade":!0}):t})})}function ka(e){"use no memo";let{mode:t,children:n}=e;return J(`div`,{children:[J(`div`,{"data-truncate-content":`visible`,children:t===`fruncate`?J(`span`,{children:n}):n}),J(`div`,{"data-truncate-content":`overflow`,"aria-hidden":!0,children:t===`fruncate`?J(`span`,{children:n}):n})]})}function Aa({children:e,mode:t=`truncate`,marker:n=`…`,variant:r=`default`,...i}){"use no memo";let a=J(ka,{mode:t,children:e},`content`),o=J(Oa,{marker:n,mode:t,variant:r},`marker`),s=J(`div`,{"data-truncate-fill":!0},`fill`);return J(`div`,{"data-truncate-container":t,"data-truncate-variant":r,...i,children:J(`div`,{"data-truncate-grid":!0,children:t===`truncate`?[a,o]:[o,a,s]})})}function ja({children:e,...t}){"use no memo";return J(Aa,{mode:`truncate`,...t,children:e})}function Ma({children:e,...t}){"use no memo";return J(Aa,{mode:`fruncate`,...t,children:e})}function Na({children:e,contents:t,priority:n=`end`,split:r=`center`,minimumLength:i=12,className:a,style:o,...s}){"use no memo";let c=null,l=null;if(Array.isArray(t)){if(t.length!==2)return console.error(`MiddleTruncate: contents must be an array of two items`),null;c=J(ja,{...s,children:t[0]}),l=J(Ma,{...s,children:t[1]})}else{if(typeof e!=`string`)return console.error(`MiddleTruncate: children must be a string`),null;if(e.length===0)return J(`div`,{className:a,style:o});if(e.length<i)return J(n===`end`?Ma:ja,{...s,className:a,style:o,children:e});let t=null,u=null,d=null;if(typeof r==`string`)r===`center`?t=Sa:r===`extension`?t=Ca:r===`leaf-path`&&(t=wa);else if(typeof r==`number`)t=Ta,u=r;else if(Array.isArray(r)){let[e,n]=r;d=n,e===`last`?t=Ea:e===`first`&&(t=Da)}else typeof r==`function`&&(t=r);t??=Sa;let[f,p]=t(e,{priority:n,variant:s.variant,splitIndex:typeof u==`number`?u:void 0,splitOffset:typeof d==`number`?d:void 0}),m=f.length>=p.length,h=n===`equal`&&!m,g=n===`equal`&&m,_={},v={};h&&(_.marker=``),g&&(v.marker=``),c=J(ja,{...s,..._,children:f}),l=J(Ma,{...s,...v,children:p})}return J(`div`,{"data-truncate-group-container":`middle`,className:a,style:o,children:[J(`div`,{"data-truncate-segment-priority":n===`start`||n===`equal`?`1`:`2`,children:c}),J(`div`,{"data-truncate-segment-priority":n===`end`||n===`equal`?`1`:`2`,children:l})]})}var Pa={endIndex:-1,startIndex:-1};function Fa(e,t,n){return Math.min(Math.max(e,t),n)}function Ia(e,t){return e<0||t<e?Pa:{endIndex:t,startIndex:e}}function La(e){return e.startIndex<0||e.endIndex<e.startIndex}function Ra(e,t){return La(e)?0:(e.endIndex-e.startIndex+1)*t}function za(e,t,n){if(t<=0)return-1;let r=t*n;return e<=0?0:e>=r?t:Math.floor(e/n)}function Ba(e,t,n){return t<=0||e<=0?-1:e>=t*n?t-1:Math.ceil(e/n)-1}function Va(e){let t=new Map;return e.forEach((e,n)=>{if(e.kind!==`directory`||!e.isExpanded)return;let r=e.ancestorPaths.length,i=t.get(r);if(i==null){t.set(r,[n]);return}i.push(n)}),t}function Ha(e,t){let n=0,r=e.length-1,i=-1;for(;n<=r;){let a=Math.floor((n+r)/2),o=e[a];if(o==null)break;if(o<=t){i=a,n=a+1;continue}r=a-1}return i}function Ua(e){let t=new Map,n=[];for(let r=0;r<e.length;r+=1){let i=e[r];if(i==null)continue;let a=i.kind===`directory`&&i.isExpanded?[...i.ancestorPaths,i.path]:i.ancestorPaths,o=0;for(;o<n.length&&o<a.length&&n[o]===a[o];)o+=1;for(let e=n.length-1;e>=o;--e){let i=n[e];i!=null&&t.set(i,r-1)}n.length=o;for(let e=o;e<a.length;e+=1){let t=a[e];t!=null&&n.push(t)}}let r=e.length-1;for(let e of n)t.set(e,r);return t}function Wa(e,t,n){if(e.length===0||t<=0)return[];let r=Ua(e),i=Va(e),a=[];for(let r=0;r<e.length;r+=1){let o=i.get(r);if(o==null||o.length===0)break;let s=t+r*n,c=Ha(o,Math.min(e.length-1,Math.floor(s/n))),l=null;for(;c>=0;){let t=o[c],n=t==null?null:e[t]??null;if(n!=null&&(r===0||n.ancestorPaths[r-1]===a[r-1]?.path)){l=n;break}--c}if(l==null)break;a.push(l)}return a.map((i,a)=>{let o=a*n,s=(r.get(i.path)??e.length-1)+1;if(s>=e.length)return{row:i,top:o};let c=s*n-t;return{row:i,top:Math.min(o,c-n)}}).filter(e=>e.top+n>0)}function Ga(e,t){let n=t.totalRowCount??e.length,r=n*t.itemHeight,i=Math.max(0,t.viewportHeight),a=Math.max(0,Math.floor(t.overscan)),o=Math.max(0,r-i),s=Fa(t.scrollTop,0,o),c=t.stickyRows??Wa(e,s,t.itemHeight),l=c.reduce((e,n)=>Math.max(e,n.top+t.itemHeight),0),u=Math.min(r,s+l),d=Math.max(0,i-l),f=Math.max(0,r-u),p=za(s,n,t.itemHeight),m=za(u,n,t.itemHeight),h=l<=0||p<0||p>=n?-1:p,g=h===-1?-1:Math.min(n-1,m-1),_=h===-1||g<h?0:g-h+1,v=d<=0||m>=n?Pa:Ia(m,Ba(u+d,n,t.itemHeight)),y=g+1,b=La(v)?Pa:Ia(Math.max(y,v.startIndex-a),Math.min(n-1,v.endIndex+a)),x=Ra(b,t.itemHeight);return{occlusion:{firstOccludedIndex:h,lastOccludedIndex:g,occludedCount:_},physical:{itemHeight:t.itemHeight,maxScrollTop:o,overscan:a,scrollTop:s,totalHeight:r,totalRowCount:n,viewportHeight:i},projected:{contentHeight:f,paneHeight:d,paneTop:u},sticky:{height:l,rows:c},visible:v,window:{endIndex:b.endIndex,height:x,offsetTop:La(b)?0:b.startIndex*t.itemHeight,startIndex:b.startIndex}}}var Ka={added:`A`,deleted:`D`,ignored:null,modified:`M`,renamed:`R`,untracked:`U`},qa={added:`Git status: added`,deleted:`Git status: deleted`,ignored:`Git status: ignored`,modified:`Git status: modified`,renamed:`Git status: renamed`,untracked:`Git status: untracked`},Ja=`Contains git status items`;function Ya(e){let{renamingPath:t,previousRenamingPath:n,hasRenderedInput:r}=e;return t==null?`reset`:r?n===t?`ignore`:`focus-input`:`reveal-canonical`}function Xa(e){let{row:t,mode:n,targetPath:r,ariaLabel:i,domId:a,isParked:o,itemHeight:s,features:c,state:l,extraStyle:u}=e,d=n===`sticky`,f=t.ancestorPaths.at(-1)??``,p={};return l.isFocusRinged&&(p[`data-item-focused`]=!0),t.isSelected&&(p[`data-item-selected`]=!0),l.isContextHovered&&(p[`data-item-context-hover`]=`true`),l.isDragTarget&&(p[`data-item-drag-target`]=!0),l.isDragging&&(p[`data-item-dragging`]=!0),l.effectiveGitStatus!=null&&(p[`data-item-git-status`]=l.effectiveGitStatus),l.containsGitChange&&(p[`data-item-contains-git-change`]=`true`),{"aria-expanded":!d&&t.kind===`directory`?t.isExpanded:void 0,"aria-haspopup":c.contextMenuEnabled?`menu`:void 0,"aria-label":i,"aria-level":d?void 0:t.level+1,"aria-posinset":d?void 0:t.posInSet+1,"aria-selected":d?void 0:t.isSelected?`true`:`false`,"aria-setsize":d?void 0:t.setSize,"data-file-tree-sticky-path":d?r:void 0,"data-file-tree-sticky-row":d?`true`:void 0,"data-item-context-menu-button-visibility":c.actionLaneEnabled?c.contextMenuButtonVisibility:void 0,"data-item-context-menu-trigger-mode":c.contextMenuEnabled?c.contextMenuTriggerMode:void 0,"data-item-has-context-menu-action-lane":c.actionLaneEnabled?`true`:void 0,"data-item-has-git-lane":c.gitLaneActive?`true`:void 0,"data-item-parent-path":f.length>0?f:void 0,"data-item-parked":o?`true`:void 0,"data-item-path":r,"data-item-type":t.kind===`directory`?`folder`:`file`,"data-type":`item`,id:d?void 0:a,role:d?void 0:`treeitem`,style:{minHeight:`${s}px`,...u},tabIndex:!d&&t.isFocused?0:-1,...p}}function Za(e){let{event:t,mode:n,isSearchOpen:r,isDirectory:i}=e,a=t.ctrlKey||t.metaKey,o=t.shiftKey||a,s=t.shiftKey?{additive:a,kind:`range`}:a?{kind:`toggle`}:{kind:`single`};return{closeSearch:r,revealCanonical:n===`sticky`,selection:s,toggleDirectory:!o&&i}}function Qa(e){let{currentScrollTop:t,focusedIndex:n,itemHeight:r,topInset:i=0,viewportHeight:a}=e;if(n<0)return null;let o=Math.max(0,i),s=n*r,c=s+r;if(s<t+o){let e=Math.max(0,s-o);return e===t?null:e}if(c>t+a){let e=c-a;return e===t?null:e}return null}function $a(e){let{currentScrollTop:t,focusedIndex:n,itemHeight:r,targetViewportOffset:i,totalHeight:a,viewportHeight:o}=e;if(n<0)return null;let s=Math.max(0,i),c=n*r,l=c+r,u=t+s,d=t+o;if(c>=u&&l<=d)return null;let f=Math.max(0,a-o),p=Math.max(0,Math.min(c-s,f));return p===t?null:p}var eo,Y,to,no,ro=Object.is,io=0,ao=[],X=q,oo=X.__b,so=X.__r,co=X.diffed,lo=X.__c,uo=X.unmount,fo=X.__;function po(e,t){X.__h&&X.__h(Y,e,io||t),io=0;var n=Y.__H||={__:[],__h:[]};return e>=n.__.length&&n.__.push({}),n.__[e]}function mo(e){return io=1,ho(Eo,e)}function ho(e,t,n){var r=po(eo++,2);if(r.t=e,!r.__c&&(r.__=[n?n(t):Eo(void 0,t),function(e){var t=r.__N?r.__N[0]:r.__[0],n=r.t(t,e);ro(t,n)||(r.__N=[n,r.__[1]],r.__c.setState({}))}],r.__c=Y,!Y.__f)){var i=function(e,t,n){if(!r.__c.__H)return!0;var i=r.__c.__H.__.filter(function(e){return!!e.__c});if(i.every(function(e){return!e.__N}))return!a||a.call(this,e,t,n);var o=r.__c.props!==e;return i.forEach(function(e){if(e.__N){var t=e.__[0];e.__=e.__N,e.__N=void 0,ro(t,e.__[0])||(o=!0)}}),a&&a.call(this,e,t,n)||o};Y.__f=!0;var a=Y.shouldComponentUpdate,o=Y.componentWillUpdate;Y.componentWillUpdate=function(e,t,n){if(4&this.__g){var r=a;a=void 0,i(e,t,n),a=r}o&&o.call(this,e,t,n)},Y.shouldComponentUpdate=i}return r.__N||r.__}function go(e,t){var n=po(eo++,3);!X.__s&&To(n.__H,t)&&(n.__=e,n.u=t,Y.__H.__h.push(n))}function _o(e,t){var n=po(eo++,4);!X.__s&&To(n.__H,t)&&(n.__=e,n.u=t,Y.__h.push(n))}function Z(e){return io=5,vo(function(){return{current:e}},[])}function vo(e,t){var n=po(eo++,7);return To(n.__H,t)&&(n.__=e(),n.__H=t,n.__h=e),n.__}function yo(e,t){return io=8,vo(function(){return e},t)}function bo(){for(var e;e=ao.shift();)if(e.__P&&e.__H)try{e.__H.__h.forEach(Co),e.__H.__h.forEach(wo),e.__H.__h=[]}catch(t){e.__H.__h=[],X.__e(t,e.__v)}}X.__b=function(e){Y=null,oo&&oo(e)},X.__=function(e,t){e&&t.__k&&t.__k.__m&&(e.__m=t.__k.__m),fo&&fo(e,t)},X.__r=function(e){so&&so(e),eo=0;var t=(Y=e.__c).__H;t&&(to===Y?(t.__h=[],Y.__h=[],t.__.forEach(function(e){e.__N&&(e.__=e.__N),e.u=e.__N=void 0})):(t.__h.forEach(Co),t.__h.forEach(wo),t.__h=[],eo=0)),to=Y},X.diffed=function(e){co&&co(e);var t=e.__c;t&&t.__H&&(t.__H.__h.length&&(ao.push(t)!==1&&no===X.requestAnimationFrame||((no=X.requestAnimationFrame)||So)(bo)),t.__H.__.forEach(function(e){e.u&&(e.__H=e.u),e.u=void 0})),to=Y=null},X.__c=function(e,t){t.some(function(e){try{e.__h.forEach(Co),e.__h=e.__h.filter(function(e){return!e.__||wo(e)})}catch(n){t.some(function(e){e.__h&&=[]}),t=[],X.__e(n,e.__v)}}),lo&&lo(e,t)},X.unmount=function(e){uo&&uo(e);var t,n=e.__c;n&&n.__H&&(n.__H.__.forEach(function(e){try{Co(e)}catch(e){t=e}}),n.__H=void 0,t&&X.__e(t,n.__v))};var xo=typeof requestAnimationFrame==`function`;function So(e){var t,n=function(){clearTimeout(r),xo&&cancelAnimationFrame(t),setTimeout(e)},r=setTimeout(n,35);xo&&(t=requestAnimationFrame(n))}function Co(e){var t=Y,n=e.__c;typeof n==`function`&&(e.__c=void 0,n()),Y=t}function wo(e){var t=Y;e.__c=e.__(),Y=t}function To(e,t){return!e||e.length!==t.length||t.some(function(t,n){return!ro(t,e[n])})}function Eo(e,t){return typeof t==`function`?t(e):t}function Do(e){if(e==null||!e.isConnected||e===document.body||e===document.documentElement)return!1;e.focus({preventScroll:!0});let t=e.getRootNode();return t instanceof ShadowRoot?t.activeElement===e:document.activeElement===e}function Oo(e){let t=e.getRootNode();if(t instanceof ShadowRoot){let e=t.activeElement;return e instanceof HTMLElement?e:null}let n=document.activeElement;return n instanceof HTMLElement&&e.contains(n)?n:null}function ko({ariaLabel:e,isFlattened:t=!1,ref:n,value:r,onBlur:i,onInput:a}){return J(`input`,{ref:n,"data-item-rename-input":!0,...t?{"data-item-flattened-rename-input":!0}:{},"aria-label":e,value:r,onBlur:i,onInput:a,onClick:e=>e.stopPropagation(),onMouseDown:e=>e.stopPropagation(),onPointerDown:e=>e.stopPropagation()})}function Ao(e,t=null,n=null){"use no memo";let r=e.flattenedSegments;return r==null||r.length===0?t??e.name:J(`span`,{"data-item-flattened-subitems":!0,children:r.map((e,i)=>{let a=i===r.length-1;return J(Ji,{children:[J(`span`,{"data-item-flattened-subitem":e.path,"data-item-flattened-subitem-drag-target":n===e.path?`true`:void 0,children:a&&t!=null?t:J(ja,{children:e.name})}),i<r.length-1?` / `:``]},e.path)})})}function jo(e){return e.isFlattened?e.flattenedSegments?.findLast(e=>e.isTerminal)?.path??e.path:e.path}function Mo(e){let t=e.flattenedSegments;return t==null||t.length===0?e.name:t.map(e=>e.name).join(` / `)}function No(e,t,n,r){return e.map((e,i)=>{let a=i*n,o=e.subtreeEndIndex+1;if(o>=r)return{row:e.row,top:a};let s=o*n-t;return{row:e.row,top:Math.min(a,s-n)}}).filter(e=>e.top+n>0)}function Po(e,t,n,r,i,a){return Fo({controller:e,itemHeight:t,overscan:n,scrollTop:r,stickyFolders:i,viewportHeight:a}).snapshot.sticky.height}function Fo({controller:e,itemHeight:t,overscan:n,scrollTop:r,stickyFolders:i,viewportHeight:a}){let o=e.getVisibleCount(),s=i&&o>0?e.getStickyRowCandidates(r,t):[],c=s==null&&i&&o>0?e.getVisibleRows(0,o-1):[],l=Ga(c,{itemHeight:t,overscan:n,scrollTop:r,stickyRows:s==null?void 0:No(s,r,t,o),totalRowCount:o,viewportHeight:a}),u=i&&r<=0&&o>0?e.getStickyRowCandidates(1,t):[],d=u!=null&&r<=0?No(u,1,t,o):i&&r<=0&&c.length>0?Wa(c,1,t):l.sticky.rows;return{overlayHeight:d.reduce((e,n)=>Math.max(e,n.top+t),0),overlayRows:d,snapshot:l,visibleRows:c}}var Io=400,Lo=10,Ro=40,zo=18,Bo=`file-tree-layout-commit`;function Vo(e,t,n){let r=e,i=document.elementFromPoint?.bind(document)??null,a=r.elementFromPoint?.(t,n)??i?.(t,n)??null;return e instanceof ShadowRoot&&(a==null||!e.contains(a))?Ho(e,t,n):a instanceof HTMLElement?a:null}function Ho(e,t,n){let r=Array.from(e.querySelectorAll(`[data-type="item"], [data-item-flattened-subitem]`));for(let e=r.length-1;e>=0;e--){let i=r[e],a=i.getBoundingClientRect();if(t>=a.left&&t<=a.right&&n>=a.top&&n<=a.bottom)return i}return null}function Uo(e){let t=e?.closest?.(`[data-type="item"]`);if(!(t instanceof HTMLElement))return null;let n=t.dataset.itemPath??null;if(n==null)return null;let r=e?.closest?.(`[data-item-flattened-subitem]`),i=r instanceof HTMLElement?r.getAttribute(`data-item-flattened-subitem`)??null:null;if(i!=null&&i.endsWith(`/`))return{directoryPath:i,flattenedSegmentPath:i,hoveredPath:n,kind:`directory`};if(t.dataset.itemType===`folder`)return{directoryPath:n,flattenedSegmentPath:null,hoveredPath:n,kind:`directory`};let a=t.dataset.itemParentPath??null;return a==null||a.length===0?{directoryPath:null,flattenedSegmentPath:null,hoveredPath:n,kind:`root`}:{directoryPath:a,flattenedSegmentPath:null,hoveredPath:n,kind:`directory`}}function Wo(e){let t=e.cloneNode(!0);return t.removeAttribute(`id`),t.dataset.fileTreeDragPreview=`true`,t.setAttribute(`aria-hidden`,`true`),t.tabIndex=-1,Object.assign(t.style,{boxShadow:`0 4px 12px rgba(0, 0, 0, 0.15)`,left:`0px`,margin:`0`,pointerEvents:`none`,position:`fixed`,top:`0px`,willChange:`transform`,zIndex:`10000`}),t}function Go(){return navigator.vendor!==`Apple Computer, Inc.`}function Ko(e,t){let n=e-t.top;if(n<Ro){let e=Math.max(0,n);return-Math.ceil((Ro-e)/Ro*zo)}let r=t.bottom-e;if(r<Ro){let e=Math.max(0,r);return Math.ceil((Ro-e)/Ro*zo)}return 0}function qo(e,t){if(e!=null){let t=Ka[e];return t==null?null:{text:t,title:qa[e]}}return t?{icon:{name:`file-tree-icon-dot`,width:6,height:6},title:Ja}:null}function Jo(e,t,n){if(t==null||t.size===0)return null;let r=[];for(let i=e.length-1;i>=0;--i){let a=e[i],o=n.get(a);if(o!=null){for(let e of r)n.set(e,o);return o?`ignored`:null}if(t.has(a)){n.set(a,!0);for(let e of r)n.set(e,!0);return`ignored`}r.push(a)}for(let e of r)n.set(e,!1);return null}function Yo(e){return e!=null&&`toggle`in e}function Xo(e){return e.code===`Space`||e.key===` `||e.key===`Spacebar`}function Zo(e){return e.key.length===1&&/^[\p{L}\p{N}]$/u.test(e.key)&&!e.ctrlKey&&!e.metaKey&&!e.altKey}function Qo(e,t){return e?.clientHeight!=null&&e.clientHeight>0?e.clientHeight:t}function $o(e,t,n,r,i=0){let a=Qa({currentScrollTop:e.scrollTop,focusedIndex:t,itemHeight:n,topInset:i,viewportHeight:Qo(e,r)});return a==null?!1:(e.scrollTop=a,!0)}function es(e,t,n,r,i,a){let o=$a({currentScrollTop:e.scrollTop,focusedIndex:t,itemHeight:n,targetViewportOffset:a,totalHeight:i,viewportHeight:Qo(e,r)});return o==null?!1:(e.scrollTop=o,!0)}function ts(e,t,n,r){return n.end<n.start?null:e<n.start?-t:e>n.end?r:null}function ns(e){return e==null?``:`[data-item-section="spacing-item"][data-ancestor-path="${e.replaceAll(`\\`,`\\\\`).replaceAll(`"`,`\\"`)}"] { opacity: 1; }`}function rs(e){return e.shiftKey&&e.key===`F10`||e.key===`ContextMenu`}var is=new Set([`ArrowDown`,`ArrowLeft`,`ArrowRight`,`ArrowUp`,`End`,`Home`,`PageDown`,`PageUp`]);function as(e){for(let t of e.composedPath())if(t instanceof HTMLElement&&(t.dataset.fileTreeContextMenuRoot===`true`||t.dataset.type===`context-menu-anchor`||t.dataset.type===`context-menu-trigger`||t.getAttribute(`slot`)===`context-menu`))return!0;return!1}function os(e){return{bottom:e.bottom,height:e.height,left:e.left,right:e.right,top:e.top,width:e.width,x:e.x,y:e.y}}function ss(e,t){return{bottom:t,height:0,left:e,right:e,top:t,width:0,x:e,y:t}}function cs(e,t){if(e==null)return t.offsetTop;let n=t.getBoundingClientRect(),r=e.getBoundingClientRect();return n.top-r.top}function ls(e,t,n){if(n==null){e.delete(t);return}e.set(t,n)}function us(e,t,n){return e==null?null:t.get(e)??n.get(e)??null}function ds(e,t){return{kind:e.kind,name:Mo(e),path:t}}function fs(e){return e==null?void 0:`${e}__tree`}function ps(e,t,n){if(e!=null)return`${e}__focused-item-${encodeURIComponent(t)}${n?`__parked`:``}`}function ms(e){return e===`file-tree-icon-chevron`||e===`file-tree-icon-dot`||e===`file-tree-icon-file`||e===`file-tree-icon-lock`}function hs(e,t){if(e==null)return null;if(`text`in e)return J(`span`,{title:e.title,children:e.text});let n=typeof e.icon==`string`?ms(e.icon)?t(e.icon):{name:e.icon}:ms(e.icon.name)?(()=>{let n=t(e.icon.name),{name:r,...i}=e.icon;return{...n,...i}})():e.icon;return J(`span`,{title:e.title,children:J(xa,{...n})})}function gs(e){e!=null&&Do(e.querySelector([`button:not([disabled])`,`[href]`,`input:not([disabled])`,`select:not([disabled])`,`textarea:not([disabled])`,`[tabindex]:not([tabindex="-1"])`].join(`, `))??e)}function _s(e,t,{actionLaneEnabled:n=!1,customDecoration:r=null,decorationLaneEnabled:i=!1,dragTargetFlattenedSegmentPath:a=null,gitDecoration:o=null,gitLaneActive:s=!1,renameInput:c=null,showDecorativeActionAffordance:l=!1}={}){let u=jo(e);return J(Ji,{children:[e.depth>0?J(`div`,{"data-item-section":`spacing`,children:Array.from({length:e.depth}).map((t,n)=>J(`div`,{"data-item-section":`spacing-item`,"data-ancestor-path":e.ancestorPaths[n]},n))}):null,J(`div`,{"data-item-section":`icon`,children:e.kind===`directory`?J(xa,{...t(`file-tree-icon-chevron`)}):J(xa,{...t(`file-tree-icon-file`,u)})}),J(`div`,{"data-item-section":`content`,children:e.isFlattened?Ao(e,c,a):c??J(Na,{minimumLength:5,split:`extension`,children:e.name})}),i?J(`div`,{"data-item-section":`decoration`,children:r==null?null:hs(r,t)}):null,s?J(`div`,{"data-item-section":`git`,children:hs(o,t)}):null,n?J(`div`,{"data-item-section":`action`,children:l?J(`span`,{"aria-hidden":`true`,"data-item-action-affordance":`decorative`,children:J(xa,{...t(`file-tree-icon-ellipsis`)})}):null}):null]})}function vs(e,t,n,r={}){let{controller:i,renameView:a,visualFocusPath:o,contextHoverPath:s,draggedPathSet:c,dragTarget:l,dragAndDropEnabled:u,shouldSuppressContextMenu:d,handleRowDragStart:f,handleRowDragEnd:p,handleRowTouchStart:m,instanceId:h,itemHeight:g,gitStatusByPath:_,ignoredGitDirectories:v,ignoredInheritanceCache:y,directoriesWithGitChanges:b,gitLaneActive:x,contextMenuEnabled:S,contextMenuTriggerMode:C,contextMenuButtonTriggerEnabled:ee,contextMenuButtonVisibility:te,contextMenuRightClickEnabled:ne,registerRenameInput:w,registerButton:re,resolveIcon:T,renderDecorationForRow:E,openContextMenuForRow:D,onRowClick:O,onKeyDown:k}=e,A=jo(t),{isParked:ie=!1,mode:ae=`flow`,style:oe}=r,se=ae===`sticky`,ce=_?.get(A)??null??Jo(t.ancestorPaths,v,y),le=t.kind===`directory`&&(b?.has(A)??!1),ue=E(t,A),j=qo(ce,le),de=S&&ee,M=ue!=null||x||de,fe=de&&te===`always`,N=a.getPath()===A,pe=N?a.getValue():``,me=se||!N?null:J(ko,{ref:w,ariaLabel:`Rename ${Mo(t)}`,isFlattened:t.isFlattened,value:pe,onBlur:()=>{a.commit()},onInput:e=>{a.setValue(e.currentTarget.value)}}),he=_s(t,T,{actionLaneEnabled:de,customDecoration:ue,decorationLaneEnabled:M,dragTargetFlattenedSegmentPath:l?.flattenedSegmentPath??null,gitDecoration:j,gitLaneActive:x,renameInput:me,showDecorativeActionAffordance:fe}),ge={...Xa({ariaLabel:Mo(t),domId:t.isFocused?ps(h,A,ie):void 0,extraStyle:oe,features:{actionLaneEnabled:de,contextMenuButtonVisibility:de?te:null,contextMenuEnabled:S,contextMenuTriggerMode:S?C:null,gitLaneActive:x},isParked:ie,itemHeight:g,mode:ae,row:t,state:{containsGitChange:le,effectiveGitStatus:ce,isContextHovered:s===A,isDragTarget:l?.kind===`directory`&&l.directoryPath===A,isDragging:c?.has(A)===!0,isFocusRinged:t.isFocused&&o===A},targetPath:A}),key:n,onContextMenu:S||u?e=>{if(d()){e.preventDefault();return}S&&(e.preventDefault(),ne&&(i.focusPath(A),D(t,A,{anchorRect:ss(e.clientX,e.clientY),source:`right-click`})))}:void 0,onFocus:se?void 0:()=>{i.focusPath(A)},onKeyDown:se?void 0:k,ref:e=>{re(A,e)}};return!se&&N?J(`div`,{...ge,children:he}):J(`button`,{...ge,type:`button`,draggable:u&&!ie,onDragEnd:u&&!ie?p:void 0,onDragStart:u&&!ie?e=>{f(e,t,A)}:void 0,onMouseDown:e=>{if(se){e.preventDefault();return}i.isSearchOpen()&&e.preventDefault()},onTouchStart:u&&!ie?e=>{m(e,t,A)}:void 0,onClick:e=>{O(e,t,A,ae)},children:he})}function ys(e,t,n){return t.end<t.start?[]:e.controller.getVisibleRows(t.start,t.end).filter(e=>!n.has(jo(e))).map((n,r)=>vs(e,n,t.start+r))}function bs({composition:e,controller:t,gitStatusByPath:n,ignoredGitDirectories:r,directoriesWithGitChanges:i,icons:a,instanceId:o,itemHeight:s=kr,overscan:c=10,renamingEnabled:l=!1,renderRowDecoration:u,searchBlurBehavior:d=`close`,searchEnabled:f=!1,searchFakeFocus:p=!1,slotHost:m,stickyFolders:h=!1,initialViewportHeight:g=420}){"use no memo";let _=Z(null),v=Z(null),y=Z(!1),b=Z(null),x=Z(null),S=Z(null),C=Z(null),ee=Z(null),te=Z(new Map),ne=Z(new Map),re=Z(()=>{}),T=Z(!1),E=Z(null),D=Z(null),O=Z(!1),k=Z(null),A=Z(null),ie=Z(null),ce=Z(null),le=Z(null),ue=Z(null),j=Z(null),de=Z(null),M=Z(!1),fe=Z(null),N=Z(null),pe=Z(null),me=Z(null),he=vo(()=>new Map,[]),[,ge]=mo(0),[_e,ve]=mo(null),[ye,be]=mo(null),[xe,Se]=mo(null),[Ce,P]=mo(null),[F,we]=mo(null),I=Z(F);I.current=F;let Te=Z(null),L=Z(null),Ee=Z(!1),De=Z(d===`retain`&&t.isSearchOpen()),[Oe,ke]=mo(p);go(()=>{p||ke(!1)},[p]);let Ae=Z(!1),R=yo(()=>{Ae.current=!0,ke(e=>e&&!1)},[]),[je,Me]=mo(()=>Fo({controller:t,itemHeight:s,overscan:c,scrollTop:0,stickyFolders:h,viewportHeight:g})),[Ne,Pe]=mo(!1);go(()=>{Pe(!0)},[]);let z=e?.contextMenu?.enabled===!0||e?.contextMenu?.render!=null||e?.contextMenu?.onOpen!=null||e?.contextMenu?.onClose!=null,Fe=e?.contextMenu?.triggerMode??(z?`right-click`:`both`),Ie=Fe===`both`||Fe===`button`,Le=e?.contextMenu?.buttonVisibility??`when-needed`,Re=Fe===`both`||Fe===`right-click`;_o(()=>{let e=S.current;if(e==null)return;let t=e=>{if(!(e instanceof CustomEvent))return;let t=e.detail?.path??null;L.current=t,be(t),P(t==null?null:`pointer`)},n=e=>{e instanceof CustomEvent&&(Ee.current=e.detail?.disabled===!0)};return e.addEventListener(`file-tree-debug-set-context-menu-trigger`,t),e.addEventListener(`file-tree-debug-set-scroll-suppression`,n),()=>{e.removeEventListener(`file-tree-debug-set-context-menu-trigger`,t),e.removeEventListener(`file-tree-debug-set-scroll-suppression`,n)}},[]);let ze=yo((e,t)=>{ls(te.current,e,t)},[]),Be=yo((e,t)=>{ls(ne.current,e,t)},[]),Ve=yo(e=>{x.current=e},[]),He=yo(e=>us(e,ne.current,te.current),[]),Ue=n!=null||r!=null||i!=null,{resolveIcon:We}=vo(()=>w(a),[a]),Ge=t[ei](),Ke=Ge.getPath(),qe=Ke!=null,Je=t.isSearchOpen(),Ye=t.getSearchValue(),B=t.getFocusedPath(),V=t.getFocusedIndex(),Xe=t.isDragAndDropEnabled(),Ze=t.getDragSession(),Qe=vo(()=>Ze==null?null:new Set(Ze.draggedPaths),[Ze]),$e=Ze?.target??null,et=Ze?.primaryPath??null,tt=fs(o),{overlayHeight:nt,overlayRows:rt,snapshot:H,visibleRows:it}=je,at=H.physical.viewportHeight,ot=vo(()=>({end:H.window.endIndex,start:H.window.startIndex}),[H.window.endIndex,H.window.startIndex]),st=rt,ct=H.sticky.rows,lt=H.physical.totalHeight,ut=H.sticky.height,dt=vo(()=>new Set(ct.map(e=>jo(e.row))),[ct]),ft=V>=0&&V>=ot.start&&V<=ot.end,pt=yo((e,t)=>u?.({item:ds(e,t),row:e})??null,[u]),mt=yo(e=>Do(e==null?null:te.current.get(e)??null)?!0:Do(S.current),[]),U=yo(e=>{mt(t.focusNearestPath(e))},[t,mt]),ht=Z(U);ht.current=U;let gt=Z(!0),_t=Z(()=>{}),vt=yo((t=!0)=>{let n=I.current;n!=null&&(gt.current=gt.current&&t,we(null),e?.contextMenu?.onClose?.(),gt.current&&U(n.path))},[e?.contextMenu,U]);_t.current=vt;let yt=yo(e=>{let t=e==null?null:cs(S.current,e);Se(e=>e===t?e:t)},[]),bt=yo((e,n,r)=>{let i=t.getItem(n);i!=null&&(i.focus(),yt(He(n)),gt.current=!0,we({anchorRect:r?.anchorRect??null,item:ds(e,n),path:n,source:r?.source??`keyboard`}))},[t,He,yt]),xt=yo(e=>{if(l){if(t.isSearchOpen()){let e=C.current,t=Qo(e,at);k.current=V<0||e==null?null:Math.max(0,Math.min(V*s-e.scrollTop,Math.max(0,t-s))),O.current=!0}t.startRenaming(e)!==!1&&(P(`focus`),ge(e=>e+1))}},[t,V,s,l,at]),St=yo((e,{restoreTreeFocus:n=!0,targetOffset:r=`live-overlay`}={})=>{let i=C.current;if(i==null)return!1;t.focusPath(e);let a=t.getFocusedIndex();if(a<0)return!1;let o=t.getVisibleRows(a,a)[0]??null;if(o==null)return!1;let l=Qo(i,at),u=t.getVisibleCount()*s,d=r===`sticky-parents`?o.ancestorPaths.length*s:Fo({controller:t,itemHeight:s,overscan:c,scrollTop:i.scrollTop,stickyFolders:h,viewportHeight:l}).snapshot.sticky.height;return T.current=!0,es(i,a,s,l,u,d),re.current(),Te.current=n?e:null,!0},[t,s,c,at,h]),Ct=()=>me.current!=null||M.current===!0,wt=e=>typeof window.requestAnimationFrame==`function`?window.requestAnimationFrame(()=>{e()}):window.setTimeout(e,16),Tt=e=>{if(e!=null){if(typeof window.cancelAnimationFrame==`function`){window.cancelAnimationFrame(e);return}window.clearTimeout(e)}},Et=()=>{ce.current!=null&&(clearTimeout(ce.current),ce.current=null),ie.current=null},Dt=()=>{ue.current?.remove(),ue.current=null},Ot=()=>{Tt(A.current),A.current=null,le.current=null},kt=e=>{let t=S.current?.getRootNode();if(t instanceof ShadowRoot){t.append(e);return}document.body.append(e)},At=()=>{de.current?.(),de.current=null,me.current!=null&&(clearTimeout(me.current),me.current=null),M.current=!1,fe.current=null,pe.current=null,N.current!=null&&(N.current.setAttribute(`draggable`,`true`),N.current.style.removeProperty(`touch-action`),N.current=null),Dt(),Et(),Ot(),j.current=null},jt=(e,n)=>{let r=S.current?.getRootNode(),i=Uo(Vo(r instanceof ShadowRoot?r:document,e,n));return t.setDragTarget(i),t.getDragSession()?.target??null},Mt=e=>{let n=t.getDragAndDropConfig()?.openOnDropDelay??800;if(e==null||e.kind!==`directory`||e.directoryPath==null||n<=0){Et();return}let r=t.getItem(e.directoryPath),i=Yo(r)?r:null;if(i==null||i.isExpanded()){Et();return}let a=`${e.directoryPath}::${e.flattenedSegmentPath??``}`;ie.current!==a&&(Et(),ie.current=a,ce.current=setTimeout(()=>{let n=t.getDragSession()?.target;n?.kind!==`directory`||n.directoryPath!==e.directoryPath||n.flattenedSegmentPath!==e.flattenedSegmentPath||i.expand()},n))},Nt=()=>{A.current=null;let e=le.current,n=C.current;if(e==null||n==null||t.getDragSession()==null)return;let r=n.getBoundingClientRect(),i=Ko(e.clientY,r);if(i===0)return;let a=Math.max(0,n.scrollHeight-n.clientHeight),o=Math.max(0,Math.min(a,n.scrollTop+i));o!==n.scrollTop&&(n.scrollTop=o,re.current()),Mt(jt(e.clientX,e.clientY)),A.current=wt(Nt)},Pt=(e,t)=>{le.current={clientX:e,clientY:t},A.current??=wt(Nt)},Ft=(e,n,r)=>{let i=e.currentTarget;if(i!=null){if(At(),Dt(),Et(),Ot(),t.startDrag(r)===!1){e.preventDefault();return}if(j.current=n,e.dataTransfer!=null&&(e.dataTransfer.effectAllowed=`move`,e.dataTransfer.dropEffect=`move`,e.dataTransfer.setData(`text/plain`,r),Go())){let t=Wo(i),n=i.getBoundingClientRect();Object.assign(t.style,{height:`${n.height}px`,opacity:`0.85`,transform:`translate3d(-9999px, 0px, 0)`,width:`${n.width}px`}),kt(t),ue.current=t,e.dataTransfer.setDragImage(t,Math.max(0,e.clientX-n.left),Math.max(0,e.clientY-n.top))}}},It=()=>{Dt(),Et(),Ot(),j.current=null,t.cancelDrag()},Lt=(e,n,r)=>{if(me.current!=null||M.current)return;let i=e.touches[0],a=e.currentTarget;if(i==null||a==null)return;pe.current={clientX:i.clientX,clientY:i.clientY},N.current=a,a.setAttribute(`draggable`,`false`);let o=(e={})=>{let t=e.restoreNativeDraggable??!M.current;me.current!=null&&(clearTimeout(me.current),me.current=null),document.removeEventListener(`touchmove`,s),document.removeEventListener(`touchend`,c),document.removeEventListener(`touchcancel`,c),de.current===o&&(de.current=null),t&&(a.setAttribute(`draggable`,`true`),N.current===a&&(N.current=null),pe.current=null)},s=e=>{let t=e.touches[0],n=pe.current;if(t==null||n==null)return;let r=t.clientX-n.clientX,i=t.clientY-n.clientY;r*r+i*i<=Lo*Lo||o()},c=()=>{o()};document.addEventListener(`touchmove`,s,{passive:!0}),document.addEventListener(`touchend`,c),document.addEventListener(`touchcancel`,c),de.current=o,me.current=setTimeout(()=>{if(o({restoreNativeDraggable:!1}),t.startDrag(r)===!1){a.setAttribute(`draggable`,`true`),N.current===a&&(N.current=null),pe.current=null;return}M.current=!0,N.current=a,a.setAttribute(`draggable`,`false`),a.style.setProperty(`touch-action`,`none`),j.current=n;let e=a.getBoundingClientRect(),s=Wo(a);Object.assign(s.style,{height:`${e.height}px`,opacity:`0.85`,transform:`translate3d(${e.left}px, ${e.top}px, 0)`,width:`${e.width}px`}),kt(s),ue.current=s,fe.current={x:i.clientX-e.left,y:i.clientY-e.top};let c=e=>{let t=e.touches[0];if(t==null)return;e.preventDefault();let n=fe.current;n!=null&&ue.current!=null&&(ue.current.style.transform=`translate3d(${t.clientX-n.x}px, ${t.clientY-n.y}px, 0)`),Mt(jt(t.clientX,t.clientY)),Pt(t.clientX,t.clientY)},l=e=>{let n=e.changedTouches[0];n!=null&&jt(n.clientX,n.clientY),t.completeDrag(),At()},u=()=>{t.cancelDrag(),At()};de.current=()=>{document.removeEventListener(`touchmove`,c),document.removeEventListener(`touchend`,l),document.removeEventListener(`touchcancel`,u)},document.addEventListener(`touchmove`,c,{passive:!1}),document.addEventListener(`touchend`,l),document.addEventListener(`touchcancel`,u)},Io)},Rt=e=>{if(F!=null){if(e.key===`Escape`){vt(),e.preventDefault(),e.stopPropagation();return}is.has(e.key)&&(e.preventDefault(),e.stopPropagation());return}if(Ge.isActive()){if(e.key===`Escape`)Ge.cancel();else if(e.key===`Enter`)Ge.commit();else return;P(`focus`),ge(e=>e+1),e.preventDefault(),e.stopPropagation();return}if(l&&e.key===`F2`){xt(B??void 0),e.preventDefault(),e.stopPropagation();return}if(Je){if(e.key===`Escape`)O.current=!1,k.current=null,t.closeSearch();else if(e.key===`Enter`){let e=t.getFocusedPath();e!=null&&t.selectOnlyPath(e);let n=C.current,r=Qo(n,at);k.current=V<0||n==null?null:Math.max(0,Math.min(V*s-n.scrollTop,Math.max(0,r-s))),O.current=!0,t.closeSearch()}else if(e.key===`ArrowDown`)t.focusNextSearchMatch();else if(e.key===`ArrowUp`)t.focusPreviousSearchMatch();else return;P(`focus`),ge(e=>e+1),e.preventDefault(),e.stopPropagation();return}if(f&&Zo(e)){t.openSearch(e.key),ge(e=>e+1),e.preventDefault(),e.stopPropagation();return}let n=t.getFocusedItem();if(n==null)return;let r=Yo(n)?n:null,i=!0;if(e.shiftKey&&e.key===`ArrowDown`)t.extendSelectionFromFocused(1);else if(e.shiftKey&&e.key===`ArrowUp`)t.extendSelectionFromFocused(-1);else if(z&&rs(e)&&B!=null&&V>=0){let e=t.getVisibleRows(V,V)[0]??null,n=te.current.get(B)??null;e==null||n==null?i=!1:bt(e,B)}else if((e.ctrlKey||e.metaKey)&&Xo(e))t.toggleFocusedSelection();else if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()===`a`)t.selectAllVisiblePaths();else switch(e.key){case`ArrowDown`:t.focusNextItem();break;case`ArrowUp`:t.focusPreviousItem();break;case`ArrowRight`:r==null||r.isExpanded()?t.focusNextItem():r.expand();break;case`ArrowLeft`:r!=null&&r.isExpanded()?r.collapse():t.focusParentItem();break;case`Home`:t.focusFirstItem();break;case`End`:t.focusLastItem();break;default:i=!1}i&&(P(`focus`),ge(e=>e+1),e.preventDefault(),e.stopPropagation())};_o(()=>{if(!(!f||!Je)){if(De.current){De.current=!1;return}Do(ee.current)}},[Je,f]),_o(()=>{let e=x.current;switch(Ya({hasRenderedInput:e!=null,previousRenamingPath:D.current,renamingPath:Ke})){case`reset`:D.current=null;return;case`reveal-canonical`:Ke!=null&&St(Ke,{restoreTreeFocus:!1,targetOffset:`live-overlay`});return;case`ignore`:return;case`focus-input`:e!=null&&(Te.current=null,D.current=Ke,Do(e),e.select());return}},[ot.end,ot.start,Ke,St,dt]),_o(()=>{let e=S.current;if(e==null)return;let t=()=>{let t=Oo(e)?.dataset.itemPath??null;ve(e=>e===t?e:t)},n=()=>{T.current=!0,t()},r=n=>{let r=n.relatedTarget;if(r!=null){if(!(r instanceof Node)||!e.contains(r)){T.current=!1,ve(null);return}t()}};return e.addEventListener(`focusin`,n),e.addEventListener(`focusout`,r),()=>{e.removeEventListener(`focusin`,n),e.removeEventListener(`focusout`,r)}},[]),_o(()=>{let e=S.current;e!=null&&(H.physical.scrollTop<=0?e.dataset.scrollAtTop=`true`:delete e.dataset.scrollAtTop)},[H.physical.scrollTop]),_o(()=>{S.current?.dispatchEvent(new CustomEvent(Bo,{bubbles:!0,composed:!0}))},[H.physical.scrollTop,H.physical.totalHeight,H.physical.viewportHeight,H.sticky.height,H.window.endIndex,H.window.startIndex]),_o(()=>{let e=null,n=C.current,r=b.current,i=S.current;if(n==null)return;let a=()=>{let e=t.getVisibleCount(),r=Qo(n,g),i=Math.max(0,e*s-r);n.scrollTop>i&&(n.scrollTop=i),Me(Fo({controller:t,itemHeight:s,overscan:c,scrollTop:Math.min(n.scrollTop,i),stickyFolders:h,viewportHeight:r}))};re.current=a;let o=!1,l=t.subscribe(()=>{o?ge(e=>e+1):o=!0,a()}),u=()=>{Ee.current!==!0&&(r!=null&&(r.dataset.isScrolling??=``),i!=null&&(i.dataset.isScrolling??=``),y.current=!0,e!=null&&clearTimeout(e),e=setTimeout(()=>{r!=null&&delete r.dataset.isScrolling,i!=null&&delete i.dataset.isScrolling,y.current=!1,e=null},50))},d=null,f=()=>{i!=null&&delete i.dataset.overlayReveal,d!=null&&(clearTimeout(d),d=null)},p=()=>{i==null||Ee.current===!0||n.scrollTop>0||(i.dataset.overlayReveal=`true`,d!=null&&clearTimeout(d),d=setTimeout(()=>{f()},200))},m=()=>{if(a(),n.scrollTop>0&&f(),I.current!=null&&y.current&&_t.current(),Ee.current===!0){y.current=!1;return}be(e=>e==null?e:null),u()},_=()=>{u(),p()},v=new Set([`ArrowUp`,`ArrowDown`,`ArrowLeft`,`ArrowRight`,`PageUp`,`PageDown`,`Home`,`End`,` `,`Spacebar`]),x=e=>{v.has(e.key)&&_()};n.addEventListener(`scroll`,m,{passive:!0}),n.addEventListener(`wheel`,_,{passive:!0}),n.addEventListener(`touchmove`,_,{passive:!0}),n.addEventListener(`keydown`,x);let ee=typeof ResizeObserver<`u`?new ResizeObserver(()=>{a()}):null;return ee?.observe(n),()=>{re.current=()=>{},l(),n.removeEventListener(`scroll`,m),n.removeEventListener(`wheel`,_),n.removeEventListener(`touchmove`,_),n.removeEventListener(`keydown`,x),e!=null&&clearTimeout(e),d!=null&&clearTimeout(d),r!=null&&delete r.dataset.isScrolling,i!=null&&(delete i.dataset.isScrolling,delete i.dataset.overlayReveal),y.current=!1,ee?.disconnect()}},[t,g,s,c,h]),_o(()=>{z||F==null||vt(!1)},[vt,z,F]);let zt=vo(()=>F==null?null:`${F.path}::${F.source}`,[F]);_o(()=>{if(zt==null){m?.clearSlotContent(oe);return}let t=I.current;if(t==null)return;let n=v.current??_.current;if(n==null)return;let r={anchorElement:n,anchorRect:t.anchorRect??os(n.getBoundingClientRect()),close:e=>{_t.current(e?.restoreFocus??!0)},restoreFocus:()=>{gt.current&&ht.current(I.current?.path??null)}},i=e?.contextMenu?.render?.(t.item,r)??null;return m?.setSlotContent(oe,i),e?.contextMenu?.onOpen?.(t.item,r),gs(i),queueMicrotask(()=>{i==null||!i.isConnected||document.activeElement===i&&gs(i)}),()=>{m?.clearSlotContent(oe)}},[zt,e?.contextMenu,m]),_o(()=>{F!=null&&t.getItem(F.path)==null&&vt()},[vt,F,t]),_o(()=>{if(F==null)return;let e=S.current?.getRootNode(),t=e instanceof ShadowRoot?e.host:S.current,n=e=>{let n=e.target;n instanceof Node&&(as(e)||_.current?.contains(n)!==!0&&t?.contains(n)!==!0&&vt())},r=e=>{e.key===`Escape`&&(e.preventDefault(),e.stopPropagation(),vt())};return document.addEventListener(`mousedown`,n,!0),document.addEventListener(`keydown`,r,!0),()=>{document.removeEventListener(`mousedown`,n,!0),document.removeEventListener(`keydown`,r,!0)}},[vt,F]),_o(()=>{let e=C.current,t=S.current;if(e==null||t==null){E.current=B;return}let n=B==null?null:te.current.get(B)??null,r=Oo(t),i=r?.dataset.itemPath??null,a=qe&&x.current===r,o=f&&ee.current===r,c=O.current&&!Je,l=k.current??0,u=Te.current,d=r!=null,p=T.current||d,m=E.current!==B,h=c&&es(e,V,s,at,lt,l);if((u!=null&&u===B&&es(e,V,s,at,lt,ut)||h||p&&m&&u!==B&&$o(e,V,s,at,ut))&&re.current(),!p){E.current=B;return}if(a){E.current=B;return}if(o&&!c){E.current=B;return}if(n==null){c&&V>=0&&(es(e,V,s,at,lt,l),re.current()),E.current=B;return}(m||c||u===B||i==null||i!==B)&&(Do(n),u===B&&(Te.current=null),O.current=!1,k.current=null),E.current=B},[t,V,B,ft,s,qe,Je,ot,at,f,ut,lt,it]);let Bt=Ie&&T.current===!0?B:null,Vt=Ce===`pointer`?ye:null,Ht=F?.path??L.current??Vt??Bt??ye,Ut=F?.source===`right-click`;_o(()=>{yt(He(Ht))},[He,ot,at,st,Ht,yt,it]);let Wt=yo(e=>{if(y.current||as(e))return;let t=e.target;if(!(t instanceof HTMLElement)||t.closest?.(`[data-type="context-menu-trigger"]`)!=null)return;let n=t.closest?.(`[data-file-tree-sticky-row="true"]`),r=t.closest?.(`[data-type="item"]`),i=n instanceof HTMLElement?n.dataset.fileTreeStickyPath??null:r instanceof HTMLElement?r.dataset.itemPath??null:null;i!=null&&P(e=>e===`pointer`?e:`pointer`),be(e=>e===i?e:i)},[]),Gt=yo(()=>{be(null)},[]);_o(()=>{if(!Xe)return;let e=()=>{At(),t.cancelDrag()};return window.addEventListener(`dragend`,e),()=>{window.removeEventListener(`dragend`,e),At(),t.cancelDrag()}},[t,Xe]);let Kt=e=>{if(!Xe||t.getDragSession()==null||M.current)return;let n=Uo(e.target instanceof HTMLElement?e.target:null);t.setDragTarget(n),Mt(t.getDragSession()?.target??null),Pt(e.clientX,e.clientY),e.dataTransfer!=null&&(e.dataTransfer.dropEffect=`move`),e.preventDefault()},qt=e=>{if(!Xe||t.getDragSession()==null||M.current)return;let n=e.relatedTarget;n instanceof Node&&S.current?.contains(n)===!0||(Et(),Ot(),t.setDragTarget(null))},Jt=e=>{!Xe||t.getDragSession()==null||M.current||(e.preventDefault(),jt(e.clientX,e.clientY),t.completeDrag(),Dt(),Et(),Ot(),j.current=null)},Yt=H.window.height,Xt=H.window.offsetTop,Zt=Math.min(0,at-Yt-ut),Qt=_e===B||O.current,$t=B!=null&&Qt&&!ft&&V>=0?it[V]??t.getVisibleRows(V,V)[0]??null:null,en=$t==null?null:ts(V,s,ot,Yt),tn=j.current,nn=et!=null&&tn!=null&&tn.path===et&&tn.index>=ot.start&&tn.index<=ot.end,W=et!=null&&tn!=null&&tn.path===et&&!nn&&tn.path!==$t?.path?tn:null,rn=W==null?null:ts(W.index,s,ot,Yt),an=ns((V>=0?it[V]??t.getVisibleRows(V,V)[0]??null:null)?.ancestorPaths.at(-1)??null),on=Je&&B!=null?ps(o,B,!ft):void 0,sn=F?.path??(Je?B:_e),cn=F?.path??ye,G=He(Ht),K=z&&Ie&&!Ut&&!qe&&G!=null&&xe!=null&&Ht!=null,ln=z&&(K||F!=null),un=F?.anchorRect,dn=un==null&&G!=null&&xe!=null&&(F!=null||K)?xe:null,fn=un==null?dn==null?void 0:{top:`${dn}px`}:{left:`${un.left}px`,position:`fixed`,right:`auto`,top:`${un.top}px`},pn=Ut?{opacity:`0`}:void 0,mn=yo((e,n,r,i)=>{let a=t.getItem(r),o=Za({event:{ctrlKey:e.ctrlKey,metaKey:e.metaKey,shiftKey:e.shiftKey},isDirectory:n.kind===`directory`,isSearchOpen:t.isSearchOpen(),mode:i});switch(o.selection.kind){case`range`:t.selectPathRange(r,o.selection.additive);break;case`toggle`:t.togglePathSelectionFromInput(r);break;case`single`:t.selectOnlyPath(r);break}let s=e.currentTarget instanceof HTMLElement?e.currentTarget:null,c=n.index>=H.visible.startIndex&&n.index<=H.visible.endIndex,l=i===`flow`&&c&&s!=null&&s.dataset.itemParked!==`true`;a?.focus(),l&&(T.current=!0,ve(e=>e===r?e:r),P(`focus`)),o.toggleDirectory&&Yo(a)&&a.toggle(),o.closeSearch&&t.closeSearch(),o.revealCanonical&&St(r,{targetOffset:`sticky-parents`})},[t,H.visible.endIndex,H.visible.startIndex,St]),hn=()=>{if(!Ie||Ht==null||G==null)return;let e=t.getItem(Ht);e!=null&&(yt(G),gt.current=!0,we({anchorRect:null,item:{kind:e.isDirectory()?`directory`:`file`,name:G.getAttribute(`aria-label`)??Ht,path:e.getPath()},path:e.getPath(),source:`button`}))},gn={contextHoverPath:cn,contextMenuButtonTriggerEnabled:Ie,contextMenuButtonVisibility:Le,contextMenuEnabled:z,contextMenuRightClickEnabled:Re,contextMenuTriggerMode:Fe,controller:t,directoriesWithGitChanges:i,dragAndDropEnabled:Xe,draggedPathSet:Qe,dragTarget:$e,gitLaneActive:Ue,gitStatusByPath:n,handleRowDragEnd:It,handleRowDragStart:Ft,handleRowTouchStart:Lt,ignoredGitDirectories:r,ignoredInheritanceCache:he,instanceId:o,itemHeight:s,onKeyDown:Rt,onRowClick:mn,openContextMenuForRow:bt,registerButton:ze,registerRenameInput:Ve,renameView:Ge,renderDecorationForRow:pt,resolveIcon:We,shouldSuppressContextMenu:Ct,visualFocusPath:sn},_n={...gn,registerButton:Be};return J(`div`,{ref:S,id:tt,"data-file-tree-context-menu-button-visibility":z&&Ie?Le:void 0,"data-file-tree-context-menu-trigger-mode":z?Fe:void 0,"data-file-tree-has-context-menu-action-lane":z&&Ie?`true`:void 0,"data-file-tree-has-git-lane":Ue?`true`:void 0,"data-file-tree-virtualized-root":`true`,onDragLeave:Xe?qt:void 0,onDragOver:Xe?Kt:void 0,onDrop:Xe?Jt:void 0,onKeyDown:Rt,onPointerLeave:z?Gt:void 0,onPointerOver:z?Wt:void 0,role:`tree`,tabIndex:-1,style:{outline:`none`,position:`relative`},children:[J(`style`,{"data-file-tree-guide-style":`true`,dangerouslySetInnerHTML:{__html:an}}),J(`slot`,{name:ae,"data-type":`header-slot`}),f?J(`div`,{"data-file-tree-search-container":!0,"data-open":Je?`true`:`false`,children:J(`input`,{ref:ee,"aria-activedescendant":on,"aria-controls":tt,placeholder:`Search…`,"data-file-tree-search-input":!0,"data-file-tree-search-input-fake-focus":Oe?`true`:void 0,value:Ye,onBlur:()=>{d===`retain`&&!Ae.current||t.closeSearch()},onFocus:R,onPointerDown:R,onInput:e=>{R();let n=e.currentTarget;t.setSearch(n.value)}})}):null,J(`div`,{ref:C,"data-file-tree-virtualized-scroll":`true`,children:[h&&Ne&&st.length>0?J(`div`,{"aria-hidden":`true`,"data-file-tree-sticky-overlay":`true`,children:J(`div`,{"data-file-tree-sticky-overlay-content":`true`,style:{height:`${nt}px`},children:st.map((e,t)=>vs(_n,e.row,`sticky:${jo(e.row)}`,{mode:`sticky`,style:{left:`0`,position:`absolute`,right:`0`,top:`${e.top}px`,zIndex:`${st.length-t}`}}))})}):null,J(`div`,{ref:b,"data-file-tree-virtualized-list":`true`,style:{height:`${lt}px`},children:[J(`div`,{"data-file-tree-virtualized-sticky-offset":`true`,"aria-hidden":`true`,style:{height:`${Xt}px`}}),J(`div`,{"data-file-tree-virtualized-sticky":`true`,style:{height:`${Yt}px`,top:`${Zt}px`,bottom:`${Zt}px`},children:[ys(gn,ot,dt),$t!=null&&en!=null?vs(gn,$t,`parked:${$t.path}`,{isParked:!0,style:{left:`0`,opacity:`0`,pointerEvents:et===$t.path?`none`:void 0,position:`absolute`,right:`0`,top:`${en}px`}}):null,W!=null&&rn!=null?vs(gn,W,`parked-drag:${W.path}`,{isParked:!0,style:{left:`0`,opacity:`0`,pointerEvents:`none`,position:`absolute`,right:`0`,top:`${rn}px`}}):null]})]})]}),z?J(`div`,{ref:_,"data-type":`context-menu-anchor`,"data-visible":ln?`true`:`false`,style:fn,children:[J(`button`,{ref:v,type:`button`,"data-type":se,"aria-label":`Options`,"aria-haspopup":`menu`,"aria-expanded":F==null?`false`:`true`,"data-visible":K?`true`:`false`,onMouseDown:e=>{e.preventDefault()},onClick:e=>{if(e.preventDefault(),e.stopPropagation(),F!=null){vt();return}hn()},tabIndex:-1,style:pn,children:J(xa,{...We(`file-tree-icon-ellipsis`)})}),F==null?null:J(`slot`,{name:oe})]}):null,F==null?null:J(`div`,{"data-type":`context-menu-wash`,"aria-hidden":`true`,onMouseDownCapture:e=>{e.preventDefault(),vt()},onTouchStartCapture:e=>{e.preventDefault(),e.stopPropagation(),vt()},onTouchMoveCapture:e=>{e.preventDefault(),e.stopPropagation()},onWheelCapture:e=>{e.preventDefault(),e.stopPropagation()}})]})}var xs={hydrateRoot:(e,t)=>{ga(Ki(bs,t),e)},renderRoot:(e,t)=>{ha(Ki(bs,t),e)},unmountRoot:e=>{ha(null,e)}};function Ss(e,t){xs.renderRoot(e,t)}function Cs(e,t){xs.hydrateRoot(e,t)}function ws(e){xs.unmountRoot(e)}var Ts=class{#e=new Map;#t=null;clearAll(){for(let e of this.#e.values())e.remove();this.#e.clear()}clearSlotContent(e){let t=this.#n(e);t!=null&&(t.remove(),this.#e.delete(e))}setHost(e){if(this.#t=e,e!=null){this.#i(e);for(let[e,t]of this.#e)this.#r(e,t)}}setSlotContent(e,t){let n=this.#n(e);if(n===t){t!=null&&(this.#e.set(e,t),this.#r(e,t));return}if(n?.remove(),t==null){this.#e.delete(e);return}this.#e.set(e,t),this.#r(e,t)}setSlotHtml(e,t){let n=t?.trim()??``;if(n.length===0){this.setSlotContent(e,null);return}let r=this.#n(e);if(r!=null&&r.innerHTML===n){this.#e.set(e,r),this.#r(e,r);return}let i=document.createElement(`div`);i.innerHTML=n,this.setSlotContent(e,i)}#n(e){let t=this.#e.get(e)??null;if(t!=null)return t;let n=this.#t;if(n==null)return null;for(let t of Array.from(n.children))if(t instanceof HTMLElement&&t.dataset.fileTreeManagedSlot===e)return t;return null}#r(e,t){t.slot=e,t.dataset.fileTreeManagedSlot=e,this.#t!=null&&t.parentNode!==this.#t&&this.#t.appendChild(t)}#i(e){for(let t of Array.from(e.children)){if(!(t instanceof HTMLElement))continue;let e=t.dataset.fileTreeManagedSlot;e==null||this.#e.has(e)||this.#e.set(e,t)}}},Es=`__c`,Ds=`__k`,Os=`__d`,ks=`__s`,As=/[\s\n\\/='"\0<>]/,js=/^(xlink|xmlns|xml)([A-Z])/,Ms=/^(?:accessK|auto[A-Z]|cell|ch|col|cont|cross|dateT|encT|form[A-Z]|frame|hrefL|inputM|maxL|minL|noV|playsI|popoverT|readO|rowS|src[A-Z]|tabI|useM|item[A-Z])/,Ns=/^ac|^ali|arabic|basel|cap|clipPath$|clipRule$|color|dominant|enable|fill|flood|font|glyph[^R]|horiz|image|letter|lighting|marker[^WUH]|overline|panose|pointe|paint|rendering|shape|stop|strikethrough|stroke|text[^L]|transform|underline|unicode|units|^v[^i]|^w|^xH/,Ps=new Set([`draggable`,`spellcheck`]);function Fs(e){e.__g===void 0?e[Os]=!0:e.__g|=8}function Is(e){e.__g===void 0?e[Os]=!1:e.__g&=-9}function Ls(e){return e.__g===void 0?!0===e[Os]:!!(8&e.__g)}var Rs=/["&<]/;function zs(e){if(e.length===0||!1===Rs.test(e))return e;for(var t=0,n=0,r=``,i=``;n<e.length;n++){switch(e.charCodeAt(n)){case 34:i=`&quot;`;break;case 38:i=`&amp;`;break;case 60:i=`&lt;`;break;default:continue}n!==t&&(r+=e.slice(t,n)),r+=i,t=n+1}return n!==t&&(r+=e.slice(t,n)),r}var Bs={},Vs=new Set(`animation-iteration-count.border-image-outset.border-image-slice.border-image-width.box-flex.box-flex-group.box-ordinal-group.column-count.fill-opacity.flex.flex-grow.flex-negative.flex-order.flex-positive.flex-shrink.flood-opacity.font-weight.grid-column.grid-row.line-clamp.line-height.opacity.order.orphans.stop-opacity.stroke-dasharray.stroke-dashoffset.stroke-miterlimit.stroke-opacity.stroke-width.tab-size.widows.z-index.zoom`.split(`.`)),Hs=/[A-Z]/g;function Us(e){var t=``;for(var n in e){var r=e[n];if(r!=null&&r!==``){var i=n[0]==`-`?n:Bs[n]||(Bs[n]=n.replace(Hs,`-$&`).toLowerCase()),a=`;`;typeof r!=`number`||i.startsWith(`--`)||Vs.has(i)||(a=`px;`),t=t+i+`:`+r+a}}return t||void 0}function Ws(){this.__d=!0}function Gs(e,t){return{__v:e,context:t,props:e.props,setState:Ws,forceUpdate:Ws,__d:!0,__h:[]}}function Ks(e,t,n){if(!e.s){if(n instanceof qs){if(!n.s)return void(n.o=Ks.bind(null,e,t));1&t&&(t=n.s),n=n.v}if(n&&n.then)return void n.then(Ks.bind(null,e,t),Ks.bind(null,e,2));e.s=t,e.v=n;let r=e.o;r&&r(e)}}var qs=function(){function e(){}return e.prototype.then=function(t,n){var r=new e,i=this.s;if(i){var a=1&i?t:n;if(a){try{Ks(r,1,a(this.v))}catch(e){Ks(r,2,e)}return r}return this}return this.o=function(e){try{var i=e.v;1&e.s?Ks(r,1,t?t(i):i):n?Ks(r,1,n(i)):Ks(r,2,i)}catch(e){Ks(r,2,e)}},r},e}(),Js,Ys,Xs,Zs,Qs={},$s=Array.isArray,ec=Object.assign,tc=``,nc=`<!--$s-->`,rc=`<!--/$s-->`;function ic(e,t){var n,r=e.type,i=!0;return e[Es]?(i=!1,(n=e[Es]).state=n[ks]):n=new r(e.props,t),e[Es]=n,n.__v=e,n.props=e.props,n.context=t,Fs(n),n.state??=Qs,n[ks]??(n[ks]=n.state),r.getDerivedStateFromProps?n.state=ec({},n.state,r.getDerivedStateFromProps(n.props,n.state)):i&&n.componentWillMount?(n.componentWillMount(),n.state=n[ks]===n.state?n.state:n[ks]):!i&&n.componentWillUpdate&&n.componentWillUpdate(),Xs&&Xs(e),n.render(n.props,n.state,t)}function ac(e,t,n,r,i,a,o){if(e==null||!0===e||!1===e||e===tc)return tc;var s=typeof e;if(s!=`object`)return s==`function`?tc:s==`string`?zs(e):e+tc;if($s(e)){var c,l=tc;i[Ds]=e;for(var u=e.length,d=0;d<u;d++){var f=e[d];if(f!=null&&typeof f!=`boolean`){var p,m=ac(f,t,n,r,i,a,o);typeof m==`string`?l+=m:(c||=Array(u),l&&c.push(l),l=tc,$s(m)?(p=c).push.apply(p,m):c.push(m))}}return c?(l&&c.push(l),c):l}if(e.constructor!==void 0)return tc;e.__=i,Js&&Js(e);var h=e.type,g=e.props;if(typeof h==`function`){var _,v,y,b=t;if(h===Ji){if(`tpl`in g){for(var x=tc,S=0;S<g.tpl.length;S++)if(x+=g.tpl[S],g.exprs&&S<g.exprs.length){var C=g.exprs[S];if(C==null)continue;typeof C!=`object`||C.constructor!==void 0&&!$s(C)?x+=C:x+=ac(C,t,n,r,e,a,o)}return x}if(`UNSTABLE_comment`in g)return`<!--`+zs(g.UNSTABLE_comment)+`-->`;v=g.children}else{if((_=h.contextType)!=null){var ee=t[_.__c];b=ee?ee.props.value:_.__}var te=h.prototype&&typeof h.prototype.render==`function`;if(te)v=ic(e,b),y=e[Es];else{e[Es]=y=Gs(e,b);for(var ne=0;Ls(y)&&ne++<25;){Is(y),Xs&&Xs(e);try{v=h.call(y,g,b)}catch(t){throw a&&t&&typeof t.then==`function`&&(e._suspended=!0),t}}Fs(y)}if(y.getChildContext!=null&&(t=ec({},t,y.getChildContext())),te&&q.errorBoundaries&&(h.getDerivedStateFromError||y.componentDidCatch)){v=v!=null&&v.type===Ji&&v.key==null&&v.props.tpl==null?v.props.children:v;try{return ac(v,t,n,r,e,a,!1)}catch(i){return h.getDerivedStateFromError&&(y[ks]=h.getDerivedStateFromError(i)),y.componentDidCatch&&y.componentDidCatch(i,Qs),Ls(y)?(v=ic(e,t),(y=e[Es]).getChildContext!=null&&(t=ec({},t,y.getChildContext())),ac(v=v!=null&&v.type===Ji&&v.key==null&&v.props.tpl==null?v.props.children:v,t,n,r,e,a,o)):tc}finally{Ys&&Ys(e),Zs&&Zs(e)}}}v=v!=null&&v.type===Ji&&v.key==null&&v.props.tpl==null?v.props.children:v;try{var w=ac(v,t,n,r,e,a,o);return Ys&&Ys(e),q.unmount&&q.unmount(e),e._suspended?typeof w==`string`?nc+w+rc:$s(w)?(w.unshift(nc),w.push(rc),w):w.then(function(e){return nc+e+rc}):w}catch(i){if(!a&&o&&o.onError){var re=function i(s){return o.onError(s,e,function(e,s){try{return ac(e,t,n,r,s,a,o)}catch(e){return i(e)}})}(i);if(re!==void 0)return re;var T=q.__e;return T&&T(i,e),tc}if(!a||!i||typeof i.then!=`function`)throw i;return i.then(function i(){try{var s=ac(v,t,n,r,e,a,o);return e._suspended?nc+s+rc:s}catch(e){if(!e||typeof e.then!=`function`)throw e;return e.then(i)}})}}var E,D=`<`+h,O=tc;for(var k in g){var A=g[k];if(typeof(A=sc(A)?A.value:A)!=`function`||k===`class`||k===`className`){switch(k){case`children`:E=A;continue;case`key`:case`ref`:case`__self`:case`__source`:continue;case`htmlFor`:if(`for`in g)continue;k=`for`;break;case`className`:if(`class`in g)continue;k=`class`;break;case`defaultChecked`:k=`checked`;break;case`defaultSelected`:k=`selected`;break;case`defaultValue`:case`value`:switch(k=`value`,h){case`textarea`:E=A;continue;case`select`:r=A;continue;case`option`:r!=A||`selected`in g||(D+=` selected`)}break;case`dangerouslySetInnerHTML`:O=A&&A.__html;continue;case`style`:typeof A==`object`&&(A=Us(A));break;case`acceptCharset`:k=`accept-charset`;break;case`httpEquiv`:k=`http-equiv`;break;default:if(js.test(k))k=k.replace(js,`$1:$2`).toLowerCase();else{if(As.test(k))continue;k[4]!==`-`&&!Ps.has(k)||A==null?n?Ns.test(k)&&(k=k===`panose1`?`panose-1`:k.replace(/([A-Z])/g,`-$1`).toLowerCase()):Ms.test(k)&&(k=k.toLowerCase()):A+=tc}}A!=null&&!1!==A&&(D=!0===A||A===tc?D+` `+k:D+` `+k+`="`+(typeof A==`string`?zs(A):A+tc)+`"`)}}if(As.test(h))throw Error(h+` is not a valid HTML tag name in `+D+`>`);if(O||(typeof E==`string`?O=zs(E):E!=null&&!1!==E&&!0!==E&&(O=ac(E,t,h===`svg`||h!==`foreignObject`&&n,r,e,a,o))),Ys&&Ys(e),Zs&&Zs(e),!O&&oc.has(h))return D+`/>`;var ie=`</`+h+`>`,ae=D+`>`;return $s(O)?[ae].concat(O,[ie]):typeof O==`string`?ae+O+ie:[ae,O,ie]}var oc=new Set([`area`,`base`,`br`,`col`,`command`,`embed`,`hr`,`img`,`input`,`keygen`,`link`,`meta`,`param`,`source`,`track`,`wbr`]);function sc(e){return typeof e==`object`&&!!e&&typeof e.peek==`function`&&`value`in e}var cc=0;function lc(e){return e!=null&&e.length>0?e:(cc+=1,`pst_ft_${cc}`)}function uc({initialVisibleRowCount:e,itemHeight:t}){return e==null?420:Math.max(0,e)*(t??kr)}function dc(e){if(typeof document>`u`)return;let t=document.createElement(`div`);t.innerHTML=e;let n=t.querySelector(`svg`);return n instanceof SVGElement?n:void 0}function fc(e){return e.querySelector(`#file-tree-icon-chevron`)instanceof SVGElement&&e.querySelector(`#file-tree-icon-file`)instanceof SVGElement&&e.querySelector(`#file-tree-icon-dot`)instanceof SVGElement&&e.querySelector(`#file-tree-icon-lock`)instanceof SVGElement}function pc(e){return Array.from(e.children).filter(e=>e instanceof SVGElement)}var mc=`file-tree-layout-commit`,hc=60,gc=2,_c=2;function vc(e,t){return Math.abs(e-t)<=1}var yc=class{static LoadedCustomComponent=!0;#e;#t;#n;#r;#i;#a;#o;#s;#c;#l=new Ts;#u;#d;#f;#p;#m;#h;#g;#_;#v;#y=null;#b=0;#x=null;#S=0;#C=null;#w=0;#T=null;#E=0;#D=0;#O=null;#k=null;#A=null;#j;#M=!1;#N=!1;#P=()=>{this.#O!=null&&(this.#E>0&&--this.#E,this.#q()),this.#C!=null&&this.#K()};#F=e=>{let t=this.#V();if(!(t==null||e.target!==t)&&!(this.#O==null&&this.#C==null)){if(this.#A!=null&&vc(t.scrollTop,this.#A)){this.#A=null;return}this.#A=null,this.#G(),this.#W()}};#I=()=>{this.#x=null,this.#K()};#L=()=>{this.#T=null,this.#q()};constructor(e){let{composition:t,density:n,fileTreeSearchMode:r,gitStatus:i,id:a,initialSearchQuery:o,icons:s,itemHeight:c,onSearchChange:l,onSelectionChange:u,overscan:d,renderRowDecoration:f,renaming:p,search:m,searchBlurBehavior:h,searchFakeFocus:g,stickyFolders:_,unsafeCSS:v,initialVisibleRowCount:y,...b}=e;this.#e=t,this.#n=lc(a),this.#p=Ai(i),this.#m=s,this.#h=v,this.#r=u,this.#i=f,this.#a=p!=null&&p!==!1,this.#o=h,this.#s=m===!0,this.#c=g===!0,this.#u=Or(n,c),this.#d={itemHeight:this.#u.itemHeight,overscan:d,stickyFolders:_,initialVisibleRowCount:y},this.#t=new Ti({...b,fileTreeSearchMode:r,initialSearchQuery:o,onSearchChange:l,renaming:p}),this.#v=this.#t.getSelectionVersion(),this.#y=this.#r==null?null:this.subscribe(()=>{this.#Y()})}unmount(){this.#W(),this.#G(),this.#j!=null&&(this.#j.removeEventListener(mc,this.#P),this.#j.removeEventListener(`scroll`,this.#F,!0),ws(this.#j),delete this.#j.dataset.fileTreeVirtualizedWrapper,this.#j=void 0),this.#l.clearAll(),this.#l.setHost(null),this.#f!=null&&(delete this.#f.dataset.fileTreeVirtualized,this.#ie(this.#f),this.#f=void 0)}cleanUp(){this.unmount(),this.#y?.(),this.#y=null,this.#t.destroy()}getFileTreeContainer(){return this.#f}getItem(e){return this.#t.getItem(e)}getFocusedItem(){return this.#t.getFocusedItem()}getFocusedPath(){return this.#t.getFocusedPath()}getSelectedPaths(){return this.#t.getSelectedPaths()}getVisibleCount(){return this.#t.getVisibleCount()}getScrollTop(){return this.#V()?.scrollTop??0}setScrollTop(e){this.#G(),this.#A=null,this.#b=0,this.#S=0,this.#C=Math.max(0,e),this.#K()}getScrollMetrics(){let e=this.#V();return e==null?null:{clientHeight:e.clientHeight,scrollHeight:e.scrollHeight,scrollTop:e.scrollTop}}subscribeToScroll(e){let t=this.#V();if(t==null)return()=>{};let n=()=>{e(t.scrollTop)};return t.addEventListener(`scroll`,n,{passive:!0}),()=>{t.removeEventListener(`scroll`,n)}}getComposition(){return this.#e}getItemHeight(){return this.#u.itemHeight}getDensityFactor(){return this.#u.factor}subscribe(e){let t=!1;return this.#t.subscribe(()=>{if(!t){t=!0;return}e()})}focusPath(e){this.#G(),this.#t.focusPath(e)}revealPath(e){this.#W(),this.#A=null,this.#t.focusPath(e),this.#w=0,this.#E=this.#V()==null?_c:0,this.#D=0,this.#O=e,this.#k=null,this.#q()}focusNearestPath(e){return this.#G(),this.#t.focusNearestPath(e)}add(e){this.#t.add(e)}batch(e){this.#t.batch(e)}move(e,t,n){this.#t.move(e,t,n)}onMutation(e,t){return this.#t.onMutation(e,t)}setSearch(e){this.#t.setSearch(e)}openSearch(e){this.#t.openSearch(e)}closeSearch(){this.#t.closeSearch()}isSearchOpen(){return this.#t.isSearchOpen()}getSearchValue(){return this.#t.getSearchValue()}getSearchMatchingPaths(){return this.#t.getSearchMatchingPaths()}focusNextSearchMatch(){this.#t.focusNextSearchMatch()}focusPreviousSearchMatch(){this.#t.focusPreviousSearchMatch()}startRenaming(e,t){return this.#t.startRenaming(e,t)}remove(e,t){this.#t.remove(e,t)}resetPaths(e,t){this.#t.resetPaths(e,t)}setComposition(e){this.#e=e;let t=this.#B();t!=null&&(this.#X(),Ss(t.wrapper,this.#z()))}setGitStatus(e){this.#p=Ai(e,this.#p);let t=this.#B();t!=null&&Ss(t.wrapper,this.#z())}setIcons(e){this.#m=e;let t=this.#B();t!=null&&(this.#J(t.host,t.wrapper),Ss(t.wrapper,this.#z()))}hydrate({fileTreeContainer:e}){let t=this.#ne(e),n=this.#te(t);this.#X(),Cs(n,this.#z())}render({containerWrapper:e,fileTreeContainer:t}){let n=this.#ne(t??this.#f,e),r=this.#te(n);this.#X(),Ss(r,this.#z())}#R(){return{initialViewportHeight:uc({initialVisibleRowCount:this.#d.initialVisibleRowCount,itemHeight:this.#d.itemHeight}),itemHeight:this.#d.itemHeight,overscan:this.#d.overscan,stickyFolders:this.#d.stickyFolders}}#z(){return{composition:this.#e,controller:this.#t,gitStatusByPath:this.#p?.statusByPath,ignoredGitDirectories:this.#p?.ignoredDirectoryPaths,directoriesWithGitChanges:this.#p?.directoriesWithChanges,icons:this.#m,instanceId:this.#n,renamingEnabled:this.#a,renderRowDecoration:this.#i,searchBlurBehavior:this.#o,searchEnabled:this.#s,searchFakeFocus:this.#c,slotHost:this.#l,...this.#R()}}#B(){let e=this.#f,t=this.#j;return e==null||t==null?null:{host:e,wrapper:t}}#V(){return this.#j?.querySelector(`[data-file-tree-virtualized-scroll='true']`)??null}#H(){this.#x??=(typeof window.requestAnimationFrame==`function`?window.requestAnimationFrame.bind(window):e=>window.setTimeout(e,16))(this.#I)}#U(){this.#T??=(typeof window.requestAnimationFrame==`function`?window.requestAnimationFrame.bind(window):e=>window.setTimeout(e,16))(this.#L)}#W(){this.#x!=null&&(typeof window.cancelAnimationFrame==`function`?window.cancelAnimationFrame(this.#x):window.clearTimeout(this.#x),this.#x=null),this.#b=0,this.#S=0,this.#C=null,this.#O??(this.#A=null)}#G(){this.#T!=null&&(typeof window.cancelAnimationFrame==`function`?window.cancelAnimationFrame(this.#T):window.clearTimeout(this.#T),this.#T=null),this.#w=0,this.#E=0,this.#D=0,this.#O=null,this.#k=null,this.#C??(this.#A=null)}#K(){let e=this.#C;if(e==null)return;let t=this.#V();if(t==null)this.#S=0;else{let n=Math.max(0,t.scrollHeight-t.clientHeight);if(e<=n||vc(n,e))if(this.#A=e,t.scrollTop=e,vc(t.scrollTop,e)){if(this.#S+=1,this.#S>=gc){this.#W();return}}else this.#S=0;else this.#S=0}if(this.#b>=hc){this.#W();return}this.#b+=1,this.#H()}#q(){let e=this.#O;if(e==null)return;let t=this.#V();if(t==null)this.#D=0,this.#k=null;else{this.#t.focusPath(e);let n=this.#t.getFocusedIndex();if(n===-1)this.#D=0,this.#k=null;else{let r=Po(this.#t,this.#u.itemHeight,this.#d.overscan,t.scrollTop,this.#d.stickyFolders===!0,t.clientHeight||420),i=this.#k!=null&&vc(this.#k,r);this.#k=r;let a=t.clientHeight||420,o=this.#t.getVisibleCount()*this.#u.itemHeight,s=$a({currentScrollTop:t.scrollTop,focusedIndex:n,itemHeight:this.#u.itemHeight,targetViewportOffset:r,totalHeight:o,viewportHeight:a});if(s!=null&&(this.#A=s,t.scrollTop=s),this.#E===0&&i&&$a({currentScrollTop:t.scrollTop,focusedIndex:n,itemHeight:this.#u.itemHeight,targetViewportOffset:r,totalHeight:o,viewportHeight:a})==null&&this.#t.getFocusedPath()===e){if(this.#D+=1,this.#D>=gc){this.#G();return}}else this.#D=0}}if(this.#w>=hc){this.#G();return}this.#w+=1,this.#U()}#J(e,t){let n=e.shadowRoot;n!=null&&(this.#Z(n),this.#Q(n)),this.#$(t)}#Y(){let e=this.#r;if(e==null)return;let t=this.#t.getSelectionVersion();t!==this.#v&&(this.#v=t,e(this.#t.getSelectedPaths()))}#X(){let e=this.#e?.header?.render;if(e!=null){this.#l.setSlotContent(ae,e());return}this.#l.setSlotHtml(ae,this.#e?.header?.html??null)}#Z(e){let t=pc(e).find(e=>fc(e)),n=dc(te(ne(this.#m).set));n!=null&&(t!=null&&t.outerHTML===n.outerHTML||(t==null?e.prepend(n):t.replaceWith(n)))}#Q(e){let t=pc(e),n=t.find(e=>fc(e)),r=t.filter(e=>e!==n),i=ne(this.#m).spriteSheet?.trim()??``;if(i.length===0){for(let e of r)e.remove();return}let a=dc(i);if(a==null){for(let e of r)e.remove();return}if(!(r.length===1&&r[0].outerHTML===a.outerHTML)){for(let e of r)e.remove();e.appendChild(a)}}#$(e){let t=ne(this.#m);t.colored&&ee(t.set)?e.dataset.fileTreeColoredIcons=`true`:delete e.dataset.fileTreeColoredIcons}#ee(e){let t=e.querySelector(`style[${O}]`);if(this.#g==null&&t instanceof HTMLStyleElement&&(this.#g=t),this.#h==null||this.#h===``){this.#g?.remove(),this.#g=void 0,this.#_=void 0;return}this.#g?.parentNode===e&&this.#_===this.#h||(this.#g??=document.createElement(`style`),this.#g.setAttribute(O,``),this.#g.parentNode!==e&&e.appendChild(this.#g),this.#g.textContent=Nr(this.#h),this.#_=this.#h)}#te(e){if(this.#j!=null)return this.#j;let t=e.shadowRoot;if(t==null)throw Error(`FileTree requires a shadow root`);let n=Array.from(t.children).filter(e=>e instanceof HTMLDivElement&&typeof e.dataset.fileTreeId==`string`&&e.dataset.fileTreeId.length>0),r=n.find(e=>e.dataset.fileTreeId===this.#n)??n[0];return r!=null&&(this.#n=r.dataset.fileTreeId??this.#n),this.#j=r??document.createElement(`div`),this.#j.dataset.fileTreeId=this.#n,this.#j.dataset.fileTreeVirtualizedWrapper=`true`,this.#j.addEventListener(mc,this.#P),this.#j.addEventListener(`scroll`,this.#F,!0),this.#J(e,this.#j),this.#j.parentNode!==t&&t.appendChild(this.#j),this.#j}#ne(e,t){let n=e??this.#f??document.createElement(`file-tree-container`);t!=null&&n.parentNode!==t&&t.appendChild(n);let r=n.shadowRoot??n.attachShadow({mode:`open`});return zr(n,r),this.#ee(r),n.dataset.fileTreeVirtualized=`true`,n.style.display=`flex`,this.#re(n),this.#l.setHost(n),this.#f=n,n}#re(e){e.style.getPropertyValue(`--trees-item-height`)===``&&(e.style.setProperty(`--trees-item-height`,`${String(this.#u.itemHeight)}px`),this.#M=!0),e.style.getPropertyValue(`--trees-density-override`)===``&&(e.style.setProperty(`--trees-density-override`,String(this.#u.factor)),this.#N=!0)}#ie(e){this.#M&&=(e.style.removeProperty(`--trees-item-height`),!1),this.#N&&=(e.style.removeProperty(`--trees-density-override`),!1)}},Q=e(n(),1),$=r(),bc=typeof window>`u`?Q.useEffect:Q.useLayoutEffect;function xc(e,t,n){let r=e==null?null:(0,$.jsx)(`div`,{slot:ae,children:e}),i=t!=null&&n!=null?(0,$.jsx)(`div`,{slot:oe,children:t(n.item,n.context)}):null;return r==null&&i==null?null:(0,$.jsxs)($.Fragment,{children:[r,i]})}function Sc(e,t){return typeof window>`u`&&t!=null?(0,$.jsxs)($.Fragment,{children:[(0,$.jsx)(`template`,{shadowrootmode:`open`,dangerouslySetInnerHTML:{__html:t.shadowHtml}}),e]}):(0,$.jsx)($.Fragment,{children:e})}function Cc(e){let t=e.shadowRoot;return t?.querySelector(`[data-file-tree-id]`)instanceof HTMLElement||t?.querySelector(`[data-file-tree-id]`)instanceof SVGElement?!0:e.querySelector(`template[shadowrootmode="open"]`)instanceof HTMLTemplateElement}function wc(e,t,n,r,i){let a={...e??{}};if(t!=null&&delete a.header,n){let t=e?.contextMenu,n=t?.onClose,o=t?.onOpen;a.contextMenu={...t??{},enabled:!0,onClose:()=>{n?.(),r()},onOpen:(e,t)=>{i(e,t),o?.(e,t)}},delete a.contextMenu.render}return a.header!=null||a.contextMenu!=null?a:void 0}function Tc({header:e,id:t,model:n,preloadedData:r,renderContextMenu:i,...a}){let[o,s]=(0,Q.useState)(null),[c,l]=(0,Q.useState)(null),u=(0,Q.useRef)(n.getComposition()),d=(0,Q.useRef)(n);d.current!==n&&(d.current=n,u.current=n.getComposition());let f=i!=null,p=(0,Q.useCallback)(()=>{s(null)},[]),m=(0,Q.useCallback)((e,t)=>{s({context:t,item:e})},[]),h=u.current,g=(0,Q.useMemo)(()=>wc(h,e,f,p,m),[h,p,m,f,e]),_=(0,Q.useCallback)(e=>{l(e)},[]);(0,Q.useEffect)(()=>{f||s(null)},[f]),bc(()=>{n.setComposition(g)},[g,n]),bc(()=>{if(c!=null)return r!=null&&Cc(c)?n.hydrate({fileTreeContainer:c}):n.render({fileTreeContainer:c}),()=>{n.unmount(),n.setComposition(h)}},[h,c,n,r]);let v=Sc(xc(e,i,o),r),y=t??r?.id,b={"--trees-item-height":`${String(n.getItemHeight())}px`,"--trees-density-override":n.getDensityFactor(),...a.style};return(0,$.jsx)(E,{...a,id:y,ref:_,style:b,suppressHydrationWarning:r!=null,children:v})}function Ec(e){let t=(0,Q.useRef)(null);return t.current??=new yc(e),(0,Q.useEffect)(()=>{let e=t.current;return()=>{e?.cleanUp(),t.current=null}},[]),{model:t.current}}function Dc({idPrefix:e,messages:t,onOpenInTarget:n,primaryTarget:r,visibleTargets:i}){return r==null?[]:[{id:`${e}-primary`,message:t.openInTarget,messageValues:{target:r.label},icon:r.icon,onSelect:()=>n(r.target,r.appPath)},{id:`${e}-targets`,message:t.openIn,submenu:i.map(r=>({id:`${e}-target-${r.id}`,message:t.openInTargetSubmenu,messageValues:{target:r.label},icon:r.icon,onSelect:()=>n(r.target,r.appPath)}))}]}function Oc({isLoadingOpenTargets:e=!1,onAddToChat:t,onCopyPath:n,onOpenInTarget:r,primaryTarget:i,targetPath:a,visibleTargets:o}){if(a==null)return[];let s=n==null?`workspace`:`review`,c=[];return n!=null&&c.push({id:`copy-path`,message:f({id:`codex.review.fileTree.contextMenu.copyPath`,defaultMessage:`Copy path`,description:`Context menu action to copy the path of a file tree item`}),onSelect:()=>{n(a)}}),t!=null&&c.push({id:`add-to-chat`,message:f({id:`threadSidePanel.workspaceBrowser.addToChat`,defaultMessage:`Add to chat`,description:`Context menu action for adding a file from the file tree to the current chat`}),onSelect:()=>{t(a)}}),e?[{id:`open-in-loading`,message:jc(s),tooltipMessage:f({id:`threadSidePanel.workspaceBrowser.openIn.loading`,defaultMessage:`Loading available apps…`,description:`Tooltip shown when the file tree is still loading app options for opening a file`}),enabled:!1},{id:`open-in-separator`,type:`separator`},...c]:i==null?c:[...Dc({idPrefix:kc(s),messages:Ac(s),onOpenInTarget:(e,t)=>{r(e,t,a)},primaryTarget:i,visibleTargets:o}),{id:`open-in-separator`,type:`separator`},...c]}function kc(e){switch(e){case`review`:return`review-file-tree-open`;case`workspace`:return`workspace-directory-tree-open`}}function Ac(e){switch(e){case`review`:return{openInTarget:f({id:`codex.review.fileTree.contextMenu.openInTarget`,defaultMessage:`Open in {target}`,description:`Context menu action to open a review file in the preferred app`}),openIn:jc(e),openInTargetSubmenu:f({id:`codex.review.fileTree.contextMenu.openWithTarget`,defaultMessage:`{target}`,description:`Context menu action to open a review file in a specific app`})};case`workspace`:return{openInTarget:f({id:`threadSidePanel.workspaceBrowser.openInTarget`,defaultMessage:`Open in {target}`,description:`Context menu action to open a workspace browser file in the preferred app`}),openIn:jc(e),openInTargetSubmenu:f({id:`threadSidePanel.workspaceBrowser.openInTargetSubmenu`,defaultMessage:`{target}`,description:`Context menu action to open a workspace browser file in a specific app`})}}}function jc(e){switch(e){case`review`:return f({id:`codex.review.fileTree.contextMenu.openWith`,defaultMessage:`Open with`,description:`Context menu submenu label for choosing an app to open a review file`});case`workspace`:return f({id:`threadSidePanel.workspaceBrowser.openIn`,defaultMessage:`Open in…`,description:`Context menu submenu label for choosing an app to open a workspace browser file`})}}function Mc(e){for(let t of e.composedPath()){if(!(t instanceof Element)||t.getAttribute(`data-item-type`)!==`file`)continue;let e=t.getAttribute(`data-item-path`);if(e)return e}return null}var Nc=d(),Pc=28,Fc=60;function Ic(e){let n=(0,Nc.c)(105),{autoHeight:r,cwd:i,decorationIcons:o,flattenEmptyDirectories:s,hostId:c,icons:u,initialExpandedPaths:d,initialScrollTop:f,onClick:p,onDoubleClick:m,onExpandedPathsChange:b,onSelectionChange:S,onStateChange:C,paths:ee,revealSelectedPath:te,renderRowDecoration:ne,resetKey:w,selectedPath:E}=e,D=r===void 0?!1:r,O=s===void 0?!1:s,k=f===void 0?0:f,A=te===void 0?!1:te,ie=_(g()),{platform:ae}=h(),oe=l(`add-context-file`),se=a(),ce;n[0]!==i||n[1]!==c?(ce={cwd:i,hostId:c},n[0]=i,n[1]=c,n[2]=ce):ce=n[2];let le=re(ce),ue;n[3]===ee?ue=n[4]:(ue=ee.map(Lc),n[3]=ee,n[4]=ue);let j=ue,de;if(n[5]!==i||n[6]!==ee||n[7]!==ae){de=new Map;for(let e of ee)typeof e!=`string`&&de.set(e.displayPath,t(i??``,e.path,ae===`windows`));n[5]=i,n[6]=ee,n[7]=ae,n[8]=de}else de=n[8];let M=de,fe;n[9]!==o||n[10]!==u?(fe=Rc(u,o),n[9]=o,n[10]=u,n[11]=fe):fe=n[11];let N=fe,pe=(0,Q.useRef)(null),me;n[12]===d?me=n[13]:(me=Array.from(d??[]),n[12]=d,n[13]=me);let he=(0,Q.useRef)(me),ge=(0,Q.useRef)(null),_e=(0,Q.useRef)(k),ve=(0,Q.useRef)(E??null),ye;n[14]===C?ye=n[15]:(ye=()=>{C?.({expandedPaths:he.current,scrollTop:_e.current,selectedPath:ve.current})},n[14]=C,n[15]=ye);let be=v(ye),xe;n[16]!==b||n[17]!==be?(xe=e=>{he.current=e,b?.(e),be()},n[16]=b,n[17]=be,n[18]=xe):xe=n[18];let Se=v(xe),Ce;n[19]!==S||n[20]!==be?(Ce=e=>{ve.current=e[0]??null,S?.(e),be()},n[19]=S,n[20]=be,n[21]=Ce):Ce=n[21];let P=v(Ce),F;n[22]===E?F=n[23]:(F=E==null?void 0:[E],n[22]=E,n[23]=F);let we;n[24]!==N||n[25]!==O||n[26]!==P||n[27]!==d||n[28]!==ne||n[29]!==F||n[30]!==j?(we={fileTreeSearchMode:`hide-non-matches`,flattenEmptyDirectories:O,icons:N,initialExpandedPaths:d,initialSelectedPaths:F,itemHeight:Pc,onSelectionChange:P,paths:j,renderRowDecoration:ne,search:!1,stickyFolders:!0,unsafeCSS:`
      :host {
        --trees-bg-override: var(--color-token-main-surface-primary);
        --trees-bg-muted-override: var(--color-token-list-hover-background);
        --trees-border-color-override: var(--color-token-border);
        --trees-fg-override: var(--color-token-foreground);
        --trees-font-size-override: 13px;
        --trees-focus-ring-color-override: var(--color-token-list-focus-outline);
        --trees-item-padding-x-override: 6px;
        --trees-item-margin-x-override: 0px;
        --trees-level-gap-override: 0px;
        --trees-padding-inline-override: 0px;
        --trees-scrollbar-gutter-override: 0px;
        --trees-scrollbar-gutter-measured: 0px;
        --trees-selected-bg-override: var(--color-token-list-active-selection-background);
        --trees-selected-fg-override: var(--color-token-list-active-selection-foreground);
        --trees-item-row-gap-override: 10px;
      }

      [data-file-tree-sticky-overlay-content='true'],
      [data-file-tree-sticky-row='true'] {
        background-color: var(--color-token-main-surface-primary);
      }

      [data-file-tree-virtualized-scroll='true'] {
        scrollbar-gutter: auto;
      }

      [role="treeitem"] {
        cursor: var(--cursor-interaction) !important;
      }

      [role="treeitem"] * {
        cursor: var(--cursor-interaction) !important;
      }

      [data-item-type='file']:has([data-item-section='content']:empty) {
        display: none;
      }
    `},n[24]=N,n[25]=O,n[26]=P,n[27]=d,n[28]=ne,n[29]=F,n[30]=j,n[31]=we):we=n[31];let{model:I}=Ec(we),Te;n[32]===I?Te=n[33]:(Te=()=>I.getVisibleCount(),n[32]=I,n[33]=Te);let[L,Ee]=(0,Q.useState)(Te),De;n[34]!==d||n[35]!==k||n[36]!==I||n[37]!==A||n[38]!==E||n[39]!==j?(De=()=>{he.current=Array.from(d??[]),ge.current=null,I.resetPaths(j,{initialExpandedPaths:d}),Ee(I.getVisibleCount()),k>0&&!(A&&E!=null)?(_e.current=k,I.setScrollTop(k)):_e.current=0},n[34]=d,n[35]=k,n[36]=I,n[37]=A,n[38]=E,n[39]=j,n[40]=De):De=n[40];let Oe;n[41]!==d||n[42]!==k||n[43]!==I||n[44]!==w||n[45]!==A||n[46]!==E||n[47]!==j?(Oe=[d,k,I,w,A,E,j],n[41]=d,n[42]=k,n[43]=I,n[44]=w,n[45]=A,n[46]=E,n[47]=j,n[48]=Oe):Oe=n[48],(0,Q.useEffect)(De,Oe);let ke;n[49]!==I||n[50]!==A||n[51]!==E?(ke=()=>{if(ve.current=E??null,Wc(I,E),!A||E==null){ge.current=null;return}ge.current!==E&&Gc(I,E)&&(ge.current=E)},n[49]=I,n[50]=A,n[51]=E,n[52]=ke):ke=n[52];let Ae;n[53]!==I||n[54]!==A||n[55]!==E||n[56]!==j?(Ae=[I,A,E,j],n[53]=I,n[54]=A,n[55]=E,n[56]=j,n[57]=Ae):Ae=n[57],(0,Q.useEffect)(ke,Ae);let R,je;n[58]!==N||n[59]!==I?(R=()=>{I.setIcons(N)},je=[N,I],n[58]=N,n[59]=I,n[60]=R,n[61]=je):(R=n[60],je=n[61]),(0,Q.useEffect)(R,je);let Me,Ne;n[62]!==Se||n[63]!==I||n[64]!==j?(Me=()=>I.subscribe(()=>{Ee(e=>{let t=I.getVisibleCount();return e===t?e:t}),_e.current=I.getScrollTop(),Se(Uc(I,j))}),Ne=[Se,I,j],n[62]=Se,n[63]=I,n[64]=j,n[65]=Me,n[66]=Ne):(Me=n[65],Ne=n[66]),(0,Q.useEffect)(Me,Ne);let Pe,z;n[67]!==I||n[68]!==be?(Pe=()=>{let e=null,t=0,n=null,r=e=>{_e.current=e,be()},i=()=>{if(e=null,I.getScrollMetrics()!=null){n=I.subscribeToScroll(r);return}t>=Fc||(t+=1,e=window.requestAnimationFrame(i))};return i(),()=>{e!=null&&window.cancelAnimationFrame(e),n?.()}},z=[I,be],n[67]=I,n[68]=be,n[69]=Pe,n[70]=z):(Pe=n[69],z=n[70]),(0,Q.useEffect)(Pe,z);let Fe;n[71]!==i||n[72]!==c?(Fe=(0,$.jsx)(T,{cwd:i,hostId:c}),n[71]=i,n[72]=c,n[73]=Fe):Fe=n[73];let Ie;n[74]!==oe||n[75]!==i||n[76]!==le||n[77]!==c||n[78]!==se||n[79]!==M?(Ie=()=>{let e=Hc(M,pe.current);return Oc({...Bc({cwd:i,fallbackOpenTargets:le,hostId:c,queryClient:se,targetPath:e}),onAddToChat:c==null?void 0:e=>{oe.mutateAsync({hostId:c,path:e})},onCopyPath:x,onOpenInTarget:(e,t,n)=>{le.open(e,{appPath:t,persistPreferred:!1,path:n})},targetPath:e})},n[74]=oe,n[75]=i,n[76]=le,n[77]=c,n[78]=se,n[79]=M,n[80]=Ie):Ie=n[80];let Le;n[81]!==i||n[82]!==c||n[83]!==se||n[84]!==M?(Le=()=>Vc({cwd:i,hostId:c,queryClient:se,targetPath:Hc(M,pe.current)}),n[81]=i,n[82]=c,n[83]=se,n[84]=M,n[85]=Le):Le=n[85];let Re;n[86]===Symbol.for(`react.memo_cache_sentinel`)?(Re=e=>{pe.current=Mc(e.nativeEvent)},n[86]=Re):Re=n[86];let ze;n[87]!==D||n[88]!==L?(ze=D?{height:`${L*Pc}px`}:{},n[87]=D,n[88]=L,n[89]=ze):ze=n[89];let Be;n[90]!==ie||n[91]!==ze?(Be={backgroundColor:`var(--color-token-main-surface-primary)`,color:`var(--color-token-foreground)`,colorScheme:ie,...ze,width:`100%`},n[90]=ie,n[91]=ze,n[92]=Be):Be=n[92];let Ve;n[93]!==I||n[94]!==p||n[95]!==m||n[96]!==Be?(Ve=(0,$.jsx)(Tc,{"data-tab-preview-pin-exempt":!0,onClick:p,onContextMenu:Re,onDoubleClick:m,model:I,style:Be}),n[93]=I,n[94]=p,n[95]=m,n[96]=Be,n[97]=Ve):Ve=n[97];let He;n[98]!==Ie||n[99]!==Le||n[100]!==Ve?(He=(0,$.jsx)(y,{awaitBeforeOpen:!1,getItems:Ie,onBeforeOpen:Le,children:Ve}),n[98]=Ie,n[99]=Le,n[100]=Ve,n[101]=He):He=n[101];let Ue;return n[102]!==Fe||n[103]!==He?(Ue=(0,$.jsxs)($.Fragment,{children:[Fe,He]}),n[102]=Fe,n[103]=He,n[104]=Ue):Ue=n[104],Ue}function Lc(e){return typeof e==`string`?e:e.displayPath}function Rc(e,t){if(t==null||t.length===0)return e;let n=t.map(e=>`<symbol id="${e.name}" viewBox="${e.viewBox??`0 0 ${e.width??0} ${e.height??0}`}">${e.body}</symbol>`).join(``),r=zc(typeof e==`string`?void 0:e?.spriteSheet,n);return e==null?{set:`complete`,spriteSheet:r}:typeof e==`string`?{set:e,spriteSheet:r}:{...e,spriteSheet:r}}function zc(e,t){return e==null?`<svg data-icon-sprite aria-hidden="true" width="0" height="0" xmlns="http://www.w3.org/2000/svg">${t}</svg>`:e.replace(`</svg>`,`${t}</svg>`)}function Bc({cwd:e,fallbackOpenTargets:t,hostId:n,queryClient:r,targetPath:i}){if(i==null)return{isLoadingOpenTargets:!1,primaryTarget:null,visibleTargets:[]};let a=u(`open-in-targets`,{cwd:e,hostId:n,path:i}),o=r.getQueryData(a),s=o?.targets??t.targets,c=o?.availableTargets??t.availableTargets,l=o?.preferredTarget??t.preferredTarget,d=o?.mode??t.mode;return{isLoadingOpenTargets:o==null&&!t.hasLoadedTargets&&r.getQueryState(a)?.status!==`error`,primaryTarget:C({preferredTarget:l,targets:s,availableTargets:c,mode:d}),visibleTargets:S({targets:s,availableTargets:c,includeHiddenTargets:!0,mode:d})}}function Vc({cwd:e,hostId:t,queryClient:n,targetPath:r}){if(r!=null)return n.prefetchQuery({gcTime:s.INFINITE,queryKey:u(`open-in-targets`,{cwd:e,hostId:t,path:r}),queryFn:()=>c(`open-in-targets`,{params:{cwd:e,hostId:t,path:r}}),staleTime:s.ONE_MINUTE})}function Hc(e,t){return t==null?null:e.get(t)??t}function Uc(e,t){let n=[];for(let r of t){if(!r.endsWith(`/`))continue;let t=r.slice(0,-1),i=e.getItem(t);i==null||!Kc(i)||!i.isExpanded()||n.push(t)}return n}function Wc(e,t){let n=e.getSelectedPaths();if(t==null){for(let t of n)e.getItem(t)?.deselect();return}if(!(n.length===1&&n[0]===t)){for(let t of n)e.getItem(t)?.deselect();e.getItem(t)?.select()}}function Gc(e,t){return e.getItem(t)==null?!1:(e.revealPath(t),!0)}function Kc(e){return e.isDirectory()}function qc(e){let t=(0,Nc.c)(23),{autoFocus:n,inputId:r,inputRef:a,onQueryChange:s,searchQuery:c}=e,l=r===void 0?`file-tree-search`:r,u=o(),d;t[0]===Symbol.for(`react.memo_cache_sentinel`)?(d=(0,$.jsx)(i,{id:`codex.fileTreeSearch.label`,defaultMessage:`Filter files`,description:`Label for a file tree filter input`}),t[0]=d):d=t[0];let f;t[1]===l?f=t[2]:(f=(0,$.jsx)(`label`,{className:`sr-only`,htmlFor:l,children:d}),t[1]=l,t[2]=f);let h;t[3]===Symbol.for(`react.memo_cache_sentinel`)?(h=(0,$.jsx)(b,{className:`icon-xs ms-2 shrink-0 text-token-input-placeholder-foreground`}),t[3]=h):h=t[3];let g;t[4]===s?g=t[5]:(g=e=>s(e.target.value),t[4]=s,t[5]=g);let _;t[6]===u?_=t[7]:(_=u.formatMessage({id:`codex.fileTreeSearch.placeholder`,defaultMessage:`Filter files…`,description:`Placeholder text for a file tree filter input`}),t[6]=u,t[7]=_);let v;t[8]!==n||t[9]!==l||t[10]!==a||t[11]!==c||t[12]!==g||t[13]!==_?(v=(0,$.jsx)(`input`,{autoFocus:n,id:l,ref:a,className:`w-full appearance-none border-none bg-transparent py-0 ps-0 pe-1.5 text-token-foreground ring-0 outline-none placeholder:text-token-input-placeholder-foreground focus:border-none focus:ring-0 focus:outline-none`,type:`text`,value:c,onChange:g,placeholder:_}),t[8]=n,t[9]=l,t[10]=a,t[11]=c,t[12]=g,t[13]=_,t[14]=v):v=t[14];let y;t[15]!==u||t[16]!==s||t[17]!==c.length?(y=c.length>0?(0,$.jsx)(p,{"aria-label":u.formatMessage({id:`codex.fileTreeSearch.clear`,defaultMessage:`Clear file filter`,description:`Button label to clear a file tree filter input`}),className:`text-token-input-placeholder-foreground hover:text-token-foreground`,color:`ghost`,size:`icon`,onClick:()=>s(``),children:(0,$.jsx)(m,{className:`icon-2xs`})}):null,t[15]=u,t[16]=s,t[17]=c.length,t[18]=y):y=t[18];let x;return t[19]!==f||t[20]!==v||t[21]!==y?(x=(0,$.jsxs)(`div`,{className:`relative flex h-token-button-composer w-full items-center gap-1.5 rounded-lg border border-token-border bg-token-bg-fog text-base leading-[18px]`,children:[f,h,v,y]}),t[19]=f,t[20]=v,t[21]=y,t[22]=x):x=t[22],x}export{Dc as i,Ic as n,Mc as r,qc as t};
//# sourceMappingURL=file-tree-search-input-Cg1SVtq4.js.map