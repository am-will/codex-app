import{n as e}from"./rolldown-runtime-Czos8NxU.js";import{js as t,os as n,rs as r}from"./app-initial~app-main~onboarding-page-zcfEkMl-.js";import{t as i}from"./src-CJas8qj0.js";import{i as a,n as o,r as s}from"./chunk-AGHRB4JF-7UqQL8yc.js";import{A as c,C as l,G as u,H as d,V as f,_ as p,a as m,b as h,c as g,d as _,v}from"./chunk-ICPOFSXX-o_ELYDOJ.js";import{n as y,t as b}from"./chunk-426QAEUC-DjjuNKUx.js";import{p as x,r as S,u as C}from"./chunk-5PVQY5BW-DI2wdaXU.js";import{n as w,t as T}from"./chunk-4BX2VUAB-DaZFTKB3.js";import{n as E,t as D}from"./mermaid-parser.core-H0jvL6ri.js";var O,k,A,j,M,N,P,F,I,L,R;e((()=>{b(),T(),C(),c(),s(),D(),i(),O=_.pie,k={sections:new Map,showData:!1,config:O},A=k.sections,j=k.showData,M=structuredClone(O),N={getConfig:o(()=>structuredClone(M),`getConfig`),clear:o(()=>{A=new Map,j=k.showData,m()},`clear`),setDiagramTitle:u,getDiagramTitle:l,setAccTitle:d,getAccTitle:v,setAccDescription:f,getAccDescription:p,addSection:o(({label:e,value:t})=>{if(t<0)throw Error(`"${e}" has invalid value: ${t}. Negative values are not allowed in pie charts. All slice values must be >= 0.`);A.has(e)||(A.set(e,t),a.debug(`added new section: ${e}, with value: ${t}`))},`addSection`),getSections:o(()=>A,`getSections`),setShowData:o(e=>{j=e},`setShowData`),getShowData:o(()=>j,`getShowData`)},P=o((e,t)=>{w(e,t),t.setShowData(e.showData),e.sections.map(t.addSection)},`populateDb`),F={parse:o(async e=>{let t=await E(`pie`,e);a.debug(t),P(t,N)},`parse`)},I=o(e=>`
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
`,`getStyles`),L=o(e=>{let t=[...e.values()].reduce((e,t)=>e+t,0),n=[...e.entries()].map(([e,t])=>({label:e,value:t})).filter(e=>e.value/t*100>=1);return r().value(e=>e.value).sort(null)(n)},`createPieArcs`),R={parser:F,db:N,renderer:{draw:o((e,r,i,o)=>{a.debug(`rendering pie chart
`+e);let s=o.db,c=h(),l=S(s.getConfig(),c.pie),u=y(r),d=u.append(`g`);d.attr(`transform`,`translate(225,225)`);let{themeVariables:f}=c,[p]=x(f.pieOuterStrokeWidth);p??=2;let m=l.textPosition,_=n().innerRadius(0).outerRadius(185),v=n().innerRadius(185*m).outerRadius(185*m);d.append(`circle`).attr(`cx`,0).attr(`cy`,0).attr(`r`,185+p/2).attr(`class`,`pieOuterCircle`);let b=s.getSections(),C=L(b),w=[f.pie1,f.pie2,f.pie3,f.pie4,f.pie5,f.pie6,f.pie7,f.pie8,f.pie9,f.pie10,f.pie11,f.pie12],T=0;b.forEach(e=>{T+=e});let E=C.filter(e=>(e.data.value/T*100).toFixed(0)!==`0`),D=t(w).domain([...b.keys()]);d.selectAll(`mySlices`).data(E).enter().append(`path`).attr(`d`,_).attr(`fill`,e=>D(e.data.label)).attr(`class`,`pieCircle`),d.selectAll(`mySlices`).data(E).enter().append(`text`).text(e=>(e.data.value/T*100).toFixed(0)+`%`).attr(`transform`,e=>`translate(`+v.centroid(e)+`)`).style(`text-anchor`,`middle`).attr(`class`,`slice`);let O=d.append(`text`).text(s.getDiagramTitle()).attr(`x`,0).attr(`y`,-400/2).attr(`class`,`pieTitleText`),k=[...b.entries()].map(([e,t])=>({label:e,value:t})),A=d.selectAll(`.legend`).data(k).enter().append(`g`).attr(`class`,`legend`).attr(`transform`,(e,t)=>{let n=22*k.length/2;return`translate(216,`+(t*22-n)+`)`});A.append(`rect`).attr(`width`,18).attr(`height`,18).style(`fill`,e=>D(e.label)).style(`stroke`,e=>D(e.label)),A.append(`text`).attr(`x`,22).attr(`y`,14).text(e=>s.getShowData()?`${e.label} [${e.value}]`:e.label);let j=512+Math.max(...A.selectAll(`text`).nodes().map(e=>e?.getBoundingClientRect().width??0)),M=O.node()?.getBoundingClientRect().width??0,N=450/2-M/2,P=450/2+M/2,F=Math.min(0,N),I=Math.max(j,P)-F;u.attr(`viewBox`,`${F} 0 ${I} 450`),g(u,450,I,l.useMaxWidth)},`draw`)},styles:I}}))();export{R as diagram};
//# sourceMappingURL=pieDiagram-DEJITSTG-D2naO7YP.js.map