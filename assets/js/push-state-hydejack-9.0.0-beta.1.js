(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["push-state"],{

/***/ "./_js/src/cross-fader.js":
/*!********************************!*\
  !*** ./_js/src/cross-fader.js ***!
  \********************************/
/*! exports provided: CrossFader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CrossFader", function() { return CrossFader; });
/* harmony import */ var color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! color */ "./node_modules/color/index.js");
/* harmony import */ var color__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(color__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var elem_dataset__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! elem-dataset */ "./node_modules/elem-dataset/index.js");
/* harmony import */ var elem_dataset__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(elem_dataset__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/dist/esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/dist/esm5/operators/index.js");
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./common */ "./_js/src/common.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Copyright (c) 2019 Florian Klampfer <https://qwtel.com/>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.




 // Given a dataset, generate some string we can use the check if anything has changed...

var pseudoHash = (_ref) => {
  var {
    background,
    color,
    image,
    overlay
  } = _ref;
  return "".concat(color).concat(image || background).concat(overlay === '' ? 'overlay' : '');
}; // Consider a URL external if either the protocol, hostname or port is different.


function isExternal(_ref2) {
  var {
    protocol,
    host
  } = _ref2;
  var location = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window.location;
  return protocol !== location.protocol || host !== location.host;
}

var objectURLs = new WeakMap();
class CrossFader {
  constructor(fadeDuration) {
    var main = document.getElementById('_main');
    var styleSheet = Array.from(document.styleSheets).find(s => s.ownerNode && s.ownerNode.id === '_pageStyle') || {};
    this.sidebar = document.getElementById('_sidebar');
    this.fadeDuration = fadeDuration;
    this.rules = styleSheet.cssRules || styleSheet.rules;
    this.prevHash = pseudoHash(elem_dataset__WEBPACK_IMPORTED_MODULE_1___default()(main));
    this.themeColorEl = document.querySelector('meta[name="theme-color"]');
  }

  fetchImage2(_ref3) {
    var {
      background,
      image
    } = _ref3;

    if (background || !image || image === '' || image === 'none') {
      return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(null);
    }

    var url = new URL(image, window.location.origin);
    return Object(_common__WEBPACK_IMPORTED_MODULE_4__["fetchRx"])(url.href, _objectSpread({
      method: 'GET',
      headers: {
        Accept: 'image/*'
      }
    }, isExternal(url) ? {
      mode: 'cors'
    } : {})).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["switchMap"])(r => r.blob()), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(blob => URL.createObjectURL(blob)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(() => Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(image)));
  }

  fetchImage(main) {
    var dataset = elem_dataset__WEBPACK_IMPORTED_MODULE_1___default()(main);
    var {
      background,
      color,
      image,
      overlay
    } = dataset; // HACK: Using `dataset` here to store some intermediate data

    var hash = pseudoHash(dataset);
    if (hash === this.prevHash) return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["empty"])();
    return this.fetchImage2(dataset).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(objectURL => {
      var div = document.createElement('div');
      div.classList.add('sidebar-bg'); // Set overlay

      if (image !== 'none' && overlay === '') {
        div.classList.add('sidebar-overlay');
      } // Set background


      if (background) {
        div.style.background = background;
      } else {
        div.style.backgroundColor = color;

        if (objectURL) {
          div.style.backgroundImage = "url(".concat(objectURL, ")");
          objectURLs.set(div, objectURL); // HACK: Store objectURL on DOM node for later revocation
        }
      }

      return [div, dataset, hash];
    }));
  }

  updateStyle() {
    var {
      color = '#4fb1ba',
      themeColor = '#193747'
    } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (this.themeColorEl) {
      window.setTimeout(() => this.themeColorEl.content = themeColor, 250);
    }

    if (this.rules) {
      try {
        var c = color__WEBPACK_IMPORTED_MODULE_0___default()(color);
        var active = c.darken(0.1);
        var underlineColor = c.fade(0.5); // .content a

        this.rules[0].style.textDecorationColor = underlineColor;
        this.rules[0].style.borderColor = underlineColor; // .content a:hover

        this.rules[1].style.textDecorationColor = color;
        this.rules[1].style.borderColor = color; // :focus

        this.rules[2].style.outlineColor = color; // .btn-primary

        this.rules[3].style.backgroundColor = color;
        this.rules[3].style.borderColor = color; // .btn-primary:focus

        this.rules[4].style.boxShadow = "0 0 0 3px ".concat(c.fade(0.5)); // .btn-primary:hover

        this.rules[5].style.backgroundColor = active;
        this.rules[5].style.borderColor = active; // .btn-primary:disabled

        this.rules[6].style.backgroundColor = color;
        this.rules[6].style.borderColor = color; // .btn-primary:active

        this.rules[7].style.backgroundColor = active;
        this.rules[7].style.borderColor = active; // ::selection or ::-moz-selection (assuming it is last in the list)

        this.rules[this.rules.length - 1].style.backgroundColor = color;
      } catch (e) {
        if (true) console.error(e);
      }
    }
  }

  fade(_ref4, _ref5) {
    var [prevDiv] = _ref4;
    var [div, dataset, hash] = _ref5;
    prevDiv.parentNode.insertBefore(div, prevDiv.nextElementSibling);
    this.updateStyle(dataset); // Only update the prev hash after we're actually in the fade stage

    this.prevHash = hash;
    return Object(_common__WEBPACK_IMPORTED_MODULE_4__["animate"])(div, [{
      opacity: 0
    }, {
      opacity: 1
    }], {
      duration: this.fadeDuration,
      easing: 'ease'
    }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["finalize"])(() => {
      if (objectURLs.has(prevDiv)) URL.revokeObjectURL(objectURLs.get(prevDiv));
      prevDiv.parentNode.removeChild(prevDiv);
    }));
  }

}

