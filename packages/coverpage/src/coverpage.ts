import { LitElement, html, css, type PropertyValues } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import { property } from 'lit/decorators.js';
import { GestureController } from './controllers/gesture-controller.js';
import type { Side, IConfigProvider, Vec2 } from './types/definitions.js';
import { CoverMath } from './utils/cover-math.js';
import { BehaviorSubject, distinctUntilChanged, filter, map, Observable, share, shareReplay, Subject, switchMap, takeUntil, withLatestFrom } from 'rxjs';
import { CoverpageEvents, type CoverpageEventMap } from './types/events.js';
import { classMap } from 'lit/directives/class-map.js';
import { observeSize } from './utils/observe.js';

@customElement('ib-coverpage')
export class IbCoverpage extends LitElement implements IConfigProvider {
  /** The side from which the cover will be drawn. */
  @property({ type: String }) accessor side: Side = 'left';
  /** The threshold for movement to trigger an interaction. */
  @property({ type: Number }) accessor movementThreshold: number = 10;
  /** The threshold for velocity to trigger a flick. */
  @property({ type: Number }) accessor speedThreshold: number = 2;
  /** The minimum size of the peeked cover. */
  @property({ type: Number }) accessor peekSize: number = 0;
  /** Whether the cover is open. Setting this attribute on load starts the cover fully open. */
  @property({ type: Boolean }) accessor open: boolean = false;

  /** The cover element. */
  @query('.cover') accessor coverElement!: HTMLElement;
  /** The scrim element. */
  @query('.scrim') accessor scrimElement!: HTMLElement;

  private _gestureController: GestureController = new GestureController(this);
  private _disconnectSubject: Subject<void> = new Subject<void>();
  /** Shared cover size stream — initialized in firstUpdated when coverElement is available. */
  private _coverSize$!: Observable<{ width: number; height: number }>;

  /** Tracks the settled (post-animation) open/closed state. */
  private readonly _openState$ = new BehaviorSubject<boolean>(false);
  /** Observable consumers can use to react to open/closed transitions. */
  public readonly openState$ = this._openState$.asObservable();

  /** BehaviorSubject driving cover position. Value is the CSS translate in px. */
  private readonly _translate$ = new BehaviorSubject<number>(0);
  /** Observable of cover translate position in px. 0 = fully open, negative/positive = closed. */
  public readonly translate$ = this._translate$.asObservable();

  private _animationFrameId: number | undefined;
  // Guards against animating on first render (open attribute set at parse time).
  private _firstUpdateDone = false;

  connectedCallback() {
    super.connectedCallback();
    this._gestureController.connect(this);
  }

  disconnectedCallback() {
    this._cancelAnimation();
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

    // shareReplay(1) so all consumers (drag pipe, future combineLatests) share one ResizeObserver.
    this._coverSize$ = observeSize(this.coverElement).pipe(shareReplay(1));

    this._setupSubscriptions();

    // Place cover at its initial position with no animation.
    this._translate$.next(this.open ? 0 : this._closedTranslate());
    this._openState$.next(this.open);
  }

  updated(changedProperties: PropertyValues<this>) {
    // Skip first update — initial position is set directly in firstUpdated.
    if (changedProperties.has('open') && this._firstUpdateDone) {
      this._animateTo(this.open ? 0 : this._closedTranslate(), this.open);
    }

    const configKeys = ['side', 'movementThreshold', 'speedThreshold'] as const;
    const configChanged = configKeys.some(k => changedProperties.has(k));
    if (configChanged) {
      this._gestureController.disconnect();
      this._gestureController.connect(this);
    }

    this._firstUpdateDone = true;
  }

  /** Slides the cover to the fully open position. */
  public show(): void {
    this._animateTo(0, true);
  }

  /** Slides the cover back to the resting (peek) position. */
  public hide(): void {
    this._animateTo(this._closedTranslate(), false);
  }

  private _handleScrimClick() {
    this.hide();
  }

