import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { PERSONALITY_TYPES } from '../data/personalityTypes';
import { addEntry } from '../firebase/social';
import { AXES } from '../utils/scoring';
import { getAnswer, isOwned, rememberAnswer } from '../utils/storage';
import { useEntries, useSharedDoc } from '../utils/useShared';
import { track } from '../utils/analytics';
import { buildMeta, SITE_URL } from '../utils/seo';
import ShareLinkBox from '../components/ShareLinkBox';
import SocialStatus from '../components/SocialStatus';
import '../styles/Social.css';

export const meta = () =>
  buildMeta({
    title: 'Can you guess my personality type? | TrueYouTeller',
    description: 'Guess your friend\'s four-letter personality type and see who knows them best.',
    path: '/play',
    noindex: true,
  });

const LETTER_NAMES = {
  I: 'Introvert', E: 'Extravert', S: 'Observant', N: 'Intuitive',
  T: 'Thinker', F: 'Feeler', J: 'Planner', P: 'Free spirit',
};

const matches = (guess, actual) => [...guess].filter((letter, i) => letter === actual[i]).length;

const VERDICTS = ['Total stranger 🙈', 'Just met? 🤷', 'Getting there 🙂', 'So close! 🔥', 'Soulmate level! 🎯'];

const Leaderboard = ({ entries, ownerType }) => {
  const ranked = [...entries]
    .map((e) => ({ ...e, score: matches(e.guess, ownerType) }))
    .sort((a, b) => b.score - a.score);
  if (!ranked.length) return <p>No guesses yet. Be patient, or nudge your friends!</p>;
  return (
    <ol className="leaderboard">
      {ranked.map((entry, i) => (
        <li key={entry.id}>
          <span className="leaderboard-rank">{i === 0 ? '👑' : i + 1}</span>
          <span className="leaderboard-name">{entry.name}</span>
          <span className="leaderboard-guess">{entry.guess}</span>
          <span className="leaderboard-score">{entry.score}/4</span>
        </li>
      ))}
    </ol>
  );
};

const GuessForm = ({ ownerName, onSubmit, busy }) => {
  const [name, setName] = useState('');
  const [letters, setLetters] = useState({});
  const guess = Object.keys(AXES).map((axis) => letters[axis] ?? '').join('');
  const complete = guess.length === 4 && name.trim();

  return (
    <form
      className="social-panel guess-form"
      onSubmit={(e) => {
        e.preventDefault();
        if (complete) onSubmit({ name: name.trim().slice(0, 30), guess });
      }}
    >
      <label htmlFor="guess-name">Your name</label>
      <input id="guess-name" value={name} maxLength={30} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
      <p className="guess-help">Pick one letter from each pair. What is {ownerName} really like?</p>
      {Object.entries(AXES).map(([axis, pair]) => (
        <div key={axis} className="guess-pair" role="radiogroup" aria-label={`${pair[0]} or ${pair[1]}`}>
          {pair.map((letter) => (
            <button
              key={letter}
              type="button"
              role="radio"
              aria-checked={letters[axis] === letter}
              className={`guess-letter ${letters[axis] === letter ? 'selected' : ''}`}
              onClick={() => setLetters({ ...letters, [axis]: letter })}
            >
              <span className="guess-letter-big">{letter}</span>
              <span>{LETTER_NAMES[letter]}</span>
            </button>
          ))}
        </div>
      ))}
      <button type="submit" className="btn btn-primary" disabled={!complete || busy}>
        {busy ? 'Sending…' : guess.length === 4 ? `Lock in ${guess}` : 'Pick all four letters'}
      </button>
    </form>
  );
};

const GuessPage = () => {
  const { id } = useParams();
  const { status, doc: game } = useSharedDoc('guesses', id);
  const entries = useEntries('guesses', id, 'entries', status === 'ready');
  const [owner, setOwner] = useState(false);
  const [myGuess, setMyGuess] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setOwner(isOwned('guesses', id));
    setMyGuess(getAnswer('guesses', id));
  }, [id]);

  if (status !== 'ready') return <SocialStatus status={status} what="game" />;

  const submit = async (entry) => {
    setBusy(true);
    setError('');
    try {
      await addEntry('guesses', id, 'entries', entry);
      rememberAnswer('guesses', id, entry.guess);
      track('social_answer', { kind: 'guesses', score: matches(entry.guess, game.ownerType) });
      setMyGuess(entry.guess);
    } catch (err) {
      console.error(err);
      setError('Could not send your guess. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="container section social-page">
      <span className="play-emoji" aria-hidden="true">🤔</span>
      <h1 className="page-title">{owner ? 'Who knows you best?' : `Guess ${game.ownerName}'s personality type`}</h1>

      {owner ? (
        <>
          <p className="types-intro">Send this link to friends. They guess your four letters, and the closest wins.</p>
          <ShareLinkBox
            url={`${SITE_URL}/guess/${id}`}
            kind="guesses"
            title="Guess my personality type"
            text="Can you guess my personality type? 🤔 Let's see who knows me best!"
          />
          <div className="social-panel">
            <h2>Leaderboard</h2>
            {entries ? <Leaderboard entries={entries} ownerType={game.ownerType} /> : <p>Loading…</p>}
          </div>
        </>
      ) : myGuess ? (
        <div className="social-panel guess-reveal">
          <p className="result-kicker">You guessed {myGuess}</p>
          <h2>
            {game.ownerName} is {game.ownerType} ({PERSONALITY_TYPES[game.ownerType].name})!
          </h2>
          <p className="guess-score">
            {matches(myGuess, game.ownerType)}/4 letters · {VERDICTS[matches(myGuess, game.ownerType)]}
          </p>
          <h3>Leaderboard</h3>
          {entries ? <Leaderboard entries={entries} ownerType={game.ownerType} /> : <p>Loading…</p>}
          <p>Now find out your own type, and start a game for your friends.</p>
          <Link to="/test" className="btn btn-primary">Take the free test</Link>
        </div>
      ) : (
        <>
          {error && <p className="form-error" role="alert">{error}</p>}
          <GuessForm ownerName={game.ownerName} onSubmit={submit} busy={busy} />
        </>
      )}
    </div>
  );
};

export default GuessPage;
