"use client";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { cadastraUsuario } from "@/lib/fetch";

export default function Cadastro({ params }) {
  const router = useRouter();

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
        <h1 className="dark:text-white text-center text-3xl font-bold mb-6 uppercase">
          Cadastro
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="nome"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-zinc-100"
            >
              Nome Completo
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              className="dark:text-white border border-gray-300 rounded px-3 py-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="nick"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-zinc-100"
            >
              Nome de Usuário
            </label>
            <input
              type="text"
              id="nick"
              name="nick"
              value={formData.nick}
              onChange={handleChange}
              className="dark:text-white border border-gray-300 rounded px-3 py-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="data_nasc"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-zinc-100"
            >
              Data de Nascimento
            </label>
            <input
              type="date"
              id="data_nasc"
              name="data_nasc"
              value={formData.data_nasc}
              onChange={handleChange}
              className="dark:text-white border border-gray-300 rounded px-3 py-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-zinc-100"
            >
              E-mail
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="dark:text-white border border-gray-300 rounded px-3 py-2 w-full"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="senha"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-zinc-100"
            >
              Senha
            </label>
            <input
              type="password"
              id="senha"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              className="dark:text-white border border-gray-300 rounded px-3 py-2 w-full"
              required
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
