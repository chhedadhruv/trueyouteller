import React, { useCallback, useState } from 'react';
import { quizData } from '../../../data/mini-games/friendsQuizData';
import Question from './Question';
import Result from './Result';
import '../../../styles/FriendsQuiz.css';
import friendsImage from '../../../images/miniGames/friends.webp';
import QuizModal from '../QuizModal';

const characterScores = {
  'Monica Geller': 0,
  'Chandler Bing': 0,
  'Phoebe Buffay': 0,
  'Ross Geller': 0,
  'Rachel Green': 0,
  'Joey Tribbiani': 0,
};

const answerMappings = {
  1: { A: ['Ross Geller', 'Monica Geller'], B: ['Joey Tribbiani', 'Rachel Green'], C: ['Chandler Bing'], D: [] },
  2: { A: ['Monica Geller'], B: ['Chandler Bing'], C: ['Joey Tribbiani', 'Rachel Green'], D: ['Ross Geller'] },
  3: { A: ['Ross Geller'], B: ['Joey Tribbiani'], C: ['Phoebe Buffay'], D: ['Monica Geller'] },
  4: { A: ['Ross Geller', 'Monica Geller'], B: ['Rachel Green', 'Joey Tribbiani'], C: ['Monica Geller'], D: ['Joey Tribbiani', 'Chandler Bing'] },
  5: { A: ['Ross Geller', 'Monica Geller'], B: ['Chandler Bing'], C: ['Phoebe Buffay', 'Chandler Bing'], D: ['Monica Geller'] },
  6: { A: ['Monica Geller'], B: ['Joey Tribbiani'], C: ['Monica Geller', 'Joey Tribbiani'], D: ['Ross Geller'] },
  7: { A: ['Rachel Green'], B: ['Joey Tribbiani'], C: ['Phoebe Buffay'], D: ['Joey Tribbiani'] },
  8: { A: ['Rachel Green'], B: ['Monica Geller'], C: ['Ross Geller', 'Chandler Bing'], D: ['Ross Geller'] },
  9: { A: ['Monica Geller'], B: ['Rachel Green', 'Joey Tribbiani'], C: ['Phoebe Buffay'], D: ['Ross Geller'] },
  10: { A: ['Chandler Bing'], B: ['Joey Tribbiani'], C: ['Phoebe Buffay'], D: ['Monica Geller'] },
};

const FriendsQuiz = () => {
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState(characterScores);
  const [result, setResult] = useState(null);

  const handleAnswer = (value) => {
    const questionId = quizData.questions[currentQuestionIndex].id;
    const charactersToScore = answerMappings[questionId][value];
    
    const newScores = { ...scores };
    charactersToScore.forEach(char => {
      newScores[char] += 1;
    });
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
            <img src={friendsImage} alt="Friends Cast" className="quiz-image" loading="lazy" />
        </div>
        <div className="quiz-content">
          <h2 className="quiz-title">Which FRIENDS Character Are You?</h2>
          <p className="quiz-description">
            Ever wondered which of the iconic FRIENDS characters you're most like? Take this quiz to find out!
          </p>
          <button className="start-quiz-btn" onClick={() => setIsQuizStarted(true)}>
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <QuizModal title="Which FRIENDS Character Are You?" onClose={closeQuiz}>
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

export default FriendsQuiz; 