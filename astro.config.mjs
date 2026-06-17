// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

// Cambia esta URL por tu dominio real antes de desplegar
const SITE_URL = 'https://resoria.com';

export default defineConfig({
  site: SITE_URL,
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