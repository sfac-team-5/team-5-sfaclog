import customConfig from '../../packages/custom-config/tailwind.config';
const config = {
  presets: [customConfig],
  theme: {
    extend: {
      keyframes: {
        fadeAndShrink: {
          '0%': {
            opacity: '1',
            transform: 'translate(-50%, -50%) scale(1)',
          },
          '50%': {
            opacity: '0',
            transform: 'translate(-50%, -50%) scale(0)',
          },
          '51%, 100%': {
            opacity: '1',
            transform: 'translate(-50%, -50%) scale(1)',
          },
        },
        rise: {
          '0%': { bottom: '-120%', opacity: '1' },
          '50%': { bottom: '-45%', opacity: '1' },
          '100%': { bottom: '-45%', opacity: '0' },
        },
        slideOutAndIn: {
          '0%': { left: '-10%' },
          '50%, 100%': { left: '110%' },
        },
      },
      animation: {
        fadeAndShrink: 'fadeAndShrink 5s infinite',
        rise: 'rise 5s infinite',
        slideOutAndIn: 'slideOutAndIn 5s infinite',
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  plugins: [
    require('@headlessui/tailwindcss')({ prefix: 'ui' }),
    require('tailwind-scrollbar-hide'),
  ],
};
export default config;
