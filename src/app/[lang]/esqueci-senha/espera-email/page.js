"use client";

export default function EsperaEmail ({}) {
    return (
        <main className="mx-auto sm:max-w-7xl px-2 sm:px-6 lg:px-8 min-h-[80vh] flex justify-center items-center">
          <div className="bg-gray-100 dark:bg-zinc-800 max-w-md p-8 rounded shadow w-4/5 sm:w-1/2">
            <h1 className="dark:text-white text-center text-3xl font-bold mb-6 uppercase">
                Verifique o e-mail
            </h1>
            <h2 className="dark:text-white text-center text-1xl font-light mb-6">
                Acesse o e-mail informado para acessar o link da troca de senha.
            </h2>
          </div>
        </main>
      );
}