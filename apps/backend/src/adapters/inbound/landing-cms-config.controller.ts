import { Controller, Get, Put, Body, NotFoundException } from '@nestjs/common';
import { LandingCmsConfigService } from '../../application/landing-cms-config.service';
import { LandingCmsConfig } from '../../domain/landing-cms-config';
import { Public } from '../../infrastructure/auth/public.decorator';

@Controller('cms/landing')
export class LandingCmsConfigController {
  constructor(private readonly cmsService: LandingCmsConfigService) {}

  @Public()
  @Get()
  async get(): Promise<LandingCmsConfig> {
    const config = await this.cmsService.getConfig();
    if (!config) {
      throw new NotFoundException('Configuración del CMS de la landing no encontrada');
    }
    return config;
  }

  @Put()
  async update(@Body() configData: Partial<LandingCmsConfig>): Promise<LandingCmsConfig> {
    return this.cmsService.updateConfig(configData);
  }
}
