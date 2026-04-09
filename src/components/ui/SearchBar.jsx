import { Search, SlidersHorizontal } from "lucide-react";
import SearchResult from "./SearchResult";
import { useQuery } from "@tanstack/react-query";
import useDebounce from "../../hooks/useDebounce";
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

  const results = debouncedSearch ? searchQuery.data || [] : [];
  const isLoading = debouncedSearch && searchQuery.isLoading;

  return (
    <div className="relative w-full max-w-full sm:max-w-md md:max-w-lg">
      <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {debouncedSearch && (
        <SearchResult
          results={results}
          isLoading={isLoading}
          setSearchTerm={setSearchTerm}
        />
      )}
    </div>
  );
}

function SearchInput({ searchTerm, setSearchTerm }) {
  return (
    <div className="flex items-center relative">
      <Search className="w-5 absolute left-3 text-[#ffffffde]" />

      <input
        type="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search movies, anime, series..."
        className="
          w-full
          pl-10 pr-3 py-2
          text-sm sm:text-base
          bg-background
          border border-borderColor
          rounded-xl
          focus:outline-none
          focus:ring-2 focus:ring-primary
          transition-all
        "
      />
    </div>
  );
}