/***/ }),

/***/ "./_js/src/flip/index.js":
/*!*******************************!*\
  !*** ./_js/src/flip/index.js ***!
  \*******************************/
/*! exports provided: setupFLIP */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setupFLIP", function() { return setupFLIP; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/dist/esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/dist/esm5/operators/index.js");
/* harmony import */ var _title__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./title */ "./_js/src/flip/title.js");
// Copyright (c) 2019 Florian Klampfer <https://qwtel.com/>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.



var FLIP_TYPES = ['title'];
function setupFLIP(start$, ready$, fadeIn$, options) {
  var other$ = start$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["filter"])((_ref) => {
    var {
      flipType
    } = _ref;
    return !FLIP_TYPES.includes(flipType);
  }));
  return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["merge"])(Object(_title__WEBPACK_IMPORTED_MODULE_2__["setupFLIPTitle"])(start$, ready$, fadeIn$, options), other$);
}

/***/ }),

/***/ "./_js/src/flip/title.js":
/*!*******************************!*\
  !*** ./_js/src/flip/title.js ***!
  \*******************************/
/*! exports provided: setupFLIPTitle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setupFLIPTitle", function() { return setupFLIPTitle; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/dist/esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/dist/esm5/operators/index.js");
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common */ "./_js/src/common.js");
// Copyright (c) 2019 Florian Klampfer <https://qwtel.com/>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.



