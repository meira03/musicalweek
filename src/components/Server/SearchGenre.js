"use client"
import { getTrack, getArtist, createRoom } from "../../lib/fetch";

async function handleClick (music, genre) {
  var track = await createRoom(music, genre);

  console.log(track);
}

export default async function SearchGenre({ id }) {
  if (id != undefined) {
    var track = await getTrack(id);
    var artistId = track.artists[0].id;

    var artist = await getArtist(artistId);
    var genres = artist.genres
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {genres.map((genre) => (
          <div key={genre} onClick={() => {handleClick(id, genre)}} className="flex items-center justify-center h-[30vh] p-2 rounded-lg cursor-pointer bg-zinc-200 hover:bg-zinc-100 dark:bg-zinc-800 hover:dark:bg-zinc-700">            
            <span className="font-semibold text-3xl dark:text-white block">{genre}</span>
          </div>
        ))}
        <div key="general" onClick={() => {handleClick(id, "general")}} className="flex items-center justify-center h-[30vh] p-2 rounded-lg cursor-pointer bg-zinc-200 hover:bg-zinc-100 dark:bg-zinc-800 hover:dark:bg-zinc-700">            
          <span className="font-semibold text-3xl dark:text-white block">Geral</span>
        </div>
      </div>
    );
  }
}
