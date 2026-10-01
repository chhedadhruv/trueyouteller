import { index, route } from '@react-router/dev/routes';

export default [
  index('pages/LandingPage.jsx'),
  route('test', 'pages/TestPage.jsx'),
  route('results', 'pages/ResultsPage.jsx'),
  route('detailed-results', 'pages/DetailedResultsPage.jsx'),
  route('about', 'pages/AboutUsPage.jsx'),
  route('contact', 'pages/ContactUsPage.jsx'),
  route('feedback', 'pages/FeedbackPage.jsx'),
  route('privacy', 'pages/PrivacyPage.jsx'),
  route('*', 'pages/NotFoundPage.jsx'),
];
