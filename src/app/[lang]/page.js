import { fetchSalaData } from "@/utils/home";
import { getDictionary } from "@/utils/dictionaries";

import ComoParticiparCarrossel from "@/components/home/ComoParticiparCarrossel";
import ArtistasCarrossel from "@/components/home/ArtistasCarrossel";
import TopCarrossel from "@/components/home/TopCarrossel";
import ParticipeAgora from "@/components/home/ParticipeAgora";

export default async function Page({ params: { lang } }) {
  let dict = await getDictionary(lang);
  dict = dict.home;
  const data = await fetchSalaData();

  return (
    <>
      <section className="pb-3">
        <div className="pt-10">
          <h1 className="neon-text text-4xl sm:text-5xl text-center uppercase">{dict.como_participar_titulo}</h1>
          <ComoParticiparCarrossel dict={dict.como_participar} />
        </div>
      </section>
      <section>
        <ParticipeAgora dict={dict.participe} ></ParticipeAgora>
      </section>
      <section className="my-9">
        <h1 className="neon-text text-4xl sm:text-6xl text-center mb-9 uppercase">
          {dict.salas_artistas_titulo}
        </h1>
        <ArtistasCarrossel salas_artista={data.salas_artista} dict={dict.salas_artistas} />
      </section>
      <section className="my-9 sm:max-w-7xl sm:mx-auto">
        <TopCarrossel data={data} dict={dict.top} />
      </section>
    </>
  );
}
