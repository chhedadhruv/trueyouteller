import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router';
import { MIRROR_MIN_RATINGS, MIRROR_QUESTIONS } from '../data/mirrorQuestions';
import { answerOptions } from '../data/questions';
import { PERSONALITY_TYPES } from '../data/personalityTypes';
import { addEntry } from '../firebase/social';
import { AXES, scoreAnswers } from '../utils/scoring';
import { getAnswer, isOwned, rememberAnswer } from '../utils/storage';
import { useEntries, useSharedDoc } from '../utils/useShared';
import { track } from '../utils/analytics';
import { buildMeta, SITE_URL } from '../utils/seo';
import ShareLinkBox from '../components/ShareLinkBox';
import SocialStatus from '../components/SocialStatus';
import '../styles/Social.css';

export const meta = () =>
  buildMeta({
    title: 'How do your friends see you? | TrueYouTeller',
    description: 'Answer 16 quick questions about your friend. Anonymous, fun, and they will find out how the world sees them.',
    path: '/play',
    noindex: true,
  });

const LETTER_NAMES = {
  I: 'Introverted', E: 'Extraverted', S: 'Observant', N: 'Intuitive',
  T: 'Thinking', F: 'Feeling', J: 'Judging', P: 'Prospecting',
};

// Average the friends' per-axis percentages, then pick letters (ties keep the owner's letter).
const friendsView = (ratings, ownerType) => {
  const scored = ratings.map((r) => scoreAnswers(r.answers, MIRROR_QUESTIONS).percentages);
  const average = Object.fromEntries(
    Object.keys(AXES).map((axis) => [axis, Math.round(scored.reduce((sum, p) => sum + p[axis], 0) / scored.length)])
  );
  const type = Object.entries(AXES)
    .map(([axis, [low, high]], i) => (average[axis] > 50 ? high : average[axis] < 50 ? low : ownerType[i]))
    .join('');
  return { average, type };
};

const RatingForm = ({ ownerName, onSubmit, busy }) => {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState(() => Array(MIRROR_QUESTIONS.length).fill(null));
  const question = MIRROR_QUESTIONS[index];

  const choose = (value) => {
    const next = [...answers];
    next[index] = value;
    setAnswers(next);
    if (index < MIRROR_QUESTIONS.length - 1) setIndex(index + 1);
    else onSubmit(next);
  };

  return (
    <div className="social-panel">
      <div
        className="progress-bar-container"
        role="progressbar"
        aria-label="Progress"
        aria-valuemin={0}
        aria-valuemax={MIRROR_QUESTIONS.length}
        aria-valuenow={index}
      >
        <div className="progress-bar" style={{ width: `${(index / MIRROR_QUESTIONS.length) * 100}%` }} />
      </div>
      <p className="quiz-counter">
        {index + 1} of {MIRROR_QUESTIONS.length}
      </p>
      <h2 className="mirror-statement" aria-live="polite">
        {question.statement.replace('{name}', ownerName)}
      </h2>
      <div className="likert-row" role="group" aria-label="How true is this?">
        {answerOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            className={`btn ${answers[index] === option.value ? 'btn-primary' : ''}`}
            disabled={busy}
            onClick={() => choose(option.value)}
          >
            {option.text}
          </button>
        ))}
      </div>
      {index > 0 && (
        <button type="button" className="btn quiz-back" onClick={() => setIndex(index - 1)}>
          ← Back
        </button>
      )}
    </div>
  );
};

