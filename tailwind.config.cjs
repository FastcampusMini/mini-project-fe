/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{tsx,ts,jsx,js}', './index.html'],
  theme: {
    extend: {
      animation: {
        wave: 'wave 2s linear infinite',
      },
      keyframes: {
        wave: {
          '0%': { transform: 'rotate(0.0deg)' },
          '10%': { transform: 'rotate(14deg)' },
          '20%': { transform: 'rotate(-8deg)' },
          '30%': { transform: 'rotate(14deg)' },
          '40%': { transform: 'rotate(-4deg)' },
          '50%': { transform: 'rotate(10.0deg)' },
          '60%': { transform: 'rotate(0.0deg)' },
          '100%': { transform: 'rotate(0.0deg)' },
        },
        ping: {
          '75%': { transform: 'scale(2)', opacity: 0 },
        },
      },
    },
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
  plugins: [
    require('tailwind-scrollbar'),
    require('@tailwindcss/custom-forms'),
    require('tailwindcss'),
    require('autoprefixer'),
  ],
  variants: {
    scrollbar: ['rounded'],
  },
};
