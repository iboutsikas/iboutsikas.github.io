import '../src/index.js';

const leftCover = document.querySelector('#left-cover');
const leftNav = document.getElementById('left-nav');

const isMobile = () => window.matchMedia('(max-width: 767px)').matches;

function resetNavForViewport() {
  if (!leftNav) return;
  if (isMobile()) {
    leftNav.style.opacity = '0';
    leftNav.style.pointerEvents = 'none';
  } else {
    leftNav.style.opacity = '';
    leftNav.style.pointerEvents = '';
  }
}

if (leftCover) {
  leftCover.addEventListener('cover-progress', (e: Event) => {
    if (!leftNav || !isMobile()) return;
    const { offset, peekSize, fullSize } = (e as CustomEvent<{ offset: number; peekSize: number; fullSize: number }>).detail;
    const t = Math.max(0, Math.min(1, (offset - peekSize) / (fullSize - peekSize)));
    leftNav.style.opacity = String(t);
    leftNav.style.pointerEvents = t > 0 ? 'auto' : 'none';
  });
}

window.addEventListener('resize', resetNavForViewport);
resetNavForViewport();
