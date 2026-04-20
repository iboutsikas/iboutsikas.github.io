import { LitElement, html, css, type PropertyValues } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import { property } from 'lit/decorators.js';
import { GestureController } from './controllers/gesture-controller.js';
import type { Side, IConfigProvider } from './types/definitions.js';
import { CoverMath } from './utils/cover-math.js';
import { defer, filter, share, Subject, Subscription, takeUntil, withLatestFrom } from 'rxjs';
import { CoverpageEvents, type CoverpageEventMap } from './types/events.js';
import { classMap } from 'lit/directives/class-map.js';
import { observeSize } from './utils/observe.js';

@customElement('ib-coverpage')
export class IbCoverpage extends LitElement implements IConfigProvider {
  /** The side from which the cover will be drawn. */
  @property({ type: String }) accessor side: Side = 'left';
  /** The maximum range for the offset. */
  @property({ type: Number }) accessor range: number | undefined = undefined;
  /** The threshold for movement to trigger an interaction. */
  @property({ type: Number }) accessor movementThreshold: number = 10;
  /** The threshold for velocity to trigger a flick. */
  @property({ type: Number }) accessor speedThreshold: number = 1;
  /** The minimum size of the peeked cover. */
  @property({ type: Number }) accessor peekSize: number = 0;
  /**
   * Cover dimensions are set via CSS custom properties, not JS properties.
   * Use `--cover-width` for left/right sides and `--cover-height` for top/bottom.
   */
  /** Internal scrim visibility state. Use `open()` / `close()` to drive it externally. */
  @state() private accessor _scrimOpen: boolean = false;

  /** Exposes scrim state as a readonly observable property for consumers. */
  get scrimOpen(): boolean { return this._scrimOpen; }
  /** Duration of cover and scrim animations in milliseconds. */
  @property({ type: Number }) accessor animationDuration: number = 300;

  /** The cover element. */
  @query('.cover') accessor coverElement!: HTMLElement;
  /** The scrim element. */
  @query('.scrim') accessor scrimElement!: HTMLElement;

  private _opened = false;
  private _isDragging = false;
  /** Cover translate at the moment a gesture starts — used as drag base. */
  private _translationOrigin = 0;

  private _gestureController: GestureController = new GestureController(this);
  private _disconnectSubject: Subject<void> = new Subject<void>();

  connectedCallback() {
    super.connectedCallback();
    this._gestureController.connect(this);
  }

  disconnectedCallback() {
    this._disconnectSubject.next();
    this._gestureController.disconnect();
    super.disconnectedCallback();

    this._fireCoverpageEvent(CoverpageEvents.Shutdown, {
      elementId: this.id ?? ''
    });
  }

