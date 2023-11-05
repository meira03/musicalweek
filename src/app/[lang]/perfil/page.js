import { cookies } from 'next/headers';
import { perfilUsuario } from '@/utils/user'
import Link from 'next/link';
import DeleteAccount from '@/components/deletarConta/botaoDeletarConta';
import ModalProfile from '@/components/perfil/Modal';
import Image from "next/image";

// import icone1 from "../../../../public/icones/icone1.png"
// import icone2 from "../../../../public/icones/icone2.png"
// import icone3 from "../../../../public/icones/icone3.png"
// import icone4 from "../../../../public/icones/icone4.png"
// import icone5 from "../../../../public/icones/icone5.png"
// import icone6 from "../../../../public/icones/icone6.png"
// import icone7 from "../../../../public/icones/icone7.png"
// import icone8 from "../../../../public/icones/icone8.png"
// import icone9 from "../../../../public/icones/icone9.png"
// import icone10 from "../../../../public/icones/icone10.png"
// import icone11 from "../../../../public/icones/icone11.png"
// import icone12 from "../../../../public/icones/icone12.png"
// import icone13 from "../../../../public/icones/icone13.png"
// import icone14 from "../../../../public/icones/icone14.png"
// import icone15 from "../../../../public/icones/icone15.png"
// import icone16 from "../../../../public/icones/icone16.png"
// import icone17 from "../../../../public/icones/icone17.png"
// import icone18 from "../../../../public/icones/icone18.png"
// import icone19 from "../../../../public/icones/icone19.png"
// import icone20 from "../../../../public/icones/icone20.png"
// import icone21 from "../../../../public/icones/icone21.png"
// import icone22 from "../../../../public/icones/icone22.png"
// import icone23 from "../../../../public/icones/icone23.png"
// import icone24 from "../../../../public/icones/icone24.png"
// import icone25 from "../../../../public/icones/icone25.png"
// import icone26 from "../../../../public/icones/icone26.png"
// import icone27 from "../../../../public/icones/icone27.png"
// import icone28 from "../../../../public/icones/icone28.png"
// import icone29 from "../../../../public/icones/icone29.png"

export default async function Perfil({ params }) {
  const res = await perfilUsuario();
  let tipoPlanoLabel;

  //console.log(res);

  if (!res || !res.perfil) {
    return
  }

  if (res.perfil.plano === "0") {
    tipoPlanoLabel = "Gratuito";
  } else if (res.perfil.plano === "1") {
    tipoPlanoLabel = "Premium";
  } else if (res.perfil.plano === "2") {
    tipoPlanoLabel = "Artista";
  } else {
    tipoPlanoLabel = "Outro";
  }

  return (
    <main className='mx-auto sm:max-w-7xl px-2 sm:px-7 lg:px-8'>
      <div>
        <h1 className="text-white text-3xl font-semibold mb-4">Perfil do Usuário</h1>
        <div className="p-2 rounded-lg bg-zinc-200 hover:bg-zinc-100 dark:bg-zinc-800 h w-[100%] flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 gap-8 p-8 items-center">
            <div className="w-50 h-50 overflow-hidden flex flex-col items-center">
              <Image
                  src={"/icones/" + res.perfil.icon }
                  alt={"Icone "}
                  height={600}
                  width={600}
                  className="object-cover w-full h-full rounded-full mb-3"
                />
              <ModalProfile perfil={res.perfil} />

            </div>
            <div className="col-span-1 text-white">
              <div className="mb-4">
                <h1 className="font-semibold text-xl">Nome do Usuário</h1>
                <p className="hover:text-gray-500 transition">{res.perfil.nome}</p>
              </div>
              <div className="mb-4">
                <h1 className="font-semibold text-xl">E-mail</h1>
                <p className="hover:text-gray-500 transition" style={{ wordWrap: 'break-word' }}>{res.perfil.email}</p>
              </div>
            </div>
            <div className="col-span-1 text-white">
              <div className="mb-4">
                <h1 className="font-semibold text-xl">Nickname</h1>
                <p className="hover:text-gray-500 transition">{res.perfil.nick}</p>
              </div>
              <div className="mb-4">
                <h1 className="font-semibold text-xl">Data de Nascimento</h1>
                <p className="hover:text-gray-500 transition">{res.perfil.data_nasc}</p>
              </div>
            </div>
            <div className="col-span-1 flex ">
              <div className="mb-4 text-white">
                <h1 className="font-semibold text-xl">Tipo Plano</h1>
                <p className="hover:text-gray-500 transition">{tipoPlanoLabel}</p>
                <br />
                {res.perfil.plano === "0" && (
                  <Link href="planos/">
                    <button className="bg-teal-500 hover:bg-teal-600 text-white rounded-lg px-4 py-2">
                      Quero ser Premium
                    </button>
                  </Link>
                )}
                {res.perfil.plano === "1" && (
                  <Link href="planos/">
                    <button className="bg-teal-500 hover:bg-teal-600 text-white rounded-lg px-4 py-2">
                      Ver os outros Planos
                    </button>
                  </Link>
                )}
                {res.perfil.plano === "2" && (
                  <Link href="planos/">
                    <button className="bg-teal-500 hover:bg-teal-600 text-white rounded-lg px-4 py-2">
                      Ver os outros Planos
                    </button>
                  </Link>
                )}
              </div>
            </div>
            <div className="col-span-1 flex">
              <div className="mb-4 text-white">
                <Link href="alterar-perfil/">
                  <button className="bg-teal-500 hover:bg-teal-600 text-white rounded-lg px-4 py-2">
                    Alterar Perfil
                  </button>
                </Link>
                <br />
                <br />
                <Link href="alterar-senha/">
                  <button className="bg-teal-500 hover:bg-teal-600 text-white rounded-lg px-4 py-2">
                    Alterar Senha
                  </button>
                </Link>
                <br />
                <br />
                <DeleteAccount></DeleteAccount>
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
      <br></br>
      <div>
        <h1 className="text-white text-3xl font-semibold mb-4">Histórico de Salas</h1>
        <div className="p-2 rounded-lg bg-zinc-200 hover:bg-zinc-100 dark:bg-zinc-800 w-[100%]">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 min-h-[30vh] cursor-pointer">
            {/* {salas.map((sala) => (
              <CardSala key={sala.id_musica_sala} nome={sala.nome_sala} id_musica={sala.id_musica} id_sala={sala.id_musica_sala} />
            ))} */}
          </div>
        </div>
      </div>
    </main >
  )
}