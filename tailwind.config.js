/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

const config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'summer-gradient': 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.1))',
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite', 
      }
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        summer: {
          primary: "#ff6b6b",     
          secondary: "#feca57",
          accent: "#1dd1a1",
          neutral: "#2f3542",     
          "base-100": "#ffffff",
          info: "#48dbfb",
          success: "#1dd1a1",
          warning: "#feca57",
          error: "#ff6b6b",
        },
      },
    ],
  },
};

export default config;