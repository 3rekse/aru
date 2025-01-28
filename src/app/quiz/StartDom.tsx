import React, { useEffect, useRef } from 'react';

interface MyComponentProps {
  IDomanda: number;
  handleNextQuestion: (arg: string) => void;
  extaT: boolean;
}

const StartDom: React.FC<MyComponentProps> = ({ IDomanda, handleNextQuestion, extaT }) => {
  return (
    <div>
    {new Date().toLocaleTimeString()}
    </div>
  );
  // Utilizza useRef per conservare l'ID del timer
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
    }, 30000 * (extaT ? 1.5 : 1));

    // Pulisci il timer quando il componente si smonta o IDomanda cambia
    return () => stopTimer();
  }, [IDomanda]);
};

export default StartDom;
