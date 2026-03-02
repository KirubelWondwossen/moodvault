import { useState } from "react";
import { auth } from "../lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../lib/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import AuthLayout from "../components/AuthLayout";
import { Eye, EyeOff, Lock, Mail, UserRoundPlus } from "lucide-react";
import { Link } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    const cred = await createUserWithEmailAndPassword(auth, email, password);

    await setDoc(doc(db, "users", cred.user.uid), {
      uid: cred.user.uid,
      email: cred.user.email,
      firstName: firstName,
      lastName: lastName,
      createdAt: serverTimestamp(),
    });
  };

  return (
    <AuthLayout>
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
            type="text"
            placeholder="Last name"
            value={lastName}
            label={"Last Name"}
            onChange={(e) => setLastName(e.target.value)}
            icon={UserRoundPlus}
          />
        </div>
        <LabelInput
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
              label={"Password"}
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={Lock}
            />
            <LabelInput
              label={"Confirm Password"}
              placeholder="Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              icon={Lock}
            />
          </div>
          <p className="text-sm text-tTertiary font-body">
            Minimum length is 8 characters
          </p>
        </div>
        <button className="bg-primary hover:bg-secondary transition duration-200">
          Create account
        </button>
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

function LabelInput({ icon: Icon, type, label, ...props }) {
  const [showPass, setShowPass] = useState(false);
  const handleShowPass = () => setShowPass(!showPass);
  const isPassword = type === "password";
  return (
    <div className="flex flex-col gap-1 w-full relative">
      {Icon && (
        <Icon className="w-4 absolute bottom-2 left-2 text-tTertiary z-50" />
      )}
      {isPassword &&
        (showPass ? (
          <EyeOff
            className="w-4 absolute bottom-2 right-2 cursor-pointer z-50"
            onClick={handleShowPass}
          />
        ) : (
          <Eye
            className="w-4 absolute bottom-2 right-2 cursor-pointer z-50"
            onClick={handleShowPass}
          />
        ))}
      <label className="font-semibold font-header">{label}</label>
      <input
        className="border bg-[#191d23] rounded-sm shadow-sm outline-none border-none font-body focus:outline-primary pl-8 px-2 py-2 text-tTertiary"
        {...props}
        type={isPassword && showPass ? "text" : type}
      />
    </div>
  );
}
