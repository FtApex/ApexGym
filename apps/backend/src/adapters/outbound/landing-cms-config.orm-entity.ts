import { Entity, PrimaryColumn, Column } from 'typeorm';
import type { CmsSection } from '@apex/shared';

/** Fila única (id fijo) con la configuración de la landing pública. */
@Entity('landing_cms_config')
export class LandingCmsConfigOrmEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  heroCarouselActive: boolean;

  @Column()
  servicesActive: boolean;

  @Column()
  promotionsActive: boolean;

  @Column()
  membershipsActive: boolean;

  @Column()
  sedesActive: boolean;

  @Column()
  aboutActive: boolean;

  @Column()
  testimonialsActive: boolean;

  @Column()
  faqActive: boolean;

  @Column()
  footerActive: boolean;

  @Column()
  seoTitle: string;

  @Column('text')
  seoDescription: string;

  @Column('text')
  seoKeywords: string;

  /** Orden y visibilidad de las secciones, editable desde el CMS. */
  @Column('json')
  sections: CmsSection[];
}
