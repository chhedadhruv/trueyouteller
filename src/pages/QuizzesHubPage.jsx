import React from 'react';
import { Link } from 'react-router';
import { QUIZZES } from '../data/quizzes';
import { breadcrumbJsonLd, buildMeta, SITE_URL } from '../utils/seo';
import Breadcrumbs from '../components/Breadcrumbs';
import QuizCard from '../components/QuizCard';
import '../styles/Quiz.css';

const CRUMBS = [
  { name: 'Home', path: '/' },
  { name: 'Fun Quizzes', path: '/quizzes' },
];

export const meta = () =>
  buildMeta({
    title: 'Fun Personality Quizzes: Hogwarts, Marvel, FRIENDS & More | TrueYouTeller',
    description:
      'Free fun personality quizzes: find your Hogwarts house, Marvel hero, FRIENDS character, Inside Out emotion and element. Instant results you can share.',
    path: '/quizzes',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Fun Personality Quizzes',
        itemListElement: QUIZZES.map((quiz, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: quiz.title,
          url: `${SITE_URL}/quizzes/${quiz.slug}`,
        })),
      },
      breadcrumbJsonLd(CRUMBS),
    ],
  });

const QuizzesHubPage = () => (
  <div className="container section quizzes-hub">
    <Breadcrumbs items={CRUMBS} />
    <h1 className="page-title">Fun Personality Quizzes</h1>
    <p className="types-intro">
      Quick, playful quizzes with instant results to share with friends. Want the deep dive? Take the full{' '}
      <Link to="/test">16-type personality test</Link>.
    </p>
    <div className="quiz-grid">
      {QUIZZES.map((quiz) => (
        <QuizCard key={quiz.slug} quiz={quiz} headingLevel="h2" />
      ))}
    </div>
  </div>
);

export default QuizzesHubPage;
