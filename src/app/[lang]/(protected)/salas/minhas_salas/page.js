import { getMusic } from "@/utils/spotify";
import { salasUsuario } from "@/utils/user";

import Link from "next/link";
import Image from "next/image";
import { FormataData } from "@/components/FormataData";

export default async function Page() {
  const salas = await salasUsuario();
  const minhas_salas = salas.minhas_salas;

  return (
    <>
      {minhas_salas.map(async (i, key) => {
        const musica = await getMusic(i.id_musica);
        return (

          <Link
            key={key}
            href={"/artista/sala/" + i.id_sala + "/resumo"}
            className="w-full h-28 sm:h-24 relative border border-neon-blue-100"
            style={{
              backgroundImage: `url(${musica.album.images[0].url})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <div
              key={key}
              style={{
                backdropFilter: minhas_salas.ativa === false ? "grayscale(1)" : "none",
              }}
              className="top-0 left-0 w-full h-full absolute bg-black-700 bg-opacity-60 grid grid-cols-2 px-4 py-2"
            ></div>
            <div className="top-0 left-0 w-full h-full absolute bg-black-700 bg-opacity-60 grid grid-cols-2 px-4 py-2">
              <div className="flex flex-col sm:flex-row justify-start items-center">
                <div className="flex flex-col justify-center">
                  <h2 className="text-xl sm:text-3xl truncate text-elipsis">
                    {musica.name}
                  </h2>
                  <h3 className="text-sm sm:text-lg text-gray-200 truncate text-elipsis">
                    {musica.artists[0].name}
                  </h3>
                </div>
              </div>
              <div className="flex flex-col justify-center items-end">
                <span className="text-lg sm:text-4xl">
                  <FormataData
                    dataTransformar={i.data_criacao}
                    progressivo={false}
                    formato="DD/MM/YYYY"
                  />
                </span>
              </div>
            </div>
          </Link>
        );
      })}
    </>
  );
}
