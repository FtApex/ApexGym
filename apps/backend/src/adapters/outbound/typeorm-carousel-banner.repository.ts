import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CarouselBannerRepository } from '../../domain/carousel-banner.repository';
import { CarouselBanner } from '../../domain/carousel-banner';
import { CarouselBannerOrmEntity } from './carousel-banner.orm-entity';

@Injectable()
export class TypeOrmCarouselBannerRepository implements CarouselBannerRepository {
  constructor(
    @InjectRepository(CarouselBannerOrmEntity)
    private readonly repository: Repository<CarouselBannerOrmEntity>,
  ) {}

  async findAll(): Promise<CarouselBanner[]> {
    const ormEntities = await this.repository.find({ order: { order: 'ASC' } });
    return ormEntities.map((entity) => this.toDomain(entity));
  }

  async findById(id: string): Promise<CarouselBanner | null> {
    const ormEntity = await this.repository.findOne({ where: { id } });
    return ormEntity ? this.toDomain(ormEntity) : null;
  }

  async save(banner: CarouselBanner): Promise<CarouselBanner> {
    const saved = await this.repository.save(this.toOrm(banner));
    return this.toDomain(saved);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  private toDomain(ormEntity: CarouselBannerOrmEntity): CarouselBanner {
    const banner = new CarouselBanner();
    banner.id = ormEntity.id;
    banner.title = ormEntity.title;
    banner.subtitle = ormEntity.subtitle;
    banner.description = ormEntity.description;
    banner.imageUrl = ormEntity.imageUrl;
    banner.buttonText = ormEntity.buttonText;
    banner.buttonUrl = ormEntity.buttonUrl;
    banner.darkOverlay = ormEntity.darkOverlay;
    banner.startDate = ormEntity.startDate;
    banner.endDate = ormEntity.endDate;
    banner.order = ormEntity.order;
    banner.status = ormEntity.status;
    return banner;
  }

  private toOrm(banner: CarouselBanner): CarouselBannerOrmEntity {
    const ormEntity = new CarouselBannerOrmEntity();
    ormEntity.id = banner.id;
    ormEntity.title = banner.title;
    ormEntity.subtitle = banner.subtitle;
    ormEntity.description = banner.description;
    ormEntity.imageUrl = banner.imageUrl;
    ormEntity.buttonText = banner.buttonText;
    ormEntity.buttonUrl = banner.buttonUrl;
    ormEntity.darkOverlay = banner.darkOverlay;
    ormEntity.startDate = banner.startDate;
    ormEntity.endDate = banner.endDate;
    ormEntity.order = banner.order;
    ormEntity.status = banner.status;
    return ormEntity;
  }
}
