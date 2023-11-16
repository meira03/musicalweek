"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavSalas = ({ fila, artista, historico, padrao, minhas_salas, dict }) => {
  const pathname = usePathname();

  let active = "padrao";
  if (pathname.includes("fila")) active = "fila";
  if (pathname.includes("artista")) active = "artista";
  if (pathname.includes("historico")) active = "historico";
  if (pathname.includes("minhas_salas")) active = "minhas_salas";

  if (fila || padrao || artista ||
    historico || minhas_salas) {
    return (
      <nav className="flex justify-center items-center text-center mb-3 text-xs sm:text-lg">
        <Link
          className={
            (!fila ? "hidden " : "") +
            "mr-3 sm:mr-5 text-neon-blue-200 uppercase hover:underline " +
            (active == "fila" ? "underline" : "")
          }
          href="/salas/fila"
        >
          {dict.fila}
        </Link>
        <Link
          className={
            (!padrao ? "hidden " : "") +
            "mr-3 sm:mr-5 text-neon-blue-200 uppercase hover:underline " +
            (active == "padrao" ? "underline" : "")
          }
          href="/salas/"
        >
          {dict.salas}
        </Link>
        <Link
          className={
            (!artista ? "hidden " : "") +
            "mr-3 sm:mr-5 text-neon-blue-200 uppercase hover:underline " +
            (active == "artista" ? "underline" : "")
          }
          href="/salas/artista"
        >
          {dict.escolhas_dos_artistas}
        </Link>
        <Link
          className={
            (!minhas_salas ? "hidden " : "") +
            "mr-3 sm:mr-5 text-neon-blue-200 uppercase hover:underline " +
            (active == "minhas_salas" ? "underline" : "")
          }
          href="/salas/minhas_salas"
        >
          {dict.minhas_salas}
        </Link>
        <Link
          className={
            (!historico ? "hidden " : "") +
            "text-neon-blue-200 uppercase hover:underline " +
            (active == "historico" ? "underline" : "")
          }
          href="/salas/historico"
        >
          {dict.historico}
        </Link>
      </nav>
    );
  }
};
