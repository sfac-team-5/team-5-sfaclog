import customConfig from '../../packages/custom-config/tailwind.config';
const config = {
  presets: [customConfig],
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  plugins: [
    require('@headlessui/tailwindcss')({ prefix: 'ui' }),
    require('tailwind-scrollbar-hide'),
  ],
};
export default config;
