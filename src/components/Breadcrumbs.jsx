import React from 'react';
import { Link } from 'react-router';

// items: [{ name, path }], last item is the current page.
const Breadcrumbs = ({ items }) => (
  <nav aria-label="Breadcrumb" className="breadcrumbs">
    <ol>
      {items.map((item, i) => (
        <li key={item.path}>
          {i === items.length - 1 ? (
            <span aria-current="page">{item.name}</span>
          ) : (
            <Link to={item.path}>{item.name}</Link>
          )}
        </li>
      ))}
    </ol>
  </nav>
);

export default Breadcrumbs;
