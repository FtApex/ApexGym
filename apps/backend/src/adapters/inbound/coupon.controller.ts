import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException } from '@nestjs/common';
import { CouponService } from '../../application/coupon.service';
import { Coupon } from '../../domain/coupon';
import { Public } from '../../infrastructure/auth/public.decorator';

@Controller('coupons')
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @Get()
  async getAll(): Promise<Coupon[]> {
    return this.couponService.getAllCoupons();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Coupon> {
    const coupon = await this.couponService.getCouponById(id);
    if (!coupon) {
      throw new NotFoundException(`Cupón con ID ${id} no encontrado`);
    }
    return coupon;
  }

  /**
   * Público: la landing valida un código que el visitante escribe.
   * El listado completo sigue protegido para no exponer todos los códigos
   * ni sus usos restantes.
   */
  @Public()
  @Get('code/:code')
  async getByCode(@Param('code') code: string): Promise<Coupon> {
    const coupon = await this.couponService.getCouponByCode(code);
    if (!coupon) {
      throw new NotFoundException(`Cupón con código ${code} no encontrado`);
    }
    return coupon;
  }

  @Post()
  async create(@Body() coupon: Coupon): Promise<Coupon> {
    return this.couponService.createCoupon(coupon);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() couponData: Partial<Coupon>): Promise<Coupon> {
    const coupon = await this.couponService.updateCoupon(id, couponData);
    if (!coupon) {
      throw new NotFoundException(`Cupón con ID ${id} no encontrado para actualizar`);
    }
    return coupon;
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    await this.couponService.deleteCoupon(id);
    return { message: `Cupón con ID ${id} eliminado correctamente` };
  }
}
