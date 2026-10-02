import { PERSONALITY_TYPES } from './personalityTypes.js';

// Rule-based compatibility between two of the 16 types, built from how the two
// people compare on each axis. For fun and reflection, not a scientific measure.

// Points per axis when the letters match ("same") or differ ("different").
// Sharing S/N weighs most (how you talk and what you notice); differing on I/E
// scores slightly higher than matching (energy balance).
const WEIGHTS = {
  IE: { same: 12, different: 15 },
  SN: { same: 30, different: 10 },
  TF: { same: 18, different: 15 },
  JP: { same: 20, different: 12 },
};
const MAX_POINTS = Object.values(WEIGHTS).reduce((sum, w) => sum + Math.max(w.same, w.different), 0);

const AXIS_ORDER = ['IE', 'SN', 'TF', 'JP'];

// Copy for each axis outcome. `strength` and `friction` are list items; `tip` is advice.
const AXIS_COPY = {
  IE: {
    same: {
      E: {
        title: 'Social butterflies together',
        strength: 'You both recharge around people, so plans, parties and adventures come easily.',
        friction: 'With two big talkers, someone needs to listen. Watch out for competing for the spotlight.',
        tip: 'Take turns choosing between a "go out" night and a slower "just us" night.',
      },
      I: {
        title: 'Cozy and calm',
        strength: 'You both value quiet time and respect each other\'s need for space without taking it personally.',
        friction: 'You might both wait for the other to start the conversation or make the social plans.',
        tip: 'Schedule check-ins so important feelings don\'t stay unspoken.',
      },
    },
    different: {
      title: 'Energy balance',
      strength: 'The extravert brings fresh experiences and the introvert brings depth and calm. You stretch each other in good ways.',
      friction: 'One wants to go out while the other wants to stay in, and that can feel like rejection if it isn\'t talked about.',
      tip: 'Agree on a "social budget" each week, and let the introvert leave parties early with no guilt.',
    },
  },
  SN: {
    same: {
      N: {
        title: 'Big-picture dreamers',
        strength: 'You speak the same language of ideas, possibilities and "what ifs". Conversations can go on for hours.',
        friction: 'Practical tasks like bills and chores can get forgotten while you plan the future.',
        tip: 'Pick one dream a month and turn it into a concrete next step together.',
      },
      S: {
        title: 'Grounded and practical',
        strength: 'You both focus on the real and the here-and-now, which makes daily life smooth and reliable.',
        friction: 'Routines can get too comfortable, so remember to try something new now and then.',
        tip: 'Plan a regular "first time" date: a new place, food or activity.',
      },
    },
    different: {
      title: 'Details meet vision',
      strength: 'One sees the big picture and the other sees the details. Together you can turn ideas into reality.',
      friction: 'You notice different things and can talk past each other: "facts" versus "possibilities".',
      tip: 'When explaining something, the intuitive one gives an example and the observant one shares the "why".',
    },
  },
  TF: {
    same: {
      T: {
        title: 'Logical allies',
        strength: 'You both value honesty and fairness, and can solve problems together without drama.',
        friction: 'Feelings can get skipped. Small hurts may build up because neither of you mentions them.',
        tip: 'Ask "how do you feel about it?" as well as "what should we do?".',
      },
      F: {
        title: 'Heart to heart',
        strength: 'You both lead with empathy and kindness, so you feel deeply understood and cared for.',
        friction: 'You may avoid hard conversations to keep the peace, and resentment can build up quietly.',
        tip: 'Agree that honest feedback is an act of love, not an attack.',
      },
    },
    different: {
      title: 'Head and heart',
      strength: 'One brings logic and the other brings empathy. Together your decisions are both smart and kind.',
      friction: 'Bluntness can feel cold to the feeler, and emotional reasoning can feel illogical to the thinker.',
      tip: 'The thinker softens delivery, and the feeler shares the reasons behind their feelings.',
    },
  },
  JP: {
    same: {
      J: {
        title: 'Plan-makers',
        strength: 'You both love a plan, so life runs on time and you can rely on each other completely.',
        friction: 'When plans clash, two firm planners can lock horns over whose schedule wins.',
        tip: 'Leave some unplanned time in the calendar on purpose.',
      },
      P: {
        title: 'Free spirits',
        strength: 'You both go with the flow, so spontaneous trips and last-minute fun come naturally.',
        friction: 'Deadlines, bills and decisions can slip because neither of you wants to lock things in.',
        tip: 'Share one simple to-do list for the non-negotiables.',
      },
    },
    different: {
      title: 'Structure meets spontaneity',
      strength: 'The planner keeps things on track and the spontaneous one keeps life exciting. It\'s a great balance.',
      friction: 'Late plans and changes can stress the planner, while rigid schedules can frustrate the free spirit.',
      tip: 'Plan the must-dos, and leave the free spirit in charge of the fun bits.',
    },
  },
};

const TIERS = [
  { min: 90, label: 'Soulmate energy', emoji: '💞' },
  { min: 80, label: 'Great match', emoji: '✨' },
  { min: 70, label: 'Good match', emoji: '👍' },
  { min: 0, label: 'Growth match', emoji: '🌱' },
];

export const TYPE_CODES = Object.keys(PERSONALITY_TYPES);

export const isTypeCode = (code) => Boolean(PERSONALITY_TYPES[(code ?? '').toUpperCase()]);

// Canonical URL slug for a pair: alphabetical so A-B and B-A share one page.
export const pairSlug = (a, b) => [a.toLowerCase(), b.toLowerCase()].sort().join('-');

export const parsePairSlug = (slug) => {
  const [a, b, extra] = (slug ?? '').toUpperCase().split('-');
  return !extra && isTypeCode(a) && isTypeCode(b) ? [a, b] : null;
};

export const ALL_PAIR_SLUGS = TYPE_CODES.flatMap((a, i) => TYPE_CODES.slice(i).map((b) => pairSlug(a, b)));

export const getCompatibility = (codeA, codeB) => {
  const a = codeA.toUpperCase();
  const b = codeB.toUpperCase();
  let points = 0;
  const axes = AXIS_ORDER.map((axis, i) => {
    const same = a[i] === b[i];
    points += same ? WEIGHTS[axis].same : WEIGHTS[axis].different;
    const copy = same ? AXIS_COPY[axis].same[a[i]] : AXIS_COPY[axis].different;
    return { axis, same, letters: [a[i], b[i]], ...copy };
  });
  const score = Math.round((points / MAX_POINTS) * 100);
  const tier = TIERS.find((t) => score >= t.min);
  return {
    a: PERSONALITY_TYPES[a],
    b: PERSONALITY_TYPES[b],
    score,
    tier,
    axes,
    strengths: axes.map((x) => x.strength),
    frictions: axes.map((x) => x.friction),
    tips: axes.map((x) => x.tip),
  };
};

// Best matches for one type, highest score first (excluding itself).
export const topMatches = (code, count = 3) =>
  TYPE_CODES.filter((other) => other !== code.toUpperCase())
    .map((other) => ({ code: other, score: getCompatibility(code, other).score }))
    .sort((x, y) => y.score - x.score)
    .slice(0, count);
