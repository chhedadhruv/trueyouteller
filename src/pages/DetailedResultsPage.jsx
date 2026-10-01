import React from 'react';
import { useLocation, Link } from 'react-router';
import '../styles/DetailedResultsPage.css';
import { FaStar, FaBriefcase, FaHeart, FaUsers, FaFilm } from 'react-icons/fa';
import { getAnimalImage, getCelebrityImage } from '../utils/images';
import { buildMeta } from '../utils/seo';

export const meta = () =>
  buildMeta({
    title: 'Your Detailed Personality Profile | TrueYouTeller',
    description: 'Your detailed personality profile: strengths, weaknesses, career insights, relationships and famous matches.',
    path: '/detailed-results',
    noindex: true,
  });

const DetailedResultsPage = () => {
  const location = useLocation();
  const { result } = location.state || {};

  if (!result) {
    return (
      <div className="container section">
        <h1 className="page-title">Oops! No result found.</h1>
        <p>It seems you've accessed this page directly. Please take the test first to see your results.</p>
        <Link to="/" className="btn btn-primary">Back to Home</Link>
      </div>
    );
  }

  const renderList = (items) => (
    <ul>
      {items.map((item, index) => <li key={index}>{item}</li>)}
    </ul>
  );

  return (
    <div className="detailed-results-page container section">
      <header className="detailed-header">
        <img src={getAnimalImage(result.spiritAnimal)} alt={result.spiritAnimal} className="spirit-animal-image-detailed" />
        <h1>{result.name} ({result.code})</h1>
        <p className="detailed-header-description">{result.description}</p>
      </header>

      {/* Personality Overview */}
      <div className="result-card">
        <h2><FaStar /> Personality Overview</h2>
        <p><strong>Personality Traits:</strong> {result.personalityTraits}</p>
        <div className="card-subsection">
          <h3>Personal Growth</h3>
          <p>{result.personalGrowth}</p>
        </div>
        <div className="card-subsection columns">
          <div>
            <h4>Strengths</h4>
            {renderList(result.strengthsWeaknesses.strengths)}
          </div>
          <div>
            <h4>Weaknesses</h4>
            {renderList(result.strengthsWeaknesses.weaknesses)}
          </div>
        </div>
        <div className="card-subsection columns">
            <div>
                <h4>What Energizes You</h4>
                <p>{result.whatEnergizesYou}</p>
            </div>
            <div>
                <h4>What Drains You</h4>
                <p>{result.whatDrainsYou}</p>
            </div>
        </div>
      </div>

      {/* Career Insights */}
      <div className="result-card">
        <h2><FaBriefcase /> Career Insights</h2>
        <p>{result.careerInsights.careerPath}</p>
         <div className="card-subsection columns">
          <div>
            <h4>Strengths in Career</h4>
            {renderList(result.careerInsights.careerStrengthsWeaknesses.strengths)}
          </div>
          <div>
            <h4>Weaknesses in Career</h4>
            {renderList(result.careerInsights.careerStrengthsWeaknesses.weaknesses)}
          </div>
        </div>
        <div className="card-subsection">
            <h3>Career Ideas You Might Love</h3>
            <div className="tags-container">
                {result.careerInsights.careerIdeas.map(idea => <span className="tag" key={idea}>{idea}</span>)}
            </div>
        </div>
        <div className="card-subsection">
          <h3>Workspace Habits</h3>
          <p>{result.careerInsights.workspaceHabits}</p>
        </div>
      </div>

      {/* Relationships & Connections */}
      <div className="result-card">
        <h2><FaHeart /> Relationships & Connections</h2>
        <p>{result.relationshipsConnections.yourRelationships}</p>
        <div className="card-subsection columns">
          <div>
            <h4>Relationship Superpowers</h4>
            {renderList(result.relationshipsConnections.relationshipStrengthsWeaknesses.strengths)}
          </div>
          <div>
            <h4>Relationship Pitfalls</h4>
            {renderList(result.relationshipsConnections.relationshipStrengthsWeaknesses.weaknesses)}
          </div>
        </div>
         <div className="card-subsection">
          <h3>Your Love Language Tendencies</h3>
          <p>{result.relationshipsConnections.yourLoveLanguage}</p>
        </div>
      </div>
      
      {/* Social Circles & Family Life */}
       <div className="result-card">
        <h2><FaUsers /> Social Circles & Family Life</h2>
        <div className="card-subsection">
            <h3>Friendships</h3>
            <p>{result.socialCirclesFamilyLife.friendships.description}</p>
            <div className="strengths-weaknesses-container">
                <div>
                    <h4>Strengths:</h4>
                    <ul>
                        {result.socialCirclesFamilyLife.friendships.strengths.map(item => <li key={item}>{item}</li>)}
                    </ul>
                </div>
                <div>
                    <h4>Weaknesses:</h4>
                    <ul>
                        {result.socialCirclesFamilyLife.friendships.weaknesses.map(item => <li key={item}>{item}</li>)}
                    </ul>
                </div>
            </div>
        </div>
        <div className="card-subsection">
            <h3>Parenthood</h3>
            <p>{result.socialCirclesFamilyLife.parenthood.description}</p>
            <div className="strengths-weaknesses-container">
                <div>
                    <h4>Strengths:</h4>
                    <ul>
                        {result.socialCirclesFamilyLife.parenthood.strengths.map(item => <li key={item}>{item}</li>)}
                    </ul>
                </div>
                <div>
                    <h4>Weaknesses:</h4>
                    <ul>
                        {result.socialCirclesFamilyLife.parenthood.weaknesses.map(item => <li key={item}>{item}</li>)}
                    </ul>
                </div>
            </div>
        </div>
      </div>

      {/* Cultural Connections */}
       <div className="result-card">
        <h2><FaFilm /> Cultural Connections</h2>
        <p>For fun, here are some famous celebrities or fictional characters that may share your personality type. This is just for illustrative purposes!</p>
        <div className="famous-matches-container">
            {result.culturalConnections.famousMatches.map(match => (
                <div className="celebrity-card" key={match}>
                    <img
                        src={getCelebrityImage(result.code, match)}
                        alt={match}
                        className="celebrity-image"
                        loading="lazy"
                        width="360"
                        height="540"
                    />
                    <p className="celebrity-name">{match}</p>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default DetailedResultsPage; 