(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["clap-button"],{

/***/ "../../clap-button/lib/api.js":
/*!***********************************************************!*\
  !*** /Users/qwtel/GitHub/hydecorp/clap-button/lib/api.js ***!
  \***********************************************************/
/*! exports provided: getClaps, mine, updateClapsApi, cleanUp */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getClaps", function() { return getClaps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mine", function() { return mine; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateClapsApi", function() { return updateClapsApi; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cleanUp", function() { return cleanUp; });
/* harmony import */ var uuid_class__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uuid-class */ "./node_modules/uuid-class/index.js");
/* harmony import */ var _json_request__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./json-request */ "../../clap-button/lib/json-request.js");
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util.js */ "../../clap-button/lib/util.js");
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};




var API = Reflect.get(window, 'GET_CLAPS_API') || "https://worker.getclaps.dev";
var fetchMap = new Map();
var referrerSent = false;
var getClaps = (href, parentHref, referrer) => __awaiter(void 0, void 0, void 0, function* () {
  var indexPromise = fetchMap.get(parentHref);

  if (!indexPromise) {
    fetchMap.set(parentHref, indexPromise = fetchMap.get(parentHref) || (() => __awaiter(void 0, void 0, void 0, function* () {
      var _a;

      var response = yield Object(_json_request__WEBPACK_IMPORTED_MODULE_1__["jsonFetch"])(new _json_request__WEBPACK_IMPORTED_MODULE_1__["ParamsURL"]('/views', Object.assign({
        href: parentHref
      }, referrer && !referrerSent ? {
        referrer
      } : {}), API), {
        method: 'POST',
        body: null,
        mode: 'cors',
        credentials: 'include'
      });
      referrerSent = true;

      if (response.ok && ((_a = response.headers.get('Content-Type')) === null || _a === void 0 ? void 0 : _a.includes('json'))) {
        return yield response.json();
      } else if (response.status === 404) {
        return {};
      } else if (response.status === 402) {
        throw response;
      } else {
        fetchMap.delete(parentHref);
        throw Error();
      }
    }))());
  }

  var index = yield indexPromise;
  return index[href] || {
    claps: 0
  };
});
var mine = (claps, href) => __awaiter(void 0, void 0, void 0, function* () {
  var url = new URL(href);
  url.search = '';
  var id = new uuid_class__WEBPACK_IMPORTED_MODULE_0__["UUID"]();
  var nonce = yield Object(_util_js__WEBPACK_IMPORTED_MODULE_2__["proofOfClap"])({
    url,
    claps,
    id
  });
  return {
    href: url.href,
    id,
    nonce
  };
});
var updateClapsApi = (claps, href, parentHref, id, nonce) => __awaiter(void 0, void 0, void 0, function* () {
  var _b;

  var responseP = Object(_json_request__WEBPACK_IMPORTED_MODULE_1__["jsonFetch"])(new _json_request__WEBPACK_IMPORTED_MODULE_1__["ParamsURL"]('/claps', {
    href
  }, API), {
    method: 'POST',
    body: {
      claps,
      id,
      nonce
    },
    mode: 'cors',
    credentials: 'include'
  });
  var response = yield responseP;

  if (response.ok && ((_b = response.headers.get('Content-Type')) === null || _b === void 0 ? void 0 : _b.includes('json'))) {
    fetchMap.delete(parentHref); // TODO: update in place instead?

    return response.clone().json();
  } else {
    throw Error();
  }
});
var cleanUp = parentHref => {
  fetchMap.delete(parentHref);
};

/***/ }),

/***/ "../../clap-button/lib/connected-count.js":
/*!***********************************************************************!*\
  !*** /Users/qwtel/GitHub/hydecorp/clap-button/lib/connected-count.js ***!
  \***********************************************************************/
/*! exports provided: ConnectedCountElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConnectedCountElement", function() { return ConnectedCountElement; });
/* harmony import */ var lit_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit-element */ "./node_modules/lit-element/lit-element.js");

var refCountMap = new Map();
var ref = Symbol('refCountKey');
class ConnectedCountElement extends lit_element__WEBPACK_IMPORTED_MODULE_0__["LitElement"] {
  get connectedCountKey() {
    throw Error();
  }

  allDisconnectedCallback() {}

  connectedCallback() {
    var _a;

    super.connectedCallback();
    this[ref] = (_a = this.connectedCountKey) !== null && _a !== void 0 ? _a : this;
    refCountMap.set(this[ref], 1 + (refCountMap.get(this[ref]) || 0));
  }

  disconnectedCallback() {
    var _a;

    super.disconnectedCallback();
    var refCount = ((refCountMap === null || refCountMap === void 0 ? void 0 : refCountMap.get(this[ref])) || 0) - 1;

    if (refCount > 0) {
      refCountMap.set(this[ref], refCount);
    } else {
      refCountMap.delete(this[ref]);
      (_a = this.allDisconnectedCallback) === null || _a === void 0 ? void 0 : _a.call(this);
    }
  }

}

/***/ }),

/***/ "../../clap-button/lib/index.js":
/*!*************************************************************!*\
  !*** /Users/qwtel/GitHub/hydecorp/clap-button/lib/index.js ***!
  \*************************************************************/
