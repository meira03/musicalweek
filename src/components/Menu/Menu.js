"use client";

import Image from "next/image";
import { Fragment } from 'react'
import { Disclosure, Menu as StyleMenu, Transition } from '@headlessui/react'
import { FaMoon, FaSun } from "react-icons/fa";
import { HiX, HiMenu } from "react-icons/hi";
import { useTheme } from "next-themes";

const Menu = async () => {
  return (<></>)
}

// const Menu = async () => {
//   const { setTheme } = useTheme();

//   const navigation = [
//     { name: "Home", href: '#', current: true },
//     { name: "Daily Music", href: '#', current: false },
//     { name: "Rooms", href: '#', current: false },
//   ];

//   function classNames(...classes) {
//     return classes.filter(Boolean).join(' ')
//   }
//   return (
//     <Disclosure as="nav" className="bg-zinc-200 text-black fixed w-full left-0 top-0 border-b border-black dark:border-b-0 dark:bg-zinc-900 dark:text-white">
//       {({ open }) => (
//         <>
//           <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
//             <div className="relative flex h-16 items-center justify-between">
//               <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
//                 {/* Mobile menu button*/}
//                 <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 focus:outline-none">
//                   <span className="sr-only">Open main menu</span>
//                   {open ? (
//                     <HiX className="block h-6 w-6" aria-hidden="true" />
//                   ) : (
//                     <HiMenu className="block h-6 w-6" aria-hidden="true" />
//                   )}
//                 </Disclosure.Button>
//               </div>
//               <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
//                 <div className="flex flex-shrink-0 items-center">
//                   <Image
//                   src="/darkmusicalweek.webp"
//                   alt="MusicalWeek Logo"
//                   width="0"
//                   height="0"
//                   sizes="100vw"
//                   className="h-10 w-auto hidden dark:block"
//                   priority
//                 />
//                 <Image
//                   src="/musicalweek.webp"
//                   alt="MusicalWeek Logo"
//                   width="0"
//                   height="0"
//                   sizes="100vw"
//                   className="h-10 w-auto dark:hidden"
//                   priority
//                 />
//                 </div>
//                 <div className="hidden sm:ml-6 items-center sm:flex">
//                   <div className="flex space-x-4">
//                     {navigation.map((item) => (
//                       <a
//                         key={item.name}
//                         href={item.href}
//                         className={classNames(
//                           item.current ? 'bg-zinc-300 dark:bg-zinc-800' : 'text-zinc-800 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-zinc-700 dark:hover:text-white',
//                           'rounded-md px-3 py-2 text-sm font-medium'
//                         )}
//                         aria-current={item.current ? 'page' : undefined}
//                       >
//                         {item.name}
//                       </a>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//               <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
//                 <button
//                   type="button"
//                   onClick={() => setTheme('dark')}
//                   className="block dark:hidden hover:animate-pulse text-zinc-800 hover:text-black"
//                 >
//                   <span className="sr-only">Dark Mode</span>
//                   <FaMoon className="h-6 w-6"/>
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setTheme('light')}
//                   className="hidden dark:block hover:animate-pulse text-gray-400 hover:text-white"
//                 >
//                   <span className="sr-only">Light Mode</span>
//                   <FaSun className="h-6 w-6"/>
//                 </button>

//                 {/* Profile dropdown */}
//                 <StyleMenu as="div" className="relative ml-3">
//                   <div>
//                     <StyleMenu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
//                       <span className="sr-only">Open user menu</span>
//                       <Image
//                         width="0"
//                         height="0"
//                         sizes="100vw"
//                         className="h-8 w-8 rounded-full"
//                         src="/darkmusicalweek.webp"
//                         alt=""
//                       />
//                     </StyleMenu.Button>
//                   </div>
//                   <Transition
//                     as={Fragment}
//                     enter="transition ease-out duration-100"
//                     enterFrom="transform opacity-0 scale-95"
//                     enterTo="transform opacity-100 scale-100"
//                     leave="transition ease-in duration-75"
//                     leaveFrom="transform opacity-100 scale-100"
//                     leaveTo="transform opacity-0 scale-95"
//                   >
//                     <StyleMenu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
//                       <StyleMenu.Item>
//                         {({ active }) => (
//                           <a
//                             href="#"
//                             className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
//                           >
//                             Your Profile
//                           </a>
//                         )}
//                       </StyleMenu.Item>
//                       <StyleMenu.Item>
//                         {({ active }) => (
//                           <a
//                             href="#"
//                             className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
//                           >
//                             Settings
//                           </a>
//                         )}
//                       </StyleMenu.Item>
//                       <StyleMenu.Item>
//                         {({ active }) => (
//                           <a
//                             href="#"
//                             className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
//                           >
//                             Sign out
//                           </a>
//                         )}
//                       </StyleMenu.Item>
//                     </StyleMenu.Items>
//                   </Transition>
//                 </StyleMenu>
//               </div>
//             </div>
//           </div>
//           <Disclosure.Panel className="sm:hidden">
//             <div className="space-y-1 px-2 pb-3 pt-2">
//               {navigation.map((item) => (
//                 <Disclosure.Button
//                   key={item.name}
//                   as="a"
//                   href={item.href}
//                   className={classNames(
//                     item.current ? 'bg-zinc-300 dark:bg-zinc-800' : 'text-zinc-800 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-zinc-700 dark:hover:text-white',
//                     'block rounded-md px-3 py-2 text-base font-medium'
//                   )}
//                   aria-current={item.current ? 'page' : undefined}
//                 >
//                   {item.name}
//                 </Disclosure.Button>
//               ))}
//             </div>
//           </Disclosure.Panel>
//         </>
//       )}
//     </Disclosure>
//   );
// };


export default Menu;
