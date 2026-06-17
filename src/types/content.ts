export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  popular?: boolean;
  features: string[];
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  logo: string;
  logoAlt: string;
  accent: 'orange' | 'emerald';
  downloadUrl: string;
  plans: PricingPlan[];
}

export interface SuccessStory {
  videoId: string;
  title: string;
  quote: string;
  author: string;
}

export interface CompareRow {
  aspect: string;
  lifetime: string;
  saas: string;
}

export interface PaymentMethod {
  id: string;
  name: string;
  description: string;
}

export interface SiteContent {
  lang: string;
  locale: string;
  alternateLocale: string;
  seo: {
    title: string;
    description: string;
    ogImageAlt: string;
  };
  nav: {
    products: string;
    licenses: string;
    success: string;
    contact: string;
    langSwitch: string;
  };
  hero: {
    headlinePrefix: string;
    typewriterWords: string[];
    subheadline: string;
    cta: string;
    logoAlt: string;
  };
  productsSection: {
    id: string;
    title: string;
    subtitle: string;
    trialCta: string;
    learnMoreCta: string;
  };
  products: Product[];
  compareSection: {
    id: string;
    title: string;
    subtitle: string;
    lifetimeLabel: string;
    saasLabel: string;
    rows: CompareRow[];
  };
  successSection: {
    id: string;
    title: string;
    subtitle: string;
    stories: SuccessStory[];
  };
  contactSection: {
    id: string;
    title: string;
    subtitle: string;
    steps: { title: string; description: string }[];
    form: {
      name: string;
      email: string;
      phone: string;
      product: string;
      plan: string;
      message: string;
      submit: string;
      productOptions: { value: string; label: string }[];
      planOptions: { value: string; label: string }[];
    };
    contactInfo: {
      email: string;
      phone: string;
      whatsapp: string;
    };
    paymentTitle: string;
    paymentMethods: PaymentMethod[];
  };
  footer: {
    tagline: string;
    rights: string;
    privacy: string;
    terms: string;
  };
}
