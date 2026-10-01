// Bump when statements or mappings change, so saved progress and stored results
// from an older question set are not mixed with the new one.
export const QUESTION_VERSION = 2;

// 48 statements: 12 per axis, 6 per pole, each scoring exactly one axis.
// direction +1 points toward the second letter of the axis (E, N, F, P),
// direction -1 toward the first (I, S, T, J).
const E = { axis: 'IE', direction: 1 };
const I = { axis: 'IE', direction: -1 };
const N = { axis: 'SN', direction: 1 };
const S = { axis: 'SN', direction: -1 };
const F = { axis: 'TF', direction: 1 };
const T = { axis: 'TF', direction: -1 };
const P = { axis: 'JP', direction: 1 };
const J = { axis: 'JP', direction: -1 };

const q = (statement, map) => ({ statement, mapping: [map] });

export const questions = [
  q('I feel energized when spending time in large social gatherings.', E),
  q('I enjoy deep, philosophical discussions about abstract ideas.', N),
  q('When making important decisions, I rely mostly on logic and facts.', T),
  q('I prefer to have a clear plan before starting a new project.', J),
  q('I enjoy spending a lot of my free time alone, pursuing my own interests.', I),
  q('I prefer to focus on practical matters rather than theories.', S),
  q("I'm good at sensing how others feel, even when they don't say it.", F),
  q('I adapt easily to unexpected changes and can go with the flow.', P),
  q('I find it easy to start conversations with strangers.', E),
  q('I often daydream about possibilities and "what ifs".', N),
  q("I'd rather be direct and honest than tactful, even if it causes disagreement.", T),
  q('I am a highly organized person.', J),
  q('After a busy week, I prefer to recharge quietly on my own.', I),
  q('I notice small details that other people tend to miss.', S),
  q('I value harmony and try hard to avoid conflict.', F),
  q('I prefer to keep my options open rather than commit to a firm decision.', P),
  q('I enjoy being the center of attention.', E),
  q("I'm more interested in the 'why' behind things than the 'how'.", N),
  q('I enjoy a good debate, even with people I care about.', T),
  q('I prefer to finish one task completely before starting another.', J),
  q('I prefer a few deep friendships over a wide circle of acquaintances.', I),
  q('I learn best by doing, rather than reading or hearing about theory.', S),
  q('When deciding something, I think first about how it will affect people.', F),
  q('I often do my best work right before a deadline.', P),
  q('I think out loud and figure out my ideas by talking them through.', E),
  q('I enjoy exploring new and unconventional ideas.', N),
  q('I believe being fair matters more than being nice.', T),
  q('I feel uneasy when plans change at the last minute.', J),
  q('I usually think carefully before I speak up in a group.', I),
  q('I trust my direct experience more than my hunches.', S),
  q("I'd rather be kind than be right in an argument.", F),
  q('I like to keep my weekends unplanned.', P),
  q('When I feel low, being around friends cheers me up quickly.', E),
  q('I often notice patterns and hidden meanings that others overlook.', N),
  q('When a friend shares a problem, my first instinct is to suggest a solution.', T),
  q('I like to make decisions quickly and get things settled.', J),
  q('Long social events leave me drained, even when I enjoy them.', I),
  q('I prefer clear, step-by-step instructions over vague big-picture guidance.', S),
  q("I'm deeply moved by stories of people who are struggling.", F),
  q('I often start new projects before finishing old ones.', P),
  q("I'd rather go to a party than stay in with a good book or show.", E),
  q('I get more excited about future possibilities than present realities.', N),
  q('I can make tough decisions without getting emotionally caught up.', T),
  q('I use to-do lists or a calendar to keep my life on track.', J),
  q("I'd rather text than call.", I),
  q('I prefer tried-and-tested methods over experimenting with new ones.', S),
  q("I find it hard to criticize someone, even when it's deserved.", F),
  q("I'm comfortable with uncertainty and not knowing what comes next.", P),
];

export const answerOptions = [
  { text: 'Strongly Disagree', value: -2 },
  { text: 'Disagree', value: -1 },
  { text: 'Neutral', value: 0 },
  { text: 'Agree', value: 1 },
  { text: 'Strongly Agree', value: 2 },
];
