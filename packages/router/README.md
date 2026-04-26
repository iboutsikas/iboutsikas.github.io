# @iboutsikas/router

A Lit web component implementing SPA navigation with View Transitions API support.

## Features

- Intercept same-origin link clicks for SPA navigation
- View Transitions API for smooth content swaps (with CSS fallback)
- Browser back/forward support via `popstate`
- Configurable content element selector and animation classes
- Fires `router-navigated` custom event after each swap

## Usage

```html
<ib-router
  content-selector="#_content"
  leaving-class="router-leaving"
  entering-class="router-entering"
></ib-router>
```

```js
import '@iboutsikas/router';

document.addEventListener('router-navigated', (e) => {
  console.log('Navigated to', e.detail.url);
});
```

## Properties

| Property          | Type     | Default             | Description                                                 |
| ----------------- | -------- | ------------------- | ----------------------------------------------------------- |
| `contentSelector` | `string` | `'#_content'`       | CSS selector for the element whose `innerHTML` gets swapped |
| `leavingClass`    | `string` | `'router-leaving'`  | Class added to content element before swap                  |
| `enteringClass`   | `string` | `'router-entering'` | Class added to content element after swap                   |

## Events

| Event              | Detail                           | Description                                   |
| ------------------ | -------------------------------- | --------------------------------------------- |
| `router-navigated` | `{ url: string, title: string }` | Dispatched after each successful content swap |

```ts
import { RouterEvents, type RouterNavigatedDetail } from '@iboutsikas/router';

document.addEventListener(RouterEvents.Navigated, (e) => {
  const { url, title } = e.detail as RouterNavigatedDetail;
  console.log(`Navigated to ${url}`);
});
```

## CSS

Define animations using the `leavingClass` and `enteringClass` class names:

```scss
#_content {
  &.router-leaving {
    opacity: 0;
    transition: opacity 0.25s ease;
  }
  &.router-entering {
    animation: router-fade-in 0.25s ease;
  }
}

@keyframes router-fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
```

## License

GPL-3.0-only
