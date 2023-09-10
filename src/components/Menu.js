"use client";
import Image from "next/image";
import Link from 'next/link'
import logo from "../../public/darkmusicalweek.webp";

export const Menu = () => {

  return (
    <nav className="h-14 bg-black-50 flex justify-between items-center px-3">
      <Image src={logo} className='max-h-[70%] w-auto' alt="Logo Musical Week" />
      <ul className="grid grid-cols-3 gap-4">
        <li>
            <Link href='/'>Home</Link>
        </li>
        <li>
            <Link href='/search'>Salas</Link>
        </li>
        <li>
            <Link href='/profile'>Perfil</Link>
        </li>
      </ul>
    </nav>
  );
};
