---
description: >
  There are two versions of Hydejack: The free version includes basic blogging functionality,
  while the PRO version includes additional features for professionals.
hide_description: true
image: /assets/img/hydejack-8.png
last_modified_at: 2019-02-18
---

# Download

There are two versions of **Hydejack**: The *free version* includes basic blogging functionality, as did previous versions of the theme.
The *PRO version* includes additional features for professionals:
A [portfolio], a [resume] layout, and a [welcome] page to highlight your favorite projects and posts.

This table below shows what's included in each version:

|                        | Free           | PRO      |
|:-----------------------|:--------------:|:--------:|
| Blog                   | &#x2714;       | &#x2714; |
| [Features]             | &#x2714;       | &#x2714; |
| [Portfolio]            |                | &#x2714; |
| [Resume]               |                | &#x2714; |
| [Welcome]              |                | &#x2714; |
| [Newsletter Box][news] |                | &#x2714; |
| [Custom Forms][forms]  |                | &#x2714; |
| [Dark Mode][darkm]     |                | &#x2714; |
| [Offline Support][ofln]|                | &#x2714; |
| Cookie Banner          |                | &#x2714; |
| No Hydejack Branding   |                | &#x2714; |
| License                | [GPL-3.0][lic] | [PRO]    |
| Source                 | [GitHub][src]  | Included |
| Support[^1]            | No             | No       |
| Price                  | Free           | $59      |
| | [**Download**][kit] <br/>-- or --<br/> [![Deploy to Netlify][dtn]{:data-ignore=""}][nfy]{:.no-hover.no-mark} | [**Buy PRO** --- $59][buy]{:.btn.btn-primary.btn-lg.heading} |
{:.stretch-table.dl-table}

<script>
Array.from(document.querySelectorAll('a[href="/blog/hydejack/2018-09-01-introducing-dark-mode/"]'))
  .forEach(a => {
    a.addEventListener('click', (e) => { 
      if (!document.body.classList.contains("dark-mode")) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        document.body.classList.add("dark-mode");
      }
    });
  });
</script>

[^1]: You MAY open an issue on GitHub, but no response and/or fix is guaranteed.
      You understand that using Jekyll requires technical know-how, and is NOT comparable to Wordpress in terms of usability. Please use the free version to confirm that Hydejack works for you.
      For more, see the [PRO] license.

[blog]: !blog.md
[portfolio]: projects.md
[resume]: resume.md
[download]: download.md
[welcome]: README.md
[forms]: forms-by-example.md

[features]: README.md#features
[news]: README.md#build-an-audience
[syntax]: README.md#syntax-highlighting
[latex]: hydejack/_posts/2018-06-01-example-content-iii.md#math
[darkm]: hydejack/_posts/2018-09-01-introducing-dark-mode.md

[lic]: LICENSE.md
[pro]: licenses/PRO.md
[docs]: docs/README.md
[ofln]: docs/advanced.md#enabling-offline-support

[kit]: https://github.com/qwtel/hy-starter-kit/archive/v8.4.0.zip
[src]: https://github.com/qwtel/hydejack
[gem]: https://rubygems.org/gems/jekyll-theme-hydejack
[buy]: https://app.simplegoods.co/i/NATYVLYT
[nfy]: https://app.netlify.com/start/deploy?repository=https://github.com/qwtel/hydejack-starter-kit
[dtn]: https://www.netlify.com/img/deploy/button.svg
