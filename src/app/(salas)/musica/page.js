"use client"

import { Suspense, useState  } from 'react';
import BarraProgresso from '@/components/BarraProgresso/BarraProgresso.js'
import ProcuraMusica from '@/components/Server/ProcuraMusica.js';
import Loading from '../../loading.js';

export default function Musica() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleTermoPesquisa = (event) => {
      const termo = event.target.value;
      setSearchTerm(termo);
  };

  return (
    <main className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
      <div>
        <BarraProgresso />
        
        <div className='grid sm:grid-cols-2 text-center sm:text-left my-4'>
          <h2 className='text-3xl dark:text-white inline-block'>
            Selecione sua Música
          </h2>
          <input
            className='bg-zinc-200 dark:bg-zinc-800 dark:text-white rounded-lg px-2 py-2'
            type="text"
            placeholder="Digite sua busca..."
            onChange={handleTermoPesquisa}
          />
        </div>
      </div>
      
      <div className='h-[75vh] overflow-y-auto pr-2'>
          <Suspense fallback={<Loading />}>
              <ProcuraMusica pesquisa={searchTerm} />
          </Suspense>
      </div>
    </main>
  )
}
