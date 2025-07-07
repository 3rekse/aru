'use client'; 
import Aru2 from './Aru2'
import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Scarica from './components/scarica';
import CookieBanner from './cookies';
function CallAru() {
  const searchParams = useSearchParams();
  // ... codice che utilizza searchParams...
  const mission = searchParams.get('mission') || 'ARU'; // Accesso sicuro
  const page = searchParams.get('page')  || '';
  const missionD = searchParams.get('missionD') || '';  
  if (page!=="FB")
   {
  return <div style={{ width: '100vw', height: '100vh', margin: 0, padding: 0 }}>
       <Aru2 mission={mission} missionD={missionD} page={page}/>;
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
          <CookieBanner />
            <CallAru />
        </Suspense>
  )
}