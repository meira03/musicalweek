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
    <main className="mx-auto sm:max-w-7xl px-2 sm:px-6 lg:px-8 min-h-[80vh] flex justify-center items-center">
      <div className="bg-gray-100 dark:bg-zinc-800 max-w-md p-8 rounded shadow w-4/5 sm:w-1/2">
        <h1 className="dark:text-white text-center text-3xl font-bold uppercase">
          Cadastro
        </h1>
        <form action={onRegister}>
          <div className="mb-4">
            <Input
              id="completeName"
              type="text"
              name="completeName"
              placeholder="Digite seu nome completo..."
            />
          </div>
          <div className="mb-4">
            <Input
              id="nickname"
              type="text"
              name="nickname"
              placeholder="Digite seu nome de usuário..."
            />
          </div>
          <div className="mb-4">
            <Input
              id="birthday"
              type="date"
              name="birthday"
              placeholder="Aponte sua data de nascimento..."
            />
          </div>
          <div className="mb-4">
            <Input
              id="email"
              type="text"
              name="email"
              placeholder="Digite seu email..."
            />
          </div>
          <div className="mb-6">
            <Input
              id="passwordCadastro"
              type="password"
              name="senha"
              placeholder="Digite sua senha..."
            />
          </div>
          <div className="mb-6">
            <Input
              id="passwordConfirmation"
              type="password"
              name="passwordConfirmation"
              placeholder="Digite a mesma senha..."
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cadastrar
            </button>
          </div>
          <div className="flex items-center flex-col">
            <Link
              className="inline-block mt-4 align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="/login"
            >
              Já possuo uma conta (Login)
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
