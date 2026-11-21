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

function isProductAvailable(product: SiteContent['products'][number]): boolean {
  return product.available !== false;
}

function withDownloadUrls(content: SiteContent, urls: Record<ProductId, string>): SiteContent {
  const products = content.products
    .filter(isProductAvailable)
    .map((product) => ({
      ...product,
      downloadUrl: urls[product.id as ProductId] ?? product.downloadUrl,
    }));

  const visibleIds = new Set(products.map((product) => product.id));
  const productOptions = content.contactSection.form.productOptions.filter(
    (option) => !option.value || visibleIds.has(option.value),
  );

  return {
    ...content,
    products,
    contactSection: {
      ...content.contactSection,
      form: {
        ...content.contactSection.form,
        productOptions,
      },
    },
  };
}

export async function getContent(locale: string): Promise<SiteContent> {
  const urls = await downloadUrlsPromise;
  const base = contentMap[locale] ?? contentMap.es;
  return withDownloadUrls(base, urls);
}
