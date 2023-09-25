"use client";

import { useRouter } from 'next/navigation';

export default function SenhaAlterada() {
  const router = useRouter();

  const redirecionaLogin = () => {
    router.push('/login');
  };

  return (
    <main className="mx-auto sm:max-w-7xl px-2 sm:px-6 lg:px-8 min-h-[80vh] flex justify-center items-center">
      <div className="bg-gray-100 dark:bg-zinc-800 max-w-md p-8 rounded shadow w-4/5 sm:w-1/2">
        <h1 className="dark:text-white text-center text-3xl font-bold mb-6 uppercase">
          Senha alterada com sucesso
        </h1>
        <h2 className="dark:text-white text-center text-1xl font-light mb-6">
          <button
            type="button" 
            onClick={redirecionaLogin}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Clique aqui para voltar ao login.
          </button>
        </h2>
      </div>
    </main>
  );
}
