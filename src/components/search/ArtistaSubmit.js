"use client";
import { useContext } from "react";
import myContext from "@/app/[lang]/artista/search/context/context";

import { criaSala } from "@/utils/artista";

export const ArtistaSubmit = () => {
  const { imageUrls } = useContext(myContext);

  async function handleClick() {
    const musicasSelecionadas = imageUrls.map((imageInfo) => imageInfo[0]);

    if (musicasSelecionadas.length === 7) {
        // criaSala(musicasSelecionadas);
    }
  }


  return (
    <>
        <div id="modal-confirma" className="absolute top-0 left-0 z-50 bg-black-900 bg-opacity-70 w-full h-full flex justify-center items-center">
            <div className="bg-black-900 w-1/2 h-2/3 flex flex-col justify-center items-center">
                <h1>Sala de </h1>
                <button className="uppercase text-xl text-white  px-2 py-2 text-center bg-neon-blue-200">Inciar a Sala</button>
            </div>
        </div>
        <button
        onClick={handleClick}
        className={
            "uppercase text-xl text-white w-full py-2 text-center " +
            (imageUrls.length === 7 ? "bg-neon-blue-200" : "bg-zinc-700 opacity-60")
            }
            >
            Começar Sala
        </button>
    </>
  );
};
