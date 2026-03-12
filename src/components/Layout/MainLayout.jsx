import { Toaster } from "react-hot-toast";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function MainLayout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden w-screen justify-center">
      <Toaster position="top-center" />
      <div className="w-1/5 h-full">
        <Sidebar />
      </div>
      <div className="flex flex-col w-full px-4">
        <Navbar />
        {children}
      </div>
    </div>
  );
}