  private _setupSubscriptions(): void {
    if (!this.coverElement) {
      throw new Error('[_setupSubscriptions] Called before DOM Queries are made available');
    }

    // translate$ applies transform to the cover element.
    this._translate$.pipe(
      takeUntil(this._disconnectSubject)
    ).subscribe(tx => {
      this.coverElement.style.transform = this._buildTransform(tx);
    });

    // t$ is progress [0=closed, 1=open]. Drives scrim opacity and Progress event.
    const isHorizontal = this.side === 'left' || this.side === 'right';
    const t$ = this._translate$.pipe(
      withLatestFrom(this._coverSize$),
      map(([tx, size]) => {
        const dim = isHorizontal ? size.width : size.height;
        const closed = this._closedTranslate(dim);
        const travel = Math.abs(closed);
        if (travel === 0) return 0;
        return CoverMath.clamp(Math.abs(tx - closed) / travel, 0, 1);
      }),
      distinctUntilChanged()
    );

    let _scrimActive = false;
    const peekSize = this._getCssPeekSize();
    t$.pipe(
      withLatestFrom(this._coverSize$),
      map(([t, size]) => {
        const dim = isHorizontal ? size.width : size.height;
        return { t, travel: (dim - peekSize) / 2 };
      })
    ).pipe(takeUntil(this._disconnectSubject)).subscribe(({ t, travel }) => {
      if (this.scrimElement) {
        this.scrimElement.style.opacity = String(t);
        const isActive = t > 0;
        if (isActive !== _scrimActive) {
          this.scrimElement.classList.toggle('is-active', isActive);
          _scrimActive = isActive;
        }
      }
      this._fireCoverpageEvent(CoverpageEvents.Progress, { elementId: this.id ?? '', t, travel, side: this.side });
    });

    const gesture$ = this._gestureController!.gesture$;

    const start$ = gesture$.pipe(
      filter(g => g.type === 'start'),
      share()
    );

    const end$ = gesture$.pipe(
      filter(g => g.type === 'end' || g.type === 'flick'),
      share()
    );

    start$.pipe(takeUntil(this._disconnectSubject)).subscribe(() => {
      // Cancel any in-progress snap/flick animation — user grabbed the cover mid-flight.
      this._cancelAnimation();
      this.coverElement.classList.add('will-change');
      this.scrimElement.classList.add('is-active');
      this._fireCoverpageEvent(CoverpageEvents.BeforeAnimation, { elementId: this.id ?? '' });
    });

    // end$.pipe(takeUntil(this._disconnectSubject)).subscribe(() => {
    //   // AfterAnimation fires when the snap/flick animation completes, not here.
    // });

    // Drag: translate cover in real time while pointer is down.
    start$.pipe(
      switchMap(startEvent => {
        const origin = this._translate$.getValue();
        const startPos = startEvent.position;
        const closed = this._closedTranslate();
        const [min, max] = closed < 0 ? [closed, 0] : [0, closed];

        return this._gestureController.position$.pipe(
          takeUntil(end$),
          map(pos => {
            const delta = isHorizontal ? pos.x - startPos.x : pos.y - startPos.y;
            return CoverMath.clamp(origin + delta, min, max);
          })
        );
      }),
      takeUntil(this._disconnectSubject)
    ).subscribe(tx => {
      this._translate$.next(tx);
    });

    // Drag end: snap to open or closed based on how far cover has traveled.
    end$.pipe(
      filter(g => g.type === 'end'),
      takeUntil(this._disconnectSubject)
    ).subscribe(() => {
      const tx = this._translate$.getValue();
      const closed = this._closedTranslate();
      Math.abs(tx) < Math.abs(closed) / 2 ? this.show() : this.hide();
    });

    // Flick: open or close based on velocity direction relative to side.
    end$.pipe(
      filter(g => g.type === 'flick'),
      takeUntil(this._disconnectSubject)
    ).subscribe(e => {
      this._flickShouldOpen(e.velocity) ? this.show() : this.hide();
    });
  }

  // ---------------------------------------------------------------------------
  // Animation
  // ---------------------------------------------------------------------------

  private _cancelAnimation(): void {
    if (this._animationFrameId !== undefined) {
      cancelAnimationFrame(this._animationFrameId);
      this._animationFrameId = undefined;
    }
  }

  private _getAnimDuration(): number {
    const raw = getComputedStyle(this).getPropertyValue('--cover-anim-duration').trim();
    if (raw.endsWith('ms')) return parseFloat(raw);
    if (raw.endsWith('s')) return parseFloat(raw) * 1000;
    return 300;
  }

