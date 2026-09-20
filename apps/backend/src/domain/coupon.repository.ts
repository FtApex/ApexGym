import { Coupon } from './coupon';

export interface CouponRepository {
  findAll(): Promise<Coupon[]>;
  findById(id: string): Promise<Coupon | null>;
  findByCode(code: string): Promise<Coupon | null>;
  save(coupon: Coupon): Promise<Coupon>;
  delete(id: string): Promise<void>;
}

export const COUPON_REPOSITORY_TOKEN = Symbol('CouponRepository');
