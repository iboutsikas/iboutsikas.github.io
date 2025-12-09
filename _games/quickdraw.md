---
layout: game
title: Quickdraw
caption: A simple mini-game based on Quick Draw from Kirby's adventure
description: >
    This mini-game was an excuse for me to experiment with and learn about Unreal Engine's CommonUI and Enhanced Input
date: 7 Dec 2025
links:
    - title: Repository
      url: https://github.com/iboutsikas/quickdraw
image:
   path: /assets/img/games/quickdraw/preview.png
   srcset:
      1920w: /assets/img/games/quickdraw/preview.png
      960w: /assets/img/games/quickdraw/preview@0,5x.png
      480w: /assets/img/games/quickdraw/preview@0,25x.png

tags: [quickdraw]
---

Quickdraw is a personal project/experiment that I used as an opportunity to
learn and use CommonUI along with Enhanced Input in Unreal Engine 5. In addition
to "getting started" with those systems, I also wanted to go through their
equivalent use in
[Lyra](https://dev.epicgames.com/documentation/en-us/unreal-engine/lyra-sample-game-in-unreal-engine).
Lyra is a sample game provided by Epic Games, but it is more like a framework
version of the technology used in Fortnite. Obviously, that is quite the
overkill for my use case so my goal is to distill the functionality that I need
down to _some_ minimum then use it for my mini-game. I will document what I
learn on this page.

## The game itself
<video controls >
  <source src="/assets/img/games/quickdraw/preview.webm" type="video/webm">
  Your browser does not support the video tag or webm video.
</video>

The game itself is really simple. You face off against the NPC, and your goal is
to be the first to strike after the big exclamation mark appears. If you attack
before the mark appears you are blocked from attacking again for that round. The
NPC will select a random way to attack at the beginning of the round. Its
attacks can vary from frame-perfect, to way to early or way too late.

{% assign quickdraw_posts = site.tags.quickdraw %}
{% if quickdraw_posts.size > 0 %}

<aside class="related mb4" role="complementary">
   <h2 class="hr-bottom">Posts about this game</h2>

   <ul class="related-posts">
      {% for gp in quickdraw_posts %}
         {% if gp %}
         <li><a href="{{gp.url}}">{{gp.title}}</a></li>
         {% endif %}
      {% endfor %}
   </ul>
</aside>
{% endif %}
