"use client";
import { useState, useEffect } from "react";
import { getMusic } from "@/utils/spotify";
import { FaChevronDown } from "react-icons/fa6";
import { Pontuacao } from "@/components/Pontuacao";

export const ArtistaMusicaResumo = ({ musica, data_criacao }) => {
  const [expanded, setExpanded] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getMusic(musica.id_musica);

        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  function expandCard() {
    setExpanded(!expanded);
  }

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>Ocorreu um erro: {error.message}</p>;
  }

  return (
    <div>
      <div
        className="border border-neon-blue-200 relative pr-10"
        style={{
          backgroundImage: `url(${data.album.images[0].url})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div
          onClick={expandCard}
          className="h-full w-10 absolute right-0 top-0 bg-neon-blue-200 flex items-center justify-center text-3xl cursor-pointer"
        >
          <FaChevronDown
            className={"transition-all " + (expanded ? "" : "rotate-90")}
          />
        </div>

        <div
          className="bg-black-900 bg-opacity-70 grid grid-cols-3 gap-2 px-3"
          style={{
            backdropFilter: !musica.exibida ? "grayscale(1)" : "",
          }}
        >
          <div className="text-center flex justify-center items-center pr-2">
            <span className="neon-text text-xl sm:text-3xl tracking-widest">
              {data_criacao}
            </span>
          </div>
          <div className="col-span-2 py-2">
            <h3 className="max-w-full text-right truncate text-elipsis">
              {data.name}
            </h3>
            <h4 className="max-w-full text-right text-xs truncate text-elipsis text-zinc-400">
              {data.artists[0].name}
            </h4>
          </div>
        </div>
      </div>
      <div
        className={
          "relative bottom-0 border-t-0 border border-neon-blue-100 bg-black-0 justify-evenly items-center py-4 " +
          (expanded ? "flex" : "hidden")
        }
      >
        {musica.nota_calculada != null && (
          <div className="flex flex-col items-center justify-center">
            <span className="text-sm uppercase text-center mb-2">
              Pontuação
            </span>
            <span className="text-6xl">
              <Pontuacao pontuacao={musica.nota_calculada} />
            </span>
          </div>
        )}
        <div className="flex flex-col items-center justify-center">
          <span className="text-sm uppercase text-center mb-2">Avaliações</span>
          <span className="text-6xl neon-text">{musica.avaliacoes}</span>
        </div>
      </div>
    </div>
  );
};
