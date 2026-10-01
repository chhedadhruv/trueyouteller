import friends from './friends.js';
import insideOut from './insideOut.js';
import hogwarts from './hogwarts.js';
import marvel from './marvel.js';
import element from './element.js';

// All mini-quizzes, in the order shown on the site.
export const QUIZZES = [hogwarts, marvel, friends, insideOut, element];

export const getQuiz = (slug) => QUIZZES.find((quiz) => quiz.slug === slug);
