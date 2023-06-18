"use client"
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { pesquisaMusica, criaSala } from "../../lib/fetch";

export default async function ProcuraMusica({ pesquisa, id_usuario }) {
  const router = useRouter();

  async function handleClick (id_musica) {
    const sala = await criaSala(id_musica, id_usuario);
    router.push(`/sala/${sala.id}`);
  }
  if (pesquisa != "") {
    var musicas = await pesquisaMusica(pesquisa);
    var musicas = musicas.tracks.items;
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 cursor-pointer">
        {musicas.map((musica) => (
          <div key={musica.id} onClick={() => {handleClick(musica.id)}} className="p-2 rounded-lg bg-zinc-200 hover:bg-zinc-100 dark:bg-zinc-800 hover:dark:bg-zinc-700">
            <Image
              src={musica.album.images[0].url}
              alt={musica.name}
              width="0"
              height="0"
              sizes="100vw"
              className="h-auto w-full rounded-sm"
            />
            <span className="font-semibold dark:text-white truncate text-elipsis block">{musica.name}</span>
            <span className="font-semibold text-sm dark:text-zinc-300 truncate text-elipsis block">{musica.artists[0].name}</span>
          </div>
        ))}
      </div>
    );
  } else{
    return (
      <div className="w-full h-full flex justify-center items-center rounded text-4xl text-black bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-400"></div>
    )
  }
}
