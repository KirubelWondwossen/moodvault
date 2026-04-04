import { LogOut, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import ProfilePic from "./ProfilePic";

export default function LogoutProfile({ user }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
    setTimeout(() => navigate("/"), 1000);
  };

  return (
    <div
      className="
        absolute right-0 top-full mt-2
        z-[100]

        w-[90vw] sm:w-64
        max-w-xs

        bg-[#191d23]
        rounded-xl
        shadow-lg
        p-4

        flex flex-col items-center gap-3
      "
    >
      <ProfilePic size="md" />

      <p className="font-body text-sm sm:text-base text-center">
        {user?.firstName} {user?.lastName}
      </p>

      {/* Profile */}
      <Link
        to="/profile"
        className="
          w-full flex items-center gap-3
          p-2 rounded-md
          hover:bg-borderColor
          transition
        "
      >
        <User className="w-5 sm:w-6 text-tPrimary" />
        <span className="font-heading text-sm sm:text-base">Profile</span>
      </Link>

      {/* Logout */}
      <div
        onClick={handleLogout}
        className="
          w-full flex items-center gap-3
          p-2 rounded-md
          cursor-pointer
          hover:bg-borderColor
          transition
        "
      >
        <LogOut className="w-5 sm:w-6 text-tPrimary" />
        <span className="font-heading text-sm sm:text-base">Logout</span>
      </div>
    </div>
  );
}
