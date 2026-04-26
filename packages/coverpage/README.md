# @iboutsikas/coverpage

A Lit web component implementing a swipeable cover/drawer panel with pointer gesture support.

## Features

- Swipeable panels on any edge: `left`, `right`, `top`, `bottom`
- Pointer gesture tracking with velocity-based flick detection
- Configurable movement and speed thresholds
- CSS custom property driven sizing and animation duration
- Smooth rAF-driven animations with ease-out interpolation
- Scrim overlay with click-to-close
- Reactive state via RxJS observables (`openState$`, `translate$`)

## Usage

```html
<ib-coverpage id="sidebar" side="left" peek-size="250">
  <nav>
    <ul>
      <li><a href="#">Home</a></li>
      <li><a href="#">About</a></li>
    </ul>
  </nav>
</ib-coverpage>
```

```js
import '@iboutsikas/coverpage';

const cover = document.querySelector('ib-coverpage');
cover.show(); // open
cover.hide(); // close
```

## Properties

| Property            | Type                                     | Default  | Description                              |
| ------------------- | ---------------------------------------- | -------- | ---------------------------------------- |
| `side`              | `'left' \| 'right' \| 'top' \| 'bottom'` | `'left'` | Edge the cover slides from               |
| `movementThreshold` | `number`                                 | `10`     | Pixels of movement to trigger a drag     |
| `speedThreshold`    | `number`                                 | `2.5`    | Velocity threshold for flick detection   |
| `peekSize`          | `number`                                 | `0`      | Minimum visible size of the closed cover |
| `open`              | `boolean`                                | `false`  | Whether the cover is open                |

## CSS Custom Properties

| Property                | Default | Description                          |
| ----------------------- | ------- | ------------------------------------ |
| `--cover-peek-size`     | `0px`   | Size of the cover when closed        |
| `--cover-size`          | `100%`  | Size of the cover when open          |
| `--cover-anim-duration` | `300ms` | Duration of open/close animations    |
| `--cover-base-z-index`  | `100`   | Base z-index for the cover and scrim |

## Methods

| Method   | Description                                         |
| -------- | --------------------------------------------------- |
| `show()` | Slide the cover to the fully open position          |
| `hide()` | Slide the cover back to the resting (peek) position |

## Events

| Event                        | Detail                             | Description                                               |
| ---------------------------- | ---------------------------------- | --------------------------------------------------------- |
| `coverpage-startup`          | `{ elementId: string }`            | Component connected and initialized                       |
| `coverpage-shutdown`         | `{ elementId: string }`            | Component disconnected                                    |
| `coverpage-before-animation` | `{ elementId: string }`            | Animation about to start                                  |
| `coverpage-after-animation`  | `{ elementId: string }`            | Animation completed                                       |
| `coverpage-progress`         | `{ elementId: string, t: number }` | Progress during drag/animation (`0` = closed, `1` = open) |

```js
cover.addEventListener('coverpage-progress', (e) => {
  const { t } = e.detail;
  console.log(`Progress: ${Math.round(t * 100)}%`);
});
```

## TypeScript

```ts
import '@iboutsikas/coverpage';
import { CoverpageEvents, type CoverpageEventMap } from '@iboutsikas/coverpage';

const cover = document.querySelector<HTMLElement>('ib-coverpage');
cover.addEventListener(CoverpageEvents.Progress, (e) => {
  const { t } = (e as CustomEvent<CoverpageEventMap[typeof CoverpageEvents.Progress]>).detail;
});
```

## License

GPL-3.0-only
