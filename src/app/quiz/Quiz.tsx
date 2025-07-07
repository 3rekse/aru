'use client'
import React, { useState, useEffect,  useRef } from 'react';

// import algorithms from './Algoritmi.json';
//const algorithms = mission === "AL" ? require('./Algoritmi.json') : require('./SI.json');
import styles from "../page.module.css";
import jsPDF from 'jspdf';
import '../Doto.js'; // Questo importa il font personalizzato

import {  Question } from '../components/typeQuestion';
import { loadQuiz } from './LoadQuiz';

interface QuizProps {
    mission: string;
    missionD: string;
   // domande: Question[];
    classe: string;
    nome: string;
    cognome:  string;
    extaT: boolean;
    verifica: string;
}

const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };
  

const QuizC: React.FC<QuizProps> = ({ mission, missionD, classe, nome, cognome, extaT, verifica }) => {
    const [domande, setDomande] = useState<Question[]>([]);
    const dataOrainizio = new Date();
    const [numDomande,setNumDomande] = useState(0);

    useEffect(() => {
        const fetchDomande = async () => {
            const loadedDomande = await loadQuiz(mission,verifica,extaT);
            setDomande(loadedDomande);
            setNumDomande(loadedDomande.length);
            // Imposta la prima domanda come oggetto iniziale
        if (loadedDomande.length > 0) {
          setDomanda({
              domanda: loadedDomande[0].id + " " + loadedDomande[0].domanda,
              risposte: shuffleArray(loadedDomande[0].risposte),
              id: loadedDomande[0].id,
              svg: loadedDomande[0].svg,
              risposta_corretta: loadedDomande[0].risposta_corretta,
          });
        }  
        };
        fetchDomande();
        
    }, [mission]);
    
   // const missionD = missionDescriptions[mission] || " ";
    const [IDomanda, setIDomanda] = useState(0);
    const [correct, setCorrect] = useState(0);
    const [error, setError] = useState(0);
    const [fine, setFine] = useState(false);
    const [allDomande, setAllDomande] = useState(true);
    const [responseMessage, setResponseMessage] = useState('Save Certificate');
    const [domanda, setDomanda] =
    useState<Question>({
        domanda: "",
        risposte: [],
        id: 0,
        svg: "",
        risposta_corretta: ""
    });
    const domandaNum = (i: number) => {
      setIDomanda(i);
                    setDomanda ({
                      domanda: domande[i].id+" "+domande[i].domanda,
                      risposte: shuffleArray(domande[i].risposte),
                      id: domande[i].id,
                      svg: domande[i].svg,
                      risposta_corretta: domande[i].risposta_corretta
                  });
    }
      const handleNextQuestion = (selectedAnswer: string) => {
      let ok=correct;
      let ko=error;
    
      console.log('IDomanda',IDomanda);
      console.log('numDomande',numDomande);
      if (allDomande) {
      if (selectedAnswer){
            
        if (selectedAnswer === domande[IDomanda].risposta_corretta) 
            {   domande[IDomanda].svg = " ✅ " + selectedAnswer;
                ok++;
                setCorrect(ok);   
            }
        else
            {   domande[IDomanda].svg = " ❌ " + selectedAnswer;
                setError(++ko);
            }
        }
      if (numDomande <= IDomanda+1) { 
        if (verifica!== "")
          registra(ok,ko); 
        stopTimer(); 
        setFine(true);  
      }   
      else{
        const nextIndex = IDomanda + 1;
        domandaNum(nextIndex);
      }
    } else {
      console.log(domanda.risposta_corretta);
      console.log('numDomande',numDomande);
      if (selectedAnswer === domanda.risposta_corretta) 
        {  domande[IDomanda].svg = " ✅ " + selectedAnswer+ domande[IDomanda].svg;
          let i = IDomanda+1;
          for (;i<numDomande ;i++) 
              if (domande[i].svg.substring(0, 3) === " ❌ "){
                console.log(i);
                domandaNum(i);  
                      break;
              }
          if (numDomande === i) {
              setFine(true);  
            }   
        }

        else
        {   domande[IDomanda].svg = " ❌ " + domande[IDomanda].svg;}
      
      }

    };
    
  
    
    const [isClient, setIsClient] = useState(false)
    const registra  = async (ok: number, ko: number) => {
     
      console.log('Registra');
      const quiz = domande.map((item: any) => ({
      id: item.id,
      domanda: item.domanda,
      svg: item.svg,
      }));
      const prove = [
      { mission: mission,
        nome: nome,
        cognome: cognome,
        classe: classe,
        voto: Math.floor((10 * ok / numDomande) * 4) / 4,
        dataorainizio: dataOrainizio,
        inizio: dataOrainizio.toLocaleString(),
        durata: new Date().getTime() - dataOrainizio.getTime(),
        giuste: ok,
        sbagliate: ko,
        quiz,
      }]
      try {
      const response = await fetch(`/api/registro?mission=${mission}&classe=${classe}`, {
      //const response = await fetch(`/api/dropbox/registro?mission=${mission}&classe=${classe}`, {

        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(prove)
      });
    
      const data = await response.json();
      if (response.ok) {
        setResponseMessage('Saved '+data.message);
      } else {
        setResponseMessage(data.error || 'Errore sconosciuto');
      }
      } catch (error) {
      setResponseMessage('Errore nella connessione con il server');
      }
    };

    const rivedi = () => {
      setFine(false)
      setAllDomande(false);
      let i=0
      for (;i<numDomande ;i++) 
        if (domande[i].svg.substring(0, 3) !== " ✅ "){    
              console.log("Salta a",i);
              domandaNum(i);
                break;
        }
      if (numDomande === i) {
          setFine(true);  
        }
    
    };

    const certifica = async () => {
        /**
         * Initializes a new jsPDF document with the specified configuration.
         * The document is set to landscape orientation, uses millimeters as the unit of measurement,
         * and is formatted to A4 size.
         */
        const points = Math.floor((10 * correct / numDomande) * 4) / 4;

        const doc = new jsPDF({
          orientation: 'landscape',
          unit: 'mm',
          format: 'a4'
        });
        doc.setFillColor(255, 215, 0); // Gold color
        doc.rect(0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight(), 'F');
        doc.setFillColor(173, 216, 230); // Light blue color
        doc.rect(5, 5, doc.internal.pageSize.getWidth()-10, doc.internal.pageSize.getHeight()-10, 'F');
    
        doc.setProperties({
          title: 'Mission ${mission} Certificate',
          subject: 'Certificate of Completion',
          author: 'Omarillo Binary Arithmetic',
        });
    
        // Imposta il font personalizzato
        doc.setFont('Doto'); // Nome del font generato
        doc.setFontSize(30);
    
        // Titolo del certificato
        doc.text('Certificato di Partecipazione A.S.: 2025/26', 105, 40, { align: 'center' });
    
        // Dettagli del certificato
        doc.setFontSize(20);
        doc.text('Questo certificato attesta che', 105, 60, { align: 'center' });
    
        // Nome del partecipante
        doc.setFontSize(26);
        doc.text(`${nome} ${cognome}`, 105, 80, { align: 'center' });
        doc.setFontSize(18);

        doc.text(`Istritto nella classe: ${classe}`, 105, 100, { align: 'center' });
        // Dettagli aggiuntivi
       
        doc.text(`ha completato il test IT Dictionary su: ${missionD} `, 105, 115, { align: 'center' });
        doc.text(`Inizio Test: ${dataOrainizio.toLocaleString()} del corso di: TECNOLOGIE INFORMATICHE`, 145, 130, { align: 'center' });
        doc.text(`Con punteggio ${points} `, 105, 150, { align: 'center' });
        doc.setFontSize(16);

        // Data e firma
        const giorno = new Date().toLocaleDateString('it-IT', { day: '2-digit', month: 'long', year: 'numeric' });
        
        doc.text(`Data: ${giorno}`, 50, 170);
        doc.text('Fabrizio Bonfiglio', 200, 170);
        doc.setFontSize(10);
        doc.text((extaT ? 'In modalità extra Time ' : ''),20,200);
        
        doc.addPage();
         doc.setFillColor(255, 215, 0); // Gold color
        doc.rect(0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight(), 'F');
        doc.setFillColor(173, 216, 230); // Light blue color
        doc.rect(5, 5, doc.internal.pageSize.getWidth()-10, doc.internal.pageSize.getHeight()-10, 'F');

        doc.setFont('times', 'normal');   
        doc.text(`Omarillo Certificate Levels of IT DICTIONARY Completion ${missionD}`, 15, 15);
        const pageWidth = doc.internal.pageSize.getWidth();
        const text = `Name: ${nome} ${cognome} \tClass: ${classe} Points ${points}`;
        const textWidth = doc.getTextWidth(text);
        const x = (pageWidth - textWidth) / 2;
        doc.text(text, x, 25);
        
        const currentDate = new Date();
        const dateString = currentDate.toLocaleDateString();
        const timeString = currentDate.toLocaleTimeString();
        doc.text(`Date: ${dateString} Time: ${timeString} TEST  :`, 10, 35);
       
        doc.setFontSize(8);
        let currentY = 45; // Posizione iniziale verticale
        domande.forEach((item, index) => {
            // Verifica e sostituisce i link nella domanda
          const domandaText = item.domanda.replace(/<a href='([^']*)'>([^<]*)<\/a>/g, (match, href, text) => {
            return text; // Restituisce solo il testo se non è presente un href
          });

          // Se domandaText non contiene testo significativo (dopo la sostituzione dei link)
          if (domandaText.trim()) {
            // Aggiunge la domanda normale se non ci sono link
             const svgText = item.svg.includes("❌") ? item.svg.replace("❌", "Errata :") : item.svg.includes("✅") ? item.svg.replace("✅", "Corretta :") : item.svg;
             doc.text(`${index + 1}. ${domandaText} - Risposta ${svgText}`, 10, currentY );
          }
          currentY += 5;
          if (currentY >200){ currentY = 45; doc.addPage();
             doc.setFillColor(255, 215, 0); // Gold color
        doc.rect(0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight(), 'F');
        doc.setFillColor(173, 216, 230); // Light blue color
        doc.rect(5, 5, doc.internal.pageSize.getWidth()-10, doc.internal.pageSize.getHeight()-10, 'F');

            doc.text(`Omarillo Certificate Levels of IT DICTIONARY Completion ${missionD}`, 15, 15);
        const pageWidth = doc.internal.pageSize.getWidth();
        const text = `Name: ${nome} ${cognome} \tClass: ${classe} Points ${points}`;
doc.text(text, x, 25);
           }
        });
             // Carica l'immagine SVG
      
        doc.save(`IT_Dictionary_${mission}_${nome}_${cognome}_${classe}.pdf`);
       
       
    }; 
       
    useEffect(() => {
          setIsClient(true)
    }, [])
   
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const stopTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    // Imposta il timer
    timerRef.current = setTimeout(() => {
      handleNextQuestion('');
      console.log('Timer scaduto');
    }, 30000 * (extaT ? 1.25 : 1));

    // Pulisci il timer quando il componente si smonta o IDomanda cambia
    return () => stopTimer();
  }, [IDomanda]);

    return ( isClient &&(
        <div style={{ 
            backgroundColor: 'black', 
            color: 'white', 
            padding: '100px', 
            borderRadius: '70px', 
            backgroundImage: `url(/quiz/${mission}/${domanda.id}.jpg)`, 
            backgroundSize: 'cover', 
            backgroundPosition: 'center' 
        }}>
            {mission === "AL" && (<>Un <b>array</b> è una struttura di dati che consente di memorizzare una collezione di elementi dello stesso tipo in una sequenza contigua di memoria.
            <br />
            Un <b>grafo</b> è una struttura di dati astratta composta da un insieme di nodi (o vertici) e archi (o spigoli) che collegano alcune o tutte le coppie di nodi.
            <br /><b>La programmazione dinamica</b> è una delle tecniche più potenti per risolvere problemi computazionalmente complessi e ottimizzare l'efficienza degli algoritmi!
            </>)}
            <h1>Quiz {correct}✅ + {error}❌ / { Math.floor(correct*10000/numDomande)/100}%✅ { Math.floor(error*10000/numDomande)/100}%❌</h1>
            <p>time: {new Date().toLocaleTimeString()}  {responseMessage}</p>
            {!fine && domanda ? (
            <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.8)', width: '100%' }}>
                <h2 dangerouslySetInnerHTML={{ __html: domanda.domanda }}></h2>
                <ul>
                {domanda.risposte.map((risposte, index) => (
                    <li key={index}>
                    {index + 1} - <a
                        onClick={() => handleNextQuestion(risposte)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.secondary}
                    >
                        {risposte}
                    </a>
                    </li>
                ))}
                </ul>
                <br />
               
            </div>
           { /** <div style={{ flex: '0 0 200px', marginLeft: '20px' }}>
                <div dangerouslySetInnerHTML={{ __html: domanda.svg }} />
            </div> */}
             
            </div>
            ) : (  
                <div className={styles.ctas}>
                <a
                    onClick={certifica}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.secondary}
                >
                  DOWNLOAD CERTIFICATE
                  
                   
                </a>
                <a
                    onClick={rivedi}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.secondary}
                >
                  Rivedi
                   
                </a>
               
               </div>
            )}
            
            {/*domande.map((domanda, index) => (
                <div key={index} style={{ display: 'flex' }}>
                <div style={{ flex: 1 , backgroundColor: 'black'}}>
                    <p dangerouslySetInnerHTML={{ __html: domanda.id }}></p>
                    
                </div>
                
                </div>
            ))*/}
        </div>
        
    ));
};

export default QuizC;

