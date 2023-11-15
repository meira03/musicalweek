import { updatePlano } from "@/utils/user";
import { authOption } from "@/app/api/auth/[...nextauth]/route";
import EscolherPlano from "./EscolherPlano";
import { getServerSession } from "next-auth";

export default async function Planos() {
  const session = await getServerSession(authOption);

  async function handleClick(plano) {
    'use server'
    const res = await updatePlano(plano);
  }

  return (
    <div className="flex text-white items-center min-h-screen">
      <div className="container m-auto py-10 px-8">
        <h1 className="neon-text text-4xl uppercase font-semibold mb-6 text-center">
          Planos e Preços
        </h1>
        <p className="text-lg font-semibold mb-8 text-center">
          Escolha o plano que melhor atenda à sua necessidade e aproveite por
          completo os benefícios da nossa aplicação com os planos pagos.
          Descubra um universo de músicas em um só lugar.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            className={`p-6 border border-gray-600 shadow-md text-center flex flex-col justify-between hover:bg-gray-800 transition duration-300`}
          >
            <div>
              <h2 className="text-2xl neon-text uppercase font-medium mb-4">
                PLANO GRATUITO
              </h2>
              <p className="text-xl text-white font-bold mb-4">Grátis</p>
              <p className="text-base font-semibold mb-2">
                Salas Padrões: Limite de 2 salas
              </p>
              <p className="text-base font-semibold mb-2">
                Salas de Artistas: Ilimitado
              </p>
              <p className="text-base font-semibold mb-2">
                Histórico: Limite de 5 salas
              </p>
            </div>
            <EscolherPlano plano={0} active={session.plano == '0'} handleClick={handleClick} />
          </div>
          <div
            className={`p-6 border border-gray-600 shadow-md text-center flex flex-col justify-between hover:bg-gray-800 transition duration-300`}
          >
            <div>
              <h2 className="text-2xl neon-text uppercase font-medium mb-4">
                PLANO PREMIUM
              </h2>
              <p className="text-xl text-white font-bold mb-4">R$7.90</p>
              <p className="text-base font-semibold mb-2">
                Salas Padrões: Limite de 5 salas
              </p>
              <p className="text-base font-semibold mb-2">
                Salas de Artistas: Ilimitado
              </p>
              <p className="text-base font-semibold mb-2">
                Histórico: Limite de 10 salas
              </p>
            </div>
            <EscolherPlano plano={1} active={session.plano == '1'} handleClick={handleClick} />
            
            
          </div>
          <div
            className={`p-6 border border-gray-600 shadow-md text-center flex flex-col justify-between hover:bg-gray-800 transition duration-300`}
          >
            <div>
              <h2 className="text-2xl neon-text uppercase font-medium mb-4">
                PLANO DO ARTISTA
              </h2>
              <p className="text-xl text-white font-bold mb-4">R$79.90</p>
              <p className="text-base font-semibold mb-2">
                Salas Padrões: Limite de 30 salas
              </p>
              <p className="text-base font-semibold mb-2">
                Salas de Artistas: Ilimitado
              </p>
              <p className="text-base font-semibold mb-2">
                Criação de Salas de Artista: Limite de 1 sala ativa
              </p>
              <p className="text-base font-semibold mb-2">
                Histórico: Limite de 60 salas
              </p>
              <p className="text-base font-semibold mb-2">
                Estatísticas: Personalizadas
              </p>
            </div>
            <EscolherPlano plano={2} active={session.plano == '2'} handleClick={handleClick} />
          </div>
        </div>
      </div>
    </div>
  );
}
