"use client";
import { entraSalaArtista, sairSalaArtista } from "@/utils/artista";

export const BtnSalaArtista = ({ participante, id_sala }) => {

    function entrarSala() {
        const res = entraSalaArtista(id_sala);
        res ? window.location.reload(true) : console.log("Erro interno no servidor");
    }

    function sairSala() {
        res = sairSalaArtista(id_sala);
        res ? window.location.reload(true) : console.log("Erro");
    }

  return (
    <>
      {!participante ? (
        <button onClick={entrarSala} className="px-3 py-2 bg-neon-blue-200 white-text">
          Participar da Sala
        </button>
      ) : (
        <button onClick={sairSala} className="px-3 py-2 bg-red-600 white-text">
          Sair da Sala
        </button>
      )}
    </>
  );
};
