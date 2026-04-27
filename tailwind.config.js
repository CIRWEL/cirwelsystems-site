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
        cyber: {
          cyan: '#00d4e6',
          magenta: '#e040e0',
          blue: '#0066ff',
          purple: '#8b00ff',
          green: '#00e077',
          yellow: '#ffff00',
          orange: '#ff6600',
        },
        dark: {
          950: '#0e0e18',
          900: '#0c0c14',
          800: '#151520',
          700: '#1c1c28',
          600: '#252532',
          500: '#2e2e3c',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'gradient': 'gradient 8s ease infinite',
        'glitch-1': 'glitch-1 2s infinite linear alternate-reverse',
        'glitch-2': 'glitch-2 3s infinite linear alternate-reverse',
        'scan': 'scan 8s linear infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'glitch-1': {
          '0%': { clipPath: 'inset(40% 0 61% 0)' },
          '20%': { clipPath: 'inset(92% 0 1% 0)' },
          '40%': { clipPath: 'inset(43% 0 1% 0)' },
          '60%': { clipPath: 'inset(25% 0 58% 0)' },
          '80%': { clipPath: 'inset(54% 0 7% 0)' },
          '100%': { clipPath: 'inset(58% 0 43% 0)' },
        },
        'glitch-2': {
          '0%': { clipPath: 'inset(25% 0 58% 0)' },
          '20%': { clipPath: 'inset(54% 0 7% 0)' },
          '40%': { clipPath: 'inset(58% 0 43% 0)' },
          '60%': { clipPath: 'inset(40% 0 61% 0)' },
          '80%': { clipPath: 'inset(92% 0 1% 0)' },
          '100%': { clipPath: 'inset(43% 0 1% 0)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
      backgroundSize: {
        '300%': '300%',
        '200%': '200%',
      },
    },
  },
  plugins: [],
}
