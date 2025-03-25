/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        menu: "var(--menu)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hslvar(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
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
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
    require("tailwindcss-animate"),
  ],
};