/*! exports provided: ClapConfig, ClapText, ClapButton */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClapConfig", function() { return ClapConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClapText", function() { return ClapText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClapButton", function() { return ClapButton; });
/* harmony import */ var lit_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit-element */ "./node_modules/lit-element/lit-element.js");
/* harmony import */ var lit_html_directives_class_map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lit-html/directives/class-map */ "./node_modules/lit-html/directives/class-map.js");
/* harmony import */ var lit_html_directives_style_map__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lit-html/directives/style-map */ "./node_modules/lit-html/directives/style-map.js");
/* harmony import */ var lit_html_directives_repeat__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lit-html/directives/repeat */ "./node_modules/lit-html/directives/repeat.js");
/* harmony import */ var lit_html_directives_unsafe_html_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lit-html/directives/unsafe-html.js */ "./node_modules/lit-html/directives/unsafe-html.js");
/* harmony import */ var kv_storage_polyfill__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! kv-storage-polyfill */ "./node_modules/kv-storage-polyfill/dist/kv-storage-polyfill.mjs");
/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./styles */ "../../clap-button/lib/styles.js");
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./api */ "../../clap-button/lib/api.js");
/* harmony import */ var _connected_count__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./connected-count */ "../../clap-button/lib/connected-count.js");
function _templateObject9() {
  var data = _taggedTemplateLiteral(["<span class=\"error\">Error</span>"]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = _taggedTemplateLiteral(["<span class=\"error\">Crypto required</span>"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _taggedTemplateLiteral(["<span class=\"error\">HTTPS required</span>"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["<a class=\"error\" href=\"", "\">Payment required</a>"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n      <div \n        class=", "\n        style=", "\n      >\n        <div class=\"shockwave\"></div>\n        <div class=", ">\n          <div class=\"count\">\n            ", "", "\n            ", "\n            ", "\n            ", "\n            ", "\n          </div>\n        </div>\n        <div class=", ">\n          <div style=\"font-size:smaller\">\n            ", "\n          </div>\n        </div>\n        ", "\n        ", "\n        ", "\n        <button\n          ?disabled=", "\n          @mousedown=", "\n          @touchstart=", "\n        ></button>\n      </div>\n      "]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["<g style=", ">\n            <circle style=", " cx=\"0\" cy=\"0\" r=\"1\"/>\n          </g>"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n      <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"-10 -10 20 20\">\n        <g class=\"sparkle\">\n          ", "\n        </g>\n      </svg>"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n    <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\" id=\"countdown-svg\">\n      <g class=\"countdown\">\n        <circle cx=\"50\" cy=\"50\" r=\"49\"/>\n      </g>\n    </svg>\n    "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n      <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 60 60\" id=\"hand-svg\">\n        <g class=\"flat\">\n          <path d=\"M57.0443547 6.86206897C57.6058817 6.46227795 57.7389459 5.67962382 57.3416215 5.11431557 56.9442971 4.54900731 56.1672933 4.41483804 55.6055588 4.81504702L52.4950525 7.030721C51.9335255 7.43051202 51.8004613 8.21316614 52.1977857 8.7784744 52.4404567 9.12371996 52.8251182 9.30825496 53.2153846 9.30825496 53.4640757 9.30825496 53.7152578 9.23343783 53.9338485 9.07753396L57.0443547 6.86206897zM48.8035059 6.1414838C48.94778 6.19623824 49.0959982 6.22215256 49.2415177 6.22215256 49.7455426 6.22215256 50.2198824 5.91201672 50.4075424 5.40898642L51.7485642 1.81818182C51.9906124 1.17011494 51.664906.447021944 51.0209664.203343783 50.3772345-.0405433647 49.6587706.287774295 49.4167224.93584117L48.0757006 4.52664577C47.83386 5.17471264 48.1595664 5.89780564 48.8035059 6.1414838zM58.5931726 11.6219436C58.5846615 11.6219436 58.5761504 11.6219436 58.5674317 11.6219436L54.7579749 11.6541275C54.0702341 11.6681296 53.5240687 12.1985371 53.5379772 12.8909091 53.551678 13.5745037 54.1065621 14.1297806 54.7828855 14.1297806 54.7913966 14.1297806 54.7999077 14.1297806 54.8086265 14.1297806L58.6180833 14.0643678C59.305824 14.0501567 59.8519894 13.4934169 59.838081 12.8010449 59.8243801 12.1174504 59.269496 11.6219436 58.5931726 11.6219436z\"/>\n          <path d=\"M37.1910045 6.68944619C37.7313574 6.14566353 38.4431784 5.8737722 39.155207 5.8737722 39.967916 5.8737722 40.7808327 6.22800418 41.3380002 6.93667712 42.2214969 8.06039707 42.0666359 9.69111808 41.0600392 10.7042842L39.777765 11.9949843C39.5801407 12.1276907 39.3877061 12.2695925 39.2075193 12.430303 39.0619998 11.5985371 38.7167801 10.7954023 38.1668781 10.0961338 37.4907623 9.23636364 36.588375 8.62424242 35.5772114 8.31410658L37.1910045 6.68944619zM28.5289586 3.66394984C29.0691039 3.12016719 29.7811325 2.84827586 30.4931611 2.84827586 31.3060777 2.84848485 32.1187868 3.20271682 32.6759543 3.91138976 33.559451 5.03510972 33.40459 6.66562173 32.3979933 7.67878788L17.6760235 22.3467085 17.6276554 20.6499478C17.6149925 19.014629 16.8595779 17.554441 15.6854573 16.5945664L28.5289586 3.66394984zM.624996757 36.9889537C.491717597 36.554099.508245877 35.7327064.906400646 35.2666667L3.45579518 32.2829676C3.45662553 32.2819923 4.33763118 25.8376176 6.09881213 12.9498433 6.09881213 11.4271682 7.33624726 10.1814002 8.84873717 10.1814002 10.3612271 10.1814002 11.5988698 11.4271682 11.5988698 12.9498433L11.6704878 15.4649948C9.18191673 15.8089864 7.24428555 17.9170324 7.14921001 20.492581L4.62804751 38.9475444 3.8946373 39.8060606C3.04504924 39.4926018 2.3776139 39.1458968 1.89233128 38.7659456 1.16440735 38.1960189.758275917 37.4238085.624996757 36.9889537z\"/>\n          <path d=\"M49.6070811,36.8942529 L42.4182909,44.1316614 C36.2784454,50.3128527 29.8604313,55.2743992 24.2225349,56.5113898 C24.0512744,56.5492163 23.8901857,56.6217346 23.7511014,56.7293626 L20.5013032,59.2417973 C20.2908084,59.4045977 20.1673015,59.6181154 19.5026647,59.6181154 C18.8380279,59.6181154 13.0160695,55.8303982 10.3595306,53.2846814 C7.96626306,50.9912532 3.77432047,43.9549368 4.44453927,43.0079415 L6.99372621,40.0244514 C6.99469496,40.0233368 7.87570061,33.578962 9.63674317,20.6913271 C9.63674317,19.168652 10.8743859,17.922675 12.3868758,17.922675 C13.8993657,17.922675 15.1368008,19.168652 15.1368008,20.6913271 L15.2667512,25.2522466 C15.2883404,26.0100313 15.907577,26.5034483 16.5519317,26.5034483 C16.8662207,26.5034483 17.1867374,26.3857889 17.4464306,26.1245559 L32.0670972,11.4054336 C32.6074501,10.861442 33.3190635,10.5897597 34.0312997,10.5897597 C34.8440088,10.5897597 35.6569254,10.9439916 36.214093,11.6526646 C37.0975897,12.7763845 36.942521,14.4071055 35.9359243,15.4202717 L25.8641449,25.5598746 C25.3412294,26.0865204 25.3412294,26.9398119 25.8641449,27.4660397 C26.1288202,27.7324974 26.4757006,27.8658307 26.822581,27.8658307 C27.1694614,27.8658307 27.5165494,27.7324974 27.7810172,27.4660397 L40.7291431,14.43093 C41.2692884,13.8869383 41.9811094,13.615256 42.6933456,13.615256 C43.5060547,13.615465 44.3189713,13.969697 44.8761389,14.6783699 C45.7596356,15.8018809 45.6045669,17.4326019 44.5979702,18.445768 L31.7106677,31.4198537 C31.1806943,31.953605 31.1806943,32.8183908 31.7106677,33.3521421 C31.9718141,33.615047 32.31392,33.7464995 32.656441,33.7464995 C32.9985469,33.7464995 33.3408603,33.615047 33.6020067,33.3521421 L43.7346096,23.1515152 C44.2749625,22.6075235 44.9867835,22.3358412 45.6988121,22.3358412 C46.5115212,22.3358412 47.3244378,22.6900731 47.8816054,23.3989551 C48.7651021,24.522466 48.6100334,26.153187 47.6034367,27.1663532 L37.5667397,37.2708464 C37.0245185,37.8165099 37.0245185,38.7017764 37.5667397,39.2474399 C37.8334909,39.5161964 38.161896,39.6422153 38.4900934,39.6422153 C38.8184984,39.6422153 39.1469035,39.5161964 39.3972552,39.2639498 L45.6195133,32.999791 C46.1802099,32.4353187 46.93085,32.1368861 47.678999,32.1368861 C48.2741552,32.1368861 48.8676508,32.3258098 49.361919,32.7197492 C50.682182,33.7717868 50.7639719,35.7297806 49.6070811,36.8942529 Z\"/>\n        </g>\n        <g class=\"outline\">\n          <path d=\"M57.1428763 6.63333333C57.6856856 6.24686869 57.8143144 5.49030303 57.4302341 4.94383838 57.0461538 4.39737374 56.2950502 4.26767677 55.7520401 4.65454545L52.7452174 6.79636364C52.202408 7.18282828 52.0737793 7.93939394 52.4578595 8.48585859 52.6924415 8.81959596 53.0642809 8.9979798 53.4415385 8.9979798 53.6819398 8.9979798 53.9247492 8.92565657 54.1360535 8.77494949L57.1428763 6.63333333zM49.1767224 5.93676768C49.3161873 5.98969697 49.4594649 6.01474747 49.6001338 6.01474747 50.0873579 6.01474747 50.5458863 5.71494949 50.727291 5.22868687L52.023612 1.75757576C52.257592 1.13111111 51.9427425.432121212 51.3202676.196565657 50.6979933-.0391919192 50.0034783.278181818 49.7694983.904646465L48.4731773 4.37575758C48.239398 5.00222222 48.5542475 5.70121212 49.1767224 5.93676768zM58.6400669 11.2345455C58.6318395 11.2345455 58.623612 11.2345455 58.6151839 11.2345455L54.932709 11.2656566C54.267893 11.2791919 53.7399331 11.7919192 53.7533779 12.4612121 53.7666221 13.1220202 54.30301 13.6587879 54.9567893 13.6587879 54.9650167 13.6587879 54.9732441 13.6587879 54.9816722 13.6587879L58.6641472 13.5955556C59.3289632 13.5818182 59.8569231 13.0436364 59.8434783 12.3743434 59.8302341 11.7135354 59.2938462 11.2345455 58.6400669 11.2345455zM51.2107023 29.7280808C50.5940468 29.2365657 49.8640134 28.9020202 49.0922408 28.7448485 49.1432107 28.6519192 49.1907692 28.5573737 49.2357191 28.4614141L49.7189298 27.9749495C51.5799331 26.1012121 51.7753846 23.1519192 50.1732441 21.1141414 49.4169231 20.1523232 48.3670234 19.5131313 47.2009365 19.2745455 47.284214 19.120202 47.3580602 18.9624242 47.4250836 18.8022222 48.6925084 16.9539394 48.6718395 14.469899 47.2681605 12.6844444 46.5116388 11.7220202 45.4613378 11.0808081 44.2946488 10.8426263 45.2578595 9.05959596 45.1348495 6.83737374 43.8481605 5.20121212 42.8753177 3.96383838 41.4182609 3.25393939 39.8502341 3.25393939 38.5946488 3.25393939 37.4101003 3.70565657 36.480602 4.53272727 36.3399331 3.72888889 36.0064214 2.95252525 35.4748495 2.27636364 34.501806 1.0389899 33.0447492.329292929 31.4767224.329090909 30.1141806.329090909 28.8351171.861414141 27.8753177 1.82767677L15.6666221 14.1185859 15.6200669 12.4781818C15.5985953 9.68424242 13.3340468 7.41777778 10.5537793 7.41777778 7.8238796 7.41777778 5.59143813 9.60262626 5.49110368 12.3264646L3.05377926 30.1660606 1.05050167 32.510303C-.150100334 33.9157576.751318148 36.4103164 1.05050167 37.002855 1.3496852 37.5953936 1.66593319 37.9666982 2.51271962 38.8651283 2.8050341 39.1752704 3.3712736 39.6680391 4.21143813 40.3434343 3.2935786 41.7335354 4.72327715 47.298456 9.51045561 52.4226263 15.4436869 58.7735254 20.1888963 59.9262626 21.1316388 59.9262626 21.9056187 59.9262626 22.6703679 59.6646465 23.2846154 59.189899L26.2031438 56.9337374C29.0107023 56.2660606 32.1060201 54.7492929 35.4086288 52.4226263 38.2924415 50.3907071 41.4210702 47.6832323 44.7070234 44.3749495L51.656388 37.3787879C52.681204 36.3470707 53.220602 34.9165657 53.1363211 33.4541414 53.0520401 31.9941414 52.350301 30.6361616 51.2107023 29.7280808zM37.9513043 6.46646465C38.4736455 5.94080808 39.1617391 5.6779798 39.8500334 5.6779798 40.6356522 5.6779798 41.4214716 6.02040404 41.9600669 6.70545455 42.8141137 7.79171717 42.6644147 9.36808081 41.6913712 10.3474747L40.4518395 11.5951515C40.2608027 11.7234343 40.0747826 11.8606061 39.900602 12.0159596 39.7599331 11.2119192 39.4262207 10.4355556 38.8946488 9.75959596 38.2410702 8.92848485 37.3687625 8.33676768 36.3913043 8.0369697L37.9513043 6.46646465zM29.5779933 3.54181818C30.1001338 3.01616162 30.7884281 2.75333333 31.4767224 2.75333333 32.2625418 2.75353535 33.0481605 3.0959596 33.5867559 3.7810101 34.4408027 4.86727273 34.2911037 6.44343434 33.3180602 7.42282828L19.0868227 21.6018182 19.0400669 19.9616162C19.0278261 18.3808081 18.297592 16.9692929 17.1626087 16.0414141L29.5779933 3.54181818zM2.60416353 35.7559886C2.47532701 35.335629 2.49130435 34.5416162 2.87618729 34.0911111L5.34060201 31.2068687C5.34140468 31.2059259 6.19304348 24.9763636 7.89551839 12.5181818 7.89551839 11.0462626 9.09170569 9.8420202 10.5537793 9.8420202 12.0158528 9.8420202 13.2122408 11.0462626 13.2122408 12.5181818L13.2814716 14.9494949C10.8758528 15.2820202 9.00280936 17.319798 8.91090301 19.8094949L6.47377926 37.6492929 5.76481605 38.4791919C4.9435476 38.1761817 4.2983601 37.8410335 3.82925357 37.4737474 3.12559377 36.9228183 2.73300005 36.1763482 2.60416353 35.7559886zM49.9535117 35.6644444L43.0043478 42.6606061C37.0691639 48.6357576 30.8650836 53.4319192 25.4151171 54.6276768 25.2495652 54.6642424 25.0938462 54.7343434 24.959398 54.8383838L21.8179264 57.2670707C21.6144482 57.4244444 21.4950582 57.6308449 20.8525759 57.6308449 20.2100936 57.6308449 14.5822005 53.9693849 12.0142129 51.5085254 9.70072096 49.2915447 5.64850979 42.4897722 6.29638796 41.5743434L8.76060201 38.690303C8.76153846 38.6892256 9.61317726 32.4596633 11.3155184 20.0016162 11.3155184 18.529697 12.5119064 17.3252525 13.9739799 17.3252525 15.4360535 17.3252525 16.6322408 18.529697 16.6322408 20.0016162L16.7578595 24.4105051C16.7787291 25.1430303 17.3773244 25.62 18.0002007 25.62 18.3040134 25.62 18.6138462 25.5062626 18.8648829 25.2537374L32.998194 11.0252525C33.5205351 10.4993939 34.2084281 10.2367677 34.8969231 10.2367677 35.6825418 10.2367677 36.4683612 10.5791919 37.0069565 11.2642424 37.8610033 12.3505051 37.7111037 13.9268687 36.7380602 14.9062626L27.0020067 24.7078788C26.4965217 25.2169697 26.4965217 26.0418182 27.0020067 26.5505051 27.2578595 26.8080808 27.5931773 26.9369697 27.928495 26.9369697 28.2638127 26.9369697 28.5993311 26.8080808 28.8549833 26.5505051L41.371505 13.949899C41.8936455 13.4240404 42.5817391 13.1614141 43.2702341 13.1614141 44.0558528 13.1616162 44.8416722 13.5040404 45.3802676 14.1890909 46.2343144 15.2751515 46.0844147 16.8515152 45.1113712 17.8309091L32.6536455 30.3725253C32.1413378 30.8884848 32.1413378 31.7244444 32.6536455 32.240404 32.906087 32.4945455 33.2367893 32.6216162 33.567893 32.6216162 33.8985953 32.6216162 34.2294983 32.4945455 34.4819398 32.240404L44.2767893 22.379798C44.7991304 21.8539394 45.4872241 21.5913131 46.1755184 21.5913131 46.9611371 21.5913131 47.7469565 21.9337374 48.2855518 22.6189899 49.1395987 23.7050505 48.989699 25.2814141 48.0166555 26.2608081L38.3145151 36.0284848C37.7903679 36.5559596 37.7903679 37.4117172 38.3145151 37.9391919 38.5723746 38.1989899 38.8898328 38.3208081 39.2070903 38.3208081 39.5245485 38.3208081 39.8420067 38.1989899 40.0840134 37.9551515L46.0988629 31.899798C46.6408696 31.3541414 47.3664883 31.0656566 48.089699 31.0656566 48.6650167 31.0656566 49.2387291 31.2482828 49.7165217 31.6290909 50.9927759 32.6460606 51.0718395 34.5387879 49.9535117 35.6644444z\"/>\n        </g>\n      </svg>"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};





 // @ts-ignore





var TextPlacement;

(function (TextPlacement) {
  TextPlacement["Top"] = "top";
  TextPlacement["Bottom"] = "bottom";
})(TextPlacement || (TextPlacement = {}));

var ErrorTypes;

(function (ErrorTypes) {
  ErrorTypes[ErrorTypes["PaymentRequired"] = 1] = "PaymentRequired";
  ErrorTypes[ErrorTypes["HTTPSRequired"] = 2] = "HTTPSRequired";
  ErrorTypes[ErrorTypes["CryptoRequired"] = 3] = "CryptoRequired";
  ErrorTypes[ErrorTypes["Generic"] = 4] = "Generic";
})(ErrorTypes || (ErrorTypes = {}));

var WEBSITE = "https://getclaps.dev";
var TIMER = 2500;
var ANIM_DELAY = 250;
var storage = new kv_storage_polyfill__WEBPACK_IMPORTED_MODULE_5__["StorageArea"]('clap-button');

var arrayOfSize = size => [...new Array(size).keys()];

var formatClaps = claps => claps != null ? claps.toLocaleString('en') : ''; // toggle a CSS class to re-trigger animations


var toggleClass = function toggleClass(element) {
  for (var _len = arguments.length, cls = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    cls[_key - 1] = arguments[_key];
  }

  element.classList.remove(...cls); // Force layout reflow

  void element.offsetWidth;
  element.classList.add(...cls);
};

var debounce = (fn, delay) => {
  var timer;
  return function () {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

var getParentHref = href => {
  var parentURL = new URL(href);
  parentURL.hash = '';
  parentURL.search = '';
  return parentURL.href;
};

var ClapConfig = class ClapConfig extends lit_element__WEBPACK_IMPORTED_MODULE_0__["LitElement"] {};
ClapConfig = __decorate([Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["customElement"])('clap-config')], ClapConfig);

var ClapText = class ClapText extends lit_element__WEBPACK_IMPORTED_MODULE_0__["LitElement"] {
  constructor() {
    super(...arguments);
    this.at = 1;
  }

};

__decorate([Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["property"])({
  type: Number,
  reflect: true
})], ClapText.prototype, "at", void 0);

ClapText = __decorate([Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["customElement"])('clap-text')], ClapText);

var ClapButton = class ClapButton extends _connected_count__WEBPACK_IMPORTED_MODULE_8__["ConnectedCountElement"] {
  constructor() {
    super(...arguments);
    this.el = this;
    this.textPlacement = TextPlacement.Top;
    this.noWave = false;
    this.totalClaps = 0;
    this.loading = false;
    this.clapped = false;
    this.clicking = false;
    this.bufferedClaps = 0;
    this.ready = false;
    this.error = null;
    this.noAnimation = false;

    this.clappedCallback = (_ref) => {
      var {
        target,
        detail: {
          href,
          claps
        }
      } = _ref;

      if (target !== this && [href, getParentHref(href)].includes(this.canonical)) {
        this.clapped = true;
        this.totalClaps += claps;
        toggleClass(this.styleRootEl, "clap");
      }
    };

    this.updateClaps = debounce(() => __awaiter(this, void 0, void 0, function* () {
      var claps = this.bufferedClaps;
      this.bufferedClaps = 0;
      this.loading = true;
      var {
        href,
        id,
        nonce
      } = yield Object(_api__WEBPACK_IMPORTED_MODULE_7__["mine"])(claps, this.canonical);
      var {
        claps: totalClaps
      } = yield Object(_api__WEBPACK_IMPORTED_MODULE_7__["updateClapsApi"])(claps, href, this.parentHref, id, nonce);
      this.loading = false;
      this.clicking = false;
      this.styleRootEl.classList.remove('ticking');
      toggleClass(this.styleRootEl, "clap");
      this.dispatchEvent(new CustomEvent("clapped", {
        bubbles: true,
        detail: {
          claps,
          totalClaps,
          href: href
        }
      })); // MAYBE: Replace with animation finish event!?

      setTimeout(() => {
        this.totalClaps = totalClaps;
      }, ANIM_DELAY);
      var data = (yield storage.get(href)) || {
        claps: 0
      };
      yield storage.set(href, Object.assign(Object.assign({}, data), {
        claps: data.claps + claps
      }));
    }), TIMER);

    this.clickCallback = event => {
      if (event.button !== 0) {
        return;
      }

      event.preventDefault();
      this.clapped = true;
      this.clicking = true;
      this.bufferedClaps++;
      toggleClass(this.styleRootEl, "clap", "ticking");
      this.updateClaps();
      this.totalClaps = this.bufferedClaps;
    };
  }

  get canonical() {
    return this._canonical || (() => {
      var href = this.href || this.url;
      var metaEl = this.ownerDocument.head.querySelector('link[rel=canonical]');
      var location = metaEl != null ? new URL(metaEl.href) : this.ownerDocument.location;
      return this._canonical = href ? new URL(href, location.origin).href : location.href;
    })();
  }

  get parentHref() {
    return this._parentHref || (() => {
      return this._parentHref = getParentHref(this.canonical);
    })();
  }

  get referrer() {
    var usp = new URLSearchParams(this.ownerDocument.location.search);
    return usp.get('referrer') || usp.get('referer') || this.ownerDocument.referrer;
  }

  connectedCallback() {
    var _super = Object.create(null, {
      connectedCallback: {
        get: () => super.connectedCallback
      }
    });

    var _a, _b, _c, _d;

    return __awaiter(this, void 0, void 0, function* () {
      _super.connectedCallback.call(this);

      var {
        location
      } = this.ownerDocument;

      if (location.hostname !== 'localhost' && location.protocol !== 'https:') {
        this.error = ErrorTypes.HTTPSRequired;
        return;
      }

      if ('crypto' in window && 'subtle' in window.crypto && 'digest' in window.crypto.subtle) {
        /* ok */
      } else {
        this.error = ErrorTypes.CryptoRequired;
        return;
      } // @ts-ignore


      this.ownerDocument.documentElement.addEventListener('clapped', this.clappedCallback);
      this.intersectionObserver = new IntersectionObserver(entries => {
        entries.forEach(x => x.target.noAnimation = !x.isIntersecting);
      });
      this.intersectionObserver.observe(this); // const themeColorEl = document.head.querySelector('meta[name=theme-color]') as HTMLMetaElement | null;
      // if (themeColorEl) {
      //   this.el.style.setProperty('--theme-color', themeColorEl.content);
      // }

      this.msgs = new Map((_d = (_c = Array.from((_b = (_a = this.ownerDocument.querySelector('clap-config')) === null || _a === void 0 ? void 0 : _a.querySelectorAll('clap-text')) !== null && _b !== void 0 ? _b : [])) === null || _c === void 0 ? void 0 : _c.map(x => [x.at, x.innerHTML])) === null || _d === void 0 ? void 0 : _d.sort((_ref2, _ref3) => {
        var [a] = _ref2;
        var [b] = _ref3;
        return b - a;
      }));
      this.loading = true;
      this.clapped = (yield storage.get(this.canonical)) != null;

      try {
        var {
          claps
        } = yield Object(_api__WEBPACK_IMPORTED_MODULE_7__["getClaps"])(this.canonical, this.parentHref, this.referrer);
        this.loading = false;
        this.ready = true;
        this.totalClaps = claps;
      } catch (err) {
        this.loading = false;
        this.ready = false;
        this.error = err.status === 402 ? ErrorTypes.PaymentRequired : ErrorTypes.Generic;
      }
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.intersectionObserver.unobserve(this); // @ts-ignore

    this.ownerDocument.documentElement.removeEventListener('clapped', this.clappedCallback);
  } // Ref-counts all elements with the same `parentHref` and invokes `allDisconnectedCallback` when the count reaches 0.


  get connectedCountKey() {
    return this.parentHref;
  }

  allDisconnectedCallback() {
    Object(_api__WEBPACK_IMPORTED_MODULE_7__["cleanUp"])(this.parentHref);
  }

  render() {
    var _a, _b;

    var hand = Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["svg"])(_templateObject());
    var circle = Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["svg"])(_templateObject2());
    var x = this.bufferedClaps;
    var n = 5 + x;
    var BASE_MAX_DELAY = 300;
    var maxDelay = BASE_MAX_DELAY * (1 - Math.pow(Math.E, -x / 15));
    var sparkle = Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["svg"])(_templateObject3(), Object(lit_html_directives_repeat__WEBPACK_IMPORTED_MODULE_3__["repeat"])(arrayOfSize(n), i => i, i => Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["svg"])(_templateObject4(), Object(lit_html_directives_style_map__WEBPACK_IMPORTED_MODULE_2__["styleMap"])({
      transform: "rotate(".concat(Math.floor(360 / n * i), "deg) translateX(10px)")
    }), Object(lit_html_directives_style_map__WEBPACK_IMPORTED_MODULE_2__["styleMap"])({
      animationDelay: "".concat(Math.floor(Math.random() * maxDelay), "ms")
    }))));
    return Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["html"])(_templateObject5(), Object(lit_html_directives_class_map__WEBPACK_IMPORTED_MODULE_1__["classMap"])({
      'style-root': true,
      'loading': this.loading,
      'clapped': this.clapped,
      'no-shockwave': this.noWave || !this.ready,
      'no-animation': this.noAnimation
    }), Object(lit_html_directives_style_map__WEBPACK_IMPORTED_MODULE_2__["styleMap"])(_objectSpread({}, this.error != null ? {
      '--clap-button-color': 'indianred'
    } : {})), Object(lit_html_directives_class_map__WEBPACK_IMPORTED_MODULE_1__["classMap"])({
      'count-container': true,
      'container-top': this.textPlacement === TextPlacement.Top,
      'container-bottom': this.textPlacement === TextPlacement.Bottom
    }), this.clicking ? '+' : '', this.ready ? formatClaps(this.totalClaps) : '', this.error === ErrorTypes.PaymentRequired ? Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["html"])(_templateObject6(), WEBSITE) : null, this.error === ErrorTypes.HTTPSRequired ? Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["html"])(_templateObject7()) : null, this.error === ErrorTypes.CryptoRequired ? Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["html"])(_templateObject8()) : null, this.error === ErrorTypes.Generic ? Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["html"])(_templateObject9()) : null, Object(lit_html_directives_class_map__WEBPACK_IMPORTED_MODULE_1__["classMap"])({
      'count-container': true,
      'container-top': this.textPlacement === TextPlacement.Bottom,
      'container-bottom': this.textPlacement === TextPlacement.Top
    }), this.clicking ? Object(lit_html_directives_unsafe_html_js__WEBPACK_IMPORTED_MODULE_4__["unsafeHTML"])((_b = (_a = [...this.msgs].find((_ref4) => {
      var [x] = _ref4;
      return this.totalClaps >= x;
    })) === null || _a === void 0 ? void 0 : _a[1]) !== null && _b !== void 0 ? _b : '') : '', hand, sparkle, circle, this.loading || !this.ready, this.loading || !this.ready ? null : this.clickCallback, this.loading || !this.ready ? null : this.clickCallback);
  }

};
ClapButton.styles = _styles__WEBPACK_IMPORTED_MODULE_6__["styles"];

