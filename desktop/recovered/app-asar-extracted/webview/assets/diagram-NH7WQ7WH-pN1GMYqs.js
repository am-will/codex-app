import{n as e}from"./rolldown-runtime-DAXXjFlN.js";import{n as t,r as n}from"./chunk-Y2CYZVJY-C9L_9xF4.js";import{l as r,u as i}from"./src-GELAvvgW.js";import{U as a,W as o,a as s,b as c,c as l,f as u,j as d,q as f,v as p,w as m,y as h}from"./chunk-WYO6CB5R-BEL2IWz7.js";import{n as g,t as _}from"./chunk-VAUOI2AC-Co5rCc0a.js";import{n as v,t as y}from"./chunk-JWPE2WC7-Blh_Vn-A.js";import{n as b,r as x}from"./mermaid-parser.core-DLNmBpaA.js";import{d as S,i as C}from"./chunk-ICXQ74PX-Dn_cmSJa.js";var w,T,E,D,O,k,A,j,M,N,P;e((()=>{y(),_(),S(),d(),r(),n(),b(),w=u.packet,T=class{constructor(){this.packet=[],this.setAccTitle=o,this.getAccTitle=h,this.setDiagramTitle=f,this.getDiagramTitle=m,this.getAccDescription=p,this.setAccDescription=a}static{t(this,`PacketDB`)}getConfig(){let e=C({...w,...c().packet});return e.showBits&&(e.paddingY+=10),e}getPacket(){return this.packet}pushWord(e){e.length>0&&this.packet.push(e)}clear(){s(),this.packet=[]}},E=1e4,D=t((e,t)=>{v(e,t);let n=-1,r=[],a=1,{bitsPerRow:o}=t.getConfig();for(let{start:s,end:c,bits:l,label:u}of e.blocks){if(s!==void 0&&c!==void 0&&c<s)throw Error(`Packet block ${s} - ${c} is invalid. End must be greater than start.`);if(s??=n+1,s!==n+1)throw Error(`Packet block ${s} - ${c??s} is not contiguous. It should start from ${n+1}.`);if(l===0)throw Error(`Packet block ${s} is invalid. Cannot have a zero bit field.`);for(c??=s+(l??1)-1,l??=c-s+1,n=c,i.debug(`Packet block ${s} - ${n} with label ${u}`);r.length<=o+1&&t.getPacket().length<E;){let[e,n]=O({start:s,end:c,bits:l,label:u},a,o);if(r.push(e),e.end+1===a*o&&(t.pushWord(r),r=[],a++),!n)break;({start:s,end:c,bits:l,label:u}=n)}}t.pushWord(r)},`populate`),O=t((e,t,n)=>{if(e.start===void 0)throw Error(`start should have been set during first phase`);if(e.end===void 0)throw Error(`end should have been set during first phase`);if(e.start>e.end)throw Error(`Block start ${e.start} is greater than block end ${e.end}.`);if(e.end+1<=t*n)return[e,void 0];let r=t*n-1,i=t*n;return[{start:e.start,end:r,label:e.label,bits:r-e.start},{start:i,end:e.end,label:e.label,bits:e.end-i}]},`getNextFittingBlock`),k={parser:{yy:void 0},parse:t(async e=>{let t=await x(`packet`,e),n=k.parser?.yy;if(!(n instanceof T))throw Error(`parser.parser?.yy was not a PacketDB. This is due to a bug within Mermaid, please report this issue at https://github.com/mermaid-js/mermaid/issues.`);i.debug(t),D(t,n)},`parse`)},A=t((e,t,n,r)=>{let i=r.db,a=i.getConfig(),{rowHeight:o,paddingY:s,bitWidth:c,bitsPerRow:u}=a,d=i.getPacket(),f=i.getDiagramTitle(),p=o+s,m=p*(d.length+1)-(f?0:o),h=c*u+2,_=g(t);_.attr(`viewBox`,`0 0 ${h} ${m}`),l(_,m,h,a.useMaxWidth);for(let[e,t]of d.entries())j(_,t,e,a);_.append(`text`).text(f).attr(`x`,h/2).attr(`y`,m-p/2).attr(`dominant-baseline`,`middle`).attr(`text-anchor`,`middle`).attr(`class`,`packetTitle`)},`draw`),j=t((e,t,n,{rowHeight:r,paddingX:i,paddingY:a,bitWidth:o,bitsPerRow:s,showBits:c})=>{let l=e.append(`g`),u=n*(r+a)+a;for(let e of t){let t=e.start%s*o+1,n=(e.end-e.start+1)*o-i;if(l.append(`rect`).attr(`x`,t).attr(`y`,u).attr(`width`,n).attr(`height`,r).attr(`class`,`packetBlock`),l.append(`text`).attr(`x`,t+n/2).attr(`y`,u+r/2).attr(`class`,`packetLabel`).attr(`dominant-baseline`,`middle`).attr(`text-anchor`,`middle`).text(e.label),!c)continue;let a=e.end===e.start,d=u-2;l.append(`text`).attr(`x`,t+(a?n/2:0)).attr(`y`,d).attr(`class`,`packetByte start`).attr(`dominant-baseline`,`auto`).attr(`text-anchor`,a?`middle`:`start`).text(e.start),a||l.append(`text`).attr(`x`,t+n).attr(`y`,d).attr(`class`,`packetByte end`).attr(`dominant-baseline`,`auto`).attr(`text-anchor`,`end`).text(e.end)}},`drawWord`),M={draw:A},N={byteFontSize:`10px`,startByteColor:`black`,endByteColor:`black`,labelColor:`black`,labelFontSize:`12px`,titleColor:`black`,titleFontSize:`14px`,blockStrokeColor:`black`,blockStrokeWidth:`1`,blockFillColor:`#efefef`},P={parser:k,get db(){return new T},renderer:M,styles:t(({packet:e}={})=>{let t=C(N,e);return`
	.packetByte {
		font-size: ${t.byteFontSize};
	}
	.packetByte.start {
		fill: ${t.startByteColor};
	}
	.packetByte.end {
		fill: ${t.endByteColor};
	}
	.packetLabel {
		fill: ${t.labelColor};
		font-size: ${t.labelFontSize};
	}
	.packetTitle {
		fill: ${t.titleColor};
		font-size: ${t.titleFontSize};
	}
	.packetBlock {
		stroke: ${t.blockStrokeColor};
		stroke-width: ${t.blockStrokeWidth};
		fill: ${t.blockFillColor};
	}
	`},`styles`)}}))();export{P as diagram};
//# sourceMappingURL=diagram-NH7WQ7WH-pN1GMYqs.js.map