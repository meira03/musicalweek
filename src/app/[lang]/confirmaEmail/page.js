"use client"
import React from 'react';

const EmailConfirmed = () => {
  const redirectToHome = () => {
    window.location.href = '/home';
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-white">
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-4xl font-semibold mb-6">Email Confirmado com Sucesso!</h1>
        <p className="text-lg font-semibold mb-8">
          Seu email foi confirmado com sucesso! Você agora pode aproveitar os recursos da nossa aplicação.
        </p>
        <button
          className="bg-teal-500 hover-bg-teal-600 text-white font-xbold py-3 px-20 rounded-lg text-xl"
          onClick={redirectToHome}
        >
          Ir para a página inicial
        </button>
      </div>
    </div>
  );
};

export default EmailConfirmed;