__decorate([Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["query"])('.style-root')], ClapButton.prototype, "styleRootEl", void 0);

__decorate([Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["property"])({
  type: String,
  reflect: true,
  attribute: 'text-placement'
})], ClapButton.prototype, "textPlacement", void 0);

__decorate([Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["property"])({
  type: Boolean,
  reflect: true
})], ClapButton.prototype, "noWave", void 0);

__decorate([Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["property"])({
  type: String,
  reflect: false
})], ClapButton.prototype, "href", void 0);

__decorate([Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["property"])({
  type: String,
  reflect: false
})], ClapButton.prototype, "url", void 0);

__decorate([Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["property"])()], ClapButton.prototype, "totalClaps", void 0);

__decorate([Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["property"])()], ClapButton.prototype, "loading", void 0);

__decorate([Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["property"])()], ClapButton.prototype, "clapped", void 0);

__decorate([Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["property"])()], ClapButton.prototype, "clicking", void 0);

__decorate([Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["property"])()], ClapButton.prototype, "bufferedClaps", void 0);

__decorate([Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["property"])()], ClapButton.prototype, "ready", void 0);

__decorate([Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["property"])()], ClapButton.prototype, "error", void 0);

__decorate([Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["property"])()], ClapButton.prototype, "noAnimation", void 0);

ClapButton = __decorate([Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["customElement"])('clap-button')], ClapButton);


