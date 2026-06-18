// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

// Producción (dominio propio): SITE_URL=https://resoria.com BASE_PATH=/
// GitHub Pages: SITE_URL=https://marvinzzvla.github.io BASE_PATH=/Restoria-Website
const SITE_URL = process.env.SITE_URL ?? 'https://resoria.com';
const BASE_PATH = process.env.BASE_PATH ?? '/';

export default defineConfig({
  site: SITE_URL,
  base: BASE_PATH,
  output: 'static',
  integrations: [sitemap()],

  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: true,
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },
});