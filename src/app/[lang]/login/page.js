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
    console.log(formData)
    if (res.redirect === true) {
      router.push('/search')
    } else {
      setMessage(res.message)
    }
  }

  return (
<main className="min-h-screen bg-zinc-950 dark:bg-zinc-950 text-white h-full flex justify-center items-center p-8">
  <div className="bg-zinc-950 dark:bg-zinc-950 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-4/5 sm:w-1/2">
    <h1 className="dark:text-white text-center text-5xl font-bold mb-6 uppercase">
      <span class="text-shadow-lg shadow-cyan-300">LOGIN</span>
    </h1>
    <div className="text-red-500 text-center text-sm font-light mb-4">
      {message}
    </div>
    <div className="mb-4">
      <SignInButtonGoogle />
    </div>
    <div className="mb-4">
      <SignInButtonSpotify />
    </div>
    <div className="mb-4 border-t border-white"></div>
    <form action={onLogin}>
      <div className="mb-4">
        <Input
          id="email"
          type="text"
          name="email"
          placeholder="DIGITE SEU E-MAIL..."
          className="bg-black text-white py-2 px-4 w-full"
        />
      </div>
      <div className="mb-6">
        <Input
          id="password"
          type="password"
          name="senha"
          placeholder="DIGITE SUA SENHA..."
          className="bg-black text-white py-2 px-4 w-full"
        />
      </div>
      <div className="flex flex-col items-center">
        <button
          className="bg-cyan-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mb-4"
          type="submit"
        >
          ENTRAR
        </button>
        <Link
          className="inline-block font-bold text-gl text-white hover:text-gray-400"
          href="/esqueci-senha"
        >
          ESQUECI MINHA SENHA
        </Link>
      </div>
      <div className="mb-4 mt-4 border-t border-white"></div>
      <div className="flex flex-row items-center justify-between">
        <div className="font-bold text-gl text-white ml-16">
          NÃO TEM UMA CONTA?
        </div>
        <Link
          className="font-bold text-gl text-cyan-500 hover:text-cyan-600 mr-16"
          href="/cadastro"
        >
          CRIAR NOVA CONTA
        </Link>
      </div>
    </form>
  </div>
</main>
  );
}
