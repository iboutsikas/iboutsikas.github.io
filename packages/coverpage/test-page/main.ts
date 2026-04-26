import '../src/index.js';
import type { IbCoverpage } from '../src/coverpage.js';
import { CoverpageEvents } from '../src/index.js';

const isMobile = () => {
  return window.matchMedia('(max-width: 768px)').matches;
}

const leftCover   = document.querySelector<IbCoverpage>('#left-cover');
const rightCover  = document.querySelector<IbCoverpage>('#right-cover');
const topCover    = document.querySelector<IbCoverpage>('#top-cover');
const bottomCover = document.querySelector<IbCoverpage>('#bottom-cover');

const leftBackground   = document.querySelector<HTMLElement>('#left-background');
const rightBackground  = document.querySelector<HTMLElement>('#right-background');
const topBackground    = document.querySelector<HTMLElement>('#top-background');
const bottomBackground = document.querySelector<HTMLElement>('#bottom-background');

// ---------------------------------------------------------------------------
// Toggle buttons
// ---------------------------------------------------------------------------

function wireToggle(btnId: string, cover: IbCoverpage | null) {
  const btn = document.getElementById(btnId);
  if (!btn || !cover) return;
  btn.addEventListener('click', () => cover.open ? cover.hide() : cover.show());
}

wireToggle('toggle-left',   leftCover);
wireToggle('toggle-right',  rightCover);
wireToggle('toggle-top',    topCover);
wireToggle('toggle-bottom', bottomCover);

// ---------------------------------------------------------------------------
// Progress → counter-translate
// Left/top close by going negative (cover slides left/up); background offsets positive.
// Right/bottom close by going positive; background offsets negative.
// ---------------------------------------------------------------------------

if (leftCover && leftBackground) {
  leftCover.addEventListener('coverpage-progress', (e: CustomEvent<CoverpageEvents.Progress>) => {
    if (!e.detail)
      return;

    const { t, travel } = e.detail;
    leftBackground.style.transform = `translateX(${travel * (1 - t)}px)`;

    const innerContent = leftBackground.querySelector<HTMLElement>('.cover-nav');
    if (innerContent) {
      innerContent.style.opacity = isMobile() ? `${t}` : '1';
    }
  });
}

if (rightCover && rightBackground) {
  rightCover.addEventListener('coverpage-progress', (e: CustomEvent) => {
    const { t, travel } = e.detail;
    rightBackground.style.transform = `translateX(${-travel * (1 - t)}px)`;

    const innerContent = rightBackground.querySelector<HTMLElement>('.cover-nav');
    if (innerContent) {
      innerContent.style.opacity = isMobile() ? `${t}` : '1';
    }
  });
}

if (topCover && topBackground) {
  topCover.addEventListener('coverpage-progress', (e: CustomEvent) => {
    const { t, travel } = e.detail;
    topBackground.style.transform = `translateY(${travel * (1 - t)}px)`;
  });
}

if (bottomCover && bottomBackground) {
  bottomCover.addEventListener('coverpage-progress', (e: CustomEvent) => {
    const { t, travel } = e.detail;
    bottomBackground.style.transform = `translateY(${-travel * (1 - t)}px)`;
  });
}
