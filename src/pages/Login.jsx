import { useState } from "react";
import { auth } from "../lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Mail } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    await signInWithEmailAndPassword(auth, email, password);
  };

  return (
    <form
      onSubmit={handleLogin}
      className="flex flex-col gap-8 p-10 bg-[#191d23]/60 rounded-md shadow-md"
    >
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
    </form>
  );
}