  /*
   * Drives the snap/flick animation via rAF instead of CSS transitions.
   *
   * CSS transitions on .cover promote it to a compositor layer. Slotted light-DOM
   * content is composited separately and does NOT move with the shadow-DOM transform
   * during a CSS transition — only during JS-driven style updates. Using rAF here
   * keeps the animation on the main thread, matching the drag path that works correctly.
   */
  private _animateTo(target: number, isOpen: boolean): void {
    this._cancelAnimation();

    // Activate scrim and fire BeforeAnimation immediately — covers button-triggered animations
    // (gesture-triggered path also calls this via start$.subscribe, double-fire is idempotent).
    this.scrimElement?.classList.add('is-active');
    this._fireCoverpageEvent(CoverpageEvents.BeforeAnimation, { elementId: this.id ?? '' });

    const start = this._translate$.getValue();
    const duration = this._getAnimDuration();

    if (duration <= 0 || start === target) {
      this._translate$.next(target);
      this._openState$.next(isOpen);
      this.open = isOpen;
      this.coverElement.classList.remove('will-change');
      if (!isOpen) {
        this.scrimElement.classList.remove('is-active');
      }
      this._fireCoverpageEvent(CoverpageEvents.AfterAnimation, { elementId: this.id ?? '' });
      return;
    }

    this.coverElement.classList.add('will-change');
    const startTime = performance.now();
    const easeOut = (t: number): number => 1 - Math.pow(1 - t, 3);

    const tick = (now: number) => {
      const t = Math.min((now - startTime) / duration, 1);
      this._translate$.next(start + (target - start) * easeOut(t));

      if (t < 1) {
        this._animationFrameId = requestAnimationFrame(tick);
      } else {
        this._animationFrameId = undefined;
        this.coverElement.classList.remove('will-change');
        this._openState$.next(isOpen);
        this.open = isOpen;
        this._fireCoverpageEvent(CoverpageEvents.AfterAnimation, { elementId: this.id ?? '' });
      }
    };

    this._animationFrameId = requestAnimationFrame(tick);
  }

  // ---------------------------------------------------------------------------
  // Helpers
  // ---------------------------------------------------------------------------

  private _getCssPeekSize(): number {
    const raw = getComputedStyle(this).getPropertyValue('--cover-peek-size').trim();
    const parsed = parseFloat(raw);
    return isNaN(parsed) ? this.peekSize : parsed;
  }

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

  private _buildTransform(tx: number): string {
    if (this.side === 'top' || this.side === 'bottom') {
      return `translate(0, ${tx}px)`;
    }
    return `translate(${tx}px, 0)`;
  }

  /** Returns true if a flick in this velocity direction should open the cover. */
  private _flickShouldOpen(velocity: Vec2): boolean {
    switch (this.side) {
      case 'left':   return velocity.x > 0;
      case 'right':  return velocity.x < 0;
      case 'top':    return velocity.y > 0;
      case 'bottom': return velocity.y < 0;
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
      --cover-peek-size: 0px;
      --cover-size: 100%;
      --cover-anim-duration: 300ms;
      --cover-base-z-index: 100;
      z-index: var(--cover-base-z-index);
    }

    /* Declared on :host (light DOM) so browser sees it in the composed tree touch-action walk. */
    :host([side="top"]),
    :host([side="bottom"]) {
      touch-action: none;
    }

    :host([side="left"]),
    :host([side="right"]) {
      touch-action: pan-y;
    }

    .scrim {
      /*
        Render a 10%x10% rect. Scale to 100%. Make sure the origin
        is top left so we do not have to offset via magic numbers.
      */
      position: fixed;
      top: 0;
      left: 0;
      width: 10vw;
      height: 10vh;
      transform: scale(10, 10);
      transform-origin: top left;

      pointer-events: none;
      touch-action: none;
      background-color: rgba(0, 0, 0, 0.5);
      opacity: 0;
      transition: opacity var(--cover-anim-duration) ease;
      z-index: calc(var(--cover-base-z-index, 100));
    }

    .scrim.is-active {
      pointer-events: auto;
    }

    .cover {
      position: fixed;
      z-index: calc(var(--cover-base-z-index, 100) + 2);
      contain: strict;
      pointer-events: auto;
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
      width: var(--cover-size);
      /* Allow browser to handle vertical scroll/pan; component owns horizontal axis. */
      touch-action: pan-y;
    }

    .cover.vertical {
      width: 100vw;
      height: var(--cover-size);
      /* Block vertical pan to suppress pull-to-refresh; component owns vertical axis. */
      touch-action: pan-x;
    }

    .cover.left   { top: 0;  bottom: 0; left:   0; }
    .cover.right  { top: 0;  bottom: 0; right:  0; }
    .cover.top    { left: 0; right: 0;  top:    0; }
    .cover.bottom { left: 0; right: 0;  bottom: 0; }

    /*
     * Slotted light-DOM elements with position:absolute resolve their containing
     * block up the LIGHT DOM ancestor chain, bypassing this shadow root entirely.
     * That means they are positioned relative to the viewport and are NOT
     * transformed when .cover translates — they stay fixed in viewport space while
     * the cover slides underneath them.
     *
     * This wrapper is position:relative inside the shadow DOM, so it becomes the
     * containing block for any absolutely-positioned slotted content. Because it
     * lives inside .cover it participates in .cover's transform, keeping slotted
     * content correctly anchored to the cover during animations.
     */
    .slot-wrapper {
      overscroll-behavior: contained;
      z-index: calc(var(--cover-base-z-index, 100) + 3);
      position: relative;
      width: 100%;
      height: 100%;
    }
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
        <div class="slot-wrapper">
          <slot></slot>
        </div>
      </div>
    `;
  }
}
