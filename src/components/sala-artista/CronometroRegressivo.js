"use client";
import { useState, useEffect } from "react";

export const CronometroRegressivo = ({ dataFutura }) => {
    const [tempoDecorrido, setTempoDecorrido] = useState("00:00:00");

    useEffect(() => {
      const dataInicial = new Date(dataFutura);
  
      const intervalID = setInterval(() => {
        const dataAtual = new Date();
        const diferencaEmSegundos = Math.floor(
          (dataInicial - dataAtual) / 1000
        );
  
        if (diferencaEmSegundos <= 0) {
          clearInterval(intervalID);
          setTempoDecorrido("00:00:00");
        } else {
          const horas = Math.floor(diferencaEmSegundos / 3600);
          const minutos = Math.floor((diferencaEmSegundos % 3600) / 60);
          const segundos = diferencaEmSegundos % 60;
  
          const horasFormatadas = horas.toString().padStart(2, "0");
          const minutosFormatados = minutos.toString().padStart(2, "0");
          const segundosFormatados = segundos.toString().padStart(2, "0");
  
          setTempoDecorrido(`${horasFormatadas}:${minutosFormatados}:${segundosFormatados}`);
        }
      }, 1000);
  
      return () => clearInterval(intervalID);
    }, [dataFutura]);
  
    return <div className="text-3xl">{tempoDecorrido}</div>;
};
