"use client";
import { avaliaMusica } from "@/utils/sala";

import { Pontuacao } from "@/components/Pontuacao";

import { useState } from "react";
import { BsChevronCompactUp } from "react-icons/bs";
import { FaXmark } from "react-icons/fa6";

import "@/styles/slider.css";

export const Avaliacao = ({ id_musica_sala }) => {
  const [screen, setScreen] = useState(false);
  const [value, setValue] = useState(1);

  async function handleClick(nota) {
    const res = await avaliaMusica(nota, id_musica_sala);

    if (res.sucesso === true) {
      window.location.reload()
    } else {
      window.location.href = "/salas"
    }
  }
  return (
    <>
      <div className="fixed bottom-3 left-0 w-full">
        <div
          onClick={() => setScreen(true)}
          className="flex flex-col justify-center items-center animate-bounce cursor-pointer w-fit mx-auto bg-gradient-to-t from-black-100 from-70% to-transparent px-2"
        >
          <BsChevronCompactUp className="text-3xl -mb-2" />
          AVALIE
        </div>
      </div>
      <div
        id="avaliacao-screen"
        className={
          "fixed bg-black-100 bg-opacity-95 left-0 top-0 w-full h-full z-30" +
          (screen ? "" : " hidden")
        }
      >
        <FaXmark
          onClick={() => setScreen(false)}
          className="absolute top-3 right-3 text-2xl text-red-600 z-40 cursor-pointer"
        />
        <div className="flex flex-col items-center justify-center h-full">
          <div
            id="numero_avaliacao"
            className="text-9xl"
          >
            <Pontuacao pontuacao={value} />
          </div>
          <div className="mx-auto relative my-10 flex w-4/5 sm:w-2/5">
            <input
              type="range"
              id="music-slider"
              min="1"
              max="100"
              value={value}
              onInput={(e) => setValue(e.target.value)}
              className="music-slider w-full"
            />
          </div>
          <button
            className="bg-neon-blue-300 text-white uppercase font-bold px-4 py-2"
            onClick={() => handleClick(value)}
          >
            Avaliar
          </button>
        </div>
      </div>
    </>
  );
};
