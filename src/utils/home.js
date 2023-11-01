"use server"
export const fetchSalaData = async (cookies) => {
    try {
        const url = 'https://musicalweek-api.azurewebsites.net/endpoints/home/index.php';
        const headers = {};

        if (cookies && cookies.token) {
            headers['Authorization'] = `Bearer ${cookies.token}`;
        }

        const response = await fetch(url, { method: 'GET', headers , cache: "no-store"});

        if (response.ok) {
            const data = await response.json();
            if (!cookies || !cookies.token) {
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

