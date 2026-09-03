/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0a0a0b',
          soft: '#111113',
          charcoal: '#151517',
          line: '#232326'
        },
        paper: {
          DEFAULT: '#f5f5f3',
          dim: '#c9c9c7',
          mute: '#8a8a8e'
        },
        canon: {
          red: '#e0202b',
          deep: '#8c1014'
        }
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif']
      },
      letterSpacing: {
        tightest: '-0.04em'
      },
      transitionTimingFunction: {
        cinematic: 'cubic-bezier(0.16, 1, 0.3, 1)'
      }
    }
  },
  plugins: []
}
