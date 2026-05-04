---
title: 'Quickdraw'
description: "A mini-game experiment using Unreal Engine's CommonUI and Enhanced Input systems."
lead: "Quickdraw is a personal project designed to explore the depths of Unreal Engine 5's CommonUI and Enhanced Input, inspired by the classic Quick Draw mechanic from Kirby's Adventure."
date: 2025-12-07
links:
  - title: Repository
    url: https://github.com/iboutsikas/quickdraw
categories: [quickdraw]
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

{{< video src="preview.webm" / >}}

The game itself is really simple. You face off against the NPC, and your goal is
to be the first to strike after the big exclamation mark appears. If you attack
before the mark appears you are blocked from attacking again for that round. The
NPC will select a random way to attack at the beginning of the round. Its
attacks can vary from frame-perfect, to way to early or way too late.
