"use client";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import Input from "@/components/form/Input";
import { register } from '@/utils/forms';
import { signIn } from "next-auth/react";

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
        const result = await signIn('credentials', {
          email: document.getElementById("email").value,
          senha: document.getElementById("passwordCadastro").value,
          redirect: false
        })
    
        if(result.error != null){
          setMessage(result.error)
          return
        }
    
        window.location.href = '/salas';
      } else {
        setMessage(res.message)
      }
    } else {
      setMessage("Senhas não coincidem!")
    }
  }

  return (
    <main className="h-[85vh] flex flex-col justify-center items-center p-4 md:px-18 w-screen-md mx-auto">
      <h1 className="text-neon-blue-200 text-center neon-text text-4xl sm:text-5xl uppercase font-semibold ">
        CADASTRE-SE
      </h1>
      <div className="text-red-500 text-center text-sm font-light h-4 my-5">
        {message}
      </div>
      <form action={onRegister} className="w-full max-w-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-10 mx-auto w-full">
          <div>
            <Input
              id="completeName"
              type="text"
              name="completeName"
              placeholder="DIGITE SEU NOME COMPLETO"
            />
            <Input
              id="email"
              type="text"
              name="email"
              placeholder="DIGITE O SEU E-MAIL"
            />
            <Input
              id="passwordCadastro"
              type="password"
              name="senha"
              placeholder="DIGITE SUA SENHA"
            />
          </div>
          <div>
            <Input
              id="nickname"
              type="text"
              name="nickname"
              placeholder="DIGITE SEU NOME DE USUÁRIO"
            />
            <Input
              id="birthday"
              type="date"
              name="birthday"
            />
            <Input
              id="passwordConfirmation"
              type="password"
              name="passwordConfirmation"
              placeholder="CONFIRME SUA SENHA"
            />
          </div>

          <div className="sm:col-span-2 flex justify-center mx-4 sm:mx-auto sm:max-w-sm">
            <button
              type="submit"
              className="bg-neon-blue-200 hover:bg-neon-blue-300 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline w-full"
            >
              CADASTRAR
            </button>
          </div>
        </div>
        <div className="mb-4 mt-4 border-t border-white"></div>
        <div className="text-center">
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