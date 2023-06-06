"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUsuario } from "@/lib/fetch";

export default function Login({ params }) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    senha: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await loginUsuario(formData);
    if (res["id_usuario"] !== undefined) {
      document.cookie = "id=" + res["id_usuario"];
      router.refresh();
    } else {
      document.getElementById("resultado").innerText = "Login Inválido";
    }
  }

  return (
    <main className="mx-auto sm:max-w-7xl px-2 sm:px-6 lg:px-8 min-h-[80vh] flex justify-center items-center">
      <div className="bg-gray-100 dark:bg-zinc-800 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-4/5 sm:w-1/2">
        <h1 className="dark:text-white text-center text-3xl font-bold mb-3 uppercase">
          Login
        </h1>
        <div
          className="text-red-600 my-3 mx-auto text-center"
          id="resultado"
        ></div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-zinc-100 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-zinc-100 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              name="email"
              placeholder="Digite seu email"
              value={formData.email}
              onChange={handleChange}
            ></input>
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 dark:text-zinc-100 text-sm font-bold mb-2"
              htmlFor="senha"
            >
              Senha
            </label>
            <input
              value={formData.senha}
              onChange={handleChange}
              className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-zinc-100 leading-tight focus:outline-none focus:shadow-outline"
              id="senha"
              name="senha"
              type="password"
              placeholder="Digite sua senha"
            ></input>
          </div>
          <div className="flex items-center flex-col">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Entrar
            </button>
            <Link
              className="inline-block mt-10 align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="/cadastro"
            >
              Criar nova conta
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
