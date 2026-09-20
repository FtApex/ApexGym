import { MembershipPlan } from './membership-plan';

export interface MembershipPlanRepository {
  findAll(): Promise<MembershipPlan[]>;
  findById(id: string): Promise<MembershipPlan | null>;
  save(plan: MembershipPlan): Promise<MembershipPlan>;
  delete(id: string): Promise<void>;
}

export const MEMBERSHIP_PLAN_REPOSITORY_TOKEN = Symbol('MembershipPlanRepository');
