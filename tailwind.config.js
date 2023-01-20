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
        text: "text 5s ease infinite",
        fadeIn: "fadeIn 0.5s ease-in-out forwards",
        fadeOut: "fadeOut 0.5s ease-in-out forwards",
        rotate: "rotate 6s linear infinite",
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
        text: {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        fadeIn: {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0px)",
          },
        },
        fadeOut: {
          "0%": {
            opacity: "1",
            transform: "translateY(0px)",
          },
          "100%": {
            opacity: "0",
            transform: "translateY(10px)",
          },
        },
      },
      colors: {
        wbg: "rgba(255, 255, 255, 0.2)",
        hoverbg: "rgba(255, 255, 255, 0.103)",
        hoverbg2: "rgba(133, 132, 132, 0.05)",
        startRgba: "rgba(228, 232, 233, 1)",
        endRgba: "rgba(239, 245, 249, 1)",
      },
      dropShadow: {
        logo: "0 0 0.3rem #ffffff70",
      },
      boxShadow: {
        logo: "0px 2px 8px -1px #0000001a",
      },
    },
  },
  plugins: [],
};
