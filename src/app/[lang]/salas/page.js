import { getMusic } from "@/utils/spotify";
import { salasUsuario } from "@/utils/user";

import { Pontuacao } from "@/components/Pontuacao";
import { FormataData } from "@/components/FormataData";

import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page() {
  const salas = await salasUsuario();
  const padrao = salas.salas;
  
  if(padrao.length > 0){
    return (
      <>
        {padrao.length > 0 &&
          salas.salas.map(async (i, key) => {
            const musica = await getMusic(i.id_musica);
            if (i.pontuacao != undefined) {
              return (
                <Link
                  key={key}
                  href={"/sala/" + i.id_sala + "/" + i.ordem_sala}
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
                        {i.ordem_sala}/7
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
                        <span className="text-sm">
                          PRÓXIMA EM:{" "}
                          <FormataData
                            dataTransformar={i.tempo_restante}
                            progressivo={false}
                            formato="hh:mm:ss"
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-evenly items-center">
                    <span className="text-2xl uppercase">Pontuação:</span>
                    <span className="text-6xl">
                      <Pontuacao pontuacao={i.pontuacao} />
                    </span>
                  </div>
                </Link>
              );
            } else {
              return (
                <Link
                  key={key}
                  href={"/sala/" + i.id_sala + "/" + i.ordem_sala}
                  className="w-full h-24 relative border border-neon-blue-100"
                  style={{
                    backgroundImage: `url(${musica.album.images[0].url})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                >
                  <div className="top-0 left-0 w-full h-full absolute bg-black-700 bg-opacity-60 grid grid-cols-4 px-4 py-2">
                    <div className="text-5xl flex justify-center items-center tracking-wider">
                      {i.ordem_sala}/7
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
                      <span className="text-5xl uppercase">
                        <FormataData
                          dataTransformar={i.tempo_restante}
                          progressivo={false}
                          formato="mm:ss"
                        />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            }
          })}
      </>
    );
  }
}
