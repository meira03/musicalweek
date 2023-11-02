"use client";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Input from "@/components/form/Input";
import { login } from '@/utils/forms'
import SignInButtonGoogle from "@/components/login/SignInButtonGoogle";
import SignInButtonSpotify from "@/components/login/SignInButtonSpotify";

export default function Login() {
  const [message, setMessage] = useState('')
  const router = useRouter()

  async function onLogin(formData) {

    if (document.getElementById("email").value == "" || document.getElementById("password").value == "") {
      if (document.getElementById("email").value == "") {
        document.getElementById("email-error").innerHTML = "Campo Obrigatório"
        document.getElementById("email").classList.add("border-red-500")
      }
      if (document.getElementById("password").value == "") {
        document.getElementById("password-error").innerHTML = "Campo Obrigatório"
        document.getElementById("password").classList.add("border-red-500")
      }
      return
    }

    let res = await login(formData)
    if (res.redirect === true) {
      router.push('/search')
    } else {
      setMessage(res.message)
    }
  }

  return (
    <main className="mx-auto sm:max-w-7xl px-2 sm:px-6 lg:px-8 min-h-[80vh] flex justify-center items-center">
      <div className="bg-gray-100 dark:bg-zinc-800 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-4/5 sm:w-1/2">
        <h1 className="dark:text-white text-center text-3xl font-bold mb-6 uppercase">
          Login
        </h1>
        <div className="text-red-500 text-center text-sm font-light mb-4">
          {message}
        </div>
        <form action={onLogin}>
          <div className="mb-4">
            <Input
              id="email"
              type="text"
              name="email"
              placeholder="Digite seu email"
              className="border rounded bg-white py-2 px-4 w-full"
            />
          </div>
          <div className="mb-6">
            <Input
              id="password"
              type="password"
              name="senha"
              placeholder="Digite sua senha"
              className="border rounded bg-white py-2 px-4 w-full"
            />
          </div>
          <div className="flex flex-col items-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mb-4"
              type="submit"
            >
              Entrar
            </button>
            <div className="flex space-x-4">
              <SignInButtonGoogle />
              <SignInButtonSpotify />
            </div>
            <Link
              className="inline-block font-bold text-gm text-blue-500 hover:text-blue-800 mt-4"
              href="/esqueci-senha"
            >
              Esqueci minha senha
            </Link>
            <Link
              className="inline-block font-bold text-gm text-blue-500 hover:text-blue-800 mt-2"
              href="/cadastro"
            >
              Criar nova conta
            </Link>
          </div>
        </form>
      </div>
    </main>

  );
}
