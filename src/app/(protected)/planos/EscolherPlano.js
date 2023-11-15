"use client";
import { getSession } from 'next-auth/react';
import { authOption } from "@/app/api/auth/[...nextauth]/route";
import React, { useEffect } from 'react';

export default function EscolherPlano({ plano, selecionado, onSelect, enviarPlano, planoSelecionadoIndex, index }) {
  const session = getSession(authOption)

  useEffect(() => {
    const div = document.getElementById(`div-${index}`);
    const botao = document.getElementById(`botao-${index}`);
    if (botao && div) {
      const botaoSelecionado = index === planoSelecionadoIndex || plano.nome === session.plano;
      botao.textContent = botaoSelecionado ? 'Plano Selecionado' : 'Escolher Plano';
      div.classList.toggle('bg-gray-600', botaoSelecionado);
    }
  }, [planoSelecionadoIndex, session.plano, index]);

  const handleEscolherPlano = () => {
    onSelect();
    enviarPlano(index);
  };

  return (
    <div
      id={`div-${index}`}
      className={`p-6 border border-neon-blue-200 hover:border-neon-blue-300 shadow-md text-center flex flex-col justify-between hover:bg-gray-800 transition duration-300`}>
      <div>
        <h2 className="text-2xl neon-text uppercase font-medium mb-4">{plano.nome}</h2>
        <p className="text-xl text-white font-bold mb-4">{plano.preco}</p>
        <p className="text-base font-semibold mb-2">Salas Padrões: {plano.participacaoSalasPadrao}</p>
        <p className="text-base font-semibold mb-2">Salas de Artistas: {plano.participacaoSalasArtistas}</p>
        {plano.criacaoSalasArtista && (
          <p className="text-base font-semibold mb-2">Criação de Salas de Artista: {plano.criacaoSalasArtista}</p>
        )}
        {plano.historicoSalas && (
          <p className="text-base font-semibold mb-2">Histórico: {plano.historicoSalas}</p>
        )}
        {plano.estatisticas && (
          <p className="text-base font-semibold mb-2">Estatísticas: {plano.estatisticas}</p>
        )}
      </div>
      <button
        id={`botao-${index}`}
        className={`bg-neon-blue-200 hover:bg-neon-blue-300 text-white px-6 py-3 mt-4`}
        onClick={handleEscolherPlano}
      >
        Escolher Plano
      </button>
    </div>
  );
}

