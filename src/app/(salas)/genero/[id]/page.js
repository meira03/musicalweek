import { cookies } from 'next/headers';

import BarraProgresso from '@/components/BarraProgresso/BarraProgresso';
import { Suspense  } from 'react';
import ProcuraGenero from '@/components/Server/ProcuraGenero.js';
import Loading from '@/app/loading.js';

export default function Genre({ params }) {
  const cookieStore = cookies();
  const id_user = cookieStore.get('id').value;

  return (
    <main className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
      <BarraProgresso bar1={true} bar2={true} bar3={false}/>
      <div className='grid sm:grid-cols-2 text-center sm:text-left my-4'>
          <h2 className='text-3xl dark:text-white inline-block'>
            Selecione o Gênero
          </h2>
        </div>
        <div className='h-[75vh] overflow-y-auto pr-2'>
          <Suspense fallback={<Loading />}>
            <ProcuraGenero id_musica={params.id} id_usuario={id_user} />
          </Suspense>
        </div>
    </main>
  )
}
