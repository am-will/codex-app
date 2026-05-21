import{_ as e,a as t,c as n,d as r,f as i,g as a,h as o,i as s,l as c,m as l,n as u,o as d,p as f,r as p,s as m,t as h,u as g,v as _}from"./dist-DKw7CFJp.js";var v,y,b,x,S,ee,C,te,w,ne,T,re,ie,ae={},oe=[],se=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,ce=Array.isArray;function le(e,t){for(var n in t)e[n]=t[n];return e}function ue(e){e&&e.parentNode&&e.parentNode.removeChild(e)}function E(e,t,n){var r,i,a,o={};for(a in t)a==`key`?r=t[a]:a==`ref`?i=t[a]:o[a]=t[a];if(arguments.length>2&&(o.children=arguments.length>3?v.call(arguments,2):n),typeof e==`function`&&e.defaultProps!=null)for(a in e.defaultProps)o[a]===void 0&&(o[a]=e.defaultProps[a]);return de(e,o,r,i,null)}function de(e,t,n,r,i){var a={type:e,props:t,key:n,ref:r,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:i??++b,__i:-1,__u:0};return i==null&&y.vnode!=null&&y.vnode(a),a}function D(e){return e.children}function fe(e,t){this.props=e,this.context=t}function pe(e,t){if(t==null)return e.__?pe(e.__,e.__i+1):null;for(var n;t<e.__k.length;t++)if((n=e.__k[t])!=null&&n.__e!=null)return n.__e;return typeof e.type==`function`?pe(e):null}function me(e){if(e.__P&&e.__d){var t=e.__v,n=t.__e,r=[],i=[],a=le({},t);a.__v=t.__v+1,y.vnode&&y.vnode(a),Ee(e.__P,a,t,e.__n,e.__P.namespaceURI,32&t.__u?[n]:null,r,n??pe(t),!!(32&t.__u),i),a.__v=t.__v,a.__.__k[a.__i]=a,Oe(r,a,i),t.__e=t.__=null,a.__e!=n&&he(a)}}function he(e){if((e=e.__)!=null&&e.__c!=null)return e.__e=e.__c.base=null,e.__k.some(function(t){if(t!=null&&t.__e!=null)return e.__e=e.__c.base=t.__e}),he(e)}function ge(e){(!e.__d&&(e.__d=!0)&&S.push(e)&&!_e.__r++||ee!=y.debounceRendering)&&((ee=y.debounceRendering)||C)(_e)}function _e(){try{for(var e,t=1;S.length;)S.length>t&&S.sort(te),e=S.shift(),t=S.length,me(e)}finally{S.length=_e.__r=0}}function ve(e,t,n,r,i,a,o,s,c,l,u){var d,f,p,m,h,g,_,v=r&&r.__k||oe,y=t.length;for(c=ye(n,t,v,c,y),d=0;d<y;d++)(p=n.__k[d])!=null&&(f=p.__i!=-1&&v[p.__i]||ae,p.__i=d,g=Ee(e,p,f,i,a,o,s,c,l,u),m=p.__e,p.ref&&f.ref!=p.ref&&(f.ref&&je(f.ref,null,p),u.push(p.ref,p.__c||m,p)),h==null&&m!=null&&(h=m),(_=!!(4&p.__u))||f.__k===p.__k?c=be(p,c,e,_):typeof p.type==`function`&&g!==void 0?c=g:m&&(c=m.nextSibling),p.__u&=-7);return n.__e=h,c}function ye(e,t,n,r,i){var a,o,s,c,l,u=n.length,d=u,f=0;for(e.__k=Array(i),a=0;a<i;a++)(o=t[a])!=null&&typeof o!=`boolean`&&typeof o!=`function`?(typeof o==`string`||typeof o==`number`||typeof o==`bigint`||o.constructor==String?o=e.__k[a]=de(null,o,null,null,null):ce(o)?o=e.__k[a]=de(D,{children:o},null,null,null):o.constructor===void 0&&o.__b>0?o=e.__k[a]=de(o.type,o.props,o.key,o.ref?o.ref:null,o.__v):e.__k[a]=o,c=a+f,o.__=e,o.__b=e.__b+1,s=null,(l=o.__i=Se(o,n,c,d))!=-1&&(d--,(s=n[l])&&(s.__u|=2)),s==null||s.__v==null?(l==-1&&(i>u?f--:i<u&&f++),typeof o.type!=`function`&&(o.__u|=4)):l!=c&&(l==c-1?f--:l==c+1?f++:(l>c?f--:f++,o.__u|=4))):e.__k[a]=null;if(d)for(a=0;a<u;a++)(s=n[a])!=null&&!(2&s.__u)&&(s.__e==r&&(r=pe(s)),Me(s,s));return r}function be(e,t,n,r){var i,a;if(typeof e.type==`function`){for(i=e.__k,a=0;i&&a<i.length;a++)i[a]&&(i[a].__=e,t=be(i[a],t,n,r));return t}e.__e!=t&&(r&&(t&&e.type&&!t.parentNode&&(t=pe(e)),n.insertBefore(e.__e,t||null)),t=e.__e);do t&&=t.nextSibling;while(t!=null&&t.nodeType==8);return t}function xe(e,t){return t||=[],e==null||typeof e==`boolean`||(ce(e)?e.some(function(e){xe(e,t)}):t.push(e)),t}function Se(e,t,n,r){var i,a,o,s=e.key,c=e.type,l=t[n],u=l!=null&&(2&l.__u)==0;if(l===null&&s==null||u&&s==l.key&&c==l.type)return n;if(r>(u?1:0)){for(i=n-1,a=n+1;i>=0||a<t.length;)if((l=t[o=i>=0?i--:a++])!=null&&!(2&l.__u)&&s==l.key&&c==l.type)return o}return-1}function Ce(e,t,n){t[0]==`-`?e.setProperty(t,n??``):e[t]=n==null?``:typeof n!=`number`||se.test(t)?n:n+`px`}function we(e,t,n,r,i){var a,o;n:if(t==`style`)if(typeof n==`string`)e.style.cssText=n;else{if(typeof r==`string`&&(e.style.cssText=r=``),r)for(t in r)n&&t in n||Ce(e.style,t,``);if(n)for(t in n)r&&n[t]==r[t]||Ce(e.style,t,n[t])}else if(t[0]==`o`&&t[1]==`n`)a=t!=(t=t.replace(w,`$1`)),o=t.toLowerCase(),t=o in e||t==`onFocusOut`||t==`onFocusIn`?o.slice(2):t.slice(2),e.l||={},e.l[t+a]=n,n?r?n.u=r.u:(n.u=ne,e.addEventListener(t,a?re:T,a)):e.removeEventListener(t,a?re:T,a);else{if(i==`http://www.w3.org/2000/svg`)t=t.replace(/xlink(H|:h)/,`h`).replace(/sName$/,`s`);else if(t!=`width`&&t!=`height`&&t!=`href`&&t!=`list`&&t!=`form`&&t!=`tabIndex`&&t!=`download`&&t!=`rowSpan`&&t!=`colSpan`&&t!=`role`&&t!=`popover`&&t in e)try{e[t]=n??``;break n}catch{}typeof n==`function`||(n==null||!1===n&&t[4]!=`-`?e.removeAttribute(t):e.setAttribute(t,t==`popover`&&n==1?``:n))}}function Te(e){return function(t){if(this.l){var n=this.l[t.type+e];if(t.t==null)t.t=ne++;else if(t.t<n.u)return;return n(y.event?y.event(t):t)}}}function Ee(e,t,n,r,i,a,o,s,c,l){var u,d,f,p,m,h,g,_,v,b,x,S,ee,C,te,w=t.type;if(t.constructor!==void 0)return null;128&n.__u&&(c=!!(32&n.__u),a=[s=t.__e=n.__e]),(u=y.__b)&&u(t);n:if(typeof w==`function`)try{if(_=t.props,v=w.prototype&&w.prototype.render,b=(u=w.contextType)&&r[u.__c],x=u?b?b.props.value:u.__:r,n.__c?g=(d=t.__c=n.__c).__=d.__E:(v?t.__c=d=new w(_,x):(t.__c=d=new fe(_,x),d.constructor=w,d.render=Ne),b&&b.sub(d),d.state||={},d.__n=r,f=d.__d=!0,d.__h=[],d._sb=[]),v&&d.__s==null&&(d.__s=d.state),v&&w.getDerivedStateFromProps!=null&&(d.__s==d.state&&(d.__s=le({},d.__s)),le(d.__s,w.getDerivedStateFromProps(_,d.__s))),p=d.props,m=d.state,d.__v=t,f)v&&w.getDerivedStateFromProps==null&&d.componentWillMount!=null&&d.componentWillMount(),v&&d.componentDidMount!=null&&d.__h.push(d.componentDidMount);else{if(v&&w.getDerivedStateFromProps==null&&_!==p&&d.componentWillReceiveProps!=null&&d.componentWillReceiveProps(_,x),t.__v==n.__v||!d.__e&&d.shouldComponentUpdate!=null&&!1===d.shouldComponentUpdate(_,d.__s,x)){t.__v!=n.__v&&(d.props=_,d.state=d.__s,d.__d=!1),t.__e=n.__e,t.__k=n.__k,t.__k.some(function(e){e&&(e.__=t)}),oe.push.apply(d.__h,d._sb),d._sb=[],d.__h.length&&o.push(d);break n}d.componentWillUpdate!=null&&d.componentWillUpdate(_,d.__s,x),v&&d.componentDidUpdate!=null&&d.__h.push(function(){d.componentDidUpdate(p,m,h)})}if(d.context=x,d.props=_,d.__P=e,d.__e=!1,S=y.__r,ee=0,v)d.state=d.__s,d.__d=!1,S&&S(t),u=d.render(d.props,d.state,d.context),oe.push.apply(d.__h,d._sb),d._sb=[];else do d.__d=!1,S&&S(t),u=d.render(d.props,d.state,d.context),d.state=d.__s;while(d.__d&&++ee<25);d.state=d.__s,d.getChildContext!=null&&(r=le(le({},r),d.getChildContext())),v&&!f&&d.getSnapshotBeforeUpdate!=null&&(h=d.getSnapshotBeforeUpdate(p,m)),C=u!=null&&u.type===D&&u.key==null?ke(u.props.children):u,s=ve(e,ce(C)?C:[C],t,n,r,i,a,o,s,c,l),d.base=t.__e,t.__u&=-161,d.__h.length&&o.push(d),g&&(d.__E=d.__=null)}catch(e){if(t.__v=null,c||a!=null)if(e.then){for(t.__u|=c?160:128;s&&s.nodeType==8&&s.nextSibling;)s=s.nextSibling;a[a.indexOf(s)]=null,t.__e=s}else{for(te=a.length;te--;)ue(a[te]);De(t)}else t.__e=n.__e,t.__k=n.__k,e.then||De(t);y.__e(e,t,n)}else a==null&&t.__v==n.__v?(t.__k=n.__k,t.__e=n.__e):s=t.__e=Ae(n.__e,t,n,r,i,a,o,c,l);return(u=y.diffed)&&u(t),128&t.__u?void 0:s}function De(e){e&&(e.__c&&(e.__c.__e=!0),e.__k&&e.__k.some(De))}function Oe(e,t,n){for(var r=0;r<n.length;r++)je(n[r],n[++r],n[++r]);y.__c&&y.__c(t,e),e.some(function(t){try{e=t.__h,t.__h=[],e.some(function(e){e.call(t)})}catch(e){y.__e(e,t.__v)}})}function ke(e){return typeof e!=`object`||!e||e.__b>0?e:ce(e)?e.map(ke):le({},e)}function Ae(e,t,n,r,i,a,o,s,c){var l,u,d,f,p,m,h,g=n.props||ae,_=t.props,b=t.type;if(b==`svg`?i=`http://www.w3.org/2000/svg`:b==`math`?i=`http://www.w3.org/1998/Math/MathML`:i||=`http://www.w3.org/1999/xhtml`,a!=null){for(l=0;l<a.length;l++)if((p=a[l])&&`setAttribute`in p==!!b&&(b?p.localName==b:p.nodeType==3)){e=p,a[l]=null;break}}if(e==null){if(b==null)return document.createTextNode(_);e=document.createElementNS(i,b,_.is&&_),s&&=(y.__m&&y.__m(t,a),!1),a=null}if(b==null)g===_||s&&e.data==_||(e.data=_);else{if(a&&=v.call(e.childNodes),!s&&a!=null)for(g={},l=0;l<e.attributes.length;l++)g[(p=e.attributes[l]).name]=p.value;for(l in g)p=g[l],l==`dangerouslySetInnerHTML`?d=p:l==`children`||l in _||l==`value`&&`defaultValue`in _||l==`checked`&&`defaultChecked`in _||we(e,l,null,p,i);for(l in _)p=_[l],l==`children`?f=p:l==`dangerouslySetInnerHTML`?u=p:l==`value`?m=p:l==`checked`?h=p:s&&typeof p!=`function`||g[l]===p||we(e,l,p,g[l],i);if(u)s||d&&(u.__html==d.__html||u.__html==e.innerHTML)||(e.innerHTML=u.__html),t.__k=[];else if(d&&(e.innerHTML=``),ve(t.type==`template`?e.content:e,ce(f)?f:[f],t,n,r,b==`foreignObject`?`http://www.w3.org/1999/xhtml`:i,a,o,a?a[0]:n.__k&&pe(n,0),s,c),a!=null)for(l=a.length;l--;)ue(a[l]);s||(l=`value`,b==`progress`&&m==null?e.removeAttribute(`value`):m!=null&&(m!==e[l]||b==`progress`&&!m||b==`option`&&m!=g[l])&&we(e,l,m,g[l],i),l=`checked`,h!=null&&h!=e[l]&&we(e,l,h,g[l],i))}return e}function je(e,t,n){try{if(typeof e==`function`){var r=typeof e.__u==`function`;r&&e.__u(),r&&t==null||(e.__u=e(t))}else e.current=t}catch(e){y.__e(e,n)}}function Me(e,t,n){var r,i;if(y.unmount&&y.unmount(e),(r=e.ref)&&(r.current&&r.current!=e.__e||je(r,null,t)),(r=e.__c)!=null){if(r.componentWillUnmount)try{r.componentWillUnmount()}catch(e){y.__e(e,t)}r.base=r.__P=null}if(r=e.__k)for(i=0;i<r.length;i++)r[i]&&Me(r[i],t,n||typeof e.type!=`function`);n||ue(e.__e),e.__c=e.__=e.__e=void 0}function Ne(e,t,n){return this.constructor(e,n)}function Pe(e,t,n){var r,i,a,o;t==document&&(t=document.documentElement),y.__&&y.__(e,t),i=(r=typeof n==`function`)?null:n&&n.__k||t.__k,a=[],o=[],Ee(t,e=(!r&&n||t).__k=E(D,null,[e]),i||ae,ae,t.namespaceURI,!r&&n?[n]:i?null:t.firstChild?v.call(t.childNodes):null,a,!r&&n?n:i?i.__e:t.firstChild,r,o),Oe(a,e,o)}function Fe(e){function t(e){var n,r;return this.getChildContext||(n=new Set,(r={})[t.__c]=this,this.getChildContext=function(){return r},this.componentWillUnmount=function(){n=null},this.shouldComponentUpdate=function(e){this.props.value!=e.value&&n.forEach(function(e){e.__e=!0,ge(e)})},this.sub=function(e){n.add(e);var t=e.componentWillUnmount;e.componentWillUnmount=function(){n&&n.delete(e),t&&t.call(e)}}),e.children}return t.__c=`__cC`+ ie++,t.__=e,t.Provider=t.__l=(t.Consumer=function(e,t){return e.children(t)}).contextType=t,t}v=oe.slice,y={__e:function(e,t,n,r){for(var i,a,o;t=t.__;)if((i=t.__c)&&!i.__)try{if((a=i.constructor)&&a.getDerivedStateFromError!=null&&(i.setState(a.getDerivedStateFromError(e)),o=i.__d),i.componentDidCatch!=null&&(i.componentDidCatch(e,r||{}),o=i.__d),o)return i.__E=i}catch(t){e=t}throw e}},b=0,x=function(e){return e!=null&&e.constructor===void 0},fe.prototype.setState=function(e,t){var n=this.__s!=null&&this.__s!=this.state?this.__s:this.__s=le({},this.state);typeof e==`function`&&(e=e(le({},n),this.props)),e&&le(n,e),e!=null&&this.__v&&(t&&this._sb.push(t),ge(this))},fe.prototype.forceUpdate=function(e){this.__v&&(this.__e=!0,e&&this.__h.push(e),ge(this))},fe.prototype.render=D,S=[],C=typeof Promise==`function`?Promise.prototype.then.bind(Promise.resolve()):setTimeout,te=function(e,t){return e.__v.__b-t.__v.__b},_e.__r=0,w=/(PointerCapture)$|Capture$/i,ne=0,T=Te(!1),re=Te(!0),ie=0;var Ie,O,Le,Re,ze=0,Be=[],k=y,Ve=k.__b,He=k.__r,Ue=k.diffed,We=k.__c,Ge=k.unmount,Ke=k.__;function qe(e,t){k.__h&&k.__h(O,e,ze||t),ze=0;var n=O.__H||={__:[],__h:[]};return e>=n.__.length&&n.__.push({}),n.__[e]}function A(e){return ze=1,Je(it,e)}function Je(e,t,n){var r=qe(Ie++,2);if(r.t=e,!r.__c&&(r.__=[n?n(t):it(void 0,t),function(e){var t=r.__N?r.__N[0]:r.__[0],n=r.t(t,e);t!==n&&(r.__N=[n,r.__[1]],r.__c.setState({}))}],r.__c=O,!O.__f)){var i=function(e,t,n){if(!r.__c.__H)return!0;var i=r.__c.__H.__.filter(function(e){return e.__c});if(i.every(function(e){return!e.__N}))return!a||a.call(this,e,t,n);var o=r.__c.props!==e;return i.some(function(e){if(e.__N){var t=e.__[0];e.__=e.__N,e.__N=void 0,t!==e.__[0]&&(o=!0)}}),a&&a.call(this,e,t,n)||o};O.__f=!0;var a=O.shouldComponentUpdate,o=O.componentWillUpdate;O.componentWillUpdate=function(e,t,n){if(this.__e){var r=a;a=void 0,i(e,t,n),a=r}o&&o.call(this,e,t,n)},O.shouldComponentUpdate=i}return r.__N||r.__}function j(e,t){var n=qe(Ie++,3);!k.__s&&rt(n.__H,t)&&(n.__=e,n.u=t,O.__H.__h.push(n))}function Ye(e,t){var n=qe(Ie++,4);!k.__s&&rt(n.__H,t)&&(n.__=e,n.u=t,O.__h.push(n))}function M(e){return ze=5,Xe(function(){return{current:e}},[])}function Xe(e,t){var n=qe(Ie++,7);return rt(n.__H,t)&&(n.__=e(),n.__H=t,n.__h=e),n.__}function N(e,t){return ze=8,Xe(function(){return e},t)}function Ze(e){var t=O.context[e.__c],n=qe(Ie++,9);return n.c=e,t?(n.__??(n.__=!0,t.sub(O)),t.props.value):e.__}function Qe(){for(var e;e=Be.shift();){var t=e.__H;if(e.__P&&t)try{t.__h.some(tt),t.__h.some(nt),t.__h=[]}catch(n){t.__h=[],k.__e(n,e.__v)}}}k.__b=function(e){O=null,Ve&&Ve(e)},k.__=function(e,t){e&&t.__k&&t.__k.__m&&(e.__m=t.__k.__m),Ke&&Ke(e,t)},k.__r=function(e){He&&He(e),Ie=0;var t=(O=e.__c).__H;t&&(Le===O?(t.__h=[],O.__h=[],t.__.some(function(e){e.__N&&(e.__=e.__N),e.u=e.__N=void 0})):(t.__h.some(tt),t.__h.some(nt),t.__h=[],Ie=0)),Le=O},k.diffed=function(e){Ue&&Ue(e);var t=e.__c;t&&t.__H&&(t.__H.__h.length&&(Be.push(t)!==1&&Re===k.requestAnimationFrame||((Re=k.requestAnimationFrame)||et)(Qe)),t.__H.__.some(function(e){e.u&&(e.__H=e.u),e.u=void 0})),Le=O=null},k.__c=function(e,t){t.some(function(e){try{e.__h.some(tt),e.__h=e.__h.filter(function(e){return!e.__||nt(e)})}catch(n){t.some(function(e){e.__h&&=[]}),t=[],k.__e(n,e.__v)}}),We&&We(e,t)},k.unmount=function(e){Ge&&Ge(e);var t,n=e.__c;n&&n.__H&&(n.__H.__.some(function(e){try{tt(e)}catch(e){t=e}}),n.__H=void 0,t&&k.__e(t,n.__v))};var $e=typeof requestAnimationFrame==`function`;function et(e){var t,n=function(){clearTimeout(r),$e&&cancelAnimationFrame(t),setTimeout(e)},r=setTimeout(n,35);$e&&(t=requestAnimationFrame(n))}function tt(e){var t=O,n=e.__c;typeof n==`function`&&(e.__c=void 0,n()),O=t}function nt(e){var t=O;e.__c=e.__(),O=t}function rt(e,t){return!e||e.length!==t.length||t.some(function(t,n){return t!==e[n]})}function it(e,t){return typeof t==`function`?t(e):t}var at=Symbol.for(`preact-signals`);function ot(){if(ut>1)ut--;else{var e,t=!1;for((function(){var e=pt;for(pt=void 0;e!==void 0;)e.S.v===e.v&&(e.S.i=e.i),e=e.o})();lt!==void 0;){var n=lt;for(lt=void 0,dt++;n!==void 0;){var r=n.u;if(n.u=void 0,n.f&=-3,!(8&n.f)&&gt(n))try{n.c()}catch(n){t||=(e=n,!0)}n=r}}if(dt=0,ut--,t)throw e}}var P=void 0;function st(e){var t=P;P=void 0;try{return e()}finally{P=t}}var ct,lt=void 0,ut=0,dt=0,ft=0,pt=void 0,mt=0;function ht(e){if(P!==void 0){var t=e.n;if(t===void 0||t.t!==P)return t={i:0,S:e,p:P.s,n:void 0,t:P,e:void 0,x:void 0,r:t},P.s!==void 0&&(P.s.n=t),P.s=t,e.n=t,32&P.f&&e.S(t),t;if(t.i===-1)return t.i=0,t.n!==void 0&&(t.n.p=t.p,t.p!==void 0&&(t.p.n=t.n),t.p=P.s,t.n=void 0,P.s.n=t,P.s=t),t}}function F(e,t){this.v=e,this.i=0,this.n=void 0,this.t=void 0,this.l=0,this.W=t?.watched,this.Z=t?.unwatched,this.name=t?.name}F.prototype.brand=at,F.prototype.h=function(){return!0},F.prototype.S=function(e){var t=this,n=this.t;n!==e&&e.e===void 0&&(e.x=n,this.t=e,n===void 0?st(function(){var e;(e=t.W)==null||e.call(t)}):n.e=e)},F.prototype.U=function(e){var t=this;if(this.t!==void 0){var n=e.e,r=e.x;n!==void 0&&(n.x=r,e.e=void 0),r!==void 0&&(r.e=n,e.x=void 0),e===this.t&&(this.t=r,r===void 0&&st(function(){var e;(e=t.Z)==null||e.call(t)}))}},F.prototype.subscribe=function(e){var t=this;return Tt(function(){var n=t.value,r=P;P=void 0;try{e(n)}finally{P=r}},{name:`sub`})},F.prototype.valueOf=function(){return this.value},F.prototype.toString=function(){return this.value+``},F.prototype.toJSON=function(){return this.value},F.prototype.peek=function(){var e=P;P=void 0;try{return this.value}finally{P=e}},Object.defineProperty(F.prototype,`value`,{get:function(){var e=ht(this);return e!==void 0&&(e.i=this.i),this.v},set:function(e){if(e!==this.v){if(dt>100)throw Error(`Cycle detected`);(function(e){ut!==0&&dt===0&&e.l!==ft&&(e.l=ft,pt={S:e,v:e.v,i:e.i,o:pt})})(this),this.v=e,this.i++,mt++,ut++;try{for(var t=this.t;t!==void 0;t=t.x)t.t.N()}finally{ot()}}}});function I(e,t){return new F(e,t)}function gt(e){for(var t=e.s;t!==void 0;t=t.n)if(t.S.i!==t.i||!t.S.h()||t.S.i!==t.i)return!0;return!1}function _t(e){for(var t=e.s;t!==void 0;t=t.n){var n=t.S.n;if(n!==void 0&&(t.r=n),t.S.n=t,t.i=-1,t.n===void 0){e.s=t;break}}}function vt(e){for(var t=e.s,n=void 0;t!==void 0;){var r=t.p;t.i===-1?(t.S.U(t),r!==void 0&&(r.n=t.n),t.n!==void 0&&(t.n.p=r)):n=t,t.S.n=t.r,t.r!==void 0&&(t.r=void 0),t=r}e.s=n}function yt(e,t){F.call(this,void 0),this.x=e,this.s=void 0,this.g=mt-1,this.f=4,this.W=t?.watched,this.Z=t?.unwatched,this.name=t?.name}yt.prototype=new F,yt.prototype.h=function(){if(this.f&=-3,1&this.f)return!1;if((36&this.f)==32||(this.f&=-5,this.g===mt))return!0;if(this.g=mt,this.f|=1,this.i>0&&!gt(this))return this.f&=-2,!0;var e=P;try{_t(this),P=this;var t=this.x();(16&this.f||this.v!==t||this.i===0)&&(this.v=t,this.f&=-17,this.i++)}catch(e){this.v=e,this.f|=16,this.i++}return P=e,vt(this),this.f&=-2,!0},yt.prototype.S=function(e){if(this.t===void 0){this.f|=36;for(var t=this.s;t!==void 0;t=t.n)t.S.S(t)}F.prototype.S.call(this,e)},yt.prototype.U=function(e){if(this.t!==void 0&&(F.prototype.U.call(this,e),this.t===void 0)){this.f&=-33;for(var t=this.s;t!==void 0;t=t.n)t.S.U(t)}},yt.prototype.N=function(){if(!(2&this.f)){this.f|=6;for(var e=this.t;e!==void 0;e=e.x)e.t.N()}},Object.defineProperty(yt.prototype,`value`,{get:function(){if(1&this.f)throw Error(`Cycle detected`);var e=ht(this);if(this.h(),e!==void 0&&(e.i=this.i),16&this.f)throw this.v;return this.v}});function bt(e,t){return new yt(e,t)}function xt(e){var t=e.m;if(e.m=void 0,typeof t==`function`){ut++;var n=P;P=void 0;try{t()}catch(t){throw e.f&=-2,e.f|=8,St(e),t}finally{P=n,ot()}}}function St(e){for(var t=e.s;t!==void 0;t=t.n)t.S.U(t);e.x=void 0,e.s=void 0,xt(e)}function Ct(e){if(P!==this)throw Error(`Out-of-order effect`);vt(this),P=e,this.f&=-2,8&this.f&&St(this),ot()}function wt(e,t){this.x=e,this.m=void 0,this.s=void 0,this.u=void 0,this.f=32,this.name=t?.name,ct&&ct.push(this)}wt.prototype.c=function(){var e=this.S();try{if(8&this.f||this.x===void 0)return;var t=this.x();typeof t==`function`&&(this.m=t)}finally{e()}},wt.prototype.S=function(){if(1&this.f)throw Error(`Cycle detected`);this.f|=1,this.f&=-9,xt(this),_t(this),ut++;var e=P;return P=this,Ct.bind(this,e)},wt.prototype.N=function(){2&this.f||(this.f|=2,this.u=lt,lt=this)},wt.prototype.d=function(){this.f|=8,1&this.f||St(this)},wt.prototype.dispose=function(){this.d()};function Tt(e,t){var n=new wt(e,t);try{n.c()}catch(e){throw n.d(),e}var r=n.d.bind(n);return r[Symbol.dispose]=r,r}var Et;function Dt(e,t){y[e]=t.bind(null,y[e]||function(){})}function Ot(e){if(Et){var t=Et;Et=void 0,t()}Et=e&&e.S()}function kt(e){var t=this,n=e.data,r=jt(n);r.value=n;var i=Xe(function(){for(var e=t.__v;e=e.__;)if(e.__c){e.__c.__$f|=4;break}return t.__$u.c=function(){var e=t.__$u.S(),n=i.value;e(),x(n)||t.base?.nodeType!==3?(t.__$f|=1,t.setState({})):t.base.data=n},bt(function(){var e=r.value.value;return e===0?0:!0===e?``:e||``})},[]);return i.value}kt.displayName=`_st`,Object.defineProperties(F.prototype,{constructor:{configurable:!0,value:void 0},type:{configurable:!0,value:kt},props:{configurable:!0,get:function(){return{data:this}}},__b:{configurable:!0,value:1}}),Dt(`__b`,function(e,t){if(typeof t.type==`string`){var n,r=t.props;for(var i in r)if(i!==`children`){var a=r[i];a instanceof F&&(n||(t.__np=n={}),n[i]=a,r[i]=a.peek())}}e(t)}),Dt(`__r`,function(e,t){e(t),Ot();var n,r=t.__c;r&&(r.__$f&=-2,(n=r.__$u)===void 0&&(r.__$u=n=function(e){var t;return Tt(function(){t=this}),t.c=function(){r.__$f|=1,r.setState({})},t}())),Ot(n)}),Dt(`__e`,function(e,t,n,r){Ot(),e(t,n,r)}),Dt(`diffed`,function(e,t){Ot();var n;if(typeof t.type==`string`&&(n=t.__e)){var r=t.__np,i=t.props;if(r){var a=n.U;if(a)for(var o in a){var s=a[o];s!==void 0&&!(o in r)&&(s.d(),a[o]=void 0)}else n.U=a={};for(var c in r){var l=a[c],u=r[c];l===void 0?(l=At(n,c,u,i),a[c]=l):l.o(u,i)}}}e(t)});function At(e,t,n,r){var i=t in e&&e.ownerSVGElement===void 0,a=I(n);return{o:function(e,t){a.value=e,r=t},d:Tt(function(){var n=a.value.value;r[t]!==n&&(r[t]=n,i?e[t]=n:n?e.setAttribute(t,n):e.removeAttribute(t))})}}Dt(`unmount`,function(e,t){if(typeof t.type==`string`){var n=t.__e;if(n){var r=n.U;if(r)for(var i in n.U=void 0,r){var a=r[i];a&&a.d()}}}else{var o=t.__c;if(o){var s=o.__$u;s&&(o.__$u=void 0,s.d())}}e(t)}),Dt(`__h`,function(e,t,n,r){(r<3||r===9)&&(t.__$f|=2),e(t,n,r)}),fe.prototype.shouldComponentUpdate=function(e,t){if(this.__R)return!0;var n=this.__$u,r=n&&n.s!==void 0;for(var i in t)return!0;if(this.__f||typeof this.u==`boolean`&&!0===this.u){if(!(r||2&this.__$f||4&this.__$f)||1&this.__$f)return!0}else if(!(r||4&this.__$f)||3&this.__$f)return!0;for(var a in e)if(a!==`__source`&&e[a]!==this.props[a])return!0;for(var o in this.props)if(!(o in e))return!0;return!1};function jt(e){return Xe(function(){return I(e)},[])}function Mt(e){var t=M(e);t.current=e,j(function(){return Tt(function(){return t.current()})},[])}function Nt(e,t){for(var n in t)e[n]=t[n];return e}function Pt(e,t){for(var n in e)if(n!==`__source`&&!(n in t))return!0;for(var r in t)if(r!==`__source`&&e[r]!==t[r])return!0;return!1}function Ft(e,t){var n=t(),r=A({t:{__:n,u:t}}),i=r[0].t,a=r[1];return Ye(function(){i.__=n,i.u=t,It(i)&&a({t:i})},[e,n,t]),j(function(){return It(i)&&a({t:i}),e(function(){It(i)&&a({t:i})})},[e]),n}function It(e){try{return!((t=e.__)===(n=e.u())&&(t!==0||1/t==1/n)||t!=t&&n!=n)}catch{return!0}var t,n}function Lt(e,t){this.props=e,this.context=t}function Rt(e,t){function n(e){var n=this.props.ref;return n!=e.ref&&n&&(typeof n==`function`?n(null):n.current=null),t?!t(this.props,e)||n!=e.ref:Pt(this.props,e)}function r(t){return this.shouldComponentUpdate=n,E(e,t)}return r.displayName=`Memo(`+(e.displayName||e.name)+`)`,r.__f=r.prototype.isReactComponent=!0,r.type=e,r}(Lt.prototype=new fe).isPureReactComponent=!0,Lt.prototype.shouldComponentUpdate=function(e,t){return Pt(this.props,e)||Pt(this.state,t)};var zt=y.__b;y.__b=function(e){e.type&&e.type.__f&&e.ref&&(e.props.ref=e.ref,e.ref=null),zt&&zt(e)};var Bt=typeof Symbol<`u`&&Symbol.for&&Symbol.for(`react.forward_ref`)||3911;function Vt(e){function t(t){var n=Nt({},t);return delete n.ref,e(n,t.ref||null)}return t.$$typeof=Bt,t.render=e,t.prototype.isReactComponent=t.__f=!0,t.displayName=`ForwardRef(`+(e.displayName||e.name)+`)`,t}var Ht=y.__e;y.__e=function(e,t,n,r){if(e.then){for(var i,a=t;a=a.__;)if((i=a.__c)&&i.__c)return t.__e??(t.__e=n.__e,t.__k=n.__k),i.__c(e,t)}Ht(e,t,n,r)};var Ut=y.unmount;function Wt(e,t,n){return e&&(e.__c&&e.__c.__H&&(e.__c.__H.__.forEach(function(e){typeof e.__c==`function`&&e.__c()}),e.__c.__H=null),(e=Nt({},e)).__c!=null&&(e.__c.__P===n&&(e.__c.__P=t),e.__c.__e=!0,e.__c=null),e.__k=e.__k&&e.__k.map(function(e){return Wt(e,t,n)})),e}function Gt(e,t,n){return e&&n&&(e.__v=null,e.__k=e.__k&&e.__k.map(function(e){return Gt(e,t,n)}),e.__c&&e.__c.__P===t&&(e.__e&&n.appendChild(e.__e),e.__c.__e=!0,e.__c.__P=n)),e}function Kt(){this.__u=0,this.o=null,this.__b=null}function qt(e){var t=e.__&&e.__.__c;return t&&t.__a&&t.__a(e)}function Jt(){this.i=null,this.l=null}y.unmount=function(e){var t=e.__c;t&&(t.__z=!0),t&&t.__R&&t.__R(),t&&32&e.__u&&(e.type=null),Ut&&Ut(e)},(Kt.prototype=new fe).__c=function(e,t){var n=t.__c,r=this;r.o??=[],r.o.push(n);var i=qt(r.__v),a=!1,o=function(){a||r.__z||(a=!0,n.__R=null,i?i(c):c())};n.__R=o;var s=n.__P;n.__P=null;var c=function(){if(!--r.__u){if(r.state.__a){var e=r.state.__a;r.__v.__k[0]=Gt(e,e.__c.__P,e.__c.__O)}var t;for(r.setState({__a:r.__b=null});t=r.o.pop();)t.__P=s,t.forceUpdate()}};r.__u++||32&t.__u||r.setState({__a:r.__b=r.__v.__k[0]}),e.then(o,o)},Kt.prototype.componentWillUnmount=function(){this.o=[]},Kt.prototype.render=function(e,t){if(this.__b){if(this.__v.__k){var n=document.createElement(`div`),r=this.__v.__k[0].__c;this.__v.__k[0]=Wt(this.__b,n,r.__O=r.__P)}this.__b=null}var i=t.__a&&E(D,null,e.fallback);return i&&(i.__u&=-33),[E(D,null,t.__a?null:e.children),i]};var Yt=function(e,t,n){if(++n[1]===n[0]&&e.l.delete(t),e.props.revealOrder&&(e.props.revealOrder[0]!==`t`||!e.l.size))for(n=e.i;n;){for(;n.length>3;)n.pop()();if(n[1]<n[0])break;e.i=n=n[2]}};function Xt(e){return this.getChildContext=function(){return e.context},e.children}function Zt(e){var t=this,n=e.h;if(t.componentWillUnmount=function(){Pe(null,t.v),t.v=null,t.h=null},t.h&&t.h!==n&&t.componentWillUnmount(),!t.v){for(var r=t.__v;r!==null&&!r.__m&&r.__!==null;)r=r.__;t.h=n,t.v={nodeType:1,parentNode:n,childNodes:[],__k:{__m:r.__m},contains:function(){return!0},namespaceURI:n.namespaceURI,insertBefore:function(e,n){this.childNodes.push(e),t.h.insertBefore(e,n)},removeChild:function(e){this.childNodes.splice(this.childNodes.indexOf(e)>>>1,1),t.h.removeChild(e)}}}Pe(E(Xt,{context:t.context},e.__v),t.v)}function Qt(e,t){var n=E(Zt,{__v:e,h:t});return n.containerInfo=t,n}(Jt.prototype=new fe).__a=function(e){var t=this,n=qt(t.__v),r=t.l.get(e);return r[0]++,function(i){var a=function(){t.props.revealOrder?(r.push(i),Yt(t,e,r)):i()};n?n(a):a()}},Jt.prototype.render=function(e){this.i=null,this.l=new Map;var t=xe(e.children);e.revealOrder&&e.revealOrder[0]===`b`&&t.reverse();for(var n=t.length;n--;)this.l.set(t[n],this.i=[1,0,this.i]);return e.children},Jt.prototype.componentDidUpdate=Jt.prototype.componentDidMount=function(){var e=this;this.l.forEach(function(t,n){Yt(e,n,t)})};var $t=typeof Symbol<`u`&&Symbol.for&&Symbol.for(`react.element`)||60103,en=/^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/,tn=/^on(Ani|Tra|Tou|BeforeInp|Compo)/,nn=/[A-Z0-9]/g,rn=typeof document<`u`,an=function(e){return(typeof Symbol<`u`&&typeof Symbol()==`symbol`?/fil|che|rad/:/fil|che|ra/).test(e)};fe.prototype.isReactComponent=!0,[`componentWillMount`,`componentWillReceiveProps`,`componentWillUpdate`].forEach(function(e){Object.defineProperty(fe.prototype,e,{configurable:!0,get:function(){return this[`UNSAFE_`+e]},set:function(t){Object.defineProperty(this,e,{configurable:!0,writable:!0,value:t})}})});var on=y.event;y.event=function(e){return on&&(e=on(e)),e.persist=function(){},e.isPropagationStopped=function(){return this.cancelBubble},e.isDefaultPrevented=function(){return this.defaultPrevented},e.nativeEvent=e};var sn={configurable:!0,get:function(){return this.class}},cn=y.vnode;y.vnode=function(e){typeof e.type==`string`&&function(e){var t=e.props,n=e.type,r={},i=n.indexOf(`-`)==-1;for(var a in t){var o=t[a];if(!(a===`value`&&`defaultValue`in t&&o==null||rn&&a===`children`&&n===`noscript`||a===`class`||a===`className`)){var s=a.toLowerCase();a===`defaultValue`&&`value`in t&&t.value==null?a=`value`:a===`download`&&!0===o?o=``:s===`translate`&&o===`no`?o=!1:s[0]===`o`&&s[1]===`n`?s===`ondoubleclick`?a=`ondblclick`:s!==`onchange`||n!==`input`&&n!==`textarea`||an(t.type)?s===`onfocus`?a=`onfocusin`:s===`onblur`?a=`onfocusout`:tn.test(a)&&(a=s):s=a=`oninput`:i&&en.test(a)?a=a.replace(nn,`-$&`).toLowerCase():o===null&&(o=void 0),s===`oninput`&&r[a=s]&&(a=`oninputCapture`),r[a]=o}}n==`select`&&(r.multiple&&Array.isArray(r.value)&&(r.value=xe(t.children).forEach(function(e){e.props.selected=r.value.indexOf(e.props.value)!=-1})),r.defaultValue!=null&&(r.value=xe(t.children).forEach(function(e){e.props.selected=r.multiple?r.defaultValue.indexOf(e.props.value)!=-1:r.defaultValue==e.props.value}))),t.class&&!t.className?(r.class=t.class,Object.defineProperty(r,`className`,sn)):t.className&&(r.class=r.className=t.className),e.props=r}(e),e.$$typeof=$t,cn&&cn(e)};var ln=y.__r;y.__r=function(e){ln&&ln(e),e.__c};var un=y.diffed;y.diffed=function(e){un&&un(e);var t=e.props,n=e.__e;n!=null&&e.type===`textarea`&&`value`in t&&t.value!==n.value&&(n.value=t.value==null?``:t.value)};var dn=0;Array.isArray;function L(e,t,n,r,i,a){t||={};var o,s,c=t;if(`ref`in c)for(s in c={},t)s==`ref`?o=t[s]:c[s]=t[s];var l={type:e,props:c,key:n,ref:o,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:--dn,__i:-1,__u:0,__source:i,__self:a};if(typeof e==`function`&&(o=e.defaultProps))for(s in o)c[s]===void 0&&(c[s]=o[s]);return y.vnode&&y.vnode(l),l}Array.prototype.toSorted||Object.defineProperty(Array.prototype,`toSorted`,{value:function(e){return[...this].sort(e)},writable:!0,configurable:!0});var fn=typeof window<`u`;function pn(e,t){return t-e}function mn(e){let t=e[0].name,n=e.length,r=Math.min(4,n);for(let n=1;n<r;n++)t+=`, ${e[n].name}`;return t}function hn(e){let t=e[0].time;for(let n=1,r=e.length;n<r;n++)t+=e[n].time;return t}function gn(e){for(let t=0,n=e.length;t<n;t++)if(e[t].forget)return!0;return!1}var _n=e=>{let t=``,n=new Map;for(let t of e){let{forget:e,time:r,aggregatedCount:i,name:a}=t;n.has(i)||n.set(i,[]);let o=n.get(i);o&&o.push({name:a,forget:e,time:r??0})}let r=Array.from(n.keys()).sort(pn),i=[],a=0;for(let e of r){let t=n.get(e);if(!t)continue;let r=mn(t),o=hn(t),s=gn(t);a+=o,t.length>4&&(r+=`…`),e>1&&(r+=` \xD7 ${e}`),s&&(r=`\u2728${r}`),i.push(r)}return t=i.join(`, `),t.length?(t.length>40&&(t=`${t.slice(0,40)}\u2026`),a>=.01&&(t+=` (${Number(a.toFixed(2))}ms)`),t):null};function vn(e,t){return e===t||e!==e&&t!==t}var yn=()=>fn?(window.reactScanIdCounter===void 0&&(window.reactScanIdCounter=0),`${++window.reactScanIdCounter}`):`0`,bn=e=>{let t=e.createOscillator(),n=e.createGain();t.connect(n),n.connect(e.destination);let r={type:`sine`,freq:[392,600],duration:.3,gain:.12},i=r.freq,a=r.duration/i.length;i.forEach((n,r)=>{t.frequency.setValueAtTime(n,e.currentTime+r*a)}),t.type=r.type,n.gain.setValueAtTime(r.gain,e.currentTime),n.gain.setTargetAtTime(0,e.currentTime+r.duration*.7,.05),t.start(),t.stop(e.currentTime+r.duration)},R=Vt(({size:e=15,name:t,fill:n=`currentColor`,stroke:r=`currentColor`,className:i,externalURL:a=``,style:o},s)=>{let c=Array.isArray(e)?e[0]:e,l=Array.isArray(e)?e[1]||e[0]:e,u=`${a}#${t}`;return L(`svg`,{ref:s,width:`${c}px`,height:`${l}px`,fill:n,stroke:r,className:i,style:{...o,minWidth:`${c}px`,maxWidth:`${c}px`,minHeight:`${l}px`,maxHeight:`${l}px`},children:[L(`title`,{children:t}),L(`use`,{href:u})]})}),z=24,B={width:550,height:350,initialHeight:400},xn=240,Sn=`react-scan-widget-settings-v2`,Cn=`react-scan-widget-collapsed-v1`,wn=`react-scan-widget-last-view-v1`;function Tn(e){var t,n,r=``;if(typeof e==`string`||typeof e==`number`)r+=e;else if(typeof e==`object`)if(Array.isArray(e)){var i=e.length;for(t=0;t<i;t++)e[t]&&(n=Tn(e[t]))&&(r&&(r+=` `),r+=n)}else for(n in e)e[n]&&(r&&(r+=` `),r+=n);return r}function En(){for(var e,t,n=0,r=``,i=arguments.length;n<i;n++)(e=arguments[n])&&(t=Tn(e))&&(r&&(r+=` `),r+=t);return r}var Dn=`-`,On=e=>{let t=Mn(e),{conflictingClassGroups:n,conflictingClassGroupModifiers:r}=e;return{getClassGroupId:e=>{let n=e.split(Dn);return n[0]===``&&n.length!==1&&n.shift(),kn(n,t)||jn(e)},getConflictingClassGroupIds:(e,t)=>{let i=n[e]||[];return t&&r[e]?[...i,...r[e]]:i}}},kn=(e,t)=>{if(e.length===0)return t.classGroupId;let n=e[0],r=t.nextPart.get(n),i=r?kn(e.slice(1),r):void 0;if(i)return i;if(t.validators.length===0)return;let a=e.join(Dn);return t.validators.find(({validator:e})=>e(a))?.classGroupId},An=/^\[(.+)\]$/,jn=e=>{if(An.test(e)){let t=An.exec(e)[1],n=t?.substring(0,t.indexOf(`:`));if(n)return`arbitrary..`+n}},Mn=e=>{let{theme:t,prefix:n}=e,r={nextPart:new Map,validators:[]};return In(Object.entries(e.classGroups),n).forEach(([e,n])=>{Nn(n,r,e,t)}),r},Nn=(e,t,n,r)=>{e.forEach(e=>{if(typeof e==`string`){let r=e===``?t:Pn(t,e);r.classGroupId=n;return}if(typeof e==`function`){if(Fn(e)){Nn(e(r),t,n,r);return}t.validators.push({validator:e,classGroupId:n});return}Object.entries(e).forEach(([e,i])=>{Nn(i,Pn(t,e),n,r)})})},Pn=(e,t)=>{let n=e;return t.split(Dn).forEach(e=>{n.nextPart.has(e)||n.nextPart.set(e,{nextPart:new Map,validators:[]}),n=n.nextPart.get(e)}),n},Fn=e=>e.isThemeGetter,In=(e,t)=>t?e.map(([e,n])=>[e,n.map(e=>typeof e==`string`?t+e:typeof e==`object`?Object.fromEntries(Object.entries(e).map(([e,n])=>[t+e,n])):e)]):e,Ln=e=>{if(e<1)return{get:()=>void 0,set:()=>{}};let t=0,n=new Map,r=new Map,i=(i,a)=>{n.set(i,a),t++,t>e&&(t=0,r=n,n=new Map)};return{get(e){let t=n.get(e);if(t!==void 0)return t;if((t=r.get(e))!==void 0)return i(e,t),t},set(e,t){n.has(e)?n.set(e,t):i(e,t)}}},Rn=`!`,zn=e=>{let{separator:t,experimentalParseClassName:n}=e,r=t.length===1,i=t[0],a=t.length,o=e=>{let n=[],o=0,s=0,c;for(let l=0;l<e.length;l++){let u=e[l];if(o===0){if(u===i&&(r||e.slice(l,l+a)===t)){n.push(e.slice(s,l)),s=l+a;continue}if(u===`/`){c=l;continue}}u===`[`?o++:u===`]`&&o--}let l=n.length===0?e:e.substring(s),u=l.startsWith(Rn);return{modifiers:n,hasImportantModifier:u,baseClassName:u?l.substring(1):l,maybePostfixModifierPosition:c&&c>s?c-s:void 0}};return n?e=>n({className:e,parseClassName:o}):o},Bn=e=>{if(e.length<=1)return e;let t=[],n=[];return e.forEach(e=>{e[0]===`[`?(t.push(...n.sort(),e),n=[]):n.push(e)}),t.push(...n.sort()),t},Vn=e=>({cache:Ln(e.cacheSize),parseClassName:zn(e),...On(e)}),Hn=/\s+/,Un=(e,t)=>{let{parseClassName:n,getClassGroupId:r,getConflictingClassGroupIds:i}=t,a=[],o=e.trim().split(Hn),s=``;for(let e=o.length-1;e>=0;--e){let t=o[e],{modifiers:c,hasImportantModifier:l,baseClassName:u,maybePostfixModifierPosition:d}=n(t),f=!!d,p=r(f?u.substring(0,d):u);if(!p){if(!f){s=t+(s.length>0?` `+s:s);continue}if(p=r(u),!p){s=t+(s.length>0?` `+s:s);continue}f=!1}let m=Bn(c).join(`:`),h=l?m+Rn:m,g=h+p;if(a.includes(g))continue;a.push(g);let _=i(p,f);for(let e=0;e<_.length;++e){let t=_[e];a.push(h+t)}s=t+(s.length>0?` `+s:s)}return s};function Wn(){let e=0,t,n,r=``;for(;e<arguments.length;)(t=arguments[e++])&&(n=Gn(t))&&(r&&(r+=` `),r+=n);return r}var Gn=e=>{if(typeof e==`string`)return e;let t,n=``;for(let r=0;r<e.length;r++)e[r]&&(t=Gn(e[r]))&&(n&&(n+=` `),n+=t);return n};function Kn(e,...t){let n,r,i,a=o;function o(o){return n=Vn(t.reduce((e,t)=>t(e),e())),r=n.cache.get,i=n.cache.set,a=s,s(o)}function s(e){let t=r(e);if(t)return t;let a=Un(e,n);return i(e,a),a}return function(){return a(Wn.apply(null,arguments))}}var V=e=>{let t=t=>t[e]||[];return t.isThemeGetter=!0,t},qn=/^\[(?:([a-z-]+):)?(.+)\]$/i,Jn=/^\d+\/\d+$/,Yn=new Set([`px`,`full`,`screen`]),Xn=/^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,Zn=/\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,Qn=/^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/,$n=/^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,er=/^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,tr=e=>rr(e)||Yn.has(e)||Jn.test(e),nr=e=>hr(e,`length`,gr),rr=e=>!!e&&!Number.isNaN(Number(e)),ir=e=>hr(e,`number`,rr),ar=e=>!!e&&Number.isInteger(Number(e)),or=e=>e.endsWith(`%`)&&rr(e.slice(0,-1)),H=e=>qn.test(e),sr=e=>Xn.test(e),cr=new Set([`length`,`size`,`percentage`]),lr=e=>hr(e,cr,_r),ur=e=>hr(e,`position`,_r),dr=new Set([`image`,`url`]),fr=e=>hr(e,dr,yr),pr=e=>hr(e,``,vr),mr=()=>!0,hr=(e,t,n)=>{let r=qn.exec(e);return r?r[1]?typeof t==`string`?r[1]===t:t.has(r[1]):n(r[2]):!1},gr=e=>Zn.test(e)&&!Qn.test(e),_r=()=>!1,vr=e=>$n.test(e),yr=e=>er.test(e),br=Kn(()=>{let e=V(`colors`),t=V(`spacing`),n=V(`blur`),r=V(`brightness`),i=V(`borderColor`),a=V(`borderRadius`),o=V(`borderSpacing`),s=V(`borderWidth`),c=V(`contrast`),l=V(`grayscale`),u=V(`hueRotate`),d=V(`invert`),f=V(`gap`),p=V(`gradientColorStops`),m=V(`gradientColorStopPositions`),h=V(`inset`),g=V(`margin`),_=V(`opacity`),v=V(`padding`),y=V(`saturate`),b=V(`scale`),x=V(`sepia`),S=V(`skew`),ee=V(`space`),C=V(`translate`),te=()=>[`auto`,`contain`,`none`],w=()=>[`auto`,`hidden`,`clip`,`visible`,`scroll`],ne=()=>[`auto`,H,t],T=()=>[H,t],re=()=>[``,tr,nr],ie=()=>[`auto`,rr,H],ae=()=>[`bottom`,`center`,`left`,`left-bottom`,`left-top`,`right`,`right-bottom`,`right-top`,`top`],oe=()=>[`solid`,`dashed`,`dotted`,`double`,`none`],se=()=>[`normal`,`multiply`,`screen`,`overlay`,`darken`,`lighten`,`color-dodge`,`color-burn`,`hard-light`,`soft-light`,`difference`,`exclusion`,`hue`,`saturation`,`color`,`luminosity`],ce=()=>[`start`,`end`,`center`,`between`,`around`,`evenly`,`stretch`],le=()=>[``,`0`,H],ue=()=>[`auto`,`avoid`,`all`,`avoid-page`,`page`,`left`,`right`,`column`],E=()=>[rr,H];return{cacheSize:500,separator:`:`,theme:{colors:[mr],spacing:[tr,nr],blur:[`none`,``,sr,H],brightness:E(),borderColor:[e],borderRadius:[`none`,``,`full`,sr,H],borderSpacing:T(),borderWidth:re(),contrast:E(),grayscale:le(),hueRotate:E(),invert:le(),gap:T(),gradientColorStops:[e],gradientColorStopPositions:[or,nr],inset:ne(),margin:ne(),opacity:E(),padding:T(),saturate:E(),scale:E(),sepia:le(),skew:E(),space:T(),translate:T()},classGroups:{aspect:[{aspect:[`auto`,`square`,`video`,H]}],container:[`container`],columns:[{columns:[sr]}],"break-after":[{"break-after":ue()}],"break-before":[{"break-before":ue()}],"break-inside":[{"break-inside":[`auto`,`avoid`,`avoid-page`,`avoid-column`]}],"box-decoration":[{"box-decoration":[`slice`,`clone`]}],box:[{box:[`border`,`content`]}],display:[`block`,`inline-block`,`inline`,`flex`,`inline-flex`,`table`,`inline-table`,`table-caption`,`table-cell`,`table-column`,`table-column-group`,`table-footer-group`,`table-header-group`,`table-row-group`,`table-row`,`flow-root`,`grid`,`inline-grid`,`contents`,`list-item`,`hidden`],float:[{float:[`right`,`left`,`none`,`start`,`end`]}],clear:[{clear:[`left`,`right`,`both`,`none`,`start`,`end`]}],isolation:[`isolate`,`isolation-auto`],"object-fit":[{object:[`contain`,`cover`,`fill`,`none`,`scale-down`]}],"object-position":[{object:[...ae(),H]}],overflow:[{overflow:w()}],"overflow-x":[{"overflow-x":w()}],"overflow-y":[{"overflow-y":w()}],overscroll:[{overscroll:te()}],"overscroll-x":[{"overscroll-x":te()}],"overscroll-y":[{"overscroll-y":te()}],position:[`static`,`fixed`,`absolute`,`relative`,`sticky`],inset:[{inset:[h]}],"inset-x":[{"inset-x":[h]}],"inset-y":[{"inset-y":[h]}],start:[{start:[h]}],end:[{end:[h]}],top:[{top:[h]}],right:[{right:[h]}],bottom:[{bottom:[h]}],left:[{left:[h]}],visibility:[`visible`,`invisible`,`collapse`],z:[{z:[`auto`,ar,H]}],basis:[{basis:ne()}],"flex-direction":[{flex:[`row`,`row-reverse`,`col`,`col-reverse`]}],"flex-wrap":[{flex:[`wrap`,`wrap-reverse`,`nowrap`]}],flex:[{flex:[`1`,`auto`,`initial`,`none`,H]}],grow:[{grow:le()}],shrink:[{shrink:le()}],order:[{order:[`first`,`last`,`none`,ar,H]}],"grid-cols":[{"grid-cols":[mr]}],"col-start-end":[{col:[`auto`,{span:[`full`,ar,H]},H]}],"col-start":[{"col-start":ie()}],"col-end":[{"col-end":ie()}],"grid-rows":[{"grid-rows":[mr]}],"row-start-end":[{row:[`auto`,{span:[ar,H]},H]}],"row-start":[{"row-start":ie()}],"row-end":[{"row-end":ie()}],"grid-flow":[{"grid-flow":[`row`,`col`,`dense`,`row-dense`,`col-dense`]}],"auto-cols":[{"auto-cols":[`auto`,`min`,`max`,`fr`,H]}],"auto-rows":[{"auto-rows":[`auto`,`min`,`max`,`fr`,H]}],gap:[{gap:[f]}],"gap-x":[{"gap-x":[f]}],"gap-y":[{"gap-y":[f]}],"justify-content":[{justify:[`normal`,...ce()]}],"justify-items":[{"justify-items":[`start`,`end`,`center`,`stretch`]}],"justify-self":[{"justify-self":[`auto`,`start`,`end`,`center`,`stretch`]}],"align-content":[{content:[`normal`,...ce(),`baseline`]}],"align-items":[{items:[`start`,`end`,`center`,`baseline`,`stretch`]}],"align-self":[{self:[`auto`,`start`,`end`,`center`,`stretch`,`baseline`]}],"place-content":[{"place-content":[...ce(),`baseline`]}],"place-items":[{"place-items":[`start`,`end`,`center`,`baseline`,`stretch`]}],"place-self":[{"place-self":[`auto`,`start`,`end`,`center`,`stretch`]}],p:[{p:[v]}],px:[{px:[v]}],py:[{py:[v]}],ps:[{ps:[v]}],pe:[{pe:[v]}],pt:[{pt:[v]}],pr:[{pr:[v]}],pb:[{pb:[v]}],pl:[{pl:[v]}],m:[{m:[g]}],mx:[{mx:[g]}],my:[{my:[g]}],ms:[{ms:[g]}],me:[{me:[g]}],mt:[{mt:[g]}],mr:[{mr:[g]}],mb:[{mb:[g]}],ml:[{ml:[g]}],"space-x":[{"space-x":[ee]}],"space-x-reverse":[`space-x-reverse`],"space-y":[{"space-y":[ee]}],"space-y-reverse":[`space-y-reverse`],w:[{w:[`auto`,`min`,`max`,`fit`,`svw`,`lvw`,`dvw`,H,t]}],"min-w":[{"min-w":[H,t,`min`,`max`,`fit`]}],"max-w":[{"max-w":[H,t,`none`,`full`,`min`,`max`,`fit`,`prose`,{screen:[sr]},sr]}],h:[{h:[H,t,`auto`,`min`,`max`,`fit`,`svh`,`lvh`,`dvh`]}],"min-h":[{"min-h":[H,t,`min`,`max`,`fit`,`svh`,`lvh`,`dvh`]}],"max-h":[{"max-h":[H,t,`min`,`max`,`fit`,`svh`,`lvh`,`dvh`]}],size:[{size:[H,t,`auto`,`min`,`max`,`fit`]}],"font-size":[{text:[`base`,sr,nr]}],"font-smoothing":[`antialiased`,`subpixel-antialiased`],"font-style":[`italic`,`not-italic`],"font-weight":[{font:[`thin`,`extralight`,`light`,`normal`,`medium`,`semibold`,`bold`,`extrabold`,`black`,ir]}],"font-family":[{font:[mr]}],"fvn-normal":[`normal-nums`],"fvn-ordinal":[`ordinal`],"fvn-slashed-zero":[`slashed-zero`],"fvn-figure":[`lining-nums`,`oldstyle-nums`],"fvn-spacing":[`proportional-nums`,`tabular-nums`],"fvn-fraction":[`diagonal-fractions`,`stacked-fractions`],tracking:[{tracking:[`tighter`,`tight`,`normal`,`wide`,`wider`,`widest`,H]}],"line-clamp":[{"line-clamp":[`none`,rr,ir]}],leading:[{leading:[`none`,`tight`,`snug`,`normal`,`relaxed`,`loose`,tr,H]}],"list-image":[{"list-image":[`none`,H]}],"list-style-type":[{list:[`none`,`disc`,`decimal`,H]}],"list-style-position":[{list:[`inside`,`outside`]}],"placeholder-color":[{placeholder:[e]}],"placeholder-opacity":[{"placeholder-opacity":[_]}],"text-alignment":[{text:[`left`,`center`,`right`,`justify`,`start`,`end`]}],"text-color":[{text:[e]}],"text-opacity":[{"text-opacity":[_]}],"text-decoration":[`underline`,`overline`,`line-through`,`no-underline`],"text-decoration-style":[{decoration:[...oe(),`wavy`]}],"text-decoration-thickness":[{decoration:[`auto`,`from-font`,tr,nr]}],"underline-offset":[{"underline-offset":[`auto`,tr,H]}],"text-decoration-color":[{decoration:[e]}],"text-transform":[`uppercase`,`lowercase`,`capitalize`,`normal-case`],"text-overflow":[`truncate`,`text-ellipsis`,`text-clip`],"text-wrap":[{text:[`wrap`,`nowrap`,`balance`,`pretty`]}],indent:[{indent:T()}],"vertical-align":[{align:[`baseline`,`top`,`middle`,`bottom`,`text-top`,`text-bottom`,`sub`,`super`,H]}],whitespace:[{whitespace:[`normal`,`nowrap`,`pre`,`pre-line`,`pre-wrap`,`break-spaces`]}],break:[{break:[`normal`,`words`,`all`,`keep`]}],hyphens:[{hyphens:[`none`,`manual`,`auto`]}],content:[{content:[`none`,H]}],"bg-attachment":[{bg:[`fixed`,`local`,`scroll`]}],"bg-clip":[{"bg-clip":[`border`,`padding`,`content`,`text`]}],"bg-opacity":[{"bg-opacity":[_]}],"bg-origin":[{"bg-origin":[`border`,`padding`,`content`]}],"bg-position":[{bg:[...ae(),ur]}],"bg-repeat":[{bg:[`no-repeat`,{repeat:[``,`x`,`y`,`round`,`space`]}]}],"bg-size":[{bg:[`auto`,`cover`,`contain`,lr]}],"bg-image":[{bg:[`none`,{"gradient-to":[`t`,`tr`,`r`,`br`,`b`,`bl`,`l`,`tl`]},fr]}],"bg-color":[{bg:[e]}],"gradient-from-pos":[{from:[m]}],"gradient-via-pos":[{via:[m]}],"gradient-to-pos":[{to:[m]}],"gradient-from":[{from:[p]}],"gradient-via":[{via:[p]}],"gradient-to":[{to:[p]}],rounded:[{rounded:[a]}],"rounded-s":[{"rounded-s":[a]}],"rounded-e":[{"rounded-e":[a]}],"rounded-t":[{"rounded-t":[a]}],"rounded-r":[{"rounded-r":[a]}],"rounded-b":[{"rounded-b":[a]}],"rounded-l":[{"rounded-l":[a]}],"rounded-ss":[{"rounded-ss":[a]}],"rounded-se":[{"rounded-se":[a]}],"rounded-ee":[{"rounded-ee":[a]}],"rounded-es":[{"rounded-es":[a]}],"rounded-tl":[{"rounded-tl":[a]}],"rounded-tr":[{"rounded-tr":[a]}],"rounded-br":[{"rounded-br":[a]}],"rounded-bl":[{"rounded-bl":[a]}],"border-w":[{border:[s]}],"border-w-x":[{"border-x":[s]}],"border-w-y":[{"border-y":[s]}],"border-w-s":[{"border-s":[s]}],"border-w-e":[{"border-e":[s]}],"border-w-t":[{"border-t":[s]}],"border-w-r":[{"border-r":[s]}],"border-w-b":[{"border-b":[s]}],"border-w-l":[{"border-l":[s]}],"border-opacity":[{"border-opacity":[_]}],"border-style":[{border:[...oe(),`hidden`]}],"divide-x":[{"divide-x":[s]}],"divide-x-reverse":[`divide-x-reverse`],"divide-y":[{"divide-y":[s]}],"divide-y-reverse":[`divide-y-reverse`],"divide-opacity":[{"divide-opacity":[_]}],"divide-style":[{divide:oe()}],"border-color":[{border:[i]}],"border-color-x":[{"border-x":[i]}],"border-color-y":[{"border-y":[i]}],"border-color-s":[{"border-s":[i]}],"border-color-e":[{"border-e":[i]}],"border-color-t":[{"border-t":[i]}],"border-color-r":[{"border-r":[i]}],"border-color-b":[{"border-b":[i]}],"border-color-l":[{"border-l":[i]}],"divide-color":[{divide:[i]}],"outline-style":[{outline:[``,...oe()]}],"outline-offset":[{"outline-offset":[tr,H]}],"outline-w":[{outline:[tr,nr]}],"outline-color":[{outline:[e]}],"ring-w":[{ring:re()}],"ring-w-inset":[`ring-inset`],"ring-color":[{ring:[e]}],"ring-opacity":[{"ring-opacity":[_]}],"ring-offset-w":[{"ring-offset":[tr,nr]}],"ring-offset-color":[{"ring-offset":[e]}],shadow:[{shadow:[``,`inner`,`none`,sr,pr]}],"shadow-color":[{shadow:[mr]}],opacity:[{opacity:[_]}],"mix-blend":[{"mix-blend":[...se(),`plus-lighter`,`plus-darker`]}],"bg-blend":[{"bg-blend":se()}],filter:[{filter:[``,`none`]}],blur:[{blur:[n]}],brightness:[{brightness:[r]}],contrast:[{contrast:[c]}],"drop-shadow":[{"drop-shadow":[``,`none`,sr,H]}],grayscale:[{grayscale:[l]}],"hue-rotate":[{"hue-rotate":[u]}],invert:[{invert:[d]}],saturate:[{saturate:[y]}],sepia:[{sepia:[x]}],"backdrop-filter":[{"backdrop-filter":[``,`none`]}],"backdrop-blur":[{"backdrop-blur":[n]}],"backdrop-brightness":[{"backdrop-brightness":[r]}],"backdrop-contrast":[{"backdrop-contrast":[c]}],"backdrop-grayscale":[{"backdrop-grayscale":[l]}],"backdrop-hue-rotate":[{"backdrop-hue-rotate":[u]}],"backdrop-invert":[{"backdrop-invert":[d]}],"backdrop-opacity":[{"backdrop-opacity":[_]}],"backdrop-saturate":[{"backdrop-saturate":[y]}],"backdrop-sepia":[{"backdrop-sepia":[x]}],"border-collapse":[{border:[`collapse`,`separate`]}],"border-spacing":[{"border-spacing":[o]}],"border-spacing-x":[{"border-spacing-x":[o]}],"border-spacing-y":[{"border-spacing-y":[o]}],"table-layout":[{table:[`auto`,`fixed`]}],caption:[{caption:[`top`,`bottom`]}],transition:[{transition:[`none`,`all`,``,`colors`,`opacity`,`shadow`,`transform`,H]}],duration:[{duration:E()}],ease:[{ease:[`linear`,`in`,`out`,`in-out`,H]}],delay:[{delay:E()}],animate:[{animate:[`none`,`spin`,`ping`,`pulse`,`bounce`,H]}],transform:[{transform:[``,`gpu`,`none`]}],scale:[{scale:[b]}],"scale-x":[{"scale-x":[b]}],"scale-y":[{"scale-y":[b]}],rotate:[{rotate:[ar,H]}],"translate-x":[{"translate-x":[C]}],"translate-y":[{"translate-y":[C]}],"skew-x":[{"skew-x":[S]}],"skew-y":[{"skew-y":[S]}],"transform-origin":[{origin:[`center`,`top`,`top-right`,`right`,`bottom-right`,`bottom`,`bottom-left`,`left`,`top-left`,H]}],accent:[{accent:[`auto`,e]}],appearance:[{appearance:[`none`,`auto`]}],cursor:[{cursor:[`auto`,`default`,`pointer`,`wait`,`text`,`move`,`help`,`not-allowed`,`none`,`context-menu`,`progress`,`cell`,`crosshair`,`vertical-text`,`alias`,`copy`,`no-drop`,`grab`,`grabbing`,`all-scroll`,`col-resize`,`row-resize`,`n-resize`,`e-resize`,`s-resize`,`w-resize`,`ne-resize`,`nw-resize`,`se-resize`,`sw-resize`,`ew-resize`,`ns-resize`,`nesw-resize`,`nwse-resize`,`zoom-in`,`zoom-out`,H]}],"caret-color":[{caret:[e]}],"pointer-events":[{"pointer-events":[`none`,`auto`]}],resize:[{resize:[`none`,`y`,`x`,``]}],"scroll-behavior":[{scroll:[`auto`,`smooth`]}],"scroll-m":[{"scroll-m":T()}],"scroll-mx":[{"scroll-mx":T()}],"scroll-my":[{"scroll-my":T()}],"scroll-ms":[{"scroll-ms":T()}],"scroll-me":[{"scroll-me":T()}],"scroll-mt":[{"scroll-mt":T()}],"scroll-mr":[{"scroll-mr":T()}],"scroll-mb":[{"scroll-mb":T()}],"scroll-ml":[{"scroll-ml":T()}],"scroll-p":[{"scroll-p":T()}],"scroll-px":[{"scroll-px":T()}],"scroll-py":[{"scroll-py":T()}],"scroll-ps":[{"scroll-ps":T()}],"scroll-pe":[{"scroll-pe":T()}],"scroll-pt":[{"scroll-pt":T()}],"scroll-pr":[{"scroll-pr":T()}],"scroll-pb":[{"scroll-pb":T()}],"scroll-pl":[{"scroll-pl":T()}],"snap-align":[{snap:[`start`,`end`,`center`,`align-none`]}],"snap-stop":[{snap:[`normal`,`always`]}],"snap-type":[{snap:[`none`,`x`,`y`,`both`]}],"snap-strictness":[{snap:[`mandatory`,`proximity`]}],touch:[{touch:[`auto`,`none`,`manipulation`]}],"touch-x":[{"touch-pan":[`x`,`left`,`right`]}],"touch-y":[{"touch-pan":[`y`,`up`,`down`]}],"touch-pz":[`touch-pinch-zoom`],select:[{select:[`none`,`text`,`all`,`auto`]}],"will-change":[{"will-change":[`auto`,`scroll`,`contents`,`transform`,H]}],fill:[{fill:[e,`none`]}],"stroke-w":[{stroke:[tr,nr,ir]}],stroke:[{stroke:[e,`none`]}],sr:[`sr-only`,`not-sr-only`],"forced-color-adjust":[{"forced-color-adjust":[`auto`,`none`]}]},conflictingClassGroups:{overflow:[`overflow-x`,`overflow-y`],overscroll:[`overscroll-x`,`overscroll-y`],inset:[`inset-x`,`inset-y`,`start`,`end`,`top`,`right`,`bottom`,`left`],"inset-x":[`right`,`left`],"inset-y":[`top`,`bottom`],flex:[`basis`,`grow`,`shrink`],gap:[`gap-x`,`gap-y`],p:[`px`,`py`,`ps`,`pe`,`pt`,`pr`,`pb`,`pl`],px:[`pr`,`pl`],py:[`pt`,`pb`],m:[`mx`,`my`,`ms`,`me`,`mt`,`mr`,`mb`,`ml`],mx:[`mr`,`ml`],my:[`mt`,`mb`],size:[`w`,`h`],"font-size":[`leading`],"fvn-normal":[`fvn-ordinal`,`fvn-slashed-zero`,`fvn-figure`,`fvn-spacing`,`fvn-fraction`],"fvn-ordinal":[`fvn-normal`],"fvn-slashed-zero":[`fvn-normal`],"fvn-figure":[`fvn-normal`],"fvn-spacing":[`fvn-normal`],"fvn-fraction":[`fvn-normal`],"line-clamp":[`display`,`overflow`],rounded:[`rounded-s`,`rounded-e`,`rounded-t`,`rounded-r`,`rounded-b`,`rounded-l`,`rounded-ss`,`rounded-se`,`rounded-ee`,`rounded-es`,`rounded-tl`,`rounded-tr`,`rounded-br`,`rounded-bl`],"rounded-s":[`rounded-ss`,`rounded-es`],"rounded-e":[`rounded-se`,`rounded-ee`],"rounded-t":[`rounded-tl`,`rounded-tr`],"rounded-r":[`rounded-tr`,`rounded-br`],"rounded-b":[`rounded-br`,`rounded-bl`],"rounded-l":[`rounded-tl`,`rounded-bl`],"border-spacing":[`border-spacing-x`,`border-spacing-y`],"border-w":[`border-w-s`,`border-w-e`,`border-w-t`,`border-w-r`,`border-w-b`,`border-w-l`],"border-w-x":[`border-w-r`,`border-w-l`],"border-w-y":[`border-w-t`,`border-w-b`],"border-color":[`border-color-s`,`border-color-e`,`border-color-t`,`border-color-r`,`border-color-b`,`border-color-l`],"border-color-x":[`border-color-r`,`border-color-l`],"border-color-y":[`border-color-t`,`border-color-b`],"scroll-m":[`scroll-mx`,`scroll-my`,`scroll-ms`,`scroll-me`,`scroll-mt`,`scroll-mr`,`scroll-mb`,`scroll-ml`],"scroll-mx":[`scroll-mr`,`scroll-ml`],"scroll-my":[`scroll-mt`,`scroll-mb`],"scroll-p":[`scroll-px`,`scroll-py`,`scroll-ps`,`scroll-pe`,`scroll-pt`,`scroll-pr`,`scroll-pb`,`scroll-pl`],"scroll-px":[`scroll-pr`,`scroll-pl`],"scroll-py":[`scroll-pt`,`scroll-pb`],touch:[`touch-x`,`touch-y`,`touch-pz`],"touch-x":[`touch`],"touch-y":[`touch`],"touch-pz":[`touch`]},conflictingClassGroupModifiers:{"font-size":[`leading`]}}}),U=(...e)=>br(En(e));typeof navigator<`u`&&navigator.userAgent.includes(`Firefox`);var xr=(e,t)=>{let n=0;return r=>{let i=Date.now();if(i-n>=t)return n=i,e(r)}},Sr=e=>{if(!fn)return null;try{let t=localStorage.getItem(e);return t?JSON.parse(t):null}catch{return null}},Cr=(e,t)=>{if(fn)try{window.localStorage.setItem(e,JSON.stringify(t))}catch{}},wr=e=>{if(fn)try{window.localStorage.removeItem(e)}catch{}},Tr=24,Er=12,Dr=e=>{if(!e)return{name:`Unknown`,wrappers:[],wrapperTypes:[]};let{tag:t,type:n,elementType:r}=e,i=l(n),a=[],o=[];if(p(e)||t===15||t===14||n?.$$typeof===Symbol.for(`react.memo`)||r?.$$typeof===Symbol.for(`react.memo`)){let t=p(e);o.push({type:`memo`,title:t?`This component has been auto-memoized by the React Compiler.`:`Memoized component that skips re-renders if props are the same`,compiler:t})}if(t===Tr&&o.push({type:`lazy`,title:`Lazily loaded component that supports code splitting`}),t===13&&o.push({type:`suspense`,title:`Component that can suspend while content is loading`}),t===Er&&o.push({type:`profiler`,title:`Component that measures rendering performance`}),typeof i==`string`){let e=/^(\w+)\((.*)\)$/,t=i;for(;e.test(t);){let n=t.match(e);if(n?.[1]&&n?.[2])a.unshift(n[1]),t=n[2];else break}i=t}return{name:i||`Unknown`,wrappers:a,wrapperTypes:o}},Or=I(!1),kr=I(null),Ar={corner:`bottom-right`,dimensions:{isFullWidth:!1,isFullHeight:!1,width:B.width,height:B.height,position:{x:z,y:z}},lastDimensions:{isFullWidth:!1,isFullHeight:!1,width:B.width,height:B.height,position:{x:z,y:z}},componentsTree:{width:xn}},W=I((()=>{let e=Sr(Sn);return e?{corner:e.corner??Ar.corner,dimensions:e.dimensions??Ar.dimensions,lastDimensions:e.lastDimensions??e.dimensions??Ar.lastDimensions,componentsTree:e.componentsTree??Ar.componentsTree}:(Cr(Sn,{corner:Ar.corner,dimensions:Ar.dimensions,lastDimensions:Ar.lastDimensions,componentsTree:Ar.componentsTree}),Ar)})()),jr=()=>{if(!fn)return;let{dimensions:e}=W.value,{width:t,height:n,position:r}=e;W.value={...W.value,dimensions:{isFullWidth:t>=window.innerWidth-z*2,isFullHeight:n>=window.innerHeight-z*2,width:t,height:n,position:r}}},G=I({view:`none`}),Mr=I(Sr(Cn)??null);function Nr(){return!1}function Pr(e){function t(t){return this.shouldComponentUpdate=Nr,E(e,t)}return t.displayName=`Memo(${e.displayName||e.name})`,t.prototype.isReactComponent=!0,t._forwarded=!0,t}var Fr=e=>{let{count:t,getScrollElement:n,estimateSize:r,overscan:i=5}=e,[a,o]=A(0),[s,c]=A(0),l=M(),u=M(null),d=M(null),f=r(),p=N(e=>{u.current&&c(e?.[0]?.contentRect.height??u.current.getBoundingClientRect().height)},[]),m=N(()=>{d.current!==null&&cancelAnimationFrame(d.current),d.current=requestAnimationFrame(()=>{p(),d.current=null})},[p]);j(()=>{let e=n();if(!e)return;u.current=e;let t=()=>{u.current&&o(u.current.scrollTop)};p(),l.current||=new ResizeObserver(()=>{m()}),l.current.observe(e),e.addEventListener(`scroll`,t,{passive:!0});let r=new MutationObserver(m);return r.observe(e,{attributes:!0,childList:!0,subtree:!0}),()=>{e.removeEventListener(`scroll`,t),l.current&&l.current.disconnect(),r.disconnect(),d.current!==null&&cancelAnimationFrame(d.current)}},[n,p,m]);let h=Xe(()=>{let e=Math.floor(a/f),n=Math.ceil(s/f);return{start:Math.max(0,e-i),end:Math.min(t,e+n+i)}},[a,f,s,t,i]);return{virtualItems:Xe(()=>{let e=[];for(let t=h.start;t<h.end;t++)e.push({key:t,index:t,start:t*f});return e},[h,f]),totalSize:t*f,scrollTop:a,containerHeight:s}},Ir=e=>{let t=[],n=e;for(;n;){let e=n.elementType,r=typeof e==`function`?e.displayName||e.name:typeof e==`string`?e:`Unknown`,i=n.index===void 0?``:`[${n.index}]`;t.unshift(`${r}${i}`),n=n.return??null}return t.join(`::`)},Lr=new WeakMap,Rr=(e,t)=>{let n=t.bind(null,e);return document.addEventListener(`scroll`,n,{passive:!0,capture:!0}),()=>{document.removeEventListener(`scroll`,n,{capture:!0})}},zr={activeFlashes:new Map,create(e){let t=e.querySelector(`.react-scan-flash-overlay`),n=t instanceof HTMLElement?t:(()=>{let t=document.createElement(`div`);t.className=`react-scan-flash-overlay`,e.appendChild(t);let n=Rr(e,()=>{e.querySelector(`.react-scan-flash-overlay`)&&this.create(e)});return this.activeFlashes.set(e,{element:e,overlay:t,scrollCleanup:n}),t})(),r=Lr.get(n);r&&(clearTimeout(r),Lr.delete(n)),requestAnimationFrame(()=>{n.style.transition=`none`,n.style.opacity=`0.9`;let t=setTimeout(()=>{n.style.transition=`opacity 150ms ease-out`,n.style.opacity=`0`;let t=setTimeout(()=>{n.parentNode&&n.parentNode.removeChild(n);let t=this.activeFlashes.get(e);t?.scrollCleanup&&t.scrollCleanup(),this.activeFlashes.delete(e),Lr.delete(n)},150);Lr.set(n,t)},300);Lr.set(n,t)})},cleanup(e){let t=this.activeFlashes.get(e);if(t){let n=Lr.get(t.overlay);n&&(clearTimeout(n),Lr.delete(t.overlay)),t.overlay.parentNode&&t.overlay.parentNode.removeChild(t.overlay),t.scrollCleanup&&t.scrollCleanup(),this.activeFlashes.delete(e)}},cleanupAll(){for(let[,e]of this.activeFlashes)this.cleanup(e.element)}},Br=1e3,Vr={updates:[],currentFiber:null,totalUpdates:0,windowOffset:0,currentIndex:0,isViewingHistory:!1,latestFiber:null,isVisible:!1,playbackSpeed:1},Hr=I(Vr),Ur=I(0),Wr=[],Gr=null,Kr=()=>{if(Wr.length===0)return;let e=[...Wr],{updates:t,totalUpdates:n,currentIndex:r,isViewingHistory:i}=Hr.value,a=[...t],o=n;for(let{update:t}of e)a.length>=Br&&a.shift(),a.push(t),o++;let s=Math.max(0,o-Br),c;c=i?r===n-1?a.length-1:r===0?0:s===0?r:r-1:a.length-1;let l=e[e.length-1];Hr.value={...Hr.value,latestFiber:l.fiber,updates:a,totalUpdates:o,windowOffset:s,currentIndex:c,isViewingHistory:i},Wr=Wr.slice(e.length)},qr={showTimeline:()=>{Hr.value={...Hr.value,isVisible:!0}},hideTimeline:()=>{Hr.value={...Hr.value,isVisible:!1,currentIndex:Hr.value.updates.length-1}},updateFrame:(e,t)=>{Hr.value={...Hr.value,currentIndex:e,isViewingHistory:t}},updatePlaybackSpeed:e=>{Hr.value={...Hr.value,playbackSpeed:e}},addUpdate:(e,t)=>{if(Wr.push({update:e,fiber:t}),!Gr){let e=()=>{Kr(),Gr=null,Wr.length>0&&(Gr=setTimeout(e,96))};Gr=setTimeout(e,96)}},reset:()=>{Gr&&=(clearTimeout(Gr),null),Wr=[],Hr.value=Vr}},K=I({query:``,matches:[],currentMatchIndex:-1}),Jr=I(!1),Yr=(e,t=0,n=null)=>e.reduce((e,r,i)=>{let a=r.element?Ir(r.fiber):`${n}-${i}`,o=r.fiber?.type?Ga(r.fiber):void 0,s={...r,depth:t,nodeId:a,parentId:n,fiber:r.fiber,renderData:o};return e.push(s),r.children?.length&&e.push(...Yr(r.children,t+1,a)),e},[]),Xr=e=>e.reduce((e,t)=>Math.max(e,t.depth),0),Zr=(e,t)=>{if(t<=0)return 24;let n=Math.max(0,e-xn);if(n<24)return 0;let r=Math.min(n*.3,t*24)/t;return Math.max(0,Math.min(24,r))},Qr=[`memo`,`forwardRef`,`lazy`,`suspense`],$r=e=>{let t=e.match(/\[(.*?)\]/);if(!t)return null;let n=[],r=t[1].split(`,`);for(let e of r){let t=e.trim().toLowerCase();t&&n.push(t)}return n},ei=e=>{if(e.length===0)return!1;for(let t of e){let e=!1;for(let n of Qr)if(n.toLowerCase().includes(t)){e=!0;break}if(!e)return!1}return!0},ti=(e,t)=>{if(e.length===0)return!0;if(!t.length)return!1;for(let n of e){let e=!1;for(let r of t)if(r.type.toLowerCase().includes(n)){e=!0;break}if(!e)return!1}return!0},ni=(e,t)=>Xe(()=>{let{query:n,matches:r}=t,i=r.some(t=>t.nodeId===e.nodeId),a=$r(n)||[],o=n?n.replace(/\[.*?\]/,``).trim():``;if(!n||!i)return{highlightedText:L(`span`,{className:`truncate`,children:e.label}),typeHighlight:!1};let s=!0;if(a.length>0)if(!e.fiber)s=!1;else{let{wrapperTypes:t}=Dr(e.fiber);s=ti(a,t)}let c=L(`span`,{className:`truncate`,children:e.label});if(o)try{if(o.startsWith(`/`)&&o.endsWith(`/`)){let t=o.slice(1,-1),n=RegExp(`(${t})`,`i`),r=e.label.split(n);c=L(`span`,{className:`tree-node-search-highlight`,children:r.map((t,i)=>n.test(t)?L(`span`,{className:U(`regex`,{start:n.test(t)&&i===0,middle:n.test(t)&&i%2==1,end:n.test(t)&&i===r.length-1,"!ml-0":i===1}),children:t},`${e.nodeId}-${t}`):t)})}else{let t=e.label.toLowerCase(),n=o.toLowerCase(),r=t.indexOf(n);r>=0&&(c=L(`span`,{className:`tree-node-search-highlight`,children:[e.label.slice(0,r),L(`span`,{className:`single`,children:e.label.slice(r,r+o.length)}),e.label.slice(r+o.length)]}))}}catch{}return{highlightedText:c,typeHighlight:s&&a.length>0}},[e.label,e.nodeId,e.fiber,t]),ri=e=>e>0?e<.1-2**-52?`< 0.1`:e<1e3?Number(e.toFixed(1)).toString():`${(e/1e3).toFixed(1)}k`:`0`,ii=({node:e,nodeIndex:t,hasChildren:n,isCollapsed:r,handleTreeNodeClick:i,handleTreeNodeToggle:a,searchValue:o})=>{let s=M(null),c=M(e.renderData?.renderCount??0),{highlightedText:l,typeHighlight:u}=ni(e,o);j(()=>{let t=e.renderData?.renderCount,n=s.current;!n||!c.current||!t||c.current===t||(n.classList.remove(`count-flash`),n.offsetWidth,n.classList.add(`count-flash`),c.current=t)},[e.renderData?.renderCount]);let d=Xe(()=>{if(!e.renderData)return null;let{selfTime:t,totalTime:n,renderCount:r}=e.renderData;return r?L(`span`,{className:U(`flex items-center gap-x-0.5 ml-1.5`,`text-[10px] text-neutral-400`),children:L(`span`,{ref:s,title:`Self time: ${ri(t)}ms
Total time: ${ri(n)}ms`,className:`count-badge`,children:[`×`,r]})}):null},[e.renderData]),f=Xe(()=>{if(!e.fiber)return null;let{wrapperTypes:t}=Dr(e.fiber),n=t[0];return L(`span`,{className:U(`flex items-center gap-x-1`,`text-[10px] text-neutral-400 tracking-wide`,`overflow-hidden`),children:[n&&L(D,{children:[L(`span`,{title:n?.title,className:U(`rounded py-[1px] px-1`,`bg-neutral-700 text-neutral-300`,`truncate`,n.type===`memo`&&`bg-[#8e61e3] text-white`,u&&`bg-yellow-300 text-black`),children:n.type},n.type),n.compiler&&L(`span`,{className:`text-yellow-300 ml-1`,children:`✨`})]}),t.length>1&&`\xD7${t.length}`,d]})},[e.fiber,u,d]);return L(`button`,{type:`button`,title:e.title,"data-index":t,className:U(`flex items-center gap-x-1`,`pl-1 pr-2`,`w-full h-7`,`text-left`,`rounded`,`cursor-pointer select-none`),onClick:i,children:[L(`button`,{type:`button`,"data-index":t,onClick:a,className:U(`w-6 h-6 flex items-center justify-center`,`text-left`),children:n&&L(R,{name:`icon-chevron-right`,size:12,className:U(`transition-transform`,!r&&`rotate-90`)})}),l,f]})},ai=()=>{let e=M(null),t=M(null),n=M(null),r=M(null),i=M(null),a=M(0),o=M(!1),s=M(!1),c=M(null),[l,u]=A([]),[d,f]=A(new Set),[p,m]=A(void 0),[h,g]=A(K.value),_=Xe(()=>{let e=[],t=l,n=new Map(t.map(e=>[e.nodeId,e]));for(let r of t){let t=!0,i=r;for(;i.parentId;){let e=n.get(i.parentId);if(!e)break;if(d.has(e.nodeId)){t=!1;break}i=e}t&&e.push(r)}return e},[d,l]),{virtualItems:v,totalSize:y}=Fr({count:_.length,getScrollElement:()=>e.current,estimateSize:()=>28,overscan:5}),b=N(t=>{o.current=!0,r.current?.blur(),Jr.value=!0;let{parentCompositeFiber:n}=Bi(t);if(!n)return;Q.inspectState.value={kind:`focused`,focusedDomElement:t,fiber:n};let i=_.findIndex(e=>e.element===t);if(i!==-1){m(i);let t=i*28,n=e.current;if(n){let e=n.clientHeight,r=n.scrollTop;(t<r||t+28>r+e)&&n.scrollTo({top:Math.max(0,t-e/2),behavior:`instant`})}}},[_]),x=N(e=>{let t=e.currentTarget,n=Number(t.dataset.index);if(Number.isNaN(n))return;let r=_[n].element;r&&b(r)},[_,b]),S=N(e=>{f(t=>{let n=new Set(t);return n.has(e)?n.delete(e):n.add(e),n})},[]),ee=N(e=>{e.stopPropagation();let t=e.target,n=Number(t.dataset.index);if(Number.isNaN(n))return;let r=_[n].nodeId;S(r)},[_,S]),C=N(t=>{n.current?.classList.remove(`!border-red-500`);let r=[];if(!t){K.value={query:t,matches:r,currentMatchIndex:-1};return}if(t.includes(`[`)&&!t.includes(`]`)&&t.length>t.indexOf(`[`)+1){n.current?.classList.add(`!border-red-500`);return}let i=$r(t)||[];if(t.includes(`[`)&&!ei(i)){n.current?.classList.add(`!border-red-500`);return}let a=t.replace(/\[.*?\]/,``).trim(),o=/^\/.*\/$/.test(a),s=e=>!1;if(a.startsWith(`/`)&&!o&&a.length>1){n.current?.classList.add(`!border-red-500`);return}if(o)try{let e=a.slice(1,-1),t=new RegExp(e,`i`);s=e=>t.test(e)}catch{n.current?.classList.add(`!border-red-500`);return}else if(a){let e=a.toLowerCase();s=t=>t.toLowerCase().includes(e)}for(let e of l){let t=!0;if(a&&(t=s(e.label)),t&&i.length>0)if(!e.fiber)t=!1;else{let{wrapperTypes:n}=Dr(e.fiber);t=ti(i,n)}t&&r.push(e)}if(K.value={query:t,matches:r,currentMatchIndex:r.length>0?0:-1},r.length>0){let t=r[0],n=_.findIndex(e=>e.nodeId===t.nodeId);if(n!==-1){let t=n*28,r=e.current;if(r){let e=r.clientHeight;r.scrollTo({top:Math.max(0,t-e/2),behavior:`instant`})}}}},[l,_]),te=N(e=>{let t=e.currentTarget;t&&C(t.value)},[C]),w=N(t=>{let{matches:n,currentMatchIndex:r}=K.value;if(n.length===0)return;let i=t===`next`?(r+1)%n.length:(r-1+n.length)%n.length;K.value={...K.value,currentMatchIndex:i};let a=n[i],o=_.findIndex(e=>e.nodeId===a.nodeId);if(o!==-1){m(o);let t=o*28,n=e.current;if(n){let e=n.clientHeight;n.scrollTo({top:Math.max(0,t-e/2),behavior:`instant`})}}},[_]),ne=N(n=>{if(t.current&&(t.current.style.width=`${n}px`),e.current){e.current.style.width=`${n}px`;let t=Zr(n,a.current);e.current.style.setProperty(`--indentation-size`,`${t}px`)}},[]),T=N(e=>{if(!c.current)return;let t=W.value.dimensions.width,n=Math.floor(t-xn/2);c.current.classList.remove(`cursor-ew-resize`,`cursor-w-resize`,`cursor-e-resize`),e<=xn?c.current.classList.add(`cursor-w-resize`):e>=n?c.current.classList.add(`cursor-e-resize`):c.current.classList.add(`cursor-ew-resize`)},[]),re=N(t=>{if(t.preventDefault(),t.stopPropagation(),!e.current)return;e.current.style.setProperty(`pointer-events`,`none`),s.current=!0;let n=t.clientX,r=e.current.offsetWidth,i=W.value.dimensions.width,a=Math.floor(i-xn/2);T(r);let o=e=>{let t=r+(n-e.clientX);T(t),ne(Math.min(a,Math.max(xn,t)))},c=()=>{e.current&&(e.current.style.removeProperty(`pointer-events`),document.removeEventListener(`pointermove`,o),document.removeEventListener(`pointerup`,c),W.value={...W.value,componentsTree:{...W.value.componentsTree,width:e.current.offsetWidth}},Cr(Sn,W.value),s.current=!1)};document.addEventListener(`pointermove`,o),document.addEventListener(`pointerup`,c)},[ne,T]);j(()=>{if(!e.current)return;let t=e.current.offsetWidth;return T(t),W.subscribe(()=>{e.current&&T(e.current.offsetWidth)})},[T]);let ie=N(()=>{o.current=!1},[]);return j(()=>{let t=!0,n=e=>{let t=new Map,n=[];for(let{element:n,name:r,fiber:i}of e){if(!n)continue;let e=r,{name:a,wrappers:o}=Dr(i);a&&(e=o.length>0?`${o.join(`(`)}(${a})${`)`.repeat(o.length)}`:a),t.set(n,{label:a||r,title:e,children:[],element:n,fiber:i})}for(let{element:r,depth:i}of e){if(!r)continue;let e=t.get(r);if(e)if(i===0)n.push(e);else{let n=r.parentElement;for(;n;){let r=t.get(n);if(r){r.children=r.children||[],r.children.push(e);break}n=n.parentElement}}}return n},r=()=>{let r=i.current;if(!r)return;let o=n(Gi());if(o.length>0){let n=Yr(o);if(a.current=Xr(n),ne(W.value.componentsTree.width),u(n),t){t=!1;let i=n.findIndex(e=>e.element===r);if(i!==-1){let t=i*28,n=e.current;n&&setTimeout(()=>{n.scrollTo({top:t,behavior:`instant`})},96)}}}},o=Q.inspectState.subscribe(e=>{if(e.kind===`focused`){if(Jr.value)return;C(``),i.current=e.focusedDomElement,r()}}),c=0,l=Ur.subscribe(()=>{if(Q.inspectState.value.kind===`focused`){if(cancelAnimationFrame(c),s.current)return;c=requestAnimationFrame(()=>{Jr.value=!1,r()})}});return()=>{o(),l(),K.value={query:``,matches:[],currentMatchIndex:-1}}},[]),j(()=>{let e=e=>{if(o.current&&p)switch(e.key){case`ArrowUp`:if(e.preventDefault(),e.stopPropagation(),p>0){let e=_[p-1];e?.element&&b(e.element)}return;case`ArrowDown`:if(e.preventDefault(),e.stopPropagation(),p<_.length-1){let e=_[p+1];e?.element&&b(e.element)}return;case`ArrowLeft`:{e.preventDefault(),e.stopPropagation();let t=_[p];t?.nodeId&&S(t.nodeId);return}case`ArrowRight`:{e.preventDefault(),e.stopPropagation();let t=_[p];t?.nodeId&&S(t.nodeId);return}}};return document.addEventListener(`keydown`,e),()=>{document.removeEventListener(`keydown`,e)}},[p,_,b,S]),j(()=>K.subscribe(g),[]),j(()=>W.subscribe(e=>{t.current?.style.setProperty(`transition`,`width 0.1s`),ne(e.componentsTree.width),setTimeout(()=>{t.current?.style.removeProperty(`transition`)},500)}),[]),L(`div`,{className:`react-scan-components-tree flex`,children:[L(`div`,{ref:c,onPointerDown:re,className:`relative resize-v-line`,children:L(`span`,{children:L(R,{name:`icon-ellipsis`,size:18})})}),L(`div`,{ref:t,className:`flex flex-col h-full`,children:[L(`div`,{className:`p-2 border-b border-[#1e1e1e]`,children:L(`div`,{ref:n,title:`Search components by:

• Name (e.g., "Button") — Case insensitive, matches any part

• Regular Expression (e.g., "/^Button/") — Use forward slashes

• Wrapper Type (e.g., "[memo,forwardRef]"):
   - Available types: memo, forwardRef, lazy, suspense
   - Matches any part of type name (e.g., "mo" matches "memo")
   - Use commas for multiple types

• Combined Search:
   - Mix name/regex with type: "button [for]"
   - Will match components satisfying both conditions

• Navigation:
   - Enter → Next match
   - Shift + Enter → Previous match
   - Cmd/Ctrl + Enter → Select and focus match
`,className:U(`relative`,`flex items-center gap-x-1 px-2`,`rounded`,`border border-transparent`,`focus-within:border-[#454545]`,`bg-[#1e1e1e] text-neutral-300`,`transition-colors`,`whitespace-nowrap`,`overflow-hidden`),children:[L(R,{name:`icon-search`,size:12,className:` text-neutral-500`}),L(`div`,{className:`relative flex-1 h-7 overflow-hidden`,children:L(`input`,{ref:r,type:`text`,value:K.value.query,onClick:e=>{e.stopPropagation(),e.currentTarget.focus()},onPointerDown:e=>{e.stopPropagation()},onKeyDown:e=>{e.key===`Escape`&&e.currentTarget.blur(),K.value.matches.length&&(e.key===`Enter`&&e.shiftKey?w(`prev`):e.key===`Enter`&&(e.metaKey||e.ctrlKey?(e.preventDefault(),e.stopPropagation(),b(K.value.matches[K.value.currentMatchIndex].element),e.currentTarget.focus()):w(`next`)))},onChange:te,className:`absolute inset-y-0 inset-x-1`,placeholder:`Component name, /regex/, or [type]`})}),K.value.query?L(D,{children:[L(`span`,{className:`flex items-center gap-x-0.5 text-xs text-neutral-500`,children:[K.value.currentMatchIndex+1,`|`,K.value.matches.length]}),!!K.value.matches.length&&L(D,{children:[L(`button`,{type:`button`,onClick:e=>{e.stopPropagation(),w(`prev`)},className:`button rounded w-4 h-4 flex items-center justify-center text-neutral-400 hover:text-neutral-300`,children:L(R,{name:`icon-chevron-right`,className:`-rotate-90`,size:12})}),L(`button`,{type:`button`,onClick:e=>{e.stopPropagation(),w(`next`)},className:`button rounded w-4 h-4 flex items-center justify-center text-neutral-400 hover:text-neutral-300`,children:L(R,{name:`icon-chevron-right`,className:`rotate-90`,size:12})})]}),L(`button`,{type:`button`,onClick:e=>{e.stopPropagation(),C(``)},className:`button rounded w-4 h-4 flex items-center justify-center text-neutral-400 hover:text-neutral-300`,children:L(R,{name:`icon-close`,size:12})})]}):!!l.length&&L(`span`,{className:`text-xs text-neutral-500`,children:l.length})]})}),L(`div`,{className:`flex-1 overflow-hidden`,children:L(`div`,{ref:e,onPointerLeave:ie,className:`tree h-full overflow-auto will-change-transform`,children:L(`div`,{className:`relative w-full`,style:{height:y},children:v.map(e=>{let t=_[e.index];if(!t)return null;let n=Q.inspectState.value.kind===`focused`&&t.element===Q.inspectState.value.focusedDomElement,r=e.index===p;return L(`div`,{className:U(`absolute left-0 w-full overflow-hidden`,`text-neutral-400 hover:text-neutral-300`,`bg-transparent hover:bg-[#5f3f9a]/20`,(n||r)&&`text-neutral-300 bg-[#5f3f9a]/40 hover:bg-[#5f3f9a]/40`),style:{top:e.start,height:28},children:L(`div`,{className:`w-full h-full`,style:{paddingLeft:`calc(${t.depth} * var(--indentation-size))`},children:L(ii,{node:t,nodeIndex:e.index,hasChildren:!!t.children?.length,isCollapsed:d.has(t.nodeId),handleTreeNodeClick:x,handleTreeNodeToggle:ee,searchValue:h})})},t.nodeId)})})})})]})]})},oi=Rt(({text:e,children:t,onCopy:n,className:r,iconSize:i=14})=>{let[a,o]=A(!1);j(()=>{if(a){let e=setTimeout(()=>o(!1),600);return()=>{clearTimeout(e)}}},[a]);let s=N(t=>{t.preventDefault(),t.stopPropagation(),navigator.clipboard.writeText(e).then(()=>{o(!0),n?.(!0,e)},()=>{n?.(!1,e)})},[e,n]),c=L(`button`,{onClick:s,type:`button`,className:U(`z-10`,`flex items-center justify-center`,`hover:text-dev-pink-400`,`transition-colors duration-200 ease-in-out`,`cursor-pointer`,`size-[${i}px]`,r),children:L(R,{name:`icon-${a?`check`:`copy`}`,size:[i],className:U(a&&`text-green-500`)})});return t?t({ClipboardIcon:c,onClick:s}):c}),si=({length:e,expanded:t,onToggle:n,isNegative:r})=>L(`div`,{className:`flex items-center gap-1`,children:[L(`button`,{type:`button`,onClick:n,className:`flex items-center p-0 opacity-50`,children:L(R,{name:`icon-chevron-right`,size:12,className:U(`transition-[color,transform]`,r?`text-[#f87171]`:`text-[#4ade80]`,t&&`rotate-90`)})}),L(`span`,{children:[`Array(`,e,`)`]})]}),ci=({value:e,path:t,isNegative:n})=>{let[r,i]=A(!1);if(!(typeof e==`object`&&e&&!(e instanceof Date)))return L(`div`,{className:`flex items-center gap-1`,children:[L(`span`,{className:`text-gray-500`,children:[t,`:`]}),L(`span`,{className:`truncate`,children:Qi(e)})]});let a=Object.entries(e);return L(`div`,{className:`flex flex-col`,children:[L(`div`,{className:`flex items-center gap-1`,children:[L(`button`,{type:`button`,onClick:()=>i(!r),className:`flex items-center p-0 opacity-50`,children:L(R,{name:`icon-chevron-right`,size:12,className:U(`transition-[color,transform]`,n?`text-[#f87171]`:`text-[#4ade80]`,r&&`rotate-90`)})}),L(`span`,{className:`text-gray-500`,children:[t,`:`]}),!r&&L(`span`,{className:`truncate`,children:e instanceof Date?Qi(e):`{${Object.keys(e).join(`, `)}}`})]}),r&&L(`div`,{className:`pl-5 border-l border-[#333] mt-0.5 ml-1 flex flex-col gap-0.5`,children:a.map(([e,t])=>L(ci,{value:t,path:e,isNegative:n},e))})]})},li=({value:e,expanded:t,onToggle:n,isNegative:r})=>{let{value:i,error:a}=$i(e);return a?L(`span`,{className:`text-gray-500 font-italic`,children:a}):typeof i==`object`&&i&&!(i instanceof Promise)?Array.isArray(i)?L(`div`,{className:`flex flex-col gap-1 relative`,children:[L(si,{length:i.length,expanded:t,onToggle:n,isNegative:r}),t&&L(`div`,{className:`pl-2 border-l border-[#333] mt-0.5 ml-1 flex flex-col gap-0.5`,children:i.map((e,t)=>L(ci,{value:e,path:t.toString(),isNegative:r},t.toString()))}),L(oi,{text:Ki(i),className:`absolute top-0.5 right-0.5 opacity-0 transition-opacity group-hover:opacity-100 self-end`,children:({ClipboardIcon:e})=>L(D,{children:e})})]}):L(`div`,{className:`flex items-start gap-1 relative`,children:[L(`button`,{type:`button`,onClick:n,className:U(`flex items-center`,`p-0 mt-0.5 mr-1`,`opacity-50`),children:L(R,{name:`icon-chevron-right`,size:12,className:U(`transition-[color,transform]`,r?`text-[#f87171]`:`text-[#4ade80]`,t&&`rotate-90`)})}),L(`div`,{className:`flex-1`,children:t?L(`div`,{className:`pl-2 border-l border-[#333] mt-0.5 ml-1 flex flex-col gap-0.5`,children:Object.entries(i).map(([e,t])=>L(ci,{value:t,path:e,isNegative:r},e))}):L(`span`,{children:Qi(i)})}),L(oi,{text:Ki(i),className:`absolute top-0.5 right-0.5 opacity-0 transition-opacity group-hover:opacity-100 self-end`,children:({ClipboardIcon:e})=>L(D,{children:e})})]}):L(`span`,{children:Qi(i)})},ui=50;I({fiber:null,fiberProps:{current:[],changes:new Set},fiberState:{current:[],changes:new Set},fiberContext:{current:[],changes:new Set}});var di=e=>{switch(e.kind){case`initialized`:return e.changes.currentValue;case`partially-initialized`:return e.value}},fi=(e,t)=>{for(let n of e){let e=t.get(n.name);if(e){t.set(e.name,{count:e.count+1,currentValue:n.value,id:e.name,lastUpdated:Date.now(),name:e.name,previousValue:n.prevValue});continue}t.set(n.name,{count:1,currentValue:n.value,id:n.name,lastUpdated:Date.now(),name:n.name,previousValue:n.prevValue})}},pi=(e,t)=>{for(let n of e){let e=t.contextChanges.get(n.contextType);if(e){if(vn(di(e),n.value))continue;if(e.kind===`partially-initialized`){t.contextChanges.set(n.contextType,{kind:`initialized`,changes:{count:1,currentValue:n.value,id:n.contextType.toString(),lastUpdated:Date.now(),name:n.name,previousValue:e.value}});continue}t.contextChanges.set(n.contextType,{kind:`initialized`,changes:{count:e.changes.count+1,currentValue:n.value,id:n.contextType.toString(),lastUpdated:Date.now(),name:n.name,previousValue:e.changes.currentValue}});continue}t.contextChanges.set(n.contextType,{kind:`partially-initialized`,id:n.contextType.toString(),lastUpdated:Date.now(),name:n.name,value:n.value})}},mi=e=>{let t={contextChanges:new Map,propsChanges:new Map,stateChanges:new Map};return e.forEach(e=>{pi(e.contextChanges,t),fi(e.stateChanges,t.stateChanges),fi(e.propsChanges,t.propsChanges)}),t},hi=(e,t)=>{let n=new Map;return e.forEach((e,t)=>{n.set(t,e)}),t.forEach((e,t)=>{let r=n.get(t);if(!r){n.set(t,e);return}n.set(t,{count:r.count+e.count,currentValue:e.currentValue,id:e.id,lastUpdated:e.lastUpdated,name:e.name,previousValue:e.previousValue})}),n},gi=(e,t)=>{let n=new Map;return e.contextChanges.forEach((e,t)=>{n.set(t,e)}),t.contextChanges.forEach((e,t)=>{let r=n.get(t);if(!r){n.set(t,e);return}if(di(e)!==di(r))switch(r.kind){case`initialized`:switch(e.kind){case`initialized`:n.set(t,{kind:`initialized`,changes:{...e.changes,count:e.changes.count+r.changes.count+1,currentValue:e.changes.currentValue,previousValue:e.changes.previousValue}});return;case`partially-initialized`:n.set(t,{kind:`initialized`,changes:{count:r.changes.count+1,currentValue:e.value,id:e.id,lastUpdated:e.lastUpdated,name:e.name,previousValue:r.changes.currentValue}});return}case`partially-initialized`:switch(e.kind){case`initialized`:n.set(t,{kind:`initialized`,changes:{count:e.changes.count+1,currentValue:e.changes.currentValue,id:e.changes.id,lastUpdated:e.changes.lastUpdated,name:e.changes.name,previousValue:r.value}});return;case`partially-initialized`:n.set(t,{kind:`initialized`,changes:{count:1,currentValue:e.value,id:e.id,lastUpdated:e.lastUpdated,name:e.name,previousValue:r.value}});return}}}),n},_i=(e,t)=>({contextChanges:gi(e,t),propsChanges:hi(e.propsChanges,t.propsChanges),stateChanges:hi(e.stateChanges,t.stateChanges)}),vi=e=>Array.from(e.propsChanges.values()).reduce((e,t)=>e+t.count,0)+Array.from(e.stateChanges.values()).reduce((e,t)=>e+t.count,0)+Array.from(e.contextChanges.values()).filter(e=>e.kind===`initialized`).reduce((e,t)=>e+t.changes.count,0),yi=t=>{let n=M({queue:[]}),[r,i]=A({propsChanges:new Map,stateChanges:new Map,contextChanges:new Map}),a=Q.inspectState.value.kind===`focused`?Q.inspectState.value.fiber:null,o=a?e(a):null;return j(()=>{let e=setInterval(()=>{n.current.queue.length!==0&&(i(e=>{let r=_i(e,mi(n.current.queue)),i=vi(e),a=vi(r)-i;return t?.onChangeUpdate?.(a),r}),n.current.queue=[])},ui);return()=>{clearInterval(e)}},[a]),j(()=>{if(!o)return;let e=e=>{n.current?.queue.push(e)},t=Q.changesListeners.get(o);return t||(t=[],Q.changesListeners.set(o,t)),t.push(e),()=>{i({propsChanges:new Map,stateChanges:new Map,contextChanges:new Map}),n.current.queue=[],Q.changesListeners.set(o,Q.changesListeners.get(o)?.filter(t=>t!==e)??[])}},[o]),j(()=>()=>{i({propsChanges:new Map,stateChanges:new Map,contextChanges:new Map}),n.current.queue=[]},[o]),r},bi=Rt(()=>{let[e,t]=A(!0),r=yi(),[i,a]=A(!1),o=vi(r)>0;j(()=>{if(!i&&o){let e=setTimeout(()=>{a(!0),requestAnimationFrame(()=>{t(!0)})},0);return()=>clearTimeout(e)}},[i,o]);let s=new Map(Array.from(r.contextChanges.entries()).filter(([,e])=>e.kind===`initialized`).map(([e,t])=>[e,t.kind===`partially-initialized`?null:t.changes])),c=Q.inspectState.value.kind===`focused`?Q.inspectState.value.fiber:null;if(c)return L(D,{children:[L(Si,{}),L(`div`,{className:`overflow-hidden h-full flex flex-col gap-y-2`,children:[L(`div`,{className:`flex flex-col gap-2 px-3 pt-2`,children:[L(`span`,{className:`text-sm font-medium text-[#888]`,children:[`Why did`,` `,L(`span`,{className:`text-[#A855F7]`,children:l(c)}),` `,`render?`]}),!o&&L(`div`,{className:`text-sm text-[#737373] bg-[#1E1E1E] rounded-md p-4 flex flex-col gap-4`,children:[L(`div`,{children:`No changes detected since selecting`}),L(`div`,{children:`The props, state, and context changes within your component will be reported here`})]})]}),L(`div`,{className:U(`flex flex-col gap-y-2 pl-3 relative overflow-y-auto h-full`),children:[L(wi,{changes:r.propsChanges,title:`Changed Props`,isExpanded:e}),L(wi,{renderName:e=>xi(e,l(n(c))??`Unknown Component`),changes:r.stateChanges,title:`Changed State`,isExpanded:e}),L(wi,{changes:s,title:`Changed Context`,isExpanded:e})]})]})]})}),xi=(e,t)=>{if(Number.isNaN(Number(e)))return e;let n=Number.parseInt(e);return L(`span`,{className:`truncate`,children:[L(`span`,{className:`text-white`,children:[n,(e=>{let t=e%10,n=e%100;if(n>=11&&n<=13)return`th`;switch(t){case 1:return`st`;case 2:return`nd`;case 3:return`rd`;default:return`th`}})(n),` hook`,` `]}),L(`span`,{style:{color:`#666`},children:[`called in `,L(`i`,{className:`text-[#A855F7] truncate`,children:t})]})]})},Si=Rt(()=>{let e=M(null),t=M(null),n=M(null),r=M({isPropsChanged:!1,isStateChanged:!1,isContextChanged:!1});return j(()=>{let i=xr(()=>{let r=[];e.current?.dataset.flash===`true`&&r.push(e.current),t.current?.dataset.flash===`true`&&r.push(t.current),n.current?.dataset.flash===`true`&&r.push(n.current);for(let e of r)e.classList.remove(`count-flash-white`),e.offsetWidth,e.classList.add(`count-flash-white`)},400);return Hr.subscribe(a=>{if(!e.current||!t.current||!n.current)return;let{currentIndex:o,updates:s}=a,c=s[o];!c||o===0||(i(),r.current={isPropsChanged:(c.props?.changes?.size??0)>0,isStateChanged:(c.state?.changes?.size??0)>0,isContextChanged:(c.context?.changes?.size??0)>0},e.current.dataset.flash!==`true`&&(e.current.dataset.flash=r.current.isPropsChanged.toString()),t.current.dataset.flash!==`true`&&(t.current.dataset.flash=r.current.isStateChanged.toString()),n.current.dataset.flash!==`true`&&(n.current.dataset.flash=r.current.isContextChanged.toString()))})},[]),L(`button`,{type:`button`,className:U(`react-section-header`,`overflow-hidden`,`max-h-0`,`transition-[max-height]`),children:L(`div`,{className:U(`flex-1 react-scan-expandable`),children:L(`div`,{className:`overflow-hidden`,children:L(`div`,{className:`flex items-center whitespace-nowrap`,children:[L(`div`,{className:`flex items-center gap-x-2`,children:`What changed?`}),L(`div`,{className:U(`ml-auto`,`change-scope`,`transition-opacity duration-300 delay-150`),children:[L(`div`,{ref:e,children:`props`}),L(`div`,{ref:t,children:`state`}),L(`div`,{ref:n,children:`context`})]})]})})})})}),Ci=e=>e,wi=Rt(({title:e,changes:t,renderName:n=Ci})=>{let[r,i]=A(new Set),[a,o]=A(new Set),s=Array.from(t.entries());return t.size===0?null:L(`div`,{children:[L(`div`,{className:`text-xs text-[#888] mb-1.5`,children:e}),L(`div`,{className:`flex flex-col gap-2`,children:s.map(([t,s])=>{let c=a.has(String(t)),{value:l,error:u}=$i(s.previousValue),{value:d,error:f}=$i(s.currentValue),p=Ji(l,d);return L(`div`,{children:[L(`button`,{onClick:()=>{o(e=>{let n=new Set(e);return n.has(String(t))?n.delete(String(t)):n.add(String(t)),n})},className:`flex items-center gap-2 w-full bg-transparent border-none p-0 cursor-pointer text-white text-xs`,children:L(`div`,{className:`flex items-center gap-1.5 flex-1`,children:[L(R,{name:`icon-chevron-right`,size:12,className:U(`text-[#666] transition-transform duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)]`,{"rotate-90":c})}),L(`div`,{className:`whitespace-pre-wrap break-words text-left font-medium flex items-center gap-x-1.5`,children:[n(s.name),L(Oi,{count:s.count,isFunction:typeof s.currentValue==`function`,showWarning:p.changes.length===0,forceFlash:!0})]})]})}),L(`div`,{className:U(`react-scan-expandable`,{"react-scan-expanded":c}),children:L(`div`,{className:`pl-3 text-xs font-mono border-l-1 border-[#333]`,children:L(`div`,{className:`flex flex-col gap-0.5`,children:u||f?L(Ti,{currError:f,prevError:u}):p.changes.length>0?L(Ei,{change:s,diff:p,expandedFns:r,renderName:n,setExpandedFns:i,title:e}):L(Di,{currValue:d,entryKey:t,expandedFns:r,prevValue:l,setExpandedFns:i})})})})]},t)})})]})}),Ti=({prevError:e,currError:t})=>L(D,{children:[e&&L(`div`,{className:`text-[#f87171] bg-[#2a1515] pr-1.5 py-[3px] rounded italic`,children:e}),t&&L(`div`,{className:`text-[#4ade80] bg-[#1a2a1a] pr-1.5 py-[3px] rounded italic mt-0.5`,children:t})]}),Ei=({diff:e,title:t,renderName:n,change:r,expandedFns:i,setExpandedFns:a})=>e.changes.map((o,s)=>{let{value:c,error:l}=$i(o.prevValue),{value:u,error:d}=$i(o.currentValue),f=typeof c==`function`||typeof u==`function`,p;return t===`Props`&&(p=o.path.length>0?`${n(String(r.name))}.${Yi(o.path)}`:void 0),t===`State`&&o.path.length>0&&(p=`state.${Yi(o.path)}`),p||=Yi(o.path),L(`div`,{className:U(`flex flex-col gap-y-1`,s<e.changes.length-1&&`mb-4`),children:[p&&L(`div`,{className:`text-[#666] text-[10px]`,children:p}),L(`button`,{type:`button`,className:U(`group`,`flex items-start`,`py-[3px] px-1.5`,`text-left text-[#f87171] bg-[#2a1515]`,`rounded`,`overflow-hidden break-all`,f&&`cursor-pointer`),onClick:f?()=>{let e=`${Yi(o.path)}-prev`;a(t=>{let n=new Set(t);return n.has(e)?n.delete(e):n.add(e),n})}:void 0,children:[L(`span`,{className:`w-3 flex items-center justify-center opacity-50`,children:`-`}),L(`span`,{className:`flex-1 whitespace-nowrap font-mono`,children:l?L(`span`,{className:`italic text-[#f87171]`,children:l}):f?L(`div`,{className:`flex gap-1 items-start flex-col`,children:[L(`div`,{className:`flex gap-1 items-start w-full`,children:[L(`span`,{className:`flex-1 max-h-40`,children:Zi(c,i.has(`${Yi(o.path)}-prev`))}),typeof c==`function`&&L(oi,{text:c.toString(),className:`opacity-0 transition-opacity group-hover:opacity-100`,children:({ClipboardIcon:e})=>L(D,{children:e})})]}),c?.toString()===u?.toString()&&L(`div`,{className:`text-[10px] text-[#666] italic`,children:`Function reference changed`})]}):L(li,{value:c,expanded:i.has(`${Yi(o.path)}-prev`),onToggle:()=>{let e=`${Yi(o.path)}-prev`;a(t=>{let n=new Set(t);return n.has(e)?n.delete(e):n.add(e),n})},isNegative:!0})})]}),L(`button`,{type:`button`,className:U(`group`,`flex items-start`,`py-[3px] px-1.5`,`text-left text-[#4ade80] bg-[#1a2a1a]`,`rounded`,`overflow-hidden break-all`,f&&`cursor-pointer`),onClick:f?()=>{let e=`${Yi(o.path)}-current`;a(t=>{let n=new Set(t);return n.has(e)?n.delete(e):n.add(e),n})}:void 0,children:[L(`span`,{className:`w-3 flex items-center justify-center opacity-50`,children:`+`}),L(`span`,{className:`flex-1 whitespace-pre-wrap font-mono`,children:d?L(`span`,{className:`italic text-[#4ade80]`,children:d}):f?L(`div`,{className:`flex gap-1 items-start flex-col`,children:[L(`div`,{className:`flex gap-1 items-start w-full`,children:[L(`span`,{className:`flex-1`,children:Zi(u,i.has(`${Yi(o.path)}-current`))}),typeof u==`function`&&L(oi,{text:u.toString(),className:`opacity-0 transition-opacity group-hover:opacity-100`,children:({ClipboardIcon:e})=>L(D,{children:e})})]}),c?.toString()===u?.toString()&&L(`div`,{className:`text-[10px] text-[#666] italic`,children:`Function reference changed`})]}):L(li,{value:u,expanded:i.has(`${Yi(o.path)}-current`),onToggle:()=>{let e=`${Yi(o.path)}-current`;a(t=>{let n=new Set(t);return n.has(e)?n.delete(e):n.add(e),n})},isNegative:!1})})]})]},`${p}-${r.name}-${s}`)}),Di=({prevValue:e,currValue:t,entryKey:n,expandedFns:r,setExpandedFns:i})=>L(D,{children:[L(`div`,{className:`group flex gap-0.5 items-start text-[#f87171] bg-[#2a1515] py-[3px] px-1.5 rounded`,children:[L(`span`,{className:`w-3 flex items-center justify-center opacity-50`,children:`-`}),L(`span`,{className:`flex-1 overflow-hidden whitespace-pre-wrap font-mono`,children:L(li,{value:e,expanded:r.has(`${String(n)}-prev`),onToggle:()=>{let e=`${String(n)}-prev`;i(t=>{let n=new Set(t);return n.has(e)?n.delete(e):n.add(e),n})},isNegative:!0})})]}),L(`div`,{className:`group flex gap-0.5 items-start text-[#4ade80] bg-[#1a2a1a] py-[3px] px-1.5 rounded mt-0.5`,children:[L(`span`,{className:`w-3 flex items-center justify-center opacity-50`,children:`+`}),L(`span`,{className:`flex-1 overflow-hidden whitespace-pre-wrap font-mono`,children:L(li,{value:t,expanded:r.has(`${String(n)}-current`),onToggle:()=>{let e=`${String(n)}-current`;i(t=>{let n=new Set(t);return n.has(e)?n.delete(e):n.add(e),n})},isNegative:!1})})]}),typeof t==`object`&&!!t&&L(`div`,{className:`text-[#666] text-[10px] italic mt-1 flex items-center gap-x-1`,children:[L(R,{name:`icon-triangle-alert`,className:`text-yellow-500 mb-px`,size:14}),L(`span`,{children:`Reference changed but objects are structurally the same`})]})]}),Oi=({count:e,forceFlash:t,isFunction:n,showWarning:r})=>{let i=M(!0),a=M(null),o=M(e);return j(()=>{let t=a.current;!t||o.current===e||(t.classList.remove(`count-flash`),t.offsetWidth,t.classList.add(`count-flash`),o.current=e)},[e]),j(()=>{if(i.current){i.current=!1;return}if(t){let e=setTimeout(()=>{a.current?.classList.add(`count-flash-white`),e=setTimeout(()=>{a.current?.classList.remove(`count-flash-white`)},300)},500);return()=>{clearTimeout(e)}}},[t]),L(`div`,{ref:a,className:`count-badge`,children:[r&&L(R,{name:`icon-triangle-alert`,className:`text-yellow-500 mb-px`,size:14}),n&&L(R,{name:`icon-function`,className:`text-[#A855F7] mb-px`,size:14}),`x`,e]})},ki={lastRendered:new Map,expandedPaths:new Set,cleanup:()=>{ki.lastRendered.clear(),ki.expandedPaths.clear(),zr.cleanupAll(),ca(),qr.reset()}},Ai=class extends fe{constructor(){super(...arguments),this.state={hasError:!1,error:null},this.handleReset=()=>{this.setState({hasError:!1,error:null}),ki.cleanup()}}static getDerivedStateFromError(e){return{hasError:!0,error:e}}render(){return this.state.hasError?L(`div`,{className:`p-4 bg-red-950/50 h-screen backdrop-blur-sm`,children:[L(`div`,{className:`flex items-center gap-2 mb-3 text-red-400 font-medium`,children:[L(R,{name:`icon-flame`,className:`text-red-500`,size:16}),`Something went wrong in the inspector`]}),L(`div`,{className:`p-3 bg-black/40 rounded font-mono text-xs text-red-300 mb-4 break-words`,children:this.state.error?.message||JSON.stringify(this.state.error)}),L(`button`,{type:`button`,onClick:this.handleReset,className:`px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2`,children:`Reset Inspector`})]}):this.props.children}},ji=bt(()=>U(`react-scan-inspector`,`flex-1`,`opacity-0`,`overflow-y-auto overflow-x-hidden`,`transition-opacity delay-0`,`pointer-events-none`,!Or.value&&`opacity-100 delay-300 pointer-events-auto`)),Mi=Pr(()=>{let e=M(null),t=t=>{if(!t)return;e.current=t;let{data:n,shouldUpdate:r}=ha(t);if(r){let e={timestamp:Date.now(),fiberInfo:ta(t),props:n.fiberProps,state:n.fiberState,context:n.fiberContext,stateNames:sa(t)};qr.addUpdate(e,t)}};return Mt(()=>{let n=Q.inspectState.value;st(()=>{if(n.kind!==`focused`||!n.focusedDomElement){e.current=null,ki.cleanup();return}n.kind===`focused`&&(Or.value=!1);let{parentCompositeFiber:r}=Vi(n.focusedDomElement,n.fiber);if(!r){Q.inspectState.value={kind:`inspect-off`},G.value={view:`none`};return}e.current?.type!==r.type&&(e.current=r,ki.cleanup(),t(r))})}),Mt(()=>{Ur.value,st(()=>{let n=Q.inspectState.value;if(n.kind!==`focused`||!n.focusedDomElement){e.current=null,ki.cleanup();return}let{parentCompositeFiber:r}=Vi(n.focusedDomElement,n.fiber);if(!r){Q.inspectState.value={kind:`inspect-off`},G.value={view:`none`};return}t(r),n.focusedDomElement.isConnected||(e.current=null,ki.cleanup(),Q.inspectState.value={kind:`inspecting`,hoveredDomElement:null})})}),j(()=>()=>{ki.cleanup()},[]),L(Ai,{children:L(`div`,{className:ji,children:L(`div`,{className:`w-full h-full`,children:L(bi,{})})})})}),Ni=Pr(()=>Q.inspectState.value.kind===`focused`?L(Ai,{children:[L(Mi,{}),L(ai,{})]}):null),Pi=e=>{if(`__REACT_DEVTOOLS_GLOBAL_HOOK__`in window){let t=window.__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!t?.renderers)return null;for(let[,n]of Array.from(t.renderers))try{let t=n.findFiberByHostInstance?.(e);if(t)return t}catch{}}if(`_reactRootContainer`in e)return e._reactRootContainer?._internalRoot?.current?.child??null;for(let t in e)if(t.startsWith(`__reactInternalInstance$`)||t.startsWith(`__reactFiber`))return e[t];return null},Fi=e=>{let t=e;for(;t;){if(t.stateNode instanceof Element)return t.stateNode;if(!t.child)break;t=t.child}for(;t;){if(t.stateNode instanceof Element)return t.stateNode;if(!t.return)break;t=t.return}return null},Ii=e=>{if(!e)return null;try{let t=Pi(e);if(!t)return null;let n=Li(t);return n?n[0]:null}catch{return null}},Li=e=>{let t=e,n=null;for(;t;){if(i(t))return[t,n];u(t)&&!n&&(n=t),t=t.return}return null},Ri=(e,t)=>!!f(t,t=>t===e),zi=async e=>{let t=Ii(e);if(!t)return null;let n=Fi(t);return n?await new Promise(e=>{let t=new IntersectionObserver(n=>{t.disconnect(),e(n[0]?.boundingClientRect??null)});t.observe(n)}):null},Bi=e=>{let t=Ii(e);if(!t||!Fi(t))return{};let n=Li(t);if(!n)return{};let[r]=n;return{parentCompositeFiber:r}},Vi=(e,t)=>{if(!e.isConnected)return{};let n=t??Ii(e);if(!n)return{};let r=n,i=null,a=null;for(;r;){if(!r.stateNode){r=r.return;continue}if($.instrumentation?.fiberRoots.has(r.stateNode)){i=r,a=r.stateNode.current;break}r=r.return}if(!i||!a||(n=Ri(n,a)?n:n.alternate??n,!n)||!Fi(n))return{};let o=Li(n)?.[0];return o?{parentCompositeFiber:Ri(o,a)?o:o.alternate??o}:{}},Hi=e=>{let t=e.memoizedProps??{},n=e.alternate?.memoizedProps??{},r=[];for(let e in t){if(e===`children`)continue;let i=t[e],a=n[e];vn(i,a)||r.push({name:e,value:i,prevValue:a,type:1})}return r},Ui=new Set([`HTML`,`HEAD`,`META`,`TITLE`,`BASE`,`SCRIPT`,`SCRIPT`,`STYLE`,`LINK`,`NOSCRIPT`,`SOURCE`,`TRACK`,`EMBED`,`OBJECT`,`PARAM`,`TEMPLATE`,`PORTAL`,`SLOT`,`AREA`,`XML`,`DOCTYPE`,`COMMENT`]),Wi=(e,t=!0)=>{if(e.stateNode&&`nodeType`in e.stateNode){let n=e.stateNode;return t&&n.tagName&&Ui.has(n.tagName.toLowerCase())?null:n}let n=e.child;for(;n;){let e=Wi(n,t);if(e)return e;n=n.sibling}return null},Gi=(e=document.body)=>{let t=[],n=e=>{if(!e)return null;let{parentCompositeFiber:t}=Bi(e);return t&&Wi(t)===e?e:null},r=(e,i=0)=>{let a=n(e);if(a){let{parentCompositeFiber:e}=Bi(a);if(!e)return;t.push({element:a,depth:i,name:l(e.type)??`Unknown`,fiber:e})}for(let t of Array.from(e.children))r(t,a?i+1:i)};return r(e),t},Ki=e=>{try{if(e===null)return`null`;if(e===void 0)return`undefined`;if(ea(e))return`Promise`;if(typeof e==`function`){let t=e.toString();try{return t.replace(/\s+/g,` `).replace(/{\s+/g,`{
  `).replace(/;\s+/g,`;
  `).replace(/}\s*$/g,`
}`).replace(/\(\s+/g,`(`).replace(/\s+\)/g,`)`).replace(/,\s+/g,`, `)}catch{return t}}switch(!0){case e instanceof Date:return e.toISOString();case e instanceof RegExp:return e.toString();case e instanceof Error:return`${e.name}: ${e.message}`;case e instanceof Map:return JSON.stringify(Array.from(e.entries()),null,2);case e instanceof Set:return JSON.stringify(Array.from(e),null,2);case e instanceof DataView:return JSON.stringify(Array.from(new Uint8Array(e.buffer)),null,2);case e instanceof ArrayBuffer:return JSON.stringify(Array.from(new Uint8Array(e)),null,2);case ArrayBuffer.isView(e)&&`length`in e:return JSON.stringify(Array.from(e),null,2);case Array.isArray(e):return JSON.stringify(e,null,2);case typeof e==`object`:return JSON.stringify(e,null,2);default:return String(e)}}catch{return String(e)}},qi=(e,t)=>{try{return typeof e!=`function`||typeof t!=`function`?!1:e.toString()===t.toString()}catch{return!1}},Ji=(e,t,n=[],r=new WeakSet)=>{if(e===t)return{type:`primitive`,changes:[],hasDeepChanges:!1};if(typeof e==`function`&&typeof t==`function`){let r=qi(e,t);return{type:`primitive`,changes:[{path:n,prevValue:e,currentValue:t,sameFunction:r}],hasDeepChanges:!r}}if(e===null||t===null||e===void 0||t===void 0||typeof e!=`object`||typeof t!=`object`)return{type:`primitive`,changes:[{path:n,prevValue:e,currentValue:t}],hasDeepChanges:!0};if(r.has(e)||r.has(t))return{type:`object`,changes:[{path:n,prevValue:`[Circular]`,currentValue:`[Circular]`}],hasDeepChanges:!1};r.add(e),r.add(t);let i=e,a=t,o=new Set([...Object.keys(i),...Object.keys(a)]),s=[],c=!1;for(let e of o){let t=i[e],o=a[e];if(t!==o)if(typeof t==`object`&&typeof o==`object`&&t!==null&&o!==null){let i=Ji(t,o,[...n,e],r);s.push(...i.changes),i.hasDeepChanges&&(c=!0)}else s.push({path:[...n,e],prevValue:t,currentValue:o}),c=!0}return{type:`object`,changes:s,hasDeepChanges:c}},Yi=e=>e.length===0?``:e.reduce((e,t,n)=>/^\d+$/.test(t)?`${e}[${t}]`:n===0?t:`${e}.${t}`,``);function Xi(e){let t=e.replace(/\s+/g,` `).trim(),n=[],r=``;for(let e=0;e<t.length;e++){let i=t[e];if(i===`=`&&t[e+1]===`>`){r.trim()&&n.push(r.trim()),n.push(`=>`),r=``,e++;continue}/[(){}[\];,<>:\?!]/.test(i)?(r.trim()&&n.push(r.trim()),n.push(i),r=``):/\s/.test(i)?(r.trim()&&n.push(r.trim()),r=``):r+=i}r.trim()&&n.push(r.trim());let i=[];for(let e=0;e<n.length;e++){let t=n[e],r=n[e+1];t===`(`&&r===`)`||t===`[`&&r===`]`||t===`{`&&r===`}`||t===`<`&&r===`>`?(i.push(t+r),e++):i.push(t)}let a=new Set,o=new Set;function s(e,t,n){let r=0;for(let a=n;a<i.length;a++){let n=i[a];if(n===e)r++;else if(n===t&&(r--,r===0))return a}return-1}for(let e=0;e<i.length;e++)if(i[e]===`(`){let t=s(`(`,`)`,e);if(t!==-1&&i[t+1]===`=>`)for(let n=e;n<=t;n++)a.add(n)}for(let e=1;e<i.length;e++){let t=i[e-1],n=i[e];if(/^[a-zA-Z0-9_$]+$/.test(t)&&n===`<`){let t=s(`<`,`>`,e);if(t!==-1)for(let n=e;n<=t;n++)o.add(n)}}let c=0,l=[],u=``;function d(){u.trim()&&l.push(u.replace(/\s+$/,``)),u=``}function f(){d(),u=`  `.repeat(c)}let p=[];function m(){return p.length?p[p.length-1]:null}function h(e,t=!1){u.trim()?t||/^[),;:\].}>]$/.test(e)?u+=e:u+=` ${e}`:u+=e}for(let e=0;e<i.length;e++){let t=i[e],n=i[e+1]||``;if([`(`,`{`,`[`,`<`].includes(t))h(t),p.push(t),t===`{`?(c++,f()):(t===`(`||t===`[`||t===`<`)&&(a.has(e)&&t===`(`||o.has(e)&&t===`<`||n!=={"(":`)`,"[":`]`,"<":`>`}[t]&&n!==`()`&&n!==`[]`&&n!==`<>`&&(c++,f()));else if([`)`,`}`,`]`,`>`].includes(t)){let n=m();t===`)`&&n===`(`||t===`]`&&n===`[`||t===`>`&&n===`<`?!(a.has(e)&&t===`)`)&&!(o.has(e)&&t===`>`)&&(c=Math.max(c-1,0),f()):t===`}`&&n===`{`&&(c=Math.max(c-1,0),f()),p.pop(),h(t),t===`}`&&f()}else if(/^\(\)|\[\]|\{\}|\<\>$/.test(t))h(t);else if(t===`=>`)h(t);else if(t===`;`)h(t,!0),f();else if(t===`,`){h(t,!0);let n=m();!(a.has(e)&&n===`(`)&&!(o.has(e)&&n===`<`)&&n&&[`{`,`[`,`(`,`<`].includes(n)&&f()}else h(t)}return d(),l.join(`
`).replace(/\n\s*\n+/g,`
`).trim()}var Zi=(e,t=!1)=>{try{let n=e.toString(),r=n.match(/(?:function\s*)?(?:\(([^)]*)\)|([^=>\s]+))\s*=>?/);if(!r)return`ƒ`;let i=(r[1]||r[2]||``).replace(/\s+/g,``);return t?Xi(n):`\u0192 (${i}) => ...`}catch{return`ƒ`}},Qi=e=>{if(e===null)return`null`;if(e===void 0)return`undefined`;if(typeof e==`string`)return`"${e.length>150?`${e.slice(0,20)}...`:e}"`;if(typeof e==`number`||typeof e==`boolean`)return String(e);if(typeof e==`function`)return Zi(e);if(Array.isArray(e))return`Array(${e.length})`;if(e instanceof Map)return`Map(${e.size})`;if(e instanceof Set)return`Set(${e.size})`;if(e instanceof Date)return e.toISOString();if(e instanceof RegExp)return e.toString();if(e instanceof Error)return`${e.name}: ${e.message}`;if(typeof e==`object`){let t=Object.keys(e);return`{${t.length>2?`${t.slice(0,2).join(`, `)}, ...`:t.join(`, `)}}`}return String(e)},$i=e=>{if(e==null||typeof e==`function`||typeof e!=`object`)return{value:e};if(ea(e))return{value:`Promise`};try{let t=Object.getPrototypeOf(e);return t===Promise.prototype||t?.constructor?.name===`Promise`?{value:`Promise`}:{value:e}}catch{return{value:null,error:`Error accessing value`}}},ea=e=>!!e&&(e instanceof Promise||typeof e==`object`&&`then`in e),ta=e=>{let t=c(e);return{displayName:l(e)||`Unknown`,type:e.type,key:e.key,id:e.index,selfTime:t?.selfTime??null,totalTime:t?.totalTime??null}},na=new Map,ra=new Map,ia=new Map,aa=null,oa=/\[(?<name>\w+),\s*set\w+\]/g,sa=e=>{let t=e.type?.toString?.()||``;return t?Array.from(t.matchAll(oa),e=>e.groups?.name??``):[]},ca=()=>{na.clear(),ra.clear(),ia.clear(),aa=null},la=e=>{let t=e.type!==aa;return aa=e.type,t},ua=(e,t,n,r)=>{let i=e.get(t),a=e===na||e===ia,o=!vn(n,r);if(!i)return e.set(t,{count:o&&a?1:0,currentValue:n,previousValue:r,lastUpdated:Date.now()}),{hasChanged:o,count:o&&a?1:a?0:1};if(!vn(i.currentValue,n)){let r=i.count+1;return e.set(t,{count:r,currentValue:n,previousValue:i.currentValue,lastUpdated:Date.now()}),{hasChanged:!0,count:r}}return{hasChanged:!1,count:i.count}},da=e=>{if(!e)return{};if(e.tag===0||e.tag===11||e.tag===15||e.tag===14){let t=e.memoizedState,n={},r=0;for(;t;)t.queue&&t.memoizedState!==void 0&&(n[r]=t.memoizedState),t=t.next,r++;return n}return e.tag===1&&e.memoizedState||{}},fa=e=>{let t=e.memoizedProps||{},n=e.alternate?.memoizedProps||{},r={},i={},a=Object.keys(t);for(let e of a)e in t&&(r[e]=t[e],i[e]=n[e]);return{current:r,prev:i,changes:Hi(e).map(e=>({name:e.name,value:e.value,prevValue:e.prevValue}))}},pa=e=>{let t=da(e),n=e.alternate?da(e.alternate):{},r=[];for(let[i,a]of Object.entries(t)){let t=e.tag===1?i:Number(i);e.alternate&&!vn(n[i],a)&&r.push({name:t,value:a,prevValue:n[i]})}return{current:t,prev:n,changes:r}},ma=e=>{let t=_a(e),n=e.alternate?_a(e.alternate):new Map,r={},i={},a=[],o=new Set;for(let[e,s]of t){let t=s.displayName,c=e;if(o.has(c))continue;o.add(c),r[t]=s.value;let l=n.get(e);l&&(i[t]=l.value,vn(l.value,s.value)||a.push({name:t,value:s.value,prevValue:l.value,contextType:e}))}return{current:r,prev:i,changes:a}},ha=e=>{let t=()=>({current:[],changes:new Set,changesCounts:new Map});if(!e)return{data:{fiberProps:t(),fiberState:t(),fiberContext:t()},shouldUpdate:!1};let n=!1,r=la(e),i=t();if(e.memoizedProps){let{current:t,changes:r}=fa(e);for(let[e,n]of Object.entries(t))i.current.push({name:e,value:ea(n)?{type:`promise`,displayValue:`Promise`}:n});for(let e of r){let{hasChanged:t,count:r}=ua(na,e.name,e.value,e.prevValue);t&&(n=!0,i.changes.add(e.name),i.changesCounts.set(e.name,r))}}let a=t(),{current:o,changes:s}=pa(e);for(let[t,n]of Object.entries(o)){let r=e.tag===1?t:Number(t);a.current.push({name:r,value:n})}for(let e of s){let{hasChanged:t,count:r}=ua(ra,e.name,e.value,e.prevValue);t&&(n=!0,a.changes.add(e.name),a.changesCounts.set(e.name,r))}let c=t(),{current:l,changes:u}=ma(e);for(let[e,t]of Object.entries(l))c.current.push({name:e,value:t});if(!r)for(let e of u){let{hasChanged:t,count:r}=ua(ia,e.name,e.value,e.prevValue);t&&(n=!0,c.changes.add(e.name),c.changesCounts.set(e.name,r))}return!n&&!r&&(i.changes.clear(),a.changes.clear(),c.changes.clear()),{data:{fiberProps:i,fiberState:a,fiberContext:c},shouldUpdate:n||r}},ga=new WeakMap,_a=e=>{if(!e)return new Map;let t=ga.get(e);if(t)return t;let n=new Map,r=e;for(;r;){let e=r.dependencies;if(e?.firstContext){let t=e.firstContext;for(;t;){let e=t.memoizedValue,r=t.context?.displayName;if(n.has(e)||n.set(t.context,{value:e,displayName:r??`UnnamedContext`,contextType:null}),t===t.next)break;t=t.next}}r=r.return}return ga.set(e,n),n},va=e=>{let t=()=>({current:[],changes:new Set,changesCounts:new Map});if(!e)return{fiberProps:t(),fiberState:t(),fiberContext:t()};let n=t();if(e.memoizedProps){let{current:t,changes:r}=fa(e);for(let[e,r]of Object.entries(t))n.current.push({name:e,value:ea(r)?{type:`promise`,displayValue:`Promise`}:r});for(let e of r)n.changes.add(e.name),n.changesCounts.set(e.name,1)}let r=t();if(e.memoizedState){let{current:t,changes:n}=pa(e);for(let[e,n]of Object.entries(t))r.current.push({name:e,value:ea(n)?{type:`promise`,displayValue:`Promise`}:n});for(let e of n)r.changes.add(e.name),r.changesCounts.set(e.name,1)}let i=t(),{current:a,changes:o}=ma(e);for(let[e,t]of Object.entries(a))i.current.push({name:e,value:ea(t)?{type:`promise`,displayValue:`Promise`}:t});for(let e of o)i.changes.add(e.name),i.changesCounts.set(e.name,1);return{fiberProps:n,fiberState:r,fiberContext:i}},ya={mount:1,update:2,unmount:4},ba=0,xa=performance.now(),Sa=0,Ca=!1,wa=()=>{Sa++;let e=performance.now();e-xa>=1e3&&(ba=Sa,Sa=0,xa=e),requestAnimationFrame(wa)},Ta=()=>(Ca||(Ca=!0,wa(),ba=60),ba),Ea=(e,t)=>ka(e)===ka(t)&&Da.includes(typeof e)&&Da.includes(typeof t),Da=[`function`,`object`],Oa=new WeakMap;function ka(e,t=0){if(t<0)return`…`;switch(typeof e){case`function`:return e.toString();case`string`:return e;case`number`:case`boolean`:case`undefined`:return String(e);case`object`:break;default:return String(e)}if(e===null)return`null`;if(Oa.has(e)){let t=Oa.get(e);if(t!==void 0)return t}if(Array.isArray(e)){let t=e.length?`[${e.length}]`:`[]`;return Oa.set(e,t),t}if(x(e)){let t=`<${l(e.type)??``} ${e.props?Object.keys(e.props).length:0}>`;return Oa.set(e,t),t}if(Object.getPrototypeOf(e)===Object.prototype){let t=Object.keys(e),n=t.length?`{${t.length}}`:`{}`;return Oa.set(e,n),n}let n=e&&typeof e==`object`?e.constructor:void 0;if(n&&typeof n==`function`&&n.name){let t=`${n.name}{\u2026}`;return Oa.set(e,t),t}let r=`${Object.prototype.toString.call(e).slice(8,-1)}{\u2026}`;return Oa.set(e,r),r}var Aa=e=>{if(!e)return[];let t=[];if(e.tag===0||e.tag===11||e.tag===15||e.tag===14){let n=e.memoizedState,r=e.alternate?.memoizedState,i=0;for(;n;){if(n.queue&&n.memoizedState!==void 0){let e={type:2,name:i.toString(),value:n.memoizedState,prevValue:r?.memoizedState};vn(e.prevValue,e.value)||t.push(e)}n=n.next,r=r?.next,i++}return t}if(e.tag===1){let n={type:3,name:`state`,value:e.memoizedState,prevValue:e.alternate?.memoizedState};return vn(n.prevValue,n.value)||t.push(n),t}return t},ja=0,Ma=new WeakMap,Na=e=>Ma.get(e)||(ja++,Ma.set(e,ja),ja);function Pa(e,t){if(!e||!t)return;let n=e.memoizedValue,r={type:4,name:e.context.displayName??`Context.Provider`,value:n,contextType:Na(e.context)};this.push(r)}var Fa=e=>{let t=[];return a(e,Pa.bind(t)),t},Ia=new Map,La=!1,Ra=()=>Array.from(Ia.values());function za(e,t,n){!vn(t,n)&&!Ea(t,n)&&(this.isRequiredChange=!0)}var Ba=e=>{if(!g(e))return!0;let t=s(e);for(let e of t){let t={isRequiredChange:!1};if(o(e,za.bind(t)),t.isRequiredChange)return!1}return!0},Va=!1,Ha=16,Ua=new WeakMap;function Wa(t){return String(e(t))}function Ga(e){let t=Wa(e),r=Ua.get(n(e));if(r)return r.get(t)}function Ka(e,t){let r=n(e.type),i=Wa(e),a=Ua.get(r);a||(a=new Map,Ua.set(r,a)),a.set(i,t)}var qa=(e,t,n,r,i)=>{let a=Date.now(),o=Ga(e);if((r||i)&&(!o||a-(o.lastRenderTimestamp||0)>Ha)){let r=o||{selfTime:0,totalTime:0,renderCount:0,lastRenderTimestamp:a};r.renderCount=(r.renderCount||0)+1,r.selfTime=t||0,r.totalTime=n||0,r.lastRenderTimestamp=a,Ka(e,{...r})}},Ja=(e,t)=>{let r={isPaused:I(!$.options.value.enabled),fiberRoots:new WeakSet};return Ia.set(e,{key:e,config:t,instrumentation:r}),La||(La=!0,d({name:`react-scan`,onActive:t.onActive,onCommitFiberRoot(e,t){r.fiberRoots.add(t);let i=Ra();for(let e of i)e.config.onCommitStart();m(t.current,(e,t)=>{let r=n(e.type);if(!r)return null;let i=Ra(),a=[];for(let t=0,n=i.length;t<n;t++)i[t].config.isValidFiber(e)&&a.push(t);if(!a.length)return null;let o=[];if(i.some(e=>e.config.trackChanges)){let t=fa(e).changes,n=pa(e).changes,r=ma(e).changes;o.push.apply(null,t.map(e=>({type:1,name:e.name,value:e.value})));for(let t of n)e.tag===1?o.push({type:3,name:t.name.toString(),value:t.value}):o.push({type:2,name:t.name.toString(),value:t.value});o.push.apply(null,r.map(e=>({type:4,name:e.name,value:e.value,contextType:Number(e.contextType)})))}let{selfTime:u,totalTime:d}=c(e),f=Ta(),m={phase:ya[t],componentName:l(r),count:1,changes:o,time:u,forget:p(e),unnecessary:Va?Ba(e):null,didCommit:g(e),fps:f},h=o.length>0,_=s(e).length>0;t===`update`&&qa(e,u,d,h,_);for(let t=0,n=a.length;t<n;t++)i[a[t]].config.onRender(e,[m])});for(let e of i)e.config.onCommitFinish()},onPostCommitFiberRoot(){let e=Ra();for(let t of e)t.config.onPostCommitFiberRoot()}})),r},Ya=e=>{let t=new Map;for(let n=0,r=e.length;n<r;n++){let r=e[n];if(!r.componentName)continue;let i=t.get(r.componentName)??[],a=_n([{aggregatedCount:1,computedKey:null,name:r.componentName,frame:null,...r,changes:{type:r.changes.reduce((e,t)=>e|t.type,0),unstable:r.changes.some(e=>e.unstable)},phase:r.phase,computedCurrent:null}]);if(!a)continue;let o=null,s=null;if(r.changes)for(let e=0,t=r.changes.length;e<t;e++){let{name:t,prevValue:n,nextValue:a,unstable:c,type:l}=r.changes[e];l===1?(o??={},s??={},o[`${c?`⚠️`:``}${t} (prev)`]=n,s[`${c?`⚠️`:``}${t} (next)`]=a):i.push({prev:n,next:a,type:l===4?`context`:`state`,unstable:c??!1})}o&&s&&i.push({prev:o,next:s,type:`props`,unstable:!1}),t.set(a,i)}for(let[e,n]of Array.from(t.entries())){console.group(`%c${e}`,`background: hsla(0,0%,70%,.3); border-radius:3px; padding: 0 2px;`);for(let{type:e,prev:t,next:r,unstable:i}of n)console.log(`${e}:`,i?`⚠️`:``,t,`!==`,r);console.groupEnd()}},Xa=()=>{if(window.hideIntro){window.hideIntro=void 0;return}console.log(`%c[·] %cReact Scan`,`font-weight:bold;color:#7a68e8;font-size:20px;`,`font-weight:bold;font-size:14px;`)},Za=7,Qa=`Menlo,Consolas,Monaco,Liberation Mono,Lucida Console,monospace`,$a=.2,eo=.5,to=(e,t)=>{let n=t-e;return Math.abs(n)<eo?t:e+n*$a},no=4,ro=40,io=45,ao=`115,97,230`;function oo(e,t){return t[0]-e[0]}function so(e){return[...e.entries()].sort(oo)}function co([e,t]){let n=`${t.slice(0,no).join(`, `)} \xD7${e}`;return n.length>ro&&(n=`${n.slice(0,ro)}\u2026`),n}var lo=e=>{let t=new Map;for(let{name:n,count:r}of e)t.set(n,(t.get(n)||0)+r);let n=new Map;for(let[e,r]of t){let t=n.get(r);t?t.push(e):n.set(r,[e])}let r=so(n),i=co(r[0]);for(let e=1,t=r.length;e<t;e++)i+=`, `+co(r[e]);return i.length>ro?`${i.slice(0,ro)}\u2026`:i},uo=e=>{let t=0;for(let n of e)t+=n.width*n.height;return t},fo=(e,t)=>{for(let{id:n,name:r,count:i,x:a,y:o,width:s,height:c,didCommit:l}of t){let t={id:n,name:r,count:i,x:a,y:o,width:s,height:c,frame:0,targetX:a,targetY:o,targetWidth:s,targetHeight:c,didCommit:l},u=String(t.id),d=e.get(u);d?(d.count++,d.frame=0,d.targetX=a,d.targetY=o,d.targetWidth=s,d.targetHeight=c,d.didCommit=l):e.set(u,t)}},po=(e,t,n)=>{for(let r of e.values()){let e=r.x-t,i=r.y-n;r.targetX=e,r.targetY=i}},mo=(e,t)=>{let n=e.getContext(`2d`,{alpha:!0});return n&&n.scale(t,t),n},ho=(e,t,n,r)=>{e.clearRect(0,0,t.width/n,t.height/n);let i=new Map,a=new Map;for(let e of r.values()){let{x:t,y:n,width:r,height:o,targetX:s,targetY:c,targetWidth:l,targetHeight:u,frame:d}=e;s!==t&&(e.x=to(t,s)),c!==n&&(e.y=to(n,c)),l!==r&&(e.width=to(r,l)),u!==o&&(e.height=to(o,u));let f=`${s??t},${c??n}`,p=`${f},${l??r},${u??o}`,m=i.get(f);m?m.push(e):i.set(f,[e]);let h=1-d/io;e.frame++;let g=a.get(p)||{x:t,y:n,width:r,height:o,alpha:h};h>g.alpha&&(g.alpha=h),a.set(p,g)}for(let{x:t,y:n,width:r,height:i,alpha:o}of a.values()){e.strokeStyle=`rgba(${ao},${o})`,e.lineWidth=1;let a=Math.round(t)+.5,s=Math.round(n)+.5,c=Math.round(r),l=Math.round(i);e.beginPath(),e.rect(a,s,c,l),e.stroke(),e.fillStyle=`rgba(${ao},${o*.1})`,e.fill()}e.font=`11px ${Qa}`;let o=new Map;e.textRendering=`optimizeSpeed`;for(let t of i.values()){let{x:n,y:i,frame:a}=t[0],s=1-a/io,c=lo(t),{width:l}=e.measureText(c);o.set(`${n},${i},${l},${c}`,{text:c,width:l,height:11,alpha:s,x:n,y:i,outlines:t});let u=i-11-4;if(u<0&&(u=0),a>io)for(let e of t)r.delete(String(e.id))}let s=Array.from(o.entries()).sort(([e,t],[n,r])=>uo(r.outlines)-uo(t.outlines));for(let[t,n]of s)if(o.has(t))for(let[r,i]of o.entries()){if(t===r)continue;let{x:a,y:s,width:c,height:l}=n,{x:u,y:d,width:f,height:p}=i;a+c>u&&u+f>a&&s+l>d&&d+p>s&&(n.text=lo(n.outlines.concat(i.outlines)),n.width=e.measureText(n.text).width,o.delete(r))}for(let t of o.values()){let{x:n,y:r,alpha:i,width:a,height:o,text:s}=t,c=r-o-4;c<0&&(c=0),e.fillStyle=`rgba(${ao},${i})`,e.fillRect(n,c,a+4,o+4),e.fillStyle=`rgba(255,255,255,${i})`,e.fillText(s,n+2,c+o)}return r.size>0},go='"use strict";(()=>{var D="Menlo,Consolas,Monaco,Liberation Mono,Lucida Console,monospace";var T=(t,n)=>{let r=n-t;return Math.abs(r)<.5?n:t+r*.2};var x="115,97,230";function P(t,n){return n[0]-t[0]}function F(t){return[...t.entries()].sort(P)}function v([t,n]){let r=`${n.slice(0,4).join(", ")} \\xD7${t}`;return r.length>40&&(r=`${r.slice(0,40)}\\u2026`),r}var $=t=>{let n=new Map;for(let{name:e,count:u}of t)n.set(e,(n.get(e)||0)+u);let r=new Map;for(let[e,u]of n){let A=r.get(u);A?A.push(e):r.set(u,[e])}let d=F(r),a=v(d[0]);for(let e=1,u=d.length;e<u;e++)a+=", "+v(d[e]);return a.length>40?`${a.slice(0,40)}\\u2026`:a},H=t=>{let n=0;for(let r of t)n+=r.width*r.height;return n};var N=(t,n)=>{let r=t.getContext("2d",{alpha:!0});return r&&r.scale(n,n),r},X=(t,n,r,d)=>{t.clearRect(0,0,n.width/r,n.height/r);let a=new Map,e=new Map;for(let i of d.values()){let{x:o,y:c,width:l,height:g,targetX:s,targetY:f,targetWidth:h,targetHeight:m,frame:O}=i;s!==o&&(i.x=T(o,s)),f!==c&&(i.y=T(c,f)),h!==l&&(i.width=T(l,h)),m!==g&&(i.height=T(g,m));let M=`${s??o},${f??c}`,L=`${M},${h??l},${m??g}`,S=a.get(M);S?S.push(i):a.set(M,[i]);let C=1-O/45;i.frame++;let _=e.get(L)||{x:o,y:c,width:l,height:g,alpha:C};C>_.alpha&&(_.alpha=C),e.set(L,_)}for(let{x:i,y:o,width:c,height:l,alpha:g}of e.values()){t.strokeStyle=`rgba(${x},${g})`,t.lineWidth=1;let s=Math.round(i)+.5,f=Math.round(o)+.5,h=Math.round(c),m=Math.round(l);t.beginPath(),t.rect(s,f,h,m),t.stroke(),t.fillStyle=`rgba(${x},${g*.1})`,t.fill()}t.font=`11px ${D}`;let u=new Map;t.textRendering="optimizeSpeed";for(let i of a.values()){let o=i[0],{x:c,y:l,frame:g}=o,s=1-g/45,f=$(i),{width:h}=t.measureText(f),m=11;u.set(`${c},${l},${h},${f}`,{text:f,width:h,height:m,alpha:s,x:c,y:l,outlines:i});let O=l-m-4;if(O<0&&(O=0),g>45)for(let M of i)d.delete(String(M.id))}let A=Array.from(u.entries()).sort(([i,o],[c,l])=>H(l.outlines)-H(o.outlines));for(let[i,o]of A)if(u.has(i))for(let[c,l]of u.entries()){if(i===c)continue;let{x:g,y:s,width:f,height:h}=o,{x:m,y:O,width:M,height:L}=l;g+f>m&&m+M>g&&s+h>O&&O+L>s&&(o.text=$(o.outlines.concat(l.outlines)),o.width=t.measureText(o.text).width,u.delete(c))}for(let i of u.values()){let{x:o,y:c,alpha:l,width:g,height:s,text:f}=i,h=c-s-4;h<0&&(h=0),t.fillStyle=`rgba(${x},${l})`,t.fillRect(o,h,g+4,s+4),t.fillStyle=`rgba(255,255,255,${l})`,t.fillText(f,o+2,h+s)}return d.size>0};var p=null,w=null,b=1,y=new Map,E=null,R=()=>{if(!w||!p)return;X(w,p,b,y)?E=requestAnimationFrame(R):E=null};self.onmessage=t=>{let{type:n}=t.data;if(n==="init"&&(p=t.data.canvas,b=t.data.dpr,p&&(p.width=t.data.width,p.height=t.data.height,w=N(p,b))),!(!p||!w)){if(n==="resize"){b=t.data.dpr,p.width=t.data.width*b,p.height=t.data.height*b,w.resetTransform(),w.scale(b,b),R();return}if(n==="draw-outlines"){let{data:r,names:d}=t.data,a=new Float32Array(r);for(let e=0;e<a.length;e+=7){let u=a[e+2],A=a[e+3],i=a[e+4],o=a[e+5],c=a[e+6],l={id:a[e],name:d[e/7],count:a[e+1],x:u,y:A,width:i,height:o,frame:0,targetX:u,targetY:A,targetWidth:i,targetHeight:o,didCommit:c},g=String(l.id),s=y.get(g);s?(s.count++,s.frame=0,s.targetX=u,s.targetY=A,s.targetWidth=i,s.targetHeight=o,s.didCommit=c):y.set(g,l)}E||(E=requestAnimationFrame(R));return}if(n==="scroll"){let{deltaX:r,deltaY:d}=t.data;for(let a of y.values()){let e=a.x-r,u=a.y-d;a.targetX=e,a.targetY=u}}}};})();\n',_o=null,vo=null,yo=null,bo=1,xo=null,So=new Map,Co=new Map,wo=new Set,To=e=>{if(!i(e))return;let t=typeof e.type==`string`?e.type:l(e);if(!t)return;let n=Co.get(e),r=h(e),a=g(e);n?n.count++:(Co.set(e,{name:t,count:1,elements:r.map(e=>e.stateNode),didCommit:a?1:0}),wo.add(e))},Eo=e=>{let t=e[0];if(e.length===1)return t;let n,r,i,a;for(let t=0,o=e.length;t<o;t++){let o=e[t];n=n==null?o.x:Math.min(n,o.x),r=r==null?o.y:Math.min(r,o.y),i=i==null?o.x+o.width:Math.max(i,o.x+o.width),a=a==null?o.y+o.height:Math.max(a,o.y+o.height)}return n==null||r==null||i==null||a==null?e[0]:new DOMRect(n,r,i-n,a-r)};function Do(e,t){let n=[];for(let t of e){let e=t.target;this.seenElements.has(e)||(this.seenElements.add(e),n.push(t))}n.length>0&&this.resolveNext&&(this.resolveNext(n),this.resolveNext=null),this.seenElements.size===this.uniqueElements.size&&(t.disconnect(),this.done=!0,this.resolveNext&&this.resolveNext([]))}var Oo=async function*(e){let t={uniqueElements:new Set(e),seenElements:new Set,resolveNext:null,done:!1},n=new IntersectionObserver(Do.bind(t));for(let e of t.uniqueElements)n.observe(e);for(;!t.done;){let e=await new Promise(e=>{t.resolveNext=e});e.length>0&&(yield e)}},ko=typeof SharedArrayBuffer<`u`?SharedArrayBuffer:ArrayBuffer,Ao=async()=>{let t=[];for(let e of wo){let n=Co.get(e);if(n)for(let e=0;e<n.elements.length;e++)n.elements[e]instanceof Element&&t.push(n.elements[e])}let n=new Map;for await(let r of Oo(t)){for(let e of r){let t=e.target,r=e.intersectionRect;e.isIntersecting&&r.width&&r.height&&n.set(t,r)}let t=[],i=[],a=[];for(let r of wo){let o=Co.get(r);if(!o)continue;let s=[];for(let e=0;e<o.elements.length;e++){let t=o.elements[e],r=n.get(t);r&&s.push(r)}s.length&&(t.push(o),i.push(Eo(s)),a.push(e(r)))}if(t.length>0){let e=new ko(t.length*Za*4),n=new Float32Array(e),r=Array(t.length),o;for(let e=0,s=t.length;e<s;e++){let s=t[e],c=a[e],{x:l,y:u,width:d,height:f}=i[e],{count:p,name:m,didCommit:h}=s;if(_o){let t=e*Za;n[t]=c,n[t+1]=p,n[t+2]=l,n[t+3]=u,n[t+4]=d,n[t+5]=f,n[t+6]=h,r[e]=m}else o||=Array(t.length),o[e]={id:c,name:m,count:p,x:l,y:u,width:d,height:f,didCommit:h}}_o?_o.postMessage({type:`draw-outlines`,data:e,names:r}):vo&&yo&&o&&(fo(So,o),xo||=requestAnimationFrame(jo))}}for(let e of wo)Co.delete(e),wo.delete(e)},jo=()=>{!yo||!vo||(xo=ho(yo,vo,bo,So)?requestAnimationFrame(jo):null)},Mo=typeof OffscreenCanvas<`u`&&typeof Worker<`u`,No=()=>Math.min(window.devicePixelRatio||1,2),Po=()=>{Io();let e=document.createElement(`div`);e.setAttribute(`data-react-scan`,`true`);let t=e.attachShadow({mode:`open`}),n=document.createElement(`canvas`);if(n.style.position=`fixed`,n.style.top=`0`,n.style.left=`0`,n.style.pointerEvents=`none`,n.style.zIndex=`2147483646`,n.setAttribute(`aria-hidden`,`true`),t.appendChild(n),!n)return null;bo=No(),vo=n;let{innerWidth:r,innerHeight:i}=window;n.style.width=`${r}px`,n.style.height=`${i}px`;let a=r*bo,o=i*bo;if(n.width=a,n.height=o,Mo&&!window.__REACT_SCAN_EXTENSION__)try{_o=new Worker(URL.createObjectURL(new Blob([go],{type:`application/javascript`})));let e=n.transferControlToOffscreen();_o?.postMessage({type:`init`,canvas:e,width:n.width,height:n.height,dpr:bo},[e])}catch(e){console.warn(`Failed to initialize OffscreenCanvas worker:`,e)}_o||(yo=mo(n,bo));let s=!1;window.addEventListener(`resize`,()=>{s||(s=!0,setTimeout(()=>{let e=window.innerWidth,t=window.innerHeight;bo=No(),n.style.width=`${e}px`,n.style.height=`${t}px`,_o?_o.postMessage({type:`resize`,width:e,height:t,dpr:bo}):(n.width=e*bo,n.height=t*bo,yo&&(yo.resetTransform(),yo.scale(bo,bo)),jo()),s=!1}))});let c=window.scrollX,l=window.scrollY,u=!1;return window.addEventListener(`scroll`,()=>{u||(u=!0,setTimeout(()=>{let{scrollX:e,scrollY:t}=window,n=e-c,r=t-l;c=e,l=t,_o?_o.postMessage({type:`scroll`,deltaX:n,deltaY:r}):requestAnimationFrame(po.bind(null,So,n,r)),u=!1},32))}),setInterval(()=>{wo.size&&requestAnimationFrame(Ao)},32),t.appendChild(n),e},Fo=()=>globalThis.__REACT_SCAN_STOP__,Io=()=>{let e=document.querySelector(`[data-react-scan]`);e&&e.remove()},Lo=t=>{if(i(t)&&$.options.value.showToolbar!==!1&&Q.inspectState.value.kind===`focused`){let r=t,{selfTime:i}=c(t),a=l(t.type),o=e(r),s=Q.reportData.get(o),u=s?.count??0,d=s?.time??0,f=[],p=Q.changesListeners.get(e(t));if(p?.length){let e=Hi(t).map(e=>({type:1,name:e.name,value:e.value,prevValue:e.prevValue,unstable:!1})),n=Aa(t),r=Fa(t).map(e=>({name:e.name,type:4,value:e.value,contextType:e.contextType}));p.forEach(t=>{t({propsChanges:e,stateChanges:n,contextChanges:r})})}let m={count:u+1,time:d+i||0,renders:[],displayName:a,type:n(t.type)||null,changes:f};Q.reportData.set(o,m),Ro=!0}},Ro=!1,zo,Bo=()=>{clearInterval(zo),zo=setInterval(()=>{Ro&&=(Q.lastReportTime.value=Date.now(),!1)},50)},Vo=e=>!nu.has(e.memoizedProps),Ho=!1,Uo=e=>{if(Fo()||Ho)return;Ho=!0;let t,n=!1,r=()=>{n||(t&&cancelAnimationFrame(t),t=requestAnimationFrame(()=>{n=!0;let t=Po();t&&document.documentElement.appendChild(t),e()}))};$.instrumentation=Ja(`react-scan-devtools-0.1.0`,{onCommitStart:()=>{$.options.value.onCommitStart?.()},onActive:(()=>{let e=!1;return()=>{Fo()||e||(e=!0,r(),window.__REACT_SCAN_EXTENSION__||(globalThis.__REACT_SCAN__={ReactScanInternals:$}),Bo(),Xa())}})(),onError:()=>{},isValidFiber:Vo,onRender:(e,t)=>{i(e)&&Q.interactionListeningForRenders?.(e,t);let n=$.instrumentation?.isPaused.value,r=Q.inspectState.value.kind===`inspect-off`||Q.inspectState.value.kind===`uninitialized`;n&&r||(n||To(e),$.options.value.log&&Ya(t),Q.inspectState.value.kind===`focused`&&(Ur.value=Date.now()),r||Lo(e),$.options.value.onRender?.(e,t))},onCommitFinish:()=>{r(),$.options.value.onCommitFinish?.()},onPostCommitFiberRoot(){r()},trackChanges:!1})},Wo=`*, ::before, ::after {
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-pan-x:  ;
  --tw-pan-y:  ;
  --tw-pinch-zoom:  ;
  --tw-scroll-snap-strictness: proximity;
  --tw-gradient-from-position:  ;
  --tw-gradient-via-position:  ;
  --tw-gradient-to-position:  ;
  --tw-ordinal:  ;
  --tw-slashed-zero:  ;
  --tw-numeric-figure:  ;
  --tw-numeric-spacing:  ;
  --tw-numeric-fraction:  ;
  --tw-ring-inset:  ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgb(59 130 246 / 0.5);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  --tw-blur:  ;
  --tw-brightness:  ;
  --tw-contrast:  ;
  --tw-grayscale:  ;
  --tw-hue-rotate:  ;
  --tw-invert:  ;
  --tw-saturate:  ;
  --tw-sepia:  ;
  --tw-drop-shadow:  ;
  --tw-backdrop-blur:  ;
  --tw-backdrop-brightness:  ;
  --tw-backdrop-contrast:  ;
  --tw-backdrop-grayscale:  ;
  --tw-backdrop-hue-rotate:  ;
  --tw-backdrop-invert:  ;
  --tw-backdrop-opacity:  ;
  --tw-backdrop-saturate:  ;
  --tw-backdrop-sepia:  ;
  --tw-contain-size:  ;
  --tw-contain-layout:  ;
  --tw-contain-paint:  ;
  --tw-contain-style:  ;
}

::backdrop {
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-pan-x:  ;
  --tw-pan-y:  ;
  --tw-pinch-zoom:  ;
  --tw-scroll-snap-strictness: proximity;
  --tw-gradient-from-position:  ;
  --tw-gradient-via-position:  ;
  --tw-gradient-to-position:  ;
  --tw-ordinal:  ;
  --tw-slashed-zero:  ;
  --tw-numeric-figure:  ;
  --tw-numeric-spacing:  ;
  --tw-numeric-fraction:  ;
  --tw-ring-inset:  ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgb(59 130 246 / 0.5);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  --tw-blur:  ;
  --tw-brightness:  ;
  --tw-contrast:  ;
  --tw-grayscale:  ;
  --tw-hue-rotate:  ;
  --tw-invert:  ;
  --tw-saturate:  ;
  --tw-sepia:  ;
  --tw-drop-shadow:  ;
  --tw-backdrop-blur:  ;
  --tw-backdrop-brightness:  ;
  --tw-backdrop-contrast:  ;
  --tw-backdrop-grayscale:  ;
  --tw-backdrop-hue-rotate:  ;
  --tw-backdrop-invert:  ;
  --tw-backdrop-opacity:  ;
  --tw-backdrop-saturate:  ;
  --tw-backdrop-sepia:  ;
  --tw-contain-size:  ;
  --tw-contain-layout:  ;
  --tw-contain-paint:  ;
  --tw-contain-style:  ;
}/*
! tailwindcss v3.4.17 | MIT License | https://tailwindcss.com
*//*
1. Prevent padding and border from affecting element width. (https://github.com/mozdevs/cssremedy/issues/4)
2. Allow adding a border to an element by just adding a border-width. (https://github.com/tailwindcss/tailwindcss/pull/116)
*/

*,
::before,
::after {
  box-sizing: border-box; /* 1 */
  border-width: 0; /* 2 */
  border-style: solid; /* 2 */
  border-color: #e5e7eb; /* 2 */
}

::before,
::after {
  --tw-content: '';
}

/*
1. Use a consistent sensible line-height in all browsers.
2. Prevent adjustments of font size after orientation changes in iOS.
3. Use a more readable tab size.
4. Use the user's configured \`sans\` font-family by default.
5. Use the user's configured \`sans\` font-feature-settings by default.
6. Use the user's configured \`sans\` font-variation-settings by default.
7. Disable tap highlights on iOS
*/

html,
:host {
  line-height: 1.5; /* 1 */
  -webkit-text-size-adjust: 100%; /* 2 */
  -moz-tab-size: 4; /* 3 */
  -o-tab-size: 4;
     tab-size: 4; /* 3 */
  font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"; /* 4 */
  font-feature-settings: normal; /* 5 */
  font-variation-settings: normal; /* 6 */
  -webkit-tap-highlight-color: transparent; /* 7 */
}

/*
1. Remove the margin in all browsers.
2. Inherit line-height from \`html\` so users can set them as a class directly on the \`html\` element.
*/

body {
  margin: 0; /* 1 */
  line-height: inherit; /* 2 */
}

/*
1. Add the correct height in Firefox.
2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)
3. Ensure horizontal rules are visible by default.
*/

hr {
  height: 0; /* 1 */
  color: inherit; /* 2 */
  border-top-width: 1px; /* 3 */
}

/*
Add the correct text decoration in Chrome, Edge, and Safari.
*/

abbr:where([title]) {
  -webkit-text-decoration: underline dotted;
          text-decoration: underline dotted;
}

/*
Remove the default font size and weight for headings.
*/

h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: inherit;
  font-weight: inherit;
}

/*
Reset links to optimize for opt-in styling instead of opt-out.
*/

a {
  color: inherit;
  text-decoration: inherit;
}

/*
Add the correct font weight in Edge and Safari.
*/

b,
strong {
  font-weight: bolder;
}

/*
1. Use the user's configured \`mono\` font-family by default.
2. Use the user's configured \`mono\` font-feature-settings by default.
3. Use the user's configured \`mono\` font-variation-settings by default.
4. Correct the odd \`em\` font sizing in all browsers.
*/

code,
kbd,
samp,
pre {
  font-family: Menlo, Consolas, Monaco, Liberation Mono, Lucida Console, monospace; /* 1 */
  font-feature-settings: normal; /* 2 */
  font-variation-settings: normal; /* 3 */
  font-size: 1em; /* 4 */
}

/*
Add the correct font size in all browsers.
*/

small {
  font-size: 80%;
}

/*
Prevent \`sub\` and \`sup\` elements from affecting the line height in all browsers.
*/

sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

/*
1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)
2. Correct table border color inheritance in all Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)
3. Remove gaps between table borders by default.
*/

table {
  text-indent: 0; /* 1 */
  border-color: inherit; /* 2 */
  border-collapse: collapse; /* 3 */
}

/*
1. Change the font styles in all browsers.
2. Remove the margin in Firefox and Safari.
3. Remove default padding in all browsers.
*/

button,
input,
optgroup,
select,
textarea {
  font-family: inherit; /* 1 */
  font-feature-settings: inherit; /* 1 */
  font-variation-settings: inherit; /* 1 */
  font-size: 100%; /* 1 */
  font-weight: inherit; /* 1 */
  line-height: inherit; /* 1 */
  letter-spacing: inherit; /* 1 */
  color: inherit; /* 1 */
  margin: 0; /* 2 */
  padding: 0; /* 3 */
}

/*
Remove the inheritance of text transform in Edge and Firefox.
*/

button,
select {
  text-transform: none;
}

/*
1. Correct the inability to style clickable types in iOS and Safari.
2. Remove default button styles.
*/

button,
input:where([type='button']),
input:where([type='reset']),
input:where([type='submit']) {
  -webkit-appearance: button; /* 1 */
  background-color: transparent; /* 2 */
  background-image: none; /* 2 */
}

/*
Use the modern Firefox focus style for all focusable elements.
*/

:-moz-focusring {
  outline: auto;
}

/*
Remove the additional \`:invalid\` styles in Firefox. (https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737)
*/

:-moz-ui-invalid {
  box-shadow: none;
}

/*
Add the correct vertical alignment in Chrome and Firefox.
*/

progress {
  vertical-align: baseline;
}

/*
Correct the cursor style of increment and decrement buttons in Safari.
*/

::-webkit-inner-spin-button,
::-webkit-outer-spin-button {
  height: auto;
}

/*
1. Correct the odd appearance in Chrome and Safari.
2. Correct the outline style in Safari.
*/

[type='search'] {
  -webkit-appearance: textfield; /* 1 */
  outline-offset: -2px; /* 2 */
}

/*
Remove the inner padding in Chrome and Safari on macOS.
*/

::-webkit-search-decoration {
  -webkit-appearance: none;
}

/*
1. Correct the inability to style clickable types in iOS and Safari.
2. Change font properties to \`inherit\` in Safari.
*/

::-webkit-file-upload-button {
  -webkit-appearance: button; /* 1 */
  font: inherit; /* 2 */
}

/*
Add the correct display in Chrome and Safari.
*/

summary {
  display: list-item;
}

/*
Removes the default spacing and border for appropriate elements.
*/

blockquote,
dl,
dd,
h1,
h2,
h3,
h4,
h5,
h6,
hr,
figure,
p,
pre {
  margin: 0;
}

fieldset {
  margin: 0;
  padding: 0;
}

legend {
  padding: 0;
}

ol,
ul,
menu {
  list-style: none;
  margin: 0;
  padding: 0;
}

/*
Reset default styling for dialogs.
*/
dialog {
  padding: 0;
}

/*
Prevent resizing textareas horizontally by default.
*/

textarea {
  resize: vertical;
}

/*
1. Reset the default placeholder opacity in Firefox. (https://github.com/tailwindlabs/tailwindcss/issues/3300)
2. Set the default placeholder color to the user's configured gray 400 color.
*/

input::-moz-placeholder, textarea::-moz-placeholder {
  opacity: 1; /* 1 */
  color: #9ca3af; /* 2 */
}

input::placeholder,
textarea::placeholder {
  opacity: 1; /* 1 */
  color: #9ca3af; /* 2 */
}

/*
Set the default cursor for buttons.
*/

button,
[role="button"] {
  cursor: pointer;
}

/*
Make sure disabled buttons don't get the pointer cursor.
*/
:disabled {
  cursor: default;
}

/*
1. Make replaced elements \`display: block\` by default. (https://github.com/mozdevs/cssremedy/issues/14)
2. Add \`vertical-align: middle\` to align replaced elements more sensibly by default. (https://github.com/jensimmons/cssremedy/issues/14#issuecomment-634934210)
   This can trigger a poorly considered lint error in some tools but is included by design.
*/

img,
svg,
video,
canvas,
audio,
iframe,
embed,
object {
  display: block; /* 1 */
  vertical-align: middle; /* 2 */
}

/*
Constrain images and videos to the parent width and preserve their intrinsic aspect ratio. (https://github.com/mozdevs/cssremedy/issues/14)
*/

img,
video {
  max-width: 100%;
  height: auto;
}

/* Make elements with the HTML hidden attribute stay hidden by default */
[hidden]:where(:not([hidden="until-found"])) {
  display: none;
}
.\\!container {
  width: 100% !important;
}
.container {
  width: 100%;
}
@media (min-width: 640px) {

  .\\!container {
    max-width: 640px !important;
  }

  .container {
    max-width: 640px;
  }
}
@media (min-width: 768px) {

  .\\!container {
    max-width: 768px !important;
  }

  .container {
    max-width: 768px;
  }
}
@media (min-width: 1024px) {

  .\\!container {
    max-width: 1024px !important;
  }

  .container {
    max-width: 1024px;
  }
}
@media (min-width: 1280px) {

  .\\!container {
    max-width: 1280px !important;
  }

  .container {
    max-width: 1280px;
  }
}
@media (min-width: 1536px) {

  .\\!container {
    max-width: 1536px !important;
  }

  .container {
    max-width: 1536px;
  }
}
.pointer-events-none {
  pointer-events: none;
}
.pointer-events-auto {
  pointer-events: auto;
}
.visible {
  visibility: visible;
}
.static {
  position: static;
}
.fixed {
  position: fixed;
}
.absolute {
  position: absolute;
}
.relative {
  position: relative;
}
.sticky {
  position: sticky;
}
.inset-0 {
  inset: 0px;
}
.inset-x-1 {
  left: 4px;
  right: 4px;
}
.inset-y-0 {
  top: 0px;
  bottom: 0px;
}
.-right-1 {
  right: -4px;
}
.-right-2\\.5 {
  right: -10px;
}
.-top-1 {
  top: -4px;
}
.-top-2\\.5 {
  top: -10px;
}
.bottom-0 {
  bottom: 0px;
}
.bottom-4 {
  bottom: 16px;
}
.left-0 {
  left: 0px;
}
.left-3 {
  left: 12px;
}
.right-0 {
  right: 0px;
}
.right-0\\.5 {
  right: 2px;
}
.right-2 {
  right: 8px;
}
.right-4 {
  right: 16px;
}
.top-0 {
  top: 0px;
}
.top-0\\.5 {
  top: 2px;
}
.top-1\\/2 {
  top: 50%;
}
.top-2 {
  top: 8px;
}
.z-10 {
  z-index: 10;
}
.z-100 {
  z-index: 100;
}
.z-50 {
  z-index: 50;
}
.z-\\[124124124124\\] {
  z-index: 124124124124;
}
.z-\\[214748365\\] {
  z-index: 214748365;
}
.z-\\[214748367\\] {
  z-index: 214748367;
}
.m-\\[2px\\] {
  margin: 2px;
}
.mx-0\\.5 {
  margin-left: 2px;
  margin-right: 2px;
}
.\\!ml-0 {
  margin-left: 0px !important;
}
.mb-1\\.5 {
  margin-bottom: 6px;
}
.mb-2 {
  margin-bottom: 8px;
}
.mb-3 {
  margin-bottom: 12px;
}
.mb-4 {
  margin-bottom: 16px;
}
.mb-px {
  margin-bottom: 1px;
}
.ml-1 {
  margin-left: 4px;
}
.ml-1\\.5 {
  margin-left: 6px;
}
.ml-auto {
  margin-left: auto;
}
.mr-0\\.5 {
  margin-right: 2px;
}
.mr-1 {
  margin-right: 4px;
}
.mr-1\\.5 {
  margin-right: 6px;
}
.mr-16 {
  margin-right: 64px;
}
.mr-auto {
  margin-right: auto;
}
.mt-0\\.5 {
  margin-top: 2px;
}
.mt-1 {
  margin-top: 4px;
}
.mt-4 {
  margin-top: 16px;
}
.block {
  display: block;
}
.inline {
  display: inline;
}
.flex {
  display: flex;
}
.hidden {
  display: none;
}
.aspect-square {
  aspect-ratio: 1 / 1;
}
.h-1 {
  height: 4px;
}
.h-1\\.5 {
  height: 6px;
}
.h-10 {
  height: 40px;
}
.h-12 {
  height: 48px;
}
.h-4 {
  height: 16px;
}
.h-4\\/5 {
  height: 80%;
}
.h-6 {
  height: 24px;
}
.h-7 {
  height: 28px;
}
.h-8 {
  height: 32px;
}
.h-\\[150px\\] {
  height: 150px;
}
.h-\\[235px\\] {
  height: 235px;
}
.h-\\[28px\\] {
  height: 28px;
}
.h-\\[48px\\] {
  height: 48px;
}
.h-\\[50px\\] {
  height: 50px;
}
.h-\\[calc\\(100\\%-150px\\)\\] {
  height: calc(100% - 150px);
}
.h-\\[calc\\(100\\%-200px\\)\\] {
  height: calc(100% - 200px);
}
.h-\\[calc\\(100\\%-25px\\)\\] {
  height: calc(100% - 25px);
}
.h-\\[calc\\(100\\%-40px\\)\\] {
  height: calc(100% - 40px);
}
.h-\\[calc\\(100\\%-48px\\)\\] {
  height: calc(100% - 48px);
}
.h-fit {
  height: -moz-fit-content;
  height: fit-content;
}
.h-full {
  height: 100%;
}
.h-screen {
  height: 100vh;
}
.max-h-0 {
  max-height: 0px;
}
.max-h-40 {
  max-height: 160px;
}
.max-h-9 {
  max-height: 36px;
}
.min-h-9 {
  min-height: 36px;
}
.min-h-\\[48px\\] {
  min-height: 48px;
}
.min-h-fit {
  min-height: -moz-fit-content;
  min-height: fit-content;
}
.w-1 {
  width: 4px;
}
.w-1\\/2 {
  width: 50%;
}
.w-1\\/3 {
  width: 33.333333%;
}
.w-2\\/4 {
  width: 50%;
}
.w-3 {
  width: 12px;
}
.w-4 {
  width: 16px;
}
.w-4\\/5 {
  width: 80%;
}
.w-6 {
  width: 24px;
}
.w-80 {
  width: 320px;
}
.w-\\[20px\\] {
  width: 20px;
}
.w-\\[72px\\] {
  width: 72px;
}
.w-\\[90\\%\\] {
  width: 90%;
}
.w-\\[calc\\(100\\%-200px\\)\\] {
  width: calc(100% - 200px);
}
.w-fit {
  width: -moz-fit-content;
  width: fit-content;
}
.w-full {
  width: 100%;
}
.w-px {
  width: 1px;
}
.w-screen {
  width: 100vw;
}
.min-w-0 {
  min-width: 0px;
}
.min-w-\\[200px\\] {
  min-width: 200px;
}
.min-w-fit {
  min-width: -moz-fit-content;
  min-width: fit-content;
}
.max-w-md {
  max-width: 448px;
}
.flex-1 {
  flex: 1 1 0%;
}
.shrink-0 {
  flex-shrink: 0;
}
.grow {
  flex-grow: 1;
}
.-translate-y-1\\/2 {
  --tw-translate-y: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.-translate-y-\\[200\\%\\] {
  --tw-translate-y: -200%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.translate-y-0 {
  --tw-translate-y: 0px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.-rotate-90 {
  --tw-rotate: -90deg;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.rotate-0 {
  --tw-rotate: 0deg;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.rotate-180 {
  --tw-rotate: 180deg;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.rotate-90 {
  --tw-rotate: 90deg;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.scale-110 {
  --tw-scale-x: 1.1;
  --tw-scale-y: 1.1;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.transform {
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
@keyframes fadeIn {

  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
.animate-fade-in {
  animation: fadeIn ease-in forwards;
}
.cursor-default {
  cursor: default;
}
.cursor-e-resize {
  cursor: e-resize;
}
.cursor-ew-resize {
  cursor: ew-resize;
}
.cursor-move {
  cursor: move;
}
.cursor-nesw-resize {
  cursor: nesw-resize;
}
.cursor-ns-resize {
  cursor: ns-resize;
}
.cursor-nwse-resize {
  cursor: nwse-resize;
}
.cursor-pointer {
  cursor: pointer;
}
.cursor-w-resize {
  cursor: w-resize;
}
.select-none {
  -webkit-user-select: none;
     -moz-user-select: none;
          user-select: none;
}
.resize {
  resize: both;
}
.appearance-none {
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
}
.flex-col {
  flex-direction: column;
}
.items-start {
  align-items: flex-start;
}
.items-end {
  align-items: flex-end;
}
.items-center {
  align-items: center;
}
.items-stretch {
  align-items: stretch;
}
.justify-start {
  justify-content: flex-start;
}
.justify-end {
  justify-content: flex-end;
}
.justify-center {
  justify-content: center;
}
.justify-between {
  justify-content: space-between;
}
.gap-0\\.5 {
  gap: 2px;
}
.gap-1 {
  gap: 4px;
}
.gap-1\\.5 {
  gap: 6px;
}
.gap-2 {
  gap: 8px;
}
.gap-4 {
  gap: 16px;
}
.gap-x-0\\.5 {
  -moz-column-gap: 2px;
       column-gap: 2px;
}
.gap-x-1 {
  -moz-column-gap: 4px;
       column-gap: 4px;
}
.gap-x-1\\.5 {
  -moz-column-gap: 6px;
       column-gap: 6px;
}
.gap-x-2 {
  -moz-column-gap: 8px;
       column-gap: 8px;
}
.gap-x-3 {
  -moz-column-gap: 12px;
       column-gap: 12px;
}
.gap-x-4 {
  -moz-column-gap: 16px;
       column-gap: 16px;
}
.gap-y-0\\.5 {
  row-gap: 2px;
}
.gap-y-1 {
  row-gap: 4px;
}
.gap-y-2 {
  row-gap: 8px;
}
.gap-y-4 {
  row-gap: 16px;
}
.space-y-1\\.5 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(6px * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(6px * var(--tw-space-y-reverse));
}
.divide-y > :not([hidden]) ~ :not([hidden]) {
  --tw-divide-y-reverse: 0;
  border-top-width: calc(1px * calc(1 - var(--tw-divide-y-reverse)));
  border-bottom-width: calc(1px * var(--tw-divide-y-reverse));
}
.divide-zinc-800 > :not([hidden]) ~ :not([hidden]) {
  --tw-divide-opacity: 1;
  border-color: rgb(39 39 42 / var(--tw-divide-opacity, 1));
}
.place-self-center {
  place-self: center;
}
.self-end {
  align-self: flex-end;
}
.overflow-auto {
  overflow: auto;
}
.overflow-hidden {
  overflow: hidden;
}
.\\!overflow-visible {
  overflow: visible !important;
}
.overflow-x-auto {
  overflow-x: auto;
}
.overflow-y-auto {
  overflow-y: auto;
}
.overflow-x-hidden {
  overflow-x: hidden;
}
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.whitespace-nowrap {
  white-space: nowrap;
}
.whitespace-pre-wrap {
  white-space: pre-wrap;
}
.text-wrap {
  text-wrap: wrap;
}
.break-words {
  overflow-wrap: break-word;
}
.break-all {
  word-break: break-all;
}
.rounded {
  border-radius: 4px;
}
.rounded-full {
  border-radius: 9999px;
}
.rounded-lg {
  border-radius: 8px;
}
.rounded-md {
  border-radius: 6px;
}
.rounded-sm {
  border-radius: 2px;
}
.rounded-l-md {
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
}
.rounded-l-sm {
  border-top-left-radius: 2px;
  border-bottom-left-radius: 2px;
}
.rounded-r-md {
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
}
.rounded-r-sm {
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
}
.rounded-t-lg {
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}
.rounded-t-sm {
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
}
.rounded-bl-lg {
  border-bottom-left-radius: 8px;
}
.rounded-br-lg {
  border-bottom-right-radius: 8px;
}
.rounded-tl-lg {
  border-top-left-radius: 8px;
}
.rounded-tr-lg {
  border-top-right-radius: 8px;
}
.border {
  border-width: 1px;
}
.border-4 {
  border-width: 4px;
}
.border-b {
  border-bottom-width: 1px;
}
.border-l {
  border-left-width: 1px;
}
.border-l-0 {
  border-left-width: 0px;
}
.border-l-1 {
  border-left-width: 1px;
}
.border-r {
  border-right-width: 1px;
}
.border-t {
  border-top-width: 1px;
}
.border-none {
  border-style: none;
}
.\\!border-red-500 {
  --tw-border-opacity: 1 !important;
  border-color: rgb(239 68 68 / var(--tw-border-opacity, 1)) !important;
}
.border-\\[\\#1e1e1e\\] {
  --tw-border-opacity: 1;
  border-color: rgb(30 30 30 / var(--tw-border-opacity, 1));
}
.border-\\[\\#222\\] {
  --tw-border-opacity: 1;
  border-color: rgb(34 34 34 / var(--tw-border-opacity, 1));
}
.border-\\[\\#27272A\\] {
  --tw-border-opacity: 1;
  border-color: rgb(39 39 42 / var(--tw-border-opacity, 1));
}
.border-\\[\\#333\\] {
  --tw-border-opacity: 1;
  border-color: rgb(51 51 51 / var(--tw-border-opacity, 1));
}
.border-transparent {
  border-color: transparent;
}
.border-zinc-800 {
  --tw-border-opacity: 1;
  border-color: rgb(39 39 42 / var(--tw-border-opacity, 1));
}
.bg-\\[\\#0A0A0A\\] {
  --tw-bg-opacity: 1;
  background-color: rgb(10 10 10 / var(--tw-bg-opacity, 1));
}
.bg-\\[\\#141414\\] {
  --tw-bg-opacity: 1;
  background-color: rgb(20 20 20 / var(--tw-bg-opacity, 1));
}
.bg-\\[\\#18181B\\] {
  --tw-bg-opacity: 1;
  background-color: rgb(24 24 27 / var(--tw-bg-opacity, 1));
}
.bg-\\[\\#18181B\\]\\/50 {
  background-color: rgb(24 24 27 / 0.5);
}
.bg-\\[\\#1D3A66\\] {
  --tw-bg-opacity: 1;
  background-color: rgb(29 58 102 / var(--tw-bg-opacity, 1));
}
.bg-\\[\\#1E1E1E\\] {
  --tw-bg-opacity: 1;
  background-color: rgb(30 30 30 / var(--tw-bg-opacity, 1));
}
.bg-\\[\\#1a2a1a\\] {
  --tw-bg-opacity: 1;
  background-color: rgb(26 42 26 / var(--tw-bg-opacity, 1));
}
.bg-\\[\\#1e1e1e\\] {
  --tw-bg-opacity: 1;
  background-color: rgb(30 30 30 / var(--tw-bg-opacity, 1));
}
.bg-\\[\\#214379d4\\] {
  background-color: #214379d4;
}
.bg-\\[\\#27272A\\] {
  --tw-bg-opacity: 1;
  background-color: rgb(39 39 42 / var(--tw-bg-opacity, 1));
}
.bg-\\[\\#2a1515\\] {
  --tw-bg-opacity: 1;
  background-color: rgb(42 21 21 / var(--tw-bg-opacity, 1));
}
.bg-\\[\\#412162\\] {
  --tw-bg-opacity: 1;
  background-color: rgb(65 33 98 / var(--tw-bg-opacity, 1));
}
.bg-\\[\\#44444a\\] {
  --tw-bg-opacity: 1;
  background-color: rgb(68 68 74 / var(--tw-bg-opacity, 1));
}
.bg-\\[\\#4b4b4b\\] {
  --tw-bg-opacity: 1;
  background-color: rgb(75 75 75 / var(--tw-bg-opacity, 1));
}
.bg-\\[\\#5f3f9a\\] {
  --tw-bg-opacity: 1;
  background-color: rgb(95 63 154 / var(--tw-bg-opacity, 1));
}
.bg-\\[\\#5f3f9a\\]\\/40 {
  background-color: rgb(95 63 154 / 0.4);
}
.bg-\\[\\#6a369e\\] {
  --tw-bg-opacity: 1;
  background-color: rgb(106 54 158 / var(--tw-bg-opacity, 1));
}
.bg-\\[\\#7521c8\\] {
  --tw-bg-opacity: 1;
  background-color: rgb(117 33 200 / var(--tw-bg-opacity, 1));
}
.bg-\\[\\#8e61e3\\] {
  --tw-bg-opacity: 1;
  background-color: rgb(142 97 227 / var(--tw-bg-opacity, 1));
}
.bg-\\[\\#EFD81A\\] {
  --tw-bg-opacity: 1;
  background-color: rgb(239 216 26 / var(--tw-bg-opacity, 1));
}
.bg-\\[\\#b77116\\] {
  --tw-bg-opacity: 1;
  background-color: rgb(183 113 22 / var(--tw-bg-opacity, 1));
}
.bg-\\[\\#b94040\\] {
  --tw-bg-opacity: 1;
  background-color: rgb(185 64 64 / var(--tw-bg-opacity, 1));
}
.bg-\\[\\#d36cff\\] {
  --tw-bg-opacity: 1;
  background-color: rgb(211 108 255 / var(--tw-bg-opacity, 1));
}
.bg-\\[\\#efd81a6b\\] {
  background-color: #efd81a6b;
}
.bg-black {
  --tw-bg-opacity: 1;
  background-color: rgb(0 0 0 / var(--tw-bg-opacity, 1));
}
.bg-black\\/40 {
  background-color: rgb(0 0 0 / 0.4);
}
.bg-gray-200 {
  --tw-bg-opacity: 1;
  background-color: rgb(229 231 235 / var(--tw-bg-opacity, 1));
}
.bg-green-500\\/50 {
  background-color: rgb(34 197 94 / 0.5);
}
.bg-green-500\\/60 {
  background-color: rgb(34 197 94 / 0.6);
}
.bg-neutral-700 {
  --tw-bg-opacity: 1;
  background-color: rgb(64 64 64 / var(--tw-bg-opacity, 1));
}
.bg-purple-500 {
  --tw-bg-opacity: 1;
  background-color: rgb(168 85 247 / var(--tw-bg-opacity, 1));
}
.bg-purple-500\\/90 {
  background-color: rgb(168 85 247 / 0.9);
}
.bg-purple-800 {
  --tw-bg-opacity: 1;
  background-color: rgb(107 33 168 / var(--tw-bg-opacity, 1));
}
.bg-red-500 {
  --tw-bg-opacity: 1;
  background-color: rgb(239 68 68 / var(--tw-bg-opacity, 1));
}
.bg-red-500\\/90 {
  background-color: rgb(239 68 68 / 0.9);
}
.bg-red-950\\/50 {
  background-color: rgb(69 10 10 / 0.5);
}
.bg-transparent {
  background-color: transparent;
}
.bg-white {
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity, 1));
}
.bg-yellow-300 {
  --tw-bg-opacity: 1;
  background-color: rgb(253 224 71 / var(--tw-bg-opacity, 1));
}
.bg-zinc-800 {
  --tw-bg-opacity: 1;
  background-color: rgb(39 39 42 / var(--tw-bg-opacity, 1));
}
.bg-zinc-900\\/30 {
  background-color: rgb(24 24 27 / 0.3);
}
.bg-zinc-900\\/50 {
  background-color: rgb(24 24 27 / 0.5);
}
.p-0 {
  padding: 0px;
}
.p-1 {
  padding: 4px;
}
.p-2 {
  padding: 8px;
}
.p-3 {
  padding: 12px;
}
.p-4 {
  padding: 16px;
}
.p-5 {
  padding: 20px;
}
.p-6 {
  padding: 24px;
}
.px-1 {
  padding-left: 4px;
  padding-right: 4px;
}
.px-1\\.5 {
  padding-left: 6px;
  padding-right: 6px;
}
.px-2 {
  padding-left: 8px;
  padding-right: 8px;
}
.px-2\\.5 {
  padding-left: 10px;
  padding-right: 10px;
}
.px-3 {
  padding-left: 12px;
  padding-right: 12px;
}
.px-4 {
  padding-left: 16px;
  padding-right: 16px;
}
.py-0\\.5 {
  padding-top: 2px;
  padding-bottom: 2px;
}
.py-1 {
  padding-top: 4px;
  padding-bottom: 4px;
}
.py-1\\.5 {
  padding-top: 6px;
  padding-bottom: 6px;
}
.py-2 {
  padding-top: 8px;
  padding-bottom: 8px;
}
.py-3 {
  padding-top: 12px;
  padding-bottom: 12px;
}
.py-4 {
  padding-top: 16px;
  padding-bottom: 16px;
}
.py-\\[1px\\] {
  padding-top: 1px;
  padding-bottom: 1px;
}
.py-\\[3px\\] {
  padding-top: 3px;
  padding-bottom: 3px;
}
.py-\\[5px\\] {
  padding-top: 5px;
  padding-bottom: 5px;
}
.pb-2 {
  padding-bottom: 8px;
}
.pl-1 {
  padding-left: 4px;
}
.pl-2 {
  padding-left: 8px;
}
.pl-2\\.5 {
  padding-left: 10px;
}
.pl-3 {
  padding-left: 12px;
}
.pl-5 {
  padding-left: 20px;
}
.pl-6 {
  padding-left: 24px;
}
.pr-1 {
  padding-right: 4px;
}
.pr-1\\.5 {
  padding-right: 6px;
}
.pr-2 {
  padding-right: 8px;
}
.pr-2\\.5 {
  padding-right: 10px;
}
.pt-0 {
  padding-top: 0px;
}
.pt-2 {
  padding-top: 8px;
}
.pt-5 {
  padding-top: 20px;
}
.text-left {
  text-align: left;
}
.font-mono {
  font-family: Menlo, Consolas, Monaco, Liberation Mono, Lucida Console, monospace;
}
.text-\\[10px\\] {
  font-size: 10px;
}
.text-\\[11px\\] {
  font-size: 11px;
}
.text-\\[13px\\] {
  font-size: 13px;
}
.text-\\[14px\\] {
  font-size: 14px;
}
.text-\\[17px\\] {
  font-size: 17px;
}
.text-\\[8px\\] {
  font-size: 8px;
}
.text-sm {
  font-size: 14px;
  line-height: 20px;
}
.text-xs {
  font-size: 12px;
  line-height: 16px;
}
.font-bold {
  font-weight: 700;
}
.font-medium {
  font-weight: 500;
}
.font-semibold {
  font-weight: 600;
}
.uppercase {
  text-transform: uppercase;
}
.capitalize {
  text-transform: capitalize;
}
.italic {
  font-style: italic;
}
.leading-6 {
  line-height: 24px;
}
.leading-none {
  line-height: 1;
}
.tracking-wide {
  letter-spacing: 0.025em;
}
.text-\\[\\#4ade80\\] {
  --tw-text-opacity: 1;
  color: rgb(74 222 128 / var(--tw-text-opacity, 1));
}
.text-\\[\\#5a5a5a\\] {
  --tw-text-opacity: 1;
  color: rgb(90 90 90 / var(--tw-text-opacity, 1));
}
.text-\\[\\#65656D\\] {
  --tw-text-opacity: 1;
  color: rgb(101 101 109 / var(--tw-text-opacity, 1));
}
.text-\\[\\#666\\] {
  --tw-text-opacity: 1;
  color: rgb(102 102 102 / var(--tw-text-opacity, 1));
}
.text-\\[\\#6E6E77\\] {
  --tw-text-opacity: 1;
  color: rgb(110 110 119 / var(--tw-text-opacity, 1));
}
.text-\\[\\#6F6F78\\] {
  --tw-text-opacity: 1;
  color: rgb(111 111 120 / var(--tw-text-opacity, 1));
}
.text-\\[\\#7346a0\\] {
  --tw-text-opacity: 1;
  color: rgb(115 70 160 / var(--tw-text-opacity, 1));
}
.text-\\[\\#737373\\] {
  --tw-text-opacity: 1;
  color: rgb(115 115 115 / var(--tw-text-opacity, 1));
}
.text-\\[\\#888\\] {
  --tw-text-opacity: 1;
  color: rgb(136 136 136 / var(--tw-text-opacity, 1));
}
.text-\\[\\#8E61E3\\] {
  --tw-text-opacity: 1;
  color: rgb(142 97 227 / var(--tw-text-opacity, 1));
}
.text-\\[\\#999\\] {
  --tw-text-opacity: 1;
  color: rgb(153 153 153 / var(--tw-text-opacity, 1));
}
.text-\\[\\#A1A1AA\\] {
  --tw-text-opacity: 1;
  color: rgb(161 161 170 / var(--tw-text-opacity, 1));
}
.text-\\[\\#A855F7\\] {
  --tw-text-opacity: 1;
  color: rgb(168 85 247 / var(--tw-text-opacity, 1));
}
.text-\\[\\#E4E4E7\\] {
  --tw-text-opacity: 1;
  color: rgb(228 228 231 / var(--tw-text-opacity, 1));
}
.text-\\[\\#d36cff\\] {
  --tw-text-opacity: 1;
  color: rgb(211 108 255 / var(--tw-text-opacity, 1));
}
.text-\\[\\#f87171\\] {
  --tw-text-opacity: 1;
  color: rgb(248 113 113 / var(--tw-text-opacity, 1));
}
.text-black {
  --tw-text-opacity: 1;
  color: rgb(0 0 0 / var(--tw-text-opacity, 1));
}
.text-gray-100 {
  --tw-text-opacity: 1;
  color: rgb(243 244 246 / var(--tw-text-opacity, 1));
}
.text-gray-300 {
  --tw-text-opacity: 1;
  color: rgb(209 213 219 / var(--tw-text-opacity, 1));
}
.text-gray-400 {
  --tw-text-opacity: 1;
  color: rgb(156 163 175 / var(--tw-text-opacity, 1));
}
.text-gray-500 {
  --tw-text-opacity: 1;
  color: rgb(107 114 128 / var(--tw-text-opacity, 1));
}
.text-green-500 {
  --tw-text-opacity: 1;
  color: rgb(34 197 94 / var(--tw-text-opacity, 1));
}
.text-neutral-300 {
  --tw-text-opacity: 1;
  color: rgb(212 212 212 / var(--tw-text-opacity, 1));
}
.text-neutral-400 {
  --tw-text-opacity: 1;
  color: rgb(163 163 163 / var(--tw-text-opacity, 1));
}
.text-neutral-500 {
  --tw-text-opacity: 1;
  color: rgb(115 115 115 / var(--tw-text-opacity, 1));
}
.text-purple-400 {
  --tw-text-opacity: 1;
  color: rgb(192 132 252 / var(--tw-text-opacity, 1));
}
.text-red-300 {
  --tw-text-opacity: 1;
  color: rgb(252 165 165 / var(--tw-text-opacity, 1));
}
.text-red-400 {
  --tw-text-opacity: 1;
  color: rgb(248 113 113 / var(--tw-text-opacity, 1));
}
.text-red-500 {
  --tw-text-opacity: 1;
  color: rgb(239 68 68 / var(--tw-text-opacity, 1));
}
.text-white {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity, 1));
}
.text-white\\/30 {
  color: rgb(255 255 255 / 0.3);
}
.text-white\\/70 {
  color: rgb(255 255 255 / 0.7);
}
.text-yellow-300 {
  --tw-text-opacity: 1;
  color: rgb(253 224 71 / var(--tw-text-opacity, 1));
}
.text-yellow-500 {
  --tw-text-opacity: 1;
  color: rgb(234 179 8 / var(--tw-text-opacity, 1));
}
.text-zinc-200 {
  --tw-text-opacity: 1;
  color: rgb(228 228 231 / var(--tw-text-opacity, 1));
}
.text-zinc-400 {
  --tw-text-opacity: 1;
  color: rgb(161 161 170 / var(--tw-text-opacity, 1));
}
.text-zinc-500 {
  --tw-text-opacity: 1;
  color: rgb(113 113 122 / var(--tw-text-opacity, 1));
}
.text-zinc-600 {
  --tw-text-opacity: 1;
  color: rgb(82 82 91 / var(--tw-text-opacity, 1));
}
.opacity-0 {
  opacity: 0;
}
.opacity-100 {
  opacity: 1;
}
.opacity-50 {
  opacity: 0.5;
}
.shadow-lg {
  --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.outline {
  outline-style: solid;
}
.ring-1 {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}
.ring-white\\/\\[0\\.08\\] {
  --tw-ring-color: rgb(255 255 255 / 0.08);
}
.blur {
  --tw-blur: blur(8px);
  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
}
.\\!filter {
  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow) !important;
}
.filter {
  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
}
.backdrop-blur-sm {
  --tw-backdrop-blur: blur(4px);
  -webkit-backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);
  backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);
}
.transition {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, -webkit-backdrop-filter;
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, -webkit-backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.transition-\\[border-radius\\] {
  transition-property: border-radius;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.transition-\\[color\\2c transform\\] {
  transition-property: color,transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.transition-\\[max-height\\] {
  transition-property: max-height;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.transition-\\[opacity\\] {
  transition-property: opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.transition-colors {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.transition-none {
  transition-property: none;
}
.transition-opacity {
  transition-property: opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.transition-transform {
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.delay-0 {
  transition-delay: 0s;
}
.delay-150 {
  transition-delay: 150ms;
}
.delay-300 {
  transition-delay: 300ms;
}
.\\!duration-0 {
  transition-duration: 0s !important;
}
.duration-0 {
  transition-duration: 0s;
}
.duration-200 {
  transition-duration: 200ms;
}
.duration-300 {
  transition-duration: 300ms;
}
.ease-\\[cubic-bezier\\(0\\.25\\2c 0\\.1\\2c 0\\.25\\2c 1\\)\\] {
  transition-timing-function: cubic-bezier(0.25,0.1,0.25,1);
}
.ease-in-out {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
.ease-out {
  transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
}
.will-change-transform {
  will-change: transform;
}
.animation-duration-300 {
  animation-duration: .3s;
}
.animation-delay-300 {
  animation-delay: .3s;
}
.\\[touch-action\\:none\\] {
  touch-action: none;
}

* {
  outline: none !important;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  /* WebKit (Chrome, Safari, Edge) specific scrollbar styles */
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    border-radius: 10px;
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.3);
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.4);
  }

  &::-webkit-scrollbar-corner {
    background: transparent;
  }
}

@-moz-document url-prefix() {
  * {
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.4) transparent;
    scrollbar-width: 6px;
  }
}

button:hover {
  background-image: none;
}

button {
  outline: 2px solid transparent;
  outline-offset: 2px;
  border-style: none;
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
  cursor: pointer;
}

input {
  outline: 2px solid transparent;
  outline-offset: 2px;
  border-style: none;
  background-color: transparent;
  background-image: none;
}

input::-moz-placeholder {
  font-size: 12px;
  line-height: 16px;
  font-style: italic;
  --tw-text-opacity: 1;
  color: rgb(115 115 115 / var(--tw-text-opacity, 1));
}

input::placeholder {
  font-size: 12px;
  line-height: 16px;
  font-style: italic;
  --tw-text-opacity: 1;
  color: rgb(115 115 115 / var(--tw-text-opacity, 1));
}

input:-moz-placeholder {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

input:placeholder-shown {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

svg {
  height: auto;
  width: auto;
  pointer-events: none;
}

/*
  Using CSS content with data attributes is more performant than:
  1. React re-renders with JSX text content
  2. Direct DOM manipulation methods:
     - element.textContent (creates/updates text nodes, triggers repaint)
     - element.innerText (triggers reflow by computing styles & layout)
     - element.innerHTML (heavy parsing, triggers reflow, security risks)
  3. Multiple data attributes with complex CSS concatenation

  This approach:
  - Avoids React reconciliation
  - Uses browser's native CSS engine (optimized content updates)
  - Minimizes main thread work
  - Reduces DOM operations
  - Avoids forced reflows (layout recalculation)
  - Only triggers necessary repaints
  - Keeps pseudo-element updates in render layer
*/
.with-data-text {
  overflow: hidden;
  &::before {
    content: attr(data-text);
  }
  &::before {
    display: block;
  }
  &::before {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

#react-scan-toolbar {
  position: fixed;
  left: 0px;
  top: 0px;
  display: flex;
  flex-direction: column;
  --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  font-family: Menlo, Consolas, Monaco, Liberation Mono, Lucida Console, monospace;
  font-size: 13px;
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity, 1));
  --tw-bg-opacity: 1;
  background-color: rgb(0 0 0 / var(--tw-bg-opacity, 1));
  -webkit-user-select: none;
     -moz-user-select: none;
          user-select: none;
  cursor: move;
  opacity: 0;
  z-index: 2147483678;
}

@keyframes fadeIn {

  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

#react-scan-toolbar {
  animation: fadeIn ease-in forwards;
  animation-duration: .3s;
  animation-delay: .3s;
  --tw-shadow: 0 4px 12px rgba(0,0,0,0.2);
  --tw-shadow-colored: 0 4px 12px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  place-self: start;

  will-change: transform;
  backface-visibility: hidden;
}

.button {
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  &:active {
    background: rgba(255, 255, 255, 0.15);
  }
}

.resize-line-wrapper {
  position: absolute;
  overflow: hidden;
}

.resize-line {
  position: absolute;
  inset: 0px;
  overflow: hidden;
  --tw-bg-opacity: 1;
  background-color: rgb(0 0 0 / var(--tw-bg-opacity, 1));
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;

  svg {
    position: absolute;
  }

  svg {
    top: 50%;
  }

  svg {
    left: 50%;
  }

  svg {
    --tw-translate-x: -50%;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }

  svg {
    --tw-translate-y: -50%;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }
}

.resize-right,
.resize-left {
  top: 0px;
  bottom: 0px;
  width: 24px;
  cursor: ew-resize;

  .resize-line-wrapper {
    top: 0px;
    bottom: 0px;
  }

  .resize-line-wrapper {
    width: 50%;
  }

  &:hover {
    .resize-line {
      --tw-translate-x: 0px;
      transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
    }
  }
}
.resize-right {
  right: 0px;
  --tw-translate-x: 50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));

  .resize-line-wrapper {
    right: 0px;
  }
  .resize-line {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }
  .resize-line {
    --tw-translate-x: -100%;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }
}

.resize-left {
  left: 0px;
  --tw-translate-x: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));

  .resize-line-wrapper {
    left: 0px;
  }
  .resize-line {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }
  .resize-line {
    --tw-translate-x: 100%;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }
}

.resize-top,
.resize-bottom {
  left: 0px;
  right: 0px;
  height: 24px;
  cursor: ns-resize;

  .resize-line-wrapper {
    left: 0px;
    right: 0px;
  }

  .resize-line-wrapper {
    height: 50%;
  }

  &:hover {
    .resize-line {
      --tw-translate-y: 0px;
      transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
    }
  }
}
.resize-top {
  top: 0px;
  --tw-translate-y: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));

  .resize-line-wrapper {
    top: 0px;
  }
  .resize-line {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
  .resize-line {
    --tw-translate-y: 100%;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }
}

.resize-bottom {
  bottom: 0px;
  --tw-translate-y: 50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));

  .resize-line-wrapper {
    bottom: 0px;
  }
  .resize-line {
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
  }
  .resize-line {
    --tw-translate-y: -100%;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }
}

.react-scan-header {
  display: flex;
  align-items: center;
  -moz-column-gap: 8px;
       column-gap: 8px;
  padding-left: 12px;
  padding-right: 8px;
  min-height: 36px;
  border-bottom-width: 1px;
  --tw-border-opacity: 1;
  border-color: rgb(34 34 34 / var(--tw-border-opacity, 1));
  overflow: hidden;
  white-space: nowrap;
}

.react-scan-replay-button,
.react-scan-close-button {
  display: flex;
  align-items: center;
  padding: 4px;
  min-width: -moz-fit-content;
  min-width: fit-content;
  border-radius: 4px;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

.react-scan-replay-button {
  position: relative;
  overflow: hidden;
  background-color: rgb(168 85 247 / 0.5) !important;

  &:hover {
    background-color: rgb(168 85 247 / 0.25);
  }

  &.disabled {
    opacity: 0.5;
  }

  &.disabled {
    pointer-events: none;
  }

  &:before {
    content: "";
  }

  &:before {
    position: absolute;
  }

  &:before {
    inset: 0px;
  }

  &:before {
    --tw-translate-x: -100%;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }

  &:before {
    animation: shimmer 2s infinite;
    background: linear-gradient(
      to right,
      transparent,
      rgba(142, 97, 227, 0.3),
      transparent
    );
  }
}

.react-scan-close-button {
  background-color: rgb(255 255 255 / 0.1);

  &:hover {
    background-color: rgb(255 255 255 / 0.15);
  }
}

@keyframes shimmer {
  100% {
    --tw-translate-x: 100%;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }
}

.react-section-header {
  position: sticky;
  z-index: 100;
  display: flex;
  align-items: center;
  -moz-column-gap: 8px;
       column-gap: 8px;
  padding-left: 12px;
  padding-right: 12px;
  height: 28px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  --tw-text-opacity: 1;
  color: rgb(136 136 136 / var(--tw-text-opacity, 1));
  border-bottom-width: 1px;
  --tw-border-opacity: 1;
  border-color: rgb(34 34 34 / var(--tw-border-opacity, 1));
  --tw-bg-opacity: 1;
  background-color: rgb(10 10 10 / var(--tw-bg-opacity, 1));
}

.react-scan-section {
  display: flex;
  flex-direction: column;
  padding-left: 8px;
  padding-right: 8px;
  --tw-text-opacity: 1;
  color: rgb(136 136 136 / var(--tw-text-opacity, 1));
}

.react-scan-section::before {
  --tw-text-opacity: 1;
  color: rgb(107 114 128 / var(--tw-text-opacity, 1));
  --tw-content: attr(data-section);
  content: var(--tw-content);
}

.react-scan-section {
  font-size: 12px;
  line-height: 16px;

  > .react-scan-property {
    margin-left: -14px;
  }
}

.react-scan-property {
  position: relative;
  display: flex;
  flex-direction: column;
  padding-left: 32px;
  border-left-width: 1px;
  border-color: transparent;
  overflow: hidden;
}

.react-scan-property-content {
  display: flex;
  flex: 1 1 0%;
  flex-direction: column;
  min-height: 28px;
  max-width: 100%;
  overflow: hidden;
}

.react-scan-string {
  color: #9ecbff;
}

.react-scan-number {
  color: #79c7ff;
}

.react-scan-boolean {
  color: #56b6c2;
}

.react-scan-key {
  width: -moz-fit-content;
  width: fit-content;
  max-width: 240px;
  white-space: nowrap;
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity, 1));
}

.react-scan-input {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity, 1));
  --tw-bg-opacity: 1;
  background-color: rgb(0 0 0 / var(--tw-bg-opacity, 1));
}

@keyframes blink {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

.react-scan-arrow {
  position: absolute;
  top: 0px;
  left: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  height: 28px;
  width: 24px;
  --tw-translate-x: -100%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  z-index: 10;

  > svg {
    transition-property: transform;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
  }
}

.react-scan-nested {
  position: relative;
  overflow: hidden;

  &:before {
    content: "";
  }

  &:before {
    position: absolute;
  }

  &:before {
    top: 0px;
  }

  &:before {
    left: 0px;
  }

  &:before {
    height: 100%;
  }

  &:before {
    width: 1px;
  }

  &:before {
    background-color: rgb(107 114 128 / 0.3);
  }
}

.react-scan-settings {
  position: absolute;
  inset: 0px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 16px;
  padding-right: 16px;
  --tw-text-opacity: 1;
  color: rgb(136 136 136 / var(--tw-text-opacity, 1));

  > div {
    display: flex;
  }

  > div {
    align-items: center;
  }

  > div {
    justify-content: space-between;
  }

  > div {
    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
  }

  > div {
    transition-duration: 300ms;
  }
}

.react-scan-preview-line {
  position: relative;
  display: flex;
  min-height: 28px;
  align-items: center;
  -moz-column-gap: 8px;
       column-gap: 8px;
}

.react-scan-flash-overlay {
  position: absolute;
  inset: 0px;
  opacity: 0;
  z-index: 50;
  pointer-events: none;
  transition-property: opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  mix-blend-mode: multiply;
  background-color: rgb(168 85 247 / 0.9);
}

.react-scan-toggle {
  position: relative;
  display: inline-flex;
  height: 24px;
  width: 40px;

  input {
    position: absolute;
  }

  input {
    inset: 0px;
  }

  input {
    z-index: 20;
  }

  input {
    opacity: 0;
  }

  input {
    cursor: pointer;
  }

  input {
    height: 100%;
  }

  input {
    width: 100%;
  }

  input:checked {
    + div {
      --tw-bg-opacity: 1;
      background-color: rgb(95 63 154 / var(--tw-bg-opacity, 1));
    }
    + div {

      &::before {
        --tw-translate-x: 100%;
        transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
      }

      &::before {
        left: auto;
      }

      &::before {
        --tw-border-opacity: 1;
        border-color: rgb(95 63 154 / var(--tw-border-opacity, 1));
      }
    }
  }

  > div {
    position: absolute;
  }

  > div {
    inset: 4px;
  }

  > div {
    --tw-bg-opacity: 1;
    background-color: rgb(64 64 64 / var(--tw-bg-opacity, 1));
  }

  > div {
    border-radius: 9999px;
  }

  > div {
    pointer-events: none;
  }

  > div {
    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
  }

  > div {
    transition-duration: 300ms;
  }

  > div {

    &:before {
      --tw-content: '';
      content: var(--tw-content);
    }

    &:before {
      position: absolute;
    }

    &:before {
      top: 50%;
    }

    &:before {
      left: 0px;
    }

    &:before {
      --tw-translate-y: -50%;
      transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
    }

    &:before {
      height: 16px;
    }

    &:before {
      width: 16px;
    }

    &:before {
      --tw-bg-opacity: 1;
      background-color: rgb(255 255 255 / var(--tw-bg-opacity, 1));
    }

    &:before {
      border-width: 2px;
    }

    &:before {
      --tw-border-opacity: 1;
      border-color: rgb(64 64 64 / var(--tw-border-opacity, 1));
    }

    &:before {
      border-radius: 9999px;
    }

    &:before {
      --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
      --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);
      box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
    }

    &:before {
      transition-property: all;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transition-duration: 150ms;
    }

    &:before {
      transition-duration: 300ms;
    }
  }
}

.react-scan-flash-active {
  opacity: 0.4;
  transition-property: opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

.react-scan-inspector-overlay {
  display: flex;
  flex-direction: column;
  opacity: 0;
  transition-property: opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
  transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
  will-change: opacity;

  &.fade-out {
    opacity: 0;
  }

  &.fade-in {
    opacity: 1;
  }
}

.react-scan-what-changed {
  ul {
    list-style-type: disc;
  }
  ul {
    padding-left: 16px;
  }

  li {
    white-space: nowrap;
  }

  li {
    > div {
      display: flex;
    }
    > div {
      align-items: center;
    }
    > div {
      justify-content: space-between;
    }
    > div {
      -moz-column-gap: 8px;
           column-gap: 8px;
    }
  }
}

.count-badge {
  display: flex;
  align-items: center;
  -moz-column-gap: 8px;
       column-gap: 8px;
  padding-left: 6px;
  padding-right: 6px;
  padding-top: 2px;
  padding-bottom: 2px;
  border-radius: 4px;
  font-size: 12px;
  line-height: 16px;
  font-weight: 500;
  --tw-numeric-spacing: tabular-nums;
  font-variant-numeric: var(--tw-ordinal) var(--tw-slashed-zero) var(--tw-numeric-figure) var(--tw-numeric-spacing) var(--tw-numeric-fraction);
  --tw-text-opacity: 1;
  color: rgb(168 85 247 / var(--tw-text-opacity, 1));
  background-color: rgb(168 85 247 / 0.1);
  transform-origin: center;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: 150ms;
  transition-duration: 300ms;
}

@keyframes countFlash {

  0% {
    background-color: rgba(168, 85, 247, 0.3);
    transform: scale(1.05);
  }

  100% {
    background-color: rgba(168, 85, 247, 0.1);
    transform: scale(1);
  }
}

.count-flash {
  animation: countFlash .3s ease-out forwards;
}

@keyframes countFlashShake {

  0% {
    transform: translateX(0);
  }

  25% {
    transform: translateX(-5px);
  }

  50% {
    transform: translateX(5px) scale(1.1);
  }

  75% {
    transform: translateX(-5px);
  }

  100% {
    transform: translateX(0);
  }
}

.count-flash-white {
  animation: countFlashShake .3s ease-out forwards;
  transition-delay: 500ms !important;
}

.change-scope {
  display: flex;
  align-items: center;
  -moz-column-gap: 4px;
       column-gap: 4px;
  --tw-text-opacity: 1;
  color: rgb(102 102 102 / var(--tw-text-opacity, 1));
  font-size: 12px;
  line-height: 16px;
  font-family: Menlo, Consolas, Monaco, Liberation Mono, Lucida Console, monospace;

  > div {
    padding-left: 6px;
    padding-right: 6px;
  }

  > div {
    padding-top: 2px;
    padding-bottom: 2px;
  }

  > div {
    border-radius: 4px;
  }

  > div {
    font-size: 12px;
    line-height: 16px;
  }

  > div {
    font-weight: 500;
  }

  > div {
    --tw-numeric-spacing: tabular-nums;
    font-variant-numeric: var(--tw-ordinal) var(--tw-slashed-zero) var(--tw-numeric-figure) var(--tw-numeric-spacing) var(--tw-numeric-fraction);
  }

  > div {
    transform-origin: center;
  }

  > div {
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
  }

  > div {
    transition-delay: 150ms;
  }

  > div {
    transition-duration: 300ms;
  }

  > div {

    &[data-flash="true"] {
      background-color: rgb(168 85 247 / 0.1);
    }

    &[data-flash="true"] {
      --tw-text-opacity: 1;
      color: rgb(168 85 247 / var(--tw-text-opacity, 1));
    }
  }
}

.react-scan-slider {
  position: relative;
  min-height: 24px;

  > input {
    position: absolute;
  }

  > input {
    inset: 0px;
  }

  > input {
    opacity: 0;
  }

  &:before {
    --tw-content: '';
    content: var(--tw-content);
  }

  &:before {
    position: absolute;
  }

  &:before {
    left: 0px;
    right: 0px;
  }

  &:before {
    top: 50%;
  }

  &:before {
    --tw-translate-y: -50%;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }

  &:before {
    height: 6px;
  }

  &:before {
    background-color: rgb(142 97 227 / 0.4);
  }

  &:before {
    border-radius: 8px;
  }

  &:before {
    pointer-events: none;
  }

  &:after {
    --tw-content: '';
    content: var(--tw-content);
  }

  &:after {
    position: absolute;
  }

  &:after {
    left: 0px;
    right: 0px;
  }

  &:after {
    top: -8px;
    bottom: -8px;
  }

  &:after {
    z-index: -10;
  }

  span {
    position: absolute;
  }

  span {
    left: 0px;
  }

  span {
    top: 50%;
  }

  span {
    --tw-translate-y: -50%;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }

  span {
    height: 10px;
  }

  span {
    width: 10px;
  }

  span {
    border-radius: 8px;
  }

  span {
    --tw-bg-opacity: 1;
    background-color: rgb(142 97 227 / var(--tw-bg-opacity, 1));
  }

  span {
    pointer-events: none;
  }

  span {
    transition-property: transform;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
  }

  span {
    transition-duration: 75ms;
  }
}

.resize-v-line {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 4px;
  max-width: 4px;
  height: 100%;
  width: 100%;
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;

  &:hover,
  &:active {
    > span {
      --tw-bg-opacity: 1;
      background-color: rgb(34 34 34 / var(--tw-bg-opacity, 1));
    }

    svg {
      opacity: 1;
    }
  }

  &::before {
    --tw-content: "";
    content: var(--tw-content);
  }

  &::before {
    position: absolute;
  }

  &::before {
    inset: 0px;
  }

  &::before {
    left: 50%;
  }

  &::before {
    --tw-translate-x: -50%;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }

  &::before {
    width: 1px;
  }

  &::before {
    --tw-bg-opacity: 1;
    background-color: rgb(34 34 34 / var(--tw-bg-opacity, 1));
  }

  &::before {
    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
  }

  > span {
    position: absolute;
  }

  > span {
    left: 50%;
  }

  > span {
    top: 50%;
  }

  > span {
    --tw-translate-x: -50%;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }

  > span {
    --tw-translate-y: -50%;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }

  > span {
    height: 18px;
  }

  > span {
    width: 6px;
  }

  > span {
    border-radius: 4px;
  }

  > span {
    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
  }

  svg {
    position: absolute;
  }

  svg {
    left: 50%;
  }

  svg {
    top: 50%;
  }

  svg {
    --tw-translate-x: -50%;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }

  svg {
    --tw-translate-y: -50%;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }

  svg {
    --tw-rotate: 90deg;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }

  svg {
    --tw-text-opacity: 1;
    color: rgb(163 163 163 / var(--tw-text-opacity, 1));
  }

  svg {
    opacity: 0;
  }

  svg {
    transition-property: opacity;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
  }

  svg {
    z-index: 50;
  }
}

.tree-node-search-highlight {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  span {
    padding-top: 1px;
    padding-bottom: 1px;
  }

  span {
    border-radius: 2px;
  }

  span {
    --tw-bg-opacity: 1;
    background-color: rgb(253 224 71 / var(--tw-bg-opacity, 1));
  }

  span {
    font-weight: 500;
  }

  span {
    --tw-text-opacity: 1;
    color: rgb(0 0 0 / var(--tw-text-opacity, 1));
  }

  .single {
    margin-right: 1px;
  }

  .single {
    padding-left: 2px;
    padding-right: 2px;
  }

  .regex {
    padding-left: 2px;
    padding-right: 2px;
  }

  .start {
    margin-left: 1px;
  }

  .start {
    border-top-left-radius: 2px;
    border-bottom-left-radius: 2px;
  }

  .end {
    margin-right: 1px;
  }

  .end {
    border-top-right-radius: 2px;
    border-bottom-right-radius: 2px;
  }

  .middle {
    margin-left: 1px;
    margin-right: 1px;
  }

  .middle {
    border-radius: 2px;
  }
}

.react-scan-toolbar-notification {
  position: absolute;
  left: 0px;
  right: 0px;
  display: flex;
  align-items: center;
  -moz-column-gap: 8px;
       column-gap: 8px;
  padding: 4px;
  padding-left: 8px;
  font-size: 10px;
  --tw-text-opacity: 1;
  color: rgb(212 212 212 / var(--tw-text-opacity, 1));
  background-color: rgb(0 0 0 / 0.9);
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;

  &:before {
    --tw-content: '';
    content: var(--tw-content);
  }

  &:before {
    position: absolute;
  }

  &:before {
    left: 0px;
    right: 0px;
  }

  &:before {
    --tw-bg-opacity: 1;
    background-color: rgb(0 0 0 / var(--tw-bg-opacity, 1));
  }

  &:before {
    height: 8px;
  }

  &.position-top {
    top: 100%;
  }

  &.position-top {
    --tw-translate-y: -100%;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }

  &.position-top {
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
  }

  &.position-top {

    &::before {
      top: 0px;
    }

    &::before {
      --tw-translate-y: -100%;
      transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
    }
  }

  &.position-bottom {
    bottom: 100%;
  }

  &.position-bottom {
    --tw-translate-y: 100%;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }

  &.position-bottom {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  &.position-bottom {

    &::before {
      bottom: 0px;
    }

    &::before {
      --tw-translate-y: 100%;
      transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
    }
  }

  &.is-open {
    --tw-translate-y: 0px;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }
}

.react-scan-header-item {
  position: absolute;
  inset: 0px;
  --tw-translate-y: -200%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;

  &.is-visible {
    --tw-translate-y: 0px;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }
}

.react-scan-components-tree:has(.resize-v-line:hover, .resize-v-line:active)
  .tree {
  overflow: hidden;
}

.react-scan-expandable {
  display: grid;
  grid-template-rows: 0fr;
  overflow: hidden;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 75ms;
  transition-timing-function: ease-out;

  > * {
    min-height: 0;
  }

  &.react-scan-expanded {
    grid-template-rows: 1fr;
    transition-duration: 100ms;
  }
}

.after\\:absolute::after {
  content: var(--tw-content);
  position: absolute;
}

.after\\:inset-0::after {
  content: var(--tw-content);
  inset: 0px;
}

.after\\:left-1\\/2::after {
  content: var(--tw-content);
  left: 50%;
}

.after\\:top-\\[100\\%\\]::after {
  content: var(--tw-content);
  top: 100%;
}

.after\\:h-\\[6px\\]::after {
  content: var(--tw-content);
  height: 6px;
}

.after\\:w-\\[10px\\]::after {
  content: var(--tw-content);
  width: 10px;
}

.after\\:-translate-x-1\\/2::after {
  content: var(--tw-content);
  --tw-translate-x: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

@keyframes fadeOut {

  0% {
    content: var(--tw-content);
    opacity: 1;
  }

  100% {
    content: var(--tw-content);
    opacity: 0;
  }
}

.after\\:animate-\\[fadeOut_1s_ease-out_forwards\\]::after {
  content: var(--tw-content);
  animation: fadeOut 1s ease-out forwards;
}

.after\\:border-l-\\[5px\\]::after {
  content: var(--tw-content);
  border-left-width: 5px;
}

.after\\:border-r-\\[5px\\]::after {
  content: var(--tw-content);
  border-right-width: 5px;
}

.after\\:border-t-\\[6px\\]::after {
  content: var(--tw-content);
  border-top-width: 6px;
}

.after\\:border-l-transparent::after {
  content: var(--tw-content);
  border-left-color: transparent;
}

.after\\:border-r-transparent::after {
  content: var(--tw-content);
  border-right-color: transparent;
}

.after\\:border-t-white::after {
  content: var(--tw-content);
  --tw-border-opacity: 1;
  border-top-color: rgb(255 255 255 / var(--tw-border-opacity, 1));
}

.after\\:bg-purple-500\\/30::after {
  content: var(--tw-content);
  background-color: rgb(168 85 247 / 0.3);
}

.after\\:content-\\[\\"\\"\\]::after {
  --tw-content: "";
  content: var(--tw-content);
}

.focus-within\\:border-\\[\\#454545\\]:focus-within {
  --tw-border-opacity: 1;
  border-color: rgb(69 69 69 / var(--tw-border-opacity, 1));
}

.hover\\:bg-\\[\\#0f0f0f\\]:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(15 15 15 / var(--tw-bg-opacity, 1));
}

.hover\\:bg-\\[\\#18181B\\]:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(24 24 27 / var(--tw-bg-opacity, 1));
}

.hover\\:bg-\\[\\#34343b\\]:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(52 52 59 / var(--tw-bg-opacity, 1));
}

.hover\\:bg-\\[\\#5f3f9a\\]\\/20:hover {
  background-color: rgb(95 63 154 / 0.2);
}

.hover\\:bg-\\[\\#5f3f9a\\]\\/40:hover {
  background-color: rgb(95 63 154 / 0.4);
}

.hover\\:bg-red-600:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(220 38 38 / var(--tw-bg-opacity, 1));
}

.hover\\:bg-zinc-700:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(63 63 70 / var(--tw-bg-opacity, 1));
}

.hover\\:bg-zinc-800\\/50:hover {
  background-color: rgb(39 39 42 / 0.5);
}

.hover\\:text-neutral-300:hover {
  --tw-text-opacity: 1;
  color: rgb(212 212 212 / var(--tw-text-opacity, 1));
}

.hover\\:text-white:hover {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity, 1));
}

.group:hover .group-hover\\:bg-\\[\\#21437982\\] {
  background-color: #21437982;
}

.group:hover .group-hover\\:bg-\\[\\#5b2d89\\] {
  --tw-bg-opacity: 1;
  background-color: rgb(91 45 137 / var(--tw-bg-opacity, 1));
}

.group:hover .group-hover\\:bg-\\[\\#6a6a6a\\] {
  --tw-bg-opacity: 1;
  background-color: rgb(106 106 106 / var(--tw-bg-opacity, 1));
}

.group:hover .group-hover\\:bg-\\[\\#efda1a2f\\] {
  background-color: #efda1a2f;
}

.group:hover .group-hover\\:opacity-100 {
  opacity: 1;
}

.peer\\/bottom:hover ~ .peer-hover\\/bottom\\:rounded-b-none {
  border-bottom-right-radius: 0px;
  border-bottom-left-radius: 0px;
}

.peer\\/left:hover ~ .peer-hover\\/left\\:rounded-l-none {
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
}

.peer\\/right:hover ~ .peer-hover\\/right\\:rounded-r-none {
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
}

.peer\\/top:hover ~ .peer-hover\\/top\\:rounded-t-none {
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
}
`,Go=(e,t,n=t)=>{let[r,i]=A(e);return j(()=>{if(e===r)return;let a=e?t:n,o=setTimeout(()=>i(e),a);return()=>clearTimeout(o)},[e,t,n]),r},Ko=bt(()=>U(`absolute inset-0 flex items-center gap-x-2`,`translate-y-0`,`transition-transform duration-300`,Or.value&&`-translate-y-[200%]`)),qo=()=>{let e=M(null),t=M(null),[n,r]=A(null);return Mt(()=>{let e=Q.inspectState.value;e.kind===`focused`&&r(e.fiber)}),Mt(()=>{let n=Hr.value;st(()=>{if(Q.inspectState.value.kind!==`focused`||!e.current||!t.current)return;let{totalUpdates:r,currentIndex:i,updates:a,isVisible:o,windowOffset:s}=n,c=Math.max(0,r-1),l=o?`#${s+i} Re-render`:c>0?`\xD7${c}`:``,u;if(c>0&&i>=0&&i<a.length){let e=a[i]?.fiberInfo?.selfTime;u=e>0?e<.1-2**-52?`< 0.1ms`:`${Number(e.toFixed(1))}ms`:void 0}e.current.dataset.text=l?` \u2022 ${l}`:``,t.current.dataset.text=u?` \u2022 ${u}`:``})}),L(`div`,{className:Ko,children:[Xe(()=>{if(!n)return null;let{name:e,wrappers:t,wrapperTypes:r}=Dr(n),i=t.length?`${t.join(`(`)}(${e})${`)`.repeat(t.length)}`:e??``,a=r[0];return L(`span`,{title:i,className:`flex items-center gap-x-1`,children:[e??`Unknown`,L(`span`,{title:a?.title,className:`flex items-center gap-x-1 text-[10px] text-purple-400`,children:!!a&&L(D,{children:[L(`span`,{className:U(`rounded py-[1px] px-1`,`truncate`,a.compiler&&`bg-purple-800 text-neutral-400`,!a.compiler&&`bg-neutral-700 text-neutral-300`,a.type===`memo`&&`bg-[#5f3f9a] text-white`),children:a.type},a.type),a.compiler&&L(`span`,{className:`text-yellow-300`,children:`✨`})]})}),r.length>1&&L(`span`,{className:`text-[10px] text-neutral-400`,children:[`×`,r.length-1]})]})},[n]),L(`div`,{className:`flex items-center gap-x-2 mr-auto text-xs text-[#888]`,children:[L(`span`,{ref:e,className:`with-data-text cursor-pointer !overflow-visible`,title:`Click to toggle between rerenders and total renders`}),L(`span`,{ref:t,className:`with-data-text !overflow-visible`})]})]})},Jo=()=>{let e=Go(Q.inspectState.value.kind===`focused`,150,0),t=()=>{G.value={view:`none`},Q.inspectState.value={kind:`inspect-off`}};if(G.value.view!==`notifications`)return L(`div`,{className:`react-scan-header`,children:[L(`div`,{className:`relative flex-1 h-full`,children:L(`div`,{className:U(`react-scan-header-item is-visible`,!e&&`!duration-0`),children:L(qo,{})})}),L(`button`,{type:`button`,title:`Close`,className:`react-scan-close-button`,onClick:t,children:L(R,{name:`icon-close`})})]})},Yo=({className:e,...t})=>L(`div`,{className:U(`react-scan-toggle`,e),children:[L(`input`,{type:`checkbox`,...t}),L(`div`,{})]}),Xo=({fps:e})=>L(`div`,{className:U(`flex items-center gap-x-1 px-2 w-full`,`h-6`,`rounded-md`,`font-mono leading-none`,`bg-[#141414]`,`ring-1 ring-white/[0.08]`),children:[L(`div`,{style:{color:(e=>e<30?`#EF4444`:e<50?`#F59E0B`:`rgb(214,132,245)`)(e)},className:`text-sm font-semibold tracking-wide transition-colors ease-in-out w-full flex justify-center items-center`,children:e}),L(`span`,{className:`text-white/30 text-[11px] font-medium tracking-wide ml-auto min-w-fit`,children:`FPS`})]}),Zo=()=>{let[e,t]=A(null);return j(()=>{let e=setInterval(()=>{t(Ta())},200);return()=>clearInterval(e)},[]),L(`div`,{className:U(`flex items-center justify-end gap-x-2 px-1 ml-1 w-[72px]`,`whitespace-nowrap text-sm text-white`),children:e===null?L(D,{children:`️`}):L(Xo,{fps:e})})},Qo=!1,$o=e=>{if(Qo)throw Error(e)},es=e=>e(),q=class e extends Array{constructor(e=25){super(),this.capacity=e}push(...e){let t=super.push(...e);for(;this.length>this.capacity;)this.shift();return t}static fromArray(t,n){let r=new e(n);return r.push(...t),r}},ts=class{constructor(e){this.subscribers=new Set,this.currentValue=e}subscribe(e){return this.subscribers.add(e),e(this.currentValue),()=>{this.subscribers.delete(e)}}setState(e){this.currentValue=e,this.subscribers.forEach(t=>t(e))}getCurrentState(){return this.currentValue}},ns=150,rs=new ts(new q(ns)),is=50,as=new class{constructor(){this.channels={}}publish(e,t,n=!0){let r=this.channels[t];if(!r){if(!n)return;this.channels[t]={callbacks:new q(is),state:new q(is)},this.channels[t].state.push(e);return}r.state.push(e),r.callbacks.forEach(t=>t(e))}getAvailableChannels(){return q.fromArray(Object.keys(this.channels),is)}subscribe(e,t,n=!1){let r=()=>(n||this.channels[e].state.forEach(e=>{t(e)}),()=>{let n=this.channels[e].callbacks.filter(e=>e!==t);this.channels[e].callbacks=q.fromArray(n,is)}),i=this.channels[e];return i?(i.callbacks.push(t),r()):(this.channels[e]={callbacks:new q(is),state:new q(is)},this.channels[e].callbacks.push(t),r())}updateChannelState(e,t,n=!0){let r=this.channels[e];if(!r){if(!n)return;let r=new q(is),i={callbacks:new q(is),state:r};this.channels[e]=i,i.state=t(r);return}r.state=t(r.state)}getChannelState(e){return this.channels[e].state??new q(is)}},os={skipProviders:!0,skipHocs:!0,skipContainers:!0,skipMinified:!0,skipUtilities:!0,skipBoundaries:!0},ss={providers:[/Provider$/,/^Provider$/,/^Context$/],hocs:[/^with[A-Z]/,/^forward(?:Ref)?$/i,/^Forward(?:Ref)?\(/],containers:[/^(?:App)?Container$/,/^Root$/,/^ReactDev/],utilities:[/^Fragment$/,/^Suspense$/,/^ErrorBoundary$/,/^Portal$/,/^Consumer$/,/^Layout$/,/^Router/,/^Hydration/],boundaries:[/^Boundary$/,/Boundary$/,/^Provider$/,/Provider$/]},cs=(e,t=os)=>{let n=[];return t.skipProviders&&n.push(...ss.providers),t.skipHocs&&n.push(...ss.hocs),t.skipContainers&&n.push(...ss.containers),t.skipUtilities&&n.push(...ss.utilities),t.skipBoundaries&&n.push(...ss.boundaries),!n.some(t=>t.test(e))},ls=[/^[a-z]$/,/^[a-z][0-9]$/,/^_+$/,/^[A-Za-z][_$]$/,/^[a-z]{1,2}$/],us=e=>{for(let t=0;t<ls.length;t++)if(ls[t].test(e))return!0;let t=!/[aeiou]/i.test(e),n=(e.match(/\d/g)?.length??0)>e.length/2,r=/^[a-z]+$/.test(e),i=/[$_]{2,}/.test(e);return Number(t)+Number(n)+Number(r)+Number(i)>=2},ds=e=>{let t=l(e);return t?t.replace(/^(?:Memo|Forward(?:Ref)?|With.*?)\((?<inner>.*?)\)$/,`$<inner>`):``},fs=(e,t=os)=>{if(!e||!l(e.type))return[];let n=[],r=e;for(;r.return;){let e=ds(r.type);e&&!us(e)&&cs(e,t)&&e.toLowerCase()!==e&&n.push(e),r=r.return}let i=Array(n.length);for(let e=0;e<n.length;e++)i[e]=n[n.length-e-1];return i},ps=(e,t=()=>!0)=>{let n=e;for(;n;){let e=l(n.type);if(e&&t(e))return e;n=n.return}return null},ms,hs=`never-hidden`,gs=()=>{ms?.();let e=()=>{document.hidden&&(hs=Date.now())};document.addEventListener(`visibilitychange`,e),ms=()=>{document.removeEventListener(`visibilitychange`,e)}},_s=e=>[`pointerup`,`click`].includes(e)?`pointer`:(e.includes(`key`),[`keydown`,`keyup`].includes(e)?`keyboard`:null),vs=null,ys=e=>{gs();let t=new Map,n=new Map,r=r=>{if(!r.interactionId)return;if(r.interactionId&&r.target&&!n.has(r.interactionId)&&n.set(r.interactionId,r.target),r.target){let e=r.target;for(;e;){if(e.id===`react-scan-toolbar-root`||e.id===`react-scan-root`)return;e=e.parentElement}}let i=t.get(r.interactionId);if(i)r.duration>i.latency?(i.entries=[r],i.latency=r.duration):r.duration===i.latency&&r.startTime===i.entries[0].startTime&&i.entries.push(r);else{let n=_s(r.name);if(!n)return;let i={id:r.interactionId,latency:r.duration,entries:[r],target:r.target,type:n,startTime:r.startTime,endTime:Date.now(),processingStart:r.processingStart,processingEnd:r.processingEnd,duration:r.duration,inputDelay:r.processingStart-r.startTime,processingDuration:r.processingEnd-r.processingStart,presentationDelay:r.duration-(r.processingEnd-r.startTime),timestamp:Date.now(),timeSinceTabInactive:hs===`never-hidden`?`never-hidden`:Date.now()-hs,visibilityState:document.visibilityState,timeOrigin:performance.timeOrigin,referrer:document.referrer};t.set(i.id,i),vs||=requestAnimationFrame(()=>{requestAnimationFrame(()=>{e(t.get(i.id)),vs=null})})}},i=new PerformanceObserver(e=>{let t=e.getEntries();for(let e=0,n=t.length;e<n;e++){let n=t[e];r(n)}});try{i.observe({type:`event`,buffered:!0,durationThreshold:16}),i.observe({type:`first-input`,buffered:!0})}catch{}return()=>i.disconnect()},bs=()=>ys(e=>{as.publish({kind:`entry-received`,entry:e},`recording`)}),xs=25,Ss=new q(xs),Cs=(e,t)=>{let n=null;for(let r of t){if(r.type!==e.type)continue;if(n===null){n=r;continue}let t=(e,t)=>Math.abs(e.startDateTime)-(t.startTime+t.timeOrigin);t(r,e)<t(n,e)&&(n=r)}return n},ws=e=>as.subscribe(`recording`,t=>{let n=t.kind===`auto-complete-race`?Ss.find(e=>e.interactionUUID===t.interactionUUID):Cs(t.entry,Ss);n&&e(n.completeInteraction(t))}),Ts=({onMicroTask:e,onRAF:t,onTimeout:n,abort:r})=>{queueMicrotask(()=>{r?.()!==!0&&e()&&requestAnimationFrame(()=>{r?.()!==!0&&t()&&setTimeout(()=>{r?.()!==!0&&n()},0)})})},Es=e=>{let t=Pi(e);if(!t)return;let n=t?l(t?.type):`N/A`;if(n||=ps(t,e=>e.length>2)??`N/A`,n)return{componentPath:fs(t),childrenTree:{},componentName:n,elementFiber:t}},Ds=(e,t)=>{let n=null,r=t=>{switch(e){case`pointer`:return t.phase===`start`?`pointerup`:t.target instanceof HTMLInputElement||t.target instanceof HTMLSelectElement?`change`:`click`;case`keyboard`:return t.phase===`start`?`keydown`:`change`}},i={current:{kind:`uninitialized-stage`,interactionUUID:yn(),stageStart:Date.now(),interactionType:e}},a=n=>{if(n.composedPath().some(e=>e instanceof Element&&e.id===`react-scan-toolbar-root`)||(Date.now()-i.current.stageStart>2e3&&(i.current={kind:`uninitialized-stage`,interactionUUID:yn(),stageStart:Date.now(),interactionType:e}),i.current.kind!==`uninitialized-stage`))return;let a=performance.now();t?.onStart?.(i.current.interactionUUID);let s=Es(n.target);if(!s){t?.onError?.(i.current.interactionUUID);return}let c={},l=As(c);i.current={...i.current,interactionType:e,blockingTimeStart:Date.now(),childrenTree:s.childrenTree,componentName:s.componentName,componentPath:s.componentPath,fiberRenders:c,kind:`interaction-start`,interactionStartDetail:a,stopListeningForRenders:l};let u=r({phase:`end`,target:n.target});document.addEventListener(u,o,{once:!0}),requestAnimationFrame(()=>{document.removeEventListener(u,o)})};document.addEventListener(r({phase:`start`}),a,{capture:!0});let o=(r,a,o)=>{if(i.current.kind!==`interaction-start`&&a===n){if(e===`pointer`&&r.target instanceof HTMLSelectElement){i.current={kind:`uninitialized-stage`,interactionUUID:yn(),stageStart:Date.now(),interactionType:e};return}t?.onError?.(i.current.interactionUUID),i.current={kind:`uninitialized-stage`,interactionUUID:yn(),stageStart:Date.now(),interactionType:e},$o(`pointer -> click`);return}n=a,Ts({abort:o,onMicroTask:()=>i.current.kind===`uninitialized-stage`?!1:(i.current={...i.current,kind:`js-end-stage`,jsEndDetail:performance.now()},!0),onRAF:()=>i.current.kind!==`js-end-stage`&&i.current.kind!==`raf-stage`?(t?.onError?.(i.current.interactionUUID),$o(`bad transition to raf`),i.current={kind:`uninitialized-stage`,interactionUUID:yn(),stageStart:Date.now(),interactionType:e},!1):(i.current={...i.current,kind:`raf-stage`,rafStart:performance.now()},!0),onTimeout:()=>{if(i.current.kind!==`raf-stage`){t?.onError?.(i.current.interactionUUID),i.current={kind:`uninitialized-stage`,interactionUUID:yn(),stageStart:Date.now(),interactionType:e},$o(`raf->timeout`);return}let n=Date.now(),r=Object.freeze({...i.current,kind:`timeout-stage`,blockingTimeEnd:n,commitEnd:performance.now()});i.current={kind:`uninitialized-stage`,interactionUUID:yn(),stageStart:n,interactionType:e};let a=!1,o=e=>{a=!0;let n={detailedTiming:r,latency:e.kind===`auto-complete-race`?e.detailedTiming.commitEnd-e.detailedTiming.interactionStartDetail:e.entry.latency,completedAt:Date.now(),flushNeeded:!0};t?.onComplete?.(r.interactionUUID,n,e);let i=Ss.filter(e=>e.interactionUUID!==r.interactionUUID);return Ss=q.fromArray(i,xs),n},s={completeInteraction:o,endDateTime:Date.now(),startDateTime:r.blockingTimeStart,type:e,interactionUUID:r.interactionUUID};if(Ss.push(s),ks())setTimeout(()=>{if(a)return;o({kind:`auto-complete-race`,detailedTiming:r,interactionUUID:r.interactionUUID});let e=Ss.filter(e=>e.interactionUUID!==r.interactionUUID);Ss=q.fromArray(e,xs)},1e3);else{let e=Ss.filter(e=>e.interactionUUID!==r.interactionUUID);Ss=q.fromArray(e,xs),o({kind:`auto-complete-race`,detailedTiming:r,interactionUUID:r.interactionUUID})}}})},s=e=>{let t=yn();o(e,t,()=>t!==n)};return e===`keyboard`&&document.addEventListener(`keypress`,s),()=>{document.removeEventListener(r({phase:`start`}),a,{capture:!0}),document.removeEventListener(`keypress`,s)}},Os=e=>f(e,e=>{if(u(e))return!0})?.stateNode,ks=()=>`PerformanceEventTiming`in globalThis,As=e=>{let t=t=>{let n=l(t.type);if(!n)return;let r=e[n];if(!r){let r=new Set,i=t.return&&Li(t.return),a=i&&l(i[0]);a&&r.add(a);let{selfTime:o,totalTime:s}=c(t),u=va(t),d={current:[],changes:new Set,changesCounts:new Map},f={fiberProps:u.fiberProps||d,fiberState:u.fiberState||d,fiberContext:u.fiberContext||d};e[n]={renderCount:1,hasMemoCache:p(t),wasFiberRenderMount:Ms(t),parents:r,selfTime:o,totalTime:s,nodeInfo:[{element:Os(t),name:l(t.type)??`Unknown`,selfTime:c(t).selfTime}],changes:f};return}if(Li(t)?.[0]?.type){let e=t.return&&Li(t.return),n=e&&l(e[0]);n&&r.parents.add(n)}let{selfTime:i,totalTime:a}=c(t),o=va(t);if(!o)return;let s={current:[],changes:new Set,changesCounts:new Map};r.wasFiberRenderMount=r.wasFiberRenderMount||Ms(t),r.hasMemoCache=r.hasMemoCache||p(t),r.changes={fiberProps:js(r.changes?.fiberProps||s,o.fiberProps||s),fiberState:js(r.changes?.fiberState||s,o.fiberState||s),fiberContext:js(r.changes?.fiberContext||s,o.fiberContext||s)},r.renderCount+=1,r.selfTime+=i,r.totalTime+=a,r.nodeInfo.push({element:Os(t),name:l(t.type)??`Unknown`,selfTime:c(t).selfTime})};return Q.interactionListeningForRenders=t,()=>{Q.interactionListeningForRenders===t&&(Q.interactionListeningForRenders=null)}},js=(e,t)=>{let n={current:[...e.current],changes:new Set,changesCounts:new Map};for(let e of t.current)n.current.some(t=>t.name===e.name)||n.current.push(e);for(let r of t.changes)if(typeof r==`string`||typeof r==`number`){n.changes.add(r);let i=e.changesCounts.get(r)||0,a=t.changesCounts.get(r)||0;n.changesCounts.set(r,i+a)}return n},Ms=e=>{if(!e.alternate)return!0;let t=e.alternate,n=t&&t.memoizedState!=null&&t.memoizedState.element!=null&&t.memoizedState.isDehydrated!==!0,r=e.memoizedState!=null&&e.memoizedState.element!=null&&e.memoizedState.isDehydrated!==!0;return!n&&r},Ns=e=>{let t,n=new Set,r=(e,r)=>{let i=typeof e==`function`?e(t):e;if(!Object.is(i,t)){let e=t;t=r??(typeof i!=`object`||!i)?i:Object.assign({},t,i),n.forEach(n=>n(t,e))}},i=()=>t,a={setState:r,getState:i,getInitialState:()=>o,subscribe:(e,r)=>{let i,a;r?(i=e,a=r):a=e;let o=i?i(t):void 0,s=(e,t)=>{if(i){let n=i(e),r=i(t);Object.is(o,n)||(o=n,a(n,r))}else a(e,t)};return n.add(s),()=>n.delete(s)}},o=t=e(r,i,a);return a},Ps=e=>e?Ns(e):Ns,Fs=null;Ps()(e=>({state:{events:[]},actions:{addEvent:t=>{e(e=>({state:{events:[...e.state.events,t]}}))},clear:()=>{e({state:{events:[]}})}}}));var Is=200,Ls=Ps()((e,t)=>{let n=new Set;return{state:{events:new q(Is)},actions:{addEvent:r=>{n.forEach(e=>e(r));let i=[...t().state.events,r],a=(e,t)=>{let n=i.find(t=>{if(t.kind!==`long-render`&&t.id!==e.id&&(e.data.startAt<=t.data.startAt&&e.data.endAt<=t.data.endAt&&e.data.endAt>=t.data.startAt||t.data.startAt<=e.data.startAt&&t.data.endAt>=e.data.startAt||e.data.startAt<=t.data.startAt&&e.data.endAt>=t.data.endAt))return!0});n&&t(n)},o=new Set;i.forEach(e=>{e.kind!==`interaction`&&a(e,()=>{o.add(e.id)})});let s=i.filter(e=>!o.has(e.id));e(()=>({state:{events:q.fromArray(s,Is)}}))},addListener:e=>(n.add(e),()=>{n.delete(e)}),clear:()=>{e({state:{events:new q(Is)}})}}}}),Rs=()=>Ft(Ls.subscribe,Ls.getState),zs=null,Bs=null,Vs=null,Hs,Us=()=>{let e=e=>{Hs=e.composedPath().map(e=>e.id).filter(Boolean).includes(`react-scan-toolbar`)};return document.addEventListener(`mouseover`,e),Vs=e,()=>{Vs&&document.removeEventListener(`mouseover`,Vs)}},Ws=()=>{let e=()=>{zs=performance.now(),Bs=performance.timeOrigin};return document.addEventListener(`visibilitychange`,e),()=>{document.removeEventListener(`visibilitychange`,e)}},Gs=150,Ks=[];function qs(){let e,t;function n(){let r=null;Fs=null,Fs={},r=As(Fs);let i=performance.timeOrigin,a=performance.now();return e=requestAnimationFrame(()=>{t=setTimeout(()=>{let e=performance.now(),t=e-a,o=performance.timeOrigin;Ks.push(e+o);let s=Ks.filter(t=>e+o-t<=1e3),c=s.length;Ks=s;let l=zs!==null&&Bs!==null?e+o-(Bs+zs)<100:null,u=Hs!==null&&Hs;if(t>Gs&&!l&&document.visibilityState===`visible`&&!u){let n=o+e,r=a+i;Ls.getState().actions.addEvent({kind:`long-render`,id:yn(),data:{endAt:n,startAt:r,meta:{fiberRenders:Fs,latency:t,fps:c}}})}zs=null,Bs=null,r?.(),n()},0)}),r}let r=n();return()=>{r(),cancelAnimationFrame(e),clearTimeout(t)}}var Js=()=>{let e=bs(),t=Us(),n=Ws(),r=qs(),i=async(e,t,n)=>{Ls.getState().actions.addEvent({kind:`interaction`,id:yn(),data:{startAt:t.detailedTiming.blockingTimeStart,endAt:performance.now()+performance.timeOrigin,meta:{...t,kind:n.kind}}});let r=as.getChannelState(`recording`);t.detailedTiming.stopListeningForRenders(),r.length&&as.updateChannelState(`recording`,()=>new q(is))},a=Ds(`pointer`,{onComplete:i}),o=Ds(`keyboard`,{onComplete:i}),s=ws(e=>{rs.setState(q.fromArray(rs.getCurrentState().concat(e),ns))});return()=>{t(),n(),r(),e(),a(),s(),o()}},Ys=e=>{let t=e.filter(e=>e.length>2);return t.length===0?e.at(-1)??`Unknown`:t.at(-1)},J=e=>{switch(e.kind){case`interaction`:{let{renderTime:t,otherJSTime:n,framePreparation:r,frameConstruction:i,frameDraw:a}=e;return t+n+r+i+(a??0)}case`dropped-frames`:return e.otherTime+e.renderTime}},Xs=e=>e.wasFiberRenderMount||e.hasMemoCache?!1:e.changes.context.length===0&&e.changes.props.length===0&&e.changes.state.length===0,Zs=e=>{let t=J(e.timing);switch(e.kind){case`interaction`:return t<200?`low`:t<500?`needs-improvement`:`high`;case`dropped-frames`:return t<50?`low`:t<Gs?`needs-improvement`:`high`}},Qs=()=>Ze($s),$s=Fe(null),ec=({size:e=24,className:t})=>L(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:e,height:e,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,"stroke-width":`2`,"stroke-linecap":`round`,"stroke-linejoin":`round`,className:U([`lucide lucide-chevron-right`,t]),children:L(`path`,{d:`m9 18 6-6-6-6`})}),tc=({className:e=``,size:t=24,events:n=[]})=>{let r=n.includes(!0),i=n.filter(e=>e).length,a=i>99?`>99`:i,o=r?Math.max(t*.6,14):Math.max(t*.4,6);return L(`div`,{className:`relative`,children:[L(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:t,height:t,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,"stroke-width":`2`,"stroke-linecap":`round`,"stroke-linejoin":`round`,className:`lucide lucide-bell ${e}`,children:[L(`path`,{d:`M10.268 21a2 2 0 0 0 3.464 0`}),L(`path`,{d:`M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326`})]}),n.length>0&&i>0&&$.options.value.showNotificationCount&&L(`div`,{className:U([`absolute`,r?`-top-2.5 -right-2.5`:`-top-1 -right-1`,`rounded-full`,`flex items-center justify-center`,`text-[8px] font-medium text-white`,`aspect-square`,r?`bg-red-500/90`:`bg-purple-500/90`]),style:{width:`${o}px`,height:`${o}px`,padding:r?`0.5px`:`0`},children:r&&a})]})},nc=({className:e=``,size:t=24})=>L(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:t,height:t,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,"stroke-width":`2`,"stroke-linecap":`round`,"stroke-linejoin":`round`,className:e,children:[L(`path`,{d:`M18 6 6 18`}),L(`path`,{d:`m6 6 12 12`})]}),rc=({className:e=``,size:t=24})=>L(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:t,height:t,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,"stroke-width":`2`,"stroke-linecap":`round`,"stroke-linejoin":`round`,className:e,children:[L(`path`,{d:`M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z`}),L(`path`,{d:`M16 9a5 5 0 0 1 0 6`}),L(`path`,{d:`M19.364 18.364a9 9 0 0 0 0-12.728`})]}),ic=({className:e=``,size:t=24})=>L(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:t,height:t,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,"stroke-width":`2`,"stroke-linecap":`round`,"stroke-linejoin":`round`,className:e,children:[L(`path`,{d:`M16 9a5 5 0 0 1 .95 2.293`}),L(`path`,{d:`M19.364 5.636a9 9 0 0 1 1.889 9.96`}),L(`path`,{d:`m2 2 20 20`}),L(`path`,{d:`m7 7-.587.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298V11`}),L(`path`,{d:`M9.828 4.172A.686.686 0 0 1 11 4.657v.686`})]}),ac=({size:e=24,className:t})=>L(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:e,height:e,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,"stroke-width":`2`,"stroke-linecap":`round`,"stroke-linejoin":`round`,className:U([`lucide lucide-arrow-left`,t]),children:[L(`path`,{d:`m12 19-7-7 7-7`}),L(`path`,{d:`M19 12H5`})]}),oc=({className:e=``,size:t=24})=>L(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:t,height:t,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,"stroke-width":`2`,"stroke-linecap":`round`,"stroke-linejoin":`round`,className:e,children:[L(`path`,{d:`M14 4.1 12 6`}),L(`path`,{d:`m5.1 8-2.9-.8`}),L(`path`,{d:`m6 12-1.9 2`}),L(`path`,{d:`M7.2 2.2 8 5.1`}),L(`path`,{d:`M9.037 9.69a.498.498 0 0 1 .653-.653l11 4.5a.5.5 0 0 1-.074.949l-4.349 1.041a1 1 0 0 0-.74.739l-1.04 4.35a.5.5 0 0 1-.95.074z`})]}),sc=({className:e=``,size:t=24})=>L(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:t,height:t,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,"stroke-width":`2`,"stroke-linecap":`round`,"stroke-linejoin":`round`,className:e,children:[L(`path`,{d:`M10 8h.01`}),L(`path`,{d:`M12 12h.01`}),L(`path`,{d:`M14 8h.01`}),L(`path`,{d:`M16 12h.01`}),L(`path`,{d:`M18 8h.01`}),L(`path`,{d:`M6 8h.01`}),L(`path`,{d:`M7 16h10`}),L(`path`,{d:`M8 12h.01`}),L(`rect`,{width:`20`,height:`16`,x:`2`,y:`4`,rx:`2`})]}),cc=({className:e=``,size:t=24})=>L(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:t,height:t,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,"stroke-width":`2`,"stroke-linecap":`round`,"stroke-linejoin":`round`,className:e,style:{transform:`rotate(180deg)`},children:[L(`circle`,{cx:`12`,cy:`12`,r:`10`}),L(`path`,{d:`m4.9 4.9 14.2 14.2`})]}),lc=({className:e=``,size:t=24})=>L(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:t,height:t,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,className:e,children:[L(`polyline`,{points:`22 17 13.5 8.5 8.5 13.5 2 7`}),L(`polyline`,{points:`16 17 22 17 22 11`})]}),uc=({children:e,triggerContent:t,wrapperProps:n})=>{let[r,i]=A(`closed`),[a,o]=A(null),[s,c]=A({width:window.innerWidth,height:window.innerHeight}),l=M(null),u=M(null),d=Ze(Pl),f=M(!1);j(()=>{let e=()=>{c({width:window.innerWidth,height:window.innerHeight}),p()};return window.addEventListener(`resize`,e),()=>window.removeEventListener(`resize`,e)},[]);let p=()=>{if(l.current&&d){let e=l.current.getBoundingClientRect(),t=d.getBoundingClientRect(),n=e.left+e.width/2,r=e.top;o(new DOMRect(n-t.left,r-t.top,e.width,e.height))}};j(()=>{p()},[l.current]),j(()=>{if(r===`opening`){let e=setTimeout(()=>i(`open`),120);return()=>clearTimeout(e)}else if(r===`closing`){let e=setTimeout(()=>i(`closed`),120);return()=>clearTimeout(e)}},[r]),j(()=>{let e=setInterval(()=>{!f.current&&r!==`closed`&&i(`closing`)},1e3);return()=>clearInterval(e)},[r]);let m=()=>{f.current=!0,p(),i(`opening`)},h=()=>{f.current=!1,p(),i(`closing`)},g=(()=>{if(!a||!d)return{top:0,left:0};let e=d.getBoundingClientRect(),t=u.current?.offsetHeight||40,n=a.x+e.left,r=a.y+e.top,i=n,o=r-4;return i-175/2<5?i=92.5:i+175/2>s.width-5&&(i=s.width-5-175/2),o-t<5&&(o=r+a.height+4),{top:o-e.top,left:i-e.left}})();return L(D,{children:[d&&a&&r!==`closed`&&Qt(L(`div`,{ref:u,className:U([`absolute z-100 bg-white text-black rounded-lg px-3 py-2 shadow-lg`,`transition-[opacity] duration-120 ease-out`,`after:content-[""] after:absolute after:top-[100%]`,`after:left-1/2 after:-translate-x-1/2`,`after:w-[10px] after:h-[6px]`,`after:border-l-[5px] after:border-l-transparent`,`after:border-r-[5px] after:border-r-transparent`,`after:border-t-[6px] after:border-t-white`,`pointer-events-none`,r===`opening`||r===`closing`?`opacity-0`:`opacity-100`]),style:{top:g.top+`px`,left:g.left+`px`,transform:`translate(-50%, calc(-100% - 4px)) scale(${r===`open`?1:.97})`,minWidth:`175px`,willChange:`opacity, transform`},children:e}),d),L(`div`,{ref:l,onMouseEnter:m,onMouseLeave:h,...n,children:t})]})},dc=({selectedEvent:e})=>{let{notificationState:t,setNotificationState:n,setRoute:r}=Qs();return L(`div`,{className:U([`flex w-full justify-between items-center px-3 py-2 text-xs`]),children:[L(`div`,{className:U([`bg-[#18181B] flex items-center gap-x-1 p-1 rounded-sm`]),children:[L(`button`,{onClick:()=>{r({route:`render-visualization`,routeMessage:null})},className:U([`w-1/2 flex items-center justify-center whitespace-nowrap py-[5px] px-1 gap-x-1`,t.route===`render-visualization`||t.route===`render-explanation`?`text-white bg-[#7521c8] rounded-sm`:`text-[#6E6E77] bg-[#18181B] rounded-sm`]),children:`Ranked`}),L(`button`,{onClick:()=>{r({route:`other-visualization`,routeMessage:null})},className:U([`w-1/2 flex items-center justify-center whitespace-nowrap py-[5px] px-1 gap-x-1`,t.route===`other-visualization`?`text-white bg-[#7521c8] rounded-sm`:`text-[#6E6E77] bg-[#18181B] rounded-sm`]),children:`Overview`}),L(`button`,{onClick:()=>{r({route:`optimize`,routeMessage:null})},className:U([`w-1/2 flex items-center justify-center whitespace-nowrap py-[5px] px-1 gap-x-1`,t.route===`optimize`?`text-white bg-[#7521c8] rounded-sm`:`text-[#6E6E77] bg-[#18181B] rounded-sm`]),children:L(`span`,{children:`Prompts`})})]}),L(uc,{triggerContent:L(`button`,{onClick:()=>{n(e=>{e.audioNotificationsOptions.enabled&&e.audioNotificationsOptions.audioContext.state!==`closed`&&e.audioNotificationsOptions.audioContext.close();let t=e.audioNotificationsOptions.enabled;localStorage.setItem(`react-scan-notifications-audio`,String(!t));let n=new AudioContext;return e.audioNotificationsOptions.enabled||bn(n),t&&n.close(),{...e,audioNotificationsOptions:t?{audioContext:null,enabled:!1}:{audioContext:n,enabled:!0}}})},className:`ml-auto`,children:L(`div`,{className:U([`flex gap-x-2 justify-center items-center text-[#6E6E77]`]),children:[L(`span`,{children:`Alerts`}),t.audioNotificationsOptions.enabled?L(rc,{size:16,className:`text-[#6E6E77]`}):L(ic,{size:16,className:`text-[#6E6E77]`})]})}),children:L(D,{children:`Play a chime when a slowdown is recorded`})})]})},fc=e=>{let t=``;return e.toSorted((e,t)=>t.totalTime-e.totalTime).slice(0,30).filter(e=>e.totalTime>5).forEach(e=>{let n=``;n+=`Component Name:`,n+=e.name,n+=`
`,n+=`Rendered: ${e.count} times
`,n+=`Sum of self times for ${e.name} is ${e.totalTime.toFixed(0)}ms
`,e.changes.props.length>0&&(n+=`Changed props for all ${e.name} instances ("name:count" pairs)
`,e.changes.props.forEach(e=>{n+=`${e.name}:${e.count}x
`})),e.changes.state.length>0&&(n+=`Changed state for all ${e.name} instances ("hook index:count" pairs)
`,e.changes.state.forEach(e=>{n+=`${e.index}:${e.count}x
`})),e.changes.context.length>0&&(n+=`Changed context for all ${e.name} instances ("context display name (if exists):count" pairs)
`,e.changes.context.forEach(e=>{n+=`${e.name}:${e.count}x
`})),t+=n,t+=`
`}),t},pc=({renderTime:e,eHandlerTimeExcludingRenders:t,toRafTime:n,commitTime:r,framePresentTime:i,formattedReactData:a})=>`I will provide you with a set of high level, and low level performance data about an interaction in a React App:
### High level
- react component render time: ${e.toFixed(0)}ms
- how long it took to run javascript event handlers (EXCLUDING REACT RENDERS): ${t.toFixed(0)}ms
- how long it took from the last event handler time, to the last request animation frame: ${n.toFixed(0)}ms
	- things like prepaint, style recalculations, layerization, async web API's like observers may occur during this time
- how long it took from the last request animation frame to when the dom was committed: ${r.toFixed(0)}ms
	- during this period you will see paint, commit, potential style recalcs, and other misc browser activity. Frequently high times here imply css that makes the browser do a lot of work, or mutating expensive dom properties during the event handler stage. This can be many things, but it narrows the problem scope significantly when this is high
${i===null?``:`- how long it took from dom commit for the frame to be presented: ${i.toFixed(0)}ms. This is when information about how to paint the next frame is sent to the compositor threads, and when the GPU does work. If this is high, look for issues that may be a bottleneck for operations occurring during this time`}

### Low level
We also have lower level information about react components, such as their render time, and which props/state/context changed when they re-rendered.
${a}`,mc=({interactionType:e,name:t,componentPath:n,time:r,renderTime:i,eHandlerTimeExcludingRenders:a,toRafTime:o,commitTime:s,framePresentTime:c,formattedReactData:l})=>`You will attempt to implement a performance improvement to a user interaction in a React app. You will be provided with data about the interaction, and the slow down.

Your should split your goals into 2 parts:
- identifying the problem
- fixing the problem
	- it is okay to implement a fix even if you aren't 100% sure the fix solves the performance problem. When you aren't sure, you should tell the user to try repeating the interaction, and feeding the "Formatted Data" in the React Scan notifications optimize tab. This allows you to start a debugging flow with the user, where you attempt a fix, and observe the result. The user may make a mistake when they pass you the formatted data, so must make sure, given the data passed to you, that the associated data ties to the same interaction you were trying to debug.


Make sure to check if the user has the react compiler enabled (project dependent, configured through build tool), so you don't unnecessarily memoize components. If it is, you do not need to worry about memoizing user components

One challenge you may face is the performance problem lies in a node_module, not in user code. If you are confident the problem originates because of a node_module, there are multiple strategies, which are context dependent:
- you can try to work around the problem, knowing which module is slow
- you can determine if its possible to resolve the problem in the node_module by modifying non node_module code
- you can monkey patch the node_module to experiment and see if it's really the problem (you can modify a functions properties to hijack the call for example)
- you can determine if it's feasible to replace whatever node_module is causing the problem with a performant option (this is an extreme)

The interaction was a ${e} on the component named ${t}. This component has the following ancestors ${n}. This is the path from the component, to the root. This should be enough information to figure out where this component is in the user's code base

This path is the component that was clicked, so it should tell you roughly where component had an event handler that triggered a state change.

Please note that the leaf node of this path might not be user code (if they use a UI library), and they may contain many wrapper components that just pass through children that aren't relevant to the actual click. So make you sure analyze the path and understand what the user code is doing

We have a set of high level, and low level data about the performance issue.

The click took ${r.toFixed(0)}ms from interaction start, to when a new frame was presented to a user.

We also provide you with a breakdown of what the browser spent time on during the period of interaction start to frame presentation.

- react component render time: ${i.toFixed(0)}ms
- how long it took to run javascript event handlers (EXCLUDING REACT RENDERS): ${a.toFixed(0)}ms
- how long it took from the last event handler time, to the last request animation frame: ${o.toFixed(0)}ms
	- things like prepaint, style recalculations, layerization, async web API's like observers may occur during this time
- how long it took from the last request animation frame to when the dom was committed: ${s.toFixed(0)}ms
	- during this period you will see paint, commit, potential style recalcs, and other misc browser activity. Frequently high times here imply css that makes the browser do a lot of work, or mutating expensive dom properties during the event handler stage. This can be many things, but it narrows the problem scope significantly when this is high
${c===null?``:`- how long it took from dom commit for the frame to be presented: ${c.toFixed(0)}ms. This is when information about how to paint the next frame is sent to the compositor threads, and when the GPU does work. If this is high, look for issues that may be a bottleneck for operations occurring during this time`}


We also have lower level information about react components, such as their render time, and which props/state/context changed when they re-rendered.

${l}

You may notice components have many renders, but much fewer props/state/context changes. This normally implies most of the components could of been memoized to avoid computation

It's also important to remember if a component had no props/state/context change, and it was memoized, it would not render. So the flow should be:
- find the most expensive components
- see what's causing them to render
- determine how you can make those state/props/context not change for a large set of the renders
- once there are no more changes left, you can memoize the component so it no longer unnecessarily re-renders. 

An important thing to note is that if you see a lot of react renders (some components with very high render counts), but javascript excluding renders is much higher than render time, it is possible that the components with lots of renders run hooks like useEffect/useLayoutEffect, which run during the JS event handler period.

It's also good to note that react profiles hook times in development, and if many hooks are called (lets say 5,000 components all called a useEffect), it will have to profile every single one. And it may also be the case the comparison of the hooks dependency can be expensive, and that would not be tracked in render time.

If a node_module is the component with high renders, you can experiment to see if that component is the root issue (because of hooks). You should use the same instructions for node_module debugging mentioned previously.

`,hc=({renderTime:e,otherTime:t,formattedReactData:n})=>`You will attempt to implement a performance improvement to a large slowdown in a react app

Your should split your goals into 2 parts:
- identifying the problem
- fixing the problem
	- it is okay to implement a fix even if you aren't 100% sure the fix solves the performance problem. When you aren't sure, you should tell the user to try repeating the interaction, and feeding the "Formatted Data" in the React Scan notifications optimize tab. This allows you to start a debugging flow with the user, where you attempt a fix, and observe the result. The user may make a mistake when they pass you the formatted data, so must make sure, given the data passed to you, that the associated data ties to the same interaction you were trying to debug.

Make sure to check if the user has the react compiler enabled (project dependent, configured through build tool), so you don't unnecessarily memoize components. If it is, you do not need to worry about memoizing user components

One challenge you may face is the performance problem lies in a node_module, not in user code. If you are confident the problem originates because of a node_module, there are multiple strategies, which are context dependent:
- you can try to work around the problem, knowing which module is slow
- you can determine if its possible to resolve the problem in the node_module by modifying non node_module code
- you can monkey patch the node_module to experiment and see if it's really the problem (you can modify a functions properties to hijack the call for example)
- you can determine if it's feasible to replace whatever node_module is causing the problem with a performant option (this is an extreme)


We have the high level time of how much react spent rendering, and what else the browser spent time on during this slowdown

- react component render time: ${e.toFixed(0)}ms
- other time: ${t}ms


We also have lower level information about react components, such as their render time, and which props/state/context changed when they re-rendered.

${n}

You may notice components have many renders, but much fewer props/state/context changes. This normally implies most of the components could of been memoized to avoid computation

It's also important to remember if a component had no props/state/context change, and it was memoized, it would not render. So the flow should be:
- find the most expensive components
- see what's causing them to render
- determine how you can make those state/props/context not change for a large set of the renders
- once there are no more changes left, you can memoize the component so it no longer unnecessarily re-renders. 

An important thing to note is that if you see a lot of react renders (some components with very high render counts), but other time is much higher than render time, it is possible that the components with lots of renders run hooks like useEffect/useLayoutEffect, which run outside of what we profile (just react render time).

It's also good to note that react profiles hook times in development, and if many hooks are called (lets say 5,000 components all called a useEffect), it will have to profile every single one. And it may also be the case the comparison of the hooks dependency can be expensive, and that would not be tracked in render time.

If a node_module is the component with high renders, you can experiment to see if that component is the root issue (because of hooks). You should use the same instructions for node_module debugging mentioned previously.

If renders don't seem to be the problem, see if there are any expensive CSS properties being added/mutated, or any expensive DOM Element mutations/new elements being created that could cause this slowdown. 
`,gc=({renderTime:e,otherTime:t,formattedReactData:n})=>`Your goal will be to help me find the source of a performance problem in a React App. I collected a large dataset about this specific performance problem.

We have the high level time of how much react spent rendering, and what else the browser spent time on during this slowdown

- react component render time: ${e.toFixed(0)}ms
- other time (other JavaScript, hooks like useEffect, style recalculations, layerization, paint & commit and everything else the browser might do to draw a new frame after javascript mutates the DOM): ${t}ms


We also have lower level information about react components, such as their render time, and which props/state/context changed when they re-rendered.

${n}

You may notice components have many renders, but much fewer props/state/context changes. This normally implies most of the components could of been memoized to avoid computation

It's also important to remember if a component had no props/state/context change, and it was memoized, it would not render. So a flow we can go through is:
- find the most expensive components
- see what's causing them to render
- determine how you can make those state/props/context not change for a large set of the renders
- once there are no more changes left, you can memoize the component so it no longer unnecessarily re-renders. 


An important thing to note is that if you see a lot of react renders (some components with very high render counts), but other time is much higher than render time, it is possible that the components with lots of renders run hooks like useEffect/useLayoutEffect, which run outside of what we profile (just react render time).

It's also good to note that react profiles hook times in development, and if many hooks are called (lets say 5,000 components all called a useEffect), it will have to profile every single one, and this can add significant overhead when thousands of effects ran.

If it's not possible to explain the root problem from this data, please ask me for more data explicitly, and what we would need to know to find the source of the performance problem.
`,_c=({renderTime:e,otherTime:t,formattedReactData:n})=>`I will provide you with a set of high level, and low level performance data about a large frame drop in a React App:
### High level
- react component render time: ${e.toFixed(0)}ms
- how long it took to run everything else (other JavaScript, hooks like useEffect, style recalculations, layerization, paint & commit and everything else the browser might do to draw a new frame after javascript mutates the DOM): ${t}ms

### Low level
We also have lower level information about react components, such as their render time, and which props/state/context changed when they re-rendered.
${n}`,vc=({interactionType:e,name:t,time:n,renderTime:r,eHandlerTimeExcludingRenders:i,toRafTime:a,commitTime:o,framePresentTime:s,formattedReactData:c})=>`Your goal will be to help me find the source of a performance problem. I collected a large dataset about this specific performance problem.

There was a ${e} on a component named ${t}. This means, roughly, the component that handled the ${e} event was named ${t}.

We have a set of high level, and low level data about the performance issue.

The click took ${n.toFixed(0)}ms from interaction start, to when a new frame was presented to a user.

We also provide you with a breakdown of what the browser spent time on during the period of interaction start to frame presentation.

- react component render time: ${r.toFixed(0)}ms
- how long it took to run javascript event handlers (EXCLUDING REACT RENDERS): ${i.toFixed(0)}ms
- how long it took from the last event handler time, to the last request animation frame: ${a.toFixed(0)}ms
	- things like prepaint, style recalculations, layerization, async web API's like observers may occur during this time
- how long it took from the last request animation frame to when the dom was committed: ${o.toFixed(0)}ms
	- during this period you will see paint, commit, potential style recalcs, and other misc browser activity. Frequently high times here imply css that makes the browser do a lot of work, or mutating expensive dom properties during the event handler stage. This can be many things, but it narrows the problem scope significantly when this is high
${s===null?``:`- how long it took from dom commit for the frame to be presented: ${s.toFixed(0)}ms. This is when information about how to paint the next frame is sent to the compositor threads, and when the GPU does work. If this is high, look for issues that may be a bottleneck for operations occurring during this time`}

We also have lower level information about react components, such as their render time, and which props/state/context changed when they re-rendered.

${c}


You may notice components have many renders, but much fewer props/state/context changes. This normally implies most of the components could of been memoized to avoid computation

It's also important to remember if a component had no props/state/context change, and it was memoized, it would not render. So a flow we can go through is:
- find the most expensive components
- see what's causing them to render
- determine how you can make those state/props/context not change for a large set of the renders
- once there are no more changes left, you can memoize the component so it no longer unnecessarily re-renders. 


An important thing to note is that if you see a lot of react renders (some components with very high render counts), but javascript excluding renders is much higher than render time, it is possible that the components with lots of renders run hooks like useEffect/useLayoutEffect, which run during the JS event handler period.

It's also good to note that react profiles hook times in development, and if many hooks are called (lets say 5,000 components all called a useEffect), it will have to profile every single one. And it may also be the case the comparison of the hooks dependency can be expensive, and that would not be tracked in render time.

If it's not possible to explain the root problem from this data, please ask me for more data explicitly, and what we would need to know to find the source of the performance problem.
`,yc=(e,t)=>es(()=>{switch(e){case`data`:switch(t.kind){case`dropped-frames`:return _c({formattedReactData:fc(t.groupedFiberRenders),renderTime:t.groupedFiberRenders.reduce((e,t)=>e+t.totalTime,0),otherTime:t.timing.otherTime});case`interaction`:return pc({commitTime:t.timing.frameConstruction,eHandlerTimeExcludingRenders:t.timing.otherJSTime,formattedReactData:fc(t.groupedFiberRenders),framePresentTime:t.timing.frameDraw,renderTime:t.groupedFiberRenders.reduce((e,t)=>e+t.totalTime,0),toRafTime:t.timing.framePreparation})}case`explanation`:switch(t.kind){case`dropped-frames`:return gc({formattedReactData:fc(t.groupedFiberRenders),renderTime:t.groupedFiberRenders.reduce((e,t)=>e+t.totalTime,0),otherTime:t.timing.otherTime});case`interaction`:return vc({commitTime:t.timing.frameConstruction,eHandlerTimeExcludingRenders:t.timing.otherJSTime,formattedReactData:fc(t.groupedFiberRenders),framePresentTime:t.timing.frameDraw,interactionType:t.type,name:Ys(t.componentPath),renderTime:t.groupedFiberRenders.reduce((e,t)=>e+t.totalTime,0),time:J(t.timing),toRafTime:t.timing.framePreparation})}case`fix`:switch(t.kind){case`dropped-frames`:return hc({formattedReactData:fc(t.groupedFiberRenders),renderTime:t.groupedFiberRenders.reduce((e,t)=>e+t.totalTime,0),otherTime:t.timing.otherTime});case`interaction`:return mc({commitTime:t.timing.frameConstruction,componentPath:t.componentPath.join(`>`),eHandlerTimeExcludingRenders:t.timing.otherJSTime,formattedReactData:fc(t.groupedFiberRenders),framePresentTime:t.timing.frameDraw,interactionType:t.type,name:Ys(t.componentPath),renderTime:t.groupedFiberRenders.reduce((e,t)=>e+t.totalTime,0),time:J(t.timing),toRafTime:t.timing.framePreparation})}}}),bc=({selectedEvent:e})=>{let[t,n]=A(`fix`),[r,i]=A(!1);return L(`div`,{className:U([`w-full h-full`]),children:[L(`div`,{className:U([`border border-[#27272A] rounded-sm h-4/5 text-xs overflow-hidden`]),children:[L(`div`,{className:U([`bg-[#18181B] p-1 rounded-t-sm`]),children:L(`div`,{className:U([`flex items-center gap-x-1`]),children:[L(`button`,{onClick:()=>n(`fix`),className:U([`flex items-center justify-center whitespace-nowrap py-1.5 px-3 rounded-sm`,t===`fix`?`text-white bg-[#7521c8]`:`text-[#6E6E77] hover:text-white`]),children:`Fix`}),L(`button`,{onClick:()=>n(`explanation`),className:U([`flex items-center justify-center whitespace-nowrap py-1.5 px-3 rounded-sm`,t===`explanation`?`text-white bg-[#7521c8]`:`text-[#6E6E77] hover:text-white`]),children:`Explanation`}),L(`button`,{onClick:()=>n(`data`),className:U([`flex items-center justify-center whitespace-nowrap py-1.5 px-3 rounded-sm`,t===`data`?`text-white bg-[#7521c8]`:`text-[#6E6E77] hover:text-white`]),children:`Data`})]})}),L(`div`,{className:U([`overflow-y-auto h-full`]),children:L(`pre`,{className:U([`p-2 h-full`,`whitespace-pre-wrap break-words`,`text-gray-300 font-mono `]),children:yc(t,e)})})]}),L(`button`,{onClick:async()=>{let n=yc(t,e);await navigator.clipboard.writeText(n),i(!0),setTimeout(()=>i(!1),1e3)},className:U([`mt-4 px-4 py-2 bg-[#18181B] text-[#6E6E77] rounded-sm`,`hover:text-white transition-colors duration-200`,`flex items-center justify-center gap-x-2 text-xs`]),children:[L(`span`,{children:r?`Copied!`:`Copy Prompt`}),L(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:`16`,height:`16`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,className:U([`transition-transform duration-200`,r&&`scale-110`]),children:r?L(`path`,{d:`M20 6L9 17l-5-5`}):L(D,{children:[L(`rect`,{width:`14`,height:`14`,x:`8`,y:`8`,rx:`2`,ry:`2`}),L(`path`,{d:`M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2`})]})})]})]})},xc=(e,t)=>{switch(e.kind){case`dropped-frames`:return[...t?[{name:`Total Processing Time`,time:J(e.timing),color:`bg-red-500`,kind:`total-processing-time`}]:[{name:`Renders`,time:e.timing.renderTime,color:`bg-purple-500`,kind:`render`},{name:`JavaScript, DOM updates, Draw Frame`,time:e.timing.otherTime,color:`bg-[#4b4b4b]`,kind:`other-frame-drop`}]];case`interaction`:return[...t?[]:[{name:`Renders`,time:e.timing.renderTime,color:`bg-purple-500`,kind:`render`}],{name:t?`React Renders, Hooks, Other JavaScript`:`JavaScript/React Hooks `,time:e.timing.otherJSTime,color:`bg-[#EFD81A]`,kind:`other-javascript`},{name:`Update DOM and Draw New Frame`,time:J(e.timing)-e.timing.renderTime-e.timing.otherJSTime,color:`bg-[#1D3A66]`,kind:`other-not-javascript`}]}},Sc=({selectedEvent:e})=>{let[t]=A(Yl()??!1),{notificationState:n}=Qs(),[r,i]=A(n.routeMessage?.name?[n.routeMessage.name]:[]),a=xc(e,t),o=Ze(Pl);j(()=>{if(n.routeMessage?.name){let e=o?.querySelector(`#overview-scroll-container`),t=o?.querySelector(`#react-scan-overview-bar-${n.routeMessage.name}`);if(e&&t){let n=t.getBoundingClientRect().top-e.getBoundingClientRect().top;e.scrollTop+=n}}},[n.route]),j(()=>{n.route===`other-visualization`&&i(e=>n.routeMessage?.name?[n.routeMessage.name]:e)},[n.route]);let s=a.reduce((e,t)=>e+t.time,0);return L(`div`,{className:`rounded-sm border border-zinc-800 text-xs`,children:[L(`div`,{className:`p-2 border-b border-zinc-800 bg-zinc-900/50`,children:L(`div`,{className:`flex items-center justify-between`,children:[L(`h3`,{className:`text-xs font-medium`,children:`What was time spent on?`}),L(`span`,{className:`text-xs text-zinc-400`,children:[`Total: `,s.toFixed(0),`ms`]})]})}),L(`div`,{className:`divide-y divide-zinc-800`,children:a.map(t=>{let n=r.includes(t.kind);return L(`div`,{id:`react-scan-overview-bar-${t.kind}`,children:[L(`button`,{onClick:()=>i(e=>e.includes(t.kind)?e.filter(e=>e!==t.kind):[...e,t.kind]),className:`w-full px-3 py-2 flex items-center gap-4 hover:bg-zinc-800/50 transition-colors`,children:L(`div`,{className:`flex-1`,children:[L(`div`,{className:`flex items-center justify-between mb-2`,children:[L(`div`,{className:`flex items-center gap-0.5`,children:[L(`svg`,{className:`h-4 w-4 text-zinc-400 transition-transform ${n?`rotate-90`:``}`,fill:`none`,stroke:`currentColor`,viewBox:`0 0 24 24`,children:L(`path`,{strokeLinecap:`round`,strokeLinejoin:`round`,strokeWidth:2,d:`M9 5l7 7-7 7`})}),L(`span`,{className:`font-medium flex items-center text-left`,children:t.name})]}),L(`span`,{className:` text-zinc-400`,children:[t.time.toFixed(0),`ms`]})]}),L(`div`,{className:`h-1 bg-zinc-800 rounded-full overflow-hidden`,children:L(`div`,{className:`h-full ${t.color} transition-all`,style:{width:`${t.time/s*100}%`}})})]})}),n&&L(`div`,{className:`bg-zinc-900/30 border-t border-zinc-800 px-2.5 py-3`,children:L(`p`,{className:` text-zinc-400 mb-4 text-xs`,children:es(()=>{switch(e.kind){case`interaction`:switch(t.kind){case`render`:return L(Dc,{input:Tc(e)});case`other-javascript`:return L(Dc,{input:Ec(e)});case`other-not-javascript`:return L(Dc,{input:Cc(e)})}case`dropped-frames`:switch(t.kind){case`total-processing-time`:return L(Dc,{input:{kind:`total-processing`,data:{time:J(e.timing)}}});case`render`:return L(D,{children:L(Dc,{input:{kind:`render`,data:{topByTime:e.groupedFiberRenders.toSorted((e,t)=>t.totalTime-e.totalTime).slice(0,3).map(t=>({name:t.name,percentage:t.totalTime/J(e.timing)}))}}})});case`other-frame-drop`:return L(Dc,{input:{kind:`other`}})}}})})})]},t.kind)})})]})},Cc=e=>{let t=e.groupedFiberRenders.reduce((e,t)=>e+t.count,0),n=e.timing.renderTime/J(e.timing)*100;return t>100?{kind:`high-render-count-update-dom-draw-frame`,data:{count:t,percentageOfTotal:n,copyButton:L(wc,{})}}:{kind:`update-dom-draw-frame`,data:{copyButton:L(wc,{})}}},wc=()=>{let[e,t]=A(!1),{notificationState:n}=Qs();return L(`button`,{onClick:async()=>{n.selectedEvent&&(await navigator.clipboard.writeText(yc(`explanation`,n.selectedEvent)),t(!0),setTimeout(()=>t(!1),1e3))},className:`bg-zinc-800 flex hover:bg-zinc-700 text-zinc-200 px-2 py-1 rounded gap-x-3`,children:[L(`span`,{children:e?`Copied!`:`Copy Prompt`}),L(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:`16`,height:`16`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,className:U([`transition-transform duration-200`,e&&`scale-110`]),children:e?L(`path`,{d:`M20 6L9 17l-5-5`}):L(D,{children:[L(`rect`,{width:`14`,height:`14`,x:`8`,y:`8`,rx:`2`,ry:`2`}),L(`path`,{d:`M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2`})]})})]})},Tc=e=>e.timing.renderTime/J(e.timing)>.3?{kind:`render`,data:{topByTime:e.groupedFiberRenders.toSorted((e,t)=>t.totalTime-e.totalTime).slice(0,3).map(t=>({percentage:t.totalTime/J(e.timing),name:t.name}))}}:{kind:`other`},Ec=e=>{let t=e.groupedFiberRenders.reduce((e,t)=>e+t.count,0);return e.timing.otherJSTime/J(e.timing)<.2?{kind:`js-explanation-base`}:e.groupedFiberRenders.find(e=>e.count>200)||e.groupedFiberRenders.reduce((e,t)=>e+t.count,0)>500?{kind:`high-render-count-high-js`,data:{renderCount:t,topByCount:e.groupedFiberRenders.filter(e=>e.count>100).toSorted((e,t)=>t.count-e.count).slice(0,3)}}:e.timing.otherJSTime/J(e.timing)>.3?e.timing.renderTime>.2?{kind:`js-explanation-base`}:{kind:`low-render-count-high-js`,data:{renderCount:t}}:{kind:`js-explanation-base`}},Dc=({input:e})=>{switch(e.kind){case`total-processing`:return L(`div`,{className:U([`text-[#E4E4E7] text-[10px] leading-6 flex flex-col gap-y-2`]),children:[L(`p`,{children:[`This is the time it took to draw the entire frame that was presented to the user. To be at 60FPS, this number needs to be `,`<=16ms`]}),L(`p`,{children:`To debug the issue, check the "Ranked" tab to see if there are significant component renders`}),L(`p`,{children:`On a production React build, React Scan can't access the time it took for component to render. To get that information, run React Scan on a development build`}),L(`p`,{children:[`To understand precisely what caused the slowdown while in production, use the `,L(`strong`,{children:`Chrome profiler`}),` and analyze the function call times.`]}),L(`p`,{})]});case`render`:return L(`div`,{className:U([`text-[#E4E4E7] text-[10px] leading-6 flex flex-col gap-y-2`]),children:[L(`p`,{children:`This is the time it took React to run components, and internal logic to handle the output of your component.`}),L(`div`,{className:U([`flex flex-col`]),children:[L(`p`,{children:`The slowest components for this time period were:`}),e.data.topByTime.map(e=>L(`div`,{children:[L(`strong`,{children:e.name}),`:`,` `,(e.percentage*100).toFixed(0),`% of total`]},e.name))]}),L(`p`,{children:`To view the render times of all your components, and what caused them to render, go to the "Ranked" tab`}),L(`p`,{children:`The "Ranked" tab shows the render times of every component.`}),L(`p`,{children:`The render times of the same components are grouped together into one bar.`}),L(`p`,{children:`Clicking the component will show you what props, state, or context caused the component to re-render.`})]});case`js-explanation-base`:return L(`div`,{className:U([`text-[#E4E4E7] text-[10px] leading-6 flex flex-col gap-y-2`]),children:[L(`p`,{children:`This is the period when JavaScript hooks and other JavaScript outside of React Renders run.`}),L(`p`,{children:[`The most common culprit for high JS time is expensive hooks, like expensive callbacks inside of `,L(`code`,{children:`useEffect`}),`'s or a large number of useEffect's called, but this can also be JavaScript event handlers (`,L(`code`,{children:`'onclick'`}),`, `,L(`code`,{children:`'onchange'`}),`) that performed expensive computation.`]}),L(`p`,{children:`If you have lots of components rendering that call hooks, like useEffect, it can add significant overhead even if the callbacks are not expensive. If this is the case, you can try optimizing the renders of those components to avoid the hook from having to run.`}),L(`p`,{children:[`You should profile your app using the`,` `,L(`strong`,{children:`Chrome DevTools profiler`}),` to learn exactly which functions took the longest to execute.`]})]});case`high-render-count-high-js`:return L(`div`,{className:U([`text-[#E4E4E7] text-[10px] leading-6 flex flex-col gap-y-2`]),children:[L(`p`,{children:`This is the period when JavaScript hooks and other JavaScript outside of React Renders run.`}),e.data.renderCount===0?L(D,{children:[L(`p`,{children:`There were no renders, which means nothing related to React caused this slowdown. The most likely cause of the slowdown is a slow JavaScript event handler, or code related to a Web API`}),L(`p`,{children:[`You should try to reproduce the slowdown while profiling your website with the`,L(`strong`,{children:`Chrome DevTools profiler`}),` to see exactly what functions took the longest to execute.`]})]}):L(D,{children:[` `,L(`p`,{children:[`There were `,L(`strong`,{children:e.data.renderCount}),` renders, which could have contributed to the high JavaScript/Hook time if they ran lots of hooks, like `,L(`code`,{children:`useEffects`}),`.`]}),L(`div`,{className:U([`flex flex-col`]),children:[L(`p`,{children:`You should try optimizing the renders of:`}),e.data.topByCount.map(e=>L(`div`,{children:[`- `,L(`strong`,{children:e.name}),` (rendered `,e.count,`x)`]},e.name))]}),`and then checking if the problem still exists.`,L(`p`,{children:[`You can also try profiling your app using the`,` `,L(`strong`,{children:`Chrome DevTools profiler`}),` to see exactly what functions took the longest to execute.`]})]})]});case`low-render-count-high-js`:return L(`div`,{className:U([`text-[#E4E4E7] text-[10px] leading-6 flex flex-col gap-y-2`]),children:[L(`p`,{children:`This is the period when JavaScript hooks and other JavaScript outside of React Renders run.`}),L(`p`,{children:[`There were only `,L(`strong`,{children:e.data.renderCount}),` renders detected, which means either you had very expensive hooks like`,` `,L(`code`,{children:`useEffect`}),`/`,L(`code`,{children:`useLayoutEffect`}),`, or there is other JavaScript running during this interaction that took up the majority of the time.`]}),L(`p`,{children:[`To understand precisely what caused the slowdown, use the`,` `,L(`strong`,{children:`Chrome profiler`}),` and analyze the function call times.`]})]});case`high-render-count-update-dom-draw-frame`:return L(`div`,{className:U([`text-[#E4E4E7] text-[10px] leading-6 flex flex-col gap-y-2`]),children:[L(`p`,{children:`These are the calculations the browser is forced to do in response to the JavaScript that ran during the interaction.`}),L(`p`,{children:`This can be caused by CSS updates/CSS recalculations, or new DOM elements/DOM mutations.`}),L(`p`,{children:[`During this interaction, there were`,` `,L(`strong`,{children:e.data.count}),` renders, which was`,` `,L(`strong`,{children:[e.data.percentageOfTotal.toFixed(0),`%`]}),` of the time spent processing`]}),L(`p`,{children:`The work performed as a result of the renders may have forced the browser to spend a lot of time to draw the next frame.`}),L(`p`,{children:`You can try optimizing the renders to see if the performance problem still exists using the "Ranked" tab.`}),L(`p`,{children:`If you use an AI-based code editor, you can export the performance data collected as a prompt.`}),L(`p`,{children:e.data.copyButton}),L(`p`,{children:`Provide this formatted data to the model and ask it to find, or fix, what could be causing this performance problem.`}),L(`p`,{children:`For a larger selection of prompts, try the "Prompts" tab`})]});case`update-dom-draw-frame`:return L(`div`,{className:U([`text-[#E4E4E7] text-[10px] leading-6 flex flex-col gap-y-2`]),children:[L(`p`,{children:`These are the calculations the browser is forced to do in response to the JavaScript that ran during the interaction.`}),L(`p`,{children:`This can be caused by CSS updates/CSS recalculations, or new DOM elements/DOM mutations.`}),L(`p`,{children:`If you use an AI-based code editor, you can export the performance data collected as a prompt.`}),L(`p`,{children:e.data.copyButton}),L(`p`,{children:`Provide this formatted data to the model and ask it to find, or fix, what could be causing this performance problem.`}),L(`p`,{children:`For a larger selection of prompts, try the "Prompts" tab`})]});case`other`:return L(`div`,{className:U([`text-[#E4E4E7] text-[10px] leading-6 flex flex-col gap-y-2`]),children:[L(`p`,{children:[`This is the time it took to run everything other than React renders. This can be hooks like `,L(`code`,{children:`useEffect`}),`, other JavaScript not part of React, or work the browser has to do to update the DOM and draw the next frame.`]}),L(`p`,{children:[`To get a better picture of what happened, profile your app using the`,` `,L(`strong`,{children:`Chrome profiler`}),` when the performance problem arises.`]})]})}},Y=null,X=null,Oc=null,Z=I({kind:`idle`,current:null}),kc=null,Ac=0,jc=1.8,Mc=.05,Nc=1/60,Pc=()=>{kc&&cancelAnimationFrame(kc),kc=requestAnimationFrame(e=>{if(!Y||!X)return;let t=Ac?Math.min((e-Ac)/1e3,Mc):Nc;Ac=e;let n=jc*t;X.clearRect(0,0,Y.width,Y.height);let r=`hsl(271, 76%, 53%)`,i=Z.value,{alpha:a,current:o}=es(()=>{switch(i.kind){case`transition`:{let e=i.current?.alpha&&i.current.alpha>0?i.current:i.transitionTo;return{alpha:e?e.alpha:0,current:e}}case`move-out`:return{alpha:i.current?.alpha??0,current:i.current};case`idle`:return{alpha:1,current:i.current}}});switch(o?.rects.forEach(e=>{X&&(X.shadowColor=r,X.shadowBlur=6,X.strokeStyle=r,X.lineWidth=2,X.globalAlpha=a,X.beginPath(),X.rect(e.left,e.top,e.width,e.height),X.stroke(),X.shadowBlur=0,X.beginPath(),X.rect(e.left,e.top,e.width,e.height),X.stroke())}),i.kind){case`move-out`:if(i.current.alpha===0){Z.value={kind:`idle`,current:null},Ac=0;return}i.current.alpha<=.01&&(i.current.alpha=0),i.current.alpha=Math.max(0,i.current.alpha-n),Pc();return;case`transition`:if(i.current&&i.current.alpha>0){i.current.alpha=Math.max(0,i.current.alpha-n),Pc();return}if(i.transitionTo.alpha===1){Z.value={kind:`idle`,current:i.transitionTo},Ac=0;return}i.transitionTo.alpha=Math.min(i.transitionTo.alpha+n,1),Pc();case`idle`:Ac=0;return}})},Fc=null,Ic=e=>{if(Y=document.createElement(`canvas`),X=Y.getContext(`2d`,{alpha:!0}),!X)return null;let t=window.devicePixelRatio||1,{innerWidth:n,innerHeight:r}=window;Y.style.width=`${n}px`,Y.style.height=`${r}px`,Y.width=n*t,Y.height=r*t,Y.style.position=`fixed`,Y.style.left=`0`,Y.style.top=`0`,Y.style.pointerEvents=`none`,Y.style.zIndex=`2147483600`,X.scale(t,t),e.appendChild(Y),Fc&&window.removeEventListener(`resize`,Fc);let i=()=>{if(!Y||!X)return;let e=window.devicePixelRatio||1,{innerWidth:t,innerHeight:n}=window;Y.style.width=`${t}px`,Y.style.height=`${n}px`,Y.width=t*e,Y.height=n*e,X.scale(e,e),Pc()};return Fc=i,window.addEventListener(`resize`,i),Z.subscribe(()=>{requestAnimationFrame(()=>{Pc()})}),Lc};function Lc(){Oc&&=(cancelAnimationFrame(Oc),null),Y?.parentNode&&Y.parentNode.removeChild(Y),Y=null,X=null}var Rc=()=>{let e=Z.value.current?Z.value.current:Z.value.kind===`transition`?Z.value.transitionTo:null;if(e){if(Z.value.kind===`transition`){Z.value={kind:`move-out`,current:Z.value.current?.alpha===0?Z.value.transitionTo:Z.value.current??Z.value.transitionTo};return}Z.value={kind:`move-out`,current:{alpha:0,...e}}}},zc=({selectedEvent:e})=>{let t=J(e.timing),n=t-e.timing.renderTime,[r]=A(Yl()),i=e.groupedFiberRenders.map(e=>({event:e,kind:`render`,totalTime:r?e.count:e.totalTime})),a=es(()=>{switch(e.kind){case`dropped-frames`:return e.timing.renderTime/t<.1;case`interaction`:return(e.timing.otherJSTime+e.timing.renderTime)/t<.2}});e.kind===`interaction`&&!r&&i.push({kind:`other-javascript`,totalTime:e.timing.otherJSTime}),a&&!r&&(e.kind===`interaction`?i.push({kind:`other-not-javascript`,totalTime:J(e.timing)-e.timing.renderTime-e.timing.otherJSTime}):i.push({kind:`other-frame-drop`,totalTime:n}));let o=M({lastCallAt:null,timer:null}),s=i.reduce((e,t)=>e+t.totalTime,0);return L(`div`,{className:U([`flex flex-col h-full w-full gap-y-1`]),children:[es(()=>{if(r&&i.length===0)return L(`div`,{className:`flex flex-col items-center justify-center h-full text-zinc-400`,children:[L(`p`,{className:`text-sm w-full text-left text-white mb-1.5`,children:`No data available`}),L(`p`,{className:`text-x w-full text-lefts`,children:`No data was collected during this period`})]});if(i.length===0)return L(`div`,{className:`flex flex-col items-center justify-center h-full text-zinc-400`,children:[L(`p`,{className:`text-sm w-full text-left text-white mb-1.5`,children:`No renders collected`}),L(`p`,{className:`text-x w-full text-lefts`,children:`There were no renders during this period`})]})}),i.toSorted((e,t)=>t.totalTime-e.totalTime).map(e=>L(Vc,{bars:i,bar:e,debouncedMouseEnter:o,totalBarTime:s,isProduction:r},e.kind===`render`?e.event.id:e.kind))]})},Bc=e=>e.current&&e.current.alpha>0?`fading-out`:`fading-in`,Vc=({bar:e,debouncedMouseEnter:t,totalBarTime:n,isProduction:r,bars:i,depth:a=0})=>{let{setNotificationState:o,setRoute:s}=Qs(),[c,l]=A(!1),u=e.kind===`render`?e.event.parents.size===0:!0,d=i.filter(t=>t.kind===`render`&&e.kind===`render`?e.event.parents.has(t.event.name)&&t.event.name!==e.event.name:!1),f=e.kind===`render`?Array.from(e.event.parents).filter(e=>!i.some(t=>t.kind===`render`&&t.event.name===e)):[];return L(`div`,{className:`w-full`,children:[L(`div`,{className:U([`w-full flex items-center relative text-xs min-w-0`]),children:[L(`button`,{onMouseLeave:()=>{t.current.timer&&clearTimeout(t.current.timer),Rc()},onMouseEnter:async()=>{let n=async()=>{if(t.current.lastCallAt=Date.now(),e.kind!==`render`){let e=Z.value.current?Z.value.current:Z.value.kind===`transition`?Z.value.transitionTo:null;if(!e){Z.value={kind:`idle`,current:null};return}Z.value={kind:`move-out`,current:{alpha:0,...e}};return}let n=Z.value,r=es(()=>{switch(n.kind){case`transition`:return n.transitionTo;case`idle`:case`move-out`:return n.current}}),i=[];if(n.kind===`transition`){let t=Bc(n);es(()=>{switch(t){case`fading-in`:Z.value={kind:`transition`,current:n.transitionTo,transitionTo:{rects:i,alpha:0,name:e.event.name}};return;case`fading-out`:Z.value={kind:`transition`,current:Z.value.current?{alpha:0,...Z.value.current}:null,transitionTo:{rects:i,alpha:0,name:e.event.name}};return}})}else Z.value={kind:`transition`,transitionTo:{rects:i,alpha:0,name:e.event.name},current:r?{alpha:0,...r}:null};let a=e.event.elements.filter(e=>e instanceof Element);for await(let e of Oo(a))e.forEach(({boundingClientRect:e})=>{i.push(e)}),Pc()};if(t.current.lastCallAt&&Date.now()-t.current.lastCallAt<200){t.current.timer&&clearTimeout(t.current.timer),t.current.timer=setTimeout(()=>{n()},200);return}n()},onClick:()=>{e.kind===`render`?(o(t=>({...t,selectedFiber:e.event})),s({route:`render-explanation`,routeMessage:null})):s({route:`other-visualization`,routeMessage:{kind:`auto-open-overview-accordion`,name:e.kind}})},className:U([`h-full w-[90%] flex items-center hover:bg-[#0f0f0f] rounded-l-md min-w-0 relative`]),children:[L(`div`,{style:{minWidth:`fit-content`,width:`${e.totalTime/n*100}%`},className:U([`flex items-center rounded-sm text-white text-xs h-[28px] shrink-0`,e.kind===`render`&&`bg-[#412162] group-hover:bg-[#5b2d89]`,e.kind===`other-frame-drop`&&`bg-[#44444a] group-hover:bg-[#6a6a6a]`,e.kind===`other-javascript`&&`bg-[#efd81a6b] group-hover:bg-[#efda1a2f]`,e.kind===`other-not-javascript`&&`bg-[#214379d4] group-hover:bg-[#21437982]`])}),L(`div`,{className:U([`absolute inset-0 flex items-center px-2`,`min-w-0`]),children:L(`div`,{className:`flex items-center gap-x-2 min-w-0 w-full`,children:[L(`span`,{className:U([`truncate`]),children:es(()=>{switch(e.kind){case`other-frame-drop`:return`JavaScript, DOM updates, Draw Frame`;case`other-javascript`:return`JavaScript/React Hooks`;case`other-not-javascript`:return`Update DOM and Draw New Frame`;case`render`:return e.event.name}})}),e.kind===`render`&&Xs(e.event)&&L(`div`,{style:{lineHeight:`10px`},className:U([`px-1 py-0.5 bg-[#6a369e] flex items-center rounded-sm font-semibold text-[8px] shrink-0`]),children:`Memoizable`})]})})]}),L(`button`,{onClick:()=>e.kind===`render`&&!u&&l(!c),className:U([`flex items-center min-w-fit shrink-0 rounded-r-md h-[28px]`,!u&&`hover:bg-[#0f0f0f]`,e.kind===`render`&&!u?`cursor-pointer`:`cursor-default`]),children:[L(`div`,{className:`w-[20px] flex items-center justify-center`,children:e.kind===`render`&&!u&&L(ec,{className:U(`transition-transform`,c&&`rotate-90`),size:16})}),L(`div`,{style:{minWidth:u?`fit-content`:r?`30px`:`60px`},className:`flex items-center justify-end gap-x-1`,children:[e.kind===`render`&&L(`span`,{className:U([`text-[10px]`]),children:[`x`,e.event.count]}),(e.kind!==`render`||!r)&&L(`span`,{className:`text-[10px] text-[#7346a0] pr-1`,children:[e.totalTime<1?`<1`:e.totalTime.toFixed(0),`ms`]})]})]}),a===0&&L(`div`,{className:U([`absolute right-0 top-1/2 transition-none -translate-y-1/2 bg-white text-black px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity mr-16`,`pointer-events-none`]),children:`Click to learn more`})]}),c&&(d.length>0||f.length>0)&&L(`div`,{className:`pl-3 flex flex-col gap-y-1 mt-1`,children:[d.toSorted((e,t)=>t.totalTime-e.totalTime).map((e,o)=>L(Vc,{depth:a+1,bar:e,debouncedMouseEnter:t,totalBarTime:n,isProduction:r,bars:i},o)),f.map(e=>L(`div`,{className:`w-full`,children:L(`div`,{className:`w-full flex items-center relative text-xs`,children:L(`div`,{className:`h-full w-full flex items-center relative`,children:[L(`div`,{className:`flex items-center rounded-sm text-white text-xs h-[28px] w-full`}),L(`div`,{className:`absolute inset-0 flex items-center px-2`,children:L(`span`,{className:`truncate whitespace-nowrap text-white/70 w-full`,children:e})})]})})},e))]})]})},Hc=({selectedEvent:e,selectedFiber:t})=>{let{setRoute:n}=Qs(),[r,i]=A(!0),[a]=A(Yl());Ye(()=>{let e=localStorage.getItem(`react-scan-tip-shown`),t=e===`true`?!0:e===`false`?!1:null;if(t===null){i(!0),localStorage.setItem(`react-scan-tip-is-shown`,`true`);return}t||i(!1)},[]);let o=t.changes.context.length===0&&t.changes.props.length===0&&t.changes.state.length===0;return L(`div`,{className:U([`w-full min-h-fit h-full flex flex-col py-4 pt-0 rounded-sm`]),children:[L(`div`,{className:U([`flex items-start gap-x-4 `]),children:[L(`button`,{onClick:()=>{n({route:`render-visualization`,routeMessage:null})},className:U([`text-white hover:bg-[#34343b] flex gap-x-1 justify-center items-center mb-4 w-fit px-2.5 py-1.5 text-xs rounded-sm bg-[#18181B]`]),children:[L(ac,{size:14}),` `,L(`span`,{children:`Overview`})]}),L(`div`,{className:U([`flex flex-col gap-y-1`]),children:[L(`div`,{className:U([`text-sm font-bold text-white overflow-x-hidden`]),children:L(`div`,{className:`flex items-center gap-x-2 truncate`,children:t.name})}),L(`div`,{className:U([`flex gap-x-2`]),children:[!a&&L(D,{children:L(`div`,{className:U([`text-xs text-gray-400`]),children:[`• Render time: `,t.totalTime.toFixed(0),`ms`]})}),L(`div`,{className:U([`text-xs text-gray-400 mb-4`]),children:[`• Renders: `,t.count,`x`]})]})]})]}),r&&!o&&L(`div`,{className:U([`w-full mb-4 bg-[#0A0A0A] border border-[#27272A] rounded-sm overflow-hidden flex relative`]),children:[L(`button`,{onClick:()=>{i(!1),localStorage.setItem(`react-scan-tip-shown`,`false`)},className:U([`absolute right-2 top-2 rounded-sm p-1 hover:bg-[#18181B]`]),children:L(nc,{size:12})}),L(`div`,{className:U([`w-1 bg-[#d36cff]`])}),L(`div`,{className:U([`flex-1`]),children:[L(`div`,{className:U([`px-3 py-2 text-gray-100 text-xs font-semibold`]),children:`How to stop renders`}),L(`div`,{className:U([`px-3 pb-2 text-gray-400 text-[10px]`]),children:`Stop the following props, state and context from changing between renders, and wrap the component in React.memo if not already`})]})]}),o&&L(`div`,{className:U([`w-full mb-4 bg-[#0A0A0A] border border-[#27272A] rounded-sm overflow-hidden flex`]),children:[L(`div`,{className:U([`w-1 bg-[#d36cff]`])}),L(`div`,{className:U([`flex-1`]),children:[L(`div`,{className:U([`px-3 py-2 text-gray-100 text-sm font-semibold`]),children:`No changes detected`}),L(`div`,{className:U([`px-3 pb-2 text-gray-400 text-xs`]),children:`This component would not have rendered if it was memoized`})]})]}),L(`div`,{className:U([`flex w-full`]),children:[L(`div`,{className:U([`flex flex-col border border-[#27272A] rounded-l-sm overflow-hidden w-1/3`]),children:[L(`div`,{className:U([`text-[14px] font-semibold px-2 py-2 bg-[#18181B] text-white flex justify-center`]),children:`Changed Props`}),t.changes.props.length>0?t.changes.props.toSorted((e,t)=>t.count-e.count).map(e=>L(`div`,{className:U([`flex flex-col justify-between items-center border-t overflow-x-auto border-[#27272A] px-1 py-1 text-wrap bg-[#0A0A0A] text-[10px]`]),children:[L(`span`,{className:U([`text-white `]),children:e.name}),L(`div`,{className:U([` text-[8px]  text-[#d36cff] pl-1 py-1 `]),children:[e.count,`/`,t.count,`x`]})]},e.name)):L(`div`,{className:U([`flex items-center justify-center h-full bg-[#0A0A0A] text-[#A1A1AA] border-t border-[#27272A]`]),children:`No changes`})]}),L(`div`,{className:U([`flex flex-col border border-[#27272A] border-l-0 overflow-hidden w-1/3`]),children:[L(`div`,{className:U([` text-[14px] font-semibold px-2 py-2 bg-[#18181B] text-white flex justify-center`]),children:`Changed State`}),t.changes.state.length>0?t.changes.state.toSorted((e,t)=>t.count-e.count).map(e=>L(`div`,{className:U([`flex flex-col justify-between items-center border-t overflow-x-auto border-[#27272A] px-1 py-1 text-wrap bg-[#0A0A0A] text-[10px]`]),children:[L(`span`,{className:U([`text-white `]),children:[`index `,e.index]}),L(`div`,{className:U([`rounded-full  text-[#d36cff] pl-1 py-1 text-[8px]`]),children:[e.count,`/`,t.count,`x`]})]},e.index)):L(`div`,{className:U([`flex items-center justify-center h-full bg-[#0A0A0A] text-[#A1A1AA] border-t border-[#27272A]`]),children:`No changes`})]}),L(`div`,{className:U([`flex flex-col border border-[#27272A] border-l-0 rounded-r-sm overflow-hidden w-1/3`]),children:[L(`div`,{className:U([` text-[14px] font-semibold px-2 py-2 bg-[#18181B] text-white flex justify-center`]),children:`Changed Context`}),t.changes.context.length>0?t.changes.context.toSorted((e,t)=>t.count-e.count).map(e=>L(`div`,{className:U([`flex flex-col justify-between items-center border-t  border-[#27272A] px-1 py-1 bg-[#0A0A0A] text-[10px] overflow-x-auto`]),children:[L(`span`,{className:U([`text-white `]),children:e.name}),L(`div`,{className:U([`rounded-full text-[#d36cff] pl-1 py-1 text-[8px] text-wrap`]),children:[e.count,`/`,t.count,`x`]})]},e.name)):L(`div`,{className:U([`flex items-center justify-center h-full bg-[#0A0A0A] text-[#A1A1AA] border-t border-[#27272A] py-2`]),children:`No changes`})]})]})]})},Uc=()=>{let{notificationState:e,setNotificationState:t}=Qs(),[n,r]=A(`...`),i=M(null);if(j(()=>{let e=setInterval(()=>{r(e=>e===`...`?``:e+`.`)},500);return()=>clearInterval(e)},[]),!e.selectedEvent)return L(`div`,{ref:i,className:U([`h-full w-full flex flex-col items-center justify-center relative py-2 px-4`]),children:[L(`div`,{className:U([`p-2 flex justify-center items-center border-[#27272A] absolute top-0 right-0`]),children:L(`button`,{onClick:()=>{G.value={view:`none`}},children:L(nc,{size:18,className:`text-[#6F6F78]`})})}),L(`div`,{className:U([`flex flex-col items-start pt-5 bg-[#0A0A0A] p-5 rounded-sm max-w-md`,` shadow-lg`]),children:L(`div`,{className:U([`flex flex-col items-start gap-y-4`]),children:[L(`div`,{className:U([`flex items-center`]),children:L(`span`,{className:U([`text-zinc-400 font-medium text-[17px]`]),children:[`Scanning for slowdowns`,n]})}),e.events.length!==0&&L(`p`,{className:U([`text-xs`]),children:[`Click on an item in the`,` `,L(`span`,{className:U([`text-purple-400`]),children:`History`}),` list to get started`]}),L(`p`,{className:U([`text-zinc-600 text-xs`]),children:`You don't need to keep this panel open for React Scan to record slowdowns`}),L(`p`,{className:U([`text-zinc-600 text-xs`]),children:`Enable audio alerts to hear a delightful ding every time a large slowdown is recorded`}),L(`button`,{onClick:()=>{if(e.audioNotificationsOptions.enabled){t(e=>(e.audioNotificationsOptions.audioContext?.state!==`closed`&&e.audioNotificationsOptions.audioContext?.close(),localStorage.setItem(`react-scan-notifications-audio`,`false`),{...e,audioNotificationsOptions:{audioContext:null,enabled:!1}}));return}localStorage.setItem(`react-scan-notifications-audio`,`true`);let n=new AudioContext;bn(n),t(e=>({...e,audioNotificationsOptions:{enabled:!0,audioContext:n}}))},className:U([`px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-sm w-full`,` text-sm flex items-center gap-x-2 justify-center`]),children:e.audioNotificationsOptions.enabled?L(D,{children:L(`span`,{className:`flex items-center gap-x-1`,children:`Disable audio alerts`})}):L(D,{children:L(`span`,{className:`flex items-center gap-x-1`,children:`Enable audio alerts`})})})]})})]});switch(e.route){case`render-visualization`:return L(Wc,{children:L(zc,{selectedEvent:e.selectedEvent})});case`render-explanation`:if(!e.selectedFiber)throw Error(`Invariant: must have selected fiber when viewing render explanation`);return L(Wc,{children:L(Hc,{selectedFiber:e.selectedFiber,selectedEvent:e.selectedEvent})});case`other-visualization`:return L(Wc,{children:L(`div`,{className:U([`flex w-full h-full flex-col overflow-y-auto`]),id:`overview-scroll-container`,children:L(Sc,{selectedEvent:e.selectedEvent})})});case`optimize`:return L(Wc,{children:L(bc,{selectedEvent:e.selectedEvent})})}e.route},Wc=({children:e})=>{let{notificationState:t}=Qs();if(!t.selectedEvent)throw Error(`Invariant: d must have selected event when viewing render explanation`);return L(`div`,{className:U([`w-full h-full flex flex-col gap-y-2`]),children:[L(`div`,{className:U([`h-[50px] w-full`]),children:L(dc,{selectedEvent:t.selectedEvent})}),L(`div`,{className:U([`h-calc(100%-50px) flex flex-col overflow-y-auto px-3`]),children:e})]})},Gc=({selectedEvent:e})=>{let t=Zs(e);switch(e.kind){case`interaction`:return L(`div`,{className:U([`w-full flex border-b border-[#27272A] min-h-[48px]`]),children:L(`div`,{className:U([`min-w-fit w-full justify-start flex items-center border-r border-[#27272A] pl-5 pr-2 text-sm gap-x-4`]),children:[L(`div`,{className:U([`flex items-center gap-x-2 `]),children:[L(`span`,{className:U([`text-[#5a5a5a] mr-0.5`]),children:e.type===`click`?`Clicked `:`Typed in `}),L(`span`,{children:Ys(e.componentPath)}),L(`div`,{className:U([`w-fit flex items-center justify-center h-fit text-white px-1 rounded-sm font-semibold text-[10px] whitespace-nowrap`,t===`low`&&`bg-green-500/50`,t===`needs-improvement`&&`bg-[#b77116]`,t===`high`&&`bg-[#b94040]`]),children:[J(e.timing).toFixed(0),`ms processing time`]})]}),L(`div`,{className:U([`flex items-center gap-x-2  justify-end ml-auto`]),children:L(`div`,{className:U([`p-2 flex justify-center items-center border-[#27272A]`]),children:L(`button`,{onClick:()=>{G.value={view:`none`}},title:`Close`,children:L(nc,{size:18,className:`text-[#6F6F78]`})})})})]})});case`dropped-frames`:return L(`div`,{className:U([`w-full flex border-b border-[#27272A] min-h-[48px]`]),children:L(`div`,{className:U([`min-w-fit w-full justify-start flex items-center border-r border-[#27272A] pl-5 pr-2 text-sm gap-x-4`]),children:[L(`div`,{className:U([`flex items-center gap-x-2 `]),children:[`FPS Drop`,L(`div`,{className:U([`w-fit flex items-center justify-center h-fit text-white px-1 rounded-sm font-semibold text-[10px] whitespace-nowrap`,t===`low`&&`bg-green-500/50`,t===`needs-improvement`&&`bg-[#b77116]`,t===`high`&&`bg-[#b94040]`]),children:[`dropped to `,e.fps,` FPS`]})]}),L(`div`,{className:U([`flex items-center gap-x-2 w-2/4 justify-end ml-auto`]),children:L(`div`,{className:U([`p-2 flex justify-center items-center border-[#27272A]`]),children:L(`button`,{onClick:()=>{G.value={view:`none`}},children:L(nc,{size:18,className:`text-[#6F6F78]`})})})})]})})}},Kc=({flashingItemsCount:e,totalEvents:t})=>{let[n,r]=A(!1),i=M(0),a=M(0);return j(()=>{if(i.current>=t)return;let e=Date.now()-a.current;if(e>=250){r(!1);let e=setTimeout(()=>{i.current=t,a.current=Date.now(),r(!0),setTimeout(()=>{r(!1)},2e3)},50);return()=>clearTimeout(e)}else{let n=250-e,o=setTimeout(()=>{r(!1),setTimeout(()=>{i.current=t,a.current=Date.now(),r(!0),setTimeout(()=>{r(!1)},2e3)},50)},n);return()=>clearTimeout(o)}},[e]),n},qc=({item:e,shouldFlash:t})=>{let[n,r]=A(!1),i=e.events.map(Zs).reduce((e,t)=>{switch(t){case`high`:return`high`;case`needs-improvement`:return e===`high`?`high`:`needs-improvement`;case`low`:return e}},`low`),a=Kc({flashingItemsCount:e.events.reduce((e,n)=>t(n.id)?e+1:e,0),totalEvents:e.events.length});return L(`div`,{className:U([`flex flex-col gap-y-0.5`]),children:[L(`button`,{onClick:()=>r(e=>!e),className:U([`pl-2 py-1.5  text-sm flex items-center rounded-sm hover:bg-[#18181B] relative overflow-hidden`,a&&!n&&`after:absolute after:inset-0 after:bg-purple-500/30 after:animate-[fadeOut_1s_ease-out_forwards]`]),children:[L(`div`,{className:U([`w-4/5 flex items-center justify-start h-full text-xs truncate gap-x-1.5`]),children:[L(`span`,{className:U([`min-w-fit`]),children:L(ec,{className:U([`text-[#A1A1AA] transition-transform`,n?`rotate-90`:``]),size:14},`chevron-${e.timestamp}`)}),L(`span`,{className:U([`text-xs`]),children:e.kind===`collapsed-frame-drops`?`FPS Drops`:Ys(e.events.at(0)?.componentPath??[])})]}),L(`div`,{className:U([`ml-auto min-w-fit flex justify-end items-center`]),children:L(`div`,{style:{lineHeight:`10px`},className:U([`w-fit flex items-center text-[10px] justify-center h-full text-white px-1 py-1 rounded-sm font-semibold`,i===`low`&&`bg-green-500/60`,i===`needs-improvement`&&`bg-[#b77116] text-[10px]`,i===`high`&&`bg-[#b94040]`]),children:[`x`,e.events.length]})})]}),n&&L(Jc,{children:e.events.toSorted((e,t)=>t.timestamp-e.timestamp).map(e=>L(Zc,{event:e,shouldFlash:t(e.id)}))})]})},Jc=({children:e})=>L(`div`,{className:`relative pl-6 flex flex-col gap-y-1`,children:[L(`div`,{className:`absolute left-3 top-0 bottom-0 w-px bg-[#27272A]`}),e]}),Yc=e=>{let t=M([]),[n,r]=A(new Set),i=M(!0);return j(()=>{if(i.current){i.current=!1,t.current=e;return}let n=new Set(e.map(e=>e.id)),a=new Set(t.current.map(e=>e.id)),o=new Set;n.forEach(e=>{a.has(e)||o.add(e)}),o.size>0&&(r(o),setTimeout(()=>{r(new Set)},2e3)),t.current=e},[e]),e=>n.has(e)},Xc=({shouldFlash:e})=>{let[t,n]=A(e);return j(()=>{if(e){n(!0);let e=setTimeout(()=>{n(!1)},1e3);return()=>clearTimeout(e)}},[e]),t},Zc=({event:e,shouldFlash:t})=>{let{notificationState:n,setNotificationState:r}=Qs(),i=Zs(e),a=Xc({shouldFlash:t});switch(e.kind){case`interaction`:return L(`button`,{onClick:()=>{r(t=>({...t,selectedEvent:e,route:`render-visualization`,selectedFiber:null}))},className:U([`pl-2 py-1.5  text-sm flex w-full items-center rounded-sm hover:bg-[#18181B] relative overflow-hidden`,e.id===n.selectedEvent?.id&&`bg-[#18181B]`,a&&`after:absolute after:inset-0 after:bg-purple-500/30 after:animate-[fadeOut_1s_ease-out_forwards]`]),children:[L(`div`,{className:U([`w-4/5 flex items-center justify-start h-full gap-x-1.5`]),children:[L(`span`,{className:U([`min-w-fit text-xs`]),children:es(()=>{switch(e.type){case`click`:return L(oc,{size:14});case`keyboard`:return L(sc,{size:14})}})}),L(`span`,{className:U([`text-xs pr-1 truncate`]),children:Ys(e.componentPath)})]}),L(`div`,{className:U([` min-w-fit flex justify-end items-center ml-auto`]),children:L(`div`,{style:{lineHeight:`10px`},className:U([`gap-x-0.5 w-fit flex items-end justify-center h-full text-white px-1 py-1 rounded-sm font-semibold text-[10px]`,i===`low`&&`bg-green-500/50`,i===`needs-improvement`&&`bg-[#b77116] text-[10px]`,i===`high`&&`bg-[#b94040]`]),children:L(`div`,{style:{lineHeight:`10px`},className:U([`text-[10px] text-white flex items-end`]),children:[J(e.timing).toFixed(0),`ms`]})})})]});case`dropped-frames`:return L(`button`,{onClick:()=>{r(t=>({...t,selectedEvent:e,route:`render-visualization`,selectedFiber:null}))},className:U([`pl-2 py-1.5  w-full text-sm flex items-center rounded-sm hover:bg-[#18181B] relative overflow-hidden`,e.id===n.selectedEvent?.id&&`bg-[#18181B]`,a&&`after:absolute after:inset-0 after:bg-purple-500/30 after:animate-[fadeOut_1s_ease-out_forwards]`]),children:[L(`div`,{className:U([`w-4/5 flex items-center justify-start h-full text-xs truncate`]),children:[L(lc,{size:14,className:`mr-1.5`}),` FPS Drop`]}),L(`div`,{className:U([` min-w-fit flex justify-end items-center ml-auto`]),children:L(`div`,{style:{lineHeight:`10px`},className:U([`w-fit flex items-center justify-center h-full text-white px-1 py-1 rounded-sm text-[10px] font-bold`,i===`low`&&`bg-green-500/60`,i===`needs-improvement`&&`bg-[#b77116] text-[10px]`,i===`high`&&`bg-[#b94040]`]),children:[e.fps,` FPS`]})})]})}},Qc=e=>e.reduce((e,t)=>{let n=e.at(-1);if(!n)return[{kind:`single`,event:t,timestamp:t.timestamp}];switch(n.kind){case`collapsed-keyboard`:return t.kind===`interaction`&&t.type===`keyboard`&&t.componentPath.join(`-`)===n.events[0].componentPath.join(`-`)?[...e.filter(e=>e!==n),{kind:`collapsed-keyboard`,events:[...n.events,t],timestamp:Math.max(...[...n.events,t].map(e=>e.timestamp))}]:[...e,{kind:`single`,event:t,timestamp:t.timestamp}];case`single`:return n.event.kind===`interaction`&&n.event.type===`keyboard`&&t.kind===`interaction`&&t.type===`keyboard`&&n.event.componentPath.join(`-`)===t.componentPath.join(`-`)?[...e.filter(e=>e!==n),{kind:`collapsed-keyboard`,events:[n.event,t],timestamp:Math.max(n.event.timestamp,t.timestamp)}]:n.event.kind===`dropped-frames`&&t.kind===`dropped-frames`?[...e.filter(e=>e!==n),{kind:`collapsed-frame-drops`,events:[n.event,t],timestamp:Math.max(n.event.timestamp,t.timestamp)}]:[...e,{kind:`single`,event:t,timestamp:t.timestamp}];case`collapsed-frame-drops`:return t.kind===`dropped-frames`?[...e.filter(e=>e!==n),{kind:`collapsed-frame-drops`,events:[...n.events,t],timestamp:Math.max(...[...n.events,t].map(e=>e.timestamp))}]:[...e,{kind:`single`,event:t,timestamp:t.timestamp}]}},[]),$c=(e=150)=>{let{notificationState:t}=Qs(),[n,r]=A(t.events);return j(()=>{setTimeout(()=>{r(t.events)},e)},[t.events]),[n,r]},el=()=>{let{notificationState:e,setNotificationState:t}=Qs(),n=Yc(e.events),[r,i]=$c(),a=Qc(r).toSorted((e,t)=>t.timestamp-e.timestamp);return L(`div`,{className:U([`w-full h-full gap-y-2 flex flex-col border-r border-[#27272A] overflow-y-auto`]),children:[L(`div`,{className:U([`text-sm text-[#65656D] pl-3 pr-1 w-full flex items-center justify-between`]),children:[L(`span`,{children:`History`}),L(uc,{wrapperProps:{className:`h-full flex items-center justify-center ml-auto`},triggerContent:L(`button`,{className:U([`hover:bg-[#18181B] rounded-full p-2`]),title:`Clear all events`,onClick:()=>{Ls.getState().actions.clear(),t(e=>({...e,selectedEvent:null,selectedFiber:null,route:e.route===`other-visualization`?`other-visualization`:`render-visualization`})),i([])},children:L(cc,{className:U([``]),size:16})}),children:L(`div`,{className:U([`w-full flex justify-center`]),children:`Clear all events`})})]}),L(`div`,{className:U([`flex flex-col px-1 gap-y-1`]),children:[a.length===0&&L(`div`,{className:U([`flex items-center justify-center text-zinc-500 text-sm py-4`]),children:`No Events`}),a.map(e=>es(()=>{switch(e.kind){case`collapsed-keyboard`:return L(qc,{shouldFlash:n,item:e});case`single`:return L(Zc,{event:e.event,shouldFlash:n(e.event.id)},e.event.id);case`collapsed-frame-drops`:return L(qc,{shouldFlash:n,item:e})}}))]})]})},tl=e=>Object.values(e).map(e=>({id:yn(),totalTime:e.nodeInfo.reduce((e,t)=>e+t.selfTime,0),count:e.nodeInfo.length,name:e.nodeInfo[0].name,deletedAll:!1,parents:e.parents,hasMemoCache:e.hasMemoCache,wasFiberRenderMount:e.wasFiberRenderMount,elements:e.nodeInfo.map(e=>e.element),changes:{context:e.changes.fiberContext.current.filter(t=>e.changes.fiberContext.changesCounts.get(t.name)).map(t=>({name:String(t.name),count:e.changes.fiberContext.changesCounts.get(t.name)??0})),props:e.changes.fiberProps.current.filter(t=>e.changes.fiberProps.changesCounts.get(t.name)).map(t=>({name:String(t.name),count:e.changes.fiberProps.changesCounts.get(t.name)??0})),state:e.changes.fiberState.current.filter(t=>e.changes.fiberState.changesCounts.get(Number(t.name))).map(t=>({index:t.name,count:e.changes.fiberState.changesCounts.get(Number(t.name))??0}))}})),nl=e=>{j(()=>{let t=setInterval(()=>{e.forEach(e=>{e.groupedFiberRenders&&e.groupedFiberRenders.forEach(e=>{if(e.deletedAll)return;if(!e.elements||e.elements.length===0){e.deletedAll=!0;return}let t=e.elements.length;e.elements=e.elements.filter(e=>e&&e.isConnected),e.elements.length===0&&t>0&&(e.deletedAll=!0)})})},5e3);return()=>{clearInterval(t)}},[e])},rl=()=>{let e=Rs(),t=[];return nl(t),e.state.events.forEach(e=>{let n=tl(e.kind===`interaction`?e.data.meta.detailedTiming.fiberRenders:e.data.meta.fiberRenders),r=n.reduce((e,t)=>e+t.totalTime,0);switch(e.kind){case`interaction`:{let{commitEnd:i,jsEndDetail:a,interactionStartDetail:o,rafStart:s}=e.data.meta.detailedTiming;a-o-r<0&&$o(`js time must be longer than render time`);let c=Math.max(0,a-o-r),l=Math.max(e.data.meta.latency-(i-o),0);t.push({componentPath:e.data.meta.detailedTiming.componentPath,groupedFiberRenders:n,id:e.id,kind:`interaction`,memory:null,timestamp:e.data.startAt,type:e.data.meta.detailedTiming.interactionType===`keyboard`?`keyboard`:`click`,timing:{renderTime:r,kind:`interaction`,otherJSTime:c,framePreparation:s-a,frameConstruction:i-s,frameDraw:l}});return}case`long-render`:t.push({kind:`dropped-frames`,id:e.id,memory:null,timing:{kind:`dropped-frames`,renderTime:r,otherTime:e.data.meta.latency},groupedFiberRenders:n,timestamp:e.data.startAt,fps:e.data.meta.fps});return}}),t},il=1e3,al=()=>{let{notificationState:e,setNotificationState:t}=Qs(),n=M(null),r=M(null),i=M(0),[a]=$c(),o=a.filter(e=>Zs(e)===`high`).length;return j(()=>{let e=localStorage.getItem(`react-scan-notifications-audio`);if(e!==`false`&&e!==`true`){localStorage.setItem(`react-scan-notifications-audio`,`false`);return}if(e!==`false`){t(e=>e.audioNotificationsOptions.enabled?e:{...e,audioNotificationsOptions:{enabled:!0,audioContext:new AudioContext}});return}},[]),j(()=>{let{audioNotificationsOptions:t}=e;if(!t.enabled||o===0||n.current&&n.current>=o)return;r.current&&clearTimeout(r.current);let a=Date.now()-i.current,s=Math.max(0,il-a);r.current=setTimeout(()=>{bn(t.audioContext),n.current=o,i.current=Date.now(),r.current=null},s)},[o]),j(()=>{o===0&&(n.current=null)},[o]),j(()=>()=>{r.current&&clearTimeout(r.current)},[]),null},ol=Vt((e,t)=>{let n=rl(),[r,i]=A({detailsExpanded:!1,events:n,filterBy:`latest`,moreInfoExpanded:!1,route:`render-visualization`,selectedEvent:n.toSorted((e,t)=>e.timestamp-t.timestamp).at(-1)??null,selectedFiber:null,routeMessage:null,audioNotificationsOptions:{enabled:!1,audioContext:null}});return r.events=n,L($s.Provider,{value:{notificationState:r,setNotificationState:i,setRoute:({route:e,routeMessage:t})=>{i(n=>{let r={...n,route:e,routeMessage:t};switch(e){case`render-visualization`:return Rc(),{...r,selectedFiber:null};case`optimize`:return Rc(),{...r,selectedFiber:null};case`other-visualization`:return Rc(),{...r,selectedFiber:null};case`render-explanation`:return Rc(),r}})}},children:[L(al,{}),L(sl,{ref:t})]})}),sl=Vt((e,t)=>{let{notificationState:n}=Qs();return L(`div`,{ref:t,className:U([`h-full w-full flex flex-col`]),children:[n.selectedEvent&&L(`div`,{className:U([`w-full h-[48px] flex flex-col`,n.moreInfoExpanded&&`h-[235px]`,n.moreInfoExpanded&&n.selectedEvent.kind===`dropped-frames`&&`h-[150px]`]),children:[L(Gc,{selectedEvent:n.selectedEvent}),n.moreInfoExpanded&&L(cl,{})]}),L(`div`,{className:U([`flex `,n.selectedEvent?`h-[calc(100%-48px)]`:`h-full`,n.moreInfoExpanded&&`h-[calc(100%-200px)]`,n.moreInfoExpanded&&n.selectedEvent?.kind===`dropped-frames`&&`h-[calc(100%-150px)]`]),children:[L(`div`,{className:U([`h-full min-w-[200px]`]),children:L(el,{})}),L(`div`,{className:U([`w-[calc(100%-200px)] h-full overflow-y-auto`]),children:L(Uc,{})})]})]})}),cl=()=>{let{notificationState:e}=Qs();if(!e.selectedEvent)throw Error(`Invariant must have selected event for more info`);let t=e.selectedEvent;return L(`div`,{className:U([`px-4 py-2 border-b border-[#27272A] bg-[#18181B]/50 h-[calc(100%-40px)]`,t.kind===`dropped-frames`&&`h-[calc(100%-25px)]`]),children:L(`div`,{className:U([`flex flex-col gap-y-4 h-full`]),children:es(()=>{switch(t.kind){case`interaction`:return L(D,{children:[L(`div`,{className:U([`flex items-center gap-x-3`]),children:[L(`span`,{className:`text-[#6F6F78] text-xs font-medium`,children:t.type===`click`?`Clicked component location`:`Typed in component location`}),L(`div`,{className:`font-mono text-[#E4E4E7] flex items-center bg-[#27272A] pl-2 py-1 rounded-sm overflow-x-auto`,children:t.componentPath.toReversed().map((e,n)=>L(D,{children:[L(`span`,{style:{lineHeight:`14px`},className:`text-[10px] whitespace-nowrap`,children:e},e),n<t.componentPath.length-1&&L(`span`,{className:`text-[#6F6F78] mx-0.5`,children:`‹`})]}))})]}),L(`div`,{className:U([`flex items-center gap-x-3`]),children:[L(`span`,{className:`text-[#6F6F78] text-xs font-medium`,children:`Total Time`}),L(`span`,{className:`text-[#E4E4E7] bg-[#27272A] px-1.5 py-1 rounded-sm text-xs`,children:[J(t.timing).toFixed(0),`ms`]})]}),L(`div`,{className:U([`flex items-center gap-x-3`]),children:[L(`span`,{className:`text-[#6F6F78] text-xs font-medium`,children:`Occurred`}),L(`span`,{className:`text-[#E4E4E7] bg-[#27272A] px-1.5 py-1 rounded-sm text-xs`,children:`${((Date.now()-t.timestamp)/1e3).toFixed(0)}s ago`})]})]});case`dropped-frames`:return L(D,{children:[L(`div`,{className:U([`flex items-center gap-x-3`]),children:[L(`span`,{className:`text-[#6F6F78] text-xs font-medium`,children:`Total Time`}),L(`span`,{className:`text-[#E4E4E7] bg-[#27272A] px-1.5 py-1 rounded-sm text-xs`,children:[J(t.timing).toFixed(0),`ms`]})]}),L(`div`,{className:U([`flex items-center gap-x-3`]),children:[L(`span`,{className:`text-[#6F6F78] text-xs font-medium`,children:`Occurred`}),L(`span`,{className:`text-[#E4E4E7] bg-[#27272A] px-1.5 py-1 rounded-sm text-xs`,children:`${((Date.now()-t.timestamp)/1e3).toFixed(0)}s ago`})]})]})}})})})},ll=Pr(()=>{let e=rl(),[t,n]=A(e);j(()=>{let t=setTimeout(()=>{n(e)},600);return()=>{clearTimeout(t)}},[e]);let r=Q.inspectState,i=r.value.kind===`inspecting`,a=r.value.kind===`focused`,[o,s]=A([]),c=N(()=>{switch(Q.inspectState.value.kind){case`inspecting`:G.value={view:`none`},Q.inspectState.value={kind:`inspect-off`};return;case`focused`:G.value={view:`inspector`},Q.inspectState.value={kind:`inspecting`,hoveredDomElement:null};return;case`inspect-off`:G.value={view:`none`},Q.inspectState.value={kind:`inspecting`,hoveredDomElement:null};return;case`uninitialized`:return}},[]),l=N(e=>{if(e.preventDefault(),e.stopPropagation(),!$.instrumentation)return;let t=!$.instrumentation.isPaused.value;$.instrumentation.isPaused.value=t,Cr(`react-scan-options`,{...Sr(`react-scan-options`),enabled:!t})},[]);Mt(()=>{Q.inspectState.value.kind===`uninitialized`&&(Q.inspectState.value={kind:`inspect-off`})});let u=null,d=`#999`;return i?(u=L(R,{name:`icon-inspect`}),d=`#8e61e3`):a?(u=L(R,{name:`icon-focus`}),d=`#8e61e3`):(u=L(R,{name:`icon-inspect`}),d=`#999`),Ye(()=>{G.value.view===`notifications`&&s([...new Set(e.map(e=>e.id)).values()])},[e.length,G.value.view]),L(`div`,{className:`flex max-h-9 min-h-9 flex-1 items-stretch overflow-hidden`,children:[L(`div`,{className:`h-full flex items-center min-w-fit`,children:L(`button`,{type:`button`,id:`react-scan-inspect-element`,title:`Inspect element`,onClick:c,className:`button flex items-center justify-center h-full w-full pl-3 pr-2.5`,style:{color:d},children:u})}),L(`div`,{className:`h-full flex items-center justify-center`,children:L(`button`,{type:`button`,id:`react-scan-notifications`,title:`Notifications`,onClick:()=>{switch(Q.inspectState.value.kind!==`inspect-off`&&(Q.inspectState.value={kind:`inspect-off`}),G.value.view){case`inspector`:Q.inspectState.value={kind:`inspect-off`},s([...new Set(e.map(e=>e.id)).values()]),G.value={view:`notifications`};return;case`notifications`:G.value={view:`none`};return;case`none`:s([...new Set(e.map(e=>e.id)).values()]),G.value={view:`notifications`};return}},className:`button flex items-center justify-center h-full pl-2.5 pr-2.5`,style:{color:d},children:L(tc,{events:t.filter(e=>!o.includes(e.id)).map(e=>Zs(e)===`high`),size:16,className:U([`text-[#999]`,G.value.view===`notifications`&&`text-[#8E61E3]`])})})}),L(Yo,{checked:!$.instrumentation?.isPaused.value,onChange:l,className:`place-self-center`,title:`Outline Re-renders`}),$.options.value.showFPS&&L(Zo,{})]})}),ul=bt(()=>Q.inspectState.value.kind===`inspecting`),dl=bt(()=>U(`relative`,`flex-1`,`flex flex-col`,`rounded-t-lg`,`overflow-hidden`,`opacity-100`,`transition-[opacity]`,ul.value&&`opacity-0 duration-0 delay-0`)),fl=bt(()=>G.value.view===`inspector`),pl=bt(()=>G.value.view===`notifications`),ml=()=>L(`div`,{className:U(`flex flex-1 flex-col`,`overflow-hidden z-10`,`rounded-lg`,`bg-black`,`opacity-100`,`transition-[border-radius]`,`peer-hover/left:rounded-l-none`,`peer-hover/right:rounded-r-none`,`peer-hover/top:rounded-t-none`,`peer-hover/bottom:rounded-b-none`),children:[L(`div`,{className:dl,children:[L(Jo,{}),L(`div`,{className:U(`relative`,`flex-1 flex`,`text-white`,`bg-[#0A0A0A]`,`transition-opacity delay-150`,`overflow-hidden`,`border-b border-[#222]`),children:[L(hl,{isOpen:fl,children:L(Ni,{})}),L(hl,{isOpen:pl,children:L(ol,{})})]})]}),L(ll,{})]}),hl=({isOpen:e,children:t})=>L(`div`,{className:U(`flex-1`,`opacity-0`,`overflow-y-auto overflow-x-hidden`,`transition-opacity delay-0`,`pointer-events-none`,e.value&&`opacity-100 delay-150 pointer-events-auto`),children:L(`div`,{className:`absolute inset-0 flex`,children:t})}),gl=(e,t,n)=>e+(t-e)*n,_l={frameInterval:1e3/60,speeds:{fast:.51,slow:.1,off:0}},vl=fn&&window.devicePixelRatio||1,yl=()=>{let e=M(null),t=M(null),n=M(null),r=M(null),i=M(null),a=M(0),o=M(),s=M(new Map),c=M(!1),u=M(0),d=(e,t,n,r)=>{e.save(),e.strokeStyle=`white`,e.fillStyle=`white`,e.lineWidth=1.5;let i=r*.6,a=r*.5,o=t+(r-i)/2,s=n;e.beginPath(),e.arc(o+i/2,s+a/2,i/2,Math.PI,0,!1),e.stroke();let c=r*.8,l=r*.5,u=t+(r-c)/2,d=n+a/2;e.fillRect(u,d,c,l),e.restore()},f=(e,t,n,i)=>{if(!i)return;let a=(i?.type&&l(i.type))??`Unknown`;e.save(),e.font=`12px system-ui, -apple-system, sans-serif`;let o=e.measureText(a).width,s=n===`locked`?14:0,c=n===`locked`?6:0,u=o+16+s+c,f=t.left,p=t.top-24-4;if(e.fillStyle=`rgb(37, 37, 38, .75)`,e.beginPath(),e.roundRect(f,p,u,24,3),e.fill(),n===`locked`){let t=f+8,n=p+(24-s)/2+2;d(e,t,n,s),r.current={x:t,y:n,width:s,height:s}}else r.current=null;e.fillStyle=`white`,e.textBaseline=`middle`;let m=f+8+(n===`locked`?s+c:0);e.fillText(a,m,p+24/2),e.restore()},p=(e,t,r,i)=>{if(!n.current)return;let a=n.current;t.clearRect(0,0,e.width,e.height),t.strokeStyle=`rgba(142, 97, 227, 0.5)`,t.fillStyle=`rgba(173, 97, 230, 0.10)`,r===`locked`?t.setLineDash([]):t.setLineDash([4]),t.lineWidth=1,t.fillRect(a.left,a.top,a.width,a.height),t.strokeRect(a.left,a.top,a.width,a.height),f(t,a,r,i)},m=(e,t,r,i,s,c)=>{let l=$.options.value.animationSpeed,d=_l.speeds[l]??_l.speeds.off,f=o=>{if(o-u.current<_l.frameInterval){a.current=requestAnimationFrame(f);return}if(u.current=o,!n.current){cancelAnimationFrame(a.current);return}n.current={left:gl(n.current.left,r.left,d),top:gl(n.current.top,r.top,d),width:gl(n.current.width,r.width,d),height:gl(n.current.height,r.height,d)},p(e,t,i,s),Math.abs(n.current.left-r.left)>.1||Math.abs(n.current.top-r.top)>.1||Math.abs(n.current.width-r.width)>.1||Math.abs(n.current.height-r.height)>.1?a.current=requestAnimationFrame(f):(n.current=r,p(e,t,i,s),cancelAnimationFrame(a.current),t.restore(),c?.())};cancelAnimationFrame(a.current),clearTimeout(o.current),a.current=requestAnimationFrame(f),o.current=setTimeout(()=>{cancelAnimationFrame(a.current),n.current=r,p(e,t,i,s),t.restore(),c?.()},1e3)},h=(e,t,r,i,a)=>{if(t.save(),!n.current){n.current=r,p(e,t,i,a),t.restore();return}m(e,t,r,i,a)},g=async(e,t,n,r)=>{if(!e||!t||!n)return;let{parentCompositeFiber:i}=Bi(e),a=await zi(e);!i||!a||h(t,n,a,r,i)},_=()=>{for(let e of s.current.values())e?.()},v=e=>{let t=e.getContext(`2d`);t&&t.clearRect(0,0,e.width,e.height),n.current=null,r.current=null,i.current=null,e.classList.remove(`fade-in`),c.current=!1},y=t=>{if(!e.current||c.current)return;let n=r=>{!e.current||r.propertyName!==`opacity`||!c.current||(e.current.removeEventListener(`transitionend`,n),v(e.current),t?.())},r=s.current.get(`fade-out`);r&&(r(),s.current.delete(`fade-out`)),e.current.addEventListener(`transitionend`,n),s.current.set(`fade-out`,()=>{e.current?.removeEventListener(`transitionend`,n)}),c.current=!0,e.current.classList.remove(`fade-in`),requestAnimationFrame(()=>{e.current?.classList.add(`fade-out`)})},b=()=>{e.current&&(c.current=!1,e.current.classList.remove(`fade-out`),requestAnimationFrame(()=>{e.current?.classList.add(`fade-in`)}))},x=e=>{e!==i.current&&(i.current=e,Ui.has(e.tagName)?y():b(),Q.inspectState.value={kind:`inspecting`,hoveredDomElement:e})},S=()=>{!n.current||!e.current||c.current||y()},ee=xr(n=>{if(Q.inspectState.peek().kind!==`inspecting`||!t.current)return;t.current.style.pointerEvents=`none`;let r=document.elementFromPoint(n?.clientX??0,n?.clientY??0);if(t.current.style.removeProperty(`pointer-events`),clearTimeout(o.current),r&&r!==e.current){let{parentCompositeFiber:e}=Bi(r);if(e){let t=Wi(e);if(t){x(t);return}}}S()},32),C=(e,t)=>{let n=r.current;if(!n)return!1;let i=t.getBoundingClientRect(),a=t.width/i.width,o=t.height/i.height,s=(e.clientX-i.left)*a,c=(e.clientY-i.top)*o,l=s/vl,u=c/vl;return l>=n.x&&l<=n.x+n.width&&u>=n.y&&u<=n.y+n.height},te=e=>{e.kind===`focused`&&(Q.inspectState.value={kind:`inspecting`,hoveredDomElement:e.focusedDomElement})},w=e=>{let t=[`react-scan-inspect-element`,`react-scan-power`];if(e.target instanceof HTMLElement&&t.includes(e.target.id))return;let n=i.current?.tagName;if(n&&Ui.has(n))return;e.preventDefault(),e.stopPropagation();let r=i.current??document.elementFromPoint(e.clientX,e.clientY);if(!r)return;let a=e.composedPath().at(0);if(a instanceof HTMLElement&&t.includes(a.id)){let t=new MouseEvent(e.type,e);t.__reactScanSyntheticEvent=!0,a.dispatchEvent(t);return}let{parentCompositeFiber:o}=Bi(r);if(!o)return;let s=Wi(o);if(!s){i.current=null,Q.inspectState.value={kind:`inspect-off`};return}Q.inspectState.value={kind:`focused`,focusedDomElement:s,fiber:o}},ne=n=>{if(n.__reactScanSyntheticEvent)return;let r=Q.inspectState.peek(),i=e.current;if(!(!i||!t.current)){if(C(n,i)){n.preventDefault(),n.stopPropagation(),te(r);return}r.kind===`inspecting`&&w(n)}},T=t=>{if(t.key!==`Escape`)return;let r=Q.inspectState.peek();if(e.current&&document.activeElement?.id!==`react-scan-root`&&(G.value={view:`none`},r.kind===`focused`||r.kind===`inspecting`))switch(t.preventDefault(),t.stopPropagation(),r.kind){case`focused`:b(),n.current=null,i.current=r.focusedDomElement,Q.inspectState.value={kind:`inspecting`,hoveredDomElement:r.focusedDomElement};break;case`inspecting`:y(()=>{Or.value=!1,Q.inspectState.value={kind:`inspect-off`}});break}},re=(e,r,o)=>{s.current.get(e.kind)?.(),t.current&&e.kind!==`inspecting`&&(t.current.style.pointerEvents=`none`),a.current&&cancelAnimationFrame(a.current);let c;switch(e.kind){case`inspect-off`:y();return;case`inspecting`:g(e.hoveredDomElement,r,o,`inspecting`);break;case`focused`:if(!e.focusedDomElement)return;i.current!==e.focusedDomElement&&(i.current=e.focusedDomElement),G.value={view:`inspector`},g(e.focusedDomElement,r,o,`locked`),c=Q.lastReportTime.subscribe(()=>{if(a.current&&n.current){let{parentCompositeFiber:t}=Bi(e.focusedDomElement);t&&g(e.focusedDomElement,r,o,`locked`)}}),c&&s.current.set(e.kind,c);break}},ie=(e,t)=>{let n=e.getBoundingClientRect();e.width=n.width*vl,e.height=n.height*vl,t.scale(vl,vl),t.save()},ae=()=>{let t=Q.inspectState.peek(),r=e.current;if(!r)return;let i=r?.getContext(`2d`);i&&(cancelAnimationFrame(a.current),clearTimeout(o.current),ie(r,i),n.current=null,t.kind===`focused`&&t.focusedDomElement?g(t.focusedDomElement,r,i,`locked`):t.kind===`inspecting`&&t.hoveredDomElement&&g(t.hoveredDomElement,r,i,`inspecting`))},oe=t=>{let n=Q.inspectState.peek(),r=e.current;r&&(n.kind===`inspecting`||C(t,r))&&(t.preventDefault(),t.stopPropagation(),t.stopImmediatePropagation())};return j(()=>{let t=e.current;if(!t)return;let n=t?.getContext(`2d`);if(!n)return;ie(t,n);let r=Q.inspectState.subscribe(e=>{re(e,t,n)});return window.addEventListener(`scroll`,ae,{passive:!0}),window.addEventListener(`resize`,ae,{passive:!0}),document.addEventListener(`pointermove`,ee,{passive:!0,capture:!0}),document.addEventListener(`pointerdown`,oe,{capture:!0}),document.addEventListener(`click`,ne,{capture:!0}),document.addEventListener(`keydown`,T,{capture:!0}),()=>{_(),r(),window.removeEventListener(`scroll`,ae),window.removeEventListener(`resize`,ae),document.removeEventListener(`pointermove`,ee,{capture:!0}),document.removeEventListener(`click`,ne,{capture:!0}),document.removeEventListener(`pointerdown`,oe,{capture:!0}),document.removeEventListener(`keydown`,T,{capture:!0}),a.current&&cancelAnimationFrame(a.current),clearTimeout(o.current)}},[]),L(D,{children:[L(`div`,{ref:t,className:U(`fixed top-0 left-0 w-screen h-screen`,`z-[214748365]`),style:{pointerEvents:`none`}}),L(`canvas`,{ref:e,dir:`ltr`,className:U(`react-scan-inspector-overlay`,`fixed top-0 left-0 w-screen h-screen`,`pointer-events-none`,`z-[214748367]`)})]})},bl=class{constructor(e,t){this.width=e,this.height=t,this.maxWidth=e-z*2,this.maxHeight=t-z*2}rightEdge(e){return this.width-e-z}bottomEdge(e){return this.height-e-z}isFullWidth(e){return e>=this.maxWidth}isFullHeight(e){return e>=this.maxHeight}},xl,Sl=()=>{let e=window.innerWidth,t=window.innerHeight;return xl&&xl.width===e&&xl.height===t||(xl=new bl(e,t)),xl},Cl=(e,t,n,r,i)=>{if(n){if(e===`top-left`)return`bottom-right`;if(e===`top-right`)return`bottom-left`;if(e===`bottom-left`)return`top-right`;if(e===`bottom-right`)return`top-left`;let[n,r]=t.split(`-`);if(e===`left`)return`${n}-right`;if(e===`right`)return`${n}-left`;if(e===`top`)return`bottom-${r}`;if(e===`bottom`)return`top-${r}`}if(r){if(e===`left`)return`${t.split(`-`)[0]}-right`;if(e===`right`)return`${t.split(`-`)[0]}-left`}if(i){if(e===`top`)return`bottom-${t.split(`-`)[1]}`;if(e===`bottom`)return`top-${t.split(`-`)[1]}`}return t},wl=(e,t,n)=>{let r=getComputedStyle(document.body).direction===`rtl`,i=window.innerWidth,a=window.innerHeight,o=t===B.width,s=o?t:Math.min(t,i-z*2),c=o?n:Math.min(n,a-z*2),l,u,d=z,f=i-s-z,p=z,m=a-c-z;switch(e){case`top-right`:l=r?-d:f,u=p;break;case`bottom-right`:l=r?-d:f,u=m;break;case`bottom-left`:l=r?-f:d,u=m;break;case`top-left`:l=r?-f:d,u=p;break;default:l=d,u=p;break}return o&&(l=r?Math.min(-d,Math.max(l,-f)):Math.max(d,Math.min(l,f)),u=Math.max(p,Math.min(u,m))),{x:l,y:u}},Tl=(e,t)=>{let[n,r]=t.split(`-`);return e!==n&&e!==r},El=(e,t,n,r)=>n&&r?!0:!n&&!r?Tl(e,t):n?e!==t.split(`-`)[0]:r?e!==t.split(`-`)[1]:!1,Dl=(e,t,n)=>{let r=n?B.width:B.initialHeight,i=n?Sl().maxWidth:Sl().maxHeight,a=e+t;return Math.min(Math.max(r,a),i)},Ol=(e,t,n,r,i)=>{let a=getComputedStyle(document.body).direction===`rtl`,o=window.innerWidth-z*2,s=window.innerHeight-z*2,c=t.width,l=t.height,u=n.x,d=n.y;if(a&&e.includes(`right`)){let e=-n.x+t.width-z,i=Math.min(t.width+r,e);c=Math.min(o,Math.max(B.width,i)),u=n.x+(c-t.width)}if(a&&e.includes(`left`)){let e=window.innerWidth-n.x-z,i=Math.min(t.width-r,e);c=Math.min(o,Math.max(B.width,i))}if(!a&&e.includes(`right`)){let e=window.innerWidth-n.x-z,i=Math.min(t.width+r,e);c=Math.min(o,Math.max(B.width,i))}if(!a&&e.includes(`left`)){let e=n.x+t.width-z,i=Math.min(t.width-r,e);c=Math.min(o,Math.max(B.width,i)),u=n.x-(c-t.width)}if(e.includes(`bottom`)){let e=window.innerHeight-n.y-z,r=Math.min(t.height+i,e);l=Math.min(s,Math.max(B.initialHeight,r))}if(e.includes(`top`)){let e=n.y+t.height-z,r=Math.min(t.height-i,e);l=Math.min(s,Math.max(B.initialHeight,r)),d=n.y-(l-t.height)}let f=z,p=window.innerWidth-z-c,m=z,h=window.innerHeight-z-l;return u=a?Math.min(-f,Math.max(u,-p)):Math.max(f,Math.min(u,p)),d=Math.max(m,Math.min(d,h)),{newSize:{width:c,height:l},newPosition:{x:u,y:d}}},kl=e=>{let t=Sl(),n={"top-left":Math.hypot(e.x,e.y),"top-right":Math.hypot(t.maxWidth-e.x,e.y),"bottom-left":Math.hypot(e.x,t.maxHeight-e.y),"bottom-right":Math.hypot(t.maxWidth-e.x,t.maxHeight-e.y)},r=`top-left`;for(let e in n)n[e]<n[r]&&(r=e);return r},Al=(e,t,n,r,i=100)=>{let a=n===void 0?0:e-n,o=r===void 0?0:t-r,s=window.innerWidth/2,c=window.innerHeight/2,l=a>i,u=a<-i,d=o>i,f=o<-i;if(l||u){let e=t>c;return l?e?`bottom-right`:`top-right`:e?`bottom-left`:`top-left`}if(d||f){let t=e>s;return d?t?`bottom-right`:`bottom-left`:t?`top-right`:`top-left`}return e>s?t>c?`bottom-right`:`top-right`:t>c?`bottom-left`:`top-left`},jl=({position:e})=>{let t=M(null),n=M(null),r=M(null),i=M(null);return j(()=>{let a=t.current;if(!a)return;let o=()=>{a.classList.remove(`pointer-events-none`);let t=Q.inspectState.value.kind===`focused`,n=G.value.view!==`none`;(t||n)&&El(e,W.value.corner,W.value.dimensions.isFullWidth,W.value.dimensions.isFullHeight)?a.classList.remove(`hidden`,`pointer-events-none`,`opacity-0`):a.classList.add(`hidden`,`pointer-events-none`,`opacity-0`)},s=W.subscribe(e=>{n.current!==null&&r.current!==null&&i.current!==null&&e.dimensions.width===n.current&&e.dimensions.height===r.current&&e.corner===i.current||(o(),n.current=e.dimensions.width,r.current=e.dimensions.height,i.current=e.corner)}),c=Q.inspectState.subscribe(()=>{o()});return()=>{s(),c(),n.current=null,r.current=null,i.current=null}},[]),L(`div`,{ref:t,onPointerDown:N(t=>{t.preventDefault(),t.stopPropagation();let n=kr.value;if(!n)return;let r=n.style,{dimensions:i}=W.value,a=t.clientX,o=t.clientY,s=i.width,c=i.height,l=i.position;W.value={...W.value,dimensions:{...i,isFullWidth:!1,isFullHeight:!1,width:s,height:c,position:l}};let u=null,d=t=>{u||=(r.transition=`none`,requestAnimationFrame(()=>{let{newSize:n,newPosition:i}=Ol(e,{width:s,height:c},l,t.clientX-a,t.clientY-o);r.transform=`translate3d(${i.x}px, ${i.y}px, 0)`,r.width=`${n.width}px`,r.height=`${n.height}px`;let d=Math.floor(n.width-xn/2),f=W.value.componentsTree.width,p=Math.min(d,Math.max(xn,f));W.value={...W.value,dimensions:{isFullWidth:!1,isFullHeight:!1,width:n.width,height:n.height,position:i},componentsTree:{...W.value.componentsTree,width:p}},u=null}))},f=()=>{u&&=(cancelAnimationFrame(u),null),document.removeEventListener(`pointermove`,d),document.removeEventListener(`pointerup`,f);let{dimensions:e,corner:t}=W.value,i=Sl(),a=i.isFullWidth(e.width),o=i.isFullHeight(e.height),s=a&&o,c=t;(s||a||o)&&(c=kl(e.position));let l=wl(c,e.width,e.height),p=()=>{n.removeEventListener(`transitionend`,p)};n.addEventListener(`transitionend`,p),r.transform=`translate3d(${l.x}px, ${l.y}px, 0)`,W.value={...W.value,corner:c,dimensions:{isFullWidth:a,isFullHeight:o,width:e.width,height:e.height,position:l},lastDimensions:{isFullWidth:a,isFullHeight:o,width:e.width,height:e.height,position:l}},Cr(Sn,{corner:c,dimensions:W.value.dimensions,lastDimensions:W.value.lastDimensions,componentsTree:W.value.componentsTree})};document.addEventListener(`pointermove`,d,{passive:!0}),document.addEventListener(`pointerup`,f)},[]),onDblClick:N(t=>{t.preventDefault(),t.stopPropagation();let n=kr.value;if(!n)return;let r=n.style,{dimensions:i,corner:a}=W.value,o=Sl(),s=o.isFullWidth(i.width),c=o.isFullHeight(i.height),l=s&&c,u=(s||c)&&!l,d=i.width,f=i.height,p=Cl(e,a,l,s,c);e===`left`||e===`right`?(d=s?i.width:o.maxWidth,u&&(d=s?B.width:o.maxWidth)):(f=c?i.height:o.maxHeight,u&&(f=c?B.initialHeight:o.maxHeight)),l&&(e===`left`||e===`right`?d=B.width:f=B.initialHeight);let m=wl(p,d,f),h={isFullWidth:o.isFullWidth(d),isFullHeight:o.isFullHeight(f),width:d,height:f,position:m},g=Math.floor(d-B.width/2),_=W.value.componentsTree.width,v=Math.floor(d*.3),y=s?xn:(e===`left`||e===`right`)&&!s?Math.min(g,Math.max(xn,v)):Math.min(g,Math.max(xn,_));requestAnimationFrame(()=>{W.value={corner:p,dimensions:h,lastDimensions:i,componentsTree:{...W.value.componentsTree,width:y}},r.transition=`all 0.25s cubic-bezier(0, 0, 0.2, 1)`,r.width=`${d}px`,r.height=`${f}px`,r.transform=`translate3d(${m.x}px, ${m.y}px, 0)`}),Cr(Sn,{corner:p,dimensions:h,lastDimensions:i,componentsTree:{...W.value.componentsTree,width:y}})},[]),className:U(`absolute z-50`,`flex items-center justify-center`,`group`,`transition-colors select-none`,`peer`,{"resize-left peer/left":e===`left`,"resize-right peer/right z-10":e===`right`,"resize-top peer/top":e===`top`,"resize-bottom peer/bottom":e===`bottom`}),children:L(`span`,{className:`resize-line-wrapper`,children:L(`span`,{className:`resize-line`,children:L(R,{name:`icon-ellipsis`,size:18,className:U(`text-neutral-400`,(e===`left`||e===`right`)&&`rotate-90`)})})})})},Ml={horizontal:{width:20,height:48},vertical:{width:48,height:20}},Nl=()=>{let e=M(null),t=M(!1),n=M(0),r=M(0),i=M(!1),a=N((a=!0)=>{if(!e.current)return;let{corner:o}=W.value,s,c;if(Mr.value){let e=Ml[Mr.value.orientation||`horizontal`];s=e.width,c=e.height}else if(t.current){let e=W.value.lastDimensions;s=Dl(e.width,0,!0),c=Dl(e.height,0,!1),i.current&&=!1}else s=n.current,c=r.current;let l=wl(o,s,c);if(Mr.value){let{corner:e,orientation:t=`horizontal`}=Mr.value,n=Ml[t];switch(e){case`top-left`:l=t===`horizontal`?{x:-1,y:z}:{x:z,y:-1};break;case`bottom-left`:l=t===`horizontal`?{x:-1,y:window.innerHeight-n.height-z}:{x:z,y:window.innerHeight-n.height+1};break;case`top-right`:l=t===`horizontal`?{x:window.innerWidth-n.width+1,y:z}:{x:window.innerWidth-n.width-z,y:-1};break;default:l=t===`horizontal`?{x:window.innerWidth-n.width+1,y:window.innerHeight-n.height-z}:{x:window.innerWidth-n.width-z,y:window.innerHeight-n.height+1};break}}let u=s<B.width||c<B.initialHeight,d=a&&!u,f=e.current,p=f.style,m=null,h=()=>{jr(),f.removeEventListener(`transitionend`,h),m&&=(cancelAnimationFrame(m),null)};f.addEventListener(`transitionend`,h),p.transition=`all 0.25s cubic-bezier(0, 0, 0.2, 1)`,m=requestAnimationFrame(()=>{p.width=`${s}px`,p.height=`${c}px`,p.transform=`translate3d(${l.x}px, ${l.y}px, 0)`,m=null});let g={isFullWidth:s>=window.innerWidth-z*2,isFullHeight:c>=window.innerHeight-z*2,width:s,height:c,position:l};W.value={corner:o,dimensions:g,lastDimensions:t?W.value.lastDimensions:s>n.current?g:W.value.lastDimensions,componentsTree:W.value.componentsTree},d&&Cr(Sn,{corner:W.value.corner,dimensions:W.value.dimensions,lastDimensions:W.value.lastDimensions,componentsTree:W.value.componentsTree}),jr()},[]),o=N(t=>{if(t.preventDefault(),!e.current||t.target.closest(`button`))return;let n=e.current,r=n.style,{dimensions:i}=W.value,o=t.clientX,s=t.clientY,c=i.position.x,l=i.position.y,u=c,d=l,f=null,p=!1,m=o,h=s,g=e=>{f||=(p=!0,m=e.clientX,h=e.clientY,requestAnimationFrame(()=>{let e=m-o,t=h-s;u=Number(c)+e,d=Number(l)+t,r.transition=`none`,r.transform=`translate3d(${u}px, ${d}px, 0)`;let n=u+i.width,p=d+i.height,v=Math.max(0,-u),y=Math.max(0,n-window.innerWidth),b=Math.max(0,-d),x=Math.max(0,p-window.innerHeight),S=Math.min(i.width,v+y),ee=Math.min(i.height,b+x),C=S*i.height+ee*i.width-S*ee>i.width*i.height*.35;if(!C&&$.options.value.showFPS){let e=u+i.width,t=e-100;C=e<=0||t>=window.innerWidth||d+i.height<=0||d>=window.innerHeight}if(C){let e=u+i.width/2,t=d+i.height/2,n=window.innerWidth/2,r=window.innerHeight/2,o;o=e<n?t<r?`top-left`:`bottom-left`:t<r?`top-right`:`bottom-right`;let s;s=Math.max(v,y)>Math.max(b,x)?`horizontal`:`vertical`,W.value={...W.value,corner:o,lastDimensions:{...i,position:wl(o,i.width,i.height)}};let c={corner:o,orientation:s};Mr.value=c,Cr(Cn,c),Cr(Sn,W.value),a(!1),document.removeEventListener(`pointermove`,g),document.removeEventListener(`pointerup`,_),f&&=(cancelAnimationFrame(f),null)}f=null}))},_=()=>{if(!n)return;f&&=(cancelAnimationFrame(f),null),document.removeEventListener(`pointermove`,g),document.removeEventListener(`pointerup`,_);let e=Math.abs(m-o),t=Math.abs(h-s),a=Math.sqrt(e*e+t*t);if(!p||a<60)return;let v=Al(m,h,o,s,Q.inspectState.value.kind===`focused`?80:40);if(v===W.value.corner){r.transition=`transform 0.25s cubic-bezier(0, 0, 0.2, 1)`;let e=W.value.dimensions.position;requestAnimationFrame(()=>{r.transform=`translate3d(${e.x}px, ${e.y}px, 0)`});return}let y=wl(v,i.width,i.height);if(u===c&&d===l)return;let b=()=>{r.transition=`none`,jr(),n.removeEventListener(`transitionend`,b),f&&=(cancelAnimationFrame(f),null)};n.addEventListener(`transitionend`,b),r.transition=`transform 0.25s cubic-bezier(0, 0, 0.2, 1)`,requestAnimationFrame(()=>{r.transform=`translate3d(${y.x}px, ${y.y}px, 0)`}),W.value={corner:v,dimensions:{isFullWidth:i.isFullWidth,isFullHeight:i.isFullHeight,width:i.width,height:i.height,position:y},lastDimensions:W.value.lastDimensions,componentsTree:W.value.componentsTree},Cr(Sn,{corner:v,dimensions:W.value.dimensions,lastDimensions:W.value.lastDimensions,componentsTree:W.value.componentsTree})};document.addEventListener(`pointermove`,g),document.addEventListener(`pointerup`,_)},[]),s=N(t=>{if(t.preventDefault(),!e.current||!Mr.value)return;let{corner:r,orientation:i=`horizontal`}=Mr.value,o=t.clientX,s=t.clientY,c=null,l=!1,u=t=>{if(l||c)return;let f=t.clientX-o,p=t.clientY-s,m=!1;i===`horizontal`?(r.endsWith(`left`)&&f>50||r.endsWith(`right`)&&f<-50)&&(m=!0):(r.startsWith(`top`)&&p>50||r.startsWith(`bottom`)&&p<-50)&&(m=!0),m&&(l=!0,Mr.value=null,Cr(Cn,null),n.current===0&&e.current?requestAnimationFrame(()=>{if(e.current){e.current.style.width=`min-content`,n.current=e.current.offsetWidth||300;let r=W.value.lastDimensions,i=Dl(r.width,0,!0),o=Dl(r.height,0,!1),s=t.clientX-i/2,c=t.clientY-o/2;s=Math.max(z,Math.min(s,window.innerWidth-i-z)),c=Math.max(z,Math.min(c,window.innerHeight-o-z)),W.value={...W.value,dimensions:{...W.value.dimensions,position:{x:s,y:c}}},a(!0),G.value=Sr(wn)||{view:`none`},setTimeout(()=>{if(e.current){let n=new PointerEvent(`pointerdown`,{clientX:t.clientX,clientY:t.clientY,pointerId:t.pointerId,bubbles:!0});e.current.dispatchEvent(n)}},100)}}):(a(!0),G.value=Sr(wn)||{view:`none`}),document.removeEventListener(`pointermove`,u),document.removeEventListener(`pointerup`,d))},d=()=>{c&&=(cancelAnimationFrame(c),null),document.removeEventListener(`pointermove`,u),document.removeEventListener(`pointerup`,d)};document.addEventListener(`pointermove`,u),document.addEventListener(`pointerup`,d)},[]);j(()=>{if(!e.current)return;wr(wn),Mr.value?(r.current=36,n.current=0):(e.current.style.width=`min-content`,r.current=36,n.current=e.current.offsetWidth),e.current.style.maxWidth=`calc(100vw - ${z*2}px)`,e.current.style.maxHeight=`calc(100vh - ${z*2}px)`,a(),Q.inspectState.value.kind!==`focused`&&!Mr.value&&!i.current&&(W.value={...W.value,dimensions:{isFullWidth:!1,isFullHeight:!1,width:n.current,height:r.current,position:W.value.dimensions.position}}),kr.value=e.current;let o=W.subscribe(t=>{if(!e.current)return;let{x:n,y:r}=t.dimensions.position,{width:i,height:a}=t.dimensions,o=e.current;requestAnimationFrame(()=>{o.style.transform=`translate3d(${n}px, ${r}px, 0)`,o.style.width=`${i}px`,o.style.height=`${a}px`})}),s=G.subscribe(e=>{t.current=e.view!==`none`,a(),Mr.value||(e.view===`none`?wr(wn):Cr(wn,e))}),c=Q.inspectState.subscribe(e=>{t.current=e.kind===`focused`,a()}),l=()=>{a(!0)};return window.addEventListener(`resize`,l,{passive:!0}),()=>{window.removeEventListener(`resize`,l),s(),c(),o(),Cr(Sn,{...Ar,corner:W.value.corner})}},[]);let[c,l]=A(!1);j(()=>{l(!0)},[]);let u=Mr.value,d=``;if(u){let{orientation:e=`horizontal`,corner:t}=u;d=e===`horizontal`?t?.endsWith(`right`)?`rotate-180`:``:t?.startsWith(`bottom`)?`-rotate-90`:`rotate-90`}return L(D,{children:[L(yl,{}),L(Pl.Provider,{value:e.current,children:L(`div`,{id:`react-scan-toolbar`,dir:`ltr`,ref:e,onPointerDown:u?s:o,className:U(`fixed inset-0`,u?(()=>{let{orientation:e=`horizontal`,corner:t}=u;return e===`horizontal`?t?.endsWith(`right`)?`rounded-tl-lg rounded-bl-lg shadow-lg`:`rounded-tr-lg rounded-br-lg shadow-lg`:t?.startsWith(`bottom`)?`rounded-tl-lg rounded-tr-lg shadow-lg`:`rounded-bl-lg rounded-br-lg shadow-lg`})():`rounded-lg shadow-lg`,`flex flex-col`,`font-mono text-[13px]`,`user-select-none`,`opacity-0`,u?`cursor-pointer`:`cursor-move`,`z-[124124124124]`,`animate-fade-in animation-duration-300 animation-delay-300`,`will-change-transform`,`[touch-action:none]`),style:{WebkitAppRegion:`no-drag`},children:u?L(`button`,{type:`button`,onClick:()=>{Mr.value=null,Cr(Cn,null),n.current===0&&e.current&&requestAnimationFrame(()=>{e.current&&(e.current.style.width=`min-content`,n.current=e.current.offsetWidth||300,a(!0))}),G.value=Sr(wn)||{view:`none`}},className:`flex items-center justify-center w-full h-full text-white`,title:`Expand toolbar`,children:L(R,{name:`icon-chevron-right`,size:16,className:U(`transition-transform`,d)})}):L(D,{children:[L(jl,{position:`top`}),L(jl,{position:`bottom`}),L(jl,{position:`left`}),L(jl,{position:`right`}),L(ml,{})]})})})]})},Pl=Fe(null),Fl=()=>L(`svg`,{xmlns:`http://www.w3.org/2000/svg`,style:`display: none;`,children:[L(`title`,{children:`React Scan Icons`}),L(`symbol`,{id:`icon-inspect`,viewBox:`0 0 24 24`,fill:`none`,"stroke-width":`2`,"stroke-linecap":`round`,"stroke-linejoin":`round`,children:[L(`path`,{d:`M12.034 12.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.943l-3.444 1.068a1 1 0 0 0-.66.66l-1.067 3.443a.5.5 0 0 1-.943.033z`}),L(`path`,{d:`M5 3a2 2 0 0 0-2 2`}),L(`path`,{d:`M19 3a2 2 0 0 1 2 2`}),L(`path`,{d:`M5 21a2 2 0 0 1-2-2`}),L(`path`,{d:`M9 3h1`}),L(`path`,{d:`M9 21h2`}),L(`path`,{d:`M14 3h1`}),L(`path`,{d:`M3 9v1`}),L(`path`,{d:`M21 9v2`}),L(`path`,{d:`M3 14v1`})]}),L(`symbol`,{id:`icon-focus`,viewBox:`0 0 24 24`,fill:`none`,"stroke-width":`2`,"stroke-linecap":`round`,"stroke-linejoin":`round`,children:[L(`path`,{d:`M12.034 12.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.943l-3.444 1.068a1 1 0 0 0-.66.66l-1.067 3.443a.5.5 0 0 1-.943.033z`}),L(`path`,{d:`M21 11V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6`})]}),L(`symbol`,{id:`icon-next`,viewBox:`0 0 24 24`,fill:`none`,"stroke-width":`2`,"stroke-linecap":`round`,"stroke-linejoin":`round`,children:L(`path`,{d:`M6 9h6V5l7 7-7 7v-4H6V9z`})}),L(`symbol`,{id:`icon-previous`,viewBox:`0 0 24 24`,fill:`none`,"stroke-width":`2`,"stroke-linecap":`round`,"stroke-linejoin":`round`,children:L(`path`,{d:`M18 15h-6v4l-7-7 7-7v4h6v6z`})}),L(`symbol`,{id:`icon-close`,viewBox:`0 0 24 24`,fill:`none`,"stroke-width":`2`,"stroke-linecap":`round`,"stroke-linejoin":`round`,children:[L(`line`,{x1:`18`,y1:`6`,x2:`6`,y2:`18`}),L(`line`,{x1:`6`,y1:`6`,x2:`18`,y2:`18`})]}),L(`symbol`,{id:`icon-replay`,viewBox:`0 0 24 24`,fill:`none`,"stroke-width":`2`,"stroke-linecap":`round`,"stroke-linejoin":`round`,children:[L(`path`,{d:`M3 7V5a2 2 0 0 1 2-2h2`}),L(`path`,{d:`M17 3h2a2 2 0 0 1 2 2v2`}),L(`path`,{d:`M21 17v2a2 2 0 0 1-2 2h-2`}),L(`path`,{d:`M7 21H5a2 2 0 0 1-2-2v-2`}),L(`circle`,{cx:`12`,cy:`12`,r:`1`}),L(`path`,{d:`M18.944 12.33a1 1 0 0 0 0-.66 7.5 7.5 0 0 0-13.888 0 1 1 0 0 0 0 .66 7.5 7.5 0 0 0 13.888 0`})]}),L(`symbol`,{id:`icon-ellipsis`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,"stroke-width":`2`,"stroke-linecap":`round`,"stroke-linejoin":`round`,children:[L(`circle`,{cx:`12`,cy:`12`,r:`1`}),L(`circle`,{cx:`19`,cy:`12`,r:`1`}),L(`circle`,{cx:`5`,cy:`12`,r:`1`})]}),L(`symbol`,{id:`icon-copy`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,"stroke-width":`2`,"stroke-linecap":`round`,"stroke-linejoin":`round`,children:[L(`rect`,{width:`14`,height:`14`,x:`8`,y:`8`,rx:`2`,ry:`2`}),L(`path`,{d:`M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2`})]}),L(`symbol`,{id:`icon-check`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,"stroke-width":`2`,"stroke-linecap":`round`,"stroke-linejoin":`round`,children:L(`path`,{d:`M20 6 9 17l-5-5`})}),L(`symbol`,{id:`icon-chevron-right`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,"stroke-width":`2`,"stroke-linecap":`round`,"stroke-linejoin":`round`,children:L(`path`,{d:`m9 18 6-6-6-6`})}),L(`symbol`,{id:`icon-settings`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,"stroke-width":`2`,"stroke-linecap":`round`,"stroke-linejoin":`round`,children:[L(`path`,{d:`M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z`}),L(`circle`,{cx:`12`,cy:`12`,r:`3`})]}),L(`symbol`,{id:`icon-flame`,viewBox:`0 0 24 24`,children:L(`path`,{d:`M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z`})}),L(`symbol`,{id:`icon-function`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,"stroke-width":`2`,"stroke-linecap":`round`,"stroke-linejoin":`round`,children:[L(`rect`,{width:`18`,height:`18`,x:`3`,y:`3`,rx:`2`,ry:`2`}),L(`path`,{d:`M9 17c2 0 2.8-1 2.8-2.8V10c0-2 1-3.3 3.2-3`}),L(`path`,{d:`M9 11.2h5.7`})]}),L(`symbol`,{id:`icon-triangle-alert`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,"stroke-width":`2`,"stroke-linecap":`round`,"stroke-linejoin":`round`,children:[L(`path`,{d:`m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3`}),L(`path`,{d:`M12 9v4`}),L(`path`,{d:`M12 17h.01`})]}),L(`symbol`,{id:`icon-gallery-horizontal-end`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,"stroke-width":`2`,"stroke-linecap":`round`,"stroke-linejoin":`round`,children:[L(`path`,{d:`M2 7v10`}),L(`path`,{d:`M6 5v14`}),L(`rect`,{width:`12`,height:`18`,x:`10`,y:`3`,rx:`2`})]}),L(`symbol`,{id:`icon-search`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,"stroke-width":`2`,"stroke-linecap":`round`,"stroke-linejoin":`round`,children:[L(`circle`,{cx:`11`,cy:`11`,r:`8`}),L(`line`,{x1:`21`,y1:`21`,x2:`16.65`,y2:`16.65`})]}),L(`symbol`,{id:`icon-lock`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,"stroke-width":`2`,"stroke-linecap":`round`,"stroke-linejoin":`round`,children:[L(`rect`,{width:`18`,height:`11`,x:`3`,y:`11`,rx:`2`,ry:`2`}),L(`path`,{d:`M7 11V7a5 5 0 0 1 10 0v4`})]}),L(`symbol`,{id:`icon-lock-open`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,"stroke-width":`2`,"stroke-linecap":`round`,"stroke-linejoin":`round`,children:[L(`rect`,{width:`18`,height:`11`,x:`3`,y:`11`,rx:`2`,ry:`2`}),L(`path`,{d:`M7 11V7a5 5 0 0 1 9.9-1`})]}),L(`symbol`,{id:`icon-sanil`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,"stroke-width":`2`,"stroke-linecap":`round`,"stroke-linejoin":`round`,children:[L(`path`,{d:`M2 13a6 6 0 1 0 12 0 4 4 0 1 0-8 0 2 2 0 0 0 4 0`}),L(`circle`,{cx:`10`,cy:`13`,r:`8`}),L(`path`,{d:`M2 21h12c4.4 0 8-3.6 8-8V7a2 2 0 1 0-4 0v6`}),L(`path`,{d:`M18 3 19.1 5.2`})]})]}),Il=class extends fe{constructor(){super(...arguments),this.state={hasError:!1,error:null},this.handleReset=()=>{this.setState({hasError:!1,error:null})}}static getDerivedStateFromError(e){return{hasError:!0,error:e}}render(){return this.state.hasError?L(`div`,{className:`fixed bottom-4 right-4 z-[124124124124]`,children:L(`div`,{className:`p-3 bg-black rounded-lg shadow-lg w-80`,children:[L(`div`,{className:`flex items-center gap-2 mb-2 text-red-400 text-sm font-medium`,children:[L(R,{name:`icon-flame`,className:`text-red-500`,size:14}),`React Scan ran into a problem`]}),L(`div`,{className:`p-2 bg-black rounded font-mono text-xs text-red-300 mb-3 break-words`,children:this.state.error?.message||JSON.stringify(this.state.error)}),L(`button`,{type:`button`,onClick:this.handleReset,className:`px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded text-xs font-medium transition-colors flex items-center justify-center gap-1.5`,children:`Restart`})]})}):this.props.children}},Ll=e=>{let t=document.createElement(`div`);t.id=`react-scan-toolbar-root`,window.__REACT_SCAN_TOOLBAR_CONTAINER__=t,e.appendChild(t),Pe(L(Il,{children:L(D,{children:[L(Fl,{}),L(Nl,{})]})}),t);let n=t.remove.bind(t);return t.remove=()=>{window.__REACT_SCAN_TOOLBAR_CONTAINER__=void 0,t.hasChildNodes()&&(Pe(null,t),Pe(null,t)),n()},t},Rl={name:`react-scan`,version:`0.5.2`,description:`Scan your React app for renders`,keywords:[`react`,`react-scan`,`react scan`,`render`,`performance`],homepage:`https://react-scan.million.dev`,bugs:{url:`https://github.com/aidenybai/react-scan/issues`},repository:{type:`git`,url:`git+https://github.com/aidenybai/react-scan.git`},license:`MIT`,author:{name:`Aiden Bai`,email:`aiden@million.dev`,url:`https://million.dev`},scripts:{build:`npm run build:css && NODE_ENV=production tsup`,postbuild:`node ../../scripts/version-warning.mjs`,"build:copy":`npm run build:css && NODE_ENV=production tsup && cat dist/auto.global.js | pbcopy`,"dev:css":`postcss ./src/web/assets/css/styles.tailwind.css -o ./src/web/assets/css/styles.css --watch`,"dev:tsup":`NODE_ENV=development tsup --watch`,dev:`pnpm run --parallel "/^dev:(css|tsup)/"`,"build:css":`postcss ./src/web/assets/css/styles.tailwind.css -o ./src/web/assets/css/styles.css`,pack:`npm version patch && pnpm build && npm pack`,"pack:bump":`bun scripts/bump-version.js && nr pack && echo $(pwd)/react-scan-$(node -p "require('./package.json').version").tgz | pbcopy`,publint:`publint`,test:`vitest`,lint:`oxlint src && pnpm typecheck`,typecheck:`tsc --noEmit`},exports:{"./package.json":`./package.json`,".":{production:{import:{types:`./dist/index.d.mts`,"react-server":`./dist/rsc-shim.mjs`,default:`./dist/index.mjs`},require:{types:`./dist/index.d.mts`,"react-server":`./dist/rsc-shim.js`,default:`./dist/index.mjs`}},development:{import:{types:`./dist/index.d.mts`,"react-server":`./dist/rsc-shim.mjs`,default:`./dist/index.mjs`},require:{types:`./dist/index.d.ts`,"react-server":`./dist/rsc-shim.js`,default:`./dist/index.js`}},default:{import:{types:`./dist/index.d.mts`,"react-server":`./dist/rsc-shim.mjs`,default:`./dist/index.mjs`},require:{types:`./dist/index.d.ts`,"react-server":`./dist/rsc-shim.js`,default:`./dist/index.js`}}},"./all-environments":{types:`./dist/core/all-environments.d.ts`,import:`./dist/core/all-environments.mjs`,require:`./dist/core/all-environments.js`},"./install-hook":{types:`./dist/install-hook.d.ts`,import:`./dist/install-hook.mjs`,require:`./dist/install-hook.js`},"./auto":{production:{import:{types:`./dist/rsc-shim.d.mts`,"react-server":`./dist/rsc-shim.mjs`,default:`./dist/rsc-shim.mjs`},require:{types:`./dist/rsc-shim.d.ts`,"react-server":`./dist/rsc-shim.js`,default:`./dist/rsc-shim.js`}},development:{import:{types:`./dist/auto.d.mts`,"react-server":`./dist/rsc-shim.mjs`,default:`./dist/auto.mjs`},require:{types:`./dist/auto.d.ts`,"react-server":`./dist/rsc-shim.js`,default:`./dist/auto.js`}}},"./dist/*":`./dist/*.js`,"./dist/*.js":`./dist/*.js`,"./dist/*.mjs":`./dist/*.mjs`,"./react-component-name/vite":{types:`./dist/react-component-name/vite.d.ts`,import:`./dist/react-component-name/vite.mjs`,require:`./dist/react-component-name/vite.js`},"./react-component-name/webpack":{types:`./dist/react-component-name/webpack.d.ts`,import:`./dist/react-component-name/webpack.mjs`,require:`./dist/react-component-name/webpack.js`},"./react-component-name/esbuild":{types:`./dist/react-component-name/esbuild.d.ts`,import:`./dist/react-component-name/esbuild.mjs`,require:`./dist/react-component-name/esbuild.js`},"./react-component-name/rspack":{types:`./dist/react-component-name/rspack.d.ts`,import:`./dist/react-component-name/rspack.mjs`,require:`./dist/react-component-name/rspack.js`},"./react-component-name/rolldown":{types:`./dist/react-component-name/rolldown.d.ts`,import:`./dist/react-component-name/rolldown.mjs`,require:`./dist/react-component-name/rolldown.js`},"./react-component-name/rollup":{types:`./dist/react-component-name/rollup.d.ts`,import:`./dist/react-component-name/rollup.mjs`,require:`./dist/react-component-name/rollup.js`},"./react-component-name/astro":{types:`./dist/react-component-name/astro.d.ts`,import:`./dist/react-component-name/astro.mjs`,require:`./dist/react-component-name/astro.js`},"./react-component-name/loader":{types:`./dist/react-component-name/loader.d.ts`,import:`./dist/react-component-name/loader.mjs`,require:`./dist/react-component-name/loader.js`}},main:`dist/index.js`,module:`dist/index.mjs`,browser:`dist/auto.global.js`,types:`dist/index.d.ts`,typesVersions:{"*":{"react-component-name/vite":[`./dist/react-component-name/vite.d.ts`],"react-component-name/webpack":[`./dist/react-component-name/webpack.d.ts`],"react-component-name/esbuild":[`./dist/react-component-name/esbuild.d.ts`],"react-component-name/rspack":[`./dist/react-component-name/rspack.d.ts`],"react-component-name/rolldown":[`./dist/react-component-name/rolldown.d.ts`],"react-component-name/rollup":[`./dist/react-component-name/rollup.d.ts`],"react-component-name/astro":[`./dist/react-component-name/astro.d.ts`],"react-component-name/loader":[`./dist/react-component-name/loader.d.ts`]}},bin:`bin/cli.js`,files:[`dist`,`bin`,`package.json`,`README.md`,`LICENSE`,`auto.d.ts`],dependencies:{"@babel/core":`^7.26.0`,"@babel/generator":`^7.26.2`,"@babel/types":`^7.26.0`,"@preact/signals":`^1.3.1`,"@rollup/pluginutils":`^5.1.3`,"@types/node":`^20.17.9`,bippy:`^0.5.30`,commander:`^14.0.0`,esbuild:`^0.25.0`,"estree-walker":`^3.0.3`,picocolors:`^1.1.1`,preact:`^10.25.1`,prompts:`^2.4.2`},devDependencies:{"@esbuild-plugins/tsconfig-paths":`^0.1.2`,"@remix-run/react":`*`,"@types/babel__core":`^7.20.5`,"@types/prompts":`^2.4.9`,"@types/react":`^18.0.0`,"@types/react-router":`^5.1.0`,clsx:`^2.1.1`,"es-module-lexer":`^1.5.4`,next:`*`,"postcss-cli":`^11.0.0`,publint:`^0.2.12`,react:`*`,"react-dom":`*`,"react-router":`^5.0.0`,"react-router-dom":`^5.0.0 || ^6.0.0 || ^7.0.0`,"tailwind-merge":`^2.5.5`,terser:`^5.36.0`,tsup:`^8.0.0`,vitest:`^3.0.0`},peerDependencies:{react:`^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0`,"react-dom":`^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0`},optionalDependencies:{unplugin:`2.1.0`},publishConfig:{access:`public`}},zl=null,Bl=null,Vl=()=>{if(zl&&Bl)return{rootContainer:zl,shadowRoot:Bl};zl=document.createElement(`div`),zl.id=`react-scan-root`,Bl=zl.attachShadow({mode:`open`});let e=document.createElement(`style`);return e.textContent=Wo,Bl.appendChild(e),document.documentElement.appendChild(zl),{rootContainer:zl,shadowRoot:Bl}},Q={wasDetailsOpen:I(!0),isInIframe:I(fn&&window.self!==window.top),inspectState:I({kind:`uninitialized`}),fiberRoots:new Set,reportData:new Map,legacyReportData:new Map,lastReportTime:I(0),interactionListeningForRenders:null,changesListeners:new Map},$={instrumentation:null,componentAllowList:null,options:I({enabled:!0,log:!1,showToolbar:!0,animationSpeed:`fast`,dangerouslyForceRunInProduction:!1,showFPS:!0,showNotificationCount:!0,allowInIframe:!1}),runInAllEnvironments:!1,onRender:null,Store:Q,version:Rl.version};fn&&window.__REACT_SCAN_EXTENSION__&&(window.__REACT_SCAN_VERSION__=$.version);var Hl=e=>{let{onCommitStart:t,onRender:n,onCommitFinish:r,...i}=e;return i},Ul=e=>{let t=[],n={};for(let r in e){let i=e[r];switch(r){case`enabled`:case`log`:case`showToolbar`:case`showNotificationCount`:case`dangerouslyForceRunInProduction`:case`showFPS`:case`allowInIframe`:typeof i==`boolean`?n[r]=i:t.push(`- ${r} must be a boolean. Got "${i}"`);break;case`animationSpeed`:[`slow`,`fast`,`off`].includes(i)?n[r]=i:t.push(`- Invalid animation speed "${i}". Using default "fast"`);break;case`onCommitStart`:typeof i==`function`?n.onCommitStart=i:t.push(`- ${r} must be a function. Got "${i}"`);break;case`onCommitFinish`:typeof i==`function`?n.onCommitFinish=i:t.push(`- ${r} must be a function. Got "${i}"`);break;case`onRender`:typeof i==`function`?n.onRender=i:t.push(`- ${r} must be a function. Got "${i}"`);break;default:t.push(`- Unknown option "${r}"`)}}return t.length>0&&console.warn(`[React Scan] Invalid options:
${t.join(`
`)}`),n},Wl=e=>{if(e){for(let t of Array.from(Q.legacyReportData.values()))if(t.type===e)return t;return null}return Q.legacyReportData},Gl=e=>{try{let t=Ul(e);if(Object.keys(t).length===0)return;let n=`showToolbar`in t&&t.showToolbar!==void 0,r={...$.options.value,...t},{instrumentation:i}=$;i&&`enabled`in t&&(i.isPaused.value=t.enabled===!1),$.options.value=r;try{let e=Sr(`react-scan-options`)?.enabled;typeof e==`boolean`&&(r.enabled=e)}catch(e){$.options.value._debug===`verbose`&&console.error(`[React Scan Internal Error]`,`Failed to create notifications outline canvas`,e)}return Cr(`react-scan-options`,Hl(r)),n&&Zl(!!r.showToolbar),r}catch(e){$.options.value._debug===`verbose`&&console.error(`[React Scan Internal Error]`,`Failed to create notifications outline canvas`,e)}},Kl=()=>$.options,ql=null,Jl,Yl=()=>{if(ql!==null)return ql;Jl??=_();for(let e of Jl.renderers.values())t(e)===`production`&&(ql=!0);return ql},Xl=()=>{try{if(!fn||!$.runInAllEnvironments&&Yl()&&!$.options.value.dangerouslyForceRunInProduction)return;let e=Sr(`react-scan-options`);if(e){let t=Ul(e);Object.keys(t).length>0&&($.options.value={...$.options.value,...t})}let t=Kl();Uo(()=>{Zl(!!t.value.showToolbar)}),fn&&setTimeout(()=>{r()||console.error(`[React Scan] Failed to load. Must import React Scan before React runs.`)},5e3)}catch(e){$.options.value._debug===`verbose`&&console.error(`[React Scan Internal Error]`,`Failed to create notifications outline canvas`,e)}},Zl=e=>{window.reactScanCleanupListeners?.();let t=Js(),n=Ql();window.reactScanCleanupListeners=()=>{t(),n?.()};let r=window.__REACT_SCAN_TOOLBAR_CONTAINER__;if(!e){r?.remove();return}r?.remove();let{shadowRoot:i}=Vl();Ll(i)},Ql=()=>{try{let e=document.documentElement;return Ic(e)}catch(e){$.options.value._debug===`verbose`&&console.error(`[React Scan Internal Error]`,`Failed to create notifications outline canvas`,e)}},$l=(e={})=>{Gl(e),!(Q.isInIframe.value&&!$.options.value.allowInIframe&&!$.runInAllEnvironments)&&(e.enabled===!1&&e.showToolbar!==!0||Xl())},eu=(e={})=>{Gl(e),Xl()},tu=(e,t)=>{let r=$.onRender;$.onRender=(i,a)=>{r?.(i,a),n(i.type)===e&&t(i,a)}},nu=new WeakSet,ru=e=>{e&&typeof e==`object`&&nu.add(e)};export{$ as ReactScanInternals,Q as Store,Yl as getIsProduction,Kl as getOptions,Wl as getReport,ru as ignoreScan,nu as ignoredProps,tu as onRender,$l as scan,Gl as setOptions,Xl as start,eu as useScan};
//# sourceMappingURL=dist-Cxt3d2X9.js.map