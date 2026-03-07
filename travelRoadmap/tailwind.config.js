/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
      colors: {
        brand: {
          50: '#e8f4f8',
          100: '#d0e8f0',
          200: '#9ec1d7',
          300: '#6da8c4',
          400: '#3d8fb1',
          500: '#18465a',
          600: '#143d4f',
          700: '#103444',
          800: '#0c2b39',
          900: '#08222e',
        },
        ocean: {
          50: '#f0f7fa',
          100: '#daedf4',
          200: '#b5dbe9',
          300: '#9ec1d7',
          400: '#7aadc5',
          500: '#5699b3',
          600: '#18465a',
        },
        navy: {
          DEFAULT: '#1b1c27',
          light: '#2a2b38',
          dark: '#12131b',
        },
        warm: {
          DEFAULT: '#65403a',
          light: '#7d5650',
          dark: '#4d302c',
          50: '#f5efee',
          100: '#e8d9d6',
          200: '#d4b5af',
        },
        offwhite: {
          DEFAULT: '#eff1ee',
          dark: '#e2e5e1',
          light: '#f7f8f7',
        },
        teal: {
          50: '#e8f4f8',
          100: '#d0e8f0',
          200: '#a1d1e1',
          300: '#72bbd2',
          400: '#43a4c3',
          500: '#18465a',
          600: '#143d4f',
          700: '#103444',
          800: '#0c2b39',
          900: '#08222e',
        },
        sunset: {
          400: '#65403a',
          500: '#7d5650',
          600: '#4d302c',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'fade-in-down': 'fadeInDown 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-in-left': 'slideInLeft 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'bounce-slow': 'bounce 3s infinite',
        'pulse-glow': 'pulseGlow 2s infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(24, 70, 90, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(24, 70, 90, 0.6)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
