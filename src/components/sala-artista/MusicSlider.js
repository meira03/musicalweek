"use client";
import { useState, useEffect } from "react";
import {
  ImVolumeMute,
  ImVolumeLow,
  ImVolumeMedium,
  ImVolumeHigh,
} from "react-icons/im";
import { IoMdSkipBackward, IoMdSkipForward } from "react-icons/io";
import { avaliaMusica } from "@/utils/sala";

export const MusicSlider = ({
  i,
  id_musica_sala,
  userRating,
  avaliacao_media,
}) => {
  const [value, setValue] = useState(0);

  console.log(avaliacao_media);
  useEffect(() => {
    setValue(userRating);
  }, [i]);

  async function handleSend(e) {
    if (!e.target.disabled) {
      e.target.disabled = true;
      console.log(id_musica_sala);
      const avaliacao = await avaliaMusica(value, id_musica_sala);

      console.log(avaliacao);
      if (avaliacao.sucesso) {
        document.getElementById(
          "avaliacao_media"
        ).style.left = `calc(${avaliacao.avaliacao_media}% - 7px)`;
        document.getElementById(
          "avaliacao_media"
        ).classList = "";
      }
    }
  }

  function handleInput(e) {
    setValue(e.target.value);
    //   Efeitos bonitos
  }

  return (
    <>
      <div className="mx-auto relative mt-5 flex w-4/5">
        <input
          type="range"
          id="music-slider"
          min="1"
          max="100"
          value={value}
          className="music-slider w-full"
          onInput={(e) => handleInput(e)}
          onMouseUp={handleSend}
          onTouchEnd={handleSend}
          disabled={userRating != 0 ? true : false}
        />
        <div
          style={{left: `calc(${avaliacao_media}% - 7px)`}}
          id="avaliacao_media"
          className={userRating == 0 && "hidden left-0"}
        ></div>
      </div>
      <div
        id="controls"
        className="flex justify-center items-center mt-4 text-4xl"
      >
        <button>
          <IoMdSkipBackward />
        </button>
        <div id="volume" className="border border-white rounded-full p-2 mx-5">
          {value < 1 && <ImVolumeMute />}
          {value >= 1 && value < 50 && <ImVolumeLow />}
          {value >= 50 && value < 75 && <ImVolumeMedium />}
          {value >= 75 && <ImVolumeHigh />}
        </div>
        <button>
          <IoMdSkipForward />
        </button>
      </div>
    </>
  );
};
