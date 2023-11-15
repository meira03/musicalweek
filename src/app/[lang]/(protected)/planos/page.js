"use client";
import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import EscolherPlano from '../planos/EscolherPlano';
import { updatePlano } from '@/utils/user'
import { getSession } from 'next-auth/react';
import { authOption } from "@/app/api/auth/[...nextauth]/route";

Modal.setAppElement(null);

export default function Planos() {
  const [planoSelecionado, setPlanoSelecionado] = useState(null);
  const [planoSelecionadoIndex, setPlanoSelecionadoIndex] = useState(null);
  const session = getSession(authOption)
  const [token, setToken] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const planos = [
    {
      nome: "Plano Gratuito",
      preco: "Grátis",
      participacaoSalasPadrao: "Limite de 2 salas",
      participacaoSalasArtistas: "Ilimitado",
      historicoSalas: "Limite de 5 salas",
      criacaoSalasArtista: "",
      estatisticas: "",
    },
    {
      nome: "Plano Premium",
      preco: "R$7.90",
      participacaoSalasPadrao: "Limite de 5 salas",
      participacaoSalasArtistas: "Ilimitado",
      historicoSalas: "Limite de 10 salas",
      criacaoSalasArtista: "",
      estatisticas: "",
    },
    {
      nome: "Plano do Artista",
      preco: "R$79.90",
      participacaoSalasPadrao: "Limite de 30 salas",
      participacaoSalasArtistas: "Ilimitado",
      historicoSalas: "Limite de 60 salas",
      criacaoSalasArtista: "Limite de 1 sala ativa",
      estatisticas: "Personalizadas",
    },
  ];

  const selecionarPlanoPorSession = () => {
    const planoSelecionadoCookie = session.plano;

    if (planoSelecionadoCookie !== undefined && planoSelecionadoCookie !== null) {
      const planoIndex = planos.findIndex(plano => plano.nome === planoSelecionadoCookie);

      if (planoIndex !== -1) {
        setPlanoSelecionadoIndex(planoIndex);
        setPlanoSelecionado(planos[planoIndex]);
      }
    }
  };

  useEffect(() => {
    setToken(session.token || null);
    selecionarPlanoPorSession();
  }, [session]);

  const enviarPlano = (planoIndex) => {
    if (planoIndex !== null) {
      const token = session.token || null;

      if (!token) {
        console.error('Token de autenticação ausente.');
        return;
      }

      updatePlano(token, planoIndex)
        .then((success) => {
          if (success) {
            setCookie('plano', planos[planoIndex].nome);
            setModalIsOpen(true);
          }
        });
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    window.location.href = '/perfil';
  };

  return (
    <div className="flex text-white items-center min-h-screen">
      <div className="container m-auto py-10 px-8">
        <h1 className="neon-text text-4xl uppercase font-semibold mb-6 text-center">Planos e Preços</h1>
        <p className="text-lg font-semibold mb-8 text-center">
          Escolha o plano que melhor atenda à sua necessidade e aproveite por completo os benefícios da nossa aplicação com os planos pagos. Descubra um universo de músicas em um só lugar.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {planos.map((plano, index) => (
            <EscolherPlano
              key={index}
              plano={plano}
              selecionado={index === planoSelecionado}
              onSelect={() => setPlanoSelecionado(index)}
              enviarPlano={() => enviarPlano(index)}
              index={index}
            />
          ))}
        </div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Exemplo de Modal"
          ariaHideApp={false}
          className="modal fixed inset-0 flex items-center justify-center z-50"
          overlayClassName="modal-overlay fixed inset-0 bg-black"
        >
          <div className="bg-zinc-950 p-8 border border-gray-600 shadow-lg w-3/4 sm:w-2/4 h-3/4 sm:h-2/4 mx-auto flex flex-col items-center justify-center">
            <h2 className="text-4xl font-semibold mb-5 neon-text uppercase">Parabéns</h2>
            <p className="text-2xl mb-12 ">Seu plano foi atualizado com sucesso!</p>
            <button
              className="bg-teal-500 hover:bg-teal-600 text-white font-xbold py-3 w-full text-xl"
              onClick={closeModal}
            >
              OK
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
}