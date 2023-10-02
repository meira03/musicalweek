import Link from "next/link";
import { redirect } from 'next/navigation'

import { getDictionary } from "@/utils/dictionaries";
import { getMusic } from "@/utils/spotify";
import { pesquisaSala } from "@/utils/sala";
import { CarrousselRoom } from "@/components/sala/CarrousselRoom";
import { CronometroRegressivo } from "@/components/sala/CronometroRegressivo";
import { BsArrowLeft } from "react-icons/bs";

export default async function Page({ params: { lang, id } }) {
  const dict = await getDictionary(lang);
  
  const res = await pesquisaSala(id);
  if (!res.ok && res.status != 200) {
    redirect('/salas');
  }
  const rooms = await res.json();
  if (rooms.musicas == undefined) {
    redirect('/salas');
  }
  const musics = await Promise.all(
    rooms.musicas.map((music) => {
      return getMusic(music.musica).then(data => {
        const response = {
          id_musica_sala: music.id_musica_sala,
          avaliacao_media: music.avaliacao_media,
          nota_usuario: music.nota_usuario,
          avaliacoes: music.avaliacoes,
          name: data.name,
          img: data.album.images[0].url,
          artist: data.artists[0].name,
          href: data.href
        }

        return response
      });
    })
  );

  return (
    <section className="py-10">
      <header className="relative flex flex-col items-center justify-center text-center">
        <h1 className="text-xl">{rooms.sala}</h1>
        <span className="text-zinc-400">
          <CronometroRegressivo dataFutura={rooms.tempo_restante} />
        </span>
        <Link className="absolute left-4" href="/salas">
          <BsArrowLeft className="text-2xl" />
        </Link>
      </header>
      <CarrousselRoom musics={musics} />
    </section>
  );
}
