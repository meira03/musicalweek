"use client";
import React from 'react';
import { getSession } from 'next-auth/react';
import { authOption } from "@/app/api/auth/[...nextauth]/route";

const BotaoEntrarSalaArtista = ({ salaId }) => {
    const cookies = getSession(authOption);
    const handleEntrarSala = async () => {
        console.log('Sala ID:', salaId);

        if (cookies.token) {
            const url = 'https://musicalweek-api.azurewebsites.net/endpoints/sala/artista/index.php';
            const data = { "id_sala": salaId };
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${cookies.token}`
                    },
                    body: JSON.stringify(data),
                });

                if (response.ok) {
                    const responseData = await response.json();
                    if (responseData.success) {
                        console.log('Usuário entrou na sala com sucesso!');
                    } else {
                        console.error('Erro ao entrar na sala do artista:', responseData.message);
                    }
                } else {
                    console.error('Erro ao entrar na sala do artista:', response.statusText);
                }
            } catch (error) {
                console.error('Erro ao entrar na sala do artista:', error);
            }
            window.location.reload();
        } else {
            window.location.href = '/login';
            console.log('Redirecionando para a página de login...');
        }
    };

    return (
        <div>
            <button onClick={handleEntrarSala} className="bg-green-500 hover.bg-green-700 text-white font-bold py-2 px-4 rounded-full">
                Entrar na Sala do Artista
            </button>
        </div>
    );
};

export default BotaoEntrarSalaArtista;




