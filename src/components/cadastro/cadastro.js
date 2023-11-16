"use client";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import Input from "@/components/form/Input";
import { register } from '@/utils/forms';
import { signIn } from "next-auth/react";
import { getDictionary } from "@/utils/dictionaries";

export default function Cadastro({ dict }) {
  const router = useRouter();
  const [message, setMessage] = useState('');


  async function onRegister(formData) {
    if (document.getElementById("passwordConfirmation").value == "" || document.getElementById("nickname").value == "" || document.getElementById("completeName").value == "" || document.getElementById("email").value == "" || document.getElementById("passwordCadastro").value == "") {
      if (document.getElementById("completeName").value == "") {
        document.getElementById("completeName-error").innerHTML = dict.campo_obrigatorio
        document.getElementById("completeName").classList.add("border-red-500")
      }
      if (document.getElementById("nickname").value == "") {
        document.getElementById("nickname-error").innerHTML = dict.campo_obrigatorio
        document.getElementById("nickname").classList.add("border-red-500")
      }

      if (document.getElementById("birthday").value == '') {
        document.getElementById("birthday-error").innerHTML = dict.campo_obrigatorio
        document.getElementById("birthday").classList.add("border-red-500")
      }

      if (document.getElementById("email").value == "") {
        document.getElementById("email-error").innerHTML = dict.campo_obrigatorio
        document.getElementById("email").classList.add("border-red-500")
      }
      if (document.getElementById("passwordConfirmation").value == "") {
        document.getElementById("passwordConfirmation-error").innerHTML = dict.campo_obrigatorio
        document.getElementById("passwordConfirmation").classList.add("border-red-500")
      }
      if (document.getElementById("passwordCadastro").value == "") {
        document.getElementById("passwordCadastro-error").innerHTML = dict.campo_obrigatorio
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
      setMessage(dict.senhas_nao_coincidem)
    }
  }

  return (
    <main className="min-h-screen h-full flex flex-col justify-center items-center p-4 md:p-8 max-w-screen-md mx-auto">
      <h1 className="text-neon-blue-200 text-center neon-text text-4xl sm:text-5xl md:text-6xl uppercase font-semibold mb-8">
        {dict.cadastre_se}
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
              placeholder={dict.nome_completo}
            />
          </div>
          <div className="mb-4 sm:col-span-1">
            <Input
              id="nickname"
              type="text"
              name="nickname"
              placeholder={dict.nome_de_usuario}
            />
          </div>
          <div className="mb-4 sm:col-span-1">
            <Input
              id="email"
              type="text"
              name="email"
              placeholder={dict.email}
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
              placeholder={dict.senha}
            />
          </div>
          <div className="mb-4 sm:col-span-1">
            <Input
              id="passwordConfirmation"
              type="password"
              name="passwordConfirmation"
              placeholder={dict.confirme_senha}
            />
          </div>
          <div className="mb-4 sm:col-span-2 flex justify-center mx-4 sm:mx-auto sm:max-w-sm">
            <button
              type="submit"
              className="bg-neon-blue-200 hover:bg-neon-blue-300 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline w-full mb-4"
            >
              {dict.cadastrar}
            </button>
          </div>
        </div>
        <div className="mt-4 text-center">
          <Link
            className="font-bold text-sm text-white hover:text-neon-blue-200 w-full"
            href="/login"
          >
            {dict.login}
          </Link>
        </div>
      </form>
    </main>
  );
}