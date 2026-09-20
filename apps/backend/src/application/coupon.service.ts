import { Injectable, Inject } from '@nestjs/common';
import { Coupon } from '../domain/coupon';
import type { CouponRepository } from '../domain/coupon.repository';
import { COUPON_REPOSITORY_TOKEN } from '../domain/coupon.repository';

@Injectable()
export class CouponService {
  constructor(
    @Inject(COUPON_REPOSITORY_TOKEN)
    private readonly repository: CouponRepository,
  ) {}

  async getAllCoupons(): Promise<Coupon[]> {
    return this.repository.findAll();
  }

  async getCouponById(id: string): Promise<Coupon | null> {
    return this.repository.findById(id);
  }

  async getCouponByCode(code: string): Promise<Coupon | null> {
    return this.repository.findByCode(code);
  }

  async createCoupon(coupon: Coupon): Promise<Coupon> {
    return this.repository.save(coupon);
  }

  async updateCoupon(id: string, couponData: Partial<Coupon>): Promise<Coupon | null> {
    const existing = await this.repository.findById(id);
    if (!existing) return null;
    const merged = Object.assign(existing, couponData);
    return this.repository.save(merged);
  }

  async deleteCoupon(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
