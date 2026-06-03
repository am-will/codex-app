import"./main-BFTHe6RY.js";import"./chunk-K5T4RW27-CIvAbCBS.js";import"./chunk-7N4EOEYR-CAcZDzbh.js";import"./chunk-67CJDMHE-C-dITdcZ.js";import"./chunk-KGLVRYIC-DU2HGsau.js";import"./chunk-FOC6F5B3-B0gygXWV.js";import"./chunk-AA7GKIK3-B5Je89hs.js";import"./chunk-2KRD3SAO-DKg6NFJe.js";import"./chunk-ORNJ4GCN-B7bzN4Vp.js";import"./chunk-LIHQZDEY-DnSbArHv.js";import"./chunk-CIAEETIT-CKs8trhv.js";import"./src-BHeH9bp0.js";import"./dist-OQR0lEt7.js";import{n as e,r as t}from"./chunk-AGHRB4JF-Dk9Dm4Nw.js";import{B as n,C as r,V as i,W as a,_ as o,a as s,c,d as l,v as u,y as d}from"./chunk-ICPOFSXX-A2He3RrE.js";import{t as f}from"./chunk-426QAEUC-D4VNc0Hf.js";import{r as p}from"./chunk-5PVQY5BW-CnaqcI9r.js";import{t as m}from"./chunk-4BX2VUAB-Bu0VDGOe.js";import{t as h}from"./mermaid-parser.core-CwYzIrth.js";var g=l.packet,_=class{constructor(){this.packet=[],this.setAccTitle=i,this.getAccTitle=u,this.setDiagramTitle=a,this.getDiagramTitle=r,this.getAccDescription=o,this.setAccDescription=n}static{e(this,`PacketDB`)}getConfig(){let e=p({...g,...d().packet});return e.showBits&&(e.paddingY+=10),e}getPacket(){return this.packet}pushWord(e){e.length>0&&this.packet.push(e)}clear(){s(),this.packet=[]}},v=1e4,y=e((e,n)=>{m(e,n);let r=-1,i=[],a=1,{bitsPerRow:o}=n.getConfig();for(let{start:s,end:c,bits:l,label:u}of e.blocks){if(s!==void 0&&c!==void 0&&c<s)throw Error(`Packet block ${s} - ${c} is invalid. End must be greater than start.`);if(s??=r+1,s!==r+1)throw Error(`Packet block ${s} - ${c??s} is not contiguous. It should start from ${r+1}.`);if(l===0)throw Error(`Packet block ${s} is invalid. Cannot have a zero bit field.`);for(c??=s+(l??1)-1,l??=c-s+1,r=c,t.debug(`Packet block ${s} - ${r} with label ${u}`);i.length<=o+1&&n.getPacket().length<v;){let[e,t]=b({start:s,end:c,bits:l,label:u},a,o);if(i.push(e),e.end+1===a*o&&(n.pushWord(i),i=[],a++),!t)break;({start:s,end:c,bits:l,label:u}=t)}}n.pushWord(i)},`populate`),b=e((e,t,n)=>{if(e.start===void 0)throw Error(`start should have been set during first phase`);if(e.end===void 0)throw Error(`end should have been set during first phase`);if(e.start>e.end)throw Error(`Block start ${e.start} is greater than block end ${e.end}.`);if(e.end+1<=t*n)return[e,void 0];let r=t*n-1,i=t*n;return[{start:e.start,end:r,label:e.label,bits:r-e.start},{start:i,end:e.end,label:e.label,bits:e.end-i}]},`getNextFittingBlock`),x={parser:{yy:void 0},parse:e(async e=>{let n=await h(`packet`,e),r=x.parser?.yy;if(!(r instanceof _))throw Error(`parser.parser?.yy was not a PacketDB. This is due to a bug within Mermaid, please report this issue at https://github.com/mermaid-js/mermaid/issues.`);t.debug(n),y(n,r)},`parse`)},S=e((e,t,n,r)=>{let i=r.db,a=i.getConfig(),{rowHeight:o,paddingY:s,bitWidth:l,bitsPerRow:u}=a,d=i.getPacket(),p=i.getDiagramTitle(),m=o+s,h=m*(d.length+1)-(p?0:o),g=l*u+2,_=f(t);_.attr(`viewBox`,`0 0 ${g} ${h}`),c(_,h,g,a.useMaxWidth);for(let[e,t]of d.entries())C(_,t,e,a);_.append(`text`).text(p).attr(`x`,g/2).attr(`y`,h-m/2).attr(`dominant-baseline`,`middle`).attr(`text-anchor`,`middle`).attr(`class`,`packetTitle`)},`draw`),C=e((e,t,n,{rowHeight:r,paddingX:i,paddingY:a,bitWidth:o,bitsPerRow:s,showBits:c})=>{let l=e.append(`g`),u=n*(r+a)+a;for(let e of t){let t=e.start%s*o+1,n=(e.end-e.start+1)*o-i;if(l.append(`rect`).attr(`x`,t).attr(`y`,u).attr(`width`,n).attr(`height`,r).attr(`class`,`packetBlock`),l.append(`text`).attr(`x`,t+n/2).attr(`y`,u+r/2).attr(`class`,`packetLabel`).attr(`dominant-baseline`,`middle`).attr(`text-anchor`,`middle`).text(e.label),!c)continue;let a=e.end===e.start,d=u-2;l.append(`text`).attr(`x`,t+(a?n/2:0)).attr(`y`,d).attr(`class`,`packetByte start`).attr(`dominant-baseline`,`auto`).attr(`text-anchor`,a?`middle`:`start`).text(e.start),a||l.append(`text`).attr(`x`,t+n).attr(`y`,d).attr(`class`,`packetByte end`).attr(`dominant-baseline`,`auto`).attr(`text-anchor`,`end`).text(e.end)}},`drawWord`),w={draw:S},T={byteFontSize:`10px`,startByteColor:`black`,endByteColor:`black`,labelColor:`black`,labelFontSize:`12px`,titleColor:`black`,titleFontSize:`14px`,blockStrokeColor:`black`,blockStrokeWidth:`1`,blockFillColor:`#efefef`},E={parser:x,get db(){return new _},renderer:w,styles:e(({packet:e}={})=>{let t=p(T,e);return`
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
	`},`styles`)};export{E as diagram};
//# sourceMappingURL=diagram-TYMM5635-BwGzRl9K.js.map