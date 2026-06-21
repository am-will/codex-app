import"./main-BDm-p1LA.js";import"./chunk-K5T4RW27-1QwNQQi0.js";import"./chunk-7N4EOEYR-BEkdQLCb.js";import"./chunk-67CJDMHE-B3_SAS71.js";import"./chunk-KGLVRYIC-DZY-IxHR.js";import"./chunk-FOC6F5B3-BgcFtwB_.js";import"./chunk-AA7GKIK3-Bic0nqP_.js";import"./chunk-2KRD3SAO-Bdi3VHck.js";import"./chunk-ORNJ4GCN-Dtggxgv1.js";import"./chunk-LIHQZDEY-B0GBEU3_.js";import"./chunk-CIAEETIT-DnOj_Z7m.js";import"./src-n5zF1GB1.js";import{t as e}from"./ordinal-jw163_Ud.js";import{t}from"./arc-D3MQZVTw.js";import{t as n}from"./pie-ChHHloNp.js";import"./dist-D8VrLBqU.js";import{n as r,r as i}from"./chunk-AGHRB4JF-Bxy73eEy.js";import{B as a,C as o,V as s,W as c,_ as l,a as u,b as d,c as f,d as p,v as m}from"./chunk-ICPOFSXX-Dk2rFw9E.js";import{t as h}from"./chunk-426QAEUC-SBg7XJ-1.js";import{f as g,r as _}from"./chunk-5PVQY5BW-CsieDbRK.js";import{t as v}from"./chunk-4BX2VUAB-Dutn5tdG.js";import{t as y}from"./mermaid-parser.core-DWICYyNZ.js";var b=p.pie,x={sections:new Map,showData:!1,config:b},S=x.sections,C=x.showData,w=structuredClone(b),T={getConfig:r(()=>structuredClone(w),`getConfig`),clear:r(()=>{S=new Map,C=x.showData,u()},`clear`),setDiagramTitle:c,getDiagramTitle:o,setAccTitle:s,getAccTitle:m,setAccDescription:a,getAccDescription:l,addSection:r(({label:e,value:t})=>{if(t<0)throw Error(`"${e}" has invalid value: ${t}. Negative values are not allowed in pie charts. All slice values must be >= 0.`);S.has(e)||(S.set(e,t),i.debug(`added new section: ${e}, with value: ${t}`))},`addSection`),getSections:r(()=>S,`getSections`),setShowData:r(e=>{C=e},`setShowData`),getShowData:r(()=>C,`getShowData`)},E=r((e,t)=>{v(e,t),t.setShowData(e.showData),e.sections.map(t.addSection)},`populateDb`),D={parse:r(async e=>{let t=await y(`pie`,e);i.debug(t),E(t,T)},`parse`)},O=r(e=>`
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
`,`getStyles`),k=r(e=>{let t=[...e.values()].reduce((e,t)=>e+t,0),r=[...e.entries()].map(([e,t])=>({label:e,value:t})).filter(e=>e.value/t*100>=1);return n().value(e=>e.value).sort(null)(r)},`createPieArcs`),A={parser:D,db:T,renderer:{draw:r((n,r,a,o)=>{i.debug(`rendering pie chart
`+n);let s=o.db,c=d(),l=_(s.getConfig(),c.pie),u=h(r),p=u.append(`g`);p.attr(`transform`,`translate(225,225)`);let{themeVariables:m}=c,[v]=g(m.pieOuterStrokeWidth);v??=2;let y=l.textPosition,b=t().innerRadius(0).outerRadius(185),x=t().innerRadius(185*y).outerRadius(185*y);p.append(`circle`).attr(`cx`,0).attr(`cy`,0).attr(`r`,185+v/2).attr(`class`,`pieOuterCircle`);let S=s.getSections(),C=k(S),w=[m.pie1,m.pie2,m.pie3,m.pie4,m.pie5,m.pie6,m.pie7,m.pie8,m.pie9,m.pie10,m.pie11,m.pie12],T=0;S.forEach(e=>{T+=e});let E=C.filter(e=>(e.data.value/T*100).toFixed(0)!==`0`),D=e(w).domain([...S.keys()]);p.selectAll(`mySlices`).data(E).enter().append(`path`).attr(`d`,b).attr(`fill`,e=>D(e.data.label)).attr(`class`,`pieCircle`),p.selectAll(`mySlices`).data(E).enter().append(`text`).text(e=>(e.data.value/T*100).toFixed(0)+`%`).attr(`transform`,e=>`translate(`+x.centroid(e)+`)`).style(`text-anchor`,`middle`).attr(`class`,`slice`);let O=p.append(`text`).text(s.getDiagramTitle()).attr(`x`,0).attr(`y`,-400/2).attr(`class`,`pieTitleText`),A=[...S.entries()].map(([e,t])=>({label:e,value:t})),j=p.selectAll(`.legend`).data(A).enter().append(`g`).attr(`class`,`legend`).attr(`transform`,(e,t)=>{let n=22*A.length/2;return`translate(216,`+(t*22-n)+`)`});j.append(`rect`).attr(`width`,18).attr(`height`,18).style(`fill`,e=>D(e.label)).style(`stroke`,e=>D(e.label)),j.append(`text`).attr(`x`,22).attr(`y`,14).text(e=>s.getShowData()?`${e.label} [${e.value}]`:e.label);let M=512+Math.max(...j.selectAll(`text`).nodes().map(e=>e?.getBoundingClientRect().width??0)),N=O.node()?.getBoundingClientRect().width??0,P=450/2-N/2,F=450/2+N/2,I=Math.min(0,P),L=Math.max(M,F)-I;u.attr(`viewBox`,`${I} 0 ${L} 450`),f(u,450,L,l.useMaxWidth)},`draw`)},styles:O};export{A as diagram};
//# sourceMappingURL=pieDiagram-DEJITSTG-D-t1CIhj.js.map