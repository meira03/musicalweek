import { useState, useEffect } from 'react'
import { useRouter } from "next/router";

function Musica() {
  const router = useRouter();
  const { id } = router.query;

  const [musica, setMusica] = useState("")
  const [idbanco, setIdBanco] = useState("")
  useEffect(() => {
    fetch('https://musicalweek-api.azurewebsites.net/insertTrack.php?q=' + id)
      .then((res) => res.json())
      .then((dados) => {
        if(dados != undefined){
          setMusica(dados.musica);
          setIdBanco(dados.id_banco);
        }
      })
  }, [])
      
  return <p>{musica} {idbanco}</p>
}

export default Musica;