/***/ }),

/***/ "../../clap-button/lib/json-request.js":
/*!********************************************************************!*\
  !*** /Users/qwtel/GitHub/hydecorp/clap-button/lib/json-request.js ***!
  \********************************************************************/
/*! exports provided: SearchParamsURL, SearchURL, ParamsURL, JSONRequest, JSONResponse, urlWithParams, jsonFetch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchParamsURL", function() { return SearchParamsURL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchURL", function() { return SearchParamsURL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ParamsURL", function() { return SearchParamsURL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JSONRequest", function() { return JSONRequest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JSONResponse", function() { return JSONResponse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "urlWithParams", function() { return urlWithParams; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "jsonFetch", function() { return jsonFetch; });
var __rest = undefined && undefined.__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

class SearchParamsURL extends URL {
  constructor(url) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var base = arguments.length > 2 ? arguments[2] : undefined;
    super(url.toString(), base);

    for (var [k, v] of Object.entries(params)) {
      this.searchParams.append(k, v);
    }
  }

}


function isBodyInit(b) {
  return b == null || typeof b === 'string' || typeof Blob !== 'undefined' && b instanceof Blob || typeof ArrayBuffer !== 'undefined' && (b instanceof ArrayBuffer || ArrayBuffer.isView(b)) || typeof FormData !== 'undefined' && b instanceof FormData || typeof URLSearchParams !== 'undefined' && b instanceof URLSearchParams || typeof ReadableStream !== 'undefined' && b instanceof ReadableStream;
}

class JSONRequest extends Request {
  constructor(input, init, replacer, space) {
    var _a = init || {},
        {
      headers: h,
      body: b
    } = _a,
        i = __rest(_a, ["headers", "body"]);

    var bi = isBodyInit(b);
    var body = bi ? b : JSON.stringify(b, replacer, space);
    var headers = new Headers(h);
    if (!headers.has('Content-Type') && !bi) headers.set('Content-Type', JSONRequest.contentType);
    if (!headers.has('Accept')) headers.set('Accept', JSONRequest.accept);
    super(input instanceof URL ? input.toString() : input, Object.assign({
      headers,
      body
    }, i));
  }

}
JSONRequest.contentType = 'application/json;charset=UTF-8';
JSONRequest.accept = 'application/json, text/plain, */*';
class JSONResponse extends Response {
  constructor(body, init, replacer, space) {
    var _a = init || {},
        {
      headers: h
    } = _a,
        i = __rest(_a, ["headers"]);

    var bi = isBodyInit(body);
    var b = bi ? body : JSON.stringify(body, replacer, space);
    var headers = new Headers(h);
    if (!headers.has('Content-Type') && !bi) headers.set('Content-Type', JSONResponse.contentType);
    super(b, Object.assign({
      headers
    }, i));
  }

}
JSONResponse.contentType = 'application/json;charset=UTF-8';
/** @deprecated Use {@link SearchParamsURL} instead */

