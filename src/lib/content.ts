import type { SiteContent } from '../types/content';
import es from '../content/es.json';
import en from '../content/en.json';
import { resolveProductDownloadUrls, type ProductId } from './github-releases';

export { SITE_URL, getAlternateUrl } from './site';

const contentMap: Record<string, SiteContent> = {
  es: es as SiteContent,
  en: en as SiteContent,
};

const downloadUrlsPromise = resolveProductDownloadUrls();

function withDownloadUrls(content: SiteContent, urls: Record<ProductId, string>): SiteContent {
  return {
    ...content,
    products: content.products.map((product) => ({
      ...product,
      downloadUrl: urls[product.id as ProductId] ?? product.downloadUrl,
    })),
  };
}

export async function getContent(locale: string): Promise<SiteContent> {
  const urls = await downloadUrlsPromise;
  const base = contentMap[locale] ?? contentMap.es;
  return withDownloadUrls(base, urls);
}
