/**
 * @module generate-passphrase-id
 * @author Reinaldy Rafli <hi@reinaldyrafli.com>
 * @license MIT
 */
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

interface generateOptions {
  length?: number,
  separator?: string,
  numbers?: boolean,
  uppercase?: boolean,
  titlecase?: boolean,
  pattern?: string
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

function getRandomNumber(max: number): number {
  let rand = getRandomValue();
  while (rand === undefined || rand >= 256 - (256 % max)) {
    rand = getRandomValue();
  }
  return rand % max;
}

function getRandomPattern(length: number, numbers: boolean): string {
  /**
   * PATTERNS:
   * N: NUMBER
   * W: WORD
   */
  const pool = (numbers) ? 'NWW' : 'WWW';
  let pattern = '';
  for (let i = 0; i < length; i += 1) {
    pattern += pool[getRandomNumber(2)];
  }
  return pattern;
}

function getRandomWord(): string {
  const wordsArray = fs.readFileSync(path.resolve(__dirname, 'id.txt'), 'utf8').split('\n');
  const randomInt = crypto.randomInt(0, wordsArray.length);
  return wordsArray[randomInt];
}

/**
 * Generate a passphrase with options
 * @param {generateOptions} options - The options
 * @returns {string} - A passphrase
 */
export function generate(options: generateOptions = {}): string {
  const defaults = {
    length: 4,
    separator: '-',
    numbers: true,
    uppercase: false,
    titlecase: false,
    pattern: null,
  };

  const opts = { ...defaults, ...options };

  if (opts.length === 0) {
    throw new Error('Length should be 1 or bigger. It should not be zero.');
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
      let wordArr: Array<string>;
      const word = getRandomWord();
      const randSort = getRandomNumber(1);

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
        passphraseArray.push(wordArr[randSort].replace(/\w\S*/g, (text) => text.charAt(0).toUpperCase() + text.substr(1).toLowerCase()));
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
 * @returns {Array<string>} - Array of passphrases
 */
export function generateMultiple(amount: number, options: generateOptions = {}): Array<string> {
  const passphrase = [];
  for (let i = 0; i < amount; i += 1) {
    passphrase[i] = generate(options);
  }
  return passphrase;
}
