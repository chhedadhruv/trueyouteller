import React from 'react';
import { spotifyLink, TYPE_WORLD } from '../data/typeWorld';
import '../styles/Cards.css';

// "Your type's world" section for result and type pages.
const TypeWorld = ({ code, isYou = false }) => {
  const world = TYPE_WORLD[code];
  if (!world) return null;
  return (
    <section className="result-card type-world" aria-labelledby={`world-${code}`}>
      <h2 id={`world-${code}`}>{isYou ? 'Your' : `The ${code}`} world 🌍</h2>
      <div className="type-world-grid">
        <div className="type-world-item">
          <h3>🎬 Watch list</h3>
          <ul>
            {world.watch.map((title) => (
              <li key={title}>{title}</li>
            ))}
          </ul>
        </div>
        <div className="type-world-item">
          <h3>🎭 Character twin</h3>
          <p>{world.twin}</p>
          <p className="type-world-note">A fun fan-style match, not an official typing.</p>
        </div>
        <div className="type-world-item">
          <h3>💼 Dream work day</h3>
          <p>{world.dreamDay}</p>
        </div>
        <div className="type-world-item">
          <h3>☀️ Perfect weekend</h3>
          <p>{world.weekend}</p>
        </div>
      </div>
      <a className="btn type-world-spotify" href={spotifyLink(code)} target="_blank" rel="noopener noreferrer">
        🎧 Find {code} playlists on Spotify
      </a>
    </section>
  );
};

export default TypeWorld;
