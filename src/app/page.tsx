'use client'; 
import Aru from './Aru'
import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Scarica from './components/scarica';

function CallAru() {
  const searchParams = useSearchParams();
  // ... codice che utilizza searchParams...
  const mission = searchParams.get('mission') || 'ARU'; // Accesso sicuro
  const page = searchParams.get('page')  || 'PG';
 
  if (page!=="FB")
   {
  return  <div> 
       <Aru mission={mission} page={page}/>;
        </div>;     
  } else {
    return <div> 
       <Scarica/>;
        </div>; 
  }

}
export default function HomePage() {
     return (
         <Suspense fallback={<div>Loading...</div>}>
            <CallAru />
        </Suspense>
  )
}