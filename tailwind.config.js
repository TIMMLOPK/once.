const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        rotate: "rotate 6s linear infinite",
        typing: "typing 5s steps(40, end) normal",
      },
      keyframes: {
        rotate: {
          from: {
            transform: "rotate(360deg)",
          },
          to: {
            transform: "rotate(0deg)",
          },
        },
        typing: {
          from: {
            width: 0,
            "border-right-color": "white",
            "border-right-width": "2px",
          },
          "90%": {
            "border-right-color": "white",
            "border-right-width": "2px",
          },
          to: {
            width: "100%",
            "border-right-color": "transparent",
            "border-right-width": "0px",
          },
        },
      },
      colors: {
        hover: "rgba(255, 255, 255, 0.103)",
      },
      dropShadow: {
        logo: "0 0 0.3rem #ffffff70",
      },
      boxShadow: {
        logo: "0px 2px 8px -1px #0000001a",
        small: "0 5px 10px rgba(0, 0, 0, 0.12)",
        medium: "0 8px 30px rgba(0, 0, 0, 0.12)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          "animation-delay": (value) => {
            return {
              "animation-delay": value,
            };
          },
        },
        {
          values: theme("transitionDelay"),
        }
      );
    }),
  ],
};
