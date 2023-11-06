"use server";
import { getDictionary } from '@/utils/dictionaries'
import { searchData } from '@/utils/spotify'

import Container from '@/components/search/Container';

export default async function Page({ params: { lang, param } }) {
  const dict = await getDictionary(lang);
  const searchTerm = await searchData(param);

  return (
    <>
      <Container searchTerm={searchTerm}/>
    </>
  );
}
