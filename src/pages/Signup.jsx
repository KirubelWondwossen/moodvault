import { useState } from "react";
import { auth } from "../lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../lib/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

// UI
import AuthLayout from "../components/Layout/AuthLayout";
import { Lock, Mail, UserRoundPlus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import LabelInput from "../components/ui/LabelInput";
import Button from "../components/ui/Button";
import { ClipLoader } from "react-spinners";
import { Toaster, toast } from "react-hot-toast";

// ✅ validation helpers
const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const validatePassword = (password) => {
  return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
};

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

    // ✅ validation
    if (!firstName.trim() || !lastName.trim()) {
      return toast.error("First and last name are required");
    }

    if (!email) {
      return toast.error("Email is required");
    }

    if (!validateEmail(email)) {
      return toast.error("Invalid email format");
    }

    if (!password) {
      return toast.error("Password is required");
    }

    if (!validatePassword(password)) {
      return toast.error(
        "Password must be at least 8 characters and include a number",
      );
    }

    if (!confirmPassword) {
      return toast.error("Please confirm your password");
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    setLoading(true);

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
      console.error(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <Toaster position="top-center" />
      <form
        onSubmit={handleSignup}
        className="flex flex-col gap-5 md:gap-8 md:p-10 p-5 bg-[#191d23]/60 rounded-md shadow-md"
      >
        <h2 className="font-heading font-semibold text-xl md:text-2xl text-center">
          Create Your Account
        </h2>

        <div className="flex flex-col md:flex-row gap-2">
          <LabelInput
            required
            type="text"
            placeholder="First name"
            label={"First Name"}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            icon={UserRoundPlus}
          />
          <div className="py-1 md:hidden"></div>
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

        <div className="flex flex-col md:flex-row gap-2">
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
          <div className="py-1 md:hidden"></div>
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
