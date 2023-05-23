"use client"

import { Suspense, useState  } from 'react';
import ProgressBar from '@/components/ProgressBar/ProgressBar.js'
import SearchMusic from '@/components/Server/SearchMusic.js';
import Loading from '../../loading.js';

export default function Home({ params: { lang } }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
      const { value } = event.target;
      setSearchTerm(value);
  };

  return (
    <main className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
      <div>
        <ProgressBar bar1={true} bar2={false} bar3={false} />
        
        <div className='grid sm:grid-cols-2 text-center sm:text-left my-4'>
          <h2 className='text-3xl dark:text-white inline-block'>
            Select your music
          </h2>
          <input
            className='bg-zinc-200 dark:bg-zinc-800 dark:text-white rounded-lg px-2 py-2'
            type="text"
            placeholder="Digite sua busca..."
            onChange={handleSearchChange}
          />
        </div>
      </div>
      
      <div className='h-[75vh] overflow-y-auto pr-2'>
          <Suspense fallback={<Loading />}>
              <SearchMusic search={searchTerm} />
          </Suspense>
      </div>
    </main>
  )
}
