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
      filter: {
        'goo-12': 'url(#goo-12)',
      },
      keyframes: {
        splash12: {
          '40%': {
            backgroundColor: '#866efb',
            boxShadow: '0 -18px 0 -8px #866efb, 16px -8px 0 -8px #866efb, 16px 8px 0 -8px #866efb, 0 18px 0 -8px #866efb, -16px 8px 0 -8px #866efb, -16px -8px 0 -8px #866efb',
          },
          '100%': {
            backgroundColor: '#866efb',
            boxShadow: '0 -36px 0 -10px transparent, 32px -16px 0 -10px transparent, 32px 16px 0 -10px transparent, 0 36px 0 -10px transparent, -32px 16px 0 -10px transparent, -32px -16px 0 -10px transparent',
          },
        },
      },
      animation: {
        splash12: 'splash12 0.6s ease forwards',
      },
    },
  },
  plugins: [],
}

