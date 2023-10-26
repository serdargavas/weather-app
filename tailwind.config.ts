import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Screen breakpoints
      screens: {
        sm: "320px",
        sm_md: "600px",
        md: "740px",
        md_lg: "1000px",
        lg: "1200px",
        lg_xl: "1500px",
        xl: "1800px",
      },
      // Font
      fontFamily: {
        poppins: ["var(--font-poppins)"],
      },
    },
  },
  plugins: [],
};
export default config;
