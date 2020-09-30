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
 * Powered by Hydejack v9.1.0-beta.7 <https://hydejack.com/>
 */
(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{165:function(t,e,r){"use strict";r.d(e,"g",(function(){return n.a})),r.d(e,"m",(function(){return n.c})),r.d(e,"a",(function(){return c})),r.d(e,"b",(function(){return s})),r.d(e,"e",(function(){return a.c})),r.d(e,"d",(function(){return a.b})),r.d(e,"l",(function(){return u.c})),r.d(e,"h",(function(){return u.b})),r.d(e,"c",(function(){return u.a})),r.d(e,"i",(function(){return l.b})),r.d(e,"j",(function(){return l.c})),r.d(e,"k",(function(){return l.d})),r.d(e,"f",(function(){return l.a}));var n=r(58),i=r(172),o=r(169);class c extends i.a{constructor(){super(...arguments),this.$connected=new o.a}connectedCallback(){super.connectedCallback(),this.$connected.next(!0)}disconnectedCallback(){super.disconnectedCallback(),this.$connected.next(!1)}firstUpdated(){this.firstUpdate=!0}updated(t){if(!this.firstUpdate)for(var e of t.keys())e in this.$&&this.$[e].next(this[e]);this.firstUpdate=!1}fireEvent(t,e){this.dispatchEvent(new CustomEvent(t,e)),this.dispatchEvent(new CustomEvent("".concat(this.tagName.toLowerCase(),"-").concat(t),e))}}function s(t,e){return e.forEach(e=>{Object.getOwnPropertyNames(e.prototype).forEach(r=>{t.prototype[r]=e.prototype[r]})}),t}var a=r(74),u=r(57),l=r(40)},169:function(t,e,r){"use strict";r.d(e,"a",(function(){return a}));var n=r(0),i=r(1),o=r(4),c=r(170),s=function(t){function e(e,r){var n=t.call(this)||this;return n.subject=e,n.subscriber=r,n.closed=!1,n}return Object(n.c)(e,t),e.prototype.unsubscribe=function(){if(!this.closed){this.closed=!0;var t=this.subject,e=t.observers;if(this.subject=null,e&&0!==e.length&&!t.isStopped&&!t.closed){var r=e.indexOf(this.subscriber);-1!==r&&e.splice(r,1)}}},e}(o.a),a=function(t){function e(){var e=t.call(this)||this;return e.observers=[],e.closed=!1,e.isStopped=!1,e.hasError=!1,e.thrownError=null,e}return Object(n.c)(e,t),e.prototype.lift=function(t){var e=new u(this,this);return e.operator=t,e},e.prototype.next=function(t){if(this.closed)throw new c.a;if(!this.isStopped)for(var e=this.observers,r=e.length,n=e.slice(),i=0;i<r;i++)n[i].next(t)},e.prototype.error=function(t){if(this.closed)throw new c.a;this.hasError=!0,this.thrownError=t,this.isStopped=!0;for(var e=this.observers,r=e.length,n=e.slice(),i=0;i<r;i++)n[i].error(t);this.observers.length=0},e.prototype.complete=function(){if(this.closed)throw new c.a;this.isStopped=!0;for(var t=this.observers,e=t.length,r=t.slice(),n=0;n<e;n++)r[n].complete();this.observers.length=0},e.prototype.unsubscribe=function(){this.isStopped=!0,this.closed=!0,this.observers=null},e.prototype._trySubscribe=function(e){if(this.closed)throw new c.a;return t.prototype._trySubscribe.call(this,e)},e.prototype._subscribe=function(t){if(this.closed)throw new c.a;return this.hasError?(t.error(this.thrownError),o.a.EMPTY):this.isStopped?(t.complete(),o.a.EMPTY):(this.observers.push(t),new s(this,t))},e.prototype.asObservable=function(){var t=new i.a;return t.source=this,t},e.create=function(t,e){return new u(t,e)},e}(i.a),u=function(t){function e(e,r){var n=t.call(this)||this;return n.destination=e,n.source=r,n}return Object(n.c)(e,t),e.prototype.next=function(t){var e=this.destination;e&&e.next&&e.next(t)},e.prototype.error=function(t){var e=this.destination;e&&e.error&&this.destination.error(t)},e.prototype.complete=function(){var t=this.destination;t&&t.complete&&this.destination.complete()},e.prototype._subscribe=function(t){return this.source?this.source.subscribe(t):o.a.EMPTY},e}(a)},170:function(t,e,r){"use strict";r.d(e,"a",(function(){return i}));var n=r(72),i=Object(n.a)((function(t){return function(){t(this),this.message="object unsubscribed"}}))},179:function(t,e,r){"use strict";r.d(e,"a",(function(){return i})),r.d(e,"b",(function(){return o}));var n=r(1),i=new n.a((function(t){return t.complete()}));function o(t){return t?function(t){return new n.a((function(e){return t.schedule((function(){return e.complete()}))}))}(t):i}},180:function(t,e,r){"use strict";r.d(e,"a",(function(){return o}));var n=r(75),i=r(71);function o(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];var r=t[t.length-1];return Object(i.a)(r)?(t.pop(),function(e){return Object(n.a)(t,e,r)}):function(e){return Object(n.a)(t,e)}}},181:function(t,e,r){"use strict";r.d(e,"a",(function(){return s}));var n=r(1),i=r(71),o=r(76),c=r(73);function s(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];var r=1/0,s=void 0,a=t[t.length-1];return Object(i.a)(a)?(s=t.pop(),t.length>1&&"number"==typeof t[t.length-1]&&(r=t.pop())):"number"==typeof a&&(r=t.pop()),!s&&1===t.length&&t[0]instanceof n.a?t[0]:Object(o.a)(r)(Object(c.a)(t,s))}},187:function(t,e,r){"use strict";r.d(e,"a",(function(){return O}));var n=r(0),i=r(1),o=r(2),c=r(4),s=r(5);function a(){return function(t){return Object(s.a)(t,new l)}}var u,l=function(){function t(){}return t.prototype.call=function(t,e){e._refCount++;var r=new h(t,e),n=e.subscribe(r);return r.closed||(r.connection=e.connect()),n},t}(),h=function(t){function e(e,r){var n=t.call(this,e)||this;return n.connectable=r,n.connection=null,n}return Object(n.c)(e,t),e.prototype.unsubscribe=function(){if(!this.closed){var e=this.connectable;if(!e)return void(this.connection=null);this.connectable=null;var r=e._refCount;if(r<=0)return void(this.connection=null);if(e._refCount=r-1,r>1)return void(this.connection=null);var n=this.connection,i=e._connection;this.connection=null,!i||n&&i!==n||i.unsubscribe(),t.prototype.unsubscribe.call(this)}},e}(o.a),p=function(t){function e(e,r){var n=t.call(this)||this;return n.source=e,n.subjectFactory=r,n._refCount=0,n._isComplete=!1,n}return Object(n.c)(e,t),e.prototype._subscribe=function(t){return this.getSubject().subscribe(t)},e.prototype.getSubject=function(){var t=this._subject;return t&&!t.isStopped||(this._subject=this.subjectFactory()),this._subject},e.prototype.connect=function(){var t=this._connection;return t||(this._isComplete=!1,(t=this._connection=new c.a).add(this.source.subscribe(new b(this.getSubject(),this))),t.closed&&(this._connection=null,t=c.a.EMPTY)),t},e.prototype.refCount=function(){return a()(this)},e}(i.a),f={operator:{value:null},_refCount:{value:0,writable:!0},_subject:{value:null,writable:!0},_connection:{value:null,writable:!0},_subscribe:{value:(u=p.prototype)._subscribe},_isComplete:{value:u._isComplete,writable:!0},getSubject:{value:u.getSubject},connect:{value:u.connect},refCount:{value:u.refCount}},b=function(t){function e(e,r){var n=t.call(this)||this;return n.destination=e,n.connectable=r,n}return Object(n.c)(e,t),e.prototype._error=function(e){this._teardown(),t.prototype._error.call(this,e)},e.prototype._complete=function(){this.connectable._isComplete=!0,this._teardown(),t.prototype._complete.call(this)},e.prototype._teardown=function(){var t=this.connectable;if(t){this.connectable=null;var e=t._connection;t._refCount=0,t._subject=null,t._connection=null,e&&e.unsubscribe()}},e.prototype.unsubscribe=function(){this.closed||(this._teardown(),t.prototype.unsubscribe.call(this))},e}(o.a);var d=function(){function t(t,e){this.subjectFactory=t,this.selector=e}return t.prototype.call=function(t,e){var r=this.selector,n=this.subjectFactory(),i=r(n).subscribe(t);return i.add(e.subscribe(n)),i},t}(),v=r(169);function y(){return new v.a}function O(){return function(t){return a()((e=y,function(t){var n;if(n="function"==typeof e?e:function(){return e},"function"==typeof r)return Object(s.a)(t,new d(n,r));var i=Object.create(t,f);return i.source=t,i.subjectFactory=n,i})(t));var e,r}}},188:function(t,e,r){"use strict";r.d(e,"a",(function(){return c}));var n=r(0),i=r(2),o=r(5);function c(t){return function(e){return Object(o.a)(e,new s(t))}}var s=function(){function t(t){this.value=t}return t.prototype.call=function(t,e){return e.subscribe(new a(t,this.value))},t}(),a=function(t){function e(e,r){var n=t.call(this,e)||this;return n.value=r,n}return Object(n.c)(e,t),e.prototype._next=function(t){this.destination.next(this.value)},e}(i.a)},189:function(t,e,r){"use strict";r.d(e,"a",(function(){return c}));var n=r(0),i=r(2),o=r(5);function c(){return function(t){return Object(o.a)(t,new s)}}var s=function(){function t(){}return t.prototype.call=function(t,e){return e.subscribe(new a(t))},t}(),a=function(t){function e(e){var r=t.call(this,e)||this;return r.hasPrev=!1,r}return Object(n.c)(e,t),e.prototype._next=function(t){var e;this.hasPrev?e=[this.prev,t]:this.hasPrev=!0,this.prev=t,e&&this.destination.next(e)},e}(i.a)},190:function(t,e,r){"use strict";r.d(e,"a",(function(){return i}));var n=r(5);function i(t){return function(e){return Object(n.a)(e,new o(t))}}var o=function(){function t(t){this.callback=t}return t.prototype.call=function(t,e){var r=e.subscribe(t);return r.add(this.callback),r},t}()},197:function(t,e,r){"use strict";r.d(e,"a",(function(){return c}));var n=r(0),i=r(2),o=r(5);function c(t,e){return function(r){return Object(o.a)(r,new s(t,e))}}var s=function(){function t(t,e){this.compare=t,this.keySelector=e}return t.prototype.call=function(t,e){return e.subscribe(new a(t,this.compare,this.keySelector))},t}(),a=function(t){function e(e,r,n){var i=t.call(this,e)||this;return i.keySelector=n,i.hasKey=!1,"function"==typeof r&&(i.compare=r),i}return Object(n.c)(e,t),e.prototype.compare=function(t,e){return t===e},e.prototype._next=function(t){var e;try{var r=this.keySelector;e=r?r(t):t}catch(t){return this.destination.error(t)}var n=!1;if(this.hasKey)try{n=(0,this.compare)(this.key,e)}catch(t){return this.destination.error(t)}else this.hasKey=!0;n||(this.key=e,this.destination.next(t))},e}(i.a)},198:function(t,e,r){"use strict";r.d(e,"a",(function(){return o}));var n=r(1),i=r(41);function o(t){return new n.a((function(e){var r;try{r=t()}catch(t){return void e.error(t)}return Object(i.a)(r).subscribe(e)}))}},199:function(t,e,r){"use strict";r.d(e,"a",(function(){return c}));var n=r(0),i=r(5),o=r(12);function c(t){return function(e){return Object(i.a)(e,new s(t))}}var s=function(){function t(t){this.notifier=t}return t.prototype.call=function(t,e){var r=new a(t),n=Object(o.e)(this.notifier,new o.c(r));return n&&!r.notifierHasNotified?(r.add(n),e.subscribe(r)):r},t}(),a=function(t){function e(e){var r=t.call(this,e)||this;return r.notifierHasNotified=!1,r}return Object(n.c)(e,t),e.prototype.notifyNext=function(){this.notifierHasNotified=!0,this.complete()},e.prototype.notifyComplete=function(){},e}(o.d)},200:function(t,e,r){"use strict";r.d(e,"a",(function(){return c}));var n=r(0),i=r(169),o=r(170),c=function(t){function e(e){var r=t.call(this)||this;return r._value=e,r}return Object(n.c)(e,t),Object.defineProperty(e.prototype,"value",{get:function(){return this.getValue()},enumerable:!1,configurable:!0}),e.prototype._subscribe=function(e){var r=t.prototype._subscribe.call(this,e);return r&&!r.closed&&e.next(this._value),r},e.prototype.getValue=function(){if(this.hasError)throw this.thrownError;if(this.closed)throw new o.a;return this._value},e.prototype.next=function(e){t.prototype.next.call(this,this._value=e)},e}(i.a)},210:function(t,e,r){"use strict";r.r(e),r.d(e,"HyPushState",(function(){return Et}));var n,i=r(172),o=r(169),c=r(163),s=r(181),a=r(0),u=r(94),l=r(92),h=function(t){function e(e,r){var n=t.call(this,e,r)||this;return n.scheduler=e,n.work=r,n}return Object(a.c)(e,t),e.prototype.requestAsyncId=function(e,r,n){return void 0===n&&(n=0),null!==n&&n>0?t.prototype.requestAsyncId.call(this,e,r,n):(e.actions.push(this),e.scheduled||(e.scheduled=l.a.requestAnimationFrame((function(){return e.flush(void 0)}))))},e.prototype.recycleAsyncId=function(e,r,n){if(void 0===n&&(n=0),null!=n&&n>0||null==n&&this.delay>0)return t.prototype.recycleAsyncId.call(this,e,r,n);0===e.actions.length&&(l.a.cancelAnimationFrame(r),e.scheduled=void 0)},e}(u.a),p=new(function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return Object(a.c)(e,t),e.prototype.flush=function(t){this.active=!0,this.scheduled=void 0;var e,r=this.actions,n=-1;t=t||r.shift();var i=r.length;do{if(e=t.execute(t.state,t.delay))break}while(++n<i&&(t=r.shift()));if(this.active=!1,e){for(;++n<i&&(t=r.shift());)t.unsubscribe();throw e}},e}(r(95).a))(h),f=r(198),b=r(200),d=r(19),v=r(99),y=r(100),O=r(180),j=r(189),m=r(187),w=r(2),g=r(179),S=r(37),E=r(1);!function(t){t.NEXT="N",t.ERROR="E",t.COMPLETE="C"}(n||(n={}));!function(){function t(t,e,r){this.kind=t,this.value=e,this.error=r,this.hasValue="N"===t}t.prototype.observe=function(t){var e,r,n;switch(this.kind){case"N":null===(e=t.next)||void 0===e||e.call(t,this.value);break;case"E":null===(r=t.error)||void 0===r||r.call(t,this.error);break;case"C":null===(n=t.complete)||void 0===n||n.call(t)}},t.prototype.do=function(t,e,r){switch(this.kind){case"N":null==t||t(this.value);break;case"E":null==e||e(this.error);break;case"C":null==r||r()}},t.prototype.accept=function(t,e,r){return t&&"function"==typeof t.next?this.observe(t):this.do(t,e,r)},t.prototype.toObservable=function(){var t,e;switch(this.kind){case"N":return Object(S.a)(this.value);case"E":return t=this.error,e?new E.a((function(r){return e.schedule((function(){r.error("function"==typeof t?t():t)}))})):new E.a((function(e){return e.error("function"==typeof t?t():t)}));case"C":return g.a}throw new Error("unexpected notification kind value")},t.createNext=function(e){return new t("N",e)},t.createError=function(e){return new t("E",void 0,e)},t.createComplete=function(){return t.completeNotification},t.completeNotification=new t("C")}();var P=_("C",void 0,void 0);function _(t,e,r){return{kind:t,value:e,error:r}}var C=r(5);function N(t,e){return void 0===e&&(e=0),function(r){return Object(C.a)(r,new x(t,e))}}var k,x=function(){function t(t,e){void 0===e&&(e=0),this.scheduler=t,this.delay=e}return t.prototype.call=function(t,e){return e.subscribe(new M(t,this.scheduler,this.delay))},t}(),M=function(t){function e(e,r,n){void 0===n&&(n=0);var i=t.call(this,e)||this;return i.scheduler=r,i.delay=n,i}return Object(a.c)(e,t),e.dispatch=function(t){!function(t,e){var r,n,i;if("string"!=typeof t.kind)throw new TypeError('Invalid notification, missing "kind"');switch(t.kind){case"N":null===(r=e.next)||void 0===r||r.call(e,t.value);break;case"E":null===(n=e.error)||void 0===n||n.call(e,t.error);break;case"C":null===(i=e.complete)||void 0===i||i.call(e)}}(t.notification,t.destination),this.unsubscribe()},e.prototype.scheduleMessage=function(t){var r=this.destination;r.add(this.scheduler.schedule(e.dispatch,this.delay,{notification:t,destination:r}))},e.prototype._next=function(t){this.scheduleMessage(function(t){return _("N",t,void 0)}(t))},e.prototype._error=function(t){this.scheduleMessage(function(t){return _("E",void 0,t)}(t)),this.unsubscribe()},e.prototype._complete=function(){this.scheduleMessage(P),this.unsubscribe()},e}(w.a),L=r(188),A=r(197),R=r(96),q=r(98),T=r(214),H=r(199),U=r(165);function D(t){var{protocol:e,host:r}=t,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:window.location;return e!==n.protocol||r!==n.host}function I(t){return t&&""===t.target}function $(t,e){var{url:r,anchor:n}=t;return I(n)&&!D(r,e)&&!function(t){var{hash:e,origin:r,pathname:n}=t,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:window.location;return""!==e&&r===i.origin&&n===i.pathname}(r,e)}function F(t){var{cause:e,url:{pathname:r,hash:n},oldURL:{pathname:i}}=t;return r===i&&(e===k.Pop||e===k.Push&&""!==n)}!function(t){t.Init="init",t.Hint="hint",t.Push="push",t.Pop="pop"}(k||(k={}));var B=r(215),V=r(213);function K(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function z(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?K(Object(r),!0).forEach((function(e){W(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):K(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function W(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}class Y{constructor(t){this.parent=t}fetchPage(t){return Object(U.g)(t.url.href,{method:"GET",mode:"cors",headers:{Accept:"text/html"}}).pipe(Object(R.a)(t=>t.text()),Object(d.a)(e=>z(z({},t),{},{responseText:e})),Object(T.a)(e=>Object(S.a)(z(z({},t),{},{error:e,responseText:null}))))}selectPrefetch(t,e,r){var{href:n}=t;return n===e.url.href?Object(S.a)(e):r.pipe(Object(V.a)(1))}getResponse(t,e,r){return Object(B.a)(this.selectPrefetch(e.url,r,t),this.parent.animPromise).pipe(Object(d.a)(t=>{var[r]=t;return z(z({},r),e)}))}}var X=r(41),J=r(164),G=r(190);function Q(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function Z(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?Q(Object(r),!0).forEach((function(e){tt(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):Q(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function tt(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}class et{constructor(t){this.parent=t}get scriptSelector(){return this.parent.scriptSelector}removeScriptTags(t){var e=[];return t.forEach(t=>{null!=t&&t.querySelectorAll(this.scriptSelector).forEach(t=>{var r=[function(t){var e=document.createElement("script");return Array.from(t.attributes).forEach(t=>e.setAttributeNode(t.cloneNode())),e.innerHTML=t.innerHTML,e}(t),t];e.push(r)})}),e}reinsertScriptTags(t){if(!this.scriptSelector)return Promise.resolve(t);var{scripts:e}=t,r=document.write;return Object(X.a)(e).pipe(Object(J.a)(t=>this.insertScript(t)),Object(T.a)(e=>Object(S.a)(Z(Z({},t),{},{error:e}))),Object(G.a)(()=>document.write=r),Object(L.a)(t)).toPromise()}insertScript(t){var[e,r]=t;return document.write=function(){for(var t=document.createElement("div"),e=arguments.length,n=new Array(e),i=0;i<e;i++)n[i]=arguments[i];t.innerHTML=n.join(),Array.from(t.childNodes).forEach(t=>r.parentNode.insertBefore(t,r))},new Promise((t,n)=>{""!==e.src?(e.addEventListener("load",t),e.addEventListener("error",n),r.parentNode.replaceChild(e,r)):(r.parentNode.replaceChild(e,r),t({}))})}}function rt(t,e){t.forEach(t=>{t.querySelectorAll("[href]").forEach(nt("href",e)),t.querySelectorAll("[src]").forEach(nt("src",e)),t.querySelectorAll("img[srcset]").forEach(function(t,e){return r=>{try{r.setAttribute(t,r.getAttribute(t).split(/\s*,\s*/).map(t=>{var r=t.split(/\s+/);return r[0]=new URL(r[0],e).href,r.join(" ")}).join(", "))}catch(t){}}}("srcset",e)),t.querySelectorAll("blockquote[cite]").forEach(nt("cite",e)),t.querySelectorAll("del[cite]").forEach(nt("cite",e)),t.querySelectorAll("ins[cite]").forEach(nt("cite",e)),t.querySelectorAll("q[cite]").forEach(nt("cite",e)),t.querySelectorAll("img[longdesc]").forEach(nt("longdesc",e)),t.querySelectorAll("frame[longdesc]").forEach(nt("longdesc",e)),t.querySelectorAll("iframe[longdesc]").forEach(nt("longdesc",e)),t.querySelectorAll("img[usemap]").forEach(nt("usemap",e)),t.querySelectorAll("input[usemap]").forEach(nt("usemap",e)),t.querySelectorAll("object[usemap]").forEach(nt("usemap",e)),t.querySelectorAll("form[action]").forEach(nt("action",e)),t.querySelectorAll("button[formaction]").forEach(nt("formaction",e)),t.querySelectorAll("input[formaction]").forEach(nt("formaction",e)),t.querySelectorAll("video[poster]").forEach(nt("poster",e)),t.querySelectorAll("object[data]").forEach(nt("data",e)),t.querySelectorAll("object[codebase]").forEach(nt("codebase",e)),t.querySelectorAll("object[archive]").forEach(function(t,e){return r=>{try{r.setAttribute(t,r.getAttribute(t).split(/[\s,]+/).map(t=>new URL(t,e).href).join(", "))}catch(t){}}}("archive",e))})}function nt(t,e){return r=>{try{r.setAttribute(t,new URL(r.getAttribute(t),e).href)}catch(t){}}}function it(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function ot(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?it(Object(r),!0).forEach((function(e){ct(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):it(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function ct(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}class st{constructor(t){this.parent=t,this.scriptManager=new et(t)}get el(){return this.parent.el}get replaceSelector(){return this.parent.replaceSelector}get scriptSelector(){return this.parent.scriptSelector}getReplaceElements(t){if(this.replaceSelector)return this.replaceSelector.split(",").map(e=>t.querySelector(e));if(this.el.id)return[t.getElementById(this.el.id)];var e=Array.from(document.getElementsByTagName(this.el.tagName)).indexOf(this.el);return[t.getElementsByTagName(this.el.tagName)[e]]}responseToContent(t){var{responseText:e}=t,r=(new DOMParser).parseFromString(e,"text/html"),{title:n=""}=r,i=this.getReplaceElements(r);if(i.every(t=>null==t))throw new Error("Couldn't find any element in the document at '".concat(location,"'."));var o=this.scriptSelector?this.scriptManager.removeScriptTags(i):[];return ot(ot({},t),{},{document:r,title:n,replaceEls:i,scripts:o})}replaceContentWithSelector(t){this.replaceSelector.split(",").map(t=>document.querySelector(t)).forEach((e,r)=>e.parentNode.replaceChild(t[r],e))}replaceContentWholesale(t){var[e]=t;this.el.innerHTML=e.innerHTML}replaceContent(t){this.replaceSelector?this.replaceContentWithSelector(t):this.replaceContentWholesale(t)}replaceHead(t){var{head:e}=this.el.ownerDocument,r=e.querySelector("link[rel=canonical]"),n=t.head.querySelector("link[rel=canonical]");r&&n&&(r.href=n.href);var i=e.querySelector("meta[name=description]"),o=t.head.querySelector("meta[name=description]");i&&o&&(i.content=o.content)}updateDOM(t){try{var{replaceEls:e,document:r}=t;D(this.parent)&&rt(e,this.parent.href),this.replaceHead(r),this.replaceContent(e)}catch(e){throw ot(ot({},t),{},{error:e})}}reinsertScriptTags(t){return this.scriptManager.reinsertScriptTags(t)}}var at=r(38),ut=r(76),lt=t=>Array.prototype.concat.apply([],t),ht=t=>({addedNodes:new Set(lt(t.map(t=>Array.from(t.addedNodes)))),removedNodes:new Set(lt(t.map(t=>Array.from(t.removedNodes))))});class pt{setupEventListeners(){var t=Object(c.a)(this.el,"click").pipe(Object(d.a)(t=>{var e=Object(U.k)(t.target,this.linkSelector);if(e instanceof HTMLAnchorElement)return[t,e]}),Object(v.a)(t=>!!t)),e=(t,e)=>t.matches(e)?Object(S.a)(t):Object(X.a)(t.querySelectorAll(e));return{hintEvent$:this.$.linkSelector.pipe(Object(R.a)(t=>{var r=new Map,n=t=>{r.has(t)||r.set(t,(t=>Object(s.a)(Object(c.a)(t,"mouseenter",{passive:!0}),Object(c.a)(t,"touchstart",{passive:!0}),Object(c.a)(t,"focus",{passive:!0})).pipe(Object(d.a)(e=>[e,t])))(t))},i=t=>{r.delete(t)};return Object(U.d)(this.el,{childList:!0,subtree:!0}).pipe(Object(O.a)({addedNodes:[this.el],removedNodes:[]}),Object(U.c)(500),Object(d.a)(ht),Object(R.a)(o=>{var{addedNodes:c,removedNodes:s}=o;return Object(X.a)(s).pipe(Object(v.a)(t=>t instanceof Element),Object(at.a)(r=>e(r,t)),Object(y.a)(i)).subscribe(),Object(X.a)(c).pipe(Object(v.a)(t=>t instanceof Element),Object(at.a)(r=>e(r,t)),Object(y.a)(n)).subscribe(),Object(X.a)(r.values()).pipe(Object(ut.a)())}),Object(U.l)(this.$.prefetch))})),pushEvent$:t}}}function ft(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function bt(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?ft(Object(r),!0).forEach((function(e){dt(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):ft(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function dt(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var vt=t=>new Promise(e=>setTimeout(e,t));class yt{constructor(t){this.parent=t}onStart(t){this.parent.animPromise=vt(this.parent.duration);this.parent.fireEvent("start",{detail:bt(bt({},t),{},{transitionUntil:t=>{this.parent.animPromise=Promise.all([this.parent.animPromise,t])}})})}emitDOMError(t){var e=location.href;window.history.back(),setTimeout(()=>document.location.assign(e),100)}emitNetworkError(t){this.parent.fireEvent("networkerror",{detail:t})}emitError(t){this.parent.fireEvent("error",{detail:t})}emitReady(t){this.parent.fireEvent("ready",{detail:t})}emitAfter(t){this.parent.fadePromise=vt(this.parent.duration);this.parent.fireEvent("after",{detail:bt(bt({},t),{},{transitionUntil:t=>{this.parent.fadePromise=Promise.all([this.parent.fadePromise,t])}})})}emitProgress(t){this.parent.fireEvent("progress",{detail:t})}emitLoad(t){this.parent.fireEvent("load",{detail:t})}}function Ot(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function jt(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?Ot(Object(r),!0).forEach((function(e){mt(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):Ot(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function mt(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}window.HashChangeEvent=window.HashChangeEvent||function(t){var{oldURL:e="",newURL:r=""}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=new CustomEvent(t);return n.oldURL=e,n.newURL=r,n};class wt{constructor(t){this.updateHistoryScrollPosition=()=>{if(!D(this.parent)){var t=this.assignScrollPosition(history.state||{});history.replaceState(t,document.title)}},this.parent=t}updateHistoryState(t){var{cause:e,replace:r,url:n,oldURL:i}=t;if(!D(this.parent))switch(e){case k.Init:case k.Push:var{histId:o}=this.parent;if(r||n.href===location.href){var c=jt(jt({},history.state),{},{[o]:{}});history.replaceState(c,document.title,n.href)}else history.pushState({[o]:{}},document.title,n.href);case k.Pop:this.parent.simulateHashChange&&function(t,e){t.hash!==e.hash&&window.dispatchEvent(new HashChangeEvent("hashchange",{newURL:t.href,oldURL:e.href}))}(n,i)}}updateTitle(t){var{cause:e,title:r}=t;document.title=r,D(this.parent)||e!==k.Push||history.replaceState(history.state,r)}assignScrollPosition(t){var{histId:e}=this.parent;return jt(jt({},t),{},{[e]:jt(jt({},t[e]),{},{scrollTop:Object(U.j)(),scrollHeight:Object(U.i)()})})}}class gt{constructor(t){this.parent=t,"scrollRestoration"in history&&(history.scrollRestoration="manual")}manageScrollPosition(t){var{cause:e,url:{hash:r}}=t;switch(e){case k.Push:this.scrollHashIntoView(r,{behavior:"smooth",block:"start",inline:"nearest"});break;case k.Pop:this.restoreScrollPosition();break;case k.Init:this.restoreScrollPositionOnReload()}}elementFromHash(t){return document.getElementById(decodeURIComponent(t.substr(1)))}scrollHashIntoView(t,e){if(t){var r=this.elementFromHash(t);r&&r.scrollIntoView(e)}else window.scroll(window.pageXOffset,0)}restoreScrollPosition(){var{histId:t}=this.parent,{scrollTop:e}=history.state&&history.state[t]||{};null!=e&&window.scroll(window.pageXOffset,e)}restoreScrollPositionOnReload(){var{histId:t}=this.parent;history.state&&history.state[t]&&0===Object(U.j)()?this.restoreScrollPosition():location.hash&&requestAnimationFrame(()=>this.scrollHashIntoView(location.hash,!0))}}var St=function(t,e,r,n){var i,o=arguments.length,c=o<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,r,n);else for(var s=t.length-1;s>=0;s--)(i=t[s])&&(c=(o<3?i(c):o>3?i(e,r,c):i(e,r))||c);return o>3&&c&&Object.defineProperty(e,r,c),c},Et=class extends(Object(U.b)(U.a,[pt])){constructor(){super(...arguments),this.el=this,this.linkSelector="a[href]:not([data-no-push])",this.prefetch=!1,this.duration=0,this.simulateHashChange=!1,this.baseURL=window.location.href,this._initialized=Object(U.f)(),this.$={},this.fadePromise=Promise.resolve(null),this.scrollManager=new gt(this),this.historyManager=new wt(this),this.fetchManager=new Y(this),this.updateManager=new st(this),this.eventManager=new yt(this),this._url=new URL(this.baseURL),this.reload$=new o.a,this.cacheNr=0,this.upgrade=()=>{var{pushEvent$:t,hintEvent$:e}=this.setupEventListeners(),r={},n=t.pipe(Object(d.a)(t=>{var[e,r]=t;return{cause:k.Push,url:new URL(r.href,this.href),anchor:r,event:e,cacheNr:this.cacheNr}}),Object(v.a)(t=>function(t,e){var{url:r,anchor:n,event:{metaKey:i,ctrlKey:o}}=t;return!i&&!o&&I(n)&&!D(r,e)}(t,this)),Object(y.a)(t=>{var{event:e}=t;e.preventDefault(),this.historyManager.updateHistoryScrollPosition()})),i=Object(c.a)(window,"popstate").pipe(Object(v.a)(()=>window.history.state&&window.history.state[this.histId]),Object(d.a)(t=>({cause:k.Pop,url:new URL(window.location.href),cacheNr:this.cacheNr,event:t}))),o=this.reload$,a=Object(s.a)(n,i,o).pipe(Object(O.a)({url:new URL(window.location.href)}),Object(j.a)(),Object(d.a)(t=>{var[e,r]=t;return Object.assign(r,{oldURL:e.url})}),Object(m.a)()),u=a.pipe(Object(v.a)(t=>!F(t)),Object(m.a)()),l=a.pipe(Object(v.a)(t=>F(t)),Object(v.a)(()=>history.state&&history.state[this.histId]),N(p),Object(y.a)(t=>{this.historyManager.updateHistoryState(t),this.scrollManager.manageScrollPosition(t)})),h=Object(f.a)(()=>Object(s.a)(u.pipe(Object(L.a)(!0)),r.response$.pipe(Object(L.a)(!1)))).pipe(Object(O.a)(!1)),b=e.pipe(Object(U.h)(h.pipe(Object(d.a)(t=>!t))),Object(d.a)(t=>{var[e,r]=t;return{cause:k.Hint,url:new URL(r.href,this.href),anchor:r,event:e,cacheNr:this.cacheNr}}),Object(v.a)(t=>$(t,this))),w=Object(s.a)(b,u).pipe(Object(A.a)((t,e)=>this.compareContext(t,e)),Object(R.a)(t=>this.fetchManager.fetchPage(t)),Object(O.a)({url:{}}),Object(m.a)()),g=r.response$=u.pipe(Object(y.a)(t=>{this.eventManager.onStart(t),this.historyManager.updateHistoryState(t),this._url=t.url}),Object(q.a)(w),Object(R.a)(t=>this.fetchManager.getResponse(w,...t)),Object(m.a)()),S=g.pipe(Object(v.a)(t=>{var{error:e}=t;return!e})),E=g.pipe(Object(v.a)(t=>{var{error:e}=t;return!!e})),P=S.pipe(Object(d.a)(t=>this.updateManager.responseToContent(t)),Object(y.a)(t=>this.eventManager.emitReady(t)),N(p),Object(y.a)(t=>{this.updateManager.updateDOM(t),this.historyManager.updateTitle(t),this.eventManager.emitAfter(t)}),Object(O.a)({cause:k.Init,url:this._url,scripts:[]}),N(p),Object(y.a)(t=>this.scrollManager.manageScrollPosition(t)),Object(y.a)({error:t=>this.eventManager.emitDOMError(t)}),Object(T.a)((t,e)=>e),Object(R.a)(t=>this.fadePromise.then(()=>t)),Object(R.a)(t=>this.updateManager.reinsertScriptTags(t)),Object(y.a)({error:t=>this.eventManager.emitError(t)}),Object(T.a)((t,e)=>e),Object(y.a)(t=>this.eventManager.emitLoad(t))),_=E.pipe(Object(y.a)(t=>this.eventManager.emitNetworkError(t))),C=u.pipe(Object(R.a)(t=>Object(f.a)(()=>this.animPromise).pipe(Object(H.a)(g),Object(L.a)(t))),Object(y.a)(t=>this.eventManager.emitProgress(t)));P.subscribe(),l.subscribe(),_.subscribe(),C.subscribe(),this._initialized.resolve(this),this.fireEvent("init")}}createRenderRoot(){return this}get initialized(){return this._initialized}_setLocation(t,e){var r=new URL(this._url.href);r[t]=e,this.assign(r.href)}get hash(){return this._url.hash}get host(){return this._url.host}get hostname(){return this._url.hostname}get href(){return this._url.href}get pathname(){return this._url.pathname}get port(){return this._url.port}get protocol(){return this._url.protocol}get search(){return this._url.search}get origin(){return this._url.origin}get ancestorOrigins(){return window.location.ancestorOrigins}set hash(t){this._setLocation("hash",t)}set host(t){this._setLocation("host",t)}set hostname(t){this._setLocation("hostname",t)}set href(t){this._setLocation("href",t)}set pathname(t){this._setLocation("pathname",t)}set port(t){this._setLocation("port",t)}set protocol(t){this._setLocation("protocol",t)}set search(t){this._setLocation("search",t)}set origin(t){}set ancestorOrigins(t){}get histId(){return this.id||this.tagName}assign(t){this.reload$.next({cause:k.Push,url:new URL(t,this.href),cacheNr:++this.cacheNr})}reload(){this.reload$.next({cause:k.Push,url:new URL(this.href),cacheNr:++this.cacheNr,replace:!0})}replace(t){this.reload$.next({cause:k.Push,url:new URL(t,this.href),cacheNr:++this.cacheNr,replace:!0})}compareContext(t,e){return t.url.href===e.url.href&&t.error===e.error&&t.cacheNr===e.cacheNr}connectedCallback(){super.connectedCallback(),this.$.linkSelector=new b.a(this.linkSelector),this.$.prefetch=new b.a(this.prefetch),window.addEventListener("beforeunload",this.historyManager.updateHistoryScrollPosition),this.updateComplete.then(this.upgrade)}disconnectedCallback(){window.removeEventListener("beforeunload",this.historyManager.updateHistoryScrollPosition)}};
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
 */St([Object(i.e)({type:String,reflect:!0,attribute:"replace-selector"})],Et.prototype,"replaceSelector",void 0),St([Object(i.e)({type:String,reflect:!0,attribute:"link-selector"})],Et.prototype,"linkSelector",void 0),St([Object(i.e)({type:String,reflect:!0,attribute:"script-selector"})],Et.prototype,"scriptSelector",void 0),St([Object(i.e)({type:Boolean,reflect:!0,attribute:"prefetch"})],Et.prototype,"prefetch",void 0),St([Object(i.e)({type:Number,reflect:!0,attribute:"duration"})],Et.prototype,"duration",void 0),St([Object(i.e)({type:Boolean,reflect:!0,attribute:"hashchange"})],Et.prototype,"simulateHashChange",void 0),St([Object(i.e)({type:String})],Et.prototype,"baseURL",void 0),St([Object(i.e)()],Et.prototype,"assign",null),St([Object(i.e)()],Et.prototype,"reload",null),St([Object(i.e)()],Et.prototype,"replace",null),Et=St([Object(i.c)("hy-push-state")],Et)},213:function(t,e,r){"use strict";r.d(e,"a",(function(){return u}));var n=r(0),i=r(2),o=r(72),c=Object(o.a)((function(t){return function(){t(this),this.message="argument out of range"}})),s=r(179),a=r(5);function u(t){if(isNaN(t))throw new TypeError("'count' is not a number");if(t<0)throw new c;return function(e){return 0===t?s.a:Object(a.a)(e,new l(t))}}var l=function(){function t(t){this.count=t}return t.prototype.call=function(t,e){return e.subscribe(new h(t,this.count))},t}(),h=function(t){function e(e,r){var n=t.call(this,e)||this;return n.count=r,n._valueCount=0,n}return Object(n.c)(e,t),e.prototype._next=function(t){var e=this.count,r=++this._valueCount;r<=e&&(this.destination.next(t),r===e&&(this.destination.complete(),this.unsubscribe()))},e}(i.a)},214:function(t,e,r){"use strict";r.d(e,"a",(function(){return a}));var n=r(0),i=r(2),o=r(5),c=r(4),s=r(41);function a(t){return function(e){return Object(o.a)(e,(function(e){var r,n=this,i=new c.a,o=null,l=!1;return o=e.subscribe(new u(n,(function(c){!function(i){try{r=Object(s.a)(t(i,a(t)(e)))}catch(i){return void n.error(i)}}(c),r&&(o?(o.unsubscribe(),o=null,i.add(r.subscribe(n))):l=!0)}))),l?(o.unsubscribe(),o=null,i.add(r.subscribe(n))):i.add(o),i}))}}var u=function(t){function e(e,r){var n=t.call(this,e)||this;return n.onError=r,n}return Object(n.c)(e,t),e.prototype._error=function(t){this.onError(t),this.unsubscribe()},e}(i.a)},215:function(t,e,r){"use strict";r.d(e,"a",(function(){return c}));var n=r(1),i=r(4),o=r(41);function c(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];var r=void 0;return"function"==typeof t[t.length-1]&&(r=t.pop()),new n.a((function(e){for(var n=t.map((function(){return[]})),c=t.map((function(){return!1})),s=new i.a,a=function(i){var a=Object(o.a)(t[i]);s.add(a.subscribe({next:function(t){n[i].push(t),function(){if(n.every((function(t){return t.length>0}))){var t=n.map((function(t){return t.shift()}));if(r)try{t=r.apply(void 0,t)}catch(t){return void e.error(t)}e.next(t),n.some((function(t,e){return 0===t.length&&c[e]}))&&e.complete()}}()},error:function(t){return e.error(t)},complete:function(){c[i]=!0,0===n[i].length&&e.complete()}}))},u=0;!e.closed&&u<t.length;u++)a(u);return s}))}},216:function(t,e,r){"use strict";r.d(e,"a",(function(){return a}));var n=r(0),i=r(19),o=r(41),c=r(5),s=r(12);function a(t,e){return e?function(r){return r.pipe(a((function(r,n){return Object(o.a)(t(r,n)).pipe(Object(i.a)((function(t,i){return e(r,t,n,i)})))})))}:function(e){return Object(c.a)(e,new u(t))}}var u=function(){function t(t){this.project=t}return t.prototype.call=function(t,e){return e.subscribe(new l(t,this.project))},t}(),l=function(t){function e(e,r){var n=t.call(this,e)||this;return n.destination=e,n.project=r,n.hasCompleted=!1,n.index=0,n}return Object(n.c)(e,t),e.prototype._next=function(t){if(!this.innerSubscription){var e=void 0,r=this.index++;try{e=this.project(t,r)}catch(t){return void this.destination.error(t)}var n=new s.c(this);this.destination.add(n),this.innerSubscription=n,Object(s.e)(e,n)}},e.prototype._complete=function(){this.hasCompleted=!0,this.innerSubscription||this.destination.complete(),this.unsubscribe()},e.prototype.notifyNext=function(t){this.destination.next(t)},e.prototype.notifyError=function(t){this.destination.error(t)},e.prototype.notifyComplete=function(){this.innerSubscription=void 0,this.hasCompleted&&this.destination.complete()},e}(s.d)},221:function(t,e,r){"use strict";r.d(e,"a",(function(){return c}));var n=r(1),i=r(78),o=r(71);function c(t,e,r){void 0===t&&(t=0);var c=-1;return null!=e&&(Object(o.a)(e)?r=e:c=e),Object(o.a)(r)||(r=i.a),new n.a((function(e){var n,i=Math.max(0,(n=t)instanceof Date&&!isNaN(n)?+t-r.now():t);return r.schedule(s,i,{counter:0,period:c,subscriber:e})}))}function s(t){var e=t.period,r=t.subscriber,n=t.counter++;if(r.next(n),!r.closed){if(e<0)return r.complete();this.schedule(t,e)}}}}]);