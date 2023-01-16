/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      dropShadow: {
        one: '1px 1px 1px rgba(0, 0, 0, 0.3)',
        two: '2px 2px 2px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
};
