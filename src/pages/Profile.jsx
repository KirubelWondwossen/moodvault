import { useEffect, useState } from "react";
import MainLayout from "../components/Layout/MainLayout";
import LabelInput from "../components/ui/LabelInput";
import { Lock, UserRoundPlus } from "lucide-react";
import Button from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";
import { updateUserName, updateUserPassword } from "../lib/items";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { validatePassword } from "../utils/validateAuth";
import { getErrorType } from "../utils/getErrorType";

export default function Profile() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loadingName, setLoadingName] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);
  const [errorName, setErrorName] = useState(null);
  const [errorPass, setErrorPass] = useState(null);

  const { user } = useAuth();

  useEffect(() => {
    setFirstName(user.firstName);
    setLastName(user.lastName);
  }, [user]);

  async function handleUpdateName(e) {
    e.preventDefault();

    if (!firstName.trim() || !lastName.trim()) {
      return toast.error("Cannot update empty fields");
    }

    if (firstName === user.firstName && lastName === user.lastName) {
      return toast.error("No changes made");
    }

    setLoadingName(true);
    try {
      await updateUserName(user.uid, { firstName, lastName });
      toast.success("Name updated successfully");
      setErrorName(null);
    } catch (error) {
      console.error("Failed to update name:", error);
      const message = error.message || "Something went wrong";
      toast.error(message);
      setErrorName(message);
    } finally {
      setLoadingName(false);
    }
  }

  async function handleUpdatePassword(e) {
    e.preventDefault();

    const cleanPassword = newPassword.trim();

    if (!cleanPassword) {
      return toast.error("Password cannot be empty");
    }

    if (!validatePassword(cleanPassword)) {
      return toast.error(
        "Password must be at least 8 characters and include a number",
      );
    }

    if (!confirmPassword) {
      return toast.error("Please confirm your password");
    }

    if (cleanPassword !== confirmPassword.trim()) {
      return toast.error("Passwords do not match");
    }

    setLoadingPassword(true);

    try {
      await updateUserPassword(cleanPassword);

      toast.success("Password updated successfully");

      setNewPassword("");
      setConfirmPassword("");
      setErrorPass(null);
    } catch (error) {
      console.error("Failed to update password:", error);

      const message = error.message || "Something went wrong";
      setErrorPass(message);

      if (error.code === "auth/requires-recent-login") {
        toast.error("Session expired. Please log in again.");
      } else {
        toast.error(message);
      }
    } finally {
      setLoadingPassword(false);
    }
  }

  if (errorName || errorPass) {
    return (
      <MainLayout title={"User Profile"}>
        <ErrorScreen type={getErrorType(errorName || errorPass)} />
      </MainLayout>
    );
  }

  return (
    <MainLayout title={"User Profile"}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <ProfileName
          firstName={firstName}
          lastName={lastName}
          setFirstName={setFirstName}
          setLastName={setLastName}
          loading={loadingName}
          error={errorName}
          handleUpdateName={handleUpdateName}
        />

        <ProfilePassword
          password={newPassword}
          setPassword={setNewPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          loading={loadingPassword}
          error={errorPass}
          handleUpdatePassword={handleUpdatePassword}
        />
      </div>
    </MainLayout>
  );
}

function ProfileName({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  loading,
  handleUpdateName,
  error,
}) {
  return (
    <form
      onSubmit={handleUpdateName}
      className="flex flex-col gap-4 sm:gap-5 p-4 sm:p-5 bg-[#191d23]/60 rounded-md shadow-md h-fit w-full"
    >
      <h2 className="font-heading font-semibold text-lg sm:text-xl md:text-2xl text-center">
        Update Name
      </h2>

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      <LabelInput
        required
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

      <Button type="submit">
        {!loading && "Update Name"}
        {loading && <ClipLoader color="#fff" loading={loading} size={20} />}
      </Button>
    </form>
  );
}

function ProfilePassword({
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  loading,
  handleUpdatePassword,
  error,
}) {
  return (
    <form
      onSubmit={handleUpdatePassword}
      className="flex flex-col gap-4 sm:gap-5 p-4 sm:p-5 bg-[#191d23]/60 rounded-md shadow-md w-full"
    >
      <h2 className="font-heading font-semibold text-lg sm:text-xl md:text-2xl text-center">
        Update Password
      </h2>

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      <LabelInput
        required
        label={"New Password"}
        placeholder="New Password"
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

      <p className="text-sm text-tTertiary font-body">
        Minimum length is 8 characters
      </p>

      <Button type="submit">
        {!loading && "Update Password"}
        {loading && <ClipLoader color="#fff" loading={loading} size={20} />}
      </Button>
    </form>
  );
}
