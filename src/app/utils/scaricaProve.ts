import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import { pipeline } from 'stream';
import { promisify } from 'util';

const streamPipeline = promisify(pipeline);

const BASE_URL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}/quiz/AI`
  : 'http://localhost:3000/quiz/AI'; // Usa localhost in sviluppo

const LOCAL_SAVE_PATH = path.join(process.cwd(), 'downloads', 'quiz', 'AI'); // Cartella locale

// 📌 Crea cartella se non esiste
const ensureDirectoryExistence = (filePath: string) => {
  const dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true });
  }
};

console.log(' 📌 Scarica file e salva in locale');
const downloadFile = async (url: string, savePath: string) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Errore nel download: ${response.statusText}`);

    ensureDirectoryExistence(savePath);
    const fileStream = fs.createWriteStream(savePath);

    // ✅ Usa `streamPipeline` per gestire correttamente lo stream
    if (response.body) {
      await streamPipeline(response.body, fileStream);
      console.log(`✅ Scaricato: ${savePath}`);
    } else {
      throw new Error('Nessun body nella response');
    }
  } catch (error) {
    console.error(`❌ Errore nel download di ${url}:`, error);
  }
};

// 📌 Scarica cartella e i suoi file
const downloadFolder = async (folderPath: string, localPath: string) => {
  try {
    const response = await fetch(`${BASE_URL}/${folderPath}`);
    const fileList: string[] = await response.json() as string[]; // Supponiamo che il server restituisca un JSON con i file

    for (const file of fileList) {
      const fileUrl = `${BASE_URL}/${folderPath}/${file}`;
      const fileSavePath = path.join(localPath, file);
      await downloadFile(fileUrl, fileSavePath);
    }
  } catch (error) {
    console.error(`❌ Errore nel recupero della cartella ${folderPath}:`, error);
  }
};

// 📌 Funzione principale per scaricare tutto
export const downloadAllFiles = async () => {
  console.log('🔄 Avvio del download di tutti i file da Vercel...');
  await downloadFolder('public/quiz/AI', LOCAL_SAVE_PATH);
  console.log('🎉 Download completato!');
};
