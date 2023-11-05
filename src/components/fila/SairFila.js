"use client";
import { useRouter } from 'next/navigation'
import { FaXmark } from "react-icons/fa6";

import { sairFila } from '@/utils/sala'

export default function SairFila({id_musica_sala}) {
  const router = useRouter();
  
  async function handleClick() {
    const fila = await sairFila(id_musica_sala);
    if(fila.sucesso != undefined){
      window.location.href = '/salas';
    }
    
    if(fila.id_sala != undefined){
      window.location.href = `/sala/${fila.id_sala}`;
    }

    else{
      window.location.href = `/salas`;
    }
  }

  return (
    <FaXmark onClick={handleClick} className="absolute right-0 top-0 px-2 py-1 cursor-pointer text-3xl text-red-600" />
  );
};
