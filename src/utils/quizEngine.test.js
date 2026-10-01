import { test } from 'node:test';
import assert from 'node:assert/strict';
import { QUIZZES } from '../data/quizzes/index.js';
import { scoreQuiz, validateQuiz } from './quizEngine.js';

for (const quiz of QUIZZES) {
  test(`${quiz.slug}: definition is valid and every outcome is reachable`, () => {
    assert.deepEqual(validateQuiz(quiz), []);
    for (const outcome of Object.values(quiz.outcomes)) {
      assert.ok(outcome.name && outcome.emoji && outcome.summary && outcome.sections.length);
    }
  });

  test(`${quiz.slug}: every outcome can actually win`, () => {
    for (const id of Object.keys(quiz.outcomes)) {
      // Pick this outcome whenever it is offered; otherwise pick the option that keeps
      // the strongest rival lowest (like a real person who leans one way).
      const totals = Object.fromEntries(Object.keys(quiz.outcomes).map((k) => [k, 0]));
      const rivalMax = () => Math.max(...Object.entries(totals).filter(([k]) => k !== id).map(([, v]) => v));
      const answers = quiz.questions.map((q) => {
        const scoreAfter = (option) => {
          for (const [k, v] of Object.entries(option.scores)) totals[k] += v;
          const result = [option.scores[id] ?? 0, -rivalMax()];
          for (const [k, v] of Object.entries(option.scores)) totals[k] -= v;
          return result;
        };
        let best = 0;
        q.options.forEach((o, i) => {
          const [mine, rivals] = scoreAfter(o);
          const [bestMine, bestRivals] = scoreAfter(q.options[best]);
          if (mine > bestMine || (mine === bestMine && rivals > bestRivals)) best = i;
        });
        for (const [k, v] of Object.entries(q.options[best].scores)) totals[k] += v;
        return best;
      });
      assert.equal(scoreQuiz(quiz, answers), id, `${id} could not win`);
    }
  });
}

test('ties go to the highest single score, then the most recent', () => {
  const quiz = {
    outcomes: { a: {}, b: {}, c: {} },
    questions: [
      { options: [{ scores: { a: 2 } }] },
      { options: [{ scores: { b: 1 } }] },
      { options: [{ scores: { b: 1 } }] },
    ],
  };
  assert.equal(scoreQuiz(quiz, [0, 0, 0]), 'a');
  const recent = { outcomes: { a: {}, b: {} }, questions: [{ options: [{ scores: { a: 1 } }] }, { options: [{ scores: { b: 1 } }] }] };
  assert.equal(scoreQuiz(recent, [0, 0]), 'b');
});
