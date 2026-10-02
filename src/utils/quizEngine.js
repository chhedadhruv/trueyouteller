// Shared engine for the character mini-quizzes.
//
// Quiz schema (src/data/quizzes/*.js):
// {
//   slug, title, shortTitle, emoji, description, seoDescription,
//   questions: [{ text, options: [{ label, scores: { [outcomeId]: points } }] }],
//   outcomes: {
//     [outcomeId]: {
//       name, emoji, tagline, summary, sharePhrase?,
//       sections: [{ title, text? , list?: string[], cards?: [{ name, text }] }],
//     },
//   },
// }

// answers: chosen option index per question. Returns the winning outcome id.
// Ties on total points go to the outcome with the highest single-answer score,
// then to whichever of the tied outcomes was scored most recently.
export const scoreQuiz = (quiz, answers) => {
  const stats = Object.fromEntries(
    Object.keys(quiz.outcomes).map((id) => [id, { total: 0, best: 0, last: -1 }])
  );

  quiz.questions.forEach((question, qIndex) => {
    const option = question.options[answers[qIndex]];
    if (!option) return;
    for (const [id, points] of Object.entries(option.scores)) {
      const s = stats[id];
      s.total += points;
      s.best = Math.max(s.best, points);
      s.last = qIndex;
    }
  });

  return Object.entries(stats).sort(
    ([, a], [, b]) => b.total - a.total || b.best - a.best || b.last - a.last
  )[0][0];
};

// Problems with a quiz definition (unknown outcome ids, outcomes nobody can reach...).
export const validateQuiz = (quiz) => {
  const problems = [];
  const reachable = new Set();
  quiz.questions.forEach((question, q) => {
    question.options.forEach((option, o) => {
      const ids = Object.keys(option.scores);
      if (ids.length === 0) problems.push(`Q${q + 1} option ${o + 1} scores nothing`);
      ids.forEach((id) => {
        if (!quiz.outcomes[id]) problems.push(`Q${q + 1} option ${o + 1} scores unknown outcome "${id}"`);
        reachable.add(id);
      });
    });
  });
  Object.keys(quiz.outcomes).forEach((id) => {
    if (!reachable.has(id)) problems.push(`outcome "${id}" is never scored`);
  });
  return problems;
};
