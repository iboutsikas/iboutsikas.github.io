import '../src/index.js';
import type { IbCoverpage } from '../src/coverpage.js';

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
// Cover dimension helpers
// ---------------------------------------------------------------------------

function coverWidth(cover: IbCoverpage): number {
  const el = cover.shadowRoot?.querySelector('.cover') as HTMLElement | null;
  return el?.offsetWidth ?? cover.offsetWidth;
}

function coverHeight(cover: IbCoverpage): number {
  const el = cover.shadowRoot?.querySelector('.cover') as HTMLElement | null;
  return el?.offsetHeight ?? cover.offsetHeight;
}

function peekSize(cover: IbCoverpage): number {
  return parseFloat(getComputedStyle(cover).getPropertyValue('--cover-peek-size')) || 0;
}

// ---------------------------------------------------------------------------
// Progress → counter-translate
// Left/top close by going negative (cover slides left/up); background offsets positive.
// Right/bottom close by going positive; background offsets negative.
// ---------------------------------------------------------------------------

if (leftCover && leftBackground) {
  leftCover.addEventListener('coverpage-progress', (e: Event) => {
    const { t } = (e as CustomEvent<{ t: number }>).detail;
    const travel = (coverWidth(leftCover) - peekSize(leftCover)) / 2;
    leftBackground.style.transform = `translateX(${travel * (1 - t)}px)`;

    const innerContent = leftBackground.querySelector<HTMLElement>('.cover-nav');
    if (innerContent) {
      innerContent.style.opacity = isMobile() ? `${t}` : '1';
    }
  });
}

if (rightCover && rightBackground) {
  rightCover.addEventListener('coverpage-progress', (e: Event) => {
    const { t } = (e as CustomEvent<{ t: number }>).detail;
    const travel = (coverWidth(rightCover) - peekSize(rightCover)) / 2;
    rightBackground.style.transform = `translateX(${-travel * (1 - t)}px)`;

    const innerContent = rightBackground.querySelector<HTMLElement>('.cover-nav');
    if (innerContent) {
      innerContent.style.opacity = isMobile() ? `${t}` : '1';
    }
  });
}

if (topCover && topBackground) {
  topCover.addEventListener('coverpage-progress', (e: Event) => {
    const { t } = (e as CustomEvent<{ t: number }>).detail;
    const travel = (coverHeight(topCover) - peekSize(topCover)) / 2;
    topBackground.style.transform = `translateY(${travel * (1 - t)}px)`;
  });
}

if (bottomCover && bottomBackground) {
  bottomCover.addEventListener('coverpage-progress', (e: Event) => {
    const { t } = (e as CustomEvent<{ t: number }>).detail;
    const travel = (coverHeight(bottomCover) - peekSize(bottomCover)) / 2;
    bottomBackground.style.transform = `translateY(${-travel * (1 - t)}px)`;
  });
}
