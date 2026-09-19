/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        background: "#05070a",
        surface: "#0d1117",
        border: "#1c2129",
        accent: {
          DEFAULT: "#38bdf8",
          dim: "#0ea5e9",
        },
        muted: "#8b949e",
        severity: {
          low: "#22c55e",
          medium: "#f59e0b",
          high: "#ef4444",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};