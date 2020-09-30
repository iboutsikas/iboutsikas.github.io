(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors~clap-button"],{

/***/ "./node_modules/kv-storage-polyfill/dist/kv-storage-polyfill.mjs":
/*!***********************************************************************!*\
  !*** ./node_modules/kv-storage-polyfill/dist/kv-storage-polyfill.mjs ***!
  \***********************************************************************/
/*! exports provided: default, StorageArea */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StorageArea", function() { return k; });
const t=function(){function t(){}return t.prototype.then=function(n,r){const o=new t,i=this.s;if(i){const t=1&i?n:r;if(t){try{e(o,1,t(this.v))}catch(t){e(o,2,t)}return o}return this}return this.o=function(t){try{const i=t.v;1&t.s?e(o,1,n?n(i):i):r?e(o,1,r(i)):e(o,2,i)}catch(t){e(o,2,t)}},o},t}();function e(n,r,o){if(!n.s){if(o instanceof t){if(!o.s)return void(o.o=e.bind(null,n,r));1&r&&(r=o.s),o=o.v}if(o&&o.then)return void o.then(e.bind(null,n,r),e.bind(null,n,2));n.s=r,n.v=o;const i=n.o;i&&i(n)}}var n=0,r="function"==typeof WeakMap?WeakMap:function(){var t="function"==typeof Symbol?Symbol(0):"__weak$"+ ++n;this.set=function(e,n){e[t]=n},this.get=function(e){return e[t]}};function o(t,e){return new Promise(function(n,r){t.onsuccess=function(){var r=t.result;e&&(r=e(r)),n(r)},t.onerror=function(){r(t.error)}})}function i(t,e){return o(t.openCursor(e),function(t){return t?[t.key,t.value]:[]})}function u(t){return new Promise(function(e,n){t.oncomplete=function(){e()},t.onabort=function(){n(t.error)},t.onerror=function(){n(t.error)}})}function c(t){if(!function(t){if("number"==typeof t||"string"==typeof t)return!0;if("object"==typeof t&&t){if(Array.isArray(t))return!0;if("setUTCFullYear"in t)return!0;if("function"==typeof ArrayBuffer&&ArrayBuffer.isView(t))return!0;if("byteLength"in t&&"length"in t)return!0}return!1}(t))throw Error("kv-storage: The given value is not allowed as a key")}var f={};function s(t,e){return i(t,a(e))}function a(t){return t===f?IDBKeyRange.lowerBound(-Infinity):IDBKeyRange.lowerBound(t,!0)}var v=new r,h=new r,l=new r,y=new r,d=function(){};function p(n,r){return r(function(r,o){try{function u(){return h.set(n,f),l.set(n,void 0),{value:d,done:void 0===f}}var c=h.get(n);if(void 0===c)return Promise.resolve({value:void 0,done:!0});var f,v,d,p=function(n,r){var o,i=-1;t:{for(var u=0;u<r.length;u++){var c=r[u][0];if(c){var f=c();if(f&&f.then)break t;if(f===n){i=u;break}}else i=u}if(-1!==i){do{for(var s=r[i][1];!s;)s=r[++i][1];var a=s();if(a&&a.then){o=!0;break t}var v=r[i][2];i++}while(v&&!v());return a}}const h=new t,l=e.bind(null,h,2);return(o?a.then(y):f.then(function t(o){for(;;){if(o===n){i=u;break}if(++u===r.length){if(-1!==i)break;return void e(h,1,s)}if(c=r[u][0]){if((o=c())&&o.then)return void o.then(t).then(void 0,l)}else i=u}do{for(var f=r[i][1];!f;)f=r[++i][1];var s=f();if(s&&s.then)return void s.then(y).then(void 0,l);var a=r[i][2];i++}while(a&&!a());e(h,1,s)})).then(void 0,l),h;function y(t){for(;;){var n=r[i][2];if(!n||n())break;for(var o=r[++i][1];!o;)o=r[++i][1];if((t=o())&&t.then)return void t.then(y).then(void 0,l)}e(h,1,t)}}(y.get(n),[[function(){return"keys"},function(){return Promise.resolve(function(t,e){return i(t,a(e)).then(function(t){return t[0]})}(o,c)).then(function(t){d=f=t})}],[function(){return"values"},function(){return Promise.resolve(s(o,c)).then(function(t){var e;f=(e=t)[0],d=v=e[1]})}],[function(){return"entries"},function(){return Promise.resolve(s(o,c)).then(function(t){var e;v=(e=t)[1],d=void 0===(f=e[0])?void 0:[f,v]})}]]);return Promise.resolve(p&&p.then?p.then(u):u())}catch(t){return Promise.reject(t)}})}function m(t,e){var n=new d;return y.set(n,t),v.set(n,e),h.set(n,f),l.set(n,void 0),n}d.prototype.return=function(){h.set(this,void 0)},d.prototype.next=function(){var t=this,e=v.get(this);if(!e)return Promise.reject(new TypeError("Invalid this value"));var n,r=l.get(this);return n=void 0!==r?r.then(function(){return p(t,e)}):p(this,e),l.set(this,n),n},"function"==typeof Symbol&&Symbol.asyncIterator&&(d.prototype[Symbol.asyncIterator]=function(){return this});var b=function(t,e,n){try{return null===w.get(t)&&function(t){var e=g.get(t);w.set(t,new Promise(function(n,r){var o=self.indexedDB.open(e,1);o.onsuccess=function(){var i=o.result;(function(t,e,n){if(1!==t.objectStoreNames.length)return n(S(e)),!1;if(t.objectStoreNames[0]!==P)return n(S(e)),!1;var r=t.transaction(P,"readonly").objectStore(P);return!(r.autoIncrement||r.keyPath||r.indexNames.length)||(n(S(e)),!1)})(i,e,r)&&(i.onclose=function(){w.set(t,null)},i.onversionchange=function(){i.close(),w.set(t,null)},n(i))},o.onerror=function(){return r(o.error)},o.onupgradeneeded=function(){try{o.result.createObjectStore(P)}catch(t){r(t)}}}))}(t),Promise.resolve(w.get(t)).then(function(t){var r=t.transaction(P,e),o=r.objectStore(P);return n(r,o)})}catch(t){return Promise.reject(t)}},g=new r,w=new r,P="store",k=function(t){var e="kv-storage:"+t;w.set(this,null),g.set(this,e),this.backingStore={database:e,store:P,version:1}};function S(t){return new Error('kv-storage: database "'+t+'" corrupted')}k.prototype.set=function(t,e){try{return c(t),b(this,"readwrite",function(n,r){return void 0===e?r.delete(t):r.put(e,t),u(n)})}catch(t){return Promise.reject(t)}},k.prototype.get=function(t){try{return c(t),b(this,"readonly",function(e,n){return o(n.get(t))})}catch(t){return Promise.reject(t)}},k.prototype.delete=function(t){try{return c(t),b(this,"readwrite",function(e,n){return n.delete(t),u(e)})}catch(t){return Promise.reject(t)}},k.prototype.clear=function(){try{var t=this;function e(){function e(){return o(self.indexedDB.deleteDatabase(g.get(t)))}var r=function(){if(n){try{n.close()}catch(t){}return Promise.resolve(new Promise(setTimeout)).then(function(){})}}();return r&&r.then?r.then(e):e()}var n,r=w.get(t),i=function(){if(null!==r){function e(){w.set(t,null)}var o=function(t,e){try{var o=Promise.resolve(r).then(function(t){n=t})}catch(t){return}return o&&o.then?o.then(void 0,function(){}):o}();return o&&o.then?o.then(e):e()}}();return i&&i.then?i.then(e):e()}catch(t){return Promise.reject(t)}},k.prototype.keys=function(){var t=this;return m("keys",function(e){return b(t,"readonly",e)})},k.prototype.values=function(){var t=this;return m("values",function(e){return b(t,"readonly",e)})},k.prototype.entries=function(){var t=this;return m("entries",function(e){return b(t,"readonly",e)})},"function"==typeof Symbol&&Symbol.asyncIterator&&(k.prototype[Symbol.asyncIterator]=k.prototype.entries);/* harmony default export */ __webpack_exports__["default"] = (new k("default"));
//# sourceMappingURL=kv-storage-polyfill.mjs.map


/***/ }),

