'use client'
import React, { useState, useEffect } from 'react';

import Image from "next/image";
import styles from "./page.module.css";
import Binary from "./components/binary"

import Quiz from './quiz/Quiz'

import jsPDF from 'jspdf';

import { DropdownMissioni } from "./components/DropdownMissioni";
interface AruProps {
  mission: string;
  missionD: string;
  page:string;
}
const prove: any[] = [];

const randomBinary = (pot:number) => {
  const min = 2**(pot-Math.round(pot/2));
  return (min+Math.floor(Math.random() * 2**pot)).toString(2);
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
const Aru:React.FC<AruProps> = ({ mission, missionD, page }) =>{

  const [isBinarySet, setIsBinarySet] = useState(false);
  const [bit, setBit] = useState(2);
  const [num1, setNum1] = useState<string>('');
  const [num2, setNum2] = useState<string>('');
  const [name, setFirst] = useState('');
  const [email, setEmail] = useState('');
  const [last, setLast] = useState('');
  const [classe, setClasse] = useState('');
  const [inputsDisabled, setInputsDisabled] = useState(false);
  const [inputsExtra, setInputsExtra] = useState(false);

  
  const link= "<a class=\"qlink\" href=\"md.html?file=quiz/"+mission+"/"+mission+".md\" target=\"_blank\">"+ missionD+"</a>" ;
  
  //const missionD= missionDescriptions[mission] || " ";
  //const missionD =(link !== " " ) ?  (link + missionDescriptions[mission] || " ")+"<\a>": missionDescriptions[mission] || " ";
   const handleBinarySet = () => {
    setIsBinarySet(true);
    setNum1(randomBinary(bit + 1));
    setNum2(randomBinary(bit + 1));
    setBit(bit + 1);
    
  };
  const handleAccept = () => {
    console.log(inputsDisabled);
    setInputsDisabled(isValidEmail(email) && classe !== '');
    if (!isValidEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    if (classe === '') {
      alert("Please enter your class.");
      return;
    }
    if (page !== "") {
    const elem = document.documentElement; // oppure un altro elemento specifico
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if ((elem as any).webkitRequestFullscreen) { /* Safari */
      (elem as any).webkitRequestFullscreen();
    } else if ((elem as any).msRequestFullscreen) { /* IE11 */
      (elem as any).msRequestFullscreen();
    }
  }
  };

  useEffect(() => {
      setNum1(randomBinary(bit));
      setNum2(randomBinary(bit));
    
  }, []);
    

  const downloadCertificato = () => {
    /**
     * Initializes a new jsPDF document with the specified configuration.
     * The document is set to landscape orientation, uses millimeters as the unit of measurement,
     * and is formatted to A4 size.
     */
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });
    doc.setFillColor(73, 116, 130); // Gold color
    doc.rect(0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight(), 'F');
    doc.setFillColor(173, 216, 230); // Light blue color
    doc.rect(5, 5, doc.internal.pageSize.getWidth()-10, doc.internal.pageSize.getHeight()-10, 'F');

    doc.setProperties({
      title: 'Binary Arithmetic Certificate',
      subject: 'Certificate of Completion',
      author: 'Omarillo Binary Arithmetic',
    });
    
    doc.setFont('times', 'normal');   
    doc.text('Omarillo Binary Arithmetic Certificate Levels of Completion', 15, 15);
    const pageWidth = doc.internal.pageSize.getWidth();
    const text = `Name: ${name} ${last} \tClass: ${classe}`;
    const textWidth = doc.getTextWidth(text);
    const x = (pageWidth - textWidth) / 2;
    doc.text(text, x, 25);
    
    const currentDate = new Date();
    const dateString = currentDate.toLocaleDateString();
    const timeString = currentDate.toLocaleTimeString();
    doc.text(`Date: ${dateString} Time: ${timeString} TEST  :`, 10, 35);
    if (inputsExtra) {
      doc.text('Extra Time: Granted',180, 35);
    }
    doc.setFontSize(8);
    prove.forEach((item, index) => {
      doc.text(`${index + 1}. \t#1:.${item.num1}.\t#2:.${item.num2}.\t+:.${item.sum}.\t-:.${item.dif}.\t*:.${item.prod}.\t÷:.${item.quot} r.${item.ratio}`,  10, 45 + index * 5);
    });
         // Carica l'immagine SVG
  
    doc.save(`BinaryArithmeticCertificate_${name}_${last}_${classe}.pdf`);

    
  };

  const next = () => {
    setNum1(randomBinary(bit));
    setNum2(randomBinary(bit));
    setIsBinarySet(false);
          // Effetti collaterali che devono essere eseguiti solo sul client
     };
    
  return (
    <div className={styles.page}>
        <h1> <Image
          className={styles.logo}
          src="/ccla.svg"
          alt="ccla.svg logo"
          height={38}
          width={64}
          priority
        /> 
        {mission!=="ARU"  ? (
          inputsExtra ?
          (<>
            IT Dictionary:  <span dangerouslySetInnerHTML={{ __html: link }} /> 
          </>
          ):
          (<>
            IT Dictionary: {missionD} Test
          </>
          )) : ( <>
           Arithmetic Unit Validation Test 
          </>)}
        
       </h1>
       
      <main className={styles.main}>
      {!inputsDisabled &&
        <ol> {mission  ? (
          <>
            <li>Get started to insert your identity</li>
          <li>Plese accept your IT Dictionary {missionD} TEST</li>
          <li>Complete the level</li>
          </>
          ) : ( <>
          <li>The binary arithmetic unit is part of  CPU. Get started to insert your identity</li>
          <li>Plese accept your binary Mission</li>
          <li>Complete the level</li>
          </>)}
            <li style={{ fontWeight: 'bold' }}><span style={{ color: 'red'}}>ATTENTION:</span> Only at the end of the mission will you have to download the certification of your best level</li>
        </ol>}
        <div>
         {mission} Omarillo Mission 0.0.{bit} by : <br/>
            <input 
                    type="text" 
                    value={email} 
                    onChange={(e) => {
                        const value = e.target.value;
                        setEmail(value);
                        const start = value.indexOf(".") + 1;
                        const end = value.indexOf("@");
                        if (start !== -1 && end !== -1 && start < end) {
                           setFirst(value.substring(start, end));
                           setLast(value.substring(0, start - 1));
                        } else {
                            setFirst('');
                        }
                                               
                    }}
                    placeholder="Enter email" 
                    disabled={inputsDisabled}
                                   />
                
               
                <input 
                    type="text" 
                    value={classe} 
                    onChange={(e) => {
                        const value = e.target.value;
                        setClasse(value);
                    }} 
                    placeholder="Enter your class" 
                    disabled={inputsDisabled}
                />
                
<button onClick={handleAccept} disabled={inputsDisabled}>Accept Mission</button>
              <br/> <input 
                  type="checkbox" 
                  checked={inputsExtra} 
                  onChange={(e) => setInputsExtra(e.target.checked)} 
                  disabled={inputsDisabled}
                />
                <label>Verifica facilitata</label>
              </div>
                {inputsDisabled ?( mission!=="ARU"  ? ( <Quiz mission={mission} missionD={missionD} classe={classe} nome={name} cognome={last} extaT={inputsExtra} verifica={page}/>  ) : 
                    ( <Binary onSet={handleBinarySet} num1={num1} num2={num2} bit={bit} prova={prove} />) 
                     ):( <div>Insert your identity to start the test</div>)}
              {isBinarySet && 
<div className={styles.ctas}>
         
         <a
           onClick={downloadCertificato}
           target="_blank"
           rel="noopener noreferrer"
           className={styles.secondary}
         >
           DOWNLOAD LEVEL {bit-2} CERTIFICATE
         </a>
         
       </div>  
}
      
      </main>
      <footer className={styles.footer}>
        <a
          href="https://kb-competition.vercel.app/aritmetica"
          target="_self"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn Binary Arithmetic→
        </a>
                  <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
        <a
          href="/?mission=SI"
          target="_self"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Sicurrezza→
        </a>
        
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          <DropdownMissioni />
          
        <a
          href="/?mission=AI"
          target="_self"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/ai.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          AI→
        </a>
        <a
          href="/?mission=AL"
          target="_self"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/al.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Algoritmi→
        </a>
        <a
          href="/?mission=WEB"
          target="_self"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/web.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          WEB→
        </a>
        <a
          href="/?mission=MOBILE"
          target="_self"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/mobile.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Mobile→
        </a>
      </footer>
    </div>
  );
}

export default Aru;