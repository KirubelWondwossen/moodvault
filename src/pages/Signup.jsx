import { useState } from "react";
import { auth } from "../lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../lib/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import AuthLayout from "../components/AuthLayout";
import { Eye, Lock, Mail, UserRoundPlus } from "lucide-react";

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
        className="w-full flex flex-col gap-4 p-4 bg-[#0C1016]"
      >
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
        <button>Create account</button>
      </form>
    </AuthLayout>
  );
}

function LabelInput({ icon: Icon, label, ...props }) {
  return (
    <div className="flex flex-col gap-1 w-full relative">
      {Icon && <Icon className="w-4 absolute bottom-1 left-2" />}

      {props.type === "password" && (
        <Eye className="w-4 absolute bottom-1 right-2" />
      )}
      <label className="font-semibold font-header">{label}</label>
      <input
        className="border rounded-sm shadow-sm outline-none border-none font-body focus:outline-primary pl-8 px-2 py-1"
        {...props}
      />
    </div>
  );
}
