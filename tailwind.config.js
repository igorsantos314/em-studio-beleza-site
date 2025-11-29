/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'serif': ['Playfair Display', 'Georgia', 'serif'],
        'sans': ['Montserrat', 'system-ui', 'sans-serif'],
      },
      colors: {
        'studio': {
          beige: '#E8DDD3',
          brown: '#2C2420',
          'brown-light': '#5C4F45',
          'brown-medium': '#4A3F38',
          tan: '#C8B8A8',
        },
      },
    },
  },
  plugins: [],
}

