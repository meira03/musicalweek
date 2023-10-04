import { cookies } from 'next/headers';
import { perfilUsuario } from '@/utils/user'
import { procuraSalas } from "@/utils/forms";
import Link from 'next/link';
// import CardSala from "@/components/CardSala/CardSala.js";

export default async function Perfil({ params }) {
  const res = await perfilUsuario();

  // const ros = await procuraSalas(id_user);
  // const salas = ros.salas;

  let tipoPlanoLabel;

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
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 p-8 items-center">
            <div className="col-span-1 w-50 h-50 overflow-hidden">
              <img src={res.perfil.foto} alt="Foto de Perfil" className="object-cover w-full h-full" />
            </div>
            <div className="col-span-1 text-white">
              <div className="mb-4">
                <h1 className="font-semibold text-xl">Nome do Usuário</h1>
                <p className="hover:text-gray-500 transition">{res.perfil.nome}</p>
              </div>
              <div className="mb-4 ">
                <h1 className="font-semibold text-xl">E-mail</h1>
                <p className="hover:text-gray-500 transition">{res.perfil.email}</p>
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
            <div className="col-span-1 flex justify-end">
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