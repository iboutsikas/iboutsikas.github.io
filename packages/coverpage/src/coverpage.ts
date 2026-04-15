import { LitElement, html, css, type PropertyValues } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import { property } from 'lit/decorators.js';
import { GestureController } from './controllers/gesture-controller.js';
import type { Side, CoverConfig } from './types/definitions.js';
import { CoverMath } from './utils/cover-math.js';
import { distinctUntilChanged, filter, Subject, takeUntil } from 'rxjs';
import { observeSize } from './utils/observe.js';

@customElement('ib-coverpage')
export class IbCoverpage extends LitElement {
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
  @query('.cover') accessor coverElement!: HTMLElement

  @state() private _currentOffset = 0;
  @state() private _resolvedPeekSize = 0;
  private _viewportDim = 0;

  private _sideMapping: { axis: 'x' | 'y', invert: boolean } = { axis: 'x', invert: false };

  private _config!: CoverConfig;
  private _gestureController?: GestureController;
  private _disconnectSubject: Subject<void> = new Subject<void>();
  private _progressSubject: Subject<number> = new Subject<number>();
  private _isSliding: boolean = false;
  private _skipNextAnimation: boolean = true;

  constructor() {
    super();
    this._updateConfig();
  }

  connectedCallback() {
    super.connectedCallback();
    this._updateConfig();
    this._gestureController = new GestureController(this._config);
    this._gestureController.connect(this);

    observeSize(this)
      .pipe(takeUntil(this._disconnectSubject))
      .subscribe(() => {
        const { axis } = this._sideMapping;
        this._viewportDim = axis === 'x' ? window.innerWidth : window.innerHeight;
        this._readPeekSize();
        if (this._scrimOpen) {
          this._currentOffset = this._viewportDim;
        } else {
          this._currentOffset = this._resolvedPeekSize;
        }
        this._progressSubject.next(this._currentOffset);
      });

    this._progressSubject
      .pipe(distinctUntilChanged(), takeUntil(this._disconnectSubject))
      .subscribe(offset => {
        const { axis } = this._sideMapping;
        const fullSize = this._viewportDim;
        this.dispatchEvent(new CustomEvent('cover-progress', {
          detail: { offset, peekSize: this._resolvedPeekSize, fullSize },
          bubbles: true,
          composed: true
        }));
      });

    this._gestureController.state$
      .pipe(takeUntil(this._disconnectSubject))
      .subscribe(state => {
         if (state === 'idle') {
           this._scrimOpen = false;
           this._isSliding = false;
           this.coverElement?.classList.remove('is-interacting');
           this._snapToResting();
         } else {
           this.coverElement?.classList.add('is-interacting');
         }
       });

       this._gestureController.gesture$
         .pipe(
           filter(gesture => gesture.type === 'flick' && !this._isSliding),
           takeUntil(this._disconnectSubject)
         )
         .subscribe(flick => {
           this._isSliding = true;

           const { axis, invert } = this._sideMapping;
           const velocity = axis === 'x' ? flick.velocity.x : flick.velocity.y;
           const sign = invert ? -1 : 1;

           if (velocity === 0)
             return;

           // left/top (non-inverted) flick outward = open, inward = peek
           this._currentOffset = velocity * sign > 0 ? this._viewportDim : this._resolvedPeekSize;
            this._scrimOpen = this._currentOffset > this._resolvedPeekSize;
         });

       this._gestureController.position$
         .pipe(
           filter(_ => !this._isSliding),
           takeUntil(this._disconnectSubject)
         )
         .subscribe(pos => {
           this._handlePositionUpdate(pos);
         });


     // Initialize peek size and set initial cover size without animation
     this.updateComplete.then(() => {
       this._readPeekSize();
       if (this._resolvedPeekSize > 0 && this.coverElement) {
         const prop = (this.side === 'left' || this.side === 'right') ? 'width' : 'height';
         this.coverElement.style[prop] = `${this._resolvedPeekSize}px`;
         this._skipNextAnimation = true;
         this._currentOffset = this._resolvedPeekSize;
       }
     });
  }

  disconnectedCallback() {
    this._disconnectSubject.next();
    this._gestureController?.disconnect();
    super.disconnectedCallback();
  }

  updated(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('side')) {
      this._sideMapping = this._computeSideMapping();
    }

    if (changedProperties.has('animationDuration')) {
      this.style.setProperty('--anim-duration', `${this.animationDuration}ms`);
    }

    if (changedProperties.has('_scrimOpen' as keyof IbCoverpage)) {
      this.dispatchEvent(new CustomEvent('scrim-change', {
        detail: { visible: this._scrimOpen },
        bubbles: true,
        composed: true
      }));
    }

