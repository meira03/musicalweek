import { procuraMusica } from "../../lib/fetch";
import Image from "next/image";
import Link from "next/link";

const CardSala = async ({ nome, id_musica, id_sala }) => {
  if (id_sala != undefined) {
    const musica = await procuraMusica(id_musica);

    return (
      <Link prefetch={false} href={"/sala/" + id_sala}>
        <div className="p-2 rounded-lg bg-zinc-200 hover:bg-zinc-100 dark:bg-zinc-800 hover:dark:bg-zinc-700">
          <Image
            src={musica.album.images[0].url}
            alt={musica.name}
            width="0"
            height="0"
            sizes="100vw"
            className="h-auto w-full rounded-sm"
            placeholder="blur"
            blurDataURL="/darkmusicalweek.webp"
          />
          <span className="font-semibold dark:text-white truncate text-elipsis block">
            {nome != null ? nome : "Esperando Usuários"}
          </span>
        </div>
      </Link>
    );
  } else {
    return (
      <Link href="/musica">
        <div className="flex justify-center items-center p-2 min-h-full max-h-[25%] rounded-lg bg-zinc-200 hover:bg-zinc-100 dark:bg-zinc-800 hover:dark:bg-zinc-700">
          +
        </div>
      </Link>
    );
  }
};

export default CardSala;
