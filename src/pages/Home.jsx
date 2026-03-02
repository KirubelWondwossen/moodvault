import { useAuth } from "../context/AuthContext";
export default function Home() {
  const { user } = useAuth();

  return (
    <div className="text-5xl font-bold text-center text-white">
      Hello There {user.firstName}
    </div>
  );
}
