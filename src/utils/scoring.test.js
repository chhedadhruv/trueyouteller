import { test } from 'node:test';
import assert from 'node:assert/strict';
import { questions } from '../data/questions.js';
import { PERSONALITY_TYPES } from '../data/personalityTypes.js';
import { scoreAnswers, encodePercentages, decodePercentages, axisBreakdown, AXES } from './scoring.js';

const answerToward = (letters) =>
  questions.map(({ mapping: [{ axis, direction }] }) => {
    const wantHigh = letters.includes(AXES[axis][1]);
    return (wantHigh ? 2 : -2) * direction;
  });

test('question set is balanced: 12 per axis, 6 per pole, one axis each', () => {
  const counts = {};
  for (const { mapping } of questions) {
    assert.equal(mapping.length, 1);
    const key = `${mapping[0].axis}${mapping[0].direction}`;
    counts[key] = (counts[key] ?? 0) + 1;
  }
  for (const axis of Object.keys(AXES)) {
    assert.equal(counts[`${axis}1`], 6, `${axis} +`);
    assert.equal(counts[`${axis}-1`], 6, `${axis} -`);
  }
});

test('every one of the 16 types is reachable and exists in the data', () => {
  for (const code of Object.keys(PERSONALITY_TYPES)) {
    const { type, percentages } = scoreAnswers(answerToward(code));
    assert.equal(type, code);
    for (const [axis, [, high]] of Object.entries(AXES)) {
      assert.equal(percentages[axis], code.includes(high) ? 100 : 0);
    }
  }
});

test('all-neutral answers give 50% everywhere and the no-signal default', () => {
  const { type, percentages } = scoreAnswers(questions.map(() => 0));
  assert.equal(type, 'ISFJ');
  assert.deepEqual(percentages, { IE: 50, SN: 50, TF: 50, JP: 50 });
});

test('agreeing with everything is balanced, not skewed to one type', () => {
  const { percentages } = scoreAnswers(questions.map(() => 2));
  assert.deepEqual(percentages, { IE: 50, SN: 50, TF: 50, JP: 50 });
});

test('a tie is broken by the strongest single answer', () => {
  const answers = questions.map(() => 0);
  const eIdx = questions.findIndex((q) => q.mapping[0].axis === 'IE' && q.mapping[0].direction === 1);
  const iIdxs = questions
    .map((q, i) => (q.mapping[0].axis === 'IE' && q.mapping[0].direction === -1 ? i : -1))
    .filter((i) => i >= 0);
  answers[eIdx] = 2; // +2 toward E
  answers[iIdxs[0]] = 1; // +1 toward I
  answers[iIdxs[1]] = 1; // +1 toward I  -> total 0
  assert.equal(scoreAnswers(answers).type[0], 'E');
});

test('percentages round-trip through the URL encoding', () => {
  const p = { IE: 62, SN: 40, TF: 55, JP: 30 };
  assert.equal(encodePercentages(p), '62-40-55-30');
  assert.deepEqual(decodePercentages('62-40-55-30'), p);
  assert.equal(decodePercentages('62-40-55'), null);
  assert.equal(decodePercentages('62-40-55-300'), null);
  assert.equal(decodePercentages(undefined), null);
});

test('axis breakdown reports strength toward the chosen letter', () => {
  const rows = axisBreakdown('INTJ', { IE: 30, SN: 70, TF: 20, JP: 45 });
  assert.deepEqual(rows.map((r) => [r.letter, r.strength]), [['I', 70], ['N', 70], ['T', 80], ['J', 55]]);
});
