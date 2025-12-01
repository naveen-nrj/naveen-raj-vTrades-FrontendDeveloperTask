import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-source-sans)", "sans-serif"], 
      },
      colors: {
        background: "#17181E",
      },
      fontSize: {
        size12: "12px",
        size14: "14px"
      },
    },
  },
  plugins: [],
} satisfies Config;