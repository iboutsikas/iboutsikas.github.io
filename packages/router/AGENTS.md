# @iboutsikas/router — agent reference

Lit web component implementing SPA navigation with View Transitions API support.

## Source layout

```
src/
  router.ts          # IbRouter LitElement — all navigation logic
  index.ts           # re-exports router + types
  types/
    events.ts        # RouterEvents enum, event detail interfaces
```

## Custom element

`<ib-router>` — renders nothing (`createRenderRoot` returns `this`, `render` returns `nothing`).  
Registers global listeners on connect, removes them on disconnect.

## Public properties (all `@property({ type: String })`)

| Property          | Default             | Purpose                                          |
| ----------------- | ------------------- | ------------------------------------------------ |
| `contentSelector` | `'#_content'`       | `querySelector` target for innerHTML swap        |
| `leavingClass`    | `'router-leaving'`  | Class added to content before swap (non-VT path) |
| `enteringClass`   | `'router-entering'` | Class added to content after swap (non-VT path)  |

## Events (all `bubbles: true, composed: true`, dispatched on the element)

| Event                        | Const                             | Detail type                           | Timing                                                                                                          |
| ---------------------------- | --------------------------------- | ------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `router-before-navigate`     | `RouterEvents.BeforeNavigate`     | `{ url, title, defaultPrevented }`    | Before swap; `cancelable: true` — call `e.preventDefault()` to abort SPA nav and fall back to `location.assign` |
| `router-navigated`           | `RouterEvents.Navigated`          | `{ url, title, from, isBackForward }` | Synchronous, inside VT callback or after `_markLeaving`                                                         |
| `router-navigation-complete` | `RouterEvents.NavigationComplete` | `{ url, title, from, isBackForward }` | Via `queueMicrotask` after transition finishes                                                                  |
| `router-navigation-error`    | `RouterEvents.NavigationError`    | `{ url, error }`                      | Via `queueMicrotask`; fired on HTTP errors or network failures                                                  |

## Navigation flow

### Click interception (`_handleClick` on `document`)

Passes through (does NOT navigate) when any of:

- Modifier key held (`ctrlKey / metaKey / shiftKey / altKey`)
- `e.defaultPrevented`
- `e.button !== 0`
- No ancestor `<a>` element
- `<a target="_blank">`
- `<a download>`
- `<a rel="...external...">`
- Cross-origin href
- Same-page href (same pathname + search), with or without hash

### `_navigate(url, { pushState, isBackForward })`

```
fetch(url, { signal })
  → DOMParser extracts #_content innerHTML + document.title from response

if SUPPORTS_VT:
  _beforeNavigate → if prevented: location.assign; return
  document.startViewTransition(() => _applySwap + _dispatchNavigated)
  await transition.finished
  _dispatchNavigationComplete (queueMicrotask)

else:
  _beforeNavigate → if prevented: location.assign; return
  _markLeaving(content)   ← adds leavingClass, waits transitionend OR 1000ms
  _applySwap              ← innerHTML swap + title + history.pushState + scrollTo top
  _dispatchNavigated
  _markEntering(content)  ← removes leavingClass, adds enteringClass, waits transitionend OR 1000ms, removes enteringClass
  _dispatchNavigationComplete (queueMicrotask)

catch:
  AbortError → silent return
  anything else → _dispatchNavigationError (queueMicrotask) + location.assign(url)
```

### Concurrency

New navigation aborts in-flight fetch via `AbortController`. `_controller` nulled in `finally`.

### `_fetchPage` detail

Always parses `doc.getElementById('_content')?.innerHTML` from the fetched document — hardcoded, not affected by `contentSelector`. `contentSelector` only controls WHERE in the current page the swapped HTML lands.

### Popstate

`window popstate` → `_navigate(location.href, { pushState: false, isBackForward: true })`

## `SUPPORTS_VT`

Module-level const: `typeof document.startViewTransition === 'function'`.  
Evaluated once at import time. In jsdom (vitest) this is `false` by default.

**Testing VT path**: use `vi.hoisted()` to define `document.startViewTransition` before the module imports — see `router-vt.spec.ts`.

## Test files

| File                    | Environment                                | What it covers                                                         |
| ----------------------- | ------------------------------------------ | ---------------------------------------------------------------------- |
| `src/router.spec.ts`    | jsdom (SUPPORTS_VT=false)                  | lifecycle, click bypasses, navigation core, events, transition classes |
| `src/router-vt.spec.ts` | jsdom + hoisted VT mock (SUPPORTS_VT=true) | VT code path                                                           |

### Test setup notes

- `location.assign` is non-configurable in jsdom — use `Object.defineProperty(window, 'location', { configurable: true, writable: true, value: { ... assign: vi.fn() } })` in `beforeAll`.
- Non-VT path has two 1000ms `setTimeout` transitions — use `vi.useFakeTimers()` + `vi.advanceTimersByTimeAsync(2100)` then flush microtasks twice.
- `NavigationComplete` and `NavigationError` fire via `queueMicrotask` — need extra `flushMicrotasks()` calls after timer advancement.
- VT path: no timers, but `await transition.finished.catch(() => {})` needs ~4 microtask ticks before `NavigationComplete` fires — `settleNavigation` loops 6x.

## Nx targets

| Target      | Command                   |
| ----------- | ------------------------- |
| `build`     | `npx nx build router`     |
| `test`      | `npx nx test router`      |
| `dev`       | `npx nx dev router`       |
| `typecheck` | `npx nx typecheck router` |
