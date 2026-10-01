import React, { useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router';
import { PERSONALITY_TYPES } from '../data/personalityTypes';
import { questions } from '../data/questions';
import { saveTestResult } from '../firebase/config';
import { getAnimalImage } from '../utils/images';
import { buildMeta } from '../utils/seo';
import '../styles/ResultsPage.css';

export const meta = () =>
  buildMeta({
    title: 'Your Personality Test Result | TrueYouTeller',
    description: 'See your 16-type personality result and spirit animal from the free TrueYouTeller personality test.',
    path: '/results',
    noindex: true,
  });

const ResultsPage = () => {
  const location = useLocation();
  const { answers, name } = location.state || { answers: [], name: '' };
  const hasSaved = useRef(false);

  const calculateResult = () => {
    if (answers.length !== questions.length) {
      return null;
    }

    const scores = { IE: 0, SN: 0, TF: 0, JP: 0 };

    questions.forEach((question, index) => {
      const answerValue = answers[index];
      question.mapping.forEach(map => {
        scores[map.axis] += answerValue * map.direction;
      });
    });

    const firstLetter = scores.IE >= 0 ? 'E' : 'I';
    const secondLetter = scores.SN >= 0 ? 'N' : 'S';
    const thirdLetter = scores.TF >= 0 ? 'F' : 'T';
    const fourthLetter = scores.JP >= 0 ? 'P' : 'J';

    const resultCode = `${firstLetter}${secondLetter}${thirdLetter}${fourthLetter}`;
    
    return PERSONALITY_TYPES[resultCode];
  };

  const result = calculateResult();

  // Save result to Firebase when component mounts
  useEffect(() => {
    const saveResultToFirebase = async () => {
      if (result && name && answers.length > 0 && !hasSaved.current) {
        hasSaved.current = true;
        try {
          await saveTestResult(name, result, answers);
        } catch (error) {
          console.error('Failed to save test result:', error);
          hasSaved.current = false; // Reset on error so it can retry
        }
      }
    };

    saveResultToFirebase();
  }, [result, name, answers]);

  if (!result) {
    return (
      <div className="results-container container section">
        <div className="results-card">
          <h1 className="page-title">Oops!</h1>
          <p>It seems you haven't taken the test yet.</p>
          <Link to="/" className="btn btn-primary">Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="results-container container section">
      <div className="results-card">
        <h1 className="result-name">You are {result.name} ({result.code})</h1>
        <p className="result-description">{result.description}</p>
        <div className="spirit-animal-section">
          <img src={getAnimalImage(result.spiritAnimal)} alt={result.spiritAnimal} className="spirit-animal-image" />
          <h3>Your Spirit Animal is the {result.spiritAnimal}</h3>
          <p>{result.reason}</p>
        </div>
        <div className="results-buttons-container">
          <Link to="/test" className="btn">Take the Test Again</Link>
          <Link to="/detailed-results" state={{ result }} className="btn btn-primary">View Detailed Results</Link>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage; 