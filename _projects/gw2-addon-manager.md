---
layout: project
title: GW2 Addon Manager
caption: An addon manager for the popular MMO Guild Wars 2
description: >
    This is an addon manager for GW2, aiming to replace the currently abandoned manager
date: 6 Oct 2022
image: 
  path: /assets/img/projects/gw2am-preview.png
links:
    - title: Repository
      url: https://github.com/iboutsikas/GW2-Addon-Manager
---

My goal in remaking the addon manager was to convert it into a more widespread
stack so that it would hopefully gain more support by other developers. One of
the main thing that has been discussed in the GW2 development community is that
the existing WPF version is too foreign to maintain. As such I decided to go
with a web-based stack, namely Electron and Angular. I know a lot of people
might dislike that, and I don't fault them. Electron can often be too much. 

The application is using Angular material for the basic styling with a lot of
customizations to get it a bit GW2-like. It fixes some bugs that plagued the old
version (namely uninstalling addons and enabling/disabling them).

## Current features

* Installing/uninstalling addons
* Installing/uninstalling addon plugins
* Enabling/disabling installed addons

## Planned features

* Self-update
* Dependency resolution
* Poll the already installed addons to build our state (via native NodeJS
  addon). This might be Windows only.
* Back-up addon settings or alternatively use symlinks so they persist unless
  intentionally deleted

I am always looking for more help! Please head over to the
[repository](https://github.com/iboutsikas/GW2-Addon-Manager) if you want to
contribute!