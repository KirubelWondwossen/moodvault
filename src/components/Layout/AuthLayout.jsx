import { Features } from "../features/Features";

export default function AuthLayout({ children }) {
  return (
    <div className="grid lg:grid-cols-2 min-h-screen p-3 md:p-6 items-center">
      <Features />
      {children}
    </div>
  );
}
