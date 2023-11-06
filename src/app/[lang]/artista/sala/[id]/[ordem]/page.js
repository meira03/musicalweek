import Link from "next/link";
import { redirect } from "next/navigation";

import { getDictionary } from "@/utils/dictionaries";
import { getMusic } from "@/utils/spotify";
import {
  pesquisaSala,
  pesquisaParticipantes,
  pesquisaMusica,
} from "@/utils/sala";

import { Pontuacao } from "@/components/Pontuacao";
import { FormataData } from "@/components/FormataData";
import { Avaliacao } from "@/components/sala/Avaliacao";
import { BtnSalaArtista } from "@/components/sala/BtnSalaArtista";

import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import Image from "next/image";

export default async function Page({ params: { lang, id, ordem } }) {
  const dict = await getDictionary(lang);

  // const res = {
  //   sala: await pesquisaSala(id),
  //   musica: await pesquisaMusica(id, ordem),
  //   participantes: await pesquisaParticipantes(id),
  // };

  const res = {
    sala: JSON.parse(`{
      "sala": "Sala de Música - 9",
      "artista": {
            "nick": "artista_01",
            "icon": "icone22.png"
      },
      "tempo_restante": "2023-11-04 15:30:42",
      "sala_finalizada": false,
      "participante": false,
      "ordem": 3
    }`),
    musica: JSON.parse(`{
      "id_musica_sala": 59,
      "musica": "2O5UcpKolgLT8l8yAvEmID",
      "nota_usuario": null
    }`),
  };

  if (ordem > res.sala.ordem) {
    redirect(`/artista/sala/${id}/${res.sala.ordem}`);
  }

  const exibirPontuacao =
    res.musica.nota_usuario != null || res.sala.sala_finalizada === true;

  const musica = await getMusic(res.musica.musica);

  return (
    <>
      {res.sala.participante === true && !exibirPontuacao && <Avaliacao />}
      <section className="flex flex-col sm:flex-row justify-center items-center min-h-[calc(100vh-7rem)] sm:max-w-5xl sm:mx-auto sm:pb-12">
        <div className="flex flex-col justify-center items-center">
          <h1 className="uppercase neon-text text-2xl sm:text-4xl text-center sm:mb-5">
            ESCOLHAS DE <br />
            {res.sala.artista.nick}
          </h1>
          <Image
            src={"/icones/" + res.sala.artista.icon}
            alt={"Icone " + res.sala.artista.nick}
            height={300}
            width={300}
            className="rounded-full w-4/5 border border-neon-blue-200 row-span-2 my-2 mx-auto"
          />
          <div className="mt-3">
            <BtnSalaArtista participante={res.sala.participante} id_sala={id} />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="text-neon-blue-100 hidden sm:block">
            {!res.sala.sala_finalizada && (
              <>
                {res.sala.ordem == 7
                  ? "FIM DA SALA EM: "
                  : "PRÓXIMA MÚSICA EM: "}
                <FormataData
                  dataTransformar={res.sala.tempo_restante}
                  progressivo={false}
                  formato="hh:mm:ss"
                />
              </>
            )}
          </div>
          <div className="text-zinc-500 text-center text-xl my-2">
            {ordem}/7
          </div>
          <div className="flex items-center w-full">
            <Link
              className={ordem > 1 ? "" : "invisible"}
              href={
                ordem > 1
                  ? `/artista/sala/${id}/${ordem - 1}`
                  : `/artista/sala/${id}/${ordem}`
              }
            >
              <BiSkipPrevious className="text-6xl sm:text-8xl" />
            </Link>
            <div className="relative w-full">
              <Image
                width={600}
                height={600}
                className="w-full"
                src={musica.album.images[0].url}
                alt={musica.name}
              />
              <div
                className={
                  "absolute w-full h-full top-0 left-0 bg-black-100 bg-opacity-70 flex flex-col items-center justify-center " +
                  (res.musica.nota_usuario != null ? "block" : "hidden")
                }
              >
                <span className="sm:text-2xl uppercase">Pontuação:</span>
                <span className="text-5xl sm:text-9xl">
                  <Pontuacao pontuacao={res.musica.nota_usuario} />
                </span>
              </div>
            </div>
            <Link
              className={ordem < res.sala.ordem ? "" : "invisible"}
              href={
                ordem < 7
                  ? `/artista/sala/${id}/${parseInt(ordem) + 1}`
                  : `/artista/sala/${id}/${ordem}`
              }
            >
              <BiSkipNext className="text-6xl sm:text-8xl" />
            </Link>
          </div>
          <div className="text-center mt-5 max-w-full">
            <h1 className="text-xl sm:text-4xl truncate text-elipsis">
              {musica.name}
            </h1>
            <h2 className="text-sm sm:text-lg truncate text-elipsis text-zinc-400">
              {musica.artists[0].name}
            </h2>
          </div>
          <div className="text-neon-blue-100 mt-7 mb-4 sm:hidden block">
            {!res.sala.sala_finalizada && (
              <>
                {res.sala.ordem == 7
                  ? "FIM DA SALA EM: "
                  : "PRÓXIMA MÚSICA EM: "}
                <FormataData
                  dataTransformar={res.sala.tempo_restante}
                  progressivo={false}
                  formato="hh:mm:ss"
                />
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
