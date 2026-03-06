import NavProfile from "../ui/NavProfile";
import SearchBar from "../ui/SearchBar";
import { useAuth } from "../../context/AuthContext";
import LogoutProfile from "../ui/LogoutProfile";
import { useRef, useState } from "react";

export default function Navbar() {
  const { user } = useAuth();
  const [show, setShow] = useState(false);
  const timeoutRef = useRef(null);

  return (
    <nav className="flex justify-between w-full px-2 py-4 relative">
      <SearchBar />

      <div
        className="relative"
        onMouseEnter={() => {
          clearTimeout(timeoutRef.current);
          setShow(true);
        }}
        onMouseLeave={() => {
          timeoutRef.current = setTimeout(() => setShow(false), 150);
        }}
      >
        <NavProfile user={user} />
        {show && <LogoutProfile user={user} />}
      </div>
    </nav>
  );
}
