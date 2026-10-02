import { getFirebaseApp } from '../firebase/config';

// Google Analytics 4 via Firebase. Runs by default in production; visitors can opt
// out via the AnalyticsNotice banner or the privacy page. The SDK loads lazily and
// never during prerendering. Page views come from GA4's enhanced measurement
// ("page changes based on browser history events"), so only custom events are sent here.

const MEASUREMENT_ID = import.meta.env.VITE_FIREBASE_MEASUREMENT_ID;
const DEBUG = import.meta.env.VITE_ANALYTICS_DEBUG === 'true';
const CONSENT_KEY = 'tyt:analytics-consent'; // 'granted' | 'denied' | unset (notice not answered yet)

export const getConsent = () => {
  try {
    return globalThis.localStorage?.getItem(CONSENT_KEY) ?? null;
  } catch {
    return null;
  }
};

const isEnabled = () =>
  typeof window !== 'undefined' && Boolean(MEASUREMENT_ID) && (import.meta.env.PROD || DEBUG) && getConsent() !== 'denied';

let analyticsPromise;

const loadAnalytics = () => {
  analyticsPromise ??= (async () => {
    const { initializeAnalytics, isSupported } = await import('firebase/analytics');
    if (!(await isSupported())) return null;
    const app = await getFirebaseApp();
    return initializeAnalytics(app, { config: DEBUG ? { debug_mode: true } : {} });
  })().catch((error) => {
    console.warn('Analytics unavailable:', error);
    return null;
  });
  return analyticsPromise;
};

// Called once from the root layout after hydration.
export const startAnalytics = () => {
  if (isEnabled()) loadAnalytics();
};

export const setConsent = async (value) => {
  try {
    globalThis.localStorage?.setItem(CONSENT_KEY, value);
  } catch {
    // Not remembered; the choice still applies for this visit.
  }
  if (value === 'granted') {
    startAnalytics();
  } else if (analyticsPromise) {
    const analytics = await analyticsPromise;
    if (analytics) {
      const { setAnalyticsCollectionEnabled } = await import('firebase/analytics');
      setAnalyticsCollectionEnabled(analytics, false);
    }
  }
};

// Fire-and-forget custom event. Param values must be strings or numbers.
export const track = (name, params = {}) => {
  if (!isEnabled()) return;
  loadAnalytics().then(async (analytics) => {
    if (!analytics || getConsent() === 'denied') return;
    const { logEvent } = await import('firebase/analytics');
    logEvent(analytics, name, params);
  });
};
