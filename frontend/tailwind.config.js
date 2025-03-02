/** @type {import('tailwindcss').Config} */

export default {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // ✅ Includes all components
    "./src/styles/**/*.{css}"     // ✅ Ensures Tailwind works in CSS Modules
  ],
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
