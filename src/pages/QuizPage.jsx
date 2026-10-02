import React, { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { FaWhatsapp, FaXTwitter, FaLink, FaShareNodes } from 'react-icons/fa6';
import { getQuiz, QUIZZES } from '../data/quizzes';
import { scoreQuiz } from '../utils/quizEngine';
import { awardBadge, trackProgress } from '../utils/badges';
import { track } from '../utils/analytics';
import { copyText, nativeShare, shareLinks } from '../utils/share';
import { breadcrumbJsonLd, buildMeta, SITE_URL } from '../utils/seo';
import Breadcrumbs from '../components/Breadcrumbs';
import QuizCard from '../components/QuizCard';
import '../styles/TypePages.css';
import '../styles/Quiz.css';

const crumbsFor = (quiz) => [
  { name: 'Home', path: '/' },
  { name: 'Fun Quizzes', path: '/quizzes' },
  { name: quiz.shortTitle, path: `/quizzes/${quiz.slug}` },
];

export const meta = ({ params }) => {
  const quiz = getQuiz(params.slug);
  if (!quiz) return [{ title: 'Quiz Not Found | TrueYouTeller' }, { name: 'robots', content: 'noindex' }];
  const path = `/quizzes/${quiz.slug}`;
  return buildMeta({
    title: `${quiz.title} | Free Quiz | TrueYouTeller`,
    description: quiz.seoDescription,
    path,
    image: `${SITE_URL}/og/quiz-${quiz.slug}.png`,
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Quiz',
        name: quiz.title,
        description: quiz.seoDescription,
        url: `${SITE_URL}${path}`,
        isAccessibleForFree: true,
      },
      breadcrumbJsonLd(crumbsFor(quiz)),
    ],
  });
};

