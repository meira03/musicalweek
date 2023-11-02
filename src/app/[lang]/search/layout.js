import { SearchBar } from "@/components/search/SearchBar";

export default function SearchLayout({ children }) {
  return (
    <div className="flex justify-center items-center flex-col min-h-[90vh]">
      <SearchBar />
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4  w-full">
          {children}
        </div>
    </div>
  );
}
