---
layout: page
title: Download
menu: true
order: 7
---

There are two versions of **Hydejack**: The *free version* includes basic blogging functionality,
as did previous versions of the theme, while the new *PRO version* includes additional features for professionals:
A [portfolio], a [resume] layout and a [welcome] page to feature your favorite projects and posts.

This table details what is and isn't included in each respective version.

|                                     | Free               | PRO                |
|:------------------------------------|:------------------:|:------------------:|
| Blog                                | &#x2714;           | &#x2714;           |
| Features (see below)                | &#x2714;           | &#x2714;           |
| [Portfolio] Layout                  |                    | &#x2714;           |
| [Resume] Layout                     |                    | &#x2714;           |
| [Welcome] Layout                    |                    | &#x2714;           |
| Newsletter Subscription Box         |                    | &#x2714;           |
| Form Element Styles                 |                    | &#x2714;           |
| License                             | [GPL-3.0][license] | [PRO]              |
| Price                               | Free               | $39                |
|| [Download on GitHub][github]<br/> – or – <br/>[Use the RubyGem][gem] | [Buy Now – $39][buy]{:.btn.btn-primary} [^3] |
{:.stretch-table}

## Features
Both versions include *all* of these features:

* Full in-app page loading, powered by [hy-push-state]{:.external}
* A customizable sidebar that turns into a drawer menu on mobile, powered by [hy-drawer]{:.external}
* Advanced FLIP animations, inspired by Material Design
* Good [Google PageSpeed Score][gpss][^2]
* High *perceived speed* thanks to pre-fetching
* Support for categories and tags
* Built-in icons for many social networks
* Simple and semantic HTML — can be viewed even with text-based browsers
* Author section below each article and multiple authors
* Progressive enhancement — sacrifice features, not content
* Google Analytics and Google Fonts support
* Syntax highlighting
* Math formulas via LaTeX
* Disqus comments
* Print layout. See the [PDF documentation][pdf] for an example.
* Github avatars via `jekyll-avatar` (optional).
* Gist support via `jekyll-gist` (optional).
* Blog layout with pagination via `jekyll-paginate` (optional)
* SEO meta tags via `jekyll-seo-tag` (optional)

## Free Version
The Free Version features the design and tech of Hydejack, but only supports basic blogging.

[Download on GitHub][github] – or – [Use the RubyGem][gem]

## PRO Version
The PRO Version aims to be the complete package for professionals on the web.
It includes layouts for your [portfolio], your [resume] (with support for [JSON Resume](https://jsonresume.org/)) and
a [welcome] page to introduce yourself to visitors.

[Buy Now - $39][buy]{:.btn.btn-primary} [^3]

{% include author.html author=site.data.authors.qwtel heading="Contact" heading_id="contact" %}


[^1]: Applies after the initial page load.  
[^2]: Actual page load speed depends on your hosting provider, resolution of embedded images and usage of 3rd party plugins.  
[^3]: Transactions secured by [Stripe](https://stripe.com). Downloads handled by [Simple Goods](https://simplegoods.co/).  

[blog]: blog.md
[portfolio]: projects.md
[resume]: resume.md
[download]: download.md
[welcome]: index.md

[license]: LICENSE.md
[pro]: licenses/PRO.md
[docs]: docs/7.0.1/index.md

[github]: https://github.com/qwtel/hydejack/releases
[gem]: https://rubygems.org/gems/jekyll-theme-hydejack
[buy]: https://app.simplegoods.co/i/AQTTVBOE

[gpss]: https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Fqwtel.com%2Fhydejack%2F
[wiki]: https://github.com/qwtel/hydejack/wiki
[pdf]: https://github.com/qwtel/hydejack/releases/download/v7.0.1/Documentation._.Hydejack.pdf

[hy-push-state]: https://qwtel.com/hy-push-state/
[hy-drawer]: https://qwtel.com/hy-drawer/
