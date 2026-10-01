import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { questions, answerOptions, QUESTION_VERSION } from '../data/questions';
import { PERSONALITY_TYPES } from '../data/personalityTypes';
import { scoreAnswers } from '../utils/scoring';
import { clearProgress, loadProgress, resultPath, saveLastResult, saveProgress } from '../utils/storage';
import { saveTestResult } from '../firebase/config';
import { buildMeta, SITE_URL } from '../utils/seo';
import '../styles/TestPage.css';

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

const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);
const emptyAnswers = () => Array(questions.length).fill(null);
const optionLabel = (value) => answerOptions.find((option) => option.value === value)?.text;

const TestPage = () => {
  // step: 'name' -> 'questions' -> 'review'
  const [step, setStep] = useState('name');
  const [name, setName] = useState('');
  const [answers, setAnswers] = useState(emptyAnswers);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [savedProgress, setSavedProgress] = useState(null);
  const [showAnswers, setShowAnswers] = useState(false);
  const navigate = useNavigate();

  // Offer to resume a test left unfinished (read after mount: storage is browser-only).
  useEffect(() => {
    const progress = loadProgress();
    if (progress?.answers?.some((answer) => answer !== null)) setSavedProgress(progress);
  }, []);

  useEffect(() => {
    if (step !== 'name') saveProgress({ name, answers, index: currentQuestionIndex });
  }, [step, name, answers, currentQuestionIndex]);

  const resumeTest = () => {
    setName(savedProgress.name);
    setAnswers(savedProgress.answers);
    const allAnswered = savedProgress.answers.every((answer) => answer !== null);
    setCurrentQuestionIndex(Math.min(savedProgress.index ?? 0, questions.length - 1));
    setStep(allAnswered ? 'review' : 'questions');
    setSavedProgress(null);
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
      setAnswers(emptyAnswers());
      setCurrentQuestionIndex(0);
      setStep('questions');
    }
  };

  const handleAnswerSelect = useCallback(
    (value) => {
      const newAnswers = [...answers];
      newAnswers[currentQuestionIndex] = value;
      setAnswers(newAnswers);

      const nextUnanswered = newAnswers.findIndex((answer, i) => answer === null && i > currentQuestionIndex);
      const firstUnanswered = newAnswers.indexOf(null);
      if (nextUnanswered !== -1) setCurrentQuestionIndex(nextUnanswered);
      else if (firstUnanswered !== -1) setCurrentQuestionIndex(firstUnanswered);
      else setStep('review');
    },
    [answers, currentQuestionIndex]
  );

  const handlePrev = useCallback(() => {
    if (currentQuestionIndex > 0) setCurrentQuestionIndex(currentQuestionIndex - 1);
  }, [currentQuestionIndex]);

  // Keyboard: 1-5 pick an answer, Backspace / Left arrow goes back.
  useEffect(() => {
    if (step !== 'questions') return undefined;
    const onKeyDown = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey || e.target.closest?.('input, textarea, select')) return;
      const option = answerOptions[Number(e.key) - 1];
      if (option) handleAnswerSelect(option.value);
      else if (e.key === 'Backspace' || e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [step, handleAnswerSelect, handlePrev]);

  const editAnswer = (index) => {
    setCurrentQuestionIndex(index);
    setStep('questions');
  };

  const revealResult = () => {
    const { type, percentages } = scoreAnswers(answers);
    const result = { type, name, percentages, completedAt: new Date().toISOString() };
    saveLastResult(result);
    clearProgress();
    saveTestResult({
      name,
      personalityType: PERSONALITY_TYPES[type],
      answers,
      percentages,
      questionVersion: QUESTION_VERSION,
    }).catch((error) => console.error('Failed to save test result:', error));
    navigate(resultPath(result), { state: { fresh: true } });
  };

  if (step === 'name') {
    return (
      <div className="test-container container section">
        <div className="test-card">
          <h1 className="welcome-heading">Free Personality Test</h1>
          {savedProgress ? (
            <div className="resume-box">
              <p className="welcome-subheading">
                Welcome back, <strong>{savedProgress.name}</strong>! You answered{' '}
                {savedProgress.answers.filter((answer) => answer !== null).length} of {questions.length} statements.
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
              <p className="welcome-subheading">
                {questions.length} quick statements · about 10 minutes · no sign-up. Enter a name or nickname to begin.
              </p>
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
            You've answered all {questions.length} statements. Ready to see what the crystal ball says?
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
                    <span className="review-answer">{optionLabel(answers[index])} ✏️</span>
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
          <span className="statement-label">Statement {currentQuestionIndex + 1}/{questions.length}</span>
          <span className="time-left">
            {minutesLeft > 0 ? `⏱ about ${minutesLeft} min left` : '⏱ last one!'}
          </span>
        </div>
        {cheer && <p className="cheer" key={cheer}>{cheer}</p>}
        <div className="question-section">
          <p className="question-text" aria-live="polite">{currentQuestion.statement}</p>
        </div>
        <div className="answer-section likert-scale" role="group" aria-label="Your answer">
          {answerOptions.map((option, i) => (
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
        <p className="keyboard-hint">Tip: press keys 1–5 to answer, Backspace to go back.</p>
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
