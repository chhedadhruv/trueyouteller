import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { createShared } from '../firebase/social';
import { loadLastResult, rememberOwned } from '../utils/storage';
import { track } from '../utils/analytics';
import { breadcrumbJsonLd, buildMeta } from '../utils/seo';
import Breadcrumbs from '../components/Breadcrumbs';
import '../styles/TypePages.css';
import '../styles/Social.css';

const CRUMBS = [
  { name: 'Home', path: '/' },
  { name: 'Play with Friends', path: '/play' },
];

export const meta = () =>
  buildMeta({
    title: 'Personality Games to Play with Friends | TrueYouTeller',
    description:
      'Find out how your friends really see you, let them guess your personality type, compare as a couple or best friends, and map your whole group\'s personalities.',
    path: '/play',
    jsonLd: [breadcrumbJsonLd(CRUMBS)],
  });

const ROOM_EMOJIS = ['🏠', '🎓', '💼', '⚽', '🎮', '🍕', '✈️', '💜'];

const PlayHubPage = () => {
  const navigate = useNavigate();
  const [last, setLast] = useState(null);
  const [busy, setBusy] = useState('');
  const [error, setError] = useState('');
  const [roomName, setRoomName] = useState('');
  const [roomEmoji, setRoomEmoji] = useState(ROOM_EMOJIS[0]);

  useEffect(() => setLast(loadLastResult()), []);

  const create = async (kind, data, path) => {
    setBusy(kind);
    setError('');
    try {
      const id = await createShared(kind, data);
      rememberOwned(kind, id);
      track('social_create', { kind });
      navigate(`/${path}/${id}`);
    } catch (err) {
      console.error(err);
      setError('Sorry, something went wrong. Please try again in a moment.');
      setBusy('');
    }
  };

  const needsResult = !last?.type;
  const owner = last && { ownerName: last.name || 'Me', ownerType: last.type };

  const ResultGate = () => (
    <p className="play-gate">
      <Link to="/test">Take the test first</Link> so we know your type.
    </p>
  );

  return (
    <div className="container section play-hub">
      <Breadcrumbs items={CRUMBS} />
      <h1 className="page-title">Play with Friends</h1>
      <p className="types-intro">
        Personality is more fun together. Start a game below and send the link to your friends, family or partner. No
        sign-up needed.
      </p>
      {error && <p className="form-error" role="alert">{error}</p>}

      <div className="play-grid">
        <section className="play-card" aria-labelledby="play-mirror">
          <span className="play-emoji" aria-hidden="true">🪞</span>
          <h2 id="play-mirror">How others see you</h2>
          <p>Friends answer 16 quick questions about you, anonymously. See where they agree with you, and where they don't.</p>
          {needsResult ? (
            <ResultGate />
          ) : (
            <button
              type="button"
              className="btn btn-primary"
              disabled={Boolean(busy)}
              onClick={() =>
                create('mirrors', { ...owner, ownerPercentages: last.percentages ?? { IE: 50, SN: 50, TF: 50, JP: 50 } }, 'mirror')
              }
            >
              {busy === 'mirrors' ? 'Creating…' : 'Create my mirror link'}
            </button>
          )}
        </section>

        <section className="play-card" aria-labelledby="play-guess">
          <span className="play-emoji" aria-hidden="true">🤔</span>
          <h2 id="play-guess">Guess my type</h2>
          <p>Can your friends guess your four letters? Find out who knows you best on the leaderboard.</p>
          {needsResult ? (
            <ResultGate />
          ) : (
            <button type="button" className="btn btn-primary" disabled={Boolean(busy)} onClick={() => create('guesses', owner, 'guess')}>
              {busy === 'guesses' ? 'Creating…' : 'Start a guessing game'}
            </button>
          )}
        </section>

        <section className="play-card" aria-labelledby="play-duo">
          <span className="play-emoji" aria-hidden="true">💞</span>
          <h2 id="play-duo">Couple or BFF report</h2>
          <p>Send one link to your partner or best friend and get a joint report: how you fight, make up, plan and have fun.</p>
          {needsResult ? (
            <ResultGate />
          ) : (
            <div className="play-buttons">
              {[
                ['couple', '💑 Couple'],
                ['bestie', '👯 Best friends'],
              ].map(([mode, label]) => (
                <button
                  key={mode}
                  type="button"
                  className="btn btn-primary"
                  disabled={Boolean(busy)}
                  onClick={() => create('duos', { mode, aName: owner.ownerName, aType: owner.ownerType }, 'duo')}
                >
                  {busy === 'duos' ? 'Creating…' : label}
                </button>
              ))}
            </div>
          )}
        </section>

        <section className="play-card" aria-labelledby="play-room">
          <span className="play-emoji" aria-hidden="true">👨‍👩‍👧‍👦</span>
          <h2 id="play-room">Group room</h2>
          <p>Family, class, team or friend group: everyone joins with their type and you get a group personality map.</p>
          <form
            className="room-form"
            onSubmit={(e) => {
              e.preventDefault();
              if (roomName.trim()) create('rooms', { name: roomName.trim().slice(0, 40), emoji: roomEmoji }, 'room');
            }}
          >
            <label htmlFor="room-name">Room name</label>
            <input
              id="room-name"
              value={roomName}
              maxLength={40}
              onChange={(e) => setRoomName(e.target.value)}
              placeholder="e.g. The Sharma Family"
            />
            <div className="emoji-picker" role="radiogroup" aria-label="Room emoji">
              {ROOM_EMOJIS.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  role="radio"
                  aria-checked={roomEmoji === emoji}
                  className={roomEmoji === emoji ? 'selected' : ''}
                  onClick={() => setRoomEmoji(emoji)}
                >
                  {emoji}
                </button>
              ))}
            </div>
            <button type="submit" className="btn btn-primary" disabled={!roomName.trim() || Boolean(busy)}>
              {busy === 'rooms' ? 'Creating…' : 'Create room'}
            </button>
          </form>
        </section>
      </div>

      <p className="play-privacy">
        Anyone with a link can see what was shared in it, so only send links to people you trust. Mirror ratings never
        include names. <Link to="/privacy">Privacy policy</Link>
      </p>
    </div>
  );
};

export default PlayHubPage;
