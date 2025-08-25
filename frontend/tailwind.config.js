/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cyber-blue': '#00d4ff',
        'cyber-green': '#00ff88',
        'cyber-red': '#ff1744',
        'cyber-purple': '#8b5cf6',
        'dark-bg': '#0a0a0a',
        'dark-card': '#1a1a1a',
        'dark-secondary': '#111111',
        'red-primary': '#ff1744',
        'red-secondary': '#d50000',
        'red-accent': '#ff5722',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #ff1744, 0 0 10px #ff1744, 0 0 15px #ff1744' },
          '100%': { boxShadow: '0 0 10px #ff1744, 0 0 20px #ff1744, 0 0 30px #ff1744' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      }
    },
  },
  plugins: [],
}
