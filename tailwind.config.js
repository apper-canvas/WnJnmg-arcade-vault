/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF2D55',
          light: '#FF6B8B',
          dark: '#CC0029'
        },
        secondary: {
          DEFAULT: '#4D4DFF',
          light: '#8080FF',
          dark: '#0000CC'
        },
        accent: '#FFD700',
        surface: {
          50: '#f8fafc',   // Lightest
          100: '#f1f5f9',
          200: '#e2e8f0', 
          300: '#cbd5e1',
          400: '#94a3b8',  
          500: '#64748b',  
          600: '#475569',  
          700: '#334155',  
          800: '#1e293b',  
          900: '#0f172a'   // Darkest
        },
        arcade: {
          black: '#121212',
          blue: '#0066FF',
          purple: '#6B46C1',
          green: '#10B981',
          yellow: '#FBBF24',
          orange: '#F59E0B',
          red: '#EF4444'
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        heading: ['Inter', 'ui-sans-serif', 'system-ui'],
        pixel: ['"Press Start 2P"', 'cursive']
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        'neu-light': '5px 5px 15px #d1d9e6, -5px -5px 15px #ffffff',
        'neu-dark': '5px 5px 15px rgba(0, 0, 0, 0.3), -5px -5px 15px rgba(255, 255, 255, 0.05)',
        'neon': '0 0 5px #FF2D55, 0 0 10px #FF2D55, 0 0 15px #FF2D55',
        'arcade': '0 0 0 2px #121212, 0 0 0 4px #FFD700'
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem'
      },
      animation: {
        'pixel-shift': 'pixel-shift 0.2s steps(2) infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate'
      },
      keyframes: {
        'pixel-shift': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(2px)' }
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        'glow': {
          '0%': { textShadow: '0 0 5px #FF2D55, 0 0 10px #FF2D55' },
          '100%': { textShadow: '0 0 10px #FF2D55, 0 0 20px #FF2D55, 0 0 30px #FF2D55' }
        }
      }
    }
  },
  plugins: [],
  darkMode: 'class',
}