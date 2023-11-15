import { SearchBar } from "@/components/search/SearchBar";
import { ArtistaSubmit } from "@/components/search/ArtistaSubmit";
import { MyProvider } from "./context/context";
import { getDictionary } from "@/utils/dictionaries";

export const metadata = {
  title: 'Criar Sala do Artista',
}

export default async function SearchLayout({ children, params: { lang } }) {
  let dict = await getDictionary(lang);
  dict = dict.artista_search;

  return (
    <div className="flex justify-center items-center flex-col min-h-[90vh]">
      <h1 className="text-2xl sm:text-4xl neon-text uppercase text-center">{dict.criacao_sala_artista}</h1>
      <h3 className="text-xs sm:text-xl uppercase mt-4 text-center">{dict.adicione_7_musicas}</h3>
      <MyProvider>
        <SearchBar link="/artista/search/" />
        <ArtistaSubmit />
        {children}
      </MyProvider>
    </div>
  );
}
