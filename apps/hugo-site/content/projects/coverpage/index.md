---
title: "Covering Fluidity: Creating a coverpage web component for my blog"
date: 2026-04-16
description: >
    "A technical journal on building a high-performance, reactive cover component using Web Components, 
    RxJS, and the Web Animations API."
links:
    - title: Repository
      url: https://github.com/iboutsikas
---

# Covering Fluidity: Creating a coverpage web component for my blog

I recently decided to transition my personal website from Jekyll to hugo. While
there is nothing wrong with Jekyll, I often find myself having to dig through
incerdibly old posts, plugins, etc to fix something that should _just work_. The
Jekyll theme I was using, made use of
[hy-drawer](https://github.com/hydecorp/drawer), which unfortunately hasn't been
updated in years. Since I was re-writing everything from scratch and under my
control, I decided to create my own implementation of a slidable coverpage.

As this is a greenfield project, I decided to prioritize modern features instead
of backwards compatibility. Perhaps an unwise decision, but I get to learn and
it is fun! To that end, the library will be a web component using
[Lit](https://lit.dev/), and
[WAAPI](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API) for
the animations.

They say a picture is worth a thousand words, so here is a video of the library
in action. Yes, it works from all 4 sides of the viewport.

{{< video src="coverpage-preview.webm" caption="Demo of coverpage in action"  />}}

## The Architecture of a Gesture

Handling input was the biggest challenge with hybrid modern devices having
touchscreens, keyboards, pens or all of the above, touch and mouse events often
get intermingled or even triggered multiple times for one use action. To address
this issue, browsers have introduced `pointerdown`, `pointermove`, and
`pointerup` events in addition to the touch/mouse dedicated ones. So I will be
using those.

In addition to that, input events are noisy, unpredictable, and difficult to
reason about in isolation. To solve this, I decided to treat interaction as a
stream. 


Enter the `GestureController`.

Instead of managing a messy web of `pointerdown`, `pointermove`, and `pointerup`
listeners inside the component, I built a dedicated controller powered by
**RxJS**. This allows us to transform a chaotic stream of coordinates into a
clean, predictable stream of semantic gestures: `start`, `move`, `end`, and --
the pièce de résistance -- `flick`.

I further distill the noise by only handling move events on the
[animationFrameScheduler](https://rxjs.dev/api/index/const/animationFrameScheduler)
which allows me to sync my movement events to the browser's refresh rate for
smoother animations, and avoid needlesly burning CPU cycles! Finally, I am also
discarding move events that are under a configurable threshold.

## Animating with Precision

When it came to the actual movement, I wanted more than just a simple CSS
`transition`. While CSS transitions are great for "fire and forget" animations,
they are a black box. If I want to know exactly how far the cover has moved
during an automated animation (for example, to fade content in and out), a CSS
transition leaves me in the dark.

I chose the **Web Animations API** as the engine for `@iboutsikas/coverpage`. 

An unfortunate trap I fell for early on with WAAPI was tracking the animation by
querying the DOM for the current width/height and calculating progress based off
of that. Turns out, that causes the browser to immediately recompute layout in
order to be able to answer my question, instead of doing it at the end of the
frame. This is known as [layout
thrashing](https://www.greatfrontend.com/questions/quiz/how-can-you-optimize-dom-manipulation-for-better-performance).

Rather than constantly polling the DOM for the element's position (and killing
performance along the way due to layout thrashing) I implemented a mathematical
interpolation strategy. By leveraging `requestAnimationFrame`, I can track the
`currentTime` of the active animation and mathematically calculate the current
offset. This allows the component to emit a precise `cover-progress` event,
providing a high-fidelity stream of data that remains perfectly synchronized
with the visual state.

## A Component Designed for the Web

At its core, `@iboutsikas/coverpage` is a **Web Component** built with **Lit**.
This choice ensures that the library is lightweight, standards-compliant, and
framework-agnostic. It can live inside a React app, a Vue app, or even a plain
HTML page without any friction.

I also wanted to ensure that while the internals are complex, the developer
experience (DX) remains dead simple. This is why I leaned heavily into **CSS
Custom Properties**. 

Dimensions like `--cover-size` and animation speeds like `--cover-anim-duration`
aren't locked behind JavaScript properties. They are part of the CSS cascade.
This means a designer can completely reshape the component's behavior and
appearance using nothing but a stylesheet, maintaining a clean separation of
concerns between logic and presentation.

## Closing Thoughts

Overall I am pretty satisfied by `@iboutsikas/coverpage`, but to be fair it was
designed for my specific use case. I will be curious to see if anyone else
decides to use it, and what feedback they have for me. There is some more polish
to be made for sure; for example I will attempt to make the coverpage feel like
it has weight while moving. But that is a feature for another time!
