import { useState } from "react";
import { auth } from "../lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../lib/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

// UI
import AuthLayout from "../components/Layout/AuthLayout";
import { Lock, Mail, UserRoundPlus } from "lucide-react";
import { Link } from "react-router-dom";
import LabelInput from "../components/ui/LabelInput";
import Button from "../components/ui/Button";
import { ClipLoader } from "react-spinners";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!password || !email || !firstName || !lastName) {
      setLoading(false);
      return toast.error("All fields must be filled");
    }

    if (password !== confirmPassword) {
      setLoading(false);
      return toast.error("Passwords do not match");
    }

    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);

      await setDoc(doc(db, "users", cred.user.uid), {
        uid: cred.user.uid,
        email: cred.user.email,
        firstName,
        lastName,
        createdAt: serverTimestamp(),
      });

      toast.success("Account created successfully");
      setTimeout(() => navigate("/"), 1000);
    } catch (error) {
      console.log(error.message);

      console.error(error.message);
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <Toaster position="top-center" />
      <form
        onSubmit={handleSignup}
        className="flex flex-col gap-8 p-10 bg-[#191d23]/60 rounded-md shadow-md"
      >
        <h2 className="font-heading font-semibold text-2xl text-center">
          Create Your Account
        </h2>
        <div className="flex gap-2">
          <LabelInput
            type="text"
            placeholder="First name"
            label={"First Name"}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            icon={UserRoundPlus}
          />
          <LabelInput
            required
            type="text"
            placeholder="Last name"
            value={lastName}
            label={"Last Name"}
            onChange={(e) => setLastName(e.target.value)}
            icon={UserRoundPlus}
          />
        </div>
        <LabelInput
          required
          label={"Email"}
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={Mail}
        />
        <div className="flex flex-col gap-1">
          <div className="flex gap-2">
            <LabelInput
              required
              label={"Password"}
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={Lock}
              min="8"
            />
            <LabelInput
              required
              label={"Confirm Password"}
              placeholder="Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              icon={Lock}
              min="8"
            />
          </div>
          <p className="text-sm text-tTertiary font-body">
            Minimum length is 8 characters
          </p>
        </div>
        <Button type="submit">
          {!loading && "Create account"}
          {loading && <ClipLoader color="#fff" loading={loading} size={20} />}
        </Button>
        <span className="text-center">
          Already have an account?{" "}
          <Link className="text-primary font-semibold" to={"/"}>
            Login
          </Link>
        </span>
      </form>
    </AuthLayout>
  );
}
