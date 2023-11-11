import { getMusic } from "@/utils/spotify";
import { salasUsuario } from "@/utils/user";

import Link from "next/link";
import Image from "next/image";

export default async function Page() {
  const salas = await salasUsuario();
  const artista = salas.salas_artista;

  return (
    <>
      {artista.map(async (i, key) => {
        const musica = await getMusic(i.id_musica);
        return (
          <Link
            key={key}
            href={"/artista/sala/" + i.id_sala_artista + "/7"}
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
    </>
  );
}
