/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        optimistic: ["Optimistic", "sans-serif"],
      },
      gridTemplateColumns :{
        dashboard: '200px repeat(8,1fr) 234px'
      },
      gridTemplateRows: {
        dashboard: 'repeat(4,1fr)'
      }
    },
  },
  plugins: [],
}

