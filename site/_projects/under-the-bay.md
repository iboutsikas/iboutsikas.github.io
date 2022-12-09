---
layout: project
title: Under the Bay
caption: An interactive, AR experience telling a story about the Chesapeake Bay.
description: >
    “Under the Bay” tells the story of a world beneath the surface of the Chesapeake Bay.
date: 1 Aug 2022
image: 
  path: /assets/img/projects/titanium-rose.png
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


Talk about the scene transitions. Maybe put a webm of the effect.

