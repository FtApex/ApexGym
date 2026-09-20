import { CarouselBanner } from './carousel-banner';

export interface CarouselBannerRepository {
  findAll(): Promise<CarouselBanner[]>;
  findById(id: string): Promise<CarouselBanner | null>;
  save(banner: CarouselBanner): Promise<CarouselBanner>;
  delete(id: string): Promise<void>;
}

export const CAROUSEL_BANNER_REPOSITORY_TOKEN = Symbol('CarouselBannerRepository');
