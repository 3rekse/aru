
'use client';

import  React,{ useState } from 'react';
import { piu, meno,per,diviso } from '../utils/binaryArithmetic';
import Image from "next/image";
import styles from "../page.module.css";

interface BinaryProps {
    onSet: () => void;
    num1: string;
    num2: string;
    bit: number;
    prova: any[];
  }


const BinaryArithmetic: React.FC<BinaryProps> = ({onSet, num1, num2, bit, prova}) => {
    let level=0;
    
    const [point, setPoint] = useState(0);
    const [add1, setAdd1] = useState('');
    const [add2, setAdd2] = useState('');
    const [sum, setSum] = useState('');
    const [min, setMin] = useState('');
    const [sub, setSub] = useState('');
    const [dif, setDif] = useState('');
    const [mul1, setMul1] = useState('');
    const [mul2, setMul2] = useState('');
    const [prod, setProd] = useState('');
    const [div1, setDiv1] = useState('');
    const [div2, setDiv2] = useState('');
    const [quot, setQuot] = useState('');
    const [ratio, setRatio] = useState('');
    const [results, setResults] = useState('');
    const [resultm, setResultm] = useState('');
    const [resultp, setResultp] = useState('');
    const [resultd, setResultd] = useState('');

    const reSet = () => {
        prova.push({ num1, num2, bit, point, sum, dif, prod, quot, ratio });
        onSet();
        setPoint(0);
        setAdd1('');
        setAdd2('');
        setSum('');
        setMin('');
        setSub('');
        setDif('');
        setMul1('');
        setMul2('');
        setProd('');
        setDiv1('');
        setDiv2('');
        setQuot('');
        setRatio('');
        setResults('');
        setResultm('');
        setResultp('');
        setResultd('');
        level=bit;
        return " ";
    }

    const handleAddition = () => {
         (add1===num1 && add2===num2 || add1===num2 && add2===num1) &&
        setResults(piu(add1, add2) === sum ? "✅ Correct/"+ (setPoint(1)=== undefined) : "❌ Wrong");
        
    };

    const handleSubtraction = () => {
        (min===num1 && sub===num2 || min===num2 && sub===num1) &&
        setResultm(meno(min, sub)===dif?"✅ Correct/"+(setPoint(2)=== undefined) : "❌ Wrong");     
        
    };
    const handleMoltiply = () => {
        (mul1===num1 && mul2===num2 || mul1===num2 && mul2===num1) &&
        setResultp(per(mul1, mul2)===prod?"✅ Correct/"+(setPoint(3)=== undefined) : "❌ Wrong");
      
    };
    
    const handleDivision = () => {
        (div1===num1 && div2===num2 || div1===num2 && div2===num1) &&
        setResultd(diviso(div1, div2)===quot+"R"+ratio?reSet() : "❌ Wrong");
        
    };
    const inputWidth = `${(bit+1) * 12}px`; // Calcola la larghezza in base al numero di bit
    const inputMWidth = `${bit * 24}px`; // Calcola la larghezza in base al numero di bit

    return (
        <div>
            <h1>Binary Arithmetic:</h1>
            <h2>is a digital electronic arithmetic which is used to perform binary operations on binary numbers.</h2>
          <h3> The binary numbers you'll be working with are {num1} and  {num2}.</h3> 
           <div>
            <p>Enter your two binary numbers and <b>add</b> them : 
                <input 
                    type="text" 
                    value={add1} 
                    onChange={(e) => {
                        const value = e.target.value;
                        if (/^[01]*$/.test(value)) {
                            setAdd1(isNaN(parseInt(value, 2))? "":
                            parseInt(value, 2).toString(2));
                        }
                    }} 
                    placeholder="Enter first binary term "
                    style={{ width: inputWidth, textAlign: 'right' }} // Applica lo stile dinamico
 
                />
                {point===0 && level!=bit ? (
                <button onClick={handleAddition} style={{ backgroundColor: 'white' }}>➕</button>
                ): "+"}
                <input 
                    type="text" 
                    value={add2} 
                    onChange={(e) => {
                        const value = e.target.value;
                        if (/^[01]*$/.test(value)) {
                            setAdd2(isNaN(parseInt(value, 2))? "":
                            parseInt(value, 2).toString(2));
                        }
                    }} 
                    placeholder="Enter second binary term" 
                    style={{ width: inputWidth, textAlign: 'right' }} // Applica lo stile dinamico

                />
                =
                <input 
                    type="text" 
                    value={sum} 
                    onChange={(e) => {
                        const value = e.target.value;
                        if (/^[01]*$/.test(value)) {
                            setSum(isNaN(parseInt(value, 2))? "":
                                parseInt(value, 2).toString(2));
                        }
                    }} 
                    placeholder="Enter binary sum" 
                    style={{ width: inputWidth, textAlign: 'right' }} // Applica lo stile dinamico
                /> {results} 
            </p>
            </div>
            <div>

            <p>Enter your binary numbers and <b>subtract</b> (larger one first) : 
                <input 
                    type="text" 
                    value={min} 
                    onChange={(e) => {
                        const value = e.target.value;
                        if (/^[01]*$/.test(value)) {
                            setMin(isNaN(parseInt(value, 2))? "":
                            parseInt(value, 2).toString(2));
                        }
                    }} 
                    placeholder="Enter minuend term "  
                    style={{ width: inputWidth, textAlign: 'right' }} // Applica lo stile dinamico
  
                /> 
                 {point===1 ? (
                    <button onClick={handleSubtraction} style={{ backgroundColor: 'white' }}>➖</button>
                    ) : ("-")}
                <input 
                    type="text" 
                    value={sub} 
                    onChange={(e) => {
                        const value = e.target.value;
                        if (/^[01]*$/.test(value)) {
                            setSub(isNaN(parseInt(value, 2))? "":
                            parseInt(value, 2).toString(2));
                        }
                    }}
                    placeholder="Enter subtrahend term"
                    style={{ width: inputWidth, textAlign: 'right' }} // Applica lo stile dinamico

                />
                =
                <input 
                    type="text" 
                    value={dif} 
                    onChange={(e) => {
                        const value = e.target.value;
                        if (/^[01]*$/.test(value)) {
                            setDif(isNaN(parseInt(value, 2))? "":
                            parseInt(value, 2).toString(2));
                        }
                    }} 
                    placeholder="Enter binary difference"
                    style={{ width: inputWidth, textAlign: 'right' }} // Applica lo stile dinamico

                /> {resultm} </p>
            </div>
            <div>
            <p>Enter your binary numbers and <b>multiplay</b> them :
                    <input 
                        type="text" 
                        value={mul1} 
                        onChange={(e) => {
                            const value = e.target.value;
                            if (/^[01]*$/.test(value)) {
                                setMul1(isNaN(parseInt(value, 2))? "":
                                parseInt(value, 2).toString(2));
                            }
                        }} 
                        placeholder="Enter binary multilier term "
                        style={{ width: inputWidth, textAlign: 'right' }} // Applica lo stile dinamico

                    />
                     {point===2 ? (     
                    <button onClick={handleMoltiply} style={{ backgroundColor: 'white' }}>✖️</button>
                     ): "x"}
                    <input 
                        type="text" 
                        value={mul2} 
                        onChange={(e) => {
                            const value = e.target.value;
                            if (/^[01]*$/.test(value)) {
                                setMul2(isNaN(parseInt(value, 2))? "":
                                parseInt(value, 2).toString(2));
                            }
                        }} 
                        placeholder="Enter binary multiplicand term"
                        style={{ width: inputWidth, textAlign: 'right' }} // Applica lo stile dinamico

                    />
                    =
                    <input 
                        type="text" 
                        value={prod} 
                        onChange={(e) => {
                            const value = e.target.value;
                            if (/^[01]*$/.test(value)) {
                                setProd(isNaN(parseInt(value, 2))? "":
                                parseInt(value, 2).toString(2));
                            }
                        }} 
                        placeholder="Enter binary product"
                        style={{ width: inputMWidth, textAlign: 'right' }} // Applica lo stile dinamico
 
                    /> {resultp} </p>
            </div>
            <div>    
            <p>Enter your two binary numbers and <b>divide</b> (larger one first) :<br/>
                <input 
                    type="text" 
                    value={div1} 
                    onChange={(e) => {
                        const value = e.target.value;
                        if (/^[01]*$/.test(value)) {
                            setDiv1(isNaN(parseInt(value, 2))? "":
                            parseInt(value, 2).toString(2));
                        }
                    }} 
                    placeholder="Enter binary dividend term "
                    style={{ width: inputWidth, textAlign: 'right' }} // Applica lo stile dinamico

                />
                 {point===3 ? ( 
                <button onClick={handleDivision} style={{ backgroundColor: 'white' }}>➗</button>
                 ): "÷"}
                <input 
                    type="text" 
                    value={div2} 
                    onChange={(e) => {
                        const value = e.target.value;
                        if (/^[01]*$/.test(value)) {
                            setDiv2(isNaN(parseInt(value, 2))? "":
                            parseInt(value, 2).toString(2));
                        }
                    }} 
                    placeholder="Enter binary divisor term"
                    style={{ width: inputWidth, textAlign: 'right' }} // Applica lo stile dinamico

                />
                =
                <input 
                    type="text" 
                    value={quot} 
                    onChange={(e) => {
                        const value = e.target.value;
                        if (/^[01]*$/.test(value)) {
                            setQuot(isNaN(parseInt(value, 2))? "":
                            parseInt(value, 2).toString(2));
                        }
                    }} 
                    placeholder="Enter binary quotient"
                    style={{ width: inputWidth, textAlign: 'right' }} // Applica lo stile dinamico

                /> R:
                <input 
                    type="text" 
                    value={ratio} 
                    onChange={(e) => {
                        const value = e.target.value;
                        if (/^[01]*$/.test(value)) {
                            setRatio(isNaN(parseInt(value, 2))? "":
                            parseInt(value, 2).toString(2));
                        }
                    }} 
                    placeholder="Enter binary ratio"
                    style={{ width: inputWidth, textAlign: 'right' }} // Applica lo stile dinamico

                />
                {resultd} </p>
                
            </div>    
            

        </div>
        
    );
};

export default BinaryArithmetic;