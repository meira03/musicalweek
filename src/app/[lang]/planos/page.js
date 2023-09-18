import Link from 'next/link';

export default function Planos() {
  const planos = [
    {
      nome: "Plano Gratuito",
      preco: "Grátis",
      participacaoSalasPadrao: "2 salas simultâneas",
      participacaoSalasArtistas: "Ilimitado",
      historicoSalas: "Últimas 5 salas",
      criacaoSalasArtista: "",
      estatisticas: "",
    },
    {
      nome: "Plano Premium",
      preco: "R$4.90",
      participacaoSalasPadrao: "5 salas simultâneas",
      participacaoSalasArtistas: "Ilimitado",
      historicoSalas: "Últimas 10 salas",
      criacaoSalasArtista: "",
      estatisticas: "",
    },
    {
      nome: "Plano do Artista",
      preco: "R$49.90",
      participacaoSalasPadrao: "30 salas simultâneas",
      participacaoSalasArtistas: "Ilimitado",
      historicoSalas: "Últimas 60 salas",
      criacaoSalasArtista: "1 por semana",
      estatisticas: "Personalizadas",
    },
  ];

  return (
    <div className="min-h-screen text-white">
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-semibold mb-6 text-center">Planos e Preços</h1>
        <p className="text-lg font-semibold mb-8 text-center">
          Escolha o plano que melhor atenda à sua necessidade e aproveite por completo os benefícios da nossa aplicação com os planos pagos. Descubra um universo de músicas em um só lugar.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {planos.map((plano, index) => (
            <div
              key={index}
              className="p-6 border border-gray-600 rounded-lg shadow-md text-center flex flex-col justify-between hover:bg-gray-800 transition duration-300"
            >
              <div>
                <h2 className="text-2xl text-white font-bold mb-4">{plano.nome}</h2>
                <p className="text-xl text-white font-bold mb-4">{plano.preco}</p>
                <p className="text-base font-semibold mb-2">Salas Padrões: {plano.participacaoSalasPadrao}</p>
                <p className="text-base font-semibold mb-2">Salas de Artistas: {plano.participacaoSalasArtistas}</p>
                {plano.criacaoSalasArtista && (
                  <p className="text-base font-semibold mb-2">Criação de Salas de Artista: {plano.criacaoSalasArtista}</p>
                )}
                {plano.historicoSalas && (
                  <p className="text-base font-semibold mb-2">Histórico: {plano.historicoSalas}</p>
                )}
                {plano.estatisticas && (
                  <p className="text-base font-semibold mb-2">Estatísticas: {plano.estatisticas}</p>
                )}
              </div>
              <Link href="/planos/page">
                <button className="bg-teal-500 hover:bg-teal-600 text-white rounded-lg px-6 py-3 mt-4">
                  Escolher Plano
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
