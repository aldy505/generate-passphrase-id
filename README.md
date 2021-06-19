# Generate Passphrase

[![npm](https://img.shields.io/npm/v/generate-passphrase-id?style=flat-square) ![npm](https://img.shields.io/npm/dm/generate-passphrase-id?style=flat-square) ![npm bundle size](https://img.shields.io/bundlephobia/min/generate-passphrase-id?style=flat-square)](https://www.npmjs.com/package/generate-passphrase-id) [![Codecov](https://img.shields.io/codecov/c/github/aldy505/generate-passphrase-id?style=flat-square)](https://codecov.io/gh/aldy505/generate-passphrase-id) [![GitHub branch checks state](https://img.shields.io/github/checks-status/aldy505/generate-passphrase-id/master?style=flat-square)](https://github.com/aldy505/generate-passphrase-id/actions) [![GitHub](https://img.shields.io/github/license/aldy505/generate-passphrase-id?style=flat-square)](https://github.com/aldy505/generate-passphrase-id/blob/master/LICENSE)

> ✨Zero dependency module for generating passphrase.

An Indonesian language fork of (also my repository) [generate-passphrase](https://github.com/aldy505/generate-passphrase).

* 🚀 Simple passphrase generator with simple config
* ✨ ESM support
* 🔑 Cryptographically secure
* 📕 Built-in Typescript typings
* 🎊 Supports Node.js 10 and higher

The code is close to node [generate-password](https://github.com/brendanashworth/generate-password) repo. But this is for a passphrase, with Indonesian language.

ProtonMail has a [decent article](https://protonmail.com/blog/protonmail-com-blog-password-vs-passphrase/) explaining about password vs passphrase. 

Is this secure? Yes. I don't use `Math.floor`, I used the `crypto` module.

Why is this repo heavy? I'm using scraped words list from KBBI for fetching the Indonesian word list. If you have a better idea/workaround for this, feel free to open up an issue and file a PR! I'll gladly accept any feedbacks.

## Installation
```bash
$ npm install generate-passphrase-id
# or
$ yarn add generate-passphrase-id
# or basically any package manager you like.
```

## How to use this? 

```js
import { generate, generateMultiple } from 'generate-passphrase-id'
// or
const { generate, generateMultiple } = require('generate-passphrase-id')

const passphrase = generate();
// 'spionase-syahwat-41-neolitikum'
const anotherPassphrase = generate({ length: 3, separator: '.', titlecase: true }) 
// see available options below

const multiplePassphrase = generateMultiple(3)
// ['pomologi-jerojol-kalau-senandika', 'kakek-meristem-89-emigras', ... ]
const anotherMultiplePassphrase = generateMultiple(10, { length: 2, uppercase: true, numbers: false })
```

I know some of us need to generate it fast just for the sake of it, you can add `fast` as a parameter. (It defaults to false). Please bear in mind, this would make the returning random passphrase **not cryptographically secure**

```js
const fast = generate({ fast: true })
// cultivars-strigose-avisements-58

const extraFast = generateMultiple(5, { fast: true })
// ['extrorsal-169-resultlessness-168', 'postmodern-kolkhozniki-skulkers-99', ... ]
```

## Options

| Key | Type | Default |
| --- | --- | --- |
| length | `integer` | `4` |
| separator | `string` | `'-'` |
| numbers | `boolean` | `true` |
| uppercase | `boolean` | `false` |
| titlecase | `boolean` | `false` |
| pattern | `string` | `null` |

A few things to note:
 * Uppercase is more prioritized than titlecase. So if you have both options set to `true`, it will be words full of uppercase.
 * Pattern option is more prioritized than length, because you've set the passphrase pattern, hence the module is using the length from your pattern.

## Benchmark a.k.a How slow is this?

**TL;DR:** It's slow.

I'm using:
* Asus ROG GL553VE
* Windows 10 Home 64-bit (10.0 Build 18363)
* Intel Core i7-7700HQ @ 2.80GHz, 8 CPUs
* 16 GB RAM

Benchmark for single passphrase/password:

| Module | Ops/sec | Accuracy | Runs sampled |
| --- | --- | --- | --- |
| generate-passphrase-id | 68.53 | ±3.36% | 280 |
| generate-password | 558,846 | ±1.25% | 344 |
| niceware | 358,662 | ±1.84% | 329 | 
| randomatic | 9,943 | ±3.17% | 301 |

Benchmark for multiple passphrase/password (`generateMultiple` function):

| Module | Ops/sec | Accuracy | Runs sampled |
| --- | --- | --- | --- |
| generate-passphrase-id | 6.95 | ±4.23% | 255 |
| generate-password | 60,395 | ±1.42% | 343 |

## Contributing

Yes please.

## License

[MIT](https://github.com/aldy505/generate-passphrase-id/blob/master/LICENSE)
