"use client";
import { entraSalaArtista, sairSalaArtista } from "@/utils/artista";

export const BtnSalaArtista = ({ participante, id_sala }) => {

    function entrarSala() {
        const res = entraSalaArtista(id_sala);
        res ? window.location.reload : console.log("Erro interno no servidor");
    }

    function sairSala(id_musica_sala) {
      console.log("código Meira");
      sairSalaArtista(id_musica_sala);
    }

  return (
    <>
      {!participante ? (
        <button onClick={entrarSala} className="px-3 py-2 bg-neon-blue-200 white-text">
          Participar da Sala
        </button>
      ) : (
        <button onClick={sairSala(id_sala)} className="px-3 py-2 bg-red-600 white-text">
          Sair da Sala
        </button>
      )}
    </>
  );
};
