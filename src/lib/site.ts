import { SITE_ORIGIN, SITE_BASE_PATH, SITE_PUBLIC_URL } from '../../site.config.mjs';

export { SITE_ORIGIN, SITE_BASE_PATH, SITE_PUBLIC_URL };

export const SITE_URL = SITE_PUBLIC_URL;

export function getAlternateUrl(locale: string): string {
  return `${SITE_PUBLIC_URL}/${locale}/`;
}
