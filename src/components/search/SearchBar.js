"use client";

import { useRouter } from 'next/navigation'

export const SearchBar = ({link, dict}) => {
  const router = useRouter()
  
  function handleChange(event) {
    router.replace(link + event.target.value)
  }

  return (
    <>
    <input
      className="bg-black-100 border focus-visible:outline-none border-neon-blue-100 neon-text uppercase text-white px-2 py-2 my-4 w-full"
      type="text"
      placeholder={dict.mensagem_compartilhar}
      onChange={handleChange}
    />
    <div id="search-error" className="text-red-600 text-center mb-2"></div>
    </>    
  );
};