var urlWithParams = (url, params, base) => {
  return new SearchParamsURL(url, params, base).href;
};
function jsonFetch(input, init, replacer, space) {
  return fetch(new JSONRequest(input, init, replacer, space));
}

/***/ }),

/***/ "../../clap-button/lib/styles.js":
/*!**************************************************************!*\
  !*** /Users/qwtel/GitHub/hydecorp/clap-button/lib/styles.js ***!
  \**************************************************************/
/*! exports provided: styles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "styles", function() { return styles; });
/* harmony import */ var lit_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit-element */ "./node_modules/lit-element/lit-element.js");
function _templateObject() {
  var data = _taggedTemplateLiteral(["\n:host {\n  display: block;\n  position: relative;\n  width: 5em;\n  height: 5em;\n  margin: 5em auto;\n}\n.style-root {\n  position: absolute;\n  fill: var(--clap-button-color, var(--theme-color, rgb(79,177,186)));\n  stroke: var(--clap-button-color, var(--theme-color, rgb(79,177,186)));\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0; }\n  .style-root .error { color: indianred }\n  .style-root button {\n    -webkit-tap-highlight-color: transparent;\n    cursor: pointer; \n    border: none;\n    background: none;\n    margin: 0;\n    padding: 0;\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%; }\n  .style-root button:disabled {\n    cursor: default; }\n  .style-root .shockwave {\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    color: var(--clap-button-color, var(--theme-color, rgb(79,177,186)));\n    border-radius: 50%; }\n  .style-root svg {\n    position: absolute;\n    width: 60%;\n    height: 60%;\n    margin: 20%;\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    opacity: 0.8;\n    stroke: none;\n    overflow: visible !important; }\n    .style-root svg g.flat {\n      visibility: hidden; }\n    .style-root svg g.outline {\n      visibility: visible; }\n  .style-root.clapped:not(.loading) svg g.flat {\n    visibility: visible; }\n  .style-root.clapped svg g.outline {\n    visibility: hidden; }\n  .style-root.loading svg g.outline {\n    visibility: visible; }\n  .style-root .count-container {\n    position: absolute;\n    width: 100%;\n    color: inherit;\n    user-select: none; }\n  .style-root .count-container.container-top {\n    top: -2.5em; }\n  .style-root .count-container.container-bottom {\n    bottom: -2.5em; }\n    .style-root .count-container > div {\n      width: 300%;\n      margin-left: -100%;\n      text-align: center; }\n  .style-root g.sparkle circle {\n    opacity: 0;\n    stroke-width: 0; }\n  .style-root:not(.clapped):not(.no-shockwave):not(.no-animation) .shockwave {\n    animation-name: shockwave;\n    animation-duration: 1.5s;\n    animation-iteration-count: infinite;\n    animation-timing-function: ease-in; }\n  .style-root.clap {\n    animation-name: pulse;\n    animation-duration: 0.5s;\n    animation-iteration-count: 1; \n    animation-timing-function: ease-out; }\n    .style-root.clap .sparkle circle {\n      animation-name: explode;\n      animation-duration: 0.5s;\n      animation-iteration-count: 1; }\n    .style-root.clap .container-top .count {\n      animation-name: hide-then-show;\n      animation-duration: 0.5s;\n      animation-iteration-count: 1; }\n    .style-root.clap .container-bottom .count {\n      animation-name: hide-then-show-inverse;\n      animation-duration: 0.5s;\n      animation-iteration-count: 1; }\n\n#hand-svg {\n  margin-top: 22%;\n  margin-left: 22%; }\n#countdown-svg {\n  width: 100%;\n  height: 100%;\n  stroke: var(--clap-button-color, var(--theme-color, rgb(79,177,186)));\n  margin: 0; }\n\n.countdown {\n  fill: none; \n  transform: rotateZ(0deg);\n  transform-origin: center; }\n\n.countdown circle {\n  stroke-width: 2px;\n  opacity: 1;\n  stroke-linecap: round;\n  stroke-dasharray: 308 308;\n  transform: rotate(-90deg);\n  transform-origin: center; }\n\n.style-root.ticking .countdown circle {\n  animation-timing-function: ease;\n  animation-name: countdown;\n  animation-duration: 2.5s; }\n\n.style-root.loading .countdown {\n  animation: 2s linear infinite svg-animation; }\n.style-root.loading .countdown circle {\n  animation: 1.4s ease-in-out infinite both circle-animation;\n  stroke-dasharray: 308;\n  stroke-dashoffset: 302; }\n\n@keyframes svg-animation {\n  0% {\n    transform: rotateZ(-90deg); }\n  100% {\n    transform: rotateZ(270deg); } }\n\n@keyframes circle-animation {\n  0%,\n  15% {\n    stroke-dashoffset: 280;\n    transform: rotate(0); }\n  50%,\n  65% {\n    stroke-dashoffset: 75;\n    transform: rotate(45deg); }\n  100% {\n    stroke-dashoffset: 280;\n    transform: rotate(360deg); } }\n\n@keyframes countdown {\n  0% {\n    stroke-dasharray: 308 308; }\n  25% {\n    stroke-dasharray: 308 308; }\n  100% {\n    stroke-dasharray: 0 308; } }\n\n@keyframes explode {\n  0% {\n    transform: translateX(10px);\n    opacity: 0; }\n  50% {\n    opacity: 1; }\n  100% {\n    opacity: 0;\n    transform: translateX(25px); } }\n\n@keyframes shockwave {\n  0% {\n    transform: scale(1);\n    opacity: 1; \n    box-shadow: 0 0 2px, inset 0 0 1px; }\n  89.99% {\n    transform: scale(1);\n    opacity: 0;\n    box-shadow: 0 0 50px, inset 0 0 10px; }\n  90%, 100% {\n    transform: scale(1);\n    opacity: 0;\n    box-shadow: 0 0 2px, inset 0 0 1px; } }\n\n@keyframes pulse {\n  0% {\n    transform: scale(1); }\n  25% {\n    transform: scale(1.1); }\n  100% {\n    transform: scale(1); } }\n\n@keyframes hide-then-show {\n  0% {\n    opacity: 1;\n    transform: translateY(0); }\n  20% {\n    opacity: 0;\n    transform: translateY(-10px); }\n  50% {\n    transform: translateY(10px); }\n  80% {\n    transform: translateY(10px);\n    opacity: 0; }\n  100% {\n    opacity: 1;\n    transform: translateY(0); } }\n\n@keyframes hide-then-show-inverse {\n  0% {\n    opacity: 1;\n    transform: translateY(0); }\n  20% {\n    opacity: 0;\n    transform: translateY(10px); }\n  50% {\n    transform: translateY(-10px); }\n  80% {\n    transform: translateY(-10px);\n    opacity: 0; }\n  100% {\n    opacity: 1;\n    transform: translateY(0); } }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }


var styles = Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["css"])(_templateObject());

/***/ }),

