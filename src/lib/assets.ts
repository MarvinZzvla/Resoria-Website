function normalizeBase(base: string): string {
  if (!base || base === '/') return '/';
  return base.endsWith('/') ? base : `${base}/`;
}

/** Ruta interna del sitio con prefijo base */
export function sitePath(path: string): string {
  const base = normalizeBase(import.meta.env.BASE_URL);
  const normalized = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${normalized}`;
}

/** Ruta pública con prefijo base (GitHub Pages, subcarpetas, etc.) */
export function publicAsset(path: string): string {
  return sitePath(path);
}

/** URL absoluta del sitio, incluyendo base path si existe */
export function absoluteUrl(path: string, site?: URL | string): string {
  const siteHref = (typeof site === 'string' ? site : site?.href) ?? 'https://resoria.com';
  const origin = siteHref.replace(/\/$/, '');
  const base = normalizeBase(import.meta.env.BASE_URL);
  const root = base === '/' ? `${origin}/` : `${origin}${base}`;
  return new URL(path.replace(/^\//, ''), root).href;
}
