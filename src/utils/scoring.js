import { questions as defaultQuestions } from '../data/questions.js';

// Axis key -> [letter for negative scores, letter for positive scores].
export const AXES = {
  IE: ['I', 'E'],
  SN: ['S', 'N'],
  TF: ['T', 'F'],
  JP: ['J', 'P'],
};

// Used only when an axis is a perfect tie AND every answer on it was neutral,
// so there is no signal at all. These are the more common letters in population surveys.
const NO_SIGNAL_DEFAULT = { IE: 'I', SN: 'S', TF: 'F', JP: 'J' };

// Scores Likert answers (-2..2, one per question) into a type code plus, per axis,
// the percentage leaning toward the axis's second letter (E, N, F, P).
// A tie is broken by the strongest single answer on that axis (latest wins if equal),
// so a balanced score never silently defaults to the same letter.
export const scoreAnswers = (answers, questions = defaultQuestions) => {
  const totals = {};
  const max = {};
  const strongest = {};
  for (const axis of Object.keys(AXES)) {
    totals[axis] = 0;
    max[axis] = 0;
    strongest[axis] = 0;
  }

  questions.forEach((question, index) => {
    const value = answers[index] ?? 0;
    question.mapping.forEach(({ axis, direction }) => {
      const score = value * direction;
      totals[axis] += score;
      max[axis] += 2;
      if (Math.abs(score) >= Math.abs(strongest[axis]) && score !== 0) strongest[axis] = score;
    });
  });

  const percentages = {};
  let type = '';
  for (const [axis, [low, high]] of Object.entries(AXES)) {
    percentages[axis] = max[axis] ? Math.round(((totals[axis] + max[axis]) / (2 * max[axis])) * 100) : 50;
    const lean = totals[axis] || strongest[axis];
    type += lean > 0 ? high : lean < 0 ? low : NO_SIGNAL_DEFAULT[axis];
  }

  return { type, percentages };
};

// Percentages travel in result URLs as "62-40-55-30" (IE-SN-TF-JP order).
export const encodePercentages = (percentages) =>
  Object.keys(AXES).map((axis) => percentages[axis]).join('-');

export const decodePercentages = (value) => {
  const parts = (value ?? '').split('-').map(Number);
  if (parts.length !== 4 || parts.some((n) => !Number.isInteger(n) || n < 0 || n > 100)) return null;
  return Object.fromEntries(Object.keys(AXES).map((axis, i) => [axis, parts[i]]));
};

// Percentages say how far toward the second letter; flip for display when the type is the first letter.
export const axisBreakdown = (type, percentages) =>
  Object.entries(AXES).map(([axis, [low, high]], i) => {
    const towardHigh = percentages[axis];
    const letter = type[i];
    return {
      axis,
      low,
      high,
      letter,
      towardHigh,
      strength: letter === high ? towardHigh : 100 - towardHigh,
    };
  });
