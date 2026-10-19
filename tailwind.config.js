/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          gold: "#C9A84C",
          goldLight: "#E8D5A3",
          red: "#6B1A1A",
          redLight: "#8B2A2A",
          dark: "#1A1410",
          card: "#2A1F18",
          hover: "#3D2C20",
        },
      },
      fontFamily: {
        arabic: ["Aref Ruqaa", "serif"],
        sans: ["Estedad", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease",
        "slide-up": "slideUp 0.5s ease",
      },
      keyframes: {
        fadeIn: { "0%": { opacity: 0 }, "100%": { opacity: 1 } },
        slideUp: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};