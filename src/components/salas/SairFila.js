"use client";
import { FaXmark } from "react-icons/fa6";
import { sairFila } from "@/utils/sala";

export const SairFila = ({ id_musica_sala }) => {
  async function handleClick() {
    await sairFila(id_musica_sala);
    window.location.reload();
  }

  return (
    <div onClick={handleClick} className="absolute right-1 top-0 bg-neon-blue-200 sm:bg-transparent z-50 rounded-b sm:-right-16 sm:top-8 text-red-700 hover:text-red-600 sm:text-4xl cursor-pointer">
        <FaXmark />
    </div>
  );
}
