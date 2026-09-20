import { LandingCmsConfig as LandingCmsConfigContract, CmsSection } from '@apex/shared';

/** Configuración singleton de la landing: toggles, SEO y orden de secciones. */
export class LandingCmsConfig implements LandingCmsConfigContract {
  id: string;
  heroCarouselActive: boolean;
  servicesActive: boolean;
  promotionsActive: boolean;
  membershipsActive: boolean;
  sedesActive: boolean;
  aboutActive: boolean;
  testimonialsActive: boolean;
  faqActive: boolean;
  footerActive: boolean;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  sections: CmsSection[];
}
