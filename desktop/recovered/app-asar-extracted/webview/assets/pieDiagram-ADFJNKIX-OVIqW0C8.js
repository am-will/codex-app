import{n as e}from"./rolldown-runtime-Czos8NxU.js";import{I as t,jt as n,z as r}from"./app-initial~app-main~onboarding-page~mermaid-diagram~xychartDiagram-PRI3JC2R~timeline-defin~dcen2xty-Dqo4EKf7.js";import{i,n as a,r as o}from"./chunk-AGHRB4JF-Bqb8g4kj.js";import{B as s,C as c,V as l,W as u,_ as d,a as f,b as p,c as m,d as h,k as g,v as _}from"./chunk-ABZYJK2D-BnvSyfY9.js";import{t as v}from"./src-B6J6U2nU.js";import{n as y,t as b}from"./chunk-EXTU4WIE-Tk0oOFLx.js";import{p as x,r as S,u as C}from"./chunk-S3R3BYOJ-DAHDl1AH.js";import{n as w,t as T}from"./chunk-4BX2VUAB-YCBeCIVx.js";import{n as E,t as D}from"./mermaid-parser.core-C2W0geRK.js";var O,k,A,j,M,N,P,F,I,L,R;e((()=>{b(),T(),C(),g(),o(),D(),v(),O=h.pie,k={sections:new Map,showData:!1,config:O},A=k.sections,j=k.showData,M=structuredClone(O),N={getConfig:a(()=>structuredClone(M),`getConfig`),clear:a(()=>{A=new Map,j=k.showData,f()},`clear`),setDiagramTitle:u,getDiagramTitle:c,setAccTitle:l,getAccTitle:_,setAccDescription:s,getAccDescription:d,addSection:a(({label:e,value:t})=>{if(t<0)throw Error(`"${e}" has invalid value: ${t}. Negative values are not allowed in pie charts. All slice values must be >= 0.`);A.has(e)||(A.set(e,t),i.debug(`added new section: ${e}, with value: ${t}`))},`addSection`),getSections:a(()=>A,`getSections`),setShowData:a(e=>{j=e},`setShowData`),getShowData:a(()=>j,`getShowData`)},P=a((e,t)=>{w(e,t),t.setShowData(e.showData),e.sections.map(t.addSection)},`populateDb`),F={parse:a(async e=>{let t=await E(`pie`,e);i.debug(t),P(t,N)},`parse`)},I=a(e=>`
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
`,`getStyles`),L=a(e=>{let n=[...e.values()].reduce((e,t)=>e+t,0),r=[...e.entries()].map(([e,t])=>({label:e,value:t})).filter(e=>e.value/n*100>=1).sort((e,t)=>t.value-e.value);return t().value(e=>e.value)(r)},`createPieArcs`),R={parser:F,db:N,renderer:{draw:a((e,t,a,o)=>{i.debug(`rendering pie chart
`+e);let s=o.db,c=p(),l=S(s.getConfig(),c.pie),u=y(t),d=u.append(`g`);d.attr(`transform`,`translate(225,225)`);let{themeVariables:f}=c,[h]=x(f.pieOuterStrokeWidth);h??=2;let g=l.textPosition,_=r().innerRadius(0).outerRadius(185),v=r().innerRadius(185*g).outerRadius(185*g);d.append(`circle`).attr(`cx`,0).attr(`cy`,0).attr(`r`,185+h/2).attr(`class`,`pieOuterCircle`);let b=s.getSections(),C=L(b),w=[f.pie1,f.pie2,f.pie3,f.pie4,f.pie5,f.pie6,f.pie7,f.pie8,f.pie9,f.pie10,f.pie11,f.pie12],T=0;b.forEach(e=>{T+=e});let E=C.filter(e=>(e.data.value/T*100).toFixed(0)!==`0`),D=n(w);d.selectAll(`mySlices`).data(E).enter().append(`path`).attr(`d`,_).attr(`fill`,e=>D(e.data.label)).attr(`class`,`pieCircle`),d.selectAll(`mySlices`).data(E).enter().append(`text`).text(e=>(e.data.value/T*100).toFixed(0)+`%`).attr(`transform`,e=>`translate(`+v.centroid(e)+`)`).style(`text-anchor`,`middle`).attr(`class`,`slice`),d.append(`text`).text(s.getDiagramTitle()).attr(`x`,0).attr(`y`,-400/2).attr(`class`,`pieTitleText`);let O=[...b.entries()].map(([e,t])=>({label:e,value:t})),k=d.selectAll(`.legend`).data(O).enter().append(`g`).attr(`class`,`legend`).attr(`transform`,(e,t)=>{let n=22*O.length/2;return`translate(216,`+(t*22-n)+`)`});k.append(`rect`).attr(`width`,18).attr(`height`,18).style(`fill`,e=>D(e.label)).style(`stroke`,e=>D(e.label)),k.append(`text`).attr(`x`,22).attr(`y`,14).text(e=>s.getShowData()?`${e.label} [${e.value}]`:e.label);let A=512+Math.max(...k.selectAll(`text`).nodes().map(e=>e?.getBoundingClientRect().width??0));u.attr(`viewBox`,`0 0 ${A} 450`),m(u,450,A,l.useMaxWidth)},`draw`)},styles:I}}))();export{R as diagram};
//# sourceMappingURL=pieDiagram-ADFJNKIX-OVIqW0C8.js.map