/* eslint-disable import/no-extraneous-dependencies,global-require */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./pages/**/*.js', './src/**/*.js'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
        serif: ['Lora', ...defaultTheme.fontFamily.serif],
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
