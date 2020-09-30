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
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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

var ClassList = /*#__PURE__*/function () {
  function ClassList(element) {
    _classCallCheck(this, ClassList);

    this.classes = new Set();
    this.changed = false;
    this.element = element;
    var classList = (element.getAttribute('class') || '').split(/\s+/);

    var _iterator = _createForOfIteratorHelper(classList),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var cls = _step.value;
        this.classes.add(cls);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }

  _createClass(ClassList, [{
    key: "add",
    value: function add(cls) {
      this.classes.add(cls);
      this.changed = true;
    }
  }, {
    key: "remove",
    value: function remove(cls) {
      this.classes.delete(cls);
      this.changed = true;
    }
  }, {
    key: "commit",
    value: function commit() {
      if (this.changed) {
        var classString = '';
        this.classes.forEach(function (cls) {
          return classString += cls + ' ';
        });
        this.element.setAttribute('class', classString);
      }
    }
  }]);

  return ClassList;
}();
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

var classMap = Object(_lit_html_js__WEBPACK_IMPORTED_MODULE_0__["directive"])(function (classInfo) {
  return function (part) {
    if (!(part instanceof _lit_html_js__WEBPACK_IMPORTED_MODULE_0__["AttributePart"]) || part instanceof _lit_html_js__WEBPACK_IMPORTED_MODULE_0__["PropertyPart"] || part.committer.name !== 'class' || part.committer.parts.length > 1) {
      throw new Error('The `classMap` directive must be used in the `class` attribute ' + 'and must be the only part in the attribute.');
    }

    var committer = part.committer;
    var element = committer.element;
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

    previousClasses.forEach(function (name) {
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
  };
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

var styleMap = Object(_lit_html_js__WEBPACK_IMPORTED_MODULE_0__["directive"])(function (styleInfo) {
  return function (part) {
    if (!(part instanceof _lit_html_js__WEBPACK_IMPORTED_MODULE_0__["AttributePart"]) || part instanceof _lit_html_js__WEBPACK_IMPORTED_MODULE_0__["PropertyPart"] || part.committer.name !== 'style' || part.committer.parts.length > 1) {
      throw new Error('The `styleMap` directive must be used in the style attribute ' + 'and must be the only part in the attribute.');
    }

    var committer = part.committer;
    var style = committer.element.style;
    var previousStyleProperties = previousStylePropertyCache.get(part);

    if (previousStyleProperties === undefined) {
      // Write static styles once
      style.cssText = committer.strings.join(' ');
      previousStylePropertyCache.set(part, previousStyleProperties = new Set());
    } // Remove old properties that no longer exist in styleInfo
    // We use forEach() instead of for-of so that re don't require down-level
    // iteration.


    previousStyleProperties.forEach(function (name) {
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
  };
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

var unsafeHTML = Object(_lit_html_js__WEBPACK_IMPORTED_MODULE_1__["directive"])(function (value) {
  return function (part) {
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
      value: value,
      fragment: fragment
    });
  };
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
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Better inspection for node and deno.
var nodeInspect = Symbol.for('nodejs.util.inspect.custom'); // @ts-ignore

var denoInspect = typeof Deno !== 'undefined' // @ts-ignore
? 'symbols' in Deno ? Deno.symbols.customInspect : Deno.customInspect : Symbol();

var byteToHex = function byteToHex(byte) {
  return byte.toString(16).padStart(2, '0');
};

var hexToByte = function hexToByte(hexOctet) {
  return parseInt(hexOctet, 16);
};

var _hexStringToBytes = function _hexStringToBytes(hexString) {
  return hexString.match(/[0-9A-Fa-f]{1,2}/g).map(hexToByte);
};

function _bytesToHexArray(uint8Array) {
  var hexArray = new Array(16);

  for (var i = 0; i < 16; i++) {
    hexArray[i] = byteToHex(uint8Array[i]);
  }

  return hexArray;
}

function _bytesToUUIDString(uint8Array) {
  var hexArray = _bytesToHexArray(uint8Array);

  for (var _i = 0, _arr = [4, 7, 10, 13]; _i < _arr.length; _i++) {
    var i = _arr[_i];
    hexArray.splice(i, 0, '-');
  }

  return hexArray.join('');
}

function _concatUint8Arrays() {
  for (var _len = arguments.length, u8s = new Array(_len), _key = 0; _key < _len; _key++) {
    u8s[_key] = arguments[_key];
  }

  var size = u8s.reduce(function (size, u8) {
    return size + u8.length;
  }, 0);
  var res = new Uint8Array(size);
  var i = 0;

  for (var _i2 = 0, _u8s = u8s; _i2 < _u8s.length; _i2++) {
    var u8 = _u8s[_i2];
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
  _v = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(value, namespace) {
    var valueBytes, namespaceUUID, hashBytes;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            valueBytes = typeof value === 'string' ? new Uint8Array(stringToBytes(value)) : value instanceof ArrayBuffer ? new Uint8Array(value) : new Uint8Array(value.buffer, value.byteOffset, value.byteLength);
            namespaceUUID = typeof namespace === 'string' ? new UUID(namespace) : namespace;
            _context2.next = 4;
            return crypto.subtle.digest('SHA-1', _concatUint8Arrays(namespaceUUID, valueBytes));

          case 4:
            hashBytes = _context2.sent;
            hashBytes[6] = hashBytes[6] & 0x0f | 0x50; // version

            hashBytes[8] = hashBytes[8] & 0x3f | 0x80;
            return _context2.abrupt("return", hashBytes.slice(0, 16));

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _v.apply(this, arguments);
}

var UUID = /*#__PURE__*/function (_Uint8Array) {
  _inherits(UUID, _Uint8Array);

  var _super = _createSuper(UUID);

  _createClass(UUID, null, [{
    key: "v4",

    /**
     * Generate a new UUID version 4 (random).
     *
     * __Note that `crypto.getRandomValues` needs to be available in the global JS object!__
     */
    value: function v4() {
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

  }, {
    key: "v5",
    value: function () {
      var _v2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(value, namespace) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.t0 = UUID;
                _context.next = 3;
                return _v5(value, namespace);

              case 3:
                _context.t1 = _context.sent;
                return _context.abrupt("return", new _context.t0(_context.t1));

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function v5(_x3, _x4) {
        return _v2.apply(this, arguments);
      }

      return v5;
    }()
  }]);

  function UUID(value, byteOffset) {
    var _this;

    _classCallCheck(this, UUID);

    if (value == null) {
      _this = _super.call(this, new Uint8Array(_v4()));
    } else if (typeof value === 'string') {
      _this = _super.call(this, new Uint8Array(_fromString(value)));
    } else if (value instanceof UUID) {
      _this = _super.call(this, new Uint8Array(value.buffer));
    } else {
      var x = new Uint8Array(value, byteOffset, 16).slice(0, 16);
      if (x.length < 16) throw Error('UUID too short');
      _this = _super.call(this, x.buffer);
    }

    return _possibleConstructorReturn(_this);
  }
  /**
   * Quick access to the string representation for easier comparison.
   * @example if (myUUID.id === otherUUID.id) { ... }
   */


  _createClass(UUID, [{
    key: "toString",
    value: function toString() {
      return _bytesToUUIDString(this);
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return _bytesToUUIDString(this);
    }
  }, {
    key: nodeInspect,
    value: function value() {
      return "UUID [ ".concat(this.uuid, " ]");
    }
  }, {
    key: denoInspect,
    value: function value() {
      return "UUID [ ".concat(this.uuid, " ]");
    }
  }, {
    key: "id",
    get: function get() {
      return _bytesToUUIDString(this);
    }
    /**
     * Quick access to the UUID string representation for easier comparison.
     * @example if (myUUID.uuid === otherUUID.uuid) { ... }
     */

  }, {
    key: "uuid",
    get: function get() {
      return _bytesToUUIDString(this);
    }
  }]);

  return UUID;
}( /*#__PURE__*/_wrapNativeSuper(Uint8Array));

/***/ })

}]);
//# sourceMappingURL=LEGACY-vendors~clap-button-hydejack-9.1.0-beta.4.js.map