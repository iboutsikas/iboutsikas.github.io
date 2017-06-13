---
layout: page
title: Installation
redirect_from:
  - /docs/latest/installation/
  - /docs/installation/
---

There are multiple ways of installing Hydejack.
The easiest is [via the Ruby gem](#via-gem).
If you bought the PRO version of Hydejack or downloaded the zip, you'll want to install [via the zip file](#via-zip).
If you know what you are doing, you can [fork or clone the git repository](#via-git).

## Table of Contents
* this unordered seed list will be replaced by toc as unordered list
{:toc}

## Via gem
Installation via the gem-based theme has the advantage of not cluttering your blog repository, so it is especially recommended for beginners.

If you haven't already, create a new Jekyll site first:

    $ jekyll new <PATH>

Your blog directory should look something like this

~~~
├── _posts
│   └── 2017-04-07-welcome-to-jekyll.markdown
├── _config.yml
├── about.md
├── Gemfile
├── Gemfile.lock
└── index.md
~~~

Next, you'll want to add `jekyll-theme-hydejack` as a dependency by adding the following line to the `Gemfile`.

~~~ruby
gem "jekyll-theme-hydejack"
~~~

Now you want to edit the `_config.yml` of your Jekyll site and set Hydejack as the theme.
Look for the `theme` key (or add it when missing) and set its value to `jekyll-theme-hydejack`.

~~~
theme: jekyll-theme-hydejack
~~~

All dependencies will be fetched from [RubyGems](https://rubygems.org/) when running Jekyll via [Bundler](http://bundler.io/).

    $ bundle exec jekyll serve

You can now point your browser to [http://localhost:4000](http://localhost:4000) and see Hydejack in action.

**NOTE**: If you are missing the `bundle` command, you can install Bundler by running `gem install bundler`.
{:.message}

For more information on gem-based themes, see the [Jekyll Documentation](http://jekyllrb.com/docs/themes/).

## Via zip
If you downloaded the zip, the folder structure will look something like:

~~~
├── _data
├── _featured_categories
├── _featured_tags
├── _includes
│   ├── scripts
│   └── styles
├── _js
│   ├── lib
│   └── src
├── _layouts
├── _posts
├── _sass
│   ├── hydejack
│   └── pooleparty
├── assets
│   ├── css
│   ├── icomoon
│   ├── img
│   └── js
├── _config.yml
├── 404.md
├── about.md
├── index.html
└── posts.md
~~~

All dependencies will be fetched from [RubyGems](https://rubygems.org/) when running Jekyll via [Bundler](http://bundler.io/).

    $ bundle exec jekyll serve

You can now point your browser to [http://localhost:4000](http://localhost:4000) and see Hydejack in action.

**NOTE**: If you are missing the `bundle` command, you can install Bundler by running `gem install bundler`.
{:.message}

### Without Bundler
If you do not want to use Bundler, you can install the dependencies yourself via `gem install <dep>`. They are

- `jekyll`
- `jekyll-paginate`
- `jekyll-feed`
- `jekyll-sitemap`

## Via git
If you are familiar with using git, you can add the [Hydejack repository](https://github.com/qwtel/hydejack) as a remote, and merge its master branch into your working branch.

    $ git remote add hydejack git@github.com:qwtel/hydejack.git
    $ git merge hydejack/master

You can also update Hydejack this way. The master branch will not contain work in progress, but will contain major (breaking) releases. This approach is recommended if you intend to heavily customize Hydejack.

Continue with [Configuration]({{ site.baseurl }}{% link docs/6.4.0/configuration.md %}){:.heading data-flip="title"}
{:.read-more}
