"use client";

import { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { MusicSlider } from "@/components/room/MusicSlider";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

export const CarrousselRoom = ({ musics }) => {
  const [slideIndex, setSlideIndex] = useState(musics.length - 1);
console.log(musics)
  function handleChangeSlide() {
    const key = document.getElementsByClassName('swiper-slide-active')[0].dataset.key;

    setSlideIndex(key);
  }
  return (
    <main>
      <Swiper
        breakpoints={{
          0: {
            slidesPerView: 2,
          },
          640: {
            slidesPerView: 5,
          },
        }}
        initialSlide={slideIndex}
        centeredSlides={true}
        spaceBetween={20}
        className="mySwiper w-full h-[65vw] sm:h-[25vw] flex mt-10 mb-5"
        onSlideChangeTransitionEnd={handleChangeSlide}
      >
        {musics.map((music, key) => (
          <SwiperSlide key={key} data-key={key}>
            <img src={music.img} alt={music.name} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="text-center">
        <h2 className="text-xl white-text">{musics[slideIndex].name}</h2>
        <span className="text-lg text-zinc-600">{musics[slideIndex].artist}</span>
      </div>
      <MusicSlider key={slideIndex} userRating={musics[slideIndex].nota_usuario == null ? 0 : musics[slideIndex].nota_usuario}/>
    </main>
  );
};