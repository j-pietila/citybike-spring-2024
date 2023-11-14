/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "inter": ["Inter", "sans-serif"]
      },
      screens: {
        "md": "1000px"
      }
    },
  },
  plugins: [],
}

