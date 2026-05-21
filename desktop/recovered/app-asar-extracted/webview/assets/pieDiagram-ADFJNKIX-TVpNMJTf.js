import"./chunk-FPAJGGOC-MuvkG0Bd.js";import{f as e,r as t}from"./chunk-S3R3BYOJ-5zDRn6nL.js";import"./chunk-O7ZBX7Z2-BZEIbRUw.js";import"./chunk-S6J4BHB3-sfk4j3lb.js";import"./chunk-LBM3YZW2-Bvej5fGK.js";import"./chunk-76Q3JFCE-uBvPYbQn.js";import"./chunk-T53DSG4Q-BHHMz0hk.js";import"./chunk-LHMN2FUI-rZldtcRW.js";import"./chunk-FWNWRKHM-BwdMpJEf.js";import{i as n,r}from"./src-DXdm7MTq.js";import{t as i}from"./ordinal-Cfda_VbN.js";import{t as a}from"./arc-Dgx7D0pn.js";import{t as o}from"./pie-LLEhmXvx.js";import{B as s,C as c,U as l,_ as u,a as d,b as f,c as p,d as m,v as h,z as g}from"./chunk-ABZYJK2D-DvAKbH5X.js";import{t as _}from"./chunk-EXTU4WIE-CgAipfme.js";import"./dist-Dkaf81wL.js";import{t as v}from"./chunk-4BX2VUAB-DP9TzDB2.js";import{t as y}from"./mermaid-parser.core-DlxdytOs.js";var b=m.pie,x={sections:new Map,showData:!1,config:b},S=x.sections,C=x.showData,w=structuredClone(b),T={getConfig:r(()=>structuredClone(w),`getConfig`),clear:r(()=>{S=new Map,C=x.showData,d()},`clear`),setDiagramTitle:l,getDiagramTitle:c,setAccTitle:s,getAccTitle:h,setAccDescription:g,getAccDescription:u,addSection:r(({label:e,value:t})=>{if(t<0)throw Error(`"${e}" has invalid value: ${t}. Negative values are not allowed in pie charts. All slice values must be >= 0.`);S.has(e)||(S.set(e,t),n.debug(`added new section: ${e}, with value: ${t}`))},`addSection`),getSections:r(()=>S,`getSections`),setShowData:r(e=>{C=e},`setShowData`),getShowData:r(()=>C,`getShowData`)},E=r((e,t)=>{v(e,t),t.setShowData(e.showData),e.sections.map(t.addSection)},`populateDb`),D={parse:r(async e=>{let t=await y(`pie`,e);n.debug(t),E(t,T)},`parse`)},O=r(e=>`
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
`,`getStyles`),k=r(e=>{let t=[...e.values()].reduce((e,t)=>e+t,0),n=[...e.entries()].map(([e,t])=>({label:e,value:t})).filter(e=>e.value/t*100>=1).sort((e,t)=>t.value-e.value);return o().value(e=>e.value)(n)},`createPieArcs`),A={parser:D,db:T,renderer:{draw:r((r,o,s,c)=>{n.debug(`rendering pie chart
`+r);let l=c.db,u=f(),d=t(l.getConfig(),u.pie),m=_(o),h=m.append(`g`);h.attr(`transform`,`translate(225,225)`);let{themeVariables:g}=u,[v]=e(g.pieOuterStrokeWidth);v??=2;let y=d.textPosition,b=a().innerRadius(0).outerRadius(185),x=a().innerRadius(185*y).outerRadius(185*y);h.append(`circle`).attr(`cx`,0).attr(`cy`,0).attr(`r`,185+v/2).attr(`class`,`pieOuterCircle`);let S=l.getSections(),C=k(S),w=[g.pie1,g.pie2,g.pie3,g.pie4,g.pie5,g.pie6,g.pie7,g.pie8,g.pie9,g.pie10,g.pie11,g.pie12],T=0;S.forEach(e=>{T+=e});let E=C.filter(e=>(e.data.value/T*100).toFixed(0)!==`0`),D=i(w);h.selectAll(`mySlices`).data(E).enter().append(`path`).attr(`d`,b).attr(`fill`,e=>D(e.data.label)).attr(`class`,`pieCircle`),h.selectAll(`mySlices`).data(E).enter().append(`text`).text(e=>(e.data.value/T*100).toFixed(0)+`%`).attr(`transform`,e=>`translate(`+x.centroid(e)+`)`).style(`text-anchor`,`middle`).attr(`class`,`slice`),h.append(`text`).text(l.getDiagramTitle()).attr(`x`,0).attr(`y`,-400/2).attr(`class`,`pieTitleText`);let O=[...S.entries()].map(([e,t])=>({label:e,value:t})),A=h.selectAll(`.legend`).data(O).enter().append(`g`).attr(`class`,`legend`).attr(`transform`,(e,t)=>{let n=22*O.length/2;return`translate(216,`+(t*22-n)+`)`});A.append(`rect`).attr(`width`,18).attr(`height`,18).style(`fill`,e=>D(e.label)).style(`stroke`,e=>D(e.label)),A.append(`text`).attr(`x`,22).attr(`y`,14).text(e=>l.getShowData()?`${e.label} [${e.value}]`:e.label);let j=512+Math.max(...A.selectAll(`text`).nodes().map(e=>e?.getBoundingClientRect().width??0));m.attr(`viewBox`,`0 0 ${j} 450`),p(m,450,j,d.useMaxWidth)},`draw`)},styles:O};export{A as diagram};
//# sourceMappingURL=pieDiagram-ADFJNKIX-TVpNMJTf.js.map