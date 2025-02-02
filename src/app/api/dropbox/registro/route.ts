import { NextResponse } from 'next/server';
import path from 'path';

const DROPBOX_ACCESS_TOKEN = process.env.DROPBOX_ACCESS_TOKEN;
const DEFAULT_CONTENT = { message: 'File non trovato, creato nuovo file.' }; // Contenuto predefinito

export async function POST(request: Request) {
  try {
      const newQuestions = await request.json();
    
      // Percorso del file
      const { searchParams } = new URL(request.url);
      const mission = searchParams.get('mission');
      const classe = searchParams.get('classe');
      const currentDate = new Date().toLocaleString('it-IT', { timeZone: 'Europe/Rome' }).replace(/\//g, '_');
    
      const filePath = path.join(process.cwd(), `/quiz/${mission}/${classe}`, `${currentDate}.json`);
      let existingQuestions = [];
    console.log('Controlla se il file esiste su Dropbox') ;
    const checkResponse = await fetch('https://api.dropboxapi.com/2/files/get_metadata', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${DROPBOX_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ path: filePath }),
    });
    console.log('Risposta dal server Dropbox', checkResponse) ;
    if (checkResponse.ok) {
      // Il file esiste, scarichiamolo
      const downloadResponse = await fetch('https://content.dropboxapi.com/2/files/download', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${DROPBOX_ACCESS_TOKEN}`,
          'Dropbox-API-Arg': JSON.stringify({ path: filePath }),
        },
      });

      if (!downloadResponse.ok) {
        throw new Error('Errore nel download del file');
      }
      const fileContent = await downloadResponse.json();
      
      existingQuestions = JSON.parse(fileContent);

      //return NextResponse.json(fileContent, { status: 200 });
    
    // Unisci le nuove domande con quelle esistenti
    } else {
    const folders = [`/quiz`, `/public/quiz/${mission}`, `/public/quiz/${classe}`];
    for (const folder of folders) {
      await fetch('https://api.dropboxapi.com/2/files/create_folder_v2', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${DROPBOX_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ path: folder, autorename: false }),
      }).catch(error => {
        // Ignora l'errore se la cartella esiste già
        if (error.response && error.response.status !== 409) {
          throw error;
        }
      });
    }
  }
  const mergedQuestions = [...existingQuestions, ...newQuestions];

      // Il file non esiste: creiamo e salviamo il file con contenuto predefinito
      const uploadResponse = await fetch('https://content.dropboxapi.com/2/files/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${DROPBOX_ACCESS_TOKEN}`,
          'Content-Type': 'application/octet-stream',
          'Dropbox-API-Arg': JSON.stringify({
            path: filePath,
            mode: 'add',
            autorename: true,
          }),
        },
        body: JSON.stringify(mergedQuestions, null, 2),
      });

      if (!uploadResponse.ok) {
        throw new Error('Errore durante l’upload del file');
      }

      return NextResponse.json(
        { message: 'Questions updated successfully.' },
        { status: 200 }
      );
    
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