const OutcomeSections = ({ outcome }) =>
  outcome.sections.map((section) => (
    <section key={section.title} className="quiz-result-section">
      <h3>{section.title}</h3>
      {section.text && <p>{section.text}</p>}
      {section.list && (
        <ul className="quiz-result-list">
          {section.list.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
      {section.cards && (
        <div className="quiz-result-cards">
          {section.cards.map((card) => (
            <div key={card.name} className="quiz-result-card">
              <strong>{card.name}</strong>
              <p>{card.text}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  ));

const QuizShare = ({ quiz, outcomeId, outcome }) => {
  const [status, setStatus] = useState('');
  const [canNativeShare, setCanNativeShare] = useState(false);
  useEffect(() => setCanNativeShare(typeof navigator.share === 'function'), []);

  const url = `${SITE_URL}/quizzes/${quiz.slug}?r=${outcomeId}`;
  const text = `${outcome.sharePhrase ?? `I got ${outcome.name}!`} ${quiz.title}`;
  const links = shareLinks({ text, url });

  const shared = (method) => {
    awardBadge('sharer');
    track('share', { method, content_type: 'quiz_result', item_id: `${quiz.slug}:${outcomeId}` });
  };
  const handleNative = async () => {
    await nativeShare({ title: quiz.title, text, url });
    shared('native');
  };
  const handleCopy = async () => {
    const ok = await copyText(url);
    setStatus(ok ? 'Link copied!' : 'Could not copy the link.');
    if (ok) shared('copy_link');
  };

  return (
    <div className="quiz-share">
      <div className="share-buttons">
        {canNativeShare && (
          <button type="button" className="btn btn-primary share-btn" onClick={handleNative}>
            <FaShareNodes aria-hidden="true" /> Share
          </button>
        )}
        <a className="btn share-btn" href={links.whatsapp} target="_blank" rel="noopener noreferrer" onClick={() => shared('whatsapp')}>
          <FaWhatsapp aria-hidden="true" /> WhatsApp
        </a>
        <a className="btn share-btn" href={links.x} target="_blank" rel="noopener noreferrer" onClick={() => shared('x')}>
          <FaXTwitter aria-hidden="true" /> X
        </a>
        <button type="button" className="btn share-btn" onClick={handleCopy}>
          <FaLink aria-hidden="true" /> Copy link
        </button>
      </div>
      <p className="share-status" role="status">{status}</p>
    </div>
  );
};

const QuizPage = () => {
  const { slug } = useParams();
  const quiz = getQuiz(slug);
  // step: 'intro' -> 'question' -> 'result'
  const [step, setStep] = useState('intro');
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [outcomeId, setOutcomeId] = useState(null);
  const [sharedOutcomeId, setSharedOutcomeId] = useState(null);

  // A shared link (?r=gryffindor) shows what the friend got. Read after mount (browser-only).
  useEffect(() => {
    const shared = new URLSearchParams(window.location.search).get('r');
    setSharedOutcomeId(quiz?.outcomes[shared] ? shared : null);
    setStep('intro');
    setIndex(0);
    setAnswers([]);
    setOutcomeId(null);
  }, [quiz]);

  const start = () => {
    setAnswers([]);
    setIndex(0);
    setStep('question');
    track('quiz_start', { quiz: quiz.slug, from_shared_link: sharedOutcomeId ? 1 : 0 });
  };

  const answer = useCallback(
    (optionIndex) => {
      const next = [...answers.slice(0, index), optionIndex];
      setAnswers(next);
      if (index < quiz.questions.length - 1) {
        setIndex(index + 1);
        return;
      }
      const winner = scoreQuiz(quiz, next);
      setOutcomeId(winner);
      track('quiz_complete', { quiz: quiz.slug, outcome: winner });
      setStep('result');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      awardBadge('quiz-rookie');
      if (trackProgress('quizzes', quiz.slug) >= QUIZZES.length) awardBadge('quiz-master');
      trackProgress('cards', `${quiz.slug}:${winner}`);
    },
    [answers, index, quiz]
  );

  useEffect(() => {
    if (step !== 'question') return undefined;
    const onKeyDown = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const n = Number(e.key);
      if (n >= 1 && n <= quiz.questions[index].options.length) answer(n - 1);
      else if ((e.key === 'Backspace' || e.key === 'ArrowLeft') && index > 0) setIndex(index - 1);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [step, index, quiz, answer]);

  if (!quiz) {
    return (
      <div className="container section">
        <h1 className="page-title">Hmm, we couldn't find that quiz</h1>
        <p>
          Browse <Link to="/quizzes">all quizzes</Link> instead.
        </p>
      </div>
    );
  }

  const otherQuizzes = QUIZZES.filter((q) => q.slug !== quiz.slug).slice(0, 3);
  const sharedOutcome = sharedOutcomeId && quiz.outcomes[sharedOutcomeId];

  return (
    <div className={`container section quiz-page quiz-theme-${quiz.slug}`}>
      <Breadcrumbs items={crumbsFor(quiz)} />

      {step === 'intro' && (
        <div className="quiz-panel quiz-intro">
          <span className="quiz-hero-emoji" aria-hidden="true">{quiz.emoji}</span>
          <h1 className="page-title">{quiz.title}</h1>
          {sharedOutcome && (
            <p className="quiz-shared-banner">
              Your friend got <strong>{sharedOutcome.emoji} {sharedOutcome.name}</strong>! What will you get?
            </p>
          )}
          <p className="quiz-intro-text">{quiz.description}</p>
          <p className="quiz-card-meta">
            {quiz.questions.length} questions · about {Math.max(1, Math.round(quiz.questions.length / 5))} min ·{' '}
            {Object.keys(quiz.outcomes).length} possible results
          </p>
          <button type="button" className="btn btn-primary quiz-start" onClick={start}>
            Start the quiz
          </button>
        </div>
      )}

      {step === 'question' && (
        <div className="quiz-panel">
          <h1 className="visually-hidden">{quiz.title}</h1>
          <div
            className="progress-bar-container"
            role="progressbar"
            aria-label="Quiz progress"
            aria-valuemin={0}
            aria-valuemax={quiz.questions.length}
            aria-valuenow={index}
          >
            <div className="progress-bar" style={{ width: `${(index / quiz.questions.length) * 100}%` }} />
          </div>
          <p className="quiz-counter">
            Question {index + 1} of {quiz.questions.length}
          </p>
          <h2 className="quiz-question" aria-live="polite">{quiz.questions[index].text}</h2>
          <div className="quiz-options">
            {quiz.questions[index].options.map((option, i) => (
              <button
                key={option.label}
                type="button"
                className={`quiz-option ${answers[index] === i ? 'selected' : ''}`}
                onClick={() => answer(i)}
                aria-keyshortcuts={String(i + 1)}
              >
                <span className="quiz-option-key" aria-hidden="true">{i + 1}</span>
                {option.label}
              </button>
            ))}
          </div>
          {index > 0 && (
            <button type="button" className="btn quiz-back" onClick={() => setIndex(index - 1)}>
              ← Back
            </button>
          )}
        </div>
      )}

      {step === 'result' && outcomeId && (
        <div className="quiz-panel quiz-result">
          <span className="quiz-hero-emoji quiz-result-pop" aria-hidden="true">{quiz.outcomes[outcomeId].emoji}</span>
          <p className="result-kicker">{quiz.title}</p>
          <h1 className="page-title">You are {quiz.outcomes[outcomeId].name}!</h1>
          <p className="quiz-tagline">{quiz.outcomes[outcomeId].tagline}</p>
          <p className="quiz-summary">{quiz.outcomes[outcomeId].summary}</p>
          <QuizShare quiz={quiz} outcomeId={outcomeId} outcome={quiz.outcomes[outcomeId]} />
          <OutcomeSections outcome={quiz.outcomes[outcomeId]} />
          <div className="quiz-result-actions">
            <button type="button" className="btn" onClick={start}>
              Retake quiz
            </button>
            <Link to="/cards" className="btn">🃏 Added to your deck</Link>
            <Link to="/test" className="btn btn-primary">
              Take the full personality test
            </Link>
          </div>
        </div>
      )}

      <section className="quiz-more" aria-labelledby="more-quizzes">
        <h2 id="more-quizzes">More fun quizzes</h2>
        <div className="quiz-grid">
          {otherQuizzes.map((other) => (
            <QuizCard key={other.slug} quiz={other} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default QuizPage;
