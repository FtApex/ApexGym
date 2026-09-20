import { Injectable, Inject } from '@nestjs/common';
import { Promotion } from '../domain/promotion';
import type { PromotionRepository } from '../domain/promotion.repository';
import { PROMOTION_REPOSITORY_TOKEN } from '../domain/promotion.repository';

@Injectable()
export class PromotionService {
  constructor(
    @Inject(PROMOTION_REPOSITORY_TOKEN)
    private readonly repository: PromotionRepository,
  ) {}

  async getAllPromotions(): Promise<Promotion[]> {
    return this.repository.findAll();
  }

  async getPromotionById(id: string): Promise<Promotion | null> {
    return this.repository.findById(id);
  }

  async createPromotion(promo: Promotion): Promise<Promotion> {
    return this.repository.save(promo);
  }

  async updatePromotion(id: string, promoData: Partial<Promotion>): Promise<Promotion | null> {
    const existing = await this.repository.findById(id);
    if (!existing) return null;
    const merged = Object.assign(existing, promoData);
    return this.repository.save(merged);
  }

  async deletePromotion(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
