import { Subject, Observable, merge, fromEvent, animationFrameScheduler, Subscription } from 'rxjs';
import { map, switchMap, takeUntil, tap, distinctUntilChanged, filter, throttleTime, takeWhile } from 'rxjs/operators';
import type { CoverConfig, Vec2 } from '../types/definitions.js';
import { type InteractionState, type GestureEvent, createGestureEvent, gestureEventFrom } from '../types/gesture.js';
import { CoverMath } from '../utils/cover-math.js';

export class GestureController {
  private readonly gestureSubject = new Subject<GestureEvent>();
  private readonly stateSubject = new Subject<InteractionState>();
  private readonly positionSubject = new Subject<Vec2>();

  public readonly state$: Observable<InteractionState>;
  public readonly position$: Observable<Vec2>;
  public readonly gesture$: Observable<GestureEvent>;

  private _suspended: boolean = false;
  private _subscription?: Subscription;

  constructor(private config: CoverConfig) {
    this.state$ = this.stateSubject.asObservable().pipe(distinctUntilChanged());
    this.position$ = this.positionSubject.asObservable().pipe(
      distinctUntilChanged((a, b) => a.x === b.x && a.y === b.y)
    );
    this.gesture$ = this.gestureSubject.asObservable();
  }

  private getPointerPos = (e: PointerEvent): Vec2 => ({
    x: e.clientX,
    y: e.clientY
  });

  private computeVelocity = (start: GestureEvent, end: GestureEvent): Vec2 => {
    const dt = end.timestamp - start.timestamp;
    if (dt <= 0) return { x: 0, y: 0 };
    return {
      x: (end.position.x - start.position.x) / dt,
      y: (end.position.y - start.position.y) / dt
    };
  };

  public connect(element: HTMLElement): void {
    const pointerDown$ = fromEvent<PointerEvent>(element, 'pointerdown').pipe(
      filter(e => e.isPrimary)
    );
    const pointerMove$ = fromEvent<PointerEvent>(window, 'pointermove').pipe(
      filter(e => e.isPrimary)
    );
    const pointerUp$ = fromEvent<PointerEvent>(window, 'pointerup').pipe(
      filter(e => e.isPrimary)
    );

    const start$ = pointerDown$.pipe(
      tap(e => e.preventDefault()),
      map(e => createGestureEvent('start', this.getPointerPos(e)))
    );

    const move$ = pointerMove$.pipe(
      throttleTime(0, animationFrameScheduler),
      map(e => createGestureEvent('move', this.getPointerPos(e)))
    );

    const end$ = pointerUp$.pipe(
      map(e => createGestureEvent('end', this.getPointerPos(e)))
    );

    this._subscription = start$.pipe(
      filter(_ => !this._suspended),
      tap(event => {
        this.stateSubject.next('dragging');
        this.gestureSubject.next(gestureEventFrom(event));
      }),
      switchMap(startEvent => {
        let lastEvent = gestureEventFrom(startEvent);
        const threshold2 = this.config.movementThreshold * this.config.movementThreshold;
        const speed2 = this.config.speedThreshold * this.config.speedThreshold;
        return merge(
          move$.pipe(
            filter(moveEvent => CoverMath.distanceSq(lastEvent.position, moveEvent.position) >= threshold2)
          ),
          end$
        ).pipe(
          tap(event => {
            const velocity = this.computeVelocity(lastEvent, event);
            const velocityMag2 = CoverMath.magnitudeSq(velocity);
            const newEvent = gestureEventFrom(event, { velocity });

            let eventToEmit = newEvent;
            if (velocityMag2 > speed2) {
              eventToEmit = gestureEventFrom(newEvent, { type: 'flick' });
              this.stateSubject.next('sliding');
            } else if (event.type === 'move') {
              this.positionSubject.next({ ...newEvent.position });
            } else if (event.type === 'end') {
              this.stateSubject.next('idle');
            }

            lastEvent = gestureEventFrom(eventToEmit);
            this.gestureSubject.next(eventToEmit);
          }),
          // Complete after the end event is processed (inclusive so tap runs first)
          takeWhile(event => event.type !== 'end' && event.type !== 'flick', true)
        );
      })
    ).subscribe();
  }

  public disconnect(): void {
    this._subscription?.unsubscribe();
    this.gestureSubject.complete();
    this.stateSubject.complete();
    this.positionSubject.complete();
  }

  public suspend(): void {
    this._suspended = true;
  }

  public resume(): void {
    this._suspended = false;
  }
}
