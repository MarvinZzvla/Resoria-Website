export interface LegalSection {
  title: string;
  paragraphs: string[];
}

export interface LegalDocument {
  slug: string;
  seo: {
    title: string;
    description: string;
  };
  title: string;
  lastUpdated: string;
  intro: string;
  sections: LegalSection[];
  contactNote: string;
}
