"use client";
import { avaliaMusica } from "@/utils/sala";

import { useState } from "react";
import { BsChevronCompactUp } from "react-icons/bs";
import { FaXmark } from "react-icons/fa6";

import "@/styles/slider.css";

export const Avaliacao = () => {
  const [screen, setScreen] = useState(false);
  const [value, setValue] = useState(0);

  function handleInput(v) {
    setValue(v);
    document.getElementById("numero_avaliacao").style.textShadow = `
    hsla(173, 33%, 84%, 0.92) 0px 0px 6px, 
    hsla(173, 33%, 84%, 0.34) 0px 0px 30px, 
    hsla(${v * 1.8}, 100%, 54.7%, 0.92) 0px 0px 12px, 
    hsla(${v * 1.8}, 100%, 54.7%, 0.92) 0px 0px 21px, 
    hsla(${v * 1.8}, 100%, 54.7%, 0.92) 0px 0px 34px
    `;
  }
  return (
    <>
      <div className="fixed bottom-3 left-0 w-full">
        <div
          onClick={() => setScreen(true)}
          className="flex flex-col justify-center items-center animate-bounce cursor-pointer w-fit mx-auto"
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
            style={{
              textShadow: `hsla(173, 33%, 84%, 0.92) 0px 0px 6px, 
    hsla(173, 33%, 84%, 0.34) 0px 0px 30px, 
    hsla(0, 100%, 54.7%, 0.92) 0px 0px 12px, 
    hsla(0, 100%, 54.7%, 0.92) 0px 0px 21px, 
    hsla(0, 100%, 54.7%, 0.92) 0px 0px 34px`,
            }}
          >
            {value}
          </div>
          <div className="mx-auto relative my-10 flex w-4/5 sm:w-2/5">
            <input
              type="range"
              id="music-slider"
              min="0"
              max="100"
              value={value}
              onInput={(e) => handleInput(e.target.value)}
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
