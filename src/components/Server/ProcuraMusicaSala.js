import { cookies } from 'next/headers';
import { procuraMusica, procuraMusicaSala, procuraSala } from "../../lib/fetch";
import Sala from '@/components/Sala/Sala.js'
import SalaEspera from '@/components/SalaEspera/SalaEspera.js'

export default async function ProcuraMusicaSala({ id_musica_sala }) {
  const cookieStore = cookies();
  const id_usuario = cookieStore.get('id').value;

  const sala = await procuraMusicaSala(id_musica_sala);
  
  if (sala.sala != null) {
    return (
      <>
      <Sala sala={sala} id_usuario={id_usuario} />
      </>
    );
  }
  
  return <SalaEspera musica={await procuraMusica(sala.musica)}  />;
}
