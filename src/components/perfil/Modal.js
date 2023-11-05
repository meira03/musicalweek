"use client"
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useCookies } from 'react-cookie';
import Modal from 'react-modal';
import { alterarPerfil } from '@/utils/user';


async function handleClick(data) {
    const propertyNames = Object.values(data);
    //console.log("URLL:" + propertyNames);

    const res = await alterarPerfil(data);
    console.log(res);
        if (res.sucesso === true){ 
            window.location.href = '/perfil'
            setShowConfirmationModal(false);
        }
        //else document.getElementById('search-error').innerHTML = res.error
}

Modal.setAppElement(null);

export default function ModalProfile(props) {
    const [cookies, setCookie] = useCookies(['token']);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [profilePics, setProfilePics] = useState([
        0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29
    ]);
    

    //console.log(profilePics);

    //console.log(props.perfil);
    return (
        <div>
            <button
                className={`bg-teal-500 hover:bg-teal-600 text-white rounded-lg px-4 py-2`}
                onClick={() => {
                                    setShowConfirmationModal(true);
                                }}
            >
                Alterar Foto de Perfil
            </button>
    
            <Modal
                isOpen={showConfirmationModal}
                onRequestClose={() => setShowConfirmationModal(false)}
                contentLabel="Escolha sua foto de perfil"
                ariaHideApp={false}
                className="modal fixed inset-0 flex items-center justify-center z-50"
                overlayClassName="modal-overlay fixed inset-0 bg-black"
            >
                <div className="bg-zinc-950 p-6 border border-gray-600 rounded-lg shadow-lg w-4/5 mx-auto flex flex-col items-center justify-center">
                    <h2 className="text-2xl font-semibold mb-6 text-black">Selecione a foto desejada</h2>
                    <div className='grid grid-cols-10 gap-3 mb-6 mx-5'>
                        {
                            profilePics.map((imageInfo, index) => (                            
                                <div key={index} className="relative">
                                    <button
                                        onClick={() => {
                                            var d = new Date(props.perfil.data_nasc);
                                            var date = [
                                                d.getFullYear(),
                                                ('0' + d.getDate()).slice(-2),
                                                ('0' + (d.getMonth() + 1)).slice(-2)
                                                
                                            ].join('-');                                        

                                            const data = {
                                                nome: props.perfil.nome,
                                                nick: props.perfil.nick,
                                                data_nasc: date,
                                                icon: "icone" + imageInfo + ".png"
                                            };
                                            handleClick(data);
                                        }}
                                    >
                                        <Image
                                            src={'/icones/icone' + imageInfo + ".png"}
                                            alt={imageInfo}

                                            width="125"
                                            height="0"
                                            className="rounded hover:opacity-40 border-solid border-2 mb-1 border-zinc-800 "
                                        />
                                    </button>
                                </div>
                        ))}
                        
                    </div>
                    <button
                        className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg"
                        onClick={() => setShowConfirmationModal(false)}
                    >
                        Cancelar
                    </button>
                </div>
            </Modal>
        </div>
    );
}