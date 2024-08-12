import Animations from "open-props/src/animations";
import * as Easing from "open-props/src/easing";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      keyframes: {
        "slide-down": {
          from: {
            transform: "translateY(0)",
            opacity: "1",
          },
          to: {
            transform: "translateY(100%)",
          },
        },
        "slide-up": {
          from: {
            transform: "translateY(20px)",
          },
          to: {
            transform: "translateY(0px)",
          },
        },
      },
      animation: {
        "slide-down": "slide-down 5s forwards",
        "slide-up": `slide-up .5s ${Easing["--ease-1"]}`,
      },
    },
  },
};
