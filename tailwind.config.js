/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    colors: {
      'sky': colors.sky,
      'red': colors.red,
      'green': colors.green,
      'gray': colors.gray
    },
    extend: {},
  },
  plugins: [],
};
