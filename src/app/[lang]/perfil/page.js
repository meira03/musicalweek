import { cookies } from 'next/headers';
import { perfilUsuario } from '@/utils/user'
import Link from 'next/link';
import DeleteAccount from '@/components/deletarConta/botaoDeletarConta';
import ModalProfile from '@/components/perfil/Modal';
import Image from "next/image";

export default async function Perfil({ params }) {
  const res = await perfilUsuario();
  //console.log(res);

  let tipoPlanoLabel;

  // if (!res || !res) {
  //   return
  // }
            
  if (res.plano === "0") {
    tipoPlanoLabel = "Gratuito";
  } else if (res.plano === "1") {
    tipoPlanoLabel = "Premium";
  } else if (res.plano === "2") {
    tipoPlanoLabel = "Artista";
  } else {
    tipoPlanoLabel = "Outro";
  }

  //sm:grid-cols-1 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5
  //grid grid-cols-2 gap-8 p-8 border-solid border-2 mb-1
  //px-2 sm:px-7 lg:px-8
  //pt-0 md:pt-5 lg:pt-20 xl:pt-8 2xl:pt-44  

  return (

    <main className="h-auto lg:h-[85vh] lg:items-center lg:flex lg:justify-center">
      <div className='justify-center h-auto w-full'>
        <div className="static grid
                          grid-cols-1 w-11/12 px-2 
                          lg:grid-cols-2 lg:w-11/12 lg:gap-[20%] lg:px-2 
                        ">
          <div className="grid grid-row-3 gap-3 overflow-hidden items-center justify-center">
            <ModalProfile perfil={res} />
            <div className='justify-center'>
              <p className="flex justify-center neon-text text-4xl uppercase font-semibold">{res.nick}</p>
              <p className="flex justify-center ">{tipoPlanoLabel}</p>
            </div>

            {res.plano === "0" && (
              <Link href="planos/">
                <button className="bg-teal-500 hover:bg-teal-600 text-white w-full py-2">
                  Quero ser Premium
                </button>
              </Link>
            )}
            {res.plano === "1" && (
              <Link href="planos/">
                <button className="bg-teal-500 hover:bg-teal-600 text-white w-full py-2">
                  Ver os outros Planos
                </button>
              </Link>
            )}
            {res.plano === "2" && (
              <Link href="planos/">
                <button className="bg-teal-500 hover:bg-teal-600 text-white w-full py-2">
                  Ver os outros Planos
                </button>
              </Link>
            )}
          </div>
          <div className='pt-10 lg:pt-0 grid grid-rows-2 items-center '>
            <div className="grid grid-row-3 gap-4 text-white ">
              <div>
              <p className="font-medium">NOME COMPLETO:</p>
                <div className='border-2 border-neon-blue-100 py-1'>
                  <p className="hover:text-gray-500 transition">{res.nome}</p>
                </div>
              </div>
              <div>
              <p className="font-medium">E-MAIL:</p>
                <div className='border-2 border-neon-blue-100 py-1'>
                  <p className="hover:text-gray-500 transition" style={{ wordWrap: 'break-word' }}>{res.email}</p>
                </div>
              </div>
              <div>
                <p className="font-medium">DATA DE NASCIMENTO:</p>

                <div className='border-2 border-neon-blue-100 py-1'>
                  <p className="hover:text-gray-500 transition">{res.data_nasc}</p>
                </div>
              </div>  

            </div>
            <div className="grid grid-row-3 gap-4 ">

              <div>
                <h3 className='flex justify-center mb-1'>AÇÕES:</h3>
                <Link href="alterar-perfil/">
                  <button className="bg-teal-500 w-full hover:bg-teal-600 text-white py-1.5">
                    Alterar Dados
                  </button>
                </Link>
              </div>

              <Link href="alterar-senha/">
                <button className="bg-teal-500 hover:bg-teal-600 w-full text-white py-1.5">
                  Alterar Senha
                </button>
              </Link>

              <DeleteAccount></DeleteAccount>

            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