/***/ "./node_modules/lit-html/directives/class-map.js":
/*!*******************************************************!*\
  !*** ./node_modules/lit-html/directives/class-map.js ***!
  \*******************************************************/
/*! exports provided: classMap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "classMap", function() { return classMap; });
/* harmony import */ var _lit_html_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lit-html.js */ "./node_modules/lit-html/lit-html.js");
/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
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
 // IE11 doesn't support classList on SVG elements, so we emulate it with a Set

class ClassList {
  constructor(element) {
    this.classes = new Set();
    this.changed = false;
    this.element = element;
    var classList = (element.getAttribute('class') || '').split(/\s+/);

    for (var cls of classList) {
      this.classes.add(cls);
    }
  }

  add(cls) {
    this.classes.add(cls);
    this.changed = true;
  }

  remove(cls) {
    this.classes.delete(cls);
    this.changed = true;
  }

  commit() {
    if (this.changed) {
      var classString = '';
      this.classes.forEach(cls => classString += cls + ' ');
      this.element.setAttribute('class', classString);
    }
  }

}
/**
 * Stores the ClassInfo object applied to a given AttributePart.
 * Used to unset existing values when a new ClassInfo object is applied.
 */


var previousClassesCache = new WeakMap();
/**
 * A directive that applies CSS classes. This must be used in the `class`
 * attribute and must be the only part used in the attribute. It takes each
 * property in the `classInfo` argument and adds the property name to the
 * element's `class` if the property value is truthy; if the property value is
 * falsey, the property name is removed from the element's `class`. For example
 * `{foo: bar}` applies the class `foo` if the value of `bar` is truthy.
 * @param classInfo {ClassInfo}
 */

