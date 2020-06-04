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

import { fromEvent } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { render, html } from 'lit-html';
import { repeat } from 'lit-html/directives/repeat';

import { webComponentsReady, importTemplate, postMessage } from '../common';

// const timeout = t => new Promise(res => setTimeout(res, t));
const once = (el, eventName) => el.addEventListener(eventName, { once: true });

const SEL_NAVBAR_BTN_BAR = '#_navbar > .content > .nav-btn-bar';

(async () => {
  await webComponentsReady;

  const pushStateEl = document.getElementById('_pushState');

  const searchFrag = importTemplate('_search-template');
  if (searchFrag) {
    const [searchBtnEl, searchBoxEl, hitsEl] = searchFrag.children;

    const navbarEl = document.querySelector(SEL_NAVBAR_BTN_BAR);
    navbarEl.insertBefore(searchBtnEl, navbarEl.querySelector('.nav-span'));
    navbarEl.insertBefore(searchBoxEl, navbarEl.querySelector('.nav-span'));
    navbarEl.insertBefore(hitsEl, navbarEl.querySelector('.nav-span'));

    const searchInputEl = searchBoxEl.querySelector('input[type=search]');
    const searchCloseEl = searchBoxEl.querySelector('button[type=reset]');

    searchBtnEl.addEventListener('click', () => {
      searchBoxEl.style.display = 'flex';
      searchInputEl.focus();
      searchInputEl.select();
      if (searchInputEl.value !== '') hitsEl.style.display = '';
    });

    const closeHandler = () => {
      searchBoxEl.style.display = '';
      hitsEl.style.display = 'none';
    };

    hitsEl.style.display = 'none';

    searchCloseEl.addEventListener('click', closeHandler);
    pushStateEl.addEventListener('hy-push-state-start', closeHandler);

    // Load search worker after user interaction
    await once(document, 'click', { once: true });
    const worker = new Worker(document.getElementById('_hrefSearch').href);
    let prevVal = '';
    fromEvent(searchInputEl, 'keyup')
      .pipe(
        tap(e => {
          if (e.target.value === '' && prevVal === '' && e.keyCode === 27) {
            e.preventDefault();
            closeHandler();
          }
          prevVal = e.target.value;
        }),
        switchMap(e => postMessage(worker, e.target.value)),
        tap(items => {
          if (items.length) {
            render(
              html`
                <ul>
                  ${repeat(
                    items,
                    item => item.url,
                    item => html`
                      <li class="search-item" @click=${() => _pushState.assign(item.url)}>
                        <div class="search-img aspect-ratio sixteen-ten">
                          ${item.image
                            ? html`
                                <img src="${item.image}" />
                              `
                            : ''}
                        </div>
                        <div class="search-text">
                          <p>
                            <a class="heading" href=${item.url}>${item.title}</a>
                            <small style="color:var(--text-muted)">${item.url}</small>
                          </p>
                          ${item.description
                            ? html`
                                <p>${item.description}</p>
                              `
                            : ''}
                        </div>
                      </li>
                    `,
                  )}
                </ul>
              `,
              hitsEl,
            );
            hitsEl.style.display = '';
          } else {
            hitsEl.style.display = 'none';
          }
        }),
      )
      .subscribe();
  }
})();
