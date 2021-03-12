# Generate Passphrase

[![npm (tag)](https://img.shields.io/npm/v/generate-passphrase/next?style=flat-square)](https://www.npmjs.com/package/generate-passphrase) [![npm](https://img.shields.io/npm/dm/generate-passphrase?style=flat-square)](https://www.npmjs.com/package/generate-passphrase) [![Codecov](https://img.shields.io/codecov/c/github/aldy505/generate-passphrase?style=flat-square)](https://codecov.io/gh/aldy505/generate-passphrase) [![GitHub branch checks state](https://img.shields.io/github/checks-status/aldy505/generate-passphrase/master?style=flat-square)](https://github.com/aldy505/generate-passphrase/actions) [![GitHub](https://img.shields.io/github/license/aldy505/generate-passphrase?style=flat-square)](https://github.com/aldy505/generate-passphrase/blob/master/LICENSE)

> ✨Zero dependency module for generating passphrase.

An Indonesian language fork of (also my repository) [generate-passphrase](https://github.com/aldy505/generate-passphrase).

It's working. But still it's a work in progress.

The code is close to node [generate-password](https://github.com/brendanashworth/generate-password) repo. But this is for a passphrase, with English language.

ProtonMail has a [decent article](https://protonmail.com/blog/protonmail-com-blog-password-vs-passphrase/) explaining about password vs passphrase. 

Is this secure? Yes. I don't use `Math.floor`, I used the `crypto` module.

Why is this repo heavy? I'm using [sindresorhus' word-list repo](https://github.com/sindresorhus/word-list) for fetching the English word list. If you have a better idea/workaround for this, feel free to open up an issue and file a PR! I'll gladly accept any feedbacks.

## Installation
```bash
$ npm install generate-passphrase-id@next
# or
$ yarn add generate-passphrase-id@next
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
| generate-passphrase-id | 8.76 | ±2.92% | 230 |
| generate-password | 551,350 | ±1.93% | 331 |
| niceware | 378,754 | ±2.11% | 347 | 
| randomatic | 12,361 | ±0.97% | 336 |

Benchmark for multiple passphrase/password (`generateMultiple` function):

| Module | Ops/sec | Accuracy | Runs sampled |
| --- | --- | --- | --- |
| generate-passphrase-id | 0.92 | ±0.91% | 156 |
| generate-password | 61,347 | ±1.20% | 349 |

## Contributing

Yes please.

## License

[MIT](https://github.com/aldy505/generate-passphrase/blob/master/LICENSE)
