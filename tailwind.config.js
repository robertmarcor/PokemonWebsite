/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
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
        hard: "5px 5px 0 0 #737373",
        hardLime: "5px 5px 0 0 #84cc16",
      },
    },
  },
  plugins: [],
};
