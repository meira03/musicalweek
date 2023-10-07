"use client";

import { useRouter } from 'next/navigation'
// import { useParams } from "next/navigation";

export const SearchBar = () => {
  const router = useRouter()
  // const searchParams = useParams();
  
  function handleChange(event) {
    router.replace("/search-artista/" + event.target.value)
  }

  return (
    <input
      className="bg-zinc-200 dark:bg-zinc-800 dark:text-white rounded-lg px-2 py-2 my-4"
      type="text"
      placeholder="Digite sua busca..."
      onChange={handleChange}
    />
  );
};
