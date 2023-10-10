"use server";
import { getDictionary } from '@/utils/dictionaries'
import { searchData } from '@/utils/spotify'
import Image from "next/image";

import { Music, musicInfo } from "@/components/search-artista/Music";
import Container from '@/components/search-artista/Container';


export default async function Page({ params: { lang, param } }) {
  const dict = await getDictionary(lang);
  const searchTerm = await searchData(param);

  return (
    <>
      <Container searchTerm={searchTerm}/>
    </>
  );
}
