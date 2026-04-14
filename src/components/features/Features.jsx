import Logo from "../ui/Logo";
import { Brain, Sparkles, Compass, Bookmark } from "lucide-react";

const feats = [
  {
    title: "Mood-Based Recommendations",
    desc: "Discover movies, TV shows, and anime based on how you feel. Select a mood and get dynamic suggestions with infinite scroll for continuous discovery.",
    icon: Brain,
  },
  {
    title: "AI-Powered Suggestions",
    desc: "Get intelligent recommendations powered by AI that adapts to your mood and viewing patterns, helping you find content faster.",
    icon: Sparkles,
  },
  {
    title: "Smart Vault Recommendations",
    desc: "Receive personalized suggestions based on what you’ve saved in your vault, making your watchlist smarter over time.",
    icon: Compass,
  },
  {
    title: "Personal Watch Vault",
    desc: "Save, manage, and organize your favorite content. Add or remove items anytime and keep track of what you want to watch.",
    icon: Bookmark,
  },
];
export function Features() {
  return (
    <div className="lg:flex flex-col px-7 hidden">
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
