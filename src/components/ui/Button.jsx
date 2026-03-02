export default function Button({ children, type = "button", ...props }) {
  return (
    <button
      type={type}
      className="bg-primary hover:bg-secondary text-white font-semibold px-4 py-2 rounded transition duration-200"
      {...props}
    >
      {children}
    </button>
  );
}
