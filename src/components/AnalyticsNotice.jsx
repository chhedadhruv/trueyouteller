import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { getConsent, setConsent, startAnalytics } from '../utils/analytics';

// Small dismissible notice: analytics runs by default, visitors can opt out here
// or later on the privacy page. Renders after mount (consent lives in the browser).
const AnalyticsNotice = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(getConsent() === null);
    const start = () => startAnalytics();
    if ('requestIdleCallback' in window) window.requestIdleCallback(start, { timeout: 4000 });
    else setTimeout(start, 2000);
  }, []);

  if (!visible) return null;

  const choose = (value) => {
    setConsent(value);
    setVisible(false);
  };

  return (
    <div className="analytics-notice" role="region" aria-label="Analytics notice">
      <p>
        🍪 We use Google Analytics to see which quizzes people love and improve the site. No ads, no selling data.{' '}
        <Link to="/privacy">Read our privacy policy</Link>
      </p>
      <div className="analytics-notice-buttons">
        <button type="button" className="btn btn-primary" onClick={() => choose('granted')}>
          OK
        </button>
        <button type="button" className="btn" onClick={() => choose('denied')}>
          No thanks
        </button>
      </div>
    </div>
  );
};

export default AnalyticsNotice;
