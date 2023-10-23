"use client"
import React, { useState } from 'react';
import { register } from '@/utils/forms';
import { alterarPerfil } from '@/utils/user';
import { useRouter } from 'next/navigation';
// import { AlterarPerfil } from '@/utils/user';

const Button = (props) => {
  const router = useRouter();

  async function handleAlterarPerfil() {
    const data = {
      nome: document.getElementById("completeName").value,
      nick: document.getElementById("nickname").value,
      data_nasc: document.getElementById("birthday").value,
      icon: "icone1.png"
    };

    const res = await alterarPerfil(data)

    if (res.sucesso === true) {
      console.log("sucesso é " + res.sucesso)
      router.push('/perfil')
    } else {
      console.log(res)
      document.getElementById("nickname-error").innerHTML = "Username já cadastrado"
      document.getElementById("nickname").classList.add("border-red-500")
    }

  };

  return (
    <>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={handleAlterarPerfil}
        type='button'
      >
        Alterar
      </button>
    </>
  );
}
export default Button;
