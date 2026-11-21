import type { ProductDetail } from '../types/product-detail';
import { sitePath } from './assets';
import easyRestaurantEs from '../content/product-details/es/easy-restaurant.json';
import miInventarioEs from '../content/product-details/es/mi-inventario.json';
import auditSoftEs from '../content/product-details/es/audit-soft.json';
import softSchoolsEs from '../content/product-details/es/soft-schools.json';
import easyRestaurantEn from '../content/product-details/en/easy-restaurant.json';
import miInventarioEn from '../content/product-details/en/mi-inventario.json';
import auditSoftEn from '../content/product-details/en/audit-soft.json';
import softSchoolsEn from '../content/product-details/en/soft-schools.json';

const detailsMap: Record<string, Record<string, ProductDetail>> = {
  es: {
    'easy-restaurant': easyRestaurantEs as ProductDetail,
    'mi-inventario': miInventarioEs as ProductDetail,
    'audit-soft': auditSoftEs as ProductDetail,
    'soft-schools': softSchoolsEs as ProductDetail,
  },
  en: {
    'easy-restaurant': easyRestaurantEn as ProductDetail,
    'mi-inventario': miInventarioEn as ProductDetail,
    'audit-soft': auditSoftEn as ProductDetail,
    'soft-schools': softSchoolsEn as ProductDetail,
  },
};

/** Slugs públicos (páginas generadas). AuditSoft queda oculto por ahora. */
export const productSlugs = ['easy-restaurant', 'mi-inventario', 'soft-schools'] as const;
export type ProductSlug = (typeof productSlugs)[number];

/** Productos SaaS cuyo CTA de prueba apunta al app externo */
export const saasTrialProductIds = new Set<string>(['audit-soft', 'soft-schools']);

export function getProductDetail(locale: string, slug: string): ProductDetail | undefined {
  // Oculto temporalmente: no servir página de detalle pública
  if (slug === 'audit-soft') return undefined;
  return detailsMap[locale]?.[slug];
}

export function getProductDetailPath(locale: string, slug: string): string {
  return sitePath(`${locale}/productos/${slug}/`);
}
