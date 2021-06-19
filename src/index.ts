/**
 * @module generate-passphrase-id
 * @author Reinaldy Rafli <hi@reinaldyrafli.com>
 * @license MIT
 */
import crypto from 'crypto';
import {readFileSync} from 'fs';
import {resolve} from 'path';

interface generateOptions {
  length?: number,
  separator?: string,
  numbers?: boolean,
  uppercase?: boolean,
  titlecase?: boolean,
  pattern?: string,
  fast?: boolean
}

let randomBytes: Buffer;
let randomIndex: number;

function getRandomValue(): number {
  if (randomIndex === undefined || randomIndex >= randomBytes.length) {
    randomBytes = crypto.randomBytes(256);
    randomIndex = 0;
  }

  randomIndex += 1;
  return randomBytes[randomIndex];
}

function getRandomNumber(max: number, fast = false): number {
  if (fast) {
    return Math.floor(Math.random() * max);
  }

  let rand = getRandomValue();
  while (rand === undefined || rand >= 256 - (256 % max)) {
    rand = getRandomValue();
  }

  return rand % max;
}

function getRandomPattern(length: number, numbers: boolean, fast = false): string {
  const pool = (numbers) ? 'NWW' : 'WWW';
  let pattern = '';
  for (let i = 0; i < length; i += 1) {
    pattern += pool[getRandomNumber(2, fast)];
  }

  return pattern;
}

const words = readFileSync(resolve(__dirname, './words.txt'), 'utf8').split('\n');
function getRandomWord(fast = false): string {
  const randomInt = fast ? Math.floor(Math.random() * words.length) : crypto.randomInt(0, words.length);
  return words[randomInt];
}

/**
 * Generate a passphrase with options
 * @param {generateOptions} options - The options
 * @returns {string} - A passphrase
 * @link https://github.com/aldy505/generate-passphrase-id#how-to-use-this Usage
 */
export function generate(options: generateOptions = {}): string {
  const defaults = {
    length: 4,
    separator: '-',
    numbers: true,
    uppercase: false,
    titlecase: false,
    pattern: '',
    fast: false
  };

  const opts = {...defaults, ...options};

  if (opts.length <= 0) {
    throw new Error('Length should be 1 or bigger. It should not be zero or lower.');
  }

  const passphraseArray: Array<string | number> = [];

  let pattern: string;
  if (opts.pattern) {
    pattern = opts.pattern.toUpperCase();
  } else {
    pattern = getRandomPattern(opts.length, opts.numbers);
  }

  const eachPattern = pattern.split('');
  for (let i = 0; i < eachPattern.length; i += 1) {
    if (eachPattern[i] === 'N') {
      passphraseArray.push(getRandomValue());
    } else if (eachPattern[i] === 'W') {
      let wordArr: string[];
      const word = getRandomWord(opts.fast);
      const randSort = getRandomNumber(1, opts.fast);

      if (opts.uppercase) {
        if (word.match(/[-]/g)) {
          wordArr = word.split('-');
        } else if (word.match(/[ ]/g)) {
          wordArr = word.split(' ');
        } else {
          wordArr = [word, word, word];
        }

        passphraseArray.push(wordArr[randSort].toUpperCase());
      } else if (opts.titlecase) {
        if (word.match(/[-]/g)) {
          wordArr = word.split('-');
        } else if (word.match(/[ ]/g)) {
          wordArr = word.split(' ');
        } else {
          wordArr = [word, word, word];
        }

        passphraseArray.push(wordArr[randSort].replace(/\w\S*/g, text => text.charAt(0).toUpperCase() + text.substr(1).toLowerCase()));
      } else if (word.match(/[ ]/g)) {
        wordArr = word.split(' ');
        passphraseArray.push(wordArr[randSort]);
      } else if (word.match(/[-]/g)) {
        wordArr = word.split('-');
        passphraseArray.push(wordArr[randSort]);
      } else {
        passphraseArray.push(word);
      }
    } else {
      throw new Error('Unknown pattern found. Use N or W instead.');
    }
  }

  const passphrase = passphraseArray.join(opts.separator);
  return passphrase;
}

/**
 * Generate multiple passphrase with the same options
 * @param {number} amount - The number of passphrase returned
 * @param {generateOptions} options - The options
 * @returns {string[]]} - Array of passphrases
 * @link https://github.com/aldy505/generate-passphrase-id#how-to-use-this Usage
 */
export function generateMultiple(amount: number, options: generateOptions = {}): string[] {
  const passphrase = [];
  for (let i = 0; i < amount; i += 1) {
    passphrase[i] = generate(options);
  }

  return passphrase;
}
