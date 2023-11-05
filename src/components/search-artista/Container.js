"use client";
import { useState } from 'react';
import Image from "next/image";
import { Music } from "@/components/search-artista/Music";
import { useContext } from 'react';
import myContext from '@/app/[lang]/search-artista/context/context';
import { useCookies } from 'react-cookie';
import Modal from 'react-modal';

export default function Container({ searchTerm }) {
    const { imageUrls, setImageUrls, removeImage } = useContext(myContext);
    const [isMusicSelected, setIsMusicSelected] = useState(false);
    const [allMusicSelected, setAllMusicSelected] = useState(false);
    const [cookies] = useCookies(['token']);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    async function handleEnviarMusicas() {
        const musicasSelecionadas = imageUrls.map(imageInfo => imageInfo[0]);
    
        if (musicasSelecionadas.length === 7) {
            const url = 'https://musicalweek-api.azurewebsites.net/endpoints/sala/artista/index.php';
            const token = cookies.token; // Obtenha o token do array de cookies
            console.log(token);
            if (token) {
                try {
                    const response = await fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        },
                        body: JSON.stringify({
                            musicas: musicasSelecionadas,
                        }),
                    });
                    console.log(musicasSelecionadas);
                    if (response.ok) {
                        console.log('Requisição enviada com Sucesso!');
                        setModalIsOpen(true);
                    } else {
                        // Trate qualquer erro na resposta da API.
                        console.error('Erro na solicitação:', response.statusText);
                    }
                } catch (error) {
                    // Trate erros de rede ou outras exceções.
                    console.error('Erro na solicitação:', error);
                }
            }
        } else {
            // Trate o caso em que nem todas as 7 músicas foram selecionadas.
            console.error('Você deve selecionar 7 músicas para enviar.');
        }
    }    

    // Função para adicionar uma música à lista
    async function handleClick(id_musica, nome_musica, nome_artista, imagem_album) {
        setIsMusicSelected(false);
    
        if (imageUrls.length >= 7) {
            // Defina um estado para indicar que as 7 músicas foram selecionadas
            setAllMusicSelected(true);
            return; // Impede a adição de mais músicas
        }
    
        // Verifica se o ID da música já existe na lista
        if (imageUrls.some((imageInfo) => imageInfo[0] === id_musica)) {
            setIsMusicSelected(true);
            return; // Impede a adição de músicas duplicadas
        }
    
        setImageUrls((previousState) => {
            return [...previousState, [id_musica, nome_musica, imagem_album, nome_artista]]
        });
    }

    // Função para remover uma música da lista
    function handleRemoveClick(id) {
        setIsMusicSelected(false);
        setImageUrls(imageUrls.filter(imageInfo => imageInfo[0] !== id));
    }

    async function handleSubmit() {
        console.log(imageUrls[0])
        return;
    }

    return (
        <>
            <h1>
                Adicione 7 músicas diferentes para prosseguir
            </h1>
            <div className='grid grid-cols-7 gap-7 my-10 mx-10'>
            {imageUrls.map((imageInfo, index) => (
                <div key={index} className="relative">
                    <Image
                        src={imageInfo[2]}
                        alt={`Imagem ${index}`}
                        width="400"
                        height="0"
                        className="rounded-md"
                    />
                    <button
                        onClick={() => handleRemoveClick(imageInfo[0])}
                        className="dark:bg-zinc-700 hover:bg-zinc-200 text-white rounded-full w-6 h-6 flex justify-center items-center cursor-pointer absolute top-2 right-2"
                    >
                    x
                    </button>
                    <div className="mt-2">
                    <span className="font-semibold dark:text-white truncate text-elipsis block">
                        {imageInfo[1]}
                    </span>
                    <span className="font-semibold text-sm dark:text-zinc-300 truncate text-elipsis block">
                        {imageInfo[3]}
                    </span>
                </div>
                </div>
                ))}
            </div>
            {isMusicSelected && (
                    <div className="text-red-400 text-sm">
                        Você está tentando inserir uma música que já foi adicionada! Por favor, escolha outra.
                    </div>
                )}
            {imageUrls.length === 7 && (
            <div className="my-4">
                <button onClick={handleEnviarMusicas} className="bg-blue-500 text-white rounded-md px-4 py-2">
                Enviar Músicas
                </button>
            </div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
                {searchTerm &&
                    searchTerm.tracks.items.map((track) => (
                        <div
                            onClick={() => {
                                handleClick(track.id, track.name, track.artists[0].name, track.album.images[0].url);
                            }}
                        >
                            <Music track={track} key={track.id} />
                        </div>
                    ))}
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Modal de Sucesso"
                ariaHideApp={false}
                className="modal fixed inset-0 flex items-center justify-center z-50"
                overlayClassName="modal-overlay fixed inset-0 bg-black-900"
            >
                <div className="bg-white p-8 rounded-lg shadow-lg w-1/2 h-1/2 mx-auto flex flex-col items-center justify-center">
                    <h2 className="text-4xl font-semibold mb-10 text-black-900">Parabéns</h2>
                    <p className="text-2xl mb-10 text-black-900">Sua sala foi criada com sucesso!</p>
                    <button
                        className="bg-teal-500 hover:bg-teal-600 text-white font-xbold py-3 px-20 rounded-lg text-xl"
                        onClick={() => {
                            setModalIsOpen(false);
                            window.location.href = '/home';
                        }
                        }
                    >
                        OK
                    </button>
                </div>
            </Modal>
        </>
    );
}