/***/ "../../clap-button/lib/util.js":
/*!************************************************************!*\
  !*** /Users/qwtel/GitHub/hydecorp/clap-button/lib/util.js ***!
  \************************************************************/
/*! exports provided: proofOfClap, checkProofOfClap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "proofOfClap", function() { return proofOfClap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkProofOfClap", function() { return checkProofOfClap; });
/* harmony import */ var uuid_class__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uuid-class */ "./node_modules/uuid-class/index.js");
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};


var BASE_DIFFICULTY = 8;
var BASE_CLAPS = 15;

function concatArrayBuffers() {
  for (var _len = arguments.length, abs = new Array(_len), _key = 0; _key < _len; _key++) {
    abs[_key] = arguments[_key];
  }

  var u8s = abs.map(a => new Uint8Array(a));
  var size = u8s.reduce((size, u8) => size + u8.length, 0);
  var res = new Uint8Array(size);
  var i = 0;

  for (var u8 of u8s) {
    res.set(u8, i);
    i += u8.length;
  }

  return res.buffer;
}

var sha256 = data => crypto.subtle.digest('SHA-256', data);

var digest = message => sha256(new TextEncoder().encode(message));

function makeKey(_ref) {
  var {
    url,
    id,
    claps,
    nonce
  } = _ref;
  return __awaiter(this, void 0, void 0, function* () {
    return concatArrayBuffers(yield digest(url.toString()), new uuid_class__WEBPACK_IMPORTED_MODULE_0__["UUID"](id.toString()).buffer, new Uint32Array([claps]).buffer, new Uint32Array([nonce]).buffer);
  });
}

