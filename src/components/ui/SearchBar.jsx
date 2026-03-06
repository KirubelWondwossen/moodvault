import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="flex items-center px-5 relative text-tPrimary">
      <Search className="w-5 left-[10%] absolute cursor-pointer text-[#ffffffde]" />
      <input
        type="search"
        className="text-heading pl-9 p-2 focus:outline-none w-64 bg-background border border-borderColor rounded-xl"
        placeholder="Search movies..."
      />
    </div>
  );
}
