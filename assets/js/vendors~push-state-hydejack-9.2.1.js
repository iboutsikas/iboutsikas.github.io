/*!
 *  __  __                __                                     __
 * /\ \/\ \              /\ \             __                    /\ \
 * \ \ \_\ \   __  __    \_\ \      __   /\_\      __       ___ \ \ \/'\
 *  \ \  _  \ /\ \/\ \   /'_` \   /'__`\ \/\ \   /'__`\    /'___\\ \ , <
 *   \ \ \ \ \\ \ \_\ \ /\ \L\ \ /\  __/  \ \ \ /\ \L\.\_ /\ \__/ \ \ \\`\
 *    \ \_\ \_\\/`____ \\ \___,_\\ \____\ _\ \ \\ \__/.\_\\ \____\ \ \_\ \_\
 *     \/_/\/_/ `/___/> \\/__,_ / \/____//\ \_\ \\/__/\/_/ \/____/  \/_/\/_/
 *                 /\___/                \ \____/
 *                 \/__/                  \/___/
 *
 * Powered by Hydejack v9.2.1 <https://hydejack.com/>
 */
(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{192:function(e,t,r){"use strict";r.d(t,"a",(function(){return n}));var i=Array.isArray;function n(e){return 1===e.length&&i(e[0])?e[0]:e}},218:function(e,t,r){"use strict";r.r(t),r.d(t,"HyPushState",(function(){return ke}));var i,n=r(0),c=r(191),o=r(182),a=r(175),s=r(198),l=r(102),u=r(78),h=function(e){function t(t,r){var i=e.call(this,t,r)||this;return i.scheduler=t,i.work=r,i}return Object(n.h)(t,e),t.prototype.requestAsyncId=function(t,r,i){return void 0===i&&(i=0),null!==i&&i>0?e.prototype.requestAsyncId.call(this,t,r,i):(t.actions.push(this),t._scheduled||(t._scheduled=u.a.requestAnimationFrame((function(){return t.flush(void 0)}))))},t.prototype.recycleAsyncId=function(t,r,i){var n;if(void 0===i&&(i=0),null!=i?i>0:this.delay>0)return e.prototype.recycleAsyncId.call(this,t,r,i);var c=t.actions;null!=r&&(null===(n=c[c.length-1])||void 0===n?void 0:n.id)!==r&&(u.a.cancelAnimationFrame(r),t._scheduled=void 0)},t}(l.a),p=new(function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return Object(n.h)(t,e),t.prototype.flush=function(e){this._active=!0;var t=this._scheduled;this._scheduled=void 0;var r,i=this.actions;e=e||i.shift();do{if(r=e.execute(e.state,e.delay))break}while((e=i[0])&&e.id===t&&i.shift());if(this._active=!1,r){for(;(e=i[0])&&e.id===t&&i.shift();)e.unsubscribe();throw r}},t}(r(103).a))(h),f=r(223),b=r(225),O=r(24),j=r(104),d=r(108),m=r(194),v=r(199),y=r(193),g=r(63),w=r(197),S=r(221),P=r(105),E=r(107),A=r(226),k=r(224),L=r(177);function R(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:window.location;return null!=e&&(e.protocol!==t.protocol||e.host!==t.host)}function N(e){return e&&""===e.target}function q(e,t){var{url:r,anchor:i}=e;return!(!N(i)||R(r,t)||function(e){var{hash:t,origin:r,pathname:i}=e,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:window.location;return""!==t&&r===n.origin&&i===n.pathname}(r,t))}function H(e){var{cause:t,url:{pathname:r,hash:n},oldURL:c}=e;return r===(null==c?void 0:c.pathname)&&(t===i.Pop||t===i.Push&&""!==n)}!function(e){e.Init="init",e.Hint="hint",e.Push="push",e.Pop="pop"}(i||(i={}));var T=r(79),M=r(227),D=r(222);function U(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,i)}return r}function C(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?U(Object(r),!0).forEach((function(t){I(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):U(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function I(e,t,r){return(t=function(e){var t=function(e,t){if("object"!=typeof e||!e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var i=r.call(e,t||"default");if("object"!=typeof i)return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==typeof t?t:t+""}(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}class W{constructor(e){this.parent=e}fetchPage(e){return Object(L.g)(e.url.href,{method:"GET",mode:"cors",headers:{Accept:"text/html"}}).pipe(Object(P.a)(e=>e.text()),Object(O.a)(t=>C(C({},e),{},{responseText:t})),Object(A.a)(t=>Object(T.a)(C(C({},e),{},{error:t,responseText:null}))))}selectPrefetch(e,t,r){var{href:i}=e;return i===t.url.href?Object(T.a)(t):r.pipe(Object(D.a)(1))}getResponse(e,t,r){return Object(M.a)(this.selectPrefetch(t.url,r,e),this.parent.animPromise).pipe(Object(O.a)(e=>{var[r]=e;return C(C({},r),t)}))}}var x=r(42),B=r(176),$=r(207);function _(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,i)}return r}function F(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?_(Object(r),!0).forEach((function(t){V(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):_(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function V(e,t,r){return(t=function(e){var t=function(e,t){if("object"!=typeof e||!e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var i=r.call(e,t||"default");if("object"!=typeof i)return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==typeof t?t:t+""}(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}class J{constructor(e){this.parent=e}get scriptSelector(){return this.parent.scriptSelector}removeScriptTags(e){var t=[];return e.forEach(e=>{e&&this.scriptSelector&&e.querySelectorAll(this.scriptSelector).forEach(e=>{if(e instanceof HTMLScriptElement){var r=[function(e){var t=document.createElement("script");return Array.from(e.attributes).forEach(e=>t.setAttributeNode(e.cloneNode())),t.innerHTML=e.innerHTML,t}(e),e];t.push(r)}})}),t}reinsertScriptTags(e){if(!this.scriptSelector)return Promise.resolve(e);var{scripts:t}=e,r=document.write;return Object(x.a)(t).pipe(Object(B.a)(e=>this.insertScript(e)),Object(A.a)(t=>Object(T.a)(F(F({},e),{},{error:t}))),Object($.a)(()=>document.write=r),Object(w.a)(e)).toPromise()}insertScript(e){var[t,r]=e;return document.write=function(){for(var e=document.createElement("div"),t=arguments.length,i=new Array(t),n=0;n<t;n++)i[n]=arguments[n];e.innerHTML=i.join(),Array.from(e.childNodes).forEach(e=>{var t;return null===(t=r.parentNode)||void 0===t?void 0:t.insertBefore(e,r)})},new Promise((e,i)=>{var n,c;""!==t.src?(t.addEventListener("load",e),t.addEventListener("error",i),null===(n=r.parentNode)||void 0===n||n.replaceChild(t,r)):(null===(c=r.parentNode)||void 0===c||c.replaceChild(t,r),e({}))})}}function K(e,t){e.forEach(e=>{e&&(e.querySelectorAll("[href]").forEach(X("href",t)),e.querySelectorAll("[src]").forEach(X("src",t)),e.querySelectorAll("img[srcset]").forEach(function(e,t){return r=>{try{var i=r.getAttribute(e);if(null==i)return;r.setAttribute(e,i.split(/\s*,\s*/).map(e=>{var r=e.split(/\s+/);return r[0]=new URL(r[0],t).href,r.join(" ")}).join(", "))}catch(e){}}}("srcset",t)),e.querySelectorAll("blockquote[cite]").forEach(X("cite",t)),e.querySelectorAll("del[cite]").forEach(X("cite",t)),e.querySelectorAll("ins[cite]").forEach(X("cite",t)),e.querySelectorAll("q[cite]").forEach(X("cite",t)),e.querySelectorAll("img[longdesc]").forEach(X("longdesc",t)),e.querySelectorAll("frame[longdesc]").forEach(X("longdesc",t)),e.querySelectorAll("iframe[longdesc]").forEach(X("longdesc",t)),e.querySelectorAll("img[usemap]").forEach(X("usemap",t)),e.querySelectorAll("input[usemap]").forEach(X("usemap",t)),e.querySelectorAll("object[usemap]").forEach(X("usemap",t)),e.querySelectorAll("form[action]").forEach(X("action",t)),e.querySelectorAll("button[formaction]").forEach(X("formaction",t)),e.querySelectorAll("input[formaction]").forEach(X("formaction",t)),e.querySelectorAll("video[poster]").forEach(X("poster",t)),e.querySelectorAll("object[data]").forEach(X("data",t)),e.querySelectorAll("object[codebase]").forEach(X("codebase",t)),e.querySelectorAll("object[archive]").forEach(function(e,t){return r=>{try{var i=r.getAttribute(e);if(null==i)return;r.setAttribute(e,i.split(/[\s,]+/).map(e=>new URL(e,t).href).join(", "))}catch(e){}}}("archive",t)))})}function X(e,t){return r=>{try{var i=r.getAttribute(e);if(null==i)return;r.setAttribute(e,new URL(i,t).href)}catch(e){}}}function z(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,i)}return r}function G(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?z(Object(r),!0).forEach((function(t){Q(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):z(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function Q(e,t,r){return(t=function(e){var t=function(e,t){if("object"!=typeof e||!e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var i=r.call(e,t||"default");if("object"!=typeof i)return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==typeof t?t:t+""}(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}class Y{constructor(e){this.parent=e,this.scriptManager=new J(e)}get el(){return this.parent}get replaceSelector(){return this.parent.replaceSelector}get scriptSelector(){return this.parent.scriptSelector}getReplaceElements(e){if(this.replaceSelector)return this.replaceSelector.split(",").map(t=>e.querySelector(t));if(this.el.id)return[e.getElementById(this.el.id)];var t=Array.from(document.getElementsByTagName(this.el.tagName)).indexOf(this.el);return[e.getElementsByTagName(this.el.tagName)[t]]}responseToContent(e){var{responseText:t}=e,r=(new DOMParser).parseFromString(t,"text/html"),{title:i=""}=r,n=this.getReplaceElements(r);if(n.every(e=>null==e))throw new Error("Couldn't find any element in the document at '".concat(location,"'."));var c=this.scriptSelector?this.scriptManager.removeScriptTags(n):[];return G(G({},e),{},{document:r,title:i,replaceEls:n,scripts:c})}replaceContentWithSelector(e,t){e.split(",").map(e=>document.querySelector(e)).forEach((e,r)=>{var i,n=t[r];n&&(null===(i=null==e?void 0:e.parentNode)||void 0===i||i.replaceChild(n,e))})}replaceContentWholesale(e){var[t]=e;t&&(this.el.innerHTML=t.innerHTML)}replaceContent(e){this.replaceSelector?this.replaceContentWithSelector(this.replaceSelector,e):this.replaceContentWholesale(e)}replaceHead(e){var{head:t}=this.el.ownerDocument,r=t.querySelector("link[rel=canonical]"),i=e.head.querySelector("link[rel=canonical]");r&&i&&(r.href=i.href);var n=t.querySelector("meta[name=description]"),c=e.head.querySelector("meta[name=description]");n&&c&&(n.content=c.content)}updateDOM(e){try{var{replaceEls:t,document:r}=e;R(this.parent)&&K(t,this.parent.href),this.replaceHead(r),this.replaceContent(t)}catch(t){throw G(G({},e),{},{error:t})}}reinsertScriptTags(e){return this.scriptManager.reinsertScriptTags(e)}}var Z=r(27),ee=r(82),te=e=>Array.prototype.concat.apply([],e),re=e=>({addedNodes:new Set(te(e.map(e=>Array.from(e.addedNodes)))),removedNodes:new Set(te(e.map(e=>Array.from(e.removedNodes))))});class ie{setupEventListeners(){var e=Object(a.a)(this.el,"click").pipe(Object(O.a)(e=>{var t=Object(L.k)(e.target,this.linkSelector);if(t instanceof HTMLAnchorElement)return[e,t]}),Object(j.a)(e=>!!e)),t=(e,t)=>e.matches(t)&&e instanceof HTMLAnchorElement?Object(T.a)(e):Object(x.a)(e.querySelectorAll(t)).pipe(Object(j.a)(e=>e instanceof HTMLAnchorElement));return{hintEvent$:this.$.linkSelector.pipe(Object(P.a)(e=>{var r=new Map,i=e=>{r.has(e)||r.set(e,(e=>Object(s.a)(Object(a.a)(e,"mouseenter",{passive:!0}),Object(a.a)(e,"touchstart",{passive:!0}),Object(a.a)(e,"focus",{passive:!0})).pipe(Object(O.a)(t=>[t,e])))(e))},n=e=>{r.delete(e)};return Object(L.d)(this.el,{childList:!0,subtree:!0}).pipe(Object(m.a)({addedNodes:[this.el],removedNodes:[]}),Object(L.c)(500),Object(O.a)(re),Object(P.a)(c=>{var{addedNodes:o,removedNodes:a}=c;return Object(x.a)(a).pipe(Object(j.a)(e=>e instanceof Element),Object(Z.a)(r=>t(r,e)),Object(d.a)(n)).subscribe(),Object(x.a)(o).pipe(Object(j.a)(e=>e instanceof Element),Object(Z.a)(r=>t(r,e)),Object(d.a)(i)).subscribe(),Object(x.a)(r.values()).pipe(Object(ee.a)())}),Object(L.l)(this.$.prefetch))})),pushEvent$:e}}}function ne(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,i)}return r}function ce(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?ne(Object(r),!0).forEach((function(t){oe(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):ne(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function oe(e,t,r){return(t=function(e){var t=function(e,t){if("object"!=typeof e||!e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var i=r.call(e,t||"default");if("object"!=typeof i)return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==typeof t?t:t+""}(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var ae,se,le,ue,he,pe,fe,be,Oe,je,de,me,ve,ye=e=>new Promise(t=>setTimeout(t,e));class ge{constructor(e){this.parent=e}onStart(e){this.parent.animPromise=ye(this.parent.duration);this.parent.fireEvent("start",{detail:ce(ce({},e),{},{transitionUntil:e=>{this.parent.animPromise=Promise.all([this.parent.animPromise,e])}})})}emitDOMError(e){var t=location.href;window.history.back(),setTimeout(()=>document.location.assign(t),100)}emitNetworkError(e){this.parent.fireEvent("networkerror",{detail:e})}emitError(e){this.parent.fireEvent("error",{detail:e})}emitReady(e){this.parent.fireEvent("ready",{detail:e})}emitAfter(e){this.parent.fadePromise=ye(this.parent.duration);this.parent.fireEvent("after",{detail:ce(ce({},e),{},{transitionUntil:e=>{this.parent.fadePromise=Promise.all([this.parent.fadePromise,e])}})})}emitProgress(e){this.parent.fireEvent("progress",{detail:e})}emitLoad(e){this.parent.fireEvent("load",{detail:e})}}function we(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,i)}return r}function Se(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?we(Object(r),!0).forEach((function(t){Pe(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):we(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function Pe(e,t,r){return(t=function(e){var t=function(e,t){if("object"!=typeof e||!e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var i=r.call(e,t||"default");if("object"!=typeof i)return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==typeof t?t:t+""}(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}window.HashChangeEvent=window.HashChangeEvent||function(e){var{oldURL:t="",newURL:r=""}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=new CustomEvent(e);return i.oldURL=t,i.newURL=r,i};class Ee{constructor(e){this.updateHistoryScrollPosition=()=>{if(!R(this.parent)){var e=this.assignScrollPosition(history.state||{});history.replaceState(e,document.title)}},this.parent=e}updateHistoryState(e){var{cause:t,replace:r,url:n,oldURL:c}=e;if(!R(this.parent))switch(t){case i.Init:case i.Push:var{histId:o}=this.parent;if(r||n.href===location.href){var a=Se(Se({},history.state),{},{[o]:{}});history.replaceState(a,document.title,n.href)}else history.pushState({[o]:{}},document.title,n.href);case i.Pop:this.parent.simulateHashChange&&c&&function(e,t){e.hash!==t.hash&&window.dispatchEvent(new HashChangeEvent("hashchange",{newURL:e.href,oldURL:t.href}))}(n,c)}}updateTitle(e){var{cause:t,title:r}=e;document.title=r,R(this.parent)||t!==i.Push||history.replaceState(history.state,r)}assignScrollPosition(e){var{histId:t}=this.parent;return Se(Se({},e),{},{[t]:Se(Se({},e[t]),{},{scrollTop:Object(L.j)(),scrollHeight:Object(L.i)()})})}}class Ae{constructor(e){this.parent=e,"scrollRestoration"in history&&(history.scrollRestoration="manual")}manageScrollPosition(e){var{cause:t,url:{hash:r}}=e;switch(t){case i.Push:this.scrollHashIntoView(r,{behavior:"smooth",block:"start",inline:"nearest"});break;case i.Pop:this.restoreScrollPosition();break;case i.Init:this.restoreScrollPositionOnReload()}}elementFromHash(e){return document.getElementById(decodeURIComponent(e.substr(1)))}scrollHashIntoView(e,t){if(e){var r=this.elementFromHash(e);r&&r.scrollIntoView(t)}else window.scroll(window.pageXOffset,0)}restoreScrollPosition(){var{histId:e}=this.parent,{scrollTop:t}=history.state&&history.state[e]||{};null!=t&&window.scroll(window.pageXOffset,t)}restoreScrollPositionOnReload(){var{histId:e}=this.parent;history.state&&history.state[e]&&0===Object(L.j)()?this.restoreScrollPosition():location.hash&&requestAnimationFrame(()=>this.scrollHashIntoView(location.hash,!0))}}var ke=class extends(Object(L.b)(L.a,[ie])){constructor(){super(...arguments),this.el=this,this.linkSelector="a[href]:not([data-no-push])",this.prefetch=!1,this.duration=0,this.simulateHashChange=!1,this.baseURL=window.location.href,ae.set(this,Object(L.f)()),this.animPromise=Promise.resolve(null),this.fadePromise=Promise.resolve(null),se.set(this,new Ae(this)),le.set(this,new Ee(this)),ue.set(this,new W(this)),he.set(this,new Y(this)),pe.set(this,new ge(this)),fe.set(this,new URL(this.baseURL)),be.set(this,(e,t)=>{var r=new URL(Object(n.e)(this,fe,"f").href);r[e]=t,this.assign(r.href)}),Oe.set(this,0),je.set(this,new o.a),de.set(this,e=>{R(Object(L.k)(e.target,"a[href]"))&&Object(n.e)(this,le,"f").updateHistoryScrollPosition()}),me.set(this,void 0),ve.set(this,()=>{var{pushEvent$:e,hintEvent$:t}=this.setupEventListeners(),r=e.pipe(Object(O.a)(e=>{var[t,r]=e;return{cause:i.Push,url:new URL(r.href,this.href),anchor:r,event:t,cacheNr:Object(n.e)(this,Oe,"f")}}),Object(j.a)(e=>function(e,t){var{url:r,anchor:i,event:{metaKey:n,ctrlKey:c}}=e;return!(n||c||!N(i)||R(r,t))}(e,this)),Object(d.a)(e=>{var{event:t}=e;t.preventDefault(),Object(n.e)(this,le,"f").updateHistoryScrollPosition()})),c=Object(a.a)(window,"popstate").pipe(Object(j.a)(()=>window.history.state&&window.history.state[this.histId]),Object(O.a)(e=>({cause:i.Pop,url:new URL(window.location.href),cacheNr:Object(n.e)(this,Oe,"f"),event:e}))),o=Object(n.e)(this,je,"f"),l=Object(s.a)(r,c,o).pipe(Object(m.a)({url:new URL(window.location.href)}),Object(v.a)(),Object(O.a)(e=>{var[t,r]=e;return Object.assign(r,{oldURL:t.url})}),Object(y.a)()),u=l.pipe(Object(j.a)(e=>!H(e)),Object(y.a)()),h=l.pipe(Object(j.a)(e=>H(e)),Object(j.a)(()=>history.state&&history.state[this.histId]),Object(g.a)(p),Object(d.a)(e=>{Object(n.e)(this,le,"f").updateHistoryState(e),Object(n.e)(this,se,"f").manageScrollPosition(e)})),b=Object(f.a)(()=>Object(s.a)(u.pipe(Object(w.a)(!0)),Object(n.e)(this,me,"f").pipe(Object(w.a)(!1)))).pipe(Object(m.a)(!1)),T=t.pipe(Object(L.h)(b.pipe(Object(O.a)(e=>!e))),Object(O.a)(e=>{var[t,r]=e;return{cause:i.Hint,url:new URL(r.href,this.href),anchor:r,event:t,cacheNr:Object(n.e)(this,Oe,"f")}}),Object(j.a)(e=>q(e,this))),M=Object(s.a)(T,u).pipe(Object(S.a)((e,t)=>{return i=t,(r=e).url.href===i.url.href&&r.error===i.error&&r.cacheNr===i.cacheNr;
/**
 * Copyright (c) 2020 Florian Klampfer <https://qwtel.com/>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @license
 * @nocompile
 */
var r,i}),Object(P.a)(e=>Object(n.e)(this,ue,"f").fetchPage(e)),Object(m.a)({url:{}}),Object(y.a)()),D=Object(n.f)(this,me,u.pipe(Object(d.a)(e=>{Object(n.e)(this,pe,"f").onStart(e),Object(n.e)(this,le,"f").updateHistoryState(e),Object(n.f)(this,fe,e.url,"f")}),Object(E.a)(M),Object(P.a)(e=>Object(n.e)(this,ue,"f").getResponse(M,...e)),Object(y.a)()),"f"),U=D.pipe(Object(j.a)(e=>!e.error)),C=D.pipe(Object(j.a)(e=>!!e.error)),I=U.pipe(Object(O.a)(e=>Object(n.e)(this,he,"f").responseToContent(e)),Object(d.a)(e=>Object(n.e)(this,pe,"f").emitReady(e)),Object(g.a)(p),Object(d.a)(e=>{Object(n.e)(this,he,"f").updateDOM(e),Object(n.e)(this,le,"f").updateTitle(e),Object(n.e)(this,pe,"f").emitAfter(e)}),Object(m.a)({cause:i.Init,url:Object(n.e)(this,fe,"f"),scripts:[]}),Object(g.a)(p),Object(d.a)(e=>Object(n.e)(this,se,"f").manageScrollPosition(e)),Object(d.a)({error:e=>Object(n.e)(this,pe,"f").emitDOMError(e)}),Object(A.a)((e,t)=>t),Object(P.a)(e=>this.fadePromise.then(()=>e)),Object(P.a)(e=>Object(n.e)(this,he,"f").reinsertScriptTags(e)),Object(d.a)({error:e=>Object(n.e)(this,pe,"f").emitError(e)}),Object(A.a)((e,t)=>t),Object(d.a)(e=>Object(n.e)(this,pe,"f").emitLoad(e))),W=C.pipe(Object(d.a)(e=>Object(n.e)(this,pe,"f").emitNetworkError(e))),x=u.pipe(Object(P.a)(e=>Object(f.a)(()=>this.animPromise).pipe(Object(k.a)(D),Object(w.a)(e))),Object(d.a)(e=>Object(n.e)(this,pe,"f").emitProgress(e)));I.subscribe(),h.subscribe(),W.subscribe(),x.subscribe(),Object(n.e)(this,ae,"f").resolve(this),this.fireEvent("init")})}createRenderRoot(){return this}get initialized(){return Object(n.e)(this,ae,"f")}get hash(){return Object(n.e)(this,fe,"f").hash}get host(){return Object(n.e)(this,fe,"f").host}get hostname(){return Object(n.e)(this,fe,"f").hostname}get href(){return Object(n.e)(this,fe,"f").href}get pathname(){return Object(n.e)(this,fe,"f").pathname}get port(){return Object(n.e)(this,fe,"f").port}get protocol(){return Object(n.e)(this,fe,"f").protocol}get search(){return Object(n.e)(this,fe,"f").search}get origin(){return Object(n.e)(this,fe,"f").origin}get ancestorOrigins(){return window.location.ancestorOrigins}set hash(e){Object(n.e)(this,be,"f").call(this,"hash",e)}set host(e){Object(n.e)(this,be,"f").call(this,"host",e)}set hostname(e){Object(n.e)(this,be,"f").call(this,"hostname",e)}set href(e){Object(n.e)(this,be,"f").call(this,"href",e)}set pathname(e){Object(n.e)(this,be,"f").call(this,"pathname",e)}set port(e){Object(n.e)(this,be,"f").call(this,"port",e)}set protocol(e){Object(n.e)(this,be,"f").call(this,"protocol",e)}set search(e){Object(n.e)(this,be,"f").call(this,"search",e)}get histId(){return this.id||this.tagName}assign(e){var t;Object(n.e)(this,je,"f").next({cause:i.Push,url:new URL(e,this.href),cacheNr:Object(n.f)(this,Oe,(t=Object(n.e)(this,Oe,"f"),++t),"f")})}reload(){var e;Object(n.e)(this,je,"f").next({cause:i.Push,url:new URL(this.href),cacheNr:Object(n.f)(this,Oe,(e=Object(n.e)(this,Oe,"f"),++e),"f"),replace:!0})}replace(e){var t;Object(n.e)(this,je,"f").next({cause:i.Push,url:new URL(e,this.href),cacheNr:Object(n.f)(this,Oe,(t=Object(n.e)(this,Oe,"f"),++t),"f"),replace:!0})}connectedCallback(){super.connectedCallback(),this.$={linkSelector:new b.a(this.linkSelector),prefetch:new b.a(this.prefetch)},window.addEventListener("beforeunload",Object(n.e)(this,le,"f").updateHistoryScrollPosition),document.documentElement.addEventListener("click",Object(n.e)(this,de,"f")),this.updateComplete.then(Object(n.e)(this,ve,"f"))}disconnectedCallback(){window.removeEventListener("beforeunload",Object(n.e)(this,le,"f").updateHistoryScrollPosition),document.documentElement.removeEventListener("click",Object(n.e)(this,de,"f"))}};ae=new WeakMap,se=new WeakMap,le=new WeakMap,ue=new WeakMap,he=new WeakMap,pe=new WeakMap,fe=new WeakMap,be=new WeakMap,Oe=new WeakMap,je=new WeakMap,de=new WeakMap,me=new WeakMap,ve=new WeakMap,Object(n.g)([Object(c.e)({type:String,reflect:!0,attribute:"replace-selector"})],ke.prototype,"replaceSelector",void 0),Object(n.g)([Object(c.e)({type:String,reflect:!0,attribute:"link-selector"})],ke.prototype,"linkSelector",void 0),Object(n.g)([Object(c.e)({type:String,reflect:!0,attribute:"script-selector"})],ke.prototype,"scriptSelector",void 0),Object(n.g)([Object(c.e)({type:Boolean,reflect:!0})],ke.prototype,"prefetch",void 0),Object(n.g)([Object(c.e)({type:Number,reflect:!0})],ke.prototype,"duration",void 0),Object(n.g)([Object(c.e)({type:Boolean,reflect:!0,attribute:"hashchange"})],ke.prototype,"simulateHashChange",void 0),Object(n.g)([Object(c.e)({type:String})],ke.prototype,"baseURL",void 0),Object(n.g)([Object(c.e)()],ke.prototype,"assign",null),Object(n.g)([Object(c.e)()],ke.prototype,"reload",null),Object(n.g)([Object(c.e)()],ke.prototype,"replace",null),ke=Object(n.g)([Object(c.c)("hy-push-state")],ke)},226:function(e,t,r){"use strict";r.d(t,"a",(function(){return o}));var i=r(6),n=r(3),c=r(4);function o(e){return Object(c.a)((function(t,r){var c,a=null,s=!1;a=t.subscribe(Object(n.a)(r,void 0,void 0,(function(n){c=Object(i.a)(e(n,o(e)(t))),a?(a.unsubscribe(),a=null,c.subscribe(r)):s=!0}))),s&&(a.unsubscribe(),a=null,c.subscribe(r))}))}},227:function(e,t,r){"use strict";r.d(t,"a",(function(){return u}));var i=r(0),n=r(2),c=r(6),o=r(192),a=r(183),s=r(3),l=r(28);function u(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var r=Object(l.b)(e),u=Object(o.a)(e);return u.length?new n.a((function(e){var t=u.map((function(){return[]})),n=u.map((function(){return!1}));e.add((function(){t=n=null}));for(var o=function(o){Object(c.a)(u[o]).subscribe(Object(s.a)(e,(function(c){if(t[o].push(c),t.every((function(e){return e.length}))){var a=t.map((function(e){return e.shift()}));e.next(r?r.apply(void 0,Object(i.k)([],Object(i.j)(a))):a),t.some((function(e,t){return!e.length&&n[t]}))&&e.complete()}}),(function(){n[o]=!0,!t[o].length&&e.complete()})))},a=0;!e.closed&&a<u.length;a++)o(a);return function(){t=n=null}})):a.a}},228:function(e,t,r){"use strict";r.d(t,"a",(function(){return a}));var i=r(24),n=r(6),c=r(4),o=r(3);function a(e,t){return t?function(r){return r.pipe(a((function(r,c){return Object(n.a)(e(r,c)).pipe(Object(i.a)((function(e,i){return t(r,e,c,i)})))})))}:Object(c.a)((function(t,r){var i=0,c=null,a=!1;t.subscribe(Object(o.a)(r,(function(t){c||(c=Object(o.a)(r,void 0,(function(){c=null,a&&r.complete()})),Object(n.a)(e(t,i++)).subscribe(c))}),(function(){a=!0,!c&&r.complete()})))}))}}}]);