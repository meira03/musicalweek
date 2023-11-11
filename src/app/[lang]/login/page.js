"use client";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Input from "@/components/form/Input";
import { login } from '@/utils/forms'
import SignInButtonGoogle from "@/components/login/SignInButtonGoogle";
import SignInButtonSpotify from "@/components/login/SignInButtonSpotify";
import { isValidInput } from '@/components/form/validation';

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
<<<<<<< HEAD
<main className="min-h-screen bg-black-100 dark:bg-black-300 text-white h-full flex justify-center items-center p-8">
  <div className="bg-black-100 dark:bg-black-300 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-4/5 sm:w-1/2">
    <h1 className="text-white dark:text-white text-center text-5xl font-bold mb-6 uppercase">
      LOGIN
=======
<main className="min-h-screen bg-black-900 dark:bg-black-900 text-white h-full flex justify-center items-center p-8">
  <div className="bg-black-900 dark:bg-black-900 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-4/5 sm:w-1/2">
    <h1 className="dark:text-white text-center text-5xl font-bold mb-6 uppercase">
      <span className="text-shadow-lg shadow-neon-blue-100">LOGIN</span>
>>>>>>> 9588a8e5621a4a371a1f53fe2492123170e76251
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
          className="bg-neon-blue-300 hover:bg-neon-blue-400 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline w-full mb-4"
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
      <div className="flex flex-col sm:flex-row items-center sm:justify-between">
        <div className="font-bold text-gl text-white sm:ml-16 mb-4 sm:mb-0">
          NÃO TEM UMA CONTA?
        </div>
        <Link
          className="font-bold text-gl text-neon-blue-300 hover:text-neon-blue-400 sm:mr-16"
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
