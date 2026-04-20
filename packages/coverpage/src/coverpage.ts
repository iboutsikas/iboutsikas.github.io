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
  /** The maximum range for the offset. */
  @property({ type: Number }) accessor range: number | undefined = undefined;
  /** The threshold for movement to trigger an interaction. */
  @property({ type: Number }) accessor movementThreshold: number = 10;
  /** The threshold for velocity to trigger a flick. */
  @property({ type: Number }) accessor speedThreshold: number = 1;
  /** The minimum size of the peeked cover. */
  @property({ type: Number }) accessor peekSize: number = 0;
  /** Duration of cover and scrim animations in milliseconds. */
  @property({ type: Number }) accessor animationDuration: number = 300;
  /** Whether the cover is open. Setting this attribute on load starts the cover fully open. */
  @property({ type: Boolean }) accessor open: boolean = false;

  /** The cover element. */
  @query('.cover') accessor coverElement!: HTMLElement;
  /** The scrim element. */
  @query('.scrim') accessor scrimElement!: HTMLElement;

  private _isDragging = false;
  /** Cover translate at the moment a gesture starts — used as drag base. */
  private _translationOrigin = 0;

  private _gestureController: GestureController = new GestureController(this);
  private _disconnectSubject: Subject<void> = new Subject<void>();
  /** Shared cover size stream — initialized in firstUpdated when coverElement is available. */
  private _coverSize$!: Observable<{ width: number; height: number }>;

  /** Source of truth for open/closed state. Drives translate$ and scrim. */
  private readonly _openState$ = new BehaviorSubject<boolean>(false);
  /** Observable consumers can use to react to open/closed transitions. */
  public readonly openState$ = this._openState$.asObservable();

  /** BehaviorSubject driving cover position. Value is the CSS translate in px. */
  private readonly _translate$ = new BehaviorSubject<number>(0);
  /** Observable of cover translate position in px. 0 = fully open, negative/positive = closed. */
  public readonly translate$ = this._translate$.asObservable();

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

    // shareReplay(1) so all consumers (drag pipe, future combineLatests) share one ResizeObserver.
    this._coverSize$ = observeSize(this.coverElement).pipe(shareReplay(1));

    // Disable transition during initial placement — rAF re-enables it after first paint.
    this.coverElement.classList.add('is-dragging');
    this._setupSubscriptions();
    requestAnimationFrame(() => this.coverElement.classList.remove('is-dragging'));
  }

  updated(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('open')) {
      this._openState$.next(this.open);
    }

    const configKeys = ['side', 'range', 'movementThreshold', 'speedThreshold'] as const;
    const configChanged = configKeys.some(k => changedProperties.has(k));
    if (configChanged) {
      this._gestureController.disconnect();
      this._gestureController.connect(this);
    }
  }

  /** Slides the cover to the fully open position. */
  public show(): void {
    this.coverElement.classList.remove('is-dragging');
    this.open = true;
  }

  /** Slides the cover back to the resting (peek) position. */
  public hide(): void {
    this.coverElement.classList.remove('is-dragging');
    this.open = false;
  }

  private _handleScrimClick() {
    this.hide();
  }

  private _setupSubscriptions(): void {
    if (!this.coverElement) {
      throw new Error('[_setupSubscriptions] Called before DOM Queries are made available');
    }

    // openState$ is the open/close authority — drives translate$. Scrim is driven by t$ below.
    this._openState$.pipe(
      takeUntil(this._disconnectSubject)
    ).subscribe(isOpen => {
      this._translate$.next(isOpen ? 0 : this._closedTranslate());
    });

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

    t$.pipe(takeUntil(this._disconnectSubject)).subscribe(t => {
      if (this.scrimElement) {
        this.scrimElement.style.opacity = String(t);
        this.scrimElement.style.pointerEvents = t > 0 ? 'auto' : 'none';
      }
      this._fireCoverpageEvent(CoverpageEvents.Progress, { elementId: this.id ?? '', t });
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

    // CSS classes: disable transition while dragging, re-enable on release.
    start$.pipe(takeUntil(this._disconnectSubject)).subscribe(() => {
      this.coverElement.classList.add('will-change', 'is-dragging');
      this._fireCoverpageEvent(CoverpageEvents.BeforeAnimation, { elementId: this.id ?? '' });
    });

    end$.pipe(takeUntil(this._disconnectSubject)).subscribe(() => {
      this.coverElement.classList.remove('will-change', 'is-dragging');
      this._fireCoverpageEvent(CoverpageEvents.AfterAnimation, { elementId: this.id ?? '' });
    });

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
      --cover-peek-size: 0px;
      --cover-anim-duration: 300ms;
      --cover-base-z-index: 100;
      z-index: var(--cover-base-z-index);
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


      background-color: rgba(0, 0, 0, 0.5);
      opacity: 0;
      transition: opacity var(--cover-anim-duration) ease;
      z-index: calc(var(--cover-base-z-index, 100) - 1);
    }

    .cover {
      position: fixed;
      z-index: calc(var(--cover-base-z-index, 100) + 3);
      contain: strict;
      transition: transform var(--cover-anim-duration, 300ms) ease;
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
      width: var(--cover-size);
    }

    .cover.vertical {
      width: 100vw;
      height: var(--cover-size);
    }

    .cover.left   { top: 0;  bottom: 0; left:   calc(-1 * var(--cover-size) + var(--cover-peek-size); }
    .cover.right  { top: 0;  bottom: 0; right:  calc(-1 * var(--cover-size) + var(--cover-peek-size); }
    .cover.top    { left: 0; right: 0;  top:    calc(-1 * var(--cover-size) + var(--cover-peek-size); }
    .cover.bottom { left: 0; right: 0;  bottom: calc(-1 * var(--cover-size) + var(--cover-peek-size); }
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
