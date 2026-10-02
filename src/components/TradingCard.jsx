import React from 'react';
import { getAnimalImage } from '../utils/images';
import { rarityFor, BONUS_TIER } from '../data/typeRarity';
import '../styles/Cards.css';

// Collectible card. Either a personality type card (type + optional axis breakdown)
// or a bonus card for a mini-quiz outcome. `locked` renders a mystery silhouette.
const TradingCard = ({ type, breakdown, quizOutcome, quizTitle, locked = false }) => {
  if (type) {
    const rarity = rarityFor(type.code);
    return (
      <article className={`trading-card tier-${rarity.id} ${locked ? 'is-locked' : ''}`} aria-label={locked ? `Locked card, ${rarity.label}` : `${type.code} card, ${rarity.label}`}>
        <header className="trading-card-top">
          <span className="trading-card-rarity">{rarity.emoji} {rarity.label}</span>
          <span className="trading-card-percent">{rarity.percent}% of people</span>
        </header>
        <div className="trading-card-art">
          {locked ? (
            <span className="trading-card-mystery" aria-hidden="true">?</span>
          ) : (
            <img src={getAnimalImage(type.spiritAnimal)} alt="" loading="lazy" width="200" height="200" />
          )}
        </div>
        <div className="trading-card-body">
          <span className="trading-card-code">{locked ? '????' : type.code}</span>
          <span className="trading-card-name">{locked ? 'Undiscovered type' : type.name}</span>
          {!locked && breakdown && (
            <ul className="trading-card-stats">
              {breakdown.map((row) => (
                <li key={row.axis}>
                  <span>{row.letter}</span>
                  <span className="trading-card-bar">
                    <span style={{ width: `${row.strength}%` }} />
                  </span>
                  <span>{row.strength}</span>
                </li>
              ))}
            </ul>
          )}
          {!locked && !breakdown && <span className="trading-card-animal">{type.spiritAnimal}</span>}
        </div>
      </article>
    );
  }

  return (
    <article className={`trading-card tier-${BONUS_TIER.id} ${locked ? 'is-locked' : ''}`} aria-label={locked ? 'Locked bonus card' : `${quizOutcome.name} bonus card`}>
      <header className="trading-card-top">
        <span className="trading-card-rarity">{BONUS_TIER.emoji} {BONUS_TIER.label}</span>
      </header>
      <div className="trading-card-art">
        <span className={locked ? 'trading-card-mystery' : 'trading-card-emoji'} aria-hidden="true">
          {locked ? '?' : quizOutcome.emoji}
        </span>
      </div>
      <div className="trading-card-body">
        <span className="trading-card-code trading-card-code-small">{locked ? '???' : quizOutcome.name}</span>
        <span className="trading-card-name">{quizTitle}</span>
      </div>
    </article>
  );
};

export default TradingCard;
