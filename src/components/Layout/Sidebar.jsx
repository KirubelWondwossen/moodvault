import { Link, useLocation } from "react-router-dom";
import Logo from "../ui/Logo";
import { Home, Compass, Bookmark, User } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-50 flex flex-col items-center gap-2 border-r border-borderColor h-screen overflow-hidden">
      <Logo className={"pt-2 px-2 self-start"} />
      <SidebarBtn path={"/home"} icon={Home} btn={"Home"} />
      <SidebarBtn path={"/explore"} icon={Compass} btn={"Explore"} />
      <SidebarBtn path={"/myvalut"} icon={Bookmark} btn={"MyVault"} />
      <SidebarBtn path={"/profile"} icon={User} btn={"Profile"} />
      <Border />
    </aside>
  );
}

function SidebarBtn({ icon: Icon, path, btn }) {
  const location = useLocation();

  return (
    <Link to={path} className="w-full">
      <div
        className={`flex items-center gap-3 border-background hover:border-l-primary hover:text-[#ffffffde] 
           ${location.pathname === path ? "border-l-primary" : "text-tTertiary"} p-2 border-2`}
      >
        <Icon
          size={24}
          className={`${location.pathname === path ? "text-primary" : ""}`}
        />
        <span className={`cursor-pointer no-underline font-heading`}>
          {btn}
        </span>
      </div>
    </Link>
  );
}

function Border() {
  return <span className="border-b border-borderColor px-16 py-2"></span>;
}
