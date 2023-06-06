import { cookies } from 'next/headers';
import { procuraMusica, procuraMusicaSala, procuraSala, procuraGenero } from "../../lib/fetch";
import Sala from '@/components/Sala/Sala.js'
import SalaEspera from '@/components/SalaEspera/SalaEspera.js'
import Contador from "@/components/Contador/Contador.js";

export default async function ProcuraMusicaSala({ id_musica_sala }) {
  const cookieStore = cookies();
  const id_usuario = cookieStore.get('id').value;

  const sala = await procuraMusicaSala(id_musica_sala);
  
  if (sala.sala != null) {
    return (
      <>
      <Sala sala={sala} id_usuario={id_usuario} />
      {/* <Contador className="text-black dark:text-white text-3xl absolute top-4 right-4" targetDate={sala.tempo_restante}/> */}
      </>
    );
  }
  
  return <SalaEspera genero={sala.genero} musica={await procuraMusica(sala.musica)}  />;
}
