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
    <main className="min-h-screen h-full flex flex-col justify-center items-center p-4 md:p-8 max-w-screen-md mx-auto">
      <h1 className="text-neon-blue-200 text-center neon-text text-4xl sm:text-5xl md:text-6xl uppercase font-semibold mb-8">
        CADASTRE-SE
      </h1>
      <div className="text-red-500 text-center text-sm font-light h-4 my-2">
        {message}
      </div>
      <form action={onRegister} className="w-full max-w-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mx-auto w-full">
          <div className="mb-4 sm:col-span-1">
            <Input
              id="completeName"
              type="text"
              name="completeName"
              placeholder="DIGITE SEU NOME COMPLETO"
            />
          </div>
          <div className="mb-4 sm:col-span-1">
            <Input
              id="nickname"
              type="text"
              name="nickname"
              placeholder="DIGITE SEU NOME DE USUÁRIO"
            />
          </div>
          <div className="mb-4 sm:col-span-1">
            <Input
              id="email"
              type="text"
              name="email"
              placeholder="DIGITE O SEU E-MAIL"
            />
          </div>
          <div className="mb-4 sm:col-span-1">
            <Input
              id="birthday"
              type="date"
              name="birthday"
            />
          </div>
          <div className="mb-4 sm:col-span-1">
            <Input
              id="passwordCadastro"
              type="password"
              name="senha"
              placeholder="DIGITE SUA SENHA"
            />
          </div>
          <div className="mb-4 sm:col-span-1">
            <Input
              id="passwordConfirmation"
              type="password"
              name="passwordConfirmation"
              placeholder="CONFIRME SUA SENHA"
            />
          </div>
          <div className="mb-4 sm:col-span-2 flex justify-center mx-4 sm:mx-auto sm:max-w-sm">
            <button
              type="submit"
              className="bg-neon-blue-200 hover:bg-neon-blue-300 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline w-full mb-4"
            >
              CADASTRAR
            </button>
          </div>
        </div>
        <div className="mt-4 text-center">
          <Link
            className="font-bold text-sm text-white hover:text-neon-blue-200 w-full"
            href="/login"
          >
            JÁ POSSUO UMA CONTA (LOGIN)
          </Link>
        </div>
      </form>
    </main>
  );
}