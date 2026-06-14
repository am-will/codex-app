import"./chunk-FPAJGGOC-BsJbE5Db.js";import{f as e,r as t}from"./chunk-S3R3BYOJ-DSGDOHEB.js";import"./main-8Nm_mJLT.js";import"./chunk-O7ZBX7Z2-DNptJx02.js";import"./chunk-S6J4BHB3-C1kZlIar.js";import"./chunk-LBM3YZW2-DDAD6HrF.js";import"./chunk-76Q3JFCE-BUlt-q1L.js";import"./chunk-T53DSG4Q-B0eHOoq8.js";import"./chunk-LHMN2FUI-BC5zptfp.js";import"./chunk-FWNWRKHM-DfXsapG3.js";import"./src-Hv8bSCJ6.js";import{t as n}from"./ordinal-D_LhJoMH.js";import{t as r}from"./arc-B1UTFtqe.js";import{t as i}from"./pie-CB0McdlA.js";import{n as a,r as o}from"./chunk-AGHRB4JF-CxpLiR73.js";import{B as s,C as c,U as l,_ as u,a as d,b as f,c as p,d as m,v as h,z as g}from"./chunk-ABZYJK2D-CQ8Jqss8.js";import{t as _}from"./chunk-EXTU4WIE-DiDvfATV.js";import"./dist-D0w0wI6S.js";import{t as v}from"./chunk-4BX2VUAB-B6KYpv9M.js";import{t as y}from"./mermaid-parser.core-DKTvTJgP.js";var b=m.pie,x={sections:new Map,showData:!1,config:b},S=x.sections,C=x.showData,w=structuredClone(b),T={getConfig:a(()=>structuredClone(w),`getConfig`),clear:a(()=>{S=new Map,C=x.showData,d()},`clear`),setDiagramTitle:l,getDiagramTitle:c,setAccTitle:s,getAccTitle:h,setAccDescription:g,getAccDescription:u,addSection:a(({label:e,value:t})=>{if(t<0)throw Error(`"${e}" has invalid value: ${t}. Negative values are not allowed in pie charts. All slice values must be >= 0.`);S.has(e)||(S.set(e,t),o.debug(`added new section: ${e}, with value: ${t}`))},`addSection`),getSections:a(()=>S,`getSections`),setShowData:a(e=>{C=e},`setShowData`),getShowData:a(()=>C,`getShowData`)},E=a((e,t)=>{v(e,t),t.setShowData(e.showData),e.sections.map(t.addSection)},`populateDb`),D={parse:a(async e=>{let t=await y(`pie`,e);o.debug(t),E(t,T)},`parse`)},O=a(e=>`
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
`,`getStyles`),k=a(e=>{let t=[...e.values()].reduce((e,t)=>e+t,0),n=[...e.entries()].map(([e,t])=>({label:e,value:t})).filter(e=>e.value/t*100>=1).sort((e,t)=>t.value-e.value);return i().value(e=>e.value)(n)},`createPieArcs`),A={parser:D,db:T,renderer:{draw:a((i,a,s,c)=>{o.debug(`rendering pie chart
`+i);let l=c.db,u=f(),d=t(l.getConfig(),u.pie),m=_(a),h=m.append(`g`);h.attr(`transform`,`translate(225,225)`);let{themeVariables:g}=u,[v]=e(g.pieOuterStrokeWidth);v??=2;let y=d.textPosition,b=r().innerRadius(0).outerRadius(185),x=r().innerRadius(185*y).outerRadius(185*y);h.append(`circle`).attr(`cx`,0).attr(`cy`,0).attr(`r`,185+v/2).attr(`class`,`pieOuterCircle`);let S=l.getSections(),C=k(S),w=[g.pie1,g.pie2,g.pie3,g.pie4,g.pie5,g.pie6,g.pie7,g.pie8,g.pie9,g.pie10,g.pie11,g.pie12],T=0;S.forEach(e=>{T+=e});let E=C.filter(e=>(e.data.value/T*100).toFixed(0)!==`0`),D=n(w);h.selectAll(`mySlices`).data(E).enter().append(`path`).attr(`d`,b).attr(`fill`,e=>D(e.data.label)).attr(`class`,`pieCircle`),h.selectAll(`mySlices`).data(E).enter().append(`text`).text(e=>(e.data.value/T*100).toFixed(0)+`%`).attr(`transform`,e=>`translate(`+x.centroid(e)+`)`).style(`text-anchor`,`middle`).attr(`class`,`slice`),h.append(`text`).text(l.getDiagramTitle()).attr(`x`,0).attr(`y`,-400/2).attr(`class`,`pieTitleText`);let O=[...S.entries()].map(([e,t])=>({label:e,value:t})),A=h.selectAll(`.legend`).data(O).enter().append(`g`).attr(`class`,`legend`).attr(`transform`,(e,t)=>{let n=22*O.length/2;return`translate(216,`+(t*22-n)+`)`});A.append(`rect`).attr(`width`,18).attr(`height`,18).style(`fill`,e=>D(e.label)).style(`stroke`,e=>D(e.label)),A.append(`text`).attr(`x`,22).attr(`y`,14).text(e=>l.getShowData()?`${e.label} [${e.value}]`:e.label);let j=512+Math.max(...A.selectAll(`text`).nodes().map(e=>e?.getBoundingClientRect().width??0));m.attr(`viewBox`,`0 0 ${j} 450`),p(m,450,j,d.useMaxWidth)},`draw`)},styles:O};export{A as diagram};
//# sourceMappingURL=pieDiagram-ADFJNKIX-4w6w1tY1.js.map