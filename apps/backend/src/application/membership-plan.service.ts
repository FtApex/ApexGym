import { Injectable, Inject } from '@nestjs/common';
import { MembershipPlan } from '../domain/membership-plan';
import type { MembershipPlanRepository } from '../domain/membership-plan.repository';
import { MEMBERSHIP_PLAN_REPOSITORY_TOKEN } from '../domain/membership-plan.repository';

@Injectable()
export class MembershipPlanService {
  constructor(
    @Inject(MEMBERSHIP_PLAN_REPOSITORY_TOKEN)
    private readonly repository: MembershipPlanRepository,
  ) {}

  async getAllPlans(): Promise<MembershipPlan[]> {
    return this.repository.findAll();
  }

  async getPlanById(id: string): Promise<MembershipPlan | null> {
    return this.repository.findById(id);
  }

  async createPlan(plan: MembershipPlan): Promise<MembershipPlan> {
    return this.repository.save(plan);
  }

  async updatePlan(id: string, planData: Partial<MembershipPlan>): Promise<MembershipPlan | null> {
    const existing = await this.repository.findById(id);
    if (!existing) return null;
    const merged = Object.assign(existing, planData);
    return this.repository.save(merged);
  }

  async deletePlan(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
