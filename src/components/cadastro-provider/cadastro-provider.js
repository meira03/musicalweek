"use client";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import Input from "@/components/form/Input";
import { cadastroProvider } from '@/utils/forms';
import { signIn } from "next-auth/react";

export default function Cadastro({dict}) {
  const router = useRouter();

  const [message, setMessage] = useState('');

  async function onRegister(formData) {
    let validName = false;
    let validNick = false;
    let validBirth = false;

    if (document.getElementById("completeName").value == "") {
      document.getElementById("completeName-error").innerHTML = dict.campo_obrigatorio
      document.getElementById("completeName").classList.add("border-red-500")
    } else
      validName = true

    if (document.getElementById("nickname").value == "") {
      document.getElementById("nickname-error").innerHTML = dict.campo_obrigatorio
      document.getElementById("nickname").classList.add("border-red-500")
    } else
      validNick = true

    if (document.getElementById("birthday").value == '') {
      document.getElementById("birthday-error").innerHTML = dict.campo_obrigatorio
      document.getElementById("birthday").classList.add("border-red-500")
    } else
      validBirth = true

    if (validName == true && validNick == true && validBirth == true) {
      const res = await cadastroProvider(formData)

      const a = 'silva.gabriel3@aluno.ifsp.edu.br'

      if (a != null) {
        await signIn('credentials', {
          email: a,
          senha: null,
          redirect: false
        })
        window.location.href = '/salas'
      } else {
        setMessage(res.message)
      }
    } else {
      setMessage(dict.preencha_valores)
    }
  }

  const [formData, setFormData] = useState({
    name: "",
    nick: "",
    data_nasc: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className="mx-auto sm:max-w-7xl px-2 sm:px-6 lg:px-8 min-h-[80vh] flex justify-center items-center">
      <div>
        <h1 className="text-neon-blue-200 neon-text text-center text-3xl font-bold uppercase">
          {dict.preencha_valores}
        </h1>
        <div className="text-red-500 text-center text-sm font-light h-4 my-2">
          {message}
        </div>
        <form action={onRegister}>
          <div className="mb-4">
            <Input
              id="completeName"
              type="text"
              name="completeName"
              placeholder={dict.nome_completo}
            />
          </div>
          <div className="mb-4">
            <Input
              id="nickname"
              type="text"
              name="nickname"
              placeholder={dict.nome_de_usuario}
            />
          </div>
          <div className="mb-4">
            <Input
              id="birthday"
              type="date"
              name="birthday"
              placeholder={dict.data_de_nascimento}
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-neon-blue-200 hover:bg-neon-blue-300 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {dict.cadastrar}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