const MirrorResults = ({ mirror, ratings }) => {
  const { average, type } = useMemo(() => friendsView(ratings, mirror.ownerType), [ratings, mirror.ownerType]);
  const self = mirror.ownerPercentages;
  const gaps = Object.keys(AXES).map((axis) => ({ axis, gap: Math.abs(average[axis] - self[axis]) }));
  const biggest = gaps.sort((a, b) => b.gap - a.gap)[0];
  const [low, high] = AXES[biggest.axis];
  // Which way friends' view differs from yours: higher % means more of the second letter.
  const friendsLean = average[biggest.axis] > self[biggest.axis] ? high : low;

  return (
    <div className="social-panel">
      <h2>What your friends think</h2>
      <p className="mirror-summary">
        You see yourself as <strong>{mirror.ownerType}</strong>. Your friends see you as{' '}
        <strong>
          {type} ({PERSONALITY_TYPES[type].name})
        </strong>
        {type === mirror.ownerType ? '. You know yourself well! 🎯' : '. Interesting! 👀'}
      </p>
      <div className="mirror-bars">
        {Object.entries(AXES).map(([axis, [l, h]]) => (
          <div className="mirror-axis" key={axis}>
            <div className="axis-labels">
              <span>{LETTER_NAMES[l]}</span>
              <span>{LETTER_NAMES[h]}</span>
            </div>
            <div className="mirror-track">
              <span className="mirror-marker mirror-self" style={{ left: `${self[axis]}%` }} title="You">
                You
              </span>
              <span className="mirror-marker mirror-friends" style={{ left: `${average[axis]}%` }} title="Friends">
                Friends
              </span>
            </div>
          </div>
        ))}
      </div>
      {biggest.gap >= 10 && (
        <p className="mirror-gap">
          Biggest surprise: your friends see you as more <strong>{LETTER_NAMES[friendsLean].toLowerCase()}</strong> than
          you think ({biggest.gap} points apart).
        </p>
      )}
      <p className="play-privacy">Based on {ratings.length} anonymous ratings. More ratings make it more accurate.</p>
    </div>
  );
};

const MirrorPage = () => {
  const { id } = useParams();
  const { status, doc: mirror } = useSharedDoc('mirrors', id);
  const ratings = useEntries('mirrors', id, 'ratings', status === 'ready');
  const [owner, setOwner] = useState(false);
  const [rated, setRated] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setOwner(isOwned('mirrors', id));
    setRated(Boolean(getAnswer('mirrors', id)));
  }, [id]);

  if (status !== 'ready') return <SocialStatus status={status} what="mirror" />;

  const url = `${SITE_URL}/mirror/${id}`;
  const count = ratings?.length ?? 0;

  const submit = async (answers) => {
    setBusy(true);
    setError('');
    try {
      await addEntry('mirrors', id, 'ratings', { answers });
      rememberAnswer('mirrors', id, true);
      track('social_answer', { kind: 'mirrors' });
      setRated(true);
    } catch (err) {
      console.error(err);
      setError('Could not save your answers. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="container section social-page">
      <span className="play-emoji" aria-hidden="true">🪞</span>
      <h1 className="page-title">
        {owner ? 'How do your friends see you?' : `How do you see ${mirror.ownerName}?`}
      </h1>

      {owner ? (
        <>
          <p className="types-intro">
            Send this link to friends. They answer 16 quick statements about you, anonymously. Results unlock after{' '}
            {MIRROR_MIN_RATINGS} friends answer.
          </p>
          <ShareLinkBox
            url={url}
            kind="mirrors"
            title="How do you see me?"
            text={`How well do you know me? Answer 16 quick questions about me (it's anonymous!) 🪞`}
          />
          {ratings === null ? (
            <p>Loading ratings…</p>
          ) : count >= MIRROR_MIN_RATINGS ? (
            <MirrorResults mirror={mirror} ratings={ratings} />
          ) : (
            <p className="mirror-waiting">
              {count} of {MIRROR_MIN_RATINGS} friends have answered so far. Results unlock at {MIRROR_MIN_RATINGS} to keep
              ratings anonymous.
            </p>
          )}
        </>
      ) : rated ? (
        <div className="social-panel">
          <h2>Thanks! 💜</h2>
          <p>Your anonymous answers were sent to {mirror.ownerName}.</p>
          <p>Curious what your own type is?</p>
          <Link to="/test" className="btn btn-primary">Take the free personality test</Link>
        </div>
      ) : (
        <>
          <p className="types-intro">
            {mirror.ownerName} wants to know how friends see them. Rate 16 statements. Your answers are anonymous.
          </p>
          {error && <p className="form-error" role="alert">{error}</p>}
          <RatingForm ownerName={mirror.ownerName} onSubmit={submit} busy={busy} />
        </>
      )}
    </div>
  );
};

export default MirrorPage;
