import"./chunk-FPAJGGOC-Dh-B19jq.js";import{r as e}from"./chunk-S3R3BYOJ-D5V2Plja.js";import"./chunk-O7ZBX7Z2-D1QlVGOw.js";import"./chunk-S6J4BHB3-EW-Dzq82.js";import"./chunk-LBM3YZW2-DamQgf2F.js";import"./chunk-76Q3JFCE-D5xC4o5b.js";import"./chunk-T53DSG4Q-BA8Y6flA.js";import"./chunk-LHMN2FUI-CPw9X4tK.js";import"./chunk-FWNWRKHM-YcNZlVaQ.js";import{g as t,h as n}from"./src-DQtvLihn.js";import{B as r,C as i,T as a,U as o,_ as s,a as c,d as l,v as u,y as d,z as f}from"./chunk-ABZYJK2D-D596mVDq.js";import{t as p}from"./chunk-EXTU4WIE-iCJNcPOi.js";import"./dist-DBNVqpk8.js";import{t as m}from"./chunk-4BX2VUAB-DDx-Kd9p.js";import{t as h}from"./mermaid-parser.core-B5V6Lj7G.js";var g={showLegend:!0,ticks:5,max:null,min:0,graticule:`circle`},_={axes:[],curves:[],options:g},v=structuredClone(_),y=l.radar,b=n(()=>e({...y,...d().radar}),`getConfig`),x=n(()=>v.axes,`getAxes`),S=n(()=>v.curves,`getCurves`),C=n(()=>v.options,`getOptions`),w=n(e=>{v.axes=e.map(e=>({name:e.name,label:e.label??e.name}))},`setAxes`),T=n(e=>{v.curves=e.map(e=>({name:e.name,label:e.label??e.name,entries:E(e.entries)}))},`setCurves`),E=n(e=>{if(e[0].axis==null)return e.map(e=>e.value);let t=x();if(t.length===0)throw Error(`Axes must be populated before curves for reference entries`);return t.map(t=>{let n=e.find(e=>e.axis?.$refText===t.name);if(n===void 0)throw Error(`Missing entry for axis `+t.label);return n.value})},`computeCurveEntries`),D={getAxes:x,getCurves:S,getOptions:C,setAxes:w,setCurves:T,setOptions:n(e=>{let t=e.reduce((e,t)=>(e[t.name]=t,e),{});v.options={showLegend:t.showLegend?.value??g.showLegend,ticks:t.ticks?.value??g.ticks,max:t.max?.value??g.max,min:t.min?.value??g.min,graticule:t.graticule?.value??g.graticule}},`setOptions`),getConfig:b,clear:n(()=>{c(),v=structuredClone(_)},`clear`),setAccTitle:r,getAccTitle:u,setDiagramTitle:o,getDiagramTitle:i,getAccDescription:s,setAccDescription:f},O=n(e=>{m(e,D);let{axes:t,curves:n,options:r}=e;D.setAxes(t),D.setCurves(n),D.setOptions(r)},`populate`),k={parse:n(async e=>{let n=await h(`radar`,e);t.debug(n),O(n)},`parse`)},A=n((e,t,n,r)=>{let i=r.db,a=i.getAxes(),o=i.getCurves(),s=i.getOptions(),c=i.getConfig(),l=i.getDiagramTitle(),u=j(p(t),c),d=s.max??Math.max(...o.map(e=>Math.max(...e.entries))),f=s.min,m=Math.min(c.width,c.height)/2;M(u,a,m,s.ticks,s.graticule),N(u,a,m,c),P(u,a,o,f,d,s.graticule,c),L(u,o,s.showLegend,c),u.append(`text`).attr(`class`,`radarTitle`).text(l).attr(`x`,0).attr(`y`,-c.height/2-c.marginTop)},`draw`),j=n((e,t)=>{let n=t.width+t.marginLeft+t.marginRight,r=t.height+t.marginTop+t.marginBottom,i={x:t.marginLeft+t.width/2,y:t.marginTop+t.height/2};return e.attr(`viewbox`,`0 0 ${n} ${r}`).attr(`width`,n).attr(`height`,r),e.append(`g`).attr(`transform`,`translate(${i.x}, ${i.y})`)},`drawFrame`),M=n((e,t,n,r,i)=>{if(i===`circle`)for(let t=0;t<r;t++){let i=n*(t+1)/r;e.append(`circle`).attr(`r`,i).attr(`class`,`radarGraticule`)}else if(i===`polygon`){let i=t.length;for(let a=0;a<r;a++){let o=n*(a+1)/r,s=t.map((e,t)=>{let n=2*t*Math.PI/i-Math.PI/2;return`${o*Math.cos(n)},${o*Math.sin(n)}`}).join(` `);e.append(`polygon`).attr(`points`,s).attr(`class`,`radarGraticule`)}}},`drawGraticule`),N=n((e,t,n,r)=>{let i=t.length;for(let a=0;a<i;a++){let o=t[a].label,s=2*a*Math.PI/i-Math.PI/2;e.append(`line`).attr(`x1`,0).attr(`y1`,0).attr(`x2`,n*r.axisScaleFactor*Math.cos(s)).attr(`y2`,n*r.axisScaleFactor*Math.sin(s)).attr(`class`,`radarAxisLine`),e.append(`text`).text(o).attr(`x`,n*r.axisLabelFactor*Math.cos(s)).attr(`y`,n*r.axisLabelFactor*Math.sin(s)).attr(`class`,`radarAxisLabel`)}},`drawAxes`);function P(e,t,n,r,i,a,o){let s=t.length,c=Math.min(o.width,o.height)/2;n.forEach((t,n)=>{if(t.entries.length!==s)return;let l=t.entries.map((e,t)=>{let n=2*Math.PI*t/s-Math.PI/2,a=F(e,r,i,c);return{x:a*Math.cos(n),y:a*Math.sin(n)}});a===`circle`?e.append(`path`).attr(`d`,I(l,o.curveTension)).attr(`class`,`radarCurve-${n}`):a===`polygon`&&e.append(`polygon`).attr(`points`,l.map(e=>`${e.x},${e.y}`).join(` `)).attr(`class`,`radarCurve-${n}`)})}n(P,`drawCurves`);function F(e,t,n,r){return r*(Math.min(Math.max(e,t),n)-t)/(n-t)}n(F,`relativeRadius`);function I(e,t){let n=e.length,r=`M${e[0].x},${e[0].y}`;for(let i=0;i<n;i++){let a=e[(i-1+n)%n],o=e[i],s=e[(i+1)%n],c=e[(i+2)%n],l={x:o.x+(s.x-a.x)*t,y:o.y+(s.y-a.y)*t},u={x:s.x-(c.x-o.x)*t,y:s.y-(c.y-o.y)*t};r+=` C${l.x},${l.y} ${u.x},${u.y} ${s.x},${s.y}`}return`${r} Z`}n(I,`closedRoundCurve`);function L(e,t,n,r){if(!n)return;let i=(r.width/2+r.marginRight)*3/4,a=-(r.height/2+r.marginTop)*3/4;t.forEach((t,n)=>{let r=e.append(`g`).attr(`transform`,`translate(${i}, ${a+n*20})`);r.append(`rect`).attr(`width`,12).attr(`height`,12).attr(`class`,`radarLegendBox-${n}`),r.append(`text`).attr(`x`,16).attr(`y`,0).attr(`class`,`radarLegendText`).text(t.label)})}n(L,`drawLegend`);var R={draw:A},z=n((e,t)=>{let n=``;for(let r=0;r<e.THEME_COLOR_LIMIT;r++){let i=e[`cScale${r}`];n+=`
		.radarCurve-${r} {
			color: ${i};
			fill: ${i};
			fill-opacity: ${t.curveOpacity};
			stroke: ${i};
			stroke-width: ${t.curveStrokeWidth};
		}
		.radarLegendBox-${r} {
			fill: ${i};
			fill-opacity: ${t.curveOpacity};
			stroke: ${i};
		}
		`}return n},`genIndexStyles`),B=n(t=>{let n=e(a(),d().themeVariables);return{themeVariables:n,radarOptions:e(n.radar,t)}},`buildRadarStyleOptions`),V={parser:k,db:D,renderer:R,styles:n(({radar:e}={})=>{let{themeVariables:t,radarOptions:n}=B(e);return`
	.radarTitle {
		font-size: ${t.fontSize};
		color: ${t.titleColor};
		dominant-baseline: hanging;
		text-anchor: middle;
	}
	.radarAxisLine {
		stroke: ${n.axisColor};
		stroke-width: ${n.axisStrokeWidth};
	}
	.radarAxisLabel {
		dominant-baseline: middle;
		text-anchor: middle;
		font-size: ${n.axisLabelFontSize}px;
		color: ${n.axisColor};
	}
	.radarGraticule {
		fill: ${n.graticuleColor};
		fill-opacity: ${n.graticuleOpacity};
		stroke: ${n.graticuleColor};
		stroke-width: ${n.graticuleStrokeWidth};
	}
	.radarLegendText {
		text-anchor: start;
		font-size: ${n.legendFontSize}px;
		dominant-baseline: hanging;
	}
	${z(t,n)}
	`},`styles`)};export{V as diagram};
//# sourceMappingURL=diagram-QEK2KX5R-zw2OurbZ.js.map