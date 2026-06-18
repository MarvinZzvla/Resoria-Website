// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { SITE_ORIGIN, SITE_BASE_PATH } from './site.config.mjs';

const SITE_URL = process.env.SITE_URL ?? SITE_ORIGIN;
const BASE_PATH = process.env.BASE_PATH ?? SITE_BASE_PATH;

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