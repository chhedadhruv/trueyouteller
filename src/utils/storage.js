import { QUESTION_VERSION } from '../data/questions.js';
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

// In-progress test: { version, name, answers, index }
export const loadProgress = () => {
  const progress = read(PROGRESS_KEY);
  return progress?.version === QUESTION_VERSION ? progress : null;
};
export const saveProgress = (progress) => write(PROGRESS_KEY, { ...progress, version: QUESTION_VERSION });
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
