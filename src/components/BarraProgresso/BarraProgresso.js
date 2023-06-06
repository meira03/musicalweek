"use client"

import  { usePathname  } from 'next/navigation';

const BarraProgresso = () => {
  const url = usePathname().split("/")[1];
  const proresso = `
    h-3 -z-10 bg-zinc-300 dark:bg-zinc-800 rounded-lg
  `;

  const proressoAtivo = `
    h-3 -z-10 bg-sky-400 animate-pulse rounded-lg
  `;

  const proressoLigado = `
    h-3 -z-10 bg-sky-400 rounded-lg
  `;
  var barra = [proresso,proresso,proresso];

  switch (url) {
    case "musica":
      barra = [proressoAtivo,proresso,proresso];
      break;

    case "genero":
      barra = [proressoLigado,proressoAtivo,proresso];
      break;
  
    default:
      barra = [proresso,proresso,proresso];
      break;
  }
  
  

  return (
    <div className="grid grid-cols-3 w-full gap-4">
      <div className={barra[0]}></div>
      <div className={barra[1]}></div>
      <div className={barra[2]}></div>
    </div>
  );
};

export default BarraProgresso;
