"use client"
import { useState } from 'react';
import Image from 'next/image';
import Modal from 'react-modal';
import { alterarIcone, alterarPerfil } from '@/utils/user';


async function handleClick(imageInfo) {
    console.log("IMAGEINFO:" + imageInfo);
    //const token = session.token || null;

    const res = await alterarIcone(imageInfo);
    console.log(res.sucesso);
    window.location.href = '/perfil';
    //     if (res.sucesso === true){ 
    //         window.location.href = '/perfil'
    //         setShowConfirmationModal(false);
    //     }
    //     //else document.getElementById('search-error').innerHTML = res.error
}

Modal.setAppElement(null);

export default function ModalProfile(props) {
    
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [imageHover, setImageHover] = useState(false);
    const [profilePics, setProfilePics] = useState([
        0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29
    ]);

    function onHover(){
        setImageHover(true);
    }

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

    //console.log(profilePics);

    //console.log(props.perfil);
    return (
        <div>
            <button
                onClick={() => {
                    setShowConfirmationModal(true);
                }}
                
                className='relative flex items-center justify-center text-white'
            >
                {imageHover && 
                    <p className='absolute mb-1 hover:text-white'>Editar ícone</p>
                }
                <Image
                    src={"/icones/" + props.perfil.icon}
                    alt={"Icone"}
                    height={0}
                    width={0}
                    sizes="100vw"
                    className="object-cover rounded-full hover:opacity-50 w-auto h-64 sm:h-80 xl:h-48 "
                    onMouseEnter={() => {
                        setImageHover(true);
                    }}
                    onMouseLeave={() => {
                        setImageHover(false);
                    }}
                    //onMouseOver={onHover()}
                />
            </button>
    
            <Modal
                isOpen={showConfirmationModal}
                onRequestClose={() => setShowConfirmationModal(false)}
                contentLabel="Escolha sua foto de perfil"
                ariaHideApp={false}
                className="modal static inset-0 flex items-center justify-center z-50 m-auto "
                overlayClassName="modal-overlay absolute inset-0 bg-black overflow-auto"
            >
                <div className='h-screen left-0 right-0 top-0 flex absolute justify-center items-center'>

                    <div className="bg-zinc-950 p-6 border border-gray-600 shadow-lg px-5 mx-auto flex flex-col items-center justify-center align-middle">
                        <h2 className="text-2xl font-semibold mb-6 text-black">Selecione a foto desejada</h2>
                        <div className='grid 
                                            grid-cols-2 gap-3
                                            sm:grid-cols-3 sm:gap-3
                                            lg:grid-cols-6 lg:gap-3 lg:mb-6 lg:mx-5
                                            xl:grid-cols-10 xl:gap-3 xl:mb-6 xl:mx-5
                                        '>
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

                                                // const data = {
                                                //     nome: props.perfil.nome,
                                                //     nick: props.perfil.nick,
                                                //     data_nasc: date,
                                                //     icon: "icone" + imageInfo + ".png"
                                                // };
                                                const data = {
                                                    icon: "icone" + imageInfo + ".png"
                                                };
                                                
                                                handleClick(imageInfo);
                                            }}
                                        >
                                            <Image
                                                src={'/icones/icone' + imageInfo + ".png"}
                                                alt={imageInfo}
                                                height={0}
                                                width={0}
                                                sizes="100vw"
                                                className=" hover:opacity-40 border-solid border-2 mb-1 border-zinc-800 w-full h-34 sm:h-40 md:h-52 lg:h-28 xl:h-24 2xl:h-48"
                                            />
                                        </button>
                                    </div>
                            ))}
                            
                        </div>
                        <button
                            className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-6"
                            onClick={() => setShowConfirmationModal(false)}
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
