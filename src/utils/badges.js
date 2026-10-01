import { track } from './analytics';

// Fun, browser-only achievements. Stored in localStorage; unlocking one fires a
// "tyt:badge" window event that the BadgeToast component shows.
export const BADGES = [
  { id: 'first-test', emoji: '🔮', name: 'Crystal Gazer', hint: 'Finish the personality test' },
  { id: 'quiz-rookie', emoji: '🎯', name: 'Quiz Rookie', hint: 'Finish any mini-quiz' },
  { id: 'quiz-master', emoji: '🏆', name: 'Quiz Master', hint: 'Finish every mini-quiz' },
  { id: 'sharer', emoji: '🦋', name: 'Social Butterfly', hint: 'Share a result' },
  { id: 'matchmaker', emoji: '💞', name: 'Matchmaker', hint: 'Check a compatibility' },
  { id: 'inviter', emoji: '🧲', name: 'Friend Magnet', hint: 'Invite a friend to compare' },
  { id: 'explorer', emoji: '🧭', name: 'Type Explorer', hint: 'Read about 5 personality types' },
  { id: 'night-owl', emoji: '🦉', name: 'Night Owl', hint: 'Switch on dark mode' },
];

const KEY = 'tyt:badges';
const PROGRESS_KEY = 'tyt:badge-progress';

const read = (key, fallback) => {
  try {
    return JSON.parse(globalThis.localStorage?.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
};

const write = (key, value) => {
  try {
    globalThis.localStorage?.setItem(key, JSON.stringify(value));
  } catch {
    // Storage unavailable: badges just aren't remembered.
  }
};

export const loadBadges = () => read(KEY, []);

export const awardBadge = (id) => {
  const owned = loadBadges();
  if (owned.includes(id)) return;
  write(KEY, [...owned, id]);
  track('unlock_achievement', { achievement_id: id });
  const badge = BADGES.find((b) => b.id === id);
  if (badge && typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('tyt:badge', { detail: badge }));
  }
};

// Adds `value` to a named set (e.g. quizzes finished) and returns the set's size.
export const trackProgress = (name, value) => {
  const progress = read(PROGRESS_KEY, {});
  const items = new Set(progress[name] ?? []);
  items.add(value);
  write(PROGRESS_KEY, { ...progress, [name]: [...items] });
  return items.size;
};
