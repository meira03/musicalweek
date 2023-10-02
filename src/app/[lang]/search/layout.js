import { SearchBar } from "@/components/search/SearchBar";

export default function SearchLayout({ children }) {
  return (
    <div className="flex justify-center items-center flex-col min-h-[90vh]">
      <SearchBar />
      <div id="search-error" className="text-red-600 text-center"></div>
      {children}
    </div>
  );
}
