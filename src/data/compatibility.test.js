import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  ALL_PAIR_SLUGS,
  getCompatibility,
  pairSlug,
  parsePairSlug,
  topMatches,
  TYPE_CODES,
} from './compatibility.js';

test('there is one canonical page per unordered pair (136 including same-type pairs)', () => {
  assert.equal(ALL_PAIR_SLUGS.length, 136);
  assert.equal(new Set(ALL_PAIR_SLUGS).size, 136);
});

test('pair slugs are order-independent and parse back', () => {
  assert.equal(pairSlug('INTJ', 'ENFP'), 'enfp-intj');
  assert.equal(pairSlug('enfp', 'intj'), 'enfp-intj');
  assert.deepEqual(parsePairSlug('enfp-intj'), ['ENFP', 'INTJ']);
  assert.equal(parsePairSlug('enfp-xxxx'), null);
  assert.equal(parsePairSlug('enfp-intj-istj'), null);
  assert.equal(parsePairSlug(undefined), null);
});

test('compatibility is symmetric, within 0-100, and has copy for every axis', () => {
  for (const a of TYPE_CODES) {
    for (const b of TYPE_CODES) {
      const ab = getCompatibility(a, b);
      assert.equal(ab.score, getCompatibility(b, a).score, `${a}/${b}`);
      assert.ok(ab.score >= 0 && ab.score <= 100);
      assert.ok(ab.tier?.label);
      for (const axis of ab.axes) {
        assert.ok(axis.title && axis.strength && axis.friction && axis.tip, `${a}/${b} ${axis.axis}`);
      }
    }
  }
});

test('top matches exclude the type itself and are sorted by score', () => {
  const matches = topMatches('INTJ', 5);
  assert.equal(matches.length, 5);
  assert.ok(matches.every((m) => m.code !== 'INTJ'));
  assert.ok(matches.every((m, i) => i === 0 || matches[i - 1].score >= m.score));
});
