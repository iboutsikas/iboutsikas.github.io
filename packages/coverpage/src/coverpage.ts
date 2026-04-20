import { LitElement, html, css, type PropertyValues } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import { property } from 'lit/decorators.js';
import { GestureController } from './controllers/gesture-controller.js';
import type { Side, CoverConfig } from './types/definitions.js';
import { CoverMath } from './utils/cover-math.js';
import { filter, map, share, Subject, withLatestFrom } from 'rxjs';
import { CoverpageEvents, type CoverpageEventMap } from './types/events.js';
import { classMap } from 'lit/directives/class-map.js';
import { observeSize } from './utils/observe.js';

type SideMapping = {
  axis: 'x'| 'y';
  invert: boolean;
}

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

  /** Viewport dimension along the active axis — used for gesture coordinate mapping. */
  private _viewportDim = 0;
  /** Rendered pixel size of the cover element — read via offsetWidth/offsetHeight after layout. */
  private _coverDim = 0;
  /** Current visual position during drag; updated directly without Lit render cycle. */
  private _dragOffset = 0;
  /** RAF ID for the progress-tracking loop; cancelled on new animation or disconnect. */
  private _rafId = 0;

  private _sideMapping: SideMapping = { axis: 'x', invert: false };

  private _config!: CoverConfig;
  private _gestureController?: GestureController;
  private _disconnectSubject: Subject<void> = new Subject<void>();

  constructor() {
    super();
    this._updateConfig();
  }

  connectedCallback() {
    super.connectedCallback();
    this._updateConfig();
    this._gestureController = new GestureController(this._config);
    this._gestureController.connect(this);
  }



  disconnectedCallback() {
    this._disconnectSubject.next();
    super.disconnectedCallback();

    this._fireCoverpageEvent(CoverpageEvents.Shutdown, {
      elementId: this.id ?? ''
    });
  }

  firstUpdated() {
    this._fireCoverpageEvent(CoverpageEvents.Startup, {
      elementId: this.id ?? ''
    });

    const coverSize$ = observeSize(this.coverElement);
    const gesture$ = this._gestureController.gesture$;

    const start$ = gesture$.pipe(
      filter(g => g.type == 'start'),
      share()
    );

    const move$ = gesture$.pipe(
      filter(g => g.type === 'move'),
      share()
    )

    const end$ = gesture$.pipe(
      filter(g => g.type === 'end'),
      share()
    );

    const translate = move$.pipe(
      withLatestFrom(start$, coverSize$),
      map(([movement, start, {width, height}]) => {
        const delta = movement.position.x - start.position.x;
        const translation = start.position.x + delta;
        if (this.side === 'left') {
          return CoverMath.clamp(translation, 0, width);
        }
        else if (this.side === 'right') {
          return CoverMath.clamp(translation, -width, 0);
        }
        return translation;
      })
    );

    translate.subscribe((translation) => {
      this.coverElement.style.transform = `translate(${translation}px, 0)`;
    });


    start$.subscribe((_) => {
      this.coverElement.classList.add('will-change');
      this._fireCoverpageEvent(CoverpageEvents.BeforeAnimation, {
        elementId: this.id ?? ''
      });
    });

    end$.subscribe((_) => {
      this.coverElement.classList.remove('will-change');
      this._fireCoverpageEvent(CoverpageEvents.AfterAnimation, {
        elementId: this.id ?? ''
      });
    });
  }

  updated(changedProperties: PropertyValues<this>) {

  }

  private _updateConfig() {
    this._config = {
      side: this.side,
      range: this.range,
      movementThreshold: this.movementThreshold,
      speedThreshold: this.speedThreshold
    };
  }

  /** Animates the cover to the fully open position and shows the scrim. */
  public open(): void {

  }

  /** Animates the cover back to the resting (peek) position and hides the scrim. */
  public close(): void {

  }

  private _handleScrimClick() {

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
      z-index: calc(var(--cover-base-z-index, 100));
    }
    .scrim.visible {
      opacity: 1;
      pointer-events: auto;
    }

    .cover {
      position: fixed;
      pointer-events: grab;
      touch-action: none;
      z-index: calc(var(--cover-base-z-index, 100) + 3);
      contain: strict;
    }

    .cover.horizontal {
      height: 100vh;
      width: var(--cover-width);
    }

    .cover.vertical {
      width: 100vw;
      height: var(--cover-width);
    }

    .cover.left { 
      top: 0; 
      // left:  calc(-1 * var(--cover-width, 300px) + var(--cover-peek-width, 0px));
      left: 0; 
      bottom: 0; 
    }
    .cover.right  { top: 0; right: 0; bottom: 0; }
    .cover.top    { top: 0; left: 0; right: 0; }
    .cover.bottom { bottom: 0; left: 0; right: 0; }

    .cover.will-change { will-change: transform; }
  `;

  render() {
    const sideClass = this.side;
    const scrimClass = this._scrimOpen ? 'visible' : '';

    return html`
       <div class="scrim ${scrimClass}" @click=${this._handleScrimClick}></div>
       <div class=${classMap({
        cover: true,
        horizontal: this.side == 'left' || this.side == 'right',
        [this.side]: true
       })}>
         <slot></slot>
       </div>
     `;
  }

}
