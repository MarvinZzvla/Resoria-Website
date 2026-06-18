import type { SiteContent } from '../types/content';
import es from '../content/es.json';
import en from '../content/en.json';

const contentMap: Record<string, SiteContent> = {
  es: es as SiteContent,
  en: en as SiteContent,
};

export function getContent(locale: string): SiteContent {
  return contentMap[locale] ?? contentMap.es;
}

export const SITE_URL = 'https://resorias.com';

export function getAlternateUrl(locale: string): string {
  return `${SITE_URL}/${locale}/`;
}
