/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        // AI / terminal dark palette
        brand: {
          50:  '#edfcf9',
          100: '#d2f7f1',
          200: '#a9eee4',
          300: '#71dfd3',
          400: '#38c7ba',
          500: '#1eada0',   // primary teal-cyan
          600: '#168a80',
          700: '#176e67',
          800: '#185754',
          900: '#194946',
          950: '#082d2b',
        },
        surface: {
          950: '#080c0e',   // near-black background
          900: '#0d1417',
          800: '#111b1f',
          700: '#172026',
          600: '#1e2b33',
        },
      },
      animation: {
        'fade-in':      'fadeIn 0.6s ease forwards',
        'slide-up':     'slideUp 0.6s ease forwards',
        'blink':        'blink 1s step-end infinite',
        'gradient-x':   'gradientX 4s ease infinite',
        'float':        'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0' },
        },
        gradientX: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%':      { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
      },
    },
  },
  plugins: [],
}
