import '../src/index.js';
import type { IbCoverpage } from '../src/coverpage.js';

const leftCover = document.querySelector<IbCoverpage>('#left-cover');
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

if (leftCover) {
  // leftCover.addEventListener('cover-progress', (e: Event) => {
  //   if (!leftNav || !isMobile()) return;
  //   const { offset, peekSize, fullSize } = (e as CustomEvent<{ offset: number; peekSize: number; fullSize: number }>).detail;
  //   const t = Math.max(0, Math.min(1, (offset - peekSize) / (fullSize - peekSize)));
  //   leftNav.style.opacity = String(t);
  //   leftNav.style.pointerEvents = t > 0 ? 'auto' : 'none';
  // });

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
