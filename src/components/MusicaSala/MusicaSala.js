"use client";
import { procuraMusica } from "../../lib/fetch";
import Image from "next/image";
import { FaSpotify } from "react-icons/fa";
import Avaliacao from "@/components/Avaliacao/Avaliacao.js";

function msToMinutesSeconds(ms) {
  // Converte milissegundos para segundos
  var totalSeconds = Math.floor(ms / 1000);

  // Calcula os minutos e segundos
  var minutes = Math.floor(totalSeconds / 60);
  var seconds = totalSeconds % 60;

  // Formata a saída no formato mm:ss
  var formattedTime =
    ("0" + minutes).slice(-2) + ":" + ("0" + seconds).slice(-2);

  return formattedTime;
}

const MusicaSala = async ({
  id_musica,
  id_musica_sala,
  nota_usuario,
  id_usuario,
  avaliacao_media
}) => {
  const musica = await procuraMusica(id_musica);

  return (
    <>
      <div className="grid grid-row-2 sm:grid-cols-3 gap-3 px-10">
        <div className="bg-gray-200 dark:bg-zinc-800 rounded-lg p-10">
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
          <div className="grid grid-cols-3">
            <div className="max-w-[100%] col-span-2">
              <span className="font-semibold dark:text-white truncate text-elipsis block">
                {musica.name}
              </span>
              <span className="font-semibold text-sm dark:text-zinc-300 truncate text-elipsis block">
                {musica.artists[0].name}
              </span>
            </div>
            <span className="font-semibold dark:text-zinc-300 truncate text-elipsis text-right max-w-[100%] block">
              {msToMinutesSeconds(musica.duration_ms)}
            </span>
          </div>
          <div className="flex justify-center py-2 w-full">
            <a href={musica.external_urls.spotify}>
              <div className="bg-green-600 p-2 rounded-full">
                <FaSpotify className="text-lg inline font-bold" /> Escute aqui
              </div>
            </a>
          </div>
        </div>
        <div className="flex items-center justify-center flex-col bg-gray-200 dark:bg-zinc-800 rounded-lg p-10 sm:col-span-2 relative">
          <Avaliacao nota_usuario={nota_usuario} id_musica_sala={id_musica_sala} id_usuario={id_usuario} media={avaliacao_media} />
        </div>
      </div>
    </>
  );
};

export default MusicaSala;
