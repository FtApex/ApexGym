import { Injectable, Inject } from '@nestjs/common';
import { CarouselBanner } from '../domain/carousel-banner';
import type { CarouselBannerRepository } from '../domain/carousel-banner.repository';
import { CAROUSEL_BANNER_REPOSITORY_TOKEN } from '../domain/carousel-banner.repository';

@Injectable()
export class CarouselBannerService {
  constructor(
    @Inject(CAROUSEL_BANNER_REPOSITORY_TOKEN)
    private readonly bannerRepository: CarouselBannerRepository,
  ) {}

  async getAllBanners(): Promise<CarouselBanner[]> {
    return this.bannerRepository.findAll();
  }

  async getBannerById(id: string): Promise<CarouselBanner | null> {
    return this.bannerRepository.findById(id);
  }

  async createBanner(banner: CarouselBanner): Promise<CarouselBanner> {
    return this.bannerRepository.save(banner);
  }

  async updateBanner(
    id: string,
    updatedData: Partial<CarouselBanner>,
  ): Promise<CarouselBanner | null> {
    const existing = await this.bannerRepository.findById(id);
    if (!existing) return null;
    return this.bannerRepository.save(Object.assign(existing, updatedData, { id }));
  }

  async deleteBanner(id: string): Promise<void> {
    return this.bannerRepository.delete(id);
  }
}
