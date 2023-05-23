import Image from "next/image";
import Link from "next/link";
import { getSearchMusic } from "../../lib/fetch";

export default async function SearchMusic({ search }) {

  if (search != "") {
    var musics = await getSearchMusic(search);
    var musics = musics.tracks.items;
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 cursor-pointer">
        {musics.map((music) => (
          <Link key={music.id} href={`/genre/${music.id}`} >
          <div className="p-2 rounded-lg bg-zinc-200 hover:bg-zinc-100 dark:bg-zinc-800 hover:dark:bg-zinc-700">
            <Image
              src={music.album.images[0].url}
              alt={music.name}
              width="0"
              height="0"
              sizes="100vw"
              className="h-auto w-full rounded-sm"
              placeholder="blur"
              blurDataURL="/darkmusicalweek.webp"
            />
            <span className="font-semibold dark:text-white truncate text-elipsis block">{music.name}</span>
            <span className="font-semibold text-sm dark:text-zinc-300 truncate text-elipsis block">{music.artists[0].name}</span>
          </div>
          </Link>
        ))}
      </div>
    );
  } else{
    return (
      <div className="w-full h-full flex justify-center items-center rounded text-4xl text-black bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-400"></div>
    )
  }
}
