#!/usr/bin/env node

const { promisify } = require('util');
const { basename, resolve } = require('path');
const fs = require('fs');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const version = require('../package.json').version;

const ENC = 'utf-8';

const DOCS = [
  resolve(`./docs/${version}/index.md`),
  resolve(`./docs/${version}/installation.md`),
  resolve(`./docs/${version}/migration.md`),
  resolve(`./docs/${version}/configuration.md`),
  resolve(`./docs/${version}/basics.md`),
  resolve(`./docs/${version}/writing.md`),
  resolve(`./docs/${version}/scripts.md`),
  resolve(`./docs/${version}/build.md`),
  resolve(`./docs/${version}/advanced.md`),
  // resolve('./LICENSE.md'),
  // resolve('./NOTICE.md'),
  // resolve('./CHANGELOG.md'),
];

const FRONT_MATTER = `---
layout: page
title: Documentation
sitemap: false
redirect_from:
  - /docs/latest/complete/
  - /docs/latest/print/
  - /docs/print/
---\n\n`;

const INTRO_POSTFIX = `
**NOTE**: This document was created using Hydejack's print layout.
If you prefer to read it the documentation in your browser,
you can find it [here]({{ site.baseurl }}{% link docs/${version}/index.md %}).
{:.message}

## Table of Contents
* this unordered seed list will be replaced by toc as unordered list
{:toc}`;

const COMMENT_REGEX = /\s*\/\/(.*)$/gm;
const UNPRETTIFY_REGEX_REGEX = /(^\s*|\n)/gm;

function prettyRegex(strings, ...args) {
  return strings
    .reduce((a, s, i) => a + s + (i < args.length ? args[i] : ''), '')
    .replace(COMMENT_REGEX, '')
    .replace(UNPRETTIFY_REGEX_REGEX, '');
}

const FRONT_MATTER_REGEX = new RegExp(prettyRegex`
  ^---
  (.|\\n)*?
  ---
`);

const TOC_REGEX = new RegExp(prettyRegex`
  #+\\s.+\\n   // heading, e.g. ## Heading
  \\*\\s.+\\n  // list, e.g. * this will be replaced
  \\{:toc\\}   // {:toc}
`);

// TODO: look for first # instead?
const TITLE_IN_FRONT_MATTER_REEGEX = new RegExp(prettyRegex`
  ^---                     // beginning front matter at beginning of file
  (?:.|\\n)*?              // arbitrary number of other keys, nongreedy (!), no capture
  title:\\s['"]?(.+)['"]?  // title key, capture title, ignore ' and "
  (?:.|\\n)*?              // arbitrary number of other keys, nongreedy (!), no caputre
  ---                      // end of front matter
`);

const CONTINUE_WITH_REGEX = /Continue with .*\n{:.read-more}/g;

const INC_HEADING_REGEX = /^(#+\s.*)/gm;

const opt = DOCS.map(d => basename(d, '.md')).join('|');

const INLINE_LINK = new RegExp(prettyRegex`
  (\\[.*\\]\\()       // linked text in []
  (${opt})\\.md[^#]   // link without #
`, 'gm');

const INLINE_LINK_HASH = new RegExp(prettyRegex`
  (\\[.*\\]\\()       // linked text in []
  (${opt})\\.md#(.*)  // link with #
`, 'gm');

const NAMED_LINK = new RegExp(prettyRegex`
  (\\[.*\\]:\\s+)     // label like [1]:
  (${opt})\\.md[^#]   // link without #
`, 'g');

const NAMED_LINK_HASH = new RegExp(prettyRegex`
  (\\[.*\\]:\\s+)     // label like [1]:
  (${opt})\\.md#(.*)  // link with #
`, 'g');

function sep(title) {
  return `\n\n\n
{% comment %}****---------------------------------------------------------------
                    ${title.toUpperCase()}
----------------------------------------------------------------{% endcomment %}
`;
}

(async function main() {
  try {
    const text = await DOCS
      .map(f => [f, readFile(f, ENC)])
      .map(async ([f, p]) => {
        const name = basename(f);

        let content = await p;
        const [, title] = content.match(TITLE_IN_FRONT_MATTER_REEGEX);

        content = content
          .replace(FRONT_MATTER_REGEX, '')
          .replace(TOC_REGEX, '\n')
          .replace(CONTINUE_WITH_REGEX, '\n')
          .replace(INC_HEADING_REGEX, '#$1')
          .replace(INLINE_LINK, '$1#$2)')
          .replace(INLINE_LINK_HASH, '$1#$3)')
          .replace(NAMED_LINK, '$1#$2\n')
          .replace(NAMED_LINK_HASH, '$1#$3')
          .trim();

        if (name === 'index.md') {
          // remove everything from '## Getting started' onwards
          content = content.replace(/#+ getting started(.|\n)*$/ig, '\n');

          // add some content exclusive to the print layout
          content += INTRO_POSTFIX;
        } else {
          const mdTitle = `## ${title}`;
          content = [sep(title), mdTitle, content].join('\n');
        }

        return content;
      })
      .reduce(async (textp, p) => {
        const txt = await textp; // WAT
        const content = await p;
        return txt + content;
      }, FRONT_MATTER);

    await writeFile(resolve(`./docs/${version}/print.md`), text, ENC);

    process.exit(0);
  } catch (e) {
    console.error(e); // eslint-disable-line
    process.exit(1);
  }
}());
