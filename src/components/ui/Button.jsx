export default function Button({ children, ...props }) {
  return (
    <button
      className="bg-primary hover:bg-secondary transition duration-200"
      {...props}
    >
      {children}
    </button>
  );
}
