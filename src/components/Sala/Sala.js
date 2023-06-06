"use client";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import MusicaSala from "../MusicaSala/MusicaSala";
import { Suspense, useState } from "react";
import Loading from "@/app/loading.js";
import Contador from "@/components/Contador/Contador.js";

const Sala = async ({ sala, id_usuario }) => {
  const [musicKey, setMusicKey] = useState(sala.musicas.length - 1);

  const updateMusicKey = (value) => {
    if (musicKey + value < 0) {
      return false;
    }

    if (musicKey + value > sala.musicas.length - 1) {
      return false;
    }

    setMusicKey(musicKey + value);
  };

  return (
    <>
      <Contador className="text-black dark:text-white sm:text-3xl absolute top-4 right-[42%] sm:right-4" targetDate={sala.tempo_restante}/>
      <div className="grid mt-10 sm:mt-0 grid-cols-1 gap-5 min-h-[50vh] min-w-full mb-10 relative">
        <Suspense fallback={<Loading />}>
          <MusicaSala
            key={sala.musicas[musicKey].id_musica_sala}
            id_musica={sala.musicas[musicKey].musica}
            id_musica_sala={sala.musicas[musicKey].id_musica_sala}
            nota_usuario={sala.musicas[musicKey].nota_usuario}
            avaliacao_media={sala.musicas[musicKey].avaliacao_media}
            id_usuario={id_usuario}
          />
        </Suspense>
        {musicKey - 1 >= 0 && (
          <div
            className="dark:text-white text-black absolute cursor-pointer left-0 top-[40%]"
            onClick={() => {
              updateMusicKey(-1);
            }}
          >
            <FaChevronLeft className="text-3xl" />
          </div>
        )}
        {musicKey + 1 <= sala.musicas.length - 1 && (
          <div
            className="dark:text-white text-black absolute cursor-pointer right-0 top-[40%]"
            onClick={() => {
              updateMusicKey(1);
            }}
          >
            <FaChevronRight className="text-3xl" />
          </div>
        )}
      </div>
    </>

  );
};

export default Sala;
