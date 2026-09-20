import { Coupon as SharedCoupon } from '@apex/shared';

export class Coupon implements SharedCoupon {
  id: string;
  code: string;
  description: string;
  type: 'PERCENTAGE' | 'FIXED_AMOUNT';
  amount: number;
  maxUses: number;
  currentUses: number;
  userLimit: number;
  applicableMemberships: string[];
  applicableBranches: string[];
  startDate: string;
  endDate: string;
  status: 'ACTIVE' | 'INACTIVE' | 'EXPIRED';
}
