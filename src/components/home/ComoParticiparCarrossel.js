"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const ComoParticiparCarrossel = () => {
  return (
    <>
      <div className="hidden sm:grid grid-cols-3 gap-8 max-w-5xl mx-auto my-10">
        <div className="flex flex-col items-center border border-neon-blue-200 px-2">
          <Image src={"/images/passo1.png"} alt="Passo 1" className="my-5" height={100} width={100} />
          <h1 className="text-center uppercase text-3xl neon-text">PASSO 1</h1>
          <p className="text-center uppercase text-xl flex justify-center items-center my-5">
            Escolha uma música <br /> para participar <br /> de uma sala
          </p>
        </div>
        <div className="flex flex-col items-center border border-neon-blue-200 px-2">
          <Image src={"/images/passo2.png"} alt="Passo 2" className="my-5" height={100} width={100} />
          <h1 className="text-center uppercase text-3xl neon-text">PASSO 2</h1>
          <p className="text-center uppercase text-xl flex justify-center items-center my-5">
            Aguarde outros <br /> usuários entrarem <br /> na sala
          </p>
        </div>
        <div className="flex flex-col items-center border border-neon-blue-200 px-2">
          <div className="relative">
            <Image src={"/images/passo3.png"} alt="Passo 3" className="my-5" height={100} width={100} />
            <Image src={"/images/click.png"} alt="Click" className="absolute top-16 right-0" height={50} width={50} />
          </div>
          <h1 className="text-center uppercase text-3xl neon-text">PASSO 3</h1>
          <p className="text-center uppercase text-xl flex justify-center items-center my-5">
            ouça e avalie<br /> as músicas <br />diariamente
          </p>
        </div>
      </div>
      <div className="sm:hidden my-10">
        <Swiper
          navigation={true}
          modules={[Navigation]}
          className="mySwiper h-full"
        >
          <SwiperSlide className="h-full w-full flex justify-center items-center px-12">
            <div className="flex flex-col items-center border border-neon-blue-200 px-2 w-full">
              <Image src={"/images/passo1.png"} alt="Passo 1" className="!my-5 !w-auto !scale-100" height={80} width={80} />
              <h1 className="text-center uppercase text-3xl neon-text">PASSO 1</h1>
              <p className="text-center uppercase flex justify-center items-center my-5">
                Escolha uma música <br /> para participar <br /> de uma sala
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide className="h-full w-full flex justify-center items-center px-12">
            <div className="flex flex-col items-center border border-neon-blue-200 px-2 w-full">
              <Image src={"/images/passo2.png"} alt="Passo 2" className="!my-5 !w-auto !scale-100" height={80} width={80} />
              <h1 className="text-center uppercase text-3xl neon-text">PASSO 2</h1>
              <p className="text-center uppercase flex justify-center items-center my-5">
                Aguarde outros <br /> usuários entrarem <br /> na sala
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide className="h-full w-full flex justify-center items-center px-12">
            <div className="flex flex-col items-center border border-neon-blue-200 px-2 w-full">
              <div className="relative">
                <Image src={"/images/passo3.png"} alt="Passo 3" className="!my-5 !w-auto !scale-100" height={80} width={80} />
                <Image src={"/images/click.png"} alt="Click" className="absolute top-20 right-3 !w-auto !scale-100" height={40} width={40} />
              </div>
              <h1 className="text-center uppercase text-3xl neon-text">PASSO 3</h1>
              <p className="text-center uppercase flex justify-center items-center my-5">
                ouça e avalie<br /> as músicas <br /> diariamente
              </p>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
};
export default ComoParticiparCarrossel;
