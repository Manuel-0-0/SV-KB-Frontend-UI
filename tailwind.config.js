/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      height: {
        'a4': '70.1875rem',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}