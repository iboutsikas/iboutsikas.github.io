---
layout: project
title: "CapstoneED v2"
caption: Rebuilding the original for fun and practice
description: >
    I am rebuilding the frontend for CapstoneED in Angular v21 following modern practices and patterns
date: 1 Dec 2025
image: 
  path: /assets/img/capstoneed/v2_logo.png
#   srcset:
#       1920w: /assets/img/projects/memefs/preview.jpg
#       960w: /assets/img/projects/memefs/preview@0,5x.jpg
#       480w: /assets/img/projects/memefs/preview@0,25x.jpg
---
* toc goes here
{:toc}

{% assign related_posts = site.categories.capstoneed %}
{% assign ordered_posts = related_posts | sort:"date" | reverse %}


## Recent Posts
{% if ordered_posts.size > 0 %}
<ul>
{% for post in ordered_posts %}
    <li><a href="{{ post.url | relative_url }}">{{ post.title }}</a> <small>{{ post.date | date: "%B %d, %Y" }}</small></li>
{% endfor %}
</ul>
{% endif %}
  

## Goals
Back in 2017 I was involved in the development of
[CapstoneED](/publications/capstoneed), as part of my undergrad dissertation.
Since it has been a while since I've done any web devlopment I decided to
re-write the front-end (at least for now) following modern practices and putting
the experience I have had since then to use.

My high level goals for the application are as follows:
* Use Angular: I like the framework and I do not want this side project to take
  forever.
* Keep the backend as is: I would like the old and new frontend to work on the
  exact same data while providing different experiences. _Some_ bug fixes will
  inadvertendly have to happen, but I am trying to keep them to a minimum.
* Simplify the application structure: The original project had to have 3
  different repositories; for the student, the lecturer and the shared. And even
  then the boundaries were less than clear, as changes would still have to be
  propagated between student and lecturer occasionally.
* Simplify deployment: I would like to be able to run a couple of commands at
  most and be able to demo the project at least.
* Reduce dependencies: In the javascript world it is very common to just `npm
  install` your problems away. My C++ background however has taught me the pain
  of external dependecies the hard way. To that end I will be trying to add as
  few dependencies as possible, even if that requires me writing a left-pad
  helper.

As far as the UI/UX is concerned I would like to:
* Make it mobile first instead of mobile friendly. At least for the student, as
  the lecturer view is more "Admin Dashboard" like.
* Add modern QoL that has become much more common (and expected) nowdays. For
  example, dark/light themes.

## Preview
I have been working on this for a while as time allows, here is a side-by-side
comparison of the two versions. New one is on the left, and the old one is on
the right.

<video controls>
  <source src="/assets/img/capstoneed/cap_v2_preview.webm" type="video/webm">
  Your browser does not support the video tag or webm video.
</video>
Left is the new version, right is the old one.
{:.figcaption}


