import { pesquisaSalaArtista } from "@/utils/artista";
import { getMusic } from "@/utils/spotify";
import { ArtistaMusicaResumo } from "@/components/sala/ArtistaMusicaResumo";
import { ArtistaTopMusicaResumo } from "@/components/sala/ArtistaTopMusicaResumo";
import { getDictionary } from "@/utils/dictionaries";

export const metadata = {
  title: "Sala do Artista",
};

export default async function Page({ params: {  id, params: { lang } } }) {
  let dict = await getDictionary(lang);
  dict = dict.artista_sala_resumo;

  const res = await pesquisaSalaArtista(id);

  let musicaDia = res.musicas
    .slice()
    .reverse()
    .find((musica) => musica.exibida === true);

  let proxMusica = res.musicas
    .slice()
    .find((musica) => musica.exibida === false);

  let melhorPontuacao = res.musicas.reduce((ultima, musica) => {
    return musica.nota_calculada > ultima ? musica : ultima;
  }, -Infinity);

  let maisAvaliado = res.musicas.reduce((ultima, musica) => {
    return musica.avaliacoes > ultima ? musica : ultima;
  }, -Infinity);

  if (maisAvaliado.avaliacoes == '0') {
    maisAvaliado = undefined;
  }

  if (melhorPontuacao.nota_calculada == null) {
    melhorPontuacao = undefined;
  }

  musicaDia != undefined
    ? (musicaDia.musica = await getMusic(musicaDia.id_musica))
    : null;
  proxMusica != undefined
    ? (proxMusica.musica = await getMusic(proxMusica.id_musica))
    : null;
  melhorPontuacao != undefined
    ? (melhorPontuacao.musica = await getMusic(melhorPontuacao.id_musica))
    : null;
  maisAvaliado != undefined
    ? (maisAvaliado.musica = await getMusic(maisAvaliado.id_musica))
    : null;

  return (
    <main className="mx-auto px-2 sm:px-6 lg:px-8 min-h-[80vh] max-w-7xl">
      <h1 className="neon-text text-center text-xl sm:text-5xl font-bold mb-6 uppercase">
        {dict.resumo} <br className="sm:hidden" /> {res ? res.sala : "Carregando..."}
      </h1>
      <div className="border border-neon-blue-200 p-2 relative inline-block text-center mx-auto border-b mb-4">
        {dict.quant_usuarios} {res ? res.usuarios : "Carregando..."}
      </div>


      <div className="flex flex-col sm:flex-row items-start justify-center">
        <div className="sm:w-2/5 grid grid-cols-2 grid-rows-2 gap-7 mb-10 sm:mb-0 sm:mr-32">
          <ArtistaTopMusicaResumo tipo={"atual"} musica={musicaDia} />
          <ArtistaTopMusicaResumo tipo={"prox"} musica={proxMusica} />
          <ArtistaTopMusicaResumo tipo={"pontuacao"} musica={melhorPontuacao} />
          <ArtistaTopMusicaResumo tipo={"avaliada"} musica={maisAvaliado} />
        </div>
        <div className="sm:w-1/3 grid grid-cols-1 gap-4">
          {res.musicas.map((i, key) => {
            const partes = res.data_criacao.split(" ");
            const data = partes[0];
            const [ano, mes, dia] = data.split("-");

            const dataOriginal = new Date(ano, mes - 1, dia);
            dataOriginal.setDate(dataOriginal.getDate() + key);

            const diaNovo = dataOriginal.getDate();
            const mesNovo = dataOriginal.getMonth() + 1;

            const musicDate = `${diaNovo.toString().padStart(2, "0")}/${mesNovo
              .toString()
              .padStart(2, "0")}`;
            return (
              <ArtistaMusicaResumo
                key={key}
                musica={i}
                data_criacao={musicDate}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
}
