import{i as e,r as t}from"./src-DwoQmh2p.js";import{t as n}from"./ordinal-BBV4AAIZ.js";import{f as r,r as i}from"./chunk-5PVQY5BW-VrOwugqI.js";import"./chunk-K5T4RW27-DGM_cVYA.js";import{D as a,T as o}from"./runtime.worker-B4oXRaGJ.js";import"./chunk-7N4EOEYR-D3vBGdWK.js";import"./chunk-67CJDMHE-dS3j2yNb.js";import"./chunk-KGLVRYIC-2_pU1Uui.js";import"./chunk-FOC6F5B3-DIovYYQv.js";import"./chunk-AA7GKIK3--EMbbHQf.js";import"./chunk-2KRD3SAO-jbuQ6JrO.js";import"./chunk-ORNJ4GCN-DYY7AInT.js";import"./chunk-LIHQZDEY-nN8HZxGm.js";import"./chunk-CIAEETIT-CX7Ko5zn.js";import{B as s,C as c,V as l,W as u,_ as d,a as f,b as p,c as m,d as h,v as g}from"./chunk-ICPOFSXX-eMbNr9et.js";import{t as _}from"./chunk-426QAEUC-CPad0Vrm.js";import"./dist-WEF1yh7f.js";import{t as v}from"./chunk-4BX2VUAB-CjbaQjC5.js";import{t as y}from"./mermaid-parser.core-prkO3ORs.js";var b=h.pie,x={sections:new Map,showData:!1,config:b},S=x.sections,C=x.showData,w=structuredClone(b),T={getConfig:t(()=>structuredClone(w),`getConfig`),clear:t(()=>{S=new Map,C=x.showData,f()},`clear`),setDiagramTitle:u,getDiagramTitle:c,setAccTitle:l,getAccTitle:g,setAccDescription:s,getAccDescription:d,addSection:t(({label:t,value:n})=>{if(n<0)throw Error(`"${t}" has invalid value: ${n}. Negative values are not allowed in pie charts. All slice values must be >= 0.`);S.has(t)||(S.set(t,n),e.debug(`added new section: ${t}, with value: ${n}`))},`addSection`),getSections:t(()=>S,`getSections`),setShowData:t(e=>{C=e},`setShowData`),getShowData:t(()=>C,`getShowData`)},E=t((e,t)=>{v(e,t),t.setShowData(e.showData),e.sections.map(t.addSection)},`populateDb`),D={parse:t(async t=>{let n=await y(`pie`,t);e.debug(n),E(n,T)},`parse`)},O=t(e=>`
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
`,`getStyles`),k=t(e=>{let t=[...e.values()].reduce((e,t)=>e+t,0),n=[...e.entries()].map(([e,t])=>({label:e,value:t})).filter(e=>e.value/t*100>=1);return o().value(e=>e.value).sort(null)(n)},`createPieArcs`),A={parser:D,db:T,renderer:{draw:t((t,o,s,c)=>{e.debug(`rendering pie chart
`+t);let l=c.db,u=p(),d=i(l.getConfig(),u.pie),f=_(o),h=f.append(`g`);h.attr(`transform`,`translate(225,225)`);let{themeVariables:g}=u,[v]=r(g.pieOuterStrokeWidth);v??=2;let y=d.textPosition,b=a().innerRadius(0).outerRadius(185),x=a().innerRadius(185*y).outerRadius(185*y);h.append(`circle`).attr(`cx`,0).attr(`cy`,0).attr(`r`,185+v/2).attr(`class`,`pieOuterCircle`);let S=l.getSections(),C=k(S),w=[g.pie1,g.pie2,g.pie3,g.pie4,g.pie5,g.pie6,g.pie7,g.pie8,g.pie9,g.pie10,g.pie11,g.pie12],T=0;S.forEach(e=>{T+=e});let E=C.filter(e=>(e.data.value/T*100).toFixed(0)!==`0`),D=n(w).domain([...S.keys()]);h.selectAll(`mySlices`).data(E).enter().append(`path`).attr(`d`,b).attr(`fill`,e=>D(e.data.label)).attr(`class`,`pieCircle`),h.selectAll(`mySlices`).data(E).enter().append(`text`).text(e=>(e.data.value/T*100).toFixed(0)+`%`).attr(`transform`,e=>`translate(`+x.centroid(e)+`)`).style(`text-anchor`,`middle`).attr(`class`,`slice`);let O=h.append(`text`).text(l.getDiagramTitle()).attr(`x`,0).attr(`y`,-400/2).attr(`class`,`pieTitleText`),A=[...S.entries()].map(([e,t])=>({label:e,value:t})),j=h.selectAll(`.legend`).data(A).enter().append(`g`).attr(`class`,`legend`).attr(`transform`,(e,t)=>{let n=22*A.length/2;return`translate(216,`+(t*22-n)+`)`});j.append(`rect`).attr(`width`,18).attr(`height`,18).style(`fill`,e=>D(e.label)).style(`stroke`,e=>D(e.label)),j.append(`text`).attr(`x`,22).attr(`y`,14).text(e=>l.getShowData()?`${e.label} [${e.value}]`:e.label);let M=512+Math.max(...j.selectAll(`text`).nodes().map(e=>e?.getBoundingClientRect().width??0)),N=O.node()?.getBoundingClientRect().width??0,P=450/2-N/2,F=450/2+N/2,I=Math.min(0,P),L=Math.max(M,F)-I;f.attr(`viewBox`,`${I} 0 ${L} 450`),m(f,450,L,d.useMaxWidth)},`draw`)},styles:O};export{A as diagram};
//# sourceMappingURL=pieDiagram-DEJITSTG-C1opPG5o.js.map