/** @type {import('tailwindcss').Config} */
import customConfig from '../custom-config/tailwind.config';
const config = {
  presets: [customConfig],
  plugins: [require('@headlessui/tailwindcss')({ prefix: 'ui' })],
};
export default config;
