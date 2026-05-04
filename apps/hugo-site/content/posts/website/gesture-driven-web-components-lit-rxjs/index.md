---
title: 'Building Gesture-Driven Web Components with Lit and RxJS'
date: 2026-04-29
categories: [webdev, rxjs, lit, webcomponents]
description: 'A technical deep dive into the engineering decisions behind a swipeable web component, covering RxJS gesture pipelines, performance optimizations, and the nuances of Shadow DOM and slotted content.'
---

In my original website, the sidebar functioned as a drawer that expanded over
the entire page. For my new site, I wanted to replicate this experience but with
a much higher level of polish and reusability. I decided to build this as a
standalone web component: `@iboutsikas/coverpage`.

The goal was to create a component that focuses purely on the "cover"
logic—handling the swipe gestures, the opening/closing states, and the
physics—while leaving the actual content to the consumer. To make it truly
useful, the component needed to expose a robust set of events so consumers could
sync their own UI, such as fading in sidebar contents or adjusting background
image positioning to ensure they always look centered relative to the cover
itself.

{{< video src="coverpage-preview.webm" loop="true" caption="Coverpage 4-sided demo." / >}}

## The Challenge of Noisy Gestures

Pointer events are notoriously noisy. To interpret a single meaningful gesture
like a "swipe," you typically need to keep track of a sequence of events:
`pointerdown` (start), followed by multiple `pointermove` events (tracking), and
finally a `pointerup` (end).

Instead of managing complex state machines or arrays of event coordinates
manually, I turned to **RxJS**. By treating pointer events as streams, I could
express the entire gesture lifecycle as a single observable pipeline.

### The Reactive Gesture Pipeline

The core of this logic lives in the `GestureController`. Using RxJS, I was able
to build a pipeline that handles:

1. **Filtering**: Ignoring `pointermove` events until the user has moved a
   minimum `movementThreshold` to prevent accidental micro-drags.
2. **Velocity Calculation**: Computing the instantaneous velocity during the
   `pointerup` event to distinguish between a simple "drag and release" and a
   high-velocity "flick."
3. **State Management**: Using `exhaustMap` to ensure that once a gesture
   starts, subsequent `pointerdown` events are ignored until the current gesture
   completes.

This approach turns a mess of event listeners into a clean, predictable stream
of `GestureEvent` objects: `start`, `move`, `end`, or `flick`.

## The Performance Wall: Width vs. Translation

As I moved from concept to implementation, I hit a major performance hurdle.

### The First Attempt: Animating Width

In my first prototype, I implemented the cover by modifying its `width` property
in real-time as the user dragged. On my desktop, it felt fine. But on mobile, it
was a disaster: choppy, janky, and unresponsive.

The culprit was **Layout Thrashing**. Modifying properties like `width` or
`height` triggers a browser "reflow." This means the browser has to recalculate
the geometry and position of every element on the page. Because layout
calculation is a CPU-intensive task that runs on the main thread, it blocks the
very thread responsible for handling the user's touch input. On a mobile device,
where CPU power is limited, this 10ms-20ms block is the difference between a
smooth interaction and a broken one.

Even using `will-change: width` didn't help, because the browser still has to
perform the layout calculation before it can even think about offloading the
result to the GPU.

### The Second Attempt: The Translation Approach

I realized I needed to stop fighting the layout engine and start working with
the **Compositor**.

Instead of changing the dimensions of the cover, I made the cover element always
full-sized and used `transform: translate(...)` to move it. Unlike `width`,
`transform` and `opacity` are "compositor-only" properties. When you animate
them, the browser can offload the work to the GPU, keeping the main thread free
to handle input.

### The Slotted Content Problem

However, there was a catch. The component uses a `<slot>` to allow users to put
their own content inside the cover. In the Shadow DOM, slotted elements are
technically "light DOM" elements that are projected into the shadow tree.

If I used a standard CSS transition on the `.cover` element to animate the
opening, I discovered a strange behavior: the slotted content would often appear
to "jump" or stay fixed in the viewport while the cover's container moved. This
is because slotted elements resolve their containing block up the _light DOM_
ancestor chain, often bypassing the shadow root's transform during a CSS
transition.

To solve this and ensure the slotted content moves perfectly in sync with the
cover, I moved away from CSS transitions for the primary "snap" and "flick"
animations. Instead, I implemented a custom animation loop using
`requestAnimationFrame` (rAF) that manually updates the `translate` value. This
keeps the animation logic tightly coupled with the gesture stream and ensures
the main thread provides the high-frequency updates needed to keep the slotted
content anchored to the moving cover.

## Comparative Analysis

To validate this approach, I profiled both implementations. Even on a
high-performance desktop, the difference was measurable.

### Reflows

| Metric       | Animating Width | Animating Translation |
| ------------ | --------------- | --------------------- |
| Count        | 14              | 6                     |
| Total time   | 3.03ms          | 1.52ms                |
| Avg / reflow | 0.22ms          | 0.25ms                |
| Max reflow   | 0.84ms          | 0.28ms                |

While these numbers seem small, they tell a clear story: animating width
triggers over twice as many reflows and requires extra `requestAnimationFrame`
callbacks just to keep up. On a mobile chip, that 0.84ms reflow can easily
balloon to 10ms or more, creating the "jank" that ruins a premium user
experience.

## Theming and Customization

A key design principle for `@iboutsikas/coverpage` was to ensure it's highly
customizable without requiring complex JavaScript configuration for every visual
tweak. I achieved this by exposing several CSS custom properties directly on the
`:host` element.

This allows consumers to control the component's behavior and appearance using
standard stylesheets. For example, you can easily change the "peek" amount or
the animation speed:

```css
ib-coverpage {
  --cover-peek-size: 40px;
  --cover-anim-duration: 500ms;
  --cover-size: 80%;
}
```

The available properties include:

- `--cover-peek-size`: Defines how many pixels of the cover remain visible when
  it is in its "closed" state.
- `--cover-size`: Controls the dimensions of the cover (width for horizontal,
  height for vertical).
- `--cover-anim-duration`: Sets the duration for the snap and flick animations.
- `--cover-base-z-index`: Allows adjusting the stacking order of the component.

By leveraging CSS variables, the component remains lightweight and integrates
seamlessly into any existing design system.

## Technical Nuances

Beyond the core animation and gesture logic, several subtle engineering choices
help make the component feel truly "native."

### Synchronized Progress with `ResizeObserver`

One of the most useful features for consumers is the `Progress` event. Rather
than just a boolean `open` state, the component emits a normalized value from
`0` to `1`. By combining the translation stream with a `ResizeObserver` (via
`observeSize`), the component ensures this progress value remains accurate even
if the viewport or the component's dimensions change mid-interaction. This
allows consumers to perfectly sync other UI elements, like background image
parallax or opacity fades, to the user's movement.

### The "Tiny Scrim" Optimization

To handle the darkened overlay (the scrim) efficiently, I used a small
optimization: instead of rendering a full-screen overlay, the component renders
a tiny `10vw` by `10vh` element and scales it up using `transform: scale(10,
10)`. This ensures the overlay is performant and avoids the overhead of managing
a large, complex element during the initial render.

### Intelligent `touch-action` Management

A common pitfall in mobile web development is the conflict between custom
gestures and native scrolling. I addressed this by carefully managing the
`touch-action` CSS property. For a horizontal cover, the component uses
`touch-action: pan-y`, which tells the browser that the component "owns" the
horizontal axis for gestures but should allow native vertical scrolling. This
prevents the "stuck" feeling users often experience when a component intercepts
all touch input.
