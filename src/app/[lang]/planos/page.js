"use client";
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import Modal from 'react-modal';
import EscolherPlano from './EscolherPlano';

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
      const data = { "plano": planoIndex };
  
      fetch('https://musicalweek-api.azurewebsites.net/endpoints/usuario/index.php', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      })
        .then(response => response.json())
        .then(responseData => {
          console.log('JSON enviado com sucesso:', responseData);
          
          // Use cookieStore.set para atualizar o cookie
          cookieStore.set('plano', planoIndex);
        })
        .catch(error => {
          console.error('Erro ao enviar JSON:', error);
        });

      setCookie('plano', planos[planoIndex].nome);
  
      setModalIsOpen(true);
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
          className="modal fixed inset-0 flex items-center justify-center z-50" // Estilo para o modal principal
          overlayClassName="modal-overlay fixed inset-0 bg-black" // Estilo para o fundo do modal
        >
          <div className="bg-white p-8 rounded-lg shadow-lg w-1/2 h-1/2 mx-auto flex flex-col items-center justify-center"> {/* Estilo para o conteúdo do modal */}
            <h2 className="text-4xl font-semibold mb-10">Parabéns</h2> {/* Estilo para o título do modal */}
            <p className="text-2xl mb-10">Seu plano foi atualizado com sucesso!</p> {/* Estilo para a mensagem do modal */}
            <button
              className="bg-teal-500 hover:bg-teal-600 text-white font-xbold py-3 px-20 rounded-lg text-xl" // Estilo para o botão do modal
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