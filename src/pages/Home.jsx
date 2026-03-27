import MainLayout from "../components/Layout/MainLayout";
import { Tags } from "../components/ui/Tags";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user } = useAuth();
  return (
    <MainLayout title={`Welcome, ${user.firstName}`}>
      <MoodPicker />
    </MainLayout>
  );
}

function MoodPicker() {
  return (
    <div className="flex gap-3 flex-col">
      <h3 className="font-heading font-semibold text-lg ">
        How are you feeling today?
      </h3>
      <div className="flex gap-5 ">
        <Tags tag={"Sad"} />
        <Tags tag={"Happy"} />
        <Tags tag={"Chill "} />
        <Tags tag={"Excited"} />
      </div>
    </div>
  );
}
