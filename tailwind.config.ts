import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        tgdd: {
          yellow: "#ffd400",
          yellowHover: "#f0c500",
          black: "#333333",
          red: "#d0021b",
          blue: "#288ad6",
          grayBg: "#f3f4f6",
        },
      },
    },
  },
  plugins: [],
};
export default config;
