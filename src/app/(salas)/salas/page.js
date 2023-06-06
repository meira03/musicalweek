import { cookies } from 'next/headers';

import { procuraSalas } from "@/lib/fetch";
import CardSala from "@/components/CardSala/CardSala.js";

export default async function Salas({ params }) {
  const cookieStore = cookies();
  const id_user = cookieStore.get('id').value;

  const res = await procuraSalas(id_user);
  const salas = res.salas;
  return (
    <main className='mx-auto sm:max-w-7xl px-2 sm:px-6 lg:px-8'>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 min-h-[30vh] cursor-pointer">
          <CardSala />
          {salas.map((sala) => (
            <CardSala key={sala.id_musica_sala} nome={sala.nome_sala} id_musica={sala.id_musica} id_sala={sala.id_musica_sala} />
          ))}
          </div>
    </main>
  )
}
