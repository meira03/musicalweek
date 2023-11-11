"use client";
import { useState } from "react";

export const NavSalas = ({ id_musica_sala }) => {
  const [selected, setSelected] = useState("padrao");
  function changeDiv(tipo_sala) {
    setSelected(tipo_sala);
  }

  return (
    <nav>
      <ul className="flex text-neon-blue-200">
        <li
          id="padrao-nav"
          onClick={() => changeDiv("padrao")}
          className={
            "uppercase mr-2 cursor-pointer hover:underline" +
            (selected == "padrao" && " underline")
          }
        >
          Salas
        </li>
        <li
          id="artista-nav"
          onClick={() => changeDiv("artista")}
          className={
            "uppercase mr-2 cursor-pointer hover:underline" +
            (selected == "artista" && " underline")
          }
        >
          Escolhas dos artistas
        </li>
        <li
          id="historico-nav"
          onClick={() => changeDiv("historico")}
          className={
            "uppercase mr-2 cursor-pointer hover:underline" +
            (selected == "historico" && " underline")
          }
        >
          Histórico
        </li>
      </ul>
    </nav>
  );
};
