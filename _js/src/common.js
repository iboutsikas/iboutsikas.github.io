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

import { Observable, NEVER } from 'rxjs';
import { switchMap } from 'rxjs/operators'

export const BREAK_POINT_3 = '(min-width: 64em)';
export const BREAK_POINT_DYNAMIC = '(min-width: 1666px)';

// Check the user agent for Safari and iOS Safari, to give them some special treatment...
const ua = navigator.userAgent.toLowerCase();
export const isSafari = ua.indexOf('safari') > 0 && ua.indexOf('chrome') < 0;
export const isMobile = ua.indexOf('mobile') > 0;
export const isMobileSafari = isSafari && isMobile;
export const isUCBrowser = ua.indexOf('ucbrowser') > 0;
export const isFirefox = ua.indexOf('firefox') > 0;
export const isFirefoxIOS = ua.indexOf('fxios') > 0 && ua.indexOf('safari') > 0;

export const hasCSSOM = 'attributeStyleMap' in Element.prototype && 'CSS' in window && CSS.number;

export const webComponentsReady = new Promise(res => {
  if ('customElements' in window) res(true);
  else document.addEventListener('WebComponentsReady', res);
});

// Takes an array of Modernizr feature tests and makes sure they all pass.
export function hasFeatures(features) {
  if (!window.Modernizr) return true;
  return [...features].every(feature => {
    const hasFeature = window.Modernizr[feature];
    if (!hasFeature && process.env.DEBUG) console.warn(`Feature '${feature}' missing!`);
    return hasFeature;
  });
}

// Some functions to hide and show content.
export function show() {
  this.style.display = 'block';
  this.style.visibility = 'visible';
}

export function hide() {
  this.style.display = 'none';
  this.style.visibility = 'hidden';
}

export function unshow() {
  this.style.display = '';
  this.style.visibility = '';
}

export const unhide = unshow;

// Same as `el.innerHTML = ''`, but not quite so hacky.
export function empty() {
  while (this.firstChild) this.removeChild(this.firstChild);
}

// An observable wrapper for the WebAnimations API.
// Will return an observable that emits once when the animation finishes.
export function animate(el, keyframes, options) {
  return Observable.create(observer => {
    const anim = el.animate(keyframes, options);

    anim.addEventListener(
      'finish',
      e => (observer.next(e), requestAnimationFrame(() => requestAnimationFrame(observer.complete.bind(observer)))),
    );

    return () => {
      if (anim.playState !== 'finished') anim.cancel();
    };
  });
}

export function importTemplate(templateId) {
  const template = document.getElementById(templateId);
  return template && document.importNode(template.content, true);
}

export function getScrollHeight() {
  const h = document.documentElement;
  const b = document.body;
  const sh = 'scrollHeight';
  return h[sh] || b[sh];
}

export function getScrollLeft() {
  return window.pageXOffset || document.body.scrollLeft;
}

export function getScrollTop() {
  return window.pageYOffset || document.body.scrollTop;
}

export const body = document.body || document.documentElement;
export const rem = (units) => units * parseFloat(getComputedStyle(body).fontSize);
export const getWidth = () => window.innerWidth || body.clientWidth;

/**
 * @param {HTMLElement|HTMLElement[]} els 
 * @param {IntersectionObserverInit} [options]
 * @returns {Observable<IntersectionObserverEntry[]>}
 */
export function createIntersectionObservable(els, options) {
  return Observable.create((obs) => {
    const observer = new IntersectionObserver(xs => obs.next(xs), options);

    if (Array.isArray(els)) els.forEach(el => observer.observe(el))
    else observer.observe(els);

    return () => { 
      if (Array.isArray(els)) els.forEach(el => observer.unobserve(el))
      else observer.unobserve(els);
    };
  });
}

/**
 * @template T
 * @param {Observable<boolean>} p$ 
 * @returns {(source: Observable<T>) => Observable<T>}
 */
export function subscribeWhen(p$) {
  return (source) => {
    return p$.pipe(switchMap(p => (p ? source : NEVER)));
  };
}