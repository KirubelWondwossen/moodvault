import Logo from "../ui/Logo";
import { Brain, Sparkles, Compass, Bookmark } from "lucide-react";

const feats = [
  {
    title: "Mood-Based Recommendations",
    desc: "Discover movies, TV shows, and anime based on how you feel. Select a mood and get personalized suggestions instantly.",
    icon: Brain,
  },
  {
    title: "AI-Powered Suggestions",
    desc: "Get smarter recommendations using AI that adapts to your mood and preferences, helping you find the perfect content every time.",
    icon: Sparkles,
  },
  {
    title: "Explore Trending Content",
    desc: "Browse trending, popular, and top-rated movies, TV shows, and anime all in one place with a clean and intuitive interface.",
    icon: Compass,
  },
  {
    title: "Personal Watch Vault",
    desc: "Save and manage your favorite content in your personal vault. Add, remove, and organize what you want to watch anytime.",
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
