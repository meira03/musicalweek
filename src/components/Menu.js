"use client";
import Image from "next/image";
import Link from 'next/link'
import { HiMiniBars3, HiXMark} from "react-icons/hi2";
import { AiOutlineLogout} from "react-icons/ai";
import { useState } from "react";

export const Menu = ({ logado }) => {
  
  const [sideBar, setSideBar] = useState(false);

  const logout = () => {
    document.cookie.split(";").forEach((cookie) => {
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    });

    window.location.href = '/login';
  };

  return (
    <nav className="h-14 w-11/12 mx-auto relative flex justify-between items-center px-2 sm:px-6 border-b border-neon-blue-100">
      <div className="h-[70%] w-full flex justify-between items-center">
        <Link className='h-full' href='/'><Image src={"/images/musicalweek.webp"} width={400} height={300} className="h-full w-auto" alt="Logo Musical Week" priority /></Link>
        <ul className="flex">
          {logado ?
          <>
            <li className="cursor-pointer text-neon-blue-100" onClick={() => setSideBar(!sideBar)}>
              <HiMiniBars3 className={sideBar && "hidden"} />
              <HiXMark className={!sideBar && "hidden"} />
            </li>
            <div id="sidebar" className={(!sideBar && "hidden") + " fixed top-14 right-0 w-full z-50"}>
              <ul className="w-11/12 mx-auto bg-black-100 bg-opacity-90 h-[calc(100%_-_3.5rem)] relative text-center">
                <li onClick={() => setSideBar(false)}>
                  <Link className="pl-2 uppercase text-lg py-2 block hover:text-neon-blue-200 bg-opacity-80" href='/search'>Nova Sala</Link>
                </li>
                <li onClick={() => setSideBar(false)}>
                  <Link className="pl-2 uppercase text-lg py-2 block hover:text-neon-blue-200 bg-opacity-80" href='/search-artista'>Nova Sala Artista</Link>
                </li>
                <li onClick={() => setSideBar(false)}>
                  <Link className="pl-2 uppercase text-lg py-2 block hover:text-neon-blue-200 bg-opacity-80" href='/salas'>Salas</Link>
                </li>
                <li onClick={() => setSideBar(false)}>
                  <Link className="pl-2 uppercase text-lg py-2 block hover:text-neon-blue-200 bg-opacity-80" href='/perfil'>Perfil</Link>
                </li>
                <li onClick={() => setSideBar(false)}>
                  <button className="pl-2 uppercase text-lg py-2 text-red-600 w-full" onClick={logout}>Sair</button>
                </li>
              </ul>
            </div>
          </>
            :
            <li>
              <Link className="ml-2" href='/login'>Entrar</Link>
            </li>
          }
        </ul>
      </div>
      
    </nav>
  );
};