import Image from "next/image";

import { fetchSalaData } from "@/utils/home";
import { getDictionary } from "@/utils/dictionaries";

import ComoParticiparCarrossel from "@/components/home/ComoParticiparCarrossel";
import ArtistasCarrossel from "@/components/home/ArtistasCarrossel";
import TopCarrossel from "@/components/home/TopCarrossel";
import ParticipeAgora from "@/components/home/ParticipeAgora";

export default async function Page({ params: { lang } }) {
  const dict = await getDictionary(lang);
  const data = await fetchSalaData();
  return (
    <>
      <section className="pb-3">
        <div className="pt-10">
          <h1 className="neon-text text-4xl sm:text-5xl text-center">COMO PARTICIPAR</h1>
          <ComoParticiparCarrossel />
        </div>
      </section>
      <section>
        <ParticipeAgora></ParticipeAgora>
      </section>
      <section className="my-9">
        <h1 className="neon-text text-4xl sm:text-6xl text-center mb-9">
          SALAS DOS ARTISTAS
        </h1>
        <ArtistasCarrossel salas_artista={data.salas_artista} />
      </section>
      <section className="my-9 sm:max-w-7xl sm:mx-auto">
        <TopCarrossel />
      </section>
    </>
  );
  return <h1>{dict.hello}</h1>;
}
