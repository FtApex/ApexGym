import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LandingCmsConfigRepository } from '../../domain/landing-cms-config.repository';
import { LandingCmsConfig } from '../../domain/landing-cms-config';
import { LandingCmsConfigOrmEntity } from './landing-cms-config.orm-entity';

/** Id fijo de la fila singleton de configuración. */
export const LANDING_CMS_CONFIG_ID = 'landing-cms';

@Injectable()
export class TypeOrmLandingCmsConfigRepository implements LandingCmsConfigRepository {
  constructor(
    @InjectRepository(LandingCmsConfigOrmEntity)
    private readonly repository: Repository<LandingCmsConfigOrmEntity>,
  ) {}

  async find(): Promise<LandingCmsConfig | null> {
    const ormEntity = await this.repository.findOne({
      where: { id: LANDING_CMS_CONFIG_ID },
    });
    return ormEntity ? this.toDomain(ormEntity) : null;
  }

  async save(config: LandingCmsConfig): Promise<LandingCmsConfig> {
    const ormEntity = this.toOrm(config);
    ormEntity.id = LANDING_CMS_CONFIG_ID;
    const saved = await this.repository.save(ormEntity);
    return this.toDomain(saved);
  }

  private toDomain(ormEntity: LandingCmsConfigOrmEntity): LandingCmsConfig {
    const config = new LandingCmsConfig();
    config.id = ormEntity.id;
    config.heroCarouselActive = ormEntity.heroCarouselActive;
    config.servicesActive = ormEntity.servicesActive;
    config.promotionsActive = ormEntity.promotionsActive;
    config.membershipsActive = ormEntity.membershipsActive;
    config.sedesActive = ormEntity.sedesActive;
    config.aboutActive = ormEntity.aboutActive;
    config.testimonialsActive = ormEntity.testimonialsActive;
    config.faqActive = ormEntity.faqActive;
    config.footerActive = ormEntity.footerActive;
    config.seoTitle = ormEntity.seoTitle;
    config.seoDescription = ormEntity.seoDescription;
    config.seoKeywords = ormEntity.seoKeywords;
    config.sections = [...(ormEntity.sections ?? [])].sort((a, b) => a.order - b.order);
    return config;
  }

  private toOrm(config: LandingCmsConfig): LandingCmsConfigOrmEntity {
    const ormEntity = new LandingCmsConfigOrmEntity();
    ormEntity.id = config.id;
    ormEntity.heroCarouselActive = config.heroCarouselActive;
    ormEntity.servicesActive = config.servicesActive;
    ormEntity.promotionsActive = config.promotionsActive;
    ormEntity.membershipsActive = config.membershipsActive;
    ormEntity.sedesActive = config.sedesActive;
    ormEntity.aboutActive = config.aboutActive;
    ormEntity.testimonialsActive = config.testimonialsActive;
    ormEntity.faqActive = config.faqActive;
    ormEntity.footerActive = config.footerActive;
    ormEntity.seoTitle = config.seoTitle;
    ormEntity.seoDescription = config.seoDescription;
    ormEntity.seoKeywords = config.seoKeywords;
    ormEntity.sections = config.sections ?? [];
    return ormEntity;
  }
}
