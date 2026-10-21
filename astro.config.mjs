// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  // Optimize images at build time; pages are prerendered, so no runtime Cloudflare Images calls.
  adapter: cloudflare({ imageService: 'compile' }),
  vite: {
    plugins: [tailwindcss()],
  },
});