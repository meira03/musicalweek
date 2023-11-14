import { searchData } from '@/utils/spotify'

import { Music } from "@/components/search/Music";

 
export default async function Page({ params: {  param } }) {
  const searchTerm = await searchData(param)

  return (
    <>
      {searchTerm && searchTerm.tracks.items.map((track) => (
        <Music track={track} key={track.id} />
      ))}
    </>
    
  )
}