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
 * Powered by Hydejack v9.0.0-beta.4 <https://hydejack.com/>
 */
(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{305:function(e,t,r){"use strict";r.r(t);var n=r(314),o=r(315),a=r(353),i=r(360),c=r(318),l=r(77),u=r(319),s=r(312),p=r(324),f=r(354),d=r(355),b=r(308),y=r(327),m=r(317),h=r(155),v=r(20),j=r(329),O=r.n(j),g=r(335),w=r.n(g),S=r(75),E=r(313),C=r(352),A=r(321);function k(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var r=[],n=!0,o=!1,a=void 0;try{for(var i,c=e[Symbol.iterator]();!(n=(i=c.next()).done)&&(r.push(i.value),!t||r.length!==t);n=!0);}catch(e){o=!0,a=e}finally{try{n||null==c.return||c.return()}finally{if(o)throw a}}return r}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return x(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return x(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function x(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function I(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function P(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function q(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var L=function(e){var t=e.background,r=e.color,n=e.image,o=e.overlay;return"".concat(r).concat(n||t).concat(""===o?"overlay":"")};var T=new WeakMap,B=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e);var r=document.getElementById("_main"),n=Array.from(document.styleSheets).find((function(e){return e.ownerNode&&"_pageStyle"===e.ownerNode.id}))||{};this.sidebar=document.getElementById("_sidebar"),this.fadeDuration=t,this.rules=n.cssRules||n.rules,this.prevHash=L(w()(r)),this.themeColorEl=document.querySelector('meta[name="theme-color"]')}var t,r,n;return t=e,(r=[{key:"fetchImage2",value:function(e){var t=e.background,r=e.image;if(t||!r||""===r||"none"===r)return Object(S.a)(null);var n=new URL(r,window.location.origin);return Object(v.f)(n.href,function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?I(Object(r),!0).forEach((function(t){P(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):I(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({method:"GET",headers:{Accept:"image/*"}},function(e){var t=e.protocol,r=e.host,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:window.location;return t!==n.protocol||r!==n.host}(n)?{mode:"cors"}:{})).pipe(Object(b.a)((function(e){return e.blob()})),Object(l.a)((function(e){return URL.createObjectURL(e)})),Object(C.a)((function(){return Object(S.a)(r)})))}},{key:"fetchImage",value:function(e){var t=w()(e),r=t.background,n=t.color,o=t.image,a=t.overlay,i=L(t);return i===this.prevHash?Object(E.b)():this.fetchImage2(t).pipe(Object(l.a)((function(e){var c=document.createElement("div");return c.classList.add("sidebar-bg"),"none"!==o&&""===a&&c.classList.add("sidebar-overlay"),r?c.style.background=r:(c.style.backgroundColor=n,e&&(c.style.backgroundImage="url(".concat(e,")"),T.set(c,e))),[c,t,i]})))}},{key:"updateStyle",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=t.color,n=void 0===r?"#4fb1ba":r,o=t.themeColor,a=void 0===o?"#193747":o;if(this.themeColorEl&&window.setTimeout((function(){return e.themeColorEl.content=a}),250),this.rules)try{var i=O()(n),c=O()(a),l=i.darken(.1),u=O.a.hsl(c.hue(),10,20),s=O.a.hsl(c.hue(),10,25),p=i.fade(.5);this.rules[0].style.textDecorationColor=p,this.rules[0].style.borderColor=p,this.rules[1].style.textDecorationColor=n,this.rules[1].style.borderColor=n,this.rules[2].style.outlineColor=n,this.rules[3].style.backgroundColor=n,this.rules[3].style.borderColor=n,this.rules[4].style.boxShadow="0 0 0 3px ".concat(i.fade(.5)),this.rules[5].style.backgroundColor=l,this.rules[5].style.borderColor=l,this.rules[6].style.backgroundColor=n,this.rules[6].style.borderColor=n,this.rules[7].style.backgroundColor=l,this.rules[7].style.borderColor=l,this.rules[8].cssRules[0].style.setProperty("--body-bg",u),this.rules[8].cssRules[0].style.setProperty("--border-color",s),this.rules[9].cssRules[0].style.setProperty("--body-bg",u),this.rules[9].cssRules[0].style.setProperty("--border-color",s),this.rules[this.rules.length-1].style.backgroundColor=n}catch(e){}}},{key:"fade",value:function(e,t){var r=k(e,1)[0],n=k(t,3),o=n[0],a=n[1],i=n[2];return r.parentNode.insertBefore(o,r.nextElementSibling),this.updateStyle(a),this.prevHash=i,Object(v.c)(o,[{opacity:0},{opacity:1}],{duration:this.fadeDuration,easing:"ease"}).pipe(Object(A.a)((function(){T.has(r)&&URL.revokeObjectURL(T.get(r)),r.parentNode.removeChild(r)})))}}])&&q(t.prototype,r),n&&q(t,n),e}(),R=r(311);function _(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var r=[],n=!0,o=!1,a=void 0;try{for(var i,c=e[Symbol.iterator]();!(n=(i=c.next()).done)&&(r.push(i.value),!t||r.length!==t);n=!0);}catch(e){o=!0,a=e}finally{try{n||null==c.return||c.return()}finally{if(o)throw a}}return r}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return N(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return N(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function N(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function D(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var r=[],n=!0,o=!1,a=void 0;try{for(var i,c=e[Symbol.iterator]();!(n=(i=c.next()).done)&&(r.push(i.value),!t||r.length!==t);n=!0);}catch(e){o=!0,a=e}finally{try{n||null==c.return||c.return()}finally{if(o)throw a}}return r}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return M(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return M(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function M(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var U,H=["title","projects"];function J(e,t,r,i){var c=e.pipe(Object(R.a)((function(e){var t=e.flipType;return!H.includes(t)})));return Object(o.a)(function(e,t,r,n){var o=n.animationMain,i=n.settings;if(!o)return e;var c=e.pipe(Object(R.a)((function(e){return"title"===e.flipType})),Object(b.a)((function(e){var t=e.anchor;if(!t)return Object(S.a)({});var r=document.createElement("h1");r.classList.add("page-title"),r.textContent=t.textContent,r.style.transformOrigin="left top";var n=o.querySelector(".page");if(!n)return Object(S.a)({});v.e.call(n),n.appendChild(r),o.style.position="fixed",o.style.opacity=1;var a=t.getBoundingClientRect(),c=r.getBoundingClientRect(),l=parseInt(getComputedStyle(t).fontSize,10),u=parseInt(getComputedStyle(r).fontSize,10),p=a.left-c.left,f=a.top-c.top,d=l/u;t.style.opacity=0;var b=[{transform:"translate3d(".concat(p,"px, ").concat(f,"px, 0) scale(").concat(d,")")},{transform:"translate3d(0, 0, 0) scale(1)"}];return Object(v.c)(r,b,i).pipe(Object(s.a)({complete:function(){o.style.position="absolute"}}))})));return e.pipe(Object(b.a)((function(e){var n=e.flipType;return Object(a.a)(t.pipe(Object(R.a)((function(){return"title"===n})),Object(l.a)((function(e){var t=_(e.replaceEls,1)[0].querySelector(".page-title, .post-title");return t&&(t.style.opacity=0),t}))),r,(function(e){return e})).pipe(Object(s.a)((function(e){e&&(e.style.opacity=1),o.style.opacity=0})),Object(A.a)((function(){o.style.opacity=0})))}))).subscribe(),c}(e,t,r,i),function(e,t,r,o){var i=o.animationMain,c=o.settings;if(!i)return e;var l=e.pipe(Object(R.a)((function(e){return"project"===e.flipType})),Object(b.a)((function(e){var t=e.anchor,r=t.querySelector(".flip-project-img");if(!t||!r)return Object(S.a)({});var n=i.querySelector(".page");if(!n)return Object(S.a)({});var o=t.parentNode.querySelector(".flip-project-title"),a=o&&o.textContent||"|",l=document.createElement("h1");null==l||l.classList.add("page-title"),l&&(l.style.opacity="0"),l&&(l.textContent=a);var u=document.createElement("div");null==u||u.classList.add("post-date"),null==u||u.classList.add("heading"),u&&(u.style.opacity="0"),u&&(u.textContent="|"),v.e.call(n),n.appendChild(l),n.appendChild(u);var p=document.createElement("div");p.setAttribute("class",r.classList),p.classList.remove("project-card-img"),r.parentNode.insertBefore(p,r),r.classList.add("lead"),r.style.transformOrigin="left top",n.appendChild(r),i.style.position="fixed",i.style.opacity="1";var f=p.getBoundingClientRect(),d=r.getBoundingClientRect(),b=f.left-d.left,y=f.top-d.top,m=f.width/d.width,h=[{transform:"translate3d(".concat(b,"px, ").concat(y,"px, 0) scale(").concat(m,")")},{transform:"translate3d(0, 0, 0) scale(1)"}];return Object(v.c)(r,h,c).pipe(Object(s.a)({complete:function(){i.style.position="absolute"}}))})));return e.pipe(Object(b.a)((function(e){var o=e.flipType;return t.pipe(Object(R.a)((function(){return"project"===o})),Object(b.a)((function(e){var t=D(e.replaceEls,1)[0].querySelector(".aspect-ratio");t&&(t.style.opacity=0);var o=t&&t.querySelector("img");return Object(a.a)(o?Object(n.a)(o,"load"):Object(S.a)({}),r).pipe(Object(s.a)((function(){return t&&(t.style.opacity=1),i.style.opacity=0})),Object(b.a)((function(){return null!=o?Object(v.c)(i,[{opacity:1},{opacity:0}],{duration:500}):Object(S.a)({})})),Object(A.a)((function(){return i.style.opacity=0})))})))}))).subscribe(),l}(e,t,r,i),c)}function $(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var r=[],n=!0,o=!1,a=void 0;try{for(var i,c=e[Symbol.iterator]();!(n=(i=c.next()).done)&&(r.push(i.value),!t||r.length!==t);n=!0);}catch(e){o=!0,a=e}finally{try{n||null==c.return||c.return()}finally{if(o)throw a}}return r}(e,t)||W(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function z(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function F(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?z(Object(r),!0).forEach((function(t){Y(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):z(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function Y(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function G(e){return function(e){if(Array.isArray(e))return K(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||W(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function W(e,t){if(e){if("string"==typeof e)return K(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?K(e,t):void 0}}function K(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function Q(e,t,r,n,o,a,i){try{var c=e[a](i),l=c.value}catch(e){return void r(e)}c.done?t(l):Promise.resolve(l).then(n,o)}(U=regeneratorRuntime.mark((function e(){var t,j,O,g,w,S,E,C,A,k,x,I,P,q,L,T,R,_,N,D,M,U,H,z,Y,W,K,Q,V,X,Z,ee,te,re,ne,oe,ae,ie,ce,le,ue,se,pe,fe;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return H=function(e){var t=$(e.replaceEls,1)[0],r=e.flipType;return Object(v.c)(t,P,q).pipe(Object(c.a)({main:t,flipType:r}))},U=function(e){var t=e.main;return Object(v.c)(t,I,F(F({},q),{},{fill:"forwards"})).pipe(Object(c.a)({main:t}))},M=function(e){var t;return(null==e?void 0:e.classList.contains("flip-title"))?"title":(null==e?void 0:e.classList.contains("flip-project"))?"project":null==e||null===(t=e.getAttribute)||void 0===t?void 0:t.call(e,"data-flip")},D=function(){var e,t=Object(v.l)("_back-template"),r=null==t?void 0:t.children[0];return null==t||null===(e=t.querySelector(".nav-btn"))||void 0===e||e.addEventListener("click",(function(){return window.history.back()})),r},N=function(e,t){var r=t.pathname,n=Object(v.l)("_error-template"),o=null==n?void 0:n.querySelector(".this-link");return o&&(o.href=r,o.textContent=r),null==e||e.appendChild(n),null==e?void 0:e.lastElementChild},_=function(e){return null==e||e.appendChild(Object(v.l)("_loading-template")),null==e?void 0:e.lastElementChild},R=function(e){var t;return null==e||null===(t=e.parentNode)||void 0===t||t.insertBefore(Object(v.l)("_animation-template"),e),null==e?void 0:e.previousElementSibling},T=function(e){var t=Object(v.l)("_permalink-template"),r=t.querySelector(".permalink");requestAnimationFrame((function(){return r.href="#".concat(e.id),e.appendChild(t)}))},e.next=10,Promise.all([].concat(G("fetch"in window?[]:[Promise.all([r.e(10),r.e(1)]).then(r.bind(null,356))]),G("customElements"in window?[]:[Promise.all([r.e(15),r.e(16)]).then(r.bind(null,336))]),G("animate"in Element.prototype?[]:[r.e(14).then(r.t.bind(null,357,7))]),G("IntersectionObserver"in window?[]:[r.e(11).then(r.t.bind(null,358,7))])));case 10:return e.next=12,v.t;case 12:if(t="#_navbar > .content > .nav-btn-bar",j="link[rel=canonical]",O="meta[name=description]",g="li[id^='fn:']",w="a[href^='#fn:']",S='pre, table:not(.highlight), .katex-display, .break-layout, mjx-container[jax="CHTML"][display="true"]',E="pre.highlight > code",C=/(?:title|file):\s*['"`](.*)['"`]/i,A="(display-mode: standalone)",x=2e3,I=[{opacity:1},{opacity:0}],P=[{opacity:0,transform:"translateY(-3rem)"},{opacity:1,transform:"translateY(0)"}],q={duration:k=350,easing:"ease-out"},L="h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]",z=document.querySelector("hy-push-state")){e.next=30;break}return e.abrupt("return");case 30:Y=document.querySelector("hy-drawer"),W=document.querySelector(t),K=document.querySelector(j),Q=document.querySelector(O),V=R(z),X=_(W),Z=D(),W&&Z&&(ee=window.matchMedia(A),te=!!navigator.standalone||ee.matches,Object(v.g)(ee).pipe(Object(l.a)((function(e){return e.matches})),Object(u.a)(te)).pipe(Object(s.a)((function(e){e?W.prepend(Z):Z.parentNode===W&&W.removeChild(Z)}))).subscribe()),ne=(re=function(e,t){return Object(n.a)(z,e).pipe(Object(l.a)((function(e){return e.detail})),t?Object(l.a)(t):function(e){return e},Object(p.a)())})("hy-push-state-start",(function(e){return Object.assign(e,{flipType:M(e.anchor)})})),oe=re("hy-push-state-ready"),ae=re("hy-push-state-after"),ie=re("hy-push-state-progress"),ce=re("hy-push-state-networkerror"),le=ne.pipe(Object(l.a)((function(e){return Object.assign(e,{main:document.getElementById("_main")})})),Object(s.a)((function(e){e.main.style.pointerEvents="none"})),window._noDrawer&&(null==Y?void 0:Y.classList.contains("cover"))?Object(s.a)((function(){var e;Y.classList.remove("cover"),null===(e=Y.parentNode)||void 0===e||e.appendChild(Y)})):function(e){return e},Object(f.a)(U),Object(s.a)((function(e){var t=e.main;return v.e.call(t)})),Object(p.a)()),ie.subscribe((function(){X&&(X.style.display="flex")})),oe.pipe(Object(u.a)({replaceEls:[document.getElementById("_main")]})).subscribe((function(e){var t=$(e.replaceEls,1)[0];t.querySelectorAll(L).forEach(T),X&&(X.style.display="none");var r=t.querySelector("#markdown-toc");r&&r.classList.add("toc-hide"),Array.from(t.querySelectorAll(E)).map((function(e){return e.children[0]})).filter((function(e){return C.test(null==e?void 0:e.innerText)})).forEach((function(e){var t=$(C.exec(e.innerText),2)[1],r=e.parentNode;r.removeChild(e),r.childNodes[0].splitText(1),r.removeChild(r.childNodes[0]),e.innerText=t,e.classList.add("pre-header");var n=r.parentNode.parentNode;n.insertBefore(e,n.firstChild)})),"complete"in HTMLImageElement.prototype&&t.querySelectorAll("img[width][height][loading=lazy]").forEach((function(e){e.complete||(e.style.opacity="0",e.addEventListener("load",(function(){e.style.opacity=""}),{once:!0}))}))})),ae.pipe(Object(u.a)({replaceEls:[document.getElementById("_main")],documentFragment:document}),Object(s.a)((function(e){var t=$(e.replaceEls,1)[0],r=e.documentFragment,n=r.querySelector(j);K&&n&&(K.href=n.href);var o=r.querySelector(O);Q&&o&&(Q.content=o.content),t.querySelectorAll(g).forEach((function(e){return e.tabIndex=0})),t.querySelectorAll(w).forEach((function(e){return e.addEventListener("click",(function(e){var t;return null===(t=document.getElementById(e.currentTarget.getAttribute("href").substr(1)))||void 0===t?void 0:t.focus()}))})),t.querySelectorAll(S).forEach((function(e){return e.addEventListener("touchstart",(function(t){return e.scrollLeft>0&&t.stopPropagation()}),{passive:!1})}))})),"MathJax"in window?Object(d.a)((function(){return MathJax.typesetPromise()})):function(e){return e}).subscribe(),ue=ae.pipe(Object(b.a)(H),Object(p.a)()),se=J(ne,oe,Object(o.a)(ue,ce),{animationMain:V,settings:q}).pipe(Object(p.a)()),ne.pipe(Object(b.a)((function(e){var t=Object(a.a)(Object(i.a)(k),le,se).toPromise();return e.transitionUntil(t),t}))).subscribe(),le.subscribe(),se.subscribe(),(pe=document.querySelector(".sidebar-bg"))&&(fe=new B(x),ae.pipe(Object(b.a)((function(e){var t=$(e.replaceEls,1)[0];return Object(a.a)(fe.fetchImage(t),ue).pipe(Object(l.a)((function(e){return $(e,1)[0]})),Object(y.a)(ne))})),Object(u.a)([pe]),Object(m.a)(),Object(h.a)((function(e){var t=$(e,2),r=t[0],n=t[1];return fe.fade(r,n)}))).subscribe()),ue.pipe(Object(u.a)({main:document.getElementById("_main")}),Object(s.a)((function(e){var t=e.main,r=null==t?void 0:t.querySelector("#markdown-toc");r&&(r.classList.remove("toc-hide"),r.classList.add("toc-show"))}))).subscribe(),ce.pipe(Object(b.a)((function(e){var t=e.url;X&&(X.style.display="none");var r=document.getElementById("_main");return r&&(r.style.pointerEvents=""),v.e.call(null==V?void 0:V.querySelector(".page")),v.e.call(r),N(r,t),Object(v.c)(r,P,F(F({},q),{},{fill:"forwards"}))}))).subscribe(),Promise.resolve().then(r.bind(null,348)),window._pushState=z;case 59:case"end":return e.stop()}}),e)})),function(){var e=this,t=arguments;return new Promise((function(r,n){var o=U.apply(e,t);function a(e){Q(o,r,n,a,i,"next",e)}function i(e){Q(o,r,n,a,i,"throw",e)}a(void 0)}))})()}}]);