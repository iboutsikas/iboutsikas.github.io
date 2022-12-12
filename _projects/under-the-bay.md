---
layout: project
title: Under the Bay
caption: An interactive, AR experience telling a story about the Chesapeake Bay.
description: >
    “Under the Bay” tells the story of a world beneath the surface of the Chesapeake Bay.
date: 1 Aug 2022
image: 
  path: /assets/img/projects/utb/preview.png
links:
    - title: Project Page
      url: https://www.lisamoren.com/underthebay
---

"Under the Bay" is an interactive, AR experience, telling the story of a world
beneath the surface of the Chesapeake Bay. Users can interact with various
scenes while live data streaming in directly form the bay itself shapes the
experience.

<div style="text-align: center; font-size: 1.2em; margin-bottom: 0.75em ">
    <a href="https://www.lisamoren.com/underthebay" target="_blank">Official Page</a>
    &emsp;
    <a href="https://apps.apple.com/app/id1641553491" target="_blank">Apple Store</a>
    &emsp;
    <a href="https://arxiv.org/abs/2106.07860" target="_blank">Play Store</a>
</div>

Since I was the primary developer of this app, this post will discuss some of
the engineering and software aspects of "Under the Bay". For more information on
the story as well as the free podcast, please visit the [official
page](https://www.lisamoren.com/underthebay).

## Swipe for a new scene

One of the features we decided early on to add on the app was the ability for
the user to swipe across their screen to move on to the next/previous scene.
Kinda like a digital flip book. This might not be a ground breaking idea, but it
gets complicated when the scene itself might also be interactive and require
swiping for other interactions.

One approach would be to have dedicated zones where the swipe could start.
Another approach would be to have buttons or other UI elements on the screen
that the user can interact with. Those approaches were explored but ultimetely
rejected for various good reasons. What I ended up doing is create a system that
worked in tandem with Unity's ["new input
system"](https://docs.unity3d.com/Packages/com.unity.inputsystem@1.4/manual/QuickStartGuide.html)
(which was also having some teething issues at that time).

Our input system will intercept mouse and touch input and attempt to convert it
to a gesture (swipe in this example). If the conversion is successful it stops
propagation of the input and notifies the rest of the application about the
gesture progress. Otherwise the input is handled as normally by Unity's system.
Converting the input to a gesture also prevents gestures from starting on top of
other interactable elements, such as UI or draggable scene models.

Once a swipe has been detected, the application overlays two images
side-by-side. One image is the loading screen for the next scene, and the other
is a screenshot of the application at the point the swipe started. As the user
swipes left or right, those images are translated accordingly to communicate the
transition. The user can also undo the swipe to not trigger a transition. The
video below showcases this interaction in Unity. I chose to recod it in the
Editor so you can see the Scene view (left) in addition to the in-game view (right).

<video controls loop>
  <source src="/assets/img/projects/utb/swipe.webm" type="video/webm">
  Your browser does not support the video tag or webm video.
</video>

We also experimented with continuing to render the scene on one of the sliding
images. However, early user testing showed a lot of confusion about what was
happening and we abbandoned the approach.
