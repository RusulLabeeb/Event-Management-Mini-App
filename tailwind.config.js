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
          DEFAULT: '#1FD3BA', // Teal - تركواز مشرق
          light: '#48E5D5',
          dark: '#17A89E',
        },
        secondary: '#FFD93D', // Yellow - أصفر مشرق
        accent: {
          DEFAULT: '#5B8DEE', // Blue - أزرق
          teal: '#1FD3BA',
        },
        bg: {
          light: '#F5F7FA',
          dark: '#0F172A',
        },
      },
      backgroundImage: {
        'gradient-teal': 'linear-gradient(135deg, #1FD3BA 0%, #48E5D5 100%)',
        'gradient-blue': 'linear-gradient(135deg, #5B8DEE 0%, #7EA1FF 100%)',
        'gradient-hero': 'linear-gradient(135deg, #5B8DEE 0%, #1FD3BA 100%)',
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
