import type { ProductDetail } from '../types/product-detail';
import { sitePath } from './assets';
import easyRestaurantEs from '../content/product-details/es/easy-restaurant.json';
import miInventarioEs from '../content/product-details/es/mi-inventario.json';
import easyRestaurantEn from '../content/product-details/en/easy-restaurant.json';
import miInventarioEn from '../content/product-details/en/mi-inventario.json';

const detailsMap: Record<string, Record<string, ProductDetail>> = {
  es: {
    'easy-restaurant': easyRestaurantEs as ProductDetail,
    'mi-inventario': miInventarioEs as ProductDetail,
  },
  en: {
    'easy-restaurant': easyRestaurantEn as ProductDetail,
    'mi-inventario': miInventarioEn as ProductDetail,
  },
};

export const productSlugs = ['easy-restaurant', 'mi-inventario'] as const;
export type ProductSlug = (typeof productSlugs)[number];

export function getProductDetail(locale: string, slug: string): ProductDetail | undefined {
  return detailsMap[locale]?.[slug];
}

export function getProductDetailPath(locale: string, slug: string): string {
  return sitePath(`${locale}/productos/${slug}/`);
}
