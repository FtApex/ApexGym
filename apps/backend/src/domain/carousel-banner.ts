import { CarouselBanner as CarouselBannerContract } from './shared/types';

export class CarouselBanner implements CarouselBannerContract {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  buttonText: string;
  buttonUrl: string;
  darkOverlay: number;
  startDate: string;
  endDate: string;
  order: number;
  status: 'ACTIVE' | 'INACTIVE' | 'SCHEDULED';
}
