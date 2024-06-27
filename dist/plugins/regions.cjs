"use strict";class t{constructor(){this.listeners={}}on(t,e,i){if(this.listeners[t]||(this.listeners[t]=new Set),this.listeners[t].add(e),null==i?void 0:i.once){const i=()=>{this.un(t,i),this.un(t,e)};return this.on(t,i),i}return()=>this.un(t,e)}un(t,e){var i;null===(i=this.listeners[t])||void 0===i||i.delete(e)}once(t,e){return this.on(t,e,{once:!0})}unAll(){this.listeners={}}emit(t,...e){this.listeners[t]&&this.listeners[t].forEach((t=>t(...e)))}}class e extends t{constructor(t){super(),this.subscriptions=[],this.options=t}onInit(){}_init(t){this.wavesurfer=t,this.onInit()}destroy(){this.emit("destroy"),this.subscriptions.forEach((t=>t()))}}function i(t,e,i,n,s=3,r=0,o=100){if(!t)return()=>{};const a=matchMedia("(pointer: coarse)").matches;let l=()=>{};const h=h=>{if(h.button!==r)return;h.preventDefault(),h.stopPropagation();let d=h.clientX,c=h.clientY,u=!1;const v=Date.now(),g=n=>{if(n.preventDefault(),n.stopPropagation(),a&&Date.now()-v<o)return;const r=n.clientX,l=n.clientY,h=r-d,g=l-c;if(u||Math.abs(h)>s||Math.abs(g)>s){const n=t.getBoundingClientRect(),{left:s,top:o}=n;u||(null==i||i(d-s,c-o),u=!0),e(h,g,r-s,l-o),d=r,c=l}},p=e=>{if(u){const i=e.clientX,s=e.clientY,r=t.getBoundingClientRect(),{left:o,top:a}=r;null==n||n(i-o,s-a)}l()},m=t=>{t.relatedTarget&&t.relatedTarget!==document.documentElement||p(t)},f=t=>{u&&(t.stopPropagation(),t.preventDefault())},b=t=>{u&&t.preventDefault()};document.addEventListener("pointermove",g),document.addEventListener("pointerup",p),document.addEventListener("pointerout",m),document.addEventListener("pointercancel",m),document.addEventListener("touchmove",b,{passive:!1}),document.addEventListener("click",f,{capture:!0}),l=()=>{document.removeEventListener("pointermove",g),document.removeEventListener("pointerup",p),document.removeEventListener("pointerout",m),document.removeEventListener("pointercancel",m),document.removeEventListener("touchmove",b),setTimeout((()=>{document.removeEventListener("click",f,{capture:!0})}),10)}};return t.addEventListener("pointerdown",h),()=>{l(),t.removeEventListener("pointerdown",h)}}function n(t,e){const i=e.xmlns?document.createElementNS(e.xmlns,t):document.createElement(t);for(const[t,s]of Object.entries(e))if("children"===t)for(const[t,s]of Object.entries(e))"string"==typeof s?i.appendChild(document.createTextNode(s)):i.appendChild(n(t,s));else"style"===t?Object.assign(i.style,s):"textContent"===t?i.textContent=s:i.setAttribute(t,s.toString());return i}function s(t,e,i){const s=n(t,e||{});return null==i||i.appendChild(s),s}class r extends t{constructor(t,e,i=0){var n,s,r,o,a,l,h,d;super(),this.totalDuration=e,this.numberOfChannels=i,this.minLength=0,this.maxLength=1/0,this.contentEditable=!1,this.subscriptions=[],this.subscriptions=[],this.id=t.id||`region-${Math.random().toString(32).slice(2)}`,this.start=this.clampPosition(t.start),this.end=this.clampPosition(null!==(n=t.end)&&void 0!==n?n:t.start),this.drag=null===(s=t.drag)||void 0===s||s,this.resize=null===(r=t.resize)||void 0===r||r,this.color=null!==(o=t.color)&&void 0!==o?o:"rgba(0, 0, 0, 0.1)",this.minLength=null!==(a=t.minLength)&&void 0!==a?a:this.minLength,this.maxLength=null!==(l=t.maxLength)&&void 0!==l?l:this.maxLength,this.channelIdx=null!==(h=t.channelIdx)&&void 0!==h?h:-1,this.contentEditable=null!==(d=t.contentEditable)&&void 0!==d?d:this.contentEditable,this.element=this.initElement(),this.setContent(t.content),this.setPart(),this.renderPosition(),this.initMouseEvents()}clampPosition(t){return Math.max(0,Math.min(this.totalDuration,t))}setPart(){const t=this.start===this.end;this.element.setAttribute("part",`${t?"marker":"region"} ${this.id}`)}addResizeHandles(t){const e={position:"absolute",zIndex:"2",width:"6px",height:"100%",top:"0",cursor:"ew-resize",wordBreak:"keep-all"},n=s("div",{part:"region-handle region-handle-left",style:Object.assign(Object.assign({},e),{left:"0",borderLeft:"2px solid rgba(0, 0, 0, 0.5)",borderRadius:"2px 0 0 2px"})},t),r=s("div",{part:"region-handle region-handle-right",style:Object.assign(Object.assign({},e),{right:"0",borderRight:"2px solid rgba(0, 0, 0, 0.5)",borderRadius:"0 2px 2px 0"})},t);this.subscriptions.push(i(n,(t=>this.onResize(t,"start")),(()=>null),(()=>this.onEndResizing()),1),i(r,(t=>this.onResize(t,"end")),(()=>null),(()=>this.onEndResizing()),1))}removeResizeHandles(t){const e=t.querySelector('[part*="region-handle-left"]'),i=t.querySelector('[part*="region-handle-right"]');e&&t.removeChild(e),i&&t.removeChild(i)}initElement(){const t=this.start===this.end;let e=0,i=100;this.channelIdx>=0&&this.channelIdx<this.numberOfChannels&&(i=100/this.numberOfChannels,e=i*this.channelIdx);const n=s("div",{style:{position:"absolute",top:`${e}%`,height:`${i}%`,backgroundColor:t?"none":this.color,borderLeft:t?"2px solid "+this.color:"none",borderRadius:"2px",boxSizing:"border-box",transition:"background-color 0.2s ease",cursor:this.drag?"grab":"default",pointerEvents:"all"}});return!t&&this.resize&&this.addResizeHandles(n),n}renderPosition(){const t=this.start/this.totalDuration,e=(this.totalDuration-this.end)/this.totalDuration;this.element.style.left=100*t+"%",this.element.style.right=100*e+"%"}toggleCursor(t){var e;this.drag&&(null===(e=this.element)||void 0===e?void 0:e.style)&&(this.element.style.cursor=t?"grabbing":"grab")}initMouseEvents(){const{element:t}=this;t&&(t.addEventListener("click",(t=>this.emit("click",t))),t.addEventListener("mouseenter",(t=>this.emit("over",t))),t.addEventListener("mouseleave",(t=>this.emit("leave",t))),t.addEventListener("dblclick",(t=>this.emit("dblclick",t))),t.addEventListener("pointerdown",(()=>this.toggleCursor(!0))),t.addEventListener("pointerup",(()=>this.toggleCursor(!1))),this.subscriptions.push(i(t,(t=>this.onMove(t)),(()=>this.toggleCursor(!0)),(()=>{this.toggleCursor(!1),this.drag&&this.emit("update-end")}))),this.contentEditable&&this.content&&(this.content.addEventListener("click",(t=>this.onContentClick(t))),this.content.addEventListener("blur",(()=>this.onContentBlur()))))}_onUpdate(t,e){if(!this.element.parentElement)return;const{width:i}=this.element.parentElement.getBoundingClientRect(),n=t/i*this.totalDuration,s=e&&"start"!==e?this.start:this.start+n,r=e&&"end"!==e?this.end:this.end+n,o=r-s;s>=0&&r<=this.totalDuration&&s<=r&&o>=this.minLength&&o<=this.maxLength&&(this.start=s,this.end=r,this.renderPosition(),this.emit("update",e))}onMove(t){this.drag&&this._onUpdate(t)}onResize(t,e){this.resize&&this._onUpdate(t,e)}onEndResizing(){this.resize&&this.emit("update-end")}onContentClick(t){t.stopPropagation();t.target.focus(),this.emit("click",t)}onContentBlur(){this.emit("update-end")}_setTotalDuration(t){this.totalDuration=t,this.renderPosition()}play(){this.emit("play")}setContent(t){var e;if(null===(e=this.content)||void 0===e||e.remove(),t){if("string"==typeof t){const e=this.start===this.end;this.content=s("div",{style:{padding:`0.2em ${e?.2:.4}em`,display:"inline-block"},textContent:t})}else this.content=t;this.contentEditable&&(this.content.contentEditable="true"),this.content.setAttribute("part","region-content"),this.element.appendChild(this.content)}else this.content=void 0}setOptions(t){var e,i;if(t.color&&(this.color=t.color,this.element.style.backgroundColor=this.color),void 0!==t.drag&&(this.drag=t.drag,this.element.style.cursor=this.drag?"grab":"default"),void 0!==t.start||void 0!==t.end){const n=this.start===this.end;this.start=this.clampPosition(null!==(e=t.start)&&void 0!==e?e:this.start),this.end=this.clampPosition(null!==(i=t.end)&&void 0!==i?i:n?this.start:this.end),this.renderPosition(),this.setPart()}if(t.content&&this.setContent(t.content),t.id&&(this.id=t.id,this.setPart()),void 0!==t.resize&&t.resize!==this.resize){const e=this.start===this.end;this.resize=t.resize,this.resize&&!e?this.addResizeHandles(this.element):this.removeResizeHandles(this.element)}}remove(){this.emit("remove"),this.subscriptions.forEach((t=>t())),this.element.remove(),this.element=null}}class o extends e{constructor(t){super(t),this.regions=[],this.regionsContainer=this.initRegionsContainer()}static create(t){return new o(t)}onInit(){if(!this.wavesurfer)throw Error("WaveSurfer is not initialized");this.wavesurfer.getWrapper().appendChild(this.regionsContainer);let t=[];this.subscriptions.push(this.wavesurfer.on("timeupdate",(e=>{const i=this.regions.filter((t=>t.start<=e&&(t.end===t.start?t.start+.05:t.end)>=e));i.forEach((e=>{t.includes(e)||this.emit("region-in",e)})),t.forEach((t=>{i.includes(t)||this.emit("region-out",t)})),t=i})))}initRegionsContainer(){return s("div",{style:{position:"absolute",top:"0",left:"0",width:"100%",height:"100%",zIndex:"3",pointerEvents:"none"}})}getRegions(){return this.regions}avoidOverlapping(t){t.content&&setTimeout((()=>{const e=t.content,i=e.getBoundingClientRect(),n=this.regions.map((e=>{if(e===t||!e.content)return 0;const n=e.content.getBoundingClientRect();return i.left<n.left+n.width&&n.left<i.left+i.width?n.height:0})).reduce(((t,e)=>t+e),0);e.style.marginTop=`${n}px`}),10)}adjustScroll(t){var e,i;const n=null===(i=null===(e=this.wavesurfer)||void 0===e?void 0:e.getWrapper())||void 0===i?void 0:i.parentElement;if(!n)return;const{clientWidth:s,scrollWidth:r}=n;if(r<=s)return;const o=n.getBoundingClientRect(),a=t.element.getBoundingClientRect(),l=a.left-o.left,h=a.right-o.left;l<0?n.scrollLeft+=l:h>s&&(n.scrollLeft+=h-s)}virtualAppend(t,e,i){const n=()=>{if(!this.wavesurfer)return;const n=this.wavesurfer.getWidth(),s=this.wavesurfer.getScroll(),r=e.clientWidth,o=this.wavesurfer.getDuration(),a=Math.round(t.start/o*r);a+(Math.round((t.end-t.start)/o*r)||1)>s&&a<s+n?e.appendChild(i):i.remove()};setTimeout((()=>{if(!this.wavesurfer)return;n();const e=this.wavesurfer.on("scroll",n);this.subscriptions.push(t.once("remove",e),e)}),0)}saveRegion(t){this.virtualAppend(t,this.regionsContainer,t.element),this.avoidOverlapping(t),this.regions.push(t);const e=[t.on("update",(e=>{e||this.adjustScroll(t)})),t.on("update-end",(()=>{this.avoidOverlapping(t),this.emit("region-updated",t)})),t.on("play",(()=>{var e,i;null===(e=this.wavesurfer)||void 0===e||e.play(),null===(i=this.wavesurfer)||void 0===i||i.setTime(t.start)})),t.on("click",(e=>{this.emit("region-clicked",t,e)})),t.on("dblclick",(e=>{this.emit("region-double-clicked",t,e)})),t.once("remove",(()=>{e.forEach((t=>t())),this.regions=this.regions.filter((e=>e!==t)),this.emit("region-removed",t)}))];this.subscriptions.push(...e),this.emit("region-created",t)}addRegion(t){var e,i;if(!this.wavesurfer)throw Error("WaveSurfer is not initialized");const n=this.wavesurfer.getDuration(),s=null===(i=null===(e=this.wavesurfer)||void 0===e?void 0:e.getDecodedData())||void 0===i?void 0:i.numberOfChannels,o=new r(t,n,s);return n?this.saveRegion(o):this.subscriptions.push(this.wavesurfer.once("ready",(t=>{o._setTotalDuration(t),this.saveRegion(o)}))),o}enableDragSelection(t,e=3){var n;const s=null===(n=this.wavesurfer)||void 0===n?void 0:n.getWrapper();if(!(s&&s instanceof HTMLElement))return()=>{};let o=null,a=0;return i(s,((t,e,i)=>{o&&o._onUpdate(t,i>a?"end":"start")}),(e=>{var i,n;if(a=e,!this.wavesurfer)return;const s=this.wavesurfer.getDuration(),l=null===(n=null===(i=this.wavesurfer)||void 0===i?void 0:i.getDecodedData())||void 0===n?void 0:n.numberOfChannels,{width:h}=this.wavesurfer.getWrapper().getBoundingClientRect(),d=e/h*s,c=(e+5)/h*s;o=new r(Object.assign(Object.assign({},t),{start:d,end:c}),s,l),this.regionsContainer.appendChild(o.element)}),(()=>{o&&(this.saveRegion(o),o=null)}),e)}clearRegions(){this.regions.forEach((t=>t.remove()))}destroy(){this.clearRegions(),super.destroy(),this.regionsContainer.remove()}}module.exports=o;
