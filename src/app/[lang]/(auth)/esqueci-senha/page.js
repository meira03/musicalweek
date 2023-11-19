"use client";

import { useState } from "react";
import { enviarEmail } from "@/utils/forms";
import { useRouter } from "next/navigation";
import Input from "@/components/form/Input";

export default function EsqueciSenha() {
  const router = useRouter();
  const [error, setError] = useState("");

  async function onRecuperate(formData) {
    if (document.getElementById("emailEsqueciSenha").value === "") {
      setError("Campo Obrigatório");
      document.getElementById("emailEsqueciSenha").classList.add("border-red-500");
    } else {
      const res = await enviarEmail(formData);

      if (res.sucesso) {
        router.push("/esqueci-senha/espera-email/");
      } else {
        setError(res.descricao);
      }
    }
  }

  return (
    <main className="mx-auto sm:max-w-7xl px-2 sm:px-6 lg:px-8 min-h-[80vh] flex justify-center items-center">
      <div className="font-tech">
        <h1 className="text-center text-4xl font-bold mb-6 uppercase text-neon-blue-100  neon-text">
          ESQUECI SENHA
        </h1>
        <form action={onRecuperate}>
          <div className="mb-4">
            <Input
              id="emailEsqueciSenha"
              type="email"
              name="emailEsqueciSenha"
              placeholder="DIGITE SEU E-MAIL"
            />
            <p id="emailEsqueciSenha-error" className="text-red-500 text-xs italic">
              {error}
            </p>
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-neon-blue-200 hover:bg-neon-blue-300 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mb-4"
            >
              RECUPERAR SENHA
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}