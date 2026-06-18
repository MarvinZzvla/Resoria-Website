import type { APIRoute } from 'astro';
import { absoluteUrl } from '../lib/assets';

export const GET: APIRoute = ({ site }) => {
  const sitemap = absoluteUrl('/sitemap-index.xml', site);

  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
