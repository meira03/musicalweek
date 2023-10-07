"use client"
import { SearchBar } from "@/components/search-artista/SearchBar";
import { useEffect } from "react";
import { MyProvider } from "./context/context";

export default function SearchLayout({ children }) {


  useEffect(() => {
    console.log("renderizeikkkkkkkkkkkkkkkkkkkk")
  }, []);

  return (
    <div className="flex justify-center items-center flex-col min-h-[90vh]">
      <MyProvider>
        <SearchBar />
          <div id="search-error" className="text-red-600 text-center"></div>
        {children}
      </MyProvider>
    </div>
  );
}
