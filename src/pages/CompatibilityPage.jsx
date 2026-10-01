import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { PERSONALITY_TYPES } from '../data/personalityTypes';
import { getCompatibility, pairSlug, parsePairSlug, topMatches, TYPE_CODES } from '../data/compatibility';
import { getAnimalImage } from '../utils/images';
import { loadLastResult } from '../utils/storage';
import { awardBadge } from '../utils/badges';
import { breadcrumbJsonLd, buildMeta, SITE_URL } from '../utils/seo';
import Breadcrumbs from '../components/Breadcrumbs';
import '../styles/DetailedResultsPage.css';
import '../styles/TypePages.css';

const OG_IMAGE = `${SITE_URL}/og/compatibility.png`;

// "The Architect" -> "Architect", for phrasing like "Two Architects".
const bareName = (type) => type.name.replace(/^The /, '');

const crumbsFor = (pair) => [
  { name: 'Home', path: '/' },
  { name: 'Compatibility', path: '/compatibility' },
  ...(pair ? [{ name: `${pair[0]} & ${pair[1]}`, path: `/compatibility/${pairSlug(pair[0], pair[1])}` }] : []),
];

export const meta = ({ params }) => {
  if (!params.pair) {
    return buildMeta({
      title: 'Personality Type Compatibility Checker (All 16 Types) | TrueYouTeller',
      description:
        'Check the compatibility between any two of the 16 personality types. See your match score, strengths, friction points and tips for love, friendship and work.',
      path: '/compatibility',
      image: OG_IMAGE,
      jsonLd: [breadcrumbJsonLd(crumbsFor(null))],
    });
  }
  const pair = parsePairSlug(params.pair);
  if (!pair) return [{ title: 'Compatibility Not Found | TrueYouTeller' }, { name: 'robots', content: 'noindex' }];
  const { a, b, score, tier } = getCompatibility(...pair);
  const same = a.code === b.code;
  return buildMeta({
    title: same
      ? `${a.code} and ${b.code} Compatibility: Two ${bareName(a)}s (${score}%) | TrueYouTeller`
      : `${a.code} and ${b.code} Compatibility: ${score}% ${tier.label} | TrueYouTeller`,
    description: `How compatible are ${a.code} (${a.name}) and ${b.code} (${b.name})? A ${score}% "${tier.label}": see their strengths together, friction points and tips for love, friendship and work.`,
    path: `/compatibility/${pairSlug(a.code, b.code)}`,
    image: OG_IMAGE,
    type: 'article',
    jsonLd: [breadcrumbJsonLd(crumbsFor(pair))],
  });
};

const TypeSelect = ({ id, label, value, onChange }) => (
  <div className="compat-select">
    <label htmlFor={id}>{label}</label>
    <select id={id} value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="">Choose a type</option>
      {TYPE_CODES.map((code) => (
        <option key={code} value={code}>
          {code} · {PERSONALITY_TYPES[code].name}
        </option>
      ))}
    </select>
  </div>
);

const Picker = ({ initialA = '', initialB = '' }) => {
  const navigate = useNavigate();
  const [a, setA] = useState(initialA);
  const [b, setB] = useState(initialB);

  // Pre-fill from ?a= or the visitor's own last result (browser-only, so after mount).
  useEffect(() => {
    if (initialA) return;
    const fromQuery = new URLSearchParams(window.location.search).get('a')?.toUpperCase();
    const fromResult = loadLastResult()?.type;
    const pick = [fromQuery, fromResult].find((code) => PERSONALITY_TYPES[code ?? '']);
    if (pick) setA(pick);
  }, [initialA]);

  const submit = (e) => {
    e.preventDefault();
    if (a && b) navigate(`/compatibility/${pairSlug(a, b)}`);
  };

  return (
    <form className="compat-picker" onSubmit={submit}>
      <TypeSelect id="type-a" label="Your type" value={a} onChange={setA} />
      <span className="compat-plus" aria-hidden="true">💞</span>
      <TypeSelect id="type-b" label="Their type" value={b} onChange={setB} />
      <button type="submit" className="btn btn-primary" disabled={!a || !b}>
        Check compatibility
      </button>
    </form>
  );
};

