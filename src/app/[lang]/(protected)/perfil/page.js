import { perfilUsuario } from '@/utils/user'
import Link from 'next/link';
import DeleteAccount from '@/components/deletarConta/botaoDeletarConta';
import ModalProfile from '@/components/perfil/Modal';
import Image from "next/image";
import { getDictionary } from "@/utils/dictionaries";

export const metadata = {
  title: 'Perfil',
}

export default async function Perfil({ params: { lang } }) {
  let dict = await getDictionary(lang);
  dict = dict.perfil;

  const res = await perfilUsuario();

  let tipoPlanoLabel;

  if (!res || !res) {
    return
  }

  if (res.plano === "0") {
    tipoPlanoLabel = "Gratuito";
  } else if (res.plano === "1") {
    tipoPlanoLabel = "Premium";
  } else if (res.plano === "2") {
    tipoPlanoLabel = "Artista";
  } else {
    tipoPlanoLabel = "Outro";
  }
  
  return (

    <main className="h-auto lg:h-[85vh] lg:items-center lg:flex lg:justify-center">
      <div className='justify-center h-auto w-full'>
        <div className="static grid
                          grid-cols-1 w-11/12 px-2 
                          lg:grid-cols-2 lg:w-11/12 lg:gap-[20%] lg:px-2 
                        ">
          <div className="grid grid-row-3 gap-3 overflow-hidden items-center justify-center">
            <ModalProfile perfil={res} dict={dict.components_perfil}/>
            <div className='justify-center'>
              <p className="flex justify-center neon-text text-4xl uppercase font-semibold">{res.nick}</p>
              <p className="flex justify-center text-white mt-8">{tipoPlanoLabel}</p>
            </div>

            {res.plano === "0" && (
              <Link href="planos/">
                <button className="bg-teal-500 hover:bg-teal-600 text-white w-full py-2">
                 {dict.quero_ser_premium}
                </button>
              </Link>
            )}
            {res.plano === "1" && (
              <Link href="planos/">
                <button className="bg-teal-500 hover:bg-teal-600 text-white w-full py-2">
                  {dict.ver_outros_planos}
                </button>
              </Link>
            )}
            {res.plano === "2" && (
              <Link href="planos/">
                <button className="bg-teal-500 hover:bg-teal-600 text-white w-full py-2">
                  {dict.ver_outros_planos}
                </button>
              </Link>
            )}
          </div>
          <div className='pt-10 lg:pt-0 grid grid-rows-2 items-center '>
            <div className="grid grid-row-3 gap-4 text-white ">
              <div>
                <p className="font-medium">{dict.nome_completo}</p>
                <div className='border-2 border-neon-blue-100 py-1'>
                  <p className="hover:text-gray-500 transition ml-2">{res.nome}</p>
                </div>
              </div>
              <div>
                <p className="font-medium">{dict.email}</p>
                <div className='border-2 border-neon-blue-100 py-1'>
                  <p className="hover:text-gray-500 transition ml-2" style={{ wordWrap: 'break-word' }}>{res.email}</p>
                </div>
              </div>
              <div>
                <p className="font-medium">{dict.nome_de_usuario}</p>

                <div className='border-2 border-neon-blue-100 py-1'>
                  <p className="hover:text-gray-500 transition ml-2">{res.data_nasc}</p>
                </div>
              </div>

            </div>
            <div className="grid grid-row-3 gap-4 ">

              <div>
                <h3 className='flex justify-center mb-1 text-white'>{dict.acoes}</h3>
                <Link href="alterar-perfil/">
                  <button className="bg-teal-500 w-full hover:bg-teal-600 text-white py-1.5">
                    {dict.alterar_dados}
                  </button>
                </Link>
              </div>

              <Link href="alterar-senha/">
                <button className="bg-teal-500 hover:bg-teal-600 w-full text-white py-1.5">
                  {dict.alterar_senha}
                </button>
              </Link>

              <DeleteAccount dict={dict.components_deleta_conta}/>

            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
