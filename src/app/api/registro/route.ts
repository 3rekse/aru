import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';


// Gestore POST
export async function POST(request: Request) {
  const newQuestions = await request.json();

  // Percorso del file
  const { searchParams } = new URL(request.url);
  const mission = searchParams.get('mission');
  const classe = searchParams.get('classe');
  const currentDate = new Date().toLocaleString('it-IT', { timeZone: 'Europe/Rome' }).replace(/\//g, '_');

  const filePath = path.join(process.cwd(), `public/quiz/${mission}/${classe}`, `${currentDate}.json`);

  try {
    // Verifica se il file esiste
    let existingQuestions = [];
    try {
      const fileContent = await fs.readFile(filePath, 'utf-8');
      existingQuestions = JSON.parse(fileContent); // Leggi e analizza il contenuto del file
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code !== 'ENOENT') {
        // Gestione di errori diversi dal "file non trovato"
        throw err;
      }
    }

    // Unisci le nuove domande con quelle esistenti
    const mergedQuestions = [...existingQuestions, ...newQuestions];

    // Scrivi il contenuto aggiornato nel file
    await fs.mkdir(path.dirname(filePath), { recursive: true }); // Crea la directory, se necessario
    await fs.writeFile(filePath, JSON.stringify(mergedQuestions, null, 2));

    return NextResponse.json(
      { message: 'Questions updated successfully.' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Error updating questions.', details: (error as any).message },
      { status: 500 }
    );
  }
}