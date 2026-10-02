// "How others see you": friends rate 16 third-person statements about the owner.
// {name} is replaced with the owner's name. 4 per axis, 2 per pole; same direction
// convention as questions.js (+1 toward E, N, F, P).
const E = { axis: 'IE', direction: 1 };
const I = { axis: 'IE', direction: -1 };
const N = { axis: 'SN', direction: 1 };
const S = { axis: 'SN', direction: -1 };
const F = { axis: 'TF', direction: 1 };
const T = { axis: 'TF', direction: -1 };
const P = { axis: 'JP', direction: 1 };
const J = { axis: 'JP', direction: -1 };

const q = (statement, map) => ({ statement, mapping: [map] });

export const MIRROR_QUESTIONS = [
  q('{name} lights up a room full of people.', E),
  q('{name} has wild ideas and loves talking about "what if".', N),
  q('{name} tells it like it is, even when it stings.', T),
  q('{name} always has a plan (and probably a backup plan).', J),
  q('{name} needs alone time to recharge after socializing.', I),
  q('{name} notices practical details everyone else misses.', S),
  q('{name} is the first to notice when someone is upset.', F),
  q('{name} happily changes plans at the last minute.', P),
  q('{name} is usually the one starting conversations with new people.', E),
  q('{name} gets lost in daydreams and big-picture thinking.', N),
  q('{name} makes decisions with their head, not their heart.', T),
  q('{name} likes things organized and settled early.', J),
  q('{name} prefers deep one-on-one chats to big parties.', I),
  q('{name} prefers proven, practical ways of doing things.', S),
  q('{name} would rather keep the peace than win an argument.', F),
  q('{name} does their best work at the last minute.', P),
];

export const MIRROR_MIN_RATINGS = 3;
