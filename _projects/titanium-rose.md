---
layout: project
title: Titanium Rose
caption: A decoupled rendering engine written in C++ and using DirectX 12.
description: >
    Titanium Rose is a rendering engine that I have been developing
    in the scope of my research endeavors
date: 1 Dec 2022
image: 
  path: /assets/img/projects/titanium-rose/preview.png
  srcset:
    1920w: /assets/img/projects/titanium-rose/preview.png
    960w:  /assets/img/projects/titanium-rose/preview@0,5x.png
    480w:  /assets/img/projects/titanium-rose/preview@0,25x.png
links:
    - title: Repository
      url: https://github.com/iboutsikas/titanium-rose
tags: ['frontpage']
---

Titanium Rose is a rendering engine that I started developing for my graduate
research project. It is written in C++ and using the DirectX 12 API, and I am
planning to support DirectX 12 Ultimate soon. It also includes as very
primitive, hand rolled, implementation of [Sampler
Feedback](https://devblogs.microsoft.com/directx/coming-to-directx-12-sampler-feedback-some-useful-once-hidden-data-unlocked/),
as I needed similar data and that feature was not out yet at that point!

The purpose of the engine is to explore decoupled and asynchronous shading. In
traditional rendering techniques like forward rendering and deferred rendering,
surfaces will be shaded each frame. A decoupled renderer on the other hand
breaks this dependency, allowing the engine to shade and render at different
frame rates. Think of it as coloring the image at 30 FPS while displaying the
image (which includes simulating your world) at 90 FPS. Alternatively, the
engine can shade a portion of your meshes per frame, therefore achieving lower
frame times. As an example, the banner image contains ~2000 real-time point
lights, 4+ million polygons, and with a very basic spacial partitioning scheme
the engine can maintain close to 60 FPS average, while a forward renderer could
do 40 FPS at most on the same hardware. You can see a visualization of all the
point lights below:

![](/assets/img/projects/titanium-rose/lights_galore.png)
All the 2000 real-time point lights visualized.
{:.figcaption}

Beyond just raw frame time gains, decoupled rendering can offer better shader
aliasing. Since the objects are shaded in object space (i.e. with a constant
size) the shader inputs as well as outputs will be more stable. In a similar
vein, when decoupled shading is wrong it is wrong in the exact same way every
time. Making artifacts less noticeable by humans. This technique however does
not "just work" with everything, so what I am investigating now is how various
materials and surface types behave in a decoupled, asynchronous environments.
Some of them are really resilient to decoupled artifacts so they can be updated
once every half a second, while others can skip a couple of frames at most
before becoming noticeable.
