"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { insereMusica } from "@/utils/sala";

import "@/styles/search/Music.css";

export const Music = ({ track, click = true }) => {
  const router = useRouter();

  async function handleClick(id_musica) {
    insereMusica(id_musica).then((res) => {
      if (res.redirect != undefined) window.location.href = (res.redirect);
      else document.getElementById("search-error").innerHTML = res.error;
    });
  }

  return (
    <div
      key={track.id}
      className="cursor-pointer relative rounded-sm shadow-md shadow-neon-blue-100/10 hover:shadow-neon-blue-100/20"
    >
      <Image
        src={track.album.images[0].url}
        alt={track.name}
        width="0"
        height="0"
        sizes="100vw"
        className="h-auto w-full rounded-sm"
      />
      <div
        onClick={() => {
          click && handleClick(track.id)
        }}
        className="absolute bottom-0 w-full h-full flex flex-col justify-end px-3 py-2 bg-gradient-to-t from-black-800 to-transparent to-100% bg-opacity-80"
      >
        <span className="font-semibold text-white truncate text-elipsis block text-center">
          {track.name}
        </span>
        <span className="font-semibold sm:text-xs text-zinc-400 truncate text-elipsis block text-center">
          {track.artists[0].name}
        </span>
      </div>
    </div>
  );
};
