import NavProfile from "../ui/NavProfile";
import SearchBar from "../ui/SearchBar";
import { useAuth } from "../../context/AuthContext";
import LogoutProfile from "../ui/LogoutProfile";

export default function Navbar() {
  const { user } = useAuth();
  return (
    <nav className="flex justify-between w-full px-2 py-4">
      <SearchBar />
      <NavProfile user={user} />
      <LogoutProfile user={user} />
    </nav>
  );
}
