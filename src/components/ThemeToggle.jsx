import React, { useEffect, useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { awardBadge } from '../utils/badges';
import { track } from '../utils/analytics';

export const THEME_KEY = 'tyt:theme';

// Runs in <head> before first paint so a saved or system dark theme never flashes light.
export const themeInitScript = `(function(){try{var t=localStorage.getItem('${THEME_KEY}');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.dataset.theme=t}catch(e){}})();`;

const ThemeToggle = () => {
  const [theme, setTheme] = useState(null);

  useEffect(() => setTheme(document.documentElement.dataset.theme || 'light'), []);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      // Not remembered, but still switches for this visit.
    }
    setTheme(next);
    track('theme_change', { theme: next });
    if (next === 'dark') awardBadge('night-owl');
  };

  const isDark = theme === 'dark';
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
    >
      {isDark ? <FaSun aria-hidden="true" /> : <FaMoon aria-hidden="true" />}
    </button>
  );
};

export default ThemeToggle;
