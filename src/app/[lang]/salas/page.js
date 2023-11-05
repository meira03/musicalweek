import { getDictionary } from "@/utils/dictionaries";
import { salasUsuario } from "@/utils/user";
import { getMusic } from "../../../utils/spotify";

import { Pontuacao } from "@/components/Pontuacao";
import { FormataData } from "@/components/FormataData";
import { SairFila } from "@/components/salas/SairFila";

import Link from "next/link";
import Image from "next/image";

export default async function Page({ params: { lang } }) {
  const dict = await getDictionary(lang);
  const res = await salasUsuario();
  const salas = await JSON.parse(res);

  return (
    <div className="grid grid-cols-1 gap-8 py-10 mx-3 sm:mx-auto sm:max-w-2xl">
      <h1 className="neon-text text-5xl text-center">SALAS</h1>
      {salas.filas.map(async (i, key) => {
        const musica = await getMusic(i.id_musica);
        return (
          <div
            key={key}
            className="w-full h-24 relative border border-neon-blue-100"
            style={{
              backgroundImage: `url(${musica.album.images[0].url})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <SairFila id_musica_sala={i.id_musica_sala} />
            <div className="top-0 left-0 w-full h-full absolute bg-black-700 bg-opacity-60 grid grid-cols-2 px-4 py-2">
              <div className="flex flex-col justify-center">
                <h2 className="text-3xl truncate text-elipsis">
                  {musica.name}
                </h2>
                <h3 className="text-lg text-gray-200 truncate text-elipsis">
                  {musica.artists[0].name}
                </h3>
              </div>
              <div className="flex flex-col justify-center items-center">
                <span className="text-xl uppercase font-tech">
                  Procurando usuários:
                </span>
                <span className="text-2xl uppercase font-tech"><FormataData dataTransformar={i.inicio_fila} progressivo={true} formato="hh:mm:ss" /></span>
              </div>
            </div>
          </div>
        );
      })}
      {salas.salas.map(async (i, key) => {
        const musica = await getMusic(i.id_musica);
        if (i.pontuacao != undefined) {
          return (
            <Link
              key={key}
              href={"/sala/" + i.id_sala + "/" + i.ordem}
              className="w-full h-24 border border-neon-blue-100 grid grid-cols-2"
            >
              <div
                style={{
                  backgroundImage: `url(${musica.album.images[0].url})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
                className="relative border-r border-neon-blue-200"
              >
                <div className="top-0 left-0 w-full h-full absolute bg-black-700 bg-opacity-60 grid grid-cols-3 px-4 py-2">
                  <div className="row-span-2 text-5xl flex justify-center items-center tracking-wider">
                    {i.ordem}/7
                  </div>
                  <div className="flex flex-col justify-start col-span-2 text-right leading-none">
                    <h2 className="text-lg truncate text-elipsis">
                      {musica.name}
                    </h2>
                    <h3 className="text-sm text-gray-200 truncate text-elipsis">
                      {musica.artists[0].name}
                    </h3>
                  </div>
                  <div className="flex flex-col justify-end col-span-2 text-right leading-none">
                    <span className="text-sm">PRÓXIMA EM: <FormataData dataTransformar={i.tempo_restante} progressivo={false} formato="hh:mm:ss" /></span>
                  </div>
                </div>
              </div>
              <div className="flex justify-evenly items-center">
                <span className="text-2xl uppercase">Pontuação:</span>
                <span className="text-6xl"><Pontuacao pontuacao={i.pontuacao} /></span>
              </div>
            </Link>
          );
        } else {
          return (
            <Link
              key={key}
              href={"/sala/" + i.id_sala + "/" + i.ordem}
              className="w-full h-24 relative border border-neon-blue-100"
              style={{
                backgroundImage: `url(${musica.album.images[0].url})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            >
              <div className="top-0 left-0 w-full h-full absolute bg-black-700 bg-opacity-60 grid grid-cols-4 px-4 py-2">
                <div className="text-5xl flex justify-center items-center tracking-wider">
                  {i.ordem}/7
                </div>
                <div className="flex flex-col justify-center col-span-2 text-center">
                  <h2 className="text-3xl truncate text-elipsis">
                    {musica.name}
                  </h2>
                  <h3 className="text-lg text-gray-200 truncate text-elipsis">
                    {musica.artists[0].name}
                  </h3>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <span className="text-5xl uppercase"><FormataData dataTransformar={i.tempo_restante} progressivo={false} formato="mm:ss" /></span>
                </div>
              </div>
            </Link>
          );
        }
      })}
      {salas.historico.map(async (i, key) => {
        const musica = await getMusic(i.id_musica);
        return (
          <Link
            href={"/sala/" + i.id_sala + "/1"}
            key={key}
            className="w-full h-24 relative border border-neon-blue-100"
            style={{
              backgroundImage: `url(${musica.album.images[0].url})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <div
              style={{
                backdropFilter: "grayscale(1)",
              }}
              className="top-0 left-0 w-full h-full absolute bg-black-700 bg-opacity-60 grid grid-cols-2 px-4 py-2"
            >
              <div className="flex flex-col justify-center">
                <h2 className="text-3xl truncate text-elipsis">
                  {musica.name}
                </h2>
                <h3 className="text-lg text-gray-200 truncate text-elipsis">
                  {musica.artists[0].name}
                </h3>
              </div>
              <div className="flex flex-col justify-center items-end">
                <span className="text-4xl"><FormataData dataTransformar={i.data_inicio} progressivo={false} formato="DD/MM/YYYY" /></span>
              </div>
            </div>
          </Link>
        );
      })}
      <h1 className="neon-text text-5xl text-center mt-12">
        SALAS DOS ARTISTAS
      </h1>
      {salas.salas_artista.map(async (i, key) => {
        const musica = await getMusic(i.id_musica);
        return (
          <Link
            key={key}
            href={"sala/artista/" + i.id_sala_artista}
            className="w-full h-24 relative border border-neon-blue-100"
            style={{
              backgroundImage: `url(${musica.album.images[0].url})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <div className="top-0 left-0 w-full h-full absolute bg-black-700 bg-opacity-60 grid grid-cols-2 px-4 py-2">
              <div className="flex justify-start items-center">
                <Image
                  src={"/icones/" + i.artista.icon}
                  alt={"Icone " + i.artista.nick}
                  width={75}
                  height={75}
                  className="rounded-full mr-5 max-h-full"
                />
                <h2 className="text-3xl">{i.artista.nick}</h2>
              </div>

              <div className="flex flex-col justify-center items-end text-right">
                <h2 className="text-3xl truncate text-elipsis max-w-full">
                  {musica.name}
                </h2>
                <h3 className="text-lg text-gray-200 truncate text-elipsis">
                  {musica.artists[0].name}
                </h3>
              </div>
            </div>
          </Link>
        );
      })}
      <h1 className="neon-text text-5xl text-center mt-12">
        RECOMENDAÇÕES
      </h1>
      {salas.recomendacoes.map(async (i, key) => {
        const musica = await getMusic(i.id_musica);
        return (
          <Link
            key={key}
            href={"sala/artista/" + i.id_sala_artista}
            className="w-full h-24 relative border border-neon-blue-100"
            style={{
              backgroundImage: `url(${musica.album.images[0].url})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <div className="top-0 left-0 w-full h-full absolute bg-black-700 bg-opacity-60 grid grid-cols-2 px-4 py-2">
              <div className="flex justify-start items-center">
                <Image
                  src={"/icones/" + i.artista.icon}
                  alt={"Icone " + i.artista.nick}
                  width={75}
                  height={75}
                  className="rounded-full mr-5 max-h-full"
                />
                <h2 className="text-3xl">{i.artista.nick}</h2>
              </div>

              <div className="flex flex-col justify-center items-end text-right">
                <h2 className="text-3xl truncate text-elipsis max-w-full">
                  {musica.name}
                </h2>
                <h3 className="text-lg text-gray-200 truncate text-elipsis">
                  {musica.artists[0].name}
                </h3>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
