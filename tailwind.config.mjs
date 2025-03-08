/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#a869f4",
        primary2: "#6c17d4",
        primary3: "#d99cff",
        secondary: "#130c33",
        dark: "#06000d",
        stroke: "#8350d666"
      },
      fontFamily: {
        'sora': ['var(--font-sora)', 'sans-serif'],
        'orbitron': ['var(--font-orbitron)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
