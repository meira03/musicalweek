"use client";
import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { insereMusica } from "@/utils/sala";

export const Music = ({ track }) => { 
  return (
    <div
      key={track.id}
      
      className="p-2 rounded-lg bg-zinc-200 hover:bg-zinc-100 dark:bg-zinc-800 hover:dark:bg-zinc-700 cursor-pointer"
    >
      <Image
        src={track.album.images[0].url}
        alt={track.name}
        width="0"
        height="0"
        sizes="100vw"
        className="h-auto w-full rounded-sm"
      />
      <span className="font-semibold dark:text-white truncate text-elipsis block">
        {track.name}
      </span>
      <span className="font-semibold text-sm dark:text-zinc-300 truncate text-elipsis block">
        {track.artists[0].name}
      </span>
    </div>
  );
};