  firstUpdated() {
    this._fireCoverpageEvent(CoverpageEvents.Startup, {
      elementId: this.id ?? ''
    });

    this._setupSubscriptions();

    // Snap to closed position on first render without triggering a transition.
    // this.coverElement.classList.add('is-dragging');
    // this.coverElement.style.transform = this._buildTransform(this._closedTranslate());
    // requestAnimationFrame(() => this.coverElement.classList.remove('is-dragging'));

    // const coverSize$ = observeSize(this.coverElement);
    // const gesture$ = this._gestureController!.gesture$;


    // const start$ = gesture$.pipe(
    //   filter(g => g.type === 'start'),
    //   share()
    // );

    // const move$ = gesture$.pipe(
    //   filter(g => g.type === 'move'),
    //   share()
    // );

    // const end$ = gesture$.pipe(
    //   filter(g => g.type === 'end' || g.type === 'flick'),
    //   share()
    // );

    // // Re-snap to closed position when cover resizes (viewport resize) and not open/dragging.
    // coverSize$.subscribe(coverSize => {
    //   if (this._opened || this._isDragging) return;
    //   const dim = this.side === 'left' || this.side === 'right' ? coverSize.width : coverSize.height;
    //   this.coverElement.classList.add('is-dragging');
    //   this.coverElement.style.transform = this._buildTransform(this._closedTranslate(dim));
    //   requestAnimationFrame(() => this.coverElement.classList.remove('is-dragging'));
    // });

    // // On gesture start: freeze current translate as the drag baseline.
    // start$.subscribe(() => {
    //   this._isDragging = true;
    //   this._translationOrigin = this._getTranslate();
    //   this.coverElement.classList.add('is-dragging');
    //   this._fireCoverpageEvent(CoverpageEvents.BeforeAnimation, {
    //     elementId: this.id ?? ''
    //   });
    // });

    // // During drag: translate directly, no CSS transition.
    // move$.pipe(
    //   withLatestFrom(start$, coverSize$)
    // ).subscribe(([moveEvent, startEvent, coverSize]) => {
    //   console.group('Movement');
    //   console.log(moveEvent);
    //   console.log(startEvent);
    //   console.log(coverSize);
    //   console.groupEnd();
    //   const isHorizontal = this.side === 'left' || this.side === 'right';
    //   const moveDelta = isHorizontal
    //     ? moveEvent.position.x - startEvent.position.x
    //     : moveEvent.position.y - startEvent.position.y;

    //   const closed = this._closedTranslate(isHorizontal ? coverSize.width : coverSize.height);
    //   const tx = CoverMath.clamp(
    //     this._translationOrigin + moveDelta,
    //     Math.min(closed, 0),
    //     Math.max(closed, 0)
    //   );

    //   this.coverElement.style.transform = this._buildTransform(tx);
    //   this._applyScrimOpacity(tx, coverSize);
    // });

    // // On gesture end or flick: decide open/close, then animate via CSS transition.
    // end$.pipe(
    //   withLatestFrom(coverSize$)
    // ).subscribe(([endEvent, coverSize]) => {
    //   const isHorizontal = this.side === 'left' || this.side === 'right';
    //   const coverDim = isHorizontal ? coverSize.width : coverSize.height;
    //   const currentTx = this._getTranslate();

    //   let shouldOpen: boolean;

    //   if (endEvent.type === 'flick') {
    //     // Velocity direction decides intent.
    //     const vel = isHorizontal ? endEvent.velocity.x : endEvent.velocity.y;
    //     if (this.side === 'left' || this.side === 'bottom') {
    //       shouldOpen = vel > 0;
    //     } else {
    //       shouldOpen = vel < 0;
    //     }
    //   } else {
    //     // Position threshold: past 50% of travel → open.
    //     const closed = this._closedTranslate(coverDim);
    //     const travel = Math.abs(closed);
    //     const progress = Math.abs(currentTx - closed);
    //     shouldOpen = progress >= travel * 0.5;
    //   }

    //   this._isDragging = false;

    //   if (shouldOpen) {
    //     this.open();
    //   } else {
    //     this.close();
    //   }

    //   this._fireCoverpageEvent(CoverpageEvents.AfterAnimation, {
    //     elementId: this.id ?? ''
    //   });
    // });
  }

  updated(changedProperties: PropertyValues<this>) {
    const configKeys = ['side', 'range', 'movementThreshold', 'speedThreshold'] as const;
    const configChanged = configKeys.some(k => changedProperties.has(k));

    if (configChanged) {
      this._gestureController.disconnect();
      this._gestureController.connect(this);
    }
  }

  /** Animates the cover to the fully open position and shows the scrim. */
  public open(): void {
    this._opened = true;
    this._scrimOpen = true;
    this.coverElement.classList.remove('is-dragging');
    this.coverElement.style.transform = this._buildTransform(0);
  }

  /** Animates the cover back to the resting (peek) position and hides the scrim. */
  public close(): void {
    this._opened = false;
    this._scrimOpen = false;
    this.coverElement.classList.remove('is-dragging');
    this.coverElement.style.transform = this._buildTransform(this._closedTranslate());
  }

  private _handleScrimClick() {
    this.close();
  }

  private _setupSubscriptions(): void {
    if (!this.coverElement) {
      throw new Error('[_setupSubscriptions] Called before DOM Queries are made available');
    }

    const coverSize$ = observeSize(this.coverElement);
    const gesture$ = this._gestureController!.gesture$;

    const start$ = gesture$.pipe(
      filter(g => g.type === 'start'),
      share()
    );

    const move$ = gesture$.pipe(
      filter(g => g.type === 'move'),
      share()
    );

    const end$ = gesture$.pipe(
      filter(g => g.type === 'end' || g.type === 'flick'),
      share()
    );
    

    start$.pipe(takeUntil(this._disconnectSubject)).subscribe((e) => {
      this.coverElement.classList.add('will-change', 'is-dragging');

      this._fireCoverpageEvent(CoverpageEvents.BeforeAnimation, {
        elementId: this.id ?? ''
      });
    });

    end$.pipe(takeUntil(this._disconnectSubject)).subscribe((e) => {
      this.coverElement.classList.remove('will-change', 'is-dragging');

      this._fireCoverpageEvent(CoverpageEvents.AfterAnimation, {
        elementId: this.id ?? ''
      });
    });
  }

