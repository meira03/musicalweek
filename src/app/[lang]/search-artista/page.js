import { getDictionary } from '@/utils/dictionaries'
 
export default async function Page({ params: { lang } }) {
  const dict = await getDictionary(lang)

  return (
    <>
    </>
  )
}