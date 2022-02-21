module.exports = {
  content: ["*.html","./src/**/*.{html,js}"],
  mode: 'jit',
  purge: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  theme: {
  extend: {},
  },
  plugins: [],
  }
