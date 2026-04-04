import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../ui/Logo";
import { Home, Compass, Bookmark, User, Menu, X, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

export default function Sidebar({ showSideBar = false, children }) {
  const [show, setShow] = useState(showSideBar);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
    setTimeout(() => navigate("/"), 1000);
  };
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
        path={"/myvault"}
        icon={Bookmark}
        btn={"MyVault"}
        show={show}
      />
      <SidebarBtn path={"/profile"} icon={User} btn={"Profile"} show={show} />
      {show && <SectionBreak />}
      {show && children}

      <LogoutBtn handleLogout={handleLogout} show={show} />
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

function LogoutBtn({ handleLogout, show }) {
  return (
    <div
      className={`mt-auto border-background mb-2 cursor-pointer w-full p-2 border-2 transition-all duration-300 hover:border-l-primary text-tTertiary flex ${
        show
          ? "items-center gap-3 justify-start"
          : "items-center justify-center"
      }`}
      onClick={handleLogout}
    >
      <LogOut size={show ? 24 : 28} />

      {show && (
        <span className="cursor-pointer no-underline font-heading">Logout</span>
      )}
    </div>
  );
}
