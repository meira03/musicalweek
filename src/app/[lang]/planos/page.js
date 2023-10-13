"use client";
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import Modal from 'react-modal';
import { updatePlano } from '../../../utils/plano';
import EscolherPlano from '../planos/EscolherPlano';

Modal.setAppElement(null);

export default function Planos() {
  const [planoSelecionado, setPlanoSelecionado] = useState(null);
  const [planoSelecionadoIndex, setPlanoSelecionadoIndex] = useState(null);
  const [cookies, setCookie] = useCookies(['plano']);
  const [token, setToken] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const planos = [
    {
      nome: "Plano Gratuito",
      preco: "Grátis",
      participacaoSalasPadrao: "2 salas simultâneas",
      participacaoSalasArtistas: "Ilimitado",
      historicoSalas: "Últimas 5 salas",
      criacaoSalasArtista: "",
      estatisticas: "",
    },
    {
      nome: "Plano Premium",
      preco: "R$4.90",
      participacaoSalasPadrao: "5 salas simultâneas",
      participacaoSalasArtistas: "Ilimitado",
      historicoSalas: "Últimas 10 salas",
      criacaoSalasArtista: "",
      estatisticas: "",
    },
    {
      nome: "Plano do Artista",
      preco: "R$49.90",
      participacaoSalasPadrao: "30 salas simultâneas",
      participacaoSalasArtistas: "Ilimitado",
      historicoSalas: "Últimas 60 salas",
      criacaoSalasArtista: "1 por semana",
      estatisticas: "Personalizadas",
    },
  ];

  const selecionarPlanoPorCookies = () => {
    const planoSelecionadoCookie = cookies.plano;
  
    if (planoSelecionadoCookie !== undefined && planoSelecionadoCookie !== null) {
      const planoIndex = planos.findIndex(plano => plano.nome === planoSelecionadoCookie);
  
      if (planoIndex !== -1) {
        setPlanoSelecionadoIndex(planoIndex);
        setPlanoSelecionado(planos[planoIndex]);
      }
    }
  };  

  useEffect(() => {
    setToken(cookies.token || null);
    selecionarPlanoPorCookies();
  }, [cookies]);

  const enviarPlano = (planoIndex) => {
    if (planoIndex !== null) {
      const token = cookies.token || null;
  
      if (!token) {
        console.error('Token de autenticação ausente.');
        return;
      }

      updatePlano(token, planoIndex)
        .then((success) => {
          if (success) {
            console.log('Plano atualizado com sucesso');
            setCookie('plano', planos[planoIndex].nome);
            setModalIsOpen(true);
          }
        });
    }
  };
  
  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="min-h-screen text-white">
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-semibold mb-6 text-center">Planos e Preços</h1>
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
          <div className="bg-white p-8 rounded-lg shadow-lg w-1/2 h-1/2 mx-auto flex flex-col items-center justify-center">
            <h2 className="text-4xl font-semibold mb-10 text-black">Parabéns</h2>
            <p className="text-2xl mb-10 text-black">Seu plano foi atualizado com sucesso!</p>
            <button
              className="bg-teal-500 hover:bg-teal-600 text-white font-xbold py-3 px-20 rounded-lg text-xl"
              onClick={closeModal}
            >
              Okay
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
}