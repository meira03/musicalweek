"use client";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import Input from "@/components/form/Input";
import { cadastroGoogle } from '@/utils/forms';


export default function Cadastro() {
  const router = useRouter();

  const [message, setMessage] = useState('');

  async function onRegister(formData) {
    let validNick = false;
    let validBirth = false;

    if (document.getElementById("nickname").value == "") {
      document.getElementById("nickname-error").innerHTML = "Campo Obrigatório"
      document.getElementById("nickname").classList.add("border-red-500")
    } else
      validNick = true

    if (document.getElementById("birthday").value == '') {
      document.getElementById("birthday-error").innerHTML = "Campo Obrigatório"
      document.getElementById("birthday").classList.add("border-red-500")
    } else
      validBirth = true

    if (validNick == true && validBirth == true) {
      const res = await cadastroGoogle(formData)
      if (res.redirect === true) {
        router.push('/search')
      } else {
        setMessage(res.message)
      }
    } else {
      setMessage("Preencha os valores corretamente!")
    }
  }

  // function createLabelError(element, text) {
  //   element.classList.add("ring-red-600");
  //   const elementeElement = document.createElement("label");
  //   elementeElement.classList = "text-red-600 text-xs";
  //   const elementText = document.createTextNode(text);
  //   elementeElement.appendChild(elementText);
  //   element.parentElement.appendChild(elementeElement);
  //   element.addEventListener("blur", function () {
  //     elementeElement.remove();
  //     element.classList.remove("ring-red-600");
  //   });
  //   document.getElementsByTagName("button")[0].addEventListener("click", function () {
  //     elementeElement.remove();
  //     element.classList.remove("ring-red-600");
  //   });
  // }
  const [formData, setFormData] = useState({
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
      <div className="bg-gray-100 dark:bg-zinc-800 max-w-md p-8 rounded shadow w-4/5 sm:w-1/2">
        <h1 className="dark:text-white text-center text-3xl font-bold uppercase">
          Cadastro
        </h1>
        <div className="text-red-500 text-center text-sm font-light h-4 my-2">
          {message}
        </div>
        <form action={onRegister}>
          <div className="mb-4">
            <Input
              id="nickname"
              type="text"
              name="nickname"
              placeholder="Digite seu nome de usuário..."
            />
          </div>
          <div className="mb-4">
            <Input
              id="birthday"
              type="date"
              name="birthday"
              placeholder="Aponte sua data de nascimento..."
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
