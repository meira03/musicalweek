"use client";
import Image from "next/image";
import Link from 'next/link'
import logo from "../../public/darkmusicalweek.webp";

export const Menu = ({logado}) => {

  const logout = () => {
    document.cookie.split(";").forEach((cookie) => {
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    });

    window.location.href = '/login';
  };

  return (
    <nav className="h-14 bg-black-50 flex justify-between items-center px-3">
      <Image src={logo} className='max-h-[70%] w-auto' alt="Logo Musical Week" />
      <ul className="flex">
        <li>
          <Link href='/'>Home</Link>
        </li>
        {logado ?
        <>
          <li>
            <Link className="ml-2" href='/search'>Nova Sala</Link>
          </li>
          <li>
            <Link className="ml-2" href='/salas'>Salas</Link>
          </li>
          <li>
            <Link className="ml-2" href='/perfil'>Perfil</Link>
          </li>
          <li>
            <button className="ml-2" onClick={logout}>Sair</button>
          </li>
        </>
         : 
         <li>
          <Link className="ml-2" href='/login'>Entrar</Link>
        </li>
        }
      </ul>
    </nav>
  );
};