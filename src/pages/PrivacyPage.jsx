import React from 'react';
import { Link } from 'react-router';
import { buildMeta } from '../utils/seo';
import AnalyticsPreference from '../components/AnalyticsPreference';
import '../styles/PrivacyPage.css';

export const meta = () =>
  buildMeta({
    title: 'Privacy Policy | TrueYouTeller',
    description: 'How TrueYouTeller handles the name and answers you enter when taking the free personality test.',
    path: '/privacy',
  });

const LAST_UPDATED = 'October 1, 2026';

const PrivacyPage = () => (
  <div className="privacy-page container section">
    <h1 className="page-title">Privacy Policy</h1>
    <p className="privacy-updated">Last updated: {LAST_UPDATED}</p>

    <h2>What we collect</h2>
    <p>When you finish the personality test, we store:</p>
    <ul>
      <li>the name (or nickname) you typed in before starting,</li>
      <li>your answers to the test statements,</li>
      <li>your resulting personality type, and</li>
      <li>the time you finished.</li>
    </ul>
    <p>
      We don't ask for your email, phone number or any account details to take the test. Feel free to use a
      nickname, or tap "Generate Random Name".
    </p>

    <h2>Why we collect it</h2>
    <p>
      We use test results in aggregate to understand how people answer and to improve our questions and scoring.
      We don't sell your data or use it for advertising.
    </p>

    <h2>Contact and feedback forms</h2>
    <p>
      Messages you send through the <Link to="/contact">Contact</Link> or <Link to="/feedback">Feedback</Link> forms
      are delivered to us by email (via EmailJS) along with the name and email address you provide, so we can reply.
    </p>

    <h2>Analytics</h2>
    <p>
      We use Google Analytics 4 (through Firebase) to understand how the site is used: which pages are visited, how
      many people finish the test or a quiz, which results are shared, and roughly which country and device visitors
      use. Google Analytics sets cookies and receives your IP address, which Google uses to estimate location. We don't
      send your name or answers to Google Analytics.
    </p>
    <AnalyticsPreference />

    <h2>Stored on your device</h2>
    <p>
      To make the site work without an account, your browser keeps your in-progress test, your last result, your
      badges, your theme and your analytics choice in local storage. Clearing your browser data removes them.
    </p>

    <h2>Where it's stored</h2>
    <p>
      Test results are stored in Google Firebase (Cloud Firestore). The site is hosted on Firebase Hosting, which may
      keep standard server logs such as IP addresses for security.
    </p>

    <h2>Your choices</h2>
    <p>
      To have your test results deleted, <Link to="/contact">contact us</Link> with the name you used and roughly when
      you took the test, and we'll remove them.
    </p>

    <h2>Not a clinical assessment</h2>
    <p>
      TrueYouTeller is for fun and self-reflection. It is not a psychological or medical assessment.
    </p>
  </div>
);

export default PrivacyPage;
