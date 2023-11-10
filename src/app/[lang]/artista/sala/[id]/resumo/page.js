import { pesquisaSalaArtista } from "@/utils/artista";
import { getMusic } from "@/utils/spotify";

export const metadata = {
  title: 'Sala do Artista',
}

export default async function Page({ params: { lang, id } }) {
  const res = await pesquisaSalaArtista(id);

  const musicaDia = res.musicas
    .slice()
    .reverse()
    .find((musica) => musica.exibida === true);

  const proxMusica = res.musicas
    .slice()
    .find((musica) => musica.exibida === false);

  const melhorPontuacao = res.musicas.reduce((ultima, musica) => {
    return musica.nota_calculada > ultima ? musica : ultima;
  }, -Infinity);

  const maisAvaliado = res.musicas.reduce((ultima, musica) => {
    return musica.avaliacoes > ultima ? musica : ultima;
  }, -Infinity);

  return (
    <main className="mx-auto px-2 sm:px-6 lg:px-8 min-h-[80vh] flex justify-center items-center">
      <div className="shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="neon-text text-center text-5xl font-bold mb-6 uppercase">
          ESTATÍSTICAS - {res ? res.sala : "Carregando..."}
        </h1>
        <div className="grid grid-cols-3">
          <div className="col-span-2 grid grid-cols-2"></div>
          <div className="grid grid-cols-1 gap-4">
            {res.musicas.map(async (i, key) => {
              const musica = await getMusic(i.id_musica);
              const partes = res.data_criacao.split(" ");
              const data = partes[0];
              const [ano, mes, dia] = data.split("-");

              const dataOriginal = new Date(ano, mes - 1, dia);
              dataOriginal.setDate(dataOriginal.getDate() + key);

              const diaNovo = dataOriginal.getDate();
              const mesNovo = dataOriginal.getMonth() + 1;

              const musicDate = `${diaNovo}/${mesNovo}`;
              return (
                <div
                  className="border border-neon-blue-200 relative"
                  style={{
                    backgroundImage: `url(${musica.album.images[0].url})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                >
                  <div
                    className="bg-black-900 bg-opacity-70 grid grid-cols-3"
                    style={{
                      backdropFilter: !i.exibida ? "grayscale(1)" : "",
                    }}
                  >
                    <div className="text-center flex justify-center items-center pl-8">
                      <span className="text-white text-3xl tracking-widest">
                        {musicDate}
                      </span>
                    </div>
                    <div className="col-span-2 py-2 pr-3">
                      <h3 className="max-w-full text-right truncate text-elipsis">
                        {musica.name}
                      </h3>
                      <h4 className="max-w-full text-right text-xs truncate text-elipsis text-zinc-400">
                        {musica.artists[0].name}
                      </h4>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}

// {res.musicas.map((musica, index) => (
//     <div
//       key={musica.id_musica}
//       className="mb-4 relative p-4 bg-gray-100 dark:bg-zinc-800 shadow-md rounded"
//     >
//       <p>ID da Música: {musica.id_musica ? musica.id_musica.trim() : 'N/A'}</p>
//       <p>Nota Calculada: {musica.nota_calculada || 'N/A'}</p>
//       <p>Avaliações: {musica.avaliacoes == undefined ? 0 : musica.avaliacoes}</p>
//       {/* <p>Exibida: {musica.exibida ? 'Sim' : 'Não'}</p> */}
//     </div>
//   ))}
