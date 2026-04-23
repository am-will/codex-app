import{i as e,r as t}from"./src-2El7XCrP.js";import{B as n,C as r,U as i,_ as a,a as o,b as s,c,d as l,v as u,z as d}from"./chunk-ABZYJK2D-CXZGxunx.js";import{t as f}from"./ordinal-CKesWtne.js";import{t as p}from"./arc-DGZn5-AR.js";import{t as m}from"./pie-CeOB3DMq.js";import{f as h,r as g}from"./chunk-S3R3BYOJ-BIv4aLm_.js";import{t as _}from"./chunk-EXTU4WIE-Dy2IFYXd.js";import"./dist-5umTmRtp.js";import"./chunk-FPAJGGOC-BbtabzP1.js";import"./chunk-O7ZBX7Z2-CbvIPqiy.js";import"./chunk-S6J4BHB3-BWRmtns5.js";import"./chunk-LBM3YZW2-SUC--XYI.js";import"./chunk-76Q3JFCE-CKKCchkG.js";import"./chunk-T53DSG4Q-D5JyPrhI.js";import"./chunk-LHMN2FUI-B0XexJLb.js";import"./chunk-FWNWRKHM-D-o06PPu.js";import{t as v}from"./chunk-4BX2VUAB-C1k6hDX9.js";import{t as y}from"./mermaid-parser.core-DDtPKQ34.js";var b=l.pie,x={sections:new Map,showData:!1,config:b},S=x.sections,C=x.showData,w=structuredClone(b),T={getConfig:t(()=>structuredClone(w),`getConfig`),clear:t(()=>{S=new Map,C=x.showData,o()},`clear`),setDiagramTitle:i,getDiagramTitle:r,setAccTitle:n,getAccTitle:u,setAccDescription:d,getAccDescription:a,addSection:t(({label:t,value:n})=>{if(n<0)throw Error(`"${t}" has invalid value: ${n}. Negative values are not allowed in pie charts. All slice values must be >= 0.`);S.has(t)||(S.set(t,n),e.debug(`added new section: ${t}, with value: ${n}`))},`addSection`),getSections:t(()=>S,`getSections`),setShowData:t(e=>{C=e},`setShowData`),getShowData:t(()=>C,`getShowData`)},E=t((e,t)=>{v(e,t),t.setShowData(e.showData),e.sections.map(t.addSection)},`populateDb`),D={parse:t(async t=>{let n=await y(`pie`,t);e.debug(n),E(n,T)},`parse`)},O=t(e=>`
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
`,`getStyles`),k=t(e=>{let t=[...e.values()].reduce((e,t)=>e+t,0),n=[...e.entries()].map(([e,t])=>({label:e,value:t})).filter(e=>e.value/t*100>=1).sort((e,t)=>t.value-e.value);return m().value(e=>e.value)(n)},`createPieArcs`),A={parser:D,db:T,renderer:{draw:t((t,n,r,i)=>{e.debug(`rendering pie chart
`+t);let a=i.db,o=s(),l=g(a.getConfig(),o.pie),u=_(n),d=u.append(`g`);d.attr(`transform`,`translate(225,225)`);let{themeVariables:m}=o,[v]=h(m.pieOuterStrokeWidth);v??=2;let y=l.textPosition,b=p().innerRadius(0).outerRadius(185),x=p().innerRadius(185*y).outerRadius(185*y);d.append(`circle`).attr(`cx`,0).attr(`cy`,0).attr(`r`,185+v/2).attr(`class`,`pieOuterCircle`);let S=a.getSections(),C=k(S),w=[m.pie1,m.pie2,m.pie3,m.pie4,m.pie5,m.pie6,m.pie7,m.pie8,m.pie9,m.pie10,m.pie11,m.pie12],T=0;S.forEach(e=>{T+=e});let E=C.filter(e=>(e.data.value/T*100).toFixed(0)!==`0`),D=f(w);d.selectAll(`mySlices`).data(E).enter().append(`path`).attr(`d`,b).attr(`fill`,e=>D(e.data.label)).attr(`class`,`pieCircle`),d.selectAll(`mySlices`).data(E).enter().append(`text`).text(e=>(e.data.value/T*100).toFixed(0)+`%`).attr(`transform`,e=>`translate(`+x.centroid(e)+`)`).style(`text-anchor`,`middle`).attr(`class`,`slice`),d.append(`text`).text(a.getDiagramTitle()).attr(`x`,0).attr(`y`,-400/2).attr(`class`,`pieTitleText`);let O=[...S.entries()].map(([e,t])=>({label:e,value:t})),A=d.selectAll(`.legend`).data(O).enter().append(`g`).attr(`class`,`legend`).attr(`transform`,(e,t)=>{let n=22*O.length/2;return`translate(216,`+(t*22-n)+`)`});A.append(`rect`).attr(`width`,18).attr(`height`,18).style(`fill`,e=>D(e.label)).style(`stroke`,e=>D(e.label)),A.append(`text`).attr(`x`,22).attr(`y`,14).text(e=>a.getShowData()?`${e.label} [${e.value}]`:e.label);let j=512+Math.max(...A.selectAll(`text`).nodes().map(e=>e?.getBoundingClientRect().width??0));u.attr(`viewBox`,`0 0 ${j} 450`),c(u,450,j,l.useMaxWidth)},`draw`)},styles:O};export{A as diagram};
//# sourceMappingURL=pieDiagram-ADFJNKIX-C1eqIVnJ.js.map