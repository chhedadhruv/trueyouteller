import React from 'react';
import { Link } from 'react-router';
import { PERSONALITY_TYPES } from '../data/personalityTypes';

const Footer = () => (
  <footer className="site-footer">
    <div className="container footer-grid">
      <div>
        <h2>TrueYouTeller</h2>
        <p>A free, fun personality test that reveals your 16-type personality and spirit animal.</p>
      </div>
      <nav aria-label="Explore">
        <h2>Explore</h2>
        <ul>
          <li><Link to="/test">Free Personality Test</Link></li>
          <li><Link to="/types">16 Personality Types</Link></li>
          <li><Link to="/compatibility">Compatibility Checker</Link></li>
          <li><Link to="/quizzes">Fun Quizzes</Link></li>
          <li><Link to="/#faq">FAQ</Link></li>
        </ul>
      </nav>
      <nav aria-label="Personality types" className="footer-types">
        <h2>Personality Types</h2>
        <ul>
          {Object.values(PERSONALITY_TYPES).map((type) => (
            <li key={type.code}>
              <Link to={`/types/${type.code.toLowerCase()}`}>{type.code}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <nav aria-label="Company">
        <h2>Company</h2>
        <ul>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/feedback">Feedback</Link></li>
          <li><Link to="/privacy">Privacy Policy</Link></li>
        </ul>
      </nav>
    </div>
    <p className="container footer-bottom">
      © {new Date().getFullYear()} TrueYouTeller. For fun and self-reflection, not a clinical assessment.
    </p>
  </footer>
);

export default Footer;
