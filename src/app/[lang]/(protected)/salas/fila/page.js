import { getMusic } from "@/utils/spotify";
import { salasUsuario } from "@/utils/user";

import { FormataData } from "@/components/FormataData";
import { SairFila } from "@/components/salas/SairFila";

export default async function Page() {
  const salas = await salasUsuario();
  const filas = salas.filas;

  return (
    <>
      {filas.map(async (i, key) => {
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
                <h2 className="text-xl sm:text-3xl truncate text-elipsis">
                  {musica.name}
                </h2>
                <h3 className="text-sm sm:text-lg text-gray-200 truncate text-elipsis">
                  {musica.artists[0].name}
                </h3>
              </div>
              <div className="flex flex-col justify-center items-center">
                <span className="text-sm text-center sm:text-xl uppercase font-tech">
                  Procurando usuários:
                </span>
                <span className="text-lg sm:text-2xl uppercase font-tech">
                  <FormataData
                    dataTransformar={i.inicio_fila}
                    progressivo={true}
                    formato="hh:mm:ss"
                  />
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
