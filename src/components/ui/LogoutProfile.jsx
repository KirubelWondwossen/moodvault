import { LogOut, User } from "lucide-react";
import { Link } from "react-router-dom";

export default function LogoutProfile({ user, className }) {
  return (
    <div
      className={`flex flex-col items-center gap-2 w-60 shadow-md p-3 rounded-md bg-[#191d23] absolute right-6 top-16 ${className}`}
    >
      <img
        src="/profile-pic.jpg"
        alt="profile picture"
        className="w-12 rounded-full"
      />
      <p className="font-body text-lg">
        {user.firstName} {user.lastName}
      </p>
      <Link
        to={"/profile"}
        className="w-full self-start p-2 flex items-center gap-2 hover:bg-borderColor rounded-md border-background hover:border-l-primary"
      >
        <User className="w-6 text-tPrimary" />
        <span className={`cursor-pointer no-underline font-heading`}>
          Profile
        </span>
      </Link>
      <div className="self-start p-2 flex items-center gap-2 hover:bg-borderColor w-full rounded-md">
        <LogOut className="w-6 text-tPrimary" />
        <span className={`cursor-pointer no-underline font-heading`}>
          Logout
        </span>
      </div>
    </div>
  );
}
