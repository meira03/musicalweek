"use client"
import { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import { geraAvaliacao } from "@/lib/fetch";

const StarRating = ({ nota_usuario, id_musica_sala, id_usuario, media }) => {
  const [highlightedStars, setHighlightedStars] = useState(0);
  const [selectedStars, setSelectedStars] = useState(0);
  const [rating, setRating] = useState("Avalie a Música!");
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    if (nota_usuario && nota_usuario >= 1 && nota_usuario <= 5) {
      setHighlightedStars(nota_usuario);
      setSelectedStars(nota_usuario);
      renderRatingText(parseInt(nota_usuario));
      setIsLocked(true);
    }
  }, [nota_usuario]);

  const handleStarHover = (hovered) => {
    if (!isLocked) {
      setHighlightedStars(hovered);
      renderRatingText(hovered);
    }
  };

  const handleStarClick = (selected) => {
    if (!isLocked) {
      setSelectedStars(selected);
      setIsLocked(true);
      document.getElementById('media_musica').classList.remove('hidden')
      geraAvaliacao(selected, id_musica_sala, id_usuario);
    }
  };

  const renderRatingText = (value) => {
    switch (value) {
      case 1:
        setRating('Muito Ruim');
        break;
      case 2:
        setRating('Ruim');
        break;
      case 3:
        setRating('Ok');
        break;
      case 4:
        setRating('Bom');
        break;
      case 5:
        setRating('Excelente!');
        break;
      default:
        setRating('Avalie a Música!');
    }
  };

  return (
    <>
      <div id="media_musica" className='text-3xl min-h-[36px] mb-5 hidden text-black dark:text-white text-center'>{"Média da Música: " + media}</div>
      <div className='grid grid-cols-5'>
        {[...Array(5)].map((_, index) => (
          <FaStar
            key={index}
            className={`cursor-pointer text-7xl px-1 ${
              (index + 1 <= highlightedStars || index + 1 <= selectedStars)
                ? 'text-blue-500'
                : 'text-gray-300 dark:text-zinc-700'
            }`}
            onMouseEnter={() => handleStarHover(index + 1)}
            onMouseLeave={() => handleStarHover(0)}
            onClick={() => handleStarClick(index + 1)}
            style={{ pointerEvents: isLocked ? 'none' : 'auto' }}
          />
        ))}
      </div>
      <div className='text-3xl min-h-[36px] mt-5 text-black dark:text-white text-center'>{rating}</div>
    </>
  );
};

export default StarRating;
