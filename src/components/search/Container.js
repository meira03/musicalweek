"use client";
import { useState, useContext } from 'react';
import { Music } from "@/components/search/Music";
import myContext from '@/app/[lang]/(protected)/artista/search/context/context';
import Modal from 'react-modal';
import { FaXmark } from 'react-icons/fa6';

export default function Container({ searchTerm }) {
    const { imageUrls, setImageUrls, removeImage } = useContext(myContext);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    async function handleClick(id_musica, key) {
        document.getElementById("search-error").innerHTML = ""
        
        if (imageUrls.length >= 7) {
            document.getElementById("search-error").innerHTML = "Você só pode inserir 7 músicas em uma sala"
            return
        }

        if (imageUrls.some((imageInfo) => imageInfo[0] === id_musica)) {
            document.getElementById("search-error").innerHTML = "Você está tentando inserir uma música que já foi adicionada! Por favor, escolha outra."
            return;
        }

        setImageUrls((previousState) => {
            return [...previousState, [id_musica, searchTerm.tracks.items[key]]]
        });
    }

    function handleRemoveClick(id) {
        setImageUrls(imageUrls.filter(imageInfo => imageInfo[0] !== id));
    }

    return (
        <>  
            <div className='grid grid-cols-3 sm:grid-cols-7 gap-7 my-5 w-full'>
            {imageUrls.map((imageInfo, index) => (
                <div key={index} className="relative">
                    <Music track={imageInfo[1]} click={false} />
                    <FaXmark 
                    className="bg-black-900 bg-opacity-70 text-lg text-red-600 rounded-full cursor-pointer absolute top-2 right-2"
                    onClick={() => {
                        document.getElementById("search-error").innerHTML = ""
                        handleRemoveClick(imageInfo[0])
                    }} />
                </div>
                ))}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 sm:grid-cols-6 gap-4 w-full">
                {searchTerm &&
                    searchTerm.tracks.items.map((track, key) => (
                        <div
                            onClick={() => {
                                handleClick(track.id, key);
                            }}
                        >
                            <Music track={track} key={track.id} click={false} />
                        </div>
                    ))}
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Modal de Sucesso"
                ariaHideApp={false}
                className="modal fixed inset-0 flex items-center justify-center z-50"
                overlayClassName="modal-overlay fixed inset-0 bg-black"
            >
                <div className="bg-white p-8 rounded-lg shadow-lg w-1/2 h-1/2 mx-auto flex flex-col items-center justify-center">
                    <h2 className="text-4xl font-semibold mb-10 text-black">Parabéns</h2>
                    <p className="text-2xl mb-10 text-black">Sua sala foi criada com sucesso!</p>
                    <button
                        className="bg-neon-blue-200 hover:bg-neon-blue-300 text-white font-bold py-3 px-20 rounded-lg text-xl"
                        onClick={() => setModalIsOpen(false)}
                    >
                        OK
                    </button>
                </div>
            </Modal>
        </>
    );
}