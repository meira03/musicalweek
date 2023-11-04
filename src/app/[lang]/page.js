import { getDictionary } from '../../utils/dictionaries'
 
export default async function Page({ params: { lang } }) {
  const dict = await getDictionary(lang)
  return <h1>{dict.hello}</h1>
}