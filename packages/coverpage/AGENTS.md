# @iboutsikas/coverpage — Agent Reference

Lit web component: swipeable cover/drawer panel with pointer gesture support.

**Custom element:** `<ib-coverpage>`  
**Entry point:** `src/index.ts` → re-exports `IbCoverpage` from `coverpage.ts`  
**Build output:** `dist/coverpage.js` + `.d.ts` (ES module)

---

## Source layout

```
src/
  coverpage.ts                  # IbCoverpage — LitElement host
  index.ts                      # public re-export
  coverpage.spec.ts
  controllers/
    gesture-controller.ts       # RxJS pointer → gesture pipeline
    gesture-controller.spec.ts
  types/
    definitions.ts              # Side, CoverConfig, IConfigProvider, Vec2
    gesture.ts                  # GestureEvent, createGestureEvent, gestureEventFrom
    events.ts                   # CoverpageEvents enum, CoverpageEventMap, payload interfaces
  utils/
    cover-math.ts               # CoverMath.clamp / distanceSq / magnitudeSq (static)
    observe.ts                  # observeSize(el) → Observable<{width,height}>
```

---

## IbCoverpage (`src/coverpage.ts`)

### Properties (`@property`)

| Property | Type | Default | Notes |
|---|---|---|---|
| `side` | `'left'\|'right'\|'top'\|'bottom'` | `'left'` | Which edge cover slides from |
| `movementThreshold` | `number` | `10` | Min px² distance before drag registers |
| `speedThreshold` | `number` | `2` | px/ms velocity for flick detection |
| `peekSize` | `number` | `0` | Px visible when closed (also via CSS) |
| `open` | `boolean` | `false` | Setting at parse time = no animation |

### Public methods

- `show()` — animate to fully open
- `hide()` — animate to closed/peek position

### Public observables

- `openState$: Observable<boolean>` — settled open/closed state (post-animation)
- `translate$: Observable<number>` — cover translate in px (0 = open)

### CSS custom properties

| Property | Default | Effect |
|---|---|---|
| `--cover-size` | `100%` | Width (horizontal) or height (vertical) |
| `--cover-anim-duration` | `300ms` | Snap/flick animation duration |
| `--cover-peek-size` | `0px` | Visible size when closed (overrides `peekSize`) |
| `--cover-base-z-index` | `100` | Stacking base; scrim = base, cover = base+2, slot-wrapper = base+3 |

### Events (all bubble + composed)

All events use `CoverpageEvents` enum as names. Payloads:

| Event | Name string | Payload fields |
|---|---|---|
| `Startup` | `coverpage-startup` | `elementId` |
| `Shutdown` | `coverpage-shutdown` | `elementId` |
| `BeforeAnimation` | `coverpage-before-animation` | `elementId` |
| `AfterAnimation` | `coverpage-after-animation` | `elementId` |
| `Progress` | `coverpage-progress` | `elementId, t (0–1), travel (px), side` |

### Shadow DOM structure

```
<div class="scrim">                    <!-- fixed overlay, opacity driven by t$ -->
<div class="cover horizontal|vertical left|right|top|bottom">
  <div class="slot-wrapper">           <!-- position:relative containing block for slotted content -->
    <slot>
```

**Important:** Animation uses rAF (not CSS transitions) because CSS transitions on `.cover` break slotted light-DOM content positioning.

### Key internals

- `_translate$: BehaviorSubject<number>` — drives `cover.style.transform` directly
- `_openState$: BehaviorSubject<boolean>` — settles after animation completes
- `_coverSize$: Observable<{width,height}>` — `observeSize` + `shareReplay(1)`, set in `firstUpdated`
- `_disconnectSubject: Subject<void>` — `takeUntil` gate for all subscriptions
- `_closedTranslate(dim?)` — computes translate for closed position from cover size + peekSize
- `_animateTo(target, isOpen)` — rAF loop with cubic ease-out, reads `--cover-anim-duration`
- Config changes (`side`, `movementThreshold`, `speedThreshold`) trigger `GestureController` reconnect
- `_firstUpdateDone` guard: skips animation on initial `open` attribute set

---

## GestureController (`src/controllers/gesture-controller.ts`)

RxJS-based pointer event processor. Not a Lit ReactiveController — manually wired.

### Constructor
```ts
new GestureController(config: IConfigProvider)
```
`IConfigProvider` = `{ movementThreshold: number, speedThreshold: number }`

### Public API

- `connect(element: HTMLElement)` — subscribes to pointer events on element
- `disconnect()` — unsubscribes
- `gesture$: Observable<GestureEvent>` — emits `start | move | end | flick`
- `position$: Observable<Vec2>` — deduplicated positions during drag (not emitted on flick)

### Pipeline behavior

- `pointerdown` on element → `start` event
- `pointermove` on `window`, throttled to animation frame, filtered by `movementThreshold²`
- `pointerup` on `window` → `end` or `flick` (if velocity² > `speedThreshold²`)
- `exhaustMap` — ignores new pointerdowns during active drag
- Only primary pointer tracked (`e.isPrimary`)
- Velocity computed as `Δpos / Δtime` (px/ms) between last and current event

---

## Types (`src/types/`)

### `definitions.ts`
- `Side` — `'left'|'right'|'top'|'bottom'`
- `CoverConfig` — `{ side, movementThreshold, speedThreshold }`
- `IConfigProvider` — getter subset of `CoverConfig` (used by `GestureController`)
- `Vec2` — `{ x: number, y: number }`

### `gesture.ts`
- `GestureEvent` — `{ type, position: Vec2, velocity: Vec2, timestamp: number }` (readonly)
- `createGestureEvent(type, position, velocity?, timestamp?)` — factory
- `gestureEventFrom(other, overrides?)` — shallow-copy + override

### `events.ts`
- `CoverpageEvents` enum — string event names
- `CoverpageEventMap` — maps enum keys to payload interfaces
- Global `WindowEventMap` augmentation for typed `addEventListener`

---

## Utils (`src/utils/`)

### `cover-math.ts` — `CoverMath` (static class)
- `clamp(value, min, max)` — generic number clamp
- `distanceSq(a, b)` — squared Euclidean distance between two `Vec2`
- `magnitudeSq(a)` — squared magnitude of `Vec2`

### `observe.ts`
- `observeSize(element)` → `Observable<{width, height}>` — wraps `ResizeObserver`, emits current size synchronously on subscribe, disconnects on unsubscribe

---

## Nx targets

Run all tasks via `npx <target> coverpage`.

| Target | What it does |
|---|---|
| `build` | builds ES bundle to `dist/` |
| `test` | Vitest, jsdom environment, single run; not watch |
| `dev` | Serves `test-page/` on 0.0.0.0 (manual dev harness) |
| `typecheck` | `tsc --noEmit` |

---

## Conventions

- All imports use `.js` extension (nodenext module resolution)
- `useDefineForClassFields: false` — required for Lit decorators
- `verbatimModuleSyntax: true` — use `import type` for type-only imports
- Tests co-located with source (`*.spec.ts`)
- Lit accessor pattern: `@property() accessor foo` (not legacy `get/set`)
- Peer dep: `lit ^3.0.0`, `rxjs ^7.8.2`
- All runetime deps are marked as peer since we are in a monorepo
