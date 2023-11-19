"use client"
import { useState } from "react";
import { signIn } from "next-auth/react";

const Mensagem = ({dict}) => {
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

  return ({message});
}
export default Mensagem;