import { QuizData, Question } from '../components/typeQuestion';

const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };
  
  export const loadQuiz = (mission: string): Question[] => {
    let algorithms: QuizData;
    if (mission === "AL") {
        algorithms = require('./Algoritmi.json') as QuizData;
    } else if (mission === "SI") {
        algorithms = require('./SI.json') as QuizData;
    } else if (mission === "AI") {
        algorithms = require('./AI.json') as QuizData;
    } else {
        throw new Error("Invalid mission type");
    }
    const shuffledQuestions = shuffleArray(algorithms.quiz);
    return shuffledQuestions; // Assuming QuizData has a quiz property of type Question[]
};