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
      colors: {
        primary: {
          100: '#0059ff',
        },
      },
    },
  },
  plugins: [],
};

export default customConfig;
