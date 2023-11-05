"use client";
import { useContext } from 'react';
import myContext from '@/app/[lang]/artista/search/context/context';

export default function ArtistaSubmit() {
    return <></>;
    const { imageUrls } = useContext(myContext);

    // async function handleEnviarMusicas() {
    //     const musicasSelecionadas = imageUrls.map(imageInfo => imageInfo[0]);
    
    //     if (musicasSelecionadas.length === 7) {
    //         const url = 'https://musicalweek-api.azurewebsites.net/endpoints/sala/artista/index.php';
    //         const token = cookies.token; 
    //         if (token) {
    //             try {
    //                 const response = await fetch(url, {
    //                     method: 'POST',
    //                     headers: {
    //                         'Content-Type': 'application/json',
    //                         'Authorization': `Bearer ${token}`,
    //                     },
    //                     body: JSON.stringify({
    //                         musicas: musicasSelecionadas,
    //                     }),
    //                 });
    //                 console.log(musicasSelecionadas);
    //                 if (response.ok) {
    //                     console.log('Requisição enviada com Sucesso!');
    //                     setModalIsOpen(true);
    //                 } else {
    //                     console.error('Erro na solicitação:', response.statusText);
    //                 }
    //             } catch (error) {
    //                 console.error('Erro na solicitação:', error);
    //             }
    //         }
    //     } else {
    //         console.error('Você deve selecionar 7 músicas para enviar.');
    //     }
    // }

    return (
        <button className={"uppercase text-xl text-white w-full py-2 text-center " + (imageUrls.length === 7 ? "bg-neon-blue-200" : "bg-zinc-700 opacity-60")}>
            Começar Sala
        </button>
    );
}