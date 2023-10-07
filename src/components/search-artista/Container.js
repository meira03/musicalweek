"use client"
import { useState } from 'react';
import Image from "next/image";

import teste from "@/components/search-artista/perfilzada.png";

import { Music } from "@/components/search-artista/Music";
import { useEffect } from 'react';
import { useContext } from 'react';
import myContext from '@/app/[lang]/search-artista/context/context';

export default function Container({ searchTerm }) {

    //const [imageUrls, setImageUrls] = useState([]);
    const { imageUrls, setImageUrls } = useContext(myContext);

    async function handleClick(id_musica, nome_musica, nome_artista, imagem_album) {

        if (imageUrls.length >= 7) {
            return;
        }

        setImageUrls((previousState) => {
            //console.log(imagem_album)
            return [...previousState, [id_musica, nome_musica, imagem_album, nome_artista]]
            //previousState.push([id_musica, nome_musica, nome_artista,imagem_album])
        });
    }

    async function handleSubmit(){
        console.log(imageUrls[0])
        return;
    }


    return (
        <>
            <div className='grid grid-cols-7 gap-7 my-10 mx-10'>
                {imageUrls.map((imageInfo, index) => (
                    <div key={index}>
                        <Image
                            src={imageInfo[2]}
                            alt={`Imagem ${index}`}
                            width="400"
                            height="0"
                            className="rounded-md"
                        />
                        <span className="font-semibold dark:text-white truncate text-elipsis block">
                            {imageInfo[1]}
                        </span>
                        <span className="font-semibold text-sm dark:text-zinc-300 truncate text-elipsis block">
                            {imageInfo[3]}
                        </span>
                    </div>
                ))}
            </div>
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