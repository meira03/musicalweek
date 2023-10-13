"use client";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { AlterarSenha } from "@/utils/forms";

export default function AlteraSenha() {
  const router = useRouter();
  const [error, setError] = useState(null);

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
    senhaAtual: "",
    senha: "",
    confirmaSenha: "",
  });

  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [hasMinLength, setHasMinLength] = useState(false);
  const [hasUppercase, setHasUppercase] = useState(false);
  const [hasLowercase, setHasLowercase] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);
  const [arePasswordsMatching, setArePasswordsMatching] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "senha") {
      setHasMinLength(value.length >= 8);
      setHasUppercase(/[A-Z]/.test(value));
      setHasLowercase(/[a-z]/.test(value));
      setHasNumber(/\d/.test(value));
      setHasSpecialChar(/[@$!%*?&.]/.test(value));
    }

    if (name === "confirmaSenha") {
      setArePasswordsMatching(value === formData.senha);
    }
  };

  const handlePasswordFocus = () => {
    setIsPasswordFocused(true);
  };

  const handlePasswordBlur = () => {
    setIsPasswordFocused(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (document.getElementById("senhaAtual").value == "" || document.getElementById("senha").value == "" || document.getElementById("confirmaSenha").value == "") {
      if (document.getElementById("senhaAtual").value == "") {
        document.getElementById("senhaAtual-error").innerHTML = "Campo Obrigatório"
        document.getElementById("senhaAtual").classList.add("border-red-500")
      }
      if (document.getElementById("senha").value == "") {
        document.getElementById("senha-error").innerHTML = "Campo Obrigatório"
        document.getElementById("senha").classList.add("border-red-500")
      }
      if (document.getElementById("confirmaSenha").value == "") {
        document.getElementById("confirmaSenha-error").innerHTML = "Campo Obrigatório"
        document.getElementById("confirmaSenha").classList.add("border-red-500")
      }
    }
    else if (!hasMinLength || !hasUppercase || !hasLowercase || !hasNumber || !hasSpecialChar) {
      createLabelError(document.getElementById("senha"), "Senha inválida");
      return;
    }
    else if (!arePasswordsMatching) {
      createLabelError(document.getElementById("confirmaSenha"), "As senhas não coincidem");
      return;
    }

    const res = await AlterarSenha(formData.senhaAtual, formData.senha);

    if (res.sucesso === true) {
      router.push("/perfil");
    } else {
      if (res.descricao == "Senha errada") {
        document.getElementById("senhaAtual-error").innerHTML = "Senha Incorreta"
        document.getElementById("senhaAtual").classList.add("border-red-500")
      } else {
        setError(res.descricao);
      }
    }
  };

  return (
    <main className="mx-auto sm:max-w-7xl px-2 sm:px-6 lg:px-8 min-h-[80vh] flex justify-center items-center">

      <div className="bg-gray-100 dark:bg-zinc-800 max-w-md p-8 rounded shadow w-4/5 sm:w-1/2">
        <h1 className="dark:text-white text-center text-3xl font-bold mb-6 uppercase">
          ALTERAR SENHA
        </h1>
        {error && (
          <div className="text-red-600 text-sm mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="senhaAtual"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-zinc-100"
            >
              Senha Atual
            </label>
            <input
              type="password"
              id="senhaAtual"
              name="senhaAtual"
              value={formData.senhaAtual}
              onChange={handleChange}
              onFocus={handlePasswordFocus}
              onBlur={handlePasswordBlur}
              className="dark:text-white border border-gray-300 rounded px-3 py-2 w-full"
            />
            <p id={"senhaAtual-error"} className="text-red-500 text-xs italic"></p>
          </div>
          <div className="mb-6">
            <label
              htmlFor="senha"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-zinc-100"
            >
              Nova Senha
            </label>
            <input
              type="password"
              id="senha"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              onFocus={handlePasswordFocus}
              onBlur={handlePasswordBlur}
              className="dark:text-white border border-gray-300 rounded px-3 py-2 w-full"
            />
            {isPasswordFocused && (
              <ul className="text-xs mt-1">
                <li className={hasMinLength ? "text-green-500" : "text-red-500"}>
                  Mínimo de 8 caracteres
                </li>
                <li className={hasUppercase ? "text-green-500" : "text-red-500"}>
                  Pelo menos uma letra maiúscula
                </li>
                <li className={hasLowercase ? "text-green-500" : "text-red-500"}>
                  Pelo menos uma letra minúscula
                </li>
                <li className={hasNumber ? "text-green-500" : "text-red-500"}>
                  Pelo menos um número
                </li>
                <li className={hasSpecialChar ? "text-green-500" : "text-red-500"}>
                  Pelo menos um caractere especial (@ $ ! % * ? & .)
                </li>
              </ul>
            )}
            <p id={"senha-error"} className="text-red-500 text-xs italic"></p>
          </div>
          <div className="mb-6">
            <label
              htmlFor="confirmaSenha"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-zinc-100"
            >
              Confirmar Nova Senha
            </label>
            <input
              type="password"
              id="confirmaSenha"
              name="confirmaSenha"
              value={formData.confirmaSenha}
              onChange={handleChange}
              className={`dark:text-white border ${arePasswordsMatching ? "border-gray-300" : "border-red-500"
                } rounded px-3 py-2 w-full`}
            />
            {!arePasswordsMatching && (
              <label className="text-red-500 text-xs mt-1">
                As senhas não coincidem
              </label>
            )}
            <p id={"confirmaSenha-error"} className="text-red-500 text-xs italic"></p>
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Alterar Senha
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
