import React from 'react';
import '../styles/LandingPage.css';
import { Link } from 'react-router';
import { FaPencilAlt, FaHeart, FaPaintBrush, FaLaughBeam, FaBolt } from 'react-icons/fa';
import { GiCrystalBall } from 'react-icons/gi';
import logo from '../images/trueyouteller-logo-removebg.webp';
import FriendsQuiz from '../components/MiniGames/friends/FriendsQuiz';
import InsideOutQuiz from '../components/MiniGames/insideOut/InsideOutQuiz';
import { buildMeta, faqJsonLd, organizationJsonLd, websiteJsonLd } from '../utils/seo';

const FAQS = [
  {
    question: 'Is this personality test free?',
    answer:
      'Yes. The TrueYouTeller personality test is 100% free, with no sign-up and no paywall. You get your full 16-type result, spirit animal and detailed profile instantly.',
  },
  {
    question: 'How long does the personality test take?',
    answer:
      'About 10 minutes. You rate 48 short statements from "Strongly Disagree" to "Strongly Agree", one at a time.',
  },
  {
    question: 'Is this an MBTI test?',
    answer:
      'It is an MBTI-style test based on the same four preference pairs (Introversion/Extraversion, Sensing/Intuition, Thinking/Feeling, Judging/Perceiving) and gives one of 16 personality types. It is not the official Myers-Briggs Type Indicator®.',
  },
  {
    question: 'How accurate is the result?',
    answer:
      'It is designed for fun and self-reflection, not clinical diagnosis. Answer honestly about how you usually are, not how you want to be, for the most accurate result.',
  },
  {
    question: 'What do I get at the end?',
    answer:
      'Your four-letter personality type, a spirit animal, strengths and weaknesses, career ideas, relationship insights, and famous people and characters who share your type.',
  },
];

export const meta = () =>
  buildMeta({
    title: 'Free Personality Test (16 Types) | TrueYouTeller',
    description:
      'Take our free personality test and discover which of the 16 personality types you are, plus your spirit animal. No sign-up, instant results, about 10 minutes.',
    path: '/',
    jsonLd: [websiteJsonLd, organizationJsonLd, faqJsonLd(FAQS)],
  });

const LandingPage = () => {
  return (
    <div className="landing-page">
      <header className="landing-header">
        <img
          src={logo}
          alt="TrueYouTeller crystal ball"
          className="crystal-ball-image"
          width="400"
          height="400"
          fetchPriority="high"
        />
        <h1>Free Personality Test: Discover Your True Type</h1>
        <p className="subtitle">
          Find out which of the 16 personality types you are, and meet your spirit animal, in about 10 minutes.
        </p>
        <Link to="/test" className="btn btn-primary bouncing">Start the Free Test</Link>
      </header>

      <section className="section container how-it-works">
        <h2>How the Personality Test Works</h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-icon"><FaPencilAlt aria-hidden="true" /></div>
            <h3>1. Take the Test</h3>
            <p>Rate 48 fun, relatable statements about how you think, feel and act.</p>
          </div>
          <div className="step">
            <div className="step-icon"><GiCrystalBall aria-hidden="true" /></div>
            <h3>2. Get Your Result</h3>
            <p>Our magical crystal ball reveals your four-letter personality type and spirit animal.</p>
          </div>
          <div className="step">
            <div className="step-icon"><FaHeart aria-hidden="true" /></div>
            <h3>3. Know Yourself</h3>
            <p>Explore your strengths, career ideas, relationships and famous personality twins.</p>
          </div>
        </div>
      </section>

      <section className="section features-section">
        <div className="container">
          <h2>Why You'll Love It</h2>
          <div className="features-container">
            <div className="feature-item">
              <div className="feature-icon"><FaPaintBrush aria-hidden="true" /></div>
              <h3>Cute & Modern Design</h3>
              <p>A personality quiz that feels like a game, not a questionnaire.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon"><FaLaughBeam aria-hidden="true" /></div>
              <h3>Fun Questions</h3>
              <p>Playful, thought-provoking statements based on the 16 personality types model.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon"><FaBolt aria-hidden="true" /></div>
              <h3>Free & Instant</h3>
              <p>No sign-up and no paywall. Your full result appears right after the last question.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="mini-games" className="section container mini-games">
        <h2>Mini-Games</h2>
        <p>Try our fun character quizzes to discover even more about yourself!</p>
        <div className="mini-games-container">
          <FriendsQuiz />
          <InsideOutQuiz />
        </div>
      </section>

      <section id="faq" className="section container faq-section">
        <h2>Personality Test FAQ</h2>
        <div className="faq-list">
          {FAQS.map(({ question, answer }) => (
            <details key={question} className="faq-item">
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="section container final-cta">
        <h2>Ready to Discover Your True Self?</h2>
        <Link to="/test" className="btn btn-primary bouncing">Let's Go!</Link>
      </section>
    </div>
  );
};

export default LandingPage;
