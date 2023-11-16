"use client";

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { recebeToken, enviarNovaSenha } from "@/utils/forms";
import Input from "@/components/form/Input";

export default function RecuperaSenha({ params, dict }) {
  const router = useRouter();
  const { token } = params;
  const [error, setError] = useState(null);

  const [tokenValido, setTokenValido] = useState(false);

  useEffect(() => {
    async function validarToken() {
      const res = await recebeToken(token);
      if (res.valido) {
        setTokenValido(true);
      } else {
        router.push("/login");
      }
    }
    validarToken();
  }, [token, router]);


  const handleSubmit = async (formData) => {
    const res = await enviarNovaSenha(token, formData);

    if (res.valido) {
      router.push("/esqueci-senha/senha-alterada");
    } else {
      setError("Erro ao alterar senha, tente novamente mais tarde");
    }
  };

  return (
    <main className="mx-auto sm:max-w-7xl px-2 sm:px-6 lg:px-8 min-h-[80vh] flex justify-center items-center">
      {tokenValido ? (
          <div className="font-tech">
            <h1 className="text-center text-4xl font-bold mb-6 uppercase text-neon-blue-100 neon-text">
              {dict.cadastre_nova_senha}
            </h1>
            {error && (
              <div className="text-red-600 text-sm mb-4">
                {error}
              </div>
            )}
            <form action={handleSubmit}>
              <div className="mb-4">
                <Input
                  id="passwordCadastro"
                  type="password"
                  name="passwordCadastro"
                  placeholder={dict.nova_senha}
                />
                <p id={"passwordConfirmation-error"} className="text-red-500 text-xs"></p>
              </div>     
              <div className="mb-4">
                <Input
                  id="passwordConfirmation"
                  type="password"
                  name="passwordConfirmation"
                  placeholder={dict.confirme_nova_senha}
                />
                <p id={"passwordConfirmation-error"} className="text-red-500 text-xs"></p>
              </div>
              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  className="bg-neon-blue-200 hover:bg-neon-blue-300 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mb-4"
                >
                  {dict.recuperar_senha}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="bg-gray-100 dark:bg-zinc-800 max-w-md p-8 rounded shadow w-4/5 sm:w-1/2">
            <h2 className="dark:text-white text-center text-1xl font-light mb-6">
                {dict.validando_token_aguarde}
            </h2>
          </div>
        )}
      
    </main>
  );
}
