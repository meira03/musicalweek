"use client";
import Image from "next/image";
import Link from 'next/link';
import { HiMiniBars3, HiXMark } from "react-icons/hi2";
import { AiOutlineLogout } from "react-icons/ai";
import { signOut } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import { perfilUsuario } from '@/utils/user';

export const Menu = ({ logado, plano: propPlano, dict }) => {
  const [sideBar, setSideBar] = useState(false);
  const [plano, setPlano] = useState("");

  const menuRef = useRef(null);

  const logout = async () => {
    await signOut({
      redirect: false
    })

    window.location.href = "/"  
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const perfil = await perfilUsuario();
        const planoDoPerfil = perfil?.plano;

        console.log('Plano do perfil:', planoDoPerfil);

        setPlano(planoDoPerfil || "");

      } catch (error) {
        console.error('Erro ao obter o perfil do usuário:', error);
      }
    };

    fetchData();

    const handleScroll = () => {
      setSideBar(false);
    };

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setSideBar(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  return (
    <nav className="h-14 w-11/12 mx-auto relative flex justify-between items-center px-2 sm:px-6 border-b border-neon-blue-100">
      <div className="h-[70%] w-full flex justify-between items-center" ref={menuRef}>
        <Link className='h-full' href='/'><Image src={"/images/musicalweek.webp"} width={400} height={300} className="h-full w-auto" alt={dict.logo_musical_week} priority /></Link>
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
                    <Link className="pl-2 uppercase text-lg py-2 block hover:text-neon-blue-200 bg-opacity-80" href='/search'>{dict.nova_sala}</Link>
                  </li>
                  {plano == 2 && (
                    <li onClick={() => setSideBar(false)}>
                      <Link className="pl-2 uppercase text-lg py-2 block hover:text-neon-blue-200 bg-opacity-80" href='/artista/search'>{dict.nova_sala_artista}</Link>
                    </li>
                  )}
                  <li onClick={() => setSideBar(false)}>
                    <Link className="pl-2 uppercase text-lg py-2 block hover:text-neon-blue-200 bg-opacity-80" href='/salas'>{dict.salas}</Link>
                  </li>
                  <li onClick={() => setSideBar(false)}>
                    <Link className="pl-2 uppercase text-lg py-2 block hover:text-neon-blue-200 bg-opacity-80" href='/perfil'>{dict.perfil}</Link>
                  </li>
                  <li onClick={() => setSideBar(false)}>
                    <button className="pl-2 uppercase text-lg py-2 text-red-600 w-full" onClick={logout}>{dict.sair}</button>
                  </li>
                </ul>
              </div>
            </>
            :
            <li>
              <Link className="ml-2" href='/login'>{dict.entrar}</Link>
            </li>
          }
        </ul>
      </div>
    </nav>
  );
};