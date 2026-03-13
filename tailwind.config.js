import scrollbarHide from "tailwind-scrollbar-hide";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0D1117",
        backgroundSecondary: "#1a1a1a",
        primary: "#58A6FF",
        secondary: "#1F6FEB",
        tPrimary: "#ffffffde",
        tSecondary: "#374151",
        tTertiary: "#9CA3AF",
        text: "#E6EDF3",
        accent: "#F78166",
        borderColor: "#25292e",
      },
      fontFamily: {
        heading: ["Poppins", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [scrollbarHide],
};
