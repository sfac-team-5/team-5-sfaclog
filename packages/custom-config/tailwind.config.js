/** @type {import('tailwindcss').Config} */
const customConfig = {
  content: [
    // apps content
    `./app/**/*.{js,ts,jsx,tsx}`,
    `./components/**/*.{js,ts,jsx,tsx}`,
    // packages content
    '../../packages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ['var(--font-pretendard)'],
      },
      screens: {
        sm: '360px',
        md: '768px',
        lg: '1440px',
      },
      container: {
        screens: {
          lg: '1440px',
        },
        padding: {
          lg: '240px',
        },
        center: true,
      },
      boxShadow: {
        custom: '0 4px 16px 0 rgba(7, 46, 120, 0.14)',
      },
      fontSize: {
        H0M32: [
          '32px',
          { fontWeight: 500, lineHeight: 'normal', letterSpacing: 0 },
        ],
        H1B24: [
          '24px',
          { fontWeight: 700, lineHeight: 'normal', letterSpacing: 0 },
        ],
        H1M24: [
          '24px',
          { fontWeight: 500, lineHeight: 'normal', letterSpacing: 0 },
        ],
        H1R24: [
          '24px',
          { fontWeight: 400, lineHeight: 'normal', letterSpacing: 0 },
        ],
        H2B20: [
          '20px',
          { fontWeight: 700, lineHeight: 'normal', letterSpacing: 0 },
        ],
        H2M20: [
          '20px',
          { fontWeight: 500, lineHeight: 'normal', letterSpacing: 0 },
        ],
        H2R20: [
          '20px',
          { fontWeight: 400, lineHeight: 'normal', letterSpacing: 0 },
        ],
        H3B18: [
          '18px',
          { fontWeight: 700, lineHeight: 'normal', letterSpacing: 0 },
        ],
        H3M18: [
          '18px',
          { fontWeight: 500, lineHeight: 'normal', letterSpacing: 0 },
        ],
        H3R18: [
          '18px',
          { fontWeight: 400, lineHeight: 'normal', letterSpacing: 0 },
        ],
        B1B16: [
          '16px',
          { fontWeight: 700, lineHeight: 'normal', letterSpacing: 0 },
        ],
        B1M16: [
          '16px',
          { fontWeight: 500, lineHeight: 'normal', letterSpacing: 0 },
        ],
        B1R16: [
          '16px',
          { fontWeight: 400, lineHeight: 'normal', letterSpacing: 0 },
        ],
        B2B14: [
          '14px',
          { fontWeight: 700, lineHeight: '150%', letterSpacing: 0 },
        ],
        B2M14: [
          '14px',
          { fontWeight: 500, lineHeight: '150%', letterSpacing: 0 },
        ],
        B2R14: [
          '14px',
          { fontWeight: 400, lineHeight: '150%', letterSpacing: 0 },
        ],
        B3B12: [
          '12px',
          { fontWeight: 700, lineHeight: 'normal', letterSpacing: 0 },
        ],
        B3M12: [
          '12px',
          { fontWeight: 500, lineHeight: 'normal', letterSpacing: 0 },
        ],
        B3R12: [
          '12px',
          { fontWeight: 400, lineHeight: 'normal', letterSpacing: 0 },
        ],
        B4B12: [
          '12px',
          { fontWeight: 700, lineHeight: '130%', letterSpacing: 0 },
        ],
        B4M12: [
          '12px',
          { fontWeight: 500, lineHeight: '130%', letterSpacing: 0 },
        ],
        B4R12: [
          '12px',
          { fontWeight: 400, lineHeight: '130%', letterSpacing: 0 },
        ],
        B5R10: [
          '10px',
          { fontWeight: 400, lineHeight: 'normal', letterSpacing: 0 },
        ],
        B6R10: [
          '8px',
          { fontWeight: 400, lineHeight: 'normal', letterSpacing: 0 },
        ],
      },
      colors: {
        neutral: {
          100: '#030303',
          90: '#1A1A1A',
          80: '#333333',
          70: '#4D4D4D',
          60: '#666666',
          50: '#808080',
          40: '#999999',
          30: '#B3B3B3',
          20: '#CCCCCC',
          10: '#E6E6E6',
          5: '#F3F3F3',
        },
        brand: {
          100: '#0059FF',
          90: '#196AFF',
          80: '#337AFF',
          70: '#4C8BFF',
          60: '#669BFF',
          50: '#7FACFF',
          40: '#99BDFF',
          30: '#B2CDFF',
          20: '#CCDEFF',
          10: '#E5EEFF',
          5: '#F5F8FF',
        },
        highlight: {
          warning: '#FF0000',
          success: '#07A320',
        },
        text: {
          primary: '#1A1A1A',
          secondary: '#4D4D4D',
          point: '#196AFF',
          gray: '#999999',
          white: '#FFFFFF',
          waring: '#FF0000',
          success: '#07A320',
        },
        state: {
          90: '#196AFF',
          70: '#4C8BFF',
          10: '#E5EEFF',
          popup: '#E5E9F2',
        },
        stroke: {
          50: '#7FACFF',
          30: '#B3B3B3',
        },
        background: {
          white: '#FFFFFF',
          10: '#E6E6E6',
          5: '#F3F3F3',
        },
      },
    },
  },
  plugins: [],
};

export default customConfig;
