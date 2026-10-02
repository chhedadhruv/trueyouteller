import { redirect } from 'react-router';
import { loadLastResult, resultPath } from '../utils/storage';
import { buildMeta } from '../utils/seo';

// Old /results and /detailed-results URLs: send people to their saved result, or to the test.
export const clientLoader = () => {
  const last = loadLastResult();
  return redirect(last?.type ? resultPath(last) : '/test');
};

export const meta = () =>
  buildMeta({
    title: 'Your Personality Test Result | TrueYouTeller',
    description: 'See your personality test result.',
    path: '/test',
    noindex: true,
  });

export default function LegacyResultsRedirect() {
  return null;
}
