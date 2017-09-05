// Copyright (c) 2017 Florian Klampfer <https://qwtel.com/>

import { Observable } from 'rxjs/Observable';
// import { Subject } from 'rxjs/Subject';

import { of } from 'rxjs/observable/of';
import { fromEvent } from 'rxjs/observable/fromEvent';
// import { timer } from 'rxjs/observable/timer';

import { _do as effect } from 'rxjs/operator/do';
import { filter } from 'rxjs/operator/filter';
// import { mapTo } from 'rxjs/operator/mapTo';
import { switchMap } from 'rxjs/operator/switchMap';
// import { _finally as cleanup } from 'rxjs/operator/finally';
import { zipProto as zipWith } from 'rxjs/operator/zip';

import { animate } from '../common';

export function flipProject(start$, ready$, fadeIn$, { animationMain, duration }) {
  const flip$ = start$
    ::filter(({ flipType }) => flipType === 'project')
    ::switchMap(({ anchor }) => {
      console.log('project start');
      const img = anchor.querySelector('.img');

      const titleNode = anchor.parentNode.querySelector('.name') || {};
      const title = titleNode.textContent || '|';

      animationMain.querySelector('.page').innerHTML = `
        <h1 class="page-title" style="opacity:0">${title}</h1>
        <div class="post-date heading" style="opacity:0">|</div>
      `;

      const placeholder = document.createElement('div');
      placeholder.classList.add('sixteen-nine');

      img.parentNode.insertBefore(placeholder, img);
      img.classList.add('lead');
      img.style.transformOrigin = 'left top';

      animationMain.querySelector('.page').appendChild(img);
      animationMain.style.position = 'fixed';
      animationMain.style.opacity = 1;

      const first = placeholder.getBoundingClientRect();
      const last = img.getBoundingClientRect();

      const invertX = first.left - last.left;
      const invertY = first.top - last.top;
      const invertScale = first.width / last.width;

      return animate(img, [
        { transform: `translate3d(${invertX}px, ${invertY}px, 0) scale(${invertScale})` },
        { transform: 'translate3d(0, 0, 0) scale(1)' },
      ], {
        duration,
        easing: 'cubic-bezier(0,0,0.32,1)',
      })
        ::effect(() => { animationMain.style.position = 'absolute'; });
    });

  start$::switchMap(() =>
    ready$
      ::filter(({ flipType }) => flipType === 'project')
      ::switchMap(({ content: [main] }) => {
        console.log('project ready');
        animationMain.style.willChange = 'opacity';

        const img = main.querySelector('.img');
        const imgImg = img.querySelector('img');

        img.style.opacity = 0;
        img.style.willChange = 'opacity';

        const img$ = imgImg == null ?
          Observable::of() :
          Observable::fromEvent(imgImg, 'load');

        return img$
          ::zipWith(fadeIn$)
          ::effect(() => {
            img.style.opacity = 1;
            img.style.willChange = '';
            animationMain.style.opacity = 0;
            animationMain.style.willChange = '';
          });
      }))
    .subscribe();

  return flip$;
}
