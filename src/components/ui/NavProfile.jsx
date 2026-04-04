import ProfilePic from "./ProfilePic";

export default function NavProfile({ user }) {
  return (
    <div className="flex items-center gap-2 px-2 sm:px-3 md:px-4 cursor-pointer z-50">
      <ProfilePic size="sm" />

      {/* Hide name on very small screens */}
      <p className="hidden sm:block font-body text-sm sm:text-base md:text-lg truncate max-w-[120px]">
        {user?.firstName}
      </p>
    </div>
  );
}
