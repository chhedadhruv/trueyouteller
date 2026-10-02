import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { PERSONALITY_TYPES } from '../data/personalityTypes';
import { QUIZZES } from '../data/quizzes';
import { getProgress } from '../utils/badges';
import { loadLastResult } from '../utils/storage';
import { axisBreakdown } from '../utils/scoring';
import { buildMeta } from '../utils/seo';
import TradingCard from '../components/TradingCard';
import '../styles/TypePages.css';
import '../styles/Social.css';

export const meta = () =>
  buildMeta({
    title: 'My Personality Card Deck | TrueYouTeller',
    description: 'Collect personality and quiz cards. Rare types are Legendary!',
    path: '/cards',
    noindex: true,
  });

const CardsPage = () => {
  const [collected, setCollected] = useState(null);
  const [last, setLast] = useState(null);

  // Collection lives in the browser, so it is read after mount.
  useEffect(() => {
    const lastResult = loadLastResult();
    const cards = new Set(getProgress('cards'));
    if (lastResult?.type) cards.add(lastResult.type);
    setCollected(cards);
    setLast(lastResult);
  }, []);

  const typeCodes = Object.keys(PERSONALITY_TYPES);
  const quizCards = QUIZZES.flatMap((quiz) =>
    Object.entries(quiz.outcomes).map(([id, outcome]) => ({ key: `${quiz.slug}:${id}`, quiz, outcome }))
  );
  const total = typeCodes.length + quizCards.length;
  const count = collected ? [...collected].filter((key) => typeCodes.includes(key) || key.includes(':')).length : 0;

  return (
    <div className="container section cards-page">
      <h1 className="page-title">My Card Deck</h1>
      <p className="types-intro">
        Every result you get becomes a collectible card. Personality cards are rarer the less common the type is.
        {collected && (
          <>
            {' '}
            You've collected <strong>{count}</strong> of {total}.
          </>
        )}
      </p>
      {collected && count === 0 && (
        <div className="type-cta">
          <p>Your deck is empty! Take the test or a quiz to get your first card.</p>
          <Link to="/test" className="btn btn-primary">Take the Free Test</Link>
        </div>
      )}

      <section aria-labelledby="type-cards">
        <h2 id="type-cards">Personality cards</h2>
        <p>You can unlock other types by retaking the test later; people change!</p>
        <div className="card-grid">
          {typeCodes.map((code) => (
            <TradingCard
              key={code}
              type={PERSONALITY_TYPES[code]}
              locked={!collected?.has(code)}
              breakdown={last?.type === code && last.percentages ? axisBreakdown(code, last.percentages) : null}
            />
          ))}
        </div>
      </section>

      <section aria-labelledby="quiz-cards">
        <h2 id="quiz-cards">Bonus quiz cards</h2>
        <div className="card-grid">
          {quizCards.map(({ key, quiz, outcome }) =>
            collected?.has(key) ? (
              <TradingCard key={key} quizOutcome={outcome} quizTitle={quiz.shortTitle} />
            ) : (
              <Link key={key} to={`/quizzes/${quiz.slug}`} className="card-link" aria-label={`Play ${quiz.shortTitle} to unlock`}>
                <TradingCard quizOutcome={outcome} quizTitle={quiz.shortTitle} locked />
              </Link>
            )
          )}
        </div>
      </section>
    </div>
  );
};

export default CardsPage;
