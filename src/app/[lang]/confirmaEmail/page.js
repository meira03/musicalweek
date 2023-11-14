"use client"
import React from 'react';

const EmailConfirmed = () => {
  const redirectToHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-white">
      <div className="container mx-auto p-8 text-center">
        <h1 className="flex justify-center neon-text text-4xl uppercase font-semibold mb-32">Confirmação de E-mail</h1>
        <p className="text-2xl font-semibold mb-32 text-white">
          Seu email foi confirmado com sucesso!
        </p>
        <button
          className="bg-black-100 dark:bg-black-300 border-2 border-neon-blue-300 text-white hover:text-gray-400 font-bold py-2 px-4 focus:outline-none focus:shadow-outline w-full font-family:tech"
          onClick={redirectToHome}
        >
          Ir para a página inicial
        </button>
      </div>
    </div>
  );
};

export default EmailConfirmed;
