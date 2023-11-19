import { SearchBar } from "@/components/search/SearchBar";
import { getDictionary } from "@/utils/dictionaries";

export const metadata = {
  title: 'Busca',
}

export default async function SearchLayout({ children, params:{lang} }) {
  let dict = await getDictionary(lang);
  dict = dict.artista_search;
  return (
    <div className="flex justify-center items-center flex-col min-h-[90vh]">
      <SearchBar link="/search/" dict={dict.components_search}/>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4  w-full">
          {children}
        </div>
    </div>
  );
}
