import React, { useEffect, useState } from 'react';

// Pops up for a few seconds whenever awardBadge() unlocks something new.
const BadgeToast = () => {
  const [badge, setBadge] = useState(null);

  useEffect(() => {
    let timer;
    const onBadge = (e) => {
      setBadge(e.detail);
      clearTimeout(timer);
      timer = setTimeout(() => setBadge(null), 4000);
    };
    window.addEventListener('tyt:badge', onBadge);
    return () => {
      window.removeEventListener('tyt:badge', onBadge);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="badge-toast-region" role="status" aria-live="polite">
      {badge && (
        <div className="badge-toast" key={badge.id}>
          <span className="badge-toast-emoji" aria-hidden="true">{badge.emoji}</span>
          <span>
            <strong>Badge unlocked!</strong>
            <br />
            {badge.name}
          </span>
        </div>
      )}
    </div>
  );
};

export default BadgeToast;
