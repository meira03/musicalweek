"use client";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import Input from "@/components/form/Input";
import { register } from '@/utils/forms';

export default function Cadastro() {
  const router = useRouter();
  const [message, setMessage] = useState('');

  async function onRegister(formData) {
    if (document.getElementById("passwordConfirmation").value == "" || document.getElementById("nickname").value == "" || document.getElementById("completeName").value == "" || document.getElementById("email").value == "" || document.getElementById("passwordCadastro").value == "") {
      if (document.getElementById("completeName").value == "") {
        document.getElementById("completeName-error").innerHTML = "Campo Obrigatório"
        document.getElementById("completeName").classList.add("border-red-500")
      }
      if (document.getElementById("nickname").value == "") {
        document.getElementById("nickname-error").innerHTML = "Campo Obrigatório"
        document.getElementById("nickname").classList.add("border-red-500")
      }

      if (document.getElementById("birthday").value == '') {
        document.getElementById("birthday-error").innerHTML = "Campo Obrigatório"
        document.getElementById("birthday").classList.add("border-red-500")
      }

      if (document.getElementById("email").value == "") {
        document.getElementById("email-error").innerHTML = "Campo Obrigatório"
        document.getElementById("email").classList.add("border-red-500")
      }
      if (document.getElementById("passwordConfirmation").value == "") {
        document.getElementById("passwordConfirmation-error").innerHTML = "Campo Obrigatório"
        document.getElementById("passwordConfirmation").classList.add("border-red-500")
      }
      if (document.getElementById("passwordCadastro").value == "") {
        document.getElementById("passwordCadastro-error").innerHTML = "Campo Obrigatório"
        document.getElementById("passwordCadastro").classList.add("border-red-500")
      }
      return
    }

    if (document.getElementById("passwordCadastro").value === document.getElementById("passwordConfirmation").value) {
      const res = await register(formData)
      if (res.redirect === true) {
        router.push('/search')
      } else {
        setMessage(res.message)
      }
    } else {
      setMessage("Senhas não coincidem!")
    }

  }

  return (
<main className="min-h-screen bg-black-100 dark:bg-black-300 text-white h-full flex flex-col justify-center items-center p-8">
  <h1 className="text-center text-5xl font-bold uppercase mb-8">
    CADASTRE-SE
  </h1>
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mx-auto w-full">
    <div className="mb-4">
      <Input
        id="completeName"
        type="text"
        name="completeName"
        placeholder="DIGITE SEU NOME COMPLETO..."
      />
    </div>
    <div className="mb-4">
      <Input
        id="passwordCadastro"
        type="password"
        name="senha"
        placeholder="DIGITE SUA SENHA..."
      />
    </div>
    <div className="mb-4">
      <Input
        id="passwordConfirmation"
        type="password"
        name="passwordConfirmation"
        placeholder="DIGITE A MESMA SENHA..."
      />
    </div>
    <div className="mb-4">
      <Input
        id="email"
        type="text"
        name="email"
        placeholder="DIGITE O SEU E-MAIL..."
      />
    </div>
    <div className="mb-4">
      <Input
        id="nickname"
        type="text"
        name="nickname"
        placeholder="DIGITE SEU NOME DE USUÁRIO..."
      />
    </div>
    <div className="mb-4">
      <Input
        id="birthday"
        type="date"
        name="birthday"
        placeholder="APONTE SUA DATA DE NASCIMENTO..."
      />
    </div>
    <div className="mb-4 col-span-2 flex justify-center">
      <button
        type="submit"
        className="bg-cyan-500 hover:bg-cyan-600 text-white dark:text-white font-bold py-2 px-8 focus:outline-none focus:shadow-outline w-full ml-96 mr-96"
      >
        CADASTRAR
      </button>
    </div>
  </div>
  <div className="mt-4 text-center">
    <Link
      className="font-bold text-sm text-white hover:text-zinc-500 w-full"
      href="/login"
    >
      JÁ POSSUO UMA CONTA (LOGIN)
    </Link>
  </div>
</main>
  );
}