import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

export default function Home() {
  const { user } = useAuth();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
    setTimeout(() => navigate("/"), 1000);
  };

  return (
    <div className="text-5xl font-bold text-center text-white">
      <Toaster position="top-center" />
      <h1>Hello There {user.firstName}</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
