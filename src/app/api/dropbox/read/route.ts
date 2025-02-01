import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const dropboxAccessToken = process.env.DROPBOX_ACCESS_TOKEN;
    const filePath = '/my-folder/data.json'; // Percorso del file su Dropbox

    const response = await fetch('https://content.dropboxapi.com/2/files/download', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${dropboxAccessToken}`,
        'Dropbox-API-Arg': JSON.stringify({ path: filePath }),
      },
    });

    if (!response.ok) {
      throw new Error('Errore durante il download del file');
    }

    const fileData = await response.json();

    return NextResponse.json(fileData, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
