/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: "#028DE3",
        light: "#171717",
        dark: "#292a31",
        gray: { light: "#F5F7F9" },
      },

      fontFamily: {
        Manrope: ["Manrope", "sans-serif"],
      },
    },

    screens: {
      xs: "425px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  plugins: [],
};
