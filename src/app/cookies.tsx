import React, { useState, useEffect } from "react";

const CookieBanner: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Mostra il banner solo se non è già stato accettato
    const accepted = localStorage.getItem("cookie_accepted");
    if (!accepted) setVisible(true);
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie_accepted", "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div style={{
      position: "fixed",
      bottom: 0,
      left: 0,
      width: "100%",
      background: "#222",
      color: "#fff",
      padding: "1em",
      textAlign: "center",
      zIndex: 1000
    }}>
      Questo sito utilizza solo cookie tecnici necessari al funzionamento. <br />
      <br/>
🔔 Attenzione :
Se hai bisogno di didattica inclusiva o di strumenti compensativi, ti invitiamo a 
✅ Fleggare l’opzione "Verifica facilitata" prima di iniziare, opzione dedicata per poter accedere a una verifica pensata per rispondere meglio alle tue esigenze.
<br/>
      <button onClick={acceptCookies} style={{ marginTop: "0.5em" }}>
        Accetta
      </button><br/>
      
<sub>I cookie tecnici necessari non richiedono il consenso esplicito secondo la normativa italiana, ma è buona prassi informare l’utente.  
<b>Accettando</b> salvi la scelta in `localStorage` per non mostrare più il banner dopo l’accettazione.
 </sub>   </div>
  );
};

export default CookieBanner;


