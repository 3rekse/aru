'use client'; 
import Aru from './Aru'

import { useSearchParams } from 'next/navigation';

export default function HomePage() {
  const searchParams = useSearchParams();
  const mission = searchParams.get('mission') || 'ARU'; // Accesso sicuro
  const page = searchParams.get('page')  || 'PG';
  
    return (
      <div>

        {/*mission  ? (
          <>
            <h1>Current mission: {mission}</h1>
            <Quiz />
          </>
        ) : (<Aru />)}
        {page  && (<h1>Page: {page}</h1>)}
     {/* Client Component can be nested */}
      <Aru mission={mission} page={page}/>
    </div>
  )
}