function leadingZeros(ab, n) {
  var u8 = new Uint8Array(ab);
  var nb = Math.ceil(n / 8);

  for (var i = 0; i < nb; i++) {
    var ni = Math.min(8, n - i * 8);

    for (var j = 0; j < ni; j++) {
      if ((u8[i] >> 7 - j & 0b00000001) !== 0) return false;
    }
  }

  return true;
}

var calcDifficulty = claps => BASE_DIFFICULTY + Math.round(Math.log2(BASE_CLAPS + claps));

function proofOfClap(_ref2) {
  var {
    url,
    claps,
    id
  } = _ref2;
  return __awaiter(this, void 0, void 0, function* () {
    var difficulty = calcDifficulty(claps);
    var nonce = 0;
    var key = new Uint32Array(yield makeKey({
      url,
      id,
      claps,
      nonce
    }));
    var hash = yield sha256(key);

    while (!leadingZeros(hash, difficulty)) {
      nonce++;
      key[key.length - 1] = nonce;
      hash = yield sha256(key);
    }

    return nonce;
  });
}
function checkProofOfClap(_ref3) {
  var {
    url,
    claps,
    id,
    nonce
  } = _ref3;
  return __awaiter(this, void 0, void 0, function* () {
    var difficulty = calcDifficulty(claps);
    var hash = yield sha256(yield makeKey({
      url,
      id,
      claps,
      nonce
    }));
    return leadingZeros(hash, difficulty);
  });
}

