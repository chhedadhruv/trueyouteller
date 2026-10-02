import React from 'react';
import { FaStar, FaBriefcase, FaHeart, FaUsers, FaFilm } from 'react-icons/fa';
import { getCelebrityImage } from '../utils/images';
import '../styles/DetailedResultsPage.css';

const renderList = (items) => (
  <ul>
    {items.map((item, index) => <li key={index}>{item}</li>)}
  </ul>
);

// Full write-up for one personality type (an entry of PERSONALITY_TYPES).
const PersonalityProfile = ({ type }) => (
    <>
      {/* Personality Overview */}
      <div className="result-card">
        <h2><FaStar /> Personality Overview</h2>
        <p><strong>Personality Traits:</strong> {type.personalityTraits}</p>
        <div className="card-subsection">
          <h3>Personal Growth</h3>
          <p>{type.personalGrowth}</p>
        </div>
        <div className="card-subsection columns">
          <div>
            <h4>Strengths</h4>
            {renderList(type.strengthsWeaknesses.strengths)}
          </div>
          <div>
            <h4>Weaknesses</h4>
            {renderList(type.strengthsWeaknesses.weaknesses)}
          </div>
        </div>
        <div className="card-subsection columns">
            <div>
                <h4>What Energizes You</h4>
                <p>{type.whatEnergizesYou}</p>
            </div>
            <div>
                <h4>What Drains You</h4>
                <p>{type.whatDrainsYou}</p>
            </div>
        </div>
      </div>

      {/* Career Insights */}
      <div className="result-card">
        <h2><FaBriefcase /> Career Insights</h2>
        <p>{type.careerInsights.careerPath}</p>
         <div className="card-subsection columns">
          <div>
            <h4>Strengths in Career</h4>
            {renderList(type.careerInsights.careerStrengthsWeaknesses.strengths)}
          </div>
          <div>
            <h4>Weaknesses in Career</h4>
            {renderList(type.careerInsights.careerStrengthsWeaknesses.weaknesses)}
          </div>
        </div>
        <div className="card-subsection">
            <h3>Career Ideas You Might Love</h3>
            <div className="tags-container">
                {type.careerInsights.careerIdeas.map(idea => <span className="tag" key={idea}>{idea}</span>)}
            </div>
        </div>
        <div className="card-subsection">
          <h3>Workspace Habits</h3>
          <p>{type.careerInsights.workspaceHabits}</p>
        </div>
      </div>

      {/* Relationships & Connections */}
      <div className="result-card">
        <h2><FaHeart /> Relationships & Connections</h2>
        <p>{type.relationshipsConnections.yourRelationships}</p>
        <div className="card-subsection columns">
          <div>
            <h4>Relationship Superpowers</h4>
            {renderList(type.relationshipsConnections.relationshipStrengthsWeaknesses.strengths)}
          </div>
          <div>
            <h4>Relationship Pitfalls</h4>
            {renderList(type.relationshipsConnections.relationshipStrengthsWeaknesses.weaknesses)}
          </div>
        </div>
         <div className="card-subsection">
          <h3>Your Love Language Tendencies</h3>
          <p>{type.relationshipsConnections.yourLoveLanguage}</p>
        </div>
      </div>
      
      {/* Social Circles & Family Life */}
       <div className="result-card">
        <h2><FaUsers /> Social Circles & Family Life</h2>
        <div className="card-subsection">
            <h3>Friendships</h3>
            <p>{type.socialCirclesFamilyLife.friendships.description}</p>
            <div className="strengths-weaknesses-container">
                <div>
                    <h4>Strengths:</h4>
                    <ul>
                        {type.socialCirclesFamilyLife.friendships.strengths.map(item => <li key={item}>{item}</li>)}
                    </ul>
                </div>
                <div>
                    <h4>Weaknesses:</h4>
                    <ul>
                        {type.socialCirclesFamilyLife.friendships.weaknesses.map(item => <li key={item}>{item}</li>)}
                    </ul>
                </div>
            </div>
        </div>
        <div className="card-subsection">
            <h3>Parenthood</h3>
            <p>{type.socialCirclesFamilyLife.parenthood.description}</p>
            <div className="strengths-weaknesses-container">
                <div>
                    <h4>Strengths:</h4>
                    <ul>
                        {type.socialCirclesFamilyLife.parenthood.strengths.map(item => <li key={item}>{item}</li>)}
                    </ul>
                </div>
                <div>
                    <h4>Weaknesses:</h4>
                    <ul>
                        {type.socialCirclesFamilyLife.parenthood.weaknesses.map(item => <li key={item}>{item}</li>)}
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
            {type.culturalConnections.famousMatches.map(match => (
                <div className="celebrity-card" key={match}>
                    <img
                        src={getCelebrityImage(type.code, match)}
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
    </>
);

export default PersonalityProfile;
