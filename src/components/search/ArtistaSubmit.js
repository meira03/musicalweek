"use client";
import { useContext } from "react";
import myContext from "@/app/[locale]/(protected)/artista/search/context/context";
import { Music } from "@/components/search/Music";

import { criaSala } from "@/utils/artista";
import { useRouter } from "next/navigation";

export const ArtistaSubmit = () => {
  const { imageUrls } = useContext(myContext);
  const router = useRouter()

  async function handleClick() {
    const musicasSelecionadas = imageUrls.map((imageInfo) => imageInfo[0]);

    const res = await criaSala(musicasSelecionadas);
    if (res != undefined) {
      document.getElementById("search-error").innerHTML = res;
      document.getElementById("modal-confirma").classList.add("hidden")
      return false
    }
    router.replace(`/artista/sala/${res.id_sala}/resumo`)

  }

  function openModal() {
    document.getElementById("modal-confirma").classList.toggle("hidden");
  }

  return (
    <>
      <div
        id="modal-confirma"
        className="hidden flex fixed z-50 left-0 top-0 w-full h-full justify-center items-center"
      >
        <div
          onClick={() =>
            document.getElementById("modal-confirma").classList.toggle("hidden")
          }
          className="absolute top-0 left-0 z-40 bg-black-900 bg-opacity-70 w-full h-full"
        ></div>
        <div className="bg-black-900 border border-neon-blue-300 w-fit max-w-5xl flex flex-col justify-center items-center z-50 pb-10 pt-20 overflow-y-auto max-h-screen">
          <h1 className="neon-text text-3xl my-3">RESUMO DA SALA</h1>
          <div id="musicas-artista" className="flex flex-wrap justify-center w-4/5 ">
            {imageUrls.map((i, key) => {
              const currentDate = new Date();
              const newDate = new Date(currentDate);
              newDate.setDate(currentDate.getDate() + key);

              const day = String(newDate.getDate()).padStart(2, '0');
              const month = String(newDate.getMonth() + 1).padStart(2, '0');
              const year = newDate.getFullYear();

              const musicDate = `${day}/${month}/${year}`;
              return (
                <div key={key} className="relative flex-[0_0_calc(25%-16px)] m-2">
                  <div className="text-center">
                    {musicDate}
                  </div>
                  <Music track={i[1]} click={false} />
                </div>
              );
            })}
          </div>
          <button onClick={handleClick} className="uppercase text-xl text-white mt-4 px-2 py-2 text-center bg-neon-blue-200">
            Iniciar Sala
          </button>
        </div>
      </div>
      <button
        onClick={openModal}
        className={
          "uppercase text-xl text-white w-full py-2 text-center " +
          (imageUrls.length === 7
            ? "bg-neon-blue-200"
            : "bg-zinc-700 opacity-60")
        }
      >
        Começar Sala
      </button>
    </>
  );
};
