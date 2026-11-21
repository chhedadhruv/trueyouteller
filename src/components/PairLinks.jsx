import React from 'react';
import { Link } from 'react-router';
import { pairSlug, TYPE_CODES } from '../data/compatibility';

// Plain crawlable links to every pair page for one type (16 including itself).
export const TypePairLinks = ({ code }) => (
  <ul className="pair-links">
    {TYPE_CODES.map((other) => (
      <li key={other}>
        <Link to={`/compatibility/${pairSlug(code, other)}`}>
          {code} &amp; {other}
        </Link>
      </li>
    ))}
  </ul>
);

// Every pair page, grouped by first type, so crawlers reach all of them from /compatibility.
export const AllPairLinks = () => (
  <>
    {TYPE_CODES.map((code, i) => (
      <div key={code} className="pair-group">
        <h3>
          <Link to={`/types/${code.toLowerCase()}`}>{code}</Link> pairings
        </h3>
        <ul className="pair-links">
          {TYPE_CODES.slice(i).map((other) => (
            <li key={other}>
              <Link to={`/compatibility/${pairSlug(code, other)}`}>
                {code} &amp; {other}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </>
);
