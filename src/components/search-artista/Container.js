"use client";
import { useState } from 'react';
import Image from "next/image";
import { Music } from "@/components/search-artista/Music";
import { useEffect } from 'react';
import { useContext } from 'react';
import myContext from '@/app/[lang]/search-artista/context/context';

export default function Container({ searchTerm }) {
    const { imageUrls, setImageUrls, removeImage } = useContext(myContext);
    const [isMusicSelected, setIsMusicSelected] = useState(false);

    // Função para adicionar uma música à lista
    async function handleClick(id_musica, nome_musica, nome_artista, imagem_album) {
        setIsMusicSelected(false);
        
        if (imageUrls.length >= 7) {
            return;
        }

        // Verifica se o ID da música já existe na lista
        if (imageUrls.some((imageInfo) => imageInfo[0] === id_musica)) {
            setIsMusicSelected(true);
            return; 
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
                <button  
                    className='px-20 py-3 bg-zinc-200 rounded-md mb-10 hover:dark:bg-zinc-700'
                    onSubmit={handleSubmit()}
                >
                    <p className='text-zinc-800'>Enviar</p>
                </button>
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
        </>
    );
}