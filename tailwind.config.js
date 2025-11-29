export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  darkMode: 'class', // 👈 Enable class-based dark mode
  plugins: [
    require('@tailwindcss/typography')
  ],
}