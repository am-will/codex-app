import{s as e}from"./chunk-Cq_f4orQ.js";import{n as t}from"./jsx-runtime-DXKlqYIQ.js";import{C as n,S as r,w as i}from"./app-scope-CWE-zIhQ.js";var a=e(t(),1),o=(0,a.createContext)(void 0);function s(e){let t=(0,a.useContext)(o);return e?.store||t||n()}function c({children:e,store:t}){let n=(0,a.useRef)(null);return t?(0,a.createElement)(o.Provider,{value:t},e):(n.current===null&&(n.current=r()),(0,a.createElement)(o.Provider,{value:n.current},e))}var l=e=>typeof e?.then==`function`,u=e=>{e.status||(e.status=`pending`,e.then(t=>{e.status=`fulfilled`,e.value=t},t=>{e.status=`rejected`,e.reason=t}))},d=a.use||(e=>{if(e.status===`pending`)throw e;if(e.status===`fulfilled`)return e.value;throw e.status===`rejected`?e.reason:(u(e),e)}),f=new WeakMap,p=(e,t,n)=>{let r=i(e)[26],a=f.get(t);return a||(a=new Promise((i,o)=>{let s=t,c=e=>t=>{s===e&&i(t)},u=e=>t=>{s===e&&o(t)},d=()=>{try{let t=n();l(t)?(f.set(t,a),s=t,t.then(c(t),u(t)),r(e,t,d)):i(t)}catch(e){o(e)}};t.then(c(t),u(t)),r(e,t,d)}),f.set(t,a)),a};function m(e,t){let{delay:n,unstable_promiseStatus:r=!a.use}=t||{},i=s(t),[[o,c,f],m]=(0,a.useReducer)(t=>{let n=i.get(e);return Object.is(t[0],n)&&t[1]===i&&t[2]===e?t:[n,i,e]},void 0,()=>[i.get(e),i,e]),h=o;if((c!==i||f!==e)&&(m(),h=i.get(e)),(0,a.useEffect)(()=>{let t=i.sub(e,()=>{if(r)try{let t=i.get(e);l(t)&&u(p(i,t,()=>i.get(e)))}catch{}if(typeof n==`number`){console.warn(`[DEPRECATED] delay option is deprecated and will be removed in v3.

Migration guide:

Create a custom hook like the following.

function useAtomValueWithDelay<Value>(
  atom: Atom<Value>,
  options: { delay: number },
): Value {
  const { delay } = options
  const store = useStore(options)
  const [value, setValue] = useState(() => store.get(atom))
  useEffect(() => {
    const unsub = store.sub(atom, () => {
      setTimeout(() => setValue(store.get(atom)), delay)
    })
    return unsub
  }, [store, atom, delay])
  return value
}
`),setTimeout(m,n);return}m()});return m(),t},[i,e,n,r]),(0,a.useDebugValue)(h),l(h)){let t=p(i,h,()=>i.get(e));return r&&u(t),d(t)}return h}function h(e,t){let n=s(t);return(0,a.useCallback)((...t)=>n.set(e,...t),[n,e])}function g(e,t){return[m(e,t),h(e,t)]}export{s as a,h as i,g as n,m as r,c as t};
//# sourceMappingURL=react-Cvp3RcFC.js.map