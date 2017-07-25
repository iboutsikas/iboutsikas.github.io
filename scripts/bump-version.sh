#!/usr/bin/env node

const { promisify } = require('util');
const { resolve } = require('path');
const fs = require('fs');

const readdir = promisify(fs.readdir);
const rename = promisify(fs.rename);
const stat = promisify(fs.stat);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

// function writeFile(f) {
//   console.log('write', f); // eslint-disable-line
// }

const vPrev = require('../assets/version.json').version;
const vNext = require('../package.json').version;

const ENC = 'utf-8';

// <https://stackoverflow.com/a/45130990/870615>
async function getFiles(dir) {
  const subdirs = await readdir(dir);
  const files = await Promise.all(subdirs.map(async (subdir) => {
    const res = resolve(dir, subdir);
    return (await stat(res)).isDirectory() ? getFiles(res) : res;
  }));
  return files.reduce((a, f) => a.concat(f), []);
}

const FILES = [
  resolve('./_includes/head.html'),
  resolve('./_includes/footer.html'),
  resolve('./_includes/scripts.html'),
  resolve('./_includes/header.txt'),
  resolve('./_js/lib/version.js'),
  resolve('./_layouts/compress.html'),
  resolve('./assets/version.json'),
  resolve('./about.md'),
  resolve('./CHANGELOG.md'),
  resolve('./download.md'),
  resolve('./index.md'),
  resolve('./README.md'),
  resolve('./thank-you.md'),
];

(async function main() {
  try {
    const files = await Promise.all([
      FILES,
      getFiles('./_posts'),
      getFiles('./_projects'),
      getFiles('./docs'),
    ])
      .then(([...args]) => Array.prototype.concat.call(...args));

    const prev = vPrev.replace(/\./g, '\\.');
    const prevRegExp = new RegExp(prev, 'g');

    await Promise.all(files
      .filter(([f]) => !f.startsWith('.'))
      .map(f => [f, readFile(f, ENC)])
      .map(async ([f, p]) => {
        const content = await p;

        if (f.includes('CHANGELOG')) {
          const pattern = new RegExp(`([^v])${prev}`, 'g');
          return [f, content.replace(pattern, `$1${vNext}`)];
        }

        return [f, content.replace(prevRegExp, vNext)];
      })
      .map(async (p) => {
        const [f, content] = await p;
        return writeFile(f, content, ENC);
      }));

    await rename(
      resolve(`./docs/${vPrev}`),
      resolve(`./docs/${vNext}`),
    );

    process.exit(0);
  } catch (e) {
    console.error(e); // eslint-disable-line
    process.exit(1);
  }
}());
