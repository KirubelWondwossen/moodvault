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

export default function ProfilePic({ size = "md" }) {
  const { user } = useAuth();

  const initial = user?.firstName?.charAt(0)?.toUpperCase() || "?";
  const color = getColor(user?.firstName || "");

  const sizeClasses = {
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-12 h-12 text-xl",
  };

  return (
    <div
      className={`
        ${sizeClasses[size]}
        rounded-full
        flex items-center justify-center
        bg-gradient-to-br ${color}
        text-white font-semibold
        shadow-md
      `}
    >
      {initial}
    </div>
  );
}
