"use client";

import { useSession } from "next-auth/react";

export default function EscolherPlano({plano, active, handleClick}) {
  const { data: session, status, update } = useSession()
  async function clickEvent() {
    await handleClick(plano)
    update({plano: 3})
    document.getElementsByClassName('button-active')[0].innerHTML = "Escolher Plano" 
    document.getElementsByClassName('button-active')[1].innerHTML = "Escolher Plano" 
    document.getElementsByClassName('button-active')[2].innerHTML = "Escolher Plano" 
    document.getElementsByClassName('button-active')[plano].innerHTML = "Plano Atual" 
  }
  return (
    <button
      className={`bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 mt-4 button-active`}
      onClick={() => {
        clickEvent(plano)
        console.log(session)
      }}
    >
      {active ? "Plano Atual" : "Escolher Plano"}
    </button>
  );
}
