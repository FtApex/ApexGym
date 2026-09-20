import { MembershipPlan as SharedMembershipPlan } from './shared/types';

export class MembershipPlan implements SharedMembershipPlan {
  id: string;
  name: string;
  durationMonths: number;
  price: number;
  originalPrice?: number;
  benefits: string[];
  imageUrl: string;
  badge?: string;
  color: string;
  priority: number;
  visible: boolean;
  status: 'ACTIVE' | 'INACTIVE';
  branches: string[];
}
