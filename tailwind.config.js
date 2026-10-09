/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#0B0710",
          900: "#12091C",
          850: "#180D26",
          800: "#1F1130",
          700: "#2A1843",
          600: "#3A2359",
        },
        violet: {
          50: "#F5F2FF",
          100: "#EBE4FF",
          200: "#D7C9FF",
          300: "#BCA2FF",
          400: "#9E74FF",
          500: "#8345F6",
          600: "#6D28D9",
          700: "#5B21B6",
          800: "#4A1A93",
          900: "#3B1572",
        },
        orange: {
          300: "#FFC08A",
          400: "#FF9E52",
          500: "#FF7A18",
          600: "#EA5F00",
        },
      },
      fontFamily: {
        display: ['"Savira March"', "Cormorant", "Georgia", "serif"],
        serif: ['"Source Serif Pro"', '"Source Serif 4"', "Georgia", "serif"],
      },
      letterSpacing: {
        widest2: "0.35em",
      },
    },
  },
  plugins: [],
};
