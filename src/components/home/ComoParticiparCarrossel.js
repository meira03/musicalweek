"use client";
import { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from 'swiper/modules';

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

const ComoParticiparCarrossel = () => {
  return (
    <Swiper navigation={true} modules={[Navigation]} className="mySwiper h-full">
      <SwiperSlide className="h-full w-full flex justify-center items-center px-12">
        <div className="uppercase text-center text-3xl">
          selecione uma música para compartilhar
        </div>
      </SwiperSlide>
      <SwiperSlide className="h-full w-full flex justify-center items-center px-12">
        <div className="uppercase text-center text-3xl">
          aguarde outros usuários
        </div>
      </SwiperSlide>
      <SwiperSlide className="h-full w-full flex justify-center items-center px-12">
        <div className="uppercase text-center text-3xl">
          conheça novas músicas
        </div>
      </SwiperSlide>
    </Swiper>
  );
};
export default ComoParticiparCarrossel;
