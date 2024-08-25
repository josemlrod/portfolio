import animations from "@midudev/tailwind-animations";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    colors: {
      primary: "rgb(var(--primaryColor) / <alpha-value>)",
      white: "rgb(var(--white) / <alpha-value>)",
      accent: "rgb(var(--accentColor) / <alpha-value>)",
    },
    extend: {
      keyframes: {
        "slide-down": {
          from: {
            transform: "translateY(0)",
            opacity: "1",
          },
          to: {
            transform: "translateY(100%)",
            display: "none",
          },
        },
      },
      animation: {
        "slide-down": "slide-down 1s forwards",
      },
    },
  },
  plugins: [animations],
};
