import { Injectable, Inject } from '@nestjs/common';
import { LandingCmsConfig } from '../domain/landing-cms-config';
import type { LandingCmsConfigRepository } from '../domain/landing-cms-config.repository';
import { LANDING_CMS_CONFIG_REPOSITORY_TOKEN } from '../domain/landing-cms-config.repository';

@Injectable()
export class LandingCmsConfigService {
  constructor(
    @Inject(LANDING_CMS_CONFIG_REPOSITORY_TOKEN)
    private readonly configRepository: LandingCmsConfigRepository,
  ) {}

  async getConfig(): Promise<LandingCmsConfig | null> {
    return this.configRepository.find();
  }

  /** Actualización parcial: conserva los campos que el CMS no envía. */
  async updateConfig(updatedData: Partial<LandingCmsConfig>): Promise<LandingCmsConfig> {
    const existing = await this.configRepository.find();
    const merged = Object.assign(existing ?? new LandingCmsConfig(), updatedData);
    return this.configRepository.save(merged);
  }
}
