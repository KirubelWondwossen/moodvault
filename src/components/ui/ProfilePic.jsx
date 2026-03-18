import { useAuth } from "../../context/AuthContext";

function getColor(name = "") {
  const colors = [
    "from-red-500 to-pink-500",
    "from-green-500 to-emerald-600",
    "from-blue-500 to-indigo-600",
    "from-yellow-500 to-orange-500",
    "from-purple-500 to-violet-600",
  ];

  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
}

export default function ProfilePic() {
  const { user } = useAuth();

  const initial = user?.firstName?.charAt(0)?.toUpperCase() || "?";

  const color = getColor(user?.firstName || "");
  return (
    <div
      className={`w-12 h-12 rounded-full flex items-center justify-center 
  bg-gradient-to-br ${color} text-white font-semibold text-xl shadow-md`}
    >
      {initial}
    </div>
  );
}
