import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { questions as classicQuestions, answerOptions, QUESTION_VERSION } from '../data/questions';
import { scenarios, SCENARIO_VERSION } from '../data/scenarios';
import { PERSONALITY_TYPES } from '../data/personalityTypes';
import { scoreAnswers } from '../utils/scoring';
import { clearProgress, loadProgress, resultPath, saveLastResult, saveProgress } from '../utils/storage';
import { saveTestResult } from '../firebase/config';
import { awardBadge, trackProgress } from '../utils/badges';
import { track } from '../utils/analytics';
import { buildMeta, SITE_URL } from '../utils/seo';
import '../styles/TestPage.css';
import '../styles/Quiz.css';

export const meta = () =>
  buildMeta({
    title: 'Take the Free Personality Test (48 Questions) | TrueYouTeller',
    description:
      'Start the free TrueYouTeller personality test. Rate 48 fun statements and discover your 16-type personality and spirit animal in about 10 minutes. No sign-up needed.',
    path: '/test',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Quiz',
        name: 'TrueYouTeller Free Personality Test',
        about: '16 personality types',
        educationalUse: 'self-assessment',
        url: `${SITE_URL}/test`,
        isAccessibleForFree: true,
        timeRequired: 'PT10M',
      },
    ],
  });

const SECONDS_PER_QUESTION = 12;

// Shown on the question after each milestone.
const CHEERS = {
  10: '🎉 10 down! The crystal ball is warming up…',
  20: "✨ 20 done! You're on a roll.",
  30: '🔮 30! Your personality is starting to glow.',
  40: '🚀 40! Almost there, just a few more.',
};

const cuteNames = ["pookie", "pingu", "mogumogu", "peekaboo", "bubbles", "mochi", "pompom", "booplet", "snugglebug",
  "wigglywoo", "nibnib", "pipi", "zuzu", "chonky", "fluffin", "boopie", "nono", "tinky", "blibble",
  "snickerdoodle", "cuppy", "gumdrop", "beebo", "muffin", "wubwub", "tutu", "momo", "sprinkles",
  "giggles", "doodlebug", "pupperoo", "lala", "tinkletop", "oinky", "fizzfuzz", "peanut", "jiggles",
  "cotton", "honeybun", "nibbles", "wiggles", "tofu", "tater", "jellybean", "fuzzle", "snugbug",
  "tinykins", "booboop", "dumdum", "cheekyboo", "scootles", "mimi", "tingting", "flicka", "gigglypoof",
  "baboo", "binky", "mushie", "twinkle", "wompwomp", "tickletoes", "noodle", "squishie", "doodoo",
  "cutiepatootie", "schnookie", "puffin", "crumpet", "kiki", "bonbon", "teacup", "cuddlepuff",
  "twinkie", "bopbop", "snugglemuff", "jiggy", "lulu", "blopblop", "mewmew", "choochu", "smolbean",
  "wigglet", "skippy", "cheeky", "fruityloop", "gogo", "toto", "whoopsie", "squee", "shmoopie",
  "puffypaws", "puddingpop", "fizzles", "rolypoly", "koko", "meepmeep", "tugboat", "cinnabun", "cloverbean",
  "twinklepuff", "booboofluff", "chibi", "snuffly"];

// Two ways to take the test; both score with utils/scoring.
const MODES = {
  classic: {
    id: 'classic',
    questions: classicQuestions,
    version: QUESTION_VERSION,
    unit: 'statements',
    title: 'Classic',
    blurb: `${classicQuestions.length} statements · ~10 min`,
    optionsFor: () => answerOptions,
  },
  scenario: {
    id: 'scenario',
    questions: scenarios,
    version: SCENARIO_VERSION,
    unit: 'situations',
    title: 'Scenario',
    blurb: `${scenarios.length} real-life situations · ~5 min`,
    optionsFor: (question) => question.options,
  },
};

