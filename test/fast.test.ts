import {suite} from 'uvu';
import * as assert from 'uvu/assert';
import {generate, generateMultiple} from '../src/index';

const fast = suite('should be fast! - single');

fast('generate single passphrase - normal', () => {
  const generated = generate({fast: true});
  assert.type(generated, 'string');
  assert.is(generated.split('-').length, 4);
});

fast('generate single passphrase - with options', () => {
  const generated = generate({length: 20, fast: true, numbers: true});
  assert.type(generated, 'string');
  assert.is(generated.split('-').length, 20);
});

fast.run();

const mfast = suite('should be fast! - multiple');

mfast('generate multiple passphrase - normal', () => {
  const generated = generateMultiple(50, {fast: true});
  assert.type(generated, 'object');
  assert.is(generated.length, 50);
});

mfast('generate multiple passphrase - with options', () => {
  const generated = generateMultiple(50, {length: 20, fast: true, numbers: true});
  assert.type(generated, 'object');
  assert.is(generated.length, 50);
});

mfast('generate multiple passphrase - all uppercase', () => {
  const generated = generateMultiple(50, {numbers: false, uppercase: true, fast: true});
  for (let j = 0; j < generated.length; j += 1) {
    for (let i = 0; i < generated[j].length; i += 1) {
      const genSplit = generated[j].split('-');
      for (let k = 0; k < genSplit.length; k += 1) {
        assert.match(genSplit[k], /[A-Z]/g);
      }
    }
  }
});

mfast('generate multiple passphrase - all titlecase', () => {
  const generated = generateMultiple(50, {numbers: false, titlecase: true, fast: true});
  for (let j = 0; j < generated.length; j += 1) {
    for (let i = 0; i < generated[j].length; i += 1) {
      const genSplit = generated[j].split('-');
      for (let k = 0; k < genSplit.length; k += 1) {
        const perWord = genSplit[k].split('');
        assert.match(perWord[0], /[A-Z]/g);
        assert.match(perWord[1], /[a-z]/g);
      }
    }
  }
});

mfast.run();
