/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        agri: {
          50: '#F4F9F4',
          100: '#E8F5E9',
          200: '#C8E6C9',
          300: '#A5D6A7',
          400: '#81C784',
          500: '#4CAF50',
          600: '#2E7D32',
          700: '#1B5E20',
          800: '#154719',
          900: '#0E3011',
          forest: '#143826',
          emerald: '#1F5B3C',
          leaf: '#3B8A5A',
          sage: '#6D987A',
          lime: '#84CC16',
        },
        cream: {
          50: '#FDFCF9',
          100: '#FAF7F0',
          200: '#F4EFE3',
          300: '#EDE4D1',
          400: '#DFD3BA',
          500: '#C9B99A',
          600: '#A49373',
          bg: '#FAF8F3',
          card: '#FFFFFF',
          border: '#E8E1D5',
          muted: '#8C8270',
        },
        earth: {
          50: '#FAF6F0',
          100: '#F2ECE1',
          700: '#4A3B2C',
          800: '#34291E',
          900: '#221B13',
        }
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
        serif: [
          '"Newsreader"',
          'Georgia',
          'serif',
        ],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(27, 94, 32, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'elevated': '0 12px 32px -4px rgba(20, 56, 38, 0.12), 0 4px 12px -2px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}
