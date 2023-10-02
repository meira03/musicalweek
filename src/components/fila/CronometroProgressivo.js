'use client'
import  { useState, useEffect } from "react";

function CronometroProgressivo({ data }) {
  const [tempoDecorrido, setTempoDecorrido] = useState("00:00");

  useEffect(() => {
    const dataInicial = new Date(data);

    const intervalID = setInterval(() => {
      const dataAtual = new Date();
      const diferencaEmSegundos = Math.floor(
        (dataAtual - dataInicial) / 1000
      );
      const minutos = Math.floor(diferencaEmSegundos / 60);
      const segundos = diferencaEmSegundos % 60;
      const minutosFormatados = minutos.toString().padStart(2, "0");
      const segundosFormatados = segundos.toString().padStart(2, "0");
      setTempoDecorrido(`${minutosFormatados}:${segundosFormatados}`);
    }, 1000);

    return () => clearInterval(intervalID);
  }, [data]);

  return <div className="text-3xl">{tempoDecorrido}</div>;
}

export default CronometroProgressivo;

