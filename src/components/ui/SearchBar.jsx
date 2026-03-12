import { Search } from "lucide-react";
import SearchResult from "./SearchResult";
import { useQuery } from "@tanstack/react-query";
import useDebounce from "../hooks/useDebounce";
import { searchAll } from "../../services/search";
import { useState } from "react";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearch = useDebounce(searchTerm, 400);

  const searchQuery = useQuery({
    queryKey: ["search", debouncedSearch],
    queryFn: () => searchAll(debouncedSearch),
    enabled: !!debouncedSearch,
  });

  const results = debouncedSearch && searchQuery.data;
  const isLoading = debouncedSearch && searchQuery.isLoading;

  return (
    <div className="relative w-full">
      <SearchBtn searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <SearchResult results={results} isLoading={isLoading} />
    </div>
  );
}

function SearchBtn({ searchTerm, setSearchTerm }) {
  return (
    <div className="flex items-center relative text-tPrimary">
      <Search className="w-5 left-3 absolute cursor-pointer text-[#ffffffde]" />

      <input
        type="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="text-heading pl-10 p-2 focus:outline-none w-72 bg-background border border-borderColor rounded-xl"
        placeholder="Search movies, anime, series..."
      />
    </div>
  );
}
