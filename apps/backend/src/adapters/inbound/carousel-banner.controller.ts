import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { CarouselBannerService } from '../../application/carousel-banner.service';
import { CarouselBanner } from '../../domain/carousel-banner';
import { Public } from '../../infrastructure/auth/public.decorator';

@Controller('banners')
export class CarouselBannerController {
  constructor(private readonly bannerService: CarouselBannerService) {}

  @Public()
  @Get()
  async getAll(): Promise<CarouselBanner[]> {
    return this.bannerService.getAllBanners();
  }

  @Public()
  @Get(':id')
  async getById(@Param('id') id: string): Promise<CarouselBanner> {
    const banner = await this.bannerService.getBannerById(id);
    if (!banner) {
      throw new NotFoundException(`Banner con ID ${id} no encontrado`);
    }
    return banner;
  }

  @Post()
  async create(@Body() banner: CarouselBanner): Promise<CarouselBanner> {
    return this.bannerService.createBanner(banner);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() bannerData: Partial<CarouselBanner>,
  ): Promise<CarouselBanner> {
    const banner = await this.bannerService.updateBanner(id, bannerData);
    if (!banner) {
      throw new NotFoundException(`Banner con ID ${id} no encontrado para actualizar`);
    }
    return banner;
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    await this.bannerService.deleteBanner(id);
    return { message: `Banner con ID ${id} eliminado correctamente` };
  }
}
