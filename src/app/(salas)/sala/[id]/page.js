import { Suspense  } from 'react';
import ProcuraMusicaSala from '@/components/Server/ProcuraMusicaSala.js';
import Loading from '@/app/loading.js';

export default function Sala({ params }) {
  return (
    <main className='mx-auto relative -z-10 sm:max-w-7xl px-2 sm:px-6 lg:px-8 min-h-[80vh] flex justify-center items-start'>
      <Suspense fallback={<Loading />}>
        <ProcuraMusicaSala id_musica_sala={params.id} />
      </Suspense>
    </main>
  )
}