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
        lg: '1024px',
      },
      colors: {
        primary: {
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
        White: '#FFFFFF',
        stroke: {
          blue: '#99BDFF',
          10: '#E6E6E6',
          5: '#F3F3F3',
        },
        background: {
          100: '#666666',
          5: '#F8F8F9',
          blue: '#F5F8FF',
        },
        system: {
          warning: '#FF0000',
          success: '#07A320',
        },
      },
    },
  },
  plugins: [],
};

export default customConfig;
