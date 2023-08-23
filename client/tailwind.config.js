/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./public/index.html",
  ],
  theme: {
    fontFamily: {
      main: ['Poppins', 'sans-serif;']
    },
    extend: {
      width: {
        main: '1220px',
      },
      backgroundColor:{
        main: '#ee3131'
      },
      colors:{
        main: '#ee3131'
      }
    },
  },
  plugins: [
    require( "@tailwindcss/line-clamp"),
  ],
}