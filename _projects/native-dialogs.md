---
layout: project
title: Native dialogs
caption: A Unity plugin for native widgets on mobile
description: >
    A Unity plugin for native widgets on mobile
date: 17 Feb 2022
image: 
  path: /assets/img/projects/native-dialogs/preview.jpg
links:
    - title: Repository
      url: https://github.com/iboutsikas/native-dialogs
---

native-dialogs is a plugin for Unity that allows the usage of native widgets
from a Unity application. While working on another project, I had the need for
users to be able to give dates to the application. There are some date picker
and calendar addons in the AssetStore, but they wouldn't match the style of our
UI and still potentially lack features. On the other hand, every mobile OS has a
native date picker widget that takes into account a plethora of user
preferences. For example, 12 vs 24 hour time, time zones, left-to-right or
right-to-left text, light vs dark theme, and many more. Plus, the user should
already be familiar with how the widget works from using their phone! Therefore
I decided that development efforts would be better put to use in this plugin
instead of getting an asset from the AssetStore working. 

Finding documentation on how to do the interop between Unity and native was a
bit hard, so I decided to open-source the plugin and hopefuly help others with
similar issues. The plugin currently supports date pickers on iOS and Android,
but I am planning to extend it soon.

## Installing
All you have to do is clone the repository in your project's `Plugins` folder
(i.e. `Assets/Plugins/native-dialogs`) and use the NativeDialogs namespace and API from
then on. I will be making more documentation soon.
