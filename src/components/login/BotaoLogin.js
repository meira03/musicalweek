"use client"
import { useState } from "react";
import { signIn } from "next-auth/react";

const BotaoLogin = ({dict}) => {
  const [message, setMessage] = useState('');  
  async function handleSubmit(e) {
    e.preventDefault();
    if (document.getElementById("email").value == "" || document.getElementById("password").value == "") {
      if (document.getElementById("email").value == "") {
        document.getElementById("email-error").innerHTML = dict.campo_obrigatorio
        document.getElementById("email").classList.add("border-red-500")
      }
      if (document.getElementById("password").value == "") {
        document.getElementById("password-error").innerHTML = dict.campo_obrigatorio
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
    <button
    className="bg-neon-blue-200 hover:bg-neon-blue-300 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline w-full mb-4"
    type="submit"
    onClick={handleSubmit}
    >
        {dict.entrar}
    </button>
  );
}
export default BotaoLogin;