const TypeBadge = ({ type }) => (
  <Link to={`/types/${type.code.toLowerCase()}`} className="compat-type">
    <img src={getAnimalImage(type.spiritAnimal)} alt="" width="110" height="110" />
    <span className="compat-type-code">{type.code}</span>
    <span className="compat-type-name">{type.name}</span>
  </Link>
);

const PairView = ({ pair }) => {
  const { a, b, score, tier, axes } = getCompatibility(...pair);
  useEffect(() => awardBadge('matchmaker'), []);
  const others = topMatches(a.code, 4).filter(({ code }) => code !== b.code).slice(0, 3);

  return (
    <>
      <header className="compat-hero">
        <h1 className="page-title">{`${a.code} & ${b.code} Compatibility`}</h1>
        <div className="compat-pair">
          <TypeBadge type={a} />
          <div
            className="compat-score"
            style={{ '--score': score }}
            role="img"
            aria-label={`${score}% compatibility`}
          >
            <span className="compat-score-number">{score}%</span>
            <span className="compat-score-tier">
              {tier.emoji} {tier.label}
            </span>
          </div>
          <TypeBadge type={b} />
        </div>
        <p className="compat-summary">
          {a.code === b.code
            ? `Two ${bareName(a)}s understand each other instantly. Here's what that looks like day to day, and where to stay careful.`
            : `${a.name} (${a.code}) and ${b.name.replace(/^The /, 'the ')} (${b.code}) share ${axes.filter((x) => x.same).length} of 4 preferences. Here's how that plays out in love, friendship and work.`}
        </p>
      </header>

      <div className="compat-axes">
        {axes.map((axis) => (
          <section key={axis.axis} className="result-card compat-axis" aria-labelledby={`axis-${axis.axis}`}>
            <h2 id={`axis-${axis.axis}`}>
              <span className="compat-letters">
                {axis.letters[0]} + {axis.letters[1]}
              </span>{' '}
              {axis.title}
            </h2>
            <p>
              <strong>✅ Works well:</strong> {axis.strength}
            </p>
            <p>
              <strong>⚠️ Watch out:</strong> {axis.friction}
            </p>
            <p>
              <strong>💡 Try this:</strong> {axis.tip}
            </p>
          </section>
        ))}
      </div>

      <div className="type-cta">
        <p>Not sure of your type? Find out in about 10 minutes, then send the test to them.</p>
        <Link to="/test" className="btn btn-primary">Take the Free Personality Test</Link>
      </div>

      <section className="result-card" aria-labelledby="more-matches">
        <h2 id="more-matches">More {a.code} matches</h2>
        <div className="match-grid">
          {others.map(({ code, score: otherScore }) => (
            <Link key={code} to={`/compatibility/${pairSlug(a.code, code)}`} className="match-card">
              <span className="match-code">{a.code} &amp; {code}</span>
              <span className="match-name">{PERSONALITY_TYPES[code].name}</span>
              <span className="match-score">{otherScore}% match</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="result-card" aria-labelledby="check-another">
        <h2 id="check-another">Check another pair</h2>
        <Picker key={`${a.code}-${b.code}`} initialA={a.code} />
      </section>
    </>
  );
};

const CompatibilityPage = () => {
  const { pair: pairParam } = useParams();
  const navigate = useNavigate();
  const pair = pairParam ? parsePairSlug(pairParam) : null;
  const canonical = pair && pairSlug(pair[0], pair[1]);

  // /compatibility/intj-enfp and /compatibility/enfp-intj are the same page.
  useEffect(() => {
    if (pair && pairParam !== canonical) navigate(`/compatibility/${canonical}`, { replace: true });
  }, [pair, pairParam, canonical, navigate]);

  if (pairParam && !pair) {
    return (
      <div className="container section compat-page">
        <h1 className="page-title">Hmm, we couldn't find that pair</h1>
        <p>Pick two types below to check their compatibility.</p>
        <Picker />
      </div>
    );
  }

  return (
    <div className="container section compat-page">
      <Breadcrumbs items={crumbsFor(pair)} />
      {pair ? (
        <PairView pair={pair} />
      ) : (
        <>
          <h1 className="page-title">Personality Compatibility Checker</h1>
          <p className="types-intro">
            Pick two of the 16 personality types to see how well they match, what they do well together, and where
            they might clash. Don't know your type? <Link to="/test">Take the free test</Link>.
          </p>
          <Picker />
        </>
      )}
    </div>
  );
};

export default CompatibilityPage;
