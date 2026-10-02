// Group room roles and character twins, derived from each member's type.

// First matching rule wins, so more specific roles come first.
export const ROLES = [
  { id: 'planner', emoji: '📋', name: 'The Planner', blurb: 'Keeps the group organized and on time.', match: (t) => t.endsWith('TJ') },
  { id: 'heart', emoji: '💗', name: 'The Heart', blurb: 'Notices how everyone is feeling and keeps the peace.', match: (t) => t[1] === 'S' && t[2] === 'F' && t[3] === 'J' },
  { id: 'spark', emoji: '✨', name: 'The Spark', blurb: 'Brings the energy and the spontaneous plans.', match: (t) => t[0] === 'E' && t[3] === 'P' },
  { id: 'visionary', emoji: '🔭', name: 'The Visionary', blurb: 'Dreams up the big ideas.', match: (t) => t[1] === 'N' && t[3] === 'P' },
  { id: 'mentor', emoji: '🌱', name: 'The Mentor', blurb: 'Encourages everyone to grow.', match: (t) => t[1] === 'N' && t[2] === 'F' },
  { id: 'fixer', emoji: '🛠️', name: 'The Fixer', blurb: 'Calmly solves practical problems.', match: (t) => t[1] === 'S' && t[3] === 'P' },
  { id: 'anchor', emoji: '⚓', name: 'The Anchor', blurb: 'Steady, loyal and reliable.', match: () => true },
];

export const roleFor = (type) => ROLES.find((role) => role.match(type));

// Temperaments: if one is missing, the group has a blind spot.
export const TEMPERAMENTS = [
  { id: 'NT', name: 'Analysts', emoji: '🧠', test: (t) => t[1] === 'N' && t[2] === 'T', gap: 'Nobody loves picking apart a plan for flaws. Double-check big decisions.' },
  { id: 'NF', name: 'Diplomats', emoji: '🕊️', test: (t) => t[1] === 'N' && t[2] === 'F', gap: 'Nobody is the natural feelings-checker. Ask how people are really doing.' },
  { id: 'SJ', name: 'Sentinels', emoji: '🛡️', test: (t) => t[1] === 'S' && t[3] === 'J', gap: 'Nobody naturally handles logistics. Assign who books, pays and reminds.' },
  { id: 'SP', name: 'Explorers', emoji: '🏄', test: (t) => t[1] === 'S' && t[3] === 'P', gap: 'Nobody pushes for spontaneous fun. Plan a "say yes" day.' },
];

// Character twins by type (fun approximations, not canon).
export const FRIENDS_TWIN = {
  ESFJ: 'Monica', ENFJ: 'Monica', ISTJ: 'Monica', ESTJ: 'Monica',
  ENTP: 'Chandler', INTP: 'Chandler', ISTP: 'Chandler',
  ENFP: 'Phoebe', INFP: 'Phoebe', ISFP: 'Phoebe',
  INTJ: 'Ross', INFJ: 'Ross', ISFJ: 'Ross',
  ESFP: 'Rachel', ENTJ: 'Rachel',
  ESTP: 'Joey',
};

export const AVENGERS_TWIN = {
  ENTP: 'Iron Man', ENTJ: 'Iron Man', INTJ: 'Doctor Strange',
  ISTJ: 'Captain America', ISFJ: 'Captain America', ESTJ: 'Nick Fury',
  ESFP: 'Thor', ESTP: 'Thor', ENFJ: 'Thor',
  ISTP: 'Black Widow', INFJ: 'Black Widow',
  ENFP: 'Spider-Man', ISFP: 'Spider-Man', ESFJ: 'Spider-Man',
  INTP: 'Hulk', INFP: 'Hulk',
};
