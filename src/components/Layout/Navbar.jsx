import NavProfile from "../ui/NavProfile";
import SearchBar from "../ui/SearchBar";
import { useAuth } from "../../context/AuthContext";
import LogoutProfile from "../ui/LogoutProfile";
import { useRef, useState } from "react";
import { Menu } from "lucide-react";

export default function Navbar({ setMobileOpen }) {
  const { user } = useAuth();
  const [show, setShow] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setShow(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setShow(false), 150);
  };

  const handleClick = () => {
    setShow((prev) => !prev);
  };

  return (
    <nav className="flex items-center justify-between py-3 w-full relative">
      <div className="flex items-center gap-3">
        <Menu
          size={28}
          className="md:hidden cursor-pointer text-tTertiary hover:text-white"
          onClick={() => setMobileOpen(true)}
        />

        <div className="w-[140px] sm:w-[200px] md:w-[300px]">
          <SearchBar />
        </div>
      </div>

      <div
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div onClick={handleClick} className="cursor-pointer">
          <NavProfile user={user} />
        </div>

        {show && <LogoutProfile user={user} />}
      </div>
    </nav>
  );
}
