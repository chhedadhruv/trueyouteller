import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { questions, answerOptions } from '../data/questions';
import { buildMeta, SITE_URL } from '../utils/seo';
import '../styles/TestPage.css';

export const meta = () =>
  buildMeta({
    title: 'Take the Free Personality Test (50 Questions) | TrueYouTeller',
    description:
      'Start the free TrueYouTeller personality test. Rate 50 fun statements and discover your 16-type personality and spirit animal in about 10 minutes. No sign-up needed.',
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

const TestPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [name, setName] = useState('');
  const [nameSubmitted, setNameSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleAnswerSelect = (value) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = value;
    setAnswers(newAnswers);

    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      navigate('/results', { state: { answers: newAnswers, name } });
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
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
  
  const generateRandomName = () => {
    const randomName = cuteNames[Math.floor(Math.random() * cuteNames.length)];
    setName(randomName.charAt(0).toUpperCase() + randomName.slice(1));
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      setName(name.trim().charAt(0).toUpperCase() + name.trim().slice(1));
      setNameSubmitted(true);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  if (!nameSubmitted) {
    return (
      <div className="test-container container section">
        <div className="test-card">
          <h1 className="welcome-heading">Free Personality Test</h1>
          <p className="welcome-subheading">Please enter your name to begin.</p>
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
        </div>
      </div>
    );
  }

  return (
    <div className="test-container container section">
      <div className="test-card">
        <h1 className="visually-hidden">Free Personality Test</h1>
        <div
          className="progress-bar-container"
          role="progressbar"
          aria-label="Test progress"
          aria-valuemin={1}
          aria-valuemax={questions.length}
          aria-valuenow={currentQuestionIndex + 1}
        >
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="question-section">
          <p className="statement-label">Statement {currentQuestionIndex + 1}/{questions.length}</p>
          <p className="question-text" aria-live="polite">{currentQuestion.statement}</p>
        </div>
        <div className="answer-section likert-scale">
          {answerOptions.map((option) => (
            <button
              key={option.value}
              className={`btn answer-btn ${answers[currentQuestionIndex] === option.value ? 'selected' : ''}`}
              onClick={() => handleAnswerSelect(option.value)}
            >
              {option.text}
            </button>
          ))}
        </div>
        <div className="navigation-buttons">
            <button
              className="btn prev-btn"
              onClick={handlePrev}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </button>
          </div>
      </div>
    </div>
  );
};

export default TestPage; 