import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json(); // Riceve i dati JSON dal client
    const fileName = `/my-folder/data_${Date.now()}.json`; // Percorso del file in Dropbox
    const dropboxAccessToken = process.env.DROPBOX_ACCESS_TOKEN;

    const response = await fetch('https://content.dropboxapi.com/2/files/upload', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${dropboxAccessToken}`,
        'Content-Type': 'application/octet-stream',
        'Dropbox-API-Arg': JSON.stringify({
          path: fileName,
          mode: 'add', // Usa 'overwrite' per sovrascrivere
          autorename: true,
        }),
      },
      body: JSON.stringify(body), // Converte i dati JSON in stringa
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error_summary || 'Errore durante l’upload');
    }

    return NextResponse.json({ message: 'File salvato con successo!', data }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