var TITLE_SELECTOR = '.page-title, .post-title';
function setupFLIPTitle(start$, ready$, fadeIn$, _ref) {
  var {
    animationMain,
    settings
  } = _ref;
  if (!animationMain) return start$;
  var flip$ = start$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["filter"])((_ref2) => {
    var {
      flipType
    } = _ref2;
    return flipType === 'title';
  }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])((_ref3) => {
    var {
      anchor
    } = _ref3;
    if (!anchor) return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["of"])({});
    var title = document.createElement('h1');
    title.classList.add('page-title');
    title.textContent = anchor.textContent;
    title.style.transformOrigin = 'left top';
    var page = animationMain.querySelector('.page');
    if (!page) return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["of"])({});
    _common__WEBPACK_IMPORTED_MODULE_2__["empty"].call(page);
    page.appendChild(title);
    animationMain.style.position = 'fixed';
    animationMain.style.opacity = 1;
    var first = anchor.getBoundingClientRect();
    var last = title.getBoundingClientRect();
    var firstFontSize = parseInt(getComputedStyle(anchor).fontSize, 10);
    var lastFontSize = parseInt(getComputedStyle(title).fontSize, 10);
    var invertX = first.left - last.left;
    var invertY = first.top - last.top;
    var invertScale = firstFontSize / lastFontSize;
    anchor.style.opacity = 0;
    var transform = [{
      transform: "translate3d(".concat(invertX, "px, ").concat(invertY, "px, 0) scale(").concat(invertScale, ")")
    }, {
      transform: 'translate3d(0, 0, 0) scale(1)'
    }];
    return Object(_common__WEBPACK_IMPORTED_MODULE_2__["animate"])(title, transform, settings).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])({
      complete() {
        animationMain.style.position = 'absolute';
      }

    }));
  }));
  start$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])((_ref4) => {
    var {
      flipType
    } = _ref4;
    return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["zip"])(ready$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["filter"])(() => flipType === 'title'), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])((_ref5) => {
      var {
        replaceEls: [main]
      } = _ref5;
      var title = main.querySelector(TITLE_SELECTOR);
      if (title) title.style.opacity = 0;
      return title;
    })), fadeIn$, x => x).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])(title => {
      if (title) title.style.opacity = 1;
      animationMain.style.opacity = 0;
    }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["finalize"])(() => {
      animationMain.style.opacity = 0;
    }));
  })).subscribe();
  return flip$;
}

/***/ }),

/***/ "./_js/src/push-state.js":
/*!*******************************!*\
  !*** ./_js/src/push-state.js ***!
  \*******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/dist/esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/dist/esm5/operators/index.js");
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./common */ "./_js/src/common.js");
/* harmony import */ var _cross_fader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cross-fader */ "./_js/src/cross-fader.js");
/* harmony import */ var _flip__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./flip */ "./_js/src/flip/index.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Copyright (c) 2019 Florian Klampfer <https://qwtel.com/>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.






