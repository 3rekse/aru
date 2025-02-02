import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import nodemailer from 'nodemailer';



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
      existingQuestions = JSON.parse(fileContent);
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
    // Invia il file per email
   /* await sendEmailWithAttachment({
      to: 'itdictionarytest@gmail.com',
      subject: filePath,
      text: 'Please find the updated questions attached.',
      attachments: [
      {
        filename: `${currentDate}.json`,
        path: filePath,
      },
      ],
    });*/
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
/*
async function sendEmailWithAttachment({ to, subject, text, attachments }: { to: string; subject: string; text: string; attachments: { filename: string; path: string; }[]; }) {
  // Configura il trasportatore SMTP


  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Opzioni dell'email
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
    attachments,
  };

  // Invia l'email
  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Error sending email');
  }
} */
