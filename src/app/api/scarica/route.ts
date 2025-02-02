import { NextResponse } from 'next/server';
import { downloadAllFiles } from '../../utils/scaricaProve';

export async function GET() {
  console.log('📥 Inizio download...');
  await downloadAllFiles();
  return NextResponse.json({ message: 'Download completato!' });
}
