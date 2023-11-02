"use client";

import { useRouter } from 'next/navigation'
// import { useParams } from "next/navigation";

export const SearchBar = () => {
  const router = useRouter()
  // const searchParams = useParams();
  
  function handleChange(event) {
    router.replace("/search/" + event.target.value)
  }

  return (
    <>
    <input
      className="bg-black-100 border focus-visible:outline-none border-neon-blue-100 neon-text uppercase text-white px-2 py-2 my-4 w-full"
      type="text"
      placeholder="O que você quer compartilhar?"
      onChange={handleChange}
    />
    <div id="search-error" className="text-red-600 text-center"></div>
    </>    
  );
};
