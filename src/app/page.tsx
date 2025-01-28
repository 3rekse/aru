'use client'; 
import Aru from './Aru'
import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function CallAru() {
  const searchParams = useSearchParams();
  // ... codice che utilizza searchParams...
  const mission = searchParams.get('mission') || 'ARU'; // Accesso sicuro
  const page = searchParams.get('page')  || 'PG';

  return <div> 
          <Aru mission={mission} page={page}/>
        </div>;
}
export default function HomePage() {
     return (
         <Suspense fallback={<div>Loading...</div>}>
            <CallAru />
        </Suspense>
  )
}