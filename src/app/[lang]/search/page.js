import { getDictionary } from '@/utils/dictionaries'
import { getRecommendations } from '@/utils/spotify'

import { Music } from "@/components/search/Music";

 
export default async function Page({ params: { lang } }) {
  const dict = await getDictionary(lang)
  const recommendations = await getRecommendations()

  return (
    <>
      {recommendations && recommendations.tracks.items.map((track) => (
        <Music track={track.track} key={track.track.id} />
      ))}
    </>
    
  )
}