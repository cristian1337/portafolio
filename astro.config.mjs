// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://cristian1337.github.io',
  base: '/portafolio',
  vite: {
    plugins: [tailwindcss()]
  }
});