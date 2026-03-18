import ProfilePic from "./ProfilePic";

export default function NavProfile({ user }) {
  return (
    <div className={"gap-2 px-4 flex items-center cursor-pointer z-50"}>
      <ProfilePic />
      <p className="font-body text-lg">{user.firstName}</p>
    </div>
  );
}
