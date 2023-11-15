"use client";
import { useState, useEffect } from "react";

export const FormataData = ({ dataTransformar, progressivo, formato }) => {
  const [tempoDecorrido, setTempoDecorrido] = useState("");

  if (formato == "DD/MM/YYYY") {
    const partes = dataTransformar.split(' ');

    const dataPartes = partes[0].split('-');

    const dataFormatada = `${dataPartes[2]}/${dataPartes[1]}/${dataPartes[0]}`;

    return dataFormatada;
  } else {
    useEffect(() => {
      const dataInicial = new Date(dataTransformar);

      const intervalID = setInterval(() => {
        const dataAtual = new Date();
        const diferencaEmSegundos = progressivo
          ? Math.max(0, Math.floor((dataAtual - dataInicial) / 1000))
          : Math.max(0, Math.floor((dataInicial - dataAtual) / 1000));

        if (diferencaEmSegundos <= 0 && !progressivo) {
          clearInterval(intervalID);
          if (formato == "hh:mm:ss") {
            setTempoDecorrido("00:00:00");
          } else {
            setTempoDecorrido("00:00");
          }
        } else {
          const horas = Math.floor(diferencaEmSegundos / 3600);
          const minutos = Math.floor((diferencaEmSegundos % 3600) / 60);
          const segundos = diferencaEmSegundos % 60;

          const horasFormatadas = horas.toString().padStart(2, "0");
          const minutosFormatados = minutos.toString().padStart(2, "0");
          const segundosFormatados = segundos.toString().padStart(2, "0");

          if (formato == "hh:mm:ss") {
            setTempoDecorrido(`${horasFormatadas}:${minutosFormatados}:${segundosFormatados}`);
          } else {
            setTempoDecorrido(`${horasFormatadas}:${minutosFormatados}`);
          }
        }
      }, 1000);

      return () => clearInterval(intervalID);
    }, [dataTransformar]);

    return tempoDecorrido;
  }

};
