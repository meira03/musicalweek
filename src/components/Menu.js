"use client";
import Image from "next/image";
import Link from 'next/link'
import logo from "../../public/darkmusicalweek.webp";

export const Menu = ({logado}) => {

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
            <Link className="ml-2" href='/salas'>Salas</Link>
          </li>
          <li>
            <Link className="ml-2" href='/perfil'>Perfil</Link>
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