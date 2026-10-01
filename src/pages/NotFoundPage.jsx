import { data } from 'react-router';

// Throwing a 404 renders the root ErrorBoundary with the "page not found" message.
export const clientLoader = () => {
  throw data(null, { status: 404 });
};

export default function NotFoundPage() {
  return null;
}
