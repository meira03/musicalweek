"use client"
import { useState, useEffect } from 'react';
import Image from "next/image";
import { useCookies } from 'react-cookie';
import Modal from 'react-modal';

import perfil from './profilePics/perfilzada.png';
import bolsobreck from './profilePics/bolsobreck.jpg';
import indioEmo from './profilePics/emo_indio_bombado.jpg';
import bomDia from './profilePics/bomdiamor.png';
import shock from './profilePics/static_shock.jpg';
import { alterarPerfil } from '@/utils/user';


async function handleClick(data) {
    const propertyNames = Object.values(data);
    console.log("URLL:" + propertyNames);

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
        perfil,
        bolsobreck,
        indioEmo,
        bomDia,
        shock]);

    //console.log(props.perfil);
    return (
        <div>
            <button
                className={`bg-teal-500 hover:bg-teal-600 text-white rounded-lg px-4 py-2`}
                onClick={() => setShowConfirmationModal(true)}
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
                    <div className='grid grid-cols-5 gap-7 mb-6 mx-5'>
                        {profilePics.map((imageInfo, index) => (                            
                            <div key={index} className="relative">
                                <button
                                    onClick={() => {
                                        console.log("BANCO:" + Object.values(props.perfil))
                                        const url = Object.values(imageInfo);
                                        console.log("CLIQUE:" + url);

                                        var d = new Date(props.perfil.data_nasc);
                                        var date = [
                                            d.getFullYear(),
                                            ('0' + (d.getMonth() + 1)).slice(-2),
                                            ('0' + d.getDate()).slice(-2)
                                        ].join('-');
                                        //var date = Date.parse(props.perfil.data_nasc); 

                                        const data = {
                                            nome: props.perfil.nome,
                                            nick: props.perfil.nick,
                                            data_nasc: date,
                                            icon: imageInfo.src
                                        };
                                        handleClick(data);
                                    }}
                                >
                                    <Image
                                        src={imageInfo}
                                        alt={index}

                                        width="400"
                                        height="0"
                                        className="rounded hover:opacity-40"
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