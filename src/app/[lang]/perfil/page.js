import { cookies } from 'next/headers';
import { perfilUsuario } from '@/utils/user'
import Link from 'next/link';
import DeleteAccount from '@/components/deletarConta/botaoDeletarConta';

export default async function Perfil({ params }) {
  const res = await perfilUsuario();
  let tipoPlanoLabel;

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
            <div className="col-span-1 w-50 h-50 overflow-hidden">
              <img src={res.perfil.foto} alt="Foto de Perfil" className="object-cover w-full h-full" />
            </div>
            <div className="col-span-1 text-white">
              <div className="mb-4">
                <h1 className="font-semibold text-xl">Nome Completo</h1>
                <p className="hover:text-gray-500 transition">{res.perfil.nome}</p>
              </div>
              <div className="mb-4">
                <h1 className="font-semibold text-xl">E-mail</h1>
                <p className="hover:text-gray-500 transition" style={{ wordWrap: 'break-word' }}>{res.perfil.email}</p>
              </div>
            </div>
            <div className="col-span-1 text-white">
              <div className="mb-4">
                <h1 className="font-semibold text-xl">Nome de Usuário</h1>
                <p className="hover:text-gray-500 transition">{res.perfil.nick}</p>
              </div>
              <div className="mb-4">
                <h1 className="font-semibold text-xl">Data de Nascimento</h1>
                <p className="hover:text-gray-500 transition">{res.perfil.data_nasc}</p>
              </div>
            </div>
            <div className="col-span-1 flex ">
              <div className="mb-4 text-white">
                <h1 className="font-semibold text-xl">Plano Atual</h1>
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
                    Alterar Dados
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