const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);
const emptyAnswers = (config) => Array(config.questions.length).fill(null);
const optionLabel = (config, index, value) =>
  config.optionsFor(config.questions[index]).find((option) => option.value === value)?.text;

const TestPage = () => {
  // step: 'name' -> 'questions' -> 'review'
  const [step, setStep] = useState('name');
  const [modeId, setModeId] = useState('classic');
  const config = MODES[modeId];
  const { questions } = config;
  const [name, setName] = useState('');
  const [answers, setAnswers] = useState(() => emptyAnswers(MODES.classic));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [savedProgress, setSavedProgress] = useState(null);
  const [showAnswers, setShowAnswers] = useState(false);
  const [invite, setInvite] = useState(null);
  const navigate = useNavigate();

  // Offer to resume a test left unfinished, and pick up an invite from a friend's link
  // (?ref=infp&rn=Sam). Both are read after mount: storage and the query are browser-only.
  useEffect(() => {
    const progress = loadProgress();
    if (progress?.answers?.some((answer) => answer !== null)) setSavedProgress(progress);
    const params = new URLSearchParams(window.location.search);
    const refType = params.get('ref')?.toUpperCase();
    if (PERSONALITY_TYPES[refType ?? '']) {
      setInvite({ type: refType, name: params.get('rn')?.slice(0, 40) || '' });
    } else if (progress?.invite) {
      setInvite(progress.invite);
    }
  }, []);

  useEffect(() => {
    if (step !== 'name') saveProgress({ mode: modeId, name, answers, index: currentQuestionIndex, invite });
  }, [step, modeId, name, answers, currentQuestionIndex, invite]);

  const resumeTest = () => {
    const resumeMode = MODES[savedProgress.mode] ?? MODES.classic;
    setModeId(resumeMode.id);
    setName(savedProgress.name);
    setAnswers(savedProgress.answers);
    const allAnswered = savedProgress.answers.every((answer) => answer !== null);
    setCurrentQuestionIndex(Math.min(savedProgress.index ?? 0, resumeMode.questions.length - 1));
    setStep(allAnswered ? 'review' : 'questions');
    setSavedProgress(null);
    track('test_resume', { answered: savedProgress.answers.filter((a) => a !== null).length });
  };

  const startOver = () => {
    clearProgress();
    setSavedProgress(null);
  };

  const generateRandomName = () => {
    setName(capitalize(cuteNames[Math.floor(Math.random() * cuteNames.length)]));
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      setName(capitalize(name.trim()));
      setAnswers(emptyAnswers(config));
      setCurrentQuestionIndex(0);
      setStep('questions');
      track('test_start', { invited: invite ? 1 : 0, mode: modeId });
    }
  };

  const handleAnswerSelect = useCallback(
    (value) => {
      const newAnswers = [...answers];
      const wasAnswered = newAnswers[currentQuestionIndex] !== null;
      newAnswers[currentQuestionIndex] = value;
      setAnswers(newAnswers);

      // Funnel milestones: fire once as the answered count crosses 25/50/75%.
      if (!wasAnswered) {
        const answered = newAnswers.filter((answer) => answer !== null).length;
        const percent = Math.floor((answered / questions.length) * 100);
        const previous = Math.floor(((answered - 1) / questions.length) * 100);
        const milestone = [25, 50, 75].find((m) => previous < m && percent >= m);
        if (milestone) track('test_progress', { percent: milestone });
      }

      const nextUnanswered = newAnswers.findIndex((answer, i) => answer === null && i > currentQuestionIndex);
      const firstUnanswered = newAnswers.indexOf(null);
      if (nextUnanswered !== -1) setCurrentQuestionIndex(nextUnanswered);
      else if (firstUnanswered !== -1) setCurrentQuestionIndex(firstUnanswered);
      else setStep('review');
    },
    [answers, currentQuestionIndex, questions.length]
  );

  const handlePrev = useCallback(() => {
    if (currentQuestionIndex > 0) setCurrentQuestionIndex(currentQuestionIndex - 1);
  }, [currentQuestionIndex]);

  // Keyboard: 1-5 pick an answer, Backspace / Left arrow goes back.
  useEffect(() => {
    if (step !== 'questions') return undefined;
    const onKeyDown = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey || e.target.closest?.('input, textarea, select')) return;
      const option = config.optionsFor(questions[currentQuestionIndex])[Number(e.key) - 1];
      if (option) handleAnswerSelect(option.value);
      else if (e.key === 'Backspace' || e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [step, config, questions, currentQuestionIndex, handleAnswerSelect, handlePrev]);

  const editAnswer = (index) => {
    setCurrentQuestionIndex(index);
    setStep('questions');
  };

  const revealResult = () => {
    const { type, percentages } = scoreAnswers(answers, questions);
    const result = { type, name, percentages, completedAt: new Date().toISOString(), invitedBy: invite };
    saveLastResult(result);
    trackProgress('cards', type);
    awardBadge('first-test');
    track('test_complete', { personality_type: type, invited: invite ? 1 : 0, mode: modeId });
    clearProgress();
    saveTestResult({
      name,
      personalityType: PERSONALITY_TYPES[type],
      answers,
      percentages,
      questionVersion: config.version,
      mode: modeId,
    }).catch((error) => console.error('Failed to save test result:', error));
    navigate(resultPath(result), { state: { fresh: true } });
  };

  if (step === 'name') {
    return (
      <div className="test-container container section">
        <div className="test-card">
          <h1 className="welcome-heading">Free Personality Test</h1>
          {invite && (
            <p className="invite-banner">
              💌 {invite.name || 'A friend'} ({invite.type}) invited you! Finish the test to see how compatible you are.
            </p>
          )}
          {savedProgress ? (
            <div className="resume-box">
              <p className="welcome-subheading">
                Welcome back, <strong>{savedProgress.name}</strong>! You answered{' '}
                {savedProgress.answers.filter((answer) => answer !== null).length} of {savedProgress.answers.length}{' '}
                {(MODES[savedProgress.mode] ?? MODES.classic).unit}.
              </p>
              <div className="resume-buttons">
                <button type="button" className="btn btn-primary" onClick={resumeTest}>
                  Resume my test
                </button>
                <button type="button" className="btn" onClick={startOver}>
                  Start over
                </button>
              </div>
            </div>
          ) : (
            <>
              <p className="welcome-subheading">Free · no sign-up · pick a style, then enter a name or nickname.</p>
              <div className="mode-picker" role="radiogroup" aria-label="Test style">
                {Object.values(MODES).map((mode) => (
                  <button
                    key={mode.id}
                    type="button"
                    role="radio"
                    aria-checked={modeId === mode.id}
                    className={`mode-option ${modeId === mode.id ? 'selected' : ''}`}
                    onClick={() => setModeId(mode.id)}
                  >
                    <strong>{mode.id === 'classic' ? '📝' : '🎬'} {mode.title}</strong>
                    <span>{mode.blurb}</span>
                  </button>
                ))}
              </div>
              <form onSubmit={handleNameSubmit} className="name-form">
                <div className="name-input-container">
                  <label htmlFor="test-name" className="visually-hidden">Your name or nickname</label>
                  <input
                    id="test-name"
                    type="text"
                    maxLength={40}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="name-input"
                  />
                  <button type="button" onClick={generateRandomName} className="btn random-name-btn">
                    Generate Random Name
                  </button>
                </div>
                <button type="submit" className="btn start-btn" disabled={!name.trim()}>
                  Start Test
                </button>
              </form>
              <p className="privacy-note">
                Your name and answers are saved to improve the test. See our <Link to="/privacy">privacy policy</Link>.
              </p>
            </>
          )}
        </div>
      </div>
    );
  }

  const answeredCount = answers.filter((answer) => answer !== null).length;

  if (step === 'review') {
    return (
      <div className="test-container container section">
        <div className="test-card">
          <h1 className="welcome-heading">All done, {name}! 🎉</h1>
          <p className="welcome-subheading">
            You've answered all {questions.length} {config.unit}. Ready to see what the crystal ball says?
          </p>
          <div className="resume-buttons">
            <button type="button" className="btn btn-primary reveal-btn" onClick={revealResult}>
              🔮 Reveal my personality
            </button>
            <button type="button" className="btn" onClick={() => setShowAnswers(!showAnswers)} aria-expanded={showAnswers}>
              {showAnswers ? 'Hide my answers' : 'Review my answers'}
            </button>
          </div>
          {showAnswers && (
            <ol className="review-list">
              {questions.map((question, index) => (
                <li key={question.statement}>
                  <button type="button" className="review-item" onClick={() => editAnswer(index)}>
                    <span className="review-statement">{question.statement}</span>
                    <span className="review-answer">{optionLabel(config, index, answers[index])} ✏️</span>
                  </button>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = (answeredCount / questions.length) * 100;
  const minutesLeft = Math.ceil(((questions.length - answeredCount) * SECONDS_PER_QUESTION) / 60);
  const options = config.optionsFor(currentQuestion);
  const isScenario = modeId === 'scenario';
  const cheer = CHEERS[currentQuestionIndex];

  return (
    <div className="test-container container section">
      <div className="test-card">
        <h1 className="visually-hidden">Free Personality Test</h1>
        <div
          className="progress-bar-container"
          role="progressbar"
          aria-label="Test progress"
          aria-valuemin={0}
          aria-valuemax={questions.length}
          aria-valuenow={answeredCount}
        >
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="question-meta">
          <span className="statement-label">
            {isScenario ? 'Situation' : 'Statement'} {currentQuestionIndex + 1}/{questions.length}
          </span>
          <span className="time-left">
            {minutesLeft > 0 ? `⏱ about ${minutesLeft} min left` : '⏱ last one!'}
          </span>
        </div>
        {cheer && <p className="cheer" key={cheer}>{cheer}</p>}
        <div className="question-section">
          {isScenario && <span className="scenario-emoji" aria-hidden="true">{currentQuestion.emoji}</span>}
          <p className="question-text" aria-live="polite">{currentQuestion.statement}</p>
        </div>
        {isScenario ? (
          <div className="quiz-options" role="group" aria-label="What would you do?">
            {options.map((option, i) => (
              <button
                key={option.text}
                type="button"
                className={`quiz-option ${answers[currentQuestionIndex] === option.value ? 'selected' : ''}`}
                onClick={() => handleAnswerSelect(option.value)}
                aria-pressed={answers[currentQuestionIndex] === option.value}
                aria-keyshortcuts={String(i + 1)}
              >
                <span className="quiz-option-key" aria-hidden="true">{i + 1}</span>
                {option.text}
              </button>
            ))}
          </div>
        ) : (
          <div className="answer-section likert-scale" role="group" aria-label="Your answer">
            {options.map((option, i) => (
              <button
                key={option.value}
                className={`btn answer-btn ${answers[currentQuestionIndex] === option.value ? 'selected' : ''}`}
                onClick={() => handleAnswerSelect(option.value)}
                aria-pressed={answers[currentQuestionIndex] === option.value}
                aria-keyshortcuts={String(i + 1)}
              >
                {option.text}
              </button>
            ))}
          </div>
        )}
        <p className="keyboard-hint">Tip: press keys 1–{options.length} to answer, Backspace to go back.</p>
        <div className="navigation-buttons">
          <button className="btn prev-btn" onClick={handlePrev} disabled={currentQuestionIndex === 0}>
            ← Back
          </button>
          {answeredCount === questions.length && (
            <button className="btn btn-primary" onClick={() => setStep('review')}>
              Done reviewing →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestPage;
