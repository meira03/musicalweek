"use client";

import { useState } from "react";

export const Button = (props) => {
    function sairSala(id_sala) {
        console.log("apertou");
        console.log("ID DA SALA: " + id_sala)
        let res = sairSalaArtista(id_sala)
        console.log(res);
        if (res === "sucesso") {
            redirect('/salas');
        }
    }
    return (
        <main>
            <button
                className="absolute right-4 bg-red-500 hover:bg-red-600 px-2 py-2"
                onClick={sairSala(props.id)}
            >
                <p>Remova a sala da sua lista </p>
            </button>
        </main>
    );
};

<button
    className="absolute right-4 bg-red-500 hover:bg-red-600 px-2 py-2"
    onClick={sairSala()}
>
    <p>Remova a sala da sua lista </p>
</button>