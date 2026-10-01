import React, { useCallback, useState } from 'react';
import { quizData } from '../../../data/mini-games/insideOutQuizData';
import Question from './Question';
import Result from './Result';
import insideOutImage from '../../../images/miniGames/insideout.webp';
import QuizModal from '../QuizModal';
import '../../../styles/InsideOutQuiz.css';

const characterScores = {
  'Joy': 0,
  'Sadness': 0,
  'Anger': 0,
  'Fear': 0,
  'Disgust': 0,
  'Anxiety': 0,
  'Envy': 0,
  'Ennui': 0,
  'Embarrassment': 0,
};

const InsideOutQuiz = () => {
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState(characterScores);
  const [result, setResult] = useState(null);

  const handleAnswer = (value) => {
    const newScores = { ...scores };
    newScores[value] += 1;
    setScores(newScores);

    if (currentQuestionIndex < quizData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateResult(newScores);
    }
  };

  const calculateResult = (finalScores) => {
    const winner = Object.keys(finalScores).reduce((a, b) =>
        finalScores[a] > finalScores[b] ? a : b
    );
    setResult(quizData.results[winner]);
  };

  const restartQuiz = () => {
    setIsQuizStarted(true);
    setCurrentQuestionIndex(0);
    setScores(characterScores);
    setResult(null);
  }

  const closeQuiz = useCallback(() => setIsQuizStarted(false), []);

  if (!isQuizStarted) {
    return (
      <div className="friends-quiz-card">
        <div className="quiz-image-container">
            <img src={insideOutImage} alt="Inside Out Cast" className="quiz-image" loading="lazy" />
        </div>
        <div className="quiz-content">
          <h2 className="quiz-title">Which Inside Out Character Are You?</h2>
          <p className="quiz-description">
            Ever wondered which of the emotional characters from Inside Out you're most like? Take this quiz to find out!
          </p>
          <button className="start-quiz-btn" onClick={() => setIsQuizStarted(true)}>
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <QuizModal title="Which Inside Out Character Are You?" onClose={closeQuiz}>
        {result ? (
          <>
            <Result result={result} />
            <button className="start-quiz-btn" onClick={restartQuiz} style={{marginTop: '20px'}}>
              Retake Quiz
            </button>
          </>
        ) : (
          <Question
            question={quizData.questions[currentQuestionIndex]}
            onAnswer={handleAnswer}
          />
        )}
    </QuizModal>
  );
};

export default InsideOutQuiz; 