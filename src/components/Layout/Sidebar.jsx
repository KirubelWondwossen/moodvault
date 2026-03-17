import { Link, useLocation } from "react-router-dom";
import Logo from "../ui/Logo";
import { Home, Compass, Bookmark, User, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function Sidebar({ showSideBar = true }) {
  const [show, setShow] = useState(showSideBar);

  useEffect(() => {
    setShow(showSideBar);
  }, [showSideBar]);

  return (
    <aside
      className={`${
        show ? "w-56" : "w-16"
      } flex flex-col items-center transition-all duration-300 ease-in-out border-r border-borderColor h-screen overflow-hidden`}
    >
      <div
        className={`flex items-center justify-between p-2 w-full ${!show && "px-4"}`}
      >
        {show ? (
          <>
            <Logo
              className={`transition-all duration-300 ${
                show ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
              }`}
            />
            <X
              size={24}
              className="cursor-pointer text-tTertiary hover:hover:text-[#ffffffde]"
              onClick={() => setShow(!show)}
            />
          </>
        ) : (
          <Menu
            size={28}
            className="cursor-pointer text-tTertiary hover:hover:text-[#ffffffde]"
            onClick={() => setShow(!show)}
          />
        )}
      </div>
      <SidebarBtn path={"/home"} icon={Home} btn={"Home"} show={show} />
      <SidebarBtn
        path={"/explore"}
        icon={Compass}
        btn={"Explore"}
        show={show}
      />
      <SidebarBtn
        path={"/myvalut"}
        icon={Bookmark}
        btn={"MyVault"}
        show={show}
      />
      <SidebarBtn path={"/profile"} icon={User} btn={"Profile"} show={show} />
      {show && <SectionBreak />}
    </aside>
  );
}

// eslint-disable-next-line
function SidebarBtn({ icon: Icon, path, btn, show }) {
  const location = useLocation();

  return (
    <Link to={path} className={`${show ? "w-56" : "w-16"}`}>
      <div
        className={`${
          show ? "flex items-center gap-3" : "flex justify-center"
        } border-background hover:border-l-primary hover:text-[#ffffffde] ${
          location.pathname === path ? "border-l-primary" : "text-tTertiary"
        } p-2 border-2 transition-all duration-300`}
      >
        <Icon
          size={show ? 24 : 28}
          className={`${location.pathname === path ? "text-primary" : ""}`}
        />
        {show && (
          <span
            className={`cursor-pointer no-underline font-heading transition-all duration-200 ${
              show ? "opacity-100 ml-0" : "opacity-0 -ml-2"
            }`}
          >
            {btn}
          </span>
        )}
      </div>
    </Link>
  );
}
function SectionBreak() {
  return <span className="border-b border-borderColor px-16 py-2"></span>;
}
