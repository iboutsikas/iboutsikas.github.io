---
layout: project
title: Under the Bay
caption: An interactive, AR experience telling a story about the Chesapeake Bay.
description: >
    “Under the Bay” tells the story of a world beneath the surface of the Chesapeake Bay
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
    <a href="https://play.google.com/store/apps/details?id=com.lisamoren.underthebay" target="_blank">Play Store</a>
</div>

Since I was the primary developer of this app, this post will discuss some of
the engineering and software aspects of "Under the Bay". For more information on
the story as well as the free podcast, please visit the [official
page](https://www.lisamoren.com/underthebay).

## Swipe for a new scene

One of the features we decided early on to add on the app was the ability for
the user to swipe across their screen to move on to the next/previous scene.
Similar to a like a digital flip book. This might not be a ground breaking
idea, but it gets complicated when the scene itself might also be interactive
and require swiping for other interactions.

One approach would be to have dedicated zones where the swipe could start.
Another approach would be to have buttons or other UI elements on the screen
that the user can interact with. Those approaches were explored but ultimately
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
video below showcases this interaction in Unity. I chose to record it in the
Editor so you can see the Scene view (left) in addition to the in-game view (right).

<video controls loop>
  <source src="/assets/img/projects/utb/swipe.webm" type="video/webm">
  Your browser does not support the video tag or webm video.
</video>

We also experimented with continuing to render the scene on one of the sliding
images. However, early user testing showed a lot of confusion about what was
happening and we abandoned the approach.

## Using the real-time data in the Editor

Another challenge we encountered was having our real-time data stream in both
during runtime and during design time, as it would be very useful to the artists
to be able to quickly preview how the data affects their designs. A number of
scripts will have to base their behavior based on this data, so the singleton
pattern would lend itself well to this use case. A common way of implementing
this pattern at runtime is having a "Persistent Scripts" GameObject that does
not get destroyed across level loads. However, this approach cannot work in the
editor while the game is not "playing". There are many other issues as explained
in [this wonderful post by Hextant
Studios](https://hextantstudios.com/unity-singletons/). We ended up with an
implementation that is based on ScriptableObjects, that works similar to what is
described by Hextant Studios when in the editor but is a simple, persistent
script at runtime. Since then, Unity has added a [similar
API](https://docs.unity3d.com/2020.1/Documentation/ScriptReference/ScriptableSingleton_1.html)
for ScriptableObjects. We would highly recommend future readers to investigate
that first before going with a hand-rolled approach.

Using the data to affect the scene depends on a collection of classes that
inherit from our "DataBasedModifier". These classes bind one data property to
one aspect of an object. An example can be seen  in the image below, where
Chlorophyll is bound to the GameObject's scale. Our setup allows almost any
property that can be modified by a C# script to be affected by the incoming
data.

![](/assets/img/projects/utb/databased-modifier.jpg)
{:.centered}

Scale modifier binding chlorophyll to scale.
{:.figcaption}

Once we had the stream of data working seamlessly in and out of game, we
realized we needed to control this stream further. At runtime the application
will use the latest data to shape the user's experience, however while designing
it was often desirable to set the data to specific timeframes (i.e. during a
known algal bloom). This is done through two main components. The first one can
be seen in the data-based modifier picture above. While in editor, artists can
enable debug mode and set the value of the property (chlorophyll in this case)
to whatever they want instead of what is coming in from the data script. This
utility is not present at all when compiling the final executable to avoid
having to disable debug mode before building.

The second part is our data stream window show below. It allows artists to set
the entire application to a given date, data station and data sample to see how
the application would look at that point in time for that station.

![](/assets/img/projects/utb/data-stream.jpg)
{:.centered}

Data stream window
{:.figcaption}