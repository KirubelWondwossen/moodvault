import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Loader } from "../components/ui/Loader";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loader loading={loading} page={"page"} />;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
}
