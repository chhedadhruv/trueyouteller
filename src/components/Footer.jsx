import React from 'react';
import { Link } from 'react-router';

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
          <li><Link to="/#mini-games">Mini-Games</Link></li>
          <li><Link to="/#faq">FAQ</Link></li>
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
