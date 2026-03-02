import Logo from "./Logo";
import { Library, ShieldCheck, RefreshCw, CheckCircle } from "lucide-react";

const feats = [
  {
    title: "Personal Watch Vault",
    desc: "Save and organize your movies and anime.",
    icon: Library,
  },
  {
    title: "Secure Accounts",
    desc: "Your data is private and protected.",
    icon: ShieldCheck,
  },
  {
    title: "Real-Time Sync",
    desc: "Changes update instantly.",
    icon: RefreshCw,
  },
  {
    title: "Progress Tracking",
    desc: "Track watching status easily.",
    icon: CheckCircle,
  },
];
export default function AuthLayout({ children }) {
  return (
    <div className="flex p-6 items-center w-screen justify-between">
      <Features />
      {children}
    </div>
  );
}

function Features() {
  return (
    <div className="flex flex-col px-7 w-full">
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
    <div className="flex flex-col gap-1 mt-4 items-start">
      <Icon size={28} className="text-primary" />
      <h3 className="font-header font-semibold text-lg">{data.title}</h3>
      <p className="text-[#9CA3AF]">{data.desc}</p>
    </div>
  );
}
