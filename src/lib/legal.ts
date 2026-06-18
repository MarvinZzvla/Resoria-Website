import type { LegalDocument } from '../types/legal';
import { sitePath } from './assets';
import privacyEs from '../content/legal/es/privacy.json';
import termsEs from '../content/legal/es/terms.json';
import privacyEn from '../content/legal/en/privacy.json';
import termsEn from '../content/legal/en/terms.json';

const documents: Record<string, Record<string, LegalDocument>> = {
  es: {
    privacy: privacyEs as LegalDocument,
    terms: termsEs as LegalDocument,
  },
  en: {
    privacy: privacyEn as LegalDocument,
    terms: termsEn as LegalDocument,
  },
};

export function getLegalDocument(locale: string, type: 'privacy' | 'terms'): LegalDocument {
  return documents[locale]?.[type] ?? documents.es[type];
}

export function getLegalPaths(locale: string) {
  return locale === 'en'
    ? { privacy: sitePath('en/privacy/'), terms: sitePath('en/terms/') }
    : { privacy: sitePath('es/privacidad/'), terms: sitePath('es/terminos/') };
}

export function getLegalAlternatePaths(type: 'privacy' | 'terms') {
  return type === 'privacy'
    ? { es: '/es/privacidad/', en: '/en/privacy/' }
    : { es: '/es/terminos/', en: '/en/terms/' };
}
