"use client";

import { useRouter } from 'next/navigation';

export default function SenhaAlterada() {
  const router = useRouter();

  const redirecionaLogin = () => {
    router.push('/login');
  };

  return (
    <main className="mx-auto sm:max-w-7xl px-2 sm:px-6 lg:px-8 min-h-[80vh] flex justify-center items-center">
      <div>
        <h1 className="text-center text-4xl font-bold mb-6 uppercase border-b-2 text-neon-blue-100 neon-text">
          SENHA ALTERADA
        </h1>
        <h2 className="dark:text-white text-center text-1xl font-light mb-6">
          <button
            type="button" 
            onClick={redirecionaLogin}
            className="bg-neon-blue-200 hover:bg-neon-blue-300 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mb-4"
          >
            VOLTAR AO LOGIN
          </button>
        </h2>
      </div>
    </main>
  );
}
