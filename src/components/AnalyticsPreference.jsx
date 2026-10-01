import React, { useEffect, useState } from 'react';
import { getConsent, setConsent } from '../utils/analytics';

// Opt-out / opt-in switch for the privacy page.
const AnalyticsPreference = () => {
  const [consent, setConsentState] = useState(null);

  useEffect(() => setConsentState(getConsent() ?? 'granted'), []);

  if (!consent) return null;

  const optedOut = consent === 'denied';
  const toggle = () => {
    const next = optedOut ? 'granted' : 'denied';
    setConsent(next);
    setConsentState(next);
  };

  return (
    <p className="analytics-preference" role="status">
      Analytics is currently <strong>{optedOut ? 'off' : 'on'}</strong> for this browser.{' '}
      <button type="button" className="btn" onClick={toggle}>
        {optedOut ? 'Turn analytics on' : 'Opt out of analytics'}
      </button>
    </p>
  );
};

export default AnalyticsPreference;
