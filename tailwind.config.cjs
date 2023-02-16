/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{tsx,ts,jsx,js}', './index.html'],
  theme: {
    extend: {},
    colors: {
      yellow: '#F4AE5C',
      'light-gray': '#E0DED9',
      gray: '#C8C8C8',
      white: '#FFFFFF',
      black: '#0D140D',
      black5: 'rgba(0,0,0,.05)',
      black20: 'rgba(0,0,0,.2)',
      black40: 'rgba(0,0,0,.4)',
      black60: 'rgba(0,0,0,.6)',
      black80: 'rgba(0,0,0,.8)',
      orange: '#E87540',
      'light-orange': '#F4AE5C',
      red: '#E51414',
    },
  },
  plugins: [],
};
