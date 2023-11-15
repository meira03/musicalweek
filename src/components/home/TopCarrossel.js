"use client";
import { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { getMusic } from "@/utils/spotify";

import "@/styles/home/TopCarrossel.css"

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import Link from "next/link";

const TopCarrossel = ({ dict, data }) => {
  const [index, setIndex] = useState(0);
  const [topMusicas, setTopMusicas] = useState([]);
  const [semanaMusicas, setSemanaMusicas] = useState([]);
  const [mesMusicas, setMesMusicas] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isLoading1, setLoading1] = useState(true);
  const [isLoading2, setLoading2] = useState(true);

  const top_musicas = data.top_musicas

  // const top_musicas = JSON.parse(`
  // [
  //   [
  //     "4tCtwWceOPWzenK2HAIJSb",
  //     "4l0Mvzj72xxOpRrp6h8nHi",
  //     "3KkXRkHbMCARz0aVfEt68P",
  //     "7qEHsqek33rTcFNT9PFqLf",
  //     "4tCtwWceOPWzenK2HAIJSb",
  //     "7qiZfU4dY1lWllzX7mPBI3",
  //     "6ocbgoVGwYJhOv1GgI9NsF"
  //   ],
  //   [
  //     "7qiZfU4dY1lWllzX7mPBI3",
  //     "4l0Mvzj72xxOpRrp6h8nHi",
  //     "3KkXRkHbMCARz0aVfEt68P",
  //     "7qEHsqek33rTcFNT9PFqLf",
  //     "4tCtwWceOPWzenK2HAIJSb",
  //     "7qiZfU4dY1lWllzX7mPBI3",
  //     "6ocbgoVGwYJhOv1GgI9NsF"
  //   ],
  //   [
  //     "6ocbgoVGwYJhOv1GgI9NsF",
  //     "4l0Mvzj72xxOpRrp6h8nHi",
  //     "3KkXRkHbMCARz0aVfEt68P",
  //     "7qEHsqek33rTcFNT9PFqLf",
  //     "4tCtwWceOPWzenK2HAIJSb",
  //     "7qiZfU4dY1lWllzX7mPBI3",
  //     "6ocbgoVGwYJhOv1GgI9NsF"
  //   ]
  // ]
  // `);

  useEffect(() => {
    if (isLoading) {
      const promisses = top_musicas[0].map((musica) => getMusic(musica));
      Promise.all(promisses).then((musica) => {
        setTopMusicas(musica);
        setLoading(false);
      });
    }
  }, [topMusicas]);

  useEffect(() => {
    if (isLoading1) {
      const promisses = top_musicas[1].map((musica) => getMusic(musica));
      Promise.all(promisses).then((musica) => {
        setMesMusicas(musica);
        setLoading1(false);
      });
    }
  }, [mesMusicas]);

  useEffect(() => {
    if (isLoading2) {
      const promisses = top_musicas[2].map((musica) => getMusic(musica));
      Promise.all(promisses).then((musica) => {
        setSemanaMusicas(musica);
        setLoading2(false);
      });
    }
  }, [semanaMusicas]);

  if (isLoading || isLoading1 || isLoading2) {
    return <>Carregando...</>;
  } else {
    return (
      <Swiper
        navigation={true}
        modules={[Navigation]}
        className="swiperTop h-full"
      >
        {top_musicas.map((top, key) => {
          let title;
          let list;
          switch (key) {
            case 0:
              title = dict.top;
              list = topMusicas;
              break;
            case 1:
              title = dict.top_semana;
              list = mesMusicas;
              break;
            case 2:
              title = dict.top_mes;
              list = semanaMusicas;
              break;
          }

          return (
            <SwiperSlide className="h-full w-full flex flex-col justify-center items-center px-6 sm:px-12">
              <h1 className="mt-10 neon-text text-3xl sm:text-5xl text-center uppercase">
                {title}
              </h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 max-w-5xl mx-auto mt-10">
                <div className="flex flex-col justify-center items-center mb-10 sm:mb-0 sm:w-3/4">
                  <div className="border border-neon-blue-200 relative">
                    <Image
                      src={list[0].album.images[0].url}
                      alt={list[0].name}
                      width={600}
                      height={600}
                      className="p-2"
                    />
                    <span className="neon-text text-4xl tracking-widest absolute bottom-0 left-2 right-0 p-3">
                      {1}º
                    </span>
                  </div>
                  <h3 className="max-w-full text-center text-xl sm:text-2xl truncate text-elipsis">
                    {list[0].name}
                  </h3>
                  <h4 className="max-w-full text-center text-sm sm:text-lg truncate text-elipsis text-zinc-400">
                    {list[0].artists[0].name}
                  </h4>
                </div>
                <div>
                  <div className="grid grid-cols-1 gap-4">
                    {list.map((musica, key) => {
                      if (key > 0) {
                        return (
                          <div
                            className="border border-neon-blue-200 relative"
                            style={{
                              backgroundImage: `url(${musica.album.images[0].url})`,
                              backgroundPosition: "center",
                              backgroundSize: "cover",
                            }}
                          >
                            <div className="bg-black-900 bg-opacity-70 grid grid-cols-3">
                              <div className="text-center flex justify-left items-center pl-8">
                                <span className="neon-text text-4xl tracking-widest">
                                  {key + 1}º
                                </span>
                              </div>
                              <div className="col-span-2 py-2 pr-3">
                                <h3 className="max-w-full text-right truncate text-elipsis">
                                  {musica.name}
                                </h3>
                                <h4 className="max-w-full text-right text-xs truncate text-elipsis text-zinc-400">
                                  {musica.artists[0].name}
                                </h4>
                              </div>
                            </div>
                          </div>
                        );
                      }
                    })}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    );
  }
};
export default TopCarrossel;