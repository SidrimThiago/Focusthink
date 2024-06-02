/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./App.js/**/*.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}", "./Api/**/*.{js, jsx, ts, tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'quick-bold': "Quicksand-Bold",
        'quick-regular': "Quicksand-Regular",
        'quick-medium': "Quicksand-Medium"
      }
    },
  },
  plugins: [],
}

