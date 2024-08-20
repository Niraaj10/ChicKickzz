/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom': 'rgba(100, 100, 111, 0.2) 0px 7px 45px 0px;',
      },
    },
  },
  plugins: [],
}

