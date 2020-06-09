---
layout: page
title: Upgrade
description: >
  This chapter shows how to upgrade Hydejack to a newer version. The method depends on how you've installed Hydejack.
hide_description: true
---

This chapter shows how to upgrade Hydejack to a newer version. The method depends on how you've installed Hydejack.

0. this unordered seed list will be replaced by toc as unordered list
{:toc}

Before upgrading to v7+, make sure you've read the [CHANGELOG](../CHANGELOG.md){:.heading.flip-title},
especially the part about the [license change](../CHANGELOG.md#license-change)!
{:.note}

## Via Starter Kit
When using the Starter Kit, upgrading Hydejack is as simple as setting the `remote_theme` key in `config.yml` to the desired version.

```yml
remote_theme: hydecorp/hydejack@v9.0.0-alpha.13
```

To use the latest version on the `v8` branch on each build, you can use  `hydecorp/hydejack@v8`.


## Via gem
Upgrading the gem-based theme is as easy as running

```bash
bundle update jekyll-theme-hydejack
```

## Via zip
Upgrading via zip is a bit of a dark art, specially if you've made changes to any source files,
and the prime reason why I suggest using the gem-based version of the theme.

Generally, you'll want to copy these files and folders:

* `_includes/`
* `_layouts/`
* `_sass/`
* `assets/`
* `Gemfile`
* `Gemfile.lock`

and merge them with your existing folder. However, you'll also want to check out `_data` and `_config.yml` for any changes
and read latest entries to the [CHANGELOG](../CHANGELOG.md){:.heading.flip-title}.

If you've modified any of Hydejack's internal files, your changes will most likely be overwritten
and you have to apply them again.
Make sure you've made a backup before overwriting any files.
{:.note}


## Via git
The latest version sits on the `master` branch of [hydecorp/hydejack](https://github.com/hydecorp/hydejack).
To apply them to your repository run

~~~bash
$ git remote add hydejack git@github.com:hydecorp/hydejack.git
$ git pull hydejack master
~~~


## PRO Version
Buyers of the PRO version will find the files necessary for an upgrade in the `upgrade` folder of the downloaded zip archive.

If you've modified any of Hydejack's internal files, your changes will most likely be overwritten
and you have to apply them again.
Make sure you've made a backup before overwriting any files.
{:.note}



Continue with [Config](config.md){:.heading.flip-title}
{:.read-more}
