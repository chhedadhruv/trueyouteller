import React from 'react';
import { Link } from 'react-router';
import { PERSONALITY_TYPES } from '../data/personalityTypes';
import { getAnimalImage } from '../utils/images';
import { breadcrumbJsonLd, buildMeta, SITE_URL } from '../utils/seo';
import Breadcrumbs from '../components/Breadcrumbs';
import '../styles/TypePages.css';

const GROUPS = [
  { name: 'Analysts', blurb: 'Intuitive thinkers who love ideas, logic and strategy.', codes: ['INTJ', 'INTP', 'ENTJ', 'ENTP'] },
  { name: 'Diplomats', blurb: 'Intuitive feelers driven by empathy, ideals and meaning.', codes: ['INFJ', 'INFP', 'ENFJ', 'ENFP'] },
  { name: 'Sentinels', blurb: 'Observant planners who value duty, order and loyalty.', codes: ['ISTJ', 'ISFJ', 'ESTJ', 'ESFJ'] },
  { name: 'Explorers', blurb: 'Observant free spirits who live for action and experience.', codes: ['ISTP', 'ISFP', 'ESTP', 'ESFP'] },
];

const CRUMBS = [
  { name: 'Home', path: '/' },
  { name: '16 Personality Types', path: '/types' },
];

export const meta = () =>
  buildMeta({
    title: 'The 16 Personality Types Explained (With Spirit Animals) | TrueYouTeller',
    description:
      'Explore all 16 personality types: INTJ, INFP, ENFP, ISTJ and more. Discover each type\'s traits, strengths, careers, compatibility and spirit animal.',
    path: '/types',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'The 16 Personality Types',
        itemListElement: GROUPS.flatMap((g) => g.codes).map((code, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: `${code}: ${PERSONALITY_TYPES[code].name}`,
          url: `${SITE_URL}/types/${code.toLowerCase()}`,
        })),
      },
      breadcrumbJsonLd(CRUMBS),
    ],
  });

const TypesHubPage = () => (
  <div className="container section types-hub">
    <Breadcrumbs items={CRUMBS} />
    <h1 className="page-title">The 16 Personality Types</h1>
    <p className="types-intro">
      Every personality type is a mix of four preferences: where you get your energy (Introversion or Extraversion),
      what you notice (Sensing or Intuition), how you decide (Thinking or Feeling) and how you live (Judging or
      Perceiving). Pick a type to explore it, or <Link to="/test">take the free personality test</Link> to find yours.
    </p>
    {GROUPS.map((group) => (
      <section key={group.name} className="type-group" aria-labelledby={`group-${group.name}`}>
        <h2 id={`group-${group.name}`}>{group.name}</h2>
        <p>{group.blurb}</p>
        <div className="type-grid">
          {group.codes.map((code) => {
            const type = PERSONALITY_TYPES[code];
            return (
              <Link key={code} to={`/types/${code.toLowerCase()}`} className="type-tile">
                <img src={getAnimalImage(type.spiritAnimal)} alt="" loading="lazy" width="96" height="96" />
                <span className="type-tile-code">{code}</span>
                <span className="type-tile-name">{type.name}</span>
                <span className="type-tile-animal">{type.spiritAnimal}</span>
              </Link>
            );
          })}
        </div>
      </section>
    ))}
  </div>
);

export default TypesHubPage;
