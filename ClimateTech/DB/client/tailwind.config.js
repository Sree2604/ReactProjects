/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/index.css",
  ],
  theme: {
    extend: {
      fontFamily:{
        body:['Crafty Girls'],
        head:['Gloria Hallelujah'],
        marker:['Permanent Marker'],
        header:['Russo One'],
        navhead:['Courgette'],
        sidehead:['Courgette'],
        sidebody:['Sriracha'],
        admin:['Lato']
      },
    },
  },
  plugins: [],
}