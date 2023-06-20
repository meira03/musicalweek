"use client";
import { Suspense, useState } from "react";
import ProcuraMusica from "@/components/Server/ProcuraMusica.js";
import Loading from "@/app/loading.js";

const Musica = ({ usuario }) => {
    const [searchTerm, setSearchTerm] = useState("");
  const handleTermoPesquisa = (event) => {
    setSearchTerm(event.target.value);
  };
  return (
    <>
      <div className="grid sm:grid-cols-2 text-center sm:text-left my-4">
        <h2 className="text-3xl dark:text-white inline-block">
          Selecione sua Música
        </h2>
        <input
          className="bg-zinc-200 dark:bg-zinc-800 dark:text-white rounded-lg px-2 py-2"
          type="text"
          placeholder="Digite sua busca..."
          onChange={handleTermoPesquisa}
        />
      </div>
      <div className="h-[75vh] overflow-y-auto pr-2">
        <Suspense fallback={<Loading />}>
          <ProcuraMusica pesquisa={searchTerm} id_usuario={usuario} />
        </Suspense>
      </div>
    </>
  );
};

export default Musica;
