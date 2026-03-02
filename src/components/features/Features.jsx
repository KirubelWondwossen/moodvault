import Logo from "../ui/Logo";
import { Library, ShieldCheck, RefreshCw, CheckCircle } from "lucide-react";

const feats = [
  {
    title: "Personal Watch Vault",
    desc: "Save movies, anime, and series in one organized space. Categorize them by status, mood, and progress so you always know what to watch next.",
    icon: Library,
  },
  {
    title: "Secure Accounts",
    desc: "Your vault is protected with secure authentication. Every list is private and tied to your account no one else can access your data.",
    icon: ShieldCheck,
  },
  {
    title: "Real-Time Sync",
    desc: "All changes update instantly across devices. Add, edit, or remove items and see updates in real-time without refreshing the page.",
    icon: RefreshCw,
  },
  {
    title: "Progress Tracking",
    desc: "Track what you’re watching, mark items as completed, and monitor your progress so your entertainment journey stays organized.",
    icon: CheckCircle,
  },
];

export function Features() {
  return (
    <div className="flex flex-col px-7">
      <Logo />
      <h1 className="font-header font-bold text-4xl">Core Features</h1>
      {feats.map((feature, index) => (
        <FeaturesCard key={index} data={feature} icon={feature.icon} />
      ))}
    </div>
  );
}
// eslint-disable-next-line
function FeaturesCard({ data, icon: Icon }) {
  return (
    <div className="flex flex-col gap-1 mt-4">
      <Icon size={28} className="text-primary" />
      <h3 className="font-header font-semibold text-lg">{data.title}</h3>
      <p className="text-[#9CA3AF] text-sm">{data.desc}</p>
    </div>
  );
}
