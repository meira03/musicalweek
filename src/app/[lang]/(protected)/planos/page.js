import { updatePlano } from "@/utils/user";
import { authOption } from "@/app/api/auth/[...nextauth]/route";
import EscolherPlano from "./EscolherPlano";
import { getServerSession } from "next-auth";
import { getDictionary } from "@/utils/dictionaries";

export default async function Planos({ params: { lang } }) {
  let dict = await getDictionary(lang);
  dict = dict.planos;
  
  const session = await getServerSession(authOption);

  async function handleClick(plano) {
    'use server'
    const res = await updatePlano(plano);
  }

  return (
    <div className="flex text-white items-center">
      <div className="container m-auto px-8">
        <h1 className="neon-text text-4xl uppercase font-semibold mb-6 text-center">
          {dict.planos_precos}
        </h1>
        <p className="text-lg font-semibold mb-8 text-center">
          {dict.escolha_plano}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            className={`p-6 border border-gray-600 shadow-md text-center flex flex-col justify-between hover:bg-gray-800 transition duration-300 ${session.plano == '0' ? 'bg-gray-800' : ''}`}
          >
            <div>
              <h2 className="text-2xl neon-text uppercase font-medium mb-4">
                {dict.plano_gratuito}
              </h2>
              <p className="text-xl text-white font-bold mb-4">{dict.gratis}</p>
              <p className="text-base font-semibold mb-2">
                {dict.limite_2_salas}
              </p>
              <p className="text-base font-semibold mb-2">
                {dict.ilimitado}
              </p>
              <p className="text-base font-semibold mb-2">
                {dict.limite_5_salas}
              </p>
            </div>
            <EscolherPlano plano={0} active={session.plano == '0'} handleClick={handleClick} />
          </div>

          <div
            className={`p-6 border border-gray-600 shadow-md text-center flex flex-col justify-between hover:bg-gray-800 transition duration-300 ${session.plano == '1' ? 'bg-gray-800' : ''}`}
          >
            <div>
              <h2 className="text-2xl neon-text uppercase font-medium mb-4">
                {dict.plano_premium}
              </h2>
              <p className="text-xl text-white font-bold mb-4">R$7.90</p>
              <p className="text-base font-semibold mb-2">
                {dict.limite_5_salas_sp}
              </p>
              <p className="text-base font-semibold mb-2">
                {dict.ilimitado}
              </p>
              <p className="text-base font-semibold mb-2">
                {dict.limite_10_salas}
              </p>
            </div>
            <EscolherPlano plano={1} active={session.plano == '1'} handleClick={handleClick} />
            
            
          </div>
          <div
            className={`p-6 border border-gray-600 shadow-md text-center flex flex-col justify-between hover:bg-gray-800 transition duration-300 ${session.plano == '2' ? 'bg-gray-800' : ''}`}
          >
            <div>
              <h2 className="text-2xl neon-text uppercase font-medium mb-4">
                {dict.plano_artista}
              </h2>
              <p className="text-xl text-white font-bold mb-4">R$79.90</p>
              <p className="text-base font-semibold mb-2">
                {dict.limite_30_salas}
              </p>
              <p className="text-base font-semibold mb-2">
                {dict.ilimitado}
              </p>
              <p className="text-base font-semibold mb-2">
                {dict.limite_1_sala_ativa}
              </p>
              <p className="text-base font-semibold mb-2">
                {dict.limite_60_salas}
              </p>
              <p className="text-base font-semibold mb-2">
                {dict.personalizadas}
              </p>
            </div>
            <EscolherPlano plano={2} active={session.plano == '2'} handleClick={handleClick} />
          </div>
        </div>
      </div>
    </div>
  );
}