_asyncToGenerator(function* () {
  yield Promise.all([...('fetch' in window ? [] : [Promise.all(/*! import() | fetch */[__webpack_require__.e("vendors~fetch"), __webpack_require__.e("fetch")]).then(__webpack_require__.bind(null, /*! ./polyfills/fetch */ "./_js/src/polyfills/fetch.js"))]), ...('customElements' in window ? [] : [Promise.all(/*! import() | webcomponents */[__webpack_require__.e("vendors~webcomponents"), __webpack_require__.e("webcomponents")]).then(__webpack_require__.bind(null, /*! ./polyfills/webcomponents */ "./_js/src/polyfills/webcomponents.js"))]), ...('animate' in Element.prototype ? [] : [__webpack_require__.e(/*! import() | webanimations */ "vendors~webanimations").then(__webpack_require__.t.bind(null, /*! web-animations-js */ "./node_modules/web-animations-js/web-animations.min.js", 7))]), ...('IntersectionObserver' in window ? [] : [__webpack_require__.e(/*! import() | intersection-observer */ "vendors~intersection-observer").then(__webpack_require__.t.bind(null, /*! intersection-observer */ "./node_modules/intersection-observer/intersection-observer.js", 7))])]);
  yield _common__WEBPACK_IMPORTED_MODULE_2__["webComponentsReady"];
  var NAVBAR_SEL = '#_navbar > .content > .nav-btn-bar';
  var CANONICAL_SEL = 'link[rel=canonical]';
  var META_DESC_SEL = 'meta[name=description]';
  var FN_SEL = "li[id^='fn:']";
  var FN_LINK_SEL = "a[href^='#fn:']";
  var HORIZONTAL_SCROLL_SEL = 'pre, table:not(.highlight), .katex-display, .break-layout';
  var CODE_BLOCK_SEL = 'pre.highlight > code';
  var CODE_TITLE_REX = /(?:title|file):\s*['"`](.*)['"`]/i;
  var MQ_STANDALONE = '(display-mode: standalone)';
  var DURATION = 350;
  var FADE_DURATION = 2000;
  var FADE_OUT = [{
    opacity: 1
  }, {
    opacity: 0
  }];
  var FADE_IN = [{
    opacity: 0,
    transform: 'translateY(-3rem)'
  }, {
    opacity: 1,
    transform: 'translateY(0)'
  }];
  var SETTINGS = {
    duration: DURATION,
    easing: 'ease-out'
  };
  var HEADING_SELECTOR = 'h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]';

  function upgradeHeading(h) {
    var df = Object(_common__WEBPACK_IMPORTED_MODULE_2__["importTemplate"])('_permalink-template');
    var a = df.querySelector('.permalink');
    requestAnimationFrame(() => (a.href = "#".concat(h.id), h.appendChild(df)));
  }

  function setupAnimationMain(pushStateEl) {
    var _pushStateEl$parentNo;

    pushStateEl === null || pushStateEl === void 0 ? void 0 : (_pushStateEl$parentNo = pushStateEl.parentNode) === null || _pushStateEl$parentNo === void 0 ? void 0 : _pushStateEl$parentNo.insertBefore(Object(_common__WEBPACK_IMPORTED_MODULE_2__["importTemplate"])('_animation-template'), pushStateEl);
    return pushStateEl === null || pushStateEl === void 0 ? void 0 : pushStateEl.previousElementSibling;
  }

  function setupLoading(navbarEl) {
    navbarEl === null || navbarEl === void 0 ? void 0 : navbarEl.appendChild(Object(_common__WEBPACK_IMPORTED_MODULE_2__["importTemplate"])('_loading-template'));
    return navbarEl === null || navbarEl === void 0 ? void 0 : navbarEl.lastElementChild;
  }

  function setupErrorPage(main, url) {
    var {
      pathname
    } = url;
    var error = Object(_common__WEBPACK_IMPORTED_MODULE_2__["importTemplate"])('_error-template');
    var anchor = error === null || error === void 0 ? void 0 : error.querySelector('.this-link');

    if (anchor) {
      anchor.href = pathname;
      anchor.textContent = pathname;
    }

    main === null || main === void 0 ? void 0 : main.appendChild(error);
    return main === null || main === void 0 ? void 0 : main.lastElementChild;
  }

  function importBackButton() {
    var _button$querySelector;

    var button = Object(_common__WEBPACK_IMPORTED_MODULE_2__["importTemplate"])('_back-template');
    var buttonEl = button === null || button === void 0 ? void 0 : button.children[0];
    button === null || button === void 0 ? void 0 : (_button$querySelector = button.querySelector('.nav-btn')) === null || _button$querySelector === void 0 ? void 0 : _button$querySelector.addEventListener('click', () => window.history.back());
    return buttonEl;
  }

  function getFlipType(el) {
    var _el$getAttribute;

    if (el === null || el === void 0 ? void 0 : el.classList.contains('flip-title')) return 'title';
    if (el === null || el === void 0 ? void 0 : el.classList.contains('flip-project')) return 'project';
    return el === null || el === void 0 ? void 0 : (_el$getAttribute = el.getAttribute) === null || _el$getAttribute === void 0 ? void 0 : _el$getAttribute.call(el, 'data-flip');
  }

  function animateFadeOut(_ref2) {
    var {
      main
    } = _ref2;
    return Object(_common__WEBPACK_IMPORTED_MODULE_2__["animate"])(main, FADE_OUT, _objectSpread(_objectSpread({}, SETTINGS), {}, {
      fill: 'forwards'
    })).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["mapTo"])({
      main
    }));
  }

  function animateFadeIn(_ref3) {
    var {
      replaceEls: [main],
      flipType
    } = _ref3;
    return Object(_common__WEBPACK_IMPORTED_MODULE_2__["animate"])(main, FADE_IN, SETTINGS).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["mapTo"])({
      main,
      flipType
    }));
  }

  var pushStateEl = document.querySelector('hy-push-state');
  if (!pushStateEl) return;
  var drawerEl = document.querySelector('hy-drawer');
  var navbarEl = document.querySelector(NAVBAR_SEL);
  var canonicalEl = document.querySelector(CANONICAL_SEL);
  var metaDescEl = document.querySelector(META_DESC_SEL);
  var animationMain = setupAnimationMain(pushStateEl);
  var loading = setupLoading(navbarEl);
  var backBtnEl = importBackButton();

  if (navbarEl && backBtnEl) {
    var standaloneMQ = window.matchMedia(MQ_STANDALONE);
    var standalone = !!navigator.standalone || standaloneMQ.matches;
    var standalone$ = Object(_common__WEBPACK_IMPORTED_MODULE_2__["fromMediaQuery"])(standaloneMQ).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(e => e.matches), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["startWith"])(standalone));
    standalone$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])(matches => {
      if (matches) navbarEl.prepend(backBtnEl);else if (backBtnEl.parentNode === navbarEl) navbarEl.removeChild(backBtnEl);
    })).subscribe();
  }

  var fromEventX = (eventName, mapFn) => Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["fromEvent"])(pushStateEl, eventName).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])((_ref4) => {
    var {
      detail
    } = _ref4;
    return detail;
  }), mapFn ? Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(mapFn) : _ => _, Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["share"])());

  var start$ = fromEventX('hy-push-state-start', detail => Object.assign(detail, {
    flipType: getFlipType(detail.anchor)
  }));
  var ready$ = fromEventX('hy-push-state-ready');
  var after$ = fromEventX('hy-push-state-after');
  var progress$ = fromEventX('hy-push-state-progress');
  var error$ = fromEventX('hy-push-state-networkerror');
  var fadeOut$ = start$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(context => Object.assign(context, {
    main: document.getElementById('_main')
  })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])((_ref5) => {
    var {
      main
    } = _ref5;
    main.style.pointerEvents = 'none';
  }), window._noDrawer && (drawerEl === null || drawerEl === void 0 ? void 0 : drawerEl.classList.contains('cover')) ? Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])(() => {
    var _drawerEl$parentNode;

    drawerEl.classList.remove('cover');
    (_drawerEl$parentNode = drawerEl.parentNode) === null || _drawerEl$parentNode === void 0 ? void 0 : _drawerEl$parentNode.appendChild(drawerEl);
  }) : _ => _, Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["exhaustMap"])(animateFadeOut), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])((_ref6) => {
    var {
      main
    } = _ref6;
    return _common__WEBPACK_IMPORTED_MODULE_2__["empty"].call(main);
  }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["share"])());
  progress$.subscribe(() => {
    if (loading) loading.style.display = 'flex';
  });
  ready$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["startWith"])({
    replaceEls: [document.getElementById('_main')]
  })).subscribe((_ref7) => {
    var {
      replaceEls: [main]
    } = _ref7;
    main.querySelectorAll(HEADING_SELECTOR).forEach(upgradeHeading);
    if (loading) loading.style.display = 'none';
    var toc = main.querySelector('#markdown-toc');
    if (toc) toc.classList.add('toc-hide');
    Array.from(main.querySelectorAll(CODE_BLOCK_SEL)).map(el => el.children[0]).filter(el => CODE_TITLE_REX.test(el === null || el === void 0 ? void 0 : el.innerText)).forEach(el => {
      var [, fileName] = CODE_TITLE_REX.exec(el.innerText); // Remove element before making changes

      var code = el.parentNode;
      code.removeChild(el); // Remove newline

      code.childNodes[0].splitText(1);
      code.removeChild(code.childNodes[0]); // Update DOM

      el.innerText = fileName;
      el.classList.add('pre-header');
      var container = code.parentNode.parentNode;
      container.insertBefore(el, container.firstChild);
    });

    if ('complete' in HTMLImageElement.prototype) {
      main.querySelectorAll('img[width][height][loading=lazy]').forEach(el => {
        if (!el.complete) {
          el.style.opacity = '0';
          el.addEventListener('load', () => {
            el.style.opacity = '';
          }, {
            once: true
          });
        }
      });
    }
    /*
      requestIdleCallback(() => {
        main.querySelectorAll(pushStateEl.linkSelector).forEach(anchor => {
          caches.match(anchor.href).then(m => {
            if (m) requestAnimationFrame(() => anchor.classList.add("visited"));
          });
        });
      });
      */

  });
  after$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["startWith"])({
    replaceEls: [document.getElementById('_main')],
    documentFragment: document
  })).subscribe((_ref8) => {
    var {
      replaceEls: [main],
      documentFragment
    } = _ref8;
    var cEl = documentFragment.querySelector(CANONICAL_SEL);
    if (canonicalEl && cEl) canonicalEl.href = cEl.href;
    var mEl = documentFragment.querySelector(META_DESC_SEL);
    if (metaDescEl && mEl) metaDescEl.content = mEl.content;
    main.querySelectorAll(FN_SEL).forEach(li => li.tabIndex = 0);
    main.querySelectorAll(FN_LINK_SEL).forEach(a => a.addEventListener('click', e => {
      var _document$getElementB;

      return (_document$getElementB = document.getElementById(e.currentTarget.getAttribute('href').substr(1))) === null || _document$getElementB === void 0 ? void 0 : _document$getElementB.focus();
    }));
    main.querySelectorAll(HORIZONTAL_SCROLL_SEL).forEach(el => el.addEventListener('touchstart', e => el.scrollLeft > 0 && e.stopPropagation(), {
      passive: false
    }));
  });
  var fadeIn$ = after$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])(animateFadeIn), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["share"])());
  var flip$ = Object(_flip__WEBPACK_IMPORTED_MODULE_4__["setupFLIP"])(start$, ready$, Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["merge"])(fadeIn$, error$), {
    animationMain,
    settings: SETTINGS
  }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["share"])());
  start$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])(context => {
    var promise = Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["zip"])(Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["timer"])(DURATION), fadeOut$, flip$).toPromise();
    context.transitionUntil(promise);
    return promise;
  })).subscribe(); // FIXME: Keeping permanent subscription? turn into hot observable?

  fadeOut$.subscribe();
  flip$.subscribe();
  var sidebarBg = document.querySelector('.sidebar-bg');

  if (sidebarBg) {
    var crossFader = new _cross_fader__WEBPACK_IMPORTED_MODULE_3__["CrossFader"](FADE_DURATION);
    after$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])((_ref9) => {
      var {
        replaceEls: [main]
      } = _ref9;
      return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["zip"])(crossFader.fetchImage(main), fadeIn$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])((_ref10) => {
        var [x] = _ref10;
        return x;
      }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["takeUntil"])(start$));
    }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["startWith"])([sidebarBg]), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["pairwise"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["mergeMap"])((_ref11) => {
      var [prev, curr] = _ref11;
      return crossFader.fade(prev, curr);
    })).subscribe();
  }

  fadeIn$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["startWith"])({
    main: document.getElementById('_main')
  }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])((_ref12) => {
    var {
      main
    } = _ref12;
    var toc = main === null || main === void 0 ? void 0 : main.querySelector('#markdown-toc');

    if (toc) {
      toc.classList.remove('toc-hide');
      toc.classList.add('toc-show');
    }
  })).subscribe();
  error$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])((_ref13) => {
    var {
      url
    } = _ref13;
    if (loading) loading.style.display = 'none';
    var main = document.getElementById('_main');
    if (main) main.style.pointerEvents = '';
    _common__WEBPACK_IMPORTED_MODULE_2__["empty"].call(animationMain === null || animationMain === void 0 ? void 0 : animationMain.querySelector('.page'));
    _common__WEBPACK_IMPORTED_MODULE_2__["empty"].call(main);
    setupErrorPage(main, url);
    return Object(_common__WEBPACK_IMPORTED_MODULE_2__["animate"])(main, FADE_IN, _objectSpread(_objectSpread({}, SETTINGS), {}, {
      fill: 'forwards'
    }));
  })).subscribe();
  Promise.resolve(/*! import() eager */).then(__webpack_require__.bind(null, /*! @hydecorp/push-state */ "./node_modules/@hydecorp/push-state/lib/index.js"));
  window._pushState = pushStateEl;
})();

/***/ })

}]);
//# sourceMappingURL=push-state-hydejack-9.0.0-beta.1.js.map