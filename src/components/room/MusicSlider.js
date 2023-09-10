"use client";
import { useState, useEffect } from "react";
import {
  ImVolumeMute,
  ImVolumeLow,
  ImVolumeMedium,
  ImVolumeHigh,
} from "react-icons/im";
import { IoMdSkipBackward, IoMdSkipForward } from "react-icons/io";
import "@/styles/MusicSlider.css";

export const MusicSlider = ({ key, userRating }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    setValue(userRating);
  }, [key]);

  function handleSend(e) {
    if (!e.target.disabled) {
      e.target.disabled = true;
      //   Avaliacao Fetch
      const url =
        "https://musicalweek-api.azurewebsites.net/endpoints/avalia_musica.php";
      const headers = new Headers();
      headers.append("Content-Type", "application/json");

      const data = {
        nota: value,
        id_musica_sala: id_musica_sala,
        id_usuario: id_usuario,
      };

      const res = fetch(url, {
        method: "POST",
        cache: "no-store",
        headers: headers,
        credentials: "include",
        body: JSON.stringify(data),
      })
        .then((response) => {
          return response;
        })
        .catch((error) => {
          console.error("Erro na requisição:", error);
        });

      res.json();
    }
  }

  function handleInput(e) {
    setValue(e.target.value);
    //   Efeitos bonitos
  }

  return (
    <>
      <input
        type="range"
        id="music-slider"
        min="1"
        max="100"
        value={value}
        className="music-slider mt-5 flex m-auto"
        onInput={(e) => handleInput(e)}
        onMouseUp={handleSend}
        onTouchEnd={handleSend}
        disabled={userRating != 0 ? true : false}
      />
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