/***/ }),

/***/ "./_js/src/clap-button.js":
/*!********************************!*\
  !*** ./_js/src/clap-button.js ***!
  \********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common */ "./_js/src/common.js");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Copyright (c) 2020 Florian Klampfer <https://qwtel.com/>
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
  yield Promise.all([...('customElements' in window ? [] : [Promise.all(/*! import() | webcomponents */[__webpack_require__.e("vendors~webcomponents"), __webpack_require__.e("webcomponents")]).then(__webpack_require__.bind(null, /*! ./polyfills/webcomponents */ "./_js/src/polyfills/webcomponents.js")).then(() => Promise.all(/*! import() | shadydom */[__webpack_require__.e("vendors~shadydom"), __webpack_require__.e("shadydom")]).then(__webpack_require__.bind(null, /*! ./polyfills/shadydom */ "./_js/src/polyfills/shadydom.js")))])]);
  yield _common__WEBPACK_IMPORTED_MODULE_0__["webComponentsReady"];
  yield _common__WEBPACK_IMPORTED_MODULE_0__["stylesheetReady"];
  if (true) window.GET_CLAPS_API = "http://localhost:8787";
  Promise.resolve(/*! import() eager */).then(__webpack_require__.bind(null, /*! @getclaps/button */ "../../clap-button/lib/index.js"));
})();

/***/ })

}]);
//# sourceMappingURL=clap-button-hydejack-9.1.0-beta.4.js.map