import { SearchBar } from "@/components/search/SearchBar";

export default function SearchLayout({ children }) {
  return (
    <>
      <SearchBar />
      {children}
    </>
  );
}
