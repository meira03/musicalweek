"use client";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import Input from "@/components/form/Input";
import { login } from '@/utils/forms'
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

    const res = await login(formData)
    if (res.redirect === true) {
      router.push('/search')
    } else {
      setMessage(res.message)
    }
  }

  return (
    <main className="mx-auto sm:max-w-7xl px-2 sm:px-6 lg:px-8 min-h-[80vh] flex justify-center items-center">
      <div className="bg-gray-100 dark:bg-zinc-800 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-4/5 sm:w-1/2">
        <h1 className="dark:text-white text-center text-3xl font-bold mb-3 uppercase">
          Login
        </h1>
        <div className="text-red-500 text-center text-sm font-light h-4 my-2">
          {message}
        </div>
        <form action={onLogin}>
          <div className="mb-4">
            <Input
              id="email"
              type="text"
              name="email"
              placeholder="Digite seu email"
            />
          </div>
          <div className="mb-6">
            <Input
              id="password"
              type="password"
              name="senha"
              placeholder="Digite sua senha"
            />
          </div>
          <div className="flex items-center flex-col">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            // disabled={!email || !senha}
            >
              Entrar
            </button>
            {/* <button
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
              Entrar com Google
          </button> */}

            <div className="flex items-center flex-col">
              <Link
                className="inline-block mt-10 align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                href="/cadastro"
              >
                Criar nova conta
              </Link>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
