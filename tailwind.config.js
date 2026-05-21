/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"SF Pro Display"', "system-ui", "sans-serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
      },
      colors: {
        surface: {
          DEFAULT: "rgba(255, 255, 255, 0.04)",
          hover: "rgba(255, 255, 255, 0.08)",
        },
        accent: {
          violet: "#8B5CF6",
          cyan: "#22D3EE",
          pink: "#F472B6",
        },
      },
      animation: {
        "mesh-shift": "mesh-shift 12s ease-in-out infinite",
        shimmer: "shimmer 2.5s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        "mesh-shift": {
          "0%, 100%": { transform: "translate(0%, 0%) scale(1)" },
          "33%": { transform: "translate(5%, -3%) scale(1.05)" },
          "66%": { transform: "translate(-4%, 4%) scale(0.98)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% center" },
          "100%": { backgroundPosition: "-200% center" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
