import React from 'react';
import { Link } from 'react-router';
import friendsImage from '../images/miniGames/friends.webp';
import insideOutImage from '../images/miniGames/insideout.webp';

// Quizzes with artwork; the others get an emoji banner.
const IMAGES = { friends: friendsImage, 'inside-out': insideOutImage };

const QuizCard = ({ quiz, headingLevel = 'h3' }) => {
  const Heading = headingLevel;
  const image = IMAGES[quiz.slug];
  return (
    <Link to={`/quizzes/${quiz.slug}`} className={`quiz-card quiz-theme-${quiz.slug}`}>
      <div className="quiz-card-banner">
        {image ? (
          <img src={image} alt="" loading="lazy" width="800" height="400" />
        ) : (
          <span className="quiz-card-emoji" aria-hidden="true">{quiz.emoji}</span>
        )}
      </div>
      <div className="quiz-card-body">
        <Heading className="quiz-card-title">{quiz.title}</Heading>
        <p>{quiz.description}</p>
        <span className="quiz-card-meta">
          {quiz.questions.length} questions · {Object.keys(quiz.outcomes).length} results
        </span>
        <span className="btn btn-primary quiz-card-cta">Start quiz</span>
      </div>
    </Link>
  );
};

export default QuizCard;
