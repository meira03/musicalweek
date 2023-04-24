import { useState, useEffect } from 'react'
import Link from 'next/link'

function Home() {
  const [dados, setDados] = useState(null)
  const [search, setSearch] = useState("")
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:8000/searchTrack?q=' + search)
      .then((res) => res.json())
      .then((dados) => {
        if(dados.tracks != undefined){
          setDados(dados.tracks)
          setLoading(false)
        }
      })
  }, [search])

  return (
    <>
    <input type='text' onKeyUp={e => setSearch(e.target.value)}/>    
    <div>
      {!isLoading && search != "" && dados.items.map((music) => (
        <Link
          href={{
            pathname: '/upload',
            query: { id: music.id },
          }}
        >
          <h1>{music.name}</h1>
        </Link>
      ))} 
    </div>
    </>
  )
}

export default Home;
