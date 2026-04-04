import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../ui/Logo";
import { Home, Compass, Bookmark, User, X, LogOut, Menu } from "lucide-react";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

export default function Sidebar({
  showSideBar,
  setShowSideBar,
  mobileOpen,
  setMobileOpen,
  children,
}) {
  const show = showSideBar; // ✅ single source of truth

  const location = useLocation();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
    setTimeout(() => navigate("/"), 1000);
  };

  // ✅ Auto close mobile on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Overlay (mobile only) */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[40] md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0
          h-screen
          bg-[#0d1117]
          border-r border-borderColor
          flex flex-col items-center
          transition-all duration-300 ease-in-out
          z-[50]

          ${show ? "w-56" : "w-16"}

          ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between p-2 w-full ${
            !show && "px-4"
          }`}
        >
          {show ? (
            <>
              <Logo />

              <X
                size={24}
                className="cursor-pointer text-tTertiary hover:text-white"
                onClick={() => {
                  if (window.innerWidth < 768) {
                    setMobileOpen(false);
                  } else {
                    setShowSideBar(false); // ✅ FIXED
                  }
                }}
              />
            </>
          ) : (
            <button
              className="text-tTertiary hover:text-white px-1"
              onClick={() => setShowSideBar(true)} // ✅ FIXED
            >
              <Menu size={24} />
            </button>
          )}
        </div>

        {/* Links */}
        <SidebarBtn path="/home" icon={Home} btn="Home" show={show} />
        <SidebarBtn path="/explore" icon={Compass} btn="Explore" show={show} />
        <SidebarBtn path="/myvault" icon={Bookmark} btn="MyVault" show={show} />
        <SidebarBtn path="/profile" icon={User} btn="Profile" show={show} />

        {show && <SectionBreak />}
        {show && children}

        <LogoutBtn handleLogout={handleLogout} show={show} />
      </aside>
    </>
  );
}

// Sidebar Button
function SidebarBtn({ icon: Icon, path, btn, show }) {
  const location = useLocation();

  return (
    <Link to={path} className="w-full">
      <div
        className={`
          ${show ? "flex items-center gap-3" : "flex justify-center"}
          p-2 border-2 border-background
          transition-all duration-300
          hover:border-l-primary hover:text-white

          ${
            location.pathname === path
              ? "border-l-primary text-primary"
              : "text-tTertiary"
          }
        `}
      >
        <Icon size={show ? 24 : 28} />
        {show && <span className="font-heading">{btn}</span>}
      </div>
    </Link>
  );
}

function SectionBreak() {
  return <div className="border-b border-borderColor w-full my-2"></div>;
}

function LogoutBtn({ handleLogout, show }) {
  return (
    <div
      className={`
        mt-auto mb-2 w-full p-2 cursor-pointer border-2 border-background
        flex transition-all duration-300
        hover:border-l-primary text-tTertiary

        ${
          show
            ? "items-center gap-3 justify-start"
            : "items-center justify-center"
        }
      `}
      onClick={handleLogout}
    >
      <LogOut size={show ? 24 : 28} />
      {show && <span className="font-heading">Logout</span>}
    </div>
  );
}
