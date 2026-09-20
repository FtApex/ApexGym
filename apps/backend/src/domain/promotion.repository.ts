import { Promotion } from './promotion';

export interface PromotionRepository {
  findAll(): Promise<Promotion[]>;
  findById(id: string): Promise<Promotion | null>;
  save(promo: Promotion): Promise<Promotion>;
  delete(id: string): Promise<void>;
}

export const PROMOTION_REPOSITORY_TOKEN = Symbol('PromotionRepository');
