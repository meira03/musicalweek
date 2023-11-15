"use client";
import { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { getMusic } from "@/utils/spotify";

import "@/styles/home/ArtistasCarrossel.css"

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import Link from "next/link";

const ArtistasCarrossel = ({ salas_artista, dict }) => {
  const [index, setIndex] = useState(0);
  const [salaData, setSalaData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      const promisses = salas_artista.map((sala) => getMusic(sala.id_musica));
      Promise.all(promisses).then((musica) => {
        const albumImageMapping = [];
        salas_artista.forEach((sala, index) => {
          albumImageMapping.push({
            nick: sala.nick,
            id_sala: sala.id_sala,
            img_musica: musica[index].album.images[0].url,
            musica: musica[index].name,
          });
        });
        setSalaData(albumImageMapping);
        setLoading(false);
      });
    }
  }, [salaData]);

  if (isLoading) {
    return <>Carregando...</>;
  } else {
    return (
      <>
        <Swiper
          slidesPerView={1}
          breakpoints={{
            500: {
              slidesPerView: 3
            }
          }}
          spaceBetween={30}
          onSlideChange={(swiper) => { setIndex(swiper.activeIndex) }}
          centeredSlides={true}
          navigation={true}
          modules={[Navigation]}
          className="swiperArtistas h-full max-w-6xl"
        >
          {salaData.map((i, key) => (
            <SwiperSlide key={key} className="flex justify-center items-center">
              <Link
                href={`/artista/sala/${i.id_sala}/7`}
                className="w-64 h-64 sm:w-80 sm:h-80 border border-neon-blue-200 flex justify-center items-center">
                <Image
                  src={i.img_musica}
                  alt={i.musica}
                  width={600}
                  height={600}
                  className="h-60 !w-60 sm:h-72 sm:!w-72"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        <h2 className="text-3xl uppercase text-center mt-4 mb-10">{dict.escolhas} {salaData[index].nick}</h2>
      </>
    );
  }
};

export default ArtistasCarrossel;
