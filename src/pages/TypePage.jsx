import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router';
import { PERSONALITY_TYPES } from '../data/personalityTypes';
import { pairSlug, topMatches } from '../data/compatibility';
import { getAnimalImage } from '../utils/images';
import { awardBadge, trackProgress } from '../utils/badges';
import { breadcrumbJsonLd, buildMeta, SITE_NAME, SITE_URL } from '../utils/seo';
import PersonalityProfile from '../components/PersonalityProfile';
import TypeWorld from '../components/TypeWorld';
import Breadcrumbs from '../components/Breadcrumbs';
import '../styles/TypePages.css';

const findType = (param) => PERSONALITY_TYPES[(param ?? '').toUpperCase()];

const crumbsFor = (type) => [
  { name: 'Home', path: '/' },
  { name: '16 Personality Types', path: '/types' },
  { name: `${type.code}: ${type.name}`, path: `/types/${type.code.toLowerCase()}` },
];

export const meta = ({ params }) => {
  const type = findType(params.type);
  if (!type) return [{ title: 'Personality Type Not Found | TrueYouTeller' }, { name: 'robots', content: 'noindex' }];
  const path = `/types/${type.code.toLowerCase()}`;
  const image = `${SITE_URL}/og/${type.code.toLowerCase()}.png`;
  const title = `${type.code} Personality Type (${type.name}): Traits, Careers & Compatibility`;
  const description = `Everything about the ${type.code} personality (${type.name}): ${type.description.toLowerCase()} Strengths, weaknesses, careers, relationships, famous ${type.code}s and spirit animal.`;
  return buildMeta({
    title,
    description,
    path,
    image,
    type: 'article',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: `${type.code} Personality Type: ${type.name}`,
        description,
        image,
        url: `${SITE_URL}${path}`,
        author: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
        publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
      },
      breadcrumbJsonLd(crumbsFor(type)),
    ],
  });
};

const TypePage = () => {
  const { type: typeParam } = useParams();
  const type = findType(typeParam);

  useEffect(() => {
    if (type && trackProgress('types', type.code) >= 5) awardBadge('explorer');
  }, [type]);

  if (!type) {
    return (
      <div className="container section type-page">
        <h1 className="page-title">Hmm, that's not a personality type</h1>
        <p>
          Browse <Link to="/types">all 16 personality types</Link> or <Link to="/test">take the free test</Link>.
        </p>
      </div>
    );
  }

  const matches = topMatches(type.code);

  return (
    <div className="container section type-page">
      <Breadcrumbs items={crumbsFor(type)} />
      <header className="detailed-header type-hero">
        <img
          src={getAnimalImage(type.spiritAnimal)}
          alt={`${type.spiritAnimal}, the ${type.code} spirit animal`}
          className="spirit-animal-image-detailed"
          width="150"
          height="150"
        />
        <h1>{`${type.code} Personality Type: ${type.name}`}</h1>
        <p className="detailed-header-description">{type.description}</p>
      </header>

      <section className="type-quick-facts" aria-label={`${type.code} at a glance`}>
        <div className="quick-fact">
          <span className="quick-fact-label">Spirit animal</span>
          <span className="quick-fact-value">{type.emoji} {type.spiritAnimal}</span>
        </div>
        <div className="quick-fact">
          <span className="quick-fact-label">Top strengths</span>
          <span className="quick-fact-value">{type.strengthsWeaknesses.strengths.slice(0, 2).join(', ')}</span>
        </div>
        <div className="quick-fact">
          <span className="quick-fact-label">Dream careers</span>
          <span className="quick-fact-value">{type.careerInsights.careerIdeas.slice(0, 2).join(', ')}</span>
        </div>
        <div className="quick-fact">
          <span className="quick-fact-label">Famous {type.code}s</span>
          <span className="quick-fact-value">{type.culturalConnections.famousMatches.slice(0, 2).join(', ')}</span>
        </div>
      </section>

      <div className="type-cta">
        <p>Are you an {type.code}? Find out in about 10 minutes.</p>
        <Link to="/test" className="btn btn-primary">Take the Free Personality Test</Link>
      </div>

      <section className="result-card" aria-labelledby="why-animal">
        <h2 id="why-animal">Why the {type.spiritAnimal}?</h2>
        <p>{type.reason}</p>
      </section>

      <PersonalityProfile type={type} />

      <TypeWorld code={type.code} />

      <section className="result-card" aria-labelledby="best-matches">
        <h2 id="best-matches">Best matches for {type.code}</h2>
        <p>By our compatibility model, these types click best with {type.name}:</p>
        <div className="match-grid">
          {matches.map(({ code, score }) => (
            <Link key={code} to={`/compatibility/${pairSlug(type.code, code)}`} className="match-card">
              <span className="match-code">{code}</span>
              <span className="match-name">{PERSONALITY_TYPES[code].name}</span>
              <span className="match-score">{score}% match</span>
            </Link>
          ))}
        </div>
        <p className="match-more">
          <Link to={`/compatibility?a=${type.code.toLowerCase()}`}>Check {type.code} compatibility with any type →</Link>
        </p>
      </section>
    </div>
  );
};

export default TypePage;
