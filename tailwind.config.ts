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
      // Spacing
      spacing: {
        1: "2px",
        2: "4px",
        3: "6px",
        4: "8px",
        5: "12px",
        6: "16px",
        7: "24px",
        8: "32px",
        9: "40px",
        10: "48px",
        11: "56px",
        12: "64px",
        13: "72px",
        14: "80px",
        15: "96px",
        16: "120px",
      },
      // Colors
      colors: {
        primary: {
          500: "#3066BE",
          400: "#6D9DC5",
          300: "#119DA4",
          200: "#80DED9",
          100: "#AEECEF",
        },
      },
    },
  },
  plugins: [],
};
export default config;
