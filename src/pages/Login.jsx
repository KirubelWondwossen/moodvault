import { useState } from "react";
import { auth } from "../lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Lock, Mail } from "lucide-react";
import LabelInput from "../components/ui/LabelInput";
import AuthLayout from "../components/Layout/AuthLayout";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import { ClipLoader } from "react-spinners";
import { Navigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import ErrorScreen from "../components/ui/ErrorScreen";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { user } = useAuth();
  if (user) return <Navigate to="/home" />;

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.error("Email and password are required");
    }

    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successfull");
      setLoading(false);
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
      setError(error);
      setLoading(false);
    }
  };

  if (error)
    return (
      <div className="h-screen flex flex-col items-center">
        <ErrorScreen />
      </div>
    );
  return (
    <AuthLayout>
      <Toaster position="top-center" />
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-6 md:gap-8 md:p-10 p-6 bg-[#191d23]/60 rounded-md shadow-md"
      >
        <h2 className="font-heading font-semibold text-xl md:text-2xl text-center">
          Log in to Your Account
        </h2>
        <LabelInput
          required
          label={"Email"}
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={Mail}
        />
        <LabelInput
          required
          label={"Password"}
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon={Lock}
        />
        <Button type="submit">
          {!loading && "Log in"}
          {loading && <ClipLoader color="#fff" loading={loading} size={20} />}
        </Button>
        <span className="text-center">
          Don't have an account?{" "}
          <Link className="text-primary font-semibold" to={"/signup"}>
            Sign up
          </Link>
        </span>
      </form>
    </AuthLayout>
  );
}
