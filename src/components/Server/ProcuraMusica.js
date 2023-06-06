import Image from "next/image";
import Link from "next/link";
import { pesquisaMusica } from "../../lib/fetch";

export default async function ProcuraMusica({ pesquisa }) {

  if (pesquisa != "") {
    var musicas = await pesquisaMusica(pesquisa);
    var musicas = musicas.tracks.items;
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 cursor-pointer">
        {musicas.map((musica) => (
          <Link key={musica.id} href={`/genero/${musica.id}`} >
          <div className="p-2 rounded-lg bg-zinc-200 hover:bg-zinc-100 dark:bg-zinc-800 hover:dark:bg-zinc-700">
            <Image
              src={musica.album.images[0].url}
              alt={musica.name}
              width="0"
              height="0"
              sizes="100vw"
              className="h-auto w-full rounded-sm"
              placeholder="blur"
              blurDataURL="/darkmusicalweek.webp"
            />
            <span className="font-semibold dark:text-white truncate text-elipsis block">{musica.name}</span>
            <span className="font-semibold text-sm dark:text-zinc-300 truncate text-elipsis block">{musica.artists[0].name}</span>
          </div>
          </Link>
        ))}
      </div>
    );
  } else{
    return (
      <div className="w-full h-full flex justify-center items-center rounded text-4xl text-black bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-400"></div>
    )
  }
}
