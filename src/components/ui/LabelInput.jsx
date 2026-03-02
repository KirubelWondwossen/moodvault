import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function LabelInput({ icon: Icon, type, label, ...props }) {
  const [showPass, setShowPass] = useState(false);
  const handleShowPass = () => setShowPass(!showPass);
  const isPassword = type === "password";
  return (
    <div className="flex flex-col gap-1 w-full relative">
      {Icon && (
        <Icon className="w-4 absolute bottom-2 left-2 text-tTertiary z-50" />
      )}
      {isPassword &&
        (showPass ? (
          <EyeOff
            className="w-4 absolute bottom-2 right-2 cursor-pointer z-50"
            onClick={handleShowPass}
          />
        ) : (
          <Eye
            className="w-4 absolute bottom-2 right-2 cursor-pointer z-50"
            onClick={handleShowPass}
          />
        ))}
      <label className="font-semibold font-header">{label}</label>
      <input
        className="border bg-[#191d23] rounded-sm shadow-sm outline-none border-none font-body focus:outline-primary pl-8 px-2 py-2 text-tTertiary"
        {...props}
        type={isPassword && showPass ? "text" : type}
      />
    </div>
  );
}
