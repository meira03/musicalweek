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
    <main className="min-h-screen flex justify-center items-center p-4 md:p-8">
      <div className="shadow-md rounded px-4 sm:px-8 pt-6 pb-8 mb-4 w-full sm:w-4/5 lg:w-3/4 xl:w-1/2">
        <h1 className="text-center text-5xl font-bold mb-6 uppercase text-neon-blue-200 neon-text">
          <span>LOGIN</span>
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
            />
          </div>
          <div className="mb-6">
            <Input
              id="password"
              type="password"
              name="senha"
              placeholder="DIGITE SUA SENHA..."
            />
          </div>
          <div className="flex flex-col items-center">
            <button
              className="bg-neon-blue-200 hover:bg-neon-blue-300 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline w-full mb-4"
              type="submit"
            >
              ENTRAR
            </button>
            <Link
              className="inline-block font-bold text-gl text-white hover:text-neon-blue-200"
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
              className="font-bold text-gl text-white hover:text-neon-blue-200 sm:mr-16"
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
