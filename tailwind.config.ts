import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "sans-serif"],
      },
      colors: {
        brand: {
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
        },
      },
      animation: {
        "aurora-1": "aurora 20s ease-in-out infinite alternate",
        "aurora-2": "aurora 28s ease-in-out infinite alternate-reverse",
        "aurora-3": "aurora 35s ease-in-out infinite alternate",
        "float-square-1": "floatSquare 30s linear infinite",
        "float-square-2": "floatSquare 40s linear infinite reverse",
        "float-square-3": "floatSquare 35s linear infinite",
      },
      keyframes: {
        aurora: {
          "0%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(5%, 10%) scale(1.15)" },
          "100%": { transform: "translate(-3%, 5%) scale(0.95)" },
        },
        floatSquare: {
          "0%": { transform: "translateY(100vh) rotate(0deg)", opacity: "0" },
          "10%": { opacity: "0.06" },
          "90%": { opacity: "0.06" },
          "100%": { transform: "translateY(-20vh) rotate(360deg)", opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
