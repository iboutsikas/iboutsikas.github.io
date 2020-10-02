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
 * Powered by Hydejack v9.1.0-beta.8 <https://hydejack.com/>
 */
(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{350:function(e,t,r){"use strict";r.r(t),r.d(t,"HyPushState",(function(){return Qe}));var n,o=r(314),i=r(315),c=r(307),a=r(329),u=r(1),s=r(147),l=r(145),f=function(e){function t(t,r){var n=e.call(this,t,r)||this;return n.scheduler=t,n.work=r,n}return Object(u.c)(t,e),t.prototype.requestAsyncId=function(t,r,n){return void 0===n&&(n=0),null!==n&&n>0?e.prototype.requestAsyncId.call(this,t,r,n):(t.actions.push(this),t.scheduled||(t.scheduled=l.a.requestAnimationFrame((function(){return t.flush(void 0)}))))},t.prototype.recycleAsyncId=function(t,r,n){if(void 0===n&&(n=0),null!=n&&n>0||null==n&&this.delay>0)return e.prototype.recycleAsyncId.call(this,t,r,n);0===t.actions.length&&(l.a.cancelAnimationFrame(r),t.scheduled=void 0)},t}(s.a),p=new(function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return Object(u.c)(t,e),t.prototype.flush=function(e){this.active=!0,this.scheduled=void 0;var t,r=this.actions,n=-1;e=e||r.shift();var o=r.length;do{if(t=e.execute(e.state,e.delay))break}while(++n<o&&(e=r.shift()));if(this.active=!1,t){for(;++n<o&&(e=r.shift());)e.unsubscribe();throw t}},t}(r(148).a))(f),h=r(354),b=r(356),y=r(33),d=r(152),v=r(153),O=r(328),m=r(335),j=r(333),g=r(8),w=r(330),S=r(62),P=r(5);!function(e){e.NEXT="N",e.ERROR="E",e.COMPLETE="C"}(n||(n={}));!function(){function e(e,t,r){this.kind=e,this.value=t,this.error=r,this.hasValue="N"===e}e.prototype.observe=function(e){var t,r,n;switch(this.kind){case"N":null===(t=e.next)||void 0===t||t.call(e,this.value);break;case"E":null===(r=e.error)||void 0===r||r.call(e,this.error);break;case"C":null===(n=e.complete)||void 0===n||n.call(e)}},e.prototype.do=function(e,t,r){switch(this.kind){case"N":null==e||e(this.value);break;case"E":null==t||t(this.error);break;case"C":null==r||r()}},e.prototype.accept=function(e,t,r){return e&&"function"==typeof e.next?this.observe(e):this.do(e,t,r)},e.prototype.toObservable=function(){var e,t;switch(this.kind){case"N":return Object(S.a)(this.value);case"E":return e=this.error,t?new P.a((function(r){return t.schedule((function(){r.error("function"==typeof e?e():e)}))})):new P.a((function(t){return t.error("function"==typeof e?e():e)}));case"C":return w.a}throw new Error("unexpected notification kind value")},e.createNext=function(t){return new e("N",t)},e.createError=function(t){return new e("E",void 0,t)},e.createComplete=function(){return e.completeNotification},e.completeNotification=new e("C")}();var E=k("C",void 0,void 0);function k(e,t,r){return{kind:e,value:t,error:r}}var A=r(14);function N(e,t){return void 0===t&&(t=0),function(r){return Object(A.a)(r,new C(e,t))}}var R,C=function(){function e(e,t){void 0===t&&(t=0),this.scheduler=e,this.delay=t}return e.prototype.call=function(e,t){return t.subscribe(new M(e,this.scheduler,this.delay))},e}(),M=function(e){function t(t,r,n){void 0===n&&(n=0);var o=e.call(this,t)||this;return o.scheduler=r,o.delay=n,o}return Object(u.c)(t,e),t.dispatch=function(e){!function(e,t){var r,n,o;if("string"!=typeof e.kind)throw new TypeError('Invalid notification, missing "kind"');switch(e.kind){case"N":null===(r=t.next)||void 0===r||r.call(t,e.value);break;case"E":null===(n=t.error)||void 0===n||n.call(t,e.error);break;case"C":null===(o=t.complete)||void 0===o||o.call(t)}}(e.notification,e.destination),this.unsubscribe()},t.prototype.scheduleMessage=function(e){var r=this.destination;r.add(this.scheduler.schedule(t.dispatch,this.delay,{notification:e,destination:r}))},t.prototype._next=function(e){this.scheduleMessage(function(e){return k("N",e,void 0)}(e))},t.prototype._error=function(e){this.scheduleMessage(function(e){return k("E",void 0,e)}(e)),this.unsubscribe()},t.prototype._complete=function(){this.scheduleMessage(E),this.unsubscribe()},t}(g.a),L=r(334),T=r(353),_=r(149),I=r(151),q=r(357),x=r(355),D=r(309);function U(e){var t=e.protocol,r=e.host,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:window.location;return t!==n.protocol||r!==n.host}function H(e){return e&&""===e.target}function $(e,t){var r=e.url,n=e.anchor,o=e.event,i=o.metaKey,c=o.ctrlKey;return!i&&!c&&H(n)&&!U(r,t)}function B(e,t){var r=e.url;return H(e.anchor)&&!U(r,t)&&!function(e){var t=e.hash,r=e.origin,n=e.pathname,o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:window.location;return""!==t&&r===o.origin&&n===o.pathname}(r,t)}function F(e){var t=e.cause,r=e.url,n=r.pathname,o=r.hash;return n===e.oldURL.pathname&&(t===R.Pop||t===R.Push&&""!==o)}!function(e){e.Init="init",e.Hint="hint",e.Push="push",e.Pop="pop"}(R||(R={}));var V=r(358),z=r(363);function W(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var r=[],n=!0,o=!1,i=void 0;try{for(var c,a=e[Symbol.iterator]();!(n=(c=a.next()).done)&&(r.push(c.value),!t||r.length!==t);n=!0);}catch(e){o=!0,i=e}finally{try{n||null==a.return||a.return()}finally{if(o)throw i}}return r}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return X(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return X(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function X(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function J(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function K(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?J(Object(r),!0).forEach((function(t){G(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):J(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function G(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function Q(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var Y=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.parent=t}var t,r,n;return t=e,(r=[{key:"fetchPage",value:function(e){return Object(D.g)(e.url.href,{method:"GET",mode:"cors",headers:{Accept:"text/html"}}).pipe(Object(_.a)((function(e){return e.text()})),Object(y.a)((function(t){return K(K({},e),{},{responseText:t})})),Object(q.a)((function(t){return Object(S.a)(K(K({},e),{},{error:t,responseText:null}))})))}},{key:"selectPrefetch",value:function(e,t,r){return e.href===t.url.href?Object(S.a)(t):r.pipe(Object(z.a)(1))}},{key:"getResponse",value:function(e,t,r){return Object(V.a)(this.selectPrefetch(t.url,r,e),this.parent.animPromise).pipe(Object(y.a)((function(e){return K(K({},W(e,1)[0]),t)})))}}])&&Q(t.prototype,r),n&&Q(t,n),e}(),Z=r(66),ee=r(308),te=r(340);function re(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var r=[],n=!0,o=!1,i=void 0;try{for(var c,a=e[Symbol.iterator]();!(n=(c=a.next()).done)&&(r.push(c.value),!t||r.length!==t);n=!0);}catch(e){o=!0,i=e}finally{try{n||null==a.return||a.return()}finally{if(o)throw i}}return r}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return ne(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return ne(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function ne(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function oe(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function ie(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?oe(Object(r),!0).forEach((function(t){ce(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):oe(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function ce(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function ae(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var ue=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.parent=t}var t,r,n;return t=e,(r=[{key:"removeScriptTags",value:function(e){var t=this,r=[];return e.forEach((function(e){null!=e&&e.querySelectorAll(t.scriptSelector).forEach((function(e){var t=[function(e){var t=document.createElement("script");return Array.from(e.attributes).forEach((function(e){return t.setAttributeNode(e.cloneNode())})),t.innerHTML=e.innerHTML,t}(e),e];r.push(t)}))})),r}},{key:"reinsertScriptTags",value:function(e){var t=this;if(!this.scriptSelector)return Promise.resolve(e);var r=e.scripts,n=document.write;return Object(Z.a)(r).pipe(Object(ee.a)((function(e){return t.insertScript(e)})),Object(q.a)((function(t){return Object(S.a)(ie(ie({},e),{},{error:t}))})),Object(te.a)((function(){return document.write=n})),Object(L.a)(e)).toPromise()}},{key:"insertScript",value:function(e){var t=re(e,2),r=t[0],n=t[1];return document.write=function(){for(var e=document.createElement("div"),t=arguments.length,r=new Array(t),o=0;o<t;o++)r[o]=arguments[o];e.innerHTML=r.join(),Array.from(e.childNodes).forEach((function(e){return n.parentNode.insertBefore(e,n)}))},new Promise((function(e,t){""!==r.src?(r.addEventListener("load",e),r.addEventListener("error",t),n.parentNode.replaceChild(r,n)):(n.parentNode.replaceChild(r,n),e({}))}))}},{key:"scriptSelector",get:function(){return this.parent.scriptSelector}}])&&ae(t.prototype,r),n&&ae(t,n),e}();function se(e,t){e.forEach((function(e){e.querySelectorAll("[href]").forEach(le("href",t)),e.querySelectorAll("[src]").forEach(le("src",t)),e.querySelectorAll("img[srcset]").forEach(function(e,t){return function(r){try{r.setAttribute(e,r.getAttribute(e).split(/\s*,\s*/).map((function(e){var r=e.split(/\s+/);return r[0]=new URL(r[0],t).href,r.join(" ")})).join(", "))}catch(e){}}}("srcset",t)),e.querySelectorAll("blockquote[cite]").forEach(le("cite",t)),e.querySelectorAll("del[cite]").forEach(le("cite",t)),e.querySelectorAll("ins[cite]").forEach(le("cite",t)),e.querySelectorAll("q[cite]").forEach(le("cite",t)),e.querySelectorAll("img[longdesc]").forEach(le("longdesc",t)),e.querySelectorAll("frame[longdesc]").forEach(le("longdesc",t)),e.querySelectorAll("iframe[longdesc]").forEach(le("longdesc",t)),e.querySelectorAll("img[usemap]").forEach(le("usemap",t)),e.querySelectorAll("input[usemap]").forEach(le("usemap",t)),e.querySelectorAll("object[usemap]").forEach(le("usemap",t)),e.querySelectorAll("form[action]").forEach(le("action",t)),e.querySelectorAll("button[formaction]").forEach(le("formaction",t)),e.querySelectorAll("input[formaction]").forEach(le("formaction",t)),e.querySelectorAll("video[poster]").forEach(le("poster",t)),e.querySelectorAll("object[data]").forEach(le("data",t)),e.querySelectorAll("object[codebase]").forEach(le("codebase",t)),e.querySelectorAll("object[archive]").forEach(function(e,t){return function(r){try{r.setAttribute(e,r.getAttribute(e).split(/[\s,]+/).map((function(e){return new URL(e,t).href})).join(", "))}catch(e){}}}("archive",t))}))}function le(e,t){return function(r){try{r.setAttribute(e,new URL(r.getAttribute(e),t).href)}catch(e){}}}function fe(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var r=[],n=!0,o=!1,i=void 0;try{for(var c,a=e[Symbol.iterator]();!(n=(c=a.next()).done)&&(r.push(c.value),!t||r.length!==t);n=!0);}catch(e){o=!0,i=e}finally{try{n||null==a.return||a.return()}finally{if(o)throw i}}return r}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return pe(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return pe(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function pe(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function he(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function be(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?he(Object(r),!0).forEach((function(t){ye(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):he(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function ye(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function de(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var ve=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.parent=t,this.scriptManager=new ue(t)}var t,r,n;return t=e,(r=[{key:"getReplaceElements",value:function(e){if(this.replaceSelector)return this.replaceSelector.split(",").map((function(t){return e.querySelector(t)}));if(this.el.id)return[e.getElementById(this.el.id)];var t=Array.from(document.getElementsByTagName(this.el.tagName)).indexOf(this.el);return[e.getElementsByTagName(this.el.tagName)[t]]}},{key:"responseToContent",value:function(e){var t=e.responseText,r=(new DOMParser).parseFromString(t,"text/html"),n=r.title,o=void 0===n?"":n,i=this.getReplaceElements(r);if(i.every((function(e){return null==e})))throw new Error("Couldn't find any element in the document at '".concat(location,"'."));var c=this.scriptSelector?this.scriptManager.removeScriptTags(i):[];return be(be({},e),{},{document:r,title:o,replaceEls:i,scripts:c})}},{key:"replaceContentWithSelector",value:function(e){this.replaceSelector.split(",").map((function(e){return document.querySelector(e)})).forEach((function(t,r){return t.parentNode.replaceChild(e[r],t)}))}},{key:"replaceContentWholesale",value:function(e){var t=fe(e,1)[0];this.el.innerHTML=t.innerHTML}},{key:"replaceContent",value:function(e){this.replaceSelector?this.replaceContentWithSelector(e):this.replaceContentWholesale(e)}},{key:"replaceHead",value:function(e){var t=this.el.ownerDocument.head,r=t.querySelector("link[rel=canonical]"),n=e.head.querySelector("link[rel=canonical]");r&&n&&(r.href=n.href);var o=t.querySelector("meta[name=description]"),i=e.head.querySelector("meta[name=description]");o&&i&&(o.content=i.content)}},{key:"updateDOM",value:function(e){try{var t=e.replaceEls,r=e.document;U(this.parent)&&se(t,this.parent.href),this.replaceHead(r),this.replaceContent(t)}catch(t){throw be(be({},e),{},{error:t})}}},{key:"reinsertScriptTags",value:function(e){return this.scriptManager.reinsertScriptTags(e)}},{key:"el",get:function(){return this.parent.el}},{key:"replaceSelector",get:function(){return this.parent.replaceSelector}},{key:"scriptSelector",get:function(){return this.parent.scriptSelector}}])&&de(t.prototype,r),n&&de(t,n),e}(),Oe=r(63),me=r(114);function je(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var ge=function(e){return Array.prototype.concat.apply([],e)},we=function(e){return{addedNodes:new Set(ge(e.map((function(e){return Array.from(e.addedNodes)})))),removedNodes:new Set(ge(e.map((function(e){return Array.from(e.removedNodes)}))))}},Se=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}var t,r,n;return t=e,(r=[{key:"setupEventListeners",value:function(){var e=this,t=Object(c.a)(this.el,"click").pipe(Object(y.a)((function(t){var r=Object(D.k)(t.target,e.linkSelector);if(r instanceof HTMLAnchorElement)return[t,r]})),Object(d.a)((function(e){return!!e}))),r=function(e,t){return e.matches(t)?Object(S.a)(e):Object(Z.a)(e.querySelectorAll(t))};return{hintEvent$:this.$.linkSelector.pipe(Object(_.a)((function(t){var n=new Map,o=function(e){n.has(e)||n.set(e,function(e){return Object(a.a)(Object(c.a)(e,"mouseenter",{passive:!0}),Object(c.a)(e,"touchstart",{passive:!0}),Object(c.a)(e,"focus",{passive:!0})).pipe(Object(y.a)((function(t){return[t,e]})))}(e))},i=function(e){n.delete(e)};return Object(D.d)(e.el,{childList:!0,subtree:!0}).pipe(Object(O.a)({addedNodes:[e.el],removedNodes:[]}),Object(D.c)(500),Object(y.a)(we),Object(_.a)((function(e){var c=e.addedNodes,a=e.removedNodes;return Object(Z.a)(a).pipe(Object(d.a)((function(e){return e instanceof Element})),Object(Oe.a)((function(e){return r(e,t)})),Object(v.a)(i)).subscribe(),Object(Z.a)(c).pipe(Object(d.a)((function(e){return e instanceof Element})),Object(Oe.a)((function(e){return r(e,t)})),Object(v.a)(o)).subscribe(),Object(Z.a)(n.values()).pipe(Object(me.a)())})),Object(D.l)(e.$.prefetch))}))),pushEvent$:t}}}])&&je(t.prototype,r),n&&je(t,n),e}();function Pe(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function Ee(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?Pe(Object(r),!0).forEach((function(t){ke(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Pe(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function ke(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function Ae(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var Ne=function(e){return new Promise((function(t){return setTimeout(t,e)}))},Re=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.parent=t}var t,r,n;return t=e,(r=[{key:"onStart",value:function(e){var t=this;this.parent.animPromise=Ne(this.parent.duration),this.parent.fireEvent("start",{detail:Ee(Ee({},e),{},{transitionUntil:function(e){t.parent.animPromise=Promise.all([t.parent.animPromise,e])}})})}},{key:"emitDOMError",value:function(e){var t=location.href;window.history.back(),setTimeout((function(){return document.location.assign(t)}),100)}},{key:"emitNetworkError",value:function(e){this.parent.fireEvent("networkerror",{detail:e})}},{key:"emitError",value:function(e){this.parent.fireEvent("error",{detail:e})}},{key:"emitReady",value:function(e){this.parent.fireEvent("ready",{detail:e})}},{key:"emitAfter",value:function(e){var t=this;this.parent.fadePromise=Ne(this.parent.duration),this.parent.fireEvent("after",{detail:Ee(Ee({},e),{},{transitionUntil:function(e){t.parent.fadePromise=Promise.all([t.parent.fadePromise,e])}})})}},{key:"emitProgress",value:function(e){this.parent.fireEvent("progress",{detail:e})}},{key:"emitLoad",value:function(e){this.parent.fireEvent("load",{detail:e})}}])&&Ae(t.prototype,r),n&&Ae(t,n),e}();function Ce(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function Me(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?Ce(Object(r),!0).forEach((function(t){Le(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Ce(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function Le(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function Te(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}window.HashChangeEvent=window.HashChangeEvent||function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=t.oldURL,n=void 0===r?"":r,o=t.newURL,i=void 0===o?"":o,c=new CustomEvent(e);return c.oldURL=n,c.newURL=i,c};var _e=function(){function e(t){var r=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.updateHistoryScrollPosition=function(){if(!U(r.parent)){var e=r.assignScrollPosition(history.state||{});history.replaceState(e,document.title)}},this.parent=t}var t,r,n;return t=e,(r=[{key:"updateHistoryState",value:function(e){var t=e.cause,r=e.replace,n=e.url,o=e.oldURL;if(!U(this.parent))switch(t){case R.Init:case R.Push:var i=this.parent.histId;if(r||n.href===location.href){var c=Me(Me({},history.state),{},Le({},i,{}));history.replaceState(c,document.title,n.href)}else history.pushState(Le({},i,{}),document.title,n.href);case R.Pop:this.parent.simulateHashChange&&function(e,t){e.hash!==t.hash&&window.dispatchEvent(new HashChangeEvent("hashchange",{newURL:e.href,oldURL:t.href}))}(n,o)}}},{key:"updateTitle",value:function(e){var t=e.cause,r=e.title;document.title=r,U(this.parent)||t!==R.Push||history.replaceState(history.state,r)}},{key:"assignScrollPosition",value:function(e){var t=this.parent.histId;return Me(Me({},e),{},Le({},t,Me(Me({},e[t]),{},{scrollTop:Object(D.j)(),scrollHeight:Object(D.i)()})))}}])&&Te(t.prototype,r),n&&Te(t,n),e}();function Ie(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var qe=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.parent=t,"scrollRestoration"in history&&(history.scrollRestoration="manual")}var t,r,n;return t=e,(r=[{key:"manageScrollPosition",value:function(e){var t=e.cause,r=e.url.hash;switch(t){case R.Push:this.scrollHashIntoView(r,{behavior:"smooth",block:"start",inline:"nearest"});break;case R.Pop:this.restoreScrollPosition();break;case R.Init:this.restoreScrollPositionOnReload()}}},{key:"elementFromHash",value:function(e){return document.getElementById(decodeURIComponent(e.substr(1)))}},{key:"scrollHashIntoView",value:function(e,t){if(e){var r=this.elementFromHash(e);r&&r.scrollIntoView(t)}else window.scroll(window.pageXOffset,0)}},{key:"restoreScrollPosition",value:function(){var e=this.parent.histId,t=(history.state&&history.state[e]||{}).scrollTop;null!=t&&window.scroll(window.pageXOffset,t)}},{key:"restoreScrollPositionOnReload",value:function(){var e=this,t=this.parent.histId;history.state&&history.state[t]&&0===Object(D.j)()?this.restoreScrollPosition():location.hash&&requestAnimationFrame((function(){return e.scrollHashIntoView(location.hash,!0)}))}}])&&Ie(t.prototype,r),n&&Ie(t,n),e}();function xe(e){return function(e){if(Array.isArray(e))return He(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||Ue(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function De(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var r=[],n=!0,o=!1,i=void 0;try{for(var c,a=e[Symbol.iterator]();!(n=(c=a.next()).done)&&(r.push(c.value),!t||r.length!==t);n=!0);}catch(e){o=!0,i=e}finally{try{n||null==a.return||a.return()}finally{if(o)throw i}}return r}(e,t)||Ue(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function Ue(e,t){if(e){if("string"==typeof e)return He(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?He(e,t):void 0}}function He(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function $e(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function Be(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function Fe(e,t,r){return(Fe="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,r){var n=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=Je(e)););return e}(e,t);if(n){var o=Object.getOwnPropertyDescriptor(n,t);return o.get?o.get.call(r):o.value}})(e,t,r||e)}function Ve(e,t){return(Ve=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function ze(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var r,n=Je(e);if(t){var o=Je(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return We(this,r)}}function We(e,t){return!t||"object"!==Ke(t)&&"function"!=typeof t?Xe(e):t}function Xe(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function Je(e){return(Je=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function Ke(e){return(Ke="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var Ge=function(e,t,r,n){var o,i=arguments.length,c=i<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"===("undefined"==typeof Reflect?"undefined":Ke(Reflect))&&"function"==typeof Reflect.decorate)c=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(c=(i<3?o(c):i>3?o(t,r,c):o(t,r))||c);return i>3&&c&&Object.defineProperty(t,r,c),c},Qe=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&Ve(e,t)}(u,e);var t,r,n,o=ze(u);function u(){var e;return $e(this,u),(e=o.apply(this,arguments)).el=Xe(e),e.linkSelector="a[href]:not([data-no-push])",e.prefetch=!1,e.duration=0,e.simulateHashChange=!1,e.baseURL=window.location.href,e._initialized=Object(D.f)(),e.$={},e.fadePromise=Promise.resolve(null),e.scrollManager=new qe(Xe(e)),e.historyManager=new _e(Xe(e)),e.fetchManager=new Y(Xe(e)),e.updateManager=new ve(Xe(e)),e.eventManager=new Re(Xe(e)),e._url=new URL(e.baseURL),e.reload$=new i.a,e.cacheNr=0,e.upgrade=function(){var t=e.setupEventListeners(),r=t.pushEvent$,n=t.hintEvent$,o={},i=r.pipe(Object(y.a)((function(t){var r=De(t,2),n=r[0],o=r[1];return{cause:R.Push,url:new URL(o.href,e.href),anchor:o,event:n,cacheNr:e.cacheNr}})),Object(d.a)((function(t){return $(t,Xe(e))})),Object(v.a)((function(t){t.event.preventDefault(),e.historyManager.updateHistoryScrollPosition()}))),u=Object(c.a)(window,"popstate").pipe(Object(d.a)((function(){return window.history.state&&window.history.state[e.histId]})),Object(y.a)((function(t){return{cause:R.Pop,url:new URL(window.location.href),cacheNr:e.cacheNr,event:t}}))),s=e.reload$,l=Object(a.a)(i,u,s).pipe(Object(O.a)({url:new URL(window.location.href)}),Object(m.a)(),Object(y.a)((function(e){var t=De(e,2),r=t[0],n=t[1];return Object.assign(n,{oldURL:r.url})})),Object(j.a)()),f=l.pipe(Object(d.a)((function(e){return!F(e)})),Object(j.a)()),b=l.pipe(Object(d.a)((function(e){return F(e)})),Object(d.a)((function(){return history.state&&history.state[e.histId]})),N(p),Object(v.a)((function(t){e.historyManager.updateHistoryState(t),e.scrollManager.manageScrollPosition(t)}))),g=Object(h.a)((function(){return Object(a.a)(f.pipe(Object(L.a)(!0)),o.response$.pipe(Object(L.a)(!1)))})).pipe(Object(O.a)(!1)),w=n.pipe(Object(D.h)(g.pipe(Object(y.a)((function(e){return!e})))),Object(y.a)((function(t){var r=De(t,2),n=r[0],o=r[1];return{cause:R.Hint,url:new URL(o.href,e.href),anchor:o,event:n,cacheNr:e.cacheNr}})),Object(d.a)((function(t){return B(t,Xe(e))}))),S=Object(a.a)(w,f).pipe(Object(T.a)((function(t,r){return e.compareContext(t,r)})),Object(_.a)((function(t){return e.fetchManager.fetchPage(t)})),Object(O.a)({url:{}}),Object(j.a)()),P=o.response$=f.pipe(Object(v.a)((function(t){e.eventManager.onStart(t),e.historyManager.updateHistoryState(t),e._url=t.url})),Object(I.a)(S),Object(_.a)((function(t){var r;return(r=e.fetchManager).getResponse.apply(r,[S].concat(xe(t)))})),Object(j.a)()),E=P.pipe(Object(d.a)((function(e){return!e.error}))),k=P.pipe(Object(d.a)((function(e){return!!e.error}))),A=E.pipe(Object(y.a)((function(t){return e.updateManager.responseToContent(t)})),Object(v.a)((function(t){return e.eventManager.emitReady(t)})),N(p),Object(v.a)((function(t){e.updateManager.updateDOM(t),e.historyManager.updateTitle(t),e.eventManager.emitAfter(t)})),Object(O.a)({cause:R.Init,url:e._url,scripts:[]}),N(p),Object(v.a)((function(t){return e.scrollManager.manageScrollPosition(t)})),Object(v.a)({error:function(t){return e.eventManager.emitDOMError(t)}}),Object(q.a)((function(e,t){return t})),Object(_.a)((function(t){return e.fadePromise.then((function(){return t}))})),Object(_.a)((function(t){return e.updateManager.reinsertScriptTags(t)})),Object(v.a)({error:function(t){return e.eventManager.emitError(t)}}),Object(q.a)((function(e,t){return t})),Object(v.a)((function(t){return e.eventManager.emitLoad(t)}))),C=k.pipe(Object(v.a)((function(t){return e.eventManager.emitNetworkError(t)}))),M=f.pipe(Object(_.a)((function(t){return Object(h.a)((function(){return e.animPromise})).pipe(Object(x.a)(P),Object(L.a)(t))})),Object(v.a)((function(t){return e.eventManager.emitProgress(t)})));A.subscribe(),b.subscribe(),C.subscribe(),M.subscribe(),e._initialized.resolve(Xe(e)),e.fireEvent("init")},e}return t=u,(r=[{key:"createRenderRoot",value:function(){return this}},{key:"_setLocation",value:function(e,t){var r=new URL(this._url.href);r[e]=t,this.assign(r.href)}},{key:"assign",value:function(e){this.reload$.next({cause:R.Push,url:new URL(e,this.href),cacheNr:++this.cacheNr})}},{key:"reload",value:function(){this.reload$.next({cause:R.Push,url:new URL(this.href),cacheNr:++this.cacheNr,replace:!0})}},{key:"replace",value:function(e){this.reload$.next({cause:R.Push,url:new URL(e,this.href),cacheNr:++this.cacheNr,replace:!0})}},{key:"compareContext",value:function(e,t){return e.url.href===t.url.href&&e.error===t.error&&e.cacheNr===t.cacheNr}},{key:"connectedCallback",value:function(){Fe(Je(u.prototype),"connectedCallback",this).call(this),this.$.linkSelector=new b.a(this.linkSelector),this.$.prefetch=new b.a(this.prefetch),window.addEventListener("beforeunload",this.historyManager.updateHistoryScrollPosition),this.updateComplete.then(this.upgrade)}},{key:"disconnectedCallback",value:function(){window.removeEventListener("beforeunload",this.historyManager.updateHistoryScrollPosition)}},{key:"initialized",get:function(){return this._initialized}},{key:"hash",get:function(){return this._url.hash},set:function(e){this._setLocation("hash",e)}},{key:"host",get:function(){return this._url.host},set:function(e){this._setLocation("host",e)}},{key:"hostname",get:function(){return this._url.hostname},set:function(e){this._setLocation("hostname",e)}},{key:"href",get:function(){return this._url.href},set:function(e){this._setLocation("href",e)}},{key:"pathname",get:function(){return this._url.pathname},set:function(e){this._setLocation("pathname",e)}},{key:"port",get:function(){return this._url.port},set:function(e){this._setLocation("port",e)}},{key:"protocol",get:function(){return this._url.protocol},set:function(e){this._setLocation("protocol",e)}},{key:"search",get:function(){return this._url.search},set:function(e){this._setLocation("search",e)}},{key:"origin",get:function(){return this._url.origin},set:function(e){}},{key:"ancestorOrigins",get:function(){return window.location.ancestorOrigins},set:function(e){}},{key:"histId",get:function(){return this.id||this.tagName}}])&&Be(t.prototype,r),n&&Be(t,n),u}(Object(D.b)(D.a,[Se]));
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
 */Ge([Object(o.e)({type:String,reflect:!0,attribute:"replace-selector"})],Qe.prototype,"replaceSelector",void 0),Ge([Object(o.e)({type:String,reflect:!0,attribute:"link-selector"})],Qe.prototype,"linkSelector",void 0),Ge([Object(o.e)({type:String,reflect:!0,attribute:"script-selector"})],Qe.prototype,"scriptSelector",void 0),Ge([Object(o.e)({type:Boolean,reflect:!0,attribute:"prefetch"})],Qe.prototype,"prefetch",void 0),Ge([Object(o.e)({type:Number,reflect:!0,attribute:"duration"})],Qe.prototype,"duration",void 0),Ge([Object(o.e)({type:Boolean,reflect:!0,attribute:"hashchange"})],Qe.prototype,"simulateHashChange",void 0),Ge([Object(o.e)({type:String})],Qe.prototype,"baseURL",void 0),Ge([Object(o.e)()],Qe.prototype,"assign",null),Ge([Object(o.e)()],Qe.prototype,"reload",null),Ge([Object(o.e)()],Qe.prototype,"replace",null),Qe=Ge([Object(o.c)("hy-push-state")],Qe)},357:function(e,t,r){"use strict";r.d(t,"a",(function(){return u}));var n=r(1),o=r(8),i=r(14),c=r(12),a=r(66);function u(e){return function(t){return Object(i.a)(t,(function(t){var r,n=this,o=new c.a,i=null,l=!1;return i=t.subscribe(new s(n,(function(c){!function(o){try{r=Object(a.a)(e(o,u(e)(t)))}catch(o){return void n.error(o)}}(c),r&&(i?(i.unsubscribe(),i=null,o.add(r.subscribe(n))):l=!0)}))),l?(i.unsubscribe(),i=null,o.add(r.subscribe(n))):o.add(i),o}))}}var s=function(e){function t(t,r){var n=e.call(this,t)||this;return n.onError=r,n}return Object(n.c)(t,e),t.prototype._error=function(e){this.onError(e),this.unsubscribe()},t}(o.a)},358:function(e,t,r){"use strict";r.d(t,"a",(function(){return c}));var n=r(5),o=r(12),i=r(66);function c(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var r=void 0;return"function"==typeof e[e.length-1]&&(r=e.pop()),new n.a((function(t){for(var n=e.map((function(){return[]})),c=e.map((function(){return!1})),a=new o.a,u=function(o){var u=Object(i.a)(e[o]);a.add(u.subscribe({next:function(e){n[o].push(e),function(){if(n.every((function(e){return e.length>0}))){var e=n.map((function(e){return e.shift()}));if(r)try{e=r.apply(void 0,e)}catch(e){return void t.error(e)}t.next(e),n.some((function(e,t){return 0===e.length&&c[t]}))&&t.complete()}}()},error:function(e){return t.error(e)},complete:function(){c[o]=!0,0===n[o].length&&t.complete()}}))},s=0;!t.closed&&s<e.length;s++)u(s);return a}))}},359:function(e,t,r){"use strict";r.d(t,"a",(function(){return u}));var n=r(1),o=r(33),i=r(66),c=r(14),a=r(21);function u(e,t){return t?function(r){return r.pipe(u((function(r,n){return Object(i.a)(e(r,n)).pipe(Object(o.a)((function(e,o){return t(r,e,n,o)})))})))}:function(t){return Object(c.a)(t,new s(e))}}var s=function(){function e(e){this.project=e}return e.prototype.call=function(e,t){return t.subscribe(new l(e,this.project))},e}(),l=function(e){function t(t,r){var n=e.call(this,t)||this;return n.destination=t,n.project=r,n.hasCompleted=!1,n.index=0,n}return Object(n.c)(t,e),t.prototype._next=function(e){if(!this.innerSubscription){var t=void 0,r=this.index++;try{t=this.project(e,r)}catch(e){return void this.destination.error(e)}var n=new a.c(this);this.destination.add(n),this.innerSubscription=n,Object(a.e)(t,n)}},t.prototype._complete=function(){this.hasCompleted=!0,this.innerSubscription||this.destination.complete(),this.unsubscribe()},t.prototype.notifyNext=function(e){this.destination.next(e)},t.prototype.notifyError=function(e){this.destination.error(e)},t.prototype.notifyComplete=function(){this.innerSubscription=void 0,this.hasCompleted&&this.destination.complete()},t}(a.d)},365:function(e,t,r){"use strict";r.d(t,"a",(function(){return c}));var n=r(5),o=r(116),i=r(109);function c(e,t,r){void 0===e&&(e=0);var c=-1;return null!=t&&(Object(i.a)(t)?r=t:c=t),Object(i.a)(r)||(r=o.a),new n.a((function(t){var n,o=Math.max(0,(n=e)instanceof Date&&!isNaN(n)?+e-r.now():e);return r.schedule(a,o,{counter:0,period:c,subscriber:t})}))}function a(e){var t=e.period,r=e.subscriber,n=e.counter++;if(r.next(n),!r.closed){if(t<0)return r.complete();this.schedule(e,t)}}}}]);