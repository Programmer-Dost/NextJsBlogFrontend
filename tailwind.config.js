/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

 
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
    },
    extend: {
      colors:{
        primary:'cyan',
        'primary-dark': '#00bebe',
      },
    },
    fontFamily:{
      sans:["Alkatra", "sans-serif"]
    },
  },
  plugins: [],
}

