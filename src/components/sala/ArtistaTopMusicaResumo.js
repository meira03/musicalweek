import { Pontuacao } from "@/components/Pontuacao";
import Image from "next/image";
import { FaXmark } from "react-icons/fa6";

export const ArtistaTopMusicaResumo = ({ musica, tipo, dict }) => {
  let title;
  switch (tipo) {
    case "atual":
      title = dict.musica_atual;
      break;

    case "prox":
      title = dict.proxima_musica;
      break;
    case "pontuacao":
      title = dict.melhor_pontuacao;
      break;
    case "avaliada":
      title = dict.mais_avaliada;
      break;
  }
  if (musica != undefined) {
    return (
      <div className="flex flex-col items-center justify-center">
        <span className="text-center uppercase text-[0.7rem] sm:text-lg mb-2">{title}</span>
        <Image
          src={musica.musica.album.images[0].url}
          alt={musica.musica.name}
          width={600}
          height={600}
          className="w-full"
        />
        <span className="text-lg sm:text-2xl max-w-full truncate mt-1 sm:mt-4">{musica.musica.name}</span>
        <span className="text-xs sm:text-lg text-zinc-500 max-w-full truncate">{musica.musica.artists[0].name}</span>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center justify-center">
        <span className="text-center uppercase text-[0.7rem] sm:text-lg mb-2">{title}</span>
        <div className="w-full h-full text-6xl flex items-center justify-center bg-zinc-800 text-zinc-500">
          <FaXmark />
        </div>
        <div className="h-16 sm:h-24"></div>
      </div>
    );
  }
};
