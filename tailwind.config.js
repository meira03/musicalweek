/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend:{
      colors: {
        slate: {
          1100: '#fefefe',
          1200: '#e7e7e7',
          1300: '#e2e2e2',
          1400: '#cfcfcf',
          1500: '#1e1e1e',
          1600: '#171717',
          1700: '#121212',
          1800: '#0f0f0f',
        }
      }
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
        'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
