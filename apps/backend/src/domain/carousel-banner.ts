import { CarouselBanner as CarouselBannerContract } from '@apex/shared';

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
