/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2EC4B6', // Teal
          soft: '#90DBA5', // Soft Green
        },
        bg: {
          light: '#F7F9FB', // Light Gray
          dark: '#0F172A', // Dark Mode
        },
        accent: {
          DEFAULT: '#2EC4B6',
          secondary: '#90DBA5',
        }
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
