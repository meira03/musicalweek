"use client";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";
//import { cadastraUsuario } from "@/lib/fetch";

import Input from "@/components/form/Input";
import { register } from '@/utils/forms'; 


export default function Cadastro() {
  const router = useRouter();
  const [message, setMessage] = useState('');

  async function onRegister(formData) {
    if (document.getElementById("passwordConfirmation").value == "" || document.getElementById("nickname").value == "" || document.getElementById("completeName").value == "" ||document.getElementById("email").value == "" || document.getElementById("passwordCadastro").value == "") {
      if (document.getElementById("completeName").value == "") {
        document.getElementById("completeName-error").innerHTML = "Campo Obrigatório"
        document.getElementById("completeName").classList.add("border-red-500")
      }
      if (document.getElementById("nickname").value == "") {
        document.getElementById("nickname-error").innerHTML = "Campo Obrigatório"
        document.getElementById("nickname").classList.add("border-red-500")
      }

      if (document.getElementById("birthday").value == null) {
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

    let valid = true;

    // if(document.getElementById("completeName").value.length === 0){valid = false;}
    // if(!/^[A-Za-zÀ-ÿ ]+$/.test(document.getElementById("completeName").value)){valid = false;}
    // if(!/^\b\w{2,}\s+\w{2,}\b/.test(document.getElementById("completeName").value)){valid = false;}

    // if(document.getElementById("nickname").value.length === 0){valid = false;}
    // if (3 < document.getElementById("nickname").value.length && document.getElementById("nickname").value.length < 17){valid = false;}

    // const today = new Date();
    // const userBirthday = new Date(document.getElementById("birthday").value);
    // const userAge = today.getFullYear() - userBirthday.getFullYear();
    // if(userAge < 18){valid = false;}
    // if(userAge > 130){valid = false;}

    // const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    // if (document.getElementById("email").value.length === 0){valid = false;}
    // if (!emailPattern.test(document.getElementById("email").value)){valid = false;}

    

    // if(document.getElementById("password").value != document.getElementById("passwordConfirmation").value){valid = false;}
      if(document.getElementById("passwordCadastro").value === document.getElementById("passwordConfirmation").value){
        const res = await register(formData)
        if (res.redirect === true) {
          router.push('/search')
        } else  {
          if(res.message == 'Alguma das informações inseridas é inválida.')
            setMessage(res.message)
          else if(res.message == 'Já está em uso!'){
            document.getElementById("nickname-error").innerHTML = "O nickname em questão já está em uso.";
            document.getElementById("nickname").classList.add("border-red-500");
            document.getElementById("email-error").innerHTML = "O email em questão já está em uso.";
            document.getElementById("email").classList.add("border-red-500");
          } else if(res.message == "O email em questão já está em uso."){
              document.getElementById("email-error").innerHTML = res.message;
              document.getElementById("email").classList.add("border-red-500");
            } else if(res.message == "O nickname em questão já está em uso."){
              document.getElementById("nickname-error").innerHTML = res.message;
              document.getElementById("nickname").classList.add("border-red-500");
            }
        }
      }else {
        setMessage("Senhas não coincidem!")
      }
    

    
  }

  /////////////////////////////////////////////////////////////////////
  function createLabelError(element, text) {
    element.classList.add("ring-red-600");
    const elementeElement = document.createElement("label");
    elementeElement.classList = "text-red-600 text-xs";
    const elementText = document.createTextNode(text);
    elementeElement.appendChild(elementText);
    element.parentElement.appendChild(elementeElement);
    element.addEventListener("blur", function () {
      elementeElement.remove();
      element.classList.remove("ring-red-600");
    });
    document.getElementsByTagName("button")[0].addEventListener("click", function () {
      elementeElement.remove();
      element.classList.remove("ring-red-600");
    });
  } 
  const [formData, setFormData] = useState({
    nome: "",
    nick: "",
    data_nasc: "",
    email: "",
    senha: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await cadastraUsuario(formData);

    Object.keys(res).forEach((item) => {
      if (item == "nome") {
        createLabelError(document.getElementById(item), "Nome Inválido")
      }
      if (item == "nick") {
        createLabelError(document.getElementById(item), "Nick Inválido")
      }
      if (item == "data_nasc") {
        createLabelError(document.getElementById(item), "Data de Nascimento Inválida")
      }
      if (item == "email") {
        createLabelError(document.getElementById(item), "Email Inválido")
      }
      if (item == "senha") {
        createLabelError(document.getElementById(item), "Senha Inválida")
      }
      if (item == "id_usuario") {
        document.cookie = "id=" + res[item];
        router.push('/salas');
      }
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
              id="completeName"
              type="text"
              name="completeName"
              placeholder="Digite seu nome completo..."
            />
          </div>
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
          <div className="mb-4">
            <Input
              id="email"
              type="text"
              name="email"
              placeholder="Digite seu email..."
            />
          </div>
          <div className="mb-6">
            <Input
              id="passwordCadastro"
              type="password"
              name="senha"
              placeholder="Digite sua senha..."
            />
          </div>
          <div className="mb-6">
            <Input
              id="passwordConfirmation"
              type="password"
              name="passwordConfirmation"
              placeholder="Digite a mesma senha..."
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
          <div className="flex items-center flex-col">
              <Link
                className="inline-block mt-10 align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                href="/login"
              >
                Já possuo uma conta (Login)
              </Link>
            </div>
        </form>
      </div>
    </main>
  );
}
