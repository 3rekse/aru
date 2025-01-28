
export interface QuizData {
    quiz: Question[];
}

export interface Question {
    domanda: string;
    risposte: string[];
    id: number;
    svg: string;
    risposta_corretta: string;
}