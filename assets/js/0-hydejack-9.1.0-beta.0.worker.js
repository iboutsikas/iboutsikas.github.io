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
 * Powered by Hydejack v9.1.0-beta.0 <https://hydejack.com/>
 */!function(e){var t={};function n(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(r,i,function(t){return e[t]}.bind(null,i));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/assets/js/",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);const r=function(){function e(){}return e.prototype.then=function(t,n){const r=new e,u=this.s;if(u){const e=1&u?t:n;if(e){try{i(r,1,e(this.v))}catch(e){i(r,2,e)}return r}return this}return this.o=function(e){try{const u=e.v;1&e.s?i(r,1,t?t(u):u):n?i(r,1,n(u)):i(r,2,u)}catch(e){i(r,2,e)}},r},e}();function i(e,t,n){if(!e.s){if(n instanceof r){if(!n.s)return void(n.o=i.bind(null,e,t));1&t&&(t=n.s),n=n.v}if(n&&n.then)return void n.then(i.bind(null,e,t),i.bind(null,e,2));e.s=t,e.v=n;const u=e.o;u&&u(e)}}var u=0,o="function"==typeof WeakMap?WeakMap:function(){var e="function"==typeof Symbol?Symbol(0):"__weak$"+ ++u;this.set=function(t,n){t[e]=n},this.get=function(t){return t[e]}};function s(e,t){return new Promise((function(n,r){e.onsuccess=function(){var r=e.result;t&&(r=t(r)),n(r)},e.onerror=function(){r(e.error)}}))}function c(e,t){return s(e.openCursor(t),(function(e){return e?[e.key,e.value]:[]}))}function a(e){return new Promise((function(t,n){e.oncomplete=function(){t()},e.onabort=function(){n(e.error)},e.onerror=function(){n(e.error)}}))}function f(e){if(!function(e){if("number"==typeof e||"string"==typeof e)return!0;if("object"==typeof e&&e){if(Array.isArray(e))return!0;if("setUTCFullYear"in e)return!0;if("function"==typeof ArrayBuffer&&ArrayBuffer.isView(e))return!0;if("byteLength"in e&&"length"in e)return!0}return!1}(e))throw Error("kv-storage: The given value is not allowed as a key")}var d={};function l(e,t){return c(e,h(t))}function h(e){return e===d?IDBKeyRange.lowerBound(-1/0):IDBKeyRange.lowerBound(e,!0)}var v=new o,p=new o,y=new o,m=new o,g=function(){};function F(e,t){return t((function(t,n){try{function u(){return p.set(e,s),y.set(e,void 0),{value:f,done:void 0===s}}var o=p.get(e);if(void 0===o)return Promise.resolve({value:void 0,done:!0});var s,a,f,d=function(e,t){var n,u=-1;e:{for(var o=0;o<t.length;o++){var s=t[o][0];if(s){var c=s();if(c&&c.then)break e;if(c===e){u=o;break}}else u=o}if(-1!==u){do{for(var a=t[u][1];!a;)a=t[++u][1];var f=a();if(f&&f.then){n=!0;break e}var d=t[u][2];u++}while(d&&!d());return f}}const l=new r,h=i.bind(null,l,2);return(n?f.then(v):c.then((function n(r){for(;;){if(r===e){u=o;break}if(++o===t.length){if(-1!==u)break;return void i(l,1,a)}if(s=t[o][0]){if((r=s())&&r.then)return void r.then(n).then(void 0,h)}else u=o}do{for(var c=t[u][1];!c;)c=t[++u][1];var a=c();if(a&&a.then)return void a.then(v).then(void 0,h);var f=t[u][2];u++}while(f&&!f());i(l,1,a)}))).then(void 0,h),l;function v(e){for(;;){var n=t[u][2];if(!n||n())break;for(var r=t[++u][1];!r;)r=t[++u][1];if((e=r())&&e.then)return void e.then(v).then(void 0,h)}i(l,1,e)}}(m.get(e),[[function(){return"keys"},function(){return Promise.resolve(function(e,t){return c(e,h(t)).then((function(e){return e[0]}))}(n,o)).then((function(e){f=s=e}))}],[function(){return"values"},function(){return Promise.resolve(l(n,o)).then((function(e){var t;s=(t=e)[0],f=a=t[1]}))}],[function(){return"entries"},function(){return Promise.resolve(l(n,o)).then((function(e){var t;a=(t=e)[1],f=void 0===(s=t[0])?void 0:[s,a]}))}]]);return Promise.resolve(d&&d.then?d.then(u):u())}catch(e){return Promise.reject(e)}}))}function b(e,t){var n=new g;return m.set(n,e),v.set(n,t),p.set(n,d),y.set(n,void 0),n}g.prototype.return=function(){p.set(this,void 0)},g.prototype.next=function(){var e=this,t=v.get(this);if(!t)return Promise.reject(new TypeError("Invalid this value"));var n,r=y.get(this);return n=void 0!==r?r.then((function(){return F(e,t)})):F(this,t),y.set(this,n),n},"function"==typeof Symbol&&Symbol.asyncIterator&&(g.prototype[Symbol.asyncIterator]=function(){return this});var _=function(e,t,n){try{return null===w.get(e)&&function(e){var t=A.get(e);w.set(e,new Promise((function(n,r){var i=self.indexedDB.open(t,1);i.onsuccess=function(){var u=i.result;(function(e,t,n){if(1!==e.objectStoreNames.length)return n(k(t)),!1;if(e.objectStoreNames[0]!==E)return n(k(t)),!1;var r=e.transaction(E,"readonly").objectStore(E);return!(r.autoIncrement||r.keyPath||r.indexNames.length)||(n(k(t)),!1)})(u,t,r)&&(u.onclose=function(){w.set(e,null)},u.onversionchange=function(){u.close(),w.set(e,null)},n(u))},i.onerror=function(){return r(i.error)},i.onupgradeneeded=function(){try{i.result.createObjectStore(E)}catch(e){r(e)}}})))}(e),Promise.resolve(w.get(e)).then((function(e){var r=e.transaction(E,t),i=r.objectStore(E);return n(r,i)}))}catch(e){return Promise.reject(e)}},A=new o,w=new o,E="store",x=function(e){var t="kv-storage:"+e;w.set(this,null),A.set(this,t),this.backingStore={database:t,store:E,version:1}};function k(e){return new Error('kv-storage: database "'+e+'" corrupted')}x.prototype.set=function(e,t){try{return f(e),_(this,"readwrite",(function(n,r){return void 0===t?r.delete(e):r.put(t,e),a(n)}))}catch(e){return Promise.reject(e)}},x.prototype.get=function(e){try{return f(e),_(this,"readonly",(function(t,n){return s(n.get(e))}))}catch(e){return Promise.reject(e)}},x.prototype.delete=function(e){try{return f(e),_(this,"readwrite",(function(t,n){return n.delete(e),a(t)}))}catch(e){return Promise.reject(e)}},x.prototype.clear=function(){try{var e=this;function t(){function t(){return s(self.indexedDB.deleteDatabase(A.get(e)))}var r=function(){if(n){try{n.close()}catch(e){}return Promise.resolve(new Promise(setTimeout)).then((function(){}))}}();return r&&r.then?r.then(t):t()}var n,r=w.get(e),i=function(){if(null!==r){function t(){w.set(e,null)}var i=function(e,t){try{var i=Promise.resolve(r).then((function(e){n=e}))}catch(e){return}return i&&i.then?i.then(void 0,(function(){})):i}();return i&&i.then?i.then(t):t()}}();return i&&i.then?i.then(t):t()}catch(e){return Promise.reject(e)}},x.prototype.keys=function(){var e=this;return b("keys",(function(t){return _(e,"readonly",t)}))},x.prototype.values=function(){var e=this;return b("values",(function(t){return _(e,"readonly",t)}))},x.prototype.entries=function(){var e=this;return b("entries",(function(t){return _(e,"readonly",t)}))},"function"==typeof Symbol&&Symbol.asyncIterator&&(x.prototype[Symbol.asyncIterator]=x.prototype.entries);new x("default");function O(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function j(e,t,n){return t&&O(e.prototype,t),n&&O(e,n),e}function S(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function D(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function I(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?D(Object(n),!0).forEach((function(t){S(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):D(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function C(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function z(e){var t=0;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(e=function(e,t){if(e){if("string"==typeof e)return C(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(n):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?C(e,t):void 0}}(e)))return function(){return t>=e.length?{done:!0}:{done:!1,value:e[t++]}};throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}return(t=e[Symbol.iterator]()).next.bind(t)}var P=function(){function e(e,t){var n=e._tree,r=Object.keys(n);this.set=e,this.type=t,this.path=r.length>0?[{node:n,keys:r}]:[]}var t=e.prototype;return t.next=function(){var e=this.dive();return this.backtrack(),e},t.dive=function(){if(0===this.path.length)return{done:!0};var e=T(this.path),t=e.node,n=e.keys;return T(n)===M?{done:!1,value:this.result()}:(this.path.push({node:t[T(n)],keys:Object.keys(t[T(n)])}),this.dive())},t.backtrack=function(){0!==this.path.length&&(T(this.path).keys.pop(),T(this.path).keys.length>0||(this.path.pop(),this.backtrack()))},t.key=function(){return this.set._prefix+this.path.map((function(e){var t=e.keys;return T(t)})).filter((function(e){return e!==M})).join("")},t.value=function(){return T(this.path).node[M]},t.result=function(){return this.type===L?this.value():this.type===B?this.key():[this.key(),this.value()]},t[Symbol.iterator]=function(){return this},e}(),B="KEYS",L="VALUES",M="",T=function(e){return e[e.length-1]},N=function(e,t,n,r,i,u){u.push({distance:0,ia:r,ib:0,edit:i});for(var o=[];u.length>0;){var s=u.pop(),c=s.distance,a=s.ia,f=s.ib,d=s.edit;if(f!==t.length)if(e[a]===t[f])u.push({distance:c,ia:a+1,ib:f+1,edit:W});else{if(c>=n)continue;d!==R&&u.push({distance:c+1,ia:a,ib:f+1,edit:K}),a<e.length&&(d!==K&&u.push({distance:c+1,ia:a+1,ib:f,edit:R}),d!==K&&d!==R&&u.push({distance:c+1,ia:a+1,ib:f+1,edit:J}))}else o.push({distance:c,i:a,edit:d})}return o},W=0,J=1,R=2,K=3,U=function(){function e(e,t){void 0===e&&(e={}),void 0===t&&(t=""),this._tree=e,this._prefix=t}var t=e.prototype;return t.atPrefix=function(t){if(!t.startsWith(this._prefix))throw new Error("Mismatched prefix");var n=G(this._tree,t.slice(this._prefix.length)),r=n[0],i=n[1];if(void 0===r){var u,o=Z(i),s=o[0],c=o[1],a=Object.keys(s).find((function(e){return e!==M&&e.startsWith(c)}));if(void 0!==a)return new e(((u={})[a.slice(c.length)]=s[a],u),t)}return new e(r||{},t)},t.clear=function(){delete this._size,this._tree={}},t.delete=function(e){return delete this._size,X(this._tree,e)},t.entries=function(){return new P(this,"ENTRIES")},t.forEach=function(e){for(var t,n=z(this);!(t=n()).done;){var r=t.value;e(r[0],r[1],this)}},t.fuzzyGet=function(e,t){return function(e,t,n){for(var r=[{distance:0,i:0,key:"",node:e}],i={},u=[],o=function(){var e=r.pop(),o=e.node,s=e.distance,c=e.key,a=e.i,f=e.edit;Object.keys(o).forEach((function(e){if(e===M){var d=s+(t.length-a),l=(i[c]||[null,1/0])[1];d<=n&&d<l&&(i[c]=[o[e],d])}else N(t,e,n-s,a,f,u).forEach((function(t){var n=t.distance,i=t.i,u=t.edit;r.push({node:o[e],distance:s+n,key:c+e,i:i,edit:u})}))}))};r.length>0;)o();return i}(this._tree,e,t)},t.get=function(e){var t=Q(this._tree,e);return void 0!==t?t[M]:void 0},t.has=function(e){var t=Q(this._tree,e);return void 0!==t&&t.hasOwnProperty(M)},t.keys=function(){return new P(this,B)},t.set=function(e,t){if("string"!=typeof e)throw new Error("key must be a string");return delete this._size,V(this._tree,e)[M]=t,this},t.update=function(e,t){if("string"!=typeof e)throw new Error("key must be a string");delete this._size;var n=V(this._tree,e);return n[M]=t(n[M]),this},t.values=function(){return new P(this,L)},t[Symbol.iterator]=function(){return this.entries()},j(e,[{key:"size",get:function(){var e=this;return this._size||(this._size=0,this.forEach((function(){e._size+=1}))),this._size}}]),e}();U.from=function(e){for(var t,n=new U,r=z(e);!(t=r()).done;){var i=t.value,u=i[0],o=i[1];n.set(u,o)}return n},U.fromObject=function(e){return U.from(Object.entries(e))};var Y,G=function e(t,n,r){if(void 0===r&&(r=[]),0===n.length)return[t,r];var i=Object.keys(t).find((function(e){return e!==M&&n.startsWith(e)}));return void 0===i?e(void 0,"",[].concat(r,[[t,n]])):e(t[i],n.slice(i.length),[].concat(r,[[t,i]]))},Q=function e(t,n){if(0===n.length)return t;var r=Object.keys(t).find((function(e){return e!==M&&n.startsWith(e)}));return void 0!==r?e(t[r],n.slice(r.length)):void 0},V=function e(t,n){if(0===n.length)return t;var r=Object.keys(t).find((function(e){return e!==M&&n.startsWith(e)}));if(void 0===r){var i=Object.keys(t).find((function(e){return e!==M&&e.startsWith(n[0])}));if(void 0!==i){var u,o=$(n,i);return t[o]=((u={})[i.slice(o.length)]=t[i],u),delete t[i],e(t[o],n.slice(o.length))}return t[n]={},t[n]}return e(t[r],n.slice(r.length))},$=function e(t,n,r,i,u){return void 0===r&&(r=0),void 0===i&&(i=Math.min(t.length,n.length)),void 0===u&&(u=""),r>=i||t[r]!==n[r]?u:e(t,n,r+1,i,u+t[r])},X=function(e,t){var n=G(e,t),r=n[0],i=n[1];if(void 0!==r){delete r[M];var u=Object.keys(r);0===u.length&&q(i),1===u.length&&H(i,u[0],r[u[0]])}},q=function e(t){if(0!==t.length){var n=Z(t),r=n[0];delete r[n[1]],0===Object.keys(r).length&&e(t.slice(0,-1))}},H=function(e,t,n){if(0!==e.length){var r=Z(e),i=r[0],u=r[1];i[u+t]=n,delete i[u]}},Z=function(e){return e[e.length-1]},ee=function(){function e(e){void 0===e&&(e={}),this._options=I({},pe,{},e),this._options.searchOptions=I({},ye,{},this._options.searchOptions||{});var t=this._options.fields;if(null==t)throw new Error('MiniSearch: option "fields" must be provided');this._index=new U,this._documentCount=0,this._documentIds={},this._fieldIds={},this._fieldLength={},this._averageFieldLength={},this._nextId=0,this._storedFields={},ue(this,t)}var t=e.prototype;return t.add=function(e){var t=this,n=this._options,r=n.extractField,i=n.tokenize,u=n.processTerm,o=n.fields,s=n.idField;if(null==se(e,s))throw new Error('MiniSearch: document does not have ID field "'+s+'"');var c=ie(this,e[s]);ae(this,c,e),o.forEach((function(n){var o=r(e,n),s=i(null==o?"":o.toString(),n);ce(t,c,t._fieldIds[n],t.documentCount-1,s.length),s.forEach((function(e){var r=u(e,n);ve(r)&&te(t,t._fieldIds[n],c,r)}))}))},t.addAll=function(e){var t=this;e.forEach((function(e){return t.add(e)}))},t.addAllAsync=function(e,t){var n=this;void 0===t&&(t={});var r=t.chunkSize,i=void 0===r?10:r,u={chunk:[],promise:Promise.resolve(null)},o=e.reduce((function(e,t,r){var u=e.chunk,o=e.promise;return u.push(t),(r+1)%i==0?{chunk:[],promise:o.then((function(){return n.addAll(u)}))}:{chunk:u,promise:o}}),u),s=o.chunk;return o.promise.then((function(){return n.addAll(s)}))},t.remove=function(e){var t=this,n=this._options,r=n.tokenize,i=n.processTerm,u=n.extractField,o=n.fields,s=n.idField;if(null==se(e,s))throw new Error('MiniSearch: document does not have ID field "'+s+'"');var c=(Object.entries(this._documentIds).find((function(t){t[0];var n=t[1];return e[s]===n}))||[])[0];if(null==c)throw new Error("MiniSearch: cannot remove document with ID "+e[s]+": it is not in the index");o.filter((function(t){return null!=se(e,t)})).forEach((function(n){r(u(e,n)||"",n).forEach((function(e){var r=i(e,n);ve(r)&&ne(t,t._fieldIds[n],c,r)}))})),delete this._storedFields[c],delete this._documentIds[c],this._documentCount-=1},t.removeAll=function(e){var t=this;0===arguments.length?(this._index=new U,this._documentCount=0,this._documentIds={},this._fieldLength={},this._averageFieldLength={},this._storedFields={},this._nextId=0):e.forEach((function(e){return t.remove(e)}))},t.search=function(e,t){var n=this;void 0===t&&(t={});var r=this._options,i=r.tokenize,u=r.processTerm,o=r.searchOptions,s=t=I({tokenize:i,processTerm:u},o,{},t),c=s.tokenize,a=s.processTerm,f=c(e).map((function(e){return a(e)})).filter(ve).map(le(t)).map((function(e){return n.executeQuery(e,t)})),d=this.combineResults(f,t.combineWith);return Object.entries(d).reduce((function(e,r){var i=r[0],u=r[1],o=u.score,s=u.match,c=u.terms,a={id:n._documentIds[i],terms:he(c),score:o,match:s};return Object.assign(a,n._storedFields[i]),(null==t.filter||t.filter(a))&&e.push(a),e}),[]).sort((function(e,t){return e.score<t.score?1:-1}))},t.autoSuggest=function(e,t){void 0===t&&(t={}),t=I({},me,{},t);var n=this.search(e,t).reduce((function(e,t){var n=t.score,r=t.terms,i=r.join(" ");return null==e[i]?e[i]={score:n,terms:r,count:1}:(e[i].score+=n,e[i].count+=1),e}),{});return Object.entries(n).map((function(e){var t=e[0],n=e[1],r=n.score;return{suggestion:t,terms:n.terms,score:r/n.count}})).sort((function(e,t){return e.score<t.score?1:-1}))},e.loadJSON=function(t,n){if(null==n)throw new Error("MiniSearch: loadJSON should be given the same options used when serializing the index");return e.loadJS(JSON.parse(t),n)},e.getDefault=function(e){if(pe.hasOwnProperty(e))return pe[e];throw new Error('MiniSearch: unknown option "'+e+'"')},e.loadJS=function(t,n){void 0===n&&(n={});var r=t.index,i=t.documentCount,u=t.nextId,o=t.documentIds,s=t.fieldIds,c=t.fieldLength,a=t.averageFieldLength,f=t.storedFields,d=new e(n);return d._index=new U(r._tree,r._prefix),d._documentCount=i,d._nextId=u,d._documentIds=o,d._fieldIds=s,d._fieldLength=c,d._averageFieldLength=a,d._fieldIds=s,d._storedFields=f||{},d},t.executeQuery=function(e,t){var n=this;void 0===t&&(t={});var r=((t=I({},this._options.searchOptions,{},t)).fields||this._options.fields).reduce((function(e,t){var n;return I({},e,((n={})[t]=se(e,t)||1,n))}),t.boost||{}),i=t,u=i.boostDocument,o=i.weights,s=o.fuzzy,c=void 0===s?.9:s,a=o.prefix,f=void 0===a?.75:a,d=oe(this,e.term,r,u,this._index.get(e.term));if(!e.fuzzy&&!e.prefix)return d;var l=[d];if(e.prefix&&this._index.atPrefix(e.term).forEach((function(t,i){var o=.3*(t.length-e.term.length)/t.length;l.push(oe(n,t,r,u,i,f,o))})),e.fuzzy){var h=e.fuzzy<1?Math.round(e.term.length*e.fuzzy):e.fuzzy;Object.entries(this._index.fuzzyGet(e.term,h)).forEach((function(e){var t=e[0],i=e[1],o=i[0],s=i[1]/t.length;l.push(oe(n,t,r,u,o,c,s))}))}return l.reduce(fe.or,{})},t.combineResults=function(e,t){if(void 0===t&&(t="or"),0===e.length)return{};var n=t.toLowerCase();return e.reduce(fe[n],null)},t.toJSON=function(){return{index:this._index,documentCount:this._documentCount,nextId:this._nextId,documentIds:this._documentIds,fieldIds:this._fieldIds,fieldLength:this._fieldLength,averageFieldLength:this._averageFieldLength,storedFields:this._storedFields}},j(e,[{key:"documentCount",get:function(){return this._documentCount}}]),e}();ee.SearchableMap=U;var te=function(e,t,n,r){e._index.update(r,(function(e){var r,i=(e=e||{})[t]||{df:0,ds:{}};return null==i.ds[n]&&(i.df+=1),i.ds[n]=(i.ds[n]||0)+1,I({},e,((r={})[t]=i,r))}))},ne=function(e,t,n,r){e._index.has(r)?(e._index.update(r,(function(i){var u,o=i[t];if(null==o||null==o.ds[n])return re(e,n,t,r),i;if(o.ds[n]<=1){if(o.df<=1)return delete i[t],i;o.df-=1}return o.ds[n]<=1?(delete o.ds[n],i):(o.ds[n]-=1,I({},i,((u={})[t]=o,u)))})),0===Object.keys(e._index.get(r)).length&&e._index.delete(r)):re(e,n,t,r)},re=function(e,t,n,r){if(null!=console&&null!=console.warn){var i=Object.entries(e._fieldIds).find((function(e){e[0];return e[1]===n}))[0];console.warn("MiniSearch: document with ID "+e._documentIds[t]+' has changed before removal: term "'+r+'" was not present in field "'+i+'". Removing a document after it has changed can corrupt the index!')}},ie=function(e,t){var n=e._nextId.toString(36);return e._documentIds[n]=t,e._documentCount+=1,e._nextId+=1,n},ue=function(e,t){t.forEach((function(t,n){e._fieldIds[t]=n}))},oe=function(e,t,n,r,i,u,o){return void 0===o&&(o=0),null==i?{}:Object.entries(n).reduce((function(n,u){var s=u[0],c=u[1],a=e._fieldIds[s],f=i[a]||{ds:{}},d=f.df,l=f.ds;return Object.entries(l).forEach((function(i){var u=i[0],f=i[1],l=r?r(e._documentIds[u],t):1;if(l){var h=e._fieldLength[u][a]/e._averageFieldLength[a];n[u]=n[u]||{score:0,match:{},terms:[]},n[u].terms.push(t),n[u].match[t]=se(n[u].match,t)||[],n[u].score+=l*de(f,d,e._documentCount,h,c,o),n[u].match[t].push(s)}})),n}),{})},se=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)?e[t]:void 0},ce=function(e,t,n,r,i){e._averageFieldLength[n]=e._averageFieldLength[n]||0;var u=e._averageFieldLength[n]*r+i;e._fieldLength[t]=e._fieldLength[t]||{},e._fieldLength[t][n]=i,e._averageFieldLength[n]=u/(r+1)},ae=function(e,t,n){var r=e._options,i=r.storeFields,u=r.extractField;null!=i&&0!==i.length&&(e._storedFields[t]=e._storedFields[t]||{},i.forEach((function(r){var i=u(n,r);void 0!==i&&(e._storedFields[t][r]=i)})))},fe=((Y={}).or=function(e,t){return Object.entries(t).reduce((function(e,t){var n=t[0],r=t[1],i=r.score,u=r.match,o=r.terms;return null==e[n]?e[n]={score:i,match:u,terms:o}:(e[n].score+=i,e[n].score*=1.5,e[n].terms=[].concat(e[n].terms,o),Object.assign(e[n].match,u)),e}),e||{})},Y.and=function(e,t){return null==e?t:Object.entries(t).reduce((function(t,n){var r=n[0],i=n[1],u=i.score,o=i.match,s=i.terms;return void 0===e[r]||(t[r]=t[r]||{},t[r].score=e[r].score+u,t[r].match=I({},e[r].match,{},o),t[r].terms=[].concat(e[r].terms,s)),t}),{})},Y),de=function(e,t,n,r,i,u){return i/(1+.333*i*u)*function(e,t,n){return e*Math.log(n/t)}(e,t,n)/r},le=function(e){return function(t,n,r){return{term:t,fuzzy:"function"==typeof e.fuzzy?e.fuzzy(t,n,r):e.fuzzy,prefix:"function"==typeof e.prefix?e.prefix(t,n,r):e.prefix}}},he=function(e){return e.filter((function(e,t,n){return n.indexOf(e)===t}))},ve=function(e){return!!e},pe={idField:"id",extractField:function(e,t){return e[t]},tokenize:function(e,t){return e.split(ge)},processTerm:function(e,t){return e.toLowerCase()},fields:void 0,searchOptions:void 0,storeFields:[]},ye={combineWith:"or",prefix:!1,fuzzy:!1,weights:{}},me={prefix:function(e,t,n){return t===n.length-1}},ge=/[\n\r -#%-\*,-\/:;\?@\[-\]_\{\}\xA0\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u1680\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2000-\u200A\u2010-\u2029\u202F-\u2043\u2045-\u2051\u2053-\u205F\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u3000-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]+/,Fe=ee;function be(e,t,n,r,i,u,o){try{var s=e[u](o),c=s.value}catch(e){return void n(e)}s.done?t(c):Promise.resolve(c).then(r,i)}function _e(e){return function(){var t=this,n=arguments;return new Promise((function(r,i){var u=e.apply(t,n);function o(e){be(u,r,i,o,s,"next",e)}function s(e){be(u,r,i,o,s,"throw",e)}o(void 0)}))}}var Ae=(e,t)=>[...new Map(e.map(e=>[e[t],e])).values()];function we(){return(we=_e((function*(e){var{pages:t=[],documents:n=[]}=yield fetch(e).then(e=>e.json()),r=[...t,...n.map(e=>(e.date&&(e.date=new Date(e.date)),e))];return Ae(r,"url")}))).apply(this,arguments)}var Ee,xe,ke={idField:"url",fields:["title","content","description","categories","tags","keywords"],storeFields:["url","title","description","image"],extractField:(e,t)=>{var n=e[t];return Array.isArray(n)?n.join(" "):n}},Oe={boost:{title:5,description:2,categories:2,tags:2,keywords:2},prefix:!0,fuzzy:.25,combineWith:"AND"},je=e=>{xe=e};function Se(e){var{data:t,ports:[n]}=e,r=Ee.search(t,Oe);n.postMessage(r.slice(0,20))}_e((function*(){var e,t,{data:{DATA_URL:n,STORAGE_KEY:r,INDEX_KEY:i}}=yield(e=self,t="message",new Promise(n=>e.addEventListener(t,n,{once:!0}))),u=new x(r),o=yield u.get(i);o?(Ee=Fe.loadJS(o,ke),self.addEventListener("message",Se)):(self.addEventListener("message",je),(Ee=new Fe(ke)).addAll(yield function(e){return we.apply(this,arguments)}(n)),xe&&Se(xe),self.removeEventListener("message",je),self.addEventListener("message",Se),_e((function*(){var e,t=[],n=!0,r=!1;try{for(var o,s,c=function(e){var t;if("undefined"!=typeof Symbol){if(Symbol.asyncIterator&&null!=(t=e[Symbol.asyncIterator]))return t.call(e);if(Symbol.iterator&&null!=(t=e[Symbol.iterator]))return t.call(e)}throw new TypeError("Object is not async iterable")}(u.keys());n=(o=yield c.next()).done,s=yield o.value,!n;n=!0){var a=s;a!==i&&t.push(a)}}catch(t){r=!0,e=t}finally{try{n||null==c.return||(yield c.return())}finally{if(r)throw e}}yield Promise.all(t.map(e=>u.delete(e))),yield u.set(i,Ee.toJSON())}))())}))()}]);