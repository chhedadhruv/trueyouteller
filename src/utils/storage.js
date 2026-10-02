import { QUESTION_VERSION } from '../data/questions.js';
import { SCENARIO_VERSION } from '../data/scenarios.js';
import { SITE_URL } from './seo.js';
import { encodePercentages } from './scoring.js';

// localStorage can be missing or throw (private mode, blocked storage, SSR),
// so every access is guarded and failures behave like "nothing saved".
const read = (key) => {
  try {
    const raw = globalThis.localStorage?.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const write = (key, value) => {
  try {
    if (value === null) globalThis.localStorage?.removeItem(key);
    else globalThis.localStorage?.setItem(key, JSON.stringify(value));
  } catch {
    // Storage unavailable: the feature degrades to not remembering.
  }
};

const PROGRESS_KEY = 'tyt:test-progress';
const LAST_RESULT_KEY = 'tyt:last-result';

// In-progress test: { mode, version, name, answers, index, invite }
const versionFor = (mode) => (mode === 'scenario' ? SCENARIO_VERSION : QUESTION_VERSION);
export const loadProgress = () => {
  const progress = read(PROGRESS_KEY);
  return progress && progress.version === versionFor(progress.mode) ? progress : null;
};
export const saveProgress = (progress) => write(PROGRESS_KEY, { ...progress, version: versionFor(progress.mode) });
export const clearProgress = () => write(PROGRESS_KEY, null);

// Last completed result: { type, name, percentages, completedAt }
export const loadLastResult = () => read(LAST_RESULT_KEY);
export const saveLastResult = (result) => write(LAST_RESULT_KEY, result);

// Path (and optionally absolute URL) of a result page, e.g. /result/intj?n=Sam&p=62-40-55-30
export const resultPath = ({ type, name, percentages }) => {
  const params = new URLSearchParams();
  if (name) params.set('n', name);
  if (percentages) params.set('p', encodePercentages(percentages));
  const query = params.toString();
  return `/result/${type.toLowerCase()}${query ? `?${query}` : ''}`;
};
export const resultUrl = (result) => `${SITE_URL}${resultPath(result)}`;

// Invite link: a friend who opens it and finishes the test sees their compatibility with the inviter.
export const inviteUrl = ({ type, name }) => {
  const params = new URLSearchParams({ ref: type.toLowerCase() });
  if (name) params.set('rn', name);
  return `${SITE_URL}/test?${params}`;
};

// ---- Social features (mirror, guess, room, duo) ----

// Links this browser created (owner view) or already answered (one entry per friend).
const OWNED_KEY = 'tyt:owned';
const ANSWERED_KEY = 'tyt:answered';

const addTo = (key, kind, id, value = true) => {
  const all = read(key) ?? {};
  write(key, { ...all, [kind]: { ...(all[kind] ?? {}), [id]: value } });
};
const lookup = (key, kind, id) => (read(key) ?? {})[kind]?.[id] ?? null;

export const rememberOwned = (kind, id) => addTo(OWNED_KEY, kind, id);
export const isOwned = (kind, id) => Boolean(lookup(OWNED_KEY, kind, id));
export const rememberAnswer = (kind, id, value) => addTo(ANSWERED_KEY, kind, id, value);
export const getAnswer = (kind, id) => lookup(ANSWERED_KEY, kind, id);

// A friend who opens a room/duo link before having a result takes the test first;
// the result page then offers to finish joining.
const PENDING_KEY = 'tyt:pending-join';
export const setPendingJoin = (pending) => write(PENDING_KEY, pending);
export const getPendingJoin = () => read(PENDING_KEY);
export const clearPendingJoin = () => write(PENDING_KEY, null);
