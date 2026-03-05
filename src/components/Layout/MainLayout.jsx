import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function MainLayout({ children }) {
  return (
    <div className="flex w-full h-screen overflow-hidden">
      <div className="w-1/5 h-full">
        <Sidebar />
      </div>
      <div className="flex flex-col">
        <Navbar />
        {children}
      </div>
    </div>
  );
}
