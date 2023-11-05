import { infoSalaArtista } from "@/utils/sala";

export default async function Page({ params: { lang, id } }) {
  const infoSala = await infoSalaArtista(id);

  // Função para ordenar as músicas por nota decrescente
  const sortedMusicas = infoSala
    ? infoSala.musicas.sort((a, b) => (b.nota_calculada || 0) - (a.nota_calculada || 0))
    : [];

  return (
    <main className="mx-auto sm:max-w-7xl px-2 sm:px-6 lg:px-8 min-h-[80vh] flex justify-center items-center">
      <div className="bg-gray-100 dark:bg-zinc-800 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-4/5 sm:w-1/2">
        <h1 className="dark:text-white text-center text-3xl font-bold mb-6 uppercase">
          ESTATÍSTICAS - {infoSala ? infoSala.sala : "Carregando..."}
        </h1>
        {infoSala ? (
          <div>
            {sortedMusicas.length > 0 ? (
              <div>
                {/* Exibir o pódio com as três melhores músicas */}
                {sortedMusicas.slice(0, 3).map((musica, index) => (
                  <div
                    key={musica.id_musica}
                    className={`mb-4 relative p-4 
                      ${index === 0 ? 'bg-gold' : index === 1 ? 'bg-silver' : 'bg-bronze'}-300 
                      dark:${index === 0 ? 'bg-gold' : index === 1 ? 'bg-silver' : 'bg-bronze'}-500 
                      shadow-md rounded
                    `}
                  >
                    <div
                      className={`border-4 absolute top-0 left-0 right-0 bottom-0 
                        ${index === 0 ? 'border-yellow-400' : index === 1 ? 'border-gray-400' : 'border-red-400'}
                      `}
                    ></div>
                    <p>ID da Música: {musica.id_musica ? musica.id_musica.trim() : 'N/A'}</p>
                    <p>Nota Calculada: {musica.nota_calculada || 'N/A'}</p>
                    <p>Avaliações: {musica.avaliacoes}</p>
                    {/* <p>Exibida: {musica.exibida ? 'Sim' : 'Não'}</p> */}
                  </div>
                ))}

                {/* Músicas com cores padrão a partir da 4ª música */}
                {sortedMusicas.slice(3).map((musica, index) => (
                  <div
                    key={musica.id_musica}
                    className="mb-4 relative p-4 bg-gray-100 dark:bg-zinc-800 shadow-md rounded"
                  >
                    <p>ID da Música: {musica.id_musica ? musica.id_musica.trim() : 'N/A'}</p>
                    <p>Nota Calculada: {musica.nota_calculada || 'N/A'}</p>
                    <p>Avaliações: {musica.avaliacoes}</p>
                    {/* <p>Exibida: {musica.exibida ? 'Sim' : 'Não'}</p> */}
                  </div>
                ))}
              </div>
            ) : (
              <p>Nenhuma música disponível.</p>
            )}
          </div>
        ) : (
          <p>Buscando dados...</p>
        )}
      </div>
    </main>
  );
}
