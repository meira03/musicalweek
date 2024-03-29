"use client";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { AlterarSenha } from "@/utils/forms";
import Input from "@/components/form/Input";


export default function AlteraSenha() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (formData) => {
    const res = await AlterarSenha(formData);

    if (res.sucesso) {
      router.push("/perfil");
    } else {
      if (res.descricao == "Senha errada") {
        document.getElementById("passwordAtual-error").innerHTML = "Senha Incorreta"
        document.getElementById("passwordAtual").classList.add("border-red-500")
        setError("Senha Atual Incorreta");
      } else {
        setError(res.descricao);
      }
    }
  };

  return (
    <main className="mx-auto sm:max-w-7xl px-2 sm:px-6 lg:px-8 min-h-[80vh] flex justify-center items-center">
      <div>
        <h1 className="text-center text-4xl font-bold mb-6 uppercase text-neon-blue-200  neon-text">

          ALTERAR SENHA
        </h1>
        {error && (
          <div className="text-red-600 text-sm mb-4">
            {error}
          </div>
        )}

        <form action={handleSubmit}>
          <div className="mb-4">
            <Input
              id="passwordAtual"
              type="password"
              name="passwordAtual"
              placeholder="DIGITE A SENHA ATUAL"
            />
            <p id={"passwordConfirmation-error"} className="text-red-500 text-xs"></p>
          </div>
          <div className="mb-4">
            <Input
              id="passwordCadastro"
              type="password"
              name="passwordCadastro"
              placeholder="DIGITE A NOVA SENHA"
            />
            <p id={"passwordConfirmation-error"} className="text-red-500 text-xs"></p>
          </div>
          <div className="mb-4">
            <Input
              id="passwordConfirmation"
              type="password"
              name="passwordConfirmation"
              placeholder="CONFIRME A NOVA SENHA"
            />
            <p id={"passwordConfirmation-error"} className="text-red-500 text-xs"></p>
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-neon-blue-200 hover:bg-neon-blue-300 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mb-4"
            >
              ALTERAR SENHA
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}