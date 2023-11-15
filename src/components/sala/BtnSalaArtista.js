"use client";
import { entraSalaArtista, sairSalaArtista } from "@/utils/artista";

export const BtnSalaArtista = ({ participante, id_sala }) => {

  async function entrarSala() {
    const res = await entraSalaArtista(id_sala);

    res.descricao ? console.log(res) : window.location.reload();
  }

  async function sairSala() {
    const res = await sairSalaArtista(id_sala);
    res.descricao ? console.log(res) : window.location.href = '/salas/';
  }

  return (
    <>
      {!participante ? (
        <button onClick={entrarSala} className="px-3 py-2 bg-neon-blue-200 white-text">
          Participar da Sala
        </button>
      ) : (
        <button onClick={() => sairSala(id_sala)} className="px-3 py-2 bg-red-600 white-text">
          Sair da Sala
        </button>
      )}
    </>
  );
};
