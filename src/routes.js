import { index, route } from '@react-router/dev/routes';

export default [
  index('pages/LandingPage.jsx'),
  route('test', 'pages/TestPage.jsx'),
  route('result/:type', 'pages/ResultPage.jsx'),
  route('types', 'pages/TypesHubPage.jsx'),
  route('types/:type', 'pages/TypePage.jsx'),
  route('compatibility', 'pages/CompatibilityPage.jsx', { id: 'compatibility' }),
  route('compatibility/:pair', 'pages/CompatibilityPage.jsx', { id: 'compatibility-pair' }),
  route('results', 'pages/LegacyResultsRedirect.jsx', { id: 'legacy-results' }),
  route('detailed-results', 'pages/LegacyResultsRedirect.jsx', { id: 'legacy-detailed-results' }),
  route('about', 'pages/AboutUsPage.jsx'),
  route('contact', 'pages/ContactUsPage.jsx'),
  route('feedback', 'pages/FeedbackPage.jsx'),
  route('privacy', 'pages/PrivacyPage.jsx'),
  route('*', 'pages/NotFoundPage.jsx'),
];
