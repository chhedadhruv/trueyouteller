import { getCompatibility } from './compatibility.js';

// Couple / BFF joint report built from how the two types compare on each axis.
// {a} and {b} are replaced with the two names.

const FIGHT = {
  different: {
    TF: '{a} and {b} argue differently: one wants to solve the problem, the other wants to feel heard first. Start with "I hear you", then fix it.',
  },
  same: {
    T: 'You both debate like lawyers. Fights are short and logical, but remember to say sorry, not just "you have a point".',
    F: 'You both hate conflict, so fights can simmer quietly. Say the hard thing early and kindly.',
  },
};

const APOLOGY = {
  same: {
    F: 'A heartfelt note, a long hug and "I never want you to feel that way" works for both of you.',
    T: 'Explain what went wrong, own it and agree on a fix. That\'s romance to you two.',
  },
  different: '{thinker} needs a clear explanation and a plan; {feeler} needs to hear that the hurt mattered. Give both.',
};

const PLANS = {
  bothJ: 'Two planners! Your shared calendar is a work of art. Leave one "no plans" day a month on purpose.',
  bothP: 'Two free spirits! Adventures happen by accident. Agree on one person to handle tickets and deadlines.',
  mixed: '{planner} plans the trip; {spontaneous} decides what happens once you get there. Perfect balance.',
};

const DATES = {
  couple: {
    EE: 'a festival, a concert or dinner with friends that turns into karaoke',
    II: 'a cozy movie marathon with homemade snacks and phones off',
    mixed: 'a cooking class: social enough for one of you, focused enough for the other',
  },
  bestie: {
    EE: 'a road trip with a loud playlist and zero quiet moments',
    II: 'a bookshop and café crawl, followed by a long walk',
    mixed: 'an escape room: teamwork, puzzles and lots to talk about after',
  },
};

const SUPERPOWERS = {
  NN: 'Dreaming up big, original plans together',
  SS: 'Getting real things done, fast',
  TT: 'Solving any problem without drama',
  FF: 'Making everyone around you feel welcome',
  default: 'Covering each other\'s blind spots',
};

const fill = (text, names) => text.replace(/\{(\w+)\}/g, (_, key) => names[key] ?? key);

export const buildDuoReport = ({ mode, a, b }) => {
  const { score, tier } = getCompatibility(a.type, b.type);
  const [ta, tb] = [a.type, b.type];
  const names = {
    a: a.name,
    b: b.name,
    thinker: ta[2] === 'T' ? a.name : b.name,
    feeler: ta[2] === 'F' ? a.name : b.name,
    planner: ta[3] === 'J' ? a.name : b.name,
    spontaneous: ta[3] === 'P' ? a.name : b.name,
  };
  const sameTF = ta[2] === tb[2];
  const energy = ta[0] === 'E' && tb[0] === 'E' ? 'EE' : ta[0] === 'I' && tb[0] === 'I' ? 'II' : 'mixed';
  const plans = ta[3] === 'J' && tb[3] === 'J' ? 'bothJ' : ta[3] === 'P' && tb[3] === 'P' ? 'bothP' : 'mixed';
  const superpower =
    (ta[1] === tb[1] && SUPERPOWERS[ta[1] + tb[1]]) || (sameTF && SUPERPOWERS[ta[2] + tb[2]]) || SUPERPOWERS.default;

  return {
    score,
    tier,
    sections: [
      { emoji: '⚡', title: 'How you fight', text: fill(sameTF ? FIGHT.same[ta[2]] : FIGHT.different.TF, names) },
      { emoji: '🕊️', title: 'How to say sorry', text: fill(sameTF ? APOLOGY.same[ta[2]] : APOLOGY.different, names) },
      { emoji: '🗓️', title: 'Who plans, who improvises', text: fill(PLANS[plans], names) },
      {
        emoji: mode === 'couple' ? '🌹' : '🎒',
        title: mode === 'couple' ? 'Your ideal date' : 'Your ideal day out',
        text: `${a.name} and ${b.name} would love ${DATES[mode][energy]}.`,
      },
      { emoji: '🦸', title: 'Your shared superpower', text: superpower },
    ],
  };
};
