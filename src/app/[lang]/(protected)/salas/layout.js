import "@/styles/globals.css";

import { salasUsuario } from "@/utils/user";
import { getMusic } from "@/utils/spotify";

import { NavSalas } from "@/components/salas/NavSalas";

import Link from "next/link";
import Image from "next/image";
import { getDictionary } from "@/utils/dictionaries";

export const metadata = {
  title: "Salas",
};

export default async function SalasLayout({ children, params: { lang } }) {
  let dict = await getDictionary(lang);
  dict = dict.home;
  
  const salas = await salasUsuario();
  

  const recomendacoes = salas.recomendacoes;
  
  return (
    <div className="py-10 mx-3 sm:mx-auto sm:max-w-4xl">
      <NavSalas padrao={salas.salas.length > 0} artista={salas.salas_artista.length > 0} fila={salas.filas.length > 0} historico={salas.historico.length > 0} minhas_salas={salas.minhas_salas.length > 0} />
      <div className="grid grid-cols-1 gap-5">{children}</div>
      {recomendacoes.length > 1 && (
        <>
          <h1 className="text-2xl sm:text-4xl text-center mt-12">RECOMENDAÇÕES</h1>
          <div className="grid grid-cols-1 gap-5">
            <></>
            {recomendacoes.map(async (i, key) => {
              const musica = await getMusic(i.id_musica);
              return (
                <Link
                  key={key}
                  href={"/artista/sala/" + i.id_sala_artista + "/7"}
                  className="w-full h-28 sm:h-24 relative border border-neon-blue-100"
                  style={{
                    backgroundImage: `url(${musica.album.images[0].url})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                >
                  <div className="top-0 left-0 w-full h-full absolute bg-black-700 bg-opacity-60 grid grid-cols-2 px-4 py-2">
                    <div className="flex flex-col sm:flex-row justify-start items-center">
                      <Image
                        src={"/icones/" + i.artista.icon}
                        alt={"Icone " + i.artista.nick}
                        width={75}
                        height={75}
                        className="rounded-full sm:mr-5 max-h-full"
                      />
                      <h2 className="sm:text-3xl">{i.artista.nick}</h2>
                    </div>

                    <div className="flex flex-col justify-center items-end text-right">
                      <h2 className="text-xl sm:text-3xl truncate text-elipsis max-w-full">
                        {musica.name}
                      </h2>
                      <h3 className="text-sm sm:text-lg text-gray-200 truncate text-elipsis">
                        {musica.artists[0].name}
                      </h3>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