    if (changedProperties.has('_currentOffset' as keyof IbCoverpage)) {
      const oldOffset = changedProperties.get('_currentOffset' as keyof IbCoverpage) as number;
      const wasPeeking = oldOffset <= this._resolvedPeekSize;
      const isPeeking = this._currentOffset <= this._resolvedPeekSize;

      if (wasPeeking !== isPeeking) {
        this.dispatchEvent(new CustomEvent('peek-mode-change', {
          detail: { isPeeking },
          bubbles: true,
          composed: true
        }));
      }

      if (this._skipNextAnimation) {
        this._skipNextAnimation = false;
        return;
      }

      const animations: Keyframe[] | PropertyIndexedKeyframes | null = [];

      if (this.side === 'left' || this.side === 'right') {
        animations.push({
          width: `${this._currentOffset}px`
        });
      }
      else if (this.side === 'top' || this.side === 'bottom') {
        animations.push({
          height: `${this._currentOffset}px`
        });
      }

      const anim = this.coverElement.animate(animations, {
        duration: this.animationDuration,
        fill: 'forwards'
      });

      this._trackAnimation(anim, oldOffset ?? 0);

      anim.finished.then(() => {
        if (this._isSliding) {
          this._isSliding = false;
        }
      });
    }
  }

  private _readPeekSize(): void {
    const raw = getComputedStyle(this).getPropertyValue('--cover-peek-size').trim();
    const parsed = parseFloat(raw);
    this._resolvedPeekSize = isNaN(parsed) ? this.peekSize : parsed;
    this.style.setProperty('--cover-peek-width', `${this._resolvedPeekSize}px`);
  }

  private _updateConfig() {
    this._config = {
      side: this.side,
      range: this.range,
      movementThreshold: this.movementThreshold,
      speedThreshold: this.speedThreshold
    };
  }

  private _computeSideMapping(): { axis: 'x' | 'y', invert: boolean } {
    switch (this.side) {
      case 'left':   return { axis: 'x', invert: false };
      case 'right':  return { axis: 'x', invert: true };
      case 'top':    return { axis: 'y', invert: false };
      case 'bottom': return { axis: 'y', invert: true };
      default: throw new Error(`Unknown side: ${this.side}`);
    }
  }

  private _handlePositionUpdate(pos: { x: number; y: number }) {
    const { axis, invert } = this._sideMapping;
    const val = axis === 'x' ? pos.x : pos.y;

    const offset = invert ? this._viewportDim - val : val;
    const maxRange = this.range ?? this._viewportDim;
    this._currentOffset = CoverMath.clamp(offset, this._resolvedPeekSize, maxRange);
    this._scrimOpen = this._currentOffset > this._resolvedPeekSize;
    this._progressSubject.next(this._currentOffset);
  }


  private _trackAnimation(anim: Animation, startOffset: number): void {
    const finalOffset = this._currentOffset;
    const duration = this.animationDuration;

    const tick = () => {
      if (anim.playState === 'finished') {
        this._progressSubject.next(finalOffset);
        return;
      }

      // Interpolate mathematically — no DOM read needed.
      // currentTime is null before the animation starts; treat that as 0.
      const elapsed = (anim.currentTime as number) ?? 0;
      const t = duration > 0 ? Math.min(elapsed / duration, 1) : 1;
      this._progressSubject.next(startOffset + (finalOffset - startOffset) * t);
      requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }

  private _snapToResting(): void {
    const midpoint = (this._viewportDim + this._resolvedPeekSize) / 2;

    const snapped = this._currentOffset >= midpoint ? this._viewportDim : this._resolvedPeekSize;
    if (snapped !== this._currentOffset) {
      this._isSliding = true;
      this._currentOffset = snapped;
    }
    this._scrimOpen = this._currentOffset > this._resolvedPeekSize;
  }

  /** Animates the cover to the fully open position and shows the scrim. */
  public open(): void {
    this._isSliding = true;
    this._scrimOpen = true;
    this._currentOffset = this._viewportDim;
  }

  /** Animates the cover back to the resting (peek) position and hides the scrim. */
  public close(): void {
    this._isSliding = true;
    this._scrimOpen = false;
    this._currentOffset = this._resolvedPeekSize;
  }

  private _handleScrimClick() {
    if (this._scrimOpen) {
      this.close();
    }
  }

  static styles = css`
    :host {
      display: block;
      position: fixed;
      z-index: 1000;
      pointer-events: none;
      --cover-peek-size: 0px;
      --cover-width: 300px;
      --cover-peek-width: 0px;
      --anim-duration: 300ms;
    }
    .cover.is-interacting {
      user-select: none;
      -webkit-user-select: none;
    }
    .scrim {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      opacity: 0;
      pointer-events: none;
      transition: opacity var(--anim-duration) ease;
      z-index: -1;
    }
    .scrim.visible {
      opacity: 1;
      pointer-events: auto;
    }

    .cover {
      background-color: white;
      box-shadow: 0 0 10px rgba(0,0,0,0.5);
      pointer-events: auto;
      overflow: hidden;
      touch-action: none;
      width: var(--cover-width, 100%);
      height: var(--cover-height, 100%);
    }

    .cover.left { top:0; left: calc(-1 * var(--cover-width) + var(--cover-peek-width)); bottom: 0; will-change: width;}
    .cover.right { top:0; right: 0; bottom: 0; will-change: width;}
    .cover.top { top:0; left: 0; right: 0; will-change: height;}
    .cover.bottom { left: 0; right: 0; bottom: 0; will-change: height;}
  `;

  render() {
    const sideClass = this.side;
    const scrimClass = this._scrimOpen ? 'visible' : '';

     return html`
       <div class="scrim ${scrimClass}" @click=${this._handleScrimClick}></div>
       <div class="cover ${sideClass}">
         <slot></slot>
       </div>
     `;
  }

}
