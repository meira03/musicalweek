"use client"
import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { deleteAccount } from '@/utils/user'
import { getSession } from 'next-auth/react';
import { authOption } from "@/app/api/auth/[...nextauth]/route";
import { signOut } from "next-auth/react";

Modal.setAppElement(null);

export default function DeleteAccount() {
  const [deleting, setDeleting] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  async function handleDeleteAccount() {
    setDeleting(true);
    const cookies = await getSession(authOption)

    const token = cookies.token || null;

    const res = deleteAccount(cookies.token);

    if (!token) {
      console.error('Token de autenticação ausente.');
      return;
    }


    await signOut({
      redirect: false
    })

    window.location.href = "/"

  };

  return (
    <div>
      <button
        className={`bg-red-500 hover:bg-red-600 text-white w-full py-1.5`}
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
        <div className="bg-zinc-950 p-4 md:p-6 border border-gray-600 rounded-lg shadow-lg w-full md:w-1/2 lg:w-1/2 mx-auto flex flex-col items-center justify-center">
          <h2 className="text-4xl font-semibold mb-6 text-black ">Confirma a Exclusão da Conta?</h2>
          <p className="text-xl mb-6 text-black">Tem certeza de que deseja excluir sua conta?</p>
          <div className="flex space-x-4">
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg"
              onClick={handleDeleteAccount}
              disabled={deleting}
            >
              Excluir
            </button>
            <button
              className="bg-gray-500 hover-bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg"
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