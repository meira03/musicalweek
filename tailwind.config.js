/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ["class"],
  theme: {
    extend: {
      backgroundImage: {
        'neon-blue-gradient': "linear-gradient(172deg, rgba(6,37,92,1) 0%, rgba(3,21,57,1) 20%, rgba(1,13,35,1) 50%, rgba(1,6,25,1) 80%, rgba(0,6,22,1) 100%)"
      },
      colors: {
        'black' : {
          100 : '#0f0f0f',
          200 : '#0c0c0c',
          300 : '#0a0a0a',
          400 : '#080808',
          500 : '#060606',
          600 : '#040404',
          700 : '#020202',
          800 : '#010101',
          900 : '#000000'
        },
        'neon-blue' : {
          100 : '#16f4ff',
          200 : '#1ee1fd',
          300 : '#02b7fe',
          400 : '#0c75e8',
          500 : '#0b3ca5',
          600 : '#013392',
          700 : '#052153',
          800 : '#030f29',
          900 : '#000616',
        }
      },
      fontFamily: {
        'tech': ['Tech']
      }
    },
  },
  plugins: [],
}
