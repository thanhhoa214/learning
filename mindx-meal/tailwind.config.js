const { guessProductionMode } = require('@ngneat/tailwind');

process.env.TAILWIND_MODE = guessProductionMode() ? 'build' : 'watch';

module.exports = {
  prefix: '',
  mode: 'jit',
  content: ['./src/**/*.{html,ts,scss}'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#ff7f5f',
          100: '#ff7555',
          200: '#ff6b4b',
          300: '#ff6141',
          400: '#f85737',
          500: '#ee4d2d',
          600: '#e44323',
          700: '#da3919',
          800: '#d02f0f',
          900: '#c62505'
        }
      },
      height: {
        main: 'calc(100vh - 64px)'
      },
      minHeight: {
        main: 'calc(100vh - 64px)'
      }
    }
  },
  variants: {
    extend: {}
  },
  corePlugins: {
    preflight: false
  }
};
