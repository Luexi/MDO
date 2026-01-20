// @ts-check
import { defineConfig } from 'astro/config';

import svelte from '@astrojs/svelte';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel/static';

// https://astro.build/config
export default defineConfig({
  site: 'https://mdo-steel.vercel.app',
  output: 'static',
  adapter: vercel(),
  integrations: [svelte()],

  vite: {
    plugins: [tailwindcss()]
  }
});