"use client"
import { alterarPerfil } from '@/utils/user';
const Button = (props, {dict}) => {

  async function handleAlterarPerfil() {
    const data = {
      nome: document.getElementById("completeName").value,
      nick: document.getElementById("nickname").value,
      data_nasc: document.getElementById("birthday").value,
      icon: "icone1.png"
    };

    const res = await alterarPerfil(data)
    if (res.sucesso === true) {
      window.location.href = '/perfil'
    } else {
      if (res.data_nasc === false) {
        document.getElementById("birthday-error").innerHTML = dict.data_nascimento_invalida
        document.getElementById("birthday").classList.add("border-red-500")
      }
      if (res.nick === true) {
        document.getElementById("nickname-error").innerHTML = dict.nome_usuario_cadastrado
        document.getElementById("nickname").classList.add("border-red-500")
      }
    }

  };

  return (
    <>
      <button
        className="bg-cyan-500 hover:bg-cyan-600 text-white dark:text-white font-bold py-2 px-8 focus:outline-none focus:shadow-outline w-full"
        onClick={handleAlterarPerfil}
        type='button'
      >
        {dict.alterar}
      </button>
    </>
  );
}
export default Button;
