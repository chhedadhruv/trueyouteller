import React from 'react';
import { Link } from 'react-router';

// Loading / not found / error states for link-based pages.
const SocialStatus = ({ status, what }) => (
  <div className="container section social-page" role="status">
    {status === 'loading' && <p className="page-loading">Loading…</p>}
    {status === 'missing' && (
      <>
        <h1 className="page-title">This {what} link doesn't exist</h1>
        <p>Double-check the link you were sent, or start your own.</p>
        <Link to="/play" className="btn btn-primary">Play with friends</Link>
      </>
    )}
    {status === 'error' && (
      <>
        <h1 className="page-title">We couldn't load this {what}</h1>
        <p>Check your connection and refresh the page.</p>
      </>
    )}
  </div>
);

export default SocialStatus;
