import { pesquisaSalaFinal } from "@/utils/sala";
import { getMusic } from "@/utils/spotify";
import Image from "next/image";
import { Pontuacao } from "@/components/Pontuacao";
import { getDictionary } from "@/utils/dictionaries";

export const metadata = {
  title: "Sala do Artista",
};

export default async function Page({ params: {  id, lang } }) {
  let dict = await getDictionary(lang);
  dict = dict.sala_id_final;

  let res = await pesquisaSalaFinal(id);

  for (let i = 0; i < res.musicas.length; i++) {
    res.musicas[i].musica = await getMusic(res.musicas[i].musica);
  }

  return (
    <main className="max-w-7xl mx-auto">
      <h1 className="neon-text uppercase text-3xl sm:text-5xl text-center mb-14">
      {dict.fim_sala}
      </h1>
      <div className="grid grid-cols-1 mx-10 sm:mx-auto sm:grid-cols-3">
        <div className="relative bottom-0 right-0 justify-self-end self-end hidden sm:block">
          <div className="w-10/12 mx-auto relative">
            <Image
              src={res.musicas[1].musica.album.images[0].url}
              alt={res.musicas[1].musica.name}
              width={500}
              height={500}
              className="mb-5"
            />
            <div className="bg-black-0 bg-opacity-50 absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
              <span className="uppercase white-text text-lg">{dict.pontuacao}</span>
              <span className="text-8xl">
                <Pontuacao pontuacao={res.musicas[1].pontuacao} />
              </span>
            </div>
          </div>
          <h1 className="white-text text-2xl text-center">
            {res.musicas[1].musica.name}
          </h1>
          <h2 className="text-zinc-400 text-lg text-center">
            {res.musicas[1].musica.artists[0].name}
          </h2>
          <div className="flex items-center justify-center mt-5">
            <Image
              src={"/icones/" + res.musicas[1].icone}
              alt={"Icone " + res.musicas[1].usuario_dono}
              width={200}
              height={200}
              className="rounded-full w-1/5"
            />
            <span className={"ml-4 uppercase text-xl"}>
              {res.musicas[1].usuario_dono}
            </span>
          </div>
          <span></span>
        </div>
        <div className="relative">
          <div className="relative">
            <Image
              src={res.musicas[0].musica.album.images[0].url}
              alt={res.musicas[0].musica.name}
              width={500}
              height={500}
              className="mb-4"
            />
            <Image
              src="/images/coroa.png"
              alt="Coroa MusicalWeek"
              className="absolute -top-[12%] -left-[16%] -rotate-45 w-2/6 z-50"
              width={400}
              height={300}
            />
            <div className="bg-black-0 bg-opacity-50 absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
              <span className="uppercase white-text text-lg">{dict.pontuacao}</span>
              <span className="text-8xl">
                <Pontuacao pontuacao={res.musicas[0].pontuacao} />
              </span>
            </div>
          </div>
          <h1 className="white-text text-2xl text-center">
            {res.musicas[0].musica.name}
          </h1>
          <h2 className="text-zinc-400 text-lg text-center">
            {res.musicas[0].musica.artists[0].name}
          </h2>
          <div className="flex items-center justify-center mt-5">
            <Image
              src={"/icones/" + res.musicas[0].icone}
              alt={"Icone " + res.musicas[0].usuario_dono}
              width={200}
              height={200}
              className="rounded-full w-1/5"
            />
            <span className={"ml-4 uppercase text-xl"}>
              {res.musicas[0].usuario_dono}
            </span>
          </div>
          <span></span>
        </div>
        <div className="relative justify-self-start self-end hidden sm:block">
          <div className="w-10/12 mx-auto relative">
            <Image
              src={res.musicas[2].musica.album.images[0].url}
              alt={res.musicas[2].musica.name}
              width={500}
              height={500}
              className="mb-5"
            />
            <div className="bg-black-0 bg-opacity-50 absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
              <span className="uppercase white-text text-lg">{dict.pontuacao}</span>
              <span className="text-8xl">
                <Pontuacao pontuacao={res.musicas[2].pontuacao} />
              </span>
            </div>
          </div>
          <h1 className="white-text text-2xl text-center">
            {res.musicas[2].musica.name}
          </h1>
          <h2 className="text-zinc-400 text-lg text-center">
            {res.musicas[2].musica.artists[0].name}
          </h2>
          <div className="flex items-center justify-center mt-5">
            <Image
              src={"/icones/" + res.musicas[2].icone}
              alt={"Icone " + res.musicas[2].usuario_dono}
              width={200}
              height={200}
              className="rounded-full w-1/5"
            />
            <span className={"ml-4 uppercase text-xl"}>
              {res.musicas[2].usuario_dono}
            </span>
          </div>
          <span></span>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 py-20 sm:gap-20">
        <div className="flex flex-col items-center justify-start sm:justify-center mb-20 sm:mb-0">
          <span className="uppercase text-white text-lg">{dict.nota_sala}</span>
          <h2 className="text-9xl">
            <Pontuacao pontuacao={res.nota_sala} />
          </h2>
        </div>
        <div className="flex flex-col items-start justify-center col-span-2 gap-3">
          {res.musicas.map((i, key) => (
            <div
              key={key}
              className="w-full h-24 border border-neon-blue-200 relative"
              style={{
                backgroundImage: `url(${i.musica.album.images[0].url})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            >
              <div className="top-0 left-0 w-full h-full absolute bg-black-700 bg-opacity-60 grid grid-cols-5 sm:gap-5 px-4 py-2">
                <div className="flex items-center justify-center text-4xl sm:text-6xl h-full">
                  <Pontuacao pontuacao={i.pontuacao} />
                </div>
                <div className="col-span-2 flex flex-col sm:flex-row items-center justify-start">
                  <Image
                    src={"/icones/" + i.icone}
                    alt={"Icone " + i.usuario_dono}
                    width={200}
                    height={200}
                    className="rounded-full h-14 sm:h-20 w-auto"
                  />
                  <span className="uppercase white-text text-xs sm:text-lg sm:ml-5 truncate max-w-full">{i.usuario_dono}</span>
                </div>
                <div className="col-span-2 flex flex-col text-right justify-center items-end">
                  <span className="text-lg sm:text-3xl max-w-full truncate">{i.musica.name}</span>
                  <span className="text-sm sm:text-lg max-w-full truncate">{i.musica.artists[0].name}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
