"use client"
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import Modal from 'react-modal';

Modal.setAppElement(null);

export default function DeleteAccount() {
  const [deleting, setDeleting] = useState(false);
  const [cookies, setCookie] = useCookies(['token']);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleDeleteAccount = async () => {
    try {
      setDeleting(true);

      const token = cookies.token || null;

      if (!token) {
        console.error('Token de autenticação ausente.');
        return;
      }

      const response = await fetch('https://musicalweek-api.azurewebsites.net/endpoints/usuario/index.php', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        cache: 'no-store',
      });

      if (response.ok) {
        console.log('Conta deletada com sucesso');
      } else {
        console.error('Erro ao deletar a conta');
      }
    } catch (error) {
      console.error('Erro ao deletar a conta', error);
    } finally {
      setDeleting(false);
      setShowConfirmationModal(false);
    }
  };

  return (
    <div>
      <button
        className={`bg-red-500 hover:bg-red-600 text-white rounded-lg px-4 py-2`}
        onClick={() => setShowConfirmationModal(true)}
        disabled={deleting}
      >
        Deletar Conta
      </button>

      <Modal
        isOpen={showConfirmationModal}
        onRequestClose={() => setShowConfirmationModal(false)}
        contentLabel="Confirmar Exclusão"
        ariaHideApp={false}
        className="modal fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="modal-overlay fixed inset-0 bg-black"
      >
        <div className="bg-white p-8 rounded-lg shadow-lg w-1/2 h-1/2 mx-auto flex flex-col items-center justify-center">
          <h2 className="text-4xl font-semibold mb-6">Confirma a Exclusão da Conta?</h2>
          <p className="text-xl mb-6">Tem certeza de que deseja excluir sua conta?</p>
          <div className="flex space-x-4">
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg"
              onClick={handleDeleteAccount}
              disabled={deleting}
            >
              Excluir
            </button>
            <button
              className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg"
              onClick={() => setShowConfirmationModal(false)}
              disabled={deleting}
            >
              Cancelar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
