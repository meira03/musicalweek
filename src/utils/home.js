"use server"
import { getServerSession } from "next-auth";
import { authOption } from "@/app/api/auth/[...nextauth]/route";

export const fetchSalaData = async () => {
  const session = await getServerSession(authOption)
  try {
        const url = 'https://musicalweek-api.azurewebsites.net/endpoints/home/index.php';
        const headers = {};

        if (session) {
            headers['Authorization'] = `Bearer ${session.token}`;
        }

        const response = await fetch(url, { method: 'GET', headers , cache: "no-store"});

        if (response.ok) {
            const data = await response.json();
            if (!session) {
                // Quando não há token, ajuste os dados, se necessário
                if (data.salas_artista && Array.isArray(data.salas_artista)) {
                    data.salas_artista = data.salas_artista.map((sala) => {
                        const { participante, ...rest } = sala;
                        return rest;
                    });
                }
            }
            return data;
        } else {
            console.error('Erro na requisição:', response.statusText);
            return null;
        }
    } catch (error) {
        console.error('Erro ao buscar as salas do artista:', error);
        return null;
    }
};