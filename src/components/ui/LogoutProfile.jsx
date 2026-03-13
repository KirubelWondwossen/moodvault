import { LogOut, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

export default function LogoutProfile({ user }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
    setTimeout(() => navigate("/"), 1000);
  };

  return (
    <div className="flex flex-col z-50 items-center gap-2 w-60 shadow-md p-3 rounded-md bg-[#191d23] absolute right-0 top-full mt-2">
      <img
        src="/profile-pic.jpg"
        alt="profile picture"
        className="w-12 rounded-full"
      />

      <p className="font-body text-lg">
        {user.firstName} {user.lastName}
      </p>

      <Link
        to={"/profile"}
        className="w-full self-start p-2 flex items-center gap-2 hover:bg-borderColor rounded-md"
      >
        <User className="w-6 text-tPrimary" />
        <span className="font-heading">Profile</span>
      </Link>

      <div
        onClick={handleLogout}
        className="cursor-pointer self-start p-2 flex items-center gap-2 hover:bg-borderColor w-full rounded-md"
      >
        <LogOut className="w-6 text-tPrimary" />
        <span className="font-heading">Logout</span>
      </div>
    </div>
  );
}
