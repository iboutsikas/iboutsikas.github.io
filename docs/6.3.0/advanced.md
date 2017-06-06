---
layout: page
title: Advanced
redirect_from: /docs/latest/advanced/
---

## Table of Contents
* this unordered seed list will be replaced by toc as unordered list
{:toc}

## Adding 3rd party scripts
There are two ways of adding 3rd party scripts.
[Embedding](#embedding) is ideal for one-off scripts, e.g. `widgets.js` that is part of embedded tweets (see below).
Adding [global scripts](#global-scripts) is for scripts that should be loaded on every page.

```html
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">The next version of Hydejack (v6.3.0) will allow embedding 3rd party scripts, like the one that comes with this tweet for example.</p>&mdash; Florian Klampfer (@qwtel) <a href="https://twitter.com/qwtel/status/871098943505039362">June 3, 2017</a></blockquote>
```

<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">The next version of Hydejack (v6.3.0) will allow embedding 3rd party scripts, like the one that comes with this tweet for example.</p>&mdash; Florian Klampfer (@qwtel) <a href="https://twitter.com/qwtel/status/871098943505039362">June 3, 2017</a></blockquote>

### Embedding
Hydejack supports embedding 3rd party scripts directly inside markdown content. This will work in most cases, except when a script can not be loaded on a page more than once (this will occur when a user navigates to the same page twice).

**Note**: Adding "raw" script tags will make the page slooooow, unless they have the `async` or `defer` attribute set. For more see [below](#async-vs-defer-vs-loadjsdeferred).
{:.message}

### Global scripts
If you have scripts that should be loaded on every page you can add them globally.
Hydejack's global script is loaded from `_includes/scripts.html`, but I'd recommend creating your own file called `my-scripts.html` (inside `_includes`), as it will not be overwritten when you upgrade Hydejack to a newer version.

You can put arbitrary HTML into `my-scripts.html`, but generally you'd want to add script tags. The [same rules](#async-vs-defer-vs-loadjsdeferred) as with embedded scripts apply.

What you have to do (once after each upgrade of Hydejack!) is opening `_includes/scripts.html` and removing `{\% comment %\}` and `{\% endcomment %\}` around `{\% include my-scripts.html %\}`.

### `async` vs. `defer` vs. `loadJSDeferred`

I highly recommended setting the `async` or `defer` attribute on your external scripts (i.e. the ones that have a `src` attribute).
Otherwise the entire page can't finish loading until a separate HTTP request is completed, which can take a looooong time (this applies to the web in general, not just Hydejack).

Specific to Hydejack is the `loadJSDeferred` function, which is used to load Hydejack's own scripts. It has various advantages which are detailed in the table below.

|           | `async`     | `defer`                | `loadJSDeferred`      |
|:----------|:------------|:-----------------------|:----------------------|
| Download  | immediately | immediately            | after document `load` |
| Execution | asap        | before document `load` | after document `load` |
| Ordering  | none        | preserves order        | via callback nesting  |
| Support   | IE8+        | IE9+                   | IE5+ (Hydejack only)  |

### Using `loadJSDeferred` (Hydejack only)
Using `loadJSDeferred` is slightly more bothersome than just adding `defer` to a script tag.

```js
loadJSDeferred('<script-src>', function () {
  // <callback code>
});
```

If you have scripts that depend on other scripts, you can nest calls, e.g.

```js
loadJSDeferred('<script-src-1>', function () {
  // <callback script 1>
  loadJSDeferred('<script-src-2>', function () {
    // <callback script 1 + 2>
    loadJSDeferred('<script-src-3>', function () {
      // <callback script 1 + 2 + 3>
    });
  });
});
```

## Registering push state event listeners
When you embed scripts globally you might want to run some init code after each page initialization. The obvious problem with push state-based page loads is that the `load` event won't fire again. However, Hydejack's push state component exposes events that you can register to.

Obviously you'll want to add the code below as part of you'r `my-scripts.html`, otherwise

```js
function initCode() {
  // <your init code>
}

// Event for the initial page load, fired only once
// NOTE: scripts loaded via `loadJSDeferred` are not available yet, but `async` and `defer` are
window
  .addEventListener('load', initCode);

// Alternatively, when using `loadJSDeferred`:
// loadJSDeferred('<url>', initCode);

// Event for all subsequent dynamic page loads
document.getElementById('_yPushState')
  .addEventListener('y-push-state-load', initCode);
```

Other events you can register on `#_yPushState` include

`y-push-state-start`
: occurs when clicking a link

`y-push-state-ready`
: Animation fished and response is received and parsed, ready to swap out the content.

`y-push-state-after`
: The old content has been replaced with the new content.

`y-push-state-animationend`
: The animation has finished playing. Note: Currently this is duration-based, so there is no hard guarantee that the animation actually has finished. This will be fixed in a future version.

`y-push-state-load`
: All embedded script tags have been inserted into the document and have finished loading. Now is the time to run init code.

`y-push-state-progress`
: Special case when animation is finished, but no response from server has arrived yet. This is also when the spinner will appear.

## Adding a custom social media icon
Hydejack includes a number of social media icons by default (in fact, everything that is provided by [IcoMoon](https://icomoon.io/)), but since the landscape is always changing, it is likely that a platform that is important to you will be missing at some point.

**NOTE**: You can add any platform by simply providing a complete URL. However, a fallback icon <span class="icon-link"></span> will be used.
{:.message}

### Creating the icon font
In order to add a custom social media icon you have to use the [IcoMoon App](https://icomoon.io/app/) (free) to create a custom icon webfont. However, it is important that the generated font include all icons already in use by Hydejack. For this purpose, find the `selection.json` in [`assets/icomoon/selection.json`](https://github.com/qwtel/hydejack/blob/v6/assets/icomoon/selection.json) and upload it to the app via "Import Icons".
Then, use the app to add your icon(s).
Consult the [IcoMoon docs](https://icomoon.io/#docs) for additional help.

Once you've created and downloaded the icon font form IconMoon, replace the `icomoon` folder in `assets` in its entirety. Keep in mind that future updates of Hydejack will override this folder.

### Adding the platform's metadata
For the second step it is necessary to add the network's metadata to `_data/social.yml`.
An entry looks like:

    deviantart:
      name: DeviantArt
      icon: icon-deviantart
      prepend: "https://"
      append: ".deviantart.com"

`name`
: The name of the network. Used for for the title attribute and screen readers.

`icon`
: The icon CSS class. Can be chosen during the IcoMoon creation process.

`prepend`
: Optional. A string that is prepended to the username to form the link to the profile. If the final URL should be `https://<username>.deviantart.com`, this would be `https://`

`append`
: Optional. A string that is appended to the username to form the link to the profile. If the final URL should be `https://<username>.deviantart.com`, this would be `.deviantart.com`.

## Building the JavaScript
**NOTE**: In order to build the JavaScript you need to have [node.js](https://nodejs.org/en/) installed. Specifically, the `npm` command needs to be available, which is part of node.js.
{:.message}

Before you start, make sure you've copied the following files:
* `_js/`
* `package.json`
* `.babelrc`
* `.eslintignore`
* `.eslintrc`

When building for the first time (and after each update of Hydejack) you have to run

    $ npm install

This will fetch all dependencies (and put them in a local folder called `node_modules`), lint the code and write the bundled and minified script into `assets/js/hydejack.js`.

Subsequent builds are administered via

    $ npm run build

If you want to actively develop the scripts, it is better to run

    $ npm run dev

which will build a non-minified, non-transpiled (ES2016) version of `hydejack.js` after each filechange.

*[FLIP]: First Last Invert Play
