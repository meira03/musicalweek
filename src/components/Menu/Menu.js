"use client";

import Image from "next/image";
import Link from "next/link";
import { FaUserAlt } from "react-icons/fa";
import { HiX, HiMenu } from "react-icons/hi";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

const Menu = ({id}) => {  
  const { setTheme } = useTheme();
  const router = useRouter();

  function handleMenuMobile() {
    document.getElementById("mobile-menu").classList.toggle("hidden");
    document.getElementById("btn-menu").classList.toggle("hidden");
    document.getElementById("btn-x").classList.toggle("hidden");
  }

  return (
    <nav className="bg-zinc-200 text-black fixed w-full left-0 top-0 border-b border-black dark:border-b-0 dark:bg-zinc-900 dark:text-white">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-black hover:bg-gray-100 hover:text-black focus:ring-black dark:text-gray-400 dark:hover:bg-zinc-700 dark:hover:text-white dark:focus:ring-white focus:outline-none focus:ring-2 focus:ring-inset"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={handleMenuMobile}
            >
              <span className="sr-only">Open main menu</span>
              <HiMenu id="btn-menu" />
              <HiX id="btn-x" className="hidden" />
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <Image
                src="/darkmusicalweek.webp"
                alt="MusicalWeek Logo"
                width="0"
                height="0"
                sizes="100vw"
                className="h-10 w-auto hidden dark:block"
                priority
              />
              <Image
                src="/musicalweek.webp"
                alt="MusicalWeek Logo"
                width="0"
                height="0"
                sizes="100vw"
                className="h-10 w-auto dark:hidden"
                priority
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {/* <!-- Current: "bg-zinc-800 text-white", Default: "text-gray-300 hover:bg-zinc-700 hover:text-white" --> */}
                <Link
                  href="/"
                  className="text-black hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-zinc-700 dark:hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  aria-current="page"
                >
                  Home
                </Link>
                <Link
                  href="/salas"
                  className="text-black hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-zinc-700 dark:hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  replace
                >
                  Salas
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 group">
            <button
              type="button"
              className="rounded-full text-black p-1 dark:text-white focus:outline-none"
            >
              <span className="sr-only">View notifications</span>
              <FaUserAlt />
            </button>

            <div className="relative z-20 ml-3">
              <div
                className="absolute right-0 z-10 mt-3 w-48 origin-top-right hidden group-hover:block rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
                tabIndex="-1"
              >
                {false && (
                    <Link
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabIndex="-1"
                      id="user-menu-item-0"
                    >
                      Seu Perfil
                    </Link>
                  )}

                <span
                  href="#"
                  className="cursor-pointer px-4 py-2 text-sm text-gray-700 hidden dark:block"
                  role="menuitem"
                  tabIndex="-1"
                  id="user-menu-item-1"
                  onClick={() => setTheme("light")}
                >
                  Modo Claro
                </span>
                <span
                  href="#"
                  className="cursor-pointer block px-4 py-2 text-sm text-gray-700 dark:hidden"
                  role="menuitem"
                  tabIndex="-1"
                  id="user-menu-item-2"
                  onClick={() => setTheme("dark")}
                >
                  Modo Escuro
                </span>
                {id != undefined && (
                    <span
                      href="#"
                      className="cursor-pointer block px-4 py-2 text-sm text-red-700"
                      role="menuitem"
                      tabIndex="-1"
                      id="user-menu-item-3"
                      onClick={() => {
                        document.cookie = "id=; Max-Age=-99999999;";
                        router.refresh();
                      }}
                    >
                      Sair
                    </span>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Mobile menu, show/hide based on menu state. --> */}
      <div className="hidden sm:hidden" id="mobile-menu">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {/* <!-- Current: "bg-zinc-800 text-white", Default: "text-gray-300 hover:bg-zinc-700 hover:text-white" --> */}
          <Link
            href="/"
            className="text-black hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-zinc-700 dark:hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            aria-current="page"
          >
            Home
          </Link>
          <Link
            href="/salas"
            className="text-black hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-zinc-700 dark:hover:text-white block rounded-md px-3 py-2 text-base font-medium"
          >
            Salas
          </Link>
          {false && (
              <Link
                href="/perfil"
                className="text-black hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-zinc-700 dark:hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                aria-current="page"
              >
                Seu Perfil
              </Link>
            )}
          <span
            onClick={() => setTheme("dark")}
            className="dark:hidden text-black hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-zinc-700 dark:hover:text-white block rounded-md px-3 py-2 text-base font-medium"
          >
            Modo Escuro
          </span>
          <span
            onClick={() => setTheme("light")}
            className="hidden dark:block text-black hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-zinc-700 dark:hover:text-white rounded-md px-3 py-2 text-base font-medium"
          >
            Modo Claro
          </span>
          {id != undefined && (
              <span
                onClick={() => {
                  document.cookie = "id=; Max-Age=-99999999;";
                  router.refresh();
                }}
                className="text-red-600 hover:bg-gray-100 dark:hover:bg-zinc-700 block rounded-md px-3 py-2 text-base font-medium"
              >
                Sair
              </span>
            )}
        </div>
      </div>
    </nav>
  );
};

export default Menu;
