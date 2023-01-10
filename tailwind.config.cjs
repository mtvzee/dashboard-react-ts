/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      dropShadow: {
        primary: '2px 2px 2px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
};
