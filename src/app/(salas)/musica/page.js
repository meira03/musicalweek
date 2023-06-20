import { cookies } from 'next/headers';
import Musica from '@/components/Musica/Musica.js';


export default function Musicas() {
  const cookieStore = cookies();
  const id_user = cookieStore.get('id');

  return (
    <main className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
      <Musica usuario={id_user}/>
    </main>
  )
}
