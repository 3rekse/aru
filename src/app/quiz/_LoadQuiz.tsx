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
    if (mission === "IT") {
        algorithms = require('./It/IT.json') as QuizData;
    } else if (mission === "HW") {
        algorithms = require('./It/HW.json') as QuizData;
    } else if (mission === "SW") {
        algorithms = require('./It/SW.json') as QuizData;
    } else if (mission === "AL") {
        algorithms = require('./AL.json') as QuizData;
    } else if (mission === "SI") {
        algorithms = require('./SI.json') as QuizData;
    } else if (mission === "AI") {
        algorithms = require('./AI.json') as QuizData;
    } else if (mission === "MOBILE") {
        algorithms = require('./Mobile.json') as QuizData;
    } else if (mission === "WEB") {
        algorithms = require('./WEB.json') as QuizData;
    } else if (mission === "Reti") {
        algorithms = require('./Reti.json') as QuizData;
    } else if (mission === "RetiA1") {
        algorithms = require('./Reti/A1-ISO_OSI.json') as QuizData;
    } else if (mission === "RetiA2") {
        algorithms = require('./Reti/A2-protocolli.json') as QuizData;
    } else if (mission === "RetiA3") {
        algorithms = require('./Reti/A3-IP.json') as QuizData;
    } else if (mission === "Sistemi1") {
        algorithms = require('./Reti/B1-SOconf.json') as QuizData;
    } else if (mission === "Sistemi2") {
        algorithms = require('./Reti/B2-SOuser.json') as QuizData;
    } else if (mission === "Sistemi3") {
        algorithms = require('./Reti/B3-SOadm.json') as QuizData;
    } else if (mission === "RetiC1") {
        algorithms = require('./Reti/C1-RetiConf.json') as QuizData;
    } else if (mission === "RetiC2") {
        algorithms = require('./Reti/C2-lan.json') as QuizData;
    } else if (mission === "RetiC3") {
        algorithms = require('./Reti/C3-VPN.json') as QuizData;
    } else if (mission === "RetiD1") {
        algorithms = require('./Reti/D1-SOadmin.json') as QuizData;
    } else if (mission === "RetiD2") {
        algorithms = require('./Reti/D2-rout.json') as QuizData;
    } else if (mission === "RetiD3") {
        algorithms = require('./Reti/D3-switch.json') as QuizData;
    } else if (mission === "RetiD4") {
        algorithms = require('./Reti/D4-wireless.json') as QuizData;
    } else {
        throw new Error("Invalid mission type");
    }
    const shuffledQuestions = shuffleArray(algorithms.quiz);
    return shuffledQuestions; // Assuming QuizData has a quiz property of type Question[]
};