export interface ProductDetailStep {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

export interface ProductDetailScreenshot {
  src: string;
  alt: string;
  caption: string;
}

export interface ProductDetailTutorial {
  videoId: string;
  title: string;
  duration: string;
}

export interface ProductDetailStory {
  videoId: string;
  quote: string;
  author: string;
  business: string;
}

export interface ProductDetailBenefit {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

export interface ProductDetail {
  slug: string;
  seo: {
    title: string;
    description: string;
  };
  heroGif: string;
  backLabel: string;
  whatIs: {
    title: string;
    paragraphs: string[];
  };
  whoIsItFor: {
    title: string;
    headlinePrefix: string;
    typewriterWords: string[];
    subtitle: string;
  };
  benefits: {
    title: string;
    items: ProductDetailBenefit[];
  };
  howItWorks: {
    title: string;
    steps: ProductDetailStep[];
  };
  screenshots: {
    title: string;
    items: ProductDetailScreenshot[];
  };
  tutorials: {
    title: string;
    items: ProductDetailTutorial[];
  };
  successStories: {
    title: string;
    items: ProductDetailStory[];
  };
  pricingSection: {
    title: string;
    subtitle: string;
    contactCta: string;
  };
  cta: {
    trial: string;
    pricing: string;
    downloadLabel: string;
    downloadSublabel: string;
  };
}
