"use client"
import { useRouter } from 'next/navigation';
import { procuraMusica, procuraArtista, criaSala } from "../../lib/fetch";

export default async function ProcuraGenero({ id_musica, id_usuario }) {
  const router = useRouter();
  
  async function handleClick (genero) {
    const sala = await criaSala(id_musica, genero, id_usuario);
    router.push(`/sala/${sala.id}`);
  }
  
  if (id_musica != undefined) {
    var musica = await procuraMusica(id_musica);
    var artistaId = musica.artists[0].id;

    var artista = await procuraArtista(artistaId);
    var generos = artista.genres
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div key="Geral" onClick={() => {handleClick("Geral")}} className="flex items-center justify-center h-[30vh] p-2 rounded-lg cursor-pointer bg-zinc-200 hover:bg-zinc-100 dark:bg-zinc-800 hover:dark:bg-zinc-700">            
          <span className="font-semibold text-3xl dark:text-white block">Geral</span>
        </div>
        {generos.map((genero) => (
          <div key={genero} onClick={() => {handleClick(genero)}} className="flex items-center justify-center h-[30vh] p-2 rounded-lg cursor-pointer bg-zinc-200 hover:bg-zinc-100 dark:bg-zinc-800 hover:dark:bg-zinc-700">            
            <span className="font-semibold text-3xl text-center capitalize dark:text-white block">{genero}</span>
          </div>
        ))}
        
      </div>
    );
  }
}