  // ---------------------------------------------------------------------------
  // Helpers
  // ---------------------------------------------------------------------------

  /**
   * Reads --cover-peek-size from the host computed style.
   * Falls back to the peekSize JS property if the CSS var is absent or unparseable.
   */
  private _getCssPeekSize(): number {
    const raw = getComputedStyle(this).getPropertyValue('--cover-peek-size').trim();
    const parsed = parseFloat(raw);
    return isNaN(parsed) ? this.peekSize : parsed;
  }

  /**
   * Closed-state translate value.
   * Negative for left/top (push off-screen left/top), positive for right/bottom.
   * Pass explicit dim to avoid a live DOM read during gesture handling.
   */
  private _closedTranslate(dim?: number): number {
    const size = dim ?? (
      this.side === 'left' || this.side === 'right'
        ? this.coverElement?.offsetWidth ?? 0
        : this.coverElement?.offsetHeight ?? 0
    );
    const travel = size - this._getCssPeekSize();
    switch (this.side) {
      case 'left': return -travel;
      case 'right': return travel;
      case 'top': return -travel;
      case 'bottom': return travel;
    }
  }

  /** Reads the current translate value from the cover's inline transform. */
  private _getTranslate(): number {
    const transform = this.coverElement?.style.transform ?? '';
    const match = transform.match(/translate\(([^,]+)px/);
    return match?.[1] != null ? parseFloat(match[1]) : 0;
  }

  /** Builds a translate CSS string for the active axis. */
  private _buildTransform(tx: number): string {
    if (this.side === 'top' || this.side === 'bottom') {
      return `translate(0, ${tx}px)`;
    }
    return `translate(${tx}px, 0)`;
  }

  /**
   * Drives scrim opacity proportionally to how open the cover is.
   * 0 = fully closed, 1 = fully open.
   */
  private _applyScrimOpacity(tx: number, coverSize: { width: number; height: number }): void {
    const isHorizontal = this.side === 'left' || this.side === 'right';
    const dim = isHorizontal ? coverSize.width : coverSize.height;
    const closed = this._closedTranslate(dim);
    const travel = Math.abs(closed);
    if (travel === 0) return;

    const progress = Math.abs(tx - closed) / travel;
    const opacity = CoverMath.clamp(progress, 0, 1);
    if (this.scrimElement) {
      this.scrimElement.style.opacity = String(opacity);
      this.scrimElement.style.pointerEvents = opacity > 0 ? 'auto' : 'none';
    }
  }

  private _fireCoverpageEvent<TEventName extends keyof CoverpageEventMap>(
    name: TEventName, payload: CoverpageEventMap[TEventName]) {
    this.dispatchEvent(new CustomEvent<CoverpageEventMap[TEventName]>(name, {
      detail: payload,
      bubbles: true,
      composed: true
    }));
  }

  static styles = css`
    :host {
      display: block;
      position: fixed;
      --cover-peek-size: 0px;
      --cover-width: 100%;
      --cover-height: 100%;
      --cover-peek-width: 0px;
      --anim-duration: 300ms;
      --cover-base-z-index: 100;
      z-index: var(--cover-base-z-index);
    }

    .scrim {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      opacity: 0;
      transition: opacity var(--anim-duration) ease;
      z-index: calc(var(--cover-base-z-index, 100));
    }

    .cover {
      position: fixed;
      z-index: calc(var(--cover-base-z-index, 100) + 3);
      contain: strict;
      transition: transform var(--anim-duration, 300ms) ease;
    }

    .cover.is-dragging {
      transition: none;
    }

    .cover.is-interacting {
      user-select: none;
      -webkit-user-select: none;
    }

    .cover.will-change {
      will-change: transform;
    }

    .cover.horizontal {
      height: 100vh;
      width: var(--cover-width);
    }

    .cover.vertical {
      width: 100vw;
      height: var(--cover-height);
    }

    .cover.left   { top: 0; left: 0; bottom: 0; }
    .cover.right  { top: 0; right: 0; bottom: 0; }
    .cover.top    { top: 0; left: 0; right: 0; }
    .cover.bottom { bottom: 0; left: 0; right: 0; }
  `;

  render() {
    return html`
      <div class="scrim" @click=${this._handleScrimClick}></div>
      <div class=${classMap({
      cover: true,
      horizontal: this.side === 'left' || this.side === 'right',
      vertical: this.side === 'top' || this.side === 'bottom',
      [this.side]: true
    })}>
        <slot></slot>
      </div>
    `;
  }
}
