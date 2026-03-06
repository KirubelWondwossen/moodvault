export default function NavProfile({ user }) {
  return (
    <div className={"gap-2 px-3 flex items-center cursor-pointer"}>
      <img
        src="/profile-pic.jpg"
        alt="profile picture"
        className="w-10 rounded-full"
      />
      <p className="font-body text-lg">{user.firstName}</p>
    </div>
  );
}
