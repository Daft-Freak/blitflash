(()=>{"use strict";var e={349:(e,t,i)=>{t.E=void 0;const n=i(732);Object.defineProperty(t,"E",{enumerable:!0,get:function(){return n.BlitFlasher}})},426:function(e,t,i){var n=this&&this.__awaiter||function(e,t,i,n){return new(i||(i=Promise))((function(r,s){function o(e){try{a(n.next(e))}catch(e){s(e)}}function d(e){try{a(n.throw(e))}catch(e){s(e)}}function a(e){var t;e.done?r(e.value):(t=e.value,t instanceof i?t:new i((function(e){e(t)}))).then(o,d)}a((n=n.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.BlitConnection=void 0;const r=i(164),s=i(479);t.BlitConnection=class{constructor(e,t){this.reader=e,this.writer=t,this.encoder=new TextEncoder,this.decoder=new TextDecoder,this.readBuffer=new s.ReadBuffer,this.readLoop()}readLoop(){return n(this,void 0,void 0,(function*(){for(;;){const{value:e,done:t}=yield this.reader.read();if(e&&this.readBuffer.append(e),t){this.reader.releaseLock(),this.readBuffer.failPendingPromises(new Error("ReadableStream is done."));break}}}))}write(e){return n(this,void 0,void 0,(function*(){const t=this.encoder.encode(e);yield this.writer.write(t)}))}close(){return n(this,void 0,void 0,(function*(){yield this.writer.close(),yield this.reader.cancel()}))}reset(){return n(this,void 0,void 0,(function*(){yield this.write("32BL_RST\0"),yield this.writer.ready}))}status(){return n(this,void 0,void 0,(function*(){yield this.write("32BLINFO\0");const e=yield this.readBuffer.read(8);return this.decoder.decode(e)}))}list(){return n(this,void 0,void 0,(function*(){const e=[];yield this.write("32BL__LS\0");let t=yield this.readBuffer.readUint32(!0);for(;4294967295!==t;){let i=yield this.readBuffer.readUint32(!0);const n=this.decoder.decode(yield this.readBuffer.read(8));if("BLITMETA"!==n)throw new Error(`Incorret meta header. Received ${n}`);const s=yield this.readBuffer.readUint16(!0);let o;s>0&&(i=i+s+10,o=r.BlitMetaStandalone.parse((yield this.readBuffer.read(s)).buffer)),e.push({offset:t,size:i,meta:o}),t=yield this.readBuffer.readUint32(!0)}return e}))}sendFile(e,t,i,r=""){return n(this,void 0,void 0,(function*(){const n=e.byteLength;let s;"sd"===t?(console.log(`Saving ${i} (${n} bytes) as in ${r}.`),s=`32BLSAVE${r}/${i}\0${n}\0`):(console.log(`Flashing ${i} (${n} bytes)`),s=`32BLPROG${i}\0${n}\0`),yield this.write(s);let o=0;const d=new Uint8Array(e);for(;o<n;){yield this.writer.ready;const e=Math.min(o+1024,n);this.writer.write(d.slice(o,e)),o=e}yield this.writer.ready,console.log(`Wrote ${e.byteLength} bytes`);const a=yield this.readBuffer.readString(8);if("32BL__OK"!==a)throw new Error(`Failed to send file with result ${a}.`)}))}}},732:function(e,t,i){var n=this&&this.__awaiter||function(e,t,i,n){return new(i||(i=Promise))((function(r,s){function o(e){try{a(n.next(e))}catch(e){s(e)}}function d(e){try{a(n.throw(e))}catch(e){s(e)}}function a(e){var t;e.done?r(e.value):(t=e.value,t instanceof i?t:new i((function(e){e(t)}))).then(o,d)}a((n=n.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.BlitFlasher=void 0;const r=i(426),s=i(437);t.BlitFlasher=class{constructor(e){this.port=e}open(){return n(this,void 0,void 0,(function*(){yield this.port.open({baudRate:115200,dataBits:8,stopBits:1}),this.connection=new r.BlitConnection(this.port.readable.getReader(),this.port.writable.getWriter())}))}close(){var e,t;return n(this,void 0,void 0,(function*(){yield null===(e=this.connection)||void 0===e?void 0:e.close(),yield null===(t=this.port)||void 0===t?void 0:t.close()}))}status(){return n(this,void 0,void 0,(function*(){return this.connection.status()}))}list(){return n(this,void 0,void 0,(function*(){return this.connection.list()}))}sendFile(e,t,i,r=""){return n(this,void 0,void 0,(function*(){return this.connection.sendFile(e,t,i,r)}))}reset(){return n(this,void 0,void 0,(function*(){this.connection&&(yield this.connection.reset(),yield this.connection.close(),yield this.port.close()),yield s.sleep(1e3),yield this.open()}))}}},164:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.BlitMetaStandalone=t.BlitImage=void 0;const n=i(856);class r{constructor(e,t,i,n,r,s,o){this.type=e,this.dataLength=t,this.width=i,this.height=n,this.format=r,this.pallete=s,this.pixels=o}numPixels(){return this.width*this.height}static parse(e){const t=e.readString(6);if("SPRITE"!==t)throw new Error(`Invalid header for BlitImage: ${t}`);const i=e.readString(2),n=e.readUint32(!0),s=e.readUint16(!0),o=e.readUint16(!0),d=e.readUint8();let a=e.readUint8();0===a&&(a=256);const c=e.read(4*a),l=e.read(n-18-4*a);return new r(i,n,s,o,d,c,l)}}t.BlitImage=r;class s{constructor(e,t,i,n,r,s,o,d,a,c,l,h){this.checksum=e,this.date=t,this.title=i,this.description=n,this.version=r,this.author=s,this.blittype=o,this.category=d,this.url=a,this.filetypes=c,this.icon=l,this.splash=h}static parse(e){const t=new n.RandomAccessReader(e),i=t.readUint32(!0),o=t.readString(16),d=t.readString(25),a=t.readString(129),c=t.readString(17),l=t.readString(17);let h,u,f;const v=t.getPos(),y=t.readString(8);if("BLITTYPE"===y){h=t.readString(17),u=t.readString(129);const e=t.readUint8();f=[];for(let i=0;i<e;i++)f.push(t.readString(5))}else t.setPos(v);const w=r.parse(t),b=r.parse(t);return new s(i,o,d,a,c,l,y,h,u,f,w,b)}}t.BlitMetaStandalone=s},856:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.RandomAccessReader=void 0,t.RandomAccessReader=class{constructor(e){this.buffer=e,this.textdecoder=new TextDecoder,this.currentPos=0,this.dataview=new DataView(e)}read(e){if(this.currentPos+e>this.dataview.byteLength)throw new Error(`Tried to read beyond length. pos: ${this.currentPos}, buffer byteLength: ${this.dataview.byteLength}, length: ${e} `);const t=this.buffer.slice(this.currentPos,this.currentPos+e);return this.currentPos+=e,t}readUint8(){if(this.currentPos+1>=this.dataview.byteLength)throw new Error("Tried to read beyond length.");const e=this.dataview.getUint8(this.currentPos);return this.currentPos+=1,e}readUint16(e){if(this.currentPos+2>=this.dataview.byteLength)throw new Error("Tried to read beyond length.");const t=this.dataview.getUint16(this.currentPos,e);return this.currentPos+=2,t}readUint32(e){if(this.currentPos+4>=this.dataview.byteLength)throw new Error("Tried to read beyond length.");const t=this.dataview.getUint32(this.currentPos,e);return this.currentPos+=4,t}readString(e){const t=new Uint8Array(this.read(e));let i=t.findIndex((e=>0===e));return-1===i&&(i=e-1),this.textdecoder.decode(t.slice(0,i+1))}getPos(){return this.currentPos}setPos(e){if(e>=this.dataview.byteLength)throw new Error("Cant set position beyond length.");this.currentPos=e}byteLength(){return this.dataview.byteLength}}},479:function(e,t){var i=this&&this.__awaiter||function(e,t,i,n){return new(i||(i=Promise))((function(r,s){function o(e){try{a(n.next(e))}catch(e){s(e)}}function d(e){try{a(n.throw(e))}catch(e){s(e)}}function a(e){var t;e.done?r(e.value):(t=e.value,t instanceof i?t:new i((function(e){e(t)}))).then(o,d)}a((n=n.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.ReadBuffer=void 0;class n{constructor(e,t,i){this.dataLength=e,this.resolve=t,this.reject=i}}t.ReadBuffer=class{constructor(e=1024){this.pendingPromises=[],this._size=0,this.decoder=new TextDecoder,this.buffer=new Uint8Array(new ArrayBuffer(e))}read(e){return i(this,void 0,void 0,(function*(){return 0===this.pendingPromises.length&&this.size()>=e?yield this.internalRead(e):new Promise(((t,i)=>{this.pendingPromises.push(new n(e,t,i))}))}))}readUint8(){return i(this,void 0,void 0,(function*(){const e=yield this.read(1);return new DataView(e.buffer).getUint8(0)}))}readUint16(e){return i(this,void 0,void 0,(function*(){const t=yield this.read(2);return new DataView(t.buffer).getUint16(0,e)}))}readUint32(e){return i(this,void 0,void 0,(function*(){const t=yield this.read(4);return new DataView(t.buffer).getUint32(0,e)}))}readString(e){return i(this,void 0,void 0,(function*(){const t=yield this.read(e);let i=t.findIndex((e=>0===e));return-1===i&&(i=e-1),this.decoder.decode(t.slice(0,i+1))}))}append(e){this.size()+e.byteLength>this.buffer.byteLength&&this.extendBuffer(),this.buffer.set(e,this.size()),this._size+=e.byteLength,this.tryResolvePendingPromises()}failPendingPromises(e){for(;this.pendingPromises.length>0;)this.pendingPromises.shift().reject(e)}size(){return this._size}capacity(){return this.buffer.byteLength}internalRead(e){return i(this,void 0,void 0,(function*(){if(this.size()<e)throw new Error(`Internal buffer has ${this.size} bytes, but tried to read ${e}.`);this._size-=e;const t=new Uint8Array(this.buffer.subarray(0,e));return this.buffer.copyWithin(0,e,e+this.size()),t}))}tryResolvePendingPromises(){return i(this,void 0,void 0,(function*(){for(;this.pendingPromises.length>0&&this.pendingPromises[0].dataLength<=this.size();){const e=this.pendingPromises.shift(),t=yield this.internalRead(e.dataLength);e.resolve(t)}}))}extendBuffer(){const e=new Uint8Array(new ArrayBuffer(2*this.buffer.byteLength));e.set(this.buffer),this.buffer=e}}},437:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.sleep=void 0,t.sleep=function(e){return new Promise((t=>setTimeout(t,e)))}}},t={};function i(n){var r=t[n];if(void 0!==r)return r.exports;var s=t[n]={exports:{}};return e[n].call(s.exports,s,s.exports,i),s.exports}(()=>{var e=i(349),t=function(e,t,i,n){return new(i||(i=Promise))((function(r,s){function o(e){try{a(n.next(e))}catch(e){s(e)}}function d(e){try{a(n.throw(e))}catch(e){s(e)}}function a(e){var t;e.done?r(e.value):(t=e.value,t instanceof i?t:new i((function(e){e(t)}))).then(o,d)}a((n=n.apply(e,t||[])).next())}))};const n=document.querySelector("#connect"),r=document.querySelector("#disconnect"),s=document.querySelector("#status"),o=document.querySelector("#reset"),d=document.querySelector("#list"),a=document.querySelector("#flash"),c=document.querySelector("#sd"),l=document.querySelector("#status_text"),h=document.querySelector("#list-content");let u=null;n.addEventListener("click",(()=>t(void 0,void 0,void 0,(function*(){const t=yield navigator.serial.requestPort({filters:[{usbVendorId:1155,usbProductId:22336}]});u=new e.E(t),yield u.open(),n.disabled=!0,r.disabled=!1,s.disabled=!1,o.disabled=!1,d.disabled=!1,a.disabled=!1,c.disabled=!1;const i=yield u.status();l.innerText=i})))),r.addEventListener("click",(()=>t(void 0,void 0,void 0,(function*(){yield null==u?void 0:u.close(),u=null,n.disabled=!1,r.disabled=!0,s.disabled=!0,o.disabled=!0,d.disabled=!0,a.disabled=!0,c.disabled=!0})))),o.addEventListener("click",(()=>t(void 0,void 0,void 0,(function*(){if(null===u)return void console.error("Not Connected");yield u.reset();const e=yield u.status();l.innerText=e})))),s.addEventListener("click",(()=>t(void 0,void 0,void 0,(function*(){const e=yield u.status();l.innerText=e})))),d.addEventListener("click",(()=>t(void 0,void 0,void 0,(function*(){const e=yield u.list();h.innerHTML="",e.forEach((e=>{var t,i,n,r,s;const o=document.createElement("tr");let d=document.createElement("td");d.innerText=(null===(t=e.meta)||void 0===t?void 0:t.title)||"",o.appendChild(d),d=document.createElement("td"),d.innerText=(null===(i=e.meta)||void 0===i?void 0:i.description)||"",o.appendChild(d),d=document.createElement("td"),d.innerText=(null===(n=e.meta)||void 0===n?void 0:n.author)||"",o.appendChild(d),d=document.createElement("td"),d.innerText=(null===(r=e.meta)||void 0===r?void 0:r.date)||"",o.appendChild(d),d=document.createElement("td"),d.innerText=(null===(s=e.meta)||void 0===s?void 0:s.version)||"",o.appendChild(d),h.appendChild(o)}))})))),a.addEventListener("click",(()=>t(void 0,void 0,void 0,(function*(){if(null===u)return void console.error("Not Connected");const e=yield fetch("snake.blit"),t=new Uint8Array(yield e.arrayBuffer());console.log(`Received arrayBuffer with size ${t.byteLength}`);try{yield u.sendFile(t,"flash","snake.blit"),alert("snake.blit flashed successfully")}catch(e){console.error("Error uploading blit file",e)}})))),c.addEventListener("click",(()=>t(void 0,void 0,void 0,(function*(){if(null===u)return void console.error("Not Connected");const e=yield fetch("snake.blit"),t=new Uint8Array(yield e.arrayBuffer());console.log(`Received arrayBuffer with size ${t.byteLength}`);try{yield u.sendFile(t,"sd","snake.blit","/"),alert("snake.blit flashed successfully")}catch(e){console.error("Error uploading blit file",e)}}))))})()})();