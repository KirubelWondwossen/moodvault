import { Link } from "react-router-dom";

export default function Logo({ className }) {
  return (
    <Link
      to="/home"
      className={`${className} font-header sm:text-xs md:text-xl font-bold text-primary`}
    >
      🎬 MoodVault
    </Link>
  );
}
