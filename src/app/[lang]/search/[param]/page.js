import { getDictionary } from '@/utils/dictionaries'
import { searchData } from '@/utils/spotify'

import { Music } from "@/components/search/Music";

 
export default async function Page({ params: { lang, param } }) {
  const dict = await getDictionary(lang)
  const searchTerm = await searchData(param)

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
        {searchTerm && searchTerm.tracks.items.map((track) => (
          <Music track={track} key={track.id} />
        ))}
      </div>
    </>
    
  )
}