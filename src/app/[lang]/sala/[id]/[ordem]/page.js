import Link from "next/link";
import { redirect } from "next/navigation";

import { getDictionary } from "@/utils/dictionaries";
import { getMusic } from "@/utils/spotify";
import {
  pesquisaSala,
  pesquisaParticipantes,
  pesquisaMusica,
} from "@/utils/sala";

import { CronometroRegressivo } from "@/components/sala/CronometroRegressivo";
import { Avaliacao } from "@/components/sala/Avaliacao";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import Image from "next/image";

export default async function Page({ params: { lang, id, ordem } }) {
  const dict = await getDictionary(lang);

  const res = {
    sala: await pesquisaSala(id),
    musica: await pesquisaMusica(id, ordem),
    participantes: await pesquisaParticipantes(id),
  };

  console.log(res);
  const musica = await getMusic(res.musica.musica);
  console.log(musica.album.images[0]);

  return (
    <section className="grid sm:grid-cols-4 grid-cols-1 min-h-[calc(100vh-7rem)]">
      {res.musica.nota_usuario === null && <Avaliacao />}

      <div className="hidden sm:flex flex-col justify-center">
        {res.participantes.map((participante, key) => {
          if (key < 3) {
            return (
              <div className="w-full border border-neon-blue-100 my-2 h-28 grid grid-cols-3 p-2">
                <Image
                  src={"/icones/" + participante.icon}
                  alt={"Icone " + participante.nick}
                  height={80}
                  width={80}
                  className="rounded-full border border-neon-blue-200 row-span-2 my-2"
                />
                <span
                  className={
                    "text-xl col-span-2 flex items-center justify-center text-center" +
                    (res.musica.nota_usuario == null && " row-span-2")
                  }
                >
                  {participante.nick}
                </span>
                {res.musica.nota_usuario != null && (
                  <>
                    <span>nota:</span>
                    <div>{res.musica.avaliacoes[key]}</div>
                  </>
                )}
              </div>
            );
          }
        })}
      </div>
      <div className="col-span-2 flex flex-col justify-center items-center">
        <div className="text-neon-blue-100">
          PRÓXIMA MÚSICA EM:{" "}
          <CronometroRegressivo dataFutura={res.sala.tempo_restante} />
        </div>
        <div className="text-zinc-500 text-center text-xl my-2">{ordem}/7</div>
        <div className="flex items-center">
          <Link
            className={ordem > 1 ? "" : "invisible"}
            href={
              ordem > 1 ? `/sala/${id}/${ordem - 1}` : `/sala/${id}/${ordem}`
            }
          >
            <BiSkipPrevious className="text-6xl sm:text-8xl" />
          </Link>
          <div className="relative">
            <Image
              width={600}
              height={600}
              className="max-h-[400px] w-full"
              src={musica.album.images[0].url}
              alt={musica.name}
            />
            <div
              className={
                "absolute w-full h-full top-0 left-0 bg-black-100 bg-opacity-70 " +
                (res.musica.nota_usuario != null ? "block" : "hidden")
              }
            ></div>
          </div>
          <Link
            className={ordem < 7 ? "" : "invisible"}
            href={
              ordem < 7
                ? `/sala/${id}/${parseInt(ordem) + 1}`
                : `/sala/${id}/${ordem}`
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
              <div className="w-full border border-neon-blue-100 my-2 h-28 grid grid-cols-3 p-2">
                <Image
                  src={"/icones/" + participante.icon}
                  alt={"Icone " + participante.nick}
                  height={80}
                  width={80}
                  className="rounded-full border border-neon-blue-200 row-span-2 my-2"
                />
                <span
                  className={
                    "text-xl col-span-2 flex items-center justify-center text-center" +
                    (res.musica.nota_usuario == null && " row-span-2")
                  }
                >
                  {participante.nick}
                </span>
                {res.musica.nota_usuario != null && (
                  <>
                    <span>nota:</span>
                    <div>{res.musica.avaliacoes[key]}</div>
                  </>
                )}
              </div>
            );
          }
        })}
      </div>
      <div className="sm:hidden flex flex-col mt-5">
        {res.participantes.map((participante, key) => (
          <div className="w-full border border-neon-blue-100 my-2 h-28 grid grid-cols-3 p-2">
            <Image
              src={"/icones/" + participante.icon}
              alt={"Icone " + participante.nick}
              height={80}
              width={80}
              className="rounded-full border border-neon-blue-200 row-span-2 my-2"
            />
            <span
              className={
                "text-xl col-span-2 flex items-center justify-center text-center" +
                (res.musica.nota_usuario == null && " row-span-2")
              }
            >
              {participante.nick}
            </span>
            {res.musica.nota_usuario != null && (
              <>
                <span>nota:</span>
                <div>{res.musica.avaliacoes[key]}</div>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
