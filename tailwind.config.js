/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        "primary-accent": "var(--primary-accent)",
        secondary: "var(--secondary)",
        menu: "var(--menu)",
      },
      fontFamily: {
        headings: "var(--font-headings)",
        base: "var(--font-base)",
        base2: "var(--font-base2)",
        nabla: `"Nabla", serif`,
        pixel: `"VT323", serif`,
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      boxShadow: {
        hard: "0px 0px 10px 10px #737373",
        hardLime: "5px 5px 0 0 #84cc16",
      },
      textShadow: {
        default: "1px 1px 1px var(--tw-shadow-color)",
        blowOut: "0px 0px 1px var(--tw-shadow-color)",
        xl: "0px 0px 1px var(--tw-shadow-color)",
      },
    },
  },
  plugins: [
    function ({ addUtilities, theme, matchUtilities, e }) {
      // Add default text shadow utility
      addUtilities({
        ".text-shadow": {
          textShadow: theme("textShadow.default"),
        },
        ".text-shadow-none": {
          textShadow: "none",
        },
      });

      // Add color variants
      matchUtilities(
        {
          "text-shadow": (value) => ({
            textShadow: `1px 1px 1px ${value}`,
          }),
        },
        { values: theme("colors") }
      );

      // Support for arbitrary values
      matchUtilities(
        {
          "text-shadow": (value) => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") }
      );
    },
  ],
};
