import { Toaster } from "react-hot-toast";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function MainLayout({ children, title, showSideBar }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Toaster position="top-center" />
      <Sidebar showSideBar={showSideBar} />
      <div className="flex flex-col flex-1 px-4">
        <Navbar />
        <h1 className="text-2xl font-bold mb-4">{title}</h1>
        <div className="flex-1 overflow-y-auto scrollbar-hide px-4">
          {children}
        </div>
      </div>
    </div>
  );
}
