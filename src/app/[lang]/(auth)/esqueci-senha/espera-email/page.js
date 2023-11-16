"use server"
import { getDictionary } from "@/utils/dictionaries";

export default async function EsperaEmail ({ params: { lang } }) {
    let dict = await getDictionary(lang);
    dict = dict.alterar_perfil;
    return (
        <main className="mx-auto sm:max-w-7xl px-2 sm:px-6 lg:px-8 min-h-[80vh] flex justify-center items-center">
          <div className="divide-y-2">
            <h1 className="text-center text-4xl font-bold mb-6 uppercase text-neon-blue-100 neon-text">
                {dict.email_enviado}
            </h1>
            <h2 className="dark:text-white text-center text-1xl font-light mt-2">
                {dict.troca_senha}
            </h2>
          </div>
        </main>
      );
}