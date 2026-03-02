import { useState } from "react";
import { auth } from "../lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Lock, Mail } from "lucide-react";
import LabelInput from "../components/ui/LabelInput";
import AuthLayout from "../components/Layout/AuthLayout";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    await signInWithEmailAndPassword(auth, email, password);
  };

  return (
    <AuthLayout>
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-8 p-10 bg-[#191d23]/60 rounded-md shadow-md"
      >
        <h2 className="font-heading font-semibold text-2xl text-center">
          Log in to Your Account
        </h2>
        <LabelInput
          label={"Email"}
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={Mail}
        />
        <LabelInput
          label={"Password"}
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon={Lock}
        />
        <button>Login</button>
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
