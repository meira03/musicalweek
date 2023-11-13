import Link from "next/link";
import { redirect } from "next/navigation";

import { getMusic } from "@/utils/spotify";
import {
  pesquisaSala,
  pesquisaParticipantes,
  pesquisaMusica,
} from "@/utils/sala";

import { Pontuacao } from "@/components/Pontuacao";
import { FormataData } from "@/components/FormataData";
import { Avaliacao } from "@/components/sala/Avaliacao";

import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { FaSpotify } from "react-icons/fa6";
import Image from "next/image";

export const metadata = {
  title: 'Sala',
}

export default async function Page({ params: { lang, id, ordem } }) {
  const res = {
    sala: await pesquisaSala(id),
    musica: await pesquisaMusica(id, ordem),
    participantes: await pesquisaParticipantes(id),
  };

  if(res.sala.descricao != null){
    redirect('/salas')
  }

  console.log(res.sala)

  if(ordem > res.sala.ordem && res.sala.ordem != null){
    redirect(`/sala/${id}/${res.sala.ordem}`)
  }
  
  const exibirPontuacao = (res.musica.nota_usuario != null || res.sala.sala_finalizada == true);
  const musica = await getMusic(res.musica.musica);

  return (
    <section className="grid sm:grid-cols-4 grid-cols-1 min-h-[calc(100vh-7rem)]">
      {(!exibirPontuacao) && <Avaliacao id_musica_sala={res.musica.id_musica_sala} />}

      <div className="hidden sm:flex flex-col justify-center">
        {res.participantes.map((participante, key) => {
          if (key < 3) {
            return (
              <div key={key} className="w-full border border-neon-blue-100 my-2 h-28 grid grid-cols-3 p-2">
                <Image
                  src={"/icones/" + participante.icon}
                  alt={"Icone " + participante.nick}
                  height={80}
                  width={80}
                  className="rounded-full border border-neon-blue-200 row-span-2 my-2 mx-auto"
                />
                <span
                  className={
                    "text-xl col-span-2 flex items-center justify-center text-center" +
                    ((!exibirPontuacao || res.musica.avaliacoes[key].nota == null) && " row-span-2")
                  }
                >
                  {participante.nick}
                </span>
                {(exibirPontuacao && res.musica.avaliacoes[key].nota != null) && (
                  <>
                    <span className="flex justify-center items-center text-lg">nota:</span>
                    <div className="flex justify-center items-center text-4xl sm:text-5xl"><Pontuacao pontuacao={res.musica.avaliacoes[key].nota} /></div>
                  </>
                )}
              </div>
            );
          }
        })}
      </div>
      <div className="col-span-2 flex flex-col justify-center items-center">
        <div className="text-neon-blue-100">
          {!res.sala.sala_finalizada && (
          <>
            {res.sala.ordem == 7 ? "FIM DA SALA EM: " : "PRÓXIMA MÚSICA EM: "}
            <FormataData dataTransformar={res.sala.tempo_restante} progressivo={false} formato="hh:mm:ss" />
          </>
          )}
          
        </div>
        <div className="text-zinc-500 text-center text-xl my-2">{ordem}/7</div>
        <div className="flex items-center w-full">
          <Link
            className={ordem > 1 ? "" : "invisible"}
            href={
              ordem > 1 ? `/sala/${id}/${ordem - 1}` : `/sala/${id}/${ordem}`
            }
          >
            <BiSkipPrevious className="text-6xl sm:text-8xl" />
          </Link>
          <div className="relative w-full">
            <Image
              width={600}
              height={600}
              className="max-h-[600px] w-full"
              src={musica.album.images[0].url}
              alt={musica.name}
            />
            <Link
                href={musica.external_urls.spotify}
                className="absolute top-2 right-2 z-50"
                >
                <FaSpotify className=" text-3xl text-green-500 cursor-pointer"/> 
            </Link>
            <div
              className={
                "absolute w-full h-full top-0 left-0 bg-black-100 bg-opacity-70 flex flex-col items-center justify-center " +
                (exibirPontuacao ? "block" : "hidden")
              }
            >
              <span className="sm:text-2xl uppercase">Pontuação:</span>
              <span className="text-5xl sm:text-9xl"><Pontuacao pontuacao={res.musica.pontuacao} /></span>
            </div>
          </div>
          <Link
            className={(ordem < res.sala.ordem || res.sala.sala_finalizada === true) ? "" : "invisible"}
            href={
              ordem < 7
                ? `/sala/${id}/${parseInt(ordem) + 1}`
                : `/sala/${id}/final`
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
      </div>
      <div className="hidden sm:flex flex-col justify-center">
        {res.participantes.map((participante, key) => {
          if (key >= 3) {
            return (
              <div key={key} className="w-full border border-neon-blue-100 my-2 h-28 grid grid-cols-3 p-2">
                <Image
                  src={"/icones/" + participante.icon}
                  alt={"Icone " + participante.nick}
                  height={80}
                  width={80}
                  className="rounded-full border border-neon-blue-200 row-span-2 my-2 mx-auto"
                />
                <span
                  className={
                    "text-xl col-span-2 flex items-center justify-center text-center" +
                    ((!exibirPontuacao || res.musica.avaliacoes[key].nota == null) && " row-span-2")
                  }
                >
                  {participante.nick}
                </span>
                {(exibirPontuacao && res.musica.avaliacoes[key].nota != null) && (
                  <>
                    <span className="flex justify-center items-center text-lg">nota:</span>
                    <div className="flex justify-center items-center text-4xl sm:text-5xl"><Pontuacao pontuacao={res.musica.avaliacoes[key].nota} /></div>
                  </>
                )}
              </div>
            );
          }
        })}
      </div>
      <div className="sm:hidden flex flex-col mt-5">
        {res.participantes.map((participante, key) => (
          <div key={key} className="w-full border border-neon-blue-100 my-2 h-28 grid grid-cols-3 p-2">
            <Image
              src={"/icones/" + participante.icon}
              alt={"Icone " + participante.nick}
              height={80}
              width={80}
              className="rounded-full border border-neon-blue-200 row-span-2 my-2 mx-auto"
            />
            <span
              className={
                "text-xl col-span-2 flex items-center justify-center text-center" +
                ((!exibirPontuacao || res.musica.avaliacoes[key].nota == null) && " row-span-2")
              }
            >
              {participante.nick}
            </span>
            {(exibirPontuacao && res.musica.avaliacoes[key].nota != null) && (
              <>
                <span className="flex justify-center items-center text-lg">nota:</span>
                <div className="flex justify-center items-center text-4xl sm:text-5xl"><Pontuacao pontuacao={res.musica.avaliacoes[key].nota} /></div>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
