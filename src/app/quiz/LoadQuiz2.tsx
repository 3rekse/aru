import { QuizData, Question } from '../components/typeQuestion';

const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

   
export async function loadQuiz2(mission: string, verifica: string, extraT: boolean): Promise<Question[]> {
  const basePath1 = `./quiz/${mission}/${mission}.json`; // Primo file
  const basePath2 = `./quiz/${mission}/${mission}V.json`; // Secondo file (esempio: aggiungi _extra)
 // console.log('extraT: ', extraT);

  // Carica il primo file
  const response1 = await fetch(basePath1);
  if (!response1.ok) {
    throw new Error(`Prova non prevista per : ${mission}`);
  }
  
  const algorithms1 = await response1.json();
  let algorithms2: { quiz: Question[] } = { quiz: [] }
  if (verifica) {
    // Carica il secondo file (se esiste)
   
    try {
      const response2 = await fetch(basePath2);
      if (response2.ok) {
        algorithms2 = await response2.json();
      //   console.log("Caricate domande: ", algorithms2.quiz.length);
        if (extraT) {
         algorithms2.quiz = shuffleArray(algorithms2.quiz as Question[]).slice(0, Math.floor(algorithms2.quiz.length * 0.9));
        //console.log("Caricate domande extraT: ", algorithms2.quiz.length);
      }
      }
    } catch (e) {
      // Se il secondo file non esiste o dà errore, ignora
    }
  }
  const shuffledQuestions = shuffleArray([
    ...(algorithms1.quiz as Question[]),
    ...(algorithms2.quiz as Question[])
    ]);
// console.log("Caricate domande: ", shuffledQuestions.length);
    // Aggiungi le domande extraT se necessari
  return shuffledQuestions;
}