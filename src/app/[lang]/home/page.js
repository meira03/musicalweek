"use client"
import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import BotaoEntrarSalaArtista from '../../../components/entrarSalaArtista/botaoEntrarSalaArtista';
import { fetchSalaData, fetchAlbumImages } from "@/utils/home";
import { getMusic } from "@/utils/spotify";

export default function SalaArtista() {
    const [cookies] = useCookies(['token']);
    const [salaData, setSalaData] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [albumImages, setAlbumImages] = useState({});
    const [isLoadingTopMusicas, setIsLoadingTopMusicas] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchSalaData(cookies);
                setSalaData(data);
                setLoading(false);
            } catch (error) {
                console.error('Erro ao buscar as salas do artista:', error);
                setSalaData([]);
                setLoading(false);
            }
        };

        fetchData();
    }, [cookies]);

    const fetchImages = async (idMusica) => {
        try {
            const trackInfo = await getMusic(idMusica);
            const imageUrl = trackInfo.album.images[0].url;
            return imageUrl;
        } catch (error) {
            console.error('Erro ao buscar imagens de álbuns:', error);
            return null;
        }
    };

    useEffect(() => {
        if (salaData && salaData.top_musicas) {
            setIsLoadingTopMusicas(true);
            const imagesPromises = salaData.top_musicas.map((idMusica) => fetchImages(idMusica));
            Promise.all(imagesPromises)
                .then((images) => {
                    const albumImageMapping = {};
                    salaData.top_musicas.forEach((idMusica, index) => {
                        albumImageMapping[idMusica] = images[index];
                    });
                    setAlbumImages(albumImageMapping);
                    setIsLoadingTopMusicas(false);
                });
        }
    }, [salaData]);

    return (
        <div>
            <h1 className="text-4xl font-bold mb-4 text-white">Salas dos Artistas</h1>
            {isLoading ? (
                <p className="text-white">Carregando informações das salas...</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {salaData && salaData.salas_artista && salaData.salas_artista.length > 0 ? (
                        salaData.salas_artista.map((sala, index) => (
                            <div
                                key={sala.id_sala}
                                className="bg-white rounded-lg overflow-hidden shadow-lg"
                            >
                                {sala.id_musica ? (
                                    <img
                                        src={albumImages[sala.id_musica]}
                                        alt={`Álbum da Música ${index}`}
                                        className="w-full h-40 object-cover"
                                    />
                                ) : (
                                    <p className="text-white">Nenhuma imagem disponível para esta sala.</p>
                                )}
                                <div className="p-6">
                                    <h2 className="text-2xl font-semibold mb-2">
                                        {sala.nome}
                                    </h2>
                                    <p>
                                        <span className="font-semibold">Nick:</span>{' '}
                                        {sala.nick}
                                    </p>
                                    {sala.participante != null && (
                                        <p>
                                            <span className="font-semibold">Participante:</span>{' '}
                                            {sala.participante ? 'Sim' : 'Não'}
                                        </p>
                                    )}
                                    <BotaoEntrarSalaArtista
                                        salaId={sala.id_sala}
                                        cookies={cookies}
                                    />
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-white">Nenhuma sala disponível para exibir.</p>
                    )}
                </div>
            )}
            <h1 className="text-4xl font-bold mb-4 text-white">Top 10 Músicas</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {isLoadingTopMusicas ? (
                    <p className="text-white">Carregando as informações das top 10 músicas...</p>
                ) : (
                    salaData && salaData.top_musicas && salaData.top_musicas.map((idMusica, index) => (
                        <div key={idMusica} className="bg-white rounded-lg overflow-hidden shadow-lg">
                            <img
                                src={albumImages[idMusica]}
                                alt={`Álbum da Música ${index}`}
                                className="w-full h-40 object-cover"
                            />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}