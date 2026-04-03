import { useEffect, useState } from "react";
import { Features } from "../features/Features";
import ErrorScreen from "../ui/ErrorScreen";

export default function AuthLayout({ children }) {
  const [error, setError] = useState(null);
  useEffect(() => {
    const handleOffline = () => {
      setError("offline");
    };

    const handleOnline = () => {
      setError(null);
    };

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);
  if (error)
    return (
      <div className="h-screen flex flex-col items-center">
        <ErrorScreen type={"offline"} />
      </div>
    );
  return (
    <div className="grid lg:grid-cols-2 min-h-screen p-3 md:p-6 items-center">
      <Features />
      {children}
    </div>
  );
}
