/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "selector",
  theme: {
    extend: {
      colors: {
        "weather-primary": "#DEF2FE",
        "weather-secondary": "#add9f7",
        "weather-primary-dark": "#282A37",
        "weather-secondary-dark": "#181A21",
      },
    },
    container: {
      padding: "2em",
      center: true,
    },
    screens: {
      sm: "640px",
      md: "768px",
    },
  },
  plugins: [],
};
