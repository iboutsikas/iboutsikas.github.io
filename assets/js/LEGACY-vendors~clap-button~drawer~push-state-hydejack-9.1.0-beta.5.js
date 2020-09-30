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
 * Powered by Hydejack v9.1.0-beta.5 <https://hydejack.com/>
 */
(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{314:function(e,t,r){"use strict";r.d(t,"c",(function(){return q})),r.d(t,"e",(function(){return z})),r.d(t,"f",(function(){return M})),r.d(t,"d",(function(){return f.f})),r.d(t,"g",(function(){return f.j})),r.d(t,"b",(function(){return H})),r.d(t,"a",(function(){return te}));var n=r(313),o=r(312);function i(e,t){for(var r=e.element.content,n=e.parts,o=document.createTreeWalker(r,133,null,!1),i=u(n),a=n[i],s=-1,c=0,l=[],f=null;o.nextNode();){s++;var p=o.currentNode;for(p.previousSibling===f&&(f=null),t.has(p)&&(l.push(p),null===f&&(f=p)),null!==f&&c++;void 0!==a&&a.index===s;)a.index=null!==f?-1:a.index-c,a=n[i=u(n,i)]}l.forEach((function(e){return e.parentNode.removeChild(e)}))}var a=function(e){for(var t=11===e.nodeType?0:1,r=document.createTreeWalker(e,133,null,!1);r.nextNode();)t++;return t},u=function(e){for(var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:-1,r=t+1;r<e.length;r++){var n=e[r];if(Object(o.d)(n))return r}return-1};var s=r(322),c=r(318),l=r(321),f=r(310);function p(e){return(p="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */var d=function(e,t){return"".concat(e,"--").concat(t)},h=!0;void 0===window.ShadyCSS?h=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),h=!1);var y=function(e){return function(t){var r=d(t.type,e),n=c.a.get(r);void 0===n&&(n={stringsArray:new WeakMap,keyString:new Map},c.a.set(r,n));var i=n.stringsArray.get(t.strings);if(void 0!==i)return i;var a=t.strings.join(o.f);if(void 0===(i=n.keyString.get(a))){var u=t.getTemplateElement();h&&window.ShadyCSS.prepareTemplateDom(u,e),i=new o.a(t,u),n.keyString.set(a,i)}return n.stringsArray.set(t.strings,i),i}},v=["html","svg"],b=new Set,m=function(e,t,r){b.add(e);var n=r?r.element:document.createElement("template"),o=t.querySelectorAll("style"),s=o.length;if(0!==s){for(var l=document.createElement("style"),f=0;f<s;f++){var p=o[f];p.parentNode.removeChild(p),l.textContent+=p.textContent}!function(e){v.forEach((function(t){var r=c.a.get(d(t,e));void 0!==r&&r.keyString.forEach((function(e){var t=e.element.content,r=new Set;Array.from(t.querySelectorAll("style")).forEach((function(e){r.add(e)})),i(e,r)}))}))}(e);var h=n.content;r?function(e,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,n=e.element.content,o=e.parts;if(null!=r)for(var i=document.createTreeWalker(n,133,null,!1),s=u(o),c=0,l=-1;i.nextNode();){l++;var f=i.currentNode;for(f===r&&(c=a(t),r.parentNode.insertBefore(t,r));-1!==s&&o[s].index===l;){if(c>0){for(;-1!==s;)o[s].index+=c,s=u(o,s);return}s=u(o,s)}}else n.appendChild(t)}(r,l,h.firstChild):h.insertBefore(l,h.firstChild),window.ShadyCSS.prepareTemplateStyles(n,e);var y=h.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==y)t.insertBefore(y.cloneNode(!0),t.firstChild);else if(r){h.insertBefore(l,h.firstChild);var m=new Set;m.add(l),i(r,m)}}else window.ShadyCSS.prepareTemplateStyles(n,e)};function S(e){return function(e){if(Array.isArray(e))return w(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||_(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function _(e,t){if(e){if("string"==typeof e)return w(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?w(e,t):void 0}}function w(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function g(e){return(g="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function P(e,t,r,n,o,i,a){try{var u=e[i](a),s=u.value}catch(e){return void r(e)}u.done?t(s):Promise.resolve(s).then(n,o)}function k(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function O(e,t){return!t||"object"!==g(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function C(e){var t="function"==typeof Map?new Map:void 0;return(C=function(e){if(null===e||(r=e,-1===Function.toString.call(r).indexOf("[native code]")))return e;var r;if("function"!=typeof e)throw new TypeError("Super expression must either be null or a function");if(void 0!==t){if(t.has(e))return t.get(e);t.set(e,n)}function n(){return j(e,arguments,T(this).constructor)}return n.prototype=Object.create(e.prototype,{constructor:{value:n,enumerable:!1,writable:!0,configurable:!0}}),R(n,e)})(e)}function j(e,t,r){return(j=A()?Reflect.construct:function(e,t,r){var n=[null];n.push.apply(n,t);var o=new(Function.bind.apply(e,n));return r&&R(o,r.prototype),o}).apply(null,arguments)}function A(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}function R(e,t){return(R=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function T(e){return(T=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */window.JSCompiler_renameProperty=function(e,t){return e};var E={toAttribute:function(e,t){switch(t){case Boolean:return e?"":null;case Object:case Array:return null==e?e:JSON.stringify(e)}return e},fromAttribute:function(e,t){switch(t){case Boolean:return null!==e;case Number:return null===e?null:Number(e);case Object:case Array:return JSON.parse(e)}return e}},U=function(e,t){return t!==e&&(t==t||e==e)},x={attribute:!0,type:String,converter:E,reflect:!1,hasChanged:U},N=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&R(e,t)}(c,e);var t,r,n,o,i,a,u,s=(t=c,r=A(),function(){var e,n=T(t);if(r){var o=T(this).constructor;e=Reflect.construct(n,arguments,o)}else e=n.apply(this,arguments);return O(this,e)});function c(){var e;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,c),(e=s.call(this))._updateState=0,e._instanceProperties=void 0,e._updatePromise=new Promise((function(t){return e._enableUpdatingResolver=t})),e._changedProperties=new Map,e._reflectingProperties=void 0,e.initialize(),e}return n=c,o=[{key:"initialize",value:function(){this._saveInstanceProperties(),this._requestUpdate()}},{key:"_saveInstanceProperties",value:function(){var e=this;this.constructor._classProperties.forEach((function(t,r){if(e.hasOwnProperty(r)){var n=e[r];delete e[r],e._instanceProperties||(e._instanceProperties=new Map),e._instanceProperties.set(r,n)}}))}},{key:"_applyInstanceProperties",value:function(){var e=this;this._instanceProperties.forEach((function(t,r){return e[r]=t})),this._instanceProperties=void 0}},{key:"connectedCallback",value:function(){this.enableUpdating()}},{key:"enableUpdating",value:function(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}},{key:"disconnectedCallback",value:function(){}},{key:"attributeChangedCallback",value:function(e,t,r){t!==r&&this._attributeToProperty(e,r)}},{key:"_propertyToAttribute",value:function(e,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:x,n=this.constructor,o=n._attributeNameForProperty(e,r);if(void 0!==o){var i=n._propertyValueToAttribute(t,r);if(void 0===i)return;this._updateState=8|this._updateState,null==i?this.removeAttribute(o):this.setAttribute(o,i),this._updateState=-9&this._updateState}}},{key:"_attributeToProperty",value:function(e,t){if(!(8&this._updateState)){var r=this.constructor,n=r._attributeToPropertyMap.get(e);if(void 0!==n){var o=r.getPropertyOptions(n);this._updateState=16|this._updateState,this[n]=r._propertyValueFromAttribute(t,o),this._updateState=-17&this._updateState}}}},{key:"_requestUpdate",value:function(e,t){var r=!0;if(void 0!==e){var n=this.constructor,o=n.getPropertyOptions(e);n._valueHasChanged(this[e],t,o.hasChanged)?(this._changedProperties.has(e)||this._changedProperties.set(e,t),!0!==o.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(e,o))):r=!1}!this._hasRequestedUpdate&&r&&(this._updatePromise=this._enqueueUpdate())}},{key:"requestUpdate",value:function(e,t){return this._requestUpdate(e,t),this.updateComplete}},{key:"_enqueueUpdate",value:(a=regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this._updateState=4|this._updateState,e.prev=1,e.next=4,this._updatePromise;case 4:e.next=8;break;case 6:e.prev=6,e.t0=e.catch(1);case 8:if(null==(t=this.performUpdate())){e.next=12;break}return e.next=12,t;case 12:return e.abrupt("return",!this._hasRequestedUpdate);case 13:case"end":return e.stop()}}),e,this,[[1,6]])})),u=function(){var e=this,t=arguments;return new Promise((function(r,n){var o=a.apply(e,t);function i(e){P(o,r,n,i,u,"next",e)}function u(e){P(o,r,n,i,u,"throw",e)}i(void 0)}))},function(){return u.apply(this,arguments)})},{key:"performUpdate",value:function(){this._instanceProperties&&this._applyInstanceProperties();var e=!1,t=this._changedProperties;try{(e=this.shouldUpdate(t))?this.update(t):this._markUpdated()}catch(t){throw e=!1,this._markUpdated(),t}e&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(t)),this.updated(t))}},{key:"_markUpdated",value:function(){this._changedProperties=new Map,this._updateState=-5&this._updateState}},{key:"_getUpdateComplete",value:function(){return this._updatePromise}},{key:"shouldUpdate",value:function(e){return!0}},{key:"update",value:function(e){var t=this;void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((function(e,r){return t._propertyToAttribute(r,t[r],e)})),this._reflectingProperties=void 0),this._markUpdated()}},{key:"updated",value:function(e){}},{key:"firstUpdated",value:function(e){}},{key:"_hasRequestedUpdate",get:function(){return 4&this._updateState}},{key:"hasUpdated",get:function(){return 1&this._updateState}},{key:"updateComplete",get:function(){return this._getUpdateComplete()}}],i=[{key:"_ensureClassProperties",value:function(){var e=this;if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;var t=Object.getPrototypeOf(this)._classProperties;void 0!==t&&t.forEach((function(t,r){return e._classProperties.set(r,t)}))}}},{key:"createProperty",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:x;if(this._ensureClassProperties(),this._classProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){var r="symbol"===g(e)?Symbol():"__".concat(e),n=this.getPropertyDescriptor(e,r,t);void 0!==n&&Object.defineProperty(this.prototype,e,n)}}},{key:"getPropertyDescriptor",value:function(e,t,r){return{get:function(){return this[t]},set:function(r){var n=this[e];this[t]=r,this._requestUpdate(e,n)},configurable:!0,enumerable:!0}}},{key:"getPropertyOptions",value:function(e){return this._classProperties&&this._classProperties.get(e)||x}},{key:"finalize",value:function(){var e=Object.getPrototypeOf(this);if(e.hasOwnProperty("finalized")||e.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){var t,r=this.properties,n=function(e,t){var r;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(r=_(e))||t&&e&&"number"==typeof e.length){r&&(e=r);var n=0,o=function(){};return{s:o,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,a=!0,u=!1;return{s:function(){r=e[Symbol.iterator]()},n:function(){var e=r.next();return a=e.done,e},e:function(e){u=!0,i=e},f:function(){try{a||null==r.return||r.return()}finally{if(u)throw i}}}}([].concat(S(Object.getOwnPropertyNames(r)),S("function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(r):[])));try{for(n.s();!(t=n.n()).done;){var o=t.value;this.createProperty(o,r[o])}}catch(e){n.e(e)}finally{n.f()}}}},{key:"_attributeNameForProperty",value:function(e,t){var r=t.attribute;return!1===r?void 0:"string"==typeof r?r:"string"==typeof e?e.toLowerCase():void 0}},{key:"_valueHasChanged",value:function(e,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:U;return r(e,t)}},{key:"_propertyValueFromAttribute",value:function(e,t){var r=t.type,n=t.converter||E,o="function"==typeof n?n:n.fromAttribute;return o?o(e,r):e}},{key:"_propertyValueToAttribute",value:function(e,t){if(void 0!==t.reflect){var r=t.type,n=t.converter;return(n&&n.toAttribute||E.toAttribute)(e,r)}}},{key:"observedAttributes",get:function(){var e=this;this.finalize();var t=[];return this._classProperties.forEach((function(r,n){var o=e._attributeNameForProperty(n,r);void 0!==o&&(e._attributeToPropertyMap.set(o,n),t.push(o))})),t}}],o&&k(n.prototype,o),i&&k(n,i),c}(C(HTMLElement));N.finalized=!0;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
var q=function(e){return function(t){return"function"==typeof t?function(e,t){return window.customElements.define(e,t),t}(e,t):function(e,t){return{kind:t.kind,elements:t.elements,finisher:function(t){window.customElements.define(e,t)}}}(e,t)}};function z(e){return function(t,r){return void 0!==r?function(e,t,r){t.constructor.createProperty(r,e)}(e,t,r):function(e,t){return"method"===t.kind&&t.descriptor&&!("value"in t.descriptor)?Object.assign(Object.assign({},t),{finisher:function(r){r.createProperty(t.key,e)}}):{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer:function(){"function"==typeof t.initializer&&(this[t.key]=t.initializer.call(this))},finisher:function(r){r.createProperty(t.key,e)}}}(e,t)}}function M(e){return function(t,r){var n={get:function(){return this.renderRoot.querySelector(e)},enumerable:!0,configurable:!0};return void 0!==r?D(n,t,r):I(n,t)}}var D=function(e,t,r){Object.defineProperty(t,r,e)},I=function(e,t){return{kind:"method",placement:"prototype",key:t.key,descriptor:e}};function F(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}
/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
var J="adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,V=Symbol(),B=function(){function e(t,r){if(function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),r!==V)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}var t,r,n;return t=e,(r=[{key:"toString",value:function(){return this.cssText}},{key:"styleSheet",get:function(){return void 0===this._styleSheet&&(J?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}}])&&F(t.prototype,r),n&&F(t,n),e}(),W=function(e){if(e instanceof B)return e.cssText;if("number"==typeof e)return e;throw new Error("Value passed to 'css' function must be a 'css' function result: ".concat(e,". Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security."))},H=function(e){for(var t=arguments.length,r=new Array(t>1?t-1:0),n=1;n<t;n++)r[n-1]=arguments[n];var o=r.reduce((function(t,r,n){return t+W(r)+e[n+1]}),e[0]);return new B(o,V)};function L(e){return(L="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function $(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function G(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function K(e,t,r){return(K="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,r){var n=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=Z(e)););return e}(e,t);if(n){var o=Object.getOwnPropertyDescriptor(n,t);return o.get?o.get.call(r):o.value}})(e,t,r||e)}function Q(e,t){return(Q=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function X(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var r,n=Z(e);if(t){var o=Z(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return Y(this,r)}}function Y(e,t){return!t||"object"!==L(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function Z(e){return(Z=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */(window.litElementVersions||(window.litElementVersions=[])).push("2.3.1");var ee={},te=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&Q(e,t)}(i,e);var t,r,n,o=X(i);function i(){return $(this,i),o.apply(this,arguments)}return t=i,n=[{key:"getStyles",value:function(){return this.styles}},{key:"_getUniqueStyles",value:function(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_styles",this))){var e=this.getStyles();if(void 0===e)this._styles=[];else if(Array.isArray(e)){var t=function e(t,r){return t.reduceRight((function(t,r){return Array.isArray(r)?e(r,t):(t.add(r),t)}),r)}(e,new Set),r=[];t.forEach((function(e){return r.unshift(e)})),this._styles=r}else this._styles=[e]}}}],(r=[{key:"initialize",value:function(){K(Z(i.prototype),"initialize",this).call(this),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}},{key:"createRenderRoot",value:function(){return this.attachShadow({mode:"open"})}},{key:"adoptStyles",value:function(){var e=this.constructor._styles;0!==e.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?J?this.renderRoot.adoptedStyleSheets=e.map((function(e){return e.styleSheet})):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map((function(e){return e.cssText})),this.localName))}},{key:"connectedCallback",value:function(){K(Z(i.prototype),"connectedCallback",this).call(this),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}},{key:"update",value:function(e){var t=this,r=this.render();K(Z(i.prototype),"update",this).call(this,e),r!==ee&&this.constructor.render(r,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach((function(e){var r=document.createElement("style");r.textContent=e.cssText,t.renderRoot.appendChild(r)})))}},{key:"render",value:function(){return ee}}])&&G(t.prototype,r),n&&G(t,n),i}(N);te.finalized=!0,te.render=function(e,t,r){if(!r||"object"!==p(r)||!r.scopeName)throw new Error("The `scopeName` option is required.");var o=r.scopeName,i=s.a.has(t),a=h&&11===t.nodeType&&!!t.host,u=a&&!b.has(o),c=u?document.createDocumentFragment():t;if(Object(s.b)(e,c,Object.assign({templateFactory:y(o)},r)),u){var f=s.a.get(c);s.a.delete(c);var d=f.value instanceof l.a?f.value.template:void 0;m(o,c,d),Object(n.b)(t,t.firstChild),t.appendChild(c),s.a.set(t,f)}!i&&a&&window.ShadyCSS.styleElement(t.host)}}}]);