var classMap = Object(_lit_html_js__WEBPACK_IMPORTED_MODULE_0__["directive"])(classInfo => part => {
  if (!(part instanceof _lit_html_js__WEBPACK_IMPORTED_MODULE_0__["AttributePart"]) || part instanceof _lit_html_js__WEBPACK_IMPORTED_MODULE_0__["PropertyPart"] || part.committer.name !== 'class' || part.committer.parts.length > 1) {
    throw new Error('The `classMap` directive must be used in the `class` attribute ' + 'and must be the only part in the attribute.');
  }

  var {
    committer
  } = part;
  var {
    element
  } = committer;
  var previousClasses = previousClassesCache.get(part);

  if (previousClasses === undefined) {
    // Write static classes once
    // Use setAttribute() because className isn't a string on SVG elements
    element.setAttribute('class', committer.strings.join(' '));
    previousClassesCache.set(part, previousClasses = new Set());
  }

  var classList = element.classList || new ClassList(element); // Remove old classes that no longer apply
  // We use forEach() instead of for-of so that re don't require down-level
  // iteration.

  previousClasses.forEach(name => {
    if (!(name in classInfo)) {
      classList.remove(name);
      previousClasses.delete(name);
    }
  }); // Add or remove classes based on their classMap value

  for (var name in classInfo) {
    var value = classInfo[name];

    if (value != previousClasses.has(name)) {
      // We explicitly want a loose truthy check of `value` because it seems
      // more convenient that '' and 0 are skipped.
      if (value) {
        classList.add(name);
        previousClasses.add(name);
      } else {
        classList.remove(name);
        previousClasses.delete(name);
      }
    }
  }

  if (typeof classList.commit === 'function') {
    classList.commit();
  }
});

/***/ }),

/***/ "./node_modules/lit-html/directives/style-map.js":
/*!*******************************************************!*\
  !*** ./node_modules/lit-html/directives/style-map.js ***!
  \*******************************************************/
/*! exports provided: styleMap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "styleMap", function() { return styleMap; });
/* harmony import */ var _lit_html_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lit-html.js */ "./node_modules/lit-html/lit-html.js");
/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
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

/**
 * Stores the StyleInfo object applied to a given AttributePart.
 * Used to unset existing values when a new StyleInfo object is applied.
 */

var previousStylePropertyCache = new WeakMap();
/**
 * A directive that applies CSS properties to an element.
 *
 * `styleMap` can only be used in the `style` attribute and must be the only
 * expression in the attribute. It takes the property names in the `styleInfo`
 * object and adds the property values as CSS properties. Property names with
 * dashes (`-`) are assumed to be valid CSS property names and set on the
 * element's style object using `setProperty()`. Names without dashes are
 * assumed to be camelCased JavaScript property names and set on the element's
 * style object using property assignment, allowing the style object to
 * translate JavaScript-style names to CSS property names.
 *
 * For example `styleMap({backgroundColor: 'red', 'border-top': '5px', '--size':
 * '0'})` sets the `background-color`, `border-top` and `--size` properties.
 *
 * @param styleInfo {StyleInfo}
 */

