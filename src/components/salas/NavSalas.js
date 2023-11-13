"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavSalas = ({ fila, artista, historico, padrao }) => {
  const pathname = usePathname();

  let active = "padrao";
  if (pathname.includes("fila")) active = "fila";
  if (pathname.includes("artista")) active = "artista";
  if (pathname.includes("historico")) active = "historico";

  if (fila || artista || historico) {
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
          Fila
        </Link>
        <Link
          className={
            (!padrao ? "hidden " : "") +
            "mr-3 sm:mr-5 text-neon-blue-200 uppercase hover:underline " +
            (active == "padrao" ? "underline" : "")
          }
          href="/salas/"
        >
          Salas
        </Link>
        <Link
          className={
            (!artista ? "hidden " : "") +
            "mr-3 sm:mr-5 text-neon-blue-200 uppercase hover:underline " +
            (active == "artista" ? "underline" : "")
          }
          href="/salas/artista"
        >
          Escolhas dos Artistas
        </Link>
        <Link
          className={
            (!historico ? "hidden " : "") +
            "text-neon-blue-200 uppercase hover:underline " +
            (active == "historico" ? "underline" : "")
          }
          href="/salas/historico"
        >
          Histórico
        </Link>
      </nav>
    );
  }
};
