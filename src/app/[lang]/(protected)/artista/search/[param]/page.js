"use server";
import { searchData } from '@/utils/spotify'
import Container from '@/components/search/Container';
import { getDictionary } from "@/utils/dictionaries";

export default async function Page({ params: {param}, params: {lang} }) {
  let dict = await getDictionary(lang);
  dict = dict.artista_search;
  const searchTerm = await searchData(param);

  return (
    <>
      <Container searchTerm={searchTerm} dict={dict.components_search_artista}/>
    </>
  );
}
