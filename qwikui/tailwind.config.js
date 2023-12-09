const defaultTheme = require('tailwindcss/defaultTheme');
const qwikuiColors = {
  blue: {
    10: '#F7FAFF',
    25: '#F3F7FF',
    50: '#E7EFFF',
    100: '#C4D7FF',
    200: '#9EBDFF',
    300: '#77A2FF',
    400: '#598EFF',
    500: '#457DF5',
    600: '#336BE3',
    700: '#2159D1',
    800: '#194DBD',
    900: '#113FA1',
    1000: '#00226A',
  },
  rose: {
    50: '#FFE7EA',
    100: '#FFC3CC',
    200: '#FF9BAB',
    300: '#FF7389',
    400: '#FF506B',
    500: '#EE3F5A',
    600: '#DF304B',
    700: '#CD1E39',
    800: '#BB0C27',
    900: '#950017',
  },
  orange: {
    50: '#FFF1E7',
    100: '#FFD9BD',
    200: '#FFC093',
    300: '#FFA869',
    400: '#FF8F3E',
    500: '#FF7714',
    600: '#DE5E00',
    700: '#B14A00',
    800: '#843700',
    900: '#5C2700',
  },
  yellow: {
    50: '#FFF9E2',
    100: '#FFF5CE',
    200: '#FFE89E',
    300: '#FFD76D',
    400: '#FFC749',
    500: '#FFAD0D',
    600: '#DB8C09',
    700: '#B76F06',
    800: '#935404',
    900: '#7A4102',
  },
  green: {
    50: '#DEF5EF',
    100: '#ADE5D6',
    200: '#74D5BC',
    300: '#27C3A1',
    400: '#00B58D',
    500: '#00A57B',
    600: '#00986F',
    700: '#00875F',
    800: '#007751',
    900: '#005A35',
  },
  purple: {
    50: '#F4E9FF',
    100: '#DFC3FD',
    200: '#CB9CFC',
    300: '#B687E7',
    400: '#A172D2',
    500: '#8C5DBD',
    600: '#7E4FAF',
    700: '#6B3C9C',
    800: '#5A2B8B',
    900: '#461777',
  },
  cyan: {
    50: '#E1F8FB',
    100: '#B4EDF4',
    200: '#83E2ED',
    300: '#53D5E6',
    400: '#30CCDF',
    500: '#19C3DA',
    600: '#16B2C7',
    700: '#139DAD',
    800: '#108995',
    900: '#0B6669',
  },
  neutral: {
    0: '#FFFFFF',
    10: '#F7F9FB',
    25: '#F0F3F8',
    50: '#E5E9F0',
    100: '#D2D8E2',
    200: '#B6BDCB',
    300: '#9CA5B4',
    400: '#8A94A4',
    500: '#798395',
    600: '#677183',
    700: '#576071',
    800: '#3C4554',
    900: '#29313F',
  },
};
const customLineHeights = {
      'heading-1': '4rem',
      'heading-2': '2.75rem',
      'heading-3': '2.25rem',
      'heading-4': '1.75rem',
      'heading-5': '1.5rem',
      'body-1': '1.375rem',
      'body-2': '1.125rem',
      'body-3': '1rem',
    }


module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    colors: {
      ...qwikuiColors,
      primary: qwikuiColors.blue,
    },

    lineHeight: customLineHeights,


    textColor: {
      ...qwikuiColors,
      highlight: qwikuiColors.blue[500],
      heading: qwikuiColors.neutral[900],
      'sub-heading': qwikuiColors.neutral[700],
      body: qwikuiColors.neutral[500],
      disable: qwikuiColors.neutral[200],
      invert: qwikuiColors.neutral[0],
      'sub-invert': qwikuiColors.neutral[50],
      error: qwikuiColors.rose[500],
      warning: qwikuiColors.yellow[600],
      success: qwikuiColors.green[500],
      info: qwikuiColors.blue[700],
      'hyperlink-normal': qwikuiColors.blue[500],
      'hyperlink-hover': qwikuiColors.blue[300],
      'hyperlink-pressed': qwikuiColors.blue[700],
      'hyperlink-visited': qwikuiColors.blue[700],
    },

    fontSize: {
      'heading-1': ['3rem', customLineHeights['heading-1']],
      'heading-2': ['2rem',  customLineHeights['heading-2']],
      'heading-3': ['1.5rem',  customLineHeights['heading-3']],
      'heading-4': ['1.25rem', customLineHeights['heading-4']],
      'heading-5': ['1rem',  customLineHeights['heading-5']],
      'body-1': ['0.875rem',  customLineHeights['body-1']],
      'body-2': ['0.75rem',  customLineHeights['body-2']],
      'body-3': ['0.6875rem', customLineHeights['body-3']],
    },

    fontWeight: {
      'bold': 700,
      'semibold': 600,
      'regular': 400
    },

    boxShadow: {
      'level-1': "0px 4px 16px 0px #113FA114", // Dropdown list, suggestion list,...
      'level-2': "0px 8px 24px 0px #113FA11F", // Dialog, pop-over, walk-through, app bar, navigation bar,...
      'level-3': "0px 12px 48px 0px #113FA13D" // Floating components
    },

    extend: {
      fontFamily: {
        sans: ["'Inter'", ...defaultTheme.fontFamily.sans],
      },
      backgroundColor: {
        transparent: "transparent"
      }
    },
  },
  plugins: ['postcss-import'],
  darkMode: 'class',
};
