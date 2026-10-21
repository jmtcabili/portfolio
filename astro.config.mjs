// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Used for canonical URLs, Open Graph URLs and the sitemap.
  site: 'https://jmtcabili.dev',
  integrations: [sitemap()],
  // Optimize images at build time; pages are prerendered, so no runtime Cloudflare Images calls.
  adapter: cloudflare({ imageService: 'compile' }),
  vite: {
    plugins: [tailwindcss()],
  },
});