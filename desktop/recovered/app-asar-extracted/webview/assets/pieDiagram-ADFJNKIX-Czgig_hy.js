import"./chunk-FPAJGGOC-Dh-B19jq.js";import{f as e,r as t}from"./chunk-S3R3BYOJ-D5V2Plja.js";import"./chunk-O7ZBX7Z2-D1QlVGOw.js";import"./chunk-S6J4BHB3-EW-Dzq82.js";import"./chunk-LBM3YZW2-DamQgf2F.js";import"./chunk-76Q3JFCE-D5xC4o5b.js";import"./chunk-T53DSG4Q-BA8Y6flA.js";import"./chunk-LHMN2FUI-CPw9X4tK.js";import"./chunk-FWNWRKHM-YcNZlVaQ.js";import{g as n,h as r}from"./src-DQtvLihn.js";import{B as i,C as a,U as o,_ as s,a as c,b as l,c as u,d,v as f,z as p}from"./chunk-ABZYJK2D-D596mVDq.js";import{t as m}from"./ordinal-DlVbvFrq.js";import{n as h}from"./path-BPZpUMcQ.js";import{p as g}from"./math-CPQzpxvo.js";import{t as _}from"./arc-CrwdtF9X.js";import{t as v}from"./array-BDv0Go8e.js";import{t as y}from"./chunk-EXTU4WIE-iCJNcPOi.js";import"./dist-DBNVqpk8.js";import{t as b}from"./chunk-4BX2VUAB-DDx-Kd9p.js";import{t as x}from"./mermaid-parser.core-B5V6Lj7G.js";function S(e,t){return t<e?-1:t>e?1:t>=e?0:NaN}function C(e){return e}function w(){var e=C,t=S,n=null,r=h(0),i=h(g),a=h(0);function o(o){var s,c=(o=v(o)).length,l,u,d=0,f=Array(c),p=Array(c),m=+r.apply(this,arguments),h=Math.min(g,Math.max(-g,i.apply(this,arguments)-m)),_,y=Math.min(Math.abs(h)/c,a.apply(this,arguments)),b=y*(h<0?-1:1),x;for(s=0;s<c;++s)(x=p[f[s]=s]=+e(o[s],s,o))>0&&(d+=x);for(t==null?n!=null&&f.sort(function(e,t){return n(o[e],o[t])}):f.sort(function(e,n){return t(p[e],p[n])}),s=0,u=d?(h-c*b)/d:0;s<c;++s,m=_)l=f[s],x=p[l],_=m+(x>0?x*u:0)+b,p[l]={data:o[l],index:s,value:x,startAngle:m,endAngle:_,padAngle:y};return p}return o.value=function(t){return arguments.length?(e=typeof t==`function`?t:h(+t),o):e},o.sortValues=function(e){return arguments.length?(t=e,n=null,o):t},o.sort=function(e){return arguments.length?(n=e,t=null,o):n},o.startAngle=function(e){return arguments.length?(r=typeof e==`function`?e:h(+e),o):r},o.endAngle=function(e){return arguments.length?(i=typeof e==`function`?e:h(+e),o):i},o.padAngle=function(e){return arguments.length?(a=typeof e==`function`?e:h(+e),o):a},o}var T=d.pie,E={sections:new Map,showData:!1,config:T},D=E.sections,O=E.showData,k=structuredClone(T),A={getConfig:r(()=>structuredClone(k),`getConfig`),clear:r(()=>{D=new Map,O=E.showData,c()},`clear`),setDiagramTitle:o,getDiagramTitle:a,setAccTitle:i,getAccTitle:f,setAccDescription:p,getAccDescription:s,addSection:r(({label:e,value:t})=>{if(t<0)throw Error(`"${e}" has invalid value: ${t}. Negative values are not allowed in pie charts. All slice values must be >= 0.`);D.has(e)||(D.set(e,t),n.debug(`added new section: ${e}, with value: ${t}`))},`addSection`),getSections:r(()=>D,`getSections`),setShowData:r(e=>{O=e},`setShowData`),getShowData:r(()=>O,`getShowData`)},j=r((e,t)=>{b(e,t),t.setShowData(e.showData),e.sections.map(t.addSection)},`populateDb`),M={parse:r(async e=>{let t=await x(`pie`,e);n.debug(t),j(t,A)},`parse`)},N=r(e=>`
  .pieCircle{
    stroke: ${e.pieStrokeColor};
    stroke-width : ${e.pieStrokeWidth};
    opacity : ${e.pieOpacity};
  }
  .pieOuterCircle{
    stroke: ${e.pieOuterStrokeColor};
    stroke-width: ${e.pieOuterStrokeWidth};
    fill: none;
  }
  .pieTitleText {
    text-anchor: middle;
    font-size: ${e.pieTitleTextSize};
    fill: ${e.pieTitleTextColor};
    font-family: ${e.fontFamily};
  }
  .slice {
    font-family: ${e.fontFamily};
    fill: ${e.pieSectionTextColor};
    font-size:${e.pieSectionTextSize};
    // fill: white;
  }
  .legend text {
    fill: ${e.pieLegendTextColor};
    font-family: ${e.fontFamily};
    font-size: ${e.pieLegendTextSize};
  }
`,`getStyles`),P=r(e=>{let t=[...e.values()].reduce((e,t)=>e+t,0),n=[...e.entries()].map(([e,t])=>({label:e,value:t})).filter(e=>e.value/t*100>=1).sort((e,t)=>t.value-e.value);return w().value(e=>e.value)(n)},`createPieArcs`),F={parser:M,db:A,renderer:{draw:r((r,i,a,o)=>{n.debug(`rendering pie chart
`+r);let s=o.db,c=l(),d=t(s.getConfig(),c.pie),f=y(i),p=f.append(`g`);p.attr(`transform`,`translate(225,225)`);let{themeVariables:h}=c,[g]=e(h.pieOuterStrokeWidth);g??=2;let v=d.textPosition,b=_().innerRadius(0).outerRadius(185),x=_().innerRadius(185*v).outerRadius(185*v);p.append(`circle`).attr(`cx`,0).attr(`cy`,0).attr(`r`,185+g/2).attr(`class`,`pieOuterCircle`);let S=s.getSections(),C=P(S),w=[h.pie1,h.pie2,h.pie3,h.pie4,h.pie5,h.pie6,h.pie7,h.pie8,h.pie9,h.pie10,h.pie11,h.pie12],T=0;S.forEach(e=>{T+=e});let E=C.filter(e=>(e.data.value/T*100).toFixed(0)!==`0`),D=m(w);p.selectAll(`mySlices`).data(E).enter().append(`path`).attr(`d`,b).attr(`fill`,e=>D(e.data.label)).attr(`class`,`pieCircle`),p.selectAll(`mySlices`).data(E).enter().append(`text`).text(e=>(e.data.value/T*100).toFixed(0)+`%`).attr(`transform`,e=>`translate(`+x.centroid(e)+`)`).style(`text-anchor`,`middle`).attr(`class`,`slice`),p.append(`text`).text(s.getDiagramTitle()).attr(`x`,0).attr(`y`,-400/2).attr(`class`,`pieTitleText`);let O=[...S.entries()].map(([e,t])=>({label:e,value:t})),k=p.selectAll(`.legend`).data(O).enter().append(`g`).attr(`class`,`legend`).attr(`transform`,(e,t)=>{let n=22*O.length/2;return`translate(216,`+(t*22-n)+`)`});k.append(`rect`).attr(`width`,18).attr(`height`,18).style(`fill`,e=>D(e.label)).style(`stroke`,e=>D(e.label)),k.append(`text`).attr(`x`,22).attr(`y`,14).text(e=>s.getShowData()?`${e.label} [${e.value}]`:e.label);let A=512+Math.max(...k.selectAll(`text`).nodes().map(e=>e?.getBoundingClientRect().width??0));f.attr(`viewBox`,`0 0 ${A} 450`),u(f,450,A,d.useMaxWidth)},`draw`)},styles:N};export{F as diagram};
//# sourceMappingURL=pieDiagram-ADFJNKIX-Czgig_hy.js.map