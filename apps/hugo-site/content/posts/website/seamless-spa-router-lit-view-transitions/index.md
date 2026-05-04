---
title: 'Building a Seamless SPA Router with Lit and View Transitions'
date: 2026-04-30
categories: [webdev, lit, webcomponents, spa]
description: 'A technical deep dive into implementing a lightweight SPA router using Lit, leveraging the View Transitions API for seamless page swaps and fallback mechanisms for older browsers.'
---

When building a personal website, there is a constant tension between the
simplicity of a static site generator and the seamless, app-like feel of a
Single Page Application (SPA). I wanted a way to navigate between pages without
a full browser reload, but I didn't want to pull in a heavy routing library or a
massive framework. This led me to build `@iboutsikas/router`; a lightweight,
standalone web component that turns a static site into a seamless SPA.

## The Core Mechanism: Intercepting Navigation

The foundation of the router is a simple but effective interception strategy.
Instead of relying on a complex routing table, the `<ib-router>` component
listens for `click` events on the `document`.

When a user clicks a link, the router evaluates it:

- Is it an internal link?
- Does it have `target="_blank"` or a `download` attribute?
- Is it an external origin?
- Was a modifier key (like `Ctrl` or `Cmd`) pressed?

If the link is a standard internal navigation, the router prevents the default
browser behavior and initiates a programmatic navigation. It also listens for
the `popstate` event to handle browser back/forward buttons, ensuring the SPA
experience remains consistent with standard browser behavior.

## Leveraging the View Transitions API

The real magic happens during the page swap. Modern browsers now support the
**View Transitions API**, which allows for incredibly smooth, high-performance
transitions between different states of a page.

When a navigation is triggered and the browser supports View Transitions, the
router wraps the content swap in `document.startViewTransition()`. This tells
the browser to take a snapshot of the current state, perform the DOM update
(fetching the new content and swapping the innerHTML), and then animate between
the two states.

This makes the transition feel incredibly "native," as the browser handles the
heavy lifting of cross-fading or other custom animations at the compositor
level.

## The Fallback: Managing Transitions Without VT

Not all users have access to the latest View Transitions API. To ensure a
premium experience for everyone, I had to implement a robust fallback mechanism.

In browsers where `document.startViewTransition` is unavailable, the router uses
a lifecycle approach:

1. **The Leaving Phase**: The router adds a `leavingClass` (default:
   `router-leaving`) to the content element. This allows developers to define
   CSS transitions for the outgoing content.
2. **The Swap**: Once the leaving transition completes (or a timeout is
   reached), the router fetches the new HTML, parses it, and swaps the content.
3. **The Entering Phase**: The router then adds an `enteringClass` (default:
   `router-entering`) to the new content, allowing for entry animations.

This two-stage process ensures that even without the native API, the transition
doesn't feel like a jarring "jump."

## Handling Concurrency with AbortController

One edge case in SPA navigation is "rapid-fire" clicking. What happens if a user
clicks a link, then immediately clicks another before the first one has finished
fetching?

To prevent race conditions and wasted network requests, I integrated an
`AbortController` into the navigation lifecycle. Every time a new navigation
begins, the router checks if there is an ongoing navigation. If so, it calls
`abort()` on the previous `AbortController`, immediately cancelling the
in-flight `fetch` request. This ensures that only the most recent navigation
request is processed, keeping the UI in sync with the user's intent.

## Extensibility through Events

A good library shouldn't just do one thing; it should be a platform for other
logic. The `@iboutsikas/router` exposes a suite of custom events that allow
consumers to hook into the navigation lifecycle:

- `router-before-navigate`: Allows developers to intercept a navigation. By
  calling `event.preventDefault()`, you can abort the SPA transition and fall
  back to a traditional full-page reload (useful for external links or sensitive
  transitions).
- `router-navigated`: Fired as soon as the URL and title have been updated.
- `router-navigation-complete`: Fired after all transitions (including View
  Transitions or CSS fallbacks) have finished.
- `router-navigation-error`: Fired if the fetch fails, allowing for graceful
  error handling (like showing a 404 page).

By providing these hooks, the router becomes a highly flexible tool that can be
integrated into any Lit-based architecture.

## Real-world Application: My Hugo Site

I use `@iboutsikas/router` to power the navigation on my personal website. By combining the router with custom CSS transitions in my Hugo theme, I've achieved a highly polished feel:

- **Main Content Transitions**: By assigning `view-transition-name: main-content-transition` to the `#_content` element, I can use a custom `router-enter-heavy` animation (a smooth slide-and-fade) whenever new content is loaded.
- **Hero Animations**: I leverage the View Transitions API to create "hero" animations for post titles. By ensuring the title carries the same `view-transition-name` (e.g., `.flip-title`) on both the list and detail pages, the browser seamlessly interpolates its position and size during navigation.

This demonstrates how a simple router can be extended with CSS to create sophisticated, app-like motion.

## Conclusion

`@iboutsikas/router` demonstrates that you don't need a massive framework to
achieve a high-quality SPA experience. By leveraging modern web APIs like View
Transitions and standard patterns like `AbortController` and `CustomEvents`, we
can build lightweight, performant, and highly extensible tools that respect the
core principles of the web.
