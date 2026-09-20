import { Promotion as SharedPromotion, PromoStatus } from '@apex/shared';

export class Promotion implements SharedPromotion {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  bannerUrl?: string;
  branchId: string;
  membershipId?: string;
  normalPrice: number;
  offerPrice: number;
  discountPercentage: number;
  badge: 'NUEVO' | 'HOT' | 'LIMITADO';
  startDate: string;
  endDate: string;
  priority: number;
  color: string;
  status: PromoStatus;
}
