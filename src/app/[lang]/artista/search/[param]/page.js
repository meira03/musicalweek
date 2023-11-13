"use server";
import { searchData } from '@/utils/spotify'

import Container from '@/components/search/Container';

export default async function Page({ params: { lang, param } }) {
  const searchTerm = await searchData(param);

  return (
    <>
      <Container searchTerm={searchTerm}/>
    </>
  );
}