var styleMap = Object(_lit_html_js__WEBPACK_IMPORTED_MODULE_0__["directive"])(styleInfo => part => {
  if (!(part instanceof _lit_html_js__WEBPACK_IMPORTED_MODULE_0__["AttributePart"]) || part instanceof _lit_html_js__WEBPACK_IMPORTED_MODULE_0__["PropertyPart"] || part.committer.name !== 'style' || part.committer.parts.length > 1) {
    throw new Error('The `styleMap` directive must be used in the style attribute ' + 'and must be the only part in the attribute.');
  }

  var {
    committer
  } = part;
  var {
    style
  } = committer.element;
  var previousStyleProperties = previousStylePropertyCache.get(part);

  if (previousStyleProperties === undefined) {
    // Write static styles once
    style.cssText = committer.strings.join(' ');
    previousStylePropertyCache.set(part, previousStyleProperties = new Set());
  } // Remove old properties that no longer exist in styleInfo
  // We use forEach() instead of for-of so that re don't require down-level
  // iteration.


  previousStyleProperties.forEach(name => {
    if (!(name in styleInfo)) {
      previousStyleProperties.delete(name);

      if (name.indexOf('-') === -1) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        style[name] = null;
      } else {
        style.removeProperty(name);
      }
    }
  }); // Add or update properties

  for (var name in styleInfo) {
    previousStyleProperties.add(name);

    if (name.indexOf('-') === -1) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      style[name] = styleInfo[name];
    } else {
      style.setProperty(name, styleInfo[name]);
    }
  }
});

/***/ }),

/***/ "./node_modules/lit-html/directives/unsafe-html.js":
/*!*********************************************************!*\
  !*** ./node_modules/lit-html/directives/unsafe-html.js ***!
  \*********************************************************/
/*! exports provided: unsafeHTML */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unsafeHTML", function() { return unsafeHTML; });
/* harmony import */ var _lib_parts_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/parts.js */ "./node_modules/lit-html/lib/parts.js");
/* harmony import */ var _lit_html_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lit-html.js */ "./node_modules/lit-html/lit-html.js");
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

 // For each part, remember the value that was last rendered to the part by the
// unsafeHTML directive, and the DocumentFragment that was last set as a value.
// The DocumentFragment is used as a unique key to check if the last value
// rendered to the part was with unsafeHTML. If not, we'll always re-render the
// value passed to unsafeHTML.

var previousValues = new WeakMap();
/**
 * Renders the result as HTML, rather than text.
 *
 * Note, this is unsafe to use with any user-provided input that hasn't been
 * sanitized or escaped, as it may lead to cross-site-scripting
 * vulnerabilities.
 */

var unsafeHTML = Object(_lit_html_js__WEBPACK_IMPORTED_MODULE_1__["directive"])(value => part => {
  if (!(part instanceof _lit_html_js__WEBPACK_IMPORTED_MODULE_1__["NodePart"])) {
    throw new Error('unsafeHTML can only be used in text bindings');
  }

  var previousValue = previousValues.get(part);

  if (previousValue !== undefined && Object(_lib_parts_js__WEBPACK_IMPORTED_MODULE_0__["isPrimitive"])(value) && value === previousValue.value && part.value === previousValue.fragment) {
    return;
  }

  var template = document.createElement('template');
  template.innerHTML = value; // innerHTML casts to string internally

  var fragment = document.importNode(template.content, true);
  part.setValue(fragment);
  previousValues.set(part, {
    value,
    fragment
  });
});

/***/ }),

/***/ "./node_modules/uuid-class/index.js":
/*!******************************************!*\
  !*** ./node_modules/uuid-class/index.js ***!
  \******************************************/
/*! exports provided: UUID */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UUID", function() { return UUID; });
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Better inspection for node and deno.
var nodeInspect = Symbol.for('nodejs.util.inspect.custom'); // @ts-ignore

var denoInspect = typeof Deno !== 'undefined' // @ts-ignore
? 'symbols' in Deno ? Deno.symbols.customInspect : Deno.customInspect : Symbol();

var byteToHex = byte => byte.toString(16).padStart(2, '0');

var hexToByte = hexOctet => parseInt(hexOctet, 16);

var _hexStringToBytes = hexString => hexString.match(/[0-9A-Fa-f]{1,2}/g).map(hexToByte);

function _bytesToHexArray(uint8Array) {
  var hexArray = new Array(16);

  for (var i = 0; i < 16; i++) {
    hexArray[i] = byteToHex(uint8Array[i]);
  }

  return hexArray;
}

function _bytesToUUIDString(uint8Array) {
  var hexArray = _bytesToHexArray(uint8Array);

  for (var i of [4, 7, 10, 13]) {
    hexArray.splice(i, 0, '-');
  }

  return hexArray.join('');
}

