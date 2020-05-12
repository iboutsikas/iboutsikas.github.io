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

import { fromEvent, NEVER, combineLatest } from 'rxjs';
import { map, tap, switchMap, distinctUntilChanged, startWith, share, finalize } from 'rxjs/operators';

import { BREAK_POINT_DYNAMIC, getScrollTop, rem, createIntersectionObservable, webComponentsReady } from '../common';

(async () => {
  await webComponentsReady;

  const isLarge$ = fromEvent(window, 'resize', { passive: true }).pipe(
    startWith({}),
    map(() => window.matchMedia(BREAK_POINT_DYNAMIC).matches),
    distinctUntilChanged(),
  );

  const pushState = document.getElementById('_pushState');
  const toc$ = fromEvent(pushState, 'load').pipe(
    map(() => document.querySelector('.no-break-layout #markdown-toc')),
    share(),
  );

  combineLatest(toc$, isLarge$)
    .pipe(
      switchMap(([toc, isLarge]) => {
        if (!toc || !isLarge) return NEVER;

        const offsetTop = toc.offsetTop - rem(1);

        return fromEvent(document, 'scroll', { passive: true }).pipe(
          map(getScrollTop),
          startWith(getScrollTop()),
          map(x => x >= offsetTop),
          distinctUntilChanged(),
          tap(affix => {
            if (affix) {
              toc.classList.add('affix');
              // toc.style.position = 'fixed';
              // toc.style.top = '1rem';
              // toc.style.maxHeight = 'calc(100vh - 1rem)';
            } else {
              toc.classList.remove('affix');
              // toc.style.position = '';
              // toc.style.top = '';
              // toc.style.maxHeight = '';
            }
          }),
          finalize(() => {
            toc.classList.remove('affix');
            // toc.style.position = '';
            // toc.style.top = '';
            // toc.style.maxHeight = '';
          }),
        );
      }),
    )
    .subscribe();

  combineLatest(toc$, isLarge$)
    .pipe(
      switchMap(([toc, isLarge]) => {
        if (!toc || !isLarge) return NEVER;

        const intersecting = new Set();
        const top = new WeakMap();

        const toObserve = Array.from(toc.querySelectorAll('li'))
          .map(el => el.children[0].getAttribute('href') || '')
          .map(hash => document.getElementById(hash.substr(1)))
          .filter(el => !!el);

        let init = true;
        return createIntersectionObservable(toObserve).pipe(
          tap(entries => {
            if (init) {
              entries.forEach(({ target, boundingClientRect }) =>
                top.set(target, getScrollTop() + boundingClientRect.top),
              );
              init = false;
            }

            entries.forEach(({ isIntersecting, target }) => {
              isIntersecting ? intersecting.add(target) : intersecting.delete(target);
            });

            const curr = Array.from(intersecting).reduce((min, el) => (top.get(el) >= top.get(min) ? min : el), null);
            if (curr) {
              toc.querySelectorAll('a').forEach(el => (el.style.fontWeight = ''));
              toc.querySelector(`a[href="#${curr.id}"]`).style.fontWeight = 'bold';
            }
          }),
          finalize(() => {
            toc.querySelectorAll('a').forEach(el => (el.style.fontWeight = ''));
          }),
        );
      }),
    )
    .subscribe();
})();
