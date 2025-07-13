/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'mono': ['Fira Code', 'Consolas', 'Monaco', 'Courier New', 'monospace'],
      },
      colors: {
        'terminal-green': '#00ff41',
        'terminal-dark': '#000000',
        'terminal-gray': '#888888',
      },
      animation: {
        'blink': 'blink 1s infinite',
        'spin': 'spin 1s linear infinite',
      },
      keyframes: {
        blink: {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        }
      }
    },
  },
  plugins: [],
} 