function _concatUint8Arrays() {
  for (var _len = arguments.length, u8s = new Array(_len), _key = 0; _key < _len; _key++) {
    u8s[_key] = arguments[_key];
  }

  var size = u8s.reduce((size, u8) => size + u8.length, 0);
  var res = new Uint8Array(size);
  var i = 0;

  for (var u8 of u8s) {
    res.set(u8, i);
    i += u8.length;
  }

  return res.buffer;
}

function _v4() {
  var uuid = crypto.getRandomValues(new Uint8Array(16)); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  uuid[6] = uuid[6] & 0x0f | 0x40;
  uuid[8] = uuid[8] & 0x3f | 0x80;
  return uuid.buffer;
}

function _fromString(str) {
  var hex = str.replace(/[^0-9A-Fa-f]/g, '').slice(0, 32);
  if (hex.length < 32) throw Error('UUID too short');
  return _hexStringToBytes(hex);
}

function stringToBytes(str) {
  str = unescape(encodeURIComponent(str)); // UTF8 escape

  return new TextEncoder().encode(str).buffer;
}

function _v5(_x, _x2) {
  return _v.apply(this, arguments);
}
/**
 * A better UUID class for JavaScript.
 *
 * UUID are represented as bytes (`Uint8Array`) and converted to strings on-demand.
 *
 * This class implements `toString` and `toJSON` for better language integration,
 * as well as inspection for node and Deno for a better development experience.
 *
 * For the most part, `UUID` can be used where  UUID strings are used,
 * except for equality checks. For those cases, `UUID` provides quick access
 * to the string representations via the `id` field.
 */


function _v() {
  _v = _asyncToGenerator(function* (value, namespace) {
    var valueBytes = typeof value === 'string' ? new Uint8Array(stringToBytes(value)) : value instanceof ArrayBuffer ? new Uint8Array(value) : new Uint8Array(value.buffer, value.byteOffset, value.byteLength);
    var namespaceUUID = typeof namespace === 'string' ? new UUID(namespace) : namespace;
    var hashBytes = yield crypto.subtle.digest('SHA-1', _concatUint8Arrays(namespaceUUID, valueBytes));
    hashBytes[6] = hashBytes[6] & 0x0f | 0x50; // version

    hashBytes[8] = hashBytes[8] & 0x3f | 0x80;
    return hashBytes.slice(0, 16);
  });
  return _v.apply(this, arguments);
}

class UUID extends Uint8Array {
  /**
   * Generate a new UUID version 4 (random).
   *
   * __Note that `crypto.getRandomValues` needs to be available in the global JS object!__
   */
  static v4() {
    return new UUID(_v4());
  }
  /**
   * Generated a new UUID version 5 (hashed)
   *
   * __Note that `crypto.subtle` needs to be available in the global JS object (Not the case on non-HTTPS sites)!__
   *
   * @param value
   * @param namespace
   */


  static v5(value, namespace) {
    return _asyncToGenerator(function* () {
      return new UUID(yield _v5(value, namespace));
    })();
  }

  constructor(value, byteOffset) {
    if (value == null) {
      super(new Uint8Array(_v4()));
    } else if (typeof value === 'string') {
      super(new Uint8Array(_fromString(value)));
    } else if (value instanceof UUID) {
      super(new Uint8Array(value.buffer));
    } else {
      var x = new Uint8Array(value, byteOffset, 16).slice(0, 16);
      if (x.length < 16) throw Error('UUID too short');
      super(x.buffer);
    }
  }
  /**
   * Quick access to the string representation for easier comparison.
   * @example if (myUUID.id === otherUUID.id) { ... }
   */


  get id() {
    return _bytesToUUIDString(this);
  }
  /**
   * Quick access to the UUID string representation for easier comparison.
   * @example if (myUUID.uuid === otherUUID.uuid) { ... }
   */


  get uuid() {
    return _bytesToUUIDString(this);
  }

  toString() {
    return _bytesToUUIDString(this);
  }

  toJSON() {
    return _bytesToUUIDString(this);
  }

  [nodeInspect]() {
    return "UUID [ ".concat(this.uuid, " ]");
  }

  [denoInspect]() {
    return "UUID [ ".concat(this.uuid, " ]");
  }

}

/***/ })

}]);
//# sourceMappingURL=vendors~clap-button-hydejack-9.1.0-beta.4.js.map