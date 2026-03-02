import { Features } from "../features/Features";

export default function AuthLayout({ children }) {
  return (
    <div className="grid grid-cols-2 min-h-screen p-6 items-center">
      <Features />
      {children}
    </div>
  );
}
