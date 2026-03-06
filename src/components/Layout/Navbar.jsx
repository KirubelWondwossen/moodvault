import NavProfile from "../ui/NavProfile";
import SearchBar from "../ui/SearchBar";
import { useAuth } from "../../context/AuthContext";
import LogoutProfile from "../ui/LogoutProfile";
import { useState } from "react";

export default function Navbar({ show, setShow }) {
  const { user } = useAuth();
  const [show, setShow] = useState(false);
  return (
    <nav className="flex justify-between w-full px-2 py-4 relative">
      <SearchBar />
      <NavProfile user={user} setShow={setShow} />
      {show && <LogoutProfile user={user} />}
    </nav>
  );
}
