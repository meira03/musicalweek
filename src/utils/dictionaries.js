import 'server-only'
 
const dictionaries = {
  en: () => import("@/dictionaries/en.json").then(r => r.default),
  pt: () => import("@/dictionaries/pt.json").then(r => r.default)
}

export const getDictionary = async (lang) => {
  return await dictionaries[lang]();
}