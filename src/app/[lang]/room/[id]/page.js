import Link from "next/link";

import { getDictionary } from "@/utils/dictionaries";
import { getMusic } from "@/utils/spotify";
import { CarrousselRoom } from "@/components/room/CarrousselRoom";
import { BsArrowLeft } from "react-icons/bs";

export default async function Page({ params: { lang, id } }) {
  const dict = await getDictionary(lang);

  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const res = await fetch(
    `https://musicalweek-api.azurewebsites.net/endpoints/procura_sala.php?id_musica_sala=${id}`,
    {
      method: "GET",
      headers: headers,
      credentials: "include",
    }
  );

  if (res.ok && res.status == 200) {
    const rooms = await res.json();
    const musics = await Promise.all(
      rooms.musicas.map((music) => {
        return getMusic(music.musica).then(data => {
          const response = {
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
            {rooms.tempo_restante != null ? rooms.tempo_restante : "00:00:00"}
          </span>
          <Link className="absolute left-4" href="/search">
            <BsArrowLeft className="text-2xl" />
          </Link>
        </header>
        <CarrousselRoom musics={musics} />
      </section>
    );
  } else {
    console.log(res);
  }

  return <></>;
}
