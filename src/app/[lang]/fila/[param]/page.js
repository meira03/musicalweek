import { getDictionary } from "@/utils/dictionaries";
import { pesquisaFila } from "@/utils/sala";
import { getMusic } from "@/utils/spotify";
import { CgSpinner } from "react-icons/cg";

import Link from 'next/link';
import Image from "next/image";
import CronometroProgressivo from "@/components/fila/CronometroProgressivo";
import SairFila from "@/components/fila/SairFila";

export default async function Page({ params: { lang, param } }) {
  const dict = await getDictionary(lang);
  const fila = await pesquisaFila(param);
  const musica = await getMusic(fila.id_musica);

  return (
    <>
      <div className="w-full bg-zinc-900 px-4 py-2 relative">
        <div className="uppercase text-zinc-300 mb-2">Buscando Sala</div>
        <div className="flex">
          <CgSpinner className="text-white text-4xl animate-spin mr-2" />
          <div>
            <CronometroProgressivo data={fila.data_adicao_musica} />
          </div>
        </div>
        <div className="text-sm text-zinc-200 mt-1">Estimativa: 0:00</div>
        <SairFila id_musica_sala={param} />
        
      </div>
      <div className="mt-4">
        <Image
          src={musica.album.images[0].url}
          alt={musica.name}
          width="600"
          height="600"
          className="p-2 w-2/3 sm:w-1/4 mx-auto h-auto rounded-full"
        />
        <span className="font-semibold text-white truncate text-elipsis block text-center">
          {musica.name}
        </span>
        <span className="font-semibold text-sm text-zinc-300 truncate text-elipsis block text-center">
          {musica.artists[0].name}
        </span>
      </div>
      <Link className="bg-zinc-800 px-3 py-2 rounded-md mx-auto my-3 block w-fit cursor-pointer" href="/salas">Voltar para Salas</Link>
    </>
  );
}
