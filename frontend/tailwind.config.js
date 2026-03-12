/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // VedaMind design tokens
        veda: {
          violet: '#7c3aed',
          'violet-light': '#a78bfa',
          blue: '#2563eb',
          'blue-light': '#93c5fd',
          green: '#86efac',    // pastel green accent
          coral: '#fb7185',    // CTA coral
          dark: '#0f0a1a',
          surface: '#1a1028',
          glass: 'rgba(255,255,255,0.06)',
        },
      },
      backgroundImage: {
        'veda-gradient': 'linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)',
        'veda-hero': 'linear-gradient(135deg, #0f0a1a 0%, #1a1028 50%, #0d1a2e 100%)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4,0,0.6,1) infinite',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
    },
  },
  plugins: [],
};
