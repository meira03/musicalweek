"use client";
import { useRouter } from 'next/navigation'
import { FaXmark } from "react-icons/fa6";

import { sairFila } from '@/utils/sala'

export default function SairFila({id_musica_sala}) {
  const router = useRouter();
  
  async function handleClick() {
    const fila = await sairFila(id_musica_sala);
    console.log(fila);
    if(fila.sucesso != undefined){
      window.location.href = '/salas';
    }else{
      window.location.href = `/sala/${fila.id_sala}`;
    }
  }

  return (
    <FaXmark onClick={handleClick} className="absolute right-0 top-0 px-2 py-1 cursor-pointer text-3xl text-white" />
  );
};
