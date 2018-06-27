---
layout: welcome
cover: true
title: Hydejack
image: /assets/img/projects/default.jpg
description: >
  **Hydejack** is a Jekyll theme with JavaScript powers, combining the best of static sites and modern web apps.
  It features a suite of JavaScript that makes the page feel like an app, without sacrificing backwards-compatibility,
  page-load speed or SEO.
hide_description: true
selected_projects:
  - _projects/default.md
  - _projects/pretentious.md
  - _projects/hyde.md
  - _projects/oldschool.md
  - _projects/solid-cyan.md
  - _projects/solid-blue.md
more_projects: projects.md
selected_posts:
  - hydejack/_posts/2017-11-23-example-content.md
  - hydejack/_posts/2017-11-17-hydejacks-new-design.md
  - hydejack/_posts/2017-07-27-better-gem-support.md
  - hydejack/_posts/2017-06-21-related-projects-and-data-tables.md
  - hydejack/_posts/2017-06-06-third-party-scripts.md
more_posts: posts.md
---

**Hydejack** is the complete package for professionals on the web.
It features a blog suitable for both prose and technical documentation,
a showcase for your projects, and a resume that is well-integrated with the design.

> Your presence on the web --- A [blog], a [portfolio] and a [resume].
{:.lead}

The base version is free, features that are specific to *professionals* (portfolio, resume) are a payed upgrade. You know the drill.

[**Download Free**][kit] -- or -- [**Buy PRO**][buy]{:.gumroad-button}

## Variations
**Hydejack** is highly customizable and let's you achieve a variety of styles, with just a few simple tweaks.

<!--projects-->

## Download
There are two versions of **Hydejack**: The *free version* includes basic blogging functionality,
as did previous versions of the theme.
The *PRO version* includes additional features for professionals:
A [portfolio], a [resume] layout and a [welcome] page to feature your favorite projects and posts.

This table details what is and isn't included in each respective version.

|| Free | PRO |
|:-|:-:|:-:|
| Blog | &#x2714; | &#x2714; |
| [Features][feat] | &#x2714; | &#x2714; |
| [Portfolio] || &#x2714; |
| [Resume] || &#x2714; |
| [Welcome] || &#x2714; |
| [Newsletter Box][news] ||  &#x2714; |
| [Custom Forms][forms] || &#x2714; |
| No Hydejack Branding || &#x2714; |
| License | [GPL-3.0][license] | [PRO] |
| Source | [GitHub][src] | Included |
| Support[^1] | No | No |
| Price | Free | $59 |
|| [**Download**][kit] | [**Buy PRO**][buy]{:.gumroad-button} |
{:.stretch-table}

[^1]: You MAY open an issue on GitHub, but no response and/or fix is guaranteed.
      You understand that using Jekyll requires technical know-how, and is NOT comparable to Wordpress in terms of usability.
      Please use the free version to confirm that Hydejack works for you.
      For more, see the [PRO] license.

## Features
Both versions include these features:

* Full in-app page loading, powered by [hy-push-state]{:.external}
* A customizable sidebar that turns into a drawer menu on mobile, powered by [hy-drawer]{:.external}
* Advanced FLIP animations, inspired by Material Design
* Good [Google PageSpeed Score][gpss][^4]
* Higher *perceived speed* thanks to content pre-fetching
* [Syntax highlighting](#syntax-highlighting), powered by [Rouge]
* [LaTeX math blocks](#latex-math-blocks), powered by [KaTeX]
* Change the wording of built-in strings and possibly translate in other languages
* Support for categories and tags
* Built-in icons for many social networks
* Simple and semantic HTML — can be viewed even with text-based browsers
* Author section below each article and support for multiple authors
* Progressive enhancement — sacrifice features, not content
* Google Analytics and Google Fonts support
* Disqus comments
* Print layout — Used to render Hydejack's [PDF documentation][pdf]
* Blog layout via `jekyll-paginate` (optional)
* SEO meta tags via `jekyll-seo-tag` (optional)
* Github avatars via `jekyll-avatar` (optional)
* Gist support via `jekyll-gist` (optional)

[^4]: Actual page load speed depends on your hosting provider, resolution of embedded images and usage of 3rd party plugins.  

### Syntax Highlighting
Syntax highlighting powered by [Rouge].

~~~ruby
# Ruby code with syntax highlighting
GitHubPages::Dependencies.gems.each do |gem, version|
  s.add_dependency(gem, "= #{version}")
end
~~~

### Newsletter Subscription Box*
The *PRO version* has built-in support for [Tinyletter] subscription boxes.

If you are using a different newsletter service, like MailChimp,
you can build a custom newsletter subscription box using [custom forms][forms].

{% include pro/newsletter.html %}

## Versions
### Free Version
The *free version* features the design and tech of **Hydejack**, but only supports basic blogging.

[**Download Free**][kit]

### PRO Version
The *PRO version* aims to be the complete package for professionals on the web.
It includes layouts for your [portfolio],
your [resume] (with support for [JSON Resume](https://jsonresume.org/)),
a [welcome] page to introduce yourself to visitors,
built-in support for [Tinyletter], and from element styles so you can build arbitrary contact forms.

[**Buy PRO - $59**][buy]{:.gumroad-button}

[blog]: !blog.md
[portfolio]: projects.md
[resume]: resume.md
[download]: download.md
[welcome]: index.md
[forms]: forms-by-example.md

[feat]: #features
[news]: #newsletter-subscription-box
[syntax]: #syntax-highlighting
[latex]: hydejack/_posts/2017-11-23-example-content.md#math

[license]: LICENSE.md
[pro]: licenses/PRO.md
[docs]: docs/8.0.0-alpha.27/index.md

[kit]: https://github.com/qwtel/hydejack-starter-kit/archive/v7.5.0.zip
[src]: https://github.com/qwtel/hydejack
[gem]: https://rubygems.org/gems/jekyll-theme-hydejack
[buy]: https://gum.co/ZCAsn

[gpss]: https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Fqwtel.com%2Fhydejack%2F
[wiki]: https://github.com/qwtel/hydejack/blob/master/docs/8.0.0-alpha.27/index.md
[pdf]: https://github.com/qwtel/hydejack/releases/download/v8.0.0-alpha.27/Documentation._.Hydejack.pdf
[hy-push-state]: https://qwtel.com/hy-push-state/
[hy-drawer]: https://qwtel.com/hy-drawer/
[rouge]: http://rouge.jneen.net
[katex]: https://khan.github.io/KaTeX/
[tinyletter]: https://tinyletter.com/

*[FLIP]: First-Last-Invert-Play. A coding technique to achieve performant page transition animations.
