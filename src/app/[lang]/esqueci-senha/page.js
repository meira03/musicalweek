"use client";

import { useState } from "react";
import { enviarEmail } from "@/utils/forms";
import { useRouter } from "next/navigation";
import Input from "@/components/form/Input";

export default function EsqueciSenha() {
  const router = useRouter();

  async function onRecuperate(formData) {
    if (document.getElementById("emailEsqueciSenha").value == "") {
      document.getElementById("emailEsqueciSenha-error").innerHTML = "Campo Obrigatório"
      document.getElementById("emailEsqueciSenha").classList.add("border-red-500")
    }
    else {
      const res = await enviarEmail(formData);
      if (res.sucesso) {
        router.push("/esqueci-senha/espera-email/");
      } else {
        console.log(res.descricao);
      }
    }
  };

  return (
    <main className="mx-auto sm:max-w-7xl px-2 sm:px-6 lg:px-8 min-h-[80vh] flex justify-center items-center">
      <div className="bg-gray-100 dark:bg-zinc-800 max-w-md p-8 rounded shadow w-4/5 sm:w-1/2">
        <h1 className="dark:text-white text-center text-3xl font-bold mb-6 uppercase">
          Esqueci Senha
        </h1>
        <form action={onRecuperate}>
          <div className="mb-4">
            <Input
              id="emailEsqueciSenha"
              type="email"
              name="emailEsqueciSenha"
              placeholder="Digite seu email"
            />
            <p id={"emailEsqueciSenha-error"} className="text-red-500 text-xs italic"></p>
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Recuperar Senha
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

