import '../src/index.js';
import type { IbCoverpage } from '../src/coverpage.js';

const leftCover = document.querySelector<IbCoverpage>('#left-cover');
const leftBackground = document.querySelector<HTMLElement>('#left-background');
const toggleBtn = document.getElementById('toggle-btn');

if (toggleBtn && leftCover) {
  toggleBtn.addEventListener('click', () => {
    if (leftCover.open) {
      leftCover.hide();
    } else {
      leftCover.show();
    }
  });
}

if (leftCover && leftBackground) {
  // Counter-translate background so it stays visually fixed as the cover slides.
  // cover.tx = -(coverWidth - peekSize) * (1 - t), background offsets by -tx to cancel.
  leftCover.addEventListener('coverpage-progress', (e: Event) => {
    const { t } = (e as CustomEvent<{ t: number }>).detail;
    const coverWidth = leftCover.offsetWidth;
    const peekSize = parseFloat(getComputedStyle(leftCover).getPropertyValue('--cover-peek-size')) || 0;
    const travel = (coverWidth - peekSize) / 2;
    leftBackground.style.transform = `translateX(${travel * (1 - t)}px)`;
  });
}

if (leftCover) {
  leftCover.addEventListener('coverpage-startup', (e: Event) => {
    console.log('Startup', e);
  });

  leftCover.addEventListener('coverpage-shutdown', (e: Event) => {
    console.log('Shutdown', e);
  });

  leftCover.addEventListener('coverpage-before-animation', (e: Event) => {
    console.log('Before animation', e);
  });

  leftCover.addEventListener('coverpage-after-animation', (e: Event) => {
    console.log('After animation', e);
  });
}

// window.addEventListener('resize', resetNavForViewport);
// resetNavForViewport();
