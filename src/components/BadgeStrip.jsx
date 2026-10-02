import React, { useEffect, useState } from 'react';
import { BADGES, loadBadges } from '../utils/badges';

// "Your badges" strip on the home page. Badges live in the browser, so this renders after mount.
const BadgeStrip = () => {
  const [owned, setOwned] = useState(null);

  useEffect(() => {
    setOwned(loadBadges());
    const onBadge = () => setOwned(loadBadges());
    window.addEventListener('tyt:badge', onBadge);
    return () => window.removeEventListener('tyt:badge', onBadge);
  }, []);

  if (!owned) return null;

  return (
    <section className="container badge-strip" aria-labelledby="badges-heading">
      <h2 id="badges-heading">
        Your badges <span className="badge-count">{owned.length}/{BADGES.length}</span>
      </h2>
      <ul className="badge-list">
        {BADGES.map((badge) => {
          const unlocked = owned.includes(badge.id);
          return (
            <li key={badge.id} className={`badge ${unlocked ? 'badge-unlocked' : 'badge-locked'}`}>
              <span className="badge-emoji" aria-hidden="true">{badge.emoji}</span>
              <span className="badge-name">{badge.name}</span>
              <span className="badge-hint">{unlocked ? 'Unlocked!' : badge.hint}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default BadgeStrip;
