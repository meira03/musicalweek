"use client";
import Link from "next/link";
import { useState } from 'react'
import Input from "@/components/form/Input";
import SignInButtonGoogle from "@/components/login/SignInButtonGoogle";
import SignInButtonSpotify from "@/components/login/SignInButtonSpotify";
import { signIn } from "next-auth/react";

export default function Login() {
    const [message, setMessage] = useState('')

  async function handleSubmit(e) {
    e.preventDefault();
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

    const result = await signIn('credentials', {
      email: document.getElementById("email").value,
      senha: document.getElementById("password").value,
      redirect: false
    })

    if(result.error != null){
      setMessage(result.error)
      return
    }

    window.location.href = '/salas';

  }

  return (
    <main className="h-[85vh] flex justify-center items-center px-4 md:px-8">
      <div className="shadow-md rounded px-4 pt-5 sm:px-8 mb-4 w-full sm:w-4/5 lg:w-3/4 xl:w-1/2">
        <h1 className="text-center text-4xl font-bold mb-6 uppercase text-neon-blue-200 neon-text">
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
        <form>
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
              onClick={handleSubmit}
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
          {/*  grid grid-cols-2 gap-15*/}
          <div className="flex flex-col sm:flex-row items-center sm:justify-between"> 
            <div className="font-bold text-md text-white mb-4 sm:mb-0">
              NÃO TEM UMA CONTA?
            </div>
            <Link
              className="font-bold text-md text-white hover:text-neon-blue-200"
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
