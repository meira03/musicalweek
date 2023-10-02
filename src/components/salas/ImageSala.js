import Link from "next/link";
import Image from "next/image";

import { getMusic } from "@/utils/spotify";

export default async function ImageSala({ id_musica, id_sala, nome_sala, width }) {
  const musica = await getMusic(id_musica);
  return (
    <Link href={`/sala/${id_sala}`} className={"bg-zinc-800 p-2 " + width}>
      <Image
        src={musica.album.images[0].url}
        alt={musica.name}
        width="600"
        height="600"
        className="w-full h-auto"
      />
      <div className="text-sm text-center mt-5">{nome_sala}</div>
    </Link>
  );
}
