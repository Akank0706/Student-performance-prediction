import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0f7ff",
          100: "#e0effe",
          200: "#bae0fd",
          300: "#7cc8fb",
          400: "#36acf7",
          500: "#0c92eb",
          600: "#0074ca",
          700: "#005ca3",
          800: "#054f86",
          900: "#0a426f",
          950: "#062a4a",
        },
        accent: {
          red: "#ef4444",
          amber: "#f59e0b",
          emerald: "#10b981",
          indigo: "#6366f1",
          violet: "#8b5cf6",
        },
        surface: {
          DEFAULT: "#ffffff",
          glass: "rgba(255, 255, 255, 0.7)",
        }
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Outfit", "sans-serif"],
      },
      boxShadow: {
        premium: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
        glass: "0 8px 32px 0 rgba(31, 38, 135, 0.07)",
      },
    },
  },
  plugins: [],
};
export default config;
