import type { SiteContent } from '../types/content';
import es from '../content/es.json';
import en from '../content/en.json';

export { SITE_URL, getAlternateUrl } from './site';

const contentMap: Record<string, SiteContent> = {
  es: es as SiteContent,
  en: en as SiteContent,
};

export function getContent(locale: string): SiteContent {
  return contentMap[locale] ?? contentMap.es;
}
