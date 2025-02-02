'use client';
import styles from "../page.module.css";

export default function Scarica() {
  const handleDownload = async () => {
    console.log(' Inizio download...')  ;
    const response = await fetch('/api/download');
    const data = await response.json();
    alert(data.message);
  };

  return (
  <div className={styles.ctas}>
  <a
  onClick={handleDownload}
  target="_blank"
  rel="noopener noreferrer"
  className={styles.secondary}
>
📥 Scarica Tutti i File
</a>
</div>)
}
