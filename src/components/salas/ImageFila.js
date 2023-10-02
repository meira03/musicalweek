import Link from "next/link";
import Image from "next/image";

import { getMusic } from "@/utils/spotify";

export default async function ImageFila({ id_musica, id_musica_sala, width }) {
  const musica = await getMusic(id_musica);
  return (
    <Link href={`/fila/${id_musica_sala}`} className={width}>
      <Image
        src={musica.album.images[0].url}
        alt={musica.name}
        width="600"
        height="600"
        className="rounded-full hover:scale-105 transition-all"
      />
    </Link>
  );
}
