import rtl from "tailwindcss-rtl";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        vazir: ["Vazirmatn", "sans-serif"],
        dinnext: ["DINNextArabic", "Vazirmatn", "sans-serif"],
      },
      colors: {
        'color-bg-primary': '#0d1117',
        'color-bg-secondary': '#161b22',
        'color-bg-tertiary': '#21262d',
        'color-text-primary': '#ffffff',
        'color-text-secondary': '#8b949e',
        'color-text-muted': '#6e7681',
      },
    },
  },
  plugins: [rtl()],
}

