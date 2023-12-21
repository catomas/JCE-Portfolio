/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryTransparent: "var(--primary-transparent)",
        primary100: "var(--primary-100)",
        primary200: "var(--primary-200)",
        primary300: "var(--primary-300)",
        primary400: "var(--primary-400)",
        primary500: "var(--primary-500)",
        primary600: "var(--primary-600)",
        primary700: "var(--primary-700)",
        secondary100: "var(--secondary-100)",
        secondary200: "var(--secondary-200)",
        secondary300: "var(--secondary-300)",
        secondary400: "var(--secondary-400)",
        secondary500: "var(--secondary-500)",
        secondary600: "var(--secondary-600)",
        secondary700: "var(--secondary-700)",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        primary: {
          DEFAULT: "var(--primary)",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },

    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    fontFamily: {
      vollkorn: "var(--font-vollkorn)",
      workSans: "var(--font-work-sans)",
    },
  },
  plugins: [require("tailwindcss-animate")],
};
