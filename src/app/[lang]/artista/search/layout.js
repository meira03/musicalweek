import { SearchBar } from "@/components/search/SearchBar";
import { ArtistaSubmit } from "@/components/search/ArtistaSubmit";
import { MyProvider } from "./context/context";

export default function SearchLayout({ children }) {

  return (
    <div className="flex justify-center items-center flex-col min-h-[90vh]">
      <h1 className="text-4xl neon-text uppercase">Criação da Sala do Artista</h1>
      <h3 className="text-xl uppercase mt-4">Adicione 7 músicas para criar sua sala!</h3>
      <MyProvider>
        <SearchBar link="/artista/search/" />
        <ArtistaSubmit />
        {children}
      </MyProvider>
    </div>
  );
}
