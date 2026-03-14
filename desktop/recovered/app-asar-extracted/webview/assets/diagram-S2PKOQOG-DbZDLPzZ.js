import"./chunk-FPAJGGOC-Dh-B19jq.js";import{r as e}from"./chunk-S3R3BYOJ-D5V2Plja.js";import"./chunk-O7ZBX7Z2-D1QlVGOw.js";import"./chunk-S6J4BHB3-EW-Dzq82.js";import"./chunk-LBM3YZW2-DamQgf2F.js";import"./chunk-76Q3JFCE-D5xC4o5b.js";import"./chunk-T53DSG4Q-BA8Y6flA.js";import"./chunk-LHMN2FUI-CPw9X4tK.js";import"./chunk-FWNWRKHM-YcNZlVaQ.js";import{g as t,h as n}from"./src-DQtvLihn.js";import{B as r,C as i,U as a,_ as o,a as s,c,d as l,v as u,y as d,z as f}from"./chunk-ABZYJK2D-D596mVDq.js";import{t as p}from"./chunk-EXTU4WIE-iCJNcPOi.js";import"./dist-DBNVqpk8.js";import{t as m}from"./chunk-4BX2VUAB-DDx-Kd9p.js";import{t as h}from"./mermaid-parser.core-B5V6Lj7G.js";var g=l.packet,_=class{constructor(){this.packet=[],this.setAccTitle=r,this.getAccTitle=u,this.setDiagramTitle=a,this.getDiagramTitle=i,this.getAccDescription=o,this.setAccDescription=f}static{n(this,`PacketDB`)}getConfig(){let t=e({...g,...d().packet});return t.showBits&&(t.paddingY+=10),t}getPacket(){return this.packet}pushWord(e){e.length>0&&this.packet.push(e)}clear(){s(),this.packet=[]}},v=1e4,y=n((e,n)=>{m(e,n);let r=-1,i=[],a=1,{bitsPerRow:o}=n.getConfig();for(let{start:s,end:c,bits:l,label:u}of e.blocks){if(s!==void 0&&c!==void 0&&c<s)throw Error(`Packet block ${s} - ${c} is invalid. End must be greater than start.`);if(s??=r+1,s!==r+1)throw Error(`Packet block ${s} - ${c??s} is not contiguous. It should start from ${r+1}.`);if(l===0)throw Error(`Packet block ${s} is invalid. Cannot have a zero bit field.`);for(c??=s+(l??1)-1,l??=c-s+1,r=c,t.debug(`Packet block ${s} - ${r} with label ${u}`);i.length<=o+1&&n.getPacket().length<v;){let[e,t]=b({start:s,end:c,bits:l,label:u},a,o);if(i.push(e),e.end+1===a*o&&(n.pushWord(i),i=[],a++),!t)break;({start:s,end:c,bits:l,label:u}=t)}}n.pushWord(i)},`populate`),b=n((e,t,n)=>{if(e.start===void 0)throw Error(`start should have been set during first phase`);if(e.end===void 0)throw Error(`end should have been set during first phase`);if(e.start>e.end)throw Error(`Block start ${e.start} is greater than block end ${e.end}.`);if(e.end+1<=t*n)return[e,void 0];let r=t*n-1,i=t*n;return[{start:e.start,end:r,label:e.label,bits:r-e.start},{start:i,end:e.end,label:e.label,bits:e.end-i}]},`getNextFittingBlock`),x={parser:{yy:void 0},parse:n(async e=>{let n=await h(`packet`,e),r=x.parser?.yy;if(!(r instanceof _))throw Error(`parser.parser?.yy was not a PacketDB. This is due to a bug within Mermaid, please report this issue at https://github.com/mermaid-js/mermaid/issues.`);t.debug(n),y(n,r)},`parse`)},S=n((e,t,n,r)=>{let i=r.db,a=i.getConfig(),{rowHeight:o,paddingY:s,bitWidth:l,bitsPerRow:u}=a,d=i.getPacket(),f=i.getDiagramTitle(),m=o+s,h=m*(d.length+1)-(f?0:o),g=l*u+2,_=p(t);_.attr(`viewbox`,`0 0 ${g} ${h}`),c(_,h,g,a.useMaxWidth);for(let[e,t]of d.entries())C(_,t,e,a);_.append(`text`).text(f).attr(`x`,g/2).attr(`y`,h-m/2).attr(`dominant-baseline`,`middle`).attr(`text-anchor`,`middle`).attr(`class`,`packetTitle`)},`draw`),C=n((e,t,n,{rowHeight:r,paddingX:i,paddingY:a,bitWidth:o,bitsPerRow:s,showBits:c})=>{let l=e.append(`g`),u=n*(r+a)+a;for(let e of t){let t=e.start%s*o+1,n=(e.end-e.start+1)*o-i;if(l.append(`rect`).attr(`x`,t).attr(`y`,u).attr(`width`,n).attr(`height`,r).attr(`class`,`packetBlock`),l.append(`text`).attr(`x`,t+n/2).attr(`y`,u+r/2).attr(`class`,`packetLabel`).attr(`dominant-baseline`,`middle`).attr(`text-anchor`,`middle`).text(e.label),!c)continue;let a=e.end===e.start,d=u-2;l.append(`text`).attr(`x`,t+(a?n/2:0)).attr(`y`,d).attr(`class`,`packetByte start`).attr(`dominant-baseline`,`auto`).attr(`text-anchor`,a?`middle`:`start`).text(e.start),a||l.append(`text`).attr(`x`,t+n).attr(`y`,d).attr(`class`,`packetByte end`).attr(`dominant-baseline`,`auto`).attr(`text-anchor`,`end`).text(e.end)}},`drawWord`),w={draw:S},T={byteFontSize:`10px`,startByteColor:`black`,endByteColor:`black`,labelColor:`black`,labelFontSize:`12px`,titleColor:`black`,titleFontSize:`14px`,blockStrokeColor:`black`,blockStrokeWidth:`1`,blockFillColor:`#efefef`},E={parser:x,get db(){return new _},renderer:w,styles:n(({packet:t}={})=>{let n=e(T,t);return`
	.packetByte {
		font-size: ${n.byteFontSize};
	}
	.packetByte.start {
		fill: ${n.startByteColor};
	}
	.packetByte.end {
		fill: ${n.endByteColor};
	}
	.packetLabel {
		fill: ${n.labelColor};
		font-size: ${n.labelFontSize};
	}
	.packetTitle {
		fill: ${n.titleColor};
		font-size: ${n.titleFontSize};
	}
	.packetBlock {
		stroke: ${n.blockStrokeColor};
		stroke-width: ${n.blockStrokeWidth};
		fill: ${n.blockFillColor};
	}
	`},`styles`)};export{E as diagram};
//# sourceMappingURL=diagram-S2PKOQOG-DbZDLPzZ.js.map