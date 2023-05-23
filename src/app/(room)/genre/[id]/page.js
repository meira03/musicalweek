import ProgressBar from '@/components/ProgressBar/ProgressBar';
import { Suspense  } from 'react';
import SearchGenre from '@/components/Server/SearchGenre.js';
import Loading from '@/app/loading.js';

export default function Home({ params }) {
  return (
    <main className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
      <ProgressBar bar1={true} bar2={true} bar3={false}/>
      <div className='grid sm:grid-cols-2 text-center sm:text-left my-4'>
          <h2 className='text-3xl dark:text-white inline-block'>
            Select your gender
          </h2>
        </div>
        <div className='h-[75vh] overflow-y-auto pr-2'>
          <Suspense fallback={<Loading />}>
            <SearchGenre id={params.id} />
          </Suspense>
        </div>
    </main>
  )
}
