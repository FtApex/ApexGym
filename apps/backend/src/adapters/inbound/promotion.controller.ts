import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException } from '@nestjs/common';
import { PromotionService } from '../../application/promotion.service';
import { Promotion } from '../../domain/promotion';
import { Public } from '../../infrastructure/auth/public.decorator';

@Controller('promotions')
export class PromotionController {
  constructor(private readonly promotionService: PromotionService) {}

  @Public()
  @Get()
  async getAll(): Promise<Promotion[]> {
    return this.promotionService.getAllPromotions();
  }

  @Public()
  @Get(':id')
  async getById(@Param('id') id: string): Promise<Promotion> {
    const promo = await this.promotionService.getPromotionById(id);
    if (!promo) {
      throw new NotFoundException(`Promoción con ID ${id} no encontrada`);
    }
    return promo;
  }

  @Post()
  async create(@Body() promo: Promotion): Promise<Promotion> {
    return this.promotionService.createPromotion(promo);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() promoData: Partial<Promotion>): Promise<Promotion> {
    const promo = await this.promotionService.updatePromotion(id, promoData);
    if (!promo) {
      throw new NotFoundException(`Promoción con ID ${id} no encontrada para actualizar`);
    }
    return promo;
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    await this.promotionService.deletePromotion(id);
    return { message: `Promoción con ID ${id} eliminada correctamente` };
  }
}
