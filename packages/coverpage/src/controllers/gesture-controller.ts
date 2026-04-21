import { Subject, Observable, merge, fromEvent, animationFrameScheduler, Subscription } from 'rxjs';
import { map, exhaustMap, distinctUntilChanged, filter, throttleTime, takeWhile, tap } from 'rxjs/operators';
import type { IConfigProvider, Vec2 } from '../types/definitions.js';
import { type GestureEvent, createGestureEvent, gestureEventFrom } from '../types/gesture.js';
import { CoverMath } from '../utils/cover-math.js';

export class GestureController {
  private readonly gestureSubject = new Subject<GestureEvent>();
  private readonly positionSubject = new Subject<Vec2>();

  public readonly position$: Observable<Vec2>;
  public readonly gesture$: Observable<GestureEvent>;

  private _subscription: Subscription | undefined;

  constructor(private config: IConfigProvider) {

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
      tap(e => e.preventDefault()),
      throttleTime(0, animationFrameScheduler),
      map(e => createGestureEvent('move', this.getPointerPos(e)))
    );

    const end$ = pointerUp$.pipe(
      map(e => createGestureEvent('end', this.getPointerPos(e)))
    );

    this._subscription = start$.pipe(
      exhaustMap(startEvent => {
        let lastEvent = gestureEventFrom(startEvent);
        this.gestureSubject.next(lastEvent);
        const threshold2 = this.config.movementThreshold * this.config.movementThreshold;
        const speed2 = this.config.speedThreshold * this.config.speedThreshold;
        return merge(
          move$.pipe(
            filter(moveEvent => CoverMath.distanceSq(lastEvent.position, moveEvent.position) >= threshold2)
          ),
          end$
        ).pipe(
          map(event => {
            const velocity = this.computeVelocity(lastEvent, event);
            const velocityMag2 = CoverMath.magnitudeSq(velocity);
            const newEvent = gestureEventFrom(event, { velocity });

            let eventToEmit = newEvent;
            if (velocityMag2 > speed2) {
              eventToEmit = gestureEventFrom(newEvent, { type: 'flick' });
            } else if (event.type === 'move') {
              this.positionSubject.next({ ...newEvent.position });
            } 

            lastEvent = gestureEventFrom(eventToEmit);
            return eventToEmit;
          }),
          tap(event => this.gestureSubject.next(event)),
          // Complete after the end event is processed (inclusive so tap runs first)
          takeWhile(event => event.type !== 'end' && event.type !== 'flick', true)
        );
      })
    ).subscribe();
  }

  public disconnect(): void {
    this._subscription?.unsubscribe();
    this._subscription = undefined;
